import { useState, useRef, useEffect } from "react";
import { BookOpen, Sparkles, Brain, CheckCircle2, ArrowRight, Info, Zap, RefreshCw, Sliders, Radio, Activity, Compass, Send } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson19Textbook() {
  const [activeSubSection, setActiveSubSection] = useState<number>(0);
  
  // Interactive Capacitor state
  const [voltageRate, setVoltageRate] = useState<number>(50); // V/s
  const [plateArea, setPlateArea] = useState<number>(10); // cm^2
  
  // Interactive Wave Calculator state
  const [frequency, setFrequency] = useState<number>(100); // MHz
  const [medium, setMedium] = useState<string>("vacuum"); // vacuum, water, glass

  // AI assistant chat state
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Thầy/Cô chào các em! Thầy/Cô là Trợ lý Giáo viên AI chuyên biệt giải đáp Bài 19: Điện từ trường. Mô hình sóng điện từ. Các em có thắc mắc gì cần giải đáp liên quan đến điện trường xoáy, từ trường xoáy, dòng điện dịch, hay các đặc tính của sóng điện từ không?"
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
          mode: "lesson19"
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
      title: "I. LIÊN HỆ ĐIỆN - TỪ TRƯỜNG",
      subtitle: "Mối quan hệ hữu cơ giữa điện trường biến thiên và từ trường biến thiên",
    },
    {
      title: "II. MÔ HÌNH SÓNG ĐIỆN TỪ",
      subtitle: "Định nghĩa, sự hình thành, lan truyền và các đặc trưng của sóng điện từ",
    }
  ];

  const epsilon0 = 8.854e-12;
  const areaM2 = plateArea * 1e-4;
  const dEdt = voltageRate / 0.001;
  const displacementCurrentNano = (epsilon0 * areaM2 * dEdt * 1e9).toFixed(5);

  const getSpeed = () => {
    if (medium === "water") return 3e8 / 1.33;
    if (medium === "glass") return 3e8 / 1.5;
    return 3e8;
  };
  const speed = getSpeed();
  const freqHz = frequency * 1e6; // Convert MHz to Hz
  const wavelength = speed / freqHz;

  const getWaveType = (lambda: number) => {
    const lambdaVacuum = 3e8 / freqHz;
    if (lambdaVacuum < 0.01) return { name: "Sóng cực ngắn (Vi sóng / Radar)", desc: "Khả năng xuyên qua tầng điện ly, dùng trong thông tin vệ tinh, radar, mạng Wi-Fi." };
    if (lambdaVacuum >= 0.01 && lambdaVacuum < 10) return { name: "Sóng cực ngắn (VHF/UHF)", desc: "Ít bị tầng điện ly phản xạ, truyền thẳng, dùng cho đài FM, truyền hình TV." };
    if (lambdaVacuum >= 10 && lambdaVacuum < 100) return { name: "Sóng ngắn (HF)", desc: "Bị phản xạ mạnh giữa tầng điện ly và mặt đất, giúp truyền thông tin đi rất xa quanh Trái Đất." };
    if (lambdaVacuum >= 100 && lambdaVacuum < 1000) return { name: "Sóng trung (MF)", desc: "Ban ngày bị tầng điện ly hấp thụ mạnh, ban đêm phản xạ tốt, dùng trong phát thanh AM sóng trung." };
    return { name: "Sóng dài (LF)", desc: "Ít bị nước hấp thụ, lan truyền tốt dọc theo độ cong Trái Đất, dùng trong thông tin liên lạc dưới nước (hải quân, tàu ngầm)." };
  };

  const waveType = getWaveType(wavelength);

  return (
    <div className="space-y-8 text-slate-900 font-sans max-w-4xl mx-auto py-4 animate-fade-in" id="lesson19-textbook">
      
      {/* Textbook Header Badge */}
      <div className="border-b-2 border-slate-800 pb-6 space-y-5">
        <div className="w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 border-2 border-slate-800 text-slate-900 text-xs font-black tracking-wide uppercase mb-3 shadow-[2px_2px_0px_#1e293b]">
            <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "12s" }} /> CHƯƠNG III: TỪ TRƯỜNG
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-snug w-full block uppercase">
            BÀI 19: ĐIỆN TỪ TRƯỜNG. MÔ HÌNH SÓNG ĐIỆN TỪ
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 mt-1.5 leading-normal font-bold w-full block">
            Tìm hiểu phát kiến vĩ đại của J.C. Maxwell về mối liên hệ khăng khít giữa điện trường và từ trường biến thiên, hình thành khái niệm điện từ trường thống nhất và mô hình sóng điện từ lan truyền tự do trong không gian.
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
              Phần {idx + 1}: {idx === 0 ? "Liên hệ Điện - Từ trường" : "Mô hình Sóng điện từ"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border-2 border-slate-800 shadow-[6px_6px_0px_0px_#1e293b] rounded-3xl p-6 space-y-8">

        {/* SECTION 1: LIÊN HỆ ĐIỆN - TỪ TRƯỜNG */}
        {activeSubSection === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              
              {/* Introduction Card - Soft Cyan Background */}
              <div className="space-y-3 bg-cyan-50/70 p-5 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b]">
                <span className="inline-block text-[10px] bg-cyan-100 text-cyan-950 border-2 border-slate-800 px-3 py-1 rounded-lg font-mono font-black uppercase shadow-sm">
                  Thuyết điện từ thống nhất của Maxwell
                </span>
                <h3 className="text-lg font-black text-slate-950">{sections[0].title}</h3>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Vật lý cổ điển thế kỷ XIX đã chứng kiến một trong những hợp nhất vĩ đại nhất lịch sử khoa học: James Clerk Maxwell chứng minh rằng <strong className="text-cyan-800 font-black">điện trường</strong> và <strong className="text-purple-800 font-black">từ trường</strong> không phải là hai thực thể cô lập mà là hai mặt thể hiện song hành của một trường thống nhất - <strong className="text-slate-950 font-black">Điện từ trường</strong>.
                </p>
              </div>

              {/* Subsection 1: Từ trường biến thiên và điện trường xoáy */}
              <div className="bg-slate-50 border-2 border-slate-800 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <h4 className="text-sm font-black text-cyan-950 uppercase tracking-wide flex items-center gap-2">
                  <span className="p-1.5 bg-cyan-100 text-cyan-950 border-2 border-slate-800 rounded-xl"><BookOpen className="h-4 w-4" /></span>
                  1. Từ trường biến thiên và điện trường xoáy
                </h4>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Trong thí nghiệm cảm ứng điện từ của Faraday, khi cho một nam châm rơi xuyên qua một ống dây kín, từ thông biến thiên sinh ra dòng điện cảm ứng trong ống dây.
                </p>
                <div className="p-4 bg-white border-2 border-slate-800 rounded-xl space-y-3 shadow-[2px_2px_0px_#1e293b]">
                  <p className="text-xs text-slate-950 font-black italic border-b-2 border-slate-100 pb-1.5">Phân tích bản chất của Maxwell:</p>
                  <ul className="text-xs text-slate-800 list-disc list-inside space-y-2 pl-1 leading-relaxed font-bold">
                    <li>Sự xuất hiện dòng điện cảm ứng chứng tỏ trong dây dẫn tồn tại một lực điện làm dịch chuyển các electron tự do. Lực này do một <strong className="text-cyan-800 font-black">điện trường</strong> sinh ra.</li>
                    <li>Điện trường này có đường sức là những đường cong kín bao quanh từ trường biến thiên. Do đó, đây là một <strong className="text-cyan-800 font-black">điện trường xoáy</strong>.</li>
                    <li><strong className="text-slate-950 font-black">Kết luận:</strong> Điện trường xoáy vẫn xuất hiện ngay cả khi không có ống dây dẫn. Vai trò của ống dây chỉ giúp ta nhận biết sự hiện diện của điện trường này bằng dòng điện cảm ứng.</li>
                  </ul>
                  <div className="p-3.5 bg-cyan-50 border-2 border-slate-800 rounded-xl text-xs font-black text-cyan-950 shadow-inner leading-relaxed">
                    💡 Khái quát: Trong vùng không gian có từ trường biến thiên theo thời gian thì trong vùng đó xuất hiện một điện trường xoáy.
                  </div>
                </div>
              </div>

              {/* Subsection 2: Điện trường biến thiên và từ trường */}
              <div className="bg-purple-50/50 border-2 border-slate-800 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <h4 className="text-sm font-black text-purple-950 uppercase tracking-wide flex items-center gap-2">
                  <span className="p-1.5 bg-purple-100 text-purple-950 border-2 border-slate-800 rounded-xl"><Zap className="h-4 w-4" /></span>
                  2. Điện trường biến thiên và từ trường (Dòng điện dịch)
                </h4>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Đặt câu hỏi ngược lại: <em className="text-purple-950 font-black not-italic">Điện trường biến thiên theo thời gian có sinh ra từ trường không?</em>
                </p>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
                  Maxwell đã chứng minh rằng khi nạp điện hoặc phóng điện cho một tụ điện bằng dòng điện xoay chiều, giữa hai bản tụ xuất hiện một điện trường biến thiên. Sự biến thiên này sinh ra một từ trường có đường sức khép kín bao bọc lấy bản tụ.
                </p>
                <div className="p-4 bg-white border-2 border-slate-800 rounded-xl space-y-3 shadow-[2px_2px_0px_#1e293b]">
                  <p className="text-xs text-slate-950 font-black italic border-b-2 border-slate-100 pb-1.5">Khái niệm Dòng điện dịch (Displacement Current):</p>
                  <p className="text-xs text-slate-800 leading-relaxed font-bold">
                    Điện trường biến thiên giữa hai bản tụ hoạt động giống như một dòng điện chạy qua khoảng chân không này, sinh ra từ trường xung quanh nó. Dòng điện giả định này được gọi là <strong className="text-purple-800 font-black">dòng điện dịch (<FormattedMathText text="I_{\text{dịch}}" />)</strong>.
                  </p>
                  <div className="p-3.5 bg-purple-50 border-2 border-slate-800 rounded-xl text-xs font-black text-purple-950 shadow-inner leading-relaxed">
                    💡 Khái quát: Trong vùng không gian có điện trường biến thiên theo thời gian thì trong vùng đó xuất hiện một từ trường biến thiên. Đường sức của từ trường bao giờ cũng khép kín.
                  </div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="bg-slate-50 border-2 border-slate-800 p-5 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide flex items-center gap-2">
                  <span className="p-1.5 bg-slate-100 text-slate-950 border-2 border-slate-800 rounded-xl"><Activity className="h-4 w-4" /></span>
                  So sánh Điện trường tĩnh và Điện trường xoáy
                </h4>
                <div className="overflow-x-auto rounded-xl border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-yellow-100 text-slate-950 font-black border-b-2 border-slate-800">
                        <th className="p-3 border-r-2 border-slate-800">Đặc điểm so sánh</th>
                        <th className="p-3 border-r-2 border-slate-800 text-cyan-950">Điện trường tĩnh</th>
                        <th className="p-3 text-purple-950">Điện trường xoáy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-800 bg-white font-bold text-slate-900">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 border-r-2 border-slate-800 bg-slate-50">Nguồn gốc sinh ra</td>
                        <td className="p-3 border-r-2 border-slate-800 text-slate-700">Do các điện tích đứng yên</td>
                        <td className="p-3 text-purple-950 bg-purple-50/10">Do từ trường biến thiên theo thời gian</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 border-r-2 border-slate-800 bg-slate-50">Đường sức điện</td>
                        <td className="p-3 border-r-2 border-slate-800 text-slate-700">Đường cong hở (bắt đầu từ +, kết thúc ở - hoặc vô cực)</td>
                        <td className="p-3 text-purple-950 bg-purple-50/10">Đường cong kín, khép kín hoàn toàn</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 border-r-2 border-slate-800 bg-slate-50">Tính chất công lực điện</td>
                        <td className="p-3 border-r-2 border-slate-800 text-slate-700">Trường thế (công di chuyển trên đường kín bằng 0)</td>
                        <td className="p-3 text-purple-950 bg-purple-50/10">Trường không thế (công trên đường kín khác 0)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Interactive Widget Column */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-slate-50 border-2 border-slate-800 p-5 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <div className="border-b-2 border-slate-800 pb-3">
                  <span className="text-[10px] text-cyan-700 font-black uppercase tracking-wider font-mono">Minh họa 19.1: Sự tương hỗ Điện - Từ</span>
                  <h4 className="text-sm font-black text-slate-950 mt-1">Sự hình thành Dòng điện dịch trong tụ điện</h4>
                </div>

                {/* SVG Visualizing displacement current with high contrast light grids */}
                <div className="relative rounded-xl overflow-hidden border-2 border-slate-800 shadow-inner">
                  <svg viewBox="0 0 240 180" className="w-full h-auto bg-slate-100 p-2">
                    <rect width="100%" height="100%" fill="#f8fafc" />
                    {/* Gridlines */}
                    <path d="M 0 30 L 240 30 M 0 60 L 240 60 M 0 90 L 240 90 M 0 120 L 240 120 M 0 150 L 240 150" stroke="#cbd5e1" strokeWidth="1" />
                    <path d="M 30 0 L 30 180 M 60 0 L 60 180 M 90 0 L 90 180 M 120 0 L 120 180 M 150 0 L 150 180 M 180 0 L 180 180 M 210 0 L 210 180" stroke="#cbd5e1" strokeWidth="1" />
                    
                    {/* Left Capacitor Plate */}
                    <rect x="75" y="40" width="12" height="100" fill="#2563eb" stroke="#000" strokeWidth="2" rx="2" />
                    {/* Right Capacitor Plate */}
                    <rect x="155" y="40" width="12" height="100" fill="#dc2626" stroke="#000" strokeWidth="2" rx="2" />
                    
                    {/* Wires */}
                    <line x1="20" y1="90" x2="75" y2="90" stroke="#0f172a" strokeWidth="4" />
                    <line x1="167" y1="90" x2="220" y2="90" stroke="#0f172a" strokeWidth="4" />
                    
                    {/* Charge indicators */}
                    <text x="54" y="55" fill="#1e3a8a" className="text-[13px] font-black">+</text>
                    <text x="54" y="95" fill="#1e3a8a" className="text-[13px] font-black">+</text>
                    <text x="54" y="135" fill="#1e3a8a" className="text-[13px] font-black">+</text>
                    
                    <text x="185" y="55" fill="#7f1d1d" className="text-[13px] font-black">-</text>
                    <text x="185" y="95" fill="#7f1d1d" className="text-[13px] font-black">-</text>
                    <text x="185" y="135" fill="#7f1d1d" className="text-[13px] font-black">-</text>

                    {/* Electric Field Vectors between plates */}
                    <path d="M 91 60 L 149 60" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="4,2" markerEnd="url(#arrow-blue)" />
                    <path d="M 91 90 L 149 90" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="4,2" markerEnd="url(#arrow-blue)" />
                    <path d="M 91 120 L 149 120" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="4,2" markerEnd="url(#arrow-blue)" />
                    
                    {/* Rotating Magnetic Field induced */}
                    <ellipse cx="120" cy="90" rx="25" ry="50" fill="none" stroke="#7e22ce" strokeWidth="2.5" strokeDasharray="6,3" />
                    <polygon points="115,38 123,40 115,42" fill="#7e22ce" stroke="#000" strokeWidth="1" />
                    <polygon points="125,138 117,140 125,142" fill="#7e22ce" stroke="#000" strokeWidth="1" />

                    {/* Labels */}
                    <text x="120" y="25" fill="#0369a1" textAnchor="middle" className="text-[10px] font-mono font-black bg-white">Điện trường E(t)</text>
                    <text x="120" y="166" fill="#6b21a8" textAnchor="middle" className="text-[10px] font-mono font-black">Từ trường B</text>
                    <text x="22" y="78" fill="#0f172a" className="text-[8.5px] font-sans font-black">Dòng xoay chiều I</text>

                    {/* Define markers */}
                    <defs>
                      <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 2 L 8 5 L 0 8 z" fill="#0284c7" />
                      </marker>
                    </defs>
                  </svg>
                </div>

                {/* Simulation controls for capacitor */}
                <div className="space-y-4 bg-white p-4 border-2 border-slate-800 rounded-xl shadow-inner text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-slate-800">
                      <span className="font-bold flex items-center gap-1">Tốc độ biến thiên điện thế (<FormattedMathText text="\frac{dU}{dt}" />):</span>
                      <span className="text-cyan-800 font-mono font-black">{voltageRate} V/s</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={voltageRate}
                      onChange={(e) => setVoltageRate(parseInt(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-slate-800">
                      <span className="font-bold flex items-center gap-1">Diện tích bản tụ (<FormattedMathText text="S" />):</span>
                      <span className="text-purple-850 font-mono font-black">{plateArea} cm²</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="30"
                      value={plateArea}
                      onChange={(e) => setPlateArea(parseInt(e.target.value))}
                      className="w-full accent-purple-650 cursor-pointer"
                    />
                  </div>

                  {/* Calculations Result in Bright Yellow Neobrutalist Block */}
                  <div className="border-2 border-slate-800 text-center bg-yellow-100 rounded-xl p-3 shadow-inner">
                    <span className="text-[10px] text-slate-800 uppercase tracking-wider font-extrabold block flex items-center justify-center gap-1">Dòng điện dịch lý thuyết (<FormattedMathText text="I_{\text{dịch}}" />)</span>
                    <div className="text-lg font-black text-slate-950 font-mono mt-0.5">
                      {displacementCurrentNano} <span className="text-xs text-slate-700 font-black">nA</span>
                    </div>
                    <p className="text-[10px] text-slate-900 mt-1 leading-normal font-bold">
                      Sinh ra từ trường tròn hệt như dòng điện trong dây dẫn!
                    </p>
                  </div>
                </div>
              </div>

              {/* Warning/Alert box */}
              <div className="p-4 bg-amber-100 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b] space-y-2">
                <span className="text-xs text-amber-950 font-black uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-amber-900" /> Bản chất thống nhất
                </span>
                <p className="text-xs text-slate-900 leading-relaxed font-bold">
                  Tại mọi điểm trong không gian nơi điện từ trường tồn tại, vectơ cường độ điện trường <FormattedMathText text="\vec{E}" /> và vectơ cảm ứng từ <FormattedMathText text="\vec{B}" /> luôn có phương vuông góc với nhau:
                  <span className="block text-center text-slate-950 font-black my-1.5 text-xs bg-white py-1.5 rounded border-2 border-slate-800 shadow-inner flex justify-center items-center gap-1">
                    <FormattedMathText text="\vec{E} \perp \vec{B}" />
                  </span>
                  Sự thay đổi liên tục tuần hoàn của trường này là hạt nhân sinh ra các bức xạ điện từ xung quanh ta.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: MÔ HÌNH SÓNG ĐIỆN TỪ */}
        {activeSubSection === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              
              {/* Info Card */}
              <div className="space-y-3 bg-purple-50/70 p-5 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b]">
                <span className="inline-block text-[10px] bg-purple-100 text-purple-950 border-2 border-slate-800 px-3 py-1 rounded-lg font-mono font-black uppercase shadow-sm">
                  Bức xạ điện từ & Thang vô tuyến
                </span>
                <h3 className="text-lg font-black text-slate-950">{sections[1].title}</h3>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Khi một điện trường biến thiên sinh ra từ trường biến thiên lân cận, rồi chính từ trường này lại sinh ra điện trường biến thiên ở vùng lân cận tiếp theo... Chuỗi lan truyền liên hoàn tương hỗ này tách khỏi nguồn phát và lan toả tự do dưới dạng sóng ngang trong không gian được gọi là <strong className="text-cyan-800 font-black">Sóng điện từ</strong>.
                </p>
              </div>

              {/* Subsection 1 */}
              <div className="bg-slate-50 border-2 border-slate-800 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <h4 className="text-sm font-black text-purple-950 uppercase tracking-wide flex items-center gap-2">
                  <span className="p-1.5 bg-purple-100 text-purple-950 border-2 border-slate-800 rounded-xl"><BookOpen className="h-4 w-4" /></span>
                  1. Đặc trưng vật lý cơ bản
                </h4>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                  Tại mỗi điểm bất kỳ trên phương truyền sóng của một sóng điện từ:
                </p>
                <ul className="text-xs sm:text-sm text-slate-900 list-none space-y-3.5 pl-1 leading-relaxed font-bold">
                  <li className="flex gap-2.5 items-start">
                    <span className="px-2 py-0.5 bg-cyan-100 border-2 border-slate-800 rounded-lg text-cyan-950 text-xs font-black shadow-[1.5px_1.5px_0px_0px_#000] mt-0.5">1</span>
                    <div>
                      <strong className="text-slate-950">Tính chất sóng ngang:</strong> Vectơ cường độ điện trường <FormattedMathText text="\vec{E}" />, vectơ cảm ứng từ <FormattedMathText text="\vec{B}" /> và vectơ vận tốc truyền sóng <FormattedMathText text="\vec{v}" /> đôi một vuông góc với nhau và tạo thành một <strong className="text-slate-950">tam diện thuận</strong>.
                    </div>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="px-2 py-0.5 bg-purple-100 border-2 border-slate-800 rounded-lg text-purple-950 text-xs font-black shadow-[1.5px_1.5px_0px_0px_#000] mt-0.5">2</span>
                    <div>
                      <strong className="text-slate-950">Sự đồng pha:</strong> Tại mỗi thời điểm, khi điện trường <FormattedMathText text="E" /> đạt cực đại thì từ trường <FormattedMathText text="B" /> tại điểm đó cũng đạt cực đại; khi <FormattedMathText text="E" /> bằng không thì <FormattedMathText text="B" /> cũng bằng không. Chúng biến thiên điều hòa <strong className="text-amber-800">cùng pha</strong>, mặc dù phương dao động của chúng vuông góc nhau.
                    </div>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="px-2 py-0.5 bg-emerald-100 border-2 border-slate-800 rounded-lg text-emerald-950 text-xs font-black shadow-[1.5px_1.5px_0px_0px_#000] mt-0.5">3</span>
                    <div>
                      <strong className="text-slate-950">Khả năng truyền trong chân không:</strong> Khác biệt cốt lõi với sóng cơ học (cần môi trường đàn hồi), sóng điện từ lan truyền hoàn hảo trong chân không với vận tốc ánh sáng cực đại <FormattedMathText text="c \approx 3 \cdot 10^8\text{ m/s}" />.
                    </div>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="px-2 py-0.5 bg-rose-100 border-2 border-slate-800 rounded-lg text-rose-950 text-xs font-black shadow-[1.5px_1.5px_0px_0px_#000] mt-0.5">4</span>
                    <div>
                      <strong className="text-slate-950">Mang năng lượng:</strong> Năng lượng của sóng điện từ tỉ lệ thuận với lũy thừa bậc cao của tần số (<FormattedMathText text="f^4" />). Sóng có tần số càng lớn thì khả năng đâm xuyên càng mạnh, lan truyền càng xa.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Formula and Speed in medium */}
              <div className="bg-emerald-50/50 border-2 border-slate-800 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wide flex items-center gap-2">
                  <span className="p-1.5 bg-emerald-100 text-emerald-950 border-2 border-slate-800 rounded-xl"><Radio className="h-4 w-4" /></span>
                  Hệ thức bước sóng trong môi trường
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
                  Bước sóng trong chân không là <FormattedMathText text="\lambda = \frac{c}{f} = c \cdot T" />. Khi lan truyền qua môi trường có chiết suất <FormattedMathText text="n" />, tốc độ giảm xuống thành <FormattedMathText text="v = \frac{c}{n}" />, do đó bước sóng cũng giảm tương ứng trong khi tần số <FormattedMathText text="f" /> không đổi:
                </p>
                <div className="bg-emerald-100 border-2 border-slate-800 p-4 rounded-xl text-center text-sm sm:text-base text-emerald-950 shadow-inner flex justify-center items-center">
                  <FormattedMathText text="\lambda_{môi_trường} = \frac{v}{f} = \frac{c}{n \cdot f} = \frac{\lambda_{chân_không}}{n}" />
                </div>
              </div>
            </div>

            {/* Interactive Wave Widget */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-slate-50 border-2 border-slate-800 p-5 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b] space-y-4">
                <div className="border-b-2 border-slate-800 pb-3">
                  <span className="text-[10px] text-purple-700 font-black uppercase tracking-wider font-mono">Minh họa 19.2: Công cụ Phân tích Sóng Vô tuyến</span>
                  <h4 className="text-sm font-black text-slate-950 mt-1">Tính toán bước sóng & Phân dải sóng</h4>
                </div>

                {/* Input Controls */}
                <div className="space-y-4 bg-white p-4 border-2 border-slate-800 rounded-xl shadow-inner text-xs font-bold">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-slate-800">
                      <span className="flex items-center gap-1">Tần số hoạt động (<FormattedMathText text="f" />):</span>
                      <span className="text-cyan-800 font-mono font-black">{frequency} MHz</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="300"
                      value={frequency}
                      onChange={(e) => setFrequency(parseInt(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[8px] text-slate-500 font-black font-mono">
                      <span>1 MHz</span>
                      <span>150 MHz</span>
                      <span>300 MHz</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-slate-800 block font-bold">Môi trường truyền sóng:</span>
                    <div className="grid grid-cols-1 gap-1.5">
                      <button
                        onClick={() => setMedium("vacuum")}
                        className={`py-2 px-3 rounded-xl text-[10px] font-black border-2 transition-all transform active:scale-95 cursor-pointer flex justify-between items-center ${
                          medium === "vacuum"
                            ? "bg-cyan-100 text-cyan-950 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b]"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-800 hover:text-slate-950"
                        }`}
                      >
                        <span>Chân không</span>
                        <span className="font-mono text-[9px]">n = 1.00</span>
                      </button>
                      <button
                        onClick={() => setMedium("water")}
                        className={`py-2 px-3 rounded-xl text-[10px] font-black border-2 transition-all transform active:scale-95 cursor-pointer flex justify-between items-center ${
                          medium === "water"
                            ? "bg-cyan-100 text-cyan-950 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b]"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-800 hover:text-slate-950"
                        }`}
                      >
                        <span>Nước sạch</span>
                        <span className="font-mono text-[9px]">n = 1.33</span>
                      </button>
                      <button
                        onClick={() => setMedium("glass")}
                        className={`py-2 px-3 rounded-xl text-[10px] font-black border-2 transition-all transform active:scale-95 cursor-pointer flex justify-between items-center ${
                          medium === "glass"
                            ? "bg-cyan-100 text-cyan-950 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b]"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-800 hover:text-slate-950"
                        }`}
                      >
                        <span>Thủy tinh</span>
                        <span className="font-mono text-[9px]">n = 1.50</span>
                      </button>
                    </div>
                  </div>

                  {/* Calculation Result */}
                  <div className="border-t-2 border-slate-800 pt-3 mt-1 space-y-3 bg-yellow-50 rounded-xl p-3 border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-700 uppercase tracking-wider font-extrabold flex items-center gap-1">Vận tốc lan truyền (<FormattedMathText text="v" />):</span>
                      <span className="font-mono text-slate-950 font-black">{(speed / 1000).toLocaleString()} km/s</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] border-t border-dashed border-slate-300 pt-2">
                      <span className="text-slate-700 uppercase tracking-wider font-extrabold flex items-center gap-1">Bước sóng (<FormattedMathText text="\lambda" />):</span>
                      <span className="font-mono text-cyan-800 font-black text-sm">{wavelength.toFixed(2)} m</span>
                    </div>

                    <div className="p-3 bg-white border-2 border-slate-800 rounded-xl space-y-1">
                      <span className="text-[9px] text-amber-800 font-black uppercase tracking-wider block">Phân vùng vô tuyến tương ứng:</span>
                      <span className="text-xs font-black text-slate-950 block">{waveType.name}</span>
                      <p className="text-[10px] text-slate-700 leading-relaxed font-semibold">{waveType.desc}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Utility practical applications box */}
              <div className="p-4 bg-emerald-50 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#1e293b] space-y-2">
                <span className="text-xs text-emerald-950 font-black uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-emerald-800" /> Ứng dụng thực tiễn cao
                </span>
                <p className="text-xs text-slate-900 leading-relaxed font-bold">
                  Sóng vô tuyến đóng vai trò huyết mạch trong chuyển đổi số toàn cầu. Nhờ sự phản xạ liên hoàn của sóng ngắn (HF) trên tầng điện ly, ta có thể phát thanh xuyên quốc gia mà không cần vệ tinh. Trong khi đó sóng cực ngắn (UHF/VHF) cho phép truyền băng thông lớn như mạng 4G/5G, vệ tinh và truyền hình số.
                </p>
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
              <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide">Trợ lý Giáo viên AI - Giải đáp Bài 19</h4>
              <p className="text-[10px] text-slate-700 font-bold">Chuyên gia giải đáp kiến thức Điện từ trường & Sóng điện từ • Lời nói chuẩn mực sư phạm</p>
            </div>
          </div>
          <button
            onClick={() => setMessages([
              {
                role: "model",
                content: "Thầy/Cô đã đặt lại hộp thoại. Thầy/Cô rất vui lòng được hỗ trợ các em giải đáp mọi thắc mắc liên quan đến Bài 19 và môn Vật lí!"
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
                    ? "bg-indigo-600 text-white rounded-tr-none"
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
            "Tại sau cường độ điện trường E và cảm ứng từ B lại vuông góc nhưng đồng pha?",
            "Làm thế nào để phân biệt điện trường tĩnh và điện trường xoáy?",
            "Dòng điện dịch là gì và nó xuất hiện ở đâu trong mạch điện?",
            "Tại sao sóng ngắn HF lại có thể truyền đi rất xa quanh Trái Đất?"
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
            placeholder="Đặt câu hỏi về Bài 19 và môn Vật lí..."
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

      {/* Summary Box */}
      <div className="bg-emerald-100 border-2 border-slate-800 shadow-[6px_6px_0px_0px_#1e293b] p-5 rounded-3xl flex items-start gap-4">
        <span className="p-2 bg-white border-2 border-slate-800 rounded-xl shadow-sm"><Brain className="h-5 w-5 shrink-0 text-emerald-800" /></span>
        <div className="space-y-1.5">
          <span className="text-xs text-emerald-950 font-black uppercase tracking-wider font-mono block">Tóm tắt kiến thức cốt lõi</span>
          <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-bold">
            Điện từ trường là một trường thống nhất gồm 2 thành phần biến thiên xoáy chặt chẽ: từ trường biến thiên sinh điện trường xoáy và ngược lại. Sóng điện từ là sự lan truyền của điện từ trường này trong không gian. Nó là sóng ngang, có tính chất đồng pha giữa cường độ điện trường <FormattedMathText text="E" /> và cảm ứng từ <FormattedMathText text="B" />, truyền được trong chân không với vận tốc <FormattedMathText text="c \approx 3 \cdot 10^8\text{ m/s}" /> và mang năng lượng dồi dào.
          </p>
        </div>
      </div>
    </div>
  );
}
