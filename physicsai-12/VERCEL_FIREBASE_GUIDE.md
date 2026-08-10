# HƯỚNG DẪN KẾT NỐI VERCEL VỚI FIREBASE (PROJECT: DATA-PHYSIC-12)

Chào thầy, tài liệu này hướng dẫn cách cấu hình và kết nối ứng dụng của thầy khi triển khai lên **Vercel** để đảm bảo ứng dụng kết nối trực tiếp với dự án Firebase của thầy: **data-physic-12**.

---

## 🚀 Cách ứng dụng hoạt động (Cơ chế đồng bộ)

Ứng dụng của chúng ta hỗ trợ **cơ chế kép linh hoạt**:
1. **Mặc định (Local Build):** Hệ thống sẽ đọc cấu hình từ tệp tin `firebase-applet-config.json` có sẵn trong mã nguồn. Khi Vite build, các cấu hình này sẽ tự động được đóng gói vào ứng dụng.
2. **Ưu tiên (Vercel Production):** Khi chạy trên môi trường Vercel, ứng dụng sẽ ưu tiên đọc các biến môi trường cấu hình của Vercel (bắt đầu bằng `VITE_FIREBASE_`). Điều này giúp thầy dễ dàng cập nhật hoặc thay đổi thông tin kết nối mà không cần sửa mã nguồn ứng dụng.

---

## 🛠️ Bước 1: Cấu hình biến môi trường trên Vercel

Khi đăng nhập vào tài khoản Vercel và chọn dự án, thầy hãy thực hiện các bước sau để thiết lập các biến môi trường (Environment Variables) an toàn:

1. Đi tới **Settings** > **Environment Variables** trong dự án Vercel của thầy.
2. Thêm lần lượt các cặp khóa-giá trị (Key-Value) dưới đây:

| Tên Khóa (Key) | Giá Trị (Value) | Giải thích |
| :--- | :--- | :--- |
| `VITE_FIREBASE_API_KEY` | `AIzaSyDTn9eeHU5LdKvU6zV94Dfr9SvpaDBivEw` | Khóa API bảo mật của Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | `data-physic-12.firebaseapp.com` | Tên miền xác thực người dùng |
| `VITE_FIREBASE_PROJECT_ID` | `data-physic-12` | ID dự án Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET` | `data-physic-12.appspot.com` | Đường dẫn lưu trữ tài nguyên đám mây |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `318734422978` | ID gửi tin nhắn thông báo |
| `VITE_FIREBASE_APP_ID` | `1:318734422978:web:0521e22c93a0b5d266bc5b` | ID của ứng dụng web Firebase |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-PJR3H2X9LH` | ID đo lường Google Analytics (nếu có) |
| `VITE_FIREBASE_FIRESTORE_DATABASE_ID` | `ai-studio-physicsai12-79fa31ee-a48b-4479-accb-434010c56769` | ID cơ sở dữ liệu Cloud Firestore |

3. Click **Save** (Lưu) cho mỗi biến môi trường.
4. **Redeploy (Triển khai lại):** Sau khi thêm các biến môi trường, hãy thực hiện triển khai lại dự án trên Vercel để áp dụng cấu hình mới.

---

## 🔒 Bước 2: Thiết lập quy tắc bảo mật (Firestore Rules)

Quy tắc bảo mật Firestore của thầy đã được tạo và đồng bộ hóa thành công:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /student_results/{document} {
      allow read, write: if true;
    }
    match /settings/{document} {
      allow read, write: if true;
    }
  }
}
```

---

## 🎓 Chúc thầy và các em học sinh học tốt!
Hệ thống xác thực **Firebase Authentication** và cơ sở dữ liệu **Cloud Firestore** hiện đã được tích hợp toàn vẹn vào luồng đăng nhập học sinh/giáo viên và đồng bộ hóa bảng xếp hạng học tập lớp 12. Nếu thầy cần hỗ trợ thêm bất kì tính năng nào, hãy cho tôi biết nhé!
