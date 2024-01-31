import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class ActiveSaveDto extends Dto<ActiveSaveDto> {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  findId: number;

  @ApiProperty()
  @IsNotEmpty()
  deleted_at: Date;
}
