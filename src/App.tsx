import React, { useState, useEffect } from "react";
import {
  Sparkles,
  GraduationCap,
  LayoutDashboard,
  FlaskConical,
  MessageSquare,
  FileText,
  BookOpen,
  Wrench,
  Trophy,
  Flame,
  User,
  Users,
  Brain,
  Cpu,
  Lock,
  LogOut,
  CheckCircle,
  Code,
  BookMarked,
  Sigma,
  Cloud
} from "lucide-react";

// Import modular sub-sections
import { StudentDashboard } from "./components/StudentDashboard";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { Curriculum } from "./components/Curriculum";
import { VirtualExperiment } from "./components/VirtualExperiment";
import { AIAssistant } from "./components/AIAssistant";
import { ExamManager } from "./components/ExamManager";
import { QuestionBank } from "./components/QuestionBank";
import { Glossary } from "./components/Glossary";
import { STEMZone } from "./components/STEMZone";
import { EditorSandbox } from "./components/EditorSandbox";
import { FormulaLibrary } from "./components/FormulaLibrary";
import { GoogleDriveWorkspace } from "./components/GoogleDriveWorkspace";
import { StudentResult, DEFAULT_STUDENT_RESULTS } from "./types";
import { listenToStudentResults, saveStudentResult, saveBulkStudentResults } from "./lib/firestoreDb";

