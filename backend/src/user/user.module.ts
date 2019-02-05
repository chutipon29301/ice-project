import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database.module';
import { UserController } from './user.controller';
import { LineAuthModule } from '../line-auth/line-auth.module';

@Module({
    imports: [DatabaseModule, LineAuthModule],
    controllers: [UserController],
    providers: [UserService, ...userProviders],
})
export class UserModule {}
