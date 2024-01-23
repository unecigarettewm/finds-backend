import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PlaceWithFindsDto } from './dto/placeWithFinds.dto';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}

  async getPlaceByGoogleId(id: string) {
    const place = await this.prisma.place.findFirst({
      where: {
        google_place_id: id,
      },
      include: {
        finds: {
          include: {
            user: true,
          },
          orderBy: {
            created_at: 'desc',
          },
        },
      },
    });

    if (!place) {
      return null;
    }

    return new PlaceWithFindsDto({
      id: place.id,
      name: place.name,
      googlePlaceId: place.google_place_id,
      address: place.address,
      categories: place.categories,
      googleMapsUri: place.google_maps_uri,
      finds: place.finds.map((find) => ({
        id: find.id,
        images: find.images,
        place: {
          address: place.address,
          categories: place.categories,
          googleMapsUri: place.google_maps_uri,
          googlePlaceId: place.google_place_id,
          id: place.id,
          name: place.name,
        },
        rating: find.rating,
        review: find.review,
        user: {
          firstname: find.user.firstname,
          id: find.user.id,
          username: find.user.username,
          avatar: find.user.avatar,
        },
        createdAt: find.created_at,
      })),
    });
  }
}
