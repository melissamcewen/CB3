import { analyzeIngredients } from '@/lib/analyzer';
import { FilterOptions } from '@/lib/types';

describe('analyzeIngredients', () => {
  const defaultFilters: FilterOptions = {
    sulfate: true,
    'non-soluble silicone': true,
    'water-soluble silicone': true,
    'drying alcohol': true,
    'non-soluble wax': true,
  };

  it('should identify sulfates in ingredients list', () => {
    const ingredients = 'water, sodium lauryl sulfate, fragrance';
    const result = analyzeIngredients(ingredients, defaultFilters);

    expect(result.matches).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'sodium lauryl sulfate',
          categories: expect.arrayContaining(['sulfate'])
        })
      ])
    );
  });

  it('should identify silicones in ingredients list', () => {
    const ingredients = 'water, dimethicone, cyclomethicone';
    const result = analyzeIngredients(ingredients, defaultFilters);

    expect(result.matches).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'dimethicone',
          categories: expect.arrayContaining(['non-soluble silicone'])
        })
      ])
    );
  });

  it('should identify drying alcohols in ingredients list', () => {
    const ingredients = 'water, alcohol denat., fragrance';
    const result = analyzeIngredients(ingredients, defaultFilters);

    expect(result.matches).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'alcohol denat.',
          categories: expect.arrayContaining(['drying alcohol'])
        })
      ])
    );
  });

  it('should handle empty ingredients list', () => {
    const ingredients = '';
    const result = analyzeIngredients(ingredients, defaultFilters);

    expect(result.matches).toHaveLength(0);
  });

  it('should handle ingredients list with no matches', () => {
    const ingredients = 'water, glycerin, aloe vera';
    const result = analyzeIngredients(ingredients, defaultFilters);

    expect(result.matches.filter(m =>
      m.categories?.some(c => Object.keys(defaultFilters).includes(c))
    )).toHaveLength(0);
  });

  it('should respect filter settings', () => {
    const ingredients = 'water, sodium lauryl sulfate, dimethicone';
    const filters: FilterOptions = {
      ...defaultFilters,
      sulfate: false,
      'non-soluble silicone': false,
      'water-soluble silicone': false,
      'drying alcohol': true,
      'non-soluble wax': true,
    };

    const result = analyzeIngredients(ingredients, filters);

    // Should still identify ingredients but respect filter settings
    expect(result.matches).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'sodium lauryl sulfate',
          categories: expect.arrayContaining(['sulfate'])
        }),
        expect.objectContaining({
          name: 'dimethicone',
          categories: expect.arrayContaining(['non-soluble silicone'])
        })
      ])
    );
  });

  it('should handle ingredients with multiple categories', () => {
    const ingredients = 'water, sodium laureth sulfate';
    const result = analyzeIngredients(ingredients, defaultFilters);

    const sulfateMatch = result.matches.find(m => m.name === 'sodium laureth sulfate');
    expect(sulfateMatch?.categories).toEqual(
      expect.arrayContaining(['sulfate', 'cleanser'])
    );
  });

  it('should normalize ingredient names', () => {
    const ingredients = 'SODIUM LAURYL SULFATE, Dimethicone';
    const result = analyzeIngredients(ingredients, defaultFilters);

    expect(result.matches).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'sodium lauryl sulfate',
          categories: expect.arrayContaining(['sulfate'])
        })
      ])
    );
  });
});
