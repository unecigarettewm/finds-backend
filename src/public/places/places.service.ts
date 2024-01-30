import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PlaceWithFindsDto } from './dto/placeWithFinds.dto';
import { TagDto } from '../finds/dto/tag.dto';
import { RatingDto } from '../finds/dto/rating.dto';
import { GooglePlaceDto } from '../search/dto/googlePlace.dto';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}

  async createPlace(place: GooglePlaceDto) {
    return await this.prisma.place.create({
      data: {
        name: place.displayName.text,
        google_place_id: place.id,
        address: place.shortFormattedAddress,
        google_maps_uri: place.googleMapsUri,
      },
    });
  }

  async getPlaceByGoogleId(id: string) {
    const place = await this.prisma.place.findFirst({
      where: {
        google_place_id: id,
      },
    });

    if (!place) {
      return null;
    }

    return place;
  }

  async getPlaceWithFinds(id: string) {
    const place = await this.prisma.place.findFirst({
      where: {
        google_place_id: id,
      },
      include: {
        finds: {
          include: {
            user: true,
            rating: true,
            findTags: {
              include: {
                tag: true,
              },
            },
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
      googleMapsUri: place.google_maps_uri,
      finds: place.finds.map((find) => ({
        id: find.id,
        images: find.images,
        place: {
          address: place.address,
          googleMapsUri: place.google_maps_uri,
          googlePlaceId: place.google_place_id,
          id: place.id,
          name: place.name,
        },
        tags: find.findTags.map(
          (tag) =>
            new TagDto({
              id: tag.tag.id,
              name: tag.tag.name,
            }),
        ),
        rating: new RatingDto({
          id: find.rating.id,
          name: find.rating.rating,
        }),
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
