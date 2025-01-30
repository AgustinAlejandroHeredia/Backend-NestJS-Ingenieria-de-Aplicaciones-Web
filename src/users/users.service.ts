import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

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

}