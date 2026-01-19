import React from "react";
import { RichTextBlock } from "@/components/RichTextBlock";
import { GridSection } from "@/components/GridSection";
import { Carousel } from "@/components/Carousel";
import { Cards } from "@/components/Cards";
import { Accordion } from "@/components/Accordion";
import { Spacer } from "@/components/Spacer";
import { GroupLinks } from "@/components/GroupLinks";
import OrgTree from "@/components/OrgTree";
import { BentoGrid } from "@/components/BentoGrid";
import { ContactsCarrousel } from "@/components/ContactsCarrousel";

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
  "ui.rich-text-block": RichTextBlock,
  "ui.grid-section": GridSection,
  "ui.carousel": Carousel,
  "ui.cards": Cards,
  "ui.accordion": Accordion,
  "ui.spacer": Spacer,
  "ui.links-group": GroupLinks,
  "ui.tree": OrgTree,
  "ui.bento-grid": BentoGrid,
  "ui.contacts-carrousel": ContactsCarrousel,
};

export const useRenderComponent = (
  componentData: ComponentData,
  typename: string
) => {

  const Component = componentMapping[typename];

  console.log(componentData)

  if (Component) {
    return <Component {...componentData} />;
  }

  return null;
};
