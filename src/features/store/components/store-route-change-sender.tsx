'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import {
  EVENT_STORE_NAVIGATION_CHANGED,
  EVENT_TEST_ELEMENT_RENDERED,
  selectableIds,
  selectableTargetElSelectors,
} from '@/features/common/common.constants';

const inIframe = typeof window !== 'undefined' && window.location !== window.parent.location;

const sendMessageToParent = (type: string, data: unknown) => {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: type, data }, '*');
  }
};

const StoreRouteChangeSender = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasRendered = useRef(new Set());

  useEffect(() => {
    if (!inIframe) return;

    const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    sendMessageToParent(EVENT_STORE_NAVIGATION_CHANGED, { url: currentUrl });
    hasRendered.current = new Set();

    const observer = new MutationObserver((mutationsList, observer) => {
      selectableIds.forEach((testId) => {
        if (!hasRendered.current.has(testId)) {
          const element = document.querySelector(`[data-testid="${testId}"]`);
          if (element) {
            hasRendered.current.add(testId);
            sendMessageToParent(EVENT_TEST_ELEMENT_RENDERED, {
              elementId: testId,
            });
            if (hasRendered.current.size === selectableTargetElSelectors.length) {
              observer.disconnect();
            }
          }
        }
      });
    });

    const targetNode = document.body;
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }

    const checkInitialElements = () => {
      selectableIds.forEach((testId) => {
        if (
          !hasRendered.current.has(testId) &&
          document.querySelector(`[data-testid="${testId}"]`)
        ) {
          hasRendered.current.add(testId);
          sendMessageToParent(EVENT_TEST_ELEMENT_RENDERED, {
            elementId: testId,
          });
        }
      });
      if (observer && hasRendered.current.size === selectableTargetElSelectors.length) {
        observer.disconnect();
      }
    };
    checkInitialElements();

    return () => {
      observer.disconnect();
    };
  }, [pathname, searchParams]);

  useEffect(() => {}, []);

  return null;
};

export default StoreRouteChangeSender;
