// Types and Mock Data for PhysicsAI 12 Platform

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  pdfUrl: string;
  readingContent: string;
  slideSteps: string[];
  simulationType: "thermal" | "gas" | "magnetic" | "nuclear";
  flashcards: { front: string; back: string }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface Chapter {
  id: string;
  title: string;
  code: string;
  icon: string;
  lessons: Lesson[];
}

export interface VocabularyWord {
  id: string;
  vietnamese: string;
  english: string;
  ipa: string;
  category: string;
  definition: string;
  exampleVi: string;
  exampleEn: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  answer: string;
  level: "NB" | "TH" | "VD" | "VDC";
  chapter: string;
  tag: string;
  image?: string;
}

export interface StudentResult {
  name: string;
  className: string;
  score: number;
  progress: number;
  completedQuizzes: number;
  xp: number;
}

export interface StudentActivity {
  id: string;
  studentName: string;
  className: string;
  activityType: string; // e.g. "quiz", "lesson", "virtual_lab", "ai_chat", "formula_library", etc.
  description: string;
  xpGained: number;
  timestamp: string;
  
  // Vietnamese fallback fields for database visual clarity
  hoVaTen?: string;
  lop?: string;
  loaiHoatDong?: string;
  moTa?: string;
  xpNhanDuoc?: number;
  thoiGian?: string;
}

export const DEFAULT_STUDENT_RESULTS: StudentResult[] = [];

