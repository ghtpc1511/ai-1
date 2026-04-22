import type { SourceAdapter } from './base';
import { XiaohongshuAdapter } from './xiaohongshu';
import { DouyinAdapter } from './douyin';
import { KuaishouAdapter } from './kuaishou';

const adapters: SourceAdapter[] = [
  new XiaohongshuAdapter(),
  new DouyinAdapter(),
  new KuaishouAdapter(),
];

export function getEnabledAdapters(): SourceAdapter[] {
  return adapters.filter((a) => a.isEnabled());
}

export function getAllAdapters(): SourceAdapter[] {
  return adapters;
}

export function getAdapterById(id: string): SourceAdapter | undefined {
  return adapters.find((a) => a.id === id);
}
