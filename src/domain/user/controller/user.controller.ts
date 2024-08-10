import {
  Controller,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../../token/service/token.service';
import { UserProfileDto } from '../dto/userProfile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  async getProfile(
    @Headers('authorization') authHeader: string,
  ): Promise<UserProfileDto> {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');
    const user = await this.tokenService.findUserByAccessToken(token);

    return new UserProfileDto(user);
  }
}
