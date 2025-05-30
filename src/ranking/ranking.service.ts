import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { startOfWeek, endOfWeek } from 'date-fns';

@Injectable()
export class RankingService {
  constructor(private prisma: PrismaService) {}

  async getWeeklyLoginRanking() {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });

    const raw = await this.prisma.loginRecord.groupBy({
      by: ['userId'],
      where: {
        timestamp: {
          gte: start,
          lte: end,
        },
      },
      _count: {
        userId: true,
      },
      orderBy: {
        _count: {
          userId: 'desc',
        },
      },
      take: 20,
    });

    if (!raw.length) return { rankings: [], totalUsers: 0 };

    const userIds = raw.map((r) => r.userId);
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, username: true },
    });
    const nameMap = Object.fromEntries(users.map((u) => [u.id, u.username]));

    const rankings: any = [];
    let currentRank = 1;
    let prevCount = raw[0]._count.userId;
    let sameRankCount = 1;

    raw.forEach((item, i) => {
      const username = nameMap[item.userId] || null;
      const count = item._count.userId;
      if (i > 0) {
        if (count === prevCount) {
          sameRankCount++;
        } else {
          currentRank += sameRankCount;
          sameRankCount = 1;
          prevCount = count;
        }
      }
      rankings.push({
        username,
        count,
        rank: currentRank,
      });
    });

    return {
      rankings,
      totalUsers: rankings.length,
    };
  }
}
