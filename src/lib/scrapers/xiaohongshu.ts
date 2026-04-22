import type { SourceAdapter, RawContent } from './base';

export class XiaohongshuAdapter implements SourceAdapter {
  id = 'xiaohongshu';
  name = '小红书';

  isEnabled(): boolean {
    return false; // Disabled by default - requires ENABLE_XHS_SOURCE=true
  }

  async fetchLatest(_keywords: string[]): Promise<RawContent[]> {
    // Placeholder: actual implementation would use Xiaohongshu API
    return [];
  }
}
