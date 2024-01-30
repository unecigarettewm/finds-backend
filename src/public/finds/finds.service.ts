import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindDto } from './dto/find.dto';
import { TagDto } from './dto/tag.dto';
import { RatingDto } from './dto/rating.dto';
import { SearchService } from '../search/search.service';
import { PlacesService } from '../places/places.service';
import { PlaceDto } from '../places/dto/place.dto';
import { ProfileDto } from '../users/dto/profile.dto';
import { CreateFindDto } from './dto/createFind.dto';

@Injectable()
export class FindsService {
  constructor(
    private prisma: PrismaService,
    private searchService: SearchService,
    private placesService: PlacesService,
  ) {}

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

  async createFind(userId: number, createFindDto: CreateFindDto) {
    const { googlePlaceId, review, ratingId, images, tags } = createFindDto;

    if (!googlePlaceId || !review || !ratingId || !images || !tags) {
      throw new PreconditionFailedException('Missing required fields');
    }

    const existingPlaceInDB =
      await this.placesService.getPlaceByGoogleId(googlePlaceId);

    if (!existingPlaceInDB) {
      const googlePlace =
        await this.searchService.getGooglePlaceById(googlePlaceId);

      if (!googlePlace) {
        throw new NotFoundException('Google place not found');
      }

      const newPlace = await this.placesService.createPlace(googlePlace);
      if (!newPlace) {
        throw new NotFoundException('Could not create new place');
      }
    }

    // TODO: UPLOAD IMAGES HERE

    const newFind = await this.prisma.find.create({
      data: {
        review,
        rating: {
          connect: {
            id: ratingId,
          },
        },
        place: {
          connect: {
            google_place_id: googlePlaceId,
          },
        },
        images,
        user: {
          connect: {
            id: userId,
          },
        },
        findTags: {
          create: tags.map((tag) => ({
            tag: {
              connect: {
                id: tag.id,
              },
            },
          })),
        },
      },
      include: {
        findTags: {
          include: {
            tag: true,
          },
        },
        place: true,
        rating: true,
        user: true,
      },
    });

    if (!newFind) {
      throw new NotFoundException('Could not create new find');
    }

    return new FindDto({
      id: newFind.id,
      images: newFind.images,
      review: newFind.review,
      createdAt: newFind.created_at,
      rating: new RatingDto({
        id: newFind.rating.id,
        name: newFind.rating.rating,
      }),
      place: new PlaceDto({
        id: newFind.place.id,
        address: newFind.place.address,
        googleMapsUri: newFind.place.google_maps_uri,
        googlePlaceId: newFind.place.google_place_id,
        name: newFind.place.name,
      }),
      tags: newFind.findTags.map(
        (tag) =>
          new TagDto({
            id: tag.tag.id,
            name: tag.tag.name,
          }),
      ),
      user: new ProfileDto({
        id: newFind.user.id,
        firstname: newFind.user.firstname,
        username: newFind.user.username,
        avatar: newFind.user.avatar,
      }),
    });
  }
}
