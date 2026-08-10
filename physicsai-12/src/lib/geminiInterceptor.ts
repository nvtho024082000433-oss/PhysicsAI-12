import { GoogleGenAI, Type } from "@google/genai";
import {
  getLocalPhysicsResponse,
  getLocalExamResponse,
  getLocalAnalyzeExamResponse,
  getLocalSummarizeResponse,
  getLocalParseExerciseResponse
} from "./localPhysicsBot";

const originalFetch = window.fetch;

// A helper function to safely run direct client-side Gemini requests
async function runClientSideGemini(url: string, bodyObj: any): Promise<any> {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || 
                 (window as any).GEMINI_API_KEY || 
                 (process.env as any).GEMINI_API_KEY || 
                 localStorage.getItem("GEMINI_API_KEY") || 
                 localStorage.getItem("VITE_GEMINI_API_KEY") || 
                 (import.meta as any).env?.GEMINI_API_KEY || 
                 "";
  
  if (!apiKey) {
    throw new Error("Chưa cấu hình API Key cho Trợ lý AI. Vui lòng kiểm tra lại thiết lập.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelName = "gemini-2.5-flash";

  try {
    if (url.includes("/api/gemini/chat")) {
    const { message, history, mode } = bodyObj;
    
    let systemInstruction = "Bạn là Chuyên gia Vật Lí 12 xuất sắc.";
    if (mode === "tutor") {
      systemInstruction = "Bạn là Trợ lý Sư phạm Vật lí 12 thông thái, hài hước, ân cần. Hãy kiên nhẫn giảng giải...";
    } else if (mode === "examiner") {
      systemInstruction = "Bạn là Chuyên gia Khảo thí môn Vật lí 12...";
    } else if (mode === "game-master") {
      systemInstruction = "Bạn là Trọng tài Trò chơi Đấu trí Vật lí 12...";
    }

    const contents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        const textVal = h.content || h.message || h.text || (h.parts && h.parts[0]?.text) || "";
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: textVal }]
        });
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return { text: response.text, isFallback: true };
  }

  if (url.includes("/api/gemini/create-exam")) {
    const { chapters = [], time = 45, ratio = { nb: 40, th: 30, vd: 20, vdc: 10 }, part1, part2, part3 } = bodyObj;
    const p1 = part1 || { count: 4, points: 4.0 };
    const p2 = part2 || { count: 2, points: 4.0 };
    const p3 = part3 || { count: 2, points: 2.0 };

    const prompt = `Hãy tạo một đề kiểm tra hoàn chỉnh cho môn Vật lí lớp 12 (Chương trình GDPT 2018) với cấu trúc sau:
- Các chương/chủ đề: ${chapters.join(", ")}
- Thời gian làm bài: ${time} phút
- Tỉ lệ nhận thức (Nhận biết - Thông hiểu - Vận dụng - Vận dụng cao): ${ratio.nb}% - ${ratio.th}% - ${ratio.vd}% - ${ratio.vdc}%

Đề kiểm tra phải được phân chia thành 3 phần rõ ràng theo cấu trúc đề thi tốt nghiệp THPT mới của Bộ Giáo dục và Đào tạo:
1. PHẦN I: Trắc nghiệm nhiều lựa chọn (chọn 1 đáp án đúng trong 4 phương án).
   - Số lượng câu hỏi: ${p1.count} câu (tổng cộng ${p1.points} điểm).
2. PHẦN II: Trắc nghiệm Đúng/Sai (Mỗi câu gồm một tình huống dẫn và 4 phát biểu độc lập a, b, c, d, Thí sinh lựa chọn Đúng hoặc Sai cho từng phát biểu).
   - Số lượng câu hỏi: ${p2.count} câu (tổng cộng ${p2.points} điểm).
3. PHẦN III: Trắc nghiệm trả lời ngắn (Điền giá trị số cho câu hỏi tự luận ngắn/tính toán thực tế).
   - Số lượng câu hỏi: ${p3.count} câu (tổng cộng ${p3.points} điểm).

Trả về JSON bám sát schema yêu cầu.`;

    const response = await ai.models.generateContent({
      model: modelName,
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
      }
    });

    return JSON.parse(response.text || "{}");
  }

  if (url.includes("/api/gemini/analyze-exam")) {
    const { fileData, fileName, fileType, rawText } = bodyObj;
    
    let contents: any[] = [];
    let systemInstruction = 
      "Bạn là Chuyên gia Khảo thí và Đánh giá Giáo dục Vật lí Việt Nam.\n" +
      "Hãy phân tích đề kiểm tra Vật lí 12 được tải lên dưới đây và trích xuất cấu trúc đề thi, ma trận, chuẩn năng lực GDPT 2018.\n" +
      "Trả về kết quả chi tiết theo định dạng JSON chứa các thông tin phân tích rõ ràng.";

    if (fileData && fileType) {
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
      contents.push({
        parts: [
          {
            text: `Đây là nội dung đề kiểm tra Vật lí 12:\n\n${rawText}\n\n Hãy phân tích toàn bộ đề kiểm tra này và trả về JSON chứa thông tin chi tiết.`
          }
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: modelName,
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
            criteriaEvaluation: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  criterion: { type: Type.STRING, description: "Tiêu chí ví dụ: Độ phủ kiến thức, Tỉ lệ nhận thức, Phù hợp GDPT 2018" },
                  score: { type: Type.INTEGER, description: "Thang điểm 1 đến 10" },
                  comment: { type: Type.STRING, description: "Nhận xét chi tiết sư phạm" }
                },
                required: ["criterion", "score", "comment"]
              }
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Đề xuất cải tiến đề thi"
            }
          },
          required: ["extractedTitle", "stats", "criteriaEvaluation", "recommendations"]
        },
        temperature: 0.5,
      }
    });

    return JSON.parse(response.text || "{}");
  }

  if (url.includes("/api/gemini/summarize-lesson")) {
    const { title, content } = bodyObj;
    const prompt = `Hãy phân tích bài học Vật lí 12 mang tên "${title}". Nội dung hoặc mô tả bài học như sau: "${content}".
Hãy xuất bản tóm tắt bài học dưới dạng JSON gồm:
1. Một đoạn tóm tắt siêu tốc (Flashcard Summary).
2. Danh sách 3 khái niệm cốt lõi cần ghi nhớ (Key concepts).
3. Giải thích một hiện tượng thực tế khó liên quan đến bài học bằng ngôn từ dễ hiểu nhất.
4. Sơ đồ tư duy dạng chữ (Text Mindmap) phân nhánh.
5. Sơ đồ tư duy dạng JSON hoặc tóm tắt sơ đồ tư duy dạng văn bản (Mindmap text).
6. Bộ 3 câu hỏi trắc nghiệm nhanh (Quiz) ôn luyện có đáp án và giải thích ngắn.`;

    const response = await ai.models.generateContent({
      model: modelName,
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
      }
    });

    return JSON.parse(response.text || "{}");
  }

  if (url.includes("/api/gemini/parse-uploaded-exercise")) {
    const { fileData, fileType } = bodyObj;
    
    let contents: any[] = [];
    const mimeType = fileType || "image/jpeg";
    const base64Data = fileData.split(",")[1] || fileData;
    
    contents.push({
      inlineData: {
        mimeType,
        data: base64Data
      }
    });
    
    contents.push({
      text: "Hãy thực hiện nhận diện tất cả câu hỏi Vật lí lớp 12 và trích xuất thành cấu trúc JSON bám sát schema."
    });

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
      model: modelName,
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
                  question: { type: Type.STRING },
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
                required: ["id", "question", "statements"]
              }
            }
          },
          required: ["questionsP1", "questionsP2"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  }

  throw new Error(`Endpoint không được hỗ trợ dự phòng trên máy khách: ${url}`);
  } catch (error: any) {
    console.error("Lỗi Google Gemini API:", error);
    const apiErrorMsg = error.message || String(error);
    throw new Error(apiErrorMsg);
  }
}

