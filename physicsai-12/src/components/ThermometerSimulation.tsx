import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Flame, Info, Thermometer, ShieldCheck, Cpu } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface Landmark {
  temp: number;
  name: string;
  desc: string;
  color: string;
}

const LANDMARKS: Landmark[] = [
  { temp: -273.15, name: "Không độ tuyệt đối", desc: "Độ không tuyệt đối (0 K). Động năng chuyển động nhiệt phân tử bằng 0.", color: "from-blue-600 to-indigo-700" },
  { temp: -183.0, name: "Sôi Oxy lỏng", desc: "Nhiệt độ hóa hơi của Oxy lỏng (-183 °C / 90.15 K).", color: "from-sky-500 to-blue-600" },
  { temp: 0.0, name: "Nước đá đang tan", desc: "Nhiệt độ nóng chảy của nước đá ở áp suất chuẩn (0 °C / 273.15 K).", color: "from-teal-400 to-cyan-500" },
  { temp: 0.01, name: "Điểm ba của nước", desc: "Điểm ba đặc biệt: nước đồng tồn tại rắn, lỏng, khí (0.01 °C / 273.16 K).", color: "from-emerald-400 to-teal-500" },
  { temp: 37.0, name: "Thân nhiệt chuẩn", desc: "Nhiệt độ trung bình của cơ thể người khỏe mạnh (37 °C / 310.15 K).", color: "from-amber-400 to-orange-500" },
  { temp: 100.0, name: "Nước tinh khiết sôi", desc: "Nhiệt độ sôi của nước tinh khiết dưới áp suất tiêu chuẩn (100 °C / 373.15 K).", color: "from-orange-500 to-red-600" },
  { temp: 200.0, name: "Sấy tiệt trùng", desc: "Môi trường nhiệt độ công nghiệp cao (200 °C / 473.15 K).", color: "from-red-600 to-rose-700" }
];

