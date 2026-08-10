import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  ShieldAlert, 
  ArrowRight, 
  TrendingUp, 
  Activity, 
  Flame, 
  Wind,
  Settings,
  Sparkles,
  RefreshCw,
  Clock
} from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  type: "neutron" | "steam" | "electricity" | "gamma";
}

interface Bacteria {
  x: number;
  y: number;
  angle: number;
  speed: number;
}

interface Fruit {
  id: number;
  type: "apple" | "strawberry" | "orange";
  x: number; // percentage width on conveyor
  bacteriaList: Bacteria[];
  sterilizationRate: number; // 0 to 100
  isProcessed: boolean;
}

export function Lesson24Simulation() {
  const [simMode, setSimMode] = useState<"reactor" | "irradiation">("reactor");
  
  // COMMON TIME CONTROLS
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1); // 1x, 2x, 5x
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  
  // ----------------------------------------------------
  // SIMULATION 1: NUCLEAR REACTOR STATE
  // ----------------------------------------------------
  const [controlRodPosition, setControlRodPosition] = useState<number>(71.4); // 0 (fully inserted) to 100 (fully withdrawn)
  const [neutronCoefficientK, setNeutronCoefficientK] = useState<number>(1.0);
  const [coreTemp, setCoreTemp] = useState<number>(280); // °C
  const [steamPressure, setSteamPressure] = useState<number>(6.0); // MPa
  const [turbineSpeed, setTurbineSpeed] = useState<number>(3000); // RPM
  const [electricPower, setElectricPower] = useState<number>(120); // MW
  const [meltdownRisk, setMeltdownRisk] = useState<number>(0); // %
  const [isScrammed, setIsScrammed] = useState<boolean>(false); // emergency shutdown
  const [isAutoRegulated, setIsAutoRegulated] = useState<boolean>(true); // auto-stabilize and run continuously by default
  
  // ----------------------------------------------------
  // SIMULATION 2: FRUIT IRRADIATION STATE
  // ----------------------------------------------------
  const [conveyorSpeed, setConveyorSpeed] = useState<number>(3); // 1 to 5
  const [gammaIntensity, setGammaIntensity] = useState<number>(75); // 0 to 100 %
  const [processedCount, setProcessedCount] = useState<number>(0);
  const [totalBacteriaDestroyed, setTotalBacteriaDestroyed] = useState<number>(0);
  const [selectedFruitFilter, setSelectedFruitFilter] = useState<"all" | "apple" | "strawberry" | "orange">("all");
  
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const fruitIdCounter = useRef<number>(1);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(Date.now());

  // Additional features for Lesson 24 (rotating rotor generator, electricity graph)
  const [powerHistory, setPowerHistory] = useState<number[]>(Array(50).fill(120));
  const rotorAngleRef = useRef<number>(0);

  // Handle timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + simSpeed);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, simSpeed]);

  // SCRAM emergency shutdown handler
  const handleScram = () => {
    setIsScrammed(true);
    setControlRodPosition(0); // Rods fully inserted
    setIsPlaying(true);
  };

  const handleResetReactor = () => {
    setIsScrammed(false);
    setControlRodPosition(71.4);
    setCoreTemp(280);
    setSteamPressure(6.0);
    setTurbineSpeed(3000);
    setElectricPower(120);
    setMeltdownRisk(0);
    setElapsedSeconds(0);
    setPowerHistory(Array(50).fill(120));
    particles.current = [];
    setIsAutoRegulated(true);
  };

  const handleResetIrradiation = () => {
    setFruits([]);
    setProcessedCount(0);
    setTotalBacteriaDestroyed(0);
    setElapsedSeconds(0);
    particles.current = [];
    fruitIdCounter.current = 1;
  };

  // Run main physics loop
  useEffect(() => {
    const loop = () => {
      const now = Date.now();
      const dt = (now - lastUpdateTime.current) / 1000 * simSpeed;
      lastUpdateTime.current = now;

      if (!isPlaying) {
        animationFrameId.current = requestAnimationFrame(loop);
        return;
      }

      // PHYSICS UPDATE 1: NUCLEAR REACTOR
      if (simMode === "reactor") {
        // Update rotor angle smoothly based on turbine speed and dt
        rotorAngleRef.current = (rotorAngleRef.current + (turbineSpeed / 3000) * 360 * dt * 2.5) % 360;

        // If auto regulated, adjust control rod position smoothly to maintain coreTemp at ~280°C
        if (isAutoRegulated && !isScrammed) {
          const tempDiff = coreTemp - 280;
          // If temperature is too high, decrease rod position. If too low, increase.
          const adjustment = -tempDiff * 0.15; // rate of adjustment
          setControlRodPosition(prev => {
            const next = prev + adjustment * dt;
            return Math.min(100, Math.max(0, next));
          });
        }

        // k coefficient is calculated from rod position (rod position 50% gives k = 1.0)
        // 0% -> k = 0.5, 50% -> k = 1.0, 100% -> k = 1.2
        const targetK = 0.5 + (controlRodPosition / 100) * 0.7;
        setNeutronCoefficientK(prev => prev + (targetK - prev) * 0.1);

        // Core Temperature depends on k. k=1 keeps temp stable around 280°C.
        // k > 1 increases temp exponentially. k < 1 cools down towards 40°C.
        const heatGeneration = (neutronCoefficientK - 1) * 450; // heating factor
        const coolingFactor = (coreTemp - 25) * 0.05; // natural dissipation + heat exchange
        const activeHeating = Math.max(0, 12.75 * neutronCoefficientK); // fixed the formula to balance perfectly at 280°C (where coolingFactor is 12.75)
        
        setCoreTemp(prev => {
          let next = prev + (activeHeating - coolingFactor + heatGeneration) * dt * 5;
          if (next < 25) next = 25;
          
          // Overheat limit
          if (next > 400) {
            setMeltdownRisk(Math.min(100, Math.round(((next - 400) / 200) * 100)));
          } else {
            setMeltdownRisk(0);
          }

          // Auto scram if meltdown risk hits 100%
          if (next > 600 && !isScrammed) {
            handleScram();
          }

          return next;
        });

        // Steam Pressure follows core temperature (approximate boiler physics)
        // Normal temp is 280°C -> pressure is 6.0 MPa
        setSteamPressure(prev => {
          const targetPressure = (coreTemp / 280) * 6.0;
          return prev + (targetPressure - prev) * 0.08 * dt * 10;
        });

        // Turbine speed follows steam pressure
        setTurbineSpeed(prev => {
          const targetRPM = (steamPressure / 6.0) * 3000;
          return prev + (targetRPM - prev) * 0.1 * dt * 10;
        });

        // Electric power is generated by turbine speed
        setElectricPower(prev => {
          const targetPower = (turbineSpeed / 3000) * 120 * (isScrammed && coreTemp < 100 ? 0 : 1);
          return Math.max(0, prev + (targetPower - prev) * 0.2 * dt * 10);
        });

        // Add visual loop particles for core (neutrons) & pipes (steam, electric)
        if (Math.random() < 0.3) {
          // Add a neutron in core chamber
          particles.current.push({
            x: 20 + Math.random() * 30, // Core box is x=20% to x=50%
            y: 40 + Math.random() * 30, // y=40% to y=70%
            vx: (Math.random() - 0.5) * 50,
            vy: (Math.random() - 0.5) * 50,
            life: 0,
            maxLife: 2 + Math.random() * 2,
            type: "neutron"
          });
        }

        if (steamPressure > 1 && Math.random() < 0.5) {
          // Steam particle going through turbine
          particles.current.push({
            x: 55, // Boiler position
            y: 35,
            vx: 80,
            vy: 0,
            life: 0,
            maxLife: 1.5,
            type: "steam"
          });
        }

        if (electricPower > 5 && Math.random() < 0.4) {
          // Electric sparks from generator to grid
          particles.current.push({
            x: 75, // Generator
            y: 30,
            vx: 40 + Math.random() * 20,
            vy: -20 + Math.random() * 10,
            life: 0,
            maxLife: 1.0,
            type: "electricity"
          });
        }
      }

      // PHYSICS UPDATE 2: FRUIT IRRADIATION
      if (simMode === "irradiation") {
        // Spawn fruits periodically
        if (Math.random() < 0.02 * conveyorSpeed) {
          const allowedTypes: ("apple" | "strawberry" | "orange")[] = [];
          if (selectedFruitFilter === "all") {
            allowedTypes.push("apple", "strawberry", "orange");
          } else {
            allowedTypes.push(selectedFruitFilter);
          }

          if (allowedTypes.length > 0) {
            const chosenType = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
            const bacteriaCount = chosenType === "strawberry" ? 8 : (chosenType === "orange" ? 6 : 5);
            const bList: Bacteria[] = Array.from({ length: bacteriaCount }).map(() => ({
              x: (Math.random() - 0.5) * 20,
              y: (Math.random() - 0.5) * 20,
              angle: Math.random() * Math.PI * 2,
              speed: 5 + Math.random() * 10
            }));

            setFruits(prev => [
              ...prev,
              {
                id: fruitIdCounter.current++,
                type: chosenType,
                x: -10, // starts offscreen left
                bacteriaList: bList,
                sterilizationRate: 0,
                isProcessed: false
              }
            ]);
          }
        }

        // Emit gamma rays visual particles
        if (gammaIntensity > 5 && Math.random() < 0.6) {
          particles.current.push({
            x: 50 + (Math.random() - 0.5) * 8, // radiation head center x=50%
            y: 20, // top source
            vx: (Math.random() - 0.5) * 15,
            vy: 120 + Math.random() * 50,
            life: 0,
            maxLife: 2.0,
            type: "gamma"
          });
        }

        // Move fruits along conveyor (x=0% to x=100%)
        setFruits(prev => {
          let updated = prev.map(f => {
            const nextX = f.x + conveyorSpeed * 8 * dt;
            
            // Check if fruit is directly under radiation source (x=45% to x=55%)
            let nextSterilization = f.sterilizationRate;
            let bacteriaLeft = [...f.bacteriaList];

            if (nextX >= 40 && nextX <= 60 && gammaIntensity > 0) {
              const dosageRate = (gammaIntensity / 100) * 120 * dt; // dose per second
              nextSterilization = Math.min(100, f.sterilizationRate + dosageRate);

              // Kill bacteria proportionally to sterilization rate
              const currentKillThreshold = nextSterilization / 100;
              const originalCount = f.type === "strawberry" ? 8 : (f.type === "orange" ? 6 : 5);
              const targetCount = Math.round(originalCount * (1 - currentKillThreshold));
              
              if (bacteriaLeft.length > targetCount) {
                const killed = bacteriaLeft.length - targetCount;
                setTotalBacteriaDestroyed(val => val + killed);
                bacteriaLeft = bacteriaLeft.slice(0, targetCount);
              }
            }

            // Move remaining bacteria slightly for animation
            bacteriaLeft = bacteriaLeft.map(b => {
              const dx = Math.cos(b.angle) * b.speed * dt * 0.1;
              const dy = Math.sin(b.angle) * b.speed * dt * 0.1;
              let nx = b.x + dx;
              let ny = b.y + dy;
              // keep bounded near center
              if (Math.abs(nx) > 15) nx = -nx;
              if (Math.abs(ny) > 15) ny = -ny;
              return { ...b, x: nx, y: ny };
            });

            let processedNow = f.isProcessed;
            if (nextX > 60 && !f.isProcessed) {
              processedNow = true;
              setProcessedCount(val => val + 1);
            }

            return {
              ...f,
              x: nextX,
              sterilizationRate: nextSterilization,
              bacteriaList: bacteriaLeft,
              isProcessed: processedNow
            };
          });

          // Filter out off-screen fruits to save performance
          return updated.filter(f => f.x < 110);
        });
      }

      // Update generic particle movements
      particles.current = particles.current.map(p => {
        return {
          ...p,
          x: p.x + p.vx * dt * 0.1,
          y: p.y + p.vy * dt * 0.1,
          life: p.life + dt
        };
      }).filter(p => p.life < p.maxLife);

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [simMode, isPlaying, simSpeed, controlRodPosition, neutronCoefficientK, coreTemp, steamPressure, turbineSpeed, electricPower, isScrammed, conveyorSpeed, gammaIntensity, selectedFruitFilter, isAutoRegulated]);

  // Record power history for real-time current graph (5Hz polling)
  useEffect(() => {
    if (!isPlaying || simMode !== "reactor") return;
    const interval = setInterval(() => {
      setPowerHistory(prev => {
        const next = [...prev.slice(1), electricPower];
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying, simMode, electricPower]);

  // Format elapsed time to readable string
  const formatTime = (secondsCount: number) => {
    const hrs = Math.floor(secondsCount / 3600);
    const mins = Math.floor((secondsCount % 3600) / 60);
    const secs = secondsCount % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-4 md:p-6 rounded-3xl border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-amber-500/30 font-mono uppercase">
              MÔ PHỎNG VẬT LÍ 12
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-100 mt-2 flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" />
            PHÒNG THÍ NGHIỆM ĐIỆN HẠT NHÂN & CHIẾU XẠ (BÀI 24)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Mô phỏng động học quá trình điều khiển lò phản ứng hạt nhân công suất thực tế và dây chuyền chiếu xạ bảo quản rau quả xuất khẩu.
          </p>
        </div>

        {/* MODE SELECTOR */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => { setSimMode("reactor"); particles.current = []; }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
              simMode === "reactor" 
                ? "bg-indigo-600 text-white shadow-md" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            1. Nhà máy điện hạt nhân
          </button>
          <button
            onClick={() => { setSimMode("irradiation"); particles.current = []; }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
              simMode === "irradiation" 
                ? "bg-emerald-600 text-white shadow-md" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            2. Chiếu xạ trái cây
          </button>
        </div>
      </div>

      {/* TIMELINE & SPEED CONTROLLER */}
      <div className="flex flex-wrap items-center justify-between bg-slate-950 p-3.5 rounded-2xl border border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-xl transition-all ${
              isPlaying ? "bg-amber-500 text-slate-950 hover:bg-amber-400" : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
            }`}
            title={isPlaying ? "Tạm dừng" : "Tiếp tục chạy"}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          <button
            onClick={simMode === "reactor" ? handleResetReactor : handleResetIrradiation}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
            title="Tải lại mô phỏng"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Time indicator */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Thời gian chạy:</span>
            <strong className="text-amber-400 font-bold">{formatTime(elapsedSeconds)}</strong>
          </div>
        </div>

        {/* Speed presets */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Tốc độ chạy:</span>
          <div className="flex bg-slate-900 rounded-lg border border-slate-800 p-0.5 font-mono text-xs">
            {[1, 2, 5].map((speed) => (
              <button
                key={speed}
                onClick={() => setSimSpeed(speed)}
                className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                  simSpeed === speed ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ACTIVE SIMULATION INTERFACE */}
      {simMode === "reactor" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* VISUAL LAYOUT CONTAINER (7 COLS) */}
          <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            
            {/* Visual Title */}
            <div className="absolute top-3 left-3 bg-slate-900/90 border border-indigo-500/30 px-3 py-1.5 rounded-xl text-[10px] font-black text-indigo-400 uppercase tracking-wider z-10">
              SƠ ĐỒ CHU TRÌNH LÒ PHẢN ỨNG HẠT NHÂN AP1000
            </div>

            {/* Overheat Alert Badge */}
            {meltdownRisk > 0 && (
              <div className="absolute top-3 right-3 bg-rose-500/90 text-white px-3 py-1.5 rounded-xl text-[10px] font-black animate-pulse z-10 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>MẪU PHẢN ỨNG QUÁ NHIỆT! NGUY CƠ: {meltdownRisk}%</span>
              </div>
            )}

            {isScrammed && (
              <div className="absolute top-12 right-3 bg-red-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black animate-pulse z-10">
                LÒ ĐÃ NGẮT KHẨN CẤP (SCRAM)
              </div>
            )}

            {/* SCHEMA SVG DRAWING */}
            <div className="w-full h-[260px] relative mt-10">
              <svg className="w-full h-full" viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg">
                {/* 1. COOLANT PIPES BACKGROUND */}
                {/* Primary Loop (Red hot flow top, Blue cold flow bottom) */}
                <path d="M 230 110 L 400 110 L 400 160 L 230 160 Z" fill="none" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" opacity="0.15" />
                <path d="M 230 180 L 400 180 L 400 200 L 230 200 Z" fill="none" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" opacity="0.15" />
                
                {/* Secondary Loop (Steam top, condensed water bottom) */}
                <path d="M 430 80 L 580 80 L 580 170 L 430 170 Z" fill="none" stroke="#0891b2" strokeWidth="6" strokeLinecap="round" strokeDasharray="5,5" opacity="0.2" />

                {/* 2. MAIN COMPONENTS REPRESENTATION */}
                {/* REACTOR CORE CONTAINER */}
                <rect x="100" y="50" width="130" height="180" rx="15" fill="#1e1e38" stroke="#4f46e5" strokeWidth="3" />
                <text x="165" y="220" textAnchor="middle" fill="#818cf8" fontSize="10" fontWeight="bold">LÒ PHẢN ỨNG</text>
                
                {/* Fuel Elements (Urani plates) */}
                <rect x="120" y="100" width="15" height="90" fill="#fb923c" opacity="0.8" rx="2" />
                <rect x="157" y="100" width="15" height="90" fill="#fb923c" opacity="0.8" rx="2" />
                <rect x="195" y="100" width="15" height="90" fill="#fb923c" opacity="0.8" rx="2" />
                
                {/* Control Rods (Grey sliding plates) */}
                {/* When controlRodPosition is 100 (fully withdrawn), y=10. When 0 (fully inserted), y=90 */}
                <g transform={`translate(0, ${80 - (controlRodPosition / 100) * 80})`}>
                  <line x1="127.5" y1="20" x2="127.5" y2="90" stroke="#94a3b8" strokeWidth="5" />
                  <line x1="164.5" y1="20" x2="164.5" y2="90" stroke="#94a3b8" strokeWidth="5" />
                  <line x1="202.5" y1="20" x2="202.5" y2="90" stroke="#94a3b8" strokeWidth="5" />
                  <rect x="115" y="10" width="100" height="10" rx="3" fill="#64748b" />
                  <text x="165" y="5" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="black">THANH KHỐNG CHẾ (Bo/Cd)</text>
                </g>

                {/* STEAM GENERATOR / BOILER (BÌNH SINH HƠI) */}
                <rect x="330" y="60" width="100" height="160" rx="20" fill="#1e293b" stroke="#0891b2" strokeWidth="3" />
                <text x="380" y="210" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">BÌNH SINH HƠI</text>
                {/* Inner steam coil loop */}
                <path d="M 350 110 C 370 110, 370 130, 350 130 C 330 130, 330 150, 350 150 C 370 150, 370 170, 350 170" fill="none" stroke="#dc2626" strokeWidth="4" />

                {/* TURBINE & GENERATOR (TUA BIN & MÁY PHÁT) */}
                <g transform="translate(530, 60)">
                  {/* Outer Frame */}
                  <rect x="0" y="10" width="80" height="60" rx="5" fill="#334155" stroke="#f1f5f9" strokeWidth="2" />
                  <circle cx="40" cy="40" r="22" fill="#1e293b" stroke="#f1f5f9" strokeWidth="1" />
                  
                  {/* Rotating blades of turbine (animated using electric power) */}
                  <g transform={`rotate(${(elapsedSeconds * 40 * (turbineSpeed / 3000)) % 360}, 40, 40)`}>
                    <line x1="40" y1="18" x2="40" y2="62" stroke="#e2e8f0" strokeWidth="3" />
                    <line x1="18" y1="40" x2="62" y2="40" stroke="#e2e8f0" strokeWidth="3" />
                    <line x1="25" y1="25" x2="55" y2="55" stroke="#e2e8f0" strokeWidth="2" />
                    <line x1="25" y1="55" x2="55" y2="25" stroke="#e2e8f0" strokeWidth="2" />
                  </g>
                  <text x="40" y="85" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">TUA BIN HƠI</text>
                </g>

                {/* ALTERNATOR GENERATOR WITH ROTATING ROTOR (N/S POLES) */}
                <g transform="translate(625, 40)">
                  {/* Stator (Phần tĩnh) with outer cooling slots and casing */}
                  <rect x="-10" y="20" width="12" height="60" rx="3" fill="#475569" stroke="#334155" strokeWidth="1" />
                  <line x1="2" y1="50" x2="30" y2="50" stroke="#94a3b8" strokeWidth="6" /> {/* shaft connection from turbine */}
                  <circle cx="50" cy="50" r="42" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                  <circle cx="50" cy="50" r="35" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  
                  {/* Stator Three-Phase Copper Windings (Coils) */}
                  {/* Phase A - Top */}
                  <rect x="42" y="3" width="16" height="12" rx="2" fill="#b45309" stroke="#ea580c" strokeWidth="1" />
                  {/* Phase B - Bottom Left */}
                  <g transform="rotate(120, 50, 50)">
                    <rect x="42" y="3" width="16" height="12" rx="2" fill="#b45309" stroke="#ea580c" strokeWidth="1" />
                  </g>
                  {/* Phase C - Bottom Right */}
                  <g transform="rotate(240, 50, 50)">
                    <rect x="42" y="3" width="16" height="12" rx="2" fill="#b45309" stroke="#ea580c" strokeWidth="1" />
                  </g>

                  {/* ROTATING MAGNETIC ROTOR (RÔTO PHẦN QUAY) */}
                  <g transform={`rotate(${rotorAngleRef.current}, 50, 50)`}>
                    {/* Magnetic Pole N (Bắc) - Red */}
                    <rect x="41" y="16" width="18" height="34" rx="3" fill="#ef4444" />
                    <text x="50" y="28" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="black" fontFamily="sans-serif">N</text>
                    
                    {/* Magnetic Pole S (Nam) - Blue */}
                    <rect x="41" y="50" width="18" height="34" rx="3" fill="#3b82f6" />
                    <text x="50" y="62" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="black" fontFamily="sans-serif">S</text>
                    
                    {/* Central Shaft & Cap */}
                    <circle cx="50" cy="50" r="9" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
                    <circle cx="50" cy="50" r="4" fill="#cbd5e1" />
                  </g>
                  
                  <text x="50" y="103" textAnchor="middle" fill="#eab308" fontSize="8.5" fontWeight="black" letterSpacing="0.05em">RÔTO MÁY PHÁT</text>
                </g>

                {/* STEP-UP POWER TRANSFORMER (MÁY BIẾN ÁP TĂNG ÁP) */}
                <g transform="translate(705, 140)">
                  <rect x="0" y="0" width="36" height="36" rx="4" fill="#334155" stroke="#475569" strokeWidth="2" />
                  <rect x="4" y="4" width="28" height="28" rx="2" fill="#1e293b" />
                  {/* Coils wound on iron core */}
                  {/* Primary Coil (Left) */}
                  <path d="M 8 8 L 8 28 M 11 12 L 11 24" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Secondary Coil (Right) */}
                  <path d="M 28 6 L 28 30 M 25 10 L 25 26 M 22 14 L 22 22" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                  <text x="18" y="46" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="black">MÁY BIẾN ÁP</text>
                </g>

                {/* STEEL LATTICE ELECTRIC TRANSMISSION TOWER (CỘT ĐIỆN CAO THẾ) */}
                <g transform="translate(735, 80)">
                  {/* Main tower legs and support beams */}
                  <line x1="25" y1="0" x2="5" y2="120" stroke="#64748b" strokeWidth="2" />
                  <line x1="25" y1="0" x2="45" y2="120" stroke="#64748b" strokeWidth="2" />
                  <line x1="5" y1="120" x2="45" y2="120" stroke="#64748b" strokeWidth="2" />
                  
                  {/* Cross beams lattice */}
                  <line x1="13" y1="40" x2="37" y2="40" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="8" y1="80" x2="42" y2="80" stroke="#64748b" strokeWidth="1.5" />
                  {/* Diagonal braces */}
                  <line x1="17" y1="20" x2="33" y2="40" stroke="#64748b" strokeWidth="1" />
                  <line x1="33" y1="20" x2="17" y2="40" stroke="#64748b" strokeWidth="1" />
                  <line x1="13" y1="40" x2="37" y2="80" stroke="#64748b" strokeWidth="1" />
                  <line x1="37" y1="40" x2="13" y2="80" stroke="#64748b" strokeWidth="1" />
                  <line x1="8" y1="80" x2="45" y2="120" stroke="#64748b" strokeWidth="1" />
                  <line x1="42" y1="80" x2="5" y2="120" stroke="#64748b" strokeWidth="1" />

                  {/* Upper cross arms */}
                  <line x1="-12" y1="25" x2="62" y2="25" stroke="#475569" strokeWidth="2.5" />
                  {/* Lower cross arms */}
                  <line x1="-16" y1="55" x2="66" y2="55" stroke="#475569" strokeWidth="2.5" />

                  {/* Red glass/ceramic insulators */}
                  <circle cx="-12" cy="30" r="3" fill="#f43f5e" />
                  <circle cx="62" cy="30" r="3" fill="#f43f5e" />
                  <circle cx="-16" cy="60" r="3" fill="#f43f5e" />
                  <circle cx="66" cy="60" r="3" fill="#f43f5e" />

                  <text x="25" y="132" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="black">CỘT CAO THẾ</text>
                </g>

                {/* TRANSMISSION LINES AND DYNAMIC ELECTRIC FLOW SPARK DASHES */}
                {/* Wires from generator to transformer */}
                <path d="M 675 90 C 700 90, 700 150, 705 150" stroke="#ea580c" strokeWidth="1.5" fill="none" opacity="0.8" />
                <path d="M 675 75 C 695 75, 700 145, 705 145" stroke="#ea580c" strokeWidth="1.5" fill="none" opacity="0.8" />

                {/* Wire from transformer to tower left insulator */}
                <path d="M 741 150 C 732 148, 725 142, 719 140" stroke="#fbbf24" strokeWidth="1.5" fill="none" />

                {/* Grid lines stretching from tower to right screen edge */}
                {/* Upper Left Arm Wire to National Grid */}
                <path d="M 723 110 Q 761 120, 800 115" stroke="#d97706" strokeWidth="1.5" fill="none" />
                <path d="M 723 110 Q 761 120, 800 115" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="8,16" strokeDashoffset={-performance.now() / 15 * (electricPower / 120)} strokeLinecap="round" fill="none" opacity={electricPower > 5 ? 0.9 : 0} />

                {/* Upper Right Arm Wire to National Grid */}
                <path d="M 797 110 Q 798 110, 800 110" stroke="#d97706" strokeWidth="1.5" fill="none" />
                <path d="M 797 110 Q 798 110, 800 110" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="8,16" strokeDashoffset={-performance.now() / 15 * (electricPower / 120)} strokeLinecap="round" fill="none" opacity={electricPower > 5 ? 0.9 : 0} />

                {/* Lower Left Arm Wire to National Grid */}
                <path d="M 719 140 Q 759 150, 800 145" stroke="#d97706" strokeWidth="1.5" fill="none" />
                <path d="M 719 140 Q 759 150, 800 145" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="8,16" strokeDashoffset={-performance.now() / 15 * (electricPower / 120)} strokeLinecap="round" fill="none" opacity={electricPower > 5 ? 0.9 : 0} />

                {/* Lower Right Arm Wire to National Grid */}
                <path d="M 801 140 Q 801 140, 800 140" stroke="#d97706" strokeWidth="1.5" fill="none" />
                <path d="M 801 140 Q 801 140, 800 140" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="8,16" strokeDashoffset={-performance.now() / 15 * (electricPower / 120)} strokeLinecap="round" fill="none" opacity={electricPower > 5 ? 0.9 : 0} />

                {/* 3. DRAW PARTICLES IN REAL-TIME */}
                {particles.current.map((p, idx) => {
                  let color = "#fbbf24";
                  let r = 3;
                  if (p.type === "neutron") { color = "#fb923c"; r = 4; }
                  else if (p.type === "steam") { color = "#e2e8f0"; r = 3; }
                  else if (p.type === "electricity") { color = "#facc15"; r = 2; }
                  
                  return (
                    <circle 
                      key={idx} 
                      cx={`${p.x}%`} 
                      cy={`${p.y}%`} 
                      r={r} 
                      fill={color} 
                      opacity={0.8 - (p.life / p.maxLife) * 0.7} 
                    />
                  );
                })}
              </svg>
            </div>

            {/* REAL-TIME ELECTRIC CURRENT / POWER GRAPH */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl mt-3 space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  ĐỒ THỊ DÒNG ĐIỆN & CÔNG SUẤT ĐIỆN PHÁT RA (MW) THEO THỜI GIAN
                </span>
                <span className="text-[9px] font-mono font-bold text-slate-500">
                  Thời gian thực (5Hz)
                </span>
              </div>

              {/* GRAPH SVG */}
              <div className="w-full h-[70px] relative">
                <svg className="w-full h-full" viewBox="0 0 500 70" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="15" x2="500" y2="15" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="0" y1="35" x2="500" y2="35" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="0" y1="55" x2="500" y2="55" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />

                  {/* Left axes labels */}
                  <text x="5" y="12" fill="#64748b" fontSize="8" fontFamily="monospace">150 MW</text>
                  <text x="5" y="32" fill="#64748b" fontSize="8" fontFamily="monospace">100 MW</text>
                  <text x="5" y="52" fill="#64748b" fontSize="8" fontFamily="monospace">50 MW</text>
                  <text x="5" y="66" fill="#64748b" fontSize="8" fontFamily="monospace">0 MW</text>

                  {/* Shaded Area under the line */}
                  {(() => {
                    const points = powerHistory.map((val, idx) => {
                      const x = (idx / (powerHistory.length - 1)) * 500;
                      // Max value is 150MW, scale accordingly
                      const y = 70 - (Math.min(150, val) / 150) * 60 - 5;
                      return `${x},${y}`;
                    });
                    const pathD = points.length > 0 ? `M ${points.join(" L ")}` : "";
                    const areaD = points.length > 0 ? `${pathD} L 500,70 L 0,70 Z` : "";
                    
                    return (
                      <>
                        <defs>
                          <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d={areaD} fill="url(#powerGrad)" />
                        <path d={pathD} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        {/* Current Pulse marker at the end of the graph */}
                        {points.length > 0 && (
                          <circle 
                            cx={500} 
                            cy={70 - (Math.min(150, electricPower) / 150) * 60 - 5} 
                            r="4" 
                            fill="#f59e0b" 
                            className="animate-ping" 
                          />
                        )}
                      </>
                    );
                  })()}
                </svg>
              </div>
            </div>

            {/* Explanation Guide Bar */}
            <div className="bg-indigo-950/40 border border-indigo-900/50 p-2.5 rounded-xl text-[10px] text-indigo-200 mt-2 flex flex-wrap items-center gap-1.5 font-semibold">
              <span className="font-bold uppercase text-indigo-400">Nguyên lý an toàn:</span>
              <span className="flex flex-wrap items-center gap-1">Dùng thanh điều khiển Bo/Cadimi hấp thụ bớt nơtron để đưa hệ số <FormattedMathText text="k = 1,00" /> để giữ lò ổn định bền bỉ. Tránh vượt mức <FormattedMathText text="k > 1,03" /> để ngăn quá nhiệt lõi lò hạt nhân.</span>
            </div>
          </div>

          {/* STATS & CONTROL INTERFACE (4 COLS) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* POWER METRICS CARD */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4">
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">CHỈ SỐ ĐỒNG HỒ ĐO</span>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 block font-bold">Hệ số nhân nơtron k</span>
                  <span className={`text-base font-mono font-black ${neutronCoefficientK > 1.02 ? "text-rose-400" : (neutronCoefficientK < 0.98 ? "text-cyan-400" : "text-emerald-400")}`}>
                    {neutronCoefficientK.toFixed(3)}
                  </span>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 block font-bold">Nhiệt độ tâm lò</span>
                  <span className={`text-base font-mono font-black ${coreTemp > 350 ? "text-rose-400 animate-pulse" : "text-slate-100"}`}>
                    {coreTemp.toFixed(1)}°C
                  </span>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 block font-bold">Áp suất hơi Boiler</span>
                  <span className="text-base font-mono font-black text-cyan-400">
                    {steamPressure.toFixed(2)} MPa
                  </span>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 block font-bold">Tua bin quay</span>
                  <span className="text-base font-mono font-black text-slate-100">
                    {Math.round(turbineSpeed)} RPM
                  </span>
                </div>
              </div>

              {/* ELECTRICITY OUTPUT METER */}
              <div className="bg-gradient-to-r from-amber-950/30 to-slate-900 p-3 rounded-xl border border-amber-500/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-wide flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    CÔNG SUẤT PHÁT ĐIỆN HIỆU DỤNG
                  </span>
                </div>
                <div className="text-xl font-mono font-black text-amber-400">
                  {electricPower.toFixed(2)} <span className="text-xs">Megawatt (MW)</span>
                </div>
              </div>
            </div>

            {/* CONTROL PANEL CARD */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4">
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">BẢNG ĐIỀU KHIỂN HẠT NHÂN</span>
              
              {/* Auto Pilot Toggle */}
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
                <div className="flex items-center gap-2">
                  <RefreshCw className={`w-4 h-4 text-emerald-400 ${isAutoRegulated && isPlaying && !isScrammed ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
                  <div className="text-left">
                    <span className="text-xs font-bold block text-slate-200">Chạy liên tục tự động</span>
                    <span className="text-[9px] text-slate-500 block font-medium">Giữ ổn định 280°C & 120 MW</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAutoRegulated(!isAutoRegulated)}
                  disabled={isScrammed}
                  className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    isAutoRegulated ? "bg-emerald-500 animate-pulse" : "bg-slate-700"
                  } disabled:opacity-50`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      isAutoRegulated ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Rod position slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Vị trí thanh khống chế:</span>
                  <span className={`${isAutoRegulated ? "text-emerald-400" : "text-indigo-400"} font-mono font-black`}>
                    {Math.round(controlRodPosition)}% {isAutoRegulated && "(Tự động)"}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={Math.round(controlRodPosition)}
                  disabled={isScrammed || isAutoRegulated}
                  onChange={(e) => setControlRodPosition(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 disabled:opacity-40"
                />
                <div className="flex justify-between text-[8px] text-slate-500 font-bold uppercase tracking-wide">
                  <span>Thu sạch (Rod In - k Giảm)</span>
                  <span>Rút sạch (Rod Out - k Tăng)</span>
                </div>
              </div>

              {/* Trigger Scram or Reset */}
              <div className="pt-2 border-t border-slate-800 flex gap-2">
                <button
                  onClick={handleScram}
                  disabled={isScrammed}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-500 disabled:bg-slate-800 disabled:text-slate-500 text-slate-100 font-black text-xs rounded-xl transition-all shadow-md active:translate-y-0.5 uppercase tracking-wider"
                >
                  ⚠ NGẮT KHẨN (SCRAM)
                </button>
                {isScrammed && (
                  <button
                    onClick={handleResetReactor}
                    className="py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl transition-all shadow-md active:translate-y-0.5 uppercase tracking-wider"
                  >
                    Mở lại lò
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* SIMULATION 2: FRUIT IRRADIATION INTERFACE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* VISUAL LAYOUT CONTAINER (7 COLS) */}
          <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            
            {/* Visual Title */}
            <div className="absolute top-3 left-3 bg-slate-900/90 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-[10px] font-black text-emerald-400 uppercase tracking-wider z-10">
              DÂY CHUYỀN CHIẾU XẠ TRÁI CÂY COBALT-60 (γ)
            </div>

            {/* GLOWING SHIELD INDICATOR */}
            <div className="absolute top-3 right-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-xl text-[10px] font-black z-10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>BUỒNG CHẮN BỨC XẠ CHÌ BẢO VỆ</span>
            </div>

            {/* SCHEMA VISUAL DRAWING */}
            <div className="w-full h-[260px] relative mt-10">
              <svg className="w-full h-full" viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg">
                
                {/* 1. LEAD CABINET SHIELD ROOM (BUỒNG CHÌ) */}
                <rect x="300" y="20" width="200" height="180" rx="10" fill="#1e1e2e" stroke="#64748b" strokeWidth="4" opacity="0.8" />
                <rect x="320" y="30" width="160" height="160" rx="5" fill="#0f172a" />
                
                {/* 2. RADIATION SOURCE HEAD (GLOWING COBALT-60) */}
                <g transform="translate(400, 45)">
                  {/* Rays aura */}
                  {gammaIntensity > 0 && (
                    <circle cx="0" cy="0" r={20 + (gammaIntensity / 100) * 15} fill="#a855f7" opacity="0.15" className="animate-ping" />
                  )}
                  {/* Lead shield head */}
                  <path d="M -25 -10 L 25 -10 L 15 20 L -15 20 Z" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
                  {/* Cobalt Source Capsule */}
                  <circle cx="0" cy="15" r="8" fill={gammaIntensity > 0 ? "#c084fc" : "#475569"} className={gammaIntensity > 0 ? "animate-pulse" : ""} />
                  <text x="0" y="-15" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="black">NGUỒN 60Co (γ)</text>
                </g>

                {/* 3. CONVEYOR BELT (BĂNG TẢI) */}
                <rect x="50" y="190" width="700" height="15" rx="7" fill="#334155" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="197" x2="750" y2="197" stroke="#1e293b" strokeWidth="3" strokeDasharray="15,10" className="animate-marquee" />
                {/* Conveyor rollers */}
                <circle cx="65" cy="197" r="5" fill="#94a3b8" />
                <circle cx="735" cy="197" r="5" fill="#94a3b8" />
                <circle cx="200" cy="197" r="5" fill="#64748b" />
                <circle cx="400" cy="197" r="5" fill="#64748b" />
                <circle cx="600" cy="197" r="5" fill="#64748b" />

                {/* 4. DRAW FRUITS */}
                {fruits.map((f) => {
                  let color = "#ef4444"; // red apple
                  let radius = 16;
                  if (f.type === "orange") { color = "#f97316"; radius = 18; }
                  else if (f.type === "strawberry") { color = "#ec4899"; radius = 14; }

                  return (
                    <g key={f.id} transform={`translate(${f.x * 8}, 175)`}>
                      
                      {/* Fruit Body */}
                      <circle cx="0" cy="0" r={radius} fill={color} stroke="#1e293b" strokeWidth="2" />
                      
                      {/* Leaf stem */}
                      <path d="M 0 -10 Q 5 -18 12 -12" fill="none" stroke="#22c55e" strokeWidth="2.5" />

                      {/* Glowing Shield Completed Badge */}
                      {f.sterilizationRate >= 99 && (
                        <circle cx="0" cy="0" r={radius + 3} fill="none" stroke="#4ade80" strokeWidth="2" strokeDasharray="3,3" className="animate-spin" />
                      )}

                      {/* Bacteria Dots floaters */}
                      {f.bacteriaList.map((b, idx) => (
                        <circle 
                          key={idx} 
                          cx={b.x} 
                          cy={b.y} 
                          r="2.5" 
                          fill="#84cc16" 
                          stroke="#ffffff" 
                          strokeWidth="0.5" 
                        />
                      ))}

                      {/* Progress/Sterilization Rate text above */}
                      <text x="0" y="-22" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="black" fontFamily="monospace">
                        {Math.round(f.sterilizationRate)}%
                      </text>
                    </g>
                  );
                })}

                {/* 5. DRAW GAMMA RAY PARTICLES */}
                {particles.current.map((p, idx) => {
                  if (p.type !== "gamma") return null;
                  return (
                    <line 
                      key={idx} 
                      x1={`${p.x}%`} 
                      y1={`${p.y}%`} 
                      x2={`${p.x + p.vx * 0.05}%`} 
                      y2={`${p.y + p.vy * 0.05}%`} 
                      stroke="#c084fc" 
                      strokeWidth="2.5" 
                      opacity={0.8 - (p.life / p.maxLife) * 0.7} 
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Explanation Guide Bar */}
            <div className="bg-emerald-950/40 border border-emerald-900/50 p-2.5 rounded-xl text-[10px] text-emerald-200 mt-2 flex items-center gap-2">
              <span className="font-bold uppercase text-emerald-400">Ứng dụng bảo quản:</span>
              <span>Tia cực ngắn <strong className="text-white">Gamma (γ)</strong> phá hủy sinh học cấu trúc tế bào của nấm mốc và vi sinh vật gây thối, ức chế nảy mầm giúp thực phẩm tươi lâu tuyệt đối an toàn.</span>
            </div>
          </div>

          {/* STATS & CONTROL INTERFACE (4 COLS) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* POWER METRICS CARD */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4">
              <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">THÔNG SỐ DÂY CHUYỀN</span>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center col-span-2">
                  <span className="text-[9px] text-slate-400 block font-bold">Số lượng quả đã khử trùng</span>
                  <span className="text-lg font-mono font-black text-emerald-400">
                    {processedCount} quả
                  </span>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 block font-bold">Vi khuẩn tiêu diệt</span>
                  <span className="text-sm font-mono font-black text-lime-400">
                    {totalBacteriaDestroyed} tế bào
                  </span>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 block font-bold">Cường độ nguồn γ</span>
                  <span className="text-sm font-mono font-black text-purple-400">
                    {gammaIntensity}%
                  </span>
                </div>
              </div>

              {/* FILTER FRUITS FOR CONVEYOR */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-black uppercase text-slate-500 block">Lọc loại quả xuất hiện:</span>
                <div className="grid grid-cols-4 bg-slate-900 rounded-xl p-0.5 border border-slate-800 text-[10px] font-bold">
                  {["all", "apple", "strawberry", "orange"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFruitFilter(f as any)}
                      className={`py-1 rounded-md capitalize transition-all ${
                        selectedFruitFilter === f ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {f === "all" ? "Tất cả" : (f === "apple" ? "Táo" : (f === "strawberry" ? "Dâu" : "Cam"))}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CONTROL PANEL CARD */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4">
              <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">ĐIỀU CHỈNH THÔNG SỐ</span>
              
              {/* Conveyor speed */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Tốc độ băng tải:</span>
                  <span className="text-emerald-400 font-mono font-black">{conveyorSpeed} m/s</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={conveyorSpeed}
                  onChange={(e) => setConveyorSpeed(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Gamma radiation intensity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Cường độ tia phóng xạ Gamma:</span>
                  <span className="text-purple-400 font-mono font-black">{gammaIntensity}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={gammaIntensity}
                  onChange={(e) => setGammaIntensity(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* Clear button */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={handleResetIrradiation}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-black text-xs rounded-xl transition-all shadow-md active:translate-y-0.5 uppercase tracking-wider"
                >
                  Xóa lịch sử thống kê
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
