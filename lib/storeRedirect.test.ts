import { describe, it, expect } from 'vitest';
import { storeDestination } from './storeRedirect';
import { STORE_LINKS } from '@/src/utils/constants';

// Real user-agent strings, because that is what this function actually sees.
const IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
const IPAD =
  'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
const ANDROID =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
const MAC =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

describe('storeDestination', () => {
  it('sends iPhone and iPad to the App Store', () => {
    expect(storeDestination(IPHONE)).toBe(STORE_LINKS.APP_STORE);
    expect(storeDestination(IPAD)).toBe(STORE_LINKS.APP_STORE);
  });

  it('sends Android to Google Play', () => {
    expect(storeDestination(ANDROID)).toBe(STORE_LINKS.GOOGLE_PLAY);
  });

  it('sends desktop to the products section of the home page', () => {
    // Nothing to install on a laptop; show them what the app is instead.
    expect(storeDestination(MAC)).toBe('/#products');
  });

  it('falls back to the products section when there is no user agent', () => {
    // curl, link checkers, and anything that strips the header.
    expect(storeDestination(null)).toBe('/#products');
    expect(storeDestination('')).toBe('/#products');
  });

  it('is case insensitive', () => {
    expect(storeDestination(IPHONE.toUpperCase())).toBe(STORE_LINKS.APP_STORE);
  });
});
