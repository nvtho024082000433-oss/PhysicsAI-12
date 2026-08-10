import { useState, useRef, useEffect } from "react";
import { BookOpen, Sparkles, Brain, CheckCircle2, ArrowRight, Info, Zap, Compass, RefreshCw, ShieldAlert, Cpu, Send } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson18Textbook() {
  const [activeSubSection, setActiveSubSection] = useState<number>(0);
  const [primTurns, setPrimTurns] = useState<number>(600);
  const [secTurns, setSecTurns] = useState<number>(300);
  const [inputU1, setInputU1] = useState<number>(220);
  
  // Plucking guitar state for mini-widget
  const [pluckForce, setPluckForce] = useState<string>("Vừa");
  const [pickupTurns, setPickupTurns] = useState<number>(5000);

  // AI assistant chat state
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Thầy/Cô chào các em! Thầy/Cô là Trợ lý Giáo viên AI chuyên biệt giải đáp Bài 18: Ứng dụng hiện tượng cảm ứng điện từ. Các em có thắc mắc gì cần giải đáp liên quan đến máy biến áp, guitar điện, dòng điện Foucault hay môn Vật lí nói chung không?"
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
          mode: "lesson18"
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
      title: "I. MÁY BIẾN ÁP & SẠC KHÔNG DÂY",
      subtitle: "Nguyên lý truyền tải năng lượng thông qua cảm ứng tương hỗ xoay chiều",
    },
    {
      title: "II. ĐÀN GHI TA ĐIỆN",
      subtitle: "Cấu tạo bộ cảm âm điện từ (Pickup) chuyển hóa cơ năng thành điện năng",
    },
    {
      title: "III. DÒNG ĐIỆN FOUCAULT (PHU-CÔ)",
      subtitle: "Dòng điện xoáy trong khối vật dẫn: Hiện tượng hãm từ, tỏa nhiệt và ứng dụng thực tiễn",
    }
  ];

  // Calculations for Transformer mini-widget
  const calculatedU2 = parseFloat(((inputU1 * secTurns) / primTurns).toFixed(1));
  const transformerRatio = (primTurns / secTurns).toFixed(2);
  const isStepUp = secTurns > primTurns;

  // Calculations for Guitar pickup mini-widget
  const getEmfAmp = () => {
    const forceFactor = pluckForce === "Mạnh" ? 1.5 : (pluckForce === "Nhẹ" ? 0.5 : 1.0);
    return (pickupTurns * 0.0004 * forceFactor).toFixed(2);
  };

  return (
    <div className="space-y-8 text-slate-900 font-sans max-w-4xl mx-auto py-4 animate-fade-in" id="lesson18-textbook">
      
      {/* Textbook Header Badge */}
      <div className="border-b-2 border-slate-850 pb-6 space-y-5">
        <div className="w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border-2 border-slate-800 text-purple-950 text-xs font-black tracking-wide uppercase mb-3 shadow-[2px_2px_0px_#1e293b]">
            <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "12s" }} /> CHƯƠNG III: TỪ TRƯỜNG
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-snug w-full block uppercase">
            BÀI 18: ỨNG DỤNG HIỆN TƯỢNG CẢM ỨNG ĐIỆN TỪ
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 mt-1.5 leading-normal font-bold w-full block">
            Khám phá các ứng dụng thực tiễn của cảm ứng điện từ: biến đổi điện áp, sạc điện thoại không dây thông minh, đàn guitar điện nghệ thuật và dòng điện Foucault xoáy trong các khối vật dẫn công nghiệp.
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
                  ? "bg-purple-300 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
                  : "bg-white hover:bg-slate-50 text-slate-700 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#1e293b]"
              }`}
            >
              Phần {idx + 1}: {idx === 0 ? "Biến áp & Sạc" : idx === 1 ? "Guitar điện" : "Dòng Foucault"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border-2 border-slate-800 shadow-[6px_6px_0px_0px_#1e293b] rounded-3xl p-6 space-y-8">
        
        {/* SECTION 1: MÁY BIẾN ÁP & SẠC KHÔNG DÂY */}
        {activeSubSection === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              
              {/* Intro Card */}
              <div className="space-y-3 bg-purple-50/70 p-5 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b]">
                <span className="inline-block text-[10px] bg-purple-100 text-purple-950 border-2 border-slate-800 px-3 py-1 rounded-lg font-mono font-black uppercase">
                  Thiết bị biến đổi điện áp xoay chiều
                </span>
                <h3 className="text-lg font-black text-slate-950">{sections[0].title}</h3>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Máy biến áp là thiết bị hoạt động dựa trên <strong className="text-purple-800 font-black">hiện tượng cảm ứng điện từ</strong>, dùng để biến đổi điện áp hiệu dụng của dòng điện xoay chiều mà không làm thay đổi tần số của nó.
                </p>
              </div>

              {/* Subsection 1 */}
              <div className="bg-slate-50 border-2 border-slate-800 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <h4 className="text-sm font-black text-purple-950 uppercase tracking-wide flex items-center gap-2">
                  <span className="p-1.5 bg-purple-100 text-purple-950 border-2 border-slate-800 rounded-xl"><BookOpen className="h-4 w-4" /></span>
                  1. Cấu tạo cơ bản
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
                  Máy biến áp gồm hai bộ phận chính:
                </p>
                <ul className="text-xs sm:text-sm text-slate-900 list-none space-y-3 pl-1 leading-relaxed font-bold">
                  <li className="flex gap-2 items-start">
                    <span className="px-1.5 py-0.5 bg-purple-150 border-2 border-slate-800 rounded text-[10px] font-black">LÕI</span>
                    <div>
                      <strong className="text-slate-950">Lõi biến áp:</strong> Là một lõi sắt khép kín ghép từ nhiều <strong className="text-purple-800 font-black">lá thép mỏng silicon</strong> có phủ sơn cách điện để giảm thiểu hao tổn năng lượng do dòng Foucault xoáy.
                    </div>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="px-1.5 py-0.5 bg-purple-150 border-2 border-slate-800 rounded text-[10px] font-black">CUỘN</span>
                    <div>
                      <strong className="text-slate-950">Hai cuộn dây dẫn:</strong> Có số vòng quấn khác nhau (N₁ và N₂) quấn cách điện trên lõi sắt:
                      <ul className="list-disc list-inside pl-3 mt-1.5 text-slate-800 space-y-1 font-bold">
                        <li>Cuộn nối với nguồn xoay chiều u₁ gọi là <strong className="text-emerald-850 font-black">cuộn sơ cấp</strong>.</li>
                        <li>Cuộn nối với tải tiêu thụ điện xoay chiều gọi là <strong className="text-purple-850 font-black">cuộn thứ cấp</strong>.</li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Subsection 2 */}
              <div className="bg-purple-50/20 border-2 border-slate-800 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <h4 className="text-sm font-black text-purple-950 uppercase tracking-wide flex items-center gap-2">
                  <span className="p-1.5 bg-purple-100 text-purple-950 border-2 border-slate-800 rounded-xl"><Zap className="h-4 w-4" /></span>
                  2. Nguyên tắc hoạt động & Công thức biến áp
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
                  Khi dòng điện xoay chiều qua cuộn sơ cấp biến thiên, nó tạo ra một từ thông xoay chiều liên tục biến động chạy khép kín trong lõi sắt. Từ thông này xuyên qua cuộn thứ cấp, gây ra suất điện động xoay chiều cảm ứng tỷ lệ thuận với số vòng:
                </p>
                
                <div className="bg-slate-100 border-2 border-slate-800 p-4 rounded-xl text-center text-xs sm:text-sm text-slate-900 shadow-inner leading-relaxed flex flex-col items-center justify-center gap-2">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <div className="flex items-center justify-center">
                      <FormattedMathText text="e_1 = -N_1 \cdot \frac{d\Phi}{dt}" />
                    </div>
                    <span className="text-slate-500 font-bold text-xs">và</span>
                    <div className="flex items-center justify-center">
                      <FormattedMathText text="e_2 = -N_2 \cdot \frac{d\Phi}{dt}" />
                    </div>
                  </div>
                  <div className="border-t border-slate-300 mt-2.5 pt-2.5 text-purple-800 font-bold text-sm sm:text-base w-full flex justify-center items-center">
                    <FormattedMathText text="\frac{E_1}{E_2} = \frac{N_1}{N_2}" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
                  Ở máy biến áp lý tưởng, bỏ qua điện trở dây quấn và hao phí dòng xoáy, tỷ số điện áp hiệu dụng hai đầu cuộn bằng tỷ lệ số vòng dây quấn:
                </p>
                
                <div className="bg-purple-100 border-2 border-slate-800 p-4 rounded-xl text-center text-sm sm:text-base text-purple-950 shadow-inner flex justify-center items-center">
                  <FormattedMathText text="\frac{U_1}{U_2} = \frac{N_1}{N_2}" />
                </div>
                
                <div className="p-3 bg-white border-2 border-slate-800 rounded-xl space-y-2 text-xs font-bold text-slate-850">
                  <div className="flex flex-wrap items-center gap-1">
                    • Nếu <FormattedMathText text="N_2 > N_1" /> <FormattedMathText text="\Rightarrow U_2 > U_1" />: Máy <strong className="text-emerald-850 font-black bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Tăng áp</strong> (nâng cao hiệu điện thế).
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    • Nếu <FormattedMathText text="N_2 < N_1" /> <FormattedMathText text="\Rightarrow U_2 < U_1" />: Máy <strong className="text-purple-850 font-black bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">Hạ áp</strong> (giảm hiệu điện thế an toàn).
                  </div>
                </div>
              </div>

              {/* Em Co Biet */}
              <div className="p-4 bg-amber-50 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b] space-y-2">
                <span className="text-xs text-amber-950 font-black uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-800" /> EM CÓ BIẾT: SẠC ĐIỆN THOẠI KHÔNG DÂY
                </span>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Sạc điện thoại không dây hoạt động dựa trên nguyên lý máy biến áp đặc biệt. Mặt trong đế sạc chứa cuộn cảm đóng vai trò <strong className="text-slate-950">cuộn sơ cấp</strong>, phát ra từ trường biến thiên tần số cao. Mặt sau điện thoại được trang bị cuộn dây dẹt đóng vai trò <strong className="text-slate-950">cuộn thứ cấp</strong>. Khi đặt điện thoại lên đế sạc, từ trường biến thiên xuyên qua cuộn nhận, tạo ra dòng điện cảm ứng xoay chiều, dòng này được mạch chỉnh lưu nắn thành dòng một chiều để sạc pin một cách an toàn.
                </p>
              </div>
            </div>

            {/* Interactive Widget Column */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-slate-50 border-2 border-slate-800 p-5 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <div className="border-b-2 border-slate-800 pb-3">
                  <span className="text-[10px] text-purple-700 font-black uppercase tracking-wider font-mono">Minh họa 18.1: Máy biến áp thu nhỏ</span>
                  <h4 className="text-sm font-black text-slate-950 mt-1">Mô hình biến áp xoay chiều</h4>
                </div>

                {/* SVG Visualizing the Transformer core and coils - LIGHT THEME */}
                <div className="bg-white rounded-xl p-2 border-2 border-slate-800 shadow-inner">
                  <svg viewBox="0 0 240 160" className="w-full h-auto">
                    <rect width="100%" height="100%" fill="#ffffff" />
                    
                    {/* Grid background */}
                    <path d="M 0 40 L 240 40 M 0 80 L 240 80 M 0 120 L 240 120 M 60 0 L 60 160 M 120 0 L 120 160 M 180 0 L 180 160" stroke="#cbd5e1" strokeWidth="1" />
                    
                    {/* Iron Core */}
                    <rect x="50" y="25" width="140" height="110" fill="none" stroke="#64748b" strokeWidth="14" rx="4" />
                    {/* Lamination lines */}
                    <rect x="52" y="27" width="136" height="106" fill="none" stroke="#cbd5e1" strokeWidth="2" rx="4" />
                    <rect x="57" y="32" width="126" height="96" fill="none" stroke="#94a3b8" strokeWidth="4" rx="2" />
                    
                    {/* Primary Coil (Left) */}
                    <g>
                      <path d="M 35 40 C 35 40, 52 45, 52 50 C 52 55, 35 60, 35 60 C 35 60, 52 65, 52 70 C 52 75, 35 80, 35 80 C 35 80, 52 85, 52 90 C 52 95, 35 100, 35 100" 
                            fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
                      {/* Connections */}
                      <line x1="20" y1="40" x2="35" y2="40" stroke="#059669" strokeWidth="2" />
                      <line x1="20" y1="100" x2="35" y2="100" stroke="#059669" strokeWidth="2" />
                      <circle cx="20" cy="40" r="3" fill="#059669" />
                      <circle cx="20" cy="100" r="3" fill="#059669" />
                      <text x="14" y="32" fill="#059669" className="text-[9px] font-black font-mono">SƠ CẤP (N₁)</text>
                    </g>

                    {/* Secondary Coil (Right) */}
                    <g>
                      <path d="M 205 40 C 205 40, 188 45, 188 50 C 188 55, 205 60, 205 60 C 205 65, 188 70, 188 70 C 188 75, 205 80, 205 80 C 205 85, 188 90, 188 90 C 188 95, 205 100, 205 100 C 205 105, 188 110, 188 110 C 188 115, 205 120, 205 120" 
                            fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Connections */}
                      <line x1="220" y1="40" x2="205" y2="40" stroke="#d97706" strokeWidth="2" />
                      <line x1="220" y1="120" x2="205" y2="120" stroke="#d97706" strokeWidth="2" />
                      <circle cx="220" cy="40" r="3" fill="#d97706" />
                      <circle cx="220" cy="120" r="3" fill="#d97706" />
                      <text x="175" y="32" fill="#d97706" className="text-[9px] font-black font-mono">THỨ CẤP (N₂)</text>
                    </g>

                    {/* Magnetic Flux Lines Animation (dynamic dash) */}
                    <rect x="53" y="28" width="134" height="104" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="6, 6" rx="4" className="animate-[spin_16s_linear_infinite]" opacity="0.7" />
                    
                    {/* Output indicators */}
                    <text x="120" y="85" fill="#1e293b" className="text-[10px] text-center font-black font-mono" textAnchor="middle">
                      Lõi lá thép silicon cách điện
                    </text>
                  </svg>
                </div>

                <div className="space-y-4 bg-white p-4 border-2 border-slate-800 rounded-xl shadow-inner text-xs font-bold">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-800 font-extrabold block flex items-center gap-1">Số vòng sơ cấp <FormattedMathText text="N_1" />:</label>
                      <select 
                        value={primTurns} 
                        onChange={(e) => setPrimTurns(parseInt(e.target.value))}
                        className="w-full bg-white border-2 border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-950 font-black focus:outline-none cursor-pointer"
                      >
                        <option value={1200}>1200 vòng</option>
                        <option value={900}>900 vòng</option>
                        <option value={600}>600 vòng</option>
                        <option value={300}>300 vòng</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-800 font-extrabold block flex items-center gap-1">Số vòng thứ cấp <FormattedMathText text="N_2" />:</label>
                      <select 
                        value={secTurns} 
                        onChange={(e) => setSecTurns(parseInt(e.target.value))}
                        className="w-full bg-white border-2 border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-950 font-black focus:outline-none cursor-pointer"
                      >
                        <option value={1500}>1500 vòng (Tăng)</option>
                        <option value={1200}>1200 vòng</option>
                        <option value={600}>600 vòng</option>
                        <option value={300}>300 vòng (Hạ)</option>
                        <option value={150}>150 vòng (Hạ)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-extrabold text-slate-800 items-center">
                      <span className="flex items-center gap-1">Điện áp vào <FormattedMathText text="U_1" />:</span>
                      <span className="text-purple-700 font-mono font-black">{inputU1} V</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="380" 
                      value={inputU1} 
                      onChange={(e) => setInputU1(parseInt(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>

                  {/* Calculation Outputs */}
                  <div className="p-3.5 bg-yellow-50 rounded-xl border-2 border-slate-800 space-y-2 font-mono text-xs shadow-inner">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-bold flex items-center gap-1">Tỉ số biến áp (<FormattedMathText text="\frac{N_1}{N_2}" />):</span>
                      <span className="text-slate-950 font-black">{transformerRatio}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-bold">Phân loại máy:</span>
                      <span className={`font-black uppercase px-2 py-0.5 rounded border-2 text-[9px] ${isStepUp ? "bg-cyan-100 border-slate-800 text-cyan-950" : "bg-purple-100 border-slate-800 text-purple-950"}`}>
                        {isStepUp ? "🔻 TĂNG ÁP" : "🔺 HẠ ÁP"}
                      </span>
                    </div>
                    <div className="flex justify-between border-t-2 border-slate-300 pt-2 mt-1 items-center">
                      <span className="text-slate-900 font-black text-xs flex items-center gap-1">Điện áp ra <FormattedMathText text="U_2" /> lý tưởng:</span>
                      <span className="text-purple-800 font-black text-sm">{calculatedU2} V</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: ĐÀN GHI TA ĐIỆN */}
        {activeSubSection === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              
              {/* Intro Card */}
              <div className="space-y-3 bg-indigo-50/70 p-5 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b]">
                <span className="inline-block text-[10px] bg-indigo-100 text-indigo-950 border-2 border-slate-800 px-3 py-1 rounded-lg font-mono font-black uppercase">
                  Chuyển đổi dao động cơ thành tín hiệu âm
                </span>
                <h3 className="text-lg font-black text-slate-950">{sections[1].title}</h3>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Đàn ghi ta điện có thân đặc bằng gỗ nặng, <strong className="text-slate-950">không có hộp cộng hưởng lớn</strong> như đàn ghi ta gỗ cổ điển. Âm thanh được truyền tải ra loa nhờ hoạt động của các bộ cảm âm điện từ <strong className="text-indigo-700">Pickup</strong> đặt dưới dây đàn thép.
                </p>
              </div>

              {/* Subsection 1 */}
              <div className="bg-slate-50 border-2 border-slate-800 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <h4 className="text-sm font-black text-indigo-950 uppercase tracking-wide flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-100 text-indigo-950 border-2 border-slate-800 rounded-xl"><BookOpen className="h-4 w-4" /></span>
                  1. Cơ chế hoạt động 3 bước chi tiết
                </h4>
                <ol className="text-xs sm:text-sm text-slate-900 list-none space-y-3.5 pl-1 leading-relaxed font-bold">
                  <li className="flex gap-2.5 items-start">
                    <span className="px-2 py-0.5 bg-indigo-100 border-2 border-slate-800 rounded-lg text-indigo-950 text-xs font-black shadow-[1.5px_1.5px_0px_0px_#000] mt-0.5">1</span>
                    <div>
                      <strong className="text-slate-950">Sự từ hóa dây thép:</strong> Bộ pickup chứa nam châm cực mạnh đặt trực tiếp dưới dây đàn thép (vật liệu sắt từ). Từ trường mạnh từ nam châm từ hóa dây đàn gần đó, biến đoạn dây thép thành một nam châm phụ có hai cực xác định.
                    </div>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="px-2 py-0.5 bg-indigo-100 border-2 border-slate-800 rounded-lg text-indigo-950 text-xs font-black shadow-[1.5px_1.5px_0px_0px_#000] mt-0.5">2</span>
                    <div>
                      <strong className="text-slate-950">Sự biến thiên từ thông tuần hoàn:</strong> Khi gảy dây đàn dao động, sợi dây bị từ hóa chuyển động qua lại tuần hoàn sát nam châm và cuộn dây cảm ứng. Dao động cơ học này làm cho từ thông xuyên qua cuộn dây bên dưới biến thiên điều hòa cùng tần số với tần số dao động cơ học của dây đàn.
                    </div>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="px-2 py-0.5 bg-indigo-100 border-2 border-slate-800 rounded-lg text-indigo-950 text-xs font-black shadow-[1.5px_1.5px_0px_0px_#000] mt-0.5">3</span>
                    <div>
                      <strong className="text-slate-950">Phát sinh suất điện động cảm ứng:</strong> Theo định luật cảm ứng điện từ Faraday, sự biến thiên từ thông liên tục sinh ra trong cuộn dây pickup một dòng điện cảm ứng xoay chiều đồng bộ. Tín hiệu dòng xoay chiều siêu nhỏ này truyền qua giắc cắm đến máy tăng âm (Ampli) khuếch đại lên và phát ra loa thành âm nhạc.
                    </div>
                  </li>
                </ol>
              </div>

              {/* Subsection 2 */}
              <div className="bg-purple-50/20 border-2 border-slate-800 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <h4 className="text-sm font-black text-indigo-950 uppercase tracking-wide flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-100 text-indigo-950 border-2 border-slate-800 rounded-xl"><Brain className="h-4 w-4" /></span>
                  2. Hỏi & đáp trọng tâm kiến thức khoa học
                </h4>
                
                <div className="space-y-4 pl-3 border-l-2 border-indigo-300 font-bold text-xs sm:text-sm">
                  <div className="space-y-1.5">
                    <p className="text-indigo-950 font-black">Q1: Tại sao dây đàn ghi ta điện bắt buộc phải làm bằng thép?</p>
                    <p className="text-slate-700 leading-relaxed">
                      💡 Vì thép là vật liệu sắt từ có tính nhiễm từ cực mạnh. Chỉ có vật liệu sắt từ mới bị từ hóa bởi nam châm vĩnh cửu của pickup để biến thành nam châm dao động. Dây nylon hoặc đồng thau thông thường không sắt từ nên khi rung động không tạo ra biến thiên từ thông gửi qua cuộn cảm bên dưới.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200">
                    <p className="text-indigo-950 font-black">Q2: Vì sao gảy đàn mạnh hơn thì âm thanh loa phát ra to hơn?</p>
                    <p className="text-slate-700 leading-relaxed">
                      💡 Theo định luật Faraday: gảy đàn mạnh làm biên độ dao động dây lớn hơn, tốc độ biến thiên từ thông qua cuộn cảm cực mạnh. Biên độ suất điện động cảm ứng sinh ra vọt cao, đưa tín hiệu biên độ điện áp lớn vào amply giúp loa phát ra âm lượng to tương thích.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guitar Interactive Mini Widget */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-slate-50 border-2 border-slate-800 p-5 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <div className="border-b-2 border-slate-800 pb-3">
                  <span className="text-[10px] text-indigo-800 font-mono uppercase font-black tracking-wider">Minh họa 18.2: Nguyên lý hoạt động pickup</span>
                  <h4 className="text-sm font-black text-slate-950 mt-0.5">Gảy dây & cảm âm điện từ</h4>
                </div>

                {/* SVG Visualizing Pickup and Vibrating String - LIGHT THEME */}
                <div className="relative flex justify-center items-center bg-white rounded-xl p-3 border-2 border-slate-800 shadow-inner">
                  <svg viewBox="0 0 240 150" className="w-full h-auto">
                    <rect width="100%" height="100%" fill="#ffffff" />
                    <path d="M 0 35 L 240 35 M 0 75 L 240 75 M 0 115 L 240 115" stroke="#cbd5e1" strokeWidth="1" />
                    
                    {/* Metal String (dynamic vibration animation) */}
                    <g>
                      {pluckForce === "Mạnh" ? (
                        <path d="M 10 35 Q 120 12, 230 35" fill="none" stroke="#475569" strokeWidth="3" className="animate-[pulse_0.1s_infinite]" />
                      ) : pluckForce === "Nhẹ" ? (
                        <path d="M 10 35 Q 120 31, 230 35" fill="none" stroke="#475569" strokeWidth="2" className="animate-[pulse_0.4s_infinite]" />
                      ) : (
                        <path d="M 10 35 Q 120 26, 230 35" fill="none" stroke="#475569" strokeWidth="2.5" className="animate-[pulse_0.2s_infinite]" />
                      )}
                      
                      {/* Magnetized domain indicators */}
                      <path d="M 110 23 L 130 23" stroke="#dc2626" strokeWidth="2.5" />
                      <path d="M 130 23 L 135 23" stroke="#2563eb" strokeWidth="2.5" />
                      <text x="120" y="16" fill="#1e293b" className="text-[8px] font-mono text-center font-black" textAnchor="middle">DÂY THÉP TỪ HÓA</text>
                    </g>
                    
                    {/* Pickup Magnet Core */}
                    <rect x="100" y="65" width="40" height="60" fill="#64748b" stroke="#334155" strokeWidth="1.5" rx="2" />
                    {/* Magnet Poles */}
                    <rect x="100" y="65" width="40" height="25" fill="#ef4444" rx="1" />
                    <text x="120" y="81" fill="#ffffff" className="text-[10px] font-black font-mono text-center" textAnchor="middle">N</text>
                    <text x="120" y="115" fill="#ffffff" className="text-[10px] font-black font-mono text-center" textAnchor="middle">S</text>

                    {/* Copper Coil wraps around magnet */}
                    <g opacity="0.9">
                      <path d="M 98 90 L 142 90 M 98 94 L 142 94 M 98 98 L 142 98 M 98 102 L 142 102 M 98 106 L 142 106 M 98 110 L 142 110" 
                            stroke="#ea580c" strokeWidth="2" />
                    </g>
                    
                    {/* Magnetic flux induction lines */}
                    <path d="M 105 60 C 105 45, 135 45, 135 60" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="2, 2" opacity="0.6" />
                    <path d="M 95 60 C 95 30, 145 30, 145 60" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3, 3" opacity="0.4" />
                    
                    {/* Captions */}
                    <text x="45" y="100" fill="#ea580c" className="text-[9px] font-black font-mono text-right" textAnchor="end">CUỘN DÂY (2)</text>
                    <line x1="50" y1="98" x2="98" y2="98" stroke="#ea580c" strokeWidth="1" strokeDasharray="2,2" />
                    
                    <text x="45" y="80" fill="#ef4444" className="text-[9px] font-black font-mono text-right" textAnchor="end">NAM CHÂM (1)</text>
                    <line x1="50" y1="78" x2="100" y2="78" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>
                </div>

                {/* Controllers */}
                <div className="space-y-4 bg-white p-4 border-2 border-slate-800 rounded-xl shadow-inner text-xs font-bold">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-800 font-extrabold block">Lực gảy dây:</label>
                    <div className="flex gap-2">
                      {["Nhẹ", "Vừa", "Mạnh"].map((force) => (
                        <button
                          key={force}
                          onClick={() => setPluckForce(force)}
                          className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all border-2 border-slate-800 cursor-pointer ${
                            pluckForce === force
                              ? "bg-indigo-300 text-slate-950 shadow-none translate-x-[0.5px] translate-y-[0.5px]"
                              : "bg-white text-slate-700 shadow-[1.5px_1.5px_0px_#1e293b]"
                          }`}
                        >
                          {force}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-800 font-extrabold block">Số vòng cuộn pickup (N):</label>
                    <select
                      value={pickupTurns}
                      onChange={(e) => setPickupTurns(parseInt(e.target.value))}
                      className="w-full bg-white border-2 border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-950 font-black focus:outline-none cursor-pointer"
                    >
                      <option value={8000}>8000 vòng (Điện áp cao)</option>
                      <option value={5000}>5000 vòng</option>
                      <option value={3000}>3000 vòng (Điện áp thấp)</option>
                    </select>
                  </div>

                  {/* Calculated Output */}
                  <div className="p-3.5 bg-yellow-50 rounded-xl border-2 border-slate-800 space-y-2 font-mono text-xs shadow-inner">
                    <div className="flex justify-between items-center text-[10px] border-b border-slate-200 pb-1.5">
                      <span className="text-slate-600 font-bold flex items-center gap-1">Tốc độ biến thiên từ thông <FormattedMathText text="\frac{d\Phi}{dt}" />:</span>
                      <span className="text-slate-950 font-black">
                        {pluckForce === "Mạnh" ? "0.0006" : (pluckForce === "Nhẹ" ? "0.0002" : "0.0004")} Wb/s
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-slate-900 font-black text-xs">Suất điện động cực đại:</span>
                      <span className="text-indigo-700 font-black text-sm">{getEmfAmp()} V</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: DÒNG ĐIỆN FOUCAULT */}
        {activeSubSection === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              
              {/* Intro Card */}
              <div className="space-y-3 bg-amber-50/70 p-5 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b]">
                <span className="inline-block text-[10px] bg-amber-100 text-amber-950 border-2 border-slate-800 px-3 py-1 rounded-lg font-mono font-black uppercase">
                  Dòng điện cảm ứng xoáy trong khối vật dẫn
                </span>
                <h3 className="text-lg font-black text-slate-950">{sections[2].title}</h3>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Dòng điện Foucault (dòng điện Phu-cô) là dòng cảm ứng xuất hiện <strong className="text-purple-800 font-black">bên trong khối vật dẫn kim loại</strong> khi khối này chuyển động cắt ngang từ trường hoặc đặt trong từ trường biến thiên theo thời gian.
                </p>
              </div>

              {/* Subsection 1 */}
              <div className="bg-slate-50 border-2 border-slate-800 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <h4 className="text-sm font-black text-amber-950 uppercase tracking-wide flex items-center gap-2">
                  <span className="p-1.5 bg-amber-100 text-amber-950 border-2 border-slate-800 rounded-xl"><BookOpen className="h-4 w-4" /></span>
                  1. Thí nghiệm hãm điện từ của con lắc kim loại
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
                  Xem xét thí nghiệm treo con lắc kim loại dao động giữa hai cực nam châm mạnh:
                </p>
                <ul className="text-xs sm:text-sm text-slate-900 list-none space-y-3.5 pl-1 leading-relaxed font-bold">
                  <li className="flex gap-2.5 items-start">
                    <span className="px-2 py-0.5 bg-rose-100 border-2 border-slate-800 rounded-lg text-rose-950 text-xs font-black shadow-[1.5px_1.5px_0px_0px_#000] mt-0.5">a</span>
                    <div>
                      <strong className="text-slate-950">Tấm kim loại liền khối:</strong> Khi dao động qua từ trường giữa hai cực nam châm, nó nhanh chóng dừng lại lập tức. Vì tấm kim loại đặc cắt các đường sức từ, sinh ra dòng Foucault chạy vòng khép kín cực mạnh bên trong. Theo định luật Lenz, lực từ sinh ra từ dòng điện xoáy này luôn chống lại chuyển động của con lắc, đóng vai trò lực hãm từ êm ái.
                    </div>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="px-2 py-0.5 bg-emerald-100 border-2 border-slate-800 rounded-lg text-emerald-950 text-xs font-black shadow-[1.5px_1.5px_0px_0px_#000] mt-0.5">b</span>
                    <div>
                      <strong className="text-slate-950">Tấm kim loại xẻ rãnh (răng lược):</strong> Khi thả ra từ cùng vị trí, nó dao động qua lại rất lâu mới dừng hẳn. Vì các vết xẻ rãnh đã dập tắt các đường dẫn của dòng xoáy Foucault, làm điện trở tăng cực đại, dòng Foucault suy giảm cực lớn, khiến lực hãm từ gần như triệt tiêu.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Subsection 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold text-xs sm:text-sm">
                <div className="p-4 bg-emerald-50 border-2 border-slate-800 rounded-2xl shadow-[3px_3px_0px_#1e293b] space-y-2">
                  <span className="inline-block text-[9px] text-emerald-900 font-black uppercase font-mono bg-emerald-100 px-2 py-0.5 rounded border-2 border-slate-800">ỨNG DỤNG CÓ LỢI</span>
                  <p className="text-slate-900 leading-relaxed">
                    <strong>• Phanh điện từ:</strong> Trang bị cho xe tải lớn, tàu cao tốc giúp phanh dừng cực kỳ êm ái mà không gây mòn cơ học.
                  </p>
                  <p className="text-slate-900 leading-relaxed">
                    <strong>• Bếp điện từ:</strong> Từ trường cao tần sinh dòng Foucault xoáy khép kín trực tiếp tại đáy nồi sắt từ, trực tiếp tỏa nhiệt làm chín thức ăn siêu nhanh và an toàn.
                  </p>
                </div>

                <div className="p-4 bg-rose-50 border-2 border-slate-800 rounded-2xl shadow-[3px_3px_0px_#1e293b] space-y-2">
                  <span className="inline-block text-[9px] text-rose-900 font-black uppercase font-mono bg-rose-100 px-2 py-0.5 rounded border-2 border-slate-800">TÁC HẠI & KHẮC PHỤC</span>
                  <p className="text-slate-900 leading-relaxed">
                    <strong>• Hao phí tỏa nhiệt:</strong> Trong lõi thép máy biến áp hoặc động cơ, dòng Foucault chạy xoáy sinh ra nhiệt vô ích khổng lồ, làm hỏng lớp cách điện.
                  </p>
                  <p className="text-slate-900 leading-relaxed">
                    <strong>• Biện pháp kỹ thuật:</strong> Ghép lõi bằng các lá thép mỏng silicon có phủ sơn cách điện mỏng, tăng điện trở, dập tắt dòng Foucault.
                  </p>
                </div>
              </div>
            </div>

            {/* Foucault Visual Column */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-slate-50 border-2 border-slate-800 p-5 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <div className="border-b-2 border-slate-800 pb-3">
                  <span className="text-[10px] text-amber-800 font-mono uppercase font-black tracking-wider">Minh họa 18.3: Sơ đồ thí nghiệm dòng điện Foucault</span>
                  <h4 className="text-sm font-black text-slate-950 mt-0.5">Mô hình tấm liền khối vs xẻ rãnh</h4>
                </div>

                {/* SVG Visualizing the Pendulums - LIGHT THEME */}
                <div className="grid grid-cols-2 gap-2 bg-white rounded-xl p-2 border-2 border-slate-800 shadow-inner">
                  <div className="text-center space-y-1.5 border-r border-slate-100 pr-1">
                    <span className="text-[9px] font-black text-slate-800 block">a) Tấm liền khối</span>
                    <svg viewBox="0 0 110 130" className="w-full h-auto bg-slate-50 rounded p-1 border border-slate-200">
                      {/* Pivot */}
                      <circle cx="55" cy="15" r="3" fill="#475569" />
                      {/* Pendulum rod and solid plate swinging */}
                      <g className="origin-[55px_15px] animate-[pulse_1.2s_infinite]">
                        <line x1="55" y1="15" x2="55" y2="70" stroke="#475569" strokeWidth="2.5" />
                        <rect x="35" y="70" width="40" height="40" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" opacity="0.9" />
                        
                        {/* Swirling Eddy currents inside */}
                        <circle cx="55" cy="90" r="12" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3, 3" />
                        <circle cx="55" cy="90" r="6" fill="none" stroke="#ea580c" strokeWidth="1.5" />
                      </g>
                      {/* Magnet representation */}
                      <rect x="15" y="80" width="12" height="20" fill="#ef4444" rx="1" opacity="0.4" />
                      <rect x="83" y="80" width="12" height="20" fill="#3b82f6" rx="1" opacity="0.4" />
                      <text x="55" y="122" fill="#dc2626" className="text-[9px] font-black font-mono">🛑 HÃM NHANH</text>
                    </svg>
                  </div>

                  <div className="text-center space-y-1.5 pl-1">
                    <span className="text-[9px] font-black text-slate-800 block">b) Tấm xẻ rãnh</span>
                    <svg viewBox="0 0 110 130" className="w-full h-auto bg-slate-50 rounded p-1 border border-slate-200">
                      {/* Pivot */}
                      <circle cx="55" cy="15" r="3" fill="#475569" />
                      {/* Pendulum rod and slitted plate swinging widely */}
                      <g className="origin-[55px_15px] animate-[bounce_1.5s_infinite]">
                        <line x1="55" y1="15" x2="55" y2="70" stroke="#475569" strokeWidth="2.5" />
                        
                        {/* Slitted plate shape */}
                        <path d="M 35 70 L 75 70 L 75 110 L 71 110 L 71 80 L 67 80 L 67 110 L 63 110 L 63 80 L 59 80 L 59 110 L 55 110 L 55 80 L 51 80 L 51 110 L 47 110 L 47 80 L 43 80 L 43 110 L 35 110 Z" 
                              fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" opacity="0.9" />
                        
                        {/* Eddy currents are broken and tiny */}
                        <circle cx="39" cy="75" r="2.5" fill="none" stroke="#ea580c" strokeWidth="0.75" />
                        <circle cx="55" cy="75" r="2.5" fill="none" stroke="#ea580c" strokeWidth="0.75" />
                        <circle cx="71" cy="75" r="2.5" fill="none" stroke="#ea580c" strokeWidth="0.75" />
                      </g>
                      {/* Magnet representation */}
                      <rect x="15" y="80" width="12" height="20" fill="#ef4444" rx="1" opacity="0.4" />
                      <rect x="83" y="80" width="12" height="20" fill="#3b82f6" rx="1" opacity="0.4" />
                      <text x="55" y="122" fill="#16a34a" className="text-[9px] font-black font-mono">⌛ DAO ĐỘNG LÂU</text>
                    </svg>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border-2 border-slate-800 text-xs text-slate-800 space-y-1.5 shadow-inner font-bold">
                  <p className="text-slate-950 font-black flex items-center gap-1">
                    <Info className="h-4 w-4 text-amber-600" /> Kết luận khoa học:
                  </p>
                  <p className="leading-relaxed">
                    Xẻ rãnh tạo ra sự đứt gãy về mặt hình học, ngăn cản sự hình thành các dòng xoáy Foucault lớn khép kín. Điện trở tăng cực đại dập tắt cường độ dòng Phu-cô và làm giảm đáng kể lực cản từ, giữ con lắc dao động kéo dài gấp nhiều lần.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* TRỢ LÝ AI BÀI HỌC - KHỐI 3D SƯ PHẠM */}
      <div className="bg-gradient-to-b from-indigo-50/50 to-white border-2 border-slate-800 rounded-3xl p-6 space-y-4 shadow-[4px_4px_0px_0px_#1e293b] text-slate-900 mt-6 relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
        
        <div className="relative z-10 flex items-center justify-between border-b-2 border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 border-2 border-slate-800 text-indigo-950 rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <Sparkles className="h-5 w-5 animate-pulse text-indigo-700" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide">Trợ lý Giáo viên AI - Giải đáp Bài 18</h4>
              <p className="text-[10px] text-slate-700 font-bold">Chuyên gia giải đáp kiến thức Cảm ứng điện từ & Máy biến áp • Lời nói chuẩn mực sư phạm</p>
            </div>
          </div>
          <button
            onClick={() => setMessages([
              {
                role: "model",
                content: "Thầy/Cô đã đặt lại hộp thoại. Thầy/Cô rất vui lòng được hỗ trợ các em giải đáp mọi thắc mắc liên quan đến Bài 18 và môn Vật lí!"
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
            "Tại sao lõi sắt máy biến áp cần làm bằng các lá thép silicon ghép cách điện?",
            "Lý thuyết tỉ số máy biến áp hoạt động ra sao ở chế độ không tải?",
            "Nguyên lý sạc không dây điện thoại liên quan thế nào đến cảm ứng điện từ?",
            "Dòng điện Foucault là gì và phanh từ Foucault hoạt động như thế nào?"
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
            placeholder="Đặt câu hỏi về Bài 18 và môn Vật lí..."
            className="flex-1 text-xs font-black bg-white border-2 border-slate-800 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50 shadow-[2px_2px_0px_#1e293b]"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isTyping || !inputMessage.trim()}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 border-2 border-slate-800 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-[3px_3px_0px_0px_#000] active:translate-y-[1px] active:shadow-[1.5px_1.5px_0px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Footer Learn Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 p-5 rounded-2xl border-2 border-slate-800 shadow-[4px_4px_0px_0px_#1e293b] space-y-3 font-bold text-xs sm:text-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border-2 border-slate-800 text-emerald-950 text-xs font-black tracking-wide uppercase font-mono shadow-[1.5px_1.5px_0px_#1e293b]">
            EM ĐÃ HỌC
          </span>
          <ul className="text-slate-800 space-y-2 list-disc list-inside leading-relaxed">
            <li className="flex flex-wrap items-center gap-1">Máy biến áp gồm hai cuộn sơ cấp và thứ cấp quấn trên lõi sắt kín ghép cách điện. Hoạt động dựa trên cảm ứng tương hỗ xoay chiều có tỉ số lí tưởng <strong className="text-purple-800 flex items-center"><FormattedMathText text="\frac{U_1}{U_2} = \frac{N_1}{N_2}" /></strong>.</li>
            <li>Đàn guitar điện dùng cuộn dây pickup cảm nhận dao động từ tính của dây đàn thép bị nhiễm từ để truyền tín hiệu điện xoay chiều đồng tần số ra ampli.</li>
            <li>Dòng điện Foucault là dòng cảm ứng khép kín chạy xoáy trong lòng khối vật dẫn khi chuyển động cắt qua từ trường hoặc đặt trong từ trường biến thiên.</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-5 rounded-2xl border-2 border-slate-800 shadow-[4px_4px_0px_0px_#1e293b] space-y-3 font-bold text-xs sm:text-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border-2 border-slate-800 text-purple-950 text-xs font-black tracking-wide uppercase font-mono shadow-[1.5px_1.5px_0px_#1e293b]">
            EM CÓ THỂ
          </span>
          <ul className="text-slate-800 space-y-2 list-disc list-inside leading-relaxed">
            <li>Giải thích cấu tạo, nguyên lý làm việc của máy biến thế cao áp, sạc điện thoại không dây cảm ứng và phanh điện từ của xe tải lớn.</li>
            <li>Vận dụng định luật cảm ứng điện từ Faraday để tính toán suất điện động cảm ứng của guitar điện và lý giải dao động âm cơ học.</li>
            <li>Nhận biết các biện pháp giảm thiểu hao tốn do dòng điện Phu-cô bằng cách sử dụng tôn silic ghép lá thép mỏng sơn cách điện trong công nghiệp.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
