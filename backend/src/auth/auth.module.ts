import { Module, HttpModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LineAuthModule } from '../line-auth/line-auth.module';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [LineAuthModule, JwtAuthModule, UserModule, HttpModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
