import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { FileService } from '../services/file.service';
import { File } from '../models/file.entity';

@Controller('/api/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async findAll(): Promise<File[]> {
    return this.fileService.findAll();
  }

  @Get(':fileId')
  async findOne(@Param('fileId') fileId: string): Promise<File | null> {
    const file = await this.fileService.findOne(+fileId);
    if (!file) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
    return file;
  }

  @Get('link/info')
  async findByLinkInfo(@Query('linkInfo') linkInfo: string): Promise<File[]> {
    return this.fileService.findByLinkInfo(linkInfo);
  }

  @Get('link/key')
  async findByLinkKey(@Query('linkKey') linkKey: string): Promise<File[]> {
    return this.fileService.findByLinkKey(+linkKey);
  }

  @Post()
  async create(@Body() file: Partial<File>): Promise<File> {
    try {
      return await this.fileService.create(file);
    } catch (error) {
      throw new HttpException('Failed to create file', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':fileId')
  async update(
    @Param('fileId') fileId: string,
    @Body() file: Partial<File>,
  ): Promise<File | null> {
    try {
      const updatedFile = await this.fileService.update(+fileId, file);
      if (!updatedFile) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }
      return updatedFile;
    } catch (error) {
      throw new HttpException('Failed to update file', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':fileId')
  async delete(@Param('fileId') fileId: string): Promise<void> {
    try {
      await this.fileService.delete(+fileId);
    } catch (error) {
      throw new HttpException('Failed to delete file', HttpStatus.BAD_REQUEST);
    }
  }
} 