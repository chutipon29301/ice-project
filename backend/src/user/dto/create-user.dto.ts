import { IsString, IsInt } from 'class-validator';
import { ToInt } from 'class-sanitizer';

export class CreateUserDto {
    @ToInt()
    @IsInt()
    public roleID: number;

    @IsString()
    public name: string;

    @IsString()
    public oAuthID: string;
}
