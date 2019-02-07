import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class EditUserDto {
    @ApiModelProperty({
        description: 'roleID which define the role of the registered user',
        required: false,
    })
    @IsOptional()
    @IsInt()
    public roleID: number;

    @ApiModelProperty({
        description: 'name of the user who already registered',
        required: false,
    })
    @IsOptional()
    @IsString()
    public name: string;

    @ApiModelProperty({
        description: 'oAuthID of the registered user',
        required: false,
    })
    @IsOptional()
    @IsString()
    public oAuthID: string;
}
