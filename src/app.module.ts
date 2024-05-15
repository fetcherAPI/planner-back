import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { GoalModule } from './goal/goal.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, GameModule, GoalModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
