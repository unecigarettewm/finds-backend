import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserProfileDto } from './dto/userProfile.dto';
import { ReqUser, ReqUserType } from 'src/auth/util/user.decorator';
import { AuthUserDto } from './dto/authUser.dto';

@ApiTags('users')
@Controller('user')
export class UsersController {
  logger: Logger;

  constructor(private readonly usersService: UsersService) {
    this.logger = new Logger();
  }

  @Get('profile/:id')
  async getProfileAndFinds(@Param('id') id: number): Promise<UserProfileDto> {
    return this.usersService.getProfileAndFinds(Number(id));
  }

  @UseGuards(JwtGuard)
  @Post('username/:username')
  async updateUsername(
    @Param('username') username: string,
    @ReqUser() user: ReqUserType,
  ): Promise<AuthUserDto> {
    return this.usersService.updateUsername(username, user.userId.id);
  }
}
