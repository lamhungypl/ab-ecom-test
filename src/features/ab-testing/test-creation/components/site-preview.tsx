'use client';

import { Loader2, Maximize2, Minimize2, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import LlmSuggestionsAutoElements from '@/features/ab-testing/test-creation/components/llm-suggestions-auto-elements';
import useUpdateIframe from '@/features/ab-testing/test-creation/hooks/use-update-iframe';
import { Button } from '@/features/base/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/features/base/components/ui/tabs';
import { toast } from '@/features/base/hooks/use-toast';
import {
  EVENT_STORE_NAVIGATION_CHANGED,
  EVENT_TEST_ELEMENT_RENDERED,
  selectableIds,
} from '@/features/common/common.constants';
import { addHighlighter, setupIframeInteraction } from '@/features/common/utils/iframe';
import { getPath } from '@/features/common/utils/routers';

type SitePreviewProps = {};

type ViewMode = 'desktop' | 'mobile' | 'tablet';

export const SitePreview = (props: SitePreviewProps) => {
  const methods = useFormContext();
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [foundElements, setFoundElements] = useState(new Map<string, Element[]>());
  const hasRendered = useRef(new Set<string>());

  const { setValue } = methods;

  const onElementSelect = useCallback(
    (elementInfo: { id: string; pathname: string }) => {
      const { id: elementId, pathname } = elementInfo;
      setValue('selected_element', elementId);
      setValue('pathname', pathname);

      toast({
        title: 'Element selected',
        description: `Element "${elementId}" selected for A/B testing.`,
      });
    },
    [setValue]
  );

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);

    const iframe = iframeRef.current;
    if (!iframe) return;
    addHighlighter(iframe);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    if (iframeRef.current) {
      // eslint-disable-next-line no-self-assign
      iframeRef.current.src = iframeRef.current.src;
      hasRendered.current = new Set<string>();
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [isFullscreen]);

  useUpdateIframe(iframeRef);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const iframe = iframeRef?.current;

    const handleIframeMessage = (event: MessageEvent<any>) => {
      if (!iframe) return;
      if (event.data) {
        if (
          [EVENT_STORE_NAVIGATION_CHANGED, EVENT_TEST_ELEMENT_RENDERED].includes(event.data.type)
        ) {
          setupIframeInteraction(iframe, onElementSelect, hasRendered.current);

          const renderedData: { elementId: string } = event.data.data || {};
          selectableIds.forEach((testId) => {
            if (renderedData.elementId === testId) {
              const found = iframeRef.current?.contentDocument?.querySelectorAll(
                `[data-testid="${testId}"]`
              );
              if (found && found?.length > 0) {
                setFoundElements((prev) => {
                  return prev.set(testId, Array.from(found));
                });
              }
            }
          });
        }
      }
    };
    window.addEventListener('message', handleIframeMessage);

    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, [onElementSelect]);

  return (
    <div className="space-y-4 bg-white" ref={containerRef}>
      <div className="flex items-center justify-between">
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
          <TabsList>
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="tablet">Tablet</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-md border bg-background">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
            <div className="text-center">
              <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading preview...</p>
            </div>
          </div>
        )}

        <div
          className={`mx-auto w-full transition-all duration-300 ${viewMode === 'mobile' ? 'h-[600px] max-w-[375px]' : ''} ${viewMode === 'tablet' ? 'h-[768px] max-w-[768px]' : ''} ${viewMode === 'desktop' ? 'h-[600px]' : ''} `}
        >
          <iframe
            ref={iframeRef}
            src={getPath('home')}
            className="h-full w-full border-0"
            onLoad={handleIframeLoad}
          />
        </div>
      </div>

      <div className="rounded-md bg-muted/30 p-3">
        <p className="text-sm text-muted-foreground">
          <strong>Instructions:</strong> Click on any highlighted element in the preview to select
          it for A/B testing. Selected elements can be modified with different variations.
        </p>

        <LlmSuggestionsAutoElements
          elementIds={Array.from(foundElements.keys())}
          onElementSelect={(elId: string) => {
            onElementSelect({
              id: elId,
              pathname: iframeRef.current?.contentWindow?.location.pathname || '',
            });
          }}
        ></LlmSuggestionsAutoElements>
      </div>
    </div>
  );
};
