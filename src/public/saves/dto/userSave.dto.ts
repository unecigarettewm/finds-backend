import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';
import { FindDto } from 'src/public/finds/dto/find.dto';

export class UserSaveDto extends Dto<UserSaveDto> {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty({ type: FindDto })
  find: FindDto;
}
