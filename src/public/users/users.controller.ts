import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UsersController {
  logger: Logger;

  constructor(private readonly usersService: UsersService) {
    this.logger = new Logger();
  }

  @UseGuards(JwtGuard)
  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    return this.usersService.getUserProfile(Number(id));
  }
}
