import { IsString, IsEnum } from 'class-validator';
import { Role } from '../../models/users.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterUserDto {
    @ApiModelProperty({
        description: 'name of the user who already registered',
        required: true,
    })
    @IsString()
    public name: string;

    @ApiModelProperty({
        description: 'role of the registered user e.g. USER, ADMIN',
        enum: ['ADMIN', 'USER'],
        required: true,
    })
    @IsEnum(Role)
    public role: Role;
}
