import { Loader2 } from 'lucide-react';
import React from 'react';

type Props = {};

const LlmSuggestionLoading = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">
        Analyzing element and generating suggestions...
      </p>
    </div>
  );
};

export default LlmSuggestionLoading;
