import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Memory } from '../../shared/models/memory';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MemoryService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/memories`;

  create(sessionId: string, text: string): Observable<void> {
    return this.http.post<void>(this.apiUrl, { session_id: sessionId, text });
  }

  listByUser(): Observable<Memory[]> {
    return this.http.get<Memory[]>(this.apiUrl);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}