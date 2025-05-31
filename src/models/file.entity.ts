import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('tb_file')
export class File {
  @PrimaryGeneratedColumn({ name: 'file_id' })
  fileId: number;

  @Column({ name: 'link_info', length: 30 })
  linkInfo: string;

  @Column({ name: 'link_key' })
  linkKey: number;

  @Column({ name: 'real_name', length: 120 })
  realName: string;

  @Column({ name: 'file_url', length: 120 })
  fileUrl: string;

  @Column({ name: 'file_size' })
  fileSize: number;

  @CreateDateColumn({ name: 'saved_at' })
  savedAt: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  base64String: string = '';

  constructor() {
    this.base64String = '';
  }
}