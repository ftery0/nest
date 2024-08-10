import { User } from '../entity/user.entity';

export class UserProfileDto {
  id: string;
  name: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
