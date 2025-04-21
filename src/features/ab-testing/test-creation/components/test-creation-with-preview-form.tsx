'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles } from 'lucide-react';
import React, { useCallback, useId } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  useCreateTestCampaignMutation,
  useGenerateTestCampaignMutation,
} from '@/features/ab-testing/test-creation/api/test-creation.query';
import { LLMSuggestions } from '@/features/ab-testing/test-creation/components/llm-suggestions';
import { SitePreview } from '@/features/ab-testing/test-creation/components/site-preview';
import { TestCreationForm } from '@/features/ab-testing/test-creation/components/test-creation-form';
import { GENERATE_TEST_CAMPAIGN_KEY } from '@/features/ab-testing/test-creation/constants';
import {
  initialTestCreationValues,
  TestCreationFormValues,
  testCreationSchema,
} from '@/features/ab-testing/test-creation/utils';
import { Button } from '@/features/base/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/base/components/ui/card';
import { toast } from '@/features/base/hooks/use-toast';

type Props = {
  formId?: string;
};

const TestCreationWithPreviewForm = (props: Props) => {
  const { formId: _formId } = props;
  const id = useId();
  const formId = _formId || id;

  const { mutateAsync: createTestCampaign, isPending: isCreating } =
    useCreateTestCampaignMutation();

  const {
    mutateAsync: generateTestCampaign,
    data = [],
    isPending: isGeneratingIdeas,
  } = useGenerateTestCampaignMutation({
    mutationKey: [GENERATE_TEST_CAMPAIGN_KEY],
  });

  const methods = useForm({
    defaultValues: initialTestCreationValues,
    resolver: zodResolver(testCreationSchema),
  });

  const { handleSubmit, getValues } = methods;

  const handleGenerateIdeas = useCallback(async () => {
    try {
      const formValues = getValues();
      const selected_element = formValues.selected_element;
      const pathname = formValues.pathname;

      if (!selected_element || !pathname) {
        return;
      }
      await generateTestCampaign({
        target: formValues.selected_element,
        pathname: formValues.pathname,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSubmit = useCallback(async (values: TestCreationFormValues) => {
    try {
      await createTestCampaign(values);
      toast({
        title: 'Test created successfully',
        description: `Your A/B test "${values.test_name}" has been created and is ready to start.`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Server errors!`,
      });
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <form noValidate id={formId} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Create New A/B Test</CardTitle>
                <CardDescription>
                  Set up a new test by selecting elements and defining variations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TestCreationForm loading={isCreating} />
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>AI Test Suggestions</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateIdeas}
                    disabled={isGeneratingIdeas}
                  >
                    {isGeneratingIdeas ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Ideas
                      </>
                    )}
                  </Button>
                </div>
                <CardDescription>AI-powered suggestions for effective A/B tests</CardDescription>
              </CardHeader>
              <CardContent>
                <LLMSuggestions suggestions={data} loading={isGeneratingIdeas} />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Site Preview</CardTitle>
                <CardDescription>Click on elements to select them for testing</CardDescription>
              </CardHeader>
              <CardContent>
                <SitePreview />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default TestCreationWithPreviewForm;
