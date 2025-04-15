// src/components/Carousel.tsx
interface CarouselProps {
  items: {
    Content: { type: string; children: { text: string }[] }[];
    Imagem: { url: string } | null;
  }[];
}

export const Carousel = ({ items }: CarouselProps) => {
  return (
    <div>
      <h2>Carousel</h2>
      {items.map((item, index) => (
        <div key={index}>
          {item.Content.map((content, idx) => (
            <p key={idx}>{content.children[0]?.text}</p>
          ))}
          {item.Imagem && <img src={item.Imagem.url} alt="Carousel item" />}
        </div>
      ))}
    </div>
  );
};
