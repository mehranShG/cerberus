import { AuthEntity } from 'src/entities/auth.entity'
import { UserEntity } from 'src/entities/user.entity'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AuthEntity]),
    JwtModule.register({ privateKey: '1234' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
