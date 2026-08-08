import { useState, useEffect, useRef } from "react";
import { Sparkles, RefreshCw, Send, Brain, AlertTriangle } from "lucide-react";
import { SmartMessageRenderer } from "./SmartMessageRenderer";

interface Message {
  role: "user" | "model";
  content: string;
}

interface LessonAssistantProps {
  lessonId: string; // e.g., "lesson1" or "l1"
  lessonTitle: string; // e.g., "Bài 1: Cấu trúc của chất. Sự chuyển thể"
}

// Map of custom educational questions for each lesson
const LESSON_SUGGESTIONS: Record<string, string[]> = {
  l1: [
    "Thuyết động học phân tử về cấu trúc của chất gồm những giả thuyết nào?",
    "Tại sao chất rắn có hình dạng xác định còn chất khí thì không?",
    "Phân biệt sự thăng hoa và sự ngưng kết bằng ví dụ thực tế.",
    "Lực liên kết phân tử ảnh hưởng thế nào đến tính chất các thể?"
  ],
  l2: [
    "Phát biểu Định luật I của nhiệt động lực học và viết công thức.",
    "Giải thích quy ước dấu của nhiệt lượng Q và công A trong ΔU = A + Q.",
    "Làm thế nào để thay đổi nội năng của một vật? Cho ví dụ.",
    "Động cơ nhiệt có cấu tạo gồm những bộ phận cơ bản nào?"
  ],
  l3: [
    "Trạng thái cân bằng nhiệt là gì và có tính chất thế nào?",
    "Hãy so sánh thang nhiệt độ Celsius và thang Kelvin.",
    "Nhiệt độ không độ tuyệt đối (0 Kelvin) có ý nghĩa vật lý là gì?",
    "Nhiệt kế y tế thủy ngân hoạt động dựa trên nguyên lý nào?"
  ],
  l4: [
    "Nhiệt dung riêng của một chất cho biết điều gì?",
    "Viết công thức tính nhiệt lượng thu vào/tỏa ra khi thay đổi nhiệt độ.",
    "Tại sao nước có nhiệt dung riêng lớn và điều này giúp ích gì cho khí hậu?",
    "Làm thế nào để đo nhiệt dung riêng của một chất bằng thực nghiệm?"
  ],
  l5: [
    "Nhiệt nóng chảy riêng λ là gì và có đơn vị đo thế nào?",
    "Viết công thức tính nhiệt lượng cần cung cấp để nóng chảy chất rắn.",
    "Tại sao trong suốt quá trình nóng chảy nhiệt độ của hệ không thay đổi?",
    "Ứng dụng của nhiệt nóng chảy riêng trong kỹ thuật đúc kim loại là gì?"
  ],
  l6: [
    "Nhiệt hóa hơi riêng L là gì và có đơn vị đo thế nào?",
    "Phân biệt sự bay hơi và sự sôi của chất lỏng.",
    "Viết công thức tính nhiệt lượng cần để hóa hơi hoàn toàn chất lỏng ở nhiệt độ sôi.",
    "Tại sao khi đổ cồn lên tay ta lại cảm thấy mát lạnh ở vùng da đó?"
  ],
  l7: [
    "Phương pháp giải bài tập cân bằng nhiệt tổng quát là gì?",
    "Một khối khí nhận nhiệt lượng 100J và thực hiện công 40J. Tính độ biến thiên nội năng.",
    "Làm sao xác định sai số của phép đo nhiệt lượng trong thí nghiệm?",
    "Cách áp dụng đúng quy ước dấu của A và Q để tránh bị nhầm lẫn."
  ],
  l8: [
    "Thí nghiệm chuyển động Brown chứng minh điều gì về phân tử khí?",
    "Nêu 3 luận điểm cơ bản của thuyết động học phân tử chất khí.",
    "Nguồn gốc gây ra áp suất chất khí tác dụng lên thành bình là gì?",
    "Khí lý tưởng khác khí thực tế ở những điểm quan trọng nào?"
  ],
  l9: [
    "Thế nào là quá trình đẳng nhiệt của một lượng khí xác định?",
    "Phát biểu Định luật Boyle và viết công thức liên hệ p và V.",
    "Đồ thị đường đẳng nhiệt trong hệ tọa độ (p, V) có dạng như thế nào?",
    "Nén khí đẳng nhiệt từ 10 lít xuống 5 lít thì áp suất thay đổi ra sao?"
  ],
  l10: [
    "Thế nào là quá trình đẳng áp và định luật Charles?",
    "Hệ thức định luật Charles là gì và nhiệt độ phải đo bằng đơn vị nào?",
    "Đồ thị đường đẳng áp trong hệ tọa độ (V, T) có đặc điểm gì?",
    "Nếu đun nóng khối khí đẳng áp từ 300K lên 400K thì thể tích thay đổi thế nào?"
  ],
  l11: [
    "Xây dựng phương trình trạng thái của khí lí tưởng từ các đẳng quá trình.",
    "Viết phương trình Clapeyron - Mendeleev tổng quát cho n mol khí.",
    "Hằng số khí lí tưởng R có giá trị và đơn vị là gì trong hệ SI?",
    "Giải bài tập áp dụng phương trình trạng thái p1.V1/T1 = p2.V2/T2."
  ]
};

