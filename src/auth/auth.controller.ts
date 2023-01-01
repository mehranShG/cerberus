import { RegisterDto } from 'src/dtos/register.dto'
import { Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }
}
