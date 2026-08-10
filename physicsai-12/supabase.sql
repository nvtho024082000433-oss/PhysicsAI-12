-- ====================================================================
-- SUPABASE DATABASE SETUP FOR PHYSICS-AI-12
-- Copy and paste this script directly into the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/guajmfmzkseypwwzcrck/sql/new
-- ====================================================================

-- --------------------------------------------------------------------
-- PHƯƠNG ÁN 1: BẢNG TIÊU CHUẨN (Khuyên dùng - Cột Tiếng Anh)
-- Bảng 'student_results'
-- --------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.student_results (
    id TEXT PRIMARY KEY,                       -- Định dạng: CLASSNAME_name (ví dụ: 12A1_nguyen minh duc)
    name TEXT NOT NULL,                        -- Tên học sinh đầy đủ
    class_name TEXT NOT NULL,                  -- Lớp học (ví dụ: 12A1, 12A2, ...)
    score NUMERIC DEFAULT 0,                   -- Điểm số tích lũy hoặc điểm kiểm tra (0 - 10)
    progress NUMERIC DEFAULT 0,                -- Tiến độ hoàn thành (%)
    completed_quizzes INTEGER DEFAULT 0,       -- Số bài trắc nghiệm đã làm
    xp INTEGER DEFAULT 0,                      -- Điểm kinh nghiệm (XP) tích lũy
    updated_at TIMESTAMPTZ DEFAULT NOW()       -- Thời gian cập nhật cuối cùng
);

-- Kích hoạt tính năng Row Level Security (RLS) để bảo mật dữ liệu
ALTER TABLE public.student_results ENABLE ROW LEVEL SECURITY;

-- Tạo các chính sách (Policies) để phân quyền đọc/ghi tự do bằng Anon Key (Publishable Key)
CREATE POLICY "Cho phép mọi người đọc bảng điểm công khai" ON public.student_results
    FOR SELECT USING (true);

CREATE POLICY "Cho phép thêm kết quả mới" ON public.student_results
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Cho phép cập nhật kết quả học tập" ON public.student_results
    FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Cho phép xóa hoặc đặt lại bảng điểm" ON public.student_results
    FOR DELETE USING (true);


-- --------------------------------------------------------------------
-- PHƯƠNG ÁN 2: BẢNG TƯƠNG THÍCH TIẾNG VIỆT (Vercel Integration)
-- Bảng 'ket_qua_hoc_tap_vat_li_12'
-- --------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.ket_qua_hoc_tap_vat_li_12 (
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
ALTER TABLE public.ket_qua_hoc_tap_vat_li_12 ENABLE ROW LEVEL SECURITY;

-- Tạo các chính sách (Policies) cho bảng tiếng Việt để tránh lỗi "violates row-level security policy"
CREATE POLICY "Cho phép mọi người đọc bảng tiếng Việt công khai" ON public.ket_qua_hoc_tap_vat_li_12
    FOR SELECT USING (true);

CREATE POLICY "Cho phép thêm kết quả bảng tiếng Việt" ON public.ket_qua_hoc_tap_vat_li_12
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Cho phép cập nhật kết quả bảng tiếng Việt" ON public.ket_qua_hoc_tap_vat_li_12
    FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Cho phép xóa kết quả bảng tiếng Việt" ON public.ket_qua_hoc_tap_vat_li_12
    FOR DELETE USING (true);

