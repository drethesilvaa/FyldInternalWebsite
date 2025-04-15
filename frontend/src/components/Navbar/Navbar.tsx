"use client";
import { Page, usePages } from "@/providers/PagesProvider";
import Link from "next/link";

const RenderMenu = ({
  parentPage,
  pages,
  currentPath = "",
}: {
  parentPage: Page | null;
  pages: Page[];
  currentPath?: string;
}) => {
  const childPages = pages?.filter(
    (page) => page.ParentPage?.slug === parentPage?.slug
  );

  const fullPath = currentPath
    ? `${currentPath}/${parentPage?.slug}`
    : parentPage?.slug;

  if (childPages.length === 0) {
    return (
      <li key={parentPage?.id}>
        <Link href={`/${fullPath}`}>{parentPage?.Title}</Link>
      </li>
    );
  }

  return (
    <li key={parentPage?.id}>
      <details>
        <summary className="text-nowrap">{parentPage?.Title}</summary>

        <ul className="menu bg-primary rounded-box">
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
    </li>
  );
};

const Navbar = () => {
  const { Pages: pages, isLoading: isLoadingNavbar } = usePages();

  if (isLoadingNavbar) return <p>Loading</p>;

  const parentPages = pages?.filter((page) => page.ParentPage === null) || [];

  return (
    <nav className="bg-primary">
      <div className="custom-container">
        <ul className="menu justify-around w-full gap-4 text-base font-semibold font-header uppercase text-white lg:menu-horizontal">
          <li>
            <Link href="/">Home</Link>
          </li>

          {parentPages.map((parentPage) => (
            <RenderMenu
              key={parentPage.id}
              parentPage={parentPage}
              pages={pages || []}
              currentPath="page"
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
