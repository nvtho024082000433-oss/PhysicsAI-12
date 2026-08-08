import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Sliders, Zap, Compass, Eye, HelpCircle, CheckCircle2, AlertCircle, ArrowRight, ShieldAlert } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface Option {
  text: string;
}

interface Challenge {
  question: string;
  options: Option[];
  correctIndex: number;
  explanation: string;
}

const challenges: Challenge[] = [
  {
    question: "Một nam châm chuyển động lại gần một vòng dây dẫn kín làm từ thông qua vòng dây tăng đều theo thời gian. Phát biểu nào sau đây về điện trường xuất hiện trong vòng dây là ĐÚNG?",
    options: [
      { text: "Là điện trường tĩnh, có các đường sức xuất phát từ điện tích dương." },
      { text: "Là điện trường xoáy, có các đường sức là những đường cong kín bao quanh các đường sức của từ trường." },
      { text: "Điện trường xoáy chỉ xuất hiện khi vòng dây dẫn làm bằng kim loại, còn nếu là vòng nhựa thì không có." },
      { text: "Đường sức điện trường xoáy bắt đầu từ cực Bắc và kết thúc ở cực Nam của nam châm." }
    ],
    correctIndex: 1,
    explanation: "Theo phát biểu của Maxwell, khi từ thông biến thiên theo thời gian thì trong vùng không gian đó xuất hiện một điện trường xoáy có các đường sức khép kín bao quanh các đường sức từ, bất kể có sự hiện diện của vòng dây dẫn hay không. Vòng dây dẫn kín chỉ giúp ta phát hiện dòng điện cảm ứng do điện trường xoáy này sinh ra."
  },
  {
    question: "Trong sóng điện từ, tại mỗi điểm bất kỳ trên phương truyền sóng, vectơ cường độ điện trường E và vectơ cảm ứng từ B luôn có mối quan hệ như thế nào về pha và phương?",
    options: [
      { text: "Dao động cùng pha, có phương vuông góc với nhau." },
      { text: "Dao động ngược pha, có phương vuông góc với nhau." },
      { text: "Dao động vuông pha, có phương trùng nhau." },
      { text: "Dao động cùng pha, có phương trùng nhau." }
    ],
    correctIndex: 0,
    explanation: "Trong sóng điện từ, tại một điểm bất kỳ trên phương truyền sóng, hai vectơ E và B dao động điều hòa cùng tần số, cùng pha (E = B = 0 cùng lúc hoặc cùng cực đại), nhưng có phương dao động vuông góc với nhau và vuông góc với phương truyền sóng v (E _perp B _perp v)."
  },
  {
    question: "Một sóng điện từ có tần số f = 100 MHz lan truyền từ chân không (chiết suất n_1 = 1.0, tốc độ c = 3.10^8 m/s) vào một môi trường nước sạch có chiết suất n_2 = 1.33. Bước sóng \\lambda của sóng điện từ này trong nước sạch có giá trị gần nhất là bao nhiêu?",
    options: [
      { text: "3.00 m" },
      { text: "4.00 m" },
      { text: "2.26 m" },
      { text: "3.99 m" }
    ],
    correctIndex: 2,
    explanation: "Tần số sóng không đổi f = 100 MHz = 10^8 Hz. Tốc độ truyền sóng trong nước là v = c / n = 3.10^8 / 1.33 \\approx 2.26.10^8 m/s. Bước sóng trong nước là \\lambda = v / f = 2.26.10^8 / 10^8 = 2.26 m. (Hoặc tính nhanh: \\lambda_{nước} = \\lambda_{chân_không} / n = (3.10^8 / 10^8) / 1.33 = 3 / 1.33 \\approx 2.26 m)."
  },
  {
    question: "Một sóng điện từ truyền thẳng đứng từ dưới lên trên. Tại một thời điểm xác định, vectơ cường độ điện trường E hướng về phía Tây. Khi đó, vectơ cảm ứng từ B hướng về phía nào?",
    options: [
      { text: "Phía Đông" },
      { text: "Phía Nam" },
      { text: "Phía Bắc" },
      { text: "Phía Tây" }
    ],
    correctIndex: 2,
    explanation: "Sử dụng quy tắc tam diện thuận cho ba vectơ E, B, v theo thứ tự xoay từ E sang B thì ngón cái chỉ chiều của v. Khi v hướng lên trên (thẳng đứng), E hướng sang phía Tây (trái), thì để tạo thành tam diện thuận, B phải hướng về phía Bắc (trước mặt)."
  },
  {
    question: "Xét một tụ điện phẳng đang được nạp điện bằng nguồn xoay chiều, điện tích trên bản tụ biến thiên theo thời gian. Phát biểu nào sau đây đúng về dòng điện dịch giữa hai bản tụ điện?",
    options: [
      { text: "Dòng điện dịch là dòng chuyển động của các hạt mang điện tự do qua chất điện môi giữa hai bản tụ." },
      { text: "Dòng điện dịch là tên gọi khác của dòng điện dẫn chạy trong dây nối dẫn điện đến bản tụ." },
      { text: "Dòng điện dịch có bản chất là điện trường biến thiên theo thời gian giữa hai bản tụ, sinh ra từ trường giống hệt dòng điện dẫn." },
      { text: "Dòng điện dịch chỉ tồn tại khi giữa hai bản tụ là một dây dẫn kim loại dẫn điện." }
    ],
    correctIndex: 2,
    explanation: "Dòng điện dịch không phải là dòng chuyển động của các hạt điện tích thực sự qua chất điện môi giữa hai bản tụ. Nó đại diện cho sự biến thiên của điện trường theo thời gian trong khoảng không gian giữa hai bản tụ điện, có vai trò sinh ra từ trường khép kín hệt như dòng điện dẫn trong dây dẫn."
  }
];

