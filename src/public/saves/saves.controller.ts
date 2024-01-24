import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { SavesService } from './saves.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReqUser, ReqUserType } from 'src/auth/util/user.decorator';
import { UserSaveDto } from './dto/userSave.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('saves')
@Controller('saves')
export class SavesController {
  logger: Logger;

  constructor(private readonly savesService: SavesService) {
    this.logger = new Logger();
  }

  @UseGuards(JwtGuard)
  @Get('user-saves')
  async getUserSaves(@ReqUser() user: ReqUserType): Promise<UserSaveDto[]> {
    return this.savesService.getUserSaves(user.userId.id);
  }
}
