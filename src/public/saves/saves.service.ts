import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserSaveDto } from './dto/userSave.dto';
import { TagDto } from '../finds/dto/tag.dto';
import { RatingDto } from '../finds/dto/rating.dto';

@Injectable()
export class SavesService {
  constructor(private prisma: PrismaService) {}

  async getUserSaves(userId: number) {
    const saves = await this.prisma.save.findMany({
      where: {
        user: {
          id: userId,
        },
        deleted_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        find: {
          include: {
            rating: true,
            place: true,
            user: true,
            findTags: {
              include: {
                tag: true,
              },
            },
          },
        },
      },
    });

    return saves.map(
      (save) =>
        new UserSaveDto({
          id: save.id,
          created_at: save.created_at,
          find: {
            id: save.find.id,
            createdAt: save.find.created_at,
            images: save.find.images,
            rating: new RatingDto({
              id: save.find.rating.id,
              name: save.find.rating.rating,
            }),
            review: save.find.review,
            tags: save.find.findTags.map(
              (tag) =>
                new TagDto({
                  id: tag.tag.id,
                  name: tag.tag.name,
                }),
            ),
            user: {
              id: save.find.user.id,
              firstname: save.find.user.firstname,
              username: save.find.user.username,
              avatar: save.find.user.avatar,
            },
            place: {
              id: save.find.place.id,
              address: save.find.place.address,
              name: save.find.place.name,
              googleMapsUri: save.find.place.google_maps_uri,
              googlePlaceId: save.find.place.google_place_id,
            },
          },
        }),
    );
  }
}
