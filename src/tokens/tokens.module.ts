import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'YOUR_JWT_SECRET', // Configura el secreto JWT
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [TokensService],
})
export class TokensModule {}
