import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const options = new DocumentBuilder()
        .setTitle('Locker swarm example')
        .setDescription('The locker swarm API description')
        .setVersion('1.0')
        .addTag('locker-swarm')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
