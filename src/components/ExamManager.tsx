import { useState, useEffect } from "react";
import { Sparkles, Brain, FileText, Upload, Plus, Minus, Download, Shuffle, CheckCircle, RefreshCw, AlertCircle, Play, Maximize2, Minimize2, Clock, Check, CheckSquare, X, TrendingUp, Users, Award, BookOpen } from "lucide-react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from "recharts";
import { SAMPLE_EXAM_TEXT, StudentResult, QUESTION_BANK } from "../types";
import { FormattedMathText } from "./FormattedMathText";
import { QuestionIllustration } from "./QuestionIllustration";
import { QuestionBank } from "./QuestionBank";

export function ExamManager({
  onEarnXP,
  isExamMode = false,
  setIsExamMode = () => {},
  studentResults = [],
  loggedInUser = null,
  onUpdateResults = () => {},
  userRole = "student"
}: {
  onEarnXP: (xp: number) => void;
  isExamMode?: boolean;
  setIsExamMode?: (val: boolean) => void;
  studentResults?: StudentResult[];
  loggedInUser?: any;
  onUpdateResults?: (results: StudentResult[]) => void;
  userRole?: string;
}) {
  const [activeTab, setActiveTab] = useState<"create" | "analyze" | "distribution" | "bank">("create");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [distributionClassFilter, setDistributionClassFilter] = useState<string>("All");

  // Filter students based on selection
  const examStudents = studentResults.filter(
    (s) => distributionClassFilter === "All" || s.className === distributionClassFilter
  );

  const totalExamStudents = examStudents.length;
  const examAverageGpa = totalExamStudents > 0 
    ? examStudents.reduce((acc, curr) => acc + curr.score, 0) / totalExamStudents 
    : 0;

  const passedStudents = examStudents.filter((s) => s.score >= 5.0).length;
  const examPassRate = totalExamStudents > 0 ? (passedStudents / totalExamStudents) * 100 : 0;

  const excellentStudents = examStudents.filter((s) => s.score >= 8.0).length;
  const examExcellentRate = totalExamStudents > 0 ? (excellentStudents / totalExamStudents) * 100 : 0;

  const highestScore = totalExamStudents > 0 ? Math.max(...examStudents.map((s) => s.score)) : 0;
  const lowestScore = totalExamStudents > 0 ? Math.min(...examStudents.map((s) => s.score)) : 0;

  // Score distribution calculations
  const dist0_2 = examStudents.filter((s) => s.score >= 0 && s.score < 3).length;
  const dist3_4 = examStudents.filter((s) => s.score >= 3 && s.score < 5).length;
  const dist5_6 = examStudents.filter((s) => s.score >= 5 && s.score < 7).length;
  const dist7_8 = examStudents.filter((s) => s.score >= 7 && s.score < 9).length;
  const dist9_10 = examStudents.filter((s) => s.score >= 9 && s.score <= 10).length;

  const examDistributionData = [
    { range: "0 - 2.9đ", count: dist0_2, label: "Yếu", color: "#f43f5e", students: examStudents.filter((s) => s.score >= 0 && s.score < 3).map((s) => s.name).join(", ") },
    { range: "3 - 4.9đ", count: dist3_4, label: "Yếu/Kém", color: "#f59e0b", students: examStudents.filter((s) => s.score >= 3 && s.score < 5).map((s) => s.name).join(", ") },
    { range: "5 - 6.9đ", count: dist5_6, label: "Trung bình", color: "#3b82f6", students: examStudents.filter((s) => s.score >= 5 && s.score < 7).map((s) => s.name).join(", ") },
    { range: "7 - 8.9đ", count: dist7_8, label: "Khá", color: "#10b981", students: examStudents.filter((s) => s.score >= 7 && s.score < 9).map((s) => s.name).join(", ") },
    { range: "9 - 10đ", count: dist9_10, label: "Giỏi", color: "#8b5cf6", students: examStudents.filter((s) => s.score >= 9 && s.score <= 10).map((s) => s.name).join(", ") },
  ];

  const ExamCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-950 border-2 border-slate-800 p-3 rounded-2xl text-slate-100 text-[11px] font-mono shadow-xl max-w-[220px]">
          <p className="font-black text-cyan-400">Khung điểm {data.range}</p>
          <p className="font-semibold text-slate-400">Đánh giá: {data.label}</p>
          <p className="font-extrabold text-sm text-emerald-400 mt-1">{data.count} Học sinh</p>
          {data.students ? (
            <p className="text-slate-300 text-[10px] mt-1.5 border-t border-slate-900 pt-1.5 leading-normal">
              Danh sách: <span className="font-medium italic">{data.students}</span>
            </p>
          ) : (
            <p className="text-slate-500 text-[10px] mt-1.5 border-t border-slate-900 pt-1.5">Không có học sinh nào</p>
          )}
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  // State: CREATE EXAM
  const [selectedChapters, setSelectedChapters] = useState<string[]>(["Vật lí nhiệt"]);
  const [examTime, setExamTime] = useState(45);
  const [nbRatio, setNbRatio] = useState(40);
  const [thRatio, setThRatio] = useState(30);
  const [vdRatio, setVdRatio] = useState(20);
  const [vdcRatio, setVdcRatio] = useState(10);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [generatedExam, setGeneratedExam] = useState<any>(null);

  // States for Question Bank creation integration
  const [creationMode, setCreationMode] = useState<"ai" | "bank">("ai");
  const [bankQuestions, setBankQuestions] = useState<any[]>([]);
  const [selectedBankQuestionIds, setSelectedBankQuestionIds] = useState<number[]>([]);
  const [bankFilterLevel, setBankFilterLevel] = useState<string>("ALL");
  const [bankFilterChapter, setBankFilterChapter] = useState<string>("ALL");
  const [bankSearchTerm, setBankSearchTerm] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("custom_questions_bank");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBankQuestions(parsed);
          return;
        }
      } catch (e) {
        console.error("Lỗi đọc ngân hàng câu hỏi tùy chỉnh:", e);
      }
    }
    setBankQuestions(QUESTION_BANK);
  }, [activeTab, creationMode]);
  
  // States for Countdown timer & Anti-cheat tracking
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [cheatCount, setCheatCount] = useState(0);
  const [showCheatWarning, setShowCheatWarning] = useState(false);
  const [lastWarningMsg, setLastWarningMsg] = useState("");
  
  // Custom part configurations: Part 1, 2, and 3
  const [p1Count, setP1Count] = useState(4);
  const [p1Points, setP1Points] = useState(4.0);
  const [p2Count, setP2Count] = useState(2);
  const [p2Points, setP2Points] = useState(4.0);
  const [p3Count, setP3Count] = useState(2);
  const [p3Points, setP3Points] = useState(2.0);

  // States for user answers in each part
  const [userAnswersP1, setUserAnswersP1] = useState<Record<string, string>>({});
  const [userAnswersP2, setUserAnswersP2] = useState<Record<string, Record<string, "T" | "F">>>({});
  const [userAnswersP3, setUserAnswersP3] = useState<Record<string, string>>({});
  
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ p1: 0, p2: 0, p3: 0, total: 0 });

  // States for dynamic review recommendations based on wrong answers
  const [loadingExplanationForChapter, setLoadingExplanationForChapter] = useState<string | null>(null);
  const [chapterAIExplanations, setChapterAIExplanations] = useState<Record<string, string>>({});

  const getIncorrectQuestions = () => {
    if (!generatedExam) return [];
    const list: Array<{
      partName: string;
      questionNum: number;
      chapter: string;
      text: string;
      explanation: string;
      userAnswer: string;
      correctAnswer: string;
      id: string;
    }> = [];

    // Part 1
    const p1 = generatedExam.questionsPart1 || [];
    p1.forEach((q: any, idx: number) => {
      const uAns = userAnswersP1[q.id];
      if (uAns !== q.answer) {
        list.push({
          partName: "Phần I",
          questionNum: idx + 1,
          chapter: q.chapter || "Vật lí nhiệt",
          text: q.text,
          explanation: q.explanation || "",
          userAnswer: uAns || "Chưa trả lời",
          correctAnswer: q.answer,
          id: q.id
        });
      }
    });

    // Part 2
    const p2 = generatedExam.questionsPart2 || [];
    p2.forEach((q: any, idx: number) => {
      const qAnswers = userAnswersP2[q.id] || {};
      const statements = q.statements || [];
      const wrongStatements: string[] = [];
      statements.forEach((st: any, sIdx: number) => {
        const uAns = qAnswers[st.id]; // "T" or "F" or undefined
        const isStCorrect = (st.isCorrect && uAns === "T") || (!st.isCorrect && uAns === "F");
        if (!isStCorrect) {
          wrongStatements.push(`Ý ${String.fromCharCode(97 + sIdx)})`);
        }
      });
      if (wrongStatements.length > 0) {
        list.push({
          partName: "Phần II",
          questionNum: idx + 1,
          chapter: q.chapter || "Vật lí nhiệt",
          text: q.question,
          explanation: `Các mệnh đề chưa chính xác: ${wrongStatements.join(", ")}.`,
          userAnswer: "Sai mệnh đề lựa chọn",
          correctAnswer: "Đúng hoàn toàn tất cả mệnh đề",
          id: q.id
        });
      }
    });

    // Part 3
    const p3 = generatedExam.questionsPart3 || [];
    p3.forEach((q: any, idx: number) => {
      const uAns = (userAnswersP3[q.id] || "").trim().replace(",", ".");
      const cAns = String(q.answer).trim().replace(",", ".");
      const isCorrect = uAns === cAns || (!isNaN(parseFloat(uAns)) && !isNaN(parseFloat(cAns)) && parseFloat(uAns) === parseFloat(cAns));
      if (!isCorrect) {
        list.push({
          partName: "Phần III",
          questionNum: idx + 1,
          chapter: q.chapter || "Vật lí nhiệt",
          text: q.text,
          explanation: q.explanation || "",
          userAnswer: userAnswersP3[q.id] || "Chưa trả lời",
          correctAnswer: q.answer,
          id: q.id
        });
      }
    });

    return list;
  };

  const getChapterRecommendations = (chapterName: string) => {
    const nameLower = chapterName.toLowerCase();
    if (nameLower.includes("nhiệt") || nameLower.includes("vật lí nhiệt")) {
      return {
        title: "Vật lí nhiệt (Nhiệt học & Sự chuyển thể)",
        lessons: [
          { id: "l8", name: "Bài 8: Nhiệt độ. Thang nhiệt độ" },
          { id: "l9", name: "Bài 9: Nhiệt dung riêng" },
          { id: "l10", name: "Bài 10: Nhiệt nóng chảy riêng" },
          { id: "l11", name: "Bài 11: Nhiệt hóa hơi riêng" }
        ],
        formulas: [
          "Công thức truyền nhiệt lượng: Q = m·c·Δt",
          "Nhiệt lượng nóng chảy: Q = λ·m",
          "Nhiệt lượng hoá hơi: Q = L·m",
          "Phương trình cân bằng nhiệt: Q_toa = Q_thu",
          "Định luật I Nhiệt động lực học: ΔU = A + Q"
        ],
        focusPoints: [
          "Phân biệt rõ ràng các khái niệm: Nhiệt độ, Thang nhiệt độ Celsius, Thang nhiệt độ Kelvin.",
          "Quy ước dấu của Nhiệt lượng (Q > 0 nhận nhiệt, Q < 0 tỏa nhiệt) và Công (A > 0 nhận công, A < 0 thực hiện công) trong Định luật I.",
          "Cách lập phương trình cân bằng nhiệt cho hệ cô lập gồm nhiều chất trao đổi nhiệt."
        ]
      };
    } else if (nameLower.includes("khí") || nameLower.includes("khí lí tưởng")) {
      return {
        title: "Khí lí tưởng & Thuyết động học phân tử",
        lessons: [
          { id: "l12", name: "Bài 12: Áp suất khí theo mô hình động học phân tử" },
          { id: "l13", name: "Bài 13: Bài tập về khí lí tưởng" },
          { id: "l14", name: "Bài 14: Định luật Boyle" },
          { id: "l15", name: "Bài 15: Định luật Charles" }
        ],
        formulas: [
          "Phương trình trạng thái khí lí tưởng: p·V = n·R·T",
          "Định luật Boyle (Đẳng nhiệt): p_1·V_1 = p_2·V_2",
          "Định luật Charles (Đẳng áp): V_1 / T_1 = V_2 / T_2",
          "Mối liên hệ động năng phân tử: E_đ = 1.5 · k_B · T",
          "Áp suất khí lí tưởng: p = 1/3 · μ · m_0 · v^2_tb"
        ],
        focusPoints: [
          "Chuyển đổi đơn vị nhiệt độ sang Kelvin (T = t + 273.15) trước khi tính toán các định luật chất khí.",
          "Nắm vững đặc điểm lực tương tác phân tử và chuyển động hỗn loạn của các phân tử khí.",
          "Vẽ đồ thị các quá trình biến đổi trạng thái trong các hệ tọa độ (p-V, V-T, p-T)."
        ]
      };
    } else if (nameLower.includes("từ trường") || nameLower.includes("điện từ")) {
      return {
        title: "Từ trường & Cảm ứng điện từ",
        lessons: [
          { id: "l16", name: "Bài 16: Lực từ. Cảm ứng từ" },
          { id: "l17", name: "Bài 17: Từ trường của dòng điện chạy trong dây dẫn có hình dạng đặc biệt" },
          { id: "l18", name: "Bài 18: Lực Lorentz" }
        ],
        formulas: [
          "Lực từ tác dụng lên dây dẫn thẳng: F = B·I·L·sin(θ)",
          "Lực Lorentz tác dụng lên điện tích chuyển động: f = q·v·B·sin(α)",
          "Từ thông qua diện tích S: Φ = B·S·cos(α)",
          "Suất điện động cảm ứng (Faraday): e_c = -ΔΦ / Δt"
        ],
        focusPoints: [
          "Quy tắc bàn tay trái để xác định chiều của Lực từ và Lực Lorentz tác dụng lên điện tích.",
          "Quy tắc bàn tay phải (hoặc vặn nút chai) để xác định chiều của Cảm ứng từ B quanh dây dẫn thẳng, tròn, và ống dây.",
          "Định luật Lenz về chiều dòng điện cảm ứng: luôn chống lại nguyên nhân sinh ra nó."
        ]
      };
    } else if (nameLower.includes("hạt nhân") || nameLower.includes("phóng xạ")) {
      return {
        title: "Vật lí hạt nhân & Phóng xạ",
        lessons: [
          { id: "l19", name: "Bài 19: Cấu trúc hạt nhân. Độ hụt khối" },
          { id: "l20", name: "Bài 20: Phản ứng hạt nhân và Năng lượng liên kết" },
          { id: "l21", name: "Bài 21: Phóng xạ và Ứng dụng hạt nhân" }
        ],
        formulas: [
          "Độ hụt khối của hạt nhân: Δm = [Z·m_p + (A - Z)·m_n] - m_hn",
          "Năng lượng liên kết: E_lk = Δm · c^2 (hoặc Δm · 931.5 MeV)",
          "Năng lượng liên kết riêng: E_lkr = E_lk / A",
          "Định luật phóng xạ: N(t) = N_0 · 2^(-t / T) = N_0 · e^(-λ·t)"
        ],
        focusPoints: [
          "Hạt nhân có năng lượng liên kết riêng càng lớn thì càng bền vững (các hạt nhân ở giữa bảng tuần hoàn, A từ 50 đến 80).",
          "Định luật bảo toàn số khối (A) và bảo toàn điện tích (Z) trong phản ứng hạt nhân.",
          "Sự khác biệt giữa các tia phóng xạ α, β-, β+, và γ về bản chất, khả năng đâm xuyên và ion hóa."
        ]
      };
    } else {
      return {
        title: chapterName,
        lessons: [
          { id: "l8", name: "Học liệu tổng quan Vật lí 12" }
        ],
        formulas: [
          "Đọc kĩ định nghĩa và điều kiện áp dụng công thức trong SGK.",
          "Lập bảng tóm tắt lý thuyết để ghi nhớ có hệ thống."
        ],
        focusPoints: [
          "Kiểm tra lại thứ tự các bước làm toán lý: Tóm tắt đề -> Xác định công thức -> Biến đổi tìm đại lượng -> Thay số và tính toán kèm đơn vị.",
          "Ôn tập lại các định luật bảo toàn liên quan chất khí và nhiệt học."
        ]
      };
    }
  };

  const handleFetchChapterExplanation = async (chapterName: string, wrongQuestions: any[]) => {
    setLoadingExplanationForChapter(chapterName);
    try {
      const questionsSummaries = wrongQuestions.map((q, i) => 
        `Câu hỏi ${i + 1} (${q.partName}): "${q.text.substring(0, 200)}..."\n- Trả lời của bạn: "${q.userAnswer}"\n- Đáp án đúng: "${q.correctAnswer}"`
      ).join("\n\n");

      const promptText = `Tôi vừa làm bài thi kiểm tra Vật lí 12 và trả lời sai các câu hỏi thuộc chủ đề "${chapterName}":\n\n${questionsSummaries}\n\nHãy phân tích những lỗi sai này, hướng dẫn giải thích cặn kẽ bản chất vật lý của các dạng bài này bằng Tiếng Việt sư phạm chuẩn mực dễ hiểu. Đưa ra công thức chính xác dạng biểu thức rõ ràng và các "Lưu ý vàng" để tôi sửa đổi ôn tập.`;

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: promptText,
          mode: "explain",
          history: []
        })
      });

      if (response.ok) {
        const data = await response.json();
        setChapterAIExplanations(prev => ({
          ...prev,
          [chapterName]: data.reply || data.text || "Không nhận được phản hồi từ AI."
        }));
      } else {
        setChapterAIExplanations(prev => ({
          ...prev,
          [chapterName]: "Gặp lỗi khi kết nối tới máy chủ AI trợ giảng. Bạn có thể tự mình xem lại đáp án chi tiết và lý giải của từng câu phía dưới."
        }));
      }
    } catch (err) {
      console.error(err);
      setChapterAIExplanations(prev => ({
        ...prev,
        [chapterName]: "Gặp lỗi kết nối mạng với hệ thống AI. Hãy thử lại sau."
      }));
    } finally {
      setLoadingExplanationForChapter(null);
    }
  };

  // State: ANALYZE EXAM
  const [rawText, setRawText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string>("");
  const [isLoadingAnalyze, setIsLoadingAnalyze] = useState(false);
  const [analyzedResult, setAnalyzedResult] = useState<any>(null);

  // States for Auto-save progress
  const [lastAutoSaved, setLastAutoSaved] = useState<string>("");
  const [showAutoSavedIndicator, setShowAutoSavedIndicator] = useState(false);

  // Active question state for left-hand interactive Answer Sheet
  const [activeQuestion, setActiveQuestion] = useState<{
    part: "p1" | "p2" | "p3";
    idx: number;
    id: string;
  } | null>(null);

  // Automatically select the first available question when generatedExam is loaded/created
  useEffect(() => {
    if (generatedExam && !activeQuestion) {
      if (generatedExam.questionsPart1 && generatedExam.questionsPart1.length > 0) {
        setActiveQuestion({ part: "p1", idx: 0, id: generatedExam.questionsPart1[0].id });
      } else if (generatedExam.questionsPart2 && generatedExam.questionsPart2.length > 0) {
        setActiveQuestion({ part: "p2", idx: 0, id: generatedExam.questionsPart2[0].id });
      } else if (generatedExam.questionsPart3 && generatedExam.questionsPart3.length > 0) {
        setActiveQuestion({ part: "p3", idx: 0, id: generatedExam.questionsPart3[0].id });
      }
    }
  }, [generatedExam]);

  // Load saved progress from localStorage on mount
  useEffect(() => {
    const savedProgressStr = localStorage.getItem("physics_exam_progress");
    if (savedProgressStr) {
      try {
        const saved = JSON.parse(savedProgressStr);
        if (saved.generatedExam && !saved.examSubmitted) {
          setGeneratedExam(saved.generatedExam);
          setTimeLeft(saved.timeLeft);
          setIsTimerRunning(saved.isTimerRunning);
          setCheatCount(saved.cheatCount || 0);
          setUserAnswersP1(saved.userAnswersP1 || {});
          setUserAnswersP2(saved.userAnswersP2 || {});
          setUserAnswersP3(saved.userAnswersP3 || {});
          setExamSubmitted(saved.examSubmitted || false);
          setExamScore(saved.examScore || 0);
          setScoreBreakdown(saved.scoreBreakdown || { p1: 0, p2: 0, p3: 0, total: 0 });
          if (saved.isExamMode && setIsExamMode) {
            setIsExamMode(true);
          }
          if (saved.lastAutoSaved) {
            setLastAutoSaved(saved.lastAutoSaved);
          }
        }
      } catch (e) {
        console.error("Failed to restore exam progress", e);
      }
    }
  }, []);

  // Periodically auto-save progress every 30 seconds
  useEffect(() => {
    if (!generatedExam || examSubmitted) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      
      const progress = {
        generatedExam,
        timeLeft,
        isTimerRunning,
        cheatCount,
        userAnswersP1,
        userAnswersP2,
        userAnswersP3,
        examSubmitted,
        examScore,
        scoreBreakdown,
        isExamMode,
        lastAutoSaved: timeStr
      };
      
      localStorage.setItem("physics_exam_progress", JSON.stringify(progress));
      setLastAutoSaved(timeStr);
      setShowAutoSavedIndicator(true);
      
      // Hide the indicator after 3 seconds
      const timeout = setTimeout(() => {
        setShowAutoSavedIndicator(false);
      }, 3000);
      
      return () => clearTimeout(timeout);
    }, 30000);

    return () => clearInterval(interval);
  }, [
    generatedExam,
    timeLeft,
    isTimerRunning,
    cheatCount,
    userAnswersP1,
    userAnswersP2,
    userAnswersP3,
    examSubmitted,
    examScore,
    scoreBreakdown,
    isExamMode
  ]);

  const chaptersOptions = ["Vật lí nhiệt", "Khí lí tưởng", "Từ trường", "Vật lí hạt nhân"];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle chapter selection
  const handleToggleChapter = (ch: string) => {
    if (selectedChapters.includes(ch)) {
      if (selectedChapters.length > 1) {
        setSelectedChapters(selectedChapters.filter((c) => c !== ch));
      }
    } else {
      setSelectedChapters([...selectedChapters, ch]);
    }
  };

  // 1. Create Exam API
  const handleCreateExam = async () => {
    setIsLoadingCreate(true);
    setGeneratedExam(null);
    setExamSubmitted(false);
    setUserAnswersP1({});
    setUserAnswersP2({});
    setUserAnswersP3({});
    setScoreBreakdown({ p1: 0, p2: 0, p3: 0, total: 0 });
    localStorage.removeItem("physics_exam_progress");
    
    try {
      const response = await fetch("/api/gemini/create-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapters: selectedChapters,
          time: examTime,
          ratio: { nb: nbRatio, th: thRatio, vd: vdRatio, vdc: vdcRatio },
          part1: { count: p1Count, points: p1Points },
          part2: { count: p2Count, points: p2Points },
          part3: { count: p3Count, points: p3Points }
        })
      });

      const data = await response.json();
      if (response.ok && (data.questionsPart1 || data.questionsPart2 || data.questionsPart3)) {
        setGeneratedExam(data);
        setTimeLeft(examTime * 60);
        setIsTimerRunning(true);
        setCheatCount(0);
        setShowCheatWarning(false);
        onEarnXP(30); // Earn XP for generator
      } else {
        alert("Có lỗi xảy ra khi gọi API tạo đề thi. Vui lòng thử lại hoặc điền khoá API chính xác.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ tạo đề.");
    } finally {
      setIsLoadingCreate(false);
    }
  };

  // Helper: Auto select matching structure from bank
  const handleAutoSelectFromBank = () => {
    const filteredByChapters = bankQuestions.filter(q => selectedChapters.includes(q.chapter));
    if (filteredByChapters.length === 0) {
      alert("Không có câu hỏi nào trong Ngân hàng thuộc các chủ đề đang chọn!");
      return;
    }

    const levels = ["NB", "TH", "VD", "VDC"];
    const ratios = [nbRatio, thRatio, vdRatio, vdcRatio];
    let toSelectCount = p1Count;
    if (toSelectCount <= 0) {
      toSelectCount = 10;
      setP1Count(10);
    }

    const byLevel: Record<string, any[]> = {
      NB: filteredByChapters.filter(q => q.level === "NB" || q.level === "Nhận biết"),
      TH: filteredByChapters.filter(q => q.level === "TH" || q.level === "Thông hiểu"),
      VD: filteredByChapters.filter(q => q.level === "VD" || q.level === "Vận dụng"),
      VDC: filteredByChapters.filter(q => q.level === "VDC" || q.level === "Vận dụng cao")
    };

    let selectedIds: number[] = [];
    const totalRatio = ratios.reduce((a, b) => a + b, 0) || 100;
    let allocatedCount = 0;
    
    const desiredCounts = levels.map((lvl, idx) => {
      const count = Math.round((ratios[idx] / totalRatio) * toSelectCount);
      allocatedCount += count;
      return { lvl, count };
    });

    let diff = toSelectCount - allocatedCount;
    if (diff !== 0) {
      desiredCounts[0].count = Math.max(0, desiredCounts[0].count + diff);
    }

    desiredCounts.forEach(({ lvl, count }) => {
      const available = [...byLevel[lvl]];
      let selectAmount = Math.min(count, available.length);
      for (let i = available.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [available[i], available[j]] = [available[j], available[i]];
      }
      const selected = available.slice(0, selectAmount);
      selectedIds.push(...selected.map(q => q.id));
    });

    if (selectedIds.length < toSelectCount) {
      const remaining = filteredByChapters.filter(q => !selectedIds.includes(q.id));
      const shuffledRemaining = remaining.sort(() => 0.5 - Math.random());
      const needed = toSelectCount - selectedIds.length;
      selectedIds.push(...shuffledRemaining.slice(0, needed).map(q => q.id));
    }

    setSelectedBankQuestionIds(selectedIds);
    alert(`Đã tự động chọn ${selectedIds.length} câu hỏi phù hợp từ Ngân hàng dựa trên Chủ đề và Tỉ lệ độ khó!`);
  };

  // Helper: Create exam instantly from bank questions
  const handleCreateExamFromBank = (pureMultipleChoice: boolean = true) => {
    if (selectedBankQuestionIds.length === 0) {
      alert("Vui lòng chọn ít nhất 1 câu hỏi từ Ngân hàng để soạn đề!");
      return;
    }

    const selectedQs = bankQuestions.filter((q) => selectedBankQuestionIds.includes(q.id));
    
    setIsLoadingCreate(true);
    setGeneratedExam(null);
    setExamSubmitted(false);
    setUserAnswersP1({});
    setUserAnswersP2({});
    setUserAnswersP3({});
    setScoreBreakdown({ p1: 0, p2: 0, p3: 0, total: 0 });
    localStorage.removeItem("physics_exam_progress");

    setTimeout(() => {
      setP1Count(selectedQs.length);
      if (pureMultipleChoice) {
        setP1Points(10.0);
        setP2Count(0);
        setP3Count(0);
        setP2Points(0);
        setP3Points(0);
      }

      const p1Questions = selectedQs.map((q, idx) => ({
        id: `bank-${q.id}`,
        text: q.text,
        options: q.options,
        answer: q.answer,
        level: q.level,
        chapter: q.chapter,
        illustrationType: "",
        image: q.image || undefined,
        explanation: `Câu hỏi trích lục từ Ngân hàng câu hỏi Vật lí 12. Đáp án đúng là ${q.answer}.`
      }));

      const exam = {
        id: `exam-bank-${Date.now()}`,
        title: `Đề thi tuyển chọn từ Ngân hàng câu hỏi Vật lí 12`,
        time: examTime,
        chapters: selectedChapters,
        questionsPart1: p1Questions,
        questionsPart2: [],
        questionsPart3: [],
        matrix: `Đề thi trắc nghiệm xây dựng thủ công từ Ngân hàng câu hỏi ôn tập.\nTổng số câu: ${selectedQs.length} câu.\nMức độ: ${selectedQs.filter(q => q.level === "NB").length} NB, ${selectedQs.filter(q => q.level === "TH").length} TH, ${selectedQs.filter(q => q.level === "VD").length} VD, ${selectedQs.filter(q => q.level === "VDC").length} VDC.`,
        specifications: `Chủ đề kiến thức: ${Array.from(new Set(selectedQs.map(q => q.chapter))).join(", ")}.`
      };

      setGeneratedExam(exam);
      setTimeLeft(examTime * 60);
      setIsTimerRunning(true);
      setCheatCount(0);
      setShowCheatWarning(false);
      onEarnXP(selectedQs.length * 5);
      setIsLoadingCreate(false);
    }, 600);
  };

  // Helper: Create a hybrid exam mixing Bank Part 1 and AI Part 2 & 3
  const handleCreateHybridExam = async () => {
    if (selectedBankQuestionIds.length === 0) {
      alert("Vui lòng chọn ít nhất 1 câu hỏi từ Ngân hàng cho phần I!");
      return;
    }

    setIsLoadingCreate(true);
    setGeneratedExam(null);
    setExamSubmitted(false);
    setUserAnswersP1({});
    setUserAnswersP2({});
    setUserAnswersP3({});
    setScoreBreakdown({ p1: 0, p2: 0, p3: 0, total: 0 });
    localStorage.removeItem("physics_exam_progress");

    const selectedQs = bankQuestions.filter((q) => selectedBankQuestionIds.includes(q.id));
    const p1Questions = selectedQs.map((q, idx) => ({
      id: `bank-${q.id}`,
      text: q.text,
      options: q.options,
      answer: q.answer,
      level: q.level,
      chapter: q.chapter,
      illustrationType: "",
      image: q.image || undefined,
      explanation: `Câu hỏi trích lục từ Ngân hàng câu hỏi Vật lí 12. Đáp án đúng là ${q.answer}.`
    }));

    try {
      const response = await fetch("/api/gemini/create-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapters: selectedChapters,
          time: examTime,
          ratio: { nb: nbRatio, th: thRatio, vd: vdRatio, vdc: vdcRatio },
          part1: { count: 0, points: 0 },
          part2: { count: p2Count, points: p2Points },
          part3: { count: p3Count, points: p3Points }
        })
      });

      const data = await response.json();
      
      const exam = {
        id: `exam-bank-hybrid-${Date.now()}`,
        title: `Đề thi cấu trúc kết hợp (Ngân hàng + Soạn thảo AI)`,
        time: examTime,
        chapters: selectedChapters,
        questionsPart1: p1Questions,
        questionsPart2: data.questionsPart2 || [],
        questionsPart3: data.questionsPart3 || [],
        matrix: `Đề thi phối hợp liên kết:\n- Phần I: Chọn lọc từ Ngân hàng câu hỏi (${selectedQs.length} câu).\n- Phần II, III: Thiết kế tự động bởi Trí tuệ Nhân tạo AI.\n\n${data.matrix || ""}`,
        specifications: data.specifications || "Phủ rộng các chủ đề: " + selectedChapters.join(", ")
      };

      setP1Count(p1Questions.length);
      setGeneratedExam(exam);
      setTimeLeft(examTime * 60);
      setIsTimerRunning(true);
      setCheatCount(0);
      setShowCheatWarning(false);
      onEarnXP(40);
    } catch (err) {
      console.error("Hybrid creation failed:", err);
      alert("Đang tự động chuyển sang chế độ tạo Đề trắc nghiệm tuyển chọn thuần túy từ Ngân hàng do lỗi kết nối AI.");
      handleCreateExamFromBank(true);
    } finally {
      setIsLoadingCreate(false);
    }
  };

  // Submit Interactive Exam with official grading rules of GDPT 2018
  const submitExamAnswers = () => {
    if (!generatedExam) return;
    
    // 1. Score Part 1: Many choice
    let correctP1 = 0;
    const questionsP1 = generatedExam.questionsPart1 || [];
    if (questionsP1.length > 0) {
      questionsP1.forEach((q: any) => {
        if (userAnswersP1[q.id] === q.answer) {
          correctP1++;
        }
      });
    }
    const scoreP1 = questionsP1.length > 0 ? (correctP1 / questionsP1.length) * p1Points : 0;

    // 2. Score Part 2: True / False (graded per question, proportional to correct statements)
    let scoreP2 = 0;
    const questionsP2 = generatedExam.questionsPart2 || [];
    if (questionsP2.length > 0) {
      const weightPerQ = p2Points / questionsP2.length;
      questionsP2.forEach((q: any) => {
        let correctStatements = 0;
        const statements = q.statements || [];
        statements.forEach((st: any) => {
          const userVal = userAnswersP2[q.id]?.[st.id]; // "T" or "F"
          const stCorrect = (st.isCorrect && userVal === "T") || (!st.isCorrect && userVal === "F");
          if (stCorrect) correctStatements++;
        });

        // National exam formula:
        // 4 correct statements = 1.0 point (100%)
        // 3 correct statements = 0.5 points (50%)
        // 2 correct statements = 0.25 points (25%)
        // 1 correct statement = 0.1 points (10%)
        let ratio = 0;
        if (correctStatements === 4) ratio = 1.0;
        else if (correctStatements === 3) ratio = 0.5;
        else if (correctStatements === 2) ratio = 0.25;
        else if (correctStatements === 1) ratio = 0.1;
        
        scoreP2 += ratio * weightPerQ;
      });
    }

    // 3. Score Part 3: Short answers
    let correctP3 = 0;
    const questionsP3 = generatedExam.questionsPart3 || [];
    if (questionsP3.length > 0) {
      questionsP3.forEach((q: any) => {
        const userVal = (userAnswersP3[q.id] || "").trim().replace(",", ".");
        const correctVal = String(q.answer).trim().replace(",", ".");
        if (userVal === correctVal || parseFloat(userVal) === parseFloat(correctVal)) {
          correctP3++;
        }
      });
    }
    const scoreP3 = questionsP3.length > 0 ? (correctP3 / questionsP3.length) * p3Points : 0;

    const totalScore = parseFloat((scoreP1 + scoreP2 + scoreP3).toFixed(2));
    setScoreBreakdown({
      p1: parseFloat(scoreP1.toFixed(2)),
      p2: parseFloat(scoreP2.toFixed(2)),
      p3: parseFloat(scoreP3.toFixed(2)),
      total: totalScore
    });
    setExamScore(totalScore);
    setExamSubmitted(true);
    setIsTimerRunning(false); // Stop countdown timer
    onEarnXP(totalScore * 10); // Reward based on performance!

    // Update the student results list with the actual exam score!
    if (loggedInUser && loggedInUser.role === "student" && studentResults && onUpdateResults) {
      const updated = studentResults.map((r) => {
        if (
          r.name.toLowerCase() === loggedInUser.name.toLowerCase() &&
          r.className === loggedInUser.className
        ) {
          return {
            ...r,
            score: totalScore, // Directly record this exam score!
            completedQuizzes: r.completedQuizzes + 1,
            xp: r.xp + Math.round(totalScore * 10)
          };
        }
        return r;
      });
      onUpdateResults(updated);
    }

    // Clear active progress on submit
    localStorage.removeItem("physics_exam_progress");
  };

  const handleSubmitExam = () => {
    submitExamAnswers();
  };

  const calculateScore = () => {
    return examScore.toFixed(1);
  };

  const calculateCorrectAnswersCount = () => {
    let count = 0;
    const p1 = generatedExam?.questionsPart1 || [];
    p1.forEach((q: any) => {
      if (userAnswersP1[q.id] === q.answer) count++;
    });
    
    const p2 = generatedExam?.questionsPart2 || [];
    p2.forEach((q: any) => {
      let correctStatements = 0;
      const statements = q.statements || [];
      statements.forEach((st: any) => {
        const userVal = userAnswersP2[q.id]?.[st.id];
        if ((st.isCorrect && userVal === "T") || (!st.isCorrect && userVal === "F")) {
          correctStatements++;
        }
      });
      if (correctStatements === 4) count++;
    });

    const p3 = generatedExam?.questionsPart3 || [];
    p3.forEach((q: any) => {
      const uAns = (userAnswersP3[q.id] || "").trim().replace(",", ".");
      const cAns = String(q.answer).trim().replace(",", ".");
      if (uAns === cAns || parseFloat(uAns) === parseFloat(cAns)) {
        count++;
      }
    });
    return count;
  };

  const totalQuestionsCount = () => {
    return (generatedExam?.questionsPart1?.length || 0) + (generatedExam?.questionsPart2?.length || 0) + (generatedExam?.questionsPart3?.length || 0);
  };

  // 1. Countdown timer effect
  useEffect(() => {
    if (!isTimerRunning || !generatedExam || examSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimerRunning(false);
          // Auto submit
          submitExamAnswers();
          alert("Hết giờ làm bài! Bài làm của bạn đã được tự động nộp.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, generatedExam, examSubmitted]);

  // 2. Anti-cheat (screen resize or blur/visibility change)
  useEffect(() => {
    if (!generatedExam || examSubmitted) return;

    // Detect screen resize / window shrinkage
    let prevWidth = window.innerWidth;
    let prevHeight = window.innerHeight;

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      
      // Nếu màn hình bị thu nhỏ (giảm kích thước đáng kể)
      if (currentWidth < prevWidth || currentHeight < prevHeight) {
        setCheatCount(p => p + 1);
        setLastWarningMsg("Hệ thống phát hiện hành động thu nhỏ cửa sổ hoặc thay đổi kích thước màn hình làm bài!");
        setShowCheatWarning(true);
      }
      prevWidth = currentWidth;
      prevHeight = currentHeight;
    };

    // Detect tab switching or window defocus
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCheatCount(p => p + 1);
        setLastWarningMsg("Hệ thống phát hiện hành động chuyển tab hoặc rời khỏi tiêu điểm màn hình làm bài!");
        setShowCheatWarning(true);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [generatedExam, examSubmitted]);

  // Shuffle questions order for all parts
  const handleShuffleExam = () => {
    if (!generatedExam) return;
    const shuffledP1 = generatedExam.questionsPart1 ? [...generatedExam.questionsPart1].sort(() => 0.5 - Math.random()) : [];
    const shuffledP2 = generatedExam.questionsPart2 ? [...generatedExam.questionsPart2].sort(() => 0.5 - Math.random()) : [];
    const shuffledP3 = generatedExam.questionsPart3 ? [...generatedExam.questionsPart3].sort(() => 0.5 - Math.random()) : [];
    
    setGeneratedExam({
      ...generatedExam,
      questionsPart1: shuffledP1,
      questionsPart2: shuffledP2,
      questionsPart3: shuffledP3
    });
    alert("Đã hoán đổi ngẫu nhiên thứ tự câu hỏi các phần và tạo Mã đề khác!");
  };

  // Simulate File selection
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      // Read text content as a preview or simply simulate text
      setRawText(SAMPLE_EXAM_TEXT);
    }
  };

  // 2. Analyze Exam API
  const handleAnalyzeExam = async () => {
    if (!rawText.trim() && !uploadedFile) {
      alert("Hãy nhập văn bản đề thi hoặc chọn tệp tin cần phân tích.");
      return;
    }
    setIsLoadingAnalyze(true);
    setAnalyzedResult(null);

    try {
      const response = await fetch("/api/gemini/analyze-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawText: rawText || SAMPLE_EXAM_TEXT,
          fileName: uploadedFile || "copied_text.txt",
        })
      });

      const data = await response.json();
      if (response.ok && data.stats) {
        setAnalyzedResult(data);
        onEarnXP(40); // Earn 40 XP for teacher analytical workflow
      } else {
        alert("Có lỗi xảy ra khi phân tích đề thi. Hãy kiểm tra định dạng hoặc GEMINI_API_KEY.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ phân tích đề.");
    } finally {
      setIsLoadingAnalyze(false);
    }
  };

  // Get all questions as a flattened list
  const getAllQuestionsList = () => {
    if (!generatedExam) return [];
    const list: Array<{ part: "p1" | "p2" | "p3"; idx: number; id: string }> = [];
    (generatedExam.questionsPart1 || []).forEach((q: any, i: number) => {
      list.push({ part: "p1", idx: i, id: q.id });
    });
    (generatedExam.questionsPart2 || []).forEach((q: any, i: number) => {
      list.push({ part: "p2", idx: i, id: q.id });
    });
    (generatedExam.questionsPart3 || []).forEach((q: any, i: number) => {
      list.push({ part: "p3", idx: i, id: q.id });
    });
    return list;
  };

  // Navigate to previous or next question
  const navigateQuestion = (direction: "next" | "prev") => {
    const list = getAllQuestionsList();
    if (list.length === 0 || !activeQuestion) return;
    const currentIdx = list.findIndex(
      q => q.part === activeQuestion.part && q.idx === activeQuestion.idx
    );
    if (currentIdx === -1) return;
    
    let newIdx = currentIdx;
    if (direction === "next") {
      newIdx = (currentIdx + 1) % list.length;
    } else {
      newIdx = (currentIdx - 1 + list.length) % list.length;
    }
    
    const target = list[newIdx];
    setActiveQuestion(target);
    
    // Scroll to the question card
    setTimeout(() => {
      const el = document.getElementById(`question-${target.part}-${target.idx}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  };

  // Keyboard navigation listener
  useEffect(() => {
    if (!generatedExam || examSubmitted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keys when focused in an input/textarea, UNLESS Alt key modifier is held down
      const activeEl = document.activeElement;
      const isInputFocused = activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA");

      // 1. Next question shortcuts:
      // - Alt + ArrowRight, Alt + ArrowDown (always works)
      // - ArrowRight, ArrowDown, "]" (works when not focused in input)
      const isNextPressed = 
        (e.altKey && (e.key === "ArrowRight" || e.key === "ArrowDown")) ||
        (!e.altKey && !isInputFocused && (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "]"));

      // 2. Previous question shortcuts:
      // - Alt + ArrowLeft, Alt + ArrowUp (always works)
      // - ArrowLeft, ArrowUp, "[" (works when not focused in input)
      const isPrevPressed = 
        (e.altKey && (e.key === "ArrowLeft" || e.key === "ArrowUp")) ||
        (!e.altKey && !isInputFocused && (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "["));

      if (isNextPressed) {
        e.preventDefault();
        navigateQuestion("next");
      } else if (isPrevPressed) {
        e.preventDefault();
        navigateQuestion("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [generatedExam, examSubmitted, activeQuestion]);

  // Get detailed answered progress
  const getDetailedProgress = () => {
    if (!generatedExam) return { total: 0, answered: 0, percent: 0, p1: { total: 0, answered: 0 }, p2: { total: 0, answered: 0 }, p3: { total: 0, answered: 0 } };
    
    const p1Questions = generatedExam.questionsPart1 || [];
    const p2Questions = generatedExam.questionsPart2 || [];
    const p3Questions = generatedExam.questionsPart3 || [];
    
    const p1Total = p1Questions.length;
    let p1Answered = 0;
    p1Questions.forEach((q: any) => {
      if (userAnswersP1[q.id]) p1Answered++;
    });
    
    let p2Total = 0;
    let p2Answered = 0;
    p2Questions.forEach((q: any) => {
      const statements = q.statements || [];
      p2Total += statements.length;
      const qAnswers = userAnswersP2[q.id] || {};
      statements.forEach((st: any) => {
        if (qAnswers[st.id] === "T" || qAnswers[st.id] === "F") {
          p2Answered++;
        }
      });
    });
    
    const p3Total = p3Questions.length;
    let p3Answered = 0;
    p3Questions.forEach((q: any) => {
      if (userAnswersP3[q.id] && userAnswersP3[q.id].trim() !== "") {
        p3Answered++;
      }
    });
    
    const total = p1Total + p2Total + p3Total;
    const answered = p1Answered + p2Answered + p3Answered;
    const percent = total > 0 ? Math.round((answered / total) * 100) : 0;
    
    return {
      total,
      answered,
      percent,
      p1: { total: p1Total, answered: p1Answered },
      p2: { total: p2Total, answered: p2Answered },
      p3: { total: p3Total, answered: p3Answered }
    };
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const minsStr = mins.toString().padStart(2, "0");
  const secsStr = secs.toString().padStart(2, "0");
  const totalSeconds = examTime * 60;
  const progressPercent = totalSeconds > 0 ? Math.max(0, Math.min(100, (timeLeft / totalSeconds) * 100)) : 100;

  return (
    <div className={`space-y-6 ${isExamMode && generatedExam && !examSubmitted ? "pt-14" : ""}`}>
      {/* Sticky Exam Mode Header */}
      {isExamMode && generatedExam && !examSubmitted && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/30 shadow-xl animate-fade-in">
          <div className="px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <div className="min-w-0">
                <span className="text-[9.5px] font-bold text-amber-500 uppercase tracking-widest block font-mono">CHẾ ĐỘ ÔN THI TẬP TRUNG</span>
                <span className="text-xs font-bold text-white truncate max-w-[150px] sm:max-w-xs block">Đề khảo sát Vật lí 12 - Mã đề #1204</span>
                {lastAutoSaved && (
                  <span className="text-[9px] text-slate-400 block font-mono mt-0.5 leading-none">
                    {showAutoSavedIndicator ? "⚡ Đang tự động lưu..." : `💾 Đã lưu tự động lúc ${lastAutoSaved}`}
                  </span>
                )}
              </div>
            </div>

            {/* Persistent Digital Countdown Clock */}
            <div className="flex items-center gap-2 sm:gap-3 bg-slate-950/70 border border-slate-800/80 px-3 py-1 rounded-xl shadow-inner shrink-0">
              <div className="flex items-center gap-1.5">
                <Clock className={`h-4 w-4 ${timeLeft < 300 ? "text-red-500 animate-pulse" : "text-cyan-400"}`} />
                <span className="text-[9.5px] font-bold text-slate-500 uppercase font-mono tracking-wider hidden md:inline">Thời gian còn lại:</span>
              </div>
              <div className="flex items-center gap-1 font-mono font-black select-none">
                {/* Minutes Box */}
                <div className="relative overflow-hidden bg-slate-900 border border-slate-800 px-2 sm:px-2.5 py-1 rounded-lg shadow-inner flex items-center justify-center min-w-[36px] sm:min-w-[40px]">
                  <span className={`text-sm sm:text-base font-black ${timeLeft < 300 ? "text-red-500" : "text-cyan-400"} tracking-wider leading-none drop-shadow-[0_0_6px_rgba(6,182,212,0.2)]`}>
                    {minsStr}
                  </span>
                </div>

                {/* Separator Colon */}
                <span className={`text-sm sm:text-base font-bold leading-none ${timeLeft < 300 ? "text-red-500 animate-pulse" : "text-cyan-400"}`}>
                  :
                </span>

                {/* Seconds Box */}
                <div className="relative overflow-hidden bg-slate-900 border border-slate-800 px-2 sm:px-2.5 py-1 rounded-lg shadow-inner flex items-center justify-center min-w-[36px] sm:min-w-[40px]">
                  <span className={`text-sm sm:text-base font-black ${timeLeft < 300 ? "text-red-500" : "text-cyan-400"} tracking-wider leading-none drop-shadow-[0_0_6px_rgba(6,182,212,0.2)]`}>
                    {secsStr}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={toggleFullscreen}
                className="px-2.5 py-1.5 bg-slate-850 hover:bg-slate-750 text-slate-300 hover:text-white rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="h-3.5 w-3.5 text-amber-400" />
                    <span className="hidden sm:inline text-[11px]">Cửa sổ</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="hidden sm:inline text-[11px]">Toàn màn hình</span>
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  if (confirm("Bạn có chắc chắn muốn nộp bài ngay bây giờ?")) {
                    submitExamAnswers();
                  }
                }}
                className="px-3.5 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black rounded-lg transition-all shadow-md shadow-cyan-400/10 cursor-pointer"
              >
                Nộp bài
              </button>
              <button
                onClick={() => setIsExamMode(false)}
                className="px-2.5 py-1.5 bg-slate-850 hover:bg-slate-750 text-slate-300 hover:text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                title="Thoát chế độ ôn thi"
              >
                Thoát
              </button>
            </div>
          </div>
          {/* Animated/Glowing Linear Progress Bar representing remaining time */}
          <div className="h-1 w-full bg-slate-950/60 overflow-hidden relative">
            <div
              className={`h-full transition-all duration-1000 ease-linear ${
                timeLeft < 300 
                  ? "bg-gradient-to-r from-red-600 to-amber-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse" 
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
              }`}
              style={{ width: `${progressPercent}%` }}
              title="Thời gian làm bài còn lại"
            />
          </div>
          {/* Progress bar of answered questions */}
          <div className="h-1 w-full bg-slate-900/40 overflow-hidden relative border-t border-slate-950/30">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_6px_rgba(16,185,129,0.4)] transition-all duration-300 ease-out"
              style={{ width: `${getDetailedProgress().percent}%` }}
              title={`Tiến độ làm bài: ${getDetailedProgress().percent}%`}
            />
          </div>
        </div>
      )}

      {/* Sub tabs selector */}
      {!isExamMode && (
        <div className="flex flex-wrap gap-2.5 p-1.5 bg-[#f5f6fe] rounded-2xl border-2 border-[#0f172a] w-fit shadow-[4px_4px_0px_0px_#0f172a] no-override">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === "create"
                ? "bg-[#22d3ee] text-[#083344] border-2 border-[#083344] shadow-[2px_2px_0px_0px_#083344]"
                : "text-slate-700 hover:text-[#0f172a] hover:bg-slate-200/50"
            }`}
          >
            🎯 AI Tạo Đề Kiểm Tra Mới
          </button>
          <button
            onClick={() => setActiveTab("analyze")}
            className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === "analyze"
                ? "bg-[#22d3ee] text-[#083344] border-2 border-[#083344] shadow-[2px_2px_0px_0px_#083344]"
                : "text-slate-700 hover:text-[#0f172a] hover:bg-slate-200/50"
            }`}
          >
            🔍 AI Phân Tích & Phản Biện Đề
          </button>
          <button
            onClick={() => setActiveTab("distribution")}
            className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === "distribution"
                ? "bg-[#22d3ee] text-[#083344] border-2 border-[#083344] shadow-[2px_2px_0px_0px_#083344]"
                : "text-slate-700 hover:text-[#0f172a] hover:bg-slate-200/50"
            }`}
          >
            📊 Phổ Điểm Khảo Thí Cả Lớp
          </button>
          <button
            onClick={() => setActiveTab("bank")}
            className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === "bank"
                ? "bg-[#22d3ee] text-[#083344] border-2 border-[#083344] shadow-[2px_2px_0px_0px_#083344]"
                : "text-slate-700 hover:text-[#0f172a] hover:bg-slate-200/50"
            }`}
          >
            🧠 Ngân hàng câu hỏi
          </button>
        </div>
      )}

      {activeTab === "create" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {generatedExam ? (
            /* ========================================================
               LEFT COLUMN (lg:col-span-5): PHIẾU TRẢ LỜI TRẮC NGHIỆM
               ======================================================== */
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Answer Sheet Card */}
              <div className="bg-white text-slate-900 border-2 border-slate-900 rounded-3xl p-6 space-y-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.15)] animate-fade-in">
                {/* Header of Answer Sheet */}
                <div className="border-b-2 border-dashed border-slate-200 pb-4 text-center relative font-sans">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <CheckCircle className="h-5 w-5 text-purple-600 animate-pulse" />
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">PHIẾU TRẢ LỜI TRẮC NGHIỆM</h3>
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">BÀI THI: KHẢO SÁT VẬT LÍ 12 | MÃ ĐỀ: #1204</span>
                  
                  {/* Option to clear/reset/create new exam */}
                  <button
                    onClick={() => {
                      if (confirm("Bạn có muốn hủy đề thi hiện tại để tạo đề thi mới?")) {
                        setGeneratedExam(null);
                        setActiveQuestion(null);
                        setUserAnswersP1({});
                        setUserAnswersP2({});
                        setUserAnswersP3({});
                        setExamSubmitted(false);
                        localStorage.removeItem("physics_exam_progress");
                      }
                    }}
                    className="absolute -top-1 -right-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-red-500 rounded-lg transition-all text-[10px] font-black cursor-pointer border border-slate-200"
                    title="Hủy đề thi hiện tại để tạo đề thi mới"
                  >
                    Tạo đề mới
                  </button>
                </div>

                {/* VISUAL PROGRESS TRACKER & SHORTCUTS GUIDE */}
                {(() => {
                  const progress = getDetailedProgress();
                  return (
                    <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4.5 space-y-3.5 shadow-inner">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          📋 TIẾN ĐỘ BÀI LÀM:
                        </span>
                        <span className="font-mono font-black text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100 shadow-sm animate-pulse">
                          {progress.answered} / {progress.total} mục ({progress.percent}%)
                        </span>
                      </div>
                      
                      {/* Linear Progress Bar */}
                      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden relative border border-slate-300 shadow-sm">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 transition-all duration-500 ease-out"
                          style={{ width: `${progress.percent}%` }}
                        />
                      </div>

                      {/* Part breakdown stats */}
                      <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-slate-600">
                        <div className="bg-white/75 border border-slate-200/60 p-1.5 rounded-xl text-center">
                          <span className="block text-slate-400 font-bold uppercase tracking-wide text-[8.5px]">Phần I</span>
                          <span className="font-mono text-xs font-black text-rose-600">{progress.p1.answered}/{progress.p1.total}</span>
                        </div>
                        <div className="bg-white/75 border border-slate-200/60 p-1.5 rounded-xl text-center">
                          <span className="block text-slate-400 font-bold uppercase tracking-wide text-[8.5px]">Phần II (Ý)</span>
                          <span className="font-mono text-xs font-black text-purple-600">{progress.p2.answered}/{progress.p2.total}</span>
                        </div>
                        <div className="bg-white/75 border border-slate-200/60 p-1.5 rounded-xl text-center">
                          <span className="block text-slate-400 font-bold uppercase tracking-wide text-[8.5px]">Phần III</span>
                          <span className="font-mono text-xs font-black text-blue-600">{progress.p3.answered}/{progress.p3.total}</span>
                        </div>
                      </div>

                      {/* Keyboard shortcuts quick tip card */}
                      <div className="bg-amber-50/50 border border-amber-200/60 p-2.5 rounded-xl text-[10px] text-amber-850 space-y-1">
                        <div className="font-black uppercase tracking-wider text-[9px] text-amber-900 flex items-center gap-1">
                          ⌨️ Phím tắt chuyển câu hỏi nhanh:
                        </div>
                        <p className="font-medium leading-relaxed">
                          • Nhấn <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono font-black text-slate-800 shadow-sm">←</kbd> / <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono font-black text-slate-800 shadow-sm">↑</kbd> hoặc <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono font-black text-slate-800 shadow-sm">[</kbd> để lùi câu.
                          <br />
                          • Nhấn <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono font-black text-slate-800 shadow-sm">→</kbd> / <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono font-black text-slate-800 shadow-sm">↓</kbd> hoặc <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono font-black text-slate-800 shadow-sm">]</kbd> để tiến câu.
                          <br />
                          • Nhấn giữ <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono font-black text-slate-800 shadow-sm">Alt</kbd> + Mũi tên khi đang tập trung nhập đáp án.
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* ACTIVE QUESTION RESPONSE WIDGET (HỘP TƯƠNG TÁC) */}
                {activeQuestion && (
                  <div className="p-4 bg-purple-50/80 border-2 border-purple-500/30 rounded-2xl space-y-3 shadow-inner">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider font-mono">
                        👉 Đang trả lời: Câu {activeQuestion.idx + 1} ({activeQuestion.part === "p1" ? "Phần I" : activeQuestion.part === "p2" ? "Phần II" : "Phần III"})
                      </span>
                      <button
                        onClick={() => {
                          const el = document.getElementById(`question-${activeQuestion.part}-${activeQuestion.idx}`);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "center" });
                          }
                        }}
                        className="text-[10px] font-extrabold text-purple-600 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        Cuộn đến câu hỏi 🔍
                      </button>
                    </div>

                    {/* RENDER ACTIVE RESPONSES */}
                    {activeQuestion.part === "p1" && (() => {
                      const q = generatedExam.questionsPart1[activeQuestion.idx];
                      if (!q) return null;
                      return (
                        <div className="space-y-2">
                          <p className="text-xs text-slate-600 font-bold line-clamp-2 italic">
                            {q.text}
                          </p>
                          <div className="flex justify-around gap-2 pt-1">
                            {["A", "B", "C", "D"].map((letter) => {
                              const isSelected = userAnswersP1[q.id] === letter;
                              return (
                                <button
                                  key={letter}
                                  disabled={examSubmitted}
                                  onClick={() => {
                                    setUserAnswersP1({ ...userAnswersP1, [q.id]: letter });
                                    // Highlight active on paper too
                                    const el = document.getElementById(`question-p1-${activeQuestion.idx}`);
                                    if (el) {
                                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                                    }
                                  }}
                                  className={`w-10 h-10 rounded-full border-2 font-black text-sm flex items-center justify-center transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-rose-600 border-rose-600 text-white shadow-md scale-110"
                                      : "bg-white border-rose-500 text-rose-600 hover:bg-rose-50"
                                  }`}
                                >
                                  {letter}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}

                    {activeQuestion.part === "p2" && (() => {
                      const q = generatedExam.questionsPart2[activeQuestion.idx];
                      if (!q) return null;
                      return (
                        <div className="space-y-2">
                          <p className="text-xs text-slate-600 font-bold line-clamp-2 italic">
                            {q.question || q.text}
                          </p>
                          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {q.statements && q.statements.map((st: any, stIdx: number) => {
                              const userVal = userAnswersP2[q.id]?.[st.id];
                              return (
                                <div key={st.id} className="flex justify-between items-center gap-2 p-1.5 bg-white border border-purple-100 rounded-lg">
                                  <span className="text-[11px] font-bold text-slate-600 font-mono">Ý {String.fromCharCode(97 + stIdx)})</span>
                                  <div className="flex gap-1.5">
                                    <button
                                      disabled={examSubmitted}
                                      onClick={() => {
                                        const currentAnswers = { ...userAnswersP2 };
                                        currentAnswers[q.id] = { ...currentAnswers[q.id], [st.id]: "T" };
                                        setUserAnswersP2(currentAnswers);
                                        // Highlight active on paper too
                                        const el = document.getElementById(`question-p2-${activeQuestion.idx}`);
                                        if (el) {
                                          el.scrollIntoView({ behavior: "smooth", block: "center" });
                                        }
                                      }}
                                      className={`px-3 py-1 text-[10px] font-black rounded-lg border transition-all cursor-pointer ${
                                        userVal === "T"
                                          ? "bg-rose-600 border-rose-600 text-white"
                                          : "bg-white border-rose-500 text-rose-600 hover:bg-rose-50"
                                      }`}
                                    >
                                      Đúng
                                    </button>
                                    <button
                                      disabled={examSubmitted}
                                      onClick={() => {
                                        const currentAnswers = { ...userAnswersP2 };
                                        currentAnswers[q.id] = { ...currentAnswers[q.id], [st.id]: "F" };
                                        setUserAnswersP2(currentAnswers);
                                        // Highlight active on paper too
                                        const el = document.getElementById(`question-p2-${activeQuestion.idx}`);
                                        if (el) {
                                          el.scrollIntoView({ behavior: "smooth", block: "center" });
                                        }
                                      }}
                                      className={`px-3 py-1 text-[10px] font-black rounded-lg border transition-all cursor-pointer ${
                                        userVal === "F"
                                          ? "bg-rose-600 border-rose-600 text-white"
                                          : "bg-white border-rose-500 text-rose-600 hover:bg-rose-50"
                                      }`}
                                    >
                                      Sai
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}

                    {activeQuestion.part === "p3" && (() => {
                      const q = generatedExam.questionsPart3[activeQuestion.idx];
                      if (!q) return null;
                      const userVal = userAnswersP3[q.id] || "";
                      return (
                        <div className="space-y-2">
                          <p className="text-xs text-slate-600 font-bold line-clamp-2 italic">
                            {q.text}
                          </p>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              disabled={examSubmitted}
                              value={userVal}
                              onChange={(e) => {
                                setUserAnswersP3({ ...userAnswersP3, [q.id]: e.target.value });
                                // Highlight active on paper too
                                const el = document.getElementById(`question-p3-${activeQuestion.idx}`);
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                                }
                              }}
                              placeholder="Nhập đáp án số..."
                              className="px-3 py-1.5 text-xs bg-white text-slate-900 border-2 border-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono w-full font-black text-center"
                            />
                            {q.unit && (
                              <span className="text-xs text-slate-500 font-black uppercase">{q.unit}</span>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* THE COMPLETE GRID SHEET OF ALL QUESTIONS */}
                <div className="space-y-5 max-h-[500px] overflow-y-auto pr-1">
                  
                  {/* PART I: MULTIPLE CHOICE */}
                  {generatedExam.questionsPart1 && generatedExam.questionsPart1.length > 0 && (
                    <div className="space-y-2.5">
                      <span className="text-[11px] font-black text-rose-600 block uppercase tracking-wider border-b border-dashed border-rose-100 pb-1">
                        ● PHẦN I: NHIỀU LỰA CHỌN (CÂU 1 - {generatedExam.questionsPart1.length})
                      </span>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 bg-rose-50/20 p-3 border border-rose-100 rounded-2xl">
                        {(() => {
                          const half = Math.ceil(generatedExam.questionsPart1.length / 2);
                          const col1 = generatedExam.questionsPart1.slice(0, half);
                          const col2 = generatedExam.questionsPart1.slice(half);
                          
                          const renderColItem = (q: any, localIdx: number) => {
                            const isRowActive = activeQuestion?.part === "p1" && activeQuestion?.idx === localIdx;
                            const isCorrect = userAnswersP1[q.id] === q.answer;
                            return (
                              <div 
                                key={q.id} 
                                onClick={() => {
                                  setActiveQuestion({ part: "p1", idx: localIdx, id: q.id });
                                  const el = document.getElementById(`question-p1-${localIdx}`);
                                  if (el) {
                                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                                  }
                                }}
                                className={`flex items-center justify-between p-1 rounded-lg transition-all cursor-pointer ${
                                  isRowActive 
                                    ? "bg-purple-100 ring-2 ring-purple-500" 
                                    : "hover:bg-slate-50"
                                }`}
                              >
                                <span className={`text-[11px] font-extrabold w-6 text-slate-600 ${isRowActive ? "text-purple-700" : ""}`}>
                                  {localIdx + 1}
                                </span>
                                <div className="flex gap-1 shrink-0">
                                  {["A", "B", "C", "D"].map((letter) => {
                                    const isChosen = userAnswersP1[q.id] === letter;
                                    
                                    let btnStyle = "bg-white border-rose-500 text-rose-600";
                                    if (examSubmitted) {
                                      const isCorrectAns = q.answer === letter;
                                      if (isChosen && isCorrect) {
                                        btnStyle = "bg-emerald-600 border-emerald-600 text-white"; // chosen & correct
                                      } else if (isChosen && !isCorrect) {
                                        btnStyle = "bg-rose-600 border-rose-600 text-white"; // chosen & incorrect
                                      } else if (!isChosen && isCorrectAns) {
                                        btnStyle = "border-2 border-emerald-600 text-emerald-600 bg-emerald-50"; // correct but not chosen
                                      } else {
                                        btnStyle = "border border-slate-200 text-slate-300 bg-white opacity-40";
                                      }
                                    } else if (isChosen) {
                                      btnStyle = "bg-rose-600 border-rose-600 text-white shadow-sm scale-105";
                                    }
                                    
                                    return (
                                      <button
                                        key={letter}
                                        type="button"
                                        disabled={examSubmitted}
                                        onClick={(e) => {
                                          e.stopPropagation(); // prevent row click triggers
                                          setUserAnswersP1({ ...userAnswersP1, [q.id]: letter });
                                          setActiveQuestion({ part: "p1", idx: localIdx, id: q.id });
                                          const el = document.getElementById(`question-p1-${localIdx}`);
                                          if (el) {
                                            el.scrollIntoView({ behavior: "smooth", block: "center" });
                                          }
                                        }}
                                        className={`w-6 h-6 rounded-full border text-[10px] font-black flex items-center justify-center transition-all ${btnStyle}`}
                                      >
                                        {letter}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          };
                          
                          return (
                            <>
                              {/* Col 1 */}
                              <div className="space-y-1.5 border-r border-rose-100/50 pr-2">
                                {col1.map((q: any, i: number) => renderColItem(q, i))}
                              </div>
                              {/* Col 2 */}
                              <div className="space-y-1.5 pl-2">
                                {col2.map((q: any, i: number) => renderColItem(q, i + half))}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {/* PART II: TRUE/FALSE */}
                  {generatedExam.questionsPart2 && generatedExam.questionsPart2.length > 0 && (
                    <div className="space-y-2.5">
                      <span className="text-[11px] font-black text-rose-600 block uppercase tracking-wider border-b border-dashed border-rose-100 pb-1">
                        ● PHẦN II: ĐÚNG / SAI (CÂU 1 - {generatedExam.questionsPart2.length})
                      </span>
                      
                      <div className="bg-rose-50/20 p-3 border border-rose-100 rounded-2xl space-y-3">
                        {generatedExam.questionsPart2.map((q: any, localIdx: number) => {
                          const isRowActive = activeQuestion?.part === "p2" && activeQuestion?.idx === localIdx;
                          return (
                            <div 
                              key={q.id}
                              onClick={() => {
                                setActiveQuestion({ part: "p2", idx: localIdx, id: q.id });
                                const el = document.getElementById(`question-p2-${localIdx}`);
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                                }
                              }}
                              className={`p-2 rounded-xl transition-all cursor-pointer ${
                                isRowActive 
                                  ? "bg-purple-100 ring-2 ring-purple-500" 
                                  : "hover:bg-slate-50 border border-slate-100"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-1.5">
                                <span className={`text-[11px] font-extrabold text-slate-700 ${isRowActive ? "text-purple-700" : ""}`}>
                                  Câu {localIdx + 1}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                {q.statements && q.statements.map((st: any, stIdx: number) => {
                                  const userVal = userAnswersP2[q.id]?.[st.id];
                                  const char = String.fromCharCode(97 + stIdx); // a, b, c, d
                                  
                                  const renderChoiceBtn = (choice: "T" | "F", label: "Đ" | "S") => {
                                    const isChosen = userVal === choice;
                                    
                                    let btnStyle = "bg-white border-rose-500 text-rose-600";
                                    if (examSubmitted) {
                                      const isCorrectAns = (choice === "T" && st.isCorrect) || (choice === "F" && !st.isCorrect);
                                      const isActualChosenCorrect = (st.isCorrect && userVal === "T") || (!st.isCorrect && userVal === "F");
                                      
                                      if (isChosen && isActualChosenCorrect) {
                                        btnStyle = "bg-emerald-600 border-emerald-600 text-white"; // chosen & correct
                                      } else if (isChosen && !isActualChosenCorrect) {
                                        btnStyle = "bg-rose-600 border-rose-600 text-white"; // chosen & incorrect
                                      } else if (!isChosen && isCorrectAns) {
                                        btnStyle = "border border-emerald-600 text-emerald-600 bg-emerald-50"; // correct but not chosen
                                      } else {
                                        btnStyle = "border border-slate-200 text-slate-300 bg-white opacity-40";
                                      }
                                    } else if (isChosen) {
                                      btnStyle = "bg-rose-600 border-rose-600 text-white scale-105";
                                    }
                                    
                                    return (
                                      <button
                                        key={choice}
                                        type="button"
                                        disabled={examSubmitted}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const currentAnswers = { ...userAnswersP2 };
                                          currentAnswers[q.id] = { ...currentAnswers[q.id], [st.id]: choice };
                                          setUserAnswersP2(currentAnswers);
                                          setActiveQuestion({ part: "p2", idx: localIdx, id: q.id });
                                          const el = document.getElementById(`question-p2-${localIdx}`);
                                          if (el) {
                                            el.scrollIntoView({ behavior: "smooth", block: "center" });
                                          }
                                        }}
                                        className={`w-5.5 h-5.5 rounded-full border text-[9.5px] font-black flex items-center justify-center transition-all ${btnStyle}`}
                                      >
                                        {label}
                                      </button>
                                    );
                                  };
                                  
                                  return (
                                    <div key={st.id} className="flex items-center justify-between p-1 bg-white rounded border border-slate-100">
                                      <span className="text-[10px] font-bold text-slate-500 font-mono">{char})</span>
                                      <div className="flex gap-1">
                                        {renderChoiceBtn("T", "Đ")}
                                        {renderChoiceBtn("F", "S")}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* PART III: SHORT ANSWER */}
                  {generatedExam.questionsPart3 && generatedExam.questionsPart3.length > 0 && (
                    <div className="space-y-2.5">
                      <span className="text-[11px] font-black text-rose-600 block uppercase tracking-wider border-b border-dashed border-rose-100 pb-1">
                        ● PHẦN III: TRẢ LỜI NGẮN (CÂU 1 - {generatedExam.questionsPart3.length})
                      </span>
                      
                      <div className="bg-rose-50/20 p-3 border border-rose-100 rounded-2xl space-y-2">
                        {generatedExam.questionsPart3.map((q: any, localIdx: number) => {
                          const isRowActive = activeQuestion?.part === "p3" && activeQuestion?.idx === localIdx;
                          const userVal = userAnswersP3[q.id] || "";
                          
                          const cleanUser = userVal.trim().replace(",", ".");
                          const cleanAns = String(q.answer).trim().replace(",", ".");
                          const isCorrect = examSubmitted && (cleanUser === cleanAns || parseFloat(cleanUser) === parseFloat(cleanAns));
                          
                          return (
                            <div 
                              key={q.id}
                              onClick={() => {
                                setActiveQuestion({ part: "p3", idx: localIdx, id: q.id });
                                const el = document.getElementById(`question-p3-${localIdx}`);
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                                }
                              }}
                              className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                                isRowActive 
                                  ? "bg-purple-100 ring-2 ring-purple-500" 
                                  : "hover:bg-slate-50 border border-slate-100"
                              }`}
                            >
                              <span className={`text-[11px] font-extrabold text-slate-600 ${isRowActive ? "text-purple-700" : ""}`}>
                                Câu {localIdx + 1}
                              </span>
                              
                              <div className="flex items-center gap-2 max-w-[120px]">
                                <input
                                  type="text"
                                  disabled={examSubmitted}
                                  value={userVal}
                                  onChange={(e) => {
                                    setUserAnswersP3({ ...userAnswersP3, [q.id]: e.target.value });
                                    setActiveQuestion({ part: "p3", idx: localIdx, id: q.id });
                                  }}
                                  placeholder="..."
                                  className={`w-16 px-1.5 py-1 text-center font-mono font-black text-xs border rounded-lg focus:outline-none ${
                                    examSubmitted
                                      ? isCorrect
                                        ? "bg-emerald-100 text-emerald-800 border-emerald-500"
                                        : "bg-rose-100 text-rose-800 border-rose-500"
                                      : "bg-white text-slate-800 border-slate-300 focus:border-purple-500"
                                  }`}
                                />
                                {q.unit && (
                                  <span className="text-[10px] text-slate-500 font-extrabold select-none uppercase font-mono">{q.unit}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit button on Answer Sheet card */}
                {!examSubmitted ? (
                  <button
                    onClick={handleSubmitExam}
                    className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs cursor-pointer flex items-center justify-center gap-2 rounded-2xl border-2 border-rose-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] transition-all"
                  >
                    <CheckSquare className="h-4 w-4" />
                    Nộp Bài Khảo Thí (Hoàn tất)
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="p-3.5 bg-emerald-50 border-2 border-emerald-600 text-emerald-800 rounded-2xl text-center shadow-[2px_2px_0px_0px_rgba(5,150,105,1)]">
                      <div className="text-[11px] font-black uppercase tracking-wider mb-1">KẾT QUẢ BÀI THI CỦA BẠN</div>
                      <div className="text-3xl font-black font-mono text-emerald-700 leading-none">
                        {calculateScore()} / 10.0đ
                      </div>
                      <div className="text-[10px] font-bold mt-1.5 text-emerald-600">
                        Đã nộp lúc {new Date().toLocaleTimeString("vi-VN")} | Đúng {calculateCorrectAnswersCount()} / {totalQuestionsCount()} câu
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setGeneratedExam(null);
                        setActiveQuestion(null);
                        setUserAnswersP1({});
                        setUserAnswersP2({});
                        setUserAnswersP3({});
                        setExamSubmitted(false);
                        localStorage.removeItem("physics_exam_progress");
                      }}
                      className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 font-black text-xs cursor-pointer flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-1px] transition-all"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Luyện đề khác hoặc Tạo đề mới
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Create Exam Parameters Form */
            <div className="lg:col-span-5 bg-exam-soft-cream border-2 border-slate-900 rounded-3xl p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all no-override">
              <div className="space-y-4">
                <div className="border-b-2 border-slate-900 pb-3">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
                    Cấu hình đề Vật lí 12
                  </h3>
                </div>

                {/* Creation Mode Selector */}
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                  <button
                    type="button"
                    onClick={() => setCreationMode("ai")}
                    className={`py-1.5 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer ${
                      creationMode === "ai"
                        ? "bg-cyan-400 text-slate-950 border border-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-black"
                        : "text-slate-600 hover:text-slate-900 bg-white/50 border border-transparent font-bold"
                    }`}
                  >
                    🤖 Trợ lý AI Soạn
                  </button>
                  <button
                    type="button"
                    onClick={() => setCreationMode("bank")}
                    className={`py-1.5 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer ${
                      creationMode === "bank"
                        ? "bg-purple-400 text-slate-950 border border-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-black"
                        : "text-slate-600 hover:text-slate-900 bg-white/50 border border-transparent font-bold"
                    }`}
                  >
                    📚 Lấy từ Ngân hàng
                  </button>
                </div>

                {/* Chapters Selector */}
                <div>
                  <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider block mb-1.5">Chọn Chủ đề Kiến thức:</label>
                  <div className="flex flex-wrap gap-2">
                    {chaptersOptions.map((ch) => {
                      const isSelected = selectedChapters.includes(ch);
                      return (
                        <button
                          key={ch}
                          onClick={() => handleToggleChapter(ch)}
                          className={`px-3 py-1.5 rounded-lg border-2 text-[10px] font-black transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#22d3ee] border-[#083344] text-[#083344] shadow-[2px_2px_0px_0px_#083344] translate-y-[-1px]"
                              : "bg-white border-slate-400 text-slate-700 hover:border-slate-900 hover:text-slate-950"
                          }`}
                        >
                          {ch}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time configuration with 1-minute adjustment accuracy */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider block mb-1">Thời gian làm bài:</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExamTime(prev => Math.max(1, prev - 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border-2 border-slate-900 text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[0px_0px_0px_0px_rgba(15,23,42,1)]"
                      title="Giảm 1 phút"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="flex-1 bg-white border-2 border-slate-900 text-slate-900 text-xs rounded-xl px-3 py-2 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      <input
                        type="number"
                        min={1}
                        max={180}
                        value={examTime}
                        onChange={(e) => setExamTime(Math.max(1, Number(e.target.value)))}
                        className="bg-transparent text-xs text-slate-900 outline-none w-16 font-extrabold text-center font-mono"
                      />
                      <span className="text-[10px] text-slate-600 font-black uppercase select-none">phút</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExamTime(prev => Math.min(180, prev + 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border-2 border-slate-900 text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[0px_0px_0px_0px_rgba(15,23,42,1)]"
                      title="Tăng 1 phút"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-600 mt-1 font-bold px-1">
                    <button type="button" onClick={() => setExamTime(15)} className="hover:text-cyan-600 hover:underline transition-colors cursor-pointer">15 phút (Đề nhanh)</button>
                    <button type="button" onClick={() => setExamTime(45)} className="hover:text-cyan-600 hover:underline transition-colors cursor-pointer">45 phút (1 Tiết)</button>
                    <button type="button" onClick={() => setExamTime(90)} className="hover:text-cyan-600 hover:underline transition-colors cursor-pointer">90 phút (Học kì)</button>
                  </div>
                </div>

                {/* CONDITIONAL RENDER: BANK SELECTION PORTAL */}
                {creationMode === "bank" ? (
                  <div className="space-y-3 bg-[#faf5ff] border-2 border-purple-800 p-4 rounded-xl shadow-[3px_3px_0px_0px_rgba(147,51,234,1)] no-override">
                    <div className="flex justify-between items-center border-b border-purple-300 pb-1.5 mb-1">
                      <span className="text-[10px] font-black text-purple-900 uppercase tracking-wider">
                        Ngân hàng: {selectedBankQuestionIds.length} câu đã chọn
                      </span>
                      <span className="text-[9px] text-purple-700 font-bold italic">
                        Từ Ngân hàng câu hỏi Vật lí
                      </span>
                    </div>

                    {/* Filter controls inside Bank Mode */}
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        placeholder="Tìm kiếm nội dung..."
                        value={bankSearchTerm}
                        onChange={(e) => setBankSearchTerm(e.target.value)}
                        className="w-full text-[10px] font-bold px-2 py-1.5 border-2 border-purple-800 rounded-lg outline-none bg-white placeholder-slate-400"
                      />
                      <div className="flex gap-2">
                        <select
                          value={bankFilterLevel}
                          onChange={(e) => setBankFilterLevel(e.target.value)}
                          className="flex-1 text-[10px] font-black px-2 py-1 border-2 border-purple-850 rounded-lg outline-none bg-white"
                        >
                          <option value="ALL">Mọi cấp độ</option>
                          <option value="NB">Nhận biết (NB)</option>
                          <option value="TH">Thông hiểu (TH)</option>
                          <option value="VD">Vận dụng (VD)</option>
                          <option value="VDC">Vận dụng cao (VDC)</option>
                        </select>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              const visibleIds = bankQuestions
                                .filter((q) => {
                                  if (selectedChapters.length > 0 && !selectedChapters.includes(q.chapter)) return false;
                                  if (bankSearchTerm) {
                                    const term = bankSearchTerm.toLowerCase();
                                    if (!q.text?.toLowerCase().includes(term)) return false;
                                  }
                                  if (bankFilterLevel !== "ALL") {
                                    const lvlMap: Record<string, string> = {
                                      "Nhận biết": "NB", "Thông hiểu": "TH", "Vận dụng": "VD", "Vận dụng cao": "VDC"
                                    };
                                    const qLvl = lvlMap[q.level] || q.level;
                                    if (qLvl !== bankFilterLevel) return false;
                                  }
                                  return true;
                                })
                                .map((q) => q.id);
                              setSelectedBankQuestionIds(Array.from(new Set([...selectedBankQuestionIds, ...visibleIds])));
                            }}
                            className="px-2 py-1 bg-white border border-purple-800 rounded text-[8px] font-black hover:bg-purple-100 cursor-pointer"
                          >
                            Chọn hết
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedBankQuestionIds([]);
                            }}
                            className="px-2 py-1 bg-white border border-purple-800 rounded text-[8px] font-black hover:bg-purple-100 cursor-pointer"
                          >
                            Xoá hết
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={handleAutoSelectFromBank}
                        className="flex-1 py-1.5 px-2 bg-purple-600 hover:bg-purple-700 text-white border border-purple-900 rounded-lg text-[9px] font-black cursor-pointer flex items-center justify-center gap-1 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none"
                      >
                        ⚡ Tự chọn theo Bloom tỉ lệ ({nbRatio}:{thRatio}:{vdRatio}:{vdcRatio})
                      </button>
                    </div>

                    {/* Scrollable list */}
                    <div className="max-h-52 overflow-y-auto border-2 border-purple-850 bg-white rounded-xl p-1 divide-y divide-purple-100 font-sans">
                      {bankQuestions.filter((q) => {
                        if (selectedChapters.length > 0 && !selectedChapters.includes(q.chapter)) return false;
                        if (bankSearchTerm) {
                          const term = bankSearchTerm.toLowerCase();
                          if (!q.text?.toLowerCase().includes(term)) return false;
                        }
                        if (bankFilterLevel !== "ALL") {
                          const lvlMap: Record<string, string> = {
                            "Nhận biết": "NB", "Thông hiểu": "TH", "Vận dụng": "VD", "Vận dụng cao": "VDC"
                          };
                          const qLvl = lvlMap[q.level] || q.level;
                          if (qLvl !== bankFilterLevel) return false;
                        }
                        return true;
                      }).length === 0 ? (
                        <p className="text-[10px] text-slate-500 text-center py-6 font-bold">Không tìm thấy câu hỏi phù hợp trong các Chủ đề đã chọn.</p>
                      ) : (
                        bankQuestions
                          .filter((q) => {
                            if (selectedChapters.length > 0 && !selectedChapters.includes(q.chapter)) return false;
                            if (bankSearchTerm) {
                              const term = bankSearchTerm.toLowerCase();
                              if (!q.text?.toLowerCase().includes(term)) return false;
                            }
                            if (bankFilterLevel !== "ALL") {
                              const lvlMap: Record<string, string> = {
                                "Nhận biết": "NB", "Thông hiểu": "TH", "Vận dụng": "VD", "Vận dụng cao": "VDC"
                              };
                              const qLvl = lvlMap[q.level] || q.level;
                              if (qLvl !== bankFilterLevel) return false;
                            }
                            return true;
                          })
                          .map((q) => {
                            const isSelected = selectedBankQuestionIds.includes(q.id);
                            const lvlMap: Record<string, string> = {
                              "Nhận biết": "NB", "Thông hiểu": "TH", "Vận dụng": "VD", "Vận dụng cao": "VDC"
                            };
                            const shortLvl = lvlMap[q.level] || q.level;
                            const badgeColor = 
                              shortLvl === "NB" ? "bg-cyan-50 border-cyan-300 text-cyan-800" :
                              shortLvl === "TH" ? "bg-amber-50 border-amber-300 text-amber-800" :
                              shortLvl === "VD" ? "bg-emerald-50 border-emerald-300 text-emerald-800" :
                              "bg-rose-50 border-rose-300 text-rose-800";

                            return (
                              <div
                                key={q.id}
                                onClick={() => {
                                  if (isSelected) {
                                    setSelectedBankQuestionIds(selectedBankQuestionIds.filter((id) => id !== q.id));
                                  } else {
                                    setSelectedBankQuestionIds([...selectedBankQuestionIds, q.id]);
                                  }
                                }}
                                className={`p-2 flex gap-2 items-start cursor-pointer hover:bg-purple-50 transition-all ${
                                  isSelected ? "bg-purple-100/50" : ""
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {}} // handled by click
                                  className="mt-0.5 accent-purple-600 rounded"
                                />
                                <div className="flex-1 space-y-1">
                                  <div className="text-[10px] text-slate-800 font-bold leading-normal">
                                    <FormattedMathText text={q.text} />
                                  </div>
                                  <div className="flex gap-1">
                                    <span className={`text-[8px] font-black px-1 py-0.5 rounded border ${badgeColor}`}>
                                      {shortLvl}
                                    </span>
                                    <span className="text-[8px] font-black bg-slate-100 border border-slate-300 text-slate-500 px-1 py-0.5 rounded">
                                      {q.chapter}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Parts Configuration (For AI Generation) */}
                    <div className="space-y-3 bg-[#f0fdf4] border-2 border-teal-850 p-4 rounded-xl shadow-[3px_3px_0px_0px_#115e59] no-override">
                      <span className="text-[10px] font-black text-teal-900 uppercase tracking-wider block border-b-2 border-teal-850 pb-1.5 mb-1">Cấu trúc đề thi (Số câu & Điểm):</span>
                      
                      {/* Part 1 */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-black text-teal-900">Phần I (Nhiều lựa chọn):</span>
                          <span className="text-[10px] text-teal-750 italic font-bold">Trắc nghiệm 4 lựa chọn</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center justify-between bg-white border-2 border-teal-850 rounded-lg p-1.5 shadow-[1.5px_1.5px_0px_0px_#115e59]">
                            <span className="text-[10px] text-teal-800 font-bold ml-1 shrink-0">Số câu:</span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setP1Count(prev => Math.max(0, prev - 1))}
                                className="w-5 h-5 flex items-center justify-center rounded bg-teal-50 border border-teal-800 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer animate-none"
                              >
                                <Minus className="h-2.5 w-2.5" />
                              </button>
                              <input
                                type="number"
                                min={0}
                                max={40}
                                value={p1Count}
                                onChange={(e) => setP1Count(Math.max(0, Number(e.target.value)))}
                                className="w-7 bg-transparent text-xs text-teal-950 outline-none text-center font-black font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => setP1Count(prev => Math.min(40, prev + 1))}
                                className="w-5 h-5 flex items-center justify-center rounded bg-teal-50 border border-teal-800 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer animate-none"
                              >
                                <Plus className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between bg-white border-2 border-teal-850 rounded-lg p-1.5 shadow-[1.5px_1.5px_0px_0px_#115e59]">
                            <span className="text-[10px] text-teal-800 font-bold ml-1 shrink-0">Điểm:</span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setP1Points(prev => parseFloat(Math.max(0, prev - 0.1).toFixed(1)))}
                                className="w-5 h-5 flex items-center justify-center rounded bg-teal-50 border border-teal-800 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer animate-none"
                              >
                                <Minus className="h-2.5 w-2.5" />
                              </button>
                              <input
                                type="number"
                                step={0.1}
                                min={0}
                                max={10}
                                value={p1Points}
                                onChange={(e) => setP1Points(Math.max(0, parseFloat(Number(e.target.value).toFixed(1))))}
                                className="w-9 bg-transparent text-xs text-teal-950 outline-none text-center font-black font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => setP1Points(prev => parseFloat(Math.min(10, prev + 0.1).toFixed(1)))}
                                className="w-5 h-5 flex items-center justify-center rounded bg-teal-50 border border-teal-800 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer animate-none"
                              >
                                <Plus className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Part 2 */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-black text-teal-900">Phần II (Đúng / Sai):</span>
                          <span className="text-[10px] text-teal-750 italic font-bold">Mệnh đề Đúng/Sai độc lập</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center justify-between bg-white border-2 border-teal-850 rounded-lg p-1.5 shadow-[1.5px_1.5px_0px_0px_#115e59]">
                            <span className="text-[10px] text-teal-800 font-bold ml-1 shrink-0">Số câu:</span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setP2Count(prev => Math.max(0, prev - 1))}
                                className="w-5 h-5 flex items-center justify-center rounded bg-teal-50 border border-teal-800 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer animate-none"
                              >
                                <Minus className="h-2.5 w-2.5" />
                              </button>
                              <input
                                type="number"
                                min={0}
                                max={20}
                                value={p2Count}
                                onChange={(e) => setP2Count(Math.max(0, Number(e.target.value)))}
                                className="w-7 bg-transparent text-xs text-teal-950 outline-none text-center font-black font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => setP2Count(prev => Math.min(20, prev + 1))}
                                className="w-5 h-5 flex items-center justify-center rounded bg-teal-50 border border-teal-800 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer animate-none"
                              >
                                <Plus className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between bg-white border-2 border-teal-850 rounded-lg p-1.5 shadow-[1.5px_1.5px_0px_0px_#115e59]">
                            <span className="text-[10px] text-teal-800 font-bold ml-1 shrink-0">Điểm:</span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setP2Points(prev => parseFloat(Math.max(0, prev - 0.1).toFixed(1)))}
                                className="w-5 h-5 flex items-center justify-center rounded bg-teal-50 border border-teal-800 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer animate-none"
                              >
                                <Minus className="h-2.5 w-2.5" />
                              </button>
                              <input
                                type="number"
                                step={0.1}
                                min={0}
                                max={10}
                                value={p2Points}
                                onChange={(e) => setP2Points(Math.max(0, parseFloat(Number(e.target.value).toFixed(1))))}
                                className="w-9 bg-transparent text-xs text-teal-950 outline-none text-center font-black font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => setP2Points(prev => parseFloat(Math.min(10, prev + 0.1).toFixed(1)))}
                                className="w-5 h-5 flex items-center justify-center rounded bg-teal-50 border border-teal-800 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer animate-none"
                              >
                                <Plus className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Part 3 */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-black text-teal-900">Phần III (Trả lời ngắn):</span>
                          <span className="text-[10px] text-teal-750 italic font-bold">Tự tính toán điền kết quả</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center justify-between bg-white border-2 border-teal-850 rounded-lg p-1.5 shadow-[1.5px_1.5px_0px_0px_#115e59]">
                            <span className="text-[10px] text-teal-800 font-bold ml-1 shrink-0">Số câu:</span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setP3Count(prev => Math.max(0, prev - 1))}
                                className="w-5 h-5 flex items-center justify-center rounded bg-teal-50 border border-teal-800 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer animate-none"
                              >
                                <Minus className="h-2.5 w-2.5" />
                              </button>
                              <input
                                type="number"
                                min={0}
                                max={20}
                                value={p3Count}
                                onChange={(e) => setP3Count(Math.max(0, Number(e.target.value)))}
                                className="w-7 bg-transparent text-xs text-teal-950 outline-none text-center font-black font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => setP3Count(prev => Math.min(20, prev + 1))}
                                className="w-5 h-5 flex items-center justify-center rounded bg-teal-50 border border-teal-800 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer animate-none"
                              >
                                <Plus className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between bg-white border-2 border-teal-850 rounded-lg p-1.5 shadow-[1.5px_1.5px_0px_0px_#115e59]">
                            <span className="text-[10px] text-teal-800 font-bold ml-1 shrink-0">Điểm:</span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setP3Points(prev => parseFloat(Math.max(0, prev - 0.1).toFixed(1)))}
                                className="w-5 h-5 flex items-center justify-center rounded bg-teal-50 border border-teal-800 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer animate-none"
                              >
                                <Minus className="h-2.5 w-2.5" />
                              </button>
                              <input
                                type="number"
                                step={0.1}
                                min={0}
                                max={10}
                                value={p3Points}
                                onChange={(e) => setP3Points(Math.max(0, parseFloat(Number(e.target.value).toFixed(1))))}
                                className="w-9 bg-transparent text-xs text-teal-950 outline-none text-center font-black font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => setP3Points(prev => parseFloat(Math.min(10, prev + 0.1).toFixed(1)))}
                                className="w-5 h-5 flex items-center justify-center rounded bg-teal-50 border border-teal-800 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer animate-none"
                              >
                                <Plus className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Summary Row */}
                      <div className="pt-2 border-t-2 border-teal-800 flex justify-between items-center text-[10px] font-black text-teal-900 font-mono">
                        <span>Tổng số câu: {p1Count + p2Count + p3Count} câu</span>
                        <span>Tổng điểm: {(p1Points + p2Points + p3Points).toFixed(1)}đ</span>
                      </div>
                      {parseFloat((p1Points + p2Points + p3Points).toFixed(1)) !== 10.0 && (
                        <div className="text-[9px] text-amber-600 flex items-center gap-1 leading-normal font-bold">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>Lưu ý: Tổng số điểm chưa bằng 10.0đ (Hiện tại: {(p1Points + p2Points + p3Points).toFixed(1)}đ)</span>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Cognitive ratios sliders (Simulated) */}
                <div className="space-y-2.5 bg-[#fef3c7] border-2 border-amber-700 p-3.5 rounded-xl shadow-[3px_3px_0px_0px_#b45309] no-override">
                  <span className="text-[10px] font-black text-amber-900 uppercase tracking-wider block border-b-2 border-amber-700 pb-1.5 mb-1">Tỉ lệ nhận thức Bloom (%):</span>
                  <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                    <div className="flex justify-between items-center bg-white border-2 border-amber-500 px-2 py-1 rounded shadow-[1px_1px_0px_0px_#b45309]">
                      <span className="text-amber-800 font-bold">Nhận biết (NB):</span>
                      <span className="text-amber-600 font-black">{nbRatio}%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border-2 border-amber-500 px-2 py-1 rounded shadow-[1px_1px_0px_0px_#b45309]">
                      <span className="text-amber-800 font-bold">Thông hiểu (TH):</span>
                      <span className="text-amber-600 font-black">{thRatio}%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border-2 border-amber-500 px-2 py-1 rounded shadow-[1px_1px_0px_0px_#b45309]">
                      <span className="text-amber-800 font-bold">Vận dụng (VD):</span>
                      <span className="text-emerald-700 font-black">{vdRatio}%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border-2 border-amber-500 px-2 py-1 rounded shadow-[1px_1px_0px_0px_#b45309]">
                      <span className="text-amber-800 font-bold">Vận dụng cao:</span>
                      <span className="text-rose-700 font-black">{vdcRatio}%</span>
                    </div>
                  </div>
                </div>

                {/* Exam Mode Toggle Option */}
                <div className="p-3.5 bg-[#fef2f2] border-2 border-red-700 rounded-xl space-y-2 shadow-[3px_3px_0px_0px_#991b1b] no-override">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-100 border-2 border-red-700 flex items-center justify-center text-red-700 shrink-0 shadow-[1px_1px_0px_0px_#991b1b]">
                        <AlertCircle className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-red-950 block">Chế độ ôn thi (Exam Mode)</span>
                        <span className="text-[9px] text-red-800 block leading-normal font-bold">Môi trường thi tập trung, tự động ẩn menu & đếm ngược</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsExamMode(!isExamMode)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-red-800 transition-colors duration-200 ease-in-out focus:outline-none ${
                        isExamMode ? "bg-red-500" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white border-2 border-red-800 shadow ring-0 transition duration-200 ease-in-out ${
                          isExamMode ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {creationMode === "bank" ? (
                <div className="mt-5 space-y-2">
                  <button
                    onClick={() => handleCreateExamFromBank(true)}
                    disabled={isLoadingCreate || selectedBankQuestionIds.length === 0}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs cursor-pointer flex items-center justify-center gap-2 rounded-xl border-2 border-purple-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoadingCreate ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Đang trích lục Ngân hàng...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Tạo Đề Trắc Nghiệm Thuần Túy (10đ)
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCreateHybridExam}
                    disabled={isLoadingCreate || selectedBankQuestionIds.length === 0}
                    className="w-full py-2 bg-white hover:bg-slate-100 text-slate-800 font-black text-[10px] cursor-pointer flex items-center justify-center gap-2 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoadingCreate ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        Đang liên kết AI...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                        Tạo Đề Kết Hợp (Phần I Bank + II,III AI)
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleCreateExam}
                  disabled={isLoadingCreate}
                  className="w-full mt-5 py-3.5 btn-3d-cyan text-xs cursor-pointer flex items-center justify-center gap-2 rounded-xl"
                >
                  {isLoadingCreate ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Đang sinh ma trận & soạn đề Lý...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Bắt đầu soạn đề kiểm tra bằng AI
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Create Exam Output Viewport */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {generatedExam ? (
              <div className="bg-white text-slate-900 border-2 border-slate-900 rounded-3xl p-6 space-y-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all no-override">
                {/* Generated Headers & Specifications buttons */}
                <div className="flex flex-wrap justify-between items-start gap-4 border-b-2 border-slate-900 pb-4">
                  <div>
                    <h3 className="text-md font-black text-slate-900">Đề khảo sát năng lực Vật lí 12</h3>
                    <p className="text-[11px] text-slate-700 mt-0.5 font-bold">Thời gian: {examTime} phút | Chủ đề: {selectedChapters.join(", ")}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsExamMode(!isExamMode)}
                      className={`px-3 py-1.5 border-2 rounded-lg text-[10px] font-black flex items-center gap-1 cursor-pointer transition-all ${
                        isExamMode
                          ? "bg-amber-100 border-amber-850 text-amber-900 shadow-[2px_2px_0px_0px_#92400e]"
                          : "bg-white border-slate-900 text-slate-800 hover:text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]"
                      }`}
                    >
                      <AlertCircle className="h-3 w-3" />
                      {isExamMode ? "Hủy Ôn Thi" : "Bật Ôn Thi"}
                    </button>
                    <button
                      onClick={handleShuffleExam}
                      className="px-3 py-1.5 bg-white border-2 border-slate-900 hover:border-slate-800 text-slate-800 hover:text-slate-950 rounded-lg text-[10px] font-black flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_0px_#0f172a]"
                    >
                      <Shuffle className="h-3 w-3" />
                      Trộn đề / Đổi Mã
                    </button>
                    <button
                      onClick={() => alert("Đã lưu trữ ma trận và đặc tả PDF/Word về thư mục của bạn!")}
                      className="px-3 py-1.5 bg-white border-2 border-slate-900 hover:border-slate-800 text-slate-800 hover:text-slate-950 rounded-lg text-[10px] font-black flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_0px_#0f172a]"
                    >
                      <Download className="h-3 w-3" />
                      Tải File
                    </button>
                  </div>
                </div>

                {/* Countdown Timer & Anti-Cheat status bar */}
                <div className="flex flex-col md:flex-row items-stretch gap-3 p-4 bg-[#f8fafc] border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a]">
                  {/* Countdown display */}
                  <div className="flex-1 flex items-center justify-between px-4 py-3 bg-white rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isTimerRunning && !examSubmitted ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                      <span className="text-xs text-slate-600 font-black uppercase tracking-wide">Thời gian làm bài còn lại:</span>
                    </div>
                    <span className={`text-2xl font-black font-mono tracking-wider ${timeLeft < 60 ? "text-red-600 animate-bounce" : timeLeft < 300 ? "text-amber-600" : "text-cyan-600"}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>

                  {/* Violation Tracker */}
                  <div className="flex-1 flex items-center justify-between px-4 py-3 bg-white rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                    <span className="text-xs text-slate-600 font-black uppercase tracking-wide">Vi phạm (thu nhỏ/rời tab):</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-black font-mono px-2.5 py-1 rounded-lg ${cheatCount > 0 ? "bg-red-100 text-red-800 border-2 border-red-800" : "bg-slate-100 text-slate-700 border-2 border-slate-800"}`}>
                        {cheatCount} lần
                      </span>
                    </div>
                  </div>
                </div>

                {/* Auto-save Status Indicator in Regular Mode */}
                {lastAutoSaved && (
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#f0fdf4] border-2 border-emerald-800 rounded-2xl text-[10.5px] shadow-[2px_2px_0px_0px_#065f46]">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-black">
                      <span>💾</span>
                      <span>Trạng thái lưu bài làm:</span>
                    </div>
                    <span className={`font-mono font-black ${showAutoSavedIndicator ? "text-cyan-750 animate-pulse" : "text-emerald-700"}`}>
                      {showAutoSavedIndicator ? "⚡ Đang tự động lưu tiến trình..." : `Đã lưu tự động thành công lúc ${lastAutoSaved}`}
                    </span>
                  </div>
                )}

                {/* Active visual warning banner if cheatCount > 0 and showCheatWarning is true */}
                {showCheatWarning && (
                  <div className="p-4 bg-[#fef2f2] border-2 border-red-800 rounded-2xl space-y-3 shadow-[4px_4px_0px_0px_#991b1b] no-override">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-black text-red-900">CẢNH BÁO GIÁM SÁT THI CỬ!</h4>
                        <p className="text-xs text-red-800 font-bold leading-relaxed mt-1">
                          {lastWarningMsg || "Hệ thống phát hiện bạn vừa thay đổi kích thước trình duyệt hoặc rời khỏi tiêu điểm màn hình làm bài!"}
                          <br />
                          Mọi hành động này đều được ghi nhận tự động phục vụ công tác thanh tra. Số lần phát hiện vi phạm hiện tại: <strong className="text-red-600 font-black">{cheatCount} lần</strong>. Vui lòng nghiêm túc hoàn thành bài làm.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowCheatWarning(false)}
                        className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-lg transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-black"
                      >
                        Tôi cam kết tập trung làm bài
                      </button>
                    </div>
                  </div>
                )}

                {/* Cognitive Matrix Text info */}
                <div className="bg-[#f8fafc] p-4 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] no-override">
                  <span className="text-[9px] font-black text-slate-600 block uppercase tracking-wider mb-2">Ma trận đề & Đặc tả năng lực GDPT 2018 (Từ AI):</span>
                  <div className="text-[11px] text-slate-800 font-mono font-bold whitespace-pre-line leading-relaxed">
                    {generatedExam.matrix}
                    <br />
                    {generatedExam.specifications}
                  </div>
                </div>

                {/* Interactive Questions list */}
                <div className="space-y-6">
                  {/* PHẦN I */}
                  {generatedExam.questionsPart1 && generatedExam.questionsPart1.length > 0 && (
                    <div className="space-y-4">
                      <div className="p-3.5 bg-slate-900 text-cyan-400 border-2 border-slate-950 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 shadow-[3px_3px_0px_0px_#0ea5e9]">
                        <span className="text-[11px] font-black uppercase tracking-wide">PHẦN I. Câu hỏi trắc nghiệm nhiều lựa chọn ({p1Points.toFixed(1)} điểm)</span>
                        <span className="text-[10px] font-mono text-slate-400 italic">Mỗi câu đúng được {(p1Points / generatedExam.questionsPart1.length).toFixed(2)}đ</span>
                      </div>
                      
                      {generatedExam.questionsPart1.map((q: any, idx: number) => {
                        const isActive = activeQuestion?.part === "p1" && activeQuestion?.idx === idx;
                        return (
                          <div
                            key={q.id}
                            id={`question-p1-${idx}`}
                            onClick={() => setActiveQuestion({ part: "p1", idx, id: q.id })}
                            className={`space-y-3 p-5 text-slate-900 border-2 rounded-2xl transition-all cursor-pointer ${
                              isActive
                                ? "bg-purple-100 border-purple-600 shadow-[4px_4px_0px_0px_#9333ea] ring-2 ring-purple-400"
                                : "bg-[#f0f9ff] border-slate-900 shadow-[4px_4px_0px_0px_#0ea5e9] hover:bg-sky-50"
                            }`}
                          >
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-slate-600 bg-cyan-100/80 border border-cyan-200/80 px-2 py-0.5 rounded-md select-none">Câu {idx + 1} ({q.level}):</span>
                              {isActive && <span className="text-[10px] bg-purple-600 text-white font-black px-2 py-0.5 rounded animate-bounce select-none">ĐANG CHỌN</span>}
                              <span className="text-[10px] text-slate-500 font-bold italic select-none">{q.chapter}</span>
                            </div>
                            <div className="text-sm font-black leading-relaxed text-slate-900 bg-white p-3.5 rounded-xl border-2 border-slate-900 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)]">
                              <FormattedMathText text={q.text} />
                            </div>

                            <QuestionIllustration type={q.illustrationType} questionText={q.text} />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                              {q.options.map((opt: string, optIdx: number) => {
                                const optText = opt.trim();
                                const hasLetterPrefix = /^[A-D]\.\s/.test(optText);
                                const letter = hasLetterPrefix ? optText.charAt(0) : String.fromCharCode(65 + optIdx);
                                const body = hasLetterPrefix ? optText.substring(3) : optText;
                                const isSelected = userAnswersP1[q.id] === letter;
                                return (
                                  <button
                                    key={optIdx}
                                    disabled={examSubmitted}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent clicking option from triggering double activeQuestion change unnecessarily
                                      setUserAnswersP1({ ...userAnswersP1, [q.id]: letter });
                                      setActiveQuestion({ part: "p1", idx, id: q.id });
                                    }}
                                    className={`p-3 rounded-xl text-left text-xs transition-all border-2 cursor-pointer font-bold ${
                                      isSelected
                                        ? "bg-cyan-100 border-slate-900 text-cyan-950 shadow-[2px_2px_0px_0px_#0284c7] -translate-x-[1px] -translate-y-[1px]"
                                        : "bg-white border-slate-900 text-slate-800 hover:bg-slate-50 shadow-[2px_2px_0px_0px_#64748b] hover:shadow-[3px_3px_0px_0px_#475569] hover:-translate-x-[1px] hover:-translate-y-[1px]"
                                    }`}
                                  >
                                    <span className="font-black mr-1.5 text-cyan-700">{letter}.</span> <FormattedMathText text={body} />
                                  </button>
                                );
                              })}
                            </div>

                            {examSubmitted && (
                              <div className="p-3.5 bg-white rounded-xl border-2 border-slate-900 text-[11px] space-y-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] text-slate-800">
                                <div className="flex gap-2 items-center">
                                  <span className="font-bold text-slate-500">Đáp án chính xác:</span>
                                  <span className={`font-black px-2 py-0.5 rounded text-xs ${userAnswersP1[q.id] === q.answer ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-rose-100 text-rose-800 border border-rose-300"}`}>
                                    {q.answer}
                                  </span>
                                </div>
                                <p className="text-slate-600 font-medium italic pl-2 border-l-2 border-cyan-500">
                                  <span className="font-bold text-slate-700 not-italic">Lý giải:</span> <FormattedMathText text={q.explanation} />
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* PHẦN II */}
                  {generatedExam.questionsPart2 && generatedExam.questionsPart2.length > 0 && (
                    <div className="space-y-4">
                      <div className="p-3.5 bg-slate-900 text-purple-400 border-2 border-slate-950 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 shadow-[3px_3px_0px_0px_#a855f7]">
                        <span className="text-[11px] font-black uppercase tracking-wide">PHẦN II. Câu hỏi trắc nghiệm Đúng/Sai ({p2Points.toFixed(1)} điểm)</span>
                        <span className="text-[10px] font-mono text-slate-400 italic">Tính điểm tối đa {p2Points.toFixed(1)}đ theo quy chế thi THPT</span>
                      </div>

                      {generatedExam.questionsPart2.map((q: any, idx: number) => {
                        const isActive = activeQuestion?.part === "p2" && activeQuestion?.idx === idx;
                        return (
                          <div
                            key={q.id}
                            id={`question-p2-${idx}`}
                            onClick={() => setActiveQuestion({ part: "p2", idx, id: q.id })}
                            className={`space-y-4 p-5 text-slate-900 border-2 rounded-2xl transition-all cursor-pointer ${
                              isActive
                                ? "bg-purple-100 border-purple-600 shadow-[4px_4px_0px_0px_#9333ea] ring-2 ring-purple-400"
                                : "bg-[#faf5ff] border-slate-900 shadow-[4px_4px_0px_0px_#a855f7] hover:bg-purple-50/50"
                            }`}
                          >
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-slate-600 bg-purple-100/80 border border-purple-200/80 px-2 py-0.5 rounded-md select-none">Câu {idx + 1} ({q.level}):</span>
                              {isActive && <span className="text-[10px] bg-purple-600 text-white font-black px-2 py-0.5 rounded animate-bounce select-none">ĐANG CHỌN</span>}
                              <span className="text-[10px] text-slate-500 font-bold italic select-none">{q.chapter}</span>
                            </div>
                            <div className="text-sm font-black leading-relaxed text-slate-900 bg-white p-3.5 rounded-xl border-2 border-slate-900 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)]">
                              <FormattedMathText text={q.question} />
                            </div>

                            <QuestionIllustration type={q.illustrationType} questionText={q.question} />
                            
                            <div className="space-y-3">
                              {q.statements.map((st: any, stIdx: number) => {
                                const userVal = userAnswersP2[q.id]?.[st.id]; // "T" or "F" or undefined
                                const isStCorrect = (st.isCorrect && userVal === "T") || (!st.isCorrect && userVal === "F");
                                return (
                                  <div key={st.id} className="p-3.5 bg-white border-2 border-slate-900 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 shadow-[2px_2px_0px_0px_#c084fc] hover:shadow-[3px_3px_0px_0px_#a855f7] transition-all">
                                    <div className="space-y-1">
                                      <span className="text-[10px] font-black text-purple-700 font-mono font-bold select-none">Ý {String.fromCharCode(97 + stIdx)})</span>
                                      <p className="text-xs text-slate-800 font-bold leading-relaxed">
                                        <FormattedMathText text={st.text} />
                                      </p>
                                    </div>
                                    
                                    <div className="flex gap-2 shrink-0">
                                      {/* TRUE BUTTON */}
                                      <button
                                        disabled={examSubmitted}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const currentAnswers = { ...userAnswersP2 };
                                          currentAnswers[q.id] = { ...currentAnswers[q.id], [st.id]: "T" };
                                          setUserAnswersP2(currentAnswers);
                                          setActiveQuestion({ part: "p2", idx, id: q.id });
                                        }}
                                        className={`px-3 py-1.5 text-[10px] font-black rounded-lg border-2 cursor-pointer transition-all ${
                                          examSubmitted
                                            ? st.isCorrect
                                              ? "bg-emerald-100 border-slate-900 text-emerald-800 shadow-[1px_1px_0px_0px_#10b981]"
                                              : userVal === "T"
                                              ? "bg-rose-100 border-slate-900 text-rose-800 shadow-[1px_1px_0px_0px_#f43f5e]"
                                              : "bg-slate-50 border-slate-200 text-slate-400 opacity-40 shadow-none"
                                            : userVal === "T"
                                            ? "bg-cyan-100 border-slate-900 text-cyan-950 shadow-[1px_1px_0px_0px_#0284c7]"
                                            : "bg-white border-slate-900 text-slate-700 hover:bg-slate-50 hover:shadow-[1px_1px_0px_0px_#94a3b8]"
                                        }`}
                                      >
                                        Đúng
                                      </button>

                                      {/* FALSE BUTTON */}
                                      <button
                                        disabled={examSubmitted}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const currentAnswers = { ...userAnswersP2 };
                                          currentAnswers[q.id] = { ...currentAnswers[q.id], [st.id]: "F" };
                                          setUserAnswersP2(currentAnswers);
                                          setActiveQuestion({ part: "p2", idx, id: q.id });
                                        }}
                                        className={`px-3 py-1.5 text-[10px] font-black rounded-lg border-2 cursor-pointer transition-all ${
                                          examSubmitted
                                            ? !st.isCorrect
                                              ? "bg-emerald-100 border-slate-900 text-emerald-800 shadow-[1px_1px_0px_0px_#10b981]"
                                              : userVal === "F"
                                              ? "bg-rose-100 border-slate-900 text-rose-800 shadow-[1px_1px_0px_0px_#f43f5e]"
                                              : "bg-slate-50 border-slate-200 text-slate-400 opacity-40 shadow-none"
                                            : userVal === "F"
                                            ? "bg-cyan-100 border-slate-900 text-cyan-950 shadow-[1px_1px_0px_0px_#0284c7]"
                                            : "bg-white border-slate-900 text-slate-700 hover:bg-slate-50 hover:shadow-[1px_1px_0px_0px_#94a3b8]"
                                        }`}
                                      >
                                        Sai
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {examSubmitted && (
                              <div className="p-3.5 bg-white rounded-xl border-2 border-slate-900 text-[11px] space-y-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] text-slate-800">
                                <span className="font-bold text-slate-500 uppercase block tracking-wider select-none">Đáp án chi tiết Phần II:</span>
                                <div className="space-y-2 pl-2 border-l-2 border-purple-500">
                                  {q.statements.map((st: any, stIdx: number) => {
                                    const userVal = userAnswersP2[q.id]?.[st.id];
                                    const stCorrect = (st.isCorrect && userVal === "T") || (!st.isCorrect && userVal === "F");
                                    return (
                                      <div key={st.id} className="text-[11px] leading-relaxed">
                                        <span className="font-mono font-bold text-purple-700">Ý {String.fromCharCode(97 + stIdx)}):</span>{" "}
                                        <span className={`px-1.5 py-0.5 rounded font-black text-[10px] ${st.isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                                          {st.isCorrect ? "ĐÚNG" : "SAI"}
                                        </span>{" "}
                                        - <span className={stCorrect ? "text-emerald-700 font-bold" : "text-rose-700 font-bold"}>
                                          {stCorrect ? "🎉 Bạn trả lời đúng!" : "❌ Chưa chính xác."}
                                        </span>
                                        <p className="text-slate-500 italic text-[10px] mt-0.5 pl-4">
                                          <span className="font-bold text-slate-700 not-italic">Lý giải:</span> <FormattedMathText text={st.explanation} />
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* PHẦN III */}
                  {generatedExam.questionsPart3 && generatedExam.questionsPart3.length > 0 && (
                    <div className="space-y-4">
                      <div className="p-3.5 bg-slate-900 text-amber-400 border-2 border-slate-950 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 shadow-[3px_3px_0px_0px_#f59e0b]">
                        <span className="text-[11px] font-black uppercase tracking-wide">PHẦN III. Câu hỏi trắc nghiệm trả lời ngắn ({p3Points.toFixed(1)} điểm)</span>
                        <span className="text-[10px] font-mono text-slate-400 italic">Mỗi câu đúng được {(p3Points / generatedExam.questionsPart3.length).toFixed(2)}đ</span>
                      </div>

                      {generatedExam.questionsPart3.map((q: any, idx: number) => {
                        const userVal = userAnswersP3[q.id] || "";
                        const cleanUser = userVal.trim().replace(",", ".");
                        const cleanAns = String(q.answer).trim().replace(",", ".");
                        const isCorrect = examSubmitted && (cleanUser === cleanAns || parseFloat(cleanUser) === parseFloat(cleanAns));
                        const isActive = activeQuestion?.part === "p3" && activeQuestion?.idx === idx;
                        
                        return (
                          <div
                            key={q.id}
                            id={`question-p3-${idx}`}
                            onClick={() => setActiveQuestion({ part: "p3", idx, id: q.id })}
                            className={`space-y-4 p-5 text-slate-900 border-2 rounded-2xl transition-all cursor-pointer ${
                              isActive
                                ? "bg-purple-100 border-purple-600 shadow-[4px_4px_0px_0px_#9333ea] ring-2 ring-purple-400"
                                : "bg-[#fffbeb] border-slate-900 shadow-[4px_4px_0px_0px_#f59e0b] hover:bg-amber-50/50"
                            }`}
                          >
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-slate-600 bg-amber-100/80 border border-amber-200/80 px-2 py-0.5 rounded-md select-none">Câu {idx + 1} ({q.level}):</span>
                              {isActive && <span className="text-[10px] bg-purple-600 text-white font-black px-2 py-0.5 rounded animate-bounce select-none">ĐANG CHỌN</span>}
                              <span className="text-[10px] text-slate-500 font-bold italic select-none">{q.chapter}</span>
                            </div>
                            <div className="text-sm font-black leading-relaxed text-slate-900 bg-white p-3.5 rounded-xl border-2 border-slate-900 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)]">
                              <FormattedMathText text={q.text} />
                            </div>

                            <QuestionIllustration type={q.illustrationType} questionText={q.text} />
                            
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-xs text-slate-700 font-black">Đáp án của bạn:</span>
                              <div className="relative">
                                <input
                                  type="text"
                                  disabled={examSubmitted}
                                  value={userVal}
                                  onChange={(e) => {
                                    setUserAnswersP3({ ...userAnswersP3, [q.id]: e.target.value });
                                    setActiveQuestion({ part: "p3", idx, id: q.id });
                                  }}
                                  placeholder="Nhập kết quả số..."
                                  className={`px-3 py-2 text-xs bg-white text-slate-900 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all font-mono w-44 font-bold ${
                                    examSubmitted
                                      ? isCorrect
                                        ? "border-emerald-500 bg-emerald-50 text-emerald-950 shadow-[2px_2px_0px_0px_#10b981]"
                                        : "border-rose-500 bg-rose-50 text-rose-950 shadow-[2px_2px_0px_0px_#f43f5e]"
                                      : "border-slate-900 shadow-[2px_2px_0px_0px_#000]"
                                  }`}
                                />
                                {q.unit && (
                                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-black uppercase select-none">{q.unit}</span>
                                )}
                              </div>
                              {examSubmitted && (
                                <span className={`text-xs font-black uppercase px-2 py-1 rounded-md border ${isCorrect ? "bg-emerald-100 border-emerald-300 text-emerald-800" : "bg-rose-100 border-rose-300 text-rose-800"}`}>
                                  {isCorrect ? "Chính xác" : "Chưa đúng"}
                                </span>
                              )}
                            </div>

                            {examSubmitted && (
                              <div className="p-3.5 bg-white rounded-xl border-2 border-slate-900 text-[11px] space-y-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] text-slate-800">
                                <div className="flex gap-2 items-center">
                                  <span className="font-bold text-slate-500">Đáp án chính xác:</span>
                                  <span className="font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded font-mono text-xs">
                                    {q.answer} {q.unit || ""}
                                  </span>
                                </div>
                                <p className="text-slate-600 font-medium italic pl-2 border-l-2 border-amber-500">
                                  <span className="font-bold text-slate-700 not-italic">Lý giải:</span> <FormattedMathText text={q.explanation} />
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Submit simulated test button */}
                {!examSubmitted ? (
                  <button
                    onClick={submitExamAnswers}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-md shadow-emerald-500/15 text-xs cursor-pointer"
                  >
                    Nộp bài thi & Chấm điểm tự động
                  </button>
                ) : (
                  <div className="space-y-5">
                    {/* Kết quả thi */}
                    <div className="bg-slate-950 p-5 border border-emerald-500/20 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-500 block uppercase tracking-wider font-semibold">Kết quả thi trắc nghiệm:</span>
                          <span className="text-xl font-bold font-mono text-emerald-400">{examScore} / 10 điểm</span>
                        </div>
                        <button
                          onClick={() => {
                            setExamSubmitted(false);
                            setUserAnswersP1({});
                            setUserAnswersP2({});
                            setUserAnswersP3({});
                            setScoreBreakdown({ p1: 0, p2: 0, p3: 0, total: 0 });
                            setChapterAIExplanations({});
                          }}
                          className="px-3.5 py-2 bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl hover:text-white transition-colors cursor-pointer font-bold"
                        >
                          Làm lại đề này
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-400">
                        <div className="bg-slate-900/40 p-2 rounded">
                          <span className="block text-slate-500 uppercase">Phần I:</span>
                          <span className="text-cyan-400 font-bold">{scoreBreakdown.p1.toFixed(2)}đ / {p1Points.toFixed(1)}đ</span>
                        </div>
                        <div className="bg-slate-900/40 p-2 rounded">
                          <span className="block text-slate-500 uppercase">Phần II:</span>
                          <span className="text-purple-400 font-bold">{scoreBreakdown.p2.toFixed(2)}đ / {p2Points.toFixed(1)}đ</span>
                        </div>
                        <div className="bg-slate-900/40 p-2 rounded">
                          <span className="block text-slate-500 uppercase">Phần III:</span>
                          <span className="text-amber-400 font-bold">{scoreBreakdown.p3.toFixed(2)}đ / {p3Points.toFixed(1)}đ</span>
                        </div>
                      </div>
                    </div>

                    {/* GỢI Ý CHỦ ĐỀ ÔN TẬP CÁ NHÂN HOÁ DƯỚI KẾT QUẢ THI */}
                    {(() => {
                      const wrongQs = getIncorrectQuestions();
                      if (wrongQs.length === 0) {
                        return (
                          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 p-5 rounded-2xl text-center space-y-2">
                            <span className="text-2xl block">🎉</span>
                            <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest">Tuyệt vời! Đạt kết quả tối đa</h4>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                              Chúc mừng bạn đã hoàn thành xuất sắc tất cả câu hỏi trong bài kiểm tra này và đạt điểm số tối đa 10/10! Hãy duy trì tinh thần và phương pháp học tập tuyệt vời này trong các chủ đề tiếp theo nhé.
                            </p>
                          </div>
                        );
                      }

                      // Group incorrect questions by chapter
                      const wrongByCh: Record<string, typeof wrongQs> = {};
                      wrongQs.forEach((q) => {
                        const ch = q.chapter || "Vật lí nhiệt";
                        if (!wrongByCh[ch]) wrongByCh[ch] = [];
                        wrongByCh[ch].push(q);
                      });

                      return (
                        <div className="bg-slate-950 p-5 border border-cyan-500/15 rounded-2xl space-y-4 shadow-xl">
                          <div className="flex items-center gap-2.5 border-b border-slate-900 pb-3">
                            <Brain className="h-5 w-5 text-cyan-400 animate-pulse" />
                            <div>
                              <h4 className="text-xs font-black text-cyan-400 uppercase tracking-wider">Hệ thống gợi ý ôn tập thông minh (AI-Powered)</h4>
                              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Phân tích lỗ hổng kiến thức dựa trên {wrongQs.length} câu làm sai của bạn</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {Object.entries(wrongByCh).map(([chName, list]) => {
                              const recs = getChapterRecommendations(chName);
                              const isExplaining = loadingExplanationForChapter === chName;
                              const explanationText = chapterAIExplanations[chName];

                              return (
                                <div key={chName} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-3.5 hover:border-slate-700 transition-colors">
                                  {/* Header chi tiết chương */}
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-950 pb-2.5">
                                    <div className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                                      <span className="text-xs font-black text-white">{recs.title}</span>
                                    </div>
                                    <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-mono font-black rounded uppercase shrink-0">
                                      Cần cải thiện: {list.length} câu sai
                                    </span>
                                  </div>

                                  {/* Tóm tắt câu làm sai */}
                                  <div className="space-y-2">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Câu hỏi bạn đã trả lời chưa đúng:</span>
                                    <div className="grid grid-cols-1 gap-2">
                                      {list.map((q) => (
                                        <div key={q.id} className="text-[11px] leading-relaxed bg-slate-950/40 border border-slate-900 rounded-lg p-2.5 space-y-1">
                                          <div className="flex items-center gap-1.5 text-slate-400 flex-wrap">
                                            <span className="font-black text-cyan-400">{q.partName} - Câu {q.questionNum}:</span>
                                            <span className="text-[10px] italic">Bạn chọn: <span className="text-rose-400 font-bold font-mono">{q.userAnswer}</span></span>
                                            <span className="text-[10px] shrink-0 text-slate-600">•</span>
                                            <span className="text-[10px] italic">Đáp án: <span className="text-emerald-400 font-bold font-mono">{q.correctAnswer}</span></span>
                                          </div>
                                          <p className="text-slate-300 font-medium">
                                            <FormattedMathText text={q.text} />
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Công thức và lưu ý lý thuyết */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                                    <div className="space-y-1.5 bg-slate-950/20 p-3 rounded-xl border border-slate-900/60">
                                      <span className="text-[9.5px] font-black text-amber-500 uppercase tracking-wider flex items-center gap-1">
                                        🧮 Công thức trọng tâm cần nhớ
                                      </span>
                                      <ul className="space-y-1 text-[11px] text-slate-300 font-mono pl-1">
                                        {recs.formulas.map((f, fIdx) => (
                                          <li key={fIdx} className="leading-normal">• {f}</li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="space-y-1.5 bg-slate-950/20 p-3 rounded-xl border border-slate-900/60">
                                      <span className="text-[9.5px] font-black text-cyan-500 uppercase tracking-wider flex items-center gap-1">
                                        💡 Trọng tâm lý thuyết và mẹo tránh bẫy
                                      </span>
                                      <ul className="space-y-1 text-[11px] text-slate-300 leading-relaxed list-disc pl-3">
                                        {recs.focusPoints.map((p, pIdx) => (
                                          <li key={pIdx}>{p}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>

                                  {/* Bài học khuyến nghị và nút AI giảng giải */}
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-900">
                                    <div className="space-y-1">
                                      <span className="text-[9px] font-bold text-slate-500 uppercase block">Bài đọc SGK đề nghị rà soát lại:</span>
                                      <div className="flex flex-wrap gap-1.5">
                                        {recs.lessons.map((less) => (
                                          <span key={less.id} className="text-[10px] font-black text-cyan-400 bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">
                                            {less.name}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Action button triggers Gemini call */}
                                    <button
                                      disabled={isExplaining}
                                      onClick={() => handleFetchChapterExplanation(chName, list)}
                                      className="px-3 py-2 bg-gradient-to-r from-cyan-600 to-cyan-700 text-slate-950 font-black rounded-lg text-[10px] hover:from-cyan-500 hover:to-cyan-600 transition-all shrink-0 cursor-pointer flex items-center gap-1"
                                    >
                                      {isExplaining ? (
                                        <>
                                          <RefreshCw className="h-3 w-3 animate-spin" />
                                          AI ĐANG PHÂN TÍCH...
                                        </>
                                      ) : (
                                        <>
                                          <Sparkles className="h-3 w-3" />
                                          XEM AI GIẢNG BÀI & PHÂN TÍCH LỖI
                                        </>
                                      )}
                                    </button>
                                  </div>

                                  {/* AI response panel hiển thị kết quả */}
                                  {explanationText && (
                                    <div className="bg-slate-950 border border-cyan-500/10 p-4 rounded-xl text-[11px] leading-relaxed space-y-2 mt-3 animate-fade-in text-slate-300 shadow-inner max-h-72 overflow-y-auto">
                                      <div className="flex items-center gap-1.5 border-b border-slate-900 pb-1.5 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                                        <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                                        Bài giảng gia sư AI (Phân tích lỗi sai):
                                      </div>
                                      <div className="whitespace-pre-wrap font-sans">
                                        {explanationText}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-exam-soft-sky border-2 border-slate-900 rounded-3xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[350px] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <FileText className="h-10 w-10 text-cyan-600 mb-3 animate-none" />
                <span className="text-xs text-slate-900 font-black max-w-sm leading-relaxed uppercase font-mono">
                  Thiết lập các thông số về chủ đề và tỷ lệ Bloom bên cột trái rồi nhấn "Soạn đề kiểm tra" để bắt đầu soạn thảo.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "analyze" && (
        // ANALYZE EXISTING EXAM VIEW
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Analyze Form (Upload/Paste) */}
          <div className="lg:col-span-5 bg-white text-slate-900 border-2 border-slate-900 rounded-3xl p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all no-override">
            <div className="space-y-4">
              <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Brain className="h-4.5 w-4.5 text-cyan-600" />
                  Đánh giá phản biện đề Lý
                </h3>
                <button
                  onClick={() => {
                    setRawText(SAMPLE_EXAM_TEXT);
                    setUploadedFile("de_mau_ky_2_vat_li_12.txt");
                  }}
                  className="text-[10px] text-indigo-600 hover:underline font-black"
                >
                  Nhập nhanh đề thi mẫu
                </button>
              </div>

              {/* Paste Text area */}
              <div>
                <label className="text-[10px] font-black text-slate-600 uppercase block mb-1">Dán văn bản đề kiểm tra (hoặc kéo thả ảnh/PDF):</label>
                <textarea
                  rows={8}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Dán toàn bộ các câu hỏi trắc nghiệm kèm đáp án ở đây..."
                  className="w-full bg-[#f8fafc] border-2 border-slate-900 text-slate-900 text-xs rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-400 transition-colors placeholder-slate-400 font-medium"
                />
              </div>

              {/* Simulated File upload box */}
              <div>
                <label className="text-[10px] font-black text-slate-600 uppercase block mb-1">Hoặc tải lên File PDF, DOCX, Ảnh (.jpg, .png)</label>
                <div className="border-2 border-dashed border-slate-400 rounded-xl p-3 bg-slate-50 text-center flex flex-col items-center gap-1">
                  <input
                    type="file"
                    id="analyze-file"
                    accept=".pdf,.docx,.jpg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="analyze-file" className="text-xs text-indigo-600 cursor-pointer font-black hover:underline">
                    {uploadedFile ? uploadedFile : "Chọn tệp tin đề kiểm tra"}
                  </label>
                  <span className="text-[9px] text-slate-500 font-bold">Tự động nhận diện nội dung OCR thông minh đối với ảnh đề chụp</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleAnalyzeExam}
              disabled={isLoadingAnalyze}
              className="w-full mt-5 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-xs cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoadingAnalyze ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  AI đang OCR & Lập bảng ma trận...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Bắt đầu phân tích phản biện đề
                </>
              )}
            </button>
          </div>

          {/* Analyze Outputs */}
          <div className="lg:col-span-7">
            {analyzedResult ? (
              <div className="bg-white text-slate-900 border-2 border-slate-900 rounded-3xl p-6 space-y-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all no-override">
                <div className="border-b-2 border-slate-900 pb-3">
                  <h3 className="text-sm font-black text-slate-900">Kết quả khảo thí & Thống kê độ tương thích</h3>
                  <span className="text-[10px] text-slate-600 font-bold block mt-0.5">Mẫu đề: {analyzedResult.extractedTitle || "Đề thi được phát hiện"}</span>
                </div>

                {/* Score Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#f8fafc] p-3 rounded-xl border-2 border-slate-900 text-center shadow-[2px_2px_0px_0px_#0f172a]">
                    <span className="text-[8px] text-slate-600 font-black block uppercase">Tổng số câu hỏi</span>
                    <span className="text-lg font-black text-slate-900 mt-1 block">{analyzedResult.stats.totalQuestions} câu</span>
                  </div>
                  <div className="bg-[#f8fafc] p-3 rounded-xl border-2 border-slate-900 text-center shadow-[2px_2px_0px_0px_#0f172a]">
                    <span className="text-[8px] text-slate-600 font-black block uppercase">Nhận biết (NB)</span>
                    <span className="text-lg font-black text-cyan-700 mt-1 block">{analyzedResult.stats.nbCount} câu</span>
                  </div>
                  <div className="bg-[#f8fafc] p-3 rounded-xl border-2 border-slate-900 text-center shadow-[2px_2px_0px_0px_#0f172a]">
                    <span className="text-[8px] text-slate-600 font-black block uppercase">Thông hiểu (TH)</span>
                    <span className="text-lg font-black text-amber-700 mt-1 block">{analyzedResult.stats.thCount} câu</span>
                  </div>
                  <div className="bg-[#f8fafc] p-3 rounded-xl border-2 border-slate-900 text-center shadow-[2px_2px_0px_0px_#0f172a]">
                    <span className="text-[8px] text-slate-600 font-black block uppercase">Vận dụng (VD+VDC)</span>
                    <span className="text-lg font-black text-emerald-700 mt-1 block">
                      {analyzedResult.stats.vdCount + analyzedResult.stats.vdcCount} câu
                    </span>
                  </div>
                </div>

                {/* Compliance assessment & Recommendations */}
                <div className="space-y-3">
                  <div className="p-3 bg-[#faf5ff] rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] no-override">
                    <span className="text-[10px] font-black text-purple-800 block uppercase tracking-wider mb-1">Mức độ tương thích GDPT 2018:</span>
                    <p className="text-xs text-slate-800 font-bold leading-relaxed">{analyzedResult.gdptComplianceEvaluation}</p>
                  </div>

                  <div className="p-3 bg-[#fffbeb] rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] no-override">
                    <span className="text-[10px] font-black text-amber-800 block uppercase tracking-wider mb-1">Khuyến nghị điều chỉnh từ AI:</span>
                    <p className="text-xs text-slate-800 font-bold leading-relaxed">{analyzedResult.recommendations}</p>
                  </div>

                  <div className="p-3 bg-[#fef2f2] rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] no-override">
                    <span className="text-[10px] font-black text-red-800 block uppercase tracking-wider mb-1">Phát hiện câu hỏi trùng lặp hoặc mâu thuẫn:</span>
                    <p className="text-xs text-slate-800 font-bold leading-relaxed">{analyzedResult.duplicatesFound}</p>
                  </div>
                </div>

                {/* Matrix layout HTML block */}
                <div className="bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] no-override">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider block mb-2">Bảng ma trận & Đặc tả chương trình hoàn chỉnh:</span>
                  <div className="text-[11px] text-slate-900 font-mono whitespace-pre-line leading-relaxed font-bold">
                    {analyzedResult.matrixHtml}
                    <br />
                    {analyzedResult.specTableHtml}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-exam-soft-sky border-2 border-slate-900 rounded-3xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[350px] shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] no-override">
                <FileText className="h-10 w-10 text-indigo-600 mb-3 animate-none" />
                <span className="text-xs text-slate-950 font-black max-w-sm leading-relaxed uppercase font-mono">
                  Nhập đề thi vào hộp dán văn bản bên trái hoặc nhấp "Nhập nhanh đề thi mẫu" để trải nghiệm chức năng phân tích đề thi bằng AI.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "bank" && (
        <div className="animate-fade-in">
          <QuestionBank />
        </div>
      )}

      {activeTab === "distribution" && (
        <div className="space-y-6 animate-fade-in text-slate-900">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all no-override">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-slate-900 pb-5 mb-6">
              <div>
                <span className="text-[10px] font-black text-cyan-700 uppercase tracking-widest block font-mono">BÁO CÁO PHÂN TÍCH</span>
                <h3 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2 mt-0.5">
                  <TrendingUp className="h-5 w-5 text-cyan-600" />
                  Phổ Điểm Khảo Thí & Phân Phối Điểm Số Lớp Học
                </h3>
                <p className="text-xs text-slate-600 font-bold mt-1">
                  Đánh giá năng lực của học sinh dựa trên phổ điểm kì thi thử Vật lí 12 (Định hướng GDPT mới 2018).
                </p>
              </div>

              {/* Class Select Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-[#f8fafc] rounded-xl border-2 border-slate-900 self-start md:self-auto shadow-[2px_2px_0px_0px_#0f172a]">
                {["All", "12A1", "12A2", "12A3", "12A4"].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setDistributionClassFilter(cls)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      distributionClassFilter === cls
                        ? "bg-cyan-400 text-slate-950 border border-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {cls === "All" ? "Tất cả" : cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-[#f8fafc] p-4 rounded-2xl border-2 border-slate-900 flex flex-col justify-between shadow-[3px_3px_0px_0px_#0f172a]">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Sĩ số lớp</span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-mono font-black text-slate-900">{totalExamStudents}</span>
                  <span className="text-[10px] text-slate-500 font-black">HS</span>
                </div>
                <div className="text-[9px] text-slate-600 font-bold mt-1 flex items-center gap-1">
                  <Users className="h-3 w-3 text-slate-500" />
                  Đang theo học
                </div>
              </div>

              <div className="bg-[#f8fafc] p-4 rounded-2xl border-2 border-slate-900 flex flex-col justify-between shadow-[3px_3px_0px_0px_#0f172a]">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Điểm trung bình</span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-mono font-black text-cyan-700">{examAverageGpa.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-500 font-black">/10</span>
                </div>
                <div className="text-[9px] text-slate-600 font-bold mt-1 flex items-center gap-1">
                  <Award className="h-3 w-3 text-cyan-600" />
                  GPA Lớp học
                </div>
              </div>

              <div className="bg-[#f8fafc] p-4 rounded-2xl border-2 border-slate-900 flex flex-col justify-between shadow-[3px_3px_0px_0px_#0f172a]">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Tỷ lệ Đạt (≥ 5.0)</span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-mono font-black text-emerald-700">{examPassRate.toFixed(1)}%</span>
                </div>
                <div className="text-[9px] text-slate-600 font-bold mt-1 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-emerald-600" />
                  {passedStudents}/{totalExamStudents} Học sinh
                </div>
              </div>

              <div className="bg-[#f8fafc] p-4 rounded-2xl border-2 border-slate-900 flex flex-col justify-between shadow-[3px_3px_0px_0px_#0f172a]">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Tỷ lệ Khá/Giỏi (≥ 8.0)</span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-mono font-black text-purple-700">{examExcellentRate.toFixed(1)}%</span>
                </div>
                <div className="text-[9px] text-slate-600 font-bold mt-1 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-purple-600 animate-pulse" />
                  {excellentStudents}/{totalExamStudents} Học sinh
                </div>
              </div>

              <div className="bg-[#f8fafc] p-4 rounded-2xl border-2 border-slate-900 col-span-2 md:col-span-1 flex flex-col justify-between shadow-[3px_3px_0px_0px_#0f172a]">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Biên độ điểm</span>
                <div className="mt-2 flex flex-col gap-0.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500 font-bold">Cao nhất:</span>
                    <span className="text-emerald-700 font-black">{highestScore}đ</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500 font-bold">Thấp nhất:</span>
                    <span className="text-red-750 font-black">{lowestScore}đ</span>
                  </div>
                </div>
                <div className="text-[9px] text-slate-500 font-black uppercase mt-1">
                  Khoảng biến thiên
                </div>
              </div>
            </div>

            {/* Main Bar Chart Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="bg-[#f8fafc] p-5 rounded-2xl border-2 border-slate-900 lg:col-span-8 shadow-[3px_3px_0px_0px_#0f172a]">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider block mb-4">Biểu đồ phân phối phổ điểm số</span>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={examDistributionData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                      <XAxis 
                        dataKey="range" 
                        tick={{ fill: '#0f172a', fontSize: 10, fontWeight: 'bold' }} 
                        axisLine={{ stroke: '#0f172a', strokeWidth: 2 }}
                        tickLine={false}
                      />
                      <YAxis 
                        allowDecimals={false}
                        tick={{ fill: '#0f172a', fontSize: 10, fontWeight: 'bold' }} 
                        axisLine={{ stroke: '#0f172a', strokeWidth: 2 }}
                        tickLine={false}
                      />
                      <RechartsTooltip content={<ExamCustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)', radius: 4 }} />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {examDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Side Advisory Panel */}
              <div className="bg-[#f8fafc] p-5 rounded-2xl border-2 border-slate-900 lg:col-span-4 flex flex-col justify-between shadow-[3px_3px_0px_0px_#0f172a]">
                <div>
                  <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-3 mb-4">
                    <Brain className="h-4.5 w-4.5 text-cyan-600 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">AI Tư vấn Sư phạm</span>
                  </div>

                  <ul className="space-y-3.5 text-xs text-slate-800 font-bold">
                    <li className="flex items-start gap-2 leading-relaxed">
                      <span className="text-cyan-600 mt-0.5">•</span>
                      <span>
                        Lớp có <strong>{excellentStudents} học sinh khá/giỏi</strong> (GPA ≥ 8.0). Cần bổ sung các bài tập định luật lý thuyết hạt nhân và thí nghiệm Carnot nâng cao để chuẩn bị tốt cho kì thi quốc gia.
                      </span>
                    </li>
                    <li className="flex items-start gap-2 leading-relaxed">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>
                        Nhóm học sinh yếu kém dưới 5.0đ gồm <strong>{examStudents.filter(s => s.score < 5.0).length} bạn</strong>. AI khuyên giáo viên nên hướng dẫn các bạn làm thêm các bài tập củng cố lý thuyết Nhiệt học căn bản.
                      </span>
                    </li>
                    <li className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>
                        Tỷ lệ đỗ đạt yêu cầu đạt <strong>{examPassRate.toFixed(1)}%</strong>. Đây là dấu hiệu tích cực chứng minh tính hiệu quả của phương pháp dạy tích hợp STEM và mô hình mô phỏng trực quan 3D.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-5 p-3 bg-cyan-100 rounded-xl border-2 border-cyan-800 text-[11px] text-cyan-900 font-black leading-normal font-sans">
                  <strong>Khuyến cáo:</strong> Giáo viên có thể bấm trực tiếp vào danh sách học sinh ở bảng điều khiển chính để thực hiện bồi dưỡng riêng hoặc điều chỉnh giáo án.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
