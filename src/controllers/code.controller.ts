import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CodeService } from '../services/code.service';
import { Code } from '../models/code.entity';

@Controller('/api/code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Get()
  async findAll(): Promise<Code[]> {
    return this.codeService.findAll();
  }

  @Get('key')
  async findByCodeKey(
    @Query('parentCode') parentCode: string,
    @Query('code') code: string,
  ): Promise<Code | null> {
    const foundCode = await this.codeService.findByCodeKey(parentCode, code);
    if (!foundCode) {
      throw new HttpException('Code not found', HttpStatus.NOT_FOUND);
    }
    return foundCode;
  }

  @Get(':codeId')
  async findOne(@Param('codeId') codeId: string): Promise<Code | null> {
    const code = await this.codeService.findOne(+codeId);
    if (!code) {
      throw new HttpException('Code not found', HttpStatus.NOT_FOUND);
    }
    return code;
  }

  @Post()
  async create(@Body() code: Partial<Code>): Promise<Code> {
    try {
      return await this.codeService.create(code);
    } catch (error) {
      throw new HttpException('Failed to create code', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':codeId')
  async update(
    @Param('codeId') codeId: string,
    @Body() code: Partial<Code>,
  ): Promise<Code | null> {
    try {
      const updatedCode = await this.codeService.update(+codeId, code);
      if (!updatedCode) {
        throw new HttpException('Code not found', HttpStatus.NOT_FOUND);
      }
      return updatedCode;
    } catch (error) {
      throw new HttpException('Failed to update code', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':codeId')
  async delete(@Param('codeId') codeId: string): Promise<void> {
    try {
      await this.codeService.delete(+codeId);
    } catch (error) {
      throw new HttpException('Failed to delete code', HttpStatus.BAD_REQUEST);
    }
  }
} 