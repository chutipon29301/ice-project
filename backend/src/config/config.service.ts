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

  get mySQLDatabaseName(): string {
    const db = process.env.MYSQL_DATABASE;
    if (db) {
      return db;
    } else {
      throw Error('Unable to read "MYSQL_DATABASE" environment');
    }
  }
}
