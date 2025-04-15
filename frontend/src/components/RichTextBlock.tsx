// src/components/RichTextBlock.tsx
interface RichTextBlockProps {
  content: { type: string; children: { text: string }[] }[];
}

export const RichTextBlock = ({ content }: RichTextBlockProps) => {
  return (
    <div>
      <h2>Content Block</h2>
      {content.map((block, index) => (
        <div key={index}>
          {block.type === "heading" && <h3>{block.children[0]?.text}</h3>}
          {block.type === "paragraph" && <p>{block.children[0]?.text}</p>}
        </div>
      ))}
    </div>
  );
};
