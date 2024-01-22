import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';
import { FindDto } from 'src/public/finds/dto/Find.dto';

export class PlaceProfileDto extends Dto<PlaceProfileDto> {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  categories: string[];

  @IsString()
  @IsNotEmpty()
  googleMapsUri: string;

  @IsString()
  @IsNotEmpty()
  googlePlaceId: string;

  @ApiProperty({ type: [FindDto] })
  finds: FindDto[];
}
