import { useState } from "react";
import {
  Brain,
  Flame,
  Award,
  Trophy,
  CheckCircle2,
  Target,
  Search,
  Download,
  Filter,
  Users,
  TrendingUp,
  FileText,
  BookOpen,
  Sparkles,
  AlertCircle,
  Crown,
  Medal
} from "lucide-react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from "recharts";
import { StudentResult, ACADEMIC_CHAPTERS } from "../types";
import { analyzeStudentProgress } from "../lib/recommendation";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl text-slate-100 text-[11px] font-mono shadow-xl max-w-[220px]">
        <p className="font-black text-white">{data.name}</p>
        <p className="text-slate-400 font-semibold mt-0.5">Ngày thi: {data.date}</p>
        <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-slate-900">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
          <p className="font-black text-sm text-cyan-400">Điểm: {data.score} / 10</p>
        </div>
      </div>
    );
  }
  return null;
};

export function StudentDashboard({
  onEarnXP,
  onContinueLearning,
  studentResults,
  loggedInUser
}: {
  onEarnXP: (xp: number) => void;
  onContinueLearning?: (lessonId?: string) => void;
  studentResults: StudentResult[];
  loggedInUser: { name: string; className: string } | null;
}) {
  const [activeSubTab, setActiveSubTab] = useState<"tasks" | "results">("tasks");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("All");

  const claimDailyMission = (id: number) => {
    onEarnXP(25);
    alert("Chúc mừng bạn đã nhận 25 XP từ Nhiệm vụ ngày!");
  };

  // Extract unique classes for filter buttons
  const classes = ["All", ...Array.from(new Set(studentResults.map((s) => s.className))).sort()];

  // Filter students based on search term and selected class
  const filteredStudents = studentResults.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "All" || student.className === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Export to CSV helper
  const handleExportCSV = () => {
    const BOM = "\uFEFF";
    let csvContent = BOM;
    csvContent += "Họ và tên,Lớp,Điểm học tập (GPA),Tiến độ học (%),Tích lũy XP,Số câu trắc nghiệm đúng\n";

    filteredStudents.forEach((s) => {
      csvContent += `"${s.name}","${s.className}",${s.score.toFixed(1)},${s.progress}%,${s.xp},${s.completedQuizzes}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const fileName = selectedClass === "All"
      ? "Ket_Qua_Hoc_Tap_Vat_Li_12_Tat_Ca.csv"
      : `Ket_Qua_Hoc_Tap_Vat_Li_12_Lop_${selectedClass}.csv`;

    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Find the logged-in student's stats
  const currentStudentStats = studentResults.find(
    (s) => s.name.toLowerCase() === loggedInUser?.name.toLowerCase() && s.className === loggedInUser?.className
  );

  const analysis = analyzeStudentProgress(currentStudentStats, ACADEMIC_CHAPTERS);
  const nextTargetLesson = analysis.recommendations[0]?.lesson || ACADEMIC_CHAPTERS[0].lessons[0];

  // Generate test history based on the student's actual current score (GPA)
  const currentGPA = currentStudentStats ? currentStudentStats.score : 8.5;
  const testHistory = [
    { name: "KT Chương I: Bài 1, 2", score: Math.min(10, Math.max(4, parseFloat((currentGPA * 0.88).toFixed(1)))), date: "15/09", color: "#3b82f6" },
    { name: "KT Chương I: Bài 3, 4", score: Math.min(10, Math.max(4, parseFloat((currentGPA * 0.94).toFixed(1)))), date: "30/09", color: "#22d3ee" },
    { name: "KT Giữa Kỳ I - Vật lí nhiệt", score: Math.min(10, Math.max(4, parseFloat((currentGPA * 1.00).toFixed(1)))), date: "15/10", color: "#10b981" },
    { name: "KT Chương II: Bài 8, 9", score: Math.min(10, Math.max(4, parseFloat((currentGPA * 1.04).toFixed(1)))), date: "05/11", color: "#f59e0b" },
    { name: "KT Chương II: Bài 10, 11", score: Math.min(10, Math.max(4, parseFloat((currentGPA * 0.91).toFixed(1)))), date: "20/11", color: "#8b5cf6" },
    { name: "KT Cuối Kỳ I - Khí lí tưởng", score: Math.min(10, Math.max(4, parseFloat((currentGPA * 1.02).toFixed(1)))), date: "15/12", color: "#ec4899" },
  ];

  // Sort student results to get the top 5 XP holders for leaderboard
  const sortedByXP = [...studentResults].sort((a, b) => b.xp - a.xp);
  const top5XP = sortedByXP.slice(0, 5);
  const currentStudentRankIndex = sortedByXP.findIndex(
    (s) => loggedInUser && s.name.toLowerCase() === loggedInUser.name.toLowerCase() && s.className === loggedInUser.className
  );
  const currentStudentRank = currentStudentRankIndex !== -1 ? currentStudentRankIndex + 1 : null;
  const isCurrentStudentInTop5 = currentStudentRankIndex !== -1 && currentStudentRankIndex < 5;

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column: Stats, Tasks & Learning Results */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
        
        {/* Sub tab navigation */}
        <div className="flex bg-slate-900/40 border border-slate-900/60 p-1 rounded-2xl w-fit">
          <button
            onClick={() => setActiveSubTab("tasks")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "tasks"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Brain className="h-3.5 w-3.5" />
            Nhiệm vụ & Lộ trình học
          </button>
          <button
            onClick={() => setActiveSubTab("results")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "results"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            Kết quả học tập lớp học
          </button>
        </div>

        {activeSubTab === "tasks" ? (
          <>
            {/* Banner */}
            <div className="bg-gradient-to-r from-sky-700 via-indigo-700 to-indigo-950 rounded-3xl p-6 border border-sky-500/30 relative overflow-hidden shadow-lg shadow-indigo-950/20 no-override no-override-bg">
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
              
              {/* Physics Floating Elements */}
              <div className="absolute right-6 top-6 bottom-6 w-36 opacity-20 pointer-events-none hidden sm:flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                  <ellipse cx="50" cy="50" rx="40" ry="12" className="stroke-white stroke-1.5 fill-none" transform="rotate(30, 50, 50)" />
                  <ellipse cx="50" cy="50" rx="40" ry="12" className="stroke-white stroke-1.5 fill-none" transform="rotate(120, 50, 50)" />
                  <circle cx="50" cy="50" r="7" className="fill-pink-400 stroke-white stroke-1" />
                  <circle cx="16" cy="31" r="3.5" className="fill-cyan-300" />
                  <circle cx="84" cy="69" r="3.5" className="fill-yellow-300" />
                </svg>
              </div>

              <div className="relative z-10">
                <span className="px-2.5 py-1 bg-white/20 text-white text-[10px] font-extrabold rounded-full border border-white/30 uppercase tracking-widest shadow-sm">
                  ĐANG HỌC
                </span>
                <h2 className="text-2xl font-black mt-3 mb-2 text-white uppercase tracking-tight">
                  Chương I: Vật lí nhiệt
                </h2>
                <p className="text-slate-100 text-xs max-w-lg mb-4 leading-relaxed font-medium">
                  Bài học ưu tiên đề xuất: <span className="font-extrabold text-yellow-300 underline underline-offset-4">{nextTargetLesson.title}</span>. AI phân tích đề xuất bạn nên ôn luyện hoặc nghiên cứu bài này để bứt phá điểm số.
                </p>
                <button
                  onClick={() => onContinueLearning?.(nextTargetLesson.id)}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-white font-extrabold rounded-xl transition-all shadow-md shadow-cyan-500/20 text-xs cursor-pointer uppercase tracking-wider"
                >
                  Tiếp tục học ngay
                </button>
              </div>
              <div className="absolute top-[-30%] left-[-10%] w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {/* Personalized AI Analysis & Learning Route */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="no-override-bg highlight-personal-card rounded-3xl p-5 border flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-lg duration-300">
                <div>
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/15">
                      <Brain className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="font-extrabold text-purple-950 text-sm">Chẩn đoán Kiến thức AI</h3>
                  </div>
                  <div className="text-xs text-indigo-950/90 leading-relaxed mb-4">
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="font-bold text-purple-900">Tỉ lệ làm chủ kiến thức:</span>
                      <span className="font-black text-purple-700 font-mono bg-purple-100 px-2 py-0.5 rounded-md text-[11px]">{analysis.masteryRate}%</span>
                    </div>
                    <span className="font-extrabold text-purple-900 block mb-1">Điểm yếu cần củng cố:</span>
                    <div className="flex flex-col gap-1.5 mt-1.5">
                      {analysis.weaknesses.slice(0, 2).map((w, idx) => (
                        <span key={idx} className="inline-block px-2.5 py-1 bg-purple-600/10 text-purple-800 rounded-lg font-semibold border border-purple-500/15 font-mono text-[10px] leading-relaxed shadow-sm truncate">
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-purple-200/60 pt-3 mt-2">
                  <span className="text-[10px] text-purple-800/80 font-bold uppercase tracking-wider">Mức độ hoàn thành</span>
                  <span className="text-[10px] text-purple-700 font-black">{analysis.completedCount}/{analysis.totalLessons} Bài học</span>
                </div>
              </div>

              <div className="no-override-bg highlight-target-card rounded-3xl p-5 border flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-lg duration-300">
                <div>
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/15">
                      <Target className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="font-extrabold text-emerald-950 text-sm">Mục tiêu thi THPT</h3>
                  </div>
                  <div className="text-xs text-emerald-950/90 space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900/80">Mục tiêu hiện tại:</span>
                      <span className="px-2.5 py-0.5 bg-emerald-600/15 text-emerald-700 rounded-lg font-black border border-emerald-500/25">9.0+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900/80">Năng lượng đánh giá:</span>
                      <span className="px-2.5 py-0.5 bg-cyan-600/15 text-cyan-700 rounded-lg font-black border border-cyan-500/25 font-mono">
                        {currentStudentStats ? currentStudentStats.score.toFixed(1) : "8.5"} / 10
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900/80">Khả năng đạt mục tiêu:</span>
                      <span className="px-2.5 py-0.5 bg-pink-500/15 text-pink-700 rounded-lg font-black border border-pink-500/25">87%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-emerald-200/60 pt-3">
                  <span className="text-[10px] text-emerald-800/80 font-bold uppercase tracking-wider">Theo chương trình mới</span>
                  <span className="text-[10px] bg-emerald-600 text-white px-3 py-1 rounded-lg font-black uppercase tracking-wider shadow-sm">Tốt</span>
                </div>
              </div>
            </div>

            {/* Score Progress Bar Chart */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center shadow-md shadow-cyan-500/15">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-white">Tiến trình Điểm số Kiểm tra</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Biểu đồ thể hiện sự tiến bộ qua các bài kiểm tra đã hoàn thành</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-slate-950/40 px-2.5 py-1 rounded-md border border-slate-850">
                  <span>GPA hiện tại:</span>
                  <span className="font-black text-amber-400">{currentGPA.toFixed(1)}/10</span>
                </div>
              </div>

              <div className="h-56 w-full pr-4 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={testHistory} margin={{ top: 10, right: 0, left: -25, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#64748b" 
                      fontSize={10} 
                      fontFamily="monospace"
                      tickLine={false} 
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={10} 
                      fontFamily="monospace"
                      tickLine={false} 
                      axisLine={false} 
                      domain={[0, 10]}
                      ticks={[0, 2, 4, 6, 8, 10]}
                    />
                    <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={32}>
                      {testHistory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Dynamic AI Recommendations Panel */}
            <div className="bg-slate-900/40 border border-slate-900/60 rounded-3xl p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center shadow-md shadow-cyan-500/15">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-white">Bài học Đề xuất từ Giáo viên AI</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Lộ trình tối ưu hóa dựa trên điểm số và năng lực hiện tại</p>
                  </div>
                </div>
                <span className="text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                  CÁ NHÂN HÓA
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {analysis.recommendations.map((rec) => {
                  const isNeedsPractice = rec.status === "needs_practice";
                  const isUncompleted = rec.status === "uncompleted";

                  return (
                    <div 
                      key={rec.lesson.id} 
                      className={`rounded-2xl p-4 border flex flex-col justify-between transition-all hover:scale-[1.01] duration-300 relative overflow-hidden ${
                        isNeedsPractice
                          ? "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40"
                          : isUncompleted
                          ? "bg-sky-500/5 border-sky-500/20 hover:border-sky-500/40"
                          : "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40"
                      }`}
                    >
                      {/* Accent corner indicator */}
                      <div className={`absolute top-0 right-0 w-12 h-12 -mr-6 -mt-6 rotate-45 opacity-10 ${
                        isNeedsPractice ? "bg-amber-500" : isUncompleted ? "bg-sky-500" : "bg-emerald-500"
                      }`} />

                      <div>
                        {/* Header badge */}
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            isNeedsPractice
                              ? "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                              : isUncompleted
                              ? "bg-sky-500/15 text-sky-400 border border-sky-500/25"
                              : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                          }`}>
                            {isNeedsPractice ? "Cần ôn tập" : isUncompleted ? "Chưa học" : "Đã làm chủ"}
                          </span>
                          {rec.score !== undefined && (
                            <span className="text-[10px] font-mono text-slate-400 font-bold">
                              {rec.score.toFixed(1)}/10
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="text-xs font-black text-slate-100 line-clamp-1 group-hover:text-cyan-400">
                          {rec.lesson.title}
                        </h4>
                        <span className="text-[9px] text-slate-500 font-bold block mt-0.5 truncate uppercase">
                          {rec.chapterTitle}
                        </span>

                        {/* Recommendation Reason */}
                        <p className="text-[10px] text-slate-400 mt-2.5 leading-relaxed">
                          {rec.recommendationReason}
                        </p>
                      </div>

                      {/* CTA Action button */}
                      <button
                        onClick={() => onContinueLearning?.(rec.lesson.id)}
                        className={`w-full mt-4 py-1.5 text-[10px] font-black rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95 ${
                          isNeedsPractice
                            ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10"
                            : isUncompleted
                            ? "bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/10"
                            : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/10"
                        }`}
                      >
                        <BookOpen className="w-3 h-3" />
                        {isNeedsPractice ? "Luyện tập ngay" : isUncompleted ? "Chinh phục ngay" : "Học lại lý thuyết"} &rarr;
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Daily Quests / Missions */}
            <div className="no-override-bg highlight-quests-card rounded-3xl p-5 border">
              <h3 className="font-black text-sm text-amber-950 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center shadow-md shadow-amber-500/10">
                  <Trophy className="h-4.5 w-4.5" />
                </div>
                Nhiệm vụ Ngày hôm nay
              </h3>
              <div className="space-y-3">
                <div className="no-override-bg highlight-quests-item-active p-4 rounded-xl flex items-center justify-between gap-4 transition-all hover:scale-[1.01] duration-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sky-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-black text-slate-900 block uppercase tracking-tight">Thực hành 1 thí nghiệm ảo</span>
                      <span className="text-[10px] text-slate-500 block font-bold mt-0.5 leading-relaxed">Quan sát đồ thị chuyển thể hoặc đẳng nhiệt</span>
                    </div>
                  </div>
                  <button
                    onClick={() => claimDailyMission(1)}
                    className="px-3 py-1.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-lg text-[10px] font-black shadow-md shadow-sky-500/10 cursor-pointer uppercase tracking-wider transition-all hover:scale-105"
                  >
                    Nhận +25 XP
                  </button>
                </div>

                <div className="no-override-bg highlight-quests-item-inactive p-4 rounded-xl flex items-center justify-between gap-4 transition-all hover:scale-[1.01] duration-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-slate-300 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-extrabold text-slate-500 block uppercase tracking-tight">Tương tác với AI Trợ giảng</span>
                      <span className="text-[10px] text-slate-400 block font-semibold mt-0.5 leading-relaxed">Hỏi cách giải bài tập hoặc thuật ngữ tiếng Anh</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md font-black uppercase tracking-wider">Chưa xong</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Student Learning Results Table Panel */
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col gap-5 animate-fade-in">
            {/* Header with Search and Export */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-md font-extrabold text-white">Bảng Thống kê Kết quả Học tập Vật lí 12</h3>
                <p className="text-xs text-slate-400 mt-1">Thông tin chi tiết điểm học tập, tiến độ và năng lực tích lũy</p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-initial">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-slate-500">
                    <Search className="h-3.5 w-3.5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm tên học sinh..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-950 border border-slate-850 text-slate-300 text-xs rounded-xl pl-8 pr-3 py-2 outline-none focus:border-cyan-500 w-full md:w-44 transition-colors"
                  />
                </div>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shrink-0"
                >
                  <Download className="h-3.5 w-3.5" />
                  Xuất Excel
                </button>
              </div>
            </div>

            {/* Class Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-slate-400 mr-2 uppercase tracking-wider flex items-center gap-1">
                <Filter className="h-3 w-3" /> Lọc Lớp:
              </span>
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                    selectedClass === cls
                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/35"
                      : "bg-slate-950 text-slate-400 border-slate-900 hover:text-white"
                  }`}
                >
                  {cls === "All" ? "Tất cả lớp" : `Lớp ${cls}`}
                </button>
              ))}
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-850 bg-slate-950/40">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="text-slate-500 bg-slate-950 border-b border-slate-850">
                    <th className="font-extrabold px-4 py-3">Họ và tên</th>
                    <th className="font-extrabold px-4 py-3">Lớp</th>
                    <th className="font-extrabold px-4 py-3 text-center">Điểm học tập (10)</th>
                    <th className="font-extrabold px-4 py-3">Tiến độ</th>
                    <th className="font-extrabold px-4 py-3 text-right">Tích lũy XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850/60">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, idx) => {
                      const isCurrent =
                        loggedInUser &&
                        student.name.toLowerCase() === loggedInUser.name.toLowerCase() &&
                        student.className === loggedInUser.className;
                      return (
                        <tr
                          key={idx}
                          className={`hover:bg-slate-900/30 transition-colors ${
                            isCurrent ? "bg-cyan-500/5 font-semibold" : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-semibold text-slate-200 flex items-center gap-2">
                            {student.name}
                            {isCurrent && (
                              <span className="text-[9px] bg-cyan-500 text-slate-950 px-1.5 py-0.5 rounded-full font-black uppercase">
                                Bạn
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-slate-400 font-medium">Lớp {student.className}</td>
                          <td className="px-4 py-3 text-center font-mono font-bold text-amber-400">
                            {student.score.toFixed(1)} / 10
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 bg-slate-900 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-cyan-400"
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-cyan-400 font-bold">
                            {student.xp.toLocaleString()} XP
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-slate-500 font-medium font-mono">
                        Không tìm thấy học sinh phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Class aggregate metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-850 flex items-center gap-3">
                <Users className="h-5 w-5 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[9px] text-slate-500 uppercase font-extrabold tracking-wider block">Sĩ số lớp lọc</span>
                  <span className="text-sm font-extrabold text-white">{filteredStudents.length} học sinh</span>
                </div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-850 flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[9px] text-slate-500 uppercase font-extrabold tracking-wider block">GPA Trung bình</span>
                  <span className="text-sm font-extrabold text-white">
                    {(
                      filteredStudents.reduce((acc, curr) => acc + curr.score, 0) /
                        (filteredStudents.length || 1)
                    ).toFixed(2)}{" "}
                    / 10
                  </span>
                </div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-850 flex items-center gap-3">
                <Flame className="h-5 w-5 text-red-400 shrink-0" />
                <div>
                  <span className="text-[9px] text-slate-500 uppercase font-extrabold tracking-wider block">Tổng tích lũy XP</span>
                  <span className="text-sm font-extrabold text-white">
                    {filteredStudents.reduce((acc, curr) => acc + curr.xp, 0).toLocaleString()} XP
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Radar Chart, Achievements, Streaks */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        {/* Leaderboard Section */}
        <div className="bg-slate-900/60 rounded-3xl p-5 border border-slate-800 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/15">
                <Crown className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white">Bảng Vàng Học Tập</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Top 5 học sinh tích lũy XP cao nhất</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/15 animate-pulse">
              <Sparkles className="w-3 h-3" />
              <span>LIVE</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-1.5">
            {top5XP.map((student, idx) => {
              const rank = idx + 1;
              const isCurrent =
                loggedInUser &&
                student.name.toLowerCase() === loggedInUser.name.toLowerCase() &&
                student.className === loggedInUser.className;

              // Rank style configuration
              let rankBadgeStyle = "bg-slate-950 text-slate-400 border border-slate-850";
              let rankIcon = null;
              if (rank === 1) {
                rankBadgeStyle = "bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 font-black shadow-lg shadow-yellow-500/10";
                rankIcon = "👑";
              } else if (rank === 2) {
                rankBadgeStyle = "bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-black";
                rankIcon = "🥈";
              } else if (rank === 3) {
                rankBadgeStyle = "bg-gradient-to-r from-amber-600 to-amber-800 text-white font-black";
                rankIcon = "🥉";
              }

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2.5 rounded-2xl transition-all border ${
                    isCurrent
                      ? "bg-cyan-500/10 border-cyan-500/30 shadow-md shadow-cyan-500/5 scale-[1.02]"
                      : "bg-slate-950/40 border-slate-900 hover:border-slate-850 hover:bg-slate-950/60"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${rankBadgeStyle}`}>
                      {rankIcon || rank}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-bold truncate ${isCurrent ? "text-cyan-400 font-extrabold" : "text-slate-200"}`}>
                          {student.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[8px] bg-cyan-400 text-slate-950 px-1 py-0.2 rounded-md font-black uppercase shrink-0">
                            Bạn
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono font-bold block mt-0.5">
                        Lớp {student.className}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs font-bold text-amber-400 pl-2 shrink-0">
                    <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse fill-orange-500" />
                    <span>{student.xp.toLocaleString()} XP</span>
                  </div>
                </div>
              );
            })}

            {/* Display logged-in user's position if they are outside top 5 */}
            {!isCurrentStudentInTop5 && currentStudentStats && currentStudentRank && (
              <>
                <div className="flex items-center justify-center gap-1.5 my-1">
                  <span className="h-[1px] bg-slate-800 w-6"></span>
                  <span className="text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest">vị trí của bạn</span>
                  <span className="h-[1px] bg-slate-800 w-6"></span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 shadow-md shadow-cyan-500/5 scale-[1.02]">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/25 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-xs font-black shrink-0">
                      #{currentStudentRank}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-cyan-400 truncate">
                          {currentStudentStats.name}
                        </span>
                        <span className="text-[8px] bg-cyan-400 text-slate-950 px-1 py-0.2 rounded-md font-black uppercase shrink-0">
                          Bạn
                        </span>
                      </div>
                      <span className="text-[9px] text-cyan-500/70 font-mono font-bold block mt-0.5">
                        Lớp {currentStudentStats.className}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs font-bold text-amber-400 pl-2 shrink-0">
                    <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse fill-orange-500" />
                    <span>{currentStudentStats.xp.toLocaleString()} XP</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Radar Cognitive Chart */}
        <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800">
          <h3 className="font-bold text-xs text-slate-300 uppercase tracking-widest mb-4">
            Bản đồ Năng lực môn Lý
          </h3>
          <div className="flex justify-center items-center h-44 relative">
            {/* SVG Radar simulation */}
            <svg viewBox="0 0 100 100" className="w-36 h-36">
              {/* Outer grid rings */}
              <polygon points="50,10 90,38 75,85 25,85 10,38" fill="none" stroke="#334155" strokeWidth="0.5" />
              <polygon points="50,23 80,44 69,76 31,76 20,44" fill="none" stroke="#334155" strokeWidth="0.5" />
              <polygon points="50,36 70,50 62,68 38,68 30,50" fill="none" stroke="#1e293b" strokeWidth="0.5" />
              {/* Axis lines */}
              <line x1="50" y1="50" x2="50" y2="10" stroke="#334155" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="90" y2="38" stroke="#334155" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="75" y2="85" stroke="#334155" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="25" y2="85" stroke="#334155" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="10" y2="38" stroke="#334155" strokeWidth="0.5" />
              {/* Current ability polygon */}
              <polygon points="50,20 85,41 72,80 35,76 18,40" fill="rgba(6,182,212,0.18)" stroke="#22d3ee" strokeWidth="1.5" />
              {/* Labels markers */}
              <circle cx="50" cy="20" r="1.5" fill="#22d3ee" />
              <circle cx="85" cy="41" r="1.5" fill="#22d3ee" />
              <circle cx="72" cy="80" r="1.5" fill="#22d3ee" />
            </svg>
            <div className="absolute top-2 text-[8px] font-bold text-slate-500 uppercase">Nhận biết (9.2)</div>
            <div className="absolute right-1 top-20 text-[8px] font-bold text-slate-500 uppercase">Thông hiểu (8.8)</div>
            <div className="absolute bottom-2 right-4 text-[8px] font-bold text-slate-500 uppercase">Vận dụng (8.0)</div>
            <div className="absolute bottom-2 left-4 text-[8px] font-bold text-slate-500 uppercase">Vận dụng cao (7.2)</div>
            <div className="absolute left-1 top-20 text-[8px] font-bold text-slate-500 uppercase">Thí nghiệm (8.5)</div>
          </div>
          <p className="text-[10px] text-slate-500 text-center leading-relaxed mt-2">
            Đánh giá theo các mức độ nhận thức định hướng kiểm tra khảo thí quốc gia mới.
          </p>
        </div>

        {/* Badges / Achievements */}
        <div className="no-override-bg highlight-badge-container rounded-3xl p-5 border">
          <h3 className="font-black text-sm text-slate-800 mb-4">Danh hiệu học tập</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="no-override-bg highlight-badge-thukhoa p-3.5 rounded-xl flex flex-col items-center text-center transition-all hover:scale-[1.05] duration-250">
              <div className="w-10 h-10 bg-white text-amber-600 rounded-full flex items-center justify-center mb-2 shadow-md border-2 border-amber-500/40 font-black text-base">A</div>
              <span className="text-[11px] font-black uppercase tracking-wider block">THỦ KHOA</span>
              <span className="text-[8px] font-black uppercase mt-1">
                GPA {currentStudentStats ? currentStudentStats.score.toFixed(1) : "9.2"} Lý
              </span>
            </div>
            <div className="no-override-bg highlight-badge-sieutoc p-3.5 rounded-xl flex flex-col items-center text-center transition-all hover:scale-[1.05] duration-250">
              <div className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center mb-2 shadow-md border-2 border-blue-500/40 font-black text-base">⚡</div>
              <span className="text-[11px] font-black uppercase tracking-wider block">SIÊU TỐC</span>
              <span className="text-[8px] font-black uppercase mt-1">Giải 10s/câu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
