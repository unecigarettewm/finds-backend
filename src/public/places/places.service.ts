import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PlaceProfileDto } from './dto/placeProfile';
import { FindDto } from '../finds/dto/Find.dto';
import { ProfileDto } from '../users/dto/profile.dto';

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

    return new PlaceProfileDto({
      id: place.id,
      name: place.name,
      googlePlaceId: place.google_place_id,
      address: place.address,
      categories: place.categories,
      googleMapsUri: place.google_maps_uri,
      finds: place.finds.map(
        (e) =>
          new FindDto({
            id: e.id,
            review: e.review,
            rating: e.rating,
            googlePlaceId: e.google_place_id,
            images: e.images,
            user: new ProfileDto({
              id: e.user.id,
              username: e.user.username,
              avatar: e.user.avatar,
            }),
          }),
      ),
    });
  }
}
