import { Controller, Get } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {
  constructor(private service: RankingService) {}

  @Get('weekly')
  getRanking() {
    return this.service.getWeeklyLoginRanking();
  }
}
