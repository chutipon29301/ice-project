import { Controller } from '@nestjs/common';
import { createLocationDto } from './createLocationDto.dto';

@Controller('location')
export class LocationController {
    constructor(private readonly createLocationDto: createLocationDto) {}
}
