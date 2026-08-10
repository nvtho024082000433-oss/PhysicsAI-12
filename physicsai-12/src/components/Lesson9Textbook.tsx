import { useState } from "react";
import { BookOpen, Sparkles, Brain, CheckCircle2, RefreshCw, Activity, ArrowRight, Layers, Info, Wind } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson9Textbook() {
  const [activeGraphTab, setActiveGraphTab] = useState<"pV" | "pInverseV" | "pT">("pV");
  
  // Isothermal Syringe Sandbox states
  const [volume, setVolume] = useState<number>(20); // in mL
  const k = 4000; // constant p * V = 4000 (kPa * mL)
  const pressure = parseFloat((k / volume).toFixed(1)); // in kPa
  
  // History table in sandbox
  const [history, setHistory] = useState<{ id: number; v: number; p: number; pV: number }[]>([
    { id: 1, v: 25, p: 160, pV: 4000 },
    { id: 2, v: 20, p: 200, pV: 4000 },
    { id: 3, v: 16, p: 250, pV: 4000 }
  ]);

  const addPointToHistory = () => {
    if (history.some(h => h.v === volume)) return;
    const newPoint = {
      id: Date.now(),
      v: volume,
      p: pressure,
      pV: Math.round(volume * pressure)
    };
    setHistory([...history, newPoint].sort((a, b) => b.v - a.v));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-8 text-slate-900 animate-fade-in">
      {/* Title Header Banner (Light 3D styled matching Lesson 8) */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50/50 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-6 relative overflow-hidden shadow-sm z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 space-y-2.5">
          <span className="text-[10px] font-black bg-teal-100 text-teal-800 px-3 py-1 rounded-full border border-teal-200 tracking-wider uppercase inline-block">
            CHƯƠNG II: KHÍ LÍ TƯỞNG
          </span>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-950 uppercase">
            Bài 9: Định luật Boyle
          </h2>
          <p className="text-xs text-slate-700 max-w-3xl leading-relaxed font-bold">
            Khảo sát định luật thực nghiệm đầu tiên của chất khí: Hành vi đẳng nhiệt của khí lí tưởng khi biến đổi thể tích và áp suất, giải thích bản chất dưới lăng kính động học phân tử vi mô.
          </p>
        </div>
      </div>

      {/* SECTION I: Đẳng quá trình & Quá trình đẳng nhiệt */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-teal-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-teal-400 to-teal-500 rounded-md"></span>
          <h3 className="text-md font-black text-slate-950 uppercase">
            I. Quá trình biến đổi trạng thái - Quá trình đẳng nhiệt
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4 text-xs leading-relaxed text-slate-900">
            <p className="font-bold text-slate-800 flex flex-wrap items-center gap-1">
              Trạng thái của một lượng khí xác định được mô tả bằng ba thông số trạng thái vĩ mô liên kết chặt chẽ: 
              <span className="text-slate-950">Áp suất (<FormattedMathText text="\(p\)" />)</span>, 
              <span className="text-slate-950">Thể tích (<FormattedMathText text="\(V\)" />)</span> và 
              <span className="text-slate-950">Nhiệt độ tuyệt đối (<FormattedMathText text="\(T\)" />)</span>.
            </p>
            <div className="bg-gradient-to-b from-teal-50 to-teal-100/40 border-2 border-teal-200 border-b-[6px] border-b-teal-300 rounded-3xl p-5 shadow-sm space-y-3">
              <span className="font-black text-teal-950 block text-[13px] uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse" />
                Khái niệm cốt lõi
              </span>
              <ul className="space-y-2 list-none pl-1 text-slate-800 font-bold">
                <li className="leading-relaxed flex items-start gap-2">
                  <span className="text-teal-600 font-black mt-0.5">•</span>
                  <div>
                    <strong className="text-teal-950">Đẳng quá trình:</strong> Là quá trình biến đổi trạng thái của một lượng khí xác định khi giữ cho <strong className="text-slate-950">một trong ba</strong> thông số trạng thái không đổi.
                  </div>
                </li>
                <li className="leading-relaxed flex items-start gap-2">
                  <span className="text-teal-600 font-black mt-0.5">•</span>
                  <div className="flex flex-wrap items-center gap-1">
                    <strong className="text-teal-950">Quá trình đẳng nhiệt:</strong> Là quá trình biến đổi trạng thái của một lượng khí xác định khi nhiệt độ tuyệt đối của khí được giữ cố định không đổi (<span className="text-teal-900 inline-flex items-center align-middle font-bold"><FormattedMathText text="\(T = \text{const}\)" /></span>).
                  </div>
                </li>
              </ul>
            </div>
            <p className="text-slate-600 font-bold italic bg-slate-50 p-3.5 border-l-4 border-slate-350 rounded-r-2xl">
              💡 <strong>Ví dụ thực tế:</strong> Khi dùng tay bóp nhẹ quả bóng cao su kín, xilanh tiêm được bịt đầu kim, hoặc bong bóng khí nổi lên từ đáy hồ nước sâu ở vùng nhiệt độ ổn định, thể tích và áp suất lượng khí thay đổi trong khi nhiệt độ xung quanh được giữ không đổi.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-b from-teal-50 to-teal-100/35 border-2 border-teal-250 border-b-[6px] border-b-teal-350 rounded-3xl p-5 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-teal-950 uppercase tracking-wider flex items-center gap-1.5 border-b border-teal-200 pb-2">
              <Layers className="h-4 w-4 text-teal-600" />
              Ba thông số trạng thái vĩ mô
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white border-2 border-teal-200 rounded-2xl p-2.5 shadow-sm">
                <span className="block text-[9px] text-slate-500 font-bold uppercase">ÁP SUẤT (p)</span>
                <span className="text-lg font-black text-teal-950 font-serif italic"><FormattedMathText text="\(p\)" /></span>
                <span className="block text-[8px] text-teal-600 mt-1 font-extrabold">Pa, atm, bar</span>
              </div>
              <div className="bg-white border-2 border-teal-200 rounded-2xl p-2.5 shadow-sm">
                <span className="block text-[9px] text-slate-500 font-bold uppercase">THỂ TÍCH (V)</span>
                <span className="text-lg font-black text-teal-950 font-serif italic"><FormattedMathText text="\(V\)" /></span>
                <span className="block text-[8px] text-teal-600 mt-1 font-extrabold">m³, L, mL</span>
              </div>
              <div className="bg-white border-2 border-teal-200 rounded-2xl p-2.5 shadow-sm">
                <span className="block text-[9px] text-slate-500 font-bold uppercase">NHIỆT ĐỘ (T)</span>
                <span className="text-lg font-black text-teal-950 font-serif italic"><FormattedMathText text="\(T\)" /></span>
                <span className="block text-[8px] text-teal-600 mt-1 font-extrabold">Kelvin (K)</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border-2 border-teal-100 text-[11px] text-slate-900 font-bold leading-relaxed shadow-inner">
              <strong className="text-teal-950 block mb-1">💡 Chú ý thang nhiệt độ tuyệt đối:</strong>
              Trong các định luật chất khí, bắt buộc phải đổi nhiệt độ Celsius sang Kelvin: <span className="inline-flex items-center align-middle font-bold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100"><FormattedMathText text="\(T(\text{K}) = t(^{\circ}\text{C}) + 273,15\)" /></span>.
            </div>
          </div>
        </div>

        {/* Detailed SI Units Table - fulfilling user prompt beautifully */}
        <div className="bg-white border-2 border-slate-225 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm space-y-3 text-xs">
          <span className="font-black text-slate-950 block text-[13px] uppercase tracking-wide flex items-center gap-1.5 border-b-2 border-slate-150 pb-2">
            <Info className="h-4.5 w-4.5 text-teal-600" />
            Chi tiết các đại lượng vật lý trong hệ đo lường quốc tế (SI) & hệ thức quy đổi
          </span>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-slate-800">
              <thead>
                <tr className="bg-slate-50 border-b-2 border-slate-200 font-black text-slate-900">
                  <th className="py-2 px-3">Đại lượng (Ký hiệu chuẩn)</th>
                  <th className="py-2 px-3">Ý nghĩa vật lý</th>
                  <th className="py-2 px-3">Đơn vị chuẩn SI</th>
                  <th className="py-2 px-3">Các đơn vị thường dùng khác & Hệ thức quy đổi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-bold text-slate-950">
                    Áp suất khí (<FormattedMathText text="\(p\)" />)
                  </td>
                  <td className="py-2.5 px-3">
                    Đo lực nén vuông góc của các phân tử khí tác dụng lên một đơn vị diện tích bề mặt thành bình chứa (<FormattedMathText text="\(p = \frac{F}{S}\)" />).
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200 font-black">
                      Pascal (<FormattedMathText text="\(\text{Pa}\)" />)
                    </span>
                    <span className="block text-[10px] text-slate-500 mt-1">
                      <FormattedMathText text="\(1\ \text{Pa} = 1\ \text{N/m}^2\)" />
                    </span>
                  </td>
                  <td className="py-2.5 px-3 space-y-1 text-[11px] leading-relaxed">
                    <div>• <strong className="text-slate-950">Atmosphere (<FormattedMathText text="\(\text{atm}\)" />)</strong>: <FormattedMathText text="\(1\ \text{atm} = 1,013 \cdot 10^5\ \text{Pa}\)" /> (áp suất khí quyển chuẩn)</div>
                    <div>• <strong className="text-slate-950">Bar (<FormattedMathText text="\(\text{bar}\)" />)</strong>: <FormattedMathText text="\(1\ \text{bar} = 10^5\ \text{Pa}\)" /></div>
                    <div>• <strong className="text-slate-950">Milimét thủy ngân (<FormattedMathText text="\(\text{mmHg}\)" />)</strong>: <FormattedMathText text="\(1\ \text{mmHg} \approx 133,3\ \text{Pa}\)" /> (<FormattedMathText text="\(760\ \text{mmHg} = 1\ \text{atm}\)" />)</div>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-bold text-slate-950">
                    Thể tích khí (<FormattedMathText text="\(V\)" />)
                  </td>
                  <td className="py-2.5 px-3">
                    Khoảng không gian vĩ mô mà khối chất khí chiếm giữ (bằng dung tích bình đối với khí lí tưởng tự do chiếm toàn bộ thể tích).
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200 font-black">
                      Mét khối (<FormattedMathText text="\(\text{m}^3\)" />)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 space-y-1 text-[11px] leading-relaxed">
                    <div>• <strong className="text-slate-950">Lít (<FormattedMathText text="\(\text{L}\)" /> hoặc <FormattedMathText text="\(\text{dm}^3\)" />)</strong>: <FormattedMathText text="\(1\ \text{L} = 1\ \text{dm}^3 = 10^{-3}\ \text{m}^3\)" /></div>
                    <div>• <strong className="text-slate-950">Mililít (<FormattedMathText text="\(\text{mL}\)" /> hoặc <FormattedMathText text="\(\text{cm}^3\)" />)</strong>: <FormattedMathText text="\(1\ \text{mL} = 1\ \text{cm}^3 = 10^{-6}\ \text{m}^3 = 10^{-3}\ \text{L}\)" /></div>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-bold text-slate-950">
                    Nhiệt độ tuyệt đối (<FormattedMathText text="\(T\)" />)
                  </td>
                  <td className="py-2.5 px-3">
                    Thang nhiệt nhiệt động học đo lường trực tiếp động năng tịnh tiến trung bình của các phân tử khí (<FormattedMathText text="\(\bar{E}_{đ} = \frac{3}{2} k_B T\)" />).
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200 font-black">
                      Kelvin (<FormattedMathText text="\(\text{K}\)" />)
                    </span>
                    <span className="block text-[10px] text-slate-500 mt-1">
                      (Không có kí hiệu độ &deg; trước K)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 space-y-1 text-[11px] leading-relaxed">
                    <div>• <strong className="text-slate-950">Nhiệt độ Celsius (<FormattedMathText text="\(t\ \left(^{\circ}\text{C}\right)\)" />)</strong>:</div>
                    <div className="bg-amber-50 text-amber-900 font-black px-2 py-1 rounded border border-amber-250 inline-block mt-1">
                      <FormattedMathText text="\(T\ \text{(K)} = t\ \left(^{\circ}\text{C}\right) + 273,15\)" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION II: Định luật Boyle + Bàn thực nghiệm tương tác */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-teal-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-teal-400 to-teal-500 rounded-md"></span>
          <h3 className="text-md font-black text-slate-950 uppercase">
            II. Định luật Boyle (Bôi-lơ - Ma-ri-ốt)
          </h3>
        </div>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p className="font-bold text-slate-800">
            Định luật được nhà vật lí người Anh <strong className="text-slate-950">Robert Boyle</strong> công bố năm 1662 và nhà vật lí người Pháp <strong className="text-slate-950">Edme Mariotte</strong> phát hiện một cách độc lập năm 1676. Định luật thiết lập mối liên hệ định lượng chính xác giữa thể tích và áp suất khí trong quá trình đẳng nhiệt.
          </p>

          <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/30 border-2 border-emerald-200 border-b-[6px] border-b-emerald-300 rounded-3xl p-5 space-y-3 shadow-sm">
            <span className="text-emerald-950 font-black text-[14px] block uppercase tracking-wide">
              📝 NỘI DUNG ĐỊNH LUẬT BOYLE
            </span>
            <p className="text-slate-900 font-bold text-[12.5px] leading-relaxed flex items-center gap-1 flex-wrap">
              &quot;Trong quá trình đẳng nhiệt của một lượng khí xác định, áp suất <FormattedMathText text="\(p\)" /> tỉ lệ nghịch với thể tích <FormattedMathText text="\(V\)" /> của khí đó.&quot;
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="bg-white px-4 py-2 rounded-xl border-2 border-emerald-250 font-bold shadow-inner flex items-center text-sm">
                <FormattedMathText text="\(p \propto \frac{1}{V} \Rightarrow p \cdot V = \text{const}\)" />
              </div>
              <div className="bg-white px-4 py-2 rounded-xl border-2 border-emerald-250 font-bold shadow-inner flex items-center text-sm">
                <FormattedMathText text="\(p_1 \cdot V_1 = p_2 \cdot V_2\)" />
              </div>
            </div>
            <p className="text-[11px] text-slate-600 font-extrabold mt-1 flex flex-wrap items-center gap-1.5">
              Trong đó: 
              <span className="font-bold text-slate-950"><FormattedMathText text="\(p_1\)" /></span>, 
              <span className="font-bold text-slate-950"><FormattedMathText text="\(V_1\)" /></span> là áp suất và thể tích khí ở trạng thái 1; 
              <span className="font-bold text-slate-950"><FormattedMathText text="\(p_2\)" /></span>, 
              <span className="font-bold text-slate-950"><FormattedMathText text="\(V_2\)" /></span> là áp suất và thể tích khí ở trạng thái 2 sau biến đổi đẳng nhiệt.
            </p>
          </div>

          {/* INTERACTIVE TEXTBOOK EXPERIMENT SANDBOX (Refactored to beautiful light 3D scheme) */}
          <div className="bg-gradient-to-b from-slate-50 to-slate-100/40 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <span className="text-[10px] bg-teal-100 text-teal-800 px-2.5 py-1 rounded-full border border-teal-200 font-black uppercase tracking-wider">
                Thí nghiệm bỏ túi
              </span>
              <h4 className="text-sm font-black text-slate-950 mt-2 flex items-center gap-1.5">
                <Wind className="h-4.5 w-4.5 text-teal-600 animate-pulse" />
                Khảo sát đẳng nhiệt trực quan bằng Ống xilanh ảo
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 font-bold">
                Kéo pít-tông để thay đổi thể tích chứa của xilanh. Hãy quan sát cột áp suất biến thiên tương ứng để chứng minh hằng số định luật Boyle!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Syringe visual representation in bright light card */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-4 flex flex-col justify-between border-2 border-slate-200 min-h-[220px] shadow-inner">
                <div className="text-center border-b border-slate-100 pb-2">
                  <span className="text-[10px] text-slate-500 font-black block uppercase tracking-wide">Trạng thái khối khí đẳng nhiệt</span>
                  <div className="flex justify-around mt-3">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-bold">Thể tích (V)</span>
                      <strong className="text-lg font-mono font-black text-teal-600">{volume} mL</strong>
                    </div>
                    <div className="border-l-2 border-slate-100 h-8" />
                    <div>
                      <span className="block text-[10px] text-slate-500 font-bold">Áp suất (p)</span>
                      <strong className="text-lg font-mono font-black text-cyan-600">{pressure} kPa</strong>
                    </div>
                  </div>
                </div>

                {/* SVG Syringe illustration (bright contrast style) */}
                <div className="relative w-full h-24 my-3 flex items-center justify-center bg-slate-50/50 rounded-xl border border-slate-100">
                  <svg className="w-56 h-12 overflow-visible" viewBox="0 0 240 50">
                    {/* Syringe Outer Case */}
                    <rect x="20" y="5" width="160" height="40" rx="3" fill="none" stroke="#475569" strokeWidth="2.5" />
                    <line x1="180" y1="20" x2="190" y2="20" stroke="#475569" strokeWidth="4" />
                    <line x1="180" y1="30" x2="190" y2="30" stroke="#475569" strokeWidth="4" />
                    {/* Nozzle outlet */}
                    <rect x="190" y="21" width="15" height="8" fill="#475569" />
                    <circle cx="205" cy="25" r="3" fill="#ef4444" />

                    {/* Vach chia the tich */}
                    {Array.from({ length: 9 }).map((_, i) => {
                      const xPos = 20 + i * 18;
                      return (
                        <g key={i}>
                          <line x1={xPos} y1="5" x2={xPos} y2="12" stroke="#64748b" strokeWidth="1.2" />
                          <line x1={xPos} y1="40" x2={xPos} y2="33" stroke="#64748b" strokeWidth="1.2" />
                        </g>
                      );
                    })}

                    {/* Gas Molecules inside (based on volume) */}
                    {Array.from({ length: 40 }).map((_, i) => {
                      const activeWidth = (volume / 30) * 160;
                      const molX = 20 + ((i * 37) % Math.max(5, activeWidth - 10)) + 4;
                      const molY = 5 + ((i * 13) % 30) + 5;
                      return (
                        <circle
                          key={i}
                          cx={molX}
                          cy={molY}
                          r="2.2"
                          className="fill-teal-500"
                        />
                      );
                    })}

                    {/* Piston body */}
                    {(() => {
                      const pX = 20 + (volume / 30) * 160;
                      return (
                        <g>
                          {/* Piston Head */}
                          <rect x={pX - 4} y="6" width="6" height="38" fill="#0ea5e9" rx="1" />
                          {/* Piston Rod */}
                          <rect x="10" y="21" width={pX - 14} height="8" fill="#94a3b8" />
                          {/* Push handle */}
                          <rect x="5" y="10" width="6" height="30" fill="#64748b" rx="1.5" />
                        </g>
                      );
                    })()}
                  </svg>
                  <span className="absolute left-6 text-[9px] text-slate-500 font-mono font-black">0 mL</span>
                  <span className="absolute right-12 text-[9px] text-slate-500 font-mono font-black">30 mL</span>
                </div>

                {/* Slider bar with 3D effect */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-700">
                    <span>Thể tích xi-lanh (V):</span>
                    <span className="font-mono text-teal-600 font-black">{volume} mL</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="1"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Data table in high contrast light card */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-4 border-2 border-slate-200 flex flex-col justify-between min-h-[220px] shadow-sm">
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-150 pb-1.5">
                    <span className="text-[11px] font-black text-slate-800 uppercase tracking-wide flex items-center gap-1">
                      Bảng đo đạc kiểm chứng Boyle
                    </span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={addPointToHistory}
                        className="px-2.5 py-1 bg-teal-500 hover:bg-teal-400 text-slate-950 text-[10px] font-black rounded-lg border-b-2 border-b-teal-700 shadow-sm transition-all active:translate-y-[1px] active:border-b-0 cursor-pointer"
                      >
                        Ghi số liệu
                      </button>
                      <button
                        onClick={clearHistory}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-extrabold rounded-lg border border-slate-200 cursor-pointer"
                      >
                        Xóa sạch
                      </button>
                    </div>
                  </div>

                  <div className="overflow-y-auto max-h-[110px] text-[11px]">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-500 border-b-2 border-slate-100 bg-slate-50/50">
                          <th className="py-1 px-2 font-black">Lần đo</th>
                          <th className="py-1 px-2 font-mono font-black">V (mL)</th>
                          <th className="py-1 px-2 font-mono font-black">p (kPa)</th>
                          <th className="py-1 px-2 font-mono text-teal-700 font-black">p x V (Hằng số k)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-slate-800 font-bold">
                        {history.map((h, i) => (
                          <tr key={h.id} className="hover:bg-slate-50/70">
                            <td className="py-1 px-2 text-slate-400 font-sans">Lần #{i + 1}</td>
                            <td className="py-1 px-2 text-teal-600 font-black">{h.v}</td>
                            <td className="py-1 px-2 text-cyan-600 font-black">{h.p}</td>
                            <td className="py-1 px-2 text-amber-600 font-black">{h.pV}</td>
                          </tr>
                        ))}
                        {history.length === 0 && (
                          <tr>
                            <td colSpan={4} className="py-4 text-center text-slate-400 text-[10px] italic font-sans font-bold">
                              Chưa có điểm dữ liệu ghi nhận. Nhấp nút &quot;Ghi số liệu&quot; ở trên.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-xl border border-emerald-100 text-[10.5px] leading-relaxed text-slate-700 flex items-start gap-2 shadow-inner">
                  <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-black">Nhận xét thực nghiệm đẳng nhiệt:</strong>
                    Khi thay đổi thể tích xi-lanh, tích số <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="\(p \cdot V\)" /></span> luôn xấp xỉ bằng một hằng số bảo toàn (<span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="\(\approx 4000\)" /></span>). Điều này chứng minh định luật Boyle-Mariotte hoạt động tuyệt đối chính xác!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION III: Bản chất vi mô động học phân tử */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-teal-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-teal-400 to-teal-500 rounded-md"></span>
          <h3 className="text-md font-black text-slate-950 uppercase">
            III. Bản chất động học phân tử giải thích định luật Boyle
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-xs leading-relaxed text-slate-950">
          <div className="lg:col-span-8 space-y-4 font-bold text-slate-800">
            <p>
              Tại sao áp suất chất khí lại tăng tương ứng khi thể tích bị nén đẳng nhiệt? Thuyết động học phân tử chất khí cung cấp một lời giải thích khoa học hoàn mỹ thông qua động lực học vi mô của các phân tử:
            </p>
            <ul className="space-y-3 bg-gradient-to-b from-slate-50 to-slate-100/40 border-2 border-slate-200 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm text-slate-800">
              <li className="flex gap-2.5 items-start">
                <span className="text-teal-600 font-black text-sm">1.</span>
                <div className="flex flex-wrap items-center gap-1">
                  <strong className="text-slate-950 block w-full">Nhiệt độ không đổi:</strong> Do nhiệt độ tuyệt đối <FormattedMathText text="\(T\)" /> của khí được giữ không đổi, theo thuyết động học phân tử, động năng trung bình và <strong className="text-teal-950">tốc độ trung bình</strong> chuyển động hỗn loạn của các phân tử khí hoàn toàn không đổi.
                </div>
              </li>
              <li className="flex gap-2.5 items-start border-t border-slate-100 pt-2">
                <span className="text-teal-600 font-black text-sm">2.</span>
                <div className="flex flex-wrap items-center gap-1">
                  <strong className="text-slate-950 block w-full">Mật độ phân tử tăng tỉ lệ nghịch:</strong> Khi thể tích bình chứa giảm đi (ví dụ giảm một nửa), không gian cho phân tử di chuyển bị thu hẹp một nửa. Do đó, <strong className="text-teal-950">mật độ phân tử khí</strong> (số phân tử khí trên một đơn vị thể tích) sẽ tăng lên gấp đôi.
                </div>
              </li>
              <li className="flex gap-2.5 items-start border-t border-slate-100 pt-2">
                <span className="text-teal-600 font-black text-sm">3.</span>
                <div>
                  <strong className="text-slate-950 block">Tần suất va chạm thành bình tăng tương ứng:</strong> Mật độ phân tử tăng gấp đôi đồng nghĩa với việc trong mỗi giây, số lượng các phân tử va chạm dồn dập vào một đơn vị diện tích thành bình chứa sẽ tăng lên chính xác gấp đôi.
                </div>
              </li>
              <li className="flex gap-2.5 items-start border-t border-slate-100 pt-2">
                <span className="text-teal-600 font-black text-sm">4.</span>
                <div className="flex flex-wrap items-center gap-1">
                  <strong className="text-slate-950 block w-full">Áp suất vĩ mô tăng gấp đôi:</strong> Vì lực tác động trung bình của mỗi va chạm không đổi (do tốc độ trung bình phân tử không đổi), việc số va chạm tăng gấp đôi trên mỗi đơn vị diện tích thành bình làm tổng hợp lực trung bình của chất khí tác dụng lên thành bình tăng gấp hai, dẫn đến áp suất khí vĩ mô <FormattedMathText text="\(p\)" /> tăng gấp đôi.
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-slate-200 border-b-[6px] border-b-slate-350 p-5 rounded-3xl space-y-4 shadow-sm">
            <h4 className="text-xs font-black text-teal-950 uppercase flex items-center gap-1.5 border-b border-teal-150 pb-2">
              <Brain className="h-4 w-4 text-teal-600 animate-pulse" />
              Sơ đồ tư duy vi mô đẳng nhiệt
            </h4>
            <div className="space-y-1.5 text-[11px] text-slate-800 font-bold">
              <div className="bg-white px-3.5 py-2.5 rounded-2xl border-2 border-teal-200 shadow-sm flex items-center justify-between gap-1.5">
                <span>Nhiệt độ <FormattedMathText text="\(T\)" /> không đổi</span>
                <span className="text-teal-700 font-black flex items-center gap-1">
                  <FormattedMathText text="\(\Rightarrow \bar{v} = \text{const}\)" />
                </span>
              </div>
              <div className="text-center text-teal-500 font-bold text-sm">⬇</div>
              <div className="bg-white px-3.5 py-2.5 rounded-2xl border-2 border-teal-200 shadow-sm flex items-center justify-between gap-1.5">
                <span>Thể tích <FormattedMathText text="\(V\)" /> giảm <FormattedMathText text="\(n\)" /> lần</span>
                <span className="text-teal-700 font-black flex items-center gap-1">
                  <FormattedMathText text="\(\Rightarrow\)" /> Mật độ tăng <FormattedMathText text="\(n\)" /> lần
                </span>
              </div>
              <div className="text-center text-teal-500 font-bold text-sm">⬇</div>
              <div className="bg-white px-3.5 py-2.5 rounded-2xl border-2 border-teal-200 shadow-sm flex items-center justify-between gap-1.5">
                <span>Số va chạm / s / <FormattedMathText text="\(\text{m}^2\)" /></span>
                <span className="text-teal-700 font-black flex items-center gap-1">
                  <FormattedMathText text="\(\Rightarrow\)" /> Tăng <FormattedMathText text="\(n\)" /> lần
                </span>
              </div>
              <div className="text-center text-emerald-500 font-bold text-sm">⬇</div>
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3.5 py-2.5 rounded-2xl border border-emerald-600 shadow-sm flex items-center justify-between gap-1.5">
                <span>Áp suất vĩ mô (<FormattedMathText text="\(p\)" />)</span>
                <span className="font-black flex items-center gap-1">
                  <FormattedMathText text="\(\Rightarrow\)" /> TĂNG <FormattedMathText text="\(n\)" /> LẦN
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION IV: Đồ thị quá trình đẳng nhiệt (Isothermal Curves) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-teal-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-teal-400 to-teal-500 rounded-md"></span>
          <h3 className="text-md font-black text-slate-950 uppercase">
            IV. Đường đẳng nhiệt trên các hệ tọa độ trạng thái
          </h3>
        </div>

        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p className="font-bold text-slate-800">
            Tùy theo hệ tọa độ trạng thái được chọn, đồ thị biểu diễn quá trình biến đổi đẳng nhiệt của một lượng khí xác định sẽ có các hình dáng đặc trưng riêng. Học sinh cần ghi nhớ ba dạng đồ thị cơ bản này để nhận biết chính xác trong kỳ thi tốt nghiệp:
          </p>

          <div className="bg-gradient-to-b from-slate-50 to-white border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl overflow-hidden shadow-sm">
            {/* Interactive Graph Rails */}
            <div className="flex border-b-2 border-slate-200 bg-slate-50/50">
              <button
                onClick={() => setActiveGraphTab("pV")}
                className={`flex-1 py-3 text-[11px] font-black tracking-wider transition-all text-center border-b-2 cursor-pointer ${
                  activeGraphTab === "pV"
                    ? "border-teal-500 text-teal-900 bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                }`}
              >
                HỆ TỌA ĐỘ (p - V)
              </button>
              <button
                onClick={() => setActiveGraphTab("pInverseV")}
                className={`flex-1 py-3 text-[11px] font-black tracking-wider transition-all text-center border-b-2 cursor-pointer ${
                  activeGraphTab === "pInverseV"
                    ? "border-teal-500 text-teal-900 bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                }`}
              >
                HỆ TỌA ĐỘ (p - 1/V)
              </button>
              <button
                onClick={() => setActiveGraphTab("pT")}
                className={`flex-1 py-3 text-[11px] font-black tracking-wider transition-all text-center border-b-2 cursor-pointer ${
                  activeGraphTab === "pT"
                    ? "border-teal-500 text-teal-900 bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                }`}
              >
                HỆ TỌA ĐỘ (p - T)
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-white">
              {/* Graphic visualizer using crisp, highly professional SVG on a clean white card */}
              <div className="md:col-span-6 bg-white p-4 rounded-2xl border-2 border-slate-200 flex justify-center items-center min-h-[220px] shadow-inner">
                {activeGraphTab === "pV" && (
                  <svg className="w-64 h-52 overflow-visible" viewBox="0 0 160 140">
                    {/* Gridlines */}
                    <line x1="20" y1="20" x2="150" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="20" y1="50" x2="150" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="20" y1="80" x2="150" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="20" y1="110" x2="150" y2="110" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="50" y1="120" x2="50" y2="10" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="85" y1="120" x2="85" y2="10" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="120" y1="120" x2="120" y2="10" stroke="#f1f5f9" strokeWidth="1" />

                    {/* Coordinate Axes */}
                    <line x1="20" y1="120" x2="155" y2="120" stroke="#475569" strokeWidth="1.8" />
                    <line x1="20" y1="120" x2="20" y2="10" stroke="#475569" strokeWidth="1.8" />
                    {/* Arrows */}
                    <polygon points="155,118 160,120 155,122" fill="#475569" />
                    <polygon points="18,10 20,5 22,10" fill="#475569" />
                    {/* Axis labels */}
                    <text x="152" y="132" fill="#334155" fontSize="8" className="font-black">V</text>
                    <text x="10" y="12" fill="#334155" fontSize="8" className="font-black">p</text>
                    <text x="12" y="128" fill="#475569" fontSize="8" className="font-bold">O</text>

                    {/* Isothermal Hyperbol Curves (T2 > T1) */}
                    {/* T1 (Lower) */}
                    <path
                      d="M 28,25 Q 40,85 125,112"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="3"
                    />
                    <text x="130" y="112" fill="#0284c7" fontSize="8" className="font-black">T₁</text>

                    {/* T2 (Upper, T2 > T1) */}
                    <path
                      d="M 41,25 Q 54,76 136,100"
                      fill="none"
                      stroke="#ea580c"
                      strokeWidth="3"
                    />
                    <text x="142" y="100" fill="#ea580c" fontSize="8" className="font-black">T₂ (T₂ &gt; T₁)</text>
                  </svg>
                )}

                {activeGraphTab === "pInverseV" && (
                  <svg className="w-64 h-52 overflow-visible" viewBox="0 0 160 140">
                    {/* Coordinate Axes */}
                    <line x1="20" y1="120" x2="155" y2="120" stroke="#475569" strokeWidth="1.8" />
                    <line x1="20" y1="120" x2="20" y2="10" stroke="#475569" strokeWidth="1.8" />
                    {/* Arrows */}
                    <polygon points="155,118 160,120 155,122" fill="#475569" />
                    <polygon points="18,10 20,5 22,10" fill="#475569" />
                    {/* Axis labels */}
                    <text x="145" y="132" fill="#334155" fontSize="8" className="font-black">1/V</text>
                    <text x="10" y="12" fill="#334155" fontSize="8" className="font-black">p</text>
                    <text x="12" y="128" fill="#475569" fontSize="8" className="font-bold">O</text>

                    {/* Isothermal Linear Curves (T2 > T1) */}
                    {/* T1 */}
                    <line x1="20" y1="120" x2="135" y2="55" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                    <text x="138" y="58" fill="#0284c7" fontSize="8" className="font-black">T₁</text>

                    {/* T2 */}
                    <line x1="20" y1="120" x2="135" y2="30" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
                    <text x="138" y="33" fill="#ea580c" fontSize="8" className="font-black">T₂ (T₂ &gt; T₁)</text>
                  </svg>
                )}

                {activeGraphTab === "pT" && (
                  <svg className="w-64 h-52 overflow-visible" viewBox="0 0 160 140">
                    {/* Coordinate Axes */}
                    <line x1="20" y1="120" x2="155" y2="120" stroke="#475569" strokeWidth="1.8" />
                    <line x1="20" y1="120" x2="20" y2="10" stroke="#475569" strokeWidth="1.8" />
                    {/* Arrows */}
                    <polygon points="155,118 160,120 155,122" fill="#475569" />
                    <polygon points="18,10 20,5 22,10" fill="#475569" />
                    {/* Axis labels */}
                    <text x="152" y="132" fill="#334155" fontSize="8" className="font-black">T (K)</text>
                    <text x="10" y="12" fill="#334155" fontSize="8" className="font-black">p</text>
                    <text x="12" y="128" fill="#475569" fontSize="8" className="font-bold">O</text>

                    {/* Isothermal Vertical Curves (T2 > T1) */}
                    {/* T1 (Left) */}
                    <line x1="60" y1="120" x2="60" y2="20" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                    <text x="56" y="15" fill="#0284c7" fontSize="8" className="font-black">T₁</text>

                    {/* T2 (Right) */}
                    <line x1="110" y1="120" x2="110" y2="20" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
                    <text x="106" y="15" fill="#ea580c" fontSize="8" className="font-black">T₂</text>
                  </svg>
                )}
              </div>

              {/* Graphic explanation text details */}
              <div className="md:col-span-6 space-y-3 text-slate-800">
                {activeGraphTab === "pV" && (
                  <>
                    <h4 className="font-black text-teal-950 text-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                      Hệ tọa độ áp suất - thể tích (p-V)
                    </h4>
                    <p className="text-slate-700 leading-normal font-medium">
                      Trong hệ tọa độ Clapeyron (<FormattedMathText text="\((p, V)\)" />), đường biểu diễn quá trình đẳng nhiệt là một <strong className="text-slate-900">nhánh đường hyperbol</strong> dốc xuống từ trái qua phải.
                    </p>
                    <div className="bg-gradient-to-b from-teal-50 to-teal-100/30 border-2 border-teal-200 p-4 rounded-2xl space-y-2 text-[11px] font-bold">
                      <p className="leading-relaxed">
                        🔹 <strong className="text-slate-900">Tính chất cốt lõi:</strong> Thể tích <FormattedMathText text="\(V\)" /> càng nhỏ thì áp suất <FormattedMathText text="\(p\)" /> càng lớn và ngược lại.
                      </p>
                      <p className="leading-relaxed">
                        🔹 <strong className="text-slate-900">So sánh hai nhiệt độ:</strong> Đường đẳng nhiệt nằm <strong className="text-slate-900">phía trên / xa gốc tọa độ hơn</strong> ứng với nhiệt độ tuyệt đối cao hơn (<span className="text-amber-800 font-black inline-flex items-center align-middle"><FormattedMathText text="\(T_2 > T_1\)" /></span>).
                      </p>
                    </div>
                  </>
                )}

                {activeGraphTab === "pInverseV" && (
                  <>
                    <h4 className="font-black text-teal-950 text-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                      Hệ tọa độ (p - 1/V)
                    </h4>
                    <p className="text-slate-700 leading-normal font-medium">
                      Để dễ nhận xét thực nghiệm, ta dùng hệ tọa độ áp suất - nghịch đảo thể tích (<FormattedMathText text="\(\left(p, \frac{1}{V}\right)\)" />). Khi đó đường đẳng nhiệt chuyển thành một <strong className="text-slate-900">đoạn thẳng kéo dài đi qua gốc tọa độ O</strong>.
                    </p>
                    <div className="bg-gradient-to-b from-teal-50 to-teal-100/30 border-2 border-teal-200 p-4 rounded-2xl space-y-2 text-[11px] font-bold">
                      <p className="leading-relaxed flex items-center gap-1.5 flex-wrap">
                        🔹 <strong className="text-slate-900">Ý nghĩa toán học:</strong> Sự thẳng hàng của các điểm đo trên tọa độ này là bằng chứng vĩ mô tuyệt đối chứng tỏ <FormattedMathText text="\(p\)" /> tỉ lệ thuận với <FormattedMathText text="\(\frac{1}{V}\)" />.
                      </p>
                      <p className="leading-relaxed">
                        🔹 <strong className="text-slate-900">Độ dốc của đồ thị:</strong> Đường nào có độ dốc cao hơn, tạo góc lớn hơn so với trục hoành ứng với nhiệt độ tuyệt đối lớn hơn.
                      </p>
                    </div>
                  </>
                )}

                {activeGraphTab === "pT" && (
                  <>
                    <h4 className="font-black text-teal-950 text-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                      Hệ tọa độ áp suất - nhiệt độ (p - T)
                    </h4>
                    <p className="text-slate-700 leading-normal font-medium">
                      Trong hệ tọa độ (<FormattedMathText text="\((p, T)\)" />), vì nhiệt độ tuyệt đối <FormattedMathText text="\(T\)" /> của khí được cố định tuyệt đối (<span className="text-slate-900 font-bold inline-flex items-center align-middle"><FormattedMathText text="\(T = \text{const}\)" /></span>), nên đường đẳng nhiệt là một <strong className="text-slate-900">đường thẳng đứng vuông góc với trục hoành T</strong>.
                    </p>
                    <div className="bg-gradient-to-b from-teal-50 to-teal-100/30 border-2 border-teal-200 p-4 rounded-2xl space-y-2 text-[11px] font-bold">
                      <p className="leading-relaxed">
                        🔹 <strong className="text-slate-900">Đặc điểm nhận biết:</strong> Đường thẳng đứng thể hiện thông số <FormattedMathText text="\(T\)" /> không đổi khi áp suất biến động.
                      </p>
                      <p className="leading-relaxed">
                        🔹 <strong className="text-slate-900">Chiều biến đổi:</strong> Quá trình nén khí đẳng nhiệt sẽ đưa trạng thái khối khí đi tịnh tiến thẳng lên trên dọc theo đường thẳng đứng này (áp suất tăng).
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-b from-teal-50 to-teal-100/35 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm text-slate-950 space-y-2.5">
          <div className="flex items-center gap-1.5 text-teal-900 font-black text-xs border-b border-teal-100 pb-1.5">
            <CheckCircle2 className="h-4.5 w-4.5 text-teal-600 shrink-0" />
            <span>KẾT LUẬN CỐT LÕI (EM ĐÃ HỌC)</span>
          </div>
          <ul className="list-disc pl-4 space-y-2 text-slate-800 leading-relaxed text-[11px] font-bold">
            <li>Quá trình biến đổi trạng thái trong đó nhiệt độ tuyệt đối được giữ cố định không đổi gọi là quá trình đẳng nhiệt.</li>
            <li className="flex items-center gap-1 flex-wrap">Định luật Boyle: Trong quá trình đẳng nhiệt của một lượng khí xác định, áp suất <FormattedMathText text="\(p\)" /> tỉ lệ nghịch với thể tích <FormattedMathText text="\(V\)" /> (<FormattedMathText text="\(p \cdot V = \text{const}\)" />).</li>
            <li className="flex items-center gap-1 flex-wrap">Đường đẳng nhiệt trong hệ tọa độ <FormattedMathText text="\((p, V)\)" /> là một nhánh của đường hyperbol. Ở hệ tọa độ <FormattedMathText text="\((p, 1/V)\)" /> là đường thẳng đi qua gốc tọa độ.</li>
            <li className="flex items-center gap-1 flex-wrap">Bản chất vi mô: Khi nén khí đẳng nhiệt, mật độ phân tử khí tăng tỉ lệ nghịch với <FormattedMathText text="\(V\)" />, làm số lượng va chạm dồn dập lên một diện tích thành bình trong 1 giây tăng tương ứng, gây tăng áp suất vĩ mô.</li>
          </ul>
        </div>

        <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/35 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm text-slate-950 space-y-2.5">
          <div className="flex items-center gap-1.5 text-emerald-900 font-black text-xs border-b border-emerald-100 pb-1.5">
            <Sparkles className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
            <span>ĐÁNH GIÁ NĂNG LỰC (EM CÓ THỂ)</span>
          </div>
          <ul className="list-disc pl-4 space-y-2 text-slate-800 leading-relaxed text-[11px] font-bold">
            <li>Sử dụng thành thạo mô hình động học phân tử để lý giải các tính chất của quá trình đẳng nhiệt trong thực tiễn và đời sống kỹ thuật.</li>
            <li>Xác định và tính toán chính xác sự biến thiên áp suất và thể tích khí bằng phương trình Boyle khi bơm xilanh, nén khí hoặc khảo sát khí thiên nhiên.</li>
            <li>Phân biệt, vẽ và nhận dạng chính xác ba loại đường đẳng nhiệt trên ba hệ tọa độ trạng thái (p - V), (p - 1/V), (p - T) trong các đề thi THPT Quốc gia.</li>
            <li>Giải quyết trọn vẹn các bài tập vật lý ứng dụng thực tiễn về bình thở khí oxygen của thợ lặn dưới biển sâu hoặc kỹ thuật bóng thám không.</li>
          </ul>
        </div>
      </div>

      {/* HIGHLIGHT BOX: EXAM FOCUS */}
      <div className="bg-gradient-to-b from-purple-50 to-indigo-50/40 border-2 border-purple-250 border-b-[6px] border-b-purple-350 rounded-3xl p-5 text-slate-950 shadow-sm space-y-3.5">
        <div className="flex items-center gap-2 border-b-2 border-purple-200 pb-2">
          <BookOpen className="h-5 w-5 text-purple-700 shrink-0" />
          <span className="text-xs font-black text-purple-800 uppercase tracking-wider">TÓM TẮT TRỌNG TÂM - ÔN THI TỐT NGHIỆP THPT BÀI 9</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-900 leading-relaxed font-bold">
          <div className="bg-white border-2 border-purple-200/50 p-3.5 rounded-2xl shadow-sm text-slate-950 space-y-1">
            <span className="font-black text-purple-900 block mb-1">1. ĐẲNG NHIỆT VÀ ĐỊNH LUẬT BOYLE</span>
            Nhớ kỹ điều kiện áp dụng: Nhiệt độ tuyệt đối <FormattedMathText text="\(T\)" /> không đổi và lượng khí xác định (khối lượng <FormattedMathText text="\(m\)" /> không đổi). Tích <span className="inline-flex items-center align-middle bg-purple-50 text-purple-800 border border-purple-100 px-1 rounded font-bold"><FormattedMathText text="\(p \cdot V = \text{const}\)" /></span>.
          </div>
          <div className="bg-white border-2 border-purple-200/50 p-3.5 rounded-2xl shadow-sm text-slate-950 space-y-1">
            <span className="font-black text-purple-900 block mb-1">2. NHẬN DIỆN ĐƯỜNG ĐẲNG NHIỆT</span>
            Tránh nhầm lẫn: Trên tọa độ <FormattedMathText text="\((p, V)\)" /> là hyperbol dốc xuống. Trên tọa độ tuyến tính <FormattedMathText text="\((p, 1/V)\)" /> là đường thẳng đi qua gốc O. Trên tọa độ <FormattedMathText text="\((p, T)\)" /> là đường thẳng đứng song song trục tung <FormattedMathText text="\(p\)" />.
          </div>
          <div className="bg-white border-2 border-purple-200/50 p-3.5 rounded-2xl shadow-sm text-slate-950 space-y-1">
            <span className="font-black text-purple-900 block mb-1">3. LƯU Ý BÀI TẬP THỰC TẾ BÌNH KHÍ</span>
            Khi khí thoát ra từ bình nén khí, phần khí luôn đọng lại trong bình có thể tích bằng thể tích vỏ bình <FormattedMathText text="\(V\)" /> và áp suất tối thiểu bằng áp suất môi trường xung quanh. Lượng khí hữu ích sử dụng được tính dựa trên độ chênh áp.
          </div>
        </div>
      </div>
    </div>
  );
}
