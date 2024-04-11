import { relations, sql } from 'drizzle-orm';
import {
  mysqlTable,
  varchar,
  serial,
  datetime,
  bigint,
  primaryKey,
} from 'drizzle-orm/mysql-core';
// esModule导入会报错

// declaring enum in database

const baseColumns = {
  id: serial('id').primaryKey(),
  createTime: datetime('createTime', { mode: 'string' }).default(sql`now()`),
  updateTime: datetime('updateTime', { mode: 'string' }).default(sql`now()`),
};

export const users = mysqlTable('user', {
  ...baseColumns,
  username: varchar('username', { length: 50 }).notNull(),
  password: varchar('password', { length: 50 }).notNull(),
});
export type newUser = typeof users.$inferInsert;

export const usersRelations = relations(users, ({ many }) => ({
  permissions: many(usersToPermissions),
}));

export const permissions = mysqlTable('permission', {
  ...baseColumns,
  name: varchar('name', { length: 50 }).notNull(),
  desc: varchar('desc', { length: 100 }),
});
export type newPermission = typeof permissions.$inferInsert;

export const permissionsRelations = relations(permissions, ({ many }) => ({
  users: many(usersToPermissions),
}));

export const usersToPermissions = mysqlTable(
  'user_to_permission',
  {
    userId: bigint('user_id', { unsigned: true, mode: 'number' })
      .notNull()
      .references(() => users.id),
    permissionId: bigint('permission_id', { unsigned: true, mode: 'number' })
      .notNull()
      .references(() => permissions.id),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.permissionId],
    }),
  }),
);
export type newUserPermission = typeof usersToPermissions.$inferInsert;

export const usersToPermissionsRelations = relations(
  usersToPermissions,
  ({ one }) => ({
    permissions: one(permissions, {
      fields: [usersToPermissions.permissionId],
      references: [permissions.id],
    }),
    users: one(users, {
      fields: [usersToPermissions.userId],
      references: [users.id],
    }),
  }),
);
