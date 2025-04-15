import { Route } from "@angular/router";
import { GenerateMatchmakingComponent } from "./generate-matchmaking/generate-matchmaking.component";

export const MATCHMAKING_ROUTES: Route[] = [
  {path: '', component: GenerateMatchmakingComponent},
];