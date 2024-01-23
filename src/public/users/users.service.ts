import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { FindDto } from '../finds/dto/Find.dto';
import { ProfileDto } from './dto/profile.dto';
import { UserProfileDto } from './dto/userProfile.dto';
import { PlaceDto } from '../places/dto/place.dto';

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

  async getProfileAndFinds(userId: number) {
    const profile = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        finds: {
          include: {
            place: true,
          },
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
      firstname: profile.firstname,
      followers: 1623487,
      finds: profile.finds.map((find) => ({
        id: find.id,
        createdAt: find.created_at,
        images: find.images,
        place: {
          id: find.place.id,
          name: find.place.name,
          address: find.place.address,
          categories: find.place.categories,
          googleMapsUri: find.place.google_maps_uri,
          googlePlaceId: find.place.google_place_id,
        },
        rating: find.rating.toFixed(1),
        review: find.review,
        user: {
          firstname: profile.firstname,
          id: profile.id,
          username: profile.username,
          avatar: profile.avatar,
        },
      })),
    });
  }
}
