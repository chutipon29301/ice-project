import {
    AES as aes,
    LibWordArray,
    WordArray,
    CipherOption,
    DecryptedMessage,
} from 'crypto-js';

export class AES {
    encrypt(
        message: string | LibWordArray | object,
        secretPassphrase: string | WordArray,
        option?: CipherOption,
    ): string {
        if (typeof message === 'object') {
            return aes
                .encrypt(JSON.stringify(message), secretPassphrase, option)
                .toString();
        } else {
            return aes.encrypt(message, secretPassphrase, option).toString();
        }
    }
    decrypt<T>(
        encryptedMessage: string | WordArray,
        secretPassphrase: string | WordArray,
        option?: CipherOption,
    ): T | string {
        const decodedMessage = aes
            .decrypt(encryptedMessage, secretPassphrase, option)
            .toString();
        try {
            const decodedObject = JSON.parse(decodedMessage);
            return decodedObject as T;
        } catch (_) {
            return decodedMessage;
        }
    }
}
