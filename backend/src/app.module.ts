import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule],
})
export class AppModule {}
