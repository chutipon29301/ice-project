import { IsString, IsEnum } from 'class-validator';
import { Role } from '../../models/users.model';

export class RegisterUserDto {
    @IsString()
    public name: string;

    @IsEnum(Role)
    public role: Role;
}