function getLocalFallbackData(url: string, bodyObj: any): any {
  if (url.includes("/api/gemini/chat")) {
    const { message, mode } = bodyObj || {};
    return getLocalPhysicsResponse(message || "", mode || "general");
  }
  if (url.includes("/api/gemini/create-exam")) {
    const { chapters, ratio, part1, part2, part3 } = bodyObj || {};
    const p1 = part1 || { count: 4, points: 4.0 };
    const p2 = part2 || { count: 2, points: 4.0 };
    const p3 = part3 || { count: 2, points: 2.0 };
    return getLocalExamResponse(chapters || [], ratio, p1, p2, p3);
  }
  if (url.includes("/api/gemini/analyze-exam")) {
    const { studentAnswers, examQuestions } = bodyObj || {};
    return getLocalAnalyzeExamResponse(studentAnswers || [], examQuestions || []);
  }
  if (url.includes("/api/gemini/summarize-lesson")) {
    const { title, content } = bodyObj || {};
    return getLocalSummarizeResponse(title || "", content || "");
  }
  if (url.includes("/api/gemini/parse-uploaded-exercise")) {
    const { fileName, textContent } = bodyObj || {};
    return getLocalParseExerciseResponse(fileName || "", textContent || "");
  }
  return { error: "Không hỗ trợ yêu cầu này ngoại tuyến." };
}

