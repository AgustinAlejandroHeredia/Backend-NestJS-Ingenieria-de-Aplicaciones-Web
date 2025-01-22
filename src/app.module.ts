import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectosModule } from './proyectos/proyectos.module';
import { PlanosModule } from './planos/planos.module';

// CON MONGOOSE
import { MongooseModule } from '@nestjs/mongoose'

// CON AUTH0
//import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';
//import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArchivosModule } from './archivos/archivos.module';

@Module({
  imports: [ProyectosModule, PlanosModule, MongooseModule.forRoot('mongodb+srv://Agus:Legolego2@agus.1rvm4.mongodb.net/?retryWrites=true&w=majority&appName=Agus/ingedb'), ConfigModule, UsersModule, AuthModule, ArchivosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

