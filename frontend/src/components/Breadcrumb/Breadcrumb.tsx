"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment.length > 0);

  // Filter out "page" for both display and href
  const filteredPathSegments = pathSegments;

  const breadcrumbs = filteredPathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");

    // Capitalize and format the label properly
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return { label, href };
  });

  return (
    <div className="text-sm breadcrumbs bg-[var(--color-secondary)]">
      <ul className="custom-container text-base">
        <li>
          <Link href="/">Home</Link>
        </li>
        {breadcrumbs
          .filter((b) => b.label.toLowerCase() !== "page")
          .map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={crumb.href}>
                <Link
                  href={crumb.href}
                  className={`${isLast ? "font-semibold" : ""}`}
                >
                  {crumb.label}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
