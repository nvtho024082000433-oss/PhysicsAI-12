import React, { useState, useEffect, useRef } from "react";
import { Compass, Lightbulb, HelpCircle, Eye, Layers, ArrowRight, Info, Award, Sparkles, RefreshCw, Send } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson15Textbook() {
  const [activeSubTab, setActiveSubTab] = useState<"experiment" | "formula" | "practical" | "maglev">("experiment");

  // AI Assistant State
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Thầy/Cô chào các em! Thầy/Cô là Giáo viên Trợ lý ảo AI chuyên sâu về Bài 15: Lực từ. Cảm ứng từ. Các em có thắc mắc gì cần Thầy/Cô giải đáp về lực từ, lực Ampere, độ lớn cảm ứng từ B, quy tắc bàn tay trái, đòn cân dòng điện, hay hoạt động nâng hạ tàu cao tốc Maglev không?"
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
          mode: "lesson15"
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
    <div className="space-y-8 text-slate-950 font-sans max-w-4xl mx-auto py-4 animate-fade-in">
      {/* Textbook Header Badge */}
      <div className="border-b-2 border-slate-900 pb-6 space-y-5">
        <div className="w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 border-2 border-cyan-400 text-cyan-950 text-xs font-black tracking-wide uppercase mb-3">
            <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "12s" }} /> CHƯƠNG III: TỪ TRƯỜNG
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-snug w-full block">
            BÀI 15: LỰC TỪ. CẢM ỨNG TỪ
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 mt-1.5 leading-normal font-bold w-full block">
            Sách Giáo Khoa Vật lí lớp 12 — Chương trình Giáo dục phổ thông mới 2018
          </p>
        </div>
        
        {/* Textbook Navigation Subtabs */}
        <div className="flex flex-wrap bg-slate-200 p-1.5 rounded-2xl border-2 border-slate-900 gap-1.5 select-none w-full shadow-[4px_4px_0px_0px_#000]">
          <button
            onClick={() => setActiveSubTab("experiment")}
            className={`px-3 py-2 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer ${
              activeSubTab === "experiment"
                ? "bg-white text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-950"
                : "text-slate-800 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            I. Thí nghiệm lực từ
          </button>
          <button
            onClick={() => setActiveSubTab("formula")}
            className={`px-3 py-2 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer ${
              activeSubTab === "formula"
                ? "bg-white text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-950"
                : "text-slate-800 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            II. Định luật Ampere
          </button>
          <button
            onClick={() => setActiveSubTab("practical")}
            className={`px-3 py-2 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer ${
              activeSubTab === "practical"
                ? "bg-white text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-950"
                : "text-slate-800 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            III. Thực hành đo B
          </button>
          <button
            onClick={() => setActiveSubTab("maglev")}
            className={`px-3 py-2 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer ${
              activeSubTab === "maglev"
                ? "bg-white text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-950"
                : "text-slate-800 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            IV. Tàu đệm từ Maglev
          </button>
        </div>
      </div>

      {/* Opening Question Box */}
      <div className="bg-violet-50 p-6 rounded-3xl border-2 border-slate-900 relative overflow-hidden shadow-[4px_4px_0px_0px_#0f172a]">
        <div className="absolute top-0 right-0 p-8 text-violet-200/50 pointer-events-none text-7xl font-mono select-none">
          ?
        </div>
        <p className="text-slate-950 italic text-sm leading-relaxed relative z-10 font-bold">
          "Khi cho dòng điện chạy qua khung dây đặt trong từ trường của một nam châm, khung dây sẽ chịu tác dụng lực như thế nào? Làm sao đo được độ lớn cảm ứng từ B bằng phương pháp đòn cân dòng điện thực tế? Nguyên lí nâng hạ tàu cao tốc Maglev bằng lực từ hoạt động ra sao?"
        </p>
      </div>

      {/* SUBTAB 1: THÍ NGHIỆM LỰC TỪ */}
      {activeSubTab === "experiment" && (
        <div className="space-y-6 animate-fade-in">
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-950 flex items-center gap-2 tracking-tight">
              <span className="text-cyan-600 font-mono">I.</span> THÍ NGHIỆM KHẢO SÁT LỰC TỪ
            </h2>
            <p className="text-slate-900 text-sm leading-relaxed font-bold">
              Để khảo sát định tính lực từ tác dụng lên đoạn dây dẫn mang dòng điện, sách giáo khoa hướng dẫn thiết lập hệ thống thí nghiệm gồm nam châm chữ U và đoạn dây dẫn treo tự do vuông góc với đường sức từ.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box A: Experiment description */}
            <div className="bg-amber-50/70 border-2 border-slate-900 rounded-3xl p-6 space-y-4 shadow-[4px_4px_0px_0px_#0f172a] text-slate-950">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-900/10">
                <span className="text-[10px] font-mono font-black bg-amber-200 border-2 border-slate-900 text-slate-950 px-2.5 py-1 rounded-md shadow-[1.5px_1.5px_0px_0px_#000]">Hình 15.1</span>
                <h3 className="text-sm font-black text-slate-950">Mô phỏng đòn cân lực từ</h3>
              </div>

              <div className="bg-white rounded-2xl p-3 h-48 flex items-center justify-center relative overflow-hidden border-2 border-slate-900 shadow-inner">
                <svg className="w-full h-full" viewBox="0 0 200 130">
                  <rect width="100%" height="100%" fill="#fcfcfc" rx="4" />
                  {/* Stand */}
                  <line x1="30" y1="110" x2="170" y2="110" stroke="#0f172a" strokeWidth="4" />
                  <line x1="100" y1="110" x2="100" y2="40" stroke="#0f172a" strokeWidth="3" />
                  {/* Balance beam */}
                  <line x1="60" y1="40" x2="140" y2="40" stroke="#334155" strokeWidth="3" />
                  {/* Weight block (3) */}
                  <rect x="52" y="30" width="10" height="15" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.5" rx="1" />
                  <text x="55" y="41" fill="#000" className="text-[7px] font-black font-mono">(3)</text>
                  {/* Hanging wire frame */}
                  <line x1="130" y1="40" x2="130" y2="80" stroke="#334155" strokeWidth="1.5" />
                  <rect x="115" y="80" width="30" height="25" fill="none" stroke="#b45309" strokeWidth="2.5" />
                  <text x="126" y="96" fill="#b45309" className="text-[8px] font-black font-mono">(10)</text>
                  {/* Electromagnet poles */}
                  <rect x="110" y="95" width="8" height="15" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
                  <rect x="142" y="95" width="8" height="15" fill="#2563eb" stroke="#0f172a" strokeWidth="1.5" />
                  {/* Digital Meter indicator */}
                  <rect x="78" y="55" width="18" height="20" fill="#0f172a" stroke="#0f172a" strokeWidth="1" />
                  <line x1="87" y1="40" x2="87" y2="55" stroke="#0f172a" strokeWidth="1" />
                  <text x="80" y="67" fill="#10b981" className="text-[7px] font-mono font-black">0.12</text>
                  <text x="81" y="73" fill="#94a3b8" className="text-[5px] font-mono font-black">(11)</text>
                </svg>
              </div>

              <div className="text-xs text-slate-900 leading-relaxed font-bold space-y-1.5">
                <p>
                  Bộ cân dòng điện gồm cuộn dây mang dòng điện chịu lực đẩy của nam châm vĩnh cửu. Sự mất cân bằng cơ học truyền qua trục cân và lực kế điện tử chỉ số trực tiếp cường độ lực từ F.
                </p>
              </div>
            </div>

            {/* Box B: Left hand rule description */}
            <div className="bg-sky-50/70 border-2 border-slate-900 rounded-3xl p-6 space-y-4 shadow-[4px_4px_0px_0px_#0f172a] text-slate-950">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-900/10">
                <span className="text-[10px] font-mono font-black bg-sky-200 border-2 border-slate-900 text-slate-950 px-2.5 py-1 rounded-md shadow-[1.5px_1.5px_0px_0px_#000]">Hình 15.2</span>
                <h3 className="text-sm font-black text-slate-950">Quy tắc bàn tay trái</h3>
              </div>

              <div className="bg-white rounded-2xl p-3 h-48 flex items-center justify-center relative overflow-hidden border-2 border-slate-900 shadow-inner">
                <svg className="w-full h-full" viewBox="0 0 200 130">
                  <rect width="100%" height="100%" fill="#fcfcfc" rx="4" />
                  {/* B field lines arrow downwards */}
                  <line x1="100" y1="15" x2="100" y2="70" stroke="#0284c7" strokeWidth="2.5" />
                  <polygon points="96,60 100,70 104,60" fill="#0284c7" />
                  <text x="106" y="32" fill="#0284c7" className="text-[10px] font-black font-mono">B (Cảm ứng từ)</text>

                  {/* Wire line with current to the right */}
                  <line x1="20" y1="80" x2="180" y2="80" stroke="#b45309" strokeWidth="3" />
                  <polygon points="160,76 170,80 160,84" fill="#b45309" />
                  <text x="145" y="94" fill="#b45309" className="text-[9px] font-black font-mono">I (Dòng điện)</text>

                  {/* Resulting force vector pointing upwards */}
                  <line x1="100" y1="80" x2="60" y2="40" stroke="#059669" strokeWidth="3" />
                  <polygon points="68,43 58,38 63,48" fill="#059669" />
                  <text x="42" y="30" fill="#059669" className="text-[10px] font-black font-mono">F (Lực từ)</text>
                  
                  {/* Left hand schematic */}
                  <path d="M 60,95 Q 85,85 110,95 L 120,110 L 50,110 Z" fill="rgba(148, 163, 184, 0.25)" stroke="#0f172a" strokeWidth="1.5" />
                  <text x="64" y="105" fill="#0f172a" className="text-[8px] font-black uppercase font-mono">Bàn tay trái mở rộng</text>
                </svg>
              </div>

              <div className="text-xs text-slate-900 leading-relaxed font-bold space-y-1.5">
                <p>
                  <span className="flex items-center flex-wrap gap-1">
                <strong>Quy tắc bàn tay trái:</strong> Đặt bàn tay trái sao cho các đường cảm ứng từ hứng vào lòng bàn tay, chiều từ cổ tay đến các ngón tay giữa dọc theo dòng điện <FormattedMathText text="$I$" />. Ngón tay cái choãi ra <FormattedMathText text="$90^\circ$" /> chỉ chiều của lực từ <FormattedMathText text="$F$" />.
              </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border-2 border-slate-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_#0f172a] space-y-3 text-slate-950">
            <h4 className="text-sm font-black text-slate-950 flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4 text-emerald-700 shrink-0" /> KẾT LUẬN THÍ NGHIỆM:
            </h4>
            <div className="text-slate-950 text-xs leading-relaxed font-black flex items-center flex-wrap gap-1">
              Phương của lực từ tác dụng lên đoạn dây dẫn mang dòng điện luôn <span className="text-red-700 font-black underline">vuông góc đồng thời</span> với cả đoạn dây dẫn (phương dòng điện) và đường sức từ (phương cảm ứng từ <FormattedMathText text="$\vec{B}$" />).
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: ĐỊNH LUẬT AMPERE */}
      {activeSubTab === "formula" && (
        <div className="space-y-6 animate-fade-in text-sm text-slate-900 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-950 flex items-center gap-2 tracking-tight">
              <span className="text-cyan-600 font-mono">II.</span> ĐỊNH LUẬT AMPERE VÀ CẢM ỨNG TỪ B
            </h2>
            <p className="text-slate-900 text-xs font-bold">
              Định luật Ampere mô tả định lượng lực từ tác dụng lên một đoạn dây dẫn thẳng có độ dài L mang dòng điện cường độ I đặt vuông góc hoặc tạo góc α so với từ trường đều B.
            </p>
          </section>

          {/* Math formula highlight block */}
          <div className="bg-cyan-50 border-2 border-slate-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_#0f172a] text-center space-y-3">
            <span className="text-[10px] text-cyan-950 font-black tracking-wider uppercase block">Công thức định lượng Ampere</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-950 py-2">
              <FormattedMathText text="$$F = B \cdot I \cdot L \cdot \sin\alpha$$" />
            </div>
            <div className="text-xs sm:text-sm text-cyan-950 font-black py-1">
              <FormattedMathText text="$$B = \frac{F}{I \cdot L \cdot \sin\alpha}$$" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-slate-50 border-2 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_#0f172a] text-slate-950 space-y-3">
              <h4 className="text-sm font-black text-slate-950 uppercase border-b-2 border-slate-900/10 pb-1">Chú giải đại lượng:</h4>
              <ul className="space-y-2 text-xs font-bold leading-relaxed">
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span><FormattedMathText text="$F$ : Lực từ tác dụng lên dây, đơn vị là Newton ($N$)." /></span>
                </li>
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span><FormattedMathText text="$B$ : Độ lớn cảm ứng từ của từ trường, đơn vị là Tesla ($T$)." /></span>
                </li>
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span><FormattedMathText text="$I$ : Cường độ dòng điện qua dây dẫn, đơn vị là Ampe ($A$)." /></span>
                </li>
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span><FormattedMathText text="$L$ : Độ dài phần dây đặt trong từ trường, đơn vị là Mét ($m$)." /></span>
                </li>
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span><FormattedMathText text="$\alpha$ : Góc hợp bởi đoạn dòng điện và vectơ cảm ứng từ $\vec{B}$." /></span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-50 border-2 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_#0f172a] text-slate-950 space-y-3">
              <h4 className="text-sm font-black text-slate-950 uppercase border-b-2 border-slate-900/10 pb-1">Hai trường hợp cực đoan đặc trưng:</h4>
              <ul className="space-y-3 text-xs font-bold leading-relaxed">
                <li className="space-y-1">
                  <div className="text-slate-950 font-bold">
                    <FormattedMathText text="• Dây song song đường sức từ ($\alpha = 0^\circ$ hoặc $\alpha = 180^\circ$):" />
                  </div>
                  <p className="pl-4 text-rose-800 font-extrabold">
                    <FormattedMathText text="Lực từ triệt tiêu hoàn toàn ($F = 0$)." />
                  </p>
                </li>
                <li className="space-y-1">
                  <div className="text-slate-950 font-bold">
                    <FormattedMathText text="• Dây vuông góc đường sức từ ($\alpha = 90^\circ$):" />
                  </div>
                  <p className="pl-4 text-emerald-800 font-extrabold">
                    <FormattedMathText text="Lực từ đạt cực đại ($F_{\text{max}} = B \cdot I \cdot L$)." />
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: THỰC HÀNH ĐO B */}
      {activeSubTab === "practical" && (
        <div className="space-y-6 animate-fade-in text-sm text-slate-900 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-950 flex items-center gap-2 tracking-tight">
              <span className="text-cyan-600 font-mono">III.</span> THỰC HÀNH ĐO ĐỘ LỚN CẢM ỨNG TỪ B
            </h2>
            <p className="text-slate-900 text-xs font-bold">
              Để đo chính xác độ lớn cảm ứng từ B của nam châm trong phòng thí nghiệm, học sinh thực hiện điều chỉnh cường độ dòng điện I tăng dần và đo lực từ F tương ứng, sau đó dựng đồ thị tuyến tính.
            </p>
          </section>

          {/* Table representing actual data */}
          <div className="bg-emerald-50 border-2 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_#0f172a] text-slate-950 space-y-4">
            <h3 className="font-black text-slate-950 text-xs text-center uppercase tracking-wider flex items-center justify-center gap-1.5">
              Bảng số liệu mẫu thực tế thí nghiệm (Với <FormattedMathText text="$L = 10\text{ cm}$" />, <FormattedMathText text="$n = 200$" /> vòng)
            </h3>
            <div className="overflow-x-auto border-2 border-slate-900 rounded-2xl bg-white">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-left border-b-2 border-slate-900">
                    <th className="p-3 border-r-2 border-slate-900 text-slate-950 font-black">Lần đo</th>
                    <th className="p-3 border-r-2 border-slate-900 text-slate-950 font-black">
                      <div className="flex items-center gap-1">
                        Cường độ dòng điện <FormattedMathText text="$I\text{ (A)}$" />
                      </div>
                    </th>
                    <th className="p-3 border-r-2 border-slate-900 text-slate-950 font-black text-amber-900">
                      <div className="flex items-center gap-1">
                        Lực từ <FormattedMathText text="$F\text{ (N)}$" />
                      </div>
                    </th>
                    <th className="p-3 text-slate-950 font-black text-cyan-900">
                      <div className="flex items-center gap-1">
                        Cảm ứng từ <FormattedMathText text="$B\text{ (T)}$" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="font-bold text-slate-950">
                  <tr className="border-b-2 border-slate-900">
                    <td className="p-3 border-r-2 border-slate-900">1</td>
                    <td className="p-3 border-r-2 border-slate-900 font-mono">0.10</td>
                    <td className="p-3 border-r-2 border-slate-900 font-mono text-amber-950">0.023</td>
                    <td className="p-3 font-mono text-cyan-950">0.0115</td>
                  </tr>
                  <tr className="border-b-2 border-slate-900">
                    <td className="p-3 border-r-2 border-slate-900">2</td>
                    <td className="p-3 border-r-2 border-slate-900 font-mono">0.20</td>
                    <td className="p-3 border-r-2 border-slate-900 font-mono text-amber-950">0.046</td>
                    <td className="p-3 font-mono text-cyan-950">0.0115</td>
                  </tr>
                  <tr className="border-b-2 border-slate-900">
                    <td className="p-3 border-r-2 border-slate-900">3</td>
                    <td className="p-3 border-r-2 border-slate-900 font-mono">0.30</td>
                    <td className="p-3 border-r-2 border-slate-900 font-mono text-amber-950">0.069</td>
                    <td className="p-3 font-mono text-cyan-950">0.0115</td>
                  </tr>
                  <tr className="border-slate-900">
                    <td className="p-3 border-r-2 border-slate-900">4</td>
                    <td className="p-3 border-r-2 border-slate-900 font-mono">0.40</td>
                    <td className="p-3 border-r-2 border-slate-900 font-mono text-amber-950">0.092</td>
                    <td className="p-3 font-mono text-cyan-950">0.0115</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-[11px] text-slate-800 italic leading-relaxed text-center font-bold">
              <FormattedMathText text="* **Nhận xét:** Thương số $\frac{F}{I}$ luôn không đổi và có độ ổn định cực cao. Độ dốc đồ thị tuyến tính $F(I)$ bằng $B \cdot L$ giúp loại trừ sai số ngẫu nhiên của một phép đo đơn lẻ." />
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: TÀU ĐỆM TỪ MAGLEV */}
      {activeSubTab === "maglev" && (
        <div className="space-y-6 animate-fade-in text-sm text-slate-900 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-950 flex items-center gap-2 tracking-tight">
              <span className="text-cyan-600 font-mono">IV.</span> CÔNG NGHỆ TÀU ĐỆM TỪ MAGLEV SIÊU DẪN
            </h2>
            <p className="text-slate-900 text-xs font-bold">
              Tàu đệm từ trường (Maglev) sử dụng lực tương tác đẩy/hút mạnh mẽ giữa các nam châm siêu dẫn để nâng bổng toàn bộ thân tàu lên cao, loại bỏ hoàn toàn ma sát bánh sắt giúp tàu đạt vận tốc phi thường.
            </p>
          </section>

          {/* Sơ đồ vẽ mô tả tàu đệm từ theo phong cách sư phạm khoa học */}
          <div className="bg-slate-950 text-white border-2 border-slate-900 rounded-3xl p-5 shadow-[5px_5px_0px_0px_#0f172a] space-y-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-25 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-[10px] font-mono font-black text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                Mặt cắt đứng: Tàu đệm từ siêu dẫn Nhật Bản (SCMAGLEV)
              </span>
              
              <svg className="w-full max-w-lg h-60 md:h-64 select-none" viewBox="0 0 400 220">
                <defs>
                  <linearGradient id="trainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#f1f5f9" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                  <linearGradient id="magnetRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="magnetBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <marker id="forceArrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                  </marker>
                  <marker id="forceArrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                  </marker>
                </defs>

                {/* Guideway Channel (U-shaped track) */}
                <path d="M 35,40 L 65,40 L 65,165 L 335,165 L 335,40 L 365,40 L 365,195 L 35,195 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                <rect x="65" y="165" width="270" height="5" fill="#0f172a" />

                {/* Left Wall Electromagnetic Coils */}
                <g transform="translate(42, 70)">
                  <rect x="0" y="0" width="18" height="35" rx="3" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                  <rect x="3" y="3" width="12" height="12" fill="url(#magnetRed)" rx="1" />
                  <rect x="3" y="20" width="12" height="12" fill="url(#magnetBlue)" rx="1" />
                  <text x="9" y="11" fill="#fff" fontSize="8" fontWeight="black" textAnchor="middle" className="font-mono">N</text>
                  <text x="9" y="28" fill="#fff" fontSize="8" fontWeight="black" textAnchor="middle" className="font-mono">S</text>
                  <text x="-8" y="-4" fill="#38bdf8" fontSize="6.5" fontWeight="black" className="font-sans uppercase">Cuộn ray</text>
                </g>

                {/* Right Wall Electromagnetic Coils */}
                <g transform="translate(340, 70)">
                  <rect x="0" y="0" width="18" height="35" rx="3" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                  <rect x="3" y="3" width="12" height="12" fill="url(#magnetBlue)" rx="1" />
                  <rect x="3" y="20" width="12" height="12" fill="url(#magnetRed)" rx="1" />
                  <text x="9" y="11" fill="#fff" fontSize="8" fontWeight="black" textAnchor="middle" className="font-mono">S</text>
                  <text x="9" y="28" fill="#fff" fontSize="8" fontWeight="black" textAnchor="middle" className="font-mono">N</text>
                  <text x="26" y="-4" fill="#38bdf8" fontSize="6.5" fontWeight="black" textAnchor="end" className="font-sans uppercase">Cuộn ray</text>
                </g>

                {/* Bottom Levitation Coils */}
                <g transform="translate(85, 171)">
                  <rect x="0" y="0" width="45" height="12" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="5" y1="6" x2="40" y2="6" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2,2" />
                </g>
                <g transform="translate(270, 171)">
                  <rect x="0" y="0" width="45" height="12" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="5" y1="6" x2="40" y2="6" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2,2" />
                </g>

                {/* SCMaglev Train Body (Floating on 10-15mm air cushion) */}
                <g transform="translate(75, 42)">
                  {/* Subtle train shadow on the track */}
                  <ellipse cx="125" cy="114" rx="90" ry="4" fill="#000" opacity="0.5" />

                  {/* Main aerodynamic body shape */}
                  <path d="M 15,10 Q 125,-6 235,10 C 248,30 248,82 235,102 C 220,107 30,107 15,102 C 2,82 2,30 15,10 Z" fill="url(#trainGrad)" stroke="#0f172a" strokeWidth="2.5" />
                  
                  {/* Windows */}
                  <rect x="30" y="20" width="30" height="12" fill="#0f172a" rx="2" />
                  <rect x="70" y="20" width="30" height="12" fill="#0f172a" rx="2" />
                  <rect x="110" y="20" width="30" height="12" fill="#0f172a" rx="2" />
                  <rect x="150" y="20" width="30" height="12" fill="#0f172a" rx="2" />
                  <rect x="190" y="20" width="30" height="12" fill="#0f172a" rx="2" />

                  {/* Aesthetic Blue Streamline Band */}
                  <path d="M 4,50 Q 125,38 246,50 L 247,60 Q 125,48 3,60 Z" fill="#0284c7" />
                  <text x="125" y="56" fill="#ffffff" fontSize="7" fontWeight="black" letterSpacing="1" textAnchor="middle" className="font-mono">SERENE SCMAGLEV</text>

                  {/* Left Superconducting Magnet (SCM) inside train body */}
                  <g transform="translate(-6, 60)">
                    <rect x="0" y="0" width="10" height="26" rx="1.5" fill="#0f172a" stroke="#eab308" strokeWidth="1" />
                    <rect x="1.5" y="1.5" width="7" height="9" fill="url(#magnetBlue)" rx="0.5" />
                    <rect x="1.5" y="15.5" width="7" height="9" fill="url(#magnetRed)" rx="0.5" />
                    <text x="5" y="8" fill="#fff" fontSize="6.5" fontWeight="black" textAnchor="middle" className="font-mono scale-90">S</text>
                    <text x="5" y="22" fill="#fff" fontSize="6.5" fontWeight="black" textAnchor="middle" className="font-mono scale-90">N</text>
                    <text x="-12" y="16" fill="#eab308" fontSize="6.5" fontWeight="black" className="font-mono">SCM</text>
                  </g>

                  {/* Right Superconducting Magnet (SCM) inside train body */}
                  <g transform="translate(246, 60)">
                    <rect x="0" y="0" width="10" height="26" rx="1.5" fill="#0f172a" stroke="#eab308" strokeWidth="1" />
                    <rect x="1.5" y="1.5" width="7" height="9" fill="url(#magnetRed)" rx="0.5" />
                    <rect x="1.5" y="15.5" width="7" height="9" fill="url(#magnetBlue)" rx="0.5" />
                    <text x="5" y="8" fill="#fff" fontSize="6.5" fontWeight="black" textAnchor="middle" className="font-mono scale-90">N</text>
                    <text x="5" y="22" fill="#fff" fontSize="6.5" fontWeight="black" textAnchor="middle" className="font-mono scale-90">S</text>
                    <text x="22" y="16" fill="#eab308" fontSize="6.5" fontWeight="black" textAnchor="end" className="font-mono">SCM</text>
                  </g>
                </g>

                {/* Force Vector Arrows & Physics Descriptions */}
                {/* 1. Left Lateral centering/guidance forces */}
                <line x1="10" y1="118" x2="63" y2="118" stroke="#ef4444" strokeWidth="2" markerEnd="url(#forceArrowRed)" />
                <text x="32" y="112" fill="#f87171" fontSize="6.5" fontWeight="black" textAnchor="middle" className="uppercase font-sans">Lực giữ ray</text>

                {/* 2. Right Lateral centering/guidance forces */}
                <line x1="390" y1="118" x2="337" y2="118" stroke="#ef4444" strokeWidth="2" markerEnd="url(#forceArrowRed)" />
                <text x="368" y="112" fill="#f87171" fontSize="6.5" fontWeight="black" textAnchor="middle" className="uppercase font-sans">Lực giữ ray</text>

                {/* 3. Levitation Lifting Forces on bottom wheels area */}
                <line x1="107" y1="170" x2="107" y2="152" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#forceArrowGreen)" />
                <text x="122" y="163" fill="#34d399" fontSize="7" fontWeight="black" className="font-mono">F_nâng</text>

                <line x1="292" y1="170" x2="292" y2="152" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#forceArrowGreen)" />
                <text x="277" y="163" fill="#34d399" fontSize="7" fontWeight="black" textAnchor="end" className="font-mono">F_nâng</text>

                {/* 4. Suspended Air Gap Cushion */}
                <line x1="200" y1="149" x2="200" y2="165" stroke="#a855f7" strokeWidth="1" strokeDasharray="2,2" />
                <rect x="145" y="151" width="110" height="9" rx="1.5" fill="#a855f7" opacity="0.95" />
                <text x="200" y="157.5" fill="#ffffff" fontSize="6.5" fontWeight="black" textAnchor="middle" className="font-sans uppercase">Khe hở đệm từ: 10 - 15 mm</text>
              </svg>
            </div>
            <p className="text-[11px] text-slate-400 italic text-center leading-relaxed">
              * **Sơ đồ lực:** Các nam châm siêu dẫn (SCM) kết hợp cùng cuộn dây trên tường ray tạo thành hệ thống ngẫu lực nâng hướng thẳng đứng và lực hướng tâm giữ thân tàu lơ lửng ổn định tuyệt đối ở trung tâm đường dẫn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Levitation mechanism */}
            <div className="bg-indigo-50 border-2 border-slate-900 rounded-3xl p-6 space-y-4 shadow-[4px_4px_0px_0px_#0f172a] text-slate-950">
              <span className="text-[10px] font-mono font-black bg-indigo-200 border-2 border-slate-900 text-slate-950 px-2.5 py-1 rounded-md shadow-[1.5px_1.5px_0px_0px_#000]">Cơ chế nâng từ</span>
              <h3 className="text-base font-black text-slate-950">Nâng tàu cách ray 10-15 mm</h3>
              <p className="text-xs text-slate-900 font-bold leading-relaxed">
                Khi các nam châm siêu dẫn của tàu chuyển động tốc độ cao dọc đường ray, dòng điện cảm ứng được sinh ra ở các cuộn dây dẫn bên dưới ray tạo lực đẩy hướng thẳng đứng bốc bổng thân tàu lên không, triệt tiêu hoàn toàn ma sát cơ học trượt.
              </p>
            </div>

            {/* Propulsion mechanism */}
            <div className="bg-fuchsia-50 border-2 border-slate-900 rounded-3xl p-6 space-y-4 shadow-[4px_4px_0px_0px_#0f172a] text-slate-950">
              <span className="text-[10px] font-mono font-black bg-fuchsia-200 border-2 border-slate-900 text-slate-950 px-2.5 py-1 rounded-md shadow-[1.5px_1.5px_0px_0px_#000]">Cơ chế đẩy tịnh tiến</span>
              <h3 className="text-base font-black text-slate-950">Gia tốc và kiểm soát tốc độ</h3>
              <p className="text-xs text-slate-900 font-bold leading-relaxed">
                Hệ thống máy tính trung tâm điều khiển đảo chiều dòng điện xoay chiều cực nhanh trong các nam châm điện dọc đường ray, tạo ra từ trường dịch chuyển kéo-đẩy liên tục động cơ tuyến tính gắn trên tàu tiến về phía trước.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TRỢ LÝ AI BÀI HỌC - KHỐI 3D SƯ PHẠM */}
      <div className="bg-gradient-to-b from-indigo-50/50 to-white border-2 border-slate-900 rounded-3xl p-6 space-y-4 shadow-[4px_4px_0px_0px_#0f172a] text-slate-900 mt-6 relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
        
        <div className="relative z-10 flex items-center justify-between border-b-2 border-slate-900 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 border-2 border-slate-900 text-indigo-950 rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <Sparkles className="h-5 w-5 animate-pulse text-indigo-700" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide">Trợ lý Giáo viên AI - Giải đáp Bài 15</h4>
              <p className="text-[10px] text-slate-700 font-bold">Chuyên gia giải đáp kiến thức Lực từ & Cảm ứng từ • Lời nói chuẩn mực sư phạm</p>
            </div>
          </div>
          <button
            onClick={() => setMessages([
              {
                role: "model",
                content: "Thầy/Cô đã đặt lại hộp thoại. Thầy/Cô rất vui lòng được hỗ trợ các em giải đáp mọi thắc mắc liên quan đến Bài 15 và môn Vật lí!"
              }
            ])}
            className="p-1.5 hover:bg-indigo-50 border-2 border-slate-900 text-slate-950 rounded-xl transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
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
            "Định luật Ampere về lực từ phát biểu thế nào?",
            "Làm sao xác định chiều lực F bằng Quy tắc bàn tay trái?",
            "Nguyên lí hoạt động của đòn cân dòng điện đo B?",
            "Tàu đệm từ Maglev hoạt động nhờ lực từ ra sao?"
          ].map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(promptText)}
              disabled={isTyping}
              className="text-[10px] bg-white hover:bg-indigo-55/40 border-2 border-slate-900 text-slate-900 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer font-black disabled:opacity-50"
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
            placeholder="Đặt câu hỏi về Bài 15 và môn Vật lí..."
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
