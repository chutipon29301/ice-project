import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { LockerModule } from './locker/locker.module';
import { LocationModule } from './location/location.module';
import { LineModule } from './line/line.module';

@Module({
    imports: [
        ConfigModule,
        UserModule,
        LockerModule,
        LocationModule,
        LineModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
