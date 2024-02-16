import { Module } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { WaitlistController } from './waitlist.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WaitlistController],
  providers: [WaitlistService, PrismaService],
})
export class WaitlistModule {}
