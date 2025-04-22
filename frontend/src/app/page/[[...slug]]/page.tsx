"use client";
import { usepageData } from "@/hooks/pages/usePageData";
import { useRenderComponent } from "@/hooks/useRenderComponent";
import PagesLayout from "@/layouts/PagesLayout";
import PagesLayoutSkeleton from "@/layouts/PagesLayoutSkeleton";
import { Fragment, use } from "react";

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
    <PagesLayout
      banner={page?.pageBanner}
      title={page?.Title}
      isLoading={isLoading}
    >
      {page?.Content.map((section: any) => (
        <Fragment key={section.id}>
          {renderComponent(section, section.__typename)}
        </Fragment>
      ))}
      <div></div>
    </PagesLayout>
  );
}
