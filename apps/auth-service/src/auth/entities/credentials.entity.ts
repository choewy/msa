import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'credentials' })
export class CredentialsEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'credentials_PK',
  })
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
