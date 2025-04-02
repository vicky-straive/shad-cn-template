"use client";

import * as React from "react";

export function useIsMobile() {
  // Changed from useMobile to useIsMobile
  // Initialize with undefined (not conditional)
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  // Use useEffect to update the state based on window size
  React.useEffect(() => {
    // Function to check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return isMobile;
}
