"use client";
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
}

const PagesContext = createContext<PageContextType | undefined>(undefined);

interface PagesProviderProps {
  children: ReactNode;
}

export const PagesProvider = ({ children }: PagesProviderProps) => {
  const { data: pages, isLoading: isLoadingNavbar } = useNavbarData();

  return (
    <PagesContext.Provider
      value={{ Pages: pages || [], isLoading: isLoadingNavbar }}
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
