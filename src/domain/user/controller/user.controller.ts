import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { UserService } from '../service/user.service';
// import { User } from '../entity/user.entities.';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/loginResponse.dto';
import BaseResponse from '../../../global/response/base.response';

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

  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() user: Partial<User>,
  // ): Promise<void> {
  //   await this.userService.update(id, user);
  // }
  //
  // @Delete(':id')
  // async remove(@Param('id') id: number): Promise<void> {
  //   await this.userService.remove(id);
  // }
}
