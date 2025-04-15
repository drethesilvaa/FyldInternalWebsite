"use client";
import { useHomeData } from "@/hooks/home/useHomeData";
import { Hero } from "../components/Hero";
import Navbar from "@/components/Navbar/Navbar";
import { RichTextBlock } from "@/components/RichTextBlock";
import { GridSection } from "@/components/GridSection";
import { Carousel } from "@/components/Carousel";
import { Cards } from "@/components/Cards";
import { Accordion } from "@/components/Accordion";

// Define types for component data
interface ComponentData {
  Content?: any[];
  Item?: any[];
  Cards?: any[];
  Imagem?: { url: string } | null;
  Slides?: number;
  Title?: string;
  Horizontal?: boolean;
}

type ComponentMapping = {
  [key: string]: React.ComponentType<any>; // Use `any` for generic component props
};

const componentMapping: ComponentMapping = {
  ComponentUiRichTextBlock: RichTextBlock,
  ComponentUiGridSection: GridSection,
  ComponentUiCarousel: Carousel,
  ComponentUiCards: Cards,
  ComponentUiAccordion: Accordion,
};

export const HomePage = () => {
  const { data: home, error, isLoading } = useHomeData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const renderComponent = (componentData: ComponentData, typename: string) => {
    const Component = componentMapping[typename];
    if (Component) {
      return <Component {...componentData} />;
    }
    return null;
  };

  return (
    <>
      <Hero
        videoUrl={home.VideoLink}
        bannerImage={home.placeholderImage}
        logo={home.FyldIcon}
      />
      <Navbar />

      {/* Render components conditionally */}
      {home.Empresa?.map((section: any) => (
        <div key={section.id}>
          {renderComponent(section, section.__typename)}
        </div>
      ))}

      {home.TyFyld?.map((section: any) => (
        <div key={section.id}>
          {section.Content && <RichTextBlock content={section.Content} />}
          {section.cardsItems && section.cardsItems.length > 0 && (
            <Cards items={section.cardsItems} />
          )}
        </div>
      ))}

      {home.ParteDaFyld?.map((section: any) => (
        <div key={section.id}>
          {section.Content && <RichTextBlock content={section.Content} />}
          {section.Slides && <Carousel items={section.Items} />}
        </div>
      ))}
    </>
  );
};
