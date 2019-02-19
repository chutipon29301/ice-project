import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    get mySQLServer() {
        const serverURL = process.env.MYSQL_SERVER;
        if (serverURL) {
            return serverURL;
        } else {
            throw Error('Unable to read "MYSQL_SERVER" environment');
        }
    }

    get mySQLUser(): string {
        const username = process.env.MYSQL_USER;
        if (username) {
            return username;
        } else {
            throw Error('Unable to read "MYSQL_USER" environment');
        }
    }

    get mySQLPassword(): string {
        const password = process.env.MYSQL_PASSWORD;
        if (password) {
            return password;
        } else {
            throw Error('Unable to read "MYSQL_PASSWORD" environment');
        }
    }

    get mySQLDatabase(): string {
        const db = process.env.MYSQL_DATABASE;
        if (db) {
            return db;
        } else {
            throw Error('Unable to read "MYSQL_DATABASE" environment');
        }
    }

    get serverURL(): string {
        const url = process.env.SERVER_URL;
        if (url) {
            return url;
        } else {
            throw Error(`Unable to read "SERVER_URL" environment`);
        }
    }

    get lineChannelID(): string {
        const id = process.env.CHANNEL_ID;
        if (id) {
            return id;
        } else {
            throw Error(`Unable to read "CHANNEL_ID" environment`);
        }
    }

    get lineChannelSecret(): string {
        const secret = process.env.CHANNEL_SECRET;
        if (secret) {
            return secret;
        } else {
            throw Error(`Unable to read "CHANNEL_SECRET" environment`);
        }
    }

    get iotDeviceSecret(): string {
        const secret = process.env.IOT_DEVICE_SECRET;
        if (secret) {
            return secret;
        } else {
            throw Error(`Unable to read "IOT_DEVICE_SECRET" environment`);
        }
    }
}
