import { relations } from 'drizzle-orm';
import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { roleToPermission } from './roleToPermission';
import { baseColumns } from './base';

export const permissions = mysqlTable('permission', {
  ...baseColumns,
  name: varchar('name', { length: 50 }).notNull(),
  desc: varchar('desc', { length: 255 }),
});
export type NewPermission = typeof permissions.$inferInsert;

export const permissionRelation = relations(permissions, ({ many }) => ({
  roleToPermission: many(roleToPermission),
}));
