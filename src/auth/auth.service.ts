import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  decodeJWT(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Sorry Invalid Credentials Provided');
    }
    const payload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      other_names: user.other_names,
      role: user.role,
      phone: user.phone,
    };
    const sign = process.env.JWT_SECRET;
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: sign,
      }),
    };
  }

  public logout(user: any) {
    return {
      message: 'Logout Successfull',
    };
  }
}
