import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { startOfDay, subDays } from 'date-fns';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  async completedTasks(userId: string) {
    return await this.prisma.task.findMany({
      where: {
        userId,
        isCompleted: true,
      },
    });
  }

  async currentDayTasks(userId: string) {
    const currentDay = startOfDay(new Date());

    return await this.prisma.task.findMany({
      where: {
        userId,
        createdAt: {
          gte: currentDay.toISOString(),
        },
      },
    });
  }

  async weekTasks(userId: string) {
    const weekStart = startOfDay(subDays(new Date(), 7));

    return await this.prisma.task.findMany({
      where: {
        userId,
        createdAt: {
          gte: weekStart.toISOString(),
        },
      },
    });
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
