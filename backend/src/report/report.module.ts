import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { reportProviders } from './report.providers';

@Module({
  controllers: [ReportController],
  providers: [...reportProviders, ReportService]
})
export class ReportModule { }
