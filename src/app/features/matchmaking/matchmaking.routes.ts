import { Route } from "@angular/router";
import { GenerateMatchmakingComponent } from "./generate-matchmaking/generate-matchmaking.component";
import { ListMatchmakingComponent } from "./list-matchmaking/list-matchmaking.component";

export const MATCHMAKING_ROUTES: Route[] = [
  {path: '', component: GenerateMatchmakingComponent},
  {path: 'list', component: ListMatchmakingComponent},
];