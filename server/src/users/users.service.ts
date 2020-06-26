/* eslint-disable new-cap */
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseDto } from '../shared/dto/response.dto';
import { HashPassword } from '../shared/utils/hash.util';

@Injectable()
export class UsersService {
  // eslint-disable-next-line no-empty-function
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async getUser(username: string): Promise<User> {
    const user = await this.UserModel.findOne({ username });
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<ResponseDto>{
    const { username, password, userRole } = createUserDto;
    const newUser = new this.UserModel({
      username,
      password: await HashPassword(password),
      userRole
    });
    await newUser.save();

    return new ResponseDto(HttpStatus.CREATED, 'Users has been submitted successfully');
  }
}
