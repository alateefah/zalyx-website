import { useEffect, useRef, useState } from "react";
import { STORE_LINKS, openStore } from "../utils/constants";

export type AppEnv = "production" | "staging";

const SCHEMES: Record<AppEnv, string> = {
  production: "zalyxledger",
  staging: "zalyxledger-staging",
};

/**
 * Tries to open the app via deep link with the referral code.
 * If the app isn't installed, falls back to the app store.
 * The UI only shows if both attempts fail (e.g. desktop or blocked redirect).
 */
export default function ReferralRedirect({
  referralCode,
  appEnv = "production",
}: {
  referralCode: string;
  appEnv?: AppEnv;
}) {
  const [showFallback, setShowFallback] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);

    if (!isIOS && !isAndroid) {
      setShowFallback(true);
      return;
    }

    // Try to open the app via deep link (env-specific scheme)
    const scheme = SCHEMES[appEnv];
    const deepLink = `${scheme}://referral?code=${encodeURIComponent(referralCode)}`;
    window.location.href = deepLink;

    // After 1.5s, if still here (app not installed), go to store
    const storeTimeout = setTimeout(() => {
      if (isIOS) {
        openStore("apple", appEnv);
      } else {
        openStore("google", appEnv);
      }
    }, 1500);

    // After 3s, if still here (store redirect also blocked), show fallback
    const fallbackTimeout = setTimeout(() => {
      if (mountedRef.current) {
        setShowFallback(true);
      }
    }, 3000);

    return () => {
      mountedRef.current = false;
      clearTimeout(storeTimeout);
      clearTimeout(fallbackTimeout);
    };
  }, [referralCode, appEnv]);

  if (!showFallback) {
    return (
      <div className="min-h-screen bg-[#0b0d13] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#26C7C3]/30 border-t-[#26C7C3] rounded-full animate-spin" />
        {appEnv === "staging" && (
          <p className="absolute bottom-4 text-yellow-400 text-xs">STAGING</p>
        )}
      </div>
    );
  }

  // Fallback: only shows on desktop or if redirects were blocked
  return (
    <div className="min-h-screen bg-[#0b0d13] text-white flex flex-col items-center justify-center px-6">
      {appEnv === "staging" && (
        <span className="mb-4 px-3 py-1 bg-yellow-400/20 text-yellow-400 text-xs font-mono rounded">
          STAGING
        </span>
      )}
      <img src="/zalyx-logo.png" alt="Zalyx" className="h-10 w-auto mb-8" />
      <p className="text-gray-400 mb-2 text-center">
        You've been referred to Zalyx Ledger!
      </p>
      <p className="text-gray-500 text-sm mb-6 text-center">
        Download the app and enter code{" "}
        <span className="text-[#26C7C3] font-semibold">{referralCode}</span>{" "}
        during business setup.
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <a
          href={appEnv === "staging" ? STORE_LINKS.GOOGLE_PLAY_STAGING : STORE_LINKS.GOOGLE_PLAY}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white font-semibold"
          style={{ background: "linear-gradient(270deg, #26C7C3 0%, #8354AA 100%)" }}
        >
          Google Play
        </a>
        <a
          href={STORE_LINKS.APP_STORE}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white font-semibold border border-white/20 hover:bg-white/5 transition-all"
        >
          App Store
        </a>
      </div>
    </div>
  );
}
