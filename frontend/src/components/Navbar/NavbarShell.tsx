"use client";
import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";
import { useCurrentPage } from "@/hooks/useCurrentPage";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function NavbarShell({ className = "", children }: Props) {
  const { isLandingPage } = useCurrentPage();

  return (
    <div
      className={`flex justify-between items-center custom-container ${className}`}
    >
      {/* Logo */}
      {!isLandingPage && (
        <div className="flex items-center z-20">
          <NavbarLogo />
        </div>
      )}

      {/* Mobile */}
      <div className={`flex lg:hidden items-center gap-2 px-4 py-2 z-20 `}>
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-secondary btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>

      {/* Desktop */}
      <div className={`hidden lg:flex flex-col gap-2 w-full z-20`}>
        <NavbarMenu />
      </div>

      {children}
    </div>
  );
}
