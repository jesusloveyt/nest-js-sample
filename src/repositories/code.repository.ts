import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Code } from '../models/code.entity';

@Injectable()
export class CodeRepository {
  constructor(
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
  ) {}

  async findAll(): Promise<Code[]> {
    return this.codeRepository.find();
  }

  async findOne(codeId: number): Promise<Code | null> {
    return this.codeRepository.findOne({ where: { codeId } });
  }

  async findByCodeKey(parentCode: string, code: string): Promise<Code | null> {
    return this.codeRepository.findOne({ where: { parentCode, code } });
  }

  async findAllByParentCode(parentCode: string): Promise<Code[]> {
    return this.codeRepository.find({ where: { parentCode } });
  }

  async create(code: Partial<Code>): Promise<Code> {
    const newCode = this.codeRepository.create(code);
    return this.codeRepository.save(newCode);
  }

  async update(codeId: number, code: Partial<Code>): Promise<Code | null> {
    await this.codeRepository.update(codeId, code);
    return this.findOne(codeId);
  }

  async delete(codeId: number): Promise<void> {
    await this.codeRepository.update(codeId, { useFlag: false });
  }
} 