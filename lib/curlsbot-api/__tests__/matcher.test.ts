import { createMatcher } from '../utils/matcher';
import { ingredients } from '@/lib/data/ingredients';
import { categories } from '@/lib/data/categories';
import { AnalyzerConfig } from '../types';

describe('Ingredient Matcher', () => {
  const config: AnalyzerConfig = {
    database: {
      ingredients: ingredients,
      categories: categories
    },
  };

  const matcher = createMatcher(config);

  describe('exact matching', () => {
    test('matches exact ingredient names', () => {
      const result = matcher('Cetyl Alcohol');
      expect(result).toEqual({
        name: 'Cetyl Alcohol',
        normalized: 'cetyl alcohol',
        matched: true,
        details: expect.objectContaining({
          name: 'Cetyl Alcohol',
          category: ['fatty alcohol', 'emollient']
        }),
        categories: ['fatty alcohol', 'emollient']
      });
    });

    test('matches ingredient synonyms', () => {
      const result = matcher('SLES');
      expect(result).toEqual({
        name: 'SLES',
        normalized: 'sles',
        matched: true,
        details: expect.objectContaining({
          name: 'Sodium Laureth Sulfate',
          category: ['sulfate', 'harsh cleanser']
        }),
        categories: ['sulfate', 'harsh cleanser'],
        matchedSynonym: 'sles'
      });
    });

    test('is case insensitive', () => {
      const result = matcher('CETYL ALCOHOL');
      expect(result.matched).toBe(true);
      expect(result.categories).toContain('fatty alcohol');
    });
  });

  describe('fuzzy matching', () => {
    test('matches common misspellings', () => {
      const result = matcher('Cetearil Alcohol');
      expect(result).toEqual({
        name: 'Cetearil Alcohol',
        normalized: 'cetearil alcohol',
        matched: true,
        details: {
          name: 'Cetearyl Alcohol',
          description: "A blend of cetyl and stearyl alcohols. It's a fatty alcohol that helps stabilize formulations and provides conditioning.",
          category: ['fatty alcohol', 'emollient'],
          notes: "Commonly used in hair conditioners",
          synonyms: ["cetostearyl alcohol", "ceteryl alcohol", "cetyl stearyl alcohol"]
        },
        categories: ['fatty alcohol', 'emollient'],
        fuzzyMatch: true,
        confidence: expect.any(Number),
        matchedSynonym: undefined
      });
    });

    test ('matches poorly formatted ingredient', () => {
      const result = matcher('SD Alcohol 40-B (Alcohol Denat.)');
      expect(result.matched).toBe(true);
      expect(result.categories).toContain('drying alcohol');
      expect(result.details?.name).toBe('Alcohol Denat.');
    });

    test ('matches poorly formatted ingredient', () => {
      const result = matcher('denatured alcohol (sd alcohol 40)');
      expect(result.matched).toBe(true);
      expect(result.categories).toContain('drying alcohol');
      expect(result.details?.name).toBe('Alcohol Denat.');
    });

    test('does not match when confidence is too low', () => {
      const result = matcher('Completely Different Thing');
      expect(result).toEqual({
        name: 'Completely Different Thing',
        normalized: 'completely different thing',
        matched: false
      });
    });
  });

  describe('special cases', () => {
    test('handles empty input', () => {
      const result = matcher('');
      expect(result).toEqual({
        name: '',
        normalized: '',
        matched: false
      });
    });

    test('handles whitespace', () => {
      const result = matcher('  Cetyl   Alcohol  ');
      expect(result.matched).toBe(true);
      expect(result.categories).toContain('fatty alcohol');
    });
  });
});
