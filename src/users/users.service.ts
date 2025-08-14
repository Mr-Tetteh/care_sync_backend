import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import { ResetToken } from './entities/reset-token.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    @InjectRepository(ResetToken)
    private readonly resetToken: Repository<ResetToken>,
    private readonly mailService: MailService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    if (await this.findOne(createUserDto.email)) {
      throw new BadRequestException('Sorry User already exists');
    } else if (
      await this.userRepository.findOneBy({ phone: createUserDto.phone })
    ) {
      throw new BadRequestException('Sorry Phone number already exists');
    }

    const rawPassword = createUserDto.password;
    const user = this.userRepository.create({
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      other_names: createUserDto.other_names,
      email: createUserDto.email,
      gender: createUserDto.gender,
      date_of_birth: createUserDto.date_of_birth,
      phone: createUserDto.phone,
      role: createUserDto.role,
      password: await bcrypt.hash(createUserDto.password, 10),
    });

    const saveUser = await this.userRepository.save(user);
    /* try {
       const smsMessage = `Hello ${saveUser.first_name}, welcome to care sync staff portal.  your default password is:
       ${rawPassword}
       
       Please do well to reset your password`;
       await this.sendWithSMSONLINEGH(saveUser.phone.toString(), smsMessage);
     } catch (error) {
       console.error('Failed to send SMS notification:', error);
     }*/
  }

  findAll() {
    return this.userRepository.find({ where: { role: 'Patient' } });
  }

  findOne(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findOneById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findByRole() {
    return this.userRepository.find({ where: { role: Not('Patient') } });
  }

  findByDoctor() {
    return this.userRepository.find({ where: { role: 'Doctor' } });
  }
  findByReceptionist() {
    return this.userRepository.find({ where: { role: 'Receptionist' } });
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, {
      first_name: updateUserDto.first_name,
      last_name: updateUserDto.last_name,
      other_names: updateUserDto.other_names,
      email: updateUserDto.email,
      phone: updateUserDto.phone,
      date_of_birth: updateUserDto.date_of_birth,
      gender: updateUserDto.gender,
    });
    return { message: 'User updated successfully' };
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  private async sendWithSMSONLINEGH(
    receiver: string,
    message: string,
    sender: string = 'Care Sync',
  ): Promise<any> {
    try {
      const baseUrl = this.configService.get<string>('SMS_GH_ONLINE_BASE_URL');
      const apiKey = this.configService.get<string>('SMS_GH_ONLINE_KEY');
      const isDebug = this.configService.get<boolean>('APP_DEBUG', false);

      const url = `${baseUrl}/v5/sms/send`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `key ${apiKey}`,
      };

      const payload = {
        text: message,
        type: 0,
        sender: sender,
        destinations: [receiver],
      };

      if (isDebug) {
        console.log('SMS Debug Mode - Would send:', payload);
        return { success: true, debug: true, payload };
      }

      const response = await axios.post(url, payload, {
        headers,
        timeout: 10000, // 10 second timeout
      });

      return response.data;
    } catch (error) {
      console.error('SMS sending error:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(
          `SMS API Error: ${error.response?.data?.message || error.message}`,
        );
      }
      throw new Error(`SMS Error: ${error.message}`);
    }
  }

  async changePassword(id: number, oldPassword: string, newPassword: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Sorry user not found');
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Sorry Old Password is incorrect');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    await this.userRepository.save(user);

    return {
      message: 'Password changed successfully!',
    };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    //not safe
    if (user) {
      const resetToken = nanoid(64);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const token = this.resetToken.create({
        token: resetToken,
        userId: user.id,
        expiryDate,
      });
      await this.resetToken.save(token);
      //reset email to send
      this.mailService.sendEmail(email, resetToken);
    }
    return {
      message: 'Password reset email sent successfully',
    };
  }

  async resetPassword(newPassword: string, resetToken: string) {
    const token = await this.resetToken.findOne({
      where: { token: resetToken },
    });

    if (!token || token.expiryDate < new Date()) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    const user = await this.userRepository.findOneBy({ id: token.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
    await this.resetToken.delete({ id: token.id });
    return {
      message: 'Password reset successfully',
    };
  }
}
