import { Dto } from 'src/lib/dto/Dto';
import { ProfileDto } from 'src/public/users/dto/profile.dto';
import { GooglePlaceDto } from './googlePlace.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PlacesAndProfilesDto extends Dto<PlacesAndProfilesDto> {
  @ApiProperty({ type: [GooglePlaceDto] })
  places: GooglePlaceDto[];

  @ApiProperty({ type: [ProfileDto] })
  profiles: ProfileDto[];
}
