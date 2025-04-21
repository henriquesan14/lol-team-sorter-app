import { Permission } from "./permission.interface"

export interface PermissionByCategory {
    permissionCategory: string
    permissions: Permission[]
  }