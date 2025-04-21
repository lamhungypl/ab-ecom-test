import { ResponseList } from '@/features/_api/api.types';
import {
  Category,
  CategoryListFeaturedPayload,
  CategoryListFeaturedResponse,
  ProductsByCategoryPayload,
  ProductsByCategoryResponse,
} from '@/features/categories/api/categories.types';
import { baseUrl } from '@/features/common/common.constants';
import { Product } from '@/features/products/api/products.type';

export const getFeaturedCategories = async (payload: CategoryListFeaturedPayload) => {
  const res = (await fetch(`${baseUrl}/api/categories`).then((res) =>
    res.json()
  )) as CategoryListFeaturedResponse;
  return res;
};

export const getCategoryDetails = async (id: string) => {
  const res = await fetch(`${baseUrl}/api/categories/${id}`).then((res) => res.json());
  return res;
};

export const getProductsByCategory = async (payload: ProductsByCategoryPayload) => {
  const res = (await fetch(`${baseUrl}/api/products`).then((res) =>
    res.json()
  )) as ProductsByCategoryResponse;
  return res;
};
