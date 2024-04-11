import { MySql2Database, drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import config from '../../drizzle.config';
import * as schema from '../../db/schema/index';

let connection: mysql.Connection;
let db: MySql2Database<typeof schema>;

export async function initDb() {
  if (!connection) {
    connection = await mysql.createConnection({
      ...config.dbCredentials,
      multipleStatements: true,
    });
  }
  if (!db) {
    db = drizzle(connection, {
      schema: schema,
      mode: 'default',
    });
  }
  return {
    db,
    connection,
  };
}

export function closeDb() {
  connection?.destroy();
}

export type DbType = MySql2Database<typeof schema>;
