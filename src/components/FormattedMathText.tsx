import React from "react";
import { MathJax } from "better-react-mathjax";

interface FormattedMathTextProps {
  text: string;
}

export function FormattedMathText({ text }: FormattedMathTextProps) {
  if (!text) return null;

  // Pre-process $ and $$ delimiters to standard \( and \[ delimiters so MathJax can render them correctly
  let mathText = text;
  let isBlock = false;
  mathText = mathText.replace(/\$\$/g, () => {
    isBlock = !isBlock;
    return isBlock ? "\\[" : "\\]";
  });
  
  let isInline = false;
  mathText = mathText.replace(/\$/g, () => {
    isInline = !isInline;
    return isInline ? "\\(" : "\\)";
  });

  const hasDelimiters = mathText.includes("\\(") || mathText.includes("\\[");
  const viRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;
  
  // Detect standard LaTeX commands or syntax that shouldn't be split/parsed as plain text
  const hasLaTeXMacro = /\\(frac|cdot|times|alpha|beta|gamma|delta|omega|theta|phi|rho|sigma|lambda|mu|eta|tau|epsilon|propto|left|right|text|mathrm|circ|vec|bar|sin|cos|tan|cot)/.test(mathText) || /\\(V|p|T|t)\b/.test(mathText);
  const isPureFormula = !viRegex.test(mathText) && (/\\|{|}|\^|_/.test(mathText) || mathText.includes("·") || mathText.includes("×") || hasLaTeXMacro);

  const isSentenceText = hasDelimiters ? false : (viRegex.test(mathText) || (mathText.length > 15 && (mathText.match(/\s/g) || []).length > 2));
  let isLatex = hasDelimiters || isPureFormula || (!isSentenceText && (/\\|{|}|\^|_/.test(mathText) || mathText.includes("·") || mathText.includes("×")));

  // If a string contains a nuclide pattern (e.g. _38^90Sr) but has NO explicit LaTeX backslash
  // and NO custom LaTeX delimiters, we force bypass LaTeX to use our highly stylized custom HTML nuclide boxes.
  const hasNuclide = /_[a-zA-Z0-9+-]+\^[a-zA-Z0-9+-]+/.test(mathText);
  const forceCustomParser = hasNuclide && !mathText.includes("\\") && !hasDelimiters;

  if (forceCustomParser) {
    isLatex = false;
  }

  if (isLatex) {
    // Normalize double backslashes to single backslashes so MathJax doesn't see them as newlines
    mathText = mathText.replace(/\\\\/g, "\\");
    
    if (!mathText.includes("\\(") && !mathText.includes("\\[")) {
      // Escape backslashes for MathJax and wrap in inline math delimiters \( ... \)
      mathText = `\\(${mathText}\\)`;
    }
    return (
      <MathJax inline={true} dynamic={true}>
        <span>{mathText}</span>
      </MathJax>
    );
  }

  // 1. Standardize Celsius and Kelvin degrees: e.g. "0 oC", "20^oC", "100°C", "0 o C", "0 oC"
  let processed = text
    // Remove LaTeX block/inline math delimiters: $$, $, \[, \], \(, \)
    .replace(/\$\$(.*?)\$\$/gs, " $1 ")
    .replace(/\$(.*?)\$/g, " $1 ")
    .replace(/\\\[(.*?)\\\]/gs, " $1 ")
    .replace(/\\\((.*?)\\\)/g, " $1 ")

    // Normalize arrows into high-standard scientific unicode symbol
    .replace(/->|\\rightarrow|\\to/g, " \u2192 ")
    
    // Normalize LaTeX fractions: \frac{num}{den} -> (num)/(den)
    .replace(/\\frac\s*{(.*?)}\s*{(.*?)}/g, "($1)/($2)")
    
    // Remove LaTeX text/mathrm formatting wrappers
    .replace(/\\text\s*{(.*?)}/g, "$1")
    .replace(/\\mathrm\s*{(.*?)}/g, "$1")
    
    // Standardize LaTeX multiplication dots & cross product
    .replace(/\\cdot\s*/g, " \u00B7 ")
    .replace(/\\times\s*/g, " \u00D7 ")

    // Let's replace LaTeX greek letters to Unicode beforehand for consistency
    .replace(/\\Delta\s*/g, "Δ")
    .replace(/\\lambda\s*/g, "λ")
    .replace(/\\mu\s*/g, "μ")
    .replace(/\\alpha\s*/g, "α")
    .replace(/\\beta\s*/g, "β")
    .replace(/\\gamma\s*/g, "γ")
    .replace(/\\Gamma\s*/g, "Γ")
    .replace(/\\pi\s*/g, "π")
    .replace(/\\omega\s*/g, "ω")
    .replace(/\\phi\s*/g, "φ")
    .replace(/\\rho\s*/g, "ρ")
    .replace(/\\sigma\s*/g, "σ")
    .replace(/\\theta\s*/g, "θ")
    .replace(/\\epsilon\s*/g, "ε")
    .replace(/\\tau\s*/g, "τ")
    .replace(/\\eta\s*/g, "η")
    .replace(/\\delta\s*/g, "δ")
    .replace(/\\Phi\s*/g, "Φ")
    .replace(/\\propto\s*/g, "∝")

    // Normalize different nuclide formats to standard _Z^A Elem representation
    // Format: ^{A}_{Z}Elem or ^A_ZElem (with or without curly braces)
    .replace(/\^{(.*?)}\_{(.*?)}\s*([a-zA-Zαβγ\d*]+)/g, "_$2^$1 $3")
    .replace(/\^([a-zA-Z0-9+-]+)_([a-zA-Z0-9+-]+)\s*([a-zA-Zαβγ\d*]+)/g, "_$2^$1 $3")
    // Format: _{Z}^{A}Elem or _Z^AElem (with or without curly braces)
    .replace(/\_{(.*?)}\^{(.*?)}\s*([a-zA-Zαβγ\d*]+)/g, "_$1^$2 $3")
    .replace(/_([a-zA-Z0-9+-]+)\^([a-zA-Z0-9+-]+)\s*([a-zA-Zαβγ\d*]+)/g, "_$1^$2 $3")

    // Normalize curly brace subscripts/superscripts to standard formats (e.g. E_{lk} -> E_lk, 10^{5} -> 10^5)
    .replace(/_{(.*?)}/g, "_$1")
    .replace(/\^{(.*?)}/g, "^$1")

    .replace(/(\d+(?:[.,]\d+)?)\s*(?:oC|°C|o\s*C|\^o\s*C|\^oC)/gi, "$1\u00A0°C")
    .replace(/(?:\boC\b|°C|\^o\s*C|\^oC)/gi, "°C");

  // 2. Standardize Greek letters & physical symbols (e.g., \Delta t -> Δt, \lambda -> λ)
  processed = processed
    .replace(/\\Delta\s*/g, "Δ")
    .replace(/\bDelta\s*/gi, "Δ")
    .replace(/\\Phi\s*/g, "Φ")
    .replace(/\bPhi\s*/g, "Φ")
    .replace(/\\lambda\s*/g, "λ")
    .replace(/\\mu\s*/g, "μ")
    .replace(/\\alpha\s*/g, "α")
    .replace(/\\beta\s*/g, "β")
    .replace(/\\pi\s*/g, "π")
    .replace(/\\omega\s*/g, "ω")
    .replace(/\\phi\s*/g, "φ")
    .replace(/\\rho\s*/g, "ρ")
    .replace(/\\sigma\s*/g, "σ")
    .replace(/\\theta\s*/g, "θ")
    .replace(/\\epsilon\s*/g, "ε")
    .replace(/\\tau\s*/g, "τ")
    .replace(/\\eta\s*/g, "η")
    .replace(/\\delta\s*/g, "δ")
    .replace(/\\propto\s*/g, "∝");

  // 3. Standardize multiplication dots and neat spacing: e.g. "0.1 * 4200" or "0.1 . 4200" or "0.1 .10^5"
  processed = processed
    .replace(/\s*\*\s*/g, " \u00B7 ")
    .replace(/(\d+(?:[.,]\d+)?)\s*\.\s*(10\^-?\d+)/g, "$1 \u00B7 $2") // e.g. 1.5.10^5 -> 1.5 · 10^5
    .replace(/(\d+(?:[.,]\d+)?)\.10\^(-?\d+)/g, "$1 \u00B7 10^$2") // e.g. 1,5.10^-5 -> 1,5 · 10^-5
    .replace(/([a-zA-Z0-9^+-]+)\s*\.\s*([a-zA-ZΔλ\u03B1-\u03C9])/g, "$1 \u00B7 $2") // e.g. 1,2 . A^1/3 -> 1,2 · A^1/3
    .replace(/\s*\.\s*(?=\d)/g, " \u00B7 ");

  // 4. Standardize standard units into clean mathematical format: J / (kg.K) -> J/(kg·K)
  processed = processed
    .replace(/J\s*\/\s*\(\s*kg\s*[\.*·\s]\s*K\s*\)/gi, "J/(kg\u00B7K)")
    .replace(/J\s*\/\s*kg\s*[\.*·\s]\s*K/gi, "J/(kg\u00B7K)")
    .replace(/J\s*\/\s*\(\s*mol\s*[\.*·\s]\s*K\s*\)/gi, "J/(mol\u00B7K)")
    .replace(/J\s*\/\s*mol\s*[\.*·\s]\s*K/gi, "J/(mol\u00B7K)")
    .replace(/N\s*[\.*·\s]\s*m\s*\^\s*2\s*\/\s*kg\s*\^\s*2/gi, "N\u00B7m²/kg²")
    .replace(/m\s*\/\s*s/gi, "m/s")
    .replace(/g\s*\/\s*mol/gi, "g/mol")
    .replace(/kg\s*\/\s*mol/gi, "kg/mol")
    .replace(/J\s*\/\s*K/gi, "J/K")
    .replace(/ph\u00E2n t\u1EED\s*\/\s*m\s*\^\s*3/gi, "phân tử/m³")
    .replace(/m\s*\^\s*-\s*3/gi, "m⁻³")
    .replace(/m\s*\^\s*3/gi, "m³")
    .replace(/dm\s*\^\s*3/gi, "dm³")
    .replace(/cm\s*\^\s*3/gi, "cm³")
    .replace(/kJ\s*\/\s*kg/gi, "kJ/kg")
    .replace(/J\s*\/\s*kg/gi, "J/kg")
    .replace(/W\s*\/\s*m\s*\^\s*2/gi, "W/m²")
    .replace(/W\s*\/\s*m\s*²/gi, "W/m²");

  // Define comprehensive scientific units list (including MeV and u for nuclear physics)
  const UNITS_PATTERN = "J/\\(kg\u00B7K\\)|J/\\(mol\u00B7K\\)|N\u00B7m\u00B2/kg\u00B2|ph\u00E2n t\u1EED/m\u00B3|kg/mol|g/mol|m/s|J/K|m\u207B\u00B3|m\u00B3|dm\u00B3|cm\u00B3|kJ/kg|J/kg|W/m\u00B2|MeV|u|kg|g|kJ|J|K|Pa|W|N|m|l|L|s|V|A|bar";
  
  // Define units that are safe to be parsed when standing alone (without a number prefix)
  // Single letter units like g, m, s, l, L, V, A, K, N, W, J are EXCLUDED here to avoid matching Vietnamese words or single letters like 'N' (Bắc) and 'S' (Nam).
  const STANDALONE_UNITS_PATTERN = "J/\\(kg\u00B7K\\)|J/\\(mol\u00B7K\\)|N\u00B7m\u00B2/kg\u00B2|ph\u00E2n t\u1EED/m\u00B3|\\bkg/mol\\b|\\bg/mol\\b|\\bm/s\\b|\\bJ/K\\b|m\u207B\u00B3|m\u00B3|dm\u00B3|cm\u00B3|\\bkJ/kg\\b|\\bJ/kg\\b|W/m\u00B2|\\bbar\\b|\\bkJ\\b|\\bPa\\b|\\bkg\\b|\\bMeV\\b";

  // Split text by matching formulas to render them inline beautifully:
  const regex = new RegExp(`(_[A-Za-z0-9+-]+\\^[A-Za-z0-9+-]+\\s*[A-Za-z\u03B1\u03B2\u03B3\\d*]+|(?:\\d+(?:[.,]\\d+)?)?\\s*°C|\\b\\d+(?:[.,]\\d+)?\\s*(?:${UNITS_PATTERN})\\b(?![a-zA-Z\\u00C0-\\u1EF9])|[a-zA-ZΔλ\u03B1-\u03C9đĐ]+_[a-zA-Z0-9\u03B1-\u03C9_àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]+|[a-zA-Z0-9\\)\\u03B1-\u03C9_]+\\^\\([^)]+\\)|[a-zA-Z0-9\\)\\u03B1-\u03C9_]+\\^[a-zA-Z0-9\\-\\+\\/]+|[ΔλμαβπωφρσθετηδΦ→\u2192]|(?:${STANDALONE_UNITS_PATTERN.replace(/\//g, "\\/")}))`, "g");

  const parts = processed.split(regex);

  return (
    <span className="leading-relaxed">
      {parts.map((part, index) => {
        if (!part) return null;

        // 1. Check if it matches Nuclide
        const nuclideMatch = part.match(/^_(?<z>[A-Za-z0-9+-]+)\^(?<a>[A-Za-z0-9+-]+)\s*(?<elem>[A-Za-z\u03B1\u03B2\u03B3\u03B4\u03B5\u03B6\u03B7\u03B8\u03B9\u03BA\u03BB\u03BC\u03BD\u03BE\u03BF\u03C0\u03C1\u03C3\u03C4\u03C5\u03C6\u03C7\u03C8\u03C9\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039A\u039B\u039C\u039D\u039E\u039F\u03A0\u03A1\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9\d*-]+)$/);
        if (nuclideMatch && nuclideMatch.groups) {
          const { z, a, elem } = nuclideMatch.groups;
          return (
            <span
              key={index}
              className="inline-flex items-center gap-0.5 font-mono font-black align-middle mx-1 px-1 bg-indigo-50/50 border border-indigo-100 rounded text-slate-900 select-none"
            >
              <span className="flex flex-col text-right leading-none text-[8px] -translate-y-[1px]">
                <span className="text-indigo-600 font-extrabold">{a}</span>
                <span className="text-emerald-600 font-extrabold mt-0.5">{z}</span>
              </span>
              <span className="text-xs text-slate-950 font-black tracking-tight">{elem}</span>
            </span>
          );
        }

        // 2. Check if it matches Temperature (e.g., 20 °C or °C)
        if (part.includes("°C")) {
          return (
            <span
              key={index}
              className="inline-flex items-center gap-0.5 font-sans font-black text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shadow-[1px_1px_0px_rgba(180,83,9,0.15)] mx-0.5"
            >
              {part}
            </span>
          );
        }

        // 3. Check if it matches common physical units (e.g., J/(kg·K), kJ/kg, etc.)
        const unitRegex = new RegExp(`^(?:${UNITS_PATTERN})$`);
        if (unitRegex.test(part)) {
          return (
            <span
              key={index}
              className="inline-block font-sans font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[11px] align-middle mx-0.5"
            >
              {part}
            </span>
          );
        }

        // 4. Check if it matches a quantity with unit (e.g., "0.1 kg", "4200 J")
        const quantityMatch = part.match(new RegExp(`^(?<num>\\d+(?:[.,]\\d+)?)\\s*(?<unit>${UNITS_PATTERN})$`));
        if (quantityMatch && quantityMatch.groups) {
          const { num, unit } = quantityMatch.groups;
          return (
            <span
              key={index}
              className="inline-flex items-center gap-1 font-sans font-bold text-slate-900 bg-slate-100 px-1 py-0.5 rounded border border-slate-200 mx-0.5"
            >
              <span className="font-mono text-xs font-black text-indigo-950">{num}</span>
              <span className="text-[10px] text-indigo-700 font-extrabold uppercase">{unit}</span>
            </span>
          );
        }

        // 5. Check if it matches a single Greek letter (e.g. μ, λ, Δ)
        const greekRegex = /^[Δλμαβπωφρσθετηδ]$/;
        if (greekRegex.test(part)) {
          return (
            <span key={index} className="inline-block font-serif italic text-slate-950 font-black align-middle mx-0.5">
              {part}
            </span>
          );
        }

        // 6. Check if it matches Subscript (e.g., Q_toa, m_1, Δt_cb)
        const subscriptMatch = part.match(/^(?<base>[A-Za-zΔλ\u03B1-\u03C9đĐ]+)_(?<subsub>[A-Za-z0-9\u03B1-\u03C9_àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]+)$/);
        if (subscriptMatch && subscriptMatch.groups) {
          const { base, subsub } = subscriptMatch.groups;
          return (
            <span key={index} className="inline-block font-serif italic text-slate-950 font-black align-middle bg-sky-50/50 border border-sky-100/60 px-1 rounded mx-0.5">
              {base}
              <sub className="font-sans font-extrabold text-[9px] text-sky-700 not-italic align-sub ml-0.5">
                {subsub.replace(/_/g, " ")}
              </sub>
            </span>
          );
        }

        // 7. Check if it matches Power/Superscript (e.g., 10^5, x^2, v_1^2)
        const powerMatch = part.match(/^(?<base>[A-Za-z0-9\)\u03B1-\u03C9_]+)\^\(?(?<sup>[^)]+)\)?$/) || 
                           part.match(/^(?<base>[A-Za-z0-9\)\u03B1-\u03C9_]+)\^\((?<sup>[A-Za-z0-9\-\+\/]+)\)$/) ||
                           part.match(/^(?<base>[A-Za-z0-9\)\u03B1-\u03C9_]+)\^(?<sup>[A-Za-z0-9\-\+\/]+)$/);
        if (powerMatch && powerMatch.groups) {
          const { base, sup } = powerMatch.groups;
          const isTen = base === "10";
          
          // Check if base has a subscript (e.g., v_1)
          const baseSubscriptMatch = base.match(/^(?<baseChar>[A-Za-zΔλ\u03B1-\u03C9đĐ]+)_(?<subChar>[A-Za-z0-9\u03B1-\u03C9_àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]+)$/);
          if (baseSubscriptMatch && baseSubscriptMatch.groups) {
            const { baseChar, subChar } = baseSubscriptMatch.groups;
            return (
              <span key={index} className="inline-block font-serif italic text-slate-950 font-black align-middle mx-0.5 bg-sky-50/50 border border-sky-100/60 px-1 rounded">
                {baseChar}
                <sub className="font-sans font-extrabold text-[9px] text-sky-700 not-italic align-sub ml-0.5">
                  {subChar.replace(/_/g, " ")}
                </sub>
                <sup className="font-sans font-extrabold text-[9px] text-pink-700 not-italic align-super ml-0.5 bg-pink-50 px-0.5 rounded border border-pink-100/50">
                  {sup}
                </sup>
              </span>
            );
          }

          return (
            <span key={index} className={isTen ? "font-sans font-bold text-slate-950 inline-block align-middle mx-0.5" : "font-serif italic font-black text-slate-950 inline-block align-middle mx-0.5"}>
              {base}
              <sup className="font-sans font-extrabold text-[9px] text-pink-700 not-italic align-super ml-0.5 bg-pink-50 px-0.5 rounded border border-pink-100/50">
                {sup}
              </sup>
            </span>
          );
        }

        // Otherwise return plain text or simple symbol formats (like =, +, -, ·, ∝, ≈)
        if (["=", "+", "-", "\u00B7", "<", ">", "∝", "approx", "≈", "\u2192", "→", "\u2248"].includes(part.trim())) {
          return (
            <span key={index} className="font-mono font-black text-indigo-600 px-1 mx-0.5 text-xs align-middle">
              {part.trim()}
            </span>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

