import { Module } from '@nestjs/common';
import { LineService } from './line.service';
import { LineController } from './line.controller';
import { LineAuthModule } from 'src/line-auth/line-auth.module';

@Module({
    imports: [LineAuthModule],
    providers: [LineService],
    controllers: [LineController],
})
export class LineModule {}
