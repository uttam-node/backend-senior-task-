import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [PostsService, PrismaService, JwtAuthGuard],
  controllers: [PostsController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '20m' },
    }),
  ],
})
export class PostsModule {}
