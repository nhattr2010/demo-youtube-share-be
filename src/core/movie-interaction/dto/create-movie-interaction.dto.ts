import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieInteractionDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  movie: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  value: number;
}
