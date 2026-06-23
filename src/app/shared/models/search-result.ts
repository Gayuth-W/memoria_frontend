import { Memory } from './memory';

export interface SearchResult {
  MemoryID: string;
  SessionID: string;
  Text: string;
  Similarity: number;
  Recency: number;
  Importance: number;
  SessionBoost: number;
  FinalScore: number;
  CreatedAt: string;
}

export interface SearchResponse {
  results: SearchResult[];
  trace?: any;
}