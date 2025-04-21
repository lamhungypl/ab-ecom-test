import { ResponseList } from '@/features/_api/api.types';
import { Product } from '@/features/products/api/products.type';

export type Category = {
  id: string;
  image?: string;
  name: string;
};
export type CategoryListFeaturedPayload = void;
export type CategoryListFeaturedResponse = ResponseList<Category>;

export type ProductsByCategoryPayload = { id: string };
export type ProductsByCategoryResponse = ResponseList<Product>;
