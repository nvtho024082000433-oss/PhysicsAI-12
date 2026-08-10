import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, ArrowRight, CheckCircle2, AlertCircle, Zap, Gauge, Cpu, ShieldCheck, Volume2, ShieldAlert } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson18Simulation() {
  // Tabs
  const [activeTab, setActiveTab] = useState<"transformer" | "guitar" | "practice">("transformer");

  // --- TAB 1: TRANSFORMER STATES ---
  const [n1, setN1] = useState<number>(600); // primary turns (100 to 1200)
  const [n2, setN2] = useState<number>(300); // secondary turns (100 to 1500)
  const [u1, setU1] = useState<number>(220); // primary voltage RMS (10 to 380)
  const [freq, setFreq] = useState<number>(50); // Hz (10 to 100)
  const [coreType, setCoreType] = useState<"laminated" | "solid">("laminated");
  const [transformerRunning, setTransformerRunning] = useState<boolean>(true);
  const [coreTemp, setCoreTemp] = useState<number>(35); // °C

  // --- TAB 2: GUITAR STATES ---
  const [pluckForce, setPluckForce] = useState<number>(1.0); // 0.5 (Nhẹ), 1.0 (Vừa), 1.8 (Mạnh)
  const [stringMaterial, setStringMaterial] = useState<"steel" | "nylon">("steel");
  const [pickupN, setPickupN] = useState<number>(5000); // turns (1000 to 10000)
  const [guitarNote, setGuitarNote] = useState<number>(110); // Hz (Note A2 = 110Hz, etc.)
  
  // Guitar Pluck Physics Simulation values
  const [guitarActive, setGuitarActive] = useState<boolean>(false);
  const [pluckTime, setPluckTime] = useState<number>(0);
  const [decayFactor, setDecayFactor] = useState<number>(0); // physical displacement scale

  // Audio Context for synthesizing plucks
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Time ticks for graphing
  const [simTime, setSimTime] = useState<number>(0);

  // Canvas refs
  const xformerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const guitarCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation Loop Refs
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // --- PRACTICE QUIZ STATE ---
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeChecked, setChallengeChecked] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [challengeFeedback, setChallengeFeedback] = useState<string>("");

  const challenges = [
    {
      question: "Một sạc không dây sạc pin cho điện thoại bị lệch khớp định vị trí, khiến từ thông rò rỉ tăng lên 40% (chỉ còn 60% từ thông đi qua điện thoại). Nếu lúc đầu công suất nhận được ở điện thoại là 10 W, thì khi bị lệch công suất truyền nhận thực tế sẽ giảm xuống còn bao nhiêu?",
      options: [
        { text: "A. 4 W", score: 0 },
        { text: "B. 6 W", score: 10 },
        { text: "C. 8 w", score: 0 },
        { text: "D. 12 W", score: 0 }
      ],
      correctIndex: 1,
      explanation: "Hiệu suất truyền năng lượng tỉ lệ trực tiếp với tỉ lệ ghép từ thông hữu ích. Khi rò rỉ tăng làm từ thông đi qua giảm còn 60%, công suất nhận được tỷ lệ thuận giảm còn 10 * 60% = 6 W."
    },
    {
      question: "Vì sao các máy biến áp cao thế dùng trong hệ thống truyền tải điện quốc gia có kích thước khổng lồ luôn phát ra tiếng ù ù đặc trưng và tỏa nhiệt lượng cực lớn khi hoạt động?",
      options: [
        { text: "A. Do dòng điện rò rỉ từ dây dẫn phóng trực tiếp ra không khí ẩm.", score: 0 },
        { text: "B. Do tương tác cơ học từ tính (lực từ gián đoạn) làm các lá thép rung liên tục và tác dụng tỏa nhiệt Joule của dòng Foucault khép kín trong lõi sắt.", score: 10 },
        { text: "C. Do nam châm vĩnh cửu bên trong lõi máy biến áp bị mài mòn cơ học.", score: 0 },
        { text: "D. Do điện trường tĩnh bên ngoài cuộn thứ cấp phóng điện vào mặt đất.", score: 0 }
      ],
      correctIndex: 1,
      explanation: "Lõi biến áp làm bằng hàng ngàn lá thép mỏng ghép lại, dưới tác dụng của từ thông xoay chiều biến thiên 50Hz sinh ra hiện tượng co từ vật lý làm các lá thép rung đập vào nhau tạo ra tiếng ù 100Hz. Đồng thời dòng điện xoáy Foucault cảm ứng sinh ra trong lõi sắt dù cực nhỏ vẫn tỏa nhiệt rất mạnh làm lõi thép nóng lên."
    },
    {
      question: "Khi người nhạc công gảy dây đàn ghi ta điện nhưng quên bật công tắc cấp nguồn của máy tăng âm (ampli), họ thấy tiếng phát ra loa không có gì, chỉ có tiếng rung cơ học nhỏ từ dây đàn. Tại sao?",
      options: [
        { text: "A. Vì không có dòng xoay chiều đầu vào sơ cấp, bộ pickup không hoạt động từ hóa.", score: 0 },
        { text: "B. Vì bộ pickup vẫn cảm ứng ra dòng điện xoay chiều cực nhỏ ở cuộn dây, nhưng nếu không có amply khuếch đại điện tử công suất lớn thì dòng điện cảm ứng này không đủ công suất làm rung màng loa phát ra âm thanh nghe thấy.", score: 10 },
        { text: "C. Vì dây thép bị mất từ hóa hoàn toàn nếu loa tắt.", score: 0 },
        { text: "D. Do dây đàn làm bằng nylon cách điện hoàn toàn.", score: 0 }
      ],
      correctIndex: 1,
      explanation: "Cuộn cảm pickup của đàn guitar điện hoạt động hoàn toàn thụ động (không cần nguồn cấp để cảm ứng). Khi gảy dây thép rung, suất điện động cảm ứng sinh ra trong cuộn cảm có giá trị biên độ rất nhỏ (chỉ vài mV). Cần có amply điện tử khuếch đại điện thế và dòng điện này lên hàng chục Volt rồi cấp cho loa mới phát ra được âm thanh to."
    }
  ];

  // --- PHYSICS ENGINE TICK ---
  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== null) {
        const deltaTime = (time - previousTimeRef.current) / 1000; // seconds
        
        // Update simulation timeline
        setSimTime((prev) => (prev + deltaTime) % 100);

        // Guitar string vibration physical decay
        if (guitarActive) {
          setPluckTime((prev) => {
            const newTime = prev + deltaTime;
            // Decay vibration amplitude over time
            const amp = Math.max(0, Math.exp(-2.5 * newTime));
            setDecayFactor(amp);
            if (amp <= 0.005) {
              setGuitarActive(false);
              return 0;
            }
            return newTime;
          });
        }

        // Transformer core heating simulation based on core type
        setCoreTemp((prev) => {
          if (coreType === "solid" && transformerRunning) {
            // Heat up to 105°C
            return Math.min(105, prev + deltaTime * 6);
          } else if (coreType === "laminated" && transformerRunning) {
            // Cool down or stay at warm operating temperature (38°C)
            if (prev > 38) return Math.max(38, prev - deltaTime * 4);
            return Math.min(38, prev + deltaTime * 0.5);
          } else {
            // Cooling when turned off
            return Math.max(28, prev - deltaTime * 2);
          }
        });
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [guitarActive, coreType, transformerRunning]);

  // --- AUDIO SYNTHESIS USING WEB AUDIO API ---
  const playPluckSound = () => {
    try {
      if (stringMaterial === "nylon") {
        return; // Nylon makes no pickup sound
      }
      
      // Initialize AudioContext lazily
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sawtooth"; // Electric guitar raw harmonic rich sound
      osc.frequency.setValueAtTime(guitarNote, ctx.currentTime);
      
      // Low pass filter to simulate the warm electric guitar tone
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(guitarNote * 3, ctx.currentTime);
      
      // Volume envelope based on pluck force and pickup turns
      const maxVolume = (pluckForce * 0.15) * (pickupN / 5000);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(maxVolume, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.6);
    } catch (err) {
      console.warn("Web Audio is not fully supported or blocked by sandbox permissions.", err);
    }
  };

  const handleGuitarPluck = () => {
    setPluckTime(0);
    setGuitarActive(true);
    setDecayFactor(1.0);
    playPluckSound();
  };

  // --- RENDER TRANSFORMER PLOTS ---
  useEffect(() => {
    if (activeTab !== "transformer") return;
    const canvas = xformerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Draw dark terminal screen background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, height);

    // Draw coordinate Grid (high contrast grey on dark blue)
    ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 25) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // Baseline 0V axis
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2); ctx.stroke();

    if (!transformerRunning) {
      return;
    }

    // Maths parameters
    const omega = 2 * Math.PI * freq;
    // Efficiency penalty for Solid core due to Foucault heat loss
    const efficiency = coreType === "solid" ? 0.65 : 0.98;
    const calculatedU2Rms = (u1 * n2 / n1) * efficiency;

    const scaleY1 = Math.min(height * 0.4, (u1 / 380) * (height * 0.4));
    const scaleY2 = Math.min(height * 0.4, (calculatedU2Rms / 380) * (height * 0.4));

    // Plot primary voltage u1(t) - Bright Cyan line
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#06b6d4"; // cyan
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const t = (x / width) * 0.08; // 80ms display window
      const val = Math.sin(omega * t - simTime * 5);
      const y = height / 2 - val * scaleY1;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Plot secondary voltage u2(t) - Bright Amber line (inverts/opposite phase for transformer)
    ctx.strokeStyle = "#fbbf24"; // yellow-amber
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const t = (x / width) * 0.08;
      const val = -Math.sin(omega * t - simTime * 5); // 180 degrees out of phase
      const y = height / 2 - val * scaleY2;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

  }, [activeTab, n1, n2, u1, freq, coreType, simTime, transformerRunning]);

  // --- RENDER GUITAR PLOTS ---
  useEffect(() => {
    if (activeTab !== "guitar") return;
    const canvas = guitarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Terminal screen background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, height);

    // Grid (high contrast grey on dark)
    ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // Central line
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2); ctx.stroke();

    if (!guitarActive) {
      return;
    }

    const omega = 2 * Math.PI * guitarNote;

    // 1. Plot Physical String Displacement - Thick White Line
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#cbd5e1"; // slate-300
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const t = (x / width) * 0.03; // 30ms display window
      const amp = pluckForce * 25 * decayFactor;
      // Damped harmonic spatial-temporal wave
      const val = Math.sin(Math.PI * (x / width)) * Math.cos(omega * t - pluckTime * 6);
      const y = height / 2 - val * amp;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 2. Plot Induced EMF e_c(t) = -N * dFlux/dt - Bright Green Neon Line
    if (stringMaterial === "steel") {
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#10b981"; // Emerald green
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const t = (x / width) * 0.03;
        // Induced EMF is proportional to pickupN, pluckForce, note frequency, and decays
        const maxEmfAmp = (pickupN / 5000) * pluckForce * 35 * decayFactor;
        const val = Math.sin(omega * t - pluckTime * 6); // Rate of change is cosine/sine matching
        const y = height / 2 - val * maxEmfAmp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

  }, [activeTab, guitarActive, pluckForce, stringMaterial, pickupN, guitarNote, pluckTime, decayFactor]);

  // --- PRACTICE RESPONSES ---
  const checkChallenge = () => {
    if (selectedOption === null) return;
    const correctIdx = challenges[currentChallenge].correctIndex;
    if (selectedOption === correctIdx) {
      setChallengeScore((prev) => prev + 10);
      setChallengeFeedback("Chính xác! Lập luận vật lý của bạn hoàn toàn chuẩn xác và bám sát nội dung.");
    } else {
      setChallengeFeedback("Chưa chính xác. Đọc phần giải thích bên dưới để nắm vững bản chất nhé!");
    }
    setChallengeChecked(true);
  };

  const nextChallenge = () => {
    setSelectedOption(null);
    setChallengeChecked(false);
    setChallengeFeedback("");
    setCurrentChallenge((prev) => (prev + 1) % challenges.length);
  };

  const resetChallenge = () => {
    setCurrentChallenge(0);
    setSelectedOption(null);
    setChallengeChecked(false);
    setChallengeScore(0);
    setChallengeFeedback("");
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans max-w-4xl mx-auto pb-4 select-none animate-fade-in" id="lesson18-simulation">
      
      {/* Simulation tab selectors - 3D NEOBRUTALIST */}
      <div className="flex flex-wrap bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-800 gap-2 w-full shadow-[4px_4px_0px_0px_#1e293b] max-w-xl mx-auto">
        <button
          onClick={() => setActiveTab("transformer")}
          className={`flex-1 py-2 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer uppercase border-2 border-slate-800 ${
            activeTab === "transformer"
              ? "bg-purple-300 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
              : "bg-white hover:bg-slate-50 text-slate-700 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px]"
          }`}
        >
          ⚡ Máy biến áp
        </button>
        <button
          onClick={() => setActiveTab("guitar")}
          className={`flex-1 py-2 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer uppercase border-2 border-slate-800 ${
            activeTab === "guitar"
              ? "bg-indigo-300 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
              : "bg-white hover:bg-slate-50 text-slate-700 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px]"
          }`}
        >
          🎸 Ghi ta điện
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          className={`flex-1 py-2 rounded-xl text-xs font-black tracking-tight transition-all duration-200 cursor-pointer uppercase border-2 border-slate-800 ${
            activeTab === "practice"
              ? "bg-amber-300 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
              : "bg-white hover:bg-slate-50 text-slate-700 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px]"
          }`}
        >
          🏆 Thử thách IQ
        </button>
      </div>

      {/* --- TRANSFORMER WORKSPACE --- */}
      {activeTab === "transformer" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-purple-50 border-2 border-slate-800 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#1e293b] space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] text-purple-950 font-mono font-black uppercase tracking-wider bg-purple-100 px-2 py-0.5 rounded border border-purple-200">Hệ thống điều khiển</span>
              <h3 className="text-base font-black text-slate-950">Tham số Máy biến áp</h3>
            </div>

            <div className="space-y-4 font-semibold text-xs">
              {/* N1 Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Số vòng sơ cấp N₁:</span>
                  <span className="text-purple-900 font-mono font-black">{n1} vòng</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1200"
                  step="50"
                  value={n1}
                  onChange={(e) => setN1(parseInt(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* N2 Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Số vòng thứ cấp N₂:</span>
                  <span className="text-cyan-900 font-mono font-black">{n2} vòng</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1500"
                  step="50"
                  value={n2}
                  onChange={(e) => setN2(parseInt(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>

              {/* U1 input slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Điện áp sơ cấp U₁ (AC):</span>
                  <span className="text-emerald-900 font-mono font-black">{u1} V</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="380"
                  value={u1}
                  onChange={(e) => setU1(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Frequency input slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Tần số dòng điện (f):</span>
                  <span className="text-amber-900 font-mono font-black">{freq} Hz</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={freq}
                  onChange={(e) => setFreq(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Core Type Selection - Silicon steel vs solid core */}
              <div className="space-y-2 border-t-2 border-purple-200/50 pt-4">
                <label className="text-xs text-slate-950 font-black block">Vật liệu lõi máy biến áp:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCoreType("laminated")}
                    className={`p-2.5 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                      coreType === "laminated"
                        ? "bg-purple-100 border-slate-800 text-purple-950 shadow-none translate-x-[1px] translate-y-[1px]"
                        : "bg-white border-slate-250 text-slate-600 hover:border-slate-400 shadow-[2px_2px_0px_#1e293b]"
                    }`}
                  >
                    <p className="text-xs font-black">🔋 Lá thép mỏng</p>
                    <p className="text-[9px] text-slate-700 mt-0.5 font-bold leading-tight">Silicon cách điện (Giảm tối đa Foucault)</p>
                  </button>

                  <button
                    onClick={() => setCoreType("solid")}
                    className={`p-2.5 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                      coreType === "solid"
                        ? "bg-rose-100 border-slate-800 text-rose-950 shadow-none translate-x-[1px] translate-y-[1px]"
                        : "bg-white border-slate-250 text-slate-600 hover:border-slate-400 shadow-[2px_2px_0px_#1e293b]"
                    }`}
                  >
                    <p className="text-xs font-black">⚠️ Lõi sắt đặc</p>
                    <p className="text-[9px] text-slate-700 mt-0.5 font-bold leading-tight">Sắt nguyên khối (Tỏa nhiệt hãm Foucault cực lớn)</p>
                  </button>
                </div>
              </div>

              {/* Turn Transformer ON/OFF */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setTransformerRunning(!transformerRunning)}
                  className={`w-full py-2.5 rounded-xl text-xs font-black transition-all border-2 border-slate-800 cursor-pointer shadow-[3px_3px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                    transformerRunning
                      ? "bg-rose-200 text-rose-950 hover:bg-rose-300"
                      : "bg-purple-300 text-purple-950 hover:bg-purple-400"
                  }`}
                >
                  {transformerRunning ? "⏹ NGẮT ĐIỆN NGUỒN BIẾN ÁP" : "⚡ CẤP ĐIỆN XOAY CHIỀU"}
                </button>
              </div>
            </div>
          </div>

          {/* Visual Simulation Display Column */}
          <div className="lg:col-span-7 bg-white border-2 border-slate-800 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#1e293b] flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-center border-b-2 border-slate-100 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${transformerRunning ? "bg-emerald-500 animate-ping" : "bg-slate-400"}`} />
                <span className="text-xs text-slate-950 font-black font-mono">Dao động điện áp u(t) tức thời</span>
              </div>
              <div className="flex gap-4 text-[10px] font-mono font-black">
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 bg-cyan-400 rounded-full" /> u₁ (Sơ cấp)</span>
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 bg-amber-400 rounded-full" /> u₂ (Thứ cấp)</span>
              </div>
            </div>

            {/* Screen / Canvas Plot with Neobrutalist border */}
            <div className="relative bg-slate-950 rounded-2xl p-2.5 border-2 border-slate-850 shadow-[3px_3px_0px_0px_#000] overflow-hidden">
              <canvas
                ref={xformerCanvasRef}
                width={480}
                height={200}
                className="w-full h-[200px] block rounded-lg"
              />
              {!transformerRunning && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90">
                  <p className="text-[10px] sm:text-xs font-mono font-black text-rose-400 tracking-widest bg-rose-950/50 px-3 py-1.5 rounded-lg border border-rose-850">HỆ THỐNG CHƯA CẤP ĐIỆN - ĐIỆN ÁP TRIỆT TIÊU</p>
                </div>
              )}
            </div>

            {/* Live Readings and Thermal Output */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-semibold">
              
              {/* Turn Ratio */}
              <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-800 flex items-center gap-3 shadow-[2px_2px_0px_0px_#1e293b]">
                <Gauge className="h-6 w-6 text-purple-600 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-600 font-mono font-black">TỈ LỆ VÒNG DÂY (N₂/N₁)</p>
                  <p className="text-sm font-black text-slate-950">{(n2 / n1).toFixed(2)} lần</p>
                  <p className="text-[9px] font-black text-purple-700">
                    {n2 > n1 ? "📈 MÁY TĂNG ÁP" : n2 < n1 ? "📉 MÁY HẠ ÁP" : "⚖️ TỈ LỆ 1 : 1"}
                  </p>
                </div>
              </div>

              {/* Voltage output */}
              <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-800 flex items-center gap-3 shadow-[2px_2px_0px_0px_#1e293b]">
                <Zap className="h-6 w-6 text-amber-500 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-600 font-mono font-black">ĐIỆN ÁP THỨ CẤP (U₂)</p>
                  <p className="text-sm font-black text-amber-600">
                    {transformerRunning 
                      ? `${((u1 * n2 / n1) * (coreType === "solid" ? 0.65 : 0.98)).toFixed(1)} V` 
                      : "0 V"
                    }
                  </p>
                  {coreType === "solid" && transformerRunning && (
                    <span className="text-[8px] bg-rose-100 text-rose-700 border-2 border-slate-800 px-1 py-0.2 rounded font-black font-mono block w-max">SỤT 35% DO NHIỆT</span>
                  )}
                </div>
              </div>

              {/* Core Temperature */}
              <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-800 flex items-center gap-3 shadow-[2px_2px_0px_0px_#1e293b]">
                <Cpu className="h-6 w-6 text-rose-500 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-600 font-mono font-black">NHIỆT ĐỘ LÕI THÉP</p>
                  <p className={`text-sm font-black ${coreTemp > 70 ? "text-rose-600 animate-pulse" : "text-slate-950"}`}>
                    {coreTemp.toFixed(1)} °C
                  </p>
                  <p className="text-[9px] font-black text-slate-700 leading-tight">
                    {coreType === "solid" 
                      ? "⚠️ Foucault nóng rực" 
                      : "🔋 Silicon mát mẻ"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Lesson Explanation */}
            <div className="bg-purple-100/60 p-4 rounded-2xl border-2 border-purple-300 text-xs text-slate-900 leading-relaxed space-y-1 font-semibold">
              <span className="text-[10px] text-purple-950 font-black uppercase tracking-wider font-mono flex items-center gap-1 mb-1">
                <ShieldCheck className="h-4 w-4 text-purple-700" /> Giải thích bản chất từ tính:
              </span>
              <p>
                Khi sử dụng <strong className="text-purple-800 font-black">Lá thép silicon mỏng ghép cách điện</strong>, điện trở đối với dòng điện xoáy khép kín rất lớn, khiến tổn hao dòng Phu-cô cực kỳ nhỏ. Biến áp hoạt động êm ái, mát mẻ với hiệu năng lý tưởng đạt tới 98%. Ngược lại, nếu dùng <strong className="text-rose-800 font-black">Lõi sắt đặc nguyên khối</strong>, dòng Foucault chạy xoắn vòng tự do sinh ra nhiệt lượng Joule cực lớn, làm nóng rực lõi thép lên đến <strong className="text-rose-800">{coreTemp.toFixed(0)}°C</strong>, đồng thời sụt giảm hao hụt đến 35% hiệu năng truyền nhận năng lượng.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- ELECTRIC GUITAR WORKSPACE --- */}
      {activeTab === "guitar" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-indigo-50 border-2 border-slate-800 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#1e293b] space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] text-indigo-950 font-mono font-black uppercase tracking-wider bg-indigo-150 px-2 py-0.5 rounded border border-indigo-200">Hệ thống cảm âm</span>
              <h3 className="text-base font-black text-slate-950">Bộ Pickup & Dây đàn</h3>
            </div>

            <div className="space-y-4 font-semibold text-xs">
              {/* Material selection - Steel vs Nylon */}
              <div className="space-y-2">
                <label className="text-xs text-slate-950 font-black block">Vật liệu dây đàn:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setStringMaterial("steel")}
                    className={`p-2.5 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                      stringMaterial === "steel"
                        ? "bg-indigo-100 border-slate-800 text-indigo-950 shadow-none translate-x-[1px] translate-y-[1px]"
                        : "bg-white border-slate-250 text-slate-600 hover:border-slate-400 shadow-[2px_2px_0px_#1e293b]"
                    }`}
                  >
                    <p className="text-xs font-black">🧲 Dây Thép sắt từ</p>
                    <p className="text-[9px] text-slate-700 mt-0.5 leading-tight font-medium">Nhiễm từ hóa mạnh, tạo ra dòng cảm ứng</p>
                  </button>

                  <button
                    onClick={() => setStringMaterial("nylon")}
                    className={`p-2.5 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                      stringMaterial === "nylon"
                        ? "bg-rose-100 border-slate-800 text-rose-950 shadow-none translate-x-[1px] translate-y-[1px]"
                        : "bg-white border-slate-250 text-slate-600 hover:border-slate-400 shadow-[2px_2px_0px_#1e293b]"
                    }`}
                  >
                    <p className="text-xs font-black">❌ Dây Nylon cách điện</p>
                    <p className="text-[9px] text-slate-700 mt-0.5 leading-tight font-medium">Không nhiễm từ tính, màng loa im lặng</p>
                  </button>
                </div>
              </div>

              {/* Note Frequency (Hz) selector */}
              <div className="space-y-2">
                <label className="text-xs text-slate-950 font-black block">Tần số Nốt nhạc của dây đàn:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { note: "E2 (82Hz)", freq: 82 },
                    { note: "A2 (110Hz)", freq: 110 },
                    { note: "D3 (147Hz)", freq: 147 },
                    { note: "G3 (196Hz)", freq: 196 },
                    { note: "B3 (247Hz)", freq: 247 },
                    { note: "E4 (330Hz)", freq: 330 }
                  ].map((item) => (
                    <button
                      key={item.freq}
                      onClick={() => setGuitarNote(item.freq)}
                      className={`py-2 px-1 rounded-xl text-[10px] font-mono text-center font-black transition-all border-2 border-slate-800 cursor-pointer ${
                        guitarNote === item.freq
                          ? "bg-indigo-200 text-slate-950 shadow-none translate-x-[0.5px] translate-y-[0.5px]"
                          : "bg-white text-slate-700 shadow-[1.5px_1.5px_0px_#1e293b]"
                      }`}
                    >
                      {item.note}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plucking force */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-950 font-black block">Lực gảy dây:</label>
                <div className="flex gap-2">
                  {[
                    { label: "Nhẹ (0.5x)", val: 0.5 },
                    { label: "Vừa (1.0x)", val: 1.0 },
                    { label: "Mạnh (1.8x)", val: 1.8 }
                  ].map((force) => (
                    <button
                      key={force.val}
                      onClick={() => setPluckForce(force.val)}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all border-2 border-slate-800 cursor-pointer ${
                        pluckForce === force.val
                          ? "bg-indigo-200 text-slate-950 shadow-none translate-x-[0.5px] translate-y-[0.5px]"
                          : "bg-white text-slate-700 shadow-[1.5px_1.5px_0px_#1e293b]"
                      }`}
                    >
                      {force.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of pickup turns slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Số vòng cuộn pickup (N):</span>
                  <span className="text-indigo-900 font-mono font-black">{pickupN} vòng</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={pickupN}
                  onChange={(e) => setPickupN(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Trigger button */}
              <div className="pt-2">
                <button
                  onClick={handleGuitarPluck}
                  className="w-full py-3 bg-amber-300 hover:bg-amber-200 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl shadow-[3px_3px_0px_0px_#1e293b] border-2 border-slate-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Volume2 className="h-4.5 w-4.5" /> 🎸 GẢY DÂY ĐÀN PHÁT ÂM
                </button>
              </div>
            </div>
          </div>

          {/* Visual Simulation Display Column */}
          <div className="lg:col-span-7 bg-white border-2 border-slate-800 p-5 rounded-3xl shadow-[4px_4px_0px_0px_#1e293b] flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-center border-b-2 border-slate-100 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${guitarActive ? "bg-indigo-500 animate-ping" : "bg-slate-400"}`} />
                <span className="text-xs text-slate-950 font-black font-mono">Sóng dao động cơ & sóng điện cảm ứng</span>
              </div>
              <div className="flex gap-4 text-[10px] font-mono font-black">
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 bg-slate-300 rounded-full" /> Li độ d(t)</span>
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 bg-emerald-400 rounded-full" /> e_c(t) (Điện áp)</span>
              </div>
            </div>

            {/* Screen Canvas Plot */}
            <div className="relative bg-slate-950 rounded-2xl p-2.5 border-2 border-slate-850 shadow-[3px_3px_0px_0px_#000] overflow-hidden">
              <canvas
                ref={guitarCanvasRef}
                width={480}
                height={200}
                className="w-full h-[200px] block rounded-lg"
              />
              {!guitarActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 space-y-2">
                  <p className="text-[10px] sm:text-xs font-mono font-black text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 text-center mx-4">DÂY ĐÀN ĐỨNG YÊN - CLICK NÚT GẢY ĐỂ TRẢI NGHIỆM</p>
                  <p className="text-[9px] text-slate-500 font-bold text-center">Mẹo: Chọn Dây Thép sắt từ để xem sóng suất điện động cảm ứng màu xanh lá</p>
                </div>
              )}
            </div>

            {/* Live readings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-semibold">
              {/* Amplitude output */}
              <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-800 flex items-center gap-3 shadow-[2px_2px_0px_0px_#1e293b]">
                <Gauge className="h-6 w-6 text-indigo-600 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-600 font-mono font-black">TỐC ĐỘ BIẾN THIÊN TỪ THÔNG dΦ/dt</p>
                  <p className="text-xs sm:text-sm font-black text-slate-950">
                    {guitarActive && stringMaterial === "steel"
                      ? `${(pluckForce * 0.0004 * decayFactor).toFixed(5)} Wb/s`
                      : "0.00000 Wb/s"
                    }
                  </p>
                </div>
              </div>

              {/* Induced Emf output */}
              <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-800 flex items-center gap-3 shadow-[2px_2px_0px_0px_#1e293b]">
                <Zap className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-600 font-mono font-black">SUẤT ĐIỆN ĐỘNG CẢM ỨNG CỰC ĐẠI</p>
                  <p className="text-xs sm:text-sm font-black text-emerald-600">
                    {guitarActive && stringMaterial === "steel"
                      ? `${(pickupN * 0.0004 * pluckForce * decayFactor).toFixed(2)} V`
                      : "0.00 V"
                    }
                  </p>
                  {stringMaterial === "nylon" && (
                    <span className="text-[8px] bg-rose-100 text-rose-700 border border-rose-300 px-1 py-0.2 rounded font-black font-mono block w-max mt-0.5">DÂY NYLON: PHI SẮT TỪ</span>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Lesson Connection Explanation */}
            <div className="bg-indigo-100/60 p-4 rounded-2xl border-2 border-indigo-300 text-xs text-slate-900 leading-relaxed space-y-1 font-semibold">
              <span className="text-[10px] text-indigo-950 font-black uppercase tracking-wider font-mono flex items-center gap-1 mb-1">
                <ShieldCheck className="h-4 w-4 text-indigo-700" /> Giải thích bản chất vật lý:
              </span>
              <p>
                Dây thép sắt từ bị nhiễm từ vĩnh viễn bởi nam châm vĩnh cửu của pickup. Khi dây thép dao động tự do với tần số nốt nhạc <strong className="text-slate-950">{guitarNote} Hz</strong>, nó biến thiên từ thông gửi qua cuộn cảm với tần số đúng bằng {guitarNote} Hz, làm cảm ứng sinh ra điện áp xoay chiều hình sin màu xanh lá trên đồ thị. Khi ta gảy dây nylon cách điện, do nylon là phi sắt từ nên không bị nhiễm từ, tốc độ biến thiên từ thông dΦ/dt = 0, màng loa im lặng hoàn toàn.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: CHALLENGE ZONE --- */}
      {activeTab === "practice" && (
        <div className="bg-amber-50 border-2 border-slate-800 p-6 rounded-3xl max-w-2xl mx-auto space-y-6 shadow-[6px_6px_0px_0px_#1e293b]">
          <div className="flex justify-between items-center border-b-2 border-amber-200 pb-3 flex-wrap gap-2">
            <div className="space-y-1">
              <span className="text-[10px] text-amber-950 font-mono font-black uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded border border-amber-200">Luyện tập thông minh</span>
              <h3 className="text-base font-black text-slate-950">Thử thách Thấu hiểu Hiện tượng</h3>
            </div>
            <div className="bg-amber-200 border-2 border-slate-800 px-3 py-1 rounded-xl shadow-[2px_2px_0px_#1e293b]">
              <span className="text-xs text-slate-950 font-mono font-black">ĐIỂM SỐ: {challengeScore}</span>
            </div>
          </div>

          {/* Quiz Container */}
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="inline-block text-[9px] bg-slate-900 text-white px-2.5 py-1 rounded-lg font-mono font-black uppercase">
                CÂU HỎI {currentChallenge + 1} / {challenges.length}
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-950 leading-relaxed">
                <FormattedMathText text={challenges[currentChallenge].question} />
              </h4>
            </div>

            {/* Options list */}
            <div className="space-y-3 pt-2 font-semibold text-xs sm:text-sm">
              {challenges[currentChallenge].options.map((opt, idx) => {
                let btnStyle = "bg-white border-2 border-slate-800 text-slate-800 hover:bg-slate-50 shadow-[2px_2px_0px_#1e293b]";
                if (selectedOption === idx) {
                  btnStyle = "bg-amber-200 border-2 border-slate-800 text-slate-950 shadow-[1px_1px_0px_#1e293b] translate-x-[0.5px] translate-y-[0.5px]";
                }
                if (challengeChecked) {
                  if (idx === challenges[currentChallenge].correctIndex) {
                    btnStyle = "bg-emerald-100 border-2 border-emerald-600 text-emerald-950 shadow-none font-black";
                  } else if (selectedOption === idx) {
                    btnStyle = "bg-rose-100 border-2 border-rose-500 text-rose-950 shadow-none font-black";
                  } else {
                    btnStyle = "bg-white border-2 border-slate-200 text-slate-400 opacity-60 shadow-none";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !challengeChecked && setSelectedOption(idx)}
                    disabled={challengeChecked}
                    className={`w-full p-4 rounded-2xl text-left transition-all cursor-pointer leading-relaxed flex justify-between items-center gap-3 ${btnStyle}`}
                  >
                    <span><FormattedMathText text={opt.text} /></span>
                    {challengeChecked && idx === challenges[currentChallenge].correctIndex && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 animate-bounce" />
                    )}
                    {challengeChecked && selectedOption === idx && idx !== challenges[currentChallenge].correctIndex && (
                      <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0 animate-shake" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Checked controls */}
            <div className="pt-4 flex justify-between items-center flex-wrap gap-2">
              {!challengeChecked ? (
                <button
                  onClick={checkChallenge}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 bg-amber-300 hover:bg-amber-200 border-2 border-slate-800 shadow-[3px_3px_0px_#1e293b] disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-300 disabled:shadow-none disabled:cursor-not-allowed text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Kiểm tra đáp án
                </button>
              ) : (
                <div className="flex gap-3 w-full">
                  <button
                    onClick={nextChallenge}
                    className="flex-1 py-3 bg-white hover:bg-slate-50 text-slate-950 font-black text-xs uppercase rounded-xl transition-all border-2 border-slate-800 shadow-[3px_3px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Câu hỏi tiếp theo <ArrowRight className="h-4 w-4 text-slate-950" />
                  </button>
                  <button
                    onClick={resetChallenge}
                    className="px-4 py-3 bg-white border-2 border-slate-800 hover:bg-slate-50 text-slate-600 text-xs font-black rounded-xl transition-all cursor-pointer"
                    title="Chơi lại từ đầu"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Explanation box */}
            {challengeChecked && (
              <div className="p-4 bg-white rounded-2xl border-2 border-slate-800 text-xs sm:text-sm leading-relaxed space-y-2 shadow-[2px_2px_0px_#1e293b] animate-fade-in font-semibold">
                <p className={`font-black flex items-center gap-1.5 ${selectedOption === challenges[currentChallenge].correctIndex ? "text-emerald-700" : "text-rose-700"}`}>
                  {selectedOption === challenges[currentChallenge].correctIndex ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      {challengeFeedback}
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="h-4 w-4 text-rose-600" />
                      {challengeFeedback}
                    </>
                  )}
                </p>
                <div className="text-slate-800 border-t-2 border-slate-100 pt-2.5">
                  <span className="font-black text-slate-950 block mb-1">Giải thích chi tiết:</span>
                  <FormattedMathText text={challenges[currentChallenge].explanation} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
