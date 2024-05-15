import {
  Body,
  Controller,
  Get,
  HttpCode,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('user/profile')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('')
  @Auth()
  async profile(@CurrentUser('id') id: string) {
    return this.userService.profile(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto);
  }
}
