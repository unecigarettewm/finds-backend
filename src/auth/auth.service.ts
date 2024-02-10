import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/public/users/users.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/public/users/dto/createUser.dto';
import { AuthUserDto } from 'src/public/users/dto/authUser.dto';
import { LoginResDto } from './dto/loginResDto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

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
        expiresIn: '30d',
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

  async registerOrLoginWithApple(jwt: string) {
    // decode JWT
    const data = this.jwtService.decode(jwt, { json: true });
    // TODO: verify JWT is from Apple here

    if (!data.email) {
      throw new UnauthorizedException('Invalid JWT');
    }

    const existingUser = await this.userService.findOneWithEmail(data.email);

    if (existingUser) {
      return this.login(existingUser);
    } else {
      return this.createUser({
        email: data.email,
      });
    }
  }
}
