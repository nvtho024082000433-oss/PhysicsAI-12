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
  Atom,
  Calculator,
  Grid,
  BookOpen,
  Brain,
  Zap,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Eye,
  Send,
  RefreshCw
} from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

// Helper component for beautiful nuclear/nuclide symbols: _{Z}^{A}Element
export function Nuclide({ a, z, element, size = "md" }: { a: React.ReactNode; z: React.ReactNode; element: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: {
      subSuper: "text-[9px] h-3",
      elem: "text-xs",
      gap: "gap-0.5"
    },
    md: {
      subSuper: "text-[10px] h-4",
      elem: "text-sm",
      gap: "gap-1"
    },
    lg: {
      subSuper: "text-[12px] h-5.5",
      elem: "text-2xl",
      gap: "gap-1.5"
    }
  }[size];

  return (
    <span className={`inline-flex items-center ${sizeClasses.gap} font-mono font-bold align-middle mx-1 bg-white border border-slate-300 px-1 rounded`}>
      <span className="flex flex-col text-right leading-none select-none">
        <span className={`${sizeClasses.subSuper} text-indigo-700 font-black`}>{a}</span>
        <span className={`${sizeClasses.subSuper} text-emerald-700 font-black mt-0.5`}>{z}</span>
      </span>
      <span className={`${sizeClasses.elem} text-slate-950 font-black tracking-tight`}>{element}</span>
    </span>
  );
}

