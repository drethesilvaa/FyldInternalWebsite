"use client";
import { usepageData } from "@/hooks/pages/usePageData";
import { useRenderComponent } from "@/hooks/useRenderComponent";
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

  const renderComponent = (section: any, typename: any) =>
    useRenderComponent(section, typename);

  return (
    <PagesLayout>
      {page?.Content.map((section: any) => (
        <div key={section.id}>
          {renderComponent(section, section.__typename)}
        </div>
      ))}
      <div></div>
    </PagesLayout>
  );
}
