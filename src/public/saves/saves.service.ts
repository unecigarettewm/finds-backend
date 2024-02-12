import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserSaveDto } from './dto/userSave.dto';
import { CategoryDto } from '../finds/dto/category.dto';
import { ActiveSaveDto } from './dto/activeSave.dto';

@Injectable()
export class SavesService {
  constructor(private prisma: PrismaService) {}

  async getUserSaves(userId: string) {
    const saves = await this.prisma.save.findMany({
      where: {
        userId,
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

  async getFindUserSave(findId: number, userId: string) {
    const save = await this.prisma.save.findFirst({
      where: {
        find: {
          id: findId,
        },
        user: {
          id: userId,
        },
      },
    });

    if (!save) {
      return null;
    }

    return new ActiveSaveDto({
      id: save.id,
      userId: save.userId,
      findId: save.findId,
      deleted_at: save.deleted_at,
    });
  }

  async updateSave(findId: number, userId: string) {
    const existingSave = await this.prisma.save.findFirst({
      where: {
        findId,
        userId,
      },
    });

    if (existingSave) {
      // Save already exists, update deletedAt to null
      const save = await this.prisma.save.update({
        where: {
          id: existingSave.id,
        },
        data: {
          deleted_at: existingSave.deleted_at === null ? new Date() : null,
        },
      });

      return new ActiveSaveDto({
        id: save.id,
        userId: save.userId,
        findId: save.findId,
        deleted_at: existingSave.deleted_at === null ? new Date() : null,
      });
    } else {
      // Save doesn't exist, add a new record
      const save = await this.prisma.save.create({
        data: {
          userId,
          findId,
        },
      });

      return new ActiveSaveDto({
        id: save.id,
        userId: save.userId,
        findId: save.findId,
        deleted_at: save.deleted_at,
      });
    }
  }
}
