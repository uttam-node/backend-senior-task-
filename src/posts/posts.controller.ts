import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Req() req, @Body() dto: CreatePostDto) {
    return this.service.createPost(dto, req.user.id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', example: 5, type: Number })
  list(@Query() query: PaginationDto) {
    return this.service.listPosts(query.page || 1);
  }

  @Get(':id')
  @ApiBearerAuth()
  async detail(@Param('id') id: string) {
    const post = await this.service.getPostById(id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }
}
