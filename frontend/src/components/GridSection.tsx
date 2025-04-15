// src/components/GridSection.tsx
import React from "react";
import { RichTextBlock } from "./RichTextBlock";

// Define the type for Content and Cards
interface GridSectionProps {
  Colunas: number;
  Item: {
    Content: any;
    Cards: any[];
  }[];
}

export const GridSection = ({ Colunas, Item }: GridSectionProps) => {
  console.log(Item);
  return (
    <div
      className={`grid gap-6`}
      style={{
        gridTemplateColumns: `repeat(${Colunas}, minmax(0, 1fr))`, // Dynamically setting columns
      }}
    >
      {Item.map((item, index) => (
        <div key={index} className="">
          <RichTextBlock content={item.Content} />

          {item.Cards && item.Cards.length > 0 && (
            <div className="mt-4">
              {item.Cards.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  className="bg-gray-100 p-4 rounded-md mb-4"
                >
                  {/* Render card content */}
                  <p>{card}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
