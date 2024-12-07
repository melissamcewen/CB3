"use client";

import { useState } from 'react';
import { AnalysisResult } from 'haircare-ingredients-analyzer';
import { analyzeIngredients } from '@/lib/analyzer';
import { Product } from '@/lib/types';
import { IngredientInput } from '@/components/IngredientAnalyzer/IngredientInput';
import { FilterOptions } from '@/components/IngredientAnalyzer/FilterOptions';
import { IngredientResults } from '@/components/IngredientAnalyzer/IngredientResults';

export default function Home() {
  const [ingredients, setIngredients] = useState('');
  const [filters, setFilters] = useState({
    sulfate: true,
    'non-soluble silicone': true,
    'water-soluble silicone': true,
    'drying alcohol': true,
    'non-soluble wax': true,
  });
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  const handleAnalysis = () => {
    const analysis = analyzeIngredients(ingredients, filters);
    setResults(analysis);
    setRecommendations([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl mb-6">Ingredient Analyzer</h2>

          <IngredientInput
            value={ingredients}
            onChange={setIngredients}
          />

          <FilterOptions
            filters={filters}
            onChange={setFilters}
          />

          <button
            className="btn btn-primary"
            onClick={handleAnalysis}
            disabled={!ingredients.trim()}
          >
            Analyze Ingredients
          </button>

          {results && (
            <IngredientResults
              results={results}
              filters={filters}
              recommendations={recommendations}
            />
          )}
        </div>
      </div>
    </div>
  );
}
