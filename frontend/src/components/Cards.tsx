// src/components/Cards.tsx
interface CardsProps {
  items: { Content: any[]; Imagem: { url: string } | null }[];
}

export const Cards = ({ items }: CardsProps) => {
  return (
    <div>
      <h2>Cards</h2>
      {items.map((item, index) => (
        <div key={index}>
          <div>
            {item.Content.map((contentBlock, idx) => (
              <p key={idx}>{contentBlock.children[0]?.text}</p>
            ))}
          </div>
          {item.Imagem && <img src={item.Imagem.url} alt="Card" />}
        </div>
      ))}
    </div>
  );
};
