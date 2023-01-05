import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { RegisterDto } from '../dtos/register.dto'
import { AuthEntity } from '../entities/auth.entity'
import { UserEntity } from '../entities/user.entity'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn((x) => 'jwt access token') },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: { save: jest.fn().mockResolvedValue({}) },
        },
        { provide: getRepositoryToken(AuthEntity), useValue: {} },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('register', () => {
    it('should register user', async () => {
      const user = new RegisterDto()
      expect(await service.register(user)).toEqual({
        code: 201,
        result: 'jwt access token',
        success: true,
      })
    })
  })
})
