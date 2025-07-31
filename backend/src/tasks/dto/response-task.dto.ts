import { TaskEntity, TaskStatus } from '../entities/task.entity';

export class ResponseTaskDTO {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
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
