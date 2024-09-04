import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants'; // Definimos una constante para la clave secreta

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el JWT de los headers de autorización
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, // La clave secreta para verificar el JWT
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }; // Devolverá el usuario validado
  }
}