import { useState, useMemo } from "react";
import { Volume2, Sparkles, BookOpen, Check, AlertCircle, Search, X, Calculator, Bookmark, Filter, Layers } from "lucide-react";
import { BILINGUAL_GLOSSARY, VocabularyWord } from "../types";
import { SmartMessageRenderer } from "./SmartMessageRenderer";
import { FormattedMathText } from "./FormattedMathText";

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, search }: { text: string; search: string }) {
  if (!search.trim()) return <>{text}</>;
  try {
    const term = search.trim();
    const regex = new RegExp(`(${escapeRegExp(term)})`, "gi");
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark
              key={i}
              className="bg-cyan-500/30 text-cyan-200 font-semibold rounded px-0.5"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  } catch (e) {
    return <>{text}</>;
  }
}

export interface PhysicsFormula {
  id: string;
  name: string;
  expression: string;
  category: string;
  description: string;
  variables: { symbol: string; meaning: string }[];
}

export const PHYSICS_FORMULAS: PhysicsFormula[] = [
  // --- CHƯƠNG I: VẬT LÍ NHIỆT ---
  {
    id: "temp-conv",
    name: "Công thức chuyển đổi thang nhiệt độ",
    expression: "T = t + 273",
    category: "Vật lí nhiệt",
    description: "Công thức chuyển đổi giữa thang nhiệt độ Celsius (t) và thang nhiệt độ tuyệt đối Kelvin (T).",
    variables: [
      { symbol: "T", meaning: "Nhiệt độ tuyệt đối (đơn vị: K)" },
      { symbol: "t", meaning: "Nhiệt độ Celsius (đơn vị: oC)" }
    ]
  },
  {
    id: "heat-temp",
    name: "Nhiệt lượng thay đổi nhiệt độ",
    expression: "Q = m_khí . c_nhiệt . \Delta t",
    category: "Vật lí nhiệt",
    description: "Nhiệt lượng cần cung cấp hoặc tỏa ra khi thay đổi nhiệt độ của một vật mà không thay đổi trạng thái cấu trúc vật chất.",
    variables: [
      { symbol: "Q", meaning: "Nhiệt lượng hấp thụ hoặc tỏa ra (đơn vị: J)" },
      { symbol: "m_khí", meaning: "Khối lượng của vật (đơn vị: kg)" },
      { symbol: "c_nhiệt", meaning: "Nhiệt dung riêng của chất cấu tạo nên vật (đơn vị: J/(kg.K))" },
      { symbol: "\Delta t", meaning: "Độ biến thiên nhiệt độ, \Delta t = t_sau - t_dau (đơn vị: oC hoặc K)" }
    ]
  },
  {
    id: "latent-fusion",
    name: "Nhiệt lượng nóng chảy riêng",
    expression: "Q = \lambda . m",
    category: "Vật lí nhiệt",
    description: "Nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn một khối lượng chất rắn kết tinh ở nhiệt độ nóng chảy xác định.",
    variables: [
      { symbol: "Q", meaning: "Nhiệt lượng nóng chảy hấp thụ (đơn vị: J)" },
      { symbol: "\lambda", meaning: "Nhiệt nóng chảy riêng của chất (đơn vị: J/kg)" },
      { symbol: "m", meaning: "Khối lượng chất rắn nóng chảy (đơn vị: kg)" }
    ]
  },
  {
    id: "latent-vap",
    name: "Nhiệt lượng hóa hơi riêng",
    expression: "Q = L . m",
    category: "Vật lí nhiệt",
    description: "Nhiệt lượng cần cung cấp cho một khối lượng chất lỏng để hóa hơi hoàn toàn ở nhiệt độ sôi không đổi.",
    variables: [
      { symbol: "Q", meaning: "Nhiệt lượng hóa hơi hấp thụ (đơn vị: J)" },
      { symbol: "L", meaning: "Nhiệt hóa hơi riêng của chất lỏng (đơn vị: J/kg)" },
      { symbol: "m", meaning: "Khối lượng chất lỏng hóa hơi (đơn vị: kg)" }
    ]
  },
  {
    id: "thermo-1",
    name: "Định luật I Nhiệt động lực học",
    expression: "\Delta U = Q + A",
    category: "Vật lí nhiệt",
    description: "Mối liên hệ giữa độ biến thiên nội năng của hệ với công và nhiệt lượng mà hệ trao đổi với môi trường bên ngoài.",
    variables: [
      { symbol: "\Delta U", meaning: "Độ biến thiên nội năng của hệ vật lý (đơn vị: J)" },
      { symbol: "Q", meaning: "Nhiệt lượng hệ nhận (Q > 0) hoặc truyền đi (Q < 0) (đơn vị: J)" },
      { symbol: "A", meaning: "Công hệ nhận (A > 0) hoặc thực hiện lên bên ngoài (A < 0) (đơn vị: J)" }
    ]
  },

  // --- CHƯƠNG II: KHÍ LÍ TƯỞNG ---
  {
    id: "boyle",
    name: "Định luật Boyle (Đẳng nhiệt)",
    expression: "p_1 . V_1 = p_2 . V_2",
    category: "Khí lí tưởng",
    description: "Trong quá trình đẳng nhiệt của một lượng khí lí tưởng xác định, tích của áp suất và thể tích khí là một hằng số.",
    variables: [
      { symbol: "p_1, p_2", meaning: "Áp suất của khí ở trạng thái 1 và 2 (đơn vị: Pa hoặc atm, bar)" },
      { symbol: "V_1, V_2", meaning: "Thể tích của khí ở trạng thái 1 và 2 (đơn vị: m^3 hoặc L, dm^3)" }
    ]
  },
  {
    id: "charles",
    name: "Định luật Charles (Đẳng áp)",
    expression: "V_1 / T_1 = V_2 / T_2",
    category: "Khí lí tưởng",
    description: "Trong quá trình đẳng áp của một lượng khí lí tưởng xác định, thể tích khí tỉ lệ thuận với nhiệt độ tuyệt đối của nó.",
    variables: [
      { symbol: "V_1, V_2", meaning: "Thể tích khí ở trạng thái 1 và 2 (đơn vị: m^3 hoặc L)" },
      { symbol: "T_1, T_2", meaning: "Nhiệt độ tuyệt đối ở trạng thái 1 và 2 (đơn vị: K)" }
    ]
  },
  {
    id: "gas-state",
    name: "Phương trình trạng thái khí lí tưởng",
    expression: "p . V = n . R . T",
    category: "Khí lí tưởng",
    description: "Phương trình liên hệ tất cả các đại lượng đặc trưng cho trạng thái của một lượng khí lí tưởng.",
    variables: [
      { symbol: "p", meaning: "Áp suất khí (đơn vị: Pa)" },
      { symbol: "V", meaning: "Thể tích khí (đơn vị: m^3)" },
      { symbol: "n", meaning: "Số mol khí, n = m / M (đơn vị: mol)" },
      { symbol: "R", meaning: "Hằng số khí lí tưởng, R \u2248 8.31 J/(mol.K)" },
      { symbol: "T", meaning: "Nhiệt độ tuyệt đối (đơn vị: K)" }
    ]
  },
  {
    id: "gas-density",
    name: "Mật độ phân tử chất khí",
    expression: "\mu = N / V",
    category: "Khí lí tưởng",
    description: "Số lượng phân tử chất khí có trong một đơn vị thể tích không gian chứa khí.",
    variables: [
      { symbol: "\mu", meaning: "Mật độ phân tử khí (đơn vị: phân tử/m^3)" },
      { symbol: "N", meaning: "Tổng số phân tử chất khí trong hệ" },
      { symbol: "V", meaning: "Thể tích của bình chứa khí (đơn vị: m^3)" }
    ]
  },
  {
    id: "micro-press",
    name: "Áp suất khí theo thuyết động học phân tử",
    expression: "p = (1/3) . \mu . m_0 . v^2",
    category: "Khí lí tưởng",
    description: "Liên hệ giữa áp suất khí vĩ mô và động học vi mô của các hạt phân tử va chạm với thành bình.",
    variables: [
      { symbol: "p", meaning: "Áp suất chất khí vĩ mô (đơn vị: Pa)" },
      { symbol: "\mu", meaning: "Mật độ phân tử chất khí (đơn vị: phân tử/m^3)" },
      { symbol: "m_0", meaning: "Khối lượng của một phân tử chất khí (đơn vị: kg)" },
      { symbol: "v^2", meaning: "Tốc độ bình phương trung bình của các phân tử khí (đơn vị: m^2/s^2)" }
    ]
  },
  {
    id: "kinetic-energy",
    name: "Động năng tịnh tiến trung bình phân tử",
    expression: "E_d = (3/2) . k . T",
    category: "Khí lí tưởng",
    description: "Động năng chuyển động tịnh tiến hỗn loạn trung bình của một phân tử khí lí tưởng tỉ lệ trực tiếp với nhiệt độ tuyệt đối của khí.",
    variables: [
      { symbol: "E_d", meaning: "Động năng tịnh tiến trung bình của phân tử (đơn vị: J)" },
      { symbol: "k", meaning: "Hằng số Boltzmann, k \u2248 1.38 . 10^-23 J/K" },
      { symbol: "T", meaning: "Nhiệt độ tuyệt đối của khối khí (đơn vị: K)" }
    ]
  },

  // --- CHƯƠNG III: TỪ TRƯỜNG ---
  {
    id: "ampere-force",
    name: "Lực từ tác dụng lên đoạn dây dẫn",
    expression: "F = B . I . L . sin(\theta)",
    category: "Từ trường",
    description: "Lực từ Am-pe tác dụng lên dây dẫn thẳng có chiều dài L mang cường độ dòng điện I đặt trong một từ trường đều có cảm ứng từ B.",
    variables: [
      { symbol: "F", meaning: "Lực từ tác dụng lên đoạn dây dẫn (đơn vị: N)" },
      { symbol: "B", meaning: "Cảm ứng từ của từ trường đều (đơn vị: T - Tesla)" },
      { symbol: "I", meaning: "Cường độ dòng điện chạy qua dây dẫn (đơn vị: A)" },
      { symbol: "L", meaning: "Chiều dài của đoạn dây dẫn nằm trong từ trường (đơn vị: m)" },
      { symbol: "\theta", meaning: "Góc hợp bởi đoạn dây dẫn thẳng mang dòng điện và vectơ cảm ứng từ B" }
    ]
  },
  {
    id: "magnetic-flux",
    name: "Từ thông qua một diện tích",
    expression: "\Phi = B . S . cos(\alpha)",
    category: "Từ trường",
    description: "Đại lượng đo lường lượng đường sức từ xuyên qua một diện tích bề mặt S đặt nghiêng góc so với từ trường đều B.",
    variables: [
      { symbol: "\Phi", meaning: "Từ thông đi qua khung dây (đơn vị: Wb - Weber)" },
      { symbol: "B", meaning: "Cảm ứng từ của từ trường đều (đơn vị: T)" },
      { symbol: "S", meaning: "Diện tích của bề mặt phẳng khung dây (đơn vị: m^2)" },
      { symbol: "\alpha", meaning: "Góc hợp bởi vectơ cảm ứng từ B và vectơ pháp tuyến vuông góc của mặt phẳng diện tích S" }
    ]
  },
  {
    id: "induction-emf",
    name: "Suất điện động cảm ứng (Định luật Faraday)",
    expression: "e_c = - \Delta \Phi / \Delta t",
    category: "Từ trường",
    description: "Suất điện động cảm ứng sinh ra trong một mạch kín tỉ lệ với tốc độ biến thiên từ thông gửi qua mạch đó.",
    variables: [
      { symbol: "e_c", meaning: "Suất điện động cảm ứng xuất hiện trong vòng dây (đơn vị: V)" },
      { symbol: "\Delta \Phi", meaning: "Độ biến thiên từ thông qua mạch kín, \Delta \Phi = \Phi_sau - \Phi_dau (đơn vị: Wb)" },
      { symbol: "\Delta t", meaning: "Khoảng thời gian từ thông biến đổi (đơn vị: s)" },
      { symbol: "- (Dấu trừ)", meaning: "Thể hiện định luật Lenz về chiều dòng điện cảm ứng chống lại nguyên nhân sinh ra nó" }
    ]
  },

  // --- CHƯƠNG IV: VẬT LÍ HẠT NHÂN ---
  {
    id: "einstein-energy",
    name: "Hệ thức liên hệ khối lượng và năng lượng Einstein",
    expression: "E = m . c^2",
    category: "Vật lí hạt nhân",
    description: "Hệ thức nổi tiếng của Einstein thể hiện mối liên hệ tương đương trực tiếp giữa khối lượng nghỉ của vật chất và năng lượng bên trong.",
    variables: [
      { symbol: "E", meaning: "Năng lượng toàn phần tương ứng (đơn vị: J hoặc MeV)" },
      { symbol: "m", meaning: "Khối lượng nghỉ hoặc khối lượng chuyển động của vật thể (đơn vị: kg hoặc u)" },
      { symbol: "c", meaning: "Tốc độ ánh sáng trong chân không, c \u2248 3 . 10^8 m/s (ở hệ đơn vị u, 1 u.c^2 \u2248 931.5 MeV)" }
    ]
  },
  {
    id: "mass-defect",
    name: "Độ hụt khối của hạt nhân",
    expression: "\Delta m = (Z . m_p + (A - Z) . m_n) - m_hn",
    category: "Vật lí hạt nhân",
    description: "Sự chênh lệch giữa tổng khối lượng các hạt cấu tạo rời rạc (protons & neutrons) so với khối lượng hạt nhân sau khi liên kết bền vững.",
    variables: [
      { symbol: "\Delta m", meaning: "Độ hụt khối lượng của hạt nhân (đơn vị: u)" },
      { symbol: "Z", meaning: "Số proton trong hạt nhân (Số hiệu nguyên tử)" },
      { symbol: "A", meaning: "Số khối của hạt nhân (Tổng số proton và neutron)" },
      { symbol: "m_p", meaning: "Khối lượng nghỉ của một hạt proton tự do, m_p \u2248 1.007276 u" },
      { symbol: "m_n", meaning: "Khối lượng nghỉ của một hạt neutron tự do, m_n \u2248 1.008665 u" },
      { symbol: "m_hn", meaning: "Khối lượng đo đạc thực tế của hạt nhân liên kết (đơn vị: u)" }
    ]
  },
  {
    id: "binding-energy",
    name: "Năng lượng liên kết hạt nhân",
    expression: "E_lk = \Delta m . c^2",
    category: "Vật lí hạt nhân",
    description: "Năng lượng giải phóng khi các nuclôn riêng rẽ liên kết tạo thành hạt nhân, hoặc năng lượng tối thiểu cần để tách rời các nuclôn.",
    variables: [
      { symbol: "E_lk", meaning: "Năng lượng liên kết hạt nhân (đơn vị: MeV)" },
      { symbol: "\Delta m", meaning: "Độ hụt khối của hạt nhân (đơn vị: u)" },
      { symbol: "c^2", meaning: "Hệ số chuyển đổi Einstein, với 1 u.c^2 \u2248 931.5 MeV" }
    ]
  },
  {
    id: "specific-binding-energy",
    name: "Năng lượng liên kết riêng",
    expression: "E_lkr = E_lk / A",
    category: "Vật lí hạt nhân",
    description: "Năng lượng liên kết trung bình tính trên mỗi hạt nuclôn. Đại lượng này đặc trưng cho độ bền vững của hạt nhân (nút thắt bền vững ở 50 < A < 95).",
    variables: [
      { symbol: "E_lkr", meaning: "Năng lượng liên kết riêng (đơn vị: MeV/nuclôn)" },
      { symbol: "E_lk", meaning: "Năng lượng liên kết toàn phần của hạt nhân (đơn vị: MeV)" },
      { symbol: "A", meaning: "Số khối của hạt nhân (Tổng số nuclôn)" }
    ]
  },
  {
    id: "radioactive-law-n",
    name: "Định luật phóng xạ (Theo số hạt)",
    expression: "N_t = N_0 . 2^(-t / T)",
    category: "Vật lí hạt nhân",
    description: "Định luật phóng xạ mô tả số hạt nhân chưa bị phân rã còn lại của một nguồn phóng xạ sau khoảng thời gian t.",
    variables: [
      { symbol: "N_t", meaning: "Số lượng hạt nhân mẹ còn lại chưa bị phân rã ở thời điểm t" },
      { symbol: "N_0", meaning: "Số lượng hạt nhân ban đầu ở thời điểm t = 0" },
      { symbol: "t", meaning: "Khoảng thời gian phân rã trôi qua (đơn vị: giây, ngày, năm...)" },
      { symbol: "T", meaning: "Chu kỳ bán rã của nguyên tố phóng xạ đó (cùng đơn vị với t)" }
    ]
  },
  {
    id: "radioactive-law-m",
    name: "Định luật phóng xạ (Theo khối lượng)",
    expression: "m_t = m_0 . e^(-\lambda . t)",
    category: "Vật lí hạt nhân",
    description: "Định luật phân rã phóng xạ biểu diễn dưới dạng khối lượng còn lại theo hàm mũ số tự nhiên e.",
    variables: [
      { symbol: "m_t", meaning: "Khối lượng chất phóng xạ còn lại chưa biến đổi ở thời điểm t (đơn vị: g, kg)" },
      { symbol: "m_0", meaning: "Khối lượng chất phóng xạ ban đầu ở thời điểm t = 0 (đơn vị: g, kg)" },
      { symbol: "\lambda", meaning: "Hằng số phóng xạ của chất đó, \lambda = ln(2) / T \u2248 0.693 / T" },
      { symbol: "t", meaning: "Khoảng thời gian phân rã chất phóng xạ đã trôi qua" }
    ]
  }
];

