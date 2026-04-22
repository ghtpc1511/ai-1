import type { MealType, Season, AgeGroup } from '@/types';
import { MEAL_TYPE_LABELS, SEASON_LABELS } from '@/types';

export function getRecipeGenerationPrompt(
  mealType: MealType,
  season: Season,
  ageGroup: AgeGroup,
  count: number
): { system: string; user: string } {
  const ageRangeMap: Record<AgeGroup, string> = {
    '12-18': '12到18个月',
    '19-24': '19到24个月',
    '25-36': '2到3岁',
    '37-48': '3到4岁',
    '49-72': '4到6岁',
  };

  const system = `你是一位专业的儿童营养师和家庭菜谱专家。你需要为中国家庭设计宝宝辅食/儿童餐食谱。
要求：
- 食谱必须适合老人在家制作，步骤简单清晰
- 食材要家常易得，不要用罕见或昂贵食材
- 每道菜要有完整的步骤说明，每步都要详细到老人能直接照做
- 注意宝宝年龄对应的食物性状要求（泥状、碎末、小块等）
- 注意食品安全和过敏风险
- 价格要实惠，适合普通家庭
- 输出必须是严格的JSON格式

你必须输出如下JSON结构:
{
  "recipes": [
    {
      "name": "食谱名称",
      "mealType": "breakfast|lunch|dinner",
      "minAgeMonths": 数字,
      "maxAgeMonths": 数字,
      "suitableSeasons": ["spring","summer","autumn","winter"],
      "difficultyLevel": 1-3的数字(1最简单),
      "cookTimeMinutes": 数字,
      "estimatedPriceText": "约X元",
      "summaryText": "一句话描述这道菜的特点和好处",
      "ingredientList": [{"name": "食材名", "amount": "用量", "category": "分类"}],
      "stepList": [{"stepNumber": 1, "stepTitle": "步骤标题", "stepDescription": "详细描述", "stepImage": "/placeholder.svg"}],
      "tips": ["注意事项1", "注意事项2"],
      "tags": ["标签1", "标签2"]
    }
  ]
}`;

  const user = `请为${ageRangeMap[ageGroup]}的宝宝设计${count}道${SEASON_LABELS[season]}适合吃的${MEAL_TYPE_LABELS[mealType]}食谱。

要求：
1. 每道食谱要有4-6个步骤，每步说明要详细
2. 食材用量要具体（如"30克"、"半个"、"适量"）
3. 难度尽量简单（1或2）
4. 耗时控制在30分钟以内
5. 单道菜价格控制在10元以内
6. 步骤描述要简洁明了，适合60岁以上老人阅读
7. tips中要包含安全注意事项
8. 考虑${SEASON_LABELS[season]}的时令食材

请直接输出JSON，不要有其他文字。`;

  return { system, user };
}
