import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from '../dto/signUp.dto';
import { LoginDto } from '../dto/login.dto';
import BaseResponse from 'src/global/response/base.response';
import { User } from '../entity/auth.entities.';
import { LoginResponseDto } from '../dto/loginResponse.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<BaseResponse<User>> {
    const user: User = await this.userService.signUp(signUpDto);
    return new BaseResponse<User>(HttpStatus.OK, '회원가입 성공', user);
  }

  @Post('login')
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
}
