'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/tracking';

export function TrackingEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const trackedElement = target.closest<HTMLElement>('[data-track]');

      if (!trackedElement) {
        return;
      }

      trackEvent({
        action: trackedElement.dataset.track || 'cta_click',
        category: trackedElement.dataset.trackCategory || 'cta',
        label: trackedElement.dataset.trackLabel || trackedElement.textContent?.trim(),
      });
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
