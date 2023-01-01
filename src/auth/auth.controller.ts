import { LoginDto } from 'src/dtos/login.dto'
import { RegisterDto } from 'src/dtos/register.dto'
import { UserEntity } from 'src/entities/user.entity'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<UserEntity> {
    return this.authService.register(registerDto)
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<UserEntity> {
    return this.authService.login(loginDto)
  }

  @ApiOperation({ summary: 'Get all existing users' })
  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.authService.getAll()
  }
}
