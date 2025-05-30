import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [AuthModule, PostsModule, CommentsModule, RankingModule],
})
export class AppModule {}
