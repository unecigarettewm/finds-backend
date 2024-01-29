import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindDto } from './dto/find.dto';
import { TagDto } from './dto/tag.dto';
import { RatingDto } from './dto/rating.dto';

@Injectable()
export class FindsService {
  constructor(private prisma: PrismaService) {}

  async getAllFinds() {
    const finds = await this.prisma.find.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        user: true,
        rating: true,
        place: true,
        findTags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return finds.map(
      (e) =>
        new FindDto({
          id: e.id,
          review: e.review,
          rating: new RatingDto({
            id: e.rating.id,
            name: e.rating.rating,
          }),
          place: {
            id: e.place.id,
            name: e.place.name,
            address: e.place.address,
            googleMapsUri: e.place.google_maps_uri,
            googlePlaceId: e.place.google_place_id,
          },
          tags: e.findTags.map(
            (tag) =>
              new TagDto({
                id: tag.tag.id,
                name: tag.tag.name,
              }),
          ),
          images: e.images,
          user: {
            firstname: e.user.firstname,
            id: e.user.id,
            username: e.user.username,
            avatar: e.user.avatar,
          },
          createdAt: e.created_at,
        }),
    );
  }
}
