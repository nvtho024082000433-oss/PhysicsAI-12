import React, { useState, useEffect, useCallback, useRef } from "react";
import { 
  Cloud, 
  FolderPlus, 
  FileText, 
  CheckCircle, 
  Trash2, 
  Plus, 
  RefreshCw, 
  Upload, 
  Folder, 
  ExternalLink, 
  File, 
  AlertCircle, 
  Sparkles, 
  LogOut,
  FolderOpen
} from "lucide-react";
import { initAuth, googleSignIn, getAccessToken, logout } from "../lib/googleDriveAuth";
import { User } from "firebase/auth";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime: string;
  webViewLink?: string;
}

export function GoogleDriveWorkspace({ onEarnXP }: { onEarnXP: (xp: number) => void }) {
  const [isSandbox, setIsSandbox] = useState<boolean>(() => localStorage.getItem("drive_sandbox_mode") === "true");
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  
  // Drive-specific states
  const [folderId, setFolderId] = useState<string | null>(null);
  const [folderSearching, setFolderSearching] = useState(false);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [filesLoading, setFilesLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Export Presets states
  const [docTitle, setDocTitle] = useState("Vật Lí 12 - Tóm Tắt Nhiệt Học");
  const [docContent, setDocContent] = useState(
    "TÓM TẮT KIẾN THỨC VẬT LÍ 12 - CHƯƠNG I: VẬT LÍ NHIỆT\n" +
    "=====================================================\n\n" +
    "1. Mô hình động học phân tử của chất khí:\n" +
    "   - Các phân tử khí chuyển động hỗn loạn không ngừng.\n" +
    "   - Nhiệt độ càng cao, tốc độ trung bình của các phân tử càng lớn.\n" +
    "   - Giữa các phân tử có lực liên kết yếu (với khí lý tưởng coi như bằng 0 khi chưa va chạm).\n\n" +
    "2. Nội năng (U):\n" +
    "   - Tổng động năng chuyển động nhiệt và thế năng tương tác giữa các phân tử cấu tạo nên vật.\n" +
    "   - Nội năng biến đổi qua 2 cách: Thực hiện công (A) và Truyền nhiệt (Q).\n\n" +
    "3. Định luật I Nhiệt động lực học:\n" +
    "   - Công thức: ΔU = A + Q\n" +
    "   - Quy ước dấu:\n" +
    "     + Q > 0: Hệ nhận nhiệt lượng; Q < 0: Hệ truyền nhiệt lượng.\n" +
    "     + A > 0: Hệ nhận công; A < 0: Hệ thực hiện công.\n\n" +
    "4. Các hằng số quan trọng:\n" +
    "   - Nhiệt độ tuyệt đối T(K) = t(°C) + 273.15"
  );

  const [examTitle, setExamTitle] = useState("Kết Quả Ôn Tập Đề THPT Quốc Gia - Học Sinh");
  const [examScore, setExamScore] = useState("8.50");
  const [examFeedback, setExamFeedback] = useState(
    "Học sinh đã trả lời đúng 34/40 câu hỏi trắc nghiệm.\n" +
    "- Điểm mạnh: Hiểu rất sâu về các định luật Nhiệt động lực học và Thuyết động học chất khí.\n" +
    "- Điểm cần cải thiện: Cần ôn tập kỹ hơn về phần tính nhiệt nóng chảy riêng và bài toán mạch xoay chiều."
  );

  // File Upload states
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Subscribe to Auth State
  useEffect(() => {
    if (isSandbox) {
      setUser({
        displayName: "Học sinh Sandbox (Offline)",
        email: "sandbox.physics12@thpttamphu.edu.vn"
      } as any);
      setToken("sandbox_token");
      setNeedsAuth(false);
      setAuthChecking(false);
      return;
    }

    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        setNeedsAuth(false);
        setAuthChecking(false);
      },
      () => {
        if (isSandbox) return;
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
        setAuthChecking(false);
      }
    );
    return () => unsubscribe();
  }, [isSandbox]);

  // Format File Size
  const formatBytes = (bytesStr?: string) => {
    if (!bytesStr) return "N/A";
    const bytes = parseInt(bytesStr, 10);
    if (isNaN(bytes)) return "N/A";
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // 1. Google Drive Folder Search & Initialization
  const locateSyncFolder = useCallback(async (accessToken: string) => {
    if (isSandbox) {
      setFolderSearching(true);
      setTimeout(() => {
        setFolderId("SANDBOX_FOLDER_ID");
        setFolderSearching(false);
        fetchFilesFromFolder(accessToken, "SANDBOX_FOLDER_ID");
      }, 500);
      return;
    }
    try {
      setFolderSearching(true);
      setErrorMsg("");
      const query = encodeURIComponent("name = 'Vật Lí 12' and mimeType = 'application/vnd.google-apps.folder' and trashed = false");
      const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`;
      
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (!res.ok) {
        throw new Error(`Không thể tìm kiếm thư mục: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.files && data.files.length > 0) {
        setFolderId(data.files[0].id);
        fetchFilesFromFolder(accessToken, data.files[0].id);
      } else {
        setFolderId(null);
        setFiles([]);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Lỗi định vị thư mục Vật Lí 12");
    } finally {
      setFolderSearching(false);
    }
  }, [isSandbox]);

  // Fetch files in specified folder
  const fetchFilesFromFolder = async (accessToken: string, folderIdKey: string) => {
    if (isSandbox) {
      setFilesLoading(true);
      setTimeout(() => {
        const localFiles = localStorage.getItem("sandbox_google_drive_files");
        if (localFiles) {
          try {
            setFiles(JSON.parse(localFiles));
          } catch (e) {
            setFiles([]);
          }
        } else {
          // Pre-populate with default mock files
          const defaultFiles: DriveFile[] = [
            {
              id: "sb_file_1",
              name: "Chuong_1_Vat_Li_Nhiet_Tom_Tat.txt",
              mimeType: "text/plain",
              size: "1250",
              createdTime: new Date(Date.now() - 3600000 * 24).toISOString(),
              webViewLink: "#"
            },
            {
              id: "sb_file_2",
              name: "Phieu_Diem_Khao_Thi_12A1_Nguyen_Van_A.txt",
              mimeType: "text/plain",
              size: "850",
              createdTime: new Date(Date.now() - 3600000 * 2).toISOString(),
              webViewLink: "#"
            }
          ];
          localStorage.setItem("sandbox_google_drive_files", JSON.stringify(defaultFiles));
          setFiles(defaultFiles);
        }
        setFilesLoading(false);
      }, 400);
      return;
    }
    try {
      setFilesLoading(true);
      setErrorMsg("");
      const query = encodeURIComponent(`'${folderIdKey}' in parents and trashed = false`);
      const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType,size,createdTime,webViewLink)&orderBy=createdTime%20desc`;
      
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (!res.ok) {
        throw new Error(`Lỗi tải danh sách file: ${res.statusText}`);
      }

      const data = await res.json();
      setFiles(data.files || []);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Lỗi tải tệp tin từ thư mục Vật Lí 12");
    } finally {
      setFilesLoading(false);
    }
  };

  // Automatically fetch folder once token is available
  useEffect(() => {
    if (token) {
      locateSyncFolder(token);
    }
  }, [token, locateSyncFolder]);

  // Handle Login Flow
  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
        onEarnXP(50); // Earn 50 XP for connecting Drive!
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setErrorMsg(err.message || "Kết nối Google Account thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Logout Flow
  const handleLogout = async () => {
    try {
      if (isSandbox) {
        setIsSandbox(false);
        localStorage.removeItem("drive_sandbox_mode");
      } else {
        await logout();
      }
      setToken(null);
      setUser(null);
      setNeedsAuth(true);
      setFolderId(null);
      setFiles([]);
    } catch (err: any) {
      console.error("Logout failed:", err);
    }
  };

  // 2. Create the "Vật Lí 12" Folder
  const handleCreateFolder = async () => {
    if (isSandbox) {
      setFolderSearching(true);
      setTimeout(() => {
        setFolderId("SANDBOX_FOLDER_ID");
        setFolderSearching(false);
        setSyncStatus("Đã tạo thư mục 'Vật Lí 12' thành công trên Sandbox Drive!");
        onEarnXP(30);
        setTimeout(() => setSyncStatus(""), 4000);
        fetchFilesFromFolder(token || "sandbox_token", "SANDBOX_FOLDER_ID");
      }, 400);
      return;
    }
    if (!token) return;
    try {
      setFolderSearching(true);
      setErrorMsg("");
      
      const res = await fetch("https://www.googleapis.com/drive/v3/files", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Vật Lí 12",
          mimeType: "application/vnd.google-apps.folder"
        })
      });

      if (!res.ok) {
        throw new Error(`Tạo thư mục thất bại: ${res.statusText}`);
      }

      const data = await res.json();
      setFolderId(data.id);
      setSyncStatus("Đã tạo thư mục 'Vật Lí 12' thành công trên Google Drive!");
      onEarnXP(30); // Award XP
      setTimeout(() => setSyncStatus(""), 4000);
      
      // Fetch files (empty initially)
      fetchFilesFromFolder(token, data.id);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Lỗi khi khởi tạo thư mục đồng bộ");
    } finally {
      setFolderSearching(false);
    }
  };

  // 3. Robust Multipart File Upload to Google Drive Folder
  const uploadToDrive = async (filename: string, contentType: string, content: string) => {
    if (isSandbox) {
      setFilesLoading(true);
      setTimeout(() => {
        const newFile: DriveFile = {
          id: "sb_" + Math.random().toString(36).substr(2, 9),
          name: filename,
          mimeType: contentType,
          size: String(content.length),
          createdTime: new Date().toISOString(),
          webViewLink: "#"
        };
        
        let localFiles: DriveFile[] = [];
        const localStr = localStorage.getItem("sandbox_google_drive_files");
        if (localStr) {
          try {
            localFiles = JSON.parse(localStr);
          } catch (e) {
            localFiles = [];
          }
        }
        
        const existingIdx = localFiles.findIndex(f => f.name.toLowerCase() === filename.toLowerCase());
        if (existingIdx !== -1) {
          localFiles[existingIdx] = {
            ...localFiles[existingIdx],
            size: String(content.length),
            createdTime: new Date().toISOString()
          };
        } else {
          localFiles.unshift(newFile);
        }
        
        localStorage.setItem("sandbox_google_drive_files", JSON.stringify(localFiles));
        setFiles(localFiles);
        setFolderId("SANDBOX_FOLDER_ID");
        setSyncStatus(`Đã lưu trữ thành công '${filename}' lên Sandbox Drive!`);
        onEarnXP(25);
        setFilesLoading(false);
        setTimeout(() => setSyncStatus(""), 4000);
      }, 400);
      return;
    }
    if (!token) return;
    try {
      setFilesLoading(true);
      setErrorMsg("");

      // Ensure the sync folder exists first
      let currentFolderId = folderId;
      if (!currentFolderId) {
        // Automatically create folder if it does not exist
        const folderQuery = encodeURIComponent("name = 'Vật Lí 12' and mimeType = 'application/vnd.google-apps.folder' and trashed = false");
        const findRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${folderQuery}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const findData = await findRes.json();
        if (findData.files && findData.files.length > 0) {
          currentFolderId = findData.files[0].id;
          setFolderId(currentFolderId);
        } else {
          // Create new
          const createRes = await fetch("https://www.googleapis.com/drive/v3/files", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: "Vật Lí 12",
              mimeType: "application/vnd.google-apps.folder"
            })
          });
          const createData = await createRes.json();
          currentFolderId = createData.id;
          setFolderId(currentFolderId);
        }
      }

      const boundary = "physics_upload_boundary_999";
      const delimiter = `\r\n--${boundary}\r\n`;
      const closeDelim = `\r\n--${boundary}--`;

      const metadata = {
        name: filename,
        mimeType: contentType,
        parents: currentFolderId ? [currentFolderId] : []
      };

      const multipartRequestBody =
        delimiter +
        "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
        JSON.stringify(metadata) +
        delimiter +
        `Content-Type: ${contentType}\r\n\r\n` +
        content +
        closeDelim;

      const uploadUrl = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,createdTime,webViewLink";
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/related; boundary=${boundary}`
        },
        body: multipartRequestBody
      });

      if (!res.ok) {
        throw new Error(`Đồng bộ tệp tin thất bại: ${res.statusText}`);
      }

      setSyncStatus(`Đã lưu trữ thành công '${filename}' lên Google Drive!`);
      onEarnXP(25);
      setTimeout(() => setSyncStatus(""), 4000);

      // Refresh list
      if (currentFolderId) {
        fetchFilesFromFolder(token, currentFolderId);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Lỗi lưu tài liệu lên Drive");
    } finally {
      setFilesLoading(false);
    }
  };

  // Save Lesson Summary
  const handleSaveNotes = () => {
    const filename = docTitle.endsWith(".txt") ? docTitle : `${docTitle}.txt`;
    uploadToDrive(filename, "text/plain", docContent);
  };

  // Save Scorecard/Report
  const handleSaveScorecard = () => {
    const filename = `${examTitle.replace(/\s+/g, "_")}.txt`;
    const fullReport = 
      `BÁO CÁO KẾT QUẢ KHẢO THÍ HỌC TẬP VẬT LÍ 12\n` +
      `============================================\n\n` +
      `Học sinh: ${user?.displayName || "Học sinh THPT Tam Phú"}\n` +
      `Lớp: Vật Lí 12\n` +
      `Thời gian lưu báo cáo: ${new Date().toLocaleString("vi-VN")}\n\n` +
      `Tên Đề kiểm tra: ${examTitle}\n` +
      `Điểm số đạt được: ${examScore} / 10 điểm\n\n` +
      `ĐÁNH GIÁ CHI TIẾT CỦA TRỢ GIẢNG AI:\n` +
      `------------------------------------\n` +
      `${examFeedback}\n\n` +
      `Lưu trữ tự động thông qua Hệ thống Vật Lí 12 Connect.`;
    
    uploadToDrive(filename, "text/plain", fullReport);
  };

  // 4. Delete File from Drive with User Confirmation
  const handleDeleteFile = async (fileId: string, filename: string) => {
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa tài liệu "${filename}" khỏi thư mục "Vật Lí 12" không?\nHành động này không thể hoàn tác.`
    );
    if (!confirmed) return;

    if (isSandbox) {
      setFilesLoading(true);
      setTimeout(() => {
        let localFiles: DriveFile[] = [];
        const localStr = localStorage.getItem("sandbox_google_drive_files");
        if (localStr) {
          try {
            localFiles = JSON.parse(localStr);
          } catch (e) {
            localFiles = [];
          }
        }
        const updatedFiles = localFiles.filter(f => f.id !== fileId);
        localStorage.setItem("sandbox_google_drive_files", JSON.stringify(updatedFiles));
        setFiles(updatedFiles);
        setSyncStatus(`Đã xóa thành công tệp tin '${filename}' khỏi Sandbox Drive.`);
        setFilesLoading(false);
        setTimeout(() => setSyncStatus(""), 4000);
      }, 300);
      return;
    }

    if (!token) return;
    try {
      setFilesLoading(true);
      setErrorMsg("");

      const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error(`Lỗi khi xóa tệp tin: ${res.statusText}`);
      }

      setSyncStatus(`Đã xóa thành công tệp tin '${filename}' khỏi Drive.`);
      setTimeout(() => setSyncStatus(""), 4000);

      // Update local state
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Không thể xóa tệp tin");
    } finally {
      setFilesLoading(false);
    }
  };

  // 5. Handle Manual File Drop & Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    processLocalFile(selectedFile);
  };

  const processLocalFile = (file: File) => {
    const reader = new FileReader();
    setUploadProgress(`Đang đọc tệp ${file.name}...`);
    
    reader.onload = async (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setUploadProgress(`Đang tải '${file.name}' lên Google Drive...`);
        await uploadToDrive(file.name, file.type || "text/plain", result);
        setUploadProgress("");
      } else {
        setErrorMsg("Định dạng file không tương thích để đọc text.");
        setUploadProgress("");
      }
    };
    
    reader.onerror = () => {
      setErrorMsg("Không thể đọc tệp cục bộ này.");
      setUploadProgress("");
    };

    // Read as Text for simplest integration
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processLocalFile(droppedFile);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Render Authentication loading fallback
  if (authChecking) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center gap-4 bg-slate-900/60 rounded-3xl border border-slate-800/80 text-white min-h-[350px]">
        <RefreshCw className="h-10 w-10 text-cyan-400 animate-spin" />
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Đang kiểm tra kết nối với Google...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      
      {/* 1. Interactive Header */}
      <div className="relative p-6 sm:p-8 rounded-3xl border-2 border-slate-900 bg-gradient-to-br from-indigo-950/80 to-slate-950 text-white overflow-hidden shadow-[4px_4px_0px_#0f172a]">
        <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black tracking-widest text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20 uppercase">
              <Cloud className="h-3 w-3" />
              Tích hợp Đám mây
            </span>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-none text-white flex items-center gap-2.5">
              <span>Đồng bộ Google Drive</span>
              <Sparkles className="h-5 w-5 text-amber-400 animate-pulse shrink-0" />
            </h1>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">
              Khai thác tối đa sức mạnh lưu trữ đám mây. Đồng bộ trực tiếp lý thuyết Vật lí 12, bảng công thức tóm tắt, phiếu điểm kiểm tra năng lực THPT và các bài viết ghi chú học tập vào thư mục riêng của bạn trên Google Drive.
            </p>
          </div>

          {/* Connect & User Profile Section */}
          <div className="shrink-0 w-full md:w-auto">
            {needsAuth ? (
              <div className="flex flex-col gap-2.5 w-full md:w-auto">
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="gsi-material-button w-full cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="gsi-material-button-state"></div>
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: "block" }}>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">Kết nối Google Account</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setIsSandbox(true);
                    localStorage.setItem("drive_sandbox_mode", "true");
                  }}
                  className="w-full py-2 bg-slate-900/60 hover:bg-slate-800 text-[10px] uppercase font-black tracking-wider text-slate-300 rounded-xl transition-all cursor-pointer border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="h-3 w-3 text-cyan-400" />
                  Chạy chế độ Sandbox
                </button>
              </div>
            ) : (
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 md:flex-col md:items-stretch">
                <div className="flex items-center gap-3">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full border border-indigo-500" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs">
                      {user?.displayName ? user.displayName.charAt(0) : "G"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-black text-white leading-tight truncate">{user?.displayName || "Tài khoản Google"}</p>
                    <p className="text-[10px] text-indigo-300 font-medium truncate mt-0.5">{user?.email}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleDeleteFile ? handleLogout : undefined}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 text-[10px] uppercase font-black tracking-wider rounded-xl cursor-pointer transition-all md:mt-2"
                >
                  <LogOut className="h-3 w-3" />
                  <span>Ngắt kết nối</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sync Status Banner */}
      {syncStatus && (
        <div className="p-4 bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-300 rounded-2xl flex items-center gap-2.5 animate-bounce shadow-md">
          <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-extrabold tracking-wide uppercase">{syncStatus}</p>
        </div>
      )}

      {/* Error Message Banner */}
      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border-2 border-rose-500/30 text-rose-300 rounded-2xl flex items-center gap-2.5 animate-pulse shadow-md">
          <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
          <p className="text-xs font-bold leading-relaxed">{errorMsg}</p>
        </div>
      )}

      {/* Main Workspace Layout (Only shown when authenticated) */}
      {!needsAuth ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Actions and Upload Panel */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Sync Folder Controller */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <Folder className="h-4.5 w-4.5 text-amber-400" />
                Quản lý Thư mục Đồng bộ
              </h3>

              {folderSearching ? (
                <div className="py-4 text-center flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 text-amber-400 animate-spin" />
                  <p className="text-xs text-slate-400 font-bold">Đang quét Google Drive của bạn...</p>
                </div>
              ) : folderId ? (
                <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <FolderOpen className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">Thư mục "Vật Lí 12" đã SẴN SÀNG</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {folderId}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[9px] font-extrabold bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20">
                    ĐÃ KẾT NỐI
                  </span>
                </div>
              ) : (
                <div className="p-6 bg-slate-950/50 border-2 border-dashed border-slate-800 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto border border-amber-500/20">
                    <FolderPlus className="h-6 w-6 text-amber-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-white">Chưa tìm thấy thư mục đồng bộ riêng biệt</h4>
                    <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                      Để tránh xáo trộn tài liệu cá nhân trên Google Drive, hệ thống khuyến khích bạn tạo một thư mục riêng biệt mang tên <strong>"Vật Lí 12"</strong>.
                    </p>
                  </div>
                  <button
                    onClick={handleCreateFolder}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-[3px_3px_0px_#000]"
                  >
                    Tạo ngay thư mục "Vật Lí 12"
                  </button>
                </div>
              )}
            </div>

            {/* Save Physics Note Preset Card */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <FileText className="h-4.5 w-4.5 text-indigo-400" />
                Lưu tài liệu Lý thuyết & Công thức
              </h3>
              
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tên Tệp Tin (.txt)</label>
                  <input
                    type="text"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    placeholder="Tên tệp tin ghi chú lý thuyết..."
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nội dung học tập (Lý thuyết Vật lý)</label>
                  <textarea
                    rows={6}
                    value={docContent}
                    onChange={(e) => setDocContent(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500 transition-colors font-mono resize-none leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleSaveNotes}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-indigo-950 shadow-[3px_3px_0px_#000]"
                >
                  <Cloud className="h-4 w-4" />
                  Lưu bài học này lên Google Drive
                </button>
              </div>
            </div>

            {/* Save Exam Results Report Preset */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <Sparkles className="h-4.5 w-4.5 text-teal-400" />
                Lưu Báo cáo Điểm thi học sinh
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8 space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tên Đề kiểm tra</label>
                  <input
                    type="text"
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
                <div className="sm:col-span-4 space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Điểm số tự chọn</label>
                  <input
                    type="text"
                    value={examScore}
                    onChange={(e) => setExamScore(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-teal-400 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-teal-500 font-bold text-center"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phân tích kết quả học sinh</label>
                <textarea
                  rows={3}
                  value={examFeedback}
                  onChange={(e) => setExamFeedback(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-teal-500 transition-colors font-mono resize-none leading-relaxed"
                />
              </div>

              <button
                onClick={handleSaveScorecard}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-teal-950 shadow-[3px_3px_0px_#000]"
              >
                <CheckCircle className="h-4 w-4" />
                Xuất phiếu điểm lên Google Drive
              </button>
            </div>

          </div>

          {/* Right Column: Files List and Manual Upload Zone */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Local Drag & Drop Upload Zone */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <Upload className="h-4.5 w-4.5 text-cyan-400" />
                Tải lên Tệp từ Máy tính
              </h3>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileSelect}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? "border-cyan-400 bg-cyan-500/10 text-cyan-300 scale-[0.99]" 
                    : "border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-950/70"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".txt,.pdf,.png,.jpg,.jpeg,.doc,.docx"
                />
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto border border-cyan-500/20">
                    <Upload className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">Kéo thả tệp tin hoặc click để chọn</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Hỗ trợ: .txt, .pdf, .png, .jpg, .doc</p>
                  </div>
                </div>
              </div>

              {uploadProgress && (
                <div className="flex items-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-cyan-400 animate-pulse">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-wide">{uploadProgress}</p>
                </div>
              )}
            </div>

            {/* List Files in Thư mục Vật Lí 12 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <FolderOpen className="h-4.5 w-4.5 text-indigo-400" />
                  Tệp tin trong "Vật Lí 12"
                </h3>
                {folderId && (
                  <button
                    onClick={() => fetchFilesFromFolder(token!, folderId)}
                    title="Làm mới danh sách tệp"
                    disabled={filesLoading}
                    className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    <RefreshCw className={`h-4 w-4 ${filesLoading ? "animate-spin text-indigo-400" : ""}`} />
                  </button>
                )}
              </div>

              {filesLoading ? (
                <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                  <RefreshCw className="h-8 w-8 text-indigo-400 animate-spin" />
                  <p className="text-xs text-slate-400 font-bold">Đang tải danh sách tài liệu...</p>
                </div>
              ) : files.length > 0 ? (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {files.map((file) => (
                    <div 
                      key={file.id} 
                      className="p-3 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                          <File className="h-4 w-4 text-indigo-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-200 truncate pr-2" title={file.name}>{file.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[9px] font-mono text-slate-400">{formatBytes(file.size)}</span>
                            <span className="text-[9px] text-slate-500">•</span>
                            <span className="text-[9px] font-mono text-slate-400">
                              {new Date(file.createdTime).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:bg-indigo-500/20 text-indigo-400 rounded-lg border border-transparent hover:border-indigo-500/30 transition-all"
                            title="Mở tệp trên trình duyệt Google Drive"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleDeleteFile(file.id, file.name)}
                          className="p-1.5 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
                          title="Xóa tệp tin"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500">
                  <File className="h-8 w-8 mx-auto text-slate-600 mb-2" />
                  <p className="text-xs font-medium">Chưa có tài liệu nào trong thư mục.</p>
                  <p className="text-[10px] text-slate-600 mt-1">Hãy sử dụng các bảng mẫu xuất ghi chú bên trái để lưu trữ tệp tin đầu tiên của bạn!</p>
                </div>
              )}
            </div>

          </div>

        </div>
      ) : (
        /* Sign In Request Cover Card */
        <div className="p-10 text-center flex flex-col items-center justify-center gap-5 bg-slate-900/60 rounded-3xl border border-slate-800 max-w-xl mx-auto min-h-[300px] shadow-lg relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <Cloud className="h-8 w-8 text-indigo-400 animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-base font-black text-white uppercase tracking-wider">Yêu cầu kết nối Google Drive</h3>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Kết nối tài khoản Google của bạn để đồng bộ đám mây trực tiếp, hoặc nhấn nút dưới đây để trải nghiệm tức thì qua chế độ Sandbox ngoại tuyến mà không cần đăng nhập.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-[3px_3px_0px_#000] border border-indigo-950 flex items-center justify-center gap-2"
            >
              <Cloud className="h-4 w-4 shrink-0" />
              <span>Kết nối tài khoản</span>
            </button>
            <button
              onClick={() => {
                setIsSandbox(true);
                localStorage.setItem("drive_sandbox_mode", "true");
              }}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-cyan-400" />
              <span>Dùng chế độ Sandbox</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
