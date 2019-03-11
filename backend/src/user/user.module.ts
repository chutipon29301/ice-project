import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database.module';

@Module({
    imports: [DatabaseModule],
    providers: [...userProviders, UserService],
    controllers: [UserController],
})
export class UserModule {}
