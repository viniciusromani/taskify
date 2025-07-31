import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { STRATEGIES } from '../common/constants';

@Injectable()
export class LocalGuard extends AuthGuard(STRATEGIES.LOCAL) {}
