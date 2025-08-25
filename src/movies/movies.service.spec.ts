import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './movies.entity';

describe('MoviesService', () => {
  let service: MoviesService;

  let repo: { find: jest.Mock; save: jest.Mock };

  beforeEach(async () => {
    repo = {
      find: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repo = module.get(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 125', () => {
    expect(120 + 5).toEqual(125);
  });

  it('getMovies(): repository.find() 결과를 그대로 반환해야 한다', async () => {
    const mockMovies = [{ id: 1, title: 'Test Movie' }] as Partial<Movie>[];
    repo.find.mockResolvedValue(mockMovies);
    const result = await service.getMovies();

    expect(result).toEqual(mockMovies);
    expect(repo.find).toHaveBeenCalledTimes(1);
    expect(repo.find).toHaveBeenCalledWith();
  });
});
