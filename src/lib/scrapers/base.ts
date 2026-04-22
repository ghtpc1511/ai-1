export interface RawContent {
  title: string;
  body: string;
  imageUrls: string[];
  author: string;
  likes: number;
  sourceUrl: string;
  publishedAt: string;
}

export interface SourceAdapter {
  id: string;
  name: string;
  isEnabled(): boolean;
  fetchLatest(keywords: string[]): Promise<RawContent[]>;
}
