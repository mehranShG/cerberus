import { ExtractJwt, Strategy } from 'passport-jwt'
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
  async validate(payload: any) {
    const user = await this.authService.findOne(payload.id)
    if (!user) {
      return new UnauthorizedException()
    }
    return { user_id: user.id, username: user.username }
  }
}
