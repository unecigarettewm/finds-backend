import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';
import { FindDto } from 'src/public/finds/dto/Find.dto';

export class PlaceDetailsDto extends Dto<PlaceDetailsDto> {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString({ each: true })
  @IsNotEmpty()
  categories: string[];

  @IsString()
  @IsNotEmpty()
  googleMapsUri: string;

  @IsString()
  @IsNotEmpty()
  googlePlaceId: string;

  @IsNotEmpty()
  finds: FindDto;
}
