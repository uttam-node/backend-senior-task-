import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Matches(/^[가-힣]{1,10}$/)
  username?: string;

  @IsOptional()
  @IsString()
  @Length(12, 20)
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message: 'Password must include lowercase, number, and special character'
  })
  password?: string;
}