import { Controller, Get, Param, Req, UseGuards, Headers, HttpException, HttpStatus } from '@nestjs/common';
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

    removeCircularReferences(key: string, value: any) {
        if (key === 'req' || key === 'res') {
          return undefined; // Elimina las propiedades 'req' y 'res'
        }
        return value;
      }

      /*
    @Get('user_data/:userId')
    async getUserData(@Param('userId') userId: string, @Headers('Authorization') authHeader: string) {
        const accessToken = authHeader?.replace('Bearer ', '');
        const res = await this.userService.getUserData(userId, accessToken); // agrega el await
        console.log('RES -> ', res)

        if(typeof res.data !== 'object'){
            console.log('NO ES UN JSON')
        }

        return res
    }
        */

    @Get('user_data/:userId')
  async getUserData(
    @Param('userId') userId: string,
    @Headers('Authorization') authHeader: string
  ) {
    const accessToken = authHeader?.replace('Bearer ', '');

    if (!accessToken) {
      throw new HttpException('No access token found', HttpStatus.UNAUTHORIZED);
    }

    try {
      // Verifica si el token es válido y si tiene el permiso adecuado
      const userData = await this.userService.getUserDataFromAuth0(userId, accessToken);

      if (!userData) {
        throw new HttpException('User not found in Auth0', HttpStatus.NOT_FOUND);
      }

      // Devuelve los datos del usuario de Auth0
      console.log('USER DATA -> ', userData)
      return userData;
    } catch (error) {
      throw new HttpException('Failed to fetch user data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}