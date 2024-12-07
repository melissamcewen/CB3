export interface Ingredient {
  name: string;
  category: string[];
  description?: string;
  notes?: string;
  source?: string[];
  synonyms?: string[];
  link?: string[];
}

export interface IngredientMatch extends Ingredient {
  confidence?: number;
  originalText?: string;
  matched: boolean;
  normalized: string;
  matchedSynonym?: string;
  categories?: string[];
}

export interface AnalysisResult {
  matches: IngredientMatch[];
  categories: string[];
}
