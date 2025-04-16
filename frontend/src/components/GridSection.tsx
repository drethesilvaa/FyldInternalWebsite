// src/components/GridSection.tsx
import React from "react";
import { RichTextBlock } from "./RichTextBlock";

// Define the type for Content and Cards
interface GridSectionProps {
  Colunas: number;
  Item: {
    Colunas: number;
    Content: any;
  }[];
}

export const GridSection = ({ Colunas, Item }: GridSectionProps) => {
  const colSpanVariants: { [key: number]: string } = {
    1: "col-span-full lg:col-span-1",
    2: "col-span-full lg:col-span-2",
    3: "col-span-full lg:col-span-3",
    4: "col-span-full lg:col-span-4",
    5: "col-span-full lg:col-span-5",
    6: "col-span-full lg:col-span-6",
    7: "col-span-full lg:col-span-7",
    8: "col-span-full lg:col-span-8",
    9: "col-span-full lg:col-span-9",
    10: "col-span-full lg:col-span-10",
    11: "col-span-full lg:col-span-11",
    12: "col-span-full lg:col-span-12",
  };

  return (
    <div
      className={`grid gap-6`}
      style={{
        gridTemplateColumns: `repeat(${Colunas}, minmax(0, 1fr))`, // Dynamically setting columns
      }}
    >
      {Item.map((item, index) => (
        <div key={index} className={`${colSpanVariants[item.Colunas]}`}>
          <RichTextBlock content={item.Content} />
        </div>
      ))}
    </div>
  );
};
