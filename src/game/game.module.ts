import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PrismaService } from 'src/prisma.service';
import { GoalService } from 'src/goal/goal.service';

@Module({
  controllers: [GameController],
  providers: [GameService, PrismaService, GoalService],
})
export class GameModule {}
