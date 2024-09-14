import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { TokenModule } from '../token/token.module';
import { UserService } from './service/user.service';
import { ProfileController } from './controller/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => TokenModule)],
  providers: [UserService],
  controllers: [ProfileController],
  exports: [UserService],
})
export class UserModule {}
