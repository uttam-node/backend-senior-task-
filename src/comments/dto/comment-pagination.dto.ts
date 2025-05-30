import { IsOptional, IsString } from 'class-validator';

export class CommentPaginationDto {
  @IsOptional()
  @IsString()
  cursor?: string;
}
