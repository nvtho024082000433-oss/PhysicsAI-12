import { useState, useEffect, useRef, Dispatch, SetStateAction, MouseEvent } from "react";
import { Play, Pause, RotateCcw, Flame, ArrowUpRight, ShieldCheck, Compass, Camera, BookOpen, Trash2, Download } from "lucide-react";
import { SimulationGallery } from "./SimulationGallery";

export interface Snapshot {
  id: string;
  simId: "thermal" | "gas" | "pendulum" | "incline" | "wave" | "optics";
  simName: string;
  timestamp: string;
  parameters: { label: string; value: string }[];
  notes: string;
  imageUrl: string;
}

export function VirtualExperiment({ onEarnXP }: { onEarnXP?: (amount: number, reason: string) => void }) {
  const [activeTab, setActiveTab] = useState<"thermal" | "gas" | "gallery" | "reports">("thermal");
  const [snapshots, setSnapshots] = useState<Snapshot[]>(() => {
    try {
      const saved = localStorage.getItem("lab_reports_snapshots");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleTakeSnapshot = (
    simId: "thermal" | "gas" | "pendulum" | "incline" | "wave" | "optics",
    simName: string,
    parameters: { label: string; value: string }[],
    imageUrl: string
  ) => {
    const newSnapshot: Snapshot = {
      id: Date.now().toString(),
      simId,
      simName,
      timestamp: new Date().toLocaleString("vi-VN"),
      parameters,
      notes: "",
      imageUrl
    };
    const updated = [newSnapshot, ...snapshots];
    setSnapshots(updated);
    localStorage.setItem("lab_reports_snapshots", JSON.stringify(updated));

    if (onEarnXP) {
      onEarnXP(20, `Đã chụp báo cáo thí nghiệm "${simName}" đưa vào Sổ tay`);
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-cyan-400 animate-pulse"></span>
            Phòng Thí Nghiệm Vật Lí 12 Tương Tác
          </h2>
          <p className="text-sm text-slate-400 mt-1">Điều chỉnh thông số, đo đạc dữ liệu và quan sát đồ thị thời gian thực</p>
        </div>
        <div className="flex flex-wrap gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 w-full md:w-auto">
          <button
            onClick={() => setActiveTab("thermal")}
            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === "thermal"
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Nhiệt học & Chuyển thể
          </button>
          <button
            onClick={() => setActiveTab("gas")}
            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === "gas"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Chất khí & Đẳng quá trình
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === "gallery"
                ? "bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Thư viện Mô phỏng Cơ học
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "reports"
                ? "bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Sổ tay Báo cáo ({snapshots.length})</span>
          </button>
        </div>
      </div>

      {activeTab === "thermal" ? (
        <ThermalSimulation onTakeSnapshot={handleTakeSnapshot} />
      ) : activeTab === "gas" ? (
        <GasSimulation onTakeSnapshot={handleTakeSnapshot} />
      ) : activeTab === "gallery" ? (
        <SimulationGallery onEarnXP={onEarnXP} onTakeSnapshot={handleTakeSnapshot} />
      ) : (
        <LabReports snapshots={snapshots} setSnapshots={setSnapshots} onEarnXP={onEarnXP} />
      )}
    </div>
  );
}

// ----------------------------------------
// MICROSCOPIC STATE SIMULATION CANVAS (PHYSICAL PHENOMENA OF MATTER STRUCTURE)
// ----------------------------------------
interface MolecularParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
  id: number;
  meltChance: number;
}

export function StateSimulationCanvas({ temp, isRunning }: { temp: number; isRunning: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<MolecularParticle[]>([]);

  useEffect(() => {
    const particles: MolecularParticle[] = [];
    const cols = 8;
    const rows = 5;
    const spacingX = 11;
    const spacingY = 10;
    const startX = 22;
    const startY = 65;

    let id = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ox = startX + c * spacingX;
        const oy = startY + r * spacingY;
        particles.push({
          x: ox,
          y: oy,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          originalX: ox,
          originalY: oy,
          id: id++,
          meltChance: Math.random()
        });
      }
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let localTime = 0;
    let meltingRatio = 0;

    const render = () => {
      localTime += 0.08;
      
      if (temp < 0) {
        meltingRatio = 0;
      } else if (temp === 0) {
        meltingRatio = Math.min(1, meltingRatio + 0.003);
      } else {
        meltingRatio = 1;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const width = canvas.width;
      const height = canvas.height;

      const liquidTempFactor = Math.max(0.1, temp / 100);
      const gasSpeed = 2.5 + (temp - 100) * 0.02;

      particles.forEach((p) => {
        let currentPhase: "solid" | "liquid" | "gas" = "solid";
        if (temp < 0) {
          currentPhase = "solid";
        } else if (temp === 0) {
          currentPhase = p.meltChance < meltingRatio ? "liquid" : "solid";
        } else if (temp > 0 && temp < 100) {
          currentPhase = "liquid";
        } else {
          currentPhase = p.meltChance < 0.45 ? "gas" : "liquid";
        }

        if (currentPhase === "solid") {
          const tempPercent = (temp + 20) / 20;
          const amp = Math.max(0.3, tempPercent * 1.6);
          const tx = p.originalX + Math.sin(localTime * 2 + p.id) * amp;
          const ty = p.originalY + Math.cos(localTime * 1.7 + p.id) * amp;

          p.x += (tx - p.x) * 0.35;
          p.y += (ty - p.y) * 0.35;
          p.vx = 0;
          p.vy = 0;
        } else if (currentPhase === "liquid") {
          const radius = 3.5;
          p.vy += 0.12; // Gravity attraction to bottom

          const jitterSpeed = 0.25 + liquidTempFactor * 0.55;
          p.vx += (Math.random() - 0.5) * jitterSpeed;
          p.vy += (Math.random() - 0.5) * jitterSpeed;

          const maxLiquidSpeed = 1.0 + liquidTempFactor * 1.2;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > maxLiquidSpeed) {
            p.vx = (p.vx / speed) * maxLiquidSpeed;
            p.vy = (p.vy / speed) * maxLiquidSpeed;
          }

          p.x += p.vx;
          p.y += p.vy;

          const liquidLevelY = height - 10 - (32 + (temp / 100) * 15);

          if (p.x < radius + 6) {
            p.x = radius + 6;
            p.vx *= -0.5;
          }
          if (p.x > width - radius - 6) {
            p.x = width - radius - 6;
            p.vx *= -0.5;
          }
          if (p.y > height - radius - 2) {
            p.y = height - radius - 2;
            p.vy *= -0.3;
            p.vx *= 0.85;
          }
          if (p.y < liquidLevelY) {
            p.y = liquidLevelY;
            p.vy *= -0.4;
          }
        } else if (currentPhase === "gas") {
          const radius = 3.5;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          
          if (speed === 0) {
            p.vx = (Math.random() - 0.5) * gasSpeed;
            p.vy = (Math.random() - 0.5) * gasSpeed;
          } else {
            p.vx = (p.vx / speed) * gasSpeed;
            p.vy = (p.vy / speed) * gasSpeed;
          }

          p.vx += (Math.random() - 0.5) * 0.35;
          p.vy += (Math.random() - 0.5) * 0.35;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < radius + 6) {
            p.x = radius + 6;
            p.vx *= -1;
          }
          if (p.x > width - radius - 6) {
            p.x = width - radius - 6;
            p.vx *= -1;
          }
          if (p.y < radius + 6) {
            p.y = radius + 6;
            p.vy *= -1;
          }
          if (p.y > height - radius - 2) {
            p.y = height - radius - 2;
            p.vy *= -1;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);

        if (currentPhase === "solid") {
          ctx.fillStyle = "#67e8f9"; // cyan-300
          ctx.strokeStyle = "rgba(6, 182, 212, 0.3)";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (currentPhase === "liquid") {
          ctx.fillStyle = "#22d3ee"; // cyan-400
        } else {
          ctx.fillStyle = "#2dd4bf"; // teal-400
          ctx.shadowColor = "#2dd4bf";
          ctx.shadowBlur = 3;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Show state labels
      ctx.font = "bold 8px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      if (temp < 0) {
        ctx.fillText("THỂ RẮN (ICE)", 10, 15);
        ctx.fillText("Định hình & Trật tự", 10, 24);
      } else if (temp === 0) {
        ctx.fillStyle = "#22d3ee";
        ctx.fillText("NÓNG CHẢY (MELTING)", 10, 15);
        ctx.fillText(`Phá vỡ liên kết...`, 10, 24);
      } else if (temp > 0 && temp < 100) {
        ctx.fillText("THỂ LỎNG (WATER)", 10, 15);
        ctx.fillText("Linh động, chảy được", 10, 24);
      } else {
        ctx.fillStyle = "#2dd4bf";
        ctx.fillText("THỂ KHÍ / SÔI (STEAM)", 10, 15);
        ctx.fillText("Chuyển động hỗn loạn", 10, 24);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [temp]);

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={110}
      className="absolute bottom-1 z-10 rounded-b-xl pointer-events-none"
    />
  );
}

// ----------------------------------------
// 1. THERMAL SIMULATION COMPONENT
// ----------------------------------------
export function ThermalSimulation({ onTakeSnapshot }: { onTakeSnapshot?: (simId: "thermal", simName: string, parameters: { label: string; value: string }[], imageUrl: string) => void }) {
  const [mass, setMass] = useState<number>(100); // g
  const [power, setPower] = useState<number>(200); // W
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0); // s
  const [temp, setTemp] = useState<number>(-20); // °C
  const [history, setHistory] = useState<{ t: number; temp: number }[]>([]);
  const intervalRef = useRef<any>(null);

  // Constants
  const c_ice = 2100; // J/kg.K
  const c_water = 4200; // J/kg.K
  const lambda = 3.34 * 10 ** 5; // J/kg (Nhiệt nóng chảy đá)
  const L_vapor = 2.26 * 10 ** 6; // J/kg (Nhiệt hóa hơi)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const nextTime = prevTime + 1;
          const heatEnergy = power * 1; // 1 second * power = Q (Joules)
          const mKg = mass / 1000;

          setTemp((prevTemp) => {
            let nextTemp = prevTemp;
            if (prevTemp < 0) {
              // Heating Ice
              const dT = heatEnergy / (mKg * c_ice);
              nextTemp = Math.min(0, prevTemp + dT);
            } else if (prevTemp === 0) {
              // Melting phase
              // Calculate how much energy is needed to melt the ice
              const totalMeltEnergy = lambda * mKg;
              // Accumulate energy melted so far
              const currentMeltedPercent = (prevTime * power) / totalMeltEnergy;
              if (currentMeltedPercent >= 1) {
                nextTemp = 0.1; // Finished melting, start heating water
              }
            } else if (prevTemp > 0 && prevTemp < 100) {
              // Heating Liquid
              const dT = heatEnergy / (mKg * c_water);
              nextTemp = Math.min(100, prevTemp + dT);
            } else if (prevTemp === 100) {
              // Boiling phase plateau
              // Let it simmer at 100°C
              nextTemp = 100;
            }
            
            setHistory((prevHist) => [...prevHist, { t: nextTime, temp: nextTemp }].slice(-120));
            return parseFloat(nextTemp.toFixed(1));
          });

          return nextTime;
        });
      }, 150);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, power, mass]);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setTemp(-20);
    setHistory([]);
  };

  // Determine current status state
  const getPhaseName = () => {
    if (temp < 0) return { label: "Nước đá đang tăng nhiệt", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" };
    if (temp === 0) return { label: "Đang nóng chảy (Đá sang nước)", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 animate-pulse" };
    if (temp > 0 && temp < 100) return { label: "Nước lỏng đang tăng nhiệt", color: "text-teal-400 bg-teal-500/10 border-teal-500/20" };
    return { label: "Nước đang hóa hơi (Boiling)", color: "text-red-400 bg-red-500/10 border-red-500/20 animate-pulse" };
  };

  const phase = getPhaseName();

  // Create SVG path for history
  const svgWidth = 320;
  const svgHeight = 140;
  const maxT = Math.max(120, time);
  const minTemp = -30;
  const maxTemp = 110;

  const points = history
    .map((p) => {
      const x = (p.t / maxT) * svgWidth;
      const y = svgHeight - ((p.temp - minTemp) / (maxTemp - minTemp)) * svgHeight;
      return `${x},${y}`;
    })
    .join(" ");

  const handleTakeSnapshot = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const bgGrad = ctx.createLinearGradient(0, 0, 300, 200);
      bgGrad.addColorStop(0, "#0b0f19");
      bgGrad.addColorStop(1, "#111827");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 300, 200);

      ctx.strokeStyle = "rgba(71, 85, 105, 0.15)";
      ctx.lineWidth = 1;
      for (let i = 20; i < 300; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 200);
        ctx.stroke();
      }
      for (let j = 20; j < 200; j += 20) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(300, j);
        ctx.stroke();
      }

      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(110, 40);
      ctx.lineTo(110, 160);
      ctx.lineTo(190, 160);
      ctx.lineTo(190, 40);
      ctx.stroke();

      const fillHeight = 70;
      const beakerY = 160;
      const liquidY = beakerY - fillHeight;
      const grad = ctx.createLinearGradient(0, liquidY, 0, beakerY);
      if (temp < 0) {
        grad.addColorStop(0, "rgba(103, 232, 249, 0.45)");
        grad.addColorStop(1, "rgba(6, 182, 212, 0.75)");
      } else {
        grad.addColorStop(0, "rgba(34, 211, 238, 0.55)");
        grad.addColorStop(1, "rgba(14, 116, 144, 0.85)");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(113, liquidY, 74, fillHeight);

      ctx.fillStyle = temp < 0 ? "#e2e8f0" : "#67e8f9";
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const px = 118 + (i * 17) % 64;
        const py = liquidY + 5 + (i * 23) % (fillHeight - 10);
        ctx.beginPath();
        ctx.arc(px, py, temp >= 100 ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(90, 180);
      ctx.lineTo(210, 180);
      ctx.stroke();

      const flameCount = 5;
      for (let i = 0; i < flameCount; i++) {
        const fx = 115 + i * 16;
        const fy = 178;
        ctx.fillStyle = isRunning ? "#f97316" : "#475569";
        ctx.beginPath();
        ctx.moveTo(fx - 4, fy);
        ctx.quadraticCurveTo(fx, fy - (isRunning ? 12 : 3), fx + 4, fy);
        ctx.closePath();
        ctx.fill();
      }

      ctx.font = "bold 13px sans-serif";
      ctx.fillStyle = "#22d3ee";
      ctx.fillText("BÁO CÁO NHIỆT HỌC", 15, 25);

      ctx.font = "10px monospace";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(`Khối lượng (m):  ${mass} g`, 15, 55);
      ctx.fillText(`Công suất (P):   ${power} W`, 15, 70);
      ctx.fillText(`Thời gian nung:  ${time} s`, 15, 85);
      
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = temp < 0 ? "#38bdf8" : temp >= 100 ? "#f87171" : "#34d399";
      ctx.fillText(`Nhiệt độ: ${temp} °C`, 15, 120);

      ctx.font = "9px sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText(phase.label, 15, 140);
    }
    const url = canvas.toDataURL("image/png");
    if (onTakeSnapshot) {
      onTakeSnapshot(
        "thermal",
        "Nhiệt lượng & Chuyển thể",
        [
          { label: "Khối lượng nước đá (m)", value: `${mass} g` },
          { label: "Công suất dây nung (P)", value: `${power} W` },
          { label: "Thời gian đun (t)", value: `${time} giây` },
          { label: "Nhiệt độ đo được", value: `${temp} °C` },
          { label: "Trạng thái", value: phase.label }
        ],
        url
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Control panel */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
        <div className="space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3">
            <Flame className="text-cyan-400 h-5 w-5 animate-bounce" />
            <h3 className="text-md font-medium text-slate-100">Bảng Điều Khiển Hệ Thống</h3>
          </div>

          {/* Mass input slider */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Khối lượng nước đá (m)</span>
              <span className="text-cyan-400 font-bold">{mass} gam</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={mass}
              disabled={isRunning}
              onChange={(e) => setMass(Number(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer disabled:opacity-40"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>50g</span>
              <span>500g</span>
            </div>
          </div>

          {/* Power heating input slider */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Công suất dây nung (P)</span>
              <span className="text-amber-400 font-bold">{power} W (J/s)</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={power}
              disabled={isRunning}
              onChange={(e) => setPower(Number(e.target.value))}
              className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer disabled:opacity-40"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>50W</span>
              <span>500W</span>
            </div>
          </div>

          {/* Core metrics */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-3 text-center">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Nhiệt độ đo được</span>
              <span className={`text-2xl font-bold font-mono tracking-tight mt-1 block ${temp < 0 ? "text-cyan-400" : temp >= 100 ? "text-red-400" : "text-emerald-400"}`}>
                {temp} °C
              </span>
            </div>
            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-3 text-center">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Thời gian đun</span>
              <span className="text-2xl font-bold text-slate-200 font-mono tracking-tight mt-1 block">
                {time} giây
              </span>
            </div>
          </div>

          {/* Interactive Phase Indicator */}
          <div className={`p-3 rounded-xl border text-xs font-medium text-center ${phase.color}`}>
            Trạng thái: {phase.label}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isRunning
                ? "bg-slate-800 text-red-400 border border-red-500/20 hover:bg-slate-800/80"
                : "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-lg shadow-cyan-400/20"
            }`}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isRunning ? "Tạm Dừng" : "Bắt Đầu Nung"}
          </button>
          <button
            onClick={handleReset}
            className="p-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors"
            title="Khởi tạo lại"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleTakeSnapshot}
            className="p-3 bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold"
            title="Chụp ảnh thí nghiệm đưa vào Sổ tay"
          >
            <Camera className="h-4 w-4 text-cyan-400" />
            <span>Chụp Báo Cáo</span>
          </button>
        </div>
      </div>

      {/* Animation & Live chart */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        {/* Visual Animation Box */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between h-48 relative overflow-hidden">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Mô hình vật chất ảo</span>
          
          {/* Beaker representation */}
          <div className="mx-auto w-32 h-32 border-4 border-slate-600 border-t-0 rounded-b-xl relative flex items-end justify-center bg-slate-900/30 overflow-hidden shadow-inner mt-2">
            
            {/* Heat source flame */}
            <div className={`absolute -bottom-1 left-0 right-0 h-4 bg-gradient-to-t from-red-600 via-amber-400 to-transparent flex justify-center items-end gap-1 transition-opacity duration-300 ${isRunning ? "opacity-100" : "opacity-20"}`}>
              <div className="w-2 h-4 bg-red-500 rounded-full animate-bounce delay-75"></div>
              <div className="w-2.5 h-6 bg-amber-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-5 bg-orange-500 rounded-full animate-bounce delay-150"></div>
            </div>

            {/* Simulated Microscopic Material State */}
            <StateSimulationCanvas temp={temp} isRunning={isRunning} />
          </div>
          <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-500">
            Hộp mô phỏng 12-Thermal
          </div>
        </div>

        {/* Live Chart Box */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between h-48">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">Đồ thị nhiệt độ - thời gian T(t)</span>
          
          <div className="w-full h-full relative border-l border-b border-slate-800 flex items-end">
            {/* Grid helper lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-t border-slate-900 text-[8px] text-slate-600 text-right pr-2">100°C - Sôi</div>
              <div className="w-full border-t border-slate-900 text-[8px] text-slate-600 text-right pr-2">0°C - Nóng chảy</div>
              <div className="w-full border-t border-slate-900 text-[8px] text-slate-600 text-right pr-2">-20°C - Đá</div>
            </div>

            {/* SVG Live plot */}
            <svg className="w-full h-full overflow-visible z-10" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
              {points && (
                <polyline
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="3.5"
                  points={points}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>
          <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
            <span>0s</span>
            <span>Thời gian đun t(s) →</span>
            <span>{maxT}s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------
// 2. GAS LAWS SIMULATION COMPONENT
// ----------------------------------------
function GasSimulation({ onTakeSnapshot }: { onTakeSnapshot?: (simId: "gas", simName: string, parameters: { label: string; value: string }[], imageUrl: string) => void }) {
  const [vol, setVol] = useState<number>(4); // L (Thể tích, tương ứng với độ dài piston)
  const [temp, setTemp] = useState<number>(300); // K (Nhiệt độ)
  const [processType, setProcessType] = useState<"isothermal" | "isochoric">("isothermal"); // Đẳng nhiệt / Đẳng tích
  const [history, setHistory] = useState<{ v: number; p: number; t: number }[]>([]);

  // Constant: n.R factor for simulation
  const nR = 1200; 

  // Compute Pressure: p = nRT / V
  const press = parseFloat(((nR * temp) / (vol * 1000)).toFixed(2)); // atm

  // Keep history for plotting
  useEffect(() => {
    setHistory((prev) => [...prev, { v: vol, p: press, t: temp }].slice(-50));
  }, [vol, temp, press]);

  const handleReset = () => {
    setVol(4);
    setTemp(300);
    setHistory([]);
  };

  // SVG dimensions for P-V curve
  const svgWidth = 320;
  const svgHeight = 140;
  const maxV = 8;
  const maxP = 2.5;

  const points = history
    .map((item) => {
      const x = (item.v / maxV) * svgWidth;
      const y = svgHeight - (item.p / maxP) * svgHeight;
      return `${x},${y}`;
    })
    .join(" ");

  const handleTakeSnapshot = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const bgGrad = ctx.createLinearGradient(0, 0, 300, 200);
      bgGrad.addColorStop(0, "#080c14");
      bgGrad.addColorStop(1, "#0f172a");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 300, 200);

      ctx.strokeStyle = "rgba(71, 85, 105, 0.12)";
      ctx.lineWidth = 1;
      for (let i = 20; i < 300; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 200);
        ctx.stroke();
      }
      for (let j = 20; j < 200; j += 20) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(300, j);
        ctx.stroke();
      }

      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(110, 40);
      ctx.lineTo(110, 160);
      ctx.lineTo(190, 160);
      ctx.lineTo(190, 40);
      ctx.stroke();

      const bottomY = 160;
      const cylinderHeight = 110;
      const volHeight = (vol / 8) * cylinderHeight;
      const lidY = bottomY - volHeight;

      const lidGrad = ctx.createLinearGradient(110, 0, 190, 0);
      lidGrad.addColorStop(0, "#94a3b8");
      lidGrad.addColorStop(0.5, "#cbd5e1");
      lidGrad.addColorStop(1, "#64748b");
      ctx.fillStyle = lidGrad;
      ctx.fillRect(112, lidY - 8, 76, 8);

      ctx.fillStyle = "#475569";
      ctx.fillRect(146, lidY - 40, 8, 32);

      ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
      ctx.fillRect(112, lidY, 76, volHeight);

      ctx.fillStyle = "#fbbf24";
      const particleCount = 12;
      for (let i = 0; i < particleCount; i++) {
        const px = 118 + (i * 19) % 60;
        const py = lidY + 4 + (i * 13) % (volHeight - 8);
        if (py < bottomY - 3) {
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.font = "bold 13px sans-serif";
      ctx.fillStyle = "#fb7185";
      ctx.fillText("BÁO CÁO THUYẾT KHÍ", 15, 25);

      ctx.font = "10px monospace";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(`Quá trình:  ${processType === "isothermal" ? "Đẳng nhiệt" : "Đẳng tích"}`, 15, 55);
      ctx.fillText(`Thể tích (V): ${vol} L`, 15, 70);
      ctx.fillText(`Nhiệt độ (T): ${temp} K`, 15, 85);
      
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "#fb923c";
      ctx.fillText(`Áp suất (p): ${press} atm`, 15, 120);

      ctx.font = "9px sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText(`Áp suất tỉ lệ thuận với nRT/V`, 15, 140);
    }
    const url = canvas.toDataURL("image/png");
    if (onTakeSnapshot) {
      onTakeSnapshot(
        "gas",
        "Định luật chất khí",
        [
          { label: "Loại đẳng quá trình", value: processType === "isothermal" ? "Đẳng nhiệt" : "Đẳng tích" },
          { label: "Thể tích khí (V)", value: `${vol} Lít` },
          { label: "Nhiệt độ khí (T)", value: `${temp} K` },
          { label: "Áp suất tính toán (p)", value: `${press} atm` }
        ],
        url
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Control panel */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-5 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3">
            <ShieldCheck className="text-amber-400 h-5 w-5 animate-pulse" />
            <h3 className="text-md font-medium text-slate-100">Bảng Thử Nghiệm Đẳng Quá Trình</h3>
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setProcessType("isothermal");
                setTemp(300); // Lock T
              }}
              className={`py-1.5 text-[10px] font-bold rounded-lg transition-colors ${
                processType === "isothermal" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "text-slate-400"
              }`}
            >
              Đẳng nhiệt (T = hằng số)
            </button>
            <button
              onClick={() => {
                setProcessType("isochoric");
                setVol(4); // Lock V
              }}
              className={`py-1.5 text-[10px] font-bold rounded-lg transition-colors ${
                processType === "isochoric" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "text-slate-400"
              }`}
            >
              Đẳng tích (V = hằng số)
            </button>
          </div>

          {/* Volume slider */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Thể tích khí (V)</span>
              <span className={`font-bold ${processType === "isochoric" ? "text-slate-500" : "text-amber-400"}`}>{vol} Lít</span>
            </div>
            <input
              type="range"
              min="2"
              max="8"
              step="0.5"
              value={vol}
              disabled={processType === "isochoric"}
              onChange={(e) => setVol(parseFloat(e.target.value))}
              className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer disabled:opacity-30"
            />
            <div className="flex justify-between text-[9px] text-slate-500 mt-1">
              <span>2L (Nén cao)</span>
              <span>8L (Dãn nở)</span>
            </div>
          </div>

          {/* Temperature slider */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Nhiệt độ tuyệt đối (T)</span>
              <span className="text-amber-400 font-bold">{temp} K ({Math.round(temp - 273.15)}°C)</span>
            </div>
            <input
              type="range"
              min="200"
              max="450"
              step="10"
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full accent-orange-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 mt-1">
              <span>200 K (Mát)</span>
              <span>450 K (Nóng)</span>
            </div>
          </div>

          {/* State Indicator */}
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold mb-1">Áp suất tính toán (p = nRT/V)</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-mono font-bold text-amber-400">{press}</span>
              <span className="text-sm font-semibold text-slate-400">atm</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex-1 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white text-slate-400 rounded-xl transition-colors text-xs font-semibold"
          >
            Reset Đồ Thị
          </button>
          <button
            onClick={handleTakeSnapshot}
            className="py-2.5 px-3 bg-slate-900 border border-slate-800 text-amber-400 hover:text-amber-300 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold"
            title="Chụp ảnh trạng thái khí nén đưa vào Sổ tay"
          >
            <Camera className="h-4 w-4 text-amber-400" />
            <span>Chụp Báo Cáo</span>
          </button>
        </div>
      </div>

      {/* Animation cylinders & curves */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        {/* visual gas piston cylinder */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between h-48 relative overflow-hidden">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Xylanh khí nén (Harmonic)</span>

          <div className="mx-auto w-36 h-36 border-4 border-slate-500 rounded-b-lg relative flex flex-col justify-end bg-slate-900/40">
            {/* Piston Lid - Moves up and down based on volume */}
            <div
              className="absolute left-0 right-0 h-4 bg-gradient-to-r from-slate-400 to-slate-200 border-b-2 border-slate-600 flex justify-center items-center z-20 shadow-md"
              style={{ bottom: `${(vol / 8) * 110}px` }}
            >
              {/* Piston shaft */}
              <div className="absolute bottom-4 w-3.5 h-16 bg-slate-500 border-l border-r border-slate-300"></div>
            </div>

            {/* Cylinder Chamber content (Gas particles) */}
            <div
              className="w-full bg-amber-500/5 relative overflow-hidden flex items-center justify-center transition-all duration-150"
              style={{ height: `${(vol / 8) * 110}px` }}
            >
              {/* Simulated bouncing particles inside */}
              <div className="absolute inset-0 p-2">
                <div className="absolute w-2 h-2 bg-amber-400 rounded-full animate-bounce top-2 left-6" style={{ animationDuration: `${temp < 300 ? 1.5 : 0.6}s` }}></div>
                <div className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce bottom-3 right-4" style={{ animationDuration: `${temp < 300 ? 1.2 : 0.5}s` }}></div>
                <div className="absolute w-2 h-2 bg-amber-300 rounded-full animate-bounce top-10 right-10" style={{ animationDuration: `${temp < 300 ? 1.8 : 0.7}s` }}></div>
                <div className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce bottom-6 left-12" style={{ animationDuration: `${temp < 300 ? 1.0 : 0.4}s` }}></div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-2 right-2 text-[9px] font-mono text-slate-500">
            Tỉ lệ Thể tích V ∝ {vol} Lít
          </div>
        </div>

        {/* Live curve plotting */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between h-48">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">Đồ thị Áp suất - Thể tích p(V)</span>
          
          <div className="w-full h-full relative border-l border-b border-slate-800 flex items-end">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-t border-slate-900 text-[8px] text-slate-600 text-right pr-2">2.5 atm</div>
              <div className="w-full border-t border-slate-900 text-[8px] text-slate-600 text-right pr-2">1.2 atm</div>
              <div className="w-full border-t border-slate-900 text-[8px] text-slate-600 text-right pr-2">0.5 atm</div>
            </div>

            {/* Plot SVG */}
            <svg className="w-full h-full overflow-visible z-10" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
              {points && (
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                  points={points}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>
          <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
            <span>2L</span>
            <span>Thể tích khí V (Lít) →</span>
            <span>8L</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LabReportsProps {
  snapshots: Snapshot[];
  setSnapshots: Dispatch<SetStateAction<Snapshot[]>>;
  onEarnXP?: (amount: number, reason: string) => void;
}

export function LabReports({ snapshots, setSnapshots, onEarnXP }: LabReportsProps) {
  const [selectedSnapshot, setSelectedSnapshot] = useState<Snapshot | null>(null);

  const handleDelete = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa báo cáo này?");
    if (!confirmed) return;

    const updated = snapshots.filter((s) => s.id !== id);
    setSnapshots(updated);
    localStorage.setItem("lab_reports_snapshots", JSON.stringify(updated));
    if (selectedSnapshot?.id === id) {
      setSelectedSnapshot(null);
    }
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    const updated = snapshots.map((s) => (s.id === id ? { ...s, notes } : s));
    setSnapshots(updated);
    localStorage.setItem("lab_reports_snapshots", JSON.stringify(updated));
    if (selectedSnapshot && selectedSnapshot.id === id) {
      setSelectedSnapshot({ ...selectedSnapshot, notes });
    }
  };

  const handleDownload = (snapshot: Snapshot) => {
    const link = document.createElement("a");
    link.href = snapshot.imageUrl;
    link.download = `baocao_vli12_${snapshot.simId}_${snapshot.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onEarnXP) {
      onEarnXP(10, `Tải xuống thành công hình ảnh báo cáo "${snapshot.simName}"`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview stats header */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="text-rose-400 h-5 w-5" />
            Sổ tay Báo cáo Thí nghiệm Cá nhân
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Lưu giữ các biểu đồ dữ liệu thực hành của học sinh, viết ghi chú và phân tích kết luận STEM.
          </p>
        </div>
        <div className="flex gap-4 text-xs font-mono">
          <div className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-center">
            <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Đã chụp</span>
            <span className="text-rose-400 font-bold text-lg">{snapshots.length}</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-center">
            <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Hoạt động</span>
            <span className="text-emerald-400 font-bold text-lg">STEM</span>
          </div>
        </div>
      </div>

      {snapshots.length === 0 ? (
        <div className="bg-slate-950/40 border border-dashed border-slate-800 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="mx-auto w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800">
            <Camera className="text-slate-600 h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-slate-300">Sổ tay hiện tại đang trống</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Hãy chuyển qua các tab thí nghiệm Nhiệt học, Thuyết khí nén hoặc Thư viện cơ học và nhấn nút 
              <span className="mx-1 text-rose-400 inline-flex items-center gap-0.5 border border-rose-500/10 px-1 bg-rose-500/5 rounded font-mono font-bold">
                <Camera className="h-3 w-3 inline" /> Chụp Báo Cáo
              </span> 
              để ghi lại các biểu đồ đồ thị quan trọng!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Snapshots Sidebar List */}
          <div className="lg:col-span-5 space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {snapshots.map((snap) => {
              const isSelected = selectedSnapshot?.id === snap.id;
              return (
                <div
                  key={snap.id}
                  onClick={() => setSelectedSnapshot(snap)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-4 ${
                    isSelected
                      ? "bg-slate-800/80 border-rose-500/40 shadow-lg shadow-rose-500/5"
                      : "bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40"
                  }`}
                >
                  <div className="w-20 h-16 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shrink-0 relative">
                    <img
                      src={snap.imageUrl}
                      alt={snap.simName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-bold text-slate-200 truncate">{snap.simName}</h4>
                        <button
                          onClick={(e) => handleDelete(snap.id, e)}
                          className="text-slate-500 hover:text-red-400 p-0.5 rounded transition-colors"
                          title="Xóa báo cáo"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{snap.timestamp}</p>
                    </div>
                    {snap.notes ? (
                      <p className="text-[10.5px] text-rose-300 truncate mt-1 italic">
                        📝 {snap.notes}
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-600 mt-1">Chưa có kết luận báo cáo...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Report Detail Panel */}
          <div className="lg:col-span-7">
            {selectedSnapshot ? (
              <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedSnapshot.simName}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Mã số báo cáo: STEM-{selectedSnapshot.id}</p>
                  </div>
                  <button
                    onClick={() => handleDownload(selectedSnapshot)}
                    className="py-1.5 px-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5 text-rose-400" />
                    <span>Tải ảnh về máy</span>
                  </button>
                </div>

                {/* Main Captured Canvas Image Preview */}
                <div className="border border-slate-800 bg-slate-900 rounded-xl overflow-hidden relative max-w-sm mx-auto">
                  <img
                    src={selectedSnapshot.imageUrl}
                    alt={selectedSnapshot.simName}
                    className="w-full h-auto object-contain mx-auto"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-slate-950/80 border border-slate-800/80 rounded px-1.5 py-0.5 text-[8.5px] font-mono text-rose-400">
                    STEM Lab State Captured
                  </div>
                </div>

                {/* Parameters Breakdown */}
                <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-bold">
                    Thông số trạng thái thí nghiệm lúc chụp:
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                    {selectedSnapshot.parameters.map((param, idx) => (
                      <div key={idx} className="flex justify-between border-b border-slate-800/40 pb-1">
                        <span className="text-slate-400">{param.label}:</span>
                        <span className="text-rose-400 font-bold">{param.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes/Conclusions Textarea */}
                <div className="space-y-2">
                  <label className="text-[11px] text-slate-400 block font-semibold flex items-center gap-1">
                    <span>Kết luận của học sinh (Báo cáo thực hành STEM):</span>
                    <span className="text-[10px] text-slate-500 font-normal italic">(Tự động sao lưu)</span>
                  </label>
                  <textarea
                    value={selectedSnapshot.notes}
                    onChange={(e) => handleUpdateNotes(selectedSnapshot.id, e.target.value)}
                    placeholder="Ghi lại các nhận xét, mô tả hiện tượng, mối liên hệ giữa các thông số vật lý bạn quan sát được tại đây..."
                    className="w-full h-24 bg-slate-950 border border-slate-800 focus:border-rose-500/50 rounded-xl p-3 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-rose-500/20 resize-none transition-all"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-slate-950/20 border border-dashed border-slate-800 rounded-2xl p-16 text-center flex flex-col items-center justify-center h-full min-h-[350px]">
                <BookOpen className="text-slate-700 h-10 w-10 mb-2" />
                <p className="text-xs text-slate-400">Chọn một báo cáo từ danh sách bên trái để xem chi tiết</p>
                <p className="text-[10px] text-slate-600 mt-1 max-w-xs">
                  Bạn có thể viết nhận xét học tập và tải xuống hình ảnh báo cáo để nộp cho thầy cô giáo.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
