import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        password: hashed,
      },
    });

    return {
      email: user.email,
      username: user.username,
      createdAt: user.createdAt.toISOString(),
    };
  }

  async login(dto: LoginDto, req: any) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prisma.loginRecord.create({
      data: {
        userId: user.id,
        ip: req.ip,
        timestamp: new Date(),
      },
    });

    const token = this.jwt.sign({ id: user.id });
    return { token };
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    const data: any = {};
    if (dto.username) data.username = dto.username;
    if (dto.password) data.password = await bcrypt.hash(dto.password, 10);
    await this.prisma.user.update({ where: { id: userId }, data });
    return { message: 'Profile updated' };
  }
}