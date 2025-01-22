import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: 'clave segura para auth0 - 098370429836719836752983947356297346293674',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [JwtStrategy],
      exports: [PassportModule],
})
export class AuthModule {}
