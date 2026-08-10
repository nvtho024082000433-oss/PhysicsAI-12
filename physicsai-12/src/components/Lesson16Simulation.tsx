import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, ArrowRight, CheckCircle2, AlertCircle, Compass, Zap, Gauge, Award, Info, Sparkles } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson16Simulation() {
  // Tabs
  const [activeTab, setActiveTab] = useState<"drop" | "manual" | "practice">("drop");

  // Physics Simulation States (Experiment 1: Falling Magnet)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [dropHeight, setDropHeight] = useState<number>(30); // in cm (10 - 50)
  const [coilTurns, setCoilTurns] = useState<number>(500); // 100 - 1000
  const [magnetStrength, setMagnetStrength] = useState<number>(0.5); // T (0.1 - 1.0)
  const [dropPole, setDropPole] = useState<"N" | "S">("N");

  // Real-time animation states
  const [magnetY, setMagnetY] = useState<number>(50); // Start position in px (y-axis)
  const [velocity, setVelocity] = useState<number>(0); // in m/s
  const [elapsedTime, setElapsedTime] = useState<number>(0); // in ms
  const [realtimeFlux, setRealtimeFlux] = useState<number>(0); // in mWb
  const [realtimeVoltage, setRealtimeVoltage] = useState<number>(0); // in V
  const [realtimeCurrent, setRealtimeCurrent] = useState<number>(0); // in mA
  
  // Graph history
  const [graphData, setGraphData] = useState<{ t: number; phi: number; emf: number }[]>([]);
  const [maxPositiveEMF, setMaxPositiveEMF] = useState<number>(0);
  const [maxNegativeEMF, setMaxNegativeEMF] = useState<number>(0);

  // Animation Refs
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Manual Drag Mode States
  const [manualY, setManualY] = useState<number>(150); // px
  const [manualVelocity, setManualVelocity] = useState<number>(0); // computed speed
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [manualFlux, setManualFlux] = useState<number>(0);
  const [manualVoltage, setManualVoltage] = useState<number>(0);

  // Manual Drag Mode Gravity Fall Refs & States
  const [isManualFalling, setIsManualFalling] = useState<boolean>(false);
  const manualYRef = useRef<number>(150);
  const manualPrevYRef = useRef<number>(150);
  const manualRequestRef = useRef<number | null>(null);
  const manualLastTimeRef = useRef<number | null>(null);
  const manualFallVelocityRef = useRef<number>(0);

  // Sync refs with state
  useEffect(() => {
    manualYRef.current = manualY;
  }, [manualY]);

  // Practice Challenges States
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [challengeAnswer, setChallengeAnswer] = useState<string | null>(null);
  const [challengeChecked, setChallengeChecked] = useState<boolean>(false);
  const [challengeFeedback, setChallengeFeedback] = useState<string>("");
  const [challengeScore, setChallengeScore] = useState<number>(0);

  // Practice questions
  const challenges = [
    {
      id: 1,
      title: "Thử Thách 1: Chiều dòng điện cảm ứng (Định luật Lenz)",
      scenario: "Thả rơi cực Nam (S) của nam châm vĩnh cửu hướng xuống dưới đi vào ống dây (cuộn dây đặt thẳng đứng). Hỏi chiều dòng điện cảm ứng chạy trong vòng dây nhìn từ trên xuống dưới có chiều nào?",
      options: [
        { id: "A", text: "Cùng chiều kim đồng hồ." },
        { id: "B", text: "Ngược chiều kim đồng hồ." },
        { id: "C", text: "Không xuất hiện dòng điện vì cực Nam không phát ra từ trường." },
        { id: "D", text: "Dòng điện ban đầu bằng không sau đó tăng tuyến tính một chiều." }
      ],
      correct: "A",
      explanation: "Khi cực Nam (S) tiến lại gần, từ thông tăng. Từ trường cảm ứng Bc phải hướng lên trên để chống lại sự tăng (tạo cực Nam ở mặt trên ống dây nhằm đẩy nam châm ra). Nhìn từ trên xuống, theo quy tắc nắm bàn tay phải, ngón cái chỉ lên trên thì các ngón tay khum lại theo chiều cùng chiều kim đồng hồ."
    },
    {
      id: 2,
      title: "Thử Thách 2: Tính toán suất điện động cảm ứng cực đại",
      scenario: "Một cuộn dây có N = 400 vòng dây. Khi một thanh nam châm trượt qua, từ thông qua mỗi vòng dây biến thiên giảm đều đặn từ 8.10⁻⁴ Wb xuống 2.10⁻⁴ Wb trong khoảng thời gian cực ngắn là Δt = 0.03 giây. Hãy tính độ lớn suất điện động cảm ứng sinh ra trong cuộn dây.",
      options: [
        { id: "A", text: "4.0 V" },
        { id: "B", text: "8.0 V" },
        { id: "C", text: "12.0 V" },
        { id: "D", text: "16.0 V" }
      ],
      correct: "B",
      explanation: "Độ biến thiên từ thông của một vòng dây: ΔΦ = 8.10⁻⁴ - 2.10⁻⁴ = 6.10⁻⁴ Wb. Theo định luật Faraday, độ lớn suất điện động cảm ứng là: |e_c| = N * (ΔΦ / Δt) = 400 * (6.10⁻⁴ / 0.03) = 400 * 0.02 = 8.0 V."
    },
    {
      id: 3,
      title: "Thử Thách 3: Hiệu ứng của tốc độ rơi",
      scenario: "Tại sao trong thí nghiệm thả rơi nam châm qua cuộn dây (Hình 16.11), biên độ đỉnh xung suất điện động thứ hai (khi nam châm đi ra) lại luôn cao hơn và hẹp hơn so với biên độ đỉnh xung thứ nhất (khi nam châm đi vào)?",
      options: [
        { id: "A", text: "Vì từ trường của Trái Đất cộng hưởng làm tăng cảm ứng từ lúc nam châm ở phía dưới." },
        { id: "B", text: "Vì nam châm rơi tự do có gia tốc, vận tốc lúc đi ra lớn hơn lúc đi vào, làm tốc độ biến thiên từ thông lớn hơn." },
        { id: "C", text: "Vì cuộn dây bằng đồng tích tụ nhiệt lượng chuyển hoá thành điện tích phóng ra lúc sau." },
        { id: "D", text: "Vì cực Nam luôn mạnh gấp đôi cực Bắc của nam châm vĩnh cửu." }
      ],
      correct: "B",
      explanation: "Do gia tốc trọng trường g, nam châm rơi càng ngày càng nhanh. Vận tốc lúc thoát ra khỏi ống dây lớn hơn nhiều so với lúc vừa chạm rơi vào. Vận tốc v tăng làm thời gian biến thiên Δt ngắn lại (xung hẹp hơn) và tốc độ biến thiên từ thông dΦ/dt tăng vọt, sinh ra biên độ suất điện động cảm ứng |e_c| lớn hơn rõ rệt."
    }
  ];

  // CONSTANTS FOR PHYSICS MODEL
  const COIL_Y_CENTER = 250;
  const COIL_RADIUS = 30; // px
  const MAGNET_LENGTH = 50; // px

  // Physics Model for Flux and EMF
  const computeFlux = (yRel: number, N: number, B_max: number, poleSign: number) => {
    const R = COIL_RADIUS;
    const d = MAGNET_LENGTH * 0.8;
    const z1 = yRel - d / 2; // distance from North pole to coil center
    const z2 = yRel + d / 2; // distance from South pole to coil center

    const flux1 = 1 / Math.sqrt(1 + (z1 / R) ** 2);
    const flux2 = 1 / Math.sqrt(1 + (z2 / R) ** 2);

    const phiMaxPerTurn = B_max * 2.5; // mWb
    const totalFlux = (N / 100) * phiMaxPerTurn * (flux1 - flux2) * poleSign;
    return totalFlux;
  };

  // Derivative of flux with respect to position dy
  const computeDPhiDy = (yRel: number, N: number, B_max: number, poleSign: number) => {
    const R = COIL_RADIUS;
    const d = MAGNET_LENGTH * 0.8;
    const z1 = yRel - d / 2;
    const z2 = yRel + d / 2;

    const term1 = -z1 / (R * R * (1 + (z1 / R) ** 2) ** 1.5);
    const term2 = -z2 / (R * R * (1 + (z2 / R) ** 2) ** 1.5);

    const phiMaxPerTurn = B_max * 2.5;
    const dPhiDy = (N / 100) * phiMaxPerTurn * (term1 - term2) * poleSign;
    return dPhiDy; // mWb/px
  };

  // Run Drop Simulation Loop
  const simulateDrop = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current; // in ms
    setElapsedTime(elapsed);

    const tSec = elapsed / 1000;

    const startYRel = -120 - (dropHeight * 3.5); // relative to center of coil
    const g_px_per_s2 = 380; // scaled gravity for nice visual speed

    const currentYRel = startYRel + 0.5 * g_px_per_s2 * (tSec ** 2);
    const currentY = COIL_Y_CENTER + currentYRel;

    const currentV_px = g_px_per_s2 * tSec;
    const currentV_m_s = currentV_px / 100;
    setVelocity(currentV_m_s);

    const poleSign = dropPole === "N" ? 1 : -1;

    // Calculate Flux (mWb)
    const flux = computeFlux(currentYRel, coilTurns, magnetStrength, poleSign);
    setRealtimeFlux(flux);

    // Calculate EMF (V)
    const dPhiDy = computeDPhiDy(currentYRel, coilTurns, magnetStrength, poleSign);
    const emf_mV = -dPhiDy * currentV_px;
    const emf_V = (emf_mV / 1000) * 100;
    setRealtimeVoltage(emf_V);

    // Current I = V / R. Let R = 10 Ohm for coil.
    const current_mA = emf_V * 100;
    setRealtimeCurrent(current_mA);

    // Add to graph data
    setGraphData((prev) => {
      if (prev.length > 300) return prev;
      const newData = [...prev, { t: elapsed, phi: flux, emf: emf_V }];
      return newData;
    });

    // Update Max values
    if (emf_V > 0 && emf_V > maxPositiveEMF) setMaxPositiveEMF(emf_V);
    if (emf_V < 0 && emf_V < maxNegativeEMF) setMaxNegativeEMF(emf_V);

    // Magnet visual position
    setMagnetY(currentY);

    // Stopping condition: when magnet is far below the coil
    if (currentY > 450) {
      setIsPlaying(false);
      setMagnetY(450);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    } else {
      requestRef.current = requestAnimationFrame(simulateDrop);
    }
  };

  // Start Drop
  const handleStartDrop = () => {
    setIsPlaying(true);
    setGraphData([]);
    setMaxPositiveEMF(0);
    setMaxNegativeEMF(0);
    startTimeRef.current = null;
    requestRef.current = requestAnimationFrame(simulateDrop);
  };

  // Reset Drop
  const handleResetDrop = () => {
    setIsPlaying(false);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    const startYRel = -120 - (dropHeight * 3.5);
    setMagnetY(COIL_Y_CENTER + startYRel);
    setVelocity(0);
    setElapsedTime(0);
    setRealtimeFlux(0);
    setRealtimeVoltage(0);
    setRealtimeCurrent(0);
    setGraphData([]);
    setMaxPositiveEMF(0);
    setMaxNegativeEMF(0);
  };

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (manualRequestRef.current) {
        cancelAnimationFrame(manualRequestRef.current);
      }
    };
  }, []);

  // Update initial magnet position when parameters change and simulation is idle
  useEffect(() => {
    if (!isPlaying) {
      const startYRel = -120 - (dropHeight * 3.5);
      setMagnetY(COIL_Y_CENTER + startYRel);
    }
  }, [dropHeight, isPlaying]);

  // MANUAL DRAG MODE PHYSICS
  const handleManualDrag = (newY: number, isUserSource: boolean = false) => {
    if (isUserSource) {
      stopManualFall();
    }
    setManualY(newY);
    manualYRef.current = newY;
    
    // Compute instantaneous velocity dy/dt
    const dy = newY - manualPrevYRef.current;
    const dt = 16.67; // approx 1 frame in ms
    const v_px_s = (dy / dt) * 1000;
    const v_m_s = v_px_s / 100;
    setManualVelocity(v_m_s);
    manualPrevYRef.current = newY;

    const yRel = newY - COIL_Y_CENTER;
    const poleSign = 1; // North first for simplicity

    // Compute flux
    const flux = computeFlux(yRel, coilTurns, magnetStrength, poleSign);
    setManualFlux(flux);

    // Compute EMF
    const dPhiDy = computeDPhiDy(yRel, coilTurns, magnetStrength, poleSign);
    const emf_mV = -dPhiDy * v_px_s;
    const emf_V = (emf_mV / 1000) * 100;
    setManualVoltage(emf_V);
  };

  const simulateManualDrop = (timestamp: number) => {
    if (!manualLastTimeRef.current) {
      manualLastTimeRef.current = timestamp;
      manualRequestRef.current = requestAnimationFrame(simulateManualDrop);
      return;
    }
    const dt = (timestamp - manualLastTimeRef.current) / 1000; // dt in seconds
    manualLastTimeRef.current = timestamp;

    const g_px_per_s2 = 380; // gravity matching drop simulation
    manualFallVelocityRef.current += g_px_per_s2 * dt;

    const nextY = manualYRef.current + manualFallVelocityRef.current * dt;

    if (nextY >= 210) {
      handleManualDrag(210);
      setIsManualFalling(false);
      manualRequestRef.current = null;
    } else {
      handleManualDrag(nextY);
      manualRequestRef.current = requestAnimationFrame(simulateManualDrop);
    }
  };

  const stopManualFall = () => {
    setIsManualFalling(false);
    if (manualRequestRef.current) {
      cancelAnimationFrame(manualRequestRef.current);
      manualRequestRef.current = null;
    }
    manualLastTimeRef.current = null;
  };

  const startManualFall = () => {
    if (manualYRef.current < 210) {
      stopManualFall();
      setIsManualFalling(true);
      manualFallVelocityRef.current = 0; // fall from rest
      manualLastTimeRef.current = null;
      manualRequestRef.current = requestAnimationFrame(simulateManualDrop);
    }
  };

  // Listen to global pointerup to handle release anywhere on screen
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        startManualFall();
      }
    };

    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("mouseup", handleGlobalPointerUp);
    window.addEventListener("touchend", handleGlobalPointerUp);

    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("mouseup", handleGlobalPointerUp);
      window.removeEventListener("touchend", handleGlobalPointerUp);
    };
  }, [isDragging]);

  // PRACTICE CHALLENGE ACTIONS
  const handleCheckAnswer = () => {
    if (!challengeAnswer) return;
    setChallengeChecked(true);
    const currentQ = challenges[currentChallenge];
    if (challengeAnswer === currentQ.correct) {
      setChallengeFeedback("Chính xác! " + currentQ.explanation);
      setChallengeScore((prev) => prev + 1);
    } else {
      setChallengeFeedback("Chưa chính xác rồi. " + currentQ.explanation);
    }
  };

  const handleNextChallenge = () => {
    setChallengeAnswer(null);
    setChallengeChecked(false);
    setChallengeFeedback("");
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge((prev) => prev + 1);
    } else {
      setCurrentChallenge(0);
      setChallengeScore(0);
    }
  };

  // Calculate dynamic auto-scaling for the oscilloscope graph
  const tMax = graphData.length > 0 ? Math.max(1000, ...graphData.map(d => d.t)) : 1000;
  const maxPhiVal = graphData.length > 0 ? Math.max(...graphData.map(d => Math.abs(d.phi))) : 0;
  const maxEmfVal = graphData.length > 0 ? Math.max(...graphData.map(d => Math.abs(d.emf))) : 0;

  const safeMaxPhi = Math.max(0.1, maxPhiVal);
  const safeMaxEmf = Math.max(0.01, maxEmfVal);
  
  const phiScale = 45 / safeMaxPhi;
  const emfScale = 45 / safeMaxEmf;

  return (
    <div className="space-y-8 text-slate-950 font-sans max-w-4xl mx-auto py-2 animate-fade-in">
      
      {/* Tab Selectors with Neo-Brutalist 3D blocks */}
      <div className="flex border-b-2 border-slate-900 pb-4 justify-between items-center flex-wrap gap-4">
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => {
              setActiveTab("drop");
              handleResetDrop();
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase transition-all duration-200 cursor-pointer border-2 border-slate-950 ${
              activeTab === "drop"
                ? "bg-cyan-100 text-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] translate-y-[-2px]"
                : "text-slate-800 hover:text-slate-950 bg-white hover:bg-slate-50 active:translate-y-0"
            }`}
          >
            <Gauge className="h-4 w-4 inline mr-1.5" />
            1. Thả rơi tự do (Đồ thị)
          </button>
          <button
            onClick={() => {
              setActiveTab("manual");
              handleResetDrop();
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase transition-all duration-200 cursor-pointer border-2 border-slate-950 ${
              activeTab === "manual"
                ? "bg-amber-100 text-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] translate-y-[-2px]"
                : "text-slate-800 hover:text-slate-950 bg-white hover:bg-slate-50 active:translate-y-0"
            }`}
          >
            <Compass className="h-4 w-4 inline mr-1.5" />
            2. Di chuyển thủ công
          </button>
          <button
            onClick={() => {
              setActiveTab("practice");
              handleResetDrop();
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase transition-all duration-200 cursor-pointer border-2 border-slate-950 ${
              activeTab === "practice"
                ? "bg-purple-100 text-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] translate-y-[-2px]"
                : "text-slate-800 hover:text-slate-950 bg-white hover:bg-slate-50 active:translate-y-0"
            }`}
          >
            <Award className="h-4 w-4 inline mr-1.5" />
            3. Thực hành tăng cường
          </button>
        </div>
        <div className="text-[10px] font-mono text-slate-600 font-extrabold bg-slate-100 border-2 border-slate-900 rounded-lg px-2.5 py-1.5 shadow-[2px_2px_0px_0px_#000]">
          MÔ PHỎNG BÀI 16
        </div>
      </div>

      {/* TAB 1: DROPPING MAGNET EXPERIMENT */}
      {activeTab === "drop" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 bg-slate-50 border-2 border-slate-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-5">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b-2 border-slate-900/10 pb-2">
              Thông số thiết lập
            </h4>

            {/* Drop Height */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">Độ cao thả rơi (Height):</span>
                <span className="text-cyan-800 font-mono font-black">{dropHeight} cm</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="50" 
                disabled={isPlaying}
                value={dropHeight}
                onChange={(e) => setDropHeight(parseInt(e.target.value))}
                className="w-full accent-cyan-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 font-medium">Độ cao càng lớn, nam châm đạt vận tốc càng cao khi xuyên qua ống dây.</p>
            </div>

            {/* Coil Turns */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">Số vòng dây N (Turns):</span>
                <span className="text-cyan-800 font-mono font-black">{coilTurns} vòng</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="1000" 
                step="50"
                disabled={isPlaying}
                value={coilTurns}
                onChange={(e) => setCoilTurns(parseInt(e.target.value))}
                className="w-full accent-cyan-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 font-medium">Số vòng dây tỉ lệ thuận trực tiếp với độ lớn suất điện động sinh ra.</p>
            </div>

            {/* Magnet Strength */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">Cảm ứng từ cực đại B (max):</span>
                <span className="text-cyan-800 font-mono font-black">{magnetStrength.toFixed(1)} Tesla</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.1"
                disabled={isPlaying}
                value={magnetStrength}
                onChange={(e) => setMagnetStrength(parseFloat(e.target.value))}
                className="w-full accent-cyan-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 font-medium">Độ mạnh từ trường quyết định mật độ đường sức xuyên qua khung.</p>
            </div>

            {/* Falling Pole selection */}
            <div className="space-y-2 border-t border-slate-200 pt-3">
              <span className="text-xs font-bold text-slate-850 block">Cực rơi xuống trước:</span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setDropPole("N")}
                  disabled={isPlaying}
                  className={`py-2 rounded-xl text-xs font-black uppercase transition-all border-2 border-slate-900 ${
                    dropPole === "N"
                      ? "bg-red-100 text-red-950 shadow-[2px_2px_0px_0px_#000]"
                      : "bg-white text-slate-600 hover:text-slate-950"
                  }`}
                >
                  Cực Bắc (N) trước
                </button>
                <button
                  onClick={() => setDropPole("S")}
                  disabled={isPlaying}
                  className={`py-2 rounded-xl text-xs font-black uppercase transition-all border-2 border-slate-900 ${
                    dropPole === "S"
                      ? "bg-blue-100 text-blue-950 shadow-[2px_2px_0px_0px_#000]"
                      : "bg-white text-slate-600 hover:text-slate-950"
                  }`}
                >
                  Cực Nam (S) trước
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2.5 pt-3 border-t border-slate-200">
              <button
                onClick={handleStartDrop}
                disabled={isPlaying}
                className="flex-1 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black rounded-2xl text-xs uppercase flex items-center justify-center gap-2 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#000] hover:translate-y-[-2px] active:translate-y-0 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-[1px_1px_0px_0px_#000] cursor-pointer"
              >
                <Play className="h-4 w-4" />
                THẢ NAM CHÂM
              </button>
              <button
                onClick={handleResetDrop}
                className="p-3 bg-white border-2 border-slate-900 text-slate-800 rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.95] cursor-pointer shadow-[3px_3px_0px_0px_#000]"
                title="Khởi động lại vị trí"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Visual Animation Sandbox */}
          <div className="lg:col-span-3 bg-white border-2 border-slate-900 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#000] flex flex-col items-center relative min-h-[380px] justify-between">
            <span className="text-[10px] text-slate-600 font-mono font-black uppercase mb-2 border-b border-slate-100 pb-1 w-full text-center">Bể thả rơi cơ học</span>

            {/* The Physical Arena */}
            <div className="w-full h-[280px] bg-slate-50 border-2 border-slate-900 rounded-2xl relative overflow-hidden flex justify-center shadow-inner">
              {/* Stand Axis guides */}
              <line x1="100" y1="0" x2="100" y2="280" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" className="absolute" />

              {/* Glowing LED */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#000]">
                <div 
                  className={`h-3 w-3 rounded-full transition-all duration-75 border border-slate-950 ${
                    Math.abs(realtimeCurrent) > 5 
                      ? "bg-amber-400 shadow-md animate-pulse scale-110" 
                      : "bg-slate-300"
                  }`} 
                />
                <span className="text-[9px] text-slate-900 font-black uppercase font-mono">ĐÈN LED</span>
              </div>

              {/* Magnet falling */}
              <div 
                className="absolute w-8 flex flex-col rounded-md shadow-lg border-2 border-slate-900 transition-all duration-75 overflow-hidden"
                style={{ 
                  top: `${magnetY - MAGNET_LENGTH / 2}px`, 
                  height: `${MAGNET_LENGTH}px`,
                  left: "calc(50% - 16px)"
                }}
              >
                {dropPole === "N" ? (
                  <>
                    <div className="flex-1 bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center text-[10px] font-black text-white font-mono border-b border-slate-900/10">S</div>
                    <div className="flex-1 bg-gradient-to-b from-red-500 to-red-600 flex items-center justify-center text-[10px] font-black text-white font-mono">N</div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 bg-gradient-to-b from-red-500 to-red-600 flex items-center justify-center text-[10px] font-black text-white font-mono border-b border-slate-900/10">N</div>
                    <div className="flex-1 bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center text-[10px] font-black text-white font-mono">S</div>
                  </>
                )}
              </div>

              {/* Coil Tube */}
              <div 
                className="absolute w-16 border-2 border-slate-900 bg-amber-50/90 flex flex-col justify-between items-center rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]"
                style={{
                  top: "135px",
                  height: "50px",
                  left: "calc(50% - 32px)",
                  zIndex: 10
                }}
              >
                {/* Copper wraps layers representation */}
                <div className="w-full flex flex-col gap-[2px] p-1.5 justify-center h-full">
                  <div className="h-[2px] bg-amber-600 opacity-90" />
                  <div className="h-[2px] bg-amber-700 opacity-95" />
                  <div className="h-[2px] bg-amber-600 opacity-90" />
                  <div className="h-[2px] bg-amber-700 opacity-95" />
                  <div className="h-[2px] bg-amber-600 opacity-90" />
                </div>
              </div>

              <div className="absolute bottom-2 left-2 text-[9px] font-mono font-black text-slate-500 space-y-0.5">
                <div>Cuộn dây N = {coilTurns}</div>
                <div>Ống dây thẳng đứng</div>
              </div>
            </div>

            {/* Live Numerical Readouts */}
            <div className="w-full grid grid-cols-2 gap-2 mt-3">
              <div className="bg-slate-50 p-2 rounded-2xl border-2 border-slate-900 text-center shadow-[1.5px_1.5px_0px_0px_#000]">
                <span className="text-[8.5px] text-slate-500 font-bold uppercase font-mono">Vận tốc v</span>
                <div className="text-xs font-black text-cyan-800 font-mono mt-0.5">{velocity.toFixed(2)} <span className="text-[9px] font-medium text-slate-600">m/s</span></div>
              </div>
              <div className="bg-slate-50 p-2 rounded-2xl border-2 border-slate-900 text-center shadow-[1.5px_1.5px_0px_0px_#000]">
                <span className="text-[8.5px] text-slate-500 font-bold uppercase font-mono">Từ thông Φ</span>
                <div className="text-xs font-black text-amber-800 font-mono mt-0.5">{realtimeFlux.toFixed(1)} <span className="text-[9px] font-medium text-slate-600">mWb</span></div>
              </div>
              <div className="bg-slate-50 p-2 rounded-2xl border-2 border-slate-900 text-center shadow-[1.5px_1.5px_0px_0px_#000]">
                <span className="text-[8.5px] text-slate-500 font-bold uppercase font-mono">Điện thế e_c</span>
                <div className="text-xs font-black text-emerald-800 font-mono mt-0.5">{(realtimeVoltage >= 0 ? "+" : "")}{realtimeVoltage.toFixed(3)} <span className="text-[9px] font-medium text-slate-600">V</span></div>
              </div>
              <div className="bg-slate-50 p-2 rounded-2xl border-2 border-slate-900 text-center shadow-[1.5px_1.5px_0px_0px_#000]">
                <span className="text-[8.5px] text-slate-500 font-bold uppercase font-mono">Dòng i_c</span>
                <div className="text-xs font-black text-blue-800 font-mono mt-0.5">{(realtimeCurrent >= 0 ? "+" : "")}{realtimeCurrent.toFixed(1)} <span className="text-[9px] font-medium text-slate-600">mA</span></div>
              </div>
            </div>
          </div>

          {/* Real-time Oscilloscope Chart */}
          <div className="lg:col-span-5 bg-white border-2 border-slate-900 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between min-h-[380px] space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
              <span className="text-[10px] text-slate-600 font-mono font-black uppercase">Dao động ký điện tử</span>
              <div className="flex gap-2 text-[9px] font-mono font-black bg-slate-50 border border-slate-200 rounded px-2 py-0.5">
                <span className="text-emerald-700">● e_c (V)</span>
                <span className="text-amber-700">● Φ (mWb)</span>
              </div>
            </div>

            {/* Chart Canvas utilizing responsive vectors */}
            <div className="w-full h-[180px] bg-[#fafafa] rounded-2xl border-2 border-slate-900 relative shadow-inner">
              <svg viewBox="0 0 200 120" className="w-full h-full">
                {/* Oscilloscope Grid Lines */}
                <g stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="2 2">
                  <line x1="10" y1="30" x2="190" y2="30" />
                  <line x1="10" y1="90" x2="190" y2="90" />
                  <line x1="46" y1="10" x2="46" y2="110" />
                  <line x1="82" y1="10" x2="82" y2="110" />
                  <line x1="118" y1="10" x2="118" y2="110" />
                  <line x1="154" y1="10" x2="154" y2="110" />
                </g>

                {/* Horizontal reference axis */}
                <line x1="10" y1="60" x2="190" y2="60" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="182" y="68" fill="#94a3b8" className="text-[7px] font-mono font-black">t</text>
                
                {/* Plotting graph paths */}
                {graphData.length > 1 && (
                  <>
                    {/* Magnetic Flux Path (amber) */}
                    <path
                      d={graphData.map((d, idx) => {
                        const x = 15 + (d.t / tMax) * 165;
                        const y = 60 - (d.phi * phiScale);
                        return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                      }).join(" ")}
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.85"
                    />

                    {/* EMF Voltage Path (emerald) */}
                    <path
                      d={graphData.map((d, idx) => {
                        const x = 15 + (d.t / tMax) * 165;
                        const y = 60 - (d.emf * emfScale);
                        return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                      }).join(" ")}
                      fill="none"
                      stroke="#059669"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                )}
              </svg>

              {/* Helper instruction overlay if no graph */}
              {graphData.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <AlertCircle className="h-5 w-5 text-slate-400 mb-1" />
                  <p className="text-[10px] text-slate-500 font-bold max-w-[180px]">Ấn nút "THẢ NAM CHÂM" để tiến hành ghi nhận đồ thị biến thiên</p>
                </div>
              )}
            </div>

            {/* Analysis readouts demonstrating why the second peak is different */}
            <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-3.5 space-y-2.5 shadow-[2px_2px_0px_0px_#000]">
              <span className="text-[9.5px] text-slate-700 font-black uppercase tracking-wider block border-b border-slate-200 pb-1">Kết quả đo lường đỉnh phổ</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-800">
                <div className="space-y-0.5">
                  <div className="text-slate-500 text-[9px]">Cực đại lúc vào:</div>
                  <div className="text-emerald-700 font-bold font-mono">
                    {maxPositiveEMF > 0 ? `+${maxPositiveEMF.toFixed(3)} V` : "0.000 V"}
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-slate-500 text-[9px]">Cực đại lúc thoát:</div>
                  <div className="text-red-700 font-bold font-mono">
                    {maxNegativeEMF < 0 ? `${maxNegativeEMF.toFixed(3)} V` : "0.000 V"}
                  </div>
                </div>
              </div>
              
              {maxPositiveEMF > 0 && (
                <div className="text-[10.5px] text-slate-800 border-t-2 border-slate-950/10 pt-2 leading-relaxed font-bold">
                  🚀 <strong className="text-slate-950">Nhận xét:</strong> Đỉnh lúc ra có biên độ đạt gấp <span className="text-cyan-800 font-black bg-cyan-100 px-1 rounded">{Math.abs(maxNegativeEMF / maxPositiveEMF).toFixed(1)} lần</span> đỉnh lúc vào vì nam châm di chuyển nhanh hơn do gia tốc g.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANUAL INTERACTIVE EXPLORER */}
      {activeTab === "manual" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Theory / Instructions Panel */}
          <div className="lg:col-span-5 bg-slate-50 border-2 border-slate-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_#000] space-y-4">
            <span className="text-[9.5px] bg-amber-100 border-2 border-amber-400 text-amber-950 px-2.5 py-1 rounded-md font-mono font-black uppercase shadow-[1px_1px_0px_0px_#000] inline-block">Khảo sát Lenz tương tác</span>
            <h4 className="text-md font-black text-slate-950 uppercase leading-tight">Thí nghiệm di chuyển thủ công</h4>
            
            <p className="text-xs text-slate-800 leading-relaxed font-bold">
              Nhấp giữ kéo trực tiếp nam châm thẳng đứng di chuyển đi xuyên qua cuộn dây. Thử kéo nam châm lên cao rồi buông ra để chứng kiến hiện tượng rơi tự do dưới tác dụng của trọng trường!
            </p>

            {/* Lenz vectors explain box */}
            <div className="bg-white border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] space-y-3 text-xs text-slate-800 font-bold">
              <span className="text-[10px] text-amber-700 font-black uppercase font-mono block border-b border-slate-100 pb-1">Định luật Lenz hoạt động:</span>
              
              {manualVelocity > 0.05 && (
                <div className="space-y-1 bg-emerald-50 border-2 border-emerald-400 p-3 rounded-xl text-emerald-950">
                  <span className="text-emerald-700 font-extrabold block">📈 Nam châm tiến vào (Từ thông tăng)</span>
                  <p className="text-xs text-slate-800 font-semibold leading-relaxed">Từ trường cảm ứng <strong className="text-slate-950">Bc</strong> hướng ngược chiều với từ trường nam châm <strong className="text-slate-950">B0</strong> để chống lại sự tăng từ thông.</p>
                </div>
              )}

              {manualVelocity < -0.05 && (
                <div className="space-y-1 bg-red-50 border-2 border-red-400 p-3 rounded-xl text-red-950">
                  <span className="text-red-700 font-extrabold block">📉 Nam châm lùi ra (Từ thông giảm)</span>
                  <p className="text-xs text-slate-800 font-semibold leading-relaxed">Từ trường cảm ứng <strong className="text-slate-950">Bc</strong> hướng cùng chiều với từ trường nam châm <strong className="text-slate-950">B0</strong> để bù đắp sự suy giảm từ thông.</p>
                </div>
              )}

              {Math.abs(manualVelocity) <= 0.05 && (
                <div className="space-y-1 bg-slate-50 border-2 border-slate-200 p-3 rounded-xl text-slate-500">
                  <span className="text-slate-500 font-extrabold block">⏸️ Đứng yên hoặc di chuyển quá chậm</span>
                  <p className="text-xs font-semibold leading-relaxed">Từ thông không đổi, không có sự biến thiên nên dòng điện và suất điện động cảm ứng triệt tiêu về 0.</p>
                </div>
              )}

              <div className="pt-2 text-[10.5px] text-slate-700 leading-relaxed font-bold border-t border-slate-150">
                💡 Cố gắng kéo thật nhanh qua cuộn dây để xem độ sáng đèn LED tăng vọt và điện thế đạt mức cực đại ra sao!
              </div>
            </div>
          </div>

          {/* Interactive Sandbox & Graphics Panel */}
          <div className="lg:col-span-7 bg-white border-2 border-slate-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_#000] grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Interactive vertical viewport */}
            <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-4 flex flex-col items-center min-h-[300px] justify-between shadow-inner">
              <span className="text-[9px] text-slate-500 font-black uppercase font-mono">Nhấp kéo đứng nam châm</span>

              {/* Physical slider container */}
              <div 
                className="w-full flex h-[220px] items-center relative select-none touch-none"
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  setIsDragging(true);
                  stopManualFall();
                  
                  const rect = e.currentTarget.getBoundingClientRect();
                  const relativeY = e.clientY - rect.top;
                  const clampedY = Math.max(30, Math.min(210, relativeY));
                  handleManualDrag(clampedY, true);
                }}
                onPointerMove={(e) => {
                  if (!isDragging) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const relativeY = e.clientY - rect.top;
                  const clampedY = Math.max(30, Math.min(210, relativeY));
                  handleManualDrag(clampedY, true);
                }}
                onPointerUp={(e) => {
                  if (!isDragging) return;
                  e.currentTarget.releasePointerCapture(e.pointerId);
                  setIsDragging(false);
                  startManualFall();
                }}
                onPointerCancel={(e) => {
                  if (!isDragging) return;
                  e.currentTarget.releasePointerCapture(e.pointerId);
                  setIsDragging(false);
                  startManualFall();
                }}
              >
                
                {/* Visual track rails representing coil */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 -translate-x-1/2" />

                {/* Coil block inside vector */}
                <div 
                  className="absolute w-14 border-2 border-slate-900 bg-amber-50/90 flex flex-col justify-center items-center rounded-xl shadow-md"
                  style={{
                    top: "100px",
                    height: "40px",
                    left: "calc(50% - 28px)",
                    zIndex: 5
                  }}
                >
                  <div className="w-full flex flex-col gap-[2px] p-1 justify-center h-full">
                    <div className="h-[2px] bg-amber-600 opacity-90" />
                    <div className="h-[2px] bg-amber-700 opacity-90" />
                    <div className="h-[2px] bg-amber-600 opacity-90" />
                  </div>
                </div>

                {/* Magnet representation moving inside */}
                <div 
                  className="absolute w-8 flex flex-col rounded-md border-2 border-slate-900 shadow-md pointer-events-none overflow-hidden"
                  style={{ 
                    top: `${manualY - 20}px`, 
                    height: "40px",
                    left: "calc(50% - 16px)"
                  }}
                >
                  <div className="flex-1 bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center text-[9px] font-black text-white font-mono border-b border-slate-900/10">S</div>
                  <div className="flex-1 bg-gradient-to-b from-red-500 to-red-600 flex items-center justify-center text-[9px] font-black text-white font-mono">N</div>
                </div>
              </div>

              <div className="text-[10px] text-cyan-800 text-center font-black uppercase tracking-wide bg-cyan-100 border-2 border-slate-900 px-2 py-1 rounded-md shadow-[1px_1px_0px_0px_#000] animate-pulse">
                ⚡ NHẤP KÉO RỒI THẢ CHUỘT ĐỂ RƠI
              </div>
            </div>

            {/* Right Column: Output indicators */}
            <div className="flex flex-col justify-between space-y-4">
              <span className="text-[9px] text-slate-500 font-black uppercase font-mono">Số liệu ghi nhận</span>

              <div className="space-y-3">
                {/* Computed Velocity */}
                <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000]">
                  <span className="text-[8.5px] text-slate-500 font-bold uppercase block">Vận tốc của bạn (v)</span>
                  <div className="text-md font-black text-cyan-800 font-mono mt-0.5">
                    {manualVelocity.toFixed(2)} <span className="text-xs font-semibold text-slate-600">m/s</span>
                  </div>
                </div>

                {/* Instantaneous Flux */}
                <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000]">
                  <span className="text-[8.5px] text-slate-500 font-bold uppercase block">Từ thông (Φ)</span>
                  <div className="text-md font-black text-amber-800 font-mono mt-0.5">
                    {manualFlux.toFixed(2)} <span className="text-xs font-semibold text-slate-600">mWb</span>
                  </div>
                </div>

                {/* Instantaneous Voltage */}
                <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000]">
                  <span className="text-[8.5px] text-slate-500 font-bold uppercase block">Suất điện động (e_c)</span>
                  <div className="text-md font-black text-emerald-800 font-mono mt-0.5">
                    {(manualVoltage >= 0 ? "+" : "")}{manualVoltage.toFixed(3)} <span className="text-xs font-semibold text-slate-600">V</span>
                  </div>
                </div>
              </div>

              {/* Dynamic feedback vector representation */}
              <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-900 text-center shadow-[2px_2px_0px_0px_#000]">
                <span className="text-[8.5px] text-slate-500 font-bold uppercase block mb-1">Cực xuất hiện mặt trên ống dây</span>
                <div className="text-xs font-black font-mono">
                  {manualVelocity > 0.05 ? (
                    <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded border border-red-300">Cực BẮC (N) cản lại</span>
                  ) : manualVelocity < -0.05 ? (
                    <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-300">Cực NAM (S) giữ lại</span>
                  ) : (
                    <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">TRẠNG THÁI TĨNH</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRACTICE CHALLENGES */}
      {activeTab === "practice" && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl border-2 border-slate-900 space-y-6 shadow-[6px_6px_0px_0px_#000]">
          <div className="flex justify-between items-center border-b-2 border-slate-900/10 pb-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider bg-yellow-100 border-2 border-slate-900 px-2.5 py-1 rounded shadow-[1.5px_1.5px_0px_0px_#000]">
              Thử thách tăng cường kiến thức
            </h4>
            <div className="text-sm font-mono font-black text-cyan-800 bg-cyan-100 border border-cyan-400 px-3 py-1 rounded-xl">
              Đúng: {challengeScore} / {challenges.length}
            </div>
          </div>

          {/* Active Question Box */}
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] bg-slate-900 text-white px-2.5 py-1 rounded-md font-mono font-black uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,0.15)] inline-block">
                Câu hỏi {currentChallenge + 1}
              </span>
              <h5 className="text-md font-black text-slate-950 leading-snug">
                {challenges[currentChallenge].title}
              </h5>
              <p className="text-xs text-slate-800 bg-cyan-50 border-2 border-slate-900 p-4 rounded-2xl leading-relaxed font-bold shadow-inner">
                <FormattedMathText text={challenges[currentChallenge].scenario} />
              </p>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-2.5">
              {challenges[currentChallenge].options.map((opt) => (
                <button
                   key={opt.id}
                  disabled={challengeChecked}
                  onClick={() => setChallengeAnswer(opt.id)}
                  className={`p-3.5 rounded-2xl text-left text-xs transition-all flex items-start gap-3 border-2 ${
                    challengeAnswer === opt.id
                      ? "bg-yellow-100 text-slate-950 border-slate-900 shadow-[3px_3px_0px_0px_#000] translate-y-[-2px] font-black"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:translate-y-0 active:shadow-none font-bold"
                  }`}
                >
                  <span className={`h-5 w-5 rounded-full border-2 text-[10px] font-black font-mono flex items-center justify-center ${
                    challengeAnswer === opt.id 
                      ? "bg-yellow-400 text-slate-950 border-slate-900" 
                      : "border-slate-300 text-slate-500"
                  }`}>
                    {opt.id}
                  </span>
                  <span className="flex-1 leading-normal"><FormattedMathText text={opt.text} /></span>
                </button>
              ))}
            </div>

            {/* Action panel for checking answers */}
            <div className="pt-2">
              {!challengeChecked ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!challengeAnswer}
                  className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-2xl text-xs uppercase flex items-center justify-center gap-1.5 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] active:translate-y-0 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-[1px_1px_0px_0px_#000] cursor-pointer"
                >
                  Kiểm tra đáp án
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="space-y-4">
                  {/* Feedback block */}
                  <div className={`p-4 rounded-2xl border-2 flex gap-3 text-xs font-bold leading-relaxed shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] ${
                    challengeAnswer === challenges[currentChallenge].correct
                      ? "bg-emerald-50 text-emerald-950 border-emerald-500"
                      : "bg-red-50 text-red-950 border-red-500"
                  }`}>
                    {challengeAnswer === challenges[currentChallenge].correct ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    )}
                    <div>
                      <FormattedMathText text={challengeFeedback} />
                    </div>
                  </div>

                  <button
                    onClick={handleNextChallenge}
                    className="w-full py-3 bg-slate-900 border-2 border-slate-900 text-white font-black rounded-2xl text-xs uppercase flex items-center justify-center gap-1.5 hover:bg-slate-800 cursor-pointer shadow-[3px_3px_0px_0px_#000] hover:translate-y-[-2px] active:translate-y-0 transition-all"
                  >
                    {currentChallenge < challenges.length - 1 ? "Câu hỏi tiếp theo" : "Bắt đầu lại lượt thực hành"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
