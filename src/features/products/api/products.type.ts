export type Product = {
  category: string;
  description: string;
  farm: string;
  featured?: boolean;
  id: string;
  image: string;
  images: string[];
  inStock: boolean;
  price: number;
  salePrice?: number;
  title: string;
  type: 'Organic' | 'Conventional' | 'Local';
  unit: string;
};
