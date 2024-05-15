import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({ default: 'test@gmail.com', description: 'required' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '12345', description: 'required' })
  @MinLength(6, {
    message: 'must be 6 symbols',
  })
  @IsString()
  password: string;
}
