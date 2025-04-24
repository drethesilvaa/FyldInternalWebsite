import React from "react";
import parse, { DOMNode, Element, domToReact } from "html-react-parser";
import { parseStyle } from "@/util/parseStyle";

interface RichTextRendererProps {
  Content: string;
  configs?: {
    paragraph?: string;
  };
}

export const RichTextBlock: React.FC<RichTextRendererProps> = ({
  Content,
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
          case "p": {
            const parent = (domNode as any).parent as Element | undefined;
            console.log(parent?.name);
            const inListItem = parent?.name === "li";

            if (inListItem) {
              return <>{domToReact(children as DOMNode[], options)}</>;
            }

            return (
              <p
                className={
                  configs?.paragraph ||
                  "lineHeight-2rem text-justify text-neutral pt-1"
                }
                style={parseStyle(attribs?.style)}
              >
                {domToReact(children as DOMNode[], options)}
              </p>
            );
          }
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
          case "figure":
            return (
              <figure
                style={{
                  ...parseStyle(attribs?.style),
                  margin: "0 auto",
                }}
                className={attribs?.class}
              >
                {domToReact(children as DOMNode[], options)}
              </figure>
            );
          case "img":
            return (
              <img
                style={parseStyle(attribs?.style)}
                className="object-cover h-full "
                src={attribs?.src}
                alt={attribs?.alt || ""}
              />
            );
          case "ul":
            return (
              <ul className="list-inside list-disc pl-6 space-y-2 text-neutral">
                {domToReact(children as DOMNode[], options)}
              </ul>
            );
          case "ol": {
            return (
              <ol
                style={{
                  ...parseStyle(attribs?.style),
                }}
                className="pl-6 space-y-2 text-neutral marker:font-bold"
              >
                {domToReact(children as DOMNode[], options)}
              </ol>
            );
          }
          case "table":
            return (
              <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className={`table text-neutral`}>
                  {domToReact(children as DOMNode[], options)}
                </table>
              </div>
            );
          default:
            return undefined;
        }
      }
    },
  };

  if (!Content) return "";

  const cleaned = Content.replace(/&nbsp;/g, "").replace(/\u00A0/g, "");

  return <>{parse(cleaned, options)}</>;
};
