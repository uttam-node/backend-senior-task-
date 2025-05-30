import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Comment',
    description: '1-500 characters',
  })
  @IsString()
  @Length(1, 500)
  content: string;
}
