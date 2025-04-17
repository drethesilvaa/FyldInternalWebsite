// Cards.tsx
"use client";
import { AspectRatio } from "@/data/AspectRatio";
import { RichTextBlock } from "./RichTextBlock";

interface CardsProps {
  Horizontal: boolean;
  colunas: number;
  cardsItems: {
    Content: string;
    Imagem: { url: string; alt: string } | null;
    aspectRatio: AspectRatio;
  }[];
  id: number;
}

const ratioClass: Record<AspectRatio, string> = {
  [AspectRatio.FiveByFour]: "aspect-[5/4]",
  [AspectRatio.FourByThree]: "aspect-[4/3]",
  [AspectRatio.OneByOne]: "aspect-square",
  [AspectRatio.ThreeByTwo]: "aspect-[3/2]",
  [AspectRatio.SixteenByNine]: "aspect-video",
  [AspectRatio.NineBySixteen]: "aspect-[9/16]",
  [AspectRatio.Cinema]: "aspect-[2.35/1]",
};

export const Cards = ({ Horizontal, colunas, cardsItems }: CardsProps) => {
  const colVariants: { [key: number]: string } = {
    1: "grid-cols-1 lg:grid-cols-1",
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 lg:grid-cols-3",
    4: "grid-cols-1 lg:grid-cols-4",
    5: "grid-cols-1 lg:grid-cols-5",
    6: "grid-cols-1 lg:grid-cols-6",
    7: "grid-cols-1 lg:grid-cols-7",
    8: "grid-cols-1 lg:grid-cols-8",
    9: "grid-cols-1 lg:grid-cols-9",
    10: "grid-cols-1 lg:grid-cols-10",
    11: "grid-cols-1 lg:grid-cols-11",
    12: "grid-cols-1 lg:grid-cols-12",
  };

  return (
    <div className={`grid gap-4 ${colVariants[colunas]} my-6 `}>
      {cardsItems.map((item, index) => (
        <div
          key={index}
          className={`card bg-base-100 shadow-sm ${
            Horizontal ? "md:card-side" : ""
          }`}
        >
          {/* 40% width on lg+, full width below */}
          <figure
            className={`
              ${ratioClass[item.aspectRatio]}
              w-full               
              ${Horizontal ? "md:w-2/5" : ""}  
            `}
          >
            <img
              className="object-cover w-full h-full"
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.Imagem?.url}`}
              alt={item.Imagem?.alt}
            />
          </figure>

          <div
            className={`
              card-body
              ${Horizontal ? "md:w-3/5" : ""}
            `}
          >
            <RichTextBlock content={item.Content} />
          </div>
        </div>
      ))}
    </div>
  );
};
