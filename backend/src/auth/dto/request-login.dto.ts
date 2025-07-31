import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RequestLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
