import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Flame, Info, Thermometer, ShieldCheck, Activity, Database, Clipboard, HelpCircle, Layers, CheckCircle2, ChevronRight, AlertCircle, Plus, Eye } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface SolidSubstance {
  id: string;
  name: string;
  meltingPoint: number; // °C
  lambda: number; // J/kg (heat of fusion)
  cSolid: number; // J/kg.K
  cLiquid: number; // J/kg.K
  solidColor: string;
  liquidColor: string;
  particleColor: string;
  desc: string;
}

const SUBSTANCES: SolidSubstance[] = [
  {
    id: "ice",
    name: "Nước đá (H₂O)",
    meltingPoint: 0,
    lambda: 340000, // 3.4 * 10^5 J/kg
    cSolid: 2100,
    cLiquid: 4200,
    solidColor: "rgba(186, 230, 253, 0.4)",
    liquidColor: "rgba(56, 189, 248, 0.25)",
    particleColor: "#0284c7",
    desc: "Nước đá có nhiệt nóng chảy riêng λ đặc biệt lớn do mạng liên kết hydro giữa các phân tử phân cực cực kỳ bền chặt."
  },
  {
    id: "lead",
    name: "Chì (Pb)",
    meltingPoint: 327,
    lambda: 25000, // 0.25 * 10^5 J/kg
    cSolid: 130,
    cLiquid: 140,
    solidColor: "rgba(148, 163, 184, 0.4)",
    liquidColor: "rgba(100, 116, 139, 0.3)",
    particleColor: "#64748b",
    desc: "Chì có nhiệt độ nóng chảy thấp (327°C) và nhiệt nóng chảy riêng rất nhỏ do lực liên kết mạng kim loại yếu."
  },
  {
    id: "copper",
    name: "Đồng (Cu)",
    meltingPoint: 1085,
    lambda: 180000, // 1.8 * 10^5 J/kg
    cSolid: 380,
    cLiquid: 420,
    solidColor: "rgba(251, 146, 60, 0.4)",
    liquidColor: "rgba(194, 65, 12, 0.3)",
    particleColor: "#ea580c",
    desc: "Đồng có liên kết mạng tinh thể kim loại bền vững, nhiệt độ nóng chảy cao và cần năng lượng lớn để giải phóng các nút mạng."
  },
  {
    id: "steel",
    name: "Thép (Fe-C)",
    meltingPoint: 1400,
    lambda: 270000, // 2.7 * 10^5 J/kg
    cSolid: 460,
    cLiquid: 500,
    solidColor: "rgba(124, 58, 237, 0.25)",
    liquidColor: "rgba(109, 40, 217, 0.35)",
    particleColor: "#7c3aed",
    desc: "Thép là hợp kim sắt-cacbon có cấu trúc tinh thể siêu phức tạp, cần lò nung nhiệt độ cao công nghiệp để phá vỡ liên kết cơ học."
  }
];

