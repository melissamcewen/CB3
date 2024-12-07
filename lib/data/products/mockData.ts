import { Product } from '../../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Almond Butter',
    description: 'Natural, no additives, perfect alternative to processed spreads',
    imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400',
    price: '$12.99',
    rating: 4.5,
    url: '#'
  },
  {
    id: '2',
    name: 'Natural Coconut Sugar',
    description: 'Low glycemic index alternative to refined sugar',
    imageUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400',
    price: '$8.99',
    rating: 4.2,
    url: '#'
  },
  {
    id: '3',
    name: 'Organic Maple Syrup',
    description: 'Pure, natural sweetener with no artificial ingredients',
    imageUrl: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400',
    price: '$15.99',
    rating: 4.8,
    url: '#'
  }
];
