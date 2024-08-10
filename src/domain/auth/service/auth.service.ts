import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from '../dto/loginResponse.dto';
import {
  existsData,
  validationData,
} from '../../../global/util/validationData,util';
import { TokenService } from '../../token/service/token.service';
import { SignUpDto } from '../dto/signUp.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}
  public async signUp(signUpDto: SignUpDto): Promise<User> {
    const user: User | undefined = await this.userRepository.findOne({
      where: { id: signUpDto.id },
    });
    if (existsData(user)) {
      throw new BadRequestException('중복된 ID입니다.');
    }

    const salt: number = +this.configService.get<number>('HASH_SALT');

    const hashedPassword: string = await bcrypt.hash(signUpDto.password, salt);

    return this.userRepository.save({
      id: signUpDto.id,
      password: hashedPassword,
      name: signUpDto.name,
      email: signUpDto.email,
    });
  }
  public async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: loginDto.id },
    });

    if (validationData(user)) {
      throw new NotFoundException('ID에 해당하는 계정이 없습니다.');
    }

    const isCorrectPassword: boolean = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (isCorrectPassword === false) {
      throw new BadRequestException('비밀번호가 옳지 않습니다.');
    }

    const accessToken: string = this.tokenService.generateAccessToken(user.id);
    const refreshToken: string = this.tokenService.generateRefreshToken(
      user.id,
    );

    if (!accessToken || !refreshToken) {
      throw new ForbiddenException('토큰이 발급되지 않았습니다.');
    }

    return new LoginResponseDto(user, accessToken, refreshToken);
  }

  public async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (validationData(user)) {
      throw new NotFoundException('해당 ID의 유저를 찾을 수 없습니다.');
    }

    return user;
  }
}
