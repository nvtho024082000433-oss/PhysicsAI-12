import { useState } from "react";
import { RotateCcw, Sliders, Zap, Compass, Save, Table, TrendingUp, Info, HelpCircle } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface RecordData {
  id: number;
  currentI: number;
  lengthCm: number;
  forceN: number;
  balanceG: number;
}

export default function Lesson20Simulation() {
  // Parameters
  const [currentI, setCurrentI] = useState<number>(5.0); // A
  const [lengthCm, setLengthCm] = useState<number>(1.2); // cm
  const [magneticB, setMagneticB] = useState<number>(0.25); // Tesla
  const [direction, setDirection] = useState<"forward" | "reverse">("forward");
  const [fieldDir, setFieldDir] = useState<"up" | "down">("up");

  // Balance baseline (tare) weight
  const [tareWeight, setTareWeight] = useState<number>(200.0); // grams
  const [activeTab, setActiveTab] = useState<"visual" | "data">("visual");

  // Recorded datasets
  const [records, setRecords] = useState<RecordData[]>([
    { id: 1, currentI: 2.5, lengthCm: 1.2, forceN: 0.008, balanceG: 200.8 },
    { id: 2, currentI: 5.1, lengthCm: 1.2, forceN: 0.015, balanceG: 201.5 },
    { id: 3, currentI: 10.1, lengthCm: 1.2, forceN: 0.030, balanceG: 203.0 },
    { id: 4, currentI: 20.2, lengthCm: 1.2, forceN: 0.060, balanceG: 206.1 },
    { id: 5, currentI: 5.1, lengthCm: 0.7, forceN: 0.009, balanceG: 200.9 },
    { id: 6, currentI: 10.1, lengthCm: 0.7, forceN: 0.017, balanceG: 201.7 }
  ]);

  // Derived calculations
  const lengthM = lengthCm / 100;
  
  // Calculate force: F = B * I * L
  const forceDirFactor = (direction === "forward" ? 1 : -1) * (fieldDir === "up" ? 1 : -1);
  const rawForce = magneticB * currentI * lengthM; // in Newtons
  const forceN = rawForce * forceDirFactor;

  // Change in balance mass: F = delta_m * g => delta_m = F / g. (Use g = 9.8 m/s2)
  const deltaMassGrams = (forceN / 9.8) * 1000;
  const currentBalanceReading = tareWeight + deltaMassGrams;

  const handleRecord = () => {
    const newRecord: RecordData = {
      id: Date.now(),
      currentI: currentI,
      lengthCm: lengthCm,
      forceN: Math.abs(rawForce),
      balanceG: currentBalanceReading
    };
    setRecords([...records, newRecord]);
  };

  const handleResetRecords = () => {
    setRecords([]);
  };

  const handleLoadSample = (sampleNum: number) => {
    if (sampleNum === 1) {
      setCurrentI(2.5);
      setLengthCm(1.2);
      setMagneticB(0.25);
      setDirection("forward");
      setFieldDir("up");
    } else if (sampleNum === 2) {
      setCurrentI(10.1);
      setLengthCm(1.2);
      setMagneticB(0.25);
      setDirection("forward");
      setFieldDir("up");
    } else if (sampleNum === 3) {
      setCurrentI(10.1);
      setLengthCm(0.7);
      setMagneticB(0.25);
      setDirection("forward");
      setFieldDir("up");
    }
  };

  return (
    <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 space-y-6 text-slate-900 shadow-[6px_6px_0px_#1e293b]" id="lesson20-simulation">
      {/* Simulation Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b-2 border-slate-200 pb-5">
        <div className="space-y-1">
          <span className="text-[10px] text-indigo-950 font-black uppercase tracking-wider font-mono bg-indigo-100 border-2 border-slate-900 px-3 py-1 rounded-full shadow-[2px_2px_0px_#1e293b] inline-block">
            PHÒNG THÍ NGHIỆM VẬT LÍ SỐ
          </span>
          <h3 className="text-lg font-black text-slate-950 flex items-center gap-2 uppercase mt-2">
            <Compass className="h-5 w-5 text-indigo-600 animate-pulse" />
            MÔ PHỎNG THÍ NGHIỆM ĐO LỰC AMPE BẰNG CÂN ĐIỆN TỬ
          </h3>
          <p className="text-xs text-slate-800 font-bold max-w-2xl leading-relaxed">
            Khảo sát định lượng mối liên hệ giữa lực Ampe với cường độ dòng điện I, chiều dài tác dụng L và cảm ứng từ B thông qua sự thay đổi trọng lượng của nam châm trên đĩa cân điện tử.
          </p>
        </div>

        {/* Tab Selection - 3D Buttons */}
        <div className="flex gap-2 bg-slate-100 p-2 rounded-2xl border-2 border-slate-900 shadow-inner">
          <button
            onClick={() => setActiveTab("visual")}
            className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all border-2 border-slate-900 cursor-pointer ${
              activeTab === "visual"
                ? "bg-indigo-300 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
                : "bg-white text-slate-800 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[1px] hover:translate-y-[1px]"
            }`}
          >
            Mô hình Thí nghiệm
          </button>
          <button
            onClick={() => setActiveTab("data")}
            className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all border-2 border-slate-900 cursor-pointer ${
              activeTab === "data"
                ? "bg-indigo-300 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
                : "bg-white text-slate-800 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[1px] hover:translate-y-[1px]"
            }`}
          >
            Bảng số liệu & Đồ thị
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Controls - Soft Indigo */}
        <div className="lg:col-span-4 space-y-5 bg-indigo-50/70 p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b] flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[11px] text-indigo-950 font-black uppercase tracking-wider flex items-center gap-1.5 border-b border-indigo-200 pb-2.5">
              <span className="p-1 bg-indigo-100 border-2 border-slate-900 rounded-lg"><Sliders className="h-4 w-4 text-indigo-950" /></span> THIẾT LẬP THÔNG SỐ
            </span>

            <div className="space-y-4 text-xs">
              {/* Current Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono text-[10px] text-slate-800 font-bold">
                  <span>Cường độ dòng điện (I):</span>
                  <span className="font-black text-indigo-900 text-xs">{currentI.toFixed(1)} A</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="0.5"
                  value={currentI}
                  onChange={(e) => setCurrentI(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Length Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono text-[10px] text-slate-800 font-bold">
                  <span>Chiều dài đoạn dây (L):</span>
                  <span className="font-black text-indigo-950 text-xs">{lengthCm.toFixed(1)} cm</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={lengthCm}
                  onChange={(e) => setLengthCm(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Magnetic B Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono text-[10px] text-slate-800 font-bold">
                  <span>Cảm ứng từ nam châm (B):</span>
                  <span className="font-black text-indigo-950 text-xs">{magneticB.toFixed(2)} Tesla</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.50"
                  step="0.01"
                  value={magneticB}
                  onChange={(e) => setMagneticB(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Current Direction toggle */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-800 font-mono font-bold block">Chiều dòng điện trong dây:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDirection("forward")}
                    className={`py-2 px-1 rounded-xl text-[10px] font-black border-2 border-slate-900 transition-all cursor-pointer ${
                      direction === "forward"
                        ? "bg-indigo-300 text-slate-950 shadow-none"
                        : "bg-white text-slate-800 shadow-[2px_2px_0px_#1e293b]"
                    }`}
                  >
                    Trái sang Phải (+)
                  </button>
                  <button
                    onClick={() => setDirection("reverse")}
                    className={`py-2 px-1 rounded-xl text-[10px] font-black border-2 border-slate-900 transition-all cursor-pointer ${
                      direction === "reverse"
                        ? "bg-indigo-300 text-slate-950 shadow-none"
                        : "bg-white text-slate-800 shadow-[2px_2px_0px_#1e293b]"
                    }`}
                  >
                    Phải sang Trái (-)
                  </button>
                </div>
              </div>

              {/* Field Direction toggle */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-800 font-mono font-bold block">Hướng vectơ cảm ứng từ B:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFieldDir("up")}
                    className={`py-2 px-1 rounded-xl text-[10px] font-black border-2 border-slate-900 transition-all cursor-pointer ${
                      fieldDir === "up"
                        ? "bg-indigo-300 text-slate-950 shadow-none"
                        : "bg-white text-slate-800 shadow-[2px_2px_0px_#1e293b]"
                    }`}
                  >
                    Hướng lên trên (↑)
                  </button>
                  <button
                    onClick={() => setFieldDir("down")}
                    className={`py-2 px-1 rounded-xl text-[10px] font-black border-2 border-slate-900 transition-all cursor-pointer ${
                      fieldDir === "down"
                        ? "bg-indigo-300 text-slate-950 shadow-none"
                        : "bg-white text-slate-800 shadow-[2px_2px_0px_#1e293b]"
                    }`}
                  >
                    Hướng xuống (↓)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t-2 border-indigo-200">
            {/* Quick preset loading */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-800 font-mono font-bold block">Tải nhanh cấu hình Bảng 20.1:</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => handleLoadSample(1)}
                  className="bg-white hover:bg-slate-50 text-[9px] font-black py-1.5 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_#1e293b] text-slate-900 cursor-pointer"
                >
                  Lần 1 (2.5A)
                </button>
                <button
                  onClick={() => handleLoadSample(2)}
                  className="bg-white hover:bg-slate-50 text-[9px] font-black py-1.5 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_#1e293b] text-slate-900 cursor-pointer"
                >
                  Lần 3 (10.1A)
                </button>
                <button
                  onClick={() => handleLoadSample(3)}
                  className="bg-white hover:bg-slate-50 text-[9px] font-black py-1.5 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_#1e293b] text-slate-900 cursor-pointer"
                >
                  Lần 6 (0.7cm)
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleRecord}
                className="flex-1 bg-indigo-300 hover:bg-indigo-400 text-slate-950 text-xs font-black py-2.5 px-3 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#000] cursor-pointer flex items-center justify-center gap-1.5 transition-all"
              >
                <Save className="h-4 w-4 shrink-0" /> Ghi số liệu
              </button>
              <button
                onClick={() => setTareWeight(200.0)}
                className="bg-white hover:bg-slate-50 text-slate-950 text-xs font-black py-2.5 px-3 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#000] cursor-pointer flex items-center justify-center gap-1 transition-all"
                title="Đặt lại cân chuẩn về 200g"
              >
                <RotateCcw className="h-4 w-4 shrink-0" /> Tare
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Active Workspace */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          {activeTab === "visual" && (
            <div className="space-y-4 flex flex-col justify-between h-full">
              {/* Vector Direction HUD Panel - Soft Emerald */}
              <div className="bg-emerald-50 border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_#1e293b] grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block border-2 border-slate-900"></span>
                  <span className="text-slate-900">Dòng điện I: <strong className="text-amber-800">{currentI.toFixed(1)} A</strong> ({direction === "forward" ? "→" : "←"})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block border-2 border-slate-900"></span>
                  <span className="text-slate-900">Cảm ứng từ B: <strong className="text-emerald-800">{magneticB.toFixed(2)} T</strong> ({fieldDir === "up" ? "↑" : "↓"})</span>
                </div>
                <div className="flex items-center gap-2 col-span-1 md:col-span-3 lg:col-span-1 border-t md:border-t-0 pt-2 md:pt-0 border-slate-300">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block border-2 border-slate-900"></span>
                  <span className="text-slate-900">Lực Ampe (dây): <strong className="text-rose-700">{Math.abs(forceN).toFixed(4)} N</strong> ({forceN > 0 ? "hướng lên ↑" : forceN < 0 ? "hướng xuống ↓" : "0"})</span>
                </div>
              </div>

              {/* Virtual Setup Window - Enclosed in 3D frame */}
              <div className="bg-slate-950 rounded-3xl border-2 border-slate-900 p-5 relative overflow-hidden flex flex-col justify-center min-h-[300px] shadow-[4px_4px_0px_#1e293b]">
                {/* Visual Label */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="text-[9px] bg-slate-900 border border-slate-700 text-cyan-400 px-2.5 py-1 rounded font-mono uppercase font-black tracking-wider">
                    PHÁP TUYẾN VECTƠ THỰC NGHIỆM 3D
                  </span>
                </div>

                {/* Vector Illustration Stand / Balance */}
                <div className="flex justify-center items-center py-6">
                  <svg viewBox="0 0 320 220" className="w-full max-w-[340px] h-auto">
                    {/* Background lab rack stands */}
                    <line x1="40" y1="20" x2="40" y2="200" stroke="#475569" strokeWidth="3" />
                    <line x1="280" y1="20" x2="280" y2="200" stroke="#475569" strokeWidth="3" />
                    
                    {/* Horizontal wire suspension bar */}
                    <line x1="40" y1="60" x2="280" y2="60" stroke="#334155" strokeWidth="2" strokeDasharray="3" />
                    
                    {/* Electronic Balance (Base) */}
                    <rect x="90" y="140" width="140" height="40" fill="#1e293b" rx="6" stroke="#475569" strokeWidth="2" />
                    <ellipse cx="160" cy="140" rx="60" ry="10" fill="#475569" stroke="#64748b" strokeWidth="1" />
 
                    {/* Balance LCD Screen */}
                    <rect x="120" y="155" width="80" height="18" fill="#020617" rx="3" stroke="#334155" strokeWidth="1" />
                    <text x="160" y="168" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      {currentBalanceReading.toFixed(3)} g
                    </text>
                    <text x="195" y="167" fill="#047857" fontSize="5" fontFamily="monospace">TARE</text>
 
                    {/* U-Shaped Magnet sitting on the balance */}
                    <g transform="translate(110, 85)">
                      {/* Left Pole (South - Blue) */}
                      <rect x="0" y="0" width="30" height="45" fill="#1d4ed8" rx="2" />
                      <text x="15" y="25" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">S</text>
                      
                      {/* Right Pole (North - Red) */}
                      <rect x="70" y="0" width="30" height="45" fill="#b91c1c" rx="2" />
                      <text x="85" y="25" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">N</text>
 
                      {/* Connection bottom yoke of magnet */}
                      <rect x="0" y="40" width="100" height="15" fill="#334155" rx="2" />
                    </g>
 
                    {/* Suspended wire passing through the air gap */}
                    {/* Represent wire with beautiful copper cylinder */}
                    <line
                      x1="60"
                      y1="100"
                      x2="260"
                      y2="100"
                      stroke="#f59e0b"
                      strokeWidth={lengthCm * 3} // dynamically visually thicker/thinner
                      strokeLinecap="round"
                    />
                    
                    {/* Suspended wires to the ceiling support */}
                    <line x1="80" y1="60" x2="80" y2="100" stroke="#dc2626" strokeWidth="1.5" />
                    <line x1="240" y1="60" x2="240" y2="100" stroke="#2563eb" strokeWidth="1.5" />
 
                    {/* Dynamic Vector Arrows */}
                    {/* Magnetic Field Vector B (pointing UP or DOWN in the gap) */}
                    <g transform="translate(160, 100)">
                      {fieldDir === "up" ? (
                        <>
                          <path d="M 0 35 L 0 -35" stroke="#10b981" strokeWidth="3" fill="none" />
                          <path d="M -4 -28 L 0 -38 L 4 -28" fill="#10b981" />
                          <text x="8" y="-20" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">B</text>
                        </>
                      ) : (
                        <>
                          <path d="M 0 -35 L 0 35" stroke="#10b981" strokeWidth="3" fill="none" />
                          <path d="M -4 28 L 0 38 L 4 28" fill="#10b981" />
                          <text x="8" y="25" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">B</text>
                        </>
                      )}
 
                      {/* Current Direction arrows inside the wire */}
                      {direction === "forward" ? (
                        <>
                          <path d="M -60 0 L 60 0" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3" fill="none" />
                          <path d="M 20 -4 L 28 0 L 20 4" fill="#f59e0b" />
                          <text x="-45" y="-12" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace">I</text>
                        </>
                      ) : (
                        <>
                          <path d="M 60 0 L -60 0" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3" fill="none" />
                          <path d="M -20 -4 L -28 0 L -20 4" fill="#f59e0b" />
                          <text x="40" y="-12" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace">I</text>
                        </>
                      )}
 
                      {/* Force on Wire F */}
                      {forceN !== 0 && (
                        <g>
                          {/* Force on Wire vector (Red) */}
                          <path d={forceN > 0 ? "M 0 0 L 0 -50" : "M 0 0 L 0 50"} stroke="#f43f5e" strokeWidth="3.5" fill="none" />
                          <path d={forceN > 0 ? "M -5 -42 L 0 -52 L 5 -42" : "M -5 42 L 0 52 L 5 42"} fill="#f43f5e" />
                          <text x="-25" y={forceN > 0 ? -40 : 45} fill="#f43f5e" fontSize="9" fontWeight="extrabold" fontFamily="monospace">F (Ampe)</text>
 
                          {/* Reaction Force on Magnet (Blue/White, acts on magnet center) */}
                          <path d={forceN > 0 ? "M 0 30 L 0 60" : "M 0 10 L 0 -20"} stroke="#3b82f6" strokeWidth="3" strokeDasharray="2" fill="none" />
                          <path d={forceN > 0 ? "M -4 53 L 0 61 L 4 53" : "M -4 -13 L 0 -21 L 4 -13"} fill="#3b82f6" />
                          <text x="10" y={forceN > 0 ? 55 : -10} fill="#3b82f6" fontSize="8" fontWeight="bold" fontFamily="monospace">F (phản lực)</text>
                        </g>
                      )}
                    </g>
                  </svg>
                </div>
              </div>

              {/* Description info badge - Soft Green */}
              <div className="bg-cyan-50 border-2 border-slate-900 rounded-2xl p-4 flex items-start gap-3 text-xs font-bold shadow-[3px_3px_0px_#1e293b]">
                <span className="p-1 bg-cyan-100 border-2 border-slate-900 rounded-xl"><Info className="h-5 w-5 text-cyan-900 shrink-0" /></span>
                <div className="space-y-1 text-slate-900">
                  <span className="text-[10px] text-cyan-950 font-black uppercase tracking-wider block">Giải thích vật lý & ý nghĩa thực nghiệm:</span>
                  <p className="leading-relaxed">
                    Khi dòng điện chạy qua đoạn dây, từ trường tác dụng lực từ hướng thẳng đứng lên dây (Ví dụ: <FormattedMathText text="F > 0" />, tức hướng lên). Do dây được giữ cố định vào giá đỡ vững chắc nên nó không dịch chuyển. Theo <span className="font-black text-slate-950">Định luật III Newton</span>, dây đẩy ngược lại nam châm một phản lực tương đương hướng thẳng đứng xuống dưới: <FormattedMathText text="F_{tu} = \Delta m \cdot g" />. Lực này đè thêm lên cân điện tử, làm hiển thị số chỉ tăng từ <span className="font-bold">{tareWeight.toFixed(1)} g</span> lên <span className="text-indigo-800 font-bold">{(currentBalanceReading).toFixed(3)} g</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div className="space-y-6 animate-fade-in">
              {/* Recorded table - Soft White */}
              <div className="bg-white p-5 rounded-3xl border-2 border-slate-900 space-y-4 shadow-[4px_4px_0px_#1e293b]">
                <div className="flex justify-between items-center border-b-2 border-slate-200 pb-2.5">
                  <span className="text-[11px] text-indigo-950 font-black uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Table className="h-4 w-4 text-indigo-600" /> BẢNG SỐ LIỆU ĐO THỰC TẾ (SỐ LẦN GHI: {records.length})
                  </span>
                  {records.length > 0 && (
                    <button
                      onClick={handleResetRecords}
                      className="text-[9px] text-rose-950 hover:text-rose-900 font-black bg-rose-100 border-2 border-slate-900 px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#1e293b] cursor-pointer"
                    >
                      Xóa bảng số liệu
                    </button>
                  )}
                </div>

                {records.length === 0 ? (
                  <div className="py-12 text-center space-y-2 text-slate-500">
                    <HelpCircle className="h-8 w-8 mx-auto text-slate-400 animate-bounce" />
                    <p className="text-xs font-semibold text-slate-800">Chưa có số liệu thực nghiệm nào được ghi lại.</p>
                    <p className="text-[10px] text-slate-500">Hãy chuyển sang tab "Mô hình Thí nghiệm", thay đổi các thanh trượt và click "Ghi số liệu".</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border-2 border-slate-900 shadow-inner">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-indigo-600 text-white font-mono text-[10px] uppercase border-b-2 border-slate-900">
                          <th className="p-2.5 border-r border-slate-900">STT</th>
                          <th className="p-2.5 border-r border-slate-900">Dòng điện I (A)</th>
                          <th className="p-2.5 border-r border-slate-900">Chiều dài L (cm)</th>
                          <th className="p-2.5 border-r border-slate-900">Lực Ampe F (N)</th>
                          <th className="p-2.5">Số chỉ của cân (g)</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono text-[11px] font-bold text-slate-900">
                        {records.map((rec, index) => (
                          <tr key={rec.id} className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                            <td className="p-2 border-r border-slate-200 text-slate-500 text-center">{index + 1}</td>
                            <td className="p-2 border-r border-slate-200 text-indigo-950">{rec.currentI.toFixed(2)} A</td>
                            <td className="p-2 border-r border-slate-200 text-slate-800">{rec.lengthCm.toFixed(1)} cm</td>
                            <td className="p-2 border-r border-slate-200 text-emerald-800 font-black">{rec.forceN.toFixed(5)} N</td>
                            <td className="p-2 text-indigo-900">{rec.balanceG.toFixed(3)} g</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Dynamic SVG Plot of F vs I - Soft Indigo Box */}
              {records.length > 1 && (
                <div className="bg-indigo-50/60 p-5 rounded-3xl border-2 border-slate-900 space-y-4 shadow-[4px_4px_0px_#1e293b]" id="f-vs-i-plot-container">
                  <span className="text-[11px] text-indigo-950 font-black uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <TrendingUp className="h-4 w-4" /> ĐỒ THỊ THỰC NGHIỆM ĐỒNG THỜI F(I)
                  </span>

                  <div className="relative h-[200px] bg-white rounded-2xl p-4 border-2 border-slate-900 flex items-center justify-center shadow-inner">
                    <svg viewBox="0 0 300 150" className="w-full h-full">
                      {/* Grid background lines */}
                      <line x1="20" y1="130" x2="280" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
                      <line x1="20" y1="10" x2="20" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
                      
                      {/* Grid helper dashes */}
                      <line x1="20" y1="90" x2="280" y2="90" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" />
                      <line x1="20" y1="50" x2="280" y2="50" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" />
                      <line x1="150" y1="10" x2="150" y2="130" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" />

                      {/* Axes names */}
                      <text x="270" y="142" fill="#475569" fontSize="8" fontFamily="monospace" fontWeight="bold">I (A)</text>
                      <text x="25" y="15" fill="#f43f5e" fontSize="8" fontFamily="monospace" fontWeight="bold">F (N)</text>

                      {/* Render recorded points as yellow dots on SVG */}
                      {(() => {
                        // Find max current and force to scale properly
                        const maxI = Math.max(...records.map((r) => r.currentI), 25);
                        const maxF = Math.max(...records.map((r) => r.forceN), 0.08);

                        // Map points
                        const pts = records.map((rec) => {
                          const x = 20 + (rec.currentI / maxI) * 250;
                          const y = 130 - (rec.forceN / maxF) * 110;
                          return { x, y, ...rec };
                        });

                        // Sort points by current to draw connecting line
                        const sortedPts = [...pts].sort((a, b) => a.currentI - b.currentI);

                        return (
                          <g>
                            {/* Connecting Line */}
                            <path
                              d={sortedPts.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")}
                              fill="none"
                              stroke="#4f46e5"
                              strokeWidth="2.5"
                            />

                            {/* Render scatter points */}
                            {pts.map((p) => (
                              <g key={p.id}>
                                <circle cx={p.x} cy={p.y} r="5" fill="#f59e0b" stroke="#1e293b" strokeWidth="1.5" />
                                <text x={p.x + 6} y={p.y + 3} fill="#1e293b" fontSize="7" fontWeight="bold" fontFamily="monospace">
                                  {p.forceN.toFixed(3)}
                                </text>
                              </g>
                            ))}
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                  <div className="text-[10px] text-slate-800 text-center font-bold">
                    Đồ thị tự động vẽ biểu diễn mối quan hệ trực tiếp tuyến tính giữa cường độ dòng điện I (trục hoành) và độ lớn lực Ampe F đo được (trục tung).
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
