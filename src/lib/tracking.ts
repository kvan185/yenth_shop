export type TrackingEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent({ action, category = 'engagement', label, value }: TrackingEvent) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: action,
    event_category: category,
    event_label: label,
    value,
  });

  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}
