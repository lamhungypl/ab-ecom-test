import { PagePagination, PageParams, ResponseList } from '@/features/_api/api.types';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const mockGeneric =
  <T>(data: T) =>
  async () => {
    await sleep(1000);
    return Promise.resolve(data);
  };

export const mockList =
  <T>(data: T[]) =>
  async (pageParams?: PageParams): Promise<ResponseList<T>> => {
    const perPage = pageParams?.size || 10;

    await sleep(300);

    const meta = {
      total_elements: data.length,
      page: pageParams?.page,
    } satisfies PagePagination;
    return Promise.resolve({
      data: data.slice(perPage),
      meta: meta,
    });
  };

export const mockGetDetails =
  <T extends { id: string }>(data: T[]) =>
  async (id: string) => {
    await sleep(200);
    return Promise.resolve(data.find((item) => item.id === id));
  };
