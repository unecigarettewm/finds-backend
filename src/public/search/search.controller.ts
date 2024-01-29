import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { GooglePlaceSearchResponseDto } from './dto/googlePlaceSearchResponse.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(JwtGuard)
  @Post(':q')
  async searchGooglePlaces(
    @Param('q') q: string,
  ): Promise<GooglePlaceSearchResponseDto> {
    return this.searchService.searchGooglePlaces(q);
  }
}
