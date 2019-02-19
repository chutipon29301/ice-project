import { Module } from '@nestjs/common';
import { LineAuthService } from './line-auth.service';

@Module({
    providers: [LineAuthService],
})
export class LineAuthModule {}
