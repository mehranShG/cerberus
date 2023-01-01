import { LoginDto } from 'src/dtos/login.dto'
import { RegisterDto } from 'src/dtos/register.dto'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Get()
  getAllUsers() {
    return this.authService.getAll()
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }
}
