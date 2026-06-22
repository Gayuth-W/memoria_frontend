import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../core/services/search';
import { SessionService } from '../../../core/services/session';
import { SearchResult } from '../../../shared/models/search-result';
import { Session } from '../../../shared/models/session';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export class SearchPage implements OnInit {
  private searchService = inject(SearchService);
  private sessionService = inject(SessionService);

  query: string = '';
  selectedSessionId: string = '';
  sessions: Session[] = [];
  
  results: SearchResult[] = [];
  isSearching = false;
  hasSearched = false;

  ngOnInit() {
    this.sessionService.listByUser().subscribe(res => {
      this.sessions = res || [];
    });
  }

  onSearch() {
    if (!this.query.trim()) return;

    this.isSearching = true;
    this.hasSearched = true;

    this.searchService.search(this.selectedSessionId, this.query).subscribe({
      next: (res) => {
        this.results = res.results || [];
        this.isSearching = false;
      },
      error: (err) => {
        console.error('Search failed', err);
        this.isSearching = false;
      }
    });
  }

  getScoreColor(score: number): string {
    // Generate a color from yellow/orange (low) to green/blue (high) based on score
    if (score >= 0.8) return 'linear-gradient(135deg, #10b981, #3b82f6)'; // Green-Blue
    if (score >= 0.6) return 'linear-gradient(135deg, #f59e0b, #10b981)'; // Orange-Green
    return 'linear-gradient(135deg, #ef4444, #f59e0b)'; // Red-Orange
  }
}