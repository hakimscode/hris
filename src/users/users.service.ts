/* eslint-disable new-cap */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  // eslint-disable-next-line no-empty-function
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUser(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user;
  }
}
