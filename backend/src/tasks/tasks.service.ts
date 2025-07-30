import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    return await this.taskRepository.find();
  }

  async findBy(where: FindOptionsWhere<TaskEntity>) {
    return await this.taskRepository.findOneByOrFail(where);
  }

  async update(id: string, updateTaskDto: Partial<RequestTaskDto>) {
    const result = await this.taskRepository.update(id, updateTaskDto);
    if (result.affected == 0) throw new NotFoundException('Task not found');
    return await this.taskRepository.findOneByOrFail({ id });
  }

  async remove(id: string) {
    const result = await this.taskRepository.softDelete({ id });
    if (result.affected == 0) throw new NotFoundException('Task not found');
    return true;
  }
}
