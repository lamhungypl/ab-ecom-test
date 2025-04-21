import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type Props = {};

const TestCreationTargeting = (props: Props) => {
  const methods = useFormContext();
  const { control } = methods;

  const [selected_element, pathname] = useWatch({
    control,
    name: ['selected_element', 'pathname'],
  });
  return <div>TestCreationTargeting</div>;
};

export default TestCreationTargeting;
