import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Flame, Sparkles, Thermometer, ShieldAlert, Zap, Sun } from "lucide-react";

interface QuestionIllustrationProps {
  type: string;
  questionText?: string;
}

export function QuestionIllustration({ type, questionText }: QuestionIllustrationProps) {
  // Normalize type
  const normType = (type || "").toLowerCase().trim();

  // Ice cube state
  const [iceState, setIceState] = useState({
    meltPercent: 0,
    isPlaying: false,
    temp: 0,
  });

  // Kettle state
  const [kettleState, setKettleState] = useState({
    temp: 25,
    isPlaying: false,
    boiled: false,
  });

  // Piston gas state
  const [pistonState, setPistonState] = useState({
    volume: 100, // %
    temp: 300, // Kelvin
    pressure: 1.0, // atm
  });

  // Thermometer state
  const [thermoVal, setThermoVal] = useState(37);

  // Tire pressure state
  const [tireState, setTireState] = useState({
    isHot: false,
    temp: 30, // °C
    pressure: 2.2, // bar
  });

  // Balloon state
  const [balloonState, setBalloonState] = useState({
    temp: 20, // °C
    size: 60, // px radius
  });

  // Automatic state detection based on question text if type is empty/default
  const detectedType = normType || (
    questionText?.toLowerCase().includes("đá") && questionText?.toLowerCase().includes("nhiệt nóng chảy") ? "ice-cube" :
    questionText?.toLowerCase().includes("ấm") || questionText?.toLowerCase().includes("đun") || questionText?.toLowerCase().includes("sôi") ? "kettle" :
    questionText?.toLowerCase().includes("xilanh") || questionText?.toLowerCase().includes("piston") || questionText?.toLowerCase().includes("nén") ? "cylinder-piston" :
    questionText?.toLowerCase().includes("nhiệt kế") ? "thermometer" :
    questionText?.toLowerCase().includes("lốp") || questionText?.toLowerCase().includes("vỏ xe") ? "tire" :
    questionText?.toLowerCase().includes("bóng") || questionText?.toLowerCase().includes("khinh khí cầu") ? "balloon" : "thermometer"
  );

  // 1. Ice Cube animation effect
  useEffect(() => {
    let timer: any;
    if (iceState.isPlaying) {
      timer = setInterval(() => {
        setIceState((prev) => {
          if (prev.meltPercent >= 100) {
            clearInterval(timer);
            return { ...prev, meltPercent: 100, isPlaying: false, temp: 15 };
          }
          const nextMelt = prev.meltPercent + 5;
          return {
            ...prev,
            meltPercent: nextMelt,
            temp: nextMelt >= 100 ? 5 : 0,
          };
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [iceState.isPlaying]);

  // 2. Kettle heating animation effect
  useEffect(() => {
    let timer: any;
    if (kettleState.isPlaying) {
      timer = setInterval(() => {
        setKettleState((prev) => {
          if (prev.temp >= 100) {
            clearInterval(timer);
            return { ...prev, temp: 100, isPlaying: false, boiled: true };
          }
          return { ...prev, temp: prev.temp + 4 };
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [kettleState.isPlaying]);

  const renderIllustration = () => {
    switch (detectedType) {
      case "ice-cube":
      case "ice-water":
        return (
          <div className="flex flex-col items-center p-4.5 bg-gradient-to-b from-slate-50 to-slate-100/80 border-2 border-slate-900 rounded-2xl max-w-xs mx-auto space-y-4 shadow-[5px_5px_0px_0px_#0ea5e9]">
            <div className="flex justify-between items-center w-full">
              <span className="text-[11px] font-black uppercase text-sky-950 tracking-wider">Mô phỏng cốc nước đá tan</span>
              <span className="text-[11px] font-black font-mono bg-white border-2 border-slate-900 px-2.5 py-1 rounded-lg text-sky-900 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                T = {iceState.temp} °C
              </span>
            </div>

            {/* Ice melting realistic SVG container */}
            <div className="relative w-44 h-44 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  {/* Glass refraction gradients */}
                  <linearGradient id="glassWall" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                    <stop offset="10%" stopColor="#e2e8f0" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.02" />
                    <stop offset="90%" stopColor="#e2e8f0" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.45" />
                  </linearGradient>
                  
                  {/* Liquid realism gradient */}
                  <linearGradient id="waterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.75" />
                    <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.45" />
                  </linearGradient>

                  {/* Translucent Ice cube gradient */}
                  <radialGradient id="iceGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="40%" stopColor="#bae6fd" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
                  </radialGradient>

                  {/* Wood desk reflection base */}
                  <linearGradient id="woodTable" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3c1c04" />
                    <stop offset="50%" stopColor="#642c0c" />
                    <stop offset="100%" stopColor="#3c1c04" />
                  </linearGradient>

                  {/* Glass shadow */}
                  <radialGradient id="glassShadow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.7" />
                    <stop offset="60%" stopColor="#000000" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Desk Base background */}
                <rect x="0" y="85" width="100" height="15" fill="url(#woodTable)" />
                <ellipse cx="50" cy="85" rx="35" ry="4" fill="url(#glassShadow)" />

                {/* Ambient backlighting glow */}
                <circle cx="50" cy="50" r="30" fill="#0ea5e9" fillOpacity="0.15" filter="blur(8px)" />

                {/* Liquid body */}
                <path
                  d={`M 25 ${68 - iceState.meltPercent * 0.18} 
                      Q 50 ${66 - iceState.meltPercent * 0.18} 75 ${68 - iceState.meltPercent * 0.18} 
                      L 71 82 
                      Q 50 84 29 82 Z`}
                  fill="url(#waterGrad)"
                />

                {/* Water surface highlight curve */}
                <ellipse
                  cx="50"
                  cy={68 - iceState.meltPercent * 0.18}
                  rx={25 - iceState.meltPercent * 0.04}
                  ry="2"
                  fill="#ffffff"
                  fillOpacity="0.5"
                />

                {/* Bubbles in water */}
                {iceState.meltPercent < 100 && (
                  <g opacity="0.6">
                    <circle cx="34" cy="74" r="1.2" fill="#ffffff" />
                    <circle cx="58" cy="78" r="0.8" fill="#ffffff" />
                    <circle cx="45" cy="72" r="1" fill="#ffffff" />
                    <circle cx="66" cy="75" r="1.5" fill="#ffffff" />
                  </g>
                )}

                {/* Translucent Photorealistic Ice Cubes */}
                {iceState.meltPercent < 100 && (
                  <>
                    {/* Cube 1 */}
                    <g transform={`rotate(14 38 60)`}>
                      <rect
                        x="30"
                        y="52"
                        width={Math.max(0, 15 * (1 - iceState.meltPercent / 120))}
                        height={Math.max(0, 15 * (1 - iceState.meltPercent / 120))}
                        rx="1.5"
                        fill="url(#iceGrad)"
                        stroke="#e0f2fe"
                        strokeWidth="0.5"
                        strokeOpacity="0.8"
                      />
                      {/* Realistic highlight reflection on cube */}
                      <path d="M 31 53 L 36 53" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
                      <path d="M 31 53 L 31 58" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
                    </g>

                    {/* Cube 2 */}
                    <g transform={`rotate(-18 58 64)`}>
                      <rect
                        x="48"
                        y="55"
                        width={Math.max(0, 13 * (1 - iceState.meltPercent / 110))}
                        height={Math.max(0, 13 * (1 - iceState.meltPercent / 110))}
                        rx="1"
                        fill="url(#iceGrad)"
                        stroke="#e0f2fe"
                        strokeWidth="0.5"
                        strokeOpacity="0.8"
                      />
                      {/* Realistic highlight reflection on cube */}
                      <path d="M 49 56 L 53 56" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
                      <path d="M 49 56 L 49 60" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
                    </g>
                  </>
                )}

                {/* Condensation water droplets on outer glass (Realism) */}
                <g opacity="0.7" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="0.2">
                  <ellipse cx="28" cy="40" rx="0.6" ry="1.2" />
                  <ellipse cx="32" cy="55" rx="0.5" ry="0.9" />
                  <ellipse cx="68" cy="48" rx="0.7" ry="1.4" />
                  <ellipse cx="71" cy="62" rx="0.4" ry="0.8" />
                  <path d="M 32 55 Q 32.5 58 32 60" fill="none" stroke="#0ea5e9" strokeWidth="0.3" strokeLinecap="round" />
                </g>

                {/* Glass Cup outline & Reflections */}
                <path
                  d="M 23 20 L 28 83 C 28.5 84.5 31 85.5 50 85.5 C 69 85.5 71.5 84.5 72 83 L 77 20"
                  fill="url(#glassWall)"
                  stroke="#64748b"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />

                {/* Glass Rim highlight oval */}
                <ellipse cx="50" cy="20" rx="27" ry="2.5" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.7" />

                {/* Specular glass reflection bar (left/right) */}
                <path d="M 25.5 25 L 29.5 80" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
                <path d="M 74.5 25 L 70.5 80" fill="none" stroke="#cbd5e1" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.3" />
              </svg>

              {/* Status Indicator overlay */}
              <div className="absolute top-2.5 left-2.5 bg-sky-950/80 border border-sky-400 rounded-lg px-2.5 py-0.5 text-[9px] font-black uppercase text-sky-400 tracking-wider">
                {iceState.meltPercent === 100 ? "Nước tan hoàn toàn!" : iceState.meltPercent > 0 ? "Bắt đầu nóng chảy..." : "Trạng thái rắn (0 °C)"}
              </div>
            </div>

            {/* Animation controls */}
            <div className="flex justify-center gap-2.5 w-full">
              <button
                type="button"
                onClick={() => setIceState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-sky-500 hover:bg-sky-400 border-2 border-slate-900 rounded-xl text-[10px] text-slate-950 font-black tracking-wide transition-all shadow-[2px_2px_0px_0px_#0284c7] hover:shadow-[1px_1px_0px_0px_#0284c7] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
              >
                {iceState.isPlaying ? (
                  <>
                    <Pause className="h-3 w-3" /> Tạm dừng
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3" /> Nung nhiệt
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIceState({ meltPercent: 0, isPlaying: false, temp: 0 })}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border-2 border-slate-900 rounded-xl text-[10px] text-slate-800 font-black tracking-wide transition-all shadow-[2px_2px_0px_0px_#64748b] hover:shadow-[1px_1px_0px_0px_#64748b] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" /> Khởi tạo lại
              </button>
            </div>
          </div>
        );

      case "kettle":
      case "electric-kettle":
        return (
          <div className="flex flex-col items-center p-4.5 bg-gradient-to-b from-slate-50 to-slate-100/80 border-2 border-slate-900 rounded-2xl max-w-xs mx-auto space-y-4 shadow-[5px_5px_0px_0px_#f59e0b]">
            <div className="flex justify-between items-center w-full">
              <span className="text-[11px] font-black uppercase text-amber-950 tracking-wider">Mô phỏng đun nước sôi</span>
              <span className="text-[11px] font-black font-mono bg-white border-2 border-slate-900 px-2.5 py-1 rounded-lg text-amber-800 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                T = {kettleState.temp} °C
              </span>
            </div>

            {/* Realistic Glass Electric Kettle Container */}
            <div className="relative w-44 h-44 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  {/* Metal chrome parts */}
                  <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="30%" stopColor="#f1f5f9" />
                    <stop offset="50%" stopColor="#cbd5e1" />
                    <stop offset="70%" stopColor="#f1f5f9" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>

                  {/* Boiling water realism */}
                  <linearGradient id="boilWaterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.3" />
                  </linearGradient>

                  {/* Heating coil glow */}
                  <linearGradient id="heaterGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>

                {/* Base platform */}
                <rect x="20" y="84" width="60" height="7" rx="2" fill="#1e293b" stroke="#000000" strokeWidth="0.8" />
                {/* Kettle base heating plate */}
                <rect x="25" y="80" width="50" height="4" fill="url(#chromeGrad)" />

                {/* Glass wall backdrop glow */}
                <path d="M 33 22 L 27 80 L 73 80 L 67 22 Z" fill="#0284c7" fillOpacity="0.08" />

                {/* Boiling Water Level inside kettle */}
                <path
                  d={`M ${33 - (80 - 74) * 0.1} 74 
                      Q 50 ${73 + (kettleState.isPlaying ? Math.sin(kettleState.temp) * 1.2 : 0)} ${67 + (80 - 74) * 0.1} 74 
                      L 73 80 Q 50 81 27 80 Z`}
                  fill="url(#boilWaterGrad)"
                />

                {/* Heating Element (Metal plate on bottom glowing) */}
                <rect x="28" y="78" width="44" height="2" fill={kettleState.isPlaying ? "url(#heaterGlow)" : "url(#chromeGrad)"} />

                {/* Interactive steam rising & bubble particles inside the kettle */}
                {kettleState.isPlaying && kettleState.temp > 40 && (
                  <g>
                    {/* Bubbles */}
                    <circle cx="35" cy="74" r={Math.min(2.5, (kettleState.temp - 40) * 0.05)} fill="#ffffff" fillOpacity="0.8" />
                    <circle cx="50" cy="77" r={Math.min(3, (kettleState.temp - 40) * 0.06)} fill="#ffffff" fillOpacity="0.9" />
                    <circle cx="63" cy="75" r={Math.min(2.2, (kettleState.temp - 40) * 0.04)} fill="#ffffff" fillOpacity="0.7" />
                    {kettleState.temp > 70 && (
                      <>
                        <circle cx="42" cy="72" r="1.8" fill="#ffffff" fillOpacity="0.85" />
                        <circle cx="58" cy="70" r="2.1" fill="#ffffff" fillOpacity="0.9" />
                        <circle cx="48" cy="65" r="1.2" fill="#ffffff" fillOpacity="0.6" />
                      </>
                    )}
                    {/* Steam rising in upper kettle */}
                    {kettleState.temp > 85 && (
                      <g opacity="0.4" fill="#ffffff">
                        <path d="M 45 45 Q 48 35 44 25" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3,3" />
                        <path d="M 54 42 Q 51 32 55 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3,3" />
                      </g>
                    )}
                  </g>
                )}

                {/* Glass outer handle - Realistic 3D grip */}
                <path
                  d="M 29 28 L 17 33 C 14 35 14 65 17 68 L 26 71"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M 29 28 L 17 33 C 14 35 14 65 17 68 L 26 71"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Glass spout and metallic rim */}
                <path d="M 64 22 L 71 18 L 68 25 Z" fill="url(#chromeGrad)" stroke="#1e293b" strokeWidth="0.8" />
                <rect x="31" y="20" width="37" height="3.5" rx="1.5" fill="url(#chromeGrad)" stroke="#1e293b" strokeWidth="0.8" />

                {/* Main Glass Kettle body contour */}
                <path d="M 33 22 L 27 80 L 73 80 L 67 22" fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeOpacity="0.6" />
                
                {/* 3D Glass shiny reflection strip */}
                <path d="M 34 24 L 29.5 78" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.75" strokeLinecap="round" />
                <path d="M 65 24 L 70.5 78" fill="none" stroke="#cbd5e1" strokeWidth="0.8" strokeOpacity="0.4" strokeLinecap="round" />
              </svg>

              {/* Boiling notification banner */}
              {kettleState.boiled && (
                <div className="absolute top-2.5 right-2.5 bg-rose-600 border border-rose-400 text-white px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest animate-pulse shadow-[0px_0px_6px_rgba(239,68,68,0.5)]">
                  Đã sôi 100 °C
                </div>
              )}
            </div>

            {/* Animation controls */}
            <div className="flex justify-center gap-2.5 w-full">
              <button
                type="button"
                onClick={() => setKettleState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-400 border-2 border-slate-900 rounded-xl text-[10px] text-slate-950 font-black tracking-wide transition-all shadow-[2px_2px_0px_0px_#b45309] hover:shadow-[1px_1px_0px_0px_#b45309] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
              >
                {kettleState.isPlaying ? (
                  <>
                    <Pause className="h-3 w-3" /> Tạm dừng
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3" /> Đun nước sôi
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setKettleState({ temp: 25, isPlaying: false, boiled: false })}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border-2 border-slate-900 rounded-xl text-[10px] text-slate-800 font-black tracking-wide transition-all shadow-[2px_2px_0px_0px_#64748b] hover:shadow-[1px_1px_0px_0px_#64748b] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" /> Rút phích
              </button>
            </div>
          </div>
        );

      case "cylinder-piston":
        return (
          <div className="flex flex-col items-center p-4.5 bg-gradient-to-b from-slate-50 to-slate-100/80 border-2 border-slate-900 rounded-2xl max-w-xs mx-auto space-y-4 shadow-[5px_5px_0px_0px_#8b5cf6]">
            <div className="flex justify-between items-center w-full">
              <span className="text-[11px] font-black uppercase text-purple-950 tracking-wider">Xilanh khí nén lý tưởng</span>
              <span className="text-[10px] font-black font-mono bg-white border-2 border-slate-900 px-2 py-0.5 rounded-lg text-purple-900 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                {pistonState.pressure.toFixed(1)} atm | {pistonState.temp} K
              </span>
            </div>

            {/* Industrial Realism Cylinder-Piston SVG container */}
            <div className="relative w-44 h-44 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  {/* Heavy metal brushed steel gradient */}
                  <linearGradient id="heavySteel" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="25%" stopColor="#94a3b8" />
                    <stop offset="50%" stopColor="#64748b" />
                    <stop offset="85%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>

                  {/* Golden brass cylinder core */}
                  <linearGradient id="brassCore" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b45309" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.4" />
                  </linearGradient>

                  {/* Gas molecule light glow */}
                  <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Outer metal block casting casing */}
                <rect x="20" y="8" width="8" height="84" fill="url(#heavySteel)" stroke="#000000" strokeWidth="0.8" />
                <rect x="72" y="8" width="8" height="84" fill="url(#heavySteel)" stroke="#000000" strokeWidth="0.8" />
                
                {/* Cylinder bottom cap */}
                <rect x="20" y="88" width="60" height="6" fill="url(#heavySteel)" stroke="#000000" strokeWidth="0.8" />

                {/* Cylinder chamber inside (brass shine) */}
                <rect x="28" y="8" width="44" height="80" fill="url(#brassCore)" />

                {/* Calibration tick marks (measure marks on glass cylinder) */}
                <g opacity="0.6" stroke="#ffffff" strokeWidth="0.8">
                  <line x1="28" y1="20" x2="33" y2="20" /> <text x="35" y="22" fill="#ffffff" fontSize="5" fontWeight="black" fontFamily="monospace">100</text>
                  <line x1="28" y1="36" x2="32" y2="36" /> <text x="35" y="38" fill="#ffffff" fontSize="5" fontWeight="black" fontFamily="monospace">80</text>
                  <line x1="28" y1="52" x2="33" y2="52" /> <text x="35" y="54" fill="#ffffff" fontSize="5" fontWeight="black" fontFamily="monospace">60</text>
                  <line x1="28" y1="68" x2="32" y2="68" /> <text x="35" y="70" fill="#ffffff" fontSize="5" fontWeight="black" fontFamily="monospace">40</text>
                  <line x1="28" y1="84" x2="33" y2="84" /> <text x="35" y="86" fill="#ffffff" fontSize="5" fontWeight="black" fontFamily="monospace">20</text>
                </g>

                {/* Solid Chrome Piston Rod and Head */}
                {/* Rod (Moving dynamically with volume state) */}
                <rect
                  x="47"
                  y={8 + (80 - pistonState.volume) * 0.7 - 25}
                  width="6"
                  height="30"
                  fill="url(#heavySteel)"
                  stroke="#000000"
                  strokeWidth="0.6"
                />
                
                {/* Piston head with black rubber compression rings (Realism detail) */}
                <g transform={`translate(0, ${(80 - pistonState.volume) * 0.7})`}>
                  {/* Metal core */}
                  <rect x="28.5" y="8" width="43" height="10" fill="url(#heavySteel)" stroke="#000000" strokeWidth="0.8" />
                  {/* Rubber seals (black bands) */}
                  <rect x="28.5" y="11" width="43" height="1.8" fill="#0f172a" />
                  <rect x="28.5" y="14.5" width="43" height="1.8" fill="#0f172a" />
                  {/* High reflection white stripe on chrome head */}
                  <rect x="35" y="8.5" width="2" height="9" fill="#ffffff" fillOpacity="0.4" />
                </g>

                {/* Gas molecules with glowing energy halos bouncing */}
                <g opacity="0.85">
                  {/* Pink gas particle 1 */}
                  <circle cx="35" cy={55 + (80 - pistonState.volume) * 0.3} r="3" fill="#ec4899" />
                  <circle cx="35" cy={55 + (80 - pistonState.volume) * 0.3} r="6" fill="url(#particleGlow)" />

                  {/* Purple gas particle 2 */}
                  <circle cx="62" cy={72 + (80 - pistonState.volume) * 0.12} r="3.2" fill="#a855f7" />

                  {/* Cyan gas particle 3 */}
                  <circle cx="48" cy={42 + (80 - pistonState.volume) * 0.4} r="2.8" fill="#06b6d4" />

                  {/* Orange gas particle 4 */}
                  <circle cx="56" cy={65 + (80 - pistonState.volume) * 0.22} r="3" fill="#f97316" />

                  {/* Green gas particle 5 */}
                  <circle cx="34" cy={33 + (80 - pistonState.volume) * 0.48} r="2.5" fill="#10b981" />
                </g>
              </svg>

              {/* Status overlay banner */}
              <div className="absolute bottom-2.5 left-2.5 bg-purple-950/80 border border-purple-400 rounded-lg px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-purple-400">
                Khí tích: {pistonState.volume}%
              </div>
            </div>

            {/* Interactive sliders or buttons */}
            <div className="flex flex-col gap-2.5 w-full">
              <div className="flex justify-between gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setPistonState((prev) => {
                      const nextVol = Math.max(40, prev.volume - 15);
                      const ratio = prev.volume / nextVol;
                      return {
                        volume: nextVol,
                        temp: Math.round(prev.temp * Math.pow(ratio, 0.4)), // adiabatic ratio T2 = T1 * (V1/V2)^(gamma-1)
                        pressure: prev.pressure * Math.pow(ratio, 1.4),
                      };
                    });
                  }}
                  className="flex-1 px-2 py-2 bg-purple-500 hover:bg-purple-400 border-2 border-slate-900 rounded-xl text-[10px] text-slate-950 font-black tracking-wide transition-all shadow-[2px_2px_0px_0px_#6d28d9] hover:shadow-[1px_1px_0px_0px_#6d28d9] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer text-center"
                >
                  Nén nhanh (W &gt; 0)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPistonState((prev) => {
                      const nextVol = Math.min(100, prev.volume + 15);
                      const ratio = prev.volume / nextVol;
                      return {
                        volume: nextVol,
                        temp: Math.round(prev.temp * Math.pow(ratio, 0.4)),
                        pressure: prev.pressure * Math.pow(ratio, 1.4),
                      };
                    });
                  }}
                  className="flex-1 px-2 py-2 bg-white hover:bg-slate-50 border-2 border-slate-900 rounded-xl text-[10px] text-slate-800 font-black tracking-wide transition-all shadow-[2px_2px_0px_0px_#64748b] hover:shadow-[1px_1px_0px_0px_#64748b] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer text-center"
                >
                  Giãn nở (W &lt; 0)
                </button>
              </div>
              <button
                type="button"
                onClick={() => setPistonState({ volume: 100, temp: 300, pressure: 1.0 })}
                className="w-full py-1 border-2 border-slate-300 rounded-xl text-[9px] text-slate-500 font-bold hover:bg-slate-50 cursor-pointer transition-colors"
              >
                Khôi phục trạng thái ban đầu
              </button>
            </div>
          </div>
        );

      case "thermometer":
        return (
          <div className="flex flex-col items-center p-4.5 bg-gradient-to-b from-slate-50 to-slate-100/80 border-2 border-slate-900 rounded-2xl max-w-xs mx-auto space-y-4 shadow-[5px_5px_0px_0px_#e11d48]">
            <div className="flex justify-between items-center w-full">
              <span className="text-[11px] font-black uppercase text-rose-950 tracking-wider">Mô phỏng Thang đo nhiệt độ</span>
              <span className="text-[10px] font-black font-mono bg-white border-2 border-slate-900 px-2 py-0.5 rounded-lg text-rose-800 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                t = {thermoVal} °C | T = {thermoVal + 273} K
              </span>
            </div>

            {/* Realistic Thermometer mounting visualizer */}
            <div className="relative w-full h-28 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-900 rounded-xl p-3.5 flex items-center gap-4 shadow-inner">
              <div className="flex-1 flex flex-col justify-center space-y-1.5">
                <span className="text-[9px] text-rose-400 font-black uppercase tracking-wider block">Kéo để đo nhiệt lượng:</span>
                <input
                  type="range"
                  min="-50"
                  max="150"
                  value={thermoVal}
                  onChange={(e) => setThermoVal(parseInt(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[8px] font-mono font-black text-slate-400">
                  <span>-50°C</span>
                  <span>0°C</span>
                  <span>50°C</span>
                  <span>100°C</span>
                  <span>150°C</span>
                </div>
              </div>

              {/* Photographic-style glass laboratory thermometer */}
              <div className="w-14 h-24 relative flex justify-center bg-[#854d0e]/20 border border-[#a16207]/30 rounded-xl p-1.5 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.8)]">
                {/* Board scale markers */}
                <div className="absolute left-2.5 top-2.5 bottom-6 flex flex-col justify-between text-[6px] font-black font-mono text-[#fef08a] opacity-80 select-none">
                  <span>150</span>
                  <span>100</span>
                  <span>50</span>
                  <span>0</span>
                  <span>-50</span>
                </div>

                {/* Glass capillary tube housing */}
                <div className="w-3.5 h-18 bg-white/10 border border-white/25 rounded-t-full absolute top-1.5 flex flex-col items-center justify-end overflow-hidden shadow-inner">
                  {/* Red Alcohol expansion liquid */}
                  <div
                    className="w-1.5 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-600 rounded-t-sm transition-all duration-150 relative"
                    style={{ height: `${((thermoVal + 50) / 200) * 100}%` }}
                  >
                    {/* Gloss shine inside liquid column */}
                    <div className="absolute right-[1px] top-0 bottom-0 w-[2px] bg-white opacity-40 rounded-full" />
                  </div>
                </div>
                
                {/* Rounded mercury reservoir glass bulb at bottom */}
                <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-tr from-rose-600 via-rose-400 to-rose-700 border-2 border-white/30 absolute bottom-1.5 shadow-md flex items-center justify-center">
                  {/* Specs of shine */}
                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80 absolute top-1 left-1" />
                </div>
              </div>
            </div>

            <div className="text-[10px] leading-relaxed text-rose-950 font-black bg-rose-50 border-2 border-rose-200 px-3 py-1.5 rounded-xl text-center w-full shadow-sm">
              {thermoVal <= 0 ? "❄️ Trạng thái đóng băng (Dưới 0 °C)" : thermoVal >= 100 ? "🔥 Trạng thái hơi sôi hóa (Trên 100 °C)" : "💧 Trạng thái lỏng ổn định"}
            </div>
          </div>
        );

      case "tire":
        return (
          <div className="flex flex-col items-center p-4.5 bg-gradient-to-b from-slate-50 to-slate-100/80 border-2 border-slate-900 rounded-2xl max-w-xs mx-auto space-y-4 shadow-[5px_5px_0px_0px_#d97706]">
            <div className="flex justify-between items-center w-full">
              <span className="text-[11px] font-black uppercase text-amber-950 tracking-wider">Mô phỏng lốp xe phơi nắng</span>
              <span className="text-[11px] font-black font-mono bg-white border-2 border-slate-900 px-2.5 py-1 rounded-lg text-amber-800 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                T = {tireState.temp} °C
              </span>
            </div>

            {/* Photographic-style Vulcanized Rubber Tire SVG container */}
            <div className="relative w-44 h-44 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  {/* Sun Flare realism */}
                  <radialGradient id="sunFlare" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                    <stop offset="25%" stopColor="#f97316" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                  </radialGradient>
                  
                  {/* Tire depth rubber texture */}
                  <radialGradient id="rubberGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="60%" stopColor="#1e293b" />
                    <stop offset="85%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020617" />
                  </radialGradient>

                  {/* Chrome alloy wheel rim */}
                  <radialGradient id="alloyRim" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f1f5f9" />
                    <stop offset="45%" stopColor="#94a3b8" />
                    <stop offset="70%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#475569" />
                  </radialGradient>
                </defs>

                {/* Heat haze atmospheric waves on pavement */}
                {tireState.isHot && (
                  <g opacity="0.4" stroke="#f97316" strokeWidth="1" strokeLinecap="round" fill="none">
                    <path d="M 10 90 Q 20 84 30 90" />
                    <path d="M 35 91 Q 45 85 55 91" />
                    <path d="M 60 90 Q 70 84 80 90" />
                    <path d="M 15 85 Q 25 80 35 85" opacity="0.6" />
                    <path d="M 45 86 Q 55 81 65 86" opacity="0.6" />
                  </g>
                )}

                {/* Asphalt road base */}
                <rect x="0" y="82" width="100" height="18" fill="#1e293b" />
                <line x1="0" y1="82" x2="100" y2="82" stroke="#0f172a" strokeWidth="1.2" />

                {/* Giant Sun flares casting down on hot tire */}
                {tireState.isHot && (
                  <g transform="translate(80, 20)">
                    <circle cx="0" cy="0" r="18" fill="url(#sunFlare)" />
                    {/* Rays */}
                    <line x1="0" y1="-25" x2="0" y2="-12" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="5,2" />
                    <line x1="0" y1="12" x2="0" y2="25" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="5,2" />
                    <line x1="-25" y1="0" x2="-12" y2="0" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="5,2" />
                    <line x1="12" y1="0" x2="25" y2="0" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="5,2" />
                  </g>
                )}

                {/* Outer Tire Tire Tread Block */}
                <circle cx="50" cy="50" r="35" fill="url(#rubberGrad)" stroke="#090d16" strokeWidth="1.2" />

                {/* Photographic tire tread textures grooves cuts around wheel (Realism aspect) */}
                <g stroke="#090d16" strokeWidth="2" opacity="0.8">
                  {/* Dynamic circular array approximations via ticks */}
                  <line x1="50" y1="11" x2="50" y2="15" />
                  <line x1="50" y1="85" x2="50" y2="89" />
                  <line x1="11" y1="50" x2="15" y2="50" />
                  <line x1="85" y1="50" x2="89" y2="50" />
                  {/* Diagonal treads */}
                  <line x1="22" y1="22" x2="26" y2="26" />
                  <line x1="74" y1="74" x2="78" y2="78" />
                  <line x1="74" y1="22" x2="70" y2="26" />
                  <line x1="22" y1="74" x2="26" y2="70" />
                </g>

                {/* Inner Tire Sidewall core */}
                <circle cx="50" cy="50" r="26" fill="#111827" />
                
                {/* Tire Specs labels text printed on rubber (Realistic detailing) */}
                <text x="32" y="32" fill="#4b5563" fontSize="2.8" fontWeight="black" fontFamily="sans-serif">205/55 R16</text>
                <text x="36" y="70" fill="#4b5563" fontSize="2.5" fontWeight="black" fontFamily="sans-serif">MAX PRESS 40 PSI</text>

                {/* Alloy Wheel Rim Chrome */}
                <circle cx="50" cy="50" r="18" fill="url(#alloyRim)" stroke="#0f172a" strokeWidth="0.8" />
                
                {/* 5-Spoke metallic layout structure of real car alloy */}
                <g stroke="#475569" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="50" y1="50" x2="50" y2="34" />
                  <line x1="50" y1="50" x2="65" y2="42" />
                  <line x1="50" y1="50" x2="59" y2="62" />
                  <line x1="50" y1="50" x2="41" y2="62" />
                  <line x1="50" y1="50" x2="35" y2="42" />
                </g>
                <circle cx="50" cy="50" r="5" fill="url(#alloyRim)" stroke="#0f172a" strokeWidth="1" />
                {/* Center wheel hub caps bolts */}
                <circle cx="50" cy="50" r="1.5" fill="#1e293b" />
              </svg>

              {/* Pressure gauge digital window */}
              <div className="absolute bottom-2.5 right-2.5 bg-slate-900 border-2 border-slate-700 text-amber-400 px-2 py-0.5 rounded-lg text-[9px] font-mono font-black shadow-[0px_0px_5px_rgba(245,158,11,0.3)]">
                P = {tireState.pressure.toFixed(1)} bar
              </div>
            </div>

            {/* Control buttons */}
            <div className="flex gap-2.5 w-full">
              <button
                type="button"
                onClick={() => {
                  setTireState({
                    isHot: true,
                    temp: 55,
                    pressure: 2.6,
                  });
                }}
                className="flex-1 px-3 py-2 bg-amber-500 hover:bg-amber-400 border-2 border-slate-900 rounded-xl text-[10px] text-slate-950 font-black tracking-wide transition-all shadow-[2px_2px_0px_0px_#b45309] hover:shadow-[1px_1px_0px_0px_#b45309] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer text-center"
              >
                🌞 Phơi nắng trưa
              </button>
              <button
                type="button"
                onClick={() => {
                  setTireState({
                    isHot: false,
                    temp: 30,
                    pressure: 2.2,
                  });
                }}
                className="flex-1 px-3 py-2 bg-white hover:bg-slate-50 border-2 border-slate-900 rounded-xl text-[10px] text-slate-800 font-black tracking-wide transition-all shadow-[2px_2px_0px_0px_#64748b] hover:shadow-[1px_1px_0px_0px_#64748b] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer text-center"
              >
                ❄️ Đưa vào râm mát
              </button>
            </div>
            {tireState.isHot && (
              <div className="text-[9px] text-red-900 bg-red-50 border border-red-200 px-3 py-2 rounded-xl w-full flex items-start gap-1.5 font-bold leading-relaxed">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                <span>Thể tích lốp không đổi. Nhiệt độ tăng mạnh khiến áp suất tăng cao đột ngột (Nguy cơ nổ lốp).</span>
              </div>
            )}
          </div>
        );

      case "balloon":
        return (
          <div className="flex flex-col items-center p-4.5 bg-gradient-to-b from-slate-50 to-slate-100/80 border-2 border-slate-900 rounded-2xl max-w-xs mx-auto space-y-4 shadow-[5px_5px_0px_0px_#0ea5e9]">
            <div className="flex justify-between items-center w-full">
              <span className="text-[11px] font-black uppercase text-sky-950 tracking-wider">Mô phỏng bóng dãn nở nhiệt</span>
              <span className="text-[10px] font-black font-mono bg-white border-2 border-slate-900 px-2 py-0.5 rounded-lg text-sky-800 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                V ≈ {(4 / 3 * Math.PI * Math.pow(balloonState.size / 10, 3)).toFixed(0)} cm³
              </span>
            </div>

            {/* High-Gloss Photorealistic Shiny Latex Balloon SVG container */}
            <div className="relative w-44 h-44 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  {/* Gloss 3D Latex Balloon shading */}
                  <radialGradient id="balloonGloss" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#ff85a1" />
                    <stop offset="40%" stopColor="#f43f5e" />
                    <stop offset="85%" stopColor="#be123c" />
                    <stop offset="100%" stopColor="#4c0519" />
                  </radialGradient>
                  
                  {/* Highlight window reflection (Realism visual aspect) */}
                  <linearGradient id="specularReflect" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Basket String and Knot */}
                <path d="M 50 72 L 50 96" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2" />
                
                {/* Shiny balloon body */}
                <g>
                  {/* Balloon knot base */}
                  <path d="M 47 70 L 53 70 L 51 75 L 49 75 Z" fill="#be123c" stroke="#4c0519" strokeWidth="0.8" />

                  {/* Pear latex balloon spherical shape (Adjust size based on temperature slider) */}
                  <ellipse
                    cx="50"
                    cy="43"
                    rx={balloonState.size * 0.42}
                    ry={balloonState.size * 0.46}
                    fill="url(#balloonGloss)"
                    stroke="#4c0519"
                    strokeWidth="1"
                  />

                  {/* Gloss highlight reflection on left shoulder (Realism detail) */}
                  <ellipse
                    cx={50 - balloonState.size * 0.16}
                    cy={43 - balloonState.size * 0.18}
                    rx={balloonState.size * 0.12}
                    ry={balloonState.size * 0.08}
                    fill="url(#specularReflect)"
                    transform={`rotate(-25 ${50 - balloonState.size * 0.16} ${43 - balloonState.size * 0.18})`}
                  />

                  {/* Secondary specular crescent reflection line */}
                  <path
                    d={`M ${50 + balloonState.size * 0.28} ${43 + balloonState.size * 0.12} 
                        A ${balloonState.size * 0.42} ${balloonState.size * 0.46} 0 0 1 ${50 + balloonState.size * 0.15} ${43 + balloonState.size * 0.35}`}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                </g>
              </svg>

              <div className="absolute top-2.5 left-2.5 bg-sky-950/80 border border-sky-400 rounded-lg px-2.5 py-0.5 text-[9px] font-mono font-black text-sky-400 tracking-wider">
                t = {balloonState.temp} °C
              </div>
            </div>

            {/* Sliders to increase temperature */}
            <div className="flex flex-col gap-1.5 w-full">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider">Nhiệt độ không khí (°C):</span>
              <input
                type="range"
                min="20"
                max="80"
                value={balloonState.temp}
                onChange={(e) => {
                  const t = parseInt(e.target.value);
                  setBalloonState({
                    temp: t,
                    size: 60 + (t - 20) * 0.4, // expansion factor
                  });
                }}
                className="w-full accent-sky-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const model = renderIllustration();
  if (!model) return null;

  return (
    <div className="my-5 flex justify-center">
      {model}
    </div>
  );
}
