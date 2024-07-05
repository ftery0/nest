import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn({ name: 'id' })
  id!: string;

  @Column({
    name: 'password',
    length: 256,
  })
  password!: string;

  @Column({
    name: 'name',
    length: 10,
  })
  name!: string;

  @Column({
    name: 'role',
    type: 'enum',
  })
  @Column({
    name: 'status',
    nullable: false,
    default: 0,
  })
  status!: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;
}
