import { TaskEntity } from '../entities/task.entity';

export class ResponseTaskDTO {
  id: string;
  title: string;
  description: string;

  constructor(task: TaskEntity) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
  }
}
