import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    if (await this.findOne(createUserDto.email)) {
      throw new BadRequestException('Sorry User already exists');
    } else if (
      await this.userRepository.findOneBy({ phone: createUserDto.phone })
    ) {
      throw new BadRequestException('Sorry Phone number already exists');
    }

    const user = this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findByRole() {
    return this.userRepository.find({ where: { role: 'patient' } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
