import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let jwtService: JwtService;
  let prisma: PrismaService;

  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    username: '홍길동',
  };

  const mockJwtService = {
    verify: jest.fn(() => ({ id: 'user-123' })),
  };

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(() => mockUser),
    },
  };

  beforeEach(() => {
    jwtService = mockJwtService as any;
    prisma = mockPrismaService as any;
    guard = new JwtAuthGuard(jwtService, prisma);
  });

  const mockContext = (token?: string) =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: token ? `Bearer ${token}` : undefined,
          },
        }),
      }),
    }) as unknown as ExecutionContext;

  it('should allow valid token and user', async () => {
    const context = mockContext('valid-token');
    const result = await guard.canActivate(context);
    expect(result).toBe(true);
    expect(mockJwtService.verify).toBeCalledWith('valid-token');
    expect(mockPrismaService.user.findUnique).toBeCalledWith({
      where: { id: 'user-123' },
    });
  });

  it('should throw if no token provided', async () => {
    const context = mockContext(undefined);
    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw if JWT is invalid', async () => {
    mockJwtService.verify = jest.fn(() => {
      throw new Error('Invalid token');
    });

    const context = mockContext('invalid-token');
    guard = new JwtAuthGuard(mockJwtService as any, prisma);

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw if user not found', async () => {
    (
      mockPrismaService.user!.findUnique as jest.Mock<any, any>
    ).mockResolvedValueOnce(null);
    const context = mockContext('valid-token');
    await expect(guard.canActivate(context)).rejects.toThrow('User not found');
  });
});
