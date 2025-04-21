import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/features/base/components/ui/form';
import { Textarea } from '@/features/base/components/ui/textarea';

type Props = {};

const TestCreationTypeContent = (props: Props) => {
  const methods = useFormContext();
  const { control } = methods;
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="variant_a"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Variation A (Control)</FormLabel>
            <FormControl>
              <Textarea placeholder="Original content" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="variant_b"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Variation B (Test)</FormLabel>
            <FormControl>
              <Textarea placeholder="Alternative content" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TestCreationTypeContent;
