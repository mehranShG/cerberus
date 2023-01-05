import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { LoginDto } from '../dtos/login.dto'
import { RegisterDto } from '../dtos/register.dto'
import { AuthEntity } from '../entities/auth.entity'
import { UserEntity } from '../entities/user.entity'
import { AuthService } from './auth.service'

const fakeUserRepository = {
  save: jest.fn().mockResolvedValue({}),
  find: jest.fn().mockResolvedValue({}),
  findOneBy: jest.fn().mockResolvedValue({
    id: 1,
    auth: {
      password: '$2a$10$B7hRu976Yuy1M76Qt2aH7O9nVZRM3PqlaV4t.M9ndAeGn9l3./jzi',
    },
  }),
}

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
          useValue: fakeUserRepository,
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

  describe('login', () => {
    it('should login ', async () => {
      const user = new LoginDto()
      user.password = 'testingA'
      expect(await service.login(user)).toEqual({
        code: 201,
        result: {
          token: 'jwt access token',
          user: {
            auth: {
              password:
                '$2a$10$B7hRu976Yuy1M76Qt2aH7O9nVZRM3PqlaV4t.M9ndAeGn9l3./jzi',
            },
            id: 1,
          },
        },
        success: true,
      })
    })
  })

  describe('getAll', () => {
    it('should get all users', async () => {
      expect(await service.getAll()).toEqual({})
    })
  })
})
