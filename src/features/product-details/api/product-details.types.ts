import { Product } from '@/features/products/api/products.type';

export interface ProductDetails extends Product {
  description: string;
  discount?: number;
  id: string;
  images: string[];
  ingredients: string[];
  nutritionalInfo: {
    calories: number;
    carbs: string;
    fat: string;
    protein: string;
  };
  price: number;
  title: string;
}

export type GetProductDetailsPayload = { id: string };
export type GetProductDetailsResponse = ProductDetails;
