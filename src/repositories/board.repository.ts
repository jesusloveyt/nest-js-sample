import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../models/board.entity';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async findAll(): Promise<Board[]> {
    return this.boardRepository.find({
      relations: ['writer'],
    });
  }

  async findOne(boardId: number): Promise<Board | null> {
    return this.boardRepository.findOne({
      where: { boardId },
      relations: ['writer'],
    });
  }

  async create(board: Partial<Board>): Promise<Board> {
    const newBoard = this.boardRepository.create(board);
    return this.boardRepository.save(newBoard);
  }

  async update(boardId: number, board: Partial<Board>): Promise<Board | null> {
    await this.boardRepository.update(boardId, board);
    return this.findOne(boardId);
  }

  async delete(boardId: number): Promise<void> {
    await this.boardRepository.update(boardId, { useFlag: false });
  }

  async incrementReadCount(boardId: number): Promise<void> {
    await this.boardRepository.increment({ boardId }, 'readCount', 1);
  }
} 