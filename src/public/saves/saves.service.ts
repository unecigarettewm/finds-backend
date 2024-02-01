import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserSaveDto } from './dto/userSave.dto';
import { CategoryDto } from '../finds/dto/category.dto';
import { ActiveSaveDto } from './dto/activeSave.dto';

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
        created_at: 'asc',
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

  async getFindUserSave(findId: number, userId: number) {
    const save = await this.prisma.save.findFirst({
      where: {
        find: {
          id: findId,
        },
        user: {
          id: userId,
        },
        deleted_at: null,
      },
      include: {
        user: true,
        find: true,
      },
    });

    if (!save) {
      return null;
    }

    return new ActiveSaveDto({
      id: save.id,
      userId: save.user.id,
      findId: save.find.id,
      deleted_at: save.deleted_at,
    });
  }

  async addSave(findId: number, userId: number) {
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
          deleted_at: null,
        },
      });

      return new ActiveSaveDto({
        id: save.id,
        userId: save.userId,
        findId: save.findId,
        deleted_at: save.deleted_at,
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

  async deleteSave(findId: number, userId: number) {
    if (!findId) {
      throw new BadRequestException('Invalid findId');
    }

    const existingSave = await this.prisma.save.findFirst({
      where: {
        findId,
        user: {
          id: userId,
        },
      },
    });

    if (!existingSave) {
      throw new BadRequestException('Save not found');
    }

    const save = await this.prisma.save.update({
      where: {
        id: existingSave.id,
        user: {
          id: userId,
        },
      },
      data: {
        deleted_at: new Date(),
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
