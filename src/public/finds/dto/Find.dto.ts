import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';
import { PlaceDto } from 'src/public/places/dto/place.dto';
import { ProfileDto } from 'src/public/users/dto/profile.dto';
import { TagDto } from './tag.dto';

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
  @IsString()
  @IsNotEmpty()
  rating: string;

  @ApiProperty()
  @IsNotEmpty()
  place: PlaceDto;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  images: string[];

  @ApiProperty({ type: [TagDto] })
  @IsNotEmpty()
  tags: TagDto[];

  @ApiProperty()
  @IsNotEmpty()
  user: ProfileDto;

  @ApiProperty()
  @IsNotEmpty()
  createdAt: Date;
}
