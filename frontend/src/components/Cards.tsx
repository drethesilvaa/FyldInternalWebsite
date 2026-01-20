// Cards.tsx
"use client";
import { AspectRatio } from "@/data/AspectRatio";
import { RichTextBlock } from "./RichTextBlock";
import { motion } from "framer-motion";
import { strapiUrl } from "@/data/strapiUrl";
import { optimizeImage } from "@/util/optimizeImage";

export interface CardsProps {
  Horizontal: boolean;
  colunas: number;
  padding: PaddingSize;
  Items: {
    Content: string;
    Imagem: { url: string; alt: string } | null;
    aspectRatio: AspectRatio;
  }[];
  id: number;
}

type PaddingSize =
  | "px12"
  | "px16"
  | "px24"
  | "px32"
  | "px48"
  | "px64"
  | "px96"
  | "px128";

const paddingMap: Record<PaddingSize, string> = {
  px12: "lg:px-3",
  px16: "lg:px-4",
  px24: "lg:px-6",
  px32: "lg:px-8",
  px48: "lg:px-12",
  px64: "lg:px-16",
  px96: "lg:px-24",
  px128: "lg:px-32",
};

export const ratioClass: Record<AspectRatio, string> = {
  [AspectRatio.FiveByFour]: "aspect-[5/4]",
  [AspectRatio.FourByThree]: "aspect-[4/3]",
  [AspectRatio.OneByOne]: "aspect-square",
  [AspectRatio.ThreeByTwo]: "aspect-[3/2]",
  [AspectRatio.SixteenByNine]: "aspect-video",
  [AspectRatio.NineBySixteen]: "aspect-[9/16]",
  [AspectRatio.Cinema]: "aspect-[2.35/1]",
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.1,
    },
  }),
};

export const Cards = ({
  Horizontal,
  colunas,
  padding,
  Items,
}: CardsProps) => {
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

  console.log(ratioClass)

  return (
    <div
      className={`grid gap-4 ${colVariants[colunas]} ${
        padding ? paddingMap[padding] : ""
      } my-6`}
    >
      {Items.map((item, index) => (
        <motion.div
          key={index}
          className={`card bg-base-100 shadow-sm ${
            Horizontal ? "md:card-side" : ""
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          custom={index}
        >
          <figure
            className={`
        ${
          ratioClass
            ? ratioClass[item.aspectRatio]
            : ratioClass[AspectRatio.FiveByFour]
        }
        w-full ${Horizontal ? "md:w-2/5" : ""}
      `}
          >
            <img
              className="object-cover w-full h-full"
              src={optimizeImage(`${strapiUrl}${item.Imagem?.url}`)}
              alt={item.Imagem?.alt}
            />
          </figure>

          <div className={`card-body ${Horizontal ? "md:w-3/5" : ""}`}>
            <RichTextBlock Content={item.Content} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
