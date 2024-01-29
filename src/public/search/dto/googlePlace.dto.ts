import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

class GooglePlaceDisplayNameDto extends Dto<GooglePlaceDisplayNameDto> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  languageCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class GooglePlaceDto extends Dto<GooglePlaceDto> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: GooglePlaceDisplayNameDto })
  displayName: GooglePlaceDisplayNameDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shortFormattedAddress: string;

  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  types: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  googleMapsUri: string;
}
