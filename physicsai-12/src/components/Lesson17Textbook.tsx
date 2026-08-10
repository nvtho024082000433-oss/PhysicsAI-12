import { useState, useEffect, useRef } from "react";
import { BookOpen, Sparkles, Brain, CheckCircle2, Zap, Compass, ShieldAlert, ArrowRight, Info, RefreshCw, AlertCircle, Send } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson17Textbook() {
  const [activeSubSection, setActiveSubSection] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(0); // Angle of rotating loop in Section 1
  const [isAnimating, setIsAnimating] = useState<boolean>(true); // Auto rotation
  const [rmsVoltageInput, setRmsVoltageInput] = useState<string>("220"); // Interactive calculator

  // Auto rotate the loop for interactive SVG in Section 1 and 4
  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const sections = [
    {
      title: "I. Nguyên tắc tạo dòng điện xoay chiều",
      subtitle: "Nguyên lí từ thông biến thiên điều hòa và hiện tượng cảm ứng điện từ",
    },
    {
      title: "II. Dòng điện xoay chiều & Giá trị hiệu dụng",
      subtitle: "Các biểu thức tức thời u, i và ý nghĩa vật lý của giá trị hiệu dụng",
    },
    {
      title: "III. Cấu tạo máy phát điện xoay chiều 1 pha",
      subtitle: "Hai kiểu thiết kế: Rôto cuộn dây (Vành khuyên & Chổi quét) và Rôto nam châm",
    },
    {
      title: "IV. Máy phát điện xoay chiều 3 pha & An toàn",
      subtitle: "Hệ thống điện 3 pha đối xứng lệch pha 2π/3 và các quy tắc sử dụng điện an toàn",
    }
  ];

  // Section 1: Calculate physical values based on rotationAngle
  const thetaRad = (rotationAngle * Math.PI) / 180;
  const maxFlux = 0.05; // Weber
  const maxEmf = 15.7; // Volts (50Hz-like)
  const currentFlux = maxFlux * Math.cos(thetaRad);
  const currentEmf = maxEmf * Math.sin(thetaRad); // e = E0*sin(wt) or E0*cos(wt - pi/2)

  // Calculations for RMS calculator
  const uRmsVal = parseFloat(rmsVoltageInput) || 0;
  const uPeakVal = (uRmsVal * Math.sqrt(2)).toFixed(1);
  const heatRatio = "100%"; // heat dissipation comparison

  // AI Assistant State
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Thầy/Cô chào các em! Thầy/Cô là Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 17: Máy phát điện xoay chiều. Các em có thắc mắc gì cần Thầy/Cô giải đáp về nguyên tắc tạo dòng điện xoay chiều, giá trị hiệu dụng, cấu tạo máy phát điện 1 pha, 3 pha hay các quy tắc an toàn điện không?"
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
          mode: "lesson17"
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

  return (
    <div className="space-y-8 text-slate-900 font-sans max-w-4xl mx-auto py-4 animate-fade-in" id="lesson17-textbook">
      
      {/* Textbook Header Badge */}
      <div className="border-b-2 border-slate-850 pb-6 space-y-5">
        <div className="w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 border-2 border-slate-800 text-cyan-950 text-xs font-black tracking-wide uppercase mb-3 shadow-[2px_2px_0px_#1e293b]">
            <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "12s" }} /> CHƯƠNG III: TỪ TRƯỜNG
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-snug w-full block uppercase">
            BÀI 17: MÁY PHÁT ĐIỆN XOAY CHIỀU
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 mt-1.5 leading-normal font-bold w-full block">
            Khám phá nền tảng lý thuyết của nguồn năng lượng xoay chiều: nguyên lí từ thông biến thiên điều hòa, ý nghĩa thực tiễn của giá trị hiệu dụng và kiến trúc thiết kế của máy phát điện 1 pha, 3 pha công nghiệp.
          </p>
        </div>

        {/* Textbook Navigation Subtabs */}
        <div className="flex flex-wrap bg-slate-100 p-2 rounded-2xl border-2 border-slate-800 gap-2 select-none w-full shadow-[4px_4px_0px_0px_#1e293b]">
          {sections.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSubSection(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer border-2 border-slate-800 ${
                activeSubSection === idx
                  ? "bg-cyan-300 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
                  : "bg-white hover:bg-slate-50 text-slate-700 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#1e293b]"
              }`}
            >
              Phần {idx + 1}: {idx === 0 ? "Nguyên tắc AC" : idx === 1 ? "Giá trị hiệu dụng" : idx === 2 ? "Máy 1 pha" : "Máy 3 pha & An toàn"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border-2 border-slate-800 shadow-[6px_6px_0px_0px_#1e293b] rounded-3xl p-6 space-y-8">
        
        {/* SECTION 1: NGUYÊN TẮC TẠO DÒNG ĐIỆN XOAY CHIỀU */}
        {activeSubSection === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              
              {/* Intro Card */}
              <div className="space-y-3 bg-cyan-50/70 p-5 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b]">
                <span className="inline-block text-[10px] bg-cyan-100 text-cyan-950 border-2 border-slate-800 px-3 py-1 rounded-lg font-mono font-black uppercase">
                  Nguyên lý nền tảng
                </span>
                <h3 className="text-lg font-black text-slate-950">{sections[0].title}</h3>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Để tạo ra dòng điện xoay chiều hình sin, người ta quay đều một khung dây dẫn phẳng dẹt <strong className="text-slate-950">MNPQ</strong> gồm <strong className="text-slate-950"><FormattedMathText text="N" /></strong> vòng dây, có tổng diện tích <strong className="text-slate-950"><FormattedMathText text="S" /></strong>, trong một từ trường đều <strong className="text-cyan-900 font-black"><FormattedMathText text="B" /></strong> với tốc độ góc <strong className="text-cyan-900 font-black"><FormattedMathText text="\omega" /></strong> không đổi. Trục quay <strong className="text-slate-950"><FormattedMathText text="OO'" /></strong> nằm trong mặt phẳng khung dây và vuông góc với các đường cảm ứng từ.
                </p>
              </div>

              {/* Step by step physics derivation */}
              <div className="bg-slate-50 border-2 border-slate-800 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <h4 className="text-sm font-black text-cyan-950 uppercase tracking-wide flex items-center gap-2">
                  <span className="p-1.5 bg-cyan-100 text-cyan-950 border-2 border-slate-800 rounded-xl"><BookOpen className="h-4 w-4" /></span>
                  1. Biểu thức từ thông biến thiên (<FormattedMathText text="\Phi" />)
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
                  Tại thời điểm <strong className="text-slate-950"><FormattedMathText text="t" /></strong>, pháp tuyến <strong className="text-emerald-700"><FormattedMathText text="n" /></strong> của khung dây hợp với vectơ cảm ứng từ <strong className="text-cyan-800"><FormattedMathText text="B" /></strong> một góc: <span className="bg-white px-2.5 py-1 rounded-lg border-2 border-slate-800 text-amber-950 inline-block my-1"><FormattedMathText text="\alpha = \omega t + \phi_0" /></span>.
                  <br />Từ thông xuyên qua cả khung dây dẫn gồm <strong className="text-slate-950"><FormattedMathText text="N" /></strong> vòng dây là:
                </p>
                <div className="bg-amber-50 border-2 border-slate-800 shadow-inner px-4 py-4 rounded-2xl text-center text-sm sm:text-base text-slate-950 flex justify-center items-center">
                  <FormattedMathText text="\Phi = N \cdot B \cdot S \cdot \cos(\omega t + \phi_0)" />
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-bold">
                  Từ thông đạt giá trị cực đại khi mặt khung dây vuông góc với đường sức từ: <strong className="text-slate-950"><FormattedMathText text="\Phi_0 = N \cdot B \cdot S" /></strong>.
                </p>
              </div>

              <div className="bg-purple-50/20 border-2 border-slate-800 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <h4 className="text-sm font-black text-cyan-950 uppercase tracking-wide flex items-center gap-2">
                  <span className="p-1.5 bg-cyan-100 text-cyan-950 border-2 border-slate-800 rounded-xl"><Zap className="h-4 w-4" /></span>
                  2. Suất điện động cảm ứng (<FormattedMathText text="e" />)
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
                  Theo định luật Faraday, suất điện động cảm ứng tức thời xuất hiện trong cuộn dây là đạo hàm âm của từ thông theo thời gian:
                </p>
                <div className="bg-amber-50 border-2 border-slate-800 shadow-inner px-4 py-4 rounded-2xl text-center text-xs sm:text-sm text-slate-950 flex justify-center items-center">
                  <FormattedMathText text="e = -\frac{d\Phi}{dt} = N \cdot B \cdot S \cdot \omega \cdot \sin(\omega t + \phi_0) = E_0 \cdot \cos\left(\omega t + \phi_0 - \frac{\pi}{2}\right)" />
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
                  Biên độ cực đại của suất điện động cảm ứng tỉ lệ thuận với số vòng dây, cảm ứng từ, diện tích và vận tốc góc quay:
                </p>
                <div className="bg-cyan-100 border-2 border-slate-800 p-3.5 rounded-2xl text-center text-xs sm:text-sm text-cyan-950 flex justify-center items-center gap-1.5">
                  ⚡ <FormattedMathText text="E_0 = N \cdot B \cdot S \cdot \omega" />
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
                  💡 <strong>Ý nghĩa góc pha:</strong> Suất điện động cảm ứng xoay chiều biến thiên điều hòa cùng tần số với từ thông nhưng <strong className="text-amber-950 font-black bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">trễ pha hơn từ thông một góc <FormattedMathText text="\frac{\pi}{2}" /> (90°)</strong>.
                </p>
              </div>
            </div>

            {/* Interactive SVG Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-800 shadow-[4px_4px_0px_0px_#1e293b] flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-3">
                  <span className="text-[10px] text-slate-700 font-mono uppercase font-black">Hình 17.1: Khung dây quay trong từ trường</span>
                  <button 
                    onClick={() => setIsAnimating(!isAnimating)}
                    className="text-[10px] bg-cyan-200 hover:bg-cyan-300 px-2.5 py-1.5 rounded-lg text-slate-950 border-2 border-slate-800 shadow-[2px_2px_0px_0px_#000] font-mono font-black cursor-pointer"
                  >
                    {isAnimating ? "⏹ DỪNG" : "▶ CHẠY"}
                  </button>
                </div>

                {/* Main Interactive Rotating Frame SVG */}
                <div className="w-full bg-white rounded-xl p-2 border-2 border-slate-800 shadow-inner">
                  <svg viewBox="0 0 240 180" className="w-full h-auto">
                    <rect width="100%" height="100%" fill="#ffffff" />
                    
                    {/* Magnets */}
                    {/* North Pole (Red) */}
                    <path d="M 10 30 L 55 30 L 55 150 L 10 150 Z" fill="#ef4444" opacity="0.9" stroke="#991b1b" strokeWidth="2" />
                    <text x="25" y="95" fill="#ffffff" className="text-lg font-black font-mono">N</text>
                    
                    {/* South Pole (Blue) */}
                    <path d="M 185 30 L 230 30 L 230 150 L 185 150 Z" fill="#3b82f6" opacity="0.9" stroke="#1e3a8a" strokeWidth="2" />
                    <text x="200" y="95" fill="#ffffff" className="text-lg font-black font-mono">S</text>
                    
                    {/* Magnetic Field Vector Lines */}
                    <line x1="55" y1="50" x2="185" y2="50" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    <line x1="55" y1="90" x2="185" y2="90" stroke="#0ea5e9" strokeWidth="1.5" />
                    <polygon points="120,87 128,90 120,93" fill="#0ea5e9" />
                    <line x1="55" y1="130" x2="185" y2="130" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    
                    {/* Rotation Axis OO' */}
                    <line x1="120" y1="15" x2="120" y2="165" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="123" y="23" fill="#475569" className="text-[10px] font-bold font-mono">O</text>
                    <text x="123" y="163" fill="#475569" className="text-[10px] font-bold font-mono">O'</text>

                    {/* Rotating wire loop projected */}
                    {(() => {
                      const cosW = Math.cos(thetaRad);
                      const sinW = Math.sin(thetaRad);
                      const halfWidth = 40;
                      const hStart = 50;
                      const hEnd = 130;
                      const lx1 = 120 - halfWidth * cosW;
                      const rx1 = 120 + halfWidth * cosW;
                      // Perspective Y shift
                      const lyShift = 10 * sinW;
                      const ryShift = -10 * sinW;

                      return (
                        <g>
                          {/* Red coil side M-N */}
                          <line x1={lx1} y1={hStart + lyShift} x2={lx1} y2={hEnd + lyShift} stroke="#ef4444" strokeWidth="3" />
                          
                          {/* Blue coil side P-Q */}
                          <line x1={rx1} y1={hStart + ryShift} x2={rx1} y2={hEnd + ryShift} stroke="#3b82f6" strokeWidth="3" />
                          
                          {/* Connecting top M-Q */}
                          <line x1={lx1} y1={hStart + lyShift} x2={rx1} y2={hStart + ryShift} stroke="#b91c1c" strokeWidth="2" />
                          
                          {/* Connecting bottom N-P */}
                          <line x1={lx1} y1={hEnd + lyShift} x2={rx1} y2={hEnd + ryShift} stroke="#1d4ed8" strokeWidth="2" />

                          {/* Labels */}
                          <text x={lx1 - 12} y={hStart + lyShift - 2} fill="#ef4444" className="text-[10px] font-black">M</text>
                          <text x={lx1 - 12} y={hEnd + lyShift + 8} fill="#ef4444" className="text-[10px] font-black">N</text>
                          <text x={rx1 + 4} y={hEnd + ryShift + 8} fill="#3b82f6" className="text-[10px] font-black">P</text>
                          <text x={rx1 + 4} y={hStart + ryShift - 2} fill="#3b82f6" className="text-[10px] font-black">Q</text>

                          {/* Arrow showing rotation direction on top */}
                          <path d={`M 120 18 A 20 10 0 0 1 ${120 + 15 * cosW} ${18 + 5 * sinW}`} fill="none" stroke="#d97706" strokeWidth="1.5" />
                          <polygon points={`${120 + 17 * cosW},${18 + 5 * sinW - 2} ${120 + 19 * cosW},${18 + 5 * sinW + 2} ${120 + 13 * cosW},${18 + 5 * sinW + 1}`} fill="#d97706" />
                          <text x="135" y="16" fill="#d97706" className="text-[10px] font-black">ω</text>
                        </g>
                      );
                    })()}

                    <text x="60" y="44" fill="#0284c7" className="text-[9px] font-bold font-mono">Vectơ B</text>
                  </svg>
                </div>

                {/* Values Readout underneath */}
                <div className="w-full mt-3 grid grid-cols-3 gap-2 bg-white p-3 rounded-xl border-2 border-slate-800 text-[10px] sm:text-xs font-mono font-black text-slate-950">
                  <div className="text-center">
                    <span className="text-slate-500 block uppercase text-[8px] font-bold">Góc quay θ</span>
                    <strong className="text-amber-800 block mt-0.5">{rotationAngle}°</strong>
                  </div>
                  <div className="text-center border-x-2 border-slate-200">
                    <span className="text-slate-500 block uppercase text-[8px] font-bold">Từ thông Φ</span>
                    <strong className="text-emerald-800 block mt-0.5">{currentFlux.toFixed(4)} Wb</strong>
                  </div>
                  <div className="text-center">
                    <span className="text-slate-500 block uppercase text-[8px] font-bold">Suất điện đ. e</span>
                    <strong className="text-rose-800 block mt-0.5">{currentEmf.toFixed(1)} V</strong>
                  </div>
                </div>

                {/* Manual angle control slider */}
                <div className="w-full mt-4 space-y-2">
                  <div className="flex justify-between text-[9px] text-slate-600 font-extrabold font-mono">
                    <span>θ = 0° (Φ Max)</span>
                    <span>θ = 90° (Φ = 0)</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="360"
                    value={rotationAngle}
                    onChange={(e) => {
                      setIsAnimating(false);
                      setRotationAngle(parseInt(e.target.value));
                    }}
                    className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer border-2 border-slate-800"
                  />
                  <div className="text-center text-[10px] text-cyan-900 font-extrabold bg-cyan-100 border border-cyan-200 p-2 rounded-xl">
                    💡 Kéo thanh trượt để di chuyển chậm khung dây và theo dõi sự lệch pha của Φ và e!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: BIỂU THỨC DÒNG ĐIỆN XOAY CHIỀU & GIÁ TRỊ HIỆU DỤNG */}
        {activeSubSection === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              
              {/* Intro Card */}
              <div className="space-y-3 bg-cyan-50/70 p-5 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b]">
                <span className="inline-block text-[10px] bg-cyan-100 text-cyan-950 border-2 border-slate-800 px-3 py-1 rounded-lg font-mono font-black uppercase">
                  Thông số dòng điện xoay chiều
                </span>
                <h3 className="text-lg font-black text-slate-950">{sections[1].title}</h3>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Khi nối hai đầu khung dây quay dẹt với một đoạn mạch tiêu thụ điện thành một mạch kín, thì điện áp tức thời và cường độ dòng điện trong mạch biến thiên điều hòa theo dạng hình sin (cosin).
                </p>
              </div>

              {/* Instantaneous Equations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-emerald-50 border-2 border-slate-800 shadow-[3px_3px_0px_0px_#1e293b] p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] text-emerald-950 font-black font-mono uppercase tracking-wider block">Biểu thức Điện áp tức thời (u)</span>
                  <div className="text-sm sm:text-base text-slate-950 bg-white py-2.5 px-3 rounded-xl border-2 border-slate-800 text-center shadow-inner flex justify-center items-center">
                    <FormattedMathText text="u = U_0 \cdot \cos(\omega t + \phi_u)\text{ (V)}" />
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-bold">
                    Trong đó: <strong className="text-slate-950"><FormattedMathText text="u" /></strong> là giá trị tức thời; <strong className="text-slate-950"><FormattedMathText text="U_0" /></strong> là cực đại; <strong className="text-slate-950"><FormattedMathText text="\omega" /></strong> là tần số góc; <strong className="text-slate-950"><FormattedMathText text="\phi_u" /></strong> là pha ban đầu.
                  </p>
                </div>

                <div className="bg-emerald-50 border-2 border-slate-800 shadow-[3px_3px_0px_0px_#1e293b] p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] text-emerald-950 font-black font-mono uppercase tracking-wider block">Biểu thức Cường độ dòng điện (i)</span>
                  <div className="text-sm sm:text-base text-slate-950 bg-white py-2.5 px-3 rounded-xl border-2 border-slate-800 text-center shadow-inner flex justify-center items-center">
                    <FormattedMathText text="i = I_0 \cdot \cos(\omega t + \phi_i)\text{ (A)}" />
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-bold">
                    Trong đó: <strong className="text-slate-950"><FormattedMathText text="i" /></strong> là tức thời; <strong className="text-slate-950"><FormattedMathText text="I_0" /></strong> là biên độ cực đại; <strong className="text-slate-950"><FormattedMathText text="\phi_i" /></strong> là pha ban đầu của dòng điện.
                  </p>
                </div>
              </div>

              <div className="space-y-3 bg-slate-50 border-2 border-slate-800 p-4 rounded-2xl shadow-[3px_3px_0px_0px_#1e293b]">
                <h4 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wide flex items-center gap-1.5">
                  Độ lệch pha giữa điện áp và dòng điện (<FormattedMathText text="\Delta\phi" />)
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
                  Đại lượng <span className="bg-white border-2 border-slate-800 px-2 py-0.5 rounded text-amber-900 font-mono font-black"><FormattedMathText text="\Delta\phi = \phi_u - \phi_i" /></span> được gọi là độ lệch pha của điện áp so với dòng điện.
                  <br />- Nếu <strong className="text-slate-950 font-black"><FormattedMathText text="\Delta\phi > 0" /></strong>: điện áp sớm pha hơn dòng điện.
                  <br />- Nếu <strong className="text-slate-950 font-black"><FormattedMathText text="\Delta\phi < 0" /></strong>: điện áp trễ pha hơn dòng điện.
                  <br />- Nếu <strong className="text-slate-950 font-black"><FormattedMathText text="\Delta\phi = 0" /></strong>: điện áp và dòng điện cùng pha (mạch chỉ có điện trở thuần <FormattedMathText text="R" />).
                </p>
              </div>

              <div className="bg-indigo-50 border-2 border-slate-800 p-5 rounded-2xl space-y-3 shadow-[3px_3px_0px_0px_#1e293b]">
                <h4 className="text-sm font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="p-1.5 bg-indigo-100 text-indigo-950 border-2 border-slate-800 rounded-xl"><Zap className="h-4 w-4" /></span> Định nghĩa giá trị hiệu dụng (RMS)
                </h4>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Dòng điện xoay chiều có cường độ biến thiên liên tục, tuy nhiên nó vẫn có tác dụng tỏa nhiệt tương đương một dòng điện một chiều không đổi. Để tính toán công suất tiêu thụ điện, người ta sử dụng <strong className="text-indigo-950 font-black">giá trị hiệu dụng</strong>:
                </p>
                
                {/* Math values */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white p-3.5 rounded-xl border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b]">
                    <span className="text-[9px] text-slate-500 uppercase block font-bold font-mono">Dòng điện hiệu dụng (I)</span>
                    <strong className="text-base text-slate-950 block mt-1 flex justify-center"><FormattedMathText text="I = \frac{I_0}{\sqrt{2}}" /></strong>
                  </div>
                  <div className="text-center bg-white p-3.5 rounded-xl border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b]">
                    <span className="text-[9px] text-slate-500 uppercase block font-bold font-mono">Điện áp hiệu dụng (U)</span>
                    <strong className="text-base text-slate-950 block mt-1 flex justify-center"><FormattedMathText text="U = \frac{U_0}{\sqrt{2}}" /></strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-700 italic font-bold leading-normal">
                  *Ý nghĩa: Khi cho dòng điện xoay chiều chạy qua điện trở <FormattedMathText text="R" />, nhiệt lượng tỏa ra <FormattedMathText text="Q = I^2 \cdot R \cdot t" /> hoàn toàn bằng nhiệt lượng tỏa ra khi chạy dòng điện không đổi <FormattedMathText text="I" /> qua <FormattedMathText text="R" /> trong cùng thời gian <FormattedMathText text="t" />.
                </p>
              </div>
            </div>

            {/* Interactive Calculator Block */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-amber-50 border-2 border-slate-800 p-5 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <div className="flex items-center gap-2 text-amber-950">
                  <span className="p-1.5 bg-amber-150 border-2 border-slate-800 rounded-xl"><Brain className="h-4 w-4" /></span>
                  <span className="text-xs font-black uppercase tracking-wider">Tính toán hiệu dụng</span>
                </div>
                
                <p className="text-xs text-slate-800 leading-relaxed font-bold">
                  Nhập điện áp hiệu dụng <strong className="text-slate-950">U (V)</strong> để tính toán biên độ cực đại <strong className="text-slate-950">U₀ (V)</strong> cần thiết cho thiết kế cách điện!
                </p>

                <div className="space-y-2">
                  <label className="text-[10px] text-slate-700 font-extrabold block uppercase font-mono">Nhập điện áp hiệu dụng U (Vôn):</label>
                  <div className="flex gap-2">
                    <input 
                      type="number"
                      value={rmsVoltageInput}
                      onChange={(e) => setRmsVoltageInput(e.target.value)}
                      placeholder="Ví dụ: 220"
                      className="bg-white text-slate-950 font-mono text-sm px-3 py-2 rounded-xl border-2 border-slate-800 focus:outline-none w-full shadow-inner"
                    />
                    <button 
                      onClick={() => setRmsVoltageInput("220")}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-950 px-3 py-1 rounded-xl font-mono text-xs font-black border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b] cursor-pointer"
                    >
                      MẶC ĐỊNH
                    </button>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border-2 border-slate-800 space-y-2 text-xs font-bold text-slate-950 shadow-inner">
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-600">Điện áp hiệu dụng (U):</span>
                    <strong className="text-emerald-800 font-mono text-sm">{uRmsVal} V</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-600">Biên độ đỉnh (U₀ = U·√2):</span>
                    <strong className="text-amber-900 font-mono text-sm">{uPeakVal} V</strong>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-600">Tỉ lệ tỏa nhiệt:</span>
                    <strong className="text-cyan-800 font-mono">{heatRatio}</strong>
                  </div>
                </div>

                {/* Practical info banner */}
                <div className="bg-white p-3.5 rounded-xl border-2 border-slate-800 text-[11px] text-slate-800 leading-relaxed font-bold">
                  📌 <strong>Mẹo thực tế:</strong> Lưới điện Việt Nam có điện áp hiệu dụng <strong className="text-slate-950">220 V</strong>, tương đương giá trị cực đại lên tới <strong className="text-amber-850 font-black bg-amber-100 px-1 py-0.5 rounded">~311,1 V</strong> (220 x √2). Các tụ điện và lớp cách điện phải chịu đựng được giá trị tức thời tối đa này để không bị nổ/đánh thủng!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: CẤU TẠO MÁY PHÁT ĐIỆN XOAY CHIỀU 1 PHA */}
        {activeSubSection === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-6">
              
              {/* Intro Card */}
              <div className="space-y-3 bg-cyan-50/70 p-5 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b]">
                <span className="inline-block text-[10px] bg-cyan-100 text-cyan-950 border-2 border-slate-800 px-3 py-1 rounded-lg font-mono font-black uppercase">
                  Kiến trúc cơ khí máy phát
                </span>
                <h3 className="text-lg font-black text-slate-950">{sections[2].title}</h3>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Tất cả các máy phát điện một pha gồm hai phần cơ bản: <strong className="text-slate-950">Phần cảm</strong> (tạo ra từ trường) và <strong className="text-slate-950">Phần ứng</strong> (nơi xuất hiện suất điện động cảm ứng). Một trong hai phần được đặt cố định (<strong className="text-cyan-800">stato</strong>), phần còn lại quay quanh trục (<strong className="text-cyan-800">rôto</strong>).
                </p>
              </div>

              {/* Table design comparison */}
              <div className="bg-amber-50 border-2 border-slate-800 p-5 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <h4 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5 border-b-2 border-slate-350 pb-2">
                  <Compass className="h-4 w-4 text-emerald-800 animate-spin" style={{ animationDuration: "12s" }} /> So sánh thiết kế máy phát điện 1 pha
                </h4>

                <div className="space-y-4 text-xs sm:text-sm text-slate-900 font-bold">
                  <div className="bg-white p-3.5 rounded-xl border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b] space-y-1">
                    <strong className="text-amber-900 text-sm block font-black">Kiểu 1: Rôto là khung dây, Stato là nam châm đứng yên</strong>
                    <p className="text-slate-800 text-xs leading-relaxed font-bold">
                      - Thường dùng trong các máy phát nhỏ (đinamô xe đạp).
                      <br />- <strong>Nhược điểm:</strong> Phải sử dụng vành khuyên và chổi quét để lấy điện ra. Ma sát mài mòn chổi quét, dễ phát tia lửa ở công suất cao, hạn chế tuổi thọ và độ tin cậy.
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b] space-y-1">
                    <strong className="text-emerald-900 text-sm block font-black">Kiểu 2: Rôto là nam châm, Stato là cuộn dây cố định (Công nghiệp)</strong>
                    <p className="text-slate-800 text-xs leading-relaxed font-bold">
                      - Rôto quay là nam châm điện; stato là các cuộn dây có lõi sắt quấn xen kẽ.
                      <br />- <strong>Ưu điểm:</strong> Không cần vành khuyên chổi quét vì các cuộn dây lấy điện ra được gắn cố định. Có thể truyền tải điện áp cực cao và công suất lớn cực kỳ an toàn, không bị mài mòn cơ khí chổi quét.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual vector diagram of Slip Rings and Brushes */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-800 shadow-[4px_4px_0px_0px_#1e293b] flex flex-col items-center">
                <span className="text-[10px] text-slate-700 font-mono uppercase font-black block mb-3 text-center w-full">
                  Hình 17.4: Chi tiết cơ khí Vành khuyên và Chổi quét
                </span>

                {/* SVG Slip Rings details */}
                <div className="w-full bg-white rounded-xl p-2 border-2 border-slate-800 shadow-inner">
                  <svg viewBox="0 0 280 180" className="w-full h-auto">
                    <rect width="100%" height="100%" fill="#ffffff" />
                    
                    {/* Rotating shaft axis */}
                    <line x1="20" y1="90" x2="260" y2="90" stroke="#475569" strokeWidth="4" />
                    <text x="25" y="80" fill="#475569" className="text-[9px] font-black font-mono">Trục quay</text>

                    {/* Wire leads from rotating loop (MNPQ) */}
                    <line x1="30" y1="40" x2="105" y2="90" stroke="#ef4444" strokeWidth="2.5" />
                    <line x1="30" y1="140" x2="155" y2="90" stroke="#3b82f6" strokeWidth="2.5" />
                    <text x="35" y="35" fill="#ef4444" className="text-[9px] font-extrabold">Đầu khung M</text>
                    <text x="35" y="152" fill="#3b82f6" className="text-[9px] font-extrabold">Đầu khung P</text>

                    {/* Slip Ring 1 (Gold Cylinder 1) */}
                    <g>
                      {/* Ring 1 back shadow */}
                      <ellipse cx="110" cy="90" rx="6" ry="18" fill="#d97706" />
                      <rect x="110" y="72" width="15" height="36" fill="#f59e0b" />
                      <ellipse cx="125" cy="90" rx="6" ry="18" fill="#fbbf24" stroke="#d97706" />
                      {/* Brush 1 (Grey Carbon brush tì lên) */}
                      <rect x="115" y="102" width="8" height="15" fill="#4b5563" stroke="#1f2937" strokeWidth="1" />
                      <line x1="119" y1="117" x2="119" y2="135" stroke="#ef4444" strokeWidth="1.5" />
                      <circle cx="119" cy="135" r="3" fill="#ef4444" />
                      <text x="135" y="112" fill="#374151" className="text-[9px] font-extrabold">Chổi quét 1</text>
                      <text x="135" y="123" fill="#b45309" className="text-[9px] font-extrabold">Vành khuyên 1</text>
                    </g>

                    {/* Slip Ring 2 (Gold Cylinder 2) */}
                    <g>
                      {/* Ring 2 back shadow */}
                      <ellipse cx="160" cy="90" rx="6" ry="18" fill="#d97706" opacity="0.6" />
                      <rect x="160" y="72" width="15" height="36" fill="#f59e0b" />
                      <ellipse cx="175" cy="90" rx="6" ry="18" fill="#fbbf24" stroke="#d97706" />
                      {/* Brush 2 (Grey Carbon brush tì lên) */}
                      <rect x="165" y="102" width="8" height="15" fill="#4b5563" stroke="#1f2937" strokeWidth="1" />
                      <line x1="169" y1="117" x2="169" y2="135" stroke="#3b82f6" strokeWidth="1.5" />
                      <circle cx="169" cy="135" r="3" fill="#3b82f6" />
                      <text x="185" y="112" fill="#374151" className="text-[9px] font-extrabold font-mono">Chổi quét 2</text>
                      <text x="185" y="123" fill="#b45309" className="text-[9px] font-extrabold font-mono">Vành khuyên 2</text>
                    </g>

                    {/* Load Resistor representation outside */}
                    <rect x="125" y="148" width="40" height="14" fill="#f1f5f9" stroke="#1e293b" strokeWidth="2" rx="2" />
                    <text x="133" y="158" fill="#0f172a" className="text-[9px] font-black font-mono">Tải R</text>
                    <path d="M 119 135 L 119 155 L 125 155" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                    <path d="M 169 135 L 169 155 L 165 155" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                  </svg>
                </div>

                <p className="text-[11px] text-slate-800 mt-3 text-center font-bold leading-relaxed bg-amber-50 p-3 rounded-xl border-2 border-slate-800 w-full">
                  💡 <strong>Hoạt động:</strong> Khi rôto quay, hai vành đồng thau quay theo và trượt tì sát trên 2 thanh chổi than carbon đứng yên, giúp truyền năng lượng xoay chiều an toàn ra mạch ngoài mà không bị xoắn đứt dây.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: MÁY PHÁT ĐIỆN XOAY CHIỀU 3 PHA & AN TOÀN */}
        {activeSubSection === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              
              {/* Intro Card */}
              <div className="space-y-3 bg-cyan-50/70 p-5 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b]">
                <span className="inline-block text-[10px] bg-cyan-100 text-cyan-950 border-2 border-slate-800 px-3 py-1 rounded-lg font-mono font-black uppercase">
                  Dòng điện ba pha công nghiệp
                </span>
                <h3 className="text-lg font-black text-slate-950">{sections[3].title}</h3>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Máy phát điện ba pha tạo ra một hệ thống gồm ba dòng điện xoay chiều hình sin có cùng tần số, cùng biên độ nhưng lệch pha nhau từng đôi một một góc bằng <strong className="text-amber-850">2π/3 (120°)</strong>.
                </p>
              </div>

              {/* Three-Phase Math Formulas card */}
              <div className="bg-purple-50 border-2 border-slate-800 p-5 rounded-2xl shadow-[3px_3px_0px_0px_#1e293b] space-y-4">
                <span className="text-[10px] text-purple-950 font-black font-mono uppercase block tracking-wider">Hệ phương trình ba suất điện động đối xứng (Hình 17.8)</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm text-center">
                  <div className="bg-white p-2.5 rounded-xl border-2 border-slate-800 text-red-700 font-bold shadow-[1.5px_1.5px_0px_0px_#000] flex justify-center items-center">
                    <FormattedMathText text="e_1 = E_0 \cdot \cos(\omega t)" />
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border-2 border-slate-800 text-emerald-800 font-bold shadow-[1.5px_1.5px_0px_0px_#000] flex justify-center items-center">
                    <FormattedMathText text="e_2 = E_0 \cdot \cos\left(\omega t - \frac{2\pi}{3}\right)" />
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border-2 border-slate-800 text-blue-700 font-bold shadow-[1.5px_1.5px_0px_0px_#000] flex justify-center items-center">
                    <FormattedMathText text="e_3 = E_0 \cdot \cos\left(\omega t + \frac{2\pi}{3}\right)" />
                  </div>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed text-center font-bold bg-white p-3 rounded-xl border-2 border-slate-800">
                  💡 <strong>Tính chất đối xứng:</strong> Tại mọi thời điểm, tổng giá trị tức thời của ba suất điện động đều bằng 0: <strong className="text-slate-950"><FormattedMathText text="e_1 + e_2 + e_3 = 0" /></strong>. Điều này cho phép tinh giảm dây trung hòa khi truyền tải tải đối xứng cực kỳ ưu việt.
                </p>
              </div>

              {/* Safety Rules Accordion card */}
              <div className="bg-rose-50 border-2 border-slate-800 p-5 rounded-2xl shadow-[3px_3px_0px_0px_#1e293b] space-y-3">
                <h4 className="text-sm font-black text-rose-950 uppercase tracking-wider flex items-center gap-1.5 border-b border-rose-200 pb-2">
                  <ShieldAlert className="h-5 w-5 text-rose-750 animate-pulse" /> Quy tắc an toàn khi sử dụng điện xoay chiều
                </h4>
                
                <ul className="text-xs sm:text-sm text-slate-800 space-y-2 list-disc list-inside font-bold">
                  <li><strong>Tuân thủ tuyệt đối</strong> các biển báo cảnh báo nguy hiểm điện cao áp (Hình 17.7).</li>
                  <li><strong>Tuyệt đối không</strong> chạm tay trực tiếp hoặc dùng vật kim loại tiếp xúc với vỏ bọc dây bị bong rách, mối nối hở.</li>
                  <li><strong>Không lắp đặt</strong> thiết bị điện giả mạo, kém chất lượng không rõ nguồn gốc.</li>
                  <li><strong>Định kì kiểm tra</strong> cách điện các thiết bị gia dụng và dây dẫn trong nhà.</li>
                  <li><strong>Chủ động ngắt cầu dao (Aptomat)</strong> khi xảy ra sấm sét, ngập nước dông bão lớn.</li>
                </ul>
              </div>
            </div>

            {/* Visual interactive 3-phase vector representation */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-800 shadow-[4px_4px_0px_0px_#1e293b] flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-3">
                  <span className="text-[10px] text-slate-700 font-mono uppercase font-black">Mô phỏng 17.2: Mặt cắt stator máy phát 3 pha</span>
                  <span className="text-[10px] text-cyan-900 font-mono font-black">θ = {rotationAngle}°</span>
                </div>

                {/* SVG 3 phase stator */}
                <div className="w-full bg-white rounded-xl p-2 border-2 border-slate-800 shadow-inner">
                  <svg viewBox="0 0 200 180" className="w-full h-auto">
                    <rect width="100%" height="100%" fill="#ffffff" />
                    
                    {/* Outer stator stator ring */}
                    <circle cx="100" cy="90" r="70" fill="none" stroke="#475569" strokeWidth="6" />
                    <circle cx="100" cy="90" r="73" fill="none" stroke="#cbd5e1" strokeWidth="1" />

                    {/* Coil 1 (Phase A) at top (90 deg) */}
                    <g>
                      <rect x="90" y="24" width="20" height="12" fill="#ef4444" rx="1" opacity="0.9" stroke="#991b1b" />
                      <text x="96" y="33" fill="#ffffff" className="text-[8px] font-black font-mono">C1</text>
                      {/* Glowing field */}
                      <circle cx="100" cy="30" r={Math.max(2, 8 * Math.abs(Math.cos(thetaRad)))} fill="#ef4444" opacity="0.3" />
                    </g>

                    {/* Coil 2 (Phase B) at bottom-right (330 deg / -30 deg) */}
                    <g>
                      <rect x="142" y="112" width="20" height="12" fill="#10b981" rx="1" transform="rotate(60 152 118)" opacity="0.9" stroke="#064e3b" />
                      <text x="148" y="121" fill="#ffffff" className="text-[8px] font-black font-mono" transform="rotate(60 152 118)">C2</text>
                      <circle cx="152" cy="120" r={Math.max(2, 8 * Math.abs(Math.cos(thetaRad - 2*Math.PI/3)))} fill="#10b981" opacity="0.3" />
                    </g>

                    {/* Coil 3 (Phase C) at bottom-left (210 deg) */}
                    <g>
                      <rect x="38" y="112" width="20" height="12" fill="#3b82f6" rx="1" transform="rotate(-60 48 118)" opacity="0.9" stroke="#1e3a8a" />
                      <text x="44" y="121" fill="#ffffff" className="text-[8px] font-black font-mono" transform="rotate(-60 48 118)">C3</text>
                      <circle cx="48" cy="120" r={Math.max(2, 8 * Math.abs(Math.cos(thetaRad + 2*Math.PI/3)))} fill="#3b82f6" opacity="0.3" />
                    </g>

                    {/* Rotating magnetic rotor in center */}
                    <g transform={`rotate(${rotationAngle} 100 90)`}>
                      {/* Magnet Bar */}
                      <rect x="75" y="80" width="50" height="20" fill="#475569" rx="2" />
                      {/* North Pole */}
                      <path d="M 100 80 L 125 80 A 10 10 0 0 1 125 100 L 100 100 Z" fill="#ef4444" />
                      <text x="108" y="93" fill="#ffffff" className="text-[9px] font-black font-mono">N</text>
                      {/* South Pole */}
                      <path d="M 100 80 L 75 80 A 10 10 0 0 0 75 100 L 100 100 Z" fill="#3b82f6" />
                      <text x="83" y="93" fill="#ffffff" className="text-[9px] font-black font-mono">S</text>
                      
                      {/* Rotor center axis */}
                      <circle cx="100" cy="90" r="4" fill="#ffffff" />
                    </g>
                  </svg>
                </div>

                {/* Plot waveform showing 3 lines real time */}
                <div className="w-full mt-3 bg-white p-3 rounded-xl border-2 border-slate-800 space-y-2">
                  <span className="text-[8px] sm:text-[9px] text-slate-700 font-mono font-black uppercase block text-center">Đồ thị suất điện động 3 pha (lệch pha 120°)</span>
                  
                  {/* 3 Wave lines visual display */}
                  <svg viewBox="0 0 200 60" className="w-full h-14 bg-slate-50 rounded-xl border border-slate-200">
                    {/* Horizontal axis */}
                    <line x1="10" y1="30" x2="190" y2="30" stroke="#cbd5e1" strokeWidth="1" />
                    
                    {/* Phase 1 curve (Red) */}
                    <path 
                      d={Array.from({ length: 180 }, (_, x) => {
                        const angle = (x / 180) * 4 * Math.PI;
                        const y = 30 - 20 * Math.cos(angle);
                        return `${x === 0 ? "M" : "L"} ${10 + x} ${y}`;
                      }).join(" ")}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                    />

                    {/* Phase 2 curve (Green) */}
                    <path 
                      d={Array.from({ length: 180 }, (_, x) => {
                        const angle = (x / 180) * 4 * Math.PI - 2*Math.PI/3;
                        const y = 30 - 20 * Math.cos(angle);
                        return `${x === 0 ? "M" : "L"} ${10 + x} ${y}`;
                      }).join(" ")}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    />

                    {/* Phase 3 curve (Blue) */}
                    <path 
                      d={Array.from({ length: 180 }, (_, x) => {
                        const angle = (x / 180) * 4 * Math.PI + 2*Math.PI/3;
                        const y = 30 - 20 * Math.cos(angle);
                        return `${x === 0 ? "M" : "L"} ${10 + x} ${y}`;
                      }).join(" ")}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />

                    {/* Current location ticker vertical line */}
                    {(() => {
                      const tickerX = 10 + ((rotationAngle % 360) / 360) * 180;
                      return (
                        <line x1={tickerX} y1="5" x2={tickerX} y2="55" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 1.5" />
                      );
                    })()}
                  </svg>
                  <p className="text-[9px] font-mono font-black text-center text-slate-800 leading-none">
                    🔴 Pha 1 (C1)  |  🟢 Pha 2 (C2)  |  🔵 Pha 3 (C3)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Box */}
      <div className="bg-emerald-50 border-2 border-slate-800 shadow-[4px_4px_0px_0px_#1e293b] p-5 rounded-3xl flex gap-4 items-start font-bold">
        <CheckCircle2 className="h-6 w-6 text-emerald-850 shrink-0 mt-0.5 animate-pulse" />
        <div className="space-y-1">
          <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wider">Tóm tắt cốt lõi bài học</h4>
          <p className="text-xs sm:text-sm text-slate-900 leading-relaxed">
            - Nguyên tắc tạo ra dòng điện xoay chiều dựa trên <strong className="text-slate-950 font-black bg-emerald-100/50 px-1 rounded">hiện tượng cảm ứng điện từ</strong>.
            <br />- Giá trị hiệu dụng <strong className="text-cyan-900 font-black"><FormattedMathText text="I = \frac{I_0}{\sqrt{2}}" /></strong> được định nghĩa dựa trên <strong className="text-slate-950 font-black bg-cyan-100/50 px-1 rounded">tác dụng nhiệt</strong> tương đương của dòng điện.
            <br />- Máy phát điện một pha có hai bộ phận chính: <strong className="text-slate-950 font-black">phần cảm</strong> (tạo ra từ trường) và <strong className="text-slate-950 font-black">phần ứng</strong> (xuất hiện suất điện động cảm ứng).
            <br />- Hệ thống dòng điện ba pha đối xứng gồm ba dòng điện cùng biên độ, cùng tần số nhưng lệch pha góc <strong className="text-amber-850 font-black bg-amber-100/50 px-1 rounded"><FormattedMathText text="\frac{2\pi}{3}" /> (120°)</strong>.
          </p>
        </div>
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
              <p className="text-[10px] text-slate-600 font-bold">Giải đáp học tập Bài 17 chuyên sâu</p>
            </div>
          </div>
          <button
            onClick={() => setMessages([
              {
                role: "model",
                content: "Thầy/Cô đã đặt lại hộp thoại. Thầy/Cô rất vui lòng được hỗ trợ các em giải đáp mọi thắc mắc liên quan đến Bài 17: Máy phát điện xoay chiều và môn Vật lí!"
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
            "Nguyên tắc tạo ra suất điện động xoay chiều là gì?",
            "Tại sao thiết kế công nghiệp lại cho rôto là nam châm quay?",
            "Làm thế nào để tính điện áp hiệu dụng từ giá trị cực đại?",
            "Tính chất đối xứng của dòng điện 3 pha có ý nghĩa gì?"
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
            placeholder="Đặt câu hỏi về Bài 17 và môn Vật lí..."
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
