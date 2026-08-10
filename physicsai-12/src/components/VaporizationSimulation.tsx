import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Flame, Info, Thermometer, ShieldCheck, Activity, Wind } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface LiquidSubstance {
  id: string;
  name: string;
  boilingPoint: number; // °C
  L: number; // J/kg (heat of vaporization)
  cLiquid: number; // J/kg.K
  color: string;
  particleColor: string;
  desc: string;
}

const SUBSTANCES: LiquidSubstance[] = [
  {
    id: "water",
    name: "Nước tinh khiết (H₂O)",
    boilingPoint: 100,
    L: 2260000, // 2.26 * 10^6 J/kg
    cLiquid: 4200,
    color: "rgba(14, 165, 233, 0.25)",
    particleColor: "#0284c7",
    desc: "Nước có nhiệt hóa hơi riêng L rất lớn do mạng lưới liên kết hydro cực kỳ bền vững giữa các phân tử. Cần một năng lượng lớn để hóa hơi hoàn toàn."
  },
  {
    id: "ethanol",
    name: "Rượu Ethanol (C₂H₅OH)",
    boilingPoint: 78,
    L: 857000, // 8.57 * 10^5 J/kg
    cLiquid: 2440,
    color: "rgba(244, 63, 94, 0.22)",
    particleColor: "#be123c",
    desc: "Rượu có nhiệt độ sôi 78 °C và nhiệt hóa hơi riêng trung bình. Liên kết phân tử phân cực nhẹ, dễ bay hơi hơn nước."
  },
  {
    id: "ether",
    name: "Chất lỏng Ether",
    boilingPoint: 34.5,
    L: 400000, // 4.0 * 10^5 J/kg
    cLiquid: 2330,
    color: "rgba(16, 185, 129, 0.22)",
    particleColor: "#047857",
    desc: "Ether là chất hữu cơ cực kỳ dễ bay hơi, sôi ở nhiệt độ rất thấp (34.5 °C). Khi tiếp xúc da tay, nó bay hơi nhanh thu nhiệt gây cảm giác mát lạnh."
  }
];

