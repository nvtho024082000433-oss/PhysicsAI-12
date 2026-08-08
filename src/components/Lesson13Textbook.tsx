import { useState, useEffect, useRef } from "react";
import { BookOpen, Sparkles, Brain, CheckCircle2, Info, Activity, Flame, Thermometer, Cpu, ArrowRight, RefreshCw, AlertCircle, TrendingUp, HelpCircle, Send } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson13Textbook() {
  // Example 1 Interactive State
  const [ex1Volume, setEx1Volume] = useState<number>(8); // L
  const [ex1LidMass, setEx1LidMass] = useState<number>(2); // kg
  const [ex1Diameter, setEx1Diameter] = useState<number>(20); // cm
  const [ex1Temp1, setEx1Temp1] = useState<number>(100); // °C
  const [ex1Temp2, setEx1Temp2] = useState<number>(20); // °C
  const [ex1P0, setEx1P0] = useState<number>(1e5); // Pa

  // Example 3 Interactive State
  const [ex3Mass1, setEx3Mass1] = useState<number>(1.00); // kg
  const [ex3P1, setEx3P1] = useState<number>(1.0e7); // Pa
  const [ex3P2, setEx3P2] = useState<number>(2.5e6); // Pa

  // Exercise 3 Interactive State
  const [ex4Volume, setEx4Volume] = useState<number>(40); // L (dm³)
  const [ex4Mass, setEx4Mass] = useState<number>(3.96); // kg
  const [ex4MaxP, setEx4MaxP] = useState<number>(60); // atm
  const [ex4Rho0, setEx4Rho0] = useState<number>(1.43); // kg/m³ (density at STC)

  // Example 1 Math Calculations
  const T1_ex1 = ex1Temp1 + 273;
  const T2_ex1 = ex1Temp2 + 273;
  // Isochoric process (V = const): p2 = p1 * T2 / T1
  const p1_ex1 = ex1P0;
  const p2_ex1 = p1_ex1 * (T2_ex1 / T1_ex1);
  // Area of the lid S = pi * d^2 / 4
  const area_ex1 = (Math.PI * Math.pow(ex1Diameter / 100, 2)) / 4;
  // F_min + p2 * S = m * g + p1 * S => F_min = m * g + (p1 - p2) * S
  const g = 9.8;
  const F_min = ex1LidMass * g + (p1_ex1 - p2_ex1) * area_ex1;

  // Example 3 Math Calculations
  // Since T and V are constant, p1/p2 = m1/m2 => m2 = m1 * p2 / p1
  const ex3Mass2 = ex3Mass1 * (ex3P2 / ex3P1);
  const ex3DeltaMass = ex3Mass1 - ex3Mass2;

  // Exercise 3 Math Calculations
  // Normal conditions: p0 = 1 atm, T0 = 273 K, rho0 = 1.43 kg/m³
  // We have m = 3.96 kg => at STC it would have volume V0 = m / rho0 (m³)
  // V = 40 L = 0.040 m³
  // Apply state equation: (p0 * V0)/T0 = (p_max * V)/T_max => T_max = T0 * (p_max / p0) * (V / V0)
  const V0_ex3 = ex4Mass / ex4Rho0; // m³
  const V_ex3 = ex4Volume / 1000; // m³
  const T0_ex3 = 273;
  const p0_ex3 = 1.0; // atm
  const T_max_K = T0_ex3 * (ex4MaxP / p0_ex3) * (V_ex3 / V0_ex3);
  const T_max_C = T_max_K - 273;

  // Comparison Method visualization helper
  const [compareMethod, setCompareMethod] = useState<"isobaric" | "isochoric">("isobaric");

  // AI Assistant State
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Chào các em! Thầy/Cô là Giáo viên Trợ lý ảo AI chuyên biệt về Bài 13: Bài tập về khí lí tưởng. Các em có thắc mắc gì cần giải thích về các công thức, định luật chất khí, hay hiện tượng vật lý nào trong bài học này không?"
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
          mode: "lesson13"
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
    <div className="space-y-8 text-slate-800 animate-fade-in" id="lesson-13-textbook-root">
      {/* Banner Tiêu đề - Khối 3D nhẹ nhàng, tương phản cao */}
      <div className="bg-gradient-to-br from-violet-50 to-indigo-100/60 border-2 border-indigo-200 border-b-[6px] border-b-indigo-300 p-6 rounded-3xl text-slate-900 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="relative z-10 space-y-2">
          <span className="text-[10px] text-violet-800 font-mono bg-violet-200/60 px-3 py-1 rounded-full border border-violet-350/30 font-black tracking-widest uppercase">
            CHƯƠNG II: KHÍ LÍ TƯỞNG
          </span>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-950 uppercase">
            Bài 13: Bài tập về khí lí tưởng
          </h2>
          <p className="text-xs text-slate-700 max-w-3xl leading-relaxed font-semibold">
            Hệ thống hóa lý thuyết về mô hình động học phân tử, phương trình trạng thái Clapeyron - Mendeleev và các định luật chất khí. Rèn luyện phương pháp giải bài tập định tính, định lượng và phân tích đồ thị thực tế.
          </p>
        </div>
      </div>

      {/* Định hướng đầu bài - Khối 3D màu nền nhẹ nhàng */}
      <div className="bg-amber-50 border-2 border-amber-200 border-b-[5px] border-b-amber-300 rounded-3xl p-5 flex items-start gap-3.5 shadow-sm">
        <Info className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-800 leading-relaxed">
          <strong className="text-amber-950 block font-black mb-1 text-[13px]">❓ Để giải các bài tập về sự chuyển trạng thái của khí lí tưởng thì cần dùng những công thức nào?</strong>
          <em className="font-medium text-slate-700">Làm thế nào để xác định chính xác một lượng khí là xác định hay thay đổi? Cách vẽ đường phụ trợ trên các đồ thị trạng thái khác nhau để so sánh các thông số vật lý như thế nào? Hãy cùng tìm hiểu chi tiết dưới đây.</em>
        </div>
      </div>

      {/* MỤC I: MỘT SỐ LƯU Ý TRONG VIỆC GIẢI BÀI TẬP */}
      <div className="space-y-5">
        <div className="flex items-center gap-2.5 border-b-2 border-indigo-100 pb-2.5">
          <div className="h-6 w-2 bg-indigo-600 rounded-full shadow-[0_1px_3px_rgba(79,70,229,0.3)]" />
          <h3 className="text-sm font-black text-slate-950 uppercase tracking-wide">
            I. Một số lưu ý trong việc giải bài tập về khí lí tưởng
          </h3>
        </div>

        <p className="text-xs text-slate-700 font-medium leading-relaxed">
          Phần khí lí tưởng bao gồm bốn nội dung chính: <strong>Mô hình động học phân tử chất khí</strong>, <strong>Phương trình trạng thái của khí lí tưởng</strong>, <strong>Áp suất khí theo mô hình động học phân tử</strong> và <strong>Động năng phân tử</strong>. Để giải tốt các dạng bài tập này, cần lưu ý ba phương pháp cốt lõi sau:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-blue-50/50 p-5 rounded-3xl border-2 border-blue-200 border-b-[6px] border-b-blue-300 shadow-sm space-y-3">
            <div className="h-8 w-8 rounded-xl bg-blue-100 text-blue-800 border border-blue-350 flex items-center justify-center font-black text-sm shadow-sm">
              1
            </div>
            <h4 className="text-xs font-black text-slate-950 uppercase tracking-wide">
              Bài tập định tính
            </h4>
            <p className="text-[11px] text-slate-800 leading-relaxed font-semibold flex items-center flex-wrap gap-1">
              Các bài tập này thường yêu cầu vận dụng mô hình khí lí tưởng và mối quan hệ giữa các thông số trạng thái <FormattedMathText text="$(p, V, T)$" /> để giải thích các hiện tượng, ứng dụng thực tế có liên quan.
            </p>
            <div className="bg-white/80 p-2.5 rounded-xl border border-blue-200 text-[10px] text-blue-900 font-bold italic shadow-inner">
              📌 <strong>Lưu ý quan trọng:</strong> Luôn kiểm tra xem lượng khí trong quá trình có <strong>khối lượng khí xác định</strong> hay không trước khi áp dụng định luật.
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-emerald-50/50 p-5 rounded-3xl border-2 border-emerald-200 border-b-[6px] border-b-emerald-300 shadow-sm space-y-3">
            <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-350 flex items-center justify-center font-black text-sm shadow-sm">
              2
            </div>
            <h4 className="text-xs font-black text-slate-950 uppercase tracking-wide">
              Bài tập định lượng
            </h4>
            <p className="text-[11px] text-slate-800 leading-relaxed font-semibold">
              Chủ yếu giải quyết các bài toán về sự chuyển trạng thái của khối khí. Quá trình giải thường tuân theo ba bước chính:
            </p>
            <ul className="text-[10px] text-slate-800 font-bold space-y-1.5 list-decimal pl-4">
              <li>Xác định lượng khí có thay đổi hay không (có rò rỉ khí, bơm thêm hay không).</li>
              <li>Xác định rõ trạng thái đầu, trạng thái cuối và đặc điểm quá trình chuyển trạng thái.</li>
              <li>
                <div className="inline-flex items-center flex-wrap gap-1">
                  Liệt kê các thông số trạng thái <FormattedMathText text="$(p, V, T, m, M, n)$" /> ở từng trạng thái rồi chọn công thức phù hợp.
                </div>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-violet-50/50 p-5 rounded-3xl border-2 border-violet-200 border-b-[6px] border-b-violet-300 shadow-sm space-y-3">
            <div className="h-8 w-8 rounded-xl bg-violet-100 text-violet-800 border border-violet-350 flex items-center justify-center font-black text-sm shadow-sm">
              3
            </div>
            <h4 className="text-xs font-black text-slate-950 uppercase tracking-wide">
              Bài tập thí nghiệm & đồ thị
            </h4>
            <p className="text-[11px] text-slate-800 leading-relaxed font-semibold flex items-center flex-wrap gap-1">
              Tập trung vào yêu cầu xử lí số liệu thu được từ thực nghiệm, biểu diễn bằng đồ thị mối quan hệ giữa các đại lượng <FormattedMathText text="$p, V, T$" /> trong các hệ trục tọa độ khác nhau <FormattedMathText text="$(p-V, p-T, V-T)$" />.
            </p>
            <div className="bg-white/80 p-2.5 rounded-xl border border-violet-200 text-[10px] text-violet-900 font-bold italic shadow-inner">
              💡 <strong>Phương pháp đồ thị:</strong> Kẻ các đường phụ trợ (đẳng áp, đẳng tích, đẳng nhiệt) cắt các đồ thị để so sánh các thông số dễ dàng.
            </div>
          </div>
        </div>
      </div>

      {/* MỤC II: BÀI TẬP VÍ DỤ INTERACTIVE */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 border-b-2 border-indigo-100 pb-2.5">
          <div className="h-6 w-2 bg-indigo-600 rounded-full shadow-[0_1px_3px_rgba(79,70,229,0.3)]" />
          <h3 className="text-sm font-black text-slate-950 uppercase tracking-wide">
            II. Bài tập ví dụ minh họa (Interactive Solver)
          </h3>
        </div>

        {/* VÍ DỤ 1 - Khối 3D nhẹ nhàng tương phản cao */}
        <div className="bg-blue-50/30 border-2 border-blue-200 border-b-[6px] border-b-blue-300 rounded-3xl p-6 space-y-4 shadow-sm text-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg font-black border border-blue-200 uppercase">
              Ví dụ 1 (Đẳng tích & Cân bằng lực)
            </span>
            <span className="text-xs font-bold text-slate-500">Trang 52-53 SGK</span>
          </div>

          <p className="text-xs text-slate-800 font-bold leading-relaxed">
            Một bình hình trụ dung tích <strong>{ex1Volume} L</strong>, đặt thẳng đứng, đậy kín bằng một nắp khối lượng <strong>{ex1LidMass} kg</strong>, đường kính <strong>{ex1Diameter} cm</strong>. Trong bình chứa khí ở nhiệt độ <strong>{ex1Temp1}°C</strong> và áp suất bằng áp suất khí quyển <strong>1,0 . 10⁵ Pa</strong>. Khi nhiệt độ trong bình giảm xuống còn <strong>{ex1Temp2}°C</strong>:
            <br />
            <span className="text-slate-600 font-bold italic">a) Áp suất khí trong bình bằng bao nhiêu?</span>
            <br />
            <span className="text-slate-600 font-bold italic">b) Muốn mở nắp bình cần một lực tối thiểu bằng bao nhiêu? Lấy g = 9,8 m/s².</span>
          </p>

          {/* Interactive controls */}
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 shadow-inner">
            <div>
              <label className="block text-[10px] text-slate-600 font-black mb-1">Dung tích V (L):</label>
              <input
                type="number"
                value={ex1Volume}
                onChange={(e) => setEx1Volume(Math.max(1, Number(e.target.value)))}
                className="w-full text-xs font-mono bg-slate-50 border-2 border-slate-200 rounded-lg p-1.5 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-600 font-black mb-1">Khối lượng nắp m (kg):</label>
              <input
                type="number"
                value={ex1LidMass}
                onChange={(e) => setEx1LidMass(Math.max(0.1, Number(e.target.value)))}
                className="w-full text-xs font-mono bg-slate-50 border-2 border-slate-200 rounded-lg p-1.5 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-600 font-black mb-1">Đường kính d (cm):</label>
              <input
                type="number"
                value={ex1Diameter}
                onChange={(e) => setEx1Diameter(Math.max(1, Number(e.target.value)))}
                className="w-full text-xs font-mono bg-slate-50 border-2 border-slate-200 rounded-lg p-1.5 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-600 font-black mb-1">Nhiệt độ T1 (°C):</label>
              <input
                type="number"
                value={ex1Temp1}
                onChange={(e) => setEx1Temp1(Number(e.target.value))}
                className="w-full text-xs font-mono bg-slate-50 border-2 border-slate-200 rounded-lg p-1.5 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-600 font-black mb-1">Nhiệt độ T2 (°C):</label>
              <input
                type="number"
                value={ex1Temp2}
                onChange={(e) => setEx1Temp2(Number(e.target.value))}
                className="w-full text-xs font-mono bg-slate-50 border-2 border-slate-200 rounded-lg p-1.5 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-600 font-black mb-1">Áp suất p₀ (Pa):</label>
              <input
                type="number"
                value={ex1P0}
                step="1000"
                onChange={(e) => setEx1P0(Math.max(1000, Number(e.target.value)))}
                className="w-full text-xs font-mono bg-slate-50 border-2 border-slate-200 rounded-lg p-1.5 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Step-by-step calculated result - Khối 3D màu nền nhẹ nhàng, chữ sắc nét */}
          <div className="bg-white border-2 border-slate-200 border-b-[5px] border-b-slate-300 p-5 rounded-2xl space-y-4 font-mono text-xs text-slate-950 shadow-inner">
            <div className="border-b-2 border-slate-100 pb-2.5">
              <span className="text-amber-700 font-black flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> 📖 HƯỚNG DẪN GIẢI CHI TIẾT THEO THỜI GIAN THỰC:
              </span>
            </div>
            <div className="space-y-3.5">
              <div className="p-3 bg-cyan-50/40 rounded-xl border border-cyan-150 space-y-1">
                <div className="text-cyan-800 font-black">
                  <FormattedMathText text={`// Bước 1: Khí trong bình có khối lượng $m$ và thể tích $V = ${ex1Volume}\\text{ L}$ không đổi (Quá trình đẳng tích)`} />
                </div>
                <div className="pl-4 text-slate-800 font-medium">
                  <FormattedMathText text={`Trạng thái 1: $T_1 = ${ex1Temp1} + 273 = ${T1_ex1}\\text{ K}$; $p_1 = ${ex1P0.toExponential(2)}\\text{ Pa}$`} />
                </div>
                <div className="pl-4 text-slate-800 font-medium">
                  <FormattedMathText text={`Trạng thái 2: $T_2 = ${ex1Temp2} + 273 = ${T2_ex1}\\text{ K}$; $p_2 = ?$`} />
                </div>
              </div>

              <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-150 space-y-1">
                <p className="text-emerald-800 font-black">// Bước 2: Áp dụng định luật Charles (Đẳng tích)</p>
                <div className="pl-4 text-slate-800 font-medium">
                  <FormattedMathText text="$$\frac{p_1}{T_1} = \frac{p_2}{T_2} \Rightarrow p_2 = p_1 \cdot \frac{T_2}{T_1}$$" />
                </div>
                <div className="pl-4 text-emerald-900 font-black">
                  <FormattedMathText text={`$\\Rightarrow p_2 = ${ex1P0.toLocaleString()} \\cdot \\frac{${T2_ex1}}{${T1_ex1}} = ${Math.round(p2_ex1).toLocaleString()}\\text{ Pa}$ ($\\approx ${(p2_ex1/1e5).toFixed(2)} \\cdot 10^5\\text{ Pa}$)`} />
                </div>
              </div>

              <div className="p-3 bg-indigo-50/40 rounded-xl border border-indigo-150 space-y-1.5">
                <p className="text-indigo-800 font-black">// Bước 3: Thiết lập phương trình cân bằng lực để mở nắp</p>
                <div className="pl-4 text-slate-800 leading-relaxed font-medium space-y-1">
                  <div>
                    <FormattedMathText text="Nắp chịu tác dụng của các lực hướng xuống: Trọng lực của nắp $P = m \\cdot g$, áp lực khí quyển đè lên nắp từ ngoài vào $F_{\\text{kq}} = p_{\\text{kq}} \\cdot S = p_1 \\cdot S$." />
                  </div>
                  <div>
                    <FormattedMathText text="Và áp lực khí trong bình đẩy nắp lên từ dưới lên: $F_{\\text{trong}} = p_2 \\cdot S$." />
                  </div>
                  <div>
                    <FormattedMathText text="Để nhấc nắp lên, ta cần tác dụng một lực $F$ hướng thẳng đứng lên trên thỏa mãn:" />
                  </div>
                </div>
                <div className="pl-8 text-indigo-950 font-black">
                  <FormattedMathText text="$$F + p_2 \\cdot S \\ge m \\cdot g + p_1 \\cdot S \\Rightarrow F_{\\text{min}} = m \\cdot g + (p_1 - p_2) \\cdot S$$" />
                </div>
              </div>

              <div className="p-3 bg-rose-50/40 rounded-xl border border-rose-150 space-y-1">
                <div className="text-rose-850 font-black">
                  <FormattedMathText text="// Bước 4: Tính toán diện tích nắp $S$ và lực tối thiểu $F_{\\text{min}}$" />
                </div>
                <div className="pl-4 text-slate-800 font-medium">
                  <FormattedMathText text={`Đường kính $d = ${ex1Diameter}\\text{ cm} = ${ex1Diameter/100}\\text{ m}$`} />
                </div>
                <div className="pl-4 text-slate-800 font-medium">
                  <FormattedMathText text={`Diện tích $S = \\frac{\\pi \\cdot d^2}{4} = \\frac{\\pi \\cdot (${ex1Diameter/100})^2}{4} = ${area_ex1.toFixed(5)}\\text{ m}^2$`} />
                </div>
                <div className="pl-4 text-slate-800 font-medium">
                  <FormattedMathText text={`Trọng lực $m \\cdot g = ${ex1LidMass} \\cdot 9,8 = ${(ex1LidMass * g).toFixed(1)}\\text{ N}$`} />
                </div>
                <div className="pl-4 text-slate-800 font-medium">
                  <FormattedMathText text={`Hiệu áp lực $(p_1 - p_2) \\cdot S = (${ex1P0.toLocaleString()} - ${Math.round(p2_ex1).toLocaleString()}) \\cdot ${area_ex1.toFixed(5)} = ${Math.round((p1_ex1 - p2_ex1) * area_ex1).toLocaleString()}\\text{ N}$`} />
                </div>
                <div className="pl-4 text-rose-950 font-black text-sm">
                  <FormattedMathText text={`$\\Rightarrow F_{\\text{min}} = ${(ex1LidMass * g).toFixed(1)} + ${Math.round((p1_ex1 - p2_ex1) * area_ex1).toLocaleString()} = ${Math.round(F_min).toLocaleString()}\\text{ N}$`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VÍ DỤ 2 - Khối 3D màu nền tím nhạt nhẹ nhàng */}
        <div className="bg-violet-50/30 border-2 border-violet-200 border-b-[6px] border-b-violet-300 rounded-3xl p-6 space-y-4 shadow-sm text-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono bg-violet-100 text-violet-800 px-2.5 py-1 rounded-lg font-black border border-violet-200 uppercase">
              Ví dụ 2 (So sánh nhiệt độ trên đường đẳng nhiệt)
            </span>
            <span className="text-xs font-bold text-slate-500">Trang 53 SGK</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3.5 text-xs leading-relaxed">
              <p className="font-extrabold text-slate-950 text-[13px]">
                Hình bên dưới vẽ đường biểu diễn hai quá trình đẳng nhiệt của một lượng khí lí tưởng ở hai nhiệt độ <strong className="text-rose-600 font-black">T₁</strong>, <strong className="text-blue-600 font-black">T₂</strong> trong hệ toạ độ (p - V). Hãy nêu cách so sánh <strong className="text-rose-600 font-black">T₁</strong> và <strong className="text-blue-600 font-black">T₂</strong>.
              </p>

              <div className="flex gap-2.5 mb-2 bg-white p-1 rounded-2xl border-2 border-slate-200 w-fit shadow-sm">
                <button
                  onClick={() => setCompareMethod("isobaric")}
                  className={`px-3.5 py-2 rounded-xl text-[10px] font-black tracking-wide transition-all ${compareMethod === "isobaric" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  Cách 1: Đường đẳng áp MC
                </button>
                <button
                  onClick={() => setCompareMethod("isochoric")}
                  className={`px-3.5 py-2 rounded-xl text-[10px] font-black tracking-wide transition-all ${compareMethod === "isochoric" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  Cách 2: Đường đẳng tích NC
                </button>
              </div>

              {compareMethod === "isobaric" ? (
                <div className="bg-white p-4.5 rounded-2xl border-2 border-slate-200 space-y-2.5 shadow-inner">
                  <p className="font-black text-slate-950 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Phương pháp vẽ đường Đẳng áp MC:
                  </p>
                  <ul className="list-disc pl-4 space-y-2 text-slate-800 text-[11px] font-semibold">
                    <li>
                      <FormattedMathText text="Từ trục tung, kẻ đường thẳng song song với trục hoành $OV$ (đường đẳng áp, áp suất không đổi bằng $p_M$)." />
                    </li>
                    <li>
                      <FormattedMathText text="Đường này cắt đường đẳng nhiệt $T_1$ tại điểm 1 có thể tích $V_1$, cắt đường đẳng nhiệt $T_2$ tại điểm 2 có thể tích $V_2$." />
                    </li>
                    <li>
                      <FormattedMathText text="Nhìn đồ thị ta thấy rõ ràng: $V_1 < V_2$." />
                    </li>
                    <li>
                      <FormattedMathText text="Vì đây là quá trình đẳng áp, theo định luật Charles: thể tích tỉ lệ thuận với nhiệt độ tuyệt đối ($$\frac{V}{T} = \\text{const}$$). Do $V_1 < V_2$ nên ta suy ra ngay: $T_1 < T_2$." />
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="bg-white p-4.5 rounded-2xl border-2 border-slate-200 space-y-2.5 shadow-inner">
                  <p className="font-black text-slate-950 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Phương pháp vẽ đường Đẳng tích NC (Thảo luận 1 - Trang 54):
                  </p>
                  <ul className="list-disc pl-4 space-y-2 text-slate-800 text-[11px] font-semibold">
                    <li>
                      <FormattedMathText text="Từ trục hoành, kẻ đường thẳng thẳng đứng song song với trục tung $Op$ (đường đẳng tích, thể tích không đổi bằng $V_N$)." />
                    </li>
                    <li>
                      <FormattedMathText text="Đường này cắt đường đẳng nhiệt $T_1$ tại điểm có áp suất $p_1$, cắt đường đẳng nhiệt $T_2$ tại điểm có áp suất $p_2$." />
                    </li>
                    <li>
                      <FormattedMathText text="Dễ dàng nhận thấy từ đồ thị rằng: $p_1 < p_2$." />
                    </li>
                    <li>
                      <FormattedMathText text="Vì thể tích không đổi (đẳng tích), theo định luật Charles: áp suất tỉ lệ thuận với nhiệt độ tuyệt đối ($$\frac{p}{T} = \\text{const}$$). Do $p_1 < p_2$ nên suy ra: $T_1 < T_2$." />
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* SVG Plot for example 2 - Light theme 3D layout */}
            <div className="lg:col-span-5 bg-white p-4 rounded-3xl border-2 border-slate-200 border-b-[5px] border-b-slate-300 flex flex-col items-center justify-center space-y-2 shadow-sm">
              <span className="text-[10px] text-slate-700 font-mono font-black uppercase tracking-wide">
                Đồ thị so sánh T₁ và T₂
              </span>
              <svg width="240" height="200" className="bg-slate-50 rounded-2xl p-3 border-2 border-slate-200/80">
                {/* Axes */}
                <line x1="30" y1="160" x2="220" y2="160" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <line x1="30" y1="160" x2="30" y2="20" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arrow)" />
                
                <text x="212" y="176" fill="#1e293b" fontSize="10" fontFamily="monospace" fontWeight="bold">V(L)</text>
                <text x="14" y="24" fill="#1e293b" fontSize="10" fontFamily="monospace" fontWeight="bold">p</text>
                <text x="18" y="172" fill="#475569" fontSize="10" fontWeight="bold">O</text>

                {/* T1, T2 Isotherms */}
                {/* T1: y = 2000/x */}
                <path d="M 45,150 Q 85,60 180,45" fill="none" stroke="#e11d48" strokeWidth="2.5" />
                <text x="185" y="48" fill="#e11d48" fontSize="11" fontWeight="extrabold">T₁</text>

                {/* T2: y = 4000/x */}
                <path d="M 60,150 Q 110,80 200,60" fill="none" stroke="#2563eb" strokeWidth="2.5" />
                <text x="205" y="63" fill="#2563eb" fontSize="11" fontWeight="extrabold">T₂</text>

                {/* MC Horizontal Line (isobaric) */}
                {compareMethod === "isobaric" && (
                  <>
                    <line x1="30" y1="100" x2="190" y2="100" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="95" cy="100" r="4" fill="#d97706" />
                    <circle cx="132" cy="100" r="4" fill="#d97706" />
                    <text x="12" y="103" fill="#d97706" fontSize="10" fontWeight="black">M</text>
                    <text x="195" y="103" fill="#d97706" fontSize="10" fontWeight="black">C</text>

                    {/* V1 projection */}
                    <line x1="95" y1="100" x2="95" y2="160" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="2 2" />
                    <text x="90" y="173" fill="#e11d48" fontSize="10" fontWeight="extrabold">V₁</text>
                    <text x="92" y="93" fill="#0f172a" fontSize="9" fontWeight="black">1</text>

                    {/* V2 projection */}
                    <line x1="132" y1="100" x2="132" y2="160" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2" />
                    <text x="128" y="173" fill="#2563eb" fontSize="10" fontWeight="extrabold">V₂</text>
                    <text x="129" y="93" fill="#0f172a" fontSize="9" fontWeight="black">2</text>
                  </>
                )}

                {/* NC Vertical Line (isochoric) */}
                {compareMethod === "isochoric" && (
                  <>
                    <line x1="110" y1="160" x2="110" y2="40" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="110" cy="85" r="4" fill="#059669" />
                    <circle cx="110" cy="115" r="4" fill="#059669" />
                    <text x="105" y="173" fill="#059669" fontSize="10" fontWeight="black">N</text>

                    {/* p1 projection */}
                    <line x1="110" y1="115" x2="30" y2="115" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="2 2" />
                    <text x="12" y="118" fill="#e11d48" fontSize="10" fontWeight="extrabold">p₁</text>

                    {/* p2 projection */}
                    <line x1="110" y1="85" x2="30" y2="85" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2" />
                    <text x="12" y="88" fill="#2563eb" fontSize="10" fontWeight="extrabold">p₂</text>
                  </>
                )}

                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* VÍ DỤ 3 - Khối 3D màu nền lục nhạt nhẹ nhàng */}
        <div className="bg-emerald-50/30 border-2 border-emerald-200 border-b-[6px] border-b-emerald-300 rounded-3xl p-6 space-y-4 shadow-sm text-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg font-black border border-emerald-200 uppercase">
              Ví dụ 3 (Tính khối lượng khí lấy ra)
            </span>
            <span className="text-xs font-bold text-slate-500">Trang 53 SGK</span>
          </div>

          <p className="text-xs text-slate-800 font-bold leading-relaxed">
            Một bình kín có thể tích không đổi chứa một khối lượng khí ban đầu <strong>m₁ = {ex3Mass1.toFixed(2)} kg</strong> ở áp suất <strong>p₁ = {(ex3P1 / 1e6).toFixed(1)} . 10⁶ Pa</strong>. Lấy ở bình ra một lượng khí cho tới khi áp suất của khí còn lại trong bình là <strong>p₂ = {(ex3P2 / 1e6).toFixed(2)} . 10⁶ Pa</strong>. Tính khối lượng khí đã được lấy ra khỏi bình, biết nhiệt độ khí không đổi.
          </p>

          {/* Interactive controls */}
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 shadow-inner">
            <div>
              <label className="block text-[10px] text-slate-600 font-black mb-1">Khối lượng ban đầu m₁ (kg):</label>
              <input
                type="number"
                value={ex3Mass1}
                step="0.05"
                onChange={(e) => setEx3Mass1(Math.max(0.1, Number(e.target.value)))}
                className="w-full text-xs font-mono bg-slate-50 border-2 border-slate-200 rounded-lg p-1.5 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-600 font-black mb-1">Áp suất ban đầu p₁ (Pa):</label>
              <input
                type="number"
                value={ex3P1}
                step="1e5"
                onChange={(e) => setEx3P1(Math.max(1e5, Number(e.target.value)))}
                className="w-full text-xs font-mono bg-slate-50 border-2 border-slate-200 rounded-lg p-1.5 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-600 font-black mb-1">Áp suất lúc sau p₂ (Pa):</label>
              <input
                type="number"
                value={ex3P2}
                step="1e5"
                onChange={(e) => setEx3P2(Math.max(1e4, Math.min(ex3P1, Number(e.target.value))))}
                className="w-full text-xs font-mono bg-slate-50 border-2 border-slate-200 rounded-lg p-1.5 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Calculations - Khối 3D màu nền trắng, chữ sắc nét */}
          <div className="bg-white border-2 border-slate-200 border-b-[5px] border-b-slate-300 p-5 rounded-2xl space-y-4 font-mono text-xs text-slate-950 shadow-inner">
            <div className="border-b-2 border-slate-100 pb-2.5">
              <span className="text-amber-700 font-black flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> 📖 HƯỚNG DẪN GIẢI THEO PHƯƠNG TRÌNH CLAPEYRON - MENDELEEV:
              </span>
            </div>
            <div className="space-y-3.5">
              <div className="p-3 bg-cyan-50/40 rounded-xl border border-cyan-150 space-y-1">
                <p className="text-cyan-800 font-black">// Bước 1: Viết phương trình trạng thái cho hai lượng khí ban đầu và lúc sau</p>
                <p className="pl-4 text-slate-800 font-semibold">Vì bình kín nên thể tích $V$ không đổi, nhiệt độ $T$ cũng được giữ không đổi.</p>
                <div className="pl-4 text-slate-800 font-semibold">
                  <FormattedMathText text="Trạng thái đầu $(m_1)$: $p_1 \cdot V = \frac{m_1}{M} \cdot R \cdot T \quad (1)$" />
                </div>
                <div className="pl-4 text-slate-800 font-semibold">
                  <FormattedMathText text="Trạng thái sau $(m_2)$: $p_2 \cdot V = \frac{m_2}{M} \cdot R \cdot T \quad (2)$" />
                </div>
              </div>

              <div className="p-3 bg-indigo-50/40 rounded-xl border border-indigo-150 space-y-1">
                <p className="text-indigo-800 font-black">// Bước 2: Chia hai vế phương trình (2) cho (1) để triệt tiêu các đại lượng không đổi $V$, $M$, $R$, $T$</p>
                <div className="pl-4 text-slate-800 font-semibold">
                  <FormattedMathText text="$$\frac{p_2}{p_1} = \frac{m_2}{m_1} \Rightarrow m_2 = m_1 \cdot \frac{p_2}{p_1}$$" />
                </div>
                <div className="pl-4 text-indigo-950 font-black">
                  <FormattedMathText text={`$\\Rightarrow m_2 = ${ex3Mass1} \\cdot \\frac{${ex3P2.toExponential(2)}}{${ex3P1.toExponential(2)}} = ${ex3Mass2.toFixed(3)}\\text{ kg}$`} />
                </div>
              </div>

              <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-150 space-y-1">
                <p className="text-emerald-850 font-black">// Bước 3: Tính khối lượng khí lấy ra khỏi bình ($\Delta m$)</p>
                <div className="pl-4 text-slate-800 font-semibold">
                  <FormattedMathText text="$\\Delta m = m_1 - m_2$" />
                </div>
                <div className="pl-4 text-emerald-950 font-black text-sm">
                  <FormattedMathText text={`$\\Rightarrow \\Delta m = ${ex3Mass1} - ${ex3Mass2.toFixed(3)} = ${ex3DeltaMass.toFixed(3)}\\text{ kg}$ (tức là $${Math.round(ex3DeltaMass * 1000)}\\text{ g}$)`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MỤC III: BÀI TẬP VẬN DỤNG CÓ TÍNH THỰC TIỄN CAO */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 border-b-2 border-indigo-100 pb-2.5">
          <div className="h-6 w-2 bg-indigo-600 rounded-full shadow-[0_1px_3px_rgba(79,70,229,0.3)]" />
          <h3 className="text-sm font-black text-slate-950 uppercase tracking-wide">
            III. Bài tập vận dụng thực tiễn & Hướng dẫn giải
          </h3>
        </div>

        {/* BÀI 1 - Khối 3D thanh lịch */}
        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 border-b-[6px] border-b-slate-300 space-y-4 shadow-sm text-slate-900">
          <div className="flex items-center gap-2 text-indigo-950 font-black text-[13px]">
            <span className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center justify-center font-black">1</span>
            Bài toán Nén khí đẳng nhiệt (Trang 54)
          </div>
          <p className="text-xs text-slate-800 font-bold leading-relaxed pl-7">
            Một lượng khí ở điều kiện tiêu chuẩn có thể tích <strong>2 m³</strong>. Nếu nén đẳng nhiệt lượng khí này tới áp suất <strong>5.10⁵ Pa</strong> thì thể tích của lượng khí sẽ là bao nhiêu?
          </p>
          <div className="pl-7 grid grid-cols-2 md:grid-cols-4 gap-2.5 text-xs font-mono">
            <div className="p-2.5 border-2 border-slate-200 rounded-xl text-center bg-slate-50 text-slate-700 font-bold">A. 10 m³</div>
            <div className="p-2.5 border-2 border-slate-200 rounded-xl text-center bg-slate-50 text-slate-700 font-bold">B. 1 m³</div>
            <div className="p-2.5 border-2 border-emerald-300 rounded-xl text-center bg-emerald-50 text-emerald-900 font-black">C. 0,4 m³ (Đúng)</div>
            <div className="p-2.5 border-2 border-slate-200 rounded-xl text-center bg-slate-50 text-slate-700 font-bold">D. 4 m³</div>
          </div>
          <div className="bg-indigo-50/40 p-4 rounded-2xl text-[11px] text-slate-800 space-y-1.5 leading-relaxed ml-7 border-2 border-indigo-150 font-semibold shadow-inner">
            <span className="font-black text-indigo-950 flex items-center gap-1.5">
              💡 Hướng dẫn chi tiết:
            </span>
            <div>
              <FormattedMathText text="- Điều kiện tiêu chuẩn (ĐKTC) có áp suất ban đầu $p_1 \approx 1,013 \cdot 10^5\text{ Pa} \approx 10^5\text{ Pa}$, thể tích $V_1 = 2\text{ m}^3$." />
            </div>
            <div>
              <FormattedMathText text="- Trạng thái sau có áp suất $p_2 = 5 \cdot 10^5\text{ Pa}$." />
            </div>
            <div>
              <FormattedMathText text="- Do quá trình nén là đẳng nhiệt, ta áp dụng định luật Boyle: $p_1 \cdot V_1 = p_2 \cdot V_2$." />
            </div>
            <div>
              <FormattedMathText text="- Suy ra thể tích lúc sau: $V_2 = \frac{p_1 \cdot V_1}{p_2} = \frac{10^5 \cdot 2}{5 \cdot 10^5} = 0,4\text{ m}^3$." />
            </div>
          </div>
        </div>

        {/* BÀI 2 - Khối 3D thanh lịch */}
        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 border-b-[6px] border-b-slate-300 space-y-4 shadow-sm text-slate-900">
          <div className="flex items-center gap-2 text-indigo-950 font-black text-[13px]">
            <span className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center justify-center font-black">2</span>
            Giải thích hiện tượng vật lý: Bóng thám không (Weather Balloon)
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3.5 text-xs text-slate-800 leading-relaxed font-semibold">
              <p>
                Bóng thám không (Hình 13.3 SGK) mang theo hộp thiết bị đo khí tượng lên các tầng cao khí quyển. Hãy giải thích các câu hỏi thực tế sau:
              </p>
              
              <div className="space-y-3">
                <div className="p-3.5 bg-indigo-50/40 rounded-2xl border-2 border-indigo-150">
                  <strong className="text-indigo-950 block mb-1 font-black">a) Tại sao vỏ bóng phải làm bằng chất liệu đàn hồi?</strong>
                  Khi bay lên cao, áp suất khí quyển xung quanh giảm mạnh. Khí bên trong bóng đẩy giãn thành bình ra ngoài. Vỏ bóng làm bằng chất liệu đàn hồi cao (latex cao cấp) giúp bóng dễ dàng phồng to ra mà không bị rách ngay lập tức, duy trì thể tích để tạo lực đẩy Archimedes đủ lớn trong lớp không khí loãng.
                </div>

                <div className="p-3.5 bg-emerald-50/40 rounded-2xl border-2 border-emerald-150">
                  <strong className="text-emerald-950 block mb-1 font-black">b) Tại sao để bóng bay lên, người ta phải bơm vào bóng khí có khối lượng riêng nhỏ hơn không khí?</strong>
                  Theo định luật Archimedes, lực đẩy Archimedes bằng trọng lượng khối không khí bị bóng chiếm chỗ:
                  <div className="my-1.5 font-bold">
                    <FormattedMathText text="$F_A = d_{\text{kk}} \cdot V = \rho_{\text{kk}} \cdot g \cdot V$" />
                  </div>
                  Để bóng bay lên, tổng trọng lượng của bóng và hộp thiết bị đo phải nhỏ hơn $F_A$. Do đó, khí bơm vào bình (như Heli hoặc Hydrogen) phải cực kỳ nhẹ, có khối lượng riêng thỏa mãn:
                  <div className="my-1.5 font-bold">
                    <FormattedMathText text="$\rho_{\text{k}} \ll \rho_{\text{kk}}$" />
                  </div>
                </div>

                <div className="p-3.5 bg-rose-50/40 rounded-2xl border-2 border-rose-150">
                  <strong className="text-rose-950 block mb-1 font-black">c) Tại sao bóng thám không thường chỉ bay lên tới độ cao khoảng 30 km đến 40 km là bị vỡ?</strong>
                  Càng lên cao, không khí càng loãng và áp suất khí quyển giảm dần gần như về không. Hiệu áp suất giữa bên trong bóng và khí quyển bên ngoài tăng cực lớn làm bóng dãn nở thể tích liên tục. Khi đạt độ cao 30-40 km, đường kính bóng có thể dãn nở gấp 3-4 lần ban đầu (thể tích tăng 30-60 lần), vượt quá giới hạn đàn hồi của latex và làm bóng phát nổ.
                </div>
              </div>
            </div>

            {/* Weather Balloon Visualization - Light theme style */}
            <div className="md:col-span-4 bg-sky-50 p-4 rounded-3xl text-center border-2 border-sky-200 border-b-[5px] border-b-sky-300 space-y-2 shadow-sm">
              <span className="text-[9px] text-slate-800 font-mono block font-black uppercase tracking-wider">Mô phỏng bóng thám không dãn nở</span>
              
              <div className="h-44 w-full bg-gradient-to-b from-blue-950 to-indigo-600 rounded-2xl flex items-center justify-center relative overflow-hidden border-2 border-sky-200 shadow-inner">
                {/* Stars/Clouds */}
                <div className="absolute top-4 left-6 w-1 h-1 bg-white rounded-full opacity-60" />
                <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-white rounded-full opacity-40 animate-pulse" />
                <div className="absolute bottom-16 left-20 w-0.5 h-0.5 bg-white rounded-full opacity-80" />
                
                {/* Balloon with dynamic size depending on altitude */}
                <div className="flex flex-col items-center justify-center relative z-10 animate-bounce" style={{ animationDuration: '3s' }}>
                  {/* Balloon body */}
                  <div className="w-16 h-16 bg-radial from-white to-amber-200 rounded-full border border-white/80 relative shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                    <div className="absolute top-2 left-3 w-4 h-2 bg-white/40 rounded-full blur-[1px]" />
                  </div>
                  {/* String */}
                  <div className="w-0.5 h-8 bg-slate-300" />
                  {/* Measuring box */}
                  <div className="w-5 h-5 bg-indigo-600 rounded border border-indigo-400 flex items-center justify-center">
                    <span className="text-[7px] text-white font-mono font-bold">GPS</span>
                  </div>
                </div>
                
                {/* Altitude Indicator */}
                <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-slate-800 rounded px-1.5 py-0.5 text-[8px] font-mono text-amber-400">
                  Độ cao: ~35 km
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BÀI 3 - Khối 3D thanh lịch */}
        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 border-b-[6px] border-b-slate-300 space-y-4 shadow-sm text-slate-900">
          <div className="flex items-center gap-2 text-indigo-950 font-black text-[13px]">
            <span className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center justify-center font-black">3</span>
            Bài toán tính Nhiệt độ phá hủy giới hạn của bình Oxygen (Trang 54)
          </div>
          
          <p className="text-xs text-slate-800 font-bold leading-relaxed pl-7">
            Một bình dung tích <strong>{ex4Volume} L (dm³)</strong> chứa <strong>{ex4Mass} kg</strong> khí oxygen. Hỏi ở nhiệt độ nào thì bình có thể bị vỡ, biết bình chỉ chịu được áp suất không quá <strong>{ex4MaxP} atm</strong>. Lấy khối lượng riêng của oxygen ở điều kiện tiêu chuẩn là <strong>{ex4Rho0} kg/m³</strong>.
          </p>

          {/* Mini Interactive Controls */}
          <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 shadow-inner ml-7">
            <div>
              <label className="block text-[10px] text-slate-600 font-black mb-1">Thể tích bình V (L):</label>
              <input
                type="number"
                value={ex4Volume}
                onChange={(e) => setEx4Volume(Math.max(1, Number(e.target.value)))}
                className="w-full text-xs font-mono bg-white border-2 border-slate-200 rounded-lg p-1.5 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-600 font-black mb-1">Khối lượng m_O₂ (kg):</label>
              <input
                type="number"
                value={ex4Mass}
                step="0.05"
                onChange={(e) => setEx4Mass(Math.max(0.1, Number(e.target.value)))}
                className="w-full text-xs font-mono bg-white border-2 border-slate-200 rounded-lg p-1.5 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-600 font-black mb-1">Giới hạn áp suất (atm):</label>
              <input
                type="number"
                value={ex4MaxP}
                onChange={(e) => setEx4MaxP(Math.max(1, Number(e.target.value)))}
                className="w-full text-xs font-mono bg-white border-2 border-slate-200 rounded-lg p-1.5 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-600 font-black mb-1">KLR tiêu chuẩn ρ₀ (kg/m³):</label>
              <input
                type="number"
                value={ex4Rho0}
                step="0.01"
                onChange={(e) => setEx4Rho0(Math.max(0.1, Number(e.target.value)))}
                className="w-full text-xs font-mono bg-white border-2 border-slate-200 rounded-lg p-1.5 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 border-b-[5px] border-b-slate-300 p-5 rounded-2xl space-y-3.5 text-xs text-slate-950 shadow-inner ml-7">
            <p className="text-amber-700 font-black flex items-center gap-1.5">// KẾT QUẢ TÍNH TOÁN THEO THÔNG SỐ KHÁCH HÀNG NHẬP:</p>
            
            <div className="space-y-1">
              <div className="font-bold text-slate-900">
                <FormattedMathText text="1. Ở điều kiện tiêu chuẩn ($p_0 = 1\\text{ atm}$, $T_0 = 273\\text{ K}$):" />
              </div>
              <div className="pl-4 text-slate-800 font-medium">
                <FormattedMathText text={`Thể tích của $${ex4Mass}\\text{ kg}$ khí oxygen là: $V_0 = \\frac{m}{\\rho_0} = \\frac{${ex4Mass}}{${ex4Rho0}} = ${V0_ex3.toFixed(3)}\\text{ m}^3$ (tức là $${(V0_ex3 * 1000).toFixed(1)}\\text{ L}$)`} />
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="font-bold text-slate-900">2. Ở trạng thái giới hạn khi bình sắp vỡ:</p>
              <div className="pl-4 text-slate-800 font-medium">
                <FormattedMathText text={`$V = ${ex4Volume}\\text{ L} = ${V_ex3.toFixed(3)}\\text{ m}^3$`} />
              </div>
              <div className="pl-4 text-slate-800 font-medium">
                <FormattedMathText text={`Áp suất tối đa bình chịu được $p_{\\text{max}} = ${ex4MaxP}\\text{ atm}$`} />
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="font-bold text-slate-900">3. Áp dụng phương trình trạng thái khí lí tưởng (Clapeyron):</p>
              <div className="pl-4 text-slate-800 font-medium">
                <FormattedMathText text="$\\frac{p_0 \\cdot V_0}{T_0} = \\frac{p_{\\text{max}} \\cdot V}{T_{\\text{max}}} \\Rightarrow T_{\\text{max}} = T_0 \\cdot \\frac{p_{\\text{max}}}{p_0} \\cdot \\frac{V}{V_0}$" />
              </div>
              <div className="pl-4 text-emerald-800 font-black">
                <FormattedMathText text={`$\\Rightarrow T_{\\text{max}} = 273 \\cdot \\frac{${ex4MaxP}}{1} \\cdot \\frac{${V_ex3.toFixed(3)}}{${V0_ex3.toFixed(3)}} = ${Math.round(T_max_K)}\\text{ K}$`} />
              </div>
              <div className="pl-4 text-emerald-800 font-black">
                <FormattedMathText text={`$\\Rightarrow t_{\\text{max}} = ${Math.round(T_max_K)} - 273 = ${Math.round(T_max_C)}\\text{ }^\\circ\\text{C}$`} />
              </div>
            </div>

            <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-[11px] text-rose-950 font-semibold shadow-inner mt-2">
              ⚠️ <strong className="text-rose-700 font-black">Cảnh báo an toàn:</strong> Nếu nhiệt độ của môi trường hoặc bình chứa vượt quá <strong className="text-rose-900 font-black">{Math.round(T_max_C)}°C</strong>, áp suất trong bình sẽ vượt giới hạn an toàn {ex4MaxP} atm và có nguy cơ phát nổ cực kỳ nguy hiểm!
            </div>
          </div>
        </div>

        {/* BÀI 4 - Khối 3D thanh lịch */}
        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 border-b-[6px] border-b-slate-300 space-y-4 shadow-sm text-slate-900">
          <div className="flex items-center gap-2 text-indigo-950 font-black text-[13px]">
            <span className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center justify-center font-black">4</span>
            Bài toán Giảm nhiệt độ kết hợp Rò rỉ khí (Trang 54)
          </div>
          <p className="text-xs text-slate-700 leading-relaxed pl-7">
            Một bình chứa một chất khí được nén ở nhiệt độ <strong>27°C</strong> và áp suất <strong>40 atm</strong>. Nếu nhiệt độ của khí giảm xuống còn <strong>12°C</strong> và một nửa lượng khí thoát ra khỏi bình thì áp suất khí lúc này sẽ bằng bao nhiêu?
          </p>
          <div className="bg-indigo-50/40 p-4 rounded-2xl text-[11px] text-slate-800 space-y-2 leading-relaxed ml-7 border-2 border-indigo-150 font-semibold shadow-inner">
            <span className="font-bold text-slate-900 block mb-1">💡 Lời giải khoa học cực kỳ dễ hiểu:</span>
            <div>
              <FormattedMathText text="- Thể tích bình chứa là $V$ không đổi ($V_1 = V_2 = V$)." />
            </div>
            <div>
              <FormattedMathText text="- Trạng thái 1: Nhiệt độ $T_1 = 27 + 273 = 300\text{ K}$; Áp suất $p_1 = 40\text{ atm}$; số mol khí ban đầu là $n_1$." />
            </div>
            <div>
              <FormattedMathText text="- Trạng thái 2: Nhiệt độ $T_2 = 12 + 273 = 285\text{ K}$; số mol khí giảm một nửa $n_2 = \frac{n_1}{2}$; Áp suất là $p_2$." />
            </div>
            <p>- Áp dụng phương trình Clapeyron - Mendeleev cho hai trạng thái:</p>
            <div className="pl-4 py-1 text-slate-950 font-bold space-y-1">
              <div>
                <FormattedMathText text="$p_1 \cdot V = n_1 \cdot R \cdot T_1 \quad (1)$" />
              </div>
              <div>
                <FormattedMathText text="$p_2 \cdot V = n_2 \cdot R \cdot T_2 = \frac{n_1}{2} \cdot R \cdot T_2 \quad (2)$" />
              </div>
            </div>
            <p>- Lập tỉ số vế theo vế giữa (2) và (1), ta triệt tiêu được thể tích $V$ và số mol $n_1$:</p>
            <div className="pl-4 py-1 text-slate-950 font-bold">
              <FormattedMathText text="$$\frac{p_2}{p_1} = \frac{1}{2} \cdot \frac{T_2}{T_1} \Rightarrow p_2 = p_1 \cdot 0,5 \cdot \frac{T_2}{T_1}$$" />
            </div>
            <p>- Thay số vào hệ thức:</p>
            <div className="pl-4 py-1 text-indigo-700 font-bold">
              <FormattedMathText text="$$p_2 = 40 \cdot 0,5 \cdot \frac{285}{300} = 20 \cdot 0,95 = 19\text{ atm}$$" />
            </div>
            <div>
              <FormattedMathText text="- **Kết luận:** Áp suất của lượng khí còn lại trong bình bằng $19\text{ atm}$." />
            </div>
          </div>
        </div>

        {/* BÀI 5 - Khối 3D thanh lịch */}
        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 border-b-[6px] border-b-slate-300 space-y-4 shadow-sm text-slate-900">
          <div className="flex items-center gap-2 text-indigo-950 font-black text-[13px]">
            <span className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center justify-center font-black">5</span>
            Phân tích chu trình trên đồ thị trạng thái p-T (Trang 54)
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3 text-xs text-slate-700 leading-relaxed">
              <p>
                Hình bên vẽ đường biểu diễn bốn quá trình chuyển trạng thái liên tiếp của một lượng khí trong hệ toạ độ <strong className="font-bold">(p - T)</strong>: (1 → 2); (2 → 3); (3 → 4); (4 → 1). Hãy chứng minh rằng chỉ có một trong bốn quá trình trên là đẳng tích.
              </p>

              <div className="bg-slate-50 p-4.5 rounded-2xl border-2 border-slate-200 space-y-2 shadow-inner">
                <p className="font-black text-slate-950 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  Chứng minh khoa học:
                </p>
                <ul className="list-decimal pl-4 space-y-2 text-slate-800 text-[11px] font-semibold">
                  <li>
                    <FormattedMathText text="**Quá trình $1 \rightarrow 2$:** Đường biểu diễn là đường thẳng nằm ngang song song với trục nhiệt độ hoành $OT$. Do đó, áp suất không đổi trong suốt quá trình. Đây là **quá trình đẳng áp** ($p = \text{const}$)." />
                  </li>
                  <li>
                    <FormattedMathText text="**Quá trình $2 \rightarrow 3$ và $4 \rightarrow 1$:** Đường biểu diễn là các đường thẳng dốc đứng song song với trục áp suất tung $Op$. Do đó, nhiệt độ được giữ không đổi trong suốt quá trình. Đây là **các quá trình đẳng nhiệt** ($T = \text{const}$)." />
                  </li>
                  <li>
                    <FormattedMathText text="**Quá trình $3 \rightarrow 4$:** Đường biểu diễn là một đường thẳng đi qua gốc toạ độ $O$ trong hệ toạ độ $(p - T)$. Theo định luật Charles cho quá trình đẳng tích, khi thể tích không đổi thì áp suất tỉ lệ thuận với nhiệt độ tuyệt đối ($p = C \cdot T$), đồ thị là đường thẳng hướng đi qua gốc toạ độ $O$." />
                  </li>
                </ul>
                <div className="border-t-2 border-slate-200/80 pt-2 text-[11px] text-indigo-950 font-black">
                  <FormattedMathText text="🚀 **Kết luận:** Chỉ duy nhất quá trình $3 \rightarrow 4$ là quá trình đẳng tích. Chứng minh hoàn thành xuất sắc!" />
                </div>
              </div>
            </div>

            {/* SVG Plot for example 5 - Light theme 3D layout */}
            <div className="lg:col-span-4 bg-white p-4 rounded-3xl border-2 border-slate-200 border-b-[5px] border-b-slate-300 flex flex-col items-center justify-center space-y-2 shadow-sm">
              <span className="text-[10px] text-slate-800 font-mono font-black uppercase tracking-wide">
                Hình 13.4. Chu trình p-T
              </span>
              <svg width="200" height="180" className="bg-slate-50 rounded-2xl p-3 border-2 border-slate-200/80">
                {/* Axes */}
                <line x1="30" y1="140" x2="180" y2="140" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arrow_pt)" />
                <line x1="30" y1="140" x2="30" y2="20" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arrow_pt)" />
                
                <text x="170" y="155" fill="#1e293b" fontSize="10" fontFamily="monospace" fontWeight="bold">T(K)</text>
                <text x="14" y="24" fill="#1e293b" fontSize="10" fontFamily="monospace" fontWeight="bold">p</text>
                <text x="18" y="150" fill="#475569" fontSize="10" fontWeight="bold">O</text>

                {/* Dashed line from O to 4 and 3 */}
                <line x1="30" y1="140" x2="90" y2="115" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="90" y1="115" x2="150" y2="90" stroke="#059669" strokeWidth="2.5" />

                {/* 1->2 (Horizontal, isobaric) */}
                <line x1="90" y1="50" x2="150" y2="50" stroke="#2563eb" strokeWidth="2.5" />
                
                {/* 2->3 (Vertical, isothermal) */}
                <line x1="150" y1="50" x2="150" y2="90" stroke="#d97706" strokeWidth="2.5" />

                {/* 4->1 (Vertical, isothermal) */}
                <line x1="90" y1="115" x2="90" y2="50" stroke="#db2777" strokeWidth="2.5" />

                {/* Arrow markers along lines */}
                {/* 1->2 arrow */}
                <polygon points="120,47 125,50 120,53" fill="#2563eb" />
                {/* 2->3 arrow */}
                <polygon points="147,70 150,75 153,70" fill="#d97706" />
                {/* 3->4 arrow */}
                <polygon points="118,100 123,101 121,105" fill="#059669" transform="rotate(-15, 120, 102)" />
                {/* 4->1 arrow */}
                <polygon points="87,85 90,80 93,85" fill="#db2777" />

                {/* State circles and labels */}
                <circle cx="90" cy="50" r="4" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                <text x="80" y="46" fill="#1e293b" fontSize="9" fontWeight="black">1</text>

                <circle cx="150" cy="50" r="4" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
                <text x="156" y="46" fill="#1e293b" fontSize="9" fontWeight="black">2</text>

                <circle cx="150" cy="90" r="4" fill="#ffffff" stroke="#059669" strokeWidth="2" />
                <text x="156" y="96" fill="#1e293b" fontSize="9" fontWeight="black">3</text>

                <circle cx="90" cy="115" r="4" fill="#ffffff" stroke="#db2777" strokeWidth="2" />
                <text x="80" y="124" fill="#1e293b" fontSize="9" fontWeight="black">4</text>

                <defs>
                  <marker id="arrow_pt" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* TÓM TẮT BÀI HỌC */}
      <div className="bg-gradient-to-r from-emerald-950 to-teal-950 p-6 rounded-3xl text-white shadow-lg border border-teal-800/20">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-5 w-5 text-emerald-400" />
          <h4 className="text-xs font-black uppercase tracking-wider">Khóa học tóm tắt - Em đã học được gì?</h4>
        </div>
        <ul className="text-[11px] text-slate-300 space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">✔</span>
            <span>
              <strong>Phương pháp 3 bước để giải toán khí lí tưởng:</strong> Phân tích sự thay đổi khối lượng khí, định vị các thông số trạng thái <FormattedMathText text="$p - V - T$" />, chọn đúng hệ thức liên hệ (đẳng nhiệt, đẳng tích, đẳng áp, hoặc Clapeyron - Mendeleev).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">✔</span>
            <span>
              <strong>Xử lý các bài toán rò rỉ khí hoặc bơm thêm:</strong> Phương trình Mendeleev <FormattedMathText text="$$p \cdot V = \frac{m}{M} \cdot R \cdot T$$" /> là công cụ vạn năng nhất vì nó tích hợp cả biến số khối lượng khí <FormattedMathText text="$m$" />.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">✔</span>
            <span>
              <strong>Kỹ năng đọc và so sánh đồ thị trạng thái:</strong> Luôn dựng thêm một đường đẳng quá trình làm điểm chuẩn (baseline) để chiếu các thông số lên các trục tọa độ, tránh việc suy luận mơ hồ và tăng độ chính xác tuyệt đối.
            </span>
          </li>
        </ul>
      </div>

      {/* TRỢ LÝ AI BÀI HỌC - KHỐI 3D SƯ PHẠM */}
      <div className="bg-gradient-to-b from-indigo-50/50 to-white border-2 border-indigo-250 border-b-[6px] border-b-indigo-350 rounded-3xl p-6 space-y-4 shadow-sm text-slate-900 mt-6">
        <div className="flex items-center justify-between border-b-2 border-indigo-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl border border-indigo-200">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-black text-indigo-950 uppercase tracking-wide">Trợ lý Giáo viên AI - Giải đáp Bài 13</h4>
              <p className="text-[10px] text-slate-500 font-bold">Chuyên gia giải đáp kiến thức Khí lí tưởng • Lời nói chuẩn mực sư phạm</p>
            </div>
          </div>
          <button
            onClick={() => setMessages([
              {
                role: "model",
                content: "Thầy/Cô đã đặt lại hộp thoại. Thầy/Cô rất vui lòng được hỗ trợ các em giải đáp mọi thắc mắc liên quan đến Bài 13 và môn Vật lí!"
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
            "Vì sao khí lí tưởng lại khác khí thực ạ?",
            "Tại sao nén khí đẳng nhiệt thì áp suất tăng tỉ lệ nghịch với thể tích?",
            "Chứng minh công thức Clapeyron - Mendeleev có nguồn gốc từ đâu ạ?",
            "Bình chứa khí bị rò rỉ thì tính áp suất thế nào thưa Thầy/Cô?"
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
            placeholder="Đặt câu hỏi về Bài 13 và môn Vật lí..."
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
