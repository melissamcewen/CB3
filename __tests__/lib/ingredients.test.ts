import { ingredients } from '@/lib/data/ingredients';

describe('ingredients database', () => {
  it('should have sulfates properly categorized', () => {
    const sulfates = Object.values(ingredients).filter(
      ingredient => ingredient.categories?.includes('sulfate')
    );

    expect(sulfates).toContain(
      expect.objectContaining({
        name: 'sodium lauryl sulfate',
        categories: expect.arrayContaining(['sulfate'])
      })
    );
  });

  it('should have silicones properly categorized', () => {
    const silicones = Object.values(ingredients).filter(
      ingredient => ingredient.categories?.includes('non-soluble silicone')
    );

    expect(silicones).toContain(
      expect.objectContaining({
        name: 'dimethicone',
        categories: expect.arrayContaining(['non-soluble silicone'])
      })
    );
  });

  it('should have drying alcohols properly categorized', () => {
    const dryingAlcohols = Object.values(ingredients).filter(
      ingredient => ingredient.categories?.includes('drying alcohol')
    );

    expect(dryingAlcohols).toContain(
      expect.objectContaining({
        name: 'alcohol denat.',
        categories: expect.arrayContaining(['drying alcohol'])
      })
    );
  });

  it('should have ingredients with descriptions', () => {
    const ingredientsWithDescriptions = Object.values(ingredients).filter(
      ingredient => ingredient.details?.description
    );

    expect(ingredientsWithDescriptions.length).toBeGreaterThan(0);
    expect(ingredientsWithDescriptions[0].details?.description).toBeTruthy();
  });
});
