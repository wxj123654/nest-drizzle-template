import {
  DynamicModule,
  Module,
  OnApplicationShutdown,
  Provider,
} from '@nestjs/common';
import { initDb, closeDb } from './db';

export const DB_TOKEN = 'drizzle-orm';

@Module({})
export class DbModule implements OnApplicationShutdown {
  static async forRootAsync(): Promise<DynamicModule> {
    const { db } = await initDb();

    const dbProvider: Provider = {
      provide: DB_TOKEN,
      useValue: db,
    };

    return {
      module: DbModule,
      global: true,
      providers: [dbProvider],
      exports: [dbProvider],
    };
  }

  onApplicationShutdown() {
    closeDb();
  }
}
