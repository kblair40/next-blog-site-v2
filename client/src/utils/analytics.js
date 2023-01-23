// Event Docs
// https://developers.google.com/analytics/devguides/collection/gtagjs/events#default_google_analytics_events

export const pageview = (url) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag("event", action, params);
};
