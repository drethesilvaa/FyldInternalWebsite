import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextRendererProps {
  content: string;
}

export const RichTextBlock: React.FC<RichTextRendererProps> = ({ content }) => {
  const renderers = {
    h1: (props: any) => (
      <h1 className="heading-8xl font-extrabold" {...props} />
    ),
    h2: (props: any) => <h2 className="heading-6xl font-bold" {...props} />,
    h3: (props: any) => (
      <h3 className="heading-5xl font-extrabold text-primary" {...props} />
    ),
    h4: (props: any) => <h4 className="heading-4xl font-medium " {...props} />,
    img: (props: any) => (
      <img className="shadow-sm aspect-[5/2] object-cover h-full" {...props} />
    ),
    p: (props: any) => {
      console.log(props);
      return (
        <p className="lineHeight-2rem text-justify text-neutral" {...props} />
      );
    },
    a: (props: any) => <a className="link link-primary" {...props} />,
    pre: ({ children, className }: any) => {
      return (
        <div className="mockup-code w-full">
          <pre>
            <code className={className}>{children}</code>
          </pre>
        </div>
      );
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 px-4 text-base italic text-neutral bg-gray-100 shadow-md my-4">
        {children}
      </blockquote>
    ),
    ul: ({ children }: any) => (
      <ul className="list-inside list-disc pl-6 space-y-2 text-neutral">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-inside list-decimal pl-6 space-y-2 text-neutral">
        {children}
      </ol>
    ),
  };

  return (
    <div className="rich-text flex flex-col gap-4">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        components={renderers}
      />
    </div>
  );
};
