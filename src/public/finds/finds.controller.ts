import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { FindsService } from './finds.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReqUser } from 'src/auth/util/user.decorator';
import { JwtUser, toUserId } from 'src/auth/util/dto/jwt-user.dto';

@ApiTags('finds')
@Controller('finds')
export class FindsController {
  logger: Logger;

  constructor(private readonly findsService: FindsService) {
    this.logger = new Logger();
  }

  @Get('all')
  async allFinds() {
    return this.findsService.getAllFinds();
  }

  @UseGuards(JwtGuard)
  @Get('user-finds')
  async userFinds(@ReqUser() user: JwtUser) {
    const id = toUserId(user);
    return this.findsService.getUserFinds(id);
  }
}
