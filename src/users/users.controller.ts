import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Param,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'User has been submitted Successfully', user: newUser });
  }

  @Get(':userId')
  async getUser(@Res() res, @Param('userId') userId: string) {
    const user = await this.usersService.getUser(userId);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return res.status(HttpStatus.OK).json(user);
  }
}
