import { RegisterDto } from 'src/dtos/register.dto'
import { AuthEntity } from 'src/entities/auth.entity'
import { UserEntity } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
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

  async login() {}

  async getAll() {
    return await this.userRepository.find()
  }
}
