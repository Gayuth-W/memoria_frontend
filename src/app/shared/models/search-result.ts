import { Memory } from './memory';

export interface SearchResult {
  memory: Memory;
  score: number;
}

export interface SearchResponse {
  results: SearchResult[];
  trace?: any;
}