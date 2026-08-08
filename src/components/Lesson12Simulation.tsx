import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Plus, Trash2, LineChart, Table, Info, Sliders, Wind, HelpCircle, CheckCircle2, Thermometer, Activity, Gauge, RefreshCw, Zap } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

function formatScientific(num: number, decimals: number = 2): string {
  const str = num.toExponential(decimals);
  const parts = str.split('e');
  let baseVal = parts[0];
  if (baseVal.includes('.')) {
    while (baseVal.endsWith('0')) {
      baseVal = baseVal.slice(0, -1);
    }
    if (baseVal.endsWith('.')) {
      baseVal = baseVal.slice(0, -1);
    }
  }
  return `${baseVal}.10^${parts[1]}`;
}

interface Molecule {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  mass: number; // in atomic mass units
  impactFlash: number; // timestamp or frame count to show a splash when colliding
}

export default function Lesson12Simulation() {
  const [temperature, setTemperature] = useState<number>(300); // Kelvin
  const [volume, setVolume] = useState<number>(5.0); // Liters [2.0 to 10.0]
  const [gasType, setGasType] = useState<"He" | "Ne" | "Ar" | "O2">("He");
  const [moleculeCount, setMoleculeCount] = useState<number>(80); // N molecules
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Stats
  const [collisionCount, setCollisionCount] = useState<number>(0);
  const [realtimeCollisionRate, setRealtimeCollisionRate] = useState<number>(0);
  const [historyP, setHistoryP] = useState<{ t: number; p: number }[]>([]);

  // Physics constants (scaled for realistic look but accurate ratios)
  const k_B = 1.38e-23; // J/K
  const R = 8.31; // J/(mol.K)
  const GAS_SPECS = {
    He: { name: "Helium (He)", massMol: 4.0, massKg: 6.64e-27, radius: 4, color: "#0ea5e9" }, // High-contrast sky blue
    Ne: { name: "Neon (Ne)", massMol: 20.18, massKg: 3.35e-26, radius: 6, color: "#f59e0b" }, // High-contrast amber orange
    Ar: { name: "Argon (Ar)", massMol: 39.95, massKg: 6.63e-26, radius: 7.5, color: "#8b5cf6" }, // High-contrast violet
    O2: { name: "Oxygen (O₂)", massMol: 32.00, massKg: 5.32e-26, radius: 6.5, color: "#ef4444" }, // High-contrast red
  };

  // Real world calculated stats
  const m_kg = GAS_SPECS[gasType].massKg;
  const E_d = 1.5 * k_B * temperature; // Joules
  const v_ctqp = Math.sqrt((3 * k_B * temperature) / m_kg); // m/s
  const mu = (moleculeCount * 1e23) / (volume * 1e-3); // fake density scaling
  const p_Pascal = (2 / 3) * (moleculeCount * 1.5e23 / (volume * 1e-3)) * E_d; // scaled realistically for 1-5 atm
  const p_atm = parseFloat((p_Pascal / 1.013e5).toFixed(2));

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const moleculesRef = useRef<Molecule[]>([]);
  const containerW = 320;
  const containerH = 240;

  // Track collision counts in a 1-second interval
  const collisionsThisSecond = useRef<number>(0);

  // Initialize and regenerate molecules when gasType, count, or volume changes
  useEffect(() => {
    regenerateMolecules();
  }, [gasType, moleculeCount, volume]);

  const regenerateMolecules = () => {
    const spec = GAS_SPECS[gasType];
    const newMolecules: Molecule[] = [];
    
    // Map Volume range [2.0, 10.0] to container width [100, 310]
    const activeWidth = 50 + ((volume - 2.0) / (10.0 - 2.0)) * (containerW - 70);

    for (let i = 0; i < moleculeCount; i++) {
      // Scale velocity based on sqrt(T / mass)
      // Visual velocity scaling: 1 unit of visual speed corresponds to ~100 m/s
      const visualSpeed = Math.sqrt(temperature / spec.massMol) * 0.45;
      const angle = Math.random() * Math.PI * 2;

      newMolecules.push({
        x: Math.random() * (activeWidth - 2 * spec.radius - 10) + spec.radius + 5,
        y: Math.random() * (containerH - 2 * spec.radius - 20) + spec.radius + 10,
        vx: Math.cos(angle) * visualSpeed,
        vy: Math.sin(angle) * visualSpeed,
        radius: spec.radius,
        color: spec.color,
        mass: spec.massMol,
        impactFlash: 0,
      });
    }
    moleculesRef.current = newMolecules;
  };

  // Update molecular velocities when temperature changes
  useEffect(() => {
    const spec = GAS_SPECS[gasType];
    const visualSpeed = Math.sqrt(temperature / spec.massMol) * 0.45;

    moleculesRef.current = moleculesRef.current.map(m => {
      const currentSpeed = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
      if (currentSpeed === 0) return m;
      return {
        ...m,
        vx: (m.vx / currentSpeed) * visualSpeed,
        vy: (m.vy / currentSpeed) * visualSpeed,
      };
    });
  }, [temperature]);

  // Handle collision rate counting
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeCollisionRate(collisionsThisSecond.current);
      collisionsThisSecond.current = 0;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Real-time chart logging
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setHistoryP(prev => {
          const next = [...prev, { t: Date.now(), p: p_atm }];
          if (next.length > 20) next.shift();
          return next;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [p_atm, isPaused]);

  // Main animation / Physics loop
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // We store visual ripple effects on wall impact
    interface ImpactRipple {
      x: number;
      y: number;
      age: number;
      color: string;
    }
    let ripples: ImpactRipple[] = [];

    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Map Volume to active container width
      const activeWidth = 50 + ((volume - 2.0) / (10.0 - 2.0)) * (containerW - 70);

      // 1. Draw Container Boundary inside Canvas - HIGH CONTRAST LIGHT CHAMBER
      ctx.fillStyle = "#f8fafc"; // Soft Slate-50 background inside
      ctx.beginPath();
      ctx.rect(4, 4, activeWidth, containerH - 8);
      ctx.fill();

      ctx.strokeStyle = "#334155"; // Slate-700
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw Piston Handle (showing moving wall in 3D-ish style)
      ctx.fillStyle = "#475569"; // Slate-600
      ctx.fillRect(activeWidth + 4, containerH / 2 - 22, 8, 44);
      ctx.fillStyle = "#94a3b8"; // Light Slate handle bar
      ctx.fillRect(activeWidth + 12, containerH / 2 - 3, 14, 6);

      // Label volume clearly inside the box
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 10px sans-serif";
      ctx.fillText(`V = ${volume.toFixed(1)} L`, activeWidth / 2 - 22, containerH - 12);

      // 2. Physics updates for molecules
      if (!isPaused) {
        moleculesRef.current = moleculesRef.current.map(m => {
          let nx = m.x + m.vx;
          let ny = m.y + m.vy;
          let nvx = m.vx;
          let nvy = m.vy;
          let hit = false;
          let hitX = 0;
          let hitY = 0;

          // Wall collisions (Elastic)
          // Left Wall (x = 4)
          if (nx - m.radius < 4) {
            nx = m.radius + 4;
            nvx = -m.vx;
            hit = true;
            hitX = 4;
            hitY = ny;
          }
          // Right Wall (x = activeWidth)
          if (nx + m.radius > activeWidth + 4) {
            nx = activeWidth + 4 - m.radius;
            nvx = -m.vx;
            hit = true;
            hitX = activeWidth + 4;
            hitY = ny;
          }
          // Top Wall (y = 4)
          if (ny - m.radius < 4) {
            ny = m.radius + 4;
            nvy = -m.vy;
            hit = true;
            hitX = nx;
            hitY = 4;
          }
          // Bottom Wall (y = containerH - 4)
          if (ny + m.radius > containerH - 4) {
            ny = containerH - 4 - m.radius;
            nvy = -m.vy;
            hit = true;
            hitX = nx;
            hitY = containerH - 4;
          }

          if (hit) {
            collisionsThisSecond.current += 1;
            setCollisionCount(prev => prev + 1);
            ripples.push({
              x: hitX,
              y: hitY,
              age: 0,
              color: m.color,
            });
          }

          return {
            ...m,
            x: nx,
            y: ny,
            vx: nvx,
            vy: nvy,
          };
        });
      }

      // 3. Draw Ripples (momentum transfer visual impact)
      ripples = ripples.map(r => {
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.age * 2 + 2, 0, Math.PI * 2);
        ctx.stroke();
        return { ...r, age: r.age + 1 };
      }).filter(r => r.age < 12);

      // 4. Draw Molecules with high-contrast shiny gradient
      moleculesRef.current.forEach(m => {
        ctx.beginPath();
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.radius * 1.5);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.5, m.color);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        
        ctx.fillStyle = grad;
        ctx.arc(m.x, m.y, m.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Core dot with bold white stroke for clear visibility
        ctx.beginPath();
        ctx.fillStyle = m.color;
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [volume, isPaused]);

  // Generate Maxwell-Boltzmann speed distribution graph points
  const getMaxwellBoltzmannPath = () => {
    const pathPoints: [number, number][] = [];
    const pointsCount = 120;
    
    // Scaling factor based on mass molecular weight and Temperature
    const a = GAS_SPECS[gasType].massMol * 1e-4 / temperature; 
    
    for (let i = 0; i <= pointsCount; i++) {
      const xVal = (i / pointsCount) * 3000; // speeds up to 3000 m/s
      // Formula f(v) = C * v^2 * e^(-a * v^2)
      const yVal = 4e-5 * Math.pow(xVal, 2) * Math.exp(-a * Math.pow(xVal, 2));
      const pixelX = 30 + (xVal / 3000) * 260;
      const pixelY = 90 - yVal * 2.5e7; // fit inside 100px height
      
      const clampedY = Math.max(10, Math.min(90, pixelY));
      pathPoints.push([pixelX, clampedY]);
    }
    
    return pathPoints.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L ");
  };

  const getRmsSpeedPositionX = () => {
    const fraction = Math.min(1, v_ctqp / 3000);
    return 30 + fraction * 260;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-slate-900 animate-fade-in font-bold">
      {/* LEFT: Simulation Canvas & Direct Lab Controls (3D Styled Light Theme) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-5 border-2 border-slate-250 border-b-[6px] border-b-slate-350 shadow-sm flex flex-col items-center space-y-4">
        {/* Lab Header */}
        <div className="w-full flex justify-between items-center border-b border-slate-150 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4.5 w-4.5 text-blue-600 animate-pulse" />
            <span className="text-[10px] font-black tracking-wider text-slate-950 uppercase">
              Bình Áp Suất Phân Tử Thời Gian Thực (Live)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`px-3.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                isPaused
                  ? "bg-emerald-600 text-white shadow-[0_2.5px_0_0_#047857]"
                  : "bg-slate-900 text-white shadow-[0_2.5px_0_0_#334155]"
              }`}
            >
              {isPaused ? "Tiếp tục" : "Tạm dừng"}
            </button>
            <button
              onClick={() => {
                regenerateMolecules();
                setCollisionCount(0);
              }}
              className="p-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-250 cursor-pointer shadow-sm"
              title="Reset phòng thí nghiệm"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* The Physics Stage (HTML5 Canvas) inside light framed container */}
        <div className="relative border-2 border-slate-200 bg-slate-100/40 p-2 rounded-2xl flex justify-center items-center shadow-inner">
          <canvas
            ref={canvasRef}
            width={containerW}
            height={containerH}
            className="rounded-xl bg-white border border-slate-250"
          />
          {/* Real-time floating legend */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-2 rounded-xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border border-white" style={{ backgroundColor: GAS_SPECS[gasType].color }} />
              <span className="text-[10px] font-black text-slate-800 uppercase">{GAS_SPECS[gasType].name.split(" ")[0]}</span>
            </div>
            <div className="text-[8.5px] font-mono font-bold text-slate-500">
              N = {moleculeCount} hạt | d = {(volume * 0.1).toFixed(2)} dm
            </div>
          </div>
        </div>

        {/* Real-time molecular distribution graph - LIGHT THEMED GRID */}
        <div className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex justify-between items-center border-b border-slate-150 pb-1">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">
              ĐƯỜNG PHÂN BỐ TỐC ĐỘ MAXWELL-BOLTZMANN f(v)
            </span>
            <span className="text-[9px] font-mono text-blue-800 font-black">
              v_ctqp = {Math.round(v_ctqp).toLocaleString()} m/s
            </span>
          </div>

          <svg viewBox="0 0 320 100" className="w-full h-20">
            {/* Axis */}
            <line x1="30" y1="90" x2="300" y2="90" stroke="#475569" strokeWidth="1.5" />
            <line x1="30" y1="10" x2="30" y2="90" stroke="#475569" strokeWidth="1.5" />
            
            {/* Speed labels */}
            <text x="30" y="98" fill="#1e293b" className="text-[8px] font-mono font-black" textAnchor="middle">0</text>
            <text x="116" y="98" fill="#1e293b" className="text-[8px] font-mono font-black" textAnchor="middle">1000</text>
            <text x="203" y="98" fill="#1e293b" className="text-[8px] font-mono font-black" textAnchor="middle">2000</text>
            <text x="290" y="98" fill="#1e293b" className="text-[8px] font-mono font-black" textAnchor="middle">3000 m/s</text>
            
            {/* Maxwell Curve path with high contrast colored area fill */}
            <path
              d={`M 30,90 L ${getMaxwellBoltzmannPath()}`}
              fill="rgba(2, 132, 199, 0.05)"
              stroke={GAS_SPECS[gasType].color}
              strokeWidth="2.5"
              fillRule="evenodd"
            />

            {/* Vertical Marker for RMS speed v_ctqp */}
            <line
              x1={getRmsSpeedPositionX()}
              y1="10"
              x2={getRmsSpeedPositionX()}
              y2="90"
              stroke="#ef4444"
              strokeWidth="1.8"
              strokeDasharray="3 3"
            />
            <circle cx={getRmsSpeedPositionX()} cy="50" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.2" />
            <text x={getRmsSpeedPositionX() + 6} y="44" fill="#dc2626" className="text-[9.5px] font-black font-mono">
              v_ctqp
            </text>
          </svg>
        </div>
      </div>

      {/* RIGHT: Lab Controls & Live Real-time Physics Measurements */}
      <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
        {/* Control Sliders Panel */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 border-b-[6px] border-b-slate-300 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-950 uppercase flex items-center gap-1.5 border-b border-slate-150 pb-2.5">
            <Sliders className="h-4.5 w-4.5 text-blue-600" />
            Điều Chỉnh Thông Số Hệ Khí
          </h3>

          <div className="space-y-4">
            {/* Gas Type Select */}
            <div className="space-y-1.5">
              <label className="text-[9.5px] font-black text-slate-500 uppercase tracking-wider block">Chọn loại chất khí:</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(GAS_SPECS) as Array<keyof typeof GAS_SPECS>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setGasType(key)}
                    className={`py-2 px-3 rounded-2xl text-xs font-black border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                      gasType === key
                        ? "bg-slate-900 text-white border-slate-950 shadow-[0_3px_0_0_#475569] translate-y-[-1px]"
                        : "bg-slate-50 text-slate-700 border-slate-250 hover:bg-slate-100"
                    }`}
                  >
                    <span className="font-black">{GAS_SPECS[key].name.split(" ")[0]}</span>
                    <span className="text-[9.5px] font-bold"><FormattedMathText text={`M = ${GAS_SPECS[key].massMol} g/mol`} /></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature T slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-500 uppercase tracking-wider">Nhiệt Độ Tuyệt Đối (<FormattedMathText text="T" />):</span>
                <span className="font-mono text-indigo-700 font-black"><FormattedMathText text={`${temperature} K (${temperature - 273} °C)`} /></span>
              </div>
              <div className="flex gap-3 items-center">
                <Thermometer className="h-5 w-5 text-indigo-600 shrink-0 animate-pulse" />
                <input
                  type="range"
                  min="100"
                  max="600"
                  step="10"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-indigo-600 bg-slate-200 rounded-lg h-1.5 cursor-pointer"
                />
              </div>
            </div>

            {/* Volume V slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-500 uppercase tracking-wider">Thể Tích Bình Chứa (<FormattedMathText text="V" />):</span>
                <span className="font-mono text-teal-700 font-black"><FormattedMathText text={`${volume.toFixed(1)} L (dm^3)`} /></span>
              </div>
              <div className="flex gap-3 items-center">
                <Wind className="h-5 w-5 text-teal-600 shrink-0" />
                <input
                  type="range"
                  min="2.0"
                  max="10.0"
                  step="0.5"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-teal-600 bg-slate-200 rounded-lg h-1.5 cursor-pointer"
                />
              </div>
            </div>

            {/* Number of Particles N slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-500 uppercase tracking-wider">Số Lượng Phân Tử (<FormattedMathText text="N" />):</span>
                <span className="font-mono text-rose-700 font-black">{moleculeCount} hạt</span>
              </div>
              <div className="flex gap-3 items-center">
                <Plus className="h-5 w-5 text-rose-600 shrink-0" />
                <input
                  type="range"
                  min="20"
                  max="150"
                  step="5"
                  value={moleculeCount}
                  onChange={(e) => setMoleculeCount(Number(e.target.value))}
                  className="w-full accent-rose-600 bg-slate-200 rounded-lg h-1.5 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Real-Time Stats Display Panel (3D light blocks with high contrast) */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-250 border-b-[6px] border-b-slate-350 shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 flex items-center gap-1.5 border-b border-slate-150 pb-2.5">
            <Gauge className="h-4.5 w-4.5 text-blue-600" />
            Số Liệu Đo Trực Tiếp (Vĩ Mô & Vi Mô)
          </h3>

          <div className="grid grid-cols-2 gap-3.5">
            {/* Calculated Pressure */}
            <div className="p-3.5 bg-emerald-50 border-2 border-emerald-200 border-b-4 border-b-emerald-300 rounded-2xl space-y-1">
              <span className="text-[9px] text-emerald-800 uppercase font-black">Áp Suất Tính Toán (<FormattedMathText text="p" />):</span>
              <span className="text-md md:text-lg font-black text-emerald-950 block">
                <FormattedMathText text={`${p_atm.toFixed(2)} atm`} />
              </span>
              <span className="text-[10px] text-emerald-700 font-mono block"><FormattedMathText text="p = (2/3) * \mu * Ed_bar" /></span>
            </div>

            {/* Dynamic Wall Collisions Rate */}
            <div className="p-3.5 bg-amber-50 border-2 border-amber-200 border-b-4 border-b-amber-300 rounded-2xl space-y-1">
              <span className="text-[9px] text-amber-800 uppercase font-black">Tần Số Va Chạm Thực Tế:</span>
              <span className="text-md md:text-lg font-black text-amber-950 block">
                {realtimeCollisionRate} Hz
              </span>
              <span className="text-[8px] text-amber-700 block">Đo trực tiếp trên thành</span>
            </div>

            {/* Average Kinetic Energy */}
            <div className="p-3.5 bg-indigo-50 border-2 border-indigo-200 border-b-4 border-b-indigo-300 rounded-2xl space-y-1 col-span-2">
              <div className="flex justify-between items-center border-b border-indigo-150 pb-1">
                <span className="text-[9px] text-indigo-800 uppercase font-black">Động năng tịnh tiến TB (<FormattedMathText text="Ed_bar" />):</span>
                <span className="text-[10px] text-indigo-600 font-black"><FormattedMathText text="Ed_bar = (3/2) * k * T" /></span>
              </div>
              <span className="text-sm md:text-md font-black text-indigo-950 block">
                <FormattedMathText text={`${formatScientific(E_d)} J`} />
              </span>
              <span className="text-[9px] text-slate-500 block leading-normal mt-1">
                (Tất cả các khí lý tưởng có động năng tịnh tiến bằng hệt nhau ở cùng một nhiệt độ <FormattedMathText text="T" />!)
              </span>
            </div>

            {/* Root-Mean-Square Speed */}
            <div className="p-3.5 bg-rose-50 border-2 border-rose-200 border-b-4 border-b-rose-300 rounded-2xl space-y-1 col-span-2">
              <div className="flex justify-between items-center border-b border-rose-150 pb-1">
                <span className="text-[9px] text-rose-800 uppercase font-black">Tốc Độ Căn Quân Phương:</span>
                <span className="text-[10px] text-rose-600 font-black"><FormattedMathText text="v_ctqp = \sqrt(3 * k * T / m)" /></span>
              </div>
              <span className="text-sm md:text-md font-black text-rose-950 block">
                <FormattedMathText text={`${Math.round(v_ctqp).toLocaleString()} m/s`} />
              </span>
              <span className="text-[9px] text-slate-500 block leading-normal mt-1">
                ≈ <strong className="text-rose-950">{(Math.round(v_ctqp * 3.6)).toLocaleString()} km/h</strong>. Chất khí nhẹ hơn sẽ di chuyển nhanh vượt trội để bảo toàn đúng mức động năng vĩ mô.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
