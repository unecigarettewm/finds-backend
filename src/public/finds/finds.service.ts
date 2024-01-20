import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindDto } from './dto/Find.dto';
import { ProfileDto } from '../users/dto/profile.dto';

@Injectable()
export class FindsService {
  constructor(private prisma: PrismaService) {}

  async allFinds() {
    const finds = await this.prisma.find.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        user: true,
      },
    });

    return finds.map(
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
            email: e.user.email,
            avatar: e.user.avatar,
          }),
        }),
    );
  }
}
