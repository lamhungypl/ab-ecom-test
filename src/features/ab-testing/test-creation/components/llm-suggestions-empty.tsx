import { Sparkles } from 'lucide-react';
import React from 'react';

type Props = {};

const LlmSuggestionsEmpty = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-muted/30 p-8 text-center">
      <Sparkles className="mb-3 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-2 text-lg font-medium">No Element Selected</h3>
      <p className="max-w-md text-sm text-muted-foreground">
        Select an element from the preview to get AI-powered test suggestions.
      </p>
    </div>
  );
};

export default LlmSuggestionsEmpty;
