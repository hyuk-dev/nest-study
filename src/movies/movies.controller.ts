import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/createMovie.dto';
import { Movie } from './movies.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @ApiOperation({
    summary: '영화 리스트 조회',
    description: '전체 영화 리스트를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공 시 응답',
    type: [Movie],
  })
  @Get()
  async getMovies(): Promise<Movie[]> {
    return await this.moviesService.getMovies();
  }

  @Get('/:id')
  getMovieOne(@Param('id') movieId: string): Promise<Movie> {
    return this.moviesService.getMovieOne(parseInt(movieId));
  }

  @Post()
  async postMovie(@Body() postData: CreateMovieDto): Promise<Movie> {
    return await this.moviesService.createMovie(postData);
  }

  @Patch('/:id')
  async patchMovie(
    @Body() patchData: Partial<CreateMovieDto>,
    @Param('id') movieId: string,
  ): Promise<Movie> {
    return await this.moviesService.patchMovie(patchData, +movieId);
  }

  @Delete('/:id')
  async deleteMovie(@Param('id') movieId: string): Promise<string> {
    return await this.moviesService.deleteMovie(+movieId);
  }
}
