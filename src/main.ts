import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** Loading swagger */
  const config = new DocumentBuilder()
    .setTitle('Cerberus')
    .setDescription('User authentication api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Listening to %s', await app.getUrl());
}
bootstrap();
