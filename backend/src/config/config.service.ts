import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    get mySQLServer() {
        const serverURL = process.env.MYSQL_SERVER;
        if (serverURL) {
            return serverURL;
        } else {
            throw new Error('Unable to read "MYSQL_SERVER" environment');
        }
    }

    get mySQLUser(): string {
        const username = process.env.MYSQL_USER;
        if (username) {
            return username;
        } else {
            throw new Error('Unable to read "MYSQL_USER" environment');
        }
    }

    get mySQLPassword(): string {
        const password = process.env.MYSQL_PASSWORD;
        if (password) {
            return password;
        } else {
            throw new Error('Unable to read "MYSQL_PASSWORD" environment');
        }
    }

    get mySQLDatabase(): string {
        const db = process.env.MYSQL_DATABASE;
        if (db) {
            return db;
        } else {
            throw new Error('Unable to read "MYSQL_DATABASE" environment');
        }
    }

    get serverURL(): string {
        const url = process.env.SERVER_URL;
        if (url) {
            return url;
        } else {
            throw new Error(`Unable to read "SERVER_URL" environment`);
        }
    }

    get liffServerURL(): string {
        const url = process.env.LIFF_SERVER_URL;
        if (url) {
            return url;
        } else {
            throw new Error(`Unable to read "LIFF_SERVER_URL" environment`);
        }
    }

    get adminServerURL(): string {
        const url = process.env.ADMIN_SERVER_URL;
        if (url) {
            return url;
        } else {
            throw new Error(`Unable to read "ADMIN_SERVER_URL" environment`);
        }
    }

    get lineChannelID(): string {
        const id = process.env.CHANNEL_ID;
        if (id) {
            return id;
        } else {
            throw new Error(`Unable to read "CHANNEL_ID" environment`);
        }
    }

    get lineChannelSecret(): string {
        const secret = process.env.CHANNEL_SECRET;
        if (secret) {
            return secret;
        } else {
            throw new Error(`Unable to read "CHANNEL_SECRET" environment`);
        }
    }

    get iotDeviceSecret(): string {
        const secret = process.env.IOT_DEVICE_SECRET;
        if (secret) {
            return secret;
        } else {
            throw new Error(`Unable to read "IOT_DEVICE_SECRET" environment`);
        }
    }

    get lineMessagingApiEndpoint(): string {
        const endpoint = process.env.LINE_MESSAGING_API_ENDPOINT;
        if (endpoint) {
            return endpoint;
        } else {
            throw new Error(
                `Unable to read "LINE_MESSAGING_API_ENDPOINT" environment`,
            );
        }
    }

    get channelAccessToken(): string {
        const token = process.env.CHANNEL_ACCESS_TOKEN;
        if (token) {
            return token;
        } else {
            throw new Error(
                `Unable to read "CHANNEL_ACCESS_TOKEN" environment`,
            );
        }
    }
}
