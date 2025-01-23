import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../user/user.entity';

import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { SignUpDto } from './dto/signUp.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}
  public async signUp(signUpDto: SignUpDto): Promise<User> {
    if (!signUpDto.password) {
      throw new HttpException('비밀번호가 없습니다.', HttpStatus.BAD_REQUEST);
    } else if (!signUpDto.userId) {
      throw new HttpException('유저Id가 없습니다.', HttpStatus.BAD_REQUEST);
    } else if (!signUpDto.name) {
      throw new HttpException('이름이 없습니다.', HttpStatus.BAD_REQUEST);
    } else if (!signUpDto.email) {
      throw new HttpException('이메일이 없습니다.', HttpStatus.BAD_REQUEST);
    }

    const salt: number = +this.configService.get<number>('HASH_SALT');

    const hashedPassword: string = await bcrypt.hash(signUpDto.password, salt);

    try {
      const createdUser = await this.usersService.createUser({
        ...signUpDto,
        password: hashedPassword,
      });

      createdUser.password = undefined;
      return createdUser;
    } catch (e) {
      console.error(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
