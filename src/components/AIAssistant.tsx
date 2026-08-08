import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Send, Brain, HelpCircle, Languages, AlertTriangle, RefreshCw, History, Plus, Trash2, MessageSquare, X } from "lucide-react";
import { SmartMessageRenderer } from "./SmartMessageRenderer";

interface Message {
  role: "user" | "model";
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: number;
  messages: Message[];
  activeMode: "general" | "solve" | "explain" | "bilingual" | "bloom";
}

function formatTime(timestamp: number) {
  const diffMs = Date.now() - timestamp;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Vừa xong";
  if (diffMins < 60) return `${diffMins} phút trước`;
  const diffHours = Math.floor(diffMins / 3600000);
  if (diffHours < 24) return `${diffHours} giờ trước`;
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

export function AIAssistant({ onEarnXP }: { onEarnXP: (xp: number) => void }) {
  // Initialize sessions from localStorage
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem("ai_assistant_sessions");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error("Error parsing saved sessions", e);
      }
    }
    const defaultSessionId = "session_" + Date.now();
    return [
      {
        id: defaultSessionId,
        title: "Cuộc hội thoại ban đầu",
        timestamp: Date.now(),
        messages: [
          {
            role: "model",
            content: "Chào bạn! Tôi là Giáo sư Vật lí AI chuyên biệt cho chương trình Vật lí 12 mới (GDPT 2018). Bạn cần tôi giúp giải bài tập, giải thích các định luật nhiệt học, lực từ hay cơ cấu hạt nhân hôm nay?"
          }
        ],
        activeMode: "general"
      }
    ];
  });

  // Track active session ID
  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    const savedActive = localStorage.getItem("ai_assistant_active_session_id");
    if (savedActive) {
      return savedActive;
    }
    return "";
  });

  // Align activeSessionId on mount or when sessions change
  useEffect(() => {
    const ids = sessions.map(s => s.id);
    if (!activeSessionId || !ids.includes(activeSessionId)) {
      const fallbackId = sessions[0]?.id || "";
      setActiveSessionId(fallbackId);
      localStorage.setItem("ai_assistant_active_session_id", fallbackId);
    }
  }, [sessions, activeSessionId]);

  // Derived active session
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];
  const messages = activeSession ? activeSession.messages : [];
  const activeMode = activeSession ? activeSession.activeMode : "general";

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const modePills = [
    { id: "general", label: "Hỏi đáp chung", desc: "Hỏi đáp nhanh lý thuyết", icon: Brain },
    { id: "solve", label: "Giải bài tập Lý", desc: "Giải chi tiết từng bước", icon: HelpCircle },
    { id: "explain", label: "Giải thích hiện tượng", desc: "Liên hệ thực tế đời sống", icon: Sparkles },
    { id: "bilingual", label: "Thuật ngữ Việt - Anh", desc: "Học từ vựng song ngữ", icon: Languages },
    { id: "bloom", label: "Phân tích Bloom", desc: "Đánh giá mức độ nhận thức", icon: Sparkles },
  ];

  // Custom helper to set messages inside active session
  const setMessages = (newMessages: Message[] | ((prev: Message[]) => Message[])) => {
    setSessions(prev => {
      const nextSessions = prev.map(s => {
        if (s.id === activeSessionId) {
          const resolvedMessages = typeof newMessages === "function" ? newMessages(s.messages) : newMessages;
          
          let title = s.title;
          if (s.title === "Cuộc hội thoại ban đầu" || s.title === "Trò chuyện mới") {
            const firstUserMsg = resolvedMessages.find(m => m.role === "user");
            if (firstUserMsg) {
              title = firstUserMsg.content.slice(0, 24) + (firstUserMsg.content.length > 24 ? "..." : "");
            }
          }

          return {
            ...s,
            messages: resolvedMessages,
            title,
            timestamp: Date.now()
          };
        }
        return s;
      });
      localStorage.setItem("ai_assistant_sessions", JSON.stringify(nextSessions));
      return nextSessions;
    });
  };

  // Custom helper to set active mode inside active session
  const setActiveMode = (mode: "general" | "solve" | "explain" | "bilingual" | "bloom") => {
    setSessions(prev => {
      const nextSessions = prev.map(s => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            activeMode: mode
          };
        }
        return s;
      });
      localStorage.setItem("ai_assistant_sessions", JSON.stringify(nextSessions));
      return nextSessions;
    });
  };

  const createNewSession = () => {
    const newId = "session_" + Date.now();
    const newSess: ChatSession = {
      id: newId,
      title: "Trò chuyện mới",
      timestamp: Date.now(),
      messages: [
        {
          role: "model",
          content: "Chào bạn! Tôi là Giáo sư Vật lí AI chuyên biệt cho chương trình Vật lí 12 mới (GDPT 2018). Bạn cần tôi giúp giải bài tập, giải thích các định luật nhiệt học, lực từ hay cơ cấu hạt nhân hôm nay?"
        }
      ],
      activeMode: "general"
    };

    setSessions(prev => {
      const nextSessions = [newSess, ...prev];
      localStorage.setItem("ai_assistant_sessions", JSON.stringify(nextSessions));
      return nextSessions;
    });
    setActiveSessionId(newId);
    localStorage.setItem("ai_assistant_active_session_id", newId);
    setLastFailedMessage(null);
  };

  const selectSession = (id: string) => {
    setActiveSessionId(id);
    localStorage.setItem("ai_assistant_active_session_id", id);
    setLastFailedMessage(null);
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (sessions.length <= 1) {
      setSessions(prev => {
        const resetSess = [{
          id: prev[0].id,
          title: "Cuộc hội thoại ban đầu",
          timestamp: Date.now(),
          messages: [
            {
              role: "model",
              content: "Chào bạn! Tôi là Giáo sư Vật lí AI chuyên biệt cho chương trình Vật lí 12 mới (GDPT 2018). Bạn cần tôi giúp giải bài tập, giải thích các định luật nhiệt học, lực từ hay cơ cấu hạt nhân hôm nay?"
            }
          ],
          activeMode: "general"
        }];
        localStorage.setItem("ai_assistant_sessions", JSON.stringify(resetSess));
        return resetSess;
      });
      return;
    }

    setSessions(prev => {
      const nextSessions = prev.filter(s => s.id !== id);
      localStorage.setItem("ai_assistant_sessions", JSON.stringify(nextSessions));
      
      if (activeSessionId === id) {
        const fallbackSession = nextSessions[0];
        setActiveSessionId(fallbackSession.id);
        localStorage.setItem("ai_assistant_active_session_id", fallbackSession.id);
      }
      
      return nextSessions;
    });
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: "model",
        content: "Hộp thoại đã được đặt lại. Tôi sẵn sàng giải đáp bất kì câu hỏi Vật lí 12 nào từ bạn!"
      }
    ]);
    setSessions(prev => {
      const updated = prev.map(s => {
        if (s.id === activeSessionId) {
          return { ...s, title: "Trò chuyện mới" };
        }
        return s;
      });
      localStorage.setItem("ai_assistant_sessions", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    // Avoid double user message insertion if retrying the same question
    const isRetryOfLast = customText && messages.length > 0 && 
      messages[messages.length - 1].role === "user" && 
      messages[messages.length - 1].content === textToSend;

    if (!isRetryOfLast) {
      const newUserMessage: Message = { role: "user", content: textToSend };
      setMessages((prev) => [...prev, newUserMessage]);
    }
    
    setInputMessage("");
    setIsTyping(true);
    setRetryCount(0);
    setLastFailedMessage(null);

    const maxRetries = 3;
    let attempt = 0;
    let success = false;
    let finalErrorMsg = "";
    let data: any = null;

    while (attempt < maxRetries && !success) {
      try {
        attempt++;
        if (attempt > 1) {
          setRetryCount(attempt);
          // Wait before retrying with small backoff
          await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt - 1)));
        }

        const response = await fetch("/api/gemini/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: textToSend,
            history: messages.filter(m => !(m.content.startsWith("❌ **Lỗi kết nối API:") || m.content.startsWith("⚠️ Đã xảy ra lỗi khi kết nối"))),
            mode: activeMode,
          }),
        });

        data = await response.json();
        if (response.ok && data.text) {
          success = true;
        } else {
          throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }
      } catch (err: any) {
        console.warn(`Retry attempt ${attempt} failed:`, err);
        finalErrorMsg = err.message || "Không thể kết nối với máy chủ API";
        
        // Skip further retries for explicit quota issues
        const lowerErr = finalErrorMsg.toLowerCase();
        if (lowerErr.includes("quota") || lowerErr.includes("exhausted") || lowerErr.includes("limit exceeded") || lowerErr.includes("rate_limit")) {
          break;
        }
      }
    }

    setIsTyping(false);
    setRetryCount(0);

    if (success && data) {
      setMessages((prev) => {
        // Clean out any error or connection messages
        const filtered = prev.filter(m => !(m.role === "model" && (m.content.startsWith("❌ **Lỗi kết nối API:") || m.content.startsWith("⚠️ Đã xảy ra lỗi khi kết nối"))));
        return [...filtered, { role: "model", content: data.text }];
      });
      onEarnXP(20); // Award 20 XP for engaging with AI
    } else {
      setLastFailedMessage(textToSend);
      let friendlyMsg = "";
      
      const lowerErr = finalErrorMsg.toLowerCase();
      if (lowerErr.includes("quota") || lowerErr.includes("exhausted") || lowerErr.includes("limit exceeded") || lowerErr.includes("rate_limit")) {
        friendlyMsg = `⚠️ **Hệ thống AI đã vượt quá giới hạn lượt dùng thử miễn phí trong ngày (API Quota Exceeded).**\n\nĐể tiếp tục sử dụng không giới hạn, Thầy/Cô và các em học sinh có thể cài đặt mã khóa API cá nhân (**GEMINI_API_KEY**) của mình trong phần **Cài đặt (Settings)** ở thanh điều khiển của AI Studio, hoặc thử lại sau nhé!`;
      } else {
        friendlyMsg = `❌ **Lỗi kết nối API:** Không thể thiết lập liên kết với máy chủ Trợ lý AI sau ${attempt} lần thử tự động. (Chi tiết kỹ thuật: *${finalErrorMsg}*)\n\n### 🔧 Các bước gợi ý khắc phục và kiểm tra mạng:\n1. 🌐 **Kiểm tra Internet:** Đảm bảo thiết bị của bạn đang được kết nối với mạng Wifi/3G/4G/5G ổn định bằng cách thử tải lại trang hoặc truy cập trang web khác.\n2. 🔌 **Tường lửa học đường/văn phòng:** Nhiều mạng trường học, công ty thường chặn các cổng API hướng ngoại. Hãy thử sử dụng mạng di động cá nhân (Hotspot 4G/5G).\n3. 🔒 **Tắt phần mềm VPN/Proxy:** Nếu bạn đang sử dụng phần mềm giả lập IP hoặc proxy ẩn danh, hãy tạm thời tắt đi để tránh định tuyến sai địa chỉ mạng.\n4. ⚙️ **Cấu hình Khóa API cá nhân:** Trong trường hợp khóa API dùng chung quá tải, bạn có thể tự cấp và dán **GEMINI_API_KEY** của mình ở nút **Cài đặt (Settings)** ở bảng phía trên.\n\n*Bạn có thể bấm nút **"Gửi lại ngay"** ở hộp thông báo bên dưới để gửi lại câu hỏi này khi kết nối mạng được phục hồi.*`;
      }

      setMessages((prev) => {
        const filtered = prev.filter(m => !(m.role === "model" && (m.content.startsWith("❌ **Lỗi kết nối API:") || m.content.startsWith("⚠️ Đã xảy ra lỗi khi kết nối"))));
        return [...filtered, { role: "model", content: friendlyMsg }];
      });
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl flex h-[620px] overflow-hidden">
      
      {/* Sidebar for History */}
      <div className={`border-r border-slate-800 flex flex-col transition-all duration-300 ${showSidebar ? "w-64" : "w-0"} overflow-hidden bg-slate-950/40 shrink-0`}>
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-purple-400" />
            <span className="text-xs font-bold text-slate-200">Lịch sử trò chuyện</span>
          </div>
          <button
            onClick={() => setShowSidebar(false)}
            className="p-1 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-3 border-b border-slate-800">
          <button
            onClick={createNewSession}
            className="w-full py-2 px-3 bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/10 active:scale-[0.98]"
          >
            <Plus className="h-3.5 w-3.5 stroke-[3]" />
            Hội thoại mới
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {sessions.map((sess) => {
            const isActive = sess.id === activeSessionId;
            return (
              <div
                key={sess.id}
                onClick={() => selectSession(sess.id)}
                className={`group flex items-center justify-between p-2.5 rounded-xl text-xs transition-all cursor-pointer border ${
                  isActive
                    ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                    : "bg-transparent border-transparent hover:bg-slate-900/40 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <MessageSquare className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-purple-400" : "text-slate-500"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{sess.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{formatTime(sess.timestamp)}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => deleteSession(sess.id, e)}
                  className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-slate-800/80 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                  title="Xóa hội thoại"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col p-6 min-w-0">
        
        {/* Header Info */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="text-purple-400 h-5 w-5 animate-pulse" />
              Trợ lý Giáo viên & Học sinh AI Vật Lí 12
            </h2>
            <p className="text-xs text-slate-400 mt-1">Phân tích sâu sắc, giải quyết bài tập bám sát chương trình 2018</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className={`p-2 border rounded-xl transition-all relative cursor-pointer ${
                showSidebar 
                  ? "bg-purple-500/10 border-purple-500/30 text-purple-400" 
                  : "bg-slate-950 border-slate-850 hover:border-slate-750 text-slate-400 hover:text-white"
              }`}
              title="Lịch sử hội thoại"
            >
              <History className="h-4 w-4" />
              {sessions.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-slate-950 text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-slate-900 animate-pulse">
                  {sessions.length}
                </span>
              )}
            </button>
            
            <button
              onClick={handleResetChat}
              className="p-2 bg-slate-950 border border-slate-850 hover:border-slate-750 text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer"
              title="Reset chat"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mode Selector pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-3 shrink-0 custom-scrollbar">
          {modePills.map((pill) => {
            const Icon = pill.icon;
            const isActive = activeMode === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveMode(pill.id as any)}
                className={`px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-purple-500/10 border-purple-500/40 text-purple-400 shadow-md"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:border-slate-750 hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Chat messages viewport */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 custom-scrollbar bg-slate-950/30 p-4 rounded-2xl border border-slate-850/80">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-tr-none"
                    : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                }`}
              >
                {/* Formatted Text rendering */}
                <div className="leading-relaxed select-text font-medium">
                  <SmartMessageRenderer content={msg.content} isLightMode={false} />
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-400 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-bounce"></span>
                <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]"></span>
                <span>
                  {retryCount > 0 
                    ? `⚠️ Gặp sự cố kết nối. Đang kết nối lại tự động (Lần ${retryCount}/3)...` 
                    : "Giáo sư AI đang suy nghĩ..."}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Suggestions */}
        <div className="flex flex-wrap gap-2 mb-3 shrink-0">
          <button
            onClick={() => handleSendMessage("Hãy tóm tắt và dịch thuật ngữ Anh-Việt của bài: Vật lí hạt nhân")}
            className="text-[10px] bg-slate-950 border border-slate-850 hover:border-slate-700 hover:text-white text-slate-400 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            💡 Tóm tắt Vật lí Hạt nhân
          </button>
          <button
            onClick={() => handleSendMessage("Nhiệt nóng chảy riêng λ của nước đá là bao nhiêu? Hãy lấy ví dụ ứng dụng thực tế của nó.")}
            className="text-[10px] bg-slate-950 border border-slate-850 hover:border-slate-700 hover:text-white text-slate-400 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            🌡️ Ứng dụng nhiệt nóng chảy đá
          </button>
        </div>

        {/* Connection retry helper panel */}
        {lastFailedMessage && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 mb-3 flex items-center justify-between gap-3 text-xs text-red-400 shrink-0">
            <div className="flex items-center gap-2 flex-1">
              <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 animate-pulse" />
              <p className="line-clamp-1">Không thể gửi tin nhắn. Bạn muốn thử gửi lại tự động không?</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handleSendMessage(lastFailedMessage)}
                className="px-3 py-1.5 bg-red-500/20 text-red-200 border border-red-500/40 rounded-lg hover:bg-red-500 hover:text-slate-950 font-bold transition-all flex items-center gap-1.5 cursor-pointer text-[11px]"
              >
                <RefreshCw className="h-3 w-3 animate-spin" style={{ animationDuration: '3s' }} />
                Thử lại ngay
              </button>
              <button
                onClick={() => setLastFailedMessage(null)}
                className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all cursor-pointer text-[11px]"
              >
                Bỏ qua
              </button>
            </div>
          </div>
        )}

        {/* Input box */}
        <div className="flex gap-2 shrink-0">
          <input
            type="text"
            placeholder="Nhập câu hỏi Vật lí lớp 12..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isTyping}
            className="p-3 bg-purple-500 hover:bg-purple-400 text-slate-950 rounded-xl transition-colors cursor-pointer flex items-center justify-center shadow-lg shadow-purple-500/10 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

