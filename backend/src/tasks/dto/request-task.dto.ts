import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { TaskStatus } from '../entities/task.entity';

export class RequestTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3)
  description: string | null;

  @ApiProperty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateRequestTaskDto extends PartialType(RequestTaskDto) {}
