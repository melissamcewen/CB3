import { analyzeIngredientsApi, getProductRecommendations } from '@/lib/api';
import { AnalysisResult } from '@/lib/types';

describe('API Functions', () => {
  const mockIngredients = ['sugar', 'salt', 'corn syrup'];
  const mockFilters = {
    allergens: true,
    additives: true,
    preservatives: true,
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('analyzeIngredientsApi', () => {
    it('should make a POST request to the correct endpoint', async () => {
      const mockResponse = { ok: true, json: () => Promise.resolve([]) };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await analyzeIngredientsApi(mockIngredients, mockFilters);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/analyze'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ingredients: mockIngredients, filters: mockFilters }),
        })
      );
    });

    it('should throw an error when the API request fails', async () => {
      const mockResponse = { ok: false };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(analyzeIngredientsApi(mockIngredients, mockFilters))
        .rejects
        .toThrow('Failed to analyze ingredients');
    });
  });

  describe('getProductRecommendations', () => {
    const mockResults: AnalysisResult[] = [
      { ingredient: 'sugar', description: 'test', safety: 'caution' },
    ];

    it('should make a POST request to the correct endpoint', async () => {
      const mockResponse = { ok: true, json: () => Promise.resolve([]) };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await getProductRecommendations(mockResults);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/recommendations'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ results: mockResults }),
        })
      );
    });

    it('should throw an error when the API request fails', async () => {
      const mockResponse = { ok: false };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(getProductRecommendations(mockResults))
        .rejects
        .toThrow('Failed to get product recommendations');
    });
  });
});