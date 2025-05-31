import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../models/account.entity';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findOne(accountId: number): Promise<Account | null> {
    return this.accountRepository.findOne({ where: { accountId } });
  }

  async findByAccountKey(accountKey: string): Promise<Account | null> {
    return this.accountRepository.findOne({ where: { accountKey } });
  }

  async create(account: Partial<Account>): Promise<Account> {
    const newAccount = this.accountRepository.create(account);
    return this.accountRepository.save(newAccount);
  }

  async update(accountId: number, account: Partial<Account>): Promise<Account | null> {
    await this.accountRepository.update(accountId, account);
    return this.findOne(accountId);
  }

  async delete(accountId: number): Promise<void> {
    await this.accountRepository.update(accountId, { useFlag: false });
  }
} 