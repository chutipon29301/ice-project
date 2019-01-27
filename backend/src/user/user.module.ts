import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database.module';
import { UserController } from './user.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService, ...userProviders],
})
export class UserModule {}
