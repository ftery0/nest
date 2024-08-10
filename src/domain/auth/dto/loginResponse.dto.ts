import { User } from '../../user/entity/user.entity';
export class LoginResponseDto {
  user!: User;
  accessToken!: string;
  refreshToken!: string;

  constructor(user: User, accessToken: string, refreshToken: string) {
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
