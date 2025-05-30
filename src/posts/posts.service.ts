import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(dto: CreatePostDto, userId: string) {
    return await this.prisma.post.create({
      data: { ...dto, userId },
    });
  }

  async listPosts(page = 1) {
    const pageSize = 20;
    const skip = (page - 1) * pageSize;

    const [total, posts] = await Promise.all([
      this.prisma.post.count(),
      this.prisma.post.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: { user: true },
      }),
    ]);

    return {
      total,
      page,
      posts: posts.map((p) => ({
        id: p.id,
        title: p.title,
        username: p.user?.username,
        createdAt: p.createdAt.toISOString(),
      })),
    };
  }

  async getPostById(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!post) return null;

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      username: post.user?.username,
      createdAt: post.createdAt.toISOString(),
    };
  }
}
