import { Team } from "./team.interface"

export interface Matchmaking {
    mode: string
    blueTeam: Team
    redTeam: Team
    createdAt: string
}