import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
// import { User } from '../entity/user.entities.';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/loginResponse.dto';
import BaseResponse from '../../../global/response/base.response';
import { SignUpDto } from '../dto/signUp.dto';
import { User } from '../../user/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('sign-in')
  async signIn(
    @Body() loginDto: LoginDto,
  ): Promise<BaseResponse<LoginResponseDto>> {
    const response: LoginResponseDto = await this.userService.login(loginDto);
    return new BaseResponse<LoginResponseDto>(
      HttpStatus.OK,
      '로그인 성공',
      response,
    );
  }
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<BaseResponse<User>> {
    const user: User = await this.userService.signUp(signUpDto);
    return new BaseResponse<User>(HttpStatus.OK, '회원가입 성공', user);
  }
}
