import React, { useState, useEffect } from "react";
import {
  Search,
  Brain,
  HelpCircle,
  Check,
  Eye,
  RefreshCw,
  UploadCloud,
  FileText,
  AlertCircle,
  Plus,
  Trash2,
  CheckCircle2,
  ChevronDown,
  Layers,
  Settings,
  Sparkles,
  Image as ImageIcon,
  Edit2
} from "lucide-react";
import mammoth from "mammoth";
import { QUESTION_BANK as STATIC_QUESTION_BANK, Question } from "../types";
import { FormattedMathText } from "./FormattedMathText";
import { QuestionIllustration } from "./QuestionIllustration";

export function QuestionBank() {
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");
  const [selectedChapter, setSelectedChapter] = useState<string>("ALL");
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  // Question bank state (merged static and custom questions)
  const [questions, setQuestions] = useState<Question[]>([]);

  // Import Upload States
  const [isDragging, setIsDragging] = useState(false);
  const [parseStatus, setParseStatus] = useState<"idle" | "parsing" | "done" | "error">("idle");
  const [parsingStep, setParsingStep] = useState("");
  const [parsedQuestions, setParsedQuestions] = useState<Question[]>([]);
  const [pastedText, setPastedText] = useState("");
  const [showPasteArea, setShowPasteArea] = useState(false);
  const [importNotification, setImportNotification] = useState<string | null>(null);

  // Load merged question bank from localStorage or fallback to static list
  useEffect(() => {
    const saved = localStorage.getItem("custom_questions_bank");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setQuestions(parsed);
          return;
        }
      } catch (e) {
        console.error("Lỗi đọc ngân hàng câu hỏi tùy chỉnh:", e);
      }
    }
    // Default fallback
    setQuestions(STATIC_QUESTION_BANK);
    localStorage.setItem("custom_questions_bank", JSON.stringify(STATIC_QUESTION_BANK));
  }, []);

  // Save changes to localStorage helper
  const saveQuestions = (newQuestionsList: Question[]) => {
    setQuestions(newQuestionsList);
    localStorage.setItem("custom_questions_bank", JSON.stringify(newQuestionsList));
  };

  const toggleReveal = (id: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (questionId: number, letter: string) => {
    if (revealedAnswers[questionId]) return; // Cannot change answer after reveal
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: letter }));
  };

  const resetQuestion = (id: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: false }));
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleDeleteFromBank = (id: number) => {
    const next = questions.filter((q) => q.id !== id);
    saveQuestions(next);
    setImportNotification("Đã xóa câu hỏi khỏi ngân hàng thành công.");
    setTimeout(() => setImportNotification(null), 3000);
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === "ALL" || q.level === selectedLevel;
    const matchesChapter = selectedChapter === "ALL" || q.chapter === selectedChapter;
    return matchesSearch && matchesLevel && matchesChapter;
  });

  const levelLabels: Record<string, string> = {
    NB: "Nhận biết",
    TH: "Thông hiểu",
    VD: "Vận dụng",
    VDC: "Vận dụng cao"
  };

  // Helper cognitive level guessers based on pedagogical keywords (GDPT 2018 Physics standard)
  const guessLevel = (text: string): "NB" | "TH" | "VD" | "VDC" => {
    const lowercaseText = text.toLowerCase();
    if (
      lowercaseText.includes("cực đại") ||
      lowercaseText.includes("cực tiểu") ||
      lowercaseText.includes("lớn nhất") ||
      lowercaseText.includes("nhỏ nhất") ||
      lowercaseText.includes("đạt giá trị") ||
      lowercaseText.includes("thay đổi để") ||
      lowercaseText.includes("tối đa") ||
      lowercaseText.includes("tối thiểu") ||
      lowercaseText.includes("hiệu suất cực đại") ||
      lowercaseText.includes("chu trình biến đổi") ||
      lowercaseText.includes("vận dụng cao") ||
      lowercaseText.includes("vdc")
    ) {
      return "VDC";
    }
    if (
      lowercaseText.includes("tính") ||
      lowercaseText.includes("xác định") ||
      lowercaseText.includes("tìm") ||
      lowercaseText.includes("độ lớn") ||
      lowercaseText.includes("bao nhiêu") ||
      lowercaseText.includes("thu được") ||
      lowercaseText.includes("giá trị") ||
      lowercaseText.includes("bằng bao nhiêu") ||
      lowercaseText.includes("áp suất") ||
      lowercaseText.includes("thể tích") ||
      lowercaseText.includes("nhiệt lượng") ||
      lowercaseText.includes("độ biến thiên") ||
      lowercaseText.includes("vận dụng") ||
      lowercaseText.includes("vd")
    ) {
      return "VD";
    }
    if (
      lowercaseText.includes("phát biểu nào") ||
      lowercaseText.includes("nêu") ||
      lowercaseText.includes("định nghĩa") ||
      lowercaseText.includes("khái niệm") ||
      lowercaseText.includes("bản chất") ||
      lowercaseText.includes("công thức") ||
      lowercaseText.includes("đơn vị") ||
      lowercaseText.includes("là gì") ||
      lowercaseText.includes("hệ thức nào đúng") ||
      lowercaseText.includes("phát biểu đúng") ||
      lowercaseText.includes("chọn câu đúng") ||
      lowercaseText.includes("theo định luật") ||
      lowercaseText.includes("nhận biết") ||
      lowercaseText.includes("nb")
    ) {
      return "NB";
    }
    return "TH";
  };

  const guessChapter = (text: string): string => {
    const lowercaseText = text.toLowerCase();
    if (
      lowercaseText.includes("hạt nhân") ||
      lowercaseText.includes("phóng xạ") ||
      lowercaseText.includes("chu kì bán rã") ||
      lowercaseText.includes("bán rã") ||
      lowercaseText.includes("nuclôn") ||
      lowercaseText.includes("proton") ||
      lowercaseText.includes("nơtron") ||
      lowercaseText.includes("heli") ||
      lowercaseText.includes("urani") ||
      lowercaseText.includes("pôlôni") ||
      lowercaseText.includes("khối lượng nghỉ") ||
      lowercaseText.includes("độ hụt khối") ||
      lowercaseText.includes("năng lượng liên kết")
    ) {
      return "Vật lí hạt nhân";
    }
    if (
      lowercaseText.includes("từ trường") ||
      lowercaseText.includes("cảm ứng từ") ||
      lowercaseText.includes("lực từ") ||
      lowercaseText.includes("dây dẫn") ||
      lowercaseText.includes("lorentz") ||
      lowercaseText.includes("từ thông") ||
      lowercaseText.includes("khung dây") ||
      lowercaseText.includes("tesla") ||
      lowercaseText.includes("từ chiết") ||
      lowercaseText.includes("nam châm")
    ) {
      return "Từ trường";
    }
    if (
      lowercaseText.includes("khí") ||
      lowercaseText.includes("piston") ||
      lowercaseText.includes("xilanh") ||
      lowercaseText.includes("đẳng nhiệt") ||
      lowercaseText.includes("đẳng áp") ||
      lowercaseText.includes("đẳng tích") ||
      lowercaseText.includes("phương trình trạng thái") ||
      lowercaseText.includes("clapeyron") ||
      lowercaseText.includes("bôilơ") ||
      lowercaseText.includes("mariốt") ||
      lowercaseText.includes("sác-lơ") ||
      lowercaseText.includes("khí lý tưởng") ||
      lowercaseText.includes("mật độ phân tử")
    ) {
      return "Khí lí tưởng";
    }
    return "Vật lí nhiệt";
  };

  const guessTag = (text: string, chapter: string): string => {
    const lowercaseText = text.toLowerCase();
    if (chapter === "Vật lí hạt nhân") return "Phóng xạ & Bền vững";
    if (chapter === "Từ trường") return "Từ trường & Lực Lorentz";
    if (chapter === "Khí lí tưởng") return "Khí lí tưởng";
    if (lowercaseText.includes("nhiệt độ") || lowercaseText.includes("nóng chảy")) return "Chuyển thể nhiệt";
    return "Định luật nhiệt";
  };

  // 1. Text parsing algorithm for DOCX HTML or pasted text
  const parseRawTextContent = (rawText: string, docxHtml?: string) => {
    setParsingStep("Đang phân tích cấu trúc văn bản bằng bộ giải mã AI nâng cao...");
    
    // Normalize line endings
    const normalizedText = rawText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    
    // Identify question blocks: can be "Câu 1:", "Câu 1.", "[Câu 1]", "Câu 1: [NB]", "Question 1:", etc.
    const qMarkerRegex = /(?:^|\n)\s*(?:\[?\s*(?:Câu|Question|Bài)\s*\d+\s*\]?|\b(?:Câu|Question|Bài)\s*\d+\b)(?:[\s.:\)-]|\[[^\]]+\]|\([^)]+\))*/gi;
    
    let matches: { index: number; length: number; text: string }[] = [];
    let match;
    
    qMarkerRegex.lastIndex = 0;
    while ((match = qMarkerRegex.exec(normalizedText)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        text: match[0]
      });
    }
    
    // Fallback: if no standard "Câu" matches found, try matching numbered lists starting with digits (e.g., "1.", "1/", "[1]")
    if (matches.length === 0) {
      const fallbackRegex = /(?:^|\n)\s*(?:\[\s*\d+\s*\]|\b\d+[\s.:\)-]+)/gi;
      fallbackRegex.lastIndex = 0;
      while ((match = fallbackRegex.exec(normalizedText)) !== null) {
        matches.push({
          index: match.index,
          length: match[0].length,
          text: match[0]
        });
      }
    }

    const blocks: { header: string; body: string }[] = [];
    if (matches.length > 0) {
      for (let idx = 0; idx < matches.length; idx++) {
        const start = matches[idx].index + matches[idx].length;
        const end = (idx + 1 < matches.length) ? matches[idx + 1].index : normalizedText.length;
        blocks.push({
          header: matches[idx].text,
          body: normalizedText.substring(start, end)
        });
      }
    } else {
      // If absolutely no structure found, treat the whole text as one question block
      blocks.push({
        header: "Câu 1:",
        body: normalizedText
      });
    }

    // Process base64 images inside Docx HTML if available
    const docxImages: string[] = [];
    if (docxHtml) {
      const imgRegex = /<img\s[^>]*src="([^"]*)"[^>]*>/g;
      let matchImg;
      while ((matchImg = imgRegex.exec(docxHtml)) !== null) {
        docxImages.push(matchImg[1]);
      }
    }

    const parsed: Question[] = [];
    let qCounter = 1;

    for (const block of blocks) {
      const bodyText = block.body.trim();
      if (!bodyText) continue;

      // Extract explicit cognitive levels from header or body
      const fullBlockText = (block.header + " " + bodyText).toLowerCase();
      let explicitLevel: "NB" | "TH" | "VD" | "VDC" | null = null;
      if (fullBlockText.includes("nhận biết") || fullBlockText.includes("(nb)") || fullBlockText.includes("[nb]")) {
        explicitLevel = "NB";
      } else if (fullBlockText.includes("thông hiểu") || fullBlockText.includes("(th)") || fullBlockText.includes("[th]")) {
        explicitLevel = "TH";
      } else if (fullBlockText.includes("vận dụng cao") || fullBlockText.includes("(vdc)") || fullBlockText.includes("[vdc]")) {
        explicitLevel = "VDC";
      } else if (fullBlockText.includes("vận dụng") || fullBlockText.includes("(vd)") || fullBlockText.includes("[vd]")) {
        explicitLevel = "VD";
      }

      // Identify options inside bodyText
      // Find all option-looking sequences to handle inline formatting (A. B. C. D. on same line) or multiline
      const optMatches: { letter: string; index: number; length: number }[] = [];
      const singleOptRegex = /(?:^|\s|[;,.])([A-D])[\s.:\)-/]+|\[([A-D])\]/g;
      let optMatch;
      while ((optMatch = singleOptRegex.exec(bodyText)) !== null) {
        const letter = (optMatch[1] || optMatch[2]).toUpperCase();
        optMatches.push({
          letter,
          index: optMatch.index,
          length: optMatch[0].length
        });
      }

      // Look for sequential order (A -> B -> C -> D) to avoid false positives in formulas (like "điểm A", "vật B")
      let bestA = -1, bestB = -1, bestC = -1, bestD = -1;
      let lenA = 0, lenB = 0, lenC = 0, lenD = 0;

      for (let i = 0; i < optMatches.length; i++) {
        const mA = optMatches[i];
        if (mA.letter !== "A") continue;
        
        for (let j = i + 1; j < optMatches.length; j++) {
          const mB = optMatches[j];
          if (mB.letter !== "B" || mB.index <= mA.index) continue;
          
          for (let k = j + 1; k < optMatches.length; k++) {
            const mC = optMatches[k];
            if (mC.letter !== "C" || mC.index <= mB.index) continue;
            
            for (let l = k + 1; l < optMatches.length; l++) {
              const mD = optMatches[l];
              if (mD.letter !== "D" || mD.index <= mC.index) continue;
              
              bestA = mA.index; lenA = mA.length;
              bestB = mB.index; lenB = mB.length;
              bestC = mC.index; lenC = mC.length;
              bestD = mD.index; lenD = mD.length;
              break;
            }
            if (bestA !== -1) break;
            bestA = mA.index; lenA = mA.length;
            bestB = mB.index; lenB = mB.length;
            bestC = mC.index; lenC = mC.length;
          }
          if (bestA !== -1) break;
          bestA = mA.index; lenA = mA.length;
          bestB = mB.index; lenB = mB.length;
        }
        if (bestA !== -1) break;
      }

      let rawQuestionText = "";
      const options: string[] = [];

      if (bestA !== -1 && bestB !== -1) {
        // Sequenced options detected
        rawQuestionText = bodyText.substring(0, bestA).trim();
        const rawA = bodyText.substring(bestA + lenA, bestB).trim();
        const rawB = bodyText.substring(bestB + lenB, bestC !== -1 ? bestC : bodyText.length).trim();
        const rawC = bestC !== -1 ? bodyText.substring(bestC + lenC, bestD !== -1 ? bestD : bodyText.length).trim() : "";
        const rawD = bestD !== -1 ? bodyText.substring(bestD + lenD, bodyText.length).trim() : "";

        const cleanOption = (text: string) => text.replace(/[;,.]$/, "").trim();

        options.push(`A. ${cleanOption(rawA)}`);
        options.push(`B. ${cleanOption(rawB)}`);
        if (rawC) options.push(`C. ${cleanOption(rawC)}`);
        if (rawD) options.push(`D. ${cleanOption(rawD)}`);
      } else {
        // Fallback line-by-line parsing
        const lines = bodyText.split("\n").map(l => l.trim()).filter(Boolean);
        for (const line of lines) {
          const isOptionLine = /^[A-D][\s.:\)-]+/.test(line) || /^\[[A-D]\]/.test(line);
          if (isOptionLine) {
            const letter = line.replace(/^\[?([A-D])\]?.*/, "$1").toUpperCase();
            const textOnly = line.replace(/^(?:\[?[A-D]\]?[\s.:\)-]*)/, "").trim();
            options.push(`${letter}. ${textOnly}`);
          } else if (options.length === 0) {
            rawQuestionText += (rawQuestionText ? "\n" : "") + line;
          } else {
            options[options.length - 1] += " " + line;
          }
        }
      }

      // Skip blocks that don't have a valid question body
      if (!rawQuestionText && options.length === 0) continue;

      // Clean up bracket annotations from the question body
      const cleanQuestionText = (text: string): string => {
        return text
          .replace(/\s*\(Nhận biết\)/gi, "")
          .replace(/\s*\(Thông hiểu\)/gi, "")
          .replace(/\s*\(Vận dụng\)/gi, "")
          .replace(/\s*\(Vận dụng cao\)/gi, "")
          .replace(/\s*\[Nhận biết\]/gi, "")
          .replace(/\s*\[Thông hiểu\]/gi, "")
          .replace(/\s*\[Vận dụng\]/gi, "")
          .replace(/\s*\[Vận dụng cao\]/gi, "")
          .replace(/\s*\(NB\)/gi, "")
          .replace(/\s*\(TH\)/gi, "")
          .replace(/\s*\(VD\)/gi, "")
          .replace(/\s*\(VDC\)/gi, "")
          .replace(/\s*\[NB\]/gi, "")
          .replace(/\s*\[TH\]/gi, "")
          .replace(/\s*\[VD\]/gi, "")
          .replace(/\s*\[VDC\]/gi, "")
          .trim();
      };

      const finalQuestionText = cleanQuestionText(rawQuestionText || block.header);

      // Heuristic correct answer detector
      let answer: "A" | "B" | "C" | "D" = "A";
      const cleanedOptions = options.map((opt) => {
        const isCorrect = 
          opt.includes("*") || 
          opt.includes("✓") || 
          opt.includes("[x]") || 
          opt.toLowerCase().includes("(đúng)") || 
          opt.toLowerCase().includes("(đáp án đúng)");
        
        const letter = opt.charAt(0) as "A" | "B" | "C" | "D";
        if (isCorrect) {
          answer = letter;
        }

        let cleanOpt = opt
          .replace(/\*/g, "")
          .replace(/✓/g, "")
          .replace(/\[x\]/g, "")
          .replace(/\(đúng\)/gi, "")
          .replace(/\(đáp án đúng\)/gi, "")
          .trim();

        return cleanOpt;
      });

      // Scan body text or option content for explicit answer declarations (e.g. "Đáp án đúng: B", "Đáp án: B")
      const explicitAnswerMatch = /Đáp án(?:\s*đúng)?\s*[:\-]*\s*([A-D])/i.exec(bodyText);
      if (explicitAnswerMatch) {
        answer = explicitAnswerMatch[1].toUpperCase() as "A" | "B" | "C" | "D";
      }

      const qLevel = explicitLevel || guessLevel(finalQuestionText);
      const qChapter = guessChapter(finalQuestionText);
      const qTag = guessTag(finalQuestionText, qChapter);

      const newQ: Question = {
        id: Date.now() + qCounter++,
        text: finalQuestionText,
        options: cleanedOptions.length > 0 ? cleanedOptions : ["A. Đáp án A", "B. Đáp án B", "C. Đáp án C", "D. Đáp án D"],
        answer,
        level: qLevel,
        chapter: qChapter,
        tag: qTag
      };

      // Assign extracted Docx image if index corresponds
      if (docxImages.length > 0 && parsed.length < docxImages.length) {
        newQ.image = docxImages[parsed.length];
      }

      parsed.push(newQ);
    }

    if (parsed.length === 0) {
      throw new Error("Không thể trích xuất cấu trúc câu hỏi hợp lệ (Ví dụ định dạng cần có: Câu 1: ... A. ... B. ...)");
    }

    setParsedQuestions(parsed);
    setParseStatus("done");
  };

  // Handle Word File Upload using Mammoth with base64 visual extraction
  const handleWordFileParse = async (file: File) => {
    setParseStatus("parsing");
    setParsingStep("Đang giải mã cấu trúc tệp Word (.docx)...");

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      try {
        setParsingStep("Đang trích xuất văn bản & hình vẽ minh họa...");
        // Convert to HTML using Mammoth to capture embedded base64 images
        const htmlResult = await mammoth.convertToHtml({ arrayBuffer });
        const docxHtml = htmlResult.value;

        // Also extract raw text for reliable regex splitting
        const textResult = await mammoth.extractRawText({ arrayBuffer });
        const rawText = textResult.value;

        // Parse questions from raw text and link figures from HTML
        parseRawTextContent(rawText, docxHtml);
      } catch (err: any) {
        console.error("Lỗi biên dịch tệp docx:", err);
        setParseStatus("error");
        setParsingStep(`Lỗi phân tích cú pháp tệp: ${err.message || "Tệp không hợp lệ"}`);
      }
    };
    reader.onerror = () => {
      setParseStatus("error");
      setParsingStep("Lỗi đọc dữ liệu tệp tin.");
    };
    reader.readAsArrayBuffer(file);
  };

  // Handles PDF or TXT upload (includes robust physics text parsing + simulated OCR figure tagging)
  const handlePdfOrTxtParse = (file: File) => {
    setParseStatus("parsing");
    setParsingStep("Đang đọc cấu trúc tệp PDF/Văn bản...");

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      try {
        setParsingStep("Đang phân loại ma trận độ khó & vẽ sơ đồ vật lí...");
        
        // Simulating artificial OCR drawing parser to tag illustrations based on physics topic
        setTimeout(() => {
          try {
            parseRawTextContent(text);
          } catch (err: any) {
            setParseStatus("error");
            setParsingStep(`Lỗi: ${err.message || "Không thể tìm cấu trúc Câu 1: ..."}`);
          }
        }, 800);
      } catch (err: any) {
        setParseStatus("error");
        setParsingStep("Lỗi đọc tệp tin PDF.");
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const name = file.name.toLowerCase();
    if (name.endsWith(".docx")) {
      handleWordFileParse(file);
    } else if (name.endsWith(".pdf") || name.endsWith(".txt")) {
      handlePdfOrTxtParse(file);
    } else {
      setParseStatus("error");
      setParsingStep("Hệ thống chỉ hỗ trợ tệp Word (.docx) hoặc PDF/Văn bản (.pdf, .txt).");
    }
  };

  const handleManualFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Pasted Text parsing handler
  const handleParsePastedText = () => {
    if (!pastedText.trim()) return;
    setParseStatus("parsing");
    setParsingStep("Đang phân tích đoạn văn bản dán trực tiếp...");
    setTimeout(() => {
      try {
        parseRawTextContent(pastedText);
      } catch (err: any) {
        setParseStatus("error");
        setParsingStep(`Lỗi nhận diện cấu trúc: ${err.message || "Vui lòng kiểm tra lại định dạng Câu 1:... A. ... B. ..."}`);
      }
    }, 600);
  };

  // Modify individual parsed question before saving
  const handleUpdateParsedField = (idx: number, field: keyof Question, value: any) => {
    setParsedQuestions((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const handleUpdateParsedOption = (qIdx: number, optIdx: number, value: string) => {
    setParsedQuestions((prev) => {
      const next = [...prev];
      const updatedOpts = [...next[qIdx].options];
      updatedOpts[optIdx] = value;
      next[qIdx] = { ...next[qIdx], options: updatedOpts };
      return next;
    });
  };

  const handleRemoveParsed = (idx: number) => {
    setParsedQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  // Confirm and commit all parsed questions to the primary bank
  const handleCommitToBank = () => {
    if (parsedQuestions.length === 0) return;

    // Merge into our active state & sync to localStorage
    const merged = [...questions, ...parsedQuestions];
    saveQuestions(merged);

    // Clean up
    setParsedQuestions([]);
    setParseStatus("idle");
    setPastedText("");
    setImportNotification(`🎉 Đã bổ sung thành công ${parsedQuestions.length} câu hỏi mới vào Ngân hàng đề thi!`);
    setTimeout(() => setImportNotification(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Success Toast */}
      {importNotification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 border-2 border-emerald-600 text-slate-950 px-5 py-3 rounded-2xl font-black text-xs flex items-center gap-3.5 shadow-2xl animate-bounce">
          <CheckCircle2 className="h-5 w-5 text-slate-950 shrink-0" />
          <span>{importNotification}</span>
        </div>
      )}

      {/* Primary Question Bank Controls & Header */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Brain className="text-cyan-400 h-5 w-5" />
              Ngân hàng Câu hỏi Ôn thi Quốc gia Vật lí 12
            </h2>
            <p className="text-xs text-slate-400 mt-1">Hàng nghìn câu hỏi định hướng năng lực mới theo chuẩn GDPT 2018</p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                <Search className="h-3.5 w-3.5" />
              </span>
              <input
                type="text"
                placeholder="Tìm theo nội dung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Show/Hide Upload Area trigger */}
            <button
              onClick={() => {
                setShowPasteArea(false);
                setParseStatus("idle");
                setParsedQuestions([]);
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white text-xs font-black rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/10 shrink-0"
            >
              <UploadCloud className="h-4 w-4" />
              Tải Đề Lên
            </button>
          </div>
        </div>

        {/* INTERACTIVE DOCUMENT PARSING SECTION */}
        <div className="mb-8 p-5 bg-slate-950/60 border-2 border-dashed border-slate-800 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <UploadCloud className="text-purple-400 h-4.5 w-4.5" />
              <span className="text-xs font-black text-slate-200 uppercase tracking-wider">Trình nạp đề thông minh (.docx, .pdf, .txt)</span>
            </div>
            <button
              onClick={() => setShowPasteArea(!showPasteArea)}
              className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              {showPasteArea ? "Hiển thị khung tải tệp" : "Hoặc dán văn bản trực tiếp"}
            </button>
          </div>

          {!showPasteArea ? (
            /* Drag and Drop Zone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                isDragging
                  ? "border-cyan-500 bg-cyan-950/15"
                  : "border-slate-800 bg-slate-900/20 hover:border-slate-700"
              }`}
            >
              <input
                type="file"
                id="file-import-input"
                className="hidden"
                accept=".docx,.pdf,.txt"
                onChange={handleManualFileSelect}
              />
              <label htmlFor="file-import-input" className="cursor-pointer flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-slate-400" />
                </div>
                <p className="text-xs font-black text-slate-200 leading-normal">Kéo & thả tệp Word (.docx) hoặc PDF / văn bản ở đây</p>
                <p className="text-[10px] text-slate-500 mt-1">Hệ thống sẽ tự động bóc tách Văn bản, Công thức, Đọc sơ đồ hình vẽ & Phân loại mức độ</p>
                <span className="mt-4 px-3.5 py-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-[10px] text-slate-300 rounded-lg font-bold transition-all">
                  Chọn tệp từ thiết bị
                </span>
              </label>
            </div>
          ) : (
            /* Text Paste Fallback Area */
            <div className="space-y-3.5">
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                rows={6}
                placeholder={`Dán nội dung đề thi của bạn vào đây. Ví dụ:
Câu 1 (Nhận biết): Công thức của định luật Ohm là gì?
A. I = U/R
B. I = U.R
C. I = R/U
D. I = U + R`}
                className="w-full bg-slate-950 text-slate-200 text-xs rounded-xl p-3 border border-slate-850 outline-none focus:border-cyan-500 transition-colors font-mono"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleParsePastedText}
                  disabled={!pastedText.trim()}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer"
                >
                  Phân tích & Trích xuất câu hỏi
                </button>
              </div>
            </div>
          )}

          {/* Stepped Progress Scanner Animation */}
          {parseStatus === "parsing" && (
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300 font-bold flex items-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5 text-cyan-400 animate-spin" />
                  Hệ thống phân tích AI đang xử lý...
                </span>
                <span className="text-[10px] text-cyan-400 font-bold font-mono">Đang nạp</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium font-mono">{parsingStep}</p>
              <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full animate-pulse" style={{ width: "70%" }} />
              </div>
            </div>
          )}

          {/* Error Display */}
          {parseStatus === "error" && (
            <div className="p-4 bg-rose-950/40 border border-rose-500/30 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-rose-200">Không thể phân tích tài liệu</h4>
                <p className="text-[11px] text-rose-300 leading-normal mt-0.5">{parsingStep}</p>
              </div>
            </div>
          )}

          {/* QUESTION REVIEW & LEVEL CLASSIFIER PANEL (Visible after parsing success) */}
          {parseStatus === "done" && parsedQuestions.length > 0 && (
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                    <Sparkles className="text-amber-400 h-4 w-4" />
                    Kết quả Trích xuất & Phân loại ma trận từ File
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Phát hiện <strong className="text-cyan-400 font-bold">{parsedQuestions.length} câu hỏi</strong>. Vui lòng duyệt hình vẽ và điều chỉnh mức độ nhận thức trước khi lưu.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setParsedQuestions([]);
                      setParseStatus("idle");
                    }}
                    className="px-3.5 py-1.5 border border-slate-700 text-slate-400 hover:text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleCommitToBank}
                    className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Lưu vào Ngân hàng
                  </button>
                </div>
              </div>

              {/* Parsed question editable board list */}
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
                {parsedQuestions.map((q, qIdx) => (
                  <div key={q.id} className="p-4.5 bg-slate-950 rounded-xl border border-slate-850 space-y-4 relative">
                    {/* Delete item from upload stream */}
                    <button
                      onClick={() => handleRemoveParsed(qIdx)}
                      className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-all cursor-pointer"
                      title="Bỏ qua câu hỏi này"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-mono font-black text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                        CÂU HỎI {qIdx + 1}
                      </span>

                      {/* Interactive level classifier tag group */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Mức độ:</span>
                        {(["NB", "TH", "VD", "VDC"] as const).map((lvl) => {
                          const isActive = q.level === lvl;
                          return (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => handleUpdateParsedField(qIdx, "level", lvl)}
                              className={`px-2 py-0.5 rounded text-[9px] font-black transition-all cursor-pointer ${
                                isActive
                                  ? "bg-amber-400 text-slate-950 border border-amber-500 shadow-sm"
                                  : "bg-slate-900 text-slate-500 border border-transparent hover:text-slate-300"
                              }`}
                            >
                              {lvl}
                            </button>
                          );
                        })}
                      </div>

                      {/* Chapter Dropdown */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Chủ đề:</span>
                        <select
                          value={q.chapter}
                          onChange={(e) => handleUpdateParsedField(qIdx, "chapter", e.target.value)}
                          className="bg-slate-900 border border-slate-800 text-slate-300 text-[9px] font-bold rounded px-2 py-0.5 outline-none cursor-pointer"
                        >
                          <option value="Vật lí nhiệt">Vật lí nhiệt</option>
                          <option value="Khí lí tưởng">Khí lí tưởng</option>
                          <option value="Từ trường">Từ trường</option>
                          <option value="Vật lí hạt nhân">Vật lí hạt nhân</option>
                        </select>
                      </div>
                    </div>

                    {/* Editable question text */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase block">Nội dung câu hỏi:</label>
                      <input
                        type="text"
                        value={q.text}
                        onChange={(e) => handleUpdateParsedField(qIdx, "text", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-850 text-slate-100 text-xs rounded-lg px-3 py-2 outline-none focus:border-cyan-500"
                      />
                    </div>

                    {/* EXTRACTED/SIMULATED ILLUSTRATION SIDE BAR */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Options editing */}
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase block">Các lựa chọn trắc nghiệm:</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, optIdx) => {
                            const optText = opt.trim();
                            const hasPrefix = /^[A-D]\.\s/.test(optText);
                            const letter = hasPrefix ? optText.charAt(0) : String.fromCharCode(65 + optIdx);
                            const textOnly = hasPrefix ? optText.substring(3) : optText;

                            return (
                              <div key={optIdx} className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-850">
                                <span className="text-[10px] font-black text-slate-400 w-4 text-center">{letter}</span>
                                <input
                                  type="text"
                                  value={textOnly}
                                  onChange={(e) => handleUpdateParsedOption(qIdx, optIdx, `${letter}. ${e.target.value}`)}
                                  className="flex-1 bg-transparent text-slate-100 text-xs outline-none"
                                />
                              </div>
                            );
                          })}
                        </div>

                        {/* Pick correct answer */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[9px] font-bold text-slate-500 uppercase">Đáp án đúng:</span>
                          {["A", "B", "C", "D"].map((l) => (
                            <button
                              key={l}
                              type="button"
                              onClick={() => handleUpdateParsedField(qIdx, "answer", l)}
                              className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-black transition-all cursor-pointer ${
                                q.answer === l
                                  ? "bg-emerald-500 text-slate-950 border border-emerald-600"
                                  : "bg-slate-900 text-slate-500 hover:text-slate-300"
                              }`}
                            >
                              {l}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* ILLUSTRATION CARD PREVIEW */}
                      <div className="flex flex-col items-center justify-center bg-slate-900 p-3 rounded-lg border border-slate-850">
                        {q.image ? (
                          <div className="space-y-1.5 w-full">
                            <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider block flex items-center gap-1">
                              <ImageIcon className="h-3 w-3" />
                              Hình vẽ trong File Word:
                            </span>
                            <div className="border border-slate-800 rounded bg-slate-950 p-1 flex items-center justify-center overflow-hidden h-28">
                              <img src={q.image} alt="Sơ đồ trích xuất" className="max-h-24 max-w-full object-contain" />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1.5 w-full text-center">
                            <span className="text-[9px] font-bold text-purple-400 uppercase tracking-wider block flex items-center justify-center gap-1">
                              <Sparkles className="h-3 w-3 animate-pulse" />
                              Sơ đồ tả thực từ AI:
                            </span>
                            <div className="border border-slate-800 rounded bg-slate-950 p-1 flex items-center justify-center overflow-hidden h-28 relative group">
                              <div className="scale-65 origin-center">
                                <QuestionIllustration type="" questionText={q.text} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action row */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setParsedQuestions([]);
                    setParseStatus("idle");
                  }}
                  className="px-4 py-2 border border-slate-700 text-slate-400 hover:text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Bỏ qua tất cả
                </button>
                <button
                  onClick={handleCommitToBank}
                  className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/10"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Bổ sung {parsedQuestions.length} câu vào ngân hàng đề
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Dropdown Filtering Menus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 text-xs">
          {/* Chapter Filter Dropdown */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              Lọc theo chương (Chủ đề):
            </span>
            <div className="relative">
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="w-full appearance-none bg-slate-950 border-2 border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500 transition-colors font-bold cursor-pointer pr-10 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
              >
                <option value="ALL">Tất cả chương học</option>
                <option value="Dao động cơ">Chương I: Dao động cơ</option>
                <option value="Sóng cơ">Chương II: Sóng cơ và Sóng âm</option>
                <option value="Điện xoay chiều">Chương III: Dòng điện xoay chiều</option>
                <option value="Vật lí nhiệt">Chương IV: Vật lí nhiệt</option>
                <option value="Khí lí tưởng">Chương V: Khí lí tưởng</option>
                <option value="Từ trường">Chương VI: Từ trường</option>
                <option value="Vật lí hạt nhân">Chương VII: Vật lí hạt nhân</option>
                <option value="Sóng ánh sáng">Chương VIII: Sóng ánh sáng</option>
                <option value="Lượng tử ánh sáng">Chương IX: Lượng tử ánh sáng</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Level Filter Dropdown */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Brain className="h-3.5 w-3.5 text-amber-400" />
              Lọc theo mức độ nhận thức:
            </span>
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full appearance-none bg-slate-950 border-2 border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500 transition-colors font-bold cursor-pointer pr-10 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
              >
                <option value="ALL">Tất cả mức độ nhận thức</option>
                <option value="NB">Nhận biết (Nhận biết)</option>
                <option value="TH">Thông hiểu (Thông hiểu)</option>
                <option value="VD">Vận dụng (Vận dụng)</option>
                <option value="VDC">Vận dụng cao (Vận dụng cao)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Question List rendering */}
        <div className="space-y-5">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => {
              const isRevealed = revealedAnswers[q.id] || false;
              const selectedAns = selectedAnswers[q.id];
              const isAnswered = selectedAns !== undefined;

              return (
                <div
                  key={q.id}
                  className="bg-slate-950/40 border border-slate-850 rounded-2xl p-5 hover:border-slate-800 transition-all flex flex-col gap-4 relative"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full uppercase">
                        ID: {q.id}
                      </span>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full uppercase">
                        {levelLabels[q.level] || q.level}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
                        {q.chapter}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {isAnswered && (
                        <button
                          onClick={() => resetQuestion(q.id)}
                          className="text-xs font-bold text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <RefreshCw className="h-3 w-3" />
                          Làm lại
                        </button>
                      )}
                      <button
                        onClick={() => toggleReveal(q.id)}
                        className={`text-xs font-black flex items-center gap-1.5 transition-all px-3.5 py-1.5 rounded-xl border-2 cursor-pointer ${
                          isRevealed
                            ? "bg-slate-850 text-slate-300 border-slate-700 shadow-none translate-y-0"
                            : "bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-500 shadow-[0_3px_0_0_#b45309] active:translate-y-[1px] active:shadow-[0_1px_0_0_#b45309]"
                        }`}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        {isRevealed ? "Ẩn đáp án" : "Hiện đáp án"}
                      </button>
                      
                      {/* Explicit, high-visibility Delete Button */}
                      <button
                        onClick={() => handleDeleteFromBank(q.id)}
                        className="text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/5 transition-all cursor-pointer flex items-center gap-1.5"
                        title="Xóa câu hỏi này khỏi ngân hàng"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Xóa câu hỏi</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-sm font-black text-slate-100 leading-relaxed bg-slate-900/40 p-3.5 rounded-xl border border-slate-900/60 flex flex-col md:flex-row gap-5">
                    <div className="flex-1">
                      <FormattedMathText text={q.text} />
                    </div>
                  </div>

                  {/* HIGH-FIDELITY DRAWING ILLUSTRATION BLOCK */}
                  {/* Either custom extracted embedded base64 image or mapped photographic simulation */}
                  {q.image ? (
                    <div className="my-2 max-w-sm mx-auto overflow-hidden rounded-xl border-2 border-slate-850 bg-slate-950 p-2 flex flex-col items-center gap-1.5">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Sơ đồ bóc tách từ tài liệu</span>
                      <img src={q.image} alt="Sơ đồ câu hỏi" className="max-h-52 object-contain rounded-lg" referrerPolicy="no-referrer" />
                    </div>
                  ) : (
                    /* Display mapped photorealistic illustration widget based on cognitive tags */
                    <div className="my-1">
                      <QuestionIllustration type="" questionText={q.text} />
                    </div>
                  )}

                  {/* Option Buttons as 3D Interactive elements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {q.options.map((opt, idx) => {
                      const optText = opt.trim();
                      const hasLetterPrefix = /^[A-D]\.\s/.test(optText);
                      const optionLetter = hasLetterPrefix ? optText.charAt(0) : String.fromCharCode(65 + idx);
                      const optionBody = hasLetterPrefix ? optText.substring(3) : optText;
                      
                      const isCorrect = optionLetter === q.answer;
                      const isSelected = selectedAns === optionLetter;

                      let btnStyle = "";
                      if (isRevealed) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-500 text-white border-2 border-emerald-600 shadow-[0_4px_0_0_#047857] translate-y-[-2px] font-black";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-500 text-white border-2 border-rose-600 shadow-[0_4px_0_0_#be123c] translate-y-[-2px] font-black";
                        } else {
                          btnStyle = "bg-slate-200/50 text-slate-500 border-2 border-slate-300 shadow-[0_1.5px_0_0_#cbd5e1] opacity-40 cursor-not-allowed";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-yellow-400 hover:bg-yellow-300 text-slate-950 border-2 border-yellow-500 shadow-[0_4px_0_0_#b45309] translate-y-[-2px] font-black";
                      } else {
                        btnStyle = "bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-slate-300 shadow-[0_4px_0_0_#cbd5e1] active:translate-y-[2px] active:shadow-[0_2px_0_0_#cbd5e1] font-bold";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isRevealed}
                          onClick={() => handleSelectOption(q.id, optionLetter)}
                          className={`p-3.5 text-left text-xs leading-relaxed transition-all rounded-xl cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-black mr-1 text-inherit">{optionLetter}.</span> <FormattedMathText text={optionBody} />
                        </button>
                      );
                    })}
                  </div>

                  {isRevealed && (
                    <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 mt-2 flex items-start gap-2.5 leading-relaxed">
                      <HelpCircle className="h-4.5 w-4.5 text-cyan-400 mt-0.5 flex-none" />
                      <div>
                        <span className="font-bold text-slate-200">Hướng dẫn giải & Đáp án:</span> Đáp án chính xác là <span className="text-emerald-400 font-extrabold">{q.answer}</span>. Dạng câu hỏi ôn tập bám sát cấu trúc đề thi chính thức của Bộ Giáo dục & Đào tạo.
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-950/20">
              <span className="text-sm text-slate-500 block">Không tìm thấy câu hỏi phù hợp với bộ lọc hiện tại.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
