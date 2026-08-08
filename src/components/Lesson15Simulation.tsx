import React, { useState, useEffect } from "react";
import { 
  Play, 
  RotateCcw, 
  Info, 
  Sparkles, 
  TrendingUp, 
  Compass, 
  Plus, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface RecordRow {
  id: number;
  n: number;
  l: number;
  alpha: number;
  I: number;
  F: number;
}

const getHandTransform = (b: "down" | "up" | "into" | "out", i: "left" | "right" | "into" | "out") => {
  const key = `${b}_${i}`;
  switch (key) {
    // 1. B = into (lòng bàn tay ngửa hướng về người xem)
    case "into_up": return "translate(80, 20) rotate(0) scale(1)";
    case "into_down": return "translate(80, 20) rotate(180) scale(1)";
    case "into_left": return "translate(80, 20) rotate(-90) scale(1)";
    case "into_right": return "translate(80, 20) rotate(90) scale(1)";
    case "into_into": return "translate(80, 20) rotate(45) scale(0.8, 0.5)";
    case "into_out": return "translate(80, 20) rotate(-135) scale(0.8, 0.5)";

    // 2. B = out (mu bàn tay hướng về người xem, lật tay)
    case "out_up": return "translate(80, 20) rotate(0) scale(-1, 1)";
    case "out_down": return "translate(80, 20) rotate(180) scale(-1, 1)";
    case "out_left": return "translate(80, 20) rotate(-90) scale(-1, 1)";
    case "out_right": return "translate(80, 20) rotate(90) scale(-1, 1)";
    case "out_into": return "translate(80, 20) rotate(135) scale(-0.8, 0.5)";
    case "out_out": return "translate(80, 20) rotate(-45) scale(-0.8, 0.5)";

    // 3. B = down (lòng bàn tay ngửa lên trên để hứng từ trường đi xuống)
    case "down_left": return "translate(80, 15) rotate(-60) scale(0.95, 0.95)";
    case "down_right": return "translate(110, 10) rotate(-35) scale(0.95, 0.95)";
    case "down_into": return "translate(80, 15) rotate(-30) scale(0.85, 0.6)";
    case "down_out": return "translate(80, 15) rotate(150) scale(0.85, 0.6)";
    case "down_up": return "translate(80, 15) rotate(0) scale(1, 1)";
    case "down_down": return "translate(80, 15) rotate(180) scale(1, 1)";

    // 4. B = up (lòng bàn tay úp xuống dưới để hứng từ trường đi lên)
    case "up_left": return "translate(80, 15) rotate(-120) scale(0.95, -0.95)";
    case "up_right": return "translate(80, 15) rotate(120) scale(0.95, 0.95)";
    case "up_into": return "translate(80, 15) rotate(30) scale(0.85, -0.6)";
    case "up_out": return "translate(80, 15) rotate(-150) scale(0.85, -0.6)";
    case "up_up": return "translate(80, 15) rotate(0) scale(-1, 1)";
    case "up_down": return "translate(80, 15) rotate(180) scale(-1, 1)";

    default: return "translate(80, 20) rotate(0) scale(1)";
  }
};

export default function Lesson15Simulation() {
  const [activeSubTab, setActiveSubTab] = useState<"measurement" | "maglev">("measurement");

  // --- TAB 1: MEASUREMENT SIMULATION ---
  const [nTurns, setNTurns] = useState<number>(200); // 100 - 500 vòng
  const [lengthL, setLengthL] = useState<number>(10); // 5 - 15 cm
  const [alphaDegrees, setAlphaDegrees] = useState<number>(90); // 0 - 180 độ
  const [currentI, setCurrentI] = useState<number>(1.2); // 0.0 - 2.0 A
  const [electromagnetB, setElectromagnetB] = useState<number>(0.15); // 0.05 - 0.3 T (Cảm ứng từ thực của nam châm)
  const [history, setHistory] = useState<RecordRow[]>([]);
  const [showIndicator, setShowIndicator] = useState<boolean>(true);

  // Derived force F = B * (n * I) * (L / 100) * sin(alpha)
  const alphaRad = (alphaDegrees * Math.PI) / 180;
  const lengthMeters = lengthL / 100;
  // nTurns acts as multiplying factor of current since n turns pass through B
  const forceF = electromagnetB * nTurns * currentI * lengthMeters * Math.sin(alphaRad);

  const addRecord = () => {
    // Round to 4 decimal places for precision
    const roundedF = Math.round(forceF * 10000) / 10000;
    const newRecord: RecordRow = {
      id: Date.now(),
      n: nTurns,
      l: lengthL,
      alpha: alphaDegrees,
      I: currentI,
      F: roundedF,
    };
    setHistory([...history, newRecord]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  // --- TAB 2: LEFT HAND RULE TRAINER ---
  const [dirB, setDirB] = useState<"down" | "up" | "into" | "out">("down");
  const [dirI, setDirI] = useState<"left" | "right" | "into" | "out">("right");
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [quizQ, setQuizQ] = useState<{ B: "down" | "up" | "into" | "out"; I: "left" | "right" | "into" | "out"; answer: string }>({ B: "down", I: "right", answer: "up" });
  const [quizFeedback, setQuizFeedback] = useState<{ type: "success" | "error" | null; msg: string }>({ type: null, msg: "" });

  // --- TAB 3: MAGLEV TRAIN SIMULATION ---
  const [maglevCurrent, setMaglevCurrent] = useState<number>(1.6); // 0.5A - 3.0A
  const [maglevWeight, setMaglevWeight] = useState<number>(120); // 80 - 200 kg (Tải trọng tàu)
  const [isGliding, setIsGliding] = useState<boolean>(false);
  const [glideSpeed, setGlideSpeed] = useState<number>(3); // 1 - 5 speed factor
  const [glidePosition, setGlidePosition] = useState<number>(0); // 0 to 100% for animation
  const [showMaglevForces, setShowMaglevForces] = useState<boolean>(true);
  const [maglevMode, setMaglevMode] = useState<"levitation" | "propulsion">("levitation"); // Đang khảo sát nâng hay đẩy

  useEffect(() => {
    let animationFrame: number;
    if (isGliding) {
      const updatePosition = () => {
        setGlidePosition((prev) => (prev + glideSpeed * 0.4) % 100);
        animationFrame = requestAnimationFrame(updatePosition);
      };
      animationFrame = requestAnimationFrame(updatePosition);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isGliding, glideSpeed]);

  const getDirectionVector = (dir: string) => {
    switch (dir) {
      case "left": return [-1, 0, 0];
      case "right": return [1, 0, 0];
      case "up": return [0, 1, 0];
      case "down": return [0, -1, 0];
      case "out": return [0, 0, 1];
      case "into": return [0, 0, -1];
      default: return [0, 0, 0];
    }
  };

  const getDirectionName = (vec: number[]) => {
    const [x, y, z] = vec;
    if (Math.abs(x) > 0.9) return x > 0 ? "right" : "left";
    if (Math.abs(y) > 0.9) return y > 0 ? "up" : "down";
    if (Math.abs(z) > 0.9) return z > 0 ? "out" : "into";
    return "zero";
  };

  const computeForceDirection = (b: string, i: string): string => {
    const vB = getDirectionVector(b);
    const vI = getDirectionVector(i);
    // Cross product: F = I x B
    const fx = vI[1] * vB[2] - vI[2] * vB[1];
    const fy = vI[2] * vB[0] - vI[0] * vB[2];
    const fz = vI[0] * vB[1] - vI[1] * vB[0];

    const magnitude = Math.sqrt(fx * fx + fy * fy + fz * fz);
    if (magnitude < 0.1) return "none"; // Parallel
    return getDirectionName([fx, fy, fz]);
  };

  const resultingForceDir = computeForceDirection(dirB, dirI);

  const translateDirection = (dir: string) => {
    switch (dir) {
      case "left": return "Sang Trái (←)";
      case "right": return "Sang Phải (→)";
      case "up": return "Hướng Lên (↑)";
      case "down": return "Hướng Xuống (↓)";
      case "into": return "Đâm Vào Trong (⊗)";
      case "out": return "Đâm Ra Ngoài (⊙)";
      case "none": return "Bằng 0 (Do dây đặt song song từ trường)";
      default: return "Chưa xác định";
    }
  };

  const generateQuizQuestion = () => {
    const directions: ("down" | "up" | "into" | "out" | "left" | "right")[] = ["down", "up", "into", "out", "left", "right"];
    let randomB = "down";
    let randomI = "right";
    let ans = "none";

    while (ans === "none") {
      randomB = directions[Math.floor(Math.random() * 4)]; // keep B as down, up, into, out
      randomI = directions[Math.floor(Math.random() * directions.length)];
      ans = computeForceDirection(randomB, randomI);
    }

    setQuizQ({
      B: randomB as any,
      I: randomI as any,
      answer: ans,
    });
    setQuizFeedback({ type: null, msg: "" });
  };

  const handleQuizAnswer = (userAns: string) => {
    const isCorrect = userAns === quizQ.answer;
    if (isCorrect) {
      setQuizScore({ correct: quizScore.correct + 1, total: quizScore.total + 1 });
      setQuizFeedback({ type: "success", msg: `Chính xác! Chiều lực từ F quả thực là: ${translateDirection(quizQ.answer)}.` });
    } else {
      setQuizScore({ correct: quizScore.correct, total: quizScore.total + 1 });
      setQuizFeedback({ type: "error", msg: `Chưa đúng rồi! Chiều chính xác là: ${translateDirection(quizQ.answer)}.` });
    }
  };

  useEffect(() => {
    if (quizMode) {
      generateQuizQuestion();
    }
  }, [quizMode]);

  return (
    <div className="bg-sky-50/50 border-2 border-slate-900 rounded-3xl p-5 md:p-6 text-slate-950 font-sans shadow-[6px_6px_0px_0px_#0f172a] relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

      {/* Header Panel */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center border-b-2 border-slate-900 pb-5 gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-950 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-cyan-600" />
            PHÒNG THÍ NGHIỆM LỰC TỪ AMPERE
          </h2>
          <p className="text-xs text-slate-700 mt-0.5 font-bold leading-relaxed">
            Mô phỏng đòn cân dòng điện đo độ lớn cảm ứng từ B và ứng dụng của lực từ (Tàu đệm từ SCMaglev)
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex bg-slate-200 p-1 rounded-2xl border-2 border-slate-900 gap-1.5 select-none shrink-0 shadow-[2px_2px_0px_0px_#000]">
          <button
            onClick={() => { setActiveSubTab("measurement"); setQuizMode(false); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "measurement"
                ? "bg-white text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-950"
                : "text-slate-800 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5 text-cyan-600" />
            Khảo sát đo B
          </button>
          <button
            onClick={() => { setActiveSubTab("maglev"); setQuizMode(false); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "maglev"
                ? "bg-white text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-950"
                : "text-slate-800 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-600 animate-pulse" />
            Tàu đệm từ
          </button>
        </div>
      </div>

      {/* 1. VIEW CONTENT: MEASUREMENT SIMULATION */}
      {activeSubTab === "measurement" && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4 bg-emerald-50 border-2 border-slate-900 rounded-3xl p-5 shadow-[4px_4px_0px_0px_#0f172a] text-slate-950">
            <h3 className="text-xs font-black uppercase text-slate-950 tracking-wider flex items-center gap-1.5 pb-2 border-b-2 border-slate-900/10">
              <Sparkles className="h-4 w-4 text-emerald-700 animate-pulse" />
              Cấu hình đòn cân từ lực
            </h3>

            {/* Slider 1: Number of Turns */}
            <div className="space-y-1 bg-white p-3.5 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between text-[11px] text-slate-900 font-bold">
                <span>Số vòng dây khung dây (<FormattedMathText text="n" />):</span>
                <span className="text-cyan-800 font-mono font-black">{nTurns} vòng</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                step="50"
                value={nTurns}
                onChange={(e) => setNTurns(parseInt(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg pt-1"
              />
            </div>

            {/* Slider 2: Wire length */}
            <div className="space-y-1 bg-white p-3.5 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between text-[11px] text-slate-900 font-bold">
                <span>Chiều dài cạnh khung <FormattedMathText text="l" />:</span>
                <span className="text-cyan-800 font-mono font-black">{lengthL} cm (<FormattedMathText text="l" /> = {lengthMeters.toFixed(2)} m)</span>
              </div>
              <input
                type="range"
                min="5"
                max="15"
                step="1"
                value={lengthL}
                onChange={(e) => setLengthL(parseInt(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg pt-1"
              />
            </div>

            {/* Slider 3: Cảm ứng từ B */}
            <div className="space-y-1 bg-white p-3.5 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between text-[11px] text-slate-900 font-bold">
                <span>Cảm ứng từ của nam châm (<FormattedMathText text="B" />):</span>
                <span className="text-cyan-800 font-mono font-black">{electromagnetB.toFixed(2)} T</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.30"
                step="0.01"
                value={electromagnetB}
                onChange={(e) => setElectromagnetB(parseFloat(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg pt-1"
              />
            </div>

            {/* Slider 4: Cường độ dòng điện */}
            <div className="space-y-1 bg-white p-3.5 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between text-[11px] text-slate-900 font-bold">
                <span>Cường độ dòng điện qua khung <FormattedMathText text="I" />:</span>
                <span className="text-amber-800 font-mono font-black">{currentI.toFixed(1)} A</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="2.0"
                step="0.1"
                value={currentI}
                onChange={(e) => setCurrentI(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg pt-1"
              />
            </div>

            {/* Slider 5: Angle alpha */}
            <div className="space-y-1 bg-white p-3.5 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between text-[11px] text-slate-900 font-bold">
                <span>Góc đặt khung dây so với <FormattedMathText text="B" /> (<FormattedMathText text="\alpha" />):</span>
                <span className="text-cyan-800 font-mono font-black">{alphaDegrees}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                step="15"
                value={alphaDegrees}
                onChange={(e) => setAlphaDegrees(parseInt(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg pt-1"
              />
            </div>

            {/* Current measurements read-outs */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-amber-100 p-3.5 rounded-2xl border-2 border-slate-900 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-[10px] text-slate-800 font-black block uppercase">Lực kế (<FormattedMathText text="F" />)</span>
                <span className="text-base font-black text-amber-950 font-mono">{forceF.toFixed(4)} N</span>
              </div>
              <div className="bg-sky-100 p-3.5 rounded-2xl border-2 border-slate-900 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-[10px] text-slate-800 font-black block uppercase">Thương số <FormattedMathText text="F / (I * n * l)" /></span>
                <span className="text-base font-black text-cyan-950 font-mono">
                  {currentI > 0 && Math.sin(alphaRad) > 0.01 
                    ? (forceF / (currentI * nTurns * lengthMeters)).toFixed(3) 
                    : "---"}{" "}
                  <span className="text-[10px] font-black text-slate-600">T</span>
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={addRecord}
                className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 border-2 border-slate-900 font-black text-xs rounded-xl cursor-pointer transition-all shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#000] flex items-center justify-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Ghi số liệu cân dòng
              </button>
              <button
                onClick={clearHistory}
                className="p-3 bg-rose-100 border-2 border-slate-900 hover:bg-rose-200 text-rose-850 rounded-xl transition-all cursor-pointer shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#000]"
                title="Xóa lịch sử số liệu"
              >
                <Trash2 className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Interactive Graphical Diagram Panel */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="bg-white p-4 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] relative flex flex-col items-center justify-center h-[280px]">
              <span className="absolute top-3 left-3 text-[10px] font-mono text-slate-600 uppercase font-black z-20 bg-white/80 px-2 py-0.5 rounded border border-slate-300">
                Sơ đồ động đòn cân dòng điện
              </span>

              {/* Dynamic SVG Lab Setup Illustration */}
              <svg viewBox="0 0 400 240" className="w-full h-full max-h-[250px] relative z-10 text-slate-950">
                <rect width="100%" height="100%" fill="#f8fafc" rx="8" />

                {/* Grid backdrop */}
                <g className="opacity-10">
                  <line x1="0" y1="40" x2="400" y2="40" stroke="#000" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="0" y1="80" x2="400" y2="80" stroke="#000" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="#000" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="0" y1="160" x2="400" y2="160" stroke="#000" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="#000" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="80" y1="0" x2="80" y2="240" stroke="#000" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="160" y1="0" x2="160" y2="240" stroke="#000" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="240" y1="0" x2="240" y2="240" stroke="#000" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="320" y1="0" x2="320" y2="240" stroke="#000" strokeWidth="0.5" strokeDasharray="2,2" />
                </g>

                {/* Balance Beam Stand (Đòn cân) */}
                <line x1="80" y1="120" x2="320" y2="120" stroke="#0f172a" strokeWidth="6" />
                {/* Fulcrum (Khớp nối) */}
                <polygon points="200,120 192,160 208,160" fill="#475569" stroke="#0f172a" strokeWidth="1.5" />
                <line x1="200" y1="50" x2="200" y2="120" stroke="#0f172a" strokeWidth="4" />

                {/* Left weight tray / Force dynamometer */}
                <line x1="100" y1="120" x2="100" y2="170" stroke="#475569" strokeWidth="2" />
                <circle cx="100" cy="180" r="10" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
                <rect x="94" y="130" width="12" height="30" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                <line x1="100" y1="135" x2="100" y2="155" stroke="#ea580c" strokeWidth="3" />

                {/* Right Wire coil hanging */}
                <line x1="300" y1="120" x2="300" y2="160" stroke="#475569" strokeWidth="2" />
                
                {/* Hanging Frame Wire Coil */}
                {(() => {
                  const displacement = forceF * 120;
                  const frameY = 160 + displacement;
                  return (
                    <g className="transition-all duration-300">
                      {/* Wire coil frame */}
                      <rect
                        x="275"
                        y={frameY}
                        width="50"
                        height="40"
                        fill="none"
                        stroke="#b45309"
                        strokeWidth="4"
                        strokeDasharray={nTurns > 300 ? "none" : "4, 2"}
                        rx="2"
                      />
                      <line x1="275" y1={frameY + 40} x2="325" y2={frameY + 40} stroke="#dc2626" strokeWidth="6" />
                      <text x="332" y={frameY + 43} fill="#9a3412" className="text-[10px] font-black font-mono">l = {lengthL}cm</text>
                      
                      {currentI > 0 && (
                        <path
                          d={`M 270,${frameY + 15} L 270,${frameY + 30}`}
                          fill="none"
                          stroke="#16a34a"
                          strokeWidth="2.5"
                          markerEnd="url(#arrowI_sim)"
                        />
                      )}
                    </g>
                  );
                })()}

                {/* Electromagnet Poles */}
                <path d="M 255,180 L 255,220 L 345,220 L 345,180" fill="none" stroke="#475569" strokeWidth="16" strokeLinecap="square" />
                <rect x="247" y="165" width="16" height="20" fill="#dc2626" rx="2" stroke="#0f172a" strokeWidth="1.5" />
                <text x="251" y="179" fill="#ffffff" className="text-[10px] font-black font-mono">N</text>
                <rect x="337" y="165" width="16" height="20" fill="#2563eb" rx="2" stroke="#0f172a" strokeWidth="1.5" />
                <text x="341" y="179" fill="#ffffff" className="text-[10px] font-black font-mono">S</text>

                {/* Magnetic Field Lines inside */}
                {showIndicator && (
                  <g className="opacity-90">
                    <line x1="265" y1="175" x2="335" y2="175" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="5,4" />
                    <polygon points="305,171 313,175 305,179" fill="#0284c7" />
                    <text x="282" y="168" fill="#0284c7" className="text-[9px] font-mono font-black">Từ trường B</text>
                  </g>
                )}

                {/* Display Force vector */}
                {Math.abs(forceF) > 0.001 && (
                  <g className="transition-all duration-300">
                    <line
                      x1="300"
                      y1={160 + forceF * 120 + 40}
                      x2="300"
                      y2={160 + forceF * 120 + 40 + (forceF > 0 ? 35 : -35)}
                      stroke="#ea580c"
                      strokeWidth="4"
                    />
                    <polygon
                      points={
                        forceF > 0
                          ? `295,${160 + forceF * 120 + 70} 300,${160 + forceF * 120 + 78} 305,${160 + forceF * 120 + 70}`
                          : `295,${160 + forceF * 120 + 10} 300,${160 + forceF * 120 + 2} 305,${160 + forceF * 120 + 10}`
                      }
                      fill="#ea580c"
                    />
                    <text x="312" y={160 + forceF * 120 + 40 + (forceF > 0 ? 28 : -18)} fill="#ea580c" className="text-[10px] font-black font-mono bg-white px-1 rounded border border-orange-200">
                      F = {forceF.toFixed(4)} N
                    </text>
                  </g>
                )}

                {/* Power supply box */}
                <rect x="10" y="10" width="130" height="42" fill="#ffffff" rx="6" stroke="#0f172a" strokeWidth="2" shadow="sm" />
                <text x="18" y="24" fill="#0f172a" className="text-[9px] font-mono font-black">NGUỒN ĐIỆN DC</text>
                <text x="18" y="39" fill="#16a34a" className="text-[11px] font-mono font-black">I = {currentI.toFixed(1)} A</text>
              </svg>

              <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                <button
                  onClick={() => setShowIndicator(!showIndicator)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-black border-2 transition-all cursor-pointer ${
                    showIndicator
                      ? "bg-cyan-100 text-cyan-950 border-cyan-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-slate-100 text-slate-500 border-slate-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  {showIndicator ? "Ẩn từ trường B" : "Hiện từ trường B"}
                </button>
              </div>
            </div>

            {/* History Table & Real-time verification */}
            <div className="bg-sky-50 border-2 border-slate-900 rounded-3xl p-5 shadow-[4px_4px_0px_0px_#0f172a] space-y-3 flex-1 flex flex-col justify-between text-slate-950">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 border-b-2 border-slate-900/10 gap-2">
                <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-cyan-600" />
                  Bảng số liệu thực nghiệm
                </h4>
                {history.length > 0 && (
                  <span className="text-[10px] text-slate-950 font-black bg-emerald-100 px-2.5 py-1 rounded border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#000]">
                    <FormattedMathText text="B" /> trung bình: {(history.reduce((acc, row) => acc + (row.F / (row.I * row.n * (row.l / 100))), 0) / history.length).toFixed(4)} T
                  </span>
                )}
              </div>

              {history.length === 0 ? (
                <div className="text-center py-8 text-slate-700 text-xs border-2 border-dashed border-slate-300 rounded-2xl font-bold bg-white/50">
                  Chưa có số liệu nào. Nhấn "Ghi số liệu cân dòng" để điền vào bảng.
                </div>
              ) : (
                <div className="overflow-x-auto border-2 border-slate-900 rounded-2xl bg-white">
                  <table className="w-full text-left border-collapse text-[11px] font-mono">
                    <thead>
                      <tr className="bg-slate-100 border-b-2 border-slate-900 text-slate-950 text-[10px] font-black uppercase">
                        <th className="py-2 px-3 border-r-2 border-slate-900">Lần</th>
                        <th className="py-2 px-3 border-r-2 border-slate-900"><FormattedMathText text="n" /> (vòng)</th>
                        <th className="py-2 px-3 border-r-2 border-slate-900"><FormattedMathText text="l" /> (m)</th>
                        <th className="py-2 px-3 border-r-2 border-slate-900"><FormattedMathText text="I" /> (A)</th>
                        <th className="py-2 px-3 border-r-2 border-slate-900"><FormattedMathText text="\alpha" /></th>
                        <th className="py-2 px-3 border-r-2 border-slate-900 text-amber-950"><FormattedMathText text="F" /> (N)</th>
                        <th className="py-2 px-3 text-cyan-950">Cảm ứng <FormattedMathText text="B" /> (T)</th>
                      </tr>
                    </thead>
                    <tbody className="font-bold text-slate-950">
                      {history.map((row, index) => {
                        const lM = row.l / 100;
                        const rad = (row.alpha * Math.PI) / 180;
                        const computedB = row.F / (row.I * row.n * lM * Math.sin(rad));
                        return (
                          <tr key={row.id} className="border-b-2 border-slate-900/10 hover:bg-slate-50 text-[11px]">
                            <td className="py-2 px-3 border-r-2 border-slate-900/10 text-slate-500">{index + 1}</td>
                            <td className="py-2 px-3 border-r-2 border-slate-900/10">{row.n}</td>
                            <td className="py-2 px-3 border-r-2 border-slate-900/10">{lM.toFixed(2)}</td>
                            <td className="py-2 px-3 border-r-2 border-slate-900/10">{row.I.toFixed(1)}</td>
                            <td className="py-2 px-3 border-r-2 border-slate-900/10">{row.alpha}°</td>
                            <td className="py-2 px-3 border-r-2 border-slate-900/10 text-amber-950">{row.F.toFixed(4)}</td>
                            <td className="py-2 px-3 text-cyan-950">{isNaN(computedB) || !isFinite(computedB) ? "---" : computedB.toFixed(4)} T</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}



      {/* 3. VIEW CONTENT: MAGLEV TRAIN SIMULATION */}
      {activeSubTab === "maglev" && (
        <div className="space-y-6 mt-5 relative z-10 animate-fade-in text-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Control Panel */}
            <div className="lg:col-span-5 space-y-4 bg-sky-50 border-2 border-slate-900 rounded-3xl p-5 shadow-[4px_4px_0px_0px_#0f172a]">
              <div className="flex justify-between items-center pb-2 border-b-2 border-slate-900/10">
                <h3 className="text-xs font-black uppercase text-slate-950 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-cyan-700" />
                  Điều khiển tàu đệm từ
                </h3>
                <div className="flex bg-slate-200 p-0.5 rounded-xl border border-slate-400 gap-1 text-[10px] font-black">
                  <button
                    onClick={() => setMaglevMode("levitation")}
                    className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                      maglevMode === "levitation" ? "bg-white text-slate-950 shadow-sm animate-fade-in" : "text-slate-600"
                    }`}
                  >
                    Nâng từ (Levitation)
                  </button>
                  <button
                    onClick={() => setMaglevMode("propulsion")}
                    className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                      maglevMode === "propulsion" ? "bg-white text-slate-950 shadow-sm animate-fade-in" : "text-slate-600"
                    }`}
                  >
                    Động cơ từ (Propulsion)
                  </button>
                </div>
              </div>

              {/* Slider 1: Current I */}
              <div className="space-y-1 bg-white p-3.5 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between text-[11px] text-slate-900 font-bold">
                  <span>Dòng điện siêu dẫn (I):</span>
                  <span className="text-cyan-800 font-mono font-black">{maglevCurrent.toFixed(1)} A</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={maglevCurrent}
                  onChange={(e) => setMaglevCurrent(parseFloat(e.target.value))}
                  className="w-full accent-cyan-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-slate-500 font-medium">
                  * Tăng cường độ dòng điện sẽ tỉ lệ thuận với độ mạnh lực nâng từ trường.
                </p>
              </div>

              {/* Slider 2: Train Weight */}
              {maglevMode === "levitation" && (
                <div className="space-y-1 bg-white p-3.5 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] animate-fade-in">
                  <div className="flex justify-between text-[11px] text-slate-900 font-bold">
                    <span>Trọng lượng tàu + Tải trọng (P):</span>
                    <span className="text-rose-800 font-mono font-black">{maglevWeight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="200"
                    step="10"
                    value={maglevWeight}
                    onChange={(e) => setMaglevWeight(parseInt(e.target.value))}
                    className="w-full accent-rose-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500 font-medium">
                    * Tải trọng nặng hơn yêu cầu lực đẩy từ trường nâng lớn hơn để đạt trạng thái cân bằng.
                  </p>
                </div>
              )}

              {/* Propulsion controls */}
              {maglevMode === "propulsion" && (
                <div className="space-y-3 bg-white p-3.5 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] animate-fade-in">
                  <div className="flex justify-between text-[11px] text-slate-900 font-bold">
                    <span>Vận tốc lướt tàu:</span>
                    <span className="text-emerald-800 font-mono font-black">{glideSpeed} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={glideSpeed}
                    disabled={!isGliding}
                    onChange={(e) => setGlideSpeed(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer disabled:opacity-50"
                  />
                  
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-black text-slate-700">Trạng thái lướt tàu:</span>
                    <button
                      onClick={() => setIsGliding(!isGliding)}
                      className={`px-4 py-2 text-xs font-black rounded-xl border-2 cursor-pointer transition-all shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5 ${
                        isGliding 
                          ? "bg-rose-100 border-rose-900 text-rose-950" 
                          : "bg-emerald-100 border-emerald-900 text-emerald-950"
                      }`}
                    >
                      {isGliding ? (
                        <>Tạm dừng tàu</>
                      ) : (
                        <>Bật lướt tàu</>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Forces and physics output display */}
              <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl border-2 border-slate-900 font-mono text-[11px] space-y-2.5 shadow-[2px_2px_0px_0px_#000]">
                <div className="text-cyan-400 font-black border-b border-slate-800 pb-1.5 flex justify-between uppercase">
                  <span>Thông số Vật lý</span>
                  <span>{maglevMode === "levitation" ? "Thăng bằng cơ học" : "Động lực học"}</span>
                </div>
                {maglevMode === "levitation" ? (
                  (() => {
                    const liftForce = Math.round(maglevCurrent * maglevCurrent * 80);
                    const weightForce = Math.round(maglevWeight * 9.8);
                    const isHovering = liftForce > weightForce;
                    const hoverHeight = isHovering ? Math.min(15, Math.round(((liftForce - weightForce) / 10) + 1)) : 0;
                    return (
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <span>Trọng lượng m.g:</span>
                          <span className="text-rose-400 font-bold">{weightForce} N (↓)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lực nâng từ trường:</span>
                          <span className="text-cyan-400 font-bold">{liftForce} N (↑)</span>
                        </div>
                        <div className="flex justify-between border-t border-dashed border-slate-800 pt-1.5">
                          <span>Độ cao nâng thực tế:</span>
                          <span className={hoverHeight > 0 ? "text-emerald-400 font-black" : "text-amber-400 font-bold"}>
                            {hoverHeight > 0 ? `${hoverHeight} mm (ĐÃ NÂNG)` : "0 mm (ĐANG ĐỖ)"}
                          </span>
                        </div>
                        <div className="mt-2 text-[10px] text-slate-400 font-sans leading-relaxed pt-1.5 border-t border-slate-800">
                          {hoverHeight > 0 ? (
                            <span className="text-emerald-300 font-semibold">
                              ✓ Hệ thống đạt trạng thái nâng EDS ổn định. Lực nâng từ trường lớn hơn trọng lượng tàu.
                            </span>
                          ) : (
                            <span className="text-amber-300">
                              ⚠ Lực nâng chưa đủ để thắng trọng lượng tàu. Bánh xe cơ khí hạ xuống tiếp đất.
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span>Vận tốc mô phỏng:</span>
                      <span className="text-emerald-400 font-bold">{isGliding ? `${(glideSpeed * 110).toFixed(0)} km/h` : "0 km/h"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lực kéo-đẩy ngang:</span>
                      <span className="text-cyan-400 font-bold">{isGliding ? `${Math.round(maglevCurrent * 250)} kN` : "0 kN"}</span>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400 font-sans leading-relaxed pt-1.5 border-t border-slate-800">
                      <span className="text-cyan-300 font-semibold">
                        {isGliding 
                          ? "✓ Các cuộn dây dọc đường ray liên tục xoay chiều cực nam châm, kết hợp lực hút (cực khác tên) và lực đẩy (cực cùng tên) để đẩy tàu đi."
                          : "■ Tàu đang đỗ ở sân ga. Hãy nhấn 'Bật lướt tàu' để kích hoạt lực đẩy ngang."}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Visual Screen */}
            <div className="lg:col-span-7 bg-white p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col justify-between items-center min-h-[360px] relative overflow-hidden">
              <span className="absolute top-3 left-3 text-[10px] font-mono text-slate-600 uppercase font-black bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                Sơ đồ đồ họa hoạt cảnh tàu đệm từ SCMaglev
              </span>

              <div className="w-full h-full flex items-center justify-center py-4">
                {maglevMode === "levitation" ? (
                  (() => {
                    const liftForce = maglevCurrent * maglevCurrent * 80;
                    const weightForce = maglevWeight * 9.8;
                    const isHovering = liftForce > weightForce;
                    const hoverHeight = isHovering ? Math.min(15, Math.round(((liftForce - weightForce) / 10) + 1)) : 0;
                    // Vertical offset for visual hover: max 20px
                    const yOffset = hoverHeight * 1.5;

                    return (
                      <svg viewBox="0 0 350 240" className="w-full max-w-[380px] h-full text-slate-950 font-sans">
                        <defs>
                          {/* Guideway background gradient */}
                          <linearGradient id="guidewayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#e2e8f0" />
                            <stop offset="100%" stopColor="#94a3b8" />
                          </linearGradient>
                          {/* Train gradient */}
                          <linearGradient id="trainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="40%" stopColor="#f1f5f9" />
                            <stop offset="100%" stopColor="#cbd5e1" />
                          </linearGradient>
                          {/* Force glow gradient */}
                          <radialGradient id="magneticGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                          </radialGradient>
                        </defs>

                        {/* Guideway U-channel */}
                        <path d="M 40,30 L 40,190 L 310,190 L 310,30 L 290,30 L 290,170 L 60,170 L 60,30 Z" fill="url(#guidewayGrad)" stroke="#334155" strokeWidth="2.5" />
                        
                        {/* Track support columns */}
                        <rect x="135" y="190" width="80" height="35" fill="#64748b" stroke="#334155" strokeWidth="2" />
                        <line x1="80" y1="190" x2="135" y2="225" stroke="#334155" strokeWidth="2" />
                        <line x1="270" y1="190" x2="215" y2="225" stroke="#334155" strokeWidth="2" />

                        {/* Coils on the track walls (Left side and Right side) */}
                        {/* Left Coil */}
                        <g transform="translate(45, 100)">
                          <rect x="-3" y="-30" width="12" height="60" rx="3" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
                          {/* Polarities */}
                          <text x="3" y="-12" fontSize="9" fontWeight="black" fill="#dc2626" textAnchor="middle">N</text>
                          <text x="3" y="18" fontSize="9" fontWeight="black" fill="#2563eb" textAnchor="middle">S</text>
                          <text x="25" y="4" fontSize="6.5" fontWeight="bold" fill="#475569" textAnchor="middle">Cuộn nâng</text>
                        </g>
                        {/* Right Coil */}
                        <g transform="translate(295, 100)">
                          <rect x="-9" y="-30" width="12" height="60" rx="3" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
                          {/* Polarities */}
                          <text x="-3" y="-12" fontSize="9" fontWeight="black" fill="#dc2626" textAnchor="middle">N</text>
                          <text x="-3" y="18" fontSize="9" fontWeight="black" fill="#2563eb" textAnchor="middle">S</text>
                          <text x="-25" y="4" fontSize="6.5" fontWeight="bold" fill="#475569" textAnchor="middle">Cuộn nâng</text>
                        </g>

                        {/* Magnetic Levitation Cushion Glow under train */}
                        {hoverHeight > 0 && (
                          <g>
                            <ellipse cx="175" cy={170 - yOffset + 12} rx="85" ry={hoverHeight * 0.8} fill="url(#magneticGlow)" />
                            <path d="M 80,170 Q 175,160 270,170" stroke="#06b6d4" strokeWidth={hoverHeight * 0.3} strokeDasharray="3,3" fill="none" opacity="0.8" />
                          </g>
                        )}

                        {/* TRAIN BODY (Moves vertically by yOffset) */}
                        <g transform={`translate(0, ${-yOffset})`}>
                          {/* Secondary suspension / bottom shell */}
                          <rect x="76" y="130" width="198" height="30" rx="6" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
                          {/* Main Train Cabin */}
                          <path d="M 80,135 C 80,75 110,45 175,45 C 240,45 270,75 270,135 Z" fill="url(#trainGrad)" stroke="#334155" strokeWidth="2.5" />
                          {/* Cabin Window */}
                          <path d="M 110,85 C 110,70 125,60 175,60 C 225,60 240,70 240,85 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
                          {/* Passengers silhouettes */}
                          <circle cx="145" cy="78" r="4" fill="#0284c7" opacity="0.6" />
                          <circle cx="205" cy="78" r="4" fill="#0284c7" opacity="0.6" />

                          {/* SCM (Superconducting Electromagnets) inside the train flanks */}
                          {/* Left SCM */}
                          <g transform="translate(70, 115)">
                            <rect x="-8" y="-15" width="16" height="30" rx="3" fill="#1e1b4b" stroke="#dc2626" strokeWidth="1.5" />
                            <text x="0" y="-3" fontSize="8" fontWeight="black" fill="#ef4444" textAnchor="middle">S</text>
                            <text x="0" y="9" fontSize="8" fontWeight="black" fill="#3b82f6" textAnchor="middle">N</text>
                          </g>
                          {/* Right SCM */}
                          <g transform="translate(280, 115)">
                            <rect x="-8" y="-15" width="16" height="30" rx="3" fill="#1e1b4b" stroke="#dc2626" strokeWidth="1.5" />
                            <text x="0" y="-3" fontSize="8" fontWeight="black" fill="#ef4444" textAnchor="middle">S</text>
                            <text x="0" y="9" fontSize="8" fontWeight="black" fill="#3b82f6" textAnchor="middle">N</text>
                          </g>

                          {/* Wheels (landing gear) */}
                          <g opacity={hoverHeight > 0 ? "0.2" : "1.0"} className="transition-all duration-300">
                            {/* Left wheel */}
                            <circle cx="105" cy="165" r="7" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
                            <circle cx="105" cy="165" r="2.5" fill="#cbd5e1" />
                            {/* Right wheel */}
                            <circle cx="245" cy="165" r="7" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
                            <circle cx="245" cy="165" r="2.5" fill="#cbd5e1" />
                          </g>

                          {/* Render Forces inside train coordinate group */}
                          {showMaglevForces && (
                            <g>
                              {/* Gravity Force Vector P */}
                              <line x1="175" y1="100" x2="175" y2={100 + (maglevWeight * 0.25)} stroke="#e11d48" strokeWidth="3" markerEnd="url(#arrowF_sim)" />
                              <text x="185" y={115 + (maglevWeight * 0.12)} fill="#e11d48" className="text-[10px] font-bold font-sans">Trọng lực P</text>

                              {/* Magnetic Levitation Force Vector F */}
                              {maglevCurrent > 0.5 && (
                                <>
                                  <line x1="175" y1="100" x2="175" y2={100 - (liftForce * 0.08)} stroke="#06b6d4" strokeWidth="3.5" markerEnd="url(#arrowB_sim)" />
                                  <text x="185" y={85 - (liftForce * 0.04)} fill="#0891b2" className="text-[10px] font-black font-sans">F_nâng (Từ trường)</text>
                                </>
                              )}
                            </g>
                          )}
                        </g>

                        {/* Explanatory captions */}
                        <text x="175" y="232" fontSize="8.5" className="fill-slate-600 text-center font-bold" textAnchor="middle">
                          F_nâng sinh ra do tương tác đẩy của các cực cùng tên (S-S, N-N) giữa tàu và ray
                        </text>
                      </svg>
                    );
                  })()
                ) : (
                  /* Propulsion Side-View */
                  <svg viewBox="0 0 350 240" className="w-full max-w-[380px] h-full text-slate-950 font-sans">
                    <defs>
                      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f0f9ff" />
                        <stop offset="100%" stopColor="#bae6fd" />
                      </linearGradient>
                      <linearGradient id="trainSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#cbd5e1" />
                      </linearGradient>
                    </defs>

                    {/* Sky Background */}
                    <rect width="100%" height="160" fill="url(#skyGrad)" rx="6" />
                    
                    {/* Fuji mountain in background */}
                    <polygon points="120,160 175,90 230,160" fill="#e2e8f0" />
                    <polygon points="163,105 175,90 187,105" fill="#ffffff" />

                    {/* Ground and Track Guideway Side-View */}
                    <rect y="160" width="100%" height="80" fill="#64748b" />
                    <line x1="0" y1="160" x2="350" y2="160" stroke="#475569" strokeWidth="3" />

                    {/* Propulsion Coils along the track side (moves relative to glidePosition) */}
                    {Array.from({ length: 6 }).map((_, i) => {
                      const baseOffset = i * 80;
                      // Slide them to the left to create movement to the right
                      const xPosition = ((baseOffset - (glidePosition * 2.4)) % 480) - 60;
                      // Alternating magnetic polarities N-S-N-S
                      const isNorth = i % 2 === 0;
                      
                      return (
                        <g key={i} transform={`translate(${xPosition}, 165)`}>
                          {/* Coil casing */}
                          <rect x="0" y="0" width="40" height="25" rx="3" fill="#334155" stroke="#1e293b" strokeWidth="1" />
                          {/* Electro-magnetic coil display */}
                          <rect x="4" y="3" width="32" height="19" rx="2" fill={isNorth ? "#fee2e2" : "#dbeafe"} />
                          <text x="20" y="15" fontSize="10" fontWeight="black" fill={isNorth ? "#dc2626" : "#2563eb"} textAnchor="middle">
                            {isNorth ? "N" : "S"}
                          </text>
                        </g>
                      );
                    })}

                    {/* Guideway Wall upper edge */}
                    <line x1="0" y1="190" x2="350" y2="190" stroke="#334155" strokeWidth="2" strokeDasharray="5,3" />

                    {/* TRAIN SIDE-VIEW (Central and aerodynamic) */}
                    <g transform="translate(60, 85)">
                      {/* Train nose and body */}
                      <path d="M 0,45 C 5,45 30,45 70,30 C 100,20 180,20 220,20 L 220,55 L 0,55 Z" fill="url(#trainSideGrad)" stroke="#1e293b" strokeWidth="2" />
                      <rect x="220" y="20" width="80" height="35" fill="url(#trainSideGrad)" stroke="#1e293b" strokeWidth="2" />
                      
                      {/* Cabin Windows */}
                      <rect x="90" y="26" width="30" height="10" rx="2" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
                      <rect x="135" y="26" width="30" height="10" rx="2" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
                      <rect x="180" y="26" width="30" height="10" rx="2" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
                      <rect x="235" y="26" width="30" height="10" rx="2" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />

                      {/* Superconducting magnet (SCM) on the train bogie side */}
                      <g transform="translate(100, 52)">
                        {/* Bogie metal piece */}
                        <rect x="-30" y="0" width="80" height="10" rx="2" fill="#475569" />
                        {/* Train SCM pole 1 */}
                        <rect x="-20" y="2" width="22" height="14" rx="2" fill="#312e81" stroke="#ef4444" strokeWidth="1" />
                        <text x="-9" y="12" fontSize="8.5" fontWeight="black" fill="#ffffff" textAnchor="middle">S</text>
                        {/* Train SCM pole 2 */}
                        <rect x="10" y="2" width="22" height="14" rx="2" fill="#312e81" stroke="#ef4444" strokeWidth="1" />
                        <text x="21" y="12" fontSize="8.5" fontWeight="black" fill="#ffffff" textAnchor="middle">N</text>
                      </g>

                      {/* Spark / Motion lines representing high speed */}
                      {isGliding && (
                        <g stroke="#ffffff" strokeWidth="2" opacity="0.8">
                          <line x1="-15" y1="35" x2="-45" y2="35" />
                          <line x1="-10" y1="48" x2="-35" y2="48" />
                          <line x1="-20" y1="22" x2="-40" y2="22" />
                        </g>
                      )}

                      {/* Propulsion Force Vectors */}
                      {showMaglevForces && isGliding && (
                        <g>
                          {/* Forward Force arrow F_đẩy */}
                          <line x1="160" y1="12" x2="220" y2="12" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowI_sim)" />
                          <text x="155" y="5" fill="#16a34a" className="text-[9.5px] font-black font-sans">Lực kéo F_đẩy</text>
                        </g>
                      )}
                    </g>

                    <text x="175" y="230" fontSize="8.5" className="fill-slate-600 text-center font-bold" textAnchor="middle">
                      {isGliding 
                        ? "Sóng từ trường chạy trên đường ray liên tục đẩy-hút các khối nam châm siêu dẫn của tàu chạy."
                        : "Nhấn nút 'Bật lướt tàu' để xem sóng điện từ đẩy tàu lướt cực kì êm ái."}
                    </text>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
