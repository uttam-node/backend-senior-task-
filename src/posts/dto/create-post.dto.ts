import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'title',
    description: '1-30 characters',
  })
  @IsString()
  @Length(1, 30)
  title: string;

  @ApiProperty({
    example: 'content',
    description: '1-1000 characters',
  })
  @IsString()
  @Length(1, 1000)
  content: string;
}
