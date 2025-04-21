import { z } from 'zod';

import {
  selectableElementsAdapter,
  selectableElementsState,
} from '@/features/common/common.constants';

export const getElementsInfo = (elId: string) => {
  const matchedElement = selectableElementsAdapter.selectById(selectableElementsState, elId);

  const elementInfo = {
    id: elId,
    name: matchedElement?.description || '',
    type: matchedElement?.id.includes('price') ? 'price' : 'content',
  };
  return elementInfo;
};

export type TestType = 'content' | 'pricing';

export const testCreationSchema = z.object({
  test_name: z.string(),
  description: z.string().optional(),
  selected_element: z.string(),
  pathname: z.string(),
  test_type: z.string(),
  // TODO: Dynamic refine based on test_type
  variant_a: z.string().optional().nullable(),
  variant_b: z.string().optional().nullable(),
  pricing_strategy: z.string().optional().nullable(),
  discount_percentage: z.number().optional().nullable(),
  fixed_price: z.number().optional().nullable(),
});

export type TestCreationFormValues = z.infer<typeof testCreationSchema>;

export const initialTestCreationValues: TestCreationFormValues = {
  test_name: '',
  selected_element: '',
  pathname: '',
  test_type: '',
  variant_a: '',
  variant_b: '',
};
