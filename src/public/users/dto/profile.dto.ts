import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class ProfileDto extends Dto<ProfileDto> {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
