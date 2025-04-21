import { RichTextBlock } from "./RichTextBlock";
import { motion } from "framer-motion";

interface AccordionProps {
  items: {
    Titulo: string;
    content: string;
  }[];
}

const accordionItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: i * 0.1,
    },
  }),
};

export const Accordion = ({ items }: AccordionProps) => {
  return (
    <div>
      {items.map((item, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={accordionItemVariants}
          className="collapse collapse-plus bg-base-100 border border-base-300 my-4"
        >
          <input type="checkbox" className="peer" />
          <div className="collapse-title font-semibold text-primary font-header peer-checked:bg-base-200">
            {item.Titulo}
          </div>
          <div className="collapse-content text-sm text-neutral">
            <RichTextBlock content={item.content} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
