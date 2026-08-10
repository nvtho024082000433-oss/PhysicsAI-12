import React, { useState, useEffect, useRef } from "react";
import { Compass, Lightbulb, HelpCircle, Eye, RefreshCw, Layers, ArrowRight, Info, Sparkles, Send } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson14Textbook() {
  const [activeSubTab, setActiveSubTab] = useState<"tuongtac" | "tutruong" | "duongsuc">("tuongtac");

  // AI Assistant State
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Thầy/Cô chào các em! Thầy/Cô là Giáo viên Trợ lý ảo AI chuyên sâu về Bài 14: Từ trường. Các em có thắc mắc gì cần Thầy/Cô giải đáp về lực từ, cảm ứng từ, vectơ cảm ứng từ B, đường sức từ, hoặc địa từ trường không?"
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
          mode: "lesson14"
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
    <div className="space-y-8 text-slate-900 font-sans max-w-4xl mx-auto py-2">
      {/* Textbook Header Badge */}
      <div className="border-b-2 border-slate-200 pb-5 space-y-4">
        <div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tight mb-2">BÀI 14: TỪ TRƯỜNG</h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 border-2 border-cyan-300 text-cyan-950 text-xs font-black tracking-wide uppercase mb-2">
            <Compass className="h-3 w-3 animate-spin" /> CHƯƠNG III: TỪ TRƯỜNG
          </div>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed font-bold">
            Sách Giáo Khoa Vật lí lớp 12 — Chương trình Giáo dục phổ thông mới 2018
          </p>
        </div>
        
        {/* Textbook Navigation Subtabs */}
        <div className="flex flex-wrap bg-slate-200 p-1.5 rounded-2xl border-2 border-slate-300 gap-1.5 select-none w-fit max-w-full">
          <button
            onClick={() => setActiveSubTab("tuongtac")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer ${
              activeSubTab === "tuongtac"
                ? "bg-white text-slate-950 shadow-md border-2 border-slate-300"
                : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            I. Tương tác từ
          </button>
          <button
            onClick={() => setActiveSubTab("tutruong")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer ${
              activeSubTab === "tutruong"
                ? "bg-white text-slate-950 shadow-md border-2 border-slate-300"
                : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            II. Từ trường & Cảm ứng từ
          </button>
          <button
            onClick={() => setActiveSubTab("duongsuc")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer ${
              activeSubTab === "duongsuc"
                ? "bg-white text-slate-950 shadow-md border-2 border-slate-300"
                : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            III. Đường sức từ
          </button>
        </div>
      </div>

      {/* Opening Question Box */}
      <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-200 border-b-[6px] border-b-slate-300 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 p-8 text-slate-300/40 pointer-events-none text-7xl font-mono select-none">
          ?
        </div>
        <p className="text-slate-900 italic text-sm leading-relaxed relative z-10 font-bold">
          "Ta đã biết nam châm và dòng điện đều tác dụng lực lên kim nam châm. Vậy xung quanh dòng điện có tồn tại từ trường không? Tính chất cơ bản của từ trường là gì? Từ trường được biểu diễn trực quan như thế nào bằng phương pháp hình học?"
        </p>
      </div>

      {/* SUBTAB CONTENT 1: I. TƯƠNG TÁC TỪ */}
      {activeSubTab === "tuongtac" && (
        <div className="space-y-6 animate-fade-in">
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-950 flex items-center gap-2 tracking-tight">
              <span className="text-cyan-600 font-mono">I.</span> TƯƠNG TÁC TỪ
            </h2>
            <p className="text-slate-900 text-sm leading-relaxed font-semibold">
              Trong đời sống, hiện tượng tương tác giữa các vật mang từ tính (như nam châm vĩnh cửu, dòng điện) là vô cùng quen thuộc. Lực tương tác giữa chúng được gọi chung là <strong className="text-slate-950 font-black">lực từ</strong>, và tương tác đó được gọi là <strong className="text-slate-950 font-black">tương tác từ</strong>.
            </p>
          </section>

          {/* SGK Experiments Subsection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Experiment 1: Magnet & Magnet */}
            <div className="bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 space-y-4 shadow-sm text-slate-950">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-100">
                <span className="text-[10px] font-mono font-black bg-amber-100 border border-amber-200 text-amber-800 px-2.5 py-1 rounded-md">Hình 14.1</span>
                <h3 className="text-xs font-black text-slate-900">Tương tác Nam châm — Kim nam châm</h3>
              </div>
              
              {/* Interactive SVG for Magnet & Magnet */}
              <div className="bg-slate-50 rounded-2xl p-3 h-40 flex items-center justify-center relative overflow-hidden border-2 border-slate-200">
                <svg className="w-full h-full" viewBox="0 0 200 120">
                  {/* Left Bar Magnet */}
                  <g transform="translate(30, 60)">
                    <rect x="-25" y="-10" width="25" height="20" fill="#dc2626" rx="2" />
                    <rect x="0" y="-10" width="25" height="20" fill="#2563eb" rx="2" />
                    <text x="-12" y="4" fill="white" fontSize="9" fontWeight="900" textAnchor="middle">N</text>
                    <text x="12" y="4" fill="white" fontSize="9" fontWeight="900" textAnchor="middle">S</text>
                    <text x="0" y="-14" fill="#475569" fontSize="7" fontWeight="bold" textAnchor="middle">Nam châm</text>
                  </g>

                  {/* Force lines / particles */}
                  <path d="M 85,60 C 95,50 115,50 125,60" fill="none" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2,2" className="animate-pulse" />
                  <path d="M 85,60 C 95,70 115,70 125,60" fill="none" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2,2" className="animate-pulse" />

                  {/* Right Magnetic Compass Needle */}
                  <g transform="translate(140, 60)" className="animate-bounce">
                    {/* Compass Stand */}
                    <line x1="0" y1="0" x2="0" y2="25" stroke="#475569" strokeWidth="2.5" />
                    <ellipse cx="0" cy="25" rx="10" ry="4" fill="#94a3b8" stroke="#475569" />
                    
                    {/* Compass Needle */}
                    <g transform="rotate(-30)">
                      <path d="M 0,0 L -18,0 L 0,-6 Z" fill="#dc2626" />
                      <path d="M 0,0 L -18,0 L 0,6 Z" fill="#dc2626" />
                      <path d="M 0,0 L 18,0 L 0,-6 Z" fill="#2563eb" />
                      <path d="M 0,0 L 18,0 L 0,6 Z" fill="#2563eb" />
                      <circle cx="0" cy="0" r="1.5" fill="#f8fafc" />
                    </g>
                    <text x="-15" y="-12" fill="#dc2626" fontSize="8" fontWeight="bold" textAnchor="middle">N</text>
                    <text x="15" y="12" fill="#2563eb" fontSize="8" fontWeight="bold" textAnchor="middle">S</text>
                  </g>
                </svg>
                <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-slate-800 font-bold">
                  Cực khác tên thì <strong className="text-emerald-700">Hút nhau</strong>, cùng tên thì <strong className="text-rose-700">Đẩy nhau</strong>.
                </div>
              </div>

              <div className="text-xs text-slate-800 leading-relaxed font-semibold space-y-1.5">
                <p>
                  <strong>Thí nghiệm:</strong> Đưa hai cực cùng tên (S-S hoặc N-N) của hai thanh nam châm lại gần nhau ta thấy chúng <span className="text-rose-700 font-black">đẩy nhau</span>. Đưa hai cực khác tên (N-S) lại gần nhau ta thấy chúng <span className="text-emerald-700 font-black">hút nhau</span>.
                </p>
              </div>
            </div>

            {/* Experiment 2: Current & Magnet (Oersted) */}
            <div className="bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 space-y-4 shadow-sm text-slate-950">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-100">
                <span className="text-[10px] font-mono font-black bg-blue-100 border border-blue-200 text-blue-800 px-2.5 py-1 rounded-md">Hình 14.2</span>
                <h3 className="text-xs font-black text-slate-900">Thí nghiệm Oersted (Ơ-xtét)</h3>
              </div>

              {/* Interactive SVG for Oersted Experiment */}
              <div className="bg-slate-50 rounded-2xl p-3 h-40 flex items-center justify-center relative overflow-hidden border-2 border-slate-200">
                <svg className="w-full h-full" viewBox="0 0 200 120">
                  {/* Straight Wire with current arrow */}
                  <line x1="20" y1="40" x2="180" y2="40" stroke="#d97706" strokeWidth="3" />
                  <polygon points="120,40 110,36 110,44" fill="#b45309" />
                  <text x="110" y="32" fill="#b45309" fontSize="8" fontWeight="900" textAnchor="middle">I (Dòng điện)</text>

                  {/* Magnetic field lines circling the wire */}
                  <ellipse cx="100" cy="40" rx="15" ry="5" fill="none" stroke="#475569" strokeWidth="0.8" strokeDasharray="2,2" />
                  
                  {/* Rotating needle below wire */}
                  <g transform="translate(100, 75)">
                    {/* Compass Stand */}
                    <line x1="0" y1="0" x2="0" y2="20" stroke="#475569" strokeWidth="2.5" />
                    <ellipse cx="0" cy="20" rx="8" ry="3" fill="#94a3b8" stroke="#475569" />

                    {/* Rotating needle */}
                    <g transform="rotate(45)" className="transition-transform duration-1000">
                      <path d="M 0,0 L -22,0 L 0,-5 Z" fill="#dc2626" />
                      <path d="M 0,0 L -22,0 L 0,5 Z" fill="#dc2626" />
                      <path d="M 0,0 L 22,0 L 0,-5 Z" fill="#2563eb" />
                      <path d="M 0,0 L 22,0 L 0,5 Z" fill="#2563eb" />
                      <circle cx="0" cy="0" r="1.5" fill="white" />
                    </g>
                    <text x="-16" y="16" fill="#dc2626" fontSize="7" fontWeight="bold">N</text>
                    <text x="10" y="-12" fill="#2563eb" fontSize="7" fontWeight="bold">S</text>
                  </g>
                </svg>
                <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-slate-800 font-bold">
                  Dòng điện chạy qua dây làm <strong className="text-amber-700">quay kim nam châm</strong>.
                </div>
              </div>

              <div className="text-xs text-slate-800 leading-relaxed font-semibold space-y-1.5">
                <p>
                  <strong>Thí nghiệm:</strong> Năm 1820, Oersted phát hiện khi cho dòng điện chạy qua dây dẫn đặt song song phía trên kim nam châm, kim bị lệch một góc so với phương ban đầu. Chứng tỏ <span className="text-amber-700 font-black">dòng điện sinh ra từ trường</span>.
                </p>
              </div>
            </div>

            {/* Experiment 3: Current & Current */}
            <div className="bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 space-y-4 shadow-sm text-slate-950">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-100">
                <span className="text-[10px] font-mono font-black bg-emerald-100 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-md">Hình 14.3</span>
                <h3 className="text-xs font-black text-slate-900">Tương tác hai dòng điện song song</h3>
              </div>

              {/* Interactive SVG for Current-Current */}
              <div className="bg-slate-50 rounded-2xl p-3 h-40 flex items-center justify-center relative overflow-hidden border-2 border-slate-200">
                <svg className="w-full h-full" viewBox="0 0 200 120">
                  {/* Wire 1 */}
                  <g transform="translate(60, 0)">
                    <line x1="0" y1="10" x2="0" y2="105" stroke="#dc2626" strokeWidth="2.5" />
                    <polygon points="0,50 -4,58 4,58" fill="#dc2626" />
                    <text x="-10" y="55" fill="#dc2626" fontSize="8" fontWeight="bold">I₁</text>
                    {/* Attract Force arrow */}
                    <line x1="0" y1="60" x2="25" y2="60" stroke="#059669" strokeWidth="2" />
                    <polygon points="25,60 19,57 19,63" fill="#059669" />
                    <text x="10" y="72" fill="#059669" fontSize="7" fontWeight="bold">Lực từ F</text>
                  </g>

                  {/* Wire 2 */}
                  <g transform="translate(140, 0)">
                    <line x1="0" y1="10" x2="0" y2="105" stroke="#dc2626" strokeWidth="2.5" />
                    <polygon points="0,50 -4,58 4,58" fill="#dc2626" />
                    <text x="14" y="55" fill="#dc2626" fontSize="8" fontWeight="bold">I₂</text>
                    {/* Attract Force arrow */}
                    <line x1="0" y1="60" x2="-25" y2="60" stroke="#059669" strokeWidth="2" />
                    <polygon points="-25,60 -19,57 -19,63" fill="#059669" />
                    <text x="-22" y="72" fill="#059669" fontSize="7" fontWeight="bold">Lực từ F</text>
                  </g>

                  {/* Magnetic force loops between them */}
                  <path d="M 60,35 Q 100,35 140,35" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                  <path d="M 60,85 Q 100,85 140,85" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                </svg>
                <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-slate-800 font-bold">
                  Cùng chiều thì <strong className="text-emerald-700">Hút nhau</strong>, ngược chiều thì <strong className="text-rose-700">Đẩy nhau</strong>.
                </div>
              </div>

              <div className="text-xs text-slate-800 leading-relaxed font-semibold space-y-1.5">
                <p>
                  <strong>Thí nghiệm:</strong> Cho hai dòng điện chạy qua hai tấm kim loại mỏng song song: Nếu hai dòng điện <strong className="text-emerald-700">cùng chiều</strong> chúng <strong className="text-emerald-700">hút nhau</strong>. Nếu chạy <strong className="text-rose-700">ngược chiều</strong> chúng <strong className="text-rose-700">đẩy nhau</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50/60 p-5 rounded-3xl border-2 border-emerald-200 border-b-[6px] border-b-emerald-300 space-y-3 shadow-md text-slate-900">
            <h4 className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4 text-emerald-600 shrink-0" /> KẾT LUẬN QUAN TRỌNG:
            </h4>
            <p className="text-emerald-950 text-xs leading-relaxed font-bold">
              Tương tác giữa nam châm với nam châm, giữa dòng điện với nam châm, và giữa dòng điện với dòng điện đều gọi là <strong className="text-emerald-950 font-black">tương tác từ</strong>. Lực tương tác trong các trường hợp đó gọi là <strong className="text-emerald-950 font-black">lực từ</strong>.
            </p>
          </div>
        </div>
      )}

      {/* SUBTAB CONTENT 2: II. KHÁI NIỆM TỪ TRƯỜNG */}
      {activeSubTab === "tutruong" && (
        <div className="space-y-6 animate-fade-in text-sm text-slate-900 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-950 flex items-center gap-2 tracking-tight">
              <span className="text-cyan-600 font-mono">II.</span> TỪ TRƯỜNG & VECTƠ CẢM ỨNG TỪ
            </h2>
            <div className="p-5 bg-cyan-50/30 rounded-3xl border-2 border-cyan-200 border-b-[6px] border-b-cyan-300 space-y-4 shadow-md text-slate-950">
              <h3 className="font-black text-cyan-950 text-sm">1. Khái niệm từ trường</h3>
              <p className="text-slate-900 text-xs font-semibold leading-relaxed">
                Từ các thí nghiệm ở phần I, ta thấy bất kì điểm nào đặt gần nam châm hay dòng điện đều có lực từ tác dụng lên kim nam châm thử. Ta định nghĩa:
              </p>
              <div className="bg-white border-2 border-cyan-200 border-l-[6px] border-l-cyan-500 p-4 rounded-2xl shadow-inner">
                <p className="text-slate-950 font-black text-xs leading-relaxed italic">
                  "Từ trường là một dạng của vật chất tồn tại xung quanh hạt mang điện chuyển động (hoặc dòng điện, nam châm) và tác dụng lực từ lên hạt mang điện chuyển động khác (hoặc dòng điện, nam châm khác) đặt trong nó."
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3 bg-indigo-50/30 rounded-3xl border-2 border-indigo-200 border-b-[6px] border-b-indigo-300 p-5 shadow-md text-slate-950">
            <h3 className="font-black text-indigo-950 text-sm">2. Tính chất cơ bản của từ trường</h3>
            <p className="text-slate-900 text-xs font-semibold">
              Tính chất cơ bản nhất, cốt lõi nhất của từ trường là:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-xs text-slate-900 font-semibold leading-relaxed">
              <li>Nó <strong className="text-slate-950 font-black">gây ra lực từ</strong> tác dụng lên một nam châm, một dòng điện hay một điện tích chuyển động khác đặt trong nó.</li>
              <li>Ta sử dụng <strong className="text-slate-950 font-black">kim nam châm thử</strong> (một kim nam châm nhỏ, nhẹ có thể quay tự do quanh một trục thẳng đứng) làm công cụ nhạy bén để dò tìm, phát hiện và khảo sát từ trường trong không gian.</li>
            </ul>
          </section>

          <section className="space-y-3 bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 shadow-md text-slate-950">
            <h3 className="font-black text-slate-950 text-sm">3. Vectơ Cảm ứng từ B</h3>
            <p className="text-slate-900 text-xs font-semibold leading-relaxed">
              Để đặc trưng cho từ trường về mặt tác dụng lực mạnh hay yếu tại một điểm, người ta đưa vào một đại lượng vectơ gọi là <strong className="text-slate-950 font-black">vectơ cảm ứng từ B</strong> (kí hiệu là <span className="font-serif italic font-black">B</span>).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-cyan-50/20 border-2 border-cyan-150 p-5 rounded-2xl shadow-inner">
              <div className="space-y-3">
                <h4 className="text-xs font-black text-cyan-850 uppercase tracking-wider">Đặc trưng hình học & hướng</h4>
                <ul className="list-disc list-inside space-y-2 text-xs text-slate-900 font-semibold leading-relaxed">
                  <li><strong className="text-slate-950 font-black">Phương:</strong> Trùng với phương của trục kim nam châm thử khi nó nằm cân bằng ổn định tại điểm đó.</li>
                  <li><strong className="text-slate-950 font-black">Chiều:</strong> Đi từ cực Nam (S) sang cực Bắc (N) của kim nam châm thử cân bằng đó.</li>
                  <li><strong className="text-slate-950 font-black">Đơn vị:</strong> Đo bằng <strong className="text-indigo-850 font-black">Tesla (T)</strong> trong hệ đo lường quốc tế SI.</li>
                </ul>
              </div>
              <div className="flex items-center justify-center bg-white border-2 border-slate-200/80 rounded-2xl p-4 shadow-sm">
                <svg className="w-full h-24" viewBox="0 0 200 80">
                  {/* Point of interest */}
                  <circle cx="50" cy="40" r="3" fill="#0f172a" />
                  <text x="45" y="32" fill="#0f172a" fontSize="7" fontWeight="black">Điểm M</text>
                  
                  {/* Compass needle aligned */}
                  <g transform="translate(100, 40) rotate(-15)">
                    <path d="M 0,0 L -25,0 L 0,-6 Z" fill="#dc2626" />
                    <path d="M 0,0 L -25,0 L 0,6 Z" fill="#dc2626" />
                    <path d="M 0,0 L 25,0 L 0,-6 Z" fill="#2563eb" />
                    <path d="M 0,0 L 25,0 L 0,6 Z" fill="#2563eb" />
                    <circle cx="0" cy="0" r="2" fill="white" />
                    <text x="-15" y="15" fill="#dc2626" fontSize="8" fontWeight="bold">S (Nam)</text>
                    <text x="10" y="-12" fill="#2563eb" fontSize="8" fontWeight="bold">N (Bắc)</text>
                  </g>

                  {/* B Vector arrow */}
                  <g transform="translate(100, 40) rotate(-15)">
                    <line x1="25" y1="0" x2="70" y2="0" stroke="#0284c7" strokeWidth="2.5" />
                    <polygon points="70,0 62,-4 62,4" fill="#0284c7" />
                    <text x="52" y="-8" fill="#0284c7" fontSize="9" fontWeight="900" fontStyle="italic">B (Cảm ứng từ)</text>
                  </g>
                </svg>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* SUBTAB CONTENT 3: III. ĐƯỜNG SỨC TỪ & ĐƯỜNG SỨC TỰ ĐẶC BIỆT */}
      {activeSubTab === "duongsuc" && (
        <div className="space-y-8 animate-fade-in text-sm text-slate-900 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-950 flex items-center gap-2 tracking-tight">
              <span className="text-cyan-600 font-mono">III.</span> ĐƯỜNG SỨC TỪ (MAGNETIC FIELD LINES)
            </h2>
            <p className="text-slate-900 text-xs font-semibold">
              Để biểu diễn trực quan từ trường về mặt hình học trong không gian, người ta đưa ra khái niệm <strong className="text-slate-950">đường sức từ</strong>.
            </p>
            <div className="bg-slate-50 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 space-y-3 text-slate-950 shadow-md">
              <h3 className="font-black text-slate-950 text-xs">1. Từ phổ là gì?</h3>
              <p className="text-slate-800 text-xs font-semibold leading-relaxed">
                Khi rắc đều mạt sắt mịn lên tấm nhựa phẳng đặt trong từ trường của nam châm hay dòng điện rồi gõ nhẹ, các mạt sắt sẽ tự động sắp xếp thành những đường cong nối giữa các cực. Hình ảnh các đường mạt sắt đó được gọi là <strong className="text-slate-950">từ phổ</strong>. Từ phổ giúp ta quan sát trực quan được hình dạng các đường sức từ trong thực tế.
              </p>
            </div>
          </section>

          {/* Core Properties Box */}
          <section className="bg-indigo-50/40 p-5 rounded-3xl border-2 border-indigo-150 border-b-[6px] border-b-indigo-250 space-y-4 shadow-md text-slate-950">
            <h3 className="font-black text-indigo-950 text-sm flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-indigo-600 shrink-0 animate-pulse" /> 3 Đặc điểm cốt lõi của Đường Sức Từ:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-900 mt-2">
              <div className="bg-white p-4 rounded-2xl border-2 border-indigo-100/80 space-y-1.5 shadow-sm">
                <span className="text-indigo-800 font-black font-mono block text-xs">1. Tính Duy nhất:</span>
                <p className="text-slate-800 leading-relaxed font-semibold">Tại mỗi điểm trong không gian từ trường, <strong>chỉ có thể vẽ được duy nhất một</strong> đường sức từ đi qua (chúng không bao giờ cắt hay giao nhau).</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border-2 border-indigo-100/80 space-y-1.5 shadow-sm">
                <span className="text-indigo-800 font-black font-mono block text-xs">2. Tính Khép kín:</span>
                <p className="text-slate-800 leading-relaxed font-semibold">Các đường sức từ là <strong>những đường cong khép kín</strong> hoặc vô hạn ở hai đầu. Ở ngoài nam châm, chiều của chúng đi ra cực Bắc, đi vào cực Nam.</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border-2 border-indigo-100/80 space-y-1.5 shadow-sm">
                <span className="text-indigo-800 font-black font-mono block text-xs">3. Tính Mật độ:</span>
                <p className="text-slate-800 leading-relaxed font-semibold">Nơi nào từ trường mạnh hơn thì đường sức từ được <strong>vẽ dày đặc hơn</strong> (mật độ lớn), nơi từ trường yếu thì đường sức vẽ thưa hơn.</p>
              </div>
            </div>
          </section>

          {/* SPECIAL MAGNETIC FIELDS ILLUSTRATIONS */}
          <section className="space-y-4">
            <h3 className="font-black text-slate-950 text-sm border-b-2 border-slate-100 pb-2">
              2. Đường sức từ của Nam châm & Dòng điện hình dạng đặc biệt (Rất quan trọng)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Illustration A: Bar Magnet */}
              <div className="bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 space-y-4 shadow-sm text-slate-950">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-950">A. Nam châm thẳng vĩnh cửu</span>
                  <span className="text-[10px] font-mono text-emerald-800 font-black bg-emerald-100 border-2 border-emerald-200 px-2.5 py-0.5 rounded-lg animate-pulse">Ra Bắc Vào Nam</span>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-3 h-48 flex items-center justify-center relative border-2 border-slate-200 shadow-inner">
                  <svg className="w-full h-full" viewBox="0 0 240 160">
                    {/* Magnetic Field Lines */}
                    {/* Left Loop */}
                    <path d="M 90,80 C 40,40 40,120 90,80" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3,3" />
                    <path d="M 90,80 C 10,20 10,140 90,80" fill="none" stroke="#0284c7" strokeWidth="1.2" opacity="0.7" />
                    {/* Right Loop */}
                    <path d="M 150,80 C 200,40 200,120 150,80" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3,3" />
                    <path d="M 150,80 C 230,20 230,140 150,80" fill="none" stroke="#0284c7" strokeWidth="1.2" opacity="0.7" />
                    {/* Upper/Lower loops */}
                    <path d="M 100,70 C 100,20 140,20 140,70" fill="none" stroke="#0284c7" strokeWidth="1.5" />
                    <path d="M 100,90 C 100,140 140,140 140,90" fill="none" stroke="#0284c7" strokeWidth="1.5" />
                    {/* Inner field lines */}
                    <line x1="100" y1="80" x2="140" y2="80" stroke="#dc2626" strokeWidth="2.5" />

                    {/* Direction arrows on loops */}
                    <polygon points="120,25 125,28 118,31" fill="#0284c7" />
                    <polygon points="120,135 115,132 122,129" fill="#0284c7" />

                    {/* Bar Magnet Body */}
                    <g transform="translate(85, 70)">
                      <rect x="0" y="0" width="35" height="20" fill="#dc2626" rx="2" />
                      <rect x="35" y="0" width="35" height="20" fill="#2563eb" rx="2" />
                      <text x="17" y="14" fill="white" fontSize="10" fontWeight="900" textAnchor="middle">N</text>
                      <text x="52" y="14" fill="white" fontSize="10" fontWeight="900" textAnchor="middle">S</text>
                    </g>
                  </svg>
                </div>
                <p className="text-[11px] text-slate-800 font-semibold leading-relaxed">
                  Ở bên ngoài nam châm thẳng, các đường sức từ xuất phát từ <strong className="text-rose-700 font-bold">cực Bắc (N)</strong>, uốn lượn cong khép kín và đi vào <strong className="text-blue-700 font-bold">cực Nam (S)</strong>.
                </p>
              </div>

              {/* Illustration B: Horseshoe Magnet */}
              <div className="bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 space-y-4 shadow-sm text-slate-950">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-950">B. Nam châm chữ U</span>
                  <span className="text-[10px] font-mono text-cyan-800 font-black bg-cyan-100 border-2 border-cyan-200 px-2.5 py-0.5 rounded-lg animate-pulse">Từ trường đều ở giữa</span>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3 h-48 flex items-center justify-center relative border-2 border-slate-200 shadow-inner">
                  <svg className="w-full h-full" viewBox="0 0 240 160">
                    {/* Horseshoe magnet shape */}
                    <path d="M 60,40 L 110,40 A 40,40 0 0,1 150,80 A 40,40 0 0,1 110,120 L 60,120 L 60,100 L 110,100 A 20,20 0 0,0 130,80 A 20,20 0 0,0 110,60 L 60,60 Z" fill="#64748b" />
                    {/* Red North Pole (upper prong) */}
                    <rect x="60" y="40" width="30" height="20" fill="#dc2626" />
                    <text x="75" y="54" fill="white" fontSize="9" fontWeight="900" textAnchor="middle">N</text>

                    {/* Blue South Pole (lower prong) */}
                    <rect x="60" y="100" width="30" height="20" fill="#2563eb" />
                    <text x="75" y="114" fill="white" fontSize="9" fontWeight="900" textAnchor="middle">S</text>

                    {/* Parallel Magnetic lines between prongs (Uniform Field) */}
                    <g stroke="#0284c7" strokeWidth="1.5">
                      <line x1="75" y1="60" x2="75" y2="100" />
                      <line x1="65" y1="60" x2="65" y2="100" />
                      <line x1="85" y1="60" x2="85" y2="100" />
                    </g>
                    {/* Arrows pointing down (N to S) */}
                    <polygon points="65,80 62,75 68,75" fill="#0284c7" />
                    <polygon points="75,80 72,75 78,75" fill="#0284c7" />
                    <polygon points="85,80 82,75 88,75" fill="#0284c7" />

                    {/* Fringing lines outside */}
                    <path d="M 90,50 C 130,50 130,110 90,110" fill="none" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3,3" />
                  </svg>
                </div>
                <p className="text-[11px] text-slate-800 font-semibold leading-relaxed">
                  Ở khoảng trống hẹp giữa hai nhánh nam châm chữ U, các đường sức từ là các đường thẳng song song cách đều. Đây là một vùng <strong className="text-slate-950 font-black">Từ trường đều</strong>.
                </p>
              </div>

              {/* Illustration C: Straight Wire Current */}
              <div className="bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 space-y-4 shadow-sm text-slate-950">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-950">C. Dòng điện thẳng dài</span>
                  <span className="text-[10px] font-mono text-amber-800 font-black bg-amber-100 border-2 border-amber-200 px-2.5 py-0.5 rounded-lg animate-pulse">Bàn tay phải 1</span>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3 h-48 flex items-center justify-center relative border-2 border-slate-200 shadow-inner">
                  <svg className="w-full h-full" viewBox="0 0 240 160">
                    {/* Straight Vertical Wire */}
                    <line x1="120" y1="15" x2="120" y2="145" stroke="#d97706" strokeWidth="3" />
                    {/* Current arrow */}
                    <polygon points="120,40 115,50 125,50" fill="#b45309" />
                    <text x="135" y="48" fill="#b45309" fontSize="10" fontWeight="900">I (Lên)</text>

                    {/* Concentric Magnetic Loops seen in perspective (ellipses) */}
                    <ellipse cx="120" cy="80" rx="45" ry="12" fill="none" stroke="#0284c7" strokeWidth="1.8" />
                    <ellipse cx="120" cy="80" rx="70" ry="18" fill="none" stroke="#0284c7" strokeWidth="1.2" opacity="0.6" />

                    {/* Direction arrows on loop (CCW from top) */}
                    <polygon points="165,80 162,84 167,84" fill="#0284c7" />
                    <polygon points="75,80 78,76 73,76" fill="#0284c7" />

                    {/* Left & Right B Vector examples */}
                    <line x1="165" y1="80" x2="195" y2="70" stroke="#059669" strokeWidth="2.5" />
                    <polygon points="195,70 188,71 190,75" fill="#059669" />
                    <text x="195" y="62" fill="#059669" fontSize="8" fontWeight="bold">B (Vectơ)</text>
                  </svg>
                </div>
                <p className="text-[11px] text-slate-800 font-semibold leading-relaxed">
                  Đường sức từ là các <strong className="text-slate-950 font-black">vòng tròn đồng tâm</strong> nằm trên mặt phẳng vuông góc dây dẫn, chiều quay tuân theo quy tắc nắm bàn tay phải (ngón cái chỉ chiều dòng điện).
                </p>
              </div>

              {/* Illustration D: Circular Coil & Solenoid */}
              <div className="bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 space-y-4 shadow-sm text-slate-950">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-950">D. Ống dây mang dòng điện (Solenoid)</span>
                  <span className="text-[10px] font-mono text-indigo-800 font-black bg-indigo-100 border-2 border-indigo-200 px-2.5 py-0.5 rounded-lg animate-pulse">Bàn tay phải 2</span>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3 h-48 flex items-center justify-center relative border-2 border-slate-200 shadow-inner">
                  <svg className="w-full h-full" viewBox="0 0 240 160">
                    {/* Inside Solenoid field lines */}
                    <line x1="50" y1="80" x2="190" y2="80" stroke="#0284c7" strokeWidth="1.8" />
                    <line x1="50" y1="65" x2="190" y2="65" stroke="#0284c7" strokeWidth="1.2" />
                    <line x1="50" y1="95" x2="190" y2="95" stroke="#0284c7" strokeWidth="1.2" />
                    {/* Outer loops */}
                    <path d="M 50,80 C 10,20 230,20 190,80" fill="none" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3,3" />
                    <path d="M 50,80 C 10,140 230,140 190,80" fill="none" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3,3" />

                    {/* Direction arrows pointing left (indicating right-to-left field) */}
                    <polygon points="110,80 115,77 115,83" fill="#0284c7" />
                    <polygon points="110,65 115,62 115,68" fill="#0284c7" />

                    {/* Solenoid wire loops */}
                    <rect x="70" y="55" width="6" height="50" fill="#d97706" rx="2" />
                    <rect x="95" y="55" width="6" height="50" fill="#d97706" rx="2" />
                    <rect x="120" y="55" width="6" height="50" fill="#d97706" rx="2" />
                    <rect x="145" y="55" width="6" height="50" fill="#d97706" rx="2" />
                    <rect x="170" y="55" width="6" height="50" fill="#d97706" rx="2" />

                    {/* Connected wires back of loops */}
                    <line x1="76" y1="55" x2="95" y2="55" stroke="#b45309" strokeWidth="1.5" />
                    <line x1="101" y1="55" x2="120" y2="55" stroke="#b45309" strokeWidth="1.5" />
                    <line x1="126" y1="55" x2="145" y2="55" stroke="#b45309" strokeWidth="1.5" />
                    <line x1="151" y1="55" x2="170" y2="55" stroke="#b45309" strokeWidth="1.5" />

                    {/* Connected wires back of loops */}
                    <line x1="76" y1="55" x2="95" y2="55" stroke="#b45309" strokeWidth="1.5" />
                    <line x1="101" y1="55" x2="120" y2="55" stroke="#b45309" strokeWidth="1.5" />
                    <line x1="126" y1="55" x2="145" y2="55" stroke="#b45309" strokeWidth="1.5" />
                    <line x1="151" y1="55" x2="170" y2="55" stroke="#b45309" strokeWidth="1.5" />

                    {/* Current labels pointing up in front */}
                    <polygon points="73,75 70,68 76,68" fill="white" />
                    <polygon points="98,75 95,68 101,68" fill="white" />
                    <polygon points="123,75 120,68 126,68" fill="white" />
                    <polygon points="148,75 145,68 151,68" fill="white" />
                    <polygon points="173,75 170,68 176,68" fill="white" />

                    {/* Input/Output wire connections */}
                    <line x1="70" y1="105" x2="50" y2="125" stroke="#d97706" strokeWidth="2.5" />
                    <line x1="176" y1="105" x2="196" y2="125" stroke="#d97706" strokeWidth="2.5" />
                    <text x="40" y="135" fill="#b45309" fontSize="8" fontWeight="black">I Vào</text>
                    <text x="205" y="135" fill="#b45309" fontSize="8" fontWeight="black">I Ra</text>
                  </svg>
                </div>
                <p className="text-[11px] text-slate-800 font-semibold leading-relaxed">
                  Ở <strong className="text-slate-950">trong lòng ống dây</strong>, đường sức từ là các đường thẳng song song đều; ở <strong className="text-slate-950">bên ngoài</strong>, chúng tỏa rộng ra rồi uốn cong giống hệt từ phổ của nam châm thẳng.
                </p>
              </div>

            </div>
          </section>

          {/* Quick interactive rule checker */}
          <div className="bg-slate-50 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 space-y-4 shadow-sm text-slate-950">
            <h4 className="text-sm font-black text-slate-950 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-cyan-600 shrink-0" /> Bảng tóm tắt quy tắc xác định chiều đường sức từ:
            </h4>
            <div className="overflow-x-auto text-xs">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 text-left">
                    <th className="p-3 border-2 border-slate-200 text-slate-950 font-black">Đối tượng mang từ</th>
                    <th className="p-3 border-2 border-slate-200 text-slate-950 font-black">Hình dạng đường sức</th>
                    <th className="p-3 border-2 border-slate-200 text-slate-950 font-black">Quy tắc xác định chiều</th>
                  </tr>
                </thead>
                <tbody className="font-semibold text-slate-800">
                  <tr>
                    <td className="p-3 border-2 border-slate-200 font-black text-slate-950">Nam châm vĩnh cửu</td>
                    <td className="p-3 border-2 border-slate-200">Đường cong khép kín ngoài cực</td>
                    <td className="p-3 border-2 border-slate-200 text-cyan-800 font-black">Vào Nam (S) Ra Bắc (N)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-2 border-slate-200 font-black text-slate-950">Dòng điện thẳng dài</td>
                    <td className="p-3 border-2 border-slate-200">Đường tròn đồng tâm vuông góc dây</td>
                    <td className="p-3 border-2 border-slate-200"><strong className="text-slate-950 font-black">Nắm tay phải:</strong> Ngón cái chỉ I, 4 ngón khum chỉ đường sức</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-2 border-slate-200 font-black text-slate-950">Dòng điện tròn / Ống dây</td>
                    <td className="p-3 border-2 border-slate-200">Trục thẳng ở tâm, uốn lượn ngoài</td>
                    <td className="p-3 border-2 border-slate-200"><strong className="text-slate-950 font-black">Nắm tay phải:</strong> 4 ngón theo I, ngón cái chỉ chiều cảm ứng từ ở tâm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TRỢ LÝ AI BÀI HỌC - KHỐI 3D SƯ PHẠM */}
      <div className="bg-gradient-to-b from-indigo-50/50 to-white border-2 border-indigo-250 border-b-[6px] border-b-indigo-350 rounded-3xl p-6 space-y-4 shadow-sm text-slate-900 mt-6">
        <div className="flex items-center justify-between border-b-2 border-indigo-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl border border-indigo-200">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-black text-indigo-950 uppercase tracking-wide">Trợ lý Giáo viên AI - Giải đáp Bài 14</h4>
              <p className="text-[10px] text-slate-500 font-bold">Chuyên gia giải đáp kiến thức Từ trường • Lời nói chuẩn mực sư phạm</p>
            </div>
          </div>
          <button
            onClick={() => setMessages([
              {
                role: "model",
                content: "Thầy/Cô đã đặt lại hộp thoại. Thầy/Cô rất vui lòng được hỗ trợ các em giải đáp mọi thắc mắc liên quan đến Bài 14 và môn Vật lí!"
              }
            ])}
            className="p-1.5 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-300 text-slate-500 hover:text-indigo-600 rounded-xl transition-all cursor-pointer"
            title="Đặt lại trò chuyện"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Chat view window */}
        <div className="h-80 overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 custom-scrollbar shadow-inner">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-indigo-600 border border-indigo-700 text-white rounded-tr-none shadow-md"
                    : "bg-white border-2 border-slate-150 text-slate-900 rounded-tl-none shadow-sm"
                }`}
              >
                <div className="font-sans font-bold text-[10px] uppercase tracking-wide mb-1 opacity-70">
                  {msg.role === "user" ? "Học sinh" : "Thầy/Cô Giáo viên AI"}
                </div>
                <div className="leading-relaxed select-text font-medium space-y-1">
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
              <div className="bg-white border-2 border-slate-150 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-400 flex items-center gap-2 shadow-sm">
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
        <div className="flex flex-wrap gap-1.5 pt-1.5">
          <span className="text-[10px] text-slate-500 font-black self-center mr-1">Gợi ý câu hỏi:</span>
          {[
            "Tính chất cơ bản nhất của từ trường là gì?",
            "Làm thế nào để xác định chiều của vectơ cảm ứng từ B?",
            "Quy tắc nắm tay phải xác định chiều đường sức như thế nào?",
            "Vì sao hai dòng điện song song cùng chiều lại hút nhau?"
          ].map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(promptText)}
              disabled={isTyping}
              className="text-[10px] bg-slate-50 hover:bg-indigo-50/80 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-800 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer font-bold disabled:opacity-50"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            disabled={isTyping}
            placeholder="Đặt câu hỏi về Bài 14 và môn Vật lí..."
            className="flex-1 text-xs font-semibold bg-slate-50 border-2 border-slate-200 hover:border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isTyping || !inputMessage.trim()}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white border-2 border-indigo-700 hover:border-indigo-600 rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
