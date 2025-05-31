import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { File } from './file.entity';
import { Account } from './account.entity';

@Entity('tb_board')
export class Board {
  @PrimaryGeneratedColumn({ name: 'board_id' })
  boardId: number;

  @Column({ name: 'board_kind', length: 12 })
  boardKind: string;

  @Column({ name: 'writer_id' })
  writerId: number;

  @Column({ length: 90 })
  title: string;

  @Column({ length: 5000 })
  contents: string;

  @Column({ name: 'read_count', default: 0 })
  readCount: number;

  @Column({ name: 'use_fg', default: true })
  useFlag: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'writer_id' })
  writer: Account;

  mainImage: File;

  writerName: string = '';
  boardKindName: string = '';

  constructor() {
    this.mainImage = new File();
    this.writerName = '';
    this.boardKindName = '';
  }
}