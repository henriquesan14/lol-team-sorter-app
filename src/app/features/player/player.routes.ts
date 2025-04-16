import { Route } from "@angular/router";
import { CreatePlayerComponent } from "./create-player/create-player.component";

export const PLAYER_ROUTES: Route[] = [
  {path: 'create', component: CreatePlayerComponent},
];