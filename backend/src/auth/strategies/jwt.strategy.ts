import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { STRATEGIES } from '../common/constants';
import jwtConfig from '../common/jwt-config';
import { JwtPayload } from '../common/jwt-payload.type';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, STRATEGIES.JWT) {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const authCookie = request.cookies?.authentication;
          return typeof authCookie === 'string' ? authCookie : null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      secretOrKey: jwtConfiguration.secret!,
      ignoreExpiration: true,
    });
  }

  validate(payload: JwtPayload) {
    return this.authService.validateUserJwt(payload.sub);
  }
}
