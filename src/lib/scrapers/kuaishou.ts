import type { SourceAdapter, RawContent } from './base';

export class KuaishouAdapter implements SourceAdapter {
  id = 'kuaishou';
  name = '快手';

  isEnabled(): boolean {
    return false;
  }

  async fetchLatest(_keywords: string[]): Promise<RawContent[]> {
    return [];
  }
}
