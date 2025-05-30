import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: '홍길동',
    description: 'Korean name, 1–10 characters',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[가-힣]{1,10}$/)
  username?: string;

  @ApiPropertyOptional({
    example: 'Password123!',
    description: '12-20 char, with lowercase, special char, number',
  })
  @IsOptional()
  @IsString()
  @Length(12, 20)
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message: 'Password must include lowercase, number, and special character',
  })
  password?: string;
}
