import { Controller, Post, Body } from '@nestjs/common';
import { LockerInstanceDto } from './dto/locker-instance.dto';
import { LockerInstanceService } from './locker-instance.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Locker Instance')
@Controller('locker-instance')
export class LockerInstanceController {
    constructor(
        private readonly lockerInstanceService: LockerInstanceService,
    ) {}

    @Post('createInstance')
    async createInstance(@Body() body: LockerInstanceDto) {
        return await this.lockerInstanceService.create(body.lockerID);
    }
}
