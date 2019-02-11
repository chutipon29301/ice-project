import { ApiModelProperty } from '@nestjs/swagger';
import { ToInt } from 'class-sanitizer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditRegisterLockerDto {
    @ApiModelProperty({
        description: 'name of a locker determined and seen only by admin',
        required: false,
    })
    @IsString()
    public name: string;

    @ApiModelProperty({
        description: 'location ID where the locker is',
        required: false,
    })
    @IsNumber()
    @ToInt()
    public locationID: number;

    @ApiModelProperty({
        description:
            'number of a locker in the location that is showed on the locker',
        required: false,
    })
    @IsString()
    public number: string;
}
