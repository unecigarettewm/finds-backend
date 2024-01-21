import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth-guard';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const { access_token, user } = await this.authService.login(req.user);
    return {
      access_token,
      user,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
