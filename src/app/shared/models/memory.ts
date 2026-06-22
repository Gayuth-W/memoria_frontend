export interface Memory {
  id: string;
  user_id: string;
  session_id: string;
  text: string;
  created_at: string;
  tsv?: string;
  importance_score?: number;
  embedding_hash?: string;
}