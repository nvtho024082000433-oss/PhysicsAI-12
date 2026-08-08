import React from "react";
import { FormattedMathText } from "./FormattedMathText";

interface SmartMessageRendererProps {
  content: string;
  isLightMode: boolean;
}

type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: number; text: string }
  | { type: "table"; headers: string[]; alignments: string[]; rows: string[][] }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "divider" };

export function parseBlocks(content: string): Block[] {
  const lines = content.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      i++;
      continue;
    }

    if (trimmed === "---" || trimmed === "***") {
      blocks.push({ type: "divider" });
      i++;
      continue;
    }

    if (trimmed.startsWith("#")) {
      const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        blocks.push({
          type: "heading",
          level: match[1].length,
          text: match[2],
        });
        i++;
        continue;
      }
    }

    if (trimmed.startsWith(">")) {
      let text = trimmed.substring(1).trim();
      i++;
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        text += " " + lines[i].trim().substring(1).trim();
        i++;
      }
      blocks.push({ type: "blockquote", text });
      continue;
    }

    // Table detection: starts and ends with "|"
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      let hasSeparator = false;
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim();
        if (nextLine.startsWith("|") && nextLine.endsWith("|") && nextLine.includes("-")) {
          hasSeparator = true;
        }
      }

      if (hasSeparator || trimmed.includes("Đối tượng") || trimmed.includes("Chiều") || trimmed.includes("---")) {
        const rawHeaders = trimmed.split("|").map(s => s.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        
        let alignments: string[] = [];
        let rowStart = i + 1;

        if (hasSeparator) {
          const sepLine = lines[i + 1].trim();
          const sepParts = sepLine.split("|").map(s => s.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
          alignments = sepParts.map(part => {
            if (part.startsWith(":") && part.endsWith(":")) return "center";
            if (part.endsWith(":")) return "right";
            return "left";
          });
          rowStart = i + 2;
        } else {
          alignments = rawHeaders.map(() => "left");
        }

        const rows: string[][] = [];
        let j = rowStart;
        while (j < lines.length) {
          const rowLine = lines[j].trim();
          if (rowLine.startsWith("|") && rowLine.endsWith("|")) {
            const cells = rowLine.split("|").map(s => s.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
            rows.push(cells);
            j++;
          } else {
            break;
          }
        }

        blocks.push({
          type: "table",
          headers: rawHeaders,
          alignments,
          rows
        });

        i = j;
        continue;
      }
    }

    // List detection
    const isUnordered = trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("+ ");
    const isOrdered = /^\d+\.\s/.test(trimmed);
    if (isUnordered || isOrdered) {
      const items: string[] = [];
      let j = i;
      const listType = isOrdered;

      while (j < lines.length) {
        const itemLine = lines[j].trim();
        const itemIsUnordered = itemLine.startsWith("- ") || itemLine.startsWith("* ") || itemLine.startsWith("+ ");
        const itemIsOrdered = /^\d+\.\s/.test(itemLine);

        if (listType && itemIsOrdered) {
          const match = itemLine.match(/^\d+\.\s+(.*)$/);
          if (match) items.push(match[1]);
          j++;
        } else if (!listType && itemIsUnordered) {
          items.push(itemLine.substring(2).trim());
          j++;
        } else {
          break;
        }
      }

      blocks.push({
        type: "list",
        ordered: listType,
        items
      });

      i = j;
      continue;
    }

    // Paragraph grouping
    let paraText = trimmed;
    i++;
    while (i < lines.length) {
      const nextLine = lines[i].trim();
      if (nextLine === "") {
        break;
      }
      if (nextLine.startsWith("#") || nextLine.startsWith(">") || (nextLine.startsWith("|") && nextLine.endsWith("|")) || nextLine.startsWith("- ") || nextLine.startsWith("* ") || /^\d+\.\s/.test(nextLine) || nextLine === "---" || nextLine === "***") {
        break;
      }
      paraText += "\n" + nextLine;
      i++;
    }

    blocks.push({ type: "paragraph", text: paraText });
  }

  return blocks;
}

