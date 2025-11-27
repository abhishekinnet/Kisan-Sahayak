
"use client";
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkDevice = () => {
        setIsMobile(window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT-1}px)`).matches);
    };

    // Initial check
    checkDevice();

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT-1}px)`);
    mediaQuery.addEventListener("change", checkDevice);

    // Cleanup listener
    return () => mediaQuery.removeEventListener("change", checkDevice);
  }, []);

  return isMobile
}
