import { HttpModule, Module } from '@nestjs/common';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { LineAuthModule } from '../line-auth/line-auth.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [LineAuthModule, JwtAuthModule, UserModule, HttpModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
