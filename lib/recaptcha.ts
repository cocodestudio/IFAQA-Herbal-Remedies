import { Auth, RecaptchaVerifier } from 'firebase/auth';
import type { MutableRefObject } from 'react';

/**
 * Safely disposes any existing Firebase RecaptchaVerifier instance and clears its host container DOM.
 */
export function clearRecaptchaSlot(
  containerId: string,
  recaptchaRef: MutableRefObject<RecaptchaVerifier | null>
): void {
  if (recaptchaRef.current) {
    try {
      recaptchaRef.current.clear();
    } catch {
      // Ignore cleanup errors if the widget was partially initialized or unmounted.
    }
    recaptchaRef.current = null;
  }
  const host = typeof document !== 'undefined' ? document.getElementById(containerId) : null;
  if (host) {
    host.innerHTML = '';
  }
}

/**
 * Creates a fresh invisible RecaptchaVerifier mounted inside a newly created child element
 * so retries, back-navigation, and OTP resends never trigger "reCAPTCHA has already been rendered in this element".
 */
export function createFreshRecaptcha(
  auth: Auth,
  containerId: string,
  recaptchaRef: MutableRefObject<RecaptchaVerifier | null>
): RecaptchaVerifier {
  clearRecaptchaSlot(containerId, recaptchaRef);
  const host = typeof document !== 'undefined' ? document.getElementById(containerId) : null;
  if (!host) {
    throw new Error(`Missing reCAPTCHA container #${containerId}`);
  }
  const freshSlot = document.createElement('div');
  host.appendChild(freshSlot);

  const verifier = new RecaptchaVerifier(auth, freshSlot, {
    size: 'invisible',
  });
  recaptchaRef.current = verifier;
  return verifier;
}
