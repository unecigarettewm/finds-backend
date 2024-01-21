import { Controller, Get, UseGuards } from '@nestjs/common';
import { FindsService } from './finds.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('finds')
@Controller('finds')
export class FindsController {
  constructor(private readonly findsService: FindsService) {}

  @UseGuards(JwtGuard)
  @Get('all')
  async allFinds() {
    return this.findsService.getAllFinds();
  }
}
