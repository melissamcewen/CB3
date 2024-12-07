import { AnalysisResult } from 'haircare-ingredients-analyzer';
import { FilterOptions } from '@/lib/types';
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
    const groups = {
      sulfates: matches.filter(m =>
        m.categories?.includes('sulfate') &&
        (m.confidence ?? 1) >= filterCategories.sulfate.minConfidence
      ),
      silicones: matches.filter(m =>
        (m.categories?.includes('non-soluble silicone') &&
         (m.confidence ?? 1) >= filterCategories['non-soluble-silicone'].minConfidence) ||
        (m.categories?.includes('water-soluble silicone') &&
         (m.confidence ?? 1) >= filterCategories['water-soluble-silicone'].minConfidence)
      ),
      alcohols: matches.filter(m =>
        m.categories?.includes('drying alcohol') ||
        m.categories?.includes('fatty alcohol')
      ),
      waxes: matches.filter(m =>
        m.categories?.includes('non-soluble wax') ||
        m.categories?.includes('emulsifying wax')
      ),
      other: matches.filter(m =>
        !m.categories?.some((c: string) =>
          ['sulfate', 'non-soluble silicone', 'water-soluble silicone',
           'drying alcohol', 'fatty alcohol', 'non-soluble wax',
           'emulsifying wax'].includes(c)
        )
      )
    };

    return Object.fromEntries(
      Object.entries(groups).filter(([_, matches]) => matches.length > 0)
    );
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
