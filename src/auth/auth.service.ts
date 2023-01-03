import * as bcrypt from 'bcrypt'
import { LoginDto } from 'src/dtos/login.dto'
import { RegisterDto } from 'src/dtos/register.dto'
import { AuthEntity } from 'src/entities/auth.entity'
import { UserEntity } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = new UserEntity()
    user.username = registerDto.username
    user.email = registerDto.email
    const auth = new AuthEntity()
    auth.password = registerDto.password
    user.auth = auth
    const result = await this.userRepository.save(user)
    const token = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '1h' },
    )
    return { result: result, token: token }
  }

  async login(loginDto: LoginDto) {
    const findUser = await this.userRepository.findOneBy({
      email: loginDto.email,
    })
    if (!findUser) {
      throw new NotFoundException()
    }
    const hashedPassword = findUser.auth.password
    const comparePassword = await bcrypt.compare(
      loginDto.password,
      hashedPassword,
    )
    if (!comparePassword) {
      throw new UnauthorizedException()
    }

    const token = await this.jwtService.signAsync(
      { id: findUser.id },
      { expiresIn: '1h' },
    )
    return { user: findUser.username, token: token }
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id })
  }
}
