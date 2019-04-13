import { ApiModelProperty } from '@nestjs/swagger';

export class AddUserPermissionDto {
    @ApiModelProperty({
        description: 'locker access code that is given to user',
        required: true,
    })
    accessCode: string;
}
