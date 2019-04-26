import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from '../entities/report.entity';

@Controller('report')
export class ReportController {

    constructor(private readonly reportService: ReportService) { }

    @Get()
    async list(): Promise<{ reports: Report[] }> {
        const reports = await this.reportService.findReports({});
        return { reports };
    }

}
