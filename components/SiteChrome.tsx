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
  const currentPath = pathname ?? "";

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, left: 0 });
    lastScrollTopRef.current = 0;
    setIsHeaderCompact(false);
  }, [currentPath]);

  useEffect(() => {
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
  }, []);

  return (
    <div className={`siteLayout ${isHeaderCompact ? "siteLayoutCompactHeader" : ""}`}>
      <SiteHeader compact={isHeaderCompact} />
      <div className="siteContent" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
