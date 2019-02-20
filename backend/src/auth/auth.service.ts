import { Injectable } from '@nestjs/common';
import { LineAuthService } from '../line-auth/line-auth.service';

@Injectable()
export class AuthService {
    private readonly lineCallbackURL: string = '/auth/line/callback';

    constructor(private readonly lineAuthService: LineAuthService) {}

    getLineAuthenticationPageURL(): string {
        return this.lineAuthService.lineAuthPageURL(this.lineCallbackURL);
    }
}
