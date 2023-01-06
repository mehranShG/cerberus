import { config } from 'dotenv'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtValidateType } from 'src/types/auth.types'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from './auth.service'

config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    })
  }
  async validate(payload: any): Promise<JwtValidateType> {
    const user = await this.authService.getUserById(payload.id)
    if (!user) {
      throw new UnauthorizedException()
    }
    return { user_id: user.id, username: user.username }
  }
}
