import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Get,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentPaginationDto } from './dto/comment-pagination.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':postId')
  create(@Param('postId') postId: string, @Req() req, @Body() dto: CreateCommentDto) {
    return this.service.create(postId, req.user.id, dto);
  }

  @Get('post/:postId')
  @ApiBearerAuth()
  @ApiQuery({ name: 'cursor', example: 2, type: Number })
  list(@Param('postId') postId: string, @Query() query: CommentPaginationDto) {
    return this.service.findByPost(postId, query.cursor);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  @ApiBearerAuth()
  async delete(@Param('commentId') id: string, @Req() req) {
    const deleted = await this.service.delete(id, req.user.id);
    if (!deleted) throw new NotFoundException('Comment not found');
    return deleted;
  }
}
