import { IsString, IsNumber } from 'class-validator';
import { ToInt } from 'class-sanitizer';
import { ApiModelProperty } from '@nestjs/swagger';
export class CreateLockerDto {
    @ApiModelProperty({
        description: 'name of a locker determined and saw only by admin',
        required: true,
    })
    @IsString()
    name: string;

    @ApiModelProperty({
        description: 'location ID where the locker is',
        required: true,
    })
    @IsNumber()
    @ToInt()
    locationID: number;

    @ApiModelProperty({
        description:
            'number of a locker in the location that is showed on the locker',
        required: true,
    })
    @IsString()
    number: string;
}
