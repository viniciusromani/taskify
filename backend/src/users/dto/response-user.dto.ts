import { UserEntity } from '../entities/user.entity';

export class ResponseUserDTO {
  id: string;
  name: string;
  email: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
