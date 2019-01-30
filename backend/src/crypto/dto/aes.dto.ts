import {
    AES as aes,
    LibWordArray,
    WordArray,
    CipherOption,
    enc,
} from 'crypto-js';

export class AES {
    encrypt(
        message: string | LibWordArray,
        secretPassphrase: string | WordArray,
        option?: CipherOption,
    ): string {
        return aes.encrypt(message, secretPassphrase, option).toString();
    }
    decrypt<T>(
        encryptedMessage: string | WordArray,
        secretPassphrase: string | WordArray,
        option?: CipherOption,
    ): T | string {
        const decodedMessage = aes
            .decrypt(encryptedMessage, secretPassphrase, option)
            .toString(enc.Utf8);
        try {
            const decodedObject = JSON.parse(decodedMessage);
            return decodedObject as T;
        } catch (_) {
            return decodedMessage;
        }
    }
}
