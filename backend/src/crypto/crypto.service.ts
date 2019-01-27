import { Injectable } from '@nestjs/common';
import { AES } from './dto/aes.dto';

@Injectable()
export class CryptoService {
    get AES(): AES {
        return new AES();
    }
}
