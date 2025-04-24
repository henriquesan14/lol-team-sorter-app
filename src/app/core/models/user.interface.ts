import { Group } from "./group.interface"

export interface User {
    id: string
    name: string
    username: string
    group: Group
    avatarUrl?: string
    disabled: boolean
  }