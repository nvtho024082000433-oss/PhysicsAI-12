import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sliders, 
  Compass, 
  Activity, 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  Move,
  Camera,
  Eye,
  Settings,
  Flame,
  Binary
} from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface SimulationGalleryProps {
  onEarnXP?: (amount: number, reason: string) => void;
  onTakeSnapshot?: (
    simId: "thermal" | "gas" | "pendulum" | "incline" | "wave" | "optics",
    simName: string,
    parameters: { label: string; value: string }[],
    imageUrl: string
  ) => void;
}

export function SimulationGallery({ onEarnXP, onTakeSnapshot }: SimulationGalleryProps) {
  const [activeTab, setActiveTab] = useState<"pendulum" | "wave" | "optics">("pendulum");

  return (
    <div className="space-y-6">
      {/* Simulation Selector Tab */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2.5">
          <Compass className="h-5 w-5 text-indigo-400 animate-spin-slow" />
          <div>
            <h3 className="text-sm font-bold text-slate-200">Thư Viện Mô Phỏng D3 Interactive</h3>
            <p className="text-[10.5px] text-slate-400 font-medium">Sử dụng đồ họa vector D3 để trực quan hóa, kéo thả và tương tác với các định luật vật lý</p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("pendulum")}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              activeTab === "pendulum"
                ? "bg-indigo-600/35 text-indigo-300 border-indigo-500/50 shadow-md"
                : "text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            Con Lắc Đơn D3
          </button>
          <button
            onClick={() => setActiveTab("wave")}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              activeTab === "wave"
                ? "bg-cyan-600/35 text-cyan-300 border-cyan-500/50 shadow-md"
                : "text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            Sự Truyền Sóng D3
          </button>
          <button
            onClick={() => setActiveTab("optics")}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              activeTab === "optics"
                ? "bg-emerald-600/35 text-emerald-300 border-emerald-500/50 shadow-md"
                : "text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            Quang Hình Học D3
          </button>
        </div>
      </div>

      {activeTab === "pendulum" ? (
        <PendulumSimulationD3 onEarnXP={onEarnXP} onTakeSnapshot={onTakeSnapshot} />
      ) : activeTab === "wave" ? (
        <WaveSimulationD3 onEarnXP={onEarnXP} onTakeSnapshot={onTakeSnapshot} />
      ) : (
        <OpticsSimulationD3 onEarnXP={onEarnXP} onTakeSnapshot={onTakeSnapshot} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// 1. D3 PENDULUM SIMULATION (CON LẮC ĐƠN TƯƠNG TÁC D3)
// ---------------------------------------------------------------------
function PendulumSimulationD3({ onEarnXP, onTakeSnapshot }: SimulationGalleryProps) {
  // Physical parameters
  const [length, setLength] = useState<number>(1.2); // m (0.5 to 2.0)
  const [gravity, setGravity] = useState<number>(9.8); // m/s^2 (1.6 to 24.8)
  const [damping, setDamping] = useState<number>(0.05); // b (0.0 to 0.5)
  const [mass, setMass] = useState<number>(0.4); // kg (0.1 to 1.5)
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Readouts
  const [angleDeg, setAngleDeg] = useState<number>(30);
  const [maxAmp, setMaxAmp] = useState<number>(30);
  const [measuredPeriods, setMeasuredPeriods] = useState<number[]>([]);

  // Simulation integration refs
  const stateRef = useRef({
    theta: (30 * Math.PI) / 180, // rad
    omega: 0.0, // rad/s
    time: 0.0,
    lastCrossingTime: 0.0,
    crossingsCount: 0,
    isDragging: false
  });

  // Achievements
  const [earthPeriodGoal, setEarthPeriodGoal] = useState<boolean>(false);
  const [dampingGoal, setDampingGoal] = useState<boolean>(false);

  // SVG references
  const mainSvgRef = useRef<SVGSVGElement | null>(null);
  const energySvgRef = useRef<SVGSVGElement | null>(null);
  const phaseSvgRef = useRef<SVGSVGElement | null>(null);

  // Historical phase points for phase-space trajectory trail
  const phaseTrailRef = useRef<{ theta: number; omega: number }[]>([]);

  const handleReset = () => {
    stateRef.current.theta = (30 * Math.PI) / 180;
    stateRef.current.omega = 0.0;
    stateRef.current.time = 0.0;
    stateRef.current.lastCrossingTime = 0.0;
    stateRef.current.crossingsCount = 0;
    phaseTrailRef.current = [];
    setAngleDeg(30);
    setMaxAmp(30);
    setMeasuredPeriods([]);
    setIsRunning(false);
  };

  // MAIN ANIMATION LOOP & DRAG BINDING
  useEffect(() => {
    const svgEl = mainSvgRef.current;
    if (!svgEl) return;

    const svg = d3.select(svgEl);
    const width = 340;
    const height = 240;
    const pivotX = width / 2;
    const pivotY = 30;
    const scalePxMeter = 90; // Pixels per meter

    // Configure D3 dragging for the pendulum bob
    const drag = d3.drag<SVGCircleElement, unknown>()
      .on("start", () => {
        stateRef.current.isDragging = true;
        stateRef.current.omega = 0;
      })
      .on("drag", (event) => {
        const [mx, my] = d3.pointer(event, svgEl);
        const dx = mx - pivotX;
        const dy = my - pivotY;
        let thetaRad = Math.atan2(dx, dy);
        
        // Clamp to ±80 degrees
        const maxRad = (80 * Math.PI) / 180;
        thetaRad = Math.max(-maxRad, Math.min(maxRad, thetaRad));
        
        stateRef.current.theta = thetaRad;
        stateRef.current.omega = 0;
        
        const deg = Math.round((thetaRad * 180) / Math.PI);
        setAngleDeg(deg);
        setMaxAmp(Math.abs(deg));
      })
      .on("end", () => {
        stateRef.current.isDragging = false;
        setIsRunning(true);
      });

    // Draw grid background and protractor guide once using D3
    svg.selectAll("*").remove(); // Clear viewport

    // Gradient definition for the metallic ball
    const defs = svg.append("defs");
    const gradient = defs.append("radialGradient")
      .attr("id", "bob-gradient")
      .attr("cx", "30%")
      .attr("cy", "30%")
      .attr("r", "70%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#e2e8f0");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#475569");

    const glowFilter = defs.append("filter")
      .attr("id", "cyan-glow")
      .attr("x", "-20%")
      .attr("y", "-20%")
      .attr("width", "140%")
      .attr("height", "140%");
    glowFilter.append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "blur");
    glowFilter.append("feComposite")
      .attr("in", "SourceGraphic")
      .attr("in2", "blur")
      .attr("operator", "over");

    // Protractor arcs and angle lines
    const gGuide = svg.append("g").attr("class", "guides").attr("opacity", 0.25);
    
    // Vertical reference
    gGuide.append("line")
      .attr("x1", pivotX)
      .attr("y1", pivotY)
      .attr("x2", pivotX)
      .attr("y2", pivotY + 180)
      .attr("stroke", "#94a3b8")
      .attr("stroke-dasharray", "3,4")
      .attr("stroke-width", 1);

    // Major angle lines (±15°, ±30°, ±45°, ±60°)
    [-60, -45, -30, -15, 15, 30, 45, 60].forEach(deg => {
      const rad = (deg * Math.PI) / 180;
      gGuide.append("line")
        .attr("x1", pivotX)
        .attr("y1", pivotY)
        .attr("x2", pivotX + 170 * Math.sin(rad))
        .attr("y2", pivotY + 170 * Math.cos(rad))
        .attr("stroke", "#475569")
        .attr("stroke-width", 0.7);

      gGuide.append("text")
        .attr("x", pivotX + 182 * Math.sin(rad))
        .attr("y", pivotY + 182 * Math.cos(rad))
        .attr("fill", "#64748b")
        .attr("font-size", "7.5px")
        .attr("font-family", "monospace")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(`${deg}°`);
    });

    // Support stand
    svg.append("line")
      .attr("x1", pivotX - 40)
      .attr("y1", pivotY)
      .attr("x2", pivotX + 40)
      .attr("y2", pivotY)
      .attr("stroke", "#1e293b")
      .attr("stroke-width", 5)
      .attr("stroke-linecap", "round");

    svg.append("circle")
      .attr("cx", pivotX)
      .attr("cy", pivotY)
      .attr("r", 4.5)
      .attr("fill", "#64748b")
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 1.5);

    // Create selection groups for string, bob, and vectors to update dynamically
    const stringLine = svg.append("line")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-width", 2.2);

    const forceVectors = svg.append("g").attr("class", "forces");
    
    // Gravitational vector (P)
    const arrowP = forceVectors.append("g");
    arrowP.append("line")
      .attr("stroke", "#f87171")
      .attr("stroke-width", 2);
    arrowP.append("polygon")
      .attr("fill", "#f87171")
      .attr("points", "0,0 -3.5,-6 3.5,-6");
    arrowP.append("text")
      .attr("fill", "#f87171")
      .attr("font-size", "9px")
      .attr("font-family", "monospace")
      .attr("font-weight", "bold")
      .text("P");

    // Tension vector (T)
    const arrowT = forceVectors.append("g");
    arrowT.append("line")
      .attr("stroke", "#38bdf8")
      .attr("stroke-width", 2);
    arrowT.append("polygon")
      .attr("fill", "#38bdf8")
      .attr("points", "0,0 -3.5,-6 3.5,-6");
    arrowT.append("text")
      .attr("fill", "#38bdf8")
      .attr("font-size", "9px")
      .attr("font-family", "monospace")
      .attr("font-weight", "bold")
      .text("T");

    const bobNode = svg.append("circle")
      .attr("r", 10 + mass * 6)
      .attr("fill", "url(#bob-gradient)")
      .attr("stroke", "#1e293b")
      .attr("stroke-width", 1.5)
      .attr("cursor", "grab")
      .style("filter", "drop-shadow(0px 3px 4px rgba(0,0,0,0.4))")
      .call(drag);

    // Active tracking readout texts
    const readoutText = svg.append("text")
      .attr("x", 12)
      .attr("y", height - 12)
      .attr("fill", "#94a3b8")
      .attr("font-size", "9.5px")
      .attr("font-family", "monospace");

    let animId: number;
    let lastTime = performance.now();

    const loop = () => {
      const now = performance.now();
      const dt = Math.min(0.025, (now - lastTime) / 1000); // capped delta t
      lastTime = now;

      const currentL_px = length * scalePxMeter;

      if (isRunning && !stateRef.current.isDragging) {
        // Physics update: d2(theta)/dt2 = -(g/L)*sin(theta) - (damping/mass)*omega
        const acc = -(gravity / length) * Math.sin(stateRef.current.theta) - (damping / mass) * stateRef.current.omega;
        
        stateRef.current.omega += acc * dt;
        stateRef.current.theta += stateRef.current.omega * dt;
        stateRef.current.time += dt;

        // Detect Period crossings (max deflections, velocity changes sign)
        const currentVel = stateRef.current.omega;
        const prevVel = currentVel - acc * dt;
        if (prevVel > 0 && currentVel <= 0) {
          const crossingInterval = stateRef.current.time - stateRef.current.lastCrossingTime;
          stateRef.current.lastCrossingTime = stateRef.current.time;
          stateRef.current.crossingsCount += 1;

          if (stateRef.current.crossingsCount >= 2 && crossingInterval > 0.1) {
            const periodVal = crossingInterval * 2;
            setMeasuredPeriods(prev => [parseFloat(periodVal.toFixed(2)), ...prev].slice(0, 3));
          }
        }

        const deg = Math.round((stateRef.current.theta * 180) / Math.PI);
        setAngleDeg(deg);
        if (Math.abs(deg) > maxAmp) {
          setMaxAmp(Math.abs(deg));
        }

        // Add to phase-space trail
        phaseTrailRef.current.push({ theta: stateRef.current.theta, omega: stateRef.current.omega });
        if (phaseTrailRef.current.length > 180) {
          phaseTrailRef.current.shift();
        }
      }

      // Render string line
      const currentTheta = stateRef.current.theta;
      const bobX = pivotX + currentL_px * Math.sin(currentTheta);
      const bobY = pivotY + currentL_px * Math.cos(currentTheta);

      stringLine
        .attr("x1", pivotX)
        .attr("y1", pivotY)
        .attr("x2", bobX)
        .attr("y2", bobY);

      bobNode
        .attr("cx", bobX)
        .attr("cy", bobY)
        .attr("cursor", stateRef.current.isDragging ? "grabbing" : "grab");

      // Draw Force Vector Arrows originating from Bob center
      if (!stateRef.current.isDragging) {
        forceVectors.attr("display", "block");
        
        // 1. Gravity Vector P (always straight down)
        const lenP = Math.min(55, mass * gravity * 8);
        arrowP.select("line")
          .attr("x1", bobX)
          .attr("y1", bobY)
          .attr("x2", bobX)
          .attr("y2", bobY + lenP);
        
        arrowP.select("polygon")
          .attr("transform", `translate(${bobX}, ${bobY + lenP})`);

        arrowP.select("text")
          .attr("x", bobX + 6)
          .attr("y", bobY + lenP - 2);

        // 2. Tension Vector T (along the string toward pivot)
        // Tension magnitude: T = m*g*cos(theta) + m * L * omega^2
        const tensionVal = mass * gravity * Math.cos(currentTheta) + mass * length * Math.pow(stateRef.current.omega, 2);
        const lenT = Math.min(65, tensionVal * 8);
        const endTx = bobX - lenT * Math.sin(currentTheta);
        const endTy = bobY - lenT * Math.cos(currentTheta);

        arrowT.select("line")
          .attr("x1", bobX)
          .attr("y1", bobY)
          .attr("x2", endTx)
          .attr("y2", endTy);

        const arrowDirRad = Math.atan2(endTy - bobY, endTx - bobX);
        arrowT.select("polygon")
          .attr("transform", `translate(${endTx}, ${endTy}) rotate(${(arrowDirRad * 180) / Math.PI + 90})`);

        arrowT.select("text")
          .attr("x", endTx - 10)
          .attr("y", endTy - 2);
      } else {
        forceVectors.attr("display", "none");
      }

      // Interactive drag visual banner
      if (stateRef.current.isDragging) {
        readoutText.text(`KÉO THẢ GÓC: ${Math.round((stateRef.current.theta * 180) / Math.PI)}°`).attr("fill", "#818cf8");
      } else {
        readoutText.text(`θ = ${Math.round((stateRef.current.theta * 180) / Math.PI)}° | L = ${length}m | g = ${gravity}m/s²`).attr("fill", "#94a3b8");
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animId);
  }, [length, gravity, damping, mass, isRunning]);

  // RENDER D3 REAL-TIME ENERGY CHART
  useEffect(() => {
    const canvasEl = energySvgRef.current;
    if (!canvasEl) return;

    const svg = d3.select(canvasEl);
    const width = 120;
    const height = 150;
    svg.selectAll("*").remove();

    // Energy calculation
    const h = length * (1 - Math.cos(stateRef.current.theta));
    const Ep = mass * gravity * h; // Potential energy
    const v = length * stateRef.current.omega;
    const Ek = 0.5 * mass * v * v; // Kinetic energy
    const Etot = Ep + Ek; // Total mechanical energy

    // Scale mapping energy values (J) to height pixels
    // Let's find max possible energy at theta = 60°
    const maxPossH = length * (1 - Math.cos((60 * Math.PI) / 180));
    const maxPossEp = mass * gravity * maxPossH;
    const yScale = d3.scaleLinear()
      .domain([0, Math.max(maxPossEp * 1.5, Etot * 1.1, 0.5)])
      .range([height - 20, 10]);

    const energies = [
      { name: "Thế năng (Ep)", val: Ep, color: "#a855f7" }, // Purple
      { name: "Động năng (Ek)", val: Ek, color: "#38bdf8" }, // Cyan
      { name: "Cơ năng (E)", val: Etot, color: "#10b981" }  // Green
    ];

    // Bars
    svg.selectAll(".bar")
      .data(energies)
      .enter()
      .append("rect")
      .attr("x", (d, i) => 12 + i * 36)
      .attr("y", d => yScale(d.val))
      .attr("width", 22)
      .attr("height", d => Math.max(0, height - 20 - yScale(d.val)))
      .attr("fill", d => d.color)
      .attr("rx", 3);

    // Labels underneath
    svg.selectAll(".label")
      .data(["Ep", "Ek", "E"])
      .enter()
      .append("text")
      .attr("x", (d, i) => 23 + i * 36)
      .attr("y", height - 6)
      .attr("fill", "#64748b")
      .attr("font-size", "9px")
      .attr("font-family", "monospace")
      .attr("text-anchor", "middle")
      .text(d => d);

    // Dynamic numeric values on top of bars
    svg.selectAll(".val-text")
      .data(energies)
      .enter()
      .append("text")
      .attr("x", (d, i) => 23 + i * 36)
      .attr("y", d => Math.min(height - 22, yScale(d.val) - 3))
      .attr("fill", "#94a3b8")
      .attr("font-size", "7px")
      .attr("font-family", "monospace")
      .attr("text-anchor", "middle")
      .text(d => d.val.toFixed(2) + "J");

  }, [angleDeg, length, mass, gravity]);

  // RENDER D3 PHASE SPACE TRAJECTORY (KHÔNG GIAN PHA)
  useEffect(() => {
    const canvasEl = phaseSvgRef.current;
    if (!canvasEl) return;

    const svg = d3.select(canvasEl);
    const width = 150;
    const height = 150;
    svg.selectAll("*").remove();

    // Axis Scales: angle (theta) vs angular velocity (omega)
    const scaleTheta = d3.scaleLinear().domain([-1.2, 1.2]).range([15, width - 15]);
    const scaleOmega = d3.scaleLinear().domain([-4.5, 4.5]).range([height - 15, 15]);

    // Draw central grid lines
    svg.append("line")
      .attr("x1", scaleTheta(0))
      .attr("y1", 10)
      .attr("x2", scaleTheta(0))
      .attr("y2", height - 10)
      .attr("stroke", "#334155")
      .attr("stroke-width", 0.7);

    svg.append("line")
      .attr("x1", 10)
      .attr("y1", scaleOmega(0))
      .attr("x2", width - 10)
      .attr("y2", scaleOmega(0))
      .attr("stroke", "#334155")
      .attr("stroke-width", 0.7);

    // Axis labels
    svg.append("text")
      .attr("x", width - 12)
      .attr("y", scaleOmega(0) - 3)
      .attr("fill", "#64748b")
      .attr("font-size", "7.5px")
      .attr("font-family", "monospace")
      .attr("text-anchor", "end")
      .text("θ");

    svg.append("text")
      .attr("x", scaleTheta(0) + 4)
      .attr("y", 12)
      .attr("fill", "#64748b")
      .attr("font-size", "7.5px")
      .attr("font-family", "monospace")
      .text("ω");

    // Draw trajectory trail
    if (phaseTrailRef.current.length > 1) {
      const lineGenerator = d3.line<{ theta: number; omega: number }>()
        .x(d => scaleTheta(d.theta))
        .y(d => scaleOmega(d.omega))
        .curve(d3.curveCardinal);

      svg.append("path")
        .datum(phaseTrailRef.current)
        .attr("fill", "none")
        .attr("stroke", "url(#phase-glowing-grad)")
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);
        
      // Dynamic glowing gradient for phase trail (fading effect)
      const defs = svg.append("defs");
      const linearGrad = defs.append("linearGradient")
        .attr("id", "phase-glowing-grad")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "100%").attr("y2", "100%");
      linearGrad.append("stop").attr("offset", "0%").attr("stop-color", "#c084fc");
      linearGrad.append("stop").attr("offset", "100%").attr("stop-color", "#38bdf8");
    }

    // Active pointer coordinates
    svg.append("circle")
      .attr("cx", scaleTheta(stateRef.current.theta))
      .attr("cy", scaleOmega(stateRef.current.omega))
      .attr("r", 3.5)
      .attr("fill", "#f43f5e") // rose-500 pointer
      .attr("stroke", "#1e1b4b")
      .attr("stroke-width", 1);

  }, [angleDeg]);

  // Tasks Verification
  const verifyEarthPeriod = () => {
    const isStandardLength = Math.abs(length - 1.0) < 0.05;
    const isStandardGravity = Math.abs(gravity - 9.8) < 0.1;
    if (isStandardLength && isStandardGravity) {
      setEarthPeriodGoal(true);
      if (onEarnXP) {
        onEarnXP(50, "Đạt chu kỳ con lắc đơn chuẩn T = 2.0s trên Trái Đất (L = 1.0m, g = 9.8 m/s²)");
      }
    } else {
      alert("Gợi ý: Điều chỉnh Chiều dài dây L = 1.0m và Gia tốc trọng trường g = 9.8 m/s² để đo chu kỳ chuẩn!");
    }
  };

  const verifyDampingExp = () => {
    if (damping >= 0.18) {
      setDampingGoal(true);
      if (onEarnXP) {
        onEarnXP(50, "Nghiên cứu dao động tắt dần dưới tác dụng lực cản không khí b ≥ 0.18");
      }
    } else {
      alert("Gợi ý: Tăng Hệ số cản b lên lớn hơn 0.18, sau đó nhấn Reset và chạy mô phỏng!");
    }
  };

  const captureD3Snapshot = () => {
    const svgEl = mainSvgRef.current;
    if (svgEl && onTakeSnapshot) {
      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(svgEl);
      
      // Embed inline style so that SVG text parses correctly in rendering
      svgString = svgString.replace(/<svg[^>]*>/, `$&<style>text { font-family: monospace; font-weight: bold; }</style>`);
      
      const svg64 = btoa(unescape(encodeURIComponent(svgString)));
      const imgUrl = `data:image/svg+xml;base64,${svg64}`;
      
      onTakeSnapshot(
        "pendulum",
        "D3 Con Lắc Đơn - Dao Động Vật Lý",
        [
          { label: "Chiều dài dây (L)", value: `${length} m` },
          { label: "Trọng trường (g)", value: `${gravity} m/s²` },
          { label: "Lực cản (b)", value: `${damping}` },
          { label: "Khối lượng (m)", value: `${mass} kg` },
          { label: "Chu kỳ lí thuyết", value: `${(2 * Math.PI * Math.sqrt(length / gravity)).toFixed(2)}s` }
        ],
        imgUrl
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Parameters Sidebar */}
      <div className="lg:col-span-5 bg-slate-950/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2.5">
            <Sliders className="text-indigo-400 h-4 w-4 animate-pulse" />
            <h4 className="text-xs font-black text-slate-100 uppercase tracking-wider">Thông Số Mô Phỏng</h4>
          </div>

          {/* Length */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Chiều dài dây treo (L)</span>
              <span className="text-indigo-400 font-bold">{length.toFixed(2)} m</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={length}
              onChange={(e) => {
                setLength(parseFloat(e.target.value));
                handleReset();
              }}
              className="w-full accent-indigo-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Gravity */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Gia tốc trọng trường (g)</span>
              <span className="text-indigo-400 font-bold">{gravity.toFixed(1)} m/s²</span>
            </div>
            <input
              type="range"
              min="1.6"
              max="24.8"
              step="0.1"
              value={gravity}
              onChange={(e) => {
                setGravity(parseFloat(e.target.value));
                handleReset();
              }}
              className="w-full accent-indigo-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-semibold mt-0.5">
              <span>Mặt Trăng (1.6)</span>
              <span>Trái Đất (9.8)</span>
              <span>Mộc Tinh (24.8)</span>
            </div>
          </div>

          {/* Damping */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Lực cản môi trường (b)</span>
              <span className="text-purple-400 font-bold">{damping.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="0.4"
              step="0.02"
              value={damping}
              onChange={(e) => setDamping(parseFloat(e.target.value))}
              className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Mass */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Khối lượng vật nặng (m)</span>
              <span className="text-emerald-400 font-bold">{mass.toFixed(2)} kg</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.05"
              value={mass}
              onChange={(e) => setMass(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Analysis Info */}
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1 text-slate-300">
            <span className="text-[9px] text-slate-500 block uppercase tracking-wider font-semibold">Thông số phân tích dao động bé</span>
            <div className="text-[10.5px] font-mono leading-relaxed space-y-1">
              <div className="flex justify-between">
                <span>Tần số góc tự do:</span>
                <span className="text-cyan-400 font-bold">ω = {Math.sqrt(gravity / length).toFixed(2)} rad/s</span>
              </div>
              <div className="flex justify-between border-t border-slate-800/50 pt-1 mt-1">
                <span>Chu kỳ lý thuyết (T):</span>
                <span className="text-cyan-400 font-bold">T = {(2 * Math.PI * Math.sqrt(length / gravity)).toFixed(3)} s</span>
              </div>
              <div className="flex justify-between border-t border-slate-800/50 pt-1 mt-1">
                <span>Các chu kỳ gần nhất:</span>
                <span className="text-amber-400 font-bold">
                  {measuredPeriods.length > 0 ? measuredPeriods.map(v => `${v}s`).join(" | ") : "Chờ dao động..."}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all ${
              isRunning
                ? "bg-slate-800 text-red-400 border border-red-500/20 hover:bg-slate-800/70"
                : "bg-indigo-500 text-slate-950 hover:bg-indigo-400 shadow-lg shadow-indigo-500/20"
            }`}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isRunning ? "Tạm Dừng" : "Tiếp Tục"}
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <RotateCcw className="h-4 w-4 text-indigo-400" />
            <span>Reset</span>
          </button>
          <button
            onClick={captureD3Snapshot}
            className="p-2 bg-slate-900 border border-indigo-500/30 text-indigo-400 hover:text-indigo-300 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold"
            title="Chụp ảnh dao động con lắc"
          >
            <Camera className="h-4 w-4" />
            <span>Chụp</span>
          </button>
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main D3 Canvas Area */}
          <div className="md:col-span-8 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between h-[280px] relative overflow-hidden">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Con lắc đơn tương tác D3</span>
            <div className="relative flex justify-center h-[230px]">
              <svg ref={mainSvgRef} width="340" height="240" className="max-w-full overflow-visible" />
            </div>
          </div>

          {/* Analytics Plots Box */}
          <div className="md:col-span-4 flex flex-col gap-4">
            {/* Energy Plot */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 flex flex-col justify-between h-[132px] overflow-hidden">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Biểu đồ năng lượng (D3)</span>
              <div className="flex justify-center h-[105px]">
                <svg ref={energySvgRef} width="120" height="110" className="overflow-visible" />
              </div>
            </div>

            {/* Phase space plot */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 flex flex-col justify-between h-[132px] overflow-hidden">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Không gian pha (D3 Orbit)</span>
              <div className="flex justify-center h-[105px]">
                <svg ref={phaseSvgRef} width="110" height="110" className="overflow-visible" />
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Box */}
        <div className="bg-slate-950/60 border border-slate-800/85 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800/40 pb-2">
            <Award className="text-amber-400 h-4 w-4" />
            <h5 className="text-[11px] font-black uppercase text-slate-200 tracking-wider">Thử Thách Thực Hành (+100 XP)</h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Task 1 */}
            <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-[11px]">• Tạo giây chuẩn g-L</span>
                  {earthPeriodGoal ? (
                    <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-0.5">
                      <CheckCircle2 className="h-3 w-3" /> Hoàn thành
                    </span>
                  ) : (
                    <span className="text-amber-400 font-bold text-[9px] bg-amber-500/10 px-1 py-0.5 rounded">Thực hiện</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Chỉnh chiều dài dây <strong className="text-indigo-400">L = 1.0m</strong> và trọng lực Trái Đất <strong className="text-indigo-400">g = 9.8m/s²</strong> để đo chu kỳ dao động chuẩn T = 2 giây.
                </p>
              </div>
              <button
                onClick={verifyEarthPeriod}
                disabled={earthPeriodGoal}
                className="mt-3 w-full py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-[10px] rounded-lg transition-colors disabled:opacity-50"
              >
                Xác thực thông số
              </button>
            </div>

            {/* Task 2 */}
            <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-[11px]">• Khảo sát tắt dần</span>
                  {dampingGoal ? (
                    <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-0.5">
                      <CheckCircle2 className="h-3 w-3" /> Hoàn thành
                    </span>
                  ) : (
                    <span className="text-amber-400 font-bold text-[9px] bg-amber-500/10 px-1 py-0.5 rounded">Thực hiện</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Thiết lập hệ số lực cản <strong className="text-purple-400">b ≥ 0.18</strong> và quan sát biểu đồ thế năng/động năng hao hụt dần theo thời gian trong quá trình tắt dần.
                </p>
              </div>
              <button
                onClick={verifyDampingExp}
                disabled={dampingGoal}
                className="mt-3 w-full py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white font-bold text-[10px] rounded-lg transition-colors disabled:opacity-50"
              >
                Xác thực cản tắt dần
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 2. MECHANICAL WAVE PROPAGATION SIMULATION (SỰ TRUYỀN SÓNG CƠ D3)
// ---------------------------------------------------------------------
function WaveSimulationD3({ onEarnXP, onTakeSnapshot }: SimulationGalleryProps) {
  const [frequency, setFrequency] = useState<number>(1.2); // Hz (0.5 to 2.5)
  const [amplitude, setAmplitude] = useState<number>(25); // px height (10 to 45)
  const [waveSpeed, setWaveSpeed] = useState<number>(120); // px/s (80 to 200)
  const [damping, setDamping] = useState<number>(0.0); // decay (0 to 0.015)
  const [waveMode, setWaveMode] = useState<"transverse" | "longitudinal" | "standing">("transverse");
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Challenge goals
  const [wavelengthGoal, setWavelengthGoal] = useState<boolean>(false);
  const [standingWaveGoal, setStandingWaveGoal] = useState<boolean>(false);

  const mainSvgRef = useRef<SVGSVGElement | null>(null);

  // Numerical formula constants
  const wavelength = waveSpeed / frequency; // λ = v/f (px)

  useEffect(() => {
    const svgEl = mainSvgRef.current;
    if (!svgEl) return;

    const svg = d3.select(svgEl);
    const width = 560;
    const height = 240;
    svg.selectAll("*").remove();

    // Setup base groups
    const grid = svg.append("g").attr("class", "grid-axis").attr("opacity", 0.15);
    
    // Horizontal axis line in center
    grid.append("line")
      .attr("x1", 20)
      .attr("y1", height / 2)
      .attr("x2", width - 20)
      .attr("y2", height / 2)
      .attr("stroke", "#94a3b8")
      .attr("stroke-width", 1.5);

    // Dynamic wave connector line
    const wavePath = svg.append("path")
      .attr("fill", "none")
      .attr("stroke", waveMode === "standing" ? "#ec4899" : "#22d3ee")
      .attr("stroke-width", 2)
      .attr("opacity", waveMode === "longitudinal" ? 0.05 : 0.85);

    // Number of particles representing medium nodes
    const numPoints = 40;
    const paddingX = 35;
    const spacing = (width - paddingX * 2) / (numPoints - 1);

    const particlesData = Array.from({ length: numPoints }, (_, i) => ({
      index: i,
      originalX: paddingX + i * spacing,
      originalY: height / 2
    }));

    // Draw nodes
    const nodes = svg.selectAll(".particle")
      .data(particlesData)
      .enter()
      .append("circle")
      .attr("class", "particle")
      .attr("r", d => d.index === 0 ? 5.5 : 3.5)
      .attr("fill", d => d.index === 0 ? "#f97316" : "#22d3ee") // Orange origin source, cyan nodes
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 1);

    // Static wave metadata overlays
    const wavelengthIndicator = svg.append("g").attr("class", "wave-meta");
    
    let animId: number;
    let localTime = 0;

    const update = () => {
      if (isRunning) {
        localTime += 0.035; // speed factor
      }

      const pointsArray: [number, number][] = [];

      nodes.each(function (d) {
        let x = d.originalX;
        let y = d.originalY;

        const distanceToSource = x - paddingX; // px
        const angularFreq = 2 * Math.PI * frequency;
        const waveNumber = (2 * Math.PI) / wavelength;

        const amplitudeDecay = amplitude * Math.exp(-damping * distanceToSource);

        if (waveMode === "transverse") {
          // Transverse wave: vertical displacement
          const phase = angularFreq * localTime - waveNumber * distanceToSource;
          // Only propagate up to wave speed threshold
          const timeToReach = distanceToSource / waveSpeed;
          const hasWaveReached = localTime >= timeToReach;
          
          if (hasWaveReached) {
            y += amplitudeDecay * Math.sin(phase);
          }
          pointsArray.push([x, y]);
        } else if (waveMode === "longitudinal") {
          // Longitudinal wave: horizontal displacement
          const phase = angularFreq * localTime - waveNumber * distanceToSource;
          const timeToReach = distanceToSource / waveSpeed;
          const hasWaveReached = localTime >= timeToReach;
          
          if (hasWaveReached) {
            x += amplitudeDecay * Math.cos(phase);
          }
          pointsArray.push([x, y]);
        } else if (waveMode === "standing") {
          // Standing wave: superposition resulting in y = 2A * sin(kx) * cos(wt)
          const kx = waveNumber * distanceToSource;
          const wt = angularFreq * localTime;
          // Boundary conditions: fixed ends (ends at x=0 and x=L)
          y += amplitudeDecay * Math.sin(kx) * Math.cos(wt);
          pointsArray.push([x, y]);
        }

        d3.select(this)
          .attr("cx", x)
          .attr("cy", y)
          .attr("fill", () => {
            if (d.index === 0) return "#f97316"; // origin
            if (waveMode === "standing") {
              // Highlight nodes (stationary) in standing wave
              const distance = x - paddingX;
              const isNode = Math.abs(Math.sin((2 * Math.PI / wavelength) * distance)) < 0.18;
              return isNode ? "#f43f5e" : "#ec4899"; // Red node, magenta belly
            }
            return "#22d3ee";
          });
      });

      // Update connecting line path
      if (waveMode !== "longitudinal") {
        const lineGenerator = d3.line<[number, number]>()
          .x(d => d[0])
          .y(d => d[1])
          .curve(d3.curveBasis);

        wavePath.attr("d", lineGenerator(pointsArray));
      } else {
        wavePath.attr("d", "");
      }

      animId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(animId);
  }, [frequency, amplitude, waveSpeed, damping, waveMode, isRunning, wavelength]);

  const verifyWavelength = () => {
    const theoreticalLambda = waveSpeed / frequency;
    // Set frequency to 2.0Hz and wave speed to 100px/s => wavelength should be 50px
    if (Math.abs(frequency - 2.0) < 0.1 && Math.abs(waveSpeed - 100) < 5) {
      setWavelengthGoal(true);
      if (onEarnXP) {
        onEarnXP(50, "Tính toán và quan sát thành công bước sóng chuẩn λ = v/f = 50px");
      }
    } else {
      alert("Gợi ý: Đặt Tần số sóng f = 2.0Hz và Tốc độ truyền v = 100 px/s để tìm bước sóng λ = 50px!");
    }
  };

  const verifyStandingWave = () => {
    if (waveMode === "standing") {
      setStandingWaveGoal(true);
      if (onEarnXP) {
        onEarnXP(50, "Kích hoạt chế độ Sóng dừng và quan sát các nút sóng (đỏ) cố định, bụng sóng (hồng) dao động mạnh");
      }
    } else {
      alert("Gợi ý: Nhấp chọn chế độ 'Sóng Dừng' để kiểm tra!");
    }
  };

  const captureD3WaveSnapshot = () => {
    const svgEl = mainSvgRef.current;
    if (svgEl && onTakeSnapshot) {
      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(svgEl);
      
      svgString = svgString.replace(/<svg[^>]*>/, `$&<style>text { font-family: monospace; font-weight: bold; }</style>`);
      
      const svg64 = btoa(unescape(encodeURIComponent(svgString)));
      const imgUrl = `data:image/svg+xml;base64,${svg64}`;
      
      onTakeSnapshot(
        "wave",
        "D3 Truyền Sóng Cơ Học - Dao Động Sóng",
        [
          { label: "Tần số (f)", value: `${frequency} Hz` },
          { label: "Biên độ (A)", value: `${amplitude} px` },
          { label: "Vận tốc truyền (v)", value: `${waveSpeed} px/s` },
          { label: "Hao hụt (damping)", value: `${damping}` },
          { label: "Bước sóng (λ)", value: `${(waveSpeed / frequency).toFixed(1)} px` },
          { label: "Loại sóng", value: waveMode === "transverse" ? "Sóng Ngang" : waveMode === "longitudinal" ? "Sóng Dọc" : "Sóng Dừng" }
        ],
        imgUrl
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Parameters Sidebar */}
      <div className="lg:col-span-5 bg-slate-950/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2.5">
            <Sliders className="text-cyan-400 h-4 w-4 animate-pulse" />
            <h4 className="text-xs font-black text-slate-100 uppercase tracking-wider">Thông Số Truyền Sóng</h4>
          </div>

          {/* Wave Mode Select */}
          <div>
            <span className="text-xs font-mono text-slate-400 block mb-1.5">Loại sóng cơ học</span>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[10px] font-bold">
              <button
                onClick={() => setWaveMode("transverse")}
                className={`py-1.5 rounded-lg border transition-all ${
                  waveMode === "transverse"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                Sóng Ngang
              </button>
              <button
                onClick={() => setWaveMode("longitudinal")}
                className={`py-1.5 rounded-lg border transition-all ${
                  waveMode === "longitudinal"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                Sóng Dọc
              </button>
              <button
                onClick={() => setWaveMode("standing")}
                className={`py-1.5 rounded-lg border transition-all ${
                  waveMode === "standing"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                Sóng Dừng
              </button>
            </div>
          </div>

          {/* Frequency */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Tần số sóng (f)</span>
              <span className="text-cyan-400 font-bold">{frequency.toFixed(1)} Hz</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Amplitude */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Biên độ dao động (A)</span>
              <span className="text-cyan-400 font-bold">{amplitude} px</span>
            </div>
            <input
              type="range"
              min="10"
              max="45"
              step="1"
              value={amplitude}
              onChange={(e) => setAmplitude(parseInt(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Wave Speed */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Tốc độ truyền sóng (v)</span>
              <span className="text-cyan-400 font-bold">{waveSpeed} px/s</span>
            </div>
            <input
              type="range"
              min="80"
              max="200"
              step="5"
              value={waveSpeed}
              onChange={(e) => setWaveSpeed(parseInt(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Damping */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Sự hấp thụ môi trường (damping)</span>
              <span className="text-cyan-400 font-bold">{(damping * 1000).toFixed(1)}‰</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.012"
              step="0.001"
              value={damping}
              onChange={(e) => setDamping(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Analytical summary */}
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-slate-300">
            <span className="text-[9px] text-slate-500 block uppercase tracking-wider font-semibold">Thông số dải truyền</span>
            <div className="text-[10.5px] font-mono leading-relaxed space-y-1">
              <div className="flex justify-between">
                <span>Chu kỳ dao động:</span>
                <span className="text-amber-400 font-bold">T = {(1 / frequency).toFixed(2)} s</span>
              </div>
              <div className="flex justify-between border-t border-slate-800/50 pt-1 mt-1">
                <span>Bước sóng (λ = v/f):</span>
                <span className="text-amber-400 font-bold">λ = {wavelength.toFixed(1)} px</span>
              </div>
              {waveMode === "standing" && (
                <div className="text-[9.5px] text-pink-400 font-semibold border-t border-slate-800/50 pt-1 mt-1">
                  Đỏ: Nút (Biên độ = 0) | Hồng: Bụng (Biên độ cực đại)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isRunning
                ? "bg-slate-800 text-red-400 border border-red-500/20 hover:bg-slate-800/80"
                : "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-lg shadow-cyan-400/20"
            }`}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isRunning ? "Tạm Dừng" : "Bắt Đầu"}
          </button>
          <button
            onClick={captureD3WaveSnapshot}
            className="p-2 bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <Camera className="h-4 w-4" />
            <span>Chụp</span>
          </button>
        </div>
      </div>

      {/* Main D3 Workspace area */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        {/* SVG Screen container */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between h-[280px] relative overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Trực quan sóng cơ (D3 particles)</span>
            <div className="text-[9.5px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono text-cyan-400">
              λ = {wavelength.toFixed(1)}px
            </div>
          </div>
          <div className="relative flex justify-center h-[230px]">
            <svg ref={mainSvgRef} width="560" height="240" className="max-w-full overflow-visible" />
          </div>
        </div>

        {/* Challenge Box */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800/40 pb-2">
            <Award className="text-amber-400 h-4 w-4" />
            <h5 className="text-[11px] font-black uppercase text-slate-200 tracking-wider">Nhiệm Vụ Học Tập Thực Hành (+100 XP)</h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Task 1 */}
            <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-[11px]">• Đo bước sóng λ = 50px</span>
                  {wavelengthGoal ? (
                    <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-0.5">
                      <CheckCircle2 className="h-3 w-3" /> Hoàn thành
                    </span>
                  ) : (
                    <span className="text-amber-400 font-bold text-[9px] bg-amber-500/10 px-1 py-0.5 rounded">Thực hiện</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Điều chỉnh tần số sóng <strong className="text-cyan-400">f = 2.0 Hz</strong> và tốc độ truyền <strong className="text-cyan-400">v = 100 px/s</strong>. Xác thực bước sóng của hạt.
                </p>
              </div>
              <button
                onClick={verifyWavelength}
                disabled={wavelengthGoal}
                className="mt-3 w-full py-1.5 bg-cyan-600/85 hover:bg-cyan-600 text-white font-bold text-[10px] rounded-lg transition-colors disabled:opacity-50"
              >
                Kiểm tra bước sóng
              </button>
            </div>

            {/* Task 2 */}
            <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-[11px]">• Thí nghiệm Sóng Dừng</span>
                  {standingWaveGoal ? (
                    <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-0.5">
                      <CheckCircle2 className="h-3 w-3" /> Hoàn thành
                    </span>
                  ) : (
                    <span className="text-amber-400 font-bold text-[9px] bg-amber-500/10 px-1 py-0.5 rounded">Thực hiện</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Bấm chọn chế độ <strong className="text-pink-400">Sóng Dừng</strong> để quan sát phản xạ tạo sóng giao thoa với các điểm nút không dao động.
                </p>
              </div>
              <button
                onClick={verifyStandingWave}
                disabled={standingWaveGoal}
                className="mt-3 w-full py-1.5 bg-pink-600/80 hover:bg-pink-600 text-white font-bold text-[10px] rounded-lg transition-colors disabled:opacity-50"
              >
                Kích hoạt sóng dừng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 3. GEOMETRIC OPTICS SIMULATION (QUANG HÌNH HỌC THẤU KÍNH D3)
// ---------------------------------------------------------------------
function OpticsSimulationD3({ onEarnXP, onTakeSnapshot }: SimulationGalleryProps) {
  const [lensType, setLensType] = useState<"convex" | "concave">("convex"); // Hội tụ / Phân kỳ
  const [focalLength, setFocalLength] = useState<number>(80); // f (px) convex positive, concave will map to negative
  const [objectDistance, setObjectDistance] = useState<number>(120); // d (px)
  const [objectHeight, setObjectHeight] = useState<number>(50); // h (px)

  // Learning Goals
  const [realImageGoal, setRealImageGoal] = useState<boolean>(false);
  const [virtualImageGoal, setVirtualImageGoal] = useState<boolean>(false);

  const mainSvgRef = useRef<SVGSVGElement | null>(null);

  // Optical Equations
  // f is positive for convex, negative for concave
  const f_val = lensType === "convex" ? focalLength : -focalLength;
  const d_val = objectDistance;
  
  // Lens equation: 1/f = 1/d + 1/d' => d' = d*f / (d-f)
  let d_prime = 0;
  let isInfinity = false;
  
  if (Math.abs(d_val - f_val) < 1) {
    isInfinity = true;
  } else {
    d_prime = (d_val * f_val) / (d_val - f_val);
  }

  // Magnification: k = -d' / d
  const k = isInfinity ? 0 : -d_prime / d_val;
  const h_prime = isInfinity ? 0 : k * objectHeight;

  useEffect(() => {
    const svgEl = mainSvgRef.current;
    if (!svgEl) return;

    const svg = d3.select(svgEl);
    const width = 560;
    const height = 240;
    svg.selectAll("*").remove();

    const originX = width / 2; // Lens is placed in center (x = 280)
    const axisY = height / 2;   // Optical axis (y = 120)

    // Draw reference grids
    const grid = svg.append("g").attr("class", "optics-grid").attr("opacity", 0.1);
    for (let x = 40; x < width; x += 40) {
      grid.append("line").attr("x1", x).attr("y1", 10).attr("x2", x).attr("y2", height - 10).attr("stroke", "#94a3b8");
    }
    for (let y = 20; y < height; y += 20) {
      grid.append("line").attr("x1", 10).attr("y1", y).attr("x2", width - 10).attr("y2", y).attr("stroke", "#94a3b8");
    }

    // MAIN OPTICAL AXIS (TRỤC CHÍNH)
    svg.append("line")
      .attr("x1", 20)
      .attr("y1", axisY)
      .attr("x2", width - 20)
      .attr("y2", axisY)
      .attr("stroke", "#94a3b8")
      .attr("stroke-width", 2);

    svg.append("text")
      .attr("x", width - 15)
      .attr("y", axisY - 5)
      .attr("fill", "#64748b")
      .attr("font-size", "9px")
      .attr("font-family", "monospace")
      .attr("text-anchor", "end")
      .text("x");

    // FOCAL POINTS
    const fx = originX - f_val;  // left focal point (F for convex, F' for concave)
    const fPrimeX = originX + f_val; // right focal point (F' for convex, F for concave)

    // F focus left
    svg.append("circle")
      .attr("cx", originX - focalLength)
      .attr("cy", axisY)
      .attr("r", 3.5)
      .attr("fill", "#f59e0b");
    svg.append("text")
      .attr("x", originX - focalLength)
      .attr("y", axisY + 15)
      .attr("fill", "#f59e0b")
      .attr("font-size", "10px")
      .attr("font-family", "monospace")
      .attr("text-anchor", "middle")
      .text(lensType === "convex" ? "F" : "F'");

    // F' focus right
    svg.append("circle")
      .attr("cx", originX + focalLength)
      .attr("cy", axisY)
      .attr("r", 3.5)
      .attr("fill", "#f59e0b");
    svg.append("text")
      .attr("x", originX + focalLength)
      .attr("y", axisY + 15)
      .attr("fill", "#f59e0b")
      .attr("font-size", "10px")
      .attr("font-family", "monospace")
      .attr("text-anchor", "middle")
      .text(lensType === "convex" ? "F'" : "F");

    // LENS VECTOR DRAWING
    const gLens = svg.append("g").attr("class", "lens");
    gLens.append("line")
      .attr("x1", originX)
      .attr("y1", 20)
      .attr("x2", originX)
      .attr("y2", height - 20)
      .attr("stroke", "#a7f3d0")
      .attr("stroke-width", 2.5);

    // Lens arrows indicating Convex/Concave
    if (lensType === "convex") {
      // Outward pointing arrows
      gLens.append("polygon").attr("points", `${originX},12 ${originX-5},20 ${originX+5},20`).attr("fill", "#a7f3d0");
      gLens.append("polygon").attr("points", `${originX},${height-12} ${originX-5},${height-20} ${originX+5},${height-20}`).attr("fill", "#a7f3d0");
    } else {
      // Inward pointing arrows
      gLens.append("polygon").attr("points", `${originX},20 ${originX-5},12 ${originX+5},12`).attr("fill", "#a7f3d0");
      gLens.append("polygon").attr("points", `${originX},${height-20} ${originX-5},${height-28} ${originX+5},${height-28}`).attr("fill", "#a7f3d0");
    }

    svg.append("text")
      .attr("x", originX + 6)
      .attr("y", 30)
      .attr("fill", "#a7f3d0")
      .attr("font-size", "10px")
      .attr("font-family", "monospace")
      .text("O");

    // D3 dragging for the object tip
    const dragObject = d3.drag<SVGGElement, unknown>()
      .on("drag", (event) => {
        const [mx, my] = d3.pointer(event, svgEl);
        // Calculate d = distance to lens
        const newD = originX - mx;
        const newH = axisY - my;

        // Clamps
        setObjectDistance(Math.max(15, Math.min(260, Math.round(newD))));
        setObjectHeight(Math.max(10, Math.min(90, Math.round(newH))));
      });

    // OBJECT DRAW (AB)
    const objX = originX - d_val;
    const objY = axisY - objectHeight;

    const gObject = svg.append("g")
      .attr("class", "object-node")
      .attr("cursor", "ew-resize")
      .call(dragObject);

    // AB line
    gObject.append("line")
      .attr("x1", objX)
      .attr("y1", axisY)
      .attr("x2", objX)
      .attr("y2", objY)
      .attr("stroke", "#38bdf8") // Cyan-400
      .attr("stroke-width", 3);

    // Arrowhead at B
    gObject.append("polygon")
      .attr("points", `${objX},${objY} ${objX-4.5},${objY+8} ${objX+4.5},${objY+8}`)
      .attr("fill", "#38bdf8");

    // Text labels
    gObject.append("text")
      .attr("x", objX - 10)
      .attr("y", axisY + 12)
      .attr("fill", "#38bdf8")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .text("A");

    gObject.append("text")
      .attr("x", objX - 10)
      .attr("y", objY - 4)
      .attr("fill", "#38bdf8")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .text("B");

    // IMAGE DRAW (A'B') - Glowing real image or dashed virtual image
    if (!isInfinity && d_prime !== 0) {
      const imgX = originX + d_prime;
      const imgY = axisY - h_prime;

      const isReal = d_prime > 0;

      const gImage = svg.append("g").attr("class", "image-node");

      // A'B' line
      gImage.append("line")
        .attr("x1", imgX)
        .attr("y1", axisY)
        .attr("x2", imgX)
        .attr("y2", imgY)
        .attr("stroke", isReal ? "#10b981" : "#ec4899") // Emerald real, Magenta virtual
        .attr("stroke-width", 2.5)
        .attr("stroke-dasharray", isReal ? "none" : "4,3");

      // Arrow head at B'
      const arrowDir = h_prime >= 0 ? -1 : 1; // pointing up or down
      gImage.append("polygon")
        .attr("points", `${imgX},${imgY} ${imgX-4},${imgY - arrowDir*8} ${imgX+4},${imgY - arrowDir*8}`)
        .attr("fill", isReal ? "#10b981" : "#ec4899");

      // Labels
      gImage.append("text")
        .attr("x", imgX + 8)
        .attr("y", axisY + 12)
        .attr("fill", isReal ? "#10b981" : "#ec4899")
        .attr("font-size", "9.5px")
        .attr("font-weight", "bold")
        .text("A'");

      gImage.append("text")
        .attr("x", imgX + 8)
        .attr("y", imgY - arrowDir * 4)
        .attr("fill", isReal ? "#10b981" : "#ec4899")
        .attr("font-size", "9.5px")
        .attr("font-weight", "bold")
        .text("B'");

      // RAYS RAY-TRACING PATHS
      const gRays = svg.append("g").attr("class", "rays").attr("opacity", 0.7);

      // Ray 1: Parallel ray -> intersection with lens at (originX, objY) -> focal point F' on right
      // Ray path: B -> Lens(originX, objY) -> F' -> image point B'
      const lensIntersectY = objY;
      
      // Draw ray from B to Lens
      gRays.append("line")
        .attr("x1", objX)
        .attr("y1", objY)
        .attr("x2", originX)
        .attr("y2", lensIntersectY)
        .attr("stroke", "#f43f5e") // Red line
        .attr("stroke-width", 1.5);

      // Refracted ray outgoing
      // For convex, goes through F'(originX + f, axisY). Direction vector from (originX, lensIntersectY) to (originX + f, axisY)
      const refEndX = width - 20;
      let refEndY = axisY;
      
      if (lensType === "convex") {
        // ref ray passes through focal point F'
        const slope = (axisY - lensIntersectY) / focalLength;
        refEndY = lensIntersectY + slope * (refEndX - originX);
      } else {
        // Concave: diverges away from F' (on the left side at originX - focalLength)
        const slope = (lensIntersectY - axisY) / focalLength;
        refEndY = lensIntersectY + slope * (refEndX - originX);
      }

      gRays.append("line")
        .attr("x1", originX)
        .attr("y1", lensIntersectY)
        .attr("x2", refEndX)
        .attr("y2", refEndY)
        .attr("stroke", "#f43f5e")
        .attr("stroke-width", 1.5);

      // If virtual, draw dashed retro-extensions to B'
      if (!isReal) {
        gRays.append("line")
          .attr("x1", originX)
          .attr("y1", lensIntersectY)
          .attr("x2", imgX)
          .attr("y2", imgY)
          .attr("stroke", "#f43f5e")
          .attr("stroke-width", 1.2)
          .attr("stroke-dasharray", "3,3");
      }

      // Ray 2: Central ray passing straight through optical center O (originX, axisY)
      gRays.append("line")
        .attr("x1", objX)
        .attr("y1", objY)
        .attr("x2", refEndX)
        .attr("y2", axisY + ((axisY - objY) / d_val) * (refEndX - originX))
        .attr("stroke", "#fbbf24") // Gold line
        .attr("stroke-width", 1.5);

      if (!isReal) {
        gRays.append("line")
          .attr("x1", originX)
          .attr("y1", axisY)
          .attr("x2", imgX)
          .attr("y2", imgY)
          .attr("stroke", "#fbbf24")
          .attr("stroke-width", 1.2)
          .attr("stroke-dasharray", "3,3");
      }
    } else {
      // Parallel image, rays go parallel
      svg.append("text")
        .attr("x", originX + 100)
        .attr("y", axisY - 30)
        .attr("fill", "#64748b")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .text("Ảnh ở vô cực (Parallel rays)");
    }

  }, [lensType, focalLength, objectDistance, objectHeight, d_prime, h_prime, isInfinity, f_val]);

  const verifyRealImage = () => {
    if (lensType === "convex" && d_val > focalLength && d_prime > 0) {
      setRealImageGoal(true);
      if (onEarnXP) {
        onEarnXP(50, "Quan sát thành công Ảnh thật ngược chiều của thấu kính hội tụ khi d > f");
      }
    } else {
      alert("Gợi ý: Chọn Thấu kính hội tụ và di chuyển khoảng cách vật d lớn hơn tiêu cự f (d > 80px) để tạo ảnh thật!");
    }
  };

  const verifyVirtualImage = () => {
    // Convex with d < f or Concave
    const isVirtualConvex = lensType === "convex" && d_val < focalLength;
    const isConcave = lensType === "concave";
    if (isVirtualConvex || isConcave) {
      setVirtualImageGoal(true);
      if (onEarnXP) {
        onEarnXP(50, "Quan sát và nghiên cứu Ảnh ảo cùng chiều qua hệ quang học thấu kính D3");
      }
    } else {
      alert("Gợi ý: Chọn Thấu kính phân kỳ HOẶC kéo vật lại gần kính d < f (d < 80px) đối với thấu kính hội tụ!");
    }
  };

  const captureD3OpticsSnapshot = () => {
    const svgEl = mainSvgRef.current;
    if (svgEl && onTakeSnapshot) {
      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(svgEl);
      
      svgString = svgString.replace(/<svg[^>]*>/, `$&<style>text { font-family: monospace; font-weight: bold; }</style>`);
      
      const svg64 = btoa(unescape(encodeURIComponent(svgString)));
      const imgUrl = `data:image/svg+xml;base64,${svg64}`;
      
      onTakeSnapshot(
        "optics",
        "D3 Quang Hình Học - Phóng Đại Thấu Kính",
        [
          { label: "Tiêu cự (f)", value: `${f_val} px` },
          { label: "Vị trí vật (d)", value: `${d_val} px` },
          { label: "Chiều cao vật (h)", value: `${objectHeight} px` },
          { label: "Vị trí ảnh (d')", value: isInfinity ? "∞" : `${d_prime.toFixed(1)} px` },
          { label: "Hệ số phóng đại (k)", value: isInfinity ? "∞" : `${k.toFixed(2)}` },
          { label: "Tính chất ảnh", value: isInfinity ? "Ảnh ở vô cực" : d_prime > 0 ? "Ảnh Thật, ngược chiều" : "Ảnh Ảo, cùng chiều" }
        ],
        imgUrl
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Parameters Sidebar */}
      <div className="lg:col-span-5 bg-slate-950/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2.5">
            <Sliders className="text-emerald-400 h-4 w-4 animate-pulse" />
            <h4 className="text-xs font-black text-slate-100 uppercase tracking-wider">Thông Số Quang Học</h4>
          </div>

          {/* Lens Type */}
          <div>
            <span className="text-xs font-mono text-slate-400 block mb-1.5">Loại thấu kính mỏng</span>
            <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[10px] font-bold">
              <button
                onClick={() => setLensType("convex")}
                className={`py-1.5 rounded-lg border transition-all ${
                  lensType === "convex"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                Hội Tụ (Convex f &gt; 0)
              </button>
              <button
                onClick={() => setLensType("concave")}
                className={`py-1.5 rounded-lg border transition-all ${
                  lensType === "concave"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                Phân Kỳ (Concave f &lt; 0)
              </button>
            </div>
          </div>

          {/* Focal Length */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Tiêu cự thấu kính (f)</span>
              <span className="text-emerald-400 font-bold">{focalLength} px</span>
            </div>
            <input
              type="range"
              min="40"
              max="120"
              step="5"
              value={focalLength}
              onChange={(e) => setFocalLength(parseInt(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Object Distance */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Khoảng cách vật sáng (d)</span>
              <span className="text-emerald-400 font-bold">{objectDistance} px</span>
            </div>
            <input
              type="range"
              min="20"
              max="250"
              step="5"
              value={objectDistance}
              onChange={(e) => setObjectDistance(parseInt(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Object Height */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Chiều cao vật sáng (h)</span>
              <span className="text-emerald-400 font-bold">{objectHeight} px</span>
            </div>
            <input
              type="range"
              min="15"
              max="80"
              step="5"
              value={objectHeight}
              onChange={(e) => setObjectHeight(parseInt(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Analytical summary card */}
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-slate-300">
            <span className="text-[9px] text-slate-500 block uppercase tracking-wider font-semibold">Báo cáo quang hình toán học</span>
            <div className="text-[10.5px] font-mono leading-relaxed space-y-1">
              <div className="flex justify-between">
                <span>Vị trí vật (d):</span>
                <span className="text-cyan-400 font-bold">{d_val} px</span>
              </div>
              <div className="flex justify-between border-t border-slate-800/50 pt-1 mt-1">
                <span>Vị trí ảnh (d'):</span>
                <span className="text-cyan-400 font-bold">
                  {isInfinity ? "Vô cực (∞)" : `${d_prime.toFixed(1)} px`}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-800/50 pt-1 mt-1">
                <span>Hệ số phóng đại (k):</span>
                <span className="text-amber-400 font-bold">
                  {isInfinity ? "∞" : `k = ${k.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-800/50 pt-1 mt-1">
                <span>Tính chất của ảnh:</span>
                <span className="text-emerald-400 font-bold text-[9.5px]">
                  {isInfinity ? "Tia ló song song" : d_prime > 0 ? "ẢNH THẬT, NGƯỢC CHIỀU" : "ẢNH ẢO, CÙNG CHIỀU"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={captureD3OpticsSnapshot}
          className="w-full py-2.5 bg-slate-900 border border-emerald-500/35 text-emerald-400 hover:text-emerald-300 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-xs font-bold"
        >
          <Camera className="h-4 w-4" />
          <span>Chụp Báo Cáo Quang Học</span>
        </button>
      </div>

      {/* Main D3 optics viewport */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        {/* SVG Display Canvas */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between h-[280px] relative overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quang đồ tia sáng mỏng D3 (Kéo đỉnh vật B)</span>
            <div className="text-[9.5px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono text-emerald-400">
              d' = {isInfinity ? "∞" : d_prime.toFixed(1)}px
            </div>
          </div>
          <div className="relative flex justify-center h-[230px]">
            <svg ref={mainSvgRef} width="560" height="240" className="max-w-full overflow-visible" />
          </div>
        </div>

        {/* Challenge Box */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800/40 pb-2">
            <Award className="text-amber-400 h-4 w-4" />
            <h5 className="text-[11px] font-black uppercase text-slate-200 tracking-wider">Nhiệm Vụ Học Tập Thực Hành (+100 XP)</h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Task 1 */}
            <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-[11px]">• Tạo Ảnh Thật thấu kính</span>
                  {realImageGoal ? (
                    <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-0.5">
                      <CheckCircle2 className="h-3 w-3" /> Hoàn thành
                    </span>
                  ) : (
                    <span className="text-amber-400 font-bold text-[9px] bg-amber-500/10 px-1 py-0.5 rounded">Thực hiện</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Chọn thấu kính hội tụ, điều chỉnh khoảng cách vật <strong className="text-emerald-400">d &gt; f</strong> (vd d = 120px) để xem ảnh thật (màu xanh lá) lật ngược phía sau thấu kính.
                </p>
              </div>
              <button
                onClick={verifyRealImage}
                disabled={realImageGoal}
                className="mt-3 w-full py-1.5 bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold text-[10px] rounded-lg transition-colors disabled:opacity-50"
              >
                Xác thực ảnh thật
              </button>
            </div>

            {/* Task 2 */}
            <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-[11px]">• Nghiên cứu Ảnh Ảo</span>
                  {virtualImageGoal ? (
                    <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-0.5">
                      <CheckCircle2 className="h-3 w-3" /> Hoàn thành
                    </span>
                  ) : (
                    <span className="text-amber-400 font-bold text-[9px] bg-amber-500/10 px-1 py-0.5 rounded">Thực hiện</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Điều chỉnh thấu kính để có ảnh ảo (vd dùng kính phân kỳ, hoặc kéo vật d &lt; f đối với kính hội tụ) để xem ảnh cùng chiều (màu hồng nét đứt).
                </p>
              </div>
              <button
                onClick={verifyVirtualImage}
                disabled={virtualImageGoal}
                className="mt-3 w-full py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white font-bold text-[10px] rounded-lg transition-colors disabled:opacity-50"
              >
                Xác thực ảnh ảo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
