import { Product } from '@/lib/types';
import { Star } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="px-4 pt-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="rounded-xl h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-lg">{product.name}</h3>
        <p className="text-sm text-base-content/70">{product.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span className="ml-1">{product.rating}</span>
          </div>
          <span className="font-bold">{product.price}</span>
        </div>
        <div className="card-actions justify-end mt-4">
          <a href={product.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            View Product
          </a>
        </div>
      </div>
    </div>
  );
}