import { HttpModule, Module } from '@nestjs/common';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [JwtAuthModule, HttpModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
