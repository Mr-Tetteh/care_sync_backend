import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { decrypt } from 'dotenv';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
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
      password: await bcrypt.hash(createUserDto.password, 10),
    });

    const saveUser = await this.userRepository.save(user);
    try {
      const smsMessage = `Hello ${saveUser.first_name}, welcome to care sync staff portal.  your default password is:
      ${rawPassword}
      
      Please do well to reset your password`;
      await this.sendWithSMSONLINEGH(saveUser.phone.toString(), smsMessage);
    } catch (error) {
      console.error('Failed to send SMS notification:', error);
    }

    /*   const user = this.userRepository.create({
         ...createUserDto,
         password: await bcrypt.hash(createUserDto.password, 10),
       });
   
       return this.userRepository.save(user);*/
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
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
}
