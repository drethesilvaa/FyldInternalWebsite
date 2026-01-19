"use client";
import React, { useState } from "react";
import { useCurrentPage } from "@/hooks/useCurrentPage";
import { usePages, Page } from "@/providers/PagesProvider";
import Link from "next/link";
import { useResponsiveNavbarMenu } from "@/hooks/navbar/useResponsiveNavbarMenu";
import { motion } from "framer-motion";
import { itemVariants, listVariants } from "./constants";

const RenderMenu = ({
  parentPage,
  pages,
  currentPath = "",
  level = 0,
  openMenus,
  setOpenMenus,
}: {
  parentPage: Page | null;
  pages: Page[];
  currentPath?: string;
  level: number;
  openMenus: Record<number, string | null>;
  setOpenMenus: (value: Record<number, string | null>) => void;
}) => {
  const childPages = pages
    .filter((page) => page.ParentPage?.slug === parentPage?.slug)
    .sort((a, b) => a.Title.localeCompare(b.Title));

  const fullPath = currentPath
    ? `${currentPath}/${parentPage?.slug}`
    : parentPage?.slug;

  const isOpen = openMenus[level] === parentPage?.id;

  if (childPages.length === 0) {
    return (
      <motion.li key={parentPage!.id} variants={itemVariants}>
        <Link href={`/${fullPath}`} className="text-nowrap">
          {parentPage!.Title}
        </Link>
      </motion.li>
    );
  }

  return (
    <motion.li key={parentPage!.id} variants={itemVariants}>
      <details
        className="group"
        onToggle={(e) => {
          const newOpenMenus = { ...openMenus };

          if (e.currentTarget.open) {
            newOpenMenus[level] = parentPage!.id;
          } else {
            for (let i = level; i <= Object.keys(newOpenMenus).length; i++) {
              delete newOpenMenus[i];
            }
          }

          setOpenMenus(newOpenMenus);
        }}
      >
        <summary className="flex items-center justify-between cursor-pointer text-nowrap">
          <Link
            href={`/${fullPath}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1"
          >
            {parentPage!.Title}
          </Link>
        </summary>
        <ul className="menu bg-primary rounded-box z-50 mt-2">
          {childPages.map((page) => (
            <RenderMenu
              key={page.slug}
              parentPage={page}
              pages={pages}
              currentPath={fullPath}
              level={level + 1}
              openMenus={openMenus}
              setOpenMenus={setOpenMenus}
            />
          ))}
        </ul>
      </details>
    </motion.li>
  );
};

const NavbarMenu = () => {
  const { Pages: pages, isLoading: isLoadingNavbar } = usePages();
  const { isLandingPage, pathName } = useCurrentPage();

  const { isDesktop, containerRef, visibleItems, overflowItems } =
    useResponsiveNavbarMenu(pages, pathName);

  const [openMenus, setOpenMenus] = useState<Record<number, string | null>>({});

  if (isLoadingNavbar)
    return <div className="skeleton bg-primary h-14 w-full"></div>;

  const parentPages = pages?.filter((page) => page.ParentPage === null) || [];

  return (
    <nav className="bg-primary">
      <div className="custom-container">
        <motion.ul
          ref={containerRef}
          className={`menu ${
            isLandingPage ? "justify-around" : "justify-end"
          } w-full gap-4 text-base font-semibold font-header uppercase text-white lg:menu-horizontal`}
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          <motion.li key="home" variants={itemVariants}>
            <Link href="/">Home</Link>
          </motion.li>

          {isDesktop ? (
            <React.Fragment key="desktop">
              {[...visibleItems].sort((a, b) => a.Title.localeCompare(b.Title)).map((page) => (
                <RenderMenu
                  key={page.slug}
                  parentPage={page}
                  pages={pages || []}
                  currentPath="page"
                  level={0}
                  openMenus={openMenus}
                  setOpenMenus={setOpenMenus}
                />
              ))}

              {overflowItems.length > 0 && (
                <motion.li key="mais" variants={itemVariants}>
                  <details>
                    <summary className="text-nowrap">Mais</summary>
                    <ul className="absolute right-0 bg-primary menu rounded-box z-50">
                      {[...overflowItems].sort((a, b) => a.Title.localeCompare(b.Title)).map((page) => (
                        <RenderMenu
                          key={page.slug}
                          parentPage={page}
                          pages={pages || []}
                          currentPath="page"
                          level={0}
                          openMenus={openMenus}
                          setOpenMenus={setOpenMenus}
                        />
                      ))}
                    </ul>
                  </details>
                </motion.li>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment key="mobile">
              {[...parentPages].sort((a, b) => a.Title.localeCompare(b.Title)).map((page) => (
                <RenderMenu
                  key={page.slug}
                  parentPage={page}
                  pages={pages || []}
                  currentPath="page"
                  level={0}
                  openMenus={openMenus}
                  setOpenMenus={setOpenMenus}
                />
              ))}
            </React.Fragment>
          )}
        </motion.ul>
      </div>
    </nav>
  );
};
export default NavbarMenu;
