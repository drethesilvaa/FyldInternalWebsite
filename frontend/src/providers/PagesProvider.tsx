"use client";
import { Footer, useFooterData } from "@/hooks/footer/useFooterData";
import { useNavbarData } from "@/hooks/navbar/useNavbarData";
import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Page {
  id: string;
  Title: string;
  slug: string;
  ParentPage: { Title: string; slug: string } | null;
}

interface PageContextType {
  Pages: Page[];
  isLoading: boolean;
  footer: Footer | null;
  isLoadingFooter: boolean;
  fyldIcon: string;
}

const PagesContext = createContext<PageContextType | undefined>(undefined);

interface PagesProviderProps {
  children: ReactNode;
}

export const PagesProvider = ({ children }: PagesProviderProps) => {
  const { data: pages, isLoading: isLoadingNavbar } = useNavbarData();
  const { data: footer, isLoading: isLoadingFooter } = useFooterData();

  return (
    <PagesContext.Provider
      value={{
        Pages: pages?.pages || [],
        isLoading: isLoadingNavbar,
        footer: footer || null,
        isLoadingFooter,
        fyldIcon:
          `${process.env.NEXT_PUBLIC_STRAPI_URL}${pages?.home.FyldIcon?.url}` ||
          "",
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};

export const usePages = () => {
  const context = useContext(PagesContext);
  if (!context) {
    throw new Error("usePages must be used within a PagesProvider");
  }
  return context;
};
