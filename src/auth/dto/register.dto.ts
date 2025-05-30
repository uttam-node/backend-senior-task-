import { IsEmail, IsString, Matches, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(12, 20)
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message: 'Password must include lowercase, number, and special character'
  })
  password: string;

  @IsString()
  @Matches(/^[가-힣]{1,10}$/, {
    message: 'Username must be Korean characters (1–10)'
  })
  username: string;
}