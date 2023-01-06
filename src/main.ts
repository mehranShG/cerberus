import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  /** Loading swagger */
  const config = new DocumentBuilder()
    .setTitle('Cerberus')
    .setDescription('User authentication api')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  /** Class validator */
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000)
  console.log('Listening to %s', await app.getUrl())
}
bootstrap()