export default function Lesson19Simulation() {
  const [activeTab, setActiveTab] = useState<"wave" | "induction" | "practice">("wave");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
  // Challenge State
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeChecked, setChallengeChecked] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [challengeFeedback, setChallengeFeedback] = useState<string>("");

  // Wave parameters
  const [frequency, setFrequency] = useState<number>(1.5); // Arbitrary scale
  const [amplitude, setAmplitude] = useState<number>(60);
  const [viewAngle, setViewAngle] = useState<"iso" | "front" | "side">("iso");
  const [showVectors, setShowVectors] = useState<boolean>(true);

  // Induction parameters
  const [magnetY, setMagnetY] = useState<number>(30); // 0 to 100
  const [isAutoMagnet, setIsAutoMagnet] = useState<boolean>(true);
  const [capacitorVoltage, setCapacitorVoltage] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const magnetYRef = useRef<number>(30);

  // Magnet auto-move state
  const magnetDirectionRef = useRef<number>(1); // 1 = down, -1 = up

  // Sync state changes to ref
  useEffect(() => {
    magnetYRef.current = magnetY;
  }, [magnetY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localTime = timeRef.current;

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff"; // Clean white background for higher contrast
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (activeTab === "wave") {
        drawEMWave(ctx, canvas.width, canvas.height, localTime);
      } else {
        drawFieldInduction(ctx, canvas.width, canvas.height, localTime);
      }

      if (isPlaying) {
        localTime += 0.05 * frequency;
        timeRef.current = localTime;
      }

      // Handle magnet auto-movement
      if (activeTab === "induction" && isAutoMagnet && isPlaying) {
        let next = magnetYRef.current + magnetDirectionRef.current * 1.5;
        if (next >= 90) {
          magnetDirectionRef.current = -1;
          next = 90;
        } else if (next <= 10) {
          magnetDirectionRef.current = 1;
          next = 10;
        }
        magnetYRef.current = next;
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeTab, isPlaying, frequency, amplitude, viewAngle, showVectors, isAutoMagnet, capacitorVoltage]);

  // --- DRAWING DYNAMIC EM WAVE PROPAGATION ---
  const drawEMWave = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    time: number
  ) => {
    // Draw central propagation axis (X-axis)
    const centerY = h / 2;
    const startX = 60;
    const endX = w - 60;
    const axisY = centerY + 10;

    // Draw high-contrast grid lines
    ctx.strokeStyle = "#cbd5e1"; // Slate 300 grid for high contrast
    ctx.lineWidth = 1;
    for (let x = startX; x <= endX; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, h - 40);
      ctx.stroke();
    }
    for (let y = 40; y <= h - 40; y += 40) {
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }

    // Draw major propagation axis arrow
    ctx.strokeStyle = "#0f172a"; // Thick slate-900 axis
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX - 20, axisY);
    ctx.lineTo(endX + 20, axisY);
    ctx.stroke();

    // Arrowhead for x-axis
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.moveTo(endX + 20, axisY - 6);
    ctx.lineTo(endX + 32, axisY);
    ctx.lineTo(endX + 20, axisY + 6);
    ctx.fill();

    // Propagation speed vector text
    ctx.font = "bold 11px JetBrains Mono, monospace";
    ctx.fillStyle = "#047857"; // Deep emerald for velocity v
    ctx.fillText("Phương truyền v ➔", endX - 110, axisY - 15);

    // Calculate wave coordinates and draw fields
    const pointsCount = 180;
    const waveLength = (endX - startX) / 2.5;

    // Helper functions for perspective projection
    const getProjection = (x: number, yVal: number, zVal: number) => {
      if (viewAngle === "front") {
        return { x: x, y: axisY - yVal };
      }
      if (viewAngle === "side") {
        return { x: x, y: axisY - zVal };
      }
      const angleRad = Math.PI / 6; // 30-degree isometric tilt
      const px = x + zVal * Math.cos(angleRad) * 0.6;
      const py = axisY - yVal - zVal * Math.sin(angleRad) * 0.4;
      return { x: px, y: py };
    };

    // Draw field vectors (arrows) from axis
    if (showVectors) {
      const step = 8;
      for (let i = 0; i < pointsCount; i += step) {
        const pct = i / pointsCount;
        const x = startX + pct * (endX - startX);
        
        const angle = (x / waveLength) * Math.PI * 2 - time;
        const eVal = Math.sin(angle) * amplitude;
        const bVal = Math.sin(angle) * amplitude; // E and B in-phase

        const projOrigin = getProjection(x, 0, 0);

        // Draw E-field vector (Cyan/Blue)
        if (viewAngle !== "side") {
          const projE = getProjection(x, eVal, 0);
          ctx.strokeStyle = "#0891b2"; // Darker Cyan for visibility
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(projOrigin.x, projOrigin.y);
          ctx.lineTo(projE.x, projE.y);
          ctx.stroke();

          // E arrowhead
          if (Math.abs(eVal) > 5) {
            ctx.fillStyle = "#0e7490";
            ctx.beginPath();
            const headSize = 4;
            const dir = eVal > 0 ? -1 : 1;
            ctx.moveTo(projE.x, projE.y);
            ctx.lineTo(projE.x - 3, projE.y + dir * headSize);
            ctx.lineTo(projE.x + 3, projE.y + dir * headSize);
            ctx.fill();
          }
        }

        // Draw B-field vector (Purple)
        if (viewAngle !== "front") {
          const projB = getProjection(x, 0, bVal);
          ctx.strokeStyle = "#7e22ce"; // Darker Purple
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(projOrigin.x, projOrigin.y);
          ctx.lineTo(projB.x, projB.y);
          ctx.stroke();

          // B arrowhead
          if (Math.abs(bVal) > 5) {
            ctx.fillStyle = "#6b21a8";
            ctx.beginPath();
            ctx.arc(projB.x, projB.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    // Draw Continuous E-Field wave envelope line (Cyan)
    if (viewAngle !== "side") {
      ctx.strokeStyle = "#0891b2";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      for (let i = 0; i <= pointsCount; i++) {
        const pct = i / pointsCount;
        const x = startX + pct * (endX - startX);
        const angle = (x / waveLength) * Math.PI * 2 - time;
        const eVal = Math.sin(angle) * amplitude;
        const proj = getProjection(x, eVal, 0);
        if (i === 0) ctx.moveTo(proj.x, proj.y);
        else ctx.lineTo(proj.x, proj.y);
      }
      ctx.stroke();
    }

    // Draw Continuous B-Field wave envelope line (Purple)
    if (viewAngle !== "front") {
      ctx.strokeStyle = "#7e22ce";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      for (let i = 0; i <= pointsCount; i++) {
        const pct = i / pointsCount;
        const x = startX + pct * (endX - startX);
        const angle = (x / waveLength) * Math.PI * 2 - time;
        const bVal = Math.sin(angle) * amplitude;
        const proj = getProjection(x, 0, bVal);
        if (i === 0) ctx.moveTo(proj.x, proj.y);
        else ctx.lineTo(proj.x, proj.y);
      }
      ctx.stroke();
    }

    // Text indicators with high contrast dark slate
    ctx.font = "bold 13px Inter, sans-serif";
    if (viewAngle !== "side") {
      ctx.fillStyle = "#0e7490";
      ctx.fillText("Vectơ Điện trường E (Sóng thẳng đứng)", startX, 40);
    }
    if (viewAngle !== "front") {
      ctx.fillStyle = "#6b21a8";
      ctx.fillText("Vectơ Cảm ứng từ B (Sóng nằm ngang)", startX, h - 35);
    }

    ctx.font = "bold 10px JetBrains Mono, monospace";
    ctx.fillStyle = "#334155";
    ctx.fillText("Đặc tính: E và B luôn vuông góc nhau và đồng pha theo thời gian.", startX, h - 20);
  };

  // --- DRAWING ELECTROMAGNETIC FIELD INDUCTION ---
  const drawFieldInduction = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    time: number
  ) => {
    const centerX = w / 2 - 80;
    const coilY = h / 2 + 10;
    const magX = centerX;
    const curMagY = 50 + (magnetYRef.current / 100) * 140;

    const ringRadiusX = 55;
    const ringRadiusY = 16;
    const ringCount = 5;

    // Gridlines background
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    for (let x = 40; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 40; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 1. Draw back half of coil rings first (copper color)
    ctx.lineWidth = 4;
    for (let i = 0; i < ringCount; i++) {
      const cy = coilY + i * 18;
      ctx.strokeStyle = "#9a3412"; // Solid rust copper back
      ctx.beginPath();
      ctx.ellipse(centerX, cy, ringRadiusX, ringRadiusY, 0, Math.PI, 2 * Math.PI);
      ctx.stroke();
    }

    // 2. Draw falling magnet (Solid bar magnet N-S with thick borders)
    const magW = 28;
    const magH = 75;
    const northH = magH / 2;

    // North half (Red)
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(magX - magW / 2, curMagY - magH / 2, magW, northH);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("N", magX, curMagY - magH / 2 + 22);

    // South half (Blue)
    ctx.fillStyle = "#2563eb";
    ctx.fillRect(magX - magW / 2, curMagY - magH / 2 + northH, magW, northH);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("S", magX, curMagY + magH / 2 - 14);

    // Magnet thick outline
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(magX - magW / 2, curMagY - magH / 2, magW, magH);

    // 3. Draw magnetic field lines
    ctx.lineWidth = 1.8;
    const fieldLinesCount = 3;
    const speedY = isPlaying ? magnetDirectionRef.current : 0;
    const isChanging = Math.abs(speedY) > 0;

    for (let i = 1; i <= fieldLinesCount; i++) {
      const rx = i * 45;
      const ry = i * 65;
      ctx.strokeStyle = isChanging
        ? "rgba(126, 34, 206, 0.45)" // Purple line
        : "rgba(71, 85, 105, 0.15)"; // Soft grey
      
      ctx.beginPath();
      ctx.ellipse(magX, curMagY - magH / 2, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 4. Draw front half of coil rings (overlapping the magnet)
    for (let i = 0; i < ringCount; i++) {
      const cy = coilY + i * 18;
      ctx.strokeStyle = "#ea580c"; // Bright orange copper front
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.ellipse(centerX, cy, ringRadiusX, ringRadiusY, 0, 0, Math.PI);
      ctx.stroke();
      
      // Wire details
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 5. Draw the closed-loop electric field xoáy (Induced electric field E loops)
    if (isChanging) {
      ctx.strokeStyle = "#0891b2"; // Cyan loop
      ctx.lineWidth = 3;
      const pulseSize = ringRadiusX + 25 + Math.sin(time * 2) * 5;
      
      ctx.beginPath();
      ctx.ellipse(centerX, coilY + 36, pulseSize, ringRadiusY + 10, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Draw direction arrows on the electric field loop
      const arrowAngle = (time) % (Math.PI * 2);
      const ax = centerX + pulseSize * Math.cos(arrowAngle);
      const ay = coilY + 36 + (ringRadiusY + 10) * Math.sin(arrowAngle);
      
      ctx.fillStyle = "#0891b2";
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ax, ay, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.font = "bold 10px JetBrains Mono, monospace";
      ctx.fillStyle = "#0891b2";
      ctx.fillText("Điện trường xoáy E", centerX + pulseSize - 10, coilY + 30);
    }

    // Galvanometer indicator (Đo dòng điện cảm ứng)
    const meterX = w - 120;
    const meterY = h / 2 + 10;
    
    // Draw meter body with Neobrutalist styling
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(meterX, meterY, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Scale tick marks
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 1.5;
    for (let a = -Math.PI * 0.75; a <= -Math.PI * 0.25; a += Math.PI * 0.125) {
      const x1 = meterX + 33 * Math.cos(a);
      const y1 = meterY + 33 * Math.sin(a);
      const x2 = meterX + 41 * Math.cos(a);
      const y2 = meterY + 41 * Math.sin(a);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Needle rotation based on magnetic flux change rate
    const fluxRate = speedY * 0.28; 
    const targetAngle = -Math.PI / 2 + fluxRate;

    // Draw needle
    ctx.strokeStyle = "#dc2626"; // Red needle
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(meterX, meterY);
    ctx.lineTo(meterX + 38 * Math.cos(targetAngle), meterY + 38 * Math.sin(targetAngle));
    ctx.stroke();

    // Center pin
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(meterX, meterY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Labels with deep contrast
    ctx.font = "bold 12px Inter, sans-serif";
    ctx.fillStyle = "#0f172a";
    ctx.fillText("Thí nghiệm Maxwell-Faraday: Từ thông biến thiên sinh Điện trường xoáy", 40, 35);
    
    ctx.font = "bold 11px Inter, sans-serif";
    ctx.fillStyle = "#334155";
    ctx.fillText("Kéo thanh trượt để di chuyển nam châm hoặc bật Tự động rơi.", 40, 55);

    ctx.fillStyle = "#dc2626";
    ctx.fillText("■ N/S: Nam châm", 40, h - 45);
    ctx.fillStyle = "#ea580c";
    ctx.fillText("■ Cuộn dây đồng (ống dây kín)", 40, h - 30);
    ctx.fillStyle = "#0891b2";
    ctx.fillText("■ Vòng điện trường xoáy kín bao quanh ống dây", 40, h - 15);

    ctx.font = "bold 11px JetBrains Mono, monospace";
    ctx.fillStyle = "#0f172a";
    ctx.fillText("Điện kế G", meterX - 30, meterY + 28);
  };

  const resetAll = () => {
    setIsPlaying(true);
    setFrequency(1.5);
    setAmplitude(60);
    setViewAngle("iso");
    setMagnetY(30);
    setIsAutoMagnet(true);
  };

  const checkChallenge = () => {
    if (selectedOption === null) return;
    const correctIdx = challenges[currentChallenge].correctIndex;
    if (selectedOption === correctIdx) {
      setChallengeScore((prev) => prev + 10);
      setChallengeFeedback("Chính xác! Lập luận vật lý của em hoàn toàn chuẩn xác và bám sát nội dung.");
    } else {
      setChallengeFeedback("Chưa chính xác. Em hãy đọc kĩ phần giải thích bên dưới để nắm vững bản chất kiến thức nhé!");
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
    <div className="bg-slate-50 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-[6px_6px_0px_#1e293b] animate-fade-in text-slate-900 p-6 space-y-6" id="lesson19-simulation">
      
      {/* Simulation tab selectors with Neobrutalist look */}
      <div className="flex border-b-2 border-slate-200 pb-4 justify-between items-center flex-wrap gap-4">
        <div className="space-y-1">
          <span className="text-[10px] text-indigo-950 font-black uppercase tracking-wider font-mono bg-indigo-100 border-2 border-indigo-900 px-3 py-1 rounded shadow-sm inline-block">
            MÔ PHỎNG PHÒNG LAB SỐ
          </span>
          <h3 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <Compass className="h-5 w-5 text-indigo-600 animate-spin" style={{ animationDuration: "12s" }} />
            THỰC NGHIỆM ĐIỆN TỪ VÀ SÓNG ĐIỆN TỪ
          </h3>
        </div>

        {/* Tab selector - Tactile buttons */}
        <div className="flex gap-2 bg-slate-100 p-2 rounded-xl border-2 border-slate-800 shadow-inner">
          <button
            onClick={() => {
              setActiveTab("wave");
              setIsPlaying(true);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all border-2 border-slate-800 cursor-pointer ${
              activeTab === "wave"
                ? "bg-cyan-500 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
                : "bg-white text-slate-800 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1e293b]"
            }`}
          >
            Sóng điện từ 3D
          </button>
          <button
            onClick={() => {
              setActiveTab("induction");
              setIsPlaying(true);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all border-2 border-slate-800 cursor-pointer ${
              activeTab === "induction"
                ? "bg-purple-400 text-white shadow-none translate-x-[1px] translate-y-[1px]"
                : "bg-white text-slate-800 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1e293b]"
            }`}
          >
            Điện từ trường xoáy
          </button>
          <button
            onClick={() => {
              setActiveTab("practice");
              setIsPlaying(false);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all border-2 border-slate-800 cursor-pointer ${
              activeTab === "practice"
                ? "bg-amber-400 text-white shadow-none translate-x-[1px] translate-y-[1px]"
                : "bg-white text-slate-800 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1e293b]"
            }`}
          >
            🏆 Thử thách Luyện tập
          </button>
        </div>
      </div>

      {activeTab !== "practice" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left/Middle visual workspace */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-800 shadow-[4px_4px_0px_#1e293b] bg-white p-4">
              <canvas
                ref={canvasRef}
                width={720}
                height={360}
                className="w-full h-auto bg-white rounded-xl border border-slate-200 shadow-inner"
                id="simulation-canvas-19"
              />
              {/* Overlay view perspective toggles for E-M Wave */}
              {activeTab === "wave" && (
                <div className="absolute top-8 right-8 flex gap-1.5 bg-white p-1.5 rounded-xl border-2 border-slate-800 shadow-[3px_3px_0px_#1e293b]">
                  <button
                    onClick={() => setViewAngle("iso")}
                    className={`px-3 py-1 rounded-lg text-[9px] font-black border-2 border-slate-800 transition-all ${
                      viewAngle === "iso" ? "bg-cyan-200 text-slate-950 border-slate-800 shadow-none translate-x-[0.5px] translate-y-[0.5px]" : "bg-white text-slate-600 shadow-[1px_1px_0px_#1e293b]"
                    }`}
                    title="Phối cảnh Isometric 3 chiều"
                  >
                    3D (Iso)
                  </button>
                  <button
                    onClick={() => setViewAngle("front")}
                    className={`px-3 py-1 rounded-lg text-[9px] font-black border-2 border-slate-800 transition-all ${
                      viewAngle === "front" ? "bg-cyan-200 text-slate-950 border-slate-800 shadow-none translate-x-[0.5px] translate-y-[0.5px]" : "bg-white text-slate-600 shadow-[1px_1px_0px_#1e293b]"
                    }`}
                    title="Nhìn chính diện trục dọc E"
                  >
                    Trực diện E
                  </button>
                  <button
                    onClick={() => setViewAngle("side")}
                    className={`px-3 py-1 rounded-lg text-[9px] font-black border-2 border-slate-800 transition-all ${
                      viewAngle === "side" ? "bg-cyan-200 text-slate-950 border-slate-800 shadow-none translate-x-[0.5px] translate-y-[0.5px]" : "bg-white text-slate-600 shadow-[1px_1px_0px_#1e293b]"
                    }`}
                    title="Nhìn từ trên xuống trục ngang B"
                  >
                    Hình chiếu B
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Sidebar Controls Column */}
          <div className="lg:col-span-4 space-y-5 bg-indigo-50/70 p-5 rounded-2xl border-2 border-slate-800 shadow-[4px_4px_0px_#1e293b] flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b-2 border-indigo-200 pb-2">
                <span className="flex items-center gap-1.5 text-xs font-black text-slate-950 uppercase tracking-wider">
                  <Sliders className="h-4 w-4 text-indigo-800" /> THÔNG SỐ ĐIỀU KHIỂN
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-800 shadow-[1.5px_1.5px_0px_#1e293b] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                    title={isPlaying ? "Tạm dừng" : "Tiếp tục"}
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={resetAll}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-800 shadow-[1.5px_1.5px_0px_#1e293b] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                    title="Đặt lại thiết bị"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {activeTab === "wave" ? (
                <div className="space-y-4 text-xs" id="sim-controls-wave">
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-900 font-bold">
                      <span>Tần số sóng (f):</span>
                      <span className="text-cyan-800 font-mono font-black">{frequency.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.1"
                      value={frequency}
                      onChange={(e) => setFrequency(parseFloat(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                    <span className="text-[9px] text-slate-600 font-bold block">Tần số cao làm sóng biến đổi cực nhanh trong không gian.</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-900 font-bold">
                      <span>Biên độ trường (A):</span>
                      <span className="text-purple-850 font-mono font-black">{amplitude} px</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="90"
                      value={amplitude}
                      onChange={(e) => setAmplitude(parseInt(e.target.value))}
                      className="w-full accent-purple-650 cursor-pointer"
                    />
                    <span className="text-[9px] text-slate-600 font-bold block">Cường độ đỉnh của Điện trường và Cảm ứng từ véc tơ.</span>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-850 hover:text-slate-950 font-black text-[11px]">
                      <input
                        type="checkbox"
                        checked={showVectors}
                        onChange={(e) => setShowVectors(e.checked)}
                        className="rounded border-2 border-slate-800 accent-cyan-600 h-4 w-4"
                      />
                      <span>Hiển thị véc tơ dao động E & B</span>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs font-bold" id="sim-controls-induction">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-850 hover:text-slate-950 font-black text-[11px]">
                      <input
                        type="checkbox"
                        checked={isAutoMagnet}
                        onChange={(e) => setIsAutoMagnet(e.checked)}
                        className="rounded border-2 border-slate-800 accent-purple-650 h-4 w-4"
                      />
                      <span>Tự động rơi nam châm liên tục</span>
                    </label>
                  </div>

                  {!isAutoMagnet && (
                    <div className="space-y-1 animate-fade-in">
                      <div className="flex justify-between text-slate-900 font-bold">
                        <span>Vị trí nam châm:</span>
                        <span className="text-amber-800 font-mono font-black">{magnetY}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="95"
                        value={magnetY}
                        onChange={(e) => setMagnetY(parseInt(e.target.value))}
                        className="w-full accent-amber-600 cursor-pointer"
                      />
                      <span className="text-[9px] text-slate-600 block leading-tight font-medium">Kéo thanh trượt nhanh/chậm để tạo sự thay đổi từ thông sinh dòng điện.</span>
                    </div>
                  )}

                  <div className="bg-white p-3.5 rounded-xl border-2 border-slate-800 space-y-1.5 shadow-inner">
                    <span className="text-[9px] text-cyan-800 font-black font-mono uppercase block">Nhận xét thực nghiệm:</span>
                    <p className="text-[10px] text-slate-800 leading-normal font-bold">
                      Khi nam châm chuyển động qua lại cuộn dây, từ thông biến thiên làm kim điện kế lệch sang hai phía. Đó là do một điện trường xoáy (đường sức tròn khép kín) xuất hiện cản trở chuyển động của nam châm!
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-emerald-50 border-2 border-slate-800 p-4 rounded-xl flex gap-2.5 items-start text-[11px] shadow-[3px_3px_0px_#1e293b]">
              <HelpCircle className="h-4.5 w-4.5 text-emerald-800 shrink-0 mt-0.5" />
              <div className="text-slate-900 font-bold leading-relaxed">
                {activeTab === "wave" ? (
                  <span>Trực quan hóa tam diện thuận: Trục truyền sóng X, trục điện trường Y (đứng), trục từ trường Z (ngang). Hãy xoay góc nhìn để quan sát sự đồng pha của sóng điện từ!</span>
                ) : (
                  <span>Quan sát thấy đường điện trường xoáy khép kín xuất hiện quanh cuộn dây đồng khi từ thông thay đổi, đây là phát kiến vĩ đại nối liền điện học và từ học.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border-2 border-slate-800 p-6 rounded-3xl max-w-2xl mx-auto space-y-6 shadow-[6px_6px_0px_0px_#1e293b] text-slate-900">
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
