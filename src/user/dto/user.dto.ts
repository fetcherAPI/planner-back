import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { PomodoroSettingsDto } from './pomodoro.dto';

export class UserDto extends PomodoroSettingsDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @MinLength(6, {
    message: 'must be 6 symbols',
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  password: string;
}
