import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(postId: string, userId: string, dto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        content: dto.content,
        postId,
        userId,
      },
    });
  }

  async findByPost(postId: string, cursor?: string) {
    const limit = 10;
    const where = { postId };
    const comments = await this.prisma.comment.findMany({
      where,
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });

    const nextCursor =
      comments.length === limit ? comments[comments.length - 1].id : null;

    return {
      nextCursor,
      comments: comments.map((c) => ({
        id: c.id,
        content: c.content,
        username: c.user?.username,
        createdAt: c.createdAt.toISOString(),
      })),
    };
  }

  async delete(commentId: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) return null;

    const post = await this.prisma.post.findUnique({
      where: { id: comment.postId },
    });
    if (comment.userId !== userId && post?.userId !== userId) {
      throw new ForbiddenException('Not authorized');
    }

    await this.prisma.comment.delete({ where: { id: commentId } });
    return { message: 'Comment deleted' };
  }
}
