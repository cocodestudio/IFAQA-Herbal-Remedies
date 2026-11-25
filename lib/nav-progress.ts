export const NAV_START_EVENT = 'ifaqa:nav-start';

/**
 * Triggers the global navigation progress indicator immediately
 * before programmatic redirects (router.push / router.replace).
 */
export function triggerNavigationProgress(targetHref?: string): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(NAV_START_EVENT, {
        detail: { href: targetHref || '' },
      })
    );
  }
}
