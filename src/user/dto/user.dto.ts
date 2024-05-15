import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { PomodoroSettingsDto } from './pomodoro.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends PomodoroSettingsDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ default: 'updated@gmail.com' })
  email: string;

  @ApiProperty({ default: '54321' })
  @MinLength(6, {
    message: 'must be 6 symbols',
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  password: string;
}
