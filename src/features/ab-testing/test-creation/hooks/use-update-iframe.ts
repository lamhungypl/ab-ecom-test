import React, { Ref, RefObject, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { formatPricing } from '@/features/common/utils/currency';

type Props = {};

const useUpdateIframe = (iframeRef: RefObject<HTMLIFrameElement | null>) => {
  const methods = useFormContext();
  const { control } = methods;
  const [targetElementId, previewContent, testType, fixedPrice, pricingStrategy] = useWatch({
    control,
    name: ['selected_element', 'variant_b', 'test_type', 'fixed_price', 'pricing_strategy'],
  });

  useEffect(() => {
    const iframeDocument = iframeRef.current?.contentDocument;

    if (iframeDocument && previewContent !== undefined) {
      const elementToUpdate = iframeDocument.querySelector(`[data-testid="${targetElementId}"]`);

      if (elementToUpdate) {
        if (testType === 'content') {
          elementToUpdate.textContent = previewContent;
          if (elementToUpdate.tagName === 'INPUT' || elementToUpdate.tagName === 'TEXTAREA') {
            (elementToUpdate as HTMLInputElement | HTMLTextAreaElement).value = previewContent;
          }
        }
        if (
          (targetElementId as string).includes('price') &&
          testType === 'pricing' &&
          pricingStrategy === 'fixed'
        ) {
          elementToUpdate.textContent = formatPricing(Number(fixedPrice));
        }
      } else {
        console.debug(`[data-testid="${targetElementId}"]: not found in the iframe.`);
      }
    }
  }, [fixedPrice, iframeRef, previewContent, pricingStrategy, targetElementId, testType]);
};

export default useUpdateIframe;
