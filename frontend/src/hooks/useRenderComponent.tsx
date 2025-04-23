import React from "react";
import { RichTextBlock } from "@/components/RichTextBlock";
import { GridSection } from "@/components/GridSection";
import { Carousel } from "@/components/Carousel";
import { Cards } from "@/components/Cards";
import { Accordion } from "@/components/Accordion";
import { Spacer } from "@/components/Spacer";

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
  [key: string]: React.ComponentType<any>;
};

const componentMapping: ComponentMapping = {
  ComponentUiRichTextBlock: RichTextBlock,
  ComponentUiGridSection: GridSection,
  ComponentUiCarousel: Carousel,
  ComponentUiCards: Cards,
  ComponentUiAccordion: Accordion,
  ComponentUiSpacer: Spacer,
};

export const useRenderComponent = (
  componentData: ComponentData,
  typename: string
) => {
  const Component = componentMapping[typename];

  if (Component) {
    return <Component {...componentData} />;
  }

  return null;
};
