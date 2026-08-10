import { useState, useEffect, useRef } from "react";
import { RotateCcw, ArrowRight, Compass, Zap, Gauge, Award, Cpu, ShieldCheck } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson17Simulation() {
  // Tabs
  const [activeTab, setActiveTab] = useState<"single" | "three" | "practice">("single");

  // Physics params for single phase
  const [speed, setSpeed] = useState<number>(3); // rad/s (0 to 10)
  const [magneticField, setMagneticField] = useState<number>(0.8); // Tesla (0.1 to 1.5)
  const [turns, setTurns] = useState<number>(200); // turns (50 to 500)
  const [area, setArea] = useState<number>(30); // cm^2 (10 to 50)
  const [loadResistance, setLoadResistance] = useState<number>(10); // ohms (1 to 50)

  // Simulation running state
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Live rotating angle (radians)
  const [angle, setAngle] = useState<number>(0);

  // Refs for animation loop
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const angleRef = useRef<number>(0);

  // Canvas Refs for oscilloscope plotting
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Challenge states
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [challengeChecked, setChallengeChecked] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [challengeFeedback, setChallengeFeedback] = useState<string>("");

  // Sync angleRef
  useEffect(() => {
    angleRef.current = angle;
  }, [angle]);

  // Animation frame loop
  useEffect(() => {
    if (!isRotating) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      previousTimeRef.current = null;
      return;
    }

    const animate = (time: number) => {
      if (previousTimeRef.current !== null) {
        const deltaTime = (time - previousTimeRef.current) / 1000; // seconds
        // Increment angle based on angular velocity (speed)
        const dAngle = speed * deltaTime;
        const newAngle = (angleRef.current + dAngle) % (2 * Math.PI);
        setAngle(newAngle);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isRotating, speed]);

  // Real-time calculated electrical values
  const S_m2 = area * 1e-4; // cm^2 to m^2
  const maxFlux = turns * magneticField * S_m2; // N*B*S
  const maxVoltage = maxFlux * speed; // E0 = N*B*S*w
  const maxCurrent = maxVoltage / loadResistance; // I0 = E0/R

  const currentFluxVal = maxFlux * Math.cos(angle);
  const currentVoltageVal = maxVoltage * Math.sin(angle); // e(t) = E0 * sin(wt)
  const currentCurrentVal = currentVoltageVal / loadResistance;

  // 3-Phase specific formulas
  const v1 = maxVoltage * Math.sin(angle);
  const v2 = maxVoltage * Math.sin(angle - (2 * Math.PI) / 3);
  const v3 = maxVoltage * Math.sin(angle + (2 * Math.PI) / 3);
  const sumV = v1 + v2 + v3; // theoretically 0

  // Drawing the Oscilloscope grid and lines on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and set sizing
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Draw Grid (Light theme gridlines)
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    
    // Vertical gridlines
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    // Horizontal gridlines
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw central axis line (Ground)
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Plotting lines (High-contrast, thicker lines for easy observation)
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (activeTab === "single") {
      // Single Phase Plot:
      // 1. Magnetic Flux (Green, scaled)
      ctx.strokeStyle = "#059669"; // Strong Emerald Green
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const phaseOffset = (x / width) * 4 * Math.PI; // 2 full cycles
        const localAngle = angle - phaseOffset;
        const value = Math.cos(localAngle); // standard cosine
        const y = height / 2 - value * (height * 0.35);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Induced EMF (Red/Rose, scaled, shifted by 90 deg)
      ctx.strokeStyle = "#be185d"; // Strong Rose Red
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const phaseOffset = (x / width) * 4 * Math.PI;
        const localAngle = angle - phaseOffset;
        const value = Math.sin(localAngle); // standard sine
        const y = height / 2 - value * (height * 0.35);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Draw current indicator dot
      ctx.fillStyle = "#b45309"; // Dark Amber
      ctx.beginPath();
      ctx.arc(width - 6, height / 2 - Math.sin(angle) * (height * 0.35), 6, 0, 2 * Math.PI);
      ctx.fill();
    } else if (activeTab === "three") {
      // Three Phase Plot: Red, Green, Blue waves
      
      // Phase 1 (Red)
      ctx.strokeStyle = "#dc2626";
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const phaseOffset = (x / width) * 4 * Math.PI;
        const localAngle = angle - phaseOffset;
        const value = Math.sin(localAngle);
        const y = height / 2 - value * (height * 0.35);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Phase 2 (Green)
      ctx.strokeStyle = "#16a34a";
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const phaseOffset = (x / width) * 4 * Math.PI;
        const localAngle = angle - phaseOffset - (2 * Math.PI) / 3;
        const value = Math.sin(localAngle);
        const y = height / 2 - value * (height * 0.35);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Phase 3 (Blue)
      ctx.strokeStyle = "#2563eb";
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const phaseOffset = (x / width) * 4 * Math.PI;
        const localAngle = angle - phaseOffset + (2 * Math.PI) / 3;
        const value = Math.sin(localAngle);
        const y = height / 2 - value * (height * 0.35);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }, [angle, activeTab]);

  // Practice Challenges Data
  const challenges = [
    {
      id: 1,
      title: "Thử thách 1: Tính toán tần số máy phát điện tuabin gió",
      scenario: "Một tuabin gió phát điện xoay chiều một pha có phần cảm gồm p = 12 cặp cực nam châm liên kết trực tiếp với trục cánh quạt. Khi trời có gió tốt ổn định, cánh quạt quay đều với tốc độ n = 300 vòng/phút. Hãy tính toán tần số dòng điện xoay chiều do tổ máy WindTurbine này hòa vào lưới truyền tải nội bộ.",
      options: [
        { id: "A", text: "f = 30 Hz" },
        { id: "B", text: "f = 50 Hz" },
        { id: "C", text: "f = 60 Hz" },
        { id: "D", text: "f = 120 Hz" }
      ],
      correct: "C",
      explanation: "Đổi tốc độ quay ra vòng/giây: n_sec = 300 / 60 = 5 vòng/giây. Tần số dòng điện phát ra: f = n_sec * p = 5 * 12 = 60 Hz. Đáp án chính xác là C."
    },
    {
      id: 2,
      title: "Thử thách 2: Thiết kế máy phát thủy điện Trị An",
      scenario: "Nhà máy Thủy điện Trị An vận hành các tổ máy phát điện xoay chiều một pha cung cấp dòng điện tần số tiêu chuẩn f = 50 Hz cho mạng lưới điện miền Nam. Biết tốc độ quay của tuabin nước được khống chế ổn định ở mức n = 150 vòng/phút. Hỏi thiết kế roto của máy phát này bắt buộc phải xếp bao nhiêu cực nam châm đơn (gồm cả cực Bắc và cực Nam xen kẽ)?",
      options: [
        { id: "A", text: "20 cực (10 cặp cực)." },
        { id: "B", text: "40 cực (20 cặp cực)." },
        { id: "C", text: "80 cực (40 cặp cực)." },
        { id: "D", text: "12 cực (6 cặp cực)." }
      ],
      correct: "B",
      explanation: "Đổi n = 150 vòng/phút = 2,5 vòng/giây. Ta có f = n.p => Số cặp cực p = f / n = 50 / 2,5 = 20 cặp cực. Mỗi cặp cực gồm 1 cực Bắc và 1 cực Nam, do đó tổng số cực đơn nam châm xếp xen kẽ là 20 * 2 = 40 cực đơn. Đáp án chính xác là B."
    },
    {
      id: 3,
      title: "Thử thách 3: Hệ quả cơ học của phụ tải điện",
      scenario: "Một máy phát điện diesel đang hoạt động nổ máy không tải (mạch ngoài hở). Người ta bất ngờ đóng cầu dao lớn để hòa điện cấp cho hệ thống lò sưởi điện công nghiệp nặng. Trực quan thực tế, hiện tượng cơ học nào sẽ xảy ra tức thì đối với tổ máy phát diesel nếu bộ điều tốc nhiên liệu chưa kịp phản ứng?",
      options: [
        { id: "A", text: "Tốc độ quay rôto của máy phát điện bị phanh chậm lại mạnh mẽ." },
        { id: "B", text: "Tốc độ quay rôto đột ngột tăng vọt, máy phát rú to hơn." },
        { id: "C", text: "Trục quay roto lập tức đảo chiều quay ngược lại hoàn toàn." },
        { id: "D", text: "Không có bất cứ hiện tượng lực nào cản trở vì điện năng và cơ năng độc lập." }
      ],
      correct: "A",
      explanation: "Khi khép kín mạch tải ngoài, có dòng điện xoay chiều chạy qua các cuộn dây phần ứng. Theo định luật Lenz, dòng điện cảm ứng sinh ra từ trường tác dụng lực từ cản trở chuyển động quay của rôto (mômen hãm điện từ). Do đó rôto bị phanh chậm lại mạnh, động cơ diesel phải phun thêm nhiên liệu để duy trì tốc độ. Đáp án chính xác là A."
    }
  ];

  const handleChallengeOption = (optionId: string) => {
    if (challengeChecked) return;
    setSelectedOption(optionId);
  };

  const checkChallengeAnswer = () => {
    if (!selectedOption || challengeChecked) return;
    
    const challenge = challenges[currentChallenge];
    const isCorrect = selectedOption === challenge.correct;
    
    setChallengeChecked(true);
    if (isCorrect) {
      setChallengeScore((prev) => prev + 1);
      setChallengeFeedback("🎉 CHÍNH XÁC! " + challenge.explanation);
    } else {
      setChallengeFeedback("❌ CHƯA ĐÚNG. " + challenge.explanation);
    }
  };

  const nextChallenge = () => {
    setSelectedOption(null);
    setChallengeChecked(false);
    setChallengeFeedback("");
    setCurrentChallenge((prev) => (prev + 1) % challenges.length);
  };

  const resetPractice = () => {
    setCurrentChallenge(0);
    setSelectedOption(null);
    setChallengeChecked(false);
    setChallengeFeedback("");
    setChallengeScore(0);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-800 p-6 space-y-6 text-slate-900 shadow-[6px_6px_0px_0px_#1e293b] animate-fade-in" id="lesson17-simulation">
      
      {/* Simulation Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b-2 border-slate-200 pb-5">
        <div>
          <span className="text-[10px] text-cyan-950 bg-cyan-100 border-2 border-slate-800 px-3 py-1 rounded-full font-black uppercase tracking-wider font-mono flex items-center gap-1.5 w-fit shadow-[2px_2px_0px_#1e293b]">
            <Cpu className="h-3.5 w-3.5 animate-spin" /> PHÒNG THÍ NGHIỆM ĐIỆN TỪ ẢO VẬT LÍ 12
          </span>
          <h3 className="text-lg font-black text-slate-950 uppercase mt-2">Khảo sát máy phát điện xoay chiều hình sin</h3>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-800 gap-1.5 shadow-[2px_2px_0px_0px_#1e293b]">
          <button 
            onClick={() => setActiveTab("single")}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border-2 ${
              activeTab === "single"
                ? "bg-cyan-300 text-slate-950 border-slate-800 shadow-[1.5px_1.5px_0px_#1e293b]"
                : "text-slate-700 hover:text-slate-950 border-transparent"
            }`}
          >
            Máy phát 1 Pha
          </button>
          <button 
            onClick={() => setActiveTab("three")}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border-2 ${
              activeTab === "three"
                ? "bg-emerald-300 text-slate-950 border-slate-800 shadow-[1.5px_1.5px_0px_#1e293b]"
                : "text-slate-700 hover:text-slate-950 border-transparent"
            }`}
          >
            Máy phát 3 Pha
          </button>
          <button 
            onClick={() => setActiveTab("practice")}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border-2 ${
              activeTab === "practice"
                ? "bg-amber-300 text-slate-950 border-slate-800 shadow-[1.5px_1.5px_0px_#1e293b]"
                : "text-slate-700 hover:text-slate-950 border-transparent"
            }`}
          >
            Thực hành thực tiễn
          </button>
        </div>
      </div>

      {/* TABS MAIN CONTENT */}
      {activeTab !== "practice" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Column 1: Live Interactive SVG Visualizer */}
          <div className="lg:col-span-5 bg-slate-50 p-4 rounded-3xl border-2 border-slate-800 flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_0px_#1e293b]">
            
            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <span className="text-[10px] text-slate-700 font-mono font-black uppercase tracking-wide">
                {activeTab === "single" ? "Sơ đồ mặt cắt 1 Pha" : "Cấu trúc stator 3 pha (lệch 120°)"}
              </span>
              <div className="flex gap-1.5">
                <button 
                  onClick={() => setIsRotating(!isRotating)}
                  className={`text-[10px] px-2.5 py-1.5 rounded-lg font-black border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${
                    isRotating 
                      ? "bg-rose-200 hover:bg-rose-300 text-slate-950" 
                      : "bg-emerald-200 hover:bg-emerald-300 text-slate-950"
                  }`}
                >
                  {isRotating ? "⏹ DỪNG QUAY" : "▶ CHO QUAY"}
                </button>
                <button 
                  onClick={() => setAngle(0)}
                  className="text-[10px] bg-white text-slate-950 p-1.5 rounded-lg border-2 border-slate-800 hover:bg-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Generator Illustration */}
            <div className="flex items-center justify-center h-[200px] relative bg-white rounded-xl overflow-hidden border-2 border-slate-850 shadow-inner">
              {activeTab === "single" ? (
                // Single-phase model
                <svg viewBox="0 0 200 160" className="w-full h-full max-h-[190px]">
                  {/* Left Magnet (N) */}
                  <rect x="5" y="25" width="40" height="110" fill="#ef4444" opacity="0.9" rx="3" stroke="#991b1b" strokeWidth="1.5" />
                  <text x="18" y="85" fill="#ffffff" className="text-sm font-black font-mono">N</text>

                  {/* Right Magnet (S) */}
                  <rect x="155" y="25" width="40" height="110" fill="#3b82f6" opacity="0.9" rx="3" stroke="#1e3a8a" strokeWidth="1.5" />
                  <text x="168" y="85" fill="#ffffff" className="text-sm font-black font-mono">S</text>

                  {/* Shaft axis */}
                  <line x1="100" y1="10" x2="100" y2="150" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />

                  {/* Rotating wire dẹt frame */}
                  {(() => {
                    const cosW = Math.cos(angle);
                    const sinW = Math.sin(angle);
                    const w = 35 * cosW;
                    const hShift = 8 * sinW;
                    const lx = 100 - w;
                    const rx = 100 + w;
                    return (
                      <g>
                        {/* Red branch */}
                        <line x1={lx} y1={40 + hShift} x2={lx} y2={100 + hShift} stroke="#ef4444" strokeWidth="2.5" />
                        {/* Blue branch */}
                        <line x1={rx} y1={40 - hShift} x2={rx} y2={100 - hShift} stroke="#3b82f6" strokeWidth="2.5" />
                        {/* Top connector */}
                        <line x1={lx} y1={40 + hShift} x2={rx} y2={40 - hShift} stroke="#ef4444" strokeWidth="1.5" />
                        {/* Bottom connector */}
                        <line x1={lx} y1={100 + hShift} x2={rx} y2={100 - hShift} stroke="#3b82f6" strokeWidth="1.5" />
                        
                        {/* Current flow arrows (direction flip-flops according to sin) */}
                        {isRotating && Math.sin(angle) > 0 && (
                          <g fill="#d97706" stroke="#d97706" strokeWidth="1">
                            {/* Upwards on left red wire */}
                            <polygon points={`${lx},${65 + hShift} ${lx - 3},${71 + hShift} ${lx + 3},${71 + hShift}`} />
                            {/* Downwards on right blue wire */}
                            <polygon points={`${rx},${75 - hShift} ${rx - 3},${69 - hShift} ${rx + 3},${69 - hShift}`} />
                          </g>
                        )}
                        {isRotating && Math.sin(angle) < 0 && (
                          <g fill="#059669" stroke="#059669" strokeWidth="1">
                            {/* Downwards on left red wire */}
                            <polygon points={`${lx},${75 + hShift} ${lx - 3},${69 + hShift} ${lx + 3},${69 + hShift}`} />
                            {/* Upwards on right blue wire */}
                            <polygon points={`${rx},${65 - hShift} ${rx - 3},${71 - hShift} ${rx + 3},${71 - hShift}`} />
                          </g>
                        )}
                      </g>
                    );
                  })()}

                  {/* Slip rings (vành khuyên) & brushes (chổi quét) in perspective bottom */}
                  <g>
                    {/* Ring 1 (Gold) */}
                    <ellipse cx="100" cy="115" rx="10" ry="4" fill="#fbbf24" stroke="#d97706" />
                    <rect x="88" y="115" width="4" height="6" fill="#4b5563" /> {/* Brush 1 */}
                    
                    {/* Ring 2 (Gold) */}
                    <ellipse cx="100" cy="128" rx="10" ry="4" fill="#fbbf24" stroke="#d97706" />
                    <rect x="108" y="128" width="4" height="6" fill="#4b5563" /> {/* Brush 2 */}
                  </g>

                  {/* Glowing Bulb / LED linked to voltage */}
                  {(() => {
                    const voltageIntensity = Math.min(1, Math.pow(currentVoltageVal / maxVoltage, 2));
                    const glowRadius = 5 + 15 * voltageIntensity;
                    return (
                      <g>
                        {/* Connecting wires to load bulb */}
                        <path d="M 88 117 L 70 117 L 70 145" fill="none" stroke="#4b5563" strokeWidth="1" />
                        <path d="M 112 130 L 130 130 L 130 145" fill="none" stroke="#4b5563" strokeWidth="1" />

                        {/* Lightbulb socket */}
                        <rect x="92" y="143" width="16" height="8" fill="#475569" rx="1" />
                        {/* Glow circle */}
                        <circle cx="100" cy="140" r={glowRadius} fill="#fbbf24" opacity={0.2 + 0.6 * voltageIntensity} />
                        {/* Filament bulb dome */}
                        <circle cx="100" cy="138" r="7" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                        <path d="M 97 140 L 100 135 L 103 140" fill="none" stroke="#f59e0b" strokeWidth="1" />
                        <text x="114" y="146" fill="#b45309" className="text-[8px] font-black uppercase font-mono animate-pulse" opacity={0.7 + 0.3 * voltageIntensity}>
                          {voltageIntensity > 0.05 ? "SÁNG ⚡" : "TẮT"}
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              ) : (
                // Three-phase stator/rotor model
                <svg viewBox="0 0 200 160" className="w-full h-full max-h-[190px]">
                  {/* Outer stator casing */}
                  <circle cx="100" cy="80" r="55" fill="none" stroke="#334155" strokeWidth="4" />

                  {/* Phase 1 Coil A (Top) */}
                  <rect x="90" y="16" width="20" height="10" fill="#ef4444" rx="1" opacity="0.9" stroke="#991b1b" />
                  <text x="96" y="24" fill="#ffffff" className="text-[7px] font-black font-mono">C1</text>
                  <circle cx="100" cy="21" r={3 + 6 * Math.pow(v1 / maxVoltage, 2)} fill="#ef4444" opacity={0.1 + 0.8 * Math.pow(v1 / maxVoltage, 2)} />

                  {/* Phase 2 Coil B (Bottom Right) */}
                  <g transform="rotate(120 100 80)">
                    <rect x="90" y="16" width="20" height="10" fill="#10b981" rx="1" opacity="0.9" stroke="#064e3b" />
                    <text x="96" y="24" fill="#ffffff" className="text-[7px] font-black font-mono">C2</text>
                  </g>
                  <circle cx="140" cy="103" r={3 + 6 * Math.pow(v2 / maxVoltage, 2)} fill="#10b981" opacity={0.1 + 0.8 * Math.pow(v2 / maxVoltage, 2)} />

                  {/* Phase 3 Coil C (Bottom Left) */}
                  <g transform="rotate(240 100 80)">
                    <rect x="90" y="16" width="20" height="10" fill="#3b82f6" rx="1" opacity="0.9" stroke="#1e3a8a" />
                    <text x="96" y="24" fill="#ffffff" className="text-[7px] font-black font-mono">C3</text>
                  </g>
                  <circle cx="60" cy="103" r={3 + 6 * Math.pow(v3 / maxVoltage, 2)} fill="#3b82f6" opacity={0.1 + 0.8 * Math.pow(v3 / maxVoltage, 2)} />

                  {/* Rotating Magnet Rotor inside */}
                  <g transform={`rotate(${(angle * 180) / Math.PI} 100 80)`}>
                    {/* Magnet shape */}
                    <rect x="80" y="72" width="40" height="16" fill="#64748b" rx="2" />
                    {/* N (Red) */}
                    <path d="M 100 72 L 116 72 A 8 8 0 0 1 116 88 L 100 88 Z" fill="#ef4444" />
                    <text x="105" y="83" fill="#ffffff" className="text-[8px] font-black font-mono">N</text>
                    {/* S (Blue) */}
                    <path d="M 100 72 L 84 72 A 8 8 0 0 0 84 88 L 100 88 Z" fill="#3b82f6" />
                    <text x="88" y="83" fill="#ffffff" className="text-[8px] font-black font-mono">S</text>
                    {/* Axis pin */}
                    <circle cx="100" cy="80" r="3" fill="#ffffff" />
                  </g>

                  {/* Labels for LEDs */}
                  <text x="100" y="10" fill="#dc2626" className="text-[8px] font-black text-center" opacity={0.6 + 0.4 * Math.pow(v1/maxVoltage, 2)}>PHA 1 (ĐỎ)</text>
                  <text x="145" y="120" fill="#16a34a" className="text-[8px] font-black" opacity={0.6 + 0.4 * Math.pow(v2/maxVoltage, 2)}>PHA 2 (LỤC)</text>
                  <text x="12" y="120" fill="#2563eb" className="text-[8px] font-black" opacity={0.6 + 0.4 * Math.pow(v3/maxVoltage, 2)}>PHA 3 (LAM)</text>
                </svg>
              )}
            </div>

            {/* Quick telemetry readout */}
            <div className="bg-white p-3.5 rounded-2xl border-2 border-slate-800 space-y-2 text-xs font-mono font-black text-slate-950">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Các thông số tức thời (Telemetry)</span>
              
              {activeTab === "single" ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Từ thông Φ:</span>
                    <strong className="text-emerald-800">{(currentFluxVal * 1e3).toFixed(2)} mWb</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Suất điện đ. e:</span>
                    <strong className="text-rose-800">{currentVoltageVal.toFixed(2)} V</strong>
                  </div>
                  <div className="flex justify-between col-span-2 border-t border-slate-200 pt-1.5 mt-1">
                    <span className="text-slate-600">Dòng cảm ứng i:</span>
                    <strong className="text-amber-800">{(currentCurrentVal * 1e3).toFixed(1)} mA</strong>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-red-700 font-bold">Điện áp u₁ (Đỏ):</span>
                    <strong className="text-red-700">{v1.toFixed(2)} V</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-850 font-bold">Điện áp u₂ (Lục):</span>
                    <strong className="text-emerald-850">{v2.toFixed(2)} V</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-750 font-bold">Điện áp u₃ (Lam):</span>
                    <strong className="text-blue-750">{v3.toFixed(2)} V</strong>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1.5 mt-1 text-xs">
                    <span className="text-slate-600">Tổng pha (u₁+u₂+u₃):</span>
                    <strong className="text-amber-900">{sumV.toFixed(4)} V (Bằng 0)</strong>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Parameter Sliders Controls & Live Digital Oscilloscope */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
            
            {/* Live Digital Oscilloscope Screen */}
            <div className="bg-slate-50 p-4 rounded-3xl border-2 border-slate-800 flex flex-col space-y-2 shadow-[4px_4px_0px_0px_#1e293b]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[10px] text-slate-700 font-mono font-black uppercase tracking-wide">Dao động ký (Oscilloscope Screen)</span>
                </div>
                <div className="text-[10px] font-mono font-black">
                  {activeTab === "single" ? (
                    <span className="flex gap-2">
                      <strong className="text-emerald-800">🟢 Từ thông Φ</strong>
                      <strong className="text-rose-800">🔴 Suất điện đ. e</strong>
                    </span>
                  ) : (
                    <span className="text-slate-500">Dòng 3 pha lệch 120°</span>
                  )}
                </div>
              </div>

              {/* Canvas element */}
              <div className="bg-white rounded-xl p-1 border-2 border-slate-800 shadow-inner">
                <canvas 
                  ref={canvasRef} 
                  width={450} 
                  height={150} 
                  className="w-full h-[150px]"
                />
              </div>

              <div className="text-[9px] text-slate-500 text-center font-mono font-bold uppercase tracking-wide">
                🕒 Trục hoành: Thời gian t (s) | Trục tung: Biên độ Suất điện động (V)
              </div>
            </div>

            {/* Parameter adjusters sliders */}
            <div className="bg-white p-4 rounded-3xl border-2 border-slate-800 space-y-4 shadow-[4px_4px_0px_0px_#1e293b]">
              <div className="flex items-center gap-1.5 text-cyan-950 border-b border-slate-200 pb-2">
                <span className="p-1.5 bg-cyan-100 border-2 border-slate-800 rounded-xl"><Gauge className="h-4 w-4" /></span>
                <span className="text-xs font-black uppercase tracking-wider font-mono">Bảng điều khiển kết cấu máy phát</span>
              </div>

              {/* Sliders in a 2-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-900">
                
                {/* 1. Angular Speed ω */}
                <div className="space-y-1.5 bg-cyan-50/50 p-2.5 rounded-xl border-2 border-slate-800">
                  <div className="flex justify-between font-mono text-[10px] font-black text-slate-950">
                    <span>Vận tốc góc quay (ω):</span>
                    <strong className="text-cyan-800">{speed.toFixed(1)} rad/s</strong>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-cyan-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-400"
                  />
                  <span className="text-[9px] text-slate-500 italic block leading-none mt-1">Tần số dòng điện f = ω/2π</span>
                </div>

                {/* 2. Magnetic Field B */}
                <div className="space-y-1.5 bg-emerald-50/50 p-2.5 rounded-xl border-2 border-slate-800">
                  <div className="flex justify-between font-mono text-[10px] font-black text-slate-950">
                    <span>Cảm ứng từ đều (B):</span>
                    <strong className="text-emerald-800">{magneticField.toFixed(1)} Tesla</strong>
                  </div>
                  <input 
                    type="range"
                    min="0.1"
                    max="1.5"
                    step="0.1"
                    value={magneticField}
                    onChange={(e) => setMagneticField(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-400"
                  />
                  <span className="text-[9px] text-slate-500 italic block leading-none mt-1">Độ mạnh nam châm rôto</span>
                </div>

                {/* 3. Turns N */}
                <div className="space-y-1.5 bg-rose-50/50 p-2.5 rounded-xl border-2 border-slate-800">
                  <div className="flex justify-between font-mono text-[10px] font-black text-slate-950">
                    <span>Số vòng cuộn dây (N):</span>
                    <strong className="text-rose-800">{turns} vòng</strong>
                  </div>
                  <input 
                    type="range"
                    min="50"
                    max="500"
                    step="25"
                    value={turns}
                    onChange={(e) => setTurns(parseInt(e.target.value))}
                    className="w-full accent-rose-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-400"
                  />
                  <span className="text-[9px] text-slate-500 italic block leading-none mt-1">Quyết định biên độ cảm ứng cực đại</span>
                </div>

                {/* 4. Area S */}
                <div className="space-y-1.5 bg-amber-50/50 p-2.5 rounded-xl border-2 border-slate-800">
                  <div className="flex justify-between font-mono text-[10px] font-black text-slate-950">
                    <span>Diện tích khung dây (S):</span>
                    <strong className="text-amber-800">{area} cm²</strong>
                  </div>
                  <input 
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={area}
                    onChange={(e) => setArea(parseInt(e.target.value))}
                    className="w-full accent-amber-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-400"
                  />
                  <span className="text-[9px] text-slate-500 italic block leading-none mt-1">Diện tích hứng từ thông</span>
                </div>
              </div>

              {/* Outputs Summary Badge */}
              <div className="bg-slate-50 p-2.5 rounded-xl border-2 border-slate-800 flex justify-between items-center text-[10px] font-mono font-black text-slate-950">
                <span className="text-slate-500 font-bold uppercase text-[9px]">Giá trị cực đại thiết kế:</span>
                <span className="space-x-2 text-right">
                  <span className="text-emerald-800 font-black">Φ₀ = <strong className="text-slate-950">{(maxFlux * 1e3).toFixed(2)} mWb</strong></span>
                  <span className="text-rose-800 font-black">E₀ = <strong className="text-slate-950">{maxVoltage.toFixed(1)} V</strong></span>
                  <span className="text-amber-800 font-black">I₀ = <strong className="text-slate-950">{(maxCurrent * 1e3).toFixed(1)} mA</strong></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TAB 3: PRACTICE CHALLENGES */
        <div className="space-y-6 animate-fade-in">
          {/* Practice tracker header */}
          <div className="bg-amber-50 border-2 border-slate-800 p-4.5 rounded-2xl flex justify-between items-center flex-wrap gap-2 shadow-[4px_4px_0px_0px_#1e293b]">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-amber-100 border-2 border-slate-800 rounded-2xl"><Award className="h-5 w-5 text-amber-800 animate-bounce" /></span>
              <div>
                <h4 className="text-sm font-black text-slate-950 uppercase tracking-wider">Hệ thống bài tập thực hành máy phát điện</h4>
                <p className="text-[10px] text-slate-700 font-mono font-bold">Bám sát cấu trúc bài học, kích thích tư duy giải quyết vấn đề kỹ thuật</p>
              </div>
            </div>
            <div className="text-xs font-mono bg-white px-3.5 py-1.5 rounded-lg border-2 border-slate-800 font-black text-slate-950 shadow-[2px_2px_0px_0px_#1e293b]">
              Đúng: <strong className="text-emerald-800 text-sm">{challengeScore}</strong> / {challenges.length}
            </div>
          </div>

          {/* Current Question Frame */}
          {(() => {
            const challenge = challenges[currentChallenge];
            return (
              <div className="bg-white p-5 rounded-2xl border-2 border-slate-800 space-y-4 animate-fade-in shadow-[4px_4px_0px_0px_#1e293b]">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-[10px] bg-amber-100 text-amber-950 border-2 border-slate-800 px-2.5 py-1 rounded-lg font-black uppercase tracking-wide">
                    Thử thách {currentChallenge + 1}
                  </span>
                  <span className="text-[10px] text-slate-600 font-mono font-black">Độ khó: Vận dụng thực tế</span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm sm:text-base font-black text-slate-950 leading-snug"><FormattedMathText text={challenge.title} /></h4>
                  <p className="text-slate-800 leading-relaxed font-bold bg-slate-50 p-4 rounded-xl border-2 border-slate-850 italic shadow-inner text-xs sm:text-sm">
                    <FormattedMathText text={challenge.scenario} />
                  </p>
                </div>

                {/* Options list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleChallengeOption(opt.id)}
                      className={`text-left text-xs sm:text-sm p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center ${
                        selectedOption === opt.id
                          ? "bg-amber-100 border-slate-800 text-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black"
                          : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-800 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold"
                      }`}
                    >
                      <strong className="text-amber-800 font-mono mr-1.5 font-black shrink-0">{opt.id}.</strong>
                      <span className="flex-1 leading-normal">
                        <FormattedMathText text={opt.text} />
                      </span>
                    </button>
                  ))}
                </div>

                {/* Feedback block */}
                {challengeChecked && (
                  <div className={`p-4 rounded-xl border-2 text-xs sm:text-sm leading-relaxed font-bold animate-fade-in ${
                    selectedOption === challenge.correct
                      ? "bg-emerald-100 border-emerald-900 text-emerald-950 shadow-[2px_2px_0px_0px_#000]"
                      : "bg-rose-100 border-rose-900 text-rose-950 shadow-[2px_2px_0px_0px_#000]"
                  }`}>
                    <FormattedMathText text={challengeFeedback} />
                  </div>
                )}

                {/* Actions bottom */}
                <div className="flex justify-end gap-3 border-t border-slate-200 pt-3">
                  <button 
                    onClick={resetPractice}
                    className="text-xs bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b] px-4 py-2 rounded-xl transition-all font-black cursor-pointer"
                  >
                    LÀM LẠI TỪ ĐẦU
                  </button>
                  {!challengeChecked ? (
                    <button
                      disabled={!selectedOption}
                      onClick={checkChallengeAnswer}
                      className="text-xs bg-amber-300 disabled:opacity-40 hover:bg-amber-400 text-slate-950 border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b] font-black px-5 py-2 rounded-xl transition-all uppercase tracking-wide cursor-pointer"
                    >
                      KIỂM TRA ĐÁP ÁN
                    </button>
                  ) : (
                    <button
                      onClick={nextChallenge}
                      className="text-xs bg-cyan-300 hover:bg-cyan-400 text-slate-950 border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b] font-black px-5 py-2 rounded-xl transition-all uppercase tracking-wide flex items-center gap-1.5 cursor-pointer"
                    >
                      TIẾP TỤC <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Footer Info bar */}
      <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-800 flex items-start gap-2.5">
        <span className="p-1.5 bg-cyan-100 border-2 border-slate-800 rounded-xl"><ShieldCheck className="h-5 w-5 text-cyan-850 shrink-0" /></span>
        <p className="text-xs text-slate-800 leading-relaxed font-bold">
          💡 <strong>Mẹo tự học:</strong> Thay đổi <strong>Vận tốc góc (ω)</strong> để làm tăng tần số biến thiên và điện áp đỉnh cực đại. Đồ thị dao động ký sẽ giúp bạn quan sát rõ nét độ lệch pha 90 độ giữa Từ thông Φ và Suất điện động e!
        </p>
      </div>

    </div>
  );
}
