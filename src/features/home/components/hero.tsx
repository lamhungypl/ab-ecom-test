import React from 'react';

import { Button } from '@/features/base/components/ui/button';
import { selectableElements } from '@/features/common/common.constants';

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="hero-pattern py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            <span data-testid={selectableElements.hero_headline.id}>Fresh from the Farm</span>
            <br />
            <span className="text-primary" data-testid={selectableElements.hero_sub_headline.id}>
              Straight to Your Table
            </span>
          </h1>
          <p
            className="mb-8 text-lg text-gray-700"
            data-testid={selectableElements.hero_paragraph.id}
          >
            Support local farmers and enjoy the freshest seasonal produce, artisanal goods, and
            farm-fresh products delivered directly to your door.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full" data-testid={selectableElements.cta_buy.id}>
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Meet Our Farmers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
