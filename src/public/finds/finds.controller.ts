import { Controller, Get, Logger } from '@nestjs/common';
import { FindsService } from './finds.service';
import { ApiTags } from '@nestjs/swagger';
import { FindDto } from './dto/Find.dto';

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
}
