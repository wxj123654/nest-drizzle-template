import { relations } from 'drizzle-orm';
import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { usersToRoles } from './userToRole';
import { baseColumns } from './base';

export const users = mysqlTable('user', {
  ...baseColumns,
  username: varchar('username', { length: 50 }).notNull(),
  password: varchar('password', { length: 50 }).notNull(),
});
export type NewUser = typeof users.$inferInsert;
export const userRelation = relations(users, ({ many }) => ({
  usersToRoles: many(usersToRoles),
}));
