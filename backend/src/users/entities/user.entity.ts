import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../base/base.entity';
import { TaskEntity } from '../../tasks/entities/task.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}
