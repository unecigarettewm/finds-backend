import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';
import { ProfileDto } from 'src/public/users/dto/profile.dto';

export class FindDto extends Dto<FindDto> {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  review: string;

  @ApiProperty()
  @IsDecimal()
  @IsNotEmpty()
  rating: Decimal;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  googlePlaceId: string;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  images: string[];

  @ApiProperty()
  @IsNotEmpty()
  user: ProfileDto;
}
