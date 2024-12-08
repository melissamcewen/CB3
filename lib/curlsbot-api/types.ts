export interface Ingredient {
  name: string;
  category: string[];
  description?: string;
  notes?: string;
  source?: string[];
  synonyms?: string[];
  link?: string[];
}

export interface IngredientMatch {
  name: string;
  normalized: string;
  matched: boolean;
  details: Ingredient | undefined;
  categories?: string[];
  fuzzyMatch?: boolean;
  confidence?: number;
  matchedSynonym?: string;
}

export interface AnalysisResult {
  matches: IngredientMatch[];
  categories: string[];
}

export interface CategoryGroup {
  name: string;
  description: string;
  categories: Record<string, {
    name: string;
    description: string;
    impact: string;
    notes: string;
  }>;
}

export type CategoryGroups = Record<string, CategoryGroup>;
