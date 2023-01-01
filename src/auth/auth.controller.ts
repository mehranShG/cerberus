import { LoginDto } from 'src/dtos/login.dto'
import { RegisterDto } from 'src/dtos/register.dto'
import { UserEntity } from 'src/entities/user.entity'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<UserEntity> {
    return this.authService.register(registerDto)
  }

  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.authService.getAll()
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<UserEntity> {
    return this.authService.login(loginDto)
  }
}
