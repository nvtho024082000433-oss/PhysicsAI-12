import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Flame, Info, Thermometer, ShieldCheck, Cpu } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface Substance {
  id: string;
  name: string;
  c: number; // J/kg.K
  color: string;
  particleColor: string;
  desc: string;
}

const SUBSTANCES: Substance[] = [
  { id: "water", name: "Nước lỏng", c: 4200, color: "text-blue-900 bg-blue-50 border-blue-200", particleColor: "rgb(2, 132, 199)", desc: "Có nhiệt dung riêng rất lớn, hấp thụ nhiệt nhiều và nóng lên rất chậm." },
  { id: "ice", name: "Nước đá", c: 2100, color: "text-sky-900 bg-sky-50 border-sky-200", particleColor: "rgb(3, 105, 161)", desc: "Nhiệt dung riêng bằng một nửa nước lỏng, cấu trúc tinh thể liên kết rắn." },
  { id: "air", name: "Không khí", c: 1000, color: "text-emerald-900 bg-emerald-50 border-emerald-200", particleColor: "rgb(4, 120, 87)", desc: "Nhiệt dung riêng trung bình, chất khí mật độ loãng nên truyền nhiệt đối lưu." },
  { id: "iron", name: "Sắt (Kim loại)", c: 440, color: "text-slate-900 bg-slate-50 border-slate-200", particleColor: "rgb(180, 83, 9)", desc: "Nhiệt dung riêng nhỏ, dẫn nhiệt tốt, nóng lên và nguội đi rất nhanh chóng." },
  { id: "copper", name: "Đồng (Kim loại)", c: 380, color: "text-orange-900 bg-orange-50 border-orange-200", particleColor: "rgb(194, 65, 12)", desc: "Nhiệt dung riêng rất nhỏ, dẫn nhiệt cực kỳ tốt, được ứng dụng làm lõi dẫn tản nhiệt." },
  { id: "mercury", name: "Thủy ngân", c: 140, color: "text-rose-900 bg-rose-50 border-rose-200", particleColor: "rgb(190, 24, 74)", desc: "Nhiệt dung riêng cực kỳ bé, phản ứng với nhiệt độ rất nhạy nên dùng trong các nhiệt kế." }
];

