import { Player } from "./player.interface"

export interface Team {
    players: Player[]
    totalStars: number
    averageTierWeight: number
  }