import { IsString } from 'class-validator';

export class CreateUserDto {

    @IsString()
    lineID: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}
