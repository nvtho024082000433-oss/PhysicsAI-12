import React, { useState, useRef, useEffect } from "react";
import { MathJax } from "better-react-mathjax";
import {
  Sparkles,
  BookOpen,
  Clipboard,
  Check,
  RefreshCw,
  Zap,
  Info,
  Layers,
  GraduationCap,
  Sliders,
  Play,
  Award,
  BookOpenCheck,
  Code,
  Trash2,
  ChevronRight,
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface EditorSandboxProps {
  onEarnXP: (xp: number) => void;
}

interface SymbolCategory {
  name: string;
  items: { label: string; value: string; desc: string }[];
}

interface LaTeXPreset {
  title: string;
  code: string;
  desc: string;
  category: "thermal" | "gas" | "magnet" | "nuclear" | "math";
}

interface PracticeChallenge {
  id: string;
  title: string;
  description: string;
  prompt: string;
  hint: string;
  solutionAlternatives: string[]; // Answers to check against (ignoring spacing, outer delimiters, etc.)
  xpReward: number;
}

export function EditorSandbox({ onEarnXP }: EditorSandboxProps) {
  const [activeTab, setActiveTab] = useState<"sandbox" | "practice" | "cheatsheet">("sandbox");
  const [inputText, setInputText] = useState<string>("Q = m \\cdot c \\cdot \\Delta t");
  const [renderMode, setRenderMode] = useState<"mathjax" | "normal">("mathjax");
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [copiedRaw, setCopiedRaw] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Gamified challenges state
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [challengeInput, setChallengeInput] = useState<string>("");
  const [challengeFeedback, setChallengeFeedback] = useState<{ status: "idle" | "correct" | "incorrect"; message: string }>({ status: "idle", message: "" });
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  // Category symbols library for quick-insert buttons
  const SYMBOL_CATEGORIES: SymbolCategory[] = [
    {
      name: "Ký hiệu Vật Lí 12",
      items: [
        { label: "Nhiệt lượng Q", value: "Q", desc: "Nhiệt lượng (J)" },
        { label: "Nhiệt dung riêng c", value: "c", desc: "Nhiệt dung riêng (J/kg·K)" },
        { label: "Nhiệt hóa hơi l", value: "L", desc: "Nhiệt hóa hơi riêng (J/kg)" },
        { label: "Nhiệt nóng chảy λ", value: "\\lambda", desc: "Nhiệt nóng chảy riêng (J/kg)" },
        { label: "Tần số góc ω", value: "\\omega", desc: "Tần số góc (rad/s)" },
        { label: "Pha ban đầu φ", value: "\\varphi", desc: "Pha ban đầu (rad)" },
        { label: "Bước sóng λ", value: "\\lambda", desc: "Bước sóng (m)" },
        { label: "Từ thông Φ", value: "\\Phi", desc: "Từ thông (Wb)" },
        { label: "Cảm ứng từ B", value: "B", desc: "Cảm ứng từ (T)" },
        { label: "Độ hụt khối Δm", value: "\\Delta m", desc: "Độ hụt khối (u hoặc kg)" },
        { label: "Hằng số phóng xạ λ", value: "\\lambda", desc: "Hằng số phóng xạ" },
        { label: "Chu kỳ bán rã T", value: "T", desc: "Chu kỳ bán rã" }
      ]
    },
    {
      name: "Toán học & Cấu trúc",
      items: [
        { label: "Phân số", value: "\\frac{a}{b}", desc: "Phân số a chia cho b" },
        { label: "Chỉ số dưới", value: "x_{1}", desc: "Chỉ số dưới x1" },
        { label: "Mũ / Lũy thừa", value: "x^{2}", desc: "Lũy thừa x^2" },
        { label: "Mũ 10", value: "10^{-7}", desc: "Lũy thừa 10 mũ âm" },
        { label: "Căn bậc hai", value: "\\sqrt{x}", desc: "Căn bậc hai" },
        { label: "Hạt nhân (Nuclide)", value: "^{A}_{Z}\\text{X}", desc: "Ký hiệu hạt nhân phóng xạ" },
        { label: "Độ biến thiên Δ", value: "\\Delta", desc: "Ký hiệu Delta" },
        { label: "Tích phân", value: "\\int_{a}^{b} f(x) dx", desc: "Tích phân từ a đến b" },
        { label: "Dấu xấp xỉ ≈", value: "\\approx", desc: "Gần bằng" },
        { label: "Dấu nhân ·", value: "\\cdot", desc: "Dấu chấm nhân" },
        { label: "Dấu nhân ×", value: "\\times", desc: "Dấu nhân chéo" },
        { label: "Vô cực ∞", value: "\\infty", desc: "Vô cực" }
      ]
    },
    {
      name: "Ký tự Hy Lạp",
      items: [
        { label: "alpha α", value: "\\alpha", desc: "Hạt alpha / góc alpha" },
        { label: "beta β", value: "\\beta", desc: "Tia beta / góc beta" },
        { label: "gamma γ", value: "\\gamma", desc: "Tia gamma / hệ số gamma" },
        { label: "delta δ", value: "\\delta", desc: "Biến thiên nhỏ" },
        { label: "epsilon ε", value: "\\epsilon", desc: "Hằng số điện môi" },
        { label: "pi π", value: "\\pi", desc: "Số Pi" },
        { label: "rho ρ", value: "\\rho", desc: "Khối lượng riêng" },
        { label: "sigma σ", value: "\\sigma", desc: "Hằng số Boltzmann" },
        { label: "tau τ", value: "\\tau", desc: "Chu kỳ thời gian" },
        { label: "theta θ", value: "\\theta", desc: "Góc quay" },
        { label: "mu μ", value: "\\mu", desc: "Độ từ thẩm" },
        { label: "phi φ", value: "\\phi", desc: "Góc pha" }
      ]
    }
  ];

  // Physics presets categories
  const PRESET_FORMULAS: LaTeXPreset[] = [
    {
      title: "Nhiệt lượng tăng nhiệt độ",
      code: "Q = m \\cdot c \\cdot (t_2 - t_1)",
      desc: "Nhiệt lượng một vật thu vào hoặc tỏa ra để thay đổi nhiệt độ.",
      category: "thermal"
    },
    {
      title: "Nhiệt hóa hơi riêng",
      code: "Q = L \\cdot m",
      desc: "Nhiệt lượng cung cấp để hóa hơi hoàn toàn khối lượng m ở nhiệt độ sôi.",
      category: "thermal"
    },
    {
      title: "Phương trình khí lý tưởng",
      code: "p \\cdot V = n \\cdot R \\cdot T",
      desc: "Mối liên hệ giữa các thông số trạng thái của lượng khí lí tưởng xác định.",
      category: "gas"
    },
    {
      title: "Áp suất động học chất khí",
      code: "p = \\frac{1}{3} \\cdot \\mu \\cdot m \\cdot \\overline{v^2}",
      desc: "Hệ thức liên hệ giữa áp suất khí và động năng phân tử khí.",
      category: "gas"
    },
    {
      title: "Định luật từ thông",
      code: "\\Phi = B \\cdot S \\cdot \\cos(\\alpha)",
      desc: "Từ thông gửi qua một diện tích khung dây phẳng S đặt trong từ trường đều B.",
      category: "magnet"
    },
    {
      title: "Suất điện động cảm ứng",
      code: "e_c = - \\frac{\\Delta \\Phi}{\\Delta t}",
      desc: "Tốc độ biến thiên từ thông sinh ra dòng điện cảm ứng.",
      category: "magnet"
    },
    {
      title: "Định luật phóng xạ",
      code: "N(t) = N_0 \\cdot e^{-\\lambda \\cdot t}",
      desc: "Định luật mô tả số hạt nhân còn lại chưa bị phân rã theo thời gian.",
      category: "nuclear"
    },
    {
      title: "Năng lượng liên kết hạt nhân",
      code: "E_{lk} = [Z \\cdot m_p + (A - Z) \\cdot m_n - m_{hn}] \\cdot c^2",
      desc: "Năng lượng tỏa ra khi liên kết các nucleon riêng rẽ thành hạt nhân.",
      category: "nuclear"
    },
    {
      title: "Phản ứng phân hạch Uranium",
      code: "^{235}_{92}\\text{U} + ^{1}_{0}\\text{n} \\rightarrow ^{144}_{56}\\text{Ba} + ^{89}_{36}\\text{Kr} + 3 \\cdot ^{1}_{0}\\text{n}",
      desc: "Phản ứng hạt nhân sinh năng lượng cực lớn trong lò phản ứng hạt nhân.",
      category: "nuclear"
    }
  ];

  // Practice Challenges
  const PRACTICE_CHALLENGES: PracticeChallenge[] = [
    {
      id: "ch_1",
      title: "Thử thách 1: Nhiệt lượng chuyển thể",
      description: "Hãy viết công thức tính nhiệt lượng cần thiết để làm nóng chảy hoàn toàn một vật rắn ở nhiệt độ nóng chảy.",
      prompt: "Gợi ý: Sử dụng nhiệt nóng chảy riêng (\\lambda) và khối lượng (m). Định dạng chuẩn: Q = \\lambda \\cdot m",
      hint: "Hãy gõ đúng ký hiệu λ bằng cách dùng lệnh '\\lambda'. Bạn có thể bấm nút 'λ' ở thanh công cụ.",
      solutionAlternatives: [
        "Q=\\lambda\\cdot m",
        "Q=\\lambda.m",
        "Q=\\lambda m",
        "Q=\\lambda*m",
        "Q=\\lambda\\times m"
      ],
      xpReward: 30
    },
    {
      id: "ch_2",
      title: "Thử thách 2: Định luật phóng xạ hạt nhân",
      description: "Hãy gõ hệ thức định luật phóng xạ tính số hạt nhân chưa bị phân rã N(t) theo số hạt ban đầu N_0, hằng số phóng xạ \\lambda và thời gian t.",
      prompt: "Sử dụng hàm mũ e. Định dạng chuẩn: N(t) = N_0 \\cdot e^{-\\lambda \\cdot t}",
      hint: "Sử dụng dấu gạch dưới '_' cho chỉ số dưới (N_0) và dấu '^' kèm ngoặc nhọn '{}' để viết số mũ phức tạp, ví dụ: e^{-\\lambda \\cdot t}.",
      solutionAlternatives: [
        "N(t)=N_0\\cdot e^{-\\lambda\\cdot t}",
        "N(t)=N_0.e^{-\\lambda.t}",
        "N(t)=N_0e^{-\\lambda t}",
        "N(t)=N_0\\times e^{-\\lambda\\times t}",
        "N_t=N_0\\cdot e^{-\\lambda\\cdot t}"
      ],
      xpReward: 40
    },
    {
      id: "ch_3",
      title: "Thử thách 3: Phương trình dao động điều hòa",
      description: "Hãy viết phương trình li độ x của dao động điều hòa theo biên độ A, tần số góc \\omega, thời gian t và pha ban đầu \\varphi.",
      prompt: "Định dạng chuẩn: x = A \\cdot \\cos(\\omega \\cdot t + \\varphi) hoặc x = A \\cos(\\omega t + \\varphi)",
      hint: "Hãy dùng hàm '\\cos' để định dạng đẹp chữ cos, dùng '\\omega' cho ký hiệu tần số góc và '\\varphi' hoặc '\\phi' cho pha ban đầu.",
      solutionAlternatives: [
        "x=A\\cos(\\omega t+\\varphi)",
        "x=A\\cdot\\cos(\\omega\\cdot t+\\varphi)",
        "x=A\\cos(\\omega t+\\phi)",
        "x=A\\cdot\\cos(\\omega\\cdot t+\\phi)",
        "x=A\\cos(\\omega\\cdot t+\\varphi)",
        "x=A\\cdot\\cos(\\omega t+\\varphi)"
      ],
      xpReward: 40
    },
    {
      id: "ch_4",
      title: "Thử thách 4: Hạt nhân Helium (Alpha)",
      description: "Hãy gõ ký hiệu hạt nhân Helium (hạt alpha) có số khối A = 4 và số hiệu nguyên tử Z = 2.",
      prompt: "Định dạng chuẩn: ^{4}_{2}\\text{He} hoặc ^4_2\\text{He}",
      hint: "Sử dụng cấu trúc hạt nhân: ^{A}_{Z}\\text{Elem} hoặc ^A_ZElem để có chỉ số trên và dưới phía trước.",
      solutionAlternatives: [
        "^{4}_{2}\\text{He}",
        "^{4}_{2}\\mathrm{He}",
        "^{4}_{2}He",
        "^4_2\\text{He}",
        "^4_2\\mathrm{He}",
        "^4_2He"
      ],
      xpReward: 50
    },
    {
      id: "ch_5",
      title: "Thử thách 5: Định luật bảo toàn số khối & điện tích",
      description: "Viết phương trình phản ứng hạt nhân khi hạt proton bắn phá hạt nhân Lithium tạo thành hai hạt nhân Helium.",
      prompt: "Cú pháp: ^{1}_{1}\\text{H} + ^{7}_{3}\\text{Li} \\rightarrow 2 \\cdot ^{4}_{2}\\text{He}",
      hint: "Sử dụng dấu '+' và '\\rightarrow' (mũi tên sang phải) để tạo phương trình phản ứng hóa học/hạt nhân chuẩn xác.",
      solutionAlternatives: [
        "^{1}_{1}\\text{H}+^{7}_{3}\\text{Li}\\rightarrow 2\\cdot^{4}_{2}\\text{He}",
        "^{1}_{1}\\text{H}+^{7}_{3}\\text{Li}\\rightarrow 2\\cdot^{4}_{2}\\mathrm{He}",
        "^{1}_{1}\\text{H}+^{7}_{3}\\text{Li}\\rightarrow 2\\cdot^{4}_{2}He",
        "^1_1H+^7_3Li\\rightarrow 2\\cdot^4_2He",
        "^1_1\\text{H}+^7_3\\text{Li}\\rightarrow 2\\cdot^4_2\\text{He}",
        "^1_1\\text{H}+^7_3\\text{Li}\\rightarrow 2^4_2\\text{He}"
      ],
      xpReward: 60
    }
  ];

  // Insert text helper
  const handleInsertText = (value: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      if (activeTab === "sandbox") {
        setInputText((prev) => prev + " " + value);
      } else {
        setChallengeInput((prev) => prev + value);
      }
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = activeTab === "sandbox" ? inputText : challengeInput;
    const newVal = currentVal.substring(0, start) + value + currentVal.substring(end);

    if (activeTab === "sandbox") {
      setInputText(newVal);
    } else {
      setChallengeInput(newVal);
    }

    // Return focus and restore cursor position after render
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + value.length, start + value.length);
    }, 50);
  };

  // Copy helpers
  const handleCopyFormatted = () => {
    const textToCopy = renderMode === "mathjax" ? `$$${inputText}$$` : inputText;
    navigator.clipboard.writeText(textToCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(inputText);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  // Practice submission handler
  const handleVerifyPractice = () => {
    const currentChallenge = PRACTICE_CHALLENGES[currentChallengeIdx];
    // Normalize string: remove all white spaces, convert common variables, convert dots/crosses, lower case
    const normalize = (str: string) => {
      return str
        .replace(/\s+/g, "") // remove all whitespace
        .replace(/\\mathrm/g, "\\text") // standardize mathrm to text
        .replace(/\\cdot/g, ".") // standardize multiplication signs
        .replace(/\\times/g, ".")
        .replace(/\*/g, ".")
        .replace(/{/g, "") // remove curly brackets to evaluate content equality easily
        .replace(/}/g, "")
        .replace(/\\varphi/g, "\\phi") // normalize phi representations
        .toLowerCase();
    };

    const userNormalized = normalize(challengeInput);
    const isCorrect = currentChallenge.solutionAlternatives.some(
      (alt) => normalize(alt) === userNormalized
    );

    if (isCorrect) {
      setChallengeFeedback({
        status: "correct",
        message: `🎉 Tuyệt vời! Bạn đã soạn thảo LaTeX cực kỳ chính xác. +${currentChallenge.xpReward} XP đã được cộng!`
      });
      
      // Award XP if not already completed
      if (!completedChallenges.includes(currentChallenge.id)) {
        onEarnXP(currentChallenge.xpReward);
        setCompletedChallenges((prev) => [...prev, currentChallenge.id]);
      }
    } else {
      setChallengeFeedback({
        status: "incorrect",
        message: "❌ Chưa hoàn toàn chính xác. Hãy kiểm tra lại các ký hiệu gạch dưới '_', mũ '^' hoặc các ký tự đặc biệt."
      });
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIdx < PRACTICE_CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setChallengeInput("");
      setChallengeFeedback({ status: "idle", message: "" });
    }
  };

  const handleResetChallenge = () => {
    setChallengeInput("");
    setChallengeFeedback({ status: "idle", message: "" });
  };

  return (
    <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-xl flex flex-col gap-6 animate-fade-in text-slate-100">
      
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Code className="h-6 w-6 text-white font-black" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight uppercase flex items-center gap-1.5">
              Hộp Cát Công Thức LaTeX
              <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 uppercase tracking-widest">PRO</span>
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium leading-normal">
              Soạn thảo công thức, trực quan hóa ký hiệu Vật lí THPT Quốc gia theo thời gian thực
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-slate-850/50 shrink-0 self-start sm:self-center">
          <button
            onClick={() => setActiveTab("sandbox")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "sandbox"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            Hộp cát Tự do
          </button>
          <button
            onClick={() => {
              setActiveTab("practice");
              handleResetChallenge();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "practice"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpenCheck className="h-3.5 w-3.5" />
            Luyện gõ Công thức
            {completedChallenges.length > 0 && (
              <span className="text-[9px] font-mono font-black bg-emerald-500/25 text-emerald-300 px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                {completedChallenges.length}/{PRACTICE_CHALLENGES.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("cheatsheet")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "cheatsheet"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Bảng tra cứu
          </button>
        </div>
      </div>

      {/* Main Container based on active tab */}
      {activeTab === "sandbox" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Left Column: Input + Toolbars (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Quick Presets Menu */}
            <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-3">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                Mẫu công thức nhanh Vật lí 12
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_FORMULAS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputText(preset.code)}
                    title={preset.desc}
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-850/80 rounded-xl text-[10px] font-bold text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* LaTeX Textarea Input Pane */}
            <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Code className="h-3.5 w-3.5 text-cyan-400" />
                  Khu vực soạn thảo LaTeX
                </span>
                <button
                  onClick={() => setInputText("")}
                  className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                  title="Xóa hết ký tự"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập mã công thức LaTeX vào đây (ví dụ: Q = m \cdot c \cdot \Delta t)..."
                rows={5}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl p-4 text-sm font-mono text-cyan-300 placeholder-slate-600 outline-none focus:border-cyan-500 transition-colors shadow-inner resize-none leading-relaxed"
              />

              <div className="text-[9.5px] text-slate-500 font-medium flex items-center justify-between">
                <span>Gợi ý: Bấm các nút ở thư viện ký hiệu bên dưới để chèn nhanh mã LaTeX</span>
                <span className="font-mono text-[9px] uppercase tracking-wider">{inputText.length} ký tự</span>
              </div>
            </div>

            {/* Symbols Library Panel */}
            <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-4">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                Thư viện ký hiệu & Cú pháp nhanh
              </span>

              <div className="space-y-4">
                {SYMBOL_CATEGORIES.map((category, catIdx) => (
                  <div key={catIdx} className="space-y-2">
                    <span className="text-[9px] font-extrabold text-indigo-400 uppercase tracking-widest block">
                      {category.name}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {category.items.map((item, itemIdx) => (
                        <button
                          key={itemIdx}
                          onClick={() => handleInsertText(item.value)}
                          title={item.desc}
                          className="px-2.5 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-[10.5px] font-black text-slate-300 hover:text-cyan-400 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer whitespace-nowrap active:scale-95"
                        >
                          <span className="text-cyan-400 font-mono text-xs">{item.label}</span>
                          <span className="text-[8px] font-medium text-slate-500 block truncate w-full text-center">
                            {item.value}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Real-time Live Render Pane (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-5 flex flex-col justify-between h-full">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
                    Bản xem thử trực tiếp (Real-time Render)
                  </span>

                  {/* Render mode selector */}
                  <div className="flex bg-slate-950 p-0.5 border border-slate-850 rounded-xl text-[9px] font-bold">
                    <button
                      onClick={() => setRenderMode("mathjax")}
                      className={`px-2 py-1 rounded-lg cursor-pointer ${
                        renderMode === "mathjax" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/20" : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      MathJax (LaTeX)
                    </button>
                    <button
                      onClick={() => setRenderMode("normal")}
                      className={`px-2 py-1 rounded-lg cursor-pointer ${
                        renderMode === "normal" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/20" : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Unicode (SGK)
                    </button>
                  </div>
                </div>

                {/* Math Render Display Box */}
                <div className="bg-slate-950 border border-slate-900 rounded-2xl p-8 min-h-[160px] flex items-center justify-center text-center relative overflow-hidden group shadow-inner">
                  {/* Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

                  <div className="relative z-10 w-full overflow-x-auto select-text">
                    {inputText.trim() ? (
                      renderMode === "mathjax" ? (
                        <MathJax inline={false} dynamic={true}>
                          <span className="text-xl sm:text-2xl text-slate-100 font-serif font-black select-all">
                            {`$$${inputText}$$`}
                          </span>
                        </MathJax>
                      ) : (
                        <div className="text-sm sm:text-base text-slate-100 font-black leading-relaxed">
                          <FormattedMathText text={inputText} />
                        </div>
                      )
                    ) : (
                      <span className="text-xs text-slate-500 italic block">
                        Vui lòng nhập công thức ở bảng bên trái để hiển thị xem trước...
                      </span>
                    )}
                  </div>
                </div>

                {/* Pedagogy Note info box */}
                <div className="bg-slate-900/50 border border-slate-850/60 rounded-xl p-3 text-[10.5px] text-slate-400 leading-relaxed font-medium flex gap-2">
                  <Info className="h-4.5 w-4.5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    {renderMode === "mathjax" ? (
                      <span>
                        <strong>Chế độ MathJax:</strong> Sử dụng bộ thư viện chuẩn công thức Toán/Lý quốc tế. Rất phù hợp khi viết đề thi, tài liệu giáo án, hoặc bài viết nghiên cứu khoa học chuyên nghiệp.
                      </span>
                    ) : (
                      <span>
                        <strong>Chế độ Unicode (SGK):</strong> Tự động phân tách và chuyển hóa mã LaTeX sang ký tự Unicode đẹp đẽ. Phù hợp cho việc hiển thị gọn gàng trên mọi trình duyệt web và thiết bị di động.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Panel */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-slate-900">
                <button
                  onClick={handleCopyFormatted}
                  disabled={!inputText.trim()}
                  className="flex-1 py-2.5 bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/10 cursor-pointer active:scale-95"
                >
                  {copiedText ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                  {copiedText ? "Đã sao chép!" : "Sao chép công thức"}
                </button>

                <button
                  onClick={handleCopyRaw}
                  disabled={!inputText.trim()}
                  className="flex-1 py-2.5 bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-800 text-slate-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-slate-850 transition-colors cursor-pointer active:scale-95"
                >
                  {copiedRaw ? <Check className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                  {copiedRaw ? "Đã sao chép!" : "Sao chép mã nguồn LaTeX"}
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {activeTab === "practice" && (
        <div className="bg-slate-900/30 border border-slate-900 rounded-3xl p-6 animate-fade-in space-y-6">
          
          {/* Progress Indicators */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500 animate-bounce" />
              <h3 className="text-xs font-black text-slate-200 uppercase tracking-widest">
                Tiến trình hoàn thành thử thách
              </h3>
            </div>
            
            {/* Progress indicators dots */}
            <div className="flex items-center gap-1.5">
              {PRACTICE_CHALLENGES.map((ch, idx) => {
                const isCompleted = completedChallenges.includes(ch.id);
                const isActive = currentChallengeIdx === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setCurrentChallengeIdx(idx);
                      handleResetChallenge();
                    }}
                    className={`h-6 px-2.5 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center border transition-all cursor-pointer ${
                      isActive
                        ? "bg-cyan-500 text-slate-950 border-cyan-500 font-extrabold shadow-sm shadow-cyan-500/10 scale-105"
                        : isCompleted
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-slate-950 text-slate-500 border-slate-900 hover:text-slate-300"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Challenge Card */}
          {(() => {
            const ch = PRACTICE_CHALLENGES[currentChallengeIdx];
            const isCompleted = completedChallenges.includes(ch.id);

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Challenge prompt (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Cấp độ {currentChallengeIdx + 1} ({ch.xpReward} XP)
                      </span>
                      {isCompleted && (
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Đã vượt qua
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-black text-slate-100 uppercase tracking-wide leading-tight">
                      {ch.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {ch.description}
                    </p>

                    <div className="bg-indigo-950/20 border border-indigo-500/15 rounded-xl p-3.5 text-[10.5px] text-indigo-200 font-medium leading-relaxed">
                      <strong>Yêu cầu:</strong> {ch.prompt}
                    </div>
                  </div>

                  {/* Challenge input box */}
                  <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                        Nhập kết quả LaTeX của bạn
                      </span>
                      <button
                        onClick={handleResetChallenge}
                        className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Xóa hết ký tự"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <textarea
                      ref={textareaRef}
                      value={challengeInput}
                      onChange={(e) => {
                        setChallengeInput(e.target.value);
                        setChallengeFeedback({ status: "idle", message: "" });
                      }}
                      placeholder="Gõ công thức LaTeX vào đây để kiểm tra..."
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3.5 text-xs font-mono text-cyan-300 placeholder-slate-600 outline-none focus:border-cyan-500 transition-colors shadow-inner"
                    />

                    {/* Hint information */}
                    <div className="bg-slate-900/50 rounded-xl p-3 text-[10px] text-slate-400 font-medium leading-relaxed flex gap-2">
                      <AlertCircle className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <strong>Gợi ý gõ:</strong> {ch.hint}
                      </div>
                    </div>

                    {/* Quick Insert Symbols for active challenge */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                        Ký hiệu bổ trợ nhanh cho thử thách này
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["Q", "m", "c", "\\lambda", "\\Delta", "t", "N(t)", "N_0", "e", "\\omega", "x", "A", "\\cos", "\\varphi", "^{4}_{2}\\text{He}", "\\rightarrow", "^{1}_{1}\\text{H}", "^{7}_{3}\\text{Li}", "\\cdot"].map((sym, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleInsertText(sym)}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-[10px] font-mono font-bold text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer active:scale-95"
                          >
                            {sym}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-900">
                      <span className="text-[10px] text-slate-500 font-medium">Nhấn nút bên cạnh để kiểm tra độ chính xác</span>
                      <button
                        onClick={handleVerifyPractice}
                        disabled={!challengeInput.trim()}
                        className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-45 disabled:cursor-not-allowed text-slate-950 font-black rounded-xl text-xs shadow-md shadow-cyan-500/10 transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                      >
                        <Check className="h-4 w-4" />
                        Kiểm tra & So khớp
                      </button>
                    </div>

                  </div>

                </div>

                {/* Challenge preview / feedback pane (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Visual Render Preview Card */}
                  <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-4">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                      Hiển thị trực quan theo thời gian thực
                    </span>

                    <div className="bg-slate-950 border border-slate-900 rounded-xl p-6 min-h-[120px] flex items-center justify-center text-center relative shadow-inner overflow-x-auto select-none">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                      
                      <div className="relative z-10">
                        {challengeInput.trim() ? (
                          <MathJax inline={false} dynamic={true}>
                            <span className="text-lg sm:text-xl text-slate-100 font-serif font-black">
                              {`$$${challengeInput}$$`}
                            </span>
                          </MathJax>
                        ) : (
                          <span className="text-[11px] text-slate-600 italic">
                            Công thức của bạn sẽ xuất hiện ở đây...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Feedback response panel */}
                  {challengeFeedback.status !== "idle" && (
                    <div className={`p-4 rounded-2xl border animate-fade-in space-y-3 ${
                      challengeFeedback.status === "correct"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                        : "bg-red-500/10 border-red-500/20 text-red-300"
                    }`}>
                      <p className="text-xs font-bold leading-normal">
                        {challengeFeedback.message}
                      </p>

                      {challengeFeedback.status === "correct" && (
                        <div className="flex justify-end pt-1">
                          {currentChallengeIdx < PRACTICE_CHALLENGES.length - 1 ? (
                            <button
                              onClick={handleNextChallenge}
                              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-lg text-[10px] uppercase tracking-wider cursor-pointer flex items-center gap-1 transition-transform hover:translate-x-0.5"
                            >
                              Thử thách tiếp theo
                              <ChevronRight className="h-3 w-3" />
                            </button>
                          ) : (
                            <div className="text-[10px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                              🏆 Chúc mừng! Bạn đã hoàn thành toàn bộ khóa luyện tập LaTeX!
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                </div>

              </div>
            );
          })()}

        </div>
      )}

      {activeTab === "cheatsheet" && (
        <div className="bg-slate-900/30 border border-slate-900 rounded-3xl p-6 animate-fade-in space-y-6 text-slate-300">
          
          <div className="border-b border-slate-900 pb-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              Bảng tra cứu cú pháp LaTeX nhanh trong Vật lí 12
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">
              Dành cho giáo viên để soạn thảo đề thi kiểm tra, và học sinh làm quen với định dạng biểu thức toán học theo chuẩn quốc tế.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Syntax Rules Left Card */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-wider block">
                Cú pháp cơ bản & Phép toán
              </span>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11.5px] border-collapse">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-900">
                      <th className="pb-2 font-extrabold">Cách hiển thị</th>
                      <th className="pb-2 font-extrabold">Cú pháp LaTeX</th>
                      <th className="pb-2 font-extrabold">Ý nghĩa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/50 font-medium">
                    <tr>
                      <td className="py-2.5 font-serif font-bold text-slate-100">a + b = c</td>
                      <td className="py-2.5 font-mono text-cyan-300">{"a + b = c"}</td>
                      <td className="py-2.5 text-slate-400 text-[10px]">Cộng trừ nhân chia thông thường</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-serif font-bold text-slate-100">x · y</td>
                      <td className="py-2.5 font-mono text-cyan-300">{"x \\cdot y"}</td>
                      <td className="py-2.5 text-slate-400 text-[10px]">Dấu nhân chấm</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-serif font-bold text-slate-100">x × y</td>
                      <td className="py-2.5 font-mono text-cyan-300">{"x \\times y"}</td>
                      <td className="py-2.5 text-slate-400 text-[10px]">Dấu nhân chéo</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-serif font-bold text-slate-100">a/b</td>
                      <td className="py-2.5 font-mono text-cyan-300">{"\\frac{a}{b}"}</td>
                      <td className="py-2.5 text-slate-400 text-[10px]">Phân số bọc trong ngoặc nhọn</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-serif font-bold text-slate-100">x₁</td>
                      <td className="py-2.5 font-mono text-cyan-300">{"x_{1}"}</td>
                      <td className="py-2.5 text-slate-400 text-[10px]">Chỉ số dưới (subscript)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-serif font-bold text-slate-100">x²</td>
                      <td className="py-2.5 font-mono text-cyan-300">{"x^{2}"}</td>
                      <td className="py-2.5 text-slate-400 text-[10px]">Số mũ lũy thừa (superscript)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-serif font-bold text-slate-100">√x</td>
                      <td className="py-2.5 font-mono text-cyan-300">{"\\sqrt{x}"}</td>
                      <td className="py-2.5 text-slate-400 text-[10px]">Căn bậc hai</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scientific Formulas Right Card */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-wider block">
                Vật lí 12 nâng cao & Hạt nhân
              </span>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11.5px] border-collapse">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-900">
                      <th className="pb-2 font-extrabold">Cách hiển thị</th>
                      <th className="pb-2 font-extrabold">Cú pháp LaTeX</th>
                      <th className="pb-2 font-extrabold">Ý nghĩa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/50 font-medium">
                    <tr>
                      <td className="py-2.5 font-serif font-bold text-slate-100">Δt</td>
                      <td className="py-2.5 font-mono text-cyan-300">{"\\Delta t"}</td>
                      <td className="py-2.5 text-slate-400 text-[10px]">Chữ Hy Lạp hoa Delta</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-serif font-bold text-slate-100">λ, ω, φ</td>
                      <td className="py-2.5 font-mono text-cyan-300">{"\\lambda, \\omega, \\varphi"}</td>
                      <td className="py-2.5 text-slate-400 text-[10px]">Chữ Hy Lạp thường</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-serif font-bold text-slate-100">¹⁴₆C</td>
                      <td className="py-2.5 font-mono text-cyan-300">{"^{14}_{6}\\text{C}"}</td>
                      <td className="py-2.5 text-slate-400 text-[10px]">Hạt nhân phóng xạ Carbon-14</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-serif font-bold text-slate-100">N(t)</td>
                      <td className="py-2.5 font-mono text-cyan-300">{"N_0 \\cdot 2^{-\\frac{t}{T}}"}</td>
                      <td className="py-2.5 text-slate-400 text-[10px]">Hàm số lượng rã mũ 2</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-serif font-bold text-slate-100">p ~ 1/V</td>
                      <td className="py-2.5 font-mono text-cyan-300">{"p \\propto \\frac{1}{V}"}</td>
                      <td className="py-2.5 text-slate-400 text-[10px]">Ký hiệu tỉ lệ thuận/nghịch</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-serif font-bold text-slate-100">E = mc²</td>
                      <td className="py-2.5 font-mono text-cyan-300">{"E = m \\cdot c^2"}</td>
                      <td className="py-2.5 text-slate-400 text-[10px]">Hệ thức Einstein nổi tiếng</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Quick Copy Snippets */}
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-4">
            <span className="text-xs font-black text-amber-500 uppercase tracking-wider block">
              💡 Hướng dẫn copy dán vào Hệ thống Tạo & Khảo Thí Đề
            </span>
            <div className="text-xs leading-relaxed space-y-2">
              <p>
                Để công thức hiển thị đẹp mắt trên các đề thi của hệ thống, quý thầy cô giáo viên chỉ cần bao quanh biểu thức bằng cặp dấu đô-la <code className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-amber-400 font-mono">$$</code> ở đầu và cuối.
              </p>
              <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl font-mono text-[11px] text-slate-300 space-y-2 leading-normal">
                <div className="text-slate-500 font-semibold mb-1 uppercase text-[9px]">// Ví dụ câu hỏi trắc nghiệm gõ trong file Excel/Ngân hàng đề:</div>
                <div>Một con lắc lò xo dao động điều hòa theo phương trình <span className="text-amber-400">$$x = A \cdot \cos(\omega \cdot t + \varphi)$$</span>. Tính chu kì dao động riêng...</div>
              </div>
              <p className="text-[11px] text-slate-400">
                Hệ thống sẽ tự động chuyển hóa biểu thức nằm trong cặp đô-la sang dạng công thức toán học sắc nét của MathJax.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
