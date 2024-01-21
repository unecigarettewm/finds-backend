import { IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class CreateUserDto extends Dto<CreateUserDto> {
  @IsString()
  firstname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
