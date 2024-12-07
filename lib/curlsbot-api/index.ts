import { Analyzer } from './analyzer';
import type {
  AnalysisResult,
  FilterOptions,
  Ingredient,
  CategoryGroups,
  IngredientMatch
} from './types';

export type {
  AnalysisResult,
  FilterOptions,
  Ingredient,
  CategoryGroups,
  IngredientMatch
};
export { Analyzer };

// Export a convenience function for analyzing ingredients
export function analyzeIngredients(
  ingredientList: string,
  filters: FilterOptions,
  ingredients: Record<string, Ingredient>,
  categories: CategoryGroups
): AnalysisResult {
  const analyzer = new Analyzer({
    database: {
      ingredients,
      categories
    },
    config: {
      minConfidence: 0.7,
      fuzzyMatch: true
    }
  });

  return analyzer.analyzeIngredients(ingredientList);
}
