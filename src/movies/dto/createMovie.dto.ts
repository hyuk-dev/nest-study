import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @ApiProperty({
    example: '영화 제목1',
    description: '영화의 제목을 입력하는 속성입니다.',
  })
  title: string;

  @IsString()
  @ApiProperty({
    example: '영화 설명1',
    description: '영화의 상세 설명이 들어가는 속성입니다.',
  })
  description: string;
}
