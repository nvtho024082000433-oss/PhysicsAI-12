import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Plus, Trash2, LineChart, Table, Info, Sliders, Flame, Thermometer, Wind, HelpCircle, CheckCircle2 } from "lucide-react";
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
  t: number; // Celsius
  T: number; // Kelvin
  v: number; // Volume mL
  p: number; // Pressure atm
}

export default function Lesson10Simulation() {
  const [temperature, setTemperature] = useState<number>(300); // in K, range: 150K to 450K
  const [pressureAtm, setPressureAtm] = useState<number>(1.0); // options: 1.0, 1.5, 2.0 atm
  const [moleculeCount, setMoleculeCount] = useState<number>(40); // gas quantity
  const [activeGraph, setActiveGraph] = useState<"VT" | "Vt" | "pV">("VT");

  const tempCelsius = temperature - 273; // Celsius temperature
  
  // Volume based on Charles's Law + Ideal Gas Law: V = nRT / P. 
  // We model nR such that at T=300K, P=1.0 atm, V=30 mL.
  // V = (30 * T) / (300 * pressureAtm) = T / (10 * pressureAtm)
  const volume = parseFloat((temperature / (10 * pressureAtm)).toFixed(1));

  // Simulation canvas & physics
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [molecules, setMolecules] = useState<Molecule[]>([]);
  const [collisionCount, setCollisionCount] = useState<number>(0);
  const [pistonVibration, setPistonVibration] = useState<number>(0);

  // Data logs history
  const [dataLogs, setDataLogs] = useState<DataPoint[]>([
    { id: 1, t: -123, T: 150, v: 15.0, p: 1.0 },
    { id: 2, t: -23, T: 250, v: 25.0, p: 1.0 },
    { id: 3, t: 27, T: 300, v: 30.0, p: 1.0 },
    { id: 4, t: 77, T: 350, v: 35.0, p: 1.0 },
    { id: 5, t: 177, T: 450, v: 45.0, p: 1.0 },
  ]);

  // Mini quiz state
  const [selectedQuizAns, setSelectedQuizAns] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Initialize and adjust molecules
  useEffect(() => {
    // Canvas dimensions are 300x140. Max volume in model is 45 mL (at T=450K, P=1.0).
    // Let's scale volume such that 50 mL occupies the full width of chamber.
    const activeWidth = (volume / 50) * 260 + 20; 
    
    const newMolecules: Molecule[] = Array.from({ length: moleculeCount }, (_, i) => {
      const existing = molecules[i];
      if (existing && existing.x < activeWidth - 10) {
        // Update velocity based on temperature (speed proportional to sqrt(T))
        const speedScale = Math.sqrt(temperature / 300);
        // Normalize and scale current velocity
        const speed = Math.sqrt(existing.vx * existing.vx + existing.vy * existing.vy);
        const targetSpeed = (Math.random() * 1.0 + 0.8) * speedScale;
        const vx = speed > 0 ? (existing.vx / speed) * targetSpeed : (Math.random() - 0.5);
        const vy = speed > 0 ? (existing.vy / speed) * targetSpeed : (Math.random() - 0.5);
        return {
          ...existing,
          vx,
          vy
        };
      }
      
      const speedScale = Math.sqrt(temperature / 300);
      return {
        x: Math.random() * (activeWidth - 30) + 15,
        y: Math.random() * 110 + 15,
        vx: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1.2 + 0.4) * speedScale,
        vy: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1.2 + 0.4) * speedScale,
        radius: 3.5,
        color: i % 3 === 0 ? "#60a5fa" : i % 2 === 0 ? "#f43f5e" : "#fbbf24"
      };
    });
    setMolecules(newMolecules);
  }, [moleculeCount, temperature, pressureAtm]);

  // Physics animation loop
  useEffect(() => {
    let animationFrameId: number;
    let collisionsThisInterval = 0;

    const collisionTimer = setInterval(() => {
      setCollisionCount(collisionsThisInterval);
      collisionsThisInterval = 0;
    }, 1000);

    const updatePhysics = () => {
      const activeWidth = (volume / 50) * 260 + 20;

      setMolecules(prev =>
        prev.map(m => {
          // Adjust position if somehow outside due to sudden pressure/volume co-contraction
          let nx = m.x + m.vx;
          let ny = m.y + m.vy;
          let nvx = m.vx;
          let nvy = m.vy;

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

          // Piston head collision
          if (nx + m.radius > activeWidth) {
            nvx = -Math.abs(m.vx);
            nx = activeWidth - m.radius;
            collisionsThisInterval++;
            // Trigger a minor piston vibration effect on hit
            setPistonVibration(3);
          }

          return { ...m, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );

      // Dampen piston vibration
      setPistonVibration(v => (v > 0.2 ? v - 0.2 : 0));

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(collisionTimer);
    };
  }, [volume]);

  // Render canvas molecules
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 300, 140);

    const activeWidth = (volume / 50) * 260 + 20;

    // Draw background grid
    ctx.strokeStyle = "rgba(51, 65, 85, 0.4)";
    ctx.lineWidth = 0.5;
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

    // Draw molecules
    molecules.forEach(m => {
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
      ctx.fillStyle = m.color;
      ctx.shadowBlur = 4;
      ctx.shadowColor = m.color;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    });

    // Draw bottom/top container borders
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(5, 5);
    ctx.lineTo(295, 5);
    ctx.moveTo(5, 135);
    ctx.lineTo(295, 135);
    ctx.stroke();

    // Draw left container wall
    ctx.beginPath();
    ctx.moveTo(5, 3);
    ctx.lineTo(5, 137);
    ctx.stroke();

    // Draw moving Piston Head (at activeWidth)
    const vibOffset = (Math.random() - 0.5) * pistonVibration;
    const pistonX = activeWidth + vibOffset;

    ctx.fillStyle = "#64748b";
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    // Draw thick piston head block
    ctx.beginPath();
    ctx.rect(pistonX, 6, 8, 128);
    ctx.fill();
    ctx.stroke();

    // Draw piston shaft going to the right
    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.rect(pistonX + 8, 62, 300 - pistonX, 16);
    ctx.fill();
    ctx.stroke();

    // Draw pressure force indicators pushing back from outside to represent constant pressure
    // Higher pressure = more arrows
    ctx.strokeStyle = "#f43f5e";
    ctx.fillStyle = "#f43f5e";
    ctx.lineWidth = 1.5;
    const arrowCount = pressureAtm === 1.0 ? 2 : pressureAtm === 1.5 ? 3 : 4;
    for (let i = 0; i < arrowCount; i++) {
      const yPos = 30 + i * (80 / (arrowCount - 1 || 1));
      ctx.beginPath();
      ctx.moveTo(pistonX + 35, yPos);
      ctx.lineTo(pistonX + 15, yPos);
      ctx.stroke();
      // Arrow head
      ctx.beginPath();
      ctx.moveTo(pistonX + 15, yPos);
      ctx.lineTo(pistonX + 20, yPos - 3);
      ctx.lineTo(pistonX + 20, yPos + 3);
      ctx.fill();
    }
  }, [molecules, volume, pistonVibration, pressureAtm]);

  const addPointToLogs = () => {
    if (dataLogs.some(d => d.T === temperature && d.p === pressureAtm)) return;
    const newPoint = {
      id: Date.now(),
      t: tempCelsius,
      T: temperature,
      v: volume,
      p: pressureAtm,
    };
    setDataLogs([...dataLogs, newPoint].sort((a, b) => a.T - b.T));
  };

  const clearLogs = () => {
    setDataLogs([]);
  };

  const resetLogs = () => {
    setDataLogs([
      { id: 1, t: -123, T: 150, v: 15.0, p: 1.0 },
      { id: 2, t: -23, T: 250, v: 25.0, p: 1.0 },
      { id: 3, t: 27, T: 300, v: 30.0, p: 1.0 },
      { id: 4, t: 77, T: 350, v: 35.0, p: 1.0 },
      { id: 5, t: 177, T: 450, v: 45.0, p: 1.0 },
    ]);
  };

  // Graph sizing configuration
  const padding = 35;
  const chartW = 200;
  const chartH = 120;

  // Coordinate scales mapping functions
  // Volume ranges from 0 to 50 mL. Temperature Kelvin ranges from 0 to 500 K.
  const getX_K = (T: number) => padding + (T / 500) * chartW;
  const getY_V = (V: number) => padding + chartH - (V / 50) * chartH;

  // Temperature Celsius ranges from -273°C to 227°C
  const getX_C = (t: number) => padding + ((t + 273) / 500) * chartW;

  const conceptQuiz = {
    question: "Tại sao khi đun nóng khí đẳng áp trong xilanh, thể tích lại tăng lên tỉ lệ thuận với nhiệt độ tuyệt đối T?",
    options: [
      "A. Do các phân tử khí nở ra to hơn khi gặp nhiệt độ cao đè nặng lên pit-tông.",
      "B. Do số lượng hạt phân tử khí tăng lên không ngừng chiếm không gian rộng hơn.",
      "C. Do nhiệt độ tăng, tốc độ chuyển động nhiệt tăng, lực va đập lên pit-tông tăng; để giữ áp suất không đổi bằng áp suất ngoài, thể tích phải nở rộng ra làm loãng mật độ va đập.",
      "D. Do lực hút tĩnh điện giữa các phân tử bị triệt tiêu khi đun nóng."
    ],
    correctIdx: 2,
    explanation: "Đúng! Khi đun nóng (T tăng), động năng và tốc độ hạt tăng làm chúng đập mạnh hơn. Để áp suất bên trong không đổi (vẫn cân bằng áp suất ngoài), thể tích xilanh phải tăng lên tương ứng để làm giảm mật độ va đập, cân bằng lại lực ép bên ngoài."
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 text-slate-200">
      {/* Left Column: Interactive Simulation Panel */}
      <div className="xl:col-span-5 flex flex-col gap-6">
        
        {/* Lab Chamber Box */}
        <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 flex flex-col justify-between min-h-[380px]">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
                Phòng thí nghiệm Charles ảo
              </span>
              <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                <FormattedMathText text={`p_{ngoài} = ${pressureAtm.toFixed(1)} atm`} /> (ĐẲNG ÁP)
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-300">Bộ xilanh đẳng áp bôi trơn</h4>
          </div>

          {/* Interactive Canvas container */}
          <div className="bg-slate-900 border border-slate-880 rounded-xl p-2.5 my-3 relative overflow-hidden flex flex-col justify-center items-center">
            <canvas 
              ref={canvasRef} 
              width={300} 
              height={140} 
              className="bg-slate-950 rounded border border-slate-900 w-full max-w-[300px] h-36"
            />
            {/* Heat effect coloring behind canvas based on temperature */}
            <div 
              className="absolute bottom-1.5 left-1.5 right-1.5 h-1.5 rounded transition-all duration-300"
              style={{
                backgroundColor: `rgba(244, 63, 94, ${Math.max(0, (temperature - 200) / 400)})`,
                filter: 'blur(1px)'
              }}
            />
          </div>

          {/* Controls Sliders */}
          <div className="space-y-4">
            {/* Slider 1: Temperature */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold flex items-center gap-1">
                  <Thermometer className="h-4 w-4 text-amber-500" />
                  Nhiệt độ tuyệt đối (<FormattedMathText text="T" />):
                </span>
                <strong className="text-amber-400 font-bold flex items-center gap-1">
                  <FormattedMathText text={`${temperature} K`} /> <span className="text-slate-500 text-[11px]">({tempCelsius.toFixed(0)} °C)</span>
                </strong>
              </div>
              <input 
                type="range" 
                min="150" 
                max="450" 
                step="5"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[9px] text-slate-500">
                <span>150 K (Lạnh cực độ)</span>
                <span>300 K (Nhiệt độ phòng)</span>
                <span>450 K (Nóng nén lớn)</span>
              </div>
            </div>

            {/* Slider 2: External Constant Pressure p */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold flex items-center gap-1">
                  <Sliders className="h-4 w-4 text-blue-500" />
                  Áp suất khí quyển ép ngoài (<FormattedMathText text="p" />):
                </span>
                <strong className="text-blue-400 font-bold">
                  <FormattedMathText text={`${pressureAtm.toFixed(1)} atm`} />
                </strong>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1.0, 1.5, 2.0].map((val) => (
                  <button
                    key={val}
                    onClick={() => setPressureAtm(val)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      pressureAtm === val 
                        ? "bg-blue-600/30 border-blue-500 text-blue-300 shadow-md shadow-blue-500/10" 
                        : "bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-400"
                    }`}
                  >
                    <FormattedMathText text={`${val.toFixed(1)} atm`} />
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 italic mt-1 leading-relaxed">
                * Thay đổi áp suất ngoài sẽ làm dịch chuyển đường đẳng áp sang một độ dốc khác (đối chiếu Hình 10.2 SGK).
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 border-t border-slate-900 pt-3 mt-3">
            <div className="text-center p-2 bg-slate-900 border border-slate-850 rounded-xl">
              <span className="block text-[8px] text-slate-500 font-bold uppercase flex items-center justify-center gap-0.5">Thể tích (<FormattedMathText text="V" />)</span>
              <strong className="text-sm font-mono text-blue-400 block mt-0.5">
                {volume.toFixed(1)} <span className="text-[9px]">mL</span>
              </strong>
            </div>

            <div className="text-center p-2 bg-slate-900 border border-slate-850 rounded-xl">
              <span className="block text-[8px] text-slate-500 font-bold uppercase flex items-center justify-center gap-0.5">Áp suất (<FormattedMathText text="p" />)</span>
              <strong className="text-sm font-mono text-rose-400 block mt-0.5">
                {pressureAtm.toFixed(1)} <span className="text-[9px]">atm</span>
              </strong>
            </div>

            <div className="text-center p-2 bg-slate-900 border border-slate-850 rounded-xl">
              <span className="block text-[8px] text-slate-500 font-bold uppercase flex items-center justify-center gap-0.5">Tỉ số <FormattedMathText text="V/T" /></span>
              <strong className="text-sm font-mono text-emerald-400 block mt-0.5">
                {(volume / temperature).toFixed(5)}
              </strong>
            </div>
          </div>

          <button
            onClick={addPointToLogs}
            className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 transition-all text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-500/10 active:scale-[0.99] mt-3"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            GHI LẠI ĐIỂM ĐO THỰC THỜI (RECORD)
          </button>
        </div>
      </div>

      {/* Right Column: Dynamic Data Logs & Real-time Graph Visualizer */}
      <div className="xl:col-span-7 flex flex-col gap-6">
        
        {/* Graph and Data panel */}
        <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 flex flex-col justify-between flex-1 min-h-[380px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-900 pb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <LineChart className="h-3.5 w-3.5 text-blue-400" />
              Biểu đồ đẳng áp thời gian thực (Real-time chart)
            </span>

            {/* Toggle Graph representation tabs */}
            <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px]">
              <button
                onClick={() => setActiveGraph("VT")}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  activeGraph === "VT" ? "bg-blue-500 text-slate-950" : "text-slate-400 hover:text-white"
                }`}
              >
                Hệ (V - T)
              </button>
              <button
                onClick={() => setActiveGraph("Vt")}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  activeGraph === "Vt" ? "bg-blue-500 text-slate-950" : "text-slate-400 hover:text-white"
                }`}
              >
                Hệ (V - t)
              </button>
              <button
                onClick={() => setActiveGraph("pV")}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  activeGraph === "pV" ? "bg-blue-500 text-slate-950" : "text-slate-400 hover:text-white"
                }`}
              >
                Hệ (p - T/V)
              </button>
            </div>
          </div>

          {/* SVG Graphical drawing area */}
          <div className="flex justify-center items-center py-4">
            {activeGraph === "VT" ? (
              <div className="relative">
                <svg className="w-[300px] h-[190px] overflow-visible" viewBox="0 0 270 190">
                  {/* Grid Lines */}
                  {Array.from({ length: 5 }).map((_, i) => {
                    const tVal = (i + 1) * 100; // 100 to 500
                    const vVal = (i + 1) * 10;  // 10 to 50
                    const x = getX_K(tVal);
                    const y = getY_V(vVal);
                    return (
                      <g key={i}>
                        <line x1={padding} y1={y} x2={padding + chartW} y2={y} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2" />
                        <line x1={x} y1={padding} x2={x} y2={padding + chartH} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2" />
                        <text x={padding - 6} y={y + 3} fill="#475569" fontSize="7" textAnchor="end">{vVal}</text>
                        <text x={x} y={padding + chartH + 10} fill="#475569" fontSize="7" textAnchor="middle">{tVal}</text>
                      </g>
                    );
                  })}

                  {/* Axes */}
                  <line x1={padding} y1={padding} x2={padding} y2={padding + chartH} stroke="#475569" strokeWidth="1" />
                  <line x1={padding} y1={padding + chartH} x2={padding + chartW} y2={padding + chartH} stroke="#475569" strokeWidth="1" />

                  {/* Labels */}
                  <text x={padding - 10} y={padding - 5} fill="#94a3b8" fontSize="8" fontWeight="bold">V(mL)</text>
                  <text x={padding + chartW + 5} y={padding + chartH + 3} fill="#94a3b8" fontSize="8" fontWeight="bold">T(K)</text>
                  <text x={padding - 8} y={padding + chartH + 8} fill="#475569" fontSize="7">0</text>

                  {/* Dynamic theoretically calculated straight line lines based on pressure selection */}
                  {/* Slope k = 1 / (10 * pressureAtm). Max V scale is 50. Max T scale is 500 */}
                  {/* Y(V) = padding + chartH - (V/50) * chartH */}
                  {/* T=0 -> V=0 -> x=getX_K(0)=padding, y=getY_V(0)=padding+chartH */}
                  {/* T=500 -> V=50/p -> x=getX_K(500)=padding+chartW, y=getY_V(50/p) */}
                  {(() => {
                    const maxVForP = 500 / (10 * pressureAtm);
                    const x0 = getX_K(0);
                    const y0 = getY_V(0);
                    const x1 = getX_K(500);
                    const y1 = getY_V(maxVForP);
                    return (
                      <g>
                        {/* Extension line (nét đứt) */}
                        <line x1={x0} y1={y0} x2={getX_K(120)} y2={getY_V(120 / (10 * pressureAtm))} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2" />
                        {/* Solid line representing physical states */}
                        <line x1={getX_K(120)} y1={getY_V(120 / (10 * pressureAtm))} x2={x1} y2={y1} stroke="#3b82f6" strokeWidth="2.5" />
                      </g>
                    );
                  })()}

                  {/* Plotted points from recorded data logs */}
                  {dataLogs.map((log) => {
                    const ptX = getX_K(log.T);
                    const ptY = getY_V(log.v);
                    const isCurrentP = Math.abs(log.p - pressureAtm) < 0.05;
                    return (
                      <circle 
                        key={log.id} 
                        cx={ptX} 
                        cy={ptY} 
                        r={isCurrentP ? 3.5 : 2.5} 
                        fill={isCurrentP ? "#10b981" : "#475569"} 
                        stroke="#fff" 
                        strokeWidth="0.5" 
                      />
                    );
                  })}

                  {/* Current State Marker */}
                  <circle 
                    cx={getX_K(temperature)} 
                    cy={getY_V(volume)} 
                    r="5" 
                    fill="#fbbf24" 
                    stroke="#fff" 
                    strokeWidth="1"
                    className="animate-ping" 
                    style={{ transformOrigin: `${getX_K(temperature)}px ${getY_V(volume)}px` }}
                  />
                  <circle 
                    cx={getX_K(temperature)} 
                    cy={getY_V(volume)} 
                    r="5" 
                    fill="#f59e0b" 
                    stroke="#fff" 
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            ) : activeGraph === "Vt" ? (
              <div className="relative">
                <svg className="w-[300px] h-[190px] overflow-visible" viewBox="0 0 270 190">
                  {/* Grid Lines */}
                  {Array.from({ length: 5 }).map((_, i) => {
                    const cVal = -273 + i * 100; // -273 to 127
                    const vVal = (i + 1) * 10;
                    const x = getX_C(cVal);
                    const y = getY_V(vVal);
                    return (
                      <g key={i}>
                        <line x1={padding} y1={y} x2={padding + chartW} y2={y} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2" />
                        <line x1={x} y1={padding} x2={x} y2={padding + chartH} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2" />
                        <text x={padding - 6} y={y + 3} fill="#475569" fontSize="7" textAnchor="end">{vVal}</text>
                        <text x={x} y={padding + chartH + 10} fill="#475569" fontSize="7" textAnchor="middle">{cVal}</text>
                      </g>
                    );
                  })}

                  {/* Axes */}
                  {/* Vertical axis at t=0°C (x = getX_C(0)) */}
                  <line x1={getX_C(0)} y1={padding} x2={getX_C(0)} y2={padding + chartH} stroke="#475569" strokeWidth="1" />
                  <line x1={padding} y1={padding + chartH} x2={padding + chartW} y2={padding + chartH} stroke="#475569" strokeWidth="1" />

                  {/* Labels */}
                  <text x={getX_C(0) - 10} y={padding - 5} fill="#94a3b8" fontSize="8" fontWeight="bold">V(mL)</text>
                  <text x={padding + chartW + 5} y={padding + chartH + 3} fill="#94a3b8" fontSize="8" fontWeight="bold">t(°C)</text>
                  <text x={padding + 3} y={padding + chartH + 8} fill="#ef4444" fontSize="6" fontWeight="bold">-273°C</text>

                  {/* Isobaric straight line cutting t-axis at -273°C */}
                  {(() => {
                    const maxVForP = 500 / (10 * pressureAtm);
                    const x_cut = getX_C(-273);
                    const y_cut = getY_V(0);
                    const x_end = getX_C(227);
                    const y_end = getY_V(maxVForP);
                    return (
                      <g>
                        <line x1={x_cut} y1={y_cut} x2={getX_C(-150)} y2={getY_V(123 / (10 * pressureAtm))} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2" />
                        <line x1={getX_C(-150)} y1={getY_V(123 / (10 * pressureAtm))} x2={x_end} y2={y_end} stroke="#3b82f6" strokeWidth="2.5" />
                      </g>
                    );
                  })()}

                  {/* Plotted logs */}
                  {dataLogs.map((log) => {
                    const ptX = getX_C(log.t);
                    const ptY = getY_V(log.v);
                    const isCurrentP = Math.abs(log.p - pressureAtm) < 0.05;
                    return (
                      <circle 
                        key={log.id} 
                        cx={ptX} 
                        cy={ptY} 
                        r={isCurrentP ? 3.5 : 2.5} 
                        fill={isCurrentP ? "#10b981" : "#475569"} 
                        stroke="#fff" 
                        strokeWidth="0.5" 
                      />
                    );
                  })}

                  {/* Current State Marker */}
                  <circle 
                    cx={getX_C(tempCelsius)} 
                    cy={getY_V(volume)} 
                    r="5" 
                    fill="#f59e0b" 
                    stroke="#fff" 
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            ) : (
              <div className="relative">
                {/* p-T and p-V constant representation */}
                <svg className="w-[300px] h-[190px] overflow-visible" viewBox="0 0 270 190">
                  {/* Grid lines */}
                  {Array.from({ length: 5 }).map((_, i) => {
                    const pVal = (i + 1) * 0.5; // 0.5 to 2.5 atm
                    const y = padding + chartH - (pVal / 2.5) * chartH;
                    return (
                      <g key={i}>
                        <line x1={padding} y1={y} x2={padding + chartW} y2={y} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2" />
                        <text x={padding - 6} y={y + 3} fill="#475569" fontSize="7" textAnchor="end">{pVal.toFixed(1)}</text>
                      </g>
                    );
                  })}
                  {Array.from({ length: 5 }).map((_, i) => {
                    const tVal = (i + 1) * 100;
                    const x = getX_K(tVal);
                    return (
                      <g key={i}>
                        <line x1={x} y1={padding} x2={x} y2={padding + chartH} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2" />
                        <text x={x} y={padding + chartH + 10} fill="#475569" fontSize="7" textAnchor="middle">{tVal}</text>
                      </g>
                    );
                  })}

                  {/* Axes */}
                  <line x1={padding} y1={padding} x2={padding} y2={padding + chartH} stroke="#475569" strokeWidth="1" />
                  <line x1={padding} y1={padding + chartH} x2={padding + chartW} y2={padding + chartH} stroke="#475569" strokeWidth="1" />

                  {/* Labels */}
                  <text x={padding - 10} y={padding - 5} fill="#94a3b8" fontSize="8" fontWeight="bold">p(atm)</text>
                  <text x={padding + chartW + 5} y={padding + chartH + 3} fill="#94a3b8" fontSize="8" fontWeight="bold">T (hoặc V)</text>

                  {/* Horizontal line for pressure */}
                  {(() => {
                    const y = padding + chartH - (pressureAtm / 2.5) * chartH;
                    return (
                      <line x1={padding} y1={y} x2={padding + chartW} y2={y} stroke="#10b981" strokeWidth="2.5" />
                    );
                  })()}

                  {/* Current State Marker */}
                  <circle 
                    cx={getX_K(temperature)} 
                    cy={padding + chartH - (pressureAtm / 2.5) * chartH} 
                    r="5" 
                    fill="#f59e0b" 
                    stroke="#fff" 
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Log History Data Table */}
          <div className="mt-2 space-y-2.5">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="font-bold flex items-center gap-1">
                <Table className="h-4 w-4" /> Bảng nhật ký số liệu đã ghi ({dataLogs.length}):
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={clearLogs}
                  className="bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-white px-2 py-1 rounded text-[10px] transition font-bold"
                >
                  Xóa hết
                </button>
                <button 
                  onClick={resetLogs}
                  className="bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-white px-2 py-1 rounded text-[10px] transition font-bold"
                >
                  Mẫu chuẩn
                </button>
              </div>
            </div>

            <div className="overflow-x-auto max-h-[110px] overflow-y-auto rounded-lg border border-slate-900">
              <table className="w-full text-left text-[11px] font-mono border-collapse">
                <thead className="bg-slate-950 text-slate-500 text-[9.5px]">
                  <tr>
                    <th className="py-1 px-2 font-bold"><FormattedMathText text="t\\ (^{\\circ}\\text{C})" /></th>
                    <th className="py-1 px-2 font-bold"><FormattedMathText text="T\\ (\\text{K})" /></th>
                    <th className="py-1 px-2 font-bold">Thể tích <span className="inline-flex"><FormattedMathText text="V\\ (\\text{mL})" /></span></th>
                    <th className="py-1 px-2 font-bold">Áp suất <span className="inline-flex"><FormattedMathText text="p\\ (\\text{atm})" /></span></th>
                    <th className="py-1 px-2 text-right font-bold">Tỉ số <span className="inline-flex"><FormattedMathText text="V/T\\ (\\text{mL/K})" /></span></th>
                  </tr>
                </thead>
                <tbody className="bg-slate-950/40 divide-y divide-slate-900">
                  {dataLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-slate-600 italic">
                        Chưa ghi nhận số liệu. Bấm nút màu xanh bên trái để thêm!
                      </td>
                    </tr>
                  ) : (
                    dataLogs.map((log) => (
                      <tr key={log.id} className="text-slate-300 hover:bg-slate-900/40">
                        <td className="py-1 px-2">{log.t.toFixed(0)}°C</td>
                        <td className="py-1 px-2 text-amber-300">{log.T} K</td>
                        <td className="py-1 px-2 text-blue-300">{log.v.toFixed(1)} mL</td>
                        <td className="py-1 px-2 text-rose-300">{log.p.toFixed(1)} atm</td>
                        <td className="py-1 px-2 text-right text-emerald-400 font-bold">{(log.v / log.T).toFixed(5)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Lab Test Panel */}
      <div className="col-span-1 xl:col-span-12">
        <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4">
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="h-4.5 w-4.5 text-blue-400" />
            Kiểm tra hiểu biết nhanh tại phòng thí nghiệm:
          </h4>
          <div className="text-xs text-slate-400">
            <FormattedMathText text={conceptQuiz.question} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {conceptQuiz.options.map((option, idx) => (
              <button
                key={idx}
                disabled={quizSubmitted}
                onClick={() => setSelectedQuizAns(idx)}
                className={`text-left text-xs p-3.5 rounded-xl border transition-all ${
                  quizSubmitted 
                    ? idx === conceptQuiz.correctIdx 
                      ? "bg-emerald-950/30 border-emerald-500 text-emerald-300 font-medium" 
                      : selectedQuizAns === idx 
                        ? "bg-rose-950/20 border-rose-650 text-rose-300"
                        : "bg-slate-900/40 border-slate-850 text-slate-500"
                    : selectedQuizAns === idx
                      ? "bg-blue-600/20 border-blue-500 text-blue-200"
                      : "bg-slate-900 border-slate-850 hover:bg-slate-850 text-slate-300 cursor-pointer"
                }`}
              >
                <FormattedMathText text={option} />
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
            {!quizSubmitted ? (
              <button
                disabled={selectedQuizAns === null}
                onClick={() => setQuizSubmitted(true)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedQuizAns === null 
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-500 text-slate-950 cursor-pointer shadow-lg shadow-blue-600/10 active:scale-[0.98]"
                }`}
              >
                Nộp câu trả lời (Submit)
              </button>
            ) : (
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-xs w-full animate-fade-in">
                <span className={`font-bold flex items-center gap-1 mb-1 ${selectedQuizAns === conceptQuiz.correctIdx ? "text-emerald-400" : "text-rose-400"}`}>
                  {selectedQuizAns === conceptQuiz.correctIdx ? (
                    <><CheckCircle2 className="h-4.5 w-4.5" /> Chúc mừng! Câu trả lời hoàn toàn chính xác.</>
                  ) : (
                    "Rất tiếc, câu trả lời chưa chính xác!"
                  )}
                </span>
                <div className="text-slate-400 leading-relaxed text-[11px]">
                  <FormattedMathText text={conceptQuiz.explanation} />
                </div>
                <button 
                  onClick={() => {
                    setSelectedQuizAns(null);
                    setQuizSubmitted(false);
                  }}
                  className="mt-2 text-[10px] text-blue-400 hover:text-blue-300 hover:underline font-bold"
                >
                  Làm lại thử thách
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