export function Lesson21Textbook() {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"scattering" | "nucleon" | "symbol" | "isotopes">("scattering");
  
  // AI assistant chat state
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Thầy/Cô chào các em! Thầy/Cô là Trợ lý Giáo viên AI chuyên biệt giải đáp Bài 21: Cấu trúc hạt nhân. Các em có thắc mắc gì cần giải đáp liên quan đến thí nghiệm tán xạ alpha của Rutherford, thành phần nuclôn (prôtôn và nơtrôn), cách kí hiệu hạt nhân, tính nguyên tử khối trung bình hay cách tính bán kính hạt nhân không?"
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
          mode: "lesson21"
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
  
  // Interactive Isotope Builder State (Part 1)
  const [protons, setProtons] = useState<number>(6);
  const [neutrons, setNeutrons] = useState<number>(6);

  // Interactive Radius & Scale State (Part 2)
  const [calcA, setCalcA] = useState<number>(56);
  const [ratioScale, setRatioScale] = useState<number>(10000); // comparison scale factor

  // Calculation for isotope builder
  const getIsotopeInfo = (p: number, n: number) => {
    const a = p + n;
    let symbol = "X";
    let name = "Hạt nhân chưa xác định";
    let stability = "Không bền (Phóng xạ)";
    let desc = "Đồng vị nhân tạo hoặc hiếm gặp, phân rã nhanh trong tự nhiên.";

    if (p === 1) {
      symbol = "H";
      if (n === 0) { name = "Hiđrô thường (Protium)"; stability = "Bền vững (99.985%)"; desc = "Đồng vị phổ biến nhất của hiđrô, cấu tạo đơn giản chỉ gồm 1 prôtôn đơn độc, không nơtrôn."; }
      else if (n === 1) { name = "Hiđrô nặng (Deuterium)"; stability = "Bền vững (0.015%)"; desc = "Đồng vị bền, có nhiều trong nước nặng D2O dùng làm chất làm chậm nơtrôn trong phản ứng hạt nhân."; }
      else if (n === 2) { name = "Hiđrô siêu nặng (Tritium)"; stability = "Phóng xạ (Chu kì 12.32 năm)"; desc = "Đồng vị không bền, phát tia beta trừ, dùng chế tạo bom khinh khí và nhiên liệu nhiệt hạch."; }
    } else if (p === 2) {
      symbol = "He";
      if (n === 1) { name = "Heli-3"; stability = "Bền vững (0.0001%)"; desc = "Đồng vị cực kì hiếm trên Trái Đất, có nhiều trên bề mặt Mặt Trăng, nguồn nhiên liệu nhiệt hạch tương lai."; }
      else if (n === 2) { name = "Heli-4 (Hạt Alpha)"; stability = "Bền vững (~100%)"; desc = "Hạt nhân liên kết cực kì bền vững, cấu tạo gồm 2 proton và 2 neutron, thường được phóng ra khi phân rã alpha."; }
    } else if (p === 6) {
      symbol = "C";
      if (n === 6) { name = "Cacbon-12"; stability = "Bền vững (98.89%)"; desc = "Đồng vị cơ bản dùng để định nghĩa đơn vị khối lượng nguyên tử quốc tế u."; }
      else if (n === 7) { name = "Cacbon-13"; stability = "Bền vững (1.11%)"; desc = "Đồng vị bền có ích trong phân tích quang phổ cộng hưởng từ hạt nhân (NMR) nghiên cứu hóa hữu cơ."; }
      else if (n === 8) { name = "Cacbon-14"; stability = "Phóng xạ (Chu kì 5730 năm)"; desc = "Đồng vị phóng xạ phân rã beta trừ, dùng làm đồng hồ đo tuổi cổ vật hữu cơ khảo cổ học cực kì chính xác."; }
    } else if (p === 8) {
      symbol = "O";
      if (n === 8) { name = "Ôxy-16"; stability = "Bền vững (99.76%)"; desc = "Đồng vị chiếm đa số tuyệt đối của ôxy, cấu thành nước và khí quyển sinh quyển."; }
      else if (n === 9) { name = "Ôxy-17"; stability = "Bền vững (0.04%)"; desc = "Đồng vị ôxy bền hiếm gặp."; }
      else if (n === 10) { name = "Ôxy-18"; stability = "Bền vững (0.20%)"; desc = "Đồng vị bền ứng dụng trong phân tích cổ khí hậu học qua băng tan."; }
    } else if (p === 26) {
      symbol = "Fe";
      if (n === 30) { name = "Sắt-56"; stability = "Cực kì bền vững (91.75%)"; desc = "Hạt nhân bền vững hàng đầu vũ trụ do có năng lượng liên kết riêng cực đại (đỉnh của đường cong năng lượng)."; }
    } else if (p === 92) {
      symbol = "U";
      if (n === 143) { name = "Urani-235"; stability = "Phóng xạ (Chu kì 704 triệu năm)"; desc = "Đồng vị phóng xạ tự nhiên duy nhất có khả năng phân hạch dây chuyền bằng nơtrôn chậm làm nhiên liệu hạt nhân."; }
      else if (n === 146) { name = "Urani-238"; stability = "Phóng xạ (Chu kì 4.47 tỉ năm)"; desc = "Đồng vị urani phổ biến nhất chiếm 99.3%, chu kì bán rã xấp xỉ tuổi của hệ Mặt Trời."; }
    }

    const radius = 1.2 * Math.pow(a, 1/3);
    return { symbol, name, stability, desc, radius };
  };

  const iso = getIsotopeInfo(protons, neutrons);

  const sections = [
    {
      title: "I. LÝ THUYẾT CẤU TRÚC HẠT NHÂN",
      subtitle: "Thí nghiệm tán xạ alpha, cấu tạo nuclôn, kí hiệu đồng vị và kích thước",
    },
    {
      title: "II. BÀI TẬP VÍ DỤ MINH HOẠ",
      subtitle: "Tính toán thực nghiệm bán kính hạt nhân và phân tích tỉ số đồng vị trung bình",
    },
    {
      title: "III. BÀI TẬP VẬN DỤNG THỰC TIỄN",
      subtitle: "Trắc nghiệm bám sát đề thi THPT Quốc gia và bảng số liệu thực tế",
    }
  ];

  return (
    <div className="space-y-8 text-slate-900 font-sans" id="lesson21-textbook">
      {/* HEADER BANNER - Designed as a beautiful 3D block with soft lavender background */}
      <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-slate-900 shadow-[6px_6px_0px_#1e293b] flex justify-between items-center flex-wrap gap-6 transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[5px_5px_0px_#1e293b]">
        <div className="space-y-2">
          <span className="text-[10px] text-indigo-950 font-black uppercase tracking-wider font-mono bg-indigo-150 border-2 border-slate-900 px-3 py-1 rounded-full shadow-[2px_2px_0px_#1e293b] inline-block">
            CHƯƠNG IV: VẬT LÍ HẠT NHÂN
          </span>
          <h2 className="text-2xl font-black text-slate-950 leading-tight uppercase tracking-tight">
            BÀI 21: CẤU TRÚC HẠT NHÂN
          </h2>
          <p className="text-xs text-slate-800 max-w-2xl font-bold leading-relaxed">
            Khám phá thí nghiệm tán xạ hạt alpha mang tính lịch sử của Rutherford, tìm hiểu thành phần nuclôn cấu trúc lõi nguyên tử, định nghĩa đơn vị u và hiện tượng đồng vị hóa học.
          </p>
        </div>
        
        {/* Section buttons - Designed as tactile 3D buttons */}
        <div className="flex flex-wrap gap-2 bg-slate-100 p-2 rounded-2xl border-2 border-slate-900 shadow-inner">
          {sections.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSection(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all border-2 border-slate-900 cursor-pointer ${
                activeSection === idx
                  ? "bg-indigo-400 text-slate-950 shadow-none translate-x-[2px] translate-y-[2px]"
                  : "bg-white text-slate-900 shadow-[3px_3px_0px_rgba(30,41,59,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_rgba(30,41,59,1)]"
              }`}
              id={`section-btn-${idx}`}
            >
              Phần {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="space-y-8" id="textbook-content-area">
        
        {/* SECTION 1: LÝ THUYẾT CẤU TRÚC HẠT NHÂN */}
        {activeSection === 0 && (
          <div className="space-y-6 animate-fade-in" id="section-1-content">
            {/* Introductory 3D Panel */}
            <div className="space-y-2 bg-indigo-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b]">
              <span className="inline-block text-[10px] bg-indigo-150 border-2 border-slate-900 text-indigo-950 px-2.5 py-1 rounded-md font-mono font-black uppercase shadow-sm">
                Tổng quan kiến thức cốt lõi
              </span>
              <h3 className="text-lg font-black text-slate-950">{sections[0].title}</h3>
              <p className="text-xs text-slate-800 font-bold leading-relaxed">
                Hạt nhân nguyên tử nằm ở tâm nguyên tử, mang điện tích dương và tập trung hầu hết khối lượng nguyên tử. Để tìm hiểu cấu trúc bí ẩn bên trong nguyên tử, các nhà vật lí đã thực hiện những thí nghiệm va chạm gia tốc hạt lịch sử.
              </p>
            </div>

            {/* Sub-navigation tabs within Section 1 */}
            <div className="flex flex-wrap gap-2 pt-2 border-b-2 border-slate-900">
              {[
                { id: "scattering", label: "1. Thí nghiệm Tán xạ α" },
                { id: "nucleon", label: "2. Nuclôn & Đơn vị u" },
                { id: "symbol", label: "3. Kí hiệu & Kích thước" },
                { id: "isotopes", label: "4. Đồng vị Tự nhiên" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2.5 text-xs font-black rounded-t-xl transition-all border-2 border-slate-900 border-b-0 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-indigo-400 text-slate-950 translate-y-[2px] shadow-none"
                      : "bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 shadow-[2px_2px_0px_#000] hover:translate-y-[0.5px]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-white p-6 rounded-b-2xl rounded-tr-2xl border-2 border-slate-900 shadow-[6px_6px_0px_#1e293b] min-h-[400px]">
              {/* TAB CONTENT: SCATTERING */}
              {activeTab === "scattering" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-indigo-50/80 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b]">
                    <div className="flex items-center gap-2.5 border-b-2 border-slate-900 pb-2.5 mb-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-mono font-black border border-slate-900 shadow-[1px_1px_0px_#000]">I</span>
                      <h4 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider">Mô hình bánh mỳ mận Thomson vs Thí nghiệm Rutherford (1911)</h4>
                    </div>
                    <p className="text-xs text-slate-900 leading-relaxed font-bold">
                      Trước năm 1911, mô hình nguyên tử Thomson cho rằng nguyên tử là một quả cầu đặc tích điện dương rải rác các electron giống như hạt mận trong bánh mỳ. 
                      <br /><span className="text-indigo-800">Ernest Rutherford</span> đã thực hiện thí nghiệm quyết định bằng cách bắn chùm hạt alpha sinh ra từ phóng xạ tự nhiên xuyên qua một lá vàng siêu mỏng chỉ vài trăm lớp nguyên tử.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-3">
                    <span className="text-[10px] text-indigo-950 font-black uppercase tracking-wider block">Thiết lập hệ thống thí nghiệm:</span>
                    <ul className="text-xs text-slate-800 space-y-2.5 pl-1 font-bold">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-0.5">✦</span>
                        <span><strong>Nguồn phát alpha (R):</strong> Đặt trong hộp chì dày có lỗ nhỏ, định hướng chùm tia hạt <span className="font-serif italic font-black text-indigo-700">α</span> (bản chất hạt nhân Heli tích điện <strong className="text-indigo-700 font-black">+2e</strong>).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-0.5">✦</span>
                        <span><strong>Lá vàng bia (D):</strong> Có độ dày cực kì mỏng chỉ <strong className="text-indigo-700 font-black">4 · 10⁻⁷ m</strong> nhằm tránh hiện tượng hấp thụ hạt alpha.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-0.5">✦</span>
                        <span><strong>Kính quan sát (M):</strong> Kèm màn huỳnh quang ZnS phát đốm sáng nhỏ khi hạt va chạm, giúp đếm chính xác số lượng hạt lệch hướng ở từng góc độ.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  {/* Experimental Setup SVG Block */}
                  <div className="bg-slate-100 p-4 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] text-center space-y-2.5">
                    <span className="text-xs font-black text-indigo-950 uppercase tracking-wider block">Sơ đồ quang hình thí nghiệm tán xạ α</span>
                    <div className="w-full h-44 bg-slate-950 rounded-2xl flex items-center justify-center border-2 border-slate-900 p-2 overflow-hidden shadow-inner">
                      <svg viewBox="0 0 400 200" className="w-full h-full">
                        <rect x="20" y="80" width="40" height="40" rx="4" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                        <rect x="40" y="93" width="22" height="14" fill="#0f172a" />
                        <circle cx="35" cy="100" r="7" fill="#ef4444" />
                        <text x="35" y="103" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">R</text>
                        <text x="30" y="73" fill="#cbd5e1" fontSize="8" fontWeight="bold">Chì phóng xạ</text>
                        
                        <line x1="60" y1="100" x2="200" y2="100" stroke="#c084fc" strokeWidth="2.5" strokeDasharray="3,3" />
                        <text x="100" y="88" fill="#c084fc" fontSize="9" fontWeight="bold">Chùm tia α (+2e)</text>
                        
                        <line x1="200" y1="50" x2="200" y2="150" stroke="#facc15" strokeWidth="5" />
                        <text x="200" y="42" fill="#eab308" fontSize="10" fontWeight="black" textAnchor="middle">Lá vàng D</text>
                        
                        <line x1="200" y1="100" x2="340" y2="100" stroke="#4ade80" strokeWidth="2" />
                        <line x1="200" y1="100" x2="310" y2="45" stroke="#f97316" strokeWidth="1.5" />
                        <line x1="200" y1="100" x2="130" y2="150" stroke="#ef4444" strokeWidth="1.5" /> 
                        
                        <circle cx="200" cy="100" r="80" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4" />
                        <rect x="270" y="40" width="16" height="8" rx="2" fill="#22c55e" transform="rotate(30, 270, 40)" />
                        <text x="295" y="32" fill="#22c55e" fontSize="8" fontWeight="black">Kính ngắm M</text>
                        
                        <text x="345" y="103" fill="#4ade80" fontSize="8" fontWeight="bold">Đi thẳng (&gt;99.9%)</text>
                        <text x="105" y="165" fill="#ef4444" fontSize="8" fontWeight="bold">Bị dội ngược (~1/10.000)</text>
                      </svg>
                    </div>
                    <p className="text-[10px] text-slate-700 italic font-bold">
                      Hạt alpha lệch hướng cực mạnh chứng tỏ tâm nguyên tử chứa lõi siêu cứng, đặc và siêu nặng.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: NUCLEON */}
            {activeTab === "nucleon" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                {/* Protons & Neutrons block */}
                <div className="bg-indigo-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4">
                  <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2.5">
                    <span className="p-1.5 bg-indigo-150 text-indigo-950 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
                      <Layers className="h-5 w-5" />
                    </span>
                    <h4 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider">Cấu trúc lõi: Các hạt Nuclôn</h4>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-bold">
                    Hạt nhân được cấu tạo từ các nuclôn, bao gồm hai loại hạt chính là prôtôn mang điện và nơtrôn trung hòa:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-blue-50 border-2 border-slate-900 p-3.5 rounded-2xl flex items-start gap-3 shadow-[3px_3px_0px_#1e293b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1e293b] transition-all">
                      <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-mono font-black text-xs border-2 border-slate-900 shrink-0">p</div>
                      <div className="space-y-1">
                        <span className="text-xs font-black text-blue-950 uppercase tracking-wide block">1. Hạt Prôtôn (kí hiệu p):</span>
                        <ul className="text-[11px] text-slate-800 list-disc list-inside space-y-1 font-bold">
                          <li className="flex items-center gap-1">Điện tích dương: <span className="bg-white px-1 py-0.5 rounded border inline-block font-normal"><FormattedMathText text="q_p = +1,6 \cdot 10^{-19}\text{ C}" /></span></li>
                          <li className="flex items-center gap-1">Khối lượng: <span className="bg-white px-1 py-0.5 rounded border inline-block font-normal"><FormattedMathText text="m_p \approx 1,67262 \cdot 10^{-27}\text{ kg} \approx 1,007276\text{ u}" /></span></li>
                          <li>Số hiệu nguyên tử Z tương ứng số prôtôn.</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-rose-50 border-2 border-slate-900 p-3.5 rounded-2xl flex items-start gap-3 shadow-[3px_3px_0px_#1e293b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1e293b] transition-all">
                      <div className="w-8 h-8 rounded-full bg-rose-700 text-white flex items-center justify-center font-mono font-black text-xs border-2 border-slate-900 shrink-0">n</div>
                      <div className="space-y-1">
                        <span className="text-xs font-black text-rose-950 uppercase tracking-wide block">2. Hạt Nơtrôn (kí hiệu n):</span>
                        <ul className="text-[11px] text-slate-800 list-disc list-inside space-y-1 font-bold">
                          <li className="flex items-center gap-1">Điện tích: <span className="bg-white px-1 py-0.5 rounded border inline-block font-normal"><FormattedMathText text="q_n = 0" /></span> (Không mang điện)</li>
                          <li className="flex items-center gap-1">Khối lượng: <span className="bg-white px-1 py-0.5 rounded border inline-block font-normal"><FormattedMathText text="m_n \approx 1,67493 \cdot 10^{-27}\text{ kg} \approx 1,008665\text{ u}" /></span></li>
                          <li>Khối lượng nơtrôn nhỉnh hơn khối lượng prôtôn một chút.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Units block */}
                <div className="bg-rose-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4">
                  <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2.5">
                    <span className="p-1.5 bg-rose-150 text-rose-950 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
                      <Scale className="h-5 w-5" />
                    </span>
                    <h4 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider">Đơn vị Khối lượng u quốc tế</h4>
                  </div>
                  <p className="text-xs text-slate-850 leading-relaxed font-bold">
                    Do khối lượng thực tế của các hạt nhân cực kì nhỏ, các nhà khoa học đã đặt ra đơn vị đo khối lượng nguyên tử tích hợp u (hay amu):
                  </p>
                  <div className="p-4 bg-white border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0px_#1e293b] space-y-3">
                    <span className="text-[10px] text-rose-950 font-black uppercase tracking-wider block text-center">Công thức định nghĩa pháp định:</span>
                    <div className="py-2.5 px-4 bg-rose-50 border border-rose-300 rounded-xl text-center text-xs font-black text-rose-950 flex items-center justify-center gap-1.5 flex-wrap">
                      <FormattedMathText text="1\text{ u} = \frac{1}{12} \cdot m\left(^{12}_{\ 6}\text{C}\right)" />
                    </div>
                    <div className="flex flex-col text-[11px] text-slate-900 font-bold space-y-2 text-center items-center">
                      <span><FormattedMathText text="1\text{ u} \approx 1,66054 \cdot 10^{-27}\text{ kg}" /></span>
                      <span className="text-indigo-700"><FormattedMathText text="1\text{ u} \cdot c^2 \approx 931,5\text{ MeV}" /> (Theo thuyết tương đối)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SYMBOL */}
            {activeTab === "symbol" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
                {/* Notation */}
                <div className="lg:col-span-6 bg-amber-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4">
                  <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2.5">
                    <span className="p-1.5 bg-amber-150 text-amber-950 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
                      <Info className="h-5 w-5" />
                    </span>
                    <h4 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider">Kí hiệu hạt nhân nguyên tử chuẩn hóa</h4>
                  </div>
                  <p className="text-xs text-slate-800 font-bold leading-relaxed">
                    Một hạt nhân của nguyên tố X được biểu diễn tổng quát có số khối và số hiệu nguyên tử đứng góc trái:
                  </p>
                  
                  <div className="flex justify-center py-4 bg-white rounded-2xl border-2 border-slate-900 shadow-inner">
                    <div className="relative bg-amber-50 border-2 border-slate-900 px-8 py-5 rounded-xl flex items-center gap-3.5 shadow-[4px_4px_0px_#1e293b]">
                      <div className="flex flex-col text-right font-mono leading-none font-bold">
                        <span className="text-2xl font-black text-indigo-700 animate-pulse" title="Số khối A">A</span>
                        <span className="text-2xl font-black text-emerald-700 mt-2.5" title="Số hiệu Z">Z</span>
                      </div>
                      <span className="text-5xl font-black text-slate-950 tracking-tighter">X</span>
                      
                      {/* Explanatory float badges */}
                      <div className="absolute -top-3.5 -right-3 bg-indigo-50 border-2 border-slate-900 text-indigo-950 text-[9px] font-black px-2.5 py-1 rounded-md shadow-[2px_2px_0px_#000] flex items-center gap-1">
                        <span>A: Số khối</span> (<FormattedMathText text="A = Z + N" />)
                      </div>
                      <div className="absolute -bottom-3.5 -right-3 bg-emerald-50 border-2 border-slate-900 text-emerald-950 text-[9px] font-black px-2.5 py-1 rounded-md shadow-[2px_2px_0px_#000]">
                        Z: Số prôtôn (Điện tích)
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white border-2 border-slate-900 rounded-xl text-xs text-slate-800 space-y-1.5 font-bold">
                    <div className="flex justify-between items-center border-b pb-1">
                      <span>Số nơtrôn:</span>
                      <span className="text-emerald-700 font-black"><FormattedMathText text="N = A - Z" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Số êlectrôn ngoài vỏ (nguyên tử trung hòa):</span>
                      <span className="text-slate-900 font-black"><FormattedMathText text="Z" /></span>
                    </div>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="lg:col-span-6 bg-white p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4">
                  <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2.5">
                    <span className="p-1.5 bg-indigo-50 text-indigo-950 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
                      <Calculator className="h-5 w-5" />
                    </span>
                    <h4 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider">Kích thước hạt nhân nguyên tử</h4>
                  </div>
                  <p className="text-xs text-slate-800 font-bold leading-relaxed">
                    Hạt nhân có dạng hình cầu đối xứng lý tưởng, thể tích tăng tỉ lệ tuyến tính với tổng số nuclôn A. Thực nghiệm chứng minh bán kính hạt nhân được xác định bởi:
                  </p>
                  
                  <div className="bg-amber-50 border-2 border-slate-900 p-4 rounded-2xl text-center space-y-2 shadow-[3px_3px_0px_#1e293b]">
                    <span className="text-[10px] text-amber-950 font-black uppercase tracking-wider block">Hệ thức bán kính thực nghiệm:</span>
                    <div className="text-sm sm:text-base font-black text-slate-950 bg-white rounded-lg py-2 border-2 border-slate-900 w-fit mx-auto px-6 shadow-sm">
                      <FormattedMathText text="R = 1,2 \cdot 10^{-15} \cdot A^{1/3}\text{ m}" />
                    </div>
                    <div className="text-[11px] text-amber-950 font-bold flex flex-wrap items-center justify-center gap-1.5">
                      <span>hay viết nhanh:</span>
                      <span className="text-indigo-700"><FormattedMathText text="R = 1,2 \cdot A^{1/3}\text{ fm}" /></span>
                      <span>(với <FormattedMathText text="1\text{ fm} = 10^{-15}\text{ m}" />)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <span className="text-[10px] text-slate-600 font-black uppercase block tracking-wider">Bảng so sánh kích thước đối chiếu thực tế:</span>
                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <table className="w-full text-[11px] text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-100 text-slate-600 font-bold">
                            <th className="p-1.5">Hạt nhân</th>
                            <th className="p-1.5 text-center">Số khối A</th>
                            <th className="p-1.5 text-center">Bán kính nguyên tử (10⁻¹⁰ m)</th>
                            <th className="p-1.5 text-right">Bán kính hạt nhân (10⁻¹⁵ m)</th>
                          </tr>
                        </thead>
                        <tbody className="font-bold">
                          <tr className="border-b border-slate-150">
                            <td className="p-1.5 font-bold text-slate-900">Hiđrô (H)</td>
                            <td className="p-1.5 text-center font-mono">1</td>
                            <td className="p-1.5 text-center font-mono">1,2</td>
                            <td className="p-1.5 text-right font-mono text-indigo-700">0,9</td>
                          </tr>
                          <tr className="border-b border-slate-150">
                            <td className="p-1.5 font-bold text-slate-900">Heli (He)</td>
                            <td className="p-1.5 text-center font-mono">4</td>
                            <td className="p-1.5 text-center font-mono">1,4</td>
                            <td className="p-1.5 text-right font-mono text-indigo-700">1,7</td>
                          </tr>
                          <tr className="border-b border-slate-150">
                            <td className="p-1.5 font-bold text-slate-900">Ôxy (O)</td>
                            <td className="p-1.5 text-center font-mono">16</td>
                            <td className="p-1.5 text-center font-mono">1,5</td>
                            <td className="p-1.5 text-right font-mono text-indigo-700">2,7</td>
                          </tr>
                          <tr>
                            <td className="p-1.5 font-bold text-slate-900">Sắt (Fe)</td>
                            <td className="p-1.5 text-center font-mono">56</td>
                            <td className="p-1.5 text-center font-mono">1,9</td>
                            <td className="p-1.5 text-right font-mono text-indigo-700">3,7</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ISOTOPES WITH INTERACTIVE ISOTOPE BUILDER */}
            {activeTab === "isotopes" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
                <div className="lg:col-span-6 space-y-4">
                  <div className="bg-emerald-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-3">
                    <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2.5">
                      <span className="p-1.5 bg-emerald-150 text-emerald-950 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
                        <Sparkles className="h-5 w-5" />
                      </span>
                      <h4 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider">Hiện tượng đồng vị nguyên tố</h4>
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed font-bold">
                      Các nguyên tử đồng vị là những nguyên tử có <span className="text-indigo-700 font-extrabold">cùng số hiệu nguyên tử Z</span> (cùng số prôtôn và cùng vị trí trong bảng tuần hoàn hóa học) nhưng <span className="text-rose-600 font-extrabold">khác số khối A</span> do có số nơtrôn N cấu tạo khác nhau.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-slate-900 p-5 rounded-3xl space-y-3 shadow-[5px_5px_0px_#1e293b]">
                    <span className="text-[10px] text-indigo-950 font-black uppercase block tracking-wider border-b border-slate-200 pb-1.5">Đồng vị của nguyên tố tiêu biểu:</span>
                    <ul className="text-xs text-slate-800 space-y-3 list-none pl-1 font-bold">
                      <li className="border-b border-slate-100 pb-2">
                        <strong className="text-slate-950 block mb-1">• Đồng vị Hiđrô:</strong>
                        <ul className="pl-4 text-slate-700 list-disc space-y-1">
                          <li>Hiđrô thường <Nuclide a="1" z="1" element="H" size="sm" /> chiếm 99,985%, không có neutron.</li>
                          <li>Hiđrô nặng <Nuclide a="2" z="1" element="H" size="sm" /> (Deuterium, kí hiệu D) chiếm 0,015%, rất bền.</li>
                          <li>Hiđrô siêu nặng <Nuclide a="3" z="1" element="H" size="sm" /> (Tritium, kí hiệu T) phóng xạ.</li>
                        </ul>
                      </li>
                      <li>
                        <strong className="text-slate-950 block mb-1">• Đồng vị Cacbon:</strong>
                        <ul className="pl-4 text-slate-700 list-disc space-y-1">
                          <li>Cacbon-12 <Nuclide a="12" z="6" element="C" size="sm" /> bền vững tuyệt đối, chiếm 98,89%.</li>
                          <li>Cacbon-14 <Nuclide a="14" z="6" element="C" size="sm" /> phóng xạ beta trừ với chu kì bán rã 5730 năm, dùng đo thời gian địa chất.</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Isotope Builder Widget */}
                <div className="lg:col-span-6 bg-white p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4">
                  <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                    <h4 className="text-xs font-black text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sliders className="h-4 w-4" /> BỘ XÂY DỰNG ĐỒNG VỊ THỰC HÀNH
                    </h4>
                    <span className="text-[9px] bg-indigo-50 text-indigo-800 font-black border-2 border-slate-900 px-2 py-0.5 rounded-md shadow-sm">Trực quan</span>
                  </div>

                  {/* Sliders controls */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-black">
                        <span className="text-blue-700">1. Số Prôtôn Z: {protons}</span>
                        <span className="text-slate-500 font-medium">Chọn nguyên tố:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {[1, 2, 6, 8, 26, 92].map((pVal) => (
                          <button
                            key={pVal}
                            onClick={() => {
                              setProtons(pVal);
                              if (pVal === 1) setNeutrons(0);
                              else if (pVal === 2) setNeutrons(2);
                              else if (pVal === 6) setNeutrons(6);
                              else if (pVal === 8) setNeutrons(8);
                              else if (pVal === 26) setNeutrons(30);
                              else if (pVal === 92) setNeutrons(146);
                            }}
                            className={`flex-1 min-w-[45px] py-2 text-xs font-black rounded-xl font-mono border-2 transition-all cursor-pointer ${
                              protons === pVal 
                                ? "bg-indigo-400 border-slate-900 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]" 
                                : "bg-slate-50 border-slate-300 text-slate-700 hover:border-slate-800 hover:text-slate-950 hover:bg-slate-100"
                            }`}
                          >
                            {pVal === 1 ? "H" : pVal === 2 ? "He" : pVal === 6 ? "C" : pVal === 8 ? "O" : pVal === 26 ? "Fe" : "U"} ({pVal})
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-black">
                        <span className="text-rose-700">2. Số Nơtrôn N: {neutrons}</span>
                        <span className="text-slate-500 font-medium">Thanh trượt thay đổi:</span>
                      </div>
                      <input
                        type="range"
                        min={protons === 1 ? 0 : protons === 2 ? 1 : protons === 6 ? 5 : protons === 8 ? 7 : protons === 26 ? 26 : 140}
                        max={protons === 1 ? 3 : protons === 2 ? 4 : protons === 6 ? 10 : protons === 8 ? 12 : protons === 26 ? 34 : 150}
                        value={neutrons}
                        onChange={(e) => setNeutrons(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>
                  </div>

                  {/* Output Display */}
                  <div className="bg-indigo-50 border-2 border-slate-900 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-inner">
                    <div className="space-y-1.5 flex-1 text-xs">
                      <span className="text-[10px] font-black text-indigo-900 uppercase tracking-widest block font-mono">Kết quả tính toán:</span>
                      <h5 className="text-sm font-black text-slate-950">{iso.name}</h5>
                      <p className="text-[11px] text-slate-800 leading-normal font-bold">{iso.desc}</p>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] mt-2 font-bold">
                        <span className="text-indigo-900">Bán kính hạt nhân: <code className="bg-white px-1 py-0.5 rounded border">{iso.radius.toFixed(2)} fm</code></span>
                        <span className={`${iso.stability.includes("Bền") ? "text-emerald-700" : "text-rose-700"} font-black`}>
                          ● {iso.stability}
                        </span>
                      </div>
                    </div>

                    {/* Rendered Nuclide logo */}
                    <div className="bg-white border-2 border-slate-900 px-4 py-3 rounded-2xl flex items-center gap-2 font-mono select-none shadow-[3px_3px_0px_#000] shrink-0">
                      <div className="flex flex-col text-right text-[11px] leading-tight font-black">
                        <span className="text-indigo-700">{protons + neutrons}</span>
                        <span className="text-emerald-700">{protons}</span>
                      </div>
                      <span className="text-3xl font-black text-slate-950 tracking-tighter">{iso.symbol}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        )}

        {/* SECTION 2: BÀI TẬP VÍ DỤ MINH HOẠ */}
        {activeSection === 1 && (
          <div className="space-y-6 animate-fade-in" id="section-2-content">
            <div className="space-y-2 bg-rose-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b]">
              <span className="inline-block text-[10px] bg-rose-150 border-2 border-slate-900 text-rose-950 px-2.5 py-1 rounded-md font-mono font-black uppercase shadow-sm">
                Bài toán mẫu điển hình
              </span>
              <h3 className="text-lg font-black text-slate-950">{sections[1].title}</h3>
              <p className="text-xs text-slate-850 font-bold leading-relaxed">
                Các phương pháp tính toán định lượng kích thước nguyên tử lý tưởng và xử lý phân tích bài toán trung bình đồng vị hóa học.
              </p>
            </div>

            {/* EXAMPLE 1: CALCULATING NUCLEAR RADIUS */}
            <div className="bg-indigo-50/50 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] p-6 space-y-4">
              <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-2.5">
                <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-md text-[10px] font-black font-mono border-2 border-slate-900">
                  Ví dụ 1
                </span>
                <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide">
                  Xác định kích thước bán kính của Sắt (<Nuclide a="56" z="26" element="Fe" size="sm" />) và Heli (<Nuclide a="4" z="2" element="He" size="sm" />)
                </h4>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 text-xs text-slate-800 leading-relaxed font-bold space-y-1.5 shadow-[2px_2px_0px_#1e293b]">
                <span className="text-[10px] text-amber-800 font-black uppercase block">Đề bài yêu cầu:</span>
                <p>
                  Hãy tính gần đúng bán kính hạt nhân của nguyên tử sắt <Nuclide a="56" z="26" element="Fe" size="sm" /> và nguyên tử heli <Nuclide a="4" z="2" element="He" size="sm" /> theo mét (m) và fêmtômét (fm). So sánh tỷ số thể tích của hai hạt nhân trên.
                </p>
              </div>

              {/* Dynamic Interactive calculator for R */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 bg-white border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_#1e293b] space-y-3">
                  <span className="text-[10px] text-indigo-950 font-black uppercase tracking-wider block">1. Lời giải chi tiết mẫu:</span>
                  <div className="text-xs text-slate-800 space-y-2 font-bold leading-relaxed">
                    <p className="flex items-center gap-1">
                      Áp dụng công thức bán kính hạt nhân: <span className="text-indigo-700 font-normal"><FormattedMathText text="R = 1,2 \cdot 10^{-15} \cdot A^{1/3}\text{ m}" /></span>
                    </p>
                    <p className="space-y-1">
                      <div>• Với hạt nhân Heli (<FormattedMathText text="A = 4" />):</div>
                      <div className="pl-4 text-slate-950 block"><FormattedMathText text="R_{He} \approx 1,2 \cdot 10^{-15} \cdot 4^{1/3} \approx 1,2 \cdot 1,587 \cdot 10^{-15} \approx 1,90 \cdot 10^{-15}\text{ m} = 1,90\text{ fm}" /></div>
                    </p>
                    <p className="space-y-1">
                      <div>• Với hạt nhân Sắt (<FormattedMathText text="A = 56" />):</div>
                      <div className="pl-4 text-slate-950 block"><FormattedMathText text="R_{Fe} \approx 1,2 \cdot 10^{-15} \cdot 56^{1/3} \approx 1,2 \cdot 3,826 \cdot 10^{-15} \approx 4,59 \cdot 10^{-15}\text{ m} = 4,59\text{ fm}" /></div>
                    </p>
                    <p className="space-y-1">
                      <div>• So sánh tỷ số thể tích: Thể tích hình cầu tỷ lệ thuận với lập phương bán kính (<FormattedMathText text="V \sim R^3" />), hay tỷ lệ thuận với số khối A:</div>
                      <div className="pl-4 text-emerald-700 block"><FormattedMathText text="\frac{V_{Fe}}{V_{He}} = \frac{A_{Fe}}{A_{He}} = \frac{56}{4} = 14\text{ lần}" /></div>
                    </p>
                  </div>
                </div>

                {/* Live Widget for R estimation */}
                <div className="lg:col-span-5 bg-amber-50 border-2 border-slate-900 p-5 rounded-2xl shadow-[4px_4px_0px_#1e293b] space-y-3.5">
                  <span className="text-[10px] text-amber-950 font-black uppercase tracking-wider block text-center border-b border-amber-200 pb-1.5">MÁY TÍNH BÁN KÍNH TỰ CHỌN</span>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-800 block">Chọn số khối (A) của hạt nhân:</label>
                    <input
                      type="range"
                      min="1"
                      max="240"
                      value={calcA}
                      onChange={(e) => setCalcA(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-slate-600">
                      <span>A = 1</span>
                      <span className="font-black text-amber-800">A = {calcA}</span>
                      <span>A = 240</span>
                    </div>
                  </div>

                  <div className="bg-white border border-amber-300 p-3 rounded-xl text-center space-y-1">
                    <span className="text-[9px] text-slate-500 uppercase block font-bold">Kích thước hạt nhân tương ứng:</span>
                    <span className="text-lg font-mono font-black text-indigo-700">R ≈ {(1.2 * Math.pow(calcA, 1/3)).toFixed(3)} fm</span>
                    <span className="text-[10px] text-slate-600 block font-mono font-bold">({(1.2 * Math.pow(calcA, 1/3) * 1e-15).toExponential(3)} m)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* EXAMPLE 2: COMPUTING AVERAGE ATOMIC MASS */}
            <div className="bg-emerald-50/50 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] p-6 space-y-4">
              <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-2.5">
                <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-md text-[10px] font-black font-mono border-2 border-slate-900">
                  Ví dụ 2
                </span>
                <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide">
                  Tính nguyên tử khối trung bình của Clo từ tỷ lệ đồng vị tự nhiên
                </h4>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 text-xs text-slate-800 leading-relaxed font-bold space-y-1.5 shadow-[2px_2px_0px_#1e293b]">
                <span className="text-[10px] text-emerald-800 font-black uppercase block">Đề bài yêu cầu:</span>
                <p>
                  Trong tự nhiên, nguyên tố Clo có hai đồng vị chính bền vững là <Nuclide a="35" z="17" element="Cl" size="sm" /> chiếm tỉ lệ khối lượng tự nhiên là 75,77% và <Nuclide a="37" z="17" element="Cl" size="sm" /> chiếm tỉ lệ là 24,23%. Hãy xác định nguyên tử khối trung bình của nguyên tố Clo tự nhiên.
                </p>
              </div>

              <div className="p-5 bg-white border-2 border-slate-900 rounded-3xl shadow-[3px_3px_0px_#1e293b] space-y-4 font-bold text-xs text-slate-800">
                <span className="text-[10px] text-indigo-950 font-black uppercase tracking-wider block">Lời giải chi tiết và công thức tính trung bình trọng số:</span>
                <p className="leading-relaxed space-y-1">
                  <div>• Gọi <span className="bg-slate-100 px-1 py-0.5 rounded inline-block font-normal"><FormattedMathText text="A_1 = 35" /></span> có hàm lượng phần trăm tương ứng là <span className="bg-slate-100 px-1 py-0.5 rounded inline-block font-normal"><FormattedMathText text="x_1 = 75,77\%" /></span>.</div>
                  <div>• Gọi <span className="bg-slate-100 px-1 py-0.5 rounded inline-block font-normal"><FormattedMathText text="A_2 = 37" /></span> có hàm lượng phần trăm tương ứng là <span className="bg-slate-100 px-1 py-0.5 rounded inline-block font-normal"><FormattedMathText text="x_2 = 24,23\%" /></span>.</div>
                </p>
                
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                  <span className="text-[10px] text-emerald-950 uppercase block font-black text-center">Hệ thức tính nguyên tử khối trung bình:</span>
                  <div className="text-xs sm:text-sm font-black text-slate-950 bg-white rounded-lg py-2 border-2 border-slate-900 text-center">
                    <FormattedMathText text="A_{tb} = \frac{A_1 \cdot x_1 + A_2 \cdot x_2}{100}" />
                  </div>
                </div>

                <p className="leading-relaxed">
                  Thay số liệu thực tế ta thu được kết quả:
                  <br />
                  <span className="text-slate-950 block mt-1 bg-slate-50 p-2.5 rounded-lg border-2 border-dashed border-slate-300 w-fit">
                    <FormattedMathText text="A_{tb} = \frac{35 \cdot 75,77 + 37 \cdot 24,23}{100} = \frac{2651,95 + 896,51}{100} = 35,48\text{ u}" /> (hay xấp xỉ <FormattedMathText text="35,5\text{ u}" />).
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: BÀI TẬP VẬN DỤNG THỰC TIỄN */}
        {activeSection === 2 && (
          <div className="space-y-6 animate-fade-in" id="section-3-content">
            <div className="space-y-2 bg-emerald-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b]">
              <span className="inline-block text-[10px] bg-emerald-150 border-2 border-slate-900 text-emerald-950 px-2.5 py-1 rounded-md font-mono font-black uppercase shadow-sm">
                Rèn luyện nâng cao
              </span>
              <h3 className="text-lg font-black text-slate-950">{sections[2].title}</h3>
              <p className="text-xs text-slate-850 font-bold leading-relaxed">
                Hệ thống câu hỏi luyện tập có lời giải chi tiết giúp củng cố kiến thức hạt nhân bám sát định hướng kiểm tra và kì thi quốc gia.
              </p>
            </div>

            {/* Exercise 1 */}
            <div className="bg-amber-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_#1e293b] transition-all duration-150">
              <div className="space-y-1.5 border-b-2 border-slate-900 pb-2">
                <span className="text-[9px] bg-amber-100 border-2 border-amber-900 text-amber-950 px-2.5 py-0.5 rounded-md font-mono font-black uppercase">
                  Bài tập 1 • Cấu tạo hạt nhân Uranium
                </span>
                <h4 className="text-xs sm:text-sm font-black text-slate-950 leading-normal">
                  Hạt nhân đồng vị urani phóng xạ phân hạch <Nuclide a="235" z="92" element="U" size="sm" /> có số nuclôn, số prôtôn và số nơtrôn cấu thành lần lượt là bao nhiêu?
                </h4>
              </div>
              <div className="p-4 bg-white rounded-2xl border-2 border-slate-900 text-xs text-slate-800 leading-relaxed font-bold space-y-2.5 shadow-[2px_2px_0px_#1e293b]">
                <span className="text-[10px] text-amber-900 font-black uppercase tracking-wider block">Phân tích lời giải nhanh:</span>
                <p>
                  Theo kí hiệu hạt nhân <Nuclide a="235" z="92" element="U" size="sm" />:
                  <br />• Số hiệu nguyên tử <code className="font-mono bg-slate-50 px-1">Z = 92</code>, tương ứng hạt nhân chứa <strong>92 prôtôn</strong>.
                  <br />• Số khối <code className="font-mono bg-slate-50 px-1">A = 235</code>, tương ứng hạt nhân chứa <strong>235 nuclôn</strong>.
                  <br />• Số nơtrôn được tính bằng hiệu số: <code className="font-mono bg-slate-50 px-1">N = A - Z = 235 - 92 = 143 nơtrôn</code>.
                </p>
              </div>
            </div>

            {/* Exercise 2 */}
            <div className="bg-rose-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_#1e293b] transition-all duration-150">
              <div className="space-y-1.5 border-b-2 border-slate-900 pb-2">
                <span className="text-[9px] bg-rose-100 border-2 border-rose-900 text-rose-950 px-2.5 py-0.5 rounded-md font-mono font-black uppercase">
                  Bài tập 2 • Đánh giá mật độ khối lượng hạt nhân
                </span>
                <h4 className="text-xs sm:text-sm font-black text-slate-950 leading-normal">
                  Tại sao ta nói vật chất ở trạng thái hạt nhân nguyên tử có mật độ (khối lượng riêng) khổng lồ siêu đặc? Hãy giải thích bản chất vật lý này.
                </h4>
              </div>
              <div className="p-4 bg-white rounded-2xl border-2 border-slate-900 text-xs text-slate-800 leading-relaxed font-bold space-y-2 shadow-[2px_2px_0px_#1e293b]">
                <span className="text-[10px] text-rose-950 font-black uppercase tracking-wider block">Bản chất vật lý:</span>
                <p>
                  Do hạt nhân nguyên tử chứa hơn 99,9% khối lượng nguyên tử nhưng kích thước lại nhỏ hơn kích thước nguyên tử tới 100.000 lần. Thể tích hạt nhân siêu nhỏ làm cho mật độ khối lượng riêng hạt nhân đạt mức khổng lồ khoảng <strong className="text-rose-700 font-mono text-sm">2,3 · 10¹⁷ kg/m³</strong>. Để dễ tưởng tượng, một muỗng cà phê chứa đầy chất hạt nhân nguyên tử sẽ nặng khoảng 1 tỉ tấn!
                </p>
              </div>
            </div>

            {/* Exercise 3 */}
            <div className="bg-emerald-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_#1e293b] transition-all duration-150">
              <div className="space-y-1.5 border-b-2 border-slate-900 pb-2">
                <span className="text-[9px] bg-emerald-100 border-2 border-emerald-900 text-emerald-950 px-2.5 py-0.5 rounded-md font-mono font-black uppercase">
                  Bài tập 3 • Đồng vị Cacbon khảo cổ
                </span>
                <h4 className="text-xs sm:text-sm font-black text-slate-950 leading-normal">
                  Hạt nhân đồng vị Cacbon <Nuclide a="14" z="6" element="C" size="sm" /> được cấu tạo từ bao nhiêu proton và nơtrôn? Nó được ứng dụng như thế nào trong khảo cổ học?
                </h4>
              </div>
              <div className="p-4 bg-white rounded-2xl border-2 border-slate-900 text-xs text-slate-800 leading-relaxed font-bold space-y-2 shadow-[2px_2px_0px_#1e293b]">
                <span className="text-[10px] text-emerald-900 font-black uppercase tracking-wider block">Giải thích ý nghĩa lịch sử:</span>
                <p>
                  Đồng vị <Nuclide a="14" z="6" element="C" size="sm" /> chứa <span className="text-slate-950">6 prôtôn</span> và <span className="text-slate-950">14 - 6 = 8 nơtrôn</span>. Trong khí quyển quyển sinh vật hấp thụ ổn định lượng C-14. Sau khi sinh vật chết, hàm lượng C-14 bắt đầu giảm dần theo quy luật phân rã phóng xạ với chu kì bán rã 5730 năm. Nhờ so sánh lượng C-14 còn lại với tỉ lệ ban đầu, các nhà khoa học có thể xác định niên đại chính xác của các hiện vật hữu cơ như xương, gỗ cổ đại.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Assistant Chat Panel */}
      <div className="relative bg-indigo-50/50 p-6 rounded-3xl border-2 border-slate-900 shadow-[6px_6px_0px_#1e293b] space-y-4 overflow-hidden" id="ai-assistant-lesson21">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
        
        <div className="relative z-10 flex items-center justify-between border-b-2 border-slate-900 pb-3 flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 border-2 border-slate-900 text-indigo-950 rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <Sparkles className="h-5 w-5 animate-pulse text-indigo-700" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide">Trợ lý Giáo viên AI - Giải đáp Bài 21</h4>
              <p className="text-[10px] text-slate-700 font-bold">Chuyên gia giải đáp Bài cấu trúc hạt nhân • Sư phạm mẫu mực & Kiên nhẫn</p>
            </div>
          </div>
          <button
            onClick={() => setMessages([
              {
                role: "model",
                content: "Thầy/Cô đã đặt lại hộp thoại. Thầy/Cô rất vui lòng được hỗ trợ các em giải đáp mọi thắc mắc liên quan đến Bài 21: Cấu trúc hạt nhân và môn Vật lý!"
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
            "Thí nghiệm tán xạ alpha của Rutherford chứng minh điều gì thế ạ?",
            "Lực liên kết giữ các prôtôn lại gần nhau trong hạt nhân là lực gì?",
            "Làm sao đổi đơn vị u sang kg và tính năng lượng tương đương MeV?",
            "Số khối A và số hiệu nguyên tử Z biểu diễn cấu trúc hạt nhân như thế nào?"
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
            placeholder="Đặt câu hỏi về Bài 21 cấu tạo hạt nhân..."
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

      {/* FOOTER: Summary Core Knowledge */}
      <div className="bg-indigo-50 border-2 border-slate-900 p-5 rounded-3xl flex items-start gap-4 shadow-[4px_4px_0px_#1e293b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#1e293b] transition-all">
        <span className="p-2.5 bg-indigo-150 border-2 border-slate-900 text-indigo-950 rounded-xl shadow-[2px_2px_0px_#000]">
          <Brain className="h-5 w-5 shrink-0" />
        </span>
        <div className="space-y-1.5 text-slate-900">
          <span className="text-xs text-indigo-950 font-black uppercase tracking-wider font-mono block">Kết luận sư phạm cốt lõi</span>
          <p className="text-xs leading-relaxed font-bold text-slate-800">
            Cấu trúc hạt nhân là nền tảng cốt lõi của vật lý hiện đại. Việc nắm bắt các nguyên lý cấu tạo từ prôtôn mang điện dương và nơtrôn trung hòa, hiểu rõ bản chất của đơn vị u và sự khác nhau của các đồng vị giúp học sinh giải thích được nhiều hiện tượng năng lượng nguyên tử, phóng xạ môi trường và sự hình thành các nguyên tố hóa học trong vũ trụ.
          </p>
        </div>
      </div>
    </div>
  );
}
