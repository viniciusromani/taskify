import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { TaskStatus } from '../entities/task.entity';

export class RequestTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateRequestTaskDto extends PartialType(RequestTaskDto) {}
