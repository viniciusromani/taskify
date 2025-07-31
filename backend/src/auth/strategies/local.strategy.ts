import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { STRATEGIES } from '../common/constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  STRATEGIES.LOCAL,
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    return await this.authService.validateUserPassword(email, password);
  }
}
