import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty({
        description: 'name of user who attempt to register',
        required: true,
    })
    @IsString()
    public name: string;

    @ApiModelProperty({
        description: 'oAuthID of registering user',
        required: true,
    })
    @IsString()
    public oAuthID: string;
}
