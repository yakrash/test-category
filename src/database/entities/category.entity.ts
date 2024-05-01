import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  slug!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  description?: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate!: Date;

  @Column({ type: 'boolean' })
  active!: boolean;
}
