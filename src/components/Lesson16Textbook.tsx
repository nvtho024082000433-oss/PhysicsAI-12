import { useState, useEffect, useRef } from "react";
import { BookOpen, Sparkles, Brain, CheckCircle2, ArrowRight, Info, Zap, Compass, RefreshCw, AlertCircle, Send } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson16Textbook() {
  const [activeSubSection, setActiveSubSection] = useState<number>(0);
  const [fluxAngle, setFluxAngle] = useState<number>(60); // Angle slider for interactive SVG 16.1

  // AI Assistant State
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Thầy/Cô chào các em! Thầy/Cô là Giáo viên Trợ lý ảo AI chuyên sâu về Bài 16: Từ thông. Cảm ứng điện từ. Các em có thắc mắc gì cần Thầy/Cô giải đáp về khái niệm từ thông, hiện tượng cảm ứng điện từ, cách xác định chiều dòng điện cảm ứng bằng Định luật Lenz, công thức Định luật Faraday, hay thí nghiệm nam châm rơi không?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          mode: "lesson16"
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

  const sections = [
    {
      title: "I. Từ thông",
      subtitle: "Khái niệm và biểu thức từ thông qua diện tích S",
      tabLabel: "I. Từ thông"
    },
    {
      title: "II. Hiện tượng cảm ứng điện từ",
      subtitle: "Định nghĩa, các thí nghiệm khảo sát trực quan",
      tabLabel: "II. Cảm ứng điện từ"
    },
    {
      title: "III. Định luật Lenz",
      subtitle: "Quy tắc xác định chiều dòng điện cảm ứng chống lại nguyên nhân sinh ra nó",
      tabLabel: "III. Định luật Lenz"
    },
    {
      title: "IV. Định luật Faraday",
      subtitle: "Độ lớn suất điện động cảm ứng tỉ lệ với tốc độ biến thiên từ thông",
      tabLabel: "IV. Định luật Faraday"
    },
    {
      title: "V. Thí nghiệm thực tế: Nam châm rơi",
      subtitle: "Quá trình chuyển hóa cơ năng thành điện năng và đồ thị suất điện động",
      tabLabel: "V. Nam châm rơi"
    }
  ];

  // Helper values for interactive SVG 16.1
  const rad = (fluxAngle * Math.PI) / 180;
  const nx = 100 + 40 * Math.cos(rad);
  const ny = 65 - 40 * Math.sin(rad);

  return (
    <div className="space-y-8 text-slate-950 font-sans max-w-4xl mx-auto py-4 animate-fade-in">
      
      {/* Textbook Header Badge */}
      <div className="border-b-2 border-slate-900 pb-6 space-y-5">
        <div className="w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 border-2 border-cyan-400 text-cyan-950 text-xs font-black tracking-wide uppercase mb-3">
            <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "12s" }} /> CHƯƠNG III: TỪ TRƯỜNG
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-snug w-full block">
            BÀI 16: TỪ THÔNG. CẢM ỨNG ĐIỆN TỪ
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 mt-1.5 leading-normal font-bold w-full block">
            Sách Giáo Khoa Vật lí lớp 12 — Chương trình Giáo dục phổ thông mới 2018
          </p>
        </div>
        
        {/* Textbook Navigation Subtabs */}
        <div className="flex flex-wrap bg-slate-200 p-1.5 rounded-2xl border-2 border-slate-900 gap-1.5 select-none w-full shadow-[4px_4px_0px_0px_#000]">
          {sections.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSubSection(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer ${
                activeSubSection === idx
                  ? "bg-white text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-950"
                  : "text-slate-800 hover:text-slate-950 hover:bg-slate-50"
              }`}
            >
              {sec.tabLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Opening Question Box */}
      <div className="bg-violet-50 p-6 rounded-3xl border-2 border-slate-900 relative overflow-hidden shadow-[4px_4px_0px_0px_#0f172a]">
        <div className="absolute top-0 right-0 p-8 text-violet-200/50 pointer-events-none text-7xl font-mono select-none">
          ?
        </div>
        <p className="text-slate-950 italic text-sm leading-relaxed relative z-10 font-bold">
          "Khi từ thông qua một mạch kín biến thiên, hiện tượng cảm ứng điện từ xảy ra như thế nào? Suất điện động sinh ra có mối liên hệ thế nào với tốc độ biến đổi từ thông? Định luật Lenz giúp xác định chiều dòng điện ra sao?"
        </p>
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        
        {/* SECTION 1: TỪ THÔNG */}
        {activeSubSection === 0 && (
          <div className="space-y-6 animate-fade-in">
            <section className="space-y-3">
              <h2 className="text-xl font-black text-slate-950 flex items-center gap-2 tracking-tight">
                <span className="text-cyan-600 font-mono">I.</span> KHÁI NIỆM TỪ THÔNG
              </h2>
              <p className="text-slate-900 text-sm leading-relaxed font-bold">
                Xét một vòng dây dẫn kín <FormattedMathText text="(C)" /> phẳng có diện tích <strong className="text-slate-950"><FormattedMathText text="S" /></strong>, đặt trong từ trường đều <strong className="text-slate-950"><FormattedMathText text="B" /></strong>. Gọi <strong className="text-cyan-700"><FormattedMathText text="n" /></strong> là vectơ pháp tuyến đơn vị vuông góc với mặt phẳng vòng dây. Góc giữa vectơ pháp tuyến <strong className="text-cyan-700"><FormattedMathText text="n" /></strong> và vectơ cảm ứng từ <strong className="text-cyan-700"><FormattedMathText text="B" /></strong> được kí hiệu là <strong className="text-amber-700"><FormattedMathText text="\alpha" /></strong>.
              </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                
                {/* Math Formula Highlight Card */}
                <div className="bg-amber-50 border-2 border-slate-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_#000] flex flex-col items-center justify-center space-y-4 text-center">
                  <span className="text-[10px] font-mono font-black bg-amber-200 border-2 border-slate-900 text-slate-950 px-2.5 py-1 rounded-md shadow-[1.5px_1.5px_0px_0px_#000] uppercase tracking-wider">CÔNG THỨC TỪ THÔNG (16.1)</span>
                  <div className="text-3xl font-black text-slate-950 bg-white px-8 py-4 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <FormattedMathText text="\Phi = B \cdot S \cdot \cos\alpha" />
                  </div>
                  <div className="text-xs text-slate-900 font-bold max-w-md space-y-1.5 text-left border-t-2 border-slate-900/10 pt-4 w-full">
                    <p>● <strong className="text-slate-950"><FormattedMathText text="\Phi" /></strong>: Từ thông qua diện tích <FormattedMathText text="S" />, đơn vị là <strong className="text-cyan-800">Vêbe (Weber - Wb)</strong>. Ta có: <strong className="text-amber-800"><FormattedMathText text="1\text{ Wb} = 1\text{ T} \cdot \text{m}^2" /></strong>.</p>
                    <p>● <strong className="text-slate-950"><FormattedMathText text="B" /></strong>: Cảm ứng từ của từ trường đều, đơn vị <strong className="text-slate-950">Tesla (T)</strong>.</p>
                    <p>● <strong className="text-slate-950"><FormattedMathText text="S" /></strong>: Diện tích giới hạn bởi vòng dây kín <FormattedMathText text="(C)" />, đơn vị <strong className="text-slate-950">m²</strong>.</p>
                    <p>● <strong className="text-slate-950"><FormattedMathText text="\alpha" /></strong>: Góc hợp bởi pháp tuyến mặt phẳng <strong className="text-cyan-700"><FormattedMathText text="n" /></strong> và vectơ từ trường <strong className="text-cyan-700"><FormattedMathText text="B" /></strong>.</p>
                  </div>
                </div>

                {/* Angle cases study */}
                <div className="bg-sky-50 border-2 border-slate-900 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-4">
                  <h4 className="text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-sky-700" />
                    Sự phụ thuộc của từ thông vào góc <FormattedMathText text="\alpha" />:
                  </h4>
                  <div className="grid grid-cols-1 gap-3 text-xs font-bold text-slate-900">
                    <div className="bg-white p-3 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000]">
                      <span className="text-amber-700 font-extrabold">1. Góc nhọn (<FormattedMathText text="0^\circ \le \alpha < 90^\circ" />):</span>
                      <p className="text-slate-800 mt-1 font-semibold leading-relaxed"><FormattedMathText text="\cos\alpha > 0" /> nên <strong className="text-slate-950"><FormattedMathText text="\Phi > 0" /></strong>. Đặc biệt khi <FormattedMathText text="\alpha = 0^\circ" /> (đường sức ⊥ khung dây), <FormattedMathText text="\cos 0^\circ = 1" />, từ thông đạt giá trị cực đại <strong className="text-cyan-700"><FormattedMathText text="\Phi_{\text{max}} = B \cdot S" /></strong>.</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000]">
                      <span className="text-red-700 font-extrabold">2. Góc tù (<FormattedMathText text="90^\circ < \alpha \le 180^\circ" />):</span>
                      <p className="text-slate-800 mt-1 font-semibold leading-relaxed"><FormattedMathText text="\cos\alpha < 0" /> nên từ thông mang giá trị âm (<strong className="text-slate-950"><FormattedMathText text="\Phi < 0" /></strong>). Giá trị từ thông phụ thuộc cách chọn chiều pháp tuyến <FormattedMathText text="n" />.</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000]">
                      <span className="text-slate-600 font-extrabold">3. Góc vuông (<FormattedMathText text="\alpha = 90^\circ" />):</span>
                      <p className="text-slate-800 mt-1 font-semibold leading-relaxed"><FormattedMathText text="\cos 90^\circ = 0" />, từ thông qua diện tích <FormattedMathText text="S" /> bằng không (<strong className="text-slate-950"><FormattedMathText text="\Phi = 0" /></strong>). Không có bất kì đường sức từ nào xuyên qua khung dây.</p>
                    </div>
                  </div>
                </div>

                {/* Physical interpretation */}
                <div className="bg-emerald-50 border-2 border-slate-900 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-1.5 text-slate-900">
                  <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wider">Ý NGHĨA VẬT LÍ CỦA TỪ THÔNG</h4>
                  <p className="text-xs leading-relaxed font-bold">
                    Từ thông được dùng để diễn tả <span className="text-emerald-700 font-extrabold">số đường sức từ</span> đi xuyên qua một diện tích giới hạn <FormattedMathText text="S" />. Từ trường càng mạnh (<FormattedMathText text="B" /> lớn) hoặc diện tích khung <FormattedMathText text="S" /> càng rộng, số đường sức từ xuyên qua càng nhiều thì từ thông <FormattedMathText text="\Phi" /> càng lớn.
                  </p>
                </div>
              </div>

              {/* Interactive SVG Diagram Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border-2 border-slate-900 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#000] flex flex-col items-center">
                  <div className="w-full flex justify-between items-center mb-3 border-b-2 border-slate-900/10 pb-2">
                    <span className="text-[10px] text-slate-600 font-mono font-black uppercase">Hình 16.1. Khung xoay α trong từ trường</span>
                    <span className="text-xs text-cyan-800 font-mono font-black bg-cyan-100 border border-cyan-400 px-2 py-0.5 rounded">α = {fluxAngle}°</span>
                  </div>

                  <svg viewBox="0 0 200 130" className="w-full max-h-[160px] border-2 border-slate-900 rounded-2xl bg-[#fcfcfc] shadow-inner">
                    <rect width="100%" height="100%" fill="#fafafa" rx="4" />
                    
                    {/* B-field lines */}
                    <line x1="20" y1="30" x2="180" y2="30" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                    <line x1="20" y1="50" x2="180" y2="50" stroke="#0284c7" strokeWidth="1.5" />
                    <polygon points="175,47 183,50 175,53" fill="#0284c7" />
                    
                    <line x1="20" y1="65" x2="180" y2="65" stroke="#0284c7" strokeWidth="1.5" />
                    <polygon points="175,62 183,65 175,68" fill="#0284c7" />
                    
                    <line x1="20" y1="80" x2="180" y2="80" stroke="#0284c7" strokeWidth="1.5" />
                    <polygon points="175,77 183,80 175,83" fill="#0284c7" />
                    <line x1="20" y1="100" x2="180" y2="100" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                    
                    {/* B text label */}
                    <text x="175" y="42" fill="#0284c7" className="text-[10px] font-black font-mono">B</text>

                    {/* Wire Loop (C) projected as ellipse tilted at angle */}
                    <ellipse 
                      cx="100" 
                      cy="65" 
                      rx={25 * Math.abs(Math.sin(rad))} 
                      ry="35" 
                      fill="rgba(239, 68, 68, 0.08)" 
                      stroke="#dc2626" 
                      strokeWidth="2.5" 
                      transform={`rotate(${90 - fluxAngle}, 100, 65)`}
                    />

                    {/* Normal vector n */}
                    <line x1="100" y1="65" x2={nx} y2={ny} stroke="#047857" strokeWidth="2.5" />
                    <polygon 
                      points={`${nx - 3},${ny + 1} ${nx + 5},${ny - 3} ${nx},${ny + 5}`} 
                      fill="#047857" 
                      transform={`rotate(${90 - fluxAngle}, ${nx}, ${ny})`}
                    />
                    <text x={nx + 4} y={ny - 2} fill="#047857" className="text-[9px] font-black font-mono">n</text>

                    {/* Angle arc representation */}
                    <path d="M 125,65 A 25,25 0 0,0 115,48" fill="none" stroke="#d97706" strokeWidth="1.5" />
                    <text x="116" y="58" fill="#d97706" className="text-[9px] font-black">α</text>

                    {/* Loop text */}
                    <text x="75" y="112" fill="#dc2626" className="text-[9px] font-black">(C)</text>
                    <text x="100" y="22" fill="#475569" className="text-[9px] font-bold italic text-center">Diện tích S</text>
                  </svg>

                  {/* Interactive Slider for angle */}
                  <div className="w-full mt-5 space-y-2">
                    <div className="flex justify-between text-[10px] text-slate-700 font-extrabold font-mono">
                      <span>Mặt phẳng // B (α = 90°)</span>
                      <span>Mặt phẳng ⊥ B (α = 0°)</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="180" 
                      value={fluxAngle} 
                      onChange={(e) => setFluxAngle(parseInt(e.target.value))}
                      className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-300"
                    />
                    <div className="text-center pt-2">
                      <span className="text-[11px] bg-slate-100 border-2 border-slate-900 text-slate-900 font-black px-3 py-1.5 rounded-lg shadow-[1.5px_1.5px_0px_0px_#000] inline-block">
                        cos({fluxAngle}°) = {Math.cos(rad).toFixed(3)} → Từ thông Φ {Math.cos(rad) > 0.01 ? "DƯƠNG 📈" : Math.cos(rad) < -0.01 ? "ÂM 📉" : "BẰNG KHÔNG 0️⃣"}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-700 italic text-center leading-relaxed font-bold">
                  Di chuyển thanh trượt góc <FormattedMathText text="\alpha" /> để quan sát sự thay đổi tương ứng của góc hợp giữa pháp tuyến đơn vị <span className="text-emerald-700 font-black"><FormattedMathText text="n" /></span> và vectơ cảm ứng từ <span className="text-cyan-700 font-black"><FormattedMathText text="B" /></span>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: HIỆN TƯỢNG CẢM ỨNG ĐIỆN TỪ */}
        {activeSubSection === 1 && (
          <div className="space-y-6 animate-fade-in">
            <section className="space-y-3">
              <h2 className="text-xl font-black text-slate-950 flex items-center gap-2 tracking-tight">
                <span className="text-cyan-600 font-mono">II.</span> HIỆN TƯỢNG CẢM ỨNG ĐIỆN TỪ
              </h2>
              <p className="text-slate-900 text-sm leading-relaxed font-bold">
                Khi số đường sức từ xuyên qua tiết diện của một cuộn dây dẫn kín biến thiên, trong cuộn dây đó xuất hiện dòng điện gọi là <strong className="text-slate-950">dòng điện cảm ứng</strong>. Hiện tượng này được gọi là <strong className="text-cyan-700">hiện tượng cảm ứng điện từ</strong>.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Experiment 1: Moving a Bar Magnet */}
              <div className="bg-amber-50 border-2 border-slate-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-slate-900/10 pb-3">
                  <Compass className="h-5 w-5 text-amber-600 animate-spin" style={{ animationDuration: "12s" }} />
                  <h4 className="text-sm font-black text-slate-950 uppercase">Thí nghiệm 1: Nam châm vĩnh cửu & Cuộn dây</h4>
                </div>
                
                <p className="text-xs text-slate-800 leading-relaxed font-bold">
                  <strong className="text-cyan-800">Cách tiến hành:</strong> Nối cuộn dây dẫn kín với điện kế nhạy <FormattedMathText text="G" />. Tiến hành dịch chuyển nam châm thẳng tương đối so với cuộn dây.
                </p>

                <div className="bg-white rounded-2xl p-4 flex flex-col items-center border-2 border-slate-900 shadow-inner">
                  <svg viewBox="0 0 200 100" className="w-full max-h-[110px]">
                    <rect width="100%" height="100%" fill="#fafafa" rx="4" />
                    {/* Galvanometer */}
                    <rect x="25" y="35" width="30" height="40" fill="#f1f5f9" stroke="#0f172a" strokeWidth="1.5" />
                    <circle cx="40" cy="50" r="12" fill="#fff" stroke="#0f172a" strokeWidth="1.5" />
                    {/* Dial mark */}
                    <line x1="40" y1="50" x2="33" y2="41" stroke="#dc2626" strokeWidth="2" /> {/* Pointer rotated left */}
                    <text x="38" y="31" fill="#0f172a" className="text-[8px] font-mono font-black">G</text>

                    {/* Connecting Wires */}
                    <path d="M 40,75 L 40,85 L 90,85 L 90,75" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                    <path d="M 40,75 L 40,90 L 110,90 L 110,75" fill="none" stroke="#dc2626" strokeWidth="1.5" />

                    {/* Coil */}
                    <rect x="80" y="35" width="40" height="40" fill="none" stroke="#d97706" strokeWidth="2.5" strokeDasharray="3 2" />
                    <text x="86" y="58" fill="#d97706" className="text-[8px] font-mono font-black">Cuộn dây</text>

                    {/* Magnet sliding */}
                    <rect x="140" y="45" width="40" height="16" fill="#dc2626" stroke="#0f172a" strokeWidth="1.5" rx="1" />
                    <rect x="160" y="45" width="20" height="16" fill="#2563eb" stroke="#0f172a" strokeWidth="1.5" rx="1" />
                    <text x="146" y="56" fill="#fff" className="text-[8px] font-black font-mono">N</text>
                    <text x="168" y="56" fill="#fff" className="text-[8px] font-black font-mono">S</text>
                    
                    {/* Velocity arrow */}
                    <line x1="135" y1="53" x2="115" y2="53" stroke="#d97706" strokeWidth="2" />
                    <polygon points="118,50 110,53 118,56" fill="#d97706" />
                    <text x="120" y="45" fill="#d97706" className="text-[8px] font-black">v (Tiến lại)</text>
                  </svg>
                  <span className="text-[9.5px] text-slate-700 font-bold text-center mt-3">Dịch chuyển cực Bắc <FormattedMathText text="(N)" /> lại gần cuộn dây làm kim <FormattedMathText text="G" /> lệch</span>
                </div>

                <div className="text-xs text-slate-800 space-y-2 font-bold border-t-2 border-slate-900/10 pt-3">
                  <p><span className="text-amber-800 font-extrabold">● Kết quả 1:</span> Khi đưa nam châm lại gần hoặc ra xa cuộn dây, kim điện kế lệch khỏi vạch số 0. Chứng tỏ xuất hiện <strong className="text-slate-950">dòng điện cảm ứng</strong>.</p>
                  <p><span className="text-amber-800 font-extrabold">● Kết quả 2:</span> Khi nam châm dừng chuyển động, kim điện kế ngay lập tức chỉ về số 0. Chứng tỏ dòng điện biến mất.</p>
                  <p><span className="text-amber-800 font-extrabold">● Kết quả 3:</span> Đổi chiều chuyển động của nam châm (ra xa thay vì lại gần) thì kim điện kế lệch sang phía đối diện.</p>
                </div>
              </div>

              {/* Experiment 2: Electromagnet with Rheostat */}
              <div className="bg-sky-50 border-2 border-slate-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-slate-900/10 pb-3">
                  <Zap className="h-5 w-5 text-cyan-600 animate-pulse" />
                  <h4 className="text-sm font-black text-slate-950 uppercase">Thí nghiệm 2: Nam châm điện & Biến trở</h4>
                </div>

                <p className="text-xs text-slate-800 leading-relaxed font-bold">
                  <strong className="text-cyan-800">Cách tiến hành:</strong> Đặt cuộn dây dẫn thứ hai (2) đứng yên kế bên cuộn 1 là một nam châm điện có lắp biến trở và nguồn một chiều.
                </p>

                <div className="bg-white rounded-2xl p-4 flex flex-col items-center border-2 border-slate-900 shadow-inner">
                  <svg viewBox="0 0 200 100" className="w-full max-h-[110px]">
                    <rect width="100%" height="100%" fill="#fafafa" rx="4" />
                    {/* Electromagnet (1) with battery */}
                    <rect x="25" y="30" width="35" height="30" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="2 1" />
                    <text x="28" y="47" fill="#2563eb" className="text-[8px] font-mono font-black text-center">N.Châm Điện</text>
                    
                    {/* Rheostat (6) */}
                    <rect x="15" y="75" width="22" height="10" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.5" />
                    <line x1="26" y1="70" x2="26" y2="75" stroke="#0f172a" strokeWidth="2" />
                    <text x="14" y="93" fill="#0f172a" className="text-[7.5px] font-black">Biến trở</text>
                    {/* Battery indicator */}
                    <rect x="43" y="75" width="18" height="10" fill="#fff" stroke="#dc2626" strokeWidth="1.5" />
                    <text x="46" y="83" fill="#dc2626" className="text-[7px] font-black font-mono">12V</text>

                    {/* Connection wires for circuit 1 */}
                    <path d="M 25,45 L 10,45 L 10,80 L 15,80" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                    <path d="M 60,45 L 70,45 L 70,80 L 61,80" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                    <line x1="37" y1="80" x2="43" y2="80" stroke="#0f172a" strokeWidth="1.5" />

                    {/* Coil 2 (secondary) */}
                    <rect x="105" y="30" width="30" height="30" fill="none" stroke="#d97706" strokeWidth="2.5" strokeDasharray="3 1" />
                    <text x="108" y="47" fill="#d97706" className="text-[8px] font-mono font-black">Cuộn 2</text>
                    
                    {/* Connecting Galvanometer */}
                    <rect x="148" y="30" width="27" height="30" fill="#f1f5f9" stroke="#0f172a" strokeWidth="1.5" />
                    <circle cx="161.5" cy="45" r="9" fill="#fff" stroke="#0f172a" strokeWidth="1.5" />
                    {/* Pointer rotated right */}
                    <line x1="161.5" y1="45" x2="167" y2="39" stroke="#059669" strokeWidth="1.5" />
                    <text x="149" y="72" fill="#0f172a" className="text-[7px] font-black font-mono">Điện kế G</text>
                    
                    <path d="M 120,60 L 120,85 L 161.5,85 L 161.5,60" fill="none" stroke="#d97706" strokeWidth="1.5" />
                  </svg>
                  <span className="text-[9.5px] text-slate-700 font-bold text-center mt-3">Thay đổi vị trí con chạy của biến trở làm thay đổi <FormattedMathText text="B" />, <FormattedMathText text="G" /> bị lệch</span>
                </div>

                <div className="text-xs text-slate-800 space-y-2 font-bold border-t-2 border-slate-900/10 pt-3">
                  <p><span className="text-cyan-800 font-extrabold">● Kết quả 1:</span> Tại thời điểm đóng hoặc ngắt khoá <FormattedMathText text="K" />, kim điện kế bị lệch mạnh rồi trở lại vạch số 0.</p>
                  <p><span className="text-cyan-800 font-extrabold">● Kết quả 2:</span> Khi khóa <FormattedMathText text="K" /> đóng ổn định, kim điện kế đứng yên ở số 0. Nhưng nếu dịch chuyển biến trở (làm đổi dòng điện qua nam châm điện), kim <FormattedMathText text="G" /> lập tức lệch.</p>
                  <p><span className="text-cyan-800 font-extrabold">● Bản chất:</span> Việc thay đổi từ trường <strong className="text-slate-950"><FormattedMathText text="B" /></strong> bằng biến đổi điện kế cũng làm biến thiên từ thông và sinh dòng điện cảm ứng trong vòng dây tĩnh.</p>
                </div>
              </div>
            </div>

            {/* Core final definition block */}
            <div className="bg-emerald-50 border-2 border-slate-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-2 text-slate-900">
              <span className="text-xs font-black text-emerald-950 uppercase tracking-widest font-mono bg-emerald-200 border-2 border-slate-900 px-2.5 py-1 rounded-md shadow-[1.5px_1.5px_0px_0px_#000] inline-block mb-1">KẾT LUẬN CHUNG</span>
              <p className="text-sm leading-relaxed font-bold">
                Dòng điện cảm ứng chỉ xuất hiện trong mạch kín khi có <strong className="text-amber-700">sự biến thiên của từ thông</strong> xuyên qua diện tích giới hạn bởi mạch. Hiện tượng cảm ứng điện từ là cơ sở hoạt động của các máy phát điện xoay chiều, máy biến áp và đầu đọc ghi từ hiện đại.
              </p>
            </div>
          </div>
        )}

        {/* SECTION 3: ĐỊNH LUẬT LENZ */}
        {activeSubSection === 2 && (
          <div className="space-y-6 animate-fade-in">
            <section className="space-y-3">
              <h2 className="text-xl font-black text-slate-950 flex items-center gap-2 tracking-tight">
                <span className="text-cyan-600 font-mono">III.</span> CHIỀU DÒNG ĐIỆN CẢM ỨNG. ĐỊNH LUẬT LENZ
              </h2>
              <p className="text-slate-900 text-sm leading-relaxed font-bold">
                Làm cách nào để xác định chiều của dòng điện cảm ứng sinh ra trong mạch kín? Nhà vật lí học <strong className="text-slate-950">Heinrich Lenz</strong> đã tìm ra quy luật tổng quát dưới đây:
              </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                
                {/* Lenz's Law Definition Box */}
                <div className="bg-amber-50 border-2 border-slate-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-3">
                  <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider font-mono bg-amber-200 border-2 border-slate-900 px-2.5 py-1 rounded-md shadow-[1.5px_1.5px_0px_0px_#000] inline-block">PHÁT BIỂU ĐỊNH LUẬT LENZ</h4>
                  <p className="text-sm text-slate-950 leading-relaxed font-extrabold bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#000]">
                    “Dòng điện cảm ứng xuất hiện trong mạch kín có chiều sao cho từ trường do nó sinh ra có tác dụng chống lại sự biến thiên của từ thông qua mạch kín đó.”
                  </p>
                </div>

                {/* Step-by-Step guide for using Lenz's Law */}
                <div className="bg-sky-50 border-2 border-slate-900 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-4">
                  <h4 className="text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900/10 pb-2">
                    <Compass className="h-4 w-4 text-sky-700" />
                    Các bước xác định chiều dòng điện cảm ứng:
                  </h4>
                  
                  <div className="space-y-4 text-xs font-bold text-slate-800">
                    <div className="flex gap-3 items-start bg-white p-3 rounded-xl border-2 border-slate-900">
                      <span className="bg-sky-200 border-2 border-slate-900 text-slate-950 rounded-lg px-2 py-1 font-black text-[10px] shadow-[1.5px_1.5px_0px_0px_#000]">BƯỚC 1</span>
                      <p className="leading-relaxed">Xác định chiều của vectơ cảm ứng từ ban đầu <strong className="text-slate-950"><FormattedMathText text="B_0" /></strong> do nam châm ngoài sinh ra.</p>
                    </div>
                    
                    <div className="flex gap-3 items-start bg-white p-3 rounded-xl border-2 border-slate-900">
                      <span className="bg-amber-200 border-2 border-slate-900 text-slate-950 rounded-lg px-2 py-1 font-black text-[10px] shadow-[1.5px_1.5px_0px_0px_#000]">BƯỚC 2</span>
                      <div className="space-y-1 leading-relaxed">
                        <p>Xét sự biến thiên từ thông:</p>
                        <p>● Nếu từ thông <strong className="text-emerald-700">TĂNG</strong> (tiến gần): Từ trường cảm ứng <strong className="text-slate-950"><FormattedMathText text="B_c" /></strong> phải <strong className="text-amber-700">NGƯỢC CHIỀU</strong> với <strong className="text-slate-950"><FormattedMathText text="B_0" /></strong>.</p>
                        <p>● Nếu từ thông <strong className="text-red-700">GIẢM</strong> (lùi xa): Từ trường cảm ứng <strong className="text-slate-950"><FormattedMathText text="B_c" /></strong> phải <strong className="text-emerald-700">CÙNG CHIỀU</strong> với <strong className="text-slate-950"><FormattedMathText text="B_0" /></strong>.</p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start bg-white p-3 rounded-xl border-2 border-slate-900">
                      <span className="bg-emerald-200 border-2 border-slate-900 text-slate-950 rounded-lg px-2 py-1 font-black text-[10px] shadow-[1.5px_1.5px_0px_0px_#000]">BƯỚC 3</span>
                      <p className="leading-relaxed">Dùng <strong className="text-cyan-800">Quy tắc nắm tay phải</strong> đối với vectơ từ trường cảm ứng <strong className="text-slate-950"><FormattedMathText text="B_c" /></strong> để tìm ra chiều của dòng điện cảm ứng <strong className="text-slate-950"><FormattedMathText text="i_c" /></strong> chạy trong vòng dây.</p>
                    </div>
                  </div>
                </div>

                {/* Lenz repelling & attracting concept */}
                <div className="bg-purple-50 border-2 border-slate-900 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-2 text-slate-900 text-xs font-bold">
                  <h4 className="text-purple-950 uppercase tracking-wider font-extrabold">SỰ CHỐNG LẠI CHUYỂN ĐỘNG CƠ HỌC:</h4>
                  <p className="leading-relaxed">
                    Định luật Lenz thể hiện sự cản trở chuyển động tương đối: Khi nam châm tiến gần, vòng dây xuất hiện dòng điện cảm ứng đẩy nam châm ra (tạo cực cùng tên). Khi nam châm lùi xa, vòng dây lại hút giữ nam châm lại (tạo cực ngược tên).
                  </p>
                </div>
              </div>

              {/* Lenz SVG Diagram Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border-2 border-slate-900 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#000] flex flex-col items-center">
                  <span className="text-[10px] text-slate-600 font-mono font-black uppercase mb-3 border-b-2 border-slate-900/10 pb-2 w-full text-center">Hình 16.8. Chiều dòng điện cảm ứng theo định luật Lenz</span>
                  
                  <div className="w-full grid grid-cols-2 gap-4">
                    {/* Case A: Moving close (Opposing) */}
                    <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-900 flex flex-col items-center">
                      <span className="text-[10px] text-emerald-700 font-black mb-2 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">a) Tiến lại (Φ Tăng)</span>
                      <svg viewBox="0 0 100 110" className="w-full border border-slate-200 rounded-xl bg-white shadow-inner">
                        <rect width="100%" height="100%" fill="#ffffff" rx="2" />
                        
                        {/* Magnet sliding down */}
                        <rect x="40" y="5" width="20" height="30" fill="#dc2626" stroke="#0f172a" strokeWidth="1" rx="1" />
                        <rect x="40" y="20" width="20" height="15" fill="#2563eb" stroke="#0f172a" strokeWidth="1" rx="1" />
                        <text x="47" y="16" fill="#fff" className="text-[8px] font-black">N</text>
                        <text x="47" y="31" fill="#fff" className="text-[8px] font-black">S</text>
                        
                        {/* Velocity v vector */}
                        <line x1="30" y1="10" x2="30" y2="30" stroke="#d97706" strokeWidth="2" />
                        <polygon points="27,25 30,32 33,25" fill="#d97706" />
                        <text x="18" y="20" fill="#d97706" className="text-[7px] font-black">v</text>

                        {/* B0 field pointing downwards into the coil */}
                        <line x1="50" y1="35" x2="50" y2="60" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 1" />
                        <polygon points="48,55 50,60 52,55" fill="#dc2626" />
                        <text x="54" y="50" fill="#dc2626" className="text-[8px] font-black">B0</text>

                        {/* Loop wire representation */}
                        <ellipse cx="50" cy="75" rx="25" ry="8" fill="rgba(245, 158, 11, 0.05)" stroke="#d97706" strokeWidth="2" />
                        
                        {/* Bc field pointing UPWARDS (opposing B0 since Φ increases) */}
                        <line x1="50" y1="75" x2="50" y2="45" stroke="#059669" strokeWidth="2" />
                        <polygon points="47,52 50,44 53,52" fill="#059669" />
                        <text x="54" y="47" fill="#059669" className="text-[8px] font-black">Bc</text>

                        {/* Induced current direction indicator */}
                        <polygon points="65,77 72,75 65,73" fill="#059669" />
                        <text x="74" y="80" fill="#059669" className="text-[8px] font-mono font-black">ic</text>
                      </svg>
                      <span className="text-[9px] text-slate-700 text-center mt-2 leading-relaxed font-bold">Bc ngược chiều B0 để chống lại sự tăng Φ.</span>
                    </div>

                    {/* Case B: Moving away (Supporting) */}
                    <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-900 flex flex-col items-center">
                      <span className="text-[10px] text-rose-700 font-black mb-2 bg-rose-100 px-2 py-0.5 rounded border border-rose-300">b) Lùi xa (Φ Giảm)</span>
                      <svg viewBox="0 0 100 110" className="w-full border border-slate-200 rounded-xl bg-white shadow-inner">
                        <rect width="100%" height="100%" fill="#ffffff" rx="2" />
                        
                        {/* Magnet sliding up */}
                        <rect x="40" y="20" width="20" height="30" fill="#dc2626" stroke="#0f172a" strokeWidth="1" rx="1" />
                        <rect x="40" y="35" width="20" height="15" fill="#2563eb" stroke="#0f172a" strokeWidth="1" rx="1" />
                        <text x="47" y="31" fill="#fff" className="text-[8px] font-black">N</text>
                        <text x="47" y="46" fill="#fff" className="text-[8px] font-black">S</text>
                        
                        {/* Velocity v vector pointing upwards */}
                        <line x1="30" y1="35" x2="30" y2="15" stroke="#d97706" strokeWidth="2" />
                        <polygon points="27,20 30,13 33,20" fill="#d97706" />
                        <text x="18" y="27" fill="#d97706" className="text-[7px] font-black">v</text>

                        {/* B0 field pointing downwards */}
                        <line x1="50" y1="50" x2="50" y2="70" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 1" />
                        <polygon points="48,65 50,70 52,65" fill="#dc2626" />
                        <text x="54" y="62" fill="#dc2626" className="text-[8px] font-black">B0</text>

                        {/* Loop wire representation */}
                        <ellipse cx="50" cy="85" rx="25" ry="8" fill="rgba(245, 158, 11, 0.05)" stroke="#d97706" strokeWidth="2" />
                        
                        {/* Bc field pointing DOWNWARDS (supporting B0 since Φ decreases) */}
                        <line x1="50" y1="85" x2="50" y2="100" stroke="#059669" strokeWidth="2" />
                        <polygon points="47,95 50,101 53,95" fill="#059669" />
                        <text x="54" y="100" fill="#059669" className="text-[8px] font-black">Bc</text>

                        {/* Induced current direction indicator */}
                        <polygon points="35,83 28,85 35,87" fill="#059669" />
                        <text x="18" y="88" fill="#059669" className="text-[8px] font-mono font-black">ic</text>
                      </svg>
                      <span className="text-[9px] text-slate-700 text-center mt-2 leading-relaxed font-bold">Bc cùng chiều B0 để bổ sung cho sự giảm Φ.</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-600 text-center mt-4 leading-relaxed font-bold">
                    Trọng tâm của định luật Lenz là nguyên lí <strong className="text-slate-900">chống lại phản ứng kích thích</strong>. Hệ vật lí luôn cố gắng tự ổn định từ thông ban đầu của nó.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: ĐỊNH LUẬT FARADAY */}
        {activeSubSection === 3 && (
          <div className="space-y-6 animate-fade-in">
            <section className="space-y-3">
              <h2 className="text-xl font-black text-slate-950 flex items-center gap-2 tracking-tight">
                <span className="text-cyan-600 font-mono">IV.</span> SUẤT ĐIỆN ĐỘNG CẢM ỨNG. ĐỊNH LUẬT FARADAY
              </h2>
              <p className="text-slate-900 text-sm leading-relaxed font-bold">
                Sự xuất hiện của dòng điện cảm ứng chứng tỏ trong mạch kín tồn tại một nguồn điện. Suất điện động của nguồn điện này được gọi là <strong className="text-slate-950">suất điện động cảm ứng</strong>, kí hiệu là <strong className="text-cyan-700"><FormattedMathText text="e_c" /></strong>.
              </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                
                {/* Faraday Law Formulas Cards */}
                <div className="bg-emerald-50 border-2 border-slate-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-4">
                  <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider bg-emerald-200 border-2 border-slate-900 px-2.5 py-1 rounded-md shadow-[1.5px_1.5px_0px_0px_#000] inline-block">BIỂU THỨC ĐỊNH LUẬT FARADAY</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Single loop formula */}
                    <div className="bg-white p-5 rounded-2xl border-2 border-slate-900 flex flex-col items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                      <span className="text-[10px] text-slate-500 font-black uppercase mb-2">Mạch 1 vòng dây kín</span>
                      <div className="text-2xl font-black text-slate-950 bg-slate-50 py-4 px-6 rounded-xl border-2 border-slate-900 shadow-inner min-h-[72px] flex items-center justify-center">
                        <FormattedMathText text="e_c = - \frac{\Delta \Phi}{\Delta t}" />
                      </div>
                    </div>

                    {/* Multi-loop coil formula */}
                    <div className="bg-white p-5 rounded-2xl border-2 border-slate-900 flex flex-col items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                      <span className="text-[10px] text-slate-500 font-black uppercase mb-2">Cuộn dây N vòng dây</span>
                      <div className="text-2xl font-black text-slate-950 bg-slate-50 py-4 px-6 rounded-xl border-2 border-slate-900 shadow-inner min-h-[72px] flex items-center justify-center">
                        <FormattedMathText text="e_c = - N \frac{\Delta \Phi}{\Delta t}" />
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-800 space-y-1.5 bg-white p-3.5 rounded-xl border-2 border-slate-900 font-bold">
                    <p>● <strong className="text-slate-950"><FormattedMathText text="e_c" /></strong>: Suất điện động cảm ứng, đơn vị là <strong className="text-cyan-800">Vôn (V)</strong>.</p>
                    <p>● <strong className="text-slate-950"><FormattedMathText text="\left| \frac{\Delta \Phi}{\Delta t} \right|" /></strong>: Tốc độ biến thiên của từ thông qua mạch, đơn vị là <strong className="text-amber-700">Wb/s</strong>.</p>
                    <p>● <strong className="text-slate-950">Dấu trừ (-)</strong>: Thể hiện định luật Lenz, tự động quy định cực dương của suất điện động cảm ứng ngược hướng biến thiên từ thông.</p>
                  </div>
                </div>

                {/* Special Case: Sliding rod formula */}
                <div className="bg-amber-50 border-2 border-slate-900 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-3">
                  <h4 className="text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900/10 pb-2">
                    <Info className="h-4 w-4 text-amber-700" />
                    Đặc biệt: Thanh kim loại trượt trong từ trường (Hình 16.9)
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed font-bold">
                    Khi thanh kim loại có chiều dài <strong className="text-slate-950"><FormattedMathText text="l" /></strong> trượt đều với tốc độ <strong className="text-slate-950"><FormattedMathText text="v" /></strong> vuông góc với các đường sức của từ trường đều cảm ứng từ <strong className="text-slate-950"><FormattedMathText text="B" /></strong>, suất điện động cảm ứng sinh ra trong thanh có độ lớn cực đại:
                  </p>
                  <div className="text-center text-xl font-black text-amber-850 bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] py-4 rounded-2xl max-w-sm mx-auto">
                    <FormattedMathText text="|e_c| = B \cdot l \cdot v" />
                  </div>
                </div>
              </div>

              {/* Faraday Graphic SVG Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border-2 border-slate-900 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#000] flex flex-col items-center">
                  <span className="text-[10px] text-slate-600 font-mono font-black uppercase mb-3 border-b-2 border-slate-900/10 pb-2 w-full text-center">Hình 16.9. Thanh kim loại MN trượt trên ray kín</span>
                  
                  <svg viewBox="0 0 200 130" className="w-full max-h-[140px] border-2 border-slate-900 rounded-2xl bg-[#fafafa]">
                    <rect width="100%" height="100%" fill="#ffffff" rx="4" />
                    
                    {/* B-field uniform crosses pointing INTO screen */}
                    <text x="25" y="25" fill="#cbd5e1" className="text-[10px] font-black font-mono">×</text>
                    <text x="65" y="25" fill="#cbd5e1" className="text-[10px] font-black font-mono">×</text>
                    <text x="105" y="25" fill="#cbd5e1" className="text-[10px] font-black font-mono">×</text>
                    <text x="145" y="25" fill="#cbd5e1" className="text-[10px] font-black font-mono">×</text>

                    <text x="25" y="65" fill="#cbd5e1" className="text-[10px] font-black font-mono">×</text>
                    <text x="65" y="65" fill="#cbd5e1" className="text-[10px] font-black font-mono">×</text>
                    <text x="105" y="65" fill="#cbd5e1" className="text-[10px] font-black font-mono">×</text>
                    <text x="145" y="65" fill="#cbd5e1" className="text-[10px] font-black font-mono">×</text>

                    <text x="25" y="105" fill="#cbd5e1" className="text-[10px] font-black font-mono">×</text>
                    <text x="65" y="105" fill="#cbd5e1" className="text-[10px] font-black font-mono">×</text>
                    <text x="105" y="105" fill="#cbd5e1" className="text-[10px] font-black font-mono">×</text>
                    <text x="145" y="105" fill="#cbd5e1" className="text-[10px] font-black font-mono">×</text>

                    <text x="135" y="20" fill="#94a3b8" className="text-[7.5px] font-mono font-black">B (hướng vào trong)</text>

                    {/* Parallel conducting rails */}
                    <line x1="30" y1="40" x2="180" y2="40" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="30" y1="90" x2="180" y2="90" stroke="#64748b" strokeWidth="2.5" />
                    
                    {/* Left-side connecting wire with Galvanometer/Amperemeter */}
                    <line x1="30" y1="40" x2="30" y2="90" stroke="#64748b" strokeWidth="2" />
                    <circle cx="30" cy="65" r="10" fill="#f1f5f9" stroke="#0f172a" strokeWidth="1.5" />
                    <text x="25" y="70" fill="#2563eb" className="text-[12px] font-black font-mono">A</text>

                    {/* Sliding Rod MN */}
                    <line x1="120" y1="30" x2="120" y2="100" stroke="#dc2626" strokeWidth="4.5" />
                    <text x="116" y="22" fill="#dc2626" className="text-[10px] font-black font-mono">M (+)</text>
                    <text x="117" y="112" fill="#dc2626" className="text-[10px] font-black font-mono">N (-)</text>
                    
                    {/* Sliding speed v arrow pointing left */}
                    <line x1="120" y1="65" x2="85" y2="65" stroke="#d97706" strokeWidth="2.5" />
                    <polygon points="88,61 80,65 88,69" fill="#d97706" />
                    <text x="92" y="58" fill="#d97706" className="text-[9px] font-black font-mono">v</text>

                    {/* Current flow ic direction indicator */}
                    <polygon points="60,37 68,40 60,43" fill="#059669" />
                    <polygon points="68,93 60,90 68,87" fill="#059669" />
                    <text x="61" y="51" fill="#059669" className="text-[9px] font-black font-mono">ic</text>
                  </svg>

                  <span className="text-[9.5px] text-slate-700 font-bold text-center mt-3">MN trượt làm biến thiên diện tích S và sinh suất điện động <FormattedMathText text="|e_c| = B \cdot l \cdot v" /></span>
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed text-center font-bold">
                  Mô hình thanh trượt biểu diễn trực quan định luật Faraday: Tốc độ trượt <strong className="text-slate-950">v</strong> càng nhanh, suất điện động cảm ứng và dòng điện thu được càng lớn.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: EM CÓ BIẾT (NAM CHÂM RƠI) */}
        {activeSubSection === 4 && (
          <div className="space-y-6 animate-fade-in">
            <section className="space-y-3">
              <h2 className="text-xl font-black text-slate-950 flex items-center gap-2 tracking-tight">
                <span className="text-cyan-600 font-mono">V.</span> THÍ NGHIỆM THỰC TẾ: NAM CHÂM RƠI QUA ỐNG DÂY
              </h2>
              <p className="text-slate-900 text-sm leading-relaxed font-bold">
                Thí nghiệm thả một thanh nam châm vĩnh cửu rơi tự do thẳng đứng đi xuyên qua một ống dây dẫn kín (Hình 16.10) nối với cảm biến hiệu điện thế. Nhận được các đồ thị suất điện động cực kì lý thú và mang tính giáo khoa sâu sắc.
              </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                
                {/* Physical explanation of the dual-peak curve */}
                <div className="bg-sky-50 border-2 border-slate-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-4">
                  <h4 className="text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900/10 pb-2">
                    <Sparkles className="h-4 w-4 text-sky-700" />
                    Phân tích hình dạng đồ thị suất điện động (Hình 16.11):
                  </h4>
                  
                  <div className="space-y-3 text-xs font-bold text-slate-800 leading-relaxed">
                    <p>
                      <strong className="text-amber-800 font-extrabold">1. Đỉnh thứ nhất (Nam châm đi vào cuộn dây):</strong> Khi nam châm tiến lại gần đầu trên của ống dây, từ thông tăng mạnh làm xuất hiện một xung suất điện động. Biên độ đỉnh này tương đối thấp và thoải hơn vì vận tốc ban đầu của nam châm khi bắt đầu rơi chưa lớn.
                    </p>
                    <p>
                      <strong className="text-purple-800 font-extrabold">2. Điểm triệt tiêu (Nam châm ở giữa cuộn dây):</strong> Khi trọng tâm nam châm trùng với trung điểm cuộn dây, từ thông qua cuộn đạt giá trị cực đại và tốc độ biến thiên tạm thời bằng không. Đồ thị đi qua điểm vạch số 0 (e_c = 0).
                    </p>
                    <p>
                      <strong className="text-red-850 font-extrabold">3. Đỉnh thứ hai (Nam châm đi ra khỏi cuộn dây):</strong> Khi nam châm thoát ra khỏi đầu dưới, từ thông giảm mạnh sinh ra suất điện động ngược chiều hoàn toàn so với lúc vào, tạo thành một đỉnh xung đối xứng ngược hướng.
                    </p>

                    <div className="bg-emerald-50 border-2 border-slate-900 p-4 rounded-2xl text-xs font-bold text-slate-900 shadow-[2px_2px_0px_0px_#000]">
                      <strong className="text-emerald-950">⭐ Điểm cốt lõi: Tại sao đỉnh thứ hai lại cao hơn và hẹp hơn?</strong>
                      <p className="text-slate-800 mt-2 font-semibold">
                        Do tác dụng của gia tốc rơi tự do g, vận tốc của nam châm lúc đi ra khỏi ống dây <strong className="text-slate-950">lớn hơn nhiều</strong> so với lúc đi vào. Vận tốc lớn làm thời gian biến thiên Δt ngắn đi (bề rộng hẹp hơn) và tốc độ biến thiên từ thông |ΔΦ / Δt| lớn hơn, dẫn đến biên độ suất điện động cảm ứng thu được cao hơn rõ rệt.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Energy conservation note */}
                <div className="bg-amber-50 border-2 border-slate-900 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-2 text-xs font-bold text-slate-800">
                  <span className="font-black text-slate-950 uppercase font-mono text-[10px] bg-amber-200 border-2 border-slate-900 px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000] inline-block mb-1">ĐỊNH LUẬT BẢO TOÀN NĂNG LƯỢNG</span>
                  <p className="leading-relaxed">
                    Quá trình thả rơi này chứng minh công của trọng lực tác dụng lên nam châm đã biến đổi một phần thành cơ năng chống lực cản điện từ, rồi sinh ra điện năng trong cuộn dây. Cơ năng đã chuyển hóa thành điện năng hoàn toàn tuân thủ định luật bảo toàn và chuyển hóa năng lượng.
                  </p>
                </div>
              </div>

              {/* Graphs SVG Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border-2 border-slate-900 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#000] flex flex-col items-center">
                  <span className="text-[10px] text-slate-600 font-mono font-black uppercase mb-3 border-b-2 border-slate-900/10 pb-2 w-full text-center">Hình 16.11. Đồ thị e_c khi thả rơi nam châm</span>
                  
                  {/* Graph of N-pole dropping first */}
                  <svg viewBox="0 0 200 130" className="w-full max-h-[140px] border-2 border-slate-900 rounded-2xl bg-[#fafafa]">
                    <rect width="100%" height="100%" fill="#ffffff" rx="4" />
                    
                    {/* Grid lines */}
                    <line x1="20" y1="65" x2="190" y2="65" stroke="#cbd5e1" strokeWidth="1.5" /> {/* Time axis */}
                    <line x1="100" y1="15" x2="100" y2="115" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" /> {/* Zero time center */}
                    
                    {/* Labels */}
                    <text x="175" y="77" fill="#64748b" className="text-[8px] font-mono font-black">t (ms)</text>
                    <text x="105" y="20" fill="#64748b" className="text-[8px] font-mono font-black">e (V)</text>
                    <text x="105" y="60" fill="#64748b" className="text-[8px] font-mono font-black">0</text>
                    
                    <text x="25" y="112" fill="#dc2626" className="text-[8px] font-black">Lúc đi vào cuộn dây</text>
                    <text x="110" y="112" fill="#2563eb" className="text-[8px] font-black">Lúc đi thoát ra ngoài</text>

                    {/* Dual Peak Curve: Entry is positive, exit is negative */}
                    <path 
                      d="M 50,65 Q 65,65 72,40 T 100,65 Q 108,65 113,105 T 140,65 L 180,65" 
                      fill="none" 
                      stroke="#059669" 
                      strokeWidth="2.5" 
                    />

                    {/* Highlight indicators */}
                    <circle cx="78" cy="41" r="3.5" fill="#dc2626" stroke="#0f172a" strokeWidth="1" />
                    <text x="68" y="32" fill="#dc2626" className="text-[8.5px] font-black font-mono">+1.2V</text>

                    <circle cx="114" cy="104" r="3.5" fill="#2563eb" stroke="#0f172a" strokeWidth="1" />
                    <text x="115" y="118" fill="#2563eb" className="text-[8.5px] font-black font-mono">-1.6V (Đỉnh hẹp, cao hơn)</text>
                  </svg>

                  <div className="w-full mt-4 p-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-[10px] text-slate-800 text-center font-bold leading-relaxed shadow-[1.5px_1.5px_0px_0px_#000]">
                    Tại thời điểm ra, đồ thị dốc đứng hơn hẳn, thể hiện vận tốc rơi v của nam châm đã tăng nhanh do tác dụng của lực hấp dẫn Trái Đất.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* AI Assistant Chat Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-slate-100 border-4 border-slate-900 p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] space-y-4 relative overflow-hidden">
        
        {/* Absolute top glow design accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-300 rounded-full blur-3xl opacity-20 pointer-events-none" />
        
        <div className="flex justify-between items-center pb-3 border-b-2 border-slate-900/10 relative z-10">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-600 text-white border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-yellow-300" />
            </span>
            <div>
              <h3 className="text-sm font-black text-slate-950 uppercase tracking-tight">AI TRỢ GIẢNG VẬT LÍ 12</h3>
              <p className="text-[10px] text-slate-600 font-bold">Giải đáp học tập Bài 16 chuyên sâu</p>
            </div>
          </div>
          <button
            onClick={() => setMessages([
              {
                role: "model",
                content: "Thầy/Cô đã đặt lại hộp thoại. Thầy/Cô rất vui lòng được hỗ trợ các em giải đáp mọi thắc mắc liên quan đến Bài 16 và môn Vật lí!"
              }
            ])}
            className="p-1.5 hover:bg-indigo-50 border-2 border-slate-900 text-slate-950 rounded-xl transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center"
            title="Đặt lại trò chuyện"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Chat view window */}
        <div className="relative z-10 h-80 overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-900 custom-scrollbar shadow-inner">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] ${
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
              <div className="bg-white border-2 border-slate-900 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-400 flex items-center gap-2 shadow-[2px_2px_0px_0px_#0f172a]">
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
            "Từ thông qua diện tích S được xác định theo công thức nào?",
            "Hiện tượng cảm ứng điện từ xuất hiện khi nào?",
            "Cách xác định chiều dòng điện cảm ứng theo Định luật Lenz?",
            "Suất điện động cảm ứng được đo theo Định luật Faraday ra sao?"
          ].map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(promptText)}
              disabled={isTyping}
              className="text-[10px] bg-white hover:bg-indigo-50 border-2 border-slate-900 text-slate-900 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer font-black disabled:opacity-50"
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
            placeholder="Đặt câu hỏi về Bài 16 và môn Vật lí..."
            className="flex-1 text-xs font-black bg-white border-2 border-slate-900 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isTyping || !inputMessage.trim()}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 border-2 border-slate-900 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-[3px_3px_0px_0px_#000] active:translate-y-[1px] active:shadow-[1.5px_1.5px_0px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