export function SmartMessageRenderer({ content, isLightMode }: SmartMessageRendererProps) {
  if (!content) return null;

  const blocks = parseBlocks(content);

  const renderInline = (text: string) => {
    // Split by Markdown inline wrappers (bold, code, italic)
    const inlineRegex = /(\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
    const parts = text.split(inlineRegex);

    return (
      <>
        {parts.map((part, idx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            const inner = part.slice(2, -2);
            return (
              <strong
                key={idx}
                className={isLightMode ? "font-black text-slate-950" : "font-black text-purple-400"}
              >
                {renderInline(inner)}
              </strong>
            );
          }
          if (part.startsWith("`") && part.endsWith("`")) {
            const inner = part.slice(1, -1);
            return (
              <code
                key={idx}
                className={`font-mono text-[11px] px-1.5 py-0.5 rounded border ${
                  isLightMode
                    ? "bg-slate-100 text-indigo-700 border-slate-200"
                    : "bg-slate-950 text-purple-300 border-slate-800"
                }`}
              >
                {inner}
              </code>
            );
          }
          if (part.startsWith("*") && part.endsWith("*")) {
            const inner = part.slice(1, -1);
            return <em key={idx} className="italic">{renderInline(inner)}</em>;
          }
          return <React.Fragment key={idx}><FormattedMathText text={part} /></React.Fragment>;
        })}
      </>
    );
  };

  return (
    <div className="space-y-3.5 select-text leading-relaxed">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "heading": {
            const HeadingTag = `h${Math.min(block.level + 2, 6)}` as React.ElementType;
            const headingClasses = block.level === 1
              ? "text-base font-black tracking-tight mt-4 mb-2 text-slate-950 dark:text-purple-300 border-b pb-1 border-slate-200 dark:border-slate-800"
              : block.level === 2
              ? "text-sm font-extrabold tracking-tight mt-3 mb-1.5 text-slate-900 dark:text-purple-400"
              : "text-xs font-bold tracking-tight mt-2 mb-1 text-slate-850 dark:text-slate-300";
            return (
              <HeadingTag key={idx} className={headingClasses}>
                {renderInline(block.text)}
              </HeadingTag>
            );
          }
          case "blockquote":
            return (
              <div
                key={idx}
                className={`pl-3.5 border-l-4 my-2.5 py-1.5 rounded-r-lg font-bold text-xs italic ${
                  isLightMode
                    ? "border-indigo-600 bg-indigo-50/40 text-slate-700 shadow-sm"
                    : "border-purple-500 bg-purple-950/20 text-slate-300"
                }`}
              >
                {renderInline(block.text)}
              </div>
            );
          case "divider":
            return <hr key={idx} className="my-4 border-dashed border-slate-200 dark:border-slate-800" />;
          case "table":
            return (
              <div key={idx} className="overflow-x-auto my-3 border-2 border-slate-800 dark:border-slate-700 rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,0.15)] bg-white dark:bg-slate-900">
                <table className="min-w-full divide-y-2 divide-slate-800 dark:divide-slate-700 text-left text-xs">
                  <thead className={isLightMode ? "bg-slate-50 text-slate-950" : "bg-slate-950 text-purple-300"}>
                    <tr>
                      {block.headers.map((header, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-4 py-2.5 font-black text-[11px] uppercase tracking-wider border-r border-slate-200 dark:border-slate-800 last:border-none"
                          style={{ textAlign: (block.alignments[hIdx] || "left") as any }}
                        >
                          {renderInline(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {block.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={`hover:bg-slate-50/50 dark:hover:bg-slate-850/30 transition-colors ${
                          rIdx % 2 === 0 ? "bg-transparent" : "bg-slate-50/20 dark:bg-slate-950/10"
                        }`}
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="px-4 py-2.5 font-bold leading-relaxed border-r border-slate-200 dark:border-slate-800 last:border-none"
                            style={{ textAlign: (block.alignments[cIdx] || "left") as any }}
                          >
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag key={idx} className={`space-y-1.5 my-2.5 pl-5 ${block.ordered ? "list-decimal animate-fade-in" : "list-disc animate-fade-in"} text-xs font-bold`}>
                {block.items.map((item, iIdx) => (
                  <li key={iIdx} className="leading-relaxed pl-1">
                    {renderInline(item)}
                  </li>
                ))}
              </ListTag>
            );
          }
          case "paragraph":
          default:
            return (
              <p key={idx} className={`text-xs font-bold leading-relaxed whitespace-pre-wrap ${isLightMode ? "text-slate-800" : "text-slate-200"}`}>
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
