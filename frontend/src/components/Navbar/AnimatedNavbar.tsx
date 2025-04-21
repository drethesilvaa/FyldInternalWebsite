  "use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarShell from "./NavbarShell";

export default function AnimatedNavbar() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setIsAtTop(window.scrollY === 0);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-primary">
      <NavbarShell />
    </div>
  );
}
