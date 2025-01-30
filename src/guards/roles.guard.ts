import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private tokensService: TokensService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'].split(' ')[1]; // Obtén el token

    const user = this.tokensService.validateUser(token); // Valida el token

    if (user && user.roles.includes('admin')) {
      return true; // El usuario tiene el rol de admin
    }
    return false; // No autorizado
  }
}
