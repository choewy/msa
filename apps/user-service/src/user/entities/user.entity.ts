import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn({ type: 'uuid', primaryKeyConstraintName: 'users_PK' })
  id: string;

  @Column({ type: 'text' })
  nickname: string;

  @Column({ type: 'text', nullable: true })
  profileImage: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
