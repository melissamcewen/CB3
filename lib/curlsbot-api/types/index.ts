export interface Ingredient {
  name: string;
  description: string;
  category: string[];
  notes?: string;
  source?: string[];
  synonyms?: string[];
  link?: string[];
}

export interface IngredientMatch {
  name: string;
  normalized: string;
  matched: boolean;
  details?: Ingredient;
  categories?: string[];
  fuzzyMatch?: boolean;
  confidence?: number;
  matchedSynonym?: string;
  link?: string;
}

export interface AnalysisResult {
  matches: IngredientMatch[];
  categories: string[];
}

export type IngredientAnalysisResult = AnalysisResult;

export interface IngredientDatabase {
  ingredients: Record<string, Ingredient>;
  categories: CategoryGroups;
}

export interface AnalyzerConfig {
  database: IngredientDatabase;
  fuzzyMatchThreshold?: number;
}

export interface Category {
  name: string;
  description: string;
  impact: 'good' | 'caution' | 'bad' | 'unknown' | 'neutral';
  notes?: string;
  source?: string[];
}

export interface CategoryGroup {
  name: string;
  description: string;
  categories: Record<string, Category>;
}

export type CategoryGroups = Record<string, CategoryGroup>;

