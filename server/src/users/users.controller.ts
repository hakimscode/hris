import {
  Controller,
  Res,
  HttpStatus,
  Get,
  Param,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async getUser(@Res() res, @Param('userId') userId: string) {
    const user = await this.usersService.getUser(userId);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return res.status(HttpStatus.OK).json(user);
  }
}