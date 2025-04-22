import { Route } from "@angular/router";
import { ListGroupsComponent } from "./list-groups/list-groups.component";

export const GROUP_ROUTES: Route[] = [
  {path: 'list', component: ListGroupsComponent},
];