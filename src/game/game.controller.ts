import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GoalService } from 'src/goal/goal.service';
import { Game } from '@prisma/client';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly goalService: GoalService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateGameDto) {
    const game: Game = await this.gameService.create(dto);

    try {
      dto.goals.forEach((el) => {
        this.goalService.create({
          scoredDate: game.createdDate,
          playerId: el.playerId,
          forTeamId: el.forTeamId,
          toTeamId: el.toTeamId,
          gameId: game.id,
          count: el.count,
        });
      });
      return game;
    } catch (err) {
      throw new UnauthorizedException('refresh token not passed');
    }
  }

  @Get()
  async findAll() {
    return await this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(+id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameService.remove(id);
  }
}
