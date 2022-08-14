import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class GetMovieInteractionDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  movies: string[];
}
