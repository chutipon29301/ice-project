import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
