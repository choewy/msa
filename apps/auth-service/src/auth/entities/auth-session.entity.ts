import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthUserEntity } from './auth-user.entity';

@Entity({ name: 'auth_sessions' })
export class AuthSessionEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'auth_sessions_PK' })
  id!: string;

  @Column({ type: 'text' })
  refreshTokenHash!: string;

  @Column({ type: 'text', nullable: true })
  userAgent!: string | null;

  @Column({ type: 'text', nullable: true })
  ipAddress!: string | null;

  @Column({ type: 'timestamptz' })
  expiresAt!: Date;

  @Column({ type: 'timestamptz', nullable: true })
  revokedAt!: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Column({ type: 'uuid' })
  authUserId!: string;

  @ManyToOne(() => AuthUserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'auth_sessions_FK' })
  authUser!: AuthUserEntity;
}
