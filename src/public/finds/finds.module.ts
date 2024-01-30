import { Module } from '@nestjs/common';
import { FindsService } from './finds.service';
import { FindsController } from './finds.controller';
import { PrismaService } from 'src/prisma.service';
import { SearchService } from '../search/search.service';
import { PlacesService } from '../places/places.service';

@Module({
  controllers: [FindsController],
  providers: [FindsService, PrismaService, SearchService, PlacesService],
})
export class FindsModule {}
