/**
 * Store Links and External URLs
 * Centralized location for all app store and external links
 */

export const STORE_LINKS = {
  GOOGLE_PLAY: "https://play.google.com/store/apps/details?id=com.zalyx.ledger",
  GOOGLE_PLAY_STAGING: "https://play.google.com/store/apps/details?id=com.zalyx.ledger.staging",
  APP_STORE: "https://apps.apple.com/us/app/zalyx-ledger/id6756923647",
} as const;

export const SOCIAL_LINKS = {
  INSTAGRAM: "https://instagram.com/zalyx.io",
  LINKEDIN: "https://www.linkedin.com/company/zalyx-technologies/",
  TWITTER: "https://x.com/zalyx_io",
} as const;

export const CONTACT = {
  EMAIL: "support@zalyx.io",
  EMAIL_LINK: "mailto:support@zalyx.io",
} as const;

const PACKAGE_IDS = {
  production: "com.zalyx.ledger",
  staging: "com.zalyx.ledger.staging",
} as const;

/**
 * Helper function to open store (defaults to Play Store, with fallback to App Store)
 */
export const openStore = (store: "google" | "apple" = "google", env: "production" | "staging" = "production") => {
  const packageId = PACKAGE_IDS[env];
  const playUrl = `https://play.google.com/store/apps/details?id=${packageId}`;
  const url = store === "apple" ? STORE_LINKS.APP_STORE : playUrl;

  // Use intent URL for Android (bypasses in-app browser blocking)
  if (store === "google") {
    const intentUrl = `intent://details?id=${packageId}#Intent;scheme=market;action=android.intent.action.VIEW;package=com.android.vending;S.browser_fallback_url=${encodeURIComponent(url)};end`;
    window.location.href = intentUrl;
    return;
  }

  // For iOS, direct location change works better than window.open
  window.location.href = url;
};

/**
 * Helper function to get both store links as an array
 */
export const getAllStoreLinks = () =>
  [
    { name: "Play Store", url: STORE_LINKS.GOOGLE_PLAY },
    { name: "App Store", url: STORE_LINKS.APP_STORE },
  ] as const;
