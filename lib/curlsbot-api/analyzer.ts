import { AnalyzerConfig, AnalysisResult, IngredientMatch, Ingredient, CategoryGroups } from './types';

export class Analyzer {
  private ingredients: Record<string, Ingredient>;
  private categories: CategoryGroups;
  private config: { minConfidence: number; fuzzyMatch: boolean };

  constructor(config: AnalyzerConfig) {
    this.ingredients = config.database.ingredients;
    this.categories = config.database.categories;
    this.config = {
      minConfidence: config.config?.minConfidence ?? 0.7,
      fuzzyMatch: config.config?.fuzzyMatch ?? true
    };
  }

  analyzeIngredients(ingredientList: string): AnalysisResult {
    const ingredients = ingredientList
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0);

    const matches = ingredients.map(ingredient => {
      const match = this.findMatch(ingredient);
      if (match) return match;

      // Return unmatched ingredient as a match with no categories
      return {
        name: ingredient,
        confidence: 0,
        matched: false,
        normalized: ingredient.toLowerCase(),
        fuzzyMatch: false,
        category: [],
        categories: [],
        details: undefined,
        matchedSynonym: undefined
      } as IngredientMatch;
    });

    const categories = this.extractCategories(matches);
    return { matches, categories };
  }

  private extractCategories(matches: IngredientMatch[]): string[] {
    const categories = new Set<string>();
    matches.forEach(match => {
      match.categories?.forEach(category => categories.add(category));
    });
    return Array.from(categories);
  }

  private findMatch(ingredient: string): IngredientMatch | null {
    const normalized = ingredient.trim().toLowerCase();

    // Direct match - search through all ingredients
    const directMatch = Object.entries(this.ingredients)
      .find(([key, value]) => {
        const keyMatch = key.toLowerCase() === normalized;
        const nameMatch = value.name.toLowerCase() === normalized;
        // Also check for compound names (e.g., "Cetyl Alcohol")
        const compoundMatch = key.toLowerCase().replace(/\s+/g, ' ') === normalized.replace(/\s+/g, ' ');
        return keyMatch || nameMatch || compoundMatch;
      });

    if (directMatch) {
      const [_, details] = directMatch;
      return {
        ...details,
        name: ingredient,
        confidence: 1,
        matched: true,
        normalized,
        fuzzyMatch: false,
        categories: details.category,
        details,
        matchedSynonym: undefined
      };
    }

    // Check synonyms
    for (const [name, details] of Object.entries(this.ingredients)) {
      const synonymMatch = details.synonyms?.find(s => s.toLowerCase() === normalized);
      if (synonymMatch) {
        return {
          ...details,
          name: details.name,
          confidence: 1,
          matched: true,
          normalized,
          fuzzyMatch: false,
          categories: details.category,
          details,
          matchedSynonym: normalized
        };
      }
    }

    // Fuzzy match
    let bestMatch: IngredientMatch | null = null;
    let highestConfidence = this.config.minConfidence;

    for (const [name, details] of Object.entries(this.ingredients)) {
      const confidence = this.calculateConfidence(normalized, name.toLowerCase());
      if (confidence > highestConfidence) {
        bestMatch = {
          ...details,
          name: ingredient,
          confidence,
          matched: true,
          normalized,
          fuzzyMatch: true,
          categories: details.category,
          details,
          matchedSynonym: undefined
        };
        highestConfidence = confidence;
      }
    }

    // Return unmatched ingredient
    return {
      name: ingredient,
      category: [],
      categories: [],
      confidence: 0,
      matched: false,
      normalized,
      fuzzyMatch: false,
      details: undefined,
      matchedSynonym: undefined
    } as IngredientMatch;
  }

  private calculateConfidence(input: string, target: string): number {
    const distance = this.levenshteinDistance(input, target);
    const maxLength = Math.max(input.length, target.length);
    return 1 - (distance / maxLength);
  }

  private levenshteinDistance(a: string, b: string): number {
    const matrix = Array(b.length + 1).fill(null).map(() =>
      Array(a.length + 1).fill(null)
    );

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + substitutionCost
        );
      }
    }

    return matrix[b.length][a.length];
  }

  findIngredientsByCategory(category: string): string[] {
    return Object.entries(this.ingredients)
      .filter(([_, ingredient]) => ingredient.category.includes(category))
      .map(([_, ingredient]) => ingredient.name);
  }
}
