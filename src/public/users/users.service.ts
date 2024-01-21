import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneWithEmail(username: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: username,
      },
    });
  }

  async create(data: CreateUserDto) {
    const hash = await bcrypt.hash(data.password, 10);

    return await this.prisma.user.create({
      data: {
        firstname: data.firstname,
        email: data.email,
        password: hash,
      },
    });
  }
}
