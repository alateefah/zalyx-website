import { redirect } from 'next/navigation';

// Superseded by the single-page /careers redesign — role detail now expands
// inline in its card there instead of living at its own URL. Redirecting
// (not deleting the route) so old links/bookmarks land somewhere real.
export default function GrowthMarketingOfficerRedirect() {
  redirect('/careers');
}
