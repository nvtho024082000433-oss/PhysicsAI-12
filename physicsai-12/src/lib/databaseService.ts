import { doc, setDoc, collection, onSnapshot, query, orderBy, limit, getDocs, deleteDoc, writeBatch } from "firebase/firestore";
import { database } from "./firebase";
import { StudentActivity } from "../types";

export async function syncStudentDataToFirebase(
  studentName: string,
  className: string,
  studentData: { score?: number; progress?: number; xp?: number; completedQuizzes?: number; [key: string]: any }
) {
  try {
    if (!database) {
      console.warn("Cơ sở dữ liệu Firebase Firestore chưa được khởi tạo hoặc không khả dụng.");
      return;
    }

    // Tạo ID tài liệu đồng nhất cho học sinh (ví dụ: 12A3_hien)
    const docId = `${className.trim().toUpperCase()}_${studentName.trim().toLowerCase()}`;
    const studentRef = doc(database, "student_results", docId);
    
    // Đồng bộ đồng thời cả trường Tiếng Việt và Tiếng Anh:
    // - Vừa giúp thầy quản lý trực quan trên Firebase Console
    // - Vừa đồng bộ trực tiếp với Bảng xếp hạng và Giao diện hiện tại của ứng dụng
    await setDoc(studentRef, {
      // Các trường tiếng Anh phục vụ cho Dashboard, Leaderboard & Quizzes
      name: studentName.trim(),
      className: className.trim(),
      score: studentData.score ?? 0.0,
      progress: studentData.progress ?? 0,
      xp: studentData.xp ?? 0,
      completedQuizzes: studentData.completedQuizzes ?? 0,

      // Các trường tiếng Việt như trong hướng dẫn yêu cầu
      hoVaTen: studentName.trim(),
      lop: className.trim(),
      diemHocTap: studentData.score ?? 0.0,
      tienDo: studentData.progress ?? 0,
      tichLuyXP: studentData.xp ?? 0,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    console.log(`[Firebase Sync] Đã đồng bộ thành công học sinh: ${studentName} (${className})`);
  } catch (error) {
    console.error("Lỗi đồng bộ lên Firebase:", error);
  }
}

/**
 * Ghi/cập nhật document đăng nhập của học sinh vào collection 'students' của Firebase Firestore
 */
export async function syncStudentLoginToFirebase(
  studentName: string,
  className: string,
  studentCode: string
) {
  try {
    if (!database) {
      console.warn("Cơ sở dữ liệu Firebase Firestore chưa được khởi tạo hoặc không khả dụng.");
      return;
    }

    const docId = `${className.trim().toUpperCase()}_${studentName.trim().toLowerCase()}`;
    const studentRef = doc(database, "students", docId);

    const lastLoginAt = new Date().toISOString();

    await setDoc(studentRef, {
      name: studentName.trim(),
      class: className.trim(),
      studentCode: studentCode.trim(),
      lastLoginAt: lastLoginAt,
      // Các trường tiếng Việt bổ sung để hỗ trợ hiển thị/truy vấn trực quan
      hoTen: studentName.trim(),
      lop: className.trim(),
      maHocSinh: studentCode.trim(),
      thoiGianDangNhapCuoi: lastLoginAt
    }, { merge: true });

    console.log(`[Firebase Student Login] Đã ghi nhận thông tin học sinh vào collection 'students': ${studentName}`);
  } catch (error) {
    console.error("Lỗi khi đồng bộ đăng nhập lên Firebase Firestore 'students':", error);
    throw error;
  }
}

/**
 * Ghi nhận lịch sử hoạt động của học sinh vào Firebase và LocalStorage
 */
export async function logStudentActivity(
  studentName: string,
  className: string,
  activityType: string,
  description: string,
  xpGained: number
) {
  const timestampStr = new Date().toISOString();
  // Tạo một id duy nhất cho hoạt động
  const randomId = Math.random().toString(36).substring(2, 10);
  const activityId = `act_${className.trim().toUpperCase()}_${studentName.trim().toLowerCase()}_${Date.now()}_${randomId}`;

  const activity: StudentActivity = {
    id: activityId,
    studentName: studentName.trim(),
    className: className.trim(),
    activityType,
    description,
    xpGained,
    timestamp: timestampStr,
    hoVaTen: studentName.trim(),
    lop: className.trim(),
    loaiHoatDong: activityType,
    moTa: description,
    xpNhanDuoc: xpGained,
    thoiGian: timestampStr
  };

  // 1. Lưu vào LocalStorage ngay lập tức để có dữ liệu hiển thị tức thì
  try {
    const localActs = localStorage.getItem("student_activities");
    let activitiesList: StudentActivity[] = [];
    if (localActs) {
      try {
        activitiesList = JSON.parse(localActs);
      } catch (e) {}
    }
    activitiesList.unshift(activity); // Thêm vào đầu danh sách
    // Giới hạn lưu cục bộ 200 hoạt động gần nhất để tối ưu dung lượng
    if (activitiesList.length > 200) {
      activitiesList = activitiesList.slice(0, 200);
    }
    localStorage.setItem("student_activities", JSON.stringify(activitiesList));
  } catch (e) {
    console.error("Lỗi lưu lịch sử hoạt động vào LocalStorage:", e);
  }

  // Gửi lên server-backup để đảm bảo dữ liệu không bị mất khi F5 hoặc chuyển trình duyệt
  fetch("/api/backup/activities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(activity)
  }).catch((err) => console.warn("Lỗi đồng bộ hoạt động lên server-backup:", err));

  // 2. Đồng bộ lên Firebase Firestore nếu khả dụng
  try {
    if (!database) {
      console.warn("Cơ sở dữ liệu Firebase chưa kết nối. Hoạt động được lưu tạm ở trình duyệt.");
      return;
    }

    const docRef = doc(database, "student_activities", activityId);
    await setDoc(docRef, activity);
    console.log(`[Firebase Activity] Ghi nhận thành công: ${studentName} - ${description} (+${xpGained} XP)`);
  } catch (error) {
    console.error("Lỗi đồng bộ lịch sử hoạt động lên Firebase:", error);
  }
}

/**
 * Đăng ký listener lắng nghe thời gian thực danh sách hoạt động học tập
 */
export function listenToStudentActivities(callback: (activities: StudentActivity[]) => void) {
  // Hàm tải dữ liệu dự phòng từ server-backup hoặc LocalStorage
  const loadLocalFallback = async () => {
    try {
      const res = await fetch("/api/backup/activities");
      if (res.ok) {
        const backupActs = await res.json();
        if (Array.isArray(backupActs) && backupActs.length > 0) {
          callback(backupActs);
          localStorage.setItem("student_activities", JSON.stringify(backupActs));
          return;
        }
      }
    } catch (err) {
      console.warn("Lỗi tải lịch sử hoạt động từ server-backup, dùng LocalStorage làm dự phòng:", err);
    }

    const localActs = localStorage.getItem("student_activities");
    if (localActs) {
      try {
        const parsed = JSON.parse(localActs);
        if (Array.isArray(parsed)) {
          callback(parsed);
          return;
        }
      } catch (e) {}
    }
    callback([]);
  };

  if (!database) {
    loadLocalFallback();
    return () => {};
  }

  const colRef = collection(database, "student_activities");
  const q = query(colRef, orderBy("timestamp", "desc"), limit(100));

  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      loadLocalFallback();
    } else {
      const activities: StudentActivity[] = [];
      snapshot.forEach((doc) => {
        activities.push(doc.data() as StudentActivity);
      });
      callback(activities);

      // Cập nhật lại cache cục bộ từ server để đồng bộ
      try {
        localStorage.setItem("student_activities", JSON.stringify(activities));
      } catch (e) {}
    }
  }, (error) => {
    console.error("Lỗi khi lắng nghe lịch sử hoạt động Firebase:", error);
    loadLocalFallback();
  });
}

/**
 * Xóa toàn bộ lịch sử hoạt động (Khi giáo viên reset bảng điểm)
 */
export async function clearAllStudentActivities() {
  try {
    localStorage.removeItem("student_activities");
    localStorage.removeItem("app_history_data");
  } catch (e) {
    console.error("Lỗi khi xóa lịch sử trong localStorage:", e);
  }
  
  // Gửi lệnh xóa lên server-backup
  fetch("/api/backup/activities/clear", {
    method: "POST"
  }).catch((err) => console.warn("Lỗi xóa hoạt động trên server-backup:", err));

  if (!database) return;

  try {
    const colRef = collection(database, "student_activities");
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) return;

    // Sử dụng batch xóa hàng loạt để tránh quá tải
    const batch = writeBatch(database);
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log("[Firebase Activity] Đã xóa toàn bộ lịch sử hoạt động thành công.");
  } catch (error) {
    console.error("Lỗi khi xóa lịch sử hoạt động trên Firebase:", error);
  }
}
