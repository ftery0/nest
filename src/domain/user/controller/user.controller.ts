import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { UserService } from '../service/user.service';
// import { User } from '../entity/user.entities.';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/loginResponse.dto';
import BaseResponse from '../../../global/response/base.response';
import { SignUpDto } from '../dto/signUp.dto';
import { User } from '../entity/user.entity';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Get()
  // async findAll(): Promise<User[]> {
  //   return this.userService.findAll();
  // }
  //
  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<User> {
  //   return this.userService.findOne(id);
  // }

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
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<BaseResponse<User>> {
    const user: User = await this.userService.signUp(signUpDto);
    return new BaseResponse<User>(HttpStatus.OK, '회원가입 성공', user);
  }
}
