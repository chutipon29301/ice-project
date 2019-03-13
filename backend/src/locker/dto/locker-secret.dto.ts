import { IsString } from 'class-validator';

export class LockerSecretDto {
    @IsString()
    secret: string;
}
