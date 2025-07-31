import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { TaskStatus } from '../entities/task.entity';

export class RequestTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  description: string;

  @ApiProperty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateRequestTaskDto extends PartialType(RequestTaskDto) {}
