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
  Maximize2,
  Atom,
  Calculator,
  Grid,
  Zap,
  ChevronRight,
  Shield,
  Activity,
  Award,
  Calendar,
  AlertTriangle,
  Send,
  RefreshCw
} from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Nuclide({ a, z, element }: { a: string; z: string; element: string }) {
  return (
    <span className="inline-flex items-center mx-0.5 font-bold font-mono text-slate-900">
      <span className="flex flex-col text-[9px] leading-none text-right mr-0.5 -space-y-0.5">
        <span>{a}</span>
        <span>{z}</span>
      </span>
      <span className="text-sm">{element}</span>
    </span>
  );
}

export function Lesson23Textbook() {
  const [activeTab, setActiveTab] = useState<"intro" | "rays" | "decay" | "applications" | "calculator">("intro");
  
  // Isotope Calculator States
  const [selectedIsotope, setSelectedIsotope] = useState<string>("C14");
  const [m0, setM0] = useState<number>(100); // initial mass in grams
  const [elapsedTime, setElapsedTime] = useState<number>(5730); // elapsed time
  const [customHalfLife, setCustomHalfLife] = useState<number>(1000); // custom half life
  const [customName, setCustomName] = useState<string>("Đồng vị tự do");

  const isotopes = {
    C14: {
      name: "Carbon-14 (Khảo cổ học)",
      halfLife: 5730,
      unit: "năm",
      eq: "_6^14C -> _7^14N + _-1^0e + \\bar{\\nu}_e",
      element: "C",
      a: "14",
      z: "6",
      product: "N",
      pa: "14",
      pz: "7",
      ray: "β-",
      desc: "Dùng để xác định tuổi cổ vật hữu cơ lên tới 50,000 năm."
    },
    Co60: {
      name: "Cobalt-60 (Y học & Công nghiệp)",
      halfLife: 5.27,
      unit: "năm",
      eq: "_27^60Co -> _28^60Ni + _-1^0e + \\gamma",
      element: "Co",
      a: "60",
      z: "27",
      product: "Ni",
      pa: "60",
      pz: "28",
      ray: "β- & γ",
      desc: "Nguồn bức xạ gamma mạnh dùng trong xạ trị ung thư và khử trùng y tế."
    },
    I131: {
      name: "Iodine-131 (Y học tuyến giáp)",
      halfLife: 8.02,
      unit: "ngày",
      eq: "_53^131I -> _54^131Xe + _-1^0e + \\gamma",
      element: "I",
      a: "131",
      z: "53",
      product: "Xe",
      pa: "131",
      pz: "54",
      ray: "β- & γ",
      desc: "Dùng để chẩn đoán và điều trị bệnh ung thư hoặc cường giáp."
    },
    U238: {
      name: "Uranium-238 (Địa chất học)",
      halfLife: 4.47, // in billion years
      unit: "tỷ năm",
      eq: "_92^238U -> _90^234Th + _2^4He",
      element: "U",
      a: "238",
      z: "92",
      product: "Th",
      pa: "234",
      pz: "90",
      ray: "α",
      desc: "Dùng để xác định tuổi của đất đá, quặng khoáng và chính Trái Đất."
    }
  };

  const handleApplyIsotope = (key: string) => {
    setSelectedIsotope(key);
    if (key !== "custom") {
      const iso = isotopes[key as keyof typeof isotopes];
      setElapsedTime(iso.halfLife);
    }
  };

  // Get active half-life
  const activeHalfLife = selectedIsotope === "custom" ? customHalfLife : isotopes[selectedIsotope as keyof typeof isotopes].halfLife;
  const activeUnit = selectedIsotope === "custom" ? "đơn vị thời gian" : isotopes[selectedIsotope as keyof typeof isotopes].unit;

  // AI Assistant Chat state
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Thầy/Cô chào các em! Thầy/Cô là Trợ lý Giáo viên AI chuyên biệt giải đáp Bài 23: Hiện tượng Phóng xạ. Các em có thắc mắc gì cần giải đáp liên quan đến bản chất các tia phóng xạ Alpha, Beta, Gamma, cách thiết lập định luật phân rã phóng xạ, chu kỳ bán rã hay ứng dụng thực tiễn của phóng xạ trong y tế và khảo cổ học không?"
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
          mode: "lesson23"
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
  
  // Decay Calculation
  const kDecay = 0.693147 / activeHalfLife; // decay constant
  const fractionRemaining = Math.pow(2, -elapsedTime / activeHalfLife);
  const remainingMass = m0 * fractionRemaining;
  const decayedMass = m0 - remainingMass;
  const activityRatio = fractionRemaining; // Activity is proportional to N

  return (
    <div className="space-y-8 bg-slate-50/50 text-slate-800 p-4 md:p-6 rounded-3xl border border-slate-200">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <span className="bg-rose-100 text-rose-700 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider font-mono border border-rose-200 shadow-sm">
            Chương IV: Vật lí hạt nhân
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-3 tracking-tight">
            Bài 23: Hiện tượng Phóng xạ
          </h1>
          <p className="text-slate-600 text-xs mt-1.5 font-medium">
            Tìm hiểu bản chất của hiện tượng phóng xạ tự phát, đặc tính của các tia phóng xạ Alpha, Beta, Gamma, định luật phân rã phóng xạ vĩ mô và các ứng dụng đột phá trong thực tiễn.
          </p>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab("intro")}
          className={`px-3 py-2 text-xs font-black rounded-t-xl transition-all border-t border-x ${
            activeTab === "intro"
              ? "border-slate-200 bg-white text-rose-600 border-b-2 border-b-rose-500 shadow-sm font-black"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          }`}
        >
          I. Khái niệm & Khám phá
        </button>
        <button
          onClick={() => setActiveTab("rays")}
          className={`px-3 py-2 text-xs font-black rounded-t-xl transition-all border-t border-x ${
            activeTab === "rays"
              ? "border-slate-200 bg-white text-rose-600 border-b-2 border-b-rose-500 shadow-sm font-black"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          }`}
        >
          II. Các tia Phóng xạ
        </button>
        <button
          onClick={() => setActiveTab("decay")}
          className={`px-3 py-2 text-xs font-black rounded-t-xl transition-all border-t border-x ${
            activeTab === "decay"
              ? "border-slate-200 bg-white text-rose-600 border-b-2 border-b-rose-500 shadow-sm font-black"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          }`}
        >
          III. Định luật Phân rã
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-3 py-2 text-xs font-black rounded-t-xl transition-all border-t border-x ${
            activeTab === "applications"
              ? "border-slate-200 bg-white text-rose-600 border-b-2 border-b-rose-500 shadow-sm font-black"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          }`}
        >
          IV. Ứng dụng & An toàn
        </button>
        <button
          onClick={() => setActiveTab("calculator")}
          className={`px-3 py-2 text-xs font-black rounded-t-xl transition-all border-t border-x bg-rose-50 text-rose-700 ${
            activeTab === "calculator"
              ? "border-rose-200 bg-white text-rose-600 border-b-2 border-b-rose-500 shadow-sm font-black"
              : "border-transparent hover:text-rose-900 hover:bg-rose-100"
          }`}
        >
          ⚡ Máy tính phân rã
        </button>
      </div>

      {/* CONTENT SECTIONS */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm min-h-[400px]">
        {/* TAB I: INTRO */}
        {activeTab === "intro" && (
          <div className="space-y-6 animate-fade-in text-slate-900">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-150 shadow-inner">
                <Atom className="h-6 w-6 text-rose-600 animate-spin" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">I. Hiện tượng phóng xạ là gì?</h2>
                <p className="text-xs text-slate-500 font-medium">Lịch sử khám phá của Becquerel, gia đình Curie và định nghĩa bản chất vật lý.</p>
              </div>
            </div>

            {/* Historical Box (3D Style) */}
            <div className="bg-gradient-to-b from-rose-50/50 to-rose-100/30 border-2 border-rose-200 border-b-[5px] border-b-rose-300 rounded-2xl p-5 space-y-3 relative overflow-hidden shadow-sm">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5 pointer-events-none">
                <Award className="w-40 h-40 text-rose-950" />
              </div>
              <h3 className="text-xs font-black text-rose-900 uppercase tracking-widest flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-rose-600 fill-rose-200" />
                Dấu ấn lịch sử khoa học
              </h3>
              <p className="text-xs text-slate-900 leading-relaxed font-semibold">
                Năm 1896, nhà vật lý Henri Becquerel vô tình phát hiện ra muối Uran phát ra các bức xạ vô hình xuyên qua được giấy đen và làm đen tấm kính ảnh bên dưới. Ngay sau đó, Marie Curie cùng chồng là Pierre Curie đã lao vào nghiên cứu, phát hiện ra hai nguyên tố mới có tính phóng xạ cực mạnh là Poloni (<Nuclide a="210" z="84" element="Po" />) và Radi (<Nuclide a="226" z="88" element="Ra" />), đồng thời đặt tên cho hiện tượng này là <strong className="text-rose-700">Phóng xạ (Radioactivity)</strong>.
              </p>
              <p className="text-[11px] text-rose-950 font-bold italic">
                Khám phá vĩ đại này đã mở ra cánh cửa cho ngành Vật lý hạt nhân hiện đại và mang về 2 giải Nobel danh giá cho gia đình Curie.
              </p>
            </div>

            {/* Core Definition (3D Block) */}
            <div className="bg-gradient-to-b from-blue-50/50 to-blue-100/30 border-2 border-blue-200 border-b-[5px] border-b-blue-300 rounded-2xl p-5 space-y-2.5 shadow-sm">
              <h3 className="text-xs font-black text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4.5 h-4.5 text-blue-600" />
                Định nghĩa khoa học cốt lõi
              </h3>
              <p className="text-xs leading-relaxed text-slate-800 font-semibold">
                <strong className="text-rose-700 font-black">Phóng xạ</strong> là quá trình một hạt nhân không bền vững tự động phân rã, phát ra các tia bức xạ hạt hoặc sóng điện từ (gọi chung là tia phóng xạ) và biến đổi thành một hạt nhân của nguyên tố khác.
              </p>
              <div className="text-center py-2.5 bg-white rounded-xl border border-blue-200 font-mono text-xs font-black text-blue-700 shadow-inner">
                Hạt nhân mẹ (Không bền) → Hạt nhân con (Bền hơn) + Tia phóng xạ (α, β, γ)
              </div>
            </div>

            {/* Special Characteristics (3D Block) */}
            <div className="bg-gradient-to-b from-amber-50/50 to-amber-100/30 border-2 border-amber-200 border-b-[5px] border-b-amber-300 rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-4.5 h-4.5 text-amber-600" />
                Ba đặc tính cơ bản của sự phóng xạ
              </h3>
              <ul className="space-y-3.5 text-xs text-slate-800 font-semibold">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <strong className="text-amber-950 font-bold block">Quá trình hoàn toàn tự phát:</strong>
                    Sự phân rã do các nguyên nhân nội tại bên trong cấu trúc hạt nhân mẹ quyết định, hoàn toàn không bị ảnh hưởng bởi bất kỳ yếu tố vật lý hay hóa học bên ngoài nào (như nhiệt độ, áp suất, dung môi, hay trạng thái hóa hợp của nguyên tố).
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <strong className="text-amber-950 font-bold block">Quá trình ngẫu nhiên vi mô:</strong>
                    Với một hạt nhân đơn lẻ, thời điểm nó phân rã là hoàn toàn ngẫu nhiên và không thể dự đoán trước. Ta chỉ có thể áp dụng các định luật thống kê xác suất khi khảo sát một số lượng cực lớn các hạt nhân.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                  <div>
                    <strong className="text-amber-950 font-bold block">Là phản ứng hạt nhân tỏa năng lượng:</strong>
                    Hạt nhân con sinh ra luôn nằm ở trạng thái liên kết chặt chẽ hơn, bền vững hơn hạt nhân mẹ ban đầu, và quá trình này tỏa năng lượng dưới dạng động năng của các tia phóng xạ.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB II: RAYS */}
        {activeTab === "rays" && (
          <div className="space-y-6 animate-fade-in text-slate-900">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-150 shadow-inner">
                <Compass className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">II. Phân loại và Bản chất các tia phóng xạ</h2>
                <p className="text-xs text-slate-500 font-medium">Bản chất vật lý, điện tích, tốc độ, khả năng đâm xuyên và ion hóa của tia Alpha, Beta, Gamma.</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-800 font-semibold">
              Khi phóng xạ phân rã, hạt nhân phát ra các tia bức xạ có bản chất hoàn toàn khác nhau. Khi đi qua một điện trường mạnh giữa hai bản tụ điện, chúng bị lệch theo các hướng khác nhau:
            </p>

            {/* Grid of 3D Ray Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Alpha Ray */}
              <div className="bg-gradient-to-b from-orange-50/60 to-orange-100/20 border-2 border-orange-200 border-b-[5px] border-b-orange-300 rounded-2xl p-4 space-y-3 hover:translate-y-[1px] transition-all shadow-sm">
                <span className="text-[10px] font-mono text-orange-800 font-black uppercase tracking-wider block bg-orange-100/60 w-fit px-2 py-0.5 rounded-full">
                  1. Tia Alpha (α)
                </span>
                <div className="text-xs font-bold text-slate-850 space-y-2">
                  <p>
                    <strong className="text-orange-950 font-extrabold block">Bản chất:</strong> Dòng hạt nhân Helium <Nuclide a="4" z="2" element="He" /> mang điện tích <span className="text-orange-700">+2e</span>, khối lượng lớn (~4u).
                  </p>
                  <p>
                    <strong className="text-orange-950 font-extrabold block">Tốc độ & Độ lệch:</strong> Chuyển động tốc độ ~2.10^7 m/s (~6.7% tốc độ ánh sáng). Lệch nhẹ về phía bản âm tụ điện do mang điện tích dương và khối lượng nặng.
                  </p>
                  <p>
                    <strong className="text-orange-950 font-extrabold block">Đặc tính đâm xuyên & Ion hóa:</strong> Khả năng ion hóa không khí cực mạnh (do điện tích lớn), làm mất năng lượng nhanh nên đâm xuyên rất yếu (chỉ đi được vài cm trong không khí và bị chặn đứng bởi một tờ giấy mỏng).
                  </p>
                </div>
              </div>

              {/* Beta Ray */}
              <div className="bg-gradient-to-b from-blue-50/60 to-blue-100/20 border-2 border-blue-200 border-b-[5px] border-b-blue-300 rounded-2xl p-4 space-y-3 hover:translate-y-[1px] transition-all shadow-sm">
                <span className="text-[10px] font-mono text-blue-800 font-black uppercase tracking-wider block bg-blue-100/60 w-fit px-2 py-0.5 rounded-full">
                  2. Tia Beta (β)
                </span>
                <div className="text-xs font-bold text-slate-850 space-y-2">
                  <p>
                    <strong className="text-blue-950 font-extrabold block">Bản chất:</strong> Chia làm 2 loại hạt cực nhẹ:
                    <br />• <strong className="text-blue-700">Beta trừ (β-):</strong> Dòng electron <Nuclide a="0" z="-1" element="e" /> mang điện tích -1e.
                    <br />• <strong className="text-blue-700">Beta cộng (β+):</strong> Dòng positron <Nuclide a="0" z="+1" element="e" /> (phản hạt electron) mang điện tích +1e.
                  </p>
                  <p>
                    <strong className="text-blue-950 font-extrabold block">Tốc độ & Độ lệch:</strong> Chuyển động rất nhanh, xấp xỉ tốc độ ánh sáng. Lệch rất mạnh trong điện trường (β- lệch về bản dương, β+ lệch về bản âm) do có khối lượng siêu nhẹ.
                  </p>
                  <p>
                    <strong className="text-blue-950 font-extrabold block">Đặc tính đâm xuyên:</strong> Đâm xuyên mạnh hơn tia α, đi được vài mét trong không khí và có thể xuyên qua lá nhôm dày vài mm.
                  </p>
                </div>
              </div>

              {/* Gamma Ray */}
              <div className="bg-gradient-to-b from-purple-50/60 to-purple-100/20 border-2 border-purple-200 border-b-[5px] border-b-purple-300 rounded-2xl p-4 space-y-3 hover:translate-y-[1px] transition-all shadow-sm">
                <span className="text-[10px] font-mono text-purple-800 font-black uppercase tracking-wider block bg-purple-100/60 w-fit px-2 py-0.5 rounded-full">
                  3. Tia Gamma (γ)
                </span>
                <div className="text-xs font-bold text-slate-850 space-y-2">
                  <p>
                    <strong className="text-purple-950 font-extrabold block">Bản chất:</strong> Sóng điện từ bước sóng cực ngắn, bản chất là chùm hạt photon mang năng lượng siêu cao. Không mang điện, khối lượng nghỉ bằng 0.
                  </p>
                  <p>
                    <strong className="text-purple-950 font-extrabold block">Tốc độ & Độ lệch:</strong> Chuyển động đúng bằng tốc độ ánh sáng (c ≈ 3.10^8 m/s). Hoàn toàn truyền thẳng, không bị lệch trong điện trường hoặc từ trường.
                  </p>
                  <p>
                    <strong className="text-purple-950 font-extrabold block">Đặc tính đâm xuyên & Ion hóa:</strong> Khả năng ion hóa chất khí yếu nhất, nhưng đâm xuyên cực kì khủng khiếp. Có thể đi xuyên qua lớp không khí dày hàng trăm mét, tấm bê tông cốt thép dày, cần tấm chì dày vài cm để cản lại.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Summary Table Block (3D Style) */}
            <div className="bg-gradient-to-b from-slate-50 to-slate-100 border-2 border-slate-200 border-b-[5px] border-b-slate-300 rounded-2xl p-4 shadow-sm overflow-hidden">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5">
                Bảng so sánh tóm tắt các tia phóng xạ chính
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px] font-semibold">
                  <thead>
                    <tr className="bg-slate-200/60 font-black text-slate-700 border-b border-slate-200">
                      <th className="p-2">Tia bức xạ</th>
                      <th className="p-2">Ký hiệu</th>
                      <th className="p-2">Điện tích</th>
                      <th className="p-2">Khối lượng (u)</th>
                      <th className="p-2">Tốc độ cực đại</th>
                      <th className="p-2">Đâm xuyên</th>
                      <th className="p-2">Ion hóa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    <tr>
                      <td className="p-2 font-black text-orange-700">Alpha</td>
                      <td className="p-2">α (<Nuclide a="4" z="2" element="He" />)</td>
                      <td className="p-2 font-bold text-orange-600">+2e</td>
                      <td className="p-2">4,0015</td>
                      <td className="p-2">~ 20.000 km/s</td>
                      <td className="p-2 text-red-600 font-bold">Yếu (Tờ giấy chặn)</td>
                      <td className="p-2 text-emerald-600 font-bold">Cực mạnh</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-black text-blue-700">Beta trừ</td>
                      <td className="p-2">β- (<Nuclide a="0" z="-1" element="e" />)</td>
                      <td className="p-2 font-bold text-blue-600">-1e</td>
                      <td className="p-2">0,00055</td>
                      <td className="p-2">≈ c (99%)</td>
                      <td className="p-2 text-amber-600 font-bold">Trung bình (Lá nhôm)</td>
                      <td className="p-2 text-amber-600 font-bold">Trung bình</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-black text-blue-700">Beta cộng</td>
                      <td className="p-2">β+ (<Nuclide a="0" z="+1" element="e" />)</td>
                      <td className="p-2 font-bold text-blue-600">+1e</td>
                      <td className="p-2">0,00055</td>
                      <td className="p-2">≈ c (99%)</td>
                      <td className="p-2 text-amber-600 font-bold">Trung bình (Lá nhôm)</td>
                      <td className="p-2 text-amber-600 font-bold">Trung bình</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-black text-purple-700">Gamma</td>
                      <td className="p-2">γ</td>
                      <td className="p-2">0</td>
                      <td className="p-2">0</td>
                      <td className="p-2 font-mono">c = 300.000 km/s</td>
                      <td className="p-2 text-emerald-600 font-bold">Cực mạnh (Cần tấm chì)</td>
                      <td className="p-2 text-red-600 font-bold">Rất yếu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB III: DECAY LAW */}
        {activeTab === "decay" && (
          <div className="space-y-6 animate-fade-in text-slate-900">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-150 shadow-inner">
                <Scale className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">III. Định luật phân rã phóng xạ</h2>
                <p className="text-xs text-slate-500 font-medium">Tìm hiểu toán học của sự suy giảm phóng xạ, chu kỳ bán rã T và hằng số phân rã λ.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column: Formulas */}
              <div className="space-y-5">
                {/* Decay Law Block */}
                <div className="bg-gradient-to-b from-rose-50/50 to-rose-100/30 border-2 border-rose-200 border-b-[5px] border-b-rose-300 rounded-2xl p-5 space-y-3 shadow-sm">
                  <h3 className="text-xs font-black text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-4.5 h-4.5 text-rose-600" />
                    Định luật phân rã lượng chất còn lại
                  </h3>
                  <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                    Theo thời gian, số lượng hạt nhân phóng xạ chưa phân rã và khối lượng của mẫu chất phóng xạ giảm dần theo hàm số mũ:
                  </p>
                  <div className="p-3.5 bg-white rounded-xl border border-rose-200 text-center text-sm text-slate-950 space-y-2.5 shadow-inner">
                    <div className="text-rose-700 text-base font-normal">
                      <FormattedMathText text="N(t) = N_0 \cdot 2^{-t / T} = N_0 \cdot e^{-\lambda \cdot t}" />
                    </div>
                    <div className="text-blue-700 text-base font-normal">
                      <FormattedMathText text="m(t) = m_0 \cdot 2^{-t / T} = m_0 \cdot e^{-\lambda \cdot t}" />
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-650 font-semibold space-y-1 pl-1">
                    <div>• <strong className="text-slate-900"><FormattedMathText text="N_0, m_0" />:</strong> Số hạt nhân và khối lượng ban đầu của chất phóng xạ ở <FormattedMathText text="t = 0" />.</div>
                    <div>• <strong className="text-slate-900"><FormattedMathText text="N(t), m(t)" />:</strong> Số hạt nhân và khối lượng còn lại chưa bị phân rã ở thời điểm <FormattedMathText text="t" />.</div>
                    <div>• <strong className="text-slate-900"><FormattedMathText text="T" /> (s, ngày, năm):</strong> Chu kỳ bán rã của chất phóng xạ.</div>
                    <div>• <strong className="text-slate-900"><FormattedMathText text="\lambda" /> (s⁻¹):</strong> Hằng số phân rã đặc trưng, liên hệ mật thiết với <FormattedMathText text="T" /> qua công thức:</div>
                    <div className="text-center text-rose-800 bg-rose-50 border border-rose-100 rounded-lg py-2 mt-1 text-xs font-normal">
                      <FormattedMathText text="\lambda = \frac{\ln(2)}{T} \approx \frac{0,693}{T}" />
                    </div>
                  </div>
                </div>

                {/* Decayed quantity */}
                <div className="bg-gradient-to-b from-emerald-50/50 to-emerald-100/30 border-2 border-emerald-200 border-b-[5px] border-b-emerald-300 rounded-2xl p-5 space-y-2 shadow-sm">
                  <h3 className="text-xs font-black text-emerald-900 uppercase tracking-wider">
                    Lượng chất đã bị phân rã (Hạt nhân con tạo thành)
                  </h3>
                  <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                    Số hạt nhân đã bị phân rã <FormattedMathText text="\Delta N" /> (và khối lượng đã phân rã <FormattedMathText text="\Delta m" />) biến đổi thành hạt nhân nguyên tố khác sau thời gian <FormattedMathText text="t" />:
                  </p>
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-200 text-center text-sm text-emerald-700 shadow-inner font-normal space-y-2">
                    <div>
                      <FormattedMathText text="\Delta N = N_0 - N(t) = N_0 \cdot (1 - 2^{-t / T})" />
                    </div>
                    <div>
                      <FormattedMathText text="\Delta m = m_0 - m(t) = m_0 \cdot (1 - 2^{-t / T})" />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold italic">
                    Lưu ý: Khối lượng hạt nhân con sinh ra m_con thường khác với Δm do sự khác nhau về số khối A và hao hụt năng lượng nghỉ (Sử dụng tỉ lệ: N_con = ΔN_mẹ).
                  </p>
                </div>
              </div>

              {/* Right column: Concept explanation & Decay curve */}
              <div className="space-y-5 bg-slate-950 p-5 rounded-3xl text-slate-200 border border-slate-800 shadow-lg flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-indigo-400 font-black uppercase tracking-widest block">
                    Đồ thị phân bố thực nghiệm
                  </span>
                  <h3 className="text-xs font-black text-white uppercase tracking-wide">
                    Đồ thị suy giảm phóng xạ m(t) theo thời gian t
                  </h3>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-semibold">
                    Đồ thị mô phỏng sự suy sụt lượng chất phóng xạ theo bội số của chu kỳ bán rã T (T, 2T, 3T, 4T...).
                  </p>
                </div>

                {/* SVG Decay Curve */}
                <div className="w-full h-44 bg-slate-900 rounded-xl border border-slate-850 p-2 relative flex items-center justify-center overflow-hidden">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120">
                    {/* Grid lines */}
                    <line x1="30" y1="10" x2="280" y2="10" stroke="#1e293b" strokeDasharray="1.5" />
                    <line x1="30" y1="35" x2="280" y2="35" stroke="#1e293b" strokeDasharray="1.5" />
                    <line x1="30" y1="60" x2="280" y2="60" stroke="#1e293b" strokeDasharray="1.5" />
                    <line x1="30" y1="85" x2="280" y2="85" stroke="#1e293b" strokeDasharray="1.5" />

                    <line x1="85" y1="10" x2="85" y2="110" stroke="#1e293b" strokeDasharray="1.5" />
                    <line x1="140" y1="10" x2="140" y2="110" stroke="#1e293b" strokeDasharray="1.5" />
                    <line x1="195" y1="10" x2="195" y2="110" stroke="#1e293b" strokeDasharray="1.5" />
                    <line x1="250" y1="10" x2="250" y2="110" stroke="#1e293b" strokeDasharray="1.5" />

                    {/* Axes */}
                    <line x1="30" y1="110" x2="30" y2="5" stroke="#475569" strokeWidth="1.5" />
                    <line x1="30" y1="110" x2="290" y2="110" stroke="#475569" strokeWidth="1.5" />

                    <polygon points="30,2 27,7 33,7" fill="#475569" />
                    <polygon points="293,110 288,107 288,113" fill="#475569" />

                    {/* Labels */}
                    <text x="5" y="14" fill="#94a3b8" className="text-[7.5px] font-mono font-bold">m₀ (100%)</text>
                    <text x="12" y="64" fill="#94a3b8" className="text-[7.5px] font-mono">m₀/2 (50%)</text>
                    <text x="12" y="89" fill="#94a3b8" className="text-[7.5px] font-mono">m₀/4 (25%)</text>

                    <text x="82" y="118" fill="#94a3b8" className="text-[7.5px] font-mono font-bold">T</text>
                    <text x="135" y="118" fill="#94a3b8" className="text-[7.5px] font-mono font-bold">2T</text>
                    <text x="190" y="118" fill="#94a3b8" className="text-[7.5px] font-mono font-bold">3T</text>
                    <text x="245" y="118" fill="#94a3b8" className="text-[7.5px] font-mono font-bold">4T</text>
                    <text x="283" y="118" fill="#94a3b8" className="text-[7.5px] font-mono font-bold">t</text>

                    {/* Curve representing decay */}
                    {/* Points: t=0 (30,10), t=T (85,60), t=2T (140,85), t=3T (195,97.5), t=4T (250,103.75) */}
                    <path 
                      d="M 30,10 C 60,35 70,60 85,60 C 110,60 120,85 140,85 C 170,85 180,97.5 195,97.5 C 220,97.5 230,103.75 250,103.75" 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="2.5" 
                    />

                    {/* Nodes */}
                    <circle cx="30" cy="10" r="3" fill="#f43f5e" />
                    <circle cx="85" cy="60" r="3" fill="#f43f5e" />
                    <circle cx="140" cy="85" r="3" fill="#f43f5e" />
                    <circle cx="195" cy="97.5" r="3" fill="#f43f5e" />
                    <circle cx="250" cy="103.75" r="3" fill="#f43f5e" />

                    {/* Annotation callouts */}
                    <text x="95" y="55" fill="#f43f5e" className="text-[6.5px] font-bold">Còn lại 50%</text>
                    <text x="150" y="80" fill="#f43f5e" className="text-[6.5px] font-bold">Còn lại 25%</text>
                    <text x="205" y="93" fill="#f43f5e" className="text-[6.5px] font-bold">Còn lại 12.5%</text>
                  </svg>
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-[10.5px] text-slate-400 font-medium leading-relaxed">
                  💡 <span className="text-white font-bold">Đặc điểm chu kỳ T:</span> Chu kỳ bán rã T là hằng số tuyệt đối đối với từng đồng vị phóng xạ. Ví dụ: Poloni-214 có chu kỳ bán rã chỉ <span className="text-rose-400 font-bold font-mono">1.6.10⁻⁴ giây</span>, Iodine-131 rã trong <span className="text-rose-400 font-bold font-mono">8 ngày</span>, Carbon-14 rã trong <span className="text-rose-400 font-bold font-mono">5730 năm</span>, còn Uranium-238 cần tới tận <span className="text-rose-400 font-bold font-mono">4.5 tỷ năm</span>!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB IV: APPLICATIONS & SAFETY */}
        {activeTab === "applications" && (
          <div className="space-y-6 animate-fade-in text-slate-900">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-150 shadow-inner">
                <Shield className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">IV. Ứng dụng đột phá & An toàn bức xạ</h2>
                <p className="text-xs text-slate-500 font-medium">Tìm hiểu cách con người thuần hóa năng lượng hạt nhân phục vụ cuộc sống và bảo vệ cơ thể trước phóng xạ.</p>
              </div>
            </div>

            {/* Grid of 3D Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Applications Block */}
              <div className="bg-gradient-to-b from-emerald-50/50 to-emerald-100/30 border-2 border-emerald-200 border-b-[5px] border-b-emerald-300 rounded-2xl p-5 space-y-3.5 shadow-sm">
                <h3 className="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4.5 h-4.5 text-emerald-600" />
                  Các ứng dụng thực tiễn to lớn
                </h3>
                <ul className="space-y-3 text-xs text-slate-800 font-semibold leading-relaxed">
                  <li>
                    <strong className="text-emerald-950 font-bold block">1. Y học hạt nhân (Chẩn đoán & Xạ trị):</strong>
                    • Dùng phương pháp nguyên tử đánh dấu: Đưa Iodine-131 vào cơ thể để dò tìm, định vị ổ di căn, ung thư tuyến giáp.
                    • Dùng chùm tia gamma phát ra từ Cobalt-60 để xạ trị tiêu diệt tế bào ung thư khu trú.
                  </li>
                  <li>
                    <strong className="text-emerald-950 font-bold block">2. Khảo cổ học (Định tuổi bằng đồng vị C-14):</strong>
                    Sử dụng định luật phân rã của Carbon-14 (chu kỳ 5730 năm) để đo hoạt độ phóng xạ còn lại trong các mẩu cổ vật hữu cơ (gỗ, xương, vải dệt), từ đó suy ngược chính xác thời điểm sinh vật chết lên tới hàng chục nghìn năm trước.
                  </li>
                  <li>
                    <strong className="text-emerald-950 font-bold block">3. Công nghiệp & Nông nghiệp:</strong>
                    • Sử dụng tia gamma chiếu xạ để tiệt trùng thiết bị y tế, thực phẩm đóng hộp giúp bảo quản lâu dài.
                    • Dùng nguyên tử đánh dấu để khảo sát sự hấp thụ phân bón của thực vật, cải thiện giống cây trồng đột biến năng suất cao.
                  </li>
                </ul>
              </div>

              {/* Radiation Safety Block */}
              <div className="bg-gradient-to-b from-amber-50/50 to-amber-100/30 border-2 border-amber-200 border-b-[5px] border-b-amber-300 rounded-2xl p-5 space-y-3.5 shadow-sm">
                <h3 className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4.5 h-4.5 text-amber-600 animate-pulse" />
                  Mối nguy hại & Quy tắc bảo vệ an toàn bức xạ
                </h3>
                <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                  Tia phóng xạ mang năng lượng cực lớn có thể bẻ gãy liên kết hóa học của ADN tế bào sống, gây đột biến gen di truyền, ung thư, hoặc hoại tử cấp tính. Việc phòng chống phóng xạ phải tuân thủ ba nguyên tắc vàng sau:
                </p>
                <ul className="space-y-3 text-xs text-slate-800 font-semibold pl-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <div>
                      <strong className="text-amber-950">1. Giảm thiểu thời gian tiếp xúc:</strong>
                      Càng ở gần nguồn phóng xạ thời gian ngắn, liều chiếu hấp thụ của cơ thể càng thấp.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <div>
                      <strong className="text-amber-950">2. Tăng tối đa khoảng cách:</strong>
                      Cường độ bức xạ giảm cực mạnh theo tỷ lệ nghịch với bình phương khoảng cách tới nguồn (I ∝ 1/r²). Nên sử dụng các cánh tay robot cơ học kéo dài khi thao tác.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <div>
                      <strong className="text-amber-950">3. Sử dụng tấm che chắn thích hợp:</strong>
                      Đeo tạp dề chì, đứng sau tường bê tông cốt thép dày hoặc kính chì chuyên dụng khi làm việc trong các khu vực chụp X-quang, xạ trị.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB V: ISOTOPE DECAY CALCULATOR */}
        {activeTab === "calculator" && (
          <div className="space-y-6 animate-fade-in text-slate-900">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-150 shadow-inner">
                <Calculator className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">⚡ Máy tính Phân rã Phóng xạ Thực nghiệm</h2>
                <p className="text-xs text-slate-500 font-medium">Chọn một đồng vị phóng xạ thực tế hoặc tự nhập chu kỳ bán rã tùy chỉnh để tính khối lượng còn lại và lượng chất phân rã.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Control panels (left) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-950 block">Chọn đồng vị phóng xạ thực tế:</label>
                  <select 
                    value={selectedIsotope}
                    onChange={(e) => handleApplyIsotope(e.target.value)}
                    className="w-full text-xs font-bold border border-slate-300 rounded-xl p-2.5 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="C14">Carbon-14 (C-14, T = 5730 năm)</option>
                    <option value="Co60">Cobalt-60 (Co-60, T = 5.27 năm)</option>
                    <option value="I131">Iodine-131 (I-131, T = 8.02 ngày)</option>
                    <option value="U238">Uranium-238 (U-238, T = 4.47 tỷ năm)</option>
                    <option value="custom">-- Nhập chu kỳ tùy chỉnh --</option>
                  </select>
                </div>

                <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-1">
                    <Activity className="w-4.5 h-4.5 text-rose-600 animate-pulse" />
                    Tham số phân rã:
                  </h4>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 block">Khối lượng ban đầu m₀ (gam):</label>
                      <input 
                        type="number" 
                        value={m0} 
                        onChange={(e) => setM0(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full text-xs font-mono font-bold border border-slate-300 rounded-lg p-2 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-500"
                        min="0"
                      />
                    </div>

                    {selectedIsotope === "custom" && (
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 block">Chu kỳ bán rã T (đơn vị thời gian):</label>
                        <input 
                          type="number" 
                          value={customHalfLife} 
                          onChange={(e) => setCustomHalfLife(Math.max(0.001, parseFloat(e.target.value) || 1))}
                          className="w-full text-xs font-mono font-bold border border-slate-300 rounded-lg p-2 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-500"
                          min="0.001"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 block">
                        Thời gian phân rã trôi qua t ({activeUnit}):
                      </label>
                      <input 
                        type="number" 
                        value={elapsedTime} 
                        onChange={(e) => setElapsedTime(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full text-xs font-mono font-bold border border-slate-300 rounded-lg p-2 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-500"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculations results (right) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-gradient-to-b from-rose-50 to-rose-100/40 border-2 border-rose-200 border-b-[5px] border-b-rose-300 rounded-2xl p-5 space-y-4 shadow-sm">
                  <h3 className="text-xs font-black text-rose-900 uppercase tracking-wider border-b border-rose-200/60 pb-1.5 flex items-center justify-between">
                    <span>Kết quả tính toán phân rã</span>
                    <span className="text-[10px] font-mono text-slate-500 capitalize">{selectedIsotope === "custom" ? customName : isotopes[selectedIsotope as keyof typeof isotopes].name}</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-rose-100 p-3 rounded-xl shadow-inner text-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase block">Chưa phân rã (Còn lại) m(t)</span>
                      <span className="text-lg font-mono font-black text-rose-600 block mt-1">
                        {remainingMass.toFixed(4)} <span className="text-xs font-sans text-slate-500 font-bold">g</span>
                      </span>
                      <span className="text-[9.5px] font-mono text-rose-500 block mt-0.5 font-bold">
                        {(fractionRemaining * 100).toFixed(2)}% ban đầu
                      </span>
                    </div>

                    <div className="bg-white border border-rose-100 p-3 rounded-xl shadow-inner text-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase block">Đã phân rã (Hao hụt) Δm</span>
                      <span className="text-lg font-mono font-black text-emerald-600 block mt-1">
                        {decayedMass.toFixed(4)} <span className="text-xs font-sans text-slate-500 font-bold">g</span>
                      </span>
                      <span className="text-[9.5px] font-mono text-emerald-500 block mt-0.5 font-bold">
                        {((1 - fractionRemaining) * 100).toFixed(2)}% ban đầu
                      </span>
                    </div>
                  </div>

                  {/* Math Derivation Steps */}
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs space-y-2 border border-slate-800 shadow-md">
                    <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1 uppercase text-[9px]">Các bước giải khoa học chi tiết:</div>
                    <div className="text-[10.5px] space-y-1.5 leading-relaxed">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span>1. Hằng số phân rã:</span>
                        <span className="text-amber-400 font-normal">
                          <FormattedMathText text={`\\lambda = \\frac{\\ln(2)}{T} = \\frac{0,69315}{${activeHalfLife}} = ${kDecay.toExponential(4)}\\text{ (${activeUnit})^{-1}}`} />
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span>2. Tỉ lệ số hạt còn lại:</span>
                        <span className="text-amber-400 font-normal">
                          <FormattedMathText text={`2^{-t / T} = 2^{-${elapsedTime} / ${activeHalfLife}} = 2^{-${(elapsedTime/activeHalfLife).toFixed(4)}} = ${fractionRemaining.toFixed(5)}`} />
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span>3. Khối lượng còn lại:</span>
                        <span className="text-rose-400 font-normal">
                          <FormattedMathText text={`m(t) = m_0 \\cdot 2^{-t / T} = ${m0} \\cdot ${fractionRemaining.toFixed(5)} = ${remainingMass.toFixed(4)}\\text{ g}`} />
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span>4. Khối lượng đã rã:</span>
                        <span className="text-emerald-400 font-normal">
                          <FormattedMathText text={`\\Delta m = m_0 - m(t) = ${m0} - ${remainingMass.toFixed(4)} = ${decayedMass.toFixed(4)}\\text{ g}`} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick equation visualizer */}
                  {selectedIsotope !== "custom" && (
                    <div className="p-3 bg-white/80 border border-rose-100 rounded-xl text-[11px] text-slate-700 font-semibold space-y-1 shadow-sm">
                      <span className="text-[10px] font-black text-rose-800 block uppercase">Phương trình phản ứng phân rã cụ thể:</span>
                      <div className="text-center py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black font-mono text-slate-950">
                        {selectedIsotope === "C14" && (
                          <span>
                            <Nuclide a="14" z="6" element="C" /> → <Nuclide a="14" z="7" element="N" /> + <Nuclide a="0" z="-1" element="e" /> (Tia β⁻) + <span className="font-sans italic">nơtrinô</span>
                          </span>
                        )}
                        {selectedIsotope === "Co60" && (
                          <span>
                            <Nuclide a="60" z="27" element="Co" /> → <Nuclide a="60" z="28" element="Ni" /> + <Nuclide a="0" z="-1" element="e" /> (β⁻) + γ
                          </span>
                        )}
                        {selectedIsotope === "I131" && (
                          <span>
                            <Nuclide a="131" z="53" element="I" /> → <Nuclide a="131" z="54" element="Xe" /> + <Nuclide a="0" z="-1" element="e" /> (β⁻) + γ
                          </span>
                        )}
                        {selectedIsotope === "U238" && (
                          <span>
                            <Nuclide a="238" z="92" element="U" /> → <Nuclide a="234" z="90" element="Th" /> + <Nuclide a="4" z="2" element="He" /> (Tia α)
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium italic mt-1 leading-normal">
                        {isotopes[selectedIsotope as keyof typeof isotopes].desc}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI CHAT ASSISTANT BOX (GÓC GIẢI ĐÁP AI) */}
      <div className="bg-gradient-to-b from-indigo-50/50 to-indigo-100/30 border-2 border-indigo-200 border-b-[5px] border-b-indigo-300 rounded-3xl p-5 md:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-indigo-250 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Góc giải đáp AI: Trợ lý học tập Bài 23
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Hỏi đáp lý thuyết phóng xạ, bản chất các tia, định luật suy giảm vĩ mô hoặc các ứng dụng thực tế.
              </p>
            </div>
          </div>
          <button
            onClick={() => setMessages([{
              role: "model",
              content: "Thầy/Cô chào các em! Thầy/Cô là Trợ lý Giáo viên AI chuyên biệt giải đáp Bài 23: Hiện tượng Phóng xạ. Các em có thắc mắc gì cần giải đáp liên quan đến bản chất các tia phóng xạ Alpha, Beta, Gamma, cách thiết lập định luật phân rã phóng xạ, chu kỳ bán rã hay ứng dụng thực tiễn của phóng xạ trong y tế và khảo cổ học không?"
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
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>
                ) : (
                  <p>{msg.content}</p>
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
              onClick={() => handleSendMessage("Bản chất và khả năng đâm xuyên của các tia Alpha, Beta, Gamma khác nhau như thế nào?")}
              disabled={isTyping}
              className="px-3 py-1.5 text-[10.5px] bg-white border border-indigo-200 rounded-xl text-indigo-700 hover:bg-indigo-50 font-bold transition-all text-left shadow-sm disabled:opacity-50"
            >
              • So sánh 3 tia phóng xạ?
            </button>
            <button
              onClick={() => handleSendMessage("Nêu công thức định luật phân rã phóng xạ vĩ mô và hằng số phân rã?")}
              disabled={isTyping}
              className="px-3 py-1.5 text-[10.5px] bg-white border border-indigo-200 rounded-xl text-indigo-700 hover:bg-indigo-50 font-bold transition-all text-left shadow-sm disabled:opacity-50"
            >
              • Công thức định luật phân rã?
            </button>
            <button
              onClick={() => handleSendMessage("Phương pháp Carbon-14 đo tuổi cổ vật hoạt động dựa trên nguyên lý nào?")}
              disabled={isTyping}
              className="px-3 py-1.5 text-[10.5px] bg-white border border-indigo-200 rounded-xl text-indigo-700 hover:bg-indigo-50 font-bold transition-all text-left shadow-sm disabled:opacity-50"
            >
              • Cách dùng C-14 đo tuổi cổ vật?
            </button>
            <button
              onClick={() => handleSendMessage("Để đảm bảo an toàn bức xạ, ta cần tuân thủ những quy tắc phòng hộ nào?")}
              disabled={isTyping}
              className="px-3 py-1.5 text-[10.5px] bg-white border border-indigo-200 rounded-xl text-indigo-700 hover:bg-indigo-50 font-bold transition-all text-left shadow-sm disabled:opacity-50"
            >
              • Quy tắc an toàn bức xạ?
            </button>
          </div>
        </div>

        {/* INPUT BOX */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Nhập thắc mắc của em về hiện tượng phóng xạ hoặc vật lý tại đây..."
            disabled={isTyping}
            className="flex-1 text-xs border border-indigo-200 rounded-2xl px-4 py-3 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 font-medium"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isTyping || !inputMessage.trim()}
            className="px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition-all flex items-center justify-center border border-indigo-700 border-b-[4px] border-b-indigo-850 active:translate-y-[2px] active:border-b-[2px] disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
