"use client";

import { useEffect, useRef, useState } from "react";
import type { Page } from "@/providers/PagesProvider";

export function useResponsiveNavbarMenu(
  pages: Page[] | undefined,
  pathName: string
) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [visibleItems, setVisibleItems] = useState<Page[]>([]);
  const [overflowItems, setOverflowItems] = useState<Page[]>([]);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const updateMenuLayout = () => {
    const container = containerRef.current;
    if (!container || !pages) return;

    const parentPages = pages.filter((page) => page.ParentPage === null);
    const containerWidth = container.offsetWidth;

    const tempVisible: Page[] = [];
    const tempOverflow: Page[] = [];

    let usedWidth = 0;
    const tempEl = document.createElement("li");
    tempEl.style.position = "absolute";
    tempEl.style.visibility = "hidden";
    tempEl.className =
      "text-nowrap text-base font-header font-semibold uppercase px-4";
    document.body.appendChild(tempEl);

    for (let page of parentPages) {
      tempEl.innerText = page.Title || "";
      const itemWidth = tempEl.offsetWidth + 32;
      usedWidth += itemWidth;

      if (usedWidth < containerWidth - 120) {
        tempVisible.push(page);
      } else {
        tempOverflow.push(page);
      }
    }

    document.body.removeChild(tempEl);

    setVisibleItems(tempVisible);
    setOverflowItems(tempOverflow);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateDesktop = () => {
      setIsDesktop(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", updateDesktop);
    updateDesktop();

    return () => mediaQuery.removeEventListener("change", updateDesktop);
  }, []);

  useEffect(() => {
    if (!pages || !containerRef.current || !isDesktop) {
      setVisibleItems([]);
      setOverflowItems([]);
      return;
    }

    const timeout = setTimeout(() => {
      updateMenuLayout();
    }, 10);

    return () => clearTimeout(timeout);
  }, [pages, pathName, isDesktop]);

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.matchMedia("(min-width: 1024px)").matches;
      setIsDesktop(isNowDesktop);

      if (pages && pages.length > 0) {
        updateMenuLayout();
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pages]);

  return {
    isDesktop,
    containerRef,
    visibleItems,
    overflowItems,
  };
}
