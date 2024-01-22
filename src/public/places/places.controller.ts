import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PlacesService } from './places.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { PlaceProfileDto } from './dto/placeProfile';

@ApiTags('places')
@Controller('place')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getPlaceByGoogleId(@Param('id') id: string): Promise<PlaceProfileDto> {
    return this.placesService.getPlaceByGoogleId(id);
  }
}
