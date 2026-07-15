"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import SiteHeader from "./SiteHeader";

type SiteChromeProps = {
  children: ReactNode;
};

export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const currentPath = pathname ?? "";
  const isGrammarRoute =
    currentPath === "/grammar" || currentPath.startsWith("/grammar/");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 820px)");

    function syncViewportMode() {
      setIsMobileViewport(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsHeaderCompact(false);
      }
    }

    syncViewportMode();
    mediaQuery.addEventListener("change", syncViewportMode);

    return () => {
      mediaQuery.removeEventListener("change", syncViewportMode);
    };
  }, []);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, left: 0 });
    window.scrollTo({ top: 0, left: 0 });
    lastScrollTopRef.current = 0;
    setIsHeaderCompact(false);
  }, [currentPath]);

  useEffect(() => {
    if (isMobileViewport) {
      setIsHeaderCompact(false);
      return;
    }

    const content = contentRef.current;

    if (!content) {
      return;
    }

    function handleScroll() {
      const nextScrollTop = content.scrollTop;
      const lastScrollTop = lastScrollTopRef.current;
      const delta = nextScrollTop - lastScrollTop;

      if (nextScrollTop < 24) {
        setIsHeaderCompact(false);
      } else if (delta > 8) {
        setIsHeaderCompact(true);
      } else if (delta < -8) {
        setIsHeaderCompact(false);
      }

      lastScrollTopRef.current = nextScrollTop;
    }

    content.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      content.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileViewport]);

  const shouldUseCompactHeader = isHeaderCompact && !isMobileViewport;

  return (
    <div
      className={`siteLayout ${shouldUseCompactHeader ? "siteLayoutCompactHeader" : ""} ${
        isGrammarRoute ? "siteLayoutGrammar" : ""
      }`}
    >
      <SiteHeader compact={shouldUseCompactHeader} />
      <div
        className={`siteContent ${isGrammarRoute ? "siteContentGrammar" : ""}`}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
}
