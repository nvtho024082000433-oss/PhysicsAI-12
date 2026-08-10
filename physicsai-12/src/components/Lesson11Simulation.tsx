import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Plus, Trash2, LineChart, Table, Info, Sliders, Wind, HelpCircle, CheckCircle2, Thermometer, Activity } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface Molecule {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface DataPoint {
  id: number;
  p: number; // Pressure (atm)
  v: number; // Volume (L)
  T: number; // Temperature (K)
  invV: number; // 1 / V
}

export default function Lesson11Simulation() {
  const [constantProcess, setConstantProcess] = useState<"T" | "V" | "p" | "none">("none");
  const [pressure, setPressure] = useState<number>(2.0); // atm
  const [volume, setVolume] = useState<number>(4.0); // Liters
  const [temperature, setTemperature] = useState<number>(300); // Kelvin

  const [activeGraph, setActiveGraph] = useState<"pV" | "p_invV">("p_invV");
  const [dataLogs, setDataLogs] = useState<DataPoint[]>([
    { id: 1, p: 1.0, v: 8.0, T: 300, invV: 0.125 },
    { id: 2, p: 1.33, v: 6.0, T: 300, invV: 0.167 },
    { id: 3, p: 2.0, v: 4.0, T: 300, invV: 0.25 },
    { id: 4, p: 4.0, v: 2.0, T: 300, invV: 0.5 },
  ]);

  // Mini-quiz inside laboratory
  const [selectedQuizAns, setSelectedQuizAns] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Simulation canvas & physics
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [molecules, setMolecules] = useState<Molecule[]>([]);
  const [realtimeCollisionCount, setRealtimeCollisionCount] = useState<number>(0);

  // Initialize gas molecules with highly visible high-contrast colors
  useEffect(() => {
    const newMolecules: Molecule[] = Array.from({ length: 45 }, (_, i) => {
      const speedScale = Math.sqrt(temperature / 300) * 1.6;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * 120 + 20,
        y: Math.random() * 90 + 20,
        vx: Math.cos(angle) * speedScale,
        vy: Math.sin(angle) * speedScale,
        radius: 3.5,
        color: i % 3 === 0 ? "#ef4444" : i % 2 === 0 ? "#3b82f6" : "#10b981", // vibrant red, blue, green
      };
    });
    setMolecules(newMolecules);
  }, []);

  // Update molecule speeds when temperature changes
  useEffect(() => {
    setMolecules(prev =>
      prev.map(m => {
        const speedScale = Math.sqrt(temperature / 300) * 1.6;
        const currentSpeed = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
        if (currentSpeed === 0) return m;
        return {
          ...m,
          vx: (m.vx / currentSpeed) * speedScale,
          vy: (m.vy / currentSpeed) * speedScale,
        };
      })
    );
  }, [temperature]);

  // Physics animation loop
  useEffect(() => {
    let animationFrameId: number;
    let collisionsThisInterval = 0;

    const collisionTimer = setInterval(() => {
      setRealtimeCollisionCount(collisionsThisInterval);
      collisionsThisInterval = 0;
    }, 1000);

    const updatePhysics = () => {
      // Map Volume range [1.0, 10.0] to canvas X range [40, 280]
      const activeWidth = 40 + ((volume - 1.0) / (10.0 - 1.0)) * 240;

      setMolecules(prev =>
        prev.map(m => {
          let nx = m.x + m.vx;
          let ny = m.y + m.vy;
          let nvx = m.vx;
          let nvy = m.vy;

          // Left, top, bottom boundary collisions
          if (nx - m.radius < 5) {
            nvx = Math.abs(m.vx);
            nx = 5 + m.radius;
            collisionsThisInterval++;
          }
          if (ny - m.radius < 5) {
            nvy = Math.abs(m.vy);
            ny = 5 + m.radius;
            collisionsThisInterval++;
          }
          if (ny + m.radius > 135) {
            nvy = -Math.abs(m.vy);
            ny = 135 - m.radius;
            collisionsThisInterval++;
          }

          // Piston (Right sliding wall) collision
          if (nx + m.radius > activeWidth - 6) {
            nvx = -Math.abs(m.vx);
            nx = activeWidth - 6 - m.radius;
            collisionsThisInterval++;
          }

          return { ...m, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(collisionTimer);
    };
  }, [volume, temperature]);

  // Draw clean, high-contrast, light-themed laboratory cylinder onto Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, 300, 140);

    // Light-themed inner grid lines
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1;
    for (let x = 10; x < 300; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 140);
      ctx.stroke();
    }
    for (let y = 10; y < 140; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(300, y);
      ctx.stroke();
    }

    // Piston cylinder width calculation
    const activeWidth = 40 + ((volume - 1.0) / (10.0 - 1.0)) * 240;

    // Draw internal volume space (soft clean white background)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(5, 5, activeWidth - 5, 130);

    // Draw dark grey cylinder outer outline
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(5, 5);
    ctx.lineTo(5, 135);
    ctx.lineTo(activeWidth, 135);
    ctx.moveTo(5, 5);
    ctx.lineTo(activeWidth, 5);
    ctx.stroke();

    // Draw sliding piston head
    ctx.fillStyle = "#334155";
    ctx.fillRect(activeWidth - 7, 6, 12, 128);

    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2;
    ctx.strokeRect(activeWidth - 7, 6, 12, 128);

    // Draw piston shaft extending to the right
    ctx.fillStyle = "#64748b";
    ctx.fillRect(activeWidth + 5, 64, 300 - activeWidth, 12);

    // Draw warm temperature heat glow if T > 400 K
    if (temperature > 400) {
      const alpha = Math.min(0.4, (temperature - 400) / 800);
      ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
      ctx.fillRect(5, 122, activeWidth - 5, 13);
    }

    // Draw bouncing high-contrast molecules
    molecules.forEach(m => {
      // Prevent render overflow during instant compression
      const rx = Math.min(activeWidth - m.radius - 10, m.x);
      ctx.beginPath();
      ctx.arc(rx, m.y, m.radius, 0, Math.PI * 2);
      ctx.fillStyle = m.color;
      ctx.fill();
      
      // Clean high-contrast white stroke border
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 0.6;
      ctx.stroke();
    });
  }, [molecules, volume, temperature]);

  const handleStateSlider = (type: "p" | "V" | "T", val: number) => {
    if (constantProcess === "T") {
      const k = pressure * volume;
      if (type === "p") {
        setPressure(val);
        setVolume(parseFloat((k / val).toFixed(2)));
      } else if (type === "V") {
        setVolume(val);
        setPressure(parseFloat((k / val).toFixed(2)));
      }
    } else if (constantProcess === "V") {
      const k = pressure / temperature;
      if (type === "p") {
        setPressure(val);
        setTemperature(Math.round(val / k));
      } else if (type === "T") {
        setTemperature(val);
        setPressure(parseFloat((k * val).toFixed(2)));
      }
    } else if (constantProcess === "p") {
      const k = volume / temperature;
      if (type === "V") {
        setVolume(val);
        setTemperature(Math.round(val / k));
      } else if (type === "T") {
        setTemperature(val);
        setVolume(parseFloat((k * val).toFixed(2)));
      }
    } else {
      if (type === "p") setPressure(val);
      if (type === "V") setVolume(val);
      if (type === "T") setTemperature(val);
    }
  };

  const recordCurrentPoint = () => {
    const newPoint: DataPoint = {
      id: Date.now(),
      p: parseFloat(pressure.toFixed(2)),
      v: parseFloat(volume.toFixed(2)),
      T: temperature,
      invV: parseFloat((1 / volume).toFixed(4)),
    };
    if (dataLogs.some(pt => pt.p === newPoint.p && pt.v === newPoint.v && pt.T === newPoint.T)) return;
    setDataLogs([...dataLogs, newPoint].sort((a, b) => a.v - b.v));
  };

  const clearDataLogs = () => {
    setDataLogs([]);
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Simulation layout container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Controls & Visual Particle Cylinder */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-gradient-to-b from-slate-50 to-slate-100/40 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm space-y-4">
            <span className="text-[10px] uppercase font-mono font-black text-indigo-700 tracking-wider">
              Phòng thực nghiệm ảo - Xi lanh chất khí
            </span>

            {/* Particle Cylinder Visual Canvas (Light Style) */}
            <div className="bg-slate-100 rounded-2xl border-2 border-slate-200 p-2.5 relative shadow-inner">
              <canvas
                ref={canvasRef}
                width={300}
                height={140}
                className="w-full h-[180px] rounded-xl block bg-white border border-slate-200"
              />
              
              {/* Dynamic Overlay tags */}
              <div className="absolute top-5 left-5 bg-slate-900 text-white text-[9.5px] font-mono font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Va chạm/giây: {realtimeCollisionCount}
              </div>

              <div className="absolute bottom-5 left-5 bg-slate-900 text-white text-[9.5px] font-mono font-black px-2.5 py-1 rounded-lg shadow-sm">
                Lượng khí: 45 phân tử
              </div>
            </div>

            {/* Lock process selector (3D Light Buttons) */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-500 block font-black uppercase tracking-wider">
                Khóa liên kết Đẳng Quá Trình:
              </span>
              <div className="grid grid-cols-4 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
                <button
                  onClick={() => setConstantProcess("none")}
                  className={`py-2 text-[10px] rounded-xl cursor-pointer transition-all ${
                    constantProcess === "none"
                      ? "bg-slate-900 text-white shadow-[0_3px_0_0_#475569] font-black"
                      : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-[0_3px_0_0_#e2e8f0] font-extrabold"
                  }`}
                >
                  Tự do
                </button>
                <button
                  onClick={() => setConstantProcess("T")}
                  className={`py-2 text-[10px] rounded-xl cursor-pointer transition-all ${
                    constantProcess === "T"
                      ? "bg-red-500 text-white shadow-[0_3px_0_0_#991b1b] font-black"
                      : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-[0_3px_0_0_#e2e8f0] font-extrabold"
                  }`}
                >
                  Đẳng nhiệt
                </button>
                <button
                  onClick={() => setConstantProcess("V")}
                  className={`py-2 text-[10px] rounded-xl cursor-pointer transition-all ${
                    constantProcess === "V"
                      ? "bg-emerald-500 text-white shadow-[0_3px_0_0_#065f46] font-black"
                      : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-[0_3px_0_0_#e2e8f0] font-extrabold"
                  }`}
                >
                  Đẳng tích
                </button>
                <button
                  onClick={() => setConstantProcess("p")}
                  className={`py-2 text-[10px] rounded-xl cursor-pointer transition-all ${
                    constantProcess === "p"
                      ? "bg-blue-500 text-white shadow-[0_3px_0_0_#075985] font-black"
                      : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-[0_3px_0_0_#e2e8f0] font-extrabold"
                  }`}
                >
                  Đẳng áp
                </button>
              </div>
            </div>

            {/* Parameter sliders */}
            <div className="space-y-4 bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-inner">
              {/* Pressure (p) */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Activity className="h-4 w-4 text-red-500" />
                    Áp suất (<FormattedMathText text="p" />):
                  </span>
                  <span className="font-mono text-indigo-700 font-black">{pressure.toFixed(2)} atm</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="5.0"
                  step="0.05"
                  disabled={constantProcess === "p"}
                  value={pressure}
                  onChange={(e) => handleStateSlider("p", parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                />
              </div>

              {/* Volume (V) */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Wind className="h-4 w-4 text-emerald-500" />
                    Thể tích xi lanh (<FormattedMathText text="V" />):
                  </span>
                  <span className="font-mono text-indigo-700 font-black">{volume.toFixed(2)} Lít</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  disabled={constantProcess === "V"}
                  value={volume}
                  onChange={(e) => handleStateSlider("V", parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                />
              </div>

              {/* Temperature (T) */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Thermometer className="h-4 w-4 text-orange-500 animate-pulse" />
                    Nhiệt độ tuyệt đối (<FormattedMathText text="T" />):
                  </span>
                  <span className="font-mono text-indigo-700 font-black">{temperature} K ({temperature - 273}°C)</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="600"
                  step="10"
                  disabled={constantProcess === "T"}
                  value={temperature}
                  onChange={(e) => handleStateSlider("T", parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Action buttons with 3D elements */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-1">
              <button
                onClick={recordCurrentPoint}
                className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl border-b-4 border-b-teal-700 active:translate-y-[2px] active:border-b-0 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 uppercase"
              >
                <Plus className="h-4 w-4" />
                Ghi số liệu đồ thị
              </button>
              <button
                onClick={clearDataLogs}
                className="py-2.5 px-5 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 border-b-4 border-b-slate-300 font-extrabold text-xs rounded-xl active:translate-y-[2px] active:border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 uppercase"
              >
                <Trash2 className="h-4 w-4" />
                Xóa bảng số liệu
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Dynamic Graphs and Data Logger plot (Light 3D styled) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-gradient-to-b from-slate-50 to-white border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-[10px] uppercase font-mono font-black text-indigo-700 tracking-wider">
                Đồ thị số liệu thời gian thực
              </span>
              
              <div className="flex gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                <button
                  onClick={() => setActiveGraph("p_invV")}
                  className={`px-2.5 py-1.5 text-[9px] font-black rounded-lg transition-colors cursor-pointer ${
                    activeGraph === "p_invV"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Trục p - 1/V
                </button>
                <button
                  onClick={() => setActiveGraph("pV")}
                  className={`px-2.5 py-1.5 text-[9px] font-black rounded-lg transition-colors cursor-pointer ${
                    activeGraph === "pV"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Trục p - V
                </button>
              </div>
            </div>

            {/* REAL-TIME HIGH-CONTRAST LIGHT SVG CHART */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-2.5 flex items-center justify-center shadow-inner">
              <svg className="w-full h-[200px]" viewBox="0 0 280 180">
                {/* Light Slate grid lines */}
                <line x1="40" y1="20" x2="260" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="60" x2="260" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="100" x2="260" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="140" x2="260" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="95" y1="20" x2="95" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="150" y1="20" x2="150" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="205" y1="20" x2="205" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="260" y1="20" x2="260" y2="140" stroke="#f1f5f9" strokeWidth="1" />

                {/* Dark Axes */}
                <line x1="40" y1="140" x2="270" y2="140" stroke="#334155" strokeWidth="1.8" />
                <line x1="40" y1="10" x2="40" y2="140" stroke="#334155" strokeWidth="1.8" />

                {/* Axis Arrows */}
                <path d="M 270 140 L 265 137 L 265 143 z" fill="#334155" />
                <path d="M 40 10 L 37 15 L 43 15 z" fill="#334155" />

                {/* Axis Labels */}
                <text x="28" y="151" fill="#475569" className="text-[10px] font-sans font-black">O</text>
                <text x="25" y="15" fill="#1e293b" className="text-[9px] font-black">p (atm)</text>

                {activeGraph === "p_invV" ? (
                  <>
                    <text x="238" y="152" fill="#1e293b" className="text-[9px] font-black">1/V (L⁻¹)</text>
                    {/* Theoretical Line passing through origin */}
                    <line x1="40" y1="140" x2="250" y2="35" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="3,3" />
                    <text x="175" y="52" fill="#0891b2" className="text-[8px] font-bold font-mono">Lí thuyết (p ∝ 1/V)</text>

                    {/* Dotted section showing passing through origin */}
                    <line x1="40" y1="140" x2="25" y2="147" stroke="#0891b2" strokeWidth="1.2" strokeDasharray="2,2" />

                    {/* Plot recorded points */}
                    {dataLogs.map((pt) => {
                      const x = 40 + ((pt.invV - 0.1) / (1.0 - 0.1)) * 220;
                      const y = 140 - (pt.p / 5.0) * 120;
                      if (x < 40 || x > 260 || y < 10 || y > 140) return null;
                      return (
                        <g key={pt.id}>
                          <circle cx={x} cy={y} r="4.5" fill="#0ea5e9" stroke="#fff" strokeWidth="1.5" />
                          <text x={x + 6} y={y - 4} fill="#0369a1" className="text-[7.5px] font-mono font-black">
                            ({pt.p.toFixed(1)}, {pt.invV.toFixed(2)})
                          </text>
                        </g>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <text x="248" y="152" fill="#1e293b" className="text-[9px] font-black">V (Lít)</text>
                    {/* Theoretical Hyperbola */}
                    <path d="M 50 44 Q 90 110 240 133" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,3" />
                    <text x="155" y="108" fill="#f43f5e" className="text-[8px] font-bold font-mono">Đẳng nhiệt (Hyperbol)</text>

                    {/* Plot recorded points */}
                    {dataLogs.map((pt) => {
                      const x = 40 + ((pt.v - 1.0) / (10.0 - 1.0)) * 220;
                      const y = 140 - (pt.p / 5.0) * 120;
                      if (x < 40 || x > 260 || y < 10 || y > 140) return null;
                      return (
                        <g key={pt.id}>
                          <circle cx={x} cy={y} r="4.5" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
                          <text x={x + 6} y={y - 4} fill="#9f1239" className="text-[7.5px] font-mono font-black">
                            ({pt.p.toFixed(1)}, {pt.v.toFixed(1)})
                          </text>
                        </g>
                      );
                    })}
                  </>
                )}
              </svg>
            </div>
            
            <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 text-[10.5px] text-slate-700 text-center leading-normal font-bold">
              {activeGraph === "p_invV" ? (
                <span>
                  💡 Đồ thị <FormattedMathText text="p - 1/V" /> là đường thẳng tuyến tính dốc kéo dài đi qua gốc tọa độ O, đặc trưng cho liên kết đẳng nhiệt.
                </span>
              ) : (
                <span>
                  💡 Đồ thị <FormattedMathText text="p - V" /> có dạng một nhánh đường hyperbol cong hướng ra xa gốc, thể hiện áp suất tỉ lệ nghịch với thể tích khí.
                </span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Historical Records Table (Clean White 3D Layout) */}
      <div className="bg-white border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm space-y-3">
        <span className="text-[10px] uppercase font-mono font-black text-indigo-700 tracking-wider block border-b border-slate-100 pb-2">
          Bảng dữ liệu ghi nhận thực nghiệm lưu trữ
        </span>

        {dataLogs.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border-2 border-slate-200 shadow-inner">
            <table className="w-full text-left border-collapse text-[11px] font-bold">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-mono text-[10px] border-b-2 border-slate-200 uppercase">
                  <th className="p-3">Lần đo</th>
                  <th className="p-3">Áp suất <FormattedMathText text="p" /> (atm)</th>
                  <th className="p-3">Thể tích <FormattedMathText text="V" /> (L)</th>
                  <th className="p-3">Nghịch đảo <FormattedMathText text="1/V (L^-1)" /></th>
                  <th className="p-3">Nhiệt độ <FormattedMathText text="T" /> (K)</th>
                  <th className="p-3 text-right">Tỉ số liên hợp <FormattedMathText text="(p * V) / T" /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                {dataLogs.map((pt, idx) => (
                  <tr key={pt.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 text-slate-500 font-black">{idx + 1}</td>
                    <td className="p-3 text-rose-600 font-black">{pt.p.toFixed(2)}</td>
                    <td className="p-3 text-emerald-600 font-black">{pt.v.toFixed(2)}</td>
                    <td className="p-3 text-cyan-600 font-black">{pt.invV.toFixed(3)}</td>
                    <td className="p-3 text-orange-600 font-black">{pt.T}</td>
                    <td className="p-3 text-right font-black text-slate-900">
                      {((pt.p * pt.v) / pt.T).toFixed(5)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl text-xs text-slate-500 font-bold">
            Chưa có số liệu thực nghiệm nào được ghi. Thay đổi các thanh trượt rồi nhấn &quot;Ghi số liệu đồ thị&quot;.
          </div>
        )}
      </div>

      {/* Laboratory Quick Quiz (Purple 3D Styled Card) */}
      <div className="bg-gradient-to-b from-purple-50 to-indigo-50/40 border-2 border-purple-250 border-b-[6px] border-b-purple-350 rounded-3xl p-5 space-y-4 shadow-sm">
        <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider flex items-center gap-1.5 border-b border-purple-200 pb-2">
          <HelpCircle className="h-4.5 w-4.5 text-purple-600" />
          Phiếu kiểm tra lý thuyết phòng thí nghiệm ảo
        </h4>
        
        <p className="text-xs leading-relaxed text-slate-900 font-bold">
          <strong>Câu hỏi:</strong> Khi thực nghiệm biến đổi đẳng nhiệt, nếu tăng dãn nở thể tích bình chứa từ <code className="font-mono bg-white px-1.5 py-0.5 border rounded text-teal-700 font-black"><FormattedMathText text="2,0 L" /></code> lên <code className="font-mono bg-white px-1.5 py-0.5 border rounded text-teal-700 font-black"><FormattedMathText text="6,0 L" /></code>, điểm hiển thị số liệu tương ứng trên hệ trục <code className="font-bold text-indigo-700 font-mono"><FormattedMathText text="p - 1/V" /></code> sẽ dời dịch ra sao?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {[
            "A. Áp suất p tăng gấp 3, điểm số liệu tịnh tiến vượt ra xa gốc tọa độ.",
            "B. Nghịch đảo thể tích 1/V giảm 3 lần, áp suất p giảm tương ứng 3 lần, điểm di chuyển lùi trên đường thẳng về phía gốc tọa độ O.",
            "C. Điểm giữ nguyên vị trí hoàn toàn vì quá trình diễn ra là đẳng nhiệt.",
            "D. Điểm nhảy dời từ đường thẳng này sang một đường thẳng song song khác."
          ].map((text, idx) => {
            const isSelected = selectedQuizAns === idx;
            const isCorrect = idx === 1;
            let btnClass = "";
            if (quizSubmitted) {
              if (isCorrect) {
                btnClass = "bg-emerald-500 text-white border-emerald-600 shadow-[0_4px_0_0_#047857] translate-y-[-2px] font-black";
              } else if (isSelected) {
                btnClass = "bg-rose-500 text-white border-rose-600 shadow-[0_4px_0_0_#be123c] translate-y-[-2px] font-black";
              } else {
                btnClass = "bg-slate-100 text-slate-400 border-slate-200 opacity-40 cursor-not-allowed";
              }
            } else if (isSelected) {
              btnClass = "bg-gradient-to-b from-yellow-300 to-yellow-400 text-slate-950 border-2 border-yellow-500 shadow-[0_4px_0_0_#b45309] translate-y-[-2px] font-black";
            } else {
              btnClass = "bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 shadow-[0_4px_0_0_#e2e8f0] active:translate-y-[2px] active:shadow-[0_2px_0_0_#e2e8f0] font-extrabold";
            }

            return (
              <button
                key={idx}
                disabled={quizSubmitted}
                onClick={() => setSelectedQuizAns(idx)}
                className={`p-3 text-left text-xs rounded-2xl transition-all cursor-pointer ${btnClass}`}
              >
                <FormattedMathText text={text} />
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="flex-1">
            {quizSubmitted && (
              <div className="bg-white p-4 rounded-2xl border-2 border-purple-100 text-xs leading-relaxed text-slate-700 font-bold shadow-inner">
                <span className="text-purple-950 font-black block mb-1">✓ Giải thích chi tiết từ giáo viên:</span>
                <p>
                  Thể tích <FormattedMathText text="V" /> tăng 3 lần (2 lên 6) thì nghịch đảo của nó <code className="font-mono"><FormattedMathText text="1/V" /></code> giảm đi 3 lần (0,5 về 0,167). Vì nhiệt độ giữ cố định (đẳng nhiệt), áp suất <FormattedMathText text="p" /> cũng phải giảm đi 3 lần tỉ lệ nghịch. Điểm dời lùi dọc theo đường thẳng hướng về sát gốc <FormattedMathText text="O" />!
                </p>
              </div>
            )}
          </div>

          {!quizSubmitted && (
            <button
              disabled={selectedQuizAns === null}
              onClick={() => setQuizSubmitted(true)}
              className="px-5 py-2.5 bg-purple-600 text-white hover:bg-purple-500 border-b-4 border-purple-800 active:translate-y-[2px] active:border-b-0 cursor-pointer font-black text-xs rounded-xl shadow-sm tracking-wider uppercase shrink-0 ml-4"
            >
              Nộp bài
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
