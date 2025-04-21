import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/features/base/components/ui/button';
import { Input } from '@/features/base/components/ui/input';

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-white"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className="text-xl font-bold">Local Harvest</span>
            </div>
            <p className="text-sm text-gray-600">
              Connecting you directly with local farmers and artisans. Fresh, sustainable, and
              community-driven.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-medium">Shop</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/category/produce" className="hover:text-primary">
                  Produce
                </Link>
              </li>
              <li>
                <Link href="/category/dairy-eggs" className="hover:text-primary">
                  Dairy & Eggs
                </Link>
              </li>
              <li>
                <Link href="/category/bakery" className="hover:text-primary">
                  Bakery
                </Link>
              </li>
              <li>
                <Link href="/category/meat" className="hover:text-primary">
                  Meat & Poultry
                </Link>
              </li>
              <li>
                <Link href="/category/preserves" className="hover:text-primary">
                  Honey & Preserves
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-medium">About</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/about" className="hover:text-primary">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/farmers" className="hover:text-primary">
                  Meet the Farmers
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-primary">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-medium">Newsletter</h3>
            <p className="mb-4 text-sm text-gray-600">
              Subscribe to get updates on new products, seasonal harvests, and special offers.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="border-0 bg-secondary" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-gray-600 md:flex-row">
          <p>© 2025 Local Harvest. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/shipping" className="hover:text-primary">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
