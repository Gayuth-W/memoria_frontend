import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../../core/services/session';
import { Session } from '../../../shared/models/session';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './session-list.html',
  styleUrl: './session-list.css'
})
export class SessionList implements OnInit {
  private sessionService = inject(SessionService);
  
  sessions: Session[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadSessions();
  }

  loadSessions() {
    this.sessionService.listByUser().subscribe({
      next: (res) => {
        this.sessions = res || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load sessions', err);
        this.isLoading = false;
      }
    });
  }
}