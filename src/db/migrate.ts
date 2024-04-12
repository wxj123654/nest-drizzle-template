import { migrate } from 'drizzle-orm/mysql2/migrator';
import { initDb } from './db';

async function startMigrate() {
  const { db, connection } = await initDb();
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: './drizzle' });
  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
}
startMigrate();
