import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Compass, 
  Scale, 
  Info, 
  CheckCircle, 
  ArrowRight,
  Maximize2,
  Atom,
  Calculator,
  Grid,
  Zap,
  ChevronRight,
  Shield,
  Activity,
  Award,
  Send,
  RefreshCw
} from "lucide-react";
import { Nuclide } from "./Lesson21Textbook";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson22Textbook() {
  const [activeTab, setActiveTab] = useState<"intro" | "laws" | "energy" | "fission" | "fusion" | "calculator">("intro");
  
  // Calculator States
  const [selectedPreset, setSelectedPreset] = useState<string>("fusion_dt");
  const [mBefore, setMBefore] = useState<number>(5.0301);
  const [mAfter, setMAfter] = useState<number>(5.0112);
  const [customName, setCustomName] = useState<string>("Phản ứng tùy chỉnh");

  const presets = {
    fusion_dt: {
      name: "Phản ứng nhiệt hạch Deuterium - Tritium",
      m_b: 5.0290, // m_D (2.0135) + m_T (3.0155)
      m_a: 5.0102, // m_He (4.0015) + m_n (1.0087)
      eq: "_1^2H + _1^3H -> _2^4He + _0^1n + 17.6 MeV",
      desc: "Nhiên liệu nhiệt hạch hứa hẹn nhất cho lò phản ứng tương lai trên Trái Đất."
    },
    fission_u235: {
      name: "Phản ứng phân hạch Uranium-235 bởi neutron chậm",
      m_b: 236.0020, // m_U (234.9933) + m_n (1.0087)
      m_a: 235.7979, // m_Y (94.8901) + m_I (137.8817) + 3*m_n (3.0261)
      eq: "_0^1n + _92^235U -> _39^95Y + _53^138I + 3._0^1n + 190.1 MeV",
      desc: "Phản ứng cốt lõi trong các nhà máy điện hạt nhân phân hạch hiện nay."
    },
    rutherford_discovery: {
      name: "Thí nghiệm bắn phá hạt nhân của Rutherford (1919)",
      m_b: 18.0056, // m_N14 (14.0030) + m_He4 (4.0026)
      m_a: 18.0069, // m_O17 (16.9991) + m_H1 (1.0078)
      eq: "_2^4He + _7^14N -> _8^17O + _1^1H (Thu năng lượng)",
      desc: "Phản ứng hạt nhân nhân tạo đầu tiên do con người thực hiện, phát hiện ra proton."
    },
    alpha_decay_u238: {
      name: "Phân rã alpha tự phát của Uranium-238",
      m_b: 238.0508, // m_U238
      m_a: 238.0462, // m_Th234 (234.0436) + m_He4 (4.0026)
      eq: "_92^238U -> _90^234Th + _2^4He + 4.28 MeV",
      desc: "Quá trình phóng xạ tự phát có chu kì bán rã cực dài xấp xỉ tuổi Trái Đất."
    }
  };

  const handleApplyPreset = (key: string) => {
    setSelectedPreset(key);
    if (key !== "custom") {
      const p = presets[key as keyof typeof presets];
      setMBefore(p.m_b);
      setMAfter(p.m_a);
      setCustomName(p.name);
    }
  };

  // AI assistant chat state
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Thầy/Cô chào các em! Thầy/Cô là Trợ lý Giáo viên AI chuyên biệt giải đáp Bài 22: Phản ứng hạt nhân và Năng lượng liên kết. Các em có thắc mắc gì cần giải đáp liên quan đến định luật bảo toàn số khối A, bảo toàn điện tích Z, bảo toàn động lượng, bảo toàn năng lượng toàn phần, độ hụt khối, năng lượng liên kết riêng hay phản ứng phân hạch và tổng hợp nhiệt hạch không?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    const newUserMessage = { role: "user" as const, content: textToSend };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages,
          mode: "lesson22"
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages((prev) => [...prev, { role: "model" as const, content: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "model" as const, content: "Thầy/Cô rất tiếc, hệ thống đang gặp gián đoạn kết nối. Các em vui lòng thử lại sau nhé!" }
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "model" as const, content: "Thầy/Cô không thể kết nối tới máy chủ. Các em hãy kiểm tra lại kết nối mạng hoặc thử lại sau nha!" }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Calculations
  const deltaM = mBefore - mAfter;
  const energyMeV = deltaM * 931.5;
  const isExothermic = deltaM > 0;

  return (
    <div className="space-y-8 bg-slate-50 text-slate-900 p-5 md:p-8 rounded-3xl border-2 border-slate-900 shadow-[8px_8px_0px_#1e293b]" id="lesson22-textbook-container">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-slate-200 pb-5 gap-4">
        <div>
          <span className="bg-indigo-100 text-indigo-950 text-xs font-black px-4 py-2 rounded-xl uppercase tracking-wider font-mono border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
            Chương IV: Vật lí hạt nhân
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-950 mt-4 tracking-tight">
            Bài 22: Phản ứng hạt nhân và Năng lượng liên kết
          </h1>
          <p className="text-slate-800 text-xs mt-2 font-bold leading-relaxed">
            Tìm hiểu bản chất phản ứng hạt nhân, các định luật bảo toàn tuyệt đối, độ hụt khối, năng lượng liên kết riêng, phản ứng phân hạch và phản ứng tổng hợp hạt nhân.
          </p>
        </div>
      </div>

      {/* TABS NAVIGATION - 3D tactile buttons row */}
      <div className="flex flex-wrap gap-2 border-b-2 border-slate-900 pb-0">
        <button
          onClick={() => setActiveTab("intro")}
          className={`px-3.5 py-2.5 text-xs font-black rounded-t-xl transition-all border-2 border-slate-900 border-b-0 cursor-pointer ${
            activeTab === "intro"
              ? "bg-indigo-400 text-slate-950 translate-y-[2px] shadow-none"
              : "bg-white text-slate-900 hover:text-slate-950 hover:bg-indigo-50/50 shadow-[2px_2px_0px_#000] hover:translate-y-[0.5px]"
          }`}
        >
          I. Phản ứng Hạt nhân
        </button>
        <button
          onClick={() => setActiveTab("laws")}
          className={`px-3.5 py-2.5 text-xs font-black rounded-t-xl transition-all border-2 border-slate-900 border-b-0 cursor-pointer ${
            activeTab === "laws"
              ? "bg-indigo-400 text-slate-950 translate-y-[2px] shadow-none"
              : "bg-white text-slate-900 hover:text-slate-950 hover:bg-indigo-50/50 shadow-[2px_2px_0px_#000] hover:translate-y-[0.5px]"
          }`}
        >
          II. Các Định luật Bảo toàn
        </button>
        <button
          onClick={() => setActiveTab("energy")}
          className={`px-3.5 py-2.5 text-xs font-black rounded-t-xl transition-all border-2 border-slate-900 border-b-0 cursor-pointer ${
            activeTab === "energy"
              ? "bg-indigo-400 text-slate-950 translate-y-[2px] shadow-none"
              : "bg-white text-slate-900 hover:text-slate-950 hover:bg-indigo-50/50 shadow-[2px_2px_0px_#000] hover:translate-y-[0.5px]"
          }`}
        >
          III. Năng lượng & Độ bền vững
        </button>
        <button
          onClick={() => setActiveTab("fission")}
          className={`px-3.5 py-2.5 text-xs font-black rounded-t-xl transition-all border-2 border-slate-900 border-b-0 cursor-pointer ${
            activeTab === "fission"
              ? "bg-indigo-400 text-slate-950 translate-y-[2px] shadow-none"
              : "bg-white text-slate-900 hover:text-slate-950 hover:bg-indigo-50/50 shadow-[2px_2px_0px_#000] hover:translate-y-[0.5px]"
          }`}
        >
          IV. Phản ứng Phân hạch
        </button>
        <button
          onClick={() => setActiveTab("fusion")}
          className={`px-3.5 py-2.5 text-xs font-black rounded-t-xl transition-all border-2 border-slate-900 border-b-0 cursor-pointer ${
            activeTab === "fusion"
              ? "bg-indigo-400 text-slate-950 translate-y-[2px] shadow-none"
              : "bg-white text-slate-900 hover:text-slate-950 hover:bg-indigo-50/50 shadow-[2px_2px_0px_#000] hover:translate-y-[0.5px]"
          }`}
        >
          V. Phản ứng Tổng hợp
        </button>
        <button
          onClick={() => setActiveTab("calculator")}
          className={`px-3.5 py-2.5 text-xs font-black rounded-t-xl transition-all border-2 border-slate-900 border-b-0 cursor-pointer ${
            activeTab === "calculator"
              ? "bg-indigo-400 text-slate-950 translate-y-[2px] shadow-none"
              : "bg-white text-slate-900 hover:text-slate-950 hover:bg-indigo-50/50 shadow-[2px_2px_0px_#000] hover:translate-y-[0.5px]"
          }`}
        >
          ⚡ Công cụ tính E
        </button>
      </div>

      {/* CONTENT SECTIONS */}
      <div className="bg-white p-6 rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_#1e293b] min-h-[400px]">
        {/* TAB I: INTRO */}
        {activeTab === "intro" && (
          <div className="space-y-6 animate-fade-in text-slate-950" id="lesson22-intro-tab">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
                <Atom className="h-6 w-6 text-indigo-700 animate-spin" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-950">I. Phản ứng hạt nhân là gì?</h2>
                <p className="text-xs text-slate-950 font-black leading-relaxed">Định nghĩa cơ bản, bối cảnh thí nghiệm lịch sử của Rutherford và phân loại phản ứng.</p>
              </div>
            </div>

            {/* Historical Box */}
            <div className="bg-amber-50/80 border-2 border-slate-900 p-5 rounded-2xl space-y-3 relative overflow-hidden shadow-[4px_4px_0px_#000]">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5 pointer-events-none">
                <Award className="w-40 h-40 text-slate-950" />
              </div>
              <h3 className="text-xs font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5">
                <Zap className="w-4.5 h-4.5 text-indigo-700 fill-indigo-200" />
                Câu chuyện lịch sử & Thí nghiệm Rutherford (1919)
              </h3>
              <p className="text-xs text-slate-955 leading-relaxed font-black">
                Năm 1919, Ernest Rutherford đã thực hiện thí nghiệm huyền thoại, bắn phá hạt nhân nitơ <Nuclide a="14" z="7" element="N" /> bằng hạt alpha <Nuclide a="4" z="2" element="He" /> phát ra từ nguồn phóng xạ Poloni. Ông bất ngờ thu được một hạt nhân đồng vị ôxy <Nuclide a="17" z="8" element="O" /> và một hạt prôtôn <Nuclide a="1" z="1" element="H" />.
              </p>
              <div className="text-center py-2.5 bg-white rounded-xl border-2 border-slate-900 font-mono text-sm font-black text-indigo-950 shadow-[3px_3px_0px_#000]">
                <Nuclide a="4" z="2" element="He" /> + <Nuclide a="14" z="7" element="N" /> → <Nuclide a="17" z="8" element="O" /> + <Nuclide a="1" z="1" element="H" />
              </div>
              <p className="text-[11px] text-slate-955 font-black">
                Đây là phản ứng hạt nhân nhân tạo đầu tiên do con người thực hiện, chứng minh rằng hạt nhân hoàn toàn có thể biến đổi từ nguyên tố này sang nguyên tố khác!
              </p>
            </div>

            {/* Classification */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-955">2. Phân loại phản ứng hạt nhân</h3>
              <p className="text-xs leading-relaxed text-slate-955 font-extrabold">
                Dựa trên nguồn gốc tác nhân kích thích, phản ứng hạt nhân được chia làm hai loại lớn:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50/80 border-2 border-slate-900 p-4 rounded-xl space-y-2 shadow-[4px_4px_0px_#000]">
                  <span className="text-xs font-black text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    Phản ứng tự phát (Phóng xạ)
                  </span>
                  <p className="text-xs text-slate-955 font-black leading-relaxed">
                    Hạt nhân tự phân rã một cách ngẫu nhiên và tự phát, biến đổi thành hạt nhân khác và phát ra các bức xạ alpha, beta, hoặc gamma. Ví dụ phân rã tự nhiên của Urani:
                  </p>
                  <div className="text-center py-1.5 bg-white rounded-lg border-2 border-slate-900 font-mono text-xs font-black text-emerald-950 shadow-[2px_2px_0px_#000]">
                    <Nuclide a="238" z="92" element="U" /> → <Nuclide a="234" z="90" element="Th" /> + <Nuclide a="4" z="2" element="He" />
                  </div>
                </div>

                <div className="bg-indigo-50/80 border-2 border-slate-900 p-4 rounded-xl space-y-2 shadow-[4px_4px_0px_#000]">
                  <span className="text-xs font-black text-indigo-950 uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                    Phản ứng kích thích (Nhân tạo)
                  </span>
                  <p className="text-xs text-slate-955 font-black leading-relaxed">
                    Xảy ra khi hai hạt nhân va chạm với nhau với động năng rất lớn để kết hợp lại hoặc bẻ gãy cấu trúc cũ để tạo ra hạt nhân mới. Các phản ứng phân hạch và nhiệt hạch là điển hình.
                  </p>
                  <div className="text-center py-1.5 bg-white rounded-lg border-2 border-slate-900 font-mono text-xs font-black text-indigo-950 shadow-[2px_2px_0px_#000]">
                    <Nuclide a="1" z="0" element="n" /> + <Nuclide a="235" z="92" element="U" /> → <Nuclide a="95" z="39" element="Y" /> + <Nuclide a="138" z="53" element="I" /> + 3.<Nuclide a="1" z="0" element="n" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Question Box */}
            <div className="p-4 bg-yellow-50 border-2 border-slate-900 rounded-2xl flex gap-3 shadow-[4px_4px_0px_#000]">
              <Info className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1 text-slate-955">
                <span className="text-xs font-black text-amber-955 uppercase tracking-wider block">Hãy thảo luận và so sánh:</span>
                <p className="text-[11px] font-extrabold leading-relaxed text-slate-950">
                  Phản ứng hạt nhân có gì khác biệt so với phản ứng hóa học thông thường? Hãy nghĩ đến các đặc điểm: sự bảo toàn của các nguyên tử riêng lẻ, mức độ năng lượng tỏa ra, và vai trò của lớp vỏ êlectrôn so với hạt nhân ở trung tâm.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB II: LAWS */}
        {activeTab === "laws" && (
          <div className="space-y-6 animate-fade-in text-slate-950" id="lesson22-laws-tab">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50/80 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
                <Shield className="h-6 w-6 text-indigo-700" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-950">II. Các Định luật Bảo toàn trong Phản ứng Hạt nhân</h2>
                <p className="text-xs text-slate-955 font-black">Bốn quy luật bảo toàn tuyệt đối chi phối mọi biến đổi hạt nhân trong vũ trụ.</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-955 font-black">
              Mặc dù có sự biến đổi nguyên tố cực kì mãnh liệt, các phản ứng hạt nhân vẫn phải tuân thủ nghiêm ngặt bốn định luật bảo toàn tuyệt đối sau:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Law 1 */}
              <div className="bg-sky-50/90 border-2 border-slate-900 p-5 rounded-2xl shadow-[4px_4px_0px_#000] space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 items-center mb-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-950 text-white text-[11px] font-black flex items-center justify-center shrink-0 border border-slate-900 shadow-[1px_1px_0px_#000]">1</span>
                    <h4 className="text-xs font-black text-slate-950 uppercase tracking-wide">Bảo toàn số nuclôn (Số khối A)</h4>
                  </div>
                  <p className="text-[11px] text-slate-900 leading-relaxed font-bold">
                    Tổng số nuclôn trước phản ứng luôn luôn bằng tổng số nuclôn sau phản ứng. Nếu phản ứng là:
                  </p>
                  <div className="text-center py-2 bg-white rounded-lg border-2 border-slate-900 font-mono text-xs font-black my-2 shadow-[2px_2px_0px_#000]">
                    <Nuclide a="A1" z="Z1" element="X1" /> + <Nuclide a="A2" z="Z2" element="X2" /> → <Nuclide a="A3" z="Z3" element="X3" /> + <Nuclide a="A4" z="Z4" element="X4" />
                  </div>
                </div>
                <p className="text-xs text-indigo-955 font-black pt-1 border-t border-slate-300">
                  Hệ thức: <span className="font-normal inline-block"><FormattedMathText text="A_1 + A_2 = A_3 + A_4" /></span>
                </p>
              </div>

              {/* Law 2 */}
              <div className="bg-emerald-50/90 border-2 border-slate-900 p-5 rounded-2xl shadow-[4px_4px_0px_#000] space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 items-center mb-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-955 text-white text-[11px] font-black flex items-center justify-center shrink-0 border border-slate-900 shadow-[1px_1px_0px_#000]">2</span>
                    <h4 className="text-xs font-black text-slate-950 uppercase tracking-wide">Bảo toàn điện tích (Số hiệu Z)</h4>
                  </div>
                  <p className="text-[11px] text-slate-900 leading-relaxed font-bold">
                    Tổng đại số điện tích (số hiệu nguyên tử Z) của hệ các hạt trước phản ứng luôn luôn bằng tổng đại số điện tích sau phản ứng.
                  </p>
                </div>
                <p className="text-xs text-emerald-950 font-black pt-1 border-t border-slate-300">
                  Hệ thức: <span className="font-normal inline-block"><FormattedMathText text="Z_1 + Z_2 = Z_3 + Z_4" /></span>
                </p>
              </div>

              {/* Law 3 */}
              <div className="bg-purple-50/90 border-2 border-slate-900 p-5 rounded-2xl shadow-[4px_4px_0px_#000] space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 items-center mb-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-955 text-white text-[11px] font-black flex items-center justify-center shrink-0 border border-slate-900 shadow-[1px_1px_0px_#000]">3</span>
                    <h4 className="text-xs font-black text-slate-950 uppercase tracking-wide">Định luật bảo toàn động lượng</h4>
                  </div>
                  <p className="text-[11px] text-slate-900 leading-relaxed font-bold">
                    Vectơ tổng động lượng của hệ trước phản ứng luôn bằng vectơ tổng động lượng của hệ sau phản ứng:
                  </p>
                  <div className="text-center text-xs text-indigo-955 py-2 bg-white rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
                    <FormattedMathText text="\vec{p}_1 + \vec{p}_2 = \vec{p}_3 + \vec{p}_4" />
                  </div>
                </div>
                <p className="text-[10px] text-slate-955 font-extrabold leading-tight pt-1 border-t border-slate-300">
                  Giải thích hiện tượng giật lùi (recoil) của hạt nhân con sau phóng xạ.
                </p>
              </div>

              {/* Law 4 */}
              <div className="bg-pink-50/90 border-2 border-slate-900 p-5 rounded-2xl shadow-[4px_4px_0px_#000] space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 items-center mb-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-955 text-white text-[11px] font-black flex items-center justify-center shrink-0 border border-slate-900 shadow-[1px_1px_0px_#000]">4</span>
                    <h4 className="text-xs font-black text-slate-950 uppercase tracking-wide">Bảo toàn năng lượng toàn phần</h4>
                  </div>
                  <p className="text-[11px] text-slate-900 leading-relaxed font-bold">
                    Tổng năng lượng toàn phần của hệ (bao gồm tổng năng lượng nghỉ và tổng động năng của các hạt) được bảo toàn tuyệt đối:
                  </p>
                  <div className="text-[10px] text-slate-950 py-2 bg-white rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_#000] my-2 text-center leading-normal">
                    <FormattedMathText text="(m_1 + m_2)c^2 + K_{\text{đ}1} + K_{\text{đ}2} = (m_3 + m_4)c^2 + K_{\text{đ}3} + K_{\text{đ}4}" />
                  </div>
                </div>
                <p className="text-[10px] text-slate-955 font-extrabold leading-tight pt-1 border-t border-slate-300">
                  Cầu nối chuyển đổi kì diệu giữa khối lượng nghỉ hao hụt và động năng bùng nổ!
                </p>
              </div>
            </div>

            {/* Crucial Note Box */}
            <div className="p-4 bg-rose-100/60 border-2 border-slate-900 rounded-2xl flex gap-3 shadow-[4px_4px_0px_#000]">
              <Info className="h-5 w-5 text-rose-750 shrink-0 mt-0.5" />
              <div className="space-y-1 text-slate-950">
                <span className="text-xs font-black text-rose-950 uppercase tracking-wider block">CHÚ Ý QUAN TRỌNG - THƯỜNG XUYÊN BỊ BẪY TRONG THI CỬ:</span>
                <p className="text-[11px] font-black leading-relaxed text-rose-955">
                  Trong phản ứng hạt nhân <span className="text-rose-900 font-black underline">KHÔNG có định luật bảo toàn khối lượng nghỉ</span>! Tổng khối lượng nghỉ của các hạt trước và sau phản ứng nói chung là khác nhau (m_trước ≠ m_sau). Đồng thời, <span className="text-rose-900 font-black underline">KHÔNG có sự bảo toàn số hạt nơtrôn hay prôtôn riêng biệt</span> (chỉ có bảo toàn tổng số nuclôn A).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB III: ENERGY & STABILITY */}
        {activeTab === "energy" && (
          <div className="space-y-6 animate-fade-in text-slate-900" id="lesson22-energy-tab">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
                <Scale className="h-6 w-6 text-indigo-700" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-950">III. Năng lượng hạt nhân, Độ hụt khối & Tính bền vững</h2>
                <p className="text-xs text-slate-650 font-bold">Tìm hiểu tại sao hạt nhân có khối lượng nhẹ hơn tổng khối lượng các hạt cấu thành và cách đo độ bền vững hạt nhân.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column: Formulas */}
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xs font-black text-indigo-950 uppercase tracking-wide">1. Độ hụt khối (Mass Defect - Δm)</h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-bold">
                    Khi các nuclôn riêng lẻ kết hợp thành một hạt nhân bền vững, một phần khối lượng bị giảm đi, gọi là độ hụt khối:
                  </p>
                  <div className="p-3.5 bg-indigo-50 rounded-xl border-2 border-slate-900 text-center text-sm text-slate-950 shadow-[3px_3px_0px_#000]">
                    <FormattedMathText text="\Delta m = [Z \cdot m_p + (A - Z) \cdot m_n] - m_X" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-black text-indigo-950 uppercase tracking-wide">2. Năng lượng liên kết (E_lk)</h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-bold">
                    Là năng lượng tỏa ra khi các nuclôn riêng lẻ liên kết thành hạt nhân, hoặc năng lượng tối thiểu phải cung cấp để phá vỡ hạt nhân thành các hạt tự do:
                  </p>
                  <div className="p-3.5 bg-emerald-50 rounded-xl border-2 border-slate-900 text-center text-sm text-slate-950 shadow-[3px_3px_0px_#000]">
                    <FormattedMathText text="E_{lk} = \Delta m \cdot c^2" />
                  </div>
                  <p className="text-[11px] text-slate-650 font-bold leading-relaxed">
                    Đổi đơn vị: Nếu <FormattedMathText text="\Delta m" /> tính bằng <span className="font-extrabold text-slate-900">u</span>, thì <span className="font-extrabold text-slate-900"><FormattedMathText text="E_{lk} = \Delta m \cdot 931,5\text{ MeV}" /></span> (với <FormattedMathText text="1\text{ u} \approx 931,5\text{ MeV}/c^2" />).
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-black text-indigo-950 uppercase tracking-wide">3. Năng lượng liên kết riêng (E_lkr)</h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-bold">
                    Là năng lượng liên kết tính trung bình cho một nuclôn cấu thành:
                  </p>
                  <div className="p-3.5 bg-amber-50 rounded-xl border-2 border-slate-900 text-center text-sm text-slate-950 shadow-[3px_3px_0px_#000]">
                    <FormattedMathText text="E_{lkr} = \frac{E_{lk}}{A}\text{ (MeV/nuclôn)}" />
                  </div>
                  <div className="bg-emerald-50 border-2 border-slate-900 p-3.5 rounded-xl text-xs text-slate-800 font-bold leading-relaxed shadow-[3px_3px_0px_#000]">
                    📌 <strong className="text-emerald-950">Quy luật sống còn:</strong> Hạt nhân có năng lượng liên kết riêng <strong className="text-emerald-850 font-black">E_lkr càng lớn thì càng bền vững</strong>. Các hạt nhân trung bình (50 &lt; A &lt; 80) là bền vững nhất trong tự nhiên!
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Diagram (SVG) */}
              <div className="lg:col-span-6 space-y-2 bg-slate-50 p-4 rounded-2xl text-slate-900 border-2 border-slate-900 flex flex-col justify-between shadow-[6px_6px_0px_#1e293b]">
                <div>
                  <span className="text-xs font-black text-indigo-950 uppercase tracking-widest block mb-1">
                    Đồ thị trực quan học tập:
                  </span>
                  <h4 className="text-xs font-black text-slate-950">Năng lượng liên kết riêng (MeV/nuclôn) theo Số khối A</h4>
                  <p className="text-[10px] text-slate-600 font-mono mt-1 font-bold">
                    Khảo sát hình dáng phân bố và các vùng phản ứng bám sát SGK hình 22.3 và 22.5.
                  </p>
                </div>

                {/* SVG Graph */}
                <div className="relative w-full h-44 bg-white rounded-lg border-2 border-slate-900 p-2 overflow-hidden flex items-center justify-center shadow-inner">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120">
                    {/* Grid Lines */}
                    <line x1="20" y1="10" x2="290" y2="10" stroke="#f1f5f9" strokeDasharray="2" />
                    <line x1="20" y1="60" x2="290" y2="60" stroke="#f1f5f9" strokeDasharray="2" />
                    <line x1="20" y1="100" x2="290" y2="100" stroke="#f1f5f9" strokeDasharray="2" />
                    
                    {/* Axes */}
                    <line x1="20" y1="110" x2="20" y2="5" stroke="#475569" strokeWidth="1.5" />
                    <line x1="20" y1="110" x2="295" y2="110" stroke="#475569" strokeWidth="1.5" />
                    
                    {/* Y Axis Arrow */}
                    <polygon points="20,2 17,7 23,7" fill="#475569" />
                    {/* X Axis Arrow */}
                    <polygon points="298,110 293,107 293,113" fill="#475569" />

                    {/* Labels */}
                    <text x="25" y="12" fill="#64748b" className="text-[7px] font-mono font-bold">10 MeV</text>
                    <text x="25" y="64" fill="#64748b" className="text-[7px] font-mono font-bold">5 MeV</text>
                    <text x="288" y="118" fill="#475569" className="text-[7px] font-mono font-bold">A</text>
                    
                    {/* Specific Curve points */}
                    <path 
                      d="M 21,110 Q 22,99 24,39 T 32,33 T 76,22 T 120,24 T 200,30 T 258,35" 
                      fill="none" 
                      stroke="#4f46e5" 
                      strokeWidth="2.5" 
                    />

                    {/* Peak Stable Area */}
                    <rect x="65" y="15" width="25" height="15" fill="#10b981" fillOpacity="0.15" rx="3" stroke="#10b981" strokeWidth="1" strokeDasharray="1" />
                    <text x="68" y="24" fill="#047857" className="text-[6px] font-black">Vùng bền vững</text>

                    {/* Nodes and Element Labels */}
                    {/* 2H */}
                    <circle cx="22" cy="99" r="2.5" fill="#ef4444" stroke="#fff" strokeWidth="0.5" />
                    <text x="25" y="102" fill="#b91c1c" className="text-[6px] font-mono font-black">²H</text>

                    {/* 4He */}
                    <circle cx="24" cy="39" r="2.5" fill="#10b981" stroke="#fff" strokeWidth="0.5" />
                    <text x="18" y="35" fill="#047857" className="text-[6px] font-mono font-black">⁴He</text>

                    {/* 56Fe */}
                    <circle cx="76" cy="22" r="3" fill="#4f46e5" stroke="#fff" strokeWidth="0.5" />
                    <text x="74" y="15" fill="#312e81" className="text-[7px] font-mono font-black animate-pulse">⁵⁶Fe</text>

                    {/* 238U */}
                    <circle cx="258" cy="35" r="2.5" fill="#f59e0b" stroke="#fff" strokeWidth="0.5" />
                    <text x="262" y="38" fill="#d97706" className="text-[6px] font-mono font-black">²³⁸U</text>

                    {/* Arrows for Nuclear Processes */}
                    {/* Fusion on the left */}
                    <path d="M 32,90 Q 42,70 52,50" fill="none" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow-red)" strokeDasharray="1.5" />
                    <text x="44" y="74" fill="#b91c1c" className="text-[5.5px] font-black" transform="rotate(-20,44,74)">Tổng hợp nhiệt hạch</text>

                    {/* Fission on the right */}
                    <path d="M 238,50 Q 180,38 120,30" fill="none" stroke="#f59e0b" strokeWidth="1" markerEnd="url(#arrow-orange)" strokeDasharray="1.5" />
                    <text x="175" y="44" fill="#d97706" className="text-[5.5px] font-black" transform="rotate(8,175,44)">Phân hạch hạt nhân</text>
                  </svg>
                </div>

                <div className="text-[10px] text-slate-950 font-black leading-relaxed bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  💡 <span className="text-indigo-950 font-black">Quy luật tự nhiên:</span> Các hạt nhân rất nhẹ có xu hướng <span className="text-red-700 font-extrabold">Tổng hợp lại (Fusion)</span> và các hạt nhân rất nặng có xu hướng <span className="text-amber-700 font-extrabold">Phân rã bẻ gãy (Fission)</span> để cùng chuyển dời về vùng số khối trung bình có năng lượng liên kết riêng cao hơn và bền vững hơn!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB IV: FISSION */}
        {activeTab === "fission" && (
          <div className="space-y-6 animate-fade-in text-slate-950" id="lesson22-fission-tab">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50/80 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
                <Compass className="h-6 w-6 text-indigo-700" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-950">IV. Phản ứng Phân hạch (Nuclear Fission)</h2>
                <p className="text-xs text-slate-950 font-black">Tìm hiện tượng vỡ hạt nhân Urani và bí ẩn đằng sau các lò phản ứng hạt nhân phát điện.</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-black text-slate-955 leading-relaxed">
              <p>
                <strong className="text-indigo-950 font-black">Phản ứng phân hạch</strong> là quá trình một hạt nhân nặng (A &gt; 200) khi hấp thụ một neutron chậm (gọi là nơtrôn nhiệt, động năng nhỏ hơn 0,1 eV) sẽ trở nên kích thích, biến dạng mãnh liệt rồi vỡ ra làm hai mảnh hạt nhân có số khối trung bình, đồng thời giải phóng nhiều nơtrôn thứ cấp động năng lớn và tỏa ra năng lượng khổng lồ.
              </p>

              <div className="bg-slate-50/80 border-2 border-slate-900 p-5 rounded-2xl space-y-3 shadow-[4px_4px_0px_#000]">
                <span className="text-xs font-black text-indigo-950 uppercase tracking-wider block">Các bước diễn biến của một phân hạch Urani-235:</span>
                <ol className="list-decimal pl-5 space-y-2 text-[11px] text-slate-955 font-black">
                  <li><span className="text-indigo-900 font-black">Hấp thụ:</span> Hạt nhân <Nuclide a="235" z="92" element="U" /> hấp thụ một nơtrôn chậm <Nuclide a="1" z="0" element="n" /> chuyển thành trạng thái kích thích <Nuclide a="236" z="92" element="U" />* cực kì không bền vũ trụ.</li>
                  <li><span className="text-indigo-900 font-black">Biến dạng:</span> Hạt nhân kích thích dao động mạnh, kéo dài thắt nút thắt như hình giọt nước sắp vỡ (xảy ra trong khoảng 10⁻¹⁴ s).</li>
                  <li><span className="text-indigo-900 font-black">Phân tách:</span> Lực đẩy Coulomb thắng lực hạt nhân, bẻ đôi hạt nhân thành hai mảnh trung bình kèm theo sự bắn ra của 2 đến 3 nơtrôn thứ cấp và tỏa ra năng lượng khoảng <strong className="text-slate-950 text-xs font-black bg-yellow-200 border border-slate-900 py-0.5 px-2.5 rounded shadow-[1.5px_1.5px_0px_#000] ml-1 inline-block">200 MeV</strong> dưới dạng động năng của các mảnh.</li>
                </ol>
              </div>

              {/* Chain Reaction */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-black text-slate-950">Phản ứng dây chuyền (Chain Reaction) và Hệ số k</h3>
                <p className="text-xs leading-relaxed text-slate-955 font-black">
                  Các neutron thứ cấp giải phóng từ một phân hạch lại có thể tiếp tục bị hấp thụ bởi các hạt nhân U-235 lân cận để gây ra các phân hạch tiếp theo. Quá trình này lặp lại liên tục tạo thành phản ứng dây chuyền.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-2.5">
                  <div className="bg-slate-50/80 border-2 border-slate-900 p-3.5 rounded-xl shadow-[3px_3px_0px_#000] flex flex-col justify-between">
                    <span className="text-xs font-black text-slate-950 uppercase tracking-wide block">k &lt; 1 (Dưới tới hạn)</span>
                    <p className="text-[10px] text-slate-955 font-black leading-relaxed mt-1.5">Phản ứng dây chuyền tắt dần nhanh chóng do thiếu hụt nơtrôn kích thích tiếp theo.</p>
                  </div>
                  <div className="bg-emerald-50/80 border-2 border-slate-900 p-3.5 rounded-xl shadow-[3px_3px_0px_#000] flex flex-col justify-between">
                    <span className="text-xs font-black text-emerald-950 uppercase tracking-wide block">k = 1 (Tới hạn - Critical)</span>
                    <p className="text-[10px] text-emerald-950 font-black leading-relaxed mt-1.5">Mật độ phân hạch ổn định, công suất lò duy trì không đổi. Đây là chế độ vận hành lò phản ứng thương mại.</p>
                  </div>
                  <div className="bg-rose-50/80 border-2 border-slate-900 p-3.5 rounded-xl shadow-[3px_3px_0px_#000] flex flex-col justify-between">
                    <span className="text-xs font-black text-rose-950 uppercase tracking-wide block">k &gt; 1 (Trên tới hạn)</span>
                    <p className="text-[10px] text-rose-955 font-black leading-relaxed mt-1.5">Số phân hạch bùng nổ tăng theo cấp số nhân trong tích tắc, gây ra vụ nổ hạt nhân hủy diệt (bom nguyên tử).</p>
                  </div>
                </div>
              </div>

              {/* Critical Mass */}
              <div className="p-4 bg-amber-50/80 border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0px_#000]">
                <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Shield className="w-4.5 h-4.5 text-amber-700" />
                  Khái niệm Khối lượng tới hạn (Critical Mass - m_th)
                </h4>
                <p className="text-[11px] text-slate-950 font-black leading-relaxed">
                  Để phản ứng dây chuyền có thể duy trì, lượng nhiên liệu Urani phải đủ lớn để hạn chế neutron bị thất thoát bay ra ngoài. Khối lượng tối thiểu đó gọi là <strong className="text-amber-900 font-black">khối lượng tới hạn m_th</strong>. Với U-235 tinh khiết dạng hình cầu trần, m_th khoảng 47 kg; nếu có gương phản xạ neutron bọc xung quanh, m_th giảm chỉ còn khoảng 10 kg!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB V: FUSION */}
        {activeTab === "fusion" && (
          <div className="space-y-6 animate-fade-in text-slate-950" id="lesson22-fusion-tab">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50/80 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
                <Zap className="h-6 w-6 text-indigo-700 animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-950">V. Phản ứng Tổng hợp Hạt nhân (Nhiệt hạch)</h2>
                <p className="text-xs text-slate-950 font-black">Bí mật thắp sáng các ngôi sao, cỗ máy năng lượng tối thượng của nhân loại trong tương lai.</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-black text-slate-955 leading-relaxed">
              <p>
                <strong className="text-indigo-950 font-black">Phản ứng tổng hợp hạt nhân</strong> (còn gọi là phản ứng nhiệt hạch) là quá trình kết hợp hai hay nhiều hạt nhân có số khối rất nhẹ (A ≤ 10, như Deuterium <Nuclide a="2" z="1" element="H" /> and Tritium <Nuclide a="3" z="1" element="H" />) thành một hạt nhân nặng hơn bền vững hơn ở nhiệt độ cực kì cao.
              </p>

              <div className="bg-indigo-50/80 border-2 border-slate-900 p-5 rounded-2xl space-y-3.5 text-center shadow-[4px_4px_0px_#000]">
                <span className="text-[10px] font-black text-indigo-950 uppercase tracking-widest block">Phương trình phản ứng nhiệt hạch kinh điển:</span>
                <div className="text-sm font-mono font-black text-slate-950 py-3 bg-white rounded-xl border-2 border-slate-900 shadow-inner">
                  <Nuclide a="2" z="1" element="H" /> + <Nuclide a="3" z="1" element="H" /> → <Nuclide a="4" z="2" element="He" /> + <Nuclide a="1" z="0" element="n" /> + 17.6 MeV
                </div>
                <div className="text-[11px] text-indigo-950 font-black">
                  Tỏa ra năng lượng khoảng <strong className="text-slate-950 font-black text-xs bg-yellow-200 border border-slate-900 py-0.5 px-2.5 rounded shadow-[1.5px_1.5px_0px_#000] ml-1">17,6 MeV</strong>, cực lớn nếu tính trên 1 kg nhiên liệu!
                </div>
              </div>

              {/* Conditions */}
              <div className="space-y-2">
                <h3 className="text-sm font-black text-slate-950">Các điều kiện khắt khe để xảy ra nhiệt hạch:</h3>
                <ul className="list-disc pl-5 space-y-2 text-[11px] text-slate-955 font-black">
                  <li><span className="text-slate-950 font-black">Nhiệt độ siêu cao:</span> Phải nung nóng nhiên liệu tới khoảng <strong className="text-indigo-700">100 triệu độ K</strong> để các hạt nhân có động năng cực đại, vượt qua lực đẩy tĩnh điện Coulomb khổng lồ tiến sát nhau dưới 10⁻¹⁵ m.</li>
                  <li><span className="text-slate-950 font-black">Mật độ hạt n cực lớn:</span> Đủ lớn để tần suất va chạm trực diện xảy ra liên tục.</li>
                  <li><span className="text-slate-950 font-black">Thời gian duy trì dài:</span> Thỏa mãn tiêu chuẩn Lawson (<span className="inline-block font-normal"><FormattedMathText text="n \cdot \Delta t > 10^{14}\text{ s/cm}^3" /></span>) để phản ứng tự duy trì.</li>
                </ul>
              </div>

              {/* Fission vs Fusion Comparison */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-black text-slate-950">So sánh ưu thế vượt trội của Nhiệt hạch so với Phân hạch</h3>
                <div className="border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[5px_5px_0px_#000]">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-slate-100 font-black text-slate-900 border-b-2 border-slate-900">
                        <th className="p-3">Tiêu chí so sánh</th>
                        <th className="p-3 border-l-2 border-slate-900">Phân hạch (Fission)</th>
                        <th className="p-3 border-l-2 border-slate-900 bg-emerald-50 text-emerald-950">Nhiệt hạch (Fusion)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-900 text-slate-900 font-bold">
                      <tr>
                        <td className="p-3 bg-slate-50 font-black">Nhiên liệu sử dụng</td>
                        <td className="p-3 border-l-2 border-slate-900">Urani, Plutoni (Nặng, hiếm, đắt tiền)</td>
                        <td className="p-3 border-l-2 border-slate-900 bg-emerald-50 text-emerald-950">Đồng vị Hiđrô (Dồi dào vô tận trong nước biển)</td>
                      </tr>
                      <tr>
                        <td className="p-3 bg-slate-50 font-black">Năng lượng giải phóng</td>
                        <td className="p-3 border-l-2 border-slate-900">~ 200 MeV (Năng lượng riêng nhỏ hơn)</td>
                        <td className="p-3 border-l-2 border-slate-900 bg-emerald-50 text-emerald-950">~ 17.6 MeV (Năng lượng riêng lớn gấp 4-5 lần!)</td>
                      </tr>
                      <tr>
                        <td className="p-3 bg-slate-50 font-black">Mức độ an toàn sạch sẽ</td>
                        <td className="p-3 border-l-2 border-slate-900">Chất thải phóng xạ chu kì rã hàng vạn năm, rủi ro sự cố lò</td>
                        <td className="p-3 border-l-2 border-slate-900 bg-emerald-50 text-emerald-950">Tuyệt đối an toàn sạch, sản phẩm chỉ là Heli lành tính, không phóng xạ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB VI: CALCULATOR */}
        {activeTab === "calculator" && (
          <div className="space-y-6 animate-fade-in text-slate-950" id="lesson22-calculator-tab">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50/80 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
                <Calculator className="h-6 w-6 text-indigo-700 animate-bounce" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-950">⚡ Công cụ tính Năng lượng Phản ứng Hạt nhân</h2>
                <p className="text-xs text-slate-950 font-black">Chọn một phản ứng mẫu thực tế hoặc tự nhập khối lượng để khảo sát sự tỏa/thu năng lượng hạt nhân.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Controls */}
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-950 block">Chọn phản ứng mẫu trong SGK:</label>
                  <select 
                    value={selectedPreset}
                    onChange={(e) => handleApplyPreset(e.target.value)}
                    className="w-full text-xs font-bold border-2 border-slate-900 rounded-xl p-2.5 bg-white text-slate-950 shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-slate-950"
                  >
                    <option value="fusion_dt">Phản ứng nhiệt hạch D-T (Trang 102)</option>
                    <option value="fission_u235">Phân hạch Urani-235 (Trang 100)</option>
                    <option value="rutherford_discovery">Phát hiện proton Rutherford (Trang 96)</option>
                    <option value="alpha_decay_u238">Phân rã alpha của U-238 (Trang 97)</option>
                    <option value="custom">-- Nhập khối lượng tùy chỉnh --</option>
                  </select>
                </div>

                <div className="space-y-4 bg-slate-50/80 p-4 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#000]">
                  <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-indigo-700" />
                    Khối lượng nghỉ các hạt (u):
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-950 block">Tổng m_trước (u):</label>
                      <input 
                        type="number" 
                        step="0.0001"
                        disabled={selectedPreset !== "custom"}
                        value={mBefore}
                        onChange={(e) => {
                          setMBefore(parseFloat(e.target.value) || 0);
                          setSelectedPreset("custom");
                        }}
                        className="w-full text-xs font-mono font-black border-2 border-slate-900 rounded-lg p-2 bg-white text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:opacity-75 disabled:bg-slate-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-950 block">Tổng m_sau (u):</label>
                      <input 
                        type="number" 
                        step="0.0001"
                        disabled={selectedPreset !== "custom"}
                        value={mAfter}
                        onChange={(e) => {
                          setMAfter(parseFloat(e.target.value) || 0);
                          setSelectedPreset("custom");
                        }}
                        className="w-full text-xs font-mono font-black border-2 border-slate-900 rounded-lg p-2 bg-white text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:opacity-75 disabled:bg-slate-100"
                      />
                    </div>
                  </div>

                  {selectedPreset !== "custom" && (
                    <div className="p-3 bg-white border-2 border-slate-900 rounded-lg space-y-1 shadow-[2px_2px_0px_#000]">
                      <span className="text-[10px] text-indigo-950 font-black block uppercase tracking-wider">Phương trình phản ứng:</span>
                      <p className="text-xs font-mono font-black text-slate-950">{presets[selectedPreset as keyof typeof presets].eq}</p>
                      <p className="text-[10px] text-slate-950 leading-normal font-black mt-1">{presets[selectedPreset as keyof typeof presets].desc}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Real-time Display Output */}
              <div className="lg:col-span-7 bg-slate-950 text-white p-5 rounded-2xl border-2 border-slate-900 flex flex-col justify-between shadow-[6px_6px_0px_#1e293b] relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-[0.03] pointer-events-none">
                  <Zap className="w-56 h-56 text-white" />
                </div>

                <div className="space-y-3.5 z-10">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-xs font-black text-indigo-400 uppercase tracking-widest block">
                      Kết quả tính toán Einstein:
                    </span>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider font-mono border ${
                      isExothermic 
                        ? "bg-emerald-950/80 text-emerald-400 border-emerald-800 animate-pulse" 
                        : "bg-rose-950/80 text-rose-400 border-rose-800"
                    }`}>
                      {isExothermic ? "TỎA năng lượng" : "THU năng lượng"}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white">{selectedPreset === "custom" ? customName : presets[selectedPreset as keyof typeof presets].name}</h3>

                  <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-800 py-3.5">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Chênh lệch khối lượng (Δm):</span>
                      <span className="text-sm font-mono font-bold text-white block mt-0.5">
                        {deltaM.toFixed(6)} u
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Năng lượng phản ứng (E):</span>
                      <span className={`text-base font-mono font-black block mt-0.5 ${isExothermic ? "text-emerald-400" : "text-rose-400"}`}>
                        {energyMeV.toFixed(3)} MeV
                      </span>
                    </div>
                  </div>

                  {/* Physics Explanation */}
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1 text-xs font-bold text-slate-200">
                    <span className="text-[10px] font-black text-indigo-400 uppercase block tracking-wider">Giải thích vật lí:</span>
                    {isExothermic ? (
                      <p className="text-slate-300 leading-relaxed font-bold">
                        Khối lượng nghỉ của hệ các hạt sau phản ứng đã bị hụt đi một lượng là <span className="font-mono text-emerald-400 font-extrabold">{Math.abs(deltaM).toFixed(6)} u</span> so với trước phản ứng. Theo hệ thức Einstein, lượng khối lượng này đã biến thành động năng khổng lồ phóng ra ngoài, tỏa ra năng lượng <span className="font-mono text-emerald-400 font-black">{Math.abs(energyMeV).toFixed(2)} MeV</span> cho mỗi phản ứng!
                      </p>
                    ) : (
                      <p className="text-slate-300 leading-relaxed font-bold">
                        Tổng khối lượng nghỉ sau phản ứng lớn hơn trước phản ứng là <span className="font-mono text-rose-400 font-extrabold">{Math.abs(deltaM).toFixed(6)} u</span>. Để phản ứng này có thể xảy ra, bắt buộc phải cung cấp động năng tối thiểu là <span className="font-mono text-rose-400 font-black">{Math.abs(energyMeV).toFixed(2)} MeV</span> dưới dạng động năng của hạt đạn bắn vào để bù đắp khối lượng tăng lên!
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-[9px] text-slate-500 font-mono mt-4 font-bold border-t border-slate-800 pt-2 text-right">
                  Quy ước tính: 1 u = 931.5 MeV/c² | E = (m_trước - m_sau) * c²
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Assistant Chat Panel */}
      <div className="relative bg-indigo-50/50 p-6 rounded-3xl border-2 border-slate-900 shadow-[6px_6px_0px_#1e293b] space-y-4 overflow-hidden" id="ai-assistant-lesson22">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
        
        <div className="relative z-10 flex items-center justify-between border-b-2 border-slate-900 pb-3 flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 border-2 border-slate-900 text-indigo-950 rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <Sparkles className="h-5 w-5 animate-pulse text-indigo-700" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide">Trợ lý Giáo viên AI - Giải đáp Bài 22</h4>
              <p className="text-[10px] text-slate-700 font-bold">Chuyên gia giải đáp Phản ứng & Năng lượng liên kết hạt nhân • Sư phạm mẫu mực & Kiên nhẫn</p>
            </div>
          </div>
          <button
            onClick={() => setMessages([
              {
                role: "model",
                content: "Thầy/Cô đã đặt lại hộp thoại. Thầy/Cô rất vui lòng được hỗ trợ các em giải đáp mọi thắc mắc liên quan đến Bài 22: Phản ứng hạt nhân và Năng lượng liên kết!"
              }
            ])}
            className="p-1.5 hover:bg-indigo-50 border-2 border-slate-800 text-slate-950 rounded-xl transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
            title="Đặt lại trò chuyện"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Chat view window */}
        <div className="relative z-10 h-80 overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-800 custom-scrollbar shadow-inner">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b] ${
                  msg.role === "user"
                    ? "bg-indigo-650 text-white rounded-tr-none"
                    : "bg-white text-slate-900 rounded-tl-none"
                }`}
              >
                <div className="font-sans font-black text-[9px] uppercase tracking-wide mb-1 opacity-80">
                  {msg.role === "user" ? "Học sinh" : "Thầy/Cô Giáo viên AI"}
                </div>
                <div className="leading-relaxed select-text font-bold space-y-1">
                  {msg.content.split("\n\n").map((para, pIdx) => (
                    <p key={pIdx}>
                      <FormattedMathText text={para} />
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-slate-800 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-400 flex items-center gap-2 shadow-[2px_2px_0px_0px_#1e293b]">
                <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-600 animate-bounce"></span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[10px] text-slate-500 font-bold">Thầy/Cô đang viết câu trả lời...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Quick Pills */}
        <div className="relative z-10 flex flex-wrap gap-1.5 pt-1.5">
          <span className="text-[10px] text-slate-600 font-black self-center mr-1">Gợi ý câu hỏi:</span>
          {[
            "Tại sao trong phản ứng hạt nhân lại không có bảo toàn khối lượng nghỉ?",
            "Năng lượng liên kết và năng lượng liên kết riêng khác nhau thế nào?",
            "Tại sao hạt nhân trung bình lại bền vững nhất trong tự nhiên?",
            "So sánh hiệu suất tỏa năng lượng giữa phân hạch và nhiệt hạch?"
          ].map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(promptText)}
              disabled={isTyping}
              className="text-[10px] bg-white hover:bg-indigo-50 border-2 border-slate-800 text-slate-900 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer font-black disabled:opacity-50 shadow-[1.5px_1.5px_0px_#1e293b] active:translate-y-[0.5px]"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="relative z-10 flex items-center gap-2 pt-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            disabled={isTyping}
            placeholder="Đặt câu hỏi về Bài 22 phản ứng hạt nhân & năng lượng liên kết..."
            className="flex-1 text-xs font-black bg-white border-2 border-slate-800 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50 shadow-[2px_2px_0px_#1e293b]"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isTyping || !inputMessage.trim()}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 border-2 border-slate-800 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-[3px_3px_0px_#000] active:translate-y-[1px] active:shadow-[1.5px_1.5px_0px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* QUICK SUMMARY BOX */}
      <div className="bg-indigo-50/90 text-slate-950 p-5 rounded-2xl border-2 border-slate-900 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between shadow-[4px_4px_0px_#1e293b]">
        <div className="space-y-1">
          <span className="text-xs font-black text-indigo-950 uppercase tracking-widest block">Tóm tắt kiến thức cốt lõi:</span>
          <p className="text-xs text-slate-950 font-black leading-relaxed">
            Phản ứng hạt nhân biến đổi nguyên tố. Các định luật bảo toàn Z, A, động lượng, năng lượng luôn tuân thủ tuyệt đối, còn khối lượng nghỉ thì không. Phân hạch là sự vỡ của hạt nhân nặng, nhiệt hạch là sự hợp nhất của hạt nhân siêu nhẹ ở nhiệt độ cực kì cao.
          </p>
        </div>
        <div className="shrink-0 flex flex-wrap gap-2">
          <span className="text-xs font-black bg-white text-slate-950 px-3 py-1.5 rounded-lg border-2 border-slate-900 font-mono shadow-[2px_2px_0px_#000]">Z, A bảo toàn</span>
          <span className="text-xs font-black bg-white text-slate-950 px-3 py-1.5 rounded-lg border-2 border-slate-900 font-mono shadow-[2px_2px_0px_#000]">m_nghỉ không bảo toàn</span>
        </div>
      </div>
    </div>
  );
}
