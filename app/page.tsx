"use client";

import { useState } from 'react';
import { analyzeIngredients, AnalysisResult } from '@/lib/curlsbot-api';
import { ingredients } from '@/lib/data/ingredients';
import { categories } from '@/lib/data/categories';
import { Product } from '@/lib/types';
import { IngredientInput } from '@/components/IngredientAnalyzer/IngredientInput';
import { FilterOptions } from '@/components/IngredientAnalyzer/FilterOptions';
import { IngredientResults } from '@/components/IngredientAnalyzer/IngredientResults';
import { createInitialFilters, mapFiltersToApi } from '@/lib/config/categories';

export default function Home() {
  const [ingredientList, setIngredientList] = useState('');
  const [filters, setFilters] = useState(createInitialFilters());
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  const handleAnalysis = () => {
    const analysis = analyzeIngredients(
      ingredientList,
      mapFiltersToApi(filters),
      ingredients,
      categories
    );
    setResults(analysis);
    setRecommendations([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl mb-6">Ingredient Analyzer</h2>

          <IngredientInput
            value={ingredientList}
            onChange={setIngredientList}
          />

          <FilterOptions
            filters={mapFiltersToApi(filters)}
            onChange={newFilters => setFilters(createInitialFilters())}
          />

          <button
            className="btn btn-primary"
            onClick={handleAnalysis}
            disabled={!ingredientList.trim()}
          >
            Analyze Ingredients
          </button>

          {results && (
            <IngredientResults
              results={results}
              filters={mapFiltersToApi(filters)}
              recommendations={recommendations}
            />
          )}
        </div>
      </div>
    </div>
  );
}
