"use client";
import { useCurrentPage } from "@/hooks/useCurrentPage";
import { usePages, Page } from "@/providers/PagesProvider";
import Link from "next/link";
import { useResponsiveNavbarMenu } from "@/hooks/navbar/useResponsiveNavbarMenu";
import { motion } from "framer-motion";
import { itemVariants, listVariants } from "./constants";
import { useEffect } from "react";

const RenderMenu = ({
  parentPage,
  pages,
  currentPath = "",
}: {
  parentPage: Page | null;
  pages: Page[];
  currentPath?: string;
}) => {
  const childPages = pages.filter(
    (page) => page.ParentPage?.slug === parentPage?.slug
  );

  const fullPath = currentPath
    ? `${currentPath}/${parentPage?.slug}`
    : parentPage?.slug;

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
      <details className="group">
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
              key={page.id}
              parentPage={page}
              pages={pages}
              currentPath={fullPath}
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

  if (isLoadingNavbar) return <div className="skeleton  h-14 w-full"></div>;

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
          <motion.li variants={itemVariants}>
            <Link href="/">Home</Link>
          </motion.li>

          {isDesktop ? (
            <>
              {visibleItems.map((page) => (
                <RenderMenu
                  key={page.id}
                  parentPage={page}
                  pages={pages || []}
                  currentPath="page"
                />
              ))}

              {overflowItems.length > 0 && (
                <motion.li variants={itemVariants}>
                  <details>
                    <summary className="text-nowrap">Mais</summary>
                    <ul className="absolute right-0 bg-primary menu rounded-box z-50">
                      {overflowItems.map((page) => (
                        <RenderMenu
                          key={page.id}
                          parentPage={page}
                          pages={pages || []}
                          currentPath="page"
                        />
                      ))}
                    </ul>
                  </details>
                </motion.li>
              )}
            </>
          ) : (
            <>
              {parentPages.map((page) => (
                <RenderMenu
                  key={page.id}
                  parentPage={page}
                  pages={pages || []}
                  currentPath="page"
                />
              ))}
            </>
          )}
        </motion.ul>
      </div>
    </nav>
  );
};

export default NavbarMenu;
