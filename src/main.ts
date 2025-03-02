import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Validação global de dados

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Campaign Management API')
    .setDescription('API para gerenciamento de campanhas')
    .setVersion('1.0')
    .addTag('campaigns')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
