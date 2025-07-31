import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';

import { UserEntity } from '../../users/entities/user.entity';

interface RequestWithUser extends Request {
  user?: UserEntity;
}

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    try {
      const request = ctx.switchToHttp().getRequest<RequestWithUser>();
      return request.user;
    } catch {
      throw new InternalServerErrorException(
        'Error extracting user from request',
      );
    }
  },
);
