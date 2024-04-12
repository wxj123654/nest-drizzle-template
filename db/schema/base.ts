import { sql } from 'drizzle-orm';
import { serial, datetime } from 'drizzle-orm/mysql-core';

export const baseColumns = {
  id: serial('id').primaryKey(),
  createTime: datetime('createTime', { mode: 'string' }).default(sql`now()`),
  updateTime: datetime('updateTime', { mode: 'string' }).default(sql`now()`),
};
