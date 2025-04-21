export type CartItem = {
  farm?: string;
  id: string;
  image: string;
  price: number;
  quantity: number;
  title: string;
  type: 'Organic' | 'Conventional' | 'Local';
};

export type Cart = {
  id: string;
  items: CartItem[];
  payment?: string;
};

export type Order = {
  address: string;

  city: string;
  delivery_method: 'pickup' | 'delivery';
  email: string;
  // NOTE: Shipping information
  full_name: string;
  id: string;
  // NOTE: Redundant fields if a dedicated Order API exists, mark as optional for now
  items?: CartItem[];
  payment_method: string;
  shipping?: number;
  // END: Shipping

  state: string;
  status?: string;
  subtotal?: number;
  tax?: number;
  total?: number;
  zip_code: string;
  // END: Redundant fields
};

export type GetCartPayload = void;
export type GetCartResponse = Cart | null;

export type AddToCartPayload = {
  item: Omit<CartItem, 'quantity'>;
  quantity: number;
};
export type AddToCartResponse = {} & AddToCartPayload;

export type UpdateQuantityCartPayload = {
  id: string;
  quantity: number;
};
export type UpdateQuantityCartResponse = {} & UpdateQuantityCartPayload;

export type RemoveFromCartPayload = {
  id: string;
};
export type RemoveFromCartResponse = {};

export type ClearCartPayload = void;
export type ClearCartResponse = unknown;

export type SubmitOrderPayload = Omit<Order, 'id' | 'items'>;
export type SubmitOrderResponse = unknown;
