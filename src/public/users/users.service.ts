import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UserProfileDto } from './dto/userProfile.dto';
import { AuthUserDto } from './dto/authUser.dto';

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

  async doesUserExist(data: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    return !!user;
  }

  async create(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

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
      bio: profile.bio,
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

  async updateUsername(username: string, userId: number) {
    if (username.length < 3) {
      throw new ConflictException('Username must be at least 3 characters');
    }

    if (username.length > 15) {
      throw new ConflictException('Username must be at most 15 characters');
    }

    if (!/^[a-zA-Z0-9_.-]*$/.test(username)) {
      throw new ConflictException(
        'Username can only contain letters, numbers, underscores, dashes and dots',
      );
    }

    const usernameTaken = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!!usernameTaken) {
      throw new ConflictException('Username already taken');
    }

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
      },
    });

    return new AuthUserDto({
      email: user.email,
      firstname: user.firstname,
      id: user.id,
      username: user.username,
      avatar: user.avatar,
    });
  }
}
