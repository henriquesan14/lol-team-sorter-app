import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/matchmaking/generate' },
  { path: 'matchmaking', loadChildren: () => import('./features/matchmaking/matchmaking.routes').then(m => m.MATCHMAKING_ROUTES) },
  { path: 'players', loadChildren: () => import('./features/player/player.routes').then(m => m.PLAYER_ROUTES) }
];
