import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(1, 30)
  title: string;

  @IsString()
  @Length(1, 1000)
  content: string;
}