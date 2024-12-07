import { Analyzer } from 'haircare-ingredients-analyzer';
import { ingredients } from './data/ingredients';
import { categories } from './data/categories';
import { AnalysisResult } from 'haircare-ingredients-analyzer';
import { mockProducts } from './data/products/mockData';
import { Product } from './types';

type FilterOptions = {
  sulfate: boolean;
  'non-soluble silicone': boolean;
  'water-soluble silicone': boolean;
  'drying alcohol': boolean;
  'non-soluble wax': boolean;
};

export function analyzeIngredients(
  ingredientList: string,
  filters: FilterOptions
): AnalysisResult {
  const analyzer = new Analyzer({
    database: {
      ingredients,
      categories
    }
  });

  const results = analyzer.analyzeIngredients(ingredientList);

  const filteredMatches = results.matches.map(match => {
    if (!match.categories) {
      match.categories = [];
    }

    // Map category names from the analyzer to our filter categories
    const categoryMap = {
      'sulfate': 'sulfate',
      'non-soluble silicone': 'non-soluble silicone',
      'water-soluble silicone': 'water-soluble silicone',
      'drying alcohol': 'drying alcohol',
      'non-soluble wax': 'non-soluble wax'
    } as const;

    // Ensure categories match our filter names
    Object.entries(categoryMap).forEach(([category, mappedCategory]) => {
      if (match.categories?.includes(category) && !match.categories.includes(mappedCategory)) {
        match.categories.push(mappedCategory);
      }
    });

    return match;
  });

  return {
    ...results,
    matches: filteredMatches
  };
}

function getRecommendations(analysisResults: AnalysisResult[]): Product[] {
  return mockProducts.sort(() => Math.random() - 0.5).slice(0, 2);
}
