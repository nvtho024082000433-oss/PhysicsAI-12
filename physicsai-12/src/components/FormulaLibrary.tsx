import React, { useState, useMemo } from "react";
import { 
  Search, 
  BookOpen, 
  HelpCircle, 
  Calculator, 
  RotateCcw, 
  Sparkles, 
  Activity, 
  Radio, 
  Zap, 
  Atom, 
  Info,
  Check,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export interface FormulaVariable {
  symbol: string;
  name: string;
  unit: string;
  placeholder?: string;
  defaultValue?: number;
}

export interface PhysicsFormulaItem {
  id: string;
  name: string;
  expression: string;
  topic: "Dao động" | "Sóng" | "Điện xoay chiều" | "Vật lí hạt nhân";
  description: string;
  variables: FormulaVariable[];
  // Dynamic calculator specification
  calculateLabel: string;
  calculateFn: (inputs: Record<string, number>) => { result: number; steps: string[] };
  outputUnit: string;
}

const FORMULA_DATABASE: PhysicsFormulaItem[] = [
  // --- CHỦ ĐỀ: DAO ĐỘNG ---
  {
    id: "shm-eq",
    name: "Phương trình dao động điều hòa",
    expression: "$$x = A \\cos(\\omega t + \\varphi)$$",
    topic: "Dao động",
    description: "Mô tả tọa độ (ly độ) của một vật dao động điều hòa theo thời gian t dưới dạng hàm số cosin.",
    variables: [
      { symbol: "A", name: "Biên độ dao động", unit: "cm", defaultValue: 5, placeholder: "Nhập biên độ A..." },
      { symbol: "omega", name: "Tần số góc (ω)", unit: "rad/s", defaultValue: 10, placeholder: "Nhập tần số góc..." },
      { symbol: "t", name: "Thời gian khảo sát", unit: "s", defaultValue: 0.5, placeholder: "Nhập thời gian t..." },
      { symbol: "phi", name: "Pha ban đầu (φ)", unit: "rad", defaultValue: 0, placeholder: "Nhập pha ban đầu..." }
    ],
    calculateLabel: "Tính ly độ x tại thời điểm t",
    outputUnit: "cm",
    calculateFn: (inputs) => {
      const { A, omega, t, phi } = inputs;
      const angle = omega * t + phi;
      const result = A * Math.cos(angle);
      return {
        result: parseFloat(result.toFixed(3)),
        steps: [
          `Tính góc pha tại thời điểm t: \\Phi = \\omega t + \\varphi = ${omega} \\cdot ${t} + ${phi} = ${angle.toFixed(3)} \\text{ rad}`,
          `Tính giá trị lượng giác: \\cos(${angle.toFixed(3)}) = ${Math.cos(angle).toFixed(4)}`,
          `Tính ly độ x: x = A \\cdot \\cos(\\omega t + \\varphi) = ${A} \\cdot ${Math.cos(angle).toFixed(4)} = ${result.toFixed(3)} \\text{ cm}`
        ]
      };
    }
  },
  {
    id: "spring-pendulum",
    name: "Chu kỳ & Tần số con lắc lò xo",
    expression: "$$T = 2\\pi\\sqrt{\\frac{m}{k}} \\quad ; \\quad f = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}$$",
    topic: "Dao động",
    description: "Mô tả chu kỳ và tần số dao động tự do của hệ con lắc gồm lò xo có độ cứng k và vật có khối lượng m.",
    variables: [
      { symbol: "m", name: "Khối lượng vật nhỏ", unit: "kg", defaultValue: 0.2, placeholder: "Khối lượng m..." },
      { symbol: "k", name: "Độ cứng của lò xo", unit: "N/m", defaultValue: 80, placeholder: "Độ cứng k..." }
    ],
    calculateLabel: "Tính Chu kỳ (T) và Tần số (f)",
    outputUnit: "s (Chu kỳ) / Hz (Tần số)",
    calculateFn: (inputs) => {
      const { m, k } = inputs;
      if (k <= 0 || m <= 0) {
        return { result: 0, steps: ["Lỗi: Độ cứng k và khối lượng m phải lớn hơn 0."] };
      }
      const T = 2 * Math.PI * Math.sqrt(m / k);
      const f = 1 / T;
      return {
        result: parseFloat(T.toFixed(3)),
        steps: [
          `Tính tỉ số khối lượng trên độ cứng: \\frac{m}{k} = \\frac{${m}}{${k}} = ${(m / k).toFixed(5)}`,
          `Tính căn bậc hai của tỉ số: \\sqrt{\\frac{m}{k}} = ${Math.sqrt(m / k).toFixed(5)}`,
          `Tính Chu kỳ T: T = 2\\pi \\cdot ${Math.sqrt(m / k).toFixed(5)} = ${T.toFixed(3)} \\text{ s}`,
          `Tính Tần số f: f = \\frac{1}{T} = \\frac{1}{${T.toFixed(3)}} = ${f.toFixed(2)} \\text{ Hz}`
        ]
      };
    }
  },
  {
    id: "simple-pendulum",
    name: "Chu kỳ & Tần số con lắc đơn",
    expression: "$$T = 2\\pi\\sqrt{\\frac{\\ell}{g}} \\quad ; \\quad f = \\frac{1}{2\\pi}\\sqrt{\\frac{g}{\\ell}}$$",
    topic: "Dao động",
    description: "Xác định chu kỳ dao động nhỏ (điều hòa) của con lắc đơn phụ thuộc vào chiều dài dây treo và gia tốc trọng trường tại nơi treo.",
    variables: [
      { symbol: "l", name: "Chiều dài dây treo (ℓ)", unit: "m", defaultValue: 1.0, placeholder: "Chiều dài dây..." },
      { symbol: "g", name: "Gia tốc trọng trường", unit: "m/s²", defaultValue: 9.8, placeholder: "Gia tốc g..." }
    ],
    calculateLabel: "Tính Chu kỳ T của con lắc đơn",
    outputUnit: "s",
    calculateFn: (inputs) => {
      const { l, g } = inputs;
      if (l <= 0 || g <= 0) {
        return { result: 0, steps: ["Lỗi: Chiều dài và gia tốc trọng trường phải lớn hơn 0."] };
      }
      const T = 2 * Math.PI * Math.sqrt(l / g);
      const f = 1 / T;
      return {
        result: parseFloat(T.toFixed(3)),
        steps: [
          `Tính tỉ số chiều dài trên gia tốc: \\frac{\\ell}{g} = \\frac{${l}}{${g}} = ${(l / g).toFixed(5)}`,
          `Tính căn bậc hai tỉ số: \\sqrt{\\frac{\\ell}{g}} = ${Math.sqrt(l / g).toFixed(5)}`,
          `Tính Chu kỳ T: T = 2\\pi \\cdot ${Math.sqrt(l / g).toFixed(5)} = ${T.toFixed(3)} \\text{ s}`,
          `Tần số dao động tương ứng: f = \\frac{1}{T} \\approx ${f.toFixed(2)} \\text{ Hz}`
        ]
      };
    }
  },
  {
    id: "energy-shm",
    name: "Cơ năng dao động điều hòa",
    expression: "$$E = E_d + E_t = \\frac{1}{2} m \\omega^2 A^2$$",
    topic: "Dao động",
    description: "Cơ năng của vật dao động điều hòa bảo toàn qua mọi vị trí, tỉ lệ thuận với bình phương biên độ và bình phương tần số góc.",
    variables: [
      { symbol: "m", name: "Khối lượng vật", unit: "kg", defaultValue: 0.1, placeholder: "Khối lượng m..." },
      { symbol: "omega", name: "Tần số góc (ω)", unit: "rad/s", defaultValue: 20, placeholder: "Tần số góc..." },
      { symbol: "A", name: "Biên độ dao động", unit: "m", defaultValue: 0.08, placeholder: "Biên độ A (m)..." }
    ],
    calculateLabel: "Tính cơ năng dao động E",
    outputUnit: "J (Joule)",
    calculateFn: (inputs) => {
      const { m, omega, A } = inputs;
      const E = 0.5 * m * Math.pow(omega, 2) * Math.pow(A, 2);
      return {
        result: parseFloat(E.toFixed(4)),
        steps: [
          `Bình phương biên độ: A^2 = ${A}^2 = ${Math.pow(A, 2).toFixed(5)} \\text{ m}^2`,
          `Bình phương tần số góc: \\omega^2 = ${omega}^2 = ${Math.pow(omega, 2)} \\text{ (rad/s)}^2`,
          `Tính cơ năng: E = \\frac{1}{2} \\cdot m \\cdot \\omega^2 \\cdot A^2`,
          `Thay số: E = 0.5 \\cdot ${m} \\cdot ${Math.pow(omega, 2)} \\cdot ${Math.pow(A, 2).toFixed(5)} = ${E.toFixed(4)} \\text{ J}`
        ]
      };
    }
  },

  // --- CHỦ ĐỀ: SÓNG VÀ TRUYỀN SÓNG ---
  {
    id: "wave-length",
    name: "Tốc độ truyền sóng & Bước sóng",
    expression: "$$\\lambda = v \\cdot T = \\frac{v}{f}$$",
    topic: "Sóng",
    description: "Bước sóng là quãng đường mà sóng lan truyền được trong một chu kỳ dao động.",
    variables: [
      { symbol: "v", name: "Tốc độ truyền sóng", unit: "m/s", defaultValue: 340, placeholder: "Tốc độ v..." },
      { symbol: "f", name: "Tần số sóng", unit: "Hz", defaultValue: 1000, placeholder: "Tần số f..." }
    ],
    calculateLabel: "Tính bước sóng (λ)",
    outputUnit: "m",
    calculateFn: (inputs) => {
      const { v, f } = inputs;
      if (f <= 0) return { result: 0, steps: ["Lỗi: Tần số f phải lớn hơn 0."] };
      const lambda = v / f;
      return {
        result: parseFloat(lambda.toFixed(4)),
        steps: [
          `Áp dụng công thức liên hệ bước sóng: \\lambda = \\frac{v}{f}`,
          `Thay số: \\lambda = \\frac{${v}}{${f}} = ${lambda.toFixed(4)} \\text{ m}`
        ]
      };
    }
  },
  {
    id: "wave-interf-max",
    name: "Điều kiện Cực đại giao thoa sóng",
    expression: "$$d_2 - d_1 = k\\lambda \\quad (k \\in \\mathbb{Z})$$",
    topic: "Sóng",
    description: "Trong giao thoa hai nguồn cùng pha, vị trí cực đại giao thoa có hiệu đường đi từ hai nguồn bằng một số nguyên lần bước sóng.",
    variables: [
      { symbol: "k", name: "Bậc cực đại (số nguyên k)", unit: "bậc", defaultValue: 2, placeholder: "Bậc cực đại..." },
      { symbol: "lambda", name: "Bước sóng (λ)", unit: "cm", defaultValue: 3, placeholder: "Bước sóng..." }
    ],
    calculateLabel: "Tính hiệu đường truyền d2 - d1",
    outputUnit: "cm",
    calculateFn: (inputs) => {
      const { k, lambda } = inputs;
      const deltaD = k * lambda;
      return {
        result: parseFloat(deltaD.toFixed(2)),
        steps: [
          `Xác định bậc giao thoa k = ${k}`,
          `Tính hiệu đường đi: d_2 - d_1 = k \\cdot \\lambda = ${k} \\cdot ${lambda} = ${deltaD.toFixed(2)} \\text{ cm}`
        ]
      };
    }
  },
  {
    id: "standing-wave-fixed",
    name: "Sóng dừng hai đầu cố định",
    expression: "$$\\ell = k \\frac{\\lambda}{2} \\quad (k \\in \\mathbb{N}^*)$$",
    topic: "Sóng",
    description: "Chiều dài của dây hai đầu cố định bằng một số nguyên lần nửa bước sóng. k chính là số bụng sóng trên dây.",
    variables: [
      { symbol: "k", name: "Số bụng sóng (k)", unit: "bụng", defaultValue: 4, placeholder: "Số bụng..." },
      { symbol: "lambda", name: "Bước sóng (λ)", unit: "m", defaultValue: 0.6, placeholder: "Bước sóng..." }
    ],
    calculateLabel: "Tính chiều dài dây (ℓ)",
    outputUnit: "m",
    calculateFn: (inputs) => {
      const { k, lambda } = inputs;
      const l = k * (lambda / 2);
      return {
        result: parseFloat(l.toFixed(3)),
        steps: [
          `Tính chiều dài nửa bước sóng: \\frac{\\lambda}{2} = \\frac{${lambda}}{2} = ${(lambda / 2).toFixed(3)} \\text{ m}`,
          `Chiều dài dây: \\ell = k \\cdot \\frac{\\lambda}{2} = ${k} \\cdot ${(lambda / 2).toFixed(3)} = ${l.toFixed(3)} \\text{ m}`,
          `Nhận xét: Sóng dừng có ${k} bụng sóng và ${k + 1} nút sóng (kể cả 2 đầu dây).`
        ]
      };
    }
  },

  // --- CHỦ ĐỀ: ĐIỆN XOAY CHIỀU ---
  {
    id: "impedance-rlc",
    name: "Tổng trở mạch xoay chiều RLC nối tiếp",
    expression: "$$Z = \\sqrt{R^2 + (Z_L - Z_C)^2}$$",
    topic: "Điện xoay chiều",
    description: "Đại lượng đo lường mức độ cản trở dòng điện xoay chiều tổng hợp từ điện trở thuần R, cảm kháng ZL và dung kháng ZC.",
    variables: [
      { symbol: "R", name: "Điện trở thuần R", unit: "Ω", defaultValue: 40, placeholder: "Điện trở R..." },
      { symbol: "ZL", name: "Cảm kháng ZL", unit: "Ω", defaultValue: 80, placeholder: "Cảm kháng..." },
      { symbol: "ZC", name: "Dung kháng ZC", unit: "Ω", defaultValue: 50, placeholder: "Dung kháng..." }
    ],
    calculateLabel: "Tính tổng trở Z của mạch",
    outputUnit: "Ω (Ohm)",
    calculateFn: (inputs) => {
      const { R, ZL, ZC } = inputs;
      const diff = ZL - ZC;
      const Z = Math.sqrt(Math.pow(R, 2) + Math.pow(diff, 2));
      return {
        result: parseFloat(Z.toFixed(2)),
        steps: [
          `Tính hiệu kháng: Z_L - Z_C = ${ZL} - ${ZC} = ${diff} \\text{ } \\Omega`,
          `Bình phương hiệu kháng: (Z_L - Z_C)^2 = ${Math.pow(diff, 2)} \\text{ } \\Omega^2`,
          `Bình phương điện trở thuần: R^2 = ${R}^2 = ${Math.pow(R, 2)} \\text{ } \\Omega^2`,
          `Tổng bình phương các trở kháng: R^2 + (Z_L - Z_C)^2 = ${Math.pow(R, 2) + Math.pow(diff, 2)}`,
          `Lấy căn bậc hai tính tổng trở: Z = \\sqrt{${Math.pow(R, 2) + Math.pow(diff, 2)}} \\approx ${Z.toFixed(2)} \\text{ } \\Omega`
        ]
      };
    }
  },
  {
    id: "power-ac",
    name: "Công suất tiêu thụ mạch xoay chiều",
    expression: "$$P = U \\cdot I \\cdot \\cos(\\varphi) = I^2 \\cdot R$$",
    topic: "Điện xoay chiều",
    description: "Công suất tiêu hao thực tế dưới dạng nhiệt lượng trên các thành phần điện trở thuần của mạch điện xoay chiều.",
    variables: [
      { symbol: "U", name: "Điện áp hiệu dụng", unit: "V", defaultValue: 220, placeholder: "Điện áp U..." },
      { symbol: "I", name: "Cường độ hiệu dụng", unit: "A", defaultValue: 2, placeholder: "Dòng điện I..." },
      { symbol: "cosPhi", name: "Hệ số công suất (cosφ)", unit: "hệ số", defaultValue: 0.8, placeholder: "cosφ..." }
    ],
    calculateLabel: "Tính công suất hao phí P",
    outputUnit: "W (Watt)",
    calculateFn: (inputs) => {
      const { U, I, cosPhi } = inputs;
      if (cosPhi < 0 || cosPhi > 1) {
        return { result: 0, steps: ["Lỗi: Hệ số công suất cosφ phải nằm trong khoảng từ 0 đến 1."] };
      }
      const P = U * I * cosPhi;
      return {
        result: parseFloat(P.toFixed(1)),
        steps: [
          `Áp dụng công thức tính công suất tiêu thụ của mạch: P = U \\cdot I \\cdot \\cos\\varphi`,
          `Thay số: P = ${U} \\cdot ${I} \\cdot ${cosPhi} = ${P.toFixed(1)} \\text{ W}`
        ]
      };
    }
  },
  {
    id: "resonance-cond",
    name: "Hiện tượng cộng hưởng điện",
    expression: "$$\\omega L = \\frac{1}{\\omega C} \\Rightarrow \\omega = \\frac{1}{\\sqrt{LC}}$$",
    topic: "Điện xoay chiều",
    description: "Xảy ra khi cảm kháng bằng dung kháng. Lúc này tổng trở mạch nhỏ nhất và cường độ dòng điện đạt cực đại.",
    variables: [
      { symbol: "L", name: "Độ tự cảm (L)", unit: "H", defaultValue: 0.318, placeholder: "Độ tự cảm L..." },
      { symbol: "C", name: "Điện dung (C)", unit: "F (vào hệ số micro)", defaultValue: 0.00001, placeholder: "Điện dung C..." }
    ],
    calculateLabel: "Tính tần số góc cộng hưởng (ω)",
    outputUnit: "rad/s",
    calculateFn: (inputs) => {
      const { L, C } = inputs;
      if (L <= 0 || C <= 0) {
        return { result: 0, steps: ["Lỗi: Độ tự cảm L và điện dung C phải lớn hơn 0."] };
      }
      const LC = L * C;
      const omega = 1 / Math.sqrt(LC);
      const f = omega / (2 * Math.PI);
      return {
        result: parseFloat(omega.toFixed(1)),
        steps: [
          `Tính tích số LC: L \\cdot C = ${L} \\cdot ${C} = ${LC.toExponential(4)}`,
          `Tính căn bậc hai: \\sqrt{LC} = ${Math.sqrt(LC).toExponential(4)}`,
          `Tần số góc cộng hưởng: \\omega = \\frac{1}{\\sqrt{LC}} = ${omega.toFixed(1)} \\text{ rad/s}`,
          `Tần số dao động tương đương: f = \\frac{\\omega}{2\\pi} \\approx ${f.toFixed(1)} \\text{ Hz}`
        ]
      };
    }
  },

  // --- CHỦ ĐỀ: VẬT LÍ HẠT NHÂN ---
  {
    id: "einstein-rel",
    name: "Năng lượng liên kết hạt nhân",
    expression: "$$E_{lk} = \\Delta m \\cdot c^2 = [Z \\cdot m_p + (A - Z) \\cdot m_n - m_{hn}] \\cdot 931,5$$",
    topic: "Vật lí hạt nhân",
    description: "Năng lượng tối thiểu cần cung cấp để phá vỡ hạt nhân thành các nuclôn đơn lẻ. m_p ≈ 1.00728 u, m_n ≈ 1.00867 u.",
    variables: [
      { symbol: "Z", name: "Số proton (Z)", unit: "hạt", defaultValue: 2, placeholder: "Số Z..." },
      { symbol: "A", name: "Số khối (A)", unit: "hạt", defaultValue: 4, placeholder: "Số khối A..." },
      { symbol: "m_hn", name: "Khối lượng thực hạt nhân", unit: "u", defaultValue: 4.0015, placeholder: "Khối lượng m..." }
    ],
    calculateLabel: "Tính Năng lượng liên kết E_lk",
    outputUnit: "MeV",
    calculateFn: (inputs) => {
      const { Z, A, m_hn } = inputs;
      const mp = 1.007276;
      const mn = 1.008665;
      const N = A - Z;
      if (N < 0) {
        return { result: 0, steps: ["Lỗi: Số khối A phải lớn hơn hoặc bằng số hiệu nguyên tử Z."] };
      }
      const sumMass = Z * mp + N * mn;
      const deltaM = sumMass - m_hn;
      const Elk = deltaM * 931.5;
      return {
        result: parseFloat(Elk.toFixed(3)),
        steps: [
          `Tính số lượng neutron: N = A - Z = ${A} - ${Z} = ${N} \\text{ hạt}`,
          `Tính tổng khối lượng cấu tử: Z \\cdot m_p + N \\cdot m_n = ${Z} \\cdot ${mp} + ${N} \\cdot ${mn} = ${sumMass.toFixed(6)} \\text{ u}`,
          `Tính độ hụt khối: \\Delta m = ${sumMass.toFixed(6)} - ${m_hn} = ${deltaM.toFixed(6)} \\text{ u}`,
          `Năng lượng liên kết: E_{lk} = \\Delta m \\cdot 931,5 \\text{ MeV} = ${deltaM.toFixed(6)} \\cdot 931,5 = ${Elk.toFixed(3)} \\text{ MeV}`,
          `Năng lượng liên kết riêng: E_{lkr} = \\frac{E_{lk}}{A} = \\frac{${Elk.toFixed(3)}}{${A}} = ${(Elk / A).toFixed(3)} \\text{ MeV/nuclôn}`
        ]
      };
    }
  },
  {
    id: "decay-law",
    name: "Định luật phóng xạ (Thời gian trôi qua)",
    expression: "$$N_t = N_0 \\cdot 2^{-\\frac{t}{T}}$$",
    topic: "Vật lí hạt nhân",
    description: "Tính toán số hạt nhân hoặc hoạt độ phóng xạ còn lại sau thời gian phân rã t với chu kỳ bán rã T.",
    variables: [
      { symbol: "N0", name: "Số hạt ban đầu (N0)", unit: "hạt", defaultValue: 1000000, placeholder: "Số hạt ban đầu..." },
      { symbol: "T", name: "Chu kỳ bán rã (T)", unit: "ngày", defaultValue: 8, placeholder: "Chu kỳ..." },
      { symbol: "t", name: "Thời gian trôi qua (t)", unit: "ngày", defaultValue: 24, placeholder: "Thời gian..." }
    ],
    calculateLabel: "Tính số lượng hạt còn lại N_t",
    outputUnit: "hạt",
    calculateFn: (inputs) => {
      const { N0, T, t } = inputs;
      if (T <= 0) return { result: 0, steps: ["Lỗi: Chu kỳ bán rã T phải lớn hơn 0."] };
      const exponent = t / T;
      const remainingRatio = Math.pow(2, -exponent);
      const Nt = N0 * remainingRatio;
      return {
        result: Math.round(Nt),
        steps: [
          `Xác định số chu kỳ trôi qua: \\frac{t}{T} = \\frac{${t}}{${T}} = ${exponent.toFixed(4)}`,
          `Tỉ lệ hạt nhân còn lại: 2^{-\\frac{t}{T}} = 2^{-${exponent.toFixed(4)}} = ${remainingRatio.toFixed(6)}`,
          `Tính số hạt còn lại: N_t = N_0 \\cdot 2^{-\\frac{t}{T}} = ${N0} \\cdot ${remainingRatio.toFixed(6)} = ${Math.round(Nt)} \\text{ hạt}`,
          `Tỉ lệ phân rã biến đổi thành chất khác: ${( (1 - remainingRatio) * 100 ).toFixed(2)}%`
        ]
      };
    }
  }
];

export function FormulaLibrary({ onEarnXP }: { onEarnXP?: (amount: number) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTopic, setActiveTopic] = useState<string>("Tất cả");
  const [selectedFormula, setSelectedFormula] = useState<PhysicsFormulaItem | null>(null);
  
  // Custom calculator state
  const [calcInputs, setCalcInputs] = useState<Record<string, number>>({});
  const [calcResult, setCalcResult] = useState<{ result: number; steps: string[] } | null>(null);

  // Expanded formula card tracking
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Initialize inputs for the selected formula
  const selectFormulaForCalc = (formula: PhysicsFormulaItem) => {
    setSelectedFormula(formula);
    const initialInputs: Record<string, number> = {};
    formula.variables.forEach(v => {
      initialInputs[v.symbol] = v.defaultValue ?? 0;
    });
    setCalcInputs(initialInputs);
    setCalcResult(null);
  };

  // Run calculation
  const handleCalculate = () => {
    if (!selectedFormula) return;
    const res = selectedFormula.calculateFn(calcInputs);
    setCalcResult(res);
    
    // Earn XP reward for using the learning calculators!
    if (onEarnXP) {
      onEarnXP(10);
    }
  };

  const handleInputChange = (symbol: string, val: string) => {
    const num = parseFloat(val);
    setCalcInputs(prev => ({
      ...prev,
      [symbol]: isNaN(num) ? 0 : num
    }));
  };

  // Reset calculator inputs to standard defaults
  const resetCalculator = () => {
    if (!selectedFormula) return;
    const initialInputs: Record<string, number> = {};
    selectedFormula.variables.forEach(v => {
      initialInputs[v.symbol] = v.defaultValue ?? 0;
    });
    setCalcInputs(initialInputs);
    setCalcResult(null);
  };

  // Filter formulas based on search and topic tab
  const filteredFormulas = useMemo(() => {
    return FORMULA_DATABASE.filter(f => {
      const matchTopic = activeTopic === "Tất cả" || f.topic === activeTopic;
      const matchSearch = 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.topic.toLowerCase().includes(searchTerm.toLowerCase());
      return matchTopic && matchSearch;
    });
  }, [searchTerm, activeTopic]);

  const topics = ["Tất cả", "Dao động", "Sóng", "Điện xoay chiều", "Vật lí hạt nhân"];

  return (
    <div className="space-y-6 text-slate-100 animate-fade-in" id="formula-library-view">
      {/* Title section */}
      <div className="bg-slate-900/50 backdrop-blur-3xl border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
              Thư viện Công thức Vật lí 12
              <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-cyan-500/20 shadow-sm animate-pulse">
                Học liệu Chuẩn GDPT 2018
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Tra cứu nhanh, phân tích biến số và thực hành máy tính giải đề tự động</p>
          </div>
        </div>
        
        {/* Quick motivation badge */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-2xl flex items-center gap-3 self-start md:self-auto">
          <div className="text-right">
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Mỗi lượt thực hành máy tính</span>
            <span className="text-xs font-black text-emerald-400 font-mono">+10 XP Học tập</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-black animate-bounce">
            XP
          </div>
        </div>
      </div>

      {/* Main workspace layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Formula list lookup */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Filtering bar & Search */}
          <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-900 p-4 rounded-3xl space-y-3.5 shadow-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm công thức (ví dụ: Chu kỳ, Sóng dừng, Tổng trở...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800/80 rounded-2xl pl-11 pr-4 py-3 text-xs outline-none focus:border-cyan-500/80 transition-all text-slate-100 placeholder-slate-500 shadow-inner"
              />
            </div>

            {/* Topic Filter Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {topics.map((t) => {
                const isActive = activeTopic === t;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveTopic(t)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 shadow-sm shadow-cyan-500/5"
                        : "bg-slate-950/40 border border-slate-900 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {t === "Dao động" && <Activity className="h-3 w-3" />}
                    {t === "Sóng" && <Radio className="h-3 w-3" />}
                    {t === "Điện xoay chiều" && <Zap className="h-3 w-3" />}
                    {t === "Vật lí hạt nhân" && <Atom className="h-3 w-3" />}
                    <span>{t}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* List of matched formulas */}
          <div className="space-y-3 max-h-[640px] overflow-y-auto custom-scrollbar pr-1">
            {filteredFormulas.length === 0 ? (
              <div className="bg-slate-900/30 border border-slate-900 p-12 rounded-3xl text-center space-y-2">
                <HelpCircle className="h-10 w-10 text-slate-600 mx-auto" />
                <p className="text-sm font-bold text-slate-400">Không tìm thấy công thức nào phù hợp</p>
                <p className="text-xs text-slate-500">Hãy thử nhập từ khóa rộng hơn hoặc thay đổi phân mục lựa chọn.</p>
              </div>
            ) : (
              filteredFormulas.map((f) => {
                const isSelectedForCalc = selectedFormula?.id === f.id;
                const isCardExpanded = expandedId === f.id;
                
                return (
                  <div 
                    key={f.id}
                    id={`formula-card-${f.id}`}
                    className={`bg-slate-900/40 border transition-all duration-300 rounded-2xl p-4 flex flex-col gap-3 shadow-md relative ${
                      isSelectedForCalc 
                        ? "border-cyan-500/50 bg-gradient-to-br from-slate-900/40 via-slate-900/50 to-cyan-950/20 shadow-cyan-500/5" 
                        : "border-slate-900 hover:border-slate-800"
                    }`}
                  >
                    {/* Header line of formula */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[8.5px] font-black uppercase px-2 py-0.5 rounded-md border ${
                            f.topic === "Dao động" 
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                              : f.topic === "Sóng"
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                              : f.topic === "Điện xoay chiều"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                          }`}>
                            {f.topic}
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-sm font-black text-white leading-relaxed tracking-tight">
                          {f.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Interactive simulation calculator switch */}
                        <button
                          onClick={() => selectFormulaForCalc(f)}
                          className={`p-2 rounded-xl transition-all border text-[10px] font-extrabold cursor-pointer flex items-center gap-1.5 ${
                            isSelectedForCalc
                              ? "bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/25"
                              : "bg-slate-950/60 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700"
                          }`}
                          title="Mở bảng máy tính mô phỏng tham số"
                        >
                          <Calculator className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Thử máy tính</span>
                        </button>

                        {/* Expand details button */}
                        <button
                          onClick={() => setExpandedId(isCardExpanded ? null : f.id)}
                          className="p-2 bg-slate-950/60 border border-slate-800 hover:border-slate-700 hover:text-white rounded-xl text-slate-400 transition-colors"
                        >
                          {isCardExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Scientific MathJax Formula Expression Display */}
                    <div className="bg-slate-950/40 border border-slate-950 p-4 rounded-xl flex items-center justify-center text-center shadow-inner overflow-x-auto min-h-[60px]">
                      <div className="scale-105 select-all">
                        <FormattedMathText text={f.expression} />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                      {f.description}
                    </p>

                    {/* Expandable details details drawer */}
                    {isCardExpanded && (
                      <div className="pt-2 border-t border-slate-800/60 mt-1 space-y-3 animate-slide-down">
                        {/* Explaining variables list */}
                        <div className="bg-slate-950/30 p-3 rounded-xl border border-slate-800/40 space-y-2">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                            <Info className="h-3 w-3 text-cyan-400" /> Ý nghĩa các đại lượng trong biểu thức:
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10.5px]">
                            {f.variables.map((v) => (
                              <div key={v.symbol} className="flex items-start gap-1.5 bg-slate-900/30 p-1.5 rounded-lg">
                                <span className="font-mono font-black text-cyan-300 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-900/40 shrink-0">
                                  {v.symbol}
                                </span>
                                <div className="leading-tight">
                                  <span className="text-slate-200 font-bold">{v.name} </span>
                                  <span className="text-slate-500 font-semibold">({v.unit})</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column - Dedicated Dynamic Calculator Panel */}
        <div className="lg:col-span-5">
          {selectedFormula ? (
            <div className="bg-gradient-to-b from-slate-900/80 to-slate-900/40 border-2 border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl shadow-slate-950/30 sticky top-6">
              
              {/* Card Title */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center">
                    <Calculator className="h-4.5 w-4.5 text-cyan-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">MÁY TÍNH TƯƠNG TÁC</h3>
                    <p className="text-[11px] font-bold text-white truncate max-w-[200px] sm:max-w-xs">{selectedFormula.name}</p>
                  </div>
                </div>
                
                <button
                  onClick={resetCalculator}
                  className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1"
                  title="Khôi phục mặc định"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span className="text-[9px] font-bold uppercase hidden sm:inline">Đặt lại</span>
                </button>
              </div>

              {/* Expression visualization in calculator */}
              <div className="bg-slate-950/60 p-3.5 rounded-2xl text-center border border-slate-950/80 shadow-inner flex items-center justify-center">
                <FormattedMathText text={selectedFormula.expression} />
              </div>

              {/* Dynamic Inputs Form */}
              <div className="space-y-3.5">
                <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider block">
                  ⚙️ Cấu hình tham số đầu vào:
                </span>
                
                <div className="space-y-3">
                  {selectedFormula.variables.map((v) => {
                    const currentVal = calcInputs[v.symbol] ?? v.defaultValue ?? 0;
                    return (
                      <div key={v.symbol} className="bg-slate-950/40 border border-slate-900 p-2.5 rounded-xl flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-black text-xs text-cyan-300">{v.symbol}</span>
                            <span className="text-[11px] font-bold text-slate-300">{v.name}</span>
                          </div>
                          <span className="text-[9px] font-semibold text-slate-500">Đơn vị: {v.unit}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <input
                            type="number"
                            step="any"
                            placeholder={v.placeholder}
                            value={currentVal}
                            onChange={(e) => handleInputChange(v.symbol, e.target.value)}
                            className="w-24 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 font-mono text-xs font-black text-emerald-400 focus:border-cyan-500/60 outline-none text-right shadow-inner"
                          />
                          <span className="text-[10px] font-mono font-bold text-slate-400 w-8 text-center bg-slate-900/80 px-1 py-1 rounded border border-slate-800">
                            {v.unit}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trigger calculation action button */}
              <button
                onClick={handleCalculate}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md shadow-cyan-500/10 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {selectedFormula.calculateLabel}
              </button>

              {/* Display of output result & detailed scientific breakdown */}
              {calcResult && (
                <div className="bg-slate-950 border border-cyan-500/20 rounded-2xl p-4 space-y-3 animate-fade-in shadow-inner">
                  
                  {/* Summary metric block */}
                  <div className="text-center space-y-1 bg-gradient-to-b from-cyan-950/20 to-transparent p-2 rounded-xl border border-cyan-900/20">
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider block">KẾT QUẢ ĐẠT ĐƯỢC</span>
                    <h4 className="text-2xl font-black text-emerald-400 font-mono tracking-tight leading-none">
                      {calcResult.result} <span className="text-xs font-bold text-slate-300">{selectedFormula.outputUnit}</span>
                    </h4>
                  </div>

                  {/* Detailed solving algorithm steps */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                      🔬 Lời giải chi tiết theo chuẩn sư phạm:
                    </span>
                    <div className="space-y-1.5 text-[10px] text-slate-300 leading-relaxed font-semibold">
                      {calcResult.steps.map((step, idx) => (
                        <div key={idx} className="bg-slate-900/45 p-2 rounded-lg border border-slate-800/60 flex items-start gap-2">
                          <span className="text-cyan-400 font-black shrink-0 font-mono">{idx + 1}.</span>
                          <span className="flex-1">
                            <FormattedMathText text={step} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Success indicator feedback badge */}
                  <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-2.5 text-[10px] text-emerald-400 font-bold justify-center">
                    <Check className="h-4 w-4 shrink-0" />
                    Thực hành thành công! Nhận ngay +10 XP năng lượng học tập.
                  </div>

                </div>
              )}

            </div>
          ) : (
            <div className="bg-slate-900/20 border-2 border-dashed border-slate-800/80 rounded-3xl p-12 text-center space-y-3.5 flex flex-col items-center justify-center min-h-[350px]">
              <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                <Calculator className="h-6 w-6" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h4 className="text-xs font-black text-slate-300 uppercase tracking-wide">MÁY TÍNH CHƯA KÍCH HOẠT</h4>
                <p className="text-[11px] text-slate-500 leading-normal font-semibold">
                  Hãy nhấn nút <strong className="text-cyan-400">"Thử máy tính"</strong> trên bất kỳ thẻ công thức nào ở bên trái để nạp tham số và giải tự động chi tiết từng bước.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
