import { ApiProperty } from '@nestjs/swagger';
import { Dto } from 'src/lib/dto/Dto';
import { GooglePlaceDto } from './googlePlace.dto';

export class GooglePlaceSearchResponseDto extends Dto<GooglePlaceSearchResponseDto> {
  @ApiProperty({ type: [GooglePlaceDto] })
  places: GooglePlaceDto[];
}
