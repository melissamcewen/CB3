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
