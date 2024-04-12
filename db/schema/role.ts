import { relations } from 'drizzle-orm';
import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { usersToRoles } from './userToRole';
import { baseColumns } from './base';

export const roles = mysqlTable('role', {
  ...baseColumns,
  name: varchar('name', { length: 50 }).notNull(),
});
export type NewRole = typeof roles.$inferInsert;
export const roleRelation = relations(roles, ({ many }) => ({
  usersToRoles: many(usersToRoles),
}));