// Also support lesson1, lesson2 formats by normalization
const normalizeId = (id: string): string => {
  const clean = id.toLowerCase().trim();
  if (clean.startsWith("lesson")) {
    return "l" + clean.replace("lesson", "");
  }
  return clean;
};

export function LessonAssistant({ lessonId, lessonTitle }: LessonAssistantProps) {
  const normId = normalizeId(lessonId);
  const displayNum = normId.replace("l", "");
  
  const initialGreeting = `Thầy/Cô là Trợ lý ảo AI của Bài ${displayNum}. Thầy/Cô rất vui lòng được hỗ trợ các em giải đáp mọi thắc mắc liên quan đến kiến thức của bài học "${lessonTitle}" và môn Vật lí lớp 12 nói chung!`;

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: initialGreeting
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Retrieve custom suggestions or default list
  const suggestions = LESSON_SUGGESTIONS[normId] || [
    "Hãy giải thích tóm tắt trọng tâm nội dung bài học này.",
    "Lấy ví dụ thực tiễn liên quan đến bài học.",
    "Giải thích ý nghĩa vật lý của các công thức trong bài.",
    "Cho em một câu hỏi ôn tập lý thuyết của bài học."
  ];

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

    // Prepare API mode
    // The server expects mode values like "lesson1", "lesson2", etc.
    const apiMode = normId.replace("l", "lesson");

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
          // Wait with progressive delay
          await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt - 1)));
        }

        const response = await fetch("/api/gemini/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: textToSend,
            history: messages.filter(m => !(m.content.startsWith("❌ **Lỗi kết nối") || m.content.startsWith("⚠️ Thầy/Cô đang gặp"))),
            mode: apiMode,
          }),
        });

        data = await response.json();
        if (response.ok && data.text) {
          success = true;
        } else {
          throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }
      } catch (err: any) {
        console.warn(`Retry attempt ${attempt} failed for LessonAssistant:`, err);
        finalErrorMsg = err.message || "Không thể kết nối với máy chủ AI";
        
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
        const filtered = prev.filter(m => !(m.role === "model" && (m.content.startsWith("❌ **Lỗi kết nối") || m.content.startsWith("⚠️ Thầy/Cô đang gặp"))));
        return [...filtered, { role: "model", content: data.text }];
      });
    } else {
      setLastFailedMessage(textToSend);
      let friendlyMsg = "";
      
      const lowerErr = finalErrorMsg.toLowerCase();
      if (lowerErr.includes("quota") || lowerErr.includes("exhausted") || lowerErr.includes("limit exceeded") || lowerErr.includes("rate_limit")) {
        friendlyMsg = `⚠️ **Hệ thống Giáo viên AI đang tạm thời vượt quá giới hạn lưu lượng dùng thử miễn phí hôm nay (API Quota Exceeded).**\n\nĐể tiếp tục trò chuyện không giới hạn, Thầy/Cô và các em học sinh có thể cài đặt mã khóa API cá nhân (**GEMINI_API_KEY**) của mình trong phần **Cài đặt (Settings)** phía trên nhé!`;
      } else {
        friendlyMsg = `❌ **Lỗi kết nối mạng:** Thầy/Cô không thể liên lạc được với máy chủ AI sau ${attempt} lần thử tự động. (Lỗi chi tiết: *${finalErrorMsg}*)\n\n### 🔧 Các bước gợi ý em kiểm tra kết nối mạng:\n1. 🌐 **Xem lại Internet:** Hãy chắc chắn điện thoại hoặc máy tính của em đã kết nối Wifi hoặc mạng di động (3G/4G/5G) thành công nhé.\n2. 🔌 **Mạng trường học chặn API:** Một số mạng học đường, phòng tin học của trường có tường lửa chặn kết nối bên ngoài. Em hãy thử đổi sang điểm phát di động 4G/5G của mình xem sao.\n3. 🔒 **Vô hiệu hóa VPN/Proxy:** Nếu em đang dùng tiện ích đổi IP, phần mềm VPN hay Proxy, hãy tắt đi để tín hiệu truyền tải không bị gián đoạn.\n4. ⚙️ **Nhập lại khóa API:** Nếu em đang dùng khóa API riêng biệt, hãy kiểm tra xem khóa đó có bị nhập sai ký tự nào không nha.\n\n*Sau khi kiểm tra xong, em có thể bấm nút **"Gửi lại ngay"** ở bảng báo lỗi dưới đây để Thầy/Cô giải đáp câu hỏi nhé!*`;
      }

      setMessages((prev) => {
        const filtered = prev.filter(m => !(m.role === "model" && (m.content.startsWith("❌ **Lỗi kết nối") || m.content.startsWith("⚠️ Thầy/Cô đang gặp"))));
        return [...filtered, { role: "model", content: friendlyMsg }];
      });
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="relative bg-indigo-50/50 p-6 rounded-3xl border-2 border-slate-900 shadow-[6px_6px_0px_#1e293b] space-y-4 overflow-hidden mt-8 z-10" id={`ai-assistant-${normId}`}>
      <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
      
      <div className="relative z-10 flex items-center justify-between border-b-2 border-slate-900 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-100 border-2 border-slate-900 text-indigo-950 rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            <Sparkles className="h-5 w-5 animate-pulse text-indigo-700" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide">Trợ lý Giáo viên AI - Giải đáp Bài {displayNum}</h4>
            <p className="text-[10px] text-slate-700 font-bold">Chuyên gia giải đáp về {lessonTitle.split(":")[1]?.trim() || lessonTitle} • Sư phạm mẫu mực & Kiên nhẫn</p>
          </div>
        </div>
        <button
          onClick={() => setMessages([
            {
              role: "model",
              content: initialGreeting
            }
          ])}
          className="p-1.5 hover:bg-indigo-50 border-2 border-slate-800 text-slate-950 rounded-xl transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
          title="Đặt lại trò chuyện"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Chat view window */}
      <div className="relative z-10 h-80 overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-800 custom-scrollbar shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b] ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none border-indigo-700"
                  : "bg-white text-slate-900 rounded-tl-none border-slate-800"
              }`}
            >
              <div className="font-sans font-black text-[9px] uppercase tracking-wide mb-1 opacity-80">
                {msg.role === "user" ? "Học sinh" : "Thầy/Cô Giáo viên AI"}
              </div>
              <div className="leading-relaxed select-text font-bold">
                <SmartMessageRenderer content={msg.content} isLightMode={true} />
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border-2 border-slate-800 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-400 flex items-center gap-2 shadow-[2px_2px_0px_0px_#1e293b]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-600 animate-bounce"></span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[10px] text-slate-500 font-bold">
                {retryCount > 0 
                  ? `⚠️ Gặp sự cố kết nối. Đang kết nối lại tự động (Lần ${retryCount}/3)...` 
                  : "Thầy/Cô đang viết câu trả lời..."}
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Quick Pills */}
      <div className="relative z-10 flex flex-wrap gap-1.5 pt-1.5">
        <span className="text-[10px] text-slate-600 font-black self-center mr-1">Gợi ý câu hỏi:</span>
        {suggestions.map((promptText, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(promptText)}
            disabled={isTyping}
            className="text-[10px] bg-white hover:bg-indigo-50 border-2 border-slate-800 text-slate-900 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer font-black disabled:opacity-50 shadow-[1.5px_1.5px_0px_#1e293b] active:translate-y-[0.5px]"
          >
            {promptText}
          </button>
        ))}
      </div>

      {/* Connection retry helper panel */}
      {lastFailedMessage && (
        <div className="relative z-10 bg-rose-50 border-2 border-slate-900 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs text-rose-950 font-black shadow-[3px_3px_0px_#000]">
          <div className="flex items-center gap-2 flex-1">
            <AlertTriangle className="h-4 w-4 text-rose-700 shrink-0 animate-pulse" />
            <p className="line-clamp-1">Không thể gửi tin nhắn. Em muốn thử gửi lại tự động không?</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => handleSendMessage(lastFailedMessage)}
              className="px-3 py-1.5 bg-rose-600 text-white border-2 border-slate-900 rounded-xl hover:bg-rose-500 font-black transition-all flex items-center gap-1.5 cursor-pointer text-[11px] shadow-[1.5px_1.5px_0px_#000] active:translate-y-[0.5px] active:shadow-[0.5px_0.5px_0px_#000]"
            >
              <RefreshCw className="h-3 w-3 animate-spin" style={{ animationDuration: '3s' }} />
              Thử lại ngay
            </button>
            <button
              onClick={() => setLastFailedMessage(null)}
              className="px-2 py-1.5 bg-white border-2 border-slate-900 text-slate-700 rounded-xl hover:bg-slate-50 transition-all cursor-pointer text-[11px] shadow-[1.5px_1.5px_0px_#000] active:translate-y-[0.5px] active:shadow-[0.5px_0.5px_0px_#000]"
            >
              Bỏ qua
            </button>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="relative z-10 flex items-center gap-2 pt-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          disabled={isTyping}
          placeholder={`Đặt câu hỏi về Bài ${displayNum}...`}
          className="flex-1 text-xs font-black bg-white border-2 border-slate-800 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50 shadow-[2px_2px_0px_#1e293b]"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isTyping || !inputMessage.trim()}
          className="p-3 bg-indigo-600 hover:bg-indigo-500 border-2 border-slate-800 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-[3px_3px_0px_#000] active:translate-y-[1px] active:shadow-[1.5px_1.5px_0px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
