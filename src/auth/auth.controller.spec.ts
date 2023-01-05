import { Test, TestingModule } from '@nestjs/testing'
import { LoginDto } from '../dtos/login.dto'
import { RegisterDto } from '../dtos/register.dto'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

const mockAuthService = {
  register: jest.fn().mockResolvedValue({}),
  login: jest.fn().mockResolvedValue({}),
}
describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('register', () => {
    it('should register user', async () => {
      const user = new RegisterDto()
      expect(await controller.register(user)).toEqual({})
    })
  })

  describe('login', () => {
    it('should login', async () => {
      const user = new LoginDto()
      expect(await controller.login(user)).toEqual({})
    })
  })
})
