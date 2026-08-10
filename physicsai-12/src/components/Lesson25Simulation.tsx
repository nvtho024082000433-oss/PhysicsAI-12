import React, { useState, useEffect, useRef } from "react";
import { 
  Zap, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Sliders, 
  Cpu, 
  Activity, 
  Radio, 
  Gauge, 
  Database,
  Compass,
  ArrowRight,
  Info,
  Layers,
  Sparkles,
  Flame,
  Award
} from "lucide-react";

// Nuclide representation inside simulation
function SimulationNuclide({ a, z, element }: { a: string; z: string; element: string }) {
  return (
    <span className="inline-flex items-center mx-0.5 font-bold font-mono text-slate-100 bg-slate-850 px-1 py-0.5 rounded border border-slate-700 text-[11px]">
      <span className="flex flex-col text-[7px] leading-none text-right mr-0.5 -space-y-0.5 font-black text-amber-400">
        <span>{a}</span>
        <span>{z}</span>
      </span>
      <span>{element}</span>
    </span>
  );
}

export function Lesson25Simulation() {
  // Accelerator type
  const [acceleratorType, setAcceleratorType] = useState<"cyclotron" | "linac">("cyclotron");
  
  // Simulation control states
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1); // 1x, 2x, 5x
  const [isAccelerating, setIsAccelerating] = useState<boolean>(false);
  
  // Slider Controls
  const [voltageKV, setVoltageKV] = useState<number>(50); // 10kV to 150kV
  const [bFieldTesla, setBFieldTesla] = useState<number>(1.5); // 0.5T to 2.5T (for cyclotron)
  const [particleType, setParticleType] = useState<"proton" | "deuteron" | "electron">("proton");
  
  // Real-time telemetry
  const [kineticEnergyMeV, setKineticEnergyMeV] = useState<number>(0);
  const [velocityPercentC, setVelocityPercentC] = useState<number>(0);
  const [gapsCrossed, setGapsCrossed] = useState<number>(0);
  const [collisionStatus, setCollisionStatus] = useState<"idle" | "collision" | "synthesized">("idle");
  const [activeFrequencyMHz, setActiveFrequencyMHz] = useState<number>(22.8); // Resonant frequency qB/(2*pi*m)

  // Isotope synthesis & Decay simulation
  const [targetType, setTargetType] = useState<"O18" | "Co59">("O18");
  const [synthesizedCount, setSynthesizedCount] = useState<number>(0);
  const [remainingActivityBq, setRemainingActivityBq] = useState<number>(0);
  const [decaySpeed, setDecaySpeed] = useState<number>(1); // slider for speeding up radioactive decay

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Particle position, velocity, and spiral orbit state
  const particleStateRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 0,
    angle: 0,
    energy: 0,
    active: false,
    spiralStep: 0,
    crossingGap: false,
    polarityTimer: 0,
    linacPosition: 0,
    linacStage: 0,
    linacGaps: 6
  });

  // Physical Constants & Formulas based on selected particle
  const getParticleProperties = () => {
    switch (particleType) {
      case "proton":
        return { name: "Proton (¹H⁺)", mass: 1.0, charge: 1, color: "#38bdf8" }; // light blue
      case "deuteron":
        return { name: "Deuteron (²H⁺)", mass: 2.0, charge: 1, color: "#a7f3d0" }; // emerald
      case "electron":
        return { name: "Electron (e⁻)", mass: 0.00054, charge: -1, color: "#f43f5e" }; // rose red
    }
  };

  const particleProps = getParticleProperties();

  // Recalculate resonant frequency on parameters change
  useEffect(() => {
    const { mass, charge } = getParticleProperties();
    // Cyclotron resonance: f = qB / (2 * pi * m)
    // Scaled for nice UI display in MHz
    const baseFreq = (charge * bFieldTesla) / (mass * 1.0);
    const displayedFreq = parseFloat((baseFreq * 15.2).toFixed(1));
    setActiveFrequencyMHz(displayedFreq);
  }, [particleType, bFieldTesla]);

  // Handle Injecting Particle
  const handleInjectParticle = () => {
    const { charge } = getParticleProperties();
    particleStateRef.current = {
      x: 0,
      y: 0,
      vx: 0.1,
      vy: 0,
      radius: 5,
      angle: 0,
      energy: 0.01, // small initial injection energy
      active: true,
      spiralStep: 0,
      crossingGap: false,
      polarityTimer: 0,
      linacPosition: 30, // left side of linac
      linacStage: 0,
      linacGaps: 6
    };
    setIsAccelerating(true);
    setGapsCrossed(0);
    setKineticEnergyMeV(0.01);
    setVelocityPercentC(0.1);
    setCollisionStatus("idle");
  };

  // Reset function
  const handleReset = () => {
    particleStateRef.current.active = false;
    setIsAccelerating(false);
    setGapsCrossed(0);
    setKineticEnergyMeV(0);
    setVelocityPercentC(0);
    setCollisionStatus("idle");
    setSynthesizedCount(0);
    setRemainingActivityBq(0);
  };

  // Trigger radioactive decay over time
  useEffect(() => {
    if (remainingActivityBq <= 0) return;
    
    const interval = setInterval(() => {
      setRemainingActivityBq(prev => {
        // Half-lives: F-18 is 110 min, Co-60 is 5.3 years.
        // We simulate decay based on decaySpeed multiplier
        const decayRate = targetType === "O18" 
          ? 0.005 * decaySpeed // F-18 decays faster in UI
          : 0.0002 * decaySpeed; // Co-60 decays slower in UI
        const next = prev * (1 - decayRate);
        return next < 0.1 ? 0 : next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [remainingActivityBq, decaySpeed, targetType]);

  // Main animation loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let electricFieldPolarity = 1; // 1 or -1 alternating
    let gapGlowIntensity = 0;

    const render = () => {
      // Clear canvas with deep technical background
      ctx.fillStyle = "#020617"; // slate-950
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw target area first on the right side
      drawTargetArea(ctx, canvas);

      // Render Cyclotron or Linac structure
      if (acceleratorType === "cyclotron") {
        drawCyclotronStructure(ctx, canvas, electricFieldPolarity, gapGlowIntensity);
      } else {
        drawLinacStructure(ctx, canvas, electricFieldPolarity, gapGlowIntensity);
      }

      // Update and Draw Particle if active
      if (particleStateRef.current.active && isPlaying) {
        // Multiply step by simSpeed
        for (let step = 0; step < simSpeed; step++) {
          updateParticlePhysics(canvas, electricFieldPolarity);
        }
        drawParticle(ctx);
      }

      // Alternating electric field oscillator visual state
      if (isPlaying) {
        gapGlowIntensity = Math.abs(Math.sin(Date.now() * 0.01));
        if (Date.now() % 400 < 200) {
          electricFieldPolarity = 1;
        } else {
          electricFieldPolarity = -1;
        }
      }

      animationId = requestAnimationFrame(render);
    };

    // Helper: Draw target area on the right side of the chamber
    const drawTargetArea = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const targetX = canvas.width - 55;
      const targetY = canvas.height / 2;

      // Outer chamber shield line
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 10, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Target Holder
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(targetX - 10, targetY - 45, 20, 90);
      ctx.strokeStyle = "#334155";
      ctx.strokeRect(targetX - 10, targetY - 45, 20, 90);

      // Draw Target Isotope Plate
      ctx.fillStyle = targetType === "O18" ? "#ef4444" : "#eab308"; // Red O-18 or yellow Co-59
      ctx.fillRect(targetX - 6, targetY - 35, 12, 70);

      // Target Labels
      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.fillText(targetType === "O18" ? "BIA O-18" : "BIA Co-59", targetX, targetY - 50);

      // Collision explosion effect
      if (collisionStatus === "collision") {
        ctx.fillStyle = "rgba(251, 146, 60, 0.4)";
        ctx.beginPath();
        ctx.arc(targetX, targetY, 40, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#f97316";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(targetX, targetY, 25 + Math.sin(Date.now() * 0.05) * 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText("COLLISION!", targetX, targetY + 4);
      }
    };

    // Helper: Draw Cyclotron copper Dees
    const drawCyclotronStructure = (
      ctx: CanvasRenderingContext2D, 
      canvas: HTMLCanvasElement,
      polarity: number,
      glow: number
    ) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.height / 2 - 25;

      // Draw Left Dee
      ctx.fillStyle = "rgba(245, 158, 11, 0.08)"; // Copper color soft transparency
      ctx.strokeStyle = "#f59e0b"; // Golden/Copper border
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX - 4, centerY, radius, Math.PI * 0.5, Math.PI * 1.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw Right Dee
      ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
      ctx.beginPath();
      ctx.arc(centerX + 4, centerY, radius, Math.PI * 1.5, Math.PI * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw Central accelerating gap glow
      const gapWidth = 8;
      const gradient = ctx.createLinearGradient(centerX - gapWidth, 0, centerX + gapWidth, 0);
      gradient.addColorStop(0, "rgba(99, 102, 241, 0.0)");
      gradient.addColorStop(0.5, polarity > 0 ? `rgba(56, 189, 248, ${0.15 * glow})` : `rgba(244, 63, 94, ${0.15 * glow})`);
      gradient.addColorStop(1, "rgba(99, 102, 241, 0.0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(centerX - gapWidth, centerY - radius, gapWidth * 2, radius * 2);

      // Draw magnetic field background indications (crosses for into page)
      ctx.strokeStyle = "rgba(100, 116, 139, 0.15)";
      ctx.lineWidth = 1;
      const density = 40;
      for (let x = centerX - radius + 20; x < centerX + radius - 20; x += density) {
        for (let y = centerY - radius + 20; y < centerY + radius - 20; y += density) {
          // Check if inside Dees
          const distL = Math.hypot(x - (centerX - 4), y - centerY);
          const distR = Math.hypot(x - (centerX + 4), y - centerY);
          if (distL < radius - 10 || distR < radius - 10) {
            ctx.beginPath();
            ctx.moveTo(x - 3, y - 3);
            ctx.lineTo(x + 3, y + 3);
            ctx.moveTo(x + 3, y - 3);
            ctx.lineTo(x - 3, y + 3);
            ctx.stroke();
          }
        }
      }

      // Draw high voltage oscillator connector
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - 50, centerY + radius + 3);
      ctx.lineTo(centerX - 50, centerY + radius + 15);
      ctx.lineTo(centerX + 50, centerY + radius + 15);
      ctx.lineTo(centerX + 50, centerY + radius + 3);
      ctx.stroke();

      // Oscillating generator symbol
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(centerX, centerY + radius + 15, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 8px sans-serif";
      ctx.fillText("RF ~", centerX, centerY + radius + 18);
    };

    // Helper: Draw Linear Accelerator sequential drift tubes
    const drawLinacStructure = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      polarity: number,
      glow: number
    ) => {
      const centerY = canvas.height / 2;
      const startX = 30;
      const endX = canvas.width - 60;
      const totalWidth = endX - startX;

      // Draw Beam path tube line
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX, centerY);
      ctx.lineTo(endX, centerY);
      ctx.stroke();

      // Draw drift tubes (sequentially longer to accommodate rising speed)
      let currentX = startX;
      let tubeLength = 18;
      const gap = 12;

      for (let i = 0; i < 6; i++) {
        // Draw Drift cylinder
        ctx.fillStyle = "rgba(100, 116, 139, 0.2)";
        ctx.strokeStyle = "#64748b";
        ctx.lineWidth = 2;
        ctx.fillRect(currentX, centerY - 15, tubeLength, 30);
        ctx.strokeRect(currentX, centerY - 15, tubeLength, 30);

        // Polarity indicators (+ and -) above tubes alternating
        const tubePolarity = (i % 2 === 0 ? polarity : -polarity) > 0 ? "+" : "-";
        ctx.fillStyle = tubePolarity === "+" ? "#38bdf8" : "#f43f5e";
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(tubePolarity, currentX + tubeLength / 2, centerY - 20);

        // Gap electric field glow
        if (i < 5) {
          const gapX = currentX + tubeLength;
          ctx.fillStyle = `rgba(56, 189, 248, ${0.1 * glow})`;
          ctx.fillRect(gapX, centerY - 8, gap, 16);
          
          // Gap lines
          ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
          ctx.beginPath();
          ctx.moveTo(gapX, centerY - 8);
          ctx.lineTo(gapX + gap, centerY - 8);
          ctx.moveTo(gapX, centerY + 8);
          ctx.lineTo(gapX + gap, centerY + 8);
          ctx.stroke();
        }

        currentX += tubeLength + gap;
        tubeLength *= 1.45; // Geometric length increase!
      }
    };

    // Helper: Draw the accelerated particle
    const drawParticle = (ctx: CanvasRenderingContext2D) => {
      const p = particleStateRef.current;
      
      // Draw tail trail
      ctx.fillStyle = `${particleProps.color}22`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius + 4, 0, Math.PI * 2);
      ctx.fill();

      // Inner glowing core
      ctx.fillStyle = particleProps.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // White highlight dot
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    };

    // Update Particle State (Physics mechanics)
    const updateParticlePhysics = (canvas: HTMLCanvasElement, polarity: number) => {
      const p = particleStateRef.current;
      if (!p.active) return;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const targetX = canvas.width - 55;

      if (acceleratorType === "cyclotron") {
        // SPIRAL PHYSICS IN MAGNETIC FIELD
        // B-field creates centripetal force: F_m = q * v * B
        // Radius r = m * v / (q * B)
        // Angle increases with angular velocity omega = v / r
        p.angle += (bFieldTesla * 0.05) / (getParticleProperties().mass);
        
        // Compute position based on angle and radius
        p.x = centerX + Math.cos(p.angle) * p.radius;
        p.y = centerY + Math.sin(p.angle) * p.radius;

        // Crossing the gap? Gap is vertical along the center line (x ~ centerX)
        const inGap = Math.abs(p.x - centerX) < 5;
        
        if (inGap && !p.crossingGap) {
          p.crossingGap = true;
          // Apply electric field boost!
          // Voltage booster increases kinetic energy: dE = q * V
          const boostFactor = (voltageKV / 100) * 1.5;
          p.energy += boostFactor;
          setGapsCrossed(prev => prev + 1);
          setKineticEnergyMeV(parseFloat(p.energy.toFixed(2)));
          
          // Radius increases because speed increases
          p.radius += 2.8 * (voltageKV / 100);
          
          // Calculate speed as % of speed of light
          const speedFactor = Math.min(99.9, Math.sqrt(p.energy) * 8.5);
          setVelocityPercentC(parseFloat(speedFactor.toFixed(1)));
        } else if (!inGap) {
          p.crossingGap = false;
        }

        // Check if maximum orbital radius is reached, causing extraction towards target
        const maxRadius = canvas.height / 2 - 32;
        if (p.radius >= maxRadius) {
          // Extract particle straight towards target on the right
          p.x += 12;
          p.y = centerY;
          
          if (p.x >= targetX) {
            handleCollision();
          }
        }
      } else {
        // LINEAR ACCELERATOR BEAM PHYSICS
        // Accelerating sequentially down a line
        p.x = p.linacPosition;
        p.y = centerY;

        // Move forward along X axis
        const velocity = Math.sqrt(p.energy) * 1.5 + 1.2;
        p.linacPosition += velocity;

        // Gaps mapping for 6 tubes
        let currentX = 30;
        let tubeLength = 18;
        const gap = 12;
        
        for (let i = 0; i < 6; i++) {
          const gapStartX = currentX + tubeLength;
          const gapEndX = gapStartX + gap;

          // If inside gap, apply voltage boost
          if (p.x >= gapStartX && p.x <= gapEndX && !p.crossingGap) {
            p.crossingGap = true;
            const boostFactor = (voltageKV / 100) * 1.8;
            p.energy += boostFactor;
            setGapsCrossed(prev => prev + 1);
            setKineticEnergyMeV(parseFloat(p.energy.toFixed(2)));
            
            const speedFactor = Math.min(99.9, Math.sqrt(p.energy) * 11.2);
            setVelocityPercentC(parseFloat(speedFactor.toFixed(1)));
          }

          if (p.x > gapEndX) {
            p.crossingGap = false;
          }

          currentX += tubeLength + gap;
          tubeLength *= 1.45;
        }

        // Reached target?
        if (p.x >= targetX) {
          handleCollision();
        }
      }
    };

    // Trigger target hit nuclear reaction
    const handleCollision = () => {
      const p = particleStateRef.current;
      p.active = false;
      setIsAccelerating(false);
      setCollisionStatus("collision");

      // After 800ms of collision flash, synthesize isotope
      setTimeout(() => {
        setCollisionStatus("synthesized");
        setSynthesizedCount(prev => prev + 10);
        // Set radioactive activity based on accelerated energy and count
        const calculatedActivity = Math.round(10 * kineticEnergyMeV * voltageKV);
        setRemainingActivityBq(prev => prev + calculatedActivity);
      }, 900);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [acceleratorType, isPlaying, simSpeed, voltageKV, bFieldTesla, particleType, targetType, collisionStatus, kineticEnergyMeV]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 lg:p-6 shadow-xl text-slate-100">
      
      {/* LEFT COLUMN: CONTROLS (5 columns) */}
      <div className="lg:col-span-5 space-y-4">
        
        {/* Header Title */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-indigo-400 animate-pulse" />
            <div className="text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block font-mono">LAB MÔ PHỎNG</span>
              <span className="text-xs font-extrabold text-slate-100 block">Gia Tốc Hạt Máy Chiếu Xạ</span>
            </div>
          </div>
          <span className="text-[9px] font-mono font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-lg">
            Bài 25
          </span>
        </div>

        {/* SELECT ACCELERATOR TYPE */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-2">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">1. Loại máy gia tốc hạt</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setAcceleratorType("cyclotron"); handleReset(); }}
              className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all flex flex-col items-center gap-1 cursor-pointer ${
                acceleratorType === "cyclotron"
                  ? "bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Cyclotron (Vòng)</span>
            </button>
            <button
              onClick={() => { setAcceleratorType("linac"); handleReset(); }}
              className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all flex flex-col items-center gap-1 cursor-pointer ${
                acceleratorType === "linac"
                  ? "bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Linac (Thẳng)</span>
            </button>
          </div>
        </div>

        {/* PARTICLE SELECT */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-2">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">2. Hạt đạn bắn phá</span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => { setParticleType("proton"); handleReset(); }}
              className={`py-1.5 px-2 text-[10px] font-black rounded-lg border transition-all cursor-pointer ${
                particleType === "proton" ? "bg-sky-500/20 border-sky-500 text-sky-200" : "bg-slate-900 border-slate-800 text-slate-400"
              }`}
            >
              Proton (¹H⁺)
            </button>
            <button
              onClick={() => { setParticleType("deuteron"); handleReset(); }}
              className={`py-1.5 px-2 text-[10px] font-black rounded-lg border transition-all cursor-pointer ${
                particleType === "deuteron" ? "bg-emerald-500/20 border-emerald-500 text-emerald-200" : "bg-slate-900 border-slate-800 text-slate-400"
              }`}
            >
              Deuteron (²H⁺)
            </button>
            <button
              onClick={() => { setParticleType("electron"); handleReset(); }}
              className={`py-1.5 px-2 text-[10px] font-black rounded-lg border transition-all cursor-pointer ${
                particleType === "electron" ? "bg-rose-500/20 border-rose-500 text-rose-200" : "bg-slate-900 border-slate-800 text-slate-400"
              }`}
            >
              Electron (e⁻)
            </button>
          </div>
        </div>

        {/* PHYSICAL TUNING SLIDERS */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-3.5">
          <div className="flex items-center gap-1.5 border-b border-slate-850 pb-1.5">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-bold uppercase text-amber-400">Điều chỉnh thông số kỹ thuật</span>
          </div>

          {/* Voltage slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span>Hiệu điện thế tăng tốc U:</span>
              <span className="text-amber-400 font-mono font-black">{voltageKV} kV</span>
            </div>
            <input 
              type="range"
              min="10"
              max="150"
              value={voltageKV}
              onChange={(e) => setVoltageKV(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <span className="text-[8px] text-slate-500 block">Điện thế càng cao, gia tốc nhận được tại mỗi khe càng mạnh.</span>
          </div>

          {/* Magnetic Field (for Cyclotron only) */}
          {acceleratorType === "cyclotron" && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Cảm ứng từ trường B:</span>
                <span className="text-cyan-400 font-mono font-black">{bFieldTesla} T</span>
              </div>
              <input 
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={bFieldTesla}
                onChange={(e) => setBFieldTesla(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <span className="text-[8px] text-slate-500 block">Cảm ứng từ trường quyết định bán kính quỹ đạo xoắn và tần số cyclotron.</span>
            </div>
          )}

          {/* Telemetry resonant stats */}
          <div className="bg-slate-900 border border-slate-850 rounded-lg p-2 flex items-center justify-between text-[10px] font-bold font-mono">
            <span className="text-slate-400">Tần số cộng hưởng RF:</span>
            <span className="text-emerald-400 animate-pulse">{activeFrequencyMHz} MHz</span>
          </div>
        </div>

        {/* COLLISION TARGET SELECT */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-2">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">3. Lựa chọn bia va chạm ứng dụng</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setTargetType("O18"); handleReset(); }}
              className={`p-2.5 rounded-lg border transition-all text-left flex flex-col gap-1 cursor-pointer ${
                targetType === "O18" ? "bg-rose-500/10 border-rose-500/40 text-slate-100" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-1 font-bold text-[10px]">
                <SimulationNuclide a="18" z="8" element="O" />
                <span>Bia Oxi-18</span>
              </div>
              <span className="text-[8px] text-slate-400 block font-medium">Tổng hợp F-18 xạ trị chẩn đoán PET y tế.</span>
            </button>
            <button
              onClick={() => { setTargetType("Co59"); handleReset(); }}
              className={`p-2.5 rounded-lg border transition-all text-left flex flex-col gap-1 cursor-pointer ${
                targetType === "Co59" ? "bg-amber-500/10 border-amber-500/40 text-slate-100" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-1 font-bold text-[10px]">
                <SimulationNuclide a="59" z="27" element="Co" />
                <span>Bia Coban-59</span>
              </div>
              <span className="text-[8px] text-slate-400 block font-medium">Chế tạo Co-60 để chiếu xạ diệt khuẩn vải thiều.</span>
            </button>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: MAIN SCREEN & MONITOR (7 columns) */}
      <div className="lg:col-span-7 space-y-4">
        
        {/* INTERACTIVE CANVAS CONTAINER */}
        <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl overflow-hidden relative shadow-lg">
          
          {/* Accelerator Status Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold">
            <span className={`w-1.5 h-1.5 rounded-full ${isAccelerating ? "bg-emerald-500 animate-ping" : "bg-amber-500"}`} />
            <span className="text-slate-300">TRẠNG THÁI:</span>
            <span className={isAccelerating ? "text-emerald-400" : "text-amber-400"}>
              {isAccelerating ? "ĐANG GIA TỐC..." : "SẴN SÀNG KHỞI CHẠY"}
            </span>
          </div>

          <canvas 
            ref={canvasRef}
            width={480}
            height={260}
            className="w-full h-auto block"
          />

          {/* SIMULATION SPEEDS AND MAIN INJECT BUTTONS OVERLAY */}
          <div className="bg-slate-900/90 border-t border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3">
            
            {/* Speed slider & play pause */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center cursor-pointer shadow-md"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer border border-slate-700"
                title="Đặt lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Simulation speed multipliers */}
              <div className="flex bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-[9px] font-bold">
                {[1, 2, 5].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setSimSpeed(speed)}
                    className={`px-2 py-1 rounded cursor-pointer ${simSpeed === speed ? "bg-indigo-600 text-white" : "text-slate-400"}`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            {/* Injected Particle Button */}
            <button
              onClick={handleInjectParticle}
              disabled={isAccelerating}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs cursor-pointer shadow-lg hover:shadow-orange-500/20 active:scale-95 disabled:opacity-40 flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 animate-bounce" />
              BƠM HẠT TIÊU TIÊU
            </button>
          </div>
        </div>

        {/* REAL-TIME ACCELERATOR TELEMETRY DASHBOARD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 text-left">
            <span className="text-[9px] text-slate-500 block font-bold uppercase font-mono">ĐỘNG NĂNG HẠT</span>
            <span className="text-lg font-black font-mono text-amber-400 block mt-0.5">{kineticEnergyMeV} <span className="text-xs">MeV</span></span>
            <span className="text-[8px] text-slate-500 block font-medium">Bơm càng nhiều cực càng tăng.</span>
          </div>

          <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 text-left">
            <span className="text-[9px] text-slate-500 block font-bold uppercase font-mono">TỐC ĐỘ GIA TỐC</span>
            <span className="text-lg font-black font-mono text-cyan-400 block mt-0.5">{velocityPercentC}% <span className="text-xs">c</span></span>
            <span className="text-[8px] text-slate-500 block font-medium">Phần trăm tốc độ ánh sáng.</span>
          </div>

          <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 text-left">
            <span className="text-[9px] text-slate-500 block font-bold uppercase font-mono">LẦN VƯỢT CỰC</span>
            <span className="text-lg font-black font-mono text-indigo-400 block mt-0.5">{gapsCrossed} <span className="text-xs">lần</span></span>
            <span className="text-[8px] text-slate-500 block font-medium">Số khe tích lũy điện thế.</span>
          </div>

          <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 text-left">
            <span className="text-[9px] text-slate-500 block font-bold uppercase font-mono">TỐC ĐỘ PHÂN RÃ BIA</span>
            <span className="text-lg font-black font-mono text-rose-400 block mt-0.5">{decaySpeed}x <span className="text-xs">tua</span></span>
            <input 
              type="range"
              min="1"
              max="100"
              value={decaySpeed}
              onChange={(e) => setDecaySpeed(parseInt(e.target.value))}
              className="w-full h-1 mt-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
        </div>

        {/* NUCLEAR REACTION DETAILS & APPLICATION PREVIEW */}
        {collisionStatus !== "idle" && (
          <div className="bg-slate-950 border-2 border-indigo-500/30 rounded-xl p-4 space-y-3 animate-fade-in text-left">
            
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: "3s" }} />
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 font-mono block">PHẢN ỨNG HẠT NHÂN THÀNH CÔNG!</span>
                <span className="text-xs font-bold text-slate-100">Đã kích hoạt tạo dược chất / đồng vị hữu cơ phóng xạ</span>
              </div>
            </div>

            {/* Dynamic Reaction Formula equation */}
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 text-center md:text-left">
              <div>
                <span className="text-[9px] text-slate-400 font-bold block mb-1">Phương trình tổng hợp đồng vị phóng xạ:</span>
                <div className="font-mono text-xs md:text-sm font-black text-emerald-400 bg-slate-950/60 p-2 rounded border border-slate-850 shadow-inner">
                  {targetType === "O18" ? (
                    <span>
                      <SimulationNuclide a="1" z="1" element="p" /> + <SimulationNuclide a="18" z="8" element="O" /> → <SimulationNuclide a="18" z="9" element="F" /> + <SimulationNuclide a="1" z="0" element="n" /> + <span className="text-purple-400 font-black">γ</span>
                    </span>
                  ) : (
                    <span>
                      <SimulationNuclide a="2" z="1" element="H" /> + <SimulationNuclide a="59" z="27" element="Co" /> → <SimulationNuclide a="60" z="27" element="Co" /> + <SimulationNuclide a="1" z="1" element="H" /> + <span className="text-purple-400 font-black">γ</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-indigo-950/60 border border-indigo-900 px-3 py-2 rounded-lg text-xs">
                <span className="text-indigo-400 font-black block text-[10px] uppercase font-mono">HOẠT ĐỘ PHÓNG XẠ BIA</span>
                <span className="font-mono font-black text-white text-md block mt-0.5">
                  {Math.round(remainingActivityBq)} Bq
                </span>
                <span className="text-[8px] text-slate-400 block font-semibold mt-0.5">
                  Chu kỳ bán rã T: {targetType === "O18" ? "110 phút" : "5,3 năm"}
                </span>
              </div>
            </div>

            {/* Isotope Application Demonstration Card */}
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg space-y-2 text-xs">
              <span className="text-amber-400 font-black block text-[10px] uppercase font-mono">
                {targetType === "O18" ? "ỨNG DỤNG Y HỌC: CHỤP ẢNH CẮT LỚP PET" : "ỨNG DỤNG CÔNG NGHIỆP: CHIẾU XẠ QUẢ"}
              </span>
              {targetType === "O18" ? (
                <div className="flex items-start gap-2 text-slate-300 font-medium leading-relaxed">
                  <span className="w-5 h-5 bg-rose-500/10 text-rose-400 rounded-lg flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">PET</span>
                  <p>Dược chất phóng xạ <SimulationNuclide a="18" z="9" element="F" /> (FDG) sau khi gia tốc thành công sẽ được tiêm vào cơ thể bệnh nhân. Tế bào ung thư hấp thụ đường gấp nhiều lần bình thường, phát xạ ra positron gặp electron trung hòa tạo tia gamma kép giúp PET dựng hình ảnh phát hiện chính xác khối u.</p>
                </div>
              ) : (
                <div className="flex items-start gap-2 text-slate-300 font-medium leading-relaxed">
                  <span className="w-5 h-5 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">γ</span>
                  <p>Nguồn phóng xạ Coban <SimulationNuclide a="60" z="27" element="Co" /> được đặt tại phòng chiếu xạ. Quả vải thiều hoặc thanh long đặt trên băng chuyền di chuyển chậm qua chùm tia gamma. Chùm tia tiêu diệt triệt để trứng sâu nấm mốc giúp nâng cao thời gian xuất khẩu.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
