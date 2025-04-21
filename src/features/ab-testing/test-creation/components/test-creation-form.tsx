'use client';

import { Loader2 } from 'lucide-react';
import type React from 'react';
import { useFormContext } from 'react-hook-form';

import TestCreationSelectedElement from '@/features/ab-testing/test-creation/components/test-creation-selected-element';
import TestCreationVariations from '@/features/ab-testing/test-creation/components/test-creation-variations';
import { Button } from '@/features/base/components/ui/button';
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
import { Separator } from '@/features/base/components/ui/separator';
import { Textarea } from '@/features/base/components/ui/textarea';

type Props = {
  loading?: boolean;
};
export const TestCreationForm = (props: Props) => {
  const { loading } = props;
  const methods = useFormContext();
  const { control } = methods;

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="text-sm font-semibold">General:</div>
          <div className="space-y-4">
            <FormField
              control={control}
              name="test_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Product Pricing Test" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain the test campaign's intention briefly"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="test_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="test-type">
                        <SelectValue placeholder="Select test type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="content">Content Test</SelectItem>
                        <SelectItem value="pricing">Pricing Test</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <TestCreationSelectedElement />
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-sm font-semibold">Variants:</div>
          <TestCreationVariations />
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex justify-end">
        <Button type="submit" disabled={!!loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Test...
            </>
          ) : (
            'Create Test'
          )}
        </Button>
      </div>
    </>
  );
};
