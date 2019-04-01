import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { LineAuthModule } from '../line-auth/line-auth.module';

@Module({
    imports: [LineAuthModule],
    providers: [...userProviders, UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
