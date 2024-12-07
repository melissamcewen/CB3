import { filterCategories } from './config/categories';

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  rating: number;
  url: string;
}

export type FilterOptions = {
  [K in keyof typeof filterCategories]: boolean;
};