// // 1. CHƯƠNG TRÌNH VẬT LÍ 12 GDPT 2018
export const ACADEMIC_CHAPTERS: Chapter[] = [
  {
    id: "ch1",
    title: "Chương I: Vật lí nhiệt",
    code: "THERMAL_PHYSICS",
    icon: "ThermometerSun",
    lessons: [
      {
        id: "l1",
        title: "Bài 1: Cấu trúc của chất. Sự chuyển thể",
        description: "Tìm hiểu cấu trúc phân tử chất rắn, lỏng, khí và mô hình động học phân tử, sự chuyển thể giữa các trạng thái.",
        videoUrl: "https://www.youtube.com/embed/g6j37_2KguQ",
        pdfUrl: "Tài liệu học tập Bài 1: Cấu trúc của chất và sự chuyển thể",
        readingContent: `Mô hình động học phân tử về cấu trúc của chất dựa trên các giả thuyết:
- Các chất được cấu tạo từ các hạt riêng biệt gọi là phân tử.
- Các phân tử chuyển động không ngừng, chuyển động này càng nhanh thì nhiệt độ của vật càng cao.
- Giữa các phân tử có lực hút và lực đẩy gọi là lực liên kết phân tử.

Các thể cấu tạo của chất:
- Thể rắn: Lực liên kết rất mạnh. Các phân tử chỉ dao động quanh vị trí cân bằng xác định. Có thể tích và hình dạng xác định.
- Thể lỏng: Lực liên kết yếu hơn thể rắn. Các phân tử dao động quanh vị trí cân bằng có thể di chuyển được. Có thể tích xác định nhưng hình dạng phụ thuộc vào bình chứa.
- Thể khí: Lực liên kết rất yếu. Các phân tử chuyển động hoàn toàn hỗn loạn. Không có thể tích và hình dạng xác định.

Sự chuyển thể của các chất bao gồm: sự nóng chảy, sự đông đặc, sự hóa hơi, sự ngưng tụ, sự thăng hoa, và sự ngưng kết.`,
        slideSteps: [
          "Giả thuyết động học phân tử chất khí",
          "So sánh ba thể Rắn - Lỏng - Khí",
          "Sự chuyển thể của các chất trong tự nhiên",
          "Ứng dụng thực tiễn của quá trình chuyển thể"
        ],
        simulationType: "thermal",
        flashcards: [
          { front: "Lực liên kết phân tử ở thể nào mạnh nhất?", back: "Thể rắn" },
          { front: "Mô hình động học phân tử gồm mấy giả thuyết chính?", back: "3 giả thuyết chính." }
        ],
        quiz: [
          {
            question: "Các phân tử cấu tạo nên chất chuyển động hỗn loạn không ngừng khi nào?",
            options: ["A. Chỉ khi nhiệt độ cao", "B. Chỉ khi ở thể khí", "C. Luôn luôn chuyển động", "D. Chỉ khi có ngoại lực tác dụng"],
            correctIndex: 2,
            explanation: "Các phân tử cấu tạo nên các chất luôn chuyển động hỗn loạn không ngừng ở mọi trạng thái nhiệt độ."
          }
        ]
      },
      {
        id: "l2",
        title: "Bài 2: Nội năng. Định luật I của nhiệt động lực học",
        description: "Tìm hiểu khái niệm nội năng, hai cách biến đổi nội năng, phát biểu và công thức Định luật I Nhiệt động lực học.",
        videoUrl: "https://www.youtube.com/embed/4b85_JIn80A",
        pdfUrl: "Tài liệu học tập Bài 2: Nội năng và Định luật I Nhiệt động lực học",
        readingContent: `I. KHÁI NIỆM NỘI NĂNG
1. Nội năng của một vật
- Các phân tử chuyển động không ngừng nên chúng có động năng, gọi là động năng phân tử. Động năng phân tử phụ thuộc vào tốc độ chuyển động của phân tử.
- Các phân tử tương tác với nhau nên chúng có thế năng, gọi là thế năng tương tác phân tử. Thế năng phân tử phụ thuộc vào khoảng cách giữa các phân tử.
- Tổng động năng và thế năng của các phân tử cấu tạo nên vật được gọi là nội năng của vật. Kí hiệu bằng chữ U và đơn vị đo là Jun (J).
- Nội năng phụ thuộc vào nhiệt độ (T) và thể tích (V) của vật: U = f(T, V). Do nhiệt độ ảnh hưởng đến động năng và thể tích ảnh hưởng đến khoảng cách phân tử (thế năng).
- Khí lí tưởng: Bỏ qua lực tương tác phân tử nên thế năng tương tác coi như bằng 0. Khi đó, nội năng chỉ phụ thuộc vào nhiệt độ: U = f(T).
- Trong thực tế học tập, ta chủ yếu quan tâm đến độ biến thiên nội năng ΔU của vật (phần nội năng tăng thêm hoặc giảm bớt).

2. Thí nghiệm về mối liên hệ giữa nội năng và năng lượng của các phân tử khí
- Thiết kế thí nghiệm (Trang 11): Ống nghiệm (1) đựng lượng không khí được nút kín bằng nút bấc (2), hơ nóng bằng đèn cồn (3) trên giá đỡ (4).
- Hiện tượng: Đun nóng một lúc thì nút bấc bị đẩy bật mạnh ra ngoài.
- Giải thích: Khi đun nóng, nhiệt lượng từ ngọn lửa truyền sang không khí trong ống nghiệm, làm nhiệt độ của không khí tăng, tốc độ chuyển động nhiệt hỗn loạn của các phân tử khí tăng lên (động năng phân tử tăng). Khi động năng trung bình tăng, nội năng của khí tăng, làm áp suất khí trong ống tăng mạnh, sinh lực đẩy nút bấc bật ra. Không khí dãn nở đã thực hiện công đẩy nút bấc, một phần nội năng chuyển hóa thành cơ năng của nút.

II. ĐỊNH LUẬT I CỦA NHIỆT ĐỘNG LỰC HỌC
1. Cách làm thay đổi nội năng
- Thực hiện công (A): Có sự thực hiện công của ngoại lực lên hệ hoặc hệ thực hiện công lên vật khác. Có sự biến đổi qua lại giữa cơ năng (hoặc dạng năng lượng khác) thành nội năng. Ví dụ: Cọ xát miếng đồng lên sàn nhà, nén pít-tông khí.
- Truyền nhiệt (Q): Quá trình truyền trực tiếp nhiệt năng từ vật này sang vật khác khi có chênh lệch nhiệt độ, không có sự chuyển hóa cơ năng thành nội năng. Ví dụ: Đun nóng miếng đồng trên lửa. Nhiệt lượng (Q) là số đo nhiệt năng được truyền từ vật này sang vật khác.

2. Định luật I của nhiệt động lực học
- Phát biểu: Độ biến thiên nội năng ΔU của hệ bằng tổng công và nhiệt lượng mà hệ nhận được.
- Công thức biểu thức: ΔU = A + Q
- Quy ước dấu (Mắt xích cực kỳ quan trọng):
  * Q > 0: Hệ nhận nhiệt lượng từ ngoài.
  * Q < 0: Hệ truyền nhiệt lượng ra ngoài.
  * A > 0: Hệ nhận công từ ngoài.
  * A < 0: Hệ thực hiện công (sinh công) lên ngoài.

III. ĐỘNG CƠ NHIỆT (ỨNG DỤNG THỰC TIỄN)
- Động cơ nhiệt là thiết bị biến đổi nội năng của nhiên liệu thành cơ năng.
- Cấu tạo gồm ba bộ phận cơ bản bắt buộc:
  1. Nguồn nóng (nhiệt độ T1): Cung cấp nhiệt lượng Q1 cho tác nhân.
  2. Tác nhân (như hơi nước, hỗn hợp khí): Giãn nở trong xi lanh để sinh công cơ học A.
  3. Nguồn lạnh (nhiệt độ T2 < T1): Nhận nhiệt lượng Q2 do tác nhân tỏa ra để kết thúc chu trình khép kín.`,
        slideSteps: [
          "Khái niệm nội năng U = Eđ + Et",
          "Hai cách làm biến đổi nội năng của hệ",
          "Biểu thức Định luật I: ΔU = A + Q",
          "Bài tập áp dụng quy ước dấu của A và Q"
        ],
        simulationType: "thermal",
        flashcards: [
          { front: "Công thức định luật I nhiệt động lực học là gì?", back: "ΔU = A + Q" },
          { front: "Quy ước dấu khi hệ tỏa nhiệt và nhận công?", back: "Q < 0 (tỏa nhiệt) và A > 0 (nhận công)." }
        ],
        quiz: [
          {
            question: "Một lượng khí trong xi lanh nhận nhiệt lượng 200J và thực hiện công 120J lên pít-tông. Độ biến thiên nội năng của khí là:",
            options: ["A. 320 J", "B. 80 J", "C. -80 J", "D. -320 J"],
            correctIndex: 1,
            explanation: "Khí nhận nhiệt: Q = +200J. Khí thực hiện công: A = -120J. Áp dụng ΔU = Q + A = 200 - 120 = 80 J."
          }
        ]
      },
      {
        id: "l3",
        title: "Bài 3: Nhiệt độ. Thang nhiệt độ - Nhiệt kế",
        description: "Khái niệm trạng thái cân bằng nhiệt, các thang nhiệt độ phổ biến (Celsius, Kelvin) và nguyên lí hoạt động của nhiệt kế.",
        videoUrl: "https://www.youtube.com/embed/g6j37_2KguQ",
        pdfUrl: "Tài liệu học tập Bài 3: Nhiệt độ và Thang nhiệt độ",
        readingContent: `Trạng thái cân bằng nhiệt: Khi hai vật có nhiệt độ khác nhau tiếp xúc nhau, nhiệt lượng truyền từ vật có nhiệt độ cao sang vật có nhiệt độ thấp hơn cho đến khi nhiệt độ của chúng bằng nhau.

Thang nhiệt độ:
1. Thang nhiệt độ Celsius (°C): Lấy điểm đóng băng của nước tinh khiết ở áp suất chuẩn là 0°C và điểm sôi là 100°C.
2. Thang nhiệt độ tuyệt đối Kelvin (K): Không độ tuyệt đối (0 K) là nhiệt độ thấp nhất mà lý thuyết có thể đạt được, tại đó mọi chuyển động nhiệt của phân tử ngừng lại.
Công thức chuyển đổi: T (K) = t (°C) + 273,15

Nhiệt kế: Thiết bị dùng để đo nhiệt độ dựa trên nguyên lí sự nở vì nhiệt của chất lỏng hoặc sự thay đổi điện trở, hiệu điện thế tiếp xúc sinh ra từ nhiệt độ.`,
        slideSteps: [
          "Trạng thái cân bằng nhiệt & Định luật không",
          "Thang đo Celsius và thang đo tuyệt đối Kelvin",
          "Công thức đổi đơn vị: T(K) = t(°C) + 273,15",
          "Các loại nhiệt kế phổ biến trong thực tế"
        ],
        simulationType: "thermal",
        flashcards: [
          { front: "Nhiệt độ phòng 25°C tương ứng bao nhiêu Kelvin?", back: "298,15 K (25 + 273,15)" },
          { front: "Nhiệt kế y tế thủy ngân hoạt động dựa trên hiện tượng gì?", back: "Sự nở vì nhiệt của chất lỏng (thủy ngân)." }
        ],
        quiz: [
          {
            question: "Nhiệt độ không độ tuyệt đối (0 K) tương ứng với bao nhiêu độ Celsius?",
            options: ["A. 273,15°C", "B. -273,15°C", "C. 0°C", "D. -100°C"],
            correctIndex: 1,
            explanation: "Vì T = t + 273,15 nên t = T - 273,15. Khi T = 0 K thì t = -273,15°C."
          }
        ]
      },
      {
        id: "l4",
        title: "Bài 4: Nhiệt dung riêng",
        description: "Định nghĩa nhiệt dung riêng, công thức tính nhiệt lượng thu vào hay tỏa ra khi thay đổi nhiệt độ và phương pháp đo.",
        videoUrl: "https://www.youtube.com/embed/BYD3E0H1O3o",
        pdfUrl: "Tài liệu học tập Bài 4: Nhiệt dung riêng",
        readingContent: `Nhiệt dung riêng (c) của một chất là nhiệt lượng cần thiết để làm cho 1 kg chất đó tăng thêm 1 độ (K hoặc °C).
Đơn vị của nhiệt dung riêng: J/kg.K hoặc J/kg.°C.

Công thức tính nhiệt lượng thu vào hoặc tỏa ra để thay đổi nhiệt độ của vật từ t1 đến t2:
Q = m.c.Δt = m.c.(t2 - t1)
Trong đó:
- Q là nhiệt lượng (J)
- m là khối lượng vật (kg)
- c là nhiệt dung riêng (J/kg.K)
- Δt là độ biến thiên nhiệt độ (°C hoặc K).

Phương pháp thực nghiệm xác định nhiệt dung riêng thường dùng bình nhiệt lượng kế, cấp nhiệt lượng bằng điện trở và đo độ tăng nhiệt độ.`,
        slideSteps: [
          "Định nghĩa & ý nghĩa vật lí của Nhiệt dung riêng",
          "Công thức tính nhiệt lượng Q = mcΔt",
          "Phương pháp đo nhiệt dung riêng bằng nhiệt lượng kế",
          "Ứng dụng nhiệt dung riêng của nước trong điều hòa khí hậu"
        ],
        simulationType: "thermal",
        flashcards: [
          { front: "Đơn vị của nhiệt dung riêng là gì?", back: "J/kg.K hoặc J/kg.°C" },
          { front: "Nước có nhiệt dung riêng khoảng bao nhiêu?", back: "Khoảng 4200 J/kg.K" }
        ],
        quiz: [
          {
            question: "Nhiệt dung riêng của một chất cho biết:",
            options: [
              "A. Nhiệt lượng cần để làm nóng chảy 1 kg chất đó.",
              "B. Nhiệt lượng cần để 1 kg chất đó tăng thêm 1 độ.",
              "C. Nhiệt lượng tỏa ra khi 1 kg chất đó hóa hơi.",
              "D. Nội năng của 1 kg chất đó ở nhiệt độ phòng."
            ],
            correctIndex: 1,
            explanation: "Nhiệt dung riêng c là nhiệt lượng cần thiết cung cấp cho 1kg chất để tăng thêm 1 độ C (hoặc 1 K)."
          }
        ]
      },
      {
        id: "l5",
        title: "Bài 5: Nhiệt nóng chảy riêng",
        description: "Khái niệm nhiệt nóng chảy riêng, công thức tính nhiệt lượng cần cung cấp để nóng chảy chất rắn ở nhiệt độ nóng chảy.",
        videoUrl: "https://www.youtube.com/embed/g6j37_2KguQ",
        pdfUrl: "Tài liệu học tập Bài 5: Nhiệt nóng chảy riêng",
        readingContent: `Nhiệt nóng chảy riêng (λ) của một chất rắn là nhiệt lượng cần cung cấp để 1 kg chất đó chuyển hoàn toàn từ thể rắn sang thể lỏng ở nhiệt độ nóng chảy.
Đơn vị đo của nhiệt nóng chảy riêng: J/kg.

Công thức tính nhiệt lượng cần thiết cung cấp cho khối lượng m của chất rắn nóng chảy hoàn toàn ở nhiệt độ nóng chảy:
Q = λ.m
Trong đó:
- Q là nhiệt lượng nhận vào (J)
- λ là nhiệt nóng chảy riêng (J/kg)
- m là khối lượng chất rắn (kg).

Mỗi chất rắn kết tinh có một nhiệt độ nóng chảy xác định dưới một áp suất cho trước. Trong suốt quá trình nóng chảy, nhiệt độ của hệ không thay đổi.`,
        slideSteps: [
          "Khái niệm sự nóng chảy của chất rắn kết tinh",
          "Định nghĩa Nhiệt nóng chảy riêng λ",
          "Công thức tính nhiệt lượng Q = λ.m",
          "Thực hành thí nghiệm đo nhiệt nóng chảy riêng"
        ],
        simulationType: "thermal",
        flashcards: [
          { front: "Công thức tính nhiệt lượng khi nóng chảy hoàn toàn là gì?", back: "Q = λ.m" },
          { front: "Trong quá trình nóng chảy, nhiệt độ chất thay đổi thế nào?", back: "Không thay đổi cho đến khi chất rắn chảy lỏng hoàn toàn." }
        ],
        quiz: [
          {
            question: "Nhiệt nóng chảy riêng của nước đá là 3,4.10^5 J/kg. Nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn 2 kg nước đá ở 0°C là:",
            options: ["A. 1,7.10^5 J", "B. 6,8.10^5 J", "C. 3,4.10^5 J", "D. 5,4.10^5 J"],
            correctIndex: 1,
            explanation: "Q = λ.m = 3,4.10^5 * 2 = 6,8.10^5 J."
          }
        ]
      },
      {
        id: "l6",
        title: "Bài 6: Nhiệt hóa hơi riêng",
        description: "Khái niệm nhiệt hóa hơi riêng, công thức tính nhiệt lượng để chất lỏng hóa hơi hoàn toàn ở nhiệt độ sôi.",
        videoUrl: "https://www.youtube.com/embed/BYD3E0H1O3o",
        pdfUrl: "Tài liệu học tập Bài 6: Nhiệt hóa hơi riêng",
        readingContent: `Sự hóa hơi là quá trình chuyển từ thể lỏng sang thể khí (bao gồm sự bay hơi trên bề mặt và sự sôi xảy ra ở cả lòng chất lỏng).

Nhiệt hóa hơi riêng (L) của một chất lỏng là nhiệt lượng cần cung cấp để 1 kg chất lỏng đó hóa hơi hoàn toàn ở nhiệt độ sôi dưới áp suất tiêu chuẩn.
Đơn vị đo của nhiệt hóa hơi riêng: J/kg.

Công thức tính nhiệt lượng cần cung cấp cho khối lượng m của chất lỏng để hóa hơi hoàn toàn ở nhiệt độ sôi:
Q = L.m
Trong đó:
- Q là nhiệt lượng cần cung cấp (J)
- L là nhiệt hóa hơi riêng của chất lỏng (J/kg)
- m là khối lượng chất lỏng (kg).`,
        slideSteps: [
          "Hiện tượng bay hơi và hiện tượng sôi",
          "Định nghĩa Nhiệt hóa hơi riêng L",
          "Công thức tính nhiệt lượng hóa hơi Q = L.m",
          "Ý nghĩa thực tế của nhiệt hóa hơi trong kỹ thuật"
        ],
        simulationType: "thermal",
        flashcards: [
          { front: "Nhiệt hóa hơi riêng kí hiệu là gì?", back: "Kí hiệu là L, đơn vị là J/kg." },
          { front: "Quá trình sôi xảy ra ở đâu trong chất lỏng?", back: "Xảy ra đồng thời trên bề mặt và bên trong lòng chất lỏng." }
        ],
        quiz: [
          {
            question: "Nhiệt lượng cần cung cấp để hóa hơi hoàn toàn một lượng nước ở nhiệt độ sôi phụ thuộc vào:",
            options: ["A. Khối lượng và nhiệt hóa hơi riêng", "B. Nhiệt dung riêng của nước", "C. Nhiệt độ ban đầu của nước", "D. Thể tích của bình chứa nước"],
            correctIndex: 0,
            explanation: "Áp dụng công thức Q = L.m, nhiệt lượng Q phụ thuộc vào khối lượng m và nhiệt hóa hơi riêng L."
          }
        ]
      },
      {
        id: "l7",
        title: "Bài 7: Bài tập về vật lí nhiệt",
        description: "Phương pháp giải và các bài tập áp dụng định luật I nhiệt động lực học, cân bằng nhiệt, và các thông số nhiệt lượng đặc trưng.",
        videoUrl: "https://www.youtube.com/embed/g6j37_2KguQ",
        pdfUrl: "Tài liệu học tập Bài 7: Bài tập về vật lí nhiệt",
        readingContent: `Để giải quyết tốt các bài tập về Vật lí nhiệt, học sinh cần nắm vững các lý thuyết nền tảng, hệ thống công thức cơ bản và quy ước dấu cốt lõi:

I. LƯU Ý KHI GIẢI BÀI TẬP VẬT LÍ NHIỆT
1. Bài tập định tính:
- Yêu cầu vận dụng mô hình động học phân tử cấu tạo chất để giải thích hiện tượng chuyển thể, sự thay đổi nội năng, sự khuếch tán, trạng thái vĩ mô và vi mô.
- Ví dụ: Thả túi trà vào nước nóng khuếch tán nhanh hơn nước lạnh do nhiệt độ cao phân tử nước chuyển động hỗn loạn nhanh hơn, va chạm mạnh hơn làm tăng tốc độ khuếch tán.

2. Bài tập định lượng:
- Vận dụng Định luật I Nhiệt động lực học: ΔU = A + Q.
- Quy ước dấu cực kỳ quan trọng:
  + Q > 0: Hệ nhận nhiệt lượng (thu nhiệt).
  + Q < 0: Hệ truyền nhiệt lượng (tỏa nhiệt).
  + A > 0: Hệ nhận công (bị nén).
  + A < 1: Hệ thực hiện công (sinh công/nở rộng).
- Công cơ học liên quan: A = F.s.cos(α), hoặc liên quan đến công suất cơ học P = A/t.

3. Công thức tính nhiệt lượng trao đổi:
- Thay đổi nhiệt độ: Q = m.c.ΔT (với ΔT = t2 - t1).
- Chuyển trạng thái nóng chảy: Q = λ.m (nhiệt nóng chảy riêng λ).
- Chuyển trạng thái hóa hơi: Q = L.m (nhiệt hóa hơi riêng L).
- Khi hệ chỉ trao đổi nhiệt cô lập: Q_toả + Q_thu = 0.

4. Bài tập thí nghiệm:
- Xử lý số liệu đo L của nước hoặc đo nhiệt dung riêng c, tính toán sai số ngẫu nhiên và sai số hệ thống của dụng cụ đo.`,
        slideSteps: [
          "I. Một số lưu ý khi giải bài tập về vật lí nhiệt",
          "II. Quy ước dấu & Định luật I Nhiệt động lực học",
          "III. Các công thức tính nhiệt lượng chuyển trạng thái",
          "IV. Phân tích bài tập định lượng mẫu"
        ],
        simulationType: "thermal",
        flashcards: [
          { front: "Quy ước dấu của Q trong định luật I NĐLH?", back: "Q > 0: Hệ nhận nhiệt lượng; Q < 0: Hệ truyền (tỏa) nhiệt lượng." },
          { front: "Quy ước dấu của A trong định luật I NĐLH?", back: "A > 0: Hệ nhận công; A < 0: Hệ thực hiện (sinh) công." },
          { front: "Biểu thức tính công cơ học của lực không đổi?", back: "A = F.s.cos(α) (với α là góc giữa lực và hướng chuyển dịch)." }
        ],
        quiz: [
          {
            question: "Quy ước dấu nào sau đây phù hợp với định luật I của nhiệt động lực học?",
            options: ["A. Vật nhận công: A < 0; vật nhận nhiệt lượng: Q < 0.", "B. Vật nhận công: A > 0; vật nhận nhiệt lượng: Q > 0.", "C. Vật thực hiện công: A > 0; vật truyền nhiệt lượng: Q > 0.", "D. Vật thực hiện công: A > 0; vật truyền nhiệt lượng: Q < 0."],
            correctIndex: 1,
            explanation: "Theo định luật I nhiệt động lực học, khi vật nhận công thì A > 0, và khi vật nhận nhiệt lượng thì Q > 0."
          }
        ]
      }
    ]
  },
  {
    id: "ch2",
    title: "Chương II: Khí lí tưởng",
    code: "IDEAL_GAS",
    icon: "CloudWind",
    lessons: [
      {
        id: "l8",
        title: "Bài 8: Mô hình động học phân tử chất khí",
        description: "Chuyển động và tương tác của các phân tử khí, mô hình động học phân tử chất khí và định nghĩa khí lí tưởng.",
        videoUrl: "https://www.youtube.com/embed/BYD3E0H1O3o",
        pdfUrl: "Tài liệu học tập Bài 8: Mô hình động học phân tử chất khí",
        readingContent: `I. CHUYỂN ĐỘNG VÀ TƯƠNG TÁC CỦA CÁC PHÂN TỬ KHÍ
1. Thí nghiệm chuyển động Brown trong chất khí:
Quan sát chuyển động của hạt khói lơ lửng trong không khí bằng kính hiển vi cho thấy chúng chuyển động hỗn loạn không ngừng. Nguyên nhân là các phân tử không khí xung quanh luôn chuyển động hỗn loạn và va chạm không ngừng vào hạt khói từ mọi phía. Tại mỗi thời điểm, tổng hợp lực va chạm từ các phân tử khí tác dụng lên hạt khói không cân bằng nhau, đẩy hạt khói dịch chuyển theo quỹ đạo dích dắc gấp khúc vô cùng phức tạp.
2. Khoảng cách và tương tác phân tử:
Khoảng cách trung bình giữa các phân tử khí rất lớn so với kích thước của chúng. Ở điều kiện thường, lực liên kết phân tử khí rất yếu, do đó các phân tử khí tự do chuyển động hỗn loạn rộng khắp và chiếm toàn bộ thể tích bình chứa.

II. MÔ HÌNH ĐỘNG HỌC PHÂN TỬ CHẤT KHÍ
Gồm 3 luận điểm cơ bản:
1. Chất khí được cấu tạo từ các phân tử có kích thước rất nhỏ so với khoảng cách giữa chúng.
2. Các phân tử khí chuyển động hỗn loạn không ngừng. Nhiệt độ của chất khí càng cao thì tốc độ chuyển động hỗn loạn nhiệt của các phân tử khí càng lớn.
3. Khi chuyển động hỗn loạn, các phân tử khí va chạm vào nhau và va chạm vào thành bình, tác dụng lực đẩy vuông góc lên thành bình và gây ra áp suất lên thành bình.

III. KHÍ LÍ TƯỞNG
Khí lí tưởng là mô hình đơn giản hoá chất khí thực tế với các giả thuyết:
1. Các phân tử khí được coi là các chất điểm (bỏ qua thể tích của phân tử).
2. Lực liên kết phân tử khí khi chưa va chạm coi như bằng không (chỉ tương tác hút/đẩy khi va chạm trực tiếp).
3. Va chạm giữa các phân tử khí với nhau và với thành bình là va chạm hoàn toàn đàn hồi (bảo toàn động năng).`,
        slideSteps: [
          "Chuyển động Brown của các hạt khói",
          "Khoảng cách và tương tác giữa các phân tử khí",
          "3 luận điểm của thuyết động học phân tử",
          "Định nghĩa mô hình khí lí tưởng"
        ],
        simulationType: "gas",
        flashcards: [
          { front: "Tại sao chất khí rất dễ bị nén?", back: "Do khoảng cách giữa các phân tử chất khí rất lớn so với kích thước phân tử." },
          { front: "Nguồn gốc gây ra áp suất chất khí là gì?", back: "Do các phân tử khí chuyển động va chạm liên tục và truyền xung lượng lên thành bình." }
        ],
        quiz: [
          {
            question: "Chất khí lí tưởng bỏ qua yếu tố nào sau đây?",
            options: ["A. Thể tích phân tử và lực tương tác ở xa", "B. Khối lượng phân tử khí", "C. Sự chuyển động của phân tử", "D. Va chạm của phân tử lên thành bình"],
            correctIndex: 0,
            explanation: "Khí lí tưởng bỏ qua thể tích phân tử (coi là chất điểm) và bỏ qua lực tương tác phân tử tầm xa khi chưa va chạm."
          }
        ]
      },
      {
        id: "l9",
        title: "Bài 9: Định luật Boyle",
        description: "Quá trình đẳng nhiệt của một lượng khí xác định, định luật Boyle và đường đẳng nhiệt trên các hệ tọa độ.",
        videoUrl: "https://www.youtube.com/embed/4b85_JIn80A",
        pdfUrl: "Tài liệu học tập Bài 9: Định luật Boyle",
        readingContent: `Đẳng quá trình: Quá trình biến đổi trạng thái của một lượng khí xác định khi một trong ba thông số trạng thái được giữ không đổi.
Quá trình đẳng nhiệt: Quá trình biến đổi trạng thái của một lượng khí xác định khi nhiệt độ được giữ không đổi (T = hằng số).

Định luật Boyle (Định luật Bôi-lơ - Ma-ri-ốt):
Trong quá trình đẳng nhiệt của một lượng khí xác định, áp suất tỉ lệ nghịch với thể tích của khí đó.
Công thức: p.V = hằng số, hoặc p1.V1 = p2.V2.

Đường đẳng nhiệt: Đường biểu diễn sự biến thiên của áp suất theo thể tích trong điều kiện nhiệt độ không đổi. Trong hệ tọa độ (p, V), đường đẳng nhiệt là một nhánh của đường hyperbol. Đường ở trên ứng với nhiệt độ cao hơn.`,
        slideSteps: [
          "Định nghĩa Quá trình đẳng nhiệt",
          "Thực nghiệm Boyle và phát biểu định luật",
          "Hệ thức Boyle: p.V = const",
          "Đồ thị đường đẳng nhiệt trong hệ tọa độ (p, V)"
        ],
        simulationType: "gas",
        flashcards: [
          { front: "Hệ thức định luật Boyle là gì?", back: "p1.V1 = p2.V2 (ở T không đổi)" },
          { front: "Đường đẳng nhiệt trong hệ tọa độ (p, V) có dạng gì?", back: "Là một nhánh của đường hyperbol." }
        ],
        quiz: [
          {
            question: "Một lượng khí xác định ở thể tích 10 lít có áp suất 2 atm. Khi nén đẳng nhiệt thể tích giảm xuống còn 4 lít thì áp suất khí là:",
            options: ["A. 5 atm", "B. 0.8 atm", "C. 8 atm", "D. 4 atm"],
            correctIndex: 0,
            explanation: "Áp dụng định luật Boyle: p1.V1 = p2.V2 => 2 * 10 = p2 * 4 => p2 = 20 / 4 = 5 atm."
          }
        ]
      },
      {
        id: "l10",
        title: "Bài 10: Định luật Charles",
        description: "Quá trình đẳng áp của một lượng khí xác định, định luật Charles và đường đẳng áp trên các hệ tọa độ.",
        videoUrl: "https://www.youtube.com/embed/g6j37_2KguQ",
        pdfUrl: "Tài liệu học tập Bài 10: Định luật Charles",
        readingContent: `Quá trình đẳng áp: Quá trình biến đổi trạng thái của một lượng khí xác định khi áp suất được giữ không đổi (p = hằng số).

Định luật Charles (Định luật Sác-lơ):
Khi áp suất của một khối lượng khí xác định giữ không đổi thì thể tích của khí tỉ lệ thuận với nhiệt độ tuyệt đối của nó.
Công thức: V / T = hằng số, hoặc V1 / T1 = V2 / T2
Trong đó T là nhiệt độ tuyệt đối đo bằng Kelvin (K): T(K) = t(°C) + 273.

Đường đẳng áp: Đường biểu diễn sự biến thiên của thể tích theo nhiệt độ tuyệt đối khi áp suất không đổi. Trong hệ tọa độ (V, T), đường đẳng áp là một đường thẳng đi qua gốc tọa độ O (nếu kéo dài đến 0 K).`,
        slideSteps: [
          "Định nghĩa Quá trình đẳng áp",
          "Nghiên cứu thực nghiệm của Charles năm 1787",
          "Công thức và Phát biểu định luật Charles",
          "Đồ thị đường đẳng áp trong các hệ tọa độ (V-T, V-t, p-T, p-V)"
        ],
        simulationType: "gas",
        flashcards: [
          { front: "Quá trình đẳng áp là gì?", back: "Là quá trình biến đổi trạng thái khi áp suất được giữ không đổi." },
          { front: "Hệ thức định luật Charles là gì?", back: "V1 / T1 = V2 / T2 (ở p không đổi)" },
          { front: "Đường đẳng áp trong hệ tọa độ (V, T) có dạng gì?", back: "Là đường thẳng đi qua gốc tọa độ O (nếu kéo dài)." },
          { front: "Hệ số nở đẳng áp của chất khí là bao nhiêu?", back: "α = 1 / 273 K⁻¹ (mỗi khi nhiệt độ tăng thêm 1°C, thể tích khí tăng thêm V0 / 273)." }
        ],
        quiz: [
          {
            question: "Một lượng khí lí tưởng đẳng áp ở nhiệt độ 27°C có thể tích là 6 lít. Khi đun nóng khối khí đến nhiệt độ 127°C thì thể tích của khối khí lúc này bằng bao nhiêu?",
            options: ["A. 8 lít", "B. 4.5 lít", "C. 12 lít", "D. 28.2 lít"],
            correctIndex: 0,
            explanation: "T1 = 27 + 273 = 300K, V1 = 6 lít. T2 = 127 + 273 = 400K. Áp dụng định luật Charles V1/T1 = V2/T2 => V2 = 6 * (400/300) = 8 lít."
          }
        ]
      },
      {
        id: "l11",
        title: "Bài 11: Phương trình trạng thái của khí lí tưởng",
        description: "Xây dựng phương trình Clapeyron - Mendeleev liên hệ giữa ba thông số trạng thái áp suất, thể tích và nhiệt độ tuyệt đối.",
        videoUrl: "https://www.youtube.com/embed/BYD3E0H1O3o",
        pdfUrl: "Tài liệu học tập Bài 11: Phương trình trạng thái khí lí tưởng",
        readingContent: `Phương trình trạng thái của một lượng khí xác định liên hệ cả ba thông số áp suất p, thể tích V và nhiệt độ tuyệt đối T:
(p1.V1) / T1 = (p2.V2) / T2 = hằng số

Phương trình Clapeyron - Mendeleev áp dụng tổng quát cho một khối lượng khí m bất kì:
p.V = n.R.T = (m / M).R.T
Trong đó:
- n là số mol khí (mol).
- R ≈ 8,31 J/(mol.K) là hằng số khí lí tưởng.
- M là khối lượng mol của chất khí (g/mol hoặc kg/mol).
- T là nhiệt độ tuyệt đối (K).

Khí lí tưởng là khí tuân theo đúng hoàn toàn các định luật Boyle, Charles và phương trình trạng thái ở mọi điều kiện nhiệt độ và áp suất.`,
        slideSteps: [
          "Xây dựng hệ thức liên hệ ba thông số p, V, T",
          "Phương trình trạng thái Clapeyron: pV / T = const",
          "Phương trình Mendeleev tổng quát cho n mol khí: pV = nRT",
          "Ứng dụng tính toán thông số trạng thái chất khí"
        ],
        simulationType: "gas",
        flashcards: [
          { front: "Hằng số khí lí tưởng R bằng bao nhiêu trong hệ SI?", back: "R ≈ 8,31 J/(mol.K)." },
          { front: "Công thức Clapeyron-Mendeleev là gì?", back: "p.V = n.R.T" }
        ],
        quiz: [
          {
            question: "Đại lượng R trong phương trình pV = nRT được gọi là:",
            options: ["A. Hằng số Boltzmann", "B. Hằng số khí lí tưởng", "C. Số Avogadro", "D. Hằng số hấp dẫn"],
            correctIndex: 1,
            explanation: "R ≈ 8,31 J/(mol.K) là hằng số khí lí tưởng trong hệ đơn vị chuẩn SI."
          }
        ]
      },
      {
        id: "l12",
        title: "Bài 12: Áp suất khí theo mô hình động học phân tử chất khí. Định luật Dalton",
        description: "Giải thích áp suất khí dựa trên mô hình phân tử, định luật Dalton về áp suất riêng phần của hỗn hợp khí.",
        videoUrl: "https://www.youtube.com/embed/g6j37_2KguQ",
        pdfUrl: "Tài liệu học tập Bài 12: Áp suất khí và Định luật Dalton",
        readingContent: `Mô hình động học phân tử chất khí lí tưởng:
- Chất khí gồm rất nhiều phân tử kích thước nhỏ bé so với khoảng cách giữa chúng.
- Các phân tử chuyển động hỗn loạn không ngừng.
- Các phân tử chỉ tương tác khi va chạm trực tiếp với nhau hoặc va chạm với thành bình, các va chạm này là hoàn toàn đàn hồi.

Định luật Dalton về áp suất riêng phần:
Áp suất toàn phần của một hỗn hợp khí không tương tác hóa học bằng tổng các áp suất riêng phần của từng chất khí thành phần trong hỗn hợp nếu chúng chiếm một mình cùng thể tích của hỗn hợp ở cùng nhiệt độ.
Công thức: p = p1 + p2 + p3 + ... + pn
Trong đó: pi là áp suất riêng phần của khí thứ i.`,
        slideSteps: [
          "Ôn lại giả thuyết mô hình động học chất khí",
          "Khái niệm áp suất riêng phần",
          "Phát biểu Định luật Dalton",
          "Tính toán áp suất hỗn hợp khí trong thực tế"
        ],
        simulationType: "gas",
        flashcards: [
          { front: "Phát biểu định luật Dalton?", back: "Áp suất toàn phần hỗn hợp khí bằng tổng áp suất riêng phần các khí thành phần." },
          { front: "Thế nào là áp suất riêng phần?", back: "Là áp suất của khí thành phần nếu một mình nó chiếm toàn bộ thể tích bình chứa ở cùng nhiệt độ." }
        ],
        quiz: [
          {
            question: "Hỗn hợp khí gồm Oxy có áp suất riêng phần 0,8 atm và Nitơ có áp suất riêng phần 0,2 atm. Áp suất tổng cộng của hỗn hợp là:",
            options: ["A. 0,6 atm", "B. 1,0 atm", "C. 0,16 atm", "D. 0,5 atm"],
            correctIndex: 1,
            explanation: "Áp dụng định luật Dalton: p = p_Oxy + p_Nito = 0,8 + 0,2 = 1,0 atm."
          }
        ]
      },
      {
        id: "l13",
        title: "Bài 13: Bài tập về khí lí tưởng",
        description: "Hệ thống hóa lý thuyết về mô hình động học phân tử, phương trình trạng thái và các định luật chất khí.",
        videoUrl: "https://www.youtube.com/embed/4b85_JIn80A",
        pdfUrl: "Tài liệu học tập Bài 13: Bài tập về khí lí tưởng",
        readingContent: `Mục đích thí nghiệm: Khảo sát mối liên hệ giữa áp suất p và thể tích V của một lượng khí xác định ở nhiệt độ không đổi, từ đó nghiệm lại định luật Boyle.

Dụng cụ thí nghiệm:
- Một xi lanh trong suốt chứa không khí, có thang đo chia thể tích V (cm3 hoặc ml).
- Pít-tông có gioăng cao su bôi trơn kín khí có thể dịch chuyển để thay đổi thể tích.
- Áp kế điện tử hoặc áp kế kim gắn ở đầu xi lanh để đo áp suất p (Pa hoặc bar, atm).
- Giá đỡ giữ cố định các dụng cụ.

Các bước tiến hành:
1. Ghi nhận nhiệt độ phòng đảm bảo không thay đổi nhiều trong khi làm thí nghiệm.
2. Dịch chuyển pít-tông từ từ (để tránh làm tăng nhiệt độ khí do nén nhanh) đến các thể tích V khác nhau.
3. Chờ ổn định nhiệt độ rồi ghi nhận giá trị áp suất p tương ứng với mỗi thể tích V.
4. Lập bảng giá trị tích p.V và vẽ đường biểu diễn p = f(1/V) để kiểm chứng dạng đường thẳng qua gốc tọa độ.`,
        slideSteps: [
          "Mục tiêu thí nghiệm khảo sát định luật Boyle",
          "Giới thiệu thiết bị xi lanh, pít-tông và áp kế",
          "Thao tác nén dãn khí chậm rãi để giữ T không đổi",
          "Xử lý số liệu, vẽ đồ thị p - V và kết luận"
        ],
        simulationType: "gas",
        flashcards: [
          { front: "Tại sao phải dịch chuyển pít-tông thật chậm?", back: "Để quá trình biến đổi là đẳng nhiệt (nếu nén nhanh khí bị nóng lên)." },
          { front: "Nếu tích p.V luôn không đổi thì ta kết luận điều gì?", back: "Nghiệm lại định luật Boyle là hoàn toàn chính xác." }
        ],
        quiz: [
          {
            question: "Trong thí nghiệm Boyle, đồ thị biểu diễn áp suất p theo nghịch đảo thể tích (1/V) có dạng đường gì?",
            options: ["A. Nhánh hyperbol", "B. Đường thẳng kéo dài qua gốc tọa độ", "C. Đường cong parabol", "D. Đường nằm ngang song song trục hoành"],
            correctIndex: 1,
            explanation: "Vì p tỉ lệ nghịch với V nên p = C * (1/V). Đồ thị p theo (1/V) là đường thẳng đi qua gốc tọa độ."
          }
        ]
      }
    ]
  },
  {
    id: "ch3",
    title: "Chương III: Từ trường",
    code: "MAGNETIC_FIELD",
    icon: "Compass",
    lessons: [
      {
        id: "l14",
        title: "Bài 14: Từ trường",
        description: "Định nghĩa từ trường, đường sức từ, từ trường đều, từ trường Trái Đất và tác dụng định hướng của từ trường lên kim nam châm.",
        videoUrl: "https://www.youtube.com/embed/scX2gD9XlKA",
        pdfUrl: "Tài liệu học tập Bài 14: Khái quát về từ trường",
        readingContent: `Từ trường là một dạng vật chất tồn tại xung quanh hạt mang điện chuyển động (hoặc dòng điện, nam châm) và tác dụng lực từ lên hạt mang điện chuyển động khác (hoặc dòng điện, nam châm khác) đặt trong đó.

Đường sức từ: là những đường vẽ ở trong không gian có từ trường sao cho tiếp tuyến tại mỗi điểm trùng với hướng của vectơ cảm ứng từ tại điểm đó.
Tính chất đường sức từ:
- Qua mỗi điểm chỉ vẽ được một đường duy nhất.
- Là những đường cong khép kín hoặc vô hạn ở hai đầu (trong nam châm đi từ Nam sang Bắc, ngoài nam châm đi từ Bắc sang Nam).
- Nơi nào từ trường mạnh thì đường sức dày, nơi yếu thì đường sức thưa.

Từ trường Trái Đất: Trái Đất hoạt động giống như một nam châm khổng lồ với các cực từ gần trùng cực địa lí của Trái Đất, bảo vệ sinh quyển khỏi bức xạ vũ trụ có hại.`,
        slideSteps: [
          "Khái niệm Từ trường và tính chất cơ bản",
          "Quy ước hướng của đường sức từ: Vào Nam Ra Bắc",
          "Từ phổ của nam châm thẳng và nam châm chữ U",
          "Hiện tượng từ trường Trái Đất và ứng dụng la bàn"
        ],
        simulationType: "magnetic",
        flashcards: [
          { front: "Đường sức từ có bao giờ cắt nhau không?", back: "Không bao giờ, vì qua mỗi điểm chỉ vẽ được 1 đường duy nhất." },
          { front: "Chiều của đường sức từ bên ngoài nam châm?", back: "Đi ra từ cực Bắc (N) và đi vào cực Nam (S)." }
        ],
        quiz: [
          {
            question: "Từ trường không tồn tại xung quanh đối tượng nào sau đây?",
            options: ["A. Một nam châm thẳng đứng yên", "B. Một dây dẫn mang dòng điện", "C. Một quả cầu mang điện tích đứng yên", "D. Trái Đất"],
            correctIndex: 2,
            explanation: "Điện tích đứng yên chỉ tạo ra điện trường xung quanh nó, không tạo ra từ trường."
          }
        ]
      },
      {
        id: "l15",
        title: "Bài 15: Lực từ. Cảm ứng từ",
        description: "Lực Ampere tác dụng lên dây dẫn thẳng mang dòng điện, định nghĩa vectơ cảm ứng từ B và quy tắc bàn tay trái.",
        videoUrl: "https://www.youtube.com/embed/scX2gD9XlKA",
        pdfUrl: "Tài liệu học tập Bài 15: Lực từ và Cảm ứng từ",
        readingContent: `Cảm ứng từ: Đại lượng vectơ B đặc trưng cho tác dụng lực của từ trường tại điểm đó.
- Hướng: Trùng với hướng Nam - Bắc của kim nam châm thử cân bằng tại điểm đó.
- Đơn vị cảm ứng từ: Tesla (T).

Lực từ (Lực Ampere) tác dụng lên đoạn dây dẫn thẳng dài L có cường độ dòng điện I chạy qua đặt trong từ trường đều có cảm ứng từ B:
F = B.I.L.sin(α)
Trong đó α là góc hợp bởi đoạn dây mang dòng điện và chiều vectơ cảm ứng từ B.

Quy tắc bàn tay trái xác định chiều lực từ F:
Đặt bàn tay trái duỗi thẳng sao cho các đường sức từ B hướng đâm vào lòng bàn tay, chiều từ cổ tay đến các ngón tay chỉ chiều dòng điện I, khi đó ngón tay cái choãi ra 90 độ chỉ chiều của lực từ F.`,
        slideSteps: [
          "Khái niệm cảm ứng từ và vectơ B",
          "Công thức lực Ampere F = BIL.sin(α)",
          "Quy tắc bàn tay trái xác định hướng của lực từ",
          "Bài tập mẫu áp dụng tính toán lực Ampere"
        ],
        simulationType: "magnetic",
        flashcards: [
          { front: "Đơn vị của cảm ứng từ B là gì?", back: "Tesla (T)." },
          { front: "Lực từ cực đại khi góc giữa dây dẫn và vectơ B bằng bao nhiêu?", back: "Bằng 90 độ (sin(90°) = 1)." }
        ],
        quiz: [
          {
            question: "Một dây dẫn dài 10 cm mang dòng điện 2 A đặt vuông góc với từ trường đều B = 0,5 T. Lực từ tác dụng lên dây là:",
            options: ["A. 0.1 N", "B. 1.0 N", "C. 0.01 N", "D. 10 N"],
            correctIndex: 0,
            explanation: "F = BIL.sin(α) = 0,5 * 2 * 0,1 * sin(90°) = 0,1 N."
          }
        ]
      },
      {
        id: "l16",
        title: "Bài 16: Từ thông. Cảm ứng điện từ",
        description: "Khái niệm từ thông qua diện tích phẳng, hiện tượng cảm ứng điện từ, định luật Faraday và định luật Lenz xác định chiều dòng điện cảm ứng.",
        videoUrl: "https://www.youtube.com/embed/scX2gD9XlKA",
        pdfUrl: "Tài liệu học tập Bài 16: Từ thông và Cảm ứng điện từ",
        readingContent: `Từ thông (Φ) qua một diện tích phẳng S đặt trong từ trường đều B:
Φ = B.S.cos(α)
Trong đó α là góc hợp bởi pháp tuyến n của diện tích S và vectơ cảm ứng từ B. Đơn vị của từ thông: Weber (Wb).

Hiện tượng cảm ứng điện từ: Khi từ thông qua một mạch kín biến thiên theo thời gian, trong mạch kín xuất hiện một dòng điện gọi là dòng điện cảm ứng.

Định luật Faraday về cảm ứng điện từ:
Suất điện động cảm ứng xuất hiện trong mạch tỉ lệ thuận với tốc độ biến thiên từ thông qua mạch đó.
e_c = - ΔΦ / Δt

Định luật Lenz (Len-xơ):
Dòng điện cảm ứng xuất hiện trong mạch kín có chiều sao cho từ trường cảm ứng do nó sinh ra có tác dụng chống lại sự biến thiên của từ thông ban đầu sinh ra nó.`,
        slideSteps: [
          "Định nghĩa Từ thông Φ = BS.cos(α)",
          "Thí nghiệm về hiện tượng cảm ứng điện từ",
          "Định luật Faraday về độ lớn suất điện động cảm ứng",
          "Định luật Lenz xác định chiều dòng điện cảm ứng"
        ],
        simulationType: "magnetic",
        flashcards: [
          { front: "Đơn vị của từ thông Φ là gì?", back: "Weber (Wb)." },
          { front: "Suất điện động cảm ứng được tính theo định luật nào?", back: "Định luật Faraday: ec = -ΔΦ/Δt." }
        ],
        quiz: [
          {
            question: "Theo định luật Lenz, dòng điện cảm ứng xuất hiện trong một mạch kín có chiều sao cho từ trường cảm ứng của nó:",
            options: [
              "A. Luôn cùng chiều với từ trường ban đầu",
              "B. Luôn ngược chiều với từ trường ban đầu",
              "C. Chống lại sự biến thiên của từ thông sinh ra nó",
              "D. Luôn triệt tiêu hoàn toàn từ trường ban đầu"
            ],
            correctIndex: 2,
            explanation: "Định luật Lenz chỉ rõ từ trường cảm ứng có tác dụng chống lại sự biến thiên từ thông ban đầu sinh ra dòng điện cảm ứng."
          }
        ]
      },
      {
        id: "l17",
        title: "Bài 17: Máy phát điện xoay chiều",
        description: "Cấu tạo, nguyên tắc hoạt động của máy phát điện xoay chiều 1 pha và 3 pha dựa trên hiện tượng cảm ứng điện từ.",
        videoUrl: "https://www.youtube.com/embed/scX2gD9XlKA",
        pdfUrl: "Tài liệu học tập Bài 17: Máy phát điện xoay chiều",
        readingContent: `Máy phát điện xoay chiều là thiết bị chuyển hóa cơ năng thành điện năng dựa trên hiện tượng cảm ứng điện từ.

Cấu tạo cơ bản gồm hai phần chính:
1. Phần cảm (Rô-to hoặc Sa-to): Tạo ra từ trường (thường là nam châm điện hoặc nam châm vĩnh cửu).
2. Phần ứng (Sa-to hoặc Rô-to): Cuộn dây dẫn đặt xen kẽ, xuất hiện suất điện động cảm ứng khi từ thông biến thiên.

Máy phát điện xoay chiều 1 pha: Tạo ra một dòng điện xoay chiều hình sin đơn lẻ. Tần số dòng điện: f = n.p (n: tốc độ quay vòng/giây; p: số cặp cực).

Máy phát điện xoay chiều 3 pha: Hệ thống ba dòng điện xoay chiều hình sin cùng tần số, cùng biên độ nhưng lệch pha nhau từng đôi một một góc bằng 2π/3 (120 độ). Sử dụng máy phát điện 3 pha giúp truyền tải năng lượng điện đi xa hiệu quả và vận hành động cơ điện xoay chiều 3 pha mạnh mẽ.`,
        slideSteps: [
          "Nguyên lí cảm ứng điện từ áp dụng trong máy phát điện",
          "Cấu tạo Rô-to (phần quay) và Sa-to (phần đứng yên)",
          "Máy phát điện xoay chiều 1 pha & công thức tần số f = np",
          "Ưu việt của dòng điện xoay chiều 3 pha trong truyền tải điện"
        ],
        simulationType: "magnetic",
        flashcards: [
          { front: "Công thức tính tần số dòng điện xoay chiều 1 pha?", back: "f = n.p (n đo bằng vòng/giây; p là số cặp cực)" },
          { front: "Ba cuộn dây trong máy phát điện ba pha đặt lệch nhau bao nhiêu độ?", back: "120 độ (hoặc 2π/3 rad) trên vành tròn." }
        ],
        quiz: [
          {
            question: "Nguyên tắc hoạt động của máy phát điện xoay chiều dựa trên hiện tượng vật lí nào?",
            options: ["A. Hiện tượng tự cảm", "B. Hiện tượng cảm ứng điện từ", "C. Hiện tượng cộng hưởng điện", "D. Tác dụng phát quang của dòng điện"],
            correctIndex: 1,
            explanation: "Tất cả các máy phát điện quay đều hoạt động dựa trên hiện tượng cảm ứng điện từ khi cơ năng làm từ thông biến thiên qua cuộn dây."
          }
        ]
      },
      {
        id: "l18",
        title: "Bài 18: Ứng dụng hiện tượng cảm ứng điện từ",
        description: "Ứng dụng thực tế của hiện tượng cảm ứng điện từ: Nguyên lý hoạt động của máy biến áp, sạc điện thoại không dây, đàn ghi ta điện và bản chất dòng điện xoáy Foucault.",
        videoUrl: "https://www.youtube.com/embed/BYD3E0H1O3o",
        pdfUrl: "Tài liệu học tập Bài 18: Ứng dụng cảm ứng điện từ",
        readingContent: `Cảm ứng điện từ là một trong những hiện tượng vật lí quan trọng nhất, mở đường cho cuộc cách mạng công nghiệp điện khí hóa. Các ứng dụng thực tế vượt trội bao gồm:

1. Máy biến áp: Thiết bị biến đổi điện áp hiệu dụng xoay chiều dựa trên cảm ứng tương hỗ giữa hai cuộn dây sơ cấp (N₁ vòng) và thứ cấp (N₂ vòng) quấn quanh một lõi thép kín. Hệ thức lí tưởng: U₁/U₂ = N₁/N₂. Để giảm hao phí nhiệt năng do dòng Foucault, lõi thép được ghép cách điện từ nhiều lá thép silicon mỏng.

2. Sạc không dây: Đế sạc (cuộn sơ cấp xoay chiều) sinh từ thông biến thiên cao tần xuyên qua cuộn dây thu năng lượng ở điện thoại (cuộn thứ cấp) đặt kề sát, sinh ra dòng cảm ứng nạp pin trực tiếp.

3. Đàn ghi ta điện: Sử dụng sáu bộ cảm âm (pickup) gồm cuộn dây quấn quanh lõi nam châm đặt dưới sáu dây đàn thép. Dây đàn bằng thép từ hóa dao động tuần hoàn, làm biến thiên từ thông qua cuộn dây bên dưới sinh ra dòng điện cảm ứng xoay chiều cùng tần số âm rồi đưa đến tăng âm (amply) và loa.

4. Dòng điện Foucault (Phu-cô): Dòng điện cảm ứng xoáy sinh ra trong khối vật dẫn khi vật dẫn chuyển động trong từ trường hoặc đặt trong từ trường biến thiên. Dòng này có tính chất hãm điện từ (ứng dụng làm phanh điện từ xe tải, tàu cao tốc, bếp điện từ) hoặc gây hao phí tỏa nhiệt Joules có hại trong lõi máy biến áp. Để khắc phục, lõi được ghép từ nhiều lá thép mỏng phủ sơn cách điện.`,
        slideSteps: [
          "Giới thiệu chung về Ứng dụng Hiện tượng Cảm ứng điện từ",
          "Máy biến áp: Cấu tạo cuộn sơ cấp, thứ cấp và lõi sắt silicon",
          "Mối liên hệ điện áp hiệu dụng U1/U2 = N1/N2 từ định luật Faraday",
          "Sạc điện thoại không dây: Truyền tải điện năng tương hỗ",
          "Đàn ghi ta điện: Nguyên lý từ hóa dây đàn thép và bộ cảm âm pickup",
          "Dòng điện xoáy Foucault: Thí nghiệm hãm từ con lắc liền khối và xẻ rãnh",
          "Ứng dụng thực tế của dòng Foucault: Bếp từ, phanh xe và biện pháp giảm hao phí"
        ],
        simulationType: "magnetic",
        flashcards: [
          { front: "Máy biến áp hoạt động dựa trên hiện tượng nào?", back: "Hiện tượng cảm ứng điện từ (cụ thể là cảm ứng điện từ tương hỗ)." },
          { front: "Công thức tỉ số điện áp của máy biến áp lí tưởng là gì?", back: "U₁ / U₂ = N₁ / N₂" },
          { front: "Vì sao dây đàn của đàn ghi ta điện bắt buộc phải làm bằng thép?", back: "Thép là vật liệu sắt từ nên dễ bị từ hóa bởi nam châm vĩnh cửu trong bộ pickup tạo ra nguồn từ trường biến thiên khi dao động." },
          { front: "Dòng điện Foucault (Phu-cô) là gì?", back: "Là dòng điện cảm ứng xoáy xuất hiện trong khối vật dẫn khi vật dẫn chuyển động trong từ trường hoặc đặt trong từ trường biến thiên theo thời gian." },
          { front: "Làm thế nào để giảm hao phí tỏa nhiệt do dòng Foucault trong lõi máy biến áp?", back: "Thay vì dùng lõi thép đặc, người ta dùng nhiều lá thép silicon mỏng phủ sơn cách điện ghép chặt lại song song với đường sức từ." }
        ],
        quiz: [
          {
            question: "Một máy biến áp lí tưởng có số vòng dây cuộn thứ cấp lớn hơn số vòng dây cuộn sơ cấp (N₂ > N₁). Máy biến áp này có tác dụng gì?",
            options: [
              "A. Hạ điện áp xoay chiều hiệu dụng.",
              "B. Tăng điện áp xoay chiều hiệu dụng.",
              "C. Thay đổi tần số của dòng điện xoay chiều.",
              "D. Biến đổi dòng xoay chiều thành dòng một chiều."
            ],
            correctIndex: 1,
            explanation: "Do N₂ > N₁ nên U₂ > U₁. Đây là máy tăng áp (tăng điện áp hiệu dụng xoay chiều mà không làm thay đổi tần số)."
          }
        ]
      },
      {
        id: "l19",
        title: "Bài 19: Điện từ trường. Mô hình sóng điện từ",
        description: "Lý thuyết điện từ trường của J.C. Maxwell: mối quan hệ hữu cơ giữa điện trường biến thiên và từ trường biến thiên, khái niệm điện trường xoáy, sự hình thành và lan truyền của sóng điện từ.",
        videoUrl: "https://www.youtube.com/embed/scX2gD9XlKA",
        pdfUrl: "Tài liệu học tập Bài 19: Điện từ trường. Mô hình sóng điện từ",
        readingContent: `Lý thuyết điện từ trường của James Clerk Maxwell là một trong những phát kiến vĩ đại nhất lịch sử vật lý học cổ điển, đặt nền tảng cho sự thống nhất giữa hai lực cơ bản: Điện và Từ.

1. LIÊN HỆ GIỮA ĐIỆN TRƯỜNG BIẾN THIÊN VÀ TỪ TRƯỜNG BIẾN THIÊN
- Từ trường biến thiên và điện trường xoáy: Khi có sự biến thiên từ thông gửi qua một vòng dây kín (như nam châm rơi qua ống dây), trong vòng dây xuất hiện dòng điện cảm ứng xoay chiều. Sự xuất hiện dòng điện chứng tỏ sự tồn tại của lực điện lực làm chuyển dịch electron, nghĩa là có một điện trường. Đường sức của điện trường này là các đường cong khép kín tròn xung quanh từ trường biến thiên. Điện trường có tính chất này được gọi là điện trường xoáy. Maxwell khẳng định điện trường xoáy vẫn xuất hiện ngay cả khi không có ống dây dẫn. Khái quát: "Trong vùng không gian có từ trường biến thiên theo thời gian thì trong vùng đó xuất hiện một điện trường xoáy."
- Điện trường biến thiên và từ trường: Khi một tụ điện đang tích điện hoặc phóng điện bằng dòng điện xoay chiều, do sự thay đổi điện thế trên các bản tụ nên xuất hiện điện trường biến thiên giữa hai bản tụ. Điện trường biến thiên này hoạt động hệt như một dòng điện chạy qua không gian cách điện (gọi là dòng điện dịch) sinh ra một từ trường tròn khép kín bao bọc lấy các bản tụ. Khái quát: "Trong vùng không gian có điện trường biến thiên theo thời gian thì trong vùng đó xuất hiện một từ trường xoáy khép kín."
- Điện từ trường: Hai trường biến thiên này không tồn tại độc lập mà liên kết khăng khít, chuyển hoá lẫn nhau trong một trường thống nhất gọi là điện từ trường. Tại mọi điểm, vectơ cường độ điện trường E luôn vuông góc với vectơ cảm ứng từ B.

2. MÔ HÌNH SÓNG ĐIỆN TỪ
- Sự tạo thành sóng điện từ: Khi tại điểm O xuất hiện một điện trường biến thiên E₁, nó sinh ra một từ trường biến thiên B₁ ở vùng lân cận. Từ trường biến thiên B₁ lại sinh ra điện trường biến thiên E₂ ở vùng lân cận tiếp theo... Cứ như thế, quá trình lan truyền điện từ trường xoáy liên tục trong không gian được gọi là sóng điện từ.
- Sự lan truyền sóng điện từ:
  + Sóng điện từ là sóng ngang: Vectơ cường độ điện trường E và vectơ cảm ứng từ B luôn vuông góc với nhau và vuông góc với phương truyền sóng v. Ba vectơ E, B, v tạo thành một tam diện thuận.
  + Đồng pha: Dao động của điện trường E và từ trường B tại một điểm luôn luôn đồng pha với nhau (đều đạt cực đại hoặc cực tiểu đồng thời).
  + Sóng điện từ truyền được trong tất cả các môi trường rắn, lỏng, khí và cả trong chân không với tốc độ lớn nhất c ≈ 3.10^8 m/s (tốc độ ánh sáng). Bước sóng trong chân không tính theo hệ thức: λ = c.T = c/f.
  + Sóng điện từ mang năng lượng dồi dào, tuân theo quy luật truyền thẳng, phản xạ, khúc xạ, giao thoa và nhiễu xạ hệt như sóng ánh sáng.`,
        slideSteps: [
          "Sự liên hệ mật thiết giữa Điện trường và Từ trường biến thiên",
          "Thí nghiệm hiện tượng cảm ứng điện từ & Khái niệm Điện trường xoáy",
          "Điện trường biến thiên sinh ra Từ trường (Dòng điện dịch)",
          "Định nghĩa Điện từ trường thống nhất theo thuyết Maxwell",
          "Sự hình thành và lan truyền Sóng điện từ tự do",
          "Đặc tính Sóng ngang, Tam diện thuận và tính đồng pha của E và B",
          "Vận tốc lan truyền và bước sóng vô tuyến trong các môi trường"
        ],
        simulationType: "magnetic",
        flashcards: [
          { front: "Điện trường xoáy là gì?", back: "Là điện trường có đường sức là các đường cong kín khép hoàn toàn, sinh ra do một từ trường biến thiên theo thời gian." },
          { front: "Dòng điện dịch là gì?", back: "Là khái niệm do Maxwell đề xuất, chỉ điện trường biến thiên theo thời gian giữa hai bản tụ điện, sinh ra từ trường tương đương dòng điện dẫn." },
          { front: "Sóng điện từ là gì?", back: "Là sự lan truyền điện từ trường biến thiên xoáy liên tục trong không gian dưới dạng sóng theo thời gian." },
          { front: "Tại sao sóng điện từ là sóng ngang?", back: "Vì hai vectơ dao động cường độ điện trường E và cảm ứng từ B luôn vuông góc với nhau và vuông góc với phương truyền sóng v." },
          { front: "Mối quan hệ về pha giữa E và B trong sóng điện từ?", back: "Tại mỗi điểm, dao động của điện trường E và từ trường B luôn luôn đồng pha (cùng đạt cực đại và cực tiểu đồng thời)." }
        ],
        quiz: [
          {
            question: "Trong sóng điện từ, dao động của điện trường và từ trường tại một điểm luôn:",
            options: ["A. Ngược pha với nhau", "B. Lệch pha nhau π/2", "C. Đồng pha với nhau", "D. Lệch pha nhau π/4"],
            correctIndex: 2,
            explanation: "Mặc dù phương dao động của E và B vuông góc nhau nhưng trạng thái dao động (pha dao động) của chúng tại một điểm luôn đồng pha."
          }
        ]
      },
      {
        id: "l20",
        title: "Bài 20: Bài tập về từ trường",
        description: "Hệ thống hóa kiến thức lý thuyết cốt lõi, rèn luyện kỹ năng phân tích định tính định lý Lenz, tính toán định lượng lực từ Ampe và thực nghiệm xử lý số liệu cân lực từ thực tế.",
        videoUrl: "https://www.youtube.com/embed/scX2gD9XlKA",
        pdfUrl: "Tài liệu học tập Bài 20: Bài tập về từ trường",
        readingContent: `Hệ thống hóa lý thuyết cốt lõi và các phương pháp giải bài tập Vật lý về Từ trường:

I. LƯU Ý KHI GIẢI BÀI TẬP VỀ TỪ TRƯỜNG
1. Bài tập định tính:
- Xác định chiều của cảm ứng từ, dòng điện cảm ứng, lực từ bằng các quy tắc bàn tay trái, nắm tay phải và định lý Lenz về chiều dòng điện cảm ứng.
- Ví dụ: Khi đưa nam châm lại gần vòng dây kín, dòng điện cảm ứng sinh ra sinh từ trường ngược chiều từ trường nam châm để chống lại sự lại gần đó.

2. Bài tập định lượng:
- Lực từ Ampe tác dụng lên dây dẫn thẳng mang dòng điện: F = B.I.L.sin(α).
- Suất điện động xoay chiều sinh ra trong khung dây quay trong từ trường: e = E_0.sin(ωt).
- Từ thông gửi qua diện tích phẳng S: Φ = B.S.cos(α).

3. Bài tập thí nghiệm và thực hành:
- Sử dụng phương pháp đo lực Ampe bằng cân điện tử để khảo sát định lượng mối liên hệ giữa các thông số B, I, L.`,
        slideSteps: [
          "Hệ thống lý thuyết và phương pháp giải bài tập từ trường",
          "Bài toán lực Ampe tác dụng lên đoạn dây dẫn mang dòng điện",
          "Bài toán chiều dòng điện cảm ứng theo định lý Lenz",
          "Phân tích dữ liệu thực nghiệm đo lực từ bằng cân điện tử"
        ],
        simulationType: "magnetic",
        flashcards: [
          { front: "Công thức lực Ampe tác dụng lên đoạn dây dẫn?", back: "F = B.I.L.sin(α)" },
          { front: "Phát biểu định luật Lenz?", back: "Dòng điện cảm ứng có chiều sao cho từ trường do nó sinh ra chống lại nguyên nhân sinh ra nó." }
        ],
        quiz: [
          {
            question: "Lực từ Ampe tác dụng lên đoạn dây dẫn mang dòng điện cực đại khi góc α hợp bởi dòng điện và cảm ứng từ bằng bao nhiêu?",
            options: ["A. 0 độ", "B. 45 độ", "C. 90 độ", "D. 180 độ"],
            correctIndex: 2,
            explanation: "Lực Ampe cực đại khi sin(α) = 1, tức là α = 90 độ (dây dẫn vuông góc với các đường sức từ)."
          }
        ]
      }
    ]
  },
  {
    id: "ch4",
    title: "Chương IV: Vật lí hạt nhân",
    code: "NUCLEAR_PHYSICS",
    icon: "Zap",
    lessons: [
      {
        id: "l21",
        title: "Bài 21: Cấu trúc hạt nhân",
        description: "Thành phần cấu tạo hạt nhân (prôtôn và nơtrôn), số khối, kí hiệu hạt nhân, khái niệm đồng vị và đơn vị khối lượng nguyên tử u.",
        videoUrl: "https://www.youtube.com/embed/5U_7h0lqO8Y",
        pdfUrl: "Tài liệu học tập Bài 21: Cấu trúc hạt nhân nguyên tử",
        readingContent: `Hạt nhân nằm ở tâm nguyên tử, có kích thước rất nhỏ (~10^-15 m) nhưng chiếm hầu hết khối lượng nguyên tử.

Thành phần cấu tạo hạt nhân:
- Hạt nhân được cấu tạo từ các hạt nuclôn bao gồm hai loại:
  1. Prôtôn (p): Mang điện tích dương +e. Khối lượng m_p ≈ 1,007276 u.
  2. Nơtrôn (n): Không mang điện. Khối lượng m_n ≈ 1,008665 u.
- Kí hiệu hạt nhân của nguyên tố X: X(A, Z).
  - Z là số hiệu nguyên tử (số prôtôn, số thứ tự trong bảng tuần hoàn).
  - A là số khối (tổng số nuclôn).
  - N = A - Z là số nơtrôn.

Đồng vị: Các hạt nhân có cùng số prôtôn Z nhưng khác số nơtrôn N (nên số khối A khác nhau). Ví dụ: Hydro có 3 đồng vị là H-1, H-2 (Deuteri), H-3 (Triti).

Đơn vị khối lượng nguyên tử: 1 u bằng 1/12 khối lượng của một nguyên tử đồng vị Carbon C-12. 1 u ≈ 1,66055.10^-27 kg ≈ 931,5 MeV/c^2.`,
        slideSteps: [
          "Mô hình nguyên tử Rutherford - Bohr",
          "Thành phần cấu tạo hạt nhân: Prôtôn & Nơtrôn",
          "Kí hiệu hạt nhân X(A, Z) và khái niệm đồng vị",
          "Định nghĩa đơn vị khối lượng nguyên tử u"
        ],
        simulationType: "nuclear",
        flashcards: [
          { front: "Hạt nhân Heli He(4, 2) có bao nhiêu nơtrôn?", back: "Có 2 nơtrôn (A - Z = 4 - 2 = 2)." },
          { front: "1 u tương ứng bao nhiêu MeV/c^2?", back: "Xấp xỉ 931,5 MeV/c^2." }
        ],
        quiz: [
          {
            question: "Đồng vị là những nguyên tử có hạt nhân chứa:",
            options: [
              "A. Cùng số nơtrôn nhưng khác số prôtôn",
              "B. Cùng số prôtôn nhưng khác số nơtrôn",
              "C. Cùng số nuclôn nhưng khác số prôtôn",
              "D. Cùng khối lượng nguyên tử"
            ],
            correctIndex: 1,
            explanation: "Đồng vị có cùng vị trí trong bảng tuần hoàn (cùng Z) nhưng khác khối lượng hạt nhân (khác N và A)."
          }
        ]
      },
      {
        id: "l22",
        title: "Bài 22: Phản ứng hạt nhân",
        description: "Định nghĩa phản ứng hạt nhân tự phát và kích thích, các định luật bảo toàn trong phản ứng hạt nhân và năng lượng tỏa ra/thu vào.",
        videoUrl: "https://www.youtube.com/embed/5U_7h0lqO8Y",
        pdfUrl: "Tài liệu học tập Bài 22: Chuyên đề phản ứng hạt nhân",
        readingContent: `Phản ứng hạt nhân là quá trình biến đổi của các hạt nhân, bao gồm:
1. Phản ứng tự phát (quá trình phóng xạ tự nhiên).
2. Phản ứng kích thích (hai hạt nhân va chạm tạo ra hạt nhân mới).

Bốn định luật bảo toàn trong phản ứng hạt nhân:
- Bảo toàn số nuclôn (số khối A).
- Bảo toàn điện tích (số hiệu nguyên tử Z).
- Bảo toàn động lượng.
- Bảo toàn năng lượng toàn phần (bao gồm cả năng lượng nghỉ).
*Lưu ý: Không có định luật bảo toàn khối lượng nghỉ trong phản ứng hạt nhân!

Năng lượng phản ứng hạt nhân:
E = (m_trước - m_sau) * c^2
- Nếu m_trước > m_sau => E > 0: Phản ứng tỏa năng lượng.
- Nếu m_trước < m_sau => E < 0: Phản ứng thu năng lượng.`,
        slideSteps: [
          "Định nghĩa Phản ứng hạt nhân & Phân loại",
          "Bốn định luật bảo toàn tuyệt đối cần tuân theo",
          "Khái niệm độ hụt khối & Năng lượng phản ứng",
          "Bài tập mẫu cân bằng phản ứng hạt nhân"
        ],
        simulationType: "nuclear",
        flashcards: [
          { front: "Có định luật bảo toàn khối lượng trong phản ứng hạt nhân không?", back: "Không, chỉ có bảo toàn năng lượng toàn phần và bảo toàn số khối." },
          { front: "Phản ứng tỏa năng lượng khi nào?", back: "Khi tổng khối lượng các hạt trước phản ứng lớn hơn tổng khối lượng các hạt sau phản ứng." }
        ],
        quiz: [
          {
            question: "Trong một phản ứng hạt nhân, đại lượng nào sau đây không được bảo toàn?",
            options: ["A. Điện tích Z", "B. Số nuclôn A", "C. Động lượng", "D. Khối lượng nghỉ"],
            correctIndex: 3,
            explanation: "Khối lượng nghỉ của các hạt trước và sau phản ứng nói chung là khác nhau do sự chuyển hóa giữa năng lượng nghỉ và động năng."
          }
        ]
      },
      {
        id: "l23",
        title: "Bài 23: Hiện tượng phóng xạ",
        description: "Hiện tượng phóng xạ, bản chất các tia phóng xạ (alpha, beta, gamma), định luật phân rã phóng xạ, chu kì bán rã và các quy tắc an toàn phóng xạ.",
        videoUrl: "https://www.youtube.com/embed/5U_7h0lqO8Y",
        pdfUrl: "Tài liệu học tập Bài 23: Hiện tượng phóng xạ tự nhiên",
        readingContent: `Phóng xạ là quá trình một hạt nhân không bền vững tự động phân rã, phát ra các tia phóng xạ và biến đổi thành hạt nhân của nguyên tố khác. Đây là quá trình hoàn toàn tự phát, không phụ thuộc điều kiện ngoại cảnh (nhiệt độ, áp suất).

Các loại tia phóng xạ chính:
1. Phóng xạ Alpha (α): Phát ra hạt nhân Heli He(4, 2). Đi được vài cm trong không khí, bị tờ giấy mỏng cản lại hoàn toàn.
2. Phóng xạ Beta (β):
   - Beta trừ (β-): Phát ra hạt electron e(0, -1).
   - Beta cộng (β+): Phát ra hạt positron e(0, +1).
   Đi được vài mét trong không khí, xuyên qua được lá nhôm dày vài mm.
3. Phóng xạ Gamma (γ): Sóng điện từ bước sóng cực ngắn (hạt phôtôn năng lượng cao). Khả năng đâm xuyên cực mạnh, đi xuyên qua bê tông dày, cần tấm chì dày vài cm để cản lại.`,
        slideSteps: [
          "Lịch sử phát hiện hiện tượng phóng xạ",
          "Đặc điểm tự phát của quá trình phóng xạ",
          "Bản chất tia Alpha, Beta và Gamma",
          "Sự nguy hiểm và quy tắc an toàn phóng xạ"
        ],
        simulationType: "nuclear",
        flashcards: [
          { front: "Tia phóng xạ nào có khả năng đâm xuyên mạnh nhất?", back: "Tia Gamma (γ)." },
          { front: "Tia phóng xạ Alpha bản chất là hạt gì?", back: "Hạt nhân nguyên tử Heli He(4, 2)." }
        ],
        quiz: [
          {
            question: "Phóng xạ Beta cộng (β+) phát ra hạt nào sau đây?",
            options: ["A. Electron", "B. Positron (phản hạt của electron)", "C. Prôtôn", "D. Hạt nhân Heli"],
            correctIndex: 1,
            explanation: "Phóng xạ β+ phát ra dòng hạt positron mang điện tích dương +e và khối lượng bằng khối lượng electron."
          }
        ]
      },
      {
        id: "l24",
        title: "Bài 24: Công nghiệp hạt nhân",
        description: "Khám phá quy trình vận hành kỳ vĩ của Nhà máy điện hạt nhân, các kỹ thuật Chẩn đoán & Điều trị ung thư trong Y học hạt nhân, cùng các ứng dụng đột phá trong Nông nghiệp và Bảo quản thực phẩm.",
        videoUrl: "https://www.youtube.com/embed/5U_7h0lqO8Y",
        pdfUrl: "Tài liệu học tập Bài 24: Công nghiệp hạt nhân và ứng dụng phóng xạ",
        readingContent: `Năng lượng toả ra trong các phản ứng hạt nhân thường được chuyển hoá thành điện năng thông qua hệ thống lò phản ứng hạt nhân, tua bin và máy phát điện để hoà vào lưới điện hoặc cung cấp năng lượng cho tàu ngầm, tàu phá băng,... Hệ thống khai thác năng lượng hạt nhân có thể hoạt động trong thời gian dài mà không cần bổ sung nhiên liệu.

I. NHÀ MÁY ĐIỆN HẠT NHÂN
Bộ phận chính của nhà máy điện hạt nhân là lò phản ứng hạt nhân. Chất tải nhiệt sơ cấp, sau khi chạy qua vùng tâm lò, sẽ chảy qua bộ trao đổi nhiệt, cung cấp nhiệt cho lò sinh hơi. Hơi nước làm chạy tua bin phát điện giống như trong nhà máy điện thông thường.
- Nhiên liệu phân hạch: Thường là Urani U-235 hoặc Plutoni Pu-239.
- Hệ số nhân nơtron k: Quyết định trạng thái lò phản ứng. k = 1 là trạng thái tới hạn tự duy trì công suất ổn định. k > 1 là phản ứng dây chuyền bùng nổ, k < 1 là phản ứng tắt dần.
- Thanh điều khiển: Chứa các chất hấp thụ nơtron mạnh như Bo (B) hoặc Cadimi (Cd) dùng để khống chế dòng nơtron (k = 1).

II. Y HỌC HẠT NHÂN
Trong y học người ta khai thác các tính chất của tia phóng xạ để chẩn đoán và điều trị bệnh:
1. Chẩn đoán thông qua chụp ảnh phóng xạ cắt lớp bên trong cơ thể: SPECT và PET sử dụng dược chất phóng xạ làm chất đánh dấu để định vị vùng bệnh lý bất thường (tế bào ung thư tăng cường hấp thụ glucose có gắn đồng vị phóng xạ).
2. Điều trị bệnh:
- Xạ trị ngoài: Chiếu tia gamma xuyên từ ngoài cơ thể vào khối u để tiêu diệt tế bào ác tính.
- Xạ trị trong: Bệnh nhân uống hoặc tiêm dược chất phóng xạ đặc hiệu (Ví dụ: Iod-131 điều trị ung thư tuyến giáp).
- Xạ trị áp sát: Đặt hạt nguồn phóng xạ trực tiếp vào tế bào khối u.

III. ỨNG DỤNG PHÓNG XẠ TRONG CÔNG NGHỆ SINH HỌC VÀ BẢO QUẢN THỰC PHẨM
- Công nghệ sinh học: Chiếu xạ gây đột biến gene hạt giống cây trồng để chọn tạo giống năng suất cao, kháng sâu bệnh hoặc quả không hạt.
- Đánh dấu phóng xạ: Bón phân lân có chứa lượng vết đồng vị phóng xạ β⁻ phốt pho P-32 để đo đạc và khảo sát tốc độ, quá trình hấp thụ dưỡng chất của rễ cây.
- Bảo quản thực phẩm: Chiếu xạ tia Gamma (γ) phát ra từ nguồn Coban-60 để tiêu diệt nấm mốc, côn trùng, ức chế nảy mầm (ở hành tây, khoai tây), kéo dài đáng kể thời gian tươi ngon của nông sản xuất khẩu mà tuyệt đối an toàn không làm nhiễm xạ thực phẩm.`,
        slideSteps: [
          "Cấu tạo chi tiết của lò phản ứng hạt nhân",
          "Chu trình làm việc hai vòng độc lập của nhà máy điện",
          "Ứng dụng SPECT/PET trong Y học chẩn đoán",
          "Kỹ thuật xạ trị ngoài và xạ trị trong bằng phóng xạ",
          "Chiếu xạ bảo quản trái cây và gây đột biến gene"
        ],
        simulationType: "nuclear",
        flashcards: [
          { front: "Hệ số nhân nơtron k = 1 thể hiện trạng thái gì của lò phản ứng?", back: "Trạng thái tới hạn (công suất phản ứng ổn định không đổi theo thời gian)." },
          { front: "Đồng vị phóng xạ nào thường dùng làm chất đánh dấu đo tốc độ hấp thụ phân lân của rễ cây?", back: "Phốt pho P-32." },
          { front: "Tia phóng xạ nào dùng phổ biến để chiếu xạ diệt khuẩn trái cây tươi?", back: "Tia Gamma (γ) từ nguồn Coban-60." }
        ],
        quiz: [
          {
            question: "Chất nào sau đây thường được sử dụng làm thanh điều khiển khống chế nơtron trong lò phản ứng hạt nhân?",
            options: ["A. Urani hoặc Plutoni", "B. Bo hoặc Cadimi", "C. Than chì hoặc nước nặng", "D. Chì hoặc bê tông cốt thép"],
            correctIndex: 1,
            explanation: "Thanh điều khiển khống chế nơtron chứa các chất hấp thụ nơtron rất mạnh là Bo hoặc Cadimi nhằm điều hòa hệ số nhân nơtron k = 1."
          }
        ]
      },
      {
        id: "l25",
        title: "Bài 25: Bài tập về vật lí hạt nhân",
        description: "Vận dụng kiến thức cốt lõi giải các bài tập định tính, định lượng và các bài tập có nội dung thực tế về cấu trúc hạt nhân, phóng xạ, phân hạch và nhiệt hạch.",
        videoUrl: "https://www.youtube.com/embed/5U_7h0lqO8Y",
        pdfUrl: "Tài liệu học tập Bài 25: Bài tập về vật lí hạt nhân",
        readingContent: `1. Bài tập định tính: Phân tích cấu trúc hạt nhân, tính chất các loại tia phóng xạ (alpha, beta, gamma), nguyên tắc an toàn bức xạ và cơ chế điều khiển lò phản ứng.
2. Bài tập định lượng: Tính độ hụt khối, năng lượng liên kết và liên kết riêng của hạt nhân. Áp dụng định luật phân rã phóng xạ của khối lượng m(t), số hạt N(t) và hoạt độ phóng xạ H(t).
3. Bài tập thực tế: Thiết lập phương trình phân rã, chu kỳ bảo dưỡng định kỳ của máy xạ trị Coban-60 và xác định tuổi khảo cổ của cổ vật hữu cơ bằng Carbon-14.`,
        slideSteps: [
          "Phương pháp giải bài tập định tính hạt nhân",
          "Công thức giải bài tập định lượng phóng xạ",
          "Mô hình hóa lịch bảo dưỡng máy xạ trị ung thư Co-60",
          "Xác định niên đại cổ vật hữu cơ bằng Carbon-14"
        ],
        simulationType: "nuclear",
        flashcards: [
          { front: "Năng lượng liên kết riêng của hạt nhân đặc trưng cho đại lượng nào?", back: "Độ bền vững của hạt nhân (năng lượng liên kết riêng càng lớn, hạt nhân càng bền)." },
          { front: "Tia phóng xạ nào có khả năng đâm xuyên mạnh nhất và không mang điện?", back: "Tia gamma (γ)." },
          { front: "Lịch bảo dưỡng định kỳ của máy xạ trị Co-60 phụ thuộc vào đặc tính nào?", back: "Sự suy giảm độ hoạt động phóng xạ của nguồn Coban theo thời gian dựa trên chu kỳ bán rã." }
        ],
        quiz: [
          {
            question: "Đại lượng nào đặc trưng cho mức độ bền vững của một hạt nhân nguyên tử?",
            options: ["A. Năng lượng liên kết riêng", "B. Năng lượng liên kết toàn phần", "C. Độ hụt khối của hạt nhân", "D. Số khối của hạt nhân"],
            correctIndex: 0,
            explanation: "Năng lượng liên kết riêng (năng lượng liên kết tính trên một nuclôn) là đại lượng đặc trưng cho mức độ bền vững của hạt nhân."
          }
        ]
      }
    ]
  }
];

