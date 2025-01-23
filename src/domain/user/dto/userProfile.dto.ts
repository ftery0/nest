import { User } from '../user.entity';

export class UserProfileDto {
  id: string;
  name: string;
  email: string;

  constructor(user: User) {
    this.id = user.userId;
    this.name = user.name;
    this.email = user.email;
  }
}
