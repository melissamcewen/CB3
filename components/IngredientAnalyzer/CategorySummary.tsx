import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import type { AnalysisResult } from '@/lib/curlsbot-api/types';
import type { FilterOptions } from '@/lib/types';
import { filterCategories } from '@/lib/config/categories';

interface CategorySummaryProps {
  results: AnalysisResult;
  filters: FilterOptions;
}

export function CategorySummary({ results, filters }: CategorySummaryProps) {
  const findMatches = () => {
    return Object.entries(filterCategories).some(([key, category]) => {
      if (!filters[key as keyof FilterOptions]) return false;
      return results.matches.some(match =>
        category.matchCategories.some(c =>
          match.categories?.includes(c) &&
          (match.confidence ?? 1) >= category.minConfidence
        )
      );
    });
  };

  const hasAnyMatches = findMatches();

  const getMatchedCategories = () => {
    return Object.entries(filterCategories)
      .filter(([key, category]) => {
        if (!filters[key as keyof FilterOptions]) return false;
        return results.matches.some(match =>
          category.matchCategories.some(c =>
            match.categories?.includes(c) &&
            (match.confidence ?? 1) >= category.minConfidence
          )
        );
      })
      .map(([_, category]) => category);
  };

  return (
    <div className="card bg-base-100 shadow-lg mb-6">
      <div className="card-body">
        <div className="flex items-start gap-4">
          {hasAnyMatches ? (
            <AlertTriangle className="text-warning w-6 h-6 mt-1" />
          ) : (
            <CheckCircle className="text-success w-6 h-6 mt-1" />
          )}
          <div>
            <h3 className="card-title text-lg mb-2">
              {hasAnyMatches ? 'Ingredients Found' : 'No Matching Ingredients Found'}
            </h3>
            {hasAnyMatches ? (
              <div className="space-y-2">
                <p>We found ingredients that match your filters:</p>
                <ul className="list-disc list-inside space-y-1">
                  {getMatchedCategories().map(category => (
                    <li key={category.id}>{category.warningMessage}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="space-y-2">
                <p>We didn't find any ingredients matching your filters.</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Info className="w-4 h-4" />
                  <p>Please note: Always verify ingredients yourself as our analysis may not catch everything.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
