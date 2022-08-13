import { UserDocument, UserEntity } from '../model/user.entity';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { CreateUserDto } from '../core/users/dto/create-user.dto';

export interface IUserRepository {
  createUser(user: CreateUserDto): Promise<any>;
}

export class UserRepository implements IUserRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(UserEntity.name)
    private readonly userModal: Model<UserDocument>,
  ) {}

  async createUser(user: CreateUserDto): Promise<any> {
    const post = new this.userModal({
      email: user.email,
      password: user.password,
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
    });
    return post.save();
  }
}
