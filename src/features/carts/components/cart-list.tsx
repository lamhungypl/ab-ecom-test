'use client';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import ImageWithFallback from '@/features/base/components/image-with-fallback';
import { Button } from '@/features/base/components/ui/button';
import { useGetCartQuery } from '@/features/carts/api/carts.query';
import { useCart } from '@/features/carts/hooks/use-cart';
import { getPath } from '@/features/common/utils/routers';

type Props = {};

const CartList = () => {
  const { data: cart } = useGetCartQuery();
  const { updating, updateQuantity, removeItem } = useCart();

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="">
        <ul className="-my-6 divide-y">
          {cart?.items.map((item) => (
            <li key={item.id} className="flex py-6">
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-secondary">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center"
                  fill
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium">
                    <h3>
                      <Link href={getPath('productDetails', item.id)}>{item.title}</Link>
                    </h3>
                    <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.farm} · {item.type}
                  </p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() =>
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        })
                      }
                      disabled={updating}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() =>
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      }
                      disabled={updating}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => removeItem({ id: item.id })}
                    disabled={updating}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartList;
