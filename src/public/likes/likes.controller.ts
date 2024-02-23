import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReqUser, ReqUserType } from 'src/auth/util/user.decorator';
import { UserLikeDto } from './dto/userLike.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { ActiveLikeDto } from './dto/activeLike.dto';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  logger: Logger;

  constructor(private readonly likesService: LikesService) {
    this.logger = new Logger();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('user-likes')
  async getUserLikes(@ReqUser() user: ReqUserType): Promise<UserLikeDto[]> {
    return this.likesService.getUserLikes(user.userId.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @SkipThrottle()
  @Post('find-user-like')
  async getFindUserLike(
    @ReqUser() user: ReqUserType,
    @Body() { id }: { id: number },
  ): Promise<ActiveLikeDto> {
    return this.likesService.getFindUserLike(id, user.userId.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('update-like')
  async updateLike(
    @ReqUser() user: ReqUserType,
    @Body() { id }: { id: number },
  ): Promise<ActiveLikeDto> {
    return this.likesService.updateLike(id, user.userId.id);
  }
}
