import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
