import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.entity';

@Controller('/api/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @Get('key')
  async findByCodeKey(
    @Query('accountKey') accountKey: string
  ): Promise<Account | null> {
    const account = await this.accountService.findByAccountKey(accountKey);
    if (!account) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }
    return account;
  }

  @Get(':accountId')
  async findOne(@Param('accountId') accountId: string): Promise<Account | null> {
    const account = await this.accountService.findOne(+accountId);
    if (!account) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }
    return account;
  }

  @Post()
  async create(@Body() account: Partial<Account>): Promise<Account> {
    try {
      return await this.accountService.create(account);
    } catch (error) {
      throw new HttpException('Failed to create account', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':accountId')
  async update(
    @Param('accountId') accountId: string,
    @Body() account: Partial<Account>,
  ): Promise<Account | null> {
    try {
      const updatedAccount = await this.accountService.update(+accountId, account);
      if (!updatedAccount) {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }
      return updatedAccount;
    } catch (error) {
      throw new HttpException('Failed to update account', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':accountId')
  async delete(@Param('accountId') accountId: string): Promise<void> {
    try {
      await this.accountService.delete(+accountId);
    } catch (error) {
      throw new HttpException('Failed to delete account', HttpStatus.BAD_REQUEST);
    }
  }
} 