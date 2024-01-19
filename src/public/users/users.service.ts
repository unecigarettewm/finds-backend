import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<ProfileDto | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return undefined;
    }

    return {
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      avatar: user.avatar,
    };
  }
}
