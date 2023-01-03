import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtValidateType } from 'src/types/auth.types'
import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from './auth.service'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '1234',
    })
  }
  async validate(payload: any): Promise<JwtValidateType> {
    const user = await this.authService.findOne(payload.id)
    if (!user) {
      throw new UnauthorizedException()
    }
    return { user_id: user.id, username: user.username }
  }
}
