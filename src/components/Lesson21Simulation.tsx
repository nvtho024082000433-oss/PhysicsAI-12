import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Compass, 
  Atom, 
  Activity, 
  Gauge, 
  Sliders,
  CheckCircle,
  Eye,
  EyeOff,
  Plus,
  Minus,
  Trash2,
  Info
} from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface Particle {
  x: number;
  y: number;
  type: "alpha" | "beta" | "gamma";
  vx: number;
  vy: number;
  color: string;
  charge: number;
  mass: number;
  history: { x: number; y: number }[];
  active: boolean;
  impactParameter?: number;
}

interface Nucleon {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "proton" | "neutron";
}

export function getElementInfo(z: number, n: number) {
  const elements: Record<number, { name: string, symbol: string }> = {
    0: { name: "Neutron tự do", symbol: "n" },
    1: { name: "Hydro", symbol: "H" },
    2: { name: "Heli", symbol: "He" },
    3: { name: "Liti", symbol: "Li" },
    4: { name: "Beri", symbol: "Be" },
    5: { name: "Bo", symbol: "B" },
    6: { name: "Cacbon", symbol: "C" },
    7: { name: "Nitơ", symbol: "N" },
    8: { name: "Oxi", symbol: "O" },
    9: { name: "Flo", symbol: "F" },
    10: { name: "Neon", symbol: "Ne" },
    11: { name: "Natri", symbol: "Na" },
    12: { name: "Magie", symbol: "Mg" },
    13: { name: "Nhôm", symbol: "Al" },
    14: { name: "Silic", symbol: "Si" },
    15: { name: "Photpho", symbol: "P" },
    16: { name: "Lưu huỳnh", symbol: "S" },
    17: { name: "Clo", symbol: "Cl" },
    18: { name: "Argon", symbol: "Ar" },
    19: { name: "Kali", symbol: "K" },
    20: { name: "Canxi", symbol: "Ca" },
    21: { name: "Scandi", symbol: "Sc" },
    22: { name: "Titan", symbol: "Ti" },
    23: { name: "Vandai", symbol: "V" },
    24: { name: "Crom", symbol: "Cr" },
    25: { name: "Mangan", symbol: "Mn" },
    26: { name: "Sắt", symbol: "Fe" },
    27: { name: "Coban", symbol: "Co" },
    28: { name: "Niken", symbol: "Ni" },
    29: { name: "Đồng", symbol: "Cu" },
    30: { name: "Kẽm", symbol: "Zn" },
  };

  const info = elements[z] || { name: `Nguyên tố Z=${z}`, symbol: "X" };
  const A = z + n;
  
  let stability = "Không xác định";
  let stabilityColor = "text-slate-500 bg-slate-100 border-slate-200";
  let explanation = "";

  if (z === 0) {
    stability = "Không bền (Phân rã bán rã 10 phút)";
    stabilityColor = "text-rose-700 bg-rose-50 border-rose-200";
    explanation = "Neutron tự do không nằm trong hạt nhân sẽ phóng xạ beta trừ để biến đổi thành proton với chu kỳ bán rã khoảng 10.2 phút.";
  } else if (z === 1 && n === 0) {
    stability = "Bền vững (99.98%)";
    stabilityColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
    explanation = "Hạt nhân Protium là dạng đơn giản nhất của vật chất, bền vững tuyệt đối vì không có tương tác đẩy Coulomb giữa các proton.";
  } else if (z === 1 && n === 1) {
    stability = "Bền vững (0.015%)";
    stabilityColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
    explanation = "Đồng vị Deuterium bền vững, một neutron bổ sung giúp tạo ra liên kết lực hạt nhân mạnh mà không chịu lực đẩy Coulomb.";
  } else if (z === 1 && n === 2) {
    stability = "Phóng xạ (Chu kỳ 12.3 năm)";
    stabilityColor = "text-amber-700 bg-amber-50 border-amber-200";
    explanation = "Đồng vị Tritium có quá nhiều neutron so với 1 proton. Nó sẽ phân rã phóng xạ beta trừ tạo thành Heli-3 bền vững.";
  } else {
    const ratio = z > 0 ? n / z : 0;
    
    const stableIsotopes: Record<number, number[]> = {
      2: [1, 2],
      3: [3, 4],
      4: [5],
      5: [5, 6],
      6: [6, 7],
      7: [7, 8],
      8: [8, 9, 10],
      9: [10],
      10: [10, 11, 12],
      11: [12],
      12: [12, 13, 14],
      13: [14],
      14: [14, 15, 16],
      15: [16],
      16: [16, 17, 18, 20],
      17: [18, 20],
      18: [18, 20, 22],
      19: [20, 22],
      20: [20, 22, 23, 24, 26, 28],
      26: [28, 30, 31, 32],
      29: [34, 36],
    };

    const isStable = stableIsotopes[z]?.includes(n);
    
    if (isStable) {
      stability = "Hạt nhân Bền vững";
      stabilityColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
      explanation = `Hạt nhân ${info.symbol}-${A} bền vững. Lực hạt nhân mạnh hấp dẫn giữa các nucleon thắng thế hoàn toàn lực đẩy tĩnh điện Coulomb giữa các proton mang điện dương (+).`;
    } else {
      stability = "Không bền (Phóng xạ)";
      stabilityColor = "text-rose-700 bg-rose-50 border-rose-200";
      if (ratio < 1.0 && z > 2) {
        explanation = `Thừa Proton! Tỷ số N/Z = ${ratio.toFixed(2)} quá thấp. Lực đẩy Coulomb giữa các proton quá mạnh so với lực hạt nhân mạnh, khiến hạt nhân không thể liên kết chặt chẽ và dễ phân rã phóng xạ.`;
      } else if (ratio > 1.6) {
        explanation = `Thừa Neutron! Tỷ số N/Z = ${ratio.toFixed(2)} quá cao. Lực hạt nhân mạnh hấp dẫn không đủ bù đắp tính kém bền của việc thừa neutron, hạt nhân có xu hướng phân rã Beta trừ (β-).`;
      } else {
        explanation = `Cấu hình số proton (${z}) và neutron (${n}) không nằm trong dải ổn định. Hạt nhân này không bền vững và sẽ phóng xạ tự phát để biến đổi thành hạt nhân khác bền hơn.`;
      }
    }
  }

  return {
    ...info,
    A,
    stability,
    stabilityColor,
    explanation
  };
}

