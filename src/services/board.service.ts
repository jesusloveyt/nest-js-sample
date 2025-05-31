import { Injectable } from '@nestjs/common';
import { BoardRepository } from '../repositories/board.repository';
import { Board } from '../models/board.entity';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async findAll(): Promise<Board[]> {
    return this.boardRepository.findAll();
  }

  async findOne(boardId: number): Promise<Board | null> {
    return this.boardRepository.findOne(boardId);
  }

  async create(board: Partial<Board>): Promise<Board> {
    return this.boardRepository.create(board);
  }

  async update(boardId: number, board: Partial<Board>): Promise<Board | null> {
    return this.boardRepository.update(boardId, board);
  }

  async delete(boardId: number): Promise<void> {
    await this.boardRepository.delete(boardId);
  }

  async incrementReadCount(boardId: number): Promise<void> {
    await this.boardRepository.incrementReadCount(boardId);
  }
} 