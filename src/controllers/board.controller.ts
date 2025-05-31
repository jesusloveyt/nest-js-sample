import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board.entity';

@Controller('/api/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Get(':boardId')
  async findOne(@Param('boardId') boardId: string): Promise<Board | null> {
    const board = await this.boardService.findOne(+boardId);
    if (!board) {
      throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
    }
    await this.boardService.incrementReadCount(+boardId);
    return board;
  }

  @Post()
  async create(@Body() board: Partial<Board>): Promise<Board> {
    try {
      return await this.boardService.create(board);
    } catch (error) {
      throw new HttpException('Failed to create board', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':boardId')
  async update(
    @Param('boardId') boardId: string,
    @Body() board: Partial<Board>,
  ): Promise<Board | null> {
    try {
      const updatedBoard = await this.boardService.update(+boardId, board);
      if (!updatedBoard) {
        throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
      }
      return updatedBoard;
    } catch (error) {
      throw new HttpException('Failed to update board', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':boardId')
  async delete(@Param('boardId') boardId: string): Promise<void> {
    try {
      await this.boardService.delete(+boardId);
    } catch (error) {
      throw new HttpException('Failed to delete board', HttpStatus.BAD_REQUEST);
    }
  }
} 