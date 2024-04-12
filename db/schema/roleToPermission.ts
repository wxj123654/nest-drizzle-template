import { relations } from 'drizzle-orm';
import { mysqlTable, bigint } from 'drizzle-orm/mysql-core';
import { permissions } from './permission';
import { roles } from './role';
import { baseColumns } from './base';

export const roleToPermission = mysqlTable('role_to_permission', {
  ...baseColumns,
  roleId: bigint('role_id', { mode: 'number' }).notNull(),
  permissionId: bigint('permission_id', { mode: 'number' }).notNull(),
});

export type NewRoleToPermission = typeof roleToPermission.$inferInsert;

export const roleToPermissionRelation = relations(
  roleToPermission,
  ({ one }) => ({
    role: one(roles, {
      fields: [roleToPermission.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [roleToPermission.permissionId],
      references: [permissions.id],
    }),
  }),
);
