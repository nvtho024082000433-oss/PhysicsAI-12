import { useState } from "react";
import { BookOpen, Sparkles, Brain, CheckCircle2, RefreshCw, Activity, ArrowRight, Layers, Info, Thermometer, Wind, Settings, HelpCircle, ArrowRightLeft } from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";

export function Lesson11Textbook() {
  const [activeGraphTab, setActiveGraphTab] = useState<"p_1V" | "pV" | "VT" | "pT">("p_1V");
  
  // Interactive Gas Sandbox state
  const [pressure, setPressure] = useState<number>(1.0); // atm
  const [volume, setVolume] = useState<number>(2.0); // Liters
  const [temperature, setTemperature] = useState<number>(300); // Kelvin (approx 27°C)
  const [constantType, setConstantType] = useState<"T" | "V" | "p" | "none">("none");

  // R = 0.0821 atm.L/(mol.K)
  const R = 0.0821;
  const moles = parseFloat(((pressure * volume) / (R * temperature)).toFixed(3));

  // Practice Quiz State
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeQuizIndex, setActiveQuizIndex] = useState<number>(0);

  // Problem Solver State
  const [calcP, setCalcP] = useState<string>("1.5");
  const [calcV, setCalcV] = useState<string>("3.0");
  const [calcT, setCalcT] = useState<string>("300");
  const [calcResult, setCalcResult] = useState<string | null>(null);

  const handleStateChange = (type: "p" | "V" | "T", val: number) => {
    if (constantType === "T") {
      const k = pressure * volume;
      if (type === "p") {
        setPressure(val);
        setVolume(parseFloat((k / val).toFixed(2)));
      } else if (type === "V") {
        setVolume(val);
        setPressure(parseFloat((k / val).toFixed(2)));
      }
    } else if (constantType === "V") {
      const k = pressure / temperature;
      if (type === "p") {
        setPressure(val);
        setTemperature(Math.round(val / k));
      } else if (type === "T") {
        setTemperature(val);
        setPressure(parseFloat((k * val).toFixed(2)));
      }
    } else if (constantType === "p") {
      const k = volume / temperature;
      if (type === "V") {
        setVolume(val);
        setTemperature(Math.round(val / k));
      } else if (type === "T") {
        setTemperature(val);
        setVolume(parseFloat((k * val).toFixed(2)));
      }
    } else {
      if (type === "p") setPressure(val);
      if (type === "V") setVolume(val);
      if (type === "T") setTemperature(val);
    }
  };

  const runMendeleevCalc = () => {
    const pVal = parseFloat(calcP);
    const vVal = parseFloat(calcV);
    const tVal = parseFloat(calcT);
    if (isNaN(pVal) || isNaN(vVal) || isNaN(tVal) || tVal <= 0 || pVal <= 0 || vVal <= 0) {
      setCalcResult("Vui lòng nhập các thông số dương hợp lệ!");
      return;
    }
    // n = pV / RT
    const n = (pVal * vVal) / (R * tVal);
    // m of Helium (M = 4)
    const mHe = n * 4;
    setCalcResult(`Số mol khí: ${n.toFixed(4)} mol. Nếu là khí Heli (M = 4g/mol), khối lượng tương ứng là ${mHe.toFixed(3)}g.`);
  };

  const quizQuestions = [
    {
      q: "Một lượng khí lí tưởng ban đầu ở trạng thái 1 có áp suất \\( p_1 = 1 \\text{ atm} \\), thể tích \\( V_1 = 10 \\text{ L} \\) và nhiệt độ \\( T_1 = 300 \\text{ K} \\). Khí được biến đổi sang trạng thái 2 có áp suất \\( p_2 = 2 \\text{ atm} \\) và thể tích \\( V_2 = 6 \\text{ L} \\). Nhiệt độ tuyệt đối \\( T_2 \\) của khối khí ở trạng thái 2 là bao nhiêu?",
      options: [
        "A. \\( T_2 = 360 \\text{ K} \\)",
        "B. \\( T_2 = 180 \\text{ K} \\)",
        "C. \\( T_2 = 250 \\text{ K} \\)",
        "D. \\( T_2 = 400 \\text{ K} \\)"
      ],
      correct: 0,
      explain: "Áp dụng phương trình trạng thái khí lí tưởng: \\( \\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2} \\Rightarrow \\frac{1 \\cdot 10}{300} = \\frac{2 \\cdot 6}{T_2} \\Rightarrow \\frac{1}{30} = \\frac{12}{T_2} \\Rightarrow T_2 = 12 \\cdot 30 = 360 \\text{ K} \\). Đáp án đúng là A."
    },
    {
      q: "Đường biểu diễn quá trình biến đổi đẳng nhiệt trong hệ tọa độ áp suất - nghịch đảo thể tích \\( (p - \\frac{1}{V}) \\) có đặc điểm nào dưới đây?",
      options: [
        "A. Là một đường hyperbol dốc xuống.",
        "B. Là một đường thẳng vuông góc với trục hoành \\( \\frac{1}{V} \\).",
        "C. Là một đường thẳng song song với trục áp suất \\( p \\).",
        "D. Là một đoạn thẳng kéo dài đi qua gốc tọa độ O."
      ],
      correct: 3,
      explain: "Vì \\( p \\) tỉ lệ nghịch với \\( V \\) nên \\( p \\) tỉ lệ thuận với \\( \\frac{1}{V} \\) (hệ thức \\( p = k \\cdot \\frac{1}{V} \\)). Do đó trong hệ tọa độ \\( p - \\frac{1}{V} \\), đồ thị của quá trình biến đẳng nhiệt là một đoạn thẳng kéo dài có đường kéo dài đi qua gốc tọa độ O. Đáp án đúng là D."
    },
    {
      q: "Hằng số khí lí tưởng \\( R \\) có giá trị xấp xỉ bằng \\( R \\approx 8,31 \\text{ J/(mol}\\cdot\\text{K)} \\) khi sử dụng hệ đơn vị đo chuẩn nào?",
      options: [
        "A. Áp suất đo bằng atm, thể tích đo bằng Lít.",
        "B. Áp suất đo bằng Pa \\( (\\text{N/m}^2) \\), thể tích đo bằng \\( \\text{m}^3 \\).",
        "C. Áp suất đo bằng mmHg, thể tích đo bằng mL.",
        "D. Áp suất đo bằng bar, thể tích đo bằng \\( \\text{cm}^3 \\)."
      ],
      correct: 1,
      explain: "Trong hệ đo lường SI, áp suất \\( p \\) tính bằng Pa, thể tích \\( V \\) tính bằng \\( \\text{m}^3 \\) thì tích \\( p \\cdot V \\) có đơn vị là Jun (J). Khi đó hằng số khí lí tưởng là \\( R = \\frac{p_0 \\cdot V_0}{T_0} \\approx 8,31 \\text{ J/(mol}\\cdot\\text{K)} \\). Đáp án đúng là B."
    }
  ];

  return (
    <div className="space-y-8 text-slate-900 animate-fade-in">
      {/* Banner Tiêu đề (Light 3D styled scheme matching Lesson 9) */}
      <div className="bg-gradient-to-r from-indigo-50 to-teal-50/50 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-6 relative overflow-hidden shadow-sm z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 space-y-2.5">
          <span className="text-[10px] font-black bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full border border-indigo-200 tracking-wider uppercase inline-block">
            CHƯƠNG II: KHÍ LÍ TƯỞNG
          </span>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-950 uppercase">
            Bài 11: Phương trình trạng thái của khí lí tưởng
          </h2>
          <p className="text-xs text-slate-700 max-w-3xl leading-relaxed font-bold">
            Khảo sát mối liên hệ định lượng toàn vẹn giữa cả ba thông số trạng thái: áp suất, thể tích và nhiệt độ của một khối khí xác định. Xây dựng phương trình trạng thái Clapeyron - Mendeleev và đính chính các đường đẳng quá trình trong kỳ thi tốt nghiệp.
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
            <em>&quot;Trong đời sống thực tế, hầu hết các biến đổi của chất khí không giữ cố định bất kì thông số nào; áp suất, thể tích và nhiệt độ đều biến thiên đồng thời. Làm thế nào để mô tả chính xác trạng thái phức hợp này bằng toán học và nhận diện chuẩn xác các đồ thị đẳng quá trình để tối ưu điểm số THPT?&quot;</em>
          </div>
        </div>
      </div>

      {/* PHẦN I: XÂY DỰNG PHƯƠNG TRÌNH TRẠNG THÁI */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-teal-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-teal-400 to-teal-500 rounded-md"></span>
          <h3 className="text-md font-black text-slate-950 uppercase">
            I. Thiết lập Phương trình trạng thái khí lí tưởng (Clapeyron)
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4 text-xs leading-relaxed text-slate-800 font-bold">
            <p>
              Để liên kết cả ba thông số trạng thái <span className="inline-flex"><FormattedMathText text="p" />, <FormattedMathText text="V" />, <FormattedMathText text="T" /></span>, ta xét một khối lượng khí xác định biến đổi gián tiếp qua trạng thái trung gian <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-900 font-black">1'</code> thông qua hai đẳng quá trình đã học:
            </p>
            
            {/* Sơ đồ trạng thái 3D Light Style */}
            <div className="bg-gradient-to-b from-slate-50 to-slate-100/40 border-2 border-slate-200 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm space-y-3">
              <span className="block font-black text-center text-slate-700 text-[10px] uppercase tracking-wider">
                SƠ ĐỒ BIẾN ĐỔI HAI GIAI ĐOẠN KHÍ LÍ TƯỞNG
              </span>
              <div className="flex flex-col sm:flex-row justify-between items-center text-center gap-3 px-2">
                <div className="bg-white border-2 border-indigo-200 border-b-4 border-b-indigo-300 p-3 rounded-2xl min-w-[110px] shadow-sm">
                  <strong className="text-indigo-950 block font-black text-[11px]">Trạng thái 1</strong>
                  <span className="font-mono text-indigo-700 text-[10.5px] font-black"><FormattedMathText text="p_1, V_1, T_1" /></span>
                </div>
                
                <div className="flex flex-row sm:flex-col items-center gap-1.5">
                  <span className="text-[9px] text-teal-700 font-black font-mono">Đẳng nhiệt (T = hằng số)</span>
                  <ArrowRight className="h-4.5 w-4.5 text-teal-600 rotate-90 sm:rotate-0" />
                </div>

                <div className="bg-white border-2 border-slate-200 border-b-4 border-b-slate-300 p-3 rounded-2xl min-w-[110px] shadow-sm">
                  <strong className="text-slate-800 block font-black text-[11px]">Trạng thái trung gian 1'</strong>
                  <span className="font-mono text-slate-600 text-[10.5px] font-black"><FormattedMathText text="p_1', V_2, T_1" /></span>
                </div>

                <div className="flex flex-row sm:flex-col items-center gap-1.5">
                  <span className="text-[9px] text-indigo-700 font-black font-mono">Đẳng tích (V = hằng số)</span>
                  <ArrowRight className="h-4.5 w-4.5 text-indigo-600 rotate-90 sm:rotate-0" />
                </div>

                <div className="bg-white border-2 border-emerald-200 border-b-4 border-b-emerald-300 p-3 rounded-2xl min-w-[110px] shadow-sm">
                  <strong className="text-emerald-950 block font-black text-[11px]">Trạng thái 2</strong>
                  <span className="font-mono text-emerald-700 text-[10.5px] font-black"><FormattedMathText text="p_2, V_2, T_2" /></span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white border-2 border-teal-100 p-3.5 rounded-2xl shadow-sm space-y-1.5">
                <span className="text-teal-950 font-black block">Giai đoạn 1: Biến đổi đẳng nhiệt (<FormattedMathText text="\( T_1 = T'_1 \)" />) từ trạng thái 1 sang 1'</span>
                <p className="text-slate-700">
                  Thể tích khí giảm xuống còn <code className="font-mono font-bold"><FormattedMathText text="\( V_2 \)" /></code> làm áp suất biến đổi thành <code className="font-mono font-bold"><FormattedMathText text="\( p'_1 \)" /></code>. Định luật Boyle xác lập:
                </p>
                <div className="bg-teal-50 px-4 py-2 rounded-xl font-mono text-center border-2 border-teal-150 text-teal-800 font-black text-xs">
                  <FormattedMathText text="\( p_1 \cdot V_1 = p'_1 \cdot V_2 \Rightarrow p'_1 = \frac{p_1 \cdot V_1}{V_2} \)" /> &nbsp;&nbsp;&nbsp;(Hệ thức 1)
                </div>
              </div>

              <div className="bg-white border-2 border-indigo-100 p-3.5 rounded-2xl shadow-sm space-y-1.5">
                <span className="text-indigo-950 font-black block">Giai đoạn 2: Biến đổi đẳng tích (<FormattedMathText text="\( V \)" /> = hằng số <FormattedMathText text="\( V_2 \)" />) từ trạng thái 1' sang 2</span>
                <p className="text-slate-700">
                  Nhiệt độ thay đổi từ <code className="font-mono font-bold"><FormattedMathText text="\( T_1 \)" /></code> đến <code className="font-mono font-bold"><FormattedMathText text="\( T_2 \)" /></code> làm áp suất từ <code className="font-mono font-bold"><FormattedMathText text="\( p'_1 \)" /></code> biến thành <code className="font-mono font-bold"><FormattedMathText text="\( p_2 \)" /></code>. Định luật Charles xác lập:
                </p>
                <div className="bg-indigo-50 px-4 py-2 rounded-xl font-mono text-center border-2 border-indigo-150 text-indigo-800 font-black text-xs">
                  <FormattedMathText text="\( \frac{p'_1}{T_1} = \frac{p_2}{T_2} \Rightarrow p'_1 = \frac{p_2 \cdot T_1}{T_2} \)" /> &nbsp;&nbsp;&nbsp;(Hệ thức 2)
                </div>
              </div>

              <p className="text-slate-800">
                Từ hai hệ thức (1) và (2), bằng phép đồng nhất toán học của đại lượng trung gian <code className="font-mono font-black text-slate-900"><FormattedMathText text="\( p'_1 \)" /></code>, ta rút ra phương trình liên hệ toàn phần:
              </p>
              
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-2 border-teal-200 border-b-[6px] border-b-teal-300 rounded-3xl p-5 text-center shadow-sm space-y-2">
                <span className="text-teal-950 font-black text-[11px] block uppercase tracking-wide">
                  PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG (CLAPEYRON)
                </span>
                <div className="font-mono font-black text-teal-900 text-lg">
                  <FormattedMathText text="\( \frac{p_1 \cdot V_1}{T_1} = \frac{p_2 \cdot V_2}{T_2} \)" />
                </div>
                <span className="text-[10px] text-slate-500 block font-bold">
                  Nói cách khác: <code className="font-black bg-white px-1.5 py-0.5 rounded border border-teal-200"><FormattedMathText text="\( \frac{p \cdot V}{T} = \text{Hằng số} \)" /></code> đối với một khối khí xác định.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-b from-indigo-50 to-indigo-100/30 border-2 border-indigo-250 border-b-[6px] border-b-indigo-350 rounded-3xl p-5 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5 border-b border-indigo-200 pb-2">
              <Layers className="h-4.5 w-4.5 text-indigo-600" />
              Sự tiến hóa của các định luật khí
            </h4>
            
            <p className="text-[11px] text-slate-700 leading-relaxed font-bold">
              Phương trình Clapeyron là sự khái quát hóa vĩ đại nhất của nhiệt học chất khí. Mọi định luật thực nghiệm trước đó đều là các trường hợp đặc biệt được suy luận trực tiếp từ đây:
            </p>

            <div className="space-y-2.5 font-bold text-[11px]">
              <div className="bg-white p-3 rounded-2xl border-2 border-indigo-200 shadow-sm">
                <span className="text-teal-800 font-black uppercase tracking-wider">1. Định luật Boyle (<FormattedMathText text="\( T \)" /> = hằng số):</span>
                <p className="text-slate-600 mt-1">Khi <FormattedMathText text="\( T_1 = T_2 \Rightarrow p_1 \cdot V_1 = p_2 \cdot V_2 \)" /> (Tỉ lệ nghịch)</p>
              </div>

              <div className="bg-white p-3 rounded-2xl border-2 border-indigo-200 shadow-sm">
                <span className="text-indigo-800 font-black uppercase tracking-wider">2. Định luật Charles (<FormattedMathText text="\( V \)" /> = hằng số):</span>
                <p className="text-slate-600 mt-1">Khi <FormattedMathText text="\( V_1 = V_2 \Rightarrow \frac{p_1}{T_1} = \frac{p_2}{T_2} \)" /> (Tỉ lệ thuận)</p>
              </div>

              <div className="bg-white p-3 rounded-2xl border-2 border-indigo-200 shadow-sm">
                <span className="text-emerald-800 font-black uppercase tracking-wider">3. Định luật đẳng áp (<FormattedMathText text="\( p \)" /> = hằng số):</span>
                <p className="text-slate-600 mt-1">Khi <FormattedMathText text="\( p_1 = p_2 \Rightarrow \frac{V_1}{T_1} = \frac{V_2}{T_2} \)" /> (Tỉ lệ thuận)</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-indigo-100 text-[10.5px] leading-relaxed text-slate-600 italic">
              💡 <strong>Lưu ý bắt buộc:</strong> Trong các công thức toán học, nhiệt độ T bắt buộc phải đổi sang thang đo nhiệt độ tuyệt đối Kelvin (K): <code className="font-mono font-black text-slate-900"><FormattedMathText text="\( T = t + 273 \)" /></code>.
            </div>
          </div>
        </div>
      </div>

      {/* PHẦN II: PHƯƠNG TRÌNH CLAPEYRON-MENDELEEV */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-teal-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-teal-400 to-teal-500 rounded-md"></span>
          <h3 className="text-md font-black text-slate-950 uppercase">
            II. Hằng số khí lí tưởng & Phương trình Clapeyron - Mendeleev
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-xs text-slate-800 leading-relaxed font-bold">
          <div className="lg:col-span-7 space-y-4">
            <p>
              Ở điều kiện tiêu chuẩn (<code className="font-mono"><FormattedMathText text="\( T_0 = 273,15 \text{ K} \)" /></code>, <code className="font-mono"><FormattedMathText text="\( p_0 = 1,013 \cdot 10^5 \text{ Pa} \)" /></code>), <strong className="text-slate-950">1 mol</strong> khí lí tưởng bất kì chiếm thể tích chính xác bằng <code className="font-mono text-slate-950"><FormattedMathText text="\( V_0 = 22,4 \text{ L} \)" /> = <FormattedMathText text="\( 22,4 \cdot 10^{-3} \text{ m}^3 \)" /></code>. 
            </p>
            <p>
              Hằng số chung ứng với tích phân của một mol khí được đặt tên là <strong className="text-indigo-800">R (Hằng số khí lí tưởng)</strong>:
            </p>

            <div className="bg-gradient-to-b from-indigo-50 to-indigo-100/40 border-2 border-indigo-200 border-b-[6px] border-b-indigo-300 rounded-3xl p-5 text-center font-mono space-y-1.5 shadow-sm">
              <span className="text-[10px] text-slate-500 block uppercase font-sans font-black">Biểu thức tính toán hằng số R</span>
              <div className="text-slate-900 font-black text-[13px]">
                <FormattedMathText text="\( R = \frac{p_0 \cdot V_0}{T_0} = \frac{1,013 \cdot 10^5 \cdot 22,4 \cdot 10^{-3}}{273,15} \)" />
              </div>
              <div className="text-indigo-900 font-black text-lg">
                <FormattedMathText text="\( R \approx 8,31 \text{ J/(mol}\cdot\text{K)} \)" />
              </div>
              <p className="text-[10px] text-slate-500 block font-sans">
                Nếu áp suất tính bằng <code className="font-black">atm</code>, thể tích bằng <code className="font-black">Lít</code> thì hằng số khí có giá trị: <strong className="text-indigo-900 font-mono text-[11px]"><FormattedMathText text="\( R \approx 0,0821 \text{ atm}\cdot\text{L/(mol}\cdot\text{K)} \)" /></strong>.
              </p>
            </div>

            <p>
              Đối với khối khí có khối lượng <code className="font-mono"><FormattedMathText text="\( m \)" /></code>, khối lượng mol <code className="font-mono"><FormattedMathText text="\( M \)" /></code> (tức có số mol <code className="font-mono"><FormattedMathText text="\( n = \frac{m}{M} \)" /></code>), ta rút ra phương trình tổng quát mang tên nhà hóa học người Nga <strong>Dmitri Mendeleev</strong>:
            </p>

            <div className="bg-gradient-to-r from-teal-50 to-indigo-50 border-2 border-indigo-200 border-b-[6px] border-b-indigo-300 p-5 rounded-3xl shadow-sm text-center space-y-2">
              <span className="text-indigo-950 font-black text-[11px] block uppercase tracking-wide">
                PHƯƠNG TRÌNH CLAPEYRON - MENDELEEV TỔNG QUÁT
              </span>
              <div className="font-mono font-black text-indigo-950 text-xl py-1.5 bg-white border-2 border-indigo-100 rounded-2xl shadow-inner">
                <FormattedMathText text="\( p \cdot V = n \cdot R \cdot T = \frac{m}{M} \cdot R \cdot T \)" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[9.5px] text-slate-600 font-bold uppercase pt-1.5">
                <div><FormattedMathText text="\( p \)" />: Áp suất</div>
                <div><FormattedMathText text="\( V \)" />: Thể tích</div>
                <div><FormattedMathText text="\( n \)" />: Số mol khí</div>
                <div><FormattedMathText text="\( T \)" />: Nhiệt độ (K)</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-b from-purple-50 to-purple-100/30 border-2 border-purple-250 border-b-[6px] border-b-purple-350 rounded-3xl p-5 space-y-4 shadow-sm">
            <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider flex items-center gap-1.5 border-b border-purple-200 pb-2">
              <Brain className="h-4.5 w-4.5 text-purple-600" />
              Bản chất thứ nguyên của hằng số R
            </h4>
            
            <p className="text-[11px] text-slate-700 leading-relaxed font-bold">
              Vì sao R lại đo bằng <code className="font-bold text-slate-900 font-mono">J/(mol.K)</code>? Phân tích đơn vị đo lường toán học:
            </p>

            <div className="bg-white rounded-2xl p-4 border-2 border-purple-100 font-mono text-[11px] text-purple-950 space-y-2 shadow-inner">
              <div><FormattedMathText text="\( [R] = \frac{[p] \cdot [V]}{[n] \cdot [T]} \)" /></div>
              <div><FormattedMathText text="\( [R] = \frac{\text{N/m}^2 \cdot \text{m}^3}{\text{mol} \cdot \text{K}} \)" /></div>
              <div className="font-black text-purple-900 border-t border-purple-50 pt-1">
                ⇒ <FormattedMathText text="\( [R] = \frac{\text{N} \cdot \text{m}}{\text{mol} \cdot \text{K}} = \text{J/(mol}\cdot\text{K)} \)" />
              </div>
            </div>

            <p className="text-[10.5px] text-slate-600 leading-normal italic">
              💡 <strong>Ý nghĩa vật lí:</strong> Hằng số R đặc trưng cho công cơ học sinh ra khi làm 1 mol chất khí lí tưởng nóng lên thêm 1 Kelvin trong quá trình biến đổi đẳng áp dãn nở.
            </p>
          </div>
        </div>
      </div>

      {/* PHẦN III: ĐẶC TÍNH CÁC ĐƯỜNG ĐẲNG QUÁ TRÌNH & ĐÍNH CHÍNH QUAN TRỌNG */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-teal-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-teal-400 to-teal-500 rounded-md"></span>
          <h3 className="text-md font-black text-slate-950 uppercase">
            III. Đặc tính đồ thị đẳng quá trình & Đính chính quan trọng trong các kỳ thi
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-xs text-slate-800 leading-relaxed font-bold">
          <div className="lg:col-span-6 space-y-4">
            {/* Đính chính GD-ĐT Đồ thị p - 1/V */}
            <div className="bg-gradient-to-b from-rose-50 to-rose-100/30 border-2 border-rose-250 border-b-[6px] border-b-rose-350 rounded-3xl p-5 shadow-sm space-y-2.5">
              <span className="text-[10px] font-black text-rose-800 uppercase tracking-widest flex items-center gap-1.5">
                <Info className="h-4.5 w-4.5 text-rose-600" />
                ⚠️ ĐÍNH CHÍNH & LƯU Ý KỲ THI THPT QUỐC GIA
              </span>
              <p className="text-slate-900 font-black text-[12.5px] leading-relaxed">
                Đường đẳng nhiệt biểu diễn trong hệ trục <FormattedMathText text="\( p - \frac{1}{V} \)" /> có đặc điểm gì?
              </p>
              <p className="text-slate-700 text-xs leading-relaxed font-bold">
                Trong hệ tọa độ Clapeyron <code className="font-mono font-bold text-slate-900"><FormattedMathText text="\( p - V \)" /></code>, đường đẳng nhiệt là một nhánh của <strong className="text-slate-950">đường hyperbol</strong>. Tuy nhiên, khi biểu diễn trong hệ trục <code className="font-mono font-bold text-slate-900"><FormattedMathText text="\( p - \frac{1}{V} \)" /></code>, do áp suất tỉ lệ thuận tuyệt đối với nghịch đảo thể tích (<code className="font-mono"><FormattedMathText text="\( p \propto \frac{1}{V} \)" /></code>), đồ thị của nó chuyển thành:
              </p>
              <div className="bg-white px-4 py-2 rounded-xl text-center font-mono font-black text-rose-700 border-2 border-rose-150 text-xs">
                Một đoạn thẳng kéo dài có đường kéo dài đi qua gốc tọa độ O!
              </div>
            </div>

            <p className="font-bold text-slate-700">
              Bấm vào các nút dưới đây để chuyển đổi các đồ thị đẳng quá trình tương tác. Hãy quan sát cách biểu diễn của chúng trên các hệ trục tọa độ khác nhau:
            </p>

            {/* Selector buttons styled in light 3D */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
              <button
                onClick={() => setActiveGraphTab("p_1V")}
                className={`py-2 px-1 text-[10px] font-black rounded-xl transition-all cursor-pointer ${
                  activeGraphTab === "p_1V"
                    ? "bg-white text-teal-900 shadow-[0_3px_0_0_#0f766e] translate-y-[-1px] border border-slate-250"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                }`}
              >
                p - 1/V (Đẳng nhiệt thẳng)
              </button>
              <button
                onClick={() => setActiveGraphTab("pV")}
                className={`py-2 px-1 text-[10px] font-black rounded-xl transition-all cursor-pointer ${
                  activeGraphTab === "pV"
                    ? "bg-white text-teal-900 shadow-[0_3px_0_0_#0f766e] translate-y-[-1px] border border-slate-250"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                }`}
              >
                p - V (Đẳng nhiệt Hyperbol)
              </button>
              <button
                onClick={() => setActiveGraphTab("VT")}
                className={`py-2 px-1 text-[10px] font-black rounded-xl transition-all cursor-pointer ${
                  activeGraphTab === "VT"
                    ? "bg-white text-teal-900 shadow-[0_3px_0_0_#0f766e] translate-y-[-1px] border border-slate-250"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                }`}
              >
                V - T (Đẳng áp thẳng)
              </button>
              <button
                onClick={() => setActiveGraphTab("pT")}
                className={`py-2 px-1 text-[10px] font-black rounded-xl transition-all cursor-pointer ${
                  activeGraphTab === "pT"
                    ? "bg-white text-teal-900 shadow-[0_3px_0_0_#0f766e] translate-y-[-1px] border border-slate-250"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                }`}
              >
                p - T (Đẳng tích thẳng)
              </button>
            </div>
          </div>

          {/* Interactive Graph Box - Clean High-Contrast Light Theme */}
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-50 to-white border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl overflow-hidden p-5 shadow-sm flex flex-col items-center">
            <span className="text-[10px] font-black text-teal-900 mb-3.5 uppercase tracking-wider text-center block">
              {activeGraphTab === "p_1V" && <span>Đồ thị đẳng nhiệt: <FormattedMathText text="\( p - \frac{1}{V} \)" /> (Đường thẳng qua O)</span>}
              {activeGraphTab === "pV" && <span>Đồ thị đẳng nhiệt: <FormattedMathText text="\( p - V \)" /> (Nhánh đường Hyperbol)</span>}
              {activeGraphTab === "VT" && <span>Đồ thị đẳng áp: <FormattedMathText text="\( V - T \)" /> (Đoạn thẳng kéo dài qua O)</span>}
              {activeGraphTab === "pT" && <span>Đồ thị đẳng tích: <FormattedMathText text="\( p - T \)" /> (Đoạn thẳng kéo dài qua O)</span>}
            </span>

            {/* White SVG Plotting Area */}
            <div className="w-full h-48 bg-white rounded-2xl border-2 border-slate-200 flex items-center justify-center p-2 shadow-inner relative">
              <svg className="w-full h-full" viewBox="0 0 240 160">
                {/* Clean Slate Gridlines */}
                <line x1="40" y1="20" x2="220" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="60" x2="220" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="100" x2="220" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="130" x2="220" y2="130" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="100" y1="10" x2="100" y2="130" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="160" y1="10" x2="160" y2="130" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="220" y1="10" x2="220" y2="130" stroke="#f1f5f9" strokeWidth="1" />

                {/* Main Dark Axes */}
                <line x1="40" y1="130" x2="230" y2="130" stroke="#334155" strokeWidth="1.8" />
                <line x1="40" y1="10" x2="40" y2="130" stroke="#334155" strokeWidth="1.8" />

                {/* Arrows */}
                <path d="M 230 130 L 225 127 L 225 133 z" fill="#334155" />
                <path d="M 40 10 L 37 15 L 43 15 z" fill="#334155" />

                {/* Origin Label */}
                <text x="28" y="141" fill="#475569" className="text-[10px] font-sans font-black">O</text>

                {activeGraphTab === "p_1V" && (
                  <>
                    {/* Low Temp T1 Line */}
                    <line x1="40" y1="130" x2="190" y2="70" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                    {/* High Temp T2 Line */}
                    <line x1="40" y1="130" x2="190" y2="35" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" />
                    
                    <text x="198" y="73" fill="#ef4444" className="text-[9px] font-black">T₁</text>
                    <text x="198" y="38" fill="#fb923c" className="text-[9px] font-black">T₂ (T₂ &gt; T₁)</text>
                    <text x="215" y="143" fill="#1e293b" className="text-[9px] font-black">1/V</text>
                    <text x="25" y="14" fill="#1e293b" className="text-[9px] font-black">p</text>

                    {/* Dotted section showing passing through origin */}
                    <line x1="40" y1="130" x2="25" y2="136" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                  </>
                )}

                {activeGraphTab === "pV" && (
                  <>
                    {/* Hyperbolas */}
                    <path d="M 50 120 Q 90 50 190 40" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 70 120 Q 110 70 210 60" fill="none" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" />

                    <text x="195" y="42" fill="#ef4444" className="text-[9px] font-black">T₁</text>
                    <text x="215" y="62" fill="#fb923c" className="text-[9px] font-black">T₂ (T₂ &gt; T₁)</text>
                    <text x="220" y="143" fill="#1e293b" className="text-[9px] font-black">V</text>
                    <text x="25" y="14" fill="#1e293b" className="text-[9px] font-black">p</text>
                  </>
                )}

                {activeGraphTab === "VT" && (
                  <>
                    {/* Isobaric lines */}
                    <line x1="70" y1="110" x2="210" y2="35" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <line x1="40" y1="130" x2="70" y2="110" stroke="#3b82f6" strokeWidth="1.8" strokeDasharray="3,3" />

                    <text x="215" y="38" fill="#3b82f6" className="text-[9px] font-black">p (Hằng số)</text>
                    <text x="215" y="143" fill="#1e293b" className="text-[9px] font-black">T (K)</text>
                    <text x="25" y="14" fill="#1e293b" className="text-[9px] font-black">V</text>
                  </>
                )}

                {activeGraphTab === "pT" && (
                  <>
                    {/* Isochoric lines */}
                    <line x1="70" y1="110" x2="210" y2="35" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                    <line x1="40" y1="130" x2="70" y2="110" stroke="#10b981" strokeWidth="1.8" strokeDasharray="3,3" />

                    <text x="215" y="38" fill="#10b981" className="text-[9px] font-black">V (Hằng số)</text>
                    <text x="215" y="143" fill="#1e293b" className="text-[9px] font-black">T (K)</text>
                    <text x="25" y="14" fill="#1e293b" className="text-[9px] font-black">p</text>
                  </>
                )}
              </svg>
            </div>
            
            <div className="bg-gradient-to-r from-teal-50 to-indigo-50 p-3.5 rounded-xl border border-teal-100 text-[10.5px] leading-relaxed text-slate-700 flex items-start gap-2 shadow-inner mt-3 w-full">
              <Info className="h-4.5 w-4.5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                {activeGraphTab === "p_1V" && (
                  <span>
                    <strong className="text-teal-950 block font-black">Đồ thị tuyến tính đẳng nhiệt (<FormattedMathText text="\\( p - \\frac{1}{V} \\)" />):</strong>
                    Chứng tỏ tích số <FormattedMathText text="\\( p \\cdot V \\)" /> không đổi. Đường dốc hơn nằm phía trên ứng với nhiệt độ cao hơn (<span className="text-orange-600 font-bold"><FormattedMathText text="\\( T_2 > T_1 \\)" /></span>). Đường kéo dài nét đứt đi qua gốc \\( O \\) là điểm giới hạn lí tưởng.
                  </span>
                )}
                {activeGraphTab === "pV" && (
                  <span>
                    <strong className="text-teal-950 block font-black">Nhánh Hyperbol đẳng nhiệt (<FormattedMathText text="\\( p - V \\)" />):</strong>
                    Thể hiện áp suất tăng dồn dập khi thể tích nén chặt lại và ngược lại. Đường hyperbol nằm xa gốc tọa độ \\( O \\) hơn biểu thị nhiệt độ tuyệt đối cao hơn.
                  </span>
                )}
                {activeGraphTab === "VT" && (
                  <span>
                    <strong className="text-indigo-950 block font-black">Đồ thị đẳng áp (<FormattedMathText text="\\( V - T \\)" />):</strong>
                    Thể tích khí tỉ lệ thuận tuyến tính với nhiệt độ Kelvin. Đường nét đứt kéo dài về gốc \\( O \\) chứng minh thể tích khí biến mất lý thuyết tại nhiệt độ không tuyệt đối (0 K).
                  </span>
                )}
                {activeGraphTab === "pT" && (
                  <span>
                    <strong className="text-emerald-950 block font-black">Đồ thị đẳng tích (<FormattedMathText text="\\( p - T \\)" />):</strong>
                    Áp suất khí tỉ lệ thuận tuyến tính với nhiệt độ tuyệt đối T khi giữ cố định thể tích bình chứa. Giúp giải thích sự tăng vọt áp suất khi đốt nóng bình gas.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PHẦN IV: THỰC TIỄN & BÀN THỰC NGHIỆM KHÍ LÍ TƯỞNG MINI */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-teal-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-teal-400 to-teal-500 rounded-md"></span>
          <h3 className="text-md font-black text-slate-950 uppercase">
            IV. Ứng dụng Thực tiễn đời sống & Bàn thực nghiệm mini
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-xs text-slate-800 font-bold leading-relaxed">
          {/* Real-world cases */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <p className="text-slate-700">
              Các đẳng quá trình và phương trình Mendeleev lý giải vô vàn hiện tượng quan trọng:
            </p>

            <div className="space-y-3">
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50/40 border-2 border-teal-200 border-b-[4px] border-b-teal-300 rounded-2xl p-4 shadow-sm flex gap-3">
                <span className="text-[20px] shrink-0 mt-1">🎈</span>
                <div>
                  <strong className="text-slate-950 block font-black text-[12.5px]">1. Động lực học Khinh khí cầu</strong>
                  Khi đốt lửa đốt nóng khí bên trong khinh khí cầu, nhiệt độ T tăng lên. Áp suất p tự cân bằng với khí quyển xung quanh, thể tích V nở ra đẩy bớt lượng khí thưa ra ngoài. Khối lượng riêng giảm tạo lực nâng đưa khinh khí cầu lên cao.
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-amber-100/30 border-2 border-amber-200 border-b-[4px] border-b-amber-300 rounded-2xl p-4 shadow-sm flex gap-3">
                <span className="text-[20px] shrink-0 mt-1">🚲</span>
                <div>
                  <strong className="text-slate-950 block font-black text-[12.5px]">2. Hiện tượng bơm xe nóng vỏ bơm</strong>
                  Nén pitông đột ngột làm thể tích V giảm mạnh, công cơ học nạp vào khối khí chuyển hóa trực tiếp thành nhiệt năng (nội năng) làm nhiệt độ T tăng vọt dồn dập, vỏ bơm kim loại nóng rực rát tay.
                </div>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-rose-100/30 border-2 border-rose-250 border-b-[4px] border-b-rose-350 rounded-2xl p-4 shadow-sm flex gap-3">
                <span className="text-[20px] shrink-0 mt-1">🧴</span>
                <div>
                  <strong className="text-slate-950 block font-black text-[12.5px]">3. Hiểm họa nổ bình gas mini/bình xịt</strong>
                  Vỏ kim loại giữ thể tích V không đổi (quá trình đẳng tích). Nếu ném bình vào nguồn nhiệt cao làm T tăng phi mã, áp suất p bên trong tăng vượt mức giới hạn cơ học chịu đựng của kim loại gây nổ tung mảnh sắt cực kỳ nguy hiểm.
                </div>
              </div>
            </div>
          </div>

          {/* Mini Interactive Sandbox inside elegant Light 3D layout */}
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-50 to-slate-100/40 border-2 border-slate-250 border-b-[6px] border-b-slate-350 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Settings className="h-4 w-4 text-indigo-600 animate-spin-slow" />
                Bộ hiệu chuẩn khí lí tưởng mini
              </span>
              <span className="text-[9.5px] bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-200 font-mono font-black">
                pV = nRT
              </span>
            </div>

            <p className="text-[10.5px] text-slate-600 leading-normal font-bold">
              Kéo thanh trượt để biến đổi tự do hoặc chọn &apos;khóa&apos; một thông số cố định để kiểm chứng hệ quả Clapeyron:
            </p>

            {/* Locking toggle buttons */}
            <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
              <button
                onClick={() => setConstantType("none")}
                className={`py-2 text-[9.5px] font-black rounded-xl transition-all cursor-pointer ${
                  constantType === "none"
                    ? "bg-slate-900 text-white shadow-[0_3px_0_0_#475569]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                }`}
              >
                Tự do
              </button>
              <button
                onClick={() => setConstantType("T")}
                className={`py-2 text-[9.5px] font-black rounded-xl transition-all cursor-pointer ${
                  constantType === "T"
                    ? "bg-red-500 text-white shadow-[0_3px_0_0_#991b1b]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                }`}
              >
                Khóa T
              </button>
              <button
                onClick={() => setConstantType("V")}
                className={`py-2 text-[9.5px] font-black rounded-xl transition-all cursor-pointer ${
                  constantType === "V"
                    ? "bg-emerald-500 text-white shadow-[0_3px_0_0_#065f46]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                }`}
              >
                Khóa V
              </button>
              <button
                onClick={() => setConstantType("p")}
                className={`py-2 text-[9.5px] font-black rounded-xl transition-all cursor-pointer ${
                  constantType === "p"
                    ? "bg-blue-500 text-white shadow-[0_3px_0_0_#075985]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                }`}
              >
                Khóa p
              </button>
            </div>

            {/* Sliders */}
            <div className="space-y-3 text-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="flex items-center gap-1">
                    <Activity className="h-3.5 w-3.5 text-red-500" />
                    Áp suất (p):
                  </span>
                  <span className="font-mono text-indigo-700 font-black">{pressure.toFixed(2)} atm</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="5.0"
                  step="0.05"
                  disabled={constantType === "p"}
                  value={pressure}
                  onChange={(e) => handleStateChange("p", parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="flex items-center gap-1">
                    <Wind className="h-3.5 w-3.5 text-emerald-500" />
                    Thể tích (V):
                  </span>
                  <span className="font-mono text-indigo-700 font-black">{volume.toFixed(2)} Lít</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.1"
                  disabled={constantType === "V"}
                  value={volume}
                  onChange={(e) => handleStateChange("V", parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="flex items-center gap-1">
                    <Thermometer className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
                    Nhiệt độ (T):
                  </span>
                  <span className="font-mono text-indigo-700 font-black">{temperature} K ({temperature - 273}°C)</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="5"
                  disabled={constantType === "T"}
                  value={temperature}
                  onChange={(e) => handleStateChange("T", parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Readouts Inside Inner White Box */}
            <div className="bg-white p-3.5 rounded-2xl border-2 border-slate-200 space-y-2 shadow-inner text-[11px]">
              <span className="block font-black text-slate-500 uppercase tracking-wider text-[9px]">
                Dữ liệu đo lường liên đới
              </span>
              <div className="grid grid-cols-2 gap-2 text-slate-800">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[9px] font-bold">Tỉ số p.V / T</span>
                  <strong className="font-mono text-teal-700 text-xs font-black">
                    {((pressure * volume) / temperature).toFixed(5)}
                  </strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[9px] font-bold">Số mol khí bảo toàn</span>
                  <strong className="font-mono text-indigo-700 text-xs font-black">
                    {moles} mol
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION V: BÀI TẬP TỰ LUẬN TÍNH TOÁN - INTERACTIVE WORD PROBLEM SOLVER */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-teal-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-teal-400 to-teal-500 rounded-md"></span>
          <h3 className="text-md font-black text-slate-950 uppercase">
            V. Công cụ tự luyện tính toán (Mendeleev Calculator)
          </h3>
        </div>

        <div className="bg-gradient-to-b from-teal-50 to-teal-100/30 border-2 border-teal-200 border-b-[6px] border-b-teal-300 rounded-3xl p-5 shadow-sm space-y-4">
          <span className="text-[10px] bg-teal-100 text-teal-800 px-3 py-1 rounded-full border border-teal-200 font-black uppercase tracking-wider inline-block">
            Giải bài tập tự luận chất khí
          </span>
          <div className="text-xs text-slate-800 leading-relaxed font-bold space-y-2">
            <p>
              Hãy tự thiết lập các giá trị áp suất, thể tích và nhiệt độ của bình kín để kiểm nghiệm khối lượng khí cần nạp bằng phương trình Clapeyron-Mendeleev:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-sm space-y-1">
                <span className="block text-slate-600 text-[10px] uppercase">Áp suất <FormattedMathText text="p" /> (atm)</span>
                <input
                  type="text"
                  value={calcP}
                  onChange={(e) => setCalcP(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-mono text-xs font-bold text-slate-800 outline-none focus:border-teal-500"
                />
              </div>
              <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-sm space-y-1">
                <span className="block text-slate-600 text-[10px] uppercase">Thể tích <FormattedMathText text="V" /> (Lít)</span>
                <input
                  type="text"
                  value={calcV}
                  onChange={(e) => setCalcV(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-mono text-xs font-bold text-slate-800 outline-none focus:border-teal-500"
                />
              </div>
              <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-sm space-y-1">
                <span className="block text-slate-600 text-[10px] uppercase">Nhiệt độ <FormattedMathText text="T" /> (Kelvin)</span>
                <input
                  type="text"
                  value={calcT}
                  onChange={(e) => setCalcT(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-mono text-xs font-bold text-slate-800 outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
              <button
                onClick={runMendeleevCalc}
                className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl border-b-4 border-b-teal-700 active:translate-y-[2px] active:border-b-0 shadow-sm transition-all cursor-pointer uppercase tracking-wider"
              >
                Tính số mol & khối lượng Heli (He)
              </button>
              
              <div className="flex-1 sm:pl-4">
                {calcResult && (
                  <div className="bg-white p-3 rounded-xl border-2 border-teal-200/50 text-[11px] text-teal-900 font-bold shadow-inner">
                    👉 {calcResult}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION VI: INTERACTIVE PRACTICE QUIZ (3D LIGHT THEME) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-teal-200 pb-2">
          <span className="w-2.5 h-5 bg-gradient-to-b from-teal-400 to-teal-500 rounded-md"></span>
          <h3 className="text-md font-black text-slate-950 uppercase">
            VI. Bài tập trắc nghiệm luyện tập Bài 11
          </h3>
        </div>

        <div className="bg-gradient-to-b from-purple-50 to-indigo-50/40 border-2 border-purple-250 border-b-[6px] border-b-purple-350 rounded-3xl p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b-2 border-purple-100 pb-2.5">
            <span className="text-[10px] bg-purple-100 text-purple-800 px-3 py-1 rounded-full border border-purple-200 font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <HelpCircle className="h-3.5 w-3.5 text-purple-600" />
              Câu hỏi luyện tập trắc nghiệm ({activeQuizIndex + 1} / {quizQuestions.length})
            </span>
            <div className="flex gap-1">
              {quizQuestions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveQuizIndex(idx);
                    setSelectedQuiz(null);
                    setQuizSubmitted(false);
                  }}
                  className={`w-6 h-6 rounded-lg text-[10px] font-black border transition-all cursor-pointer ${
                    activeQuizIndex === idx
                      ? "bg-purple-600 text-white border-purple-700"
                      : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-900 leading-relaxed space-y-3 font-bold">
            <strong className="text-slate-950 text-sm block">
              Câu {activeQuizIndex + 1}: <FormattedMathText text={quizQuestions[activeQuizIndex].q} />
            </strong>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              {quizQuestions[activeQuizIndex].options.map((ans, idx) => {
                const isSelected = selectedQuiz === idx;
                let btnClass = "";
                if (quizSubmitted) {
                  if (idx === quizQuestions[activeQuizIndex].correct) {
                    btnClass = "bg-emerald-500 text-white border-emerald-600 shadow-[0_4px_0_0_#047857] translate-y-[-2px] font-black";
                  } else if (isSelected) {
                    btnClass = "bg-rose-500 text-white border-rose-600 shadow-[0_4px_0_0_#be123c] translate-y-[-2px] font-black";
                  } else {
                    btnClass = "bg-slate-100 text-slate-400 border-slate-200 opacity-40 cursor-not-allowed";
                  }
                } else if (isSelected) {
                  btnClass = "bg-gradient-to-b from-yellow-300 to-yellow-400 text-slate-950 border-2 border-yellow-500 shadow-[0_4px_0_0_#b45309] translate-y-[-2px] font-black";
                } else {
                  btnClass = "bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 shadow-[0_4px_0_0_#e2e8f0] active:translate-y-[2px] active:shadow-[0_2px_0_0_#e2e8f0] font-extrabold";
                }

                return (
                  <button
                    key={idx}
                    disabled={quizSubmitted}
                    onClick={() => setSelectedQuiz(idx)}
                    className={`px-4 py-3 rounded-2xl text-left cursor-pointer transition-all ${btnClass}`}
                  >
                    <FormattedMathText text={ans} />
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
              <div>
                {quizSubmitted && (
                  <span className={`text-[12px] font-black flex items-center gap-1.5 ${selectedQuiz === quizQuestions[activeQuizIndex].correct ? "text-emerald-600" : "text-rose-600 animate-pulse"}`}>
                    {selectedQuiz === quizQuestions[activeQuizIndex].correct ? (
                      <><CheckCircle2 className="h-5 w-5 stroke-[2.5]" /> Chúc mừng! Bạn trả lời chính xác lý thuyết Bài 11.</>
                    ) : (
                      <>Rất tiếc! Bạn đã chọn sai đáp án.</>
                    )}
                  </span>
                )}
              </div>

              {!quizSubmitted ? (
                <button
                  disabled={selectedQuiz === null}
                  onClick={() => setQuizSubmitted(true)}
                  className={`px-5 py-2 bg-purple-600 text-white hover:bg-purple-500 border-b-4 border-purple-800 active:translate-y-[2px] active:border-b-0 cursor-pointer font-black text-xs rounded-xl shadow-sm tracking-wider uppercase`}
                >
                  Nộp câu trả lời
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedQuiz(null);
                    setQuizSubmitted(false);
                    if (activeQuizIndex < quizQuestions.length - 1) {
                      setActiveQuizIndex(prev => prev + 1);
                    } else {
                      setActiveQuizIndex(0);
                    }
                  }}
                  className="px-4 py-2 bg-white border-2 border-slate-200 hover:bg-slate-50 rounded-xl font-black text-xs text-slate-700 transition-all cursor-pointer shadow-sm"
                >
                  {activeQuizIndex < quizQuestions.length - 1 ? "Câu hỏi kế tiếp" : "Quay lại Câu 1"}
                </button>
              )}
            </div>

            {quizSubmitted && (
              <div className="bg-white p-4 rounded-2xl border-2 border-purple-100/80 text-[11px] leading-relaxed text-slate-700 font-bold shadow-inner">
                <span className="text-purple-900 block font-black mb-1">💡 HƯỚNG DẪN CHI TIẾT:</span>
                <FormattedMathText text={quizQuestions[activeQuizIndex].explain} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
