import React from "react";
import parse, { DOMNode, Element, domToReact } from "html-react-parser";
import { parseStyle } from "@/util/parseStyle";
import { strapiUrl } from "@/data/strapiUrl";

interface RichTextNode {
  type: string;
  children?: RichTextNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  image?: {
    url: string;
    alt?: string;
  };
  level?: number;
  format?: string;
}

interface RichTextRendererProps {
  Content: string | RichTextNode[];
  configs?: {
    paragraph?: string;
  };
}

export const RichTextBlock: React.FC<RichTextRendererProps> = ({
  Content,
  configs,
}) => {
  // Token parsing: support [color=name]...[/color] and [align=left|center|right|justify]...[/align]
  // color names map to Tailwind classes defined in the project (fallback: no class)
  const colorClassMap: Record<string, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    neutral: "text-neutral",
    accent: "text-accent",
    success: "text-success",
    error: "text-error",
    info: "text-info",
  };

  const alignClassMap: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  const tokenRegex = /\[color=([^\]]+?)\]([\s\S]*?)\[\/color\]|\[align=(left|center|right|justify)\]([\s\S]*?)\[\/align\]/i;

  const renderTokens = (input: string | React.ReactNode, keyBase: string | number = 0): React.ReactNode => {
    if (typeof input !== "string") return input;

    // Find the first token match
    const match = tokenRegex.exec(input);
    if (!match) return input;

    const before = input.slice(0, match.index);
    const matched = match[0];
    const after = input.slice(match.index + matched.length);

    // color captured groups: match[1]=colorName, match[2]=content
    if (match[1] && match[2] !== undefined) {
      const colorName = match[1].toLowerCase();
      const className = colorClassMap[colorName] || "";
      return (
        <React.Fragment key={`${keyBase}-tok-c`}>
          {before && renderTokens(before, `${keyBase}-b`)}
          <span className={className || undefined}>
            {renderTokens(match[2], `${keyBase}-c`)}
          </span>
          {after && renderTokens(after, `${keyBase}-a`)}
        </React.Fragment>
      );
    }

    // align captured groups: match[3]=align, match[4]=content
    if (match[3] && match[4] !== undefined) {
      const align = match[3].toLowerCase();
      const className = alignClassMap[align] || undefined;
      // block-level so alignment applies
      return (
        <React.Fragment key={`${keyBase}-tok-a`}>
          {before && renderTokens(before, `${keyBase}-b`)}
          <span className={className ? `${className} block` : "block"}>
            {renderTokens(match[4], `${keyBase}-al`)}
          </span>
          {after && renderTokens(after, `${keyBase}-a`)}
        </React.Fragment>
      );
    }

    return input;
  };
  // Function to render JSON structure from Strapi
  const renderJsonNode = (node: RichTextNode, index: number): React.ReactNode => {
    // Handle text nodes
    if (node.text !== undefined) {
      // parse tokens inside the text node (color/align)
      let textNode: React.ReactNode = renderTokens(node.text as string, index);

      if (node.bold) textNode = <strong>{textNode}</strong>;
      if (node.italic) textNode = <em>{textNode}</em>;
      if (node.underline) textNode = <u>{textNode}</u>;
      if (node.strikethrough) textNode = <s>{textNode}</s>;
      if (node.code) textNode = <code className="bg-base-200 px-1 rounded">{textNode}</code>;

      return <React.Fragment key={index}>{textNode}</React.Fragment>;
    }

    // Handle block nodes
    const children = node.children?.map((child, i) => renderJsonNode(child, i));

    switch (node.type) {
      case "paragraph":
        return (
          <p
            key={index}
            className={
              configs?.paragraph ||
              "lineHeight-2rem text-justify text-neutral pt-1"
            }
          >
            {children}
          </p>
        );
      case "heading":
        const level = node.level || 1;
        const headingClasses = {
          1: "heading-8xl font-extrabold text-primary",
          2: "heading-6xl font-bold text-primary",
          3: "heading-5xl font-extrabold text-primary",
          4: "heading-4xl font-extrabold text-primary",
          5: "heading-2xl font-extrabold text-primary",
          6: "heading-xl font-extrabold text-neutral",
        };
        const className = headingClasses[level as keyof typeof headingClasses] || headingClasses[1];
        
        switch (level) {
          case 1:
            return <h1 key={index} className={className}>{children}</h1>;
          case 2:
            return <h2 key={index} className={className}>{children}</h2>;
          case 3:
            return <h3 key={index} className={className}>{children}</h3>;
          case 4:
            return <h4 key={index} className={className}>{children}</h4>;
          case 5:
            return <h5 key={index} className={className}>{children}</h5>;
          case 6:
            return <h6 key={index} className={className}>{children}</h6>;
          default:
            return <h1 key={index} className={className}>{children}</h1>;
        }
      case "list":
        const ListTag = node.format === "ordered" ? "ol" : "ul";
        const listClass = node.format === "ordered" 
          ? "pl-6 space-y-2 text-neutral marker:font-bold"
          : "list-inside list-disc pl-6 space-y-2 text-neutral";
        return (
          <ListTag key={index} className={listClass}>
            {children}
          </ListTag>
        );
      case "list-item":
        return <li key={index}>{children}</li>;
      case "link":
        return (
          <a
            key={index}
            className="link link-secondary"
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      case "image":
        return (
          <img
            key={index}
            className="object-cover h-full"
            src={`${strapiUrl}${node.image?.url}`}
            alt={node.image?.alt || ""}
          />
        );
      case "quote":
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-neutral">
            {children}
          </blockquote>
        );
      case "code":
        return (
          <pre key={index} className="bg-base-200 p-4 rounded overflow-x-auto">
            <code>{children}</code>
          </pre>
        );
      default:
        return <React.Fragment key={index}>{children}</React.Fragment>;
    }
  };

  // Check if Content is JSON structure or HTML string
  if (Array.isArray(Content)) {
    return <>{Content.map((node, index) => renderJsonNode(node, index))}</>;
  }

  // Original HTML parsing logic
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
                className="heading-2xl font-extrabold text-primary"
                style={parseStyle(attribs?.style)}
              >
                {domToReact(children as DOMNode[], options)}{" "}
              </h5>
            );
          case "h6":
            return (
              <h6
                className="heading-xl font-extrabold text-neutral"
                style={parseStyle(attribs?.style)}
              >
                {domToReact(children as DOMNode[], options)}{" "}
              </h6>
            );
          case "p": {
            const parent = (domNode as any).parent as Element | undefined;
            const inListItem = parent?.name === "li";

            const childNodes = children as DOMNode[];

            const hasContent = childNodes.some((node) => {
              if (node.type !== "text") return true;
              const text = (node as any).data as string;
              return text.trim().length > 0;
            });

            if (!hasContent) {
              return <br />;
            }

            const inner = domToReact(childNodes, options);
            if (inListItem) {
              return <>{inner}</>;
            }
            return (
              <p
                className={
                  configs?.paragraph ||
                  "lineHeight-2rem text-justify text-neutral pt-1"
                }
                style={parseStyle(attribs?.style)}
              >
                {inner}
              </p>
            );
          }
          case "a":
            return (
              <a
                className="link link-secondary"
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
                src={`${strapiUrl}${attribs?.src}`}
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
            const listStart = attribs?.start ? parseInt(attribs.start, 10) : 1;

            return (
              <ol
                start={listStart}
                style={parseStyle(attribs?.style)}
                className="pl-6 space-y-2 text-neutral marker:font-bold"
              >
                {domToReact(children as DOMNode[], options)}
              </ol>
            );
          }
          case "thead":
            return (
              <thead className="bg-[#b7bbbe] text-neutral">
                {domToReact(children as DOMNode[], options)}
              </thead>
            );
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


  // Ensure Content is a string before processing
  const contentString = typeof Content === 'string' ? Content : String(Content);
  const cleaned = contentString.replace(/&nbsp;/g, "").replace(/\u00A0/g, "");

  // Preprocess tokens in HTML string: convert to Tailwind class spans/blocks
  const htmlPreprocessed = cleaned
    .replace(/\[color=([^\]]+?)\]([\s\S]*?)\[\/color\]/gi, (_m, color, inner) => {
      const cls = colorClassMap[(color || '').toLowerCase()] || '';
      return cls ? `<span class="${cls}">${inner}</span>` : `<span>${inner}</span>`;
    })
    .replace(/\[align=(left|center|right|justify)\]([\s\S]*?)\[\/align\]/gi, (_m, align, inner) => {
      const cls = alignClassMap[(align || '').toLowerCase()] || '';
      return `<span class="${cls ? cls + ' block' : 'block'}">${inner}</span>`;
    });

  return <>{parse(htmlPreprocessed, options)}</>;
};
