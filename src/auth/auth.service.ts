import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/public/users/users.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/public/users/dto/createUser.dto';
import { AuthUserDto } from 'src/public/users/dto/authUser.dto';
import { LoginResDto } from './dto/loginResDto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithEmail(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.email,
      sub: { id: user.id },
    };

    const authUser = new AuthUserDto({
      id: user.id,
      firstname: user.firstname,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });

    return new LoginResDto({
      user: { ...authUser },
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    });
  }

  async createUser(data: CreateUserDto) {
    const user = await this.userService.create(data);

    if (user.id) {
      return this.login(user);
    }
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: { id: user.id },
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
