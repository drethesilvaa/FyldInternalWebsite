"use client";
import { usepageData } from "@/hooks/pages/usePageData";
import PagesLayout from "@/layouts/PagesLayout";
import { use } from "react";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const { data: page, error, isLoading } = usepageData(slug[slug.length - 1]);

  return (
    <PagesLayout>
      <div></div>
    </PagesLayout>
  );
}
