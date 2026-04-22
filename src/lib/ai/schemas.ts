import { z } from 'zod';

export const RecipeStepSchema = z.object({
  stepNumber: z.number(),
  stepTitle: z.string(),
  stepDescription: z.string(),
  stepImage: z.string().default('/placeholder.svg'),
});

export const IngredientSchema = z.object({
  name: z.string(),
  amount: z.string(),
  category: z.string().optional(),
  isOptional: z.boolean().optional().default(false),
});

export const GeneratedRecipeSchema = z.object({
  name: z.string(),
  mealType: z.enum(['breakfast', 'lunch', 'dinner']),
  minAgeMonths: z.number().min(6).max(72),
  maxAgeMonths: z.number().min(6).max(72),
  suitableSeasons: z.array(z.enum(['spring', 'summer', 'autumn', 'winter'])),
  difficultyLevel: z.number().min(1).max(3),
  cookTimeMinutes: z.number().min(1).max(120),
  estimatedPriceText: z.string(),
  summaryText: z.string(),
  ingredientList: z.array(IngredientSchema),
  stepList: z.array(RecipeStepSchema).min(3).max(8),
  tips: z.array(z.string()),
  tags: z.array(z.string()),
});

export type GeneratedRecipe = z.infer<typeof GeneratedRecipeSchema>;

export const RecipeBatchSchema = z.object({
  recipes: z.array(GeneratedRecipeSchema),
});
