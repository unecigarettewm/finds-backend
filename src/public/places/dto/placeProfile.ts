import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';
import { FindDto } from 'src/public/finds/dto/Find.dto';

export class PlaceProfileDto extends Dto<PlaceProfileDto> {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  categories: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  googleMapsUri: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  googlePlaceId: string;

  @ApiProperty({ type: [FindDto] })
  finds: FindDto[];
}
