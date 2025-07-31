import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { RequestTaskDto } from './dto/request-task.dto';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: RequestTaskDto, userId: string) {
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      user: { id: userId },
    });
    return await this.taskRepository.save(newTask);
  }

  async findAll(userId: string) {
    return await this.taskRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async findBy(where: FindOptionsWhere<TaskEntity>, userId: string) {
    const task = await this.taskRepository.findOneByOrFail(where);
    if (task.user.id != userId)
      throw new ForbiddenException('Not authorized to access resource');
    return task;
  }

  async update(id: string, userId: string, updateTaskDto: Partial<RequestTaskDto>) {
    await this.checkAccess(id, userId);
    const result = await this.taskRepository.update(id, updateTaskDto);
    if (result.affected == 0) throw new NotFoundException('Task not found');
    return await this.taskRepository.findOneByOrFail({ id });
  }

  async remove(id: string, userId: string) {
    await this.checkAccess(id, userId);
    const result = await this.taskRepository.softDelete({ id });
    if (result.affected == 0) throw new NotFoundException('Task not found');
    return true;
  }

  async checkAccess(taskId: string, userId: string) {
    const task = await this.taskRepository.findOneByOrFail({ id: taskId });
    if (task.user.id != userId)
      throw new ForbiddenException('Not authorized to access resource');
  }
}
