import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @UseGuards(AuthGuard('jwt')) // Protege la ruta con JWT
    @Get(':id/roles')
    async getUserRoles(@Param('id') userId: string, @Req() req: Request) {
        const token = req.headers.authorization?.split(' ')[1]; // extraer el token del contenido enviado
        return this.userService.getUserRoles(userId, token);
    }

}