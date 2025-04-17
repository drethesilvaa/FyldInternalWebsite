import React from "react";
import parse, { DOMNode, Element, domToReact } from "html-react-parser";
import { parseStyle } from "@/util/parseStyle";

interface RichTextRendererProps {
  content: string;
  configs?: {
    paragraph?: string;
  };
}

export const RichTextBlock: React.FC<RichTextRendererProps> = ({
  content,
  configs,
}) => {
  const options = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element) {
        const { name, attribs, children } = domNode;

        // Override elements with Tailwind classes
        switch (name) {
          case "h1":
            return (
              <h1
                className="heading-8xl font-extrabold text-primary"
                style={parseStyle(attribs?.style)}
              >
                {domToReact(children as DOMNode[], options)}{" "}
              </h1>
            );
          case "h2":
            return (
              <h2
                className="heading-6xl font-bold text-primary"
                style={parseStyle(attribs?.style)}
              >
                {domToReact(children as DOMNode[], options)}{" "}
              </h2>
            );
          case "h3":
            return (
              <h3
                className="heading-5xl font-extrabold text-primary"
                style={parseStyle(attribs?.style)}
              >
                {domToReact(children as DOMNode[], options)}{" "}
              </h3>
            );
          case "h4":
            return (
              <h4
                className="heading-4xl font-extrabold text-primary"
                style={parseStyle(attribs?.style)}
              >
                {domToReact(children as DOMNode[], options)}{" "}
              </h4>
            );
          case "h5":
            return (
              <h5
                className="heading-3xl font-extrabold text-primary"
                style={parseStyle(attribs?.style)}
              >
                {domToReact(children as DOMNode[], options)}{" "}
              </h5>
            );
          case "h6":
            return (
              <h6
                className="heading-2xl font-extrabold text-neutral"
                style={parseStyle(attribs?.style)}
              >
                {domToReact(children as DOMNode[], options)}{" "}
              </h6>
            );
          case "p":
            return (
              <p
                className={
                  configs?.paragraph ||
                  "lineHeight-2rem text-justify text-neutral"
                }
                style={parseStyle(attribs?.style)}
              >
                {domToReact(children as DOMNode[], options)}{" "}
              </p>
            );
          case "a":
            return (
              <a
                className="link link-primary"
                href={attribs?.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {domToReact(children as DOMNode[], options)}{" "}
              </a>
            );
          case "img":
            return (
              <img
                className="shadow-sm aspect-[5/2] object-cover h-full"
                src={attribs?.src}
                alt={attribs?.alt || ""}
              />
            );
          default:
            return undefined;
        }
      }
    },
  };

  return (
    <div className="rich-text flex flex-col gap-4">
      {parse(content, options)}
    </div>
  );
};