// 2. TỪ ĐIỂN SONG NGỮ VẬT LÍ (VIETNAMESE - ENGLISH GLOSSARY)
export const BILINGUAL_GLOSSARY: VocabularyWord[] = [
  {
    id: "v1",
    vietnamese: "Nhiệt lượng",
    english: "Amount of heat",
    ipa: "/əˈmaʊnt ɒv hiːt/",
    category: "Vật lí nhiệt",
    definition: "Phần nhiệt năng mà vật nhận thêm được hay mất bớt đi trong quá trình truyền nhiệt.",
    exampleVi: "Nhiệt lượng cần cung cấp để nước sôi phụ thuộc vào khối lượng của nó.",
    exampleEn: "The amount of heat required to boil water depends on its mass."
  },
  {
    id: "v2",
    vietnamese: "Nhiệt dung riêng",
    english: "Specific heat capacity",
    ipa: "/spəˈsɪf.ɪk hiːt kəˈpæs.ə.ti/",
    category: "Vật lí nhiệt",
    definition: "Nhiệt lượng cần cung cấp cho một đơn vị khối lượng chất đó để làm nhiệt độ của nó tăng thêm 1 K (hoặc 1 độ C).",
    exampleVi: "Nước có nhiệt dung riêng khoảng 4180 J/(kg.K).",
    exampleEn: "Water has a specific heat capacity of approximately 4180 J/(kg.K)."
  },
  {
    id: "v3",
    vietnamese: "Nhiệt nóng chảy riêng",
    english: "Specific latent heat of fusion",
    ipa: "/spəˈsɪf.ɪk ˈleɪ.tənt hiːt ɒv ˈfjuː.ʒən/",
    category: "Vật lí nhiệt",
    definition: "Nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn 1 kg chất rắn kết tinh ở nhiệt độ nóng chảy.",
    exampleVi: "Nhiệt nóng chảy riêng của nước đá là 3.4 x 10^5 J/kg.",
    exampleEn: "The specific latent heat of fusion of ice is 3.4 x 10^5 J/kg."
  },
  {
    id: "v4",
    vietnamese: "Nhiệt hóa hơi riêng",
    english: "Specific latent heat of vaporization",
    ipa: "/spəˈsɪf.ɪk ˈleɪ.tənt hiːt ɒv ˌveɪ.pər.aɪˈzeɪ.ʃən/",
    category: "Vật lí nhiệt",
    definition: "Nhiệt lượng cần thiết để hóa hơi hoàn toàn 1 kg chất lỏng ở nhiệt độ sôi.",
    exampleVi: "Nước có nhiệt hóa hơi riêng rất lớn khoảng 2.3 x 10^6 J/kg.",
    exampleEn: "Water has a very high specific latent heat of vaporization of about 2.3 x 10^6 J/kg."
  },
  {
    id: "v5",
    vietnamese: "Nội năng",
    english: "Internal energy",
    ipa: "/ɪnˈtɜː.nəl ˈen.ə.dʒi/",
    category: "Vật lí nhiệt",
    definition: "Tổng động năng chuyển động hỗn loạn của các phân tử cấu tạo nên vật và thế năng tương tác giữa chúng.",
    exampleVi: "Khi ta cọ xát vật vào bề mặt khác, nội năng của nó sẽ tăng lên do ma sát sinh nhiệt.",
    exampleEn: "When we rub an object against another surface, its internal energy increases due to heat-generating friction."
  },
  {
    id: "v6",
    vietnamese: "Khí lí tưởng",
    english: "Ideal gas",
    ipa: "/aɪˈdɪəl ɡæs/",
    category: "Khí lí tưởng",
    definition: "Chất khí giả định trong đó các phân tử được coi là các chất điểm và chỉ tương tác với nhau khi va chạm.",
    exampleVi: "Ở điều kiện áp suất thấp và nhiệt độ cao, khí thực có thể coi gần đúng là khí lí tưởng.",
    exampleEn: "At low pressure and high temperature, real gases can be approximately treated as ideal gases."
  },
  {
    id: "v7",
    vietnamese: "Định luật Boyle",
    english: "Boyle's law",
    ipa: "/bɔɪlz lɔː/",
    category: "Khí lí tưởng",
    definition: "Định luật vật lí phát biểu rằng ở nhiệt độ không đổi, áp suất của một lượng khí lí tưởng xác định tỉ lệ nghịch với thể tích của nó.",
    exampleVi: "Định luật Boyle mô tả quá trình đẳng nhiệt của một khối lượng khí xác định.",
    exampleEn: "Boyle's law describes the isothermal process of a fixed mass of gas."
  },
  {
    id: "v8",
    vietnamese: "Định luật Charles",
    english: "Charles's law",
    ipa: "/tʃɑːlz lɔː/",
    category: "Khí lí tưởng",
    definition: "Định luật vật lí phát biểu rằng ở áp suất không đổi, thể tích của một lượng khí lí tưởng xác định tỉ lệ thuận với nhiệt độ tuyệt đối của nó.",
    exampleVi: "Bóng thám không phồng to hơn khi nhiệt độ khí quyển nóng lên theo định luật Charles.",
    exampleEn: "A weather balloon expands further as atmospheric temperature rises, in accordance with Charles's law."
  },
  {
    id: "v9",
    vietnamese: "Mật độ phân tử",
    english: "Molecular density",
    ipa: "/məˈlek.jə.lər ˈden.sə.ti/",
    category: "Khí lí tưởng",
    definition: "Số lượng phân tử chất khí có trong một đơn vị thể tích bình chứa.",
    exampleVi: "Khi nén khí đẳng nhiệt, mật độ phân tử khí trong bình tăng lên tỉ lệ thuận với áp suất.",
    exampleEn: "When a gas is compressed isothermally, the molecular density inside the container increases proportionally to pressure."
  },
  {
    id: "v10",
    vietnamese: "Hằng số Boltzmann",
    english: "Boltzmann constant",
    ipa: "/ˈhɒlts.mæn ˈkɒn.stənt/",
    category: "Khí lí tưởng",
    definition: "Hằng số vật lí cơ bản liên hệ giữa nhiệt độ tuyệt đối và động năng chuyển động nhiệt trung bình của các phân tử khí.",
    exampleVi: "Hằng số Boltzmann k xấp xỉ bằng 1.38 x 10^-23 J/K.",
    exampleEn: "The Boltzmann constant k is approximately 1.38 x 10^-23 J/K."
  },
  {
    id: "v11",
    vietnamese: "Từ trường",
    english: "Magnetic field",
    ipa: "/mæɡˈnet.ɪk fiːld/",
    category: "Từ trường",
    definition: "Một dạng vật chất đặc biệt tồn tại xung quanh nam châm hoặc dòng điện, tác dụng lực từ lên kim nam châm hoặc dòng điện khác.",
    exampleVi: "Trái Đất có một từ trường khổng lồ bảo vệ chúng ta khỏi bức xạ vũ trụ.",
    exampleEn: "The Earth has a massive magnetic field that protects us from cosmic radiation."
  },
  {
    id: "v12",
    vietnamese: "Cảm ứng từ",
    english: "Magnetic induction",
    ipa: "/mæɡˈnet.ɪk ɪnˈdʌk.ʃən/",
    category: "Từ trường",
    definition: "Đại lượng vectơ đặc trưng cho hướng và độ mạnh yếu của tác dụng lực từ tại một điểm trong từ trường, kí hiệu là B.",
    exampleVi: "Vectơ cảm ứng từ của dòng điện thẳng dài tỉ lệ nghịch với khoảng cách r.",
    exampleEn: "The magnetic induction vector of a long straight current is inversely proportional to distance r."
  },
  {
    id: "v13",
    vietnamese: "Từ thông",
    english: "Magnetic flux",
    ipa: "/mæɡˈnet.ɪk flʌks/",
    category: "Từ trường",
    definition: "Đại lượng vật lí biểu thị dòng cảm ứng từ xuyên qua một diện tích bề mặt phẳng giới hạn bởi vòng dây kín.",
    exampleVi: "Từ thông qua mạch kín thay đổi sinh ra suất điện động cảm ứng.",
    exampleEn: "Changing magnetic flux through a closed loop generates an induced electromotive force."
  },
  {
    id: "v14",
    vietnamese: "Suất điện động cảm ứng",
    english: "Induced electromotive force",
    ipa: "/ɪnˈdʒuːst iˌlek.trəʊˌməʊ.tɪv fɔːs/",
    category: "Từ trường",
    definition: "Suất điện động xuất hiện trong mạch kín khi từ thông qua mạch biến thiên, là nguyên nhân sinh ra dòng điện cảm ứng.",
    exampleVi: "Theo định luật Faraday, độ lớn suất điện động cảm ứng tỉ lệ với tốc độ biến thiên từ thông.",
    exampleEn: "According to Faraday's law, the magnitude of induced electromotive force is proportional to the rate of change of magnetic flux."
  },
  {
    id: "v15",
    vietnamese: "Lực từ",
    english: "Magnetic force",
    ipa: "/mæɡˈnet.ɪk fɔːs/",
    category: "Từ trường",
    definition: "Lực tác dụng của từ trường lên một dây dẫn mang dòng điện hoặc một hạt mang điện chuyển động.",
    exampleVi: "Lực từ Am-pe tác dụng lên đoạn dây dẫn đặt vuông góc với từ trường có độ lớn cực đại.",
    exampleEn: "The Ampere magnetic force acting on a conductor segment placed perpendicular to the magnetic field reaches its maximum magnitude."
  },
  {
    id: "v16",
    vietnamese: "Độ hụt khối",
    english: "Mass defect",
    ipa: "/mæs dɪˈfekt/",
    category: "Vật lí hạt nhân",
    definition: "Hiệu số giữa tổng khối lượng các hạt cấu tạo riêng lẻ (protons & neutrons) so với khối lượng hạt nhân sau khi liên kết bền vững.",
    exampleVi: "Độ hụt khối càng lớn thì năng lượng liên kết của hạt nhân càng cao.",
    exampleEn: "The larger the mass defect, the higher the binding energy of the nucleus."
  },
  {
    id: "v17",
    vietnamese: "Năng lượng liên kết riêng",
    english: "Specific binding energy",
    ipa: "/spəˈsɪf.ɪk ˈbaɪn.dɪŋ ˈen.ə.dʒi/",
    category: "Vật lí hạt nhân",
    definition: "Năng lượng liên kết tính trung bình trên mỗi hạt nuclôn, đặc trưng trực tiếp cho độ bền vững của hạt nhân.",
    exampleVi: "Hạt nhân có số khối trong khoảng từ 50 đến 95 có năng lượng liên kết riêng lớn nhất và bền vững nhất.",
    exampleEn: "Nuclei with mass numbers between 50 and 95 have the highest specific binding energy and are the most stable."
  },
  {
    id: "v18",
    vietnamese: "Chu kì bán rã",
    english: "Half-life",
    ipa: "/ˈhɑːf.laɪf/",
    category: "Vật lí hạt nhân",
    definition: "Khoảng thời gian cần thiết để một nửa số lượng nguyên tử của một mẫu chất phóng xạ phân rã biến đổi thành chất khác.",
    exampleVi: "Chu kì bán rã của Carbon-14 được dùng để xác định tuổi của cổ vật hữu cơ.",
    exampleEn: "The half-life of Carbon-14 is used to determine the age of organic archaeological artifacts."
  },
  {
    id: "v19",
    vietnamese: "Phản ứng phân hạch",
    english: "Nuclear fission",
    ipa: "/ˈnjuː.kli.ər ˈfɪʃ.ən/",
    category: "Vật lí hạt nhân",
    definition: "Phản ứng hạt nhân trong đó một hạt nhân nặng hấp thụ một neutron chậm rồi vỡ thành hai hạt nhân trung bình kèm theo sự giải phóng năng lượng.",
    exampleVi: "Các lò phản ứng hạt nhân thương mại hiện nay sản xuất điện bằng phản ứng phân hạch Uranium-235.",
    exampleEn: "Commercial nuclear reactors today generate electricity using the nuclear fission of Uranium-235."
  },
  {
    id: "v20",
    vietnamese: "Phản ứng nhiệt hạch",
    english: "Nuclear fusion",
    ipa: "/ˈnjuː.kli.ər ˈfjuː.ʒən/",
    category: "Vật lí hạt nhân",
    definition: "Phản ứng hạt nhân trong đó hai hay nhiều hạt nhân rất nhẹ kết hợp với nhau ở nhiệt độ cực cao tạo thành hạt nhân nặng hơn và giải phóng năng lượng lớn.",
    exampleVi: "Năng lượng mặt trời được sinh ra từ các chuỗi phản ứng nhiệt hạch hạt nhân hydro.",
    exampleEn: "Solar energy is generated from chains of nuclear fusion reactions of hydrogen nuclei."
  }
];

