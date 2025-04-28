import { Player } from "./player.interface"

export interface Team {
    id: string
    players: Player[]
    totalStars: number
    averageTierWeight: number
  }