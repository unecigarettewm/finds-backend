import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class WaitlistSignupDto extends Dto<WaitlistSignupDto> {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  instagram: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}
