import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNumber()
  value: number;
}
