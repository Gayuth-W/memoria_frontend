import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Session } from '../../shared/models/session';
import { Memory } from '../../shared/models/memory';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/sessions`;

  listByUser(): Observable<Session[]> {
    return this.http.get<Session[]>(this.apiUrl);
  }

  create(title: string): Observable<void> {
    return this.http.post<void>(this.apiUrl, { title });
  }

  getById(id: string): Observable<Session> {
    return this.http.get<Session>(`${this.apiUrl}/${id}`);
  }

  getMemories(id: string): Observable<Memory[]> {
    return this.http.get<Memory[]>(`${this.apiUrl}/${id}/memories`);
  }
}