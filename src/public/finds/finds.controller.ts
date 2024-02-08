import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FindsService } from './finds.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindDto } from './dto/find.dto';
import { ReqUser, ReqUserType } from 'src/auth/util/user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateFindDto } from './dto/createFind.dto';
import { CategoryDto } from './dto/category.dto';

@ApiTags('finds')
@Controller('finds')
export class FindsController {
  logger: Logger;

  constructor(private readonly findsService: FindsService) {
    this.logger = new Logger();
  }

  @Get('all')
  async allFinds(): Promise<FindDto[]> {
    return this.findsService.getAllFinds();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('following')
  async followingFinds(@ReqUser() user: ReqUserType): Promise<FindDto[]> {
    return this.findsService.getFollowingFinds(user.userId.id);
  }

  @Get(':id')
  async getFindById(@Param('id') findId: string): Promise<FindDto> {
    return this.findsService.getFindById(Number(findId));
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('create')
  async createFind(
    @ReqUser() user: ReqUserType,
    @Body() createFindDto: CreateFindDto,
  ): Promise<FindDto> {
    return this.findsService.createFind(user.userId.id, createFindDto);
  }

  @Post('categories')
  async getAllCategories(): Promise<CategoryDto[]> {
    return this.findsService.getAllCategories();
  }
}
