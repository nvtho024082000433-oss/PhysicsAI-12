import React, { useState, useEffect, useRef } from "react";
import { 
  Zap, 
  Play, 
  RotateCcw, 
  Gauge, 
  Sliders, 
  HelpCircle, 
  Info, 
  Cpu, 
  Activity, 
  ShieldAlert,
  Flame,
  Bomb,
  Settings,
  ChevronRight
} from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

// Types for particles in our simulation
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "neutron" | "u235" | "u238" | "fragment" | "deuterium" | "tritium" | "helium" | "control_rod" | "spark" | "energy_text" | "photon";
  radius: number;
  color: string;
  state?: "stable" | "excited" | "split" | "captured" | "absorbed";
  shakeAmt?: number;
  absorbedNeutron?: boolean;
  spawnTime?: number;
  opacity?: number;
  text?: string;
  age?: number;
  maxAge?: number;
}

export function Lesson22Simulation() {
  const [simulationType, setSimulationType] = useState<"fission_single" | "fission_chain" | "fusion">("fission_single");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Fission States
  const [enrichment, setEnrichment] = useState<number>(50); // % of U-235 versus U-238 (0 to 100)
  const [controlRods, setControlRods] = useState<number>(20); // Insertion depth of control rods (%)
  const [reactionState, setReactionState] = useState<"idle" | "running" | "exploded" | "stabilized" | "died_out">("idle");
  const [totalFissions, setTotalFissions] = useState<number>(0);
  const [activeNeutrons, setActiveNeutrons] = useState<number>(0);

  // Fusion States
  const [fusionTemp, setFusionTemp] = useState<number>(40); // Temperature in Million Kelvin (10 to 150)
  const [fusionState, setFusionState] = useState<"idle" | "rushing" | "repelled" | "fused" | "exploded">("idle");
  const [fusionEnergy, setFusionEnergy] = useState<number>(0); // MeV
  const [fusionPressure, setFusionPressure] = useState<number>(50); // Pressure in atm (10 to 100)
  const [successfulFusions, setSuccessfulFusions] = useState<number>(0); // Successful reactions count
  const [fusionActive, setFusionActive] = useState<boolean>(false); // Trigger state
  const [furnaceActivated, setFurnaceActivated] = useState<boolean>(false); // Furnace pre-activation state

  // Real-time physical fusion power and energy states
  const [fusionPower, setFusionPower] = useState<number>(0); // MW
  const [accumulatedEnergy, setAccumulatedEnergy] = useState<number>(0); // MJ
  const [qFactor, setQFactor] = useState<number>(0); // Q
  const accumulatedEnergyRef = useRef<number>(0);

  // Animation frame reference
  const requestRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const particleIdCounter = useRef<number>(0);
  const isRunningRef = useRef<boolean>(false);
  const shakeIntensityRef = useRef<number>(0);
  const flashOpacityRef = useRef<number>(0);

  // Fission chain history for visual plotting
  const [history, setHistory] = useState<number[]>([]);

  // Energy history for Recharts line chart
  const [energyHistory, setEnergyHistory] = useState<{ time: number; energy: number }[]>([]);
  const [timeStep, setTimeStep] = useState<number>(0);

  const totalFissionsRef = useRef<number>(0);
  const fusionEnergyRef = useRef<number>(0);

  // Synchronize refs with state for reliable interval access without stale closure
  useEffect(() => {
    totalFissionsRef.current = totalFissions;
  }, [totalFissions]);

  useEffect(() => {
    fusionEnergyRef.current = fusionEnergy;
  }, [fusionEnergy]);

  // Interval timer to record energy growth history for Recharts
  useEffect(() => {
    let intervalId: any = null;
    
    const isFissionActive = (simulationType === "fission_single" || simulationType === "fission_chain") && reactionState === "running";
    const isFusionActive = simulationType === "fusion" && fusionActive;
    
    if (isFissionActive || isFusionActive) {
      intervalId = setInterval(() => {
        setTimeStep(prevStep => {
          const nextStep = Number((prevStep + 0.5).toFixed(1));
          
          setEnergyHistory(prevHistory => {
            let currentEnergy = 0;
            if (simulationType === "fission_single" || simulationType === "fission_chain") {
              currentEnergy = totalFissionsRef.current * 200; // 200 MeV per fission
            } else if (simulationType === "fusion") {
              currentEnergy = fusionEnergyRef.current; // Cumulative fusion energy in MeV
            }
            
            const newHistory = [...prevHistory, { time: nextStep, energy: Math.round(currentEnergy * 10) / 10 }];
            if (newHistory.length > 30) {
              return newHistory.slice(-30);
            }
            return newHistory;
          });
          
          return nextStep;
        });
      }, 500);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [simulationType, reactionState, fusionActive]);

  // Trigger sound effect or visual shockwave
  const [shockwaves, setShockwaves] = useState<{ x: number; y: number; r: number; maxR: number; opacity: number }[]>([]);

  // Custom high-energy thermal radiation waves and ambient glow
  const [thermalWaves, setThermalWaves] = useState<{ x: number; y: number; r: number; maxR: number; opacity: number; color: string; speed: number; lineWidth: number }[]>([]);
  const [thermalGlow, setThermalGlow] = useState<number>(0);

  const addThermalWave = (x: number, y: number, color: string, speed: number, maxRadius: number, lineWidth: number) => {
    setThermalWaves(prev => [
      ...prev,
      { x, y, r: 5, maxR: maxRadius, opacity: 1.0, color, speed, lineWidth }
    ]);
  };

  useEffect(() => {
    // Reset simulation on type change
    resetSimulation();
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [simulationType]);

  const resetSimulation = () => {
    isRunningRef.current = false;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    particlesRef.current = [];
    particleIdCounter.current = 0;
    shakeIntensityRef.current = 0;
    flashOpacityRef.current = 0;
    setShockwaves([]);
    setThermalWaves([]);
    setThermalGlow(0);
    setHistory([]);
    setTotalFissions(0);
    setActiveNeutrons(0);
    setReactionState("idle");
    setFusionState("idle");
    setFusionEnergy(0);
    setSuccessfulFusions(0);
    setFusionActive(false);
    setFurnaceActivated(false);
    setFusionPower(0);
    setAccumulatedEnergy(0);
    setQFactor(0);
    accumulatedEnergyRef.current = 0;

    // Reset energy chart states and refs
    setEnergyHistory([]);
    setTimeStep(0);
    totalFissionsRef.current = 0;
    fusionEnergyRef.current = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (simulationType === "fission_single") {
      setupSingleFission();
      draw();
    } else if (simulationType === "fission_chain") {
      setupChainFission();
      draw();
    } else {
      setupFusion();
      isRunningRef.current = true;
      animate();
    }
  };

  const setupSingleFission = () => {
    particlesRef.current = [];
    // Place a single heavy U-235 cluster at the center
    const canvas = canvasRef.current;
    if (!canvas) return;

    // We don't represent U-235 as a single ball, we draw a clump of protons and neutrons
    // But to manage collisions easily, we place a master invisible target particle
    particlesRef.current.push({
      id: ++particleIdCounter.current,
      x: canvas.width / 2 + 30,
      y: canvas.height / 2,
      vx: 0,
      vy: 0,
      type: "u235",
      radius: 40,
      color: "#ef4444",
      state: "stable",
      shakeAmt: 0
    });
  };

  const setupChainFission = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = [];
    const rows = 6;
    const cols = 8;
    const spacingX = (canvas.width - 80) / cols;
    const spacingY = (canvas.height - 100) / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = 50 + c * spacingX + Math.random() * 10 - 5;
        const y = 50 + r * spacingY + Math.random() * 10 - 5;
        
        // Decide if U-235 or U-238 based on Enrichment %
        const isU235 = Math.random() * 100 < enrichment;

        particlesRef.current.push({
          id: ++particleIdCounter.current,
          x,
          y,
          vx: 0,
          vy: 0,
          type: isU235 ? "u235" : "u238",
          radius: 12,
          color: isU235 ? "#ef4444" : "#64748b",
          state: "stable",
          shakeAmt: 0
        });
      }
    }
  };

  const setupFusion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = [];
    setFusionState("idle");
    setFusionEnergy(0);
    setSuccessfulFusions(0);
    setFusionActive(false);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const tokamakRadius = 150;
    
    const numD = Math.floor(fusionPressure * 0.15) + 3;
    const numT = Math.floor(fusionPressure * 0.15) + 3;
    const speed = (fusionTemp / 35) + 1.0;

    for (let i = 0; i < numD; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * (tokamakRadius - 30);
      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * r;
      const vAngle = Math.random() * Math.PI * 2;
      particlesRef.current.push({
        id: ++particleIdCounter.current,
        x: px,
        y: py,
        vx: Math.cos(vAngle) * speed,
        vy: Math.sin(vAngle) * speed,
        type: "deuterium",
        radius: 8,
        color: "#3b82f6"
      });
    }

    for (let i = 0; i < numT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * (tokamakRadius - 30);
      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * r;
      const vAngle = Math.random() * Math.PI * 2;
      particlesRef.current.push({
        id: ++particleIdCounter.current,
        x: px,
        y: py,
        vx: Math.cos(vAngle) * speed,
        vy: Math.sin(vAngle) * speed,
        type: "tritium",
        radius: 9,
        color: "#ef4444"
      });
    }
  };

  // Start/Trigger helper
  const triggerSimulation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (simulationType === "fission_single") {
      // Fire a single neutron from left
      particlesRef.current = particlesRef.current.filter(p => p.type !== "neutron");
      particlesRef.current.push({
        id: ++particleIdCounter.current,
        x: 20,
        y: canvas.height / 2,
        vx: 3.5,
        vy: 0,
        type: "neutron",
        radius: 4,
        color: "#f59e0b"
      });
      setReactionState("running");
      isRunningRef.current = true;
      animate();
    } else if (simulationType === "fission_chain") {
      // Clear previous neutrons and fire 3 trigger neutrons from the left to start chain reaction
      particlesRef.current = particlesRef.current.filter(p => p.type !== "neutron");
      
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          id: ++particleIdCounter.current,
          x: 10 + Math.random() * 15,
          y: (canvas.height / 4) * (i + 1) + Math.random() * 20 - 10,
          vx: 2.5 + Math.random() * 1,
          vy: Math.random() * 1 - 0.5,
          type: "neutron",
          radius: 4,
          color: "#f59e0b"
        });
      }

      setReactionState("running");
      isRunningRef.current = true;
      animate();
    } else if (simulationType === "fusion") {
      setFusionActive(true);
      setFusionState("rushing");
    }
  };

  // Main simulation loop
  const animate = () => {
    if (!isRunningRef.current) return;
    updatePhysics();
    draw();
    requestRef.current = requestAnimationFrame(animate);
  };

  const addShockwave = (x: number, y: number, maxRadius: number = 60) => {
    setShockwaves(prev => [
      ...prev,
      { x, y, r: 2, maxR: maxRadius, opacity: 1.0 }
    ]);
  };

  const updatePhysics = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;

    // Decay screen flash and shake
    if (flashOpacityRef.current > 0) {
      flashOpacityRef.current = Math.max(0, flashOpacityRef.current - 0.035);
    }
    if (shakeIntensityRef.current > 0) {
      shakeIntensityRef.current = Math.max(0, shakeIntensityRef.current * 0.9);
    }

    // Move and update custom VFX particles (sparks, floating text, photons)
    particlesRef.current.forEach(p => {
      if (p.type === "spark") {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95; // drag
        p.vy *= 0.95;
        p.age = (p.age || 0) + 1;
        p.opacity = Math.max(0, 1.0 - (p.age / (p.maxAge || 1)));
        if (p.age >= (p.maxAge || 1)) {
          p.state = "captured";
        }
      } else if (p.type === "energy_text") {
        p.x += p.vx;
        p.y += p.vy;
        p.age = (p.age || 0) + 1;
        p.opacity = Math.max(0, 1.0 - (p.age / (p.maxAge || 1)));
        if (p.age >= (p.maxAge || 1)) {
          p.state = "captured";
        }
      } else if (p.type === "photon") {
        p.age = (p.age || 0) + 1;
        const baseAngle = p.shakeAmt || 0;
        const speed = 4.2;
        const distTraveled = p.age * speed;
        // High frequency sine wave oscillation to represent high-energy gamma photon wave packet
        const waveOffset = Math.sin(p.age * 0.45) * 8.5;
        
        // Calculate coordinate: base ray path + transverse offset vector
        const baseX = width / 2 + Math.cos(baseAngle) * distTraveled;
        const baseY = height / 2 + Math.sin(baseAngle) * distTraveled;
        
        // Transverse vector direction: (-sin(angle), cos(angle))
        p.x = baseX - Math.sin(baseAngle) * waveOffset;
        p.y = baseY + Math.cos(baseAngle) * waveOffset;
        
        p.opacity = Math.max(0, 1.0 - (p.age / (p.maxAge || 1)));
        if (p.age >= (p.maxAge || 1)) {
          p.state = "captured";
        }
      }
    });

    // Clean up finished VFX particles
    particlesRef.current = particlesRef.current.filter(p => {
      if ((p.type === "spark" || p.type === "energy_text" || p.type === "photon") && p.state === "captured") return false;
      return true;
    });

    // 1. Update shockwaves
    setShockwaves(prev => 
      prev
        .map(sw => ({ ...sw, r: sw.r + 2, opacity: sw.opacity - 0.04 }))
        .filter(sw => sw.opacity > 0)
    );

    // Update thermal waves (high-energy heat dissipation waves)
    setThermalWaves(prev => 
      prev
        .map(tw => ({ ...tw, r: tw.r + tw.speed, opacity: tw.opacity - (tw.speed / tw.maxR) * 0.9 }))
        .filter(tw => tw.opacity > 0 && tw.r < tw.maxR)
    );

    // Slowly decay the ambient thermal heat glow
    if (thermalGlow > 0) {
      setThermalGlow(prev => Math.max(0, prev - 1.2));
    }

    // 2. Fission Single Logic
    if (simulationType === "fission_single") {
      let u235 = particlesRef.current.find(p => p.type === "u235");
      let neutron = particlesRef.current.find(p => p.type === "neutron");

      // Collision check
      if (u235 && neutron && u235.state === "stable") {
        const dx = neutron.x - u235.x;
        const dy = neutron.y - u235.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < u235.radius + neutron.radius) {
          // Neutron absorbed!
          u235.state = "excited";
          u235.shakeAmt = 1.5;
          u235.spawnTime = Date.now();
          // Remove neutron
          particlesRef.current = particlesRef.current.filter(p => p.id !== neutron?.id);
          addShockwave(u235.x, u235.y, 40);
        }
      }

      // Excited shaking & deforming
      if (u235 && u235.state === "excited") {
        u235.shakeAmt = (u235.shakeAmt || 0) + 0.15;
        const timeElapsed = Date.now() - (u235.spawnTime || 0);

        if (timeElapsed > 1200) {
          // Splitting trigger!
          u235.state = "split";
          setTotalFissions(1);
          addShockwave(u235.x, u235.y, 100);

          // Add screen flash and camera shake
          flashOpacityRef.current = 0.8;
          shakeIntensityRef.current = 12;

          // Spawn floating energy badge
          particlesRef.current.push({
            id: ++particleIdCounter.current,
            x: u235.x,
            y: u235.y - 25,
            vx: 0,
            vy: -0.8,
            type: "energy_text",
            radius: 0,
            color: "#a855f7",
            text: "+200 MeV",
            opacity: 1.0,
            age: 0,
            maxAge: 90
          });

          // Spawn 25 fission sparkles
          for (let i = 0; i < 25; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.0 + Math.random() * 4.5;
            particlesRef.current.push({
              id: ++particleIdCounter.current,
              x: u235.x,
              y: u235.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              type: "spark",
              radius: 1.5 + Math.random() * 3,
              color: i % 3 === 0 ? "#ffffff" : i % 3 === 1 ? "#a855f7" : "#10b981", // white, purple, green
              opacity: 1.0,
              age: 0,
              maxAge: 35 + Math.random() * 25
            });
          }

          // Spawn fragments flying left/right
          particlesRef.current.push({
            id: ++particleIdCounter.current,
            x: u235.x - 15,
            y: u235.y,
            vx: -1.5,
            vy: -0.5,
            type: "fragment",
            radius: 20,
            color: "#a855f7" // Purple fragment
          });

          particlesRef.current.push({
            id: ++particleIdCounter.current,
            x: u235.x + 15,
            y: u235.y,
            vx: 1.5,
            vy: 0.5,
            type: "fragment",
            radius: 22,
            color: "#10b981" // Green fragment
          });

          // Spawn 3 neutrons flying at random directions
          for (let i = 0; i < 3; i++) {
            const angle = (Math.PI * 2 / 3) * i + Math.random() * 0.5 - 0.25;
            particlesRef.current.push({
              id: ++particleIdCounter.current,
              x: u235.x,
              y: u235.y,
              vx: Math.cos(angle) * 3,
              vy: Math.sin(angle) * 3,
              type: "neutron",
              radius: 4,
              color: "#f59e0b"
            });
          }

          // Remove excited nucleus
          particlesRef.current = particlesRef.current.filter(p => p.id !== u235?.id);
        }
      }

      // Move other particles (fragments, neutrons)
      particlesRef.current.forEach(p => {
        if (p.type === "neutron" || p.type === "fragment") {
          p.x += p.vx;
          p.y += p.vy;
        }
      });
    }

    // 3. Fission Chain Reaction Logic
    if (simulationType === "fission_chain") {
      const activeNList = particlesRef.current.filter(p => p.type === "neutron");
      setActiveNeutrons(activeNList.length);

      // Record history occasionally
      if (Math.random() < 0.1) {
        setHistory(prev => [...prev.slice(-30), activeNList.length]);
      }

      // Update reaction states based on neutron counts
      if (activeNList.length > 55) {
        setReactionState("exploded");
      } else if (activeNList.length === 0 && totalFissions > 0) {
        if (totalFissions > 15) {
          setReactionState("stabilized");
        } else {
          setReactionState("died_out");
        }
      }

      // Move neutrons and check collisions
      particlesRef.current.forEach(p => {
        if (p.type === "neutron") {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap or bounce off borders
          if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
            p.state = "captured"; // Mark for deletion
          }

          // Control Rod absorption check
          // Control rods are inserted from the top down. 
          // Let's model a control rod block in the middle: x from width/2 - 15 to width/2 + 15, depth from 0 to height * controlRods/100
          const rodWidth = 25;
          const rodLeft = width / 2 - rodWidth / 2;
          const rodRight = width / 2 + rodWidth / 2;
          const rodMaxY = (height * controlRods) / 100;

          if (p.x > rodLeft && p.x < rodRight && p.y < rodMaxY) {
            p.state = "captured"; // Absorbed by control rods!
          }
        }
      });

      // Handle neutron striking Uranium
      const neutrons = particlesRef.current.filter(p => p.type === "neutron" && !p.state);
      const nuclei = particlesRef.current.filter(p => p.type === "u235" || p.type === "u238");

      neutrons.forEach(n => {
        for (let u of nuclei) {
          if (u.state === "stable") {
            const dx = n.x - u.x;
            const dy = n.y - u.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < u.radius + n.radius) {
              n.state = "captured"; // Neutron absorbed

              if (u.type === "u235") {
                // Fission triggers instantly in chain mode
                u.state = "split";
                setTotalFissions(prev => prev + 1);
                addShockwave(u.x, u.y, 35);

                // Add small camera shake and sparkle feedback for chain split
                shakeIntensityRef.current = Math.min(10, shakeIntensityRef.current + 1.2);
                
                // Spawn a few fission sparks
                for (let i = 0; i < 4; i++) {
                  const angle = Math.random() * Math.PI * 2;
                  const speed = 0.8 + Math.random() * 2.5;
                  particlesRef.current.push({
                    id: ++particleIdCounter.current,
                    x: u.x,
                    y: u.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    type: "spark",
                    radius: 1.0 + Math.random() * 1.5,
                    color: i % 2 === 0 ? "#ffffff" : "#a855f7", // white and purple
                    opacity: 1.0,
                    age: 0,
                    maxAge: 20 + Math.random() * 12
                  });
                }

                // Spawn neutrons
                // 2 or 3 secondary neutrons (average around 2.4)
                const numSecondary = Math.random() < 0.4 ? 2 : 3;
                for (let i = 0; i < numSecondary; i++) {
                  const angle = Math.random() * Math.PI * 2;
                  const speed = 1.8 + Math.random() * 1.5;
                  particlesRef.current.push({
                    id: ++particleIdCounter.current,
                    x: u.x,
                    y: u.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    type: "neutron",
                    radius: 4,
                    color: "#f59e0b"
                  });
                }
              } else {
                // U-238 absorbs neutron and becomes U-239 stable (turns dark blue)
                u.type = "u235"; // Reuse property for drawing captured state
                u.state = "captured";
                u.color = "#1e3a8a"; // Dark blue
              }
              break;
            }
          }
        }
      });

      // Filter out captured neutrons and split nuclei
      particlesRef.current = particlesRef.current.filter(p => {
        if (p.type === "neutron" && p.state === "captured") return false;
        if (p.type === "u235" && p.state === "split") return false;
        return true;
      });
    }

    // 4. Fusion Logic
    if (simulationType === "fusion") {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const tokamakRadius = 150;

      // CONTINUOUS FUEL REPLENISHMENT - Maintains plasma density (pressure)
      const targetD = Math.floor(fusionPressure * 0.15) + 3;
      const targetT = Math.floor(fusionPressure * 0.15) + 3;
      let currentD = particlesRef.current.filter(p => p.type === "deuterium").length;
      let currentT = particlesRef.current.filter(p => p.type === "tritium").length;
      const speed = (fusionTemp / 35) + 1.0;

      while (currentD < targetD) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * (tokamakRadius - 30);
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;
        const vAngle = Math.random() * Math.PI * 2;
        particlesRef.current.push({
          id: ++particleIdCounter.current,
          x: px,
          y: py,
          vx: Math.cos(vAngle) * speed,
          vy: Math.sin(vAngle) * speed,
          type: "deuterium",
          radius: 8,
          color: "#3b82f6"
        });
        currentD++;
      }

      while (currentT < targetT) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * (tokamakRadius - 30);
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;
        const vAngle = Math.random() * Math.PI * 2;
        particlesRef.current.push({
          id: ++particleIdCounter.current,
          x: px,
          y: py,
          vx: Math.cos(vAngle) * speed,
          vy: Math.sin(vAngle) * speed,
          type: "tritium",
          radius: 9,
          color: "#ef4444"
        });
        currentT++;
      }

      // Calculate physical real-time fusion power, energy, and Q factor
      let livePower = 0;
      if (fusionActive && fusionTemp >= 40) {
        // Power increases with pressure squared and temperature-dependent cross section
        const tempFactor = Math.sin(((fusionTemp - 40) / 110) * Math.PI / 2);
        const basePower = 320 * Math.pow(fusionPressure / 100, 2) * Math.pow(tempFactor, 2.5);
        // Thermal turbulence fluctuations
        livePower = Math.max(0, basePower + (Math.random() - 0.5) * (basePower * 0.08));
      }
      setFusionPower(Number(livePower.toFixed(2)));

      // Q = P_fusion / P_heating. Heating power scales from ~17.5MW to 52.5MW
      const heatingPower = 15 + fusionTemp * 0.25;
      const liveQ = livePower / heatingPower;
      setQFactor(Number(liveQ.toFixed(2)));

      // Accumulated energy: E = Integral(P * dt). Runs at 60 FPS.
      const energyPerFrame = livePower / 60;
      accumulatedEnergyRef.current += energyPerFrame;
      setAccumulatedEnergy(Number(accumulatedEnergyRef.current.toFixed(1)));

      // Update active non-spark particles, applying confinement to charged particles (D, T, He)
      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.type === "deuterium" || p.type === "tritium" || p.type === "helium") {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > tokamakRadius - p.radius) {
            // Bounce off circular tokamak wall
            const nx = dx / dist;
            const ny = dy / dist;
            const dot = p.vx * nx + p.vy * ny;
            p.vx = p.vx - 2 * dot * nx;
            p.vy = p.vy - 2 * dot * ny;
            p.x = cx + nx * (tokamakRadius - p.radius - 2);
            p.y = cy + ny * (tokamakRadius - p.radius - 2);
          }
        }

        // Handle aging for sparked visuals, energy floating texts, or photon rays
        if (p.age !== undefined) {
          p.age++;
          if (p.maxAge && p.age > p.maxAge) {
            p.state = "split"; // mark for deletion
          }
        }
      });

      // Filter out split particles
      particlesRef.current = particlesRef.current.filter(p => p.state !== "split");

      // Collision checks between D and T to trigger nuclear fusion
      // Physical probability of tunneling/fusing based on thermal energy
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p1 = particlesRef.current[i];
        if (p1.state === "split" || p1.type !== "deuterium") continue;

        for (let j = 0; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          if (p2.state === "split" || p2.type !== "tritium") continue;

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = p1.radius + p2.radius;

          if (dist < minDist + 2) {
            // Quantum tunneling barrier factor:
            let fuseProb = 0;
            if (fusionActive) {
              if (fusionTemp < 40) {
                fuseProb = 0.08; // small probability under forced activation even if cold
              } else {
                fuseProb = 0.08 + 0.92 * Math.sin(((fusionTemp - 40) / 110) * Math.PI / 2);
              }
            } else {
              fuseProb = 0.0; // No fusion before active activation!
            }

            const willFuse = Math.random() < fuseProb;

            if (willFuse) {
              // TRIGGER HIGH-ENERGY FUSION!
              p1.state = "split";
              p2.state = "split";

              const mx = (p1.x + p2.x) / 2;
              const my = (p1.y + p2.y) / 2;

              // Camera shake, bright flash, shockwave
              flashOpacityRef.current = 0.85;
              shakeIntensityRef.current = 14;
              addShockwave(mx, my, 80);
              setSuccessfulFusions(prev => prev + 1);
              setFusionEnergy(prev => prev + 17.6);
              setFusionState("fused");

              // Rise localized thermal energy
              setThermalGlow(prev => Math.min(100, prev + 25));
              addThermalWave(mx, my, "rgba(251, 191, 36, 0.85)", 2.8, 160, 5);

              // Spawn ⁴He (yellow, radius = 12)
              const angle = Math.random() * Math.PI * 2;
              const vHe = 0.8;
              const vNeutron = 3.2; // 4x speed of helium-4 (conserve momentum)

              particlesRef.current.push({
                id: ++particleIdCounter.current,
                x: mx,
                y: my,
                vx: Math.cos(angle) * vHe,
                vy: Math.sin(angle) * vHe,
                type: "helium",
                radius: 12,
                color: "#eab308"
              });

              // Spawn Neutron (grey, radius = 4)
              particlesRef.current.push({
                id: ++particleIdCounter.current,
                x: mx,
                y: my,
                vx: -Math.cos(angle) * vNeutron,
                vy: -Math.sin(angle) * vNeutron,
                type: "neutron",
                radius: 4,
                color: "#94a3b8"
              });

              // Glowing green text "+17.6 MeV" rising up
              particlesRef.current.push({
                id: ++particleIdCounter.current,
                x: mx,
                y: my - 12,
                vx: 0,
                vy: -0.65,
                type: "energy_text",
                radius: 0,
                color: "#10b981",
                text: "+17.6 MeV",
                opacity: 1.0,
                age: 0,
                maxAge: 75
              });

              // Sparks burst
              for (let k = 0; k < 15; k++) {
                const spAngle = Math.random() * Math.PI * 2;
                const spSpeed = 1.2 + Math.random() * 4.0;
                particlesRef.current.push({
                  id: ++particleIdCounter.current,
                  x: mx,
                  y: my,
                  vx: Math.cos(spAngle) * spSpeed,
                  vy: Math.sin(spAngle) * spSpeed,
                  type: "spark",
                  radius: 1.2 + Math.random() * 2.8,
                  color: k % 3 === 0 ? "#ffffff" : k % 3 === 1 ? "#38bdf8" : "#f59e0b",
                  opacity: 1.0,
                  age: 0,
                  maxAge: 20 + Math.random() * 20
                });
              }

              // Photon gamma rays
              for (let k = 0; k < 3; k++) {
                const photAngle = Math.random() * Math.PI * 2;
                particlesRef.current.push({
                  id: ++particleIdCounter.current,
                  x: mx,
                  y: my,
                  vx: Math.cos(photAngle) * 4.2,
                  vy: Math.sin(photAngle) * 4.2,
                  type: "photon",
                  radius: 3.0,
                  color: "#c084fc",
                  opacity: 0.9,
                  age: 0,
                  maxAge: 80,
                  shakeAmt: photAngle
                });
              }

            } else {
              // Elastic bounce due to electrostatic Coulomb repulsion
              const nx = dx / dist;
              const ny = dy / dist;
              const kx = p1.vx - p2.vx;
              const ky = p1.vy - p2.vy;
              const pVal = 2 * (nx * kx + ny * ky) / 2;

              p1.vx -= pVal * nx;
              p1.vy -= pVal * ny;
              p2.vx += pVal * nx;
              p2.vy += pVal * ny;

              // Prevent overlap sticking
              const overlap = minDist - dist;
              p1.x -= nx * overlap * 0.55;
              p1.y -= ny * overlap * 0.55;
              p2.x += nx * overlap * 0.55;
              p2.y += ny * overlap * 0.55;
            }
          }
        }
      }

      // Cleanup particles marked for deletion (like fused D/T)
      particlesRef.current = particlesRef.current.filter(p => p.state !== "split");
    }
  };

  // Rendering
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear Canvas with nice starry space theme
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    if (shakeIntensityRef.current > 0) {
      const dx = (Math.random() - 0.5) * shakeIntensityRef.current;
      const dy = (Math.random() - 0.5) * shakeIntensityRef.current;
      ctx.translate(dx, dy);
    }

    // Draw grid lines
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 1;
    const gridSpacing = 40;
    for (let x = 0; x < canvas.width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw control rods insertion in Chain Fission
    if (simulationType === "fission_chain" && controlRods > 0) {
      const rodWidth = 25;
      const rodLeft = canvas.width / 2 - rodWidth / 2;
      const rodMaxY = (canvas.height * controlRods) / 100;

      // Draw Control Rod (steel-grey color)
      ctx.fillStyle = "#475569";
      ctx.fillRect(rodLeft, 0, rodWidth, rodMaxY);
      
      // Control Rod Border highlight
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(rodLeft, 0, rodWidth, rodMaxY);

      // Warning text
      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 8px monospace";
      ctx.fillText("THANH ĐIỀU KHIỂN (ROD)", rodLeft - 30, rodMaxY > 15 ? rodMaxY - 5 : 12);
    }

    // Draw Tokamak Magnetic Containment Chamber in Fusion
    if (simulationType === "fusion") {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const tokamakRadius = 150;

      // 1. Draw tokamak vacuum chamber background (very dark glowing circular grid or ring)
      ctx.save();
      const tokGrad = ctx.createRadialGradient(centerX, centerY, tokamakRadius - 40, centerX, centerY, tokamakRadius);
      tokGrad.addColorStop(0, "rgba(15, 23, 42, 0.45)");
      tokGrad.addColorStop(0.8, "rgba(30, 41, 59, 0.65)");
      tokGrad.addColorStop(1, "rgba(51, 65, 85, 0.85)");
      ctx.fillStyle = tokGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, tokamakRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw glowing magnetic field confinement rings (concentric neon circles representing magnetic lines)
      ctx.strokeStyle = (furnaceActivated || fusionActive) 
        ? "rgba(129, 140, 248, 0.75)" 
        : "rgba(99, 102, 241, 0.18)"; // brighter when activated
      ctx.lineWidth = 1.5;
      
      // If activated, make the dashes rotate/move dynamically!
      if (furnaceActivated || fusionActive) {
        ctx.setLineDash([10, 8]);
        ctx.lineDashOffset = (Date.now() / 40) % 18;
      } else {
        ctx.setLineDash([10, 8]);
      }
      
      for (let r = 50; r <= tokamakRadius - 20; r += 35) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]); // Reset
      ctx.lineDashOffset = 0;

      // 3. Draw magnetic coils outer border (the strong Tokamak magnets)
      ctx.strokeStyle = (furnaceActivated || fusionActive)
        ? "rgba(129, 140, 248, 0.9)" 
        : "rgba(99, 102, 241, 0.5)"; // brighter indigo
      ctx.lineWidth = 4;
      if (furnaceActivated || fusionActive) {
        ctx.shadowColor = "#6366f1";
        ctx.shadowBlur = 12;
      }
      ctx.beginPath();
      ctx.arc(centerX, centerY, tokamakRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      // Draw magnetic field labels
      ctx.fillStyle = "#818cf8";
      ctx.font = "bold 8px monospace";
      ctx.textAlign = "center";
      ctx.fillText("TỪ TRƯỜNG TOKAMAK (MAGNETIC CONFINEMENT)", centerX, centerY - tokamakRadius - 8);

      ctx.restore();
    }

    // Draw shockwaves
    shockwaves.forEach(sw => {
      ctx.strokeStyle = `rgba(255, 255, 255, ${sw.opacity})`;
      ctx.lineWidth = 3 * sw.opacity;
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
      ctx.stroke();

      // Inner flash glow
      ctx.fillStyle = `rgba(249, 115, 22, ${sw.opacity * 0.3})`;
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.r * 0.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw thermal waves (tỏa nhiệt nhiệt lượng cao)
    thermalWaves.forEach(tw => {
      const colorWithOpacity = tw.color.replace(/[\d\.]+\)$/, `${tw.opacity})`);
      ctx.strokeStyle = colorWithOpacity;
      ctx.lineWidth = tw.lineWidth * tw.opacity;
      ctx.beginPath();
      ctx.arc(tw.x, tw.y, tw.r, 0, Math.PI * 2);
      ctx.stroke();

      // Sóng đối lưu nhiệt phụ mờ ảo bên ngoài
      ctx.strokeStyle = `rgba(239, 68, 68, ${tw.opacity * 0.25})`;
      ctx.lineWidth = tw.lineWidth * 1.5 * tw.opacity;
      ctx.beginPath();
      ctx.arc(tw.x, tw.y, tw.r * 1.06, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw massive ambient thermal heat corona around the center when fusion finishes
    if (simulationType === "fusion" && thermalGlow > 0) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const glowRad = thermalGlow * 1.6;

      // 1. Vẽ quầng sáng nhiệt lan tỏa đa tầng
      const thermalGrad = ctx.createRadialGradient(cx, cy, 3, cx, cy, glowRad);
      thermalGrad.addColorStop(0, `rgba(255, 255, 255, ${thermalGlow / 100})`); // Tâm siêu nóng màu trắng
      thermalGrad.addColorStop(0.2, `rgba(254, 240, 138, ${(thermalGlow / 100) * 0.85})`); // Quầng vàng plasma
      thermalGrad.addColorStop(0.5, `rgba(249, 115, 22, ${(thermalGlow / 100) * 0.55})`); // Quầng cam rực
      thermalGrad.addColorStop(0.8, `rgba(239, 68, 68, ${(thermalGlow / 100) * 0.25})`); // Vòng đỏ ngoài cùng
      thermalGrad.addColorStop(1, "rgba(239, 68, 68, 0)"); // Biên giới nhiệt lượng tiêu tán
      
      ctx.fillStyle = thermalGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRad, 0, Math.PI * 2);
      ctx.fill();

      // 2. Vẽ các tai lửa hoặc tia bức xạ nhiệt xoáy (Solar-like flares / convective loops)
      ctx.save();
      ctx.translate(cx, cy);
      // Xoay liên tục theo thời gian tạo hiệu ứng cuộn xoáy của lửa plasma cực sống động
      ctx.rotate((Date.now() / 450) % (Math.PI * 2));
      const flaresCount = 14;
      for (let i = 0; i < flaresCount; i++) {
        const flareAngle = (i * Math.PI * 2) / flaresCount;
        const flareLen = (35 + Math.sin(Date.now() / 80 + i) * 12) * (thermalGlow / 100);
        
        // Vẽ dòng đối lưu uốn lượn
        ctx.strokeStyle = i % 2 === 0 ? "rgba(254, 240, 138, 0.5)" : "rgba(249, 115, 22, 0.45)";
        ctx.lineWidth = 3.5 * (thermalGlow / 100);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(
          Math.cos(flareAngle + 0.35) * (flareLen * 0.55),
          Math.sin(flareAngle + 0.35) * (flareLen * 0.55),
          Math.cos(flareAngle) * flareLen,
          Math.sin(flareAngle) * flareLen
        );
        ctx.stroke();
      }
      ctx.restore();
    }

    // Draw particles
    particlesRef.current.forEach(p => {
      ctx.save();

      if (p.type === "u235") {
        if (p.state === "excited") {
          // Vibrate
          const sx = (Math.random() - 0.5) * (p.shakeAmt || 0);
          const sy = (Math.random() - 0.5) * (p.shakeAmt || 0);
          ctx.translate(sx, sy);

          // Draw as elongated dumbbell shape in excited state
          const stretch = Math.min(2.0, 1.0 + (p.shakeAmt || 0) * 0.05);
          ctx.translate(p.x, p.y);
          ctx.scale(stretch, 1 / stretch);
          drawNucleusCluster(ctx, 0, 0, p.radius, true);
        } else {
          // Draw stable cluster at (x, y)
          drawNucleusCluster(ctx, p.x, p.y, p.radius, true);
        }
      } else if (p.type === "u238") {
        // Draw U-238 cluster (grey)
        drawNucleusCluster(ctx, p.x, p.y, p.radius, false);
      } else if (p.type === "deuterium") {
        // Draw Deuterium: Blue glowing circle for fusion mode, or original clump for fission
        if (simulationType === "fusion") {
          ctx.save();
          const grad = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, p.radius);
          grad.addColorStop(0, "#93c5fd"); // light blue
          grad.addColorStop(0.7, "#3b82f6"); // blue
          grad.addColorStop(1, "rgba(59, 130, 246, 0.1)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.strokeStyle = "#3b82f6";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // D text inside
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 7px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("²H", p.x, p.y);
          ctx.restore();
        } else {
          // Draw 1 Proton (red) and 1 Neutron (blue)
          drawNuclonClump(ctx, p.x, p.y, 1, 1, p.radius);
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 8px monospace";
          ctx.textAlign = "center";
          ctx.fillText("D (²H)", p.x, p.y - p.radius - 5);
        }
      } else if (p.type === "tritium") {
        // Draw Tritium: Red glowing circle for fusion mode, or original clump for fission
        if (simulationType === "fusion") {
          ctx.save();
          const grad = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, p.radius);
          grad.addColorStop(0, "#fca5a5"); // light red
          grad.addColorStop(0.7, "#ef4444"); // red
          grad.addColorStop(1, "rgba(239, 68, 68, 0.1)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // T text inside
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 7px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("³H", p.x, p.y);
          ctx.restore();
        } else {
          // Draw 1 Proton (red) and 2 Neutrons (blue)
          drawNuclonClump(ctx, p.x, p.y, 1, 2, p.radius);
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 8px monospace";
          ctx.textAlign = "center";
          ctx.fillText("T (³H)", p.x, p.y - p.radius - 5);
        }
      } else if (p.type === "helium") {
        if (simulationType === "fusion") {
          // Draw Helium: Yellow glowing circle (larger, m=4)
          ctx.save();
          const grad = ctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, p.radius);
          grad.addColorStop(0, "#fef08a"); // light yellow
          grad.addColorStop(0.7, "#eab308"); // yellow
          grad.addColorStop(1, "rgba(234, 179, 8, 0.15)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.strokeStyle = "#eab308";
          ctx.lineWidth = 2;
          ctx.shadowColor = "#eab308";
          ctx.shadowBlur = 6;
          ctx.stroke();

          // ⁴He text inside
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#000000";
          ctx.font = "bold 8px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("⁴He", p.x, p.y);
          ctx.restore();
        } else {
          // Draw Alpha / Helium cluster (2 Proton, 2 Neutron)
          drawNuclonClump(ctx, p.x, p.y, 2, 2, p.radius);
          ctx.fillStyle = "#10b981";
          ctx.font = "bold 9px monospace";
          ctx.textAlign = "center";
          ctx.fillText("⁴He (Alpha)", p.x, p.y - p.radius - 6);
        }
      } else if (p.type === "fragment") {
        // Draw deformed atomic fragments
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 7px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("MẢNH VỠ", p.x, p.y + 3);
      } else if (p.type === "neutron") {
        if (simulationType === "fusion") {
          // Draw Neutron: Grey glowing circle
          ctx.save();
          ctx.fillStyle = "#94a3b8"; // grey
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.strokeStyle = "#cbd5e1";
          ctx.lineWidth = 1;
          ctx.stroke();

          // label above
          ctx.fillStyle = "#94a3b8";
          ctx.font = "bold 7px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("n", p.x, p.y - p.radius - 3);
          ctx.restore();
        } else {
          // Draw neutron (orange small ball with yellow aura)
          const glowRad = p.radius * 2.5;
          const grad = ctx.createRadialGradient(p.x, p.y, p.radius, p.x, p.y, glowRad);
          grad.addColorStop(0, "#f59e0b");
          grad.addColorStop(1, "rgba(245, 158, 11, 0.0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRad, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (p.type === "spark") {
        ctx.globalAlpha = p.opacity !== undefined ? p.opacity : 1.0;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      } else if (p.type === "photon") {
        ctx.globalAlpha = p.opacity !== undefined ? p.opacity : 1.0;
        
        // Vẽ tia sóng bức xạ Gamma màu tím/hồng neon uốn lượn hình sin cực đẹp
        ctx.strokeStyle = "rgba(192, 132, 252, 0.85)"; // Neon purple gamma glow
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        const baseAngle = p.shakeAmt || 0;
        const speed = 4.2;
        
        // Vẽ chuỗi sóng lượn theo đuôi của photon
        const trailLength = 8;
        for (let j = 0; j < trailLength; j++) {
          const t = Math.max(0, p.age! - j);
          const distTraveled = t * speed;
          const waveOffset = Math.sin(t * 0.45) * 8.5;
          const baseX = (canvas.width / 2) + Math.cos(baseAngle) * distTraveled;
          const baseY = (canvas.height / 2) + Math.sin(baseAngle) * distTraveled;
          const tx = baseX - Math.sin(baseAngle) * waveOffset;
          const ty = baseY + Math.cos(baseAngle) * waveOffset;
          
          if (j === 0) {
            ctx.moveTo(tx, ty);
          } else {
            ctx.lineTo(tx, ty);
          }
        }
        ctx.stroke();

        // Vẽ một hạt nhân sáng rực rỡ ở đầu tia Gamma đại diện cho gói năng lượng photon
        ctx.shadowColor = "#f472b6";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius || 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      } else if (p.type === "energy_text") {
        ctx.globalAlpha = p.opacity !== undefined ? p.opacity : 1.0;
        const textVal = p.text || "";
        ctx.font = "bold 11px sans-serif";
        const txtWidth = ctx.measureText(textVal).width;
        
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(p.x - txtWidth / 2 - 8, p.y - 12, txtWidth + 16, 18, 6);
        ctx.fill();
        ctx.stroke();
        
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(textVal, p.x, p.y + 1);
      }

      ctx.restore();
    });

    // Write screen stats/information
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "left";

    if (simulationType === "fission_single") {
      ctx.fillText("MÔ PHỎNG PHÂN HẠCH ĐƠN LẺ URANIUM-235", 15, 25);
      const u235 = particlesRef.current.find(p => p.type === "u235");
      if (u235 && u235.state === "excited") {
        ctx.fillStyle = "#ef4444";
        ctx.fillText("TRẠNG THÁI: KÍCH THÍCH & DAO ĐỘNG CO GIÃN...", 15, 45);
      } else if (totalFissions > 0) {
        ctx.fillStyle = "#10b981";
        ctx.fillText("TRẠNG THÁI: PHÂN HẠCH THÀNH CÔNG! +200 MeV TỎA RA", 15, 45);
      } else {
        ctx.fillStyle = "#94a3b8";
        ctx.fillText("BẮN NEUTRON ĐỂ BẮT ĐẦU KÍCH THÍCH", 15, 45);
      }
    } else if (simulationType === "fission_chain") {
      ctx.fillText(`PHẢN ỨNG DÂY CHUYỀN (U-235: ${enrichment}%)`, 15, 25);
      ctx.fillText(`SỐ PHÂN HẠCH TÍCH LŨY: ${totalFissions}`, 15, 40);
      ctx.fillText(`SỐ NEUTRON HOẠT ĐỘNG: ${activeNeutrons}`, 15, 55);

      if (reactionState === "exploded") {
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText("💥 TRẠNG THÁI: BÙNG NỔ PHÓNG XẠ TRÊN TỚI HẠN (k > 1)!", 15, 80);
      } else if (reactionState === "stabilized") {
        ctx.fillStyle = "#10b981";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText("✅ TRẠNG THÁI: TỰ DUY TRÌ ỔN ĐỊNH TỚI HẠN (k = 1)", 15, 80);
      } else if (reactionState === "died_out") {
        ctx.fillStyle = "#64748b";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText("🛑 TRẠNG THÁI: PHẢN ỨNG TẮT DẦN DƯỚI TỚI HẠN (k < 1)", 15, 80);
      }
    } else if (simulationType === "fusion") {
      ctx.fillStyle = "#818cf8";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText("BUỒNG ĐỐT TOKAMAK - PHẢN ỨNG NHIỆT HẠCH D-T", 15, 25);
      
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "9px monospace";
      ctx.fillText(`NHIỆT ĐỘ LÒ: ${fusionTemp} triệu °C`, 15, 40);
      ctx.fillText(`ÁP SUẤT LÒ: ${fusionPressure} atm`, 15, 52);
      
      const speed = ((fusionTemp / 35) + 1.0).toFixed(1);
      ctx.fillText(`TỐC ĐỘ TRUNG BÌNH HẠT: ${speed} km/s`, 15, 64);
      
      ctx.fillStyle = "#facc15";
      ctx.fillText(`SỐ PHẢN ỨNG THÀNH CÔNG: ${successfulFusions}`, 15, 78);
      ctx.fillStyle = "#38bdf8";
      ctx.fillText(`CÔNG SUẤT NHIỆT PHẢN ỨNG: ${fusionPower} MW`, 15, 90);
      ctx.fillStyle = "#10b981";
      ctx.fillText(`TỔNG NĂNG LƯỢNG TIÊU CHUẨN: ${fusionEnergy.toFixed(1)} MeV`, 15, 102);
      ctx.fillStyle = "#a78bfa";
      ctx.fillText(`NĂNG LƯỢNG ĐIỆN TÍCH LŨY: ${accumulatedEnergy.toFixed(1)} MJ`, 15, 114);
      ctx.fillStyle = qFactor >= 1.0 ? "#34d399" : "#f87171";
      ctx.fillText(`HỆ SỐ NĂNG LƯỢNG CÓ LỢI Q: ${qFactor} (${qFactor >= 1.0 ? "Tự duy trì có lợi" : "Hao hụt năng lượng"})`, 15, 126);

      // Status text
      if (fusionActive) {
        if (fusionTemp >= 40) {
          ctx.fillStyle = "#34d399";
          ctx.font = "bold 10px sans-serif";
          ctx.fillText("🔋 TRẠNG THÁI: PHẢN ỨNG NHIỆT HẠCH ĐANG DIỄN RA", 15, 144);
        } else {
          ctx.fillStyle = "#fbbf24";
          ctx.font = "bold 10px sans-serif";
          ctx.fillText("⚠️ TRẠNG THÁI: ĐÃ KÍCH HOẠT (Nhiệt độ thấp, phản ứng yếu)", 15, 144);
        }
      } else if (furnaceActivated) {
        ctx.fillStyle = "#60a5fa";
        ctx.font = "bold 10px sans-serif";
        ctx.fillText("⚡ TRẠNG THÁI: LÒ ĐÃ SẴN SÀNG (Đang cấp từ trường Tokamak)", 15, 144);
        ctx.fillStyle = "#94a3b8";
        ctx.font = "9px sans-serif";
        ctx.fillText("(Nhấn nút BẮT ĐẦU bên dưới để tiến hành nén hạt và tổng hợp)", 15, 156);
      } else {
        ctx.fillStyle = "#f59e0b";
        ctx.font = "bold 10px sans-serif";
        ctx.fillText("⚡ TRẠNG THÁI: CHƯA KÍCH HOẠT PHẢN ỨNG NHIỆT HẠCH", 15, 144);
        ctx.fillStyle = "#94a3b8";
        ctx.font = "9px sans-serif";
        ctx.fillText("(Nhấn nút KÍCH HOẠT LÒ bên dưới để bắt đầu quá trình tổng hợp)", 15, 156);
      }
    }

    ctx.restore();

    // Draw full-canvas screen flash if active
    if (flashOpacityRef.current > 0) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, canvas.width / 1.2);
      grad.addColorStop(0, `rgba(255, 255, 255, ${flashOpacityRef.current})`);
      grad.addColorStop(0.3, `rgba(254, 240, 138, ${flashOpacityRef.current * 0.85})`); // warm gold
      grad.addColorStop(0.6, `rgba(249, 115, 22, ${flashOpacityRef.current * 0.5})`); // vibrant orange
      grad.addColorStop(1, `rgba(239, 68, 68, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Helper to draw realistic nucleus clump
  const drawNucleusCluster = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    radius: number,
    isU235: boolean
  ) => {
    // Generate a pseudo-random cluster of protons and neutrons
    const seed = isU235 ? 235 : 238;
    const numSubParticles = 14;
    
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;

    for (let i = 0; i < numSubParticles; i++) {
      const angle = (i * (Math.PI * 2 / numSubParticles)) + (seed * 0.1);
      const r = (radius * 0.45) * Math.sin(i * 3);
      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * r;
      
      // alternate proton (red) and neutron (blue/grey)
      const isProton = i % 2 === 0;
      
      if (isProton) {
        ctx.fillStyle = "#ef4444"; // Proton red
      } else {
        ctx.fillStyle = isU235 ? "#3b82f6" : "#64748b"; // Neutron blue for U-235, grey for U-238
      }

      ctx.beginPath();
      ctx.arc(px, py, radius * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  };

  // Helper to draw specific nuclon clumps (e.g. Deuterium or Tritium)
  const drawNuclonClump = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    protons: number,
    neutrons: number,
    radius: number
  ) => {
    const total = protons + neutrons;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1.2;

    for (let i = 0; i < total; i++) {
      const angle = (i * (Math.PI * 2 / total));
      const r = radius * 0.3;
      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * r;

      const isProton = i < protons;

      ctx.fillStyle = isProton ? "#ef4444" : "#3b82f6";
      ctx.beginPath();
      ctx.arc(px, py, radius * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans" id="lesson22-simulation-container">
      {/* APP TITLE BAR - Beautiful 3D Header with Soft Lavender Background */}
      <div className="flex flex-col bg-indigo-50 p-5 rounded-3xl border-2 border-slate-900 gap-4 shadow-[6px_6px_0px_#1e293b] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[5px_5px_0px_#1e293b]">
        <div className="flex items-center gap-3 w-full">
          <div className="p-2.5 bg-indigo-100 text-indigo-950 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
            <Zap className="h-5 w-5 text-indigo-950" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-black text-slate-950 uppercase tracking-wider">PHÒNG THÍ NGHIỆM PHÂN HẠCH & NHIỆT HẠCH</h2>
            <p className="text-[11px] text-slate-800 font-bold mt-0.5">Khảo sát phản ứng hạt nhân tỏa năng lượng, phản ứng dây chuyền kích hoạt và tổng hợp hạt nhân</p>
          </div>
        </div>
        
        {/* Tactile 3D Mode Switching buttons */}
        <div className="flex flex-wrap gap-2 bg-slate-150 p-1.5 rounded-2xl border-2 border-slate-900 shadow-inner w-full md:w-max">
          <button
            onClick={() => setSimulationType("fission_single")}
            className={`px-3 py-1.5 text-xs font-black rounded-xl border-2 border-slate-900 transition-all cursor-pointer ${
              simulationType === "fission_single"
                ? "bg-indigo-400 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
                : "bg-white text-slate-900 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#1e293b]"
            }`}
          >
            ☢️ Phân hạch đơn
          </button>
          <button
            onClick={() => setSimulationType("fission_chain")}
            className={`px-3 py-1.5 text-xs font-black rounded-xl border-2 border-slate-900 transition-all cursor-pointer ${
              simulationType === "fission_chain"
                ? "bg-indigo-400 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
                : "bg-white text-slate-900 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#1e293b]"
            }`}
          >
            🔗 Phản ứng dây chuyền
          </button>
          <button
            onClick={() => setSimulationType("fusion")}
            className={`px-3 py-1.5 text-xs font-black rounded-xl border-2 border-slate-900 transition-all cursor-pointer ${
              simulationType === "fusion"
                ? "bg-indigo-400 text-slate-950 shadow-none translate-x-[1px] translate-y-[1px]"
                : "bg-white text-slate-900 shadow-[2px_2px_0px_#1e293b] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#1e293b]"
            }`}
          >
            ☀️ Tổng hợp Nhiệt hạch
          </button>
        </div>
      </div>

      {/* TOP BLOCK: LARGE COMBUSTION CHAMBER (Spans full container width) */}
      <div className="w-full space-y-4">
        {/* CANVAS PREVIEW AREA */}
        <div className="relative bg-slate-950 rounded-3xl overflow-hidden border-2 border-slate-900 shadow-[6px_6px_0px_#1e293b] min-h-[380px] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={380}
            className="w-full block max-h-[380px]"
          />

          {/* Floating reset indicator */}
          {simulationType !== "fusion" && reactionState !== "idle" && reactionState !== "running" && (
            <div className="absolute inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center flex-col space-y-3 p-4 text-center">
              <span className="text-sm font-black text-white flex items-center gap-1.5 animate-pulse bg-slate-950/90 px-4 py-2.5 rounded-xl border border-slate-800">
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
                {simulationType === "fission_chain" && reactionState === "exploded" && "VỤ NỔ HẠT NHÂN COI NHƯ BÙNG NỔ TRÊN TỚI HẠN!"}
                {simulationType === "fission_chain" && reactionState === "stabilized" && "MẬT ĐỘ PHÂN HẠCH DUY TRÌ THÀNH CÔNG (k = 1)"}
                {simulationType === "fission_chain" && reactionState === "died_out" && "PHẢN ỨNG TẮT DẦN DO THẤT THOÁT NEUTRON"}
              </span>
              <button
                onClick={resetSimulation}
                className="bg-indigo-600 text-white px-4 py-2.5 text-xs font-black rounded-xl hover:bg-indigo-500 transition border-2 border-white shadow flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> THỬ LẠI PHẢN ỨNG MỚI
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM BLOCK: BÀN ĐIỀU KHIỂN HẠT NHÂN (Control Panel below) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-3xl border-2 border-slate-900 shadow-[6px_6px_0px_#1e293b] text-slate-900">
        
        {/* COLUMN 1: PHYSICAL CONTROL RODS & PARAMETERS */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-1.5 border-b-2 border-slate-900 pb-2">
            <Sliders className="w-4.5 h-4.5 text-indigo-600" />
            BÀN ĐIỀU KHIỂN VẬT LÝ
          </h3>

          {/* FISSION CONTROL ROD & ENRICHMENT */}
          {simulationType === "fission_chain" && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-extrabold">
                  <span className="text-slate-900">Độ làm giàu U-235:</span>
                  <span className="text-indigo-700 font-mono font-black bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">{enrichment}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={enrichment}
                  onChange={(e) => {
                    setEnrichment(parseInt(e.target.value));
                    resetSimulation();
                  }}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <span className="text-[10px] text-slate-700 leading-normal font-semibold block">
                  Tăng tỉ lệ U-235 (Màu đỏ) để tăng xác suất phân hạch thành công, U-238 (Màu xám) chỉ hấp thụ nơtrôn và dập phản ứng.
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-extrabold">
                  <span className="text-slate-900">Độ chèn Thanh điều khiển:</span>
                  <span className="text-indigo-700 font-mono font-black bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">{controlRods}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={controlRods}
                  onChange={(e) => setControlRods(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <span className="text-[10px] text-slate-700 leading-normal font-semibold block">
                  Chèn các thanh hấp thụ neutron (bằng Cadmium/Boron) xuống để dập bớt neutron, kiểm soát phản ứng dây chuyền ở mức k = 1.
                </span>
              </div>
            </div>
          )}

          {/* FUSION TEMPERATURE & PRESSURE */}
          {simulationType === "fusion" && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-extrabold">
                  <span className="text-slate-900">Nhiệt độ buồng đốt Tokamak:</span>
                  <span className="text-indigo-700 font-mono font-black bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">{fusionTemp} triệu °C</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  value={fusionTemp}
                  onChange={(e) => {
                    const newTemp = parseInt(e.target.value);
                    setFusionTemp(newTemp);
                    // Responsive: update velocity of existing particles in real-time
                    const speed = (newTemp / 35) + 1.0;
                    particlesRef.current.forEach(p => {
                      if (p.type === "deuterium" || p.type === "tritium") {
                        const currSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 1;
                        p.vx = (p.vx / currSpeed) * speed;
                        p.vy = (p.vy / currSpeed) * speed;
                      }
                    });
                  }}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <span className="text-[10px] text-slate-700 leading-normal font-semibold block">
                  Nhiệt độ cao cung cấp động năng cực lớn giúp các hạt chuyển động nhanh hơn, vượt qua lực đẩy tĩnh điện Coulomb.
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-extrabold">
                  <span className="text-slate-900">Áp suất buồng đốt Tokamak:</span>
                  <span className="text-indigo-700 font-mono font-black bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">{fusionPressure} triệu atm</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={fusionPressure}
                  onChange={(e) => setFusionPressure(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <span className="text-[10px] text-slate-700 leading-normal font-semibold block">
                  Áp suất tăng nén mật độ hạt plasma dày đặc hơn, làm tăng tần suất va chạm sáp nhập của các đồng vị Hydro.
                </span>
              </div>
            </div>
          )}

          {/* FISSION SINGLE INFO */}
          {simulationType === "fission_single" && (
            <div className="bg-amber-50 border-2 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_#1e293b] space-y-2 text-xs text-slate-900 font-semibold leading-relaxed animate-fade-in">
              <p>
                📍 <strong className="text-amber-950 font-black">Quy luật phân hạch:</strong> Hạt nhân Urani-235 nặng khi bắt lấy một nơtrôn chậm sẽ bị kích thích, phình to biến dạng rồi đứt đôi tạo ra 2 mảnh trung bình và bắn ra 3 nơtrôn thứ cấp.
              </p>
              <p className="text-[10px] text-slate-700 font-bold">
                Nhấn Bắn Neutron chậm để quan sát quá trình biến dạng giọt nước cực kì trực quan bám sát lý thuyết giáo khoa.
              </p>
            </div>
          )}
        </div>

        {/* COLUMN 2: REAL-TIME PHYSICAL ENERGY & SCIENCE OUTPUTS */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-1.5 border-b-2 border-slate-900 pb-2">
            <Activity className="w-4.5 h-4.5 text-indigo-600" />
            THÔNG SỐ & NĂNG LƯỢNG VẬT LÝ
          </h3>

          {simulationType === "fusion" ? (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50 border-2 border-slate-900 p-3 rounded-2xl shadow-[4px_4px_0px_#1e293b] text-center">
                  <span className="text-[9px] font-black text-emerald-800 block uppercase tracking-wider">⚡ CÔNG SUẤT LÒ</span>
                  <span className="text-xs font-mono font-black text-emerald-900">{fusionPower} MW</span>
                </div>
                <div className="bg-indigo-50 border-2 border-slate-900 p-3 rounded-2xl shadow-[4px_4px_0px_#1e293b] text-center">
                  <span className="text-[9px] font-black text-indigo-800 block uppercase tracking-wider">🔋 TÍCH LŨY MJ</span>
                  <span className="text-xs font-mono font-black text-indigo-900">{accumulatedEnergy} MJ</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-50 border-2 border-slate-900 p-3 rounded-2xl shadow-[4px_4px_0px_#1e293b] text-center">
                  <span className="text-[9px] font-black text-purple-800 block uppercase tracking-wider">🌟 HỆ SỐ Q</span>
                  <span className="text-xs font-mono font-black text-purple-900">{qFactor}</span>
                </div>
                <div className="bg-amber-50 border-2 border-slate-900 p-3 rounded-2xl shadow-[4px_4px_0px_#1e293b] text-center">
                  <span className="text-[9px] font-black text-amber-800 block uppercase tracking-wider">🔥 VA CHẠM</span>
                  <span className="text-xs font-mono font-black text-amber-900">{successfulFusions} phản ứng</span>
                </div>
              </div>

              {thermalGlow > 0 && (
                <div className="bg-red-50 border-2 border-slate-900 p-3 rounded-2xl shadow-[4px_4px_0px_#1e293b] space-y-1 text-red-950">
                  <div className="flex justify-between items-center text-[9px] font-black text-red-900 uppercase tracking-wider">
                    <span>🔥 GIÁM SÁT NHIỆT NĂNG PLASMA</span>
                    <span className="font-mono text-xs text-red-700">{Math.round(thermalGlow)}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-lg border border-slate-900 overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 transition-all duration-75"
                      style={{ width: `${thermalGlow}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="bg-white border-2 border-slate-900 p-3 rounded-2xl shadow-[4px_4px_0px_#1e293b] space-y-2 text-[10px] leading-relaxed text-slate-900">
                <div className="text-indigo-800 font-extrabold border-b border-slate-200 pb-1 flex items-center justify-between">
                  <span>ỨNG DỤNG HỆ THỨC: ΔE = Δm·c²</span>
                  <span className="bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded text-[8px] font-mono border border-indigo-200 font-extrabold">D-T Reaction</span>
                </div>
                <div className="space-y-0.5 font-mono text-slate-800 font-bold">
                  <div className="flex justify-between">
                    <span>m(Deuterium) + m(Tritium):</span>
                    <span className="text-emerald-700">5.02905 u</span>
                  </div>
                  <div className="flex justify-between">
                    <span>m(Helium-4) + m(Neutron):</span>
                    <span className="text-amber-700">5.01016 u</span>
                  </div>
                  <div className="flex justify-between text-indigo-700 border-t border-dashed border-slate-300 pt-0.5">
                    <span className="font-extrabold">Độ hụt khối (Δm):</span>
                    <span className="font-extrabold">0.01889 u</span>
                  </div>
                </div>
                <div className="text-center font-mono font-extrabold text-emerald-800 pt-0.5">
                  <FormattedMathText text="E_{toa} = \Delta m \cdot 931,5 \approx 17.6\text{ MeV}" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-emerald-50 border-2 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_#1e293b] text-center space-y-1 text-emerald-950">
                <span className="text-[10px] font-black text-emerald-800 block uppercase tracking-wider">☢️ SỐ PHÂN HẠCH TÍCH LŨY</span>
                <span className="text-2xl font-mono font-black text-emerald-900">{totalFissions}</span>
                <p className="text-[9px] text-slate-700 leading-tight font-semibold">
                  Mỗi hạt phân hạch tỏa ra năng lượng khổng lồ tương đương 200 MeV (3.2 x 10⁻¹¹ Joules).
                </p>
              </div>

              {simulationType === "fission_chain" && (
                <div className="bg-indigo-50 border-2 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_#1e293b] text-indigo-950 space-y-2">
                  <span className="text-[10px] font-black text-indigo-800 block uppercase tracking-wider">🔗 BIỂU ĐỒ MẬT ĐỘ NEUTRON</span>
                  <div className="h-16 flex items-end gap-0.5 bg-slate-950 p-2 rounded-xl border border-slate-800">
                    {history.length === 0 ? (
                      <span className="text-[9px] text-slate-500 font-mono w-full text-center">Đang chờ kích hoạt...</span>
                    ) : (
                      history.map((n, idx) => {
                        const hPercent = Math.min(100, (n / 60) * 100);
                        const isHigh = n > 50;
                        return (
                          <div
                            key={idx}
                            style={{ height: `${hPercent}%` }}
                            className={`flex-1 rounded-t-sm ${isHigh ? "bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.5)]" : "bg-indigo-400"}`}
                          />
                        );
                      })
                    )}
                  </div>
                  <div className="flex justify-between text-[8px] font-mono font-extrabold text-slate-700">
                    <span>KHỞI ĐẦU</span>
                    <span>NƠTRÔN HOẠT ĐỘNG: {activeNeutrons}</span>
                    <span>HIỆN TẠI</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* COLUMN 3: TRIGGER ACTIONS & APPLICATIONS CONTEXT */}
        <div className="space-y-4 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-1.5 border-b-2 border-slate-900 pb-2">
              <Settings className="w-4.5 h-4.5 text-indigo-600" />
              ĐIỀU KHIỂN & LÝ THUYẾT
            </h3>

            {/* TRIGGER BUTTONS */}
            <div className="space-y-3 pt-3">
              <div className="flex gap-2">
                {simulationType === "fusion" ? (
                  <>
                    <button
                      onClick={() => setFurnaceActivated(true)}
                      disabled={furnaceActivated || fusionActive}
                      className={`flex-1 font-black py-3 px-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 border-2 border-slate-900 shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center uppercase ${
                        furnaceActivated 
                          ? "bg-slate-300 text-slate-600" 
                          : "bg-indigo-500 hover:bg-indigo-600 text-white"
                      }`}
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      {furnaceActivated ? "ĐÃ KÍCH HOẠT" : "KÍCH HOẠT LÒ"}
                    </button>

                    {fusionActive ? (
                      <button
                        onClick={resetSimulation}
                        className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-black py-3 px-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 border-2 border-slate-900 shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] cursor-pointer text-center uppercase"
                      >
                        <RotateCcw className="w-4 h-4 text-white" />
                        ĐẶT LẠI
                      </button>
                    ) : (
                      <button
                        onClick={triggerSimulation}
                        disabled={!furnaceActivated}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 text-slate-950 disabled:text-slate-400 font-black py-3 px-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 border-2 border-slate-900 shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center uppercase"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        BẮT ĐẦU
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={triggerSimulation}
                      disabled={reactionState === "running"}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 text-slate-950 font-black py-3.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-1.5 border-2 border-slate-900 shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center uppercase"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      BẮN NEUTRON MỒI
                    </button>
                    <button
                      onClick={resetSimulation}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold p-3.5 rounded-xl transition border-2 border-slate-900 shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] cursor-pointer"
                    >
                      <RotateCcw className="w-4.5 h-4.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* SCIENCE EXPLANATION CORNER */}
          <div className="bg-indigo-50 border-2 border-slate-900 p-3.5 rounded-2xl shadow-[4px_4px_0px_#1e293b] mt-4">
            <div className="flex gap-2 items-start">
              <Info className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] font-black text-indigo-900 block uppercase tracking-wider">ỨNG DỤNG THỰC TIỄN</span>
                <p className="text-[10px] text-slate-800 leading-normal font-bold">
                  {simulationType === "fission_chain" 
                    ? "Trong thực tế, Uranium thô chỉ chứa 0.7% U-235. Lò hạt nhân cần làm giàu lên 3-5% và chèn thanh điều khiển để duy trì k=1 ổn định. Bom nguyên tử cần làm giàu lên >90% để phản ứng dây chuyền bùng nổ tự do."
                    : simulationType === "fusion"
                    ? "Phản ứng nhiệt hạch là nguồn năng lượng của Mặt Trời. Loài người đang tạo ra các máy Tokamak sử dụng từ trường siêu dẫn cực mạnh để giam giữ plasma hàng trăm triệu độ nhằm tạo ra điện sạch vô hạn."
                    : "U-235 phân hạch giải phóng động năng hạt nhân cực lớn cùng các bức xạ gamma nguy hiểm, là nền tảng của điện hạt nhân thương mại."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* BIỂU ĐỒ BIẾN THIÊN TỔNG NĂNG LƯỢNG GIẢI PHÓNG */}
      <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-900 shadow-[6px_6px_0px_#1e293b] text-slate-900 mt-6 animate-fade-in">
        <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-1.5 border-b-2 border-slate-900 pb-2 mb-4">
          <Activity className="w-4.5 h-4.5 text-indigo-600 animate-pulse" />
          BIỂU ĐỒ BIẾN THIÊN TỔNG NĂNG LƯỢNG GIẢI PHÓNG (MeV) THEO THỜI GIAN
        </h3>
        {energyHistory.length === 0 ? (
          <div className="h-44 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl bg-slate-100/50 text-slate-500 text-xs font-semibold space-y-2 p-4">
            <Activity className="w-8 h-8 text-slate-400 animate-pulse" />
            <p className="text-center">Hệ thống đang chờ kích hoạt phản ứng để bắt đầu đo lượng năng lượng giải phóng...</p>
            <p className="text-[10px] text-slate-400 font-medium">Bấm "Bắn Neutron mồi" hoặc kích hoạt và "Bắt đầu" để theo dõi đồ thị tăng trưởng</p>
          </div>
        ) : (
          <div className="h-56 w-full font-mono text-[10px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyHistory} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="time" 
                  stroke="#475569" 
                  tickFormatter={(val) => `${val}s`} 
                  label={{ value: 'Thời gian (giây)', position: 'insideBottomRight', offset: -10, style: { fontWeight: 'bold', fill: '#475569' } }} 
                />
                <YAxis 
                  stroke="#475569" 
                  label={{ value: 'Tổng năng lượng (MeV)', angle: -90, position: 'insideLeft', offset: 0, style: { fontWeight: 'bold', fill: '#475569' } }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#f8fafc', border: 'none', fontSize: '11px', fontFamily: 'monospace' }}
                  labelFormatter={(label) => `Thời gian: ${label}s`}
                  formatter={(value) => [`${value} MeV`, 'Tổng năng lượng']}
                />
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#4f46e5" 
                  strokeWidth={3} 
                  dot={{ r: 3, fill: "#4f46e5", strokeWidth: 1, stroke: "#fff" }}
                  activeDot={{ r: 6 }} 
                  isAnimationActive={true}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
