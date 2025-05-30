import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;

  const mockPostsService = {
    createPost: jest.fn((dto, userId) => ({ ...dto, userId })),
    listPosts: jest.fn(() => ({
      total: 1,
      page: 1,
      posts: [{ id: '1', title: 'Test', username: '홍길동', createdAt: new Date().toISOString() }],
    })),
    getPostById: jest.fn((id) => ({
      id,
      title: 'Test',
      content: 'Hello world',
      username: '홍길동',
      createdAt: new Date().toISOString(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [{ provide: PostsService, useValue: mockPostsService }],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should create a post', async () => {
    const dto = { title: 'Test', content: 'Hello world' };
    const result = await controller.create({ user: { id: 'abc' } }, dto);
    expect(result).toEqual({ ...dto, userId: 'abc' });
  });

  it('should list posts', async () => {
    const result = await controller.list({ page: 1 });
    expect(result.posts).toHaveLength(1);
  });

  it('should return post detail', async () => {
    const result = await controller.detail('123');
    expect(result.id).toEqual('123');
  });
});
