import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';
import { analyzeIngredientsApi, getProductRecommendations } from '@/lib/api';

// Mock the API functions
jest.mock('@/lib/api', () => ({
  analyzeIngredientsApi: jest.fn(),
  getProductRecommendations: jest.fn(),
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the ingredient analyzer form', () => {
    render(<Home />);
    
    expect(screen.getByText(/ingredient analyzer/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter ingredients/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /analyze ingredients/i })).toBeInTheDocument();
  });

  it('handles ingredient analysis submission', async () => {
    const mockAnalysisResults = [
      { ingredient: 'sugar', description: 'High in calories', safety: 'caution' as const },
    ];
    const mockProducts = [
      {
        id: '1',
        name: 'Natural Sweetener',
        description: 'Healthy alternative',
        imageUrl: 'test.jpg',
        price: '$9.99',
        rating: 4.5,
        url: '#',
      },
    ];

    (analyzeIngredientsApi as jest.Mock).mockResolvedValueOnce(mockAnalysisResults);
    (getProductRecommendations as jest.Mock).mockResolvedValueOnce(mockProducts);

    render(<Home />);
    
    const input = screen.getByPlaceholderText(/enter ingredients/i);
    await userEvent.type(input, 'sugar, salt');
    
    const button = screen.getByRole('button', { name: /analyze ingredients/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('sugar')).toBeInTheDocument();
      expect(screen.getByText('High in calories')).toBeInTheDocument();
      expect(screen.getByText('Natural Sweetener')).toBeInTheDocument();
    });
  });

  it('disables the analyze button when no ingredients are entered', () => {
    render(<Home />);
    
    const button = screen.getByRole('button', { name: /analyze ingredients/i });
    expect(button).toBeDisabled();
  });
});