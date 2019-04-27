import { Controller, Get, Post, Patch, Param, ParseIntPipe, Delete, Body } from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from '../entities/report.entity';
import { ReportsDto } from './dto/reports.dto';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('report')
export class ReportController {

    constructor(private readonly reportService: ReportService) { }

    @Get()
    async list(): Promise<ReportsDto> {
        const reports = await this.reportService.findReports({});
        return { reports };
    }

    @Post()
    async add(@Body() body: CreateReportDto): Promise<Report> {
        return await this.reportService.add(body.message, body.lockerID);
    }

    @Patch('/:id')
    async edit(@Param('id', new ParseIntPipe()) id: number, value: any) {
        await this.edit(id, value);
    }

    @Delete('/:id')
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        await this.delete(id);
    }
}
