import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserSaveDto } from './dto/userSave.dto';
import { CategoryDto } from '../finds/dto/category.dto';

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
            category: true,
            place: true,
            user: true,
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
            category: new CategoryDto({
              id: save.find.category.id,
              name: save.find.category.name,
            }),
            review: save.find.review,
            tags: save.find.tags,
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
