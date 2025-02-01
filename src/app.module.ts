import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectosModule } from './proyectos/proyectos.module';
import { PlanosModule } from './planos/planos.module';

// CON MONGOOSE
import { MongooseModule } from '@nestjs/mongoose'

// CON AUTH0
import { ArchivosModule } from './archivos/archivos.module';
import { RecortesModule } from './recortes/recortes.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';


import { UsersModule } from './users/users.module';
import { HttpModule } from '@nestjs/axios';

// Organizaciones
import { FormasController } from './formas/formas.controller';
import { OrganizacionesController } from './organizaciones/organizaciones.controller';
import { OrganizacionesService } from './organizaciones/organizaciones.service';
import { FormasService } from './formas/formas.service';
import { OrganizacionesModule } from './organizaciones/organizaciones.module';
import { FormasModule } from './formas/formas.module';
import { OrganizacionAccessTokenModule } from './organizacion_access_token/organizacion_access_token.module';

import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: 'environment.env', 
      isGlobal: true
    }), 

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL')
      })
    }),
    
    ProyectosModule, 
    PlanosModule, 
    ConfigModule,
    ArchivosModule, 
    RecortesModule, 
    UsersModule, 
    HttpModule, 
    OrganizacionesModule, 
    FormasModule, 
    OrganizacionAccessTokenModule,
  ],
  controllers: [AppController, UsersController, OrganizacionesController],
  providers: [AppService, UsersService, OrganizacionesService],
})
export class AppModule {}

