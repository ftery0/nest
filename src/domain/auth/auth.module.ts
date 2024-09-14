import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { TokenModule } from '../token/token.module';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
