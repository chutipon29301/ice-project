import { Module, Global } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { ConfigModule } from '../config/config.module';

@Global()
@Module({
    imports: [DatabaseModule],
    providers: [ConfigModule],
    exports: [DatabaseModule, ConfigModule],
})
export class GlobalModule {}
