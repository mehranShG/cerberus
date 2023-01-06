import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginDto } from '../dtos/login.dto'
import { RegisterDto } from '../dtos/register.dto'
import { UserEntity } from '../entities/user.entity'
import { JwtAuthGuard } from '../guards/jwt-guard'
import { ResponseModel } from '../types/response.model'
import { AuthService } from './auth.service'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<ResponseModel> {
    return this.authService.register(registerDto)
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<ResponseModel> {
    return this.authService.login(loginDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all existing users' })
  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.authService.getAll()
  }
}
