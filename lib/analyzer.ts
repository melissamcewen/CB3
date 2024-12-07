import { Analyzer, AnalysisResult, AnalyzerConfig } from '@/lib/curlsbot-api';
import { ingredients } from './data/ingredients';
import { categories } from './data/categories';
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
  console.log('Starting analysis with ingredients database:', Object.keys(ingredients).length);

  const analyzer = new Analyzer({
    database: {
      ingredients,
      categories
    },
    config: {
      minConfidence: 1,
      fuzzyMatch: true
    }
  } as AnalyzerConfig);

  const results = analyzer.analyzeIngredients(ingredientList);
  console.log('Analysis results:', results);

  return results;
}


