import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  createdBy: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  thumbUp: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  thumbDown: number;
}
