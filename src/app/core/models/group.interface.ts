import { Permission } from "./permission.interface"

export interface Group {
    name: string
    permissions: Permission[]
  }