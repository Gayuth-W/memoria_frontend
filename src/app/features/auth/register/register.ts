import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading: boolean = false;
  errorMessage: string = '';
  generatedKey: string | null = null;
  copied: boolean = false;

  generateKey() {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Generate a secure random string (mocking UUID logic for frontend)
    const newKey = 'mem-' + crypto.randomUUID();

    this.userService.create(newKey).subscribe({
      next: () => {
        this.generatedKey = newKey;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to generate key. Please try again.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  copyKey() {
    if (this.generatedKey) {
      navigator.clipboard.writeText(this.generatedKey);
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    }
  }

  continueToDashboard() {
    if (this.generatedKey) {
      this.authService.setApiKey(this.generatedKey);
      this.router.navigate(['/dashboard']);
    }
  }
}