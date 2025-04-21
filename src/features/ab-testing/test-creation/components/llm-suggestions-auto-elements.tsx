import React from 'react';
import { useWatch } from 'react-hook-form';

import { getElementsInfo } from '@/features/ab-testing/test-creation/utils';
import { Badge } from '@/features/base/components/ui/badge';
import { Button } from '@/features/base/components/ui/button';

type Props = {
  children?: React.ReactNode;
  elementIds: string[];
  onElementSelect: (elId: string) => void;
};

const LlmSuggestionsAutoElements = (props: Props) => {
  const { elementIds, onElementSelect } = props;
  const selectedElement = useWatch({ name: 'selected_element' });
  return (
    <div className="mt-4 border-t pt-4">
      <p className="mb-2 text-sm font-medium">Or select an element from the list:</p>
      <div className="grid max-h-[200px] grid-cols-1 gap-2 overflow-y-auto pr-2">
        {elementIds.map(getElementsInfo).map((element) => (
          <Button
            key={element.id}
            variant={selectedElement === element.id ? 'default' : 'outline'}
            // variant={'outline'}
            size="sm"
            className="justify-start"
            onClick={() => onElementSelect(element.id)}
          >
            <span className="truncate">{element.name}</span>
            <Badge variant="outline" className="ml-auto">
              {element.type}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LlmSuggestionsAutoElements;
