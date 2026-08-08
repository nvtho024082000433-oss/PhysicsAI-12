import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Flame, Info, Thermometer, ShieldCheck, Activity, Plus, BarChart2, CheckCircle2, AlertTriangle, Eye, HelpCircle } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface DataPoint {
  time: number; // s
  massRemaining: number; // g
  massVaporized: number; // g
  energyProvided: number; // J
  calculatedL: number; // J/kg or kJ/kg
}

export default function Lesson7Simulation() {
  const [voltage, setVoltage] = useState<number>(12); // V
  const [current, setCurrent] = useState<number>(2.5); // A
  const [initialMass, setInitialMass] = useState<number>(200); // g
  const [isIdeal, setIsIdeal] = useState<boolean>(false); // Ideal vs Real with heat loss
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(5); // Acceleration speed

  // Physics states
  const [temp, setTemp] = useState<number>(25); // °C
  const [time, setTime] = useState<number>(0); // s
  const [mass, setMass] = useState<number>(200); // g
  const [phase, setPhase] = useState<"setup" | "heating" | "boiling" | "finished">("setup");
  const [dataLog, setDataLog] = useState<DataPoint[]>([]);

  // Constant parameters
  const cWater = 4180; // J/(kg.K) - Standard textbook specific heat capacity
  const cCup = 900; // J/(kg.K) - Aluminum cup
  const cupMass = 0.05; // 50g aluminum cup
  const L_Water_True = 2260000; // J/kg - True physical latent heat of vaporization of water

  // For visual bubble animation
  const [bubbles, setBubbles] = useState<{ x: number; y: number; r: number; speed: number }[]>([]);
  const animationRef = useRef<number | null>(null);

  const power = voltage * current; // P = U * I
  const efficiency = isIdeal ? 1.0 : 0.85; // 15% heat loss in real mode

  // Handle resets
  const handleReset = () => {
    setIsPlaying(false);
    setTemp(25);
    setTime(0);
    setMass(initialMass);
    setPhase("setup");
    setDataLog([]);
    setBubbles([]);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  // Synchronize mass with initialMass when in setup phase
  useEffect(() => {
    if (phase === "setup") {
      setMass(initialMass);
    }
  }, [initialMass, phase]);

  // Bubble animation loop
  useEffect(() => {
    if (phase === "boiling" && isPlaying) {
      let activeBubbles = [...bubbles];
      
      const spawnBubble = () => {
        if (activeBubbles.length < 25 && Math.random() < 0.25) {
          activeBubbles.push({
            x: 40 + Math.random() * 80, // Beaker water region
            y: 75, // Bottom of the beaker
            r: 1.5 + Math.random() * 4,
            speed: 1 + Math.random() * 2
          });
        }
      };

      const updateBubbles = () => {
        spawnBubble();
        activeBubbles = activeBubbles
          .map(b => ({
            ...b,
            y: b.y - b.speed,
            r: b.y < 45 ? b.r * 1.03 : b.r // Expand slightly as it rises
          }))
          // Water surface level is around y = 40
          .filter(b => b.y > 38);
        
        setBubbles(activeBubbles);
        animationRef.current = requestAnimationFrame(updateBubbles);
      };

      animationRef.current = requestAnimationFrame(updateBubbles);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else {
      setBubbles([]);
    }
  }, [phase, isPlaying]);

  // Fast forward to boiling point to save student's waiting time
  const handleSkipToBoiling = () => {
    if (phase === "setup" || phase === "heating") {
      setTemp(100);
      setPhase("boiling");
      // Calculate energy consumed to reach 100°C
      // Q = (m_water * c_water + m_cup * c_cup) * (100 - T_init)
      const mWaterKg = mass / 1000;
      const Q_needed = (mWaterKg * cWater + cupMass * cCup) * (100 - temp);
      const t_needed = Q_needed / (power * efficiency);
      setTime(Math.round(t_needed));
      setIsPlaying(true);
    }
  };

  // Main physics loop simulation step
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      const dt = 1; // 1 second step
      const stepDuration = 1000 / speedMultiplier;

      timer = setInterval(() => {
        setTime(prevTime => {
          const nextTime = prevTime + dt;
          const energyUsed = power * nextTime; // Total electrical energy supplied

          if (phase === "setup" || phase === "heating") {
            setPhase("heating");
            // Energy delivered in 1s: E = P * dt * eff
            const E_step = power * dt * efficiency;
            const mWaterKg = mass / 1000;
            const totalHeatCapacity = (mWaterKg * cWater + cupMass * cCup);
            const dT = E_step / totalHeatCapacity;
            
            setTemp(prevTemp => {
              const nextTemp = prevTemp + dT;
              if (nextTemp >= 100) {
                setPhase("boiling");
                return 100;
              }
              return nextTemp;
            });
          } else if (phase === "boiling") {
            // Energy delivered to boil water: E = P * dt * eff
            const E_step = power * dt * efficiency;
            // Q = L * dm => dm = Q / L
            const dM_kg = E_step / L_Water_True;
            const dM_g = dM_kg * 1000;

            setMass(prevMass => {
              const nextMass = Math.max(0, prevMass - dM_g);
              if (nextMass <= 0) {
                setIsPlaying(false);
                setPhase("finished");
                return 0;
              }
              return nextMass;
            });
          }

          return nextTime;
        });
      }, stepDuration);
    }
    return () => clearInterval(timer);
  }, [isPlaying, phase, power, efficiency, mass, speedMultiplier]);

  // Log data point manually or automatically when boiling
  const logDataPoint = () => {
    if (phase !== "boiling") return;
    const massVaporized = initialMass - mass;
    if (massVaporized <= 0.1) return; // Need measurable vaporized mass to compute L

    // To calculate L: L_calculated = Q_total_provided_during_boiling / delta_mass
    // Let's find energy used strictly in the boiling phase:
    // Q_boil = P * t_boiling
    // Let's estimate boiling duration:
    const mWaterKg = initialMass / 1000;
    const Q_heating = (mWaterKg * cWater + cupMass * cCup) * (100 - 25);
    const t_heating_estimated = Q_heating / (power * efficiency);
    const t_boil = Math.max(0, time - t_heating_estimated);
    
    // Total energy supplied strictly for boiling:
    // In real lab, it is simpler: Q = P * t, but here we can isolate boiling energy
    const boilingEnergy = power * t_boil; 
    
    // In our calculated L, if student uses formula L = (P * t_boil) / dm
    const calculatedL = (boilingEnergy / (massVaporized / 1000));

    const point: DataPoint = {
      time: time,
      massRemaining: parseFloat(mass.toFixed(2)),
      massVaporized: parseFloat(massVaporized.toFixed(2)),
      energyProvided: Math.round(boilingEnergy),
      calculatedL: Math.round(calculatedL)
    };

    setDataLog(prev => {
      // Avoid duplicate times
      if (prev.some(p => p.time === time)) return prev;
      return [...prev, point];
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch select-none text-slate-800">
      
      {/* 1. LEFT COLUMN: VIRTUAL CONTROLLER & SETUPS */}
      <div className="lg:col-span-4 flex flex-col justify-between bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 space-y-5 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 bg-indigo-50 border-2 border-indigo-150 p-2.5 rounded-2xl">
            <Activity className="h-4.5 w-4.5 text-indigo-600 animate-pulse" />
            <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider">Bộ điều khiển thực nghiệm</h4>
          </div>

          {/* Voltage control */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                Hiệu điện thế <FormattedMathText text="U" />:
              </span>
              <FormattedMathText text={`${voltage} V`} />
            </div>
            <input
              type="range"
              min="6"
              max="24"
              step="1"
              disabled={phase !== "setup"}
              value={voltage}
              onChange={(e) => setVoltage(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Current control */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1">Cường độ dòng điện <FormattedMathText text="I" />:</span>
              <FormattedMathText text={`${current} A`} />
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              disabled={phase !== "setup"}
              value={current}
              onChange={(e) => setCurrent(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Power display */}
          <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-indigo-100 rounded-2xl p-3.5 flex justify-between items-center border-2 border-indigo-950 border-b-[4px] border-b-indigo-950 shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono flex items-center gap-1">
              Công suất gia nhiệt <FormattedMathText text="P = U * I" />:
            </span>
            <FormattedMathText text={`${power.toFixed(1)} W`} />
          </div>

          {/* Initial Mass of Water */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1">Khối lượng nước <FormattedMathText text="m_0" />:</span>
              <FormattedMathText text={`${initialMass} g`} />
            </div>
            <input
              type="range"
              min="50"
              max="300"
              step="10"
              disabled={phase !== "setup"}
              value={initialMass}
              onChange={(e) => setInitialMass(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Ideal environment vs Real environment with Heat Loss */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4.5 space-y-2.5 shadow-inner">
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider block">Môi trường đo đạc</span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setIsIdeal(true)}
                disabled={phase !== "setup"}
                className={`py-2 text-xs font-black rounded-xl border-2 border-b-[4px] cursor-pointer transition-all ${
                  isIdeal
                    ? "bg-emerald-600 text-white border-emerald-700 border-b-emerald-800 shadow-sm"
                    : "bg-white text-slate-600 border-slate-250 border-b-slate-350 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                Lý tưởng (H = 100%)
              </button>
              <button
                onClick={() => setIsIdeal(false)}
                disabled={phase !== "setup"}
                className={`py-2 text-xs font-black rounded-xl border-2 border-b-[4px] cursor-pointer transition-all ${
                  !isIdeal
                    ? "bg-amber-500 text-white border-amber-600 border-b-amber-800 shadow-sm"
                    : "bg-white text-slate-600 border-slate-250 border-b-slate-350 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                Thực tế (H = 85%)
              </button>
            </div>
            <p className="text-[9px] text-slate-600 leading-relaxed italic mt-1 font-semibold">
              {isIdeal
                ? "✓ Bỏ qua hoàn toàn hao phí nhiệt ra môi trường. Kết quả L sẽ tuyệt đối chính xác."
                : "⚠️ Hao phí 15% nhiệt năng tỏa ra không khí & đun nóng cốc nhôm. Kết quả L thực nghiệm sẽ lớn hơn giá trị thật."}
            </p>
          </div>

          {/* Speed multiplier control */}
          <div className="space-y-1.5">
            <span className="text-[9px] font-black text-slate-700 uppercase tracking-wider block">Tốc độ mô phỏng</span>
            <div className="flex gap-2">
              {[1, 5, 10, 20].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeedMultiplier(s)}
                  className={`flex-1 py-1.5 text-[10px] font-mono font-black rounded-xl border-2 border-b-[4px] cursor-pointer transition-all ${
                    speedMultiplier === s
                      ? "bg-slate-850 text-white border-slate-950 border-b-slate-950 shadow-sm"
                      : "bg-white text-slate-600 border-slate-250 border-b-slate-350 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons section */}
        <div className="space-y-3 pt-4 border-t-2 border-slate-100">
          <div className="flex gap-2.5">
            {/* Play/Pause Button */}
            {isPlaying ? (
              <button
                onClick={() => setIsPlaying(false)}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl border-2 border-b-[6px] border-amber-600 border-b-amber-800 active:border-b-2 active:mt-[4px] cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <Pause className="h-4.5 w-4.5" /> Tạm dừng
              </button>
            ) : (
              <button
                onClick={() => setIsPlaying(true)}
                disabled={phase === "finished"}
                className={`flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-2xl border-2 border-b-[6px] border-indigo-700 border-b-indigo-900 active:border-b-2 active:mt-[4px] cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-md ${
                  phase === "finished" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Play className="h-4.5 w-4.5" /> Bắt đầu đun
              </button>
            )}

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-black text-xs rounded-2xl border-2 border-b-[6px] border-slate-300 border-b-slate-450 active:border-b-2 active:mt-[4px] cursor-pointer transition-all flex items-center justify-center shadow-sm"
              title="Đặt lại"
            >
              <RotateCcw className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Quick skip to boiling */}
          {(phase === "setup" || phase === "heating") && (
            <button
              onClick={handleSkipToBoiling}
              className="w-full py-2.5 bg-red-50 hover:bg-red-100/70 border-2 border-b-[4px] border-red-200 border-b-red-300 text-red-700 hover:text-red-800 font-black text-[10px] uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1 shadow-sm active:border-b-2 active:mt-[2px]"
            >
              <Flame className="h-3.5 w-3.5 animate-pulse" /> Nhảy nhanh đến trạng thái sôi (100°C)
            </button>
          )}

          {/* Manual recording of data point */}
          {phase === "boiling" && (
            <button
              onClick={logDataPoint}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 border-2 border-b-[6px] border-emerald-700 border-b-emerald-900 active:border-b-2 active:mt-[4px] text-white font-black text-[10px] uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <Plus className="h-4 w-4" /> Ghi nhận số liệu thực nghiệm
            </button>
          )}
        </div>
      </div>

      {/* 2. MIDDLE COLUMN: INTERACTIVE VISUAL CONTAINER */}
      <div className="lg:col-span-4 bg-gradient-to-b from-sky-50/50 to-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 shadow-sm rounded-3xl p-5 flex flex-col justify-between items-center relative overflow-hidden">
        {/* Background ambient water grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.015)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

        <div className="w-full flex justify-between items-center relative z-10">
          <span className="text-[9px] font-mono text-slate-700 font-black uppercase tracking-wider">Sơ đồ thiết bị thực hành ảo</span>
          <span className={`text-[9px] font-mono font-black px-2.5 py-1 rounded-xl border-2 ${
            phase === "setup" ? "bg-slate-150 text-slate-700 border-slate-300" :
            phase === "heating" ? "bg-amber-100 text-amber-800 border-amber-300 animate-pulse" :
            phase === "boiling" ? "bg-red-100 text-red-800 border-red-300 animate-pulse" :
            "bg-emerald-100 text-emerald-800 border-emerald-300"
          }`}>
            {phase === "setup" ? "CHỜ THIẾT LẬP" :
             phase === "heating" ? "ĐANG GIA NHIỆT" :
             phase === "boiling" ? "SÔI ỔN ĐỊNH" : "HOÀN THÀNH"}
          </span>
        </div>

        {/* The Beaker and Balance Visual (SVG) */}
        <div className="w-full my-4 flex items-center justify-center">
          <svg className="w-64 h-64" viewBox="0 0 200 200">
            {/* Ambient heat waves background when active */}
            {isPlaying && phase !== "finished" && (
              <g className="animate-pulse">
                <path d="M 60,110 Q 65,100 60,90 Q 55,80 60,70" fill="none" stroke="#f87171" strokeWidth="1.2" opacity="0.4" strokeDasharray="3" />
                <path d="M 100,110 Q 105,100 100,90 Q 95,80 100,70" fill="none" stroke="#f87171" strokeWidth="1.5" opacity="0.5" strokeDasharray="3" />
                <path d="M 140,110 Q 145,100 140,90 Q 135,80 140,70" fill="none" stroke="#f87171" strokeWidth="1.2" opacity="0.4" strokeDasharray="3" />
              </g>
            )}

            {/* Electronic Balance scale base */}
            <rect x="20" y="145" width="160" height="25" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" rx="5" />
            
            {/* Display screen on the scale */}
            <rect x="65" y="152" width="70" height="15" fill="#0f172a" rx="2" />
            <text x="100" y="163" fill="#10b981" textAnchor="middle" className="text-xs font-mono font-black tracking-wider">
              {mass.toFixed(2)} g
            </text>

            {/* Controls/LED lights on balance scale */}
            <circle cx="35" cy="157" r="3" fill="#f43f5e" />
            <circle cx="45" cy="157" r="3" fill="#3b82f6" />
            <circle cx="55" cy="157" r="3" fill="#10b981" />

            {/* Weighing pan plate */}
            <rect x="35" y="137" width="130" height="8" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" rx="1.5" />

            {/* Aluminum beaker cup (placed on pan) */}
            <rect x="45" y="45" width="110" height="92" fill="none" stroke="#475569" strokeWidth="2.5" rx="4" />
            
            {/* Water volume inside cup (reduces based on current mass) */}
            {mass > 0 && (
              <g>
                {/* Calculate liquid height dynamically: y starts from 135, height goes up to y = 70 */}
                {/* 200g water level is at y = 75. 300g is at y = 60. */}
                {(() => {
                  const maxLiquidHeight = 70; // px height maximum
                  const currentWaterHeight = (mass / 300) * maxLiquidHeight;
                  const waterY = 135 - currentWaterHeight;
                  const waterHeight = currentWaterHeight;

                  return (
                    <>
                      {/* Water background */}
                      <rect x="46.5" y={waterY} width="107" height={waterHeight} fill="#bae6fd" fillOpacity="0.55" rx="1" />
                      {/* Water surface line wavy */}
                      <path
                        d={`M 46.5,${waterY} Q 73.25,${waterY - (phase === "boiling" ? 3 : 1)} 100,${waterY} Q 126.75,${waterY + (phase === "boiling" ? 3 : 1)} 153.5,${waterY}`}
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2"
                      />
                    </>
                  );
                })()}
              </g>
            )}

            {/* Heat bubbling elements inside water */}
            {phase === "boiling" && bubbles.map((b, idx) => (
              <circle
                key={idx}
                cx={b.x}
                cy={b.y}
                r={b.r}
                fill="#ffffff"
                stroke="#0284c7"
                strokeWidth="0.5"
                opacity="0.9"
              />
            ))}

            {/* Coil heater element (turns red-hot when active) */}
            <path
              d="M 85,20 L 85,95 C 85,110 115,110 115,95 L 115,20"
              fill="none"
              stroke={isPlaying && phase !== "finished" ? "#ef4444" : "#475569"}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {isPlaying && phase !== "finished" && (
              <path
                d="M 92,90 C 92,100 108,100 108,90"
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-pulse"
              />
            )}

            {/* Digital Thermometer probe */}
            <line x1="65" y1="20" x2="65" y2="115" stroke="#334155" strokeWidth="2.5" />
            <circle cx="65" cy="115" r="4.5" fill="#ef4444" />
            {/* Temperature digital display floating tag */}
            <g transform="translate(65, 10)">
              <rect x="-25" y="-15" width="50" height="15" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" rx="3" />
              <text x="0" y="-4" fill="#991b1b" textAnchor="middle" className="text-[8.5px] font-mono font-black">
                {temp.toFixed(1)} °C
              </text>
            </g>

            {/* Wires from coil to external power */}
            <path d="M 85,20 L 85,15 L 15,15" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray={isPlaying ? "2" : "0"} />
            <path d="M 115,20 L 115,10 L 15,10" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray={isPlaying ? "2" : "0"} />

            {/* Water vapor steam lines escaping beaker */}
            {phase === "boiling" && (
              <g className="opacity-75">
                <path d="M 55,35 Q 50,22 55,10" fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3" className="animate-pulse" />
                <path d="M 100,30 Q 105,18 100,5" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3" className="animate-pulse" />
                <path d="M 140,35 Q 135,22 140,10" fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3" className="animate-pulse" />
              </g>
            )}
          </svg>
        </div>

        {/* Digital dashboard for live values */}
        <div className="w-full grid grid-cols-3 gap-2.5 pt-3 border-t-2 border-slate-200 bg-white p-3 rounded-2xl border border-slate-100 shadow-inner">
          <div className="flex flex-col items-center">
            <span className="text-[8.5px] font-extrabold text-slate-550 uppercase tracking-wider font-mono">Thời gian</span>
            <span className="text-xs font-mono font-black text-indigo-800 mt-1">{time} s</span>
          </div>
          <div className="flex flex-col items-center border-x-2 border-slate-150">
            <span className="text-[8.5px] font-extrabold text-slate-550 uppercase tracking-wider font-mono">Nhiệt độ</span>
            <span className="text-xs font-mono font-black text-red-600 mt-1">{temp.toFixed(1)}°C</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[8.5px] font-extrabold text-slate-550 uppercase tracking-wider font-mono">Đã hóa hơi</span>
            <span className="text-xs font-mono font-black text-emerald-700 mt-1">{(initialMass - mass).toFixed(1)} g</span>
          </div>
        </div>
      </div>

      {/* 3. RIGHT COLUMN: REAL-TIME DATA TABLE LOG */}
      <div className="lg:col-span-4 bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 shadow-sm rounded-3xl p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-3 flex-1 flex flex-col">
          <div className="flex items-center gap-1.5 bg-emerald-50 border-2 border-emerald-100 p-2.5 rounded-2xl">
            <BarChart2 className="h-4.5 w-4.5 text-emerald-700 animate-pulse" />
            <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider">Bảng số liệu thực nghiệm</h4>
          </div>

          <p className="text-[10px] text-slate-600 leading-relaxed font-bold">
            Ghi nhận độ giảm khối lượng <FormattedMathText text="\Delta m" /> theo thời gian sôi <FormattedMathText text="t" /> để tính giá trị nhiệt hóa hơi riêng thực nghiệm của nước: <FormattedMathText text="L_thực_nghiệm = (U * I * t) / \Delta m" />.
          </p>

          <div className="flex-1 overflow-y-auto max-h-[190px] border-2 border-slate-150 rounded-2xl bg-slate-50 text-[10px]">
            {dataLog.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-1">
                <HelpCircle className="h-6 w-6 text-slate-300" />
                <span className="font-extrabold text-slate-600 text-[11px]">Chưa có dòng dữ liệu nào</span>
                <span className="text-[9.5px] leading-relaxed text-slate-500 font-semibold">Hãy đợi nước đạt 100°C sôi ổn định, sau đó nhấn nút <strong className="text-emerald-600">"Ghi nhận số liệu"</strong> ở cột trái.</span>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 font-extrabold border-b-2 border-slate-200 text-slate-800">
                    <th className="p-2.5"><FormattedMathText text="t (s)" /></th>
                    <th className="p-2.5"><FormattedMathText text="m_cl (g)" /></th>
                    <th className="p-2.5"><FormattedMathText text="\Delta m (g)" /></th>
                    <th className="p-2.5"><FormattedMathText text="Q_sôi (J)" /></th>
                    <th className="p-2.5 text-emerald-800"><FormattedMathText text="L (J/kg)" /></th>
                  </tr>
                </thead>
                <tbody className="font-mono text-slate-700 font-extrabold">
                  {dataLog.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-200/55 transition-all">
                      <td className="p-2.5">{row.time}</td>
                      <td className="p-2.5">{row.massRemaining}</td>
                      <td className="p-2.5 text-rose-600">{row.massVaporized}</td>
                      <td className="p-2.5">{row.energyProvided}</td>
                      <td className="p-2.5 font-black text-emerald-700">
                        <FormattedMathText text={`${(row.calculatedL / 1000000).toFixed(2)} * 10^6 J/kg`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Statistical comparison footer */}
        {dataLog.length > 0 && (
          <div className="bg-gradient-to-b from-indigo-50 to-indigo-100/30 border-2 border-indigo-150 rounded-2xl p-4 space-y-2.5 text-xs shadow-inner">
            <span className="font-black text-indigo-950 block border-b-2 border-indigo-200 pb-1.5 uppercase tracking-wide">Đánh giá kết quả đo</span>
            <div className="space-y-1.5 text-[11px] leading-relaxed text-indigo-900 font-semibold">
              <div className="flex justify-between items-center">
                <span>• Giá trị thật lý thuyết:</span>
                <FormattedMathText text="2.26 * 10^6 J/kg" />
              </div>
              <div className="flex justify-between items-center">
                <span>• Giá trị đo trung bình:</span>
                <FormattedMathText text={`${((dataLog.reduce((acc, row) => acc + row.calculatedL, 0) / dataLog.length) / 1000000).toFixed(2)} * 10^6 J/kg`} />
              </div>
              {/* Error comparison */}
              {(() => {
                const avgL = dataLog.reduce((acc, row) => acc + row.calculatedL, 0) / dataLog.length;
                const errPercent = Math.abs((avgL - L_Water_True) / L_Water_True) * 100;
                return (
                  <div className="flex justify-between items-center bg-white border-2 border-indigo-200 p-2 rounded-xl shadow-sm">
                    <span className="flex items-center gap-1 font-bold text-indigo-900">
                      {errPercent < 5 ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertTriangle className="h-4 w-4 text-amber-600" />}
                      Sai số tương đối:
                    </span>
                    <span className="font-mono font-black text-rose-600">{errPercent.toFixed(1)}%</span>
                  </div>
                );
              })()}
            </div>
            <p className="text-[9.5px] text-indigo-950/70 font-semibold leading-relaxed italic border-t border-indigo-200/50 pt-2">
              {!isIdeal ? (
                <span><strong>Giải thích sai số:</strong> Trong môi trường thực tế, có hao phí nhiệt lượng truyền ra ngoài và làm nóng cốc nên dòng điện cấp nhiều năng lượng hơn thực tế để hóa hơi cùng một lượng nước. Điều này dẫn đến giá trị <FormattedMathText text="L_thực_nghiệm" /> lớn hơn <FormattedMathText text="L_lý_thuyết" /> (sai số dương khoảng 15-20%).</span>
              ) : (
                <span><strong>Môi trường lý tưởng:</strong> Không hao phí truyền nhiệt, hệ số bảo toàn hoàn hảo giúp sai số xấp xỉ 0%.</span>
              )}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
