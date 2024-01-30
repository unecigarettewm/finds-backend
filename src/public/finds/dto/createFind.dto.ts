import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';
import { TagDto } from './tag.dto';

export class CreateFindDto extends Dto<CreateFindDto> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  googlePlaceId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  review: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  ratingId: number;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  images: string[];

  @ApiProperty({ type: [TagDto] })
  @IsNotEmpty()
  tags: TagDto[];
}
