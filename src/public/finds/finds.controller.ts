import { Controller, Get } from '@nestjs/common';
import { FindsService } from './finds.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('finds')
@Controller('finds')
export class FindsController {
  constructor(private readonly findsService: FindsService) {}

  @Get('all')
  async allFinds() {
    return this.findsService.getAllFinds();
  }
}
