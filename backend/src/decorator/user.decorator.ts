import { createParamDecorator } from '@nestjs/common';
import { JwtToken } from '../jwt-auth/dto/jwt-token.dto';

export const User = createParamDecorator(
    (data, req): JwtToken => {
        return req.user;
    },
);
