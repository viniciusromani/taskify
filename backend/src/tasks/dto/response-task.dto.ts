import { ApiProperty } from '@nestjs/swagger';

import { TaskEntity, TaskStatus } from '../entities/task.entity';

export class ResponseTaskDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  status: TaskStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(task: TaskEntity) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}
