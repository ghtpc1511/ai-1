import type { SourceAdapter, RawContent } from './base';

export class DouyinAdapter implements SourceAdapter {
  id = 'douyin';
  name = '抖音';

  isEnabled(): boolean {
    return false;
  }

  async fetchLatest(_keywords: string[]): Promise<RawContent[]> {
    return [];
  }
}
