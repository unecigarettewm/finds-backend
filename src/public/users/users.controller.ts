import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UsersController {
  logger: Logger;

  constructor(private readonly usersService: UsersService) {
    this.logger = new Logger();
  }

  @UseGuards(JwtGuard)
  @Get('profile/:id')
  async getUserProfile(@Param('id') id: string) {
    return this.usersService.getUserProfile(Number(id));
  }
}
