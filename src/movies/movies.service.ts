import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/createMovie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async getMovies() {
    return await this.movieRepository.find();
  }

  async getMovieOne(movieId: number): Promise<Movie> {
    const foundMovie = await this.movieRepository.findOne({
      where: {
        id: movieId,
      },
    });
    if (!foundMovie) throw new NotFoundException();
    else return foundMovie;
  }

  async createMovie(data: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(data);
    return await this.movieRepository.save(movie);
  }

  async patchMovie(
    data: Partial<CreateMovieDto>,
    movieId: number,
  ): Promise<Movie> {
    await this.movieRepository.update(movieId, data);
    const updatedMovie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
    if (!updatedMovie) {
      throw new NotFoundException();
    }
    return updatedMovie;
  }

  async deleteMovie(movieId: number): Promise<string> {
    const movie = await this.movieRepository.findOne({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }
    await this.movieRepository.remove(movie);
    return '성공적으로 삭제되었습니다.';
  }
}
