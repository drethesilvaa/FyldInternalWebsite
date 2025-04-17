import { RichTextBlock } from "./RichTextBlock";

interface AccordionProps {
  items: {
    Titulo: string;
    content: string;
  }[];
}

export const Accordion = ({ items }: AccordionProps) => {
  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className="collapse collapse-plus bg-base-100 border border-base-300 my-4"
        >
          <input type="checkbox" className="peer" />
          <div className="collapse-title font-semibold text-primary font-header peer-checked:bg-base-200">
            {item.Titulo}
          </div>
          <div className="collapse-content text-sm text-neutral">
            <RichTextBlock content={item.content} />
          </div>
        </div>
      ))}
    </div>
  );
};
