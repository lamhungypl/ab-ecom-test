'use client';

import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { sleep as delay } from '@/features/_api/mock';
import {
  AddToCartPayload,
  AddToCartResponse,
  Cart,
  GetCartPayload,
  GetCartResponse,
  Order,
  RemoveFromCartPayload,
  RemoveFromCartResponse,
  SubmitOrderPayload,
  SubmitOrderResponse,
  UpdateQuantityCartPayload,
  UpdateQuantityCartResponse,
} from '@/features/carts/api/carts.types';
import { CartItem } from '@/features/carts/hooks/use-cart';
import { EntityState } from '@/features/common/common.types';
import { uniqArray } from '@/features/common/utils/array';
import { createEntityAdapter } from '@/features/common/utils/entities';

const CART_KEY = 'cart';
const ORDER_KEY = 'orders';

const cartSchema = z.object({
  id: z.string().optional(),
  payment: z.string().optional(),
  items: z.array(z.record(z.any())),
});

type Values = z.infer<typeof cartSchema>;

const createCart = (payload: Partial<Cart>) => {
  if (typeof window === 'undefined') return null;

  const id = uuidv4();
  const newCart = {
    ...payload,
    id,
    items: payload.items || [],
  } satisfies Partial<Cart> as Cart;
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
};

const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

function getCartDetails(): GetCartResponse {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(CART_KEY);
  const cartData = data ? JSON.parse(data) : {};
  const parsedData = cartSchema.safeParse(cartData);
  return parsedData.success ? (parsedData.data as NonNullable<GetCartResponse>) : null;
}

const cartItemAdapter = createEntityAdapter<CartItem>();

const initialCartItemState = cartItemAdapter.getInitialState();

export const getCurrentCartItemState = (): EntityState<CartItem> | null => {
  try {
    const cart = getCartDetails();
    if (cart) {
      const items: CartItem[] = cart.items;
      const initState = { ...initialCartItemState };

      items.forEach((cartItem) => {
        if (cartItem && cartItem.id) {
          initState.entities[cartItem.id] = cartItem;
          initState.ids = uniqArray(initState.ids.concat(cartItem.id));
        }
      });
      return initState;
    }
    return null;
  } catch (error) {
    return null;
  }
};

function setCartItems(items: CartItem[]) {
  if (typeof window !== 'undefined') {
    const cart = getCartDetails();
    const newCart = {
      ...cart,
      items: items,
    } satisfies Partial<GetCartResponse> as GetCartResponse;
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  }
}

function getOrderList(): Order[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(ORDER_KEY);
  return data ? JSON.parse(data) : [];
}

function setOrderList(orders: Order[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
  }
}

export const cartApi = {
  getCart: async (payload: GetCartPayload): Promise<GetCartResponse> => {
    await delay(300);
    return getCartDetails();
  },

  addToCart: async (payload: AddToCartPayload): Promise<AddToCartResponse> => {
    const { item, quantity } = payload;
    await delay(300);
    const cart = getCartDetails();

    if (!cart) {
      createCart({ items: [{ ...item, quantity }] });
      return payload;
    }

    const state = getCurrentCartItemState() || initialCartItemState;
    const matchedItem = cartItemAdapter.selectById(state, item.id);
    const nextQuantity = matchedItem ? matchedItem.quantity + quantity : quantity;

    const newState = cartItemAdapter.upsertOne(state, {
      ...item,
      quantity: nextQuantity,
    });
    const newItems = cartItemAdapter.selectAll(newState);

    setCartItems(newItems);

    return { ...payload, quantity: nextQuantity };
  },

  updateQuantity: async (
    payload: UpdateQuantityCartPayload
  ): Promise<UpdateQuantityCartResponse> => {
    const { id, quantity } = payload;
    await delay(200);

    const state = getCurrentCartItemState() || initialCartItemState;
    const newState = cartItemAdapter.updateOne(state, {
      id: id,
      changes: {
        quantity: quantity,
      },
    });

    const newItems = cartItemAdapter.selectAll(newState);

    setCartItems(newItems);
    return { id, quantity };
  },

  removeFromCart: async (payload: RemoveFromCartPayload): Promise<RemoveFromCartResponse> => {
    const { id } = payload;
    await delay(200);

    const state = getCurrentCartItemState() || initialCartItemState;
    const newState = cartItemAdapter.removeOne(state, id);

    const newItems = cartItemAdapter.selectAll(newState);
    setCartItems(newItems);

    return {};
  },

  clearCart: async (): Promise<CartItem[]> => {
    await delay(200);
    clearCart();
    return [];
  },

  submitOrder: async (payload: SubmitOrderPayload): Promise<SubmitOrderResponse> => {
    await delay(800);
    const cart = getCartDetails();

    if (cart?.items.length === 0) throw new Error('Cannot submit empty order');

    const orderId = uuidv4();
    const newOrder: Order = {
      ...payload,
      items: cart?.items || [],
      status: 'SUBMITTED',
      id: orderId,
    };

    const orders = getOrderList();

    setOrderList([...orders, newOrder]);
    clearCart();

    return { success: true, orderId };
  },

  getOrders: async (): Promise<Order[]> => {
    await delay(300);
    return getOrderList();
  },
};
