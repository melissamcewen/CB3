import Fuse from 'fuse.js';
import { AnalyzerConfig, AnalysisResult, IngredientMatch, Ingredient, CategoryGroups } from './types';

export class Analyzer {
  private ingredients: Record<string, Ingredient>;
  private categories: CategoryGroups;
  private config: { minConfidence: number; fuzzyMatch: boolean };
  private fuse: Fuse<[string, Ingredient]>;

  constructor(config: AnalyzerConfig) {
    this.ingredients = config.database.ingredients;
    this.categories = config.database.categories;
    this.config = {
      minConfidence: config.config?.minConfidence ?? 0.7,
      fuzzyMatch: config.config?.fuzzyMatch ?? true
    };

    // Initialize Fuse.js
    const fuseOptions = {
      threshold: 0.5,
      keys: [
        '0',                // ingredient key
        '1.name',          // ingredient name
        '1.category',      // ingredient categories
        '1.synonyms'       // ingredient synonyms
      ],
      includeScore: true
    };
    this.fuse = new Fuse(Object.entries(this.ingredients), fuseOptions);
  }

  analyzeIngredients(ingredientList: string): AnalysisResult {
    const ingredients = ingredientList
      .split(',')
      .flatMap(i => {
        // Check for parentheses and split into multiple ingredients
        const matches = i.match(/(.+?)\s*\((.+?)\)/);
        if (matches) {
          return [matches[1], matches[2]].map(part => part.trim());
        }
        return [i.trim()];
      })
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

    // Direct match
    const directMatch = Object.entries(this.ingredients)
      .find(([key, value]) => {
        // Check main key and synonyms
        if (key.toLowerCase() === normalized) return true;
        return value.synonyms?.some(syn => syn.toLowerCase() === normalized);
      });

    if (directMatch) {
      const [key, details] = directMatch;
      const matchedSynonym = details.synonyms?.find(syn => syn.toLowerCase() === normalized);
      return {
        ...details,
        name: ingredient,
        confidence: 1,
        matched: true,
        normalized,
        fuzzyMatch: false,
        categories: details.category,
        details,
        matchedSynonym: key.toLowerCase() === normalized ? key : matchedSynonym
      };
    }

    // Partial match - check if ingredient is part of a category, name, or synonyms
    const partialMatch = Object.entries(this.ingredients)
      .find(([key, value]) => {
        // Check if ingredient is part of a category
        const categoryMatch = value.category.some(c =>
          c.toLowerCase().includes(normalized)
        );
        // Check if ingredient is part of the name
        const nameMatch = value.name.toLowerCase().includes(normalized);
        // Check if ingredient is part of any synonym
        const synonymMatch = value.synonyms?.some(syn =>
          syn.toLowerCase().includes(normalized)
        );
        return categoryMatch || nameMatch || synonymMatch;
      });

    if (partialMatch) {
      const [_, details] = partialMatch;
      // Find the matching synonym if any
      const matchedSynonym = details.synonyms?.find(syn =>
        syn.toLowerCase().includes(normalized)
      );
      return {
        ...details,
        name: ingredient,
        confidence: 0.9,
        matched: true,
        normalized,
        fuzzyMatch: false,
        categories: details.category,
        details,
        matchedSynonym: matchedSynonym
      };
    }

    // Fuzzy match using Fuse.js
    const results = this.fuse.search(normalized);
    if (results.length > 0 && results[0].score && results[0].score < 0.7) {
      const [key, details] = results[0].item;
      return {
        ...details,
        name: ingredient,
        confidence: 1 - (results[0].score || 0),
        matched: true,
        normalized,
        fuzzyMatch: true,
        categories: details.category,
        details,
        matchedSynonym: undefined
      };
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

  findIngredientsByCategory(category: string): string[] {
    return Object.entries(this.ingredients)
      .filter(([_, ingredient]) => ingredient.category.includes(category))
      .map(([_, ingredient]) => ingredient.name);
  }
}