export default function LatentHeatSimulation() {
  const [activeMode, setActiveMode] = useState<"continuous" | "calorimeter">("continuous");

  // ==========================================
  // MODE 1: CONTINUOUS HEATING STATE variables
  // ==========================================
  const [selectedSubstance, setSelectedSubstance] = useState<SolidSubstance>(SUBSTANCES[0]);
  const [mass, setMass] = useState<number>(0.2); // kg
  const [power, setPower] = useState<number>(400); // W (Joules/sec)
  const [initialTemp, setInitialTemp] = useState<number>(-20); // °C
  
  const [temp, setTemp] = useState<number>(-20);
  const [time, setTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [phase, setPhase] = useState<"solid" | "melting" | "liquid">("solid");
  const [meltedFraction, setMeltedFraction] = useState<number>(0); // 0 to 1
  const [totalQ, setTotalQ] = useState<number>(0); // J
  
  const [history, setHistory] = useState<{ t: number; temp: number; melted: number; q: number }[]>([
    { t: 0, temp: -20, melted: 0, q: 0 }
  ]);

  // Microscopic canvas reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<{ 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    targetX: number; 
    targetY: number;
    phase: "solid" | "liquid";
  }[]>([]);

  // ==========================================
  // MODE 2: CALORIMETER MIXTURE STATE variables
  // ==========================================
  const [massWater, setMassWater] = useState<number>(200); // g, warm water
  const [tempWater, setTempWater] = useState<number>(35); // °C, warm water initial
  const [massIce, setMassIce] = useState<number>(50); // g, ice cubes at 0°C
  const [calMaterial, setCalMaterial] = useState<"aluminum" | "copper" | "ideal">("aluminum");
  
  const [calTime, setCalTime] = useState<number>(0); // s
  const [calTemp, setCalTemp] = useState<number>(35); // live temp of calorimeter
  const [calMeltedFraction, setCalMeltedFraction] = useState<number>(0); // live melt progress
  const [isCalPlaying, setIsCalPlaying] = useState<boolean>(false);
  const [calPhase, setCalPhase] = useState<"setup" | "mixing" | "equilibrium">("setup");
  const [calHistory, setCalHistory] = useState<{ t: number; temp: number; melted: number }[]>([
    { t: 0, temp: 35, melted: 0 }
  ]);
  const [loggedPoints, setLoggedPoints] = useState<{
    id: number;
    m1: number; // warm water g
    t1: number; // warm water °C
    m2: number; // ice g
    material: string;
    t_cb: number; // equilibrium °C
    lambda_exp: number; // experimental latent heat J/kg
    errorPercent: number; // %
  }[]>([]);

  const cWater = 4200; // J/kg.K
  const cIceSolid = 2100; // J/kg.K
  const lambdaIceTrue = 340000; // J/kg (3.4 * 10^5)

  // Calorimeter inner cup mass and specific heat
  const mCalorimeter = 0.08; // 80 grams cup
  const getCalorimeterC = () => {
    if (calMaterial === "aluminum") return 900; // J/kg.K
    if (calMaterial === "copper") return 385; // J/kg.K
    return 0; // Ideal, no heat capacity
  };

  // Synchronize initial temps when continuous heating substance changes
  useEffect(() => {
    if (activeMode === "continuous") {
      const startTemp = selectedSubstance.id === "ice" ? -20 : 20;
      setInitialTemp(startTemp);
      setTemp(startTemp);
      handleResetContinuous();
    }
  }, [selectedSubstance, activeMode]);

  // Set up microscopic particles in crystal lattice or liquid state for Mode 1
  useEffect(() => {
    if (activeMode !== "continuous") return;
    const particles = [];
    const rows = 6;
    const cols = 10;
    const spacingX = 14;
    const spacingY = 14;
    const startX = 15;
    const startY = 15;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const lx = startX + c * spacingX;
        const ly = startY + r * spacingY;
        particles.push({
          x: lx,
          y: ly,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          targetX: lx,
          targetY: ly,
          phase: "solid" as const
        });
      }
    }
    particlesRef.current = particles;
  }, [selectedSubstance, activeMode]);

  // Handle the simulation loop animation and canvas rendering for Mode 1
  useEffect(() => {
    if (activeMode !== "continuous") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isMounted = true;
    
    let relTemp = 0.2;
    if (phase === "solid") {
      const range = selectedSubstance.meltingPoint - initialTemp;
      const progress = range > 0 ? (temp - initialTemp) / range : 0.5;
      relTemp = 0.2 + progress * 0.8;
    } else if (phase === "melting") {
      relTemp = 1.0;
    } else {
      relTemp = 1.0 + Math.min(2.0, (temp - selectedSubstance.meltingPoint) / 100);
    }

    const render = () => {
      if (!isMounted) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw experimental crucible container
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(8, 5);
      ctx.lineTo(8, 105);
      ctx.lineTo(152, 105);
      ctx.lineTo(152, 5);
      ctx.stroke();

      // Liquid background rising based on melted fraction
      if (meltedFraction > 0) {
        ctx.fillStyle = selectedSubstance.liquidColor;
        const liquidHeight = 100 * meltedFraction;
        ctx.fillRect(9, 104 - liquidHeight, 142, liquidHeight);
      }

      // Draw the solid block shape reducing as it melts
      if (meltedFraction < 1.0) {
        ctx.fillStyle = selectedSubstance.solidColor;
        ctx.strokeStyle = "rgba(14, 165, 233, 0.2)";
        ctx.lineWidth = 1;
        const shrink = meltedFraction * 40;
        const wVal = 130 - shrink;
        const hVal = 80 - shrink;
        const x = 15 + shrink/2;
        const y = 104 - hVal;
        ctx.fillRect(x, y, wVal, hVal);
        ctx.strokeRect(x, y, wVal, hVal);
      }

      // Update and draw microscopic particles
      particlesRef.current.forEach((p, idx) => {
        const threshold = idx / particlesRef.current.length;
        const isMelted = meltedFraction > threshold;

        if (!isMelted) {
          // SOLID STATE: Vibrating around lattice point
          const amp = relTemp * 1.8;
          p.x = p.targetX + (Math.random() - 0.5) * amp;
          p.y = p.targetY + (Math.random() - 0.5) * amp;
          
          // Draw lattice bonds/springs to neighbors (right and down)
          ctx.strokeStyle = "rgba(71, 85, 105, 0.15)";
          ctx.lineWidth = 0.8;
          if ((idx + 1) % 10 !== 0) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particlesRef.current[idx + 1].x, particlesRef.current[idx + 1].y);
            ctx.stroke();
          }
          if (idx < 50) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particlesRef.current[idx + 10].x, particlesRef.current[idx + 10].y);
            ctx.stroke();
          }
        } else {
          // LIQUID STATE: Free sliding motion colliding with boundaries
          p.x += p.vx * Math.max(0.6, relTemp * 0.7);
          p.y += p.vy * Math.max(0.6, relTemp * 0.7);

          const radius = 3.5;
          const containerLeft = 12;
          const containerRight = 148;
          const liquidHeight = 25 + meltedFraction * 75;
          const containerTop = 104 - liquidHeight;
          const containerBottom = 102;

          if (p.x < containerLeft + radius) {
            p.vx = Math.abs(p.vx);
            p.x = containerLeft + radius;
          }
          if (p.x > containerRight - radius) {
            p.vx = -Math.abs(p.vx);
            p.x = containerRight - radius;
          }
          if (p.y < containerTop + radius) {
            p.vy = Math.abs(p.vy);
            p.y = containerTop + radius;
          }
          if (p.y > containerBottom - radius) {
            p.vy = -Math.abs(p.vy);
            p.y = containerBottom - radius;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, 2 * Math.PI);
        ctx.fillStyle = isMelted ? selectedSubstance.particleColor : "#94a3b8";
        ctx.fill();
        ctx.strokeStyle = isMelted ? "rgba(255,255,255,0.6)" : "rgba(15, 23, 42, 0.3)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw Heating coil under crucible
      ctx.strokeStyle = isPlaying ? "#ef4444" : "#64748b";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(25, 112);
      for (let i = 0; i < 6; i++) {
        const cx = 35 + i * 18;
        ctx.quadraticCurveTo(cx - 5, 120, cx, 112);
        ctx.quadraticCurveTo(cx + 5, 104, cx + 10, 112);
      }
      ctx.stroke();

      // Flame effect if heating
      if (isPlaying) {
        ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
        ctx.beginPath();
        ctx.ellipse(80, 115, 60, 8, 0, 0, 2 * Math.PI);
        ctx.fill();
      }

      requestAnimationFrame(render);
    };

    render();

    return () => {
      isMounted = false;
    };
  }, [temp, phase, meltedFraction, selectedSubstance, isPlaying, activeMode]);

  // Simulation timer ticking for Mode 1
  useEffect(() => {
    if (activeMode !== "continuous" || !isPlaying) return;

    const timerId = setInterval(() => {
      setTime((prevTime) => {
        const nextTime = prevTime + 1;
        const heatRate = power; // W
        const totalHeatSupplied = heatRate * nextTime;
        setTotalQ(totalHeatSupplied);

        const tempDiffToMelt = selectedSubstance.meltingPoint - initialTemp;
        const Q_toMeltingPoint = mass * selectedSubstance.cSolid * tempDiffToMelt;
        const Q_melting = mass * selectedSubstance.lambda;

        let currentTemp = temp;
        let currentMeltedFraction = meltedFraction;
        let currentPhase = phase;

        if (totalHeatSupplied <= Q_toMeltingPoint) {
          currentPhase = "solid";
          currentTemp = initialTemp + totalHeatSupplied / (mass * selectedSubstance.cSolid);
          currentMeltedFraction = 0;
        } else if (totalHeatSupplied <= Q_toMeltingPoint + Q_melting) {
          currentPhase = "melting";
          currentTemp = selectedSubstance.meltingPoint;
          const heatUsedInMelting = totalHeatSupplied - Q_toMeltingPoint;
          currentMeltedFraction = heatUsedInMelting / Q_melting;
        } else {
          currentPhase = "liquid";
          currentMeltedFraction = 1.0;
          const heatLeftOver = totalHeatSupplied - Q_toMeltingPoint - Q_melting;
          currentTemp = selectedSubstance.meltingPoint + heatLeftOver / (mass * selectedSubstance.cLiquid);
          
          const boilingCap = selectedSubstance.id === "ice" ? 100 : selectedSubstance.meltingPoint + 150;
          if (currentTemp >= boilingCap) {
            currentTemp = boilingCap;
            setIsPlaying(false);
          }
        }

        setTemp(parseFloat(currentTemp.toFixed(1)));
        setMeltedFraction(currentMeltedFraction);
        setPhase(currentPhase);

        setHistory((prev) => [
          ...prev,
          { t: nextTime, temp: parseFloat(currentTemp.toFixed(1)), melted: currentMeltedFraction, q: totalHeatSupplied }
        ]);

        return nextTime;
      });
    }, 150);

    return () => clearInterval(timerId);
  }, [isPlaying, power, mass, selectedSubstance, initialTemp, temp, meltedFraction, phase, activeMode]);

  const handleResetContinuous = () => {
    setIsPlaying(false);
    setTime(0);
    const startTemp = selectedSubstance.id === "ice" ? -20 : 20;
    setInitialTemp(startTemp);
    setTemp(startTemp);
    setMeltedFraction(0);
    setPhase("solid");
    setTotalQ(0);
    setHistory([{ t: 0, temp: startTemp, melted: 0, q: 0 }]);
  };


  // ==========================================
  // MODE 2: CALORIMETER PHYSICS TICKER
  // ==========================================
  useEffect(() => {
    if (activeMode !== "calorimeter" || !isCalPlaying) return;

    // Thermodynamic parameters
    const m_w = massWater / 1000; // kg
    const t_w = tempWater; // °C
    const m_i = massIce / 1000; // kg
    const c_cal = getCalorimeterC();
    const m_cal = mCalorimeter;

    // Combined heat capacity of water + calorimeter cup
    const C_sys = m_w * cWater + m_cal * c_cal;

    // Theoretical maximum heat warm components can release cooling to 0°C
    const Q_release_max = C_sys * t_w;

    // Total heat required to melt all ice at 0°C
    const Q_melt_all = m_i * lambdaIceTrue;

    // Calculate final true equilibrium state
    let finalTemp = 0;
    let finalMeltedFraction = 1.0;

    if (Q_release_max >= Q_melt_all) {
      // Ice melts completely, final temperature is above 0°C
      const Q_remaining = Q_release_max - Q_melt_all;
      const C_final_system = (m_w + m_i) * cWater + m_cal * c_cal;
      finalTemp = Q_remaining / C_final_system;
      finalMeltedFraction = 1.0;
    } else {
      // Warm water cooling to 0°C is not enough to melt all ice. Final temp is exactly 0°C.
      finalTemp = 0;
      finalMeltedFraction = Q_release_max / Q_melt_all;
    }

    const timerId = setInterval(() => {
      setCalTime((prevTime) => {
        const nextTime = prevTime + 1;
        const totalDuration = 25; // 25 seconds simulation time

        if (nextTime >= totalDuration) {
          setIsCalPlaying(false);
          setCalPhase("equilibrium");
          setCalTemp(parseFloat(finalTemp.toFixed(2)));
          setCalMeltedFraction(finalMeltedFraction);
          setCalHistory((prev) => [
            ...prev,
            { t: nextTime, temp: parseFloat(finalTemp.toFixed(2)), melted: finalMeltedFraction }
          ]);
          return nextTime;
        }

        // Smoothly interpolate temperature and melting fraction to simulate real mixing kinetics
        const progress = nextTime / totalDuration;
        const easeProgress = 1 - Math.pow(1 - progress, 2.5); // Fast drop then slow stabilization

        const currentTemp = t_w - (t_w - finalTemp) * easeProgress;
        const currentMelted = finalMeltedFraction * easeProgress;

        setCalTemp(parseFloat(currentTemp.toFixed(2)));
        setCalMeltedFraction(currentMelted);
        setCalPhase("mixing");

        setCalHistory((prev) => [
          ...prev,
          { t: nextTime, temp: parseFloat(currentTemp.toFixed(2)), melted: currentMelted }
        ]);

        return nextTime;
      });
    }, 120); // Faster tick for visual responsiveness

    return () => clearInterval(timerId);
  }, [isCalPlaying, massWater, tempWater, massIce, calMaterial, activeMode]);

  const handleStartCalorimeter = () => {
    setCalTime(0);
    setCalTemp(tempWater);
    setCalMeltedFraction(0);
    setCalPhase("mixing");
    setCalHistory([{ t: 0, temp: tempWater, melted: 0 }]);
    setIsCalPlaying(true);
  };

  const handleResetCalorimeter = () => {
    setIsCalPlaying(false);
    setCalTime(0);
    setCalTemp(tempWater);
    setCalMeltedFraction(0);
    setCalPhase("setup");
    setCalHistory([{ t: 0, temp: tempWater, melted: 0 }]);
  };

  // Student records the current measurement into laboratory data sheets
  const handleLogCalData = () => {
    const m_w = massWater / 1000;
    const t_w = tempWater;
    const m_i = massIce / 1000;
    const c_cal = getCalorimeterC();
    const m_cal = mCalorimeter;

    // Back-calculate the experimental lambda based on measured final equilibrium temperature
    // Formulation derived from Q_tỏa = Q_thu:
    // (m_water * c_water + m_cal * c_cal) * (t_water - t_cb) = m_ice * lambda_exp + m_ice * c_water * t_cb
    // => lambda_exp = [(m_water * c_water + m_cal * c_cal) * (t_water - t_cb) - m_ice * c_water * t_cb] / m_ice
    
    let calculatedLambda = 0;
    if (calTemp > 0) {
      calculatedLambda = (((m_w * cWater + m_cal * c_cal) * (t_w - calTemp)) - (m_i * cWater * calTemp)) / m_i;
    } else {
      // If equilibrium temperature is exactly 0°C, the ice did not melt fully
      // lambda_exp = (m_water * c_water + m_cal * c_cal) * t_water / (m_ice * meltedFraction)
      calculatedLambda = ((m_w * cWater + m_cal * c_cal) * t_w) / (m_i * calMeltedFraction);
    }

    const error = Math.abs((calculatedLambda - lambdaIceTrue) / lambdaIceTrue) * 100;

    const newPoint = {
      id: Date.now(),
      m1: massWater,
      t1: tempWater,
      m2: massIce,
      material: calMaterial === "aluminum" ? "Nhôm (80g)" : calMaterial === "copper" ? "Đồng (80g)" : "Lý tưởng (0g)",
      t_cb: calTemp,
      lambda_exp: Math.round(calculatedLambda),
      errorPercent: parseFloat(error.toFixed(2))
    };

    setLoggedPoints((prev) => [newPoint, ...prev]);
  };

  const handleClearLogs = () => {
    setLoggedPoints([]);
  };


  // ==========================================
  // SVG Chart rendering helpers
  // ==========================================
  const renderChartMode1 = () => {
    const width = 320;
    const height = 120;
    const padding = 25;
    const chartW = width - 2 * padding;
    const chartH = height - 2 * padding;

    const minT = selectedSubstance.id === "ice" ? -30 : -50;
    const maxT = selectedSubstance.id === "ice" ? 60 : selectedSubstance.meltingPoint + 100;
    const maxHistTime = Math.max(100, time);

    const getX = (t: number) => padding + (t / maxHistTime) * chartW;
    const getY = (tempVal: number) => {
      const scale = (tempVal - minT) / (maxT - minT);
      return padding + chartH - scale * chartH;
    };

    const tempDiffToMelt = selectedSubstance.meltingPoint - initialTemp;
    const Q_toMeltingPoint = mass * selectedSubstance.cSolid * tempDiffToMelt;
    const Q_melting = mass * selectedSubstance.lambda;

    const t_startMelt = Q_toMeltingPoint / power;
    const t_endMelt = (Q_toMeltingPoint + Q_melting) / power;

    // Background grids
    const gridLines = [];
    const step = (maxT - minT) / 4;
    for (let i = 0; i <= 4; i++) {
      const tempVal = minT + i * step;
      const yVal = getY(tempVal);
      gridLines.push(
        <g key={i}>
          <line x1={padding} y1={yVal} x2={width - padding} y2={yVal} stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="0.8" />
          <text x={padding - 6} y={yVal + 3} fill="#64748b" textAnchor="end" className="text-[7.5px] font-mono font-bold">
            {Math.round(tempVal)}°C
          </text>
        </g>
      );
    }

    // Build path of historical points
    let pointsPath = "";
    if (history.length > 0) {
      pointsPath = `M ${getX(history[0].t)} ${getY(history[0].temp)}`;
      for (let i = 1; i < history.length; i++) {
        pointsPath += ` L ${getX(history[i].t)} ${getY(history[i].temp)}`;
      }
    }

    return (
      <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`}>
        {/* Grids */}
        {gridLines}

        {/* Melting point threshold line */}
        <line 
          x1={padding} 
          y1={getY(selectedSubstance.meltingPoint)} 
          x2={width - padding} 
          y2={getY(selectedSubstance.meltingPoint)} 
          stroke="#f59e0b" 
          strokeWidth="1.2" 
          strokeDasharray="4 2" 
        />
        <text 
          x={width - padding - 6} 
          y={getY(selectedSubstance.meltingPoint) - 4} 
          fill="#d97706" 
          textAnchor="end" 
          className="text-[7.5px] font-bold"
        >
          t_nóng chảy ({selectedSubstance.meltingPoint}°C)
        </text>

        {/* History plot curve */}
        {history.length > 1 && (
          <path d={pointsPath} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* Current point pulsing circle */}
        <circle cx={getX(time)} cy={getY(temp)} r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="2.5" />

        {/* Shaded Phase Background Overlays */}
        {time > 0 && (
          <g opacity="0.05">
            {/* Solid region */}
            <rect 
              x={getX(0)} 
              y={padding} 
              width={Math.max(0, getX(Math.min(time, t_startMelt)) - getX(0))} 
              height={chartH} 
              fill="#c084fc" 
            />
            {/* Melting region */}
            {time > t_startMelt && (
              <rect 
                x={getX(t_startMelt)} 
                y={padding} 
                width={Math.max(0, getX(Math.min(time, t_endMelt)) - getX(t_startMelt))} 
                height={chartH} 
                fill="#f59e0b" 
              />
            )}
            {/* Liquid region */}
            {time > t_endMelt && (
              <rect 
                x={getX(t_endMelt)} 
                y={padding} 
                width={Math.max(0, getX(time) - getX(t_endMelt))} 
                height={chartH} 
                fill="#06b6d4" 
              />
            )}
          </g>
        )}

        {/* Axis labels */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#94a3b8" strokeWidth="1" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#94a3b8" strokeWidth="1" />
        <text x={width - padding} y={height - padding + 10} fill="#64748b" textAnchor="end" className="text-[7.5px] font-mono font-bold">Thời gian t (s)</text>
      </svg>
    );
  };

  const renderChartMode2 = () => {
    const width = 320;
    const height = 120;
    const padding = 25;
    const chartW = width - 2 * padding;
    const chartH = height - 2 * padding;

    const minT = -5;
    const maxT = 60;
    const maxHistTime = Math.max(25, calTime);

    const getX = (t: number) => padding + (t / maxHistTime) * chartW;
    const getY = (tempVal: number) => {
      const scale = (tempVal - minT) / (maxT - minT);
      return padding + chartH - scale * chartH;
    };

    // Horizontal grid line indicators
    const gridLines = [];
    const temperatures = [0, 15, 30, 45, 60];
    for (const tVal of temperatures) {
      const yVal = getY(tVal);
      gridLines.push(
        <g key={tVal}>
          <line x1={padding} y1={yVal} x2={width - padding} y2={yVal} stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="0.8" />
          <text x={padding - 6} y={yVal + 3} fill="#64748b" textAnchor="end" className="text-[7.5px] font-mono font-bold">
            {tVal}°C
          </text>
        </g>
      );
    }

    // Build historical path
    let pointsPath = "";
    if (calHistory.length > 0) {
      pointsPath = `M ${getX(calHistory[0].t)} ${getY(calHistory[0].temp)}`;
      for (let i = 1; i < calHistory.length; i++) {
        pointsPath += ` L ${getX(calHistory[i].t)} ${getY(calHistory[i].temp)}`;
      }
    }

    return (
      <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`}>
        {gridLines}

        {/* 0°C ice baseline */}
        <line x1={padding} y1={getY(0)} x2={width - padding} y2={getY(0)} stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 2" />
        <text x={width - padding - 6} y={getY(0) - 3} fill="#0284c7" textAnchor="end" className="text-[7px] font-bold">Đá tan ở 0°C</text>

        {/* Historical curve line */}
        {calHistory.length > 1 && (
          <path d={pointsPath} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* Live coordinate point indicator */}
        <circle cx={getX(calTime)} cy={getY(calTemp)} r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="2.5" />

        {/* Axis labels */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#94a3b8" strokeWidth="1" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#94a3b8" strokeWidth="1" />
        <text x={width - padding} y={height - padding + 10} fill="#64748b" textAnchor="end" className="text-[7.5px] font-mono font-bold">Thời gian trộn t (s)</text>
      </svg>
    );
  };


  return (
    <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-200/80 shadow-inner space-y-6">
      
      {/* EXTREMELY POLISHED MODE TOGGLE TAB */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 pl-2">
          <Layers className="h-5 w-5 text-indigo-600 animate-pulse" />
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">CẤU HÌNH THỰC NGHIỆM ĐỒNG BỘ</h4>
            <p className="text-[9.5px] text-slate-500 font-medium">Bám sát Slide lý thuyết đo lường SGK lớp 12</p>
          </div>
        </div>
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setActiveMode("continuous")}
            className={`flex-1 md:flex-initial px-4 py-2 text-[11px] font-black uppercase rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === "continuous"
                ? "bg-white text-indigo-700 shadow-sm border border-slate-150"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            1. Đường cong Nóng Chảy
          </button>
          <button
            onClick={() => setActiveMode("calorimeter")}
            className={`flex-1 md:flex-initial px-4 py-2 text-[11px] font-black uppercase rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === "calorimeter"
                ? "bg-white text-indigo-700 shadow-sm border border-slate-150"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Clipboard className="h-3.5 w-3.5" />
            2. Thí nghiệm Calorimeter
          </button>
        </div>
      </div>

      {activeMode === "continuous" ? (
        // ==========================================
        // RENDER: MODE 1 (CONTINUOUS HEATING)
        // ==========================================
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-slate-800">
          
          {/* Left Controls column */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Substance selection list */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-[10px] uppercase font-mono font-black text-indigo-600 tracking-wider block border-b border-slate-100 pb-2">
                1. CHỌN CHẤT RẮN KẾT TINH
              </span>
              <div className="grid grid-cols-2 gap-2">
                {SUBSTANCES.map((sub) => {
                  const isSel = selectedSubstance.id === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubstance(sub)}
                      disabled={isPlaying}
                      className={`px-3 py-2 text-left rounded-xl border text-[11px] font-black transition-all cursor-pointer ${
                        isSel
                          ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                      }`}
                    >
                      {sub.name}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10.5px] text-slate-500 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {selectedSubstance.desc}
              </p>
            </div>

            {/* Parameter adjusters */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <span className="text-[10px] uppercase font-mono font-black text-indigo-600 tracking-wider block border-b border-slate-100 pb-2">
                2. THIẾT LẬP THAM SỐ VẬT LÍ
              </span>
              
              {/* Mass */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-600">Khối lượng chất rắn (m):</span>
                  <span className="text-indigo-600 font-mono font-extrabold">{mass.toFixed(2)} kg ({mass * 1000} g)</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.5"
                  step="0.05"
                  disabled={isPlaying}
                  value={mass}
                  onChange={(e) => setMass(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[8.5px] font-mono font-bold text-slate-400">
                  <span>0.10 kg</span>
                  <span>0.30 kg</span>
                  <span>0.50 kg</span>
                </div>
              </div>

              {/* Heater power */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-600">Công suất bếp lò (P):</span>
                  <span className="text-rose-500 font-mono font-extrabold">{power} W (J/s)</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  disabled={isPlaying}
                  value={power}
                  onChange={(e) => setPower(parseInt(e.target.value))}
                  className="w-full accent-rose-500 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[8.5px] font-mono font-bold text-slate-400">
                  <span>100 W (Yếu)</span>
                  <span>550 W</span>
                  <span>1000 W (Mạnh)</span>
                </div>
              </div>

              {/* Physics attributes sheet */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 font-mono text-[9px] text-slate-500 leading-snug">
                <div className="flex justify-between">
                  <span>• Điểm nóng chảy t_c:</span>
                  <span className="font-bold text-slate-700">{selectedSubstance.meltingPoint}°C</span>
                </div>
                <div className="flex justify-between">
                  <span>• Nhiệt nóng chảy riêng λ:</span>
                  <span className="font-bold text-amber-600">{selectedSubstance.lambda.toLocaleString("vi-VN")} J/kg</span>
                </div>
                <div className="flex justify-between">
                  <span>• Nhiệt dung rắn (c_s):</span>
                  <span className="font-bold text-slate-700">{selectedSubstance.cSolid} J/kg.K</span>
                </div>
                <div className="flex justify-between">
                  <span>• Nhiệt dung lỏng (c_l):</span>
                  <span className="font-bold text-slate-700">{selectedSubstance.cLiquid} J/kg.K</span>
                </div>
              </div>
            </div>

            {/* Mode 1 execution buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex-1 py-3 px-4 rounded-xl font-black text-xs cursor-pointer tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md active:translate-y-0.5 ${
                  isPlaying
                    ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/10"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/10"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 fill-current" />
                    TẠM DỪNG
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" />
                    BẮT ĐẦU NUNG
                  </>
                )}
              </button>
              <button
                onClick={handleResetContinuous}
                className="px-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                title="Đặt lại từ đầu"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Middle Graphing & Telemetry column */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Graph Card */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                <span className="text-[10px] uppercase font-mono font-black text-indigo-600 tracking-wider flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5 text-indigo-600" />
                  ĐỒ THỊ THỜI GIAN - NHIỆT ĐỘ T(t)
                </span>
                <span className="text-[9px] font-mono font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 uppercase">THỂ: {phase}</span>
              </div>

              <div className="w-full h-40 bg-white rounded-xl overflow-hidden p-1 flex items-center justify-center border border-slate-100 shadow-inner">
                {renderChartMode1()}
              </div>

              {/* Color legend markers */}
              <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-mono font-bold">
                <div className={`p-1.5 rounded-lg border transition-all ${
                  phase === "solid" ? "bg-purple-50 border-purple-300 text-purple-700 font-extrabold" : "bg-slate-50 border-slate-100 text-slate-400"
                }`}>
                  1. Nung rắn
                </div>
                <div className={`p-1.5 rounded-lg border transition-all ${
                  phase === "melting" ? "bg-amber-50 border-amber-300 text-amber-700 font-extrabold" : "bg-slate-50 border-slate-100 text-slate-400"
                }`}>
                  2. Nóng chảy (0°C)
                </div>
                <div className={`p-1.5 rounded-lg border transition-all ${
                  phase === "liquid" ? "bg-cyan-50 border-cyan-300 text-cyan-700 font-extrabold" : "bg-slate-50 border-slate-100 text-slate-400"
                }`}>
                  3. Nung lỏng
                </div>
              </div>
            </div>

            {/* Telemetry panels */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase block mb-1">Nhiệt lượng đã cấp (Q):</span>
                <div className="text-sm font-black text-rose-600 font-mono">
                  {totalQ.toLocaleString("vi-VN")} J
                </div>
                <span className="text-[8.5px] font-mono text-slate-400 italic block mt-1 leading-tight border-t border-slate-50 pt-1 flex items-center gap-1 flex-wrap">
                  Công thức <FormattedMathText text="Q = P * t" />
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-[9px] font-mono text-slate-400 font-extrabold uppercase block mb-1">Mức độ hóa lỏng (%):</span>
                <div className="text-sm font-black text-amber-600 font-mono">
                  {(meltedFraction * 100).toFixed(1)}%
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1 bg-slate-900 border border-slate-200 shadow-inner">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-100" style={{ width: `${meltedFraction * 100}%` }} />
                </div>
              </div>
            </div>

            {/* Thermodynamic calculation breakdowns */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-[10.5px] space-y-2 font-medium leading-relaxed shadow-sm">
              <span className="text-[10px] uppercase font-mono font-black text-indigo-600 tracking-wider block border-b border-slate-100 pb-1.5">
                BÁO CÁO NĂNG LƯỢNG QUÁ TRÌNH
              </span>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">• Cần để tăng nhiệt rắn lên <FormattedMathText text="t_c" /> (<FormattedMathText text="Q_1" />):</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {Math.round(mass * selectedSubstance.cSolid * (selectedSubstance.meltingPoint - initialTemp)).toLocaleString("vi-VN")} J
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">• Cần để nóng chảy hoàn toàn (<FormattedMathText text="Q_2" />):</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {Math.round(mass * selectedSubstance.lambda).toLocaleString("vi-VN")} J
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-1.5">
                  <span>• Tổng năng lượng thu lý thuyết:</span>
                  <span className="font-mono text-indigo-600 font-extrabold">
                    {Math.round(mass * selectedSubstance.cSolid * (selectedSubstance.meltingPoint - initialTemp) + mass * selectedSubstance.lambda).toLocaleString("vi-VN")} J
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Microscopic Crystal Lattice column */}
          <div className="lg:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[10px] uppercase font-mono font-black text-indigo-600 tracking-wider flex items-center gap-1">
                  <Database className="h-3.5 w-3.5 text-indigo-600" />
                  MÔ PHỎNG VI MÔ HẠT
                </span>
                <p className="text-[8.5px] text-slate-500 mt-0.5 leading-snug">
                  Quan sát quá trình dãn nở, đứt gãy mạng liên kết tinh thể cố định của thể rắn sang chuyển động hỗn loạn của thể lỏng.
                </p>
              </div>

              {/* Canvas Container */}
              <div className="w-full h-36 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center p-1">
                <canvas ref={canvasRef} width="160" height="120" className="w-full h-full object-contain" />
              </div>

              <div className="space-y-1.5 text-[10.5px] font-medium leading-relaxed text-slate-600">
                <p className="font-bold text-indigo-600 border-l-2 border-indigo-500 pl-1.5 uppercase text-[9px] tracking-wider">
                  Trạng thái cấu trúc tinh thể
                </p>
                <p className="text-[10px] text-slate-500 leading-normal bg-slate-50 p-2 rounded-lg">
                  {phase === "solid" && (
                    "RẮN: Các phân tử liên kết mạnh, nằm trật tự tại nút mạng tinh thể, chỉ dao động nhỏ quanh vị trí cân bằng."
                  )}
                  {phase === "melting" && (
                    "NÓNG CHẢY: Nhận năng lượng, động năng hạt cực đại, bẻ gãy các liên kết lò xo nút mạng để giải phóng tự do."
                  )}
                  {phase === "liquid" && (
                    "LỎNG: Liên kết mạng biến mất hoàn toàn. Các phân tử tự do trượt chồng lên nhau và di chuyển linh động."
                  )}
                </p>
              </div>
            </div>

            {/* Dynamic system attributes */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mt-4 text-[10px] space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span>• Thể tích (V):</span>
                <span className="text-slate-700 font-bold">
                  {selectedSubstance.id === "ice" 
                    ? (phase === "liquid" ? "Giảm ~9% (Co lại)" : "Không đổi")
                    : (phase === "liquid" ? "Tăng ~3-5% (Nở ra)" : "Không đổi")
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span>• Thế năng (E_p):</span>
                <span className={`font-bold ${phase === "melting" ? "text-amber-600 animate-pulse" : "text-slate-600"}`}>
                  {phase === "solid" ? "Thấp (Mạng bền)" : phase === "melting" ? "Tăng vọt (Phá mạng)" : "Cao (Tự do)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>• Động năng (E_k):</span>
                <span className={`font-bold ${phase === "melting" ? "text-slate-500" : "text-indigo-600"}`}>
                  {phase === "solid" ? "Tăng dần (t tăng)" : phase === "melting" ? "Không đổi (t cố định)" : "Tăng dần (t tăng)"}
                </span>
              </div>
            </div>

          </div>

        </div>
      ) : (
        // ==========================================
        // RENDER: MODE 2 (CALORIMETER MIXING EXPERIMENT)
        // ==========================================
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-slate-800 animate-fade-in">
          
          {/* Left panel: setup inputs */}
          <div className="lg:col-span-4 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                <Thermometer className="h-5 w-5 text-indigo-600 animate-pulse" />
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">THIẾT LẬP NHIỆT LƯỢNG KẾ</h4>
              </div>

              {/* Mass of warm water m1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600">Khối lượng nước ấm m₁:</span>
                  <span className="font-mono font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{massWater} g</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="350"
                  step="10"
                  disabled={calPhase === "mixing"}
                  value={massWater}
                  onChange={(e) => setMassWater(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[8px] font-mono text-slate-400">
                  <span>100 g</span>
                  <span>225 g</span>
                  <span>350 g</span>
                </div>
              </div>

              {/* Temp of warm water t1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600">Nhiệt độ nước ấm t₁:</span>
                  <span className="font-mono font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{tempWater} °C</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="1"
                  disabled={calPhase === "mixing"}
                  value={tempWater}
                  onChange={(e) => setTempWater(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[8px] font-mono text-slate-400">
                  <span>15 °C</span>
                  <span>37 °C</span>
                  <span>60 °C</span>
                </div>
              </div>

              {/* Mass of ice cubes m2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600">Khối lượng nước đá m₂ (ở 0°C):</span>
                  <span className="font-mono font-black text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-100">{massIce} g</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  disabled={calPhase === "mixing"}
                  value={massIce}
                  onChange={(e) => setMassIce(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
                <div className="flex justify-between text-[8px] font-mono text-slate-400">
                  <span>10 g</span>
                  <span>65 g</span>
                  <span>120 g</span>
                </div>
              </div>

              {/* Calorimeter Cup material */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-600 block">Vỏ trong bình nhiệt lượng kế (m_cal = 80g):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["aluminum", "copper", "ideal"] as const).map((mat) => {
                    const isSel = calMaterial === mat;
                    let label = "Nhôm";
                    let cVal = "c=900";
                    if (mat === "copper") { label = "Đồng"; cVal = "c=385"; }
                    if (mat === "ideal") { label = "Lý tưởng"; cVal = "c=0"; }
                    
                    return (
                      <button
                        key={mat}
                        onClick={() => setCalMaterial(mat)}
                        disabled={calPhase === "mixing"}
                        className={`py-1.5 px-1 rounded-xl text-center border text-[10px] font-black cursor-pointer transition-all ${
                          isSel
                            ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        <div className="truncate">{label}</div>
                        <div className="text-[8px] font-mono opacity-80">{cVal}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Experiment controllers */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex gap-2">
                <button
                  onClick={handleStartCalorimeter}
                  disabled={isCalPlaying}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-xs cursor-pointer rounded-xl transition-all shadow-md active:translate-y-0.5 uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Tiến hành trộn đá
                </button>
                <button
                  onClick={handleResetCalorimeter}
                  className="px-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                  title="Đặt lại"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              {calPhase === "equilibrium" && (
                <button
                  onClick={handleLogCalData}
                  className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-black text-[10px] cursor-pointer rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-1"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Ghi số liệu vào báo cáo
                </button>
              )}
            </div>
          </div>

          {/* Middle panel: visual calorimeter & graph */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Visual Calorimeter Box */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 space-y-3 flex flex-col items-center">
              <span className="text-[10px] font-mono text-slate-500 font-extrabold uppercase">Sơ đồ tương tác bình Nhiệt Lượng Kế</span>
              
              <div className="w-full h-40 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center relative overflow-hidden shadow-inner">
                <svg className="w-full h-full" viewBox="0 0 180 120">
                  {/* Insulation wall */}
                  <rect x="40" y="15" width="100" height="90" fill="none" stroke="#64748b" strokeWidth="2.5" rx="5" />
                  <rect x="45" y="20" width="90" height="80" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" rx="3" />
                  
                  {/* Warm water inside */}
                  <rect x="46" y="55" width="88" height="44" fill="#38bdf8" fillOpacity="0.25" rx="2" />
                  
                  {/* Water ripples */}
                  {calPhase === "mixing" && (
                    <path d="M 46 55 Q 68 52 90 55 Q 112 58 134 55" fill="none" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3" className="animate-pulse" />
                  )}

                  {/* Stirrer (paddle moves if playing) */}
                  <g transform={`translate(${calPhase === "mixing" ? "2" : "0"}, 0)`}>
                    <line x1="75" y1="8" x2="75" y2="78" stroke="#475569" strokeWidth="2.5" />
                    <rect x="58" y="74" width="34" height="4" fill="#334155" rx="0.5" />
                    <rect x="68" y="4" width="14" height="6" fill="#334155" rx="1" />
                  </g>

                  {/* Thermometer */}
                  <rect x="115" y="10" width="6" height="82" fill="#e2e8f0" stroke="#475569" strokeWidth="0.8" rx="2" />
                  {/* Mercury column changes with calTemp */}
                  <rect x="117" y={90 - Math.min(80, calTemp * 1.3)} width="2" height={Math.min(80, calTemp * 1.3)} fill="#ef4444" />
                  <circle cx="118" cy="90" r="3.2" fill="#ef4444" />

                  {/* Ice cubes animation based on phase and time */}
                  {calPhase === "setup" && (
                    <g transform="translate(75, -5)">
                      <text x="0" y="0" fill="#0284c7" textAnchor="middle" className="text-[6.5px] font-black">NƯỚC ĐÁ 0°C</text>
                      {/* Drawing 3 floating cubes ready to drop */}
                      <rect x="-18" y="5" width="10" height="10" rx="1" fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.8" transform="rotate(10)" />
                      <rect x="5" y="3" width="11" height="11" rx="1" fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.8" transform="rotate(-15)" />
                    </g>
                  )}

                  {calPhase === "mixing" && calTime < 5 && (
                    <g transform={`translate(75, ${20 + calTime * 7})`}>
                      <rect x="-12" y="0" width="10" height="10" rx="1" fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.8" transform="rotate(25)" />
                      <rect x="4" y="-3" width="9" height="9" rx="1" fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.8" transform="rotate(-5)" />
                    </g>
                  )}

                  {calPhase === "mixing" && calTime >= 5 && calMeltedFraction < 1.0 && (
                    <g transform="translate(80, 80)">
                      {/* Shrinking ice cubes inside the water */}
                      <rect 
                        x="-15" 
                        y="0" 
                        width={Math.max(0, 10 * (1 - calMeltedFraction))} 
                        height={Math.max(0, 10 * (1 - calMeltedFraction))} 
                        rx="1" 
                        fill="#e0f2fe" 
                        stroke="#0284c7" 
                        strokeWidth="0.5" 
                        transform="rotate(12)" 
                        opacity={1 - calMeltedFraction}
                      />
                      <rect 
                        x="5" 
                        y="-4" 
                        width={Math.max(0, 9 * (1 - calMeltedFraction))} 
                        height={Math.max(0, 9 * (1 - calMeltedFraction))} 
                        rx="1" 
                        fill="#e0f2fe" 
                        stroke="#0284c7" 
                        strokeWidth="0.5" 
                        transform="rotate(-20)" 
                        opacity={1 - calMeltedFraction}
                      />
                    </g>
                  )}

                  {/* Insulated tag */}
                  <text x="50" y="32" fill="#94a3b8" className="text-[6.5px] font-mono font-bold">LỚP CHÂN KHÔNG CÁCH NHIỆT</text>
                  <text x="80" y="112" fill="#64748b" textAnchor="middle" className="text-[7px] font-black uppercase">
                    {calPhase === "setup" && "Chưa trộn"}
                    {calPhase === "mixing" && `Đang trao đổi nhiệt... (${calTime}s)`}
                    {calPhase === "equilibrium" && "Hệ đạt Cân Bằng Nhiệt"}
                  </text>
                </svg>
              </div>

              {/* Live indicators */}
              <div className="w-full grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="text-[8.5px] text-slate-400 block font-bold">Nhiệt độ T:</span>
                  <span className="text-xs font-black text-rose-600 font-mono">{calTemp.toFixed(2)} °C</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="text-[8.5px] text-slate-400 block font-bold">Đá tan chảy:</span>
                  <span className="text-xs font-black text-cyan-600 font-mono">{(calMeltedFraction * 100).toFixed(1)}%</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="text-[8.5px] text-slate-400 block font-bold">Trạng thái:</span>
                  <span className="text-[9.5px] font-black text-indigo-700 uppercase">
                    {calPhase === "setup" && "Chờ"}
                    {calPhase === "mixing" && "Khuấy"}
                    {calPhase === "equilibrium" && "Ổn định"}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Chart mixing */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-[10px] uppercase font-mono font-black text-indigo-600 tracking-wider flex items-center gap-1 border-b border-slate-100 pb-1.5">
                <Activity className="h-3.5 w-3.5 text-indigo-600" />
                ĐƯỜNG CONG HẠ NHIỆT CÂN BẰNG T(t)
              </span>
              <div className="w-full h-32 bg-white rounded-xl overflow-hidden p-1 flex items-center justify-center">
                {renderChartMode2()}
              </div>
            </div>

          </div>

          {/* Right panel: dynamic physics calculation report sheet */}
          <div className="lg:col-span-3 bg-white p-4 border border-slate-200 shadow-sm rounded-2xl flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="border-b border-slate-100 pb-2 flex items-center gap-1">
                <Clipboard className="h-4 w-4 text-indigo-600" />
                <span className="text-[10px] uppercase font-mono font-black text-indigo-600 tracking-wider">
                  BÁO CÁO THỰC NGHIỆM
                </span>
              </div>

              <div className="space-y-3 text-[11px] text-slate-600 leading-normal">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-2 font-mono text-[10px]">
                  <div className="text-slate-500 font-bold uppercase tracking-wider text-[8px] border-b border-slate-200 pb-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    1. Nhiệt lượng tỏa tối đa
                  </div>
                  <div className="flex items-center gap-1"><FormattedMathText text="Q_toa_max = C_he * t_nuoc_am" /></div>
                  <div className="text-slate-900 font-bold">
                    = {Math.round((massWater / 1000 * cWater + mCalorimeter * getCalorimeterC()) * tempWater).toLocaleString("vi-VN")} J
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-2 font-mono text-[10px]">
                  <div className="text-slate-500 font-bold uppercase tracking-wider text-[8px] border-b border-slate-200 pb-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    2. Nhiệt nóng chảy hoàn toàn
                  </div>
                  <div className="flex items-center gap-1"><FormattedMathText text="Q_thu_da = m_da * \lambda" /></div>
                  <div className="text-slate-900 font-bold">
                    = {Math.round(massIce / 1000 * lambdaIceTrue).toLocaleString("vi-VN")} J
                  </div>
                </div>

                <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-150 space-y-1 text-indigo-950 text-[10px] leading-relaxed">
                  <span className="font-extrabold uppercase text-[8.5px] text-indigo-800 tracking-wide block mb-1">Kết luận vĩ mô:</span>
                  {((massWater / 1000 * cWater + mCalorimeter * getCalorimeterC()) * tempWater) >= (massIce / 1000 * lambdaIceTrue) ? (
                    <p>
                      ✓ <strong className="inline-flex items-center gap-1"><FormattedMathText text="Q_toa_max > Q_thu_da" />:</strong> Đá tan chảy hoàn toàn! Nhiệt độ cân bằng của hệ lớn hơn 0 °C.
                    </p>
                  ) : (
                    <p className="text-amber-800">
                      ✗ <strong className="inline-flex items-center gap-1"><FormattedMathText text="Q_toa_max < Q_thu_da" />:</strong> Đá KHÔNG tan hết! Nhiệt độ cân bằng là đúng 0 °C, còn lại dư đá.
                    </p>
                  )}
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[10px] leading-snug space-y-1">
                  <span className="font-bold text-slate-700 block">Sử dụng phương trình CB nhiệt:</span>
                  <p className="italic text-slate-500 flex items-center gap-1"><FormattedMathText text="Q_thu = Q_toa" /></p>
                  <div className="font-mono text-slate-800 flex items-center gap-1 flex-wrap">
                    <FormattedMathText text="m_2 * \lambda + m_2 * c_n * t_cb = (m_1 * c_n + m_cal * c_cal) * (t_1 - t_cb)" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mt-4 text-[9.5px] font-mono leading-relaxed space-y-1">
              <div className="flex items-center gap-1">• <FormattedMathText text="m_cal * c_cal" /> = {Math.round(mCalorimeter * getCalorimeterC())} J/K</div>
              <div className="flex items-center gap-1">• <FormattedMathText text="m_1 * c_n" /> = {Math.round(massWater / 1000 * cWater)} J/K</div>
              <div className="flex items-center gap-1">• <FormattedMathText text="m_2 * c_n" /> = {Math.round(massIce / 1000 * cWater)} J/K</div>
            </div>
          </div>

        </div>
      )}

      {/* ==========================================
      // LABORATORY DATA TABLE (FOR MODE 2 RECORDINGS)
      // ========================================== */}
      {activeMode === "calorimeter" && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <span className="text-[10px] uppercase font-mono font-black text-indigo-600 tracking-wider flex items-center gap-1.5">
              <Clipboard className="h-4 w-4 text-indigo-600" />
              SỔ TAY GHI CHÉP THỰC NGHIỆM BÀI 5 (STUDENT LAB JOURNAL)
            </span>
            {loggedPoints.length > 0 && (
              <button
                onClick={handleClearLogs}
                className="text-[9.5px] font-bold text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100/50 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              >
                Xóa tất cả ghi chép
              </button>
            )}
          </div>

          {loggedPoints.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs font-medium space-y-1 border border-dashed border-slate-200 rounded-xl">
              <Clipboard className="h-8 w-8 text-slate-300 mx-auto" />
              <p>Chưa có ghi chép thực nghiệm nào.</p>
              <p className="text-[10px] text-slate-400">Hãy cấu hình tham số, nhấn &quot;Tiến hành trộn đá&quot; rồi lưu kết quả sau khi trộn xong!</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-[10.5px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <th className="p-2.5">Lần đo</th>
                    <th className="p-2.5">Nước ấm m₁ (g)</th>
                    <th className="p-2.5">Nhiệt độ t₁ (°C)</th>
                    <th className="p-2.5">Nước đá m₂ (g)</th>
                    <th className="p-2.5">Lõi bình</th>
                    <th className="p-2.5 text-center">Nhiệt độ t_cb (°C)</th>
                    <th className="p-2.5 text-right">λ tính toán (J/kg)</th>
                    <th className="p-2.5 text-center">Sai số (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loggedPoints.map((pt, idx) => (
                    <tr key={pt.id} className="hover:bg-slate-50/50 transition-all font-medium text-slate-700">
                      <td className="p-2.5 text-slate-400 font-mono">#{loggedPoints.length - idx}</td>
                      <td className="p-2.5 font-mono">{pt.m1} g</td>
                      <td className="p-2.5 font-mono">{pt.t1} °C</td>
                      <td className="p-2.5 font-mono">{pt.m2} g</td>
                      <td className="p-2.5">{pt.material}</td>
                      <td className="p-2.5 text-center font-mono font-bold text-rose-600">{pt.t_cb} °C</td>
                      <td className="p-2.5 text-right font-mono font-extrabold text-indigo-600">{pt.lambda_exp.toLocaleString("vi-VN")} J/kg</td>
                      <td className="p-2.5 text-center">
                        <span className={`px-1.5 py-0.5 rounded font-mono font-bold ${
                          pt.errorPercent < 1 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        }`}>
                          {pt.errorPercent}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-150 p-3 rounded-xl flex items-start gap-2 text-[10.5px] text-amber-900 font-medium leading-relaxed">
            <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Hướng dẫn làm thực hành:</span>
              <p>
                Từ số liệu cột <strong>t_cb</strong> đo được ở trên, các em áp dụng công thức bảo toàn năng lượng: 
                <div className="bg-white/85 px-2.5 py-1.5 rounded-xl font-bold text-amber-950 flex flex-wrap items-center gap-1 my-1.5 border border-amber-200/50">
                  <FormattedMathText text="Q_toa = Q_thu \Rightarrow (m_1 * c_n + m_cal * c_cal) * (t_1 - t_cb) = m_2 * \lambda + m_2 * c_n * t_cb" />
                </div>
                Giải tìm <span className="inline-flex items-center align-middle mx-0.5"><FormattedMathText text="\lambda" /></span> và đối chiếu với giá trị thực tế của nước đá là <span className="inline-flex items-center align-middle mx-0.5"><FormattedMathText text="3,4 * 10^5 J/kg" /></span> để tính sai số thí nghiệm. Đề thi trắc nghiệm Phần III luôn khai thác rất sâu bài tập dạng này!
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
