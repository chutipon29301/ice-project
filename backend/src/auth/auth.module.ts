import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LineAuthModule } from 'src/line-auth/line-auth.module';

@Module({
    imports: [LineAuthModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
