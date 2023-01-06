import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { LoginDto } from '../dtos/login.dto'
import { RegisterDto } from '../dtos/register.dto'
import { AuthEntity } from '../entities/auth.entity'
import { UserEntity } from '../entities/user.entity'
import { ResponseModel } from '../types/response.model'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register new user
   * @param registerDto requires username email and password
   * @returns a Promise of response model
   */
  async register(registerDto: RegisterDto): Promise<ResponseModel> {
    const user = new UserEntity()
    user.username = registerDto.username
    user.email = registerDto.email
    const auth = new AuthEntity()
    auth.password = registerDto.password
    user.auth = auth
    await this.userRepository.save(user)
    const token = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '1h' },
    )
    return { success: true, result: token, code: 201 }
  }

  /**
   * Login
   * @param loginDto requires email and password
   * @returns a Promise of response model
   */
  async login(loginDto: LoginDto): Promise<ResponseModel> {
    const findUser = await this.userRepository.findOneBy({
      email: loginDto.email,
    })
    if (!findUser) {
      throw new NotFoundException()
    }
    // Comparing password with hashed password in database
    const hashedPassword = findUser.auth.password
    const comparePassword = await bcrypt.compare(
      loginDto.password,
      hashedPassword,
    )
    if (!comparePassword) {
      throw new UnauthorizedException()
    }
    // Assigning jwt token to user
    const token = await this.jwtService.signAsync(
      { id: findUser.id },
      { expiresIn: '1h' },
    )
    return {
      success: true,
      result: { user: findUser, token: token },
      code: 201,
    }
  }

  /**
   * Gets all users in database
   * @returns Promise of users array
   */
  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  /**
   * Gets a user by id
   * @param id
   * @returns Promise of an user
   */
  async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id })
  }
}
