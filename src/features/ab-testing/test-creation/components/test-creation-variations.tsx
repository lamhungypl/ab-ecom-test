import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TestCreationTypeContent from '@/features/ab-testing/test-creation/components/test-creation-type-content';
import TestCreationTypePricing from '@/features/ab-testing/test-creation/components/test-creation-type-pricing';

type Props = {};

const TestCreationVariations = (props: Props) => {
  const methods = useFormContext();
  const { control } = methods;
  const [test_type] = useWatch({ control, name: ['test_type'] });
  return test_type === 'pricing' ? <TestCreationTypePricing /> : <TestCreationTypeContent />;
};

export default TestCreationVariations;
