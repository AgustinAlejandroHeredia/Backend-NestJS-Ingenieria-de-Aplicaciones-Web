import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(private jwtService: JwtService) {}

  validateUser(token: string) {
    try {
      const decoded = this.jwtService.verify(token); // Verifica el token
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
