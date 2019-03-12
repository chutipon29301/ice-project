import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database.module';
import { LineAuthModule } from '../line-auth/line-auth.module';

@Module({
    imports: [DatabaseModule,LineAuthModule],
    providers: [...userProviders, UserService],
    controllers: [UserController],
})
export class UserModule {}
