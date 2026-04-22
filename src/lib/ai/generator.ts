import { chatCompletion } from './client';
import { RecipeBatchSchema, type GeneratedRecipe } from './schemas';
import { getRecipeGenerationPrompt } from './prompts';
import { insertRecipe } from '../db/recipes';
import { generateId } from '../utils/constants';
import type { MealType, Season, AgeGroup, Recipe } from '@/types';

export async function generateRecipes(
  mealType: MealType,
  season: Season,
  ageGroup: AgeGroup,
  count = 3
): Promise<Recipe[]> {
  const { system, user } = getRecipeGenerationPrompt(mealType, season, ageGroup, count);

  const raw = await chatCompletion(system, user, { temperature: 0.7, maxTokens: 4000 });

  let parsed: { recipes: GeneratedRecipe[] };
  try {
    const json = JSON.parse(raw);
    parsed = RecipeBatchSchema.parse(json);
  } catch (e) {
    console.error('AI output parsing failed:', e);
    return [];
  }

  const recipes: Recipe[] = [];
  const now = new Date().toISOString();

  for (const gen of parsed.recipes) {
    const recipe: Recipe = {
      id: generateId(),
      name: gen.name,
      mealType: gen.mealType,
      minAgeMonths: gen.minAgeMonths,
      maxAgeMonths: gen.maxAgeMonths,
      suitableSeasons: gen.suitableSeasons,
      difficultyLevel: gen.difficultyLevel as 1 | 2 | 3,
      cookTimeMinutes: gen.cookTimeMinutes,
      estimatedPriceText: gen.estimatedPriceText,
      summaryText: gen.summaryText,
      coverImage: '/placeholder.svg',
      ingredientList: gen.ingredientList,
      stepList: gen.stepList,
      tips: gen.tips,
      sourcePlatform: 'ai_generated',
      sourceTitle: `AI生成-${gen.name}`,
      sourceQualityScore: 0.7,
      recommendationScore: 0,
      tags: gen.tags,
      status: 'published',
      createdAt: now,
      updatedAt: now,
    };

    try {
      await insertRecipe(recipe);
      recipes.push(recipe);
    } catch (e) {
      console.error('Failed to insert recipe:', gen.name, e);
    }
  }

  return recipes;
}
