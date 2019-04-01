import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SanitizationPipe } from './pipe/sanitization.pipe';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalPipes(new SanitizationPipe());
    app.useStaticAssets(join(__dirname, '../public'));

    const options = new DocumentBuilder()
        .setTitle('Locker swarm example')
        .setDescription('The locker swarm API description')
        .setVersion('1.0')
        .addTag('locker-swarm')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
