export const pathMap = {
  home: () => '/',
  category: (id: string) => `/category/${id}`,
  productDetails: (id: string) => `/product/${id}`,
  cart: () => '/cart',

  admin: () => '/admin',
  analytics: () => `${pathMap.admin()}/analytics`,
  abTesting: () => `${pathMap.analytics()}/ab-testing`,
} as const;

export type PathMap = typeof pathMap;
export type Pathname = keyof PathMap;

export const getPath = <TRoute extends keyof PathMap>(
  route: TRoute,
  ...params: Parameters<PathMap[TRoute]>
) => {
  const pathCb: (...args: any[]) => string = pathMap[route];
  return pathCb(...params);
};
