import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}

  async getPlaceDetails(googlePlaceId: string) {
    const place = await this.prisma.place.findFirst({
      where: {
        google_place_id: {
          equals: googlePlaceId,
        },
      },
    });

    if (!place) {
      return null;
    }
  }
}