export default function VaporizationSimulation() {
  const [selectedSubstance, setSelectedSubstance] = useState<LiquidSubstance>(SUBSTANCES[0]);
  const [mass, setMass] = useState<number>(0.1); // kg (100g to 500g)
  const [power, setPower] = useState<number>(800); // W
  const [initialTemp, setInitialTemp] = useState<number>(20); // °C

  // Simulation states
  const [temp, setTemp] = useState<number>(20);
  const [time, setTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [phase, setPhase] = useState<"heating" | "boiling" | "vaporized">("heating");
  const [vaporizedFraction, setVaporizedFraction] = useState<number>(0); // 0 to 1
  const [totalQ, setTotalQ] = useState<number>(0); // J

  // History data points for graphing [time, temp, phase, vaporizedPercent]
  const [history, setHistory] = useState<{ t: number; temp: number; vaporized: number; q: number }[]>([
    { t: 0, temp: 20, vaporized: 0, q: 0 }
  ]);

  // Microscopic canvas reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Particles state managed via ref for smooth canvas animation
  const particlesRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    isGas: boolean;
    opacity: number;
  }[]>([]);

  // Bubble animation state managed via ref
  const bubblesRef = useRef<{
    x: number;
    y: number;
    radius: number;
    vy: number;
  }[]>([]);

  // Adjust states when substance changes
  useEffect(() => {
    handleReset();
  }, [selectedSubstance]);

  // Initialize liquid particles in the bottom half of the beaker
  const initParticles = () => {
    const particles = [];
    const count = 80;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: 15 + Math.random() * 130,
        y: 60 + Math.random() * 42,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        isGas: false,
        opacity: 0.8
      });
    }
    particlesRef.current = particles;
    bubblesRef.current = [];
  };

  useEffect(() => {
    initParticles();
  }, [selectedSubstance]);

  // Simulation physics step running inside requestAnimationFrame or setInterval
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      const dt = 0.5; // virtual time step (seconds per simulation frame)
      const speedMultiplier = 10; // accelerate simulation speed to keep it fun!
      
      interval = setInterval(() => {
        setTime((prevTime) => {
          const nextTime = prevTime + dt * speedMultiplier;
          const currentQ = totalQ + power * dt * speedMultiplier;
          setTotalQ(currentQ);

          // Physics calculation
          if (phase === "heating") {
            // Q = m * c * dT => dT = Q_input / (m * c)
            const dT = (power * dt * speedMultiplier) / (mass * selectedSubstance.cLiquid);
            const nextTemp = temp + dT;
            if (nextTemp >= selectedSubstance.boilingPoint) {
              setTemp(selectedSubstance.boilingPoint);
              setPhase("boiling");
            } else {
              setTemp(nextTemp);
            }
            
            // Log history
            setHistory((prev) => [
              ...prev,
              { t: Math.round(nextTime), temp: Math.min(nextTemp, selectedSubstance.boilingPoint), vaporized: 0, q: currentQ }
            ]);
          } else if (phase === "boiling") {
            // Boiling phase: Temperature stays exactly at boilingPoint
            // Q_boil = L * m_vaporized => m_vaporized_step = Q_step / L
            const dM = (power * dt * speedMultiplier) / selectedSubstance.L;
            const currentVaporizedMass = vaporizedFraction * mass + dM;
            const nextFraction = Math.min(1.0, currentVaporizedMass / mass);
            setVaporizedFraction(nextFraction);

            if (nextFraction >= 1.0) {
              setPhase("vaporized");
              setIsPlaying(false);
            }

            setHistory((prev) => [
              ...prev,
              { t: Math.round(nextTime), temp: selectedSubstance.boilingPoint, vaporized: nextFraction * 100, q: currentQ }
            ]);
          }

          return nextTime;
        });
      }, 50);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, phase, temp, totalQ, selectedSubstance, mass, power, vaporizedFraction]);

  // Animation Frame update for beaker and canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Beaker dimensions
      const beakerX = 10;
      const beakerY = 10;
      const beakerW = 140;
      const beakerH = 95;

      // Draw Beaker Glass (Glassmorphism look)
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(beakerX, beakerY);
      ctx.lineTo(beakerX, beakerY + beakerH);
      ctx.lineTo(beakerX + beakerW, beakerY + beakerH);
      ctx.lineTo(beakerX + beakerW, beakerY);
      ctx.stroke();

      // Liquid level drops as water vaporizes
      const initialLiquidHeight = 45;
      const currentLiquidHeight = initialLiquidHeight * (1 - vaporizedFraction);
      const waterSurfaceY = beakerY + beakerH - currentLiquidHeight;

      // Draw liquid volume inside beaker
      if (currentLiquidHeight > 0.5) {
        ctx.fillStyle = selectedSubstance.color;
        ctx.fillRect(beakerX + 1, waterSurfaceY, beakerW - 2.5, currentLiquidHeight - 1);

        // Wave effect on surface
        ctx.fillStyle = selectedSubstance.color;
        ctx.beginPath();
        ctx.moveTo(beakerX + 1, waterSurfaceY);
        for (let i = beakerX + 1; i <= beakerX + beakerW - 1.5; i += 10) {
          const waveAmp = phase === "boiling" ? 2.5 : phase === "heating" && temp > 60 ? 1 : 0.5;
          const waveFreq = isPlaying ? Date.now() * 0.01 : 0;
          const offset = waveAmp * Math.sin(i * 0.1 + waveFreq);
          ctx.lineTo(i, waterSurfaceY + offset);
        }
        ctx.lineTo(beakerX + beakerW - 1, waterSurfaceY + 5);
        ctx.lineTo(beakerX + beakerW - 1, beakerY + beakerH);
        ctx.lineTo(beakerX + 1, beakerY + beakerH);
        ctx.closePath();
        ctx.fill();
      }

      // Generate bubbles at the bottom during boiling
      if (isPlaying && phase === "boiling" && Math.random() < 0.25) {
        bubblesRef.current.push({
          x: beakerX + 15 + Math.random() * (beakerW - 30),
          y: beakerY + beakerH - 5,
          radius: 1.5 + Math.random() * 3.5,
          vy: -(1.0 + Math.random() * 1.5)
        });
      }

      // Draw and update bubbles rising
      ctx.strokeStyle = "rgba(15, 23, 42, 0.45)";
      ctx.lineWidth = 1;
      bubblesRef.current.forEach((b, idx) => {
        b.y += b.vy;
        // Float to top
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Remove bubbles that burst at the surface
      bubblesRef.current = bubblesRef.current.filter((b) => b.y > waterSurfaceY);

      // Microscopic particles simulation loop
      particlesRef.current.forEach((p, idx) => {
        // Temperature scales movement speed
        const speedScale = 0.2 + (temp / 150) * 1.2;

        if (!p.isGas) {
          // Liquid particle dynamics - bounded inside current water volume
          p.x += p.vx * speedScale;
          p.y += p.vy * speedScale;

          if (p.x < beakerX + 6) { p.x = beakerX + 6; p.vx *= -1; }
          if (p.x > beakerX + beakerW - 6) { p.x = beakerX + beakerW - 6; p.vx *= -1; }
          if (p.y < waterSurfaceY + 3) { 
            p.y = waterSurfaceY + 3; 
            p.vy *= -1; 
            
            // In boiling or close-to-boiling heating, particles can escape (evaporate)
            if (phase === "boiling" || (phase === "heating" && temp > 80 && Math.random() < 0.05)) {
              p.isGas = true;
              p.vy = -(1.5 + Math.random() * 2); // fly upward
              p.vx = (Math.random() - 0.5) * 2;
            }
          }
          if (p.y > beakerY + beakerH - 6) { p.y = beakerY + beakerH - 6; p.vy *= -1; }
        } else {
          // Gas particle dynamics - flying up and escaping beaker
          p.x += p.vx * speedScale;
          p.y += p.vy * speedScale;
          p.opacity -= 0.005; // gradually fades away as steam escapes

          // boundary collisions with beaker top walls
          if (p.y > waterSurfaceY && p.y < beakerY + beakerH) {
            if (p.x < beakerX + 5) { p.x = beakerX + 5; p.vx *= -1; }
            if (p.x > beakerX + beakerW - 5) { p.x = beakerX + beakerW - 5; p.vx *= -1; }
          }
        }

        // Draw particle
        ctx.fillStyle = p.isGas ? "rgba(100, 116, 139, " + p.opacity + ")" : selectedSubstance.particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.isGas ? 1.8 : 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Recycler for gas particles back to bottom if they faded out and liquid exists
      if (isPlaying && currentLiquidHeight > 2) {
        particlesRef.current.forEach((p) => {
          if (p.isGas && p.opacity <= 0) {
            p.isGas = false;
            p.opacity = 0.8;
            p.x = beakerX + 10 + Math.random() * (beakerW - 20);
            p.y = waterSurfaceY + 5 + Math.random() * (currentLiquidHeight - 10);
            p.vx = (Math.random() - 0.5) * 1.5;
            p.vy = (Math.random() - 0.5) * 1.5;
          }
        });
      }

      // Flame effect at the bottom when playing
      if (isPlaying) {
        ctx.fillStyle = "rgba(249, 115, 22, 0.15)";
        ctx.beginPath();
        ctx.ellipse(beakerX + beakerW / 2, beakerY + beakerH + 5, 45, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Little flame spikes
        for (let j = 0; j < 5; j++) {
          const spikeX = beakerX + 25 + j * 22 + Math.sin(Date.now() * 0.02 + j) * 4;
          const spikeH = 14 + Math.sin(Date.now() * 0.05 + j) * 5;
          ctx.fillStyle = j % 2 === 0 ? "#f97316" : "#ef4444";
          ctx.beginPath();
          ctx.moveTo(spikeX - 6, beakerY + beakerH + 3);
          ctx.quadraticCurveTo(spikeX, beakerY + beakerH - spikeH + 5, spikeX, beakerY + beakerH - spikeH);
          ctx.quadraticCurveTo(spikeX + 2, beakerY + beakerH - spikeH + 5, spikeX + 6, beakerY + beakerH + 3);
          ctx.closePath();
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, phase, temp, selectedSubstance, vaporizedFraction, isPlaying]);

  const handlePlayPause = () => {
    if (phase === "vaporized") {
      handleReset();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTemp(initialTemp);
    setTime(0);
    setPhase("heating");
    setVaporizedFraction(0);
    setTotalQ(0);
    setHistory([{ t: 0, temp: initialTemp, vaporized: 0, q: 0 }]);
    initParticles();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 text-slate-900">
      {/* Simulation Workspace Panel (Left) */}
      <div className="xl:col-span-7 bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-emerald-50 to-emerald-100/50 p-4 rounded-2xl border-2 border-emerald-100 border-b-[4px] border-b-emerald-250 gap-3">
          <div>
            <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-emerald-600 animate-pulse" /> Thiết lập thí nghiệm ảo
            </h4>
            <p className="text-[10px] text-emerald-900 mt-0.5 font-bold uppercase">Xác định nhiệt hóa hơi riêng L của chất lỏng đang sôi</p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            {SUBSTANCES.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubstance(sub)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all border-2 border-b-[4px] ${
                  selectedSubstance.id === sub.id
                    ? "bg-emerald-600 border-emerald-700 text-white border-b-emerald-800 shadow-sm"
                    : "bg-white border-slate-250 border-b-slate-350 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-950"
                }`}
              >
                {sub.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 2D Canvas stage & Thermometer side-by-side */}
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-center py-2">
          {/* Microscopic particle canvas */}
          <div className="relative bg-sky-50/50 border-2 border-slate-200 border-b-[4px] border-b-slate-300 p-4 rounded-2xl shadow-inner flex flex-col items-center">
            <span className="text-[9px] font-mono text-slate-700 font-extrabold uppercase mb-1.5 tracking-wider">
              Mô hình hạt phân tử chất lỏng hóa hơi
            </span>
            <div className="bg-white p-2.5 rounded-2xl border-2 border-slate-200 shadow-sm">
              <canvas ref={canvasRef} width={160} height={115} className="bg-white rounded-lg" />
            </div>
            
            {/* Phase Badge overlay */}
            <div className="absolute top-12 left-6 bg-white/95 border-2 border-slate-200 px-2.5 py-1 rounded-xl text-[8.5px] font-mono font-bold shadow-sm">
              {phase === "heating" && <span className="text-amber-600 animate-pulse font-extrabold">🔥 Đang tăng nhiệt</span>}
              {phase === "boiling" && <span className="text-red-600 animate-bounce font-extrabold">♨️ ĐANG SÔI ({selectedSubstance.boilingPoint}°C)</span>}
              {phase === "vaporized" && <span className="text-slate-600 font-extrabold">💨 Đã hóa hơi hết</span>}
            </div>
          </div>

          {/* Electronic Measuring Thermometer bar & digital reader */}
          <div className="flex flex-col items-center bg-red-50/30 border-2 border-red-100 border-b-[4px] border-b-red-250 p-4 rounded-3xl w-36 shrink-0 space-y-2">
            <span className="text-[9.5px] font-mono text-red-950 font-black uppercase tracking-wider flex items-center gap-1">
              <Thermometer className="h-3.5 w-3.5 text-red-600 animate-pulse" /> Nhiệt kế số
            </span>
            
            <div className="relative w-7 h-28 bg-red-50 rounded-full border-2 border-red-200/80 flex flex-col justify-end p-0.5 shadow-inner">
              {/* Colored liquid column inside thermometer */}
              <div 
                className="w-full rounded-full transition-all duration-300 bg-gradient-to-t from-red-600 to-red-400"
                style={{ height: `${Math.min(100, Math.max(10, (temp / 120) * 100))}%` }}
              />
              <div className="absolute inset-0 flex flex-col justify-between items-center text-[7.5px] font-mono text-red-900/60 font-black py-2">
                <span>120°C</span>
                <span>80°C</span>
                <span>40°C</span>
                <span>0°C</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm font-black text-red-600 font-mono tracking-tight bg-white px-2.5 py-1 rounded-xl border-2 border-red-150 border-b-[4px] border-b-red-250">
                {temp.toFixed(1)} °C
              </div>
              <div className="text-[8px] font-mono font-extrabold text-red-900 uppercase mt-1">Hiện tại</div>
            </div>
          </div>
        </div>

        {/* Digital Telemetry / Measurement displays */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gradient-to-b from-slate-50 to-slate-100/50 border-2 border-slate-200 border-b-[4px] border-b-slate-300 rounded-2xl p-2.5 text-center shadow-sm">
            <span className="text-[8.5px] font-mono font-extrabold text-slate-600 uppercase">1. Thời gian đun</span>
            <div className="text-sm font-black text-slate-900 mt-1 font-mono">{time.toFixed(1)} s</div>
          </div>
          <div className="bg-gradient-to-b from-amber-50 to-amber-100/30 border-2 border-amber-250 border-b-[4px] border-b-amber-350 rounded-2xl p-2.5 text-center shadow-sm">
            <span className="text-[8.5px] font-mono font-extrabold text-amber-800 uppercase flex items-center justify-center gap-1">
              2. Nhiệt lượng đã cấp (<FormattedMathText text="Q" />)
            </span>
            <div className="text-sm font-black text-amber-600 mt-1 font-mono">{(totalQ / 1000).toFixed(1)} kJ</div>
          </div>
          <div className="bg-gradient-to-b from-cyan-50 to-cyan-100/30 border-2 border-cyan-250 border-b-[4px] border-b-cyan-350 rounded-2xl p-2.5 text-center shadow-sm">
            <span className="text-[8.5px] font-mono font-extrabold text-cyan-800 uppercase">3. Tỉ lệ hóa hơi</span>
            <div className="text-sm font-black text-cyan-600 mt-1 font-mono">{(vaporizedFraction * 100).toFixed(1)} %</div>
          </div>
          <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/30 border-2 border-emerald-250 border-b-[4px] border-b-emerald-350 rounded-2xl p-2.5 text-center shadow-sm">
            <span className="text-[8.5px] font-mono font-extrabold text-emerald-800 uppercase">4. Lỏng còn lại</span>
            <div className="text-sm font-black text-emerald-600 mt-1 font-mono">{(mass * (1 - vaporizedFraction) * 1000).toFixed(1)} g</div>
          </div>
        </div>

        {/* Slider Controls for Mass and Power */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5 bg-gradient-to-b from-slate-50 to-slate-100/30 p-4.5 rounded-2xl border-2 border-slate-200/80">
            <div className="flex justify-between text-[10px] font-extrabold text-slate-700 items-center">
              <span className="flex items-center gap-1">KHỐI LƯỢNG CHẤT LỎNG (<FormattedMathText text="m" />):</span>
              <span className="text-emerald-700 font-mono font-black">{mass.toFixed(2)} kg ({(mass * 1000).toFixed(0)}g)</span>
            </div>
            <input
              type="range"
              min={0.05}
              max={0.3}
              step={0.05}
              value={mass}
              disabled={isPlaying}
              onChange={(e) => setMass(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <div className="space-y-1.5 bg-gradient-to-b from-slate-50 to-slate-100/30 p-4.5 rounded-2xl border-2 border-slate-200/80">
            <div className="flex justify-between text-[10px] font-extrabold text-slate-700 items-center">
              <span className="flex items-center gap-1">CÔNG SUẤT DÂY NUNG (<FormattedMathText text="P" />):</span>
              <span className="text-amber-700 font-mono font-black">{power} W</span>
            </div>
            <input
              type="range"
              min={200}
              max={1500}
              step={100}
              value={power}
              disabled={isPlaying}
              onChange={(e) => setPower(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>
        </div>

        {/* Playback Buttons */}
        <div className="flex gap-4 justify-center pt-2">
          <button
            onClick={handlePlayPause}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all border-2 border-b-[6px] cursor-pointer shadow-md active:border-b-2 active:mt-[4px] ${
              isPlaying
                ? "bg-amber-500 hover:bg-amber-400 border-amber-600 border-b-amber-800 text-slate-950"
                : "bg-emerald-600 hover:bg-emerald-500 border-emerald-700 border-b-emerald-900 text-white"
            }`}
          >
            {isPlaying ? <Pause className="h-4.5 w-4.5" /> : <Play className="h-4.5 w-4.5" />}
            {isPlaying ? "Tạm dừng" : "Bắt đầu đun"}
          </button>
          <button
            onClick={handleReset}
            className="px-5 py-3 bg-white border-2 border-slate-300 border-b-[6px] border-b-slate-450 hover:bg-slate-50 text-slate-800 active:border-b-2 active:mt-[4px] rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <RotateCcw className="h-4.5 w-4.5" /> Reset
          </button>
        </div>
      </div>

      {/* Physics Graph & Educational Board (Right) */}
      <div className="xl:col-span-5 flex flex-col justify-between space-y-4">
        {/* Real-time Graph Visualizer */}
        <div className="bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b-2 border-slate-100 pb-2.5">
            <span className="text-[10px] font-mono font-black text-slate-750 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-cyan-600" /> Biểu đồ nhiệt độ T(t)
            </span>
            <span className="text-[9px] font-mono text-slate-500 font-bold uppercase">Thực nghiệm ảo</span>
          </div>

          <div className="relative h-44 bg-slate-50 border-2 border-slate-200 rounded-2xl p-2 flex flex-col justify-between overflow-hidden shadow-inner">
            {/* Graph coordinates guide grid lines */}
            <div className="absolute inset-x-2 top-4 bottom-6 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-slate-200/80 w-full" />
              <div className="border-b border-slate-200/80 w-full" />
              <div className="border-b border-slate-200/80 w-full" />
              <div className="border-b border-slate-200/80 w-full" />
            </div>

            {/* Render the actual line graph */}
            <svg className="w-full h-full" viewBox="0 0 240 120">
              {/* Axes */}
              <line x1="25" y1="10" x2="25" y2="105" stroke="#475569" strokeWidth="1.5" />
              <line x1="25" y1="105" x2="230" y2="105" stroke="#475569" strokeWidth="1.5" />
              
              {/* Axis Label */}
              <text x="21" y="9" fill="#1e293b" className="text-[6.5px] font-mono font-black" textAnchor="end">T(°C)</text>
              <text x="228" y="112" fill="#1e293b" className="text-[6.5px] font-mono font-black" textAnchor="end">t(s)</text>

              {/* Boiling Point horizontal asymptote line */}
              {phase !== "vaporized" && (
                <line 
                  x1="25" 
                  y1={105 - (selectedSubstance.boilingPoint / 120) * 90} 
                  x2="230" 
                  y2={105 - (selectedSubstance.boilingPoint / 120) * 90} 
                  stroke="rgba(239, 68, 68, 0.45)" 
                  strokeWidth="1.5" 
                  strokeDasharray="2,2" 
                />
              )}

              {/* Plotted line from history points */}
              {history.length > 1 && (
                <path
                  d={(() => {
                    const maxTime = Math.max(100, history[history.length - 1].t);
                    return history.map((pt, index) => {
                      const gx = 25 + (pt.t / maxTime) * 195;
                      const gy = 105 - (pt.temp / 120) * 90;
                      return `${index === 0 ? "M" : "L"} ${gx} ${gy}`;
                    }).join(" ");
                  })()}
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}

              {/* Current state pointer marker dot */}
              {history.length > 0 && (
                <circle 
                  cx={(() => {
                    const maxTime = Math.max(100, history[history.length - 1].t);
                    return 25 + (time / maxTime) * 195;
                  })()}
                  cy={105 - (temp / 120) * 90}
                  r="3.5"
                  fill="#ef4444"
                  className="animate-ping"
                />
              )}

              {/* Coordinate axis tick text labels */}
              <text x="20" y="107" fill="#475569" className="text-[6px] font-mono font-bold" textAnchor="end">0</text>
              <text x="20" y={105 - (selectedSubstance.boilingPoint / 120) * 90 + 2} fill="#dc2626" className="text-[6px] font-mono font-black" textAnchor="end">
                {selectedSubstance.boilingPoint}°C
              </text>
            </svg>

            {/* Graph Legend */}
            <div className="absolute right-3 bottom-8 bg-white/95 px-2.5 py-1.5 rounded-xl border-2 border-slate-200 text-[7px] font-mono font-extrabold flex flex-col gap-1 shadow-sm text-slate-700">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-emerald-600 block" />
                <span>Nhiệt độ đun T(t)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-red-500/50 block border-t border-dashed" />
                <span>Nhiệt độ sôi bão hòa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pedagogy explanation card */}
        <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/30 border-2 border-emerald-200 border-b-[6px] border-b-emerald-300 rounded-3xl p-5 space-y-3 shadow-sm">
          <h5 className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="h-4.5 w-4.5 text-emerald-700" /> Giải thích sư phạm cốt lõi
          </h5>
          <p className="text-xs leading-relaxed text-slate-800 font-semibold">
            {selectedSubstance.desc}
          </p>
          <div className="bg-white p-3.5 rounded-2xl border-2 border-emerald-100 text-xs space-y-2 shadow-inner">
            <div className="flex justify-between font-mono font-bold border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Đặc tính vật lí của:</span>
              <span className="text-emerald-800 font-extrabold">{selectedSubstance.name.split(" ")[0]}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700 font-mono items-center">
              <div className="flex items-center gap-1">• Điểm sôi: <span className="font-bold inline-flex items-center"><FormattedMathText text={`${selectedSubstance.boilingPoint} °C`} /></span></div>
              <div className="flex items-center gap-1">• Nhiệt dung lỏng (c): <span className="font-bold inline-flex items-center"><FormattedMathText text={`${selectedSubstance.cLiquid} J/kg.K`} /></span></div>
              <div className="col-span-2 border-t border-slate-100 pt-1.5 mt-1 flex items-center gap-1 flex-wrap">
                • Nhiệt hóa hơi riêng (L): <span className="text-amber-700 font-black inline-flex items-center"><FormattedMathText text={`${(selectedSubstance.L / 1000000).toFixed(3)} * 10^6\ J/kg`} /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
