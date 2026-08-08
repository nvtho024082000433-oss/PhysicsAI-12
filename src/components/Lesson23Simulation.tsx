import React, { useState, useEffect, useRef } from "react";
import { 
  Zap, 
  Play, 
  Pause,
  RotateCcw, 
  Gauge, 
  Sliders, 
  HelpCircle, 
  Info, 
  Cpu, 
  Activity, 
  ShieldAlert,
  Flame,
  Settings,
  ChevronRight,
  TrendingDown,
  Clock
} from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

// Types for particles in the Electric Field simulation
interface RayParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "alpha" | "beta_minus" | "beta_plus" | "gamma";
  color: string;
  radius: number;
  charge: number;
  mass: number;
  trail: { x: number; y: number }[];
  maxTrail: number;
}

// Types for atoms in the Decay Grid simulation
interface DecayAtom {
  id: number;
  x: number;
  y: number;
  state: "parent" | "daughter" | "decaying";
  decayTime?: number;
  glowAge?: number;
}

interface HistoryPoint {
  time: number;
  parent: number;
  daughter: number;
}

export function Lesson23Simulation() {
  const [activeTab, setActiveTab] = useState<"electric_field" | "decay_realtime">("electric_field");
  
  // SHARED STATES
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const requestRef = useRef<number | null>(null);

  // ==========================================
  // TAB 1: ELECTRIC FIELD SIMULATOR STATES
  // ==========================================
  const fieldCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeRayFilter, setActiveRayFilter] = useState<"all" | "alpha" | "beta_minus" | "beta_plus" | "gamma">("all");
  const [voltage, setVoltage] = useState<number>(300); // 0V to 600V (determines Electric Field strength E)
  const [magneticFieldStrength, setMagneticFieldStrength] = useState<number>(0); // B-field option for enhanced learning
  
  const fieldParticlesRef = useRef<RayParticle[]>([]);
  const fieldParticleIdRef = useRef<number>(0);

  // ==========================================
  // TAB 2: DECAY REAL-TIME STATES
  // ==========================================
  const [halfLife, setHalfLife] = useState<number>(5.0); // 1.0s to 10.0s
  const [initialCount, setInitialCount] = useState<number>(200); // 50 to 300 atoms
  const [elapsedTime, setElapsedTime] = useState<number>(0); // running seconds
  const [atoms, setAtoms] = useState<DecayAtom[]>([]);
  const [history, setHistory] = useState<HistoryPoint[]>([]);

  // Refs for tracking decay loop state without triggering heavy re-renders
  const atomsRef = useRef<DecayAtom[]>([]);
  const historyRef = useRef<HistoryPoint[]>([]);
  const elapsedTimeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Reset/Initialize Electric Field on Mount or Filter Change
  useEffect(() => {
    if (activeTab === "electric_field") {
      fieldParticlesRef.current = [];
      setIsPlaying(true);
    } else {
      initializeDecayAtoms();
    }
  }, [activeTab, activeRayFilter]);

  // Handle Play/Pause toggle
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle Reset button
  const handleReset = () => {
    setIsPlaying(false);
    if (activeTab === "electric_field") {
      fieldParticlesRef.current = [];
      const canvas = fieldCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    } else {
      initializeDecayAtoms();
    }
  };

  // =======================================================
  // MODE 1: ELECTRIC FIELD PHYSICS LOOP
  // =======================================================
  useEffect(() => {
    if (activeTab !== "electric_field") return;

    let localFrameId: number;

    const canvas = fieldCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fixed internal coordinates to prevent layout shifts
    canvas.width = 600;
    canvas.height = 340;

    const loop = () => {
      // 1. CLEAR BACKGROUND
      ctx.fillStyle = "#0f172a"; // Deep Space Slate
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid lines
      ctx.strokeStyle = "rgba(51, 65, 85, 0.15)";
      ctx.lineWidth = 1;
      for (let i = 20; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 20; j < canvas.height; j += 30) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Draw Charged Plates (Capacitor)
      // Positive (+) Plate - Red at top
      ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
      ctx.fillRect(150, 15, 300, 20);
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 2;
      ctx.strokeRect(150, 15, 300, 20);
      
      // Negative (-) Plate - Blue at bottom
      ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
      ctx.fillRect(150, canvas.height - 35, 300, 20);
      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 2;
      ctx.strokeRect(150, canvas.height - 35, 300, 20);

      // Label Plates
      ctx.fillStyle = "#fecaca";
      ctx.font = "bold 10px monospace";
      ctx.fillText("+ + + + CỰC DƯƠNG (+) + + + +", 210, 29);
      ctx.fillStyle = "#bfdbfe";
      ctx.fillText("- - - - CỰC ÂM (-) - - - -", 220, canvas.height - 21);

      // Draw Emitter (Lead Cylinder Container on the Left)
      ctx.fillStyle = "#4b5563"; // gray container
      ctx.strokeStyle = "#1f2937";
      ctx.lineWidth = 3;
      // Cylinder body
      ctx.beginPath();
      ctx.roundRect(10, canvas.height / 2 - 35, 60, 70, 8);
      ctx.fill();
      ctx.stroke();

      // Lead collimator nozzle
      ctx.fillStyle = "#374151";
      ctx.fillRect(70, canvas.height / 2 - 10, 20, 20);
      ctx.strokeRect(70, canvas.height / 2 - 10, 20, 20);

      // Small radioactive sample inside
      ctx.fillStyle = "#10b981"; // green glowing uranium/polonium
      ctx.beginPath();
      ctx.arc(35, canvas.height / 2, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Rad active warning sign
      ctx.fillStyle = "#f59e0b";
      ctx.font = "bold 8px sans-serif";
      ctx.fillText("RADIOACTIVE", 14, canvas.height / 2 - 20);

      if (isPlaying) {
        // Spawn Particles stochastically
        if (Math.random() < 0.22) {
          const possibleTypes: ("alpha" | "beta_minus" | "beta_plus" | "gamma")[] = [];
          if (activeRayFilter === "all" || activeRayFilter === "alpha") possibleTypes.push("alpha");
          if (activeRayFilter === "all" || activeRayFilter === "beta_minus") possibleTypes.push("beta_minus");
          if (activeRayFilter === "all" || activeRayFilter === "beta_plus") possibleTypes.push("beta_plus");
          if (activeRayFilter === "all" || activeRayFilter === "gamma") possibleTypes.push("gamma");

          if (possibleTypes.length > 0) {
            const chosenType = possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
            let color = "";
            let charge = 0;
            let mass = 1;
            let radius = 2;
            let vx = 5;
            let vy = 0;

            switch (chosenType) {
              case "alpha":
                color = "#f97316"; // Orange
                charge = 2; // +2e
                mass = 4; // mass 4u, heavy
                radius = 3.5;
                vx = 2.8 + Math.random() * 0.4; // Slower
                vy = (Math.random() - 0.5) * 0.1;
                break;
              case "beta_minus":
                color = "#3b82f6"; // Blue
                charge = -1; // -1e
                mass = 0.25; // Adjusted from 0.0055 to make trajectory beautifully visible
                radius = 1.8;
                vx = 4.5 + Math.random() * 0.8; // Very fast
                vy = (Math.random() - 0.5) * 0.15;
                break;
              case "beta_plus":
                color = "#06b6d4"; // Cyan
                charge = 1; // +1e
                mass = 0.25; // Adjusted from 0.0055 to make trajectory beautifully visible
                radius = 1.8;
                vx = 4.5 + Math.random() * 0.8; // Very fast
                vy = (Math.random() - 0.5) * 0.15;
                break;
              case "gamma":
                color = "#a855f7"; // Purple (waves/photons)
                charge = 0; // neutral
                mass = 0.0001; // virtually weightless
                radius = 2;
                vx = 5.5; // Speed of light representation
                vy = 0;
                break;
            }

            fieldParticlesRef.current.push({
              id: ++fieldParticleIdRef.current,
              x: 90,
              y: canvas.height / 2,
              vx,
              vy,
              type: chosenType,
              color,
              radius,
              charge,
              mass,
              trail: [],
              maxTrail: chosenType === "gamma" ? 15 : 45
            });
          }
        }
      }

      // Update and Draw Particles
      const particles = fieldParticlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (isPlaying) {
          // Store trail
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > p.maxTrail) {
            p.trail.shift();
          }

          // Apply Electric Field Force if inside plate zone (x between 150 and 450)
          if (p.x >= 150 && p.x <= 450) {
            // E is proportional to voltage. Positive plate is at Y=35, Negative is at Y=canvas.height-55.
            // Electric field E points downwards. 
            // Force F = q * E. Positive charge feels force down (towards negative plate).
            // Negative charge feels force up (towards positive plate).
            const E_field = voltage * 0.0035; // scaling factor
            const forceY = p.charge * E_field;
            const ay = forceY / p.mass; // a = F / m
            p.vy += ay * 0.05; // tiny dt step
          }

          // Update positions
          p.x += p.vx;
          p.y += p.vy;
        }

        // DRAW TRAILS (Beautiful glowing lines)
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.type === "alpha" ? 2.5 : p.type === "gamma" ? 1.5 : 1.2;
          ctx.globalAlpha = 0.45;

          // Draw wavy line if gamma
          if (p.type === "gamma") {
            ctx.moveTo(p.trail[0].x, p.trail[0].y);
            for (let t = 1; t < p.trail.length; t++) {
              const xPos = p.trail[t].x;
              const yPos = p.trail[t].y + Math.sin(xPos * 0.3) * 3; // sinusoidal photon wavelength
              ctx.lineTo(xPos, yPos);
            }
          } else {
            ctx.moveTo(p.trail[0].x, p.trail[0].y);
            for (let t = 1; t < p.trail.length; t++) {
              ctx.lineTo(p.trail[t].x, p.trail[t].y);
            }
          }
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }

        // DRAW PARTICLE HEAD
        ctx.beginPath();
        ctx.fillStyle = p.color;
        
        if (p.type === "gamma") {
          // Draw photon packet as three concentric circles or small diamonds
          ctx.arc(p.x, p.y + Math.sin(p.x * 0.3) * 3, p.radius, 0, Math.PI * 2);
        } else {
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }
        ctx.fill();

        // Draw particle sign indicator
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 6px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (p.type === "alpha") {
          ctx.fillText("++", p.x, p.y);
        } else if (p.type === "beta_minus") {
          ctx.fillText("-", p.x, p.y);
        } else if (p.type === "beta_plus") {
          ctx.fillText("+", p.x, p.y);
        }

        // Boundary Clean-up
        if (
          p.x > canvas.width + 50 || 
          p.x < -50 || 
          p.y < 33 || 
          p.y > canvas.height - 33
        ) {
          // Particle exited or crashed into plates
          // Draw a tiny flash on crash
          if (p.y <= 36 && p.x > 150 && p.x < 450) {
            ctx.beginPath();
            ctx.fillStyle = "#fca5a5";
            ctx.arc(p.x, 35, 5, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.y >= canvas.height - 36 && p.x > 150 && p.x < 450) {
            ctx.beginPath();
            ctx.fillStyle = "#93c5fd";
            ctx.arc(p.x, canvas.height - 35, 5, 0, Math.PI * 2);
            ctx.fill();
          }
          particles.splice(i, 1);
        }
      }

      // Restore alignment defaults
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      localFrameId = requestAnimationFrame(loop);
    };

    localFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(localFrameId);
    };
  }, [activeTab, isPlaying, activeRayFilter, voltage]);


  // =======================================================
  // MODE 2: DECAY REAL-TIME CONTROLLER & GENERATOR
  // =======================================================
  
  // Create static grid layout of 200 atoms inside canvas bounds
  const initializeDecayAtoms = () => {
    const list: DecayAtom[] = [];
    const cols = 20;
    const rows = Math.ceil(initialCount / cols);
    const spacingX = 26;
    const spacingY = 26;

    let id = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (id >= initialCount) break;
        list.push({
          id,
          x: 20 + c * spacingX + (Math.random() * 6 - 3),
          y: 20 + r * spacingY + (Math.random() * 6 - 3),
          state: "parent",
          glowAge: 0
        });
        id++;
      }
    }

    atomsRef.current = list;
    setAtoms(list);
    
    const initialHistory = [{ time: 0, parent: initialCount, daughter: 0 }];
    historyRef.current = initialHistory;
    setHistory(initialHistory);

    elapsedTimeRef.current = 0;
    setElapsedTime(0);
    lastTimeRef.current = Date.now();
  };

  // Re-run setup whenever initialCount is adjusted
  useEffect(() => {
    if (activeTab === "decay_realtime") {
      initializeDecayAtoms();
    }
  }, [initialCount, activeTab]);

  // Decay animation loop
  useEffect(() => {
    if (activeTab !== "decay_realtime" || !isPlaying) return;

    let decayFrameId: number;
    lastTimeRef.current = Date.now();

    const runDecay = () => {
      const now = Date.now();
      const dt = (now - lastTimeRef.current) / 1000; // time delta in seconds
      lastTimeRef.current = now;

      // Update elapsed time
      elapsedTimeRef.current += dt;
      setElapsedTime(elapsedTimeRef.current);

      // Stochastic decay factor
      // Probability of an atom decaying in dt time is: P = 1 - e^(-lambda * dt) approx lambda * dt
      const lambda = 0.693147 / halfLife;
      const decayProbability = 1 - Math.exp(-lambda * dt);

      let updated = false;
      const currentAtoms = [...atomsRef.current];

      currentAtoms.forEach((atom) => {
        // If atom is currently decaying (glowing yellow circle), age its glow animation
        if (atom.state === "decaying") {
          if (atom.glowAge !== undefined) {
            atom.glowAge += dt;
            if (atom.glowAge >= 0.4) {
              atom.state = "daughter"; // transition to dark daughter nucleus
              updated = true;
            }
          }
        }
        
        // Parent atom rolls dice for decay
        if (atom.state === "parent" && Math.random() < decayProbability) {
          atom.state = "decaying";
          atom.glowAge = 0;
          atom.decayTime = elapsedTimeRef.current;
          updated = true;
        }
      });

      if (updated || Math.random() < 0.15) { // throttled saving
        atomsRef.current = currentAtoms;
        setAtoms(currentAtoms);

        const parents = currentAtoms.filter(a => a.state === "parent" || a.state === "decaying").length;
        const daughters = currentAtoms.filter(a => a.state === "daughter").length;

        // Record history at integer steps or frequently
        const lastPt = historyRef.current[historyRef.current.length - 1];
        if (!lastPt || elapsedTimeRef.current - lastPt.time >= 0.2) {
          const newHistory = [...historyRef.current, { time: elapsedTimeRef.current, parent: parents, daughter: daughters }];
          historyRef.current = newHistory;
          setHistory(newHistory);
        }
      }

      decayFrameId = requestAnimationFrame(runDecay);
    };

    decayFrameId = requestAnimationFrame(runDecay);

    return () => {
      cancelAnimationFrame(decayFrameId);
    };
  }, [activeTab, isPlaying, halfLife]);

  // Derived metrics for Tab 2
  const parentCount = atoms.filter(a => a.state === "parent" || a.state === "decaying").length;
  const daughterCount = atoms.filter(a => a.state === "daughter").length;
  const currentLambda = 0.693147 / halfLife;
  // Activity A = lambda * N (using Becquerel unit analogy)
  const currentActivity = Math.round(currentLambda * parentCount * 50); // Scaled for higher numerical value

  return (
    <div className="space-y-6">
      {/* SIMULATOR SWITCHER CARD */}
      <div className="bg-slate-900 text-slate-100 p-4 md:p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/10 rounded-xl border border-rose-500/30">
            <Cpu className="h-5 w-5 text-rose-500 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Phòng Thí Nghiệm Phóng Xạ Khảo Sát 3D</h3>
            <p className="text-[11px] text-slate-400 font-medium">Chọn mô đun thực nghiệm để khảo sát chuyển động điện trường hoặc vẽ đồ thị rã thời gian thực.</p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-750">
          <button
            onClick={() => { setActiveTab("electric_field"); setIsPlaying(true); }}
            className={`px-4 py-2 text-xs font-black rounded-lg transition-all ${
              activeTab === "electric_field"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            1. Điện trường tản tia
          </button>
          <button
            onClick={() => { setActiveTab("decay_realtime"); setIsPlaying(false); }}
            className={`px-4 py-2 text-xs font-black rounded-lg transition-all ${
              activeTab === "decay_realtime"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            2. Đồ thị Phân rã Live
          </button>
        </div>
      </div>

      {/* VIEWPORT AREA AND CONTROLS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: ACTIVE CANVAS/SIMULATED PANEL */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          {/* RENDER VIEWPORT 1: ELECTRIC FIELD */}
          {activeTab === "electric_field" && (
            <div className="bg-slate-950 p-3 rounded-2xl border-2 border-slate-800 shadow-xl overflow-hidden relative">
              <div className="absolute top-4 right-4 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800 text-[9px] font-mono text-cyan-400 font-bold z-10 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                VẬT LÝ ĐIỆN TRƯỜNG CỦA TIA SÁNG
              </div>
              <canvas 
                ref={fieldCanvasRef}
                className="w-full h-auto bg-[#0f172a] rounded-xl cursor-crosshair border border-slate-850"
              />
              <div className="text-[10px] text-slate-400 font-medium leading-relaxed mt-2.5 px-1 bg-slate-900/40 py-1.5 rounded-lg border border-slate-850/50 flex items-center gap-2">
                <Info className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>
                  <strong>Hướng dẫn quan sát:</strong> Chú ý sự phân tách ba luồng: Tia <span className="text-orange-400 font-bold">Alpha (Orange)</span> lệch nhẹ xuống; Tia <span className="text-blue-400 font-bold">Beta- trừ (Blue)</span> lệch mạnh lên; Tia <span className="text-cyan-400 font-bold">Beta+ cộng (Cyan)</span> lệch mạnh xuống; còn Tia <span className="text-purple-400 font-bold">Gamma (Purple)</span> truyền thẳng tuyệt đối!
                </span>
              </div>
            </div>
          )}

          {/* RENDER VIEWPORT 2: ATOM GRID DECAY LIVE */}
          {activeTab === "decay_realtime" && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-md flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  Mô hình hóa 2D mặt hạt nhân nguyên tử ({parentCount} chưa rã)
                </span>
                <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-black flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-rose-500" />
                  t = {elapsedTime.toFixed(2)}s
                </span>
              </div>

              {/* Atoms grid canvas/div box */}
              <div className="h-60 bg-slate-950 rounded-xl border border-slate-850 relative p-3 overflow-hidden shadow-inner flex items-center justify-center">
                {atoms.length === 0 ? (
                  <div className="text-slate-500 font-mono text-xs font-semibold uppercase animate-pulse">Thiết lập tham số rồi bấm Bắt đầu</div>
                ) : (
                  <div className="relative w-[540px] h-48">
                    {atoms.map((atom) => (
                      <div
                        key={atom.id}
                        className={`absolute rounded-full transition-all duration-300 flex items-center justify-center ${
                          atom.state === "parent" 
                            ? "w-4.5 h-4.5 bg-indigo-600 border border-indigo-400 shadow-md shadow-indigo-600/30 scale-100" 
                            : atom.state === "decaying"
                              ? "w-7 h-7 bg-yellow-400 border-2 border-white scale-125 z-10 animate-ping opacity-90"
                              : "w-3.5 h-3.5 bg-slate-700 border border-slate-500 opacity-40 scale-75"
                        }`}
                        style={{ left: `${atom.x}px`, top: `${atom.y}px` }}
                      >
                        {atom.state === "parent" && (
                          <span className="text-[6.5px] font-mono font-bold text-white leading-none">M</span>
                        )}
                        {atom.state === "decaying" && (
                          <span className="text-[8px] font-mono font-black text-slate-950 leading-none">⚡</span>
                        )}
                        {atom.state === "daughter" && (
                          <span className="text-[5.5px] font-mono text-slate-400 leading-none">C</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Real-time Graph below grid */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                  Đồ thị tích lũy số lượng hạt nhân theo thời gian (Thời gian thực)
                </span>
                
                {/* SVG Live plotting */}
                <div className="h-32 bg-slate-50 border border-slate-200 rounded-xl p-2 relative flex items-center justify-center shadow-inner">
                  {history.length <= 1 ? (
                    <div className="text-[11px] text-slate-400 font-mono italic">Nhấn nút phát (PLAY) để bắt đầu vẽ đồ thị rã tích lũy...</div>
                  ) : (
                    <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                      {/* Grid guidelines */}
                      <line x1="0" y1="50" x2="500" y2="50" stroke="#cbd5e1" strokeDasharray="3" strokeWidth="0.5" />
                      
                      {/* Curves drawing */}
                      {/* Convert History Points into SVG Path points:
                          X = pt.time * scale. Max time is about 25s
                          Y_parent = 100 - (pt.parent / initialCount) * 80 (leave padding)
                          Y_daughter = 100 - (pt.daughter / initialCount) * 80
                      */}
                      {(() => {
                        const maxTime = Math.max(10, elapsedTimeRef.current);
                        const scaleX = 480 / maxTime;
                        
                        let parentPoints = "";
                        let daughterPoints = "";

                        history.forEach((pt) => {
                          const x = 10 + pt.time * scaleX;
                          const yP = 90 - (pt.parent / initialCount) * 80;
                          const yD = 90 - (pt.daughter / initialCount) * 80;
                          
                          parentPoints += `${x},${yP} `;
                          daughterPoints += `${x},${yD} `;
                        });

                        return (
                          <>
                            {/* Half-life vertical marker at elapsed multiple */}
                            {Array.from({ length: 4 }).map((_, idx) => {
                              const tMark = (idx + 1) * halfLife;
                              if (tMark > maxTime) return null;
                              const xMark = 10 + tMark * scaleX;
                              return (
                                <g key={idx}>
                                  <line x1={xMark} y1="10" x2={xMark} y2="90" stroke="#f43f5e" strokeDasharray="2" strokeWidth="0.75" />
                                  <text x={xMark + 2} y="18" fill="#f43f5e" className="text-[7px] font-mono font-bold">Chu kỳ {idx + 1}T</text>
                                </g>
                              );
                            })}

                            {/* Parent curve - Indigo */}
                            <polyline
                              fill="none"
                              stroke="#4f46e5"
                              strokeWidth="2.5"
                              points={parentPoints}
                            />
                            {/* Daughter curve - Gold */}
                            <polyline
                              fill="none"
                              stroke="#d97706"
                              strokeWidth="2"
                              points={daughterPoints}
                            />

                            {/* Intersection marker overlay */}
                            {elapsedTimeRef.current >= halfLife && (
                              <circle cx={10 + halfLife * scaleX} cy={50} r="4.5" fill="#f43f5e" className="animate-pulse" />
                            )}
                          </>
                        );
                      })()}
                    </svg>
                  )}

                  {/* Legends overlay */}
                  <div className="absolute bottom-2 right-4 flex gap-3 text-[9px] font-mono font-bold bg-white/90 p-1 rounded border border-slate-100 shadow">
                    <span className="flex items-center gap-1 text-indigo-600">
                      <span className="w-2.5 h-0.75 bg-indigo-600 block" /> Mẹ N(t)
                    </span>
                    <span className="flex items-center gap-1 text-amber-600">
                      <span className="w-2.5 h-0.75 bg-amber-600 block" /> Con ΔN(t)
                    </span>
                    <span className="flex items-center gap-1 text-rose-500">
                      <span className="w-2.5 h-0.75 bg-rose-500 border-t border-dashed block" /> Chu kỳ (T)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: INTERACTIVE INPUTS AND PARAMETER CONTROLS */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          
          {/* CONTROL BOX (3D STYLE) */}
          <div className="bg-gradient-to-b from-slate-50 to-slate-100 border-2 border-slate-200 border-b-[5px] border-b-slate-300 rounded-2xl p-5 space-y-5 shadow-sm">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <Sliders className="w-4.5 h-4.5 text-rose-600" />
              Bảng điều khiển thông số
            </h4>

            {/* Render controls for ELECTRIC FIELD */}
            {activeTab === "electric_field" && (
              <div className="space-y-4.5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 block">Lọc tia phóng xạ:</label>
                  <select
                    value={activeRayFilter}
                    onChange={(e) => setActiveRayFilter(e.target.value as any)}
                    className="w-full text-xs font-bold border border-slate-300 rounded-xl p-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="all">Hiện tất cả các tia (α, β⁻, β⁺, γ)</option>
                    <option value="alpha">Tia Alpha (α - Dòng Heli mang cực dương)</option>
                    <option value="beta_minus">Tia Beta trừ (β⁻ - Dòng Electron cực nhẹ)</option>
                    <option value="beta_plus">Tia Beta cộng (β⁺ - Dòng Positron cực nhẹ)</option>
                    <option value="gamma">Tia Gamma (γ - Photon trung hòa thẳng)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black">
                    <span className="text-slate-500">Hiệu điện thế bản tụ U:</span>
                    <span className="text-rose-600 font-mono">{voltage} Volts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="600"
                    step="25"
                    value={voltage}
                    onChange={(e) => setVoltage(parseInt(e.target.value))}
                    className="w-full accent-rose-600 cursor-ew-resize"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-400">
                    <span>Yếu (0V)</span>
                    <span>Trung bình (300V)</span>
                    <span>Mạnh (600V)</span>
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl text-[10px] text-slate-600 leading-relaxed font-semibold space-y-1">
                  <div className="font-bold text-slate-800 border-b border-slate-100 pb-0.5 uppercase tracking-wide">Cơ sở vật lý vĩ mô:</div>
                  <p className="flex items-center gap-1">Lực điện trường lệch hạt mang điện: <span className="text-rose-600 font-normal"><FormattedMathText text="F = q \cdot E" /></span>.</p>
                  <p className="flex items-center gap-1">Gia tốc hạt lệch tỉ lệ nghịch với khối lượng: <span className="text-blue-600 font-normal"><FormattedMathText text="a = \frac{q \cdot E}{m}" /></span>.</p>
                  <p className="flex items-center gap-1 flex-wrap">Do <span className="font-bold text-slate-900"><FormattedMathText text="m_\alpha" /></span> (~4u) gấp 7300 lần <span className="font-bold text-slate-900"><FormattedMathText text="m_\beta" /></span> (~0,00055u) nên tia alpha ít lệch hơn rất nhiều so với tia beta!</p>
                </div>
              </div>
            )}

            {/* Render controls for DECAY REAL-TIME */}
            {activeTab === "decay_realtime" && (
              <div className="space-y-4.5">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black">
                    <span className="text-slate-500">Chu kỳ bán rã mong muốn (T):</span>
                    <span className="text-rose-600 font-mono">{halfLife.toFixed(1)} giây</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.5"
                    value={halfLife}
                    onChange={(e) => setHalfLife(parseFloat(e.target.value))}
                    className="w-full accent-rose-600 cursor-ew-resize"
                    disabled={isPlaying}
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-400">
                    <span>Phân rã nhanh (1.0s)</span>
                    <span>Trung bình (5.0s)</span>
                    <span>Chậm (10.0s)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black">
                    <span className="text-slate-500">Số lượng hạt nhân ban đầu N₀:</span>
                    <span className="text-rose-600 font-mono">{initialCount} hạt</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    step="10"
                    value={initialCount}
                    onChange={(e) => setInitialCount(parseInt(e.target.value))}
                    className="w-full accent-rose-600 cursor-ew-resize"
                    disabled={isPlaying}
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-400">
                    <span>Thưa (50)</span>
                    <span>Khuyên dùng (200)</span>
                    <span>Đặc (300)</span>
                  </div>
                </div>

                {/* Stochastic stats panel (3D Style) */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2 font-mono text-[10px]">
                  <div className="font-black text-slate-800 border-b border-slate-100 pb-1 flex items-center justify-between">
                    <span>THÔNG SỐ ĐO LIVE:</span>
                    <Activity className="h-3.5 w-3.5 text-rose-500" />
                  </div>
                  <div className="space-y-1 text-slate-700">
                    <div>• Hằng số phân rã λ: <span className="text-indigo-600 font-bold">{(currentLambda).toFixed(5)} s⁻¹</span></div>
                    <div>• Khối lượng còn lại N(t): <span className="text-indigo-600 font-bold">{parentCount} / {initialCount}</span></div>
                    <div>• Hạt đã biến đổi ΔN: <span className="text-amber-600 font-bold">{daughterCount} / {initialCount}</span></div>
                    <div className="border-t border-slate-100 pt-1 mt-1 text-rose-600 font-black">
                      • Hoạt độ phóng xạ đo được: {currentActivity} Bq
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BUTTONS ROW (3D Style Buttons) */}
            <div className="grid grid-cols-2 gap-3.5">
              <button
                onClick={handleTogglePlay}
                className={`py-2.5 px-4 text-xs font-black rounded-xl border border-b-[4px] transition-all flex items-center justify-center gap-1.5 active:translate-y-[2px] active:border-b-[2px] ${
                  isPlaying 
                    ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-600 border-b-amber-700" 
                    : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 border-b-emerald-800"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4.5 w-4.5 fill-white" /> Tạm dừng
                  </>
                ) : (
                  <>
                    <Play className="h-4.5 w-4.5 fill-white" /> Bắt đầu
                  </>
                )}
              </button>
              
              <button
                onClick={handleReset}
                className="py-2.5 px-4 text-xs font-black text-slate-700 bg-white border border-slate-300 border-b-[4px] border-b-slate-400 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 active:translate-y-[2px] active:border-b-[2px]"
              >
                <RotateCcw className="h-4.5 w-4.5" /> Khởi động lại
              </button>
            </div>
          </div>

          {/* SIDE INFORMATION CARD (3D STYLE) */}
          <div className="bg-gradient-to-b from-rose-50 to-rose-100/30 border-2 border-rose-200 border-b-[5px] border-b-rose-300/80 rounded-2xl p-5 shadow-sm no-override">
            <h4 className="text-xs font-black text-rose-950 uppercase tracking-wider flex items-center gap-1 border-b border-rose-200 pb-1.5 mb-2">
              <HelpCircle className="h-4.5 w-4.5 text-rose-700" />
              Câu hỏi thử thách tư duy!
            </h4>
            <div className="text-[11px] text-rose-950 font-medium leading-relaxed space-y-2">
              <p>
                <strong>Thử thách:</strong> Thiết lập chu kỳ bán rã ở mức thấp nhất <span className="font-bold">1.0 giây</span> rồi cho chạy. Hãy ước lượng xem sau bao nhiêu giây thì số hạt phóng xạ còn lại đúng bằng 12.5% lượng ban đầu (tức còn lại 25 hạt nếu khởi điểm là 200)? 
              </p>
              <p className="font-bold border-t border-rose-200/50 pt-1.5 text-[10.5px]">
                Gợi ý: Áp dụng công thức số khối bán phân rã bội kỳ: <span className="text-rose-700 font-normal"><FormattedMathText text="t = n \cdot T" /></span> (với n là số chu kỳ, ở đây là <FormattedMathText text="12,5\% = 1/2^3 \implies n = 3" /> chu kỳ).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
