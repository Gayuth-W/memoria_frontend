import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register').then(m => m.Register) },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/layout/layout').then(m => m.Layout),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'sessions', pathMatch: 'full' },
      { path: 'sessions', loadComponent: () => import('./features/sessions/session-list/session-list').then(m => m.SessionList) },
      { path: 'sessions/create', loadComponent: () => import('./features/sessions/session-create/session-create').then(m => m.SessionCreate) },
      { path: 'sessions/:id', loadComponent: () => import('./features/sessions/session-detail/session-detail').then(m => m.SessionDetail) },
      { path: 'memories', loadComponent: () => import('./features/memories/memory-list/memory-list').then(m => m.MemoryList) },
      { path: 'memories/create', loadComponent: () => import('./features/memories/memory-create/memory-create').then(m => m.MemoryCreate) },
      { path: 'search', loadComponent: () => import('./features/search/search-page/search-page').then(m => m.SearchPage) }
    ]
  }
];