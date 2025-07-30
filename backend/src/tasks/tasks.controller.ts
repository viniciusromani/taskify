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

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: RequestTaskDto) {
    // TODO: temp user-id until auth implementation
    const createdTask = await this.tasksService.create(
      createTaskDto,
      'a6df7ea7-4fb5-4c47-bfd4-96a8fcda5e73',
    );
    return new ResponseTaskDTO(createdTask);
  }

  @Get()
  async findAll() {
    const tasks = await this.tasksService.findAll();
    return tasks.map((task: TaskEntity) => new ResponseTaskDTO(task));
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const task = await this.tasksService.findBy({ id });
    return new ResponseTaskDTO(task);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateRequestTaskDto,
  ) {
    const updatedTask = await this.tasksService.update(id, updateTaskDto);
    return new ResponseTaskDTO(updatedTask);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.tasksService.remove(id);
    if (result) return;
  }
}
