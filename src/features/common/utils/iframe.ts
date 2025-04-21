import { toast } from '@/features/base/hooks/use-toast';
import { selectableElements } from '@/features/common/common.constants';

export const addHighlighter = (iframe: HTMLIFrameElement) => {
  const iframeWindow = iframe.contentWindow;

  if (!iframeWindow) return;

  const style = iframeWindow.document.createElement('style');
  style.textContent = `
        .ab-test-highlight {
          outline: 3px dashed #3b82f6 !important;
          outline-offset: 2px !important;
          position: relative !important;
          cursor: pointer !important;
          transition: outline-color 0.2s ease !important;
        }
        .ab-test-highlight:hover {
          outline-color: #2563eb !important;
        }
        .ab-test-selected {
          outline: 3px solid #16a34a !important;
          outline-offset: 2px !important;
          position: relative !important;
        }
        .ab-test-badge {
          position: absolute !important;
          top: -10px !important;
          right: -10px !important;
          background: #16a34a !important;
          color: white !important;
          border-radius: 4px !important;
          padding: 2px !important;
          font-size: 8px !important;
          line-height:12px !important;
          font-weight: bold !important;
          z-index: 1000 !important;
          font-family: system-ui, -apple-system, sans-serif !important;
        }
      `;
  iframeWindow.document.head.appendChild(style);
};

export const setupIframeInteraction = (
  iframe: HTMLIFrameElement,
  callback: (elInfo: { id: string; pathname: string }) => void,
  renderedElementId?: Set<string>
) => {
  // if (!iframeRef.current) return;

  try {
    // const iframe = iframeRef.current;
    const iframeWindow = iframe.contentWindow;

    if (!iframeWindow) return;

    const selectableEls = Object.values(selectableElements)
      .map((testableEl) => {
        return [...iframeWindow.document.querySelectorAll(`[data-testid="${testableEl.id}"]`)];
      })
      .flat();

    selectableEls.forEach((element, index) => {
      const dataTestId = (element as HTMLElement).dataset.testid;

      if (!dataTestId) {
        return;
      }

      // if (renderedElementId) {
      //   if (renderedElementId.has(dataTestId)) {
      //     return;
      //   }
      //   renderedElementId.add(dataTestId);
      // }

      // Add highlight class
      element.classList.add('ab-test-highlight');

      // Add click handler
      element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Remove selected class from all elements
        selectableEls.forEach((el) => {
          el.classList.remove('ab-test-selected');
          const badge = el.querySelector('.ab-test-badge');
          if (badge) badge.remove();
        });

        // Add selected class to clicked element
        element.classList.add('ab-test-selected');
        // element.classList.remove('ab-test-highlight');

        // Add badge
        const badge = iframeWindow.document.createElement('span');
        badge.className = 'ab-test-badge';
        badge.textContent = 'Selected';
        element.appendChild(badge);

        callback({ id: dataTestId, pathname: iframeWindow.location.pathname });
      });
    });
  } catch (error) {
    console.error('Error setting up iframe interaction:', error);
    toast({
      title: 'Preview Error',
      description: 'Could not set up interactive preview. Try refreshing the page.',
      variant: 'destructive',
    });
  }
};
