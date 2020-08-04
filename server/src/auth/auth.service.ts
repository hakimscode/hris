/* eslint-disable no-empty-function */
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(
    usernameInput: string,
    passwordInput: string
  ): Promise<any> {
    const user = await this.usersService.getUser(usernameInput);

    if (user) {
      const isMatch = await compare(passwordInput, user.password);
      if (isMatch) return user;
    }
    return null;
  }

  async login(user: any) {
    // eslint-disable-next-line no-underscore-dangle
    const payload = {
      // eslint-disable-next-line no-underscore-dangle
      sub: user._id,
      username: user.username,
      userRole: user.userRole,
      company: user.company
    };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
