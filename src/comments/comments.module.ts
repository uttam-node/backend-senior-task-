import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  providers: [CommentsService, PrismaService, JwtAuthGuard],
  controllers: [CommentsController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '20m' },
    }),
  ],
})
export class CommentsModule {}
