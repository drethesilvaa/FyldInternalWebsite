// src/components/GridSection.tsx
interface GridSectionProps {
  items: { Content: any[]; Cards: any[] | null }[];
}

export const GridSection = ({ items }: GridSectionProps) => {
  return (
    <div>
      <h2>Grid Section</h2>
      {items.map((item, index) => (
        <div key={index}>
          <div>
            {item.Content.map((contentBlock, idx) => (
              <p key={idx}>{contentBlock.children[0]?.text}</p>
            ))}
          </div>
          {item.Cards && item.Cards.length > 0 && (
            <div>{/* Render the cards here */}</div>
          )}
        </div>
      ))}
    </div>
  );
};
