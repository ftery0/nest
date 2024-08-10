import { Repository } from 'typeorm';
import { User } from '../../user/entity/user.entity';

export class AuthRepository extends Repository<User> {
  public findById(id: string): Promise<User | undefined> {
    return this.createQueryBuilder('user')
      .where('users.id = :id', { id })
      .getOne();
  }
}
