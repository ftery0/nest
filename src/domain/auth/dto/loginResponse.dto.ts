import { User } from '../entity/auth.entities.';

export class LoginResponseDto {
  user!: User;
  token!: string;
  refreshToken!: string;

  constructor(user: User, token: string, refreshToken: string) {
    this.user = user;
    this.token = token;
    this.refreshToken = refreshToken;
  }
}