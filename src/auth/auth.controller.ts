import { Body, Controller, Post, Req, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto, @Req() req) {
    return this.authService.login(dto, req);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  update(@Req() req, @Body() dto: UpdateUserDto) {
    return this.authService.updateProfile(req.user.id, dto);
  }
}