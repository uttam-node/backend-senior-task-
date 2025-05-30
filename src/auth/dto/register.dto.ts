import { IsEmail, IsString, Matches, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'test@example.com', description: 'Email ID (must be unique)' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: '12-20 char, with lowercase, special char, number',
  })
  @IsString()
  @Length(12, 20)
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message: 'Password must include lowercase, number, and special character',
  })
  password: string;

  @ApiProperty({ example: '홍길동', description: 'Korean name, 1–10 characters' })
  @IsString()
  @Matches(/^[가-힣]{1,10}$/, {
    message: 'Username must be Korean characters (1–10)',
  })
  username: string;
}
