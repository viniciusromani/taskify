import { ApiProperty } from '@nestjs/swagger';

import { ResponseUserDTO } from '../../users/dto/response-user.dto';
import { UserEntity } from '../../users/entities/user.entity';

export class ResponseLoginDto extends ResponseUserDTO {
  @ApiProperty()
  accessToken: string;

  constructor(user: UserEntity, accessToken: string) {
    super(user);
    this.accessToken = accessToken;
  }
}
