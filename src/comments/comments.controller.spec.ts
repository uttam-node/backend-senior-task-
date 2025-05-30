import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  const mockCommentsService = {
    create: jest.fn(() => ({ message: 'Created' })),
    findByPost: jest.fn(() => ({ comments: [], nextCursor: null })),
    delete: jest.fn(() => ({ message: 'Comment deleted' })),
  };

  const mockJwtGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        { provide: CommentsService, useValue: mockCommentsService },
        { provide: JwtAuthGuard, useValue: mockJwtGuard },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  it('should delete a comment', async () => {
    const req = { user: { id: 'user-123' } };
    const result = await controller.delete('comment-id-1', req);
    expect(result).toEqual({ message: 'Comment deleted' });
    expect(service.delete).toBeCalledWith('comment-id-1', 'user-123');
  });
});
