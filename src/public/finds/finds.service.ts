import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindDto } from './dto/Find.dto';

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
        place: true,
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
          rating: e.rating,
          place: {
            id: e.place.id,
            name: e.place.name,
            address: e.place.address,
            categories: e.place.categories,
            googleMapsUri: e.place.google_maps_uri,
            googlePlaceId: e.place.google_place_id,
          },
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
