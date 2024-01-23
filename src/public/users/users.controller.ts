import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserProfileDto } from './dto/userProfile.dto';

@ApiTags('users')
@Controller('user')
export class UsersController {
  logger: Logger;

  constructor(private readonly usersService: UsersService) {
    this.logger = new Logger();
  }

  // @UseGuards(JwtGuard)
  @Get('profile/:id')
  async getProfileAndFinds(@Param('id') id: string): Promise<UserProfileDto> {
    return this.usersService.getProfileAndFinds(Number(id));
  }
}
