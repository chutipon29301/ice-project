import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class LineService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}
}
