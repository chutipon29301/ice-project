import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
    @IsString()
    public name: string;

    @IsString()
    public oAuthID: string;
}
