import {
  BadRequestException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { IToken } from '../../../global/interfaces/Token';
import { ITokenPayload } from '../../../global/interfaces/TokenPayload';
import { isDiffrentUtil } from '../../../global/util/comparison.util';
import ReissuanceDto from '../dto/reissuance.dto';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  public generateAccessToken(userId: string): string {
    const payload: ITokenPayload = {
      userId,
    };

    const option: JwtSignOptions = {
      expiresIn: this.configService.get('JWT_ACCESS_KEY'),
      issuer: 'hj',
      subject: 'accessToken',
    };

    return this.jwtService.sign(payload, option);
  }

  public generateRefreshToken(userId: string): string {
    const payload: ITokenPayload = {
      userId,
    };

    const option: JwtSignOptions = {
      expiresIn: this.configService.get('JWT_REFRESH_KEY'),
      issuer: 'hj',
      subject: 'refreshToken',
    };

    return this.jwtService.sign(payload, option);
  }

  public async accessTokenReissuance(
    reissuanceDto: ReissuanceDto,
  ): Promise<string> {
    const { iss, sub, userId }: IToken = await this.verifyToken(
      reissuanceDto.refreshToken,
    );

    if (isDiffrentUtil(iss, 'hj') && isDiffrentUtil(sub, 'refreshToken')) {
      throw new UnauthorizedException('위조된 토큰입니다.');
    }

    return this.generateAccessToken(userId);
  }
  public async findUserByAccessToken(token: string) {
    const decodedToken: IToken = await this.verifyToken(token);
    const { userId } = decodedToken;

    return this.userService.findById(userId);
  }
  async verifyToken(token: string): Promise<IToken> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      switch (error.message) {
        case 'jwt must be provided':
          throw new BadRequestException('토큰이 전송되지 않았습니다');
        case 'jwt malformed':
        case 'invalid token':
        case 'invalid signature':
          throw new UnauthorizedException('위조된 토큰입니다');
        case 'jwt expired':
          throw new GoneException('토큰이 만료되었습니다');
        default:
          Logger.error(error);
          throw new InternalServerErrorException('다시 시도해 주세요');
      }
    }
  }
}
