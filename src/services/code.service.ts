import { Injectable } from '@nestjs/common';
import { CodeRepository } from '../repositories/code.repository';
import { Code } from '../models/code.entity';

@Injectable()
export class CodeService {
  constructor(private readonly codeRepository: CodeRepository) {}

  async findAll(): Promise<Code[]> {
    return this.codeRepository.findAll();
  }

  async findOne(codeId: number): Promise<Code | null> {
    return this.codeRepository.findOne(codeId);
  }

  async findByCodeKey(parentCode: string, code: string): Promise<Code | null> {
    return this.codeRepository.findByCodeKey(parentCode, code);
  }

  async findAllByParentCode(parentCode: string): Promise<Code[]> {
    return this.codeRepository.findAllByParentCode(parentCode);
  }

  async create(code: Partial<Code>): Promise<Code> {
    return this.codeRepository.create(code);
  }

  async update(codeId: number, code: Partial<Code>): Promise<Code | null> {
    return this.codeRepository.update(codeId, code);
  }

  async delete(codeId: number): Promise<void> {
    await this.codeRepository.delete(codeId);
  }
} 