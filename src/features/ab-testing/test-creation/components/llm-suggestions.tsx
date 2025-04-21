'use client';

import { SquarePlay } from 'lucide-react';
import { useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { GenerateTestCampaignResponse } from '@/features/ab-testing/test-creation/api/test-creation.types';
import LlmSuggestionsEmpty from '@/features/ab-testing/test-creation/components/llm-suggestions-empty';
import LlmSuggestionLoading from '@/features/ab-testing/test-creation/components/llm-suggestions-loading';
import { Button } from '@/features/base/components/ui/button';
import { Card, CardContent } from '@/features/base/components/ui/card';
import { toast } from '@/features/base/hooks/use-toast';

type Props = {
  loading?: boolean;
  suggestions: GenerateTestCampaignResponse;
};
export const LLMSuggestions = (props: Props) => {
  const { suggestions: data, loading: isLoading } = props;

  const methods = useFormContext();
  const { control, reset, getValues } = methods;

  const [selectedElement, pathname] = useWatch({
    control,
    name: ['selected_element', 'pathname'],
  });

  const handleApplySuggestion = useCallback((suggestion: GenerateTestCampaignResponse[number]) => {
    reset({ ...getValues(), ...suggestion });
  }, []);

  if (!selectedElement) {
    return <LlmSuggestionsEmpty />;
  }

  if (isLoading) {
    return <LlmSuggestionLoading />;
  }

  return (
    <div className="space-y-4">
      <div className="mb-4 rounded-md bg-muted/30 p-3">
        <p className="text-sm">
          <span className="font-medium">Selected element:</span> {selectedElement}
        </p>
      </div>

      {(Array.isArray(data) ? data : []).map((suggestion) => (
        <Card key={suggestion.id} className="overflow-hidden">
          <CardContent className="p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-sm">{suggestion.description || ''}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  title="Apply"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleApplySuggestion(suggestion)}
                >
                  <SquarePlay className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="pt-2 text-xs text-muted-foreground">
        <p>
          Suggestions are generated using AI based on e-commerce best practices and your store data.
        </p>
      </div>
    </div>
  );
};
