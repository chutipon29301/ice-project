import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class LoginCallbackPageDro {
    @ApiModelProperty({
        description: 'Path for redirecting after login',
    })
    @IsString()
    @IsOptional()
    redirect: string;
}
