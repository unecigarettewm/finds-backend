import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { PlacesAndProfilesDto } from './dto/placesAndProfiles.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(JwtGuard)
  @Post(':query')
  async search(@Param('query') query: string): Promise<PlacesAndProfilesDto> {
    return this.searchService.searchPlacesAndProfiles(query);
  }
}
