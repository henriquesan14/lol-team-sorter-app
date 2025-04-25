import { User } from "./user.interface"

export interface ResponseLogin {
    refreshToken: string
    RefreshTokenExpiresAt: string
    accessToken: string
    user: User
  }