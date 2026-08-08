import { useState } from "react";
import { BookOpen, Sparkles, Brain, CheckCircle2, RefreshCw, Activity, ArrowRight, Layers, Info, Flame, Thermometer, Wind } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson10Textbook() {
  const [activeGraphTab, setActiveGraphTab] = useState<"VT" | "Vt" | "pT">("VT");
  
  // Isobaric Syringe Sandbox states
  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(27); // in °C
  const tempKelvin = temperatureCelsius + 273; // T(K)
  // According to Charles's Law: V = k * T. Let's define k = 0.1 mL/K
  // So V = 0.1 * T. At 27°C (300K), V = 30 mL. At 0°C (273K), V = 27.3 mL.
  const volume = parseFloat((0.1 * tempKelvin).toFixed(1)); // in mL
  
  // History table in sandbox (pre-populated with SGK values or similar)
  const [history, setHistory] = useState<{ id: number; t: number; T: number; V: number; VT: number }[]>([
    { id: 1, t: 24.5, T: 297.5, V: 30.0, VT: 0.1008 },
    { id: 2, t: 0.5, T: 273.5, V: 27.0, VT: 0.0987 },
    { id: 3, t: 41.5, T: 314.5, V: 33.0, VT: 0.1049 }
  ]);

  const addPointToHistory = () => {
    if (history.some(h => h.t === temperatureCelsius)) return;
    const newPoint = {
      id: Date.now(),
      t: temperatureCelsius,
      T: tempKelvin,
      V: volume,
      VT: parseFloat((volume / tempKelvin).toFixed(4))
    };
    setHistory([...history, newPoint].sort((a, b) => a.T - b.T));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-8 text-slate-800 animate-fade-in">
      {/* Title Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden border border-blue-800/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />
        <div className="relative z-10 space-y-2">
          <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-400/20 font-bold tracking-widest uppercase">
            CHƯƠNG II: KHÍ LÍ TƯỞNG
          </span>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">
            Bài 10: Định luật Charles
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Khảo sát định luật thực nghiệm thứ hai của chất khí: Hành vi đẳng áp của một khối lượng khí xác định, sự phụ thuộc tuyến tính của thể tích vào nhiệt độ tuyệt đối dưới lăng kính thực nghiệm và đời sống.
          </p>
        </div>
      </div>

      {/* QUESTION INTRO */}
      <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 leading-relaxed">
          <strong className="text-amber-950 block font-bold mb-1">❓ Câu hỏi định hướng đầu bài:</strong>
          <em>&quot;Khi giữ nguyên áp suất của một khối lượng khí xác định thì thể tích của khí phụ thuộc như thế nào vào nhiệt độ của nó?&quot;</em>
        </div>
      </div>

      {/* SECTION I: Đẳng quá trình & Quá trình đẳng áp */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-blue-200 pb-2">
          <div className="h-6 w-1.5 bg-blue-500 rounded-full" />
          <h3 className="text-md font-extrabold text-slate-900 uppercase">
            I. Định luật Charles - Quá trình đẳng áp
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-3 text-xs leading-relaxed text-slate-700 font-normal">
            <p className="font-semibold text-slate-900">
              1. Quá trình đẳng áp
            </p>
            <p>
              Như đã học, trạng thái khí được mô tả qua các thông số: áp suất <span className="inline-flex items-center align-middle font-bold text-slate-900 mx-0.5"><FormattedMathText text="p" /></span>, thể tích <span className="inline-flex items-center align-middle font-bold text-slate-900 mx-0.5"><FormattedMathText text="V" /></span> và nhiệt độ tuyệt đối <span className="inline-flex items-center align-middle font-bold text-slate-900 mx-0.5"><FormattedMathText text="T" /></span>.
            </p>
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/60 space-y-2">
              <span className="font-extrabold text-blue-900 block text-[13px] uppercase">📌 Khái niệm cốt lõi</span>
              <p className="text-slate-800 leading-relaxed">
                <strong>Quá trình đẳng áp:</strong> Quá trình biến đổi trạng thái của một khối lượng khí xác định khi giữ áp suất không đổi (<span className="inline-flex items-center align-middle font-bold text-blue-900 mx-0.5"><FormattedMathText text="p = \\text{const}" /></span>) được gọi là quá trình đẳng áp.
              </p>
            </div>
            
            <p className="font-semibold text-slate-900 pt-1">
              2. Nghiên cứu của Charles
            </p>
            <p>
              Năm 1787, nhà vật lí người Pháp là <strong>Charles (Sác-lơ)</strong> đã dùng thực nghiệm để nghiên cứu sự thay đổi thể tích theo nhiệt độ của một khối lượng khí xác định trong quá trình đẳng áp.
            </p>
            <p>
              Làm thí nghiệm với các chất khí khác nhau, ông nhận thấy khi tăng nhiệt độ khí từ <span className="inline-flex items-center align-middle mx-0.5"><FormattedMathText text="t_0 = 0\\text{ }^{\\circ}\\text{C}" /></span> tới <span className="inline-flex items-center align-middle mx-0.5"><FormattedMathText text="t\\text{ }^{\\circ}\\text{C}" /></span>, đồng thời giữ áp suất không đổi thì độ tăng thể tích của một đơn vị thể tích khí khi được tăng thêm 1 đơn vị nhiệt độ của các chất khí khác nhau đều bằng nhau và bằng <span className="inline-flex items-center align-middle font-bold text-blue-600 mx-0.5"><FormattedMathText text="\\alpha = \\frac{1}{273}\\text{ K}^{-1}" /></span> (gọi là <em>hệ số nở đẳng áp</em>):
            </p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-center font-bold text-slate-800">
              <div className="text-center py-1">
                <span className="text-[13px]"><FormattedMathText text="\\frac{V - V_0}{V_0 \\cdot \\Delta t} = \\frac{1}{273}" /></span>
                <span className="block text-[10px] text-slate-500 mt-0.5 font-normal">(Hệ thức 10.1)</span>
              </div>
            </div>
            <p>
              Trong đó: <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="V_0" /></span> là thể tích khí ở <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="0\\text{ }^{\\circ}\\text{C}" /></span>, <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="V" /></span> là thể tích khí ở <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="t\\text{ }^{\\circ}\\text{C}" /></span>, và <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="\\Delta t = t - t_0 = t" /></span>.
            </p>
            <p>
              Nếu kí hiệu <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="\\alpha = \\frac{1}{273}" /></span> thì: <span className="inline-flex items-center align-middle font-bold text-slate-900 mx-0.5"><FormattedMathText text="V = V_0 \\cdot (1 + \\alpha \\cdot t)" /></span> (Hệ thức 10.2). Đồ thị biểu diễn thể tích <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="V" /></span> theo nhiệt độ Celsius <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="t" /></span> là đường thẳng cắt trục tung tại <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="V_0" /></span> và cắt trục hoành tại <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="-273\\text{ }^{\\circ}\\text{C}" /></span>.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-100 rounded-3xl p-4 space-y-4">
            <div className="space-y-1">
              <h4 className="text-[12px] font-extrabold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-blue-600" />
                Mối quan hệ V - T thực tế
              </h4>
              <p className="text-[10px] text-slate-500">
                Chứng minh khi đổi sang nhiệt độ tuyệt đối T (K) ta thu được một tỉ lệ thuận hoàn hảo:
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-4 border border-blue-100/50 space-y-3 text-xs">
              <div className="space-y-1.5">
                <span className="block font-bold text-slate-700">1. Từ Celsius sang Kelvin:</span>
                <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 text-center flex items-center justify-center font-bold">
                  <FormattedMathText text="T = t + 273 \\Rightarrow t = T - 273" />
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="block font-bold text-slate-700">2. Thay vào phương trình thể tích:</span>
                <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 text-slate-800 space-y-1.5 flex flex-col items-center font-bold">
                  <div><FormattedMathText text="V = V_0 \\cdot \\left(1 + \\frac{t}{273}\\right)" /></div>
                  <div><FormattedMathText text="V = V_0 \\cdot \\left(1 + \\frac{T - 273}{273}\\right)" /></div>
                  <div className="text-blue-700"><FormattedMathText text="V = V_0 \\cdot \\frac{T}{273}" /></div>
                </div>
              </div>

              <div className="space-y-1 bg-blue-50 border border-blue-100 rounded-xl p-2 text-[11px] text-slate-600 leading-relaxed">
                <strong className="text-blue-900 block">💡 Nhận xét cực kì quan trọng:</strong>
                Vì <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="V_0" /></span> và <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="273" /></span> là các hằng số cố định, nên thể tích <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="V" /></span> tỉ lệ thuận hoàn toàn với nhiệt độ tuyệt đối <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="T" /></span>!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION II: Định luật Charles + Bàn thực nghiệm tương tác */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-blue-200 pb-2">
          <div className="h-6 w-1.5 bg-blue-500 rounded-full" />
          <h3 className="text-md font-extrabold text-slate-900 uppercase">
            II. Nội dung định luật Charles
          </h3>
        </div>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-3xl space-y-2">
            <span className="text-indigo-900 font-black text-[14px] block uppercase">📝 PHÁT BIỂU ĐỊNH LUẬT CHARLES (SÁC-LƠ)</span>
            <p className="text-slate-800 font-medium text-[12.5px] leading-relaxed">
              &quot;Khi áp suất của một khối lượng khí xác định giữ không đổi thì thể tích của khí tỉ lệ thuận với nhiệt độ tuyệt đối của nó.&quot;
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="bg-white px-4 py-2 rounded-xl border border-indigo-100 shadow-inner text-indigo-800 font-bold flex items-center">
                <FormattedMathText text="V \\propto T \\Rightarrow \\frac{V}{T} = \\text{const}" />
              </div>
              <div className="bg-white px-4 py-2 rounded-xl border border-indigo-100 shadow-inner text-indigo-800 font-bold flex items-center">
                <FormattedMathText text="\\frac{V_1}{T_1} = \\frac{V_2}{T_2}" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Trong đó: <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="V_1" /></span>, <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="T_1" /></span> là thể tích và nhiệt độ tuyệt đối ở trạng thái 1; <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="V_2" /></span>, <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="T_2" /></span> ở trạng thái 2 (với <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="T" /></span> đo bằng Kelvin).
            </p>
          </div>

          {/* INTERACTIVE TEXTBOOK EXPERIMENT SANDBOX */}
          <div className="bg-slate-900 text-slate-200 rounded-3xl p-5 shadow-xl border border-slate-800 space-y-4">
            <div>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-full border border-indigo-500/30 font-bold uppercase tracking-wider">
                Thí nghiệm bỏ túi ảo
              </span>
              <h4 className="text-sm font-bold text-white mt-1.5 flex items-center gap-1.5">
                <Thermometer className="h-4.5 w-4.5 text-indigo-400" />
                Khảo sát đẳng áp bằng Xilanh đun nhiệt lượng
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Thay đổi nhiệt độ của khối khí trong xilanh bằng thanh trượt. Khi nhiệt độ tăng, khí giãn nở nhiệt đẩy pit-tông lên để duy trì áp suất không đổi. Hãy ghi chép dữ liệu để kiểm chứng tỷ số V/T!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Syringe visual representation */}
              <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-4 flex flex-col justify-between border border-slate-800 min-h-[220px]">
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wide">Trạng thái khối khí</span>
                  <div className="flex justify-around mt-3">
                    <div>
                      <span className="block text-[10px] text-slate-400">Nhiệt độ (T)</span>
                      <strong className="text-lg font-mono font-black text-amber-400">{tempKelvin} K</strong>
                      <span className="block text-[10px] text-slate-500">({temperatureCelsius} °C)</span>
                    </div>
                    <div className="border-l border-slate-800 h-10" />
                    <div>
                      <span className="block text-[10px] text-slate-400">Thể tích (V)</span>
                      <strong className="text-lg font-mono font-black text-blue-400">{volume} mL</strong>
                      <span className="block text-[10px] text-slate-500">({(volume/tempKelvin).toFixed(4)} mL/K)</span>
                    </div>
                  </div>
                </div>

                {/* SVG Syringe illustration (Vertical) */}
                <div className="relative w-full h-32 my-2 flex items-center justify-center">
                  {/* Heat source visual indicator */}
                  <div className="absolute bottom-0 w-24 h-8 bg-gradient-to-t from-orange-600/30 to-transparent blur-md rounded-full animate-pulse" />
                  
                  <svg className="w-24 h-32 overflow-visible" viewBox="0 0 100 120">
                    {/* Fire flame at the bottom */}
                    {temperatureCelsius > 30 && (
                      <path 
                        d="M35,115 C35,105 45,100 50,95 C55,100 65,105 65,115 C65,120 35,120 35,115 Z" 
                        fill="#f97316" 
                        className="animate-bounce" 
                        style={{ transformOrigin: 'center bottom', animationDuration: '1.5s' }}
                      />
                    )}
                    {temperatureCelsius > 60 && (
                      <path 
                        d="M42,112 C42,106 48,103 50,100 C52,103 58,106 58,112 Z" 
                        fill="#ef4444" 
                        className="animate-pulse" 
                      />
                    )}

                    {/* Outer Case */}
                    <rect x="25" y="10" width="50" height="90" rx="2" fill="none" stroke="#64748b" strokeWidth="2.5" />
                    {/* Bottom Closed nozzle */}
                    <rect x="45" y="100" width="10" height="8" fill="#64748b" />
                    
                    {/* Dynamic Piston (Its y-coordinate depends on Volume) */}
                    {/* Volume ranges 27.3 mL (0°C) to 37.3 mL (100°C). Let's map volume to Piston Y position */}
                    {/* Lower Y means piston is higher up (more volume) */}
                    {/* Volume 27.3 mL -> Y = 50. Volume 37.3 mL -> Y = 20 */}
                    {(() => {
                      const pistonY = 50 - ((volume - 27.3) * 3);
                      return (
                        <g>
                          {/* Gas interior */}
                          <rect x="26.5" y={pistonY + 3} width="47" height={97 - pistonY} fill="#3b82f6" fillOpacity="0.15" />
                          
                          {/* Molecules inside */}
                          {Array.from({ length: 25 }).map((_, i) => {
                            const hashX = 28 + (Math.sin(i * 123) * 0.5 + 0.5) * 44;
                            const hashY = (pistonY + 8) + (Math.cos(i * 456) * 0.5 + 0.5) * (85 - pistonY);
                            // molecules velocity vector depends on temperature
                            const speed = 1 + (temperatureCelsius / 30);
                            return (
                              <circle 
                                key={i} 
                                cx={hashX} 
                                cy={hashY} 
                                r="1.5" 
                                fill="#3b82f6" 
                                fillOpacity="0.8"
                                className="animate-pulse"
                              />
                            );
                          })}
                          
                          {/* Piston body */}
                          <rect x="26" y={pistonY} width="48" height="6" fill="#94a3b8" />
                          {/* Piston Shaft */}
                          <rect x="47" y={pistonY - 20} width="6" height="20" fill="#cbd5e1" />
                          <rect x="40" y={pistonY - 22} width="20" height="3" fill="#94a3b8" />
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                {/* Control slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-orange-500" /> Nhiệt độ Celsius:</span>
                    <strong className="text-white font-mono">{temperatureCelsius} °C</strong>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={temperatureCelsius}
                    onChange={(e) => setTemperatureCelsius(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>0 °C (Nước đá)</span>
                    <span>50 °C (Nước ấm)</span>
                    <span>100 °C (Sôi)</span>
                  </div>
                </div>
              </div>

              {/* Data Logger Panel */}
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 flex flex-col justify-between border border-slate-800">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                      <Activity className="h-3.5 w-3.5 text-indigo-400" />
                      Ghi chép thực nghiệm số liệu
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={addPointToHistory}
                        className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg transition"
                      >
                        Ghi điểm đo
                      </button>
                      <button 
                        onClick={clearHistory}
                        className="border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white text-[10px] font-bold px-2 py-1 rounded-lg transition flex items-center gap-1"
                      >
                        <RefreshCw className="h-3 w-3" /> Xóa sạch
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto max-h-[140px] overflow-y-auto">
                    <table className="w-full text-left text-[11px] font-mono border-collapse">
                      <thead>
                        <tr className="border-b border-slate-850 text-slate-500 text-[10px]">
                          <th className="py-1.5">Lần đo</th>
                          <th className="py-1.5">t (°C)</th>
                          <th className="py-1.5">T (K)</th>
                          <th className="py-1.5">V (mL)</th>
                          <th className="py-1.5 text-right">Tỉ số V/T (mL/K)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center py-4 text-slate-600 italic">
                              Chưa ghi chép số liệu nào. Hãy bấm nút &quot;Ghi điểm đo&quot;!
                            </td>
                          </tr>
                        ) : (
                          history.map((row, index) => (
                            <tr key={row.id} className="border-b border-slate-900/50 text-slate-300 hover:bg-slate-900/40">
                              <td className="py-1.5 text-slate-500">#{index + 1}</td>
                              <td className="py-1.5">{row.t.toFixed(1)}</td>
                              <td className="py-1.5 text-amber-300">{row.T.toFixed(1)}</td>
                              <td className="py-1.5 text-blue-300">{row.V.toFixed(1)}</td>
                              <td className="py-1.5 text-right font-bold text-emerald-400">{(row.V / row.T).toFixed(5)}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-850 rounded-xl p-2.5 mt-2 text-[10px] text-slate-400 leading-relaxed">
                  <span className="text-emerald-400 font-extrabold block">🔍 Kết luận thực nghiệm:</span>
                  Tỉ số <span className="inline-flex items-center align-middle font-bold text-white mx-0.5"><FormattedMathText text="V/T" /></span> tính toán thu được ở mọi điểm đo đều xấp xỉ bằng <span className="inline-flex items-center align-middle font-bold text-emerald-400 mx-0.5"><FormattedMathText text="0.1000 mL/K" /></span>! Điều này chứng minh hoàn toàn tính đúng đắn của định luật Charles (thể tích <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="V" /></span> tỉ lệ thuận với nhiệt độ tuyệt đối <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="T" /></span>).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION III: Thí nghiệm minh hoạ trong SGK */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-blue-200 pb-2">
          <div className="h-6 w-1.5 bg-blue-500 rounded-full" />
          <h3 className="text-md font-extrabold text-slate-900 uppercase">
            III. Thí nghiệm minh hoạ định luật Charles
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-7 space-y-3.5 text-xs text-slate-700 leading-relaxed">
            <p>
              Để đo đạc kiểm chứng định luật Charles trực quan nhất, bộ thí nghiệm thực tế được chuẩn bị như trong sách giáo khoa <strong>Hình 10.3</strong> gồm:
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <strong className="text-slate-900 block font-bold text-[12px]">🛠️ Thiết bị chuẩn bị:</strong>
              <ul className="space-y-1 list-disc pl-4 text-slate-600">
                <li><strong className="text-slate-800">Xilanh thủy tinh (1):</strong> dung tích 50 mL, có độ chia nhỏ nhất 1 mL, pit-tông bôi trơn dầu nhớt di chuyển mượt mà.</li>
                <li><strong className="text-slate-800">Nhiệt kế điện tử (2):</strong> đo nhiệt độ chất lỏng chính xác.</li>
                <li><strong className="text-slate-800">Các cốc thủy tinh (3), (4), (5):</strong> đựng nước đá đang tan, nước phòng, nước ấm và nước nóng.</li>
                <li><strong className="text-slate-800">Nút cao su và giá đỡ (6)</strong> để kẹp giữ cố định xilanh trong cốc nước.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <strong className="text-slate-900 block font-bold text-[12px]">📋 Tiến hành thí nghiệm:</strong>
              <ol className="space-y-1.5 list-decimal pl-4 text-slate-600">
                <li><span className="text-slate-900 font-semibold">Bước 1:</span> Bôi dầu bôi trơn vào pit-tông để pit-tông dễ dàng di chuyển tự do trong xilanh. Điều chỉnh pit-tông ở mức 30 mL, bịt đầu ra bằng nút cao su kín.</li>
                <li><span className="text-slate-900 font-semibold">Bước 2:</span> Ghi giá trị nhiệt độ phòng và thể tích ban đầu (30 mL) vào bảng ghi.</li>
                <li><span className="text-slate-900 font-semibold">Bước 3:</span> Đổ nước đá đang tan vào cốc (3). Nhúng xilanh và nhiệt kế kẹp chặt vào cốc nước đá. Sau 3 phút ổn định nhiệt, ghi giá trị thể tích V và nhiệt độ t mới thu được.</li>
                <li><span className="text-slate-900 font-semibold">Bước 4:</span> Thực hiện lần lượt tương tự cho cốc nước ấm (4) và cốc nước nóng (5). Điền đầy đủ dữ liệu đo đạc vào bảng.</li>
              </ol>
            </div>
          </div>

          <div className="md:col-span-5 bg-blue-50/20 border border-blue-100/60 rounded-3xl p-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200/50 font-bold uppercase tracking-wide">
                Bảng số liệu SGK 10.1
              </span>
              <h4 className="text-xs font-bold text-slate-800">Ví dụ kết quả thí nghiệm thực tế:</h4>
              
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-center text-[10.5px] border-collapse font-mono">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[9.5px]">
                      <th className="py-1 px-1 font-bold">Lần đo</th>
                      <th className="py-1 px-1">t (°C)</th>
                      <th className="py-1 px-1">T (K)</th>
                      <th className="py-1 px-1">V (mL)</th>
                      <th className="py-1 px-1 text-blue-700 font-bold">V / T</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 text-slate-700">
                      <td className="py-1 font-bold text-slate-400">1 (Phòng)</td>
                      <td className="py-1">24,5</td>
                      <td className="py-1 text-amber-700">297,5</td>
                      <td className="py-1 text-blue-700">30</td>
                      <td className="py-1 font-bold text-emerald-600">0.1008</td>
                    </tr>
                    <tr className="border-b border-slate-100 text-slate-700">
                      <td className="py-1 font-bold text-slate-400">2 (Đá)</td>
                      <td className="py-1">0,5</td>
                      <td className="py-1 text-amber-700">273,5</td>
                      <td className="py-1 text-blue-700">27</td>
                      <td className="py-1 font-bold text-emerald-600">0.0987</td>
                    </tr>
                    <tr className="border-b border-slate-100 text-slate-700">
                      <td className="py-1 font-bold text-slate-400">3 (Ấm)</td>
                      <td className="py-1">41,5</td>
                      <td className="py-1 text-amber-700">314,5</td>
                      <td className="py-1 text-blue-700">33</td>
                      <td className="py-1 font-bold text-emerald-600">0.1049</td>
                    </tr>
                    <tr className="text-slate-700">
                      <td className="py-1 font-bold text-slate-400">4 (Nóng)</td>
                      <td className="py-1">59,3</td>
                      <td className="py-1 text-amber-700">332,3</td>
                      <td className="py-1 text-blue-700">35</td>
                      <td className="py-1 font-bold text-emerald-600">0.1053</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3 border border-blue-100/50 text-[10.5px] text-slate-600 space-y-1.5 mt-4">
              <strong className="text-slate-800 block">📊 Câu hỏi Thảo luận SGK:</strong>
              <p className="italic text-slate-500">
                &quot;Tại sao có thể coi quá trình biến đổi trạng thái của khí trong thí nghiệm trên là quá trình đẳng áp?&quot;
              </p>
              <p className="text-slate-700 font-medium">
                💡 <strong className="text-blue-900">Trả lời:</strong> Vì pit-tông di chuyển tự do trong xilanh, áp suất khí bên trong luôn tự điều chỉnh bằng áp suất khí quyển bên ngoài tác dụng lên nó, vốn là hằng số không đổi trong phòng thí nghiệm.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION IV: Đường đẳng áp trên các hệ trục tọa độ */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-blue-200 pb-2">
          <div className="h-6 w-1.5 bg-blue-500 rounded-full" />
          <h3 className="text-md font-extrabold text-slate-900 uppercase">
            IV. Đường biểu diễn quá trình đẳng áp (Đường đẳng áp)
          </h3>
        </div>

        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            Đường biểu diễn sự biến thiên của thể tích <span className="inline-flex items-center align-middle font-bold text-slate-900 mx-0.5"><FormattedMathText text="V" /></span> theo nhiệt độ tuyệt đối <span className="inline-flex items-center align-middle font-bold text-slate-900 mx-0.5"><FormattedMathText text="T" /></span> khi áp suất <span className="inline-flex items-center align-middle font-bold text-slate-900 mx-0.5"><FormattedMathText text="p" /></span> giữ không đổi gọi là đường đẳng áp.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left selector */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveGraphTab("VT")}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between ${activeGraphTab === "VT" ? "bg-blue-50 border-blue-300 text-blue-900" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"}`}
                >
                  <div>
                    <span className="block font-black text-[12px] uppercase">1. Hệ tọa độ (V - T)</span>
                    <span className="text-[10px] text-slate-500 font-normal">Đồ thị thẳng đi qua gốc O, biểu diễn sự tỉ lệ thuận hoàn hảo.</span>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>

                <button 
                  onClick={() => setActiveGraphTab("Vt")}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between ${activeGraphTab === "Vt" ? "bg-blue-50 border-blue-300 text-blue-900" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"}`}
                >
                  <div>
                    <span className="block font-black text-[12px] uppercase">2. Hệ tọa độ (V - t)</span>
                    <span className="text-[10px] text-slate-500 font-normal">Đường thẳng tuyến tính không qua gốc O, có phần kéo dài cắt trục t tại -273°C.</span>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>

                <button 
                  onClick={() => setActiveGraphTab("pT")}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between ${activeGraphTab === "pT" ? "bg-blue-50 border-blue-300 text-blue-900" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"}`}
                >
                  <div>
                    <span className="block font-black text-[12px] uppercase">3. Hệ tọa độ (p - T) hoặc (p - V)</span>
                    <span className="text-[10px] text-slate-500 font-normal">Đường thẳng song song với trục hoành nằm ngang biểu diễn p = hằng số.</span>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>
              </div>

              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 text-[10.5px] text-slate-700 leading-relaxed">
                <strong className="text-amber-950 block font-bold mb-0.5">⚠️ Độ không tuyệt đối:</strong>
                Đường biểu diễn hướng về <span className="inline-flex items-center align-middle font-bold text-amber-700 mx-0.5"><FormattedMathText text="0\\text{ K}" /></span> (<span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="-273\\text{ }^\\circ\\text{C}" /></span>) luôn được vẽ bằng <strong>nét đứt (dashed line)</strong>. Thực tế không thể hạ nhiệt độ khí lí tưởng tới mức này vì khí sẽ hóa lỏng trước khi thể tích đạt bằng không lý thuyết.
              </div>
            </div>

            {/* Right SVG Renderer */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-5 flex flex-col justify-center items-center min-h-[250px]">
              {activeGraphTab === "VT" && (
                <div className="w-full text-center space-y-2 animate-fade-in">
                  <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wide">Đường đẳng áp trong hệ tọa độ (V - T)</span>
                  <svg className="w-full max-w-[280px] h-48 overflow-visible mx-auto" viewBox="0 0 150 120">
                    {/* Axes */}
                    <line x1="20" y1="10" x2="20" y2="100" stroke="#475569" strokeWidth="1.5" /> {/* V axis */}
                    <line x1="20" y1="100" x2="140" y2="100" stroke="#475569" strokeWidth="1.5" /> {/* T axis */}
                    
                    {/* Arrowheads */}
                    <polygon points="20,5 17,11 23,11" fill="#475569" />
                    <polygon points="145,100 139,97 139,103" fill="#475569" />
                    
                    {/* Axis Labels */}
                    <text x="12" y="12" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#334155">V</text>
                    <text x="135" y="112" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#334155">T(K)</text>
                    <text x="12" y="106" fontSize="9" fontFamily="monospace" fill="#64748b">O</text>
                    
                    {/* Isobaric lines */}
                    {/* p1 lower slope -> higher pressure? No, p2 lower slope -> higher pressure p2 > p1 */}
                    <line x1="20" y1="100" x2="45" y2="80" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3" />
                    <line x1="45" y1="80" x2="120" y2="20" stroke="#ef4444" strokeWidth="2" />
                    <text x="123" y="24" fontSize="8" fontWeight="bold" fill="#ef4444">p₁</text>

                    <line x1="20" y1="100" x2="60" y2="80" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3" />
                    <line x1="60" y1="80" x2="120" y2="50" stroke="#3b82f6" strokeWidth="2" />
                    <text x="123" y="54" fontSize="8" fontWeight="bold" fill="#3b82f6">p₂ (p₂ &gt; p₁)</text>
                  </svg>
                  <p className="text-[10px] text-slate-500 italic max-w-sm mx-auto leading-relaxed">
                    Đường dốc đứng hơn ứng với áp suất nhỏ hơn (<span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="p_1 < p_2" /></span>). Có nét đứt kéo dài hướng về gốc tọa độ tuyệt đối.
                  </p>
                </div>
              )}

              {activeGraphTab === "Vt" && (
                <div className="w-full text-center space-y-2 animate-fade-in">
                  <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wide">Đường đẳng áp trong hệ tọa độ (V - t)</span>
                  <svg className="w-full max-w-[280px] h-48 overflow-visible mx-auto" viewBox="0 0 150 120">
                    {/* Axes */}
                    <line x1="50" y1="10" x2="50" y2="100" stroke="#475569" strokeWidth="1.5" /> {/* V axis */}
                    <line x1="15" y1="100" x2="140" y2="100" stroke="#475569" strokeWidth="1.5" /> {/* t axis */}
                    
                    {/* Arrowheads */}
                    <polygon points="50,5 47,11 53,11" fill="#475569" />
                    <polygon points="145,100 139,97 139,103" fill="#475569" />
                    
                    {/* Labels */}
                    <text x="42" y="12" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#334155">V</text>
                    <text x="135" y="112" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#334155">t(°C)</text>
                    <text x="54" y="108" fontSize="8" fontFamily="monospace" fill="#64748b">0°C</text>
                    <text x="20" y="112" fontSize="8" fontWeight="bold" fontFamily="monospace" fill="#ef4444">-273°C</text>
                    
                    {/* Tick for -273 */}
                    <line x1="25" y1="98" x2="25" y2="102" stroke="#ef4444" strokeWidth="1.5" />

                    {/* Isobaric line */}
                    <line x1="25" y1="100" x2="50" y2="80" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3" />
                    <line x1="50" y1="80" x2="120" y2="24" stroke="#2563eb" strokeWidth="2" />
                    
                    <circle cx="50" cy="80" r="2.5" fill="#10b981" />
                    <text x="56" y="80" fontSize="8" fontWeight="bold" fill="#10b981">V₀</text>
                  </svg>
                  <p className="text-[10px] text-slate-500 italic max-w-sm mx-auto leading-relaxed">
                    Đồ thị là đường thẳng cắt trục tung tại thể tích ở 0°C (<span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="V_0" /></span>) và có phần đứt nét kéo dài cắt trục nhiệt độ tại điểm âm tuyệt đối <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="-273\\text{ }^\\circ\\text{C}" /></span>.
                  </p>
                </div>
              )}

              {activeGraphTab === "pT" && (
                <div className="w-full text-center space-y-2 animate-fade-in">
                  <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wide">Đường đẳng áp trong hệ tọa độ (p - T) và (p - V)</span>
                  <svg className="w-full max-w-[280px] h-48 overflow-visible mx-auto" viewBox="0 0 150 120">
                    {/* Axes */}
                    <line x1="20" y1="10" x2="20" y2="100" stroke="#475569" strokeWidth="1.5" /> {/* p axis */}
                    <line x1="20" y1="100" x2="140" y2="100" stroke="#475569" strokeWidth="1.5" /> {/* T or V axis */}
                    
                    {/* Arrowheads */}
                    <polygon points="20,5 17,11 23,11" fill="#475569" />
                    <polygon points="145,100 139,97 139,103" fill="#475569" />
                    
                    {/* Labels */}
                    <text x="12" y="12" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#334155">p</text>
                    <text x="125" y="112" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#334155">T (hoặc V)</text>
                    <text x="12" y="106" fontSize="9" fontFamily="monospace" fill="#64748b">O</text>
                    
                    {/* Isobaric lines */}
                    <line x1="20" y1="50" x2="130" y2="50" stroke="#10b981" strokeWidth="2" />
                    <text x="133" y="53" fontSize="8" fontWeight="bold" fill="#10b981">p = hằng số</text>
                  </svg>
                  <p className="text-[10px] text-slate-500 italic max-w-sm mx-auto leading-relaxed">
                    Vì áp suất <span className="inline-flex items-center align-middle font-bold mx-0.5"><FormattedMathText text="p" /></span> hoàn toàn không biến đổi trong suốt quá trình, nên đồ thị biểu diễn luôn luôn là một đường thẳng nằm ngang hoàn hảo.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION V: Ứng dụng thực tiễn tăng cường */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-blue-200 pb-2">
          <div className="h-6 w-1.5 bg-blue-500 rounded-full" />
          <h3 className="text-md font-extrabold text-slate-900 uppercase">
            V. Ứng dụng thực tế của định luật Charles
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-gradient-to-b from-white to-orange-50/20 border border-slate-200 rounded-2xl p-4 space-y-2 hover:shadow-md transition">
            <div className="bg-orange-100 text-orange-800 rounded-lg p-1.5 w-fit font-bold uppercase text-[9px]">
              🎈 Khinh khí cầu
            </div>
            <strong className="text-slate-900 block font-bold text-[12px]">Nguyên lý khí cầu bay:</strong>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Khi đun nóng không khí bên trong quả cầu bằng đèn khò ga, nhiệt độ tăng cao làm không khí nở mạnh (thể tích V tăng theo định luật Charles) đẩy một phần khí thoát ra ngoài. Do lượng khí thoát ra, khối lượng riêng của khí nóng nhẹ hơn hẳn không khí mát xung quanh, sinh ra lực nâng Ác-si-mét kéo khí cầu bay lên không trung.
            </p>
          </div>

          <div className="bg-gradient-to-b from-white to-blue-50/20 border border-slate-200 rounded-2xl p-4 space-y-2 hover:shadow-md transition">
            <div className="bg-blue-100 text-blue-800 rounded-lg p-1.5 w-fit font-bold uppercase text-[9px]">
              🚗 Vận hành lốp xe & Bình khí
            </div>
            <strong className="text-slate-900 block font-bold text-[12px]">Nguy hiểm nắng gắt mùa hè:</strong>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Bơm lốp xe quá căng rồi phơi ngoài trời nắng cực độ có thể làm không khí bên trong nóng lên. Do lớp lốp cao su dẻo giới hạn thể tích, xu hướng giãn nở tự nhiên của khí theo định luật Charles bị chặn lại khiến áp suất tăng dữ dội vượt mức chịu lực của vỏ lốp, dẫn tới nổ lốp cực kì nguy hiểm.
            </p>
          </div>

          <div className="bg-gradient-to-b from-white to-indigo-50/20 border border-slate-200 rounded-2xl p-4 space-y-2 hover:shadow-md transition">
            <div className="bg-indigo-100 text-indigo-800 rounded-lg p-1.5 w-fit font-bold uppercase text-[9px]">
              🎾 Chỉnh sửa đồ dùng bẹp
            </div>
            <strong className="text-slate-900 block font-bold text-[12px]">Mẹo phục hồi bóng bàn bẹp:</strong>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Khi quả bóng bàn làm bằng chất dẻo bị bẹp rúm, ta chỉ cần thả nó vào cốc nước sôi nóng. Nước nóng truyền nhiệt làm không khí trong bóng nóng lên, giãn nở nhanh chóng tăng thể tích (định luật Charles) tạo áp lực đều từ bên trong đẩy vỏ bóng phồng căng tròn xoe như ban đầu!
            </p>
          </div>
        </div>
      </div>

      {/* FLASHCARD MOTIVATIONAL */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-5 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">💡 Ghi nhớ nhanh</span>
          <h4 className="text-sm font-bold">Charles đẳng áp: Thể tích tỉ lệ thuận với nhiệt độ tuyệt đối!</h4>
          <div className="text-[11px] text-blue-100 font-bold flex items-center gap-1.5 flex-wrap">
            <FormattedMathText text="\\frac{V_1}{T_1} = \\frac{V_2}{T_2}" /> &nbsp; (với <FormattedMathText text="T = t + 273" />)
          </div>
        </div>
        <div className="shrink-0 bg-white text-indigo-900 text-xs font-bold px-4 py-2 rounded-xl shadow hover:bg-slate-50 transition cursor-pointer flex items-center gap-1">
          <Brain className="h-4 w-4" /> Hãy bắt đầu làm bài luyện tập ngay!
        </div>
      </div>
    </div>
  );
}
