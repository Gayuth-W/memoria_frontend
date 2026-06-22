import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SessionService } from '../../../core/services/session';
import { MemoryService } from '../../../core/services/memory';
import { Session } from '../../../shared/models/session';
import { Memory } from '../../../shared/models/memory';

@Component({
  selector: 'app-session-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './session-detail.html',
  styleUrl: './session-detail.css'
})
export class SessionDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private sessionService = inject(SessionService);
  private memoryService = inject(MemoryService);

  sessionId: string = '';
  session: Session | null = null;
  memories: Memory[] = [];
  
  isLoading = true;
  showAddModal = false;
  newMemoryText = '';
  isSubmitting = false;

  ngOnInit() {
    this.sessionId = this.route.snapshot.paramMap.get('id') || '';
    if (this.sessionId) {
      this.loadData();
    }
  }

  loadData() {
    this.isLoading = true;
    this.sessionService.getById(this.sessionId).subscribe({
      next: (s) => {
        this.session = s;
        this.loadMemories();
      },
      error: (err) => {
        console.error('Failed to load session', err);
        this.isLoading = false;
      }
    });
  }

  loadMemories() {
    this.sessionService.getMemories(this.sessionId).subscribe({
      next: (mems) => {
        this.memories = mems || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load memories', err);
        this.isLoading = false;
      }
    });
  }

  openAddMemory() {
    this.newMemoryText = '';
    this.showAddModal = true;
  }

  closeAddMemory() {
    this.showAddModal = false;
  }

  submitMemory() {
    if (!this.newMemoryText.trim()) return;
    
    this.isSubmitting = true;
    this.memoryService.create(this.sessionId, this.newMemoryText).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showAddModal = false;
        this.loadMemories(); // Refresh list
      },
      error: (err) => {
        console.error('Failed to add memory', err);
        this.isSubmitting = false;
      }
    });
  }

  deleteMemory(id: string) {
    if (confirm('Are you sure you want to delete this memory?')) {
      this.memoryService.delete(id).subscribe({
        next: () => this.loadMemories(),
        error: (err) => console.error('Failed to delete memory', err)
      });
    }
  }
}