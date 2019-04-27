import { Injectable, Inject } from '@nestjs/common';
import { ReportRepositoryToken } from '../constant';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';

@Injectable()
export class ReportService {

    constructor(@Inject(ReportRepositoryToken) private readonly reportRepository: Repository<Report>) { }

    public async findReport({
        key,
        throwError = true,
        joinWith = [],
        nestedJoin = [],
    }: {
        key: {
            reportID: number
        };
        throwError?: boolean;
        joinWith?: Array<keyof Report>;
        nestedJoin?: string[];
    }): Promise<Report> {
        const relations: string[] = [...joinWith, ...nestedJoin];
        let where: Partial<Report> = {};
        if (key.reportID) {
            where = { id: key.reportID };
        }
        if (throwError) {
            return await this.reportRepository.findOneOrFail({ where, relations });
        } else {
            return await this.reportRepository.findOne({ where, relations });
        }
    }

    public async findReports({
        key,
        joinWith = [],
        nestedJoin = [],
    }: {
        key?: {},
        joinWith?: Array<keyof Report>,
        nestedJoin?: string[],
    }): Promise<Report[]> {
        const relations: string[] = [...joinWith, ...nestedJoin];
        const where: Partial<Report> = {};
        return await this.reportRepository.find({ where, relations });
    }

    public async add(message: string, lockerID): Promise<Report> {
        const report = new Report(message, lockerID);
        return await this.reportRepository.save(report);
    }

    public async edit(id: number, value: Partial<Report>) {
        await this.reportRepository.update({ id }, value);
    }

    public async delete(id: number) {
        await this.reportRepository.delete({ id });
    }
}
