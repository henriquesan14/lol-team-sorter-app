import { Route } from "@angular/router";
import { UpdatePasswordComponent } from "./update-password/update-password.component";

export const ACCOUNT_ROUTES: Route[] = [
  {path: 'update-password', component: UpdatePasswordComponent},
];