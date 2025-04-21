import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

import { getPath } from '@/features/common/utils/routers';
import ProductDetails from '@/features/product-details/components/product-details';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <Link
          href={getPath('home')}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <ProductDetails productId={id} />
      </div>
    </div>
  );
}
