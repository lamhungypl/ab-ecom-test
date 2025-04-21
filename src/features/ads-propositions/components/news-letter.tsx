import React from 'react';

import { Button } from '@/features/base/components/ui/button';
import { Input } from '@/features/base/components/ui/input';

type Props = {};

const NewsLetter = (props: Props) => {
  return (
    <section className="bg-primary py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold">Join Our Community</h2>
        <p className="mx-auto mb-8 max-w-2xl">
          Subscribe to our newsletter for seasonal recipes, farmer stories, and exclusive offers on
          the freshest local produce.
        </p>
        <div className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row">
          <Input
            type="email"
            placeholder="Your email address"
            className="border-0 bg-white/20 text-white placeholder:text-white/70"
          />
          <Button variant="secondary" className="whitespace-nowrap">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
