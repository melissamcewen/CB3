import type { AnalysisResult } from '@/lib/curlsbot-api/types';
import type { FilterOptions } from '@/lib/types';
import { CategorySummary } from './CategorySummary';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import { IngredientCard } from './IngredientCard';
import { filterCategories } from '@/lib/config/categories';

interface IngredientResultsProps {
  results: AnalysisResult;
  filters: FilterOptions;
  recommendations: Product[];
}

export function IngredientResults({ results, filters, recommendations }: IngredientResultsProps) {
  const groupIngredientsByCategory = (matches: any[]) => {
    const groups = Object.entries(filterCategories).reduce((acc, [key, category]) => {
      const matchesInCategory = matches.filter(m =>
        category.matchCategories.some(c =>
          m.categories?.includes(c) &&
          (m.confidence ?? 1) >= category.minConfidence
        )
      );

      if (matchesInCategory.length > 0) {
        acc[category.label] = matchesInCategory;
      }
      return acc;
    }, {} as Record<string, typeof matches>);

    // Add uncategorized ingredients
    const categorizedIngredients = new Set(
      Object.values(groups).flat().map(m => m.name)
    );

    const uncategorized = matches.filter(m => !categorizedIngredients.has(m.name));
    if (uncategorized.length > 0) {
      groups['Other'] = uncategorized;
    }

    return groups;
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Analysis Results</h3>

      <CategorySummary results={results} filters={filters} />

      <div className="space-y-6">
        {Object.entries(groupIngredientsByCategory(results.matches)).map(([category, matches]) => (
          <div key={category} className="space-y-4">
            <h4 className="text-xl font-semibold capitalize">{category}</h4>
            {matches.map((match, index) => (
              <IngredientCard
                key={`${match.name}-${index}`}
                match={match}
                filters={filters}
              />
            ))}
          </div>
        ))}
      </div>

      {recommendations.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Recommended Alternatives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
