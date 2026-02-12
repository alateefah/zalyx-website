import { useEffect } from "react";
import { openStore } from "../utils/constants";

export default function DownloadRedirect() {
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("iphone") || ua.includes("ipad")) {
      openStore("apple");
    } else if (ua.includes("android")) {
      openStore("google");
    } else {
      window.location.href = "/#products";
    }
  }, []);

  return null;
}