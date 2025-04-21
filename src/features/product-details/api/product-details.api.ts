import { ResponseList } from '@/features/_api/api.types';
import { baseUrl } from '@/features/common/common.constants';
import {
  GetProductDetailsPayload,
  GetProductDetailsResponse,
} from '@/features/product-details/api/product-details.types';

export const getProductDetails = async (payload: GetProductDetailsPayload) => {
  const { id } = payload;
  const res = (await fetch(`${baseUrl}/api/products/${id}`).then((res) =>
    res.json()
  )) as GetProductDetailsResponse;
  return res;
};
