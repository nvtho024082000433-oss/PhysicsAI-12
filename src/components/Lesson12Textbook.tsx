import { useState } from "react";
import { BookOpen, Sparkles, Brain, CheckCircle2, Info, Activity, Flame, Thermometer, Cpu, ArrowRight, HelpCircle } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

function formatScientific(num: number, decimals: number = 2): string {
  const str = num.toExponential(decimals);
  const parts = str.split('e');
  let baseVal = parts[0];
  if (baseVal.includes('.')) {
    while (baseVal.endsWith('0')) {
      baseVal = baseVal.slice(0, -1);
    }
    if (baseVal.endsWith('.')) {
      baseVal = baseVal.slice(0, -1);
    }
  }
  return `${baseVal}.10^${parts[1]}`;
}

export function Lesson12Textbook() {
  // Mini Calculator state for interactive theory
  const [tempKelvin, setTempKelvin] = useState<number>(300);
  const [selectedGas, setSelectedGas] = useState<"He" | "Ne" | "Ar" | "O2" | "H2">("He");

  // Practice Quiz State
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeQuizIndex, setActiveQuizIndex] = useState<number>(0);

  const GAS_DATA = {
    He: { name: "Helium (He)", molarMass: 4.0, massKg: 6.64e-27, color: "text-teal-900 bg-teal-100 border-teal-200" },
    Ne: { name: "Neon (Ne)", molarMass: 20.18, massKg: 3.35e-26, color: "text-amber-900 bg-amber-100 border-amber-200" },
    Ar: { name: "Argon (Ar)", molarMass: 39.95, massKg: 6.63e-26, color: "text-blue-900 bg-blue-100 border-blue-200" },
    O2: { name: "Oxygen (O₂)", molarMass: 32.00, massKg: 5.32e-26, color: "text-rose-900 bg-rose-100 border-rose-200" },
    H2: { name: "Hydrogen (H₂)", molarMass: 2.02, massKg: 3.32e-27, color: "text-emerald-900 bg-emerald-100 border-emerald-200" },
  };

  const k_B = 1.38e-23; // Boltzmann constant
  const R = 8.31; // Gas constant

  // Average kinetic energy: Ed = 1.5 * k * T
  const avgKineticEnergy = 1.5 * k_B * tempKelvin;
  // Root-mean-square speed: v_ctqp = sqrt(3 * k * T / m)
  const rmsSpeed = Math.sqrt((3 * k_B * tempKelvin) / GAS_DATA[selectedGas].massKg);

  const quizQuestions = [
    {
      q: "Động năng tịnh tiến trung bình của các phân tử khí lí tưởng chỉ phụ thuộc vào yếu tố vĩ mô nào sau đây?",
      options: [
        "A. Khối lượng mol của chất khí.",
        "B. Thể tích bình chứa khí.",
        "C. Nhiệt độ tuyệt đối của chất khí.",
        "D. Áp suất của chất khí lên thành bình."
      ],
      correct: 2,
      explain: "Theo công thức động năng tịnh tiến trung bình Ed_bar = (3/2) * k * T, động năng này tỉ lệ thuận trực tiếp với nhiệt độ tuyệt đối T và hoàn toàn không phụ thuộc vào bản chất hay khối lượng của phân tử khí. Đáp án đúng là C."
    },
    {
      q: "Ở cùng một nhiệt độ tuyệt đối, tốc độ căn quân phương v_ctqp của phân tử khí Heli (M = 4 g/mol) so với tốc độ căn quân phương v_ctqp của phân tử khí Oxygen (M_O2 = 32 g/mol) sẽ:",
      options: [
        "A. Nhỏ hơn khoảng 2,83 lần.",
        "B. Lớn hơn khoảng 2,83 lần.",
        "C. Bằng nhau vì có cùng động năng trung bình.",
        "D. Lớn hơn đúng 8 lần."
      ],
      correct: 1,
      explain: "Tốc độ căn quân phương v_ctqp = \\sqrt(3 * R * T / M). Do đó tỉ số v_He / v_O2 = \\sqrt(M_O2 / M_He) = \\sqrt(32 / 4) = \\sqrt(8) ≈ 2,83 lần. Đáp án đúng là B."
    },
    {
      q: "Hệ thức nào sau đây diễn tả đúng mối quan hệ giữa áp suất p, mật độ phân tử \\mu và động năng tịnh tiến trung bình Ed_bar của các phân tử khí?",
      options: [
        "A. p = (1/3) * \\mu * Ed_bar",
        "B. p = (3/2) * \\mu * Ed_bar",
        "C. p = (2/3) * \\mu * Ed_bar",
        "D. p = \\mu * Ed_bar"
      ],
      correct: 2,
      explain: "Từ công thức p = (1/3) * (N * m / V) * v_bar^2 và Ed_bar = (1/2) * m * v_bar^2, ta suy ra p = (2/3) * (N / V) * Ed_bar = (2/3) * \\mu * Ed_bar. Đáp án đúng là C."
    }
  ];

  return (
    <div className="space-y-8 text-slate-900 animate-fade-in font-bold">
      {/* Banner Tiêu đề (Light 3D styled scheme matching Lesson 11) */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-6 relative overflow-hidden shadow-sm z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 space-y-2.5">
          <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-200 tracking-wider uppercase inline-block">
            CHƯƠNG II: KHÍ LÍ TƯỞNG
          </span>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-950 uppercase">
            Bài 12: Áp suất khí theo mô hình động học phân tử. Quan hệ giữa động năng phân tử và nhiệt độ
          </h2>
          <p className="text-xs text-slate-700 max-w-3xl leading-relaxed font-bold">
            Khám phá nguồn gốc cơ học sâu xa của áp suất chất khí dựa trên các va chạm đàn hồi dồn dập của hàng triệu phân tử vi mô lên thành chứa. Từ đó, xây dựng hằng số Boltzmann và chứng minh mối quan hệ giữa động năng phân tử và nhiệt độ tuyệt đối.
          </p>
        </div>
      </div>

      {/* Câu hỏi định hướng đầu bài */}
      <div className="bg-gradient-to-b from-amber-50 to-amber-100/30 border-2 border-amber-200 border-b-[6px] border-b-amber-300 rounded-3xl p-5 shadow-sm">
        <div className="flex items-start gap-3 text-xs text-slate-800 leading-relaxed font-bold">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-950 block font-black text-[13px] uppercase tracking-wide mb-1">
              ❓ Câu hỏi định hướng thực tiễn
            </strong>
            <em>&quot;Áp suất khí phụ thuộc thế nào vào những đại lượng đặc trưng của phân tử như khối lượng, tốc độ chuyển động hay mật độ phân tử? Làm thế nào ta đo lường được động năng tịnh tiến của các hạt vô hình thông qua nhiệt kế vĩ mô?&quot;</em>
          </div>
        </div>
      </div>

      {/* PHẦN I: ÁP SUẤT KHÍ THEO MÔ HÌNH ĐỘNG HỌC PHÂN TỬ */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-blue-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-blue-400 to-blue-500 rounded-md"></span>
          <h3 className="text-md font-black text-slate-950 uppercase">
            I. Áp suất khí theo mô hình động học phân tử
          </h3>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-slate-800 font-bold">
          <h4 className="text-xs font-black text-slate-950 flex items-center gap-2 uppercase tracking-wide">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-[11px] border border-blue-200 shadow-sm">1</span>
            Tác dụng của một phân tử khí lên thành bình
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 space-y-3 flex flex-col justify-between">
              <p>
                Xét một lượng khí gồm <FormattedMathText text="N" /> phân tử chứa trong một bình hình lập phương có cạnh <FormattedMathText text="l" /> (thể tích <FormattedMathText text="V = l^3" />), đặt trong hệ tọa độ vuông góc <FormattedMathText text="Oxyz" /> như hình biểu diễn bên.
              </p>
              <p>
                Giả sử một phân tử có khối lượng <FormattedMathText text="m" /> đang chuyển động thẳng đều song song với trục <FormattedMathText text="Ox" /> với tốc độ <FormattedMathText text="v" /> va chạm đàn hồi trực diện với thành bình <strong className="text-blue-900">ABCD</strong> đối diện.
              </p>
              <p>
                Sau va chạm, do tính chất đàn hồi hoàn toàn, phân tử nảy ngược trở lại với vận tốc ngược chiều có độ lớn bằng <FormattedMathText text="-v" />. Độ biến thiên động lượng <FormattedMathText text="\Delta p" /> của phân tử khí do va chạm là:
              </p>
              <div className="bg-slate-50 border-2 border-slate-200 p-3 rounded-2xl text-center shadow-inner text-xs">
                <FormattedMathText text="|\Delta p| = |-m * v - (+m * v)| = |-2m * v| = 2m * v" />
              </div>
              <p>
                Lực cực đại do một phân tử khí tác dụng lên thành bình ABCD (diện tích <FormattedMathText text="S = l^2" />) trong chu kỳ chuyển động phản hồi là:
              </p>
              <div className="bg-blue-50 border-2 border-blue-100 p-3 rounded-2xl text-center shadow-inner text-xs">
                <FormattedMathText text="F_1 = (m * v^2) / l" />
              </div>
              <p>
                Áp suất tương ứng do một phân tử khí tác dụng lên diện tích mặt thành bình ABCD là:
              </p>
              <div className="bg-blue-50 border-2 border-blue-100 p-3 rounded-2xl text-center shadow-inner text-xs">
                <FormattedMathText text="p_m = F_1 / S = (m * v^2) / l^3 = (m / V) * v^2" />
              </div>
            </div>

            {/* Minh họa hình 12.1 bằng SVG vẽ tay rất bóng bẩy - LIGHT THEMED 3D CUBE */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/40 p-5 rounded-3xl border-2 border-slate-200 border-b-[6px] border-b-slate-300 flex flex-col items-center justify-center space-y-3 shadow-sm">
              <span className="text-[10px] text-slate-500 font-mono font-black uppercase tracking-wide text-center">
                Hình 12.1. Phân tử khí va chạm thành bình ABCD
              </span>
              <div className="w-full h-44 bg-white rounded-2xl border-2 border-slate-200 flex items-center justify-center p-2 shadow-inner">
                <svg viewBox="0 0 200 180" className="w-full max-w-[200px]">
                  {/* Grid background inside SVG */}
                  <line x1="100" y1="100" x2="180" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="100" y1="100" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="100" y1="100" x2="50" y2="150" stroke="#f1f5f9" strokeWidth="1" />

                  {/* 3D Coordinate Axis */}
                  <line x1="100" y1="100" x2="180" y2="100" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" />
                  <text x="183" y="103" fill="#64748b" className="text-[10px] font-mono font-black">x</text>
                  <line x1="100" y1="100" x2="100" y2="20" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" />
                  <text x="96" y="15" fill="#64748b" className="text-[10px] font-mono font-black">y</text>
                  <line x1="100" y1="100" x2="50" y2="150" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" />
                  <text x="38" y="153" fill="#64748b" className="text-[10px] font-mono font-black">z</text>
                  <text x="105" y="112" fill="#64748b" className="text-[10px] font-mono font-black">O</text>

                  {/* 3D Cube (Lập phương cạnh l) */}
                  {/* Back face */}
                  <rect x="70" y="40" width="60" height="60" fill="rgba(99, 102, 241, 0.02)" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* Connecting lines */}
                  <line x1="70" y1="40" x2="100" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="130" y1="40" x2="160" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="70" y1="100" x2="100" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="130" y1="100" x2="160" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* Front face (ABCD) - Colored Green in Image */}
                  <rect x="100" y="70" width="60" height="60" fill="rgba(34, 197, 94, 0.08)" stroke="#16a34a" strokeWidth="2" />
                  <text x="142" y="83" fill="#16a34a" className="text-[9.5px] font-black">ABCD</text>
                  
                  {/* Molecule marker and motion vectors */}
                  <circle cx="115" cy="85" r="4.5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <line x1="85" y1="85" x2="142" y2="85" stroke="#ef4444" strokeWidth="1.8" />
                  <line x1="145" y1="92" x2="85" y2="92" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* Vectors arrows */}
                  <path d="M 142 82 L 148 85 L 142 88 Z" fill="#ef4444" />
                  <path d="M 88 89 L 82 92 L 88 95 Z" fill="#0284c7" />
                  
                  <text x="110" y="99" fill="#ef4444" className="text-[9px] font-black">+v</text>
                  <text x="110" y="110" fill="#0284c7" className="text-[9px] font-black font-mono">-v</text>
                </svg>
              </div>
            </div>
          </div>

          <h4 className="text-xs font-black text-slate-950 mt-6 flex items-center gap-2 uppercase tracking-wide">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-[11px] border border-blue-200 shadow-sm">2</span>
            Tác dụng của N phân tử khí lên thành bình
          </h4>
          <p>
            Vì số phân tử <FormattedMathText text="N" /> trong chất khí thực tế cực kỳ khổng lồ và chuyển động hoàn toàn hỗn loạn đẳng hướng theo mọi chiều là bình đẳng. Số phân tử chuyển động theo một phương tọa độ trục bất kì (như <FormattedMathText text="Ox" />) trung bình chiếm đúng <FormattedMathText text="1/3" /> tổng số phân tử.
          </p>
          <p>
            Tốc độ chuyển động của các phân tử là khác nhau, ta định nghĩa đại lượng <FormattedMathText text="v_bar^2" /> là <em>&quot;trung bình các bình phương tốc độ&quot;</em> của các phân tử:
          </p>
          <div className="bg-slate-50 border-2 border-slate-200 p-3.5 rounded-2xl text-center shadow-inner text-xs">
            <FormattedMathText text="v_bar^2 = (v_1^2 + v_2^2 + ... + v_N^2) / N" />
          </div>
          <p>
            Từ đó, áp suất tổng hợp của chất khí tác dụng lên thành bình được tính bằng phương trình:
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-indigo-200 border-b-[6px] border-b-indigo-300 rounded-3xl p-5 text-center shadow-sm space-y-1.5">
            <span className="text-indigo-950 font-black text-[10px] block uppercase tracking-wide">
              PHƯƠNG TRÌNH ÁP SUẤT ĐỘNG HỌC PHÂN TỬ
            </span>
            <div className="text-indigo-900 text-base md:text-lg">
              <FormattedMathText text="p = (1/3) * (N * m / V) * v_bar^2 = (1/3) * \mu * m * v_bar^2" />
            </div>
            <span className="text-[10px] text-slate-500 block font-bold">
              Trong đó: <FormattedMathText text="\mu = N / V" /> là mật độ phân tử khí (hạt/<FormattedMathText text="m^3" />).
            </span>
          </div>

          <p>
            Nhận thấy động năng tịnh tiến trung bình của phân tử là <FormattedMathText text="Ed_bar = (m * v_bar^2) / 2" />. Thế trực tiếp vào hệ thức trên, ta thu được mối tương quan tuyệt vời:
          </p>
          
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-2 border-teal-200 border-b-[6px] border-b-teal-300 rounded-3xl p-5 text-center shadow-sm space-y-1.5">
            <span className="text-teal-950 font-black text-[10px] block uppercase tracking-wide">
              ÁP SUẤT THEO ĐỘNG NĂNG PHÂN TỬ TRUNG BÌNH
            </span>
            <div className="text-teal-900 text-base md:text-lg">
              <FormattedMathText text="p = (2/3) * \mu * Ed_bar" />
            </div>
            <span className="text-[10px] text-slate-500 block font-bold">
              Áp suất chất khí tỉ lệ thuận tuyến tính tuyệt đối với mật độ phân tử và động năng tịnh tiến trung bình của phân tử.
            </span>
          </div>
        </div>
      </div>

      {/* PHẦN II: MỐI QUAN HỆ GIỮA ĐỘNG NĂNG PHÂN TỬ VÀ NHIỆT ĐỘ */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-blue-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-blue-400 to-blue-500 rounded-md"></span>
          <h3 className="text-md font-black text-slate-950 uppercase">
            II. Mối quan hệ giữa động năng phân tử và nhiệt độ tuyệt đối
          </h3>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-slate-800 font-bold">
          <p>
            Đồng nhất phương trình vĩ mô Clapeyron-Mendeleev <FormattedMathText text="pV = nRT" /> và biểu thức áp suất vi mô <FormattedMathText text="p = (2/3) * (N/V) * Ed_bar" /> thông qua số Avogadro (<FormattedMathText text="N_A = N / n" />), ta thu được:
          </p>
          <div className="bg-slate-50 border-2 border-slate-200 p-3.5 rounded-2xl text-center shadow-inner text-xs">
            <FormattedMathText text="Ed_bar = (3/2) * (R / N_A) * T" />
          </div>
          <p>
            Vì <FormattedMathText text="R" /> và <FormattedMathText text="N_A" /> là các hằng số vũ trụ, thương số của chúng cũng là một hằng số đặc trưng duy nhất mang tên nhà vật lí vĩ đại người Áo <strong>Ludwig Boltzmann</strong>:
          </p>

          <div className="bg-gradient-to-b from-indigo-50 to-indigo-100/40 border-2 border-indigo-250 border-b-[6px] border-b-indigo-350 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <strong className="text-indigo-950 font-black text-xs uppercase tracking-wider block">Hằng số Boltzmann (k)</strong>
              <p className="text-[11px] text-slate-600 leading-normal font-bold">
                Cầu nối cơ bản liên kết trực tiếp thế giới vi mô (động năng chuyển động phân tử) với thang nhiệt độ tuyệt đối vĩ mô.
              </p>
            </div>
            <div className="shrink-0 bg-white px-4.5 py-2.5 rounded-2xl border-2 border-indigo-200 shadow-sm text-center text-xs">
              <FormattedMathText text="k = R / N_A ≈ 1.38.10^-23 J/K" />
            </div>
          </div>

          <p>
            Do đó, động năng tịnh tiến trung bình của phân tử khí lí tưởng phụ thuộc độc tôn vào nhiệt độ Kelvin:
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 border-b-[6px] border-b-blue-300 rounded-3xl p-5 text-center shadow-sm space-y-1.5">
            <span className="text-blue-950 font-black text-[10px] block uppercase tracking-wide">
              ĐỘNG NĂNG PHÂN TỬ VÀ NHIỆT ĐỘ KHÍ LÍ TƯỞNG
            </span>
            <div className="text-blue-900 text-base md:text-lg">
              <FormattedMathText text="Ed_bar = (3/2) * k * T" />
            </div>
          </div>

          <p className="font-black text-slate-950 uppercase tracking-wide text-xs pt-1">
            Đại lượng hệ quả vật lý quan trọng:
          </p>
          <ul className="list-disc pl-5 space-y-2.5 text-slate-700 font-bold text-xs">
            <li>
              Các phân tử khí có bản chất khác nhau, khối lượng phân tử khác nhau, nhưng nếu ở cùng một nhiệt độ tuyệt đối <FormattedMathText text="T" /> thì động năng tịnh tiến trung bình của chúng đều bằng nhau hoàn toàn.
            </li>
            <li>
              Nhiệt độ tuyệt đối <FormattedMathText text="T" /> thực chất là thước đo vĩ mô trực tiếp phản ánh mức độ hỗn loạn động năng tịnh tiến trung bình của các phân tử.
            </li>
          </ul>

          <div className="bg-gradient-to-b from-teal-50 to-teal-100/30 border-2 border-teal-200 border-b-[6px] border-b-teal-300 rounded-3xl p-5 space-y-2">
            <strong className="text-xs font-black text-teal-950 uppercase tracking-wider block">Tốc độ căn quân phương (<FormattedMathText text="v_ctqp" />)</strong>
            <p className="text-[11.5px] text-slate-700 leading-relaxed font-bold">
              Căn bậc hai của trung bình các bình phương tốc độ phân tử cho thấy mức độ phân bố tốc độ đặc trưng của khối khí:
            </p>
            <div className="bg-white p-3 rounded-2xl text-center border-2 border-teal-200 max-w-sm mx-auto text-xs shadow-inner">
              <FormattedMathText text="v_ctqp = \sqrt(3 * k * T / m) = \sqrt(3 * R * T / M)" />
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE CALCULATION PLAYGROUND - LIGHT 3D STYLE */}
      <div className="bg-gradient-to-b from-slate-50 to-slate-100/40 rounded-3xl p-5 border-2 border-slate-250 border-b-[6px] border-b-slate-350 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <Cpu className="h-5 w-5 text-indigo-600" />
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-950">
            Hộp Thử Nghiệm Vật Lý Vi Mô (Real-time Calculator)
          </h4>
        </div>
        <p className="text-[10.5px] text-slate-600 leading-relaxed font-bold">
          Chọn loại chất khí và kéo thanh trượt điều khiển nhiệt độ để quan sát mối liên hệ nhân quả tức thời của các thông số vi lượng:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* Controls */}
          <div className="space-y-4 bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-inner flex flex-col justify-between">
            {/* Choose Gas */}
            <div className="space-y-2">
              <label className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">Chọn loại khí khảo sát:</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(Object.keys(GAS_DATA) as Array<keyof typeof GAS_DATA>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedGas(key)}
                    className={`py-2 px-1 rounded-xl text-[10px] font-black border transition-all cursor-pointer ${
                      selectedGas === key
                        ? "bg-slate-900 text-white shadow-[0_3px_0_0_#475569] translate-y-[-1px]"
                        : "bg-slate-50 text-slate-700 border-slate-250 hover:bg-slate-100"
                    }`}
                  >
                    {GAS_DATA[key].name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider Temperature */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10.5px] text-slate-700 font-bold">
                <span className="uppercase tracking-wider">Nhiệt độ tuyệt đối (<FormattedMathText text="T" />):</span>
                <span className="font-mono text-indigo-700 font-black"><FormattedMathText text={`${tempKelvin} K (${tempKelvin - 273} °C)`} /></span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={tempKelvin}
                onChange={(e) => setTempKelvin(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
              />
              <div className="flex justify-between text-[8.5px] text-slate-400 font-mono font-bold">
                <span>50 K (Hóa lỏng)</span>
                <span>300 K (Nhiệt phòng)</span>
                <span>1000 K (Siêu nóng)</span>
              </div>
            </div>
          </div>

          {/* Real-time stats display */}
          <div className="space-y-3 bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-inner flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 text-[10.5px]">
                <span className="text-slate-500 font-bold">Khối lượng một phân tử (<FormattedMathText text="m" />):</span>
                <span className="font-mono text-amber-700 font-black">
                  <FormattedMathText text={`${formatScientific(GAS_DATA[selectedGas].massKg)} kg`} />
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 text-[10.5px]">
                <span className="text-slate-500 font-bold">Động năng trung bình (<FormattedMathText text="Ed_bar" />):</span>
                <span className="font-mono text-emerald-700 font-black">
                  <FormattedMathText text={`${formatScientific(avgKineticEnergy)} J`} />
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 text-[10.5px]">
                <span className="text-slate-500 font-bold">Tốc độ căn quân phương (<FormattedMathText text="v_ctqp" />):</span>
                <span className="font-mono text-blue-700 font-black">
                  <FormattedMathText text={`${Math.round(rmsSpeed).toLocaleString()} m/s`} />
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl border border-indigo-100 text-center">
              <span className="text-[10px] text-slate-700 leading-normal font-bold block">
                💡 <strong>Quan sát lý thuyết:</strong> Động năng phân tử khí {GAS_DATA[selectedGas].name.split(" ")[0]} ở <FormattedMathText text={`${tempKelvin} K`} /> là <span className="text-emerald-700 font-bold"><FormattedMathText text={`${formatScientific(avgKineticEnergy)} J`} /></span>, bằng hệt mọi chất khí khác. Nhưng do khối lượng siêu nhẹ, tốc độ phân tử đạt tới <span className="text-blue-700 font-bold"><FormattedMathText text={`${Math.round(rmsSpeed).toLocaleString()} m/s`} /></span> (≈ <FormattedMathText text={`${Math.round(rmsSpeed * 3.6).toLocaleString()} km/h`} />)!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* "EM CÓ BIẾT?" BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-bold">
        <div className="bg-gradient-to-b from-rose-50 to-rose-100/30 border-2 border-rose-200 border-b-[6px] border-b-rose-300 rounded-3xl p-5 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-rose-850 border-b border-rose-150 pb-1.5">
            <Flame className="h-5 w-5 text-rose-600" />
            <h4 className="text-xs font-black uppercase tracking-wider">Ý nghĩa của bậc tự do khí</h4>
          </div>
          <p className="text-[11px] text-slate-700 leading-relaxed font-bold">
            Hệ thức <code className="bg-white px-1 border rounded text-rose-700"><FormattedMathText text="Ed_bar = (3/2) * k * T" /></code> được chứng minh dựa trên mô hình khí đơn nguyên tử chuyển động tịnh tiến (3 bậc tự do). 
          </p>
          <p className="text-[11px] text-slate-700 leading-relaxed font-bold">
            Với phân tử đa nguyên tử (như O₂), khi tính năng lượng toàn phần phải cộng thêm động năng chuyển động quay và dao động. Tuy nhiên, phần năng lượng ứng với <strong>động năng tịnh tiến</strong> vẫn luôn tuân thủ tuyệt đối công thức <FormattedMathText text="(3/2) * k * T" />.
          </p>
        </div>

        <div className="bg-gradient-to-b from-teal-50 to-teal-100/30 border-2 border-teal-200 border-b-[6px] border-b-teal-300 rounded-3xl p-5 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-teal-850 border-b border-teal-150 pb-1.5">
            <Activity className="h-5 w-5 text-teal-600" />
            <h4 className="text-xs font-black uppercase tracking-wider">Vì sao khí quyển Trái Đất vắng bóng Heli?</h4>
          </div>
          <p className="text-[11px] text-slate-700 leading-relaxed font-bold">
            Khí Heli có khối lượng mol cực nhẹ (4g/mol) nên ở cùng nhiệt độ, tốc độ căn quân phương của nó chuyển động nhanh nhất trong khí quyển.
          </p>
          <p className="text-[11px] text-slate-700 leading-relaxed font-bold">
            Ở tầng cao khí quyển, do được đốt nóng bởi bức xạ Mặt Trời, tốc độ của nhiều phân tử Heli vượt qua tốc độ vũ trụ cấp 1 (~7,9 km/s), giúp chúng dễ dàng thoát ly vĩnh viễn khỏi trọng lực Trái Đất để đi vào khoảng không gian vũ trụ.
          </p>
        </div>
      </div>

      {/* SECTION III: LUYỆN TẬP TRẮC NGHIỆM THI THPT */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-blue-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-blue-400 to-blue-500 rounded-md"></span>
          <h3 className="text-md font-black text-slate-950 uppercase">
            III. Bài tập trắc nghiệm tự luyện (Chuẩn cấu trúc THPT)
          </h3>
        </div>

        <div className="bg-gradient-to-b from-indigo-50 to-indigo-100/30 border-2 border-indigo-250 border-b-[6px] border-b-indigo-350 rounded-3xl p-5 shadow-sm space-y-4">
          {/* Header step progress */}
          <div className="flex justify-between items-center border-b border-indigo-150 pb-2.5">
            <span className="text-[10px] font-black text-indigo-900 uppercase tracking-widest flex items-center gap-1.5">
              <HelpCircle className="h-4.5 w-4.5 text-indigo-600 animate-pulse" />
              Câu hỏi số {activeQuizIndex + 1} / {quizQuestions.length}
            </span>
            <div className="flex gap-1.5">
              {quizQuestions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveQuizIndex(i);
                    setSelectedQuiz(null);
                    setQuizSubmitted(false);
                  }}
                  className={`w-6 h-6 rounded-lg text-[10px] font-black transition-all cursor-pointer flex items-center justify-center ${
                    activeQuizIndex === i
                      ? "bg-indigo-600 text-white shadow-[0_2px_0_0_#312e81]"
                      : "bg-white text-indigo-900 border border-indigo-200 hover:bg-indigo-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Quiz Question Card */}
          <div className="space-y-3.5">
            <div className="text-xs md:text-sm text-slate-950 font-black leading-relaxed">
              <FormattedMathText text={quizQuestions[activeQuizIndex].q} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {quizQuestions[activeQuizIndex].options.map((option, idx) => {
                const isSelected = selectedQuiz === idx;
                const isCorrect = idx === quizQuestions[activeQuizIndex].correct;
                let btnClass = "";

                if (quizSubmitted) {
                   if (isCorrect) {
                    btnClass = "bg-emerald-500 text-white border-emerald-600 shadow-[0_4px_0_0_#047857] translate-y-[-2px] font-black";
                  } else if (isSelected) {
                    btnClass = "bg-rose-500 text-white border-rose-600 shadow-[0_4px_0_0_#be123c] translate-y-[-2px] font-black";
                  } else {
                    btnClass = "bg-slate-100 text-slate-400 border-slate-200 opacity-40 cursor-not-allowed";
                  }
                } else if (isSelected) {
                  btnClass = "bg-gradient-to-b from-amber-300 to-amber-400 text-slate-950 border-2 border-amber-500 shadow-[0_4px_0_0_#b45309] translate-y-[-2px] font-black";
                } else {
                  btnClass = "bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 shadow-[0_4px_0_0_#e2e8f0] active:translate-y-[2px] active:shadow-[0_2px_0_0_#e2e8f0] font-black";
                }

                return (
                  <button
                    key={idx}
                    disabled={quizSubmitted}
                    onClick={() => setSelectedQuiz(idx)}
                    className={`p-3 text-left text-xs rounded-2xl transition-all cursor-pointer ${btnClass}`}
                  >
                    <FormattedMathText text={option} />
                  </button>
                );
              })}
            </div>

            {/* Answer feedback panel */}
            <div className="flex justify-between items-center pt-2.5">
              <div className="flex-1">
                {quizSubmitted && (
                  <div className="bg-white p-4 rounded-2xl border-2 border-indigo-150 text-xs leading-relaxed text-slate-700 shadow-inner font-bold">
                    <span className="text-indigo-950 font-black block mb-1">✓ Giải thích từ Ban chuyên môn:</span>
                    <div className="text-slate-700 font-bold">
                      <FormattedMathText text={quizQuestions[activeQuizIndex].explain} />
                    </div>
                  </div>
                )}
              </div>

              {!quizSubmitted && (
                <button
                  disabled={selectedQuiz === null}
                  onClick={() => setQuizSubmitted(true)}
                  className="px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-500 border-b-4 border-indigo-800 active:translate-y-[2px] active:border-b-0 cursor-pointer font-black text-xs rounded-xl shadow-sm tracking-wider uppercase shrink-0 ml-4"
                >
                  Nộp câu trả lời
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
