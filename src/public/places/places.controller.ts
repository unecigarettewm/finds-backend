import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { PlacesService } from './places.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PlaceWithFindsDto } from './dto/placeWithFinds.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('places')
@Controller('place')
export class PlacesController {
  logger: Logger;

  constructor(private readonly placesService: PlacesService) {
    this.logger = new Logger();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id')
  async getPlaceByGoogleId(
    @Param('id') id: string,
  ): Promise<PlaceWithFindsDto> {
    return this.placesService.getPlaceWithFinds(id);
  }
}
