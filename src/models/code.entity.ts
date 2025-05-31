import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('tb_code')
export class Code {
  @PrimaryGeneratedColumn({ name: 'code_id' })
  codeId: number;

  @Column({ length: 30 })
  code: string;

  @Column({ name: 'p_code', length: 30 })
  parentCode: string;

  @Column({ name: 'code_label', length: 60 })
  codeLabel: string;

  @Column({ length: 120 })
  memo: string;

  @Column({ name: 'str_val', length: 256 })
  stringValue: string;

  @Column({ name: 'num_val', type: 'float' })
  numberValue: number;

  @Column({ name: 'use_fg', default: true })
  useFlag: boolean;

  @UpdateDateColumn({ name: 'edited_at' })
  editedAt: Date;
}