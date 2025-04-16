"use client";
import { usePages } from "@/providers/PagesProvider";
import Image from "next/image";

const NavbarLogo = () => {
  const { fyldIcon } = usePages();

  return (
    <a href="/" className="flex items-center justify-center">
      <img
        src={fyldIcon || ""}
        alt="Logo"
        className="h-10 w-auto lg:h-10 object-contain"
      />
    </a>
  );
};

export default NavbarLogo;
