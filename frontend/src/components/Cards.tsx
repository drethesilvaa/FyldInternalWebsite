import { RichTextBlock } from "./RichTextBlock";

interface CardsProps {
  Horizontal: boolean;
  colunas: number;
  cardsItems: {
    Content: string;
    Imagem: { url: string; alt: string } | null;
  }[];
  id: number;
}

export const Cards = ({ Horizontal, colunas, cardsItems, id }: CardsProps) => {
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
        <div className="card card-side bg-base-100 shadow-sm" key={index}>
          <figure className="w-full">
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.Imagem?.url}`}
              alt={item.Imagem?.alt}
            />
          </figure>
          <div className="card-body">
            <RichTextBlock content={item.Content} />
          </div>
        </div>
      ))}
    </div>
  );
};
