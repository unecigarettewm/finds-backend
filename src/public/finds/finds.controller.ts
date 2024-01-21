import { Controller, Get } from '@nestjs/common';
import { FindsService } from './finds.service';

@Controller('finds')
export class FindsController {
  constructor(private readonly findsService: FindsService) {}

  @Get('get-all-finds')
  async allFinds() {
    return this.findsService.getAllFinds();
  }
}
