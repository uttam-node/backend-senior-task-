import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [RankingService, PrismaService],
  controllers: [RankingController],
})
export class RankingModule {}
