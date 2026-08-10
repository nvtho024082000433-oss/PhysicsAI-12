import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import * as dotenv from "dotenv";
import mammoth from "mammoth";
import fs from "fs";
import {
  getLocalPhysicsResponse,
  getLocalExamResponse,
  getLocalAnalyzeExamResponse,
  getLocalSummarizeResponse,
  getLocalParseExerciseResponse
} from "./src/lib/localPhysicsBot";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limits for handling base64 uploads (images, PDFs)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize Google GenAI securely
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Helper to check API Key availability
const checkApiKey = () => {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not set in environment variables!");
    return false;
  }
  return true;
};

// Helper function to sanitize error messages and translate them to friendly, actionable alerts
function cleanErrorMessage(errorMsg: string): string {
  if (!errorMsg) return "Không thể kết nối";
  
  // Clean up any exposed API keys in the error string to keep keys hidden
  let cleaned = errorMsg.replace(/AIzaSy[a-zA-Z0-9-_]{33}/g, "AIzaSy***");
  
  if (cleaned.includes("suspended") || cleaned.includes("Consumer 'api_key") || cleaned.includes("PERMISSION_DENIED")) {
    return "Khóa API đã bị Google tạm ngưng (Suspended/403). Quý Thầy/Cô hãy kiểm tra hoặc cập nhật khóa GEMINI_API_KEY mới trong mục Cài đặt (Settings) -> Secrets ở góc trên bên phải AI Studio.";
  }
  if (cleaned.includes("quota") || cleaned.includes("exhausted") || cleaned.includes("limit")) {
    return "Vượt quá giới hạn lượt dùng thử miễn phí trong ngày (Quota Exceeded). Vui lòng thử lại sau hoặc dán khóa GEMINI_API_KEY cá nhân của bạn trong phần Cài đặt (Settings) ở góc trên bên phải AI Studio.";
  }
  if (cleaned.includes("violates row-level security policy") || cleaned.includes("insufficient_privilege") || cleaned.includes("permission denied")) {
    return "Lỗi bảo mật RLS trên Supabase. Quý Thầy/Cô hãy kiểm tra cấu hình Row Level Security (RLS) của bảng trên Supabase, đảm bảo đã kích hoạt chính sách (Policies) cho phép Đọc (SELECT) và Ghi (INSERT/UPDATE/UPSERT) cho vai trò anon/public, hoặc tạm thời TẮT (Disable) tính năng RLS của bảng đó để kiểm tra thử nhé.";
  }
  return cleaned;
}

// ==========================================
// API: SUPABASE BACKEND PROXY & SYNC
// ==========================================
import { createClient } from "@supabase/supabase-js";

