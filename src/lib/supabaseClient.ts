import { createClient } from "@supabase/supabase-js";
import { StudentResult } from "../types";

// Lấy thông tin cấu hình tự động từ biến môi trường của Vite hoặc sử dụng giá trị mặc định liên kết với dự án Supabase của bạn
const metaEnv = (import.meta as any).env || {};
const supabaseUrl = (metaEnv.VITE_STORAGE_URL as string) ||
                    (metaEnv.VITE_SUPABASE_URL as string) || 
                    (metaEnv.NEXT_PUBLIC_SUPABASE_URL as string) || 
                    "https://guajmfmzkseypwwzcrck.supabase.co";

const supabaseAnonKey = (metaEnv.VITE_STORAGE_ANON_KEY as string) ||
                         (metaEnv.VITE_STORAGE_PUBLISHABLE_KEY as string) ||
                         (metaEnv.VITE_SUPABASE_ANON_KEY as string) || 
                         (metaEnv.VITE_SUPABASE_PUBLISHABLE_KEY as string) || 
                         (metaEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string) || 
                         "sb_publishable_UHBkV7d_T95SuO9TtVIrXw_aeNo73rH";

// Khởi tạo Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

/**
 * Kiểm tra xem kết nối Supabase có hoạt động tốt không
 */
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from("student_results").select("id").limit(1);
    if (error) {
      // Nếu lỗi là do bảng chưa được tạo, vẫn tính là kết nối thành công nhưng bảng chưa sẵn sàng
      if (error.code === "PGRST116" || error.code === "42P01") {
        console.warn("Supabase đã kết nối thành công, nhưng bảng 'student_results' chưa tồn tại. Hãy tạo bảng này bằng SQL Script.");
        return true;
      }
      console.error("Lỗi kiểm tra Supabase:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Không thể kết nối với Supabase:", err);
    return false;
  }
};

/**
 * Lấy toàn bộ kết quả học tập của học sinh từ Supabase
 */
export const fetchSupabaseResults = async (): Promise<StudentResult[] | null> => {
  try {
    const { data, error } = await supabase
      .from("student_results")
      .select("*")
      .order("xp", { ascending: false });

    if (error) {
      console.warn("Lỗi khi tải kết quả từ Supabase:", error.message);
      return null;
    }

    if (!data) return [];

    return data.map((item: any) => ({
      name: item.name,
      className: item.class_name || item.className,
      score: Number(item.score),
      progress: Number(item.progress),
      completedQuizzes: Number(item.completed_quizzes || item.completedQuizzes || 0),
      xp: Number(item.xp)
    }));
  } catch (err) {
    console.error("Ngoại lệ khi tải kết quả Supabase:", err);
    return null;
  }
};

/**
 * Lưu hoặc cập nhật một kết quả học tập của học sinh lên Supabase
 */
export const saveSupabaseResult = async (student: StudentResult): Promise<boolean> => {
  try {
    const docId = `${student.className.trim().toUpperCase()}_${student.name.trim().toLowerCase()}`;
    const { error } = await supabase
      .from("student_results")
      .upsert({
        id: docId,
        name: student.name.trim(),
        class_name: student.className.trim(),
        score: student.score,
        progress: student.progress,
        completed_quizzes: student.completedQuizzes,
        xp: student.xp,
        updated_at: new Date().toISOString()
      }, {
        onConflict: "id"
      });

    if (error) {
      console.error("Lỗi khi lưu kết quả vào Supabase:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Ngoại lệ khi lưu kết quả Supabase:", err);
    return false;
  }
};

/**
 * Lưu hoặc cập nhật hàng loạt kết quả học tập lên Supabase
 */
export const saveBulkSupabaseResults = async (students: StudentResult[]): Promise<boolean> => {
  try {
    if (students.length === 0) return true;

    const records = students.map((student) => ({
      id: `${student.className.trim().toUpperCase()}_${student.name.trim().toLowerCase()}`,
      name: student.name.trim(),
      class_name: student.className.trim(),
      score: student.score,
      progress: student.progress,
      completed_quizzes: student.completedQuizzes,
      xp: student.xp,
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase
      .from("student_results")
      .upsert(records, {
        onConflict: "id"
      });

    if (error) {
      console.error("Lỗi khi lưu hàng loạt kết quả vào Supabase:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Ngoại lệ khi lưu hàng loạt kết quả Supabase:", err);
    return false;
  }
};
