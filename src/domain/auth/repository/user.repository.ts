import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/auth.entities.';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public findById(id: string): Promise<User | undefined> {
    return this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }
}