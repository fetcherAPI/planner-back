import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma.service';
import { toUSVString } from 'util';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateGameDto) {
    const game = {
      createdDate: dto.createdDate,
      firstTeamId: dto.firstTeamId,
      secondTeamId: dto.secondTeamId,
    };
    return this.prisma.game.create({ data: game });
  }
  findAll() {
    return this.prisma.game.findMany({
      select: {
        id: true, // Предполагая, что вам нужен ID игры
        createdDate: true, // и любые другие поля, которые вы хотите включить
        updatedAt: true,
        Goal: {
          select: {
            count: true,
            toTeam: true,
            forTeam: {
              select: {
                name: true,
              },
            },
            player: {
              select: {
                name: true,
              },
            },
          },
        },
        // Другие поля, которые вы хотите включить
        secondTeam: {
          select: {
            name: true,
          },
        },
        firstTeam: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.player.findUnique({
      include: {
        goals: {
          include: {
            toTeam: {
              select: {
                name: true,
              },
            },
            forTeam: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        id,
      },
    });
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: string) {
    return this.prisma.game.delete({
      where: {
        id,
      },
    });
  }
}
