import { Provider } from '@nestjs/common';
import { ReportRepositoryToken, DbConnectionToken } from '../constant';
import { Connection } from 'typeorm';
import { Report } from '../entities/report.entity';

export const reportProviders: Provider[] = [{
    provide: ReportRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Report),
    inject: [DbConnectionToken],
}];
