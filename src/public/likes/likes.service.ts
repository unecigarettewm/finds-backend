import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserLikeDto } from './dto/userLike.dto';
import { CategoryDto } from '../finds/dto/category.dto';
import { ActiveLikeDto } from './dto/activeLike.dto';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async getUserLikes(userId: string) {
    const likes = await this.prisma.like.findMany({
      where: {
        userId,
        deleted_at: null,
      },
      orderBy: {
        updated_at: 'desc',
      },
      include: {
        find: {
          include: {
            category: true,
            place: true,
            user: true,
          },
        },
      },
    });

    return likes.map(
      (like) =>
        new UserLikeDto({
          id: like.id,
          created_at: like.created_at,
          find: {
            id: like.find.id,
            createdAt: like.find.created_at,
            images: like.find.images,
            category: new CategoryDto({
              id: like.find.category.id,
              name: like.find.category.name,
            }),
            review: like.find.review,
            tags: like.find.tags,
            user: {
              id: like.find.user.id,
              firstname: like.find.user.firstname,
              username: like.find.user.username,
              avatar: like.find.user.avatar,
            },
            place: {
              id: like.find.place.id,
              address: like.find.place.address,
              name: like.find.place.name,
              googleMapsUri: like.find.place.google_maps_uri,
              googlePlaceId: like.find.place.google_place_id,
            },
          },
        }),
    );
  }

  async getFindUserLike(findId: number, userId: string) {
    const like = await this.prisma.like.findFirst({
      where: {
        find: {
          id: findId,
        },
        user: {
          id: userId,
        },
      },
    });

    if (!like) {
      return null;
    }

    return new ActiveLikeDto({
      id: like.id,
      userId: like.userId,
      findId: like.findId,
      deleted_at: like.deleted_at,
    });
  }

  async updateLike(findId: number, userId: string) {
    if (!userId) {
      throw new UnauthorizedException();
    }

    const existingLike = await this.prisma.like.findFirst({
      where: {
        findId,
        userId,
      },
    });

    if (existingLike) {
      // Like already exists, update deletedAt to null
      const like = await this.prisma.like.update({
        where: {
          id: existingLike.id,
        },
        data: {
          deleted_at: existingLike.deleted_at === null ? new Date() : null,
        },
      });

      return new ActiveLikeDto({
        id: like.id,
        userId: like.userId,
        findId: like.findId,
        deleted_at: existingLike.deleted_at === null ? new Date() : null,
      });
    } else {
      // Like doesn't exist, add a new record
      const like = await this.prisma.like.create({
        data: {
          userId,
          findId,
        },
      });

      return new ActiveLikeDto({
        id: like.id,
        userId: like.userId,
        findId: like.findId,
        deleted_at: like.deleted_at,
      });
    }
  }
}
