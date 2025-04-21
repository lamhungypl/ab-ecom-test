import { CheckIcon, CopyIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/features/base/components/ui/button';
import { Label } from '@/features/base/components/ui/label';

type Props = {};

const TestCreationSelectedElement = (props: Props) => {
  const methods = useFormContext();

  const { control } = methods;

  const [selected_element, pathname] = useWatch({
    control,
    name: ['selected_element', 'pathname'],
  });

  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [pathname]);

  return (
    <>
      <div className="space-y-2">
        <Label>Selected Element</Label>
        {selected_element ? (
          <div className="rounded-md bg-muted p-2 text-sm">
            <code>{selected_element}</code>
          </div>
        ) : (
          <div className="rounded-md bg-muted p-2 text-sm text-muted-foreground">
            No element selected. Click on an element in the preview.
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Pathname</Label>
        {pathname ? (
          <div className="relative rounded-md bg-muted p-2 text-sm">
            <code>{pathname}</code>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="absolute right-1 top-1 hover:bg-transparent"
            >
              {copied ? (
                <CheckIcon className="h-4 w-4 text-green-500" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        ) : (
          <div className="rounded-md bg-muted p-2 text-sm text-muted-foreground">No path.</div>
        )}
      </div>
    </>
  );
};

export default TestCreationSelectedElement;
