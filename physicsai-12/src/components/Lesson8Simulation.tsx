import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Activity, Info, Eye, Gauge, Columns, HelpCircle, Sparkles, TrendingUp, RefreshCw, BarChart2 } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

interface GasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: string;
}

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  trail: { x: number; y: number }[];
}

interface CollisionRipple {
  x: number;
  y: number;
  maxRadius: number;
  currentRadius: number;
  alpha: number;
}

export default function Lesson8Simulation() {
  const [activeTab, setActiveTab] = useState<"brownian" | "pressure">("brownian");

  // General simulation controls
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // --- TAB 1: BROWNIAN MOTION STATES ---
  const [tempBrownian, setTempBrownian] = useState<number>(300); // Kelvin (100 - 800)
  const [smokeSize, setSmokeSize] = useState<number>(14); // radius (6 - 25)
  const [gasDensity, setGasDensity] = useState<number>(35); // number of gas molecules (10 - 80)
  const [showGasMolecules, setShowGasMolecules] = useState<boolean>(true);
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [meanDisplacement, setMeanDisplacement] = useState<number>(0);

  // --- TAB 2: GAS PRESSURE STATES ---
  const [tempPressure, setTempPressure] = useState<number>(300); // Kelvin (100 - 800)
  const [moleculeCount, setMoleculeCount] = useState<number>(40); // 10 - 100
  const [containerVolume, setContainerVolume] = useState<number>(100); // % (50% - 100% width)
  const [pressureValue, setPressureValue] = useState<number>(1.2); // Calculated atm
  const [collisionFreq, setCollisionFreq] = useState<number>(0); // hits/sec
  const [showRipples, setShowRipples] = useState<boolean>(true);
  const [lawVerification, setLawVerification] = useState<"boyle" | "charles">("boyle");

  // Historical data for charts
  const [pressureHistory, setPressureHistory] = useState<{ x: number; y: number }[]>([]);

  // Canvas Refs
  const canvasRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);

  // Physics simulation references to avoid React state lag
  const stateRef = useRef({
    // Brownian Ref states
    brownian: {
      particles: [] as GasParticle[],
      smoke: {
        x: 200,
        y: 150,
        vx: 0,
        vy: 0,
        radius: 14,
        mass: 140,
        trail: [] as { x: number; y: number }[],
      } as SmokeParticle,
      recentCollisionsVector: { x: 0, y: 0 },
      vectorFade: 0,
      initialX: 200,
      initialY: 150,
    },
    // Pressure Ref states
    pressure: {
      particles: [] as GasParticle[],
      ripples: [] as CollisionRipple[],
      totalCollisions: 0,
      lastCollisionTime: 0,
      rollingCollisions: 0,
    }
  });

  // Handle Tab Change resets
  useEffect(() => {
    setPressureHistory([]);
    stateRef.current.pressure.totalCollisions = 0;
    stateRef.current.pressure.rollingCollisions = 0;
  }, [activeTab]);

  // -------------------------------------------------------------
  // TAB 1: BROWNIAN MOTION PHYSICS ENGINE
  // -------------------------------------------------------------
  useEffect(() => {
    if (activeTab !== "brownian") return;

    const canvas = canvasRef1.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset/Initialize particles
    const width = canvas.width;
    const height = canvas.height;

    // Set positions inside ref
    const bState = stateRef.current.brownian;
    bState.smoke.radius = smokeSize;
    // Mass scales cubic or squared with radius to simulate real inertia
    bState.smoke.mass = Math.pow(smokeSize, 2.5) * 0.4;

    // Generate gas molecules with rich, high contrast colors for light background
    const currentParticles: GasParticle[] = [];
    const speedBase = Math.sqrt(tempBrownian / 300) * 2.2;

    for (let i = 0; i < gasDensity; i++) {
      let px = Math.random() * (width - 15) + 7.5;
      let py = Math.random() * (height - 15) + 7.5;

      // Ensure no initial overlap with the smoke particle
      const dx = px - bState.smoke.x;
      const dy = py - bState.smoke.y;
      const dist = Math.hypot(dx, dy);
      if (dist < bState.smoke.radius + 6) {
        px = (px + 100) % width;
        py = (py + 100) % height;
      }

      const angle = Math.random() * Math.PI * 2;
      currentParticles.push({
        x: px,
        y: py,
        vx: Math.cos(angle) * speedBase * (0.8 + Math.random() * 0.4),
        vy: Math.sin(angle) * speedBase * (0.8 + Math.random() * 0.4),
        radius: 3.5,
        mass: 1.5,
        color: i % 4 === 0 ? "#0891b2" : i % 4 === 1 ? "#0284c7" : i % 4 === 2 ? "#2563eb" : "#4f46e5",
      });
    }
    bState.particles = currentParticles;

    let animationFrameId: number;

    const updatePhysics = () => {
      if (!isPlaying) {
        drawFrame();
        animationFrameId = requestAnimationFrame(updatePhysics);
        return;
      }

      const bState = stateRef.current.brownian;
      const speedMultiplier = Math.sqrt(tempBrownian / 300);
      const smoke = bState.smoke;

      // Decay visual force vector
      bState.vectorFade = Math.max(0, bState.vectorFade - 0.05);

      // Apply highly damped movement to smoke to prevent drifting out of screen
      smoke.vx *= 0.94;
      smoke.vy *= 0.94;

      // Update smoke position
      smoke.x += smoke.vx;
      smoke.y += smoke.vy;

      // Smoke vs Wall collisions (Elastic rebound)
      if (smoke.x - smoke.radius < 0) {
        smoke.x = smoke.radius;
        smoke.vx = -smoke.vx * 0.8;
      } else if (smoke.x + smoke.radius > width) {
        smoke.x = width - smoke.radius;
        smoke.vx = -smoke.vx * 0.8;
      }
      if (smoke.y - smoke.radius < 0) {
        smoke.y = smoke.radius;
        smoke.vy = -smoke.vy * 0.8;
      } else if (smoke.y + smoke.radius > height) {
        smoke.y = height - smoke.radius;
        smoke.vy = -smoke.vy * 0.8;
      }

      // Record trail
      if (Math.random() < 0.3) {
        smoke.trail.push({ x: smoke.x, y: smoke.y });
        if (smoke.trail.length > 120) {
          smoke.trail.shift();
        }
      }

      // Update air molecules positions
      bState.particles.forEach((p) => {
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // Molecule vs Wall
        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx = -p.vx;
        } else if (p.x + p.radius > width) {
          p.x = width - p.radius;
          p.vx = -p.vx;
        }
        if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy = -p.vy;
        } else if (p.y + p.radius > height) {
          p.y = height - p.radius;
          p.vy = -p.vy;
        }

        // Molecule vs Smoke Particle (The core Brownian collision mechanism!)
        const dx = p.x - smoke.x;
        const dy = p.y - smoke.y;
        const dist = Math.hypot(dx, dy);
        const minDist = p.radius + smoke.radius;

        if (dist < minDist) {
          // Push out of overlap
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;
          p.x += nx * overlap;
          p.y += ny * overlap;

          // 2D Elastic Collision Equations
          const kx = p.vx - smoke.vx;
          const ky = p.vy - smoke.vy;
          const pAngle = Math.atan2(ny, nx);
          
          // Project velocities onto the normal of collision
          const v1n = p.vx * nx + p.vy * ny;
          const v2n = smoke.vx * nx + smoke.vy * ny;

          // Compute new 1D normal velocities after elastic collision
          const m1 = p.mass;
          const m2 = smoke.mass;
          const newV1n = (v1n * (m1 - m2) + 2 * m2 * v2n) / (m1 + m2);
          const newV2n = (v2n * (m2 - m1) + 2 * m1 * v1n) / (m1 + m2);

          // Update velocities
          p.vx += (newV1n - v1n) * nx;
          p.vy += (newV1n - v1n) * ny;
          smoke.vx += (newV2n - v2n) * nx;
          smoke.vy += (newV2n - v2n) * ny;

          // Record collision vector for visual indicator
          bState.recentCollisionsVector = {
            x: -nx * 18,
            y: -ny * 18,
          };
          bState.vectorFade = 1.0;
        }
      });

      // Calculate mean displacement from original starting point
      const originalX = bState.initialX;
      const originalY = bState.initialY;
      const disp = Math.hypot(smoke.x - originalX, smoke.y - originalY);
      setMeanDisplacement(Math.round(disp));

      drawFrame();
      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background grid in high contrast against off-white background
      ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const bState = stateRef.current.brownian;
      const smoke = bState.smoke;

      // Draw original starting point marker
      ctx.strokeStyle = "rgba(180, 83, 9, 0.35)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(bState.initialX, bState.initialY, smokeSize, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(180, 83, 9, 0.7)";
      ctx.font = "bold 9px monospace";
      ctx.fillText("Vị trí t=0", bState.initialX - 25, bState.initialY + 3);

      // Draw Zigzag trail of smoke particle with High Contrast cyan
      if (smoke.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(smoke.trail[0].x, smoke.trail[0].y);
        for (let i = 1; i < smoke.trail.length; i++) {
          ctx.lineTo(smoke.trail[i].x, smoke.trail[i].y);
        }
        ctx.strokeStyle = "rgba(8, 145, 178, 0.9)";
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.stroke();

        // Draw dots at trail vertices
        ctx.fillStyle = "rgba(8, 145, 178, 0.6)";
        smoke.trail.forEach((pt, i) => {
          if (i % 3 === 0) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // Draw air molecules
      if (showGasMolecules) {
        bState.particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
      }

      // Draw Smoke particle (Hạt khói màu vàng với viền nâu sẫm tương phản cao)
      ctx.beginPath();
      ctx.arc(smoke.x, smoke.y, smoke.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#eab308";
      ctx.strokeStyle = "#854d0e";
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(133, 77, 14, 0.2)";
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Draw net instantaneous force vector acting on the smoke particle
      if (showVectors && bState.vectorFade > 0.05) {
        ctx.beginPath();
        const startX = smoke.x;
        const startY = smoke.y;
        const endX = smoke.x + bState.recentCollisionsVector.x * bState.vectorFade * 2;
        const endY = smoke.y + bState.recentCollisionsVector.y * bState.vectorFade * 2;

        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(185, 28, 28, ${bState.vectorFade})`;
        ctx.lineWidth = 4;
        ctx.stroke();

        // Draw arrowhead
        const angle = Math.atan2(endY - startY, endX - startX);
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - 9 * Math.cos(angle - Math.PI / 6), endY - 9 * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(endX - 9 * Math.cos(angle + Math.PI / 6), endY - 9 * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fillStyle = `rgba(185, 28, 28, ${bState.vectorFade})`;
        ctx.fill();

        // Vector label
        ctx.fillStyle = `rgba(185, 28, 28, ${bState.vectorFade})`;
        ctx.font = "bold 10px system-ui";
        ctx.fillText("Hợp lực va chạm F", endX + 6, endY + 2);
      }
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab, isPlaying, tempBrownian, smokeSize, gasDensity, showGasMolecules, showVectors]);

  // Handle resets for Brownian
  const resetBrownianPosition = () => {
    const bState = stateRef.current.brownian;
    const canvas = canvasRef1.current;
    if (!canvas) return;
    bState.smoke.x = canvas.width / 2;
    bState.smoke.y = canvas.height / 2;
    bState.smoke.vx = 0;
    bState.smoke.vy = 0;
    bState.smoke.trail = [];
    bState.initialX = canvas.width / 2;
    bState.initialY = canvas.height / 2;
    setMeanDisplacement(0);
  };

  // -------------------------------------------------------------
  // TAB 2: GAS PRESSURE PHYSICS ENGINE
  // -------------------------------------------------------------
  useEffect(() => {
    if (activeTab !== "pressure") return;

    const canvas = canvasRef2.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const pState = stateRef.current.pressure;

    // Build particles
    const currentParticles: GasParticle[] = [];
    const speedBase = Math.sqrt(tempPressure / 300) * 3;

    for (let i = 0; i < moleculeCount; i++) {
      // Bounds restricted by volume (which modifies the effective container width)
      const currentWidthLimit = (width * containerVolume) / 100;
      const px = Math.random() * (currentWidthLimit - 20) + 10;
      const py = Math.random() * (height - 20) + 10;
      const angle = Math.random() * Math.PI * 2;

      currentParticles.push({
        x: px,
        y: py,
        vx: Math.cos(angle) * speedBase * (0.85 + Math.random() * 0.3),
        vy: Math.sin(angle) * speedBase * (0.85 + Math.random() * 0.3),
        radius: 4.5,
        mass: 2,
        color: tempPressure > 450 ? "#dc2626" : tempPressure > 280 ? "#0284c7" : "#0369a1",
      });
    }
    pState.particles = currentParticles;
    pState.ripples = [];

    let animationFrameId: number;

    const updatePhysics = () => {
      if (!isPlaying) {
        drawFrame();
        animationFrameId = requestAnimationFrame(updatePhysics);
        return;
      }

      const pState = stateRef.current.pressure;
      const widthLimit = (width * containerVolume) / 100;
      const speedMultiplier = Math.sqrt(tempPressure / 300);

      // Track impulses for pressure calculation
      let currentImpulseAcc = 0;

      // Update ripples
      pState.ripples.forEach((r) => {
        r.currentRadius += 1.5;
        r.alpha -= 0.08;
      });
      pState.ripples = pState.ripples.filter((r) => r.alpha > 0);

      // Move gas particles
      pState.particles.forEach((p) => {
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // Bounce from left wall (fixed at x = 0)
        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx = -p.vx;
          currentImpulseAcc += Math.abs(2 * p.mass * p.vx * speedMultiplier);
          if (showRipples && Math.random() < 0.4) {
            pState.ripples.push({ x: 0, y: p.y, maxRadius: 18, currentRadius: 1, alpha: 1.0 });
          }
        }

        // Bounce from movable Piston / Right wall (variable at x = widthLimit)
        if (p.x + p.radius > widthLimit) {
          p.x = widthLimit - p.radius;
          p.vx = -p.vx;
          currentImpulseAcc += Math.abs(2 * p.mass * p.vx * speedMultiplier);
          if (showRipples) {
            pState.ripples.push({ x: widthLimit, y: p.y, maxRadius: 20, currentRadius: 1, alpha: 1.0 });
          }
        }

        // Bounce from top wall
        if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy = -p.vy;
          currentImpulseAcc += Math.abs(2 * p.mass * p.vy * speedMultiplier);
          if (showRipples && Math.random() < 0.4) {
            pState.ripples.push({ x: p.x, y: 0, maxRadius: 18, currentRadius: 1, alpha: 1.0 });
          }
        }

        // Bounce from bottom wall
        if (p.y + p.radius > height) {
          p.y = height - p.radius;
          p.vy = -p.vy;
          currentImpulseAcc += Math.abs(2 * p.mass * p.vy * speedMultiplier);
          if (showRipples && Math.random() < 0.4) {
            pState.ripples.push({ x: p.x, y: height, maxRadius: 18, currentRadius: 1, alpha: 1.0 });
          }
        }

        // Inter-particle elastic collisions
        pState.particles.forEach((other) => {
          if (p === other) return;
          const dx = other.x - p.x;
          const dy = other.y - p.y;
          const dist = Math.hypot(dx, dy);
          const minDist = p.radius + other.radius;

          if (dist < minDist) {
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            // separate
            p.x -= nx * overlap * 0.5;
            p.y -= ny * overlap * 0.5;
            other.x += nx * overlap * 0.5;
            other.y += ny * overlap * 0.5;

            // Elastic bounce velocities
            const kx = p.vx - other.vx;
            const ky = p.vy - other.vy;
            const vn = kx * nx + ky * ny;

            if (vn > 0) {
              const impulse = (2 * vn) / (p.mass + other.mass);
              p.vx -= impulse * other.mass * nx;
              p.vy -= impulse * other.mass * ny;
              other.vx += impulse * p.mass * nx;
              other.vy += impulse * p.mass * ny;
            }
          }
        });
      });

      // Scale calculations for realistic looking pressure units (atm)
      const relativeVolume = containerVolume / 100;
      const computedRawPressure = (moleculeCount * tempPressure * 0.0001) / relativeVolume;
      const simulatedPressure = Math.round(computedRawPressure * 100) / 100;

      // Update counters
      pState.rollingCollisions += currentImpulseAcc > 0 ? 1 : 0;
      pState.totalCollisions += currentImpulseAcc > 0 ? 1 : 0;

      // Draw all elements
      drawFrame();
      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const pState = stateRef.current.pressure;
      const widthLimit = (width * containerVolume) / 100;

      // Draw Grid inside the active volume with clean contrast
      ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < widthLimit; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(widthLimit, y);
        ctx.stroke();
      }

      // Draw collision ripples (Fading red rings)
      pState.ripples.forEach((r) => {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(220, 38, 38, ${r.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });

      // Draw Molecules
      pState.particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw tiny velocity vector tail
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 1.5, p.y - p.vy * 1.5);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw Container Boundaries
      ctx.strokeStyle = "rgba(100, 116, 139, 0.2)";
      ctx.lineWidth = 3;
      
      // Top wall
      ctx.beginPath();
      ctx.moveTo(0, 1.5);
      ctx.lineTo(widthLimit, 1.5);
      ctx.stroke();

      // Bottom wall
      ctx.beginPath();
      ctx.moveTo(0, height - 1.5);
      ctx.lineTo(widthLimit, height - 1.5);
      ctx.stroke();

      // Left fixed wall
      ctx.beginPath();
      ctx.moveTo(1.5, 0);
      ctx.lineTo(1.5, height);
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw Movable Piston at x = widthLimit
      ctx.fillStyle = "#dc2626"; // high contrast red for piston
      ctx.fillRect(widthLimit - 6, 0, 8, height);

      // Draw Piston Shaft representing the compression lever
      ctx.fillStyle = "rgba(30, 41, 59, 0.8)";
      ctx.fillRect(widthLimit + 2, height / 2 - 6, width - widthLimit, 12);
      ctx.strokeStyle = "#1e293b";
      ctx.strokeRect(widthLimit + 2, height / 2 - 6, width - widthLimit, 12);

      // Volume boundary labels
      ctx.fillStyle = "#334155";
      ctx.font = "bold 9px monospace";
      ctx.fillText(`V = ${containerVolume}%`, widthLimit - 48, 16);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab, isPlaying, tempPressure, moleculeCount, containerVolume, showRipples]);

  // Periodic statistics updater for the pressure calculations & history graphing
  useEffect(() => {
    if (activeTab !== "pressure" || !isPlaying) return;

    const interval = setInterval(() => {
      const pState = stateRef.current.pressure;
      
      // Calculate realistic pressure base on PV = nRT
      const relativeVolume = containerVolume / 100;
      const calculatedAtm = (moleculeCount * tempPressure * 0.0001) / relativeVolume;
      const finalAtm = Math.round(calculatedAtm * 100) / 100;
      setPressureValue(finalAtm);

      // Simulated collision frequency
      const simulatedFreq = Math.round(pState.rollingCollisions * (4 / relativeVolume));
      setCollisionFreq(simulatedFreq);
      pState.rollingCollisions = 0; // reset window count

      // Update historical trend chart (Max 20 items)
      setPressureHistory((prev) => {
        const next = [...prev, { x: prev.length, y: finalAtm }];
        if (next.length > 20) {
          next.shift();
        }
        return next;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [activeTab, isPlaying, tempPressure, moleculeCount, containerVolume]);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white text-slate-900 rounded-3xl overflow-hidden border-2 border-slate-250 border-b-[6px] border-b-slate-350 shadow-sm animate-fade-in" id="lesson8-sim">
      {/* Simulation Header */}
      <div className="bg-gradient-to-r from-cyan-50 via-slate-50 to-cyan-100/40 px-6 py-4 border-b-2 border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="inline-block text-[10px] font-mono bg-cyan-100/80 text-cyan-800 px-3 py-1 rounded-full border border-cyan-300 font-black tracking-widest uppercase">
            Phòng Thí Nghiệm Ảo Động Lực Học
          </span>
          <h2 className="text-md sm:text-lg font-black tracking-tight text-slate-950 uppercase flex items-center gap-2 mt-1">
            <Activity className="h-5 w-5 text-cyan-600 animate-pulse" />
            Mô phỏng tương tác bài 8
          </h2>
        </div>

        {/* Dynamic Mode Switcher */}
        <div className="flex bg-slate-100/80 p-1 rounded-2xl border border-slate-250 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab("brownian")}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-xl text-xs font-black tracking-wider transition-all cursor-pointer ${
              activeTab === "brownian"
                ? "bg-gradient-to-b from-cyan-400 to-cyan-500 text-slate-950 shadow-sm border border-cyan-500"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            1. Chuyển Động Brown
          </button>
          <button
            onClick={() => setActiveTab("pressure")}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-xl text-xs font-black tracking-wider transition-all cursor-pointer ${
              activeTab === "pressure"
                ? "bg-gradient-to-b from-cyan-400 to-cyan-500 text-slate-950 shadow-sm border border-cyan-500"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            2. Nguồn Gốc Áp Suất Khí
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Simulation Interactive Canvas Screen */}
        <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r-2 border-slate-200 bg-white flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-cyan-800 font-mono tracking-widest uppercase flex items-center gap-1.5">
                <Columns className="h-4 w-4 shrink-0" />
                KHÔNG GIAN KIỂM CHỨNG LÍ THUYẾT (VẬT LÍ 12)
              </span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-mono text-slate-600 font-bold uppercase">MÔ PHỎNG ĐÀN HỒI THỜI GIAN THỰC</span>
              </div>
            </div>

            {/* Simulated Stage Wrapper with 3D border and light theme bg */}
            <div className="relative border-2 border-slate-250 rounded-3xl overflow-hidden bg-white shadow-inner flex items-center justify-center">
              {activeTab === "brownian" ? (
                <canvas
                  ref={canvasRef1}
                  width={420}
                  height={280}
                  className="w-full h-auto object-cover max-w-full block bg-slate-50"
                />
              ) : (
                <canvas
                  ref={canvasRef2}
                  width={420}
                  height={280}
                  className="w-full h-auto object-cover max-w-full block bg-slate-50"
                />
              )}

              {/* Master Play/Pause Overlay status */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-slate-50/75 backdrop-blur-sm flex flex-col items-center justify-center space-y-2">
                  <Pause className="h-10 w-10 text-slate-400 animate-pulse" />
                  <span className="text-xs text-slate-800 font-black font-mono">ĐÃ TẠM DỪNG MÔ PHỎNG</span>
                </div>
              )}
            </div>
          </div>

          {/* Canvas Controls Bar */}
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border-2 border-slate-200 gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all border-2 cursor-pointer ${
                  isPlaying
                    ? "bg-gradient-to-b from-amber-400 to-amber-500 border-amber-500 text-slate-950 border-b-[4px] border-b-amber-600 hover:translate-y-[1px] hover:border-b-[3px]"
                    : "bg-gradient-to-b from-cyan-400 to-cyan-500 border-cyan-500 text-slate-950 border-b-[4px] border-b-cyan-600 hover:translate-y-[1px] hover:border-b-[3px]"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 fill-current shrink-0" /> Tạm dừng
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current shrink-0" /> Tiếp tục
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (activeTab === "brownian") {
                    resetBrownianPosition();
                  } else {
                    stateRef.current.pressure.totalCollisions = 0;
                    setPressureHistory([]);
                  }
                }}
                className="px-4 py-2 bg-gradient-to-b from-slate-50 to-slate-100 border-2 border-slate-300 border-b-[4px] border-b-slate-400 hover:translate-y-[1px] hover:border-b-[3px] active:translate-y-[2px] active:border-b-[1px] text-slate-800 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all"
                title="Đặt lại hạt khói về tọa độ gốc"
              >
                <RotateCcw className="h-4 w-4 shrink-0" /> Đặt lại
              </button>
            </div>

            {/* Quick stats indicator */}
            <div className="text-right">
              {activeTab === "brownian" ? (
                <div className="text-xs font-mono text-slate-700 font-bold">
                  Độ dời trung bình hạt khói:{" "}
                  <span className="text-cyan-700 font-black text-sm">{meanDisplacement}</span> nm
                </div>
              ) : (
                <div className="text-xs font-mono text-slate-700 font-bold">
                  Số va chạm tích lũy:{" "}
                  <span className="text-rose-600 font-black text-sm">
                    {stateRef.current.pressure.totalCollisions}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Sliders, Metrics & Graphing dashboards */}
        <div className="lg:col-span-5 p-6 bg-slate-50/70 flex flex-col justify-between space-y-6">
          
          {/* Active Mode Description Box */}
          {activeTab === "brownian" ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-b from-slate-100/80 to-slate-200/40 border-2 border-slate-200 border-b-[4px] border-b-slate-300 p-4 rounded-2xl space-y-1.5">
                <h4 className="text-xs font-black text-slate-950 uppercase flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
                  Mô tả chuyển động dích dắc của Brown
                </h4>
                <p className="text-[11px] text-slate-800 font-semibold leading-relaxed">
                  Chùm tia sáng mạnh giúp phát hiện các hạt khói lơ lửng dính dắc. Do kích thước phân tử khí quá nhỏ để có thể nhìn thấy, hạt khói (màu vàng) đóng vai trò làm thước đo thực nghiệm chứng tỏ lực đẩy không cân bằng do va chạm phân tử ngẫu nhiên tạo ra.
                </p>
              </div>

              {/* SLIDERS FOR BROWNIAN */}
              <div className="space-y-4 bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm">
                <div className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                  Cấu hình tham số môi trường
                </div>

                {/* Slider 1: Temperature */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Nhiệt độ phòng (T)</span>
                    <span className="text-amber-600 font-black font-mono">{tempBrownian} K ({Math.round(tempBrownian - 273)} °C)</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="800"
                    step="20"
                    value={tempBrownian}
                    onChange={(e) => setTempBrownian(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                    <span>100 K (Cực lạnh)</span>
                    <span>800 K (Cực nóng)</span>
                  </div>
                </div>

                {/* Slider 2: Smoke Size */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Kích thước hạt khói (R)</span>
                    <span className="text-cyan-700 font-black font-mono">{smokeSize} µm</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="22"
                    step="1"
                    value={smokeSize}
                    onChange={(e) => setSmokeSize(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                    <span>6 µm (Hạt rất nhỏ)</span>
                    <span>22 µm (Hạt khói lớn)</span>
                  </div>
                </div>

                {/* Slider 3: Air Density */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Mật độ phân tử không khí</span>
                    <span className="text-indigo-700 font-black font-mono">{gasDensity} hạt / dm³</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={gasDensity}
                    onChange={(e) => setGasDensity(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowGasMolecules(!showGasMolecules)}
                  className={`py-2 px-3 border-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    showGasMolecules
                      ? "bg-gradient-to-b from-cyan-100 to-cyan-200 border-cyan-400 text-cyan-900 border-b-[4px] border-b-cyan-500 hover:translate-y-[1px] hover:border-b-[3px]"
                      : "bg-gradient-to-b from-slate-50 to-slate-100 border-slate-300 text-slate-500 border-b-[4px] border-b-slate-400 hover:translate-y-[1px] hover:border-b-[3px]"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5 shrink-0" />
                  {showGasMolecules ? "Hiện phân tử khí" : "Ẩn phân tử khí"}
                </button>

                <button
                  onClick={() => setShowVectors(!showVectors)}
                  className={`py-2 px-3 border-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    showVectors
                      ? "bg-gradient-to-b from-rose-100 to-rose-200 border-rose-400 text-rose-900 border-b-[4px] border-b-rose-500 hover:translate-y-[1px] hover:border-b-[3px]"
                      : "bg-gradient-to-b from-slate-50 to-slate-100 border-slate-300 text-slate-500 border-b-[4px] border-b-slate-400 hover:translate-y-[1px] hover:border-b-[3px]"
                  }`}
                >
                  <Activity className="h-3.5 w-3.5 shrink-0" />
                  {showVectors ? "Hiện lực đẩy F" : "Ẩn lực đẩy F"}
                </button>
              </div>

              {/* Theoretical Insight Box */}
              <div className="bg-cyan-50 border-2 border-cyan-200/70 p-3.5 rounded-2xl text-[11px] text-cyan-950 leading-relaxed font-bold">
                <span className="font-black text-cyan-800 block mb-0.5">💡 KIỂM CHỨNG LÍ THUYẾT:</span>
                Hãy giảm <strong className="text-cyan-950">kích thước hạt khói về 6µm</strong> và <strong className="text-cyan-950">tăng nhiệt độ lên 800K</strong>. Em sẽ thấy hạt khói chuyển động nhảy dồn dập vô cùng mạnh mẽ do quán tính nhỏ và động năng va chạm cực lớn! Ngược lại, nếu hạt khói lớn, lực va chạm triệt tiêu lẫn nhau, hạt hầu như không di chuyển.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* PRESSURE TAB PANEL */}
              <div className="bg-gradient-to-b from-slate-100/80 to-slate-200/40 border-2 border-slate-200 border-b-[4px] border-b-slate-300 p-4 rounded-2xl space-y-1.5">
                <h4 className="text-xs font-black text-slate-950 uppercase flex items-center gap-1.5">
                  <Gauge className="h-4 w-4 text-cyan-600 shrink-0" />
                  Giải thích cơ chế gây áp suất chất khí
                </h4>
                <p className="text-[11px] text-slate-800 font-semibold leading-relaxed">
                  Áp suất được sinh ra từ xung lượng truyền của hàng triệu hạt phân tử nảy lên thành bình. Khi nén thể tích hoặc tăng nhiệt độ, tần suất va chạm tăng vọt gây áp suất vĩ mô tăng.
                </p>
              </div>

              {/* THREE DYNAMIC SLIDERS (T, N, V) */}
              <div className="space-y-4 bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm">
                <div className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                  Biến đổi trạng thái khí (T, N, V)
                </div>

                {/* Slider 1: Temperature */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Nhiệt độ bình chứa (T)</span>
                    <span className="text-rose-600 font-black font-mono">{tempPressure} K ({Math.round(tempPressure - 273)} °C)</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="800"
                    step="20"
                    value={tempPressure}
                    onChange={(e) => setTempPressure(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>

                {/* Slider 2: Molecules Count (Density multiplier) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Số lượng phân tử (N)</span>
                    <span className="text-indigo-700 font-black font-mono">{moleculeCount} phân tử</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="90"
                    step="5"
                    value={moleculeCount}
                    onChange={(e) => setMoleculeCount(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                </div>

                {/* Slider 3: Volume (Piston slider position) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Thể tích bình chứa (V)</span>
                    <span className="text-amber-600 font-black font-mono">{containerVolume}% thể tích tối đa</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="2"
                    value={containerVolume}
                    onChange={(e) => setContainerVolume(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                    <span>V = 50% (Bị nén chặt)</span>
                    <span>V = 100% (Giãn rộng)</span>
                  </div>
                </div>
              </div>

              {/* REAL-TIME PRESSURE DIAL AND GRAPH DISPLAY */}
              <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm grid grid-cols-2 gap-4">
                
                {/* Dial indicator panel */}
                <div className="text-center flex flex-col items-center justify-center border-r-2 border-slate-200 pr-4">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Áp suất đo được</span>
                  <div className="text-2xl font-black font-mono text-rose-600 animate-pulse">{pressureValue} <span className="text-xs font-black">atm</span></div>
                  <div className="text-[10px] text-slate-700 font-mono font-bold mt-1">
                    ~ {collisionFreq} va chạm/s
                  </div>
                </div>

                {/* Simple Sparkline trend graph for PV state tracking */}
                <div className="flex flex-col justify-between">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Xu hướng áp suất (P)</span>
                  <div className="h-12 flex items-end gap-0.5 bg-slate-100 rounded-lg p-1.5 border-2 border-slate-200">
                    {pressureHistory.length === 0 ? (
                      <div className="w-full text-center text-[8px] text-slate-500 my-auto font-bold">Đang đo lường...</div>
                    ) : (
                      pressureHistory.map((pt, i) => {
                        const h = Math.min(100, Math.max(10, (pt.y / 4) * 80)); // scale height
                        return (
                          <div
                            key={i}
                            className="flex-1 bg-rose-500 rounded-t-sm"
                            style={{ height: `${h}%` }}
                            title={`P = ${pt.y} atm`}
                          />
                        );
                      })
                    )}
                  </div>
                  <div className="flex justify-between text-[8px] font-bold font-mono text-slate-500">
                    <span>Thời gian</span>
                    <span className="text-rose-600">Pmax: {Math.max(...(pressureHistory.map(p => p.y).concat([1.2])))}</span>
                  </div>
                </div>

              </div>

              {/* Scientific Law Verifier Selector */}
              <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm space-y-2.5">
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 block">Định luật liên đới khí lí tưởng</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setLawVerification("boyle");
                      setContainerVolume(50); // instantly compress to see Boyle's
                    }}
                    className={`flex-1 py-2 rounded-xl text-[10px] font-black border-2 transition-all cursor-pointer ${
                      lawVerification === "boyle"
                        ? "bg-gradient-to-b from-cyan-100 to-cyan-200 border-cyan-400 text-cyan-950 border-b-[4px] border-b-cyan-500 hover:translate-y-[1px] hover:border-b-[3px]"
                        : "bg-gradient-to-b from-slate-50 to-slate-100 border-slate-200 text-slate-600 border-b-[4px] border-b-slate-300 hover:translate-y-[1px] hover:border-b-[3px]"
                    }`}
                  >
                    Định luật Boyle (<FormattedMathText text="p \propto 1/V" />)
                  </button>
                  <button
                    onClick={() => {
                      setLawVerification("charles");
                      setTempPressure(600); // instantly heat up to see Charles
                    }}
                    className={`flex-1 py-2 rounded-xl text-[10px] font-black border-2 transition-all cursor-pointer ${
                      lawVerification === "charles"
                        ? "bg-gradient-to-b from-rose-100 to-rose-200 border-rose-400 text-rose-950 border-b-[4px] border-b-rose-500 hover:translate-y-[1px] hover:border-b-[3px]"
                        : "bg-gradient-to-b from-slate-50 to-slate-100 border-slate-200 text-slate-600 border-b-[4px] border-b-slate-300 hover:translate-y-[1px] hover:border-b-[3px]"
                    }`}
                  >
                    Định luật Charles (<FormattedMathText text="p \propto T" />)
                  </button>
                </div>
                
                <p className="text-[10.5px] text-slate-800 leading-relaxed font-bold">
                  {lawVerification === "boyle" ? (
                    <span>
                      👉 Khi giữ nhiệt độ <FormattedMathText text="T" /> không đổi, nén thể tích <FormattedMathText text="V" /> giảm mạnh làm mật độ hạt tăng lên, các hạt bay quãng đường ngắn hơn và nảy va chạm liên tiếp lên piston khiến áp suất <FormattedMathText text="p" /> tăng vọt tỉ lệ nghịch.
                    </span>
                  ) : (
                    <span>
                      👉 Khi giữ thể tích <FormattedMathText text="V" /> không đổi, nung nóng nhiệt độ tuyệt đối <FormattedMathText text="T" /> làm tăng trung bình bình phương tốc độ phân tử khí <FormattedMathText text="v^2" />, chúng dội vào thành bình mạnh mẽ dồn dập hơn khiến áp suất <FormattedMathText text="p" /> tăng tỉ lệ thuận.
                    </span>
                  )}
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Simulation Footer summary block */}
      <div className="bg-gradient-to-r from-slate-100 to-slate-200/50 border-t-2 border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-slate-800 font-bold">
        <div className="flex items-center gap-2">
          <Info className="h-4.5 w-4.5 text-cyan-600 shrink-0 animate-pulse" />
          <p className="leading-relaxed text-[11px]">
            {activeTab === "brownian" 
              ? "Ý nghĩa: Thí nghiệm Brown chứng tỏ các chất chuyển động nhiệt hỗn loạn liên tục, nhiệt độ càng cao thì tốc độ va chạm càng tăng."
              : "Ý nghĩa: Áp suất bình chứa được cấu thành từ tổng hợp lực va chạm đàn hồi của vô số phân tử chuyển động tự do lên thành bình."
            }
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono bg-white px-3 py-1.5 rounded-xl border-2 border-slate-250 text-[10px] text-slate-800">
            Hệ số Va chạm: Đàn hồi lý tưởng (e = 1)
          </span>
        </div>
      </div>
    </div>
  );
}
