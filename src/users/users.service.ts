import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import axios from 'axios';

@Injectable()
export class UsersService {

    private readonly auth0Domain: string;
    private readonly clientId: string;
    private readonly clientSecret: string;

    constructor(private readonly http: HttpService) {
        this.auth0Domain = 'dev-s2w5lzkgxmbf0wl0.us.auth0.com';
        this.clientId = 'S1QqgeE9Tu27X8RYsxFnhtshIeMDZIte';
        this.clientSecret = 'RXbEsN_TGCp9S2FnctxTdr5ro6olbsLp-EJYuArSVTyFHUp1b_J_gWjnodEVyLZ3';
    }

    async getUserRoles(userId: string, token: string): Promise<any> {
        const url = `https://${this.auth0Domain}/api/v2/users/${userId}/roles`;
      
        const response = await this.http.axiosRef.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
    }

    async getUserData(accessToken: string, userId: string) {
      const url = `https://inge.com/api/orders/users/${userId}`;
      const headers = { Authorization: `Bearer ${accessToken}` };

      try {

        const response = await firstValueFrom(this.http.get(url, { headers }) );
        console.log('SALE BIEN')
        return response; // para asegurar el json aca tambien

      } catch (error) {
        
        console.error('Error fetching user data:', error)

        if(error.response){
          console.error('Error fetching user data:', error.response);
          throw new Error (JSON.stringify(error.response.data)) // aseguro el json
        }
      }
    }

    async getUserDataFromAuth0(userId: string, accessToken: string) {
      try {
        const response = await axios.get(
          `https://dev-s2w5lzkgxmbf0wl0.us.auth0.com/api/v2//users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        return response.data; // Devuelve los datos del usuario
      } catch (error) {
        console.error('Error al obtener los datos de Auth0:', error.response);
        throw error;
      }
    }

}