// 3. NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM ĐỂ LỌC
export const QUESTION_BANK: Question[] = [
  {
    id: 101,
    text: "Nhiệt độ nóng chảy riêng của một chất phụ thuộc vào yếu tố nào?",
    options: [
      "A. Bản chất của chất nóng chảy.",
      "B. Khối lượng của chất nóng chảy.",
      "C. Nhiệt lượng cung cấp cho chất đó.",
      "D. Thể tích ban đầu của chất."
    ],
    answer: "A",
    level: "NB",
    chapter: "Vật lí nhiệt",
    tag: "Chuyển thể"
  },
  {
    id: 102,
    text: "Hệ thức ΔU = A + Q với A > 0 và Q < 0 mô tả cho quá trình nào của hệ nhiệt động?",
    options: [
      "A. Hệ nhận công và nhận nhiệt.",
      "B. Hệ thực hiện công và tỏa nhiệt.",
      "C. Hệ nhận công và truyền nhiệt (tỏa nhiệt).",
      "D. Hệ thực hiện công và nhận nhiệt."
    ],
    answer: "C",
    level: "TH",
    chapter: "Vật lí nhiệt",
    tag: "Định luật 1 NĐLH"
  },
  {
    id: 103,
    text: "Khi một lượng khí lí tưởng dãn đẳng nhiệt từ thể tích V1 đến V2 thì áp suất chất khí thay đổi như thế nào?",
    options: [
      "A. Tăng tỉ lệ thuận với thể tích.",
      "B. Giảm tỉ lệ nghịch với thể tích.",
      "C. Không thay đổi.",
      "D. Biến thiên tuần hoàn."
    ],
    answer: "B",
    level: "TH",
    chapter: "Khí lí tưởng",
    tag: "Đẳng nhiệt"
  },
  {
    id: 104,
    text: "Một dây dẫn thẳng mang dòng điện I đặt vuông góc với cảm ứng từ B. Nếu chiều dài dây dẫn giảm một nửa đồng thời cường độ dòng điện tăng gấp đôi thì lực từ tác dụng lên dây thế nào?",
    options: [
      "A. Tăng gấp đôi",
      "B. Giảm đi một nửa",
      "C. Không đổi",
      "D. Tăng gấp bốn lần"
    ],
    answer: "C",
    level: "VD",
    chapter: "Từ trường",
    tag: "Lực từ"
  },
  {
    id: 105,
    text: "Hạt nhân Côban Co (60, 27) có khối lượng hạt nhân là 59.919u. Cho biết mp = 1.007276u, mn = 1.008665u, 1u = 931.5 MeV/c^2. Tính năng lượng liên kết riêng của hạt nhân Co.",
    options: [
      "A. 8.41 MeV/nuclôn",
      "B. 8.78 MeV/nuclôn",
      "C. 7.62 MeV/nuclôn",
      "D. 9.15 MeV/nuclôn"
    ],
    answer: "B",
    level: "VDC",
    chapter: "Vật lí hạt nhân",
    tag: "Năng lượng liên kết"
  }
];