const customFetch = async function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const urlStr = typeof input === "string" ? input : (input instanceof URL ? input.href : input.url);
  
  if (urlStr.includes("/api/gemini/")) {
    let bodyObj: any = {};
    if (init && init.body) {
      try {
        bodyObj = JSON.parse(init.body as string);
      } catch (_) {}
    }

    try {
      // 1. Chuyển sang gọi trực tiếp Gemini API ở phía Client (Front-end) ngay từ đầu để tránh lỗi serverless Vercel
      console.log(`[Gemini Client Interceptor] Đang gọi trực tiếp client-side SDK cho ${urlStr}`);
      const result = await runClientSideGemini(urlStr, bodyObj);
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-Direct-Client-Call": "true"
        }
      });
    } catch (clientError: any) {
      const errMsg = clientError.message || "";
      console.warn(`[Gemini Client Interceptor] Lỗi khi gọi trực tiếp client-side: ${errMsg}`);
      
      // 2. Nếu không tìm thấy hoặc chưa cấu hình API Key, hiển thị thông báo thân thiện
      if (errMsg.includes("Chưa cấu hình API Key")) {
        if (urlStr.includes("/api/gemini/chat")) {
          return new Response(JSON.stringify({ text: "Chưa cấu hình API Key cho Trợ lý AI. Vui lòng kiểm tra lại thiết lập." }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        }
        // Cho các api tạo đề, chấm điểm, v.v. trả về thông tin lỗi thân thiện
        return new Response(JSON.stringify({ error: errMsg }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      // 3. Nếu gặp các sự cố API khác (ví dụ: hết hạn, quá hạn mức/quota, quá tải), hãy kích hoạt học liệu Vật lý 12 Ngoại tuyến
      console.warn(`[Gemini Client Interceptor] Kích hoạt học liệu Vật lý 12 Ngoại tuyến...`);
      const fallbackResult = getLocalFallbackData(urlStr, bodyObj);
      return new Response(JSON.stringify(fallbackResult), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-Local-Offline-Fallback": "true"
        }
      });
    }
  }

  return originalFetch(input, init);
};

// Safely overwrite fetch using Object.defineProperty to bypass readonly/getter-only window.fetch constraints
try {
  Object.defineProperty(window, "fetch", {
    value: customFetch,
    writable: true,
    configurable: true
  });
} catch (e) {
  try {
    (window as any).fetch = customFetch;
  } catch (err) {
    console.error("Failed to intercept window.fetch", err);
  }
}

try {
  Object.defineProperty(globalThis, "fetch", {
    value: customFetch,
    writable: true,
    configurable: true
  });
} catch (e) {}
