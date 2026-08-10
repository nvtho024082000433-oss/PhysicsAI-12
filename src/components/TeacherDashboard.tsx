import React, { useState, useEffect } from "react";
import {
  Users,
  TrendingUp,
  Sparkles,
  BookOpenCheck,
  AlertCircle,
  Search,
  Download,
  Filter,
  CheckCircle,
  TrendingDown,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  FileSpreadsheet,
  Link2,
  Unlink,
  RefreshCw,
  Plus,
  ExternalLink,
  Database,
  Clock,
  BookOpen,
  ClipboardCheck,
  FlaskConical,
  MessageSquare,
  HelpCircle,
  FileText
} from "lucide-react";
import { initAuth, googleSignIn, getAccessToken } from "../lib/googleDriveAuth";
import { saveGoogleSheetsConfig, removeGoogleSheetsConfig, listenToGoogleSheetsConfig } from "../lib/firestoreDb";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from "recharts";
import { StudentResult, DEFAULT_STUDENT_RESULTS, StudentActivity } from "../types";

interface TeacherDashboardProps {
  studentResults: StudentResult[];
  studentActivities?: StudentActivity[];
  onUpdateResults: (results: StudentResult[]) => void;
  onClearActivities?: () => void;
}

export function TeacherDashboard({ 
  studentResults, 
  studentActivities = [], 
  onUpdateResults,
  onClearActivities
}: TeacherDashboardProps) {
  const [dashboardSubTab, setDashboardSubTab] = useState<"list" | "activities" | "detailed_grades">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("All");
  const [expandedStudentKey, setExpandedStudentKey] = useState<string | null>(null);

  const parseQuizScore = (description: string): string => {
    const match = description.match(/Điểm:\s*([0-9.]+)\/10/i) || description.match(/Điểm:\s*([0-9.]+)/i);
    if (match) {
      return `${match[1]}/10`;
    }
    return "-";
  };

  // Custom confirmation modal states
  const [studentToDelete, setStudentToDelete] = useState<StudentResult | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  // Google Sheets states
  const [googleUser, setGoogleUser] = useState<any>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [sheetId, setSheetId] = useState<string | null>(localStorage.getItem("google_sheets_id"));
  const [sheetUrl, setSheetUrl] = useState<string | null>(localStorage.getItem("google_sheets_url"));
  const [syncingSheet, setSyncingSheet] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState("");
  const [errorMsgSheet, setErrorMsgSheet] = useState("");
  const [manualSheetInput, setManualSheetInput] = useState("");

  // Supabase Integration states
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);
  const [supabaseTableExists, setSupabaseTableExists] = useState(false);
  const [supabaseTableName, setSupabaseTableName] = useState("student_results");
  const [supabaseProjectRef, setSupabaseProjectRef] = useState("guajmfmzkseypwwzcrck");
  const [supabaseSyncing, setSupabaseSyncing] = useState(false);
  const [supabaseStatusMsg, setSupabaseStatusMsg] = useState("");
  const [supabaseError, setSupabaseError] = useState("");
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlHelp, setShowSqlHelp] = useState(false);

  // Fetch Supabase configuration and status on mount
  useEffect(() => {
    const fetchSupabaseStatus = async () => {
      try {
        const res = await fetch("/api/supabase/status");
        if (res.ok) {
          const data = await res.json();
          setSupabaseConfigured(data.configured);
          setSupabaseTableExists(data.tableExists);
          if (data.tableName) {
            setSupabaseTableName(data.tableName);
          }
          if (data.projectRef) {
            setSupabaseProjectRef(data.projectRef);
          }
        }
      } catch (err) {
        console.error("Failed to fetch Supabase status:", err);
      }
    };
    fetchSupabaseStatus();
  }, []);

  const handleSyncToSupabase = async () => {
    setSupabaseSyncing(true);
    setSupabaseStatusMsg("Đang kết nối và đồng bộ dữ liệu lên Supabase...");
    setSupabaseError("");
    try {
      const res = await fetch("/api/supabase/results/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ students: studentResults })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSupabaseTableExists(true);
        setSupabaseStatusMsg(`✨ Đã đồng bộ thành công ${data.count} kết quả học sinh lên Supabase!`);
        setTimeout(() => setSupabaseStatusMsg(""), 4000);
      } else {
        throw new Error(data.error || "Gặp lỗi khi đồng bộ lên Supabase.");
      }
    } catch (err: any) {
      setSupabaseError(err.message || "Không thể đồng bộ dữ liệu lên Supabase.");
      setSupabaseStatusMsg("");
    } finally {
      setSupabaseSyncing(false);
    }
  };

  const handlePullFromSupabase = async () => {
    setSupabaseSyncing(true);
    setSupabaseStatusMsg("Đang tải dữ liệu điểm số mới nhất từ Supabase...");
    setSupabaseError("");
    try {
      const res = await fetch("/api/supabase/results");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          onUpdateResults(data);
          setSupabaseTableExists(true);
          setSupabaseStatusMsg(`✨ Đã tải thành công ${data.length} kết quả từ Supabase và cập nhật hệ thống!`);
          setTimeout(() => setSupabaseStatusMsg(""), 4000);
        } else {
          setSupabaseStatusMsg("Bảng điểm trên Supabase hiện đang trống hoặc chưa có dữ liệu.");
          setTimeout(() => setSupabaseStatusMsg(""), 3000);
        }
      } else {
        const data = await res.json();
        throw new Error(data.error || "Không thể tải dữ liệu.");
      }
    } catch (err: any) {
      setSupabaseError(err.message || "Gặp lỗi trong quá trình tải dữ liệu từ Supabase.");
      setSupabaseStatusMsg("");
    } finally {
      setSupabaseSyncing(false);
    }
  };

  const currentTableName = supabaseTableName || "student_results";
  const isVietnameseTable = currentTableName.startsWith("ket_qua_hoc_tap");
  
  const sqlScript = isVietnameseTable 
    ? `-- Dành cho bảng tiếng Việt '${currentTableName}'
CREATE TABLE IF NOT EXISTS public."${currentTableName}" (
    id TEXT PRIMARY KEY,
    "Họ và tên" TEXT NOT NULL,
    "Lớp" TEXT NOT NULL,
    "Điểm học tập (GPA)" NUMERIC DEFAULT 0,
    "Tiến độ học (%)" NUMERIC DEFAULT 0,
    "Số câu trắc nghiệm đúng" INTEGER DEFAULT 0,
    "Tích lũy XP" INTEGER DEFAULT 0,
    "Cập nhật" TIMESTAMPTZ DEFAULT NOW()
);

-- Kích hoạt tính năng Row Level Security (RLS) để bảo mật dữ liệu
ALTER TABLE public."${currentTableName}" ENABLE ROW LEVEL SECURITY;

-- Tạo các chính sách (Policies) để cho phép đọc/ghi tự do bằng Anon Key (Publishable Key)
CREATE POLICY "Allow public select" ON public."${currentTableName}" FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public."${currentTableName}" FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public."${currentTableName}" FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete" ON public."${currentTableName}" FOR DELETE USING (true);`
    : `CREATE TABLE IF NOT EXISTS public."${currentTableName}" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    class_name TEXT NOT NULL,
    score NUMERIC DEFAULT 0,
    progress NUMERIC DEFAULT 0,
    completed_quizzes INTEGER DEFAULT 0,
    xp INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public."${currentTableName}" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public."${currentTableName}" FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public."${currentTableName}" FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public."${currentTableName}" FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete" ON public."${currentTableName}" FOR DELETE USING (true);`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  // Listen to Google Sheets config changes from Firestore
  useEffect(() => {
    const unsubscribe = listenToGoogleSheetsConfig((config) => {
      if (config) {
        setSheetId(config.sheetId);
        setSheetUrl(config.sheetUrl);
      } else {
        setSheetId(null);
        setSheetUrl(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Hook up auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setGoogleUser(currentUser);
        setGoogleToken(currentToken);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setErrorMsgSheet("");
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleToken(result.accessToken);
        setGoogleUser(result.user);
        setSyncStatusMsg("Đã liên kết tài khoản Google thành công!");
        setTimeout(() => setSyncStatusMsg(""), 3000);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsgSheet(err.message || "Không thể kết nối Google Account.");
    }
  };

  const handleCreateNewSheet = async () => {
    if (!googleToken) {
      setErrorMsgSheet("Vui lòng kết nối tài khoản Google trước.");
      return;
    }
    setSyncingSheet(true);
    setErrorMsgSheet("");

    if (googleToken === "sandbox_token") {
      setSyncStatusMsg("Đang giả lập tạo Bảng tính mới trên Sandbox...");
      setTimeout(() => {
        const mockId = "sandbox_spreadsheet_id_123";
        const mockUrl = "#sandbox-sheets";
        setSheetId(mockId);
        setSheetUrl(mockUrl);
        saveGoogleSheetsConfig(mockId, mockUrl);
        setSyncStatusMsg("Đã tạo bảng tính giả lập thành công trên Sandbox!");
        setSyncingSheet(false);
        setTimeout(() => setSyncStatusMsg(""), 3000);
      }, 1000);
      return;
    }

    setSyncStatusMsg("Đang tạo Bảng tính mới...");

    try {
      const response = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${googleToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            title: `Kết Quả Học Tập Vật Lí 12 - THPT Tam Phú (${new Date().toLocaleDateString("vi-VN")})`,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Lỗi tạo bảng tính: ${response.statusText}`);
      }

      const data = await response.json();
      const newSheetId = data.spreadsheetId;
      const newSheetUrl = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${newSheetId}/edit`;

      setSheetId(newSheetId);
      setSheetUrl(newSheetUrl);
      saveGoogleSheetsConfig(newSheetId, newSheetUrl);

      setSyncStatusMsg("Đang đồng bộ dữ liệu...");
      await syncDataToSheet(newSheetId, googleToken);
    } catch (err: any) {
      console.error(err);
      setErrorMsgSheet(err.message || "Gặp lỗi trong quá trình tạo bảng tính mới.");
    } finally {
      setSyncingSheet(false);
    }
  };

  const handleLinkExistingSheet = async () => {
    if (!manualSheetInput.trim()) {
      setErrorMsgSheet("Vui lòng nhập Link hoặc ID Bảng tính.");
      return;
    }
    setErrorMsgSheet("");

    let extractedId = manualSheetInput.trim();
    const sheetIdMatch = manualSheetInput.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (sheetIdMatch && sheetIdMatch[1]) {
      extractedId = sheetIdMatch[1];
    }

    const linkedUrl = `https://docs.google.com/spreadsheets/d/${extractedId}/edit`;

    setSheetId(extractedId);
    setSheetUrl(linkedUrl);
    saveGoogleSheetsConfig(extractedId, linkedUrl);
    setManualSheetInput("");
    setSyncStatusMsg("Đã liên kết bảng tính thành công!");
    setTimeout(() => setSyncStatusMsg(""), 3000);
  };

  const syncDataToSheet = async (targetSheetId: string, tokenToUse: string) => {
    setErrorMsgSheet("");
    setSyncingSheet(true);

    if (tokenToUse === "sandbox_token") {
      setSyncStatusMsg("Đang giả lập đồng bộ dữ liệu học sinh lên Sandbox Google Sheet...");
      setTimeout(() => {
        setSyncStatusMsg("Đồng bộ giả lập thành công! (Chế độ offline)");
        setSyncingSheet(false);
        setTimeout(() => setSyncStatusMsg(""), 4000);
      }, 1200);
      return;
    }

    setSyncStatusMsg("Đang cập nhật dữ liệu bảng tính...");

    try {
      const headers = ["Họ và Tên", "Lớp", "Điểm số trung bình (GPA)", "Tiến độ học tập (%)", "Số bài thi đã làm", "Tổng XP tích lũy", "Đánh giá học lực"];
      const rows = studentResults.map((s) => {
        let rating = "Yếu/Kém";
        if (s.score >= 8.5) rating = "Giỏi";
        else if (s.score >= 6.5) rating = "Khá";
        else if (s.score >= 5.0) rating = "Trung bình";
        
        return [
          s.name,
          s.className,
          s.score,
          `${s.progress}%`,
          s.completedQuizzes,
          s.xp,
          rating
        ];
      });

      const values = [headers, ...rows];
      const range = "A1:G100";

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${targetSheetId}/values/${encodeURIComponent(range)}?valueInputOption=RAW`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokenToUse}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          range: range,
          majorDimension: "ROWS",
          values: values,
        }),
      });

      if (!response.ok) {
        throw new Error(`Không thể ghi dữ liệu: ${response.statusText}`);
      }

      setSyncStatusMsg("Đồng bộ dữ liệu học sinh thành công!");
      setTimeout(() => setSyncStatusMsg(""), 4000);
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message || "Lỗi ghi dữ liệu lên Google Sheets. Đảm bảo bạn đã bật quyền chỉnh sửa file.");
    } finally {
      setSyncingSheet(false);
    }
  };

  const handleUnlinkSheet = () => {
    if (window.confirm("Bạn có chắc muốn hủy liên kết Bảng tính hiện tại không? Dữ liệu trên Google Sheet vẫn sẽ được giữ nguyên.")) {
      setSheetId(null);
      setSheetUrl(null);
      removeGoogleSheetsConfig();
      setSyncStatusMsg("Đã hủy liên kết bảng tính.");
      setTimeout(() => setSyncStatusMsg(""), 3000);
    }
  };

  // Password fields state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sync back to localStorage via parent handler
  const saveResults = (newResults: StudentResult[]) => {
    onUpdateResults(newResults);
  };

  // Reset helper if teacher wants to reset defaults
  const handleResetData = () => {
    setShowResetConfirm(true);
  };

  const handleConfirmReset = () => {
    saveResults(DEFAULT_STUDENT_RESULTS);
    if (onClearActivities) {
      onClearActivities();
    }
    setShowResetConfirm(false);
  };

  // Delete student click handler
  const handleDeleteStudentClick = (student: StudentResult) => {
    setStudentToDelete(student);
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      const updated = studentResults.filter(
        (s) => !(s.name === studentToDelete.name && s.className === studentToDelete.className)
      );
      saveResults(updated);
      setStudentToDelete(null);
    }
  };

  // Change password handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("Vui lòng nhập đầy đủ các thông tin đổi mật khẩu!");
      return;
    }

    let savedPassword = localStorage.getItem("teacher_password") || "Tho*121369879#";
    if (savedPassword === "gvtamphu") {
      savedPassword = "Tho*121369879#";
      localStorage.setItem("teacher_password", "Tho*121369879#");
    }

    if (oldPassword !== savedPassword && oldPassword !== "Tho*121369879#") {
      setPasswordError("Mật khẩu cũ nhập vào không chính xác!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Hai lần nhập mật khẩu mới không trùng khớp!");
      return;
    }

    if (newPassword.length < 4) {
      setPasswordError("Mật khẩu mới phải từ 4 kí tự trở lên!");
      return;
    }

    localStorage.setItem("teacher_password", newPassword);
    setPasswordSuccess("Đổi mật khẩu giáo viên thành công!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Extract unique classes
  const classes = ["All", ...Array.from(new Set(studentResults.map((s) => s.className))).sort()];

  // Filter students
  const filteredStudents = studentResults.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "All" || student.className === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Calculate dynamic metrics
  const totalStudents = filteredStudents.length;
  
  const averageGpa = totalStudents > 0 
    ? filteredStudents.reduce((acc, curr) => acc + curr.score, 0) / totalStudents 
    : 0;

  const underperformingStudents = filteredStudents.filter((s) => s.score < 6.5);
  const underperformingCount = underperformingStudents.length;

  const totalXpEarned = filteredStudents.reduce((acc, curr) => acc + curr.xp, 0);

  // Calculate score distribution dynamically
  const count0_2 = filteredStudents.filter((s) => s.score >= 0 && s.score < 3).length;
  const count3_4 = filteredStudents.filter((s) => s.score >= 3 && s.score < 5).length;
  const count5_6 = filteredStudents.filter((s) => s.score >= 5 && s.score < 7).length;
  const count7_8 = filteredStudents.filter((s) => s.score >= 7 && s.score < 9).length;
  const count9_10 = filteredStudents.filter((s) => s.score >= 9 && s.score <= 10).length;

  const distributionData = [
    { range: "0-2đ", level: "Yếu", count: count0_2, color: "#f43f5e", students: filteredStudents.filter((s) => s.score >= 0 && s.score < 3).map((s) => s.name).join(", ") },
    { range: "3-4đ", level: "Yếu/Kém", count: count3_4, color: "#f59e0b", students: filteredStudents.filter((s) => s.score >= 3 && s.score < 5).map((s) => s.name).join(", ") },
    { range: "5-6đ", level: "Trung bình", count: count5_6, color: "#3b82f6", students: filteredStudents.filter((s) => s.score >= 5 && s.score < 7).map((s) => s.name).join(", ") },
    { range: "7-8đ", level: "Khá", count: count7_8, color: "#10b981", students: filteredStudents.filter((s) => s.score >= 7 && s.score < 9).map((s) => s.name).join(", ") },
    { range: "9-10đ", level: "Giỏi", count: count9_10, color: "#8b5cf6", students: filteredStudents.filter((s) => s.score >= 9 && s.score <= 10).map((s) => s.name).join(", ") },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-white text-[11px] font-sans shadow-lg max-w-[220px]">
          <p className="font-black text-cyan-400">Khung điểm {data.range}</p>
          <p className="font-semibold text-slate-300">Xếp loại: {data.level}</p>
          <p className="font-extrabold text-sm text-emerald-400 mt-1">{data.count} học sinh</p>
          {data.students ? (
            <p className="text-slate-400 text-[10px] mt-1 italic border-t border-slate-800 pt-1 leading-normal">
              Danh sách: {data.students}
            </p>
          ) : (
            <p className="text-slate-500 text-[10px] mt-1 italic border-t border-slate-800 pt-1">
              Không có học sinh nào
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Export to Excel / CSV
  const handleExportCSV = () => {
    const BOM = "\uFEFF";
    let csvContent = BOM;

    if (dashboardSubTab === "detailed_grades") {
      csvContent += "Họ và tên,Lớp,Bài học / Hoạt động,Điểm số bài làm,Thời gian,Điểm trung bình (GPA)\n";
      filteredActivities.forEach((act) => {
        let scoreText = "-";
        if (act.activityType === "quiz") {
          scoreText = parseQuizScore(act.description);
        } else if (act.activityType === "virtual_lab") {
          scoreText = "Thí nghiệm";
        } else {
          scoreText = "Hoàn thành";
        }

        let formattedTime = "";
        try {
          const d = new Date(act.timestamp);
          const hrs = d.getHours().toString().padStart(2, "0");
          const mins = d.getMinutes().toString().padStart(2, "0");
          const date = d.getDate().toString().padStart(2, "0");
          const month = (d.getMonth() + 1).toString().padStart(2, "0");
          const year = d.getFullYear();
          formattedTime = `${hrs}:${mins} - ${date}/${month}/${year}`;
        } catch (e) {
          formattedTime = act.timestamp;
        }

        const studentRecord = studentResults.find(
          (s) =>
            s.name.trim().toLowerCase() === act.studentName.trim().toLowerCase() &&
            s.className.trim().toUpperCase() === act.className.trim().toUpperCase()
        );
        const gpa = studentRecord ? studentRecord.score.toFixed(1) : "0.0";

        csvContent += `"${act.studentName}","${act.className}","${act.description}","${scoreText}","${formattedTime}",${gpa}\n`;
      });

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const fileName = selectedClass === "All"
        ? "Bang_Diem_Chi_Tiet_Vat_Li_12_Tat_Ca.csv"
        : `Bang_Diem_Chi_Tiet_Vat_Li_12_Lop_${selectedClass}.csv`;

      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
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
    }
  };

  // Export entire student results dataset from studentResults prop to CSV
  const exportToCSV = () => {
    const BOM = "\uFEFF";
    let csvContent = BOM;
    csvContent += "Họ và tên,Lớp,Điểm học tập (GPA),Tiến độ học (%),Tích lũy XP,Số câu trắc nghiệm đúng\n";

    studentResults.forEach((s) => {
      csvContent += `"${s.name}","${s.className}",${s.score.toFixed(1)},${s.progress}%,${s.xp},${s.completedQuizzes}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Bao_Cao_Diem_So_Vat_Li_12_Toan_Bo.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download entire student results dataset from localStorage as a JSON file
  const handleDownloadReport = () => {
    const rawData = localStorage.getItem("student_results");
    let dataset = studentResults;
    if (rawData) {
      try {
        dataset = JSON.parse(rawData);
      } catch (err) {
        console.error("Lỗi parse dữ liệu học sinh từ localStorage:", err);
      }
    }

    const jsonContent = JSON.stringify(dataset, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Bao_Cao_Ket_Qua_Hoc_Sinh_Full.json");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Lọc lịch sử hoạt động theo bộ lọc lớp và từ khóa tìm kiếm giống như danh sách học sinh
  const filteredActivities = (studentActivities || []).filter((act) => {
    if (selectedClass !== "All") {
      const actClassNorm = act.className.trim().toUpperCase();
      const selectedClassNorm = selectedClass.trim().toUpperCase();
      if (actClassNorm !== selectedClassNorm && !actClassNorm.endsWith(selectedClassNorm)) {
        return false;
      }
    }
    if (searchTerm) {
      const termNorm = searchTerm.trim().toLowerCase();
      const studentNameNorm = act.studentName.trim().toLowerCase();
      const descNorm = act.description.trim().toLowerCase();
      return studentNameNorm.includes(termNorm) || descNorm.includes(termNorm);
    }
    return true;
  });

  // Lấy chi tiết lịch sử hoạt động/luyện tập của một học sinh cụ thể
  const getStudentActivities = (name: string, className: string) => {
    return (studentActivities || []).filter(
      (act) =>
        act.studentName.trim().toLowerCase() === name.trim().toLowerCase() &&
        act.className.trim().toUpperCase() === className.trim().toUpperCase()
    );
  };

  return (
    <div className="grid grid-cols-12 gap-6 animate-fade-in">
      
      {/* Metrics Row */}
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="block-3d-sky no-override no-override-bg rounded-2xl p-4">
          <span className="text-[10px] text-sky-900 uppercase font-extrabold tracking-wider block">Sĩ số bộ lọc</span>
          <div className="flex items-center gap-3 mt-1.5">
            <Users className="h-5 w-5 text-sky-700" />
            <span className="text-3xl font-black text-sky-950">{totalStudents}</span>
            <span className="text-[10.5px] text-sky-900 font-mono font-bold">Học sinh</span>
          </div>
        </div>

        <div className="block-3d-amber no-override no-override-bg rounded-2xl p-4">
          <span className="text-[10px] text-amber-900 uppercase font-extrabold tracking-wider block">Điểm Trung bình Lớp</span>
          <div className="flex items-center gap-3 mt-1.5">
            <TrendingUp className="h-5 w-5 text-amber-700" />
            <span className="text-3xl font-black text-amber-950">{averageGpa.toFixed(2)} / 10</span>
            <span className="text-[10.5px] text-amber-950 font-extrabold bg-amber-200 border border-amber-300 px-2 py-0.5 rounded-full">Khá Tốt</span>
          </div>
        </div>

        <div className="block-3d-emerald no-override no-override-bg rounded-2xl p-4">
          <span className="text-[10px] text-emerald-900 uppercase font-extrabold tracking-wider block">Tổng tích lũy lớp</span>
          <div className="flex items-center gap-3 mt-1.5">
            <BookOpenCheck className="h-5 w-5 text-emerald-700" />
            <span className="text-3xl font-black text-emerald-950">{totalXpEarned.toLocaleString()}</span>
            <span className="text-[10.5px] text-emerald-900 font-mono font-bold">XP</span>
          </div>
        </div>

        <div className="block-3d-rose no-override no-override-bg rounded-2xl p-4">
          <span className="text-[10px] text-red-900 uppercase font-extrabold tracking-wider block">Cần hỗ trợ (GPA &lt; 6.5)</span>
          <div className="flex items-center gap-3 mt-1.5">
            <AlertCircle className="h-5 w-5 text-red-700" />
            <span className="text-3xl font-black text-red-950">{underperformingCount} em</span>
            <span className={`text-[10.5px] px-2 py-0.5 rounded-full font-extrabold border ${
              underperformingCount > 0 ? "bg-red-200 text-red-950 border-red-300" : "bg-emerald-200 text-emerald-950 border-emerald-300"
            }`}>
              {underperformingCount > 0 ? "Cần hỗ trợ" : "Ổn định"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Column: Class List */}
      <div className="col-span-12 lg:col-span-7 block-3d-slate no-override no-override-bg rounded-3xl p-6 flex flex-col h-[520px]">
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-slate-300 pb-4 mb-4">
          <div>
            <h3 className="text-sm font-black text-slate-950">Bảng Thống kê Kết quả Học tập Học sinh</h3>
            <p className="text-[11px] text-slate-800 font-bold mt-0.5">
              {selectedClass === "All" ? "Danh sách tất cả các lớp Vật Lí 12" : `Danh sách học sinh lớp Vật Lí 12 - Lớp ${selectedClass}`}
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-slate-600">
                <Search className="h-3 w-3" />
              </span>
              <input
                type="text"
                placeholder="Tìm học sinh..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border-2 border-slate-300 text-slate-900 font-bold text-[10.5px] rounded-lg pl-7 pr-2.5 py-1.5 outline-none focus:border-cyan-600 w-full md:w-36 transition-colors"
              />
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-[10px] transition-colors cursor-pointer shrink-0 border-none shadow-sm"
              title="Xuất toàn bộ kết quả học sinh thành file CSV"
            >
              <FileSpreadsheet className="h-3 w-3" />
              Xuất báo cáo
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-xl text-[10px] transition-colors cursor-pointer shrink-0 border-none shadow-sm"
              title="Xuất kết quả học sinh sau khi đã chọn bộ lọc lớp hoặc tìm kiếm"
            >
              <Download className="h-3 w-3" />
              Xuất dữ liệu lọc
            </button>
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-black rounded-xl text-[10px] transition-colors cursor-pointer shrink-0 border-none shadow-sm"
              title="Tải toàn bộ kết quả học sinh (JSON)"
            >
              <Download className="h-3 w-3" />
              Báo cáo JSON
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-between items-end border-b border-slate-300 mb-4 shrink-0">
          <div className="flex gap-4">
            <button
              onClick={() => setDashboardSubTab("list")}
              className={`pb-2 text-xs font-black uppercase tracking-wider transition-all border-t-0 border-l-0 border-r-0 border-b-2 cursor-pointer bg-transparent ${
                dashboardSubTab === "list"
                  ? "border-cyan-600 text-cyan-700 font-extrabold"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                Danh sách học viên
              </div>
            </button>
            <button
              onClick={() => setDashboardSubTab("detailed_grades")}
              className={`pb-2 text-xs font-black uppercase tracking-wider transition-all border-t-0 border-l-0 border-r-0 border-b-2 cursor-pointer bg-transparent ${
                dashboardSubTab === "detailed_grades"
                  ? "border-cyan-600 text-cyan-700 font-extrabold"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <FileSpreadsheet className="h-3.5 w-3.5" />
                Bảng kết quả luyện tập
              </div>
            </button>
            <button
              onClick={() => setDashboardSubTab("activities")}
              className={`pb-2 text-xs font-black uppercase tracking-wider transition-all border-t-0 border-l-0 border-r-0 border-b-2 cursor-pointer bg-transparent ${
                dashboardSubTab === "activities"
                  ? "border-cyan-600 text-cyan-700 font-extrabold"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Lịch sử hoạt động
                {filteredActivities.length > 0 && (
                  <span className="bg-cyan-100 text-cyan-800 px-1.5 py-0.5 rounded-full text-[9px] font-black ml-1">
                    {filteredActivities.length}
                  </span>
                )}
              </div>
            </button>
          </div>

          {(dashboardSubTab === "activities" || dashboardSubTab === "detailed_grades") && onClearActivities && (
            <button
              onClick={() => {
                if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử luyện tập của học sinh? Hành động này sẽ không thể khôi phục.")) {
                  onClearActivities();
                }
              }}
              className="pb-2 text-xs font-black uppercase tracking-wider text-rose-600 hover:text-rose-800 flex items-center gap-1.5 border-none bg-transparent cursor-pointer transition-colors"
              title="Xóa toàn bộ lịch sử luyện tập và lưu trữ"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Xóa lịch sử hoạt động
            </button>
          )}
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4 shrink-0">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter className="h-3 w-3" /> Bộ lọc lớp:
          </span>
          {classes.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer border-2 ${
                selectedClass === cls
                  ? "bg-cyan-100 text-cyan-800 border-cyan-400 shadow-sm"
                  : "bg-white text-slate-700 border-slate-300 hover:text-slate-950 hover:bg-slate-100"
              }`}
            >
              {cls === "All" ? "Tất cả lớp" : `Lớp ${cls}`}
            </button>
          ))}
        </div>

        {dashboardSubTab === "list" ? (
          /* Student list container */
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-slate-950 border-b-2 border-slate-300 pb-2 font-black uppercase text-[10px] tracking-wider">
                  <th className="font-black pb-2 text-slate-950">Tên học sinh</th>
                  <th className="font-black pb-2 text-slate-950">Lớp</th>
                  <th className="font-black pb-2 text-slate-950">Tiến độ (%)</th>
                  <th className="font-black pb-2 text-center text-slate-950">Điểm trung bình (GPA)</th>
                  <th className="font-black pb-2 text-right text-slate-950">Tích lũy XP</th>
                  <th className="font-black pb-2 text-slate-950 hidden md:table-cell">Ngày giờ làm bài (Mới nhất)</th>
                  <th className="font-black pb-2 text-center text-slate-950 hidden md:table-cell">Điểm của từng bài</th>
                  <th className="font-black pb-2 text-right text-slate-950">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, idx) => {
                    const studentKey = `${student.name}_${student.className}`;
                    const isExpanded = expandedStudentKey === studentKey;
                    const studentIndividualActs = getStudentActivities(student.name, student.className);
                    const latestAct = studentIndividualActs[0];

                    const quizScores = studentIndividualActs
                      .filter(act => act.activityType === "quiz")
                      .map(act => parseQuizScore(act.description))
                      .filter(score => score !== "-");

                    let latestPracticeTime = "Chưa luyện tập";
                    if (latestAct) {
                      try {
                        const d = new Date(latestAct.timestamp);
                        const hrs = d.getHours().toString().padStart(2, "0");
                        const mins = d.getMinutes().toString().padStart(2, "0");
                        const date = d.getDate().toString().padStart(2, "0");
                        const month = (d.getMonth() + 1).toString().padStart(2, "0");
                        latestPracticeTime = `${hrs}:${mins} - ${date}/${month}`;
                      } catch (e) {
                        latestPracticeTime = latestAct.timestamp;
                      }
                    }

                    return (
                      <React.Fragment key={studentKey}>
                        <tr 
                          onClick={() => setExpandedStudentKey(isExpanded ? null : studentKey)}
                          className="hover:bg-slate-100/60 cursor-pointer transition-colors"
                        >
                          <td className="py-2.5 font-bold text-slate-900">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-slate-400">
                                {isExpanded ? "▼" : "▶"}
                              </span>
                              {student.name}
                            </div>
                          </td>
                          <td className="py-2.5 text-slate-900 font-mono font-bold">12{student.className.replace("12", "")}</td>
                          <td className="py-2.5">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-500" style={{ width: `${student.progress}%` }}></div>
                              </div>
                              <span className="text-[10.5px] text-slate-950 font-mono font-bold">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="py-2.5 text-center font-mono font-extrabold text-amber-900">
                            {student.score.toFixed(1)} / 10
                          </td>
                          <td className="py-2.5 text-right font-mono font-extrabold text-sky-900">
                            {student.xp.toLocaleString()} XP
                          </td>
                          <td className="py-2.5 hidden md:table-cell font-medium text-slate-600">
                            {latestPracticeTime}
                          </td>
                          <td className="py-2.5 text-center hidden md:table-cell" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-wrap gap-1 justify-center max-w-[160px] mx-auto">
                              {quizScores.length > 0 ? (
                                quizScores.slice(0, 3).map((scoreVal, sIdx) => (
                                  <span 
                                    key={sIdx}
                                    className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-black text-[9.5px]"
                                    title="Điểm một bài luyện tập"
                                  >
                                    {scoreVal}
                                  </span>
                                ))
                              ) : (
                                <span className="text-slate-400 italic text-[10px]">Chưa làm bài</span>
                              )}
                              {quizScores.length > 3 && (
                                <span className="text-[9.5px] text-slate-500 font-extrabold ml-0.5">+{quizScores.length - 3}</span>
                              )}
                            </div>
                          </td>
                          <td className="py-2.5 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleDeleteStudentClick(student)}
                              className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 border-2 border-red-400 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer inline-flex items-center gap-1 shadow-sm"
                              title="Xoá học viên"
                            >
                              <Trash2 className="h-3 w-3" />
                              Xoá
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr>
                            <td colSpan={8} className="p-4 bg-slate-50 border-t border-b border-slate-200">
                              <div className="space-y-3 pl-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-black uppercase text-slate-900 flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-cyan-600" />
                                    Chi tiết lịch sử luyện tập của {student.name} ({student.className})
                                  </h4>
                                  <span className="text-[10px] font-mono text-slate-500 font-bold bg-slate-200/70 px-2 py-0.5 rounded-full">
                                    Tổng số: {studentIndividualActs.length} hoạt động
                                  </span>
                                </div>
                                
                                {studentIndividualActs.length > 0 ? (
                                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm max-h-[300px] overflow-y-auto custom-scrollbar">
                                    <table className="w-full text-left border-collapse text-[11px]">
                                      <thead>
                                        <tr className="bg-slate-100/80 text-slate-700 font-black uppercase text-[9px] tracking-wider border-b border-slate-200">
                                          <th className="p-2 pl-3">Thời gian</th>
                                          <th className="p-2">Bài luyện tập / Hoạt động</th>
                                          <th className="p-2 text-center">Điểm luyện tập</th>
                                          <th className="p-2 text-right pr-3">XP đạt được</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-150">
                                        {studentIndividualActs.map((act) => {
                                          let scoreText = "-";
                                          if (act.activityType === "quiz") {
                                            scoreText = parseQuizScore(act.description);
                                          } else if (act.activityType === "virtual_lab") {
                                            scoreText = "Thí nghiệm";
                                          } else {
                                            scoreText = "Hoàn thành";
                                          }

                                          let formattedTime = "";
                                          try {
                                            const d = new Date(act.timestamp);
                                            const hrs = d.getHours().toString().padStart(2, "0");
                                            const mins = d.getMinutes().toString().padStart(2, "0");
                                            const date = d.getDate().toString().padStart(2, "0");
                                            const month = (d.getMonth() + 1).toString().padStart(2, "0");
                                            const year = d.getFullYear();
                                            formattedTime = `${hrs}:${mins} - ${date}/${month}/${year}`;
                                          } catch (e) {
                                            formattedTime = act.timestamp;
                                          }

                                          return (
                                            <tr key={act.id} className="hover:bg-slate-50/50">
                                              <td className="p-2 pl-3 font-mono text-slate-500">{formattedTime}</td>
                                              <td className="p-2 text-slate-900 font-medium">{act.description}</td>
                                              <td className="p-2 text-center">
                                                <span className={`px-1.5 py-0.5 rounded font-bold text-[10.5px] ${
                                                  act.activityType === "quiz"
                                                    ? scoreText.includes("10") || scoreText.includes("9") || scoreText.includes("8")
                                                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                      : "bg-amber-50 text-amber-700 border border-amber-200"
                                                    : "bg-slate-100 text-slate-600 border border-slate-200"
                                                }`}>
                                                  {scoreText}
                                                </span>
                                              </td>
                                              <td className="p-2 text-right pr-3 font-mono font-extrabold text-emerald-600">
                                                +{act.xpGained} XP
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                ) : (
                                  <div className="text-center py-6 bg-white border border-slate-200 rounded-xl">
                                    <p className="text-[10.5px] text-slate-500 font-bold">Chưa có lịch sử luyện tập chi tiết cho học sinh này.</p>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-slate-800 font-mono font-bold">
                      Không tìm thấy học sinh nào trong bộ lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : dashboardSubTab === "activities" ? (
          /* Student Activity History Timeline */
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar">
            {filteredActivities.length > 0 ? (
              <div className="relative pl-4 border-l-2 border-slate-300 ml-2.5 space-y-4 py-1.5">
                {filteredActivities.map((act) => {
                  let IconComponent = HelpCircle;
                  let iconColor = "text-slate-600 bg-slate-100 border-slate-300";
                  
                  switch (act.activityType) {
                    case "quiz":
                      IconComponent = ClipboardCheck;
                      iconColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
                      break;
                    case "virtual_lab":
                      IconComponent = FlaskConical;
                      iconColor = "text-purple-700 bg-purple-50 border-purple-200";
                      break;
                    case "ai_chat":
                      IconComponent = MessageSquare;
                      iconColor = "text-cyan-700 bg-cyan-50 border-cyan-200";
                      break;
                    case "glossary":
                      IconComponent = BookOpen;
                      iconColor = "text-sky-700 bg-sky-50 border-sky-200";
                      break;
                    case "formula_library":
                      IconComponent = FileText;
                      iconColor = "text-amber-700 bg-amber-50 border-amber-200";
                      break;
                    case "latex_sandbox":
                      IconComponent = FileText;
                      iconColor = "text-blue-700 bg-blue-50 border-blue-200";
                      break;
                    case "google_drive":
                      IconComponent = FileSpreadsheet;
                      iconColor = "text-green-700 bg-green-50 border-green-200";
                      break;
                    case "stem_zone":
                      IconComponent = Sparkles;
                      iconColor = "text-indigo-700 bg-indigo-50 border-indigo-200";
                      break;
                    default:
                      IconComponent = BookOpen;
                      iconColor = "text-slate-700 bg-slate-50 border-slate-200";
                  }

                  let formattedTime = "";
                  try {
                    const d = new Date(act.timestamp);
                    const hrs = d.getHours().toString().padStart(2, "0");
                    const mins = d.getMinutes().toString().padStart(2, "0");
                    const date = d.getDate().toString().padStart(2, "0");
                    const month = (d.getMonth() + 1).toString().padStart(2, "0");
                    formattedTime = `${hrs}:${mins} - ${date}/${month}`;
                  } catch (e) {
                    formattedTime = act.timestamp;
                  }

                  return (
                    <div key={act.id} className="relative group animate-fade-in">
                      <span className="absolute -left-[24.5px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border border-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 group-hover:bg-cyan-600 transition-colors"></span>
                      </span>

                      <div className="bg-white hover:bg-slate-50/60 border-2 border-slate-200 hover:border-slate-300 rounded-xl p-3 shadow-sm transition-all flex items-start gap-3">
                        <div className={`p-1.5 rounded-lg border flex items-center justify-center shrink-0 ${iconColor}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-black text-slate-900 truncate">
                              {act.studentName}
                            </span>
                            <span className="text-[9px] font-mono text-slate-500 shrink-0 font-bold">
                              {formattedTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[9px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded font-mono font-black shrink-0">
                              12{act.className.replace("12", "")}
                            </span>
                            <span className="text-[10px] text-slate-600 font-medium truncate">
                              {act.description}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-mono font-black text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded-md">
                            +{act.xpGained} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <Clock className="h-8 w-8 text-slate-300 mb-2 stroke-[1.5]" />
                <p className="text-[11px] text-slate-500 font-bold">Chưa ghi nhận lịch sử hoạt động nào của học sinh trong nhóm lọc này.</p>
                <p className="text-[9.5px] text-slate-400 mt-1">Các hoạt động làm bài kiểm tra, thực hành thí nghiệm ảo của học sinh sẽ tự động hiển thị tại đây.</p>
              </div>
            )}
          </div>
        ) : (
          /* Detailed Results Table */
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-slate-950 border-b-2 border-slate-300 pb-2 font-black uppercase text-[10px] tracking-wider">
                  <th className="font-black pb-2 text-slate-950">Họ và tên</th>
                  <th className="font-black pb-2 text-slate-950">Lớp</th>
                  <th className="font-black pb-2 text-slate-950">Bài học / Hoạt động</th>
                  <th className="font-black pb-2 text-center text-slate-950">Điểm số bài làm</th>
                  <th className="font-black pb-2 text-slate-950 hidden md:table-cell">Thời gian</th>
                  <th className="font-black pb-2 text-right text-slate-950">Điểm trung bình (GPA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((act) => {
                    let scoreText = "-";
                    if (act.activityType === "quiz") {
                      scoreText = parseQuizScore(act.description);
                    } else if (act.activityType === "virtual_lab") {
                      scoreText = "Thí nghiệm";
                    } else {
                      scoreText = "Hoàn thành";
                    }

                    let formattedTime = "";
                    try {
                      const d = new Date(act.timestamp);
                      const hrs = d.getHours().toString().padStart(2, "0");
                      const mins = d.getMinutes().toString().padStart(2, "0");
                      const date = d.getDate().toString().padStart(2, "0");
                      const month = (d.getMonth() + 1).toString().padStart(2, "0");
                      const year = d.getFullYear();
                      formattedTime = `${hrs}:${mins} - ${date}/${month}/${year}`;
                    } catch (e) {
                      formattedTime = act.timestamp;
                    }

                    const studentRecord = studentResults.find(
                      (s) =>
                        s.name.trim().toLowerCase() === act.studentName.trim().toLowerCase() &&
                        s.className.trim().toUpperCase() === act.className.trim().toUpperCase()
                    );
                    const gpa = studentRecord ? studentRecord.score.toFixed(1) : "0.0";

                    return (
                      <tr key={act.id} className="hover:bg-slate-50/50">
                        <td className="py-2.5 font-bold text-slate-900">{act.studentName}</td>
                        <td className="py-2.5 text-slate-900 font-mono font-bold">12{act.className.replace("12", "")}</td>
                        <td className="py-2.5 text-slate-800 font-semibold">{act.description}</td>
                        <td className="py-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            act.activityType === "quiz"
                              ? scoreText.includes("10") || scoreText.includes("9") || scoreText.includes("8")
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}>
                            {scoreText}
                          </span>
                        </td>
                        <td className="py-2.5 font-mono text-slate-500 hidden md:table-cell">{formattedTime}</td>
                        <td className="py-2.5 text-right font-mono font-black text-cyan-700">{gpa}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-800 font-mono font-bold">
                      Không tìm thấy kết quả luyện tập nào trong bộ lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Restore options */}
        <div className="border-t-2 border-slate-300 mt-4 pt-3 flex justify-between items-center text-[10.5px] text-slate-900 font-bold">
          <span>Hệ thống lưu điểm tự động trên trình duyệt</span>
          <span className="text-[9.5px] text-slate-500 font-mono">THPT Tam Phú - TPHCM</span>
        </div>
      </div>

      {/* Right Column: AI Auto Evaluator & Score distribution */}
      <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
        
        {/* Admin Quick Actions & Password 3D block */}
        <div className="block-3d-amber no-override no-override-bg rounded-3xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 border-b-2 border-amber-300 pb-2.5 mb-2.5">
              <Lock className="h-4.5 w-4.5 text-amber-900 font-black" />
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-950">Quản trị & Cài đặt Bảo mật</h3>
            </div>
            <p className="text-[11px] text-amber-950 font-bold leading-relaxed mb-4">
              Tài khoản quản trị: <span className="font-extrabold text-slate-950">Nguyễn Văn Thọ</span>. Thực hiện đổi mật khẩu truy cập hệ thống hoặc làm sạch dữ liệu kiểm tra của học sinh.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => {
                setShowChangePasswordModal(true);
                setPasswordError("");
                setPasswordSuccess("");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl text-[10px] transition-all cursor-pointer border-2 border-amber-700 shadow-sm uppercase tracking-wider"
              title="Đổi mật khẩu giáo viên"
            >
              <Lock className="h-3.5 w-3.5" />
              Đổi mật khẩu
            </button>
            <button
              onClick={handleResetData}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl text-[10px] transition-all cursor-pointer border-2 border-rose-700 shadow-sm uppercase tracking-wider"
              title="Đặt lại bảng điểm"
            >
              Đặt lại bảng điểm
            </button>
          </div>
        </div>

        {/* Google Sheets Integration Card */}
        <div className="block-3d-emerald no-override no-override-bg rounded-3xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 border-b-2 border-emerald-300 pb-2.5 mb-2.5">
              <FileSpreadsheet className="h-4.5 w-4.5 text-emerald-900 font-black" />
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-950">Đồng bộ Google Sheets</h3>
            </div>
            
            <p className="text-[11px] text-emerald-950 font-bold leading-relaxed mb-3">
              Liên kết cơ sở dữ liệu học tập của học sinh trực tiếp với Google Sheets của giáo viên để tiện theo dõi, chia sẻ điểm số thời gian thực.
            </p>

            {/* Error or success messages */}
            {errorMsgSheet && (
              <div className="text-red-700 text-[10px] font-bold bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
                ⚠️ {errorMsgSheet}
              </div>
            )}
            {syncStatusMsg && (
              <div className="text-emerald-900 text-[10px] font-bold bg-emerald-50 border border-emerald-200 rounded-lg p-2 mb-3 animate-pulse">
                ✨ {syncStatusMsg}
              </div>
            )}

            {/* Google Authentication Section */}
            {!googleUser ? (
              <div className="flex flex-col gap-2 mb-2">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-extrabold rounded-xl text-[10.5px] border-2 border-slate-200 shadow-sm transition-all cursor-pointer"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="w-4 h-4" />
                  Kết nối Google Sheets Auth
                </button>
                <button
                  onClick={() => {
                    setGoogleUser({
                      displayName: "Giáo viên Sandbox (Offline)",
                      email: "teacher.sandbox@thpttamphu.edu.vn"
                    });
                    setGoogleToken("sandbox_token");
                    setSyncStatusMsg("Đã kích hoạt chế độ Sandbox thành công!");
                    setTimeout(() => setSyncStatusMsg(""), 3000);
                  }}
                  className="w-full py-2 bg-slate-900/60 hover:bg-slate-800 text-[9.5px] uppercase font-black tracking-wider text-slate-300 rounded-xl transition-all cursor-pointer border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  Dùng chế độ Sandbox (Không cần Auth)
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between text-[10px] text-emerald-900 font-bold bg-emerald-100/50 border border-emerald-200 rounded-xl px-3 py-2 mb-3">
                <div className="flex items-center gap-1.5 truncate">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-black uppercase">
                    {googleUser.displayName?.substring(0, 2) || "GV"}
                  </div>
                  <span className="truncate">{googleUser.email}</span>
                </div>
                <button
                  onClick={async () => {
                    const { logout: googleLogout } = await import("../lib/googleDriveAuth");
                    await googleLogout();
                    setGoogleUser(null);
                    setGoogleToken(null);
                  }}
                  className="text-red-600 hover:text-red-700 font-black uppercase text-[8px] underline bg-transparent border-none cursor-pointer"
                >
                  Đăng xuất
                </button>
              </div>
            )}

            {/* Sheet Linkage Section */}
            {googleUser && (
              <div className="space-y-3 pt-1">
                {sheetId ? (
                  <div className="space-y-2">
                    <div className="p-2.5 bg-white/60 border border-emerald-200 rounded-xl text-[10px] space-y-1">
                      <div className="text-slate-500 font-bold uppercase text-[8.5px]">Bảng tính đã liên kết:</div>
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <FileSpreadsheet className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span className="truncate">Vật Lí 12 - Kết Quả Học Sinh</span>
                      </div>
                      <a
                        href={sheetUrl || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-700 hover:text-cyan-800 font-extrabold inline-flex items-center gap-1 text-[9.5px] underline mt-1"
                      >
                        Mở Bảng tính trên Google Sheets <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => syncDataToSheet(sheetId, googleToken!)}
                        disabled={syncingSheet}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-black rounded-xl text-[10px] transition-all cursor-pointer border-none shadow-sm flex items-center justify-center gap-1.5"
                      >
                        {syncingSheet ? (
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3.5 w-3.5" />
                        )}
                        Đồng bộ dữ liệu ngay
                      </button>
                      
                      <button
                        onClick={handleUnlinkSheet}
                        className="p-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl border border-slate-200 transition-all cursor-pointer font-bold"
                        title="Hủy liên kết bảng tính này"
                      >
                        <Unlink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <button
                      onClick={handleCreateNewSheet}
                      disabled={syncingSheet}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-black rounded-xl text-[10.5px] border-none shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="h-4 w-4" />
                      Khởi tạo & Đồng bộ Bảng tính mới
                    </button>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-slate-300"></div>
                      <span className="flex-shrink mx-2 text-[9px] text-slate-500 font-mono font-bold uppercase">Hoặc</span>
                      <div className="flex-grow border-t border-slate-300"></div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-500 uppercase block">Nhập Link hoặc ID Bảng tính hiện có:</label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          placeholder="Dán URL Google Sheet..."
                          value={manualSheetInput}
                          onChange={(e) => setManualSheetInput(e.target.value)}
                          className="flex-1 bg-white border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 text-[10.5px] outline-none focus:border-emerald-500 font-bold"
                        />
                        <button
                          onClick={handleLinkExistingSheet}
                          className="px-3 bg-slate-800 hover:bg-slate-900 text-white font-extrabold rounded-lg text-[10px] transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Link2 className="h-3.5 w-3.5" />
                          Liên kết
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Supabase & Vercel Database Connection Card */}
        <div className="block-3d-blue no-override no-override-bg rounded-3xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 border-b-2 border-sky-300 pb-2.5 mb-2.5">
              <Database className="h-4.5 w-4.5 text-sky-900 font-black" />
              <h3 className="text-xs font-black uppercase tracking-wider text-sky-950">Tích hợp Supabase & Vercel</h3>
            </div>
            
            <p className="text-[11px] text-sky-950 font-bold leading-relaxed mb-3">
              Đồng bộ bảng điểm trực tiếp với cơ sở dữ liệu đám mây Supabase PostgreSQL của bạn thông qua môi trường Vercel Marketplace.
            </p>

            {/* Connection status indicator */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                supabaseConfigured ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                <CheckCircle className="h-3 w-3 shrink-0" />
                Vercel Config: {supabaseConfigured ? "Đã nhận diện" : "Dùng mặc định"}
              </span>

              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                supabaseTableExists ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                <AlertCircle className="h-3 w-3 shrink-0" />
                Bảng DB: {supabaseTableExists ? `Sẵn sàng (${supabaseTableName})` : `Chưa tạo (${supabaseTableName})`}
              </span>
            </div>

            {supabaseStatusMsg && (
              <div className="text-sky-900 text-[10px] font-bold bg-sky-50 border border-sky-200 rounded-lg p-2 mb-3 animate-pulse">
                ✨ {supabaseStatusMsg}
              </div>
            )}

            {supabaseError && (
              <div className="text-red-700 text-[10px] font-bold bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
                ⚠️ {supabaseError}
              </div>
            )}

            <div className="space-y-3 pt-1">
              <div className="p-2.5 bg-white/60 border border-sky-200 rounded-xl text-[10px] space-y-1">
                <div className="text-slate-500 font-bold uppercase text-[8.5px]">Project ID:</div>
                <div className="font-mono font-bold text-slate-800 select-all">{supabaseProjectRef}</div>
                <a
                  href={`https://supabase.com/dashboard/project/${supabaseProjectRef}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-700 hover:text-sky-800 font-extrabold inline-flex items-center gap-1 text-[9.5px] underline mt-1"
                >
                  Mở Bảng điều khiển Supabase <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {(!supabaseTableExists || showSqlHelp) ? (
                <div className="space-y-1.5 p-2.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-[9px] relative overflow-hidden">
                  <div className="flex justify-between items-center text-slate-400 font-bold uppercase text-[8px] pb-1.5 border-b border-slate-800">
                    <span>Cần chạy SQL trên Supabase:</span>
                    <div className="flex gap-1.5">
                      {supabaseTableExists && (
                        <button 
                          onClick={() => setShowSqlHelp(false)}
                          className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-[8px] uppercase border-none cursor-pointer"
                        >
                          Ẩn
                        </button>
                      )}
                      <button 
                        onClick={handleCopySql}
                        className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-[8px] uppercase border-none cursor-pointer"
                      >
                        {copiedSql ? "Đã sao chép!" : "Copy SQL"}
                      </button>
                    </div>
                  </div>
                  <pre className="max-h-[140px] overflow-y-auto whitespace-pre-wrap select-all leading-normal text-slate-300">
                    {sqlScript}
                  </pre>
                  {supabaseTableExists && (
                    <div className="text-[8px] text-amber-400 font-sans mt-1 leading-normal">
                      💡 Mẹo: Chạy đoạn mã này trong SQL Editor của Supabase để cài đặt/sửa lỗi phân quyền (RLS) hoặc đồng bộ cấu trúc cho bảng <strong>{supabaseTableName}</strong>.
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-right">
                  <button
                    onClick={() => setShowSqlHelp(true)}
                    className="text-sky-700 hover:text-sky-800 font-black text-[9.5px] underline border-none bg-transparent cursor-pointer"
                  >
                    Xem mã lệnh SQL cấu hình bảng & RLS
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleSyncToSupabase}
                  disabled={supabaseSyncing}
                  className="flex-1 py-2 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-black rounded-xl text-[10px] transition-all cursor-pointer border-none shadow-sm flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${supabaseSyncing ? 'animate-spin' : ''}`} />
                  Đẩy lên Supabase
                </button>

                <button
                  onClick={handlePullFromSupabase}
                  disabled={supabaseSyncing}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-700 text-white font-black rounded-xl text-[10px] transition-all cursor-pointer border-none shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  Tải từ Supabase
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI automated comments on class */}
        <div className="block-3d-purple no-override no-override-bg rounded-3xl p-6 relative overflow-hidden flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b-2 border-purple-300 pb-3 mb-3">
              <Sparkles className="h-4.5 w-4.5 text-purple-900 animate-pulse" />
              <h3 className="text-xs font-black uppercase tracking-wider text-purple-950">AI Nhận xét Sư phạm lớp lọc</h3>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-900">
              <div>
                <span className="font-black text-purple-950">1. Đánh giá chất lượng ({selectedClass === "All" ? "Toàn bộ học sinh" : `Lớp ${selectedClass}`}):</span>
                <p className="text-slate-900 font-bold mt-1">
                  {totalStudents > 0 ? (
                    `Lớp học hiện tại đạt điểm GPA trung bình là ${averageGpa.toFixed(2)}/10. Đa số học sinh hoàn thành trên 70% chương trình lý thuyết và các bài mô phỏng nhiệt học.`
                  ) : (
                    "Chưa có dữ liệu học sinh trong bộ lọc này để tiến hành phân tích sư phạm."
                  )}
                </p>
              </div>

              <div>
                <span className="font-black text-purple-950">2. Khuyến nghị dạy & học của AI:</span>
                <p className="text-slate-900 font-bold mt-1">
                  {underperformingCount > 0 ? (
                    `Nhóm ${underperformingCount} học sinh có điểm trung bình dưới 6.5 (gồm ${underperformingStudents.map((s) => s.name).slice(0, 3).join(", ")}${underperformingCount > 3 ? "..." : ""}) cần được bồi dưỡng thêm về bài tập lý thuyết hạt nhân và định luật súc nóng chảy.`
                  ) : (
                    "Tất cả học sinh trong nhóm lọc hiện tại đều đạt mức độ học tập tốt (GPA >= 6.5). Hãy tiếp tục duy trì lộ trình ôn thi và làm đề nâng cao!"
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Score Distribution dynamic bar-chart */}
        <div className="block-3d-sky no-override no-override-bg rounded-3xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] font-black text-sky-950 uppercase tracking-wider mb-2">Phổ điểm học lực lớp ({selectedClass === "All" ? "Tất cả" : `Lớp ${selectedClass}`})</h4>
            <p className="text-[9.5px] text-sky-900 font-bold leading-normal mb-3">
              Phân phối điểm số thực tế của {totalStudents} học sinh. Rê chuột vào cột để xem chi tiết danh sách học sinh đạt nhóm điểm tương ứng.
            </p>
          </div>
          
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} margin={{ top: 10, right: 5, left: -30, bottom: 5 }}>
                <XAxis 
                  dataKey="range" 
                  tick={{ fill: '#0f172a', fontSize: 9, fontWeight: 'bold' }} 
                  axisLine={{ stroke: '#475569', strokeWidth: 1 }}
                  tickLine={false}
                />
                <YAxis 
                  allowDecimals={false}
                  tick={{ fill: '#0f172a', fontSize: 9, fontWeight: 'bold' }} 
                  axisLine={{ stroke: '#475569', strokeWidth: 1 }}
                  tickLine={false}
                />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(15, 23, 42, 0.04)', radius: 4 }} />
                <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>



      </div>

      {/* Custom Delete Student Confirmation Modal */}
      {studentToDelete && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-red-500 mb-3">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-200">Xác nhận xoá học viên</h3>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Bạn có chắc chắn muốn xoá học viên <span className="font-bold text-white">"{studentToDelete.name}"</span> khỏi danh sách lớp <span className="font-bold text-cyan-400">{studentToDelete.className}</span>? Hành động này sẽ không thể khôi phục lại dữ liệu!
            </p>

            <div className="flex gap-2.5 justify-end">
              <button
                onClick={() => setStudentToDelete(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer border-none"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center gap-1 cursor-pointer border-none"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Xác nhận xoá
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Reset Data Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-amber-500 mb-3">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-200">Đặt lại dữ liệu gốc</h3>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Hành động này sẽ xóa toàn bộ tiến trình học tập hiện tại của tất cả học sinh và khôi phục về danh sách mẫu ban đầu. Bạn có chắc chắn muốn thực hiện?
            </p>

            <div className="flex gap-2.5 justify-end">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer border-none"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center gap-1 cursor-pointer border-none"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Đồng ý Đặt lại
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Custom Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Lock className="h-4.5 w-4.5 text-cyan-400 animate-pulse" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Đổi mật khẩu giáo viên
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowChangePasswordModal(false);
                  setPasswordError("");
                  setPasswordSuccess("");
                  setOldPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setShowOldPassword(false);
                  setShowNewPassword(false);
                  setShowConfirmPassword(false);
                }}
                className="text-slate-500 hover:text-white transition-colors text-xs font-bold px-2 py-1 rounded-lg bg-slate-850/60 border border-slate-800 cursor-pointer"
                title="Quay về trang quản trị"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">
                  Mật khẩu cũ <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Nhập mật khẩu cũ hiện tại..."
                    className="w-full text-xs pl-3 pr-10 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors bg-transparent border-none cursor-pointer focus:outline-none p-0 flex items-center justify-center"
                    title={showOldPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">
                  Mật khẩu mới <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mật khẩu mới..."
                    className="w-full text-xs pl-3 pr-10 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors bg-transparent border-none cursor-pointer focus:outline-none p-0 flex items-center justify-center"
                    title={showNewPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">
                  Xác nhận mật khẩu mới <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới..."
                    className="w-full text-xs pl-3 pr-10 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors bg-transparent border-none cursor-pointer focus:outline-none p-0 flex items-center justify-center"
                    title={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <p className="text-[10px] text-red-500 font-bold bg-red-500/10 p-2.5 rounded-xl border border-red-500/20 flex items-center gap-1.5">
                  ⚠️ {passwordError}
                </p>
              )}

              {passwordSuccess && (
                <p className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 flex items-center gap-1.5">
                  ✅ {passwordSuccess}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-2.5 justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePasswordModal(false);
                    setPasswordError("");
                    setPasswordSuccess("");
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setShowOldPassword(false);
                    setShowNewPassword(false);
                    setShowConfirmPassword(false);
                  }}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer border-none flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Trở về trang quản trị
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer border-none"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
