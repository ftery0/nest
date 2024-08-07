import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public findById(id: string): Promise<User | undefined> {
    return this.createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();
  }
}
// async findAll(): Promise<User[]> {
//   return this.userRepository.find();
// }
//
// async findOne(id: number): Promise<User> {
//   return this.userRepository.findOneBy({ id });
// }
//
// async create(user: User): Promise<User> {
//   return this.userRepository.save(user);
// }
//
// async update(id: number, user: Partial<User>): Promise<void> {
//   await this.userRepository.update(id, user);
// }
//
// async remove(id: number): Promise<void> {
//   await this.userRepository.delete(id);
// }
// }
