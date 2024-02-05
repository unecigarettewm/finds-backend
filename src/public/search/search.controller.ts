import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PlacesAndProfilesDto } from './dto/placesAndProfiles.dto';
import { GooglePlaceDto } from './dto/googlePlace.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post(':query')
  async search(@Param('query') query: string): Promise<PlacesAndProfilesDto> {
    return this.searchService.searchPlacesAndProfiles(query);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('place/:id')
  async getGooglePlaceById(@Param('id') id: string): Promise<GooglePlaceDto> {
    return this.searchService.getGooglePlaceById(id);
  }
}
