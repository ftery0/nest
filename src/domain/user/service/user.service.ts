import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/loginResponse.dto';
import { validationData } from '../../../global/util/validationData,util';
import { TokenService } from '../../token/service/token.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  public async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: loginDto.id },
    });

    if (validationData(user)) {
      throw new NotFoundException('ID에 해당하는 계정이 없습니다.');
    }

    // const isCorrectPassword: boolean = await bcrypt.compare(
    //   user.password,
    //   loginDto.password,
    // );

    if (user.password !== loginDto.password) {
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

  // async findAll(): Promise<User[]> {
  //   return this.userRepository.findAll();
  // }
  //
  // async findOne(id: number): Promise<User> {
  //   return this.userRepository.findOne(id);
  // }
  //
  // async create(user: User): Promise<User> {
  //   return this.userRepository.create(user);
  // }
  //
  // async update(id: number, user: Partial<User>): Promise<void> {
  //   await this.userRepository.update(id, user);
  // }
  //
  // async remove(id: number): Promise<void> {
  //   await this.userRepository.remove(id);
  // }
}
