import * as bcrypt from 'bcrypt'
import { LoginDto } from 'src/dtos/login.dto'
import { RegisterDto } from 'src/dtos/register.dto'
import { AuthEntity } from 'src/entities/auth.entity'
import { UserEntity } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = new UserEntity()
    user.username = registerDto.username
    user.email = registerDto.email
    const auth = new AuthEntity()
    auth.password = registerDto.password
    user.auth = auth
    const result = await this.userRepository.save(user)
    return result
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
    return findUser
  }

  async getAll() {
    return await this.userRepository.find()
  }
}
