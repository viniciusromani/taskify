import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { RequestLoginDto } from './request-login.dto';

export class RequestRegisterDto extends RequestLoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
