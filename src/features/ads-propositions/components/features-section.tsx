import { Award, Clock, Leaf, Truck } from 'lucide-react';
import React from 'react';

type Props = {};

const FeaturesSection = (props: Props) => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-secondary p-4">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">100% Organic</h3>
            <p className="text-gray-600">
              We prioritize organic farming practices that are better for you and the environment.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-secondary p-4">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Local Delivery</h3>
            <p className="text-gray-600">
              Fresh products delivered to your doorstep within 24 hours of harvest.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-secondary p-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Quality Guaranteed</h3>
            <p className="text-gray-600">
              We stand behind the quality of every product from our trusted farmers.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-secondary p-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Seasonal Freshness</h3>
            <p className="text-gray-600">
              We follow nature's calendar to bring you the freshest seasonal produce all year round.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
