import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { FindsService } from './finds.service';
import { ApiTags } from '@nestjs/swagger';
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

  @UseGuards(JwtGuard)
  @Post('create')
  async createFind(
    @ReqUser() user: ReqUserType,
    @Body() createFindDto: CreateFindDto,
  ): Promise<FindDto> {
    return this.findsService.createFind(user.userId.id, createFindDto);
  }

  @UseGuards(JwtGuard)
  @Get('categories')
  async getAllCategories(): Promise<CategoryDto[]> {
    return this.findsService.getAllCategories();
  }
}
