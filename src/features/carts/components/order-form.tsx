import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/features/base/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/features/base/components/ui/form';
import { Input } from '@/features/base/components/ui/input';
import { Label } from '@/features/base/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/features/base/components/ui/radio-group';
import { toast } from '@/features/base/hooks/use-toast';
import { useSubmitOrderMutation } from '@/features/carts/api/carts.query';

const schema = z.object({
  full_name: z.string(),
  email: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip_code: z.string(),
  payment_method: z.string(),
});

type FormValues = z.infer<typeof schema>;

type Props = {};

const OrderForm = (props: Props) => {
  const { mutateAsync: submitOrder, isPending } = useSubmitOrderMutation();
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      address: '',
      full_name: '',
      email: '',
      city: '',
      state: '',
      zip_code: '',
      payment_method: '',
    },
  });
  const { handleSubmit, control } = methods;

  const onSubmit = async (values: FormValues) => {
    try {
      await submitOrder({
        ...values,
        // NOTE: Redundant fields if a dedicated Order API exists, hardcode for now
        delivery_method: 'delivery',
      });

      toast({ variant: 'default', description: 'Submitted!' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {
          // eslint-disable-next-line no-constant-binary-expression
          'delivery' === 'delivery' && (
            <>
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIPCODE</FormLabel>
                      <FormControl>
                        <Input placeholder="ZIPCODE" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )
        }

        <FormField
          control={control}
          name="payment_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Methods</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full rounded-full" disabled={false}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Place Order'
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

export default OrderForm;
