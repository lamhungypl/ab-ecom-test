import FeaturesSection from '@/features/ads-propositions/components/features-section';
import NewsLetter from '@/features/ads-propositions/components/news-letter';
import Categories from '@/features/categories/components/categories';
import Hero from '@/features/home/components/hero';
import FeaturedProducts from '@/features/products/components/featured-products';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Categories />
      <FeaturesSection />
      <FeaturedProducts />
      <NewsLetter />
    </div>
  );
}
