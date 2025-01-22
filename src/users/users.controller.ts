import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    @UseGuards(AuthGuard('jwt')) // Asegúrate de usar tu guard de autenticación
    @Get('roles')
    getUserRoles(@Req() req): any {
        const namespace = 'https://loclahost:3000';
        const roles = req.user[namespace + 'roles'] || [];
        return { roles };
  }
}
