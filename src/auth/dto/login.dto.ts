import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'Email ID (must be unique)',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: '12-20 char, with lowercase, special char, number',
  })
  @IsString()
  password: string;
}
