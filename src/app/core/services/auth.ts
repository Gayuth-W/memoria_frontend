import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  setApiKey(key: string) {
    localStorage.setItem('api_key', key);
  }

  getApiKey(): string | null {
    return localStorage.getItem('api_key');
  }

  logout() {
    localStorage.removeItem('api_key');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getApiKey();
  }
}