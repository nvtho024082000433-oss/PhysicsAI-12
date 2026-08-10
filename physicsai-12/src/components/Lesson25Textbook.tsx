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
  Zap,
  Shield,
  Activity,
  Award,
  BookOpen,
  Check,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Nuclide({ a, z, element }: { a: string; z: string; element: string }) {
  return (
    <span className="inline-flex items-center mx-1 font-extrabold font-mono text-slate-900 bg-stone-100 px-1.5 py-0.5 rounded-lg border-2 border-stone-300 shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
      <span className="flex flex-col text-[9px] leading-none text-right mr-0.5 -space-y-0.5 font-black">
        <span>{a}</span>
        <span>{z}</span>
      </span>
      <span className="text-sm">{element}</span>
    </span>
  );
}

export function Fraction({ num, den }: { num: React.ReactNode; den: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center align-middle mx-1 bg-white/60 px-1 rounded border border-stone-200/50">
      <span className="text-[12px] font-black text-slate-950 border-b border-stone-400 pb-0.5 px-1 text-center w-full min-w-[16px] leading-none">
        {num}
      </span>
      <span className="text-[12px] font-black text-slate-950 pt-0.5 px-1 text-center w-full min-w-[16px] leading-none">
        {den}
      </span>
    </span>
  );
}

export function Var({ base, sub, sup }: { base: React.ReactNode; sub?: React.ReactNode; sup?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center font-serif italic text-slate-950 font-black relative mx-0.5 align-middle select-none">
      <span className="leading-none">{base}</span>
      {sub !== undefined && (
        <sub className="font-sans font-extrabold text-[9px] text-indigo-700 not-italic align-sub -ml-0.5 relative top-[3px]">
          {sub}
        </sub>
      )}
      {sup !== undefined && (
        <sup className="font-sans font-extrabold text-[9px] text-pink-700 not-italic align-super -mr-0.5 relative -top-[3px]">
          {sup}
        </sup>
      )}
    </span>
  );
}