export function Lesson21Simulation() {
  const [activeTab, setActiveTab] = useState<"structure" | "deflection" | "scattering" | "practice">("structure");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
  // Tab 0 (Nuclear Structure) State
  const [protonCount, setProtonCount] = useState<number>(6); 
  const [neutronCount, setNeutronCount] = useState<number>(6);
  const [selectedStructurePreset, setSelectedStructurePreset] = useState<string>("C12");

  // Tab 1 (Magnetic Deflection) State
  const [magneticField, setMagneticField] = useState<number>(1.2); // Tesla
  const [particleSpeed, setParticleSpeed] = useState<number>(3.0); 
  const [showAlpha, setShowAlpha] = useState<boolean>(true);
  const [showBeta, setShowBeta] = useState<boolean>(true);
  const [showGamma, setShowGamma] = useState<boolean>(true);

  // Tab 2 (Rutherford Scattering) State
  const [impactParameter, setImpactParameter] = useState<number>(35); // offset from center
  const [alphaEnergy, setAlphaEnergy] = useState<number>(5.0); // MeV
  const [nucleusZ, setNucleusZ] = useState<number>(79); // Gold (79)
  const [continuousStream, setContinuousStream] = useState<boolean>(true);

  // Tab 3 (Interactive Practice Questions State)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nucleonsRef = useRef<Nucleon[]>([]);
  const animationFrameId = useRef<number | null>(null);
  
  // Track continuous emission timer
  const emissionTimer = useRef<number>(0);

  // Initialize nucleons for nuclear structure simulation
  const initNucleons = (pCount: number, nCount: number) => {
    const width = canvasRef.current?.width || 520;
    const height = canvasRef.current?.height || 360;
    const centerX = width / 2;
    const centerY = height / 2;
    
    const existing = nucleonsRef.current;
    const existingProtons = existing.filter(n => n.type === "proton");
    const existingNeutrons = existing.filter(n => n.type === "neutron");
    
    let newNucleons: Nucleon[] = [];
    
    // Adjust protons
    if (existingProtons.length < pCount) {
      const toAdd = pCount - existingProtons.length;
      for (let i = 0; i < toAdd; i++) {
        existingProtons.push({
          id: `proton-${Math.random().toString(36).substr(2, 9)}`,
          x: centerX + (Math.random() - 0.5) * 110,
          y: centerY + (Math.random() - 0.5) * 110,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          type: "proton"
        });
      }
    } else if (existingProtons.length > pCount) {
      existingProtons.splice(pCount);
    }
    
    // Adjust neutrons
    if (existingNeutrons.length < nCount) {
      const toAdd = nCount - existingNeutrons.length;
      for (let i = 0; i < toAdd; i++) {
        existingNeutrons.push({
          id: `neutron-${Math.random().toString(36).substr(2, 9)}`,
          x: centerX + (Math.random() - 0.5) * 110,
          y: centerY + (Math.random() - 0.5) * 110,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          type: "neutron"
        });
      }
    } else if (existingNeutrons.length > nCount) {
      existingNeutrons.splice(nCount);
    }
    
    newNucleons = [...existingProtons, ...existingNeutrons];
    
    // Shuffling elements with sorting helper is safe and provides neat color patterns
    newNucleons.sort(() => Math.random() - 0.5);
    nucleonsRef.current = newNucleons;
  };

  // Sync nucleons when protonCount or neutronCount changes
  useEffect(() => {
    initNucleons(protonCount, neutronCount);
  }, [protonCount, neutronCount]);

  // Handle Preset Change
  const handlePresetChange = (preset: string) => {
    setSelectedStructurePreset(preset);
    switch (preset) {
      case "He4":
        setProtonCount(2);
        setNeutronCount(2);
        break;
      case "C12":
        setProtonCount(6);
        setNeutronCount(6);
        break;
      case "O16":
        setProtonCount(8);
        setNeutronCount(8);
        break;
      case "Na23":
        setProtonCount(11);
        setNeutronCount(12);
        break;
      case "Fe56":
        setProtonCount(26);
        setNeutronCount(30);
        break;
      case "Cu63":
        setProtonCount(29);
        setNeutronCount(34);
        break;
      default:
        break;
    }
  };

  const handleProtonChange = (val: number) => {
    setProtonCount(val);
    setSelectedStructurePreset("custom");
  };

  const handleNeutronChange = (val: number) => {
    setNeutronCount(val);
    setSelectedStructurePreset("custom");
  };

  // Initialize particles
  const initDeflectionParticles = () => {
    particlesRef.current = [];
  };

  // Add a new set of particles
  const emitParticles = () => {
    const width = canvasRef.current?.width || 520;
    const height = canvasRef.current?.height || 360;
    
    // Bottom center of the deflection chamber
    const startX = width / 2;
    const startY = height - 40;
    
    const v0 = particleSpeed; 
    const newParticles: Particle[] = [];

    if (showAlpha) {
      newParticles.push({
        x: startX,
        y: startY,
        vx: 0,
        vy: -v0,
        type: "alpha",
        history: [],
        active: true,
        color: "#38bdf8", // Sky blue for alpha
        charge: 2,
        mass: 4.0
      });
    }

    if (showBeta) {
      newParticles.push({
        x: startX,
        y: startY,
        vx: 0,
        vy: -v0 * 1.5, 
        type: "beta",
        history: [],
        active: true,
        color: "#ef4444", // Red for beta
        charge: -1,
        mass: 0.05 
      });
    }

    if (showGamma) {
      newParticles.push({
        x: startX,
        y: startY,
        vx: 0,
        vy: -v0,
        type: "gamma",
        history: [],
        active: true,
        color: "#22c55e", // Green for gamma
        charge: 0,
        mass: 0.0
      });
    }

    particlesRef.current.push(...newParticles);
  };

  // Tab 2: Rutherford Scattering - Single particle firing
  const fireScatteringAlpha = (yOffset?: number) => {
    const height = canvasRef.current?.height || 360;
    const centerY = height / 2;
    const startX = 30;
    const startY = yOffset !== undefined ? yOffset : centerY - impactParameter;
    const v0 = Math.sqrt(alphaEnergy) * 1.8;

    particlesRef.current.push({
      x: startX,
      y: startY,
      vx: v0,
      vy: 0,
      type: "alpha",
      history: [],
      active: true,
      color: "#fbbf24", // Amber for alpha
      charge: 2,
      mass: 4.0,
      impactParameter: startY - centerY
    });
  };

  const handleReset = () => {
    initDeflectionParticles();
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localIsPlaying = isPlaying;

    const render = () => {
      // Clear Canvas with appropriate method
      if (activeTab === "structure") {
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        // Clear Canvas with subtle transparency for trails
        ctx.fillStyle = "rgba(15, 23, 42, 0.25)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (activeTab === "structure") {
        // --- MODE 0: NUCLEAR STRUCTURE ---
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Draw soft containment field/glowing core background
        const radGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 180);
        radGrad.addColorStop(0, "rgba(99, 102, 241, 0.08)");
        radGrad.addColorStop(0.5, "rgba(99, 102, 241, 0.03)");
        radGrad.addColorStop(1, "rgba(99, 102, 241, 0)");
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 180, 0, Math.PI * 2);
        ctx.fill();

        // Draw scale or grid lines
        ctx.strokeStyle = "rgba(148, 163, 184, 0.05)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
        ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
        ctx.stroke();

        const nucleons = nucleonsRef.current;
        const jitter = localIsPlaying ? 0.35 : 0;

        // 1. Double loop for nucleon-nucleon forces
        for (let i = 0; i < nucleons.length; i++) {
          const n1 = nucleons[i];
          let ax = 0;
          let ay = 0;

          for (let j = 0; j < nucleons.length; j++) {
            if (i === j) continue;
            const n2 = nucleons[j];
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
            
            const targetDist = 26; 
            
            if (dist < targetDist) {
              const overlap = targetDist - dist;
              const force = overlap * 0.45;
              ax -= (dx / dist) * force;
              ay -= (dy / dist) * force;
            } else if (dist < 75) {
              const force = (75 - dist) * 0.035;
              ax += (dx / dist) * force;
              ay += (dy / dist) * force;
            }

            if (n1.type === "proton" && n2.type === "proton") {
              const coulombForce = 4.5 / (dist * dist);
              ax -= (dx / dist) * coulombForce;
              ay -= (dy / dist) * coulombForce;
            }
          }

          const distToCenter = Math.sqrt((centerX - n1.x) ** 2 + (centerY - n1.y) ** 2) || 0.1;
          const gravityToCenter = distToCenter * 0.015;
          ax += ((centerX - n1.x) / distToCenter) * gravityToCenter;
          ay += ((centerY - n1.y) / distToCenter) * gravityToCenter;

          if (localIsPlaying) {
            n1.vx = (n1.vx + ax) * 0.82 + (Math.random() - 0.5) * jitter;
            n1.vy = (n1.vy + ay) * 0.82 + (Math.random() - 0.5) * jitter;
            
            n1.x += n1.vx;
            n1.y += n1.vy;
          }
        }

        const sortedNucleons = [...nucleons].sort((a, b) => (a.y + a.x * 0.2) - (b.y + b.x * 0.2));

        sortedNucleons.forEach((n) => {
          const radius = 13.5;
          
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius + 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
          ctx.fill();

          const sphereGrad = ctx.createRadialGradient(
            n.x - radius * 0.3,
            n.y - radius * 0.3,
            2,
            n.x,
            n.y,
            radius
          );

          if (n.type === "proton") {
            sphereGrad.addColorStop(0, "#fecaca");
            sphereGrad.addColorStop(0.2, "#ef4444");
            sphereGrad.addColorStop(1, "#991b1b");
          } else {
            sphereGrad.addColorStop(0, "#e2e8f0");
            sphereGrad.addColorStop(0.2, "#64748b");
            sphereGrad.addColorStop(1, "#334155");
          }

          ctx.fillStyle = sphereGrad;
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x - radius * 0.35, n.y - radius * 0.35, radius * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 11px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          if (n.type === "proton") {
            ctx.fillText("+", n.x, n.y);
          } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.fillText("n", n.x, n.y - 0.5);
          }
        });

        if (nucleons.length === 0) {
          ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
          ctx.font = "italic 13px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("Hãy thêm Proton hoặc Neutron để bắt đầu cấu tạo hạt nhân", centerX, centerY);
        }
      } else if (activeTab === "deflection") {
        // --- MODE 1: MAGNETIC DEFLECTION ---
        
        // Draw Magnetic field dots (inward) or crosses (outward)
        ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
        ctx.lineWidth = 1;
        const spacing = 40;
        for (let x = spacing / 2; x < canvas.width; x += spacing) {
          for (let y = spacing / 2; y < canvas.height - 40; y += spacing) {
            ctx.beginPath();
            if (magneticField > 0) {
              ctx.moveTo(x - 4, y - 4); ctx.lineTo(x + 4, y + 4);
              ctx.moveTo(x + 4, y - 4); ctx.lineTo(x - 4, y + 4);
            } else if (magneticField < 0) {
              ctx.arc(x, y, 3, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(148, 163, 184, 0.12)";
              ctx.fill();
            }
            ctx.stroke();
          }
        }

        // Draw radioactive source box (Lead Block)
        ctx.fillStyle = "#1e293b";
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 2;
        const leadBoxWidth = 50;
        const leadBoxHeight = 40;
        const boxX = canvas.width / 2 - leadBoxWidth / 2;
        const boxY = canvas.height - 40;
        ctx.fillRect(boxX, boxY, leadBoxWidth, leadBoxHeight);
        ctx.strokeRect(boxX, boxY, leadBoxWidth, leadBoxHeight);

        // Core lead container hole
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(canvas.width / 2 - 6, boxY, 12, 15);
        
        // Radioactive symbol in lead box
        ctx.beginPath();
        ctx.arc(canvas.width / 2, boxY + leadBoxHeight / 2 + 5, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#fbbf24";
        ctx.fill();

        // Emit continuous stream if playing
        if (localIsPlaying) {
          emissionTimer.current += 1;
          if (emissionTimer.current % 18 === 0) {
            emitParticles();
          }
        }

        // Physics Update for each particle
        particlesRef.current.forEach((p) => {
          if (!p.active) return;

          p.history.push({ x: p.x, y: p.y });
          if (p.history.length > 80) p.history.shift();

          if (localIsPlaying) {
            if (p.type !== "gamma") {
              const q = p.charge;
              const m = p.mass;
              const B = magneticField * 0.08; 

              // Lorentz force: Fx = q * vy * B, Fy = -q * vx * B
              const fx = q * p.vy * B;
              const fy = -q * p.vx * B;

              p.vx += fx / m;
              p.vy += fy / m;
            }

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height - 40) {
              p.active = false;
            }
          }

          // Draw trail
          ctx.beginPath();
          ctx.lineWidth = p.type === "alpha" ? 3.5 : p.type === "beta" ? 1.5 : 2;
          ctx.strokeStyle = p.color;
          ctx.lineCap = "round";
          if (p.history.length > 1) {
            ctx.moveTo(p.history[0].x, p.history[0].y);
            for (let i = 1; i < p.history.length; i++) {
              ctx.lineTo(p.history[i].x, p.history[i].y);
            }
          }
          ctx.stroke();

          // Draw particle head
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.type === "alpha" ? 4.5 : p.type === "beta" ? 2.5 : 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });

      } else if (activeTab === "scattering") {
        // --- MODE 2: RUTHERFORD SCATTERING ---
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Draw Gold Nucleus in the center
        const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 25);
        gradient.addColorStop(0, "#fef08a");
        gradient.addColorStop(0.3, "#fbbf24");
        gradient.addColorStop(1, "rgba(251, 191, 36, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#f59e0b";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 7 + (nucleusZ * 0.05), 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`+${nucleusZ}e`, centerX, centerY + 3);

        // Continuous stream
        if (localIsPlaying && continuousStream) {
          emissionTimer.current += 1;
          if (emissionTimer.current % 12 === 0) {
            const randomImpact = (Math.random() - 0.5) * 150;
            fireScatteringAlpha(centerY - randomImpact);
          }
        }

        // Physics loop
        particlesRef.current.forEach((p) => {
          if (!p.active) return;

          p.history.push({ x: p.x, y: p.y });
          if (p.history.length > 100) p.history.shift();

          if (localIsPlaying) {
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            const r2 = dx * dx + dy * dy;
            const r = Math.sqrt(r2);

            const nucleusRadius = 7 + (nucleusZ * 0.05);
            const imp = Math.abs(p.impactParameter || 0);

            if (r < nucleusRadius && r > 0.1) {
              const ux = dx / r;
              const uy = dy / r;
              
              if (imp < nucleusRadius) {
                // Elastic bounce back
                const dot = p.vx * ux + p.vy * uy;
                p.vx = p.vx - 2 * dot * ux;
                p.vy = p.vy - 2 * dot * uy;
                
                if (dx < 0 && p.vx > 0) {
                  p.vx = -Math.abs(p.vx);
                }

                p.x = centerX + ux * (nucleusRadius + 2);
                p.y = centerY + uy * (nucleusRadius + 2);
              } else {
                p.x += p.vx;
                p.y += p.vy;
              }
            } else if (r > 10) {
              const kQQ = (2 * nucleusZ) * 45; 
              let deflectionScale = 1.0;
              
              if (imp < nucleusRadius) {
                deflectionScale = 1.0;
              } else if (imp < nucleusRadius * 2.2) {
                const ratio = (imp - nucleusRadius) / (nucleusRadius * 1.2);
                deflectionScale = 0.15 * (1.0 - ratio);
              } else {
                deflectionScale = 0.0;
              }

              if (deflectionScale > 0) {
                const f = (kQQ / r2) * deflectionScale; 
                const ux = dx / r;
                const uy = dy / r;

                p.vx += f * ux / p.mass;
                p.vy += f * uy / p.mass;
              }
            }

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -20 || p.x > canvas.width + 20 || p.y < -20 || p.y > canvas.height + 20) {
              p.active = false;
            }
          }

          // Draw trail
          ctx.beginPath();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = "rgba(251, 191, 36, 0.5)";
          if (p.history.length > 1) {
            ctx.moveTo(p.history[0].x, p.history[0].y);
            for (let i = 1; i < p.history.length; i++) {
              ctx.lineTo(p.history[i].x, p.history[i].y);
            }
          }
          ctx.stroke();

          // Draw alpha dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#fbbf24";
          ctx.fill();
        });
      }

      // Cleanup
      particlesRef.current = particlesRef.current.filter(p => p.active || p.history.length > 1);

      if (localIsPlaying) {
        animationFrameId.current = requestAnimationFrame(render);
      }
    };

    if (localIsPlaying) {
      animationFrameId.current = requestAnimationFrame(render);
    } else {
      render();
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [activeTab, isPlaying, magneticField, particleSpeed, showAlpha, showBeta, showGamma, impactParameter, alphaEnergy, nucleusZ, continuousStream, protonCount, neutronCount]);

  const handleTabChange = (tab: "structure" | "deflection" | "scattering" | "practice") => {
    setActiveTab(tab);
    initDeflectionParticles();
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Interactive Practice Questions definition
  const mockQuestions = [
    {
      id: "sim_q1",
      question: "Trong thí nghiệm từ trường lệch hướng, tại sao quỹ đạo tia Beta (đỏ) lại bị uốn cong mạnh hơn nhiều so với tia Alpha (xanh)?",
      options: [
        "Do tia Beta có điện tích dương lớn hơn gấp đôi.",
        "Do tia Beta có khối lượng vô cùng nhỏ m_e so với khối lượng rất nặng m_α của Alpha.",
        "Do tia Beta là sóng điện từ không mang điện tích.",
        "Do tia Beta bay nhanh vượt trội so với vận tốc ánh sáng."
      ],
      correctIdx: 1,
      explanation: "Lực từ tỉ lệ với điện tích q nhưng gia tốc hướng tâm bằng F/m. Vì hạt Beta cực nhẹ (m ≈ 0.00055 u) so với hạt Alpha nặng (m ≈ 4 u), gia tốc hướng tâm của Beta cực kì lớn làm quỹ đạo của nó bị uốn cong gập rất nhanh."
    },
    {
      id: "sim_q2",
      question: "Nếu đặt thông số va chạm (b) bằng 0 trong thí nghiệm tán xạ Rutherford, hạt alpha sẽ chuyển động như thế nào?",
      options: [
        "Tiếp tục bay thẳng mà không bị lệch hướng.",
        "Bị hấp thụ hoàn toàn vào bên trong hạt nhân vàng.",
        "Bị đẩy lệch hướng vuông góc 90 độ.",
        "Bị giảm tốc độ về 0 rồi dội ngược trở lại 180 độ (phản xạ)."
      ],
      correctIdx: 3,
      explanation: "Khi b = 0, hạt alpha bay trực diện vào hạt nhân vàng. Do lực đẩy Coulomb cực kì mạnh tăng tỉ lệ nghịch với bình phương khoảng cách, hạt alpha sẽ giảm dần tốc độ về 0 tại khoảng cách ngắn nhất d_min rồi bị dội ngược 180 độ."
    }
  ];

  const handleSelectAnswer = (qId: string, idx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: idx }));
  };

  const handleToggleReveal = (qId: string) => {
    setRevealedAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans" id="lesson21-simulation-container">
      {/* APP TITLE BAR - Beautiful 3D Header with Soft Lavender Background */}
      <div className="flex flex-col bg-indigo-50 p-5 rounded-3xl border-2 border-slate-900 gap-4 shadow-[6px_6px_0px_#1e293b] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[5px_5px_0px_#1e293b]">
        <div className="flex items-center gap-3 w-full">
          <div className="p-2.5 bg-indigo-150 text-indigo-950 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
            <Compass className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-black text-slate-950 uppercase tracking-wider">PHÒNG THÍ NGHIỆM HẠT NHÂN VẬT LÝ</h2>
            <p className="text-[11px] text-slate-800 font-bold mt-0.5">Mô phỏng quỹ đạo chuyển động hạt alpha tán xạ Coulomb và lọc tia từ trường</p>
          </div>
        </div>
        
        {/* Tactile 3D Mode Switching buttons */}
        <div className="flex flex-wrap gap-2 bg-slate-150 p-1.5 rounded-2xl border-2 border-slate-900 shadow-inner w-full md:w-max">
          <button
            onClick={() => handleTabChange("structure")}
            className={`px-3 py-1.5 text-xs font-black rounded-xl border-2 border-slate-900 transition-all cursor-pointer ${
              activeTab === "structure"
                ? "bg-indigo-400 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
                : "bg-white text-slate-900 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#1e293b]"
            }`}
          >
            Cấu tạo hạt nhân
          </button>
          <button
            onClick={() => handleTabChange("deflection")}
            className={`px-3 py-1.5 text-xs font-black rounded-xl border-2 border-slate-900 transition-all cursor-pointer ${
              activeTab === "deflection"
                ? "bg-indigo-400 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
                : "bg-white text-slate-900 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#1e293b]"
            }`}
          >
            Từ trường (B)
          </button>
          <button
            onClick={() => handleTabChange("scattering")}
            className={`px-3 py-1.5 text-xs font-black rounded-xl border-2 border-slate-900 transition-all cursor-pointer ${
              activeTab === "scattering"
                ? "bg-indigo-400 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
                : "bg-white text-slate-900 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#1e293b]"
            }`}
          >
            Tán xạ Alpha (α)
          </button>
          <button
            onClick={() => handleTabChange("practice")}
            className={`px-3 py-1.5 text-xs font-black rounded-xl border-2 border-slate-900 transition-all cursor-pointer ${
              activeTab === "practice"
                ? "bg-indigo-400 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
                : "bg-white text-slate-900 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#1e293b]"
            }`}
          >
            Câu hỏi Mô phỏng
          </button>
        </div>
      </div>

      {activeTab !== "practice" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* INTERACTIVE VECTOR CANVAS HUD */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative bg-slate-950 rounded-3xl border-2 border-slate-900 p-2.5 overflow-hidden shadow-[5px_5px_0px_#1e293b]">
              
              {/* Top HUD bar overlays */}
              <div className="absolute top-4 left-4 bg-slate-900/90 border-2 border-slate-800 px-3 py-1.5 rounded-xl text-[10px] font-mono text-slate-300 z-10 flex items-center gap-2 backdrop-blur-sm shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold">
                  {activeTab === "structure"
                    ? "CẤU TẠO HẠT NHÂN: TƯƠNG TÁC LỰC MẠNH & TĨNH ĐIỆN"
                    : activeTab === "deflection"
                    ? "KHÔNG GIAN CHAMBER: PHÂN TÍCH TIA TỪ TRƯỜNG"
                    : "BIA TÁN XẠ: CHÙM TIA ALPHA VÀO HẠT NHÂN VÀNG"}
                </span>
              </div>

              {activeTab === "structure" && (
                <div className="absolute top-4 right-4 bg-slate-900/90 border-2 border-slate-800 px-3 py-1.5 rounded-xl text-[10px] font-mono text-slate-300 z-10 space-y-0.5 backdrop-blur-sm shadow-md text-right">
                  <div className="font-bold text-indigo-400">TỔNG NUCLEON A = <span className="text-white font-mono">{protonCount + neutronCount}</span></div>
                  <div className="text-[9px] text-slate-400 font-bold font-mono">
                    Z (Proton): {protonCount} | N (Neutron): {neutronCount}
                  </div>
                </div>
              )}

              {activeTab === "deflection" && (
                <div className="absolute top-4 right-4 bg-slate-900/90 border-2 border-slate-800 px-3 py-1.5 rounded-xl text-[10px] font-mono text-slate-300 z-10 space-y-0.5 backdrop-blur-sm shadow-md">
                  <div className="font-bold">Từ trường B = <span className="text-amber-400 font-mono">{magneticField.toFixed(1)} T</span></div>
                  <div className="text-[9px] text-slate-500 font-bold">
                    {magneticField > 0 ? "Hướng: Đâm sâu vào (⊗)" : magneticField < 0 ? "Hướng: Đâm ra ngoài (⊙)" : "Không từ trường (0)"}
                  </div>
                </div>
              )}

              {/* Core Canvas element */}
              <canvas
                ref={canvasRef}
                width={520}
                height={360}
                className="w-full h-auto bg-slate-950 rounded-2xl block border border-slate-800"
              />

              {/* HUD Buttons */}
              <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                <button
                  onClick={togglePlay}
                  className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border-2 border-slate-800 flex items-center justify-center transition-all shadow-md backdrop-blur-sm cursor-pointer active:scale-95"
                  title={isPlaying ? "Tạm dừng" : "Tiếp tục"}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 text-emerald-400" />}
                </button>
                <button
                  onClick={handleReset}
                  className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border-2 border-slate-800 flex items-center justify-center transition-all shadow-md backdrop-blur-sm cursor-pointer active:scale-95"
                  title="Xóa vết tia cũ"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                {activeTab === "scattering" && !continuousStream && (
                  <button
                    onClick={() => fireScatteringAlpha()}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-black text-xs rounded-xl flex items-center gap-1.5 border-2 border-slate-900 transition-all shadow-md cursor-pointer active:translate-y-[1px]"
                  >
                    <Atom className="h-3.5 w-3.5" /> Bắn hạt Alpha lẻ
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR PARAMETERS CONTROL BOARD */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CONTROLS FOR NUCLEAR STRUCTURE TAB */}
            {activeTab === "structure" && (
              <div className="bg-indigo-50/80 p-5 rounded-3xl border-2 border-slate-900 space-y-5 shadow-[5px_5px_0px_#1e293b]">
                <h3 className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-2 border-b-2 border-slate-900 pb-2 mb-1">
                  <Sliders className="h-4 w-4 text-indigo-700" /> CẤU TẠO HẠT NHÂN (A = Z + N)
                </h3>

                {/* Nucleus Preset Selector */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-800 uppercase tracking-wide block">
                    Chọn hạt nhân mẫu:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: "He4", name: "Heli-4", formula: "⁴₂He" },
                      { id: "C12", name: "Cacbon-12", formula: "¹²₆C" },
                      { id: "O16", name: "Oxi-16", formula: "¹⁶₈O" },
                      { id: "Na23", name: "Natri-23", formula: "²³₁₁Na" },
                      { id: "Fe56", name: "Sắt-56", formula: "⁵⁶₂₆Fe" },
                      { id: "Cu63", name: "Đồng-63", formula: "⁶³₂₉Cu" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handlePresetChange(p.id)}
                        className={`py-1.5 px-2 rounded-xl border-2 border-slate-900 text-[11px] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                          selectedStructurePreset === p.id
                            ? "bg-indigo-400 text-slate-950 shadow-none translate-y-[1px]"
                            : "bg-white text-slate-950 hover:bg-slate-50 shadow-[1.5px_1.5px_0px_#1e293b]"
                        }`}
                      >
                        <span className="font-mono text-[12px]">{p.formula}</span>
                        <span className="text-[9px] opacity-75">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Protons Adjuster (Z) */}
                <div className="space-y-1.5 border-t-2 border-dashed border-indigo-200 pt-3.5">
                  <div className="flex justify-between items-center text-xs font-black text-slate-900">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-slate-900"></span>
                      Số Proton (Z - Điện tích):
                    </span>
                    <span className="text-rose-700 font-mono font-black text-sm bg-rose-100/60 px-2 py-0.5 rounded border border-rose-300">{protonCount}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleProtonChange(Math.max(0, protonCount - 1))}
                      className="w-8 h-8 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-100 font-black flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_#1e293b] active:translate-y-[1px] active:shadow-none"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="1"
                      value={protonCount}
                      onChange={(e) => handleProtonChange(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-indigo-150 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <button
                      onClick={() => handleProtonChange(Math.min(30, protonCount + 1))}
                      className="w-8 h-8 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-100 font-black flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_#1e293b] active:translate-y-[1px] active:shadow-none"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Neutrons Adjuster (N) */}
                <div className="space-y-1.5 border-t-2 border-dashed border-indigo-200 pt-3.5">
                  <div className="flex justify-between items-center text-xs font-black text-slate-900">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-slate-900"></span>
                      Số Neutron (N):
                    </span>
                    <span className="text-slate-700 font-mono font-black text-sm bg-slate-200/60 px-2 py-0.5 rounded border border-slate-300">{neutronCount}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleNeutronChange(Math.max(0, neutronCount - 1))}
                      className="w-8 h-8 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-100 font-black flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_#1e293b] active:translate-y-[1px] active:shadow-none"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="35"
                      step="1"
                      value={neutronCount}
                      onChange={(e) => handleNeutronChange(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-indigo-150 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <button
                      onClick={() => handleNeutronChange(Math.min(35, neutronCount + 1))}
                      className="w-8 h-8 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-100 font-black flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_#1e293b] active:translate-y-[1px] active:shadow-none"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* REAL-TIME DYNAMIC ANALYSIS HUD PANEL */}
                {(() => {
                  const info = getElementInfo(protonCount, neutronCount);
                  return (
                    <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_#1e293b] space-y-3">
                      <div className="flex items-center gap-3.5 font-sans">
                        {/* Nuclear Symbol Badge like ⁴₂He */}
                        <div className="w-14 h-14 bg-indigo-50 text-slate-950 border-2 border-slate-900 rounded-xl flex items-center justify-center relative font-black select-none shadow-[2px_2px_0px_#000]">
                          <span className="absolute top-1 left-1.5 text-[11px] font-bold font-mono text-indigo-700">{info.A}</span>
                          <span className="absolute bottom-1 left-1.5 text-[11px] font-bold font-mono text-rose-600">{protonCount}</span>
                          <span className="text-xl ml-4 font-serif">{info.symbol}</span>
                        </div>
                        <div>
                          <div className="text-[11px] font-black text-slate-400 uppercase tracking-wide">PHÂN TÍCH ĐỒNG VỊ</div>
                          <h4 className="text-sm font-black text-slate-950 leading-tight">
                            {info.name}-{info.A}
                          </h4>
                          <span className={`inline-block text-[9px] font-black px-2 py-0.5 rounded border-2 mt-1 leading-none ${info.stabilityColor}`}>
                            {info.stability}
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[10.5px] text-slate-700 font-semibold leading-relaxed font-sans">
                        <strong className="text-slate-900 flex items-center gap-1 mb-0.5 uppercase tracking-wider text-[9.5px]">
                          <Info className="h-3 w-3 text-indigo-500 shrink-0" /> Cơ chế vật lý lý giải:
                        </strong>
                        <p>{info.explanation}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
            
            {/* CONTROLS FOR DEFLECTION TAB */}
            {activeTab === "deflection" && (
              <div className="bg-rose-50/80 p-5 rounded-3xl border-2 border-slate-900 space-y-5 shadow-[5px_5px_0px_#1e293b]">
                <h3 className="text-xs font-black text-rose-950 uppercase tracking-wider flex items-center gap-2 border-b-2 border-slate-900 pb-2 mb-1">
                  <Sliders className="h-4 w-4 text-rose-700" /> Bảng điều khiển từ lực
                </h3>

                {/* Slider: Magnetic field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-black text-slate-900">
                    <span>Cường độ từ trường (B):</span>
                    <span className="text-indigo-800 font-mono font-black">{magneticField.toFixed(1)} T</span>
                  </div>
                  <input
                    type="range"
                    min="-2.0"
                    max="2.0"
                    step="0.2"
                    value={magneticField}
                    onChange={(e) => setMagneticField(parseFloat(e.target.value))}
                    className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="text-[10px] text-slate-700 block text-right font-semibold leading-tight">
                    Kéo sang trái (-) để từ trường hướng ra ngoài, bên phải (+) đâm vào trong
                  </span>
                </div>

                {/* Slider: Speed */}
                <div className="space-y-1.5 border-t-2 border-dashed border-rose-250 pt-3">
                  <div className="flex justify-between text-xs font-black text-slate-900">
                    <span>Vận tốc ban đầu (v₀):</span>
                    <span className="text-emerald-800 font-mono font-black">Mức {particleSpeed.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="5.0"
                    step="0.5"
                    value={particleSpeed}
                    onChange={(e) => setParticleSpeed(parseFloat(e.target.value))}
                    className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Filter Checkboxes */}
                <div className="space-y-2 border-t-2 border-dashed border-rose-250 pt-3.5">
                  <span className="text-[10px] font-black text-rose-950 uppercase tracking-wider block">Bộ lọc nguồn phát xạ:</span>
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-xs font-black text-slate-950 cursor-pointer select-none bg-white p-2 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#1e293b] transition-all">
                      <input
                        type="checkbox"
                        checked={showAlpha}
                        onChange={() => setShowAlpha(!showAlpha)}
                        className="rounded border-2 border-slate-900 text-indigo-600 focus:ring-0 cursor-pointer w-4 h-4"
                      />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] border border-slate-900"></span>
                      Alpha (α: q = +2e, m = 4)
                    </label>

                    <label className="flex items-center gap-2.5 text-xs font-black text-slate-950 cursor-pointer select-none bg-white p-2 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#1e293b] transition-all">
                      <input
                        type="checkbox"
                        checked={showBeta}
                        onChange={() => setShowBeta(!showBeta)}
                        className="rounded border-2 border-slate-900 text-indigo-600 focus:ring-0 cursor-pointer w-4 h-4"
                      />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] border border-slate-900"></span>
                      Beta (β⁻: q = -e, m ≈ 0)
                    </label>

                    <label className="flex items-center gap-2.5 text-xs font-black text-slate-950 cursor-pointer select-none bg-white p-2 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#1e293b] transition-all">
                      <input
                        type="checkbox"
                        checked={showGamma}
                        onChange={() => setShowGamma(!showGamma)}
                        className="rounded border-2 border-slate-900 text-indigo-600 focus:ring-0 cursor-pointer w-4 h-4"
                      />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] border border-slate-900"></span>
                      Gamma (γ: q = 0, m = 0)
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* CONTROLS FOR SCATTERING TAB */}
            {activeTab === "scattering" && (
              <div className="bg-amber-50/80 p-5 rounded-3xl border-2 border-slate-900 space-y-5 shadow-[5px_5px_0px_#1e293b]">
                <h3 className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-2 border-b-2 border-slate-900 pb-2 mb-1">
                  <Sliders className="h-4 w-4 text-amber-700" /> Bảng điều khiển tán xạ
                </h3>

                {/* Slider: Impact parameter */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-black text-slate-900">
                    <span>Thông số va chạm (b):</span>
                    <span className="text-amber-800 font-mono font-black">{impactParameter} fm</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="120"
                    step="5"
                    value={impactParameter}
                    onChange={(e) => setImpactParameter(parseInt(e.target.value))}
                    className="w-full h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <span className="text-[10px] text-slate-700 block text-right font-semibold leading-tight">
                    Khoảng cách thẳng đứng từ tia bắn tới tâm hạt nhân bia
                  </span>
                </div>

                {/* Slider: Energy */}
                <div className="space-y-1.5 border-t-2 border-dashed border-amber-250 pt-3">
                  <div className="flex justify-between text-xs font-black text-slate-900">
                    <span>Động năng hạt Alpha (E_d):</span>
                    <span className="text-amber-800 font-mono font-black">{alphaEnergy.toFixed(1)} MeV</span>
                  </div>
                  <input
                    type="range"
                    min="2.0"
                    max="8.0"
                    step="0.5"
                    value={alphaEnergy}
                    onChange={(e) => setAlphaEnergy(parseFloat(e.target.value))}
                    className="w-full h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                {/* Slider: Gold nucleus charge Z */}
                <div className="space-y-1.5 border-t-2 border-dashed border-amber-250 pt-3">
                  <div className="flex justify-between text-xs font-black text-slate-900">
                    <span>Điện tích hạt nhân bia (Z):</span>
                    <span className="text-amber-800 font-mono font-black">+{nucleusZ}e</span>
                  </div>
                  <input
                    type="range"
                    min="13"
                    max="92"
                    step="1"
                    value={nucleusZ}
                    onChange={(e) => setNucleusZ(parseInt(e.target.value))}
                    className="w-full h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <span className="text-[10px] text-slate-700 block text-right font-semibold leading-tight">
                    Nhôm (+13e), Sắt (+26e), Vàng (+79e), Urani (+92e)
                  </span>
                </div>

                {/* Emission Stream Toggle */}
                <div className="space-y-2 border-t-2 border-dashed border-amber-250 pt-3.5">
                  <span className="text-[10px] font-black text-amber-950 uppercase tracking-wider block">Chế độ phát xạ:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setContinuousStream(true);
                        handleReset();
                      }}
                      className={`flex-1 py-2 text-xs font-black rounded-xl border-2 border-slate-900 transition-all cursor-pointer ${
                        continuousStream 
                          ? "bg-indigo-400 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]" 
                          : "bg-white text-slate-900 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#1e293b]"
                      }`}
                    >
                      Chùm liên tục
                    </button>
                    <button
                      onClick={() => {
                        setContinuousStream(false);
                        handleReset();
                      }}
                      className={`flex-1 py-2 text-xs font-black rounded-xl border-2 border-slate-900 transition-all cursor-pointer ${
                        !continuousStream 
                          ? "bg-indigo-400 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]" 
                          : "bg-white text-slate-900 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#1e293b]"
                      }`}
                    >
                      Bắn phát một
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* TAB 3: HIGH CONTRAST INTERACTIVE PRACTICE BOARD */
        <div className="bg-indigo-50/50 rounded-3xl border-2 border-slate-900 p-6 space-y-6 animate-fade-in shadow-[6px_6px_0px_#1e293b]">
          <div className="flex items-center gap-2.5 border-b-2 border-slate-900 pb-3">
            <span className="p-1.5 bg-indigo-150 border-2 border-slate-900 rounded-xl"><Activity className="h-4.5 w-4.5 text-indigo-950" /></span>
            <h3 className="text-base font-black text-slate-950 uppercase tracking-wide">CÂU HỎI KHẢO SÁT THỰC HÀNH MÔ PHỎNG</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockQuestions.map((q, qIdx) => (
              <div key={q.id} className="bg-white p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b] flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[9px] bg-indigo-100 border-2 border-indigo-900 text-indigo-950 px-2.5 py-0.5 rounded-md font-mono font-black uppercase">
                    Câu hỏi {qIdx + 1}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-950 leading-relaxed">
                    {q.question}
                  </h4>
                  
                  {/* Options */}
                  <div className="space-y-2 pt-1.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border-2 text-xs font-bold leading-normal transition-all cursor-pointer ${
                            isSelected
                              ? "bg-indigo-100 border-slate-900 text-slate-950 translate-x-[1px] translate-y-[1px]"
                              : "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-800 hover:bg-slate-100"
                          }`}
                        >
                          <span className="font-mono font-black mr-1">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Show details & feedback */}
                <div className="mt-5 pt-4 border-t-2 border-slate-100 space-y-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleReveal(q.id)}
                      disabled={selectedAnswers[q.id] === undefined}
                      className={`flex-1 py-2 text-xs font-black rounded-xl border-2 border-slate-900 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        selectedAnswers[q.id] === undefined
                          ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                          : "bg-indigo-400 text-slate-950 shadow-[2px_2px_0px_#000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#000]"
                      }`}
                    >
                      {revealedAnswers[q.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      {revealedAnswers[q.id] ? "Ẩn giải thích" : "Xem đáp án"}
                    </button>
                  </div>

                  {revealedAnswers[q.id] && (
                    <div className="p-3.5 bg-emerald-50 border-2 border-slate-900 rounded-2xl animate-fade-in space-y-1.5 text-xs font-bold shadow-[2px_2px_0px_#1e293b]">
                      <div className="flex items-center gap-1.5">
                        {selectedAnswers[q.id] === q.correctIdx ? (
                          <span className="text-emerald-700 font-black flex items-center gap-1">✓ ĐÁP ÁN ĐÚNG!</span>
                        ) : (
                          <span className="text-rose-700 font-black flex items-center gap-1">✗ ĐÁP ÁN CHƯA ĐÚNG!</span>
                        )}
                      </div>
                      <p className="text-slate-800 leading-relaxed">
                        <strong className="text-slate-950 block mb-1">Đáp án đúng là {String.fromCharCode(65 + q.correctIdx)}:</strong>
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAILED EDUCATIONAL NOTES - High Contrast 3D Styled Guidelines Panel */}
      <div className="bg-emerald-50/80 p-5 rounded-3xl border-2 border-slate-900 space-y-4 shadow-[6px_6px_0px_#1e293b] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[5px_5px_0px_#1e293b]">
        <h4 className="text-xs sm:text-sm font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5 border-b-2 border-slate-900 pb-2">
          <Activity className="h-5 w-5 text-emerald-800" /> HƯỚNG DẪN THỰC HÀNH KHẢO SÁT PHÒNG LAB:
        </h4>
        
        {activeTab === "deflection" ? (
          <div className="text-xs text-slate-900 space-y-3.5 pl-1.5 font-semibold leading-relaxed">
            <p>
              1. <strong>Tác dụng của lực Lorentz trong lọc tia:</strong> Lực từ tác dụng lên các hạt bay chuyển động vuông góc với cảm ứng từ chi phối trực tiếp độ lệch hướng của chúng:
            </p>
            <div className="bg-white border-2 border-slate-900 p-3 rounded-2xl text-center text-xs sm:text-sm text-slate-950 my-2 shadow-[2px_2px_0px_#1e293b] font-normal">
              <FormattedMathText text="\vec{F}_L = q \cdot (\vec{v} \times \vec{B}) \implies F_L = |q| \cdot v \cdot B \cdot \sin(\theta)" />
            </div>
            <p>
              2. <strong>Ảnh hưởng của chiều hạt điện tích:</strong> Khi tăng cường độ từ trường B &gt; 0 (đâm sâu vào), hạt alpha (+) chịu tác dụng lực hướng tâm lệch trái, trong khi hạt beta (-) lệch gấp khúc mạnh sang phải. Đổi chiều B &lt; 0 sẽ đảo ngược hoàn toàn hướng bẻ cong tia. Tia gamma trung hòa điện tích (q = 0) luôn truyền thẳng không bị bẻ cong trong mọi trường hợp từ lực.
            </p>
          </div>
        ) : activeTab === "scattering" ? (
          <div className="text-xs text-slate-900 space-y-3.5 pl-1.5 font-semibold leading-relaxed">
            <p>
              1. <strong>Bản chất đẩy Coulomb lực điện động:</strong> Tương tác đẩy giữa hạt alpha (+2e) và hạt nhân bia kim loại nặng (+Ze) tuân theo định luật Coulomb tỉ lệ nghịch với bình phương khoảng cách:
            </p>
            <div className="bg-white border-2 border-slate-900 p-3 rounded-2xl text-center text-xs sm:text-sm text-slate-950 my-2 shadow-[2px_2px_0px_#1e293b] font-normal">
              <FormattedMathText text="F_C = k \cdot \frac{|q_1 \cdot q_2|}{r^2}" />
            </div>
            <p>
              2. <strong>Mối liên hệ của thông số va chạm (b):</strong> Khi thông số va chạm b lớn (hạt alpha đi quá xa hạt nhân lõi), lực đẩy Coulomb yếu khiến nó đi thẳng xuyên phá mượt mà. Khi b tiến dần về không (hạt alpha nhắm trực diện bia), lực đẩy đạt cực đại tuyệt đối, hạt alpha bị hãm dừng hẳn rồi dội thẳng ngược lại 180 độ (phản xạ), giải thích hiện tượng rất ít hạt bị bật ngược mà Rutherford phát hiện ra.
            </p>
          </div>
        ) : (
          <div className="text-xs text-slate-900 space-y-2 pl-1.5 font-semibold leading-relaxed">
            <p>
              ✦ <strong>Nhiệm vụ rèn luyện:</strong> Học sinh tự thao tác trực tuyến trên bảng mô phỏng, thay đổi các thông số từ lực, cường độ, thông số va chạm để kiểm chứng kết quả thực tế trên màn hình. Trả lời đầy đủ các câu hỏi khảo sát trắc nghiệm để đánh giá năng lực vật lý hạt nhân của bản thân.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
