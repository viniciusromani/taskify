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
import { ApiOkResponse } from '@nestjs/swagger';

import { User } from '../auth/decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { RequestTaskDto, UpdateRequestTaskDto } from './dto/request-task.dto';
import { ResponseTaskDTO } from './dto/response-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOkResponse({ description: 'Created task', type: ResponseTaskDTO })
  async create(
    @Body() createTaskDto: RequestTaskDto,
    @User() user: UserEntity,
  ) {
    const createdTask = await this.tasksService.create(createTaskDto, user.id);
    return new ResponseTaskDTO(createdTask);
  }

  @Get()
  @ApiOkResponse({
    description: 'A list of tasks',
    type: ResponseTaskDTO,
    isArray: true,
  })
  async findAll(@User() user: UserEntity) {
    const tasks = await this.tasksService.findAll(user.id);
    return tasks.map((task: TaskEntity) => new ResponseTaskDTO(task));
  }

  @Get(':id')
  @ApiOkResponse({ description: 'A task', type: ResponseTaskDTO })
  async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @User() user: UserEntity,
  ) {
    const task = await this.tasksService.findBy({ id }, user.id);
    return new ResponseTaskDTO(task);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'An updated task', type: ResponseTaskDTO })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateRequestTaskDto,
    @User() user: UserEntity,
  ) {
    const updatedTask = await this.tasksService.update(
      id,
      user.id,
      updateTaskDto,
    );
    return new ResponseTaskDTO(updatedTask);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @User() user: UserEntity,
  ) {
    const result = await this.tasksService.remove(id, user.id);
    if (result) return;
  }
}
