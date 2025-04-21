import { ResponseList } from '@/features/_api/api.types';
import { baseUrl } from '@/features/common/common.constants';
import { Product } from '@/features/products/api/products.type';

export const getFeaturedProducts = async () => {
  const res = (await fetch(`${baseUrl}/api/products`).then((res) =>
    res.json()
  )) as ResponseList<Product>;
  return res;
};
