import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // HABILITO CORS (comunicacion)
  app.enableCors({
    origin: 'http://localhost:4200', // Permite solicitudes desde este origen (Angular)
    methods: 'GET,POST,PUT,DELETE,PATCH',  // Especifica los métodos HTTP permitidos
    credentials: true                // Si deseas permitir cookies o autenticación
  })


  // SWAGGER
  const config = new DocumentBuilder()
  .setTitle('App example')
  .setDescription('The app API description')
  .setVersion('1.0')
  .addTag('model')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
