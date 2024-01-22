import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';
import { FindDto } from 'src/public/finds/dto/Find.dto';

export class UserProfileDto extends Dto<UserProfileDto> {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsNumber()
  followers: number;

  @ApiProperty({ type: [FindDto] })
  finds: FindDto[];
}
