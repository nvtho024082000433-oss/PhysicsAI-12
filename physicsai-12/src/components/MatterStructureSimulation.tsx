import { useState, useEffect, useRef } from "react";
import { 
  Flame, 
  Snowflake, 
  Play, 
  Pause, 
  RotateCcw, 
  Info, 
  Activity, 
  TrendingUp,
  Atom,
  Gauge
} from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ox: number; // original X for solid lattice
  oy: number; // original Y for solid lattice
  id: number;
  color: string;
}

export function MatterStructureSimulation() {
  const [state, setState] = useState<"solid" | "liquid" | "gas">("solid");
  const [temperature, setTemperature] = useState<number>(-150); // in Celsius
  const [particleType, setParticleType] = useState<"h2o" | "argon" | "oxygen">("h2o");
  const [showBonds, setShowBonds] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [pressure, setPressure] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());
  const pressureHistoryRef = useRef<number[]>(Array(50).fill(0));
  const [pressureHistory, setPressureHistory] = useState<number[]>(Array(50).fill(0));

  // Initialize particles based on state and substance
  const initializeParticles = (selectedState: "solid" | "liquid" | "gas", type: "h2o" | "argon" | "oxygen") => {
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width : 400;
    const height = canvas ? canvas.height : 300;

    const count = selectedState === "solid" ? 96 : selectedState === "liquid" ? 80 : 35;
    const list: Particle[] = [];
    
    // Choose color based on substance
    let color = "#38bdf8"; // water (sky blue)
    if (type === "argon") color = "#c084fc"; // purple
    if (type === "oxygen") color = "#f43f5e"; // red

    if (selectedState === "solid") {
      // 8 columns, 12 rows grid
      const cols = 12;
      const rows = 8;
      const spacingX = 18;
      const spacingY = 18;
      const startX = (width - cols * spacingX) / 2 + 10;
      const startY = height - (rows * spacingY) - 20;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * spacingX + (r % 2 === 0 ? 4 : 0);
          const y = startY + r * spacingY;
          list.push({
            x,
            y,
            vx: 0,
            vy: 0,
            ox: x,
            oy: y,
            id: list.length,
            color
          });
        }
      }
    } else if (selectedState === "liquid") {
      // Densely packed at the bottom but chaotic
      for (let i = 0; i < count; i++) {
        const x = 30 + Math.random() * (width - 60);
        const y = height - 15 - Math.random() * 80;
        list.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          ox: x,
          oy: y,
          id: i,
          color
        });
      }
    } else {
      // Gas - scattered everywhere
      for (let i = 0; i < count; i++) {
        const x = 20 + Math.random() * (width - 40);
        const y = 20 + Math.random() * (height - 40);
        list.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          ox: x,
          oy: y,
          id: i,
          color
        });
      }
    }

    particlesRef.current = list;
    setPressure(0);
  };

  // Re-initialize particles when state or substance changes
  useEffect(() => {
    initializeParticles(state, particleType);
  }, [state, particleType]);

  // Handle thermal interactions
  const handleHeat = (amount: number) => {
    setTemperature(prev => {
      const nextTemp = Math.min(300, Math.max(-273, prev + amount));
      
      // Auto transition states based on realistic thresholds
      if (nextTemp < -50 && state !== "solid") {
        setState("solid");
      } else if (nextTemp >= -50 && nextTemp < 100 && state !== "liquid") {
        setState("liquid");
      } else if (nextTemp >= 100 && state !== "gas") {
        setState("gas");
      }
      return nextTemp;
    });
  };

  // Physics update & render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localPressureTicks = 0;
    let frameCount = 0;

    const tick = () => {
      if (isPaused) {
        // Still draw, but don't update physics
        draw();
        requestRef.current = requestAnimationFrame(tick);
        return;
      }

      frameCount++;
      const particles = particlesRef.current;
      const width = canvas.width;
      const height = canvas.height;
      const radius = 6;

      // Calculate thermal speed factor based on temperature in Kelvin
      const tempKelvin = temperature + 273;
      const speedFactor = Math.sqrt(tempKelvin / 273); // root of proportional kinetic energy

      let boundaryCollisions = 0;

      // 1. UPDATE PHYSICS
      if (state === "solid") {
        // Particles vibrate around their lattice centers
        // Vibration amplitude increases with speedFactor
        const vibrationAmp = 1.2 * speedFactor;
        const time = Date.now() * 0.015;

        particles.forEach((p) => {
          const targetX = p.ox + Math.sin(time + p.id * 1.3) * vibrationAmp;
          const targetY = p.oy + Math.cos(time * 0.8 + p.id * 1.7) * vibrationAmp;
          
          p.x += (targetX - p.x) * 0.3;
          p.y += (targetY - p.y) * 0.3;
          p.vx = 0;
          p.vy = 0;
        });
      } else if (state === "liquid") {
        // Particles slide over each other, attracted to the bottom by gravity,
        // and kept bound loosely.
        const gravity = 0.15;
        const attraction = 0.08;
        const containerBottom = height - 12;

        particles.forEach((p) => {
          // Apply gravity
          p.vy += gravity;

          // Weak attraction to center of mass of liquid to stay grouped
          p.vx += (Math.random() - 0.5) * 0.5 * speedFactor;
          p.vy += (Math.random() - 0.5) * 0.5 * speedFactor;

          // Limit speed based on temperature
          const maxSpeed = 2.2 * speedFactor;
          const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (currentSpeed > maxSpeed) {
            p.vx = (p.vx / currentSpeed) * maxSpeed;
            p.vy = (p.vy / currentSpeed) * maxSpeed;
          }

          p.x += p.vx;
          p.y += p.vy;

          // Container boundary checks with weak restitution
          if (p.x < radius + 15) {
            p.x = radius + 15;
            p.vx *= -0.5;
            boundaryCollisions++;
          }
          if (p.x > width - radius - 15) {
            p.x = width - radius - 15;
            p.vx *= -0.5;
            boundaryCollisions++;
          }
          if (p.y > containerBottom - radius) {
            p.y = containerBottom - radius;
            p.vy *= -0.3; // sticky floor
            p.vx *= 0.8;  // friction
          }

          // Liquid surface level cap
          const surfaceY = height - 120;
          if (p.y < surfaceY) {
            p.y = surfaceY;
            p.vy *= -0.5;
          }
        });

        // Inter-particle elastic collisions
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const pi = particles[i];
            const pj = particles[j];
            const dx = pj.x - pi.x;
            const dy = pj.y - pi.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = radius * 2 - 1;

            if (dist < minDist) {
              // Push away
              const overlap = minDist - dist;
              const nx = dx / (dist || 1);
              const ny = dy / (dist || 1);

              pi.x -= nx * overlap * 0.5;
              pi.y -= ny * overlap * 0.5;

              // Elastic impulse
              const kx = pi.vx - pj.vx;
              const ky = pi.vy - pj.vy;
              const pVal = 2 * (nx * kx + ny * ky) / 2;

              pi.vx -= nx * pVal * 0.6;
              pi.vy -= ny * pVal * 0.6;
              pj.vx += nx * pVal * 0.6;
              pj.vy += ny * pVal * 0.6;
            }
          }
        }
      } else {
        // Gas - rapid random motion, elastic bounces, no binding forces
        const baseSpeed = 3.5 * speedFactor;

        particles.forEach((p) => {
          // Add small random perturbation to simulate collisions with invisible gas molecules
          p.vx += (Math.random() - 0.5) * 0.2;
          p.vy += (Math.random() - 0.5) * 0.2;

          // Standardize velocity relative to energy
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 0) {
            p.vx = (p.vx / speed) * baseSpeed;
            p.vy = (p.vy / speed) * baseSpeed;
          }

          p.x += p.vx;
          p.y += p.vy;

          // Wall checks - each wall collision contributes to pressure!
          if (p.x < radius + 15) {
            p.x = radius + 15;
            p.vx *= -1;
            boundaryCollisions += Math.abs(p.vx);
          }
          if (p.x > width - radius - 15) {
            p.x = width - radius - 15;
            p.vx *= -1;
            boundaryCollisions += Math.abs(p.vx);
          }
          if (p.y < radius + 15) {
            p.y = radius + 15;
            p.vy *= -1;
            boundaryCollisions += Math.abs(p.vy);
          }
          if (p.y > height - radius - 15) {
            p.y = height - radius - 15;
            p.vy *= -1;
            boundaryCollisions += Math.abs(p.vy);
          }
        });

        // Inter-particle collisions
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const pi = particles[i];
            const pj = particles[j];
            const dx = pj.x - pi.x;
            const dy = pj.y - pi.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = radius * 2;

            if (dist < minDist) {
              const overlap = minDist - dist;
              const nx = dx / (dist || 1);
              const ny = dy / (dist || 1);

              pi.x -= nx * overlap * 0.5;
              pi.y -= ny * overlap * 0.5;

              const kx = pi.vx - pj.vx;
              const ky = pi.vy - pj.vy;
              const pVal = 2 * (nx * kx + ny * ky) / 2;

              pi.vx -= nx * pVal;
              pi.vy -= ny * pVal;
              pj.vx += nx * pVal;
              pj.vy += ny * pVal;
            }
          }
        }
      }

      // Calculate pressure over time (sliding window)
      localPressureTicks += boundaryCollisions;
      if (frameCount % 10 === 0) {
        const calculatedPressure = state === "solid" 
          ? 0.1 
          : state === "liquid" 
            ? Math.round((0.5 + Math.random() * 0.4) * speedFactor * 10) / 10
            : Math.round((localPressureTicks * 0.28) * 10) / 10;

        setPressure(calculatedPressure);

        // Update sliding graph
        pressureHistoryRef.current.shift();
        pressureHistoryRef.current.push(calculatedPressure);
        setPressureHistory([...pressureHistoryRef.current]);

        localPressureTicks = 0;
      }

      draw();
      requestRef.current = requestAnimationFrame(tick);
    };

    const draw = () => {
      ctx.fillStyle = "#020617"; // slate-950
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const radius = 6;

      // Draw glass jar container
      ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      ctx.beginPath();
      ctx.moveTo(15, 10);
      ctx.lineTo(15, canvas.height - 10);
      ctx.lineTo(canvas.width - 15, canvas.height - 10);
      ctx.lineTo(canvas.width - 15, 10);
      ctx.stroke();

      // Top lid if gas state to seal jar
      if (state === "gas") {
        ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
        ctx.fillStyle = "rgba(30, 41, 59, 0.9)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.rect(10, 5, canvas.width - 20, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "rgba(239, 68, 68, 0.3)";
        ctx.font = "9px monospace";
        ctx.fillText("BÌNH KÍN CHỊU ÁP SUẤT", canvas.width / 2 - 50, 22);
      } else {
        // Open beaker label
        ctx.fillStyle = "rgba(148, 163, 184, 0.3)";
        ctx.font = "8px monospace";
        ctx.fillText("BÌNH HỞ (THỂ TỰ DO)", canvas.width / 2 - 45, 20);
      }

      // 2. DRAW MOLECULAR INTERACTION BONDS (SPRINGS)
      if (showBonds && state === "solid") {
        ctx.strokeStyle = "rgba(56, 189, 248, 0.25)"; // Cyan bonds
        ctx.lineWidth = 1.5;
        
        // Connect near particles in lattice structure
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 26) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      } else if (showBonds && state === "liquid") {
        // Draw fleeting molecular attractions (weak bonds)
        ctx.strokeStyle = "rgba(34, 211, 238, 0.08)";
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i += 2) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 20) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // 3. DRAW PARTICLES WITH MATTE & GLOW AESTHETICS
      particles.forEach((p) => {
        // Particle body
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // High contrast shiny core
        ctx.beginPath();
        ctx.arc(p.x - 2, p.y - 2, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
        ctx.fill();

        // Outer neon aura based on speed factor
        if (state === "gas") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius + 2, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(244, 63, 94, 0.15)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    };

    tick();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [state, temperature, showBonds, isPaused]);

  // Reset parameters
  const handleReset = () => {
    setTemperature(state === "solid" ? -150 : state === "liquid" ? 25 : 120);
    initializeParticles(state, particleType);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-slate-900 font-sans">
      
      {/* Simulation Screen */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {/* Soft 3D container with shadow & heavy bottom border */}
        <div className="relative bg-gradient-to-b from-slate-50 to-slate-100/95 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 flex flex-col items-center shadow-sm gap-4">
          
          {/* Header readout card */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center bg-white rounded-2xl px-4 py-3 border-2 border-slate-250 border-b-[4px] border-b-slate-350 gap-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-600 animate-pulse shrink-0" />
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-500">Trạng thái hạt:</span>
              <span className={`text-[10.5px] font-black uppercase px-2.5 py-1 rounded-lg border-2 shadow-sm ${
                state === "solid" ? "bg-cyan-100/90 border-cyan-300 text-cyan-950" :
                state === "liquid" ? "bg-emerald-100/90 border-emerald-300 text-emerald-950" :
                "bg-rose-100/90 border-rose-300 text-rose-950"
              }`}>
                {state === "solid" ? "Thể Rắn (Solid)" : state === "liquid" ? "Thể Lỏng (Liquid)" : "Thể Khí (Gas)"}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-inner">
              <span className="text-[10px] font-mono font-extrabold text-slate-500">Nhiệt độ hiện tại:</span>
              <span className="text-xs font-black text-slate-900">{temperature}°C</span>
              <span className="text-[10px] text-slate-500 font-bold">({temperature + 273}K)</span>
            </div>
          </div>

          {/* Core Interactive Canvas Wrapper */}
          <div className="relative w-full max-w-md bg-slate-950 rounded-2xl overflow-hidden border-4 border-slate-300 shadow-inner p-1">
            <canvas
              ref={canvasRef}
              width={420}
              height={260}
              className="w-full h-auto block rounded-xl"
            />
            
            {/* Quick action floating controls & Pressure gauge */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center gap-2 z-10">
              <div className="flex gap-1.5">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-2 bg-white hover:bg-slate-50 border-2 border-slate-300 border-b-[4px] border-b-slate-400 active:translate-y-[2px] active:border-b-[2px] rounded-xl cursor-pointer transition-all shadow-md flex items-center justify-center text-slate-800 hover:text-slate-950"
                  title={isPaused ? "Tiếp tục" : "Tạm dừng"}
                >
                  {isPaused ? <Play className="h-3.5 w-3.5 fill-slate-800" /> : <Pause className="h-3.5 w-3.5 fill-slate-800" />}
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 bg-white hover:bg-slate-50 border-2 border-slate-300 border-b-[4px] border-b-slate-400 active:translate-y-[2px] active:border-b-[2px] rounded-xl cursor-pointer transition-all shadow-md flex items-center justify-center text-slate-800 hover:text-slate-950"
                  title="Đặt lại mô phỏng"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950/90 border border-slate-800 rounded-xl px-3 py-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="text-[9px] font-mono font-extrabold text-slate-400">Áp suất:</span>
                <span className="text-[10px] font-mono font-black text-cyan-400 w-14 text-right">{pressure.toFixed(1)} atm</span>
              </div>
            </div>
          </div>

          {/* Interactive Bunsen Burner & Coolant 3D Buttons */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
            <button
              onClick={() => handleHeat(15)}
              className="flex items-center justify-center gap-2 py-3 bg-gradient-to-b from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 border-2 border-orange-600 border-b-[5px] border-b-orange-700 hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[1px] text-orange-950 font-black text-xs uppercase tracking-wide rounded-2xl shadow-sm transition-all cursor-pointer"
            >
              <Flame className="h-4 w-4 animate-bounce shrink-0" />
              ĐỐT NÓNG PHÂN TỬ (+15°C)
            </button>
            <button
              onClick={() => handleHeat(-15)}
              className="flex items-center justify-center gap-2 py-3 bg-gradient-to-b from-sky-400 to-cyan-500 hover:from-sky-500 hover:to-cyan-600 border-2 border-sky-600 border-b-[5px] border-b-sky-700 hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[1px] text-sky-950 font-black text-xs uppercase tracking-wide rounded-2xl shadow-sm transition-all cursor-pointer"
            >
              <Snowflake className="h-4 w-4 animate-spin shrink-0" />
              HẠ LẠNH PHÂN TỬ (-15°C)
            </button>
          </div>

        </div>
      </div>

      {/* Control Sidebar */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        {/* State Selectors Card */}
        <div className="bg-gradient-to-b from-slate-50 to-slate-100/90 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 space-y-4 shadow-sm">
          <span className="text-[10px] uppercase font-mono font-black text-slate-600 tracking-wider flex items-center gap-1.5">
            <Atom className="h-4 w-4 text-cyan-600 shrink-0" />
            CHỈ ĐỊNH THỂ CỦA VẬT CHẤT
          </span>
          
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "solid", label: "THỂ RẮN", activeColor: "bg-gradient-to-b from-cyan-400 to-cyan-500 border-2 border-cyan-600 border-b-[4px] border-b-cyan-700 text-cyan-950 font-black shadow-inner" },
              { id: "liquid", label: "THỂ LỎNG", activeColor: "bg-gradient-to-b from-emerald-400 to-emerald-500 border-2 border-emerald-600 border-b-[4px] border-b-emerald-700 text-emerald-950 font-black shadow-inner" },
              { id: "gas", label: "THỂ KHÍ", activeColor: "bg-gradient-to-b from-rose-400 to-rose-500 border-2 border-rose-600 border-b-[4px] border-b-rose-700 text-rose-950 font-black shadow-inner" }
            ].map((st) => {
              const isActive = state === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    setState(st.id as any);
                    // Standard temperature ranges
                    if (st.id === "solid") setTemperature(-150);
                    if (st.id === "liquid") setTemperature(25);
                    if (st.id === "gas") setTemperature(120);
                  }}
                  className={`py-2 text-[10px] rounded-xl border-2 transition-all cursor-pointer uppercase text-center ${
                    isActive 
                      ? st.activeColor 
                      : "bg-white hover:bg-slate-50 border-slate-200 border-b-[4px] border-b-slate-300 text-slate-700 hover:text-slate-900 font-extrabold hover:translate-y-[1px] hover:border-b-[3px] active:translate-y-[2px] active:border-b-[1px]"
                  }`}
                >
                  {st.label}
                </button>
              );
            })}
          </div>

          {/* Temperature Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-200/85">
            <div className="flex justify-between text-[10px] font-mono font-extrabold text-slate-500">
              <span>ĐIỀU CHỈNH NHIỆT ĐỘ:</span>
              <span className="text-slate-900 font-black">{temperature}°C ({temperature + 273}K)</span>
            </div>
            <input
              type="range"
              min="-273"
              max="300"
              value={temperature}
              onChange={(e) => {
                const newT = parseInt(e.target.value);
                setTemperature(newT);
                if (newT < -50 && state !== "solid") setState("solid");
                else if (newT >= -50 && newT < 100 && state !== "liquid") setState("liquid");
                else if (newT >= 100 && state !== "gas") setState("gas");
              }}
              className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none border border-slate-300 shadow-inner"
            />
            <div className="flex justify-between text-[8px] font-mono font-bold text-slate-400">
              <span>-273°C (Độ không tuyệt đối)</span>
              <span>100°C (Nhiệt sôi)</span>
              <span>300°C (Cực đại)</span>
            </div>
          </div>
        </div>

        {/* Substance & Visual Settings Card */}
        <div className="bg-gradient-to-b from-indigo-50 to-indigo-100/60 border-2 border-indigo-200 border-b-[6px] border-b-indigo-300 rounded-3xl p-5 space-y-4 shadow-sm">
          <span className="text-[10px] uppercase font-mono font-black text-indigo-900 tracking-wider block">
            CÀI ĐẶT CHẤT & HIỂN THỊ
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[9px] font-mono font-extrabold text-indigo-700 block mb-1">LOẠI PHÂN TỬ:</label>
              <select
                value={particleType}
                onChange={(e) => setParticleType(e.target.value as any)}
                className="w-full bg-white border-2 border-indigo-200 border-b-[4px] border-b-indigo-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-indigo-400 cursor-pointer transition-all"
              >
                <option value="h2o">Nước (H₂O)</option>
                <option value="argon">Argon (Ar)</option>
                <option value="oxygen">Oxy (O₂)</option>
              </select>
            </div>

            <div>
              <label className="text-[9px] font-mono font-extrabold text-indigo-700 block mb-1">LIÊN KẾT PHÂN TỬ:</label>
              <button
                onClick={() => setShowBonds(!showBonds)}
                className={`w-full py-2 text-xs rounded-xl font-bold border-2 transition-all cursor-pointer ${
                  showBonds 
                    ? "bg-gradient-to-b from-indigo-400 to-indigo-500 border-indigo-600 border-b-[4px] border-b-indigo-700 text-indigo-950 font-black shadow-inner" 
                    : "bg-white hover:bg-indigo-50 border-indigo-200 border-b-[4px] border-b-indigo-300 text-indigo-800 font-extrabold hover:translate-y-[1px] hover:border-b-[3px] active:translate-y-[2px] active:border-b-[1px]"
                }`}
              >
                {showBonds ? "Đang hiện lò xo" : "Đã ẩn liên kết"}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Physics Curriculum Knowledge Base Card */}
        <div className={`border-2 border-b-[6px] rounded-3xl p-5 space-y-4 flex-1 flex flex-col justify-between shadow-sm transition-all duration-300 ${
          state === "solid" ? "bg-gradient-to-b from-sky-50 to-sky-100/70 border-sky-200 border-b-sky-350 text-sky-950" :
          state === "liquid" ? "bg-gradient-to-b from-emerald-50 to-emerald-100/70 border-emerald-200 border-b-emerald-350 text-emerald-950" :
          "bg-gradient-to-b from-rose-50 to-rose-100/70 border-rose-200 border-b-rose-350 text-rose-950"
        }`}>
          <div className="space-y-3.5">
            <span className={`text-[10px] uppercase font-mono font-black tracking-wider flex items-center gap-1.5 ${
              state === "solid" ? "text-sky-900" :
              state === "liquid" ? "text-emerald-900" :
              "text-rose-900"
            }`}>
              <Info className="h-4 w-4 shrink-0" />
              Đặc điểm lý thuyết (GDPT 2018):
            </span>

            {state === "solid" && (
              <div className="text-[11px] leading-relaxed space-y-2">
                <p>
                  <strong className="text-sky-950 font-black">Lực liên kết phân tử:</strong> Rất mạnh. Giữ các phân tử ở vị trí cố định.
                </p>
                <p>
                  <strong className="text-sky-950 font-black">Khoảng cách phân tử:</strong> Rất nhỏ, các phân tử sắp xếp có trật tự tuần hoàn khít khao.
                </p>
                <p>
                  <strong className="text-sky-950 font-black">Chuyển động:</strong> Các phân tử chỉ dao động nhỏ (vibrational motion) quanh vị trí cân bằng cố định.
                </p>
                <p>
                  <strong className="text-sky-950 font-black">Hình dạng & Thể tích:</strong> Hoàn toàn xác định rõ ràng, không phụ thuộc bình chứa.
                </p>
              </div>
            )}

            {state === "liquid" && (
              <div className="text-[11px] leading-relaxed space-y-2">
                <p>
                  <strong className="text-emerald-950 font-black">Lực liên kết phân tử:</strong> Đủ mạnh để giữ các phân tử không tách rời nhau hoàn toàn nhưng yếu hơn thể rắn.
                </p>
                <p>
                  <strong className="text-emerald-950 font-black">Khoảng cách phân tử:</strong> Lớn hơn thể rắn một chút, các phân tử xếp lộn xộn.
                </p>
                <p>
                  <strong className="text-emerald-950 font-black">Chuyển động:</strong> Dao động quanh các vị trí cân bằng dịch chuyển liên tục, dễ trượt lên nhau.
                </p>
                <p>
                  <strong className="text-emerald-950 font-black">Hình dạng & Thể tích:</strong> Thể tích xác định, hình dạng tự do thay đổi theo đáy bình chứa.
                </p>
              </div>
            )}

            {state === "gas" && (
              <div className="text-[11px] leading-relaxed space-y-2">
                <p>
                  <strong className="text-rose-950 font-black">Lực liên kết phân tử:</strong> Rất yếu (thường coi như không đáng kể).
                </p>
                <p>
                  <strong className="text-rose-950 font-black">Khoảng cách phân tử:</strong> Rất lớn so với kích thước thực tế của từng phân tử.
                </p>
                <p>
                  <strong className="text-rose-950 font-black">Chuyển động:</strong> Chuyển động hỗn loạn hoàn toàn không ngừng. Va chạm liên tiếp vào nhau và dội vào thành bình sinh ra <strong className="text-rose-900 font-extrabold underline decoration-wavy">áp suất chất khí</strong>.
                </p>
                <p>
                  <strong className="text-rose-950 font-black">Hình dạng & Thể tích:</strong> Không có hình dạng và thể tích riêng, chiếm trọn vẹn bình kín.
                </p>
              </div>
            )}
          </div>

          <div className="bg-white/85 rounded-2xl p-3 border-2 border-slate-200 border-b-[4px] border-b-slate-300 text-[10px] text-slate-850 font-semibold shadow-sm mt-3">
            💡 <strong className="text-slate-900 font-extrabold">Mẹo tương tác:</strong> Nhấp giữ nút <strong>Đốt nóng phân tử</strong> để tăng nhiệt vọt lên và xem sự chuyển đổi pha từ tinh thể rắn sang thể lỏng rồi hóa khí cực kì trực quan!
          </div>
        </div>

      </div>

    </div>
  );
}
