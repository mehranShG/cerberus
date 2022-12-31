import { AuthEntity } from 'src/entities/auth.entity'
import { UserEntity } from 'src/entities/user.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AuthEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