const getSupabaseServerClient = () => {
  let projectRef = "guajmfmzkseypwwzcrck";
  const postgresUrl = process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL || "";
  if (postgresUrl) {
    const match = postgresUrl.match(/postgres\.([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      projectRef = match[1];
    }
  }
  const supabaseUrl = process.env.STORAGE_URL ||
                      process.env.SUPABASE_URL || 
                      process.env.NEXT_PUBLIC_SUPABASE_URL || 
                      `https://${projectRef}.supabase.co`;
  const supabaseKey = process.env.STORAGE_ANON_KEY ||
                      process.env.STORAGE_PUBLISHABLE_KEY ||
                      process.env.STORAGE_SERVICE_ROLE_KEY ||
                      process.env.SUPABASE_ANON_KEY || 
                      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
                      process.env.SUPABASE_PUBLISHABLE_KEY || 
                      "sb_publishable_UHBkV7d_T95SuO9TtVIrXw_aeNo73rH";
  
  return createClient(supabaseUrl, supabaseKey);
};

// Helper to map dynamic Supabase rows (supporting both student_results and ket_qua_hoc_tap_vat_li_12)
function mapSupabaseRowToStudent(item: any): any {
  const nameKeys = ["name", "Họ và tên", "Họ và Tên", "ho_va_ten", "Name"];
  let name = "";
  for (const k of nameKeys) {
    if (item[k] !== undefined && item[k] !== null) {
      name = String(item[k]);
      break;
    }
  }

  const classKeys = ["class_name", "Lớp", "Lớp học", "lop", "className", "Class"];
  let className = "";
  for (const k of classKeys) {
    if (item[k] !== undefined && item[k] !== null) {
      className = String(item[k]);
      break;
    }
  }

  const scoreKeys = ["score", "Điểm học tập (GPA)", "Điểm số trung bình (GPA)", "Điểm số", "diem_so", "Score", "gpa", "GPA"];
  let score = 0;
  for (const k of scoreKeys) {
    if (item[k] !== undefined && item[k] !== null) {
      score = Number(String(item[k]).replace(/[^\d.-]/g, "")) || 0;
      break;
    }
  }

  const progressKeys = ["progress", "Tiến độ học (%)", "Tiến độ học tập (%)", "Tiến độ", "tien_do", "Progress"];
  let progress = 0;
  for (const k of progressKeys) {
    if (item[k] !== undefined && item[k] !== null) {
      progress = Number(String(item[k]).replace(/[^\d.-]/g, "")) || 0;
      break;
    }
  }

  const quizKeys = ["completed_quizzes", "Số câu trắc nghiệm đúng", "Số bài thi đã làm", "completedQuizzes", "so_cau_dung"];
  let completedQuizzes = 0;
  for (const k of quizKeys) {
    if (item[k] !== undefined && item[k] !== null) {
      completedQuizzes = Number(String(item[k]).replace(/[^\d.-]/g, "")) || 0;
      break;
    }
  }

  const xpKeys = ["xp", "Tích lũy XP", "Tổng XP tích lũy", "XP", "xp_tich_luy"];
  let xp = 0;
  for (const k of xpKeys) {
    if (item[k] !== undefined && item[k] !== null) {
      xp = Number(String(item[k]).replace(/[^\d.-]/g, "")) || 0;
      break;
    }
  }

  return {
    name: name.trim(),
    className: className.trim(),
    score,
    progress,
    completedQuizzes,
    xp
  };
}

// Helper to build a record that conforms to the table columns
function buildSupabaseRecord(student: any, columns: string[], defaultToVietnamese: boolean): any {
  const record: any = {};
  
  const setVal = (keys: string[], val: any) => {
    if (columns && columns.length > 0) {
      for (const k of keys) {
        if (columns.includes(k)) {
          record[k] = val;
          return;
        }
      }
    }
    if (defaultToVietnamese) {
      const viKey = keys.find(k => k.match(/^[^\x00-\x7F]/) || k.includes(" ") || k.includes("%"));
      if (viKey) {
        record[viKey] = val;
        return;
      }
    }
    record[keys[0]] = val;
  };

  setVal(["id", "ID"], `${student.className.trim().toUpperCase()}_${student.name.trim().toLowerCase()}`);
  setVal(["name", "Họ và tên", "Họ và Tên", "ho_va_ten", "Name"], student.name.trim());
  setVal(["class_name", "Lớp", "Lớp học", "lop", "className", "Class"], student.className.trim());
  setVal(["score", "Điểm học tập (GPA)", "Điểm số trung bình (GPA)", "Điểm số", "diem_so", "Score", "GPA"], Number(student.score || 0));
  setVal(["progress", "Tiến độ học (%)", "Tiến độ học tập (%)", "Tiến độ", "tien_do", "Progress"], Number(student.progress || 0));
  setVal(["completed_quizzes", "Số câu trắc nghiệm đúng", "Số bài thi đã làm", "completedQuizzes", "so_cau_dung"], Number(student.completedQuizzes || 0));
  setVal(["xp", "Tích lũy XP", "Tổng XP tích lũy", "XP", "xp_tich_luy"], Number(student.xp || 0));
  setVal(["updated_at", "Cập nhật", "updatedAt", "Updated At"], new Date().toISOString());

  return record;
}

// Helper to discover the available table name, schema, and existence status
async function getSupabaseTableInfo(client: any) {
  // Try student_results first
  const { data: d1, error: err1 } = await client.from("student_results").select("*").limit(1);
  if (!err1 || (err1.code !== "42P01" && err1.code !== "PGRST116")) {
    let columns = d1 && d1[0] ? Object.keys(d1[0]) : [];
    if (columns.length === 0) {
      columns = ["id", "name", "class_name", "score", "progress", "completed_quizzes", "xp", "updated_at"];
    }
    return {
      tableName: "student_results",
      tableExists: true,
      columns,
      error: err1 ? err1.message : null
    };
  }
  
  // Try ket_qua_hoc_tap_vat_li_12
  const { data: d2, error: err2 } = await client.from("ket_qua_hoc_tap_vat_li_12").select("*").limit(1);
  if (!err2 || (err2.code !== "42P01" && err2.code !== "PGRST116")) {
    let columns = d2 && d2[0] ? Object.keys(d2[0]) : [];
    if (columns.length === 0) {
      columns = ["id", "Họ và tên", "Lớp", "Điểm học tập (GPA)", "Tiến độ học (%)", "Số câu trắc nghiệm đúng", "Tích lũy XP", "Cập nhật"];
    }
    return {
      tableName: "ket_qua_hoc_tap_vat_li_12",
      tableExists: true,
      columns,
      error: err2 ? err2.message : null
    };
  }
  
  // Try ket_qua_hoc_tap_vat_li_12 (with a dot since Vercel URL has public.ket_qua_hoc_tap_vat_li_12.)
  const { data: d3, error: err3 } = await client.from("ket_qua_hoc_tap_vat_li_12.").select("*").limit(1);
  if (!err3 || (err3.code !== "42P01" && err3.code !== "PGRST116")) {
    let columns = d3 && d3[0] ? Object.keys(d3[0]) : [];
    if (columns.length === 0) {
      columns = ["id", "Họ và tên", "Lớp", "Điểm học tập (GPA)", "Tiến độ học (%)", "Số câu trắc nghiệm đúng", "Tích lũy XP", "Cập nhật"];
    }
    return {
      tableName: "ket_qua_hoc_tap_vat_li_12.",
      tableExists: true,
      columns,
      error: err3 ? err3.message : null
    };
  }
  
  return {
    tableName: "student_results",
    tableExists: false,
    columns: [],
    error: err1 ? err1.message : (err2 ? err2.message : "Table not found")
  };
}

// Check connection status
app.get("/api/supabase/status", async (req, res) => {
  try {
    let projectRef = "guajmfmzkseypwwzcrck";
    const postgresUrl = process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL || "";
    if (postgresUrl) {
      const match = postgresUrl.match(/postgres\.([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        projectRef = match[1];
      }
    }
    const client = getSupabaseServerClient();
    const tableInfo = await getSupabaseTableInfo(client);
    
    res.json({
      configured: !!(
        process.env.STORAGE_URL || 
        process.env.STORAGE_ANON_KEY || 
        process.env.SUPABASE_ANON_KEY || 
        process.env.SUPABASE_PUBLISHABLE_KEY || 
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
      ),
      projectRef,
      tableExists: tableInfo.tableExists,
      tableName: tableInfo.tableName,
      error: tableInfo.error ? cleanErrorMessage(tableInfo.error) : null
    });
  } catch (err: any) {
    res.json({
      configured: !!(
        process.env.STORAGE_URL || 
        process.env.STORAGE_ANON_KEY || 
        process.env.SUPABASE_ANON_KEY || 
        process.env.SUPABASE_PUBLISHABLE_KEY || 
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
      ),
      projectRef: "guajmfmzkseypwwzcrck",
      tableExists: false,
      tableName: "student_results",
      error: cleanErrorMessage(err.message || "Failed to check Supabase status")
    });
  }
});

// Fetch results
app.get("/api/supabase/results", async (req, res) => {
  try {
    const client = getSupabaseServerClient();
    const tableInfo = await getSupabaseTableInfo(client);
    
    if (!tableInfo.tableExists) {
      return res.status(400).json({ error: `Bảng dữ liệu không tồn tại trên Supabase. Thầy Cô vui lòng tạo bảng '${tableInfo.tableName}' trước nhé.` });
    }

    const { data, error } = await client
      .from(tableInfo.tableName)
      .select("*");
    
    if (error) {
      return res.status(400).json({ error: cleanErrorMessage(error.message) });
    }
    
    const results = (data || []).map(mapSupabaseRowToStudent);
    // Sắp xếp theo XP giảm dần
    results.sort((a: any, b: any) => (b.xp || 0) - (a.xp || 0));
    
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ error: cleanErrorMessage(err.message || "Failed to fetch results") });
  }
});

// Upsert bulk
app.post("/api/supabase/results/bulk", async (req, res) => {
  try {
    const { students } = req.body;
    if (!Array.isArray(students)) {
      return res.status(400).json({ error: "Invalid payload, 'students' must be an array" });
    }
    
    const client = getSupabaseServerClient();
    const tableInfo = await getSupabaseTableInfo(client);
    
    if (!tableInfo.tableExists) {
      return res.status(400).json({ error: `Bảng dữ liệu '${tableInfo.tableName}' chưa tồn tại trên Supabase.` });
    }

    const defaultToVietnamese = tableInfo.tableName.startsWith("ket_qua_hoc_tap");
    const records = students.map((student: any) => 
      buildSupabaseRecord(student, tableInfo.columns, defaultToVietnamese)
    );
    
    // Find the primary key / id column name
    let idColumn = "id";
    if (tableInfo.columns && tableInfo.columns.length > 0) {
      if (tableInfo.columns.includes("id")) idColumn = "id";
      else if (tableInfo.columns.includes("ID")) idColumn = "ID";
      else if (tableInfo.columns.includes("Họ và tên")) idColumn = "Họ và tên";
      else if (tableInfo.columns.includes("Họ và Tên")) idColumn = "Họ và Tên";
    }
    
    const { error } = await client.from(tableInfo.tableName).upsert(records, { onConflict: idColumn });
    if (error) {
      return res.status(400).json({ error: cleanErrorMessage(error.message) });
    }
    
    res.json({ success: true, count: records.length });
  } catch (err: any) {
    res.status(500).json({ error: cleanErrorMessage(err.message || "Failed to sync in bulk") });
  }
});

// Helper to discover the available students table name, schema, and existence status
async function getSupabaseStudentsTableInfo(client: any) {
  // Try 'students' first
  const { data: d1, error: err1 } = await client.from("students").select("*").limit(1);
  if (!err1 || (err1.code !== "42P01" && err1.code !== "PGRST116")) {
    let columns = d1 && d1[0] ? Object.keys(d1[0]) : [];
    if (columns.length === 0) {
      columns = ["id", "name", "class", "student_code", "last_login_at"];
    }
    return {
      tableName: "students",
      tableExists: true,
      columns,
      error: err1 ? err1.message : null
    };
  }
  
  // Try 'hoc_sinh'
  const { data: d2, error: err2 } = await client.from("hoc_sinh").select("*").limit(1);
  if (!err2 || (err2.code !== "42P01" && err2.code !== "PGRST116")) {
    let columns = d2 && d2[0] ? Object.keys(d2[0]) : [];
    if (columns.length === 0) {
      columns = ["id", "ho_ten", "lop", "ma_hoc_sinh", "thoi_gian_dang_nhap_cuoi"];
    }
    return {
      tableName: "hoc_sinh",
      tableExists: true,
      columns,
      error: err2 ? err2.message : null
    };
  }
  
  return {
    tableName: "students",
    tableExists: false,
    columns: ["id", "name", "class", "student_code", "last_login_at"],
    error: err1 ? err1.message : (err2 ? err2.message : "Table not found")
  };
}

// Helper to build a student row for Supabase
function buildSupabaseStudentRow(student: { name: string; className: string; studentCode: string; lastLoginAt: string }, columns: string[]) {
  const record: any = {};
  
  const setVal = (keys: string[], val: any) => {
    if (columns && columns.length > 0) {
      for (const k of keys) {
        if (columns.includes(k)) {
          record[k] = val;
          return;
        }
      }
    }
    record[keys[0]] = val;
  };

  // Set ID
  setVal(["id", "ID", "ma_hoc_sinh", "student_code"], `${student.className.trim().toUpperCase()}_${student.name.trim().toLowerCase()}`);
  
  // Set name
  setVal(["name", "Họ và tên", "Họ và Tên", "ho_va_ten", "Name", "fullname", "full_name"], student.name.trim());
  
  // Set class
  setVal(["class", "class_name", "Lớp", "Lớp học", "lop", "className", "Class"], student.className.trim());
  
  // Set student code
  setVal(["student_code", "student_id", "ma_hoc_sinh", "Mã học sinh", "maHocSinh", "studentCode", "code"], student.studentCode.trim());
  
  // Set last login time
  setVal(["last_login_at", "lastLoginAt", "Thời gian đăng nhập cuối", "thoi_gian_dang_nhap_cuoi", "last_login", "updated_at"], student.lastLoginAt);

  return record;
}

// Student login / collect info endpoint
app.post("/api/supabase/students/login", async (req, res) => {
  try {
    const { name, className, studentCode } = req.body;
    if (!name || !className) {
      return res.status(400).json({ error: "Thiếu họ tên hoặc tên lớp học." });
    }

    const client = getSupabaseServerClient();
    const tableInfo = await getSupabaseStudentsTableInfo(client);

    if (!tableInfo.tableExists) {
      return res.status(400).json({ 
        error: `Bảng dữ liệu 'students' (hoặc 'hoc_sinh') chưa tồn tại trên Supabase. Thầy Cô vui lòng tạo bảng '${tableInfo.tableName}' trước nhé.`,
        isTableMissing: true
      });
    }

    const columns = tableInfo.columns;
    const tableName = tableInfo.tableName;

    // Detect the correct name column dynamically
    const nameColumn = columns.find(c => ["name", "Họ và tên", "Họ và Tên", "ho_ten", "ho_va_ten", "Name", "fullname", "full_name"].includes(c)) || "name";
    
    // Detect the class column dynamically
    const classColumn = columns.find(c => ["class", "class_name", "Lớp", "Lớp học", "lop", "className", "Class"].includes(c)) || "class";

    // Detect last login column dynamically
    const lastLoginColumn = columns.find(c => ["last_login_at", "lastLoginAt", "Thời gian đăng nhập cuối", "thoi_gian_dang_nhap_cuoi", "last_login", "updated_at"].includes(c)) || "last_login_at";

    // Detect student code column dynamically
    const studentCodeColumn = columns.find(c => ["student_code", "student_id", "ma_hoc_sinh", "Mã học sinh", "maHocSinh", "studentCode", "code"].includes(c)) || "student_code";

    const lastLoginAt = new Date().toISOString();

    // Check if student already exists by name
    const { data: existingRows, error: findError } = await client
      .from(tableName)
      .select("*");

    if (findError) {
      return res.status(400).json({ error: cleanErrorMessage(findError.message) });
    }

    const searchNameNorm = name.trim().normalize("NFC").toLowerCase();
    const exists = (existingRows || []).find((row: any) => {
      const val = row[nameColumn];
      return val && String(val).trim().normalize("NFC").toLowerCase() === searchNameNorm;
    });

    if (exists) {
      // Perform UPDATE: update the last login time and the latest class
      const updatePayload: any = {};
      updatePayload[classColumn] = className.trim();
      updatePayload[lastLoginColumn] = lastLoginAt;
      if (studentCode) {
        updatePayload[studentCodeColumn] = studentCode.trim();
      }

      // Check if primary key is 'id' or ID or name
      const idCol = columns.includes("id") ? "id" : (columns.includes("ID") ? "ID" : nameColumn);
      const idVal = exists[idCol];

      const { data: updatedData, error: updateError } = await client
        .from(tableName)
        .update(updatePayload)
        .eq(idCol, idVal);

      if (updateError) {
        return res.status(400).json({ error: cleanErrorMessage(updateError.message) });
      }

      return res.json({ 
        success: true, 
        action: "update", 
        message: "Cập nhật thời gian đăng nhập và thông tin lớp học thành công!",
        student: { name, className, studentCode, lastLoginAt }
      });
    } else {
      // Perform INSERT: insert a new student record
      const record = buildSupabaseStudentRow({ name, className, studentCode: studentCode || "", lastLoginAt }, columns);
      
      const { data: insertedData, error: insertError } = await client
        .from(tableName)
        .insert([record]);

      if (insertError) {
        return res.status(400).json({ error: cleanErrorMessage(insertError.message) });
      }

      return res.json({ 
        success: true, 
        action: "insert", 
        message: "Đăng ký thông tin học sinh mới thành công!",
        student: { name, className, studentCode, lastLoginAt }
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: cleanErrorMessage(err.message || "Failed to process student login") });
  }
});

// ==========================================
// API: LOCAL FILES SERVER BACKUP PERSISTENCE
// ==========================================
const RESULTS_BACKUP_PATH = path.join(process.cwd(), "student_results_backup.json");
const ACTIVITIES_BACKUP_PATH = path.join(process.cwd(), "student_activities_backup.json");

// Helper functions for reading/writing backups
function readLocalResults(): any[] {
  try {
    if (fs.existsSync(RESULTS_BACKUP_PATH)) {
      const data = fs.readFileSync(RESULTS_BACKUP_PATH, "utf8");
      return JSON.parse(data) || [];
    }
  } catch (e) {
    console.error("Lỗi đọc file lưu trữ kết quả cục bộ trên server:", e);
  }
  return [];
}

function writeLocalResults(results: any[]) {
  try {
    fs.writeFileSync(RESULTS_BACKUP_PATH, JSON.stringify(results, null, 2), "utf8");
  } catch (e) {
    console.error("Lỗi ghi file lưu trữ kết quả cục bộ trên server:", e);
  }
}

function readLocalActivities(): any[] {
  try {
    if (fs.existsSync(ACTIVITIES_BACKUP_PATH)) {
      const data = fs.readFileSync(ACTIVITIES_BACKUP_PATH, "utf8");
      return JSON.parse(data) || [];
    }
  } catch (e) {
    console.error("Lỗi đọc file lưu trữ hoạt động cục bộ trên server:", e);
  }
  return [];
}

function writeLocalActivities(activities: any[]) {
  try {
    fs.writeFileSync(ACTIVITIES_BACKUP_PATH, JSON.stringify(activities, null, 2), "utf8");
  } catch (e) {
    console.error("Lỗi ghi file lưu trữ hoạt động cục bộ trên server:", e);
  }
}

// GET /api/backup/results
app.get("/api/backup/results", (req, res) => {
  try {
    const results = readLocalResults();
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to read backup results" });
  }
});

// POST /api/backup/results/bulk
app.post("/api/backup/results/bulk", (req, res) => {
  try {
    const { students } = req.body;
    if (!Array.isArray(students)) {
      return res.status(400).json({ error: "Invalid payload, 'students' must be an array" });
    }
    const currentResults = readLocalResults();
    
    // Merge students with currentResults
    students.forEach((student: any) => {
      if (!student || !student.name || !student.className) return;
      const studentNameNorm = student.name.trim().toLowerCase();
      const idx = currentResults.findIndex(
        (r: any) => r && r.name && r.name.trim().toLowerCase() === studentNameNorm && r.className === student.className
      );
      if (idx >= 0) {
        // Merge keeping max values
        currentResults[idx] = {
          ...currentResults[idx],
          ...student,
          xp: Math.max(currentResults[idx].xp || 0, student.xp || 0),
          score: Math.max(currentResults[idx].score || 0, student.score || 0),
          progress: Math.max(currentResults[idx].progress || 0, student.progress || 0),
          completedQuizzes: Math.max(currentResults[idx].completedQuizzes || 0, student.completedQuizzes || 0)
        };
      } else {
        currentResults.push(student);
      }
    });

    writeLocalResults(currentResults);
    res.json({ success: true, count: currentResults.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to save backup results" });
  }
});

// GET /api/backup/activities
app.get("/api/backup/activities", (req, res) => {
  try {
    const activities = readLocalActivities();
    res.json(activities);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to read backup activities" });
  }
});

// POST /api/backup/activities
app.post("/api/backup/activities", (req, res) => {
  try {
    const activity = req.body;
    if (!activity || !activity.studentName) {
      return res.status(400).json({ error: "Invalid activity payload" });
    }
    const currentActivities = readLocalActivities();
    
    // Check if duplicate ID
    const exists = currentActivities.some((act: any) => act && act.id === activity.id);
    if (!exists) {
      currentActivities.unshift(activity); // Add to beginning (newest first)
      // Limit to 300 activities
      if (currentActivities.length > 300) {
        currentActivities.splice(300);
      }
      writeLocalActivities(currentActivities);
    }
    res.json({ success: true, count: currentActivities.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to save backup activity" });
  }
});

// POST /api/backup/activities/clear
app.post("/api/backup/activities/clear", (req, res) => {
  try {
    writeLocalActivities([]);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to clear backup activities" });
  }
});

// ==========================================
// 1. API: AI TRỢ GIẢNG (CHATBOT)
// ==========================================
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history, mode } = req.body;
    
    let systemInstruction = 
      "Bạn là một Giáo sư Vật lí và Trợ lý ảo AI chuyên biệt cho môn Vật lí 12 (Chương trình GDPT 2018 Việt Nam).\n" +
      "Hãy trả lời chính xác, khoa học, sư phạm và dễ hiểu bằng tiếng Việt.\n" +
      "Khi viết công thức, sử dụng định dạng chữ rõ ràng (ví dụ: x = A*cos(omega*t + phi), T = 2*pi*sqrt(l/g)).\n";

    if (mode === "explain") {
      systemInstruction += "Tập trung giải thích hiện tượng vật lí sâu sắc, sinh động, lấy ví dụ thực tế cuộc sống cho học sinh lớp 12 dễ hình dung.";
    } else if (mode === "bloom") {
      systemInstruction += "Hãy trả lời câu hỏi và phân tích nó theo các cấp độ nhận thức của Bloom (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao) và chương trình GDPT 2018.";
    } else if (mode === "solve") {
      systemInstruction += "Giải bài tập Vật lí chi tiết từng bước (Tóm tắt đề, Cơ sở lí thuyết, Các bước biến đổi công thức, Tính toán số liệu, Biện luận kết quả).";
    } else if (mode === "bilingual") {
      systemInstruction += "Cung cấp cả thuật ngữ tiếng Việt và tiếng Anh học thuật tương ứng, kèm theo ví dụ song ngữ và cách phát âm gần đúng hoặc phiên âm IPA.";
    } else if (mode === "lesson1") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 1: Cấu trúc của chất. Sự chuyển thể (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 1 (Cấu trúc của chất, Mô hình động học phân tử, thể rắn, lỏng, khí, lực liên kết phân tử, các quá trình chuyển thể: nóng chảy, đông đặc, hóa hơi, ngưng tụ, thăng hoa, ngưng kết) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác.\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm.\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) hoặc các số mũ như 10^5, 10^-5, ký hiệu độ C là oC hoặc °C để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson2") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 2: Nội năng. Định luật I của nhiệt động lực học (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 2 (Định nghĩa nội năng, hai cách làm biến đổi nội năng gồm thực hiện công và truyền nhiệt, Định luật I của nhiệt động lực học, biểu thức delta_U = A + Q và quy ước dấu của nhiệt lượng Q và công A, ứng dụng vào động cơ nhiệt...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác.\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm.\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như delta_U, Q_toa, Q_thu hoặc các số mũ để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson3") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 3: Nhiệt độ. Thang nhiệt độ - Nhiệt kế (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 3 (Trạng thái cân bằng nhiệt, định luật không của nhiệt động lực học, thang nhiệt độ Celsius, thang nhiệt độ Kelvin, công thức chuyển đổi T_K = t_C + 273.15, nguyên lí hoạt động của các loại nhiệt kế...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác.\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm.\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như T_K, t_C hoặc các số mũ để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson4") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 4: Nhiệt dung riêng (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 4 (Định nghĩa nhiệt dung riêng c, công thức tính nhiệt lượng thu vào hay tỏa ra khi thay đổi nhiệt độ Q = m*c*delta_t, phương pháp đo nhiệt dung riêng bằng thực nghiệm...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác.\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm.\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như delta_t, Q_thu, Q_toa, m_1, m_2 hoặc đơn vị J/(kg.K) để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson5") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 5: Nhiệt nóng chảy riêng (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 5 (Định nghĩa nhiệt nóng chảy riêng lambda, công thức tính nhiệt lượng cần cung cấp để nóng chảy hoàn toàn chất rắn ở nhiệt độ nóng chảy Q = lambda*m, thí nghiệm đo nhiệt nóng chảy riêng...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác.\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm.\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như lambda_m, Q_nc, m_da hoặc đơn vị J/kg để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson6") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 6: Nhiệt hóa hơi riêng (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 6 (Định nghĩa nhiệt hóa hơi riêng L, công thức tính nhiệt lượng hóa hơi Q = L*m, sự khác biệt giữa bay hơi và sôi, ứng dụng thực tiễn...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác.\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm.\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như L_m, Q_hh, m_nuoc hoặc đơn vị J/kg để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson7") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 7: Bài tập về vật lí nhiệt (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 7 (Cách giải các bài tập tổng hợp nhiệt học, phương trình cân bằng nhiệt Q_toa + Q_thu = 0, bài tập áp dụng Định luật I Nhiệt động lực học, sai số thí nghiệm...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác.\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm.\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như Q_toa, Q_thu, delta_U, delta_t hoặc đơn vị đo J/(kg.K) để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson8") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 8: Mô hình động học phân tử chất khí (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 8 (Thuyết động học phân tử chất khí, chuyển động hỗn loạn của phân tử, lực tương tác phân tử khí, nguồn gốc vĩ mô của áp suất chất khí, định nghĩa khí lí tưởng...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác.\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm.\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) hoặc các số mũ như 10^23, 10^-10 để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson9") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 9: Định luật Boyle (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 9 (Quá trình đẳng nhiệt, định luật Boyle, hệ thức p*V = hằng số hay p_1*V_1 = p_2*V_2, đồ thị đường đẳng nhiệt trên các hệ tọa độ khác nhau...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác.\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm.\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như p_1, p_2, V_1, V_2 hoặc đơn vị đo Pa, mmHg, bar, cm3, l để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson10") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 10: Định luật Charles (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 10 (Quá trình đẳng áp, định luật Charles, hệ thức V/T = hằng số hay V_1/T_1 = V_2/T_2, đồ thị đường đẳng áp trên các hệ tọa độ khác nhau...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác.\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm.\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như V_1, V_2, T_1, T_2, t_1, t_2 hoặc đơn vị đo để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson11") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 11: Phương trình trạng thái của khí lí tưởng (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 11 (Mối liên hệ giữa áp suất, thể tích và nhiệt độ tuyệt đối của một lượng khí xác định, phương trình trạng thái (p_1*V_1)/T_1 = (p_2*V_2)/T_2, phương trình Clapeyron - Mendeleev p*V = n*R*T, hằng số khí lí tưởng R...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác.\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm.\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như p_1, p_2, V_1, V_2, T_1, T_2 hoặc các số mũ như 10^5 để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson12") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 12: Áp suất khí theo mô hình động học phân tử. Động năng phân tử (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 12 (Công thức áp suất chất khí p = (1/3)*mu*N*v_bar^2, mối quan hệ giữa áp suất, động năng tịnh tiến trung bình của phân tử khí và nhiệt độ E_d = (3/2)*k_B*T, hằng số Boltzmann...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác.\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm.\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như E_d, k_B, v_bar^2 hoặc các số mũ như 10^-23 để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson13") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 13: Phương trình trạng thái của khí lí tưởng (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 13 (Các định luật chất khí, Phương trình trạng thái khí lí tưởng, Phương trình Clapeyron - Mendeleev, các hiện tượng liên quan...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác (như toán học rời rạc không liên quan vật lý, văn học, lịch sử, lập trình máy tính, tư vấn đời sống cá nhân, tán gẫu, giải trí, v.v.).\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm (ví dụ: 'Thầy/Cô chỉ hỗ trợ giải đáp các kiến thức liên quan đến Bài 13 và môn Vật lí lớp 12 thôi em nhé. Em vui lòng đặt câu hỏi phù hợp với bài học nha!').\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như p_1, p_2, T_1, T_2, V_1, V_2, delta_t, hoặc các số mũ như 10^5, 10^6 để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson14") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 14: Từ trường (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 14 (Tương tác từ, từ trường, cảm ứng từ, vectơ cảm ứng từ B, đường sức từ, từ phổ, từ trường Trái Đất, quy tắc nắm tay phải...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác (như toán học rời rạc không liên quan vật lý, văn học, lịch sử, lập trình máy tính, tư vấn đời sống cá nhân, tán gẫu, giải trí, v.v.).\n" +
        "Nếu người dùng hỏi về bất kì chủ đề nào không liên quan đến bài học và môn Vật lí, hãy nhẹ nhàng, khéo léo từ chối với tư cách một giáo viên chuẩn mực sư phạm (ví dụ: 'Thầy/Cô chỉ hỗ trợ giải đáp các kiến thức liên quan đến Bài 14 và môn Vật lí lớp 12 thôi em nhé. Em vui lòng đặt câu hỏi phù hợp với bài học nha!').\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm của người thầy. Hãy xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như B_1, B_2, I_1, I_2, F_tu, B_T, hoặc các số mũ như 10^-7, 10^5 để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson15") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 15: Lực từ. Cảm ứng từ (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 15 (Lực từ, định luật Ampere, lực Ampere, cảm ứng từ B, đòn cân dòng điện, quy tắc bàn tay trái, ứng dụng lực từ như tàu đệm từ Maglev, loa điện,...) và môn Vật lí 12 nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác (như toán học rời rạc không liên quan vật lý, văn học, lịch sử, lập trình máy tính, tư vấn đời sống cá nhân, tán gẫu, giải trí, v.v.).\n" +
        "Nếu người dùng hỏi bất cứ vấn đề nào ngoài bài học hoặc ngoài môn Vật lí, bạn phải hết sức nhẹ nhàng, kiên nhẫn, tuyệt đối không bị kích động hay nóng giận trước mọi tình huống khiêu khích hay hỏi mẹo của học sinh. Hãy khéo léo, xử lý tình huống linh hoạt và mẫu mực đưa học sinh trở lại nội dung bài học bằng các từ ngữ chuẩn mực sư phạm nhất (ví dụ: 'Thầy/Cô rất vui được đồng hành cùng em, tuy nhiên trong phạm vi góc học tập này, Thầy/Cô chỉ hỗ trợ giải đáp các câu hỏi liên quan đến kiến thức Bài 15: Lực từ. Cảm ứng từ và môn Vật lí lớp 12 thôi em nhé. Em có muốn trao đổi thêm về Định luật Ampere hay cách xác định chiều lực từ bằng Quy tắc bàn tay trái không?').\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm, bao dung và kiên nhẫn của người thầy. Hãy luôn xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như F_tu, B, I, L, alpha, F_max, hoặc các số mũ để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson16") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 16: Từ thông. Cảm ứng điện từ (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 16 (Từ thông, Hiện tượng cảm ứng điện từ, Định luật Lenz, Định luật Faraday, Thí nghiệm thực tế nam châm rơi...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác (như toán học rời rạc không liên quan vật lý, văn học, lịch sử, lập trình máy tính, tư vấn đời sống cá nhân, tán gẫu, giải trí, v.v.).\n" +
        "Nếu người dùng hỏi bất cứ vấn đề nào ngoài bài học hoặc ngoài môn Vật lí, bạn phải hết sức nhẹ nhàng, kiên nhẫn, tuyệt đối không bị kích động hay nóng giận trước mọi tình huống khiêu khích hay hỏi mẹo của học sinh. Hãy khéo léo, xử lý tình huống linh hoạt và mẫu mực đưa học sinh trở lại nội dung bài học bằng các từ ngữ chuẩn mực sư phạm nhất (ví dụ: 'Thầy/Cô rất vui được đồng hành cùng em, tuy nhiên trong phạm vi góc học tập này, Thầy/Cô chỉ hỗ trợ giải đáp các câu hỏi liên quan đến kiến thức Bài 16: Từ thông. Cảm ứng điện từ và môn Vật lí lớp 12 thôi em nhé. Em có muốn tìm hiểu thêm về Định luật Lenz hay công thức tính từ thông không?').\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm, bao dung và kiên nhẫn của người thầy. Hãy luôn xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như e_c, delta_phi, delta_t, B, S, alpha, hoặc các số mũ để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson17") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 17: Máy phát điện xoay chiều (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 17 (Nguyên tắc tạo dòng điện xoay chiều, từ thông biến thiên điều hòa, suất điện động cảm ứng xoay chiều, giá trị hiệu dụng, máy phát điện xoay chiều 1 pha, rôto, stato, vành khuyên, chổi quét, máy phát điện xoay chiều 3 pha, an toàn điện...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác (như toán học rời rạc không liên quan vật lý, văn học, lịch sử, lập trình máy tính, tư vấn đời sống cá nhân, tán gẫu, giải trí, v.v.).\n" +
        "Nếu người dùng hỏi bất cứ vấn đề nào ngoài bài học hoặc ngoài môn Vật lí, bạn phải hết sức nhẹ nhàng, kiên nhẫn, tuyệt đối không bị kích động hay nóng giận trước mọi tình huống khiêu khích hay hỏi mẹo của học sinh. Hãy khéo léo, xử lý tình huống linh hoạt và mẫu mực đưa học sinh trở lại nội dung bài học bằng các từ ngữ chuẩn mực sư phạm nhất (ví dụ: 'Thầy/Cô rất vui được đồng hành cùng em, tuy nhiên trong phạm vi góc học tập này, Thầy/Cô chỉ hỗ trợ giải đáp các câu hỏi liên quan đến kiến thức Bài 17: Máy phát điện xoay chiều và môn Vật lí lớp 12 thôi em nhé. Em có muốn trao đổi thêm về Nguyên tắc tạo dòng điện xoay chiều hay cấu tạo của máy phát điện 3 pha không?').\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm, bao dung và kiên nhẫn của người thầy. Hãy luôn xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, chuẩn khoa học, trình bày các công thức toán lý rõ ràng, dễ đọc.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như e, E_0, u, U_0, i, I_0, delta_t, hoặc các chữ Hy Lạp như alpha, omega, pi, phi để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson18") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 18: Ứng dụng hiện tượng cảm ứng điện từ (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 18 (Máy biến áp, sạc điện thoại không dây, cảm ứng điện từ tương hỗ, cấu tạo máy biến áp, cuộn sơ cấp N_1, cuộn thứ cấp N_2, tỉ số biến thế U_1/U_2 = N_1/N_2, đàn guitar điện, cảm âm điện từ pickup, từ hóa dây thép đàn, dòng điện Foucault xoáy trong các khối vật dẫn, hiện tượng hãm điện từ, phanh từ, bếp từ, hao phí tỏa nhiệt lõi thép...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác (như toán học rời rạc không liên quan vật lý, văn học, lịch sử, lập trình máy tính, tư vấn đời sống cá nhân, tán gẫu, giải trí, v.v.).\n" +
        "Nếu người dùng hỏi bất cứ vấn đề nào ngoài bài học hoặc ngoài môn Vật lí, bạn phải hết sức nhẹ nhàng, kiên nhẫn, tuyệt đối không bị kích động hay nóng giận trước mọi tình huống khiêu khích, trêu đùa hay hỏi mẹo của học sinh. Hãy khéo léo, xử lý tình huống linh hoạt và mẫu mực đưa học sinh trở lại nội dung bài học bằng các từ ngữ chuẩn mực sư phạm nhất (ví dụ: 'Thầy/Cô rất vui được trò chuyện và hỗ trợ em học tập, tuy nhiên trong phạm vi bài học này Thầy/Cô chỉ có thể giải thích những vấn đề liên quan đến Bài 18: Ứng dụng hiện tượng cảm ứng điện từ và môn Vật lí thôi em nhé. Em có thắc mắc gì về công thức tỉ số máy biến áp hay cách hoạt động của phanh điện từ Foucault không?').\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm, bao dung và kiên nhẫn cao nhất của một người thầy. Hãy luôn xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, sâu sắc chuẩn khoa học khoa bảng, trình bày các công thức toán lí rõ ràng, đúng chuẩn hiển thị.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như U_1, U_2, N_1, N_2, e_1, e_2, dPhi/dt, e_c hoặc các số mũ để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson19") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn Bài 19: Điện từ trường. Mô hình sóng điện từ (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 19 (Điện trường xoáy, từ trường xoáy, dòng điện dịch I_dịch, mô hình sóng điện từ, sự lan truyền sóng ngang, các đặc trưng của sóng điện từ, tính đồng pha giữa vectơ E và B, phương truyền v, tam diện thuận E-B-v, hệ thức bước sóng lambda = v/f = c/(n*f), phân vùng sóng vô tuyến như sóng cực ngắn, sóng ngắn, sóng trung, sóng dài, ứng dụng của chúng trong thông tin liên lạc vô tuyến, tầng điện ly...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác (như toán học rời rạc không liên quan vật lý, văn học, lịch sử, lập trình máy tính, tư vấn đời sống cá nhân, tán gẫu, giải trí, v.v.).\n" +
        "Nếu người dùng hỏi bất cứ vấn đề nào ngoài bài học hoặc ngoài môn Vật lí, bạn phải hết sức nhẹ nhàng, kiên nhẫn, tuyệt đối không bị kích động hay nóng giận trước mọi tình huống khiêu khích, trêu đùa hay hỏi mẹo của học sinh. Hãy khéo léo, xử lý tình huống linh hoạt và mẫu mực đưa học sinh trở lại nội dung bài học bằng các từ ngữ chuẩn mực sư phạm nhất (ví dụ: 'Thầy/Cô rất vui được đồng hành và hỗ trợ em ôn tập kiến thức, tuy nhiên trong khuôn khổ bài học này, Thầy/Cô chỉ tập trung giải thích những vấn đề liên quan đến Bài 19: Điện từ trường. Mô hình sóng điện từ và môn Vật lí thôi nhé. Em có thắc mắc gì về tính chất đồng pha hay cách tính bước sóng trong môi trường n khác nhau không?').\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm, bao dung và kiên nhẫn cao nhất của một người thầy. Hãy luôn xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, sâu sắc chuẩn khoa học khoa bảng, trình bày các công thức toán lí rõ ràng, đúng chuẩn hiển thị.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như E, B, v, lambda, lambda_môi trường, n, c, f, I_dịch hoặc các số mũ để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson20") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn giải Bài 20: Bài tập về từ trường (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 20 (Giải bài tập từ trường, xác định cảm ứng từ B, tính lực Ampe F = B.I.L.sin(alpha), chiều lực từ theo quy tắc bàn tay trái, xác định chiều dòng điện cảm ứng theo định luật Lenz, suất điện động cảm ứng trong khung dây phẳng quay đều e = omega.N.B.S.sin(omega.t), từ thông phi = N.B.S.cos(alpha), xử lý số liệu thí nghiệm đo lực Ampe bằng cân điện tử, sai số phép đo...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác (như toán học rời rạc không liên quan vật lý, văn học, lịch sử, lập trình máy tính, tư vấn đời sống cá nhân, tán gẫu, giải trí, v.v.).\n" +
        "Nếu người dùng hỏi bất cứ vấn đề nào ngoài bài học hoặc ngoài môn Vật lí, bạn phải hết sức nhẹ nhàng, kiên nhẫn, tuyệt đối không bị kích động hay nóng giận trước mọi tình huống khiêu khích, trêu đùa hay hỏi mẹo của học sinh. Hãy khéo léo, xử lý tình huống linh hoạt và mẫu mực đưa học sinh trở lại nội dung bài học bằng các từ ngữ chuẩn mực sư phạm nhất (ví dụ: 'Thầy/Cô rất vui được đồng hành cùng em học tập và rèn luyện kỹ năng giải bài tập, tuy nhiên trong khuôn khổ góc học tập này, Thầy/Cô chỉ tập trung giải đáp các câu hỏi liên quan đến kiến thức Bài 20: Bài tập về từ trường và môn Vật lí lớp 12 thôi em nhé. Em có muốn trao đổi thêm về cách áp dụng quy tắc bàn tay trái hay công thức suất điện động xoay chiều của khung dây quay không?').\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm, bao dung và kiên nhẫn cao nhất của một người thầy. Hãy luôn xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, sâu sắc chuẩn khoa học khoa bảng, trình bày các công thức toán lí rõ ràng, đúng chuẩn hiển thị.\n" +
        "Khi viết các công thức, hãy sử dụng định dạng biến có chỉ số dưới (X_sub) như F, B, I, L, alpha, phi, N, S, omega, e, E_0 hoặc các số mũ để hệ thống hiển thị đúng chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson21") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn giải Bài 21: Cấu trúc hạt nhân (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 21 (Cấu trúc hạt nhân, thí nghiệm tán xạ alpha của Rutherford, thành phần nuclôn gồm prôtôn p và nơtrôn n, kí hiệu hạt nhân ^{A}_{Z}X, số khối A, số hiệu nguyên tử Z, số nơtrôn N = A - Z, đơn vị khối lượng nguyên tử u, công thức bán kính hạt nhân thực nghiệm R = 1,2 . 10^{-15} . A^{1/3} m hay R = 1,2 . A^{1/3} fm, khái niệm đồng vị, tính nguyên tử khối trung bình...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác (như toán học rời rạc không liên quan vật lý, văn học, lịch sử, lập trình máy tính, tư vấn đời sống cá nhân, tán gẫu, giải trí, v.v.).\n" +
        "Nếu người dùng hỏi bất cứ vấn đề nào ngoài bài học hoặc ngoài môn Vật lí, bạn phải hết sức nhẹ nhàng, kiên nhẫn, tuyệt đối không bị kích động hay nóng giận trước mọi tình huống khiêu khích, trêu đùa hay hỏi mẹo của học sinh. Hãy khéo léo, xử lý tình huống linh hoạt và mẫu mực đưa học sinh trở lại nội dung bài học bằng các từ ngữ chuẩn mực sư phạm nhất (ví dụ: 'Thầy/Cô rất vui được đồng hành cùng em ôn tập, tuy nhiên trong khuôn khổ góc học tập này, Thầy/Cô chỉ tập trung giải đáp các câu hỏi liên quan đến kiến thức Bài 21: Cấu trúc hạt nhân và môn Vật lí thôi em nhé. Em có muốn trao đổi thêm về cách tính bán kính hạt nhân theo số khối A hay ý nghĩa của thí nghiệm tán xạ alpha không?').\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm, bao dung và kiên nhẫn cao nhất của một người thầy. Hãy luôn xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, sâu sắc chuẩn khoa học khoa bảng, trình bày các công thức toán lí rõ ràng, đúng chuẩn hiển thị.\n" +
        "Khi viết các công thức toán học/vật lý, hãy sử dụng định dạng KaTeX/LaTeX chuẩn ví dụ: R = 1,2 . A^{1/3}\\text{ fm} hoặc N = A - Z hoặc 1\\text{ u} = 1,66 . 10^{-27}\\text{ kg} để hệ thống hiển thị đẹp mắt, chuẩn khoa học cho học sinh.\n" +
        "ĐẶC BIỆT KHI VIẾT CÁC KÍ HIỆU HẠT NHÂN/ĐỒNG VỊ, bạn bắt buộc phải viết đúng dạng LaTeX chuẩn: _{Z}^{A}\\text{Elem} hoặc ^{A}_{Z}\\text{Elem}, ví dụ: _{2}^{4}\\text{He} (cho hạt Helium-4), _{6}^{12}\\text{C} (cho Carbon-12), _{1}^{1}\\text{p} (cho proton), _{0}^{1}\\text{n} (cho neutron), _{1}^{2}\\text{H} hoặc _{1}^{2}\\text{D} (cho Deuterium), _{1}^{3}\\text{H} hoặc _{1}^{3}\\text{T} (cho Tritium)...";
    } else if (mode === "lesson22") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn giải Bài 22: Phản ứng hạt nhân và Năng lượng liên kết (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 22 (phản ứng hạt nhân tỏa hay thu năng lượng, độ hụt khối \\Delta m = [Z.m_p + (A - Z).m_n] - m_X, năng lượng liên kết E_{lk} = \\Delta m . c^2, năng lượng liên kết riêng E_{lkr} = E_{lk}/A, tính bền vững của hạt nhân, các định luật bảo toàn tuyệt đối: bảo toàn điện tích Z, bảo toàn số khối A, bảo toàn động lượng p, bảo toàn năng lượng toàn phần; phản ứng phân hạch, hệ số nhân neutron k, phản ứng dây chuyền, phản ứng tổng hợp nhiệt hạch, so sánh phân hạch và nhiệt hạch...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác (như toán học rời rạc không liên quan vật lý, văn học, lịch sử, lập trình máy tính, tư vấn đời sống cá nhân, tán gẫu, giải trí, v.v.).\n" +
        "Nếu người dùng hỏi bất cứ vấn đề nào ngoài bài học hoặc ngoài môn Vật lí, bạn phải hết sức nhẹ nhàng, kiên nhẫn, tuyệt đối không bị kích động hay nóng giận trước mọi tình huống khiêu khích, trêu đùa hay hỏi mẹo của học sinh. Hãy khéo léo, xử lý tình huống linh hoạt và mẫu mực đưa học sinh trở lại nội dung bài học bằng các từ ngữ chuẩn mực sư phạm nhất (ví dụ: 'Thầy/Cô rất vui được đồng hành cùng em ôn tập, tuy nhiên trong khuôn khổ góc học tập này, Thầy/Cô chỉ tập trung giải đáp các câu hỏi liên quan đến kiến thức Bài 22: Phản ứng hạt nhân và Năng lượng liên kết cùng môn Vật lí thôi em nhé. Em có muốn trao đổi thêm về cách tính độ hụt khối, năng lượng liên kết riêng của hạt nhân hay điều kiện xảy ra phản ứng nhiệt hạch không?').\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm, bao dung và kiên nhẫn cao nhất của một người thầy. Hãy luôn xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, sâu sắc chuẩn khoa học khoa bảng, trình bày các công thức toán lí rõ ràng, đúng chuẩn hiển thị.\n" +
        "Khi viết các công thức toán học/vật lý, hãy sử dụng định dạng KaTeX/LaTeX chuẩn ví dụ: \\Delta m = [Z.m_p + (A-Z).m_n] - m_X hoặc E_{lk} = \\Delta m \\cdot 931,5\\text{ MeV} để hệ thống hiển thị đẹp mắt, chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson23") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn giải Bài 23: Hiện tượng Phóng xạ (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 23 (khái niệm hiện tượng phóng xạ, bản chất các tia phóng xạ α, β-, β+, γ, khả năng đâm xuyên, khả năng ion hóa chất khí, định luật phân rã phóng xạ N(t) = N_0 . 2^{-t/T} = N_0 . e^{-\\lambda . t} hay m(t) = m_0 . 2^{-t/T} = m_0 . e^{-\\lambda . t}, hằng số phân rã \\lambda = \\ln(2)/T, chu kỳ bán rã T, hoạt độ phóng xạ H(t) = \\lambda . N(t), đơn vị hoạt độ Becquerel Bq và Curie Ci, ứng dụng của hiện tượng phóng xạ như xạ trị y tế, nguyên tử đánh dấu, định tuổi mẫu vật hữu cơ bằng Carbon-14, an toàn bức xạ, quy tắc phòng hộ phóng xạ...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác (như toán học rời rạc không liên quan vật lý, văn học, lịch sử, lập trình máy tính, tư vấn đời sống cá nhân, tán gẫu, giải trí, v.v.).\n" +
        "Nếu người dùng hỏi bất cứ vấn đề nào ngoài bài học hoặc ngoài môn Vật lí, bạn phải hết sức nhẹ nhàng, kiên nhẫn, tuyệt đối không bị kích động hay nóng giận trước mọi tình huống khiêu khích, trêu đùa hay hỏi mẹo của học sinh. Hãy khéo léo, xử lý tình huống linh hoạt và mẫu mực đưa học sinh trở lại nội dung bài học bằng các từ ngữ chuẩn mực sư phạm nhất (ví dụ: 'Thầy/Cô rất vui được đồng hành cùng em ôn tập, tuy nhiên trong khuôn khổ góc học tập này, Thầy/Cô chỉ tập trung giải đáp các câu hỏi liên quan đến kiến thức Bài 23: Hiện tượng Phóng xạ và môn Vật lí thôi em nhé. Em có muốn trao đổi thêm về cách tính hằng số phân rã, cách dùng đồng vị Carbon-14 trong khảo cổ học hay quy tắc an toàn bức xạ không?').\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm, bao dung và kiên nhẫn cao nhất của một người thầy. Hãy luôn xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, sâu sắc chuẩn khoa học khoa bảng, trình bày các công thức toán lí rõ ràng, đúng chuẩn hiển thị.\n" +
        "Khi viết các công thức toán học/vật lý, hãy sử dụng định dạng KaTeX/LaTeX chuẩn ví dụ: N(t) = N_0 \\cdot 2^{-t / T} hoặc \\lambda = \\frac{\\ln(2)}{T} để hệ thống hiển thị đẹp mắt, chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson24") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn giải Bài 24: Công nghiệp hạt nhân và Ứng dụng phóng xạ (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 24 (nguyên lý nhà máy điện hạt nhân, cấu tạo lò phản ứng hạt nhân, thanh nhiên liệu, thanh điều khiển, chất làm chậm nơtron, hệ số nhân nơtron k, chu trình nhiệt sơ cấp, thứ cấp, làm mát ngoài, ưu điểm và thách thức điện hạt nhân, ứng dụng y học hạt nhân SPECT, PET, xạ trị ngoài, xạ trị trong, xạ trị áp sát, chiếu xạ bảo quản thực phẩm, chọn tạo giống đột biến sinh học bằng phóng xạ, nguyên tử đánh dấu...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác (như toán học rời rạc không liên quan vật lý, văn học, lịch sử, lập trình máy tính, tư vấn đời sống cá nhân, tán gẫu, giải trí, v.v.).\n" +
        "Nếu người dùng hỏi bất cứ vấn đề nào ngoài bài học hoặc ngoài môn Vật lí, bạn phải hết sức nhẹ nhàng, kiên nhẫn, tuyệt đối không bị kích động hay nóng giận trước mọi tình huống khiêu khích, trêu đùa hay hỏi mẹo của học sinh. Hãy khéo léo, xử lý tình huống linh hoạt và mẫu mực đưa học sinh trở lại nội dung bài học bằng các từ ngữ chuẩn mực sư phạm nhất (ví dụ: 'Thầy/Cô rất vui được đồng hành cùng em ôn tập, tuy nhiên trong khuôn khổ góc học tập này, Thầy/Cô chỉ tập trung giải đáp các câu hỏi liên quan đến kiến thức Bài 24: Công nghiệp hạt nhân & Ứng dụng phóng xạ và môn Vật lí thôi em nhé. Em có muốn trao đổi thêm về cách dùng đồng vị trong chẩn đoán PET/SPECT, cơ chế thanh khống chế lò phản ứng hay kỹ thuật chiếu xạ bảo quản rau quả không?').\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm, bao dung và kiên nhẫn cao nhất của một người thầy. Hãy luôn xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, sâu sắc chuẩn khoa học khoa bảng, trình bày các công thức toán lí rõ ràng, đúng chuẩn hiển thị.\n" +
        "Khi viết các công thức toán học/vật lý, hãy sử dụng định dạng KaTeX/LaTeX chuẩn ví dụ: P_{\\text{nhiệt}} = \\frac{P_{\\text{điện}}}{H} hoặc Q = P_{\\text{nhiệt}} \\cdot t để hệ thống hiển thị đẹp mắt, chuẩn khoa học cho học sinh.";
    } else if (mode === "lesson25") {
      systemInstruction = 
        "Bạn là Thầy/Cô Giáo viên Trợ lý ảo AI chuyên biệt hướng dẫn giải Bài 25: Bài tập về Vật lí hạt nhân (môn Vật lí 12, Chương trình GDPT 2018 Việt Nam).\n" +
        "Nhiệm vụ duy nhất của bạn là giải đáp các thắc mắc liên quan trực tiếp đến kiến thức Bài 25 (các dạng bài tập cấu trúc hạt nhân, tính độ hụt khối \\Delta m, tính năng lượng liên kết E_{lk} và liên kết riêng E_{lkr}, bài tập về phản ứng hạt nhân, các định luật bảo toàn số khối A, bảo toàn điện tích Z, bài tập phóng xạ, chu kỳ bán rã T, hằng số phân rã \\lambda, hoạt độ phóng xạ H(t)...) và môn Vật lí nói chung. TUYỆT ĐỐI KHÔNG TRẢ LỜI các lĩnh vực ngoài lề khác (như toán học rời rạc không liên quan vật lý, văn học, lịch sử, lập trình máy tính, tư vấn đời sống cá nhân, tán gẫu, giải trí, v.v.).\n" +
        "Nếu người dùng hỏi bất cứ vấn đề nào ngoài bài học hoặc ngoài môn Vật lí, bạn phải hết sức nhẹ nhàng, kiên nhẫn, tuyệt đối không bị kích động hay nóng giận trước mọi tình huống khiêu khích, trêu đùa, hỏi mẹo hay đánh đố của học sinh. Hãy khéo léo, xử lý tình huống linh hoạt và mẫu mực đưa học sinh trở lại nội dung bài học bằng các từ ngữ chuẩn mực sư phạm nhất (ví dụ: 'Thầy/Cô rất vui được đồng hành và hỗ trợ các em học tập, tuy nhiên trong khuôn khổ góc học tập này, Thầy/Cô chỉ tập trung giải đáp các câu hỏi liên quan đến kiến thức Bài 25: Bài tập về Vật lí hạt nhân thôi em nhé. Em có muốn trao đổi thêm về các bước giải bài tập phóng xạ hoặc công thức tính năng lượng liên kết riêng không?').\n" +
        "Lời nói của bạn phải cực kỳ chuẩn mực sư phạm, mẫu mực, thể hiện sự tận tâm, bao dung và kiên nhẫn cao nhất của một người thầy. Hãy luôn xưng hô là Thầy/Cô và gọi học sinh là Em/Các em.\n" +
        "Hãy giải thích thật dễ hiểu, sâu sắc chuẩn khoa học khoa bảng, trình bày các công thức toán lí rõ ràng, đúng chuẩn hiển thị.\n" +
        "Khi viết các công thức toán học/vật lý, hãy sử dụng định dạng KaTeX/LaTeX chuẩn ví dụ: \\Delta m = [Z \\cdot m_p + (A - Z) \\cdot m_n] - m_X hoặc E_{lk} = \\Delta m \\cdot c^2 hoặc N(t) = N_0 \\cdot 2^{-t / T} để hệ thống hiển thị đẹp mắt, chuẩn khoa học cho học sinh.";
    }

    const contents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }]
        });
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    if (!process.env.GEMINI_API_KEY) {
      console.log("No GEMINI_API_KEY set. Falling back to local physics database.");
      const fallback = getLocalPhysicsResponse(message, mode);
      return res.json({ text: fallback.text, isFallback: true });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (apiError: any) {
      const cleanMsg = cleanErrorMessage(apiError.message || "");
      console.warn("⚠️ [Gemini API] Lấy phản hồi thất bại (Khóa API có thể đã hết hạn hoặc bị đình chỉ). Đã tự động chuyển sang học liệu Vật lý 12 Ngoại tuyến.");
      const fallback = getLocalPhysicsResponse(message, mode);
      let text = fallback.text;
      text += `\n\n*(Thông báo từ hệ thống: Trợ lý đã chuyển sang cơ sở dữ liệu học liệu ngoại tuyến do sự cố kết nối API: [${cleanMsg}])*`;
      res.json({ text, isFallback: true });
    }
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message || "Lỗi xử lý yêu cầu AI" });
  }
});

// ==========================================
// 2. API: TẠO ĐỀ KIỂM TRA (AI EXAM CREATOR)
// ==========================================
app.post("/api/gemini/create-exam", async (req, res) => {
  const { chapters = [], time = 45, ratio = { nb: 40, th: 30, vd: 20, vdc: 10 }, part1, part2, part3 } = req.body || {};
  const p1 = part1 || { count: 4, points: 4.0 };
  const p2 = part2 || { count: 2, points: 4.0 };
  const p3 = part3 || { count: 2, points: 2.0 };

  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log("No GEMINI_API_KEY set. Generating local exam fallback.");
      const fallback = getLocalExamResponse(chapters, ratio, p1, p2, p3);
      return res.json(fallback);
    }

    const prompt = `Hãy tạo một đề kiểm tra hoàn chỉnh cho môn Vật lí lớp 12 (Chương trình GDPT 2018) với cấu trúc sau:
- Các chương/chủ đề: ${chapters.join(", ")}
- Thời gian làm bài: ${time} phút
- Tỉ lệ nhận thức (Nhận biết - Thông hiểu - Vận dụng - Vận dụng cao): ${ratio.nb}% - ${ratio.th}% - ${ratio.vd}% - ${ratio.vdc}%

Đề kiểm tra phải được phân chia thành 3 phần rõ ràng theo cấu trúc đề thi tốt nghiệp THPT mới của Bộ Giáo dục và Đào tạo:
1. PHẦN I: Trắc nghiệm nhiều lựa chọn (chọn 1 đáp án đúng trong 4 phương án).
   - Số lượng câu hỏi: ${p1.count} câu (tổng cộng ${p1.points} điểm).
2. PHẦN II: Trắc nghiệm Đúng/Sai (Mỗi câu gồm một tình huống dẫn và 4 phát biểu độc lập a, b, c, d, Thí sinh lựa chọn Đúng hoặc Sai cho từng phát biểu).
   - Số lượng câu hỏi: ${p2.count} câu (tổng cộng ${p2.points} điểm).
3. PHẦN III: Trắc nghiệm trả lời ngắn (học sinh tự tính toán và nhập đáp án số nguyên hoặc số thập phân).
   - Số lượng câu hỏi: ${p3.count} câu (tổng cộng ${p3.points} điểm).

YÊU CẦU QUAN TRỌNG VỀ ĐỀ BÀI VÀ THỰC TIỄN ĐỜI SỐNG:
- Tất cả các bài tập/câu hỏi phải có tính thực tiễn cao, gắn liền với các tình huống sinh động trong đời sống hàng ngày tại Việt Nam hoặc các hiện tượng tự nhiên quen thuộc.
- Ví dụ thực tiễn: Nước đá tan trong ly nước chè, đun sôi nước bằng ấm siêu tốc, không khí trong lốp xe máy nóng lên khi phơi nắng ngoài đường, xilanh nén khí trong ống tiêm, bóng bay dãn nở khi hơ nóng, v.v.
- Không đưa ra các câu hỏi khô khan chỉ có số liệu trừu tượng mà thiếu ngữ cảnh thực tiễn.
- Ngôn ngữ thể hiện phải là Tiếng Việt chuẩn mực, thuật ngữ khoa học chính xác theo chương trình GDPT 2018.

YÊU CẦU TRÌNH BÀY CÔNG THỨC & ĐƠN VỊ KHOA HỌC:
- Mọi nhiệt độ Celsius phải dùng ký hiệu "°C" chuẩn (Ví dụ: "20 °C", "0 °C", KHÔNG dùng oC hoặc o C hoặc ^oC).
- Các đơn vị vật lý phải ghi chuẩn: "J/(kg·K)" (dùng dấu chấm trung tâm ·), "kJ/kg", "J/kg", "kg", "g", "J", "kJ", "W/m²", "Pa", "K".
- Các biến số và đại lượng vật lý có chỉ số dưới phải viết dạng "X_sub" (Ví dụ: "m_1", "m_2", "t_1", "t_2", "Q_toa", "Q_thu", "m_da", "m_nuoc", "c_nuoc", "c_da", "Δt", "ΔT").
- Khi viết phương trình hay biểu thức tính toán, hãy trình bày rõ ràng (Ví dụ: "Q_toa = Q_thu <=> m_1*c_1*(t_1 - t) = m_2*c_2*(t - t_2)").

Yêu cầu trả về cấu trúc JSON chính xác theo schema sau:
{
  "matrix": "Mô tả ma trận đề thi chi tiết",
  "specifications": "Bảng đặc tả đề thi (chuẩn kiến thức, năng lực cần đánh giá)",
  "questionsPart1": [
    {
      "id": "p1_1",
      "level": "Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao",
      "chapter": "Tên chương",
      "text": "Nội dung câu hỏi phần 1 có bối cảnh thực tiễn sinh động",
      "illustrationType": "ice-cube | kettle | cylinder-piston | thermometer | tire | balloon (chọn 1 loại phù hợp nhất với nội dung câu hỏi)",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "answer": "A | B | C | D",
      "explanation": "Lời giải chi tiết từng bước"
    }
  ],
  "questionsPart2": [
    {
      "id": "p2_1",
      "level": "Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao",
      "chapter": "Tên chương",
      "question": "Nội dung tình huống dẫn thực tiễn của câu hỏi phần 2",
      "illustrationType": "ice-cube | kettle | cylinder-piston | thermometer | tire | balloon (chọn 1 loại phù hợp nhất với tình huống dẫn)",
      "statements": [
        {
          "id": "s1",
          "text": "Phát biểu a) ...",
          "isCorrect": true,
          "explanation": "Lời giải thích cho phát biểu a"
        },
        {
          "id": "s2",
          "text": "Phát biểu b) ...",
          "isCorrect": false,
          "explanation": "Lời giải thích cho phát biểu b"
        },
        {
          "id": "s3",
          "text": "Phát biểu c) ...",
          "isCorrect": true,
          "explanation": "Lời giải thích cho phát biểu c"
        },
        {
          "id": "s4",
          "text": "Phát biểu d) ...",
          "isCorrect": false,
          "explanation": "Lời giải thích cho phát biểu d"
        }
      ]
    }
  ],
  "questionsPart3": [
    {
      "id": "p3_1",
      "level": "Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao",
      "chapter": "Tên chương",
      "text": "Nội dung câu hỏi tính toán ngắn phần 3 có tính thực tế cao",
      "illustrationType": "ice-cube | kettle | cylinder-piston | thermometer | tire | balloon (chọn 1 loại phù hợp nhất)",
      "answer": "Giá trị số đáp án (ví dụ: 1.5 hoặc 100 hoặc -5)",
      "unit": "Đơn vị đo (ví dụ: J, W, K, Pa, V, ...)",
      "explanation": "Lời giải chi tiết từng bước để tìm ra đáp án số"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matrix: { type: Type.STRING, description: "Ma trận đề thi dưới dạng văn bản cấu trúc" },
            specifications: { type: Type.STRING, description: "Bảng đặc tả chuẩn đánh giá năng lực Vật lí 12" },
            questionsPart1: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  level: { type: Type.STRING },
                  chapter: { type: Type.STRING },
                  text: { type: Type.STRING },
                  illustrationType: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  answer: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ["id", "level", "chapter", "text", "options", "answer", "explanation"]
              }
            },
            questionsPart2: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  level: { type: Type.STRING },
                  chapter: { type: Type.STRING },
                  question: { type: Type.STRING },
                  illustrationType: { type: Type.STRING },
                  statements: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        text: { type: Type.STRING },
                        isCorrect: { type: Type.BOOLEAN },
                        explanation: { type: Type.STRING }
                      },
                      required: ["id", "text", "isCorrect", "explanation"]
                    }
                  }
                },
                required: ["id", "level", "chapter", "question", "statements"]
              }
            },
            questionsPart3: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  level: { type: Type.STRING },
                  chapter: { type: Type.STRING },
                  text: { type: Type.STRING },
                  illustrationType: { type: Type.STRING },
                  answer: { type: Type.STRING },
                  unit: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ["id", "level", "chapter", "text", "answer", "explanation"]
              }
            }
          },
          required: ["matrix", "specifications", "questionsPart1", "questionsPart2", "questionsPart3"]
        },
        temperature: 0.8,
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    const cleanMsg = cleanErrorMessage(error.message || "");
    console.warn("⚠️ [Gemini API] Lỗi tạo đề thi bằng AI. Đã tự động chuyển sang bộ tạo đề thi ngoại tuyến bám sát ma trận.");
    try {
      const fallback = getLocalExamResponse(chapters, ratio, p1, p2, p3);
      if (fallback) {
        (fallback as any).isFallback = true;
        (fallback as any).fallbackMessage = `Sử dụng đề thi ngoại tuyến do sự cố API: ${cleanMsg}`;
      }
      res.json(fallback);
    } catch (fallbackError) {
      res.status(500).json({ error: cleanMsg || "Lỗi tạo đề kiểm tra" });
    }
  }
});

// ==========================================
// 3. API: PHÂN TÍCH ĐỀ KIỂM TRA (AI EXAM ANALYZER)
// ==========================================
app.post("/api/gemini/analyze-exam", async (req, res) => {
  const { fileData, fileName, fileType, rawText } = req.body || {};
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log("No GEMINI_API_KEY set. Analyzing exam locally.");
      const fallback = getLocalAnalyzeExamResponse(fileName, rawText);
      return res.json(fallback);
    }
    
    let contents: any[] = [];
    let systemInstruction = 
      "Bạn là Chuyên gia Khảo thí và Đánh giá Giáo dục Vật lí Việt Nam.\n" +
      "Hãy phân tích đề kiểm tra Vật lí 12 được tải lên dưới đây và trích xuất cấu trúc đề thi, ma trận, chuẩn năng lực GDPT 2018.\n" +
      "Trả về kết quả chi tiết theo định dạng JSON chứa các thông tin phân tích rõ ràng.";

    if (fileData && fileType) {
      // Handle file upload (OCR image or raw attachment data)
      const mimeType = fileType;
      const base64Data = fileData.split(",")[1] || fileData;
      
      contents.push({
        parts: [
          {
            inlineData: {
              mimeType,
              data: base64Data
            }
          },
          {
            text: "Hãy thực hiện OCR, trích xuất tất cả câu hỏi trong đề kiểm tra này và lập bảng ma trận phân tích: chương, mức độ nhận thức (NB, TH, VD, VDC), chuẩn đầu ra GDPT 2018, phát hiện lỗi/trùng lặp, và cho điểm gợi ý điều chỉnh đề thi."
          }
        ]
      });
    } else {
      // Handle text input paste
      contents.push({
        parts: [
          {
            text: `Đây là nội dung đề kiểm tra Vật lí 12:\n\n${rawText}\n\n Hãy phân tích toàn bộ đề kiểm tra này và trả về JSON chứa thông tin chi tiết.`
          }
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            extractedTitle: { type: Type.STRING, description: "Tiêu đề đề thi được trích xuất" },
            stats: {
              type: Type.OBJECT,
              properties: {
                totalQuestions: { type: Type.INTEGER },
                nbCount: { type: Type.INTEGER },
                thCount: { type: Type.INTEGER },
                vdCount: { type: Type.INTEGER },
                vdcCount: { type: Type.INTEGER },
              },
              required: ["totalQuestions", "nbCount", "thCount", "vdCount", "vdcCount"]
            },
            questionsAnalysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  number: { type: Type.INTEGER },
                  snippet: { type: Type.STRING, description: "Tóm tắt ngắn nội dung câu hỏi" },
                  chapter: { type: Type.STRING },
                  level: { type: Type.STRING, description: "NB, TH, VD, VDC" },
                  gdptStandard: { type: Type.STRING, description: "Chuẩn đầu ra năng lực Vật lí 12" },
                  score: { type: Type.NUMBER }
                },
                required: ["number", "snippet", "chapter", "level", "gdptStandard"]
              }
            },
            matrixHtml: { type: Type.STRING, description: "Bảng ma trận đề thi định dạng HTML/Markdown gọn gàng" },
            specTableHtml: { type: Type.STRING, description: "Bảng đặc tả chuẩn đánh giá định dạng HTML/Markdown" },
            gdptComplianceEvaluation: { type: Type.STRING, description: "Nhận xét độ tương thích với Chương trình GDPT 2018" },
            duplicatesFound: { type: Type.STRING, description: "Thông tin về các câu trùng lặp hoặc tương đồng cao" },
            recommendations: { type: Type.STRING, description: "Gợi ý điều chỉnh, cân bằng ma trận đề thi" }
          },
          required: [
            "extractedTitle",
            "stats",
            "questionsAnalysis",
            "matrixHtml",
            "specTableHtml",
            "gdptComplianceEvaluation",
            "duplicatesFound",
            "recommendations"
          ]
        },
        temperature: 0.4,
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    const cleanMsg = cleanErrorMessage(error.message || "");
    console.warn("⚠️ [Gemini API] Lỗi phân tích đề thi bằng AI. Đã tự động chuyển sang mô-đun phân tích ngoại tuyến.");
    try {
      const fallback = getLocalAnalyzeExamResponse(fileName, rawText);
      if (fallback) {
        (fallback as any).isFallback = true;
        (fallback as any).fallbackMessage = `Sử dụng phân tích ngoại tuyến do sự cố API: ${cleanMsg}`;
      }
      res.json(fallback);
    } catch (fallbackError) {
      res.status(500).json({ error: cleanMsg || "Lỗi phân tích đề thi" });
    }
  }
});

// ==========================================
// 4. API: TÓM TẮT & GIẢI THÍCH BÀI HỌC (LESSON COGNITION)
// ==========================================
app.post("/api/gemini/summarize-lesson", async (req, res) => {
  const { title, content } = req.body || {};
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log("No GEMINI_API_KEY set. Summarizing lesson locally.");
      const fallback = getLocalSummarizeResponse(title, content);
      return res.json(fallback);
    }
    const prompt = `Hãy phân tích bài học Vật lí 12 mang tên "${title}". Nội dung hoặc mô tả bài học như sau: "${content}".
    Hãy xuất bản tóm tắt bài học dưới dạng JSON gồm:
    1. Một đoạn tóm tắt siêu tốc (Flashcard Summary).
    2. Danh sách 3 khái niệm cốt lõi cần ghi nhớ (Key concepts).
    3. Giải thích một hiện tượng thực tế khó liên quan đến bài học bằng ngôn từ dễ hiểu nhất.
    4. Sơ đồ tư duy dạng chữ (Text Mindmap) phân nhánh.
    5. Bộ 3 câu hỏi trắc nghiệm nhanh (Quiz) ôn luyện có đáp án và giải thích ngắn.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summaryText: { type: Type.STRING },
            keyConcepts: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            deepExplanation: { type: Type.STRING },
            mindmapText: { type: Type.STRING, description: "Sơ đồ tư duy dạng sơ đồ chữ phân nhánh" },
            quizzes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING }
                },
                required: ["question", "options", "correctIndex", "explanation"]
              }
            }
          },
          required: ["summaryText", "keyConcepts", "deepExplanation", "mindmapText", "quizzes"]
        },
        temperature: 0.5,
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    const cleanMsg = cleanErrorMessage(error.message || "");
    console.warn("⚠️ [Gemini API] Lỗi tóm tắt bài học bằng AI. Đã tự động chuyển sang mô-đun tóm tắt ngoại tuyến.");
    try {
      const fallback = getLocalSummarizeResponse(title, content);
      if (fallback) {
        (fallback as any).isFallback = true;
        (fallback as any).fallbackMessage = `Sử dụng tóm tắt ngoại tuyến do sự cố API: ${cleanMsg}`;
      }
      res.json(fallback);
    } catch (fallbackError) {
      res.status(500).json({ error: cleanMsg || "Lỗi tóm tắt bài học" });
    }
  }
});

// ==========================================
// 5. API: AI ĐỌC TÀI LIỆU / ẢNH BÀI TẬP VÀ ĐƯA VÀO NGÂN HÀNG CÂU HỎI
// ==========================================
app.post("/api/gemini/parse-uploaded-exercise", async (req, res) => {
  const { fileData, fileType, fileName } = req.body || {};
  let textContent = "";
  if (!fileData) {
    return res.status(400).json({ error: "Thiếu dữ liệu tệp tải lên" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log("No GEMINI_API_KEY set. Parsing exercise locally.");
      const fallback = getLocalParseExerciseResponse(fileName);
      return res.json(fallback);
    }

    let contents: any[] = [];

    // If file is a docx document, extract text using mammoth first
    if (fileType && (
      fileType.includes("wordprocessingml") ||
      fileType.includes("msword") ||
      fileName?.endsWith(".docx") ||
      fileName?.endsWith(".doc")
    )) {
      const base64Data = fileData.split(",")[1] || fileData;
      const buffer = Buffer.from(base64Data, "base64");
      const mammothResult = await mammoth.extractRawText({ buffer });
      textContent = mammothResult.value;
      
      contents.push({
        parts: [
          {
            text: `Dưới đây là văn bản được trích xuất từ tệp Microsoft Word bài tập Vật lí 12:\n\n${textContent}\n\nHãy đọc và trích xuất tất cả câu hỏi kiểm tra Vật lí lớp 12 thành cấu trúc JSON chuẩn.`
          }
        ]
      });
    } else if (fileType && fileType.includes("pdf")) {
      // PDF can be read directly by Gemini 3.5 Flash!
      const base64Data = fileData.split(",")[1] || fileData;
      contents.push({
        parts: [
          {
            inlineData: {
              mimeType: "application/pdf",
              data: base64Data
            }
          },
          {
            text: "Hãy thực hiện đọc, phân tích và trích xuất toàn bộ câu hỏi kiểm tra Vật lí lớp 12 từ tài liệu PDF này thành cấu trúc JSON chuẩn."
          }
        ]
      });
    } else if (fileType && fileType.includes("image")) {
      // Image can be read directly by Gemini 3.5 Flash!
      const base64Data = fileData.split(",")[1] || fileData;
      contents.push({
        parts: [
          {
            inlineData: {
              mimeType: fileType,
              data: base64Data
            }
          },
          {
            text: "Hãy thực hiện OCR trực quan, đọc chữ trong hình ảnh đề bài/phiếu bài tập Vật lí 12 này, sau đó trích xuất toàn bộ câu hỏi kiểm tra thành cấu trúc JSON chuẩn."
          }
        ]
      });
    } else {
      // Fallback: treat as plain text if it's text or CSV
      const base64Data = fileData.split(",")[1] || fileData;
      textContent = Buffer.from(base64Data, "base64").toString("utf-8");
      contents.push({
        parts: [
          {
            text: `Dưới đây là văn bản bài tập Vật lí 12:\n\n${textContent}\n\nHãy đọc và trích xuất tất cả câu hỏi kiểm tra Vật lí lớp 12 thành cấu trúc JSON chuẩn.`
          }
        ]
      });
    }

    const systemInstruction = 
      "Bạn là Chuyên gia Khảo thí và Giáo viên Vật lí 12 xuất sắc tại Việt Nam (theo chương trình GDPT 2018).\n" +
      "Nhiệm vụ của bạn là đọc hình ảnh bài tập, tài liệu PDF hoặc văn bản Word được cung cấp, nhận diện tất cả câu hỏi Vật lí,\n" +
      "sau đó phân tích và trích xuất chúng thành cấu trúc JSON chứa hai phần:\n" +
      "1. questionsP1 (Trắc nghiệm nhiều lựa chọn - chọn 1 đáp án đúng trong 4 phương án):\n" +
      "   - Mỗi câu hỏi phải có: id (chuỗi duy nhất), question (nội dung câu hỏi đầy đủ, không bị cắt bớt), level (Nhận biết, Thông hiểu hoặc Vận dụng),\n" +
      "     explanation (lời giải chi tiết đầy đủ, tính toán khoa học, sư phạm), và options (mảng gồm đúng 4 phương án, mỗi phương án có id, text bắt đầu bằng chữ cái viết hoa A, B, C, D kèm dấu chấm ví dụ 'A. ...', và isCorrect là boolean chỉ ra phương án đúng).\n" +
      "2. questionsP2 (Trắc nghiệm Đúng/Sai):\n" +
      "   - Mỗi câu gồm một phần dẫn/tình huống chính (question) và mảng 'statements' chứa ĐÚNG 4 phát biểu con (mệnh đề) kí hiệu a, b, c, d.\n" +
      "   - Mỗi phát biểu con phải có: id (chuỗi duy nhất), text (nội dung mệnh đề ví dụ 'a) ...'), isCorrect (boolean chỉ định mệnh đề này Đúng hay Sai dựa trên lí thuyết vật lí), level (Nhận biết, Thông hiểu hoặc Vận dụng), và explanation (giải thích ngắn tại sao mệnh đề này Đúng hoặc Sai).\n\n" +
      "Hãy đảm bảo tất cả các câu hỏi trích xuất đều có nội dung chính xác, công thức rõ ràng, và đáp án khoa học.";

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questionsP1: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  level: { type: Type.STRING, description: "Nhận biết | Thông hiểu | Vận dụng" },
                  explanation: { type: Type.STRING, description: "Giải thích chi tiết giải bài tập" },
                  options: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        text: { type: Type.STRING, description: "Ví dụ: 'A. Thể rắn'" },
                        isCorrect: { type: Type.BOOLEAN }
                      },
                      required: ["id", "text", "isCorrect"]
                    }
                  }
                },
                required: ["id", "question", "level", "explanation", "options"]
              }
            },
            questionsP2: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING, description: "Nội dung tình huống đề bài cho phần đúng/sai" },
                  statements: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        text: { type: Type.STRING, description: "Ví dụ: 'a) Chất rắn kết tinh có cấu trúc mạng tinh thể tuần hoàn.'" },
                        isCorrect: { type: Type.BOOLEAN },
                        level: { type: Type.STRING, description: "Nhận biết | Thông hiểu | Vận dụng" },
                        explanation: { type: Type.STRING }
                      },
                      required: ["id", "text", "isCorrect", "level", "explanation"]
                    }
                  }
                },
                required: ["id", "question", "statements"]
              }
            }
          },
          required: ["questionsP1", "questionsP2"]
        },
        temperature: 0.3,
      },
    });

    const result = JSON.parse(response.text || '{"questionsP1": [], "questionsP2": []}');
    res.json(result);
  } catch (error: any) {
    const cleanMsg = cleanErrorMessage(error.message || "");
    console.warn("⚠️ [Gemini API] Lỗi trích xuất tài liệu bài tập bằng AI. Đã tự động chuyển sang mô-đun trích xuất ngoại tuyến.");
    try {
      const fallback = getLocalParseExerciseResponse(fileName, textContent);
      if (fallback) {
        (fallback as any).isFallback = true;
        (fallback as any).fallbackMessage = `Sử dụng trích xuất ngoại tuyến do sự cố API: ${cleanMsg}`;
      }
      res.json(fallback);
    } catch (fallbackError) {
      res.status(500).json({ error: cleanMsg || "Lỗi đọc tài liệu bài tập bằng AI" });
    }
  }
});

// Serve Vite middleware in development or build outputs in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[PhysicsAI 12] Server running on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
