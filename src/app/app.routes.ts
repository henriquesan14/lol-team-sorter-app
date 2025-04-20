import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'matchmaking', loadChildren: () => import('./features/matchmaking/matchmaking.routes').then(m => m.MATCHMAKING_ROUTES) },
      { path: 'players', loadChildren: () => import('./features/player/player.routes').then(m => m.PLAYER_ROUTES) } 
    ],
  },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [
        { path: 'login', loadChildren: () => import('./features/auth/login.routes').then(m => m.LOGIN_ROUTES) },
      ],
    },
    { path: '**', redirectTo: '' },
  
];
