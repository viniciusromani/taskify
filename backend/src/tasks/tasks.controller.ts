import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { RequestTaskDto, UpdateRequestTaskDto } from './dto/request-task.dto';
import { ResponseTaskDTO } from './dto/response-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { User } from '../auth/decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: RequestTaskDto, @User() user: UserEntity,) {
    const createdTask = await this.tasksService.create(
      createTaskDto, user.id
    );
    return new ResponseTaskDTO(createdTask);
  }

  @Get()
  async findAll(@User() user: UserEntity) {
    const tasks = await this.tasksService.findAll(user.id);
    return tasks.map((task: TaskEntity) => new ResponseTaskDTO(task));
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string, @User() user: UserEntity) {
    const task = await this.tasksService.findBy({ id }, user.id);
    return new ResponseTaskDTO(task);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateRequestTaskDto,
    @User() user: UserEntity
  ) {
    const updatedTask = await this.tasksService.update(id, user.id, updateTaskDto);
    return new ResponseTaskDTO(updatedTask);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string, @User() user: UserEntity) {
    const result = await this.tasksService.remove(id, user.id);
    if (result) return;
  }
}
