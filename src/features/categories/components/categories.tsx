import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { categories } from '@/app/api/categories/constants';
import { ResponseList } from '@/features/_api/api.types';
import { Category } from '@/features/categories/api/categories.types';
import { getPath } from '@/features/common/utils/routers';

type Props = {};

const mockCategories = {
  data: categories,
  meta: {},
} satisfies ResponseList<Category>;

const Categories = (props: Props) => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {mockCategories.data.map((category) => (
            <Link key={category.id} href={getPath('category', category.id)} className="group">
              <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-secondary transition-opacity group-hover:opacity-90">
                <Image
                  src={category.image || '/placeholder.svg'}
                  alt={category.name + category.id}
                  className="h-full w-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="text-center font-medium transition-colors group-hover:text-primary">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
