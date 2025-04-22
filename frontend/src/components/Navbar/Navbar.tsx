"use client";

import { NavbarProps } from "./types";
import AnimatedNavbar from "./AnimatedNavbar";
import NavbarMenu from "./NavbarMenu";

export const Navbar = ({ children }: NavbarProps) => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <AnimatedNavbar />
        {children}
      </div>
      <div className="drawer-side z-20">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-primary min-h-full w-80 p-4 overflow-auto ">
          <NavbarMenu />
        </ul>
      </div>
    </div>
  );
};
