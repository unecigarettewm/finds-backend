import { Module } from '@nestjs/common';
import { FindsService } from './finds.service';
import { FindsController } from './finds.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FindsController],
  providers: [FindsService, PrismaService],
})
export class FindsModule {}
