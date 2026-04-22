import OpenAI from 'openai';
import { getEnv } from '../cloudflare';

let clientInstance: OpenAI | null = null;

export async function getAIClient(): Promise<OpenAI> {
  if (clientInstance) return clientInstance;
  const env = await getEnv();
  clientInstance = new OpenAI({
    baseURL: env.QWEN_API_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: env.QWEN_API_KEY || '',
  });
  return clientInstance;
}

export async function getModelName(): Promise<string> {
  const env = await getEnv();
  return env.QWEN_MODEL_NAME || 'qwen3.6-35b-a3b';
}

export async function chatCompletion(
  systemPrompt: string,
  userPrompt: string,
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const client = await getAIClient();
  const model = await getModelName();

  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 3000,
    response_format: { type: 'json_object' },
  });

  return response.choices[0]?.message?.content || '{}';
}
