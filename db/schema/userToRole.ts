import { relations } from 'drizzle-orm';
import { mysqlTable, bigint } from 'drizzle-orm/mysql-core';
import { roles } from './role';
import { users } from './user';
import { baseColumns } from './base';

export const usersToRoles = mysqlTable('user_to_role', {
  ...baseColumns,
  userId: bigint('user_id', { mode: 'number' }).notNull(),
  roleId: bigint('role_id', {
    mode: 'number',
  }).notNull(),
});
export type NewUserToRole = typeof usersToRoles.$inferInsert;
export const usersToRolesRelation = relations(usersToRoles, ({ one }) => ({
  user: one(users, {
    fields: [usersToRoles.id],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [usersToRoles.userId],
    references: [roles.id],
  }),
}));
