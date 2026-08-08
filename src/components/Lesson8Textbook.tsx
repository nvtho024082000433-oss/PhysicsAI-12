import { useState, useEffect } from "react";
import { BookOpen, Sparkles, Brain, CheckCircle2, RefreshCw, Activity, ArrowRight, Layers, Info } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson8Textbook() {
  const [brownianStep, setBrownianStep] = useState(0);
  const [temperature, setTemperature] = useState(300); // Kelvin
  const [wallCollisions, setWallCollisions] = useState<{ id: number; x: number; y: number; vx: number; vy: number; radius: number }[]>([]);
  const [pressureScore, setPressureScore] = useState(0);

  // Initialize random gas molecules for Figure 8.3 simulation
  useEffect(() => {
    const molecules = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 120 + 20,
      y: Math.random() * 120 + 20,
      vx: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1.5 + 0.5),
      vy: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1.5 + 0.5),
      radius: 4,
    }));
    setWallCollisions(molecules);
  }, []);

  // Simple physics loop for the miniature container pressure simulation
  useEffect(() => {
    const speedMultiplier = Math.sqrt(temperature / 300); // kinetic energy proportional to T
    const interval = setInterval(() => {
      setWallCollisions((prev) => {
        let collisionCount = 0;
        const next = prev.map((m) => {
          let nx = m.x + m.vx * speedMultiplier;
          let ny = m.y + m.vy * speedMultiplier;
          let nvx = m.vx;
          let nvy = m.vy;

          // Wall collision detection (box size is 200x160)
          if (nx - m.radius < 5 || nx + m.radius > 195) {
            nvx = -m.vx;
            nx = nx + nvx * speedMultiplier;
            if (nx + m.radius > 195) {
              collisionCount++; // hit the right wall (causing pressure)
            }
          }
          if (ny - m.radius < 5 || ny + m.radius > 155) {
            nvy = -m.vy;
            ny = ny + nvy * speedMultiplier;
          }

          return { ...m, x: nx, y: ny, vx: nvx, vy: nvy };
        });

        if (collisionCount > 0) {
          setPressureScore((prevScore) => Math.min(100, prevScore + collisionCount * 4));
        }
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [temperature]);

  // Decay pressure score back to a baseline relative to temperature
  useEffect(() => {
    const decay = setInterval(() => {
      const baselinePressure = Math.round((temperature - 100) / 4);
      setPressureScore((p) => {
        if (p > baselinePressure) return Math.max(baselinePressure, p - 2);
        if (p < baselinePressure) return Math.min(baselinePressure, p + 2);
        return p;
      });
    }, 100);
    return () => clearInterval(decay);
  }, [temperature]);

  // Description details for Brownian steps
  const brownianDetails = [
    {
      title: "Trạng thái cân bằng động (Trước va chạm)",
      desc: "Các phân tử không khí siêu nhỏ (màu xanh) chuyển động hỗn loạn xung quanh hạt khói lớn (màu vàng). Do phân bố ngẫu nhiên đều từ mọi phía, tổng hợp lực trung bình bằng không. Hạt khói đứng yên.",
      vectors: []
    },
    {
      title: "Va chạm không cân bằng thứ nhất",
      desc: "Vào một thời điểm ngẫu nhiên, số lượng phân tử không khí va chạm từ phía dưới bên trái nhiều hơn phía đối diện. Hợp lực F1 khác không đẩy hạt khói lệch mạnh về phía trên bên phải.",
      vectors: [{ x1: 60, y1: 140, x2: 120, y2: 80, color: "stroke-emerald-600" }]
    },
    {
      title: "Va chạm đổi hướng đột ngột thứ hai",
      desc: "Ngay sau đó, các phân tử từ góc trên bên phải lại va chạm dày đặc hơn, dội vào hạt khói một xung lượng lớn. Hạt khói đổi hướng đột ngột, bị đẩy giật lùi về phía dưới.",
      vectors: [
        { x1: 60, y1: 140, x2: 120, y2: 80, color: "stroke-slate-400 stroke-dasharray" },
        { x1: 120, y1: 80, x2: 160, y2: 150, color: "stroke-emerald-600" }
      ]
    },
    {
      title: "Va chạm nảy tiếp theo thứ ba",
      desc: "Dưới tác động của một cú va chạm liên tiếp từ góc dưới bên phải, hạt khói lại bị đẩy sang trái theo phương ngang. Quỹ đạo nảy sinh một nút gấp khúc mới rõ nét.",
      vectors: [
        { x1: 60, y1: 140, x2: 120, y2: 80, color: "stroke-slate-400 stroke-dasharray" },
        { x1: 120, y1: 80, x2: 160, y2: 150, color: "stroke-slate-400 stroke-dasharray" },
        { x1: 160, y1: 150, x2: 70, y2: 110, color: "stroke-emerald-600" }
      ]
    },
    {
      title: "Kết quả: Quỹ đạo gấp khúc ngẫu nhiên liên tục",
      desc: "Khi liên tục chịu hàng triệu va chạm không cân bằng mỗi giây từ các phân tử khí, hạt khói vẽ nên một đường gấp khúc vô cùng phức tạp (Hình 8.2). Đây là bằng chứng thực nghiệm trực tiếp chứng tỏ các phân tử khí chuyển động hỗn loạn không ngừng.",
      vectors: [
        { x1: 60, y1: 140, x2: 120, y2: 80, color: "stroke-cyan-600" },
        { x1: 120, y1: 80, x2: 160, y2: 150, color: "stroke-cyan-600" },
        { x1: 160, y1: 150, x2: 70, y2: 110, color: "stroke-cyan-600" },
        { x1: 70, y1: 110, x2: 210, y2: 60, color: "stroke-amber-600" }
      ]
    }
  ];

  return (
    <div className="space-y-8 text-slate-900 animate-fade-in relative z-10">
      {/* Title & Introduction block (Soft background with 3D shadow effect) */}
      <div className="bg-gradient-to-r from-cyan-50 to-cyan-100/70 p-6 rounded-3xl text-slate-950 shadow-sm relative overflow-hidden border-2 border-slate-250 border-b-[6px] border-b-slate-350">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse pointer-events-none" />
        <div className="relative z-10 space-y-2.5">
          <span className="inline-block text-[10px] font-mono bg-cyan-100/80 text-cyan-800 px-3 py-1 rounded-full border border-cyan-300 font-black tracking-widest uppercase">
            CHƯƠNG II: KHÍ LÍ TƯỞNG
          </span>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-950 uppercase">
            Bài 8: Mô hình động học phân tử chất khí
          </h2>
          <p className="text-xs text-slate-800 max-w-4xl leading-relaxed font-semibold">
            Nghiên cứu các quy luật vi mô chi phối hành vi vĩ mô của chất khí, giải mã nguồn gốc của áp suất, nhiệt độ, các trạng thái cấu trúc của vật chất thông qua các chứng cứ thực nghiệm vững chắc.
          </p>
        </div>
      </div>

      {/* SECTION I */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-cyan-400 to-cyan-500 rounded-md"></span>
          <h3 className="text-sm font-black text-slate-950 uppercase tracking-wide">
            I. Chuyển động và tương tác của các phân tử khí
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4 text-xs leading-relaxed text-slate-900">
            <div className="bg-gradient-to-b from-slate-50 to-slate-100/40 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 shadow-sm space-y-3">
              <h4 className="font-extrabold text-slate-950 flex items-center gap-1.5 text-xs">
                <Activity className="h-4.5 w-4.5 text-cyan-600 shrink-0" />
                1. Thí nghiệm chuyển động Brown trong chất khí (Hình 8.1 & 8.2)
              </h4>
              <p className="font-medium text-slate-800">
                Năm 1827, nhà thực vật học Robert Brown khi quan sát các hạt phấn hoa trong nước bằng kính hiển vi đã phát hiện chúng chuyển động hỗn loạn không ngừng. Hiện tượng tương tự cũng được quan sát thấy khi chiếu một chùm sáng hẹp vào một ống thuỷ tinh chứa mẫu khói (Hình 8.1): các <strong className="text-slate-950">hạt khói nhỏ</strong> lơ lửng chuyển động dích dắc hỗn loạn không ngừng.
              </p>
              <p className="font-medium text-slate-800">
                <strong className="text-slate-950">Giải thích vi mô:</strong> Do các phân tử khí có kích thước siêu nhỏ nên không thể nhìn thấy trực tiếp bằng kính hiển vi thường. Tuy nhiên, chúng chuyển động nhiệt hỗn loạn vô cùng nhanh, liên tục va chạm vào hạt khói từ mọi phía. Tại mỗi thời điểm, lực va chạm tổng hợp từ các phân tử khí lên các bề mặt của hạt khói không cân bằng nhau, tạo ra một hợp lực ngẫu nhiên đẩy hạt khói dịch chuyển theo quỹ đạo gấp khúc phức tạp (Hình 8.2).
              </p>
            </div>

            <div className="bg-gradient-to-b from-cyan-50/50 to-cyan-100/30 border-2 border-cyan-200 border-b-[6px] border-b-cyan-300 rounded-3xl p-5 shadow-sm space-y-3">
              <h4 className="font-extrabold text-cyan-950 flex items-center gap-1.5 text-xs">
                <Layers className="h-4.5 w-4.5 text-cyan-600 shrink-0" />
                2. Khoảng cách và tương tác phân tử
              </h4>
              <p className="font-medium text-slate-800">
                Khoảng cách trung bình giữa các phân tử ở thể khí <strong className="text-slate-950">rất lớn</strong> so với kích thước của chính các phân tử và lớn hơn hàng chục lần khoảng cách phân tử ở thể lỏng hay thể rắn. 
              </p>
              <p className="font-medium text-slate-800">
                Vì khoảng cách quá xa, lực liên kết phân tử khí <strong className="text-slate-950">rất yếu</strong> ở điều kiện thường. Do đó, các phân tử khí tự do bay lượn hỗn loạn và luôn có xu hướng khuếch tán rộng khắp, chiếm toàn bộ dung tích của bình chứa khí.
              </p>
            </div>
          </div>

          {/* INTERACTIVE WIDGET FOR BROWNIAN MOTION */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/40 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b-2 border-slate-200 pb-2">
              <span className="text-[10px] font-mono text-cyan-800 font-black tracking-wider uppercase">
                MÔ PHỎNG: CHUYỂN ĐỘNG BROWN (HÌNH 8.2)
              </span>
              <span className="text-[9px] font-black text-slate-700 bg-slate-200 px-2.5 py-1 rounded-full border border-slate-300">
                Bước {brownianStep + 1} / 5
              </span>
            </div>

            {/* Simulated Interactive SVG Stage with Light Background for Perfect Contrast */}
            <div className="relative h-44 bg-white rounded-2xl overflow-hidden border-2 border-slate-200 flex items-center justify-center shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 300 180">
                {/* Background Grid */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Drawn Path of the smoke particle with High Contrast Cyan */}
                {brownianStep >= 1 && (
                  <path
                    d={`M 60 140 L 120 80 ${brownianStep >= 2 ? "L 160 150" : ""} ${brownianStep >= 3 ? "L 70 110" : ""} ${brownianStep >= 4 ? "L 210 60" : ""}`}
                    fill="none"
                    stroke="#0891b2"
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                )}

                {/* Render Collision Force Vectors (Green arrows indicating pressure unbalanced) */}
                {brownianDetails[brownianStep].vectors.map((vec, idx) => (
                  <line
                    key={idx}
                    x1={vec.x1}
                    y1={vec.y1}
                    x2={vec.x2}
                    y2={vec.y2}
                    className={`${vec.color} stroke-[3]`}
                    markerEnd="url(#arrow)"
                  />
                ))}

                {/* Air molecules (small fast moving dots around the current coordinates) */}
                {/* Step 0 positions */}
                {brownianStep === 0 && (
                  <>
                    <circle cx="40" cy="130" r="3" fill="#2563eb" className="animate-ping" />
                    <circle cx="85" cy="155" r="3" fill="#2563eb" />
                    <circle cx="50" cy="150" r="3" fill="#2563eb" />
                    <circle cx="75" cy="120" r="3" fill="#2563eb" />
                  </>
                )}
                {/* Step 1 positions (hitting bottom-left) */}
                {brownianStep === 1 && (
                  <>
                    <circle cx="65" cy="142" r="3" fill="#dc2626" className="animate-ping" />
                    <circle cx="55" cy="148" r="3" fill="#dc2626" />
                    <line x1="45" y1="155" x2="58" y2="143" stroke="#dc2626" strokeWidth="1.5" />
                  </>
                )}
                {/* Step 2 positions (hitting top-right) */}
                {brownianStep === 2 && (
                  <>
                    <circle cx="128" cy="72" r="3" fill="#dc2626" className="animate-ping" />
                    <circle cx="124" cy="75" r="3" fill="#dc2626" />
                    <line x1="135" y1="65" x2="122" y2="78" stroke="#dc2626" strokeWidth="1.5" />
                  </>
                )}
                {/* Step 3 positions (hitting bottom-right) */}
                {brownianStep === 3 && (
                  <>
                    <circle cx="168" cy="154" r="3" fill="#dc2626" className="animate-ping" />
                    <circle cx="162" cy="152" r="3" fill="#dc2626" />
                    <line x1="175" y1="155" x2="162" y2="151" stroke="#dc2626" strokeWidth="1.5" />
                  </>
                )}

                {/* Marker for vectors */}
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669" />
                  </marker>
                </defs>

                {/* The smoke dust particle (Yellow larger circle with deep border for high contrast) */}
                <circle
                  cx={brownianStep === 0 ? 60 : brownianStep === 1 ? 120 : brownianStep === 2 ? 160 : brownianStep === 3 ? 70 : 210}
                  cy={brownianStep === 0 ? 140 : brownianStep === 1 ? 80 : brownianStep === 2 ? 150 : brownianStep === 3 ? 110 : 60}
                  r="9"
                  fill="#eab308"
                  stroke="#854d0e"
                  strokeWidth="2.5"
                  className="transition-all duration-300 ease-out shadow-sm"
                />

                {/* Labels */}
                <text x="15" y="22" fill="#475569" fontSize="9" className="font-bold font-mono">Kính hiển vi phóng đại (x1000)</text>
                <text x="215" y="75" fill="#854d0e" fontSize="9" className="font-black">Hạt khói</text>
              </svg>

              {/* Float step box (dark background with white text for maximum readability overlay) */}
              <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 border border-slate-900 p-2.5 rounded-xl text-[10.5px] text-white font-bold leading-relaxed shadow-lg">
                <span className="text-cyan-400 font-black block text-[11px] mb-0.5">{brownianDetails[brownianStep].title}</span>
                {brownianDetails[brownianStep].desc}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setBrownianStep(0)}
                className="flex-1 py-2 bg-gradient-to-b from-slate-50 to-slate-100 border-2 border-slate-300 border-b-[4px] border-b-slate-400 hover:translate-y-[1px] hover:border-b-[3px] active:translate-y-[2px] active:border-b-[1px] text-slate-800 font-black text-[10.5px] rounded-xl cursor-pointer flex items-center justify-center gap-1 transition-all"
              >
                <RefreshCw className="h-3 w-3 shrink-0" /> Đặt lại
              </button>
              <button
                onClick={() => setBrownianStep((s) => (s < 4 ? s + 1 : 0))}
                className="flex-1 py-2 bg-gradient-to-b from-cyan-400 to-cyan-500 border-2 border-cyan-500 border-b-[4px] border-b-cyan-600 hover:translate-y-[1px] hover:border-b-[3px] active:translate-y-[2px] active:border-b-[1px] text-slate-950 font-black text-[10.5px] rounded-xl cursor-pointer flex items-center justify-center gap-1 transition-all"
              >
                Tiếp tục va chạm <ArrowRight className="h-3 w-3 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION II */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-amber-400 to-amber-500 rounded-md"></span>
          <h3 className="text-sm font-black text-slate-950 uppercase tracking-wide">
            II. Mô hình động học phân tử chất khí
          </h3>
        </div>

        <p className="text-xs text-slate-800 font-bold leading-relaxed">
          Được hoàn thiện bởi các nhà vật lý vĩ đại (Maxwell, Boltzmann), <strong className="text-slate-950">Mô hình động học phân tử chất khí</strong> giải thích các tính chất vĩ mô dựa trên 3 luận điểm cơ bản (Bảng 8.1):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gradient-to-b from-cyan-50 to-cyan-100/30 border-2 border-cyan-200 border-b-[5px] border-b-cyan-300 p-5 rounded-3xl relative overflow-hidden space-y-2.5 hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[2px] active:border-b-[3px] transition-all cursor-pointer">
            <span className="absolute -right-2 -bottom-2 text-6xl text-cyan-200/50 font-black font-mono select-none pointer-events-none">1</span>
            <span className="inline-block text-[10px] font-black bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-md border border-cyan-200">CẤU TRÚC</span>
            <h4 className="font-black text-cyan-950 text-xs">Phân tử siêu nhỏ</h4>
            <p className="text-[11px] text-slate-800 leading-relaxed font-semibold">
              Chất khí được cấu tạo từ các phân tử có kích thước rất nhỏ so với khoảng cách giữa chúng. Điều này lý giải tại sao chất khí có thể dễ dàng bị nén co hẹp thể tích lại.
            </p>
          </div>

          <div className="bg-gradient-to-b from-amber-50 to-amber-100/30 border-2 border-amber-200 border-b-[5px] border-b-amber-300 p-5 rounded-3xl relative overflow-hidden space-y-2.5 hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[2px] active:border-b-[3px] transition-all cursor-pointer">
            <span className="absolute -right-2 -bottom-2 text-6xl text-amber-200/50 font-black font-mono select-none pointer-events-none">2</span>
            <span className="inline-block text-[10px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200">NHIỆT ĐỘ</span>
            <h4 className="font-black text-amber-950 text-xs">Chuyển động hỗn loạn</h4>
            <p className="text-[11px] text-slate-800 leading-relaxed font-semibold">
              Các phân tử khí chuyển động hỗn loạn không ngừng. Nhiệt độ của chất khí càng cao thì tốc độ trung bình của các phân tử chuyển động hỗn loạn nhiệt càng lớn.
            </p>
          </div>

          <div className="bg-gradient-to-b from-purple-50 to-purple-100/30 border-2 border-purple-200 border-b-[5px] border-b-purple-300 p-5 rounded-3xl relative overflow-hidden space-y-2.5 hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[2px] active:border-b-[3px] transition-all cursor-pointer">
            <span className="absolute -right-2 -bottom-2 text-6xl text-purple-200/50 font-black font-mono select-none pointer-events-none">3</span>
            <span className="inline-block text-[10px] font-black bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md border border-purple-200">ÁP SUẤT</span>
            <h4 className="font-black text-purple-950 text-xs">Va chạm gây áp lực</h4>
            <p className="text-[11px] text-slate-800 leading-relaxed font-semibold">
              Khi chuyển động hỗn loạn, các phân tử khí liên tục va chạm vào thành bình chứa và tác dụng lực đẩy vuông góc lên thành bình, từ đó tạo ra áp suất vĩ mô.
            </p>
          </div>
        </div>

        {/* COMPARISON TABLE 8.1 */}
        <div className="bg-gradient-to-b from-slate-50 to-slate-100/35 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 text-slate-900 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-3">
            <Layers className="h-5.5 w-5.5 text-indigo-600 shrink-0" />
            <div>
              <h4 className="text-xs font-black uppercase text-slate-950 tracking-wide">
                Bảng 8.1: So sánh đặc điểm cấu trúc vi mô của các thể (rắn, lỏng, khí)
              </h4>
              <p className="text-[10px] text-slate-600 font-extrabold uppercase">Bám sát nội dung sách giáo khoa Vật lí 12 mới</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 text-slate-600 uppercase tracking-wider text-[10px] font-black">
                  <th className="py-2.5 pr-4">Đặc điểm vi mô</th>
                  <th className="py-2.5 px-4 bg-slate-100/50">Thể rắn</th>
                  <th className="py-2.5 px-4">Thể lỏng</th>
                  <th className="py-2.5 px-4 bg-cyan-100/30 text-cyan-950 font-black">Thể khí</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px] leading-relaxed text-slate-950 font-bold">
                <tr>
                  <td className="py-3 pr-4 font-black text-slate-950">Khoảng cách phân tử</td>
                  <td className="py-3 px-4 bg-slate-100/50 text-slate-800 font-semibold">Rất nhỏ (cỡ kích thước phân tử)</td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">Nhỏ (lớn hơn thể rắn một chút)</td>
                  <td className="py-3 px-4 bg-cyan-100/30 text-cyan-950 font-black">Rất lớn (lớn hơn kích thước phân tử hàng chục lần)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-black text-slate-950">Lực liên kết phân tử</td>
                  <td className="py-3 px-4 bg-slate-100/50 text-slate-800 font-semibold">Rất mạnh (giữ chặt vị trí)</td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">Yếu hơn thể rắn (có thể trượt lên nhau)</td>
                  <td className="py-3 px-4 bg-cyan-100/30 text-cyan-950 font-black">Rất yếu (coi như tự do khi chưa va chạm)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-black text-slate-950">Chuyển động nhiệt</td>
                  <td className="py-3 px-4 bg-slate-100/50 text-slate-800 font-semibold">Dao động quanh vị trí cân bằng cố định</td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">Dao động quanh vị trí cân bằng di động</td>
                  <td className="py-3 px-4 bg-cyan-100/30 text-cyan-950 font-black">Chuyển động hoàn toàn hỗn loạn, không ngừng</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-black text-slate-950">Hình dạng & Thể tích</td>
                  <td className="py-3 px-4 bg-slate-100/50 text-slate-800 font-semibold">Có hình dạng và thể tích xác định</td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">Có thể tích xác định, hình dạng của bình chứa</td>
                  <td className="py-3 px-4 bg-cyan-100/30 text-cyan-950 font-black">Không có hình dạng và thể tích xác định (chiếm đầy bình)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION III */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-purple-400 to-purple-500 rounded-md"></span>
          <h3 className="text-sm font-black text-slate-950 uppercase tracking-wide">
            III. Khí lí tưởng (Ideal Gas)
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* INTERACTIVE CONTAINER WALL COLLISIONS WIDGET */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/40 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b-2 border-slate-200 pb-2">
              <span className="text-[10px] font-mono text-cyan-800 font-black tracking-wider uppercase">
                MÔ PHỎNG: VA CHẠM THÀNH BÌNH TẠO ÁP SUẤT
              </span>
              <span className="text-[9px] font-black text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                T = {temperature} K
              </span>
            </div>

            {/* Container simulator with bright off-white background for high contrast */}
            <div className="relative h-44 bg-white rounded-2xl overflow-hidden border-2 border-slate-200 flex items-center justify-center shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 200 160">
                {/* Wall rendering on the right with stripes */}
                <rect x="194" y="0" width="6" height="160" fill="#dc2626" className="animate-pulse" />
                <line x1="194" y1="0" x2="194" y2="160" stroke="#dc2626" strokeWidth="2" />
                
                {/* Render gas molecules bouncing around */}
                {wallCollisions.map((m) => (
                  <circle
                    key={m.id}
                    cx={m.x}
                    cy={m.y}
                    r={m.radius + 0.5}
                    fill={temperature > 400 ? "#dc2626" : temperature > 250 ? "#2563eb" : "#0284c7"}
                    stroke="#ffffff"
                    strokeWidth="1.2"
                  />
                ))}

                {/* Pressure pointer UI inside the canvas (High contrast light layout) */}
                <g transform="translate(15, 20)">
                  <circle cx="16" cy="16" r="15" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
                  {/* Gauge Hand */}
                  <line
                    x1="16"
                    y1="16"
                    x2={16 + 12 * Math.cos((pressureScore * 1.8 - 90) * Math.PI / 180)}
                    y2={16 + 12 * Math.sin((pressureScore * 1.8 - 90) * Math.PI / 180)}
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="16" cy="16" r="3" fill="#dc2626" />
                  <text x="36" y="16" fill="#334155" fontSize="8" className="font-black">Áp suất vĩ mô</text>
                  <text x="36" y="26" fill="#dc2626" fontSize="10" className="font-black font-mono">{pressureScore} atm</text>
                </g>

                <text x="15" y="148" fill="#475569" fontSize="8.5" className="font-black">V = Const (Thể tích không đổi)</text>
                <text x="110" y="148" fill="#b91c1c" fontSize="8.5" className="font-black">Thành bình chịu va đập</text>
              </svg>

              {/* Temp details overlay */}
              <div className="absolute bottom-2 right-2 bg-slate-950/90 border border-slate-900 px-2 py-1 rounded-lg text-[8.5px] text-white font-mono font-bold">
                Số phân tử: 15 | Đàn hồi tuyệt đối
              </div>
            </div>

            {/* Interactive Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-slate-700 font-extrabold">
                <span>Nhiệt độ tuyệt đối (T)</span>
                <span className={temperature > 400 ? "text-red-600" : "text-cyan-700"}>{temperature} K ({Math.round(temperature - 273)} °C)</span>
              </div>
              <input
                type="range"
                min="100"
                max="600"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
              <p className="text-[9.5px] text-slate-600 italic text-center leading-normal font-bold">
                Kéo thanh trượt để thay đổi nhiệt độ. Nhiệt độ càng cao, phân tử bay càng nhanh, va chạm vào thành bình mạnh và dồn dập hơn, làm áp suất đo được tăng vọt!
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-xs leading-relaxed text-slate-900">
            <div className="bg-gradient-to-b from-slate-50 to-slate-100/40 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 shadow-sm space-y-3.5">
              <h4 className="font-extrabold text-slate-950 flex items-center gap-1.5 text-xs">
                <Brain className="h-4.5 w-4.5 text-cyan-600 animate-pulse shrink-0" />
                Định nghĩa và các giả thuyết của khí lí tưởng
              </h4>
              <p className="font-medium text-slate-800">
                Để đơn giản hoá các bài toán tương tác phức tạp của khí thực tế (như không khí, khí oxygen, khí nitrogen...), các nhà vật lý đưa ra mô hình <strong className="text-slate-950">Khí lí tưởng</strong> gồm 3 đặc trưng cốt lõi sau:
              </p>
              <ul className="list-disc pl-4 space-y-3 text-slate-800 font-semibold">
                <li>
                  <strong className="text-slate-950">Giả thuyết 1 (Chất điểm):</strong> Các phân tử khí lí tưởng được coi là các chất điểm có khối lượng đáng kể nhưng kích thước của phân tử vô cùng nhỏ, coi như bằng không so với khoảng cách giữa chúng.
                </li>
                <li>
                  <strong className="text-slate-950">Giả thuyết 2 (Lực tương tác):</strong> Khi chưa va chạm, lực tương tác tĩnh điện/hút đẩy giữa các phân tử khí hoàn toàn không đáng kể, coi như bằng không. Chúng chỉ tương tác khi va chạm trực tiếp với nhau hoặc với thành bình.
                </li>
                <li>
                  <strong className="text-slate-950">Giả thuyết 3 (Va chạm đàn hồi):</strong> Va chạm giữa các phân tử khí lí tưởng với nhau và với thành bình là va chạm hoàn toàn đàn hồi. Động năng và động lượng của phân tử khí được bảo toàn tuyệt đối sau va chạm, giúp áp suất bình luôn ổn định.
                </li>
              </ul>
              
              <div className="bg-gradient-to-b from-amber-50 to-amber-100/20 border-2 border-amber-200 border-b-[5px] border-b-amber-300 p-4 rounded-3xl text-[11px] text-amber-950 font-bold leading-relaxed">
                <span className="font-black text-amber-900 block mb-1">💡 LIÊN HỆ THỰC TẾ (KHÍ THỰC VÀ KHÍ LÍ TƯỞNG)</span>
                Các chất khí thực tế ở nhiệt độ không quá thấp và áp suất không quá cao (như không khí trong phòng) có thể coi gần đúng như khí lí tưởng, cho phép ta áp dụng các định luật Boyle, Charles, và phương trình Clapeyron để tính toán kỹ thuật một cách đơn giản và có độ chính xác rất cao.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION IV: FORMULA SYSTEM */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-indigo-400 to-indigo-500 rounded-md"></span>
          <h3 className="text-sm font-black text-slate-950 uppercase tracking-wide">
            IV. Hệ thống công thức Động học phân tử chất khí
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Áp suất chất khí theo động học phân tử */}
          <div className="bg-gradient-to-b from-slate-50 to-slate-100/40 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block text-[10px] font-black bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full border border-indigo-200 uppercase tracking-wider">
                Áp suất chất khí (Vi mô & Vĩ mô)
              </span>
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-center shadow-inner">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide">CÔNG THỨC VI MÔ</span>
                <div className="text-xl font-black text-indigo-900 py-1">
                  <FormattedMathText text="\(p = \frac{1}{3} \mu \cdot m \cdot \overline{v^2}\)" />
                </div>
                <div className="w-full border-t border-slate-200 my-1"></div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide">CÔNG THỨC VĨ MÔ (ĐỊNH NGHĨA)</span>
                <div className="text-lg font-black text-indigo-950 py-1">
                  <FormattedMathText text="\(p = \frac{F}{S}\)" />
                </div>
              </div>

              <div className="text-[11px] text-slate-800 space-y-2 font-semibold">
                <p className="font-extrabold text-slate-900 border-b pb-1">Các đại lượng trong công thức:</p>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li><strong className="text-slate-950"><FormattedMathText text="\(p\)" /></strong>: Áp suất chất khí (đơn vị: <code className="bg-slate-100 px-1 rounded">Pa</code> hoặc <code className="bg-slate-100 px-1 rounded">N/m²</code>, <span className="inline-flex items-center"><FormattedMathText text="\(1\text{ atm} = 1,013 \cdot 10^5\text{ Pa}\)" /></span>)</li>
                  <li><strong className="text-slate-950"><FormattedMathText text="\(\mu\)" /></strong>: Mật độ phân tử khí (<span className="inline-flex items-center"><FormattedMathText text="\(\mu = \frac{N}{V}\)" /></span>, đơn vị: <span className="inline-flex items-center"><FormattedMathText text="\(\text{m}^{-3}\)" /></span>)</li>
                  <li><strong className="text-slate-950"><FormattedMathText text="\(m\)" /></strong>: Khối lượng của một phân tử khí (đơn vị: <code className="bg-slate-100 px-1 rounded">kg</code>)</li>
                  <li><strong className="text-slate-950"><FormattedMathText text="\(\overline{v^2}\)" /></strong>: Tốc độ bình phương trung bình của các phân tử khí (đơn vị: <code className="bg-slate-100 px-1 rounded">m²/s²</code>)</li>
                  <li><strong className="text-slate-950"><FormattedMathText text="\(F\)" /></strong>: Áp lực tác dụng vuông góc lên diện tích mặt thành bình <strong className="text-slate-950"><FormattedMathText text="\(S\)" /></strong></li>
                </ul>
              </div>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-200/50 p-3 rounded-2xl text-[10.5px] text-indigo-950 font-bold leading-normal">
              <span className="font-black text-indigo-900 block mb-0.5">🔍 Ý NGHĨA VẬT LÝ</span>
              Áp suất khí tỉ lệ thuận với mật độ phân tử khí <FormattedMathText text="\(\mu\)" />, khối lượng phân tử <FormattedMathText text="\(m\)" /> và tốc độ bình phương trung bình <FormattedMathText text="\(\overline{v^2}\)" />. Khi tăng mật độ hoặc đun nóng để tăng tốc độ phân tử, áp suất sẽ tăng tương ứng.
            </div>
          </div>

          {/* Card 2: Động năng phân tử và Hằng số Boltzmann */}
          <div className="bg-gradient-to-b from-slate-50 to-slate-100/40 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block text-[10px] font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
                Động năng tịnh tiến & Nhiệt độ
              </span>
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-center shadow-inner">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide">ĐỘNG NĂNG TRUNG BÌNH PHÂN TỬ</span>
                <div className="text-xl font-black text-emerald-900 py-1">
                  <FormattedMathText text="\(\bar{E}_{\text{đ}} = \frac{1}{2} m \cdot \overline{v^2} = \frac{3}{2} k \cdot T\)" />
                </div>
                <div className="w-full border-t border-slate-200 my-1"></div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide">MỐI LIÊN HỆ ÁP SUẤT - ĐỘNG NĂNG</span>
                <div className="text-lg font-black text-emerald-950 py-1">
                  <FormattedMathText text="\(p = \frac{2}{3} \mu \cdot \bar{E}_{\text{đ}}\)" />
                </div>
              </div>

              <div className="text-[11px] text-slate-800 space-y-2 font-semibold">
                <p className="font-extrabold text-slate-900 border-b pb-1">Các đại lượng trong công thức:</p>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li><strong className="text-slate-950"><FormattedMathText text="\(\bar{E}_{\text{đ}}\)" /></strong>: Động năng tịnh tiến trung bình của một phân tử khí (đơn vị: <code className="bg-slate-100 px-1 rounded">J</code>)</li>
                  <li><strong className="text-slate-950"><FormattedMathText text="\(k\)" /></strong>: Hằng số Boltzmann (<span className="inline-flex items-center"><FormattedMathText text="\(k = 1,38 \cdot 10^{-23}\text{ J/K}\)" /></span>)</li>
                  <li><strong className="text-slate-950"><FormattedMathText text="\(T\)" /></strong>: Nhiệt độ tuyệt đối của chất khí (đơn vị: <code className="bg-slate-100 px-1 rounded">K</code>, với <span className="inline-flex items-center"><FormattedMathText text="\(T(\text{K}) = t(^{\circ}\text{C}) + 273\)" /></span>)</li>
                </ul>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200/50 p-3 rounded-2xl text-[10.5px] text-emerald-950 font-bold leading-normal">
              <span className="font-black text-emerald-900 block mb-0.5">🔍 Ý NGHĨA VẬT LÝ</span>
              Nhiệt độ tuyệt đối <FormattedMathText text="\(T\)" /> là thước đo trực tiếp của động năng tịnh tiến trung bình phân tử. Động năng phân tử không phụ thuộc vào bản chất chất khí mà chỉ phụ thuộc vào nhiệt độ tuyệt đối của hệ khí đó.
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-b from-sky-50 to-sky-100/35 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 shadow-sm text-slate-950 space-y-2.5">
          <div className="flex items-center gap-1.5 text-cyan-900 font-black text-xs">
            <CheckCircle2 className="h-4.5 w-4.5 text-cyan-600 shrink-0" />
            <span>KẾT LUẬN CỐT LÕI (EM ĐÃ HỌC)</span>
          </div>
          <ul className="list-disc pl-4 space-y-2 text-slate-800 leading-relaxed text-[11px] font-bold">
            <li>Chuyển động Brown của hạt khói chứng minh trực tiếp chất khí được cấu tạo từ các phân tử khí luôn chuyển động hỗn loạn không ngừng.</li>
            <li>Động học phân tử: phân tử khí có kích thước rất nhỏ, ở cách rất xa nhau, lực liên kết rất yếu, tốc độ chuyển động tỉ lệ thuận với nhiệt độ tuyệt đối T.</li>
            <li>Sự va chạm của các phân tử khí lên thành bình chứa là nguồn gốc tạo nên áp suất chất khí vĩ mô tác dụng lên thành bình.</li>
            <li>Khí lí tưởng là mô hình đơn giản coi phân tử là chất điểm, bỏ qua lực tương tác tầm xa, va chạm hoàn toàn đàn hồi.</li>
          </ul>
        </div>

        <div className="bg-gradient-to-b from-indigo-50 to-indigo-100/35 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 shadow-sm text-slate-950 space-y-2.5">
          <div className="flex items-center gap-1.5 text-indigo-900 font-black text-xs">
            <Sparkles className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
            <span>ĐÁNH GIÁ NĂNG LỰC (EM CÓ THỂ)</span>
          </div>
          <ul className="list-disc pl-4 space-y-2 text-slate-800 leading-relaxed text-[11px] font-bold">
            <li>Dùng mô hình động học phân tử để giải thích vì sao nén khí trong bơm xilanh tiêm lại cảm thấy nặng tay (mật độ phân tử tăng làm tần suất va chạm tăng, tăng áp suất dội ngược).</li>
            <li>Giải thích cơ chế khí trong quả bóng bàn bẹp tự phồng căng trở lại khi gặp nước nóng (nhiệt độ tăng, động năng trung bình và tốc độ phân tử tăng nảy mạnh lên thành bình, thắng áp suất khí quyển bên ngoài).</li>
            <li>Hiểu vì sao vỏ bình khí gas, bình dưỡng khí lặn phải chế tạo thép siêu dày chịu lực nhằm chống lại hàng tỉ va chạm phân tử khí áp lực cao mỗi giây.</li>
          </ul>
        </div>
      </div>

      {/* HIGHLIGHT BOX: EXAM FOCUS */}
      <div className="bg-gradient-to-b from-purple-50 to-indigo-50/40 border-2 border-purple-250 border-b-[6px] border-b-purple-350 rounded-3xl p-5 text-slate-950 shadow-sm space-y-3.5">
        <div className="flex items-center gap-2 border-b-2 border-purple-200 pb-2">
          <BookOpen className="h-5 w-5 text-purple-700 shrink-0" />
          <span className="text-xs font-black text-purple-800 uppercase tracking-wider">TÓM TẮT TRỌNG TÂM - ÔN THI TỐT NGHIỆP THPT BÀI 8</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-900 leading-relaxed font-bold">
          <div className="bg-white border-2 border-purple-200/50 p-3.5 rounded-2xl shadow-sm text-slate-950 space-y-1">
            <span className="font-black text-purple-900 block mb-1">1. CHỨNG CỨ CHUYỂN ĐỘNG BROWNIAN</span>
            Chuyển động hỗn loạn dích dắc của hạt khói do va chạm không cân bằng của phân tử không khí. Hạt khói càng nhỏ, nhiệt độ càng cao thì chuyển động dích dắc càng nhanh và rõ rệt.
          </div>
          <div className="bg-white border-2 border-purple-200/50 p-3.5 rounded-2xl shadow-sm text-slate-950 space-y-1">
            <span className="font-black text-purple-900 block mb-1">2. CƠ CHẾ GÂY ÁP SUẤT VĨ MÔ</span>
            Áp suất khí xuất phát từ xung lượng truyền cho thành bình qua va chạm đàn hồi vi mô: <code className="bg-purple-100/50 border border-purple-200 px-1 rounded font-black font-mono">p = F / S</code>. Áp suất tỉ lệ thuận với mật độ phân tử khí và tốc độ bình phương trung bình.
          </div>
          <div className="bg-white border-2 border-purple-200/50 p-3.5 rounded-2xl shadow-sm text-slate-950 space-y-1">
            <span className="font-black text-purple-900 block mb-1">3. MÔ HÌNH KHÍ LÍ TƯỞNG THPT</span>
            Khắc ghi 3 điều kiện: là chất điểm (thể tích bằng không), chỉ tương tác hút/đẩy khi va chạm trực tiếp (thế năng tương tác bằng không), va chạm hoàn toàn đàn hồi bảo toàn động năng vĩ mô.
          </div>
        </div>
      </div>
    </div>
  );
}