// 4. SAMPLE EXAM FOR OCR TESTING / DEMONSTRATION
export const SAMPLE_EXAM_TEXT = `SỞ GIÁO DỤC VÀ ĐÀO TẠO HÀ NỘI
ĐỀ KIỂM TRA CHẤT LƯỢNG HỌC KỲ II - NĂM HỌC 2025-2026
MÔN: VẬT LÍ lớp 12 (Chương trình GDPT 2018)
Thời gian làm bài: 45 phút (Không kể thời gian phát đề)

Câu 1 (Nhận biết): Công thức liên hệ giữa nhiệt lượng Q cần cung cấp để nóng chảy m kg chất rắn ở nhiệt độ nóng chảy với nhiệt nóng chảy riêng là gì?
A. Q = L.m
B. Q = λ.m
C. Q = m.c.Δt
D. Q = m.L.Δt

Câu 2 (Thông hiểu): Một lượng khí lí tưởng nhận công 150 J và truyền nhiệt lượng 100 J cho môi trường xung quanh. Độ biến thiên nội năng ΔU là bao nhiêu?
A. 250 J
B. 50 J
C. -50 J
D. 100 J

Câu 3 (Thông hiểu): Một bình chứa khí dung tích 10 lít ở áp suất 2 atm và nhiệt độ 27 độ C. Số mol khí chứa trong bình xấp xỉ bằng bao nhiêu? (Cho R = 0.0821 atm.l/mol.K)
A. 0.81 mol
B. 4.51 mol
C. 1.22 mol
D. 0.45 mol

Câu 4 (Vận dụng): Dây dẫn dài 20cm mang dòng điện I = 5A đặt vuông góc với từ trường đều có cảm ứng từ B = 0.4T. Lực từ tác dụng lên đoạn dây dẫn này bằng:
A. 0.4 N
B. 4.0 N
C. 1.0 N
D. 2.5 N

Câu 5 (Vận dụng cao): Chất phóng xạ có chu kì bán rã T = 138 ngày. Ban đầu có một mẫu chất nguyên chất khối lượng 10g. Hỏi sau 414 ngày, khối lượng phóng xạ đã bị phân rã biến đổi thành chất khác bằng bao nhiêu gam?
A. 1.25g
B. 8.75g
C. 5.00g
D. 7.50g`;
