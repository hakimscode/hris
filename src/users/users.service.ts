/* eslint-disable new-cap */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  // eslint-disable-next-line no-empty-function
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // eslint-disable-next-line class-methods-use-this
  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, username, password, role } = createUserDto;
    const newUser = new this.userModel({
      name,
      username,
      password: await this.hashPassword(password),
      role
    });

    return newUser.save();
  }

  async getUser(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user;
  }
}
