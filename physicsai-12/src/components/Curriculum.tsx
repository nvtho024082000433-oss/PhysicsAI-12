import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
  BookOpen,
  Video,
  FileText,
  Sparkles,
  Brain,
  Check,
  RefreshCw,
  Layers,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  ChevronRight,
  CheckCircle2,
  X,
  XCircle,
  Plus,
  Shuffle,
  AlertCircle,
  Eye,
  EyeOff,
  BarChart2,
  BookMarked,
  Info,
  GraduationCap,
  FlaskConical,
  Compass,
  Zap,
  Atom,
  Activity,
  Waves,
  Radio
} from "lucide-react";
import { Chapter, Lesson, ACADEMIC_CHAPTERS, StudentResult } from "../types";
import {
  INITIAL_P1_QUESTIONS,
  INITIAL_P2_QUESTIONS,
  INITIAL_P3_QUESTIONS,
  Part1Question,
  Part2Question,
  Part3Question,
  Option,
  Statement,
  LESSON2_P1_QUESTIONS,
  LESSON2_P2_QUESTIONS,
  LESSON2_P3_QUESTIONS,
  LESSON3_P1_QUESTIONS,
  LESSON3_P2_QUESTIONS,
  LESSON3_P3_QUESTIONS,
  LESSON4_P1_QUESTIONS,
  LESSON4_P2_QUESTIONS,
  LESSON4_P3_QUESTIONS,
  LESSON5_P1_QUESTIONS,
  LESSON5_P2_QUESTIONS,
  LESSON5_P3_QUESTIONS,
  LESSON6_P1_QUESTIONS,
  LESSON6_P2_QUESTIONS,
  LESSON6_P3_QUESTIONS,
  LESSON7_P1_QUESTIONS,
  LESSON7_P2_QUESTIONS,
  LESSON7_P3_QUESTIONS,
  LESSON8_P1_QUESTIONS,
  LESSON8_P2_QUESTIONS,
  LESSON9_P1_QUESTIONS,
  LESSON9_P2_QUESTIONS,
  LESSON9_P3_QUESTIONS,
  LESSON10_P1_QUESTIONS,
  LESSON10_P2_QUESTIONS,
  LESSON10_P3_QUESTIONS,
  LESSON11_P1_QUESTIONS,
  LESSON11_P2_QUESTIONS,
  LESSON11_P3_QUESTIONS,
  LESSON12_P1_QUESTIONS,
  LESSON12_P2_QUESTIONS,
  LESSON12_P3_QUESTIONS,
  LESSON13_P1_QUESTIONS,
  LESSON13_P2_QUESTIONS,
  LESSON13_P3_QUESTIONS,
  LESSON14_P1_QUESTIONS,
  LESSON14_P2_QUESTIONS,
  LESSON15_P1_QUESTIONS,
  LESSON15_P2_QUESTIONS,
  LESSON15_P3_QUESTIONS,
  LESSON16_P1_QUESTIONS,
  LESSON16_P2_QUESTIONS,
  LESSON16_P3_QUESTIONS,
  LESSON17_P1_QUESTIONS,
  LESSON17_P2_QUESTIONS,
  LESSON17_P3_QUESTIONS,
  LESSON18_P1_QUESTIONS,
  LESSON18_P2_QUESTIONS,
  LESSON18_P3_QUESTIONS,
  LESSON19_P1_QUESTIONS,
  LESSON19_P2_QUESTIONS,
  LESSON19_P3_QUESTIONS,
  LESSON20_P1_QUESTIONS,
  LESSON20_P2_QUESTIONS,
  LESSON20_P3_QUESTIONS,
  LESSON21_P1_QUESTIONS,
  LESSON21_P2_QUESTIONS,
  LESSON21_P3_QUESTIONS,
  LESSON22_P1_QUESTIONS,
  LESSON22_P2_QUESTIONS,
  LESSON22_P3_QUESTIONS,
  LESSON23_P1_QUESTIONS,
  LESSON23_P2_QUESTIONS,
  LESSON23_P3_QUESTIONS,
  LESSON24_P1_QUESTIONS,
  LESSON24_P2_QUESTIONS,
  LESSON24_P3_QUESTIONS,
  LESSON25_P1_QUESTIONS,
  LESSON25_P2_QUESTIONS,
  LESSON25_P3_QUESTIONS
} from "../data/lessonQuestions";
import { ThermalSimulation } from "./VirtualExperiment";
import { MatterStructureSimulation } from "./MatterStructureSimulation";
import InternalEnergySimulation from "./InternalEnergySimulation";
import ThermometerSimulation from "./ThermometerSimulation";
import SpecificHeatSimulation from "./SpecificHeatSimulation";
import LatentHeatSimulation from "./LatentHeatSimulation";
import VaporizationSimulation from "./VaporizationSimulation";
import Lesson7Simulation from "./Lesson7Simulation";
import { Lesson8Textbook } from "./Lesson8Textbook";
import Lesson8Simulation from "./Lesson8Simulation";
import { Lesson9Textbook } from "./Lesson9Textbook";
import Lesson9Simulation from "./Lesson9Simulation";
import { Lesson10Textbook } from "./Lesson10Textbook";
import Lesson10Simulation from "./Lesson10Simulation";
import { Lesson11Textbook } from "./Lesson11Textbook";
import Lesson11Simulation from "./Lesson11Simulation";
import { Lesson12Textbook } from "./Lesson12Textbook";
import Lesson12Simulation from "./Lesson12Simulation";
import { LessonAssistant } from "./LessonAssistant";
import { Lesson13Textbook } from "./Lesson13Textbook";
import Lesson13Simulation from "./Lesson13Simulation";
import { Lesson14Textbook } from "./Lesson14Textbook";
import Lesson14Simulation from "./Lesson14Simulation";
import { Lesson15Textbook } from "./Lesson15Textbook";
import Lesson15Simulation from "./Lesson15Simulation";
import { Lesson16Textbook } from "./Lesson16Textbook";
import { Lesson16Simulation } from "./Lesson16Simulation";
import { Lesson17Textbook } from "./Lesson17Textbook";
import { Lesson17Simulation } from "./Lesson17Simulation";
import { Lesson18Textbook } from "./Lesson18Textbook";
import { Lesson18Simulation } from "./Lesson18Simulation";
import { Lesson19Textbook } from "./Lesson19Textbook";
import Lesson19Simulation from "./Lesson19Simulation";
import { Lesson20Textbook } from "./Lesson20Textbook";
import Lesson20Simulation from "./Lesson20Simulation";
import { Lesson21Textbook } from "./Lesson21Textbook";
import { Lesson21Simulation } from "./Lesson21Simulation";
import { Lesson22Textbook } from "./Lesson22Textbook";
import { Lesson22Simulation } from "./Lesson22Simulation";
import { Lesson23Textbook } from "./Lesson23Textbook";
import { Lesson23Simulation } from "./Lesson23Simulation";
import { Lesson24Textbook } from "./Lesson24Textbook";
import { Lesson24Simulation } from "./Lesson24Simulation";
import { Lesson25Textbook } from "./Lesson25Textbook";
import { Lesson25Simulation } from "./Lesson25Simulation";
import { FormattedMathText } from "./FormattedMathText";

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Helper to render high-polished SVGs for Part 3 short-answer questions
const renderPart3Illustration = (type?: string) => {
  if (!type) return null;
  
  switch (type) {
    case "piston_compressed":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Sơ đồ nén khí trong xi lanh (A &gt; 0, Q &lt; 0)</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Cylinder body */}
            <rect x="45" y="25" width="70" height="70" fill="none" stroke="#475569" strokeWidth="2" rx="2" />
            
            {/* Compressed Piston (low position) */}
            <rect x="46" y="65" width="68" height="8" fill="#64748b" stroke="#475569" strokeWidth="1" rx="1" />
            <line x1="80" y1="20" x2="80" y2="65" stroke="#64748b" strokeWidth="3" />
            
            {/* Downward force arrow on piston rod */}
            <line x1="80" y1="5" x2="80" y2="35" stroke="#f97316" strokeWidth="2.5" markerEnd="url(#arrowOrange)" />
            <text x="85" y="20" fill="#f97316" className="text-[8px] font-black font-mono">Công A = +220 J</text>
            
            {/* Heat escaping sideways */}
            <path d="M 115 75 Q 125 70 135 75" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2" markerEnd="url(#arrowRed)" />
            <text x="122" y="66" fill="#f43f5e" className="text-[7.5px] font-black font-mono">Q = -80 J</text>
            <path d="M 45 75 Q 35 70 25 75" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2" markerEnd="url(#arrowRed)" />
            
            {/* Dense gas molecules */}
            <circle cx="55" cy="80" r="2.5" fill="#f43f5e" />
            <circle cx="70" cy="88" r="2.5" fill="#f43f5e" />
            <circle cx="85" cy="78" r="2.5" fill="#f43f5e" />
            <circle cx="98" cy="85" r="2.5" fill="#f43f5e" />
            <circle cx="62" cy="84" r="2.5" fill="#f43f5e" />
            <circle cx="78" cy="82" r="2.5" fill="#f43f5e" />
            <circle cx="92" cy="89" r="2.5" fill="#f43f5e" />
            
            {/* Marker definitions */}
            <defs>
              <marker id="arrowOrange" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 Z" fill="#f97316" />
              </marker>
              <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 Z" fill="#f43f5e" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Ngoại lực thực hiện công nén khí đồng thời thành bình tỏa nhiệt ra ngoài</span>
        </div>
      );
    case "piston_expanded":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Sơ đồ truyền nhiệt và khí dãn nở (Q &gt; 0, A &lt; 0)</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Cylinder body */}
            <rect x="45" y="15" width="70" height="70" fill="none" stroke="#475569" strokeWidth="2" rx="2" />
            
            {/* Expanded Piston (high position) */}
            <rect x="46" y="30" width="68" height="8" fill="#64748b" stroke="#475569" strokeWidth="1" rx="1" />
            <line x1="80" y1="5" x2="80" y2="30" stroke="#64748b" strokeWidth="3" />
            
            {/* Upward work arrow */}
            <line x1="80" y1="30" x2="80" y2="10" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrowGreen)" />
            <text x="85" y="18" fill="#10b981" className="text-[8px] font-black font-mono">Sinh công A = -190 J</text>
            
            {/* Bunsen burner heat input from bottom */}
            <path d="M 80 102 L 80 88" stroke="#ef4444" strokeWidth="2" strokeDasharray="1.5" />
            <path d="M 75 105 L 85 105" stroke="#ef4444" strokeWidth="1.5" />
            {/* Heat waves */}
            <path d="M 60 92 Q 65 87 70 92 Q 75 87 80 92" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <path d="M 80 92 Q 85 87 90 92 Q 95 87 100 92" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="110" y="93" fill="#f59e0b" className="text-[8px] font-black font-mono">Nhiệt Q = +340 J</text>
            
            {/* Gas molecules spread out */}
            <circle cx="55" cy="50" r="2.5" fill="#3b82f6" />
            <circle cx="75" cy="65" r="2.5" fill="#3b82f6" />
            <circle cx="95" cy="48" r="2.5" fill="#3b82f6" />
            <circle cx="65" cy="72" r="2.5" fill="#3b82f6" />
            <circle cx="90" cy="70" r="2.5" fill="#3b82f6" />
            
            {/* Marker definition */}
            <defs>
              <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 Z" fill="#10b981" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Khối khí hấp thụ nhiệt từ ngọn lửa đèn cồn và dãn nở đẩy pít-tông lên</span>
        </div>
      );
    case "sliding_slope":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Mô hình khối gỗ trượt dốc có ma sát</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Horizontal line */}
            <line x1="15" y1="90" x2="145" y2="90" stroke="#475569" strokeWidth="1.5" />
            
            {/* 30-degree Slope ramp */}
            <polygon points="15,90 130,23 130,90" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
            <text x="35" y="86" fill="#94a3b8" className="text-[7px] font-bold">30°</text>
            <text x="80" y="45" fill="#94a3b8" className="text-[7.5px] font-bold font-mono">Chiều dài L = 20 m</text>
            
            {/* Sliding wood block */}
            <g transform="translate(70, 58) rotate(-30)">
              <rect x="-10" y="-6" width="20" height="12" fill="#d97706" stroke="#b45309" strokeWidth="1" rx="1" />
              {/* Friction force arrow red */}
              <line x1="10" y1="0" x2="30" y2="0" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRedSide)" />
              <text x="20" y="-8" fill="#ef4444" className="text-[6.5px] font-black">F_ms</text>
            </g>
            
            {/* State labels */}
            <text x="110" y="15" fill="#e2e8f0" className="text-[7.5px] font-bold font-mono">Đỉnh dốc: v = 0</text>
            <text x="110" y="24" fill="#a8a29e" className="text-[7px] font-mono">Thế năng W1 = 150 J</text>
            
            <text x="10" y="102" fill="#e2e8f0" className="text-[7.5px] font-bold font-mono">Chân dốc: v = 4 m/s</text>
            <text x="10" y="110" fill="#a8a29e" className="text-[7px] font-mono">Động năng W2 = 12 J</text>
            
            <defs>
              <marker id="arrowRedSide" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 Z" fill="#ef4444" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Độ hao hụt cơ năng (W1 - W2) chuyển hóa thành nhiệt lượng làm tăng nội năng</span>
        </div>
      );
    case "insulated_stirrer":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Cánh khuấy nước trong bình cách nhiệt</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Outer vessel (double walls for insulation) */}
            <rect x="40" y="15" width="80" height="80" fill="none" stroke="#475569" strokeWidth="2.5" rx="4" />
            <rect x="44" y="19" width="72" height="72" fill="#1e293b" stroke="#334155" strokeWidth="1" rx="2" />
            
            {/* Insulation hashes */}
            <line x1="38" y1="20" x2="35" y2="23" stroke="#475569" strokeWidth="1" />
            <line x1="38" y1="40" x2="35" y2="43" stroke="#475569" strokeWidth="1" />
            <line x1="38" y1="60" x2="35" y2="63" stroke="#475569" strokeWidth="1" />
            <line x1="122" y1="30" x2="125" y2="33" stroke="#475569" strokeWidth="1" />
            <line x1="122" y1="50" x2="125" y2="53" stroke="#475569" strokeWidth="1" />
            <text x="126" y="13" fill="#64748b" className="text-[7px] font-black font-mono">CÁCH NHIỆT (Q = 0)</text>
            
            {/* Water inside */}
            <path d="M 45 45 Q 60 42 80 45 Q 100 48 115 45 L 115 90 L 45 90 Z" fill="#3b82f6" fillOpacity="0.15" />
            <text x="80" y="85" fill="#3b82f6" fillOpacity="0.6" className="text-[7.5px] font-bold font-mono">400g NƯỚC</text>
            
            {/* Motor representation */}
            <rect x="68" y="3" width="24" height="12" fill="#475569" rx="1" />
            <text x="80" y="11" fill="#e2e8f0" textAnchor="middle" className="text-[6px] font-bold">MÔTƠ</text>
            
            {/* Paddle stirrer */}
            <line x1="80" y1="15" x2="80" y2="70" stroke="#94a3b8" strokeWidth="2.5" />
            {/* Blades */}
            <rect x="65" y="65" width="30" height="5" fill="#64748b" rx="0.5" />
            
            {/* Stirring motion lines */}
            <path d="M 58 68 C 58 72 102 72 102 68" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2" />
            <text x="80" y="55" fill="#38bdf8" textAnchor="middle" className="text-[7px] font-black">P = 30W, t = 120s</text>
            <text x="80" y="63" fill="#38bdf8" textAnchor="middle" className="text-[7px] font-black">Công A = +3600 J</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Công cơ học của mô tơ chuyển hóa hoàn toàn thành nội năng làm nước nóng lên</span>
        </div>
      );
    case "heat_engine_efficiency":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Nguyên lý hoạt động động cơ nhiệt</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Hot Reservoir */}
            <rect x="45" y="8" width="70" height="18" fill="#7f1d1d" stroke="#f43f5e" strokeWidth="1" rx="2" />
            <text x="80" y="19" textAnchor="middle" fill="#fecdd3" className="text-[7px] font-black">NGUỒN NÓNG (Q1 = 6000 J)</text>
            
            {/* Q1 arrow */}
            <line x1="80" y1="26" x2="80" y2="44" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#arrowRedTiny)" />
            
            {/* Engine circle */}
            <circle cx="80" cy="54" r="11" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="80" y="56" textAnchor="middle" fill="#ffffff" className="text-[6.5px] font-black">Khí</text>
            
            {/* Useful work A arrow */}
            <line x1="91" y1="54" x2="131" y2="54" stroke="#eab308" strokeWidth="2" markerEnd="url(#arrowYellowTiny)" />
            <text x="111" y="49" fill="#eab308" className="text-[7px] font-black">Công |A| = ?</text>
            
            {/* Q2 arrow */}
            <line x1="80" y1="65" x2="80" y2="83" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrowBlueTiny)" />
            
            {/* Cold Reservoir */}
            <rect x="45" y="83" width="70" height="18" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" rx="2" />
            <text x="80" y="94" textAnchor="middle" fill="#dbeafe" className="text-[7px] font-black">NGUỒN LẠNH (Q2 = 4200 J)</text>
            
            <defs>
              <marker id="arrowRedTiny" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#f43f5e" />
              </marker>
              <marker id="arrowYellowTiny" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#eab308" />
              </marker>
              <marker id="arrowBlueTiny" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#3b82f6" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Công cơ học có ích chia cho nhiệt lượng nhận vào ra hiệu suất động cơ</span>
        </div>
      );
    case "piston_vertical_forces":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Lực tác dụng lên pít-tông di chuyển đều</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Vertical Cylinder */}
            <line x1="50" y1="15" x2="50" y2="95" stroke="#475569" strokeWidth="2" />
            <line x1="110" y1="15" x2="110" y2="95" stroke="#475569" strokeWidth="2" />
            <line x1="50" y1="95" x2="110" y2="95" stroke="#475569" strokeWidth="2" />
            
            {/* Gas molecules */}
            <circle cx="60" cy="70" r="2" fill="#38bdf8" />
            <circle cx="75" cy="85" r="2" fill="#38bdf8" />
            <circle cx="95" cy="75" r="2" fill="#38bdf8" />
            <circle cx="80" cy="65" r="2" fill="#38bdf8" />
            <circle cx="100" cy="85" r="2" fill="#38bdf8" />
            
            {/* Piston moving slowly upwards (high-ish position) */}
            <rect x="51" y="45" width="58" height="8" fill="#64748b" stroke="#475569" strokeWidth="1" rx="1" />
            {/* Displacement arrow d = 10cm */}
            <path d="M 125 75 L 125 45" fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrowGreenTiny)" />
            <text x="130" y="62" fill="#22c55e" className="text-[7px] font-bold font-mono">d = 10 cm</text>
            
            {/* Force vector arrows */}
            {/* Upward force due to gas pressure: F_khí */}
            <line x1="80" y1="45" x2="80" y2="20" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyanTiny)" />
            <text x="84" y="27" fill="#06b6d4" className="text-[7.5px] font-black font-mono">F_khí = p * S</text>
            
            {/* Downward force due to atmosphere: F_kq */}
            <line x1="72" y1="45" x2="72" y2="65" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRedTiny)" />
            <text x="18" y="61" fill="#ef4444" className="text-[7px] font-black font-mono">F_kq = p_kq * S</text>
            
            {/* Downward force due to gravity: P */}
            <line x1="88" y1="53" x2="88" y2="73" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowOrangeTiny)" />
            <text x="92" y="68" fill="#f59e0b" className="text-[7px] font-black font-mono">P = m * g</text>
            
            <defs>
              <marker id="arrowCyanTiny" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#06b6d4" />
              </marker>
              <marker id="arrowOrangeTiny" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#f59e0b" />
              </marker>
              <marker id="arrowRedTiny" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#ef4444" />
              </marker>
              <marker id="arrowGreenTiny" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#22c55e" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Do pít-tông di chuyển đều, áp lực đẩy lên của khí cân bằng với trọng lượng và áp lực của khí quyển</span>
        </div>
      );
    case "thermal_contact_equilibrium":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Quá trình truyền nhiệt và cân bằng nhiệt</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Block A (Cold, 20°C) */}
            <rect x="15" y="15" width="40" height="30" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.5" rx="3" />
            <text x="35" y="33" fill="#3b82f6" textAnchor="middle" className="text-[7.5px] font-black font-mono">A (20°C)</text>
            <text x="35" y="41" fill="#64748b" textAnchor="middle" className="text-[6.5px] font-mono">m1 = 200g</text>
            
            {/* Block B (Hot, 80°C) */}
            <rect x="105" y="15" width="40" height="30" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" rx="3" />
            <text x="125" y="33" fill="#ef4444" textAnchor="middle" className="text-[7.5px] font-black font-mono">B (80°C)</text>
            <text x="125" y="41" fill="#64748b" textAnchor="middle" className="text-[6.5px] font-mono">m2 = 300g</text>
            
            {/* Heat transfer arrow */}
            <line x1="100" y1="30" x2="60" y2="30" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowYellowTiny_L3)" />
            <text x="80" y="24" fill="#f59e0b" textAnchor="middle" className="text-[7px] font-bold font-mono">Nhiệt tỏa Q</text>
            
            {/* Combined equilibrium block */}
            <rect x="50" y="65" width="60" height="25" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="1.5" rx="3" />
            <text x="80" y="80" fill="#a855f7" textAnchor="middle" className="text-[8px] font-black font-mono">Cân bằng t = 56°C</text>

            <defs>
              <marker id="arrowYellowTiny_L3" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#f59e0b" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Nhiệt lượng tự truyền từ nguồn nóng B sang nguồn lạnh A cho đến khi đồng nhất nhiệt độ</span>
        </div>
      );
    case "celsius_vs_kelvin":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">So sánh thang đo Celsius và Kelvin</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Celsius tube */}
            <rect x="35" y="15" width="10" height="75" fill="#1e293b" stroke="#475569" strokeWidth="1.5" rx="3" />
            <circle cx="40" cy="90" r="7" fill="#ef4444" stroke="#475569" strokeWidth="1.5" />
            <rect x="38" y="45" width="4" height="40" fill="#ef4444" />
            <text x="12" y="50" fill="#e2e8f0" className="text-[7.5px] font-bold font-mono">-183 °C</text>
            <text x="40" y="8" fill="#94a3b8" textAnchor="middle" className="text-[7px] font-black font-mono">Celsius (°C)</text>
            
            {/* Kelvin tube */}
            <rect x="115" y="15" width="10" height="75" fill="#1e293b" stroke="#475569" strokeWidth="1.5" rx="3" />
            <circle cx="120" cy="90" r="7" fill="#3b82f6" stroke="#475569" strokeWidth="1.5" />
            <rect x="118" y="45" width="4" height="40" fill="#3b82f6" />
            <text x="131" y="50" fill="#e2e8f0" className="text-[7.5px] font-bold font-mono">90 K</text>
            <text x="120" y="8" fill="#94a3b8" textAnchor="middle" className="text-[7px] font-black font-mono">Kelvin (K)</text>
            
            {/* Equivalence dash line */}
            <line x1="47" y1="45" x2="113" y2="45" stroke="#eab308" strokeWidth="1" strokeDasharray="3" />
            <text x="80" y="40" fill="#eab308" textAnchor="middle" className="text-[7px] font-bold font-mono">T = t + 273</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Nhiệt độ sôi của khí Oxy lỏng là -183 °C tương ứng với 90 K tuyệt đối</span>
        </div>
      );
    case "triple_point_water":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Giản đồ trạng thái & Điểm ba của nước</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Axes */}
            <line x1="25" y1="90" x2="140" y2="90" stroke="#475569" strokeWidth="1.2" />
            <line x1="25" y1="90" x2="25" y2="15" stroke="#475569" strokeWidth="1.2" />
            <text x="140" y="98" fill="#94a3b8" textAnchor="end" className="text-[6px] font-mono">Nhiệt độ T</text>
            <text x="28" y="13" fill="#94a3b8" className="text-[6px] font-mono">Áp suất P</text>
            
            {/* Meeting point x=70, y=55 */}
            {/* Solid-Liquid curve */}
            <path d="M 70 55 Q 67 35 65 15" fill="none" stroke="#eab308" strokeWidth="1.5" />
            {/* Liquid-Gas curve */}
            <path d="M 70 55 Q 100 48 130 38" fill="none" stroke="#10b981" strokeWidth="1.5" />
            {/* Solid-Gas curve */}
            <path d="M 70 55 Q 45 70 30 82" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            
            {/* Pulsing point */}
            <circle cx="70" cy="55" r="3.5" fill="#ef4444" />
            <text x="76" y="58" fill="#ef4444" className="text-[7px] font-black font-mono">Điểm ba (0,01 °C)</text>
            
            {/* Region labels */}
            <text x="38" y="35" fill="#64748b" className="text-[6.5px] font-bold">RẮN</text>
            <text x="90" y="28" fill="#64748b" className="text-[6.5px] font-bold">LỎNG</text>
            <text x="75" y="75" fill="#64748b" className="text-[6.5px] font-bold">HƠI</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Nước tinh khiết đồng thời tồn tại 3 thể cân bằng tại mốc nhiệt độ 0,01 °C</span>
        </div>
      );
    case "resistance_thermometer":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Nguyên lí Nhiệt kế điện trở Platin</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Resistor symbol body */}
            <rect x="35" y="30" width="90" height="25" fill="#1e293b" stroke="#e2e8f0" strokeWidth="1.5" rx="2" />
            <line x1="10" y1="42.5" x2="35" y2="42.5" stroke="#e2e8f0" strokeWidth="1.5" />
            <line x1="125" y1="42.5" x2="150" y2="42.5" stroke="#e2e8f0" strokeWidth="1.5" />
            
            {/* Platinum coil simulation */}
            <path d="M 40 42.5 L 50 34 L 60 51 L 70 34 L 80 51 L 90 34 L 100 51 L 110 34 L 120 42.5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="80" y="24" fill="#f59e0b" textAnchor="middle" className="text-[7.5px] font-black font-mono">DÂY BẠCH KIM (PLATINUM)</text>
            
            {/* Resistance labels */}
            <text x="15" y="72" fill="#94a3b8" className="text-[6.5px] font-mono">Mốc 0 °C: R0 = 100 Ω</text>
            <text x="15" y="82" fill="#e2e8f0" className="text-[7px] font-bold font-mono">Lò nung: R = 290 Ω</text>
            <text x="15" y="92" fill="#10b981" className="text-[6.5px] font-mono">α = 3,8 * 10^-3 / K =&gt; t = 500 °C</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Điện trở bạch kim tăng tuyến tính theo nhiệt độ của môi trường đo</span>
        </div>
      );
    case "thermocouple_sensor":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Cấu tạo Cặp nhiệt điện nhiệt kế</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Left Junction (Cold) */}
            <circle cx="30" cy="45" r="4.5" fill="#3b82f6" />
            <text x="30" y="32" fill="#3b82f6" textAnchor="middle" className="text-[6.5px] font-bold">Nước đá (0°C)</text>
            
            {/* Right Junction (Hot) */}
            <circle cx="130" cy="45" r="4.5" fill="#ef4444" />
            <text x="130" y="32" fill="#ef4444" textAnchor="middle" className="text-[6.5px] font-bold">Hơi nước sôi (100°C)</text>
            
            {/* Constantan Wire (top) */}
            <path d="M 30 45 Q 80 18 130 45" fill="none" stroke="#d97706" strokeWidth="2" />
            <text x="80" y="16" fill="#d97706" textAnchor="middle" className="text-[6.5px] font-black font-mono">Constantan</text>
            
            {/* Copper Wires (bottom) */}
            <path d="M 30 45 Q 50 68 68 68" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <path d="M 130 45 Q 110 68 92 68" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <text x="80" y="58" fill="#f59e0b" textAnchor="middle" className="text-[6px] font-bold font-mono">Đồng (Copper)</text>
            
            {/* Voltmeter millivolts */}
            <rect x="68" y="58" width="24" height="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" rx="2" />
            <text x="80" y="69" fill="#38bdf8" textAnchor="middle" className="text-[7.5px] font-black font-mono">mV</text>
            
            <text x="80" y="92" fill="#e2e8f0" textAnchor="middle" className="text-[6.5px] font-mono">k = 42,5 μV/K =&gt; E = 4,25 mV</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Hiệu nhiệt độ hai đầu mối hàn sinh ra suất điện động nhiệt điện cực nhạy</span>
        </div>
      );
    case "wien_radiation_spectrum":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Phổ bức xạ & Định luật Wien</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Axes */}
            <line x1="25" y1="90" x2="145" y2="90" stroke="#475569" strokeWidth="1.2" />
            <line x1="25" y1="90" x2="25" y2="15" stroke="#475569" strokeWidth="1.2" />
            <text x="145" y="98" fill="#94a3b8" textAnchor="end" className="text-[6px] font-mono font-bold">λ</text>
            <text x="29" y="12" fill="#94a3b8" className="text-[6px] font-mono">I(λ)</text>
            
            {/* Curve with peak at x=60, y=30 */}
            <path d="M 25 90 Q 45 80 54 42 Q 60 25 68 45 Q 85 80 140 85" fill="none" stroke="#38bdf8" strokeWidth="2" />
            
            {/* Peak indicator */}
            <circle cx="60" cy="27" r="3" fill="#ef4444" />
            <line x1="60" y1="27" x2="60" y2="90" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" />
            
            <text x="60" y="98" fill="#ef4444" textAnchor="middle" className="text-[6.5px] font-black font-mono">λ_max = 290 nm</text>
            <text x="95" y="30" fill="#e2e8f0" className="text-[7.5px] font-black font-mono">T = 10000 K</text>
            <text x="95" y="44" fill="#94a3b8" className="text-[6px] font-mono">λ_max * T = 2,9*10^-3</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Nhiệt độ bề mặt sao xanh khổng lồ đo từ xa thông qua bước sóng cực đại phát xạ</span>
        </div>
      );
    case "specific_heat_experiment":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Bình Nhiệt Lượng Kế Thực Nghiệm</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Outer vessel */}
            <rect x="35" y="15" width="90" height="75" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" rx="4" />
            <rect x="40" y="20" width="80" height="65" fill="#0f172a" stroke="#475569" strokeWidth="1" rx="2" />
            
            {/* Water levels */}
            <rect x="41" y="45" width="78" height="39" fill="#38bdf8" fillOpacity="0.3" rx="1" />
            
            {/* Heater Coil */}
            <path d="M 60 25 L 60 65 Q 65 70 70 65 T 80 65 Q 85 70 90 65 L 90 25" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            
            {/* Thermometer */}
            <rect x="102" y="10" width="6" height="70" fill="#e2e8f0" stroke="#475569" strokeWidth="1" rx="2" />
            <rect x="104" y="50" width="2" height="30" fill="#f43f5e" />
            
            {/* Labels */}
            <text x="65" y="85" fill="#38bdf8" textAnchor="middle" className="text-[6.5px] font-mono font-bold">NƯỚC (m, c)</text>
            <text x="75" y="40" fill="#ef4444" className="text-[6.5px] font-black font-mono">DÂY ĐIỆN TRỞ</text>
            <text x="110" y="5" fill="#94a3b8" className="text-[6px] font-mono">Nhiệt kế</text>
            
            {/* Equation */}
            <rect x="42" y="92" width="76" height="15" fill="#0f172a" stroke="#ef4444" strokeWidth="1" rx="2" />
            <text x="80" y="102" fill="#ef4444" textAnchor="middle" className="text-[7.5px] font-black font-mono">Q = U.I.t = m.c.Δt</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Năng lượng điện tỏa ra từ dây điện trở chuyển hóa hoàn toàn thành nhiệt lượng hấp thụ của hệ</span>
        </div>
      );
    case "water_vs_sand":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Điều Hòa Khí Hậu: Nước vs Cát</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Sun in the middle */}
            <circle cx="80" cy="25" r="10" fill="#f59e0b" className="animate-pulse" />
            <line x1="80" y1="10" x2="80" y2="5" stroke="#f59e0b" strokeWidth="1" />
            <line x1="80" y1="40" x2="80" y2="45" stroke="#f59e0b" strokeWidth="1" />
            <line x1="65" y1="25" x2="60" y2="25" stroke="#f59e0b" strokeWidth="1" />
            <line x1="95" y1="25" x2="100" y2="25" stroke="#f59e0b" strokeWidth="1" />
            
            {/* Left side: Land (Sand) */}
            <rect x="15" y="60" width="65" height="35" fill="#fef08a" stroke="#eab308" strokeWidth="1" rx="2" />
            <text x="47" y="75" fill="#854d0e" textAnchor="middle" className="text-[7.5px] font-black font-sans">ĐẤT ĐÁ (CÁT)</text>
            <text x="47" y="85" fill="#854d0e" textAnchor="middle" className="text-[6.5px] font-mono font-bold">c ≈ 800 J/kg.K</text>
            <text x="47" y="93" fill="#ef4444" textAnchor="middle" className="text-[6px] font-mono font-black">Nóng nhanh - Nguội nhanh</text>
            
            {/* Right side: Ocean (Water) */}
            <rect x="80" y="60" width="65" height="35" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" rx="2" />
            <text x="112" y="75" fill="#0369a1" textAnchor="middle" className="text-[7.5px] font-black font-sans">ĐẠI DƯƠNG (NƯỚC)</text>
            <text x="112" y="85" fill="#0369a1" textAnchor="middle" className="text-[6.5px] font-mono font-bold">c ≈ 4200 J/kg.K</text>
            <text x="112" y="93" fill="#0369a1" textAnchor="middle" className="text-[6px] font-mono font-black">Nóng chậm - Nguội chậm</text>
            
            {/* Sea breeze arrows */}
            <path d="M 47 50 Q 80 40 112 50" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="3" />
            <path d="M 112 55 Q 80 65 47 55" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3" />
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Do chênh lệch nhiệt dung riêng lớn, biển và đất liền hấp thụ nhiệt mặt trời tạo gió đối lưu ôn hòa khí hậu</span>
        </div>
      );
    case "piston_compressed_l11":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Nén khí kèm đun nóng (Trạng thái 1 &rarr; Trạng thái 2)</span>
          <svg className="w-56 h-36" viewBox="0 0 220 120">
            {/* Left State (Trạng thái 1) */}
            <g transform="translate(10, 5)">
              <text x="40" y="12" fill="#38bdf8" textAnchor="middle" className="text-[7.5px] font-black font-mono">TRẠNG THÁI 1</text>
              <rect x="10" y="20" width="60" height="65" fill="none" stroke="#475569" strokeWidth="1.5" rx="2" />
              {/* Piston high position */}
              <rect x="11" y="30" width="58" height="6" fill="#64748b" rx="1" />
              <line x1="40" y1="5" x2="40" y2="30" stroke="#64748b" strokeWidth="2" />
              {/* Gas molecules */}
              <circle cx="28" cy="50" r="2" fill="#38bdf8" />
              <circle cx="45" cy="65" r="2" fill="#38bdf8" />
              <circle cx="62" cy="55" r="2" fill="#38bdf8" />
              <circle cx="35" cy="75" r="2" fill="#38bdf8" />
              <circle cx="55" cy="72" r="2" fill="#38bdf8" />
              {/* Labels */}
              <text x="40" y="98" fill="#94a3b8" textAnchor="middle" className="text-[6.5px] font-mono">V1 = 6 Lít</text>
              <text x="40" y="106" fill="#94a3b8" textAnchor="middle" className="text-[6.5px] font-mono">p1 = 1,5 atm</text>
              <text x="40" y="114" fill="#94a3b8" textAnchor="middle" className="text-[6.5px] font-mono">T1 = 300 K (27°C)</text>
            </g>

            {/* Arrow in middle */}
            <g transform="translate(95, 50)">
              <line x1="-8" y1="0" x2="8" y2="0" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRedTiny_L11)" />
              <text x="0" y="-8" fill="#ef4444" textAnchor="middle" className="text-[6px] font-black font-mono">NÉN + NHIỆT</text>
            </g>

            {/* Right State (Trạng thái 2) */}
            <g transform="translate(140, 5)">
              <text x="40" y="12" fill="#f43f5e" textAnchor="middle" className="text-[7.5px] font-black font-mono">TRẠNG THÁI 2</text>
              <rect x="10" y="20" width="60" height="65" fill="none" stroke="#f43f5e" strokeWidth="1.5" rx="2" />
              {/* Piston compressed (low) position */}
              <rect x="11" y="55" width="58" height="6" fill="#64748b" rx="1" />
              <line x1="40" y1="5" x2="40" y2="55" stroke="#64748b" strokeWidth="2" />
              {/* More energetic, compressed gas molecules */}
              <circle cx="28" cy="70" r="2" fill="#f43f5e" />
              <circle cx="45" cy="75" r="2" fill="#f43f5e" />
              <circle cx="62" cy="68" r="2" fill="#f43f5e" />
              <circle cx="35" cy="80" r="2" fill="#f43f5e" />
              <circle cx="55" cy="78" r="2" fill="#f43f5e" />
              {/* Fire sparks underneath */}
              <path d="M 30 90 Q 40 87 50 90" fill="none" stroke="#f59e0b" strokeWidth="1" />
              {/* Labels */}
              <text x="40" y="98" fill="#e2e8f0" textAnchor="middle" className="text-[6.5px] font-bold font-mono">V2 = 3 Lít</text>
              <text x="40" y="106" fill="#e2e8f0" textAnchor="middle" className="text-[6.5px] font-bold font-mono">p2 = 5,0 atm (?)</text>
              <text x="40" y="114" fill="#e2e8f0" textAnchor="middle" className="text-[6.5px] font-bold font-mono">T2 = 500 K (227°C)</text>
            </g>

            <defs>
              <marker id="arrowRedTiny_L11" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#ef4444" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Thể tích giảm một nửa và nhiệt độ tăng tuyệt đối dẫn tới áp suất khí tăng gấp 3,33 lần</span>
        </div>
      );
    case "spray_can_fire":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Bình xịt nhôm ném vào đống lửa (Đẳng tích)</span>
          <svg className="w-56 h-36" viewBox="0 0 220 120">
            {/* Fire flame background on the right */}
            <g transform="translate(110, 20)">
              {/* Fire design */}
              <path d="M 10 70 Q 25 20 40 70 Q 55 30 70 70 Z" fill="#ea580c" fillOpacity="0.4" />
              <path d="M 20 70 Q 35 35 50 70 Q 60 40 70 70 Z" fill="#ca8a04" fillOpacity="0.6" />
              <path d="M 30 70 Q 45 45 55 70" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
            </g>

            {/* Spray can */}
            <g transform="translate(30, 10)">
              {/* Can body */}
              <rect x="15" y="15" width="30" height="60" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" rx="3" />
              {/* Cap / nozzle */}
              <rect x="25" y="7" width="10" height="8" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
              <circle cx="30" cy="5" r="2" fill="#ef4444" />
              
              {/* Danger label on can */}
              <rect x="18" y="35" width="24" height="20" fill="#7f1d1d" rx="1" />
              <text x="30" y="44" fill="#fca5a5" textAnchor="middle" className="text-[5px] font-black font-mono">DANGER</text>
              <text x="30" y="51" fill="#fca5a5" textAnchor="middle" className="text-[4px] font-mono">PRESSURE</text>
              
              {/* Labels */}
              <text x="30" y="85" fill="#94a3b8" textAnchor="middle" className="text-[6.5px] font-mono font-bold">V = const</text>
              <text x="30" y="93" fill="#94a3b8" textAnchor="middle" className="text-[6.5px] font-mono">p0 = 1,2 atm</text>
              <text x="30" y="101" fill="#94a3b8" textAnchor="middle" className="text-[6.5px] font-mono">t0 = 27°C</text>
            </g>

            {/* Right details / warning gauge */}
            <g transform="translate(130, 15)">
              {/* Gauge circle */}
              <circle cx="30" cy="30" r="22" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
              {/* Gauge zones */}
              <path d="M 14 30 A 16 16 0 0 1 30 14" fill="none" stroke="#22c55e" strokeWidth="3" />
              <path d="M 30 14 A 16 16 0 0 1 46 30" fill="none" stroke="#eab308" strokeWidth="3" />
              <path d="M 46 30 A 16 16 0 0 1 30 46" fill="none" stroke="#ef4444" strokeWidth="3" />
              
              {/* Gauge needle pointing to danger limit 3.6 atm */}
              <line x1="30" y1="30" x2="44" y2="35" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <circle cx="30" cy="30" r="3.5" fill="#ffffff" />
              
              <text x="30" y="5" fill="#f43f5e" textAnchor="middle" className="text-[6.5px] font-black font-mono">NGƯỠNG NỔ</text>
              <text x="30" y="58" fill="#e2e8f0" textAnchor="middle" className="text-[6.5px] font-bold font-mono">p_max = 3,6 atm</text>
              <text x="30" y="66" fill="#f43f5e" textAnchor="middle" className="text-[6.5px] font-bold font-mono">T_min = 900 K</text>
              <text x="30" y="74" fill="#f43f5e" textAnchor="middle" className="text-[6px] font-mono font-bold">(627 °C)</text>
            </g>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Bình nhôm thể tích cố định, khi nhiệt độ tăng gấp 3 lần (300K lên 900K) áp suất sẽ tăng tỉ lệ thuận vượt giới hạn nổ</span>
        </div>
      );
    case "helium_tank":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Bình chứa khí Helium (Phương trình Clapeyron-Mendeleev)</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Helium steel tank */}
            <rect x="50" y="15" width="45" height="65" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="6" />
            <rect x="60" y="7" width="25" height="8" fill="#64748b" stroke="#334155" strokeWidth="1" />
            <circle cx="72.5" cy="4" r="3.5" fill="#ef4444" />
            
            {/* Gauge on side */}
            <circle cx="107" cy="18" r="11" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
            <line x1="107" y1="18" x2="114" y2="12" stroke="#eab308" strokeWidth="1.5" />
            <text x="122" y="21" fill="#eab308" className="text-[6.5px] font-bold font-mono">4,1 atm</text>

            {/* Helium atoms inside container */}
            <g>
              <circle cx="58" cy="28" r="2.5" fill="#60a5fa" />
              <line x1="58" y1="28" x2="62" y2="25" stroke="#60a5fa" strokeWidth="0.5" />
              
              <circle cx="82" cy="35" r="2.5" fill="#60a5fa" />
              <line x1="82" y1="35" x2="77" y2="38" stroke="#60a5fa" strokeWidth="0.5" />
              
              <circle cx="68" cy="50" r="2.5" fill="#60a5fa" />
              <line x1="68" y1="50" x2="72" y2="54" stroke="#60a5fa" strokeWidth="0.5" />
              
              <circle cx="85" cy="62" r="2.5" fill="#60a5fa" />
              <line x1="85" y1="62" x2="80" y2="65" stroke="#60a5fa" strokeWidth="0.5" />
              
              <circle cx="60" cy="70" r="2.5" fill="#60a5fa" />
              <line x1="60" y1="70" x2="64" y2="73" stroke="#60a5fa" strokeWidth="0.5" />

              <text x="72.5" y="42" fill="#ffffff" textAnchor="middle" className="text-[8px] font-black font-mono">He</text>
            </g>

            {/* Labels */}
            <text x="15" y="93" fill="#cbd5e1" className="text-[7px] font-mono font-bold">Thể tích: V = 12 L</text>
            <text x="15" y="101" fill="#cbd5e1" className="text-[7px] font-mono font-bold">Khối lượng: m = 8 g He</text>
            <text x="110" y="93" fill="#cbd5e1" className="text-[7px] font-mono font-bold">Nhiệt độ: 27°C (300K)</text>
            <text x="110" y="101" fill="#cbd5e1" className="text-[7px] font-mono font-bold">Số mol: n = 2 mol</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Áp dụng công thức p.V = n.R.T với n = m/M = 2 mol, R = 0,0821 atm.L/(mol.K)</span>
        </div>
      );
    case "soap_bubble_ascent":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Bong bóng xà phòng nổi lên cao (Thay đổi p, V, T)</span>
          <svg className="w-56 h-36" viewBox="0 0 220 120">
            {/* Ground / Low Level (Left bottom) */}
            <g transform="translate(15, 45)">
              {/* Grass baseline */}
              <line x1="0" y1="40" x2="65" y2="40" stroke="#22c55e" strokeWidth="1" />
              {/* Bubble 1: smaller, highly reflective */}
              <circle cx="30" cy="20" r="12" fill="url(#bubbleGrad)" stroke="#38bdf8" strokeWidth="1" fillOpacity="0.4" />
              {/* Highlight */}
              <ellipse cx="26" cy="15" rx="3" ry="1.5" transform="rotate(-30 26 15)" fill="#ffffff" fillOpacity="0.7" />
              
              {/* Labels */}
              <text x="30" y="47" fill="#94a3b8" textAnchor="middle" className="text-[6px] font-mono font-black">MẶT ĐẤT (Thấp)</text>
              <text x="30" y="53" fill="#38bdf8" textAnchor="middle" className="text-[6.5px] font-mono font-bold">V1 = 10 cm³</text>
              <text x="30" y="59" fill="#94a3b8" textAnchor="middle" className="text-[5.5px] font-mono">p1 = 1,0.10⁵ Pa</text>
              <text x="30" y="65" fill="#94a3b8" textAnchor="middle" className="text-[5.5px] font-mono">T1 = 300 K (27°C)</text>
            </g>

            {/* Ascent dotted path with arrow */}
            <path d="M 70 80 Q 110 50 140 30" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3" markerEnd="url(#arrowCyanTiny_L11_2)" />
            <text x="110" y="45" fill="#06b6d4" textAnchor="middle" className="text-[6px] font-black font-mono">BAY LÊN CAO</text>

            {/* High Level (Right top) */}
            <g transform="translate(135, 5)">
              {/* Cloud back */}
              <path d="M -5 32 C 5 28, 15 35, 25 32 C 35 28, 45 35, 55 32" fill="none" stroke="#475569" strokeWidth="0.75" />
              
              {/* Bubble 2: larger, thinner reflection */}
              <circle cx="25" cy="22" r="16" fill="url(#bubbleGrad)" stroke="#f472b6" strokeWidth="0.75" fillOpacity="0.3" />
              <ellipse cx="20" cy="15" rx="4" ry="2" transform="rotate(-30 20 15)" fill="#ffffff" fillOpacity="0.6" />
              
              {/* Labels */}
              <text x="25" y="45" fill="#f472b6" textAnchor="middle" className="text-[6px] font-mono font-black">TRÊN CAO</text>
              <text x="25" y="51" fill="#f472b6" textAnchor="middle" className="text-[6.5px] font-mono font-bold">V2 = 11,67 cm³ (?)</text>
              <text x="25" y="57" fill="#f472b6" textAnchor="middle" className="text-[5.5px] font-mono">p2 = 0,8.10⁵ Pa</text>
              <text x="25" y="63" fill="#f472b6" textAnchor="middle" className="text-[5.5px] font-mono">T2 = 280 K (7°C)</text>
            </g>

            <defs>
              <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.6" />
                <stop offset="40%" stopColor="#f472b6" stopOpacity="0.3" />
                <stop offset="70%" stopColor="#c084fc" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.6" />
              </linearGradient>
              <marker id="arrowCyanTiny_L11_2" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#06b6d4" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Bong bóng bay lên cao gặp áp suất giảm nên nở to ra, dù nhiệt độ giảm nhẹ có xu hướng làm co lại</span>
        </div>
      );
    case "engine_cylinder_compression":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Kì nén động cơ đốt trong (Tỉ số nén 8:1)</span>
          <svg className="w-56 h-36" viewBox="0 0 220 120">
            {/* Left: State 1 (Before compression - intake full) */}
            <g transform="translate(10, 5)">
              <text x="40" y="10" fill="#38bdf8" textAnchor="middle" className="text-[7px] font-black font-mono">HÚT ĐẦY KHÍ (V1)</text>
              {/* Cylinder walls */}
              <line x1="15" y1="15" x2="15" y2="90" stroke="#475569" strokeWidth="1.5" />
              <line x1="65" y1="15" x2="65" y2="90" stroke="#475569" strokeWidth="1.5" />
              {/* Spark plug head */}
              <rect x="36" y="8" width="8" height="8" fill="#64748b" />
              
              {/* Piston low position */}
              <rect x="16" y="65" width="48" height="15" fill="#334155" stroke="#475569" strokeWidth="1" />
              <line x1="40" y1="80" x2="40" y2="105" stroke="#64748b" strokeWidth="2.5" />
              
              {/* Gas molecules spread out */}
              <circle cx="25" cy="25" r="1.5" fill="#38bdf8" />
              <circle cx="55" cy="30" r="1.5" fill="#38bdf8" />
              <circle cx="35" cy="45" r="1.5" fill="#38bdf8" />
              <circle cx="50" cy="55" r="1.5" fill="#38bdf8" />
              <circle cx="28" cy="55" r="1.5" fill="#38bdf8" />
              
              {/* Labels */}
              <text x="40" y="112" fill="#94a3b8" textAnchor="middle" className="text-[5.5px] font-mono">p1 = 1,0.10⁵ Pa</text>
              <text x="40" y="118" fill="#94a3b8" textAnchor="middle" className="text-[5.5px] font-mono">t1 = 47°C (320K)</text>
            </g>

            {/* Arrow */}
            <g transform="translate(100, 50)">
              <line x1="-8" y1="0" x2="8" y2="0" stroke="#ef4444" strokeWidth="1.2" markerEnd="url(#arrowRedTiny_L11_3)" />
              <text x="0" y="-6" fill="#ef4444" textAnchor="middle" className="text-[5.5px] font-black font-mono">KÌ NÉN</text>
              <text x="0" y="10" fill="#a8a29e" textAnchor="middle" className="text-[5px] font-mono font-bold">V1/V2 = 8</text>
            </g>

            {/* Right: State 2 (Fully compressed) */}
            <g transform="translate(140, 5)">
              <text x="40" y="10" fill="#ef4444" textAnchor="middle" className="text-[7px] font-black font-mono">NÉN CỰC ĐẠI (V2)</text>
              {/* Cylinder walls */}
              <line x1="15" y1="15" x2="15" y2="90" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="65" y1="15" x2="65" y2="90" stroke="#f43f5e" strokeWidth="1.5" />
              {/* Spark plug head */}
              <rect x="36" y="8" width="8" height="8" fill="#64748b" />
              
              {/* Piston high position */}
              <rect x="16" y="25" width="48" height="15" fill="#334155" stroke="#f43f5e" strokeWidth="1" />
              <line x1="40" y1="40" x2="40" y2="105" stroke="#64748b" strokeWidth="2.5" />
              
              {/* Highly energetic & compressed gas molecules */}
              <circle cx="25" cy="20" r="1.5" fill="#f43f5e" />
              <circle cx="55" cy="18" r="1.5" fill="#f43f5e" />
              <circle cx="38" cy="22" r="1.5" fill="#f43f5e" />
              <circle cx="48" cy="20" r="1.5" fill="#f43f5e" />
              
              {/* Glow indicating heat */}
              <rect x="16" y="16" width="48" height="8" fill="#f59e0b" fillOpacity="0.25" />
              
              {/* Labels */}
              <text x="40" y="112" fill="#e2e8f0" textAnchor="middle" className="text-[5.5px] font-bold font-mono">p2 = 16,0.10⁵ Pa</text>
              <text x="40" y="118" fill="#f43f5e" textAnchor="middle" className="text-[5.5px] font-black font-mono">T2 = 640 K (?)</text>
            </g>

            <defs>
              <marker id="arrowRedTiny_L11_3" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#ef4444" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Nén khí nhanh làm thể tích giảm 8 lần và áp suất tăng 16 lần đưa nhiệt độ tuyệt đối lên gấp đôi (640 K)</span>
        </div>
      );
    case "piston_compressed_l11_q6":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Quá trình nén khí thay đổi 3 thông số</span>
          <svg className="w-56 h-36" viewBox="0 0 220 120">
            {/* Left: State 1 */}
            <g transform="translate(10, 5)">
              <text x="40" y="10" fill="#38bdf8" textAnchor="middle" className="text-[7px] font-black font-mono">TRẠNG THÁI 1</text>
              <rect x="10" y="16" width="60" height="70" fill="none" stroke="#475569" strokeWidth="1.5" rx="2" />
              {/* Piston high */}
              <rect x="11" y="24" width="58" height="6" fill="#64748b" rx="1" />
              <line x1="40" y1="4" x2="40" y2="24" stroke="#64748b" strokeWidth="2" />
              {/* Gas */}
              <circle cx="20" cy="45" r="2" fill="#38bdf8" />
              <circle cx="50" cy="50" r="2" fill="#38bdf8" />
              <circle cx="35" cy="65" r="2" fill="#38bdf8" />
              <circle cx="55" cy="70" r="2" fill="#38bdf8" />
              
              {/* Labels */}
              <text x="40" y="98" fill="#94a3b8" textAnchor="middle" className="text-[6px] font-mono">V1 = 15 Lít</text>
              <text x="40" y="106" fill="#94a3b8" textAnchor="middle" className="text-[6px] font-mono">p1 = 1,2 atm</text>
              <text x="40" y="114" fill="#94a3b8" textAnchor="middle" className="text-[6px] font-mono">T1 = 300 K (27°C)</text>
            </g>

            {/* Compression Arrow */}
            <g transform="translate(95, 50)">
              <line x1="-8" y1="0" x2="8" y2="0" stroke="#f59e0b" strokeWidth="1.2" markerEnd="url(#arrowOrangeTiny_L11_4)" />
              <text x="0" y="-6" fill="#f59e0b" textAnchor="middle" className="text-[5px] font-black font-mono">NÉN TĂNG ÁP</text>
            </g>

            {/* Right: State 2 */}
            <g transform="translate(140, 5)">
              <text x="40" y="10" fill="#f59e0b" textAnchor="middle" className="text-[7px] font-black font-mono">TRẠNG THÁI 2</text>
              <rect x="10" y="16" width="60" height="70" fill="none" stroke="#f59e0b" strokeWidth="1.5" rx="2" />
              {/* Piston low */}
              <rect x="11" y="48" width="58" height="6" fill="#64748b" rx="1" />
              <line x1="40" y1="4" x2="40" y2="48" stroke="#64748b" strokeWidth="2" />
              {/* Gas */}
              <circle cx="25" cy="60" r="2" fill="#f59e0b" />
              <circle cx="50" cy="64" r="2" fill="#f59e0b" />
              <circle cx="35" cy="74" r="2" fill="#f59e0b" />
              
              {/* Labels */}
              <text x="40" y="98" fill="#e2e8f0" textAnchor="middle" className="text-[6px] font-bold font-mono">V2 = 9 Lít</text>
              <text x="40" y="106" fill="#e2e8f0" textAnchor="middle" className="text-[6px] font-bold font-mono">p2 = 2,4 atm</text>
              <text x="40" y="114" fill="#f59e0b" textAnchor="middle" className="text-[6px] font-black font-mono">T2 = 360 K (&Delta;T = 60K)</text>
            </g>

            <defs>
              <marker id="arrowOrangeTiny_L11_4" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#f59e0b" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center">Thể tích giảm 1,67 lần trong khi áp suất tăng gấp đôi làm nhiệt độ tuyệt đối của khối khí tăng thêm 60 Kelvin (đạt 360 K)</span>
        </div>
      );
    case "molecular_force_graph":
      return (
        <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl mt-2 max-w-sm mx-auto shadow-sm">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Đồ thị lực tương tác phân tử</span>
          <svg className="w-56 h-36" viewBox="0 0 200 130">
            <line x1="20" y1="65" x2="190" y2="65" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGray_L1)" />
            <line x1="40" y1="10" x2="40" y2="120" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGray_L1)" />
            
            <text x="185" y="75" fill="#64748b" className="text-[7px] font-bold font-mono">r</text>
            <text x="45" y="15" fill="#64748b" className="text-[7px] font-bold font-mono">F (Lực)</text>
            <text x="32" y="72" fill="#64748b" className="text-[7px] font-mono">O</text>
            
            <text x="50" y="25" fill="#ef4444" className="text-[7px] font-black font-mono">LỰC ĐẨY (F &gt; 0)</text>
            <text x="110" y="110" fill="#3b82f6" className="text-[7px] font-black font-mono">LỰC HÚT (F &lt; 0)</text>
            
            <path d="M 43 15 Q 46 65 75 65 Q 100 100 130 80 Q 160 68 185 66" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            
            <circle cx="75" cy="65" r="3" fill="#10b981" />
            <line x1="75" y1="65" x2="75" y2="75" stroke="#10b981" strokeWidth="1" strokeDasharray="2" />
            <text x="73" y="85" fill="#10b981" className="text-[8px] font-black font-mono">r0</text>
            
            <defs>
              <marker id="arrowGray_L1" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8.5px] text-slate-500 italic mt-1 text-center font-bold">Tại khoảng cách r = r0, lực đẩy và lực hút triệt tiêu nhau (F = 0)</span>
        </div>
      );
    case "ice_heating_curve":
      return (
        <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl mt-2 max-w-sm mx-auto shadow-sm">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Đồ thị chuyển thể nước đá</span>
          <svg className="w-56 h-36" viewBox="0 0 200 130">
            <line x1="25" y1="110" x2="190" y2="110" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGray_L1)" />
            <line x1="35" y1="15" x2="35" y2="120" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGray_L1)" />
            
            <text x="185" y="118" fill="#64748b" className="text-[7px] font-bold font-mono">t (phút)</text>
            <text x="40" y="20" fill="#64748b" className="text-[7px] font-bold font-mono">T (°C)</text>
            
            <line x1="35" y1="80" x2="190" y2="80" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" />
            <text x="22" y="83" fill="#475569" className="text-[7px] font-bold font-mono">0°C</text>
            
            <line x1="35" y1="35" x2="190" y2="35" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" />
            <text x="18" y="38" fill="#475569" className="text-[7px] font-bold font-mono">100°C</text>
            
            <path d="M 45 95 L 75 80 L 125 80 L 165 35 L 185 35" fill="none" stroke="#6366f1" strokeWidth="3" />
            
            <circle cx="75" cy="80" r="2.5" fill="#ef4444" />
            <circle cx="125" cy="80" r="2.5" fill="#ef4444" />
            
            <text x="72" y="73" fill="#ef4444" className="text-[7.5px] font-black">A</text>
            <text x="122" y="73" fill="#ef4444" className="text-[7.5px] font-black">B</text>
            
            <text x="48" y="90" fill="#64748b" className="text-[6px] font-bold">Nước đá (-10°C)</text>
            <text x="90" y="90" fill="#f59e0b" className="text-[6.5px] font-black font-mono">NÓNG CHẢY</text>
            <text x="135" y="60" fill="#3b82f6" className="text-[6px] font-bold">Nước lỏng</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Đoạn AB nằm ngang ở 0°C: Nước lỏng và đá đồng tồn tại trong khi nóng chảy</span>
        </div>
      );
    case "atmospheric_density_graph":
      return (
        <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl mt-2 max-w-sm mx-auto shadow-sm">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Phân bố mật độ khí theo độ cao</span>
          <svg className="w-56 h-36" viewBox="0 0 200 130">
            <line x1="25" y1="110" x2="190" y2="110" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGray_L1)" />
            <line x1="35" y1="15" x2="35" y2="120" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGray_L1)" />
            
            <text x="185" y="118" fill="#64748b" className="text-[7px] font-bold font-mono">độ cao h</text>
            <text x="40" y="20" fill="#64748b" className="text-[7px] font-bold font-mono">Mật độ (&rho;)</text>
            
            <path d="M 35 25 Q 45 80 160 105" fill="none" stroke="#ec4899" strokeWidth="2.5" />
            
            <circle cx="45" cy="100" r="1.5" fill="#6366f1" />
            <circle cx="50" cy="95" r="1.5" fill="#6366f1" />
            <circle cx="40" cy="105" r="1.5" fill="#6366f1" />
            <circle cx="55" cy="102" r="1.5" fill="#6366f1" />
            <circle cx="62" cy="98" r="1.5" fill="#6366f1" />
            
            <circle cx="80" cy="85" r="1.5" fill="#6366f1" />
            <circle cx="95" cy="88" r="1.5" fill="#6366f1" />
            <circle cx="110" cy="95" r="1.5" fill="#6366f1" />
            
            <circle cx="130" cy="70" r="1.5" fill="#6366f1" />
            <circle cx="160" cy="50" r="1.5" fill="#6366f1" />
            
            <text x="95" y="45" fill="#94a3b8" className="text-[7px] font-bold font-mono">Mật độ giảm theo hàm mũ</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Lực hấp dẫn của Trái Đất giữ các phân tử khí ở gần mặt đất hơn</span>
        </div>
      );
    case "brownian_pollen_path":
      return (
        <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl mt-2 max-w-sm mx-auto shadow-sm">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Quỹ đạo chuyển động Brown hỗn loạn</span>
          <svg className="w-56 h-36" viewBox="0 0 200 130">
            <path d="M 25 35 L 45 75 L 85 45 L 115 85 L 145 35 L 175 95" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="1.5" />
            
            <circle cx="115" cy="85" r="7" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
            <text x="115" y="80" fill="#d97706" className="text-[6.5px] font-black text-center" textAnchor="middle">Hạt phấn hoa</text>
            
            <circle cx="95" cy="80" r="2" fill="#3b82f6" />
            <path d="M 97 80 L 107 83" fill="none" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrowRedTiny_L1)" />
            
            <circle cx="132" cy="92" r="2" fill="#3b82f6" />
            <path d="M 130 91 L 122 87" fill="none" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrowRedTiny_L1)" />
            
            <circle cx="115" cy="105" r="2" fill="#3b82f6" />
            <path d="M 115 103 L 115 94" fill="none" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrowRedTiny_L1)" />
            
            <text x="45" y="20" fill="#475569" className="text-[7.5px] font-black font-mono">Va chạm bất đối xứng từ các phân tử nước</text>
            <defs>
              <marker id="arrowRedTiny_L1" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#ef4444" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Chuyển động hỗn loạn gián đoạn của hạt phấn hoa do va chạm liên tục của phân tử nước</span>
        </div>
      );
    case "three_states_matter":
      return (
        <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl mt-2 max-w-sm mx-auto shadow-sm">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Cấu trúc vi mô của ba thể vật chất</span>
          <div className="flex gap-2 justify-center items-center mt-1">
            <div className="flex flex-col items-center">
              <svg className="w-16 h-16 border border-slate-300 rounded-lg bg-white" viewBox="0 0 50 50">
                <circle cx="15" cy="15" r="3.5" fill="#475569" />
                <circle cx="25" cy="15" r="3.5" fill="#475569" />
                <circle cx="35" cy="15" r="3.5" fill="#475569" />
                <circle cx="15" cy="25" r="3.5" fill="#475569" />
                <circle cx="25" cy="25" r="3.5" fill="#475569" />
                <circle cx="35" cy="25" r="3.5" fill="#475569" />
                <circle cx="15" cy="35" r="3.5" fill="#475569" />
                <circle cx="25" cy="35" r="3.5" fill="#475569" />
                <circle cx="35" cy="35" r="3.5" fill="#475569" />
              </svg>
              <span className="text-[7.5px] font-black mt-1 text-slate-700">RẮN</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-16 h-16 border border-slate-300 rounded-lg bg-white" viewBox="0 0 50 50">
                <circle cx="13" cy="18" r="3.5" fill="#3b82f6" />
                <circle cx="21" cy="14" r="3.5" fill="#3b82f6" />
                <circle cx="31" cy="17" r="3.5" fill="#3b82f6" />
                <circle cx="16" cy="28" r="3.5" fill="#3b82f6" />
                <circle cx="27" cy="27" r="3.5" fill="#3b82f6" />
                <circle cx="37" cy="26" r="3.5" fill="#3b82f6" />
                <circle cx="20" cy="38" r="3.5" fill="#3b82f6" />
                <circle cx="32" cy="38" r="3.5" fill="#3b82f6" />
              </svg>
              <span className="text-[7.5px] font-black mt-1 text-slate-700">LỎNG</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-16 h-16 border border-slate-300 rounded-lg bg-white" viewBox="0 0 50 50">
                <g>
                  <circle cx="12" cy="15" r="3" fill="#10b981" />
                  <line x1="12" y1="15" x2="6" y2="10" stroke="#10b981" strokeWidth="1" />
                </g>
                <g>
                  <circle cx="38" cy="20" r="3" fill="#10b981" />
                  <line x1="38" y1="20" x2="44" y2="28" stroke="#10b981" strokeWidth="1" />
                </g>
                <g>
                  <circle cx="22" cy="38" r="3" fill="#10b981" />
                  <line x1="22" y1="38" x2="14" y2="44" stroke="#10b981" strokeWidth="1" />
                </g>
              </svg>
              <span className="text-[7.5px] font-black mt-1 text-slate-700">KHÍ</span>
            </div>
          </div>
          <span className="text-[8px] text-slate-500 italic mt-1.5 text-center font-bold">Mức độ trật tự giảm dần và khoảng cách phân tử tăng dần từ rắn sang lỏng và khí</span>
        </div>
      );
    case "heating_cooling_states":
      return (
        <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl mt-2 max-w-sm mx-auto shadow-sm">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Sơ đồ chuyển trạng thái vật chất</span>
          <svg className="w-56 h-36" viewBox="0 0 200 130">
            <rect x="15" y="50" width="40" height="25" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" rx="3" />
            <text x="35" y="66" fill="#1e293b" textAnchor="middle" className="text-[8px] font-black">RẮN</text>
            
            <rect x="80" y="10" width="40" height="25" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="3" />
            <text x="100" y="26" fill="#1d4ed8" textAnchor="middle" className="text-[8px] font-black">LỎNG</text>
            
            <rect x="145" y="50" width="40" height="25" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5" rx="3" />
            <text x="165" y="66" fill="#047857" textAnchor="middle" className="text-[8px] font-black">KHÍ (HƠI)</text>
            
            <path d="M 35 50 Q 55 20 80 20" fill="none" stroke="#ef4444" strokeWidth="1.2" markerEnd="url(#arrowRedTiny_L1_2)" />
            <text x="50" y="16" fill="#ef4444" className="text-[6px] font-black">Nóng chảy</text>
            
            <path d="M 80 25 Q 55 35 35 50" fill="none" stroke="#3b82f6" strokeWidth="1.2" markerEnd="url(#arrowBlueTiny_L1_2)" />
            <text x="52" y="38" fill="#3b82f6" className="text-[6px] font-black">Đông đặc</text>
            
            <path d="M 120 20 Q 145 20 165 50" fill="none" stroke="#ef4444" strokeWidth="1.2" markerEnd="url(#arrowRedTiny_L1_2)" />
            <text x="148" y="16" fill="#ef4444" className="text-[6px] font-black">Hóa hơi</text>
            
            <path d="M 165 50 Q 145 35 120 25" fill="none" stroke="#3b82f6" strokeWidth="1.2" markerEnd="url(#arrowBlueTiny_L1_2)" />
            <text x="143" y="38" fill="#3b82f6" className="text-[6px] font-black">Ngưng tụ</text>
            
            <path d="M 35 75 Q 100 115 165 75" fill="none" stroke="#f59e0b" strokeWidth="1.2" markerEnd="url(#arrowOrangeTiny_L1_2)" />
            <text x="100" y="103" fill="#f59e0b" textAnchor="middle" className="text-[6.5px] font-black">Thăng hoa</text>
            
            <path d="M 165 75 Q 100 85 35 75" fill="none" stroke="#3b82f6" strokeWidth="1.2" markerEnd="url(#arrowBlueTiny_L1_2)" />
            <text x="100" y="77" fill="#6366f1" textAnchor="middle" className="text-[6.5px] font-black">Ngưng kết</text>
            <defs>
              <marker id="arrowRedTiny_L1_2" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#ef4444" />
              </marker>
              <marker id="arrowBlueTiny_L1_2" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#3b82f6" />
              </marker>
              <marker id="arrowOrangeTiny_L1_2" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#f59e0b" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Các quá trình hấp thụ nhiệt màu đỏ/cam, các quá trình giải phóng nhiệt màu xanh</span>
        </div>
      );
    case "crystal_vs_amorphous_structure":
      return (
        <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl mt-2 max-w-sm mx-auto shadow-sm">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Cấu trúc Rắn Kết tinh vs Rắn Vô định hình</span>
          <div className="flex gap-4 justify-center items-center mt-1">
            <div className="flex flex-col items-center">
              <svg className="w-24 h-20 border border-slate-300 rounded-lg bg-white" viewBox="0 0 80 60">
                <line x1="15" y1="15" x2="65" y2="15" stroke="#94a3b8" strokeWidth="1" />
                <line x1="15" y1="30" x2="65" y2="30" stroke="#94a3b8" strokeWidth="1" />
                <line x1="15" y1="45" x2="65" y2="45" stroke="#94a3b8" strokeWidth="1" />
                <line x1="15" y1="15" x2="15" y2="45" stroke="#94a3b8" strokeWidth="1" />
                <line x1="31" y1="15" x2="31" y2="45" stroke="#94a3b8" strokeWidth="1" />
                <line x1="48" y1="15" x2="48" y2="45" stroke="#94a3b8" strokeWidth="1" />
                <line x1="65" y1="15" x2="65" y2="45" stroke="#94a3b8" strokeWidth="1" />
                
                <circle cx="15" cy="15" r="2.5" fill="#f59e0b" />
                <circle cx="31" cy="15" r="2.5" fill="#f59e0b" />
                <circle cx="48" cy="15" r="2.5" fill="#f59e0b" />
                <circle cx="65" cy="15" r="2.5" fill="#f59e0b" />
                <circle cx="15" cy="30" r="2.5" fill="#f59e0b" />
                <circle cx="31" cy="30" r="2.5" fill="#f59e0b" />
                <circle cx="48" cy="30" r="2.5" fill="#f59e0b" />
                <circle cx="65" cy="30" r="2.5" fill="#f59e0b" />
                <circle cx="15" cy="45" r="2.5" fill="#f59e0b" />
                <circle cx="31" cy="45" r="2.5" fill="#f59e0b" />
                <circle cx="48" cy="45" r="2.5" fill="#f59e0b" />
                <circle cx="65" cy="45" r="2.5" fill="#f59e0b" />
              </svg>
              <span className="text-[7.5px] font-black mt-1 text-slate-700">Có trật tự hình học</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-24 h-20 border border-slate-300 rounded-lg bg-white" viewBox="0 0 80 60">
                <path d="M 15 12 L 25 24 L 18 38 L 35 48 L 52 35 L 48 22 L 68 18 L 58 45 L 35 48" fill="none" stroke="#94a3b8" strokeWidth="1" />
                <circle cx="15" cy="12" r="2.5" fill="#6366f1" />
                <circle cx="25" cy="24" r="2.5" fill="#6366f1" />
                <circle cx="18" cy="38" r="2.5" fill="#6366f1" />
                <circle cx="35" cy="48" r="2.5" fill="#6366f1" />
                <circle cx="52" cy="35" r="2.5" fill="#6366f1" />
                <circle cx="48" cy="22" r="2.5" fill="#6366f1" />
                <circle cx="68" cy="18" r="2.5" fill="#6366f1" />
                <circle cx="58" cy="45" r="2.5" fill="#6366f1" />
              </svg>
              <span className="text-[7.5px] font-black mt-1 text-slate-700">Tuần hoàn hỗn loạn</span>
            </div>
          </div>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Chất rắn kết tinh nóng chảy phẳng xác định, chất vô định hình mềm dần dẻo ra</span>
        </div>
      );
    case "gas_cylinder_temp":
      return (
        <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl mt-2 max-w-sm mx-auto shadow-sm">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Bình kín nung khí đẳng tích</span>
          <svg className="w-56 h-36" viewBox="0 0 200 130">
            <rect x="65" y="20" width="70" height="85" fill="#475569" stroke="#1e293b" strokeWidth="2" rx="6" />
            <rect x="80" y="10" width="40" height="10" fill="#64748b" rx="1" />
            
            <circle cx="100" cy="42" r="14" fill="white" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="100" y1="42" x2="108" y2="34" stroke="#ef4444" strokeWidth="2" />
            <text x="100" y="52" fill="#1e293b" textAnchor="middle" className="text-[5.5px] font-black font-mono">P2 = 2.P1</text>
            
            <circle cx="75" cy="70" r="2" fill="#38bdf8" />
            <circle cx="125" cy="75" r="2" fill="#38bdf8" />
            <circle cx="95" cy="80" r="2" fill="#38bdf8" />
            <circle cx="115" cy="65" r="2" fill="#38bdf8" />
            <circle cx="85" cy="88" r="2" fill="#38bdf8" />
            <circle cx="105" cy="92" r="2" fill="#38bdf8" />
            
            <text x="18" y="55" fill="#475569" className="text-[7px] font-bold font-mono">Ban đầu:</text>
            <text x="18" y="65" fill="#475569" className="text-[7.5px] font-black font-mono">T1 = 300 K</text>
            <text x="18" y="73" fill="#64748b" className="text-[6.5px] font-mono">(27 °C)</text>
            
            <text x="145" y="55" fill="#ea580c" className="text-[7px] font-bold font-mono">Sau khi nung:</text>
            <text x="145" y="65" fill="#ea580c" className="text-[7.5px] font-black font-mono">T2 = 600 K</text>
            <text x="145" y="73" fill="#d97706" className="text-[6.5px] font-mono">(327 °C)</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Quá trình đẳng tích (V không đổi): Áp suất tăng 2 lần thì nhiệt độ tuyệt đối tăng 2 lần</span>
        </div>
      );
    case "condensation_heat":
      return (
        <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl mt-2 max-w-sm mx-auto shadow-sm">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Hóa hơi và tỏa nhiệt ngưng tụ</span>
          <svg className="w-56 h-36" viewBox="0 0 200 130">
            <path d="M 50 25 L 50 100 Q 50 110 60 110 L 110 110 Q 120 110 120 100 L 120 25" fill="none" stroke="#475569" strokeWidth="2" />
            
            <path d="M 51 65 Q 85 62 119 65 L 119 108 L 51 108 Z" fill="#3b82f6" fillOpacity="0.15" />
            
            <circle cx="70" cy="85" r="2.5" fill="none" stroke="#3b82f6" strokeWidth="1" />
            <circle cx="85" cy="75" r="3" fill="none" stroke="#3b82f6" strokeWidth="1" />
            <circle cx="100" cy="90" r="2" fill="none" stroke="#3b82f6" strokeWidth="1" />
            
            <path d="M 65 50 Q 60 30 70 20" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2" />
            <path d="M 85 50 Q 90 32 80 18" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2" />
            <path d="M 105 50 Q 100 30 110 20" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2" />
            
            <rect x="130" y="45" width="62" height="40" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" rx="3" />
            <text x="161" y="58" fill="#1e293b" textAnchor="middle" className="text-[7px] font-black font-mono">Q = m . L</text>
            <text x="161" y="68" fill="#475569" textAnchor="middle" className="text-[5.5px] font-mono">m = 0.1 kg</text>
            <text x="161" y="78" fill="#10b981" textAnchor="middle" className="text-[6.5px] font-black font-mono">Q = 230 kJ</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Nhiệt lượng cần cung cấp tỉ lệ thuận với khối lượng chất lỏng và nhiệt hóa hơi riêng</span>
        </div>
      );
    case "calorimeter_metal_water":
      return (
        <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl mt-2 max-w-sm mx-auto shadow-sm">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Nhiệt lượng kế và cân bằng nhiệt</span>
          <svg className="w-56 h-36" viewBox="0 0 200 130">
            <rect x="40" y="15" width="80" height="95" fill="none" stroke="#475569" strokeWidth="3" rx="4" />
            <rect x="44" y="19" width="72" height="87" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" rx="2" />
            
            <path d="M 45 60 Q 80 57 115 60 L 115 104 L 45 104 Z" fill="#3b82f6" fillOpacity="0.2" />
            <text x="80" y="94" fill="#3b82f6" textAnchor="middle" className="text-[7px] font-bold font-mono">Nước (1.5 kg, 20°C)</text>
            
            <rect x="68" y="68" width="24" height="18" fill="#f59e0b" stroke="#ea580c" strokeWidth="1.5" rx="1" />
            <text x="80" y="79" fill="#7c2d12" textAnchor="middle" className="text-[6px] font-black font-mono">Ấm (0.5 kg)</text>
            
            <rect x="130" y="35" width="62" height="60" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" rx="4" />
            <text x="161" y="48" fill="#ea580c" textAnchor="middle" className="text-[6.5px] font-black font-mono">Q_thu = Q_tỏa</text>
            <text x="161" y="58" fill="#475569" textAnchor="middle" className="text-[5.5px] font-mono">(&Delta;t = 80 K)</text>
            <text x="161" y="70" fill="#1e293b" textAnchor="middle" className="text-[5.5px] font-mono">Nước: 504 kJ</text>
            <text x="161" y="78" fill="#1e293b" textAnchor="middle" className="text-[5.5px] font-mono">Ấm: 35.2 kJ</text>
            <text x="161" y="88" fill="#6366f1" textAnchor="middle" className="text-[6.5px] font-black font-mono">Tổng: 0.54 MJ</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Tổng nhiệt lượng cung cấp gồm nhiệt lượng làm nóng cả ấm nhôm và lượng nước lỏng bên trong</span>
        </div>
      );
    case "melting_ice_block":
      return (
        <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl mt-2 max-w-sm mx-auto shadow-sm">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Mô hình khối đá nóng chảy</span>
          <svg className="w-56 h-36" viewBox="0 0 200 130">
            <path d="M 35 100 L 40 110 L 120 110 L 125 100" fill="none" stroke="#475569" strokeWidth="2" />
            
            <path d="M 39 105 L 121 105 L 118 109 L 42 109 Z" fill="#3b82f6" fillOpacity="0.25" />
            
            <rect x="52" y="55" width="55" height="45" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" rx="3" />
            <path d="M 52 55 L 75 40 L 120 40 L 107 55 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
            <path d="M 120 40 L 120 85 L 107 100 M 107 55 L 107 100" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
            
            <circle cx="80" cy="103" r="1.5" fill="#3b82f6" />
            <circle cx="95" cy="104" r="1.5" fill="#3b82f6" />
            
            <rect x="132" y="35" width="62" height="55" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" rx="4" />
            <text x="163" y="48" fill="#ef4444" textAnchor="middle" className="text-[6.5px] font-black font-mono">Q = m . &lambda;</text>
            <text x="163" y="58" fill="#475569" textAnchor="middle" className="text-[5px] font-mono">Q = 668 kJ</text>
            <text x="163" y="68" fill="#475569" textAnchor="middle" className="text-[4.5px] font-mono">&lambda; = 3.34e5 J/kg</text>
            <line x1="138" y1="73" x2="188" y2="73" stroke="#cbd5e1" strokeWidth="0.5" />
            <text x="163" y="83" fill="#6366f1" textAnchor="middle" className="text-[7px] font-black font-mono">m = 2 kg</text>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Khối đá hấp thụ nhiệt năng để phá vỡ cấu trúc tinh thể rắn chuyển thành lỏng</span>
        </div>
      );
    case "bicycle_tyre_sun":
      return (
        <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl mt-2 max-w-sm mx-auto shadow-sm">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Bơm sấy săm lốp xe dưới mặt trời</span>
          <svg className="w-56 h-36" viewBox="0 0 200 130">
            <circle cx="35" cy="30" r="12" fill="#f97316" fillOpacity="0.15" stroke="#f97316" strokeWidth="1.5" />
            <circle cx="35" cy="30" r="7" fill="#f97316" />
            <line x1="35" y1="12" x2="35" y2="16" stroke="#f97316" strokeWidth="1.5" />
            <line x1="35" y1="44" x2="35" y2="48" stroke="#f97316" strokeWidth="1.5" />
            <line x1="17" y1="30" x2="21" y2="30" stroke="#f97316" strokeWidth="1.5" />
            <line x1="49" y1="30" x2="53" y2="30" stroke="#f97316" strokeWidth="1.5" />
            
            <circle cx="100" cy="65" r="35" fill="none" stroke="#1e293b" strokeWidth="8" />
            <circle cx="100" cy="65" r="31" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="100" cy="65" r="23" fill="none" stroke="#64748b" strokeWidth="2" />
            <line x1="100" y1="65" x2="100" y2="35" stroke="#cbd5e1" strokeWidth="0.8" />
            <line x1="100" y1="65" x2="100" y2="95" stroke="#cbd5e1" strokeWidth="0.8" />
            <line x1="100" y1="65" x2="70" y2="65" stroke="#cbd5e1" strokeWidth="0.8" />
            <line x1="100" y1="65" x2="130" y2="65" stroke="#cbd5e1" strokeWidth="0.8" />
            
            <g transform="translate(142, 30)">
              <rect x="-2" y="-2" width="48" height="42" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" rx="3" />
              <text x="22" y="8" fill="#475569" textAnchor="middle" className="text-[5.5px] font-bold font-mono">ĐỒNG HỒ</text>
              <text x="22" y="18" fill="#1e293b" textAnchor="middle" className="text-[6.5px] font-black font-mono">P1 = 1.0 atm</text>
              <text x="22" y="28" fill="#ea580c" textAnchor="middle" className="text-[6.5px] font-black font-mono">P2 = 0.4 atm</text>
              <text x="22" y="37" fill="#64748b" textAnchor="middle" className="text-[5px] font-mono">Độ cao: V tăng</text>
            </g>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Mối liên hệ giữa áp suất, nhiệt độ và thể tích được giải thích bằng phương trình khí lí tưởng</span>
        </div>
      );
    case "pressure_cooker_heating":
      return (
        <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl mt-2 max-w-sm mx-auto shadow-sm">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">Nguyên lý I Nhiệt động lực học</span>
          <svg className="w-56 h-36" viewBox="0 0 200 130">
            <rect x="40" y="20" width="70" height="85" fill="none" stroke="#475569" strokeWidth="2" />
            <rect x="41" y="45" width="68" height="8" fill="#64748b" stroke="#334155" strokeWidth="1" rx="1" />
            <line x1="75" y1="10" x2="75" y2="45" stroke="#64748b" strokeWidth="3" />
            
            <path d="M 75 120 L 75 108" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRedTiny_L1_3)" />
            <text x="82" y="116" fill="#ef4444" className="text-[7.5px] font-black font-mono">Nhận Q = +450 J</text>
            
            <path d="M 75 42 L 75 22" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreenTiny_L1_3)" />
            <text x="82" y="32" fill="#10b981" className="text-[7.5px] font-black font-mono">Sinh công A = -150 J</text>
            
            <rect x="125" y="40" width="68" height="50" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" rx="4" />
            <text x="159" y="52" fill="#1e293b" textAnchor="middle" className="text-[7px] font-black font-mono">&Delta;U = A + Q</text>
            <text x="159" y="63" fill="#ef4444" textAnchor="middle" className="text-[6px] font-mono">Q = +450 J</text>
            <text x="159" y="72" fill="#10b981" textAnchor="middle" className="text-[6px] font-mono">A = -150 J</text>
            <line x1="131" y1="77" x2="187" y2="77" stroke="#cbd5e1" strokeWidth="0.5" />
            <text x="159" y="86" fill="#6366f1" textAnchor="middle" className="text-[7.5px] font-black font-mono">&Delta;U = +300 J</text>
            <defs>
              <marker id="arrowRedTiny_L1_3" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#ef4444" />
              </marker>
              <marker id="arrowGreenTiny_L1_3" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#10b981" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Đoạn biến thiên nội năng bằng tổng công và nhiệt lượng mà hệ nhận được từ bên ngoài</span>
        </div>
      );
    case "magnetic_force_left_hand":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">SƠ ĐỒ LỰC TỪ & QUY TẮC BÀN TAY TRÁI</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            <rect width="100%" height="100%" fill="none" />
            {/* Magnetic poles */}
            <rect x="15" y="15" width="30" height="15" fill="#ef4444" rx="1.5" />
            <text x="30" y="25" fill="#fff" textAnchor="middle" className="text-[7.5px] font-black">Cực N</text>
            <rect x="115" y="15" width="30" height="15" fill="#3b82f6" rx="1.5" />
            <text x="130" y="25" fill="#fff" textAnchor="middle" className="text-[7.5px] font-black">Cực S</text>
            
            {/* Magnetic Field Lines (B) */}
            <line x1="45" y1="22.5" x2="115" y2="22.5" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#arrowCyanTiny_L15)" />
            <text x="80" y="14" fill="#38bdf8" textAnchor="middle" className="text-[7.5px] font-black font-mono">Cảm ứng từ B</text>

            {/* Wire carrying current (I) */}
            <line x1="80" y1="85" x2="80" y2="22.5" stroke="#fbbf24" strokeWidth="2.5" />
            <circle cx="80" cy="51.25" r="5" fill="#f59e0b" />
            <line x1="80" y1="65" x2="80" y2="40" stroke="#000" strokeWidth="1.5" markerEnd="url(#arrowBlackTiny_L15)" />
            <text x="92" y="54" fill="#fbbf24" className="text-[7.5px] font-black font-mono">Dòng điện I</text>

            {/* Resulting force (F) according to Left-Hand Rule */}
            <line x1="80" y1="51.25" x2="50" y2="51.25" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrowGreenTiny_L15)" />
            <text x="42" y="47" fill="#10b981" className="text-[7.5px] font-black font-mono">Lực từ F</text>

            {/* 3D coordinate helper corner */}
            <line x1="140" y1="90" x2="155" y2="90" stroke="#cbd5e1" strokeWidth="1" markerEnd="url(#arrowGreyTiny_L15)" />
            <text x="157" y="92" fill="#cbd5e1" className="text-[6px] font-mono">y (B)</text>
            <line x1="140" y1="90" x2="140" y2="75" stroke="#cbd5e1" strokeWidth="1" markerEnd="url(#arrowGreyTiny_L15)" />
            <text x="140" y="71" fill="#cbd5e1" className="text-[6px] font-mono">z (I)</text>
            <line x1="140" y1="90" x2="130" y2="100" stroke="#cbd5e1" strokeWidth="1" />
            <text x="124" y="105" fill="#cbd5e1" className="text-[6px] font-mono">x (F)</text>

            <defs>
              <marker id="arrowCyanTiny_L15" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#38bdf8" />
              </marker>
              <marker id="arrowGreenTiny_L15" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#10b981" />
              </marker>
              <marker id="arrowBlackTiny_L15" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#000" />
              </marker>
              <marker id="arrowGreyTiny_L15" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#cbd5e1" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Lực từ vuông góc đồng thời với dòng điện I và cảm ứng từ B theo quy tắc bàn tay trái</span>
        </div>
      );
    case "maglev_levitation":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">CƠ CHẾ NÂNG ĐỆM TỪ TÀU MAGLEV</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Guideway track walls */}
            <rect x="15" y="70" width="130" height="10" fill="#334155" rx="1.5" />
            <rect x="22" y="45" width="12" height="30" fill="#475569" />
            <rect x="126" y="45" width="12" height="30" fill="#475569" />

            {/* Train body floating */}
            <rect x="42" y="25" width="76" height="35" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.5" rx="6" />
            <rect x="48" y="31" width="64" height="12" fill="#38bdf8" rx="2" />
            <text x="80" y="40" fill="#0f172a" textAnchor="middle" className="text-[7.5px] font-black">TÀU CAO TỐC MAGLEV</text>

            {/* Superconducting magnets on train (SCM) */}
            <rect x="31" y="52" width="10" height="14" fill="#fbbf24" rx="1" stroke="#b45309" strokeWidth="0.5" />
            <text x="36" y="61" fill="#000" textAnchor="middle" className="text-[5px] font-bold">SCM</text>
            <rect x="119" y="52" width="10" height="14" fill="#fbbf24" rx="1" stroke="#b45309" strokeWidth="0.5" />
            <text x="124" y="61" fill="#000" textAnchor="middle" className="text-[5px] font-bold">SCM</text>

            {/* Track coil magnet */}
            <circle cx="16" cy="60" r="5.5" fill="#f43f5e" />
            <text x="16" y="62" fill="#fff" textAnchor="middle" className="text-[5px] font-bold">Cực N</text>
            <circle cx="144" cy="60" r="5.5" fill="#3b82f6" />
            <text x="144" y="62" fill="#fff" textAnchor="middle" className="text-[5px] font-bold">Cực S</text>

            {/* Levitation Force arrows upwards */}
            <line x1="42" y1="68" x2="42" y2="82" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreenTiny_L15_2)" />
            <line x1="118" y1="68" x2="118" y2="82" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreenTiny_L15_2)" />
            <text x="80" y="80" fill="#10b981" textAnchor="middle" className="text-[7.5px] font-black font-mono">Lực nâng nâng tàu cao 10-15 mm</text>
            
            <defs>
              <marker id="arrowGreenTiny_L15_2" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#10b981" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Lực đẩy siêu dẫn đẩy tàu nâng bổng lên hoàn toàn khỏi đường ray cơ học</span>
        </div>
      );
    case "wire_suspended":
      return (
        <div className="flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-slate-850/60 mt-2 max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-500 font-bold mb-1.5 uppercase">PHÂN TÍCH LỰC TÁC DỤNG LÊN DÂY TREO MN</span>
          <svg className="w-48 h-32" viewBox="0 0 160 110">
            {/* Ceiling hook */}
            <line x1="40" y1="15" x2="120" y2="15" stroke="#cbd5e1" strokeWidth="2.5" />
            
            {/* String suspensions at an angle */}
            <line x1="60" y1="15" x2="72" y2="65" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2.5" />
            <line x1="100" y1="15" x2="88" y2="65" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2.5" />
            
            {/* Wire cross-section */}
            <circle cx="80" cy="65" r="7.5" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
            <text x="80" y="68.5" fill="#000" textAnchor="middle" className="text-[8px] font-black font-mono">I</text>

            {/* Force Vectors */}
            {/* Gravity P downwards */}
            <line x1="80" y1="65" x2="80" y2="95" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRedTiny_L15_3)" />
            <text x="84" y="90" fill="#ef4444" className="text-[7px] font-black font-mono">Trọng lực P</text>

            {/* Magnetic Force F sideways (R) */}
            <line x1="80" y1="65" x2="115" y2="65" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreenTiny_L15_3)" />
            <text x="110" y="58" fill="#10b981" className="text-[7px] font-black font-mono">Lực từ F</text>

            {/* Tension force T along string */}
            <line x1="80" y1="65" x2="68" y2="41" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrowCyanTiny_L15_3)" />
            <text x="54" y="44" fill="#38bdf8" className="text-[7px] font-black font-mono">Lực căng T</text>

            {/* Angle theta indicator */}
            <path d="M 80 40 A 25 25 0 0 0 74 46" fill="none" stroke="#e2e8f0" strokeWidth="1" />
            <text x="73" y="36" fill="#cbd5e1" className="text-[6.5px] font-mono">&theta;</text>
            
            <defs>
              <marker id="arrowRedTiny_L15_3" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#ef4444" />
              </marker>
              <marker id="arrowGreenTiny_L15_3" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#10b981" />
              </marker>
              <marker id="arrowCyanTiny_L15_3" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L0,4 L4,2 Z" fill="#38bdf8" />
              </marker>
            </defs>
          </svg>
          <span className="text-[8px] text-slate-500 italic mt-1 text-center font-bold">Góc lệch dây treo xác định bởi sự cân bằng giữa lực từ nằm ngang và trọng lực</span>
        </div>
      );
    default:
      return null;
  }
};

function ChapterIllustration({ chapterId }: { chapterId: string }) {
  if (chapterId === "ch1") {
    return (
      <div className="w-full h-36 bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl relative overflow-hidden border border-amber-200/50 shadow-sm flex items-center justify-between p-4 group transition-transform duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(217,119,6,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(217,119,6,0.04)_1px,transparent_1px)] bg-[size:10px_10px]" />
        
        <div className="z-10 flex flex-col justify-between h-full py-1">
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 uppercase tracking-wider">
              Nhiệt động lực học
            </span>
            <h4 className="text-sm font-black text-amber-950 mt-1.5 uppercase tracking-tight">Vật lí nhiệt</h4>
          </div>
          <div className="font-mono text-[9.5px] text-amber-800/80 space-y-0.5 bg-white/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-amber-100">
            <div>Q = m.c.Δt</div>
            <div>Q = L.m</div>
          </div>
        </div>

        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <rect x="25" y="45" width="50" height="40" rx="6" className="fill-blue-400/10 stroke-amber-500/40 stroke-2" />
            <path d="M26 65 Q 38 62, 50 65 T 74 65 L 74 84 Q 50 84, 26 84 Z" className="fill-cyan-400/30" />
            
            <rect x="32" y="68" width="12" height="12" rx="2" transform="rotate(15 38 74)" className="fill-sky-100/80 stroke-sky-400/60 stroke-1" />
            <rect x="52" y="70" width="10" height="10" rx="2" transform="rotate(-10 57 75)" className="fill-sky-100/80 stroke-sky-400/60 stroke-1" />
            
            <path d="M 40 92 Q 50 82, 60 92" className="stroke-orange-500 stroke-2 fill-none" />
            <path d="M 45 92 Q 50 78, 55 92" className="fill-orange-500 animate-pulse" />
            <path d="M 48 92 Q 50 84, 52 92" className="fill-yellow-400" />
            
            <path d="M 35 35 Q 38 25, 35 15" className="stroke-orange-400/60 stroke-1 fill-none stroke-dasharray-[2,2]" />
            <path d="M 50 32 Q 53 22, 50 12" className="stroke-orange-400/60 stroke-1 fill-none stroke-dasharray-[2,2]" />
            <path d="M 65 35 Q 68 25, 65 15" className="stroke-orange-400/60 stroke-1 fill-none stroke-dasharray-[2,2]" />
            
            <circle cx="35" cy="55" r="2.5" className="fill-orange-500" />
            <circle cx="55" cy="48" r="3" className="fill-red-500" />
            <circle cx="43" cy="58" r="2" className="fill-amber-500" />
            
            <rect x="82" y="15" width="6" height="60" rx="3" className="fill-slate-200 stroke-slate-300 stroke-1" />
            <circle cx="85" cy="72" r="7" className="fill-red-500 stroke-slate-300 stroke-1" />
            <rect x="84" y="35" width="2" height="35" className="fill-red-500" />
            
            <line x1="88" y1="25" x2="91" y2="25" className="stroke-slate-400 stroke-1" />
            <line x1="88" y1="35" x2="91" y2="35" className="stroke-slate-400 stroke-1" />
            <line x1="88" y1="45" x2="91" y2="45" className="stroke-slate-400 stroke-1" />
            <line x1="88" y1="55" x2="91" y2="55" className="stroke-slate-400 stroke-1" />
          </svg>
        </div>
      </div>
    );
  } else if (chapterId === "ch2") {
    return (
      <div className="w-full h-36 bg-gradient-to-br from-cyan-50 to-sky-100 rounded-2xl relative overflow-hidden border border-cyan-200/50 shadow-sm flex items-center justify-between p-4 group transition-transform duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:10px_10px]" />
        
        <div className="z-10 flex flex-col justify-between h-full py-1">
          <div>
            <span className="text-[10px] font-mono font-bold text-cyan-600 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20 uppercase tracking-wider">
              Thuyết động học chất khí
            </span>
            <h4 className="text-sm font-black text-cyan-950 mt-1.5 uppercase tracking-tight">Khí lí tưởng</h4>
          </div>
          <div className="font-mono text-[9.5px] text-cyan-800/80 space-y-0.5 bg-white/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-cyan-100">
            <div>P.V = n.R.T</div>
            <div>p = 1/3 * μ * m * v²</div>
          </div>
        </div>

        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <path d="M 20 20 L 20 85 L 70 85 L 70 20" className="stroke-slate-500 stroke-2 fill-none" />
            
            <rect x="21" y="42" width="48" height="8" className="fill-slate-400 stroke-slate-600 stroke-1" />
            <rect x="41" y="15" width="8" height="28" className="fill-slate-400 stroke-slate-500 stroke-1" />
            
            <path d="M 45 5 L 45 15 M 41 11 L 45 15 L 49 11" className="stroke-red-500 stroke-2 fill-none" />
            
            <circle cx="32" cy="60" r="3.5" className="fill-red-500" />
            <path d="M 32 60 L 40 54" className="stroke-red-400/60 stroke-1" />
            <circle cx="45" cy="72" r="3" className="fill-cyan-500" />
            <path d="M 45 72 L 37 78" className="stroke-cyan-400/60 stroke-1" />
            
            <circle cx="58" cy="55" r="4" className="fill-emerald-500" />
            
            <circle cx="40" cy="80" r="3" className="fill-amber-500" />
            <circle cx="62" cy="76" r="3.5" className="fill-indigo-500" />
            <path d="M 62 76 L 55 68" className="stroke-indigo-400/60 stroke-1" />
            
            <path d="M 20 60 L 16 58 M 20 60 L 16 62" className="stroke-yellow-500 stroke-1" />
            <path d="M 70 55 L 74 53 M 70 55 L 74 57" className="stroke-yellow-500 stroke-1" />
            
            <circle cx="82" cy="35" r="12" className="fill-slate-100 stroke-slate-400 stroke-1" />
            <path d="M 82 35 L 89 28" className="stroke-red-500 stroke-2" />
            
            <line x1="82" y1="23" x2="82" y2="25" className="stroke-slate-500 stroke-1" />
            <line x1="70" y1="35" x2="72" y2="35" className="stroke-slate-500 stroke-1" />
            <line x1="94" y1="35" x2="92" y2="35" className="stroke-slate-500 stroke-1" />
          </svg>
        </div>
      </div>
    );
  } else if (chapterId === "ch3") {
    return (
      <div className="w-full h-36 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl relative overflow-hidden border border-indigo-200/50 shadow-sm flex items-center justify-between p-4 group transition-transform duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(79,70,229,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(79,70,229,0.04)_1px,transparent_1px)] bg-[size:10px_10px]" />
        
        <div className="z-10 flex flex-col justify-between h-full py-1">
          <div>
            <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20 uppercase tracking-wider">
              Tương tác điện từ
            </span>
            <h4 className="text-sm font-black text-indigo-950 mt-1.5 uppercase tracking-tight">Từ trường</h4>
          </div>
          <div className="font-mono text-[9.5px] text-indigo-800/80 space-y-0.5 bg-white/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-indigo-100">
            <div>F = q.v.B.sin(θ)</div>
            <div>Φ = B.S.cos(α)</div>
          </div>
        </div>

        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <rect x="30" y="44" width="20" height="12" className="fill-red-500 stroke-red-600 stroke-1" />
            <text x="36" y="53" className="fill-white text-[8px] font-black">N</text>
            <rect x="50" y="44" width="20" height="12" className="fill-blue-500 stroke-blue-600 stroke-1" />
            <text x="57" y="53" className="fill-white text-[8px] font-black">S</text>
            
            <path d="M 40 44 C 40 10, 60 10, 60 44" className="stroke-indigo-400 stroke-1 fill-none stroke-dasharray-[3,3]" />
            <path d="M 40 56 C 40 90, 60 90, 60 56" className="stroke-indigo-400 stroke-1 fill-none stroke-dasharray-[3,3]" />
            
            <path d="M 35 44 C 20 5, 80 5, 65 44" className="stroke-indigo-400/70 stroke-1 fill-none stroke-dasharray-[3,3]" />
            <path d="M 35 56 C 20 95, 80 95, 65 56" className="stroke-indigo-400/70 stroke-1 fill-none stroke-dasharray-[3,3]" />
            
            <path d="M 15 25 L 45 25" className="stroke-emerald-500 stroke-2 fill-none stroke-dasharray-[2,2]" />
            <path d="M 40 21 L 45 25 L 40 29" className="stroke-emerald-500 stroke-2 fill-none" />
            <text x="25" y="20" className="fill-emerald-600 text-[8px] font-mono font-bold">B</text>
            
            <circle cx="82" cy="72" r="11" className="fill-slate-100 stroke-slate-300 stroke-1" />
            <circle cx="82" cy="72" r="1.5" className="fill-slate-900" />
            <path d="M 82 72 L 77 67" className="stroke-red-500 stroke-2" />
            <path d="M 82 72 L 87 77" className="stroke-blue-500 stroke-2" />
          </svg>
        </div>
      </div>
    );
  } else if (chapterId === "ch4") {
    return (
      <div className="w-full h-36 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl relative overflow-hidden border border-purple-200/50 shadow-sm flex items-center justify-between p-4 group transition-transform duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,51,234,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,51,234,0.04)_1px,transparent_1px)] bg-[size:10px_10px]" />
        
        <div className="z-10 flex flex-col justify-between h-full py-1">
          <div>
            <span className="text-[10px] font-mono font-bold text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20 uppercase tracking-wider">
              Vật lí hạt nhân vi mô
            </span>
            <h4 className="text-sm font-black text-purple-950 mt-1.5 uppercase tracking-tight">Vật lí hạt nhân</h4>
          </div>
          <div className="font-mono text-[9.5px] text-purple-800/80 space-y-0.5 bg-white/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-purple-100">
            <div>E = m.c²</div>
            <div>N(t) = N0 . 2^(-t/T)</div>
          </div>
        </div>

        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <ellipse cx="50" cy="50" rx="38" ry="11" className="stroke-purple-300 stroke-1 fill-none" transform="rotate(30 50 50)" />
            <ellipse cx="50" cy="50" rx="38" ry="11" className="stroke-purple-300 stroke-1 fill-none" transform="rotate(120 50 50)" />
            
            <circle cx="22" cy="34" r="2.5" className="fill-purple-500 animate-pulse" />
            <circle cx="78" cy="66" r="2.5" className="fill-purple-500" />
            <circle cx="58" cy="18" r="2" className="fill-pink-400" />
            
            <circle cx="46" cy="46" r="4.5" className="fill-blue-500 stroke-blue-600 stroke-1" />
            <circle cx="54" cy="54" r="4.5" className="fill-blue-500 stroke-blue-600 stroke-1" />
            <circle cx="45" cy="53" r="4.5" className="fill-blue-400 stroke-blue-500 stroke-1" />
            <circle cx="55" cy="45" r="4" className="fill-blue-400 stroke-blue-500 stroke-1" />
            
            <circle cx="50" cy="42" r="4.5" className="fill-pink-500 stroke-pink-600 stroke-1" />
            <circle cx="50" cy="58" r="4.5" className="fill-pink-500 stroke-pink-600 stroke-1" />
            <circle cx="42" cy="49" r="4.5" className="fill-pink-400 stroke-pink-500 stroke-1" />
            <circle cx="58" cy="50" r="4.5" className="fill-pink-400 stroke-pink-500 stroke-1" />
            <circle cx="50" cy="50" r="5" className="fill-pink-600 stroke-pink-700 stroke-1" />
            
            <line x1="15" y1="50" x2="5" y2="50" className="stroke-amber-400 stroke-2" />
            <polygon points="5,50 12,47 12,53" className="fill-amber-400" />
          </svg>
        </div>
      </div>
    );
  }
  return null;
}

interface SlideData {
  title: string;
  subtitle: string;
  bullets: string[];
  highlight?: string;
  formula?: string;
}

function getSlideDetails(lessonId: string, slideIndex: number, readingContent: string, slideTitle: string): SlideData {
  if (lessonId === "l1") {
    const data = [
      {
        title: "I. Mô hình động học phân tử về cấu tạo chất",
        subtitle: "Các giả thuyết nền tảng về cấu trúc vi mô",
        bullets: [
          "Các chất được cấu tạo từ các hạt riêng biệt gọi là phân tử (nguyên tử, ion).",
          "Các phân tử chuyển động hỗn loạn không ngừng. Nhiệt độ của vật càng cao thì tốc độ trung bình của chúng càng lớn.",
          "Giữa các phân tử đồng thời có lực hút và lực đẩy gọi chung là lực liên kết phân tử.",
          "Bằng chứng tiêu biểu: Thí nghiệm Brown (1827) quan sát chuyển động hỗn loạn của hạt phấn hoa trong nước dưới kính hiển vi."
        ],
        highlight: "Nhiệt độ tỉ lệ thuận trực tiếp với động năng trung bình chuyển động nhiệt của các phân tử."
      },
      {
        title: "II. Cấu trúc của chất: Rắn - Lỏng - Khí",
        subtitle: "Đặc điểm lực liên kết và hình dạng vi mô",
        bullets: [
          "⏹️ Thể rắn: Lực liên kết rất mạnh. Các phân tử chỉ dao động quanh vị trí cân bằng cố định xác định. Có thể tích và hình dạng xác định.",
          "💧 Thể lỏng: Lực liên kết yếu hơn thể rắn nhưng mạnh hơn thể khí. Các phân tử dao động quanh vị trí cân bằng có thể di chuyển được. Có thể tích xác định nhưng hình dạng phụ thuộc vào bình chứa.",
          "💨 Thể khí: Lực liên kết rất yếu. Các phân tử chuyển động hỗn loạn không ngừng. Không có thể tích và hình dạng xác định."
        ],
        highlight: "Độ mạnh yếu của lực liên kết phân tử quy định tính chất vĩ mô của thể chất."
      },
      {
        title: "III. Sự chuyển thể của các chất",
        subtitle: "Quá trình biến đổi trạng thái trong tự nhiên",
        bullets: [
          "Nóng chảy & Đông đặc: Sự chuyển thể giữa Rắn và Lỏng (Ví dụ: Nước đá chảy thành nước lỏng ở 0°C).",
          "Hóa hơi (Bay hơi & Sôi) & Ngưng tụ: Sự chuyển thể giữa Lỏng và Khí (Sôi xảy ra cả ở bề mặt lẫn trong lòng chất lỏng).",
          "Thăng hoa & Ngưng kết: Chuyển thẳng từ Rắn sang Khí và ngược lại không qua trạng thái trung gian (Lỏng)."
        ],
        highlight: "Trong suốt quá trình chuyển thể (ví dụ đá đang tan), nhiệt độ của hệ được giữ hoàn toàn không đổi."
      },
      {
        title: "IV. Ứng dụng thực tiễn của chuyển thể",
        subtitle: "Giải quyết bài toán kỹ thuật đời sống",
        bullets: [
          "Kỹ thuật lạnh: Tận dụng sự hóa hơi thu nhiệt mạnh của chất làm lạnh (môi chất gas) trong tủ lạnh, điều hòa không khí.",
          "Luyện kim & Chế tác: Nóng chảy kim loại ở nhiệt độ cao rồi đổ khuôn đông đặc để tạo hình chi tiết máy, trang sức mỹ nghệ.",
          "Bảo quản thực phẩm: Sử dụng hiện tượng thăng hoa của đá khô (CO2 rắn) để làm lạnh sâu mà không để lại nước ẩm mốc.",
          "Chu trình nước toàn cầu: Bay hơi nước biển và ngưng tụ tạo mưa giúp duy trì nguồn nước ngọt trên địa cầu."
        ]
      }
    ];
    return data[slideIndex] || { title: slideTitle, subtitle: "Tóm tắt lý thuyết bài học bám sát nội dung", bullets: [readingContent] };
  }

  if (lessonId === "l2") {
    const data = [
      {
        title: "I. Khái niệm Nội năng (U)",
        subtitle: "Tổng năng lượng bên trong của hệ",
        bullets: [
          "Nội năng (U) của một vật là tổng động năng chuyển động nhiệt của các phân tử và thế năng tương tác giữa chúng.",
          "Nội năng phụ thuộc vào Nhiệt độ (T) và Thể tích (V): U = f(T, V).",
          "Khí lí tưởng: Do bỏ qua lực tương tác phân tử nên thế năng tương tác bằng 0. Nội năng khí lí tưởng chỉ phụ thuộc vào nhiệt độ: U = f(T)."
        ],
        formula: "U = E_đ + E_t"
      },
      {
        title: "II. Hai cách làm biến đổi nội năng",
        subtitle: "Thực hiện công và Truyền nhiệt",
        bullets: [
          "🛠️ Thực hiện công (A): Có sự chuyển hóa từ một dạng năng lượng khác (như cơ năng, điện năng) sang nội năng. Ví dụ: Cọ xát pittông làm nóng khí.",
          "🔥 Truyền nhiệt (Q): Không có sự chuyển hóa cơ năng thành nhiệt năng, chỉ có sự truyền trực tiếp nhiệt năng từ vật này sang vật khác chênh lệch nhiệt độ."
        ]
      },
      {
        title: "III. Định luật I Nhiệt động lực học",
        subtitle: "Nguyên lí bảo toàn năng lượng cho các hệ nhiệt",
        bullets: [
          "Phát biểu: Độ biến thiên nội năng ΔU của hệ bằng tổng công A và nhiệt lượng Q mà hệ nhận được.",
          "Công thức: ΔU = A + Q",
          "Định luật khẳng định nội năng của hệ tăng lên khi hệ nhận công hoặc nhận nhiệt lượng từ môi trường ngoài."
        ],
        formula: "ΔU = A + Q"
      },
      {
        title: "IV. Quy ước dấu của A và Q",
        subtitle: "Nguyên tắc dấu cực kỳ quan trọng khi làm bài tập",
        bullets: [
          "📥 Hệ nhận vào (Mang dấu dương +): Q > 0 (Hệ nhận nhiệt lượng); A > 0 (Hệ nhận công từ ngoại lực).",
          "📤 Hệ sinh ra / Tỏa ra (Mang dấu âm -): Q < 0 (Hệ truyền/tỏa nhiệt lượng); A < 0 (Hệ thực hiện công lên bên ngoài).",
          "Ví dụ áp dụng: Khí nhận 200J nhiệt lượng (Q = +200J) và sinh công 120J (A = -120J) => ΔU = 200 - 120 = 80 J."
        ]
      }
    ];
    return data[slideIndex] || { title: slideTitle, subtitle: "Tóm tắt lý thuyết bài học bám sát nội dung", bullets: [readingContent] };
  }

  if (lessonId === "l3") {
    const data = [
      {
        title: "I. Trạng thái cân bằng nhiệt",
        subtitle: "Sự đồng đều về nhiệt độ khi tiếp xúc",
        bullets: [
          "Khi hai vật có nhiệt độ khác nhau tiếp xúc nhau, nhiệt lượng tự truyền từ vật nóng hơn sang vật lạnh hơn.",
          "Quá trình truyền nhiệt dừng lại khi hai vật đạt trạng thái cân bằng nhiệt (nhiệt độ hai vật bằng nhau).",
          "Định luật không nhiệt động lực học: Nếu vật A cân bằng nhiệt với B, và B cân bằng nhiệt với C thì A cũng cân bằng nhiệt với C."
        ]
      },
      {
        title: "II. Thang nhiệt độ Celsius và Kelvin",
        subtitle: "Hệ thống đo lường nhiệt độ phổ biến",
        bullets: [
          "Thang Celsius (°C): Lấy điểm đông đặc của nước tinh khiết là 0°C và điểm sôi là 100°C làm mốc chuẩn dưới áp suất tiêu chuẩn.",
          "Thang Kelvin (K): Thang đo tuyệt đối. Nhiệt độ không độ tuyệt đối (0 K) là nhiệt độ lý thuyết thấp nhất mà tại đó mọi chuyển động nhiệt ngừng lại.",
          "Độ lớn một độ Celsius (°C) bằng đúng độ lớn một độ Kelvin (K): ΔT(K) = Δt(°C)."
        ]
      },
      {
        title: "III. Công thức chuyển đổi nhiệt độ",
        subtitle: "Liên kết thang Celsius và thang Kelvin",
        bullets: [
          "Công thức chuyển đổi: T (K) = t (°C) + 273,15",
          "Ví dụ: Nhiệt độ phòng 25°C đổi sang Kelvin: T = 25 + 273,15 = 298,15 K.",
          "Nhiệt độ không độ tuyệt đối 0 K đổi sang Celsius: t = 0 - 273,15 = -273,15 °C."
        ],
        formula: "T (K) = t (°C) + 273.15"
      },
      {
        title: "IV. Nguyên lí hoạt động của Nhiệt kế",
        subtitle: "Các thiết bị đo đạc nhiệt độ trong thực tế",
        bullets: [
          "Nhiệt kế hoạt động dựa trên sự thay đổi tính chất vật lí của chất đo theo nhiệt độ.",
          "Nhiệt kế chất lỏng (thủy ngân, rượu): Dựa vào hiện tượng nở vì nhiệt của chất lỏng chứa trong ống mao dẫn.",
          "Nhiệt kế điện trở / cặp nhiệt điện: Dựa trên sự biến đổi điện trở của dây kim loại hoặc hiệu điện thế tiếp xúc.",
          "Nhiệt kế hồng ngoại: Đo năng lượng bức xạ hồng ngoại do vật phát ra mà không cần tiếp xúc vật lý."
        ]
      }
    ];
    return data[slideIndex] || { title: slideTitle, subtitle: "Tóm tắt lý thuyết bài học bám sát nội dung", bullets: [readingContent] };
  }

  if (lessonId === "l4") {
    const data = [
      {
        title: "I. Khái niệm Nhiệt dung riêng (c)",
        subtitle: "Khả năng lưu trữ nhiệt lượng của vật chất",
        bullets: [
          "Nhiệt dung riêng (c) là nhiệt lượng cần thiết cung cấp cho 1 kg chất đó để làm nhiệt độ của nó tăng thêm 1 Kelvin (hoặc 1 độ C).",
          "Đơn vị đo: J/kg.K hoặc J/kg.°C.",
          "Ví dụ: Nhiệt dung riêng của nước là c = 4200 J/kg.K, nghĩa là để làm 1 kg nước nóng lên thêm 1°C cần cấp một nhiệt lượng 4200 J."
        ]
      },
      {
        title: "II. Công thức tính nhiệt lượng Q = mcΔt",
        subtitle: "Nhiệt lượng thay đổi nhiệt độ chất",
        bullets: [
          "Công thức: Q = m.c.Δt = m.c.(t2 - t1)",
          "Trong đó: Q là nhiệt lượng thu vào/tỏa ra (J), m là khối lượng vật (kg), c là nhiệt dung riêng (J/kg.K), Δt là độ biến thiên nhiệt độ (°C hoặc K)."
        ],
        formula: "Q = m.c.Δt"
      },
      {
        title: "III. Đo thực nghiệm Nhiệt dung riêng",
        subtitle: "Phương pháp dùng bình Nhiệt lượng kế cách nhiệt",
        bullets: [
          "Dùng bình nhiệt lượng kế cách nhiệt để tránh mất mát nhiệt năng ra môi trường bên ngoài.",
          "Cấp nhiệt cho vật bằng dây điện trở nối nguồn điện (nhiệt lượng tỏa ra Q = P.t = U.I.t).",
          "Xác định độ tăng nhiệt độ Δt và khối lượng m, từ đó tính ra giá trị c thực nghiệm."
        ]
      },
      {
        title: "IV. Ứng dụng nhiệt dung riêng của nước",
        subtitle: "Vai trò điều hòa khí hậu và làm mát tự nhiên",
        bullets: [
          "Nước có nhiệt dung riêng rất lớn (~4200 J/kg.K) gấp nhiều lần so với đất đá và kim loại.",
          "Đất ven biển nóng nhanh và nguội nhanh hơn nước biển, tạo nên hiện tượng gió đất và gió biển ôn hòa.",
          "Ứng dụng làm chất tải nhiệt làm mát động cơ ô tô, lò phản ứng hạt nhân, sưởi ấm gia đình vào mùa đông."
        ]
      }
    ];
    return data[slideIndex] || { title: slideTitle, subtitle: "Tóm tắt lý thuyết bài học bám sát nội dung", bullets: [readingContent] };
  }

  if (lessonId === "l5") {
    const data = [
      {
        title: "I. Khái niệm sự nóng chảy",
        subtitle: "Chuyển thể từ rắn sang lỏng của chất rắn kết tinh",
        bullets: [
          "Sự nóng chảy là quá trình chuyển đổi trạng thái từ thể rắn sang thể lỏng.",
          "Mỗi chất rắn kết tinh có nhiệt độ nóng chảy hoàn toàn xác định dưới áp suất xác định.",
          "Trong suốt quá trình nóng chảy, nhiệt lượng cung cấp chỉ dùng để bẻ gãy các liên kết tinh thể rắn vĩ mô, do đó nhiệt độ của hệ giữ không đổi."
        ]
      },
      {
        title: "II. Định nghĩa Nhiệt nóng chảy riêng λ",
        subtitle: "Đại lượng đặc trưng cho quá trình chuyển thể lỏng",
        bullets: [
          "Nhiệt nóng chảy riêng (λ) của một chất rắn là nhiệt lượng cần cung cấp để 1 kg chất đó chuyển hoàn toàn sang lỏng ở nhiệt độ nóng chảy.",
          "Đơn vị đo: J/kg.",
          "Ý nghĩa: Chất có λ càng lớn thì liên kết tinh thể càng bền vững, cần nhiều năng lượng nhiệt hơn để nóng chảy."
        ]
      },
      {
        title: "III. Công thức tính nhiệt lượng nóng chảy hoàn toàn",
        subtitle: "Nhiệt lượng hấp thụ trong suốt quá trình tan chảy",
        bullets: [
          "Công thức: Q = λ.m",
          "Trong đó: Q là nhiệt lượng nhận vào để nóng chảy (J), λ là nhiệt nóng chảy riêng (J/kg), m là khối lượng chất rắn nóng chảy (kg)."
        ],
        formula: "Q = λ.m"
      },
      {
        title: "IV. Thực hành thí nghiệm đo λ nước đá",
        subtitle: "Sử dụng phương trình cân bằng nhiệt lượng",
        bullets: [
          "Đặt khối lượng đá m ở 0°C vào bình nhiệt lượng kế chứa lượng nước ấm xác định.",
          "Đá hấp thụ nhiệt ấm để tan chảy hoàn toàn thành nước. Đo nhiệt độ cuối cùng khi đạt cân bằng.",
          "Lập phương trình: Q_tan + Q_nóng_lên = Q_nước_ấm_tỏa ra để giải và tính toán nhiệt nóng chảy riêng λ của nước đá."
        ]
      }
    ];
    return data[slideIndex] || { title: slideTitle, subtitle: "Tóm tắt lý thuyết bài học bám sát nội dung", bullets: [readingContent] };
  }

  if (lessonId === "l6") {
    const data = [
      {
        title: "I. Khái niệm sự hóa hơi & sự sôi",
        subtitle: "Sự chuyển thể từ thể lỏng sang thể hơi",
        bullets: [
          "Sự hóa hơi là quá trình chuyển từ thể lỏng sang thể hơi (thể khí), gồm 2 dạng: bay hơi và sôi.",
          "Sự bay hơi chỉ xảy ra trên bề mặt thoáng của chất lỏng và xảy ra ở mọi nhiệt độ.",
          "Sự sôi xảy ra cả trong lòng và trên bề mặt chất lỏng ở nhiệt độ sôi xác định dưới áp suất ngoài cho trước."
        ]
      },
      {
        title: "II. Nhiệt hóa hơi riêng L",
        subtitle: "Đặc trưng cho độ bền liên kết phân tử của chất lỏng",
        bullets: [
          "Nhiệt hóa hơi riêng L của một chất lỏng là nhiệt lượng cần cung cấp cho 1 kg chất lỏng đó hóa hơi hoàn toàn ở nhiệt độ sôi.",
          "Đơn vị đo tiêu chuẩn: J/kg.",
          "Nước tinh khiết có L rất lớn (2,26 . 10⁶ J/kg) do lực liên kết giữa các phân tử nước (liên kết hydrogen) rất mạnh."
        ]
      },
      {
        title: "III. Công thức nhiệt lượng hóa hơi",
        subtitle: "Hệ thức tính nhiệt lượng chuyển thể từ lỏng sang hơi",
        bullets: [
          "Công thức: Q = L.m",
          "Trong đó: Q là nhiệt lượng hấp thụ trong quá trình sôi (J), L là nhiệt hóa hơi riêng (J/kg), m là khối lượng chất lỏng đã hóa hơi hoàn toàn (kg)."
        ],
        formula: "Q = L.m"
      },
      {
        title: "IV. Thực hành thí nghiệm đo L của nước",
        subtitle: "Phương pháp đo bằng cân điện tử và công suất điện",
        bullets: [
          "Đun sôi nước trong cốc bằng nguồn điện có công suất xác định P = U.I.",
          "Khi nước sôi ổn định, đo thời gian t và ghi nhận độ giảm khối lượng của cốc nước Δm nhờ cân điện tử.",
          "Sử dụng hệ thức bảo toàn năng lượng: Q_tỏa = Q_thu <=> U.I.t = L.Δm để tính toán nhiệt hóa hơi riêng L."
        ]
      }
    ];
    return data[slideIndex] || { title: slideTitle, subtitle: "Tóm tắt lý thuyết bài học bám sát nội dung", bullets: [readingContent] };
  }

  // Fallback smart parser for lessons l6 -> l25 to make slides fully match reading content
  const paragraphs = readingContent
    .split("\n")
    .map(p => p.trim())
    .filter(p => p.length > 5 && !p.startsWith("-") && !p.startsWith("*"));

  let bullets: string[] = [];
  const linesWithDashes = readingContent
    .split("\n")
    .map(p => p.trim())
    .filter(p => p.startsWith("-") || p.startsWith("*") || p.match(/^\d+\./));

  if (slideIndex === 0 && paragraphs.length > 0) {
    bullets = [
      paragraphs[0],
      paragraphs[1] || "Xem chi tiết tài liệu học tập để có thêm thông tin đầy đủ."
    ];
  } else if (slideIndex === 1 && linesWithDashes.length > 0) {
    bullets = linesWithDashes.slice(0, 4).map(b => b.replace(/^[-*\d.]\s*/, ""));
  } else {
    const segmentSize = Math.max(1, Math.floor(paragraphs.length / 4));
    const start = slideIndex * segmentSize;
    bullets = paragraphs.slice(start, start + segmentSize);
  }

  if (bullets.length === 0) {
    bullets = ["Vui lòng đọc mục 'Tài liệu lý thuyết' của bài học này để xem đầy đủ nội dung bài học.", "Hệ thống hỗ trợ tóm tắt lý thuyết slide bài giảng bám sát phân phối chương trình GDPT mới 2018."];
  }

  // Detect formulas
  let detectedFormula: string | undefined;
  const formulaMatch = readingContent.match(/([A-Z_Δ\s]+=[a-zA-Z0-9_\s.+*-/()λ]+)/g);
  if (formulaMatch && formulaMatch.length > 0) {
    detectedFormula = formulaMatch[slideIndex % formulaMatch.length];
  }

  return {
    title: slideTitle,
    subtitle: "Tóm lược kiến thức trọng tâm",
    bullets: bullets,
    formula: detectedFormula
  };
}

export function Curriculum({
  onEarnXP,
  userRole = "student",
  initialLessonId,
  onResetInitialLesson,
  loggedInUser,
  isFocusMode = false,
  setIsFocusMode = () => {},
  studentResults,
  onUpdateResults
}: {
  onEarnXP: (xp: number, quizScore?: number, forceProgress?: number) => void;
  userRole?: "student" | "teacher";
  initialLessonId?: string | null;
  onResetInitialLesson?: () => void;
  loggedInUser?: { name: string; className: string; role: "student" | "teacher" } | null;
  isFocusMode?: boolean;
  setIsFocusMode?: (val: boolean) => void;
  studentResults?: StudentResult[];
  onUpdateResults?: (results: StudentResult[]) => void;
}) {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeLessonTab, setActiveLessonTab] = useState<"video" | "slide" | "pdf" | "flashcard" | "quiz" | "ai" | "simulation">("pdf");

  // --- PHYSICS TOPIC FILTER STATES & DATA ---
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>("all");
  const [reviewQuizAnswers, setReviewQuizAnswers] = useState<Record<string, number>>({});
  const [reviewQuizSubmitted, setReviewQuizSubmitted] = useState<boolean>(false);

  const PHYSICS_TOPICS = [
    { id: "all", name: "Tất cả chủ đề", icon: BookOpen, color: "from-blue-500 to-indigo-600 bg-blue-50 text-blue-700 border-blue-200" },
    { id: "thermal", name: "Vật lí nhiệt", icon: Compass, color: "from-pink-500 to-rose-600 bg-pink-50 text-pink-700 border-pink-200" },
    { id: "gas", name: "Khí lí tưởng", icon: Layers, color: "from-sky-500 to-indigo-600 bg-sky-50 text-sky-700 border-sky-200" },
    { id: "magnet", name: "Từ trường & Cảm ứng", icon: Compass, color: "from-purple-500 to-indigo-600 bg-purple-50 text-purple-700 border-purple-200" },
    { id: "ac", name: "Điện xoay chiều", icon: Zap, color: "from-amber-500 to-orange-600 bg-amber-50 text-amber-700 border-amber-200" },
    { id: "em_wave", name: "Sóng điện từ", icon: Radio, color: "from-teal-500 to-emerald-600 bg-teal-50 text-teal-700 border-teal-200" },
    { id: "nuclear", name: "Vật lí hạt nhân", icon: Atom, color: "from-violet-500 to-purple-600 bg-violet-50 text-violet-700 border-violet-200" },
    { id: "oscillation", name: "Dao động cơ", icon: Activity, color: "from-red-500 to-pink-600 bg-red-50 text-red-700 border-red-200" },
    { id: "wave", name: "Sóng cơ", icon: Waves, color: "from-blue-600 to-cyan-500 bg-blue-50/50 text-blue-700 border-blue-200" }
  ];

  const getLessonTopic = (lessonId: string): string => {
    if (["l1", "l2", "l3", "l4", "l5", "l6", "l7"].includes(lessonId)) return "thermal";
    if (["l8", "l9", "l10", "l11", "l12", "l13"].includes(lessonId)) return "gas";
    if (["l14", "l15", "l16", "l18", "l20"].includes(lessonId)) return "magnet";
    if (lessonId === "l17") return "ac";
    if (lessonId === "l19") return "em_wave";
    if (["l21", "l22", "l23", "l24", "l25"].includes(lessonId)) return "nuclear";
    return "other";
  };

  const REVIEW_TOPICS_DATA: Record<string, {
    title: string;
    overview: string;
    formulas: { label: string; formula: string; desc: string }[];
    concepts: { title: string; desc: string }[];
    quiz: {
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }[];
  }> = {
    oscillation: {
      title: "Chủ đề: Dao động cơ học (Kiến thức ôn tập trọng tâm lớp 11)",
      overview: "Dao động cơ là chuyển động qua lại quanh một vị trí cân bằng xác định. Đây là chủ đề nền tảng, chiếm tỉ trọng 10-15% tổng số câu hỏi trong đề thi tốt nghiệp THPT Quốc gia môn Vật lí.",
      formulas: [
        { label: "Phương trình dao động điều hòa", formula: "x = A\\cos(\\omega t + \\varphi)", desc: "x: li độ (cm), A: biên độ (cm), \\omega: tần số góc (rad/s), \\varphi: pha ban đầu (rad)" },
        { label: "Phương trình vận tốc", formula: "v = x' = -\\omega A\\sin(\\omega t + \\varphi)", desc: "Vận tốc sớm pha \\pi/2 so với li độ, cực đại ở vị trí cân bằng: v_{\\text{max}} = \\omega A" },
        { label: "Phương trình gia tốc", formula: "a = v' = -\\omega^2 x", desc: "Gia tốc ngược pha so với li độ, cực đại ở biên: a_{\\text{max}} = \\omega^2 A" },
        { label: "Tần số góc con lắc lò xo", formula: "\\omega = \\sqrt{\\frac{k}{m}}", desc: "k: độ cứng lò xo (N/m), m: khối lượng vật (kg)" },
        { label: "Tần số góc con lắc đơn", formula: "\\omega = \\sqrt{\\frac{g}{l}}", desc: "g: gia tốc trọng trường (m/s^2), l: chiều dài dây treo (m)" },
        { label: "Cơ năng dao động điều hòa", formula: "W = W_đ + W_t = \\frac{1}{2}m\\omega^2 A^2", desc: "Cơ năng được bảo toàn khi bỏ qua mọi lực cản và ma sát." }
      ],
      concepts: [
        { title: "Dao động tắt dần", desc: "Dao động có biên độ và năng lượng giảm dần theo thời gian do tác dụng của lực cản môi trường." },
        { title: "Dao động cưỡng bức", desc: "Dao động dưới tác dụng của ngoại lực tuần hoàn F = F_0\\cos(\\Omega t). Tần số của dao động cưỡng bức bằng tần số của ngoại lực cưỡng bức." },
        { title: "Hiện tượng cộng hưởng", desc: "Hiện tượng biên độ dao động cưỡng bức đạt giá trị cực đại khi tần số của ngoại lực cưỡng bức bằng tần số dao động riêng của hệ: f_{\\text{ngoại}} = f_0." }
      ],
      quiz: [
        {
          question: "Một chất điểm dao động điều hòa với phương trình x = 6cos(4πt + π/3) (cm). Biên độ dao động của chất điểm là:",
          options: ["A. 4 cm", "B. 6 cm", "C. 3 cm", "D. 12 cm"],
          correctIndex: 1,
          explanation: "Từ phương trình li độ x = A.cos(ωt + φ), ta thấy đại lượng đứng trước hàm cos chính là biên độ A = 6 cm."
        },
        {
          question: "Hiện tượng cộng hưởng cơ xảy ra khi nào?",
          options: [
            "A. Tần số của lực cưỡng bức lớn hơn nhiều so với tần số riêng.",
            "B. Tần số của lực cưỡng bức bằng tần số riêng của hệ.",
            "C. Lực cản của môi trường cực đại.",
            "D. Hệ dao động tự do không chịu lực cản."
          ],
          correctIndex: 1,
          explanation: "Hiện tượng cộng hưởng xảy ra khi tần số góc (hoặc tần số f) của ngoại lực cưỡng bức tiến sát hoặc bằng tần số riêng f0 của hệ, làm biên độ dao động cưỡng bức vọt lên cực đại."
        },
        {
          question: "Một con lắc lò xo gồm vật khối lượng m và lò xo độ cứng k. Chu kì dao động điều hòa của con lắc là:",
          options: [
            "A. T = 2π√(m/k)",
            "B. T = 2π√(k/m)",
            "C. T = (1/2π)√(k/m)",
            "D. T = (1/2π)√(m/k)"
          ],
          correctIndex: 0,
          explanation: "Tần số góc ω = √(k/m). Từ đó chu kì T = 2π/ω = 2π√(m/k)."
        }
      ]
    },
    wave: {
      title: "Chủ đề: Sóng cơ học & Sóng âm (Kiến thức ôn tập trọng tâm lớp 11)",
      overview: "Sóng cơ là sự lan truyền dao động cơ trong một môi trường vật chất theo thời gian. Đây là một chủ đề cực kỳ quan trọng xuất hiện nhiều bài tập vận dụng cao trong kì thi tốt nghiệp THPT Quốc gia.",
      formulas: [
        { label: "Công thức liên hệ bước sóng", formula: "\\lambda = v T = \\frac{v}{f}", desc: "\\lambda: bước sóng (m), v: tốc độ truyền sóng (m/s), T: chu kì (s), f: tần số (Hz)" },
        { label: "Phương trình truyền sóng", formula: "u_M = a\\cos\\left(\\omega t - \\frac{2\\pi x}{\\lambda}\\right)", desc: "u_M: li độ sóng tại M cách nguồn khoảng x, a: biên độ sóng" },
        { label: "Điều kiện cực đại giao thoa (hai nguồn cùng pha)", formula: "d_2 - d_1 = k\\lambda", desc: "Hiệu đường đi bằng một số nguyên lần bước sóng (k \\in \\mathbb{Z})" },
        { label: "Điều kiện cực tiểu giao thoa (hai nguồn cùng pha)", formula: "d_2 - d_1 = (k + 0,5)\\lambda", desc: "Hiệu đường đi bằng một số bán nguyên lần bước sóng" },
        { label: "Sóng dừng trên dây hai đầu cố định", formula: "l = k\\frac{\\lambda}{2}", desc: "Chiều dài dây bằng số nguyên lần nửa bước sóng. Số bụng sóng = k, Số nút sóng = k + 1." },
        { label: "Sóng dừng trên dây một đầu cố định, một đầu tự do", formula: "l = (2k + 1)\\frac{\\lambda}{4}", desc: "Chiều dài dây bằng số lẻ lần một phần tư bước sóng." }
      ],
      concepts: [
        { title: "Sóng dọc và Sóng ngang", desc: "Sóng ngang có phương dao động vuông góc với phương truyền sóng (truyền trong chất rắn và bề mặt chất lỏng). Sóng dọc có phương dao động trùng với phương truyền sóng (truyền trong cả rắn, lỏng, khí)." },
        { title: "Sóng âm", desc: "Là các sóng cơ truyền trong các môi trường rắn, lỏng, khí. Âm nghe được có tần số từ 16 Hz đến 20000 Hz. Hạ âm < 16 Hz, Siêu âm > 20000 Hz." },
        { title: "Độ to và Độ cao của âm", desc: "Độ cao gắn liền với tần số âm. Độ to gắn liền với mức cường độ âm L (dB) và tần số âm. Âm sắc gắn liền với đồ thị dao động âm." }
      ],
      quiz: [
        {
          question: "Một sóng cơ có tần số f = 50 Hz lan truyền trong một môi trường với tốc độ v = 20 m/s. Bước sóng của sóng này là:",
          options: ["A. 40 cm", "B. 2.5 m", "C. 0.4 cm", "D. 1000 m"],
          correctIndex: 0,
          explanation: "Áp dụng công thức: λ = v / f = 20 / 50 = 0.4 m = 40 cm."
        },
        {
          question: "Sóng dọc là sóng trong đó các phần tử môi trường dao động theo phương nào?",
          options: [
            "A. Phương vuông góc với phương truyền sóng",
            "B. Phương trùng with phương truyền sóng",
            "C. Phương thẳng đứng",
            "D. Phương nằm ngang"
          ],
          correctIndex: 1,
          explanation: "Sóng dọc là sóng có phương dao động của các phần tử môi trường trùng với phương truyền sóng."
        },
        {
          question: "Trên một sợi dây đàn hồi dài L có hai đầu cố định đang xảy ra sóng dừng với 3 bụng sóng. Biết bước sóng λ = 40 cm. Chiều dài L của sợi dây là:",
          options: ["A. 120 cm", "B. 60 cm", "C. 80 cm", "D. 40 cm"],
          correctIndex: 1,
          explanation: "Hai đầu cố định: L = k.(λ/2). Ở đây k là số bụng sóng = 3. Do đó L = 3 * (40 / 2) = 60 cm."
        }
      ]
    }
  };

  // Reset review quiz when filter changes
  useEffect(() => {
    setReviewQuizAnswers({});
    setReviewQuizSubmitted(false);
  }, [selectedTopicFilter]);

  // Slide state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Flashcard state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);

  // AI Summary state
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // --- LESSON ADVANCED QUIZ STATE ---
  const [questionsP1, setQuestionsP1] = useState<Part1Question[]>(INITIAL_P1_QUESTIONS);
  const [questionsP2, setQuestionsP2] = useState<Part2Question[]>(INITIAL_P2_QUESTIONS);
  const [questionsP3, setQuestionsP3] = useState<Part3Question[]>([]);

  const [shuffledP1, setShuffledP1] = useState<Part1Question[]>([]);
  const [shuffledP2, setShuffledP2] = useState<Part2Question[]>([]);
  const [shuffledP3, setShuffledP3] = useState<Part3Question[]>([]);
  
  const [answersP1, setAnswersP1] = useState<Record<string, string>>({}); // { questionId: optionId }
  const [answersP2, setAnswersP2] = useState<Record<string, Record<string, "T" | "F" | null>>>({}); // { questionId: { statementId: "T" | "F" } }
  const [answersP3, setAnswersP3] = useState<Record<string, string>>({}); // { questionId: textAnswer }
  
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ p1: 0, p2: 0, p3: 0 });
  const [activeQuestion, setActiveQuestion] = useState<{ part: "p1" | "p2" | "p3"; idx: number; id: string } | null>(null);
  const [showDetailedSheet, setShowDetailedSheet] = useState(false);
  const [isMobileAnswerSheetOpen, setIsMobileAnswerSheetOpen] = useState(false);

  const [userScores, setUserScores] = useState<Record<string, number>>({});

  useEffect(() => {
    if (loggedInUser) {
      try {
        const key = `student_scores_${loggedInUser.name}_${loggedInUser.className}`;
        const saved = localStorage.getItem(key);
        if (saved) {
          setUserScores(JSON.parse(saved));
        } else {
          setUserScores({});
        }
      } catch (e) {
        console.error("Error reading student scores:", e);
        setUserScores({});
      }
    } else {
      setUserScores({});
    }
  }, [loggedInUser]);

  // --- TEACHER AI UPLOAD STATE ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Interactive Brownian simulation state
  const [pollenPosition, setPollenPosition] = useState({ x: 200, y: 120 });
  const [isSimulatingBrownian, setIsSimulatingBrownian] = useState(false);

  // Initialize and Shuffle Practice Exam based on selected lesson or custom pools
  const initializeTest = (
    lessonIdOrPools?: string | Part1Question[],
    p2PoolCustom?: Part2Question[]
  ) => {
    let p1Pool: Part1Question[] = [];
    let p2Pool: Part2Question[] = [];
    let p3Pool: Part3Question[] = [];

    if (Array.isArray(lessonIdOrPools)) {
      p1Pool = lessonIdOrPools;
      p2Pool = p2PoolCustom || [];
      p3Pool = [];
    } else {
      const lessonId = lessonIdOrPools || selectedLesson?.id || "l1";
      if (lessonId === "l1") {
        p1Pool = INITIAL_P1_QUESTIONS;
        p2Pool = INITIAL_P2_QUESTIONS;
        p3Pool = INITIAL_P3_QUESTIONS;
      } else if (lessonId === "l2") {
        p1Pool = LESSON2_P1_QUESTIONS;
        p2Pool = LESSON2_P2_QUESTIONS;
        p3Pool = LESSON2_P3_QUESTIONS;
      } else if (lessonId === "l3") {
        p1Pool = LESSON3_P1_QUESTIONS;
        p2Pool = LESSON3_P2_QUESTIONS;
        p3Pool = LESSON3_P3_QUESTIONS;
      } else if (lessonId === "l4") {
        p1Pool = LESSON4_P1_QUESTIONS;
        p2Pool = LESSON4_P2_QUESTIONS;
        p3Pool = LESSON4_P3_QUESTIONS;
      } else if (lessonId === "l5") {
        p1Pool = LESSON5_P1_QUESTIONS;
        p2Pool = LESSON5_P2_QUESTIONS;
        p3Pool = LESSON5_P3_QUESTIONS;
      } else if (lessonId === "l6") {
        p1Pool = LESSON6_P1_QUESTIONS;
        p2Pool = LESSON6_P2_QUESTIONS;
        p3Pool = LESSON6_P3_QUESTIONS;
      } else if (lessonId === "l7") {
        p1Pool = LESSON7_P1_QUESTIONS;
        p2Pool = LESSON7_P2_QUESTIONS;
        p3Pool = LESSON7_P3_QUESTIONS;
      } else if (lessonId === "l8") {
        p1Pool = LESSON8_P1_QUESTIONS;
        p2Pool = LESSON8_P2_QUESTIONS;
        p3Pool = [];
      } else if (lessonId === "l9") {
        p1Pool = LESSON9_P1_QUESTIONS;
        p2Pool = LESSON9_P2_QUESTIONS;
        p3Pool = LESSON9_P3_QUESTIONS;
      } else if (lessonId === "l10") {
        p1Pool = LESSON10_P1_QUESTIONS;
        p2Pool = LESSON10_P2_QUESTIONS;
        p3Pool = LESSON10_P3_QUESTIONS;
      } else if (lessonId === "l11") {
        p1Pool = LESSON11_P1_QUESTIONS;
        p2Pool = LESSON11_P2_QUESTIONS;
        p3Pool = LESSON11_P3_QUESTIONS;
      } else if (lessonId === "l12") {
        p1Pool = LESSON12_P1_QUESTIONS;
        p2Pool = LESSON12_P2_QUESTIONS;
        p3Pool = LESSON12_P3_QUESTIONS;
      } else if (lessonId === "l13") {
        p1Pool = LESSON13_P1_QUESTIONS;
        p2Pool = LESSON13_P2_QUESTIONS;
        p3Pool = LESSON13_P3_QUESTIONS;
      } else if (lessonId === "l14") {
        p1Pool = LESSON14_P1_QUESTIONS;
        p2Pool = LESSON14_P2_QUESTIONS;
        p3Pool = [];
      } else if (lessonId === "l15") {
        p1Pool = LESSON15_P1_QUESTIONS;
        p2Pool = LESSON15_P2_QUESTIONS;
        p3Pool = LESSON15_P3_QUESTIONS;
      } else if (lessonId === "l16") {
        p1Pool = LESSON16_P1_QUESTIONS;
        p2Pool = LESSON16_P2_QUESTIONS;
        p3Pool = LESSON16_P3_QUESTIONS;
      } else if (lessonId === "l17") {
        p1Pool = LESSON17_P1_QUESTIONS;
        p2Pool = LESSON17_P2_QUESTIONS;
        p3Pool = LESSON17_P3_QUESTIONS;
      } else if (lessonId === "l18") {
        p1Pool = LESSON18_P1_QUESTIONS;
        p2Pool = LESSON18_P2_QUESTIONS;
        p3Pool = LESSON18_P3_QUESTIONS;
      } else if (lessonId === "l19") {
        p1Pool = LESSON19_P1_QUESTIONS;
        p2Pool = LESSON19_P2_QUESTIONS;
        p3Pool = LESSON19_P3_QUESTIONS;
      } else if (lessonId === "l20") {
        p1Pool = LESSON20_P1_QUESTIONS;
        p2Pool = LESSON20_P2_QUESTIONS;
        p3Pool = LESSON20_P3_QUESTIONS;
      } else if (lessonId === "l21") {
        p1Pool = LESSON21_P1_QUESTIONS;
        p2Pool = LESSON21_P2_QUESTIONS;
        p3Pool = LESSON21_P3_QUESTIONS;
      } else if (lessonId === "l22") {
        p1Pool = LESSON22_P1_QUESTIONS;
        p2Pool = LESSON22_P2_QUESTIONS;
        p3Pool = LESSON22_P3_QUESTIONS;
      } else if (lessonId === "l23") {
        p1Pool = LESSON23_P1_QUESTIONS;
        p2Pool = LESSON23_P2_QUESTIONS;
        p3Pool = LESSON23_P3_QUESTIONS;
      } else if (lessonId === "l24") {
        p1Pool = LESSON24_P1_QUESTIONS;
        p2Pool = LESSON24_P2_QUESTIONS;
        p3Pool = LESSON24_P3_QUESTIONS;
      } else if (lessonId === "l25") {
        p1Pool = LESSON25_P1_QUESTIONS;
        p2Pool = LESSON25_P2_QUESTIONS;
        p3Pool = LESSON25_P3_QUESTIONS;
      } else {
        p1Pool = questionsP1;
        p2Pool = questionsP2;
        p3Pool = [];
      }
    }

    // Shuffle Part 1 questions
    let shuffled1 = shuffleArray(p1Pool).map((q) => {
      return {
        ...q,
        options: shuffleArray(q.options)
      };
    });

    const lessonId = typeof lessonIdOrPools === "string" ? lessonIdOrPools : (selectedLesson?.id || "l1");

    // Shuffle Part 2 questions
    const shuffled2 = shuffleArray(p2Pool).map((q) => {
      return {
        ...q,
        statements: shuffleArray(q.statements)
      };
    });

    // Shuffle Part 3 questions
    const shuffled3 = shuffleArray(p3Pool);

    setShuffledP1(shuffled1);
    setShuffledP2(shuffled2);
    setShuffledP3(shuffled3);
    
    setAnswersP1({});
    
    const initialAnswersP2: Record<string, Record<string, "T" | "F" | null>> = {};
    shuffled2.forEach((q) => {
      initialAnswersP2[q.id] = {};
      q.statements.forEach((st) => {
        initialAnswersP2[q.id][st.id] = null;
      });
    });
    setAnswersP2(initialAnswersP2);
    
    setAnswersP3({});
    
    setExamSubmitted(false);
    setTotalScore(0);
    setScoreBreakdown({ p1: 0, p2: 0, p3: 0 });

    if (shuffled1.length > 0) {
      setActiveQuestion({ part: "p1", idx: 0, id: shuffled1[0].id });
    } else if (shuffled2.length > 0) {
      setActiveQuestion({ part: "p2", idx: 0, id: shuffled2[0].id });
    } else if (shuffled3.length > 0) {
      setActiveQuestion({ part: "p3", idx: 0, id: shuffled3[0].id });
    } else {
      setActiveQuestion(null);
    }
  };

  // Run initial test shuffling on selecting Lesson 1 to 25
  useEffect(() => {
    if (selectedLesson && (selectedLesson.id === "l1" || selectedLesson.id === "l2" || selectedLesson.id === "l3" || selectedLesson.id === "l4" || selectedLesson.id === "l5" || selectedLesson.id === "l6" || selectedLesson.id === "l7" || selectedLesson.id === "l8" || selectedLesson.id === "l9" || selectedLesson.id === "l10" || selectedLesson.id === "l11" || selectedLesson.id === "l12" || selectedLesson.id === "l13" || selectedLesson.id === "l14" || selectedLesson.id === "l15" || selectedLesson.id === "l16" || selectedLesson.id === "l17" || selectedLesson.id === "l18" || selectedLesson.id === "l19" || selectedLesson.id === "l20" || selectedLesson.id === "l21" || selectedLesson.id === "l22" || selectedLesson.id === "l23" || selectedLesson.id === "l24" || selectedLesson.id === "l25")) {
      initializeTest(selectedLesson.id);
    }
  }, [selectedLesson]);

  // Auto-close mobile answer sheet when a question is selected
  useEffect(() => {
    setIsMobileAnswerSheetOpen(false);
  }, [activeQuestion]);

  // Handle programmatic navigation from Student Dashboard ("Tiếp tục học ngay")
  useEffect(() => {
    if (initialLessonId === "l1") {
      const realChapter1 = ACADEMIC_CHAPTERS[0];
      const realLesson1 = realChapter1.lessons[0];
      setSelectedChapter(realChapter1);
      setSelectedLesson(realLesson1);
      setActiveLessonTab("pdf");

      if (onResetInitialLesson) {
        onResetInitialLesson();
      }
    }
  }, [initialLessonId, onResetInitialLesson]);

  // Interactive Brownian Simulation Trigger
  useEffect(() => {
    let interval: any;
    if (isSimulatingBrownian) {
      interval = setInterval(() => {
        setPollenPosition((prev) => {
          const dx = (Math.random() - 0.5) * 35;
          const dy = (Math.random() - 0.5) * 35;
          const newX = Math.min(Math.max(prev.x + dx, 50), 350);
          const newY = Math.min(Math.max(prev.y + dy, 50), 200);
          return { x: newX, y: newY };
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isSimulatingBrownian]);

  const handleSelectLesson = (lesson: Lesson, chapter: Chapter) => {
    setSelectedChapter(chapter);
    setSelectedLesson(lesson);
    setActiveLessonTab("pdf");
    setCurrentSlideIndex(0);
    setCurrentCardIndex(0);
    setCardFlipped(false);
    setAiSummary(null);
  };

  // Submit and Grade test
  const handleGradeTest = () => {
    // Part 1 grading
    let p1Correct = 0;
    shuffledP1.forEach((q) => {
      const selectedOptId = answersP1[q.id];
      const selectedOpt = q.options.find((opt) => opt.id === selectedOptId);
      if (selectedOpt && selectedOpt.isCorrect) {
        p1Correct++;
      }
    });
    
    let scoreP1 = 0;
    if (selectedLesson?.id === "l8" || selectedLesson?.id === "l14") {
      scoreP1 = p1Correct * 0.3; // 20 questions * 0.3 = 6.0
    } else if (selectedLesson?.id === "l1" || selectedLesson?.id === "l3") {
      scoreP1 = p1Correct * 0.3; // 10 questions * 0.3 = 3.0 (updated from 4.5)
    } else if (selectedLesson?.id === "l2" || selectedLesson?.id === "l4" || selectedLesson?.id === "l5" || selectedLesson?.id === "l6" || selectedLesson?.id === "l7" || selectedLesson?.id === "l9" || selectedLesson?.id === "l10" || selectedLesson?.id === "l11" || selectedLesson?.id === "l12" || selectedLesson?.id === "l13" || selectedLesson?.id === "l15" || selectedLesson?.id === "l16" || selectedLesson?.id === "l17" || selectedLesson?.id === "l18" || selectedLesson?.id === "l19" || selectedLesson?.id === "l20" || selectedLesson?.id === "l21" || selectedLesson?.id === "l22" || selectedLesson?.id === "l23" || selectedLesson?.id === "l24" || selectedLesson?.id === "l25") {
      scoreP1 = selectedLesson?.id === "l15" ? p1Correct * 0.5625 : p1Correct * 0.25; // 4.5 pts
    }

    // Part 2 grading (4 questions * 1.0 = 4.0 pts max)
    let scoreP2 = 0;
    shuffledP2.forEach((q) => {
      let correctStatementsCount = 0;
      q.statements.forEach((st) => {
        const userChoice = answersP2[q.id]?.[st.id];
        const correctChoice = st.isCorrect ? "T" : "F";
        if (userChoice === correctChoice) {
          correctStatementsCount++;
        }
      });

      // THPT scoring rule: 1->0.1đ; 2->0.25đ; 3->0.5đ; 4->1.0đ
      let qScore = 0;
      if (correctStatementsCount === 1) qScore = 0.1;
      else if (correctStatementsCount === 2) qScore = 0.25;
      else if (correctStatementsCount === 3) qScore = 0.5;
      else if (correctStatementsCount === 4) qScore = 1.0;

      scoreP2 += qScore;
    });

    // Part 3 grading
    let p3Correct = 0;
    shuffledP3.forEach((q) => {
      const userAnsRaw = answersP3[q.id];
      if (userAnsRaw !== undefined) {
        const cleanedUserAns = parseFloat(userAnsRaw.trim().replace(",", "."));
        if (!isNaN(cleanedUserAns) && cleanedUserAns === q.answer) {
          p3Correct++;
        }
      }
    });

    let scoreP3 = 0;
    if (selectedLesson?.id === "l1" || selectedLesson?.id === "l3") {
      scoreP3 = p3Correct * 0.5; // 6 questions * 0.5 = 3.0 (updated from 1.5)
    } else if (selectedLesson?.id === "l2" || selectedLesson?.id === "l4" || selectedLesson?.id === "l5" || selectedLesson?.id === "l6" || selectedLesson?.id === "l7" || selectedLesson?.id === "l9" || selectedLesson?.id === "l10" || selectedLesson?.id === "l11" || selectedLesson?.id === "l12" || selectedLesson?.id === "l13" || selectedLesson?.id === "l15" || selectedLesson?.id === "l16" || selectedLesson?.id === "l17" || selectedLesson?.id === "l18" || selectedLesson?.id === "l19" || selectedLesson?.id === "l20" || selectedLesson?.id === "l21" || selectedLesson?.id === "l22" || selectedLesson?.id === "l23" || selectedLesson?.id === "l24" || selectedLesson?.id === "l25") {
      scoreP3 = p3Correct * 0.25; // 6 questions * 0.25 = 1.5
    }

    const finalScore = parseFloat((scoreP1 + scoreP2 + scoreP3).toFixed(2));
    setTotalScore(finalScore);
    setScoreBreakdown({
      p1: parseFloat(scoreP1.toFixed(2)),
      p2: parseFloat(scoreP2.toFixed(2)),
      p3: parseFloat(scoreP3.toFixed(2))
    });
    setExamSubmitted(true);
    onEarnXP(Math.round(finalScore * 12), finalScore);

    // Save test score to localStorage for AI recommendation feedback loop
    if (loggedInUser && selectedLesson) {
      const key = `student_scores_${loggedInUser.name}_${loggedInUser.className}`;
      let scores: Record<string, number> = {};
      try {
        const saved = localStorage.getItem(key);
        if (saved) {
          scores = JSON.parse(saved);
        }
      } catch (e) {
        console.error("Error parsing scores from localStorage:", e);
      }
      scores[selectedLesson.id] = finalScore;
      localStorage.setItem(key, JSON.stringify(scores));
      setUserScores(scores);
    }
  };

  // Handle dynamically importing exercises using server-side Gemini OCR & analysis
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingFile(true);
    setUploadError(null);
    setUploadSuccess(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const base64Data = event.target?.result as string;

        const response = await fetch("/api/gemini/parse-uploaded-exercise", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fileData: base64Data,
            fileType: file.type,
            fileName: file.name
          })
        });

        if (!response.ok) {
          throw new Error("Lỗi mạng khi gửi yêu cầu phân tích tới máy chủ");
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        const parsedP1 = data.questionsP1 || [];
        const parsedP2 = data.questionsP2 || [];

        if (parsedP1.length === 0 && parsedP2.length === 0) {
          throw new Error("AI không tìm thấy câu hỏi Vật lí nào trong tệp tải lên. Vui lòng kiểm tra lại nội dung tệp.");
        }

        // Merge newly parsed questions with current question pools
        const updatedP1 = [...questionsP1, ...parsedP1];
        const updatedP2 = [...questionsP2, ...parsedP2];

        setQuestionsP1(updatedP1);
        setQuestionsP2(updatedP2);

        // Reinitialize the test with updated pools (triggers shuffling)
        initializeTest(updatedP1, updatedP2);

        setUploadSuccess(
          `Nhận diện thành công! Đã trích xuất và đưa vào ngân hàng đề: ${parsedP1.length} câu trắc nghiệm 1 ĐA (Phần I) và ${parsedP2.length} câu trắc nghiệm Đúng/Sai (Phần II). Đề thi hiện tại đã tự động đảo câu để tích hợp câu hỏi mới!`
        );
        onEarnXP(100); // Thưởng cho giáo viên vì đã đóng góp học liệu chất lượng!
      } catch (err: any) {
        console.error("AI File upload error:", err);
        setUploadError(err.message || "Đã xảy ra lỗi không xác định khi tải tệp lên.");
      } finally {
        setIsUploadingFile(false);
      }
    };

    reader.onerror = () => {
      setUploadError("Không thể đọc tệp tin.");
      setIsUploadingFile(false);
    };

    reader.readAsDataURL(file);
  };

  const handleAISummarize = async () => {
    if (!selectedLesson) return;
    setIsLoadingAI(true);
    setAiSummary(null);

    try {
      const response = await fetch("/api/gemini/summarize-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: selectedLesson.title,
          content: selectedLesson.readingContent
        })
      });

      const data = await response.json();
      if (response.ok && data.summaryText) {
        setAiSummary(data);
        onEarnXP(25);
      } else {
        alert("Lỗi tóm tắt bài học bằng AI. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ AI.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  const isL1 = !!selectedLesson?.id && selectedLesson.id.startsWith("l");
  const isLesson15 = selectedLesson?.id === "l15" || selectedLesson?.id === "l16" || selectedLesson?.id === "l17" || selectedLesson?.id === "l18" || selectedLesson?.id === "l19" || selectedLesson?.id === "l20" || selectedLesson?.id === "l21" || selectedLesson?.id === "l22" || selectedLesson?.id === "l23" || selectedLesson?.id === "l24" || selectedLesson?.id === "l25";

  const totalP1 = shuffledP1.length;
  const totalP2 = shuffledP2.length;
  const totalP3 = shuffledP3.length;
  const totalQuestionsCount = totalP1 + totalP2 + totalP3;

  const answeredP1Count = shuffledP1.filter(q => answersP1[q.id] !== undefined).length;
  const answeredP2Count = shuffledP2.filter(q => q.statements && q.statements.every(st => answersP2[q.id]?.[st.id] !== undefined)).length;
  const answeredP3Count = shuffledP3.filter(q => answersP3[q.id] && answersP3[q.id].trim() !== "").length;
  const totalAnsweredCount = answeredP1Count + answeredP2Count + answeredP3Count;
  const percent = totalQuestionsCount > 0 ? Math.round((totalAnsweredCount / totalQuestionsCount) * 100) : 0;

  const renderAnswerSheetCard = () => {

    return (
      <div className="bg-white text-slate-900 border-2 border-slate-900 rounded-3xl p-4.5 space-y-4 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.15)]">
        {/* Header of Answer Sheet */}
        <div className="border-b-2 border-dashed border-slate-200 pb-3 text-center relative font-sans">
          <div className="flex items-center justify-center gap-2 mb-1">
            <CheckCircle2 className="h-5 w-5 text-purple-600 animate-pulse" />
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">PHIẾU TRẢ LỜI TRẮC NGHIỆM</h3>
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono block truncate">
            BÀI HỌC: {selectedLesson?.title}
          </span>
        </div>

        {/* PROGRESS OVERVIEW */}
        <div className="bg-slate-50 border border-slate-150 p-3 rounded-2xl space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Tiến độ bài làm</span>
            <span className="text-xs font-black text-slate-800">
              {totalAnsweredCount}/{totalQuestionsCount} <span className="text-[10px] font-medium text-slate-500">câu ({percent}%)</span>
            </span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* COMPACT QUESTION MAP */}
        <div className="border border-slate-150 p-3 rounded-2xl bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
              <span>🎯 Bản đồ câu hỏi</span>
            </span>
            <span className="text-[9px] text-slate-400 font-semibold italic">Nhấp số để di chuyển nhanh</span>
          </div>

          <div className="space-y-2.5">
            {/* PART I MAP */}
            {shuffledP1.length > 0 && (
              <div className="space-y-1">
                <span className="text-[9px] font-extrabold text-rose-500 block uppercase tracking-wider">
                  Phần I: Một lựa chọn ({shuffledP1.length} câu)
                </span>
                <div className="flex flex-wrap gap-1">
                  {shuffledP1.map((q, idx) => {
                    const isSelected = activeQuestion?.part === "p1" && activeQuestion?.idx === idx;
                    const isAns = answersP1[q.id] !== undefined;
                    
                    let bgClass = "bg-slate-100 text-slate-600 hover:bg-slate-200";
                    let borderClass = "border-transparent";
                    
                    if (examSubmitted) {
                      const isCorrect = answersP1[q.id] === q.options.find(o => o.isCorrect)?.id;
                      if (isAns) {
                        bgClass = isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white";
                      } else {
                        bgClass = "bg-slate-100 text-slate-300";
                      }
                    } else if (isAns) {
                      bgClass = "bg-purple-600 text-white hover:bg-purple-700";
                    }
                    
                    if (isSelected) {
                      borderClass = "ring-2 ring-purple-500 ring-offset-1";
                    }
                    
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setActiveQuestion({ part: "p1", idx, id: q.id });
                          const el = document.getElementById(`question-p1-${idx}`);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "center" });
                          }
                          if (isMobileAnswerSheetOpen) {
                            setIsMobileAnswerSheetOpen(false);
                          }
                        }}
                        className={`w-6.5 h-6.5 rounded-full text-[10px] font-black flex items-center justify-center transition-all cursor-pointer ${bgClass} ${borderClass}`}
                        title={`Câu ${idx + 1} (Phần I)`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PART II MAP */}
            {shuffledP2.length > 0 && (
              <div className="space-y-1">
                <span className="text-[9px] font-extrabold text-purple-500 block uppercase tracking-wider">
                  Phần II: Đúng / Sai ({shuffledP2.length} câu)
                </span>
                <div className="flex flex-wrap gap-1">
                  {shuffledP2.map((q, idx) => {
                    const isSelected = activeQuestion?.part === "p2" && activeQuestion?.idx === idx;
                    const totalSt = q.statements?.length || 0;
                    const ansSt = q.statements ? q.statements.filter(st => answersP2[q.id]?.[st.id]).length : 0;
                    const isFull = totalSt > 0 && ansSt === totalSt;
                    const isPartial = ansSt > 0 && ansSt < totalSt;
                    
                    let bgClass = "bg-slate-100 text-slate-600 hover:bg-slate-200";
                    let borderClass = "border-transparent";
                    
                    if (examSubmitted) {
                      let correctCount = 0;
                      q.statements?.forEach(st => {
                        const uVal = answersP2[q.id]?.[st.id];
                        const isCorrectAns = (uVal === "T" && st.isCorrect) || (uVal === "F" && !st.isCorrect);
                        if (isCorrectAns) correctCount++;
                      });
                      if (ansSt === 0) {
                        bgClass = "bg-slate-100 text-slate-300";
                      } else if (correctCount === totalSt) {
                        bgClass = "bg-emerald-500 text-white";
                      } else if (correctCount > 0) {
                        bgClass = "bg-amber-500 text-white";
                      } else {
                        bgClass = "bg-rose-500 text-white";
                      }
                    } else if (isFull) {
                      bgClass = "bg-purple-600 text-white hover:bg-purple-700";
                    } else if (isPartial) {
                      bgClass = "bg-purple-100 text-purple-800 border border-purple-200 hover:bg-purple-200";
                    }
                    
                    if (isSelected) {
                      borderClass = "ring-2 ring-purple-500 ring-offset-1";
                    }
                    
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setActiveQuestion({ part: "p2", idx, id: q.id });
                          const el = document.getElementById(`question-p2-${idx}`);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "center" });
                          }
                          if (isMobileAnswerSheetOpen) {
                            setIsMobileAnswerSheetOpen(false);
                          }
                        }}
                        className={`w-6.5 h-6.5 rounded-md text-[10px] font-black flex items-center justify-center transition-all cursor-pointer relative ${bgClass} ${borderClass}`}
                        title={`Câu ${idx + 1} (Phần II) - Đã làm ${ansSt}/${totalSt} ý`}
                      >
                        <span>{idx + 1}</span>
                        {!examSubmitted && isPartial && (
                          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PART III MAP */}
            {shuffledP3.length > 0 && (
              <div className="space-y-1">
                <span className="text-[9px] font-extrabold text-blue-500 block uppercase tracking-wider">
                  Phần III: Trả lời ngắn ({shuffledP3.length} câu)
                </span>
                <div className="flex flex-wrap gap-1">
                  {shuffledP3.map((q, idx) => {
                    const isSelected = activeQuestion?.part === "p3" && activeQuestion?.idx === idx;
                    const userVal = answersP3[q.id] || "";
                    const isAns = !!userVal.trim();
                    
                    let bgClass = "bg-slate-100 text-slate-600 hover:bg-slate-200";
                    let borderClass = "border-transparent";
                    
                    if (examSubmitted) {
                      const cleanUser = userVal.trim().replace(",", ".");
                      const cleanAns = String(q.answer).trim().replace(",", ".");
                      const isCorrect = cleanUser === cleanAns || parseFloat(cleanUser) === parseFloat(cleanAns);
                      if (isAns) {
                        bgClass = isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white";
                      } else {
                        bgClass = "bg-slate-100 text-slate-300";
                      }
                    } else if (isAns) {
                      bgClass = "bg-purple-600 text-white hover:bg-purple-700";
                    }
                    
                    if (isSelected) {
                      borderClass = "ring-2 ring-purple-500 ring-offset-1";
                    }
                    
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setActiveQuestion({ part: "p3", idx, id: q.id });
                          const el = document.getElementById(`question-p3-${idx}`);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "center" });
                          }
                          if (isMobileAnswerSheetOpen) {
                            setIsMobileAnswerSheetOpen(false);
                          }
                        }}
                        className={`w-6.5 h-6.5 rounded-full text-[10px] font-black flex items-center justify-center border border-slate-200 transition-all cursor-pointer ${bgClass} ${borderClass}`}
                        title={`Câu ${idx + 1} (Phần III)`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ACTIVE QUESTION RESPONSE WIDGET (HỘP TƯƠNG TÁC) */}
        {activeQuestion && (() => {
          const part = activeQuestion.part;
          const idx = activeQuestion.idx;
          const qId = activeQuestion.id;
          
          if (part === "p1") {
            const q = shuffledP1[idx];
            if (!q) return null;
            return (
              <div className="p-3 bg-purple-50 border-2 border-purple-500/30 rounded-2xl space-y-2.5 shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider font-sans">
                    👉 Đang chọn: Câu {idx + 1} (Phần I)
                  </span>
                  <button
                    onClick={() => {
                      const el = document.getElementById(`question-p1-${idx}`);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }}
                    className="text-[9px] font-extrabold text-purple-600 hover:underline cursor-pointer flex items-center gap-0.5 font-sans"
                  >
                    Xem câu hỏi 🔍
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-600 font-bold line-clamp-2 italic leading-snug">
                    <FormattedMathText text={q.question} />
                  </p>
                  <div className="flex justify-around gap-1.5 pt-0.5">
                    {q.options.map((opt, oIdx) => {
                      const letter = String.fromCharCode(65 + oIdx);
                      const isChosen = answersP1[q.id] === opt.id;
                      
                      let btnStyle = "bg-white border-rose-500 text-rose-600 hover:bg-rose-50";
                      if (examSubmitted) {
                        if (opt.isCorrect) {
                          btnStyle = "bg-emerald-600 border-emerald-600 text-white";
                        } else if (isChosen) {
                          btnStyle = "bg-rose-600 border-rose-600 text-white";
                        } else {
                          btnStyle = "bg-white border-slate-200 text-slate-300 opacity-40";
                        }
                      } else if (isChosen) {
                        btnStyle = "bg-rose-600 border-rose-600 text-white shadow-md scale-105";
                      }
                      
                      return (
                        <button
                          key={opt.id}
                          disabled={examSubmitted}
                          onClick={() => {
                            setAnswersP1({ ...answersP1, [q.id]: opt.id });
                          }}
                          className={`w-8.5 h-8.5 rounded-full border-2 font-black text-xs flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          } else if (part === "p2") {
            const q = shuffledP2[idx];
            if (!q) return null;
            return (
              <div className="p-3 bg-purple-50 border-2 border-purple-500/30 rounded-2xl space-y-2.5 shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider font-sans">
                    👉 Đang chọn: Câu {idx + 1} (Phần II)
                  </span>
                  <button
                    onClick={() => {
                      const el = document.getElementById(`question-p2-${idx}`);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }}
                    className="text-[9px] font-extrabold text-purple-600 hover:underline cursor-pointer flex items-center gap-0.5 font-sans"
                  >
                    Xem câu hỏi 🔍
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-600 font-bold line-clamp-2 italic leading-snug">
                    <FormattedMathText text={q.question} />
                  </p>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-0.5">
                    {q.statements && q.statements.map((st, stIdx) => {
                      const userVal = answersP2[q.id]?.[st.id];
                      const char = String.fromCharCode(97 + stIdx);
                      
                      const renderChoiceBtn = (choice: "T" | "F", label: "Đúng" | "Sai") => {
                        const isChosen = userVal === choice;
                        let btnStyle = "bg-white border-rose-500 text-rose-600 hover:bg-rose-50";
                        if (examSubmitted) {
                          const isActualChosenCorrect = (st.isCorrect && userVal === "T") || (!st.isCorrect && userVal === "F");
                          const isCorrectAns = (choice === "T" && st.isCorrect) || (choice === "F" && !st.isCorrect);
                          if (isChosen && isActualChosenCorrect) {
                            btnStyle = "bg-emerald-600 border-emerald-600 text-white";
                          } else if (isChosen && !isActualChosenCorrect) {
                            btnStyle = "bg-rose-600 border-rose-600 text-white";
                          } else if (!isChosen && isCorrectAns) {
                            btnStyle = "border border-emerald-600 text-emerald-600 bg-emerald-50";
                          } else {
                            btnStyle = "bg-white border-slate-200 text-slate-300 opacity-40";
                          }
                        } else if (isChosen) {
                          btnStyle = "bg-rose-600 border-rose-600 text-white shadow-md scale-105";
                        }
                        
                        return (
                          <button
                            key={choice}
                            disabled={examSubmitted}
                            onClick={() => {
                              const currentAnswers = { ...answersP2 };
                              currentAnswers[q.id] = { ...currentAnswers[q.id], [st.id]: choice };
                              setAnswersP2(currentAnswers);
                            }}
                            className={`px-2.5 py-0.5 text-[9px] font-black rounded border transition-all cursor-pointer ${btnStyle}`}
                          >
                            {label}
                          </button>
                        );
                      };
                      
                      return (
                        <div key={st.id} className="flex justify-between items-center gap-1.5 p-1 bg-white border border-purple-100 rounded-lg">
                          <span className="text-[10px] font-bold text-slate-600 font-mono">Ý {char})</span>
                          <div className="flex gap-1">
                            {renderChoiceBtn("T", "Đúng")}
                            {renderChoiceBtn("F", "Sai")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          } else if (part === "p3") {
            const q = shuffledP3[idx];
            if (!q) return null;
            const userVal = answersP3[q.id] || "";
            
            const cleanUser = userVal.trim().replace(",", ".");
            const cleanAns = String(q.answer).trim().replace(",", ".");
            const isCorrect = examSubmitted && (cleanUser === cleanAns || parseFloat(cleanUser) === parseFloat(cleanAns));
            
            return (
              <div className="p-3 bg-purple-50 border-2 border-purple-500/30 rounded-2xl space-y-2.5 shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider font-sans">
                    👉 Đang chọn: Câu {idx + 1} (Phần III)
                  </span>
                  <button
                    onClick={() => {
                      const el = document.getElementById(`question-p3-${idx}`);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }}
                    className="text-[9px] font-extrabold text-purple-600 hover:underline cursor-pointer flex items-center gap-0.5 font-sans"
                  >
                    Xem câu hỏi 🔍
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-600 font-bold line-clamp-2 italic leading-snug">
                    <FormattedMathText text={q.question} />
                  </p>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      disabled={examSubmitted}
                      value={userVal}
                      onChange={(e) => {
                        setAnswersP3({ ...answersP3, [q.id]: e.target.value });
                      }}
                      placeholder="Nhập đáp án số..."
                      className={`px-2.5 py-1 text-xs bg-white text-slate-900 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono w-full font-black text-center ${
                        examSubmitted
                          ? isCorrect
                            ? "border-emerald-500 text-emerald-850 bg-emerald-50"
                            : "border-rose-500 text-rose-850 bg-rose-50"
                          : "border-slate-900"
                      }`}
                    />
                    {q.unit && (
                      <span className="text-[10px] text-slate-500 font-black uppercase shrink-0">{q.unit}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })()}

        {/* DETAILED ANSWER SHEET (COLLAPSIBLE) */}
        <div className="border-t border-dashed border-slate-200 pt-3">
          <button
            type="button"
            onClick={() => setShowDetailedSheet(!showDetailedSheet)}
            className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-[10px] font-black text-slate-600 transition-all cursor-pointer"
          >
            <span>📄 {showDetailedSheet ? "ẨN PHIẾU TRÒN CHI TIẾT" : "XEM PHIẾU TRÒN CHI TIẾT"}</span>
            <span className="text-xs">{showDetailedSheet ? "▲" : "▼"}</span>
          </button>
          
          {showDetailedSheet && (
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 mt-3 transition-all duration-300">
              {/* PART I */}
              {shuffledP1.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black text-rose-600 block uppercase tracking-wider border-b border-dashed border-rose-100 pb-0.5">
                    ● PHẦN I: NHIỀU LỰA CHỌN
                  </span>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 bg-rose-50/10 p-2 border border-rose-100/60 rounded-xl">
                    {(() => {
                      const half = Math.ceil(shuffledP1.length / 2);
                      const col1 = shuffledP1.slice(0, half);
                      const col2 = shuffledP1.slice(half);
                      
                      const renderColItem = (q: any, localIdx: number) => {
                        const isRowActive = activeQuestion?.part === "p1" && activeQuestion?.idx === localIdx;
                        const userChosenOptId = answersP1[q.id];
                        
                        return (
                          <div
                            key={q.id}
                            id={`sheet-p1-${localIdx}`}
                            onClick={() => {
                              setActiveQuestion({ part: "p1", idx: localIdx, id: q.id });
                              const el = document.getElementById(`question-p1-${localIdx}`);
                              if (el) {
                                el.scrollIntoView({ behavior: "smooth", block: "center" });
                              }
                            }}
                            className={`flex items-center justify-between p-0.5 rounded transition-all cursor-pointer ${
                              isRowActive
                                ? "bg-purple-100 ring-1 ring-purple-500"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <span className={`text-[10px] font-extrabold w-5 text-slate-600 ${isRowActive ? "text-purple-700" : ""}`}>
                              {localIdx + 1}
                            </span>
                            <div className="flex gap-0.5 shrink-0">
                              {["A", "B", "C", "D"].map((letter, letterIdx) => {
                                const opt = q.options[letterIdx];
                                if (!opt) return null;
                                const isChosen = userChosenOptId === opt.id;
                                
                                let btnStyle = "bg-white border-rose-500 text-rose-600";
                                if (examSubmitted) {
                                  const isCorrectAns = opt.isCorrect;
                                  const isChosenCorrect = isChosen && isCorrectAns;
                                  if (isChosenCorrect) {
                                    btnStyle = "bg-emerald-600 border-emerald-600 text-white";
                                  } else if (isChosen && !isCorrectAns) {
                                    btnStyle = "bg-rose-600 border-rose-600 text-white";
                                  } else if (!isChosen && isCorrectAns) {
                                    btnStyle = "border-2 border-emerald-600 text-emerald-600 bg-emerald-50";
                                  } else {
                                    btnStyle = "border border-slate-200 text-slate-300 bg-white opacity-40";
                                  }
                                } else if (isChosen) {
                                  btnStyle = "bg-rose-600 border-rose-600 text-white shadow-sm scale-105";
                                }
                                
                                return (
                                  <button
                                    key={letter}
                                    type="button"
                                    disabled={examSubmitted}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setAnswersP1({ ...answersP1, [q.id]: opt.id });
                                      setActiveQuestion({ part: "p1", idx: localIdx, id: q.id });
                                      const el = document.getElementById(`question-p1-${localIdx}`);
                                      if (el) {
                                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                                      }
                                    }}
                                    className={`w-5 h-5 rounded-full border text-[9px] font-black flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                                  >
                                    {letter}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      };
                      
                      return (
                        <>
                          <div className="space-y-1 border-r border-rose-100/50 pr-1">
                            {col1.map((q, i) => renderColItem(q, i))}
                          </div>
                          <div className="space-y-1 pl-1">
                            {col2.map((q, i) => renderColItem(q, i + half))}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* PART II */}
              {shuffledP2.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black text-rose-600 block uppercase tracking-wider border-b border-dashed border-rose-100 pb-0.5">
                    ● PHẦN II: ĐÚNG / SAI
                  </span>
                  <div className="bg-rose-50/10 p-2 border border-rose-100/60 rounded-xl space-y-1.5">
                    {shuffledP2.map((q, localIdx) => {
                      const isRowActive = activeQuestion?.part === "p2" && activeQuestion?.idx === localIdx;
                      return (
                        <div
                          key={q.id}
                          id={`sheet-p2-${localIdx}`}
                          onClick={() => {
                            setActiveQuestion({ part: "p2", idx: localIdx, id: q.id });
                            const el = document.getElementById(`question-p2-${localIdx}`);
                            if (el) {
                              el.scrollIntoView({ behavior: "smooth", block: "center" });
                            }
                          }}
                          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                            isRowActive
                              ? "bg-purple-100 ring-1 ring-purple-500"
                              : "hover:bg-slate-50 border border-slate-100"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className={`text-[10px] font-extrabold text-slate-700 ${isRowActive ? "text-purple-700" : ""}`}>
                              Câu {localIdx + 1}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            {q.statements && q.statements.map((st, stIdx) => {
                              const userVal = answersP2[q.id]?.[st.id];
                              const char = String.fromCharCode(97 + stIdx);
                              
                              const renderChoiceBtn = (choice: "T" | "F", label: "Đ" | "S") => {
                                const isChosen = userVal === choice;
                                let btnStyle = "bg-white border-rose-500 text-rose-600";
                                if (examSubmitted) {
                                  const isCorrectAns = (choice === "T" && st.isCorrect) || (choice === "F" && !st.isCorrect);
                                  const isActualChosenCorrect = (st.isCorrect && userVal === "T") || (!st.isCorrect && userVal === "F");
                                  if (isChosen && isActualChosenCorrect) {
                                    btnStyle = "bg-emerald-600 border-emerald-600 text-white";
                                  } else if (isChosen && !isActualChosenCorrect) {
                                    btnStyle = "bg-rose-600 border-rose-600 text-white";
                                  } else if (!isChosen && isCorrectAns) {
                                    btnStyle = "border border-emerald-600 text-emerald-600 bg-emerald-50";
                                  } else {
                                    btnStyle = "border border-slate-200 text-slate-300 bg-white opacity-40";
                                  }
                                } else if (isChosen) {
                                  btnStyle = "bg-rose-600 border-rose-600 text-white scale-105";
                                }
                                
                                return (
                                  <button
                                    key={choice}
                                    type="button"
                                    disabled={examSubmitted}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const currentAnswers = { ...answersP2 };
                                      currentAnswers[q.id] = { ...currentAnswers[q.id], [st.id]: choice };
                                      setAnswersP2(currentAnswers);
                                      setActiveQuestion({ part: "p2", idx: localIdx, id: q.id });
                                      const el = document.getElementById(`question-p2-${localIdx}`);
                                      if (el) {
                                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                                      }
                                    }}
                                    className={`w-4.5 h-4.5 rounded-full border text-[8.5px] font-black flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                                  >
                                    {label}
                                  </button>
                                );
                              };
                              
                              return (
                                <div key={st.id} className="flex items-center justify-between p-0.5 px-1 bg-white rounded border border-slate-100">
                                  <span className="text-[9px] font-bold text-slate-500 font-mono">{char})</span>
                                  <div className="flex gap-0.5">
                                    {renderChoiceBtn("T", "Đ")}
                                    {renderChoiceBtn("F", "S")}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PART III */}
              {shuffledP3.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black text-rose-600 block uppercase tracking-wider border-b border-dashed border-rose-100 pb-0.5">
                    ● PHẦN III: TRẢ LỜI NGẮN
                  </span>
                  <div className="bg-rose-50/10 p-2 border border-rose-100/60 rounded-xl space-y-1">
                    {shuffledP3.map((q, localIdx) => {
                      const isRowActive = activeQuestion?.part === "p3" && activeQuestion?.idx === localIdx;
                      const userVal = answersP3[q.id] || "";
                      
                      const cleanUser = userVal.trim().replace(",", ".");
                      const cleanAns = String(q.answer).trim().replace(",", ".");
                      const isCorrect = examSubmitted && (cleanUser === cleanAns || parseFloat(cleanUser) === parseFloat(cleanAns));
                      
                      return (
                        <div
                          key={q.id}
                          id={`sheet-p3-${localIdx}`}
                          onClick={() => {
                            setActiveQuestion({ part: "p3", idx: localIdx, id: q.id });
                            const el = document.getElementById(`question-p3-${localIdx}`);
                            if (el) {
                              el.scrollIntoView({ behavior: "smooth", block: "center" });
                            }
                          }}
                          className={`flex items-center justify-between p-1 px-1.5 rounded-md transition-all cursor-pointer ${
                            isRowActive
                              ? "bg-purple-100 ring-1 ring-purple-500"
                              : "hover:bg-slate-50 border border-slate-100"
                          }`}
                        >
                          <span className={`text-[10px] font-extrabold text-slate-700 ${isRowActive ? "text-purple-700" : ""}`}>
                            Câu {localIdx + 1}
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            <input
                              type="text"
                              disabled={examSubmitted}
                              value={userVal}
                              onChange={(e) => {
                                setAnswersP3({ ...answersP3, [q.id]: e.target.value });
                                setActiveQuestion({ part: "p3", idx: localIdx, id: q.id });
                              }}
                              onClick={(e) => e.stopPropagation()}
                              placeholder="____"
                              className={`w-14 px-1 py-0.5 text-[10px] font-mono font-bold text-center border rounded outline-none transition-all ${
                                examSubmitted
                                  ? isCorrect
                                    ? "border-emerald-500 bg-emerald-50 text-emerald-850"
                                    : "border-rose-500 bg-rose-50 text-rose-850"
                                  : "border-slate-300 focus:border-purple-400"
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* CHAPTER SELECTION SCREEN */}
      {!selectedLesson ? (
        <div className="space-y-8 animate-fade-in">
          {/* Header introduction with vibrant, high-contrast background gradient */}
          <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 border border-indigo-500/20 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-white shadow-lg shadow-indigo-600/15 relative overflow-hidden no-override">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="z-10">
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-pink-300 drop-shadow-md" />
                Chương Trình Vật Lí 12 - Học Kì I & II
              </h2>
              <p className="text-xs text-slate-200 mt-1.5 max-w-2xl leading-relaxed">
                Hệ thống học tập thông minh chuẩn GDPT 2018 với 4 chương học cốt lõi, tích hợp slide lý thuyết tóm lược, video bài giảng trực quan, luyện flashcard ghi nhớ nhanh và ngân hàng câu hỏi ôn thi THPT quốc gia.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl text-xs font-bold shrink-0 z-10">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span>Chuẩn GDPT 2018</span>
            </div>
          </div>

          {/* PHYSICS TOPIC FILTER PANEL */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Brain className="h-5 w-5 text-indigo-500" />
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Lọc theo chủ đề Vật Lí
              </h3>
            </div>
            
            {/* Horizontal Filter Row */}
            <div className="flex flex-wrap gap-2">
              {PHYSICS_TOPICS.map((topic) => {
                const TopicIcon = topic.icon;
                const isActive = selectedTopicFilter === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicFilter(topic.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 scale-[1.02]"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300 active:scale-95"
                    }`}
                  >
                    <TopicIcon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span>{topic.name}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Topic Subtitle Description */}
            {selectedTopicFilter !== "all" && (
              <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-3 text-xs text-indigo-900 font-medium flex items-start gap-2 animate-fade-in">
                <Info className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  {selectedTopicFilter === "oscillation" || selectedTopicFilter === "wave" ? (
                    <span>
                      <strong>Chủ đề lớp 11 ôn thi THPT Quốc Gia:</strong> {selectedTopicFilter === "oscillation" ? REVIEW_TOPICS_DATA.oscillation.overview : REVIEW_TOPICS_DATA.wave.overview}
                    </span>
                  ) : (
                    <span>
                      <strong>Nội dung trọng tâm:</strong> {PHYSICS_TOPICS.find(t => t.id === selectedTopicFilter)?.name} - {
                        selectedTopicFilter === "thermal" ? "Tìm hiểu về cấu trúc chất, các thể, các định luật nhiệt động lực học, nhiệt độ tuyệt đối và phương pháp đo lường các giá trị nhiệt dung." :
                        selectedTopicFilter === "gas" ? "Nghiên cứu mô hình động học chất khí lý tưởng, các đẳng quá trình, phương trình trạng thái Clapeyron-Mendeleev và áp suất chất khí." :
                        selectedTopicFilter === "magnet" ? "Mô tả từ trường, đường sức từ, lực từ tác dụng lên dây dẫn thẳng mang dòng điện, hiện tượng cảm ứng điện từ và la bàn từ trường Trái Đất." :
                        selectedTopicFilter === "ac" ? "Nguyên lý hoạt động của máy phát điện xoay chiều 1 pha, 3 pha và các ứng dụng liên quan." :
                        selectedTopicFilter === "em_wave" ? "Mô hình toán học điện từ trường, đặc trưng lan truyền của sóng điện từ và ứng dụng truyền thông tin liên lạc vô tuyến." :
                        selectedTopicFilter === "nuclear" ? "Tìm hiểu cấu trúc hạt nhân, độ hụt khối, năng lượng liên kết, hiện tượng phóng xạ hạt nhân và lò phản ứng nguyên tử." : ""
                      }
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Chapters and Lessons Region */}
          {(() => {
            // Filter lessons and chapters based on selectedTopicFilter
            const filteredChapters = ACADEMIC_CHAPTERS.map(ch => {
              const filteredLessons = ch.lessons.filter(lesson => {
                const topic = getLessonTopic(lesson.id);
                return selectedTopicFilter === "all" || topic === selectedTopicFilter;
              });
              return { ...ch, lessons: filteredLessons };
            }).filter(ch => ch.lessons.length > 0);

            // If we have matching chapters/lessons, render them
            if (filteredChapters.length > 0) {
              return (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-fade-in">
                  {filteredChapters.map((ch) => (
                    <div
                      key={ch.id}
                      className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-sky-400 hover:shadow-md hover:shadow-sky-100 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Visual Illustration Characteristic of the Physics Chapter */}
                        <div className="mb-4">
                          <ChapterIllustration chapterId={ch.id} />
                        </div>

                        {/* Chapter Header bar styled like the pink header bars in the textbook image */}
                        <div className="bg-gradient-to-r from-pink-50 via-pink-50/20 to-transparent border-l-4 border-pink-500 px-4 py-3 rounded-r-2xl mb-4 flex items-center justify-between">
                          <h3 className="text-sm font-extrabold text-pink-600 uppercase tracking-wide leading-none">
                            {ch.title}
                          </h3>
                          <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                            {ch.lessons.length} bài học
                          </span>
                        </div>

                        {/* Lessons list in chapter */}
                        <div className="space-y-2 mt-3">
                          {ch.lessons.map((lesson) => {
                            const parts = lesson.title.split(":");
                            const lessonNum = parts[0]?.trim() || "";
                            const lessonName = parts.slice(1).join(":").trim() || "";
                            
                            const lessonScore = userScores[lesson.id];
                            const hasPracticed = lessonScore !== undefined;
                            const isCompleted = hasPracticed && lessonScore >= 5.0;
                            const isExcellent = hasPracticed && lessonScore >= 8.5;

                            return (
                              <div
                                key={lesson.id}
                                onClick={() => handleSelectLesson(lesson, ch)}
                                className="no-override-bg highlight-lesson-btn group flex items-center justify-between gap-4 p-3.5 rounded-2xl cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                                  {/* Lesson Number Capsule Tag */}
                                  <div className="highlight-lesson-num-badge text-[11px] font-sans font-extrabold shrink-0 px-2.5 py-1 rounded-xl transition-all duration-300">
                                    {lessonNum}
                                  </div>
                                  <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center flex-wrap gap-2">
                                      <h4 className="highlight-lesson-title text-xs sm:text-sm font-black transition-colors leading-tight tracking-tight">
                                        {lessonName || lesson.title}
                                      </h4>
                                      {hasPracticed && (
                                        <span className={`inline-flex items-center gap-1 text-[9px] font-extrabold px-2 py-0.5 rounded-full border shadow-sm ${
                                          isExcellent
                                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                            : isCompleted
                                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                            : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                                        }`}>
                                          <CheckCircle2 className="h-2.5 w-2.5 shrink-0" />
                                          {isExcellent
                                            ? `Xuất sắc (${lessonScore.toFixed(1)}đ)`
                                            : isCompleted
                                            ? `Hoàn thành (${lessonScore.toFixed(1)}đ)`
                                            : `Chưa đạt (${lessonScore.toFixed(1)}đ)`}
                                        </span>
                                      )}
                                    </div>
                                    <p className="highlight-lesson-desc text-[11px] sm:text-xs line-clamp-1 font-semibold transition-colors">
                                      {lesson.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-pink-400 group-hover:text-pink-600 transition-all self-center shrink-0 translate-x-1 group-hover:translate-x-0 duration-200">
                                  <ChevronRight className="h-4.5 w-4.5" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }

            // If there are no matching lessons (e.g., oscillation, wave)
            // Render a highly informative, premium Review Section
            const reviewData = REVIEW_TOPICS_DATA[selectedTopicFilter];
            if (reviewData) {
              return (
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-8 animate-fade-in">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <GraduationCap className="h-6 w-6 text-indigo-500" />
                      {reviewData.title}
                    </h2>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {reviewData.overview}
                    </p>
                  </div>

                  {/* High-yielding Formulas */}
                  <div>
                    <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <BookMarked className="h-4 w-4" />
                      Công thức ôn thi cốt lõi
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reviewData.formulas.map((item, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
                          <span className="text-[11px] font-extrabold text-slate-500 block">
                            {item.label}
                          </span>
                          <div className="bg-white border border-indigo-50/50 py-2.5 px-3 rounded-xl flex items-center justify-center font-bold text-indigo-900 text-sm shadow-sm">
                            <FormattedMathText text={`$$${item.formula}$$`} />
                          </div>
                          <p className="text-[11px] text-slate-600 leading-normal">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Concepts */}
                  <div>
                    <h3 className="text-xs font-extrabold text-purple-600 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Brain className="h-4 w-4" />
                      Khái niệm & Hiện tượng lý thuyết trọng tâm
                    </h3>
                    <div className="space-y-3">
                      {reviewData.concepts.map((item, idx) => (
                        <div key={idx} className="bg-purple-50/30 border border-purple-100/30 rounded-2xl p-4">
                          <h4 className="text-xs font-black text-purple-950 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-purple-900/80 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Review Mini-Quiz */}
                  <div className="border-t border-slate-100 pt-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-extrabold text-pink-600 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4" />
                        Trắc nghiệm nhanh nhận diện (+10 XP / Câu đúng)
                      </h3>
                      {reviewQuizSubmitted && (
                        <button
                          onClick={() => {
                            setReviewQuizAnswers({});
                            setReviewQuizSubmitted(false);
                          }}
                          className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <RefreshCw className="h-3 w-3" />
                          Làm lại
                        </button>
                      )}
                    </div>

                    <div className="space-y-6">
                      {reviewData.quiz.map((q, qIdx) => {
                        const questionKey = `${selectedTopicFilter}_q_${qIdx}`;
                        const selectedAns = reviewQuizAnswers[questionKey];
                        const isCorrect = selectedAns === q.correctIndex;

                        return (
                          <div key={qIdx} className="border border-slate-155 rounded-2xl p-4.5 space-y-3 bg-white shadow-sm">
                            <span className="text-[10px] font-mono font-bold text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
                              Câu {qIdx + 1}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                              {q.question}
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                              {q.options.map((opt, oIdx) => {
                                const isOptionSelected = selectedAns === oIdx;
                                let optionBg = "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200";
                                
                                if (reviewQuizSubmitted) {
                                  if (oIdx === q.correctIndex) {
                                    optionBg = "bg-emerald-50 text-emerald-900 border-emerald-300 font-bold";
                                  } else if (isOptionSelected) {
                                    optionBg = "bg-rose-50 text-rose-900 border-rose-300";
                                  }
                                } else if (isOptionSelected) {
                                  optionBg = "bg-indigo-50 text-indigo-900 border-indigo-300 font-bold";
                                }

                                return (
                                  <button
                                    key={oIdx}
                                    disabled={reviewQuizSubmitted}
                                    onClick={() => {
                                      setReviewQuizAnswers(prev => ({ ...prev, [questionKey]: oIdx }));
                                    }}
                                    className={`text-left text-xs p-3 rounded-xl border transition-all cursor-pointer ${optionBg}`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {reviewQuizSubmitted && (
                              <div className={`mt-3 p-3 rounded-xl border text-[11px] leading-relaxed ${
                                isCorrect ? "bg-emerald-50/50 border-emerald-100 text-emerald-900" : "bg-rose-50/50 border-rose-100 text-rose-900"
                              }`}>
                                <div className="font-extrabold flex items-center gap-1 mb-1">
                                  {isCorrect ? (
                                    <>
                                      <Check className="h-4 w-4 text-emerald-600" />
                                      <span>Chính xác! (+10 XP)</span>
                                    </>
                                  ) : (
                                    <>
                                      <X className="h-4 w-4 text-rose-600" />
                                      <span>Chưa chính xác!</span>
                                    </>
                                  )}
                                </div>
                                <p className="font-medium text-slate-600">
                                  <strong>Giải thích:</strong> {q.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {!reviewQuizSubmitted && (
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => {
                            // Calculate score, reward XP
                            let correctCount = 0;
                            reviewData.quiz.forEach((q, qIdx) => {
                              const questionKey = `${selectedTopicFilter}_q_${qIdx}`;
                              if (reviewQuizAnswers[questionKey] === q.correctIndex) {
                                correctCount++;
                              }
                            });
                            
                            if (correctCount > 0) {
                              onEarnXP(correctCount * 10);
                            }
                            
                            setReviewQuizSubmitted(true);
                          }}
                          disabled={Object.keys(reviewQuizAnswers).length < reviewData.quiz.length}
                          className="bg-indigo-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-100 cursor-pointer"
                        >
                          Nộp bài & nhận thưởng XP
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return null;
          })()}
        </div>
      ) : (
        // ACTIVE LESSON STUDY WORKSPACE
        <div className="space-y-5 animate-fade-in">
          {isFocusMode ? (
            /* Focus Mode Slim Elegant Sticky Header */
            <div className="flex items-center justify-between bg-slate-900 border-2 border-slate-950 p-3.5 px-5 rounded-2xl shadow-lg sticky top-2 z-50 animate-fade-in text-white">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <BookOpen className="h-4 w-4 text-indigo-400 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-black">Chế độ Tập trung</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-white leading-tight truncate">
                    <span className="text-pink-400 mr-1.5 text-[10px] uppercase font-mono">{selectedLesson.id.toUpperCase()}</span>
                    {selectedLesson.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Compact lesson tabs button group inside Focus Mode */}
                <div className="hidden sm:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {[
                    { id: "pdf", label: "Lý thuyết" },
                    { id: "simulation", label: "Mô phỏng" },
                    { id: "quiz", label: "Luyện tập" }
                  ].map((tab) => {
                    const isActive = activeLessonTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveLessonTab(tab.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black cursor-pointer transition-all ${
                          isActive 
                            ? "bg-indigo-600 text-white shadow-sm" 
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setIsFocusMode(false)}
                  title="Thoát chế độ tập trung quay lại giao diện bình thường"
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-amber-400 text-slate-950 hover:bg-amber-300 border-2 border-slate-950 rounded-xl px-3 py-1.5 font-black transition-all cursor-pointer shadow-[2px_2px_0px_#000]"
                >
                  <Eye className="h-3.5 w-3.5 stroke-[3px]" />
                  <span>Bình thường</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Lesson Title horizontally positioned above navigation buttons, placed on the top row */}
              <div className={`relative p-5 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b] ${
                isL1 ? "bg-indigo-50/80 text-slate-950" : "bg-slate-900/60 text-white"
              }`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="pr-[90px] xs:pr-[100px] sm:pr-[120px] md:pr-[280px]">
                    <h1 className="text-sm sm:text-base font-black leading-tight tracking-tight uppercase flex flex-wrap items-center gap-2">
                      <span className="bg-pink-500 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-md border border-slate-900 shadow-[1px_1px_0px_#000]">
                        {selectedLesson.id.toUpperCase()}
                      </span>
                      <span className={`text-[9px] sm:text-[10px] font-extrabold uppercase font-mono border rounded-md px-2 py-0.5 shrink-0 ${
                        isL1 
                          ? "text-slate-600 bg-slate-100 border-slate-300" 
                          : "text-slate-300 bg-slate-800/80 border-slate-700"
                      }`}>
                        {selectedChapter?.title}
                      </span>
                      <span>{selectedLesson.title}</span>
                    </h1>
                    <p className={`text-[11px] font-extrabold mt-1.5 leading-relaxed ${
                      isL1 ? "text-slate-700" : "text-slate-300"
                    }`}>
                      {selectedLesson.description}
                    </p>
                  </div>

                  {/* Back to curriculum button & Focus Mode switch */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={() => setIsFocusMode(true)}
                      title="Kích hoạt Chế độ Tập trung để đọc lý thuyết không bị phân tâm"
                      className="flex items-center gap-1 text-[10px] uppercase tracking-wider bg-indigo-600 text-white hover:bg-indigo-500 border-2 border-slate-950 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 font-black transition-all cursor-pointer shadow-[3px_3px_0px_0px_#0f172a] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#0f172a]"
                    >
                      <EyeOff className="h-3.5 w-3.5" />
                      <span>Tập trung</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLesson(null);
                        setSelectedChapter(null);
                        setIsFocusMode(false);
                      }}
                      className="flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-wider bg-amber-400 text-slate-950 hover:bg-amber-300 border-2 border-slate-950 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 font-black transition-all cursor-pointer shadow-[3px_3px_0px_0px_#0f172a] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#0f172a]"
                    >
                      <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[3px]" />
                      <span className="hidden md:inline">Quay lại</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* NEW PROMINENT HORIZONTAL NAVIGATION BAR FOR ALL LESSONS */}
              {selectedLesson?.id && (
                <div className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 p-4 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b] flex flex-col items-center justify-center text-center gap-4 z-30 relative animate-fade-in">
                  <div className="flex flex-col items-center gap-1.5 w-full">
                    <span className="text-[10px] font-black text-slate-900/80 uppercase tracking-widest font-mono">ĐANG HỌC BÀI</span>
                    <span className="text-sm sm:text-base md:text-lg font-black text-slate-950 uppercase tracking-tight leading-snug">
                      {selectedLesson?.title}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3 w-full">
                    {[
                      {
                        id: "pdf",
                        label: "Tài liệu lý thuyết",
                        icon: FileText,
                        title: "Tài liệu lý thuyết",
                        activeClass: "bg-indigo-600 text-white border-indigo-950 shadow-[3px_3px_0px_#1e1b4b] hover:bg-indigo-700 scale-[1.02]"
                      },
                      {
                        id: "simulation",
                        label: "Mô phỏng tương tác",
                        icon: FlaskConical,
                        title: "Mô phỏng tương tác",
                        activeClass: "bg-teal-600 text-white border-teal-950 shadow-[3px_3px_0px_#042f2e] hover:bg-teal-700 scale-[1.02]"
                      },
                      {
                        id: "quiz",
                        label: "Luyện tập THPT",
                        icon: HelpCircle,
                        title: "Luyện tập THPT",
                        activeClass: "bg-rose-600 text-white border-rose-950 shadow-[3px_3px_0px_#4c0519] hover:bg-rose-700 scale-[1.02]"
                      }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeLessonTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          title={tab.title}
                          onClick={() => setActiveLessonTab(tab.id as any)}
                          className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2.5 border-2 whitespace-nowrap shrink-0 ${
                            isActive
                              ? tab.activeClass
                              : "bg-white text-slate-900 border-slate-900 hover:bg-slate-50 hover:border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] active:translate-y-[1px]"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar study tabs navigation */}
            {activeLessonTab === "quiz" ? (
              <div className="lg:col-span-4 flex flex-col gap-4">
                {/* Answer Sheet rendered in the Left Sidebar Column */}
                <div className="hidden lg:block lg:sticky lg:top-6 z-20 max-h-[calc(100vh-140px)] overflow-y-auto pr-1 custom-scrollbar">
                  {renderAnswerSheetCard()}
                </div>
              </div>
            ) : null}

            {/* Content view area */}
            <div className={`${
              activeLessonTab === "quiz" ? "lg:col-span-8" : "lg:col-span-12"
            } rounded-3xl p-6 min-h-[500px] flex flex-col justify-between ${
              isL1
                ? "bg-white border-2 border-slate-200 shadow-sm text-slate-900"
                : "bg-slate-900/60 border border-slate-800 text-slate-100"
            }`}>
              
              {/* Theory Focus Mode Banner Suggestion */}
              {activeLessonTab === "pdf" && !isFocusMode && (
                <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-slate-950 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0">
                      <Sparkles className="h-5 w-5 text-indigo-600 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-indigo-950 flex items-center gap-2">
                        <span>Đề xuất: Chế độ Tập trung</span>
                        <span className="bg-indigo-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase font-mono tracking-normal">MỚI</span>
                      </h4>
                      <p className="text-[11px] font-extrabold text-slate-700 mt-0.5 leading-normal">
                        Kích hoạt Chế độ Tập trung để ẩn toàn bộ thanh điều hướng xung quanh, tối đa hóa không gian và tập trung đọc lý thuyết hiệu quả nhất.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsFocusMode(true)}
                    className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 border border-indigo-950 shadow-[2px_2px_0px_#000]"
                  >
                    Bật ngay
                  </button>
                </div>
              )}
              
              {/* TAB: INTERACTIVE PHYSICS SIMULATION */}
              {activeLessonTab === "simulation" && selectedLesson.id === "l1" && (
                <div className="space-y-6 text-slate-900 animate-fade-in relative">
                  {/* Subtle grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  <div className="bg-gradient-to-r from-sky-50 to-sky-100/50 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 flex justify-between items-center relative overflow-hidden shadow-sm z-10">
                    <div>
                      <h3 className="text-md font-black text-slate-950 tracking-wide uppercase flex items-center gap-2">
                        <FlaskConical className="h-5 w-5 text-cyan-600 animate-pulse" />
                        MÔ PHỎNG TƯƠNG TÁC BÀI 1: CẤU TRÚC VẬT CHẤT
                      </h3>
                      <p className="text-[10px] text-cyan-800 font-mono mt-1 font-extrabold uppercase">Mô phỏng động học phân tử chất rắn, chất lỏng và chất khí trực quan theo chuẩn GDPT 2018</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-b from-slate-50 to-slate-100/35 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 shadow-sm relative z-10">
                    <MatterStructureSimulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l2" && (
                <div className="space-y-6 text-slate-200 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-md font-extrabold text-slate-900 flex items-center gap-2">
                      <FlaskConical className="h-5 w-5 text-amber-500 animate-pulse" />
                      MÔ PHỎNG TƯƠNG TÁC BÀI 2: BIẾN ĐỔI NỘI NĂNG & NGUYÊN LÍ I
                    </h3>
                    <p className="text-[10px] text-cyan-600 font-mono mt-1 font-bold">
                      Thực nghiệm ảo khảo sát hai cách biến đổi nội năng (Thực hiện công và Truyền nhiệt) và bảo toàn năng lượng
                    </p>
                  </div>
                  
                  <div className="bg-slate-50/50 border-2 border-slate-200 border-b-[5px] border-b-slate-300 rounded-3xl p-5 shadow-sm">
                    <InternalEnergySimulation />
                  </div>

                  {/* Detailed explanation board of thermodynamic processes in the simulation */}
                  <div className="bg-gradient-to-b from-indigo-50 to-indigo-100/30 border-2 border-indigo-200 border-b-[5px] border-b-indigo-300/80 rounded-2xl p-5 space-y-3.5 relative z-10 no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                    <div className="flex items-center gap-2 border-b border-indigo-200 pb-2">
                      <FlaskConical className="h-5 w-5 text-indigo-700" />
                      <span className="text-xs font-black text-indigo-800 uppercase tracking-wider">MÔ TẢ QUÁ TRÌNH BIẾN ĐỔI NỘI NĂNG & NGUYÊN LÍ I TRONG MÔ PHỎNG</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-indigo-950 font-medium leading-relaxed">
                      <div className="space-y-2.5">
                        <p className="text-indigo-900 font-bold uppercase tracking-wider text-[11px] border-b border-indigo-100 pb-1 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          1. Hai cách biến đổi nội năng (U)
                        </p>
                        <p>
                          Mô phỏng trực quan hóa sâu sắc hai cách làm biến đổi nội năng của khối khí lí tưởng trong xilanh:
                        </p>
                        <ul className="list-disc list-inside pl-1 space-y-1.5">
                          <li>
                            <strong>Thực hiện công (A):</strong> Khi kéo thanh trượt thể tích để nén khí nhanh (thể tích V giảm, công nhận được A &gt; 0), ngoại lực thực hiện công cơ học lên hệ khí $\rightarrow$ nội năng hệ tăng lên, làm nhiệt độ (T) vọt lên. Ngược lại, khi khí tự dãn nở đẩy pít-tông (thể tích V tăng, công sinh ra A &lt; 0), hệ khí sinh công dương chống lại ngoại lực $\rightarrow$ một phần nội năng biến thành cơ năng làm khí lạnh đi nhanh chóng.
                          </li>
                          <li>
                            <strong>Truyền nhiệt (Q):</strong> Khi bật đèn cồn ảo để đun nóng (nhiệt lượng nhận Q &gt; 0), nhiệt lượng truyền trực tiếp làm tăng động năng phân tử $\rightarrow$ tăng nội năng và nhiệt độ. Khi áp dụng nguồn lạnh (nhiệt lượng tỏa Q &lt; 0), nhiệt lượng tỏa ra ngoài làm giảm động năng phân tử $\rightarrow$ hạ thấp nội năng.
                          </li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2.5">
                        <p className="text-indigo-900 font-bold uppercase tracking-wider text-[11px] border-b border-indigo-100 pb-1 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          2. Nghiệm lại Nguyên lí 1 Nhiệt động lực học
                        </p>
                        <p>
                          Hệ thức toán học liên kết hai con đường chuyển hóa này là <strong className="text-indigo-800 text-sm">ΔU = A + Q</strong> được nghiệm lại chuẩn xác qua các tiến trình mẫu:
                        </p>
                        <ul className="list-disc list-inside pl-1 space-y-1.5">
                          <li>
                            <strong>Đẳng tích (V khóa, A = 0):</strong> Chỉ đun nóng bằng đèn cồn (Q &gt; 0). Toàn bộ nhiệt lượng truyền vào chuyển hóa hoàn toàn thành độ tăng nội năng làm nhiệt độ và áp suất tăng cực đại (ΔU = Q).
                          </li>
                          <li>
                            <strong>Đoạn nhiệt (Q = 0):</strong> Không có truyền nhiệt qua thành xilanh. Quá trình nén khí cực nhanh làm tăng nội năng hoàn toàn bằng công nhận được (ΔU = A &gt; 0). Quá trình giãn nở cực nhanh làm giảm nội năng hoàn toàn do sinh công ngoại lực (ΔU = A &lt; 0).
                          </li>
                          <li>
                            <em>Hãy nhấn các nút tiến trình mẫu bên cột trái để cảm nhận mối liên hệ động năng phân tử thông qua chuyển động va chạm của hạt khí thực tế!</em>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l3" && (
                <div className="space-y-6 text-slate-900 animate-fade-in relative">
                  {/* Subtle grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  <div className="bg-gradient-to-r from-sky-50 to-sky-100/50 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 flex justify-between items-center relative overflow-hidden shadow-sm z-10">
                    <div>
                      <h3 className="text-md font-black text-slate-950 tracking-wide uppercase flex items-center gap-2">
                        <FlaskConical className="h-5 w-5 text-cyan-600 animate-pulse" />
                        MÔ PHỎNG TƯƠNG TÁC BÀI 3: NHIỆT ĐỘ, THANG NHIỆT ĐỘ & NHIỆT KẾ
                      </h3>
                      <p className="text-[10px] text-cyan-800 font-mono mt-1 font-extrabold uppercase">
                        Khảo sát mối quan hệ giữa các thang đo nhiệt độ (Celsius, Kelvin, Fahrenheit) và bằng chứng chuyển động nhiệt vi mô
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-b from-slate-50 to-slate-100/35 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 shadow-sm relative z-10">
                    <ThermometerSimulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l4" && (
                <div className="space-y-6 text-slate-900 animate-fade-in relative">
                  {/* Subtle grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 flex justify-between items-center relative overflow-hidden shadow-sm z-10">
                    <div>
                      <h3 className="text-md font-black text-slate-950 tracking-wide uppercase flex items-center gap-2">
                        <FlaskConical className="h-5 w-5 text-amber-600 animate-pulse" />
                        MÔ PHỎNG TƯƠNG TÁC BÀI 4: KHẢO SÁT NHIỆT DUNG RIÊNG CÁC CHẤT
                      </h3>
                      <p className="text-[10px] text-amber-900 font-mono mt-1 font-extrabold uppercase">
                        Thực nghiệm ảo đo đạc lượng nhiệt Q, khối lượng m và sự thay đổi nhiệt độ ΔT để đo đạc tính toán nhiệt dung riêng c các chất chuẩn xác
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-b from-slate-50 to-slate-100/35 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 shadow-sm relative z-10">
                    <SpecificHeatSimulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l5" && (
                <div className="space-y-6 text-slate-900 animate-fade-in relative">
                  {/* Subtle grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 flex justify-between items-center relative overflow-hidden shadow-sm z-10">
                    <div>
                      <h3 className="text-md font-black text-slate-950 tracking-wide uppercase flex items-center gap-2">
                        <FlaskConical className="h-5 w-5 text-emerald-600 animate-pulse" />
                        MÔ PHỎNG TƯƠNG TÁC BÀI 5: KHẢO SÁT NHIỆT NÓNG CHẢY RIÊNG
                      </h3>
                      <p className="text-[10px] text-emerald-900 font-mono mt-1 font-extrabold uppercase">
                        Thực nghiệm ảo khảo sát sự nóng chảy của các chất rắn kết tinh, quá trình thu nhiệt chuyển thể ổn định và đo lường nhiệt nóng chảy riêng λ
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-b from-slate-50 to-slate-100/35 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 shadow-sm relative z-10">
                    <LatentHeatSimulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l6" && (
                <div className="space-y-6 text-slate-900 animate-fade-in relative">
                  {/* Subtle grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 flex justify-between items-center relative overflow-hidden shadow-sm z-10">
                    <div>
                      <h3 className="text-md font-black text-slate-950 tracking-wide uppercase flex items-center gap-2">
                        <FlaskConical className="h-5 w-5 text-emerald-600 animate-pulse" />
                        MÔ PHỎNG TƯƠNG TÁC BÀI 6: KHẢO SÁT NHIỆT HÓA HƠI RIÊNG
                      </h3>
                      <p className="text-[10px] text-emerald-900 font-mono mt-1 font-extrabold uppercase">
                        Thực nghiệm ảo khảo sát sự hóa hơi của các chất lỏng ở nhiệt độ sôi, đo lường năng lượng cấp Q và xác định nhiệt hóa hơi riêng L
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-b from-slate-50 to-slate-100/35 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 shadow-sm relative z-10">
                    <VaporizationSimulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l7" && (
                <div className="space-y-6 text-slate-900 animate-fade-in relative">
                  {/* Subtle grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 flex justify-between items-center relative overflow-hidden shadow-sm z-10">
                    <div>
                      <h3 className="text-md font-black text-slate-950 tracking-wide uppercase flex items-center gap-2">
                        <FlaskConical className="h-5 w-5 text-indigo-600 animate-pulse" />
                        MÔ PHỎNG THỰC NGHIỆM VẬT LÍ NHIỆT (BÀI 7)
                      </h3>
                      <p className="text-[10px] text-indigo-900 font-mono mt-1 font-extrabold uppercase">
                        Thực nghiệm ảo khảo sát công suất đun, hao phí nhiệt lượng, quá trình tăng nhiệt độ và hóa hơi để giải quyết các bài tập thực tế
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-b from-slate-50 to-slate-100/35 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 shadow-sm relative z-10">
                    <Lesson7Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l8" && (
                <div className="space-y-6 text-slate-900 animate-fade-in relative">
                  {/* Subtle grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  <div className="bg-gradient-to-r from-cyan-50 to-cyan-100/50 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 flex justify-between items-center relative overflow-hidden shadow-sm z-10">
                    <div>
                      <h3 className="text-md font-black text-slate-950 tracking-wide uppercase flex items-center gap-2">
                        <FlaskConical className="h-5 w-5 text-cyan-600 animate-pulse" />
                        MÔ PHỎNG ĐỘNG HỌC PHÂN TỬ CHẤT KHÍ (BÀI 8)
                      </h3>
                      <p className="text-[10px] text-cyan-900 font-mono mt-1 font-extrabold uppercase">
                        Khảo sát chuyển động hỗn loạn Brown, sự va chạm vi mô tạo nên áp suất chất khí vĩ mô và sự liên đới định luật khí lí tưởng
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-b from-slate-50 to-slate-100/35 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl p-5 shadow-sm relative z-10">
                    <Lesson8Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l9" && (
                <div className="space-y-6 text-slate-900 animate-fade-in relative">
                  {/* Subtle grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,148,136,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,148,136,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  <div className="bg-gradient-to-r from-teal-50 to-teal-100/50 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 flex justify-between items-center relative overflow-hidden shadow-sm z-10">
                    <div>
                      <h3 className="text-md font-black text-slate-950 tracking-wide uppercase flex items-center gap-2">
                        <FlaskConical className="h-5 w-5 text-teal-600 animate-pulse" />
                        MÔ PHỎNG ĐỊNH LUẬT BOYLE (BÀI 9)
                      </h3>
                      <p className="text-[10px] text-teal-900 font-mono mt-1 font-extrabold uppercase">
                        Khảo sát mối quan hệ giữa áp suất và thể tích khí ở nhiệt độ bảo ôn không đổi, ghi chép số liệu và lập đồ thị thời gian thực
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-b from-slate-50 to-slate-100/35 border-2 border-slate-200 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm relative z-10">
                    <Lesson9Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l10" && (
                <div className="space-y-6 text-slate-200 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-md font-extrabold text-slate-900 flex items-center gap-2">
                      <FlaskConical className="h-5 w-5 text-indigo-500 animate-pulse" />
                      MÔ PHỎNG ĐỊNH LUẬT CHARLES (BÀI 10)
                    </h3>
                    <p className="text-[10px] text-indigo-600 font-mono mt-1 font-bold">
                      Khảo sát mối quan hệ giữa thể tích và nhiệt độ tuyệt đối của một lượng khí xác định ở áp suất không đổi (quá trình đẳng áp)
                    </p>
                  </div>
                  
                  <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4 animate-fade-in">
                    <Lesson10Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l11" && (
                <div className="space-y-6 text-slate-200 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-md font-extrabold text-slate-900 flex items-center gap-2">
                      <FlaskConical className="h-5 w-5 text-teal-500 animate-pulse" />
                      MÔ PHỎNG PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG (BÀI 11)
                    </h3>
                    <p className="text-[10px] text-teal-600 font-mono mt-1 font-bold">
                      Khảo sát quá trình biến đổi trạng thái của khí lí tưởng, ghi nhận số liệu và vẽ đồ thị chuẩn thực tế trên các hệ trục tọa độ p-V và p-1/V
                    </p>
                  </div>
                  
                  <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4 animate-fade-in font-sans text-slate-900">
                    <Lesson11Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l12" && (
                <div className="space-y-6 text-slate-200 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-md font-extrabold text-slate-900 flex items-center gap-2">
                      <FlaskConical className="h-5 w-5 text-blue-500 animate-pulse" />
                      MÔ PHỎNG ÁP SUẤT KHÍ & ĐỘNG NĂNG PHÂN TỬ (BÀI 12)
                    </h3>
                    <p className="text-[10px] text-blue-600 font-mono mt-1 font-bold">
                      Khảo sát chuyển động hỗn loạn của các phân tử khí va chạm thành bình sinh ra áp suất, đo lường hằng số Boltzmann và tốc độ căn quân phương thời gian thực
                    </p>
                  </div>
                  
                  <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4 animate-fade-in font-sans text-slate-900">
                    <Lesson12Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l13" && (
                <div className="space-y-6 text-slate-200 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-md font-extrabold text-slate-900 flex items-center gap-2">
                      <FlaskConical className="h-5 w-5 text-indigo-500 animate-pulse" />
                      MÔ PHỎNG CÁC QUÁ TRÌNH BIẾN ĐỔI TRẠNG THÁI KHÍ & RÒ RỈ KHÍ (BÀI 13)
                    </h3>
                    <p className="text-[10px] text-indigo-600 font-mono mt-1 font-bold">
                      Mô tả thực tế quá trình thay đổi các thông số trạng thái trong bình kín (đẳng nhiệt, đẳng tích, đẳng áp, rò rỉ khí), quan sát các số liệu theo thời gian thực và vẽ đồ thị chu trình
                    </p>
                  </div>
                  
                  <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4 animate-fade-in font-sans text-slate-900">
                    <Lesson13Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l14" && (
                <div className="space-y-6 text-slate-200 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-md font-extrabold text-slate-900 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-indigo-500 animate-pulse" />
                      MÔ PHỎNG TƯƠNG TÁC TỪ & ĐƯỜNG SỨC TỪ (BÀI 14)
                    </h3>
                    <p className="text-[10px] text-indigo-600 font-mono mt-1 font-bold">
                      Khảo sát tương tác giữa nam châm với nam châm, nam châm với dòng điện, dòng điện với dòng điện mang biểu diễn đường sức từ sinh động và chỉnh định tham số trực quan
                    </p>
                  </div>
                  
                  <div className="animate-fade-in text-slate-900">
                    <Lesson14Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l15" && (
                <div className="space-y-6 text-slate-200 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-md font-extrabold text-slate-900 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-cyan-500 animate-pulse" />
                      MÔ PHỎNG TƯƠNG TÁC LỰC TỪ & QUY TẮC BÀN TAY TRÁI (BÀI 15)
                    </h3>
                    <p className="text-[10px] text-cyan-600 font-mono mt-1 font-bold">
                      Thực nghiệm ảo đo đạc lực từ, cảm ứng từ và luyện tập quy tắc bàn tay trái xác định chiều lực từ trực quan sinh động
                    </p>
                  </div>
                  
                  <div className="animate-fade-in text-slate-900">
                    <Lesson15Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l16" && (
                <div className="space-y-6 text-slate-200 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-md font-extrabold text-slate-900 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-cyan-500 animate-pulse" />
                      MÔ PHỎNG TỪ THÔNG & HIỆN TƯỢNG CẢM ỨNG ĐIỆN TỪ (BÀI 16)
                    </h3>
                    <p className="text-[10px] text-cyan-600 font-mono mt-1 font-bold">
                      Khảo sát hiện tượng cảm ứng điện từ bằng thí nghiệm thả rơi tự do nam châm qua ống dây dẫn và đo đạc suất điện động thời gian thực sinh động
                    </p>
                  </div>
                  
                  <div className="animate-fade-in text-slate-200">
                    <Lesson16Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l17" && (
                <div className="space-y-6 text-slate-200 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-md font-extrabold text-slate-900 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-cyan-500 animate-pulse" />
                      MÔ PHỎNG MÁY PHÁT ĐIỆN XOAY CHIỀU (BÀI 17)
                    </h3>
                    <p className="text-[10px] text-cyan-600 font-mono mt-1 font-bold">
                      Khảo sát cấu tạo và hoạt động của máy phát điện xoay chiều một pha với biểu diễn quay của khung dây và đồ thị suất điện động động theo thời gian thực
                    </p>
                  </div>
                  
                  <div className="animate-fade-in text-slate-200">
                    <Lesson17Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l18" && (
                <div className="space-y-6 text-slate-200 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-md font-extrabold text-slate-900 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-purple-500 animate-pulse" />
                      MÔ PHỎNG ỨNG DỤNG CẢM ỨNG ĐIỆN TỪ (BÀI 18)
                    </h3>
                    <p className="text-[10px] text-purple-600 font-mono mt-1 font-bold">
                      Khảo sát tương tác từ cơ vật lý của máy biến áp (Lõi silicon mỏng vs lõi sắt đặc tỏa nhiệt Foucault) và Đàn ghi ta điện (Gảy dây thép sắt từ rung động sinh cảm ứng)
                    </p>
                  </div>
                  
                  <div className="animate-fade-in text-slate-200">
                    <Lesson18Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l19" && (
                <div className="space-y-6 text-slate-200 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-md font-extrabold text-slate-900 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-cyan-500 animate-pulse" />
                      MÔ PHỎNG ĐIỆN TỪ TRƯỜNG & SÓNG ĐIỆN TỪ ĐỘNG (BÀI 19)
                    </h3>
                    <p className="text-[10px] text-cyan-600 font-mono mt-1 font-bold">
                      Khảo sát tính đồng pha, vuông góc đôi một của cường độ điện trường E và từ trường B, cùng thực nghiệm mối liên hệ cảm ứng Maxwell sinh dòng điện xoáy.
                    </p>
                  </div>
                  
                  <div className="animate-fade-in text-slate-200">
                    <Lesson19Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l20" && (
                <div className="space-y-6 text-slate-900 animate-fade-in">
                  <div className="border-b border-slate-250 pb-3">
                    <h3 className="text-md font-extrabold text-slate-950 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-indigo-600 animate-pulse" />
                      MÔ PHỎNG TƯƠNG TÁC BÀI 20: TỪ TRƯỜNG & LỰC AMPE BẰNG CÂN ĐIỆN TỬ
                    </h3>
                    <p className="text-[10px] text-indigo-700 font-mono mt-1 font-extrabold uppercase">
                      Khảo sát định lượng mối liên hệ giữa lực Ampe với cường độ dòng điện I, chiều dài tác dụng L và cảm ứng từ B.
                    </p>
                  </div>
                  
                  <div className="animate-fade-in">
                    <Lesson20Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l21" && (
                <div className="space-y-6 text-slate-900 animate-fade-in">
                  <div className="border-b border-slate-250 pb-3">
                    <h3 className="text-md font-extrabold text-slate-950 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-indigo-600 animate-pulse" />
                      MÔ PHỎNG TƯƠNG TÁC BÀI 21: CẤU TẠO HẠT NHÂN & ĐỒ THỊ ĐỘ BỀN VỮNG
                    </h3>
                    <p className="text-[10px] text-indigo-700 font-mono mt-1 font-extrabold uppercase">
                      Khảo sát cấu tạo hạt nhân, lực liên kết mạnh, lực đẩy Coulomb và độ ổn định hạt nhân.
                    </p>
                  </div>
                  
                  <div className="animate-fade-in">
                    <Lesson21Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l22" && (
                <div className="space-y-6 text-slate-900 animate-fade-in">
                  <div className="border-b border-slate-250 pb-3">
                    <h3 className="text-md font-extrabold text-slate-950 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-indigo-600 animate-pulse" />
                      MÔ PHỎNG TƯƠNG TÁC BÀI 22: PHÂN HẠCH, PHẢN ỨNG DÂY CHUYỀN & NHIỆT HẠCH
                    </h3>
                    <p className="text-[10px] text-indigo-700 font-mono mt-1 font-extrabold uppercase">
                      Khảo sát cơ chế phân hạch Urani-235, phản ứng dây chuyền tự duy trì và phản ứng tổng hợp nhiệt hạch tỏa năng lượng lớn.
                    </p>
                  </div>
                  
                  <div className="animate-fade-in">
                    <Lesson22Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l23" && (
                <div className="space-y-6 text-slate-900 animate-fade-in">
                  <div className="border-b border-slate-250 pb-3">
                    <h3 className="text-md font-extrabold text-slate-950 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-indigo-600 animate-pulse" />
                      MÔ PHỎNG TƯƠNG TÁC BÀI 23: HIỆN TƯỢNG PHÓNG XẠ
                    </h3>
                    <p className="text-[10px] text-indigo-700 font-mono mt-1 font-extrabold uppercase">
                      Khảo sát chu kỳ bán rã, độ phóng xạ và các tia phóng xạ alpha, beta, gamma.
                    </p>
                  </div>
                  
                  <div className="animate-fade-in">
                    <Lesson23Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l24" && (
                <div className="space-y-6 text-slate-900 animate-fade-in">
                  <div className="border-b border-slate-250 pb-3">
                    <h3 className="text-md font-extrabold text-slate-950 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-indigo-600 animate-pulse" />
                      MÔ PHỎNG TƯƠNG TÁC BÀI 24: ỨNG DỤNG VÀ TÁC HẠI CỦA PHÓNG XẠ
                    </h3>
                    <p className="text-[10px] text-indigo-700 font-mono mt-1 font-extrabold uppercase">
                      Tìm hiểu liều lượng bức xạ hấp thụ, an toàn bức xạ và ứng dụng đồng vị trong y học.
                    </p>
                  </div>
                  
                  <div className="animate-fade-in">
                    <Lesson24Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "simulation" && selectedLesson.id === "l25" && (
                <div className="space-y-6 text-slate-900 animate-fade-in">
                  <div className="border-b border-slate-250 pb-3">
                    <h3 className="text-md font-extrabold text-slate-950 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-indigo-600 animate-pulse" />
                      MÔ PHỎNG TƯƠNG TÁC BÀI 25: CHẨN ĐOÁN & ĐIỀU TRỊ BẰNG Y HỌC HẠT NHÂN
                    </h3>
                    <p className="text-[10px] text-indigo-700 font-mono mt-1 font-extrabold uppercase">
                      Mô phỏng chụp ảnh xạ hình SPECT/PET và điều trị ung thư bằng dao gamma.
                    </p>
                  </div>
                  
                  <div className="animate-fade-in">
                    <Lesson25Simulation />
                  </div>
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l1" && (
                <div className="space-y-6 text-slate-900 animate-fade-in relative">
                  {/* Styled background container with subtle grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  <div className="absolute top-10 right-10 w-96 h-96 bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />
                  
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100/55 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 flex justify-between items-center relative overflow-hidden shadow-sm z-10">
                    <div>
                      <h3 className="text-md font-black text-slate-950 tracking-wide uppercase">BÀI 1: CẤU TRÚC CỦA CHẤT. SỰ CHUYỂN THỂ</h3>
                      <p className="text-[10px] text-cyan-800 font-mono mt-1 font-extrabold">Sách giáo khoa Vật lí 12 - Chương trình GDPT mới 2018</p>
                    </div>
                  </div>

                  {/* Section I */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-cyan-900 pl-2.5 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-2.5 h-5 bg-gradient-to-b from-cyan-400 to-cyan-500 rounded-md"></span>
                      I. MÔ HÌNH ĐỘNG HỌC PHÂN TỬ VỀ CẤU TẠO CHẤT
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-950 font-bold">
                      Mô hình động học phân tử về cấu tạo chất được xây dựng trên các nội dung giả thuyết nền tảng sau:
                    </p>

                    <div className="bg-gradient-to-b from-cyan-50 to-cyan-100/40 border-2 border-cyan-200 border-b-[6px] border-b-cyan-300 rounded-3xl p-5 shadow-sm hover:translate-y-[1px] hover:border-b-[5px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                      <h5 className="text-xs font-black text-cyan-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-pulse" />
                        Ba giả thuyết nền tảng
                      </h5>
                      <ol className="list-decimal list-inside text-xs space-y-3 pl-1 text-slate-900 font-extrabold">
                        <li className="leading-relaxed">
                          <strong className="text-cyan-950 font-black">Cấu tạo phân tử:</strong> Các chất được cấu tạo từ các hạt riêng biệt gọi là phân tử. Thuật ngữ phân tử ở đây được dùng để chỉ chung các hạt cấu tạo nên chất như: nguyên tử, phân tử, ion.
                        </li>
                        <li className="leading-relaxed">
                          <strong className="text-cyan-950 font-black">Chuyển động không ngừng:</strong> Các phân tử chuyển động hỗn loạn không ngừng. Nhiệt độ của vật càng cao thì tốc độ trung bình của các phân tử cấu tạo nên vật càng lớn.
                        </li>
                        <li className="leading-relaxed">
                          <strong className="text-cyan-950 font-black">Tương tác phân tử:</strong> Giữa các phân tử đồng thời có lực hút và lực đẩy gọi chung là lực liên kết phân tử.
                        </li>
                      </ol>
                    </div>

                    <div className="bg-gradient-to-b from-amber-50 to-amber-100/40 border-2 border-amber-200 border-b-[6px] border-b-amber-300 rounded-3xl p-5 shadow-sm hover:translate-y-[1px] hover:border-b-[5px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer space-y-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                        <span className="text-[10px] uppercase font-mono font-black text-amber-900 tracking-wider">BẰNG CHỨNG THỰC NGHIỆM: THÍ NGHIỆM BROWN (1827)</span>
                      </div>
                      
                      <p className="text-xs leading-relaxed text-slate-950 font-extrabold">
                        Năm 1827, nhà thực vật học Robert Brown khi quan sát các hạt phấn hoa rất nhỏ trong nước dưới kính hiển vi đã phát hiện chúng chuyển động hỗn loạn không ngừng (Hình 1.1 và Hình 1.2).
                        Nguyên nhân là do các phân tử nước xung quanh chuyển động nhiệt va chạm không đồng đều từ mọi hướng vào hạt phấn hoa.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Fig 1.1: Interactive Brownian Motion */}
                        <div className="bg-gradient-to-b from-slate-50 to-slate-100/80 border-2 border-slate-250 border-b-[5px] border-b-slate-350 rounded-2xl p-4 flex flex-col items-center shadow-sm">
                          <span className="text-[9px] font-mono font-black text-slate-700 mb-2">HÌNH 1.1. CHUYỂN ĐỘNG CỦA PHÂN TỬ NƯỚC & PHẤN HOA</span>
                          
                          <div className="relative w-full h-48 bg-slate-950 rounded-xl overflow-hidden border-2 border-slate-300">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:12px_12px]" />
                            {/* Pollen grains */}
                            <div
                              onClick={() => setIsSimulatingBrownian(!isSimulatingBrownian)}
                              className="absolute w-8 h-8 rounded-full bg-gradient-to-b from-amber-400 to-amber-500 border-2 border-amber-300 flex items-center justify-center text-[8px] font-black text-slate-950 cursor-pointer shadow-md transition-all hover:scale-105 select-none z-10"
                              style={{ left: `${pollenPosition.x - 16}px`, top: `${pollenPosition.y - 16}px` }}
                            >
                              Phấn hoa
                            </div>
                            {/* Simulated surrounding fast-moving water molecules */}
                            {[
                              { x: 50, y: 40, dx: 3, dy: -2 },
                              { x: 120, y: 70, dx: -2, dy: 4 },
                              { x: 280, y: 50, dx: 4, dy: 1 },
                              { x: 90, y: 180, dx: -3, dy: -3 },
                              { x: 320, y: 160, dx: 2, dy: -4 },
                              { x: 210, y: 60, dx: 1, dy: 3 }
                            ].map((w, idx) => (
                              <div
                                key={idx}
                                className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-70"
                                style={{ left: `${w.x}px`, top: `${w.y}px` }}
                              />
                            ))}
                            {/* Static representations for realism */}
                            {[15, 45, 80, 115, 140, 175, 215, 255, 305, 340, 365].map((x, idx) => (
                              <div
                                key={idx}
                                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 opacity-60"
                                style={{ left: `${x}px`, top: `${(x * 3 + idx * 20) % 180 + 10}px` }}
                              />
                            ))}
                          </div>
                          
                          <button
                            onClick={() => setIsSimulatingBrownian(!isSimulatingBrownian)}
                            className="mt-3 px-3.5 py-2 bg-gradient-to-b from-amber-450 to-amber-550 border-2 border-amber-600 border-b-[4px] border-b-amber-700 hover:translate-y-[1px] hover:border-b-[3px] active:translate-y-[2px] active:border-b-[1px] text-slate-950 font-black text-[10px] rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                          >
                            <RefreshCw className="h-3 w-3 shrink-0" />
                            {isSimulatingBrownian ? "Dừng mô phỏng" : "Xem va chạm nhiệt (Brownian)"}
                          </button>
                          <span className="text-[9px] text-slate-900 font-extrabold mt-1.5 text-center px-2">Bấm nút hoặc click hạt phấn hoa để kích hoạt va chạm bất đối xứng</span>
                        </div>

                        {/* Fig 1.2: Trajectory */}
                        <div className="bg-gradient-to-b from-slate-50 to-slate-100/80 border-2 border-slate-250 border-b-[5px] border-b-slate-350 rounded-2xl p-4 flex flex-col items-center shadow-sm">
                          <span className="text-[9px] font-mono font-black text-slate-700 mb-2">HÌNH 1.2. QUỸ ĐẠO CHUYỂN ĐỘNG CỦA HẠT PHẤN HOA</span>
                          
                          <div className="w-full h-48 bg-slate-950 rounded-xl border-2 border-slate-300 flex items-center justify-center p-2 relative">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:12px_12px]" />
                            <svg className="w-full h-full relative z-10" viewBox="0 0 200 120">
                              <path
                                d="M 20,40 L 50,80 L 100,50 L 120,95 L 140,45 L 180,85"
                                fill="none"
                                stroke="#38bdf8"
                                strokeWidth="2.5"
                                strokeDasharray="3"
                                className="animate-pulse"
                              />
                              <circle cx="20" cy="40" r="4" fill="#f43f5e" />
                              <circle cx="180" cy="85" r="5" fill="#eab308" />
                              <text x="25" y="35" fill="#f43f5e" className="text-[8px] font-black">Bắt đầu</text>
                              <text x="130" y="75" fill="#eab308" className="text-[8px] font-black">Hạt phấn hoa</text>
                            </svg>
                          </div>
                          <span className="text-[9px] text-slate-900 font-extrabold mt-3 text-center px-4">Đường dích dắc biểu diễn vị trí của hạt phấn hoa sau những khoảng thời gian bằng nhau</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section II */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-indigo-900 pl-2.5 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-2.5 h-5 bg-gradient-to-b from-indigo-400 to-indigo-500 rounded-md"></span>
                      II. CẤU TRÚC CỦA CHẤT RẮN, CHẤT LỎNG VÀ CHẤT KHÍ
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-950 font-bold">
                      Dựa trên khoảng cách phân tử và lực liên kết phân tử, ta mô tả sơ lược đặc trưng cấu trúc vật chất:
                    </p>

                    {/* Fig 1.3: Solid, Liquid, Gas */}
                    <div className="bg-gradient-to-b from-indigo-50 to-indigo-100/40 border-2 border-indigo-200 border-b-[6px] border-b-indigo-300 rounded-3xl p-5 shadow-sm hover:translate-y-[1px] hover:border-b-[5px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                      <span className="text-[10px] uppercase font-mono font-black text-indigo-950 block mb-3">HÌNH 1.3. CẤU TRÚC PHÂN TỬ CỦA BA THỂ CHẤT</span>
                      
                      <div className="grid grid-cols-3 gap-3">
                        {/* Gas */}
                        <div className="bg-gradient-to-b from-cyan-50 to-cyan-100/40 border-2 border-cyan-200 border-b-[5px] border-b-cyan-300 rounded-2xl p-3 flex flex-col items-center shadow-sm">
                          <span className="text-[11px] font-black text-cyan-900 uppercase tracking-wider">Thể khí</span>
                          <div className="w-full h-24 bg-slate-950 rounded-xl my-2 border-2 border-slate-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
                            {[
                              { x: 15, y: 20 }, { x: 75, y: 15 }, { x: 45, y: 70 }, { x: 110, y: 50 }, { x: 80, y: 80 }
                            ].map((p, i) => (
                              <div key={i} className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 flex items-center justify-center shadow-sm animate-pulse" style={{ left: `${p.x}px`, top: `${p.y}px` }}>
                                <span className="absolute w-4 h-0.5 bg-cyan-300/60 rotate-45"></span>
                              </div>
                            ))}
                          </div>
                          <p className="text-[10px] text-slate-950 font-bold text-center leading-tight">Phân tử rất xa nhau. Lực liên kết rất yếu. Chuyển động hỗn loạn tự do.</p>
                        </div>
                        {/* Liquid */}
                        <div className="bg-gradient-to-b from-blue-50 to-blue-100/40 border-2 border-blue-200 border-b-[5px] border-b-blue-300 rounded-2xl p-3 flex flex-col items-center shadow-sm">
                          <span className="text-[11px] font-black text-blue-900 uppercase tracking-wider">Thể lỏng</span>
                          <div className="w-full h-24 bg-slate-950 rounded-xl my-2 border-2 border-slate-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
                            {[
                              { x: 10, y: 55 }, { x: 28, y: 65 }, { x: 45, y: 48 }, { x: 30, y: 35 }, { x: 50, y: 70 },
                              { x: 65, y: 55 }, { x: 85, y: 40 }, { x: 80, y: 65 }, { x: 105, y: 60 }, { x: 95, y: 48 }
                            ].map((p, i) => (
                              <div key={i} className="absolute w-2.5 h-2.5 rounded-full bg-blue-400 shadow-sm animate-pulse" style={{ left: `${p.x}px`, top: `${p.y}px` }} />
                            ))}
                          </div>
                          <p className="text-[10px] text-slate-950 font-bold text-center leading-tight">Gần nhau nhưng không trật tự. Lực liên kết yếu. Dao động quanh VTCB di động.</p>
                        </div>
                        {/* Solid */}
                        <div className="bg-gradient-to-b from-purple-50 to-purple-100/40 border-2 border-purple-200 border-b-[5px] border-b-purple-300 rounded-2xl p-3 flex flex-col items-center shadow-sm">
                          <span className="text-[11px] font-black text-purple-900 uppercase tracking-wider">Thể rắn</span>
                          <div className="w-full h-24 bg-slate-950 rounded-xl my-2 border-2 border-slate-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
                            {/* Grid of solid spheres */}
                            {[
                              { x: 15, y: 15 }, { x: 40, y: 15 }, { x: 65, y: 15 }, { x: 90, y: 15 },
                              { x: 15, y: 40 }, { x: 40, y: 40 }, { x: 65, y: 40 }, { x: 90, y: 40 },
                              { x: 15, y: 65 }, { x: 40, y: 65 }, { x: 65, y: 65 }, { x: 90, y: 65 }
                            ].map((p, i) => (
                              <div key={i} className="absolute w-2.5 h-2.5 rounded-full bg-purple-400 border border-purple-300 shadow-sm animate-pulse" style={{ left: `${p.x}px`, top: `${p.y}px` }} />
                            ))}
                          </div>
                          <p className="text-[10px] text-slate-950 font-bold text-center leading-tight">Rất gần và trật tự tuần hoàn. Lực liên kết rất mạnh. Dao động quanh VTCB cố định.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section III */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-rose-900 pl-2.5 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-2.5 h-5 bg-gradient-to-b from-rose-400 to-rose-500 rounded-md"></span>
                      III. SỰ CHUYỂN THỂ
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-950 font-bold">
                      Các chất có thể chuyển đổi tuần hoàn giữa các trạng thái Rắn, Lỏng và Khí thông qua sự trao đổi năng lượng nhiệt với môi trường:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      {/* Fig 1.4 Phase Transition Cycle */}
                      <div className="md:col-span-6 bg-gradient-to-b from-rose-50 to-rose-100/40 border-2 border-rose-200 border-b-[6px] border-b-rose-300 rounded-3xl p-5 shadow-sm hover:translate-y-[1px] hover:border-b-[5px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer flex flex-col items-center justify-between">
                        <span className="text-[10px] font-mono font-black text-rose-950 text-center uppercase mb-3">HÌNH 1.4. SƠ ĐỒ CHU TRÌNH CHUYỂN THỂ</span>
                        
                        <div className="w-full h-44 flex items-center justify-center bg-white rounded-xl relative p-1 border-2 border-slate-200 shadow-inner">
                          {/* Cyclic Triangle SVG */}
                          <svg className="w-full h-full" viewBox="0 0 200 160">
                            {/* Vertices */}
                            <g>
                              <circle cx="100" cy="25" r="16" fill="#0891b2" opacity="0.15" />
                              <circle cx="100" cy="25" r="14" fill="none" stroke="#0891b2" strokeWidth="2.5" />
                              <text x="100" y="28" fill="#0e7490" textAnchor="middle" className="text-[10px] font-black">Khí</text>
                            </g>
                            <g>
                              <circle cx="40" cy="130" r="16" fill="#2563eb" opacity="0.15" />
                              <circle cx="40" cy="130" r="14" fill="none" stroke="#2563eb" strokeWidth="2.5" />
                              <text x="40" y="133" fill="#1d4ed8" textAnchor="middle" className="text-[10px] font-black">Lỏng</text>
                            </g>
                            <g>
                              <circle cx="160" cy="130" r="16" fill="#7c3aed" opacity="0.15" />
                              <circle cx="160" cy="130" r="14" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
                              <text x="160" y="133" fill="#6d28d9" textAnchor="middle" className="text-[10px] font-black">Rắn</text>
                            </g>

                            {/* Transition paths */}
                            {/* Lỏng <-> Rắn */}
                            <path d="M 58,124 L 142,124" stroke="#be123c" strokeWidth="2" />
                            <text x="100" y="118" fill="#9f1239" textAnchor="middle" className="text-[8.5px] font-black">Nóng chảy</text>
                            <path d="M 142,136 L 58,136" stroke="#0e7490" strokeWidth="2" />
                            <text x="100" y="147" fill="#0e7490" textAnchor="middle" className="text-[8.5px] font-black">Đông đặc</text>

                            {/* Lỏng <-> Khí */}
                            <path d="M 48,112 L 88,38" stroke="#be123c" strokeWidth="2" />
                            <text x="44" y="75" fill="#9f1239" textAnchor="middle" className="text-[8.5px] font-black rotate-[-65deg] origin-center">Hóa hơi</text>
                            <path d="M 94,44 L 58,114" stroke="#1d4ed8" strokeWidth="2" />
                            <text x="86" y="80" fill="#1d4ed8" textAnchor="middle" className="text-[8.5px] font-black rotate-[-65deg] origin-center">Ngưng tụ</text>

                            {/* Rắn <-> Khí */}
                            <path d="M 152,112 L 112,38" stroke="#db2777" strokeWidth="2" />
                            <text x="156" y="75" fill="#be185d" textAnchor="middle" className="text-[8.5px] font-black rotate-[65deg]">Thăng hoa</text>
                            <path d="M 106,44 L 142,114" stroke="#6d28d9" strokeWidth="2" />
                            <text x="114" y="80" fill="#6d28d9" textAnchor="middle" className="text-[8.5px] font-black rotate-[65deg]">Ngưng kết</text>
                          </svg>
                        </div>
                      </div>

                      {/* Fig 1.5 Boiling Curve */}
                      <div className="md:col-span-6 bg-gradient-to-b from-rose-50 to-rose-100/40 border-2 border-rose-200 border-b-[6px] border-b-rose-300 rounded-3xl p-5 shadow-sm hover:translate-y-[1px] hover:border-b-[5px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer flex flex-col items-center justify-between">
                        <span className="text-[10px] font-mono font-black text-rose-950 text-center uppercase mb-3">HÌNH 1.5. ĐỒ THỊ QUÁ TRÌNH SÔI CỦA NƯỚC</span>
                        
                        <div className="w-full h-44 flex items-center justify-center bg-white rounded-xl relative p-1 border-2 border-slate-200 shadow-inner">
                          <svg className="w-full h-full" viewBox="0 0 200 140">
                            {/* Axes */}
                            <line x1="30" y1="120" x2="185" y2="120" stroke="#1e293b" strokeWidth="2" />
                            <line x1="30" y1="120" x2="30" y2="20" stroke="#1e293b" strokeWidth="2" />
                            
                            {/* Graph line */}
                            <path d="M 30,110 L 100,40 L 180,40" fill="none" stroke="#be123c" strokeWidth="3" />
                            
                            {/* Points labels */}
                            <circle cx="30" cy="110" r="4.5" fill="#be123c" stroke="#ffffff" strokeWidth="1.5" />
                            <text x="36" y="113" fill="#0f172a" className="text-[9px] font-black">A (20°C)</text>
                            
                            <circle cx="100" cy="40" r="4.5" fill="#be123c" stroke="#ffffff" strokeWidth="1.5" />
                            <text x="95" y="32" fill="#0f172a" className="text-[9px] font-black">B (100°C)</text>
                            
                            <circle cx="180" cy="40" r="4.5" fill="#be123c" stroke="#ffffff" strokeWidth="1.5" />
                            <text x="175" y="32" fill="#0f172a" className="text-[9px] font-black">C (Sôi)</text>
                            
                            {/* Axis labels */}
                            <text x="180" y="132" fill="#1e293b" textAnchor="end" className="text-[8.5px] font-mono font-black">Thời gian (s)</text>
                            <text x="35" y="18" fill="#1e293b" className="text-[8.5px] font-mono font-black">Nhiệt độ (°C)</text>
                            <text x="12" y="44" fill="#1e293b" className="text-[8.5px] font-mono font-black">100</text>
                            <text x="16" y="113" fill="#1e293b" className="text-[8.5px] font-mono font-black">20</text>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-b from-sky-50 to-sky-100/40 border-2 border-sky-200 border-b-[6px] border-b-sky-300 rounded-3xl p-5 shadow-sm hover:translate-y-[1px] hover:border-b-[5px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer space-y-4">
                      <span className="text-[10px] uppercase font-mono font-black text-sky-950 block">GIẢI THÍCH CHUYỂN THỂ DƯỚI GÓC NHÌN ĐỘNG HỌC PHÂN TỬ:</span>
                      
                      <div className="space-y-4 text-xs leading-relaxed text-slate-900 font-extrabold">
                        <div className="space-y-1">
                          <p>
                            <strong className="text-cyan-950 font-black text-[12px]">a) Sự bay hơi và sự sôi:</strong>
                          </p>
                          <p className="pl-3 border-l-4 border-cyan-400 text-slate-900 font-bold">
                            - <strong className="text-slate-950 font-black">Sự bay hơi:</strong> Ở bề mặt thoáng chất lỏng, một số phân tử chuyển động hỗn loạn ngẫu nhiên nhận được động năng cực lớn từ các phân tử lân cận. Chúng thắng được lực hút bám giữ của các phân tử lân cận và bứt phá ra khỏi bề mặt chất lỏng biến thành thể khí.
                            Vì vậy, nhiệt độ cốc nước sẽ bị giảm khi bay hơi tự nhiên do động năng trung bình phân tử giảm đi.
                          </p>
                          <p className="pl-3 border-l-4 border-cyan-400 text-slate-900 font-bold">
                            - <strong className="text-slate-950 font-black">Sự sôi:</strong> Khi đun đến nhiệt độ sôi xác định (ví dụ 100°C của nước dưới áp suất chuẩn), các bọt khí chứa không khí hòa tan và hơi nước trong lòng chất lỏng bắt đầu nở to ra theo nhiệt độ. Khi lực đẩy Ácsimét đủ lớn, các bọt khí nổi lên trên mặt thoáng và vỡ ra, giải phóng một lượng hơi nước lớn vào môi trường.
                          </p>
                        </div>

                        <div className="space-y-1">
                          <p>
                            <strong className="text-purple-950 font-black text-[12px]">b) Sự nóng chảy của chất rắn kết tinh:</strong>
                          </p>
                          <p className="pl-3 border-l-4 border-purple-400 text-slate-900 font-bold">
                            Khi nung nóng chất rắn kết tinh, nhiệt độ tăng liên tục. Khi đạt đến nhiệt độ nóng chảy t_c, năng lượng nhiệt hấp thụ lúc này không làm tăng động năng trung bình (nhiệt độ không đổi), mà chuyển hoá thành thế năng liên kết dùng để phá vỡ các liên kết tuần hoàn của mạng tinh thể rắn.
                            Sau khi toàn bộ tinh thể rắn đã nóng chảy hoàn toàn thành lỏng, nhiệt độ hệ mới tiếp tục tăng lên (Hình 1.7).
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Fig 1.7 Melting graph */}
                        <div className="bg-gradient-to-b from-purple-50 to-purple-100/40 border-2 border-purple-200 border-b-[5px] border-b-purple-300 rounded-2xl p-4 flex flex-col items-center shadow-sm">
                          <span className="text-[9px] font-mono font-black text-slate-700 mb-2">HÌNH 1.7. ĐỒ THỊ NÓNG CHẢY CHẤT RẮN KẾT TINH (THIẾC)</span>
                          
                          <div className="w-full h-36 bg-white rounded-xl border-2 border-slate-200 flex items-center justify-center p-1">
                            <svg className="w-full h-full" viewBox="0 0 200 110">
                              <line x1="25" y1="90" x2="185" y2="90" stroke="#1e293b" strokeWidth="1.5" />
                              <line x1="25" y1="90" x2="25" y2="15" stroke="#1e293b" strokeWidth="1.5" />
                              
                              <path d="M 25,80 L 75,50 L 135,50 L 180,20" fill="none" stroke="#7c3aed" strokeWidth="3" />
                              <circle cx="75" cy="50" r="4.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="1.5" />
                              <circle cx="135" cy="50" r="4.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="1.5" />
                              
                              <text x="35" y="75" fill="#1e293b" className="text-[8.5px] font-black">Giai đoạn a</text>
                              <text x="95" y="44" fill="#6d28d9" className="text-[8.5px] font-black">b (Melting)</text>
                              <text x="145" y="35" fill="#1e293b" className="text-[8.5px] font-black">Giai đoạn c</text>
                              
                              <text x="10" y="53" fill="#1e293b" className="text-[8.5px] font-mono font-black">t_c</text>
                              <text x="180" y="102" fill="#1e293b" className="text-[8.5px] font-mono font-black">t (phút)</text>
                            </svg>
                          </div>
                          <span className="text-[9px] text-slate-900 font-extrabold mt-2 text-center leading-normal px-2">Giai đoạn b là quá trình nóng chảy, nhiệt độ giữ cố định ở t_c cho đến khi hóa lỏng hoàn toàn</span>
                        </div>

                        {/* Fig 1.6 Sodium Chloride Lattice */}
                        <div className="bg-gradient-to-b from-teal-50 to-teal-100/40 border-2 border-teal-200 border-b-[5px] border-b-teal-300 rounded-2xl p-4 flex flex-col items-center shadow-sm">
                          <span className="text-[9px] font-mono font-black text-slate-700 mb-2">HÌNH 1.6. MẠNG TINH THỂ MUỐI ĂN (NaCl)</span>
                          
                          <div className="w-full h-36 bg-white rounded-xl border-2 border-slate-200 flex items-center justify-center p-1">
                            {/* Symmetric cube render */}
                            <svg className="w-full h-full" viewBox="0 0 200 110">
                              {/* Grid lines */}
                              <rect x="65" y="20" width="60" height="60" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2" />
                              <line x1="65" y1="20" x2="85" y2="10" stroke="#64748b" strokeWidth="1" strokeDasharray="2" />
                              <line x1="125" y1="20" x2="145" y2="10" stroke="#64748b" strokeWidth="1" strokeDasharray="2" />
                              <line x1="125" y1="80" x2="145" y2="70" stroke="#64748b" strokeWidth="1" strokeDasharray="2" />
                              <line x1="65" y1="80" x2="85" y2="70" stroke="#64748b" strokeWidth="1" strokeDasharray="2" />
                              <rect x="85" y="10" width="60" height="60" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2" />
                              
                              {/* Na+ (Blue) Cl- (Green) Spheres */}
                              <circle cx="65" cy="20" r="5" fill="#2563eb" />
                              <text x="65" y="20" fill="#ffffff" textAnchor="middle" className="text-[5.5px] font-black font-mono">Na</text>
                              
                              <circle cx="125" cy="20" r="6.5" fill="#059669" />
                              <text x="125" y="22" fill="#ffffff" textAnchor="middle" className="text-[5.5px] font-black font-mono">Cl</text>

                              <circle cx="65" cy="80" r="6.5" fill="#059669" />
                              <circle cx="125" cy="80" r="5" fill="#2563eb" />

                              <circle cx="85" cy="10" r="6.5" fill="#059669" />
                              <circle cx="145" cy="10" r="5" fill="#2563eb" />
                              
                              <circle cx="85" cy="70" r="5" fill="#2563eb" />
                              <circle cx="145" cy="70" r="6.5" fill="#059669" />
                            </svg>
                          </div>
                          <span className="text-[9px] text-slate-900 font-extrabold mt-2 text-center leading-normal px-2">Các ion Na+ (xanh dương) và Cl- (xanh lá) liên kết chặt chẽ ở các nút mạng tinh thể</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Em có biết section */}
                  <div className="bg-gradient-to-b from-purple-50 to-purple-100/40 border-2 border-purple-200 border-b-[6px] border-b-purple-300 rounded-3xl p-5 shadow-sm hover:translate-y-[1px] hover:border-b-[5px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer space-y-4 relative z-10">
                    <div className="flex items-center gap-2">
                      <BookMarked className="h-4 w-4 text-purple-800" />
                      <span className="text-xs font-black text-purple-950 uppercase tracking-wider">EM CÓ BIẾT? THÔNG TIN THÊM</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-8 text-xs leading-relaxed space-y-3.5 text-slate-900 font-extrabold">
                        <p>
                          - <strong className="text-purple-950 font-black">Chất vô định hình:</strong> Các hạt (phân tử, nguyên tử, ion) cấu tạo nên chất dính kết chặt nhưng được sắp xếp hỗn độn không có trật tự tuần hoàn. Ví dụ tiêu biểu là thuỷ tinh, nhựa đường, cao su, các chất dẻo. Chúng không có nhiệt độ nóng chảy xác định mà biến đổi dần.
                        </p>
                        <p>
                          - <strong className="text-purple-950 font-black">Trạng thái Plasma:</strong> Ở nhiệt độ cực cao hàng triệu độ (như ở khí quyển Mặt Trời hoặc lõi các ngôi sao), các nguyên tử bị kích thích mạnh mẽ, va chạm dữ dội bứt các electron ra khỏi lớp vỏ tạo thành một hỗn hợp khí ion hóa hoàn toàn gồm ion dương và electron tự do chuyển động nhiệt hỗn loạn (Hình 1.8).
                        </p>
                      </div>

                      {/* Fig 1.8 Solar flare Plasma */}
                      <div className="md:col-span-4 bg-gradient-to-b from-orange-50 to-orange-100/40 border-2 border-orange-200 border-b-[5px] border-b-orange-300 rounded-2xl p-3 flex flex-col items-center shadow-sm">
                        <span className="text-[9px] font-mono font-black text-slate-700 mb-1">HÌNH 1.8. PLASMA MẶT TRỜI</span>
                        <div className="w-full h-24 bg-slate-950 rounded-xl relative overflow-hidden border-2 border-slate-200 flex items-center justify-center">
                          <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 via-orange-600 to-red-600 rounded-full blur-sm animate-pulse relative">
                            {/* Flaring arcs */}
                            <div className="absolute top-[-10px] left-[15px] w-8 h-8 rounded-full border-2 border-dashed border-orange-400 opacity-60 animate-spin"></div>
                          </div>
                          <div className="absolute bottom-2 text-[8px] font-mono text-amber-400 tracking-wider font-extrabold">Millions of Degrees</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <LessonAssistant lessonId="l1" lessonTitle="Bài 1: Cấu trúc của chất. Sự chuyển thể" />
                </div>
              )}

              {/* TAB 1: ACCURATE TEXTBOOK WITH HIGH-POLISHED INTERACTIVE SVG DIAGRAMS FOR LESSON 2 */}
              {activeLessonTab === "pdf" && selectedLesson.id === "l2" && (
                <div className="space-y-6 text-slate-800 animate-fade-in relative">
                  {/* Styled thermo-theme background container */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,63,94,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  <div className="absolute top-10 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
                  <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                  <div className="border-b border-slate-200 pb-3 flex justify-between items-center relative z-10">
                    <div>
                      <h3 className="text-md font-extrabold text-slate-900">BÀI 2: NỘI NĂNG. ĐỊNH LUẬT I CỦA NHIỆT ĐỘNG LỰC HỌC</h3>
                      <p className="text-[10px] text-cyan-600 font-mono mt-1 font-bold">Sách giáo khoa Vật lí 12 - Chương trình GDPT mới 2018</p>
                    </div>
                  </div>

                  {/* Section I: KHÁI NIỆM NỘI NĂNG */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-amber-600 border-l-4 border-amber-500 pl-2.5 uppercase tracking-wide">I. KHÁI NIỆM NỘI NĂNG (U)</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Nội năng của một hệ vật lí là tổng năng lượng dự trữ bên trong hệ, bao gồm động năng chuyển động hỗn loạn không ngừng của các phân tử cấu thành hệ và thế năng tương tác giữa chúng.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* Interactive 3D Card for Section I Text Content */}
                      <div className="md:col-span-7 bg-gradient-to-b from-amber-50 to-amber-100/30 border-2 border-amber-200 border-b-[5px] border-b-amber-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <h5 className="text-xs font-black text-amber-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                          Thành phần cấu thành Nội năng
                        </h5>
                        <ul className="space-y-3.5 text-xs text-amber-950 font-medium">
                          <li className="leading-relaxed">
                            <strong className="text-amber-900 font-bold">Động năng phân tử (<FormattedMathText text="E_đ" />):</strong> Do các phân tử luôn chuyển động hỗn loạn không ngừng. Nhiệt độ (<FormattedMathText text="T" />) của hệ càng cao thì tốc độ trung bình của các phân tử càng lớn, động năng trung bình tăng dắt → <em className="text-red-700 font-bold underline decoration-wavy">phụ thuộc vào nhiệt độ <FormattedMathText text="T" /></em>.
                          </li>
                          <li className="leading-relaxed">
                            <strong className="text-amber-900 font-bold">Thế năng tương tác phân tử (<FormattedMathText text="E_t" />):</strong> Do giữa các phân tử luôn có lực hút và lực đẩy tương tác. Giá trị thế năng này phụ thuộc vào khoảng cách trung bình giữa các phân tử → <em className="text-emerald-700 font-bold underline decoration-wavy">phụ thuộc vào thể tích <FormattedMathText text="V" /> của hệ</em>.
                          </li>
                          <li className="leading-relaxed pt-2.5 border-t border-amber-200/60 flex items-center justify-between">
                            <span className="text-amber-900 font-bold">Công thức tổng quát:</span>
                            <span className="bg-amber-100/80 border border-amber-200/80 px-2 py-0.5 rounded text-amber-800 font-black no-override no-override-bg inline-flex items-center"><FormattedMathText text="U = f(T, V)" /></span>
                          </li>
                          <li className="leading-relaxed flex items-center justify-between">
                            <span className="text-amber-900 font-bold">Trường hợp Khí lí tưởng:</span>
                            <span className="bg-cyan-100/80 border border-cyan-200/80 px-2 py-0.5 rounded text-cyan-800 font-black no-override no-override-bg inline-flex items-center"><FormattedMathText text="U = f(T)" /></span>
                          </li>
                        </ul>
                      </div>

                      {/* Fig 2.1: Microscopic Molecular Energy Model SVG */}
                      <div className="md:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/50 border-2 border-slate-200 border-b-[5px] border-b-slate-300/80 rounded-2xl p-3.5 flex flex-col items-center shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <span className="text-[9px] font-mono text-slate-700 font-extrabold mb-2 uppercase">HÌNH 2.1. ĐỘNG NĂNG & THẾ NĂNG PHÂN TỬ</span>
                        
                        <div className="w-full h-32 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-1 shadow-inner no-override no-override-bg">
                          <svg className="w-full h-full" viewBox="0 0 200 100">
                            {/* Force bonds (Spring representations) */}
                            <path d="M 50 30 Q 75 25 100 20" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" />
                            <path d="M 100 20 Q 120 45 140 70" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" />
                            <path d="M 50 30 Q 95 50 140 70" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" />
                            
                            {/* Particles */}
                            <circle cx="50" cy="30" r="8" fill="url(#blueGrad)" />
                            <circle cx="100" cy="20" r="8" fill="url(#blueGrad)" />
                            <circle cx="140" cy="70" r="8" fill="url(#blueGrad)" />

                            {/* Velocity Vectors (Kinetic Energy) */}
                            <line x1="50" y1="30" x2="25" y2="20" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow)" />
                            <line x1="100" y1="20" x2="115" y2="40" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow)" />
                            <line x1="140" y1="70" x2="165" y2="80" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow)" />

                            {/* Annotations */}
                            <text x="32" y="47" fill="#dc2626" className="text-[6.5px] font-extrabold font-sans">Véc-tơ v (E_đ)</text>
                            <text x="102" y="45" fill="#15803d" className="text-[6.5px] font-extrabold font-sans">Lực liên kết (E_t)</text>

                            {/* Definitions */}
                            <defs>
                              <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#38bdf8" />
                                <stop offset="100%" stopColor="#0284c7" />
                              </linearGradient>
                              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" fill="#ef4444" />
                              </marker>
                            </defs>
                          </svg>
                        </div>
                        <span className="text-[8.5px] text-slate-700 italic mt-2.5 text-center leading-snug font-semibold">Vận tốc tạo ra Động năng (màu đỏ), khoảng cách tạo ra Thế năng tương tác (màu xanh lá)</span>
                      </div>
                    </div>

                    {/* Textbook Experiment Section (Styled with beautiful 3D borders & high-contrast font overlays) */}
                    <div className="bg-gradient-to-b from-slate-50 to-slate-100/30 border-2 border-slate-200 border-b-[5px] border-b-slate-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                      <span className="text-[10px] uppercase font-mono font-black text-slate-800 tracking-wider block mb-3.5 border-b border-slate-200 pb-1.5">THỰC NGHIỆM ĐIỂN HÌNH: ĐUN NÓNG KHÍ ĐẨY NÚT BẤC (Trang 11 SGK)</span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-8 text-xs leading-relaxed space-y-3 text-slate-800 font-medium">
                          <p className="text-slate-950 font-bold italic">
                            Khi đun nóng không khí trong ống nghiệm nút kín, nhiệt năng từ đèn cồn được truyền trực tiếp qua vỏ thủy tinh vào hệ khí:
                          </p>
                          <ol className="space-y-2.5 pl-1">
                            <li className="flex gap-2">
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200/80 text-slate-800 font-extrabold text-[10px] shrink-0 mt-0.5">1</span>
                              <span>Lửa truyền nhiệt làm động năng trung bình của các phân tử khí tăng vọt → <strong className="text-red-700 font-extrabold underline inline-flex items-center gap-1">Nội năng hệ <FormattedMathText text="U" /> tăng</strong>.</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200/80 text-slate-800 font-extrabold text-[10px] shrink-0 mt-0.5">2</span>
                              <span>Tốc độ va đập nhiệt tăng kéo theo áp suất khí lên thành ống và nút bấc tăng mạnh đột ngột.</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200/80 text-slate-800 font-extrabold text-[10px] shrink-0 mt-0.5">3</span>
                              <span>Khi áp suất đủ lớn, lực đẩy của khí thắng lực ma sát, khí dãn nở nhanh chóng thực hiện công đẩy văng nút bấc bay ra xa.</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200/80 text-slate-800 font-extrabold text-[10px] shrink-0 mt-0.5">4</span>
                              <span>Khí sinh công cơ học làm chuyển hóa một phần nội năng thành cơ năng của nút bấc → <strong className="text-blue-700 font-extrabold underline inline-flex items-center gap-1">Khí tự nguội đi (giảm <FormattedMathText text="U" />)</strong> sau khi dãn nở sinh công.</span>
                            </li>
                          </ol>
                        </div>

                        {/* Fig 2.2: Test Tube Cork Popper Experiment SVG */}
                        <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-2.5 flex flex-col items-center shadow-inner no-override no-override-bg">
                          <span className="text-[9px] font-mono text-slate-700 font-extrabold mb-1.5 uppercase">HÌNH 2.2. THÍ NGHIỆM BẬT NÚT BẤC</span>
                          
                          <div className="w-full h-28 bg-slate-50 rounded-lg border border-slate-150 flex items-center justify-center relative overflow-hidden no-override no-override-bg">
                            <svg className="w-full h-full" viewBox="0 0 160 90">
                              {/* Bunsen burner */}
                              <path d="M 30 85 L 50 85 L 45 70 L 35 70 Z" fill="#475569" />
                              <ellipse cx="40" cy="70" rx="5" ry="1.5" fill="#94a3b8" />
                              <path d="M 37 70 Q 40 50 43 70 Z" fill="#f97316" className="animate-pulse" />
                              <path d="M 39 70 Q 40 58 41 70 Z" fill="#f59e0b" className="animate-pulse" />

                              {/* Stand */}
                              <line x1="60" y1="85" x2="60" y2="45" stroke="#64748b" strokeWidth="2.5" />
                              <line x1="45" y1="85" x2="80" y2="85" stroke="#475569" strokeWidth="3" />
                              
                              {/* Glass tube (angled) */}
                              <line x1="50" y1="55" x2="110" y2="35" stroke="#94a3b8" strokeWidth="10" strokeLinecap="round" opacity="0.8" />
                              <line x1="53" y1="54" x2="108" y2="36" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />

                              {/* Cork flying out */}
                              <rect x="122" y="24" width="7" height="9" transform="rotate(-18 122 24)" fill="#d97706" rx="1" />
                              <path d="M 108 36 Q 118 32 122 28" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="2,2" />
                              
                              {/* Explosion arcs */}
                              <path d="M 112 30 Q 116 26 114 22" fill="none" stroke="#2563eb" strokeWidth="1" />
                              <path d="M 114 42 Q 119 44 122 41" fill="none" stroke="#2563eb" strokeWidth="1" />

                              {/* Air particles inside */}
                              <circle cx="60" cy="51" r="1.5" fill="#dc2626" />
                              <circle cx="70" cy="48" r="2" fill="#ea580c" />
                              <circle cx="85" cy="44" r="1.5" fill="#dc2626" />
                              <circle cx="98" cy="40" r="2.5" fill="#ea580c" />
                            </svg>
                          </div>
                          <span className="text-[8.5px] text-slate-700 italic mt-1.5 text-center font-bold">Nút bấc bị đẩy vọt ra khi nội năng khí tăng đột biến</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section II: ĐỊNH LUẬT I */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-amber-600 border-l-4 border-amber-500 pl-2.5 uppercase tracking-wide">II. ĐỊNH LUẬT I CỦA NHIỆT ĐỘNG LỰC HỌC</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Nội năng có thể được biến đổi bằng hai con đường cơ bản: <strong className="text-slate-900 font-bold">Thực hiện công (A)</strong> (chuyển hóa cơ năng sang nhiệt năng) và <strong className="text-slate-900 font-bold">Truyền nhiệt (Q)</strong> (truyền trực tiếp nhiệt năng). Định luật I là sự mở rộng của định luật bảo toàn và chuyển hóa năng lượng vào các hiện tượng nhiệt.
                    </p>

                    <div className="bg-gradient-to-b from-cyan-50 to-cyan-100/40 border-2 border-cyan-200 border-b-[5px] border-b-cyan-300/80 rounded-2xl p-5 shadow-sm text-center max-w-2xl mx-auto space-y-3.5 no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                      <span className="text-[10px] font-mono text-cyan-800 font-black uppercase tracking-wider block">PHÁT BIỂU & BIỂU THỨC TOÁN HỌC</span>
                      <p className="text-xs font-bold leading-relaxed text-cyan-950 italic">
                        &quot;Độ biến thiên nội năng <FormattedMathText text="\Delta U" /> của một hệ bằng tổng công <FormattedMathText text="A" /> và nhiệt lượng <FormattedMathText text="Q" /> mà hệ nhận được.&quot;
                      </p>
                      <div className="text-3xl font-black text-cyan-800 py-1 tracking-wider drop-shadow-sm no-override flex justify-center items-center">
                        <FormattedMathText text="\Delta U = A + Q" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      <div className="md:col-span-7 text-xs leading-relaxed space-y-4">
                        <span className="text-[10px] font-mono font-extrabold text-slate-700 block uppercase border-b border-slate-200 pb-1.5">QUY ƯỚC DẤU ĐỊNH LUẬT I (Mắt xích trọng tâm thi THPT)</span>
                        <p className="text-slate-800 font-medium">
                          Chiều của các dòng năng lượng (nhập hay xuất ra khỏi hệ) quyết định trực tiếp dấu đại số khi đưa vào phương trình tính toán:
                        </p>
                        
                        <div className="space-y-3">
                          {/* Emerald 3D Card for Positive Sign */}
                          <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/30 border-2 border-emerald-200 border-b-[5px] border-b-emerald-300/80 rounded-2xl p-4 flex items-start gap-3 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                            <span className="text-base font-black text-emerald-700 mt-0.5 shrink-0">+</span>
                            <div className="text-emerald-950 font-medium space-y-1">
                              <p className="text-emerald-900 font-bold text-xs uppercase tracking-wider">Hệ nhận năng lượng (Dấu Dương):</p>
                              <p className="leading-relaxed flex flex-wrap items-center gap-x-1"><strong><FormattedMathText text="A > 0" />:</strong> Hệ nhận công từ bên ngoài (Ngoại lực nén khí làm giảm thể tích <FormattedMathText text="V" />).</p>
                              <p className="leading-relaxed flex flex-wrap items-center gap-x-1"><strong><FormattedMathText text="Q > 0" />:</strong> Hệ nhận nhiệt lượng từ môi trường ngoài (Đun nóng bằng đèn cồn).</p>
                            </div>
                          </div>

                          {/* Rose 3D Card for Negative Sign */}
                          <div className="bg-gradient-to-b from-rose-50 to-rose-100/30 border-2 border-rose-200 border-b-[5px] border-b-rose-300/80 rounded-2xl p-4 flex items-start gap-3 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                            <span className="text-base font-black text-rose-700 mt-0.5 shrink-0">-</span>
                            <div className="text-rose-950 font-medium space-y-1">
                              <p className="text-rose-900 font-bold text-xs uppercase tracking-wider">Hệ truyền năng lượng (Dấu Âm):</p>
                              <p className="leading-relaxed flex flex-wrap items-center gap-x-1"><strong><FormattedMathText text="A < 0" />:</strong> Hệ thực hiện công lên môi trường (Khí dãn nở sinh công đẩy pittông).</p>
                              <p className="leading-relaxed flex flex-wrap items-center gap-x-1"><strong><FormattedMathText text="Q < 0" />:</strong> Hệ tỏa nhiệt lượng ra môi trường bên ngoài (Làm nguội khí).</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fig 2.3: Signs Convention Diagram SVG */}
                      <div className="md:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/50 border-2 border-slate-200 border-b-[5px] border-b-slate-300/80 rounded-2xl p-3.5 flex flex-col items-center shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <span className="text-[9px] font-mono text-slate-700 font-extrabold mb-2.5 uppercase">HÌNH 2.3. SƠ ĐỒ QUY ƯỚC DẤU ΔU = A + Q</span>
                        
                        <div className="w-full h-36 bg-white rounded-xl border border-slate-250 flex items-center justify-center p-1 shadow-inner no-override no-override-bg">
                          <svg className="w-full h-full" viewBox="0 0 180 120">
                            {/* System circle */}
                            <circle cx="90" cy="60" r="24" fill="#0369a1" stroke="#0284c7" strokeWidth="2.5" />
                            <text x="90" y="58" textAnchor="middle" fill="#ffffff" className="text-[7.5px] font-black uppercase">HỆ VẬT LÍ</text>
                            <text x="90" y="68" textAnchor="middle" fill="#e0f2fe" className="text-[7.5px] font-mono font-extrabold">ΔU</text>

                            {/* Arrow Q > 0 (In red) */}
                            <line x1="25" y1="35" x2="63" y2="47" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrowRed)" />
                            <text x="25" y="28" fill="#dc2626" className="text-[7px] font-black font-mono">Q &gt; 0 (+ Nhận nhiệt)</text>

                            {/* Arrow A > 0 (In orange) */}
                            <line x1="25" y1="85" x2="63" y2="73" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrowOrange)" />
                            <text x="25" y="97" fill="#d97706" className="text-[7px] font-black font-mono">A &gt; 0 (+ Nhận công)</text>

                            {/* Arrow Q < 0 (Out blue) */}
                            <line x1="117" y1="47" x2="155" y2="35" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
                            <text x="117" y="28" fill="#2563eb" className="text-[7px] font-black font-mono">Q &lt; 0 (- Tỏa nhiệt)</text>

                            {/* Arrow A < 0 (Out purple) */}
                            <line x1="117" y1="73" x2="155" y2="85" stroke="#7c3aed" strokeWidth="2.5" markerEnd="url(#arrowPurple)" />
                            <text x="117" y="97" fill="#7c3aed" className="text-[7px] font-black font-mono">A &lt; 0 (- Sinh công)</text>

                            {/* SVG Markers */}
                            <defs>
                              <marker id="arrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" fill="#dc2626" />
                              </marker>
                              <marker id="arrowOrange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" fill="#d97706" />
                              </marker>
                              <marker id="arrowBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" fill="#2563eb" />
                              </marker>
                              <marker id="arrowPurple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" fill="#7c3aed" />
                              </marker>
                            </defs>
                          </svg>
                        </div>
                        <span className="text-[8.5px] text-slate-700 italic mt-2 text-center leading-snug font-semibold">Dòng năng lượng nạp vào mang dấu (+), dòng năng lượng xuất ra mang dấu (-)</span>
                      </div>
                    </div>
                  </div>

                  {/* Section III: ĐỘNG CƠ NHIỆT */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-bold text-amber-600 border-l-4 border-amber-500 pl-2.5 uppercase tracking-wide">III. ỨNG DỤNG THỰC TIỄN: ĐỘNG CƠ NHIỆT</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Động cơ nhiệt là thiết bị biến đổi <strong className="text-slate-900">nội năng</strong> của nhiên liệu bị đốt cháy thành <strong className="text-slate-900">cơ năng</strong> của chuyển động pittông, trục khuỷu. Bất kì động cơ nhiệt nào cũng phải cấu tạo từ 3 bộ phận cốt lõi:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      <div className="md:col-span-7 bg-gradient-to-b from-blue-50 to-blue-100/30 border-2 border-blue-200 border-b-[5px] border-b-blue-300/80 rounded-2xl p-5 shadow-sm space-y-4 no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <ol className="space-y-3.5 text-xs text-blue-950 font-medium">
                          <li className="flex gap-2">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-200/80 text-blue-800 font-extrabold text-[10px] shrink-0 mt-0.5">1</span>
                            <span>
                              <strong className="text-blue-900 font-bold inline-flex items-center gap-0.5">Nguồn nóng (<FormattedMathText text="T_1" />):</strong> Đốt cháy nhiên liệu để cung cấp một lượng nhiệt lượng khổng lồ <span className="inline-flex items-center"><FormattedMathText text="Q_1" /></span> cho tác nhân hoạt động.
                            </span>
                          </li>
                          <li className="flex gap-2">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-200/80 text-blue-800 font-extrabold text-[10px] shrink-0 mt-0.5">2</span>
                            <span>
                              <strong className="text-blue-900 font-bold">Tác nhân (Khí dãn nở):</strong> Chất trung gian (hơi nước, khí dãn nở) nhận nhiệt <span className="inline-flex items-center"><FormattedMathText text="Q_1" /></span>, dãn nở mạnh mẽ trong xilanh để thực hiện công cơ học có ích <span className="inline-flex items-center"><FormattedMathText text="A" /></span> làm quay trục khuỷu.
                            </span>
                          </li>
                          <li className="flex gap-2">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-200/80 text-blue-800 font-extrabold text-[10px] shrink-0 mt-0.5">3</span>
                            <span>
                              <strong className="text-blue-900 font-bold inline-flex items-center gap-0.5">Nguồn lạnh (<FormattedMathText text="T_2 < T_1" />):</strong> Tiếp nhận nhiệt lượng dư thừa <span className="inline-flex items-center"><FormattedMathText text="Q_2" /></span> do tác nhân tỏa ra môi trường ngoài nhằm khép kín chu trình hoạt động ổn định liên tục.
                            </span>
                          </li>
                        </ol>

                        <div className="p-3.5 bg-white border border-blue-150 rounded-xl space-y-1.5 shadow-inner no-override no-override-bg">
                          <span className="text-[10px] font-mono text-blue-800 font-black block uppercase tracking-wider">HIỆU SUẤT ĐỘNG CƠ NHIỆT (H)</span>
                          <p className="text-xs text-blue-950 font-semibold leading-relaxed">
                            Do một phần nhiệt lượng bắt buộc phải tỏa ra nguồn lạnh nên hiệu suất thực tế luôn nhỏ hơn 100%:
                          </p>
                          <div className="text-center text-blue-700 text-sm font-black py-1.5 no-override flex justify-center items-center gap-1">
                            <FormattedMathText text="H = |A|/Q_1 = (Q_1 - |Q_2|)/Q_1 < 1" />
                          </div>
                        </div>
                      </div>

                      {/* Fig 2.4: Heat Engine Schematic SVG */}
                      <div className="md:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/50 border-2 border-slate-200 border-b-[5px] border-b-slate-300/80 rounded-2xl p-3.5 flex flex-col items-center shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <span className="text-[9px] font-mono text-slate-700 font-extrabold mb-2.5 uppercase">HÌNH 2.4. SƠ ĐỒ NGUYÊN LÍ ĐỘNG CƠ NHIỆT</span>
                        
                        <div className="w-full h-36 bg-white rounded-xl border border-slate-250 flex items-center justify-center p-1 shadow-inner no-override no-override-bg">
                          <svg className="w-full h-full" viewBox="0 0 180 120">
                            {/* Hot Reservoir */}
                            <rect x="55" y="8" width="70" height="20" fill="#dc2626" stroke="#b91c1c" strokeWidth="1.5" rx="3" />
                            <text x="90" y="21" textAnchor="middle" fill="#ffffff" className="text-[7.5px] font-black font-sans">NGUỒN NÓNG (T_1)</text>

                            {/* Warm arrow down Q1 */}
                            <line x1="90" y1="28" x2="90" y2="48" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowRed)" />
                            <text x="95" y="41" fill="#dc2626" className="text-[7.5px] font-mono font-bold">Q_1</text>

                            {/* Working substance (Engine) */}
                            <circle cx="90" cy="60" r="12" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                            <text x="90" y="63" textAnchor="middle" fill="#ffffff" className="text-[7px] font-black font-sans">Khí</text>

                            {/* Work A arrow sideways */}
                            <line x1="102" y1="60" x2="148" y2="60" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrowOrange)" />
                            <text x="125" y="55" fill="#d97706" className="text-[7.5px] font-mono font-bold">Công A</text>

                            {/* Cold arrow down Q2 */}
                            <line x1="90" y1="72" x2="90" y2="92" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowBlue)" />
                            <text x="95" y="85" fill="#2563eb" className="text-[7.5px] font-mono font-bold">Q_2</text>

                            {/* Cold Reservoir */}
                            <rect x="55" y="92" width="70" height="20" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" rx="3" />
                            <text x="90" y="105" textAnchor="middle" fill="#ffffff" className="text-[7.5px] font-black font-sans">NGUỒN LẠNH (T_2)</text>
                          </svg>
                        </div>
                        <span className="text-[8.5px] text-slate-700 italic mt-1.5 text-center leading-snug font-semibold">Sơ đồ khối mô tả chu trình khép kín truyền nhiệt lượng và thực hiện công</span>
                      </div>
                    </div>
                  </div>

                  {/* Em có biết section (Styled in beautiful interactive 3D violet container with high contrast text) */}
                  <div className="bg-gradient-to-b from-purple-50 to-purple-100/30 border-2 border-purple-200 border-b-[5px] border-b-purple-300/80 rounded-2xl p-5 space-y-3 relative z-10 no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                    <div className="flex items-center gap-2 border-b border-purple-200/60 pb-2">
                      <BookMarked className="h-5 w-5 text-purple-700" />
                      <span className="text-xs font-black text-purple-800 uppercase tracking-wider">EM CÓ BIẾT? THÔNG TIN THÊM</span>
                    </div>
                    <p className="text-xs leading-relaxed text-purple-950 font-medium">
                      <strong className="text-purple-950 font-extrabold">James Prescott Joule (1818 - 1889)</strong> và <strong className="text-purple-950 font-extrabold">Julius Robert von Mayer (1814 - 1878)</strong> là hai nhà bác học lỗi lạc đặt nền móng vĩ đại cho Định luật bảo toàn năng lượng. Joule đã thiết kế thí nghiệm ròng rọc kéo tạ thả rơi khuấy nước, từ đó tìm ra chính xác mối liên hệ tương đương định lượng giữa công cơ học thực hiện và nhiệt lượng sinh ra (1 calo = 4,186 Jun). Đơn vị năng lượng Jun (J) trong hệ SI được vinh dự đặt theo tên của ông để tri ân những đóng góp bất hủ.
                    </p>
                  </div>
                  <LessonAssistant lessonId="l2" lessonTitle="Bài 2: Nội năng. Định luật I của nhiệt động lực học" />
                </div>
              )}

              {/* TAB 1: ACCURATE TEXTBOOK WITH HIGH-POLISHED INTERACTIVE SVG DIAGRAMS FOR LESSON 3 */}
              {activeLessonTab === "pdf" && selectedLesson.id === "l3" && (
                <div className="space-y-6 text-slate-800 animate-fade-in relative">
                  {/* Styled thermo-theme background container */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  <div className="absolute top-10 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
                  <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

                  <div className="border-b border-slate-200 pb-3 flex justify-between items-center relative z-10">
                    <div>
                      <h3 className="text-md font-extrabold text-slate-900">BÀI 3: NHIỆT ĐỘ. THANG NHIỆT ĐỘ. NHIỆT KẾ</h3>
                      <p className="text-[10px] text-cyan-600 font-mono mt-1 font-bold">Sách giáo khoa Vật lí 12 - Chương trình GDPT mới 2018</p>
                    </div>
                  </div>

                  {/* Section I: KHÁI NIỆM NHIỆT ĐỘ */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-teal-600 border-l-4 border-teal-500 pl-2.5 uppercase tracking-wide">I. KHÁI NIỆM NHIỆT ĐỘ & TRẠNG THÁI CÂN BẰNG NHIỆT</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Làm thế nào để cảm nhận sự truyền nhiệt năng giữa các vật tiếp xúc? Nhiệt độ là đại lượng vật lý đặc trưng cho trạng thái nhiệt của vật, cho ta biết mức độ &quot;nóng&quot; hay &quot;lạnh&quot; và chiều truyền nhiệt năng ròng vĩ mô.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* Interactive 3D Card for Section I Text Content */}
                      <div className="md:col-span-7 bg-gradient-to-b from-teal-50 to-teal-100/30 border-2 border-teal-200 border-b-[5px] border-b-teal-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <h5 className="text-xs font-black text-teal-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                          Truyền nhiệt & Cân bằng nhiệt
                        </h5>
                        <ul className="space-y-3.5 text-xs text-teal-950 font-medium">
                          <li className="leading-relaxed">
                            <strong className="text-teal-900 font-bold">Thí nghiệm thực tiễn (Trang 15 SGK):</strong> Đặt một cốc nhôm đựng nước lạnh (ví dụ 30°C) vào trong bình cách nhiệt chứa nước ấm (ví dụ 60°C).
                          </li>
                          <li className="leading-relaxed">
                            <strong className="text-teal-900 font-bold">Chiều truyền nhiệt năng:</strong> Nhiệt năng luôn tự truyền từ vật có nhiệt độ cao hơn (nước ấm) sang vật có nhiệt độ thấp hơn (nước lạnh trong cốc nhôm).
                          </li>
                          <li className="leading-relaxed">
                            <strong className="text-teal-900 font-bold">Trạng thái cân bằng nhiệt:</strong> Quá trình truyền nhiệt dừng lại khi nhiệt độ hai bên đạt mức bằng nhau. Khi đó, không còn sự truyền nhiệt năng ròng vĩ mô qua lại giữa chúng.
                          </li>
                        </ul>
                      </div>

                      {/* Section I SVG Illustration */}
                      <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-2 flex flex-col items-center shadow-inner no-override no-override-bg">
                        {renderPart3Illustration("thermal_contact_equilibrium")}
                      </div>
                    </div>
                  </div>

                  {/* Section II: THANG NHIỆT ĐỘ */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-indigo-600 border-l-4 border-indigo-500 pl-2.5 uppercase tracking-wide">II. CÁC THANG NHIỆT ĐỘ TIÊU BIỂU</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Để đo đạc định lượng nhiệt độ, ta phải thiết lập thang đo dựa trên các mốc nhiệt độ cố định có tính lặp lại tuyệt đối trong thiên nhiên dưới áp suất tiêu chuẩn.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Thang Celsius */}
                      <div className="bg-gradient-to-b from-cyan-50 to-cyan-100/30 border-2 border-cyan-200 border-b-[5px] border-b-cyan-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <h5 className="text-xs font-black text-cyan-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 border-b border-cyan-200/60 pb-1.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-500" />
                          1. Thang nhiệt độ Celsius (°C)
                        </h5>
                        <div className="text-xs leading-relaxed text-cyan-950 font-medium space-y-2">
                          Do nhà khoa học Anders Celsius đề xuất năm 1742:
                          <br />
                          - Mốc <strong>0 °C</strong>: Điểm đóng băng của nước tinh khiết.
                          <br />
                          - Mốc <strong>100 °C</strong>: Điểm sôi của nước tinh khiết dưới áp suất tiêu chuẩn.
                          <br />
                          - Khoảng cách được chia thành đúng 100 phần bằng nhau, mỗi phần tương ứng với 1 °C.
                        </div>
                        <div className="mt-4 border border-dashed border-cyan-200 rounded-xl bg-white p-2.5 text-center flex justify-center items-center">
                          {renderPart3Illustration("celsius_vs_kelvin")}
                        </div>
                      </div>

                      {/* Thang Kelvin */}
                      <div className="bg-gradient-to-b from-purple-50 to-purple-100/30 border-2 border-purple-200 border-b-[5px] border-b-purple-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <h5 className="text-xs font-black text-purple-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 border-b border-purple-200/60 pb-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-500" />
                          2. Thang nhiệt độ Kelvin (K) - Thang tuyệt đối
                        </h5>
                        <div className="text-xs leading-relaxed text-purple-950 font-medium space-y-2">
                          Do William Thomson (Lord Kelvin) thiết lập dựa trên nguyên lý nhiệt động lực học:
                          <br />
                          - Mốc <strong>0 K (Không độ tuyệt đối)</strong>: Nhiệt độ thấp nhất lý thuyết, khi mọi chuyển động nhiệt phân tử dừng hoàn toàn.
                          <br />
                          - Mốc <strong>Điểm ba của nước tinh khiết</strong>: Trạng thái cân bằng duy nhất nơi nước đá, nước lỏng và hơi nước tồn tại đồng thời, được quy ước là <strong>273,16 K</strong> (tương ứng 0,01°C).
                          <br />
                          <strong className="text-purple-900 block mt-2">Công thức liên hệ chuẩn xác:</strong>
                          <div className="text-center font-black text-purple-800 bg-white border border-purple-150 py-1.5 rounded-lg text-sm my-1 flex justify-center items-center">
                            <FormattedMathText text="$$T = t + 273,15$$" />
                          </div>
                          Do độ lớn 1 °C bằng 1 K nên độ biến thiên nhiệt độ là tương đương: <FormattedMathText text="$\Delta T = \Delta t$" />.
                        </div>
                      </div>
                    </div>

                    {/* Điểm ba của nước tinh khiết bento card */}
                    <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/30 border-2 border-emerald-200 border-b-[5px] border-b-emerald-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-8 text-xs leading-relaxed text-emerald-950 font-medium space-y-2.5">
                          <span className="text-[10px] uppercase font-mono font-black text-emerald-800 tracking-wider block border-b border-emerald-200 pb-1.5">ĐIỂM BA CỦA NƯỚC (Triple Point of Water)</span>
                          <p>
                            Điểm ba là điểm trên giản đồ trạng thái mà tại đó cả ba thể <strong>Rắn, Lỏng, Hơi</strong> của nước tinh khiết đồng thời tồn tại cân bằng nhiệt dưới áp suất hơi bão hòa cực nhỏ (khoảng 611,65 Pa).
                          </p>
                          <p>
                            Đây là một hằng số vật lý bất biến tuyệt vời được lấy làm mốc quy chuẩn cực kỳ chuẩn xác trong đo lường học quốc tế hiện đại.
                          </p>
                        </div>
                        <div className="md:col-span-4 bg-white border border-emerald-150 rounded-xl p-2 flex flex-col items-center">
                          {renderPart3Illustration("triple_point_water")}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section III: CÁC LOẠI NHIỆT KẾ */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-amber-600 border-l-4 border-amber-500 pl-2.5 uppercase tracking-wide">III. NGUYÊN LÍ HOẠT ĐỘNG CỦA CÁC LOẠI NHIỆT KẾ</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Nhiệt kế là thiết bị dùng để đo nhiệt độ. Nguyên lý chung là sử dụng các chất có tính chất vật lý (thể tích, điện trở, suất điện động, bức xạ phát xạ) thay đổi nhạy bén theo nhiệt độ.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Nhiệt kế điện trở */}
                      <div className="bg-gradient-to-b from-blue-50 to-blue-100/30 border-2 border-blue-200 border-b-[5px] border-b-blue-300/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] transition-all cursor-pointer">
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-blue-800 font-black uppercase tracking-wider block">1. Nhiệt kế điện trở Platin (Pt100)</span>
                          <p className="text-[11px] leading-relaxed text-blue-950 font-medium">
                            Dựa trên sự tăng điện trở của dây bạch kim Platin khi nhiệt độ tăng. Hoạt động cực kỳ ổn định và tuyến tính trong tầm từ -200°C đến 1000°C:
                          </p>
                          <div className="text-[11px] font-bold text-center bg-white border border-blue-150 p-1.5 rounded-lg flex justify-center items-center">
                            <FormattedMathText text="$$R_t = R_0(1 + \alpha t)$$" />
                          </div>
                        </div>
                        <div className="mt-3 bg-white border border-blue-150 rounded-lg p-1.5 flex justify-center">
                          {renderPart3Illustration("resistance_thermometer")}
                        </div>
                      </div>

                      {/* Cặp nhiệt điện */}
                      <div className="bg-gradient-to-b from-orange-50 to-orange-100/30 border-2 border-orange-200 border-b-[5px] border-b-orange-300/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] transition-all cursor-pointer">
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-orange-800 font-black uppercase tracking-wider block">2. Cặp nhiệt điện cảm biến (Thermocouple)</span>
                          <p className="text-[11px] leading-relaxed text-orange-950 font-medium">
                            Gồm hai sợi dây kim loại khác bản chất hàn kín hai đầu. Hiệu nhiệt độ giữa hai mối hàn sinh ra suất điện động nhiệt điện tỉ lệ thuận cực kỳ nhạy:
                          </p>
                          <div className="text-[11px] font-bold text-center bg-white border border-orange-150 p-1.5 rounded-lg flex justify-center items-center">
                            <FormattedMathText text="$$E = \alpha_T(T_{\text{hot}} - T_{\text{cold}})$$" />
                          </div>
                        </div>
                        <div className="mt-3 bg-white border border-orange-150 rounded-lg p-1.5 flex justify-center">
                          {renderPart3Illustration("thermocouple_sensor")}
                        </div>
                      </div>

                      {/* Nhiệt kế hồng ngoại */}
                      <div className="bg-gradient-to-b from-rose-50 to-rose-100/30 border-2 border-rose-200 border-b-[5px] border-b-rose-300/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] transition-all cursor-pointer">
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-rose-800 font-black uppercase tracking-wider block">3. Nhiệt kế hồng ngoại đo xa từ vũ trụ</span>
                          <p className="text-[11px] leading-relaxed text-rose-950 font-medium">
                            Dùng đo từ xa qua cảm biến bức xạ điện từ. Theo định luật dịch chuyển Wien, bước sóng đỉnh \lambda_max tỉ lệ nghịch với nhiệt độ tuyệt đối T:
                          </p>
                          <div className="text-[11px] font-bold text-center bg-white border border-rose-150 p-1.5 rounded-lg flex justify-center items-center">
                            <FormattedMathText text="$$\lambda_{\text{max}} T = 2,9 \times 10^{-3} \ \text{m}\cdot\text{K}$$" />
                          </div>
                        </div>
                        <div className="mt-3 bg-white border border-rose-150 rounded-lg p-1.5 flex justify-center">
                          {renderPart3Illustration("wien_radiation_spectrum")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <LessonAssistant lessonId="l3" lessonTitle="Bài 3: Nhiệt độ. Thang nhiệt độ - Nhiệt kế" />
                </div>
              )}

              {/* TAB 1: ACCURATE TEXTBOOK WITH HIGH-POLISHED INTERACTIVE SVG DIAGRAMS FOR LESSON 4 */}
              {activeLessonTab === "pdf" && selectedLesson.id === "l4" && (
                <div className="space-y-6 text-slate-800 animate-fade-in relative">
                  {/* Styled theme background container */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(249,115,22,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
                  <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

                  <div className="border-b border-slate-200 pb-3 flex justify-between items-center relative z-10">
                    <div>
                      <h3 className="text-md font-extrabold text-slate-900">BÀI 4: NHIỆT DUNG RIÊNG</h3>
                      <p className="text-[10px] text-cyan-600 font-mono mt-1 font-bold">Sách giáo khoa Vật lí 12 - Chương trình GDPT mới 2018</p>
                    </div>
                  </div>

                  {/* Section I: KHÁI NIỆM NHIỆT DUNG RIÊNG */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-amber-600 border-l-4 border-amber-500 pl-2.5 uppercase tracking-wide">I. ĐỊNH NGHĨA & Ý NGHĨA VẬT LÍ CỦA NHIỆT DUNG RIÊNG</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Khi cung cấp cùng một nhiệt lượng cho các khối chất khác nhau có cùng khối lượng, sự thay đổi nhiệt độ của chúng có giống nhau không? Đại lượng đặc trưng cho tính chất lưu trữ năng lượng nhiệt này là nhiệt dung riêng.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Thuyết định nghĩa */}
                      <div className="bg-gradient-to-b from-amber-50 to-amber-100/30 border-2 border-amber-200 border-b-[5px] border-b-amber-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <h5 className="text-xs font-black text-amber-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 border-b border-amber-200/60 pb-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          1. Định nghĩa Nhiệt dung riêng (<FormattedMathText text="c" />)
                        </h5>
                        <div className="text-xs leading-relaxed text-amber-950 font-medium space-y-2">
                          <strong>Nhiệt dung riêng (<FormattedMathText text="c" />)</strong> của một chất là nhiệt lượng cần thiết để truyền cho một đơn vị khối lượng (<FormattedMathText text="1 kg" />) chất đó để làm cho nhiệt độ của nó tăng thêm 1 Kelvin (hoặc <FormattedMathText text="1 °C" />).
                          <br />
                          - Đơn vị đo tiêu chuẩn trong hệ SI: <span className="inline-flex items-center"><FormattedMathText text="J / (kg.K)" /></span> hoặc <span className="inline-flex items-center"><FormattedMathText text="J / (kg.°C)" /></span>.
                          <br />
                          - Công thức tính gián tiếp thông qua thực nghiệm:
                          <div className="text-center font-black text-amber-800 bg-white border border-amber-150 py-1.5 rounded-lg text-sm my-1 flex justify-center items-center">
                            <FormattedMathText text="c = Q / (m * \Delta t)" />
                          </div>
                        </div>
                      </div>

                      {/* Ý nghĩa vật lí bento */}
                      <div className="bg-gradient-to-b from-orange-50 to-orange-100/30 border-2 border-orange-200 border-b-[5px] border-b-orange-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <h5 className="text-xs font-black text-orange-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 border-b border-orange-200/60 pb-1.5">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          2. Ý nghĩa vật lí & Trị số mẫu
                        </h5>
                        <div className="text-xs leading-relaxed text-orange-950 font-medium space-y-2">
                          Nhiệt dung riêng cho biết khả năng hấp thụ hoặc giữ nhiệt lượng của một vật chất:
                          <ul className="list-disc list-inside pl-1 mt-1 space-y-1">
                            <li><strong>Nhiệt dung riêng càng lớn:</strong> Vật hấp thụ rất nhiều nhiệt lượng mới nóng lên, đồng thời giữ nhiệt rất tốt và nguội đi rất chậm.</li>
                            <li><strong>Bảng giá trị so sánh điển hình:</strong>
                              <div className="grid grid-cols-2 gap-2 mt-1 bg-white/60 p-1.5 rounded-lg border border-orange-100 text-[10.5px]">
                                <div className="flex items-center gap-1">• Nước: <FormattedMathText text="4200 J/(kg.K)" /></div>
                                <div className="flex items-center gap-1">• Không khí: <FormattedMathText text="1010 J/(kg.K)" /></div>
                                <div className="flex items-center gap-1">• Thép/Sắt: <FormattedMathText text="460 J/(kg.K)" /></div>
                                <div className="flex items-center gap-1">• Đồng: <FormattedMathText text="380 J/(kg.K)" /></div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section II: CÔNG THỨC TÍNH NHIỆT LƯỢNG */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-blue-600 border-l-4 border-blue-500 pl-2.5 uppercase tracking-wide">II. CÔNG THỨC TÍNH NHIỆT LƯỢNG THU VÀO / TỎA RA</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Để tính toán lượng nhiệt năng trao đổi khi một vật thay đổi nhiệt độ mà không có sự chuyển thể, ta sử dụng công thức thực nghiệm kinh điển sau.
                    </p>

                    <div className="bg-gradient-to-b from-blue-50 to-blue-100/30 border-2 border-blue-200 border-b-[5px] border-b-blue-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-8 text-xs leading-relaxed text-blue-950 font-medium space-y-2.5">
                          <span className="text-[10px] uppercase font-mono font-black text-blue-800 tracking-wider block border-b border-blue-200 pb-1.5">HỆ THỨC TÍNH NHIỆT LƯỢNG (<FormattedMathText text="Q" />)</span>
                          <div className="text-center font-black text-blue-900 bg-white border border-blue-150 py-2.5 rounded-xl text-lg shadow-inner flex justify-center items-center">
                            <FormattedMathText text="Q = m * c * \Delta t = m * c * (t_2 - t_1)" />
                          </div>
                          <div className="space-y-1.5 pl-1">
                            <div className="flex flex-wrap items-center gap-x-1">• <strong className="text-blue-900">Q (Jun - J):</strong> Nhiệt lượng trao đổi. <strong className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200 inline-flex items-center"><FormattedMathText text="Q > 0" /></strong>: Hệ thu nhiệt lượng; <strong className="text-red-700 bg-red-50 px-1 py-0.5 rounded border border-red-200 inline-flex items-center"><FormattedMathText text="Q < 0" /></strong>: Hệ tỏa nhiệt lượng.</div>
                            <div className="flex flex-wrap items-center gap-x-1">• <strong className="text-blue-900">m:</strong> Khối lượng của vật chất trao đổi (tính bằng <FormattedMathText text="kg" />).</div>
                            <div className="flex flex-wrap items-center gap-x-1">• <strong className="text-blue-900">c:</strong> Nhiệt dung riêng của chất cấu tạo nên vật (tính bằng <FormattedMathText text="J/(kg.K)" />).</div>
                            <div className="flex flex-wrap items-center gap-x-1">• <strong className="text-blue-900">\Delta t = t_2 - t_1:</strong> Độ biến thiên nhiệt độ (Nhiệt độ cuối trừ nhiệt độ đầu, tính bằng <FormattedMathText text="°C" /> hoặc <FormattedMathText text="K" />).</div>
                          </div>
                        </div>
                        <div className="md:col-span-4 bg-white border border-blue-150 rounded-xl p-2 flex flex-col items-center shadow-inner">
                          {renderPart3Illustration("specific_heat_experiment")}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section III: ĐO THỰC NGHIỆM */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-teal-600 border-l-4 border-teal-500 pl-2.5 uppercase tracking-wide">III. PHƯƠNG PHÁP ĐO NHIỆT DUNG RIÊNG BẰNG THỰC NGHIỆM</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Làm sao để đo đạc và nghiệm lại nhiệt dung riêng của một chất trong phòng thí nghiệm? Phương pháp phổ biến nhất là sử dụng bình nhiệt lượng kế cách nhiệt để đo năng lượng cấp vào.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* Interactive 3D Card for Section III Text Content */}
                      <div className="md:col-span-7 bg-gradient-to-b from-teal-50 to-teal-100/30 border-2 border-teal-200 border-b-[5px] border-b-teal-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <h5 className="text-xs font-black text-teal-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                          Tiến trình đo trong phòng thí nghiệm
                        </h5>
                        <ul className="space-y-3.5 text-xs text-teal-950 font-medium">
                          <li className="leading-relaxed">
                            <strong className="text-teal-900 font-bold">1. Chuẩn bị dụng cụ:</strong> Cân khối lượng nước <FormattedMathText text="m" />, đổ vào nhiệt lượng kế. Đo nhiệt độ ban đầu <FormattedMathText text="t_1" />.
                          </li>
                          <li className="leading-relaxed">
                            <strong className="text-teal-900 font-bold">2. Cấp nhiệt lượng:</strong> Mắc cuộn điện trở vào nguồn điện. Đo hiệu điện thế <FormattedMathText text="U" /> và cường độ dòng điện <FormattedMathText text="I" />. Bật nguồn điện gia nhiệt trong khoảng thời gian <FormattedMathText text="\tau" />.
                          </li>
                          <li className="leading-relaxed">
                            <strong className="text-teal-900 font-bold">3. Đo nhiệt độ cuối:</strong> Khuấy nhẹ nước trong nhiệt lượng kế, đo nhiệt độ cực đại đạt được là <FormattedMathText text="t_2" />.
                          </li>
                          <li className="leading-relaxed">
                            <strong className="text-teal-900 font-bold">4. Tính toán kết quả:</strong> Nhiệt lượng tỏa ra từ cuộn dây là <span className="inline-flex items-center"><FormattedMathText text="Q_toa = U * I * \tau" /></span>. Nếu coi hao phí nhiệt ra môi trường không đáng kể, nhiệt lượng tỏa bằng nhiệt lượng nước thu vào:
                            <div className="text-center font-black text-teal-800 bg-white border border-teal-150 py-2 rounded-lg my-1.5 text-xs flex justify-center items-center">
                              <FormattedMathText text="U * I * \tau = (m * c + m_k * c_k) * (t_2 - t_1)" />
                            </div>
                            Trong đó <FormattedMathText text="m_k" />, <FormattedMathText text="c_k" /> là khối lượng và nhiệt dung riêng của vỏ bình trong nhiệt lượng kế (nếu bỏ qua bình thì <span className="inline-flex items-center"><FormattedMathText text="U * I * \tau = m * c * \Delta t \rightarrow c = (U * I * \tau) / (m * (t_2 - t_1))" /></span>).
                          </li>
                        </ul>
                      </div>

                      {/* Section III SVG Illustration (Water vs Sand) */}
                      <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-2 flex flex-col items-center shadow-inner no-override no-override-bg">
                        {renderPart3Illustration("water_vs_sand")}
                      </div>
                    </div>
                  </div>

                  {/* Section IV: ỨNG DỤNG CỦA NƯỚC */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-indigo-600 border-l-4 border-indigo-500 pl-2.5 uppercase tracking-wide">IV. VAI TRÒ ĐIỀU HÒA KHÍ HẬU VÀ ỨNG DỤNG CỦA NƯỚC</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Do có nhiệt dung riêng cực lớn (~ 4200 J/kg.K), nước đóng vai trò vô cùng thiết yếu trong việc cân bằng môi trường sinh thái địa cầu và ứng dụng kỹ thuật công nghệ.
                    </p>

                    <div className="bg-gradient-to-b from-indigo-50 to-indigo-100/30 border-2 border-indigo-200 border-b-[5px] border-b-indigo-300/80 rounded-2xl p-5 space-y-3.5 relative z-10 no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                      <div className="flex items-center gap-2 border-b border-indigo-200 pb-2">
                        <BookMarked className="h-5 w-5 text-indigo-700" />
                        <span className="text-xs font-black text-indigo-800 uppercase tracking-wider">ỨNG DỤNG ĐỜI SỐNG VÀ KỸ THUẬT</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-indigo-950 font-medium leading-relaxed">
                        <div className="space-y-2">
                          <p className="text-indigo-900 font-bold uppercase tracking-wider text-[11px] border-b border-indigo-100 pb-1">
                            1. Điều hòa khí hậu toàn cầu
                          </p>
                          <p>
                            Vào mùa hè, khi nhận bức xạ nhiệt mạnh của mặt trời, các dòng nước sông hồ đại dương nóng lên rất chậm hơn so với đất đá trên lục địa. Do đó nhiệt độ không khí trên mặt biển thấp hơn trên đất liền, tạo ra các luồng gió biển thổi từ đại dương vào lục địa làm mát khí hậu ven bờ. Ngược lại vào mùa đông, nước biển giữ nhiệt lâu và nguội đi rất chậm, tỏa lượng nhiệt năng khổng lồ sưởi ấm cho không khí xung quanh, giúp ôn hòa biên độ nhiệt giữa mùa đông và mùa hè.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-indigo-900 font-bold uppercase tracking-wider text-[11px] border-b border-indigo-100 pb-1">
                            2. Tác nhân tải nhiệt trong kỹ thuật
                          </p>
                          <p>
                            Nhờ đặc tính hấp thụ năng lượng nhiệt cực lớn mà chỉ tăng một lượng nhiệt độ nhỏ, nước tuần hoàn được ứng dụng làm chất truyền nhiệt hoặc làm mát trong:
                          </p>
                          <ul className="list-disc list-inside space-y-1 pl-1 font-semibold text-indigo-900">
                            <li>Hệ thống két nước làm mát động cơ đốt trong ô tô, xe máy.</li>
                            <li>Hệ thống tản nhiệt làm mát cho lò phản ứng hạt nhân hạt nhân vĩ mô.</li>
                            <li>Sử dụng trong các lò sưởi hơi nước tuần hoàn gia đình tại các nước hàn đới lạnh giá vào mùa đông.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <LessonAssistant lessonId="l4" lessonTitle="Bài 4: Nhiệt dung riêng" />
                </div>
              )}

              {/* TAB 1: ACCURATE TEXTBOOK WITH HIGH-POLISHED INTERACTIVE SVG DIAGRAMS FOR LESSON 5 */}
              {activeLessonTab === "pdf" && selectedLesson.id === "l5" && (
                <div className="space-y-6 text-slate-800 animate-fade-in relative">
                  {/* Styled theme background container */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
                  <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                  <div className="border-b border-slate-200 pb-3 flex justify-between items-center relative z-10">
                    <div>
                      <h3 className="text-md font-extrabold text-slate-900">BÀI 5: NHIỆT NÓNG CHẢY RIÊNG</h3>
                      <p className="text-[10px] text-emerald-600 font-mono mt-1 font-bold">Sách giáo khoa Vật lí 12 - Chương trình GDPT mới 2018</p>
                    </div>
                  </div>

                  {/* Section I: KHÁI NIỆM SỰ NÓNG CHẢY */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-emerald-600 border-l-4 border-emerald-500 pl-2.5 uppercase tracking-wide">I. KHÁI NIỆM SỰ NÓNG CHẢY & CẤU TRÚC VI MÔ</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Khi cung cấp nhiệt cho một chất rắn tinh thể, các hạt (phân tử, nguyên tử, ion) ở nút mạng bắt đầu dao động mạnh lên. Khi đạt đến nhiệt độ nóng chảy nhất định dưới áp suất xác định, động năng dao động đủ lớn để thắng được lực liên kết tinh thể tuần hoàn vĩ mô. Các hạt bứt ra khỏi nút mạng tinh thể, trật tự mạng bị phá vỡ hoàn toàn, đưa chất chuyển trạng thái từ thể rắn sang lỏng.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Thuyết định nghĩa */}
                      <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/30 border-2 border-emerald-200 border-b-[5px] border-b-emerald-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <h5 className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 border-b border-emerald-200/60 pb-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Đặc điểm quá trình nóng chảy
                        </h5>
                        <ul className="text-xs leading-relaxed text-emerald-950 font-medium space-y-2.5 list-disc list-inside">
                          <li><strong>Nhiệt độ nóng chảy xác định:</strong> Các chất rắn kết tinh (như kim loại, nước đá) nóng chảy ở một nhiệt độ cố định không đổi dưới áp suất chuẩn xác định.</li>
                          <li><strong>Nhiệt độ không đổi trong quá trình nóng chảy:</strong> Trong suốt thời gian chất rắn đang tan chảy, dù ta tiếp tục cấp nhiệt năng liên tục, nhiệt độ của hệ vẫn giữ cố định.</li>
                          <li><strong>Chuyển hóa năng lượng:</strong> Nhiệt lượng cung cấp không làm tăng động năng trung bình phân tử (nên nhiệt độ không tăng), mà được dùng để bẻ gãy lực liên kết phân tử, làm tăng thế năng tương tác của chúng.</li>
                        </ul>
                      </div>

                      {/* Phá vỡ tinh thể bento */}
                      <div className="bg-gradient-to-b from-blue-50 to-blue-100/30 border-2 border-blue-200 border-b-[5px] border-b-blue-300/80 rounded-2xl p-4 flex flex-col items-center justify-between shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] transition-all cursor-pointer">
                        <span className="text-[9px] font-mono text-blue-800 font-extrabold mb-2 uppercase">MÔ PHỎNG VI MÔ: SỰ PHÁ VỠ MẠNG TINH THỂ</span>
                        <div className="w-full h-32 bg-white rounded-xl border border-blue-150 flex items-center justify-center p-1 shadow-inner no-override no-override-bg">
                          <svg className="w-full h-full" viewBox="0 0 200 100">
                            {/* Left Side: Solid Lattice */}
                            <rect x="10" y="10" width="80" height="80" fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="2" rx="4" />
                            <text x="50" y="22" fill="#475569" textAnchor="middle" className="text-[7px] font-black font-sans">THỂ RẮN (Đá 0°C)</text>
                            
                            {/* Grid lines for solid */}
                            <line x1="25" y1="35" x2="75" y2="35" stroke="#cbd5e1" strokeWidth="0.8" />
                            <line x1="25" y1="55" x2="75" y2="55" stroke="#cbd5e1" strokeWidth="0.8" />
                            <line x1="25" y1="75" x2="75" y2="75" stroke="#cbd5e1" strokeWidth="0.8" />
                            <line x1="25" y1="35" x2="25" y2="75" stroke="#cbd5e1" strokeWidth="0.8" />
                            <line x1="50" y1="35" x2="50" y2="75" stroke="#cbd5e1" strokeWidth="0.8" />
                            <line x1="75" y1="35" x2="75" y2="75" stroke="#cbd5e1" strokeWidth="0.8" />

                            {/* Hexagonal dots linked (solid) */}
                            <circle cx="25" cy="35" r="3" fill="#3b82f6" />
                            <circle cx="50" cy="35" r="3" fill="#3b82f6" />
                            <circle cx="75" cy="35" r="3" fill="#3b82f6" />
                            <circle cx="25" cy="55" r="3" fill="#3b82f6" />
                            <circle cx="50" cy="55" r="3" fill="#ef4444" className="animate-ping" /> {/* Melting point node */}
                            <circle cx="50" cy="55" r="3" fill="#3b82f6" />
                            <circle cx="75" cy="55" r="3" fill="#3b82f6" />
                            <circle cx="25" cy="75" r="3" fill="#3b82f6" />
                            <circle cx="50" cy="75" r="3" fill="#3b82f6" />
                            <circle cx="75" cy="75" r="3" fill="#3b82f6" />

                            {/* Middle Arrow */}
                            <path d="M 94 50 L 106 50" fill="none" stroke="#ea580c" strokeWidth="1.5" markerEnd="url(#arrowOrangeTiny)" />
                            <text x="100" y="44" fill="#ea580c" textAnchor="middle" className="text-[6px] font-black font-mono">Đun nóng</text>

                            {/* Right Side: Liquid State */}
                            <rect x="110" y="10" width="80" height="80" fill="#f0f9ff" stroke="#bae6fd" strokeDasharray="2" rx="4" />
                            <text x="150" y="22" fill="#0284c7" textAnchor="middle" className="text-[7px] font-black font-sans">THỂ LỎNG (Nước 0°C)</text>
                            
                            {/* Scattered water particles */}
                            <circle cx="120" cy="38" r="3" fill="#0284c7" />
                            <circle cx="132" cy="52" r="3" fill="#0284c7" />
                            <circle cx="118" cy="65" r="3" fill="#0284c7" />
                            <circle cx="145" cy="40" r="3" fill="#0284c7" />
                            <circle cx="152" cy="75" r="3" fill="#0284c7" />
                            <circle cx="168" cy="58" r="3" fill="#0284c7" />
                            <circle cx="178" cy="35" r="3" fill="#0284c7" />
                            <circle cx="142" cy="60" r="3" fill="#0284c7" />
                            <circle cx="165" cy="78" r="3" fill="#0284c7" />
                            <circle cx="172" cy="46" r="3" fill="#0284c7" />
                          </svg>
                        </div>
                        <span className="text-[8px] text-slate-700 italic mt-2 text-center leading-snug font-semibold">
                          Ở thể lỏng (phải), các phân tử bứt ra khỏi nút mạng tinh thể và trượt lên nhau hỗn loạn
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Section II: ĐỊNH NGHĨA & Ý NGHĨA NHIỆT NÓNG CHẢY RIÊNG */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-blue-600 border-l-4 border-blue-500 pl-2.5 uppercase tracking-wide">II. ĐỊNH NGHĨA & CÔNG THỨC NHIỆT NÓNG CHẢY RIÊNG</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Để chuyển đổi trạng thái một đơn vị khối lượng chất rắn kết tinh hoàn toàn sang thể lỏng cần bao nhiêu năng lượng? Nhiệt nóng chảy riêng chính là thước đo độ mạnh yếu của liên kết cấu trúc tinh thể đó.
                    </p>

                    <div className="bg-gradient-to-b from-blue-50 to-blue-100/30 border-2 border-blue-200 border-b-[5px] border-b-blue-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-7 text-xs leading-relaxed text-blue-950 font-medium space-y-2.5">
                          <span className="text-[10px] uppercase font-mono font-black text-blue-800 tracking-wider block border-b border-blue-200 pb-1.5">HỆ THỨC TÍNH NHIỆT LƯỢNG NÓNG CHẢY (Q)</span>
                          <div className="text-center font-mono font-black text-blue-900 bg-white border border-blue-150 py-2.5 rounded-xl text-lg shadow-inner flex items-center justify-center gap-1">
                            <FormattedMathText text="Q = \lambda * m" />
                          </div>
                          <div className="space-y-1.5 pl-1 text-[11px]">
                            <div className="flex items-center gap-1 flex-wrap">• <strong className="text-blue-900"><FormattedMathText text="Q" /> (Jun - J):</strong> Nhiệt lượng cần cung cấp. <span className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-bold border border-emerald-200 inline-flex items-center gap-1 text-[10px]"><FormattedMathText text="Q > 0" /></span>: Hệ thu nhiệt lượng.</div>
                            <div className="flex items-center gap-1">• <strong className="text-blue-900"><FormattedMathText text="m" /> (kg):</strong> Khối lượng chất rắn nóng chảy hoàn toàn.</div>
                            <div className="flex items-center gap-1">• <strong className="text-blue-900 font-extrabold"><FormattedMathText text="\lambda" /> (J/kg):</strong> Nhiệt nóng chảy riêng của chất rắn kết tinh.</div>
                          </div>
                        </div>

                        <div className="md:col-span-5 bg-gradient-to-b from-emerald-50 to-emerald-100/40 border border-emerald-200 rounded-xl p-4 space-y-2">
                          <span className="text-[9px] font-mono text-emerald-800 font-black uppercase tracking-wider block">BẢNG NHIỆT NÓNG CHẢY RIÊNG λ ĐIỂN HÌNH</span>
                          <div className="space-y-1.5 font-mono text-[10.5px] text-emerald-950">
                            <div className="flex justify-between items-center border-b border-emerald-200/50 pb-1">
                              <span>• Nước đá:</span>
                              <span className="font-bold inline-flex items-center"><FormattedMathText text="3,4 * 10^5 J/kg" /></span>
                            </div>
                            <div className="flex justify-between items-center border-b border-emerald-200/50 pb-1">
                              <span>• Đồng:</span>
                              <span className="font-bold inline-flex items-center"><FormattedMathText text="1,8 * 10^5 J/kg" /></span>
                            </div>
                            <div className="flex justify-between items-center border-b border-emerald-200/50 pb-1">
                              <span>• Chì:</span>
                              <span className="font-bold inline-flex items-center"><FormattedMathText text="0,25 * 10^5 J/kg" /></span>
                            </div>
                            <div className="flex justify-between items-center pb-0.5">
                              <span>• Thép:</span>
                              <span className="font-bold inline-flex items-center"><FormattedMathText text="2,7 * 10^5 J/kg" /></span>
                            </div>
                          </div>
                          <p className="text-[9.5px] text-emerald-800 font-medium leading-relaxed italic border-t border-emerald-200/50 pt-1">
                            Nước đá có λ lớn vượt trội so với kim loại thông thường, nghĩa là cực bền và cần nhiều nhiệt để dãn tan mạng.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section III: THÍ NGHIỆM ĐO NHIỆT NÓNG CHẢY RIÊNG NƯỚC ĐÁ */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-teal-600 border-l-4 border-teal-500 pl-2.5 uppercase tracking-wide">III. PHƯƠNG PHÁP ĐO THỰC NGHIỆM NHIỆT NÓNG CHẢY RIÊNG CỦA NƯỚC ĐÁ</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Để đo đạc và nghiệm lại nhiệt nóng chảy riêng λ của nước đá trong phòng thí nghiệm, ta dùng phương pháp cân bằng nhiệt giữa nước đá ở 0°C và nước ấm trong nhiệt lượng kế cách nhiệt.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* Interactive 3D Card for Section III Text Content */}
                      <div className="md:col-span-7 bg-gradient-to-b from-teal-50 to-teal-100/30 border-2 border-teal-200 border-b-[5px] border-b-teal-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <h5 className="text-xs font-black text-teal-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                          Nguyên tắc và quy trình thí nghiệm đo
                        </h5>
                        <ul className="space-y-3.5 text-xs text-teal-950 font-medium leading-relaxed list-decimal list-inside">
                          <li>
                            <strong>Chuẩn bị mẫu nước ấm:</strong> Đổ một lượng nước ấm khối lượng <span className="inline-flex items-center align-middle mx-0.5"><FormattedMathText text="m_1" /></span> vào bình nhiệt lượng kế cách nhiệt có khối lượng ruột bình là <span className="inline-flex items-center align-middle mx-0.5"><FormattedMathText text="m_k" /></span>. Đo nhiệt độ ban đầu <span className="inline-flex items-center align-middle mx-0.5"><FormattedMathText text="t_1" /></span> của hệ ấm.
                          </li>
                          <li>
                            <strong>Thả nước đá đang tan:</strong> Chọn các mẩu nước đá nhỏ ở nhiệt độ <span className="inline-flex items-center align-middle mx-0.5"><FormattedMathText text="0\ °C" /></span> đã được lau khô bề mặt, thả nhẹ nhàng vào bình.
                          </li>
                          <li>
                            <strong>Khuấy đều và đọc nhiệt độ:</strong> Khuấy đều cho đến khi nước đá tan chảy hoàn toàn. Đo nhiệt độ cân bằng cuối cùng đạt được của hệ hỗn hợp là <span className="inline-flex items-center align-middle mx-0.5"><FormattedMathText text="t_cb" /></span>.
                          </li>
                          <li>
                            <strong>Cân khối lượng nước đá:</strong> Đem cân lại tổng khối lượng hệ để trừ ra chính xác khối lượng nước đá đã thả vào là <span className="inline-flex items-center align-middle mx-0.5"><FormattedMathText text="m_2" /></span>.
                          </li>
                          <li className="list-none pt-2 border-t border-teal-200/50 space-y-1.5">
                            <strong className="text-teal-900 block font-bold">Thiết lập phương trình cân bằng nhiệt lượng:</strong>
                            <div className="bg-teal-950 text-teal-100 font-mono text-[11px] font-bold p-2.5 rounded-xl shadow-inner leading-relaxed text-center flex flex-col items-center justify-center gap-1.5">
                              <FormattedMathText text="Q_thu = Q_toa" />
                              <FormattedMathText text="m_2 * \lambda + m_2 * c_n * t_cb = (m_1 * c_n + m_k * c_k) * (t_1 - t_cb)" />
                            </div>
                            <p className="text-[10px] text-teal-800/85 flex items-center gap-1 mt-1.5">
                              Từ hệ thức này, ta giải tìm ra chính xác giá trị thực nghiệm của <span className="inline-flex items-center"><FormattedMathText text="\lambda" /></span> của nước đá.
                            </p>
                          </li>
                        </ul>
                      </div>

                      {/* Section III SVG Illustration (Calorimeter with melting ice cubes) */}
                      <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col items-center shadow-inner no-override no-override-bg">
                        <span className="text-[9px] font-mono text-slate-700 font-extrabold mb-2 uppercase">HÌNH 5.1. THÍ NGHIỆM ĐO NHIỆT NÓNG CHẢY RIÊNG CỦA ĐÁ</span>
                        <div className="w-full h-44 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center relative overflow-hidden no-override no-override-bg">
                          <svg className="w-full h-full" viewBox="0 0 160 110">
                            {/* Insulated Calorimeter outer wall */}
                            <rect x="35" y="15" width="90" height="80" fill="none" stroke="#475569" strokeWidth="2.5" rx="5" />
                            <rect x="40" y="20" width="80" height="70" fill="#f8fafc" stroke="#64748b" strokeWidth="1" rx="3" />
                            
                            {/* Water inside (Warm water) */}
                            <rect x="41" y="45" width="78" height="44" fill="#38bdf8" fillOpacity="0.2" rx="1.5" />
                            
                            {/* Melting Ice Cubes on bottom */}
                            <g transform="translate(48, 70)">
                              <rect x="0" y="0" width="12" height="12" rx="1.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" transform="rotate(12)" />
                              <line x1="2" y1="2" x2="10" y2="10" stroke="#38bdf8" strokeWidth="0.5" opacity="0.4" />
                            </g>
                            <g transform="translate(65, 75)">
                              <rect x="0" y="0" width="10" height="10" rx="1.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" transform="rotate(-15)" />
                              <line x1="2" y1="2" x2="8" y2="8" stroke="#38bdf8" strokeWidth="0.5" opacity="0.4" />
                            </g>
                            <g transform="translate(85, 72)">
                              <rect x="0" y="0" width="11" height="11" rx="1.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" transform="rotate(5)" />
                            </g>
 
                            {/* Water ripples */}
                            <path d="M 43 45 Q 60 42 80 45 Q 100 48 117 45" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3" />
 
                            {/* Thermometer */}
                            <rect x="100" y="10" width="6" height="72" fill="#e2e8f0" stroke="#475569" strokeWidth="0.8" rx="2" />
                            <rect x="102" y="48" width="2" height="32" fill="#ef4444" />
                            <circle cx="103" cy="80" r="3" fill="#ef4444" />
 
                            {/* Stirrer */}
                            <line x1="65" y1="8" x2="65" y2="68" stroke="#64748b" strokeWidth="2.5" />
                            <rect x="52" y="66" width="26" height="4" fill="#475569" rx="0.5" />
                            <rect x="58" y="4" width="14" height="6" fill="#475569" rx="1" />
 
                            {/* Labels */}
                            <text x="80" y="40" fill="#0369a1" textAnchor="middle" className="text-[6.5px] font-bold font-mono">Nước ấm (m1, c_n)</text>
                            <text x="68" y="90" fill="#0284c7" textAnchor="middle" className="text-[6px] font-black font-sans">Đá đang tan (m2, λ)</text>
                            <text x="110" y="8" fill="#475569" className="text-[5.5px] font-mono">Nhiệt kế</text>
                            <text x="52" y="12" fill="#475569" className="text-[5.5px] font-mono">Khuấy</text>
                          </svg>
                        </div>
                        <span className="text-[8.5px] text-slate-700 italic mt-2.5 text-center leading-snug font-semibold">
                          Bình nhiệt lượng kế cách nhiệt giúp giảm thiểu tối đa hao phí nhiệt lượng truyền ra ngoài môi trường.
                        </span>
                      </div>
                    </div>
                  </div>
 
                  {/* Section IV: TÓM TẮT BÀI HỌC BẰNG INFOGRAPHIC */}
                  <div className="bg-gradient-to-b from-purple-50 to-purple-100/30 border-2 border-purple-200 border-b-[5px] border-b-purple-300/80 rounded-2xl p-5 space-y-3 relative z-10 no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                    <div className="flex items-center gap-2 border-b border-purple-200/60 pb-2">
                      <BookMarked className="h-5 w-5 text-purple-700" />
                      <span className="text-xs font-black text-purple-800 uppercase tracking-wider">TÓM TẮT TRỌNG TÂM - ÔN THI THPT</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-purple-950 font-medium leading-relaxed">
                      <div className="bg-white/60 p-3 rounded-xl border border-purple-100">
                        <span className="font-extrabold text-purple-900 block mb-1">1. ĐỒNG ĐỀU NHIỆT ĐỘ</span>
                        Quá trình nóng chảy của chất kết tinh diễn ra ở nhiệt độ không đổi <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="t_c" /></span>. Toàn bộ nhiệt lượng thu vào dùng để phá vỡ cấu trúc tinh thể rắn.
                      </div>
                      <div className="bg-white/60 p-3 rounded-xl border border-purple-100">
                        <span className="font-extrabold text-purple-900 block mb-1">2. Ý NGHĨA \lambda</span>
                        Nhiệt nóng chảy riêng <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="\lambda" /></span> đặc trưng cho năng lượng liên kết tinh thể. Chất có <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="\lambda" /></span> càng lớn, tinh thể càng bền, cần nhiều nhiệt để nóng chảy.
                      </div>
                      <div className="bg-white/60 p-3 rounded-xl border border-purple-100">
                        <span className="font-extrabold text-purple-900 block mb-1">3. CÔNG THỨC VÀNG</span>
                        Hệ thức nhiệt lượng chuyển thể: <span className="inline-flex items-center align-middle bg-purple-100 border border-purple-200 px-1.5 py-0.5 rounded font-bold"><FormattedMathText text="Q = \lambda * m" /></span>. Đơn vị J/kg. Luôn bám sát mốc nhiệt độ nóng chảy <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="t_c" /></span>.
                      </div>
                    </div>
                  </div>
                  <LessonAssistant lessonId="l5" lessonTitle="Bài 5: Nhiệt nóng chảy riêng" />
                </div>
              )}

              {/* TAB 1: ACCURATE TEXTBOOK WITH HIGH-POLISHED INTERACTIVE SVG DIAGRAMS FOR LESSON 6 */}
              {activeLessonTab === "pdf" && selectedLesson.id === "l6" && (
                <div className="space-y-6 text-slate-800 animate-fade-in relative">
                  {/* Styled theme background container */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,63,94,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,88,12,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  <div className="absolute top-10 right-10 w-96 h-96 bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />
                  <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

                  <div className="border-b border-slate-200 pb-3 flex justify-between items-center relative z-10">
                    <div>
                      <h3 className="text-md font-extrabold text-slate-900">BÀI 6: NHIỆT HÓA HƠI RIÊNG</h3>
                      <p className="text-[10px] text-rose-600 font-mono mt-1 font-bold">Sách giáo khoa Vật lí 12 - Chương trình GDPT mới 2018</p>
                    </div>
                  </div>

                  {/* Section I: KHÁI NIỆM SỰ HÓA HƠI */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-rose-600 border-l-4 border-rose-500 pl-2.5 uppercase tracking-wide">I. KHÁI NIỆM SỰ HÓA HƠI & SỰ SÔI (GÓC NHÌN VI MÔ)</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Sự hóa hơi là quá trình chuyển thể từ lỏng sang khí. Sự hóa hơi diễn ra dưới hai hình thức là bay hơi và sôi, mang những đặc tính vật lý vi mô và vĩ mô hoàn toàn riêng biệt.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                      {/* Thuyết định nghĩa */}
                      <div className="md:col-span-7 bg-gradient-to-b from-rose-50 to-rose-100/30 border-2 border-rose-200 border-b-[5px] border-b-rose-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <h5 className="text-xs font-black text-rose-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 border-b border-rose-200/60 pb-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                          Phân biệt Bay hơi & Sôi
                        </h5>
                        <ul className="text-xs leading-relaxed text-rose-950 font-medium space-y-3">
                          <li>
                            <strong className="text-rose-900 font-bold">Sự bay hơi (Evaporation):</strong> Là sự hóa hơi chỉ xảy ra ở <strong>bề mặt thoáng</strong> của chất lỏng. Quá trình này diễn ra ở <strong>mọi nhiệt độ</strong>.
                            <br />
                            <span className="text-slate-500 text-[11px] block mt-1 pl-3 border-l border-slate-300">
                              <em>Giải thích vi mô:</em> Các phân tử lỏng ở bề mặt có động năng lớn hơn động năng trung bình sẽ thắng được lực liên kết của các phân tử xung quanh và bứt ra khỏi mặt thoáng trở thành phân tử hơi.
                            </span>
                          </li>
                          <li>
                            <strong className="text-rose-900 font-bold">Sự sôi (Boiling):</strong> Là sự hóa hơi xảy ra đồng thời ở <strong>cả trong lòng và bề mặt thoáng</strong> của chất lỏng. Quá trình này chỉ xảy ra ở <strong>nhiệt độ sôi xác định</strong> của chất lỏng dưới áp suất ngoài cho trước.
                            <br />
                            <span className="text-slate-500 text-[11px] block mt-1 pl-3 border-l border-slate-300">
                              <em>Giải thích vi mô:</em> Khi đạt nhiệt độ sôi, áp suất hơi bão hòa trong các bọt khí bằng áp suất ngoài. Các bọt khí nổi lên và vỡ tung ở mặt thoáng, giải phóng hơi khí cực mạnh. Trong suốt quá trình sôi, nhiệt độ chất lỏng được giữ <strong>hoàn toàn không đổi</strong>.
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* SVG Bay hơi vs Sôi */}
                      <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center shadow-inner no-override no-override-bg">
                        <span className="text-[9px] font-mono text-slate-700 font-extrabold mb-2 uppercase">HÌNH 6.1. BAY HƠI VÀ SÔI Ở CẤP ĐỘ VI MÔ</span>
                        <div className="w-full h-44 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center relative overflow-hidden no-override no-override-bg">
                          <svg className="w-full h-full" viewBox="0 0 220 120">
                            {/* Left Box: Evaporation */}
                            <rect x="10" y="20" width="90" height="75" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="4" />
                            <text x="55" y="14" fill="#0369a1" textAnchor="middle" className="text-[7px] font-black font-sans">1. BAY HƠI (Mọi nhiệt độ)</text>
                            
                            {/* Liquid surface left */}
                            <path d="M 10,55 Q 32.5,52 55,55 Q 77.5,58 100,55" fill="none" stroke="#0284c7" strokeWidth="1.5" />
                            <rect x="11" y="56" width="88" height="38" fill="#e0f2fe" fillOpacity="0.4" rx="2" />
                            
                            {/* Left molecules inside and escaping */}
                            <circle cx="20" cy="70" r="2.5" fill="#0284c7" />
                            <circle cx="35" cy="85" r="2.5" fill="#0284c7" />
                            <circle cx="50" cy="72" r="2.5" fill="#0284c7" />
                            <circle cx="68" cy="88" r="2.5" fill="#0284c7" />
                            <circle cx="85" cy="74" r="2.5" fill="#0284c7" />
                            
                            {/* Escaping molecules on surface */}
                            <g transform="translate(30, 48)">
                              <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
                              <path d="M 0,0 C -2,-5 -5,-10 -2,-15" fill="none" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="1" />
                            </g>
                            <g transform="translate(70, 46)">
                              <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
                              <path d="M 0,0 C 2,-5 5,-10 2,-15" fill="none" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="1" />
                            </g>
                            <text x="55" y="90" fill="#0369a1" textAnchor="middle" className="text-[5.5px] font-mono">Chỉ hóa hơi từ mặt thoáng</text>

                            {/* Middle Separator line */}
                            <line x1="110" y1="10" x2="110" y2="110" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2" />

                            {/* Right Box: Boiling */}
                            <rect x="120" y="20" width="90" height="75" fill="#fcf6f6" stroke="#fca5a5" strokeWidth="1" rx="4" />
                            <text x="165" y="14" fill="#be123c" textAnchor="middle" className="text-[7px] font-black font-sans">2. SÔI (Đúng nhiệt độ t_s)</text>
                            
                            {/* Liquid surface right */}
                            <path d="M 120,55 Q 142.5,58 165,55 Q 187.5,52 210,55" fill="none" stroke="#be123c" strokeWidth="1.5" />
                            <rect x="121" y="56" width="88" height="38" fill="#ffe4e6" fillOpacity="0.4" rx="2" />

                            {/* Heat fire icon at bottom */}
                            <g transform="translate(155, 100)">
                              <path d="M -8,5 Q 0,-10 8,5 Z" fill="#ef4444" />
                              <path d="M -4,5 Q 0,-4 4,5 Z" fill="#f97316" />
                            </g>

                            {/* Vapor Bubbles rising inside liquid */}
                            <g transform="translate(138, 72)">
                              <circle cx="0" cy="0" r="5" fill="#ffffff" stroke="#be123c" strokeWidth="1.2" />
                              <circle cx="-1" cy="-1" r="1.5" fill="#be123c" />
                              <circle cx="1.5" cy="1" r="1.2" fill="#be123c" />
                              <path d="M 0,5 Q -1,8 -2,10" fill="none" stroke="#be123c" strokeWidth="0.6" />
                            </g>
                            <g transform="translate(182, 80)">
                              <circle cx="0" cy="0" r="4.2" fill="#ffffff" stroke="#be123c" strokeWidth="1" />
                              <circle cx="0.8" cy="-0.8" r="1.1" fill="#be123c" />
                            </g>
                            <g transform="translate(162, 60)">
                              <circle cx="0" cy="0" r="5.5" fill="#ffffff" stroke="#be123c" strokeWidth="1.3" />
                              <circle cx="-1.5" cy="1" r="1.4" fill="#be123c" />
                              <circle cx="1.5" cy="-1" r="1.4" fill="#be123c" />
                            </g>

                            {/* Escaping bubbles burst on surface */}
                            <g transform="translate(162, 45)">
                              <circle cx="0" cy="-6" r="2.2" fill="#f43f5e" />
                              <circle cx="-6" cy="-2" r="2.2" fill="#f43f5e" />
                              <circle cx="6" cy="-1" r="2.2" fill="#f43f5e" />
                              <path d="M -3,2 Q 0,-2 3,2" fill="none" stroke="#be123c" strokeWidth="1" />
                            </g>
                            <text x="165" y="90" fill="#be123c" textAnchor="middle" className="text-[5.5px] font-mono">Bọt khí vỡ tung & hóa hơi</text>
                          </svg>
                        </div>
                        <span className="text-[8.5px] text-slate-700 italic mt-2.5 text-center leading-snug font-semibold">
                          Sự sôi (phải) diễn ra mãnh liệt trong toàn lòng chất nhờ sự hình thành, nổi lên và vỡ tung của các bọt hơi nước.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Section II: ĐỊNH NGHĨA & CÔNG THỨC NHIỆT HÓA HƠI RIÊNG */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-orange-600 border-l-4 border-orange-500 pl-2.5 uppercase tracking-wide">II. ĐỊNH NGHĨA & CÔNG THỨC NHIỆT HÓA HƠI RIÊNG L</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Để làm bay hơi hoàn toàn một đơn vị khối lượng chất lỏng ở nhiệt độ sôi cần truyền cho nó một lượng nhiệt năng bao nhiêu? Nhiệt hóa hơi riêng chính là thông số định lượng đặc trưng cho tính chất liên kết phân tử của từng loại chất lỏng.
                    </p>

                    <div className="bg-gradient-to-b from-orange-50 to-orange-100/30 border-2 border-orange-200 border-b-[5px] border-b-orange-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-7 text-xs leading-relaxed text-orange-950 font-medium space-y-2.5">
                          <span className="text-[10px] uppercase font-mono font-black text-orange-800 tracking-wider block border-b border-orange-200 pb-1.5">HỆ THỨC TÍNH NHIỆT LƯỢNG HÓA HƠI (Q)</span>
                          <div className="text-center font-mono font-black text-orange-900 bg-white border border-orange-150 py-2.5 rounded-xl text-lg shadow-inner flex items-center justify-center gap-1">
                            <FormattedMathText text="Q = L * m" />
                          </div>
                          <div className="space-y-1.5 pl-1 text-[11px]">
                            <div className="flex items-center gap-1 flex-wrap">• <strong className="text-orange-900"><FormattedMathText text="Q" /> (Jun - J):</strong> Nhiệt lượng cần cung cấp để hóa hơi hoàn toàn chất lỏng ở nhiệt độ sôi.</div>
                            <div className="flex items-center gap-1">• <strong className="text-orange-900"><FormattedMathText text="m" /> (kg):</strong> Khối lượng chất lỏng đã hóa hơi hoàn toàn.</div>
                            <div className="flex items-center gap-1">• <strong className="text-orange-900 font-extrabold"><FormattedMathText text="L" /> (J/kg):</strong> Nhiệt hóa hơi riêng của chất lỏng.</div>
                          </div>
                          <p className="text-[10px] text-orange-850 bg-orange-100/40 p-2.5 rounded-xl border border-orange-200/50 leading-relaxed font-semibold">
                            <em>Ý nghĩa vật lý:</em> Nhiệt hóa hơi riêng <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="L" /></span> của một chất lỏng có giá trị bằng nhiệt lượng cần truyền cho 1 kg chất lỏng đó hóa hơi hoàn toàn ở nhiệt độ sôi.
                          </p>
                        </div>

                        <div className="md:col-span-5 bg-gradient-to-b from-rose-50 to-rose-100/40 border border-rose-200 rounded-xl p-4 space-y-2.5">
                          <span className="text-[9px] font-mono text-rose-800 font-black uppercase tracking-wider block">BẢNG NHIỆT HÓA HƠI RIÊNG L ĐIỂN HÌNH</span>
                          <div className="space-y-1.5 font-mono text-[10px] text-rose-950">
                            <div className="flex justify-between items-center border-b border-rose-200/50 pb-1">
                              <span>• Nước (100 °C):</span>
                              <span className="font-bold inline-flex items-center"><FormattedMathText text="2,26 * 10^6\ J/kg" /></span>
                            </div>
                            <div className="flex justify-between items-center border-b border-rose-200/50 pb-1">
                              <span>• Ammonia (-33 °C):</span>
                              <span className="font-bold inline-flex items-center"><FormattedMathText text="1,37 * 10^6\ J/kg" /></span>
                            </div>
                            <div className="flex justify-between items-center border-b border-rose-200/50 pb-1">
                              <span>• Ethanol (78 °C):</span>
                              <span className="font-bold inline-flex items-center"><FormattedMathText text="0,86 * 10^6\ J/kg" /></span>
                            </div>
                            <div className="flex justify-between items-center border-b border-rose-200/50 pb-1">
                              <span>• Thủy ngân (357 °C):</span>
                              <span className="font-bold inline-flex items-center"><FormattedMathText text="0,29 * 10^6\ J/kg" /></span>
                            </div>
                            <div className="flex justify-between items-center pb-0.5">
                              <span>• Ether (35 °C):</span>
                              <span className="font-bold inline-flex items-center"><FormattedMathText text="0,35 * 10^6\ J/kg" /></span>
                            </div>
                          </div>
                          <p className="text-[9.5px] text-rose-800 font-medium leading-relaxed italic border-t border-rose-200/50 pt-1">
                            Nước tinh khiết có <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="L" /></span> cực kỳ lớn do lực tương tác giữa các phân tử nước (liên kết hydrogen) rất mạnh, cần lượng nhiệt năng khổng lồ để dãn cách hoàn toàn sang khí.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section III: THÍ NGHIỆM ĐO NHIỆT HÓA HƠI RIÊNG CỦA NƯỚC */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-violet-600 border-l-4 border-violet-500 pl-2.5 uppercase tracking-wide">III. TIẾN TRÌNH THỰC HIỆN CHI TIẾT</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Để giảm thiểu sai số đo đạc, học sinh cần tuân thủ nghiêm ngặt quy trình đo gồm 5 bước tiêu chuẩn dưới đây:
                    </p>

                    <div className="bg-gradient-to-b from-violet-50 to-violet-100/30 border-2 border-violet-200 border-b-[5px] border-b-violet-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg">
                      <div className="space-y-3.5 text-xs text-violet-950 font-medium">
                        <div className="flex gap-2 items-start border-b border-violet-200/50 pb-2.5">
                          <span className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                          <div>
                            <strong className="text-violet-900 block font-bold uppercase">Rót nước ấm vào cốc đun:</strong>
                            Rót khoảng 100g đến 150g nước ấm (khoảng 50-60°C) vào cốc đun của nhiệt lượng kế. Việc dùng nước ấm giúp rút ngắn thời gian chờ đun sôi ban đầu, hạn chế hao phí nhiệt lượng không đáng có trong giai đoạn làm nóng.
                          </div>
                        </div>
                        <div className="flex gap-2 items-start border-b border-violet-200/50 pb-2.5">
                          <span className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                          <div>
                            <strong className="text-violet-900 block font-bold uppercase">Đun sôi ổn định mẫu nước:</strong>
                            Đặt cốc đun lên cân điện tử, nhúng chìm cuộn dây nung điện trở vào nước. Bật nguồn điện xoay chiều. Chờ cho cảm biến nhiệt độ báo nước đạt đúng <strong className="text-violet-900">100°C</strong> và quan sát hiện tượng nước sôi mãnh liệt, sủi bọt khí ổn định ròng rã.
                          </div>
                        </div>
                        <div className="flex gap-2 items-start border-b border-violet-200/50 pb-2.5">
                          <span className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                          <div>
                            <strong className="text-violet-900 block font-bold uppercase">Ghi nhận trạng thái m_1 & bắt đầu bấm giờ:</strong>
                            Khi nước sôi bùng mạnh ròng rã và chỉ số cân điện tử bắt đầu suy giảm đều đặn, đọc và ghi nhận khối lượng ban đầu là <span className="inline-flex items-center align-middle mx-0.5 font-bold"><FormattedMathText text="m_1" /></span> (ví dụ: 100.00g). Đồng thời ấn nút khởi động đồng hồ bấm giây (<span className="inline-flex items-center align-middle mx-0.5 font-bold"><FormattedMathText text="t = 0" /></span>). Đọc và ghi lại trị số điện áp <span className="inline-flex items-center align-middle mx-0.5 font-bold"><FormattedMathText text="U" /></span> và cường độ <span className="inline-flex items-center align-middle mx-0.5 font-bold"><FormattedMathText text="I" /></span>.
                          </div>
                        </div>
                        <div className="flex gap-2 items-start border-b border-violet-200/50 pb-2.5">
                          <span className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">4</span>
                          <div>
                            <strong className="text-violet-900 block font-bold uppercase">Ghi nhận trạng thái m_2 sau thời gian đun t:</strong>
                            Tiếp tục đun sôi liên tục trong một khoảng thời gian <span className="inline-flex items-center align-middle mx-0.5 font-bold"><FormattedMathText text="t" /></span> nhất định (khoảng 300 giây hoặc 400 giây). Khi đồng hồ chỉ đúng thời gian dừng, đọc nhanh khối lượng nước còn lại trên cân điện tử là <span className="inline-flex items-center align-middle mx-0.5 font-bold"><FormattedMathText text="m_2" /></span>. Tắt nguồn cấp điện ngay lập tức để ngưng hóa hơi.
                          </div>
                        </div>
                        <div className="flex gap-2 items-start">
                          <span className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">5</span>
                          <div>
                            <strong className="text-violet-900 block font-bold uppercase">Tính toán khối lượng hóa hơi & nhiệt hóa hơi riêng L:</strong>
                            Xác định khối lượng nước đã hóa hơi trong thời gian đun: <span className="inline-flex items-center align-middle mx-0.5 bg-white px-1.5 py-0.5 rounded border border-violet-200 font-bold"><FormattedMathText text="\Delta m = m_1 - m_2" /></span> (kg). Áp dụng hệ thức bảo toàn điện năng: <span className="inline-flex items-center align-middle mx-0.5 bg-white px-1.5 py-0.5 rounded border border-violet-200 font-bold"><FormattedMathText text="\(L = \frac{U \cdot I \cdot t}{\Delta m}\)" /></span> (J/kg). Tiến hành đo đạc lặp lại 3 lần để lấy giá trị trung bình.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section IV: TÍNH TOÁN SAI SỐ & LẬP BÁO CÁO THỰC HÀNH */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-amber-600 border-l-4 border-amber-500 pl-2.5 uppercase tracking-wide">IV. PHÂN TÍCH SAI SỐ & LẬP BÁO CÁO THỰC HÀNH</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Bất kì phép đo thực nghiệm nào cũng tồn tại sai số ngẫu nhiên từ dụng cụ đo và quá trình đọc số liệu. Hãy cùng phân tích kết cấu sai số để hiệu chỉnh phép đo tối ưu.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* Interactive 3D Card for Section IV Text Content */}
                      <div className="md:col-span-7 bg-gradient-to-b from-amber-50 to-amber-100/30 border-2 border-amber-200 border-b-[5px] border-b-amber-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <h5 className="text-xs font-black text-amber-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                          Công thức Tính sai số Tương đối
                        </h5>
                        <div className="text-xs text-amber-950 font-medium space-y-3 leading-relaxed">
                          Sử dụng phương pháp vi phân lo-ga-rít của hệ thức <span className="inline-flex items-center align-middle mx-0.5 font-bold"><FormattedMathText text="\(L = \frac{U \cdot I \cdot t}{\Delta m}\)" /></span>, ta rút ra công thức tính sai số tương đối của phép đo:
                          <div className="text-center font-mono font-black text-amber-900 bg-white border border-amber-150 py-4 px-6 rounded-2xl text-lg my-3 shadow-md flex items-center justify-center gap-1 flex-wrap overflow-x-auto">
                            <FormattedMathText text="$$\frac{\Delta L}{L_{\text{tb}}} = \frac{\Delta U}{U_{\text{tb}}} + \frac{\Delta I}{I_{\text{tb}}} + \frac{\Delta t}{t_{\text{tb}}} + \frac{\Delta(\Delta m)}{\Delta m_{\text{tb}}}$$" />
                          </div>
                          Trong đó:
                          <ul className="list-disc list-inside pl-2 space-y-1.5 text-[11px] text-amber-900 font-bold">
                            <li className="flex items-center gap-1 flex-wrap"><span className="inline-flex items-center align-middle"><FormattedMathText text="\Delta U" /></span>, <span className="inline-flex items-center align-middle"><FormattedMathText text="\Delta I" /></span>: Sai số hệ thống của Vôn kế và Ampe kế (tra cứu từ cấp chính xác của dụng cụ).</li>
                            <li className="flex items-center gap-1 flex-wrap"><span className="inline-flex items-center align-middle"><FormattedMathText text="\Delta t" /></span>: Sai số ngẫu nhiên của người bấm giờ đồng hồ và độ chia nhỏ nhất (thường lấy 0,1s hoặc 0,2s).</li>
                            <li className="flex items-center gap-1 flex-wrap"><span className="inline-flex items-center align-middle"><FormattedMathText text="\Delta(\Delta m)" /></span>: Sai số đo khối lượng hóa hơi: <span className="inline-flex items-center align-middle"><FormattedMathText text="\Delta(\Delta m) = 2 \cdot \Delta m_{\text{cân}}" /></span> (với sai số cân điện tử thường là 0.01g).</li>
                          </ul>
                        </div>
                      </div>

                      {/* Section IV Summary List */}
                      <div className="md:col-span-5 bg-gradient-to-b from-rose-50 to-rose-100/40 border border-rose-200 rounded-2xl p-4 space-y-2.5">
                        <span className="text-[9px] font-mono text-rose-800 font-black uppercase tracking-wider block border-b border-rose-200/50 pb-1.5">NGUỒN GÂY SAI SỐ & KHẮC PHỤC</span>
                        <div className="space-y-3.5 text-[11px] text-rose-950 font-medium leading-relaxed">
                          <div>
                            <span className="font-extrabold text-rose-900 block">❌ Hơi nước ngưng tụ ngược lại:</span>
                            Hơi nước bay ra đọng trên thành pít-tông/lắp bình chảy ngược lại cốc, làm giảm khối lượng hao hụt thực tế <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="\Delta m" /></span>.
                            <br />
                            <span className="text-emerald-700 font-bold">✓ Khắc phục:</span> Sử dụng nắp đậy thiết kế phễu dốc nghiêng dẫn hơi nước thoát hẳn ra ngoài bình đun.
                          </div>
                          <div className="border-t border-rose-200/50 pt-2">
                            <span className="font-extrabold text-rose-900 block">❌ Hao phí nhiệt tỏa ra thành cốc:</span>
                            Một phần nhiệt từ cuộn nung nung nóng vỏ nhựa thành cốc đun và lan tỏa ngoài không khí.
                            <br />
                            <span className="text-emerald-700 font-bold">✓ Khắc phục:</span> Bọc vỏ cách nhiệt xốp chân không bọc ngoài cốc nung thật chặt chẽ.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section V: TÓM TẮT BÀI HỌC BẰNG INFOGRAPHIC */}
                  <div className="bg-gradient-to-b from-purple-50 to-purple-100/30 border-2 border-purple-200 border-b-[5px] border-b-purple-300/80 rounded-2xl p-5 space-y-3 relative z-10 no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                    <div className="flex items-center gap-2 border-b border-purple-200/60 pb-2">
                      <BookMarked className="h-5 w-5 text-purple-700" />
                      <span className="text-xs font-black text-purple-800 uppercase tracking-wider">TÓM TẮT TRỌNG TÂM - ÔN THI THPT</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-purple-950 font-medium leading-relaxed">
                      <div className="bg-white/60 p-3 rounded-xl border border-purple-100">
                        <span className="font-extrabold text-purple-900 block mb-1">1. CÔNG THỨC THỰC NGHIỆM</span>
                        Nhiệt hóa hơi riêng tính từ điện năng đun sôi và khối lượng hao hụt: <span className="inline-flex items-center align-middle bg-purple-100 border border-purple-200 px-1.5 py-0.5 rounded font-bold"><FormattedMathText text="L = (U * I * t) / (m_1 - m_2)" /></span>. Đơn vị chuẩn là J/kg.
                      </div>
                      <div className="bg-white/60 p-3 rounded-xl border border-purple-100">
                        <span className="font-extrabold text-purple-900 block mb-1">2. ẢNH HƯỞNG CỦA HAO PHÍ</span>
                        Hao phí nhiệt ra môi trường khiến dòng điện đun nhiều năng lượng hơn, làm giá trị thực nghiệm <span className="inline-flex items-center align-middle font-bold"><FormattedMathText text="L" /></span> đo được luôn lớn hơn giá trị thực tế của nước.
                      </div>
                      <div className="bg-white/60 p-3 rounded-xl border border-purple-100">
                        <span className="font-extrabold text-purple-900 block mb-1">3. TIẾN TRÌNH THỰC HIỆN</span>
                        Đun sôi ổn định trước khi bấm giờ đo khối lượng ban đầu, đun liên tục t giây đo khối lượng còn lại, lặp lại đo đạc 3 lần để tính trung bình và sai số.
                      </div>
                    </div>
                  </div>
                  <LessonAssistant lessonId="l6" lessonTitle="Bài 6: Nhiệt hóa hơi riêng" />
                </div>
              )}

              {/* TAB 1: ACCURATE TEXTBOOK WITH HIGH-POLISHED INTERACTIVE SVG DIAGRAMS FOR LESSON 7 */}
              {activeLessonTab === "pdf" && selectedLesson.id === "l7" && (
                <div className="space-y-6 text-slate-800 animate-fade-in relative">
                  {/* Styled thermo-theme background container */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(79,70,229,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
                  <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

                  <div className="border-b border-slate-200 pb-3 flex justify-between items-center relative z-10">
                    <div>
                      <h3 className="text-md font-extrabold text-slate-900">BÀI 7: BÀI TẬP VỀ VẬT LÍ NHIỆT</h3>
                      <p className="text-[10px] text-indigo-600 font-mono mt-1 font-bold">Sách giáo khoa Vật lí 12 - Chương trình GDPT mới 2018</p>
                    </div>
                  </div>

                  {/* Section I: PHƯƠNG PHÁP GIẢI BÀI TẬP BÀI TẬP VẬT LÍ NHIỆT */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-indigo-600 border-l-4 border-indigo-500 pl-2.5 uppercase tracking-wide">I. PHƯƠNG PHÁP GIẢI BÀI TẬP VẬT LÍ NHIỆT</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      Để giải quyết tốt các dạng bài tập vật lí nhiệt, học sinh cần phân biệt rõ hai nhóm bài tập chính và nắm vững các công cụ toán học hỗ trợ:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* Left: Qualitative & Quantitative Guide */}
                      <div className="md:col-span-7 bg-gradient-to-b from-indigo-50 to-indigo-100/30 border-2 border-indigo-200 border-b-[5px] border-b-indigo-300/80 rounded-2xl p-5 shadow-sm no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                        <h5 className="text-xs font-black text-indigo-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                          Phân loại & Hướng tiếp cận
                        </h5>
                        <ul className="space-y-3.5 text-xs text-indigo-950 font-medium">
                          <li className="leading-relaxed">
                            <strong className="text-indigo-900 font-bold">1. Bài tập định tính (Giải thích hiện tượng):</strong>
                            <br />
                            Vận dụng mô hình động học phân tử về cấu tạo chất và thuyết động học phân tử để giải thích các trạng thái vĩ mô, cơ chế truyền nhiệt, sự khuếch tán hay sự chuyển thể của chất.
                          </li>
                          <li className="leading-relaxed border-t border-indigo-200/50 pt-3">
                            <strong className="text-indigo-900 font-bold">2. Bài tập định lượng (Tính toán):</strong>
                            <br />
                            Áp dụng định luật I nhiệt động lực học để tính biến thiên nội năng <span className="inline-flex items-center align-middle bg-indigo-100 px-1.5 py-0.5 rounded font-bold"><FormattedMathText text="\Delta U = A + Q" /></span> và vận dụng các công thức tính nhiệt lượng chuyển đổi nhiệt độ, chuyển trạng thái, phương trình cân bằng nhiệt.
                          </li>
                        </ul>
                      </div>

                      {/* Right: Interactive Convention Sign Diagram */}
                      <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center shadow-inner no-override no-override-bg">
                        <span className="text-[9px] font-mono text-slate-700 font-extrabold mb-2 uppercase">SƠ ĐỒ QUY ƯỚC DẤU ĐỊNH LUẬT I</span>
                        <div className="w-full h-44 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center relative overflow-hidden no-override no-override-bg">
                          <svg className="w-full h-full" viewBox="0 0 180 120">
                            {/* Cylinder representing thermodynamic system */}
                            <rect x="55" y="30" width="70" height="60" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" rx="4" />
                            <text x="90" y="62" fill="#334155" textAnchor="middle" className="text-[9px] font-extrabold font-mono">HỆ (GAS)</text>
                            <text x="90" y="74" fill="#64748b" textAnchor="middle" className="text-[7px] font-bold font-mono">ΔU = A + Q</text>

                            {/* Q arrows */}
                            <line x1="20" y1="42" x2="50" y2="42" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow-red)" />
                            <text x="32" y="36" fill="#ef4444" textAnchor="middle" className="text-[7.5px] font-extrabold">Q &gt; 0</text>
                            <text x="26" y="52" fill="#ef4444" className="text-[6.5px] font-bold">(Nhận nhiệt)</text>

                            <line x1="128" y1="42" x2="158" y2="42" stroke="#3b82f6" strokeWidth="1.5" markerStart="url(#arrow-blue)" />
                            <text x="146" y="36" fill="#3b82f6" textAnchor="middle" className="text-[7.5px] font-extrabold">Q &lt; 0</text>
                            <text x="136" y="52" fill="#3b82f6" className="text-[6.5px] font-bold">(Tỏa nhiệt)</text>

                            {/* A arrows */}
                            <line x1="20" y1="80" x2="50" y2="80" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-green)" />
                            <text x="32" y="92" fill="#10b981" textAnchor="middle" className="text-[7.5px] font-extrabold">A &gt; 0</text>
                            <text x="24" y="101" fill="#10b981" className="text-[6.5px] font-bold">(Nhận công)</text>

                            <line x1="128" y1="80" x2="158" y2="80" stroke="#f59e0b" strokeWidth="1.5" markerStart="url(#arrow-orange)" />
                            <text x="146" y="92" fill="#f59e0b" textAnchor="middle" className="text-[7.5px] font-extrabold">A &lt; 0</text>
                            <text x="138" y="101" fill="#f59e0b" className="text-[6.5px] font-bold">(Sinh công)</text>

                            {/* Defs for arrowheads */}
                            <defs>
                              <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" fill="#ef4444" />
                              </marker>
                              <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" fill="#3b82f6" />
                              </marker>
                              <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" fill="#10b981" />
                              </marker>
                              <marker id="arrow-orange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" fill="#f59e0b" />
                              </marker>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section II: CÔNG THỨC TRAO ĐỔI NHIỆT VÀ CÂN BẰNG NHIỆT */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-teal-600 border-l-4 border-teal-500 pl-2.5 uppercase tracking-wide">II. CÁC CÔNG THỨC NHIỆT LƯỢNG & CÂN BẰNG NHIỆT CỐT LÕI</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Q change temp */}
                      <div className="bg-gradient-to-b from-cyan-50 to-cyan-100/20 border-2 border-cyan-200 rounded-xl p-4 space-y-2 no-override no-override-bg">
                        <span className="text-[10px] font-black text-cyan-800 uppercase tracking-wider block">1. Thay đổi nhiệt độ</span>
                        <div className="font-black text-center text-sm text-cyan-900 bg-white border border-cyan-200/60 py-2 rounded-lg flex items-center justify-center">
                          <FormattedMathText text="Q = m * c * \Delta t" />
                        </div>
                        <p className="text-[11px] leading-relaxed text-cyan-950 font-medium">
                          <strong>c (J/(kg·K)):</strong> Nhiệt dung riêng của chất.
                          <br />
                          <strong><FormattedMathText text="\Delta t = t_2 - t_1" />:</strong> Độ tăng nhiệt độ (°C hoặc K).
                        </p>
                      </div>

                      {/* Q latent transition */}
                      <div className="bg-gradient-to-b from-rose-50 to-rose-100/20 border-2 border-rose-200 rounded-xl p-4 space-y-2 no-override no-override-bg">
                        <span className="text-[10px] font-black text-rose-800 uppercase tracking-wider block">2. Chuyển trạng thái chất</span>
                        <div className="font-black text-center text-sm text-rose-900 bg-white border border-rose-200/60 py-2 rounded-lg flex flex-col items-center justify-center gap-1">
                          <span className="flex items-center gap-1"><FormattedMathText text="Q = \lambda * m" /> (Nóng chảy)</span>
                          <span className="flex items-center gap-1"><FormattedMathText text="Q = L * m" /> (Hóa hơi)</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-rose-950 font-medium">
                          <strong><FormattedMathText text="\lambda" /> (J/kg):</strong> Nhiệt nóng chảy riêng.
                          <br />
                          <strong>L (J/kg):</strong> Nhiệt hóa hơi riêng.
                        </p>
                      </div>

                      {/* Q equilibrium */}
                      <div className="bg-gradient-to-b from-purple-50 to-purple-100/20 border-2 border-purple-200 rounded-xl p-4 space-y-2 no-override no-override-bg">
                        <span className="text-[10px] font-black text-purple-800 uppercase tracking-wider block">3. Hệ cô lập trao đổi nhiệt</span>
                        <div className="font-black text-center text-sm text-purple-900 bg-white border border-purple-200/60 py-2 rounded-lg flex items-center justify-center">
                          <FormattedMathText text="Q_toa + Q_thu = 0" />
                        </div>
                        <p className="text-[11px] leading-relaxed text-purple-950 font-medium">
                          Tổng nhiệt lượng tỏa ra của các vật giảm nhiệt độ cộng tổng nhiệt lượng thu vào của các vật tăng nhiệt độ bằng không.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section III: PHÂN TÍCH CHI TIẾT BÀI TẬP SGK MẪU */}
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-extrabold text-amber-600 border-l-4 border-amber-500 pl-2.5 uppercase tracking-wide">III. PHÂN TÍCH CHI TIẾT BÀI TẬP MẪU TRONG SÁCH GIÁO KHOA</h4>
                    
                    <div className="space-y-5">
                      {/* Exercise 1 */}
                      <div className="bg-gradient-to-b from-slate-50 to-slate-100/40 border border-slate-200 rounded-2xl p-5 space-y-3 no-override no-override-bg shadow-sm">
                        <span className="text-[10px] font-black text-slate-800 uppercase bg-slate-200/80 px-2 py-0.5 rounded font-mono">BÀI TẬP 1 (Trang 30 SGK)</span>
                        <p className="text-xs text-slate-900 font-bold leading-relaxed">
                          Đề bài: Một lượng khí nhận một nhiệt lượng 10 kJ để nóng lên, đồng thời khí bị nén bởi một ngoại lực thực hiện công có độ lớn 100 kJ. Tính độ biến thiên nội năng của khí.
                        </p>
                        <div className="bg-white rounded-xl p-4 border border-slate-150 space-y-2 text-xs leading-relaxed text-slate-800 font-medium">
                          <div className="font-bold text-indigo-700 flex items-center gap-1">💡 Hướng dẫn phân tích & Giải:</div>
                          <p className="flex flex-col gap-1.5">
                            <span className="flex items-center gap-1">- Khí nhận nhiệt lượng từ ngoài vào nên: <span className="font-bold"><FormattedMathText text="Q = +10 kJ = 10000 J" /></span>.</span>
                            <span className="flex items-center gap-1">- Khí bị nén, nghĩa là nhận công từ ngoại lực bên ngoài nên: <span className="font-bold"><FormattedMathText text="A = +100 kJ = 100000 J" /></span>.</span>
                          </p>
                          <p className="font-bold text-slate-900 border-t border-slate-100 pt-2 flex justify-between items-center flex-wrap gap-2">
                            <span>Áp dụng Định luật I Nhiệt động lực học:</span>
                            <span className="bg-slate-50 border border-slate-100 px-2 py-1 rounded"><FormattedMathText text="\Delta U = A + Q = 100 kJ + 10 kJ = +110 kJ" /></span>
                          </p>
                          <p className="text-emerald-700 font-semibold">
                            Kết luận: Nội năng của lượng khí đã tăng thêm 110 kJ.
                          </p>
                        </div>
                      </div>

                      {/* Exercise 2 */}
                      <div className="bg-gradient-to-b from-slate-50 to-slate-100/40 border border-slate-200 rounded-2xl p-5 space-y-3 no-override no-override-bg shadow-sm">
                        <span className="text-[10px] font-black text-slate-800 uppercase bg-slate-200/80 px-2 py-0.5 rounded font-mono">BÀI TẬP 2 (Trang 30 SGK)</span>
                        <p className="text-xs text-slate-900 font-bold leading-relaxed">
                          Đề bài: Người ta cung cấp một nhiệt lượng 25 J cho một lượng khí trong xi lanh đặt nằm ngang. Khí nở ra đẩy pít-tông chuyển động đều đi một đoạn đường 10 cm. Biết lực ma sát giữa pít-tông và xi lanh có độ lớn là 20 N. Tính độ biến thiên nội năng của khí.
                        </p>
                        <div className="bg-white rounded-xl p-4 border border-slate-150 space-y-2 text-xs leading-relaxed text-slate-800 font-medium">
                          <div className="font-bold text-indigo-700 flex items-center gap-1">💡 Hướng dẫn phân tích & Giải:</div>
                          <p className="flex flex-col gap-1.5">
                            <span className="flex items-center gap-1">- Khí được cung cấp nhiệt lượng nên nhận nhiệt: <span className="font-bold"><FormattedMathText text="Q = +25 J" /></span>.</span>
                            <span className="flex items-center gap-1">- Khí nở ra đẩy pít-tông di chuyển đều, lực đẩy cơ học của khí cân bằng với lực ma sát: <span className="font-bold"><FormattedMathText text="F_{day} = F_{ms} = 20 N" /></span>.</span>
                            <span className="flex items-center gap-1">- Công cơ học mà khí thực hiện dời pit-tông: <span className="font-bold"><FormattedMathText text="A_{co} = F * s = 20 * 0.10 m = 2 J" /></span>.</span>
                            <span className="flex items-center gap-1">- Vì khí tự dãn nở sinh công (thực hiện công) để thắng ma sát nên công khí trao đổi mang dấu âm: <span className="font-bold"><FormattedMathText text="A = -A_{co} = -2 J" /></span>.</span>
                          </p>
                          <p className="font-bold text-slate-900 border-t border-slate-100 pt-2 flex justify-between items-center flex-wrap gap-2">
                            <span>Áp dụng Định luật I Nhiệt động lực học:</span>
                            <span className="bg-slate-50 border border-slate-100 px-2 py-1 rounded"><FormattedMathText text="\Delta U = A + Q = -2 J + 25 J = +23 J" /></span>
                          </p>
                          <p className="text-emerald-700 font-semibold">
                            Kết luận: Nội năng của khí trong xi lanh đã tăng thêm 23 J.
                          </p>
                        </div>
                      </div>

                      {/* Exercise 3 */}
                      <div className="bg-gradient-to-b from-slate-50 to-slate-100/40 border border-slate-200 rounded-2xl p-5 space-y-3 no-override no-override-bg shadow-sm">
                        <span className="text-[10px] font-black text-slate-800 uppercase bg-slate-200/80 px-2 py-0.5 rounded font-mono">BÀI TẬP 3 (Trang 30 SGK)</span>
                        <p className="text-xs text-slate-900 font-bold leading-relaxed">
                          Đề bài: Để pha chế 30 lít nước ấm ở nhiệt độ 40 °C phục vụ thực hành sinh học, một giáo viên đã trộn lẫn nước sôi ở 100 °C và nước lạnh ở 10 °C. Bỏ qua hao phí nhiệt ra môi trường và bình chứa. Tính khối lượng nước sôi và nước lạnh cần dùng.
                        </p>
                        <div className="bg-white rounded-xl p-4 border border-slate-150 space-y-3 text-xs leading-relaxed text-slate-800 font-medium">
                          <div className="font-bold text-indigo-700 flex items-center gap-1">💡 Hướng dẫn phân tích & Giải:</div>
                          <div className="space-y-1.5">
                            <p>
                              - Gọi <span className="font-bold"><FormattedMathText text="m_1" /></span> (kg) là khối lượng nước sôi ở 100 °C và <span className="font-bold"><FormattedMathText text="m_2" /></span> (kg) là khối lượng nước lạnh ở 10 °C.
                              <br />
                              - Tổng khối lượng nước ấm là: <span className="font-bold"><FormattedMathText text="m_1 + m_2 = 30 kg" /></span> (do 1 lít nước ứng với 1 kg).
                            </p>
                            <p>
                              - Nhiệt lượng tỏa ra từ nước sôi hạ xuống 40 °C: <span className="font-bold"><FormattedMathText text="Q_{toa} = m_1 * c * (100 - 40) = 60 * c * m_1" /></span>.
                              <br />
                              - Nhiệt lượng thu vào của nước lạnh tăng lên 40 °C: <span className="font-bold"><FormattedMathText text="Q_{thu} = m_2 * c * (40 - 10) = 30 * c * m_2" /></span>.
                            </p>
                            <div className="space-y-1">
                              <span>- Áp dụng phương trình cân bằng nhiệt (bỏ qua hao phí):</span>
                              <div className="flex items-center justify-center font-bold bg-slate-50 border border-slate-100 py-1 rounded">
                                <FormattedMathText text="Q_{toa} = Q_{thu} => 60 * c * m_1 = 30 * c * m_2 => 2 * m_1 = m_2" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <span>- Hệ phương trình toán học:</span>
                              <div className="flex items-center justify-center font-bold bg-slate-50 border border-slate-100 py-1 rounded">
                                <FormattedMathText text="m_1 + m_2 = m_1 + 2 * m_1 = 30 => 3 * m_1 = 30 => m_1 = 10 kg; m_2 = 20 kg" />
                              </div>
                            </div>
                          </div>
                          <p className="text-emerald-700 font-semibold border-t border-slate-100 pt-2">
                            Kết luận: Cần dùng 10 kg nước sôi (10 lít) và 20 kg nước lạnh (20 lít).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section IV: TÓM TẮT TRỌNG TÂM LÝ THUYẾT */}
                  <div className="bg-gradient-to-b from-purple-50 to-purple-100/30 border-2 border-purple-200 border-b-[5px] border-b-purple-300/80 rounded-2xl p-5 space-y-3 relative z-10 no-override no-override-bg hover:translate-y-[1px] hover:border-b-[4px] active:translate-y-[3px] active:border-b-[2px] transition-all cursor-pointer">
                    <div className="flex items-center gap-2 border-b border-purple-200/60 pb-2">
                      <BookMarked className="h-5 w-5 text-purple-700" />
                      <span className="text-xs font-black text-purple-800 uppercase tracking-wider">TÓM TẮT TRỌNG TÂM - ÔN THI TỐT NGHIỆP THPT</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-purple-950 font-medium leading-relaxed">
                      <div className="bg-white/60 p-3 rounded-xl border border-purple-100 space-y-1">
                        <span className="font-extrabold text-purple-900 block mb-1">1. ĐỊNH LUẬT I NHIỆT ĐỘNG LỰC HỌC</span>
                        Độ biến thiên nội năng bằng tổng công và nhiệt lượng mà hệ trao đổi: <span className="inline-flex items-center align-middle bg-purple-100 border border-purple-200 px-1 py-0.5 rounded font-bold"><FormattedMathText text="\Delta U = A + Q" /></span>. Cần thuộc lòng quy ước dấu của A và Q để tránh giải sai bài tập tính toán.
                      </div>
                      <div className="bg-white/60 p-3 rounded-xl border border-purple-100 space-y-1">
                        <span className="font-extrabold text-purple-900 block mb-1">2. CÔNG CƠ HỌC & CÔNG SUẤT</span>
                        Khi khối khí nén hoặc dãn nở đẩy pit-tông di chuyển đều, công cơ học tính theo công thức <span className="inline-flex items-center align-middle bg-purple-100 border border-purple-200 px-1 py-0.5 rounded font-bold"><FormattedMathText text="A = F * s" /></span>. Trong đun nấu điện, công suất liên kết năng lượng điện tỏa ra là <span className="inline-flex items-center align-middle bg-purple-100 border border-purple-200 px-1 py-0.5 rounded font-bold"><FormattedMathText text="A_dien = P * t = U * I * t" /></span>.
                      </div>
                      <div className="bg-white/60 p-3 rounded-xl border border-purple-100 space-y-1">
                        <span className="font-extrabold text-purple-900 block mb-1">3. CÂN BẰNG NHIỆT & HIỆU SUẤT</span>
                        Hệ cô lập thỏa mãn <span className="inline-flex items-center align-middle bg-purple-100 border border-purple-200 px-1 py-0.5 rounded font-bold"><FormattedMathText text="Q_toa + Q_thu = 0" /></span>. Nếu có hao phí nhiệt lượng, ta tính qua hiệu suất đun nấu <span className="inline-flex items-center align-middle bg-purple-100 border border-purple-200 px-1 py-0.5 rounded font-bold"><FormattedMathText text="H = Q_ich / Q_tp" /></span> (với Q_ích là nhiệt đun nóng vật, Q_tp là toàn phần tỏa ra từ nguồn).
                      </div>
                    </div>
                  </div>
                  <LessonAssistant lessonId="l7" lessonTitle="Bài 7: Bài tập về vật lí nhiệt" />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l8" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-gradient-to-b from-slate-50 to-white border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-6 shadow-sm text-slate-900">
                    <Lesson8Textbook />
                  </div>
                  <LessonAssistant lessonId="l8" lessonTitle="Bài 8: Mô hình động học phân tử chất khí" />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l9" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-gradient-to-b from-slate-50 to-white border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-6 shadow-sm text-slate-900">
                    <Lesson9Textbook />
                  </div>
                  <LessonAssistant lessonId="l9" lessonTitle="Bài 9: Định luật Boyle" />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l10" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
                    <Lesson10Textbook />
                  </div>
                  <LessonAssistant lessonId="l10" lessonTitle="Bài 10: Định luật Charles" />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l11" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
                    <Lesson11Textbook />
                  </div>
                  <LessonAssistant lessonId="l11" lessonTitle="Bài 11: Phương trình trạng thái của khí lí tưởng" />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l12" && (
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
                  <Lesson12Textbook />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l13" && (
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
                  <Lesson13Textbook />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l14" && (
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
                  <Lesson14Textbook />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l15" && (
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 animate-fade-in text-slate-800">
                  <Lesson15Textbook />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l16" && (
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 animate-fade-in text-slate-800">
                  <Lesson16Textbook />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l17" && (
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 animate-fade-in text-slate-800">
                  <Lesson17Textbook />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l18" && (
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 animate-fade-in text-slate-800">
                  <Lesson18Textbook />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l19" && (
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 animate-fade-in text-slate-800">
                  <Lesson19Textbook />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l20" && (
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 animate-fade-in text-slate-800">
                  <Lesson20Textbook />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l21" && (
                <div className="bg-slate-950/80 rounded-3xl p-6 shadow-xl border border-slate-800 animate-fade-in text-slate-100">
                  <Lesson21Textbook />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l22" && (
                <div className="bg-slate-950/80 rounded-3xl p-6 shadow-xl border border-slate-800 animate-fade-in text-slate-100">
                  <Lesson22Textbook />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l23" && (
                <div className="bg-slate-950/80 rounded-3xl p-6 shadow-xl border border-slate-800 animate-fade-in text-slate-100">
                  <Lesson23Textbook />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l24" && (
                <div className="bg-slate-950/80 rounded-3xl p-6 shadow-xl border border-slate-800 animate-fade-in text-slate-100">
                  <Lesson24Textbook />
                </div>
              )}

              {activeLessonTab === "pdf" && selectedLesson.id === "l25" && (
                <div className="bg-slate-950/80 rounded-3xl p-6 shadow-xl border border-slate-800 animate-fade-in text-slate-100">
                  <Lesson25Textbook />
                </div>
              )}

              {/* TAB 1 FALLBACK FOR OTHER LESSONS */}
              {activeLessonTab === "pdf" && selectedLesson.id !== "l1" && selectedLesson.id !== "l2" && selectedLesson.id !== "l3" && selectedLesson.id !== "l4" && selectedLesson.id !== "l5" && selectedLesson.id !== "l6" && selectedLesson.id !== "l7" && selectedLesson.id !== "l8" && selectedLesson.id !== "l9" && selectedLesson.id !== "l10" && selectedLesson.id !== "l11" && selectedLesson.id !== "l12" && selectedLesson.id !== "l13" && selectedLesson.id !== "l14" && selectedLesson.id !== "l15" && selectedLesson.id !== "l16" && selectedLesson.id !== "l17" && selectedLesson.id !== "l18" && selectedLesson.id !== "l19" && selectedLesson.id !== "l20" && selectedLesson.id !== "l21" && selectedLesson.id !== "l22" && selectedLesson.id !== "l23" && selectedLesson.id !== "l24" && selectedLesson.id !== "l25" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-md font-bold text-white">{selectedLesson.title}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">{selectedLesson.pdfUrl}</p>
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/30 p-4 rounded-2xl border border-slate-850">
                    {selectedLesson.readingContent}
                  </div>
                </div>
              )}

              {/* TAB 2: SLIDES */}
              {activeLessonTab === "slide" && (() => {
                const slideDetails = getSlideDetails(selectedLesson.id, currentSlideIndex, selectedLesson.readingContent, selectedLesson.slideSteps[currentSlideIndex]);
                return (
                  <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in">
                    <div>
                      <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                        <div>
                          <h3 className="text-sm font-bold text-white">Slide Bài học Tương tác</h3>
                          <p className="text-[10px] text-slate-400 mt-0.5">Tóm lược lý thuyết cốt lõi bám sát chương trình GDPT mới 2018</p>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                          Slide {currentSlideIndex + 1} / {selectedLesson.slideSteps.length}
                        </span>
                      </div>

                      {/* Premium Slide Board */}
                      <div className="bg-slate-950/80 border border-slate-850 rounded-2xl p-6 md:p-8 min-h-[320px] relative overflow-hidden flex flex-col justify-between shadow-inner">
                        {/* Interactive floating watermarks */}
                        <div className="absolute top-[-30%] right-[-10%] w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-[-30%] left-[-10%] w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

                        {/* Slide Content */}
                        <div className="space-y-4 relative z-10">
                          {/* Slide Title */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest font-extrabold">{slideDetails.subtitle}</span>
                            <h4 className="text-md md:text-lg font-extrabold text-white tracking-tight border-b border-slate-900 pb-2">
                              {slideDetails.title}
                            </h4>
                          </div>

                          {/* Bullet Points with checkmarks */}
                          <div className="space-y-3">
                            {slideDetails.bullets.map((bullet, idx) => (
                              <div key={idx} className="flex items-start gap-3 text-slate-300 text-xs leading-relaxed animate-fade-in">
                                <span className="text-cyan-400 shrink-0 mt-0.5 font-sans">✦</span>
                                <p className="font-medium text-slate-300">{bullet}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Formula or highlight warning box if present */}
                        {(slideDetails.formula || slideDetails.highlight) && (
                          <div className="mt-5 bg-cyan-950/20 border border-cyan-500/15 rounded-xl p-3.5 relative z-10 flex items-center gap-3.5 animate-fade-in">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                              <Info className="h-4.5 w-4.5 text-cyan-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[9px] font-mono text-cyan-400 uppercase font-extrabold tracking-wider block">Ghi chú quan trọng / Công thức cốt lõi</span>
                              <p className="text-xs font-bold text-slate-100 font-mono mt-0.5 truncate">
                                {slideDetails.formula ? slideDetails.formula : slideDetails.highlight}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-between items-center border-t border-slate-800/60 pt-4">
                      <button
                        disabled={currentSlideIndex === 0}
                        onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-bold disabled:opacity-30 cursor-pointer transition-all"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Slide trước
                      </button>

                      {/* Presentation Dot indicator */}
                      <div className="hidden md:flex items-center gap-1.5">
                        {selectedLesson.slideSteps.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => setCurrentSlideIndex(dotIdx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                              currentSlideIndex === dotIdx 
                                ? "bg-cyan-400 w-6" 
                                : "bg-slate-800 hover:bg-slate-700"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        disabled={currentSlideIndex === selectedLesson.slideSteps.length - 1}
                        onClick={() => {
                          setCurrentSlideIndex(currentSlideIndex + 1);
                          if (currentSlideIndex === selectedLesson.slideSteps.length - 2) onEarnXP(10);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-slate-950 hover:bg-cyan-400 rounded-xl text-xs font-extrabold disabled:opacity-30 cursor-pointer transition-all shadow-md shadow-cyan-500/10"
                      >
                        Slide sau
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* TAB 3: VIDEO PLAYBACK */}
              {activeLessonTab === "video" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-white">Video bài giảng lý thuyết 12</h3>
                  </div>
                  <div className="bg-slate-950 aspect-video rounded-2xl border border-slate-850 overflow-hidden relative flex items-center justify-center">
                    <iframe
                      src={selectedLesson.videoUrl}
                      title={selectedLesson.title}
                      className="w-full h-full border-0 absolute inset-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* TAB 4: FLASHCARDS */}
              {activeLessonTab === "flashcard" && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="border-b border-slate-800 pb-3 mb-4">
                      <h3 className="text-sm font-bold text-white">Học thuộc nhanh với Flashcard thông minh</h3>
                    </div>

                    <div
                      onClick={() => setCardFlipped(!cardFlipped)}
                      className={`h-48 rounded-2xl border p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                        cardFlipped
                          ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                          : "bg-slate-950 border-slate-850 text-slate-200"
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-3 font-mono">
                        {cardFlipped ? "ĐÁP ÁN (Bấm để lật lại mặt trước)" : "CÂU HỎI (Bấm vào thẻ để xem đáp án)"}
                      </span>
                      <p className="text-xs font-semibold leading-relaxed px-4">
                        {cardFlipped
                          ? selectedLesson.flashcards[currentCardIndex]?.back
                          : selectedLesson.flashcards[currentCardIndex]?.front}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      disabled={currentCardIndex === 0}
                      onClick={() => {
                        setCurrentCardIndex(currentCardIndex - 1);
                        setCardFlipped(false);
                      }}
                      className="px-3.5 py-1.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-bold disabled:opacity-30 cursor-pointer"
                    >
                      Thẻ trước
                    </button>
                    <button
                      disabled={currentCardIndex === selectedLesson.flashcards.length - 1}
                      onClick={() => {
                        setCurrentCardIndex(currentCardIndex + 1);
                        setCardFlipped(false);
                        onEarnXP(10);
                      }}
                      className="px-3.5 py-1.5 bg-purple-500 text-slate-950 hover:bg-purple-400 rounded-lg text-xs font-bold disabled:opacity-30 cursor-pointer"
                    >
                      Thẻ kế tiếp
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: ADVANCED HIGH-SCHOOL (GDPT 2018) PRACTICE EXAM PRACTICE FOR BÀI 1 TO BÀI 25 */}
              {activeLessonTab === "quiz" && (selectedLesson.id === "l1" || selectedLesson.id === "l2" || selectedLesson.id === "l3" || selectedLesson.id === "l4" || selectedLesson.id === "l5" || selectedLesson.id === "l6" || selectedLesson.id === "l7" || selectedLesson.id === "l8" || selectedLesson.id === "l9" || selectedLesson.id === "l10" || selectedLesson.id === "l11" || selectedLesson.id === "l12" || selectedLesson.id === "l13" || selectedLesson.id === "l14" || selectedLesson.id === "l15" || selectedLesson.id === "l16" || selectedLesson.id === "l17" || selectedLesson.id === "l18" || selectedLesson.id === "l19" || selectedLesson.id === "l20" || selectedLesson.id === "l21" || selectedLesson.id === "l22" || selectedLesson.id === "l23" || selectedLesson.id === "l24" || selectedLesson.id === "l25") && (
                <div className="space-y-6">
                  {/* Practice header */}
                  <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div>
                      <h3 className="text-sm font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-cyan-400" />
                        Bài tập luyện tập định hướng thi tốt nghiệp THPT
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {selectedLesson.id === "l8" || selectedLesson.id === "l14"
                          ? "Cấu trúc: Phần I (6,0 điểm - 20 câu trắc nghiệm nhiều lựa chọn) | Phần II (4,0 điểm - 4 câu Đúng/Sai)"
                          : (selectedLesson.id === "l4" || selectedLesson.id === "l5" || selectedLesson.id === "l6" || selectedLesson.id === "l7" || selectedLesson.id === "l9" || selectedLesson.id === "l10" || selectedLesson.id === "l11" || selectedLesson.id === "l12" || selectedLesson.id === "l13" || selectedLesson.id === "l15" || selectedLesson.id === "l16" || selectedLesson.id === "l17" || selectedLesson.id === "l18" || selectedLesson.id === "l19" || selectedLesson.id === "l20" || selectedLesson.id === "l21" || selectedLesson.id === "l22" || selectedLesson.id === "l23" || selectedLesson.id === "l24" || selectedLesson.id === "l25")
                          ? "Cấu trúc đề tốt nghiệp THPT: Phần I (4,5 điểm - 18 câu trắc nghiệm) | Phần II (4,0 điểm - 4 câu Đúng/Sai) | Phần III (1,5 điểm - 6 câu trả lời ngắn)"
                          : "Cấu trúc đề tốt nghiệp THPT: Phần I (3,0 điểm - 10 câu trắc nghiệm) | Phần II (4,0 điểm - 4 câu Đúng/Sai) | Phần III (3,0 điểm - 6 câu trả lời ngắn)"}
                      </p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      {/* Teacher management tools */}
                      {userRole === "teacher" && (
                        <button
                          onClick={() => {
                            setShowAddModal(true);
                            setUploadError(null);
                            setUploadSuccess(null);
                          }}
                          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-[10px] rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-500/10 cursor-pointer transition-colors"
                        >
                          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                          AI Import Bài tập (Word/PDF/Ảnh)
                        </button>
                      )}
                      
                      <button
                        onClick={() => initializeTest()}
                        className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-extrabold text-[10px] rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Shuffle className="h-3.5 w-3.5 text-cyan-400" />
                        Đảo Đề (Làm lại)
                      </button>
                    </div>
                  </div>

                  {/* Submission success metrics panel */}
                  {examSubmitted && (
                    <div className="bg-slate-950/90 border border-cyan-500/30 rounded-2xl p-5 animate-fade-in flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="space-y-2 text-center md:text-left">
                        <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 tracking-wider">KẾT QUẢ ĐÁNH GIÁ NĂNG LỰC</span>
                        <h4 className="text-2xl font-black text-white leading-none">{totalScore} / 10.0 <span className="text-xs font-medium text-slate-400">điểm</span></h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                          - Điểm phần I (Nhiều lựa chọn): <strong className="text-slate-200">{scoreBreakdown.p1}</strong> / {selectedLesson?.id === "l8" || selectedLesson?.id === "l14" ? "6.0" : (selectedLesson?.id === "l2" || selectedLesson?.id === "l4" || selectedLesson?.id === "l5" || selectedLesson?.id === "l6" || selectedLesson?.id === "l7" || selectedLesson?.id === "l9" || selectedLesson?.id === "l10" || selectedLesson?.id === "l11" || selectedLesson?.id === "l12" || selectedLesson?.id === "l13" || selectedLesson?.id === "l15" || selectedLesson?.id === "l16" || selectedLesson?.id === "l17" || selectedLesson?.id === "l18" || selectedLesson?.id === "l19" || selectedLesson?.id === "l20" || selectedLesson?.id === "l21" || selectedLesson?.id === "l22" || selectedLesson?.id === "l23" || selectedLesson?.id === "l24" || selectedLesson?.id === "l25") ? "4.5" : "3.0"}đ<br />
                          - Điểm phần II (Đúng/Sai): <strong className="text-slate-200">{scoreBreakdown.p2}</strong> / 4.0đ
                          {(selectedLesson?.id === "l1" || selectedLesson?.id === "l2" || selectedLesson?.id === "l3" || selectedLesson?.id === "l4" || selectedLesson?.id === "l5" || selectedLesson?.id === "l6" || selectedLesson?.id === "l7" || selectedLesson?.id === "l9" || selectedLesson?.id === "l10" || selectedLesson?.id === "l11" || selectedLesson?.id === "l12" || selectedLesson?.id === "l13" || selectedLesson?.id === "l15" || selectedLesson?.id === "l16" || selectedLesson?.id === "l17" || selectedLesson?.id === "l18" || selectedLesson?.id === "l19" || selectedLesson?.id === "l20" || selectedLesson?.id === "l21" || selectedLesson?.id === "l22" || selectedLesson?.id === "l23" || selectedLesson?.id === "l24" || selectedLesson?.id === "l25") && (
                            <>
                              <br />
                              - Điểm phần III (Trả lời ngắn): <strong className="text-slate-200">{scoreBreakdown.p3}</strong> / {(selectedLesson?.id === "l2" || selectedLesson?.id === "l4" || selectedLesson?.id === "l5" || selectedLesson?.id === "l6" || selectedLesson?.id === "l7" || selectedLesson?.id === "l9" || selectedLesson?.id === "l10" || selectedLesson?.id === "l11" || selectedLesson?.id === "l12" || selectedLesson?.id === "l13" || selectedLesson?.id === "l15" || selectedLesson?.id === "l16" || selectedLesson?.id === "l17" || selectedLesson?.id === "l18" || selectedLesson?.id === "l19" || selectedLesson?.id === "l20" || selectedLesson?.id === "l21" || selectedLesson?.id === "l22" || selectedLesson?.id === "l23" || selectedLesson?.id === "l24" || selectedLesson?.id === "l25") ? "1.5" : "3.0"}đ
                            </>
                          )}
                        </p>
                      </div>

                      <div className="flex flex-col items-center bg-cyan-500/5 border border-cyan-500/10 p-3.5 rounded-2xl shrink-0">
                        <span className="text-[35px] leading-none mb-1">🎯</span>
                        <span className="text-[10px] font-black text-cyan-300 uppercase tracking-widest">
                          {totalScore >= 8.5 ? "XUẤT SẮC" : totalScore >= 7.0 ? "GIỎI" : totalScore >= 5.0 ? "ĐẠT YÊU CẦU" : "CẦN CỐ GẮNG"}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="w-full">
                    {/* LEFT COLUMN (VISUALLY LEFT, DOM POSITION REMAINS CORRESPONDING TO ORDER): QUESTIONS LIST */}
                    <div className="w-full space-y-8">
                    
                    {/* PART 1: 20 SINGLE-CHOICE QUESTIONS */}
                    <div className="space-y-5">
                      <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 flex justify-between items-center">
                        <span className="text-[11px] font-black text-cyan-400 uppercase tracking-wide">
                          PHẦN I. Câu hỏi trắc nghiệm nhiều lựa chọn ({(selectedLesson?.id === "l8" || selectedLesson?.id === "l14" ? "6,0" : (selectedLesson?.id === "l2" || selectedLesson?.id === "l4" || selectedLesson?.id === "l5" || selectedLesson?.id === "l6" || selectedLesson?.id === "l7" || selectedLesson?.id === "l9" || selectedLesson?.id === "l10" || selectedLesson?.id === "l11" || selectedLesson?.id === "l12" || selectedLesson?.id === "l13" || selectedLesson?.id === "l15" || selectedLesson?.id === "l16" || selectedLesson?.id === "l17" || selectedLesson?.id === "l18" || selectedLesson?.id === "l19" || selectedLesson?.id === "l20" || selectedLesson?.id === "l21" || selectedLesson?.id === "l22" || selectedLesson?.id === "l23" || selectedLesson?.id === "l24" || selectedLesson?.id === "l25") ? "4,5" : "3,0")} điểm)
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 italic">
                          Mỗi câu trả lời đúng được {selectedLesson?.id === "l15" ? "0,5625" : (selectedLesson?.id === "l2" || selectedLesson?.id === "l4" || selectedLesson?.id === "l5" || selectedLesson?.id === "l6" || selectedLesson?.id === "l7" || selectedLesson?.id === "l9" || selectedLesson?.id === "l10" || selectedLesson?.id === "l11" || selectedLesson?.id === "l12" || selectedLesson?.id === "l13" || selectedLesson?.id === "l16" || selectedLesson?.id === "l17" || selectedLesson?.id === "l18" || selectedLesson?.id === "l19" || selectedLesson?.id === "l20" || selectedLesson?.id === "l21" || selectedLesson?.id === "l22" || selectedLesson?.id === "l23" || selectedLesson?.id === "l24" || selectedLesson?.id === "l25") ? "0,25" : "0,3"} điểm
                        </span>
                      </div>

                      <div className="space-y-6">
                        {shuffledP1.map((q, idx) => {
                          const isAnswered = answersP1[q.id] !== undefined;
                          const isActive = activeQuestion?.part === "p1" && activeQuestion?.idx === idx;
                          
                          let cardClass = isLesson15
                            ? "p-5 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] rounded-3xl space-y-4 text-slate-950 relative cursor-pointer transition-all"
                            : isL1
                            ? "p-5 bg-gradient-to-b from-slate-50 to-slate-100/95 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl space-y-4 shadow-sm text-slate-900 relative cursor-pointer transition-all"
                            : "p-4 bg-slate-950/30 border border-slate-850 rounded-2xl space-y-3 relative cursor-pointer transition-all";
                            
                          if (isActive) {
                            cardClass += isL1 
                              ? " ring-4 ring-purple-500 ring-offset-2 scale-[1.01]"
                              : " ring-4 ring-purple-500/50 scale-[1.01]";
                          }

                          return (
                            <div 
                              key={q.id} 
                              id={`question-p1-${idx}`}
                              onClick={() => setActiveQuestion({ part: "p1", idx, id: q.id })}
                              className={cardClass}
                            >
                              {/* Cognitive level tag */}
                              <div className="flex justify-between items-center mb-1">
                                <span className={isL1 ? "text-[10px] font-mono font-extrabold text-slate-500 uppercase" : "text-[10px] font-mono font-bold text-slate-500 uppercase"}>Câu hỏi {idx + 1} / {shuffledP1.length}</span>
                                <span className={isLesson15
                                  ? `text-[10px] px-2.5 py-1 rounded-lg font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] ${
                                    q.level === "Nhận biết" ? "bg-cyan-100 text-cyan-950" :
                                    q.level === "Thông hiểu" ? "bg-amber-100 text-amber-950" : "bg-purple-100 text-purple-950"
                                  }`
                                  : isL1
                                  ? `text-[10px] px-2.5 py-1 rounded-lg font-bold border ${
                                    q.level === "Nhận biết" ? "bg-cyan-100 text-cyan-850 border-cyan-300" :
                                    q.level === "Thông hiểu" ? "bg-amber-100 text-amber-850 border-amber-300" : "bg-purple-100 text-purple-850 border-purple-300"
                                  }`
                                  : `text-[9px] px-2 py-0.5 rounded-full font-bold ${
                                    q.level === "Nhận biết" ? "bg-cyan-500/10 text-cyan-400" :
                                    q.level === "Thông hiểu" ? "bg-amber-500/10 text-amber-400" : "bg-purple-500/10 text-purple-400"
                                  }`
                                }>
                                  Mức độ: {q.level}
                                </span>
                              </div>

                              <p className={isLesson15
                                ? `text-sm font-black leading-relaxed text-slate-950 p-4 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] ${
                                  q.level === "Nhận biết" ? "bg-cyan-50" :
                                  q.level === "Thông hiểu" ? "bg-amber-50" :
                                  "bg-purple-50"
                                }`
                                : isL1
                                ? `text-sm font-black leading-relaxed text-slate-950 p-4 rounded-2xl border-2 border-b-[5px] ${
                                  q.level === "Nhận biết" ? "bg-cyan-50/80 border-cyan-200 border-b-cyan-300" :
                                  q.level === "Thông hiểu" ? "bg-amber-50/80 border-amber-200 border-b-amber-300" :
                                  "bg-purple-50/80 border-purple-200 border-b-purple-300"
                                }`
                                : "text-sm font-black leading-relaxed text-slate-100 bg-slate-900/40 p-3 rounded-xl border border-slate-900/60"
                              }><FormattedMathText text={q.question} /></p>

                              {q.illustrationType && renderPart3Illustration(q.illustrationType)}

                              {/* 4 Choices Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3">
                                {q.options.map((opt, oIdx) => {
                                  const isSelected = answersP1[q.id] === opt.id;
                                  const letter = String.fromCharCode(65 + oIdx);
                                  let btnClass = "";
                                  
                                  if (examSubmitted) {
                                    if (opt.isCorrect) {
                                      btnClass = isLesson15
                                        ? "bg-emerald-500 text-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] translate-y-[-2px] font-black"
                                        : "bg-emerald-500 text-white border-2 border-emerald-600 shadow-[0_4px_0_0_#047857] translate-y-[-2px] font-black";
                                    } else if (isSelected) {
                                      btnClass = isLesson15
                                        ? "bg-rose-500 text-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] translate-y-[-2px] font-black"
                                        : "bg-rose-500 text-white border-2 border-rose-600 shadow-[0_4px_0_0_#be123c] translate-y-[-2px] font-black";
                                    } else {
                                      btnClass = isLesson15
                                        ? "bg-slate-100 text-slate-400 border-2 border-slate-200 opacity-40 cursor-not-allowed"
                                        : isL1 
                                        ? "bg-slate-100 text-slate-400 border-2 border-slate-200 shadow-[0_1.5px_0_0_#e2e8f0] opacity-40 cursor-not-allowed"
                                        : "bg-slate-200/50 text-slate-500 border-2 border-slate-300 shadow-[0_1.5px_0_0_#cbd5e1] opacity-40 cursor-not-allowed";
                                    }
                                  } else if (isSelected) {
                                    btnClass = isLesson15
                                      ? "bg-yellow-300 text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] translate-y-[-2px] font-black"
                                      : "bg-gradient-to-b from-yellow-300 to-yellow-400 hover:from-yellow-200 hover:to-yellow-300 text-slate-950 border-2 border-yellow-500 shadow-[0_4px_0_0_#b45309] translate-y-[-2px] font-black";
                                  } else {
                                    btnClass = isLesson15
                                      ? "bg-white hover:bg-slate-50 text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#000] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000] font-extrabold"
                                      : isL1
                                      ? "bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 shadow-[0_4px_0_0_#e2e8f0] active:translate-y-[2px] active:shadow-[0_2px_0_0_#e2e8f0] font-extrabold"
                                      : "bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-slate-300 shadow-[0_4px_0_0_#cbd5e1] active:translate-y-[2px] active:shadow-[0_2px_0_0_#cbd5e1] font-bold";
                                  }

                                  return (
                                    <button
                                      key={opt.id}
                                      disabled={examSubmitted}
                                      onClick={() => setAnswersP1({ ...answersP1, [q.id]: opt.id })}
                                      className={`p-3 text-left text-xs rounded-xl border transition-all cursor-pointer ${btnClass}`}
                                    >
                                      <span className="font-black mr-1 text-inherit">{letter}.</span> <FormattedMathText text={opt.text} />
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Part 1 detailed review check */}
                              {examSubmitted && (
                                <div className={isL1
                                  ? "mt-3 p-4 bg-cyan-50/50 rounded-2xl border-2 border-cyan-200 text-xs text-slate-800 animate-fade-in shadow-inner"
                                  : "mt-3 p-3.5 bg-slate-950 rounded-xl border border-slate-850 text-xs text-slate-400 animate-fade-in"
                                }>
                                  <div className="flex items-center gap-1.5 text-slate-900 font-extrabold mb-1.5">
                                    <Info className={`h-3.5 w-3.5 ${isL1 ? "text-cyan-600" : "text-cyan-400"}`} />
                                    <span>Đáp án và gợi ý:</span>
                                  </div>
                                  <p className={isL1 ? "leading-relaxed text-slate-950 font-bold" : "leading-relaxed"}><FormattedMathText text={q.explanation} /></p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* PART 2: 4 TRUE/FALSE QUESTIONS */}
                    <div className="space-y-5">
                      <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 flex justify-between items-center">
                        <span className="text-[11px] font-black text-purple-400 uppercase tracking-wide">PHẦN II. Câu hỏi trắc nghiệm Đúng/Sai (4,0 điểm)</span>
                        <span className="text-[10px] font-mono text-slate-500 italic">Tính điểm chuẩn kỳ thi tốt nghiệp THPT</span>
                      </div>

                      <div className="space-y-6">
                        {shuffledP2.map((q, idx) => {
                          const isActive = activeQuestion?.part === "p2" && activeQuestion?.idx === idx;
                          
                          let cardClass = isLesson15
                            ? "p-5 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] rounded-3xl space-y-4 text-slate-950 relative cursor-pointer transition-all"
                            : isL1
                            ? "p-5 bg-gradient-to-b from-slate-50 to-slate-100/95 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl space-y-4 shadow-sm text-slate-900 relative cursor-pointer transition-all"
                            : "p-4 bg-slate-950/30 border border-slate-850 rounded-2xl space-y-4 relative cursor-pointer transition-all";
                            
                          if (isActive) {
                            cardClass += isL1 
                              ? " ring-4 ring-purple-500 ring-offset-2 scale-[1.01]"
                              : " ring-4 ring-purple-500/50 scale-[1.01]";
                          }

                          return (
                            <div 
                              key={q.id} 
                              id={`question-p2-${idx}`}
                              onClick={() => setActiveQuestion({ part: "p2", idx, id: q.id })}
                              className={cardClass}
                            >
                              <div className="flex justify-between items-center">
                                <span className={isL1 ? "text-[10px] font-mono font-extrabold text-slate-500 uppercase" : "text-[10px] font-mono font-bold text-slate-500 uppercase"}>Câu hỏi {idx + 1} / {shuffledP2.length}</span>
                              </div>

                              <p className={isLesson15
                                ? "text-sm font-black leading-relaxed text-slate-950 bg-indigo-50 p-4 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]"
                                : isL1
                                ? "text-sm font-black leading-relaxed text-slate-950 bg-indigo-50/70 p-4 rounded-2xl border-2 border-indigo-200 border-b-[5px] border-b-indigo-300"
                                : "text-sm font-black leading-relaxed text-slate-100 bg-slate-900/40 p-3 rounded-xl border border-slate-900/60"
                              }><FormattedMathText text={q.question} /></p>

                              {q.illustrationType && renderPart3Illustration(q.illustrationType)}

                              {/* 4 statements list */}
                              <div className="space-y-3 mt-3">
                                {q.statements.map((st, stIdx) => {
                                  const userVal = answersP2[q.id]?.[st.id]; // "T" or "F" or null
                                  
                                  return (
                                    <div key={st.id} className={isLesson15
                                      ? "p-4 bg-slate-50 border-2 border-slate-900 rounded-2xl space-y-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
                                      : isL1
                                      ? "p-4 bg-white border-2 border-slate-200 border-b-[4px] border-b-slate-300/80 rounded-2xl space-y-3 shadow-inner"
                                      : "p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-2"
                                    }>
                                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2.5">
                                        <div className="space-y-1">
                                          <div className="flex items-center gap-2">
                                            <span className={isL1 ? "text-[11px] font-black text-slate-600 font-mono" : "text-[10px] font-black text-slate-400 font-mono"}>Ý {String.fromCharCode(97 + stIdx)})</span>
                                            <span className={isLesson15
                                              ? `text-[9px] font-black px-2 py-0.5 rounded-lg border-2 border-slate-900 ${
                                                st.level === "Nhận biết" ? "bg-cyan-100 text-cyan-950" :
                                                st.level === "Thông hiểu" ? "bg-amber-100 text-amber-950" : "bg-purple-100 text-purple-950"
                                              }`
                                              : isL1
                                              ? `text-[9px] font-bold px-2 py-0.5 rounded-lg border ${
                                                st.level === "Nhận biết" ? "bg-cyan-100 text-cyan-850 border-cyan-200" :
                                                st.level === "Thông hiểu" ? "bg-amber-100 text-amber-850 border-amber-300" : "bg-purple-100 text-purple-850 border-purple-300"
                                              }`
                                              : `text-[8px] font-mono px-1.5 py-0.2 rounded ${
                                                st.level === "Nhận biết" ? "bg-cyan-500/10 text-cyan-400" :
                                                st.level === "Thông hiểu" ? "bg-amber-500/10 text-amber-400" : "bg-purple-500/10 text-purple-400"
                                              }`
                                            }>
                                              {st.level}
                                            </span>
                                          </div>
                                          <p className={isL1 ? "text-xs text-slate-900 leading-relaxed font-bold" : "text-xs text-slate-300 leading-relaxed"}><FormattedMathText text={st.text} /></p>
                                        </div>

                                        {/* True False select buttons */}
                                        <div className="flex gap-1.5 self-end shrink-0">
                                          {/* TRUE BUTTON */}
                                          <button
                                            disabled={examSubmitted}
                                            onClick={() => {
                                              const currentAnswers = { ...answersP2 };
                                              currentAnswers[q.id] = { ...currentAnswers[q.id], [st.id]: "T" };
                                              setAnswersP2(currentAnswers);
                                            }}
                                            className={`px-3 py-1.5 text-[10px] font-black rounded-lg border-2 cursor-pointer transition-all ${
                                              examSubmitted
                                                ? st.isCorrect
                                                  ? isLesson15
                                                    ? "bg-emerald-500 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] translate-y-[-1px]"
                                                    : "bg-emerald-500 text-white border-emerald-600 shadow-[0_3px_0_0_#047857] translate-y-[-1px]"
                                                  : userVal === "T"
                                                  ? isLesson15
                                                    ? "bg-rose-500 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] translate-y-[-1px]"
                                                    : "bg-rose-500 text-white border-rose-600 shadow-[0_3px_0_0_#be123c] translate-y-[-1px]"
                                                  : isLesson15
                                                  ? "bg-slate-100 text-slate-400 border-2 border-slate-200 opacity-40"
                                                  : isL1
                                                  ? "bg-slate-100 text-slate-400 border-slate-200 shadow-[0_1px_0_0_#e2e8f0] opacity-40"
                                                  : "bg-slate-200/50 text-slate-400 border-slate-300 shadow-[0_1px_0_0_#cbd5e1] opacity-40"
                                                : userVal === "T"
                                                ? isLesson15
                                                  ? "bg-yellow-300 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] translate-y-[-1px]"
                                                  : "bg-gradient-to-b from-yellow-300 to-yellow-400 text-slate-950 border-yellow-500 shadow-[0_3px_0_0_#b45309] translate-y-[-1px]"
                                                : isLesson15
                                                ? "bg-white hover:bg-slate-50 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px]"
                                                : isL1
                                                ? "bg-white hover:bg-slate-50 text-slate-900 border-slate-200 shadow-[0_3px_0_0_#e2e8f0] active:translate-y-[1px] active:shadow-[0_1px_0_0_#e2e8f0]"
                                                : "bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300 shadow-[0_3px_0_0_#cbd5e1] active:translate-y-[1px] active:shadow-[0_1px_0_0_#cbd5e1]"
                                            }`}
                                          >
                                            Đúng
                                          </button>

                                          {/* FALSE BUTTON */}
                                          <button
                                            disabled={examSubmitted}
                                            onClick={() => {
                                              const currentAnswers = { ...answersP2 };
                                              currentAnswers[q.id] = { ...currentAnswers[q.id], [st.id]: "F" };
                                              setAnswersP2(currentAnswers);
                                            }}
                                            className={`px-3 py-1.5 text-[10px] font-black rounded-lg border-2 cursor-pointer transition-all ${
                                              examSubmitted
                                                ? !st.isCorrect
                                                  ? isLesson15
                                                    ? "bg-emerald-500 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] translate-y-[-1px]"
                                                    : "bg-emerald-500 text-white border-emerald-600 shadow-[0_3px_0_0_#047857] translate-y-[-1px]"
                                                  : userVal === "F"
                                                  ? isLesson15
                                                    ? "bg-rose-500 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] translate-y-[-1px]"
                                                    : "bg-rose-500 text-white border-rose-600 shadow-[0_3px_0_0_#be123c] translate-y-[-1px]"
                                                  : isLesson15
                                                  ? "bg-slate-100 text-slate-400 border-2 border-slate-200 opacity-40"
                                                  : isL1
                                                  ? "bg-slate-100 text-slate-400 border-slate-200 shadow-[0_1px_0_0_#e2e8f0] opacity-40"
                                                  : "bg-slate-200/50 text-slate-400 border-slate-300 shadow-[0_1px_0_0_#cbd5e1] opacity-40"
                                                : userVal === "F"
                                                ? isLesson15
                                                  ? "bg-yellow-300 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] translate-y-[-1px]"
                                                  : "bg-gradient-to-b from-yellow-300 to-yellow-400 text-slate-950 border-yellow-500 shadow-[0_3px_0_0_#b45309] translate-y-[-1px]"
                                                : isLesson15
                                                ? "bg-white hover:bg-slate-50 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px]"
                                                : isL1
                                                ? "bg-white hover:bg-slate-50 text-slate-900 border-slate-200 shadow-[0_3px_0_0_#e2e8f0] active:translate-y-[1px] active:shadow-[0_1px_0_0_#e2e8f0]"
                                                : "bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300 shadow-[0_3px_0_0_#cbd5e1] active:translate-y-[1px] active:shadow-[0_1px_0_0_#cbd5e1]"
                                            }`}
                                          >
                                            Sai
                                          </button>
                                        </div>
                                      </div>

                                      {/* Statement hint explanation after submission */}
                                      {examSubmitted && (
                                        <div className={isL1
                                          ? "p-3 bg-emerald-50/50 rounded-xl border-2 border-emerald-150 text-[11px] text-slate-800 font-bold"
                                          : "p-2 bg-slate-950/80 rounded-lg border border-slate-900 text-[11px] text-slate-400 italic"
                                        }>
                                          - <strong className={isL1 ? "text-emerald-950 font-extrabold" : "text-slate-200"}>Lời giải:</strong> <FormattedMathText text={st.explanation} />
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* PART 3: SHORT-ANSWER QUESTIONS (Only for Lesson 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25) */}
                    {(selectedLesson?.id === "l2" || selectedLesson?.id === "l3" || selectedLesson?.id === "l4" || selectedLesson?.id === "l5" || selectedLesson?.id === "l6" || selectedLesson?.id === "l7" || selectedLesson?.id === "l9" || selectedLesson?.id === "l10" || selectedLesson?.id === "l11" || selectedLesson?.id === "l12" || selectedLesson?.id === "l13" || selectedLesson?.id === "l15" || selectedLesson?.id === "l16" || selectedLesson?.id === "l17" || selectedLesson?.id === "l18" || selectedLesson?.id === "l19" || selectedLesson?.id === "l20" || selectedLesson?.id === "l21" || selectedLesson?.id === "l22" || selectedLesson?.id === "l23" || selectedLesson?.id === "l24" || selectedLesson?.id === "l25") && shuffledP3.length > 0 && (
                      <div className="space-y-5 mt-8">
                        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 flex justify-between items-center">
                          <span className="text-[11px] font-black text-amber-400 uppercase tracking-wide">PHẦN III. Câu hỏi trắc nghiệm trả lời ngắn ({(selectedLesson?.id === "l2" || selectedLesson?.id === "l4" || selectedLesson?.id === "l5" || selectedLesson?.id === "l6" || selectedLesson?.id === "l7" || selectedLesson?.id === "l9" || selectedLesson?.id === "l10" || selectedLesson?.id === "l11" || selectedLesson?.id === "l12" || selectedLesson?.id === "l13" || selectedLesson?.id === "l15" || selectedLesson?.id === "l16" || selectedLesson?.id === "l17" || selectedLesson?.id === "l18" || selectedLesson?.id === "l19" || selectedLesson?.id === "l20" || selectedLesson?.id === "l21" || selectedLesson?.id === "l22" || selectedLesson?.id === "l23" || selectedLesson?.id === "l24" || selectedLesson?.id === "l25") ? "1,5 điểm" : "3,0 điểm"})</span>
                          <span className="text-[10px] font-mono text-slate-500 italic">Mỗi câu trả lời đúng được {(selectedLesson?.id === "l2" || selectedLesson?.id === "l4" || selectedLesson?.id === "l5" || selectedLesson?.id === "l6" || selectedLesson?.id === "l7" || selectedLesson?.id === "l9" || selectedLesson?.id === "l10" || selectedLesson?.id === "l11" || selectedLesson?.id === "l12" || selectedLesson?.id === "l13" || selectedLesson?.id === "l15" || selectedLesson?.id === "l16" || selectedLesson?.id === "l17" || selectedLesson?.id === "l18" || selectedLesson?.id === "l19" || selectedLesson?.id === "l20" || selectedLesson?.id === "l21" || selectedLesson?.id === "l22" || selectedLesson?.id === "l23" || selectedLesson?.id === "l24" || selectedLesson?.id === "l25") ? "0,25" : "0,5"} điểm. Nhập số nguyên hoặc số thập phân.</span>
                        </div>

                        <div className="space-y-6">
                           {shuffledP3.map((q, idx) => {
                             const userVal = answersP3[q.id] || "";
                             const userNum = parseFloat(userVal.trim().replace(",", "."));
                             const isCorrect = examSubmitted && !isNaN(userNum) && userNum === q.answer;
                             const isActive = activeQuestion?.part === "p3" && activeQuestion?.idx === idx;
                             
                             let cardClass = isLesson15
                               ? "p-5 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] rounded-3xl space-y-4 text-slate-950 relative cursor-pointer transition-all"
                               : isL1
                               ? "p-5 bg-gradient-to-b from-slate-50 to-slate-100/95 border-2 border-slate-200 border-b-[6px] border-b-slate-300 rounded-3xl space-y-4 shadow-sm text-slate-900 relative cursor-pointer transition-all"
                               : "p-4 bg-slate-950/30 border border-slate-850 rounded-2xl space-y-4 relative cursor-pointer transition-all";
                               
                             if (isActive) {
                               cardClass += isL1 
                                 ? " ring-4 ring-purple-500 ring-offset-2 scale-[1.01]"
                                 : " ring-4 ring-purple-500/50 scale-[1.01]";
                             }

                             return (
                               <div 
                                 key={q.id} 
                                 id={`question-p3-${idx}`}
                                 onClick={() => setActiveQuestion({ part: "p3", idx, id: q.id })}
                                 className={cardClass}
                               >
                                <div className="flex justify-between items-center">
                                  <span className={isL1 ? "text-[10px] font-mono font-extrabold text-slate-500 uppercase" : "text-[10px] font-mono font-bold text-slate-500 uppercase"}>Câu hỏi {idx + 1} / {shuffledP3.length}</span>
                                  <span className={isLesson15
                                    ? `text-[10px] px-2.5 py-1 rounded-lg font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] ${
                                      q.level === "Nhận biết" ? "bg-cyan-100 text-cyan-950" :
                                      q.level === "Thông hiểu" ? "bg-amber-100 text-amber-950" : "bg-purple-100 text-purple-950"
                                    }`
                                    : isL1
                                    ? `text-[10px] px-2.5 py-1 rounded-lg font-bold border ${
                                      q.level === "Nhận biết" ? "bg-cyan-100 text-cyan-850 border-cyan-300" :
                                      q.level === "Thông hiểu" ? "bg-amber-100 text-amber-850 border-amber-300" : "bg-purple-100 text-purple-850 border-purple-300"
                                    }`
                                    : `text-[9px] px-2 py-0.5 rounded-full font-bold ${
                                      q.level === "Nhận biết" ? "bg-cyan-500/10 text-cyan-400" :
                                      q.level === "Thông hiểu" ? "bg-amber-500/10 text-amber-400" : "bg-purple-500/10 text-purple-400"
                                    }`
                                  }>
                                    Mức độ: {q.level}
                                  </span>
                                </div>

                                <p className={isLesson15
                                  ? `text-sm font-black leading-relaxed text-slate-950 p-4 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] ${
                                    q.level === "Nhận biết" ? "bg-cyan-50" :
                                    q.level === "Thông hiểu" ? "bg-amber-50" :
                                    "bg-purple-50"
                                  }`
                                  : isL1
                                  ? `text-sm font-black leading-relaxed text-slate-950 p-4 rounded-2xl border-2 border-b-[5px] ${
                                    q.level === "Nhận biết" ? "bg-cyan-50/80 border-cyan-200 border-b-cyan-300" :
                                    q.level === "Thông hiểu" ? "bg-amber-50/80 border-amber-200 border-b-amber-300" :
                                    "bg-purple-50/80 border-purple-200 border-b-purple-300"
                                  }`
                                  : "text-sm font-black leading-relaxed text-slate-100 bg-slate-900/40 p-3 rounded-xl border border-slate-900/60"
                                }><FormattedMathText text={q.question} /></p>

                                {q.illustrationType && renderPart3Illustration(q.illustrationType)}

                                <div className="flex items-center gap-3">
                                  <span className={isL1 ? "text-xs text-slate-755 font-extrabold" : "text-xs text-slate-400 font-bold"}>Đáp án của bạn:</span>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      disabled={examSubmitted}
                                      value={userVal}
                                      onChange={(e) => {
                                        setAnswersP3({ ...answersP3, [q.id]: e.target.value });
                                      }}
                                      placeholder="Nhập kết quả..."
                                      className={isLesson15
                                        ? `px-3.5 py-2.5 text-xs bg-white text-slate-950 border-2 border-slate-900 rounded-xl focus:outline-none focus:border-cyan-500 transition-all font-mono w-40 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] ${
                                          examSubmitted
                                            ? isCorrect
                                              ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-black"
                                              : "border-rose-500 bg-rose-50 text-rose-950 font-black"
                                            : "border-slate-900"
                                        }`
                                        : isL1
                                        ? `px-3.5 py-2.5 text-xs bg-white text-slate-950 border-2 rounded-xl focus:outline-none focus:border-cyan-400 transition-all font-mono w-40 ${
                                          examSubmitted
                                            ? isCorrect
                                              ? "border-emerald-500 bg-emerald-50 text-emerald-850 font-black"
                                              : "border-rose-500 bg-rose-50 text-rose-850 font-black"
                                            : "border-slate-300"
                                        }`
                                        : `px-3 py-2 text-xs bg-slate-950 text-white border-2 rounded-xl focus:outline-none focus:border-cyan-400 transition-all font-mono w-40 ${
                                          examSubmitted
                                            ? isCorrect
                                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                                              : "border-rose-500 bg-rose-500/10 text-rose-300"
                                            : "border-slate-850"
                                        }`
                                      }
                                    />
                                    {q.unit && (
                                      <span className={isL1 ? "absolute right-3 top-3 text-xs text-slate-500 font-extrabold uppercase" : "absolute right-3 top-2 text-xs text-slate-500 font-bold uppercase"}>{q.unit}</span>
                                    )}
                                  </div>
                                  
                                  {examSubmitted && (
                                    <span className={`text-xs font-black uppercase ${isCorrect ? "text-emerald-600" : "text-rose-600"}`}>
                                      {isCorrect ? "Chính xác" : "Chưa đúng"}
                                    </span>
                                  )}
                                </div>

                                {/* Part 3 explanation after submission */}
                                {examSubmitted && (
                                  <div className={isL1
                                    ? "mt-3 p-4 bg-cyan-50/50 rounded-2xl border-2 border-cyan-200 text-xs text-slate-800 animate-fade-in shadow-inner"
                                    : "mt-3 p-3.5 bg-slate-950 rounded-xl border border-slate-850 text-xs text-slate-400 animate-fade-in"
                                  }>
                                    <div className="flex items-center gap-1.5 text-slate-900 font-extrabold mb-1.5">
                                      <Info className={`h-3.5 w-3.5 ${isL1 ? "text-cyan-600" : "text-cyan-400"}`} />
                                      <span>Đáp án đúng: <strong className={isL1 ? "text-emerald-700 font-black text-sm" : "text-emerald-400 font-mono text-sm"}>{q.answer} {q.unit}</strong> | Lời giải chi tiết:</span>
                                    </div>
                                    <p className={isL1 ? "leading-relaxed text-slate-950 font-bold" : "leading-relaxed text-slate-300"}><FormattedMathText text={q.explanation} /></p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    </div>
                  </div>

                  {/* Submission triggers */}
                  {!examSubmitted ? (
                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={handleGradeTest}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl border-2 border-emerald-500 shadow-[0_4px_0_0_#047857] active:translate-y-[2px] active:shadow-[0_2px_0_0_#047857] cursor-pointer transition-all flex items-center gap-1.5"
                      >
                        <Check className="h-4 w-4" />
                        Nộp bài & Chấm điểm
                      </button>
                    </div>
                  ) : (
                    <div className="pt-4 flex justify-between items-center">
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">Đã lưu trữ kết quả trên hệ thống</span>
                      <button
                        onClick={() => initializeTest()}
                        className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl border-2 border-amber-500 shadow-[0_3px_0_0_#b45309] active:translate-y-[1px] active:shadow-[0_1px_0_0_#b45309] cursor-pointer transition-all"
                      >
                        Làm đề mới (Đổi vị trí & Đảo câu)
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5 FALLBACK FOR OTHER LESSONS */}
              {activeLessonTab === "quiz" && selectedLesson.id !== "l1" && selectedLesson.id !== "l2" && selectedLesson.id !== "l3" && selectedLesson.id !== "l4" && selectedLesson.id !== "l5" && selectedLesson.id !== "l6" && selectedLesson.id !== "l7" && selectedLesson.id !== "l8" && selectedLesson.id !== "l9" && selectedLesson.id !== "l10" && selectedLesson.id !== "l11" && selectedLesson.id !== "l12" && selectedLesson.id !== "l13" && selectedLesson.id !== "l14" && selectedLesson.id !== "l15" && selectedLesson.id !== "l16" && selectedLesson.id !== "l17" && selectedLesson.id !== "l18" && selectedLesson.id !== "l19" && selectedLesson.id !== "l20" && selectedLesson.id !== "l21" && selectedLesson.id !== "l22" && selectedLesson.id !== "l23" && selectedLesson.id !== "l24" && selectedLesson.id !== "l25" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-white">Trắc nghiệm nhanh kiểm tra năng lực</h3>
                  </div>
                  <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-950/20">
                    <AlertCircle className="h-8 w-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Vui lòng chọn các bài từ Bài 1 đến Bài 25 để thực hiện luyện tập kiểm tra chuẩn THPT.</p>
                  </div>
                </div>
              )}

              {/* TAB 6: AI SUMMARIZER */}
              {activeLessonTab === "ai" && (
                <div className="space-y-5">
                  <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold text-white">AI Phân tích Học liệu số</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Sử dụng mô hình Gemini 3.5 Flash phân tích nội dung chuyên đề sâu sắc</p>
                    </div>
                    <button
                      onClick={handleAISummarize}
                      disabled={isLoadingAI}
                      className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/10 cursor-pointer"
                    >
                      {isLoadingAI ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                      Phân tích bài học với AI
                    </button>
                  </div>

                  {aiSummary ? (
                    <div className="space-y-5 animate-fade-in text-xs leading-relaxed">
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                        <span className="text-[10px] font-bold text-cyan-400 block uppercase tracking-wider mb-1.5">Tóm tắt siêu tốc:</span>
                        <p className="text-slate-200">{aiSummary.summaryText}</p>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                        <span className="text-[10px] font-bold text-amber-400 block uppercase tracking-wider mb-2">Các khái niệm cốt lõi cần nhớ:</span>
                        <ul className="space-y-1.5 list-disc pl-4 text-slate-350">
                          {aiSummary.keyConcepts?.map((concept: string, idx: number) => (
                            <li key={idx}>{concept}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                        <span className="text-[10px] font-bold text-purple-400 block uppercase tracking-wider mb-1.5">Giải thích hiện tượng Vật lí thực tế khó:</span>
                        <p className="text-slate-200">{aiSummary.deepExplanation}</p>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-[10px]">
                        <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider mb-2 font-sans">Sơ đồ tư duy dạng văn bản (Mindmap):</span>
                        <div className="whitespace-pre-line text-slate-400 leading-relaxed">
                          {aiSummary.mindmapText}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-950/20 flex flex-col items-center justify-center">
                      <Sparkles className="h-8 w-8 text-slate-600 mb-2 animate-pulse" />
                      <span className="text-xs text-slate-400 font-semibold">Bấm vào nút "Phân tích bài học với AI" ở góc trên bên phải để bắt đầu.</span>
                    </div>
                  )}
                </div>
              )}

              {/* Study Completion progress bar */}
              <div className="border-t border-slate-800/60 mt-6 pt-4 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">LMS PhysicsAI 12</span>
                <button
                  onClick={() => {
                    onEarnXP(50);
                    alert("Chúc mừng bạn đã hoàn thành nghiên cứu chuyên đề này! Bạn nhận được +50 XP");
                  }}
                  className="px-4 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Đánh dấu hoàn thành
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TEACHER ADD QUESTION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-2xl shadow-2xl relative my-8">
            <button
              onClick={() => {
                setShowAddModal(false);
                setUploadError(null);
                setUploadSuccess(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-emerald-400 animate-pulse" />
              <h3 className="text-md font-extrabold text-white uppercase">AI Import Đề thi Vật lí 12</h3>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed mb-5">
              Tải lên tài liệu đề thi dạng <strong className="text-slate-300">Word (.docx)</strong>, <strong className="text-slate-300">PDF (.pdf)</strong> hoặc <strong className="text-slate-300">Ảnh đề bài (.png, .jpg)</strong>. 
              Mô hình ngôn ngữ lớn <strong className="text-emerald-400 font-mono">Gemini 3.5 Flash</strong> sẽ thực hiện OCR nhận diện chữ viết, phân loại thông minh và tự động đồng bộ trực tiếp vào Ngân hàng câu hỏi.
            </p>

            <div className="space-y-4">
              {/* Drag & Drop style area */}
              {!isUploadingFile && !uploadSuccess && (
                <label className="border-2 border-dashed border-slate-850 hover:border-emerald-500/40 bg-slate-950/40 hover:bg-slate-950/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
                  <input
                    type="file"
                    accept=".docx,.doc,.pdf,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl mb-3 text-slate-400 group-hover:text-emerald-400 transition-colors">
                    <FileText className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white mb-1">
                    Nhấp để chọn tệp từ thiết bị của bạn
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Hỗ trợ .docx, .pdf, .png, .jpg (Tối đa 10MB)
                  </span>
                </label>
              )}

              {/* Loading progress */}
              {isUploadingFile && (
                <div className="bg-slate-950/50 border border-slate-850 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                  <div className="relative mb-4">
                    <div className="w-12 h-12 border-4 border-slate-800 border-t-emerald-400 rounded-full animate-spin"></div>
                    <Sparkles className="h-5 w-5 text-emerald-400 absolute inset-0 m-auto animate-ping" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 mb-1.5">AI đang xử lý học liệu Vật lí...</h4>
                  <p className="text-[10px] text-slate-400 max-w-sm leading-relaxed">
                    Đang tiến hành trích xuất văn bản, nhận diện công thức toán lý, giải quyết đáp án trắc nghiệm và phân loại Đúng/Sai theo chuẩn GDPT 2018. Vui lòng đợi trong giây lát...
                  </p>
                </div>
              )}

              {/* Success output alert */}
              {uploadSuccess && (
                <div className="space-y-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-emerald-400">Import thành công học liệu!</h4>
                      <p className="text-[10px] text-slate-300 leading-relaxed mt-1">
                        {uploadSuccess}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic control buttons */}
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setShowAddModal(false);
                        setUploadSuccess(null);
                      }}
                      className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs rounded-xl cursor-pointer transition-transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Bắt đầu làm đề mới ngay
                    </button>
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {uploadError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5 animate-bounce" />
                  <div>
                    <h4 className="text-xs font-bold text-red-400">Không thể import đề thi</h4>
                    <p className="text-[10px] text-slate-300 leading-relaxed mt-1">
                      {uploadError}
                    </p>
                    <p className="text-[9px] text-slate-500 mt-2 italic">
                      * Mẹo: Hãy chắc chắn rằng tài liệu Word/PDF của bạn có chứa nội dung câu hỏi rõ ràng. Đối với ảnh, hãy đảm bảo độ phân giải đủ sáng để máy ảnh nhận diện chính xác.
                    </p>
                  </div>
                </div>
              )}

              {/* Info Tips footer inside modal */}
              {!isUploadingFile && !uploadSuccess && (
                <div className="bg-slate-950/20 border border-slate-850 rounded-xl p-3 flex gap-2">
                  <Info className="h-4 w-4 text-cyan-400 shrink-0" />
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    <strong className="text-slate-400">Ngân hàng câu hỏi động:</strong> Sau khi nạp tệp thành công, hệ thống LMS sẽ trộn ngẫu nhiên và sắp xếp các câu hỏi này vào đề kiểm tra, giúp học sinh của bạn có nguồn đề phong phú và chống gian lận cực kỳ hiệu quả.
                  </p>
                </div>
              )}

              {/* Close panel */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-850 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setUploadError(null);
                    setUploadSuccess(null);
                  }}
                  className="px-4 py-1.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  Đóng
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PERSISTENT BOTTOM PROGRESS BAR & MAP FOR MOBILE/TABLET */}
      {selectedLesson && activeLessonTab === "quiz" && (
        <div className="lg:hidden">
          {/* Sticky Bottom Bar Dashboard */}
          <div className="fixed bottom-0 inset-x-0 z-45 bg-white border-t-2 border-slate-900 px-4 py-2.5 shadow-[0_-4px_16px_rgba(15,23,42,0.12)] flex flex-col gap-1.5 font-sans">
            <div className="flex items-center justify-between text-[11px] font-black text-slate-700">
              <span className="uppercase tracking-wider flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span>Tiến độ: {totalAnsweredCount}/{totalQuestionsCount} ({percent}%)</span>
              </span>
              <button 
                type="button"
                onClick={() => setIsMobileAnswerSheetOpen(true)}
                className="text-purple-600 hover:text-purple-800 font-extrabold uppercase tracking-wide text-[10px] hover:underline"
              >
                Mở phiếu chi tiết ↗
              </button>
            </div>
            
            {/* Horizontal Question Scrollable row */}
            <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scroll-smooth select-none">
              {/* Part 1 bubbles */}
              {shuffledP1.map((q, idx) => {
                const isAns = answersP1[q.id] !== undefined;
                let colorClass = "bg-slate-100 text-slate-500 border-slate-250 hover:bg-slate-200";
                
                if (examSubmitted) {
                  const isCorrect = answersP1[q.id] === q.options.find(o => o.isCorrect)?.id;
                  colorClass = isAns 
                    ? (isCorrect ? "bg-emerald-500 text-white border-emerald-600 font-black" : "bg-rose-500 text-white border-rose-600 font-black") 
                    : "bg-slate-100 text-slate-300 border-slate-200";
                } else if (isAns) {
                  colorClass = "bg-purple-600 text-white border-purple-700 font-black";
                }
                
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setActiveQuestion({ part: "p1", idx, id: q.id });
                      document.getElementById(`question-p1-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className={`w-7.5 h-7.5 shrink-0 rounded-lg text-[9px] border flex items-center justify-center transition-all ${colorClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}

              {/* Part 2 bubbles */}
              {shuffledP2.map((q, idx) => {
                return q.statements?.map((st, sIdx) => {
                  const isAns = answersP2[q.id]?.[st.id] !== undefined;
                  let colorClass = "bg-slate-100 text-slate-500 border-slate-250 hover:bg-slate-200";
                  
                  if (examSubmitted) {
                    const isCorrect = answersP2[q.id]?.[st.id] === (st.isCorrect ? "T" : "F");
                    colorClass = isAns 
                      ? (isCorrect ? "bg-emerald-500 text-white border-emerald-600 font-black" : "bg-rose-500 text-white border-rose-600 font-black") 
                      : "bg-slate-100 text-slate-300 border-slate-200";
                  } else if (isAns) {
                    colorClass = "bg-purple-600 text-white border-purple-700 font-black";
                  }
                  
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        setActiveQuestion({ part: "p2", idx, id: q.id });
                        document.getElementById(`question-p2-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={`w-7.5 h-7.5 shrink-0 rounded-lg text-[8px] border flex items-center justify-center transition-all ${colorClass}`}
                    >
                      {idx + 1 + shuffledP1.length}{String.fromCharCode(97 + sIdx)}
                    </button>
                  );
                });
              })}

              {/* Part 3 bubbles */}
              {shuffledP3.map((q, idx) => {
                const isAns = answersP3[q.id] && answersP3[q.id].trim() !== "";
                let colorClass = "bg-slate-100 text-slate-500 border-slate-250 hover:bg-slate-200";
                
                if (examSubmitted) {
                  const isCorrect = answersP3[q.id]?.trim() === q.answer.toString().trim();
                  colorClass = isAns 
                    ? (isCorrect ? "bg-emerald-500 text-white border-emerald-600 font-black" : "bg-rose-500 text-white border-rose-600 font-black") 
                    : "bg-slate-100 text-slate-300 border-slate-200";
                } else if (isAns) {
                  colorClass = "bg-purple-600 text-white border-purple-700 font-black";
                }
                
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setActiveQuestion({ part: "p3", idx, id: q.id });
                      document.getElementById(`question-p3-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className={`w-7.5 h-7.5 shrink-0 rounded-lg text-[9px] border flex items-center justify-center transition-all ${colorClass}`}
                  >
                    {idx + 1 + shuffledP1.length + shuffledP2.length}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Sheet Drawer Backdrop */}
          {isMobileAnswerSheetOpen && (
            <div 
              className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileAnswerSheetOpen(false)}
            />
          )}

          {/* Bottom Sheet Drawer Content */}
          <div 
            className={`fixed inset-x-0 bottom-0 z-50 bg-slate-50 rounded-t-[32px] border-t-2 border-slate-900 shadow-2xl transition-transform duration-300 ease-out max-h-[80vh] flex flex-col ${
              isMobileAnswerSheetOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {/* Handle bar */}
            <div className="flex justify-center py-3 shrink-0 cursor-pointer" onClick={() => setIsMobileAnswerSheetOpen(false)}>
              <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
            </div>

            {/* Drawer Header */}
            <div className="px-6 pb-2 border-b border-slate-200 flex justify-between items-center shrink-0">
              <div className="text-left">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Phiếu bài làm</h3>
                <span className="text-[10px] text-slate-400 font-semibold italic">Nhấp số để di chuyển nhanh</span>
              </div>
              <button 
                onClick={() => setIsMobileAnswerSheetOpen(false)}
                className="p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-500 hover:text-slate-800 transition-all active:scale-90"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Scrollable Body */}
            <div className="p-4 overflow-y-auto flex-1">
              {renderAnswerSheetCard()}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
