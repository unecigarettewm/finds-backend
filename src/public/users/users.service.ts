import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { FindDto } from '../finds/dto/Find.dto';
import { ProfileDto } from './dto/profile.dto';
import { UserProfileDto } from './dto/userProfile.dto';

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

  async getUserProfile(userId: number) {
    const profile = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        finds: {
          orderBy: {
            created_at: 'desc',
          },
        },
      },
    });

    if (!profile) {
      return null;
    }

    return new UserProfileDto({
      id: profile.id,
      username: profile.username,
      avatar: profile.avatar,
      followers: 0,
      finds: profile.finds.map(
        (e) =>
          new FindDto({
            id: e.id,
            review: e.review,
            rating: e.rating,
            googlePlaceId: e.google_place_id,
            images: e.images,
            user: new ProfileDto({
              id: profile.id,
              username: profile.username,
              avatar: profile.avatar,
            }),
          }),
      ),
    });
  }
}
