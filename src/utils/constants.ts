/**
 * Store Links and External URLs
 * Centralized location for all app store and external links
 */

export const STORE_LINKS = {
  GOOGLE_PLAY: "https://play.google.com/store/apps/details?id=com.zalyx.ledger",
  APP_STORE: "https://apps.apple.com/app/zalyx-ledger/id6670925674",
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

/**
 * Helper function to open store (defaults to Play Store, with fallback to App Store)
 */
export const openStore = (store: "google" | "apple" = "google") => {
  const url = store === "apple" ? STORE_LINKS.APP_STORE : STORE_LINKS.GOOGLE_PLAY;
  window.open(url, "_blank");
};

/**
 * Helper function to get both store links as an array
 */
export const getAllStoreLinks = () => [
  { name: "Play Store", url: STORE_LINKS.GOOGLE_PLAY },
  { name: "App Store", url: STORE_LINKS.APP_STORE },
] as const;