import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Sliders, Info, Thermometer, Wind, CheckCircle2, RefreshCw, Gauge, Flame, Snowflake, Sparkles, TrendingUp, HelpCircle } from "lucide-react";

interface Molecule {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function Lesson13Simulation() {
  // Simulator State
  const [processType, setProcessType] = useState<"free" | "isothermal" | "isochoric" | "isobaric" | "leak">("free");
  const [temperature, setTemperature] = useState<number>(300); // Kelvin (100 to 600)
  const [volume, setVolume] = useState<number>(5.0); // Liters (2.0 to 10.0)
  const [moleculeCount, setMoleculeCount] = useState<number>(80); // N molecules (10 to 150)
  
  // Heating / Cooling action states
  const [heatAction, setHeatAction] = useState<"none" | "heating" | "cooling">("none");
  const [valveOpen, setValveOpen] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Graph state
  const [graphType, setGraphType] = useState<"pV" | "pT" | "VT">("pV");
  const [history, setHistory] = useState<{ v: number; p: number; t: number }[]>([]);

  // Physics Loop References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const moleculesRef = useRef<Molecule[]>([]);
  const containerW = 320;
  const containerH = 220;

  // Actual Physical Calculations
  // Let's calibrate: N=100, T=300K, V=5L => Pressure = 1.0 atm
  const calculatePressure = (N: number, T: number, V: number) => {
    if (V === 0) return 0;
    const baseP = (N / 100) * (T / 300) * (5.0 / V);
    return parseFloat(baseP.toFixed(2));
  };

  const p_atm = calculatePressure(moleculeCount, temperature, volume);

  // Initialize and regenerate molecules
  const regenerateMolecules = () => {
    const newMolecules: Molecule[] = [];
    const activeWidth = 40 + ((volume - 2.0) / (10.0 - 2.0)) * (containerW - 80);

    for (let i = 0; i < moleculeCount; i++) {
      const radius = 3.5;
      const speed = Math.sqrt(temperature / 4.0) * 0.35; // velocity proportional to sqrt(T)
      const angle = Math.random() * Math.PI * 2;

      // Ensure molecules are generated inside the cylinder boundaries
      newMolecules.push({
        x: Math.random() * (activeWidth - 2 * radius - 15) + radius + 10,
        y: Math.random() * (containerH - 2 * radius - 20) + radius + 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius,
        color: `hsl(${200 + (temperature - 100) * 0.3}, 85%, 60%)`, // color shifts redder at higher temperatures
      });
    }
    moleculesRef.current = newMolecules;
  };

  // Re-generate on initial load, or when size changes
  useEffect(() => {
    regenerateMolecules();
  }, [moleculeCount]);

  // Handle constraints imposed by state locks
  useEffect(() => {
    if (processType === "isothermal") {
      // Lock temperature to current or standard
      setHeatAction("none");
    } else if (processType === "isochoric") {
      // Lock volume
    } else if (processType === "isobaric") {
      // Locking isobaric means V must adjust dynamically when T changes: V = C * T => V2 = V1 * (T2/T1)
      // Or simply V = 5.0 * (T / 300) * (100 / N) to maintain p ≈ 1 atm
      const targetV = Math.min(10.0, Math.max(2.0, (moleculeCount / 80) * (temperature / 300) * 5.0));
      setVolume(parseFloat(targetV.toFixed(2)));
    } else if (processType === "leak") {
      setHeatAction("none");
    }
  }, [processType, temperature, moleculeCount]);

  // Adjust volume or temperature to satisfy constraints when volume changes
  const handleVolumeChange = (newV: number) => {
    if (processType === "isochoric") return; // cannot change volume
    setVolume(newV);
    
    if (processType === "isothermal") {
      // T is locked, pressure will update automatically
    } else if (processType === "isobaric") {
      // p is locked, T must change: T = p * V * 300 / (N/100 * 5) => T = T_prev * (V_new/V_prev)
      const targetT = Math.min(600, Math.max(100, (300 * newV * 100) / (moleculeCount * 5.0)));
      setTemperature(parseFloat(targetT.toFixed(0)));
    }
  };

  // Adjust temperature or volume when temperature slider changes
  const handleTemperatureChange = (newT: number) => {
    if (processType === "isothermal") return; // cannot change temperature
    setTemperature(newT);

    if (processType === "isobasic" || processType === "isobaric") {
      // p is locked, volume must change: V = nRT/p
      const targetV = Math.min(10.0, Math.max(2.0, (moleculeCount / 80) * (newT / 300) * 5.0));
      setVolume(parseFloat(targetV.toFixed(2)));
    }
  };

  // Heating/Cooling source loop
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (heatAction === "heating") {
        setTemperature(prev => {
          const next = Math.min(600, prev + 2);
          if (processType === "isobaric") {
            const targetV = Math.min(10.0, Math.max(2.0, (moleculeCount / 80) * (next / 300) * 5.0));
            setVolume(parseFloat(targetV.toFixed(2)));
          }
          return next;
        });
      } else if (heatAction === "cooling") {
        setTemperature(prev => {
          const next = Math.max(100, prev - 2);
          if (processType === "isobaric") {
            const targetV = Math.min(10.0, Math.max(2.0, (moleculeCount / 80) * (next / 300) * 5.0));
            setVolume(parseFloat(targetV.toFixed(2)));
          }
          return next;
        });
      }

      // Leakage logic: molecules drift out
      if (valveOpen && processType === "leak") {
        setMoleculeCount(prev => {
          if (prev <= 10) {
            setValveOpen(false);
            return prev;
          }
          // Escape 1 molecule every 150ms visually
          return prev - 1;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [heatAction, valveOpen, processType, moleculeCount]);

  // Physics animation loop
  useEffect(() => {
    let animationId: number;

    const render = () => {
      if (!isPaused) {
        updatePhysics();
      }
      drawCanvas();
      animationId = requestAnimationFrame(render);
    };

    const updatePhysics = () => {
      const activeWidth = 40 + ((volume - 2.0) / (10.0 - 2.0)) * (containerW - 80);
      const specSpeed = Math.sqrt(temperature / 4.0) * 0.35;

      moleculesRef.current = moleculesRef.current.map(m => {
        let { x, y, vx, vy } = m;

        // Apply updated temperature speed factor
        const currentSpeed = Math.sqrt(vx * vx + vy * vy);
        if (currentSpeed > 0 && Math.abs(currentSpeed - specSpeed) > 0.05) {
          vx = (vx / currentSpeed) * specSpeed;
          vy = (vy / currentSpeed) * specSpeed;
        }

        x += vx;
        y += vy;

        // Wall collisions
        const leftLimit = 10;
        const rightLimit = activeWidth;
        const topLimit = 10;
        const bottomLimit = containerH - 10;

        if (x - m.radius < leftLimit) {
          x = leftLimit + m.radius;
          vx = -vx;
        } else if (x + m.radius > rightLimit) {
          // If valve is open and molecule is near top right corner, it escapes!
          if (valveOpen && processType === "leak" && y < 45) {
            // Molecule escapes!
            // Let's teleport it back inside or delete it. Since state handles N decrement, we just let it wrap or escape
            x = leftLimit + m.radius + 5;
            y = Math.random() * (containerH - 30) + 15;
          } else {
            x = rightLimit - m.radius;
            vx = -vx;
          }
        }

        if (y - m.radius < topLimit) {
          y = topLimit + m.radius;
          vy = -vy;
        } else if (y + m.radius > bottomLimit) {
          y = bottomLimit - m.radius;
          vy = -vy;
        }

        return { ...m, x, y, vx, vy };
      });
    };

    const drawCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, containerW, containerH);

      // Grid background
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 1;
      for (let x = 0; x < containerW; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, containerH);
        ctx.stroke();
      }
      for (let y = 0; y < containerH; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(containerW, y);
        ctx.stroke();
      }

      const activeWidth = 40 + ((volume - 2.0) / (10.0 - 2.0)) * (containerW - 80);

      // Draw heating source flame / cooling ice blocks
      if (heatAction === "heating") {
        ctx.fillStyle = "rgba(239, 68, 68, 0.15)";
        ctx.fillRect(10, containerH - 30, activeWidth - 10, 20);
        
        // Draw little fire particles
        for (let i = 0; i < 6; i++) {
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.arc(20 + Math.random() * (activeWidth - 30), containerH - 12 + Math.random() * 4, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (heatAction === "cooling") {
        ctx.fillStyle = "rgba(59, 130, 246, 0.15)";
        ctx.fillRect(10, containerH - 30, activeWidth - 10, 20);

        // Draw little snow particles
        for (let i = 0; i < 6; i++) {
          ctx.fillStyle = "#60a5fa";
          ctx.beginPath();
          ctx.arc(20 + Math.random() * (activeWidth - 30), containerH - 12 + Math.random() * 4, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw the cylinder rigid boundary
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 4;
      ctx.beginPath();
      // top wall
      ctx.moveTo(10, 10);
      ctx.lineTo(activeWidth, 10);
      // bottom wall
      ctx.moveTo(10, containerH - 10);
      ctx.lineTo(activeWidth, containerH - 10);
      // left rigid back wall
      ctx.moveTo(10, 10);
      ctx.lineTo(10, containerH - 10);
      ctx.stroke();

      // If valve/leak process, draw an outlet tube at top right
      if (processType === "leak") {
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(activeWidth - 4, 15, 12, 20);
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 2;
        ctx.strokeRect(activeWidth - 4, 15, 12, 20);

        // draw open valve tap
        ctx.fillStyle = valveOpen ? "#ef4444" : "#10b981";
        ctx.fillRect(activeWidth + 4, 10, 4, 10);

        // if valve open, draw escaping wind lines
        if (valveOpen) {
          ctx.strokeStyle = "rgba(148, 163, 184, 0.6)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(activeWidth + 12, 20);
          ctx.lineTo(activeWidth + 24, 15);
          ctx.moveTo(activeWidth + 12, 25);
          ctx.lineTo(activeWidth + 26, 25);
          ctx.moveTo(activeWidth + 12, 30);
          ctx.lineTo(activeWidth + 24, 35);
          ctx.stroke();
        }
      }

      // Draw Piston head (movable wall)
      ctx.fillStyle = "#64748b";
      ctx.fillRect(activeWidth - 4, 10, 8, containerH - 20);

      // Piston handle shaft
      ctx.fillStyle = "#475569";
      ctx.fillRect(activeWidth + 4, containerH / 2 - 6, containerW - activeWidth, 12);

      // Draw molecules
      moleculesRef.current.forEach(m => {
        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fill();

        // High temperature glow effect
        if (temperature > 450) {
          ctx.fillStyle = "rgba(251, 191, 36, 0.2)";
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.radius + 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [volume, temperature, heatAction, valveOpen, isPaused, processType]);

  // Record history points on state change to plot graph
  useEffect(() => {
    const timer = setInterval(() => {
      if (isPaused) return;
      setHistory(prev => {
        const last = prev[prev.length - 1];
        if (last && last.v === volume && last.p === p_atm && last.t === temperature) {
          return prev;
        }
        // Keep last 40 states for trail visualization
        const updated = [...prev, { v: volume, p: p_atm, t: temperature }];
        return updated.slice(-40);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [volume, p_atm, temperature, isPaused]);

  // Clear trail history
  const clearHistory = () => {
    setHistory([]);
  };

  // Preset configuration setups
  const applyPreset = (preset: "free" | "isothermal" | "isochoric" | "isobaric" | "leak") => {
    setProcessType(preset);
    setValveOpen(false);
    setHeatAction("none");
    if (preset === "isothermal") {
      setTemperature(300);
      setVolume(5.0);
      setMoleculeCount(80);
    } else if (preset === "isochoric") {
      setVolume(5.0);
      setTemperature(300);
      setMoleculeCount(80);
    } else if (preset === "isobaric") {
      setVolume(5.0);
      setTemperature(300);
      setMoleculeCount(80);
    } else if (preset === "leak") {
      setVolume(5.0);
      setTemperature(300);
      setMoleculeCount(100);
    } else {
      setVolume(5.0);
      setTemperature(300);
      setMoleculeCount(80);
    }
    setHistory([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-3xl text-slate-100 shadow-xl border border-slate-800" id="lesson-13-simulation-root">
      {/* LEFT COLUMN: Controls & Presets */}
      <div className="lg:col-span-4 space-y-5">
        {/* Preset Selector */}
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 space-y-2.5">
          <span className="text-[10px] text-indigo-400 font-mono font-bold tracking-wider uppercase block">
            Quá trình biến đổi
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => applyPreset("free")}
              className={`p-2 rounded-lg text-[10px] font-bold text-left transition-all ${processType === "free" ? "bg-indigo-600 text-white" : "bg-slate-800/50 hover:bg-slate-800 text-slate-300"}`}
            >
              🔄 Tự do (Custom)
            </button>
            <button
              onClick={() => applyPreset("isothermal")}
              className={`p-2 rounded-lg text-[10px] font-bold text-left transition-all ${processType === "isothermal" ? "bg-blue-600 text-white" : "bg-slate-800/50 hover:bg-slate-800 text-slate-300"}`}
            >
              🌡️ Đẳng nhiệt (T=const)
            </button>
            <button
              onClick={() => applyPreset("isochoric")}
              className={`p-2 rounded-lg text-[10px] font-bold text-left transition-all ${processType === "isochoric" ? "bg-emerald-600 text-white" : "bg-slate-800/50 hover:bg-slate-800 text-slate-300"}`}
            >
              📦 Đẳng tích (V=const)
            </button>
            <button
              onClick={() => applyPreset("isobaric")}
              className={`p-2 rounded-lg text-[10px] font-bold text-left transition-all ${processType === "isobaric" ? "bg-amber-600 text-white" : "bg-slate-800/50 hover:bg-slate-800 text-slate-300"}`}
            >
              🎈 Đẳng áp (p=const)
            </button>
          </div>
          <button
            onClick={() => applyPreset("leak")}
            className={`w-full p-2 rounded-lg text-[10px] font-bold text-center transition-all flex items-center justify-center gap-1.5 ${processType === "leak" ? "bg-rose-600 text-white" : "bg-slate-800/50 hover:bg-slate-800 text-slate-300"}`}
          >
            <Wind className="h-4.5 w-4.5" />
            ⚠️ Rò rỉ khí / Xả khí (Ví dụ 3)
          </button>
        </div>

        {/* Sliders */}
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 space-y-4">
          <span className="text-[10px] text-indigo-400 font-mono font-bold tracking-wider uppercase block">
            Điều khiển thông số
          </span>

          {/* Volume Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Thể tích bình V:</span>
              <span className={`font-mono font-bold ${processType === "isochoric" ? "text-slate-500 line-through" : "text-emerald-400"}`}>
                {volume.toFixed(1)} Liters
              </span>
            </div>
            <input
              type="range"
              min="2.0"
              max="10.0"
              step="0.1"
              disabled={processType === "isochoric"}
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>

          {/* Temperature Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Nhiệt độ khí T:</span>
              <span className={`font-mono font-bold ${processType === "isothermal" ? "text-slate-500 line-through" : "text-blue-400"}`}>
                {Math.round(temperature)} K ({Math.round(temperature - 273)}°C)
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="600"
              step="10"
              disabled={processType === "isothermal"}
              value={temperature}
              onChange={(e) => handleTemperatureChange(Number(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>

          {/* Gas Quantity Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Lượng chất khí N:</span>
              <span className={`font-mono font-bold ${processType === "leak" && valveOpen ? "text-rose-400 animate-pulse" : "text-purple-400"}`}>
                {moleculeCount} hạt ({~~(moleculeCount * 0.05)} mmol)
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="2"
              disabled={processType === "leak"} // state-driven in leak mode
              value={moleculeCount}
              onChange={(e) => setMoleculeCount(Number(e.target.value))}
              className="w-full accent-purple-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* External Thermal / Leak controls */}
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 space-y-3">
          <span className="text-[10px] text-indigo-400 font-mono font-bold tracking-wider uppercase block">
            Nguồn tác động ngoại vi
          </span>

          <div className="flex gap-2">
            <button
              disabled={processType === "isothermal"}
              onClick={() => setHeatAction(heatAction === "heating" ? "none" : "heating")}
              className={`flex-1 flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-30 ${heatAction === "heating" ? "bg-red-600 text-white animate-pulse" : "bg-red-950/40 text-red-400 border border-red-900/40 hover:bg-red-900/20"}`}
            >
              <Flame className="h-4 w-4 shrink-0" /> Nung nóng
            </button>
            <button
              disabled={processType === "isothermal"}
              onClick={() => setHeatAction(heatAction === "cooling" ? "none" : "cooling")}
              className={`flex-1 flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-30 ${heatAction === "cooling" ? "bg-blue-600 text-white animate-pulse" : "bg-blue-950/40 text-blue-400 border border-blue-900/40 hover:bg-blue-900/20"}`}
            >
              <Snowflake className="h-4 w-4 shrink-0" /> Làm lạnh
            </button>
          </div>

          {processType === "leak" && (
            <button
              onClick={() => setValveOpen(!valveOpen)}
              className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${valveOpen ? "bg-rose-600 text-white animate-bounce" : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"}`}
            >
              <Wind className="h-4 w-4" />
              {valveOpen ? "MỞ VAN: KHÍ ĐANG XẢ..." : "BẤM ĐỂ MỞ VAN XẢ KHÍ"}
            </button>
          )}
        </div>
      </div>

      {/* MIDDLE COLUMN: Real-Time Physics Canvas Container */}
      <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
        {/* State Panel Header */}
        <div className="bg-slate-900/40 p-3 rounded-2xl border border-slate-850/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-300 uppercase">BÌNH CHỨA KHÍ CƠ HỌC</span>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold"
            >
              {isPaused ? "▶ Tiếp tục" : "⏸ Tạm dừng"}
            </button>
            <button
              onClick={() => {
                applyPreset(processType);
              }}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-xs"
              title="Đặt lại"
            >
              🔄 Re-init
            </button>
          </div>
        </div>

        {/* Canvas Display */}
        <div className="relative border-4 border-slate-800 rounded-3xl overflow-hidden bg-slate-950 shadow-inner flex justify-center items-center">
          <canvas
            ref={canvasRef}
            width={containerW}
            height={containerH}
            className="block max-w-full"
          />
          
          {/* Temperature and Fire indicator tags */}
          {heatAction === "heating" && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600/90 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase text-white animate-bounce">
              🔥 Đang truyền nhiệt (+Q)
            </div>
          )}
          {heatAction === "cooling" && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600/90 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase text-white animate-bounce">
              ❄ Đang hấp thụ nhiệt (-Q)
            </div>
          )}
        </div>

        {/* Digital Readouts (Bảng chỉ số điện tử) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900 p-3 rounded-2xl border border-slate-850 text-center">
            <span className="text-[9px] text-slate-400 block uppercase">Áp suất p</span>
            <span className="text-sm font-mono font-black text-amber-400">{p_atm.toFixed(2)} atm</span>
            <span className="text-[8px] text-slate-500 font-mono block">~{Math.round(p_atm * 101.3)} kPa</span>
          </div>
          
          <div className="bg-slate-900 p-3 rounded-2xl border border-slate-850 text-center">
            <span className="text-[9px] text-slate-400 block uppercase">Thể tích V</span>
            <span className="text-sm font-mono font-black text-emerald-400">{volume.toFixed(1)} L</span>
            <span className="text-[8px] text-slate-500 font-mono block">~{volume.toFixed(1)} dm³</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-2xl border border-slate-850 text-center">
            <span className="text-[9px] text-slate-400 block uppercase">Nhiệt độ T</span>
            <span className="text-sm font-mono font-black text-blue-400">{Math.round(temperature)} K</span>
            <span className="text-[8px] text-slate-500 font-mono block">~{Math.round(temperature - 273)} °C</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-2xl border border-slate-850 text-center">
            <span className="text-[9px] text-slate-400 block uppercase">Số hạt N</span>
            <span className="text-sm font-mono font-black text-purple-400">{moleculeCount} mol</span>
            <span className="text-[8px] text-slate-500 font-mono block">~{(moleculeCount * 0.05).toFixed(2)} mmol</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Real-Time Plotter */}
      <div className="lg:col-span-3 space-y-4 flex flex-col justify-between">
        {/* Plotter Header */}
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-indigo-400 font-mono font-bold tracking-wider uppercase">
              Vẽ đồ thị chu trình
            </span>
            <button
              onClick={clearHistory}
              className="text-[9px] text-slate-400 hover:text-white underline"
            >
              Xóa vết
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setGraphType("pV")}
              className={`py-1 rounded text-[9px] font-bold ${graphType === "pV" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
            >
              Hệ (p-V)
            </button>
            <button
              onClick={() => setGraphType("pT")}
              className={`py-1 rounded text-[9px] font-bold ${graphType === "pT" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
            >
              Hệ (p-T)
            </button>
            <button
              onClick={() => setGraphType("VT")}
              className={`py-1 rounded text-[9px] font-bold ${graphType === "VT" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
            >
              Hệ (V-T)
            </button>
          </div>
        </div>

        {/* 2D Coordinate Plot */}
        <div className="bg-slate-950 border border-slate-850 p-4 rounded-3xl relative flex flex-col items-center justify-center">
          <svg width="180" height="150" className="bg-slate-950">
            {/* Draw coordinate axes */}
            <line x1="25" y1="125" x2="165" y2="125" stroke="#475569" strokeWidth="1.5" />
            <line x1="25" y1="125" x2="25" y2="15" stroke="#475569" strokeWidth="1.5" />

            {/* Axes Labels */}
            {graphType === "pV" && (
              <>
                <text x="155" y="137" fill="#94a3b8" fontSize="8" fontFamily="monospace">V</text>
                <text x="12" y="20" fill="#94a3b8" fontSize="8" fontFamily="monospace">p</text>
              </>
            )}
            {graphType === "pT" && (
              <>
                <text x="155" y="137" fill="#94a3b8" fontSize="8" fontFamily="monospace">T</text>
                <text x="12" y="20" fill="#94a3b8" fontSize="8" fontFamily="monospace">p</text>
              </>
            )}
            {graphType === "VT" && (
              <>
                <text x="155" y="137" fill="#94a3b8" fontSize="8" fontFamily="monospace">T</text>
                <text x="12" y="20" fill="#94a3b8" fontSize="8" fontFamily="monospace">V</text>
              </>
            )}

            {/* Plot history line */}
            {history.length > 1 && (
              <polyline
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="1 1"
                points={history.map(pt => {
                  let px = 0;
                  let py = 0;
                  if (graphType === "pV") {
                    // map V [2, 10] to x [25, 155]
                    px = 25 + ((pt.v - 2.0) / 8.0) * 130;
                    // map p [0.1, 3.5] to y [125, 20]
                    py = 125 - ((pt.p - 0.1) / 3.4) * 105;
                  } else if (graphType === "pT") {
                    // map T [100, 600] to x [25, 155]
                    px = 25 + ((pt.t - 100) / 500) * 130;
                    // map p [0.1, 3.5] to y [125, 20]
                    py = 125 - ((pt.p - 0.1) / 3.4) * 105;
                  } else {
                    // map T [100, 600] to x [25, 155]
                    px = 25 + ((pt.t - 100) / 500) * 130;
                    // map V [2, 10] to y [125, 20]
                    py = 125 - ((pt.v - 2.0) / 8.0) * 105;
                  }
                  // Protect bounds
                  px = Math.min(160, Math.max(25, px));
                  py = Math.min(125, Math.max(15, py));
                  return `${px},${py}`;
                }).join(" ")}
              />
            )}

            {/* Current Point Dot */}
            {(() => {
              let curX = 25;
              let curY = 125;
              if (graphType === "pV") {
                curX = 25 + ((volume - 2.0) / 8.0) * 130;
                curY = 125 - ((p_atm - 0.1) / 3.4) * 105;
              } else if (graphType === "pT") {
                curX = 25 + ((temperature - 100) / 500) * 130;
                curY = 125 - ((p_atm - 0.1) / 3.4) * 105;
              } else {
                curX = 25 + ((temperature - 100) / 500) * 130;
                curY = 125 - ((volume - 2.0) / 8.0) * 105;
              }
              curX = Math.min(160, Math.max(25, curX));
              curY = Math.min(125, Math.max(15, curY));

              return (
                <>
                  <circle cx={curX} cy={curY} r="6" fill="rgba(244, 63, 94, 0.3)" className="animate-ping" />
                  <circle cx={curX} cy={curY} r="4" fill="#f43f5e" />
                </>
              );
            })()}
          </svg>
          <span className="text-[8.5px] text-slate-500 font-mono mt-1 text-center block">
            Đồ thị chuyển trạng thái thời gian thực
          </span>
        </div>

        {/* Informative text box */}
        <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80 text-[10px] text-slate-400 leading-relaxed">
          <span className="font-bold text-slate-200 block mb-1">💡 Định lý kiểm chứng:</span>
          {processType === "isothermal" && "Đẳng nhiệt: p tỉ lệ nghịch với V (Đường biểu diễn là Hyperbol Boyle)."}
          {processType === "isochoric" && "Đẳng tích: p tỉ lệ thuận với T (Đường kéo dài đi qua gốc O)."}
          {processType === "isobaric" && "Đẳng áp: V tỉ lệ thuận với T (Đường kéo dài đi qua gốc O)."}
          {processType === "leak" && "Rò rỉ khí: m giảm, số hạt N giảm khiến áp suất p sụt giảm mạnh dù V và T được cố định."}
          {processType === "free" && "Tự do: Khối khí thay đổi ngẫu nhiên, thỏa mãn pV = nRT ở mọi trạng thái."}
        </div>
      </div>
    </div>
  );
}
