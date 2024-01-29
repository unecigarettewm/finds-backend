import { Controller, Get, Logger, Param } from '@nestjs/common';
import { PlacesService } from './places.service';
import { ApiTags } from '@nestjs/swagger';
import { PlaceWithFindsDto } from './dto/placeWithFinds.dto';

@ApiTags('places')
@Controller('place')
export class PlacesController {
  logger: Logger;

  constructor(private readonly placesService: PlacesService) {
    this.logger = new Logger();
  }

  @Get(':id')
  async getPlaceByGoogleId(
    @Param('id') id: string,
  ): Promise<PlaceWithFindsDto> {
    return this.placesService.getPlaceByGoogleId(id);
  }
}
