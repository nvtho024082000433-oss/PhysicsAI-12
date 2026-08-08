import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Flame, Sparkles, Gauge, ArrowRight, Info, Zap, Thermometer, Compass, Layers } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function InternalEnergySimulation() {
  // Physical states
  const [vol, setVol] = useState<number>(2.0); // Liters (1.0 to 3.0)
  const [temp, setTemp] = useState<number>(300); // Kelvin (100 to 600)
  const [pressure, setPressure] = useState<number>(1.23); // atm
  
  // Thermodynamic variables for energy calculations
  // Let initial U_0 = 225 J (at T_0 = 300K, where U = 0.75 * T)
  const U_initial = 225;
  const [heatQ, setHeatQ] = useState<number>(0); // Accumulated heat exchange in Joules
  const [workA, setWorkA] = useState<number>(0); // Accumulated work done in Joules
  
  // Burner / Cooling state
  const [burnerState, setBurnerState] = useState<"off" | "heat" | "cool">("off");
  
  // Interactive control flags
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<string>("manual");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Ideal Gas simulation constants
  const nR = 0.5; // Constant n*R in J/K for energy conversion

  // 1. Calculate pressure and internal energy based on physical state
  // Ideal Gas law: p = nRT / V
  useEffect(() => {
    // scale to get realistic pressure (atm)
    const p = parseFloat(((nR * temp) / vol).toFixed(2));
    setPressure(p);
  }, [vol, temp]);

  // 2. Initialize particles
  useEffect(() => {
    const particles: Particle[] = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * 180 + 10,
        y: Math.random() * 100 + 40,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: 3.5 + Math.random() * 1.5,
        color: i % 2 === 0 ? "#f59e0b" : "#ef4444"
      });
    }
    particlesRef.current = particles;
  }, []);

  // 3. Dynamic Heat & Piston adjustment loops
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // 3a. Heat Q exchange from burner/ice pack
      if (burnerState === "heat") {
        setHeatQ((prev) => prev + 4);
        setTemp((prev) => {
          const next = Math.min(600, prev + 5);
          return next;
        });
      } else if (burnerState === "cool") {
        setHeatQ((prev) => prev - 4);
        setTemp((prev) => {
          const next = Math.max(100, prev - 5);
          return next;
        });
      }

      // 3b. Automatic presets animators
      if (activePreset === "isochoric_heating") {
        // Piston locked (V = constant), Bunsen burner heating (Q > 0)
        setBurnerState("heat");
        if (temp >= 550) {
          setActivePreset("manual");
          setBurnerState("off");
        }
      } else if (activePreset === "adiabatic_compression") {
        // No heat exchange (Q = 0), rapid compression (V decreases, Work A > 0 done on gas)
        setBurnerState("off");
        if (vol > 1.1) {
          setVol((prev) => parseFloat((prev - 0.05).toFixed(2)));
          setWorkA((prev) => prev + 12);
          setTemp((prev) => Math.min(600, prev + 16));
        } else {
          setActivePreset("manual");
        }
      } else if (activePreset === "adiabatic_expansion") {
        // No heat exchange (Q = 0), rapid expansion (V increases, Gas performs work A < 0)
        setBurnerState("off");
        if (vol < 2.9) {
          setVol((prev) => parseFloat((prev + 0.05).toFixed(2)));
          setWorkA((prev) => prev - 12);
          setTemp((prev) => Math.max(100, prev - 16));
        } else {
          setActivePreset("manual");
        }
      } else if (activePreset === "isothermal_expansion") {
        // Gas expands (V increases, A < 0) but heat is added (Q > 0) so T remains CONSTANT
        setBurnerState("off");
        if (vol < 2.9) {
          setVol((prev) => parseFloat((prev + 0.04).toFixed(2)));
          setWorkA((prev) => prev - 10);
          setHeatQ((prev) => prev + 10);
          // T stays constant
        } else {
          setActivePreset("manual");
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [burnerState, isRunning, activePreset, temp, vol]);

  // 4. Canvas Animator for Gas Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Draw Cylinder background
      ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
      ctx.fillRect(15, 20, w - 30, h - 30);

      // Draw Grid / Thermal background reflection matching temp
      // 100K (glacier blue) to 600K (hot amber/red)
      const redRatio = Math.max(0, (temp - 100) / 500);
      const blueRatio = 1 - redRatio;
      ctx.fillStyle = `rgba(${Math.round(redRatio * 150 + 15)}, ${Math.round(redRatio * 50 + 23)}, ${Math.round(blueRatio * 120 + 35)}, 0.12)`;
      ctx.fillRect(15, 20, w - 30, h - 30);

      // Piston height in canvas (piston position moves based on volume)
      // V = 1.0 (highest piston, bottom = 40px)
      // V = 3.0 (lowest piston, bottom = 120px)
      // Height of chamber from bottom (h - 20)
      const chamberBottom = h - 15;
      const chamberTop = 20;
      const maxChamberHeight = chamberBottom - chamberTop;
      
      // Volume scales chamber height from 35% (V=1.0) to 90% (V=3.0)
      const chamberHeight = maxChamberHeight * (0.3 + (vol - 1) * 0.3);
      const pistonY = chamberBottom - chamberHeight;

      // Draw Heat Waves if burner on
      if (burnerState === "heat") {
        ctx.fillStyle = "rgba(239, 68, 68, 0.25)";
        for (let i = 0; i < 5; i++) {
          const waveX = 30 + i * 35 + Math.sin(Date.now() * 0.01 + i) * 5;
          const waveY = chamberBottom - 5 - (Math.sin(Date.now() * 0.005 + i) * 10);
          ctx.beginPath();
          ctx.arc(waveX, waveY, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (burnerState === "cool") {
        ctx.fillStyle = "rgba(59, 130, 246, 0.25)";
        for (let i = 0; i < 5; i++) {
          const waveX = 30 + i * 35 + Math.cos(Date.now() * 0.01 + i) * 5;
          const waveY = chamberBottom - 5;
          ctx.beginPath();
          ctx.fillRect(waveX - 8, waveY - 4, 16, 8);
        }
      }

      // Draw gas molecules
      const particles = particlesRef.current;
      // Molecular speed proportional to square root of Kelvin temperature
      const speedFactor = Math.sqrt(temp / 300) * 1.4;

      particles.forEach((p) => {
        if (isRunning) {
          // Update particle position
          p.x += p.vx * speedFactor;
          p.y += p.vy * speedFactor;

          // Boundary checks inside cylinder space
          // Left/Right walls
          if (p.x < 15 + p.radius) {
            p.x = 15 + p.radius;
            p.vx = -p.vx;
          } else if (p.x > w - 15 - p.radius) {
            p.x = w - 15 - p.radius;
            p.vx = -p.vx;
          }

          // Bottom wall
          if (p.y > chamberBottom - p.radius) {
            p.y = chamberBottom - p.radius;
            p.vy = -p.vy;
          }

          // Piston roof (moves dynamically)
          if (p.y < pistonY + p.radius + 12) {
            p.y = pistonY + p.radius + 12;
            p.vy = Math.abs(p.vy); // Bounce down
          }
        }

        // Particle color based on velocity and temp
        const isHot = temp > 350;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Heat color transition
        const hue = isHot ? 0 : 210; // Red to blue
        const lit = 50 + Math.floor(Math.random() * 20);
        ctx.fillStyle = `hsl(${hue}, 90%, ${lit}%)`;
        ctx.shadowBlur = isHot ? 4 : 0;
        ctx.shadowColor = `hsl(${hue}, 90%, 50%)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw Piston shaft & plate
      ctx.fillStyle = "rgba(100, 116, 139, 0.9)"; // slate-500
      ctx.fillRect(15, pistonY, w - 30, 12); // Piston plate

      // Metallic outline for plate
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(15, pistonY, w - 30, 12);

      // Piston rod
      ctx.fillStyle = "rgba(148, 163, 184, 1)";
      ctx.fillRect(w / 2 - 8, 5, 16, pistonY - 5);
      ctx.strokeRect(w / 2 - 8, 5, 16, pistonY - 5);

      // Cylinder outer metal borders
      ctx.strokeStyle = "#475569"; // slate-600
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(15, 10);
      ctx.lineTo(15, chamberBottom);
      ctx.lineTo(w - 15, chamberBottom);
      ctx.lineTo(w - 15, 10);
      ctx.stroke();

      // Measurement Ruler indicators on left wall
      ctx.fillStyle = "#94a3b8";
      ctx.font = "8px monospace";
      for (let vVal = 1.0; vVal <= 3.0; vVal += 0.5) {
        const vH = maxChamberHeight * (0.3 + (vVal - 1) * 0.3);
        const vY = chamberBottom - vH;
        ctx.fillRect(11, vY, 4, 1.5);
        ctx.fillText(`${vVal.toFixed(1)}L`, 1, vY + 3);
      }

      localId = requestAnimationFrame(render);
    };

    localId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(localId);
  }, [vol, temp, burnerState, isRunning]);

  // Total delta U = A + Q
  const deltaU = parseFloat((workA + heatQ).toFixed(1));
  const currentU = parseFloat((U_initial + deltaU).toFixed(1));

  // Preset trigger handler
  const handleSelectPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    setBurnerState("off");
    
    if (presetKey === "isochoric_heating") {
      setVol(2.0);
      setTemp(200);
      setWorkA(0);
      setHeatQ(0);
    } else if (presetKey === "adiabatic_compression") {
      setVol(3.0);
      setTemp(250);
      setWorkA(0);
      setHeatQ(0);
    } else if (presetKey === "adiabatic_expansion") {
      setVol(1.2);
      setTemp(450);
      setWorkA(0);
      setHeatQ(0);
    } else if (presetKey === "isothermal_expansion") {
      setVol(1.2);
      setTemp(350);
      setWorkA(0);
      setHeatQ(0);
    } else if (presetKey === "reset") {
      setVol(2.0);
      setTemp(300);
      setWorkA(0);
      setHeatQ(0);
      setBurnerState("off");
      setActivePreset("manual");
    }
  };

  // Explanatory texts for the thermodynamic state
  const getThermodynamicExplanation = () => {
    if (activePreset === "isochoric_heating" || (burnerState === "heat" && activePreset === "manual")) {
      return {
        title: "🔥 Đốt nóng Đẳng tích (Q > 0, A = 0)",
        process: "TRUYỀN NHIỆT (Heat Transfer)",
        formula: "\\Delta U = Q (A = 0)",
        desc: "Khí hấp thụ nhiệt lượng từ đèn cồn (Q > 0). Do pít-tông bị khóa cứng nên khí không dãn nở và không thực hiện công cơ học (A = 0). Toàn bộ nhiệt lượng truyền vào chuyển hóa trực tiếp thành động năng phân tử, làm nhiệt độ (T) tăng vọt và nội năng tăng mạnh (\\Delta U > 0).",
        signA: "A = 0 (Không thực hiện công)",
        signQ: "Q > 0 (Khí hấp thụ nhiệt lượng)",
        signU: "\\Delta U > 0 (Nội năng tăng lên)"
      };
    }
    if (activePreset === "adiabatic_compression") {
      return {
        title: "⚙️ Nén khí Đoạn nhiệt (A > 0, Q = 0)",
        process: "THỰC HIỆN CÔNG (Doing Work)",
        formula: "\\Delta U = A (Q = 0)",
        desc: "Lực ngoài ấn nhanh pít-tông xuống nén thể tích khí (Work A > 0). Vì quá trình xảy ra nhanh coi như không có sự truyền nhiệt ra ngoài (Q = 0). Cơ năng đẩy pít-tông đã chuyển hóa hoàn toàn thành nội năng chất khí. Kết quả là nhiệt độ chất khí tăng lên đột ngột, phân tử chuyển động nhanh và hỗn loạn hơn.",
        signA: "A > 0 (Khí nhận công từ ngoại lực)",
        signQ: "Q = 0 (Cách nhiệt không trao đổi nhiệt)",
        signU: "\\Delta U > 0 (Nội năng tăng lên mạnh mẽ)"
      };
    }
    if (activePreset === "adiabatic_expansion") {
      return {
        title: "💨 Giãn khí Đoạn nhiệt (A < 0, Q = 0)",
        process: "THỰC HIỆN CÔNG (Doing Work)",
        formula: "\\Delta U = A (Q = 0)",
        desc: "Khí giãn nở mạnh, tự đẩy pít-tông trượt đi lên và thực hiện công đẩy môi trường ngoài (A < 0). Do không nhận nhiệt lượng từ ngoài vào (Q = 0), khí phải tự tiêu thụ chính nội năng dự trữ của mình để sinh công cơ học. Vì vậy, nội năng hệ giảm (\\Delta U < 0) và nhiệt độ khí giảm sâu (khí lạnh đi nhanh chóng).",
        signA: "A < 0 (Khí thực hiện công đẩy pít-tông)",
        signQ: "Q = 0 (Không trao đổi nhiệt lượng)",
        signU: "\\Delta U < 0 (Nội năng giảm, khí bị làm lạnh)"
      };
    }
    if (activePreset === "isothermal_expansion") {
      return {
        title: "🔄 Giãn nở Đẳng nhiệt (A < 0, Q > 0)",
        process: "KẾT HỢP CÔNG & NHIỆT (Work & Heat Co-action)",
        formula: "\\Delta U = A + Q = 0",
        desc: "Khi khí giãn nở sinh công đẩy pít-tông (A < 0), đồng thời ta cung cấp nhiệt lượng (Q > 0) vừa đủ bù đắp năng lượng tiêu hao. Theo đó, lượng nhiệt nhận vào đúng bằng công sinh ra (Q = |A|), giúp nhiệt độ tuyệt đối T của khí giữ không đổi. Nội năng tổng thể của khí được duy trì cân bằng (\\Delta U = 0).",
        signA: "A < 0 (Khí sinh công đẩy pít-tông lên)",
        signQ: "Q > 0 (Khí nhận nhiệt lượng bù đắp)",
        signU: "\\Delta U = 0 (Nội năng giữ không đổi tuyệt đối)"
      };
    }

    // Default manuals
    return {
      title: "🧭 Chế độ Thử nghiệm tự do (Manual Exploration)",
      process: "TỰ ĐIỀU CHỈNH THÔNG SỐ (Custom State)",
      formula: "\\Delta U = A + Q",
      desc: "Sử dụng các thanh trượt và nút bấm bên trái để thay đổi Thể tích (thực hiện công cơ học) và Bật lò đốt/Đá lạnh (truyền nhiệt lượng). Hãy quan sát sự thay đổi tức thời của vận tốc phân tử khí trong xi lanh, đồ thị áp suất và cán cân năng lượng \\Delta U phía dưới.",
      signA: vol < 2.0 ? "A > 0 (Đang nén khí)" : "A < 0 (Đang dãn khí)",
      signQ: burnerState === "heat" ? "Q > 0 (Đang truyền nhiệt)" : burnerState === "cool" ? "Q < 0 (Đang hút nhiệt)" : "Q = 0 (Không đun nóng/làm lạnh)",
      signU: deltaU > 0 ? "\\Delta U > 0 (Nội năng tăng)" : deltaU < 0 ? "\\Delta U < 0 (Nội năng giảm)" : "\\Delta U = 0 (Nội năng cân bằng)"
    };
  };

  const currentExp = getThermodynamicExplanation();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 bg-gradient-to-b from-slate-50 to-slate-100/40 p-5 rounded-3xl border-2 border-slate-200 border-b-[6px] border-b-slate-300 relative overflow-hidden shadow-sm">
      {/* Decorative Warm/Cold glow background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* LEFT COLUMN: CONTROL & PRESETS */}
      <div className="xl:col-span-4 flex flex-col justify-between space-y-4 z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2.5">
            <Gauge className="text-amber-600 h-5 w-5 animate-pulse" />
            <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider">Bộ Điều Khiển Thực Nghiệm</h4>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono font-extrabold text-slate-500 block">Kịch bản thí nghiệm chuẩn</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSelectPreset("isochoric_heating")}
                className={`p-2.5 text-left rounded-xl border-2 transition-all text-[10px] font-black cursor-pointer ${
                  activePreset === "isochoric_heating"
                    ? "bg-red-50 border-red-350 border-b-[4px] border-b-red-400 text-red-800 shadow-inner translate-y-[1px]"
                    : "bg-white border-slate-200 border-b-[4px] border-b-slate-300 hover:bg-slate-50 text-slate-800 active:translate-y-[2px] active:border-b-[2px]"
                }`}
              >
                🔥 Đẳng tích hấp nhiệt
              </button>
              <button
                onClick={() => handleSelectPreset("adiabatic_compression")}
                className={`p-2.5 text-left rounded-xl border-2 transition-all text-[10px] font-black cursor-pointer ${
                  activePreset === "adiabatic_compression"
                    ? "bg-amber-50 border-amber-350 border-b-[4px] border-b-amber-400 text-amber-800 shadow-inner translate-y-[1px]"
                    : "bg-white border-slate-200 border-b-[4px] border-b-slate-300 hover:bg-slate-50 text-slate-800 active:translate-y-[2px] active:border-b-[2px]"
                }`}
              >
                ⚙️ Nén khí đoạn nhiệt
              </button>
              <button
                onClick={() => handleSelectPreset("adiabatic_expansion")}
                className={`p-2.5 text-left rounded-xl border-2 transition-all text-[10px] font-black cursor-pointer ${
                  activePreset === "adiabatic_expansion"
                    ? "bg-blue-50 border-blue-350 border-b-[4px] border-b-blue-400 text-blue-800 shadow-inner translate-y-[1px]"
                    : "bg-white border-slate-200 border-b-[4px] border-b-slate-300 hover:bg-slate-50 text-slate-800 active:translate-y-[2px] active:border-b-[2px]"
                }`}
              >
                💨 Dãn khí đoạn nhiệt
              </button>
              <button
                onClick={() => handleSelectPreset("isothermal_expansion")}
                className={`p-2.5 text-left rounded-xl border-2 transition-all text-[10px] font-black cursor-pointer ${
                  activePreset === "isothermal_expansion"
                    ? "bg-purple-50 border-purple-350 border-b-[4px] border-b-purple-400 text-purple-800 shadow-inner translate-y-[1px]"
                    : "bg-white border-slate-200 border-b-[4px] border-b-slate-300 hover:bg-slate-50 text-slate-800 active:translate-y-[2px] active:border-b-[2px]"
                }`}
              >
                🔄 Dãn nở đẳng nhiệt
              </button>
            </div>
          </div>

          {/* Live Manual Sliders */}
          <div className="bg-white border-2 border-slate-250 border-b-[4px] border-b-slate-300 p-4 rounded-2xl space-y-4 shadow-sm">
            <span className="text-[10px] uppercase font-mono font-black text-slate-800 block border-b-2 border-slate-100 pb-2">Tác động thủ công (Manual)</span>
            
            {/* Volume Cylinder Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-mono font-bold text-slate-700 mb-1">
                <span className="flex items-center gap-1"><Layers className="h-3 w-3 text-cyan-600" /> Thể tích khí (V)</span>
                <span className="text-cyan-700 font-black">{vol.toFixed(1)} Lít</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="3.0"
                step="0.1"
                value={vol}
                disabled={activePreset !== "manual"}
                onChange={(e) => {
                  const newVol = parseFloat(e.target.value);
                  const diffVol = newVol - vol;
                  // Work done on gas is opposite of volume change:
                  // Compressing (dV < 0) -> work is done on gas (A > 0)
                  // Expanding (dV > 0) -> gas does work (A < 0)
                  const workDone = -diffVol * 80;
                  setWorkA((prev) => parseFloat((prev + workDone).toFixed(1)));
                  
                  // Compression adiabatically heats gas, expansion cools it
                  const tempChange = -diffVol * 50;
                  setTemp((prev) => Math.max(100, Math.min(600, prev + tempChange)));
                  setVol(newVol);
                }}
                className="w-full accent-cyan-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer disabled:opacity-30"
              />
              <span className="text-[9px] text-slate-500 block mt-1 italic font-semibold">Di chuyển thanh pít-tông để THỰC HIỆN CÔNG (Nén / Dãn khí)</span>
            </div>

            {/* Heat Source Toggle buttons */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono font-bold text-slate-700">
                <span>🔥 Tác nhân Truyền nhiệt (Nhiệt lượng Q)</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => {
                    setBurnerState("heat");
                    setActivePreset("manual");
                  }}
                  className={`py-2 rounded-lg text-[9px] font-black uppercase transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    burnerState === "heat"
                      ? "bg-red-500 text-white font-extrabold shadow-md border-2 border-red-600 border-b-[4px] border-b-red-700 translate-y-[1px]"
                      : "bg-white border-2 border-slate-200 border-b-[4px] border-b-slate-300 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <Flame className="h-3 w-3" /> Đốt nóng
                </button>
                <button
                  onClick={() => {
                    setBurnerState("cool");
                    setActivePreset("manual");
                  }}
                  className={`py-2 rounded-lg text-[9px] font-black uppercase transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    burnerState === "cool"
                      ? "bg-blue-500 text-white font-extrabold shadow-md border-2 border-blue-600 border-b-[4px] border-b-blue-700 translate-y-[1px]"
                      : "bg-white border-2 border-slate-200 border-b-[4px] border-b-slate-300 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <Thermometer className="h-3 w-3" /> Áp lạnh
                </button>
                <button
                  onClick={() => {
                    setBurnerState("off");
                  }}
                  className={`py-2 rounded-lg text-[9px] font-black uppercase transition-all cursor-pointer ${
                    burnerState === "off"
                      ? "bg-slate-200 text-slate-950 font-extrabold border-2 border-slate-300 border-b-[4px] border-b-slate-400 translate-y-[1px]"
                      : "bg-white border-2 border-slate-200 border-b-[4px] border-b-slate-300 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  Tắt đèn
                </button>
              </div>
              <span className="text-[9px] text-slate-500 block italic font-semibold">Truyền nhiệt năng bằng đèn cồn (Q &gt; 0) hoặc nước đá (Q &lt; 0)</span>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer border-2 ${
              isRunning
                ? "bg-slate-800 text-white hover:bg-slate-700 border-slate-900 border-b-[4px] border-b-slate-950 active:translate-y-[2px]"
                : "bg-cyan-50 text-slate-950 hover:bg-cyan-400 border-cyan-600 border-b-[4px] border-b-cyan-700 active:translate-y-[2px]"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="h-3.5 w-3.5" /> Tạm dừng mô phỏng
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" /> Tiếp tục mô phỏng
              </>
            )}
          </button>
          <button
            onClick={() => handleSelectPreset("reset")}
            className="px-3.5 py-2.5 bg-white border-2 border-slate-200 border-b-[4px] border-b-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl transition-all cursor-pointer active:translate-y-[2px]"
            title="Đặt lại trạng thái ban đầu"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* MIDDLE COLUMN: VISUAL CONTAINER & THERMODYNAMIC BOARD */}
      <div className="xl:col-span-5 flex flex-col justify-between space-y-4">
        {/* Animated gas cylinder */}
        <div className="bg-slate-900 border-2 border-slate-250 border-b-[5px] border-b-slate-350 rounded-3xl p-4.5 flex flex-col items-center h-52 justify-between relative shadow-sm text-white">
          <div className="w-full flex justify-between items-center text-[10px] font-mono text-slate-300 uppercase font-black">
            <span>Xylanh pít-tông khí động lực</span>
            <span className="text-cyan-400 font-black flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              {isRunning ? "ĐANG LIÊN TỤC PHÂN TÍCH" : "TẠM NGƯNG"}
            </span>
          </div>

          <canvas
            ref={canvasRef}
            width={220}
            height={150}
            className="bg-transparent rounded-xl border border-slate-800 max-w-full"
          />

          <div className="w-full text-center text-[9px] text-slate-400 italic font-medium">
            Tốc độ va đập và độ giãn khí trực quan hóa theo động năng phân tử
          </div>
        </div>

        {/* Live physical telemetry indicators */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white border-2 border-slate-250 border-b-[4px] border-b-slate-300 p-2.5 rounded-xl flex flex-col justify-between shadow-sm">
            <span className="text-[9px] uppercase font-mono font-black text-slate-500 block leading-none">Nhiệt độ (T)</span>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="text-lg font-mono font-black text-orange-600">{temp}</span>
              <span className="text-[10px] font-bold text-slate-500">K</span>
            </div>
            <span className="text-[9px] text-slate-500 leading-none block font-mono mt-0.5">({Math.round(temp - 273.15)} °C)</span>
          </div>

          <div className="bg-white border-2 border-slate-250 border-b-[4px] border-b-slate-300 p-2.5 rounded-xl flex flex-col justify-between shadow-sm">
            <span className="text-[9px] uppercase font-mono font-black text-slate-500 block leading-none">Áp suất (p)</span>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="text-lg font-mono font-black text-amber-600">{pressure}</span>
              <span className="text-[10px] font-bold text-slate-500">atm</span>
            </div>
            <span className="text-[9px] text-slate-500 leading-none block font-mono mt-0.5"><FormattedMathText text="p = nRT/V" /></span>
          </div>

          <div className="bg-white border-2 border-slate-250 border-b-[4px] border-b-slate-300 p-2.5 rounded-xl flex flex-col justify-between shadow-sm">
            <span className="text-[9px] uppercase font-mono font-black text-slate-500 block leading-none">Nội năng (U)</span>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="text-lg font-mono font-black text-emerald-600">{currentU}</span>
              <span className="text-[10px] font-bold text-emerald-500">J</span>
            </div>
            <span className="text-[9px] text-slate-500 leading-none block font-mono mt-0.5"><FormattedMathText text="U = 0.75 \cdot T" /></span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: 1ST LAW MATHEMATICAL INTERPRETATION */}
      <div className="xl:col-span-3 flex flex-col justify-between space-y-4 bg-white border-2 border-slate-250 border-b-[4px] border-b-slate-300 p-4 rounded-3xl shadow-sm text-slate-950">
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 border-b-2 border-slate-100 pb-2">
            <Zap className="text-cyan-600 h-4 w-4" />
            <span className="text-[10px] uppercase font-mono font-black text-slate-950">Đại lượng Định luật I</span>
          </div>

          {/* Mathematical visual scale of Delta U = A + Q */}
          <div className="space-y-3">
            {/* Heat Q */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono font-extrabold text-slate-700">
                <span>Nhiệt lượng nhận/tỏa (Q):</span>
                <strong className={heatQ > 0 ? "text-red-600" : heatQ < 0 ? "text-blue-600" : "text-slate-500"}>
                  {heatQ >= 0 ? `+${heatQ.toFixed(1)}` : heatQ.toFixed(1)} J
                </strong>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${heatQ >= 0 ? "bg-red-500" : "bg-blue-500"}`}
                  style={{ width: `${Math.min(100, (Math.abs(heatQ) / 300) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Work A */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono font-extrabold text-slate-700">
                <span>Công nhận/thực hiện (A):</span>
                <strong className={workA > 0 ? "text-amber-600" : workA < 0 ? "text-purple-600" : "text-slate-500"}>
                  {workA >= 0 ? `+${workA.toFixed(1)}` : workA.toFixed(1)} J
                </strong>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${workA >= 0 ? "bg-amber-500" : "bg-purple-500"}`}
                  style={{ width: `${Math.min(100, (Math.abs(workA) / 300) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Delta U Result */}
            <div className="p-3 bg-slate-50 border-2 border-slate-200 border-b-[4px] border-b-slate-300 rounded-2xl text-center space-y-1 mt-2 shadow-inner">
              <span className="text-[10px] font-mono font-extrabold text-slate-500 uppercase">Độ biến thiên nội năng (<FormattedMathText text="\Delta U" />)</span>
              <div className="text-xl font-black text-slate-950 flex items-center justify-center gap-1">
                <FormattedMathText text="\Delta U =" /> <span className="text-emerald-600 font-black">{deltaU >= 0 ? `+${deltaU}` : deltaU} J</span>
              </div>
              <p className="text-[9.5px] text-slate-600 font-extrabold">
                {deltaU > 0 ? "📈 Nội năng hệ đang TĂNG" : deltaU < 0 ? "📉 Nội năng hệ đang GIẢM" : "⚖️ Nội năng giữ KHÔNG ĐỔI"}
              </p>
            </div>
          </div>

          {/* Real-time sign logic tracker */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono font-black text-slate-500 block">Quy ước dấu hiện tại</span>
            <div className="space-y-1 font-mono text-[9px]">
              <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                <span className="text-slate-500 font-bold">Quy ước Q:</span>
                <span className={heatQ > 0 ? "text-red-600 font-extrabold" : heatQ < 0 ? "text-blue-600 font-extrabold" : "text-slate-500 font-bold"}>
                  {heatQ > 0 ? "Q > 0 (Hệ nhận nhiệt)" : heatQ < 0 ? "Q < 0 (Hệ tỏa nhiệt)" : "Q = 0 (Đoạn nhiệt)"}
                </span>
              </div>
              <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                <span className="text-slate-500 font-bold">Quy ước A:</span>
                <span className={workA > 0 ? "text-amber-600 font-extrabold" : workA < 0 ? "text-purple-600 font-extrabold" : "text-slate-500 font-bold"}>
                  {workA > 0 ? "A > 0 (Hệ nhận công)" : workA < 0 ? "A < 0 (Hệ sinh công)" : "A = 0 (Không sinh công)"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-3 flex gap-2.5 items-start">
          <Info className="h-3.5 w-3.5 text-cyan-600 shrink-0 mt-0.5" />
          <p className="text-[9.5px] leading-snug text-cyan-950 font-bold flex flex-wrap items-center gap-x-1.5">
            <strong>Hệ thức: <FormattedMathText text="\Delta U = A + Q" /></strong>. Khi nén pít-tông (A &gt; 0) hoặc truyền nhiệt lượng (Q &gt; 0), nội năng hệ tăng lên rõ rệt.
          </p>
        </div>
      </div>

      {/* FULL WIDTH EXPLANATION BOX (SỰ BIẾN ĐỔI NỘI NĂNG VÀ NGUYÊN LÍ I) */}
      <div className="xl:col-span-12 bg-gradient-to-b from-purple-50 to-purple-100/20 border-2 border-purple-200 border-b-[5px] border-b-purple-300 p-5 rounded-3xl space-y-3.5 z-10 shadow-sm">
        <div className="flex items-center gap-1.5 text-purple-950 border-b border-purple-200 pb-2">
          <Sparkles className="text-amber-600 h-4.5 w-4.5" />
          <h5 className="text-xs font-black uppercase tracking-wider">{currentExp.title}</h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-8 text-[11px] sm:text-xs leading-relaxed text-purple-950 space-y-3">
            <div className="flex gap-2 items-center">
              <span className="px-2.5 py-1 bg-purple-100/80 border border-purple-250 text-[10px] font-mono text-purple-900 rounded-md font-bold uppercase">Phân loại:</span>
              <span className="font-extrabold text-purple-950">{currentExp.process}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="px-2.5 py-1 bg-purple-100/80 border border-purple-250 text-[10px] font-mono text-purple-900 rounded-md font-bold uppercase">Phương trình:</span>
              <span className="font-black text-purple-950 inline-flex items-center"><FormattedMathText text={currentExp.formula} /></span>
            </div>
            <p className="text-purple-950 font-medium leading-relaxed font-sans"><FormattedMathText text={currentExp.desc} /></p>
          </div>

          <div className="md:col-span-4 bg-white border-2 border-purple-150 rounded-2xl p-4 flex flex-col justify-between font-mono text-[10.5px] space-y-1.5 shadow-inner">
            <span className="text-purple-800 font-black block mb-1 uppercase tracking-wider">Trạng thái dấu Định luật I</span>
            <div className="flex justify-between items-center py-1 border-b border-purple-100/50">
              <span className="text-purple-750 font-bold">Dấu Công A:</span>
              <span className="text-purple-950 font-black"><FormattedMathText text={currentExp.signA} /></span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-purple-100/50">
              <span className="text-purple-750 font-bold">Dấu Nhiệt Q:</span>
              <span className="text-purple-950 font-black"><FormattedMathText text={currentExp.signQ} /></span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-purple-750 font-bold">Nội năng ΔU:</span>
              <span className="text-emerald-700 font-black"><FormattedMathText text={currentExp.signU} /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
