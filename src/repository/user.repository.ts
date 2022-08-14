import { UserDocument, UserEntity } from '../model/user.entity';
import { Connection, FilterQuery, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { CreateUserDto } from '../core/users/dto/create-user.dto';

export interface IUserRepository {
  createUser(user: CreateUserDto): Promise<any>;

  findOne(conditions?: FilterQuery<UserEntity>): Promise<UserEntity>;
}

export class UserRepository implements IUserRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(UserEntity.name)
    private readonly userModal: Model<UserDocument>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<any> {
    const user = new this.userModal({
      email: userDto.email,
      password: userDto.password,
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
    });
    return user.save();
  }

  async findOne(conditions?: FilterQuery<UserEntity>): Promise<any> {
    return this.userModal.findOne(conditions).lean();
  }
}
