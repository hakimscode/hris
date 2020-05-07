import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { SECRET_KEY } from './auth.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_KEY
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