export default function SpecificHeatSimulation() {
  const [selectedSubstance, setSelectedSubstance] = useState<Substance>(SUBSTANCES[0]);
  const [mass, setMass] = useState<number>(0.2); // kg, from 0.1 to 1.0
  const [power, setPower] = useState<number>(100); // Watts (W), from 50 to 500
  const [temp, setTemp] = useState<number>(20.0); // °C, starts at room temperature
  const [time, setTime] = useState<number>(0); // seconds
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  // History data points for graphing
  const [history, setHistory] = useState<{ t: number; temp: number }[]>([{ t: 0, temp: 20.0 }]);
  
  // Canvas for microscopic molecules
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);

  // Initialize particles
  useEffect(() => {
    const particles = [];
    const count = selectedSubstance.id === "air" ? 15 : 45;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * 140 + 10,
        y: Math.random() * 100 + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      });
    }
    particlesRef.current = particles;
  }, [selectedSubstance]);

  // Microscopic molecules canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isMounted = true;
    
    // speed factor scales with current temperature in Celsius
    // hotter => faster molecular vibration/motion
    const speedFactor = Math.max(0.2, (temp + 10) / 40);

    const render = () => {
      if (!isMounted) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw glass vessel container
      ctx.strokeStyle = "rgba(71, 85, 105, 0.7)";
      ctx.lineWidth = 3;
      // Bottom line
      ctx.beginPath();
      ctx.moveTo(10, 115);
      ctx.lineTo(150, 115);
      // Left line
      ctx.lineTo(150, 5);
      // Right line
      ctx.moveTo(10, 115);
      ctx.lineTo(1, 5);
      ctx.stroke();

      // Fluid or solid substance level (based on mass)
      const liquidHeight = Math.min(105, 30 + mass * 75);
      ctx.fillStyle = selectedSubstance.id === "water" ? "rgba(14, 165, 233, 0.25)" : 
                      selectedSubstance.id === "ice" ? "rgba(14, 165, 233, 0.35)" : 
                      selectedSubstance.id === "air" ? "rgba(16, 185, 129, 0.15)" : 
                      selectedSubstance.id === "iron" ? "rgba(100, 116, 139, 0.35)" : 
                      selectedSubstance.id === "copper" ? "rgba(249, 115, 22, 0.35)" : 
                      "rgba(244, 63, 94, 0.3)";
      ctx.fillRect(10, 115 - liquidHeight, 140, liquidHeight);

      // Particle update and rendering
      particlesRef.current.forEach((p) => {
        // Update position
        if (selectedSubstance.id === "ice") {
          // Solid: vibration around stable lattice positions
          p.x += (Math.random() - 0.5) * 0.8 * speedFactor;
          p.y += (Math.random() - 0.5) * 0.8 * speedFactor;
          // Soft restore to keep inside container
          if (p.x < 15) p.x += 2;
          if (p.x > 145) p.x -= 2;
          if (p.y < (115 - liquidHeight + 10)) p.y += 2;
          if (p.y > 110) p.y -= 2;
        } else {
          // Fluids/Gases: free random walk colliding with walls
          p.x += p.vx * speedFactor;
          p.y += p.vy * speedFactor;

          const radius = 3.5;
          // Boundary collision
          if (p.x < 10 + radius || p.x > 150 - radius) {
            p.vx = -p.vx;
            p.x = Math.max(10 + radius, Math.min(150 - radius, p.x));
          }
          if (p.y < (115 - liquidHeight) + radius || p.y > 115 - radius) {
            p.vy = -p.vy;
            p.y = Math.max((115 - liquidHeight) + radius, Math.min(115 - radius, p.y));
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, 2 * Math.PI);
        ctx.fillStyle = selectedSubstance.particleColor;
        ctx.fill();
        ctx.strokeStyle = "rgba(15, 23, 42, 0.4)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw Heating element coil inside liquid at the bottom
      ctx.strokeStyle = isPlaying ? "#ef4444" : "#475569";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(35, 100);
      ctx.quadraticCurveTo(45, 90, 55, 100);
      ctx.quadraticCurveTo(65, 110, 75, 100);
      ctx.quadraticCurveTo(85, 90, 95, 100);
      ctx.quadraticCurveTo(105, 110, 115, 100);
      ctx.quadraticCurveTo(125, 90, 135, 100);
      ctx.stroke();

      requestAnimationFrame(render);
    };

    render();

    return () => {
      isMounted = false;
    };
  }, [temp, mass, selectedSubstance, isPlaying]);

  // Heating process simulation timer ticks
  useEffect(() => {
    let intervalId: any;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          const nextTime = prevTime + 1;
          
          // Calculate heat supplied: Q = P * t
          const Q_supplied = power * nextTime;
          
          // Calculate theoretical temperature rise: Δt = Q / (m * c)
          const deltaT = Q_supplied / (mass * selectedSubstance.c);
          const nextTemp = 20.0 + deltaT;

          // Limit temperature to 100 °C max for fluids, 0 °C max for ice (then melt)
          let finalTemp = nextTemp;
          if (selectedSubstance.id === "water" && nextTemp >= 100.0) {
            finalTemp = 100.0;
            setIsPlaying(false);
          } else if (selectedSubstance.id === "ice" && nextTemp >= 0.0) {
            finalTemp = 0.0;
            setIsPlaying(false);
          } else if (selectedSubstance.id === "mercury" && nextTemp >= 357.0) {
            finalTemp = 357.0; // mercury boiling point
            setIsPlaying(false);
          }

          setTemp(parseFloat(finalTemp.toFixed(1)));
          setHistory((prev) => [...prev, { t: nextTime, temp: parseFloat(finalTemp.toFixed(1)) }]);

          return nextTime;
        });
      }, 250); // Speed up tick (4 ticks = 1 second of simulation time)
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, power, mass, selectedSubstance]);

  const handleReset = () => {
    setIsPlaying(false);
    setTime(0);
    setTemp(20.0);
    setHistory([{ t: 0, temp: 20.0 }]);
  };

  // SVG Chart path calculation
  const maxTime = Math.max(60, time);
  const maxTemp = Math.max(100, temp);
  
  const chartPoints = history.map((point) => {
    const x = 30 + (point.t / maxTime) * 220;
    // scale y between 20 °C and maxTemp, padding at bottom is y=85, top is y=15
    const y = 85 - ((point.temp - 20) / (maxTemp - 20)) * 70;
    return `${x},${y}`;
  }).join(" ");

  const heatEnergyJoules = power * time;
  const heatEnergyKilojoules = (heatEnergyJoules / 1000).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Visual Workspace banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent border-l-4 border-amber-500 p-4 rounded-r-2xl">
        <h4 className="text-xs font-black text-amber-900 uppercase tracking-widest flex items-center gap-2">
          <Flame className="h-4.5 w-4.5 text-amber-600 animate-pulse" />
          MÔ PHỎNG VẬT LÍ: KHÁO SÁT NHIỆT DUNG RIÊNG CÁC CHẤT
        </h4>
        <p className="text-[11px] text-slate-800 mt-1 leading-relaxed font-bold">
          Thay đổi chất làm vật, khối lượng và công suất đun để đo đạc và so sánh trực quan nhiệt lượng cần thiết nhằm làm thay đổi nhiệt độ chất lỏng, rắn, khí theo chuẩn thực nghiệm SGK mới.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left column: Setup Panel */}
        <div className="xl:col-span-4 bg-gradient-to-b from-slate-50 to-slate-100/90 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 space-y-4 shadow-sm text-slate-900">
          <span className="text-[11px] uppercase font-mono font-black text-slate-700 tracking-wider flex items-center gap-1.5 border-b-2 border-slate-200 pb-2.5">
            <Cpu className="h-4 w-4 text-cyan-600" />
            Cấu hình bộ thí nghiệm
          </span>

          {/* 1. Substance select */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-800 uppercase">1. Chọn chất khảo sát:</label>
            <div className="grid grid-cols-2 gap-2">
              {SUBSTANCES.map((sub) => {
                const isSelected = selectedSubstance.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubstance(sub);
                      handleReset();
                    }}
                    className={`px-3 py-2 text-left rounded-2xl border-2 text-xs font-black transition-all flex flex-col justify-between cursor-pointer min-h-[58px] ${
                      isSelected
                        ? "bg-amber-50 border-amber-400 text-amber-950 font-black shadow-inner translate-y-[1px]"
                        : "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span>{sub.name}</span>
                    <span className="inline-flex items-center text-[9px] font-extrabold mt-0.5">
                      <FormattedMathText text={`${sub.c} J/(kg.K)`} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Mass slider */}
          <div className="space-y-2 pt-2 border-t-2 border-slate-200/60">
            <div className="flex justify-between items-center text-[10px] font-black text-slate-800 uppercase">
              <span>2. Khối lượng vật (m):</span>
              <span className="text-amber-600 font-mono font-black text-xs bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">{mass} kg</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.1"
              value={mass}
              onChange={(e) => {
                setMass(parseFloat(e.target.value));
                handleReset();
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono font-extrabold">
              <span>0,1 kg</span>
              <span>0,5 kg</span>
              <span>1,0 kg</span>
            </div>
          </div>

          {/* 3. Power slider */}
          <div className="space-y-2 pt-2 border-t-2 border-slate-200/60">
            <div className="flex justify-between items-center text-[10px] font-black text-slate-800 uppercase">
              <span>3. Công suất lò sưởi (P):</span>
              <span className="text-cyan-700 font-mono font-black text-xs bg-cyan-50 px-2 py-0.5 rounded-lg border border-cyan-200">{power} W</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={power}
              onChange={(e) => {
                setPower(parseInt(e.target.value));
                handleReset();
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono font-extrabold">
              <span>50 W</span>
              <span>250 W</span>
              <span>500 W</span>
            </div>
          </div>

          {/* Action triggers */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`py-3 rounded-2xl text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-all border-2 border-b-[5px] active:translate-y-[2px] active:border-b-[2px] ${
                isPlaying
                  ? "bg-amber-500 text-slate-950 border-amber-600 hover:bg-amber-400 font-black shadow-sm"
                  : "bg-cyan-500 text-slate-950 border-cyan-600 hover:bg-cyan-400 font-black shadow-sm"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" /> Dừng đun
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Bật nguồn đun
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 border-2 border-slate-300 border-b-[5px] border-b-slate-400 hover:border-slate-400 active:translate-y-[2px] active:border-b-[2px] rounded-2xl text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <RotateCcw className="h-4 w-4 text-slate-600" /> Thiết lập lại
            </button>
          </div>

          <div className="p-3.5 bg-amber-50 border-2 border-amber-200 rounded-2xl text-[11px] leading-relaxed text-amber-950 font-bold shadow-inner">
            <strong className="text-amber-900 font-black">Đặc tính chất chọn: </strong>
            {selectedSubstance.desc}
          </div>
        </div>

        {/* Center column: Live visual animation & SVG plotting */}
        <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visual Canvas Panel */}
          <div className="bg-gradient-to-b from-slate-50 to-slate-100/90 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 flex flex-col items-center justify-between min-h-[300px] shadow-sm text-slate-900">
            <span className="text-[11px] uppercase font-mono font-black text-slate-700 tracking-wider block mb-2 text-center w-full">
              Khối chất đun trong bình cách nhiệt
            </span>

            <div className="relative w-full flex justify-center items-end py-4">
              {/* Thermometer Overlay */}
              <div className="absolute left-4 bottom-4 flex flex-col items-center bg-white border-2 border-slate-200 rounded-2xl p-2.5 w-20 shadow-md">
                <Thermometer className={`h-6 w-6 ${temp > 60 ? "text-red-500" : temp > 35 ? "text-amber-500" : "text-sky-500"} animate-pulse mb-1`} />
                <span className="text-[14px] font-mono font-black text-slate-950">{temp}°C</span>
                <span className="text-[8px] font-mono text-slate-500 font-extrabold uppercase mt-0.5">Nhiệt độ</span>
              </div>

              {/* Flame animation if heated */}
              {isPlaying && (
                <div className="absolute bottom-1 w-24 h-12 flex justify-center items-end pointer-events-none z-10 opacity-90">
                  <div className="w-4 h-8 bg-amber-500 rounded-full blur-[1px] animate-bounce mx-0.5" />
                  <div className="w-5 h-10 bg-red-500 rounded-full blur-[2px] animate-pulse mx-0.5" />
                  <div className="w-4 h-7 bg-orange-400 rounded-full blur-[1.5px] animate-bounce mx-0.5" />
                </div>
              )}

              {/* The glass vessel Canvas */}
              <canvas
                ref={canvasRef}
                width={160}
                height={120}
                className="bg-transparent pointer-events-none relative z-10"
              />
            </div>

            {/* Display digital timer & parameters */}
            <div className="w-full grid grid-cols-3 gap-2 bg-white border-2 border-slate-200 border-b-[4px] border-b-slate-300 p-3 rounded-2xl font-mono text-center shadow-inner">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[9px] text-slate-500 font-extrabold uppercase flex items-center gap-1">Thời gian (<FormattedMathText text="\tau" />)</span>
                <span className="text-sm font-black text-slate-950 mt-1">{time} s</span>
              </div>
              <div className="flex flex-col items-center justify-center border-x-2 border-slate-200">
                <span className="text-[9px] text-slate-500 font-extrabold uppercase flex items-center gap-1">Nhiệt lượng (<FormattedMathText text="Q" />)</span>
                <span className="text-sm font-black text-amber-700 mt-1">{heatEnergyKilojoules} kJ</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-[9px] text-slate-500 font-extrabold uppercase flex items-center gap-1">Độ tăng nhiệt (<FormattedMathText text="\Delta t" />)</span>
                <span className="text-sm font-black text-cyan-700 mt-1">{(temp - 20.0).toFixed(1)} °C</span>
              </div>
            </div>
          </div>

          {/* Plotting panel */}
          <div className="bg-gradient-to-b from-slate-50 to-slate-100/90 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 flex flex-col justify-between shadow-sm text-slate-900">
            <span className="text-[11px] uppercase font-mono font-black text-slate-700 tracking-wider block mb-2 text-center">
              Đồ thị biểu diễn nhiệt độ t theo thời gian đun τ
            </span>

            {/* SVG Plotting stage */}
            <div className="w-full h-[180px] bg-white rounded-2xl border-2 border-slate-200 p-2.5 relative flex items-center justify-center shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 280 110">
                {/* Axes and gridlines */}
                <line x1="30" y1="85" x2="270" y2="85" stroke="#475569" strokeWidth="1.5" />
                <line x1="30" y1="15" x2="30" y2="85" stroke="#475569" strokeWidth="1.5" />
                
                {/* Horiz Grid lines */}
                <line x1="30" y1="50" x2="270" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="30" y1="15" x2="270" y2="15" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2,2" />

                {/* Axis labels */}
                <text x="270" y="93" fill="#1e293b" textAnchor="end" className="text-[7px] font-mono font-black">τ (giây)</text>
                <text x="28" y="12" fill="#1e293b" textAnchor="end" className="text-[7px] font-mono font-black">t (°C)</text>

                {/* Standard Marks */}
                <text x="24" y="87" fill="#475569" className="text-[7px] font-mono font-black">20°</text>
                <text x="24" y="52" fill="#475569" className="text-[7px] font-mono font-black">{Math.round((maxTemp + 20) / 2)}°</text>
                <text x="24" y="18" fill="#475569" className="text-[7px] font-mono font-black">{maxTemp}°</text>
                
                <text x="30" y="93" fill="#475569" textAnchor="middle" className="text-[7px] font-mono font-black">0</text>
                <text x="150" y="93" fill="#475569" textAnchor="middle" className="text-[7px] font-mono font-black">{Math.round(maxTime / 2)}</text>
                <text x="250" y="93" fill="#475569" textAnchor="middle" className="text-[7px] font-mono font-black">{maxTime}</text>

                {/* Plotting points line */}
                {history.length > 1 && (
                  <polyline
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2.5"
                    points={chartPoints}
                    className="transition-all duration-300"
                  />
                )}

                {/* Final dot marker */}
                {history.length > 0 && (
                  <circle
                    cx={30 + (time / maxTime) * 220}
                    cy={85 - ((temp - 20) / (maxTemp - 20)) * 70}
                    r="4"
                    fill="#dc2626"
                  />
                )}
              </svg>
            </div>

            {/* Real-time calculated evaluation formula box */}
            <div className="bg-sky-50 border-2 border-sky-150 p-3 rounded-2xl mt-3 space-y-1.5 text-xs shadow-inner">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-sky-950 font-extrabold">Công thức tính toán:</span>
                <span className="inline-flex items-center font-black"><FormattedMathText text="c = Q / (m * \Delta t)" /></span>
              </div>
              <div className="flex justify-between items-center text-[11px] pt-1.5 border-t border-sky-200">
                <span className="text-sky-950 font-extrabold">Trị số thực nghiệm:</span>
                <span className="text-slate-900 font-medium flex items-center gap-1">
                  {time > 0 ? (
                    <span className="flex items-center gap-1">
                      <FormattedMathText text={`c = ${heatEnergyJoules} / (${mass} * ${(temp - 20.0).toFixed(1)}) =`} />{" "}
                      <strong className="text-amber-800 font-black inline-flex items-center">
                        <FormattedMathText text={`${Math.round(heatEnergyJoules / (mass * Math.max(0.1, temp - 20.0)))} J/(kg.K)`} />
                      </strong>
                    </span>
                  ) : (
                    <span className="text-slate-500 font-bold">Đang chờ bật nguồn điện...</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pedagogical Blocks (Goal, Phenomenon, Observation note, Conclusion) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Box 1: Mục tiêu & Hiện tượng */}
        <div className="bg-gradient-to-b from-slate-50 to-slate-100/90 border-2 border-slate-200 border-b-[5px] border-b-slate-300 p-5 rounded-3xl shadow-sm text-slate-900 space-y-3">
          <div className="space-y-1">
            <h5 className="text-[12px] font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="text-sm">🎯</span> MỤC TIÊU QUAN SÁT
            </h5>
            <p className="text-xs text-slate-800 leading-relaxed font-bold">
              Khảo sát sự thay đổi nhiệt độ theo thời gian đun của các chất khác nhau dưới cùng tác động của nguồn sưởi ổn định. Rút ra mối liên hệ tỉ lệ giữa nhiệt năng Q, khối lượng m và sự thay đổi nhiệt độ ΔT.
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t-2 border-slate-200">
            <h5 className="text-[12px] font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="text-sm">🔥</span> HIỆN TƯỢNG QUAN SÁT ĐƯỢC
            </h5>
            <p className="text-xs text-slate-800 leading-relaxed font-bold">
              Khi bật nguồn điện, oát kế bắt đầu tính điện năng tỏa nhiệt Q. Ở cấp độ vi mô, các phân tử chất lỏng/khí chuyển động hỗn loạn nhanh lên rõ rệt (vận tốc tăng vọt). Biểu đồ nhiệt độ đi lên dạng một đường thẳng dốc nghiêng có độ dốc không đổi.
            </p>
          </div>
        </div>

        {/* Box 2: Nhận xét & Kết luận */}
        <div className="bg-gradient-to-b from-slate-50 to-slate-100/90 border-2 border-slate-200 border-b-[5px] border-b-slate-300 p-5 rounded-3xl shadow-sm text-slate-900 space-y-3">
          <div className="space-y-1">
            <h5 className="text-[12px] font-black text-cyan-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="text-sm">💡</span> NHẬN XÉT SƯ PHẠM
            </h5>
            <p className="text-xs text-slate-800 leading-relaxed font-bold">
              Với cùng khối lượng m và công suất đun P, chất nào có nhiệt dung riêng c lớn hơn (như Nước) sẽ làm đường đồ thị nghiêng ít hơn (nhiệt độ tăng chậm hơn). Ngược lại, kim loại có c rất nhỏ (như Đồng, Sắt) nóng lên cực kỳ nhanh, đồ thị dốc vọt đứng.
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t-2 border-slate-200">
            <h5 className="text-[12px] font-black text-cyan-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="text-sm">🏆</span> KẾT LUẬN CỐT LÕI
            </h5>
            <p className="text-xs text-slate-800 leading-relaxed font-bold">
              Nhiệt lượng Q cần thiết cung cấp để làm nóng một khối lượng chất m tăng lên độ chênh lệch ΔT tỉ lệ thuận với khối lượng, độ chênh lệch nhiệt độ và phụ thuộc trực tiếp vào bản chất từng chất thông qua hệ số góc tỉ lệ đặc trưng gọi là <strong className="text-slate-950 font-black">Nhiệt dung riêng c (Q = mcΔT)</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
