import { Injectable } from '@nestjs/common';
import { FileRepository } from '../repositories/file.repository';
import { File } from '../models/file.entity';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  async findAll(): Promise<File[]> {
    return this.fileRepository.findAll();
  }

  async findOne(fileId: number): Promise<File | null> {
    return this.fileRepository.findOne(fileId);
  }

  async findByLinkInfo(linkInfo: string): Promise<File[]> {
    return this.fileRepository.findByLinkInfo(linkInfo);
  }

  async findByLinkKey(linkKey: number): Promise<File[]> {
    return this.fileRepository.findByLinkKey(linkKey);
  }

  async create(file: Partial<File>): Promise<File> {
    return this.fileRepository.create(file);
  }

  async update(fileId: number, file: Partial<File>): Promise<File | null> {
    return this.fileRepository.update(fileId, file);
  }

  async delete(fileId: number): Promise<void> {
    await this.fileRepository.delete(fileId);
  }
} 