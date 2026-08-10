import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Plus, Trash2, LineChart, Table, Info, Sliders, Wind, HelpCircle, CheckCircle2 } from "lucide-react";
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
  v: number;
  p: number;
  pV: number;
}

export default function Lesson9Simulation() {
  const [volume, setVolume] = useState<number>(20); // in mL, range: 10 to 40
  const [moleculeCount, setMoleculeCount] = useState<number>(40); // number of gas molecules
  const [temperature, setTemperature] = useState<number>(300); // Constant temperature in K
  const [activeGraph, setActiveGraph] = useState<"pV" | "pInverseV">("pV");
  
  // Boyle's Law Constant: k = p * V
  // We model k as proportional to moleculeCount * temperature
  const kValue = (moleculeCount * temperature) / 4; // Constant for the current gas quantity
  const pressure = parseFloat((kValue / volume).toFixed(1)); // p = k / V
  
  // Simulation canvas & physics
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [molecules, setMolecules] = useState<Molecule[]>([]);
  const [realtimeCollisionCount, setRealtimeCollisionCount] = useState<number>(0);
  const [averagePressureEstimate, setAveragePressureEstimate] = useState<number>(0);

  // Data log history (Pre-populated with 11 points to clearly outline the isothermal hyperbola)
  const initialKValue = (40 * 300) / 4; // 3000
  const [dataLogs, setDataLogs] = useState<DataPoint[]>([
    { id: 1, v: 40, p: parseFloat((initialKValue / 40).toFixed(1)), pV: Math.round(initialKValue) },
    { id: 2, v: 36, p: parseFloat((initialKValue / 36).toFixed(1)), pV: Math.round(initialKValue) },
    { id: 3, v: 32, p: parseFloat((initialKValue / 32).toFixed(1)), pV: Math.round(initialKValue) },
    { id: 4, v: 28, p: parseFloat((initialKValue / 28).toFixed(1)), pV: Math.round(initialKValue) },
    { id: 5, v: 24, p: parseFloat((initialKValue / 24).toFixed(1)), pV: Math.round(initialKValue) },
    { id: 6, v: 21, p: parseFloat((initialKValue / 21).toFixed(1)), pV: Math.round(initialKValue) },
    { id: 7, v: 18, p: parseFloat((initialKValue / 18).toFixed(1)), pV: Math.round(initialKValue) },
    { id: 8, v: 15, p: parseFloat((initialKValue / 15).toFixed(1)), pV: Math.round(initialKValue) },
    { id: 9, v: 13, p: parseFloat((initialKValue / 13).toFixed(1)), pV: Math.round(initialKValue) },
    { id: 10, v: 11, p: parseFloat((initialKValue / 11).toFixed(1)), pV: Math.round(initialKValue) },
    { id: 11, v: 10, p: parseFloat((initialKValue / 10).toFixed(1)), pV: Math.round(initialKValue) }
  ]);

  // Mini-quiz inside laboratory
  const [selectedQuizAns, setSelectedQuizAns] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Initialize and update molecules when volume or count changes
  useEffect(() => {
    const activeWidth = (volume / 40) * 260 + 20; // x-bound of piston head
    const newMolecules: Molecule[] = Array.from({ length: moleculeCount }, (_, i) => {
      const existing = molecules[i];
      if (existing && existing.x < activeWidth - 10) {
        return existing;
      }
      return {
        x: Math.random() * (activeWidth - 30) + 15,
        y: Math.random() * 110 + 15,
        vx: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1.5 + 0.5),
        vy: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1.5 + 0.5),
        radius: 3.5,
        color: i % 4 === 0 ? "#0d9488" : i % 3 === 0 ? "#0284c7" : "#ea580c"
      };
    });
    setMolecules(newMolecules);
  }, [moleculeCount]);

  // Physics animation loop
  useEffect(() => {
    let animationFrameId: number;
    let collisionsThisInterval = 0;
    
    // Accumulate collisions to calculate a dynamic pressure estimate
    const collisionTimer = setInterval(() => {
      setRealtimeCollisionCount(collisionsThisInterval);
      
      // Scale collision count to match pressure reading
      const pressureEst = Math.round(collisionsThisInterval * 12 * (300 / temperature));
      setAveragePressureEstimate(prev => Math.round(prev * 0.7 + pressureEst * 0.3));
      
      collisionsThisInterval = 0;
    }, 1000);

    const updatePhysics = () => {
      const activeWidth = (volume / 40) * 260 + 20; // current piston position inside 300x140 canvas
      
      setMolecules(prev =>
        prev.map(m => {
          let nx = m.x + m.vx * 1.2;
          let ny = m.y + m.vy * 1.2;
          let nvx = m.vx;
          let nvy = m.vy;

          // Wall collisions (left, top, bottom)
          if (nx - m.radius < 5) {
            nvx = -m.vx;
            nx = 5 + m.radius;
            collisionsThisInterval++;
          }
          if (ny - m.radius < 5) {
            nvy = -m.vy;
            ny = 5 + m.radius;
            collisionsThisInterval++;
          }
          if (ny + m.radius > 135) {
            nvy = -m.vy;
            ny = 135 - m.radius;
            collisionsThisInterval++;
          }

          // Piston wall collision (moving right wall at activeWidth)
          if (nx + m.radius > activeWidth) {
            nvx = -Math.abs(m.vx);
            nx = activeWidth - m.radius;
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

  // Draw molecules on the canvas (bright white light-theme styling)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw clean white background inside gas chamber
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 300, 140);

    // Draw background grid inside gas chamber
    const activeWidth = (volume / 40) * 260 + 20;
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    for (let x = 10; x < activeWidth; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 5);
      ctx.lineTo(x, 135);
      ctx.stroke();
    }
    for (let y = 15; y < 135; y += 20) {
      ctx.beginPath();
      ctx.moveTo(5, y);
      ctx.lineTo(activeWidth, y);
      ctx.stroke();
    }

    // Draw Container chamber outline (Open to the right for piston)
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(300, 5);
    ctx.lineTo(5, 5);
    ctx.lineTo(5, 135);
    ctx.lineTo(300, 135);
    ctx.stroke();

    // Draw Molecules
    molecules.forEach(m => {
      ctx.fillStyle = m.color;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw Piston Head
    ctx.fillStyle = "#0ea5e9";
    ctx.fillRect(activeWidth - 5, 7, 8, 126);

    // Draw Piston Shaft
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(activeWidth, 60, 300 - activeWidth, 20);

    // Draw Piston Handle
    ctx.fillStyle = "#64748b";
    ctx.fillRect(290, 40, 10, 60);

  }, [molecules, volume]);

  const addPointToLogs = () => {
    if (dataLogs.length >= 15) {
      alert("Hệ thống chỉ lưu tối đa 15 điểm đo để đảm bảo trực quan đồ thị!");
      return;
    }
    const newLog: DataPoint = {
      id: Date.now(),
      v: volume,
      p: pressure,
      pV: Math.round(volume * pressure)
    };
    // Avoid exact duplicate volumes
    if (dataLogs.some(d => d.v === volume)) {
      alert("Thể tích này đã được ghi nhận số liệu!");
      return;
    }
    setDataLogs([...dataLogs, newLog].sort((a, b) => a.v - b.v));
  };

  const deleteLog = (id: number) => {
    setDataLogs(dataLogs.filter(d => d.id !== id));
  };

  const clearAllLogs = () => {
    setDataLogs([]);
  };

  const loadPreset = (type: "compress" | "expand") => {
    if (type === "compress") {
      setVolume(12);
    } else {
      setVolume(38);
    }
  };

  // SVG Chart drawing calculations
  const padding = 25;
  const chartW = 220;
  const chartH = 150;
  const maxV = 45;
  
  // Dynamic scaling for pressure axis so that the hyperbola is steep and highly visible:
  const maxP = moleculeCount <= 40 ? 500 : moleculeCount <= 60 ? 750 : 1000;
  const pStep = maxP / 5;

  // Map V coordinate to SVG X
  const getX = (v: number) => padding + (v / maxV) * chartW;
  // Map P coordinate to SVG Y
  const getY = (p: number) => padding + chartH - (p / maxP) * chartH;

  // Map 1/V coordinate to SVG X for Linear plot
  const maxInvV = 0.11; // 1/10 mL is 0.1, let's set max x scale as 0.11
  const getLinearX = (invV: number) => padding + (invV / maxInvV) * chartW;

  return (
    <div className="space-y-6 text-slate-900 animate-fade-in">
      {/* Simulation Subheader */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-[10px] font-black bg-teal-100 text-teal-800 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider inline-block">
            Môi trường thí nghiệm đẳng nhiệt ảo
          </span>
          <p className="text-xs text-slate-600 mt-1.5 font-bold leading-relaxed flex flex-wrap items-center gap-1">
            Đo đạc tương tác vi mô phân tử, ghi biểu đồ Clapeyron đẳng nhiệt, và kiểm chứng hằng số định luật Boyle <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="\(p \cdot V = \text{const}\)" /></span> thực tế.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => loadPreset("compress")}
            className="px-3 py-1.5 bg-white border-2 border-slate-200 hover:border-teal-500 rounded-xl text-xs font-black text-slate-800 transition-all hover:bg-slate-50 cursor-pointer shadow-sm"
          >
            Nén đẳng nhiệt (12 mL)
          </button>
          <button
            onClick={() => loadPreset("expand")}
            className="px-3 py-1.5 bg-white border-2 border-slate-200 hover:border-teal-500 rounded-xl text-xs font-black text-slate-800 transition-all hover:bg-slate-50 cursor-pointer shadow-sm"
          >
            Giãn đẳng nhiệt (38 mL)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Interactive Syringe and Controls */}
        <div className="xl:col-span-5 flex flex-col justify-between gap-6">
          {/* Visual Container Box */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="h-4 w-4 text-teal-600 animate-pulse" />
                Mô hình Xi-lanh và Pít-tông
              </span>
              <span className="text-[10px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full border border-teal-200 font-mono font-black flex items-center gap-1">
                <FormattedMathText text={`T = ${temperature}\\text{ K} = \\text{const}`} />
              </span>
            </div>

            {/* Canvas for Particles */}
            <div className="relative bg-slate-50 border-2 border-slate-200 rounded-2xl overflow-hidden h-[150px] flex items-center justify-center p-1.5 shadow-inner">
              <canvas
                ref={canvasRef}
                width={300}
                height={140}
                className="w-full h-full rounded-lg"
              />
              <div className="absolute top-2 left-2 flex gap-1">
                <span className="text-[9px] bg-slate-900/90 text-teal-300 border border-teal-500/20 px-2 py-0.5 rounded-md font-mono font-bold">
                  Mật độ khí: {Math.round((moleculeCount / volume) * 10)} hạt/mL
                </span>
              </div>
            </div>

            {/* Cylinder Volume Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700 items-center">
                <span>Điều chỉnh Thể tích (<FormattedMathText text="V" />):</span>
                <strong className="text-teal-600 font-mono font-black">{volume} mL</strong>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="1"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-mono font-black">
                <span>10 mL (Nén dồn dập)</span>
                <span>40 mL (Giãn thưa thớt)</span>
              </div>
            </div>

            {/* Cylinder Temperature Slider */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs font-bold text-slate-700 items-center">
                <span>Điều chỉnh Nhiệt độ (<FormattedMathText text="T" />):</span>
                <strong className="text-amber-600 font-mono font-black">{temperature} K ({temperature - 273}°C)</strong>
              </div>
              <input
                type="range"
                min="200"
                max="400"
                step="10"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-mono font-black">
                <span>200 K (Nhiệt độ thấp)</span>
                <span>400 K (Nhiệt độ cao)</span>
              </div>
            </div>

            {/* Quantity controls */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs font-bold">
              <div>
                <span className="text-slate-600 block mb-1">Số hạt khí (mật độ):</span>
                <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setMoleculeCount(prev => Math.max(20, prev - 10))}
                    className="w-7 h-7 bg-white hover:bg-slate-100 text-slate-800 rounded-lg border border-slate-250 transition-colors font-black flex items-center justify-center cursor-pointer text-sm"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-mono font-black text-slate-800">{moleculeCount} hạt</span>
                  <button
                    onClick={() => setMoleculeCount(prev => Math.min(80, prev + 10))}
                    className="w-7 h-7 bg-white hover:bg-slate-100 text-slate-800 rounded-lg border border-slate-250 transition-colors font-black flex items-center justify-center cursor-pointer text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <span className="text-slate-600 block mb-1">Môi chất khí:</span>
                <select className="w-full bg-slate-50 text-slate-800 text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 h-[38px] outline-none font-bold focus:border-teal-500 cursor-pointer">
                  <option>Khí Không khí (N2/O2)</option>
                  <option>Khí Heli (He)</option>
                  <option>Khí Carbon Dioxide (CO2)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Telemetry readouts in light 3D layout */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-4 grid grid-cols-3 gap-3 shadow-inner">
            <div className="text-center p-3 bg-white border-2 border-slate-150 rounded-2xl shadow-sm">
              <span className="block text-[9px] text-slate-500 font-black uppercase tracking-wider">Thể tích (<FormattedMathText text="V" />)</span>
              <strong className="text-lg font-mono text-emerald-600 block mt-0.5">{volume} <span className="text-[10px]">mL</span></strong>
              <span className="text-[8px] text-slate-400 font-bold block">Thực tế</span>
            </div>
            
            <div className="text-center p-3 bg-white border-2 border-slate-150 rounded-2xl shadow-sm">
              <span className="block text-[9px] text-slate-500 font-black uppercase tracking-wider">Áp suất (<FormattedMathText text="p" />)</span>
              <strong className="text-lg font-mono text-cyan-600 block mt-0.5">{pressure} <span className="text-[10px]">kPa</span></strong>
              <span className="text-[8px] text-slate-400 font-bold block">Đồng hồ số</span>
            </div>

            <div className="text-center p-3 bg-white border-2 border-slate-150 rounded-2xl shadow-sm">
              <span className="block text-[9px] text-slate-500 font-black uppercase tracking-wider">Tích số <FormattedMathText text="\(p \cdot V\)" /></span>
              <strong className="text-lg font-mono text-amber-600 block mt-0.5">
                {Math.round(pressure * volume)}
              </strong>
              <span className="text-[8px] text-slate-400 font-bold block">kPa.mL</span>
            </div>
          </div>

          <button
            onClick={addPointToLogs}
            className="w-full py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-2xl border-b-[4px] border-b-teal-700 active:translate-y-[2px] active:border-b-0 shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
          >
            <Plus className="h-4.5 w-4.5 stroke-[3]" />
            Ghi lại số liệu đo thực nghiệm
          </button>
        </div>

        {/* Right Column: Data Table and Real-time Graph */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          
          {/* Tabs header for graphs on white card */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 flex flex-col justify-between flex-1 min-h-[380px] shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <LineChart className="h-4 w-4 text-teal-600 animate-pulse" />
                Biểu đồ Clapeyron thời gian thực
              </span>

              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-[10px]">
                <button
                  onClick={() => setActiveGraph("pV")}
                  className={`px-3 py-1 rounded-lg font-black transition-all cursor-pointer ${
                    activeGraph === "pV" ? "bg-teal-500 text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Hệ tọa độ <FormattedMathText text="p - V" />
                </button>
                <button
                  onClick={() => setActiveGraph("pInverseV")}
                  className={`px-3 py-1 rounded-lg font-black transition-all cursor-pointer ${
                    activeGraph === "pInverseV" ? "bg-teal-500 text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Hệ tọa độ <FormattedMathText text="p - 1/V" />
                </button>
              </div>
            </div>

            {/* Main Graph Area inside bright white SVG wrapper */}
            <div className="flex justify-center items-center py-4 bg-slate-50 rounded-2xl border-2 border-slate-100 shadow-inner">
              {activeGraph === "pV" ? (
                <div className="relative">
                  <svg className="w-[300px] h-[200px] overflow-visible" viewBox={`0 0 270 200`}>
                    {/* Grid background lines */}
                    {Array.from({ length: 5 }).map((_, i) => {
                      const yPos = getY((i + 1) * pStep);
                      const xPos = getX((i + 1) * 8);
                      return (
                        <g key={i}>
                          <line x1={padding} y1={yPos} x2={padding + chartW} y2={yPos} stroke="#e2e8f0" strokeWidth="1" />
                          <line x1={xPos} y1={padding} x2={xPos} y2={padding + chartH} stroke="#e2e8f0" strokeWidth="1" />
                          
                          {/* Y-axis values */}
                          <text x={padding - 6} y={yPos + 3} fill="#475569" fontSize="8" fontWeight="bold" textAnchor="end">{Math.round((i + 1) * pStep)}</text>
                          {/* X-axis values */}
                          <text x={xPos} y={padding + chartH + 11} fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">{(i + 1) * 8}</text>
                        </g>
                      );
                    })}

                    {/* Coordinate Axes */}
                    <line x1={padding} y1={padding + chartH} x2={padding + chartW + 15} y2={padding + chartH} stroke="#334155" strokeWidth="1.8" />
                    <line x1={padding} y1={padding + chartH} x2={padding} y2={padding - 10} stroke="#334155" strokeWidth="1.8" />
                    
                    {/* Axis labels */}
                    <text x={padding + chartW + 12} y={padding + chartH + 13} fill="#1e293b" fontSize="8.5" fontWeight="black">V (mL)</text>
                    <text x={padding - 10} y={padding - 13} fill="#1e293b" fontSize="8.5" fontWeight="black">p (kPa)</text>
                    <text x={padding - 8} y={padding + chartH + 9} fill="#475569" fontSize="8" fontWeight="bold">0</text>

                    {/* Reference Boundary Isotherm T1 = 200 K (Nhiệt độ thấp) */}
                    {(() => {
                      const k1 = (moleculeCount * 200) / 4;
                      let pathPoints = [];
                      for (let v = 6; v <= 44; v += 0.5) {
                        const p = k1 / v;
                        if (p <= maxP * 1.05) {
                          pathPoints.push(`${getX(v)},${getY(p)}`);
                        }
                      }
                      return (
                        <>
                          <path
                            d={`M ${pathPoints.join(" L ")}`}
                            fill="none"
                            stroke="#0284c7"
                            strokeWidth="2"
                            strokeDasharray="4 2"
                            opacity="0.6"
                          />
                          <text x={getX(32) + 5} y={getY(k1 / 32) - 5} fill="#0284c7" fontSize="7.5" fontWeight="black">T₁ = 200 K</text>
                        </>
                      );
                    })()}

                    {/* Reference Boundary Isotherm T2 = 400 K (Nhiệt độ cao) */}
                    {(() => {
                      const k2 = (moleculeCount * 400) / 4;
                      let pathPoints = [];
                      for (let v = 6; v <= 44; v += 0.5) {
                        const p = k2 / v;
                        if (p <= maxP * 1.05) {
                          pathPoints.push(`${getX(v)},${getY(p)}`);
                        }
                      }
                      return (
                        <>
                          <path
                            d={`M ${pathPoints.join(" L ")}`}
                            fill="none"
                            stroke="#ea580c"
                            strokeWidth="2"
                            strokeDasharray="4 2"
                            opacity="0.6"
                          />
                          <text x={getX(32) + 5} y={getY(k2 / 32) - 5} fill="#ea580c" fontSize="7.5" fontWeight="black">T₂ = 400 K</text>
                        </>
                      );
                    })()}

                    {/* Active Real-time Isothermal Curve */}
                    {(() => {
                      let pathPoints = [];
                      for (let v = 6; v <= 44; v += 0.5) {
                        const p = kValue / v;
                        if (p <= maxP * 1.05) {
                          pathPoints.push(`${getX(v)},${getY(p)}`);
                        }
                      }
                      return (
                        <>
                          <path
                            d={`M ${pathPoints.join(" L ")}`}
                            fill="none"
                            stroke="#0d9488"
                            strokeWidth="3.5"
                          />
                          <text x={getX(12) + 12} y={getY(kValue / 12) - 8} fill="#0d9488" fontSize="8.5" fontWeight="black">T = {temperature} K (Hiện tại)</text>
                        </>
                      );
                    })()}

                    {/* Plot registered dataLogs points */}
                    {dataLogs.map((point) => {
                      const cx = getX(point.v);
                      const cy = getY(point.p);
                      return (
                        <g key={point.id} className="group/node">
                          <circle cx={cx} cy={cy} r="5" className="fill-teal-500 stroke-white stroke-[1.5] cursor-pointer hover:scale-150 transition-transform" />
                          <circle cx={cx} cy={cy} r="8" className="fill-teal-400/25 stroke-none animate-ping" />
                          <text x={cx + 6} y={cy - 6} fill="#0d9488" fontSize="8" fontWeight="black">
                            ({point.v}, {Math.round(point.p)})
                          </text>
                        </g>
                      );
                    })}

                    {/* Current real-time point */}
                    <circle
                      cx={getX(volume)}
                      cy={getY(pressure)}
                      r="6.5"
                      className="fill-amber-500 stroke-white stroke-[2] shadow"
                    />
                    <text x={getX(volume) - 20} y={getY(pressure) - 11} fill="#d97706" fontSize="8.5" fontWeight="black">
                      Hiện tại
                    </text>
                  </svg>
                </div>
              ) : (
                <div className="relative">
                  <svg className="w-[300px] h-[200px] overflow-visible" viewBox={`0 0 270 200`}>
                    {/* Linear axis gridlines */}
                    {Array.from({ length: 5 }).map((_, i) => {
                      const yPos = getY((i + 1) * pStep);
                      const currentInvV = (i + 1) * 0.02; // max is 0.11
                      const xPos = getLinearX(currentInvV);
                      return (
                        <g key={i}>
                          <line x1={padding} y1={yPos} x2={padding + chartW} y2={yPos} stroke="#e2e8f0" strokeWidth="1" />
                          <line x1={xPos} y1={padding} x2={xPos} y2={padding + chartH} stroke="#e2e8f0" strokeWidth="1" />
                          
                          {/* Y-axis values */}
                          <text x={padding - 6} y={yPos + 3} fill="#475569" fontSize="8" fontWeight="bold" textAnchor="end">{Math.round((i + 1) * pStep)}</text>
                          {/* X-axis values (1/V) */}
                          <text x={xPos} y={padding + chartH + 11} fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">{currentInvV.toFixed(2)}</text>
                        </g>
                      );
                    })}

                    {/* Coordinate Axes */}
                    <line x1={padding} y1={padding + chartH} x2={padding + chartW + 15} y2={padding + chartH} stroke="#334155" strokeWidth="1.8" />
                    <line x1={padding} y1={padding + chartH} x2={padding} y2={padding - 10} stroke="#334155" strokeWidth="1.8" />
                    
                    {/* Axis labels */}
                    <text x={padding + chartW + 5} y={padding + chartH + 13} fill="#1e293b" fontSize="8.5" fontWeight="black">1/V (mL⁻¹)</text>
                    <text x={padding - 10} y={padding - 13} fill="#1e293b" fontSize="8.5" fontWeight="black">p (kPa)</text>
                    <text x={padding - 8} y={padding + chartH + 9} fill="#475569" fontSize="8" fontWeight="bold">0</text>

                    {/* Theoretical straight line: p = k * (1/V) */}
                    <line
                      x1={padding}
                      y1={padding + chartH}
                      x2={getLinearX(0.105)}
                      y2={getY(kValue * 0.105)}
                      stroke="#0d9488"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Plot registered dataLogs points */}
                    {dataLogs.map((point) => {
                      const cx = getLinearX(1 / point.v);
                      const cy = getY(point.p);
                      return (
                        <g key={point.id}>
                          <circle cx={cx} cy={cy} r="5" className="fill-teal-500 stroke-white stroke-[1.5]" />
                          <text x={cx + 6} y={cy - 4} fill="#0d9488" fontSize="8" fontWeight="black">
                            ({(1/point.v).toFixed(3)}, {Math.round(point.p)})
                          </text>
                        </g>
                      );
                    })}

                    {/* Current real-time point */}
                    <circle
                      cx={getLinearX(1 / volume)}
                      cy={getY(pressure)}
                      r="6.5"
                      className="fill-amber-500 stroke-white stroke-[2]"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Recorded data table inside tab */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center text-[10.5px]">
                <span className="font-black text-slate-800 flex items-center gap-1.5">
                  <Table className="h-4 w-4 text-teal-600 animate-pulse" />
                  Sổ ghi chép số liệu đo đẳng nhiệt ({dataLogs.length} điểm đã ghi)
                </span>
                {dataLogs.length > 0 && (
                  <button
                    onClick={clearAllLogs}
                    className="text-rose-600 hover:text-rose-500 font-black text-[10px] flex items-center gap-1 cursor-pointer bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Xóa toàn bộ số liệu
                  </button>
                )}
              </div>

              <div className="overflow-y-auto max-h-[110px] rounded-2xl border-2 border-slate-200 bg-white text-[11px] shadow-inner">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <th className="px-3 py-1.5 font-black">Điểm đo</th>
                      <th className="px-3 py-1.5 font-black font-mono"><FormattedMathText text="\(V\)" /> (mL)</th>
                      <th className="px-3 py-1.5 font-black font-mono"><FormattedMathText text="\(1/V\)" /> (mL⁻¹)</th>
                      <th className="px-3 py-1.5 font-black font-mono"><FormattedMathText text="\(p\)" /> (kPa)</th>
                      <th className="px-3 py-1.5 font-black font-mono text-teal-700"><FormattedMathText text="\(p \cdot V = k\)" /> (Hằng số)</th>
                      <th className="px-3 py-1.5 font-black text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-800 font-bold">
                    {dataLogs.map((point, index) => (
                      <tr key={point.id} className="hover:bg-slate-50/50">
                        <td className="px-3 py-1.5 text-slate-400 font-sans font-bold">Lần #{index + 1}</td>
                        <td className="px-3 py-1.5 text-emerald-600 font-black">{point.v}</td>
                        <td className="px-3 py-1.5 text-slate-500">{(1 / point.v).toFixed(3)}</td>
                        <td className="px-3 py-1.5 text-cyan-600 font-black">{point.p}</td>
                        <td className="px-3 py-1.5 text-amber-600 font-black">{point.pV}</td>
                        <td className="px-3 py-1.5 text-center">
                          <button
                            onClick={() => deleteLog(point.id)}
                            className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-all border border-transparent hover:border-rose-100 cursor-pointer"
                            title="Xóa dòng này"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {dataLogs.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-3 py-6 text-center text-slate-400 text-[10.5px] italic font-sans font-bold">
                          Chưa lưu điểm số liệu nào. Nhấp nút &quot;Ghi lại số liệu đo thực nghiệm&quot; bên dưới xi-lanh để bắt đầu ghi chép!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Mini Laboratory Quiz (Styled in purple 3D layout matching Lesson 8 summary) */}
      <div className="bg-gradient-to-b from-purple-50 to-indigo-50/40 border-2 border-purple-250 border-b-[6px] border-b-purple-350 rounded-3xl p-5 space-y-4 shadow-sm">
        <span className="text-[10px] bg-purple-100 text-purple-800 px-3 py-1 rounded-full border border-purple-200 font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
          <HelpCircle className="h-3.5 w-3.5" />
          Kiểm tra nhanh kiến thức lý thuyết đẳng nhiệt
        </span>
        
        <div className="text-xs text-slate-900 leading-relaxed space-y-3 font-bold">
          <strong className="text-slate-950 text-sm block leading-relaxed">
            Câu hỏi: Ở nhiệt độ không đổi, nếu ta nén khí đẳng nhiệt trong xi-lanh để thể tích <FormattedMathText text="V" /> giảm đi 3 lần thì áp suất khí <FormattedMathText text="p" /> bên trong thay đổi như thế nào?
          </strong>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            {[
              "A. Giảm đi 3 lần do khoảng cách hạt phân tử rộng ra.",
              "B. Tăng lên 3 lần do mật độ va chạm phân tử lên thành bình tăng 3 lần.",
              "C. Tăng lên 9 lần do lực đẩy tĩnh điện giữa các phân tử.",
              "D. Hoàn toàn không đổi do nhiệt độ được giữ bảo ôn cố định."
            ].map((ans, idx) => {
              const isSelected = selectedQuizAns === idx;
              let btnClass = "";
              if (quizSubmitted) {
                if (idx === 1) {
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
                  className={`px-4 py-3 rounded-2xl text-left cursor-pointer transition-all ${btnClass}`}
                >
                  {ans}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
            <div>
              {quizSubmitted && (
                <span className={`text-[12px] font-black flex items-center gap-1.5 ${selectedQuizAns === 1 ? "text-emerald-600" : "text-rose-600 animate-pulse"}`}>
                  {selectedQuizAns === 1 ? (
                    <><CheckCircle2 className="h-5 w-5 stroke-[2.5]" /> Chúc mừng! Bạn đã lý giải hoàn hảo cơ chế vi mô định luật Boyle.</>
                  ) : (
                    <>Rất tiếc! Đáp án đúng là B (Tăng 3 lần do mật độ va chạm phân tử dồn dập tăng 3 lần).</>
                  )}
                </span>
              )}
            </div>

            {!quizSubmitted ? (
              <button
                disabled={selectedQuizAns === null}
                onClick={() => setQuizSubmitted(true)}
                className={`px-4 py-2 rounded-xl font-black text-xs transition-all tracking-wider ${
                  selectedQuizAns !== null
                    ? "bg-purple-600 text-white hover:bg-purple-500 border-b-4 border-purple-800 active:translate-y-[2px] active:border-b-0 cursor-pointer shadow-md"
                    : "bg-slate-200 text-slate-400 border border-slate-350 cursor-not-allowed"
                }`}
              >
                Nộp câu trả lời
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedQuizAns(null);
                  setQuizSubmitted(false);
                }}
                className="px-4 py-1.5 bg-white border-2 border-slate-200 hover:bg-slate-50 rounded-xl font-black text-xs text-slate-700 transition-all cursor-pointer shadow-sm"
              >
                Làm lại câu hỏi
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
