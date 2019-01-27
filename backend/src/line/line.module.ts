import { Module, HttpModule } from '@nestjs/common';
import { LineService } from './line.service';
import { LineController } from './line.controller';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [ConfigModule, HttpModule],
    providers: [LineService],
    controllers: [LineController],
})
export class LineModule {}