type TabType =
  | "dashboard"
  | "curriculum"
  | "lab"
  | "ai-chat"
  | "exam-tool"
  | "question-bank"
  | "glossary"
  | "formula-library"
  | "stem"
  | "latex-sandbox"
  | "google-drive";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null);
  const [curriculumInitialLesson, setCurriculumInitialLesson] = useState<string | null>(null);
  const [isExamMode, setIsExamMode] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Reset exam mode if tab changes away from exam-tool
  useEffect(() => {
    if (activeTab !== "exam-tool") {
      setIsExamMode(false);
    }
  }, [activeTab]);

  // Reset focus mode if tab changes away from curriculum
  useEffect(() => {
    if (activeTab !== "curriculum") {
      setIsFocusMode(false);
    }
  }, [activeTab]);

  // Auth and student results states
  const [loggedInUser, setLoggedInUser] = useState<{ name: string; className: string; role: "student" | "teacher" } | null>(null);
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);

  // Gamification stats
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(12);
  const [coins, setCoins] = useState(325);

  // Login form states
  const [loginRole, setLoginRole] = useState<"student" | "teacher">("student");
  const [studentNameInput, setStudentNameInput] = useState("");
  const [studentClassInput, setStudentClassInput] = useState("12A1");
  const [customClassInput, setCustomClassInput] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // 1. Subscribe to real-time student results in Firestore
  useEffect(() => {
    const unsubscribe = listenToStudentResults((resultsFromFirestore) => {
      setStudentResults(resultsFromFirestore);
      localStorage.setItem("student_results", JSON.stringify(resultsFromFirestore));
    });
    return () => unsubscribe();
  }, []);

  // 2. Load active session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("logged_in_user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setLoggedInUser(userObj);
      setUserRole(userObj.role);
    }
  }, []);

  // 3. Keep the logged-in student's stats in sync with the studentResults array from Firestore
  useEffect(() => {
    if (loggedInUser && loggedInUser.role === "student" && studentResults.length > 0) {
      const matched = studentResults.find(
        (r) => r.name.toLowerCase() === loggedInUser.name.toLowerCase() && r.className === loggedInUser.className
      );
      if (matched) {
        setXp(matched.xp);
        setLevel(Math.max(1, Math.floor(matched.xp / 800) + 1));
      }
    }
  }, [studentResults, loggedInUser]);

  // Earn XP utility and persist to Firestore
  const handleEarnXP = async (amount: number) => {
    if (!loggedInUser || loggedInUser.role !== "student") return;

    // Find current student record to update
    const currentStudent = studentResults.find(
      (r) => r.name.toLowerCase() === loggedInUser.name.toLowerCase() && r.className === loggedInUser.className
    );

    if (currentStudent) {
      const updatedXp = currentStudent.xp + amount;
      const calculatedGpa = Math.min(10.0, Math.max(currentStudent.score, parseFloat((updatedXp / 280).toFixed(1))));
      const calculatedProgress = Math.min(100, Math.max(currentStudent.progress, Math.floor((updatedXp / 3000) * 100)));
      
      const updatedRecord: StudentResult = {
        ...currentStudent,
        xp: updatedXp,
        score: calculatedGpa,
        progress: calculatedProgress,
        completedQuizzes: currentStudent.completedQuizzes + 1
      };

      // Save to Firestore in background - will trigger onSnapshot update across all devices
      saveStudentResult(updatedRecord).catch((err) => {
        console.error("Failed to save student result to Firestore:", err);
      });

      const nextLevel = Math.max(1, Math.floor(updatedXp / 800) + 1);
      if (nextLevel > level) {
        setCoins((c) => c + 150);
        setTimeout(() => {
          alert(`🎉 Chúc mừng ${loggedInUser.name} đã LÊN CẤP ${nextLevel}! Nhận ngay +150 Coins và hộp quà năng lượng!`);
        }, 100);
      }
    }

    setCoins((c) => c + Math.ceil(amount / 5));
  };

  // Login handler
  const handlePerformLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (loginRole === "student") {
      const trimmedName = studentNameInput.trim();
      const finalClass = studentClassInput === "Khác" ? customClassInput.trim() : studentClassInput;

      if (!trimmedName) {
        setLoginError("Vui lòng nhập họ và tên của học sinh.");
        return;
      }
      if (!finalClass) {
        setLoginError("Vui lòng nhập tên lớp học.");
        return;
      }

      // Register or find student in real-time results from Firestore
      const exists = studentResults.find(
        (r) => r.name.toLowerCase() === trimmedName.toLowerCase() && r.className === finalClass
      );

      let activeRecord: StudentResult;
      if (!exists) {
        const newRecord: StudentResult = {
          name: trimmedName,
          className: finalClass,
          score: 0.0,
          progress: 0,
          completedQuizzes: 0,
          xp: 0
        };
        saveStudentResult(newRecord).catch((err) => {
          console.error("Failed to register new student to Firestore:", err);
        });
        activeRecord = newRecord;
      } else {
        activeRecord = exists;
      }

      // Save user session
      const userSession = { name: activeRecord.name, className: activeRecord.className, role: "student" as const };
      localStorage.setItem("logged_in_user", JSON.stringify(userSession));
      setLoggedInUser(userSession);
      setUserRole("student");
      setXp(activeRecord.xp);
      setLevel(Math.max(1, Math.floor(activeRecord.xp / 800) + 1));
      setActiveTab("dashboard");
    } else {
      // Teacher Login
      const savedPassword = localStorage.getItem("teacher_password") || "gvtamphu";
      if (teacherPassword === savedPassword) {
        const userSession = { name: "Nguyễn Văn Thọ", className: "Quản trị", role: "teacher" as const };
        localStorage.setItem("logged_in_user", JSON.stringify(userSession));
        setLoggedInUser(userSession);
        setUserRole("teacher");
        setActiveTab("dashboard");
      } else {
        setLoginError(`Mật khẩu giáo viên không chính xác! ${savedPassword === "gvtamphu" ? "(Gợi ý: gvtamphu)" : "(Sử dụng mật khẩu mới của bạn)"}`);
      }
    }
  };

  // Logout handler
  const handlePerformLogout = () => {
    localStorage.removeItem("logged_in_user");
    setLoggedInUser(null);
    setUserRole(null);
    setStudentNameInput("");
    setTeacherPassword("");
    setLoginError("");
  };

  // Sidebar link details
  const navLinks = [
    { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "curriculum", label: "Chương trình học", icon: BookOpen },
    { id: "ai-chat", label: "AI Trợ giảng", icon: MessageSquare },
    { id: "exam-tool", label: "Tạo & Khảo thí Đề", icon: FileText },
    { id: "google-drive", label: "Google Drive", icon: Cloud },
  ];

  // Render Login overlay if no loggedInUser is present
  if (!loggedInUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none" style={{
        backgroundImage: "linear-gradient(to right, rgba(14, 165, 233, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 165, 233, 0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }}>
        {/* Floating Grade 12 Physics SVG Illustrations in the background */}
        
        {/* SVG Atom Orbit (Nuclear Physics) - Top Left */}
        <div className="absolute top-10 left-10 md:top-20 md:left-24 w-28 h-28 opacity-20 pointer-events-none hidden sm:block animate-pulse" style={{ animationDuration: "6s" }}>
          <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-600">
            <circle cx="50" cy="50" r="8" className="fill-indigo-500" />
            <circle cx="48" cy="46" r="4" className="fill-pink-500" />
            <circle cx="54" cy="52" r="5" className="fill-blue-500" />
            <ellipse cx="50" cy="50" rx="35" ry="12" className="stroke-indigo-400 stroke-1 fill-none" transform="rotate(30, 50, 50)" />
            <ellipse cx="50" cy="50" rx="35" ry="12" className="stroke-indigo-400 stroke-1 fill-none" transform="rotate(90, 50, 50)" />
            <ellipse cx="50" cy="50" rx="35" ry="12" className="stroke-indigo-400 stroke-1 fill-none" transform="rotate(150, 50, 50)" />
            <circle cx="20" cy="33" r="3" className="fill-cyan-400 animate-bounce" />
            <circle cx="80" cy="67" r="3" className="fill-pink-400 animate-pulse" />
          </svg>
          <span className="text-[9px] font-mono font-bold text-indigo-500 block text-center mt-1">VẬT LÍ HẠT NHÂN</span>
        </div>

        {/* SVG Magnetic Field Lines (Electromagnetism) - Bottom Right */}
        <div className="absolute bottom-10 right-10 md:bottom-20 md:right-24 w-32 h-24 opacity-20 pointer-events-none hidden sm:block animate-pulse" style={{ animationDuration: "8s" }}>
          <svg viewBox="0 0 120 80" className="w-full h-full text-sky-600">
            <rect x="15" y="30" width="30" height="20" rx="3" className="fill-red-500" />
            <text x="25" y="44" className="fill-white text-[10px] font-bold">N</text>
            <rect x="75" y="30" width="30" height="20" rx="3" className="fill-blue-500" />
            <text x="85" y="44" className="fill-white text-[10px] font-bold">S</text>
            
            <path d="M 30 30 C 30 0, 90 0, 90 30" className="stroke-sky-400 stroke-1 stroke-dasharray-[3,3] fill-none" />
            <path d="M 30 50 C 30 80, 90 80, 90 50" className="stroke-sky-400 stroke-1 stroke-dasharray-[3,3] fill-none" />
            <path d="M 30 40 L 90 40" className="stroke-sky-400 stroke-1 stroke-dasharray-[2,2] fill-none" />
          </svg>
          <span className="text-[9px] font-mono font-bold text-sky-500 block text-center mt-1">TỪ TRƯỜNG & CẢM ỨNG</span>
        </div>

        {/* SVG Thermal Gas Container (Thermodynamics) - Bottom Left */}
        <div className="absolute bottom-10 left-10 md:bottom-24 md:left-24 w-28 h-28 opacity-20 pointer-events-none hidden sm:block">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="25" y="20" width="50" height="60" rx="4" className="stroke-amber-500 stroke-2 fill-none" />
            <line x1="25" y1="40" x2="75" y2="40" className="stroke-amber-500/40 stroke-1" />
            {/* Hot moving gas particles */}
            <circle cx="35" cy="55" r="4.5" className="fill-amber-500 animate-ping" />
            <circle cx="45" cy="65" r="4" className="fill-red-500" />
            <circle cx="65" cy="50" r="5" className="fill-orange-400" />
            <circle cx="55" cy="73" r="3.5" className="fill-amber-400" />
          </svg>
          <span className="text-[9px] font-mono font-bold text-amber-600 block text-center mt-1">VẬT LÍ NHIỆT & KHÍ</span>
        </div>

        {/* Decorative ambient backgrounds */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-8 relative z-10 shadow-xl shadow-slate-200/50 flex flex-col gap-6 animate-fade-in">
          {/* Platform Header */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-400/20">
              <GraduationCap className="h-8 w-8 text-white font-black" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-800 tracking-tight uppercase">CỔNG HỌC LIỆU VẬT LÍ 12</h1>
              <span className="text-[10px] font-bold text-slate-500 block mt-1 uppercase tracking-wider">THPT Tam Phú - Phường Tam Bình - TPHCM</span>
            </div>
          </div>

          {/* Role selector tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => {
                setLoginRole("student");
                setLoginError("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                loginRole === "student" 
                  ? "bg-white text-cyan-600 shadow-sm border border-slate-200/40" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <User className="h-4 w-4 text-cyan-500" />
              Học sinh vào học
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginRole("teacher");
                setLoginError("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                loginRole === "teacher" 
                  ? "bg-white text-indigo-600 shadow-sm border border-slate-200/40" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Lock className="h-4 w-4 text-indigo-500" />
              Giáo viên quản trị
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handlePerformLogin} className="space-y-4">
            {loginRole === "student" ? (
              <>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Họ và tên Học sinh</label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập họ và tên đầy đủ của bạn..."
                    value={studentNameInput}
                    onChange={(e) => setStudentNameInput(e.target.value)}
                    className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-4 py-3 text-xs outline-none focus:border-cyan-500 transition-colors shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Chọn Lớp học</label>
                    <select
                      value={studentClassInput}
                      onChange={(e) => setStudentClassInput(e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-4 py-3 text-xs outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                    >
                      <option value="12A1">12A1</option>
                      <option value="12A2">12A2</option>
                      <option value="12A3">12A3</option>
                      <option value="12A4">12A4</option>
                      <option value="Khác">Lớp khác...</option>
                    </select>
                  </div>

                  {studentClassInput === "Khác" ? (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Nhập tên Lớp</label>
                      <input
                        type="text"
                        required
                        placeholder="Nhập lớp (VD: 12A8)..."
                        value={customClassInput}
                        onChange={(e) => setCustomClassInput(e.target.value)}
                        className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-4 py-3 text-xs outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Trường học</label>
                      <input
                        type="text"
                        disabled
                        value="THPT Tam Phú"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-500 rounded-xl px-4 py-3 text-xs outline-none"
                      />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Mật khẩu quản trị</label>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase">Mật khẩu: gvtamphu</span>
                </div>
                <input
                  type="password"
                  required
                  placeholder="Nhập mật khẩu truy cập của Giáo viên..."
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-4 py-3 text-xs outline-none focus:border-cyan-500 transition-colors shadow-inner"
                />
              </div>
            )}

            {loginError && (
              <div className="text-red-600 text-[11px] font-semibold bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                ⚠️ {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer tracking-wider uppercase mt-2 flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="h-4.5 w-4.5" />
              {loginRole === "student" ? "Bắt đầu vào học" : "Đăng nhập hệ thống"}
            </button>
          </form>

          {/* Pedagogy Notice Footer */}
          <div className="text-center text-[9.5px] text-slate-400 leading-normal border-t border-slate-100 pt-4 font-mono uppercase tracking-wider">
            Phòng thí nghiệm lý thuyết & mô phỏng tương tác chuẩn GDPT 2018
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="physics-app" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased select-none selection:bg-cyan-500/30 selection:text-white">
      
      {/* Sidebar navigation */}
      {!isExamMode && !isFocusMode && (
        <aside className="w-full md:w-64 bg-slate-900/40 backdrop-blur-3xl border-b md:border-b-0 md:border-r border-slate-900 flex flex-col shrink-0">
          
          {/* Brand logo branding header */}
          <div className="p-6 border-b border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/10 shrink-0">
              <GraduationCap className="h-6 w-6 text-white font-black" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-black text-slate-900 tracking-wide uppercase font-sans">VẬT LÍ 12</h1>
              <span className="text-[9.5px] font-extrabold text-slate-800 block leading-tight mt-1 brand-teacher-text">GV: Nguyễn Văn Thọ _Trường THPT Tam Phú - Phường Tam Bình - TPHCM</span>
            </div>
          </div>

          {/* Dynamic Sidebar Links */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id as TabType)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "sidebar-btn-active"
                      : "sidebar-btn-inactive"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile Card & Role Picker */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3 shrink-0">
            {/* Logged in User Identity Profile Card */}
            <div className="sidebar-profile-card p-3 rounded-xl flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold ${
                  loggedInUser.role === "teacher" 
                    ? "bg-purple-100 text-purple-700 border border-purple-200" 
                    : "bg-cyan-100 text-cyan-700 border border-cyan-200"
                }`}>
                  {loggedInUser.role === "teacher" ? "GV" : "HS"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="sidebar-profile-name text-[11px] truncate">{loggedInUser.name}</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase">
                    {loggedInUser.role === "teacher" ? "Giáo viên quản trị" : `Lớp ${loggedInUser.className}`}
                  </p>
                </div>
              </div>
              <button
                onClick={handlePerformLogout}
                className="w-full py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-lg text-[9px] font-black uppercase tracking-wider border border-slate-200 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <LogOut className="h-3 w-3" />
                Đăng xuất tài khoản
              </button>
            </div>

            {/* Role selector is strictly restricted: ONLY visible if the logged in account is indeed a TEACHER */}
            {loggedInUser.role === "teacher" && (
              <div className="space-y-1.5">
                <span className="text-[8.5px] font-mono text-slate-500 uppercase font-black tracking-wider block">Chế độ xem giáo viên</span>
                <div className="sidebar-role-container flex p-1 rounded-xl">
                  <button
                    onClick={() => {
                      setUserRole("student");
                      setActiveTab("dashboard");
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      userRole === "student" ? "sidebar-role-btn-active" : "sidebar-role-btn-inactive"
                    }`}
                  >
                    <User className="h-3 w-3" />
                    Học sinh
                  </button>
                  <button
                    onClick={() => {
                      setUserRole("teacher");
                      setActiveTab("dashboard");
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      userRole === "teacher" ? "sidebar-role-btn-active" : "sidebar-role-btn-inactive"
                    }`}
                  >
                    <Users className="h-3 w-3" />
                    Giáo viên
                  </button>
                </div>
              </div>
            )}

            {/* Gamified stats drawer summary - only show for student role view */}
            {userRole === "student" && (
              <div className="sidebar-stats-card p-3 rounded-xl flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <Flame className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
                  <span className="font-mono font-black">{streak} Ngày</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🪙</span>
                  <span className="font-mono font-black">{coins} Xu</span>
                </div>
              </div>
            )}
          </div>

        </aside>
      )}

      {/* Main viewport area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Upper global header */}
        {!isExamMode && !isFocusMode && (
          <header className="p-6 border-b border-slate-900 bg-slate-950/50 backdrop-blur-xl flex justify-between items-center shrink-0">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="text-cyan-400 h-4.5 w-4.5 animate-pulse" />
                Nền tảng Học tập & Khảo thí Vật lí 12
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">Khởi tạo tương lai học liệu số định hướng GDPT mới 2018</p>
            </div>

            {/* Gamification Level indicator and progress bars */}
            {userRole === "student" && (
              <div className="flex items-center gap-4 text-xs">
                <div className="hidden sm:flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold text-slate-400 font-sans">Năng lực Cấp độ {level}</span>
                  <div className="h-1.5 w-28 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                      style={{ width: `${Math.min(100, ((xp % 800) / 800) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">{xp} XP tích lũy</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-extrabold shadow-[0_0_8px_rgba(6,182,212,0.15)] animate-pulse">
                  L{level}
                </div>
              </div>
            )}
          </header>
        )}

        {/* Core dynamic content router viewport */}
        <div className={`p-6 flex-1 ${(isExamMode || isFocusMode) ? "max-w-5xl mx-auto w-full" : ""}`}>
          {activeTab === "dashboard" ? (
            userRole === "student" ? (
              <StudentDashboard 
                onEarnXP={handleEarnXP} 
                studentResults={studentResults}
                loggedInUser={loggedInUser}
                onContinueLearning={(lessonId) => {
                  setCurriculumInitialLesson(lessonId || "l1");
                  setActiveTab("curriculum");
                }}
              />
            ) : (
              <TeacherDashboard 
                studentResults={studentResults}
                onUpdateResults={async (updated) => {
                  await saveBulkStudentResults(updated);
                }}
              />
            )
          ) : activeTab === "curriculum" ? (
            <Curriculum 
              onEarnXP={handleEarnXP} 
              userRole={userRole || "student"} 
              initialLessonId={curriculumInitialLesson}
              onResetInitialLesson={() => setCurriculumInitialLesson(null)}
              loggedInUser={loggedInUser}
              isFocusMode={isFocusMode}
              setIsFocusMode={setIsFocusMode}
            />
          ) : activeTab === "lab" ? (
            <VirtualExperiment onEarnXP={handleEarnXP} />
          ) : activeTab === "ai-chat" ? (
            <AIAssistant onEarnXP={handleEarnXP} />
          ) : activeTab === "exam-tool" ? (
            <ExamManager 
              onEarnXP={handleEarnXP} 
              isExamMode={isExamMode} 
              setIsExamMode={setIsExamMode}
              studentResults={studentResults}
              loggedInUser={loggedInUser}
              onUpdateResults={async (updated) => {
                await saveBulkStudentResults(updated);
              }}
              userRole={userRole}
            />
          ) : activeTab === "question-bank" ? (
            <QuestionBank />
          ) : activeTab === "glossary" ? (
            <Glossary onEarnXP={handleEarnXP} />
          ) : activeTab === "formula-library" ? (
            <FormulaLibrary onEarnXP={handleEarnXP} />
          ) : activeTab === "latex-sandbox" ? (
            <EditorSandbox onEarnXP={handleEarnXP} />
          ) : activeTab === "google-drive" ? (
            <GoogleDriveWorkspace onEarnXP={handleEarnXP} />
          ) : (
            <STEMZone onEarnXP={handleEarnXP} />
          )}
        </div>

        {/* Unified footer */}
        {!isExamMode && (
          <footer className="p-4 border-t border-slate-900 text-center text-[10px] text-slate-500 tracking-wider uppercase font-mono bg-slate-950/20 shrink-0">
            PhysicsAI 12 &copy; 2026 | Developed under modern STEM Pedagogical Standards & GDPT 2018
          </footer>
        )}

      </main>

    </div>
  );
}