export default function ThermometerSimulation() {
  const [tempC, setTempC] = useState<number>(25.0); // Starts at room temperature 25 °C
  const [isAutoHeating, setIsAutoHeating] = useState<boolean>(false);
  const [autoDirection, setAutoDirection] = useState<"up" | "down">("up");
  const animationRef = useRef<number | null>(null);

  // Microscopic particles simulation state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; color: string }[]>([]);

  // Initialize particles
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * 140 + 10,
        y: Math.random() * 110 + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: "rgb(56, 189, 248)"
      });
    }
    particlesRef.current = particles;
  }, []);

  // Update canvas based on temperature
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isMounted = true;
    const T_kelvin = tempC + 273.15;
    
    // Scale velocity with sqrt of absolute temperature (Kelvin)
    // Absolute Zero (0 K) => speed = 0
    const speedFactor = Math.sqrt(Math.max(0, T_kelvin)) * 0.15;

    const render = () => {
      if (!isMounted) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw container box with 3D edge
      ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

      // Particle update and rendering
      particlesRef.current.forEach((p) => {
        // Update positions with temperature-scaled velocity
        if (speedFactor > 0) {
          p.x += p.vx * speedFactor;
          p.y += p.vy * speedFactor;
        }

        // Boundary collision
        const radius = 4;
        if (p.x < radius || p.x > canvas.width - radius) {
          p.vx = -p.vx;
          p.x = Math.max(radius, Math.min(canvas.width - radius, p.x));
        }
        if (p.y < radius || p.y > canvas.height - radius) {
          p.vy = -p.vy;
          p.y = Math.max(radius, Math.min(canvas.height - radius, p.y));
        }

        // Determine particle color based on temperature
        let color = "rgb(56, 189, 248)"; // Cold blue
        if (tempC > 100) {
          color = "rgb(239, 68, 68)"; // Hot red
        } else if (tempC > 30) {
          color = "rgb(245, 158, 11)"; // Warm orange
        } else if (tempC > 0) {
          color = "rgb(16, 185, 129)"; // Mild green
        } else if (tempC <= -150) {
          color = "rgb(99, 102, 241)"; // Deep freeze indigo
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "rgba(15, 23, 42, 0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Show Absolute Zero alert on canvas if 0 K is met
      if (T_kelvin <= 0.05) {
        ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "bold 9px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#60a5fa";
        ctx.textAlign = "center";
        ctx.fillText("0 K: ĐỘ KHÔNG TUYỆT ĐỐI", canvas.width / 2, canvas.height / 2 - 4);
        ctx.font = "8px 'Inter', sans-serif";
        ctx.fillStyle = "#cbd5e1";
        ctx.fillText("Mọi chuyển động phân tử dừng lại", canvas.width / 2, canvas.height / 2 + 8);
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isMounted = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [tempC]);

  // Auto-heating animation loops
  useEffect(() => {
    let interval: any;
    if (isAutoHeating) {
      interval = setInterval(() => {
        setTempC((prev) => {
          let step = autoDirection === "up" ? 2.5 : -2.5;
          let next = prev + step;
          if (next >= 300) {
            setAutoDirection("down");
            return 300;
          }
          if (next <= -273.15) {
            setAutoDirection("up");
            return -273.15;
          }
          return Math.round(next * 100) / 100;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAutoHeating, autoDirection]);

  // Calculations for modern sensors
  const tempK = parseFloat((tempC + 273.15).toFixed(2));
  const tempF = parseFloat((tempC * 1.8 + 32).toFixed(2));

  // Platinum platinum resistance R(t) = R0(1 + alpha * t + beta * t^2)
  // standard parameters for Pt100: alpha = 3.9083e-3, beta = -5.775e-7
  const R0 = 100.0;
  const alpha = 3.9083e-3;
  const beta = -5.775e-7;
  const resistance = tempC >= 0 
    ? parseFloat((R0 * (1 + alpha * tempC + beta * Math.pow(tempC, 2))).toFixed(2))
    : parseFloat((R0 * (1 + alpha * tempC + beta * Math.pow(tempC, 2) - 4.183e-12 * Math.pow(tempC - 100, 4))).toFixed(2));

  // Thermocouple Type T (Copper-Constantan) voltage (mV) approx: E = 42.5 uV/K * tempC
  const thermocoupleVoltage = parseFloat(((42.5 * tempC) / 1000).toFixed(3));

  // Wien's Law maximum infrared wavelength: lambda_max * T = 2.8978e-3 m*K
  // lambda_max = 2.8978e-3 / T_kelvin in meters = 2897.8 / T_kelvin in micrometers (um)
  const wienWavelength = tempK > 0 
    ? parseFloat((2897.8 / tempK).toFixed(3))
    : null;

  // Thermometer liquid column percentage mapping from -273.15 to 300
  const totalSpan = 300 - (-273.15);
  const colPercentage = Math.min(100, Math.max(0, ((tempC - (-273.15)) / totalSpan) * 100));

  return (
    <div className="space-y-6">
      {/* Simulation dashboard layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Column 1: Vertical 3D Thermometer column (3 cols) */}
        <div className="lg:col-span-3 bg-slate-950/80 border border-slate-850 rounded-2xl p-4 flex flex-col items-center justify-between min-h-[420px] relative shadow-inner">
          <span className="text-[9px] font-mono text-cyan-400 font-extrabold tracking-widest uppercase">Cột Nhiệt Kế Thủy Tinh</span>
          
          <div className="relative w-20 h-72 flex items-center justify-center mt-3">
            {/* Thermometer scale ticks */}
            <div className="absolute left-1.5 top-0 bottom-8 flex flex-col justify-between text-[7px] font-mono text-slate-500 font-bold select-none">
              <span>300°C</span>
              <span>200°C</span>
              <span>100°C</span>
              <span>0°C</span>
              <span>-100°C</span>
              <span>-200°C</span>
              <span>-273°C</span>
            </div>

            {/* Glass Tube Frame */}
            <div className="w-4 h-64 bg-slate-900 border-2 border-slate-700/80 rounded-full relative overflow-hidden flex flex-col justify-end">
              {/* Dynamic Liquid Column */}
              <div 
                className={`w-full rounded-b-full transition-all duration-75 relative`}
                style={{ 
                  height: `${colPercentage}%`, 
                  backgroundImage: tempC > 100 
                    ? "linear-gradient(to top, #be123c, #ef4444, #f87171)" 
                    : tempC > 0 
                    ? "linear-gradient(to top, #0f766e, #14b8a6, #67e8f9)" 
                    : "linear-gradient(to top, #312e81, #4f46e5, #818cf8)"
                }}
              >
                {/* Glossy overlay sheen */}
                <div className="absolute inset-y-0 left-0.5 w-1 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Mercury Bulb Base */}
            <div className="absolute bottom-1 w-9 h-9 rounded-full border-2 border-slate-700/80 flex items-center justify-center shadow-lg bg-slate-900 overflow-hidden">
              <div 
                className={`w-7 h-7 rounded-full transition-colors duration-300`} 
                style={{ 
                  backgroundColor: tempC > 100 
                    ? "#ef4444" 
                    : tempC > 0 
                    ? "#14b8a6" 
                    : "#4f46e5"
                }}
              />
            </div>
            
            {/* Right indicator flag */}
            <div className="absolute right-[-45px] transition-all duration-75" style={{ bottom: `calc(${colPercentage}% * 0.77 + 24px)` }}>
              <div className="bg-yellow-400 text-slate-950 text-[9px] font-mono font-black px-1.5 py-0.5 rounded shadow-md border border-yellow-500 flex items-center shrink-0">
                ◀ {tempC.toFixed(0)}°C
              </div>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <span className="text-[9px] text-slate-400 font-medium italic">Thang chia trải dài từ mốc tuyệt đối đến 300°C</span>
          </div>
        </div>

        {/* Column 2: 3D Temperature scale readouts & Microscopic visualizer (5 cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {/* Readout Panels */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Celsius */}
            <div className="bg-slate-950 border-2 border-slate-800 border-b-[4px] border-b-slate-700/80 rounded-xl p-3 text-center hover:translate-y-[1px] transition-all cursor-default">
              <span className="text-[8.5px] font-mono text-teal-400 font-extrabold uppercase">CELSIUS</span>
              <div className="text-sm font-mono font-black text-white mt-1">{tempC.toFixed(2)}</div>
              <span className="text-[9px] text-slate-500 font-black">°C</span>
            </div>

            {/* Kelvin */}
            <div className="bg-slate-950 border-2 border-slate-800 border-b-[4px] border-b-slate-700/80 rounded-xl p-3 text-center hover:translate-y-[1px] transition-all cursor-default">
              <span className="text-[8.5px] font-mono text-purple-400 font-extrabold uppercase">KELVIN (T)</span>
              <div className="text-sm font-mono font-black text-white mt-1">{tempK.toFixed(2)}</div>
              <span className="text-[9px] text-slate-500 font-black">K</span>
            </div>

            {/* Fahrenheit */}
            <div className="bg-slate-950 border-2 border-slate-800 border-b-[4px] border-b-slate-700/80 rounded-xl p-3 text-center hover:translate-y-[1px] transition-all cursor-default">
              <span className="text-[8.5px] font-mono text-amber-400 font-extrabold uppercase">FAHRENHEIT</span>
              <div className="text-sm font-mono font-black text-white mt-1">{tempF.toFixed(2)}</div>
              <span className="text-[9px] text-slate-500 font-black">°F</span>
            </div>
          </div>

          {/* Interactive slider */}
          <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1"><Thermometer className="h-4 w-4 text-cyan-400" /> Kéo thanh trượt để thay đổi:</span>
              <span className="text-yellow-400 font-mono text-sm">{tempC.toFixed(2)} °C</span>
            </div>
            
            <input 
              type="range"
              min="-273.15"
              max="300"
              step="0.05"
              value={tempC}
              onChange={(e) => {
                setTempC(parseFloat(e.target.value));
                setIsAutoHeating(false);
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            
            <div className="flex justify-between text-[9px] font-mono text-slate-500 font-extrabold">
              <span>-273.15°C (Tuyệt đối)</span>
              <span>0°C</span>
              <span>300°C (Cực đại)</span>
            </div>
          </div>

          {/* Microscopic particle canvas */}
          <div className="bg-slate-950/60 border border-slate-850 rounded-2xl p-4 space-y-2 flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="text-[9.5px] font-mono text-cyan-400 font-extrabold uppercase">Chuyển động nhiệt phân tử (Bằng chứng vi mô)</span>
              <span className="text-[8.5px] bg-slate-900 border border-slate-800 text-slate-400 font-mono px-1.5 py-0.5 rounded font-bold">
                T = {tempK.toFixed(1)} K
              </span>
            </div>

            <div className="w-full h-32 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-900">
              <canvas 
                ref={canvasRef} 
                width={200} 
                height={120} 
                className="w-full h-full block"
              />
            </div>

            <div className="text-[8.5px] leading-snug text-slate-400 font-medium">
              <strong>Mối liên hệ:</strong> Theo động học chất khí, động năng tịnh tiến trung bình phân tử tỉ lệ thuận với nhiệt độ tuyệt đối <span className="inline-flex items-center"><FormattedMathText text="E_đ = 1,5 * k_B * T" /></span>. Nhiệt độ Kelvin càng giảm thì phân tử di chuyển càng chậm, dừng tuyệt đối tại 0 Kelvin.
            </div>
          </div>
        </div>

        {/* Column 3: Modern electronic sensor converters & Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          {/* Controls */}
          <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4 space-y-3">
            <span className="text-[9.5px] font-mono text-slate-400 font-extrabold uppercase block border-b border-slate-900 pb-1.5">Chu trình chạy tự động</span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsAutoHeating(!isAutoHeating)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border-2 font-black text-xs cursor-pointer transition-all ${
                  isAutoHeating
                    ? "bg-rose-500 hover:bg-rose-400 text-white border-rose-600 shadow-[0_3px_0_0_#be123c] translate-y-[1px]"
                    : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 border-cyan-600 shadow-[0_3px_0_0_#0891b2]"
                }`}
              >
                {isAutoHeating ? <Pause className="h-4.5 w-4.5" /> : <Play className="h-4.5 w-4.5" />}
                {isAutoHeating ? "Dừng quét" : "Tự động quét"}
              </button>
              <button
                onClick={() => {
                  setTempC(25.0);
                  setIsAutoHeating(false);
                }}
                className="flex items-center justify-center bg-slate-900 hover:bg-slate-800 border-2 border-slate-800 text-slate-300 rounded-xl px-3 py-2.5 cursor-pointer shadow-[0_3px_0_0_#1e293b]"
              >
                <RotateCcw className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Electronic Sensor Values (Beautiful 3D styled boxes with high contrast) */}
          <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4 space-y-3">
            <span className="text-[9.5px] font-mono text-cyan-400 font-extrabold uppercase block border-b border-slate-900 pb-1.5">Đại lượng vật lý đo đạc của cảm biến</span>
            
            <div className="space-y-2.5 text-[11px] leading-relaxed">
              {/* 1. Platinum Resistance Pt100 */}
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-2.5 flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-[8.5px] font-mono font-bold text-slate-500 block uppercase">Nhiệt kế điện trở Platin (R_t)</span>
                  <span className="text-slate-300 font-semibold flex items-center"><FormattedMathText text="R_t = R_0 * (1 + \alpha * t)" /></span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-cyan-400 font-mono">{resistance.toFixed(2)} Ω</div>
                  <span className="text-[8px] text-slate-500 font-bold block">R_0 = 100 Ω</span>
                </div>
              </div>

              {/* 2. Thermocouple Suất điện động */}
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-2.5 flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-[8.5px] font-mono font-bold text-slate-500 block uppercase">Suất điện động Cặp nhiệt điện</span>
                  <span className="text-slate-300 font-semibold flex items-center"><FormattedMathText text="E = k * \Delta T" /></span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-purple-400 font-mono">
                    {thermocoupleVoltage >= 0 ? thermocoupleVoltage.toFixed(3) : "0.000"} mV
                  </div>
                  <span className="text-[8px] text-slate-500 font-bold block">k = 42.5 μV/K</span>
                </div>
              </div>

              {/* 3. Wien Radiation Wavelength */}
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-2.5 flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-[8.5px] font-mono font-bold text-slate-500 block uppercase">Định luật dịch chuyển Wien</span>
                  <span className="text-slate-300 font-semibold flex items-center"><FormattedMathText text="\lambda_max = b / T" /></span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-amber-400 font-mono">
                    {wienWavelength ? `${wienWavelength.toFixed(2)} μm` : "N/A"}
                  </div>
                  <span className="text-[8px] text-slate-500 font-bold block">Đỉnh phát xạ cực đại</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Landmark Grid (Beautiful 3D blocks with warm/cool gradient borders) */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase block tracking-wider">Chọn nhanh các mốc nhiệt độ đặc biệt (Bài học thực hành)</span>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {LANDMARKS.map((mark, idx) => {
            const isActive = Math.abs(tempC - mark.temp) < 0.1;
            return (
              <button
                key={idx}
                onClick={() => {
                  setTempC(mark.temp);
                  setIsAutoHeating(false);
                }}
                className={`p-2.5 text-center rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between h-[76px] hover:translate-y-[-2px] hover:shadow-md ${
                  isActive 
                    ? `bg-slate-900 border-yellow-400 text-yellow-400 shadow-[0_3px_0_0_#facc15]`
                    : "bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 shadow-[0_3px_0_0_#1e293b]"
                }`}
              >
                <span className={`text-[8px] uppercase tracking-wide font-black block text-center truncate`}>
                  {mark.name}
                </span>
                <span className="text-[10px] font-mono font-black block text-center py-0.5">
                  {mark.temp === -273.15 ? "-273.15" : mark.temp}°C
                </span>
                <span className="text-[7.5px] text-slate-500 leading-none truncate font-semibold block">
                  {mark.temp === -273.15 ? "0 K" : mark.temp === 0 ? "273.15 K" : `${(mark.temp + 273.15).toFixed(0)} K`}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Active landmark detailed info box */}
        {LANDMARKS.find((m) => Math.abs(tempC - m.temp) < 0.1) && (
          <div className="bg-cyan-950/20 border border-cyan-500/15 rounded-xl p-3 flex items-start gap-3 animate-fade-in mt-2">
            <Info className="h-4.5 w-4.5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-slate-100 uppercase text-[10px] tracking-wider block font-mono">
                CHI TIẾT: {LANDMARKS.find((m) => Math.abs(tempC - m.temp) < 0.1)?.name}
              </strong>
              <p className="text-slate-300 mt-1 leading-relaxed font-medium">
                {LANDMARKS.find((m) => Math.abs(tempC - m.temp) < 0.1)?.desc}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
