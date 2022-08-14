import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository } from '../../repository/user.repository';
import { CreateMovieInteractionDto } from '../movie-interaction/dto/create-movie-interaction.dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<any>;

  findByEmail(email: string): Promise<any>;
}

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }
}
