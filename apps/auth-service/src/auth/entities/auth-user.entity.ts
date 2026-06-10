import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { AuthUserStatus } from '@libs/common';

@Entity({ name: 'auth_users' })
@Index('auth_users_email_UK', ['email'])
export class AuthUserEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'auth_users_PK' })
  id!: string;

  @Column({ type: 'text' })
  email!: string;

  @Column({ type: 'text' })
  passwordHash!: string;

  @Column({ type: 'text', default: AuthUserStatus.PENDING_PROFILE })
  status!: AuthUserStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
