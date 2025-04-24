import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { CallbackComponent } from "./callback/callback.component";

export const AUTH_ROUTES: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'auth/callback', component: CallbackComponent}
];