import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindDto } from './dto/find.dto';
import { CategoryDto } from './dto/category.dto';
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
        category: true,
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
          category: new CategoryDto({
            id: e.category.id,
            name: e.category.name,
          }),
          tags: e.tags,
          place: {
            id: e.place.id,
            name: e.place.name,
            address: e.place.address,
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

  async getFollowingFinds(userId: string) {
    const following = await this.prisma.follower.findMany({
      where: {
        followerId: userId,
        deleted_at: null,
      },
    });

    const finds = await this.prisma.find.findMany({
      where: {
        userId: {
          in: following.map((e) => e.followingId),
        },
        deleted_at: null,
      },
      include: {
        user: true,
        category: true,
        place: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return finds.map(
      (find) =>
        new FindDto({
          id: find.id,
          review: find.review,
          category: new CategoryDto({
            id: find.category.id,
            name: find.category.name,
          }),
          tags: find.tags,
          place: {
            id: find.place.id,
            name: find.place.name,
            address: find.place.address,
            googleMapsUri: find.place.google_maps_uri,
            googlePlaceId: find.place.google_place_id,
          },
          images: find.images,
          user: {
            firstname: find.user.firstname,
            id: find.user.id,
            username: find.user.username,
            avatar: find.user.avatar,
          },
          createdAt: find.created_at,
        }),
    );
  }

  async createFind(userId: string, createFindDto: CreateFindDto) {
    const { googlePlaceId, review, categoryId, images, tags } = createFindDto;

    if (!googlePlaceId) {
      throw new PreconditionFailedException('Missing google place id');
    }

    if (!review) {
      throw new PreconditionFailedException('Missing review');
    }

    if (!categoryId) {
      throw new PreconditionFailedException('Missing category id');
    }

    if (!images) {
      throw new PreconditionFailedException('Missing images');
    }

    if (!tags) {
      throw new PreconditionFailedException('Missing tags');
    }

    if (!userId) {
      throw new PreconditionFailedException('Missing user id');
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

    const newFind = await this.prisma.find.create({
      data: {
        review,
        category: {
          connect: {
            id: categoryId,
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
        tags,
      },
      include: {
        place: true,
        category: true,
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
      category: new CategoryDto({
        id: newFind.category.id,
        name: newFind.category.name,
      }),
      place: new PlaceDto({
        id: newFind.place.id,
        address: newFind.place.address,
        googleMapsUri: newFind.place.google_maps_uri,
        googlePlaceId: newFind.place.google_place_id,
        name: newFind.place.name,
      }),
      tags: newFind.tags,
      user: new ProfileDto({
        id: newFind.user.id,
        firstname: newFind.user.firstname,
        username: newFind.user.username,
        avatar: newFind.user.avatar,
      }),
    });
  }

  async getAllCategories(userId: string) {
    if (!userId) {
      throw new UnauthorizedException('Missing user id');
    }

    const categories = await this.prisma.category.findMany({
      where: {
        deleted_at: null,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return categories.map(
      (e) =>
        new CategoryDto({
          id: e.id,
          name: e.name,
        }),
    );
  }

  async getFindById(findId: number) {
    const find = await this.prisma.find.findUnique({
      where: {
        id: findId,
      },
      include: {
        user: true,
        category: true,
        place: true,
      },
    });

    if (!find) {
      throw new NotFoundException('Find not found');
    }

    return new FindDto({
      id: find.id,
      review: find.review,
      category: new CategoryDto({
        id: find.category.id,
        name: find.category.name,
      }),
      tags: find.tags,
      place: {
        id: find.place.id,
        name: find.place.name,
        address: find.place.address,
        googleMapsUri: find.place.google_maps_uri,
        googlePlaceId: find.place.google_place_id,
      },
      images: find.images,
      user: {
        firstname: find.user.firstname,
        id: find.user.id,
        username: find.user.username,
        avatar: find.user.avatar,
      },
      createdAt: find.created_at,
    });
  }
}
