import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  thumbUp: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  thumbDown: number;
}
