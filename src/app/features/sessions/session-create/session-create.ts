import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '../../../core/services/session';

@Component({
  selector: 'app-session-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './session-create.html',
  styleUrl: './session-create.css'
})
export class SessionCreate {
  private sessionService = inject(SessionService);
  private router = inject(Router);

  title: string = '';
  isLoading = false;
  errorMessage = '';

  onSubmit() {
    if (!this.title.trim()) {
      this.errorMessage = 'Title is required';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.sessionService.create(this.title).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard/sessions']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to create session. Please try again.';
        console.error(err);
      }
    });
  }
}