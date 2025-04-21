import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/features/base/components/ui/form';
import { Input } from '@/features/base/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/features/base/components/ui/select';
import { formatPricing } from '@/features/common/utils/currency';

type Props = {};

const TestCreationTypePricing = (props: Props) => {
  const methods = useFormContext();
  const { control } = methods;
  const [pricingStrategy] = useWatch({ control, name: ['pricing_strategy'] });

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="pricing_strategy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pricing Strategy</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="pricing-strategy">
                  <SelectValue placeholder="Select pricing strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage Discount</SelectItem>
                  <SelectItem value="fixed">Fixed Price</SelectItem>
                  <SelectItem value="free_shipping">Free Shipping</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {pricingStrategy === 'percentage' && (
        <FormField
          control={control}
          name="discount_percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount Percentage (%)</FormLabel>
              <FormControl>
                <Input type="number" min="1" max="100" {...field} />
              </FormControl>
              <FormMessage />

              <p className="text-sm text-muted-foreground">
                Variation A: Original price
                <br />
                Variation B: {field.value || 0}% discount on original price
              </p>
            </FormItem>
          )}
        />
      )}

      {pricingStrategy === 'fixed' && (
        <FormField
          control={control}
          name="fixed_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fixed Price ($)</FormLabel>
              <FormControl>
                <Input id="fixed-price" type="number" min="0" step="0.01" {...field} />
              </FormControl>

              <FormMessage />

              <p className="text-sm text-muted-foreground">
                Variation A: Original price
                <br />
                Variation B: Fixed price of {formatPricing(Number(field.value) || 0)}
              </p>
            </FormItem>
          )}
        />
      )}

      {pricingStrategy === 'free-shipping' && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Variation A: Standard shipping
            <br />
            Variation B: Free shipping
          </p>
        </div>
      )}
    </div>
  );
};

export default TestCreationTypePricing;