export const TOPIC_STYLES: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  "Vật lí nhiệt": {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    accent: "amber",
  },
  "Khí lí tưởng": {
    bg: "bg-teal-500/10",
    text: "text-teal-400",
    border: "border-teal-500/20",
    accent: "teal",
  },
  "Từ trường": {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    border: "border-sky-500/20",
    accent: "sky",
  },
  "Vật lí hạt nhân": {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    border: "border-indigo-500/20",
    accent: "indigo",
  }
};

export function Glossary({ onEarnXP }: { onEarnXP: (xp: number) => void }) {
  const [activeTab, setActiveTab] = useState<"dictionary" | "formulas">("dictionary");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchScope, setSearchScope] = useState<"all" | "term" | "definition">("all");
  const [selectedWord, setSelectedWord] = useState<VocabularyWord | null>(BILINGUAL_GLOSSARY[0]);
  const [quizWord, setQuizWord] = useState<VocabularyWord>(BILINGUAL_GLOSSARY[1]);
  const [quizFeedback, setQuizFeedback] = useState<"correct" | "incorrect" | "">("");

  const [formulaSearch, setFormulaSearch] = useState("");
  const [selectedFormulaCat, setSelectedFormulaCat] = useState("Tất cả");
  const [bookmarkedFormulas, setBookmarkedFormulas] = useState<string[]>([]);

  const formulaCategories = ["Tất cả", "Vật lí nhiệt", "Khí lí tưởng", "Từ trường", "Vật lí hạt nhân", "Đã lưu"];

  const toggleBookmark = (id: string) => {
    setBookmarkedFormulas(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
    onEarnXP(5); // Reward 5 XP for bookmarking a formula!
  };

  const filteredFormulas = useMemo(() => {
    return PHYSICS_FORMULAS.filter((formula) => {
      // Category filter
      if (selectedFormulaCat !== "Tất cả") {
        if (selectedFormulaCat === "Đã lưu") {
          if (!bookmarkedFormulas.includes(formula.id)) return false;
        } else {
          if (formula.category !== selectedFormulaCat) return false;
        }
      }

      // Search filter
      if (!formulaSearch.trim()) return true;
      const term = formulaSearch.toLowerCase().trim();
      return (
        formula.name.toLowerCase().includes(term) ||
        formula.expression.toLowerCase().includes(term) ||
        formula.description.toLowerCase().includes(term)
      );
    });
  }, [formulaSearch, selectedFormulaCat, bookmarkedFormulas]);

  // Speak pronunciation
  const speakEnglish = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      onEarnXP(5); // Reward 5 XP for practicing pronunciation
    } else {
      alert("Trình duyệt không hỗ trợ phát âm.");
    }
  };

  const categories = useMemo(() => {
    return ["Tất cả", ...Array.from(new Set(BILINGUAL_GLOSSARY.map((w) => w.category)))];
  }, []);

  const filteredWords = useMemo(() => {
    return BILINGUAL_GLOSSARY.filter((word) => {
      // Category Filter
      if (selectedCategory !== "Tất cả" && word.category !== selectedCategory) {
        return false;
      }

      // Search Term Filter
      if (!searchTerm.trim()) {
        return true;
      }

      const term = searchTerm.toLowerCase().trim();
      const matchTerm =
        word.vietnamese.toLowerCase().includes(term) ||
        word.english.toLowerCase().includes(term);
      const matchDefinition = word.definition.toLowerCase().includes(term);

      if (searchScope === "term") {
        return matchTerm;
      } else if (searchScope === "definition") {
        return matchDefinition;
      } else {
        return matchTerm || matchDefinition;
      }
    });
  }, [searchTerm, selectedCategory, searchScope]);

  const checkQuiz = (option: string) => {
    if (option === quizWord.vietnamese) {
      setQuizFeedback("correct");
      onEarnXP(15);
    } else {
      setQuizFeedback("incorrect");
    }
  };

  const nextQuiz = () => {
    const nextIdx = (BILINGUAL_GLOSSARY.indexOf(quizWord) + 1) % BILINGUAL_GLOSSARY.length;
    setQuizWord(BILINGUAL_GLOSSARY[nextIdx]);
    setQuizFeedback("");
  };

  // Generate options for mini-quiz
  const getQuizOptions = () => {
    const correctAnswer = quizWord.vietnamese;
    const distinctWrong = BILINGUAL_GLOSSARY.filter((w) => w.vietnamese !== correctAnswer)
      .map((w) => w.vietnamese)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    return [correctAnswer, ...distinctWrong].sort();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sub-tab Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-cyan-400" />
            Thư viện Kiến thức & Tra cứu Vật lí 12
          </h3>
          <p className="text-xs text-slate-400 mt-1">Tra cứu nhanh các thuật ngữ song ngữ Anh-Việt hoặc ôn tập hệ thống công thức vật lí chuẩn khoa học.</p>
        </div>
        <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800/80 self-start sm:self-auto shrink-0 shadow-[2px_2px_10px_rgba(0,0,0,0.4)]">
          <button
            type="button"
            onClick={() => setActiveTab("dictionary")}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "dictionary"
                ? "bg-cyan-500 text-slate-950 shadow-[0_1.5px_4px_rgba(6,182,212,0.2)] font-black"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Từ điển Song ngữ
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("formulas")}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "formulas"
                ? "bg-cyan-500 text-slate-950 shadow-[0_1.5px_4px_rgba(6,182,212,0.2)] font-black"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <Calculator className="h-3.5 w-3.5" />
            Sổ tay Công thức 12
          </button>
        </div>
      </div>

      {activeTab === "dictionary" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Word List */}
          <div className="lg:col-span-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 flex flex-col h-[520px]">
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-cyan-400" />
                Thuật ngữ Vật lí Anh - Việt
              </h3>
              
              {/* Search box with icons */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm thuật ngữ hoặc định nghĩa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl pl-8.5 pr-8 py-2.5 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                    title="Xóa tìm kiếm"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Search scope toggles */}
            <div className="mb-3 flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-400 pl-2 font-medium">Khung tìm:</span>
              <div className="flex flex-1 gap-1">
                <button
                  type="button"
                  onClick={() => setSearchScope("all")}
                  className={`flex-1 text-[10px] font-bold py-1 px-1.5 rounded transition-all ${
                    searchScope === "all"
                      ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                      : "text-slate-400 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  Tất cả
                </button>
                <button
                  type="button"
                  onClick={() => setSearchScope("term")}
                  className={`flex-1 text-[10px] font-bold py-1 px-1.5 rounded transition-all ${
                    searchScope === "term"
                      ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                      : "text-slate-400 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  Thuật ngữ
                </button>
                <button
                  type="button"
                  onClick={() => setSearchScope("definition")}
                  className={`flex-1 text-[10px] font-bold py-1 px-1.5 rounded transition-all ${
                    searchScope === "definition"
                      ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                      : "text-slate-400 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  Định nghĩa
                </button>
              </div>
            </div>

            {/* Categories Horizontal Scroll */}
            <div className="mb-3 flex items-center gap-1.5">
              <div className="flex gap-1 overflow-x-auto pb-1 custom-scrollbar no-scrollbar w-full whitespace-nowrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[9px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                      selectedCategory === cat
                        ? "bg-cyan-500 text-slate-950 border-cyan-400"
                        : "bg-slate-950/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Result summary */}
            <div className="text-[10px] text-slate-400 mb-2 font-medium px-1 flex justify-between">
              <span>Tìm thấy {filteredWords.length} thuật ngữ</span>
              {(searchTerm || selectedCategory !== "Tất cả" || searchScope !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Tất cả");
                    setSearchScope("all");
                  }}
                  className="text-cyan-400 hover:underline hover:text-cyan-300 font-bold"
                >
                  Đặt lại bộ lọc
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {filteredWords.length > 0 ? (
                filteredWords.map((word) => (
                  <button
                    key={word.id}
                    type="button"
                    onClick={() => setSelectedWord(word)}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex justify-between items-center ${
                      selectedWord?.id === word.id
                        ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"
                        : "bg-slate-950/40 border-slate-800 hover:bg-slate-950/80 hover:border-slate-700 text-slate-300"
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="font-semibold truncate">
                        <Highlight text={word.english} search={searchTerm} />
                      </div>
                      <div className="text-slate-400 text-[10px] mt-0.5 truncate">
                        <Highlight text={word.vietnamese} search={searchTerm} />
                      </div>
                    </div>
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-medium shrink-0">
                      <Highlight text={word.category} search={searchTerm} />
                    </span>
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-slate-950/20 rounded-xl border border-slate-800/60 border-dashed">
                  <AlertCircle className="h-8 w-8 text-slate-600 mb-2" />
                  <span className="text-xs text-slate-400 font-bold">Không tìm thấy thuật ngữ</span>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                    Thử kiểm tra chính tả hoặc đổi từ khóa/bộ lọc tìm kiếm khác nhé!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Detail & Flashcard & Mini quiz */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Word Detail Panel */}
            {selectedWord && (
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex justify-between items-start border-b border-slate-800 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                      <Highlight text={selectedWord.category} search={searchTerm} />
                    </span>
                    <h2 className="text-2xl font-bold text-white mt-3 flex items-center gap-2">
                      <Highlight text={selectedWord.english} search={searchTerm} />
                      <button
                        onClick={() => speakEnglish(selectedWord.english)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 text-slate-400 rounded-lg transition-colors cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </h2>
                    <p className="text-xs text-slate-400 font-mono mt-1">{selectedWord.ipa} (Phát âm Anh - Mỹ)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Định nghĩa tiếng Việt</h4>
                    <div className="text-sm text-slate-200 leading-relaxed bg-slate-950/40 border border-slate-800/60 p-3 rounded-xl">
                      <SmartMessageRenderer content={selectedWord.definition} isLightMode={false} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950/30 border border-slate-800/80 p-3 rounded-xl">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Example (English)</h4>
                      <div className="text-xs text-slate-300 italic mt-1.5 leading-relaxed">
                        <SmartMessageRenderer content={`"${selectedWord.exampleEn}"`} isLightMode={false} />
                      </div>
                    </div>
                    <div className="bg-slate-950/30 border border-slate-800/80 p-3 rounded-xl">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ví dụ (Tiếng Việt)</h4>
                      <div className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        <SmartMessageRenderer content={`"${selectedWord.exampleVi}"`} isLightMode={false} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-[-30%] right-[-10%] w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
              </div>
            )}

            {/* Mini Vocabulary Quiz */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
                Mini Quiz: Thử thách thuật ngữ Song ngữ Vật lí 12
              </h3>
              <p className="text-xs text-slate-400 mb-4">Chọn bản dịch tiếng Việt chính xác của thuật ngữ dưới đây để ghi thêm 15 XP:</p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center mb-4">
                <span className="text-xs text-slate-500 block uppercase font-mono tracking-widest">THUẬT NGỮ CẦN DỊCH:</span>
                <span className="text-xl font-bold text-amber-400 mt-1 block">{quizWord.english}</span>
                <div className="text-[10px] text-slate-400 block italic mt-1.5 font-mono">
                  <SmartMessageRenderer content={`"${quizWord.exampleEn}"`} isLightMode={false} />
                </div>
              </div>

              {quizFeedback === "" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {getQuizOptions().map((opt, index) => (
                    <button
                      key={index}
                      onClick={() => checkQuiz(opt)}
                      className="p-3 bg-slate-950 border border-slate-800 hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:text-cyan-400 rounded-xl text-xs font-semibold transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center p-2 bg-slate-950 rounded-xl border border-slate-800">
                  {quizFeedback === "correct" ? (
                    <div className="text-emerald-400 flex flex-col items-center">
                      <Check className="h-8 w-8 bg-emerald-500/20 p-1.5 rounded-full mb-1 animate-bounce" />
                      <span className="text-xs font-bold">Chính xác! Bạn nhận được +15 XP</span>
                      <p className="text-[11px] text-slate-400 mt-1">{quizWord.english} có nghĩa là: {quizWord.vietnamese}</p>
                    </div>
                  ) : (
                    <div className="text-red-400 flex flex-col items-center">
                      <AlertCircle className="h-8 w-8 bg-red-500/20 p-1.5 rounded-full mb-1" />
                      <span className="text-xs font-bold">Rất tiếc, chưa đúng rồi!</span>
                      <p className="text-[11px] text-slate-400 mt-1">Đáp án chính xác là: {quizWord.vietnamese}</p>
                    </div>
                  )}
                  <button
                    onClick={nextQuiz}
                    className="mt-3 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg text-[11px] font-semibold transition-colors"
                  >
                    Tiếp tục thử thách
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Formula Cheat Sheet View */
        <div className="flex flex-col gap-6">
          {/* Search and Filters for formulas */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-5 rounded-2xl">
            {/* Search inputs */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm tên công thức, ký hiệu hoặc mô tả..."
                value={formulaSearch}
                onChange={(e) => setFormulaSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl pl-9 pr-8 py-2.5 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
              {formulaSearch && (
                <button
                  onClick={() => setFormulaSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                  title="Xóa tìm kiếm"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Category selection */}
            <div className="md:col-span-7 flex gap-1.5 overflow-x-auto pb-1 md:pb-0 custom-scrollbar no-scrollbar whitespace-nowrap">
              {formulaCategories.map((cat) => {
                const isSelected = selectedFormulaCat === cat;
                const count = cat === "Tất cả" 
                  ? PHYSICS_FORMULAS.length 
                  : cat === "Đã lưu" 
                  ? bookmarkedFormulas.length
                  : PHYSICS_FORMULAS.filter(f => f.category === cat).length;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedFormulaCat(cat)}
                    className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_2px_6px_rgba(6,182,212,0.15)] font-black"
                        : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {cat === "Đã lưu" && <Bookmark className={`h-3 w-3 ${bookmarkedFormulas.length > 0 && !isSelected ? "text-cyan-400 fill-cyan-400/20" : ""}`} />}
                    {cat}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected 
                        ? "bg-slate-950/20 text-slate-950 font-black" 
                        : "bg-slate-900 text-slate-500 font-bold"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formulas List Grid */}
          {filteredFormulas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFormulas.map((formula) => (
                <div 
                  key={formula.id} 
                  className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 hover:border-slate-700/80 transition-all flex flex-col relative group shadow-lg"
                >
                  {/* Topic Tag and Pin Action */}
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${TOPIC_STYLES[formula.category]?.bg} ${TOPIC_STYLES[formula.category]?.text} ${TOPIC_STYLES[formula.category]?.border}`}>
                      {formula.category}
                    </span>
                    <button
                      onClick={() => toggleBookmark(formula.id)}
                      className="p-1.5 bg-slate-950/40 border border-slate-800/85 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 rounded-lg transition-all cursor-pointer"
                      title={bookmarkedFormulas.includes(formula.id) ? "Bỏ lưu công thức" : "Lưu công thức"}
                    >
                      <Bookmark className={`h-3.5 w-3.5 ${bookmarkedFormulas.includes(formula.id) ? "fill-cyan-400 text-cyan-400" : ""}`} />
                    </button>
                  </div>

                  {/* Formula Name */}
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                    {formula.name}
                  </h4>

                  {/* Formula Expression Display Card */}
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-center justify-center text-center my-2 select-all relative overflow-hidden h-20">
                    <div className="text-base py-1 font-black">
                      <FormattedMathText text={formula.expression} />
                    </div>
                    {/* Small background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/1 to-transparent pointer-events-none"></div>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-2.5 mb-3.5 h-12 overflow-y-auto custom-scrollbar">
                    {formula.description}
                  </p>

                  {/* Variables "Trong đó" section */}
                  <div className="mt-auto pt-3 border-t border-slate-800/40">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">
                      Trong đó:
                    </span>
                    <ul className="space-y-1.5">
                      {formula.variables.map((v, i) => (
                        <li key={i} className="text-[11px] leading-relaxed text-slate-300 flex items-start gap-1.5">
                          <span className="font-serif italic font-black text-cyan-400 mt-0.5 shrink-0 px-1 bg-slate-950 border border-slate-850 rounded">
                            <FormattedMathText text={v.symbol} />
                          </span>
                          <span className="text-slate-300">{v.meaning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed text-center">
              <AlertCircle className="h-10 w-10 text-slate-600 mb-3" />
              <span className="text-sm font-bold text-slate-400">Không tìm thấy công thức nào</span>
              <p className="text-xs text-slate-500 mt-1 max-w-sm leading-relaxed">
                {selectedFormulaCat === "Đã lưu" 
                  ? "Bạn chưa đánh dấu lưu bất kỳ công thức vật lý nào. Hãy nhấn biểu tượng ghim ở góc các thẻ công thức để lưu nhanh nhé!" 
                  : "Thử thay đổi từ khóa tìm kiếm hoặc chọn chủ đề lọc khác xem sao!"}
              </p>
              {selectedFormulaCat === "Đã lưu" && (
                <button
                  type="button"
                  onClick={() => setSelectedFormulaCat("Tất cả")}
                  className="mt-4 px-4 py-2 bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Xem tất cả công thức
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
