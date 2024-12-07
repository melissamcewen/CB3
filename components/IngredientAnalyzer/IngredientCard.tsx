import { AlertTriangle, AlertCircle, Search } from 'lucide-react';
import { IngredientMatch } from 'haircare-ingredients-analyzer';
import { FilterOptions } from '@/lib/types';
import { filterCategories } from '@/lib/config/categories';

interface IngredientCardProps {
  match: IngredientMatch;
  filters: FilterOptions;
}

export function IngredientCard({ match, filters }: IngredientCardProps) {
  const getBadgeColor = (categories: string[] | undefined) => {
    if (!categories) return 'badge-neutral';

    for (const [_, category] of Object.entries(filterCategories)) {
      if (category.matchCategories.some(c => categories.includes(c)) &&
          (match.confidence ?? 1) >= category.minConfidence) {
        return `badge-${category.badgeColor}`;
      }
    }

    return 'badge-success';
  };

  const shouldShowWarning = () => {
    return Object.entries(filterCategories).some(([key, category]) => {
      if (!filters[key]) return false;
      return category.matchCategories.some(c =>
        match.categories?.includes(c) &&
        (match.confidence ?? 1) >= category.minConfidence
      );
    });
  };

  const isLowConfidence = match.confidence && match.confidence < 0.7;
  const isFuzzyMatch = match.confidence && match.confidence < 1;

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex items-center gap-2">
          {shouldShowWarning() && (
            <AlertTriangle className="text-warning" />
          )}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h4 className="card-title">
                {isFuzzyMatch ? (
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    Possible match: {match.name}
                  </span>
                ) : (
                  match.name
                )}
              </h4>
              {isLowConfidence && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <AlertCircle className="w-4 h-4" />
                  <span>Low confidence match</span>
                </div>
              )}
            </div>
            {isFuzzyMatch && (
              <p className="text-sm text-muted-foreground">
                We're {Math.round(match.confidence! * 100)}% confident this is {match.name}
              </p>
            )}
          </div>
        </div>
        <p>{match.details?.description}</p>
        <div className="flex flex-wrap gap-2">
          <div className={`badge ${getBadgeColor(match.categories)}`}>
            {match.categories?.join(', ') || 'Unknown'}
          </div>
          {match.confidence && match.confidence < 1 && (
            <div className={`badge ${isLowConfidence ? 'badge-warning' : 'badge-info'}`}>
              {Math.round(match.confidence * 100)}% confidence
            </div>
          )}
          {match.originalText && match.originalText !== match.name && (
            <div className="badge badge-outline">
              Original text: {match.originalText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
