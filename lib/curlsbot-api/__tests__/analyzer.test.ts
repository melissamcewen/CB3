import { Analyzer } from '../analyzer';
import { ingredients } from '@/lib/data/ingredients';
import { categories } from '@/lib/data/categories';

describe('Analyzer', () => {
  const analyzer = new Analyzer({
    database: {
      ingredients,
      categories
    }
  });

  describe('analyzeIngredients', () => {
    test('analyzes single ingredient correctly', () => {
      const results = analyzer.analyzeIngredients('Cetyl Alcohol');
      expect(results.matches[0].matched).toBe(true);
      expect(results.matches[0].categories).toContain('fatty alcohol');
      expect(results.categories).toContain('fatty alcohol');
    });

    test('analyzes multiple ingredients correctly', () => {
      const results = analyzer.analyzeIngredients('Cetyl Alcohol, Isopropyl Alcohol');
      expect(results.matches).toHaveLength(2);
      expect(results.categories).toContain('fatty alcohol');
      expect(results.categories).toContain('drying alcohol');
    });

    test('handles ingredients with similar names correctly', () => {
      const results = analyzer.analyzeIngredients('potassium sorbate');
      // should match potassium sorbate
      expect(results.matches[0].matched).toBe(true);
      expect(results.matches[0].name).toBe('potassium sorbate');
    });

    test('handles ingredients with similar names correctly', () => {
      const results = analyzer.analyzeIngredients('Potassium Hydrate');
      // should match potassium hydrate
      expect(results.matches[0].matched).toBe(true);
      expect(results.matches[0].matchedSynonym).toBe('potassium hydrate');
    });


    test('handles unknown ingredients', () => {
      const results = analyzer.analyzeIngredients('Unknown Ingredient');
      expect(results.matches[0].matched).toBe(false);
      expect(results.matches[0].name).toBe('Unknown Ingredient');
      expect(results.matches[0].details).toBeUndefined();
      expect(results.categories).toHaveLength(0);
    });

    test('handles partial matches', () => {
      const results = analyzer.analyzeIngredients('sulfate, wax');
      expect(results.matches[0].matched).toBe(true);
      expect(results.matches[1].matched).toBe(true);
      expect(results.categories).toContain('sulfate');
      expect(results.categories).toEqual(
        expect.arrayContaining([
          expect.stringContaining('wax')
        ])
      );
    });

    test('handles empty input', () => {
      const results = analyzer.analyzeIngredients('');
      expect(results.matches).toHaveLength(0);
      expect(results.categories).toHaveLength(0);
    });

    test('handles whitespace and formatting', () => {
      const results = analyzer.analyzeIngredients('  Cetyl   Alcohol  ,  Isopropyl   Alcohol  ');
      expect(results.matches).toHaveLength(2);
      expect(results.matches[0].matched).toBe(true);
      expect(results.matches[1].matched).toBe(true);
    });
  });

  describe('findIngredientsByCategory', () => {
    test('finds ingredients by category', () => {
      const fattyAlcohols = analyzer.findIngredientsByCategory('fatty alcohol');
      expect(fattyAlcohols).toContain('Cetyl Alcohol');

      const dryingAlcohols = analyzer.findIngredientsByCategory('drying alcohol');
      expect(dryingAlcohols).toContain('Isopropyl Alcohol');
    });

    test('returns empty array for unknown category', () => {
      const results = analyzer.findIngredientsByCategory('non-existent category');
      expect(results).toEqual([]);
    });
  });



  describe('complex ingredient lists', () => {
    test('analyzes shampoo ingredients correctly', () => {
      const list = "Water, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Cetyl Alcohol";
      const results = analyzer.analyzeIngredients(list);

      expect(results.matches).toHaveLength(4);
      expect(results.categories).toContain('sulfate');
      expect(results.categories).toContain('gentle cleanser');
      expect(results.categories).toContain('fatty alcohol');
    });

    test('analyze a complex shampoo', () => {
      const list = "Disodium Laureth Sulfosuccinate, Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Cocamidopropyl Hydroxysultaine, PEG-12 Dimethicone, Cocamide MIPA, Glycol Distearate,  Panthenol, Polyquaternium-11, DMDM Hydantoin, Sodium Chloride, Cetyl Alcohol, Guar Hydroxypropyltrimonium Chloride, PEG-14M";
      const results = analyzer.analyzeIngredients(list);
      expect(results.categories).toContain('sulfate');
      expect(results.categories).toContain('gentle cleanser');
      expect(results.categories).toContain('fatty alcohol');
      expect(results.categories).toContain('water-soluble silicone');
      // check that peg-12 dimethicone is matched
      expect(results.matches.find(m => m.name === 'PEG-12 Dimethicone')).not.toBeUndefined();
    });

    test('analyze a complex hair gel', () => {
      const list = "PEG/PPG-25/25 Dimethicone, PEG-10 Dimethicone, PEG-4 Dilaurate, PEG-4 Laurate, PEG-4, Phenoxyethanol, Phenylpropanol, Propanediol, Benzyl Alcohol";
      const results = analyzer.analyzeIngredients(list);
      expect(results.categories).toContain('water-soluble silicone');
      expect(results.categories).toContain('preservative alcohol');
      // check that PEG-25 dimethicone is matched
      expect(results.matches.find(m => m.name === 'PEG/PPG-25/25 Dimethicone')).not.toBeUndefined();
      // check that benzyl alcohol is matched
      expect(results.matches.find(m => m.name === 'Benzyl Alcohol')).not.toBeUndefined();
      // check that propanediol is matched
      expect(results.matches.find(m => m.name === 'Propanediol')).not.toBeUndefined();
    });

    test ('detect alcohol in a complex ingredient list', () => {
      const list = "SD Alcohol 40-B (Alcohol Denat.), denatured alcohol (sd alcohol 40)";
      const results = analyzer.analyzeIngredients(list);
      expect(results.categories).toContain('drying alcohol');
      expect(results.matches.find(m => m.name === 'alcohol denat')).not.toBeUndefined();
    });

    test('handles ingredient synonyms', () => {
      const list = "SLES, CAPB, Hexadecan-1-ol";
      const results = analyzer.analyzeIngredients(list);

      expect(results.matches[0].matchedSynonym).toBe('SLES');
      expect(results.matches[1].matchedSynonym).toBe('CAPB');
      expect(results.matches[2].matchedSynonym).toBe('hexadecan-1-ol');
    });
  });
});
