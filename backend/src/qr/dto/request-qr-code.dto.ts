import { IsString } from 'class-validator';

export class RequestQrCodeDto {
    @IsString()
    serialNumber: string;
}
