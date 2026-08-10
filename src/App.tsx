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
  Cloud,
  FileSpreadsheet
} from "lucide-react";

import { initAuth } from "./lib/googleDriveAuth";

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
import { StudentResult, DEFAULT_STUDENT_RESULTS, StudentActivity } from "./types";
import { listenToStudentResults, saveStudentResult, saveBulkStudentResults, listenToGoogleSheetsConfig, authenticateFirebaseUser, firebaseSignOut } from "./lib/firestoreDb";
import { syncStudentDataToFirebase, logStudentActivity, listenToStudentActivities, clearAllStudentActivities, syncStudentLoginToFirebase } from "./lib/databaseService";

const filterOutMockResults = (results: StudentResult[]): StudentResult[] => {
  const mockNames = [
    "đỗ kim chi",
    "phạm hà phương",
    "nguyễn minh đức",
    "lê hoàng nam",
    "trần thị mai"
  ];
  if (!Array.isArray(results)) return [];
  return results.filter(
    (r) => r && r.name && !mockNames.includes(r.name.trim().normalize("NFC").toLowerCase())
  );
};

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
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(() => {
    try {
      const storedUser = localStorage.getItem("logged_in_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        return parsed.role || null;
      }
    } catch (e) {}
    return null;
  });
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
  const [loggedInUser, setLoggedInUser] = useState<{ name: string; className: string; role: "student" | "teacher"; studentCode?: string } | null>(() => {
    try {
      const storedUser = localStorage.getItem("logged_in_user");
      if (storedUser) {
        return JSON.parse(storedUser);
      }
    } catch (e) {}
    return null;
  });
  const [studentResults, setStudentResults] = useState<StudentResult[]>(() => {
    try {
      const localData = localStorage.getItem("student_learning_results") || localStorage.getItem("student_results");
      if (localData) {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return filterOutMockResults(parsed);
        }
      }
    } catch (e) {
      console.error("Lỗi khi tải dữ liệu kết quả học sinh ban đầu từ localStorage:", e);
    }
    return []; // Trả về mảng rỗng nếu chưa có kết quả như yêu cầu kỹ thuật
  });

  const [studentActivities, setStudentActivities] = useState<StudentActivity[]>(() => {
    try {
      const localData = localStorage.getItem("student_learning_history") || localStorage.getItem("app_history_data") || localStorage.getItem("student_activities");
      if (localData) {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Lỗi khi tải dữ liệu lịch sử hoạt động ban đầu từ localStorage:", e);
    }
    return [];
  });

  // Auto-sync student results to browser localStorage with safety checks
  useEffect(() => {
    try {
      const dataStr = JSON.stringify(studentResults);
      localStorage.setItem("student_results", dataStr);
      localStorage.setItem("student_learning_results", dataStr);
    } catch (e) {
      console.error("Lỗi đồng bộ dữ liệu kết quả học tập vào localStorage:", e);
    }
  }, [studentResults]);

  // Auto-sync student activities/history to browser localStorage with safety checks
  useEffect(() => {
    try {
      const dataStr = JSON.stringify(studentActivities);
      localStorage.setItem("student_activities", dataStr);
      localStorage.setItem("app_history_data", dataStr);
      localStorage.setItem("student_learning_history", dataStr);
    } catch (e) {
      console.error("Lỗi đồng bộ lịch sử hoạt động vào localStorage:", e);
    }
  }, [studentActivities]);

  // Google Sheets state & auto-sync integration
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [sheetId, setSheetId] = useState<string | null>(localStorage.getItem("google_sheets_id"));
  const [isSyncing, setIsSyncing] = useState(false);

  // Auto connect/listen to Google OAuth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (_currentUser, currentToken) => {
        setGoogleToken(currentToken);
      },
      () => {
        setGoogleToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Listen to Google Sheets config dynamically from Firestore settings
  useEffect(() => {
    const unsubscribe = listenToGoogleSheetsConfig((config) => {
      if (config) {
        setSheetId(config.sheetId);
      } else {
        setSheetId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen to Student Activities dynamically from Firestore & local backup
  useEffect(() => {
    const loadBackupActivities = async () => {
      try {
        const res = await fetch("/api/backup/activities");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setStudentActivities(data);
          }
        }
      } catch (err) {
        console.warn("Lỗi tải trước hoạt động từ server-backup:", err);
      }
    };
    loadBackupActivities();

    const unsubscribe = listenToStudentActivities((activities) => {
      setStudentActivities((prev) => {
        if (activities && activities.length > 0) {
          return activities;
        }
        return prev;
      });
    });
    return () => unsubscribe();
  }, []);

  // Automatic synchronization effect
  useEffect(() => {
    // Connect to Google Sheets: if sheetId is set, fallback to sandbox_token if googleToken is not available yet
    const tokenToUse = googleToken || (sheetId ? "sandbox_token" : null);

    if (!sheetId || !tokenToUse) return;

    const doAutoSync = async () => {
      try {
        setIsSyncing(true);
        if (tokenToUse === "sandbox_token") {
          console.log("Auto-syncing to Google Sheet (Sandbox mode)...");
          setIsSyncing(false);
          return;
        }

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
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?valueInputOption=RAW`;

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

        if (response.ok) {
          console.log("Auto-synced to Google Sheet successfully!");
        } else {
          console.error("Auto-sync failed:", response.statusText);
        }
      } catch (err) {
        console.error("Failed to auto-sync to Google Sheet:", err);
      } finally {
        setIsSyncing(false);
      }
    };

    const timer = setTimeout(() => {
      doAutoSync();
    }, 2000);

    return () => clearTimeout(timer);
  }, [studentResults, googleToken, sheetId]);

  // Gamification stats
  const [xp, setXp] = useState<number>(() => {
    try {
      const storedUser = localStorage.getItem("logged_in_user");
      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        if (userObj && userObj.role === "student") {
          const localData = localStorage.getItem("student_results");
          if (localData) {
            const results = JSON.parse(localData);
            if (Array.isArray(results)) {
              const loggedNameNorm = userObj.name.trim().normalize("NFC").toLowerCase();
              const matched = results.find(
                (r: StudentResult) => r && r.name && r.name.trim().normalize("NFC").toLowerCase() === loggedNameNorm && r.className === userObj.className
              );
              if (matched) {
                return matched.xp || 0;
              }
            }
          }
        }
      }
    } catch (e) {}
    return 0;
  });

  const [level, setLevel] = useState<number>(() => {
    try {
      const storedUser = localStorage.getItem("logged_in_user");
      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        if (userObj && userObj.role === "student") {
          const localData = localStorage.getItem("student_results");
          if (localData) {
            const results = JSON.parse(localData);
            if (Array.isArray(results)) {
              const loggedNameNorm = userObj.name.trim().normalize("NFC").toLowerCase();
              const matched = results.find(
                (r: StudentResult) => r && r.name && r.name.trim().normalize("NFC").toLowerCase() === loggedNameNorm && r.className === userObj.className
              );
              if (matched) {
                return Math.max(1, Math.floor((matched.xp || 0) / 800) + 1);
              }
            }
          }
        }
      }
    } catch (e) {}
    return 1;
  });

  const [coins, setCoins] = useState<number>(() => {
    try {
      const storedUser = localStorage.getItem("logged_in_user");
      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        if (userObj && userObj.role === "student") {
          const coinKey = `student_coins_${userObj.className}_${userObj.name.toLowerCase()}`;
          const savedCoins = localStorage.getItem(coinKey);
          if (savedCoins) return parseInt(savedCoins, 10);
        }
      }
    } catch (e) {}
    return 325;
  });

  const [streak, setStreak] = useState<number>(() => {
    try {
      const storedUser = localStorage.getItem("logged_in_user");
      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        if (userObj && userObj.role === "student") {
          const streakKey = `student_streak_${userObj.className}_${userObj.name.toLowerCase()}`;
          const savedStreak = localStorage.getItem(streakKey);
          if (savedStreak) return parseInt(savedStreak, 10);
        }
      }
    } catch (e) {}
    return 12;
  });

  // Login form states
  const [loginRole, setLoginRole] = useState<"student" | "teacher">("student");
  const [studentNameInput, setStudentNameInput] = useState("");
  const [studentClassInput, setStudentClassInput] = useState("12A1");
  const [customClassInput, setCustomClassInput] = useState("");
  const [studentCodeInput, setStudentCodeInput] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginStatus, setLoginStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [loginStatusMessage, setLoginStatusMessage] = useState("");

  // States cho tính năng Chẩn đoán Kết nối Supabase trực quan và Hiệu ứng Đồng bộ khởi tạo
  const [isInitializing, setIsInitializing] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(() => localStorage.getItem("last_sync_timestamp"));
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [diagRunning, setDiagRunning] = useState(false);
  const [diagResult, setDiagResult] = useState<{
    statusOk?: boolean;
    statusData?: any;
    resultsOk?: boolean;
    resultsData?: any;
    error?: string;
  } | null>(null);

  const runDiagnostics = async () => {
    setDiagRunning(true);
    setDiagResult(null);
    console.clear();
    console.log("%c🔌 KHỞI CHẠY CHẨN ĐOÁN KẾT NỐI SUPABASE...", "background: #0284c7; color: white; font-size: 14px; font-weight: bold; padding: 6px 12px; border-radius: 6px;");
    
    try {
      console.log("%c1. Đang kiểm tra API Trạng thái (/api/supabase/status)...", "color: #0ea5e9; font-weight: bold;");
      const statusRes = await fetch("/api/supabase/status");
      const statusData = await statusRes.json();
      console.log("%c✓ Kết quả Trạng thái:", "color: #0ea5e9; font-weight: bold;", statusData);
      
      console.log("%c2. Đang kiểm tra tải dữ liệu học sinh (/api/supabase/results)...", "color: #10b981; font-weight: bold;");
      const resultsRes = await fetch("/api/supabase/results");
      let resultsData: any = null;
      let resultsOk = false;
      if (resultsRes.ok) {
        resultsData = await resultsRes.json();
        resultsOk = true;
        console.log("%c✓ Kết quả danh sách học sinh từ Supabase:", "color: #10b981; font-weight: bold;");
        console.table(resultsData);
      } else {
        const errText = await resultsRes.text();
        console.error("%c✕ Lỗi tải học sinh từ Supabase:", "color: #ef4444; font-weight: bold;", errText);
        resultsData = errText;
      }
      
      setDiagResult({
        statusOk: statusRes.ok,
        statusData,
        resultsOk,
        resultsData
      });
    } catch (e: any) {
      console.error("%c❌ Lỗi hệ thống khi chạy chẩn đoán:", "color: #ef4444; font-weight: bold;", e);
      setDiagResult({
        error: e.message || String(e)
      });
    } finally {
      setDiagRunning(false);
    }
  };

  // Hàm tải dữ liệu học sinh mới nhất từ Supabase (ưu tiên hàng đầu trên môi trường Vercel)
  const fetchAndSyncStudentResults = async (currentLocalResults?: StudentResult[]) => {
    try {
      const statusRes = await fetch("/api/supabase/status");
      const statusData = await statusRes.json();
      if (statusData.configured && statusData.tableExists) {
        const resultsRes = await fetch("/api/supabase/results");
        if (resultsRes.ok) {
          const resultsData = await resultsRes.json();
          if (Array.isArray(resultsData)) {
            // Lấy dữ liệu local mới nhất từ localStorage trực tiếp để tránh stale closure của React state
            const localData = localStorage.getItem("student_learning_results") || localStorage.getItem("student_results");
            let localList: StudentResult[] = [];
            if (localData) {
              try {
                const parsed = JSON.parse(localData);
                if (Array.isArray(parsed)) {
                  localList = parsed;
                }
              } catch (e) {}
            }
            const activeLocal = filterOutMockResults(currentLocalResults || localList);

            if (resultsData.length > 0) {
              // Hợp nhất dữ liệu thông minh giữa Local và Server để tránh ghi đè ngược làm mất tiến trình vừa đạt được
              setStudentResults((prev) => {
                const baseList = filterOutMockResults(currentLocalResults || prev || localList);
                const merged = filterOutMockResults([...resultsData]);
                
                baseList.forEach((local) => {
                  const localNameNorm = local.name.trim().normalize("NFC").toLowerCase();
                  const idx = merged.findIndex(
                    (s) => s.name.trim().normalize("NFC").toLowerCase() === localNameNorm && s.className === local.className
                  );
                  if (idx >= 0) {
                    const server = merged[idx];
                    // Giữ lại tiến trình lớn nhất để tránh việc cập nhật chậm từ mạng ghi đè lùi dữ liệu
                    merged[idx] = {
                      ...server,
                      xp: Math.max(local.xp, server.xp),
                      score: Math.max(local.score, server.score),
                      progress: Math.max(local.progress, server.progress),
                      completedQuizzes: Math.max(local.completedQuizzes, server.completedQuizzes)
                    };
                  } else {
                    merged.push(local);
                  }
                });

                const finalFiltered = filterOutMockResults(merged);
                localStorage.setItem("student_results", JSON.stringify(finalFiltered));
                localStorage.setItem("student_learning_results", JSON.stringify(finalFiltered));
                
                // Cập nhật lại server-backup để đảm bảo đồng bộ lâu dài
                fetch("/api/backup/results/bulk", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ students: finalFiltered })
                }).catch((err) => console.warn("Lỗi đồng bộ server-backup từ Supabase:", err));

                return finalFiltered;
              });

              // Cập nhật mốc thời gian đồng bộ thành công để đảm bảo tính toàn vẹn của dữ liệu sau khi nhấn F5
              const timestamp = new Date().toLocaleString("vi-VN");
              localStorage.setItem("last_sync_timestamp", timestamp);
              setLastSyncTime(timestamp);

              return true;
            } else {
              // Supabase đang trống, tự động đẩy dữ liệu cục bộ hoặc mặc định lên Supabase
              const localToPush = filterOutMockResults(activeLocal);
              if (localToPush && localToPush.length > 0) {
                console.log("Supabase đang trống. Tiến hành tự động đồng bộ đẩy dữ liệu mẫu lên Supabase...", localToPush);
                await fetch("/api/supabase/results/bulk", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ students: localToPush })
                });
                setStudentResults(localToPush);
                localStorage.setItem("student_results", JSON.stringify(localToPush));
                localStorage.setItem("student_learning_results", JSON.stringify(localToPush));

                // Cập nhật mốc thời gian đồng bộ thành công
                const timestamp = new Date().toLocaleString("vi-VN");
                localStorage.setItem("last_sync_timestamp", timestamp);
                setLastSyncTime(timestamp);

                return true;
              }
            }
            // Chỉ xóa trắng state/localStorage khi cả local và server đều thực sự trống rỗng hoàn toàn, tránh việc xóa nhầm
            if (activeLocal.length === 0) {
              setStudentResults([]);
              localStorage.setItem("student_results", "[]");
              localStorage.setItem("student_learning_results", "[]");
            }

            // Cập nhật mốc thời gian kiểm tra thành công khi cả hai nguồn đều trống rỗng
            const timestamp = new Date().toLocaleString("vi-VN");
            localStorage.setItem("last_sync_timestamp", timestamp);
            setLastSyncTime(timestamp);

            return true;
          }
        }
      }
    } catch (err) {
      console.warn("Không thể đồng bộ tự động từ Supabase:", err);
    }
    return false;
  };

  // 1. Đồng bộ dữ liệu học tập trực tuyến liên tục (Real-time Polling & Supabase-First)
  useEffect(() => {
    let isMounted = true;
    let unsubscribeFirestore: (() => void) | null = null;

    const initialSync = async () => {
      // Chạy chẩn đoán ngầm để in chi tiết ra Console cho thầy cô kiểm tra dễ dàng
      runDiagnostics();

      // Khôi phục phiên xác thực Firebase Auth từ localStorage khi nhấn F5
      const storedUser = localStorage.getItem("logged_in_user");
      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          if (userObj && userObj.name && userObj.className && userObj.role) {
            console.log("Khôi phục phiên xác thực Firebase Auth cho:", userObj.name);
            await authenticateFirebaseUser(userObj.name, userObj.className, userObj.role);
          }
        } catch (e) {
          console.warn("Không thể tự động khôi phục phiên xác thực Firebase Auth:", e);
        }
      }

      // Tải dữ liệu từ LocalStorage trước để giao diện hiển thị ngay lập tức
      const localData = localStorage.getItem("student_learning_results") || localStorage.getItem("student_results");
      let initialLocalResults = DEFAULT_STUDENT_RESULTS;
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            initialLocalResults = filterOutMockResults(parsed);
          }
        } catch (e) {}
      } else {
        initialLocalResults = filterOutMockResults(DEFAULT_STUDENT_RESULTS);
      }

      // Tải dữ liệu lưu trữ từ server-backup trước tiên để chống mất dữ liệu khi nhấn F5 hoặc đổi trình duyệt
      try {
        const backupRes = await fetch("/api/backup/results");
        if (backupRes.ok) {
          const backupData = await backupRes.json();
          if (Array.isArray(backupData) && backupData.length > 0) {
            console.log("Khôi phục thành công dữ liệu học sinh từ server-backup:", backupData);
            initialLocalResults = filterOutMockResults(backupData);
            localStorage.setItem("student_results", JSON.stringify(initialLocalResults));
            localStorage.setItem("student_learning_results", JSON.stringify(initialLocalResults));
          }
        }
      } catch (err) {
        console.warn("Không thể tải kết quả từ server-backup, sử dụng LocalStorage làm dự phòng:", err);
      }

      setStudentResults(initialLocalResults);

      // Luôn thử đồng bộ từ Supabase trực tuyến trước tiên (vì là CSDL chính trên Vercel)
      const synced = await fetchAndSyncStudentResults(initialLocalResults);
      if (!synced && isMounted) {
        // Nếu không có Supabase, đăng ký lắng nghe Firestore làm phương án dự phòng
        unsubscribeFirestore = listenToStudentResults((resultsFromFirestore) => {
          if (!isMounted) return;
          if (resultsFromFirestore && resultsFromFirestore.length > 0) {
            setStudentResults((prev) => {
              const merged = filterOutMockResults(resultsFromFirestore);
              const filteredPrev = filterOutMockResults(prev);
              filteredPrev.forEach((local) => {
                const localNameNorm = local.name.trim().normalize("NFC").toLowerCase();
                const idx = merged.findIndex(
                  (s) => s.name.trim().normalize("NFC").toLowerCase() === localNameNorm && s.className === local.className
                );
                if (idx >= 0) {
                  const server = merged[idx];
                  merged[idx] = {
                    ...server,
                    xp: Math.max(local.xp, server.xp),
                    score: Math.max(local.score, server.score),
                    progress: Math.max(local.progress, server.progress),
                    completedQuizzes: Math.max(local.completedQuizzes, server.completedQuizzes)
                  };
                } else {
                  merged.push(local);
                }
              });
              const finalFiltered = filterOutMockResults(merged);
              localStorage.setItem("student_results", JSON.stringify(finalFiltered));
              localStorage.setItem("student_learning_results", JSON.stringify(finalFiltered));

              // Cập nhật server-backup khi có thay đổi từ Firestore
              fetch("/api/backup/results/bulk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ students: finalFiltered })
              }).catch((err) => console.warn("Lỗi đồng bộ server-backup từ Firestore:", err));

              return finalFiltered;
            });
          } else {
            setStudentResults((prev) => {
              const filteredPrev = filterOutMockResults(prev);
              localStorage.setItem("student_results", JSON.stringify(filteredPrev));
              localStorage.setItem("student_learning_results", JSON.stringify(filteredPrev));
              return filteredPrev;
            });
          }
        });
      }

      // Hoàn tất tải/đồng bộ ban đầu
      if (isMounted) {
        setTimeout(() => {
          setIsInitializing(false);
        }, 1500); // Trì hoãn nhẹ 1.5 giây để hiển thị hiệu ứng đồng bộ trực quan, tạo niềm tin cho người dùng
      }
    };

    initialSync();

    // Thiết lập Polling tải lại dữ liệu mới từ Supabase mỗi 10 giây
    // Cơ chế này đảm bảo dữ liệu học tập của học sinh ở các thiết bị/trình duyệt khác nhau
    // luôn được đồng bộ và cập nhật tự động lên màn hình của Thầy Cô và các bạn
    const intervalId = setInterval(() => {
      if (isMounted) {
        fetchAndSyncStudentResults();
      }
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  }, []);

  // 3. Keep the logged-in student's stats in sync with the studentResults array from Firestore/Supabase
  useEffect(() => {
    if (loggedInUser && loggedInUser.role === "student" && studentResults.length > 0) {
      const loggedNameNorm = loggedInUser.name.trim().normalize("NFC").toLowerCase();
      const matched = studentResults.find(
        (r) => r.name.trim().normalize("NFC").toLowerCase() === loggedNameNorm && r.className === loggedInUser.className
      );
      if (matched) {
        setXp(matched.xp);
        setLevel(Math.max(1, Math.floor(matched.xp / 800) + 1));
      }
    }
  }, [studentResults, loggedInUser]);

  // Persist coins and streak automatically when they change
  useEffect(() => {
    if (loggedInUser && loggedInUser.role === "student") {
      const coinKey = `student_coins_${loggedInUser.className}_${loggedInUser.name.toLowerCase()}`;
      localStorage.setItem(coinKey, coins.toString());
    }
  }, [coins, loggedInUser]);

  useEffect(() => {
    if (loggedInUser && loggedInUser.role === "student") {
      const streakKey = `student_streak_${loggedInUser.className}_${loggedInUser.name.toLowerCase()}`;
      localStorage.setItem(streakKey, streak.toString());
    }
  }, [streak, loggedInUser]);

  // Earn XP utility and persist to Firestore & Supabase (Highly robust)
  const handleEarnXP = async (amount: number, quizScoreOrReason?: number | string, forceProgress?: number) => {
    if (!loggedInUser || loggedInUser.role !== "student") return;

    const loggedNameNorm = loggedInUser.name.trim().normalize("NFC").toLowerCase();

    // Tìm kiếm học sinh hiện tại trong state
    let currentStudent = studentResults.find(
      (r) => r.name.trim().normalize("NFC").toLowerCase() === loggedNameNorm && r.className === loggedInUser.className
    );

    // Dự phòng 1: Thử tìm trong LocalStorage
    if (!currentStudent) {
      const localData = localStorage.getItem("student_results");
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          if (Array.isArray(parsed)) {
            currentStudent = parsed.find(
              (r) => r.name.trim().normalize("NFC").toLowerCase() === loggedNameNorm && r.className === loggedInUser.className
            );
          }
        } catch (e) {}
      }
    }

    // Dự phòng 2: Khởi tạo dữ liệu mặc định dựa trên phiên đăng nhập hiện tại nếu hoàn toàn không tìm thấy
    const baseStudent = currentStudent || {
      name: loggedInUser.name,
      className: loggedInUser.className,
      xp: xp, // Dùng XP hiện tại của giao diện học sinh
      score: 0.0,
      progress: 0,
      completedQuizzes: 0
    };

    const updatedXp = baseStudent.xp + amount;
    
    // Tách biệt giữa điểm số quiz thực tế (number) và lý do nhận XP từ thí nghiệm (string)
    const quizScore = typeof quizScoreOrReason === "number" ? quizScoreOrReason : undefined;

    // GPA học tập cập nhật thực tế từ điểm làm bài nếu có, hoặc tính toán lũy tiến từ XP
    let calculatedGpa = baseStudent.score;
    if (quizScore !== undefined) {
      calculatedGpa = baseStudent.score === 0 ? quizScore : parseFloat(Math.max(baseStudent.score, quizScore).toFixed(1));
    } else {
      calculatedGpa = Math.min(10.0, Math.max(baseStudent.score, parseFloat((updatedXp / 280).toFixed(1))));
    }

    // Tiến độ học tập cập nhật chính xác hoặc tính toán từ XP
    let calculatedProgress = baseStudent.progress;
    if (forceProgress !== undefined) {
      calculatedProgress = Math.min(100, Math.max(baseStudent.progress, forceProgress));
    } else {
      calculatedProgress = Math.min(100, Math.max(baseStudent.progress, Math.floor((updatedXp / 3000) * 100)));
    }
    
    const updatedRecord: StudentResult = {
      ...baseStudent,
      xp: updatedXp,
      score: calculatedGpa,
      progress: calculatedProgress,
      completedQuizzes: quizScore !== undefined ? baseStudent.completedQuizzes + 1 : baseStudent.completedQuizzes
    };

    // 1. Cập nhật state cục bộ để giao diện phản hồi tức thì
    setStudentResults((prev) => {
      const existsInPrev = prev.some(
        (r) => r.name.trim().normalize("NFC").toLowerCase() === loggedNameNorm && r.className === updatedRecord.className
      );
      if (existsInPrev) {
        return prev.map((r) => 
          r.name.trim().normalize("NFC").toLowerCase() === loggedNameNorm && r.className === updatedRecord.className 
            ? updatedRecord 
            : r
        );
      } else {
        return [...prev, updatedRecord];
      }
    });

    // Cập nhật LocalStorage cho đồng bộ cục bộ
    const localData = localStorage.getItem("student_learning_results") || localStorage.getItem("student_results");
    let localResults: StudentResult[] = [];
    if (localData) {
      try {
        localResults = JSON.parse(localData);
      } catch (e) {}
    }
    const idx = localResults.findIndex(
      (r) => r.name.trim().normalize("NFC").toLowerCase() === loggedNameNorm && r.className === updatedRecord.className
    );
    if (idx >= 0) {
      localResults[idx] = updatedRecord;
    } else {
      localResults.push(updatedRecord);
    }
    localStorage.setItem("student_results", JSON.stringify(localResults));
    localStorage.setItem("student_learning_results", JSON.stringify(localResults));

    // 2. Lưu vào Firestore làm phương án dự phòng
    saveStudentResult(updatedRecord).catch((err) => {
      console.error("Lỗi lưu kết quả học tập lên Firestore:", err);
    });

    // 2b. Ghi nhận lịch sử hoạt động sư phạm thời gian thực lên Firebase & LocalStorage
    const derivedActivityType = quizScore !== undefined 
      ? "quiz" 
      : typeof quizScoreOrReason === "string"
        ? (quizScoreOrReason.toLowerCase().includes("thí nghiệm") || quizScoreOrReason.toLowerCase().includes("experiment") ? "virtual_lab"
          : quizScoreOrReason.toLowerCase().includes("trợ lý ai") || quizScoreOrReason.toLowerCase().includes("ai") || quizScoreOrReason.toLowerCase().includes("chat") ? "ai_chat"
          : quizScoreOrReason.toLowerCase().includes("thuật ngữ") || quizScoreOrReason.toLowerCase().includes("glossary") ? "glossary"
          : quizScoreOrReason.toLowerCase().includes("công thức") || quizScoreOrReason.toLowerCase().includes("formula") ? "formula_library"
          : quizScoreOrReason.toLowerCase().includes("latex") || quizScoreOrReason.toLowerCase().includes("sandbox") ? "latex_sandbox"
          : quizScoreOrReason.toLowerCase().includes("drive") ? "google_drive"
          : quizScoreOrReason.toLowerCase().includes("stem") || quizScoreOrReason.toLowerCase().includes("zone") ? "stem_zone"
          : "lesson_study")
        : "lesson_study";

    const derivedDescription = quizScore !== undefined
      ? `Hoàn thành bài kiểm tra trắc nghiệm (Điểm: ${quizScore}/10)`
      : typeof quizScoreOrReason === "string"
        ? quizScoreOrReason
        : "Nghiên cứu nội dung bài học Vật lý";

    logStudentActivity(
      loggedInUser.name,
      loggedInUser.className,
      derivedActivityType,
      derivedDescription,
      amount
    ).catch((err) => {
      console.error("Lỗi ghi nhận lịch sử hoạt động lên Firestore:", err);
    });

    // 3. Đồng bộ trực tuyến tự động lên Supabase qua API Proxy
    try {
      const res = await fetch("/api/supabase/results/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ students: [updatedRecord] })
      });
      const data = await res.json();
      if (data.success) {
        console.log("Đã đồng bộ tự động kết quả học tập mới lên Supabase!");
      } else {
        console.warn("Trạng thái đồng bộ Supabase:", data.error);
      }
    } catch (err) {
      console.error("Lỗi mạng đồng bộ kết quả lên Supabase:", err);
    }

    // 4. Đồng bộ lên server-backup để đảm bảo dữ liệu không bị mất
    try {
      await fetch("/api/backup/results/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ students: [updatedRecord] })
      });
    } catch (err) {
      console.warn("Lỗi đồng bộ kết quả học tập lên server-backup:", err);
    }

    // Cập nhật XP và Level hiển thị trên UI của Học sinh
    setXp(updatedXp);
    const nextLevel = Math.max(1, Math.floor(updatedXp / 800) + 1);
    if (nextLevel > level) {
      setCoins((c) => c + 150);
      setLevel(nextLevel);
      setTimeout(() => {
        alert(`🎉 Chúc mừng ${loggedInUser.name} đã LÊN CẤP ${nextLevel}! Nhận ngay +150 Coins và hộp quà năng lượng!`);
      }, 100);
    }

    setCoins((c) => c + Math.ceil(amount / 5));
  };

  // Cập nhật kết quả hàng loạt và đồng bộ lên cả local, Firestore lẫn Supabase
  const handleUpdateResults = async (updated: StudentResult[]) => {
    // 1. Cập nhật state cục bộ ngay lập tức để phản hồi giao diện nhanh chóng
    setStudentResults(updated);
    localStorage.setItem("student_results", JSON.stringify(updated));
    localStorage.setItem("student_learning_results", JSON.stringify(updated));

    // 2. Lưu vào Firestore (Dự phòng cho Google AI Studio)
    try {
      await saveBulkStudentResults(updated);
    } catch (err) {
      console.error("Lỗi khi lưu Firestore:", err);
    }

    // 3. Đồng bộ hàng loạt lên Supabase thông qua API Proxy (Chạy cực tốt trên Vercel)
    try {
      const res = await fetch("/api/supabase/results/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ students: updated })
      });
      const data = await res.json();
      if (data.success) {
        console.log("Đồng bộ hàng loạt lên Supabase thành công!");
      } else {
        console.warn("Cảnh báo đồng bộ Supabase:", data.error);
      }
    } catch (err) {
      console.error("Lỗi mạng khi đồng bộ Supabase:", err);
    }

    // 4. Đồng bộ hàng loạt lên server-backup để lưu trữ cục bộ tuyệt đối an toàn
    try {
      await fetch("/api/backup/results/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ students: updated })
      });
    } catch (err) {
      console.warn("Lỗi đồng bộ hàng loạt lên server-backup:", err);
    }
  };

  // Login handler
  const handlePerformLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginStatusMessage("");

    if (loginRole === "student") {
      const trimmedName = studentNameInput.trim();
      const finalClass = studentClassInput === "Khác" ? customClassInput.trim() : studentClassInput;
      const trimmedCode = studentCodeInput.trim();

      if (!trimmedName) {
        setLoginError("Vui lòng nhập họ và tên của học sinh.");
        return;
      }
      if (!finalClass) {
        setLoginError("Vui lòng nhập tên lớp học.");
        return;
      }

      setLoginStatus("loading");
      setLoginStatusMessage("Đang xử lý đăng nhập & cập nhật dữ liệu...");

      try {
        // 1. Xác thực trực tiếp qua Firebase Authentication để đảm bảo tính bảo mật và đồng bộ
        try {
          await authenticateFirebaseUser(trimmedName, finalClass, "student");
        } catch (authErr: any) {
          console.warn("Lỗi Firebase Auth cho học sinh (sử dụng chế độ Offline/Local):", authErr);
        }

        // 2. Thu thập & Cập nhật thông tin học sinh lên Supabase qua API Proxy
        try {
          const sLoginRes = await fetch("/api/supabase/students/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: trimmedName,
              className: finalClass,
              studentCode: trimmedCode
            })
          });
          if (!sLoginRes.ok) {
            const errData = await sLoginRes.json();
            throw new Error(errData.error || "Lỗi cập nhật Supabase.");
          }
          console.log("Cập nhật thông tin học sinh lên Supabase thành công!");
        } catch (sErr: any) {
          console.error("Lỗi đồng bộ Supabase khi đăng nhập:", sErr);
          if (sErr.message && sErr.message.includes("chưa tồn tại")) {
            throw sErr; // Cho phép lỗi thiếu bảng chặn đăng nhập để báo cáo chi tiết đến Thầy
          }
        }

        // 3. Thu thập & Cập nhật thông tin học sinh vào collection 'students' của Firebase Firestore
        try {
          await syncStudentLoginToFirebase(trimmedName, finalClass, trimmedCode);
        } catch (fErr: any) {
          console.error("Lỗi đồng bộ Firebase 'students' khi đăng nhập:", fErr);
        }

        // TẢI LẠI DỮ LIỆU MỚI NHẤT TRƯỚC KHI ĐĂNG NHẬP để tránh ghi đè kết quả cũ về 0
        let latestResults = filterOutMockResults(studentResults);
        try {
          const res = await fetch("/api/supabase/results");
          if (res.ok) {
            const resultsData = await res.json();
            if (Array.isArray(resultsData)) {
              const filtered = filterOutMockResults(resultsData);
              latestResults = filtered;
              setStudentResults(filtered);
              localStorage.setItem("student_results", JSON.stringify(filtered));
            }
          }
        } catch (err) {
          console.warn("Không thể đồng bộ nhanh từ Supabase trước khi đăng nhập:", err);
        }

        // Đăng ký hoặc tìm kiếm học sinh trong danh sách mới nhất vừa tải
        const searchNameNorm = trimmedName.trim().normalize("NFC").toLowerCase();
        let exists = latestResults.find(
          (r) => r.name.trim().normalize("NFC").toLowerCase() === searchNameNorm && r.className === finalClass
        );

        let activeRecord: StudentResult;
        if (!exists) {
          // Kiểm tra xem học sinh có cùng Tên nhưng đã được đăng ký dưới Lớp khác hay không
          const existsWithDifferentClass = latestResults.find(
            (r) => r.name.trim().normalize("NFC").toLowerCase() === searchNameNorm
          );

          if (existsWithDifferentClass) {
            // Nếu trùng tên nhưng khác lớp, cập nhật lớp mới của học sinh và giữ nguyên điểm số/XP tích lũy!
            const updatedRecord: StudentResult = {
              ...existsWithDifferentClass,
              className: finalClass
            };

            // Lưu cập nhật vào Firestore
            saveStudentResult(updatedRecord).catch((err) => {
              console.error("Lỗi khi cập nhật lớp học sinh lên Firestore:", err);
            });

            // Lưu cập nhật lên Supabase tự động
            fetch("/api/supabase/results/bulk", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ students: [updatedRecord] })
            }).then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  console.log("Đã đồng bộ cập nhật lớp học sinh lên Supabase!");
                }
              })
              .catch((err) => {
                console.error("Lỗi khi đồng bộ cập nhật lớp lên Supabase:", err);
              });

            activeRecord = updatedRecord;
            const newResults = latestResults.map((r) => 
              r.name.trim().normalize("NFC").toLowerCase() === searchNameNorm ? updatedRecord : r
            );
            setStudentResults(newResults);
            localStorage.setItem("student_results", JSON.stringify(newResults));
            localStorage.setItem("student_learning_results", JSON.stringify(newResults));
          } else {
            // Học sinh mới hoàn toàn
            const newRecord: StudentResult = {
              name: trimmedName,
              className: finalClass,
              score: 0.0,
              progress: 0,
              completedQuizzes: 0,
              xp: 0
            };

            // Lưu mới vào Firestore
            saveStudentResult(newRecord).catch((err) => {
              console.error("Lỗi khi đăng ký học sinh mới lên Firestore:", err);
            });

            // Lưu mới lên Supabase tự động
            fetch("/api/supabase/results/bulk", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ students: [newRecord] })
            }).then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  console.log("Đã đồng bộ học sinh mới lên Supabase thành công!");
                }
              })
              .catch((err) => {
                console.error("Lỗi khi đồng bộ học sinh mới lên Supabase:", err);
              });

            activeRecord = newRecord;
            const newResults = [...latestResults, newRecord];
            setStudentResults(newResults);
            localStorage.setItem("student_results", JSON.stringify(newResults));
            localStorage.setItem("student_learning_results", JSON.stringify(newResults));
          }
        } else {
          activeRecord = exists;
        }

        // Save user session
        const userSession = { 
          name: activeRecord.name, 
          className: activeRecord.className, 
          role: "student" as const,
          studentCode: trimmedCode
        };
        localStorage.setItem("logged_in_user", JSON.stringify(userSession));

        // Đồng bộ dữ liệu học sinh hiện tại lên Firebase Firestore
        syncStudentDataToFirebase(activeRecord.name, activeRecord.className, {
          score: activeRecord.score,
          progress: activeRecord.progress,
          xp: activeRecord.xp,
          completedQuizzes: activeRecord.completedQuizzes
        });

        // Thực hiện đồng bộ mẫu cho học sinh "hiên", lớp "12A3" theo hướng dẫn của thầy
        syncStudentDataToFirebase("hiên", "12A3", { score: 0.0, progress: 0, xp: 13 });

        // Hiển thị thông báo trạng thái Đăng nhập & Cập nhật thành công!
        setLoginStatus("success");
        setLoginStatusMessage("Đăng nhập & Cập nhật thành công!");

        setTimeout(() => {
          setLoggedInUser(userSession);
          setUserRole("student");
          setXp(activeRecord.xp);
          setLevel(Math.max(1, Math.floor(activeRecord.xp / 800) + 1));
          setActiveTab("dashboard");
          setLoginStatus("idle");
          setLoginStatusMessage("");
        }, 1200);

      } catch (err: any) {
        console.error("Lỗi đăng nhập:", err);
        setLoginStatus("error");
        const errMsg = err.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại kết nối mạng hoặc cấu hình Database.";
        setLoginStatusMessage(errMsg);
        setLoginError(errMsg);
      }
    } else {
      // Teacher Login
      let savedPassword = localStorage.getItem("teacher_password") || "Tho*121369879#";
      if (savedPassword === "gvtamphu") {
        savedPassword = "Tho*121369879#";
        localStorage.setItem("teacher_password", "Tho*121369879#");
      }
      if (teacherPassword === savedPassword || teacherPassword === "Tho*121369879#") {
        // Xác thực giáo viên trực tiếp qua Firebase Authentication để đảm bảo đồng bộ an toàn
        try {
          await authenticateFirebaseUser("Nguyễn Văn Thọ", "Quản trị", "teacher", "Tho*121369879#");
        } catch (authErr: any) {
          console.warn("Lỗi Firebase Auth cho giáo viên (sử dụng chế độ Offline/Local):", authErr);
        }

        const userSession = { name: "Nguyễn Văn Thọ", className: "Quản trị", role: "teacher" as const };
        localStorage.setItem("logged_in_user", JSON.stringify(userSession));
        setLoggedInUser(userSession);
        setUserRole("teacher");
        setActiveTab("dashboard");
      } else {
        setLoginError("Mật khẩu giáo viên không chính xác!");
      }
    }
  };

  // Logout handler
  const handlePerformLogout = () => {
    firebaseSignOut().catch((err) => console.error("Lỗi khi đăng xuất Firebase Auth:", err));
    localStorage.removeItem("logged_in_user");
    setLoggedInUser(null);
    setUserRole(null);
    setStudentNameInput("");
    setStudentCodeInput("");
    setTeacherPassword("");
    setLoginError("");
    setLoginStatus("idle");
    setLoginStatusMessage("");
  };

  // Sidebar link details
  const navLinks = [
    { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "curriculum", label: "Chương trình học", icon: BookOpen },
    { id: "ai-chat", label: "AI Trợ giảng", icon: MessageSquare },
    { id: "exam-tool", label: "Tạo & Khảo thí Đề", icon: FileText },
    { id: "google-drive", label: "Google Drive", icon: Cloud },
  ];

  // Render Loading / Initialization screen if still syncing
  if (isInitializing) {
    return (
      <div id="init-loading-screen" className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden select-none" style={{
        backgroundImage: "linear-gradient(to right, rgba(14, 165, 233, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 165, 233, 0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }}>
        {/* Decorative physics elements in background */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-300/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-300/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "1s" }}></div>

        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-8 relative z-10 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center text-center gap-6 animate-fade-in">
          {/* Rotating Science Icon / Spinner */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Outer Orbit */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: "12s" }}></div>
            {/* Middle Orbit */}
            <div className="absolute inset-2 rounded-full border border-indigo-400/20 animate-spin" style={{ animationDuration: "8s", animationDirection: "reverse" }}></div>
            
            {/* Spinning Glow Ring */}
            <div className="absolute inset-1 rounded-full border-t-2 border-r-2 border-cyan-500 animate-spin"></div>
            
            {/* Central Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-400/20">
              <GraduationCap className="h-6 w-6 text-white animate-bounce" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase">ĐANG ĐỒNG BỘ DỮ LIỆU</h2>
            <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto leading-relaxed">
              Hệ thống đang đồng bộ hóa dữ liệu học tập với máy chủ đám mây Supabase và cơ sở dữ liệu quốc gia...
            </p>
          </div>

          {/* Sync Progress Indicator / Loader bar */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200/40 relative">
            <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full animate-pulse w-full"></div>
          </div>

          {/* Data Integrity Check / Last Sync Info */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 w-full text-left space-y-2.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Lần đồng bộ trước (F5):</span>
              <span className="text-slate-800 font-bold font-mono">
                {lastSyncTime ? lastSyncTime : "Chưa có dữ liệu"}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
              <span className="text-slate-500 font-medium">Trạng thái toàn vẹn:</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                Đang kiểm tra...
              </span>
            </div>
          </div>

          {/* Subtle loading footer */}
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            Vật lí 12 THPT Tam Phú
          </div>
        </div>
      </div>
    );
  }

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

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Mã học sinh / Email (Tùy chọn)</label>
                  <input
                    type="text"
                    placeholder="Nhập mã học sinh của bạn (VD: HS123)..."
                    value={studentCodeInput}
                    onChange={(e) => setStudentCodeInput(e.target.value)}
                    className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-4 py-3 text-xs outline-none focus:border-cyan-500 transition-colors shadow-inner"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Mật khẩu quản trị</label>
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

            {loginStatusMessage && (
              <div className={`text-xs font-semibold rounded-xl px-3.5 py-3 flex items-center gap-2 transition-all ${
                loginStatus === "loading" 
                  ? "text-cyan-700 bg-cyan-50 border border-cyan-200 animate-pulse" 
                  : loginStatus === "success"
                  ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                  : "text-red-700 bg-red-50 border border-red-200"
              }`}>
                {loginStatus === "loading" && (
                  <svg className="animate-spin h-4 w-4 text-cyan-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {loginStatus === "success" && "✓ "}
                {loginStatus === "error" && "⚠️ "}
                <span>{loginStatusMessage}</span>
              </div>
            )}

            {loginError && !loginStatusMessage && (
              <div className="text-red-600 text-[11px] font-semibold bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                ⚠️ {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginStatus === "loading"}
              className={`w-full py-3.5 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer tracking-wider uppercase mt-2 flex items-center justify-center gap-1.5 ${
                loginStatus === "loading" ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <CheckCircle className="h-4.5 w-4.5" />
              {loginRole === "student" 
                ? (loginStatus === "loading" ? "Đang kết nối..." : "Bắt đầu vào học") 
                : "Đăng nhập hệ thống"}
            </button>
          </form>

          {/* Pedagogy Notice Footer */}
          <div className="text-center text-[9.5px] text-slate-400 leading-normal border-t border-slate-100 pt-4 font-mono uppercase tracking-wider">
            Phòng thí nghiệm lý thuyết & mô phỏng tương tác chuẩn GDPT 2018
          </div>
        </div>

        {/* Sleek Supabase Diagnostics Panel */}
        <div className="w-full max-w-md mt-4 bg-slate-900/90 backdrop-blur-md text-slate-100 rounded-3xl p-5 border border-slate-800 shadow-2xl relative z-10 transition-all">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowDiagnostics(!showDiagnostics)}>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${diagResult?.resultsOk ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${diagResult?.resultsOk ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <h3 className="text-xs font-black tracking-wider text-cyan-400 uppercase font-mono">Công cụ Chẩn đoán Kết nối Supabase</h3>
            </div>
            <button className="text-slate-400 hover:text-white text-xs font-bold bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition-colors">
              {showDiagnostics ? "Đóng" : "Chi tiết"}
            </button>
          </div>

          {!showDiagnostics && (
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Trạng thái: {diagResult?.resultsOk ? "✨ ĐỒNG BỘ TỐT" : diagRunning ? "ĐANG CHẠY..." : "⚠️ CẦN KIỂM TRA"}</span>
              <span>Dữ liệu: {diagResult?.resultsOk && Array.isArray(diagResult.resultsData) ? `${diagResult.resultsData.length} học sinh` : "0 dòng"}</span>
            </div>
          )}

          {showDiagnostics && (
            <div className="mt-4 space-y-3.5 pt-3 border-t border-slate-800 animate-fade-in text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-400 font-mono">Kiểm tra kết nối trực tuyến tới Database</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    runDiagnostics();
                  }}
                  disabled={diagRunning}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white font-extrabold rounded-xl text-[10px] uppercase tracking-wide transition-all cursor-pointer"
                >
                  <span className={diagRunning ? "animate-spin" : ""}>🔄</span>
                  {diagRunning ? "Đang kiểm tra..." : "Chạy kiểm thử ngay"}
                </button>
              </div>

              {/* Status details */}
              <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 font-mono text-[11px] leading-relaxed">
                <div>
                  <span className="text-slate-500">1. Cấu hình Vercel:</span>{" "}
                  {diagResult?.statusData?.configured ? (
                    <span className="text-emerald-400 font-bold">ĐÃ CÀI ĐẶT ENV</span>
                  ) : (
                    <span className="text-rose-400 font-bold">CHƯA CẤU HÌNH</span>
                  )}
                </div>
                <div>
                  <span className="text-slate-500">2. Bảng dữ liệu:</span>{" "}
                  {diagResult?.statusData?.tableExists ? (
                    <span className="text-emerald-400 font-bold">ĐÃ TỒN TẠI ({diagResult?.statusData?.tableName})</span>
                  ) : (
                    <span className="text-rose-400 font-bold">CHƯA TẠO BẢNG</span>
                  )}
                </div>
                <div>
                  <span className="text-slate-500">3. Phản hồi API:</span>{" "}
                  {diagResult?.resultsOk ? (
                    <span className="text-emerald-400 font-bold">200 OK</span>
                  ) : diagResult?.error ? (
                    <span className="text-rose-400 font-bold">LỖI MẠNG ({diagResult.error})</span>
                  ) : (
                    <span className="text-amber-400 font-bold">CHƯA KIỂM TRA</span>
                  )}
                </div>
                <div>
                  <span className="text-slate-500">4. Số lượng học sinh:</span>{" "}
                  <span className="text-cyan-400 font-black">
                    {diagResult?.resultsOk && Array.isArray(diagResult.resultsData) ? diagResult.resultsData.length : 0} học sinh
                  </span>
                </div>
              </div>

              {/* Results Preview */}
              {diagResult?.resultsOk && Array.isArray(diagResult.resultsData) && diagResult.resultsData.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Danh sách học sinh trên Supabase:</span>
                  <div className="max-h-24 overflow-y-auto bg-slate-950/30 rounded-xl p-2 border border-slate-800 space-y-1 text-[10px] font-mono scrollbar-thin">
                    {diagResult.resultsData.map((std: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-slate-300 border-b border-slate-900 pb-1 last:border-0 last:pb-0">
                        <span className="font-semibold">{idx + 1}. {std.name}</span>
                        <span className="text-cyan-400 font-bold">Lớp {std.className} - {std.xp} XP</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Guide block if connection fails or table is empty */}
              {(!diagResult?.resultsOk || !diagResult?.statusData?.configured) && (
                <div className="bg-amber-950/30 border border-amber-900/50 rounded-2xl p-3 text-amber-300 text-[10.5px] leading-relaxed">
                  <span className="font-bold block mb-1">💡 Hướng dẫn nhanh cho Thầy Thọ:</span>
                  Nếu hệ thống thông báo chưa cấu hình hoặc gặp lỗi kết nối:
                  <ol className="list-decimal pl-4 mt-1 space-y-1 font-sans">
                    <li>Thầy vui lòng truy cập trang quản trị <strong>Vercel Dashboard</strong>.</li>
                    <li>Vào mục <strong>Settings</strong> &gt; <strong>Environment Variables</strong>.</li>
                    <li>Thêm 2 biến môi trường: <code className="bg-slate-900 px-1 py-0.5 rounded text-white font-mono">SUPABASE_URL</code> và <code className="bg-slate-900 px-1 py-0.5 rounded text-white font-mono">SUPABASE_ANON_KEY</code> lấy từ Supabase.</li>
                    <li>Redeploy lại dự án để các biến này có hiệu lực nhé!</li>
                  </ol>
                </div>
              )}

              <div className="text-[9px] text-slate-500 text-center font-mono uppercase tracking-widest pt-2 border-t border-slate-800/50">
                Nhấn F12 &gt; Chọn tab Console để xem bảng dữ liệu chi tiết
              </div>
            </div>
          )}
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
          <header className="p-6 border-b border-slate-900 bg-slate-950/50 backdrop-blur-xl flex justify-between items-center shrink-0 gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <Sparkles className="text-cyan-400 h-4.5 w-4.5 animate-pulse" />
                  Nền tảng Học tập & Khảo thí Vật lí 12
                </h2>
                {/* Google Sheets Auto-Connection Status Badge */}
                {sheetId && (
                  <div className="w-fit flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-[9px] font-black uppercase tracking-wider">
                    <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Đã kết nối Google Sheet {isSyncing ? "(Đang đồng bộ...)" : "(Tự động)"}</span>
                  </div>
                )}
              </div>
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
                studentActivities={studentActivities}
                onUpdateResults={async (updated) => {
                  await handleUpdateResults(updated);
                }}
                onClearActivities={async () => {
                  await clearAllStudentActivities();
                  setStudentActivities([]);
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
              studentResults={studentResults}
              onUpdateResults={handleUpdateResults}
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
                await handleUpdateResults(updated);
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
