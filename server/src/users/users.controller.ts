import {
  Controller,
  Res,
  HttpStatus,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AuthGuard } from '@nestjs/passport';

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

  @Post()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'user'
  })
  async creatUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
