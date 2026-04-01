/**
 * Amplitude analytics wrapper.
 *
 * Event structure:
 *   event: "click" | "view"
 *   params: { placement, element, name, step?, url }
 *
 * Examples:
 *   track("click", { placement: "landing", element: "button", name: "try_free" })
 *   track("view",  { element: "screen", name: "books" })
 *   track("view",  { element: "page", name: "landing" })
 */

type EventParams = Record<string, string | number | boolean | undefined>;

function getAmplitude(): { track: (event: string, props?: Record<string, unknown>) => void } | null {
  if (typeof window === "undefined") return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).amplitude ?? null;
}

function currentUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname + window.location.search;
}

export function track(event: string, params: EventParams = {}) {
  const amp = getAmplitude();
  if (!amp) return;

  const raw: Record<string, string | number | boolean> = { url: currentUrl() };
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined) raw[key] = val;
  }
  if (!raw.url && currentUrl()) raw.url = currentUrl();

  amp.track(event, raw);
}

/** Track a page/screen view */
export function trackView(name: string, extra: EventParams = {}) {
  track("view", { element: "screen", name, ...extra });
}

/** Track a page view (for landing/static pages) */
export function trackPageView(name: string, extra: EventParams = {}) {
  track("view", { element: "page", name, ...extra });
}

/** Track a click event */
export function trackClick(placement: string, element: string, name: string, extra: EventParams = {}) {
  track("click", { placement, element, name, ...extra });
}
