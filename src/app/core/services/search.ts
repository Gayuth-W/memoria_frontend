import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SearchResponse } from '../../shared/models/search-result';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/search`;

  search(sessionId: string, query: string): Observable<SearchResponse> {
    return this.http.post<SearchResponse>(this.apiUrl, { session_id: sessionId, query });
  }
}