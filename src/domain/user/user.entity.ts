import { Entity, Column } from 'typeorm';

@Entity()
export class User {
  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;
}
