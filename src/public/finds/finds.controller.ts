import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
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

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('all')
  async allFinds(): Promise<FindDto[]> {
    return this.findsService.getAllFinds();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('following')
  async followingFinds(@ReqUser() user: ReqUserType): Promise<FindDto[]> {
    return this.findsService.getFollowingFinds(user.userId.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('find')
  async getFindById(@Body() { id }: { id: string }): Promise<FindDto> {
    return this.findsService.getFindById(Number(id));
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

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('categories')
  async getAllCategories(@ReqUser() user: ReqUserType): Promise<CategoryDto[]> {
    return this.findsService.getAllCategories(user.userId.id);
  }
}
