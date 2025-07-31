import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base/base.entity';
import { UserEntity } from '../../users/entities/user.entity';

export enum TaskStatus {
  PENDING = 'pending',
  FINISHED = 'finished',
}

@Entity('tasks')
export class TaskEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @ManyToOne(() => UserEntity, (user) => user.tasks, {
    nullable: false,
    eager: true,
  })
  // not necessary, just setting column name here
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
