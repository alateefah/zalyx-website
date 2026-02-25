import { useEffect, useState } from "react";
import { openStore } from "../utils/constants";

/**
 * Tries to open the app via deep link with the referral code.
 * If the app isn't installed, falls back to the app store.
 * The UI only shows if both attempts fail (e.g. desktop or blocked redirect).
 */
export default function ReferralRedirect({ referralCode }: { referralCode: string }) {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);

    if (!isIOS && !isAndroid) {
      // Desktop — nothing to redirect to, show fallback
      setShowFallback(true);
      return;
    }

    // Try to open the app via deep link
    const deepLink = `zalyxledger://referral?code=${encodeURIComponent(referralCode)}`;
    window.location.href = deepLink;

    // After 1.5s, if still here (app not installed), go to store
    const timeout = setTimeout(() => {
      if (isIOS) {
        openStore("apple");
      } else {
        openStore("google");
      }
      // If store redirect also gets blocked, show fallback
      setTimeout(() => setShowFallback(true), 500);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [referralCode]);

  if (!showFallback) {
    return (
      <div className="min-h-screen bg-[#0b0d13] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#26C7C3]/30 border-t-[#26C7C3] rounded-full animate-spin" />
      </div>
    );
  }

  // Fallback: only shows on desktop or if redirects were blocked
  return (
    <div className="min-h-screen bg-[#0b0d13] text-white flex flex-col items-center justify-center px-6">
      <img src="/zalyx-logo.png" alt="Zalyx" className="h-10 w-auto mb-8" />
      <p className="text-gray-400 mb-6 text-center">
        Download Zalyx Ledger and your referral code{" "}
        <span className="text-[#26C7C3] font-semibold">{referralCode}</span>{" "}
        will be applied automatically.
      </p>
      <a
        href="/download"
        className="px-8 py-4 rounded-xl text-white font-semibold"
        style={{ background: "linear-gradient(270deg, #26C7C3 0%, #8354AA 100%)" }}
      >
        Download App
      </a>
    </div>
  );
}