export function Lesson25Textbook() {
  const [activeSection, setActiveSection] = useState<"theory" | "examples" | "applications">("theory");

  // AI Assistant Chat state
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Thầy/Cô chào các em! Thầy/Cô là Trợ lý Giáo viên AI chuyên biệt hướng dẫn giải Bài 25: Bài tập về Vật lí hạt nhân. Các em có thắc mắc hay bài tập nào chưa rõ cần giải đáp liên quan đến cấu trúc hạt nhân, tính độ hụt khối (Δm), năng lượng liên kết (E_lk), các định luật bảo toàn trong phản ứng hạt nhân, chu kỳ bán rã (T) hay hoạt độ phóng xạ (H) không? Hãy nhắn cho Thầy/Cô biết nhé!"
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
          mode: "lesson25"
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
    <div className="space-y-8 bg-stone-50 text-slate-900 p-6 md:p-8 rounded-3xl border-4 border-stone-200 shadow-[6px_6px_0px_rgba(120,113,108,0.3)]">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-stone-200 pb-5 gap-4">
        <div>
          <span className="bg-indigo-100 text-indigo-900 text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider font-mono border-2 border-indigo-300 shadow-[2px_2px_0px_rgba(99,102,241,0.2)]">
            Chương IV: Vật lí hạt nhân
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-950 mt-3 tracking-tight">
            Bài 25: Bài tập về Vật lí hạt nhân
          </h1>
          <p className="text-slate-800 text-sm mt-2 font-semibold leading-relaxed max-w-4xl">
            Tổng hợp và vận dụng toàn diện kiến thức về cấu trúc hạt nhân, phản ứng phân hạch, phản ứng nhiệt hạch, sự phóng xạ và các ứng dụng thực tiễn trong công nghiệp, y học hiện đại.
          </p>
        </div>
      </div>

      {/* TABS NAVIGATION (3D Style) */}
      <div className="flex flex-wrap gap-3 border-b-2 border-stone-200 pb-1">
        <button
          onClick={() => setActiveSection("theory")}
          className={`px-5 py-3 text-xs font-black rounded-t-xl transition-all border-2 border-b-0 ${
            activeSection === "theory"
              ? "border-stone-300 bg-white text-indigo-700 shadow-[2px_-2px_0px_rgba(99,102,241,0.15)] translate-y-[2px]"
              : "border-transparent text-slate-600 hover:text-slate-950 hover:bg-stone-100"
          }`}
        >
          <BookOpen className="w-4 h-4 inline-block mr-1.5 -translate-y-[1px]" />
          I. Hướng dẫn giải bài tập cốt lõi
        </button>
        <button
          onClick={() => setActiveSection("examples")}
          className={`px-5 py-3 text-xs font-black rounded-t-xl transition-all border-2 border-b-0 ${
            activeSection === "examples"
              ? "border-stone-300 bg-white text-rose-700 shadow-[2px_-2px_0px_rgba(244,63,94,0.15)] translate-y-[2px]"
              : "border-transparent text-slate-600 hover:text-slate-950 hover:bg-stone-100"
          }`}
        >
          <Award className="w-4 h-4 inline-block mr-1.5 -translate-y-[1px]" />
          II. Bài tập ví dụ (Có lời giải)
        </button>
        <button
          onClick={() => setActiveSection("applications")}
          className={`px-5 py-3 text-xs font-black rounded-t-xl transition-all border-2 border-b-0 ${
            activeSection === "applications"
              ? "border-stone-300 bg-white text-emerald-700 shadow-[2px_-2px_0px_rgba(16,185,129,0.15)] translate-y-[2px]"
              : "border-transparent text-slate-600 hover:text-slate-950 hover:bg-stone-100"
          }`}
        >
          <Compass className="w-4 h-4 inline-block mr-1.5 -translate-y-[1px]" />
          III. Bài tập tự luyện thực tiễn
        </button>
      </div>

      {/* SECTION I: THEORY GUIDELINES (Soft 3D Cards) */}
      {activeSection === "theory" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-indigo-50 border-3 border-indigo-200 rounded-3xl p-6 shadow-[4px_4px_0px_rgba(199,210,254,0.7)] hover:shadow-[6px_6px_0px_rgba(199,210,254,0.9)] transition-all">
            <h3 className="text-md font-extrabold text-indigo-950 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 bg-indigo-600 text-white flex items-center justify-center rounded-lg text-xs font-black shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">1</span>
              Lưu ý khi giải bài tập Định tính
            </h3>
            <p className="text-slate-900 text-sm leading-relaxed font-semibold mb-3">
              Các bài tập này đòi hỏi học sinh mô tả chính xác cấu tạo hạt nhân, đặc điểm hạt nhân tham gia phản ứng hạt nhân, tính chất đặc trưng của các tia phóng xạ và giải thích các ứng dụng quan trọng trong đời sống kỹ thuật.
            </p>
            <div className="bg-white/80 rounded-2xl p-4 border-2 border-indigo-100 text-xs text-indigo-900 font-bold space-y-2.5">
              <p className="flex items-start gap-2">
                <span className="text-indigo-600 mt-0.5">✔</span>
                <span><strong>Bảo toàn điện tích và số khối</strong>: Luôn ghi nhớ tổng số khối <FormattedMathText text="$A$" /> và tổng điện tích <FormattedMathText text="$Z$" /> được bảo toàn ở hai vế, tuy nhiên tổng số neutron và tổng số proton độc lập <em>không nhất thiết phải bảo toàn</em>.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-indigo-600 mt-0.5">✔</span>
                <span><strong>Tính chất tia phóng xạ</strong>: <FormattedMathText text="_2^4He" /> (tia <FormattedMathText text="$\alpha$" />) ion hóa rất mạnh nhưng đâm xuyên yếu; tia <FormattedMathText text="$\beta$" /> (gồm <FormattedMathText text="_-1^0e" /> và <FormattedMathText text="_1^0e" />) có khả năng đâm xuyên trung bình; tia gamma (<FormattedMathText text="$\gamma$" />) là sóng điện từ bước sóng cực ngắn, không mang điện tích, ion hóa yếu nhưng đâm xuyên cực kỳ mạnh.</span>
              </p>
            </div>
          </div>

          <div className="bg-rose-50 border-3 border-rose-200 rounded-3xl p-6 shadow-[4px_4px_0px_rgba(254,205,211,0.7)] hover:shadow-[6px_6px_0px_rgba(254,205,211,0.9)] transition-all">
            <h3 className="text-md font-extrabold text-rose-950 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 bg-rose-600 text-white flex items-center justify-center rounded-lg text-xs font-black shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">2</span>
              Lưu ý khi giải bài tập Định lượng
            </h3>
            <p className="text-slate-900 text-sm leading-relaxed font-semibold mb-3">
              Yêu cầu vận dụng các công thức liên quan đến độ hụt khối, năng lượng liên kết, hằng số phóng xạ, chu kỳ bán rã và định luật phân rã phóng xạ.
            </p>
            <div className="bg-white/80 rounded-2xl p-4 border-2 border-rose-100 text-xs text-rose-900 font-bold space-y-4">
              <div>
                <p className="text-rose-950 text-xs font-black mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
                  Công thức độ hụt khối và năng lượng liên kết:
                </p>
                <div className="bg-stone-50 p-4 rounded-xl border-2 border-stone-200 space-y-3.5 text-center shadow-inner">
                  {/* Equation 1 */}
                  <div className="flex flex-wrap items-center justify-center gap-2 py-1 border-b border-stone-200/60 pb-2">
                    <span className="text-[11px] font-black text-stone-500 uppercase tracking-wider min-w-[150px] text-left">Độ hụt khối:</span>
                    <div className="flex items-center text-sm font-black text-slate-950">
                      <FormattedMathText text="$\Delta m = [Z \cdot m_p + (A - Z) \cdot m_n] - m_{hn}$" />
                    </div>
                  </div>

                  {/* Equation 2 */}
                  <div className="flex flex-wrap items-center justify-center gap-2 py-1 border-b border-stone-200/60 pb-2">
                    <span className="text-[11px] font-black text-stone-500 uppercase tracking-wider min-w-[150px] text-left">Năng lượng liên kết:</span>
                    <div className="flex items-center text-sm font-black text-slate-950">
                      <FormattedMathText text="$E_{lk} = \Delta m \cdot c^2 = \Delta m \cdot 931,5 \text{ MeV}$" />
                    </div>
                  </div>

                  {/* Equation 3 */}
                  <div className="flex flex-wrap items-center justify-center gap-2 py-1">
                    <span className="text-[11px] font-black text-stone-500 uppercase tracking-wider min-w-[150px] text-left">Năng lượng riêng:</span>
                    <div className="flex items-center text-sm font-black text-slate-950">
                      <FormattedMathText text="$\varepsilon = \frac{E_{lk}}{A}$" />
                      <span className="text-xs text-rose-800 font-extrabold ml-3 font-sans italic bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full">(Năng lượng liên kết riêng)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-rose-950 text-xs font-black mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
                  Định luật phân rã phóng xạ:
                </p>
                <div className="bg-stone-50 p-4 rounded-xl border-2 border-stone-200 space-y-3.5 text-center shadow-inner">
                  {/* Equation 1: Number of nuclei */}
                  <div className="flex flex-wrap items-center justify-center gap-2 py-1 border-b border-stone-200/60 pb-2">
                    <span className="text-[11px] font-black text-stone-500 uppercase tracking-wider min-w-[150px] text-left">Số hạt nhân còn lại:</span>
                    <div className="flex items-center text-sm font-black text-slate-950">
                      <FormattedMathText text="$N(t) = N_0 \cdot 2^{-\frac{t}{T}} = N_0 \cdot e^{-\lambda t}$" />
                    </div>
                  </div>

                  {/* Equation 2: Mass */}
                  <div className="flex flex-wrap items-center justify-center gap-2 py-1 border-b border-stone-200/60 pb-2">
                    <span className="text-[11px] font-black text-stone-500 uppercase tracking-wider min-w-[150px] text-left">Khối lượng còn lại:</span>
                    <div className="flex items-center text-sm font-black text-slate-950">
                      <FormattedMathText text="$m(t) = m_0 \cdot 2^{-\frac{t}{T}} = m_0 \cdot e^{-\lambda t}$" />
                    </div>
                  </div>

                  {/* Equation 3: Activity */}
                  <div className="flex flex-wrap items-center justify-center gap-2 py-1">
                    <span className="text-[11px] font-black text-stone-500 uppercase tracking-wider min-w-[150px] text-left">Hoạt độ phóng xạ:</span>
                    <div className="flex items-center text-sm font-black text-slate-950">
                      <FormattedMathText text="$H(t) = H_0 \cdot 2^{-\frac{t}{T}} = H_0 \cdot e^{-\lambda t}$" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border-3 border-emerald-200 rounded-3xl p-6 shadow-[4px_4px_0px_rgba(167,243,208,0.7)] hover:shadow-[6px_6px_0px_rgba(167,243,208,0.9)] transition-all">
            <h3 className="text-md font-extrabold text-emerald-950 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 bg-emerald-600 text-white flex items-center justify-center rounded-lg text-xs font-black shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">3</span>
              Lưu ý khi giải bài tập có nội dung Thực tiễn
            </h3>
            <p className="text-slate-900 text-sm leading-relaxed font-semibold mb-3">
              Rèn luyện khả năng liên tưởng, thiết lập mô hình vật lí toán cho các hoạt động chiếu xạ khử trùng thực phẩm, xạ trị ung thư, vận hành lò phản ứng nhà máy điện hoặc xác định niên đại khảo cổ.
            </p>
            <div className="bg-white/80 rounded-2xl p-4 border-2 border-emerald-100 text-xs text-emerald-900 font-bold space-y-4">
              <p className="flex flex-col md:flex-row md:items-center gap-2.5 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                <span className="text-emerald-600 font-black text-sm shrink-0">✔</span>
                <span className="flex-1">
                  <strong>Chu kỳ bảo dưỡng máy xạ trị</strong>: Hoạt độ nguồn giảm đi một tỉ lệ <span className="text-rose-600">p %</span>. Kỹ sư cần tăng thời gian chiếu lên tương ứng để bù đắp phần hao hụt hoạt độ, đảm bảo tế bào ung thư nhận đủ liều tích lũy:
                </span>
                <span className="shrink-0 self-center md:self-auto bg-white px-3 py-1.5 rounded-lg border-2 border-emerald-200 text-slate-950 font-black">
                  <FormattedMathText text="$t_{bd} = T \cdot \log_2 \left( \frac{100}{100 - p} \right)$" />
                </span>
              </p>
              <p className="flex flex-col md:flex-row md:items-center gap-2.5 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                <span className="text-emerald-600 font-black text-sm shrink-0">✔</span>
                <span className="flex-1">
                  <strong>Xác định tuổi khảo cổ Carbon-14</strong>: Khi sinh vật ngừng trao đổi chất, tỉ lệ hoạt độ giảm dần. Đo hoạt độ phóng xạ của gỗ cổ vật <span className="font-mono bg-stone-100 px-1 py-0.5 rounded text-slate-900">H</span> và so với gỗ tươi cùng khối lượng <span className="font-mono bg-stone-100 px-1 py-0.5 rounded text-slate-900">H_0</span> để tìm tuổi:
                </span>
                <span className="shrink-0 self-center md:self-auto bg-white px-3 py-1.5 rounded-lg border-2 border-emerald-200 text-slate-950 font-black">
                  <FormattedMathText text="$t = T \cdot \log_2 \left( \frac{H_0}{H} \right)$" />
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION II: WORKED EXAMPLES */}
      {activeSection === "examples" && (
        <div className="space-y-6 animate-fade-in">
          {/* EXAMPLE 1 */}
          <div className="bg-white border-3 border-stone-300 rounded-3xl p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] space-y-4">
            <span className="bg-stone-900 text-stone-100 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider font-mono shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
              Ví dụ 1 (Định tính)
            </span>
            <h4 className="text-sm font-black text-slate-950 mt-2 leading-relaxed flex flex-wrap items-center gap-1.5">
              <span>Giải thích tại sao khi đưa mẫu phóng xạ</span>
              <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-900 text-xs w-5 h-5 rounded-full font-black">1</span>
              <span>vào gần đầu thu điện</span>
              <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-900 text-xs w-5 h-5 rounded-full font-black">2</span>
              <span>của một tĩnh điện kế đã được tích điện dương thì độ lệch của kim điện kế</span>
              <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-900 text-xs w-5 h-5 rounded-full font-black">3</span>
              <span>giảm rất nhanh (như hình vẽ mô tả thí nghiệm)?</span>
            </h4>
            <div className="bg-amber-50/70 border-2 border-amber-200 rounded-2xl p-4 text-xs font-semibold text-amber-950 space-y-2">
              <p className="font-black text-amber-900 uppercase">Lời giải chi tiết:</p>
              <p>1. Các hạt hoặc tia phóng xạ phát ra từ mẫu phóng xạ (1) khi đi vào không khí xung quanh đầu thu điện (2) sẽ trực tiếp va chạm, ion hóa mạnh các phân tử không khí trung hòa thành các cặp ion mang điện tích dương và electron (ion âm) tự do.</p>
              <p>2. Không khí xung quanh tĩnh điện kế ban đầu là chất cách điện, nay dưới tác dụng của tia phóng xạ đã trở nên dẫn điện tốt hơn do mật độ hạt tải điện tăng cao.</p>
              <p>3. Do tĩnh điện kế tích điện dương, nó sẽ thu hút các ion mang điện tích âm (electron) trong không khí bị ion hóa chảy vào đầu thu điện. Quá trình này nhanh chóng trung hòa bớt điện tích của tĩnh điện kế, làm điện tích tổng thể giảm mạnh, dẫn tới kim điện kế lệch về vị trí số 0 nhanh chóng.</p>
            </div>
          </div>

          {/* EXAMPLE 2 */}
          <div className="bg-white border-3 border-stone-300 rounded-3xl p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] space-y-4">
            <span className="bg-stone-900 text-stone-100 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider font-mono shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
              Ví dụ 2 (Cân bằng phân hạch)
            </span>
            <h4 className="text-sm font-black text-slate-950 mt-2 leading-relaxed">
              Viết phương trình phân hạch của hạt nhân <FormattedMathText text="_92^235U" /> khi hấp thụ một neutron chậm, biết rằng sản phẩm phân hạch gồm có hạt nhân <FormattedMathText text="_58^140Ce" />, <FormattedMathText text="_40^94Zr" />, các neutron thứ cấp và các tia phóng xạ <FormattedMathText text="$\beta^-$" />. Tìm số hạt nơtron và electron phóng ra.
            </h4>
            <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 text-xs font-semibold text-rose-950 space-y-3">
              <p className="font-black text-rose-950 uppercase">Lời giải chi tiết:</p>
              <p>
                Gọi <FormattedMathText text="$x$" /> là số hạt nơtron <FormattedMathText text="_0^1n" /> và <FormattedMathText text="$y$" /> là số hạt electron <FormattedMathText text="_-1^0e" /> (bản chất tia <FormattedMathText text="$\beta^-$" />). Phương trình phản ứng có dạng:
              </p>
              <div className="bg-stone-100 p-3 rounded-xl border border-stone-200 text-center font-black shadow-inner my-2">
                <FormattedMathText text="$$_92^{235}U + _0^1n \rightarrow _58^{140}Ce + _40^{94}Zr + x \cdot _0^1n + y \cdot _{-1}^0e$$" />
              </div>
              <p>Áp dụng các định luật bảo toàn của phản ứng hạt nhân:</p>
              <div className="pl-4 space-y-2">
                <div className="flex items-start gap-1">
                  <span>•</span>
                  <span>
                    <strong>Bảo toàn số khối <FormattedMathText text="$A$" /></strong>: <FormattedMathText text="$235 + 1 = 140 + 94 + x \cdot 1 + y \cdot 0 \Rightarrow 236 = 234 + x \Rightarrow x = 2$" /> (nơtron).
                  </span>
                </div>
                <div className="flex items-start gap-1">
                  <span>•</span>
                  <span>
                    <strong>Bảo toàn điện tích <FormattedMathText text="$Z$" /></strong>: <FormattedMathText text="$92 + 0 = 58 + 40 + x \cdot 0 + y \cdot (-1) \Rightarrow 92 = 98 - y \Rightarrow y = 6$" /> (electron).
                  </span>
                </div>
              </div>
              <p>Vậy phương trình phản ứng phân hạch hoàn chỉnh:</p>
              <div className="bg-indigo-950 text-emerald-300 p-4 rounded-xl text-center font-bold shadow-md">
                <FormattedMathText text="$$_92^{235}U + _0^1n \rightarrow _58^{140}Ce + _40^{94}Zr + 2 \cdot _0^1n + 6 \cdot _{-1}^0e$$" />
              </div>
            </div>
          </div>

          {/* EXAMPLE 3 */}
          <div className="bg-white border-3 border-stone-300 rounded-3xl p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] space-y-4">
            <span className="bg-stone-900 text-stone-100 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider font-mono shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
              Ví dụ 3 (Ứng dụng y tế y học hạt nhân)
            </span>
            <h4 className="text-sm font-black text-slate-950 mt-2 leading-relaxed">
              Máy xạ trị áp sát sử dụng nguồn phóng xạ <FormattedMathText text="_27^60Co" /> có chu kỳ bán rã là <FormattedMathText text="$T = 5,3 \text{ năm}$" />. 
              Để đáp ứng tiêu chuẩn y học nghiêm ngặt:
              <br />
              a) Thiết bị phải được bảo dưỡng, hiệu chỉnh thời gian phát tia khi độ phóng xạ nguồn giảm đi <strong>7%</strong>.
              <br />
              b) Thiết bị phải thay thế nguồn phát phóng xạ mới hoàn toàn khi độ phóng xạ giảm đi <strong>50%</strong>.
              <br />
              Hãy thiết lập lịch bảo dưỡng và thay thế nguồn phóng xạ cho máy xạ trị trên.
            </h4>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 text-xs font-semibold text-emerald-950 space-y-3">
              <p className="font-black text-emerald-900 uppercase">Lời giải chi tiết:</p>
              <div>
                <p className="font-black text-slate-950">a) Xác định chu kỳ bảo dưỡng <FormattedMathText text="$t_{bd}$" /> (khi hoạt độ giảm 7%, còn lại 93%):</p>
                <p className="mt-1 leading-relaxed">Áp dụng định luật phân rã phóng xạ của hoạt độ <FormattedMathText text="$H$" />:</p>
                <div className="bg-stone-100 p-3.5 rounded-xl border border-stone-200 text-center shadow-inner my-2 space-y-2">
                  <FormattedMathText text="$$H = H_0 \cdot 2^{-\frac{t_{bd}}{T}} = 0,93 \cdot H_0$$" />
                  <FormattedMathText text="$$\Rightarrow -\frac{t_{bd}}{T} = \log_2(0,93) \Rightarrow t_{bd} = -5,3 \cdot \log_2(0,93) \approx 0,555 \text{ năm}$$" />
                </div>
                <p>Quy đổi ra đơn vị tháng (1 năm = 12 tháng):</p>
                <div className="bg-white/60 py-1.5 rounded-lg border border-indigo-100 mt-1 shadow-sm text-center">
                  <FormattedMathText text="$t_{bd} = 0,555 \cdot 12 \approx 6,65 \text{ tháng}$" />
                </div>
              </div>

              <div>
                <p className="font-black text-slate-950">b) Xác định chu kỳ thay thế nguồn <FormattedMathText text="$t_{tm}$" /> (khi hoạt độ giảm 50%, còn lại 50%):</p>
                <p className="mt-1 leading-relaxed">Khi hoạt độ giảm còn 50%, thời gian trôi qua đúng bằng 1 chu kỳ bán rã của chất phóng xạ:</p>
                <div className="bg-stone-100 p-3.5 rounded-xl border border-stone-200 text-center shadow-inner my-2">
                  <FormattedMathText text="$$H = \frac{H_0}{2} = 0,50 \cdot H_0 \Rightarrow t_{tm} = T = 5,3 \text{ năm}$$" />
                </div>
              </div>
              <div className="bg-white border-l-4 border-emerald-500 p-3 rounded-r-xl">
                <p className="text-emerald-900 font-bold text-xs">✔ Kết luận lịch vận hành:</p>
                <p className="text-slate-800 font-semibold mt-1">Cứ sau khoảng <strong>6,65 tháng</strong> kỹ sư cần thực hiện bảo dưỡng hiệu chuẩn thời gian máy, và sau <strong>5,3 năm</strong> cần tiến hành thay thế nạp nguồn phóng xạ mới hoàn toàn.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION III: APPLICATION EXERCISES FOR SELF-LEARNING */}
      {activeSection === "applications" && (
        <div className="space-y-6 animate-fade-in text-xs font-semibold text-slate-900">
          <div className="bg-white border-3 border-stone-300 rounded-3xl p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] space-y-4">
            <h4 className="text-sm font-black text-slate-950 flex items-center gap-2 border-b-2 border-stone-200 pb-2">
              <Compass className="w-5 h-5 text-indigo-700" />
              Danh sách bài tập tự luận thực tế trong sách giáo khoa
            </h4>
            
            <div className="space-y-4 leading-relaxed">
              <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl">
                <span className="text-indigo-700 font-black font-mono text-[10px] uppercase">Bài 1 (SGK Trang 121)</span>
                <p className="text-slate-950 font-bold mt-1.5 text-xs">
                  Lực nào đã làm thay đổi phương của hạt alpha (<FormattedMathText text="_2^4He" />) khi được bắn vào một lá vàng mỏng?
                </p>
                <p className="text-slate-600 mt-2 font-medium">
                  <strong>Hướng dẫn:</strong> Lực đẩy tĩnh điện Coulomb giữa hạt nhân vàng tích điện dương lớn (<FormattedMathText text="_79^197Au" />) và hạt nhân alpha cũng mang điện tích dương (<FormattedMathText text="_2^4He" />) khi chúng tiến lại gần nhau.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl">
                <span className="text-indigo-700 font-black font-mono text-[10px] uppercase">Bài 3 (SGK Trang 121)</span>
                <p className="text-slate-950 font-bold mt-1.5 text-xs">
                  Dùng máy đo phóng xạ của một mẫu gỗ của một cổ vật phát hiện được 240 phân rã mỗi phút. Biết rằng mẫu gỗ tươi cùng loại nặng 25g có tỉ lệ nguyên tử Carbon-14 là <FormattedMathText text="$10^{-12} : 1$" />. Tính tuổi cổ vật (C-14 có <FormattedMathText text="$T = 5730 \text{ năm}$" />).
                </p>
                <p className="text-slate-600 mt-2 font-medium">
                  <strong>Hướng dẫn:</strong> Tính hoạt độ ban đầu của mẫu gỗ tươi. Sau đó áp dụng định luật phóng xạ <FormattedMathText text="$H = H_0 \cdot 2^{-\frac{t}{T}}$" /> để tìm niên đại chính xác <FormattedMathText text="$t$" /> của tượng gỗ cổ vật.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl">
                <span className="text-indigo-700 font-black font-mono text-[10px] uppercase">Bài 4 (SGK Trang 121)</span>
                <p className="text-slate-950 font-bold mt-1.5 text-xs">
                  Một nhà máy điện hạt nhân sử dụng nhiên liệu <FormattedMathText text="_92^235U" />. Biết mỗi phân hạch tỏa ra 200 MeV, hiệu suất nhà máy đạt 36%. Công suất phát điện là 1400 MW. Tính khối lượng <FormattedMathText text="_92^235U" /> tiêu thụ trong 1 năm.
                </p>
                <div className="text-slate-700 mt-3 space-y-2 font-medium text-xs bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
                  <p className="font-bold text-slate-900 border-b border-stone-100 pb-1.5">Hướng dẫn giải bài tập:</p>
                  <p className="flex items-center gap-2">
                    <span className="text-indigo-600 font-black">1.</span>
                    <span>Tính công suất nhiệt lò phản ứng:</span>
                    <span className="ml-auto font-bold bg-indigo-50/50 border border-indigo-100 px-2 py-0.5 rounded text-indigo-900">
                      <FormattedMathText text="$P_{\text{nhiệt}} = \frac{P_{\text{điện}}}{H}$" />
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-indigo-600 font-black">2.</span>
                    <span>Tính năng lượng tỏa ra trong 1 năm:</span>
                    <span className="ml-auto font-bold bg-indigo-50/50 border border-indigo-100 px-2 py-0.5 rounded text-indigo-900">
                      <FormattedMathText text="$Q = P_{\text{nhiệt}} \cdot (365 \cdot 86400)$" />
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-indigo-600 font-black">3.</span>
                    <span>Số phân hạch cần xảy ra:</span>
                    <span className="ml-auto font-bold bg-indigo-50/50 border border-indigo-100 px-2 py-0.5 rounded text-indigo-900">
                      <FormattedMathText text="$N = \frac{Q}{E_{\text{fission}}}$" />
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">(với <FormattedMathText text="$E_{\text{fission}} = 200 \text{ MeV} = 3,2 \cdot 10^{-11} \text{ J}$" />)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-indigo-600 font-black">4.</span>
                    <span>Tính khối lượng nhiên liệu tiêu thụ:</span>
                    <span className="ml-auto font-bold bg-indigo-50/50 border border-indigo-100 px-2 py-0.5 rounded text-indigo-900">
                      <FormattedMathText text="$m = \frac{N}{N_A} \cdot 235 \text{ gam}$" />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* AI CHAT ASSISTANT BOX (GÓC GIẢI ĐÁP AI) */}
      <div className="bg-gradient-to-b from-indigo-50/50 to-indigo-100/30 border-2 border-indigo-200 border-b-[5px] border-b-indigo-300 rounded-3xl p-5 md:p-6 space-y-4 shadow-sm mt-8 text-left">
        <div className="flex items-center justify-between border-b border-indigo-250 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Góc giải đáp AI: Trợ lý học tập Bài 25
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Hỏi đáp lý thuyết độ hụt khối, năng lượng liên kết, các định luật bảo toàn hạt nhân, chu kỳ phóng xạ và ứng dụng y tế/công nghiệp.
              </p>
            </div>
          </div>
          <button
            onClick={() => setMessages([{
              role: "model",
              content: "Thầy/Cô chào các em! Thầy/Cô là Trợ lý Giáo viên AI chuyên biệt hướng dẫn giải Bài 25: Bài tập về Vật lí hạt nhân. Các em có thắc mắc hay bài tập nào chưa rõ cần giải đáp liên quan đến cấu trúc hạt nhân, tính độ hụt khối (Δm), năng lượng liên kết (E_lk), các định luật bảo toàn trong phản ứng hạt nhân, chu kỳ bán rã (T) hay hoạt độ phóng xạ (H) không? Hãy nhắn cho Thầy/Cô biết nhé!"
            }])}
            title="Làm mới trò chuyện"
            className="p-2 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-all hover:rotate-180 duration-500"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* MESSAGES VIEW */}
        <div className="h-64 overflow-y-auto bg-white rounded-2xl border border-indigo-150 p-4 space-y-4 shadow-inner">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-semibold leading-relaxed ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none shadow-md"
                    : "bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none shadow-sm"
                }`}
              >
                <div className="font-black text-[9px] uppercase tracking-wider mb-1 opacity-70">
                  {msg.role === "user" ? "Học sinh" : "Trợ lý Giáo viên"}
                </div>
                {msg.role === "model" ? (
                  <div className="space-y-1">
                    {msg.content.split("\n").map((line, lIdx) => (
                      <div key={lIdx}>
                        <FormattedMathText text={line} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <FormattedMathText text={msg.content} />
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-50 text-slate-500 border border-slate-200 rounded-2xl rounded-tl-none p-3.5 text-xs font-medium shadow-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="text-[10px] italic">Thầy/Cô đang suy nghĩ câu trả lời...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* SAMPLE QUESTIONS */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black text-indigo-950 uppercase tracking-wider block">Gợi ý câu hỏi nhanh:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSendMessage("Hãy tóm tắt phương pháp tính độ hụt khối và năng lượng liên kết riêng của hạt nhân?")}
              disabled={isTyping}
              className="px-3 py-1.5 text-[10.5px] bg-white border border-indigo-200 rounded-xl text-indigo-700 hover:bg-indigo-50 font-bold transition-all text-left shadow-sm disabled:opacity-50"
            >
              • Cách tính độ hụt khối & năng lượng liên kết?
            </button>
            <button
              onClick={() => handleSendMessage("Nêu phương pháp giải dạng bài tập tính tuổi cổ vật bằng đồng vị Carbon-14?")}
              disabled={isTyping}
              className="px-3 py-1.5 text-[10.5px] bg-white border border-indigo-200 rounded-xl text-indigo-700 hover:bg-indigo-50 font-bold transition-all text-left shadow-sm disabled:opacity-50"
            >
              • Tính tuổi cổ vật bằng Carbon-14?
            </button>
            <button
              onClick={() => handleSendMessage("Lực hạt nhân có điểm gì khác biệt so với lực tĩnh điện Coulomb?")}
              disabled={isTyping}
              className="px-3 py-1.5 text-[10.5px] bg-white border border-indigo-200 rounded-xl text-indigo-700 hover:bg-indigo-50 font-bold transition-all text-left shadow-sm disabled:opacity-50"
            >
              • So sánh lực hạt nhân & lực tĩnh điện?
            </button>
          </div>
        </div>

        {/* INPUT FORM */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Đặt câu hỏi về Bài 25 cho Thầy/Cô..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-white border-2 border-indigo-200 text-xs rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors font-bold text-slate-800 placeholder-slate-400"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isTyping}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1 shadow-md"
          >
            Gửi
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
