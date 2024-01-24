import { Module } from '@nestjs/common';
import { SavesService } from './saves.service';
import { SavesController } from './saves.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SavesController],
  providers: [SavesService, PrismaService],
})
export class SavesModule {}
