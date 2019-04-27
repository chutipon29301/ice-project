import { Controller, Get, Post, Patch, Param, ParseIntPipe, Delete, Body } from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from '../entities/report.entity';
import { ReportsDto } from './dto/reports.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../guard/role.decorator';
import { Role } from '../entities/user.entity';
import { EditReportDto } from './dto/edit-report.dto';

@ApiUseTags('Report')
@Controller('report')
export class ReportController {

    constructor(private readonly reportService: ReportService) { }

    @ApiOperation({
        title: 'List all report',
    })
    @ApiBearerAuth()
    @Roles(Role.SUPERUSER, Role.ADMIN, Role.USER)
    @Get()
    async list(): Promise<ReportsDto> {
        const reports = await this.reportService.findReports({});
        return { reports };
    }

    @ApiOperation({
        title: 'Create report',
    })
    @ApiBearerAuth()
    @Roles(Role.SUPERUSER, Role.ADMIN, Role.USER)
    @Post()
    async add(@Body() body: CreateReportDto): Promise<Report> {
        return await this.reportService.add(body.message, body.lockerID);
    }

    @ApiOperation({
        title: 'Edit report',
    })
    @ApiBearerAuth()
    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Patch('/:id')
    async edit(@Param('id', new ParseIntPipe()) id: number, @Body() value: EditReportDto) {
        await this.reportService.edit(id, value);
    }

    @ApiOperation({
        title: 'Delete report',
    })
    @ApiBearerAuth()
    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Delete('/:id')
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        await this.reportService.delete(id);
    }
}
