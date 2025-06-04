import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Not, Repository } from 'typeorm';
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
}
