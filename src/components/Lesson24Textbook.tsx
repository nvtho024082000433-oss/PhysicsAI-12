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
  Flame,
  Activity as HeartIcon,
  Send,
  RefreshCw
} from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Nuclide({ a, z, element }: { a: string; z: string; element: string }) {
  return (
    <span className="inline-flex items-center mx-0.5 font-bold font-mono text-slate-900 bg-slate-100 px-1 py-0.5 rounded border border-slate-300">
      <span className="flex flex-col text-[8px] leading-none text-right mr-0.5 -space-y-0.5">
        <span>{a}</span>
        <span>{z}</span>
      </span>
      <span className="text-xs">{element}</span>
    </span>
  );
}

export function Lesson24Textbook() {
  const [activeTab, setActiveTab] = useState<"nuclear_power" | "medicine" | "biotech" | "calculator">("nuclear_power");
  
  // Interactive Calculator for Nuclear Power Fissions & fuel
  const [powerElectric, setPowerElectric] = useState<number>(100); // MW
  const [efficiency, setEfficiency] = useState<number>(35); // %
  const [operatingDays, setOperatingDays] = useState<number>(30); // days
  
  // Calculate
  const powerThermal = (powerElectric / (efficiency / 100)); // MW thermal
  const totalEnergyJoules = powerThermal * 1e6 * (operatingDays * 86400); // Joules
  // 1 fission of U-235 yields ~200 MeV = 200 * 10^6 * 1.6 * 10^-19 J = 3.2 * 10^-11 J
  const totalFissions = totalEnergyJoules / (3.2e-11);
  // 1 mole of U-235 is 235g = 6.022 * 10^23 atoms
  const molesNeeded = totalFissions / 6.022e23;
  const massU235Grams = molesNeeded * 235;
  const massU235Kg = massU235Grams / 1000;

  // AI Assistant Chat state
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Thầy/Cô chào các em! Thầy/Cô là Trợ lý Giáo viên AI chuyên biệt giải đáp Bài 24: Công nghiệp hạt nhân và Ứng dụng phóng xạ. Các em có thắc mắc gì cần giải đáp liên quan đến cấu tạo lò phản ứng hạt nhân, nguyên lý vận hành nhà máy điện hạt nhân, chẩn đoán SPECT/PET hay các ứng dụng chiếu xạ thực phẩm không?"
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
          mode: "lesson24"
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
    <div className="space-y-8 bg-stone-50 text-slate-900 p-6 md:p-8 rounded-3xl border-2 border-stone-200 shadow-md">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-stone-200 pb-5 gap-4">
        <div>
          <span className="bg-amber-100 text-amber-900 text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider font-mono border border-amber-300 shadow-sm">
            Chương IV: Vật lí hạt nhân
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-950 mt-3 tracking-tight">
            Bài 24: Công nghiệp hạt nhân & Ứng dụng phóng xạ
          </h1>
          <p className="text-slate-800 text-sm mt-2 font-semibold leading-relaxed max-w-4xl">
            Khám phá quy trình vận hành kỳ vĩ của Nhà máy điện hạt nhân, các kỹ thuật Chẩn đoán & Điều trị ung thư trong Y học hạt nhân, cùng các ứng dụng đột phá trong Nông nghiệp và Bảo quản thực phẩm.
          </p>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex flex-wrap gap-2 border-b-2 border-stone-200 pb-1">
        <button
          onClick={() => setActiveTab("nuclear_power")}
          className={`px-4 py-2.5 text-xs font-black rounded-t-xl transition-all border-t border-x ${
            activeTab === "nuclear_power"
              ? "border-stone-300 bg-white text-indigo-700 border-b-2 border-b-indigo-600 shadow-sm font-black"
              : "border-transparent text-slate-600 hover:text-slate-950 hover:bg-stone-100"
          }`}
        >
          I. Nhà máy điện hạt nhân
        </button>
        <button
          onClick={() => setActiveTab("medicine")}
          className={`px-4 py-2.5 text-xs font-black rounded-t-xl transition-all border-t border-x ${
            activeTab === "medicine"
              ? "border-stone-300 bg-white text-rose-700 border-b-2 border-b-rose-600 shadow-sm font-black"
              : "border-transparent text-slate-600 hover:text-slate-950 hover:bg-stone-100"
          }`}
        >
          II. Y học hạt nhân
        </button>
        <button
          onClick={() => setActiveTab("biotech")}
          className={`px-4 py-2.5 text-xs font-black rounded-t-xl transition-all border-t border-x ${
            activeTab === "biotech"
              ? "border-stone-300 bg-white text-emerald-700 border-b-2 border-b-emerald-600 shadow-sm font-black"
              : "border-transparent text-slate-600 hover:text-slate-950 hover:bg-stone-100"
          }`}
        >
          III. Bảo quản thực phẩm & Sinh học
        </button>
        <button
          onClick={() => setActiveTab("calculator")}
          className={`px-4 py-2.5 text-xs font-black rounded-t-xl transition-all border-t border-x ${
            activeTab === "calculator"
              ? "border-stone-300 bg-white text-purple-700 border-b-2 border-b-purple-600 shadow-sm font-black"
              : "border-transparent text-slate-600 hover:text-slate-950 hover:bg-stone-100"
          }`}
        >
          IV. Công cụ tính năng lượng lò
        </button>
      </div>

      {/* TAB CONTENT I: NUCLEAR POWER */}
      {activeTab === "nuclear_power" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-stone-300 rounded-2xl p-6 shadow-sm hover:border-indigo-400 transition-colors">
              <div className="flex items-center gap-2.5 mb-4">
                <Atom className="w-6 h-6 text-indigo-700" />
                <h3 className="font-extrabold text-lg text-slate-950">1. Nguyên lí chung của nhà máy điện hạt nhân</h3>
              </div>
              <p className="text-slate-900 text-sm leading-relaxed mb-3 font-medium">
                Nhà máy điện hạt nhân là cơ sở chuyển hóa năng lượng hạt nhân (nhiệt tỏa ra từ các phản ứng phân hạch hạt nhân dây chuyền) thành điện năng thông qua hệ thống lò phản ứng, tua bin, và máy phát điện để hòa vào lưới điện quốc gia.
              </p>
              <p className="text-slate-900 text-sm leading-relaxed font-medium">
                Đặc điểm cốt lõi là lò phản ứng vận hành ổn định trong thời gian rất dài mà không cần nạp nhiên liệu liên tục như các lò đốt than đá hay khí thiên nhiên thông thường.
              </p>
            </div>

            <div className="bg-white border-2 border-stone-300 rounded-2xl p-6 shadow-sm hover:border-amber-400 transition-colors">
              <div className="flex items-center gap-2.5 mb-4">
                <Flame className="w-6 h-6 text-amber-700" />
                <h3 className="font-extrabold text-lg text-slate-950">2. Cấu tạo & Cơ chế điều khiển lò phản ứng</h3>
              </div>
              <p className="text-slate-900 text-sm leading-relaxed mb-4 font-medium">
                Bộ phận chính là <strong>Lò phản ứng hạt nhân</strong>. Vùng tâm lò chứa các thanh nhiên liệu làm bằng <Nuclide a="235" z="92" element="U" /> hoặc <Nuclide a="239" z="94" element="Pu" />.
              </p>
              <div className="bg-amber-100/70 rounded-xl p-4 border border-amber-300 text-xs text-amber-950 font-semibold space-y-2">
                <p>• <strong>Chất làm chậm nơtron</strong>: (Than chì, nước nhẹ, nước nặng) biến nơtron nhanh thành nơtron nhiệt độ thấp để tăng hiệu quả phân hạch tiếp theo.</p>
                <p>• <strong>Thanh điều khiển</strong>: Chứa vật liệu hấp thụ nơtron cực mạnh (Bo hoặc Cadimi). Nếu hệ số nhân nơtron <span className="inline-block font-normal"><FormattedMathText text="k > 1" /></span>, thanh sẽ được hạ sâu xuống để giảm lượng nơtron. Trạng thái tới hạn ổn định đạt được khi <span className="inline-block font-normal"><FormattedMathText text="k = 1" /></span>.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-stone-300 rounded-2xl p-6 shadow-sm">
            <h3 className="font-extrabold text-lg text-slate-950 mb-4 flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-indigo-700" />
              Sơ đồ chu trình nhiệt & trao đổi năng lượng
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-200">
                <span className="text-xs font-black text-indigo-800 uppercase font-mono tracking-wide">Chu trình sơ cấp (Kín)</span>
                <p className="text-xs text-slate-900 font-semibold mt-2.5 leading-relaxed">
                  Chất tải nhiệt sơ cấp hấp thụ nhiệt năng trực tiếp từ vùng tâm lò hạt nhân. Nước ở đây được giữ dưới áp suất cực kỳ cao để không bị sôi dù nhiệt độ lên tới hơn 300°C. Sau đó chảy sang bộ sinh hơi.
                </p>
              </div>
              <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200">
                <span className="text-xs font-black text-amber-800 uppercase font-mono tracking-wide">Chu trình thứ hai (Sạch)</span>
                <p className="text-xs text-slate-900 font-semibold mt-2.5 leading-relaxed">
                  Nước lạnh nhận nhiệt gián tiếp qua bộ trao đổi nhiệt để sôi lên, tạo ra hơi nước áp suất cao cực mạnh làm quay cánh quạt Tua bin hơi nước. Tua bin kéo trục Máy phát điện sản sinh điện xoay chiều.
                </p>
              </div>
              <div className="bg-teal-50/50 rounded-xl p-4 border border-teal-200">
                <span className="text-xs font-black text-teal-800 uppercase font-mono tracking-wide">Chu trình làm mát ngoài</span>
                <p className="text-xs text-slate-900 font-semibold mt-2.5 leading-relaxed">
                  Hơi nước sau khi làm quay tua bin được dẫn vào bình ngưng tụ để làm mát thành nước lỏng bằng nguồn nước lạnh tuần hoàn từ sông, hồ hoặc tháp giải nhiệt ngoài trời, rồi tiếp tục chu kỳ tuần hoàn.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6 border-2 border-slate-950 shadow-md">
            <h3 className="font-extrabold text-base text-amber-400 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              Ưu điểm & Thách thức của Điện Hạt Nhân
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
              <div className="space-y-2">
                <p className="font-black text-slate-100 text-sm border-b border-slate-800 pb-1">Ưu điểm:</p>
                <p className="text-slate-200 font-medium">✔ Không phát khí ô nhiễm CO2, CO giúp bảo vệ bầu khí quyển.</p>
                <p className="text-slate-200 font-medium">✔ Mật độ năng lượng khổng lồ: 1 gam Urani-235 giải phóng năng lượng tương đương 3 tấn than đá.</p>
                <p className="text-slate-200 font-medium">✔ Chi phí vận hành lâu dài ổn định, khả năng cung cấp liên tục không phụ thuộc thời tiết.</p>
              </div>
              <div className="space-y-2">
                <p className="font-black text-slate-100 text-sm border-b border-slate-800 pb-1">Thách thức:</p>
                <p className="text-slate-200 font-medium">✘ Chi phí xây dựng ban đầu cực kỳ lớn và quy trình kỹ thuật cao phức tạp.</p>
                <p className="text-slate-200 font-medium">✘ Sản phẩm phân hạch chứa các đồng vị cực kỳ độc hại có chu kỳ bán rã dài (<Nuclide a="90" z="38" element="Sr" />, <Nuclide a="137" z="55" element="Cs" /> khoảng 30 năm), đòi hỏi ngâm bể làm mát nhiều năm trước khi cất giữ địa chất.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT II: MEDICINE */}
      {activeTab === "medicine" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-stone-300 rounded-2xl p-6 shadow-sm hover:border-rose-400 transition-colors">
              <div className="flex items-center gap-2.5 mb-4">
                <HeartIcon className="w-6 h-6 text-rose-700" />
                <h3 className="font-extrabold text-lg text-slate-950">1. Chẩn đoán hình ảnh cắt lớp phát xạ</h3>
              </div>
              <p className="text-slate-900 text-sm leading-relaxed mb-4 font-medium">
                Kỹ thuật chụp ảnh y học hạt nhân hiện đại sử dụng <strong>SPECT</strong> (Chụp cắt lớp bằng bức xạ đơn photon) và <strong>PET</strong> (Chụp cắt lớp bằng bức xạ positron) để theo dõi các phản ứng sinh hóa của cơ thể.
              </p>
              <div className="bg-rose-50 rounded-xl p-4 border border-rose-200 text-xs text-slate-900 font-semibold space-y-2 shadow-sm">
                <p className="text-rose-950 font-black text-sm">Cơ chế hoạt động:</p>
                <p>• <strong>Chất đánh dấu phóng xạ</strong>: Đồng vị phóng xạ được liên kết với chất dinh dưỡng (như đường Glucose) rồi tiêm vào mạch máu.</p>
                <p>• <strong>Phát hiện vùng bệnh</strong>: Các tế bào ung thư tăng trưởng cực nhanh hấp thụ glucose nhiều hơn tế bào thường. Khi đồng vị phân rã giải phóng tia gamma hoặc hạt positron (gặp electron tạo hiện tượng hủy cặp phát xạ gamma đối chiều), camera bên ngoài ghi nhận và dựng hình ảnh 3D vùng u sáng rực.</p>
              </div>
            </div>

            <div className="bg-white border-2 border-stone-300 rounded-2xl p-6 shadow-sm hover:border-blue-400 transition-colors">
              <div className="flex items-center gap-2.5 mb-4">
                <Activity className="w-6 h-6 text-blue-700" />
                <h3 className="font-extrabold text-lg text-slate-950">2. Phương pháp điều trị xạ trị hiện đại</h3>
              </div>
              <p className="text-slate-900 text-sm leading-relaxed mb-4 font-medium">
                Y học hạt nhân sử dụng nguồn phóng xạ năng lượng cực cao để tiêu diệt tận gốc tế bào ung thư theo ba cách chính:
              </p>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-xs text-slate-900 font-semibold space-y-2 shadow-sm">
                <p className="text-blue-950 font-black text-sm">Các phương pháp chính:</p>
                <p>• <strong>Xạ trị trong (Uống/Tiêm)</strong>: Bệnh nhân uống dược chất phóng xạ, cơ thể hấp thụ đưa thẳng đến mục tiêu. Ví dụ: uống <Nuclide a="131" z="53" element="I" /> để điều trị ung thư tuyến giáp.</p>
                <p>• <strong>Xạ trị áp sát</strong>: Đặt các hạt nguồn phóng xạ kích thước milimet chứa <Nuclide a="125" z="53" element="I" /> trực tiếp vào lòng khối u để nó liên tục phát bức xạ hủy diệt tế bào u tại chỗ.</p>
                <p>• <strong>Xạ trị ngoài</strong>: Dùng máy quay phát chùm tia gamma hội tụ xuyên thấu tế bào lành từ nhiều góc để giao nhau hội tụ liều lượng bức xạ lớn nhất ngay tâm u.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT III: BIOTECH */}
      {activeTab === "biotech" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-stone-300 rounded-2xl p-6 shadow-sm hover:border-emerald-400 transition-colors">
              <div className="flex items-center gap-2.5 mb-4">
                <Sparkles className="w-6 h-6 text-emerald-700" />
                <h3 className="font-extrabold text-lg text-slate-950">1. Công nghệ chiếu xạ bảo quản thực phẩm</h3>
              </div>
              <p className="text-slate-900 text-sm leading-relaxed mb-4 font-medium">
                Thực phẩm sau khi thu hoạch (như quả vải thiều, hành tây, khoai tây) được vận chuyển qua phòng chiếu xạ tia gamma phát ra từ đồng vị Coban-60 (<Nuclide a="60" z="27" element="Co" />) hoặc máy phát bức xạ điện tử.
              </p>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-xs text-slate-900 font-semibold space-y-2 shadow-sm">
                <p className="text-emerald-950 font-black text-sm">Tác dụng sinh học:</p>
                <p>• <strong>Tác dụng diệt khuẩn</strong>: Tia gamma xuyên qua vỏ, tiêu diệt toàn bộ vi sinh vật, trứng côn trùng và bào tử nấm mốc bám ngoài thực phẩm.</p>
                <p>• <strong>Chống mọc mầm</strong>: Chiếu xạ làm ức chế hoạt động sinh học tế bào của rủ quả giúp ức chế mọc mầm, kéo dài thời hạn lưu trữ tươi ngon gấp nhiều lần mà hoàn toàn không lưu giữ chất độc hại hay chất phóng xạ trong thực phẩm.</p>
              </div>
            </div>

            <div className="bg-white border-2 border-stone-300 rounded-2xl p-6 shadow-sm hover:border-teal-400 transition-colors">
              <div className="flex items-center gap-2.5 mb-4">
                <Compass className="w-6 h-6 text-teal-700" />
                <h3 className="font-extrabold text-lg text-slate-950">2. Đột biến sinh học & Đánh dấu phóng xạ</h3>
              </div>
              <p className="text-slate-900 text-sm leading-relaxed mb-4 font-medium">
                Các đồng vị phóng xạ giúp cách mạng hóa ngành chọn tạo giống cây trồng và nghiên cứu thổ nhưỡng:
              </p>
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-200 text-xs text-slate-900 font-semibold space-y-2 shadow-sm">
                <p className="text-teal-950 font-black text-sm">Ứng dụng đột phá:</p>
                <p>• <strong>Gây đột biến gene có lợi</strong>: Chiếu xạ liều thích hợp tạo ra đột biến cấu trúc gene hạt giống cây, từ đó tuyển chọn ra các giống đột biến ưu tú có khả năng chịu mặn, kháng sâu hại và cho quả không hạt.</p>
                <p>• <strong>Kỹ thuật đánh dấu phóng xạ</strong>: Bón phân chứa lượng cực nhỏ đồng vị phóng xạ phốt pho <Nuclide a="32" z="15" element="P" />, sau đó đo sự phát xạ ở các bộ phận lá và ngọn cây để biết chính xác rễ cây hấp thụ dưỡng chất nhanh hay chậm.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT IV: CALCULATOR */}
      {activeTab === "calculator" && (
        <div className="bg-white border-2 border-stone-300 rounded-2xl p-6 space-y-6 animate-fadeIn shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <Calculator className="w-6 h-6 text-purple-700" />
            <h3 className="font-extrabold text-lg text-slate-950">Công cụ định lượng tiêu thụ nhiên liệu Urani-235</h3>
          </div>
          <p className="text-slate-800 text-sm leading-relaxed font-semibold">
            Nhập các thông số hoạt động của tổ máy điện hạt nhân để tính toán lượng Urani-235 phân hạch thực tế tương ứng cần tiêu thụ.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-purple-50 p-5 rounded-xl border border-purple-200 shadow-sm">
            <div>
              <label className="block text-xs font-black text-purple-950 uppercase mb-2">Công suất phát điện (P_điện)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={powerElectric} 
                  onChange={(e) => setPowerElectric(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white border-2 border-purple-200 rounded-lg py-2 px-3 text-sm font-bold text-slate-950 focus:outline-none focus:border-purple-500"
                />
                <span className="absolute right-3 top-2.5 text-xs font-black text-slate-600">MW</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-purple-950 uppercase mb-2">Hiệu suất nhà máy (H)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={efficiency} 
                  onChange={(e) => setEfficiency(Math.min(100, Math.max(1, parseFloat(e.target.value) || 0)))}
                  className="w-full bg-white border-2 border-purple-200 rounded-lg py-2 px-3 text-sm font-bold text-slate-950 focus:outline-none focus:border-purple-500"
                />
                <span className="absolute right-3 top-2.5 text-xs font-black text-slate-600">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-purple-950 uppercase mb-2">Thời gian chạy (ngày)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={operatingDays} 
                  onChange={(e) => setOperatingDays(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border-2 border-purple-200 rounded-lg py-2 px-3 text-sm font-bold text-slate-950 focus:outline-none focus:border-purple-500"
                />
                <span className="absolute right-3 top-2.5 text-xs font-black text-slate-600">ngày</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-100 p-6 rounded-xl space-y-4 font-mono text-xs border-2 border-slate-950 shadow-md">
            <h4 className="text-amber-400 font-extrabold text-sm border-b border-slate-800 pb-2">KẾT QUẢ ĐỊNH LƯỢNG KHOA HỌC</h4>
            <div className="space-y-3">
              <div className="font-semibold text-slate-200 flex flex-wrap items-center gap-1.5">
                <span>1. Công suất nhiệt tỏa ra từ lò:</span>
                <span className="text-emerald-400 font-normal">
                  <FormattedMathText text={`P_nhiệt = P_điện / H = ${powerThermal.toFixed(2)} MW`} />
                </span>
              </div>
              <div className="font-semibold text-slate-200 flex flex-wrap items-center gap-1.5">
                <span>2. Tổng năng lượng nhiệt tỏa ra:</span>
                <span className="text-emerald-400 font-normal">
                  <FormattedMathText text={`Q = P_nhiệt * t = ${totalEnergyJoules.toExponential(3)} J`} />
                </span>
              </div>
              <div className="font-semibold text-slate-200 flex flex-wrap items-center gap-1.5">
                <span>3. Tổng số phân hạch xảy ra (~200 MeV/phân hạch):</span>
                <span className="text-emerald-400 font-normal">
                  <FormattedMathText text={`N = Q / (200\u00A0MeV) = ${totalFissions.toExponential(3)} hạt`} />
                </span>
              </div>
              <div className="pt-3 border-t border-slate-800 text-amber-300 font-black text-sm flex flex-wrap items-center gap-1.5">
                <span>★ Khối lượng Urani-235 đã phân rã hoàn toàn:</span>
                <span className="text-emerald-400 text-base font-normal">
                  <FormattedMathText text={`m = ${massU235Kg.toFixed(4)} kg`} />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI CHAT ASSISTANT BOX (GÓC GIẢI ĐÁP AI) */}
      <div className="bg-gradient-to-b from-indigo-50/50 to-indigo-100/30 border-2 border-indigo-200 border-b-[5px] border-b-indigo-300 rounded-3xl p-5 md:p-6 space-y-4 shadow-sm mt-8">
        <div className="flex items-center justify-between border-b border-indigo-250 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Góc giải đáp AI: Trợ lý học tập Bài 24
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Hỏi đáp lý thuyết lò phản ứng hạt nhân, điện hạt nhân, chẩn đoán y học SPECT/PET hoặc ứng dụng chiếu xạ.
              </p>
            </div>
          </div>
          <button
            onClick={() => setMessages([{
              role: "model",
              content: "Thầy/Cô chào các em! Thầy/Cô là Trợ lý Giáo viên AI chuyên biệt giải đáp Bài 24: Công nghiệp hạt nhân và Ứng dụng phóng xạ. Các em có thắc mắc gì cần giải đáp liên quan đến cấu tạo lò phản ứng hạt nhân, nguyên lý vận hành nhà máy điện hạt nhân, chẩn đoán SPECT/PET hay các ứng dụng chiếu xạ thực phẩm không?"
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
              onClick={() => handleSendMessage("Hãy giải thích vai trò của chất làm chậm nơtron và thanh điều khiển trong lò phản ứng hạt nhân?")}
              disabled={isTyping}
              className="px-3 py-1.5 text-[10.5px] bg-white border border-indigo-200 rounded-xl text-indigo-700 hover:bg-indigo-50 font-bold transition-all text-left shadow-sm disabled:opacity-50"
            >
              • Vai trò chất làm chậm & thanh điều khiển?
            </button>
            <button
              onClick={() => handleSendMessage("Kỹ thuật chụp ảnh cắt lớp PET và SPECT trong y tế hoạt động như thế nào?")}
              disabled={isTyping}
              className="px-3 py-1.5 text-[10.5px] bg-white border border-indigo-200 rounded-xl text-indigo-700 hover:bg-indigo-50 font-bold transition-all text-left shadow-sm disabled:opacity-50"
            >
              • Chẩn đoán PET và SPECT hoạt động ra sao?
            </button>
            <button
              onClick={() => handleSendMessage("Chiếu xạ thực phẩm bằng tia Gamma có làm thực phẩm nhiễm phóng xạ không?")}
              disabled={isTyping}
              className="px-3 py-1.5 text-[10.5px] bg-white border border-indigo-200 rounded-xl text-indigo-700 hover:bg-indigo-50 font-bold transition-all text-left shadow-sm disabled:opacity-50"
            >
              • Chiếu xạ thực phẩm có an toàn không?
            </button>
            <button
              onClick={() => handleSendMessage("Trình bày ưu điểm và thách thức lớn nhất của điện hạt nhân so với nhiệt điện truyền thống?")}
              disabled={isTyping}
              className="px-3 py-1.5 text-[10.5px] bg-white border border-indigo-200 rounded-xl text-indigo-700 hover:bg-indigo-50 font-bold transition-all text-left shadow-sm disabled:opacity-50"
            >
              • Ưu điểm & Thách thức điện hạt nhân?
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
            placeholder="Nhập thắc mắc của em về Bài 24 hoặc công nghiệp hạt nhân tại đây..."
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
