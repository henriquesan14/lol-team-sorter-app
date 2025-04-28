import { Team } from "./team.interface"

export interface Matchmaking {
    id: string
    mode: string
    blueTeam: Team
    redTeam: Team
    winningTeam: Team
    createdAt: string
    disabled: boolean
}