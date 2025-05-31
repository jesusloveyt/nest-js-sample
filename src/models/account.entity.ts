import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tb_account')
export class Account {
  @PrimaryGeneratedColumn({ name: 'account_id' })
  accountId: number;

  @Column({ name: 'join_type', length: 10 })
  joinType: string;

  @Column({ name: 'account_key', length: 30 })
  accountKey: string;

  @Column({ length: 256 })
  password: string;

  @Column({ name: 'sns_key', length: 60, nullable: true })
  snsKey: string;

  @Column({ name: 'company_id' })
  companyId: number;

  @Column({ name: 'user_name', length: 30 })
  userName: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 120 })
  address: string;

  @Column({ length: 20 })
  role: string;

  @Column({ length: 20 })
  level: string;

  @Column({ name: 'fcm_token', length: 256, nullable: true })
  fcmToken: string;

  @Column({ name: 'refresh_token', length: 140, nullable: true })
  refreshToken: string;

  @Column({ name: 'use_fg', default: true })
  useFlag: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'login_at', nullable: true })
  loginAt: Date;

  @Column({ name: 'password_at', nullable: true })
  passwordAt: Date;
} 