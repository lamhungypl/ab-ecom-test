'use client';

import { Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { AppLogoIcon } from '@/features/base/components/icons';
import { Badge } from '@/features/base/components/ui/badge';
import { Button } from '@/features/base/components/ui/button';
import { Input } from '@/features/base/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/features/base/components/ui/sheet';
import { useCart } from '@/features/carts/hooks/use-cart';
import { Category } from '@/features/categories/api/categories.types';
import { getPath } from '@/features/common/utils/routers';

type Props = {
  categories: Category[];
};
export function Header(props: Props) {
  const { categories } = props;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar with logo and icons */}
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-full bg-primary p-1">
            <AppLogoIcon />
          </div>
          <span className="text-xl font-bold">Local Harvest</span>
        </Link>

        {/* Desktop search */}
        <div className="mx-4 hidden max-w-md flex-1 items-center gap-2 md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="text"
              placeholder="Search for fresh local products..."
              className="w-full border-0 bg-secondary pl-10"
            />
          </div>
        </div>

        {/* Desktop navigation icons */}
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Heart className="h-5 w-5" />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Mobile icons */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="mt-8 flex flex-col gap-4">
                <Link
                  href="/"
                  className="rounded-md px-2 py-1 text-lg font-medium transition-colors hover:bg-secondary"
                >
                  Home
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={getPath('category', category.id)}
                    className="rounded-md px-2 py-1 transition-colors hover:bg-secondary"
                  >
                    {category.name}
                  </Link>
                ))}
                <div className="my-2 border-t pt-2">
                  <Link
                    href="/account"
                    className="flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-secondary"
                  >
                    <User className="h-4 w-4" /> My Account
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-secondary"
                  >
                    <Heart className="h-4 w-4" /> Wishlist
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile search bar */}
      {isSearchOpen && (
        <div className="px-4 pb-4 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="text"
              placeholder="Search for fresh local products..."
              className="w-full border-0 bg-secondary pl-10"
            />
          </div>
        </div>
      )}

      {/* Desktop category navigation */}
      <nav className="hidden border-t md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-8">
            <li>
              <Link href="/" className="inline-block py-3 font-medium hover:text-primary">
                Home
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={getPath('category', category.id)}
                  className="inline-block py-3 hover:text-primary"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
