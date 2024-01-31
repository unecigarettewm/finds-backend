import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { SavesService } from './saves.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReqUser, ReqUserType } from 'src/auth/util/user.decorator';
import { UserSaveDto } from './dto/userSave.dto';
import { ApiTags } from '@nestjs/swagger';
import { ActiveSaveDto } from './dto/activeSave.dto';

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

  @UseGuards(JwtGuard)
  @Post('find-user-save')
  async getFindUserSave(
    @ReqUser() user: ReqUserType,
    @Body() { id }: { id: number },
  ): Promise<ActiveSaveDto> {
    return this.savesService.getFindUserSave(id, user.userId.id);
  }

  @UseGuards(JwtGuard)
  @Post('add-save')
  async addSave(
    @ReqUser() user: ReqUserType,
    @Body() { id }: { id: number },
  ): Promise<ActiveSaveDto> {
    return this.savesService.addSave(id, user.userId.id);
  }

  @UseGuards(JwtGuard)
  @Post('delete-save')
  async deleteSave(
    @ReqUser() user: ReqUserType,
    @Body() { id }: { id: number },
  ): Promise<ActiveSaveDto> {
    return this.savesService.deleteSave(id, user.userId.id);
  }
}
