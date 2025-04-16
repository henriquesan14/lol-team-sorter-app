import { Route } from "@angular/router";
import { FormPlayerComponent } from "./form-player/form-player.component";

export const PLAYER_ROUTES: Route[] = [
  {path: 'create', component: FormPlayerComponent},
];