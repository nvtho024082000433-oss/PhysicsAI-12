import { useState, useEffect, useRef } from "react";
import { BookOpen, Sparkles, Brain, CheckCircle2, ArrowRight, Info, Zap, RefreshCw, Sliders, Gauge, Compass, TrendingUp, Eye, HelpCircle, Send } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson20Textbook() {
  const [activeSubSection, setActiveSubSection] = useState<number>(0);
  
  // AI assistant chat state
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Thầy/Cô chào các em! Thầy/Cô là Trợ lý Giáo viên AI chuyên biệt giải đáp Bài 20: Bài tập về từ trường. Các em có thắc mắc gì cần giải đáp liên quan đến lực từ Ampe, định luật Lenz cảm ứng từ, từ thông hay suất điện động xoay chiều của khung quay không?"
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
          mode: "lesson20"
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

  // Interactive State for Example 1: Magnet & Loop
  const [magnetPos, setMagnetPos] = useState<number>(30); // % from loop (30 = close, 100 = far)
  const [isApproaching, setIsApproaching] = useState<boolean>(true);
  const [magnetPole, setMagnetPole] = useState<"N" | "S">("N");

  // Interactive State for Example 2: Wire in Magnetic Field
  const [wireLength, setWireLength] = useState<number>(10); // cm
  const [magneticB, setMagneticB] = useState<number>(0.05); // T
  const [currentI, setCurrentI] = useState<number>(10); // A
  const [angleDeg, setAngleDeg] = useState<number>(90); // degrees

  // Interactive State for Example 3: Rotating Frame
  const [rotationTime, setRotationTime] = useState<number>(0);
  const [isPlayingRotation, setIsPlayingRotation] = useState<boolean>(true);
  const [coilN, setCoilN] = useState<number>(100);
  const [coilArea, setCoilArea] = useState<number>(20); // cm2

  // Calculation for Example 2
  const lengthM = wireLength / 100;
  const forceAmpere = magneticB * currentI * lengthM * Math.sin((angleDeg * Math.PI) / 180);

  // Calculation for Example 3
  const omega = 100 * Math.PI; // 50 Hz -> 100pi rad/s
  const maxFlux = coilN * 0.1 * (coilArea * 1e-4); // N * B * S
  const currentFlux = maxFlux * Math.cos(omega * rotationTime);
  const maxEMF = omega * maxFlux;
  const currentEMF = maxEMF * Math.sin(omega * rotationTime); // e = E0 sin(omega t)

  // Simulation loop for rotating coil
  useEffect(() => {
    let animId: any;
    if (isPlayingRotation) {
      const update = () => {
        setRotationTime((prev) => (prev + 0.0002) % 0.04); // loop every 40ms
        animId = requestAnimationFrame(update);
      };
      animId = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlayingRotation]);

  const sections = [
    {
      title: "I. LƯU Ý KHI GIẢI BÀI TẬP VỀ TỪ TRƯỜNG",
      subtitle: "Phân loại phương pháp giải toán định tính, định lượng, thí nghiệm và đồ thị",
    },
    {
      title: "II. BÀI TẬP VÍ DỤ MINH HOẠ",
      subtitle: "Các bài toán kinh điển về cảm ứng điện từ, lực Ampe và suất điện động xoay chiều",
    },
    {
      title: "III. BÀI TẬP VẬN DỤNG THỰC TIỄN",
      subtitle: "Hệ thống bài tập bám sát thực tiễn cuộc sống, kỹ thuật và phân tích dữ liệu cân lực từ",
    }
  ];

  return (
    <div className="space-y-8 text-slate-900 font-sans" id="lesson20-textbook">
      {/* Header Banner - Designed as a beautiful 3D block with soft lavender background */}
      <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-slate-900 shadow-[6px_6px_0px_#1e293b] flex justify-between items-center flex-wrap gap-6 transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[5px_5px_0px_#1e293b]">
        <div className="space-y-2">
          <span className="text-[10px] text-indigo-950 font-black uppercase tracking-wider font-mono bg-indigo-150 border-2 border-slate-900 px-3 py-1 rounded-full shadow-[2px_2px_0px_#1e293b] inline-block">
            CHƯƠNG III: TỪ TRƯỜNG
          </span>
          <h2 className="text-2xl font-black text-slate-950 leading-tight uppercase tracking-tight">
            BÀI 20: BÀI TẬP VỀ TỪ TRƯỜNG
          </h2>
          <p className="text-xs text-slate-800 max-w-2xl font-bold leading-relaxed">
            Hệ thống hóa kiến thức lý thuyết cốt lõi, rèn luyện kỹ năng phân tích định tính định lý Lenz, tính toán định lượng lực từ Ampe và thực nghiệm xử lý số liệu cân lực từ thực tế.
          </p>
        </div>
        
        {/* Section buttons - Designed as tactile 3D buttons */}
        <div className="flex flex-wrap gap-2 bg-slate-100 p-2 rounded-2xl border-2 border-slate-900 shadow-inner">
          {sections.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSubSection(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all border-2 border-slate-900 cursor-pointer ${
                activeSubSection === idx
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

      {/* Main Content Area */}
      <div className="space-y-8" id="textbook-content-area">

        {/* SECTION 1: MỘT SỐ LƯU Ý KHI GIẢI BÀI TẬP */}
        {activeSubSection === 0 && (
          <div className="space-y-6 animate-fade-in" id="section-1-content">
            {/* Introductory 3D Panel */}
            <div className="space-y-2 bg-indigo-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b]">
              <span className="inline-block text-[10px] bg-indigo-150 border-2 border-slate-900 text-indigo-950 px-2.5 py-1 rounded-md font-mono font-black uppercase shadow-sm">
                Phương pháp luận vật lí
              </span>
              <h3 className="text-lg font-black text-slate-950">{sections[0].title}</h3>
              <p className="text-xs text-slate-800 font-bold leading-relaxed">
                Để giải quyết tốt các bài tập thuộc Chương III: Từ trường, chúng ta cần phân loại thành 3 phương pháp tiếp cận chủ yếu tương ứng với các dạng bài: Định tính (nhận biết chiều), Định lượng (tính toán trị số) và Thí nghiệm thực hành xử lý số liệu đo đạc.
              </p>
            </div>

            {/* 3 Columns of study tips as 3D blocks with warm/soft colors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tip 1: Định tính - Soft Indigo */}
              <div className="bg-indigo-50/80 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_#1e293b] transition-all duration-150">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2.5">
                  <span className="p-2 bg-indigo-150 text-indigo-950 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#1e293b]">
                    <Compass className="h-5 w-5" />
                  </span>
                  <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider">1. Bài tập định tính</h4>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-bold">
                  Mô tả bản chất từ trường, xác định cảm ứng từ <strong>B</strong> do dòng điện thẳng, tròn, ống dây sinh ra và dòng điện tự cảm.
                </p>
                <div className="p-3.5 bg-white rounded-2xl border-2 border-slate-900 space-y-2.5 shadow-[2px_2px_0px_#1e293b]">
                  <span className="text-[10px] text-indigo-950 font-extrabold uppercase tracking-wider block">Nguyên lý cốt lõi:</span>
                  <ul className="text-[10px] text-slate-900 space-y-2 list-disc list-inside font-bold leading-relaxed">
                    <li><span className="text-indigo-900 font-extrabold">Bàn tay phải:</span> Xác định chiều cảm ứng từ B.</li>
                    <li><span className="text-rose-700 font-extrabold">Định luật Lenz:</span> Dòng điện cảm ứng xuất hiện chống lại nguyên nhân sinh ra nó.</li>
                    <li><span className="text-emerald-800 font-extrabold">Bàn tay trái:</span> Xác định lực từ tác dụng.</li>
                  </ul>
                </div>
              </div>

              {/* Tip 2: Định lượng - Soft Pink/Rose */}
              <div className="bg-rose-50/80 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_#1e293b] transition-all duration-150">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2.5">
                  <span className="p-2 bg-rose-150 text-rose-950 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#1e293b]">
                    <Gauge className="h-5 w-5" />
                  </span>
                  <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider">2. Bài tập định lượng</h4>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-bold">
                  Tính toán độ lớn lực Ampe, từ thông, suất điện động cảm ứng trong khung dây quay đều hoặc chuyển động tịnh tiến.
                </p>
                <div className="p-3.5 bg-white rounded-2xl border-2 border-slate-900 space-y-2 shadow-[2px_2px_0px_#1e293b]">
                  <span className="text-[10px] text-rose-950 font-extrabold uppercase tracking-wider block">Các hệ thức cơ bản:</span>
                  <ul className="text-[10px] text-slate-900 space-y-2 leading-relaxed">
                    <li>• Lực từ: <FormattedMathText text="F = B.I.L.\sin(\alpha)" /></li>
                    <li>• Từ thông: <FormattedMathText text="\Phi = N.B.S.\cos(\alpha)" /></li>
                    <li>• SĐĐ cảm ứng: <FormattedMathText text="e = -\frac{\Delta\Phi}{\Delta t}" /></li>
                    <li>• SĐĐ xoay chiều: <FormattedMathText text="e = E_0.\sin(\omega t)" /></li>
                  </ul>
                </div>
              </div>

              {/* Tip 3: Thí nghiệm & Đồ thị - Soft Emerald */}
              <div className="bg-emerald-50/80 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_#1e293b] transition-all duration-150">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2.5">
                  <span className="p-2 bg-emerald-150 text-emerald-950 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#1e293b]">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider">3. Thí nghiệm & Đồ thị</h4>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-bold">
                  Sử dụng kết quả thực nghiệm đo lực từ, lập bảng số liệu, phân tích sai số và xử lý đồ thị tuyến tính để tìm hệ số cảm ứng từ B.
                </p>
                <div className="p-3.5 bg-white rounded-2xl border-2 border-slate-900 space-y-2 shadow-[2px_2px_0px_#1e293b]">
                  <span className="text-[10px] text-emerald-950 font-extrabold uppercase tracking-wider block">Phương pháp xử lý:</span>
                  <ul className="text-[10px] text-slate-900 space-y-1.5 list-disc list-inside font-bold leading-relaxed">
                    <li>Nội suy tuyến tính tìm độ dốc đường thẳng F(I) để suy ra cảm ứng từ B.</li>
                    <li>Giải thích nguyên nhân sai số ngẫu nhiên & sai số hệ thống.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mindmap Sơ đồ tư duy - Beautifully designed 3D Board */}
            <div className="bg-amber-50/70 p-6 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b] space-y-4">
              <h4 className="text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                <span className="p-1.5 bg-amber-150 border-2 border-slate-900 rounded-xl"><Sparkles className="h-4.5 w-4.5 text-amber-900 animate-pulse" /></span>
                Sơ đồ tư duy liên kết kiến thức chương từ trường
              </h4>
              <div className="border-2 border-slate-900 rounded-2xl p-5 bg-white relative overflow-hidden shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10">
                  {/* Left Branches */}
                  <div className="space-y-4">
                    {/* Block 1 */}
                    <div className="bg-sky-50 border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_#1e293b] space-y-2 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1e293b] transition-all">
                      <span className="text-[11px] text-sky-950 font-black uppercase tracking-wider block">1. Nguồn gốc dòng điện</span>
                      <p className="text-xs text-slate-800 font-bold leading-relaxed">
                        Từ trường sinh bởi các dòng điện có hình dạng đặc biệt: Dòng điện thẳng dài, dòng điện tròn và ống dây hình trụ.
                      </p>
                    </div>
                    {/* Block 2 */}
                    <div className="bg-rose-50 border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_#1e293b] space-y-2 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1e293b] transition-all">
                      <span className="text-[11px] text-rose-950 font-black uppercase tracking-wider block">2. Tác dụng cơ học</span>
                      <p className="text-xs text-slate-800 font-bold leading-relaxed">
                        Lực từ tác dụng lên dây dẫn thẳng mang dòng điện (Lực Ampe). Chiều được xác định bằng quy tắc bàn tay trái.
                      </p>
                    </div>
                  </div>

                  {/* Central Node */}
                  <div className="flex flex-col items-center justify-center py-4 md:py-0">
                    <div className="hidden md:flex items-center justify-between w-full relative">
                      <div className="absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-[2px] border-t-2 border-dashed border-slate-900 z-0"></div>
                      <div className="absolute left-1/2 right-0 top-1/2 -translate-y-1/2 h-[2px] border-t-2 border-dashed border-slate-900 z-0"></div>
                      <div className="mx-auto bg-indigo-400 text-slate-950 font-black px-5 py-3 rounded-2xl shadow-[4px_4px_0px_rgba(30,41,59,1)] text-xs uppercase tracking-wider font-mono text-center border-2 border-slate-900 z-10">
                        TỪ TRƯỜNG & ĐIỆN TỪ
                      </div>
                    </div>
                    <div className="md:hidden bg-indigo-400 text-slate-950 font-black px-5 py-3 rounded-2xl shadow-[4px_4px_0px_rgba(30,41,59,1)] text-xs uppercase tracking-wider font-mono text-center w-full border-2 border-slate-900">
                      TỪ TRƯỜNG & ĐIỆN TỪ
                    </div>
                  </div>

                  {/* Right Branches */}
                  <div className="space-y-4">
                    {/* Block 3 */}
                    <div className="bg-emerald-50 border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_#1e293b] space-y-2 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1e293b] transition-all">
                      <span className="text-[11px] text-emerald-950 font-black uppercase tracking-wider block">3. Cảm ứng điện từ</span>
                      <p className="text-xs text-slate-800 font-bold leading-relaxed">
                        Hiện tượng từ thông qua mạch biến thiên sinh ra suất điện động cảm ứng, từ trường cảm ứng luôn chống lại sự biến thiên.
                      </p>
                    </div>
                    {/* Block 4 */}
                    <div className="bg-amber-50 border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_#1e293b] space-y-2 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1e293b] transition-all">
                      <span className="text-[11px] text-amber-950 font-black uppercase tracking-wider block">4. Máy phát & Biến áp</span>
                      <p className="text-xs text-slate-800 font-bold leading-relaxed">
                        Ứng dụng của dòng điện xoay chiều: Máy phát điện cơ học xoay chiều, máy biến áp thay đổi điện áp hiệu dụng.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: BÀI TẬP VÍ DỤ MINH HOẠ */}
        {activeSubSection === 1 && (
          <div className="space-y-8 animate-fade-in" id="section-2-content">
            {/* Intro panel */}
            <div className="space-y-2 bg-rose-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b]">
              <span className="inline-block text-[10px] bg-rose-150 border-2 border-slate-900 text-rose-950 px-2.5 py-1 rounded-md font-mono font-black uppercase shadow-sm">
                Bài toán mẫu chuẩn mực
              </span>
              <h3 className="text-lg font-black text-slate-950">{sections[1].title}</h3>
              <p className="text-xs text-slate-850 font-bold leading-relaxed">
                Phân tích chi tiết 3 bài toán kinh điển bao quát các chủ đề: Định luật Lenz cảm ứng điện từ, Lực từ Ampe lên dây thẳng, và Máy phát điện xoay chiều quay khung dây.
              </p>
            </div>

            {/* EXAMPLE 1 - Magnet and loop */}
            <div className="bg-indigo-50/50 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] p-6 space-y-5" id="example-1">
              <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-2.5">
                <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-md text-[10px] font-black font-mono border-2 border-slate-900">
                  Ví dụ 1
                </span>
                <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide">
                  Xác định chiều dòng điện cảm ứng & lực đẩy vòng dây
                </h4>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 space-y-2 shadow-[2px_2px_0px_#1e293b]">
                <span className="text-[10px] text-amber-750 font-black uppercase tracking-wider block">Đề bài (Hình 20.1):</span>
                <p className="text-xs text-slate-800 leading-relaxed font-bold">
                  Đưa một nam châm thẳng lại gần vòng dây dẫn kín đặt trên bàn cách điện (Hình 20.1). Hãy xác định chiều dòng điện cảm ứng trong vòng dây và cho biết chiều dịch chuyển của vòng dây.
                </p>
              </div>

              {/* Interactive Widget - Example 1 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 bg-slate-950 border-2 border-slate-900 rounded-3xl p-4 flex flex-col items-center justify-center relative min-h-[250px] shadow-inner text-white">
                  <div className="absolute top-2 left-2 flex gap-2">
                    <span className="text-[9px] bg-slate-900 border border-slate-700 text-cyan-400 px-2.5 py-1 rounded font-mono font-black">
                      MÔ HÌNH THÍ NGHIỆM TƯƠNG TÁC
                    </span>
                  </div>

                  {/* Inside Widget controls */}
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-slate-900/90 backdrop-blur-sm p-2 rounded-xl text-[9px] gap-2 border-2 border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-300">Cực nam châm:</span>
                      <button
                        onClick={() => setMagnetPole(magnetPole === "N" ? "S" : "N")}
                        className={`px-2 py-1 rounded-lg font-black text-[9px] border-2 cursor-pointer transition-all ${
                          magnetPole === "N" ? "bg-red-600 border-slate-800 text-white shadow-[1px_1px_0px_#000]" : "bg-blue-600 border-slate-800 text-white shadow-[1px_1px_0px_#000]"
                        }`}
                      >
                        Cực {magnetPole === "N" ? "N (Đỏ)" : "S (Xanh)"}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-300">Hành vi:</span>
                      <button
                        onClick={() => setIsApproaching(!isApproaching)}
                        className={`px-2 py-1 rounded-lg font-black text-[9px] cursor-pointer border-2 transition-all ${
                          isApproaching ? "bg-indigo-600 text-white border-slate-800 shadow-[1px_1px_0px_#000]" : "bg-amber-600 text-white border-slate-800 shadow-[1px_1px_0px_#000]"
                        }`}
                      >
                        {isApproaching ? "Lại gần" : "Ra xa"}
                      </button>
                    </div>
                  </div>

                  {/* SVG for loop */}
                  <svg viewBox="0 0 400 160" className="w-full max-w-[340px] h-auto">
                    {/* Magnet */}
                    <g transform={`translate(${magnetPos}, 0)`}>
                      <rect x="20" y="60" width="40" height="30" fill="#2563eb" rx="2" />
                      <text x="40" y="79" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">S</text>
                      
                      <rect x="60" y="60" width="40" height="30" fill="#dc2626" rx="2" />
                      <text x="80" y="79" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">N</text>
                      
                      {magnetPole === "S" && (
                        <>
                          <rect x="20" y="60" width="40" height="30" fill="#dc2626" rx="2" />
                          <text x="40" y="79" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">N</text>
                          <rect x="60" y="60" width="40" height="30" fill="#2563eb" rx="2" />
                          <text x="80" y="79" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">S</text>
                        </>
                      )}
                      
                      {/* Direction arrow */}
                      <path
                        d={isApproaching ? "M 110 75 L 140 75 M 132 70 L 140 75 L 132 80" : "M 30 75 L 5 75 M 13 70 L 5 75 L 13 80"}
                        stroke="#fbbf24"
                        strokeWidth="3"
                        fill="none"
                      />
                    </g>

                    {/* Wire loop */}
                    <ellipse cx="250" cy="75" rx="10" ry="40" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                    <path d="M 250 35 A 10 40 0 0 1 250 115" stroke="#f43f5e" strokeWidth="5" fill="none" />
                    <path d="M 250 115 A 10 40 0 0 1 250 35" stroke="#fb7185" strokeWidth="5" fill="none" />
                    
                    <line x1="250" y1="115" x2="250" y2="150" stroke="#94a3b8" strokeWidth="3" />
                    <rect x="230" y="148" width="40" height="4" fill="#1e293b" />

                    {/* Vector pointers */}
                    <path d="M 120 75 L 220 75" stroke="#10b981" strokeWidth="2" strokeDasharray="4" fill="none" />
                    <path d="M 215 71 L 223 75 L 215 79" fill="#10b981" />
                    <text x="180" y="92" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">B (ngoài)</text>

                    {isApproaching ? (
                      <>
                        <path d="M 250 75 L 180 75" stroke="#60a5fa" strokeWidth="2" fill="none" />
                        <path d="M 185 71 L 177 75 L 185 79" fill="#60a5fa" />
                        <text x="190" y="65" fill="#60a5fa" fontSize="9" fontWeight="bold" fontFamily="monospace">Bc (đối kháng)</text>
                        
                        <path d="M 256 50 Q 252 65 256 80" stroke="#fbbf24" strokeWidth="2" fill="none" />
                        <path d="M 253 72 L 256 80 L 259 72" fill="#fbbf24" />
                        <text x="270" y="68" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">Ic (Chiều kim)</text>

                        <path d="M 250 75 L 285 75" stroke="#dc2626" strokeWidth="3" fill="none" />
                        <path d="M 279 70 L 287 75 L 279 80" fill="#dc2626" />
                        <text x="270" y="95" fill="#f87171" fontSize="9" fontWeight="bold">Lực đẩy &rarr;</text>
                      </>
                    ) : (
                      <>
                        <path d="M 250 75 L 290 75" stroke="#34d399" strokeWidth="2" fill="none" />
                        <path d="M 283 71 L 291 75 L 283 79" fill="#34d399" />
                        <text x="270" y="65" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">Bc (Hút giữ)</text>
                        
                        <path d="M 244 50 Q 248 65 244 80" stroke="#fbbf24" strokeWidth="2" fill="none" />
                        <path d="M 241 58 L 244 50 L 247 58" fill="#fbbf24" />
                        <text x="200" y="68" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">Ic</text>

                        <path d="M 250 75 L 215 75" stroke="#3b82f6" strokeWidth="3" fill="none" />
                        <path d="M 221 70 L 213 75 L 221 80" fill="#3b82f6" />
                        <text x="200" y="95" fill="#60a5fa" fontSize="9" fontWeight="bold">&larr; Lực hút</text>
                      </>
                    )}
                  </svg>

                  <div className="mt-2 text-[9px] text-slate-400 font-bold text-center">
                    Kéo thanh trượt để di chuyển nam châm ảo
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={magnetPos}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setIsApproaching(val < magnetPos);
                      setMagnetPos(val);
                    }}
                    className="w-full max-w-[280px] accent-indigo-500 mt-2 cursor-pointer"
                  />
                </div>

                <div className="md:col-span-5 space-y-3">
                  <span className="text-[10px] text-indigo-950 font-black uppercase tracking-wider block">Lời giải và biện luận định lý Lenz:</span>
                  <div className="text-xs text-slate-800 space-y-2.5 leading-relaxed font-bold">
                    <p>
                      • <span className="font-black text-slate-950">Vectơ cảm ứng từ B:</span> Hướng từ Trái sang Phải, phát ra từ cực Bắc (N) của nam châm và xuyên thẳng vào mặt trái vòng dây dẫn.
                    </p>
                    <p>
                      • <span className="font-black text-slate-950">Khi đưa nam châm lại gần:</span> Từ thông qua vòng dây tăng lên. Để kháng cự sự tăng này, dòng cảm ứng sinh ra từ trường ngược chiều Bc hướng từ Phải sang Trái.
                    </p>
                    <p>
                      • <span className="font-black text-slate-950">Chiều dòng điện Ic:</span> Áp dụng quy tắc nắm tay phải, ngón cái chỉ sang trái, suy ra dòng điện chạy theo <span className="text-indigo-700 font-black">chiều kim đồng hồ</span> (khi nhìn trực diện).
                    </p>
                    <p>
                      • <span className="font-black text-slate-950">Lực tương tác:</span> Để cản trở nam châm tiến lại, xuất hiện lực từ đẩy làm vòng dây lệch <span className="text-rose-600 font-black">sang bên phải (ra xa nam châm)</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* EXAMPLE 2 - Force on wire */}
            <div className="bg-rose-50/50 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] p-6 space-y-5" id="example-2">
              <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-2.5">
                <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-md text-[10px] font-black font-mono border-2 border-slate-900">
                  Ví dụ 2
                </span>
                <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide">
                  Lực từ Ampe tác dụng lên đoạn dây thẳng mang dòng điện
                </h4>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 space-y-2 shadow-[2px_2px_0px_#1e293b]">
                <span className="text-[10px] text-amber-750 font-black uppercase tracking-wider block">Đề bài:</span>
                <p className="text-xs text-slate-850 leading-relaxed font-bold">
                  Một dây dẫn thẳng dài L = 10 cm đặt trong từ trường đều có cảm ứng từ B = 0,05 T. Cho dòng điện I = 10 A chạy qua dây dẫn.
                  <br />a) Tính lực từ tác dụng khi dây đặt vuông góc với cảm ứng từ B.
                  <br />b) Khi lực từ đo được là 0,043 N, xác định góc α giữa B và dòng điện.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* 3D Calculator widget - Soft Light Gray-Blue style */}
                <div className="lg:col-span-5 bg-slate-100 text-slate-900 p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b] space-y-4">
                  <div className="flex justify-between items-center border-b-2 border-slate-900 pb-2.5">
                    <span className="text-[10px] text-indigo-950 font-black uppercase tracking-wider font-mono">
                      Công cụ tính toán lực Ampe 3D
                    </span>
                    <button
                      onClick={() => {
                        setWireLength(10);
                        setMagneticB(0.05);
                        setCurrentI(10);
                        setAngleDeg(90);
                      }}
                      className="p-1.5 bg-white border-2 border-slate-900 rounded-lg hover:bg-slate-50 cursor-pointer shadow-[1px_1px_0px_#000]"
                    >
                      <RefreshCw className="h-3.5 w-3.5 text-slate-900" />
                    </button>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-[10px] text-slate-800 font-bold">
                        <span>Độ dài dây L: {wireLength} cm</span>
                        <span>({(wireLength/100).toFixed(2)} m)</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="30"
                        value={wireLength}
                        onChange={(e) => setWireLength(parseInt(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-[10px] text-slate-800 font-bold">
                        <span>Cường độ dòng I: {currentI} A</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="25"
                        value={currentI}
                        onChange={(e) => setCurrentI(parseInt(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-[10px] text-slate-800 font-bold">
                        <span>Cảm ứng từ B: {magneticB.toFixed(3)} T</span>
                      </div>
                      <input
                        type="range"
                        min="0.01"
                        max="0.2"
                        step="0.01"
                        value={magneticB}
                        onChange={(e) => setMagneticB(parseFloat(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-[10px] text-slate-800 font-bold">
                        <span>Góc hợp α: {angleDeg}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="180"
                        step="5"
                        value={angleDeg}
                        onChange={(e) => setAngleDeg(parseInt(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Calculations display - 3D Box in widget */}
                  <div className="border-2 border-slate-900 pt-3 mt-1 space-y-2 bg-emerald-50 p-3 rounded-2xl shadow-[2px_2px_0px_#1e293b]">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-900 font-bold">
                      <span>Biểu thức:</span>
                      <span className="text-indigo-800 font-black">F = B . I . L . sin(α)</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-800 font-bold">
                      <span>Thay số:</span>
                      <span>
                        {magneticB.toFixed(3)} × {currentI} × {lengthM.toFixed(2)} × sin({angleDeg}°)
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-mono border-t border-dashed border-slate-900 pt-2 text-slate-900">
                      <span className="font-black">LỰC AMPE F:</span>
                      <span className="text-emerald-800 font-black text-xs">{forceAmpere.toFixed(5)} N</span>
                    </div>
                  </div>
                </div>

                {/* Mathematical step-by-step solutions - styled with soft colored 3D cards */}
                <div className="lg:col-span-7 space-y-4 text-xs font-bold text-slate-800">
                  {/* Part a Solution */}
                  <div className="p-4 bg-amber-50 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_#1e293b] space-y-2">
                    <span className="text-[10px] text-amber-950 font-black uppercase tracking-wider block">Lời giải chi tiết câu a):</span>
                    <p className="leading-relaxed">
                      Lực từ tác dụng lên đoạn dây dẫn mang dòng điện được xác định bằng công thức định luật Ampe:
                      <br />
                      <span className="font-mono block my-1.5 bg-white p-2 rounded-xl border-2 border-slate-900 text-center text-xs text-slate-900 font-black">
                        F = B . I . L . sin(α)
                      </span>
                      Do dây dẫn đặt vuông góc với vectơ cảm ứng từ B, góc hợp bởi chúng là α = 90° ⇒ sin(90°) = 1.
                      <br />
                      Thay trị số:
                      <br />
                      <span className="font-mono text-slate-900 font-black block mt-1 bg-white border border-slate-200 p-1 w-fit rounded">
                        F = 0,05 T × 10 A × 0,1 m × 1 = 0,05 N.
                      </span>
                    </p>
                  </div>

                  {/* Part b Solution */}
                  <div className="p-4 bg-indigo-50 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_#1e293b] space-y-2">
                    <span className="text-[10px] text-indigo-950 font-black uppercase tracking-wider block">Lời giải chi tiết câu b):</span>
                    <p className="leading-relaxed">
                      Khi đề cho biết độ lớn của lực từ thu được là F = 0,043 N, ta xác định góc lệch α:
                      <br />
                      Biến đổi toán học:
                      <span className="font-mono block my-1.5 bg-white p-2 rounded-xl border-2 border-slate-900 text-center text-xs text-indigo-950 font-black">
                        sin(α) = F / (B . I . L)
                      </span>
                      Thay các giá trị đại lượng:
                      <br />
                      <span className="font-mono text-slate-900 font-black block my-1 bg-white border border-slate-200 p-1 w-fit rounded">
                        sin(α) = 0,043 / (0,05 × 10 × 0,1) = 0,043 / 0,05 = 0,86.
                      </span>
                      Suy ra góc lệch hợp bởi vectơ pháp tuyến dòng điện:
                      <br />
                      <span className="font-black text-indigo-700 font-mono">
                        α = arcsin(0,86) ≈ 60° (hoặc 120°).
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* EXAMPLE 3 - Rotating Frame */}
            <div className="bg-sky-50/50 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] p-6 space-y-5" id="example-3">
              <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-2.5">
                <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-md text-[10px] font-black font-mono border-2 border-slate-900">
                  Ví dụ 3
                </span>
                <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide">
                  Suất điện động cảm ứng trong khung dây phẳng quay đều
                </h4>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 space-y-2 shadow-[2px_2px_0px_#1e293b]">
                <span className="text-[10px] text-amber-750 font-black uppercase tracking-wider block">Đề bài:</span>
                <p className="text-xs text-slate-850 leading-relaxed font-bold">
                  Một khung dây phẳng giới hạn diện tích S = 20 cm², có N = 100 vòng dây quay đều với tần số góc quanh trục vuông góc với từ trường đều B = 0,1 T với tốc độ 50 vòng/giây. Chọn gốc thời gian t = 0 lúc pháp tuyến n cùng chiều với cảm ứng từ B.
                  <br />a) Viết biểu thức xác định từ thông qua khung dây.
                  <br />b) Viết biểu thức xác định suất điện động xuất hiện trong khung dây.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Step-by-step solutions */}
                <div className="lg:col-span-7 space-y-4 text-xs font-bold text-slate-800">
                  {/* Part a */}
                  <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_#1e293b] space-y-2">
                    <span className="text-[10px] text-emerald-950 font-black uppercase tracking-wider block">Câu a) Từ thông qua khung dây:</span>
                    <p className="leading-relaxed">
                      1. Tần số góc quay ω của khung dây dẫn phẳng:
                      <br />
                      <span className="font-mono text-slate-900 font-black block my-1">
                        ω = 50 vòng/s × 2π = 100π (rad/s) ≈ 314,16 rad/s.
                      </span>
                      2. Tại thời điểm t, từ thông qua khung dây gửi qua mạch là:
                      <br />
                      <span className="font-mono block my-1.5 bg-white p-2 rounded-xl border-2 border-slate-900 text-center text-xs text-emerald-950 font-black">
                        Φ(t) = N . B . S . cos(ωt)
                      </span>
                      Với S = 20 cm² = 20 × 10⁻⁴ m², B = 0,1 T, N = 100 vòng:
                      <br />
                      <span className="font-mono text-indigo-700 font-black block mt-1 bg-white border border-slate-200 p-1 w-fit rounded">
                        Φ(t) = 100 × 0,1 × 20.10⁻⁴ cos(100πt) = 0,02 cos(100πt) (Wb).
                      </span>
                    </p>
                  </div>

                  {/* Part b */}
                  <div className="p-4 bg-rose-50 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_#1e293b] space-y-2">
                    <span className="text-[10px] text-rose-950 font-black uppercase tracking-wider block">Câu b) Suất điện động cảm ứng:</span>
                    <p className="leading-relaxed">
                      Theo định luật Faraday, suất điện động tự cảm xoay chiều bằng đạo hàm thời gian đổi dấu của từ thông:
                      <br />
                      <span className="font-mono block my-1.5 bg-white p-2 rounded-xl border-2 border-slate-900 text-center text-xs text-rose-950 font-black">
                        e(t) = -dΦ/dt = ω . N . B . S . sin(ωt)
                      </span>
                      Độ lớn cực đại:
                      <br />
                      <span className="font-mono text-slate-900 font-black block my-1 bg-white border border-slate-200 p-1 w-fit rounded">
                        E₀ = ω . N . B . S = 100π × 0,02 = 2π ≈ 6,28 V.
                      </span>
                      Suy ra biểu thức suất điện động cảm ứng xoay chiều:
                      <br />
                      <span className="font-mono text-rose-700 font-black block mt-1 bg-white p-2 rounded border-2 border-slate-800">
                        e(t) = 6,28 sin(100πt) (V) = 6,28 cos(100πt - π/2) (V).
                      </span>
                    </p>
                  </div>
                </div>

                {/* Oscilloscope instrument style visualization */}
                <div className="lg:col-span-5 bg-slate-950 text-white p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b] space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-[10px] text-cyan-400 font-black uppercase tracking-wider font-mono">
                      Biểu đồ dạng sóng xoay chiều
                    </span>
                    <button
                      onClick={() => setIsPlayingRotation(!isPlayingRotation)}
                      className="px-2.5 py-1.5 rounded-xl text-[9px] bg-indigo-600 hover:bg-indigo-500 font-black text-white border-2 border-slate-800 cursor-pointer active:scale-95 transition-all shadow-[1px_1px_0px_#000]"
                    >
                      {isPlayingRotation ? "Tạm dừng" : "Tiếp tục"}
                    </button>
                  </div>

                  {/* Scope screen */}
                  <div className="relative h-[140px] bg-slate-950 rounded-xl p-2 border-2 border-slate-800 flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 200 100" className="w-full h-full">
                      {/* Grid */}
                      <line x1="10" y1="50" x2="190" y2="50" stroke="#1e293b" strokeWidth="1" />
                      <line x1="10" y1="10" x2="10" y2="90" stroke="#1e293b" strokeWidth="1" />
                      
                      <text x="180" y="45" fill="#475569" fontSize="6" fontFamily="monospace">t (s)</text>
                      <text x="15" y="15" fill="#3b82f6" fontSize="6" fontFamily="monospace">Φ (×50 Wb)</text>
                      <text x="15" y="90" fill="#f43f5e" fontSize="6" fontFamily="monospace">e (V)</text>

                      {/* Waveform 1: Flux cosinusoidal (Blue) */}
                      <path
                        d={Array.from({ length: 180 }).map((_, i) => {
                          const x = 10 + i;
                          const t = (i / 180) * 0.04;
                          const y = 50 - 30 * Math.cos(100 * Math.PI * t);
                          return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                        }).join(" ")}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                      />

                      {/* Waveform 2: EMF sinusoidal (Red) */}
                      <path
                        d={Array.from({ length: 180 }).map((_, i) => {
                          const x = 10 + i;
                          const t = (i / 180) * 0.04;
                          const y = 50 - 30 * Math.sin(100 * Math.PI * t);
                          return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                        }).join(" ")}
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="1.5"
                      />

                      {/* Marker Bar */}
                      <line
                        x1={10 + (rotationTime / 0.04) * 180}
                        y1="10"
                        x2={10 + (rotationTime / 0.04) * 180}
                        y2="90"
                        stroke="#fbbf24"
                        strokeWidth="1.5"
                        strokeDasharray="2"
                      />
                    </svg>

                    <div className="absolute top-2 right-2 bg-slate-900/80 border border-slate-850 p-1 rounded text-[8px] text-slate-300">
                      Góc: {( (omega * rotationTime * 180) / Math.PI % 360 ).toFixed(0)}°
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[9px] font-mono bg-black/40 p-3 rounded-2xl border border-slate-850">
                    <div>
                      <span className="text-slate-500 uppercase block">Từ thông Φ:</span>
                      <span className="text-blue-400 font-bold block">{currentFlux.toFixed(4)} Wb</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase block">Điện thế e:</span>
                      <span className="text-rose-400 font-bold block">{currentEMF.toFixed(2)} V</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: BÀI TẬP VẬN DỤNG CÓ TÍNH THỰC TIỄN CAO */}
        {activeSubSection === 2 && (
          <div className="space-y-6 animate-fade-in" id="section-3-content">
            <div className="space-y-2 bg-emerald-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b]">
              <span className="inline-block text-[10px] bg-emerald-150 border-2 border-slate-900 text-emerald-950 px-2.5 py-1 rounded-md font-mono font-black uppercase shadow-sm">
                Bài tập rèn luyện vận dụng
              </span>
              <h3 className="text-lg font-black text-slate-950">{sections[2].title}</h3>
              <p className="text-xs text-slate-850 font-bold leading-relaxed">
                Hệ thống câu hỏi bài tập rèn luyện nâng cao năng lực vật lí bám sát định hướng thi tốt nghiệp THPT, lý thuyết tích hợp phân tích đồ thị và số liệu thí nghiệm thực tiễn.
              </p>
            </div>

            {/* Practical Exercise 1 - Soft Amber */}
            <div className="bg-amber-50/80 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_#1e293b] transition-all duration-150">
              <div className="space-y-1.5 border-b-2 border-slate-900 pb-2">
                <span className="text-[9px] bg-amber-100 border-2 border-amber-900 text-amber-950 px-2.5 py-0.5 rounded-md font-mono font-black uppercase">
                  Bài tập 1 • Lực Ampe trên khung chữ nhật
                </span>
                <h4 className="text-xs sm:text-sm font-black text-slate-950 leading-normal">
                  Đặt một khung dây dẫn hình chữ nhật ABCD có dòng điện chạy qua vào một từ trường đều. Mặt phẳng khung vuông góc với cảm ứng từ B (Hình 20.4). Hỏi trạng thái cơ học của khung dây như thế nào?
                </h4>
              </div>
              <div className="p-4 bg-white rounded-2xl border-2 border-slate-900 text-xs text-slate-800 leading-relaxed font-bold space-y-2 shadow-[2px_2px_0px_#1e293b]">
                <span className="text-[10px] text-emerald-850 font-black uppercase tracking-wider block">Phân tích vật lý:</span>
                <p>
                  Áp dụng quy tắc bàn tay trái lên 4 cạnh của khung ABCD. Các lực từ có phương vuông góc với các cạnh và cùng nằm trong mặt phẳng của khung (kéo dãn khung hoặc nén khung đều từ mọi phía tùy chiều dòng điện). Do các lực này đối xứng qua tâm và cùng nằm trên mặt phẳng khung, chúng không tạo ra ngẫu lực quay. Vì vậy, <span className="text-slate-950 font-black">khung dây không quay, chỉ bị biến dạng cơ học (giãn hoặc nén)</span>.
                </p>
              </div>
            </div>

            {/* Practical Exercise 2 - Soft Sky */}
            <div className="bg-sky-50/80 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_#1e293b] transition-all duration-150">
              <div className="space-y-1.5 border-b-2 border-slate-900 pb-2">
                <span className="text-[9px] bg-sky-100 border-2 border-sky-900 text-sky-950 px-2.5 py-0.5 rounded-md font-mono font-black uppercase">
                  Bài tập 2 • Định luật Lenz cảm ứng từ
                </span>
                <h4 className="text-xs sm:text-sm font-black text-slate-950 leading-normal">
                  Đặt một thanh nam châm thẳng ở gần một khung dây dẫn kín ABCD. Xác định chiều dòng điện cảm ứng xuất hiện trong khung khi đưa cực Nam (S) của nam châm lại gần khung dây?
                </h4>
              </div>
              <div className="p-4 bg-white rounded-2xl border-2 border-slate-900 text-xs text-slate-800 leading-relaxed font-bold space-y-2 shadow-[2px_2px_0px_#1e293b]">
                <span className="text-[10px] text-indigo-950 font-black uppercase tracking-wider block">Gợi ý phân tích nhanh:</span>
                <p>
                  Khi đưa cực Nam (S) của nam châm lại gần khung ABCD, từ thông đâm xuyên tăng lên. Theo định luật Lenz, mặt đối diện của khung dây xuất hiện cực Nam cảm ứng (S) để đẩy cản trở nam châm lại gần. Áp dụng quy tắc nắm tay phải với ngón cái chỉ chiều cảm ứng đi ra, ta xác định dòng điện chạy theo <span className="text-indigo-700 font-black">chiều kim đồng hồ</span> khi nhìn trực diện từ phía thanh nam châm.
                </p>
              </div>
            </div>

            {/* Practical Exercise 3 - Soft Purple */}
            <div className="bg-violet-50/80 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_#1e293b] transition-all duration-150">
              <div className="space-y-1.5 border-b-2 border-slate-900 pb-2">
                <span className="text-[9px] bg-violet-150 border-2 border-violet-900 text-violet-950 px-2.5 py-0.5 rounded-md font-mono font-black uppercase">
                  Bài tập 3 • Từ thông qua mặt nghiêng (Bẫy góc lệch)
                </span>
                <h4 className="text-xs sm:text-sm font-black text-slate-950 leading-normal">
                  Một vòng dây phẳng giới hạn diện tích S = 40 cm² đặt trong từ trường đều B = 0,1 T. Mặt phẳng vòng dây hợp với vectơ B một góc β = 30°. Tính từ thông qua S?
                </h4>
              </div>
              <div className="p-4 bg-white rounded-2xl border-2 border-slate-900 text-xs text-slate-800 leading-relaxed space-y-2.5 shadow-[2px_2px_0px_#1e293b] font-bold">
                <p className="text-slate-950 font-black flex items-center gap-1.5">
                  <span className="text-rose-600 font-black animate-pulse">🚨 Bẫy góc góc hợp đề bài:</span> Đề bài cho góc giữa <span className="underline font-bold text-slate-950">mặt phẳng vòng dây</span> và vectơ B là 30°.
                </p>
                <div className="bg-amber-50 p-3.5 rounded-2xl border-2 border-slate-900 space-y-2 text-xs text-slate-900 font-bold shadow-[2px_2px_0px_#1e293b]">
                  <div>• Góc pháp tuyến: <FormattedMathText text="\alpha = 90^\circ - \beta = 90^\circ - 30^\circ = 60^\circ" /></div>
                  <div>• Đổi đơn vị diện tích: <FormattedMathText text="S = 40\text{ cm}^2 = 40 \cdot 10^{-4}\text{ m}^2" /></div>
                  <div>• Biểu thức từ thông: <FormattedMathText text="\Phi = B \cdot S \cdot \cos(\alpha)" /></div>
                  <div>• Giá trị tính toán: <FormattedMathText text="\Phi = 0,1 \cdot 40 \cdot 10^{-4} \cdot \cos(60^\circ) = 2 \cdot 10^{-4}\text{ Wb} = 0,2\text{ mWb}" /></div>
                </div>
              </div>
            </div>

            {/* Practical Exercise 4 - Soft Pink & Table */}
            <div className="bg-rose-50/80 p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#1e293b] space-y-4 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_#1e293b] transition-all duration-150" id="exercise-4-balance">
              <div className="space-y-1.5 border-b-2 border-slate-900 pb-2">
                <span className="text-[9px] bg-rose-150 border-2 border-rose-900 text-rose-950 px-2.5 py-0.5 rounded-md font-mono font-black uppercase">
                  Bài tập 4 • Thực nghiệm xử lý số liệu đo lực Ampe bằng cân điện tử
                </span>
                <h4 className="text-xs sm:text-sm font-black text-slate-950 leading-normal">
                  Khảo sát lực từ tác dụng lên một đoạn dây dẫn thẳng đặt cố định trong khe từ trường của khối nam châm nằm trên đĩa cân điện tử. Kết quả thu được ghi lại ở Bảng 20.1 bên dưới.
                </h4>
              </div>

              {/* High Contrast 3D Styled Table Container */}
              <div className="overflow-x-auto rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_#1e293b] bg-white">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-indigo-600 text-white font-mono text-[10px] uppercase border-b-2 border-slate-900">
                      <th className="p-2.5 border-r border-slate-900">Lần đo</th>
                      <th className="p-2.5 border-r border-slate-900">Cường độ dòng I (A)</th>
                      <th className="p-2.5 border-r border-slate-900">Chiều dài dây L (m)</th>
                      <th className="p-2.5 border-r border-slate-900">Lực từ hiển thị F (N)</th>
                      <th className="p-2.5">Tính toán B = F/(I.L) (T)</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-[11px] font-bold text-slate-900">
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <td className="p-2 border-r border-slate-200 text-center">1</td>
                      <td className="p-2 border-r border-slate-200">2,5</td>
                      <td className="p-2 border-r border-slate-200">0,012</td>
                      <td className="p-2 border-r border-slate-200 text-indigo-700 font-black">0,008</td>
                      <td className="p-2 bg-indigo-50/70 font-black text-indigo-950">0,267 T</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2 border-r border-slate-200 text-center">2</td>
                      <td className="p-2 border-r border-slate-200">5,1</td>
                      <td className="p-2 border-r border-slate-200">0,012</td>
                      <td className="p-2 border-r border-slate-200 text-indigo-700 font-black">0,015</td>
                      <td className="p-2 bg-indigo-50/70 font-black text-indigo-950">0,245 T</td>
                    </tr>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <td className="p-2 border-r border-slate-200 text-center">3</td>
                      <td className="p-2 border-r border-slate-200">10,1</td>
                      <td className="p-2 border-r border-slate-200">0,012</td>
                      <td className="p-2 border-r border-slate-200 text-indigo-700 font-black">0,030</td>
                      <td className="p-2 bg-indigo-50/70 font-black text-indigo-950">0,248 T</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2 border-r border-slate-200 text-center">4</td>
                      <td className="p-2 border-r border-slate-200">20,2</td>
                      <td className="p-2 border-r border-slate-200">0,012</td>
                      <td className="p-2 border-r border-slate-200 text-indigo-700 font-black">0,060</td>
                      <td className="p-2 bg-indigo-50/70 font-black text-indigo-950">0,248 T</td>
                    </tr>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <td className="p-2 border-r border-slate-200 text-center">5</td>
                      <td className="p-2 border-r border-slate-200">5,1</td>
                      <td className="p-2 border-r border-slate-200">0,007</td>
                      <td className="p-2 border-r border-slate-200 text-indigo-700 font-black">0,009</td>
                      <td className="p-2 bg-indigo-50/70 font-black text-indigo-950">0,252 T</td>
                    </tr>
                    <tr className="border-b border-slate-900">
                      <td className="p-2 border-r border-slate-200 text-center">6</td>
                      <td className="p-2 border-r border-slate-200">10,1</td>
                      <td className="p-2 border-r border-slate-200">0,007</td>
                      <td className="p-2 border-r border-slate-200 text-indigo-700 font-black">0,017</td>
                      <td className="p-2 bg-indigo-50/70 font-black text-indigo-950">0,240 T</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Self-practice answers block */}
              <div className="bg-white rounded-2xl border-2 border-slate-900 p-4 text-xs text-slate-800 space-y-3.5 shadow-[3px_3px_0px_#1e293b] font-bold">
                <span className="text-[10px] text-indigo-955 font-black uppercase tracking-wider block">Câu hỏi tự luận và xử lý thực nghiệm mẫu:</span>
                <div className="space-y-3">
                  <p>
                    <span className="font-black text-slate-950 block mb-1">a) Tại sao việc cân điện tử thay đổi khối lượng có thể đo được lực Ampe rất nhỏ một cách nhạy bén?</span>
                    Lực từ F đẩy dây thẳng hướng lên trên, theo định luật III Newton, dây tác dụng lực phản hồi hướng xuống ép trực tiếp lên khối nam châm đặt trên đĩa cân: F = Δm · g. Với một cân nhạy có vạch chia chỉ 1 mg (10⁻⁶ kg), cân có thể phát hiện lực cực nhỏ đạt đến mức 10⁻⁵ N một cách vô cùng chính xác.
                  </p>
                  <p>
                    <span className="font-black text-slate-950 block mb-1">b) Tính cảm ứng từ B trung bình của nam châm thí nghiệm:</span>
                    Ta thực hiện tính hệ số cảm ứng từ B = F / (I · L) cho 6 lần đo trong bảng:
                    <br />
                    • Trung bình cảm ứng từ tính toán được: <span className="text-indigo-700 font-black">B ≈ 0,25 Tesla</span>.
                    Đồ thị tọa độ giữa F và I là đường thẳng tuyến tính dốc qua gốc hệ tọa độ, chứng minh mối quan hệ tỷ lệ thuận F ~ I.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Assistant Chat Panel */}
      <div className="relative bg-indigo-50/50 p-6 rounded-3xl border-2 border-slate-900 shadow-[6px_6px_0px_#1e293b] space-y-4 overflow-hidden" id="ai-assistant-lesson20">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
        
        <div className="relative z-10 flex items-center justify-between border-b-2 border-slate-900 pb-3 flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 border-2 border-slate-900 text-indigo-950 rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <Sparkles className="h-5 w-5 animate-pulse text-indigo-700" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide">Trợ lý Giáo viên AI - Giải đáp Bài 20</h4>
              <p className="text-[10px] text-slate-700 font-bold">Chuyên gia giải đáp Bài tập về từ trường • Sư phạm mẫu mực & Kiên nhẫn</p>
            </div>
          </div>
          <button
            onClick={() => setMessages([
              {
                role: "model",
                content: "Thầy/Cô đã đặt lại hộp thoại. Thầy/Cô rất vui lòng được hỗ trợ các em giải đáp mọi thắc mắc liên quan đến Bài 20 và môn Vật lí!"
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
            "Cách xác định chiều của lực từ Ampe bằng quy tắc bàn tay trái thế nào ạ?",
            "Làm thế nào để tránh bẫy góc hợp alpha trong công thức tính từ thông phi?",
            "Suất điện động cảm ứng trong khung dây phẳng quay đều được tạo ra thế nào?",
            "Tại sao việc dùng cân điện tử lại đo được những lực Ampe rất nhỏ?"
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
            placeholder="Đặt câu hỏi về Bài 20 giải bài tập từ trường..."
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

      {/* FOOTER: Summary Core Knowledge */}
      <div className="bg-indigo-50 border-2 border-slate-900 p-5 rounded-3xl flex items-start gap-4 shadow-[4px_4px_0px_#1e293b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#1e293b] transition-all">
        <span className="p-2.5 bg-indigo-150 border-2 border-slate-900 text-indigo-950 rounded-xl shadow-[2px_2px_0px_#000]">
          <Brain className="h-5 w-5 shrink-0" />
        </span>
        <div className="space-y-1.5 text-slate-900">
          <span className="text-xs text-indigo-950 font-black uppercase tracking-wider font-mono block">Tóm tắt nội dung học tập cốt lõi</span>
          <p className="text-xs leading-relaxed font-bold">
            Học tập và giải toán chương Từ trường yêu cầu học sinh rèn luyện tư duy không gian qua việc áp dụng quy tắc bàn tay phải (chiều vectơ cảm ứng từ B), quy tắc bàn tay trái (chiều lực từ Ampe F tác dụng), định luật bảo toàn Lenz cho dòng điện xoáy tự cảm, và định luật cảm ứng Faraday. Thực nghiệm đo đạc lực Ampe bằng cân điện tử xác minh tính đúng đắn tỉ lệ thuận của lực từ với cường độ dòng điện I và chiều dài L, giúp học sinh kết nối lý thuyết vào kỹ thuật hiện đại.
          </p>
        </div>
      </div>
    </div>
  );
}
