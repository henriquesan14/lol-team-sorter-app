import { User } from "./user.interface"

export interface ResponseLogin {
    accessToken: string
    user: User
  }