import { Route } from "@angular/router";
import { RankingPlayersComponent } from "./ranking-players/ranking-players.component";

export const PLAYER_ROUTES: Route[] = [
  {path: 'ranking', component: RankingPlayersComponent},
];