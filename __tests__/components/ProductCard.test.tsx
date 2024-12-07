import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    imageUrl: 'https://test.com/image.jpg',
    price: '$9.99',
    rating: 4.5,
    url: 'https://test.com/product',
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.price)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.rating.toString())).toBeInTheDocument();
    
    const image = screen.getByAltText(mockProduct.name) as HTMLImageElement;
    expect(image.src).toBe(mockProduct.imageUrl);
    
    const link = screen.getByRole('link', { name: /view product/i });
    expect(link).toHaveAttribute('href', mockProduct.url);
  });
});