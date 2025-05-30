import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JsonExceptionFilter } from './filters/json.exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new JsonExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Mini API')
    .setDescription('Senior Backend Task')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
