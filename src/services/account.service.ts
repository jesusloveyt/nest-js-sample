import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { Account } from '../models/account.entity';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findAll(): Promise<Account[]> {
    return this.accountRepository.findAll();
  }

  async findOne(accountId: number): Promise<Account | null> {
    return this.accountRepository.findOne(accountId);
  }

  async findByAccountKey(accountKey: string): Promise<Account | null> {
    return this.accountRepository.findByAccountKey(accountKey);
  }

  async create(account: Partial<Account>): Promise<Account> {
    return this.accountRepository.create(account);
  }

  async update(accountId: number, account: Partial<Account>): Promise<Account | null> {
    return this.accountRepository.update(accountId, account);
  }

  async delete(accountId: number): Promise<void> {
    await this.accountRepository.delete(accountId);
  }
} 