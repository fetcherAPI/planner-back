import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty({ message: 'createdDate не должен быть пустым' })
  createdDate: Date;
  @IsNotEmpty({ message: 'firstTeamId не должен быть пустым' })
  firstTeamId: string;
  @IsNotEmpty({ message: 'secondTeamId не должен быть пустым' })
  secondTeamId: string;
  @IsNotEmpty({ message: 'goals не должен быть пустым' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoalDto)
  goals: Array<GoalDto>;
}

class GoalDto {
  @IsNotEmpty({ message: 'forTeamId не должен быть пустым' })
  forTeamId: string;
  @IsNotEmpty({ message: 'playerId не должен быть пустым' })
  playerId;
  @IsNotEmpty({ message: 'toTeamId не должен быть пустым' })
  toTeamId: string;
  @IsNotEmpty({ message: 'count не должен быть пустым' })
  count: number;
}
