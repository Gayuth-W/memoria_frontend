import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryService } from '../../../core/services/memory';
import { Memory } from '../../../shared/models/memory';

@Component({
  selector: 'app-memory-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory-list.html',
  styleUrl: './memory-list.css'
})
export class MemoryList implements OnInit {
  private memoryService = inject(MemoryService);
  
  memories: Memory[] = [];
  isLoading = true;

  ngOnInit() {
    this.memoryService.listByUser().subscribe({
      next: (mems) => {
        this.memories = mems || [];
        // Sort descending by date
        this.memories.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load all memories', err);
        this.isLoading = false;
      }
    });
  }
}