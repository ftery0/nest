import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TokenModule } from '../token/token.module.t';
import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
