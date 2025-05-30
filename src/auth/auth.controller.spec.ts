import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn((dto) => ({
      email: dto.email,
      username: dto.username,
      createdAt: new Date().toISOString(),
    })),
    login: jest.fn(() => ({ token: 'mocked-token' })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const dto: RegisterDto = {
      email: 'test@example.com',
      password: 'Password123!',
      username: '홍길동',
    };

    const result = await controller.register(dto);
    expect(result.email).toEqual(dto.email);
    expect(result.username).toEqual(dto.username);
    expect(service.register).toBeCalledWith(dto);
  });

  it('should login and return token', async () => {
    const result = await controller.login(
      { email: 'test@example.com', password: 'Password123!' },
      { ip: '127.0.0.1' },
    );
    expect(result.token).toEqual('mocked-token');
  });
});
