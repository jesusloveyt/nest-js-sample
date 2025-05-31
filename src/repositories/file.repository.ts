import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../models/file.entity';

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  async findOne(fileId: number): Promise<File | null> {
    return this.fileRepository.findOne({ where: { fileId } });
  }

  async findByLinkInfo(linkInfo: string): Promise<File[]> {
    return this.fileRepository.find({ where: { linkInfo } });
  }

  async findByLinkKey(linkKey: number): Promise<File[]> {
    return this.fileRepository.find({ where: { linkKey } });
  }

  async create(file: Partial<File>): Promise<File> {
    const newFile = this.fileRepository.create(file);
    return this.fileRepository.save(newFile);
  }

  async update(fileId: number, file: Partial<File>): Promise<File | null> {
    await this.fileRepository.update(fileId, file);
    return this.findOne(fileId);
  }

  async delete(fileId: number): Promise<void> {
    await this.fileRepository.update(fileId, { deletedAt: new Date() });
  }
} 