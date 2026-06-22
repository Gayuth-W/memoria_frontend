import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  apiKey: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  onSubmit() {
    if (!this.apiKey.trim()) {
      this.errorMessage = 'Please enter an API key';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Mock API validation since backend /users endpoint creates a new one, 
    // it doesn't validate an existing one natively. We'll just set it and go to dashboard.
    // In a real app we'd verify the key works first.
    setTimeout(() => {
      this.authService.setApiKey(this.apiKey.trim());
      this.router.navigate(['/dashboard']);
      this.isLoading = false;
    }, 800);
  }
}