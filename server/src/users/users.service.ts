/* eslint-disable new-cap */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
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

  async getAdmins(): Promise<ResponseDto> {
    const admins: User[] = await this.UserModel.find({
      userRole: 'Admin Company'
    })
      .populate('company')
      .exec();

    if (!admins.length) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Admins does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(HttpStatus.OK, 'Admins Found', admins);
  }

  async getUser(username: string): Promise<User> {
    const user = await this.UserModel.findOne({ username })
      .select('+password')
      .exec();
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<ResponseDto> {
    const { username, password, userRole, company } = createUserDto;
    const newUser = new this.UserModel({
      username,
      password: await HashPassword(password),
      userRole,
      company
    });
    await newUser.save();

    const user = await this.UserModel.findById(newUser._id)
      .populate('company')
      .exec();

    return new ResponseDto(
      HttpStatus.CREATED,
      'Users has been submitted successfully',
      user
    );
  }

  async deleteUser(userId: string): Promise<ResponseDto> {
    const deletedUser = await this.UserModel.findByIdAndRemove(userId);

    if (!deletedUser) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'User does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(HttpStatus.OK, 'User has been deleted successfully');
  }
}
