import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./features/matchmaking/matchmaking.routes')
            .then(mod => mod.MATCHMAKING_ROUTES), 
    },
];
