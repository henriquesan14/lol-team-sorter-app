import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UnauthenticadedGuard } from './core/guards/unauthenticated.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '', loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES) },
    ],
    canActivate: [UnauthenticadedGuard],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'matchmaking', pathMatch: 'full' },
      { path: 'matchmaking', loadChildren: () => import('./features/matchmaking/matchmaking.routes').then(m => m.MATCHMAKING_ROUTES) },
      { path: 'users', loadChildren: () => import('./features/user/user.routes').then(m => m.USER_ROUTES) },
      { path: 'groups', loadChildren: () => import('./features/group/group.routes').then(m => m.GROUP_ROUTES) },
      { path: 'account', loadChildren: () => import('./features/account/account.routes').then(m => m.ACCOUNT_ROUTES) },
      { path: 'player', loadChildren: () => import('./features/player/player.routes').then(m => m.PLAYER_ROUTES) }
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/login'
  },

];
