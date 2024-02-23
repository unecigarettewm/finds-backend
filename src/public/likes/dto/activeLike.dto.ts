import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class ActiveLikeDto extends Dto<ActiveLikeDto> {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  findId: number;

  @ApiProperty()
  @IsNotEmpty()
  deleted_at: Date;
}
