import { Decimal } from '@prisma/client/runtime/library';
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';
import { ProfileDto } from 'src/public/users/dto/profile.dto';

export class FindDto extends Dto<FindDto> {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  review: string;

  @IsDecimal()
  @IsNotEmpty()
  rating: Decimal;

  @IsString()
  @IsNotEmpty()
  googlePlaceId: string;

  @IsString({ each: true })
  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  user: ProfileDto;
}
