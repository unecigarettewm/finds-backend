import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

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
  categoryId: number;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  images: string[];

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  tags: string[];
}
