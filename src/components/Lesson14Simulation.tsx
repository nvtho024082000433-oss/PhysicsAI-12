import React, { useState } from "react";
import { 
  Compass, 
  Settings, 
  Zap, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Info, 
} from "lucide-react";

export default function Lesson14Simulation() {
  const [simType, setSimType] = useState<"magnet-magnet" | "magnet-current" | "current-current">("magnet-magnet");
  const [showFieldLines, setShowFieldLines] = useState(true);
  
  // Magnet-Magnet state
  const [magnet1Polarity, setMagnet1Polarity] = useState<"normal" | "reversed">("normal"); // normal: N-S, reversed: S-N
  const [magnet2Polarity, setMagnet2Polarity] = useState<"normal" | "reversed">("normal");
  const [magnetDistance, setMagnetDistance] = useState<number>(100); // 70 to 140

  // Magnet-Current state
  const [magnetCurrentPolarity, setMagnetCurrentPolarity] = useState<"normal" | "reversed">("normal");
  const [wireCurrent, setWireCurrent] = useState<number>(2); // -5 to 5 A
  const [magnetWireDistance, setMagnetWireDistance] = useState<number>(80);

  // Current-Current state
  const [current1, setCurrent1] = useState<number>(3); // -5 to 5 A
  const [current2, setCurrent2] = useState<number>(3); // -5 to 5 A
  const [wiresDistance, setWiresDistance] = useState<number>(90);

  // Calculate forces dynamically
  let magnetMagnetForce = 0;
  let mmForceDirection: "attract" | "repel" = "repel";
  if (simType === "magnet-magnet") {
    const isM1NLeft = magnet1Polarity === "normal"; // Normal: N is Left, S is Right
    const isM2NLeft = magnet2Polarity === "normal"; // Normal: N is Left, S is Right
    
    // Facing poles are: Right side of M1 and Left side of M2
    const m1FacingPole = isM1NLeft ? "S" : "N";
    const m2FacingPole = isM2NLeft ? "N" : "S";

    if (m1FacingPole !== m2FacingPole) {
      mmForceDirection = "attract";
    } else {
      mmForceDirection = "repel";
    }
    // Calculate force magnitude
    magnetMagnetForce = Math.round((12000 / (magnetDistance * magnetDistance)) * 10) / 10;
  }

  // Magnet-Current (Oersted / Force)
  let magnetCurrentForce = 0;
  let mcForceDirection: "up" | "down" | "none" = "none";
  if (simType === "magnet-current") {
    const isNormalMagnet = magnetCurrentPolarity === "normal";
    if (wireCurrent > 0) {
      mcForceDirection = isNormalMagnet ? "down" : "up";
    } else if (wireCurrent < 0) {
      mcForceDirection = isNormalMagnet ? "up" : "down";
    } else {
      mcForceDirection = "none";
    }
    magnetCurrentForce = Math.round(Math.abs(wireCurrent) * (150 / magnetWireDistance) * 10) / 10;
  }

  // Current-Current
  let currentCurrentForce = 0;
  let ccForceDirection: "attract" | "repel" | "none" = "none";
  if (simType === "current-current") {
    if (current1 === 0 || current2 === 0) {
      ccForceDirection = "none";
    } else if ((current1 > 0 && current2 > 0) || (current1 < 0 && current2 < 0)) {
      ccForceDirection = "attract";
    } else {
      ccForceDirection = "repel";
    }
    currentCurrentForce = Math.round((Math.abs(current1 * current2) * 80 / wiresDistance) * 10) / 10;
  }

  return (
    <div className="bg-slate-100/90 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 md:p-6 text-slate-900 font-sans shadow-md relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

      {/* Header Panel */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-200 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-950 flex items-center gap-2">
            <Compass className="h-5 w-5 text-cyan-600 animate-spin-slow" />
            PHÒNG THÍ NGHIỆM TƯƠNG TÁC TỪ & ĐƯỜNG SỨC TỰ ĐỘNG
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 font-bold leading-relaxed">
            Khảo sát sự tương tác lực và mạng lưới đường sức từ trực quan sinh động của nam châm và dòng điện
          </p>
        </div>

        {/* Global Controls */}
        <button
          onClick={() => setShowFieldLines(!showFieldLines)}
          id="toggle-field-lines-btn"
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black border-2 transition-all cursor-pointer shadow-sm ${
            showFieldLines
              ? "bg-cyan-50 border-cyan-300 text-cyan-900"
              : "bg-white border-slate-200 text-slate-500"
          }`}
        >
          {showFieldLines ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          {showFieldLines ? "Đang Hiện Đường Sức" : "Đang Ẩn Đường Sức"}
        </button>
      </div>

      {/* Simulation Selector Tabs */}
      <div className="relative z-10 grid grid-cols-3 gap-2 bg-slate-200/80 p-1.5 rounded-2xl border-2 border-slate-300 mt-4 select-none">
        <button
          onClick={() => setSimType("magnet-magnet")}
          id="tab-magnet-magnet"
          className={`py-2.5 px-1 text-[11px] md:text-xs font-black tracking-tight rounded-xl transition-all cursor-pointer ${
            simType === "magnet-magnet"
              ? "bg-white text-slate-950 shadow-md border-2 border-slate-300"
              : "text-slate-600 hover:text-slate-950 hover:bg-white/50"
          }`}
        >
          🧲 Nam Châm — Nam Châm
        </button>
        <button
          onClick={() => setSimType("magnet-current")}
          id="tab-magnet-current"
          className={`py-2.5 px-1 text-[11px] md:text-xs font-black tracking-tight rounded-xl transition-all cursor-pointer ${
            simType === "magnet-current"
              ? "bg-white text-slate-950 shadow-md border-2 border-slate-300"
              : "text-slate-600 hover:text-slate-950 hover:bg-white/50"
          }`}
        >
          ⚡ Nam Châm — Dòng Điện
        </button>
        <button
          onClick={() => setSimType("current-current")}
          id="tab-current-current"
          className={`py-2.5 px-1 text-[11px] md:text-xs font-black tracking-tight rounded-xl transition-all cursor-pointer ${
            simType === "current-current"
              ? "bg-white text-slate-950 shadow-md border-2 border-slate-300"
              : "text-slate-600 hover:text-slate-950 hover:bg-white/50"
          }`}
        >
          🔗 Dòng Điện — Dòng Điện
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 bg-slate-950 rounded-3xl border-2 border-slate-300 shadow-inner h-72 md:h-80 mt-5 relative overflow-hidden flex items-center justify-center">
        {/* Status Force Overlay Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/95 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-mono shadow-md z-20">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-300 font-bold">Lực từ tương tác: </span>
          <strong className="text-emerald-400 font-black">
            {simType === "magnet-magnet" && `${magnetMagnetForce} N (${mmForceDirection === "attract" ? "Lực Hút" : "Lực Đẩy"})`}
            {simType === "magnet-current" && (
              magnetCurrentForce > 0 
                ? `${magnetCurrentForce} N (${mcForceDirection === "up" ? "Đẩy Lên" : "Đẩy Xuống"})` 
                : "0 N (Không có tương tác)"
            )}
            {simType === "current-current" && (
              currentCurrentForce > 0 
                ? `${currentCurrentForce} N (${ccForceDirection === "attract" ? "Lực Hút" : "Lực Đẩy"})` 
                : "0 N (Không có tương tác)"
            )}
          </strong>
        </div>

        {/* 1. STAGE: MAGNET - MAGNET */}
        {simType === "magnet-magnet" && (
          <svg className="w-full h-full relative z-10" viewBox="0 0 500 300">
            {/* Dynamic magnetic field lines of both magnets */}
            {showFieldLines && (
              <g stroke="#22d3ee" strokeWidth="1.2" opacity="0.45" fill="none" className="transition-all duration-300">
                {/* Left magnet lines */}
                <path d={`M 150,150 C 70,80 70,220 150,150`} strokeDasharray="3,3" />
                <path d={`M 150,150 C 30,50 30,250 150,150`} opacity="0.6" />
                <path d={`M 110,140 C 110,90 150,90 150,140`} />
                <path d={`M 110,160 C 110,210 150,210 150,160`} />

                {/* Right magnet lines (position depends on distance) */}
                <path d={`M ${150 + magnetDistance},150 C ${150 + magnetDistance + 80},80 ${150 + magnetDistance + 80},220 150,150`} strokeDasharray="3,3" />
                <path d={`M ${150 + magnetDistance},150 C ${150 + magnetDistance + 120},50 ${150 + magnetDistance + 120},250 150,150`} opacity="0.6" />
                <path d={`M ${150 + magnetDistance - 40},140 C ${150 + magnetDistance - 40},90 ${150 + magnetDistance},140 150,150`} />
                
                {/* Interactive field lines between them */}
                {mmForceDirection === "attract" ? (
                  // Attracting lines connecting them
                  <g stroke="#10b981" strokeWidth="1.8">
                    <path d={`M 150,150 Q ${150 + magnetDistance/2},110 ${150 + magnetDistance},150`} />
                    <path d={`M 150,150 Q ${150 + magnetDistance/2},190 ${150 + magnetDistance},150`} />
                    <line x1="150" y1="150" x2={150 + magnetDistance} y2="150" strokeWidth="2.5" />
                  </g>
                ) : (
                  // Repelling lines pushing away
                  <g stroke="#f43f5e" strokeWidth="1.5">
                    <path d={`M 150,140 Q ${150 + magnetDistance/3},100 130,50`} />
                    <path d={`M 150,160 Q ${150 + magnetDistance/3},200 130,250`} />
                    <path d={`M ${150 + magnetDistance},140 Q ${150 + magnetDistance * 2/3},100 ${170 + magnetDistance},50`} />
                    <path d={`M ${150 + magnetDistance},160 Q ${150 + magnetDistance * 2/3},200 ${170 + magnetDistance},250`} />
                  </g>
                )}
              </g>
            )}

            {/* FORCE ARROWS */}
            {/* Left magnet force */}
            <g transform="translate(100, 150)">
              <line 
                x1="0" 
                y1="0" 
                x2={mmForceDirection === "attract" ? "35" : "-35"} 
                y2="0" 
                stroke="#10b981" 
                strokeWidth={Math.min(6, 2 + magnetMagnetForce * 0.5)} 
              />
              <polygon 
                points={mmForceDirection === "attract" ? "35,0 27,-4 27,4" : "-35,0 -27,-4 -27,4"} 
                fill="#10b981" 
              />
              <text x={mmForceDirection === "attract" ? "15" : "-45"} y="-10" fill="#10b981" fontSize="10" fontWeight="bold">F</text>
            </g>

            {/* Right magnet force */}
            <g transform={`translate(${150 + magnetDistance + 50}, 150)`}>
              <line 
                x1="0" 
                y1="0" 
                x2={mmForceDirection === "attract" ? "-35" : "35"} 
                y2="0" 
                stroke="#10b981" 
                strokeWidth={Math.min(6, 2 + magnetMagnetForce * 0.5)} 
              />
              <polygon 
                points={mmForceDirection === "attract" ? "-35,0 -27,-4 -27,4" : "35,0 27,-4 27,4"} 
                fill="#10b981" 
              />
              <text x={mmForceDirection === "attract" ? "-25" : "15"} y="-10" fill="#10b981" fontSize="10" fontWeight="bold">F</text>
            </g>

            {/* MAGNET 1 (Left) */}
            <g transform="translate(75, 135)" className="transition-transform duration-300">
              <rect x="0" y="0" width="38" height="30" fill="#dc2626" rx="3" />
              <rect x="38" y="0" width="38" height="30" fill="#2563eb" rx="3" />
              <text x="19" y="19" fill="white" fontSize="12" fontWeight="900" textAnchor="middle">
                {magnet1Polarity === "normal" ? "N" : "S"}
              </text>
              <text x="57" y="19" fill="white" fontSize="12" fontWeight="900" textAnchor="middle">
                {magnet1Polarity === "normal" ? "S" : "N"}
              </text>
              <text x="38" y="-8" fill="#e2e8f0" fontSize="9" fontWeight="black" textAnchor="middle">Nam châm 1</text>
            </g>

            {/* MAGNET 2 (Right, distance is dynamic) */}
            <g transform={`translate(${150 + magnetDistance - 25}, 135)`} className="transition-transform duration-300">
              <rect x="0" y="0" width="38" height="30" fill="#dc2626" rx="3" />
              <rect x="38" y="0" width="38" height="30" fill="#2563eb" rx="3" />
              <text x="19" y="19" fill="white" fontSize="12" fontWeight="900" textAnchor="middle">
                {magnet2Polarity === "normal" ? "N" : "S"}
              </text>
              <text x="57" y="19" fill="white" fontSize="12" fontWeight="900" textAnchor="middle">
                {magnet2Polarity === "normal" ? "S" : "N"}
              </text>
              <text x="38" y="-8" fill="#e2e8f0" fontSize="9" fontWeight="black" textAnchor="middle">Nam châm 2</text>
            </g>
          </svg>
        )}

        {/* 2. STAGE: MAGNET - CURRENT */}
        {simType === "magnet-current" && (
          <svg className="w-full h-full relative z-10" viewBox="0 0 500 300">
            {/* Magnetic field of magnet */}
            {showFieldLines && (
              <g stroke="#22d3ee" strokeWidth="1" opacity="0.4" fill="none">
                <path d={`M 120,150 C 40,80 40,220 120,150`} strokeDasharray="3,3" />
                <path d={`M 120,150 Q ${120 + magnetWireDistance/2},110 ${120 + magnetWireDistance},150`} />
                <path d={`M 120,150 Q ${120 + magnetWireDistance/2},190 ${120 + magnetWireDistance},150`} />
                <line x1="120" y1="150" x2={120 + magnetWireDistance} y2="150" strokeWidth="2" />
              </g>
            )}

            {/* Wire (Vertical Copper color) */}
            <g transform={`translate(${120 + magnetWireDistance}, 0)`}>
              <rect x="-4" y="20" width="8" height="260" fill="#f59e0b" rx="2" />
              {/* Electron current indicators if active */}
              {wireCurrent !== 0 && (
                <g className="animate-pulse">
                  <polygon 
                    points={wireCurrent > 0 ? "0,60 -4,68 4,68" : "0,68 -4,60 4,60"} 
                    fill="#d97706" 
                  />
                  <polygon 
                    points={wireCurrent > 0 ? "0,140 -4,148 4,148" : "0,148 -4,140 4,140"} 
                    fill="#d97706" 
                  />
                  <polygon 
                    points={wireCurrent > 0 ? "0,220 -4,228 4,228" : "0,228 -4,220 4,220"} 
                    fill="#d97706" 
                  />
                </g>
              )}
              <text x="14" y="50" fill="#f59e0b" fontSize="11" fontWeight="900">
                I = {wireCurrent} A
              </text>
              <text x="14" y="65" fill="#cbd5e1" fontSize="9" fontWeight="bold">Dây dẫn mỏng</text>

              {/* FORCE VECTOR ON WIRE */}
              {mcForceDirection !== "none" && (
                <g transform="translate(0, 150)">
                  <line 
                    x1="0" 
                    y1="0" 
                    x2="0" 
                    y2={mcForceDirection === "up" ? "-45" : "45"} 
                    stroke="#10b981" 
                    strokeWidth="4" 
                  />
                  <polygon 
                    points={mcForceDirection === "up" ? "0,-45 -4,-37 4,-37" : "0,45 -4,37 4,37"} 
                    fill="#10b981" 
                  />
                  <text x="10" y={mcForceDirection === "up" ? "-25" : "30"} fill="#10b981" fontSize="12" fontWeight="black">
                    Lực từ F
                  </text>
                </g>
              )}
            </g>

            {/* MAGNET (Left) */}
            <g transform="translate(45, 135)">
              <rect x="0" y="0" width="38" height="30" fill="#dc2626" rx="3" />
              <rect x="38" y="0" width="38" height="30" fill="#2563eb" rx="3" />
              <text x="19" y="19" fill="white" fontSize="12" fontWeight="900" textAnchor="middle">
                {magnetCurrentPolarity === "normal" ? "N" : "S"}
              </text>
              <text x="57" y="19" fill="white" fontSize="12" fontWeight="900" textAnchor="middle">
                {magnetCurrentPolarity === "normal" ? "S" : "N"}
              </text>
              <text x="38" y="-8" fill="#e2e8f0" fontSize="9" fontWeight="black" textAnchor="middle">Nam châm</text>
            </g>
          </svg>
        )}

        {/* 3. STAGE: CURRENT - CURRENT */}
        {simType === "current-current" && (
          <svg className="w-full h-full relative z-10" viewBox="0 0 500 300">
            {/* Concentric magnetic fields surrounding both wires */}
            {showFieldLines && (
              <g stroke="#22d3ee" strokeWidth="1" opacity="0.35" fill="none">
                {/* Wire 1 circles */}
                {current1 !== 0 && (
                  <>
                    <ellipse cx="140" cy="150" rx="35" ry="12" />
                    <ellipse cx="140" cy="150" rx="60" ry="18" />
                  </>
                )}
                {/* Wire 2 circles */}
                {current2 !== 0 && (
                  <>
                    <ellipse cx={`140`} cy="150" rx="35" ry="12" transform={`translate(${wiresDistance}, 0)`} />
                    <ellipse cx={`140`} cy="150" rx="60" ry="18" transform={`translate(${wiresDistance}, 0)`} />
                  </>
                )}
              </g>
            )}

            {/* WIRE 1 (Left) */}
            <g transform="translate(140, 0)">
              <rect x="-4" y="20" width="8" height="260" fill="#ef4444" rx="2" />
              {current1 !== 0 && (
                <polygon 
                  points={current1 > 0 ? "0,60 -4,68 4,68" : "0,68 -4,60 4,60"} 
                  fill="#fecaca" 
                  className="animate-pulse"
                />
              )}
              <text x="-48" y="50" fill="#ef4444" fontSize="11" fontWeight="900">
                I₁ = {current1} A
              </text>

              {/* FORCE VECTOR ON WIRE 1 */}
              {ccForceDirection !== "none" && (
                <g transform="translate(0, 150)">
                  <line 
                    x1="0" 
                    y1="0" 
                    x2={ccForceDirection === "attract" ? wiresDistance/2.5 : -wiresDistance/2.5} 
                    y2="0" 
                    stroke="#10b981" 
                    strokeWidth={Math.min(6, 2 + currentCurrentForce * 0.5)} 
                  />
                  <polygon 
                    points={ccForceDirection === "attract" 
                      ? `${wiresDistance/2.5},0 ${wiresDistance/2.5 - 6},-4 ${wiresDistance/2.5 - 6},4` 
                      : `${-wiresDistance/2.5},0 ${-wiresDistance/2.5 + 6},-4 ${-wiresDistance/2.5 + 6},4`} 
                    fill="#10b981" 
                  />
                  <text x={ccForceDirection === "attract" ? "10" : "-25"} y="-8" fill="#10b981" fontSize="10" fontWeight="bold">
                    F₁
                  </text>
                </g>
              )}
            </g>

            {/* WIRE 2 (Right, dynamic distance) */}
            <g transform={`translate(${140 + wiresDistance}, 0)`}>
              <rect x="-4" y="20" width="8" height="260" fill="#3b82f6" rx="2" />
              {current2 !== 0 && (
                <polygon 
                  points={current2 > 0 ? "0,60 -4,68 4,68" : "0,68 -4,60 4,60"} 
                  fill="#dbeafe" 
                  className="animate-pulse"
                />
              )}
              <text x="14" y="50" fill="#3b82f6" fontSize="11" fontWeight="900">
                I₂ = {current2} A
              </text>

              {/* FORCE VECTOR ON WIRE 2 */}
              {ccForceDirection !== "none" && (
                <g transform="translate(0, 150)">
                  <line 
                    x1="0" 
                    y1="0" 
                    x2={ccForceDirection === "attract" ? -wiresDistance/2.5 : wiresDistance/2.5} 
                    y2="0" 
                    stroke="#10b981" 
                    strokeWidth={Math.min(6, 2 + currentCurrentForce * 0.5)} 
                  />
                  <polygon 
                    points={ccForceDirection === "attract" 
                      ? `${-wiresDistance/2.5},0 ${-wiresDistance/2.5 + 6},-4 ${-wiresDistance/2.5 + 6},4` 
                      : `${wiresDistance/2.5},0 ${wiresDistance/2.5 - 6},-4 ${wiresDistance/2.5 - 6},4`} 
                    fill="#10b981" 
                  />
                  <text x={ccForceDirection === "attract" ? "-25" : "10"} y="-8" fill="#10b981" fontSize="10" fontWeight="bold">
                    F₂
                  </text>
                </g>
              )}
            </g>
          </svg>
        )}
      </div>

      {/* Control Panel Area */}
      <div className="relative z-10 bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 mt-5 space-y-4 shadow-sm">
        <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
          <Settings className="h-4 w-4 text-cyan-600 shrink-0" /> Bảng điều khiển tham số mô phỏng
        </h3>

        {/* 1. CONTROLS: MAGNET - MAGNET */}
        {simType === "magnet-magnet" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
              <label className="text-[11px] text-slate-700 font-black flex justify-between">
                <span>Cực Nam Châm 1:</span>
                <span className="text-rose-600 font-black">
                  {magnet1Polarity === "normal" ? "Trái: N | Phải: S" : "Trái: S | Phải: N"}
                </span>
              </label>
              <button
                onClick={() => setMagnet1Polarity(magnet1Polarity === "normal" ? "reversed" : "normal")}
                id="btn-flip-magnet1"
                className="w-full bg-white hover:bg-slate-50 py-2 rounded-xl text-xs font-black transition-all text-slate-900 border-2 border-slate-200 border-b-4 border-b-slate-300 active:border-b-2 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5 text-cyan-600" /> Đảo Cực Nam Châm 1
              </button>
            </div>

            <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
              <label className="text-[11px] text-slate-700 font-black flex justify-between">
                <span>Cực Nam Châm 2:</span>
                <span className="text-cyan-600 font-black">
                  {magnet2Polarity === "normal" ? "Trái: N | Phải: S" : "Trái: S | Phải: N"}
                </span>
              </label>
              <button
                onClick={() => setMagnet2Polarity(magnet2Polarity === "normal" ? "reversed" : "normal")}
                id="btn-flip-magnet2"
                className="w-full bg-white hover:bg-slate-50 py-2 rounded-xl text-xs font-black transition-all text-slate-900 border-2 border-slate-200 border-b-4 border-b-slate-300 active:border-b-2 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5 text-cyan-600" /> Đảo Cực Nam Châm 2
              </button>
            </div>

            <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
              <label className="text-[11px] text-slate-700 font-black flex justify-between">
                <span>Khoảng cách d:</span>
                <span className="text-emerald-700 font-mono font-black">{magnetDistance} mm</span>
              </label>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="range"
                  min="70"
                  max="140"
                  value={magnetDistance}
                  onChange={(e) => setMagnetDistance(parseInt(e.target.value))}
                  id="input-magnet-distance"
                  className="w-full accent-cyan-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. CONTROLS: MAGNET - CURRENT */}
        {simType === "magnet-current" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
              <label className="text-[11px] text-slate-700 font-black flex justify-between">
                <span>Cực Nam Châm:</span>
                <span className="text-rose-600 font-black">
                  {magnetCurrentPolarity === "normal" ? "N-S (Bên trái)" : "S-N (Bên phải)"}
                </span>
              </label>
              <button
                onClick={() => setMagnetCurrentPolarity(magnetCurrentPolarity === "normal" ? "reversed" : "normal")}
                id="btn-flip-magnet-current"
                className="w-full bg-white hover:bg-slate-50 py-2 rounded-xl text-xs font-black transition-all text-slate-900 border-2 border-slate-200 border-b-4 border-b-slate-300 active:border-b-2 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5 text-cyan-600" /> Đảo Cực Nam Châm
              </button>
            </div>

            <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
              <label className="text-[11px] text-slate-700 font-black flex justify-between">
                <span>Dòng điện dây mỏng I:</span>
                <span className="text-amber-600 font-mono font-black">
                  {wireCurrent > 0 ? `+${wireCurrent} A (LÊN)` : wireCurrent < 0 ? `${wireCurrent} A (XUỐNG)` : "Tắt dòng điện"}
                </span>
              </label>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={wireCurrent}
                onChange={(e) => setWireCurrent(parseInt(e.target.value))}
                id="input-wire-current"
                className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer pt-1"
              />
            </div>

            <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
              <label className="text-[11px] text-slate-700 font-black flex justify-between">
                <span>Vị trí dây d:</span>
                <span className="text-emerald-700 font-mono font-black">{magnetWireDistance} mm</span>
              </label>
              <input
                type="range"
                min="60"
                max="130"
                value={magnetWireDistance}
                onChange={(e) => setMagnetWireDistance(parseInt(e.target.value))}
                id="input-magnet-wire-distance"
                className="w-full accent-cyan-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer pt-1"
              />
            </div>
          </div>
        )}

        {/* 3. CONTROLS: CURRENT - CURRENT */}
        {simType === "current-current" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
              <label className="text-[11px] text-slate-700 font-black flex justify-between">
                <span>Dòng điện Dây 1 I₁:</span>
                <span className="text-rose-600 font-mono font-black">
                  {current1 > 0 ? `+${current1} A (Lên)` : current1 < 0 ? `${current1} A (Xuống)` : "Tắt"}
                </span>
              </label>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={current1}
                onChange={(e) => setCurrent1(parseInt(e.target.value))}
                id="input-current1"
                className="w-full accent-rose-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer pt-1"
              />
            </div>

            <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
              <label className="text-[11px] text-slate-700 font-black flex justify-between">
                <span>Dòng điện Dây 2 I₂:</span>
                <span className="text-blue-600 font-mono font-black">
                  {current2 > 0 ? `+${current2} A (Lên)` : current2 < 0 ? `${current2} A (Xuống)` : "Tắt"}
                </span>
              </label>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={current2}
                onChange={(e) => setCurrent2(parseInt(e.target.value))}
                id="input-current2"
                className="w-full accent-blue-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer pt-1"
              />
            </div>

            <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
              <label className="text-[11px] text-slate-700 font-black flex justify-between">
                <span>Khoảng cách dây d:</span>
                <span className="text-emerald-700 font-mono font-black">{wiresDistance} mm</span>
              </label>
              <input
                type="range"
                min="60"
                max="140"
                value={wiresDistance}
                onChange={(e) => setWiresDistance(parseInt(e.target.value))}
                id="input-wires-distance"
                className="w-full accent-cyan-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer pt-1"
              />
            </div>
          </div>
        )}
      </div>

      {/* Physics Concept Guidelines Footer */}
      <div className="bg-white border-2 border-slate-200 border-b-[6px] border-b-slate-300 p-5 rounded-3xl mt-5 space-y-1.5 flex items-start gap-3 shadow-sm">
        <Info className="h-5 w-5 text-cyan-600 shrink-0 mt-0.5 animate-bounce" />
        <div className="text-xs text-slate-900 leading-relaxed font-semibold">
          <strong className="text-slate-950 font-black">Nhắc nhở Kiến thức:</strong> Trong mọi trường hợp tương tác:
          <ul className="list-disc list-inside mt-1.5 space-y-1.5 pl-1 text-slate-700 font-bold">
            <li>Tương tác từ được truyền qua trung gian vật chất là <strong className="text-slate-950 font-black">Từ trường</strong>.</li>
            <li>Hai dòng điện song song <strong className="text-emerald-700 font-black">cùng chiều hút nhau</strong>, hai dòng điện <strong className="text-rose-700 font-black">ngược chiều đẩy nhau</strong>.</li>
            <li>Khi có dòng điện chạy qua, dây dẫn chịu tác dụng của <strong className="text-slate-950 font-black">lực từ Ampere</strong> vuông góc với vectơ cảm ứng từ và chiều dòng điện.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
