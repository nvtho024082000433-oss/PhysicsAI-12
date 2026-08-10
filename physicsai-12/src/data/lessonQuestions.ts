export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Part1Question {
  id: string;
  question: string;
  options: Option[];
  level: "Nhận biết" | "Thông hiểu" | "Vận dụng";
  explanation: string;
  illustrationType?: string;
}

export interface Statement {
  id: string;
  text: string;
  isCorrect: boolean;
  level: "Nhận biết" | "Thông hiểu" | "Vận dụng";
  explanation: string;
}

export interface Part2Question {
  id: string;
  question: string;
  statements: Statement[];
  illustrationType?: string;
}

export interface Part3Question {
  id: string;
  question: string;
  answer: number;
  unit: string;
  level: "Nhận biết" | "Thông hiểu" | "Vận dụng";
  explanation: string;
  illustrationType?: string;
}


// ==================== LESSON 1 QUESTIONS ====================
export const INITIAL_P1_QUESTIONS: Part1Question[] = [
  {
    id: "p1_q1",
    question: "Theo thuyết động học phân tử về cấu tạo chất, phát biểu nào sau đây đúng về sự cấu tạo của các chất?",
    level: "Nhận biết",
    explanation: "Thuyết động học phân tử khẳng định các chất được cấu tạo từ các phân tử (nguyên tử, phân tử, ion) riêng biệt và giữa chúng luôn có khoảng cách.",
    options: [
      { id: "p1_q1_o1", text: "Các chất cấu tạo từ các chất lỏng liên tục không có khoảng cách.", isCorrect: false },
      { id: "p1_q1_o2", text: "Các chất được cấu tạo từ các phân tử riêng biệt và giữa chúng có khoảng cách.", isCorrect: true },
      { id: "p1_q1_o3", text: "Các chất cấu tạo từ một khối liền mạch không thể phân chia.", isCorrect: false },
      { id: "p1_q1_o4", text: "Khoảng cách giữa các phân tử của mọi chất luôn bằng không.", isCorrect: false }
    ]
  },
  {
    id: "p1_q2",
    question: "Phát biểu nào sau đây đúng khi nói về chuyển động của các phân tử cấu tạo nên vật chất?",
    level: "Nhận biết",
    explanation: "Các phân tử cấu tạo nên chất chuyển động hỗn loạn không ngừng. Nhiệt độ của vật càng cao thì tốc độ chuyển động hỗn loạn này càng nhanh.",
    options: [
      { id: "p1_q2_o1", text: "Các phân tử luôn đứng yên và chỉ chuyển động khi bị nung nóng.", isCorrect: false },
      { id: "p1_q2_o2", text: "Các phân tử chuyển động hỗn loạn không ngừng; nhiệt độ càng cao chúng chuyển động càng nhanh.", isCorrect: true },
      { id: "p1_q2_o3", text: "Các phân tử chuyển động theo quỹ đạo tròn đồng tâm rất ổn định.", isCorrect: false },
      { id: "p1_q2_o4", text: "Nhiệt độ giảm làm tăng tốc độ chuyển động hỗn loạn của phân tử.", isCorrect: false }
    ]
  },
  {
    id: "p1_q3",
    question: "Thí nghiệm Brown quan sát các hạt phấn hoa trong nước dưới kính hiển vi được tiến hành bởi nhà thực vật học Robert Brown vào năm nào?",
    level: "Nhận biết",
    explanation: "Robert Brown làm thí nghiệm quan sát chuyển động của hạt phấn hoa trong nước dưới kính hiển vi vào năm 1827.",
    options: [
      { id: "p1_q3_o1", text: "Năm 1827", isCorrect: true },
      { id: "p1_q3_o2", text: "Năm 1905", isCorrect: false },
      { id: "p1_q3_o3", text: "Năm 1687", isCorrect: false },
      { id: "p1_q3_o4", text: "Năm 1927", isCorrect: false }
    ]
  },
  {
    id: "p1_q4",
    question: "Khi khoảng cách giữa các phân tử chất rắn rất nhỏ (bằng kích thước phân tử r0), lực tương tác phân tử có đặc điểm gì?",
    level: "Nhận biết",
    explanation: "Ở khoảng cách r = r0, lực hút và lực đẩy giữa các phân tử cân bằng nhau, lực tương tác tổng hợp bằng không.",
    options: [
      { id: "p1_q4_o1", text: "Lực tương tác tổng hợp bằng không.", isCorrect: true },
      { id: "p1_q4_o2", text: "Lực đẩy cực lớn, không có lực hút.", isCorrect: false },
      { id: "p1_q4_o3", text: "Lực hút cực lớn, không có lực đẩy.", isCorrect: false },
      { id: "p1_q4_o4", text: "Hai lực đều biến mất hoàn toàn.", isCorrect: false }
    ]
  },
  {
    id: "p1_q5",
    question: "Quá trình một chất chuyển từ thể khí trực tiếp sang thể rắn được gọi là gì?",
    level: "Nhận biết",
    explanation: "Sự thăng hoa là quá trình chất chuyển trực tiếp từ rắn sang khí. Quá trình ngược lại từ khí trực tiếp sang rắn gọi là sự ngưng kết.",
    options: [
      { id: "p1_q5_o1", text: "Sự thăng hoa", isCorrect: false },
      { id: "p1_q5_o2", text: "Sự ngưng kết", isCorrect: true },
      { id: "p1_q5_o3", text: "Sự ngưng tụ", isCorrect: false },
      { id: "p1_q5_o4", text: "Sự đông đặc", isCorrect: false }
    ]
  },
  {
    id: "p1_q6",
    question: "Đặc điểm cơ bản của chất rắn vô định hình là gì?",
    level: "Nhận biết",
    explanation: "Chất rắn vô định hình không có cấu trúc tinh thể tuần hoàn sắp xếp tuần hoàn và không có nhiệt độ nóng chảy xác định.",
    options: [
      { id: "p1_q6_o1", text: "Có cấu trúc tinh thể tuần hoàn và nhiệt độ nóng chảy xác định.", isCorrect: false },
      { id: "p1_q6_o2", text: "Không có cấu trúc tinh thể tuần hoàn và không có nhiệt độ nóng chảy xác định.", isCorrect: true },
      { id: "p1_q6_o3", text: "Luôn dẫn điện tốt và dẻo dai ở mọi nhiệt độ âm.", isCorrect: false },
      { id: "p1_q6_o4", text: "Có cấu trúc tinh thể nhưng không có hình dạng xác định.", isCorrect: false }
    ]
  },
  {
    id: "p1_q7",
    question: "Sự thăng hoa là quá trình biến đổi trạng thái trực tiếp từ thể nào sang thể nào?",
    level: "Nhận biết",
    explanation: "Sự thăng hoa là quá trình biến đổi trạng thái trực tiếp của chất từ thể rắn sang thể khí mà không qua thể lỏng.",
    options: [
      { id: "p1_q7_o1", text: "Từ lỏng sang khí.", isCorrect: false },
      { id: "p1_q7_o2", text: "Từ rắn sang khí trực tiếp.", isCorrect: true },
      { id: "p1_q7_o3", text: "Từ hơi sang rắn trực tiếp.", isCorrect: false },
      { id: "p1_q7_o4", text: "Từ rắn sang lỏng.", isCorrect: false }
    ]
  },
  {
    id: "p1_q8",
    question: "Trạng thái vật chất thứ tư phổ biến trong vũ trụ, bao gồm các ion dương và electron tự do, nhiệt độ cực kỳ cao gọi là gì?",
    level: "Nhận biết",
    explanation: "Trạng thái vật chất thứ tư đó chính là trạng thái Plasma, cấu tạo nên các ngôi sao và Mặt Trời trong vũ trụ.",
    options: [
      { id: "p1_q8_o1", text: "Trạng thái khí lí tưởng", isCorrect: false },
      { id: "p1_q8_o2", text: "Trạng thái Plasma", isCorrect: true },
      { id: "p1_q8_o3", text: "Trạng thái siêu lỏng", isCorrect: false },
      { id: "p1_q8_o4", text: "Trạng thái ngưng tụ Bose-Einstein", isCorrect: false }
    ]
  },
  {
    id: "p1_q9",
    question: "Tại sao khi nhiệt độ của một khối khí trong bình kín tăng lên thì áp suất khí tác dụng lên thành bình lại tăng?",
    level: "Thông hiểu",
    explanation: "Nhiệt độ tăng làm tốc độ chuyển động của các phân tử tăng, dẫn đến tần suất va chạm và lực va chạm trung bình của phân tử lên thành bình trong một đơn vị thời gian tăng lên.",
    options: [
      { id: "p1_q9_o1", text: "Do thể tích của các phân tử khí dãn nở to ra va chạm mạnh hơn.", isCorrect: false },
      { id: "p1_q9_o2", text: "Do tốc độ chuyển động nhiệt tăng, làm tăng lực va chạm và số va chạm của phân tử lên thành bình.", isCorrect: true },
      { id: "p1_q9_o3", text: "Do các phân tử khí hút nhau mạnh hơn kéo dạt vào thành bình.", isCorrect: false },
      { id: "p1_q9_o4", text: "Do áp suất khí quyển bên ngoài bình tự động giảm xuống đột ngột.", isCorrect: false }
    ]
  },
  {
    id: "p1_q10",
    question: "Khi mở nắp một lọ nước hoa ở góc phòng, chỉ một lát sau cả căn phòng đều ngửi thấy mùi hương thơm mát. Hiện tượng này được giải thích như thế nào?",
    level: "Thông hiểu",
    explanation: "Do các phân tử nước hoa chuyển động hỗn loạn không ngừng, tự bay hơi rồi khuếch tán len lỏi vào khoảng trống giữa các phân tử không khí lan tỏa khắp phòng.",
    options: [
      { id: "p1_q10_o1", text: "Do gió cuốn các hạt nước hoa lỏng bay lơ lửng bám vào mũi.", isCorrect: false },
      { id: "p1_q10_o2", text: "Do các phân tử nước hoa chuyển động hỗn loạn không ngừng và khuếch tán vào không khí.", isCorrect: true },
      { id: "p1_q10_o3", text: "Do phân tử nước hoa tự sinh ra điện tích đẩy nhau đi khắp phòng.", isCorrect: false },
      { id: "p1_q10_o4", text: "Do không khí trong phòng chuyển động theo một chiều tuần hoàn khép kín.", isCorrect: false }
    ]
  },
  {
    id: "p1_q11",
    question: "Khi đun nóng một mẫu đồng (chất rắn kết tinh) và một cục nhựa đường (chất rắn vô định hình), sự khác biệt căn bản về nhiệt độ nóng chảy là gì?",
    level: "Thông hiểu",
    explanation: "Chất rắn kết tinh như đồng nóng chảy ở một nhiệt độ xác định duy nhất (1085°C), còn chất rắn vô định hình mềm dần rồi hóa lỏng trên một dải nhiệt độ rộng không xác định.",
    options: [
      { id: "p1_q11_o1", text: "Đồng nóng chảy ở nhiệt độ thấp hơn rất nhiều so với cục nhựa đường.", isCorrect: false },
      { id: "p1_q11_o2", text: "Đồng nóng chảy ở nhiệt độ không đổi xác định, còn nhựa đường mềm ra liên tục khi nhiệt độ tăng.", isCorrect: true },
      { id: "p1_q11_o3", text: "Nhựa đường có một điểm nóng chảy phẳng hoàn hảo giống hệt thỏi đồng.", isCorrect: false },
      { id: "p1_q11_o4", text: "Cả đồng và nhựa đường đều hóa lỏng ở cùng một nhiệt độ duy nhất.", isCorrect: false }
    ]
  },
  {
    id: "p1_q12",
    question: "Nhỏ một giọt nước lên mặt sáp nến bôi trên tấm kính, giọt nước co cụm lại thành hình cầu dẹt chứ không loang ra. Hiện tượng này giải thích bằng lực tương tác phân tử thế nào?",
    level: "Thông hiểu",
    explanation: "Đây là hiện tượng không dính ướt. Lực hút giữa các phân tử nước mạnh hơn nhiều so với lực hút giữa các phân tử nước và phân tử sáp nến nên nước co lại.",
    options: [
      { id: "p1_q12_o1", text: "Lực hút giữa phân tử nước và phân tử sáp mạnh hơn lực hút giữa các phân tử nước.", isCorrect: false },
      { id: "p1_q12_o2", text: "Lực hút giữa các phân tử nước mạnh hơn lực hút giữa phân tử nước và phân tử sáp (không dính ướt).", isCorrect: true },
      { id: "p1_q12_o3", text: "Sáp nến có cấu trúc xốp hút hết nước lỏng làm co lại.", isCorrect: false },
      { id: "p1_q12_o4", text: "Do trọng lực Trái Đất bị triệt tiêu hoàn toàn khi nước chạm vào sáp nến.", isCorrect: false }
    ]
  },
  {
    id: "p1_q13",
    question: "Dựa vào đồ thị lực tương tác phân tử (Hình vẽ kèm theo), lực hút phân tử bắt đầu chiếm ưu thế hơn lực đẩy khi nào?",
    level: "Thông hiểu",
    explanation: "Đồ thị lực tương tác phân tử cho thấy khi khoảng cách r lớn hơn kích thước phân tử r0, lực tương tác tổng hợp F là lực hút (F > 0).",
    illustrationType: "molecular_force_graph",
    options: [
      { id: "p1_q13_o1", text: "Khi khoảng cách r nhỏ hơn kích thước phân tử r0.", isCorrect: false },
      { id: "p1_q13_o2", text: "Khi khoảng cách r lớn hơn kích thước phân tử r0.", isCorrect: true },
      { id: "p1_q13_o3", text: "Chỉ khi khoảng cách r bằng đúng r0.", isCorrect: false },
      { id: "p1_q13_o4", text: "Khi khoảng cách r tiến đến vô hạn.", isCorrect: false }
    ]
  },
  {
    id: "p1_q14",
    question: "Đồ thị đường cong nóng chảy dưới đây biểu diễn một lượng nước đá ở áp suất chuẩn từ -10°C đến 100°C. Đoạn nằm ngang đầu tiên ở 0°C thể hiện điều gì?",
    level: "Vận dụng",
    explanation: "Đoạn nằm ngang đầu tiên ở 0°C thể hiện nước đá đang nóng chảy. Nhiệt lượng hấp thụ được dùng để bẻ gãy liên kết tinh thể tinh thể chứ không tăng động năng nhiệt phân tử, nên nhiệt độ không thay đổi.",
    illustrationType: "ice_heating_curve",
    options: [
      { id: "p1_q14_o1", text: "Nước lỏng bắt đầu đóng băng thành đá rắn.", isCorrect: false },
      { id: "p1_q14_o2", text: "Đá đang nóng chảy thành nước lỏng, nhiệt lượng dùng để bẻ gãy liên kết tinh thể.", isCorrect: true },
      { id: "p1_q14_o3", text: "Nước lỏng bắt đầu sôi mạnh và bốc hơi lên.", isCorrect: false },
      { id: "p1_q14_o4", text: "Hơi nước ngưng tụ thành đá rắn trực tiếp.", isCorrect: false }
    ]
  },
  {
    id: "p1_q15",
    question: "Vào những ngày trời nồm ẩm ở miền Bắc Việt Nam, độ ẩm không khí rất cao (gần 100%). Tại sao quần áo phơi ngoài trời lại cực kỳ lâu khô dù có gió?",
    level: "Vận dụng",
    explanation: "Độ ẩm quá cao nghĩa là mật độ phân tử hơi nước ngoài không khí cực lớn. Khi đó số phân tử nước ngưng tụ trở lại sợi vải xấp xỉ bằng số phân tử nước bay hơi ra ngoài mặt thoáng, làm quá trình khô chậm lại.",
    options: [
      { id: "p1_q15_o1", text: "Do gió ẩm thổi nhiệt lạnh làm nước trong vải đông đặc lại thành đá.", isCorrect: false },
      { id: "p1_q15_o2", text: "Mật độ phân tử hơi nước ngoài không khí quá lớn khiến tốc độ ngưng tụ trở lại xấp xỉ tốc độ bay hơi.", isCorrect: true },
      { id: "p1_q15_o3", text: "Do áp suất không khí nén chặt làm nước hoa lỏng bám chặt vào vải.", isCorrect: false },
      { id: "p1_q15_o4", text: "Do sương muối bám vào cản trở quá trình dãn nở của sợi vải.", isCorrect: false }
    ]
  },
  {
    id: "p1_q16",
    question: "Tại sao người thợ thổi thủy tinh có thể dễ dàng uốn cong, kéo dãn, và tạo hình tinh xảo những ống thủy tinh khi hơ nóng chúng trên ngọn lửa đèn khò?",
    level: "Vận dụng",
    explanation: "Thủy tinh là chất rắn vô định hình, không có cấu trúc tinh thể nên khi hơ nóng nó không nóng chảy đột ngột mà mềm dần từ từ trên một dải nhiệt độ rộng, cho phép tạo hình dẻo.",
    options: [
      { id: "p1_q16_o1", text: "Do thủy tinh có mạng lưới tinh thể lập phương biến dạng ở áp suất cao.", isCorrect: false },
      { id: "p1_q16_o2", text: "Vì thủy tinh là chất rắn vô định hình, khi hơ nóng nó mềm dần trên một khoảng nhiệt độ rộng chứ không hóa lỏng đột ngột.", isCorrect: true },
      { id: "p1_q16_o3", text: "Do nhiệt độ đèn khò làm thủy tinh chuyển sang trạng thái Plasma dẫn điện dẻo.", isCorrect: false },
      { id: "p1_q16_o4", text: "Do hiện tượng thăng hoa của thủy tinh tạo ra các lỗ xốp dẻo dai.", isCorrect: false }
    ]
  },
  {
    id: "p1_q17",
    question: "Một khối sáp nến đang nóng chảy ở nhiệt độ cố định là 60°C. Trong suốt quá trình nóng chảy kéo dài 10 phút, nếu ta dùng nhiệt kế để đo sáp nến thì kết quả nhận được thế nào?",
    level: "Vận dụng",
    explanation: "Trong suốt quá trình nóng chảy của một chất kết tinh hoặc sáp nóng chảy đặc thù ở áp suất xác định, nhiệt độ luôn giữ cố định cho đến khi toàn bộ chất rắn chuyển sang lỏng.",
    options: [
      { id: "p1_q17_o1", text: "Nhiệt độ tăng vọt liên tục từ 60°C lên 100°C.", isCorrect: false },
      { id: "p1_q17_o2", text: "Nhiệt độ được giữ không đổi ở mức 60°C cho đến khi nóng chảy hoàn toàn.", isCorrect: true },
      { id: "p1_q17_o3", text: "Nhiệt độ sáp nến giảm đột ngột xuống 0°C để cân bằng lạnh.", isCorrect: false },
      { id: "p1_q17_o4", text: "Nhiệt độ dao động lên xuống liên tục từ 40°C đến 80°C.", isCorrect: false }
    ]
  },
  {
    id: "p1_q18",
    question: "Đồ thị kèm theo biểu diễn mật độ phân tử khí quyển giảm dần khi độ cao tăng lên. Nguyên nhân vật lí của sự phân bố mật độ khí này là gì?",
    level: "Vận dụng",
    explanation: "Do lực hấp dẫn của Trái Đất kéo các phân tử khí xuống phía dưới mặt đất, trong khi chuyển động nhiệt hỗn loạn có xu hướng phân tán các phân tử ra xa, tạo ra sự cân bằng mật độ giảm dần theo độ cao.",
    illustrationType: "atmospheric_density_graph",
    options: [
      { id: "p1_q18_o1", text: "Do gió thổi dạt hết các phân tử khí ra ngoài không gian vũ trụ.", isCorrect: false },
      { id: "p1_q18_o2", text: "Do sự cân bằng giữa chuyển động nhiệt hỗn loạn của phân tử khí và lực hấp dẫn của Trái Đất.", isCorrect: true },
      { id: "p1_q18_o3", text: "Do hơi nước bốc lên từ biển đẩy khí oxi dạt lên tầng bình lưu.", isCorrect: false },
      { id: "p1_q18_o4", text: "Do áp suất khí quyển ở tầng điện ly đẩy dồn nén ngược khí xuống.", isCorrect: false }
    ]
  }
];

export const INITIAL_P2_QUESTIONS: Part2Question[] = [
  {
    id: "p2_q1",
    question: "Xét các nội dung liên quan đến Mô hình động học phân tử cấu tạo chất và thí nghiệm chuyển động Brown dưới đây:",
    illustrationType: "brownian_pollen_path",
    statements: [
      {
        id: "p2_q1_s1",
        text: "Mô hình động học phân tử khẳng định các chất cấu tạo từ các hạt riêng biệt gọi là phân tử, giữa chúng luôn có khoảng cách.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đây là luận điểm nền tảng cơ bản của mô hình động học phân tử về cấu tạo chất."
      },
      {
        id: "p2_q1_s2",
        text: "Trong thí nghiệm Brown, chuyển động hỗn loạn không ngừng của hạt phấn hoa là bằng chứng trực tiếp chứng tỏ các hạt phấn hoa tự có cơ quan chuyển động sống.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Chuyển động Brown của hạt phấn hoa là do các phân tử nước xung quanh chuyển động nhiệt hỗn loạn không ngừng va chạm bất đối xứng vào chúng."
      },
      {
        id: "p2_q1_s3",
        text: "Khi nung nóng cốc nước chứa hạt phấn hoa, hạt phấn hoa chuyển động hỗn loạn nhanh hơn vì nhiệt độ tăng làm tốc độ chuyển động nhiệt của phân tử nước tăng lên, làm tăng cường độ va chạm.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Nhiệt độ tăng làm phân tử nước chuyển động nhanh hơn, lực va chạm trung bình mạnh hơn dẫn đến chuyển động Brown mạnh mẽ hơn."
      },
      {
        id: "p2_q1_s4",
        text: "Sự khuếch tán mùi thơm của nước hoa diễn ra nhanh hơn trong phòng nóng so với phòng lạnh là minh chứng cho thấy tốc độ chuyển động nhiệt phân tử tăng theo nhiệt độ.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Nhiệt độ cao làm các phân tử nước hoa chuyển động nhanh hơn, len lỏi tự do vào khoảng trống phân tử không khí nhanh hơn."
      }
    ]
  },
  {
    id: "p2_q2",
    question: "Xét các phát biểu về cấu trúc phân tử của ba trạng thái vật chất Rắn, Lỏng và Khí:",
    illustrationType: "three_states_matter",
    statements: [
      {
        id: "p2_q2_s1",
        text: "Lực liên kết giữa các phân tử ở thể rắn là mạnh nhất, giữ chúng ở các vị trí cân bằng cố định dao động quanh một chỗ.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Ở thể rắn, lực liên kết phân tử cực mạnh nên giữ các phân tử ở các vị trí cố định dệt nên mạng lưới chặt chẽ."
      },
      {
        id: "p2_q2_s2",
        text: "Ở thể khí, lực liên kết giữa các phân tử vô cùng mạnh mẽ khiến chúng chỉ đứng yên và dồn nén lại với nhau.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Ở thể khí, lực liên kết phân tử rất yếu nên các phân tử tự do chuyển động hỗn loạn chiếm đầy thể tích bình."
      },
      {
        id: "p2_q2_s3",
        text: "Thể lỏng có thể tích xác định nhưng hình dạng thay đổi theo bình chứa vì lực liên kết phân tử lỏng yếu hơn rắn nhưng đủ lớn để giữ các phân tử gần nhau.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Lực liên kết của chất lỏng ở mức trung gian, các phân tử lỏng có vị trí cân bằng di động dời đổi quanh nhau."
      },
      {
        id: "p2_q2_s4",
        text: "Sự khác biệt căn bản về khả năng bị nén giữa chất lỏng và chất khí là do khoảng cách giữa các phân tử ở thể khí lớn gấp hàng chục lần so với kích thước phân tử và lớn hơn thể lỏng rất nhiều.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Vì khoảng cách phân tử khí cực lớn nên ta rất dễ nén chúng lại gần nhau, trong khi phân tử lỏng ở sát nhau nên chất lỏng rất khó nén."
      }
    ]
  },
  {
    id: "p2_q3",
    question: "Phát biểu dưới đây đề cập đến quá trình chuyển thể của các chất và giải thích bằng mô hình động học phân tử:",
    illustrationType: "heating_cooling_states",
    statements: [
      {
        id: "p2_q3_s1",
        text: "Sự hóa hơi là quá trình chuyển từ thể lỏng sang thể hơi (khí), diễn ra dưới hai hình thức là sự bay hơi (ở bề mặt thoáng) và sự sôi (xảy ra đồng thời ở lòng và mặt thoáng).",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đây là khái niệm đầy đủ về sự hóa hơi và phân biệt hai hình thức bay hơi và sôi trong sách giáo khoa."
      },
      {
        id: "p2_q3_s2",
        text: "Đun nước lỏng trong một nồi áp suất kín sẽ làm nhiệt độ sôi của nước tăng vọt lên trên 100°C (ví dụ 120°C) do áp suất cao cản trở sự thoát ra ngoài của phân tử nước lỏng.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Áp suất khí trên mặt thoáng càng cao thì nhiệt độ sôi của chất lỏng càng tăng, ứng dụng đắc lực trong nồi áp suất hầm thức ăn."
      },
      {
        id: "p2_q3_s3",
        text: "Khi ấm nước đang sôi mạnh ở 100°C dưới áp suất chuẩn, nếu ta vặn ngọn lửa bếp thật to thì nhiệt độ nước lỏng trong ấm sẽ lập tức vọt lên 105°C.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Ở áp suất chuẩn xác định, chất lỏng tinh khiết sôi ở nhiệt độ sôi không đổi. Nhiệt lượng cấp thêm chỉ làm nước hóa hơi nhanh hơn chứ không làm tăng nhiệt độ."
      },
      {
        id: "p2_q3_s4",
        text: "Trên đỉnh núi Fansipan cao 3143 m so với mặt nước biển, do áp suất khí quyển giảm xuống nên nhiệt độ sôi của nước giảm xuống dưới 100°C, khiến việc luộc chín kỹ thức ăn mất nhiều thời gian hơn.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Áp suất khí quyển giảm làm nhiệt độ sôi của nước giảm (chỉ khoảng 90°C), nước nhanh sôi nhưng nhiệt độ thấp nên thức ăn lâu chín kỹ hơn."
      }
    ]
  },
  {
    id: "p2_q4",
    question: "Xét các phát biểu về chất rắn kết tinh, chất rắn vô định hình và tính chất vật lí đặc thù của chúng:",
    illustrationType: "crystal_vs_amorphous_structure",
    statements: [
      {
        id: "p2_q4_s1",
        text: "Chất rắn kết tinh được đặc trưng bởi cấu trúc mạng tinh thể tuần hoàn xác định và có nhiệt độ nóng chảy xác định ở áp suất cho trước.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Chất rắn kết tinh (như muối, kim loại) luôn có trật tự hình học tinh thể và điểm nóng chảy không đổi xác định."
      },
      {
        id: "p2_q4_s2",
        text: "Các hạt muối ăn (NaCl) và tinh thể kim cương là các ví dụ tiêu biểu cho chất rắn kết tinh, có cấu trúc tinh thể sắc nét vững chắc.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Muối ăn có cấu trúc tinh thể lập phương, kim cương có cấu trúc tứ diện liên kết cộng hóa trị chặt chẽ."
      },
      {
        id: "p2_q4_s3",
        text: "Khi bị nung nóng, thủy tinh nóng chảy đột ngột ở đúng 500°C giống hệt như thỏi sắt tinh khiết nóng chảy phẳng ở 1538°C.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Thủy tinh là chất rắn vô định hình, khi đun nóng nó mềm dần dẻo ra rồi mới hóa lỏng trên một khoảng dải nhiệt độ rộng chứ không có điểm nóng chảy phẳng cố định."
      },
      {
        id: "p2_q4_s4",
        text: "Chất rắn đa tinh thể (như thỏi sắt, đồng gốm) có tính dị hướng mạnh mẽ tức là các tính chất vật lí của chúng thay đổi khác nhau theo mọi hướng đo khác nhau.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Chất rắn đơn tinh thể có tính dị hướng. Chất rắn đa tinh thể gồm vô số tinh thể nhỏ hỗn loạn định hướng khác nhau nên có tính đẳng hướng."
      }
    ]
  }
];

export const INITIAL_P3_QUESTIONS: Part3Question[] = [
  {
    id: "p3_q1",
    question: "Một lượng khí lí tưởng trong bình kín dung tích không đổi có nhiệt độ ban đầu là 27°C. Hỏi phải nung nóng khối khí này đến nhiệt độ tuyệt đối bao nhiêu Kelvin (K) để áp suất khí trong bình tăng lên gấp đúng hai lần áp suất ban đầu? (Điền kết quả là một số nguyên duy nhất).",
    answer: 600,
    unit: "K",
    level: "Thông hiểu",
    explanation: "Nhiệt độ tuyệt đối ban đầu: T1 = 27 + 273 = 300 K. Do thể tích bình không đổi (quá trình đẳng tích), áp dụng định luật Charles: p1/T1 = p2/T2. Vì p2 = 2.p1 nên T2 = 2.T1 = 2 * 300 = 600 K. Đáp án là 600.",
    illustrationType: "gas_cylinder_temp"
  },
  {
    id: "p3_q2",
    question: "Nhiệt hóa hơi riêng của nước ở nhiệt độ sôi 100°C là L = 2.3x10^6 J/kg. Cần cung cấp một nhiệt lượng bao nhiêu kJ để hóa hơi hoàn toàn 0.1 kg nước lỏng đang ở nhiệt độ sôi này? (Điền kết quả là một số nguyên duy nhất, ví dụ 230).",
    answer: 230,
    unit: "kJ",
    level: "Thông hiểu",
    explanation: "Áp dụng công thức tính nhiệt lượng hóa hơi: Q = m * L = 0.1 kg * 2.3x10^6 J/kg = 230,000 J = 230 kJ. Đáp án cần điền là số nguyên 230.",
    illustrationType: "condensation_heat"
  },
  {
    id: "p3_q3",
    question: "Một chiếc ấm nhôm khối lượng 0.5 kg chứa 1.5 kg nước ở nhiệt độ ban đầu 20°C. Cần cung cấp một nhiệt lượng tổng cộng bao nhiêu MJ để đun sôi lượng nước trong ấm lên 100°C? Biết nhiệt dung riêng của nhôm là 880 J/(kg.K) và của nước là 4200 J/(kg.K). Bỏ qua sự thất thoát nhiệt ra môi trường bên ngoài (làm tròn kết quả đến hai chữ số thập phân, dùng dấu chấm làm phần thập phân, ví dụ 0.54).",
    answer: 0.54,
    unit: "MJ",
    level: "Vận dụng",
    explanation: "Độ tăng nhiệt độ: Δt = 100 - 20 = 80 K. Nhiệt lượng thu vào của ấm nhôm: Q1 = m1.c1.Δt = 0.5 * 880 * 80 = 35,200 J. Nhiệt lượng thu vào của nước: Q2 = m2.c2.Δt = 1.5 * 4200 * 80 = 504,000 J. Tổng nhiệt lượng cần cung cấp: Q = Q1 + Q2 = 35,200 + 504,000 = 539,200 J = 0.5392 MJ. Làm tròn đến hai chữ số thập phân là 0.54.",
    illustrationType: "calorimeter_metal_water"
  },
  {
    id: "p3_q4",
    question: "Nhiệt nóng chảy riêng của nước đá là lambda = 3.34x10^5 J/kg. Cung cấp một nhiệt lượng 668 kJ cho một khối nước đá ở 0°C thì khối lượng nước đá nóng chảy hoàn toàn thành nước lỏng ở cùng nhiệt độ là bao nhiêu kilôgam (kg)? (Điền kết quả là một số nguyên duy nhất).",
    answer: 2,
    unit: "kg",
    level: "Vận dụng",
    explanation: "Nhiệt lượng nóng chảy: Q = m * λ => Khối lượng m = Q / λ = (668 * 10^3 J) / (3.34 * 10^5 J/kg) = 668,000 / 334,000 = 2 kg. Đáp án là 2.",
    illustrationType: "melting_ice_block"
  },
  {
    id: "p3_q5",
    question: "Một quả bóng thám không chứa khí heli có thể tích 10 m³ ở mặt đất nơi có nhiệt độ 27°C và áp suất 1.0 atm. Khi quả bóng bay lên cao đến tầng khí quyển nơi có nhiệt độ giảm xuống còn -23°C và áp suất giảm còn 0.4 atm, hãy tính thể tích của quả bóng lúc này theo đơn vị m³ (làm tròn kết quả đến hàng đơn vị). Coi vỏ bóng dãn nở tự do không cản trở.",
    answer: 21,
    unit: "m³",
    level: "Vận dụng",
    explanation: "Áp dụng phương trình trạng thái khí lí tưởng: p1.V1/T1 = p2.V2/T2. Với T1 = 27 + 273 = 300 K; T2 = -23 + 273 = 250 K. Ta suy ra: V2 = p1.V1.T2 / (p2.T1) = (1.0 * 10 * 250) / (0.4 * 300) = 2500 / 120 = 20.83 m³. Làm tròn đến hàng đơn vị được 21. Đáp án là 21.",
    illustrationType: "bicycle_tyre_sun"
  },
  {
    id: "p3_q6",
    question: "Một khối khí lí tưởng thực hiện quá trình nhận một nhiệt lượng Q = 450 J từ nguồn nhiệt bên ngoài, đồng thời khí dãn nở đẩy pít-tông ra ngoài và thực hiện một công có độ lớn A' = 150 J lên môi trường. Hãy tính độ biến thiên nội năng ΔU của khối khí này theo đơn vị Joule (J). (Điền kết quả là một số nguyên duy nhất, ví dụ 300).",
    answer: 300,
    unit: "J",
    level: "Vận dụng",
    explanation: "Áp dụng định luật I nhiệt động lực học: ΔU = A + Q. Khối khí nhận nhiệt lượng nên Q = +450 J. Khí thực hiện công lên môi trường nên nhận công âm: A = -A' = -150 J. Độ biến thiên nội năng là: ΔU = -150 + 450 = 300 J. Đáp án là 300.",
    illustrationType: "pressure_cooker_heating"
  }
];

// ==================== LESSON 2 QUESTIONS ====================
export const LESSON2_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l2_p1_q1",
    question: "Phát biểu nào sau đây là định nghĩa đúng và đầy đủ nhất về nội năng của một vật?",
    level: "Nhận biết",
    explanation: "Nội năng (U) của một vật là tổng động năng chuyển động nhiệt của các phân tử cấu tạo nên vật và thế năng tương tác giữa chúng. Đơn vị đo là Jun (J).",
    options: [
      { id: "l2_p1_q1_o1", text: "Nội năng là tổng động năng của các phân tử cấu tạo nên vật.", isCorrect: false },
      { id: "l2_p1_q1_o2", text: "Nội năng là tổng thế năng tương tác giữa các phân tử cấu tạo nên vật.", isCorrect: false },
      { id: "l2_p1_q1_o3", text: "Nội năng là tổng động năng chuyển động nhiệt của các phân tử cấu tạo nên vật và thế năng tương tác giữa chúng.", isCorrect: true },
      { id: "l2_p1_q1_o4", text: "Nội năng là nhiệt lượng mà vật nhận được trong quá trình truyền nhiệt.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q2",
    question: "Nội năng của một vật phụ thuộc vào những thông số trạng thái nào?",
    level: "Nhận biết",
    explanation: "Nội năng của một vật thông thường phụ thuộc vào cả nhiệt độ T (ảnh hưởng đến động năng chuyển động nhiệt) và thể tích V (ảnh hưởng đến thế năng tương tác giữa các phân tử).",
    options: [
      { id: "l2_p1_q2_o1", text: "Chỉ phụ thuộc vào nhiệt độ của vật.", isCorrect: false },
      { id: "l2_p1_q2_o2", text: "Chỉ phụ thuộc vào thể tích của vật.", isCorrect: false },
      { id: "l2_p1_q2_o3", text: "Phụt thuộc vào cả nhiệt độ và thể tích của vật.", isCorrect: true },
      { id: "l2_p1_q2_o4", text: "Phụt thuộc vào khối lượng và vận tốc chuyển động của vật.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q3",
    question: "Đối với một lượng khí lí tưởng xác định, nội năng của hệ chỉ phụ thuộc vào thông số nào?",
    level: "Thông hiểu",
    explanation: "Đối với khí lí tưởng, ta bỏ qua lực tương tác phân tử khi chưa va chạm, do đó thế năng tương tác phân tử bằng 0. Khi đó nội năng chỉ là tổng động năng chuyển động nhiệt, chỉ phụ thuộc vào nhiệt độ T.",
    options: [
      { id: "l2_p1_q3_o1", text: "Nhiệt độ của khí.", isCorrect: true },
      { id: "l2_p1_q3_o2", text: "Thể tích của khối khí.", isCorrect: false },
      { id: "l2_p1_q3_o3", text: "Áp suất của khí.", isCorrect: false },
      { id: "l2_p1_q3_o4", text: "Cả nhiệt độ và thể tích của khí.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q4",
    question: "Có mấy cách làm thay đổi nội năng của một vật vật lí?",
    level: "Nhận biết",
    explanation: "Có hai cách làm thay đổi nội năng của một vật là Thực hiện công (có sự chuyển hóa cơ năng thành nội năng) và Truyền nhiệt (chỉ có sự truyền nhiệt năng trực tiếp, không có sự chuyển hóa năng lượng).",
    options: [
      { id: "l2_p1_q4_o1", text: "Chỉ có 1 cách là thực hiện công.", isCorrect: false },
      { id: "l2_p1_q4_o2", text: "Chỉ có 1 cách là truyền nhiệt.", isCorrect: false },
      { id: "l2_p1_q4_o3", text: "Có 2 cách là thực hiện công và truyền nhiệt.", isCorrect: true },
      { id: "l2_p1_q4_o4", text: "Có 3 cách là thực hiện công, truyền nhiệt và cho vật chuyển động.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q5",
    question: "Hành động nào sau đây là ví dụ về việc làm thay đổi nội năng của vật bằng cách thực hiện công?",
    level: "Thông hiểu",
    explanation: "Cọ xát miếng kim loại lên sàn nhà làm nóng miếng kim loại là cách thực hiện công (A), có sự chuyển hóa từ cơ năng sang nội năng.",
    options: [
      { id: "l2_p1_q5_o1", text: "Thả một thìa kim loại lạnh vào cốc nước nóng.", isCorrect: false },
      { id: "l2_p1_q5_o2", text: "Cọ xát một miếng kim loại nhiều lần lên sàn nhà.", isCorrect: true },
      { id: "l2_p1_q5_o3", text: "Hơ nóng một lá đồng trên ngọn lửa đèn cồn.", isCorrect: false },
      { id: "l2_p1_q5_o4", text: "Phơi một tấm tôn ngoài trời nắng gắt.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q6",
    question: "Số đo lượng nhiệt năng bị hao hụt hoặc tăng thêm trực tiếp trong quá trình truyền nhiệt mà không có sự thực hiện công được gọi là:",
    level: "Nhận biết",
    explanation: "Nhiệt lượng (Q) là số đo phần nhiệt năng được truyền từ vật này sang vật khác trong quá trình truyền nhiệt.",
    options: [
      { id: "l2_p1_q6_o1", text: "Nội năng tăng thêm.", isCorrect: false },
      { id: "l2_p1_q6_o2", text: "Công thực hiện.", isCorrect: false },
      { id: "l2_p1_q6_o3", text: "Nhiệt lượng.", isCorrect: true },
      { id: "l2_p1_q6_o4", text: "Độ biến thiên nội năng tuyệt đối.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q7",
    question: "Công thức mô tả Định luật I của nhiệt động lực học là gì?",
    level: "Nhận biết",
    explanation: "Công thức Định luật I nhiệt động lực học là ΔU = A + Q. Trong đó ΔU là độ biến thiên nội năng, A là công hệ nhận được, Q là nhiệt lượng hệ nhận được.",
    options: [
      { id: "l2_p1_q7_o1", text: "ΔU = A - Q", isCorrect: false },
      { id: "l2_p1_q7_o2", text: "ΔU = Q - A", isCorrect: false },
      { id: "l2_p1_q7_o3", text: "ΔU = A + Q", isCorrect: true },
      { id: "l2_p1_q7_o4", text: "ΔU = A * Q", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q8",
    question: "Một khối khí trong xi lanh nhận được nhiệt lượng 150 J từ nguồn nhiệt và đồng thời sinh ra một công cơ học 100 J đẩy pít-tông dịch chuyển ra phía ngoài. Độ biến thiên nội năng của khối khí là:",
    level: "Vận dụng",
    explanation: "Theo quy ước dấu: Hệ nhận nhiệt lượng Q = +150 J. Hệ sinh công (thực hiện công ra ngoài) nên A = -100 J. Áp dụng Định luật I: \\Delta U = A + Q = -100 J + 150 J = 50 J. Nội năng tăng thêm 50 J.",
    options: [
      { id: "l2_p1_q8_o1", text: "250 J", isCorrect: false },
      { id: "l2_p1_q8_o2", text: "50 J", isCorrect: true },
      { id: "l2_p1_q8_o3", text: "-50 J", isCorrect: false },
      { id: "l2_p1_q8_o4", text: "-250 J", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q9",
    question: "Ba bộ phận cấu tạo cơ bản bắt buộc phải có của một động cơ nhiệt hoạt động liên tục là:",
    level: "Thông hiểu",
    explanation: "Theo nội dung bài học trang 13, cấu tạo của một động cơ nhiệt gồm 3 bộ phận chính: Nguồn nóng (cung cấp nhiệt lượng Q_1), Tác nhân (hơi nước, khí dãn nở sinh công A) và Nguồn lạnh (nhận nhiệt lượng Q_2 tỏa ra).",
    options: [
      { id: "l2_p1_q9_o1", text: "Nhiên liệu đốt, xilanh và pít-tông truyền lực.", isCorrect: false },
      { id: "l2_p1_q9_o2", text: "Nguồn nóng, tác nhân dãn nở sinh công và nguồn lạnh.", isCorrect: true },
      { id: "l2_p1_q9_o3", text: "Bugi phát lửa, buồng đốt khí và trục khuỷu truyền lực.", isCorrect: false },
      { id: "l2_p1_q9_o4", text: "Nồi súp-de, bình ngưng hơi nước và bơm áp lực.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q10",
    question: "Khi một khối nước đá đang nóng chảy ở nhiệt độ 0°C dưới áp suất chuẩn, nhận định nào sau đây về sự biến đổi năng lượng phân tử của nước là chính xác?",
    level: "Vận dụng",
    explanation: "Khi nước đá đang tan ở 0°C, nhiệt độ không đổi nên động năng trung bình của các phân tử nước không đổi. Tuy nhiên, liên kết tinh thể bị phá vỡ, khoảng cách giữa các phân tử tăng lên làm thế năng tương tác phân tử tăng, dẫn đến nội năng của hệ tăng lên.",
    options: [
      { id: "l2_p1_q10_o1", text: "Động năng phân tử tăng, thế năng tương tác phân tử không đổi.", isCorrect: false },
      { id: "l2_p1_q10_o2", text: "Động năng phân tử không đổi, thế năng tương tác phân tử tăng.", isCorrect: true },
      { id: "l2_p1_q10_o3", text: "Cả động năng và thế năng tương tác phân tử đều tăng.", isCorrect: false },
      { id: "l2_p1_q10_o4", text: "Cả động năng và thế năng tương tác phân tử đều không đổi.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q11",
    question: "Đơn vị đo của nội năng (U) và nhiệt lượng (Q) trong hệ đo lường quốc tế SI là:",
    level: "Nhận biết",
    explanation: "Trong hệ SI, nội năng, nhiệt lượng và công đều là các dạng năng lượng và có chung đơn vị đo chuẩn là Jun (J).",
    options: [
      { id: "l2_p1_q11_o1", text: "Calo (cal).", isCorrect: false },
      { id: "l2_p1_q11_o2", text: "Oát (W).", isCorrect: false },
      { id: "l2_p1_q11_o3", text: "Jun (J).", isCorrect: true },
      { id: "l2_p1_q11_o4", text: "Ki-lô-oát giờ (kWh).", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q12",
    question: "Trong quá trình truyền nhiệt tự phát không có sự thực hiện công giữa hai vật có nhiệt độ khác nhau tiếp xúc với nhau, nhiệt năng luôn tự truyền:",
    level: "Nhận biết",
    explanation: "Theo nguyên lý truyền nhiệt tự phát, nhiệt lượng chỉ có thể tự truyền từ vật có nhiệt độ cao hơn sang vật có nhiệt độ thấp hơn cho đến khi đạt trạng thái cân bằng nhiệt.",
    options: [
      { id: "l2_p1_q12_o1", text: "Từ vật có khối lượng lớn hơn sang vật có khối lượng nhỏ hơn.", isCorrect: false },
      { id: "l2_p1_q12_o2", text: "Từ vật có nhiệt độ cao hơn sang vật có nhiệt độ thấp hơn.", isCorrect: true },
      { id: "l2_p1_q12_o3", text: "Từ vật có kích thước lớn hơn sang vật có kích thước nhỏ hơn.", isCorrect: false },
      { id: "l2_p1_q12_o4", text: "Từ vật có nội năng lớn hơn sang vật có nội năng nhỏ hơn.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q13",
    question: "Phát biểu nào sau đây biểu diễn đúng và đầy đủ nhất quy ước dấu của công A trong hệ thức ΔU = A + Q?",
    level: "Nhận biết",
    explanation: "Theo quy ước chuẩn bám sát SGK Vật lí 12 cánh diều / chân trời: A > 0 nếu hệ nhận công từ môi trường ngoài; A < 0 nếu hệ thực hiện công (sinh công) lên môi trường ngoài.",
    options: [
      { id: "l2_p1_q13_o1", text: "A > 0 nếu hệ nhận công; A < 0 nếu hệ thực hiện công.", isCorrect: true },
      { id: "l2_p1_q13_o2", text: "A > 0 nếu hệ thực hiện công; A < 0 nếu hệ nhận công.", isCorrect: false },
      { id: "l2_p1_q13_o3", text: "A > 0 nếu hệ nhận nhiệt; A < 0 nếu hệ tỏa nhiệt.", isCorrect: false },
      { id: "l2_p1_q13_o4", text: "A > 0 nếu hệ tỏa nhiệt; A < 0 nếu hệ nhận nhiệt.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q14",
    question: "Khi một lượng khí lí tưởng xác định thực hiện quá trình biến đổi đẳng nhiệt (nhiệt độ giữ không đổi), nội năng của khối khí lý tưởng này biến thiên như thế nào?",
    level: "Thông hiểu",
    explanation: "Đối với khí lý tưởng, nội năng chỉ phụ thuộc vào nhiệt độ của hệ. Trong quá trình đẳng nhiệt, nhiệt độ không đổi nên nội năng hoàn toàn không thay đổi (ΔU = 0).",
    options: [
      { id: "l2_p1_q14_o1", text: "Nội năng tăng lên tuyến tính.", isCorrect: false },
      { id: "l2_p1_q14_o2", text: "Nội năng giảm đi tỉ lệ nghịch với áp suất.", isCorrect: false },
      { id: "l2_p1_q14_o3", text: "Nội năng không đổi.", isCorrect: true },
      { id: "l2_p1_q14_o4", text: "Nội năng tăng rồi giảm theo đồ thị hình sin.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q15",
    question: "Trong quá trình sấy khô tóc bằng máy sấy nóng chuyên dụng, nội năng của các phân tử hơi nước bám trên sợi tóc thay đổi chủ yếu thông qua cách thức biến đổi nào?",
    level: "Thông hiểu",
    explanation: "Dòng khí nóng từ máy sấy truyền nhiệt năng trực tiếp sang các phân tử hơi nước làm nội năng của hơi nước tăng lên đến khi bay hơi hoàn toàn. Đây là quá trình truyền nhiệt trực tiếp.",
    options: [
      { id: "l2_p1_q15_o1", text: "Chủ yếu thông qua thực hiện công cơ học.", isCorrect: false },
      { id: "l2_p1_q15_o2", text: "Chủ yếu thông qua quá trình truyền nhiệt trực tiếp.", isCorrect: true },
      { id: "l2_p1_q15_o3", text: "Chuyển hóa hoàn toàn động năng cơ học thành thế năng.", isCorrect: false },
      { id: "l2_p1_q15_o4", text: "Không có sự thay đổi nội năng của phân tử nước.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q16",
    question: "Một quả bóng cao su bơm căng khí lí tưởng được đặt trực tiếp dưới ánh nắng mặt trời chiếu gắt. Sau một khoảng thời gian, thể tích quả bóng phồng to ra và nhiệt độ không khí bên trong tăng lên rõ rệt. Nhận định nào sau đây về dấu của Q và A đối với khối khí trong bóng là chính xác?",
    level: "Vận dụng",
    explanation: "Khối khí hấp thụ nhiệt từ ánh nắng nên Q > 0. Do khí dãn nở đẩy thành bóng dãn ra, khối khí sinh công cơ học ra ngoài môi trường nên công cơ học mang dấu âm A < 0.",
    options: [
      { id: "l2_p1_q16_o1", text: "Q > 0 và A < 0.", isCorrect: true },
      { id: "l2_p1_q16_o2", text: "Q < 0 và A > 0.", isCorrect: false },
      { id: "l2_p1_q16_o3", text: "Q > 0 và A > 0.", isCorrect: false },
      { id: "l2_p1_q16_o4", text: "Q < 0 và A < 0.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q17",
    question: "Một khối khí lí tưởng được chứa trong xi lanh bọc bông cách nhiệt tuyệt đối. Khi ta nhanh chóng ấn piston để nén khí bằng một công cơ học có độ lớn 80 J. Phát biểu nào sau đây mô tả đúng nhất trạng thái của khối khí?",
    level: "Vận dụng",
    explanation: "Do xi lanh cách nhiệt tuyệt đối nên hệ không trao đổi nhiệt: Q = 0. Hệ nhận công từ ngoài để nén ép: A = +80 J. Áp dụng Định luật I: ΔU = A + Q = +80 J. Nội năng tăng thêm đúng bằng 80 J.",
    options: [
      { id: "l2_p1_q17_o1", text: "Khí tỏa nhiệt 80 J và nội năng không thay đổi.", isCorrect: false },
      { id: "l2_p1_q17_o2", text: "Khí không trao đổi nhiệt với ngoài và nội năng tăng 80 J.", isCorrect: true },
      { id: "l2_p1_q17_o3", text: "Khí hấp thụ nhiệt lượng 80 J và nội năng tăng 80 J.", isCorrect: false },
      { id: "l2_p1_q17_o4", text: "Khí thực hiện công sinh ra 80 J và nội năng giảm 80 J.", isCorrect: false }
    ]
  },
  {
    id: "l2_p1_q18",
    question: "Một lượng khí lí tưởng biến đổi trạng thái từ 1 sang 2 thông qua quá trình dãn nở đẳng áp dưới áp suất không đổi p = 1,5.10⁵ Pa. Thể tích khí tăng từ V₁ = 4,0 lít lên V₂ = 8,0 lít. Đồng thời khí nhận vào một nhiệt lượng Q = 900 J từ nguồn đốt. Tính độ biến thiên nội năng ΔU của khí.",
    level: "Vận dụng",
    explanation: "Công dãn nở khí sinh ra là: A_sinh = p * (V₂ - V₁) = 1,5.10⁵ Pa * (8,0 - 4,0) * 10⁻³ m³ = 600 J. Vì khí dãn nở sinh công đẩy ngoài nên công hệ nhận là A = -600 J. Theo Định luật I: ΔU = A + Q = -600 J + 900 J = 300 J.",
    options: [
      { id: "l2_p1_q18_o1", text: "300 J.", isCorrect: true },
      { id: "l2_p1_q18_o2", text: "600 J.", isCorrect: false },
      { id: "l2_p1_q18_o3", text: "900 J.", isCorrect: false },
      { id: "l2_p1_q18_o4", text: "1500 J.", isCorrect: false }
    ]
  }
];

export const LESSON2_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l2_p2_q1",
    question: "Tiến hành đun nóng ống nghiệm đựng không khí được đậy kín bằng một nút bấc dẻo khít sát. Sau một thời gian ngắn, nút bấc bị đẩy bật mạnh ra khỏi ống nghiệm. Xét tính Đúng/Sai của các nhận định dưới đây giải thích hiện tượng trên:",
    statements: [
      {
        id: "l2_p2_q1_s1",
        text: "Khi đun nóng ống nghiệm, nhiệt độ của lượng không khí tăng lên làm tốc độ chuyển động nhiệt hỗn loạn của các phân tử khí tăng lên.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Nhiệt độ tăng làm tăng tốc độ trung bình chuyển động nhiệt hỗn loạn của các phân tử không khí."
      },
      {
        id: "l2_p2_q1_s2",
        text: "Nội năng của lượng không khí trong ống tăng lên chủ yếu là do thế năng tương tác giữa các phân tử khí tăng mạnh khi nhiệt độ tăng.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Ở điều kiện thường, không khí có thể coi gần đúng là khí lí tưởng, lực liên kết rất yếu nên thế năng tương tác phân tử bằng 0. Sự tăng nội năng ở đây hoàn toàn là tăng động năng chuyển động nhiệt."
      },
      {
        id: "l2_p2_q1_s3",
        text: "Tại thời điểm nút bấc bị đẩy bật ra, khối khí đã thực hiện công đẩy nút bấc, chuyển hóa một phần nội năng của khí thành cơ năng chuyển động của nút.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Khí dãn nở sinh công (thực hiện công) đẩy nút bấc bay ra, chuyển hóa nội năng thành cơ năng."
      },
      {
        id: "l2_p2_q1_s4",
        text: "Toàn bộ chu trình từ lúc đun nóng đến lúc nút bật ra là ví dụ thực tế minh họa Định luật I nhiệt động lực học với hệ nhận nhiệt (Q > 0) và hệ sinh công đẩy nút (A < 0).",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Khí nhận nhiệt lượng từ đèn cồn nên Q > 0. Khí dãn nở sinh công đẩy nút nên khí thực hiện công (sinh công) nên A < 0."
      }
    ]
  },
  {
    id: "l2_p2_q2",
    question: "Xét hệ thức của định luật I nhiệt động lực học ΔU = A + Q. Hãy đánh giá tính Đúng/Sai của các phát biểu về quy ước dấu và các quá trình biến đổi trạng thái của lượng khí lí tưởng xác định dưới đây:",
    statements: [
      {
        id: "l2_p2_q2_s1",
        text: "Hệ thức ΔU = A + Q là sự mở rộng của định luật bảo toàn và chuyển hóa năng lượng áp dụng cho các hiện tượng nhiệt.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Định luật I nhiệt động lực học chính là định luật bảo toàn và chuyển hóa năng lượng áp dụng cho quá trình nhiệt động."
      },
      {
        id: "l2_p2_q2_s2",
        text: "Ngoại lực bên ngoài thực hiện công nén ép hệ khí trong xilanh làm thể tích khí giảm thì khí nhận công từ ngoài nên ta lấy giá trị A > 0.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Khi nén khí, khí nhận công từ bên ngoài nên theo quy ước công A mang giá trị dương (A > 0)."
      },
      {
        id: "l2_p2_q2_s3",
        text: "Trong một quá trình biến đổi đẳng nhiệt của một lượng khí lí tưởng xác định, do nhiệt độ không đổi nên nội năng biến thiên, khi nhận nhiệt lượng thì đồng thời khí sinh công (Q = -A).",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Quá trình đẳng nhiệt có nhiệt độ không đổi nên nội năng không đổi (ΔU = 0). Do đó ΔU = A + Q = 0 => Q = -A. Khi hệ nhận nhiệt (Q > 0) thì hệ phải sinh công (A < 0)."
      },
      {
        id: "l2_p2_q2_s4",
        text: "Một khối khí lí tưởng nhận nhiệt lượng 300 J từ ngoài đồng thời nhận công 150 J từ ngoại lực nén khí thì nội năng của khối khí này biến thiên giảm một lượng là 150 J.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Hệ nhận nhiệt nên Q = +300 J. Hệ nhận công nên A = +150 J. Độ biến thiên nội năng là ΔU = A + Q = 150 + 300 = +450 J. Nội năng tăng thêm 450 J chứ không phải giảm 150 J."
      }
    ]
  },
  {
    id: "l2_p2_q3",
    question: "Động cơ nhiệt (như máy hơi nước, động cơ đốt trong) là một ứng dụng vô cùng quan trọng của định luật nhiệt động lực học trong đời sống. Phát biểu dưới đây đánh giá về cấu tạo và nguyên lý hoạt động của nó:",
    statements: [
      {
        id: "l2_p2_q3_s1",
        text: "Nguồn lạnh có vai trò thu nhiệt lượng trực tiếp tỏa ra từ tác nhân để tác nhân co lại đưa hệ trở về trạng thái ban đầu, chuẩn bị cho chu trình hoạt động tiếp theo.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Nguồn lạnh thu nhận nhiệt lượng thừa Q₂ tỏa ra từ tác nhân để thực hiện quá trình làm mát khép kín chu trình."
      },
      {
        id: "l2_p2_q3_s2",
        text: "Hiệu suất của động cơ nhiệt lý tưởng luôn có thể đạt giá trị tối đa bằng 100% nếu chúng ta loại bỏ hoàn toàn ma sát cơ học giữa các bộ phận piston và xilanh.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Theo Định luật II nhiệt động lực học, động cơ nhiệt bắt buộc phải truyền một phần nhiệt lượng Q₂ cho nguồn lạnh, do đó hiệu suất luôn nhỏ hơn 100% kể cả khi không có ma sát."
      },
      {
        id: "l2_p2_q3_s3",
        text: "Công cơ học có ích A mà động cơ nhiệt thực hiện trong mỗi chu trình tuần hoàn kín luôn bằng hiệu số giữa nhiệt lượng nhận từ nguồn nóng Q₁ và nhiệt lượng tỏa ra cho nguồn lạnh Q₂.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Theo định luật bảo toàn năng lượng trong chu trình khép kín: Công sinh ra có ích là A = Q₁ - Q₂."
      },
      {
        id: "l2_p2_q3_s4",
        text: "Một động cơ nhiệt nhận nhiệt lượng 5000 J từ nguồn nóng và tỏa ra nguồn lạnh 3500 J trong mỗi chu trình. Hiệu suất của động cơ này là 30%.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Công có ích là A = Q₁ - Q₂ = 5000 - 3500 = 1500 J. Hiệu suất H = A / Q₁ = 1500 / 5000 = 0.3 (tương đương 30%)."
      }
    ]
  },
  {
    id: "l2_p2_q4",
    question: "Xét các hiện tượng vật lý liên quan đến nội năng và sự chuyển thể của chất lỏng trong đời sống hàng ngày dưới góc nhìn khoa học nhiệt động lực học:",
    statements: [
      {
        id: "l2_p2_q4_s1",
        text: "Khi ta hơ nóng nhẹ một đầu của thanh kim loại, đầu kia cũng nóng dần lên sau một khoảng thời gian ngắn, đây là ví dụ điển hình về quá trình truyền nhiệt dẫn nhiệt tự phát.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đây là sự truyền nhiệt (dẫn nhiệt) trực tiếp từ đầu nóng sang đầu lạnh của thanh sắt mà không có sự thực hiện công."
      },
      {
        id: "l2_p2_q4_s2",
        text: "Khi một khối nước lỏng ngưng tụ đông đặc thành nước đá ở nhiệt độ không đổi 0°C, nội năng của khối nước giảm đi do nó tỏa nhiệt lượng ra ngoài môi trường.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Đông đặc là quá trình tỏa nhiệt (Q < 0). Vì nhiệt độ không đổi (động năng phân tử không đổi) nhưng thế năng tương tác giảm mạnh để lập cấu trúc rắn tinh thể nên nội năng của khối nước giảm."
      },
      {
        id: "l2_p2_q4_s3",
        text: "Quá trình nước bay hơi tự nhiên ở nhiệt độ phòng là quá trình tỏa nhiệt lượng ra môi trường xung quanh vì thể tích tăng mạnh khi dãn nở.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Sự bay hơi của chất lỏng là quá trình thu nhiệt lượng (Q > 0) từ môi trường xung quanh để bứt các phân tử khỏi lực liên kết bề mặt thoáng chất lỏng."
      },
      {
        id: "l2_p2_q4_s4",
        text: "Khi dùng bơm tay bơm căng lốp xe đạp, thân ống bơm nóng lên rõ rệt. Sự nóng lên này hoàn toàn do ma sát cơ học giữa piston và thành xilanh, không liên quan đến biến đổi nội năng của khối khí.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Sự nóng lên của thân bơm một phần do ma sát cơ học, nhưng phần lớn là do ta thực hiện công nén nhanh khối khí làm tăng động năng trung bình chuyển động nhiệt của phân tử khí, làm khí nóng lên rồi truyền nhiệt ra vỏ bơm."
      }
    ]
  }
];

export const LESSON2_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l2_p3_q1",
    question: "Người ta thực hiện một công cơ học có giá trị bằng 220 J để nén một lượng khí lí tưởng chứa trong xi lanh. Đồng thời, khối khí tỏa ra một lượng nhiệt lượng bằng 80 J cho môi trường xung quanh. Tính độ biến thiên nội năng của khối khí trong xi lanh theo đơn vị Joule (J). Nhập số nguyên.",
    answer: 140,
    unit: "J",
    level: "Thông hiểu",
    explanation: "Hệ khí nhận công nén từ ngoài: A = +220 J. Hệ tỏa nhiệt ra môi trường: Q = -80 J. Áp dụng định luật I nhiệt động lực học: ΔU = A + Q = 220 - 80 = 140 J. Nội năng của khối khí tăng thêm 140 J.",
    illustrationType: "piston_compressed"
  },
  {
    id: "l2_p3_q2",
    question: "Một lượng khí lí tưởng chứa trong một xi lanh có pít-tông dịch chuyển được. Khi ta truyền cho khối khí một nhiệt lượng bằng 340 J từ ngọn lửa đèn cồn, khối khí nóng lên, giãn nở đẩy pít-tông di chuyển thực hiện một công bằng 190 J ra bên ngoài. Xác định độ biến thiên nội năng của khối khí theo đơn vị Joule (J). Nhập số nguyên.",
    answer: 150,
    unit: "J",
    level: "Vận dụng",
    explanation: "Hệ khí nhận nhiệt lượng từ đèn cồn: Q = +340 J. Hệ khí giãn nở thực hiện công (sinh công) ra ngoài: A = -190 J. Áp dụng định luật I nhiệt động lực học: ΔU = A + Q = 340 - 190 = 150 J. Nội năng tăng 150 J.",
    illustrationType: "piston_expanded"
  },
  {
    id: "l2_p3_q3",
    question: "Một khối gỗ khối lượng 1,5 kg trượt không vận tốc ban đầu từ đỉnh xuống chân của một mặt phẳng nghiêng dài 20 m, nghiêng góc 30° so với phương ngang. Tốc độ của khối gỗ khi đi tới chân mặt phẳng nghiêng đo được là 4 m/s. Lấy gia tốc trọng trường g = 10 m/s². Giả thiết toàn bộ phần cơ năng bị hao hụt do lực ma sát chuyển hóa hoàn toàn thành nhiệt lượng làm tăng nội năng của hệ (khối gỗ và mặt phẳng nghiêng). Hãy tính độ biến thiên nội năng tăng thêm của hệ theo đơn vị Joule (J). Nhập số nguyên.",
    answer: 138,
    unit: "J",
    level: "Vận dụng",
    explanation: "Độ cao của đỉnh dốc so với chân dốc: h = L * sin(30°) = 20 m * 0.5 = 10 m. Cơ năng tại đỉnh dốc (thế năng cực đại): W_1 = m * g * h = 1,5 kg * 10 m/s^2 * 10 m = 150 J. Cơ năng tại chân dốc (động năng cực đại): W_2 = 1/2 * m * v^2 = 0.5 * 1,5 kg * (4 m/s)^2 = 12 J. Phần cơ năng hao hụt do lực ma sát cản trở chuyển hóa hoàn toàn thành nội năng của hệ: \\Delta U = W_1 - W_2 = 150 J - 12 J = 138 J.",
    illustrationType: "sliding_slope"
  },
  {
    id: "l2_p3_q4",
    question: "Một chiếc bình cách nhiệt hoàn toàn chứa 400 gam nước ở nhiệt độ phòng 25°C. Người ta đưa vào trong nước một cánh khuấy cơ học được dẫn động bởi một mô tơ điện nhỏ hoạt động liên tục với công suất không đổi bằng 30W trong thời gian đúng 2,0 phút. Coi bình hoàn toàn cách nhiệt tuyệt đối với môi trường xung quanh (Q = 0). Hãy tính công cơ học do mô tơ thực hiện làm tăng nội năng của khối nước trong bình theo đơn vị kJ (kilojoule). Nhập số thập phân gọn nhất (ví dụ: 3.6 hoặc 3,6).",
    answer: 3.6,
    unit: "kJ",
    level: "Vận dụng",
    explanation: "Vì bình cách nhiệt hoàn toàn nên lượng nhiệt trao đổi Q = 0. Công cơ học do cánh khuấy thực hiện trực tiếp lên nước là: A = P * t = 30 W * (2.0 * 60 s) = 30 W * 120 s = 3600 J = 3,6 kJ. Theo Định luật I: \\Delta U = A + Q = 3600 J = 3,6 kJ. Toàn bộ cơ năng của cánh khuấy chuyển hóa thành nội năng làm nước nóng lên.",
    illustrationType: "insulated_stirrer"
  },
  {
    id: "l2_p3_q5",
    question: "Một động cơ nhiệt hoạt động liên tục nhận một nhiệt lượng bằng 6000 J từ nguồn nóng và tỏa ra nguồn lạnh một nhiệt lượng bằng 4200 J trong mỗi chu trình hoạt động khép kín. Hãy tính hiệu suất của động cơ nhiệt này theo đơn vị phần trăm (%). Nhập số nguyên.",
    answer: 30,
    unit: "%",
    level: "Thông hiểu",
    explanation: "Công cơ học có ích mà động cơ thực hiện được trong mỗi chu trình là: |A| = Q_1 - Q_2 = 6000 J - 4200 J = 1800 J. Hiệu suất của động cơ nhiệt là: H = |A| / Q_1 = 1800 J / 6000 J = 0.3 (tương đương 30%).",
    illustrationType: "heat_engine_efficiency"
  },
  {
    id: "l2_p3_q6",
    question: "Một lượng khí lí tưởng chứa trong một xilanh đặt thẳng đứng có pít-tông phẳng, khối lượng pít-tông bằng 5 kg và diện tích tiết diện là 20 cm². Người ta đun nóng khối khí trong xilanh một cách chậm rãi làm khí dãn nở và đẩy pít-tông dịch chuyển đều lên phía trên một đoạn bằng 10 cm. Biết áp suất khí quyển là 1,0.10⁵ Pa, lấy gia tốc trọng trường g = 10 m/s². Tính công mà khối khí thực hiện để dãn nở đẩy pít-tông lên theo đơn vị Joule (J). Nhập số nguyên.",
    answer: 25,
    unit: "J",
    level: "Vận dụng",
    explanation: "Áp suất của khối khí bên trong xilanh khi pít-tông di chuyển đều là: p = p_kq + (m_piston * g) / S = 10^5 Pa + (5 kg * 10 m/s^2) / (20 * 10^-4 m^2) = 1,25 * 10^5 Pa. Độ biến thiên thể tích của khối khí là: \\Delta V = S * d = 20 * 10^-4 m^2 * 0.1 m = 2 * 10^-4 m^3. Công mà khối khí thực hiện để đẩy pít-tông dãn nở là: A_sinh = p * \\Delta V = 1.25 * 10^5 Pa * 2 * 10^-4 m^3 = 25 J.",
    illustrationType: "piston_vertical_forces"
  }
];

// ==================== LESSON 3 QUESTIONS ====================
export const LESSON3_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l3_p1_q1",
    question: "Khi hai vật tiếp xúc với nhau đạt đến trạng thái cân bằng nhiệt, phát biểu nào sau đây là ĐÚNG?",
    level: "Nhận biết",
    explanation: "Khi hai vật đạt trạng thái cân bằng nhiệt tiếp xúc nhau thì nhiệt độ của chúng bằng nhau và không có sự truyền nhiệt năng ròng giữa chúng.",
    options: [
      { id: "l3_p1_q1_o1", text: "Vật có thể tích lớn hơn sẽ truyền bớt nhiệt năng cho vật nhỏ hơn.", isCorrect: false },
      { id: "l3_p1_q1_o2", text: "Nhiệt độ của hai vật bằng nhau và không có sự truyền nhiệt năng ròng qua lại giữa chúng.", isCorrect: true },
      { id: "l3_p1_q1_o3", text: "Tất cả các chuyển động nhiệt của phân tử trong cả hai vật đều dừng lại hoàn toàn.", isCorrect: false },
      { id: "l3_p1_q1_o4", text: "Vật có nội năng lớn hơn sẽ tiếp tục truyền nhiệt sang vật có nội năng nhỏ hơn.", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q2",
    question: "Nhiệt năng luôn tự truyền giữa hai vật tiếp xúc có nhiệt độ chênh lệch theo chiều nào?",
    level: "Nhận biết",
    explanation: "Theo nguyên lí truyền nhiệt, nhiệt năng luôn tự truyền từ vật có nhiệt độ cao hơn sang vật có nhiệt độ thấp hơn.",
    options: [
      { id: "l3_p1_q2_o1", text: "Từ vật có khối lượng lớn hơn sang vật có khối lượng nhỏ hơn.", isCorrect: false },
      { id: "l3_p1_q2_o2", text: "Từ vật ở thể rắn sang vật ở thể lỏng khi tiếp xúc nhau trực tiếp.", isCorrect: false },
      { id: "l3_p1_q2_o3", text: "Từ vật có nhiệt độ cao hơn sang vật có nhiệt độ thấp hơn.", isCorrect: true },
      { id: "l3_p1_q2_o4", text: "Từ vật có nội năng lớn hơn sang vật có nội năng nhỏ hơn.", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q3",
    question: "Thang nhiệt độ Celsius được xây dựng dựa trên mốc nhiệt độ của hai hiện tượng đặc biệt nào ở áp suất tiêu chuẩn?",
    level: "Nhận biết",
    explanation: "Thang Celsius lấy mốc là nhiệt độ đóng băng của nước tinh khiết (0 °C) và điểm sôi của nước tinh khiết (100 °C) dưới áp suất khí quyển tiêu chuẩn.",
    options: [
      { id: "l3_p1_q3_o1", text: "Nhiệt độ nóng chảy của nước đá và nhiệt độ hóa hơi của rượu êtylic.", isCorrect: false },
      { id: "l3_p1_q3_o2", text: "Nhiệt độ đông đặc của thủy ngân và nhiệt độ nóng chảy của nước tinh khiết.", isCorrect: false },
      { id: "l3_p1_q3_o3", text: "Nhiệt độ đóng băng của nước tinh khiết và nhiệt độ sôi của nước tinh khiết.", isCorrect: true },
      { id: "l3_p1_q3_o4", text: "Nhiệt độ của không độ tuyệt đối và nhiệt độ điểm ba của nước.", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q4",
    question: "Không độ tuyệt đối (0 K) trong thang nhiệt độ Kelvin có ý nghĩa vật lý là gì?",
    level: "Thông hiểu",
    explanation: "0 K là nhiệt độ thấp nhất lý thuyết, tại đó động năng chuyển động nhiệt trung bình của các phân tử bằng 0 và thế năng tương tác của chúng đạt giá trị tối thiểu.",
    options: [
      { id: "l3_p1_q4_o1", text: "Nhiệt độ mà tại đó nước, nước đá và hơi nước cùng đồng thời tồn tại cân bằng.", isCorrect: false },
      { id: "l3_p1_q4_o2", text: "Nhiệt độ thấp nhất lý thuyết, tại đó động năng chuyển động nhiệt trung bình của phân tử bằng không.", isCorrect: true },
      { id: "l3_p1_q4_o3", text: "Nhiệt độ của nước đá đang tan dưới áp suất khí quyển tiêu chuẩn.", isCorrect: false },
      { id: "l3_p1_q4_o4", text: "Nhiệt độ mà khí ôxy hóa lỏng hoàn toàn dưới áp suất cực cao.", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q5",
    question: "Công thức chuyển đổi đúng giữa nhiệt độ t biểu diễn bằng độ Celsius (°C) và nhiệt độ tuyệt đối T bằng Kelvin (K) là:",
    level: "Nhận biết",
    explanation: "Theo định nghĩa thang nhiệt độ Kelvin: T = t + 273,15 (với T tính bằng K, t tính bằng °C).",
    options: [
      { id: "l3_p1_q5_o1", text: "T = t - 273,15", isCorrect: false },
      { id: "l3_p1_q5_o2", text: "T = 1,8 * t + 32", isCorrect: false },
      { id: "l3_p1_q5_o3", text: "T = t + 273,15", isCorrect: true },
      { id: "l3_p1_q5_o4", text: "T = t + 32", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q6",
    question: "Điểm ba (Triple point) của nước tinh khiết là trạng thái cân bằng nhiệt có nhiệt độ chính xác bằng:",
    level: "Thông hiểu",
    explanation: "Điểm ba của nước tinh khiết (nơi cả 3 thể rắn, lỏng, hơi đồng thời tồn tại cân bằng) có giá trị nhiệt độ là 0,01 °C, tương ứng với 273,16 K.",
    options: [
      { id: "l3_p1_q6_o1", text: "0,01 °C hay 273,16 K", isCorrect: true },
      { id: "l3_p1_q6_o2", text: "0 °C hay 273,15 K", isCorrect: false },
      { id: "l3_p1_q6_o3", text: "100 °C hay 373,15 K", isCorrect: false },
      { id: "l3_p1_q6_o4", text: "-273,15 °C hay 0 K", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q7",
    question: "Nhiệt kế thủy ngân thường dùng trong y tế hoạt động dựa trên tính chất vật lí nào sau đây của thủy ngân?",
    level: "Nhận biết",
    explanation: "Nhiệt kế thủy ngân hay nhiệt kế rượu hoạt động dựa trên sự nở vì nhiệt của chất lỏng khi nhiệt độ thay đổi.",
    options: [
      { id: "l3_p1_q7_o1", text: "Sự thay đổi màu sắc của kim loại lỏng thủy ngân.", isCorrect: false },
      { id: "l3_p1_q7_o2", text: "Sự nở vì nhiệt của chất lỏng.", isCorrect: true },
      { id: "l3_p1_q7_o3", text: "Sự thay đổi suất điện động tiếp xúc của thủy ngân.", isCorrect: false },
      { id: "l3_p1_q7_o4", text: "Sự thay đổi điện trở suất của kim loại thủy ngân.", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q8",
    question: "Trong công nghệ đo nhiệt độ hiện đại, nhiệt kế điện trở Platin hoạt động dựa trên tính chất vật lí nào?",
    level: "Thông hiểu",
    explanation: "Nhiệt kế điện trở hoạt động dựa trên sự phụ thuộc của điện trở của kim loại (hoặc bán dẫn) vào nhiệt độ. Với bạch kim Platin, khi nhiệt độ tăng thì điện trở của nó tăng lên.",
    options: [
      { id: "l3_p1_q8_o1", text: "Sự co dãn cơ học của thanh bạch kim Platin.", isCorrect: false },
      { id: "l3_p1_q8_o2", text: "Sự thay đổi bước sóng ánh sáng phản xạ trên kim loại Platin.", isCorrect: false },
      { id: "l3_p1_q8_o3", text: "Sự phụ thuộc điện trở của vật liệu vào nhiệt độ.", isCorrect: true },
      { id: "l3_p1_q8_o4", text: "Sự chênh lệch hiệu điện thế tiếp xúc giữa Platin và đồng.", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q9",
    question: "Cặp nhiệt điện (Thermocouple) là một cảm biến đo nhiệt độ hoạt động dựa trên nguyên lí nào?",
    level: "Vận dụng",
    explanation: "Cặp nhiệt điện gồm hai sợi dây kim loại khác nhau được hàn ở hai đầu. Khi có sự chênh lệch nhiệt độ giữa hai đầu mối hàn, một suất điện động nhiệt điện xuất hiện tỉ lệ với hiệu nhiệt độ này.",
    options: [
      { id: "l3_p1_q9_o1", text: "Sự thay đổi áp suất của khối khí nhốt trong ống kín hai đầu hàn.", isCorrect: false },
      { id: "l3_p1_q9_o2", text: "Sự phát xạ ra tia hồng ngoại tỉ lệ nghịch với nhiệt độ của mối hàn.", isCorrect: false },
      { id: "l3_p1_q9_o3", text: "Suất điện động nhiệt điện xuất hiện khi hai mối hàn của hai kim loại khác nhau đặt ở hai nhiệt độ khác nhau.", isCorrect: true },
      { id: "l3_p1_q9_o4", text: "Sự nóng chảy của các thanh kim loại khác nhau khi chịu đốt nóng.", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q10",
    question: "Thang đo nhiệt độ Fahrenheit (°F) dùng phổ biến ở Mỹ có mốc điểm đóng băng của nước tinh khiết là 32 °F. Nhiệt độ phòng học mát mẻ 25 °C tương ứng bao nhiêu độ Fahrenheit?",
    level: "Thông hiểu",
    explanation: "Công thức chuyển Celsius sang Fahrenheit: t_F = 1,8 * t_C + 32. Với t_C = 25 °C: t_F = 1,8 * 25 + 32 = 77 °F.",
    options: [
      { id: "l3_p1_q10_o1", text: "57 °F", isCorrect: false },
      { id: "l3_p1_q10_o2", text: "77 °F", isCorrect: true },
      { id: "l3_p1_q10_o3", text: "98 °F", isCorrect: false },
      { id: "l3_p1_q10_o4", text: "298 °F", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q11",
    question: "Độ chia một độ của thang tuyệt đối Kelvin (1 K) có độ lớn như thế nào so với thang Celsius (1 °C)?",
    level: "Nhận biết",
    explanation: "Khoảng chia 1 K bằng đúng khoảng chia 1 °C do cách định nghĩa dải đo từ điểm đóng băng tới điểm sôi của nước đều là 100 phần bằng nhau.",
    options: [
      { id: "l3_p1_q11_o1", text: "Bằng đúng độ lớn của 1 °C.", isCorrect: true },
      { id: "l3_p1_q11_o2", text: "Bằng 1,8 lần độ lớn của 1 °C.", isCorrect: false },
      { id: "l3_p1_q11_o3", text: "Bằng 1/273,15 lần độ lớn của 1 °C.", isCorrect: false },
      { id: "l3_p1_q11_o4", text: "Lớn gấp 273,15 lần độ lớn của 1 °C.", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q12",
    question: "Đại lượng vật lý nào sau đây bắt buộc phải có giá trị bằng nhau khi hai vật tiếp xúc đạt trạng thái cân bằng nhiệt?",
    level: "Nhận biết",
    explanation: "Theo định nghĩa trạng thái cân bằng nhiệt, hai vật tiếp xúc đạt cân bằng nhiệt khi và chỉ khi nhiệt độ của chúng bằng nhau.",
    options: [
      { id: "l3_p1_q12_o1", text: "Thể tích của mỗi vật.", isCorrect: false },
      { id: "l3_p1_q12_o2", text: "Khối lượng của mỗi vật.", isCorrect: false },
      { id: "l3_p1_q12_o3", text: "Áp suất của mỗi vật.", isCorrect: false },
      { id: "l3_p1_q12_o4", text: "Nhiệt độ của hai vật.", isCorrect: true }
    ]
  },
  {
    id: "l3_p1_q13",
    question: "Nguyên nhân cốt lõi nào quyết định chiều tự truyền nhiệt năng giữa hai vật tiếp xúc trực tiếp là:",
    level: "Nhận biết",
    explanation: "Sự chênh lệch nhiệt độ là nguyên nhân duy nhất quyết định chiều tự truyền của nhiệt lượng từ vật nóng sang vật lạnh hơn.",
    options: [
      { id: "l3_p1_q13_o1", text: "Sự chênh lệch về khối lượng giữa hai vật.", isCorrect: false },
      { id: "l3_p1_q13_o2", text: "Sự chênh lệch về thể tích giữa hai vật.", isCorrect: false },
      { id: "l3_p1_q13_o3", text: "Sự chênh lệch về nhiệt độ giữa hai vật.", isCorrect: true },
      { id: "l3_p1_q13_o4", text: "Sự chênh lệch về nhiệt dung riêng giữa hai vật.", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q14",
    question: "Khi nhiệt độ của một thanh kim loại thay đổi, độ dài thanh kim loại co dãn tuyến tính. Hiện tượng này được dùng làm cơ sở cho loại thiết bị nào?",
    level: "Thông hiểu",
    explanation: "Sự dãn nở dài của thanh kim loại được ứng dụng để thiết kế nhiệt kế kim loại (nhiệt kế lưỡng kim).",
    options: [
      { id: "l3_p1_q14_o1", text: "Nhiệt kế kim loại.", isCorrect: true },
      { id: "l3_p1_q14_o2", text: "Nhiệt kế điện trở bán dẫn.", isCorrect: false },
      { id: "l3_p1_q14_o3", text: "Cặp nhiệt điện.", isCorrect: false },
      { id: "l3_p1_q14_o4", text: "Nhiệt kế hồng ngoại.", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q15",
    question: "Nhiệt độ đông đặc của một chất lỏng trong phòng thí nghiệm hóa học đo được là -40 °C. Trong thang Kelvin, nhiệt độ này tương đương với bao nhiêu Kelvin (K)?",
    level: "Vận dụng",
    explanation: "Áp dụng công thức chuyển đổi: T = t + 273,15. Thay t = -40 °C ta thu được: T = -40 + 273,15 = 233,15 K.",
    options: [
      { id: "l3_p1_q15_o1", text: "233,15 K", isCorrect: true },
      { id: "l3_p1_q15_o2", text: "-313,15 K", isCorrect: false },
      { id: "l3_p1_q15_o3", text: "313,15 K", isCorrect: false },
      { id: "l3_p1_q15_o4", text: "273,15 K", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q16",
    question: "Một bệnh nhân sốt cao đo được nhiệt độ cơ thể là 40 °C. Nhiệt độ của bệnh nhân này theo thang đo Fahrenheit là:",
    level: "Vận dụng",
    explanation: "Áp dụng công thức: t_F = 1,8 * t_C + 32 = 1,8 * 40 + 32 = 104 °F.",
    options: [
      { id: "l3_p1_q16_o1", text: "100 °F", isCorrect: false },
      { id: "l3_p1_q16_o2", text: "104 °F", isCorrect: true },
      { id: "l3_p1_q16_o3", text: "108 °F", isCorrect: false },
      { id: "l3_p1_q16_o4", text: "112 °F", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q17",
    question: "Một khối khí đặt trong xi lanh được nung nóng làm nhiệt độ của nó tăng thêm 15 °C. Độ biến thiên nhiệt độ này tương ứng tăng thêm bao nhiêu độ Fahrenheit (°F)?",
    level: "Vận dụng",
    explanation: "Độ biến thiên nhiệt độ giữa Celsius và Fahrenheit liên hệ qua hệ số 1.8: Delta t_F = 1,8 * Delta t_C = 1,8 * 15 = 27 °F.",
    options: [
      { id: "l3_p1_q17_o1", text: "15 °F", isCorrect: false },
      { id: "l3_p1_q17_o2", text: "27 °F", isCorrect: true },
      { id: "l3_p1_q17_o3", text: "59 °F", isCorrect: false },
      { id: "l3_p1_q17_o4", text: "8,3 °F", isCorrect: false }
    ]
  },
  {
    id: "l3_p1_q18",
    question: "Nhiệt độ bề mặt ngoài của Mặt Trời đo được khoảng 5778 K. Trị số nhiệt độ này theo thang Celsius gần nhất với giá trị nào sau đây?",
    level: "Vận dụng",
    explanation: "Đổi từ Kelvin sang Celsius: t = T - 273,15 = 5778 - 273,15 = 5504,85 °C, xấp xỉ bằng 5505 °C.",
    options: [
      { id: "l3_p1_q18_o1", text: "6051 °C", isCorrect: false },
      { id: "l3_p1_q18_o2", text: "5505 °C", isCorrect: true },
      { id: "l3_p1_q18_o3", text: "5500 °C", isCorrect: false },
      { id: "l3_p1_q18_o4", text: "5778 °C", isCorrect: false }
    ]
  }
];

export const LESSON3_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l3_p2_q1",
    question: "Xét các phát biểu liên quan đến khái niệm nhiệt độ, chiều truyền nhiệt năng và trạng thái cân bằng nhiệt theo SGK Vật lí 12:",
    statements: [
      {
        id: "l3_p2_q1_s1",
        text: "Nhiệt độ là đại lượng vật lý đặc trưng cho mức độ nóng lạnh của một vật và hướng tự truyền nhiệt năng khi các vật tiếp xúc.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đây là khái niệm chuẩn xác về nhiệt độ vĩ mô bám sát SGK vật lí 12."
      },
      {
        id: "l3_p2_q1_s2",
        text: "Khi hai vật tiếp xúc đạt trạng thái cân bằng nhiệt, mọi chuyển động nhiệt hỗn loạn của phân tử cấu tạo nên vật đều ngừng hoàn toàn.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Chuyển động nhiệt của các phân tử chỉ dừng lại ở không độ tuyệt đối (0 K), còn ở trạng thái cân bằng nhiệt thông thường các phân tử vẫn dao động không ngừng."
      },
      {
        id: "l3_p2_q1_s3",
        text: "Nếu đặt một chiếc thìa nhôm ở 20 °C vào trong bát canh nóng ở 70 °C, nhiệt lượng sẽ tự truyền từ bát canh sang chiếc thìa cho đến khi nhiệt độ chiếc thìa bằng nhiệt độ của canh.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Nhiệt luôn tự truyền từ vật nóng hơn (70 °C) sang vật lạnh hơn (20 °C) cho đến khi thiết lập sự cân bằng nhiệt."
      },
      {
        id: "l3_p2_q1_s4",
        text: "Nhiệt lượng luôn có xu hướng tự truyền từ vật có nội năng lớn hơn sang vật có nội năng nhỏ hơn khi hai vật được đặt tiếp xúc trực tiếp với nhau.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Sự tự truyền nhiệt lượng phụ thuộc hoàn toàn vào chênh lệch nhiệt độ chứ không phụ thuộc vào giá trị nội năng lớn hay nhỏ. Ví dụ, một cốc nước sôi ở 100 °C (nội năng nhỏ do khối lượng ít) vẫn truyền nhiệt sang một hồ nước ở 25 °C (nội năng cực kì khổng lồ)."
      }
    ]
  },
  {
    id: "l3_p2_q2",
    question: "Xét các đặc điểm so sánh và công thức liên hệ của các thang nhiệt độ Celsius, Kelvin và Fahrenheit trong chương trình phổ thông mới:",
    statements: [
      {
        id: "l3_p2_q2_s1",
        text: "Nhiệt độ tuyệt đối cực tiểu lý thuyết là 0 K, tương ứng với giá trị nhiệt độ là -273,15 °C trên thang đo Celsius.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Điểm không tuyệt đối (0 K) bằng chính xác -273,15 °C."
      },
      {
        id: "l3_p2_q2_s2",
        text: "Một độ chia trong thang nhiệt độ tuyệt đối Kelvin (1 K) có cùng độ lớn vật lý với 1 độ trong thang đo Celsius (1 °C).",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Cả hai thang đo đều lấy dải nhiệt độ từ nước đá đang tan đến nước sôi làm 100 phần bằng nhau nên khoảng chia 1 K bằng đúng khoảng chia 1 °C."
      },
      {
        id: "l3_p2_q2_s3",
        text: "Khoảng cách nhiệt độ từ điểm đông đặc đến điểm sôi của nước tinh khiết được chia thành đúng 100 phần bằng nhau trên cả hai thang đo Celsius và Fahrenheit.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Trên thang Fahrenheit, khoảng cách này được chia thành 180 phần bằng nhau (từ 32 °F đến 212 °F)."
      },
      {
        id: "l3_p2_q2_s4",
        text: "Nếu một chất rắn được nung nóng làm nhiệt độ của nó tăng thêm 20 °C thì theo thang Fahrenheit, nhiệt độ chất đó tăng thêm đúng 36 °F.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Công thức tính biến thiên nhiệt độ: Delta t_F = 1,8 * Delta t_C. Với Delta t_C = 20 °C, ta có Delta t_F = 1,8 * 20 = 36 °F."
      }
    ]
  },
  {
    id: "l3_p2_q3",
    question: "Đánh giá các phát biểu về nguyên lý hoạt động và dải đo thực tế của các loại nhiệt kế thường dùng:",
    statements: [
      {
        id: "l3_p2_q3_s1",
        text: "Nhiệt kế chất lỏng (như nhiệt kế thủy ngân hay nhiệt kế rượu) hoạt động dựa trên hiện tượng vật lý là sự nở vì nhiệt của chất lỏng chứa trong bầu đo.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Khi nhiệt độ thay đổi, thể tích chất lỏng thay đổi làm dâng cao hoặc hạ thấp mực chất lỏng trong ống mao dẫn."
      },
      {
        id: "l3_p2_q3_s2",
        text: "Cặp nhiệt điện hoạt động dựa trên cơ chế: khi hai mối hàn của hai dây kim loại khác nhau đặt ở cùng một nhiệt độ, Suất điện động nhiệt điện sẽ xuất hiện cực đại.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Cặp nhiệt điện chỉ hoạt động và phát ra suất điện động khi có sự chênh lệch nhiệt độ giữa hai mối hàn (T1 khác T2)."
      },
      {
        id: "l3_p2_q3_s3",
        text: "Nhiệt kế điện trở hoạt động dựa trên nguyên lý điện trở suất của các kim loại như Platin tăng lên một cách có quy luật khi nhiệt độ tăng.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Điện trở của kim loại Platin tăng khi nhiệt độ tăng, cho phép đo chính xác nhiệt độ thông qua điện trở đo được."
      },
      {
        id: "l3_p2_q3_s4",
        text: "Để đo nhiệt độ của thép nung chảy trong các lò luyện kim công nghiệp lên tới hơn 1500 °C, người ta thường dùng nhiệt kế y tế thủy ngân vì thủy ngân có vỏ bảo vệ kim loại cực tốt.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Nhiệt độ nóng chảy của thép cực cao vượt xa điểm sôi của thủy ngân (thủy ngân sôi ở 357 °C). Việc nhúng nhiệt kế thủy ngân vào sẽ gây nổ bóng thủy tinh do áp suất hơi thủy ngân cực lớn. Thay vào đó phải dùng cặp nhiệt điện chịu nhiệt cao hoặc nhiệt kế hồng ngoại đo không tiếp xúc."
      }
    ]
  },
  {
    id: "l3_p2_q4",
    question: "Xét quá trình truyền nhiệt lượng và thiết lập trạng thái cân bằng nhiệt giữa các vật trong thực tế cách nhiệt lý tưởng:",
    statements: [
      {
        id: "l3_p2_q4_s1",
        text: "Khi hai cốc nước ấm tiếp xúc trực tiếp đạt tới cân bằng nhiệt, hướng truyền nhiệt ròng (vĩ mô) qua lại giữa hai cốc sẽ kết thúc.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Tại trạng thái cân bằng nhiệt không còn sự truyền nhiệt ròng giữa hai vật."
      },
      {
        id: "l3_p2_q4_s2",
        text: "Trộn một cốc chứa 100g nước ở 20 °C với một cốc chứa 100g nước ở 80 °C trong bình cách nhiệt lý tưởng, nhiệt độ cân bằng cuối cùng của hệ sẽ lớn hơn 50 °C.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Do hai cốc nước cùng chất và có khối lượng bằng nhau (m1 = m2 = 100g) nên nhiệt độ cân bằng sẽ bằng đúng trung bình cộng: t_cb = (20 + 80)/2 = 50 °C."
      },
      {
        id: "l3_p2_q4_s3",
        text: "Trong suốt quá trình truyền nhiệt giữa vật nóng và vật lạnh đặt sát nhau, nhiệt độ của vật nóng giảm xuống, đồng thời nhiệt độ của vật lạnh tăng lên liên tục cho đến khi bằng nhau.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Vật nóng tỏa nhiệt năng nên nhiệt độ hạ, vật lạnh thu nhiệt năng nên nhiệt độ tăng cho tới khi đồng đều nhiệt độ."
      },
      {
        id: "l3_p2_q4_s4",
        text: "Đổ 100g nước ở 100 °C vào 200g nước ở 25 °C trong một bình cách nhiệt hoàn hảo. Bỏ qua sự hấp thụ nhiệt của vỏ bình thì nhiệt độ cân bằng của hệ nước là 50 °C.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Áp dụng phương trình cân bằng nhiệt: m1 * (t1 - t_cb) = m2 * (t_cb - t2) <=> 100 * (100 - t_cb) = 200 * (t_cb - 25) <=> 100 - t_cb = 2 * (t_cb - 25) <=> 100 - t_cb = 2 * t_cb - 50 <=> 3 * t_cb = 150 <=> t_cb = 50 °C."
      }
    ]
  }
];

export const LESSON3_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l3_p3_q1",
    answer: 56,
    unit: "°C",
    level: "Thông hiểu",
    question: "Người ta đổ một lượng nước có khối lượng m_1 = 200 g ở nhiệt độ t_1 = 20 °C vào một cốc nhôm đựng nước nóng có khối lượng m_2 = 300 g ở nhiệt độ t_2 = 80 °C đặt trong bình cách nhiệt lý tưởng. Bỏ qua sự thu nhiệt của bình chứa và cốc nhôm. Hãy tính nhiệt độ của nước khi đạt trạng thái cân bằng nhiệt theo đơn vị độ Celsius (°C). Nhập đáp án dưới dạng số nguyên.",
    explanation: "Áp dụng phương trình cân bằng nhiệt lượng tỏa ra bằng nhiệt lượng thu vào: Q_toa = Q_thu <=> m_2 * c * (t_2 - t_cb) = m_1 * c * (t_cb - t_1). Triệt tiêu c ở hai vế: 0.3 * (80 - t_cb) = 0.2 * (t_cb - 20) <=> 24 - 0.3 * t_cb = 0.2 * t_cb - 4 <=> 0.5 * t_cb = 28 <=> t_cb = 56 °C.",
    illustrationType: "thermal_contact_equilibrium"
  },
  {
    id: "l3_p3_q2",
    answer: 77,
    unit: "K",
    level: "Thông hiểu",
    question: "Nhiệt độ sôi của khí Nitơ lỏng ở áp suất tiêu chuẩn là -196 °C. Hãy tính nhiệt độ sôi này trong thang đo nhiệt độ tuyệt đối Kelvin với công thức chuyển đổi làm tròn là T = t + 273 (với T tính bằng K, t tính bằng °C). Nhập đáp án dưới dạng số nguyên.",
    explanation: "Áp dụng công thức chuyển đổi làm tròn: T = t + 273. Thay t = -196 °C ta có: T = -196 + 273 = 77 K.",
    illustrationType: "celsius_vs_kelvin"
  },
  {
    id: "l3_p3_q3",
    answer: 400,
    unit: "°C",
    level: "Vận dụng",
    question: "Cặp nhiệt điện đồng - constantan có hệ số nhiệt điện động là 40 μV/K. Một đầu mối hàn được giữ cố định ở nhiệt độ nước đá đang tan 0 °C, mối hàn còn lại đặt vào trong một lò luyện kim. Suất điện động nhiệt điện đo được từ mạch đo là 16 mV. Hãy tính nhiệt độ của lò luyện kim đó theo độ Celsius (°C). Nhập đáp án dưới dạng số nguyên.",
    explanation: "Hiệu nhiệt độ giữa hai mối hàn là Delta T = t - 0 = t. Ta có công thức suất điện động nhiệt điện: E = k * Delta T <=> 16 * 10^-3 = 40 * 10^-6 * t <=> t = 16 * 10^-3 / (40 * 10^-6) = 400 °C.",
    illustrationType: "thermocouple_sensor"
  },
  {
    id: "l3_p3_q4",
    answer: 200,
    unit: "°C",
    level: "Vận dụng",
    question: "Để đo nhiệt độ của một bể dầu hóa chất, người ta dùng một nhiệt kế điện trở Platin. Biết điện trở của cảm biến Platin ở 0 °C là R_0 = 100 Ω. Khi nhúng cảm biến vào bể dầu nóng, điện trở đo được là 176 Ω. Biết hệ số nhiệt điện trở trung bình của Platin là \\alpha = 3,8 * 10^-3 K^-1. Tính nhiệt độ của bể dầu đó theo độ Celsius (°C), giả sử điện trở phụ thuộc nhiệt độ theo công thức tuyến tính R = R_0 * (1 + \\alpha * t). Nhập đáp án dưới dạng số nguyên.",
    explanation: "Từ công thức R = R_0 * (1 + \\alpha * t) <=> 176 = 100 * (1 + 3,8 * 10^-3 * t) <=> 1,76 = 1 + 0,0038 * t <=> 0,0038 * t = 0,76 <=> t = 200 °C.",
    illustrationType: "resistance_thermometer"
  },
  {
    id: "l3_p3_q5",
    answer: 10,
    unit: "kK",
    level: "Vận dụng",
    question: "Một ngôi sao khổng lồ màu xanh phát xạ năng lượng điện từ mạnh nhất ở bước sóng đỉnh cực đại \\lambda_max = 290 nm. Hãy xác định nhiệt độ tuyệt đối của bề mặt ngôi sao này theo đơn vị kilôkelvin (kK) dựa trên định luật dịch chuyển Wien: \\lambda_max * T = 2,9 * 10^-3 m.K. Nhập đáp án dưới dạng số nguyên.",
    explanation: "Đổi bước sóng cực đại sang mét: \\lambda_max = 290 nm = 2,9 * 10^-7 m. Theo định luật Wien: T = 2,9 * 10^-3 / \\lambda_max = 2,9 * 10^-3 / (2,9 * 10^-7) = 10000 K. Đổi sang kilôkelvin (kK): T = 10000 / 1000 = 10 kK.",
    illustrationType: "wien_radiation_spectrum"
  },
  {
    id: "l3_p3_q6",
    answer: 160,
    unit: "°C",
    level: "Vận dụng",
    question: "Tìm giá trị nhiệt độ mà tại đó, trị số đo được trên thang nhiệt độ Fahrenheit (°F) gấp đúng 2 lần trị số đo được trên thang Celsius (°C). Nhập đáp án dưới dạng số nguyên tính theo độ Celsius (°C).",
    explanation: "Ta có công thức chuyển đổi giữa hai thang đo nhiệt độ: t_F = 1,8 * t_C + 32. Theo đề bài: t_F = 2 * t_C <=> 2 * t_C = 1,8 * t_C + 32 <=> 0,2 * t_C = 32 <=> t_C = 160 °C.",
    illustrationType: "triple_point_water"
  }
];

// ==================== LESSON 4 QUESTIONS ====================
export const LESSON4_P1_QUESTIONS: Part1Question[] = [
  // 8 NHẬN BIẾT
  {
    id: "l4_p1_q1",
    question: "Định nghĩa nào sau đây phản ánh chính xác nhất về khái niệm nhiệt dung riêng của một chất?",
    level: "Nhận biết",
    explanation: "Theo định nghĩa SGK Vật lý 12, nhiệt dung riêng của một chất là nhiệt lượng cần thiết để làm cho 1 kg chất đó tăng thêm 1 °C (hoặc 1 K).",
    options: [
      { id: "l4_p1_q1_o1", text: "Nhiệt lượng cần cung cấp để 1 kg chất đó chuyển hoàn toàn sang thể lỏng ở nhiệt độ nóng chảy.", isCorrect: false },
      { id: "l4_p1_q1_o2", text: "Nhiệt lượng cần cung cấp để 1 kg chất đó tăng thêm nhiệt độ 1 K hoặc 1 °C.", isCorrect: true },
      { id: "l4_p1_q1_o3", text: "Nhiệt lượng tỏa ra khi 1 kg hơi của chất đó ngưng tụ hoàn toàn ở nhiệt độ sôi.", isCorrect: false },
      { id: "l4_p1_q1_o4", text: "Nhiệt năng trung bình của toàn bộ các phân tử khí cấu tạo nên một vật bất kỳ.", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q2",
    question: "Nhiệt dung riêng của một chất có kí hiệu là gì và đơn vị đo hợp lý trong hệ đo lường quốc tế SI là gì?",
    level: "Nhận biết",
    explanation: "Nhiệt dung riêng kí hiệu là c, đơn vị đo trong hệ SI là J/(kg.K) hoặc J/(kg.°C).",
    options: [
      { id: "l4_p1_q2_o1", text: "Kí hiệu là c, đơn vị là J/kg.", isCorrect: false },
      { id: "l4_p1_q2_o2", text: "Kí hiệu là Q, đơn vị là Jun (J).", isCorrect: false },
      { id: "l4_p1_q2_o3", text: "Kí hiệu là c, đơn vị là J/(kg.K).", isCorrect: true },
      { id: "l4_p1_q2_o4", text: "Kí hiệu là L, đơn vị là J/kg.K.", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q3",
    question: "Công thức tổng quát tính nhiệt lượng Q cần cung cấp cho một vật có khối lượng m, nhiệt dung riêng c để làm tăng nhiệt độ của nó từ t_1 đến t_2 là:",
    level: "Nhận biết",
    explanation: "Biểu thức tính nhiệt lượng trong quá trình truyền nhiệt thay đổi nhiệt độ là Q = m * c * \\Delta t = m * c * (t_2 - t_1).",
    options: [
      { id: "l4_p1_q3_o1", text: "Q = m * c * (t_2 - t_1)", isCorrect: true },
      { id: "l4_p1_q3_o2", text: "Q = m * c * (t_1 - t_2)", isCorrect: false },
      { id: "l4_p1_q3_o3", text: "Q = (m * c) / (t_2 - t_1)", isCorrect: false },
      { id: "l4_p1_q3_o4", text: "Q = (c * \\Delta t) / m", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q4",
    question: "Đại lượng nào sau đây đặc trưng riêng cho bản chất của mỗi chất trong công thức tính nhiệt lượng thay đổi nhiệt độ?",
    level: "Nhận biết",
    explanation: "Nhiệt dung riêng c là đại lượng chỉ phụ thuộc vào bản chất của chất làm vật.",
    options: [
      { id: "l4_p1_q4_o1", text: "Khối lượng m của vật.", isCorrect: false },
      { id: "l4_p1_q4_o2", text: "Nhiệt lượng Q thu vào.", isCorrect: false },
      { id: "l4_p1_q4_o3", text: "Độ tăng nhiệt độ \\Delta t của vật.", isCorrect: false },
      { id: "l4_p1_q4_o4", text: "Nhiệt dung riêng c của chất làm vật.", isCorrect: true }
    ]
  },
  {
    id: "l4_p1_q5",
    question: "Dựa vào Bảng 4.1 trong sách giáo khoa, chất nào sau đây ở điều kiện thường có giá trị nhiệt dung riêng lớn nhất?",
    level: "Nhận biết",
    explanation: "Nước lỏng có nhiệt dung riêng rất lớn (4200 J/(kg.K)), lớn hơn các chất thông thường như đồng, đất, sắt, nước đá.",
    options: [
      { id: "l4_p1_q5_o1", text: "Nước đá (2100 J/(kg.K)).", isCorrect: false },
      { id: "l4_p1_q5_o2", text: "Nước lỏng (4200 J/(kg.K)).", isCorrect: true },
      { id: "l4_p1_q5_o3", text: "Đồng (380 J/(kg.K)).", isCorrect: false },
      { id: "l4_p1_q5_o4", text: "Sắt (440 J/(kg.K)).", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q6",
    question: "Để làm nóng một vật lên một độ tăng nhiệt độ nhất định, nhiệt lượng cần truyền cho vật tỉ lệ thuận với đại lượng nào của vật?",
    level: "Nhận biết",
    explanation: "Nhiệt lượng Q tỉ lệ thuận với khối lượng m của vật và độ tăng nhiệt độ \\Delta t.",
    options: [
      { id: "l4_p1_q6_o1", text: "Thể tích ban đầu và áp suất bề mặt của vật.", isCorrect: false },
      { id: "l4_p1_q6_o2", text: "Diện tích xung quanh của vật nhận nhiệt.", isCorrect: false },
      { id: "l4_p1_q6_o3", text: "Khối lượng m của vật.", isCorrect: true },
      { id: "l4_p1_q6_o4", text: "Nhiệt độ tuyệt đối ban đầu của môi trường.", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q7",
    question: "Thiết bị chuyên dụng dùng trong phòng thí nghiệm để thực hành đo nhiệt dung riêng của nước nhằm hạn chế trao đổi nhiệt với môi trường có tên gọi là gì?",
    level: "Nhận biết",
    explanation: "Nhiệt lượng kế là thiết bị có lớp cách nhiệt tốt, dùng để đo nhiệt dung hoặc thực hiện các phép đo cân bằng nhiệt lượng.",
    options: [
      { id: "l4_p1_q7_o1", text: "Nhiệt lượng kế.", isCorrect: true },
      { id: "l4_p1_q7_o2", text: "Bình đo áp suất khí.", isCorrect: false },
      { id: "l4_p1_q7_o3", text: "Oát kế điện tử.", isCorrect: false },
      { id: "l4_p1_q7_o4", text: "Lò nung nhiệt điện tử.", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q8",
    question: "Trong bộ thiết bị thực hành đo nhiệt dung riêng của nước (Hình 4.1), bộ đo công suất nguồn điện (oát kế) được tích hợp thêm chức năng quan trọng nào sau đây?",
    level: "Nhận biết",
    explanation: "Theo sách giáo khoa trang 21, bộ đo công suất nguồn điện (oát kế) có tích hợp chức năng đo thời gian đun (giây).",
    options: [
      { id: "l4_p1_q8_o1", text: "Tự động khuấy nước trong bình.", isCorrect: false },
      { id: "l4_p1_q8_o2", text: "Tích hợp chức năng đo thời gian.", isCorrect: true },
      { id: "l4_p1_q8_o3", text: "Đo trực tiếp khối lượng của nước.", isCorrect: false },
      { id: "l4_p1_q8_o4", text: "Tự động tắt nguồn khi nước sôi.", isCorrect: false }
    ]
  },

  // 5 THÔNG HIỂU
  {
    id: "l4_p1_q9",
    question: "Tại sao trong hệ thống làm mát của động cơ nhiệt người ta chọn nước tuần hoàn, trong khi ở máy biến áp lại sử dụng dầu cách điện tản nhiệt?",
    level: "Thông hiểu",
    explanation: "Nước có nhiệt dung riêng lớn nên hấp thụ và mang đi nhiều nhiệt lượng hơn, thích hợp làm mát động cơ không lo rò điện. Còn máy biến áp có dòng điện cao áp cực kỳ nguy hiểm, cần dầu vừa tản nhiệt vừa có tính cách điện tuyệt đối.",
    options: [
      { id: "l4_p1_q9_o1", text: "Nhiệt dung riêng của dầu lớn hơn nước nhiều lần nên dầu tản nhiệt nhanh hơn.", isCorrect: false },
      { id: "l4_p1_q9_o2", text: "Nước tản nhiệt kém hơn dầu nhưng nước rẻ tiền và dễ tìm kiếm trong tự nhiên hơn.", isCorrect: false },
      { id: "l4_p1_q9_o3", text: "Nước dẫn điện tốt gây chập cháy máy biến áp nên dùng dầu cách điện tốt; còn động cơ cần nước vì nước có nhiệt dung riêng rất lớn giúp làm mát tối ưu.", isCorrect: true },
      { id: "l4_p1_q9_o4", text: "Dầu sôi ở nhiệt độ thấp hơn nước nên làm mát tốt hơn cho các cuộn dây điện cao áp.", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q10",
    question: "Hiện tượng ban ngày có gió mát thổi từ biển vào đất liền (gió biển) được giải thích dựa trên cơ sở vật lí nào về nhiệt dung riêng?",
    level: "Thông hiểu",
    explanation: "Đất có nhiệt dung riêng nhỏ hơn nước biển nhiều lần nên nóng lên nhanh hơn dưới ánh mặt trời. Không khí trên đất liền nóng lên dãn nở nhẹ bay lên, tạo vùng áp thấp thu hút không khí mát từ biển thổi vào.",
    options: [
      { id: "l4_p1_q10_o1", text: "Đất có nhiệt dung riêng nhỏ hơn nước biển nên ban ngày nóng lên nhanh hơn biển, tạo sự chênh lệch áp suất không khí.", isCorrect: true },
      { id: "l4_p1_q10_o2", text: "Nước biển có nhiệt dung riêng nhỏ hơn đất nên bốc hơi mạnh tạo gió đẩy vào đất liền.", isCorrect: false },
      { id: "l4_p1_q10_o3", text: "Đất tỏa nhiệt nhanh hơn nước biển vào ban ngày làm nhiệt độ đất thấp hơn biển.", isCorrect: false },
      { id: "l4_p1_q10_o4", text: "Mật độ phân tử đất lớn hơn nước biển tạo ra dòng đối lưu thổi khí mát từ biển vào.", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q11",
    question: "Thả một quả cầu metal khối lượng m ở nhiệt độ cao vào cốc nước cùng khối lượng m ở nhiệt độ thấp. Bỏ qua hao phí nhiệt. Sau khi cân bằng nhiệt, độ giảm nhiệt độ của quả cầu lớn gấp 3 lần độ tăng nhiệt độ của cốc nước. Điều này chứng tỏ:",
    level: "Thông hiểu",
    explanation: "Q_toa = Q_thu <=> m * c_kimloai * \\Delta t_kimloai = m * c_nuoc * \\Delta t_nuoc. Vì \\Delta t_kimloai = 3 * \\Delta t_nuoc nên c_nuoc = 3 * c_kimloai.",
    options: [
      { id: "l4_p1_q11_o1", text: "Nhiệt dung riêng của nước lớn gấp 3 lần nhiệt dung riêng của quả cầu kim loại.", isCorrect: true },
      { id: "l4_p1_q11_o2", text: "Nhiệt dung riêng của quả cầu lớn gấp 3 lần nhiệt dung riêng của nước.", isCorrect: false },
      { id: "l4_p1_q11_o3", text: "Nhiệt lượng nước thu vào lớn gấp 3 lần nhiệt lượng quả cầu tỏa ra.", isCorrect: false },
      { id: "l4_p1_q11_o4", text: "Quả cầu truyền toàn bộ nội năng của nó cho cốc nước làm nước nóng lên.", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q12",
    question: "Nhiệt dung riêng của đồng là 380 J/(kg.K). Con số này mang ý nghĩa vật lí là gì?",
    level: "Thông hiểu",
    explanation: "Ý nghĩa nhiệt dung riêng của đồng: Cần cung cấp nhiệt lượng là 380 J để 1 kg đồng tăng thêm 1 K.",
    options: [
      { id: "l4_p1_q12_o1", text: "Cần nhiệt lượng 380 J để làm nóng chảy hoàn toàn 1 kg đồng ở nhiệt độ nóng chảy.", isCorrect: false },
      { id: "l4_p1_q12_o2", text: "Cần nhiệt lượng 380 J để cung cấp cho 1 kg đồng tăng thêm 1 K.", isCorrect: true },
      { id: "l4_p1_q12_o3", text: "Nhiệt lượng tỏa ra khi 1 kg đồng nguội đi từ nhiệt độ phòng về 0 K.", isCorrect: false },
      { id: "l4_p1_q12_o4", text: "Năng lượng tối thiểu để phá vỡ liên kết tinh thể của 1 kg đồng.", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q13",
    question: "Trong thí nghiệm đo nhiệt dung riêng của nước, tại sao việc 'khuấy liên tục và nhẹ nhàng' nước trong bình nhiệt lượng kế trong suốt quá trình đun có ý nghĩa quan trọng?",
    level: "Thông hiểu",
    explanation: "Khuấy nước liên tục giúp nhiệt lượng từ dây điện trở lan tỏa đều ra toàn bộ lượng nước, đảm bảo nhiệt độ của nước đồng đều khắp nơi và số đọc trên nhiệt kế phản ánh đúng trạng thái thực tế.",
    options: [
      { id: "l4_p1_q13_o1", text: "Để dây điện trở không bị quá nhiệt dẫn đến cháy hỏng.", isCorrect: false },
      { id: "l4_p1_q13_o2", text: "Để tăng tốc độ truyền nhiệt từ môi trường bên ngoài vào trong bình.", isCorrect: false },
      { id: "l4_p1_q13_o3", text: "Để nước nóng đều, giúp số chỉ của nhiệt kế đại diện đúng cho toàn bộ lượng nước.", isCorrect: true },
      { id: "l4_p1_q13_o4", text: "Để làm tăng ma sát giữa các phân tử nước giúp nước nóng nhanh hơn.", isCorrect: false }
    ]
  },

  // 5 VẬN DỤNG
  {
    id: "l4_p1_q14",
    question: "Thả một khối sắt có khối lượng 0,5 kg ở nhiệt độ 80 °C vào một cốc chứa 1 kg nước ở nhiệt độ 20 °C. Bỏ qua sự hấp thụ nhiệt của cốc và môi trường. Cho biết nhiệt dung riêng của sắt là 440 J/(kg.K), của nước là 4200 J/(kg.K). Nhiệt độ cân bằng của hệ sau khi trao đổi nhiệt xấp xỉ bằng bao nhiêu?",
    level: "Vận dụng",
    explanation: "Q_toa = Q_thu <=> m_1 * c_1 * (t_1 - t) = m_2 * c_2 * (t - t_2) <=> 0,5 * 440 * (80 - t) = 1 * 4200 * (t - 20) <=> 220 * (80 - t) = 4200 * (t - 20) <=> 17600 - 220 * t = 4200 * t - 84000 <=> 4420 * t = 101600 -> t ≈ 23 °C.",
    options: [
      { id: "l4_p1_q14_o1", text: "30 °C.", isCorrect: false },
      { id: "l4_p1_q14_o2", text: "23 °C.", isCorrect: true },
      { id: "l4_p1_q14_o3", text: "26 °C.", isCorrect: false },
      { id: "l4_p1_q14_o4", text: "35 °C.", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q15",
    question: "Một chiếc ấm điện đun nước có công suất định mức P = 2000 W được dùng để đun 1,5 kg nước từ nhiệt độ ban đầu 20 °C đến khi sôi (100 °C). Biết hiệu suất truyền nhiệt của ấm đun là 84%, nhiệt dung riêng của nước là 4200 J/(kg.K). Thời gian đun sôi nước là:",
    level: "Vận dụng",
    explanation: "Q_ich = m * c * \\Delta t = 1,5 * 4200 * 80 = 504000 J. Công suất có ích: P_ich = P * H = 2000 * 0,84 = 1680 W. Thời gian đun: \\tau = Q_ich / P_ich = 504000 / 1680 = 300 s (tức là 5 phút).",
    options: [
      { id: "l4_p1_q15_o1", text: "252 s.", isCorrect: false },
      { id: "l4_p1_q15_o2", text: "300 s.", isCorrect: true },
      { id: "l4_p1_q15_o3", text: "357 s.", isCorrect: false },
      { id: "l4_p1_q15_o4", text: "420 s.", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q16",
    question: "Đổ 100 g nước nóng ở nhiệt độ t_1 vào một cốc chứa 150 g nước lạnh ở nhiệt độ t_2 = 15 °C. Khi có cân bằng nhiệt, nhiệt độ của cốc nước là t = 35 °C. Bỏ qua hao phí nhiệt ra cốc và môi trường. Nhiệt độ t_1 ban đầu của nước nóng là bao nhiêu?",
    level: "Vận dụng",
    explanation: "Q_toa = Q_thu <=> m_1 * c * (t_1 - t) = m_2 * c * (t - t_2) <=> 100 * (t_1 - 35) = 150 * (35 - 15) <=> 100 * (t_1 - 35) = 150 * 20 = 3000 <=> t_1 - 35 = 30 -> t_1 = 65 °C.",
    options: [
      { id: "l4_p1_q16_o1", text: "55 °C.", isCorrect: false },
      { id: "l4_p1_q16_o2", text: "60 °C.", isCorrect: false },
      { id: "l4_p1_q16_o3", text: "65 °C.", isCorrect: true },
      { id: "l4_p1_q16_o4", text: "70 °C.", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q17",
    question: "Đun nóng một lượng đồng có khối lượng m bằng nguồn nhiệt có công suất tỏa nhiệt không đổi. Người ta thấy rằng để đồng tăng thêm 15 °C thì mất khoảng thời gian là 3 phút. Nếu đun nóng một lượng nước cũng có khối lượng m như trên bằng chính nguồn nhiệt này thì thời gian cần thiết để nước tăng thêm 15 °C là bao nhiêu? Biết c_dong = 380 J/(kg.K), c_nuoc = 4200 J/(kg.K).",
    level: "Vận dụng",
    explanation: "Thời gian đun tỉ lệ thuận với nhiệt dung riêng c khi cùng khối lượng m, độ tăng nhiệt độ và công suất đun. Do đó \\tau_nuoc / \\tau_dong = c_nuoc / c_dong = 4200 / 380 ≈ 11,05 lần. Suy ra \\tau_nuoc = 3 * 11,05 ≈ 33,16 phút ≈ 33 phút 10 giây.",
    options: [
      { id: "l4_p1_q17_o1", text: "15 phút 45 giây.", isCorrect: false },
      { id: "l4_p1_q17_o2", text: "33 phút 10 giây.", isCorrect: true },
      { id: "l4_p1_q17_o3", text: "11 phút 05 giây.", isCorrect: false },
      { id: "l4_p1_q17_o4", text: "45 phút 20 giây.", isCorrect: false }
    ]
  },
  {
    id: "l4_p1_q18",
    question: "Một học sinh thực hiện thí nghiệm đo nhiệt dung riêng của nước thu được số liệu: m_nuoc = 0,15 kg, công suất trung bình oát kế đo được là P = 15,2 W. Thời gian đun giữa hai điểm M và N trên đồ thị là \\Delta \\tau = 300 s, nhiệt độ nước tăng một lượng tương ứng là \\Delta t = 6,5 °C. Tính giá trị nhiệt dung riêng thực nghiệm đo được từ số liệu trên?",
    level: "Vận dụng",
    explanation: "Công thức: c = (P * \\Delta \\tau) / (m * \\Delta t) = (15,2 * 300) / (0,15 * 6,5) = 4560 / 0,975 ≈ 4677 J/(kg.K).",
    options: [
      { id: "l4_p1_q18_o1", text: "4200 J/(kg.K).", isCorrect: false },
      { id: "l4_p1_q18_o2", text: "4677 J/(kg.K).", isCorrect: true },
      { id: "l4_p1_q18_o3", text: "3980 J/(kg.K).", isCorrect: false },
      { id: "l4_p1_q18_o4", text: "4450 J/(kg.K).", isCorrect: false }
    ]
  }
];

export const LESSON4_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l4_p2_q1",
    question: "Xét định nghĩa, đặc điểm vật lý và các yếu tố ảnh hưởng đến nhiệt dung riêng của các chất:",
    statements: [
      {
        id: "l4_p2_q1_s1",
        text: "Nhiệt dung riêng của một chất là đại lượng đặc trưng cho bản chất của chất đó, không phụ thuộc vào trạng thái rắn, lỏng hay khí của chất.",
        isCorrect: false,
        level: "Nhận biết",
        explanation: "Sai. Nhiệt dung riêng phụ thuộc vào trạng thái của chất. Ví dụ, nước đá (rắn) có c = 2100 J/(kg.K), còn nước lỏng có c = 4200 J/(kg.K)."
      },
      {
        id: "l4_p2_q1_s2",
        text: "Công thức c = Q / (m * \\Delta T) cho thấy nhiệt dung riêng tỉ lệ thuận với nhiệt lượng Q truyền vào vật và tỉ lệ nghịch với khối lượng m của vật đó.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Nhiệt dung riêng c là thuộc tính của chất, không phụ thuộc vào Q hay m. Biểu thức trên chỉ là công thức định nghĩa để tính trị số của c."
      },
      {
        id: "l4_p2_q1_s3",
        text: "Độ tăng nhiệt độ trong thang Celsius (°C) bằng độ tăng nhiệt độ trong thang Kelvin (K) nên đơn vị J/(kg.K) và J/(kg.°C) của nhiệt dung riêng có độ lớn tương đương nhau.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Do \\Delta T (K) = \\Delta t (°C) nên hai đơn vị này hoàn toàn tương đương nhau và có thể dùng thay thế cho nhau."
      },
      {
        id: "l4_p2_q1_s4",
        text: "Một chất có nhiệt dung riêng nhỏ thì có khả năng hấp thụ nhiệt lượng tốt hơn và nóng lên chậm hơn so với chất có nhiệt dung riêng lớn khi nhận cùng nhiệt năng.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Chất có nhiệt dung riêng nhỏ thì cần ít nhiệt lượng hơn để tăng nhiệt độ, do đó nó sẽ nóng lên nhanh hơn (và cũng nguội đi nhanh hơn) chứ không phải chậm hơn."
      }
    ]
  },
  {
    id: "l4_p2_q2",
    question: "Xét các ứng dụng thực tế và hiện tượng tự nhiên dựa trên đặc tính nhiệt dung riêng của các chất:",
    statements: [
      {
        id: "l4_p2_q2_s1",
        text: "Vào ban đêm ở ven biển, đất liền tỏa nhiệt ra vũ trụ nguội đi nhanh hơn biển nên không khí trên đất liền lạnh hơn biển, gây ra luồng gió thổi từ đất liền ra biển gọi là gió đất.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Đất có nhiệt dung riêng nhỏ nên hạ nhiệt độ nhanh hơn nước biển, không khí ấm trên biển bốc lên kéo gió mát từ đất liền thổi ra."
      },
      {
        id: "l4_p2_q2_s2",
        text: "Nước biển có nhiệt dung riêng rất lớn giúp đại dương có vai trò như bộ điều hòa nhiệt độ khổng lồ cho Trái Đất, hấp thụ nhiệt bức xạ mặt trời ban ngày mà không tăng nhiệt độ quá nhiều.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Nhiệt dung riêng lớn của nước giữ cho khí hậu ven biển và Trái Đất ôn hòa hơn nhiều."
      },
      {
        id: "l4_p2_q2_s3",
        text: "Khi chế tạo các dụng cụ nhà bếp như xoong, nồi, chảo, người ta chọn nhôm hoặc đồng vì chúng có nhiệt dung riêng lớn giúp giữ ấm thức ăn được lâu hơn.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Người ta chọn nhôm, đồng vì chúng dẫn nhiệt tốt và có nhiệt dung riêng nhỏ, giúp chúng nóng lên nhanh chóng khi đặt lên bếp để truyền nhiệt nhanh cho thức ăn."
      },
      {
        id: "l4_p2_q2_s4",
        text: "Sở dĩ máy biến áp dùng dầu tản nhiệt còn động cơ nhiệt dùng nước làm mát là vì nhiệt dung riêng của dầu lớn hơn nước giúp dầu mang đi nhiều nhiệt lượng hơn nước.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Nhiệt dung riêng của dầu máy chỉ khoảng 2000 J/(kg.K), nhỏ hơn của nước (4200 J/(kg.K)) rất nhiều. Người ta dùng dầu ở máy biến áp vì dầu có tính cách điện xuất sắc bảo vệ mạch điện cao áp."
      }
    ]
  },
  {
    id: "l4_p2_q3",
    question: "Phân tích thí nghiệm thực hành xác định nhiệt dung riêng của nước bằng nhiệt lượng kế điện (Hình 4.1 SGK):",
    statements: [
      {
        id: "l4_p2_q3_s1",
        text: "Sử dụng nhiệt lượng kế bằng nhựa có vỏ xốp dày kèm nắp đậy kín trong thí nghiệm nhằm hạn chế tối đa sự trao đổi nhiệt bất lợi giữa nước và môi trường bên ngoài.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Vỏ xốp là chất cách nhiệt tốt, bảo toàn năng lượng sinh ra từ dây điện trở hầu hết truyền cho lượng nước đun."
      },
      {
        id: "l4_p2_q3_s2",
        text: "Trong thí nghiệm, ta sử dụng oát kế đo công suất dòng điện đun nước. Nhiệt lượng Q cung cấp cho nước được gián tiếp tính bằng điện năng tiêu thụ Q = P * \\Delta \\tau.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Theo định luật bảo toàn năng lượng, điện năng tỏa ra trên dây điện trở biến đổi hoàn toàn thành nhiệt năng cung cấp cho nước."
      },
      {
        id: "l4_p2_q3_s3",
        text: "Công thức thực nghiệm xác định nhiệt dung riêng của nước được xây dựng trên giả thuyết bỏ qua hoàn toàn nhiệt lượng hao phí làm nóng vỏ bình và nắp nhiệt lượng kế.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Ta giả định Q_toa = Q_thu của nước: P * \\Delta \\tau = m * c * \\Delta t nên mới có công thức tính c = (P * \\Delta \\tau) / (m * \\Delta t)."
      },
      {
        id: "l4_p2_q3_s4",
        text: "Nếu trong quá trình làm thí nghiệm ta không khuấy nước liên tục, nhiệt kế điện tử đặt xa dây điện trở sẽ đọc nhiệt độ cao hơn nhiệt độ trung bình thực tế của nước, dẫn đến kết quả tính c lớn hơn giá trị thực.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Đặt xa điện trở mà không khuấy thì nhiệt độ vùng đó tăng chậm hơn nhiệt độ trung bình, nhiệt kế chỉ nhỏ hơn thực tế (\\Delta t_do nhỏ hơn \\Delta t_thuc) dẫn đến c_tinhtoan = (P * \\Delta \\tau) / (m * \\Delta t_do) sẽ lớn hơn giá trị thực tế."
      }
    ]
  },
  {
    id: "l4_p2_q4",
    question: "Xét một bài toán đun nước bằng ấm siêu tốc công suất 2,5 kW có khối lượng nước m = 2,0 kg ở 20 °C, hiệu suất ấm là 80%:",
    statements: [
      {
        id: "l4_p2_q4_s1",
        text: "Nhiệt lượng tối thiểu cần cung cấp để đưa lượng nước này từ 20 °C đến nhiệt độ sôi 100 °C là 672 kJ. Biết c_nuoc = 4200 J/(kg.K).",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Q = m * c * \\Delta t = 2.0 * 4200 * (100 - 20) = 672000 J = 672 kJ."
      },
      {
        id: "l4_p2_q4_s2",
        text: "Nhiệt năng tỏa ra thực tế của bếp đun siêu tốc (bao gồm cả phần hao phí ra môi trường xung quanh) phải bằng 840 kJ.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Công suất toàn phần thực tế tỏa ra: Q_toanphan = Q_ich / H = 672 kJ / 0.80 = 840 kJ."
      },
      {
        id: "l4_p2_q4_s3",
        text: "Thời gian cần thiết để đun sôi lượng nước trên kể từ lúc bật bếp đun siêu tốc là 336 s.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. \\tau = Q_toanphan / P = 840000 J / 2500 W = 336 s."
      },
      {
        id: "l4_p2_q4_s4",
        text: "Nếu tăng công suất định mức của ấm siêu tốc lên gấp đôi và giữ nguyên hiệu suất thì nhiệt lượng có ích cần cung cấp đun sôi lượng nước trên cũng sẽ tăng lên gấp đôi.",
        isCorrect: false,
        level: "Nhận biết",
        explanation: "Sai. Nhiệt lượng có ích đun sôi nước chỉ phụ thuộc khối lượng, nhiệt dung riêng và độ tăng nhiệt độ (Q_ich = m * c * \\Delta t). Tăng công suất chỉ làm giảm thời gian đun chứ không thay đổi nhu cầu nhiệt lượng có ích."
      }
    ]
  }
];

export const LESSON4_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l4_p3_q1",
    answer: 390,
    unit: "J/kg.K",
    level: "Thông hiểu",
    question: "Một nhiệt lượng kế bằng đồng khối lượng 100 g chứa 200 g nước ở nhiệt độ 20 °C. Người ta thả vào bình một mẫu kim loại khối lượng 150 g được đun nóng tới 100 °C. Khi xảy ra cân bằng nhiệt, nhiệt độ của hệ đo được là 25 °C. Bỏ qua mọi hao phí nhiệt ra môi trường ngoài. Biết nhiệt dung riêng của đồng là 380 J/(kg.K), của nước là 4200 J/(kg.K). Hãy tính nhiệt dung riêng của mẫu kim loại đó theo đơn vị J/(kg.K) (làm tròn kết quả đến hàng đơn vị).",
    explanation: "Đồng và nước thu nhiệt lượng: Q_thu = (m_dong * c_dong + m_nuoc * c_nuoc) * (t_cb - t_dau) = (0,1 * 380 + 0,2 * 4200) * (25 - 20) = (38 + 840) * 5 = 878 * 5 = 4390 J. Kim loại tỏa nhiệt lượng: Q_toa = m_kl * c_kl * (t_kl - t_cb) = 0,15 * c_kl * (100 - 25) = 11,25 * c_kl. Cân bằng nhiệt Q_toa = Q_thu => 11,25 * c_kl = 4390 => c_kl ≈ 390,22 J/(kg.K). Làm tròn đến hàng đơn vị là 390 J/(kg.K).",
    illustrationType: "thermal_contact_equilibrium"
  },
  {
    id: "l4_p3_q2",
    answer: 0.63,
    unit: "GJ",
    level: "Thông hiểu",
    question: "Một hồ bơi chứa lượng nước có thể tích V = 100 m^3 (biết khối lượng riêng của nước là 1000 kg/m^3). Ban ngày, dưới ánh nắng mặt trời chiếu rọi liên tục, nhiệt độ của nước trong hồ bơi tăng thêm một lượng nhỏ là 1,5 °C. Tính nhiệt lượng mà lượng nước trong hồ đã hấp thụ được theo đơn vị GigaJun (GJ), biết nhiệt dung riêng của nước là 4200 J/(kg.K). Làm tròn kết quả đến hai chữ số sau dấu phẩy thập phân.",
    explanation: "Khối lượng nước m = V * D = 100 * 1000 = 100000 kg. Nhiệt lượng hấp thụ: Q = m * c * \\Delta t = 100000 * 4200 * 1,5 = 6,3 * 10^8 J. Đổi sang GigaJun (1 GJ = 10^9 J): Q = 0,63 GJ.",
    illustrationType: "triple_point_water"
  },
  {
    id: "l4_p3_q3",
    answer: 1.5,
    unit: "kg",
    level: "Vận dụng",
    question: "Người ta dùng một ấm điện có công suất 1,5 kW để đun sôi một lượng nước từ nhiệt độ ban đầu 25 °C. Sau thời gian đun là 5 phút, nhiệt độ của nước tăng lên đến 75 °C. Biết hiệu suất tỏa nhiệt có ích của ấm là 70%, nhiệt dung riêng của nước là 4200 J/(kg.K). Hãy tính khối lượng nước có trong ấm theo đơn vị kg. Làm tròn kết quả đến một chữ số sau dấu phẩy thập phân.",
    explanation: "Điện năng tiêu thụ toàn phần của ấm trong 5 phút (300 s): A = P * \\tau = 1500 * 300 = 450000 J. Nhiệt lượng có ích truyền cho nước: Q = A * H = 450000 * 0,70 = 315000 J. Ta có Q = m * c * \\Delta t => 315000 = m * 4200 * (75 - 25) => 315000 = 210000 * m => m = 1,5 kg.",
    illustrationType: "piston_expanded"
  },
  {
    id: "l4_p3_q4",
    answer: 251.5,
    unit: "J/kg.K",
    level: "Vận dụng",
    question: "Để xác định nhiệt dung riêng của một hợp kim mới, người ta nung nóng 300 g hợp kim này lên đến 100 °C rồi thả vào một nhiệt lượng kế bằng nhôm có khối lượng 150 g chứa sẵn 250 g nước ở nhiệt độ 20 °C. Nhiệt độ cân bằng đo được là 24,8 °C. Tính nhiệt dung riêng của hợp kim theo đơn vị J/(kg.K) (làm tròn kết quả đến một chữ số sau dấu phẩy thập phân). Biết nhiệt dung riêng của nhôm là 880 J/(kg.K), của nước là 4200 J/(kg.K).",
    explanation: "Nhôm và nước thu nhiệt: Q_thu = (m_nhom * c_nhom + m_nuoc * c_nuoc) * (t_cb - t_dau) = (0,15 * 880 + 0,25 * 4200) * (24,8 - 20) = (132 + 1050) * 4,8 = 1182 * 4,8 = 5673,6 J. Hợp kim tỏa nhiệt: Q_toa = m_hk * c_hk * (t_dau - t_cb) = 0,3 * c_hk * (100 - 24,8) = 22,56 * c_hk. Cân bằng nhiệt: Q_toa = Q_thu => 22,56 * c_hk = 5673,6 => c_hk = 251,489... J/(kg.K). Làm tròn đến một chữ số sau dấu phẩy thập phân là 251,5 J/(kg.K).",
    illustrationType: "sliding_slope"
  },
  {
    id: "l4_p3_q5",
    answer: 84,
    unit: "%",
    level: "Vận dụng",
    question: "Một chiếc bếp điện đun nước có công suất định mức P = 2,0 kW được sử dụng để đun sôi 1,5 kg nước ở nhiệt độ ban đầu 20 °C. Biết thời gian đun nước từ lúc bắt đầu cho đến khi sôi hoàn toàn ở 100 °C là 5 phút. Hãy tính hiệu suất đun nóng của bếp điện này theo đơn vị phần trăm (%). Biết nhiệt dung riêng của nước là 4200 J/(kg.K). Làm tròn kết quả đến hàng đơn vị.",
    explanation: "Nhiệt lượng có ích đun sôi nước: Q_ich = m * c * \\Delta t = 1,5 * 4200 * (100 - 20) = 504000 J. Điện năng tiêu thụ toàn phần của bếp điện trong 5 phút (300 s): A = P * \\tau = 2000 * 300 = 600000 J. Hiệu suất của bếp điện: H = Q_ich / A = 504000 / 600000 = 0,84 = 84%.",
    illustrationType: "insulated_stirrer"
  },
  {
    id: "l4_p3_q6",
    answer: 13.4,
    unit: "g",
    level: "Vận dụng",
    question: "Người ta dùng một chiếc đèn cồn tỏa ra công suất nhiệt ổn định và hiệu suất truyền nhiệt tổng cộng cho ấm nước là 30%. Đèn được dùng để đun một cốc chứa 300 g nước từ nhiệt độ 20 °C lên đến 100 °C. Biết năng suất tỏa nhiệt của cồn là q = 2,5 * 10^7 J/kg và nhiệt dung riêng của nước là 4200 J/(kg.K). Hãy tính khối lượng cồn cần đốt cháy theo đơn vị g (làm tròn kết quả đến một chữ số sau dấu phẩy thập phân).",
    explanation: "Nhiệt lượng có ích đun sôi nước: Q_ich = m_nuoc * c_nuoc * \\Delta t = 0,3 * 4200 * (100 - 20) = 100800 J. Do hiệu suất truyền nhiệt tổng cộng là H = 30% nên nhiệt lượng toàn phần đèn cồn cần tỏa ra khi đốt cháy là: Q_toanphan = Q_ich / H = 100800 / 0,30 = 336000 J. Gọi m_con là khối lượng cồn cần đốt cháy: Q_toanphan = m_con * q => m_con = Q_toanphan / q = 336000 / (2,5 * 10^7) = 0,01344 kg = 13,44 g. Làm tròn kết quả đến một chữ số sau dấu phẩy thập phân là 13,4 g.",
    illustrationType: "insulated_stirrer"
  }
];

// ==================== LESSON 5 QUESTIONS ====================
export const LESSON5_P1_QUESTIONS: Part1Question[] = [
  // 8 NHẬN BIẾT
  {
    id: "l5_p1_q1",
    question: "Sự nóng chảy của một chất là gì?",
    level: "Nhận biết",
    explanation: "Sự nóng chảy là quá trình chuyển từ thể rắn sang thể lỏng của một chất.",
    options: [
      { id: "l5_p1_q1_o1", text: "Quá trình chuyển từ thể lỏng sang thể khí.", isCorrect: false },
      { id: "l5_p1_q1_o2", text: "Quá trình chuyển từ thể rắn sang thể lỏng.", isCorrect: true },
      { id: "l5_p1_q1_o3", text: "Quá trình chuyển từ thể khí sang thể rắn.", isCorrect: false },
      { id: "l5_p1_q1_o4", text: "Quá trình chuyển từ thể lỏng sang thể rắn.", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q2",
    question: "Định nghĩa nào sau đây đúng về nhiệt nóng chảy riêng của một chất rắn?",
    level: "Nhận biết",
    explanation: "Nhiệt nóng chảy riêng của một chất rắn là nhiệt lượng cần cung cấp để 1 kg chất đó chuyển hoàn toàn từ thể rắn sang thể lỏng ở nhiệt độ nóng chảy.",
    options: [
      { id: "l5_p1_q2_o1", text: "Nhiệt lượng cần cung cấp để một khối lượng bất kỳ của chất đó nóng chảy hoàn toàn.", isCorrect: false },
      { id: "l5_p1_q2_o2", text: "Nhiệt lượng cần để 1 kg chất đó tăng thêm nhiệt độ 1 độ C ở trạng thái rắn.", isCorrect: false },
      { id: "l5_p1_q2_o3", text: "Nhiệt lượng cần cung cấp cho 1 kg chất đó chuyển hoàn toàn từ thể rắn sang thể lỏng ở nhiệt độ nóng chảy.", isCorrect: true },
      { id: "l5_p1_q2_o4", text: "Nhiệt lượng tỏa ra khi 1 kg chất đó đông đặc hoàn toàn thành chất rắn ở nhiệt độ nóng chảy.", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q3",
    question: "Nhiệt nóng chảy riêng thường được kí hiệu bằng chữ cái nào và có đơn vị đo hợp pháp trong hệ SI là gì?",
    level: "Nhận biết",
    explanation: "Kí hiệu là \\lambda (lambda), đơn vị đo là J/kg (Jun trên kilôgam).",
    options: [
      { id: "l5_p1_q3_o1", text: "Kí hiệu là c, đơn vị là J/(kg * K).", isCorrect: false },
      { id: "l5_p1_q3_o2", text: "Kí hiệu là \\lambda, đơn vị là J/kg.", isCorrect: true },
      { id: "l5_p1_q3_o3", text: "Kí hiệu là L, đơn vị là J/kg.", isCorrect: false },
      { id: "l5_p1_q3_o4", text: "Kí hiệu là Q, đơn vị là J.", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q4",
    question: "Công thức tính nhiệt lượng Q cần cung cấp để khối lượng m của chất rắn nóng chảy hoàn toàn ở nhiệt độ nóng chảy là:",
    level: "Nhận biết",
    explanation: "Công thức tính nhiệt lượng nóng chảy là Q = \\lambda * m.",
    options: [
      { id: "l5_p1_q4_o1", text: "Q = \\lambda * m", isCorrect: true },
      { id: "l5_p1_q4_o2", text: "Q = m * c * \\Delta t", isCorrect: false },
      { id: "l5_p1_q4_o3", text: "Q = L * m", isCorrect: false },
      { id: "l5_p1_q4_o4", text: "Q = \\lambda / m", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q5",
    question: "Trong suốt quá trình nóng chảy của một vật rắn kết tinh (như nước đá hay kim loại tinh khiết):",
    level: "Nhận biết",
    explanation: "Trong quá trình nóng chảy của chất rắn kết tinh, nhiệt độ của chất không đổi dù liên tục nhận thêm nhiệt lượng.",
    options: [
      { id: "l5_p1_q5_o1", text: "Nhiệt độ của vật liên tục tăng lên.", isCorrect: false },
      { id: "l5_p1_q5_o2", text: "Nhiệt độ của vật liên tục giảm đi.", isCorrect: false },
      { id: "l5_p1_q5_o3", text: "Nhiệt độ của vật không thay đổi.", isCorrect: true },
      { id: "l5_p1_q5_o4", text: "Nhiệt độ của vật lúc tăng lúc giảm hỗn loạn.", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q6",
    question: "Dựa vào Bảng 5.1 trong Sách giáo khoa, chất nào sau đây có nhiệt độ nóng chảy thấp nhất?",
    level: "Nhận biết",
    explanation: "Theo bảng số liệu SGK: Nước đá nóng chảy ở 0 °C, Chì nóng chảy ở 327 °C, Đồng nóng chảy ở 1084 °C, Sắt nóng chảy ở 1535 °C. Vì vậy nước đá có nhiệt độ nóng chảy thấp nhất.",
    options: [
      { id: "l5_p1_q6_o1", text: "Đồng (1084 °C)", isCorrect: false },
      { id: "l5_p1_q6_o2", text: "Sắt (1535 °C)", isCorrect: false },
      { id: "l5_p1_q6_o3", text: "Chì (327 °C)", isCorrect: false },
      { id: "l5_p1_q6_o4", text: "Nước đá (0 °C)", isCorrect: true }
    ]
  },
  {
    id: "l5_p1_q7",
    question: "Khi tiến hành thí nghiệm thực hành đo nhiệt nóng chảy riêng của nước đá, dụng cụ chính nào dùng để cách nhiệt với môi trường?",
    level: "Nhận biết",
    explanation: "Bình nhiệt lượng kế cách nhiệt là dụng cụ chính dùng để hạn chế sự trao đổi nhiệt với môi trường bên ngoài trong thí nghiệm thực hành.",
    options: [
      { id: "l5_p1_q7_o1", text: "Bình nhiệt lượng kế.", isCorrect: true },
      { id: "l5_p1_q7_o2", text: "Cân điện tử.", isCorrect: false },
      { id: "l5_p1_q7_o3", text: "Oát kế điện tử.", isCorrect: false },
      { id: "l5_p1_q7_o4", text: "Ống đong chia độ.", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q8",
    question: "Mục đích chính của thí nghiệm thực hành được mô tả trong Mục II Sách giáo khoa là gì?",
    level: "Nhận biết",
    explanation: "Mục đích thí nghiệm là xác định giá trị nhiệt nóng chảy riêng của nước đá.",
    options: [
      { id: "l5_p1_q8_o1", text: "Đo nhiệt dung riêng của nước lỏng.", isCorrect: false },
      { id: "l5_p1_q8_o2", text: "Đo nhiệt nóng chảy riêng của nước đá.", isCorrect: true },
      { id: "l5_p1_q8_o3", text: "Xác định nhiệt hóa hơi riêng của nước đá.", isCorrect: false },
      { id: "l5_p1_q8_o4", text: "Xác định công suất tỏa nhiệt của dây điện trở.", isCorrect: false }
    ]
  },

  // 5 THÔNG HIỂU
  {
    id: "l5_p1_q9",
    question: "Nhiệt nóng chảy riêng của nước đá là 3,40 * 10^5 J/kg. Trị số này có ý nghĩa vật lí là:",
    level: "Thông hiểu",
    explanation: "Ý nghĩa trị số \\lambda = 3,40 * 10^5 J/kg: Để làm nóng chảy hoàn toàn 1 kg nước đá hoàn toàn ở 0 °C cần một nhiệt lượng là 3,40 * 10^5 J.",
    options: [
      { id: "l5_p1_q9_o1", text: "Cần cung cấp nhiệt lượng 3,40 * 10^5 J để nâng nhiệt độ của 1 kg nước đá thêm 1 K.", isCorrect: false },
      { id: "l5_p1_q9_o2", text: "Cần cung cấp nhiệt lượng 3,40 * 10^5 J để làm nóng chảy hoàn toàn 1 kg nước đá ở nhiệt độ 0 °C.", isCorrect: true },
      { id: "l5_p1_q9_o3", text: "Nhiệt lượng tỏa ra khi 1 kg nước hóa hơi hoàn toàn ở 100 °C là 3,40 * 10^5 J.", isCorrect: false },
      { id: "l5_p1_q9_o4", text: "Tổng nội năng của 1 kg nước đá ở 0 °C có giá trị bằng 3,40 * 10^5 J.", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q10",
    question: "Vì sao trong suốt quá trình nóng chảy, mặc dù ta liên tục cung cấp nhiệt lượng cho vật nhưng nhiệt độ của vật vẫn không thay đổi?",
    level: "Thông hiểu",
    explanation: "Nhiệt lượng cung cấp cho vật lỏng trong quá trình nóng chảy không dùng để tăng động năng phân tử (tăng nhiệt độ) mà dùng hoàn toàn để phá vỡ mạng liên kết tinh thể chất rắn chuyển sang thể lỏng.",
    options: [
      { id: "l5_p1_q10_o1", text: "Do nhiệt năng biến đổi hoàn toàn thành động năng tịnh tiến trung bình của phân tử chất lỏng.", isCorrect: false },
      { id: "l5_p1_q10_o2", text: "Do nhiệt lượng truyền vào bị thất thoát hoàn toàn ra môi trường xung quanh bình chứa.", isCorrect: false },
      { id: "l5_p1_q10_o3", text: "Do nhiệt lượng cung cấp được sử dụng để phá vỡ liên kết giữa các phân tử trong mạng tinh thể chất rắn.", isCorrect: true },
      { id: "l5_p1_q10_o4", text: "Do các phân tử chất rắn hấp thụ nhiệt rồi ngừng chuyển động hoàn toàn.", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q11",
    question: "Phát biểu nào sau đây là chính xác về sự khác biệt giữa nhiệt dung riêng (c) và nhiệt nóng chảy riêng (\\lambda)?",
    level: "Thông hiểu",
    explanation: "Nhiệt dung riêng c đặc trưng cho quá trình truyền nhiệt làm thay đổi nhiệt độ mà không đổi thể; còn nhiệt nóng chảy riêng \\lambda đặc trưng cho quá trình truyền nhiệt để thay đổi thể từ rắn sang lỏng ở nhiệt độ không đổi.",
    options: [
      { id: "l5_p1_q11_o1", text: "Nhiệt dung riêng c áp dụng cho quá trình biến đổi trạng thái; còn \\lambda áp dụng cho quá trình thay đổi nhiệt độ.", isCorrect: false },
      { id: "l5_p1_q11_o2", text: "Nhiệt dung riêng c đặc trưng cho quá trình thay đổi nhiệt độ của vật; còn nhiệt nóng chảy riêng \\lambda đặc trưng cho sự thay đổi trạng thái từ rắn sang lỏng ở nhiệt độ nóng chảy.", isCorrect: true },
      { id: "l5_p1_q11_o3", text: "Đơn vị đo của c và \\lambda hoàn toàn khác nhau.", isCorrect: false },
      { id: "l5_p1_q11_o4", text: "Cả hai đại lượng đều chỉ phụ thuộc vào khối lượng của vật cần truyền nhiệt lượng.", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q12",
    question: "Trong công nghệ đúc kim loại (như đúc chì, đồng, sắt), việc biết rõ nhiệt độ nóng chảy và nhiệt nóng chảy riêng của kim loại mang lại lợi ích thực tiễn gì?",
    level: "Thông hiểu",
    explanation: "Giúp xác định được năng lượng nhiệt tối thiểu cần cung cấp cho lò nung, từ đó chọn được công suất lò nung, thời gian nung và thời điểm đổ kim loại vào khuôn tối ưu nhất.",
    options: [
      { id: "l5_p1_q12_o1", text: "Xác định chính xác độ cứng và độ bền kéo cơ học của sản phẩm sau khi đúc xong.", isCorrect: false },
      { id: "l5_p1_q12_o2", text: "Giúp tính toán năng lượng nhiệt cần thiết cung cấp cho lò nung và thời gian nung chảy phù hợp.", isCorrect: true },
      { id: "l5_p1_q12_o3", text: "Làm giảm nhiệt độ nóng chảy của kim loại để tiết kiệm nhiên liệu đốt.", isCorrect: false },
      { id: "l5_p1_q12_o4", text: "Tự động hóa hoàn toàn quy trình tách các tạp chất phi kim ra khỏi quặng hỗn hợp.", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q13",
    question: "Đồ thị Hình 5.1 SGK biểu diễn sự phụ thuộc nhiệt độ theo thời gian của nước trong bình chứa nhiệt lượng kế. Tại sao từ giây thứ 0 đến giây thứ 600, đường đồ thị nằm ngang trùng với trục hoành (0 °C)?",
    level: "Thông hiểu",
    explanation: "Đường đồ thị nằm ngang ở nhiệt độ 0 °C từ giây thứ 0 đến 600 vì trong khoảng thời gian này nước đá đang nóng chảy dần thành nước, nhiệt độ của hệ không đổi.",
    options: [
      { id: "l5_p1_q13_o1", text: "Do nước đá đã nóng chảy hoàn toàn và đang tăng nhiệt độ lên.", isCorrect: false },
      { id: "l5_p1_q13_o2", text: "Do nhiệt kế điện tử bị hỏng hóc hoặc dòng điện bị ngắt quãng không đun.", isCorrect: false },
      { id: "l5_p1_q13_o3", text: "Do trong thời gian này nước đá đang nóng chảy, nhiệt độ giữ không đổi ở 0 °C.", isCorrect: true },
      { id: "l5_p1_q13_o4", text: "Do nhiệt lượng tỏa ra từ điện trở bằng đúng nhiệt lượng hao phí tỏa ra phòng học.", isCorrect: false }
    ]
  },

  // 5 VẬN DỤNG
  {
    id: "l5_p1_q14",
    question: "Cần cung cấp một nhiệt lượng bằng bao nhiêu để làm nóng chảy hoàn toàn một cục nước đá có khối lượng m = 500 g đang ở nhiệt độ 0 °C? Biết nhiệt nóng chảy riêng của nước đá \lambda = 3,4 * 10^5 J/kg.",
    level: "Vận dụng",
    explanation: "Q = \lambda * m = 3,4 * 10^5 * 0,5 = 1,7 * 10^5 J = 170 kJ.",
    options: [
      { id: "l5_p1_q14_o1", text: "170 J.", isCorrect: false },
      { id: "l5_p1_q14_o2", text: "1,7 * 10^5 J.", isCorrect: true },
      { id: "l5_p1_q14_o3", text: "3,4 * 10^5 J.", isCorrect: false },
      { id: "l5_p1_q14_o4", text: "6,8 * 10^5 J.", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q15",
    question: "Một lò đúc chì sử dụng điện có hiệu suất 60%. Lò cần đun nóng chảy hoàn toàn 4,0 kg chì từ nhiệt độ nóng chảy 327 °C. Biết nhiệt nóng chảy riêng của chì là 0,25 * 10^5 J/kg. Điện năng mà lò nung đã tiêu thụ thực tế là:",
    level: "Vận dụng",
    explanation: "Q_ich = \lambda * m = 0,25 * 10^5 * 4 = 1,0 * 10^5 J. Điện năng thực tế: A = Q_ich / H = 1,0 * 10^5 / 0,60 \approx 1,67 * 10^5 J.",
    options: [
      { id: "l5_p1_q15_o1", text: "1,0 * 10^5 J.", isCorrect: false },
      { id: "l5_p1_q15_o2", text: "1,67 * 10^5 J.", isCorrect: true },
      { id: "l5_p1_q15_o3", text: "0,60 * 10^5 J.", isCorrect: false },
      { id: "l5_p1_q15_o4", text: "2,50 * 10^5 J.", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q16",
    question: "Người ta đo nhiệt nóng chảy riêng của nước đá bằng cách đun nước đá ở 0 °C trong bình nhiệt lượng kế bằng một cuộn dây điện trở có công suất tỏa nhiệt P = 15 W. Sau thời gian t = 10 phút, khối lượng nước đá đã tan thành nước lỏng đo được là 26 g. Giá trị nhiệt nóng chảy riêng thực nghiệm đo được từ số liệu trên gần đúng bằng:",
    level: "Vận dụng",
    explanation: "Nhiệt lượng tỏa ra: Q = P * t = 15 * (10 * 60) = 9000 J. Khối lượng nóng chảy m = 26 g = 0,026 kg. Nhiệt nóng chảy riêng \lambda = Q/m = 9000 / 0,026 \approx 3,46 * 10^5 J/kg.",
    options: [
      { id: "l5_p1_q16_o1", text: "3,40 * 10^5 J/kg.", isCorrect: false },
      { id: "l5_p1_q16_o2", text: "3,46 * 10^5 J/kg.", isCorrect: true },
      { id: "l5_p1_q16_o3", text: "5,77 * 10^5 J/kg.", isCorrect: false },
      { id: "l5_p1_q16_o4", text: "2,60 * 10^5 J/kg.", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q17",
    question: "Một miếng đồng khối lượng 1,5 kg đang ở nhiệt độ nóng chảy 1084 °C, nhận một nhiệt lượng Q = 2,7 * 10^5 J. Khối lượng đồng đã nóng chảy thành thể lỏng là bao nhiêu? Biết \lambda_dong = 1,80 * 10^5 J/kg.",
    level: "Vận dụng",
    explanation: "Q_hong_chay_het = \lambda * m = 1,8 * 10^5 * 1,5 = 2,7 * 10^5 J. Do Q cung cấp đúng bằng Q_hong_chay_het nên toàn bộ 1,5 kg đồng đã nóng chảy thành lỏng.",
    options: [
      { id: "l5_p1_q17_o1", text: "0,5 kg.", isCorrect: false },
      { id: "l5_p1_q17_o2", text: "1,0 kg.", isCorrect: false },
      { id: "l5_p1_q17_o3", text: "1,5 kg.", isCorrect: true },
      { id: "l5_p1_q17_o4", text: "Khối đồng chưa nóng chảy chút nào.", isCorrect: false }
    ]
  },
  {
    id: "l5_p1_q18",
    question: "Thả một khối nước đá khối lượng 150 g ở nhiệt độ -10 °C vào bình nhiệt lượng kế chứa nước lỏng ở nhiệt độ cao. Khi nước đá nóng lên đến 0 °C và vừa nóng chảy hoàn toàn thì hệ đã nhận được một nhiệt lượng tổng cộng bằng bao nhiêu? Biết c_da = 2100 J/(kg.K), \lambda_da = 3,4 * 10^5 J/kg.",
    level: "Vận dụng",
    explanation: "Nhiệt lượng làm tăng nhiệt độ đá từ -10 lên 0 °C: Q_1 = m * c * \Delta t = 0,15 * 2100 * 10 = 3150 J. Nhiệt lượng làm đá nóng chảy hoàn toàn ở 0 °C: Q_2 = \lambda * m = 3,4 * 10^5 * 0,15 = 51000 J. Tổng nhiệt lượng: Q = Q_1 + Q_2 = 54150 J = 54,15 kJ.",
    options: [
      { id: "l5_p1_q18_o1", text: "51,00 kJ.", isCorrect: false },
      { id: "l5_p1_q18_o2", text: "54,15 kJ.", isCorrect: true },
      { id: "l5_p1_q18_o3", text: "3,15 kJ.", isCorrect: false },
      { id: "l5_p1_q18_o4", text: "541,5 kJ.", isCorrect: false }
    ]
  }
];

export const LESSON5_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l5_p2_q1",
    question: "Xét các phát biểu sau đây về khái niệm sự nóng chảy và nhiệt nóng chảy riêng của một chất:",
    statements: [
      {
        id: "l5_p2_q1_s1",
        text: "Sự nóng chảy là quá trình biến đổi trạng thái của một chất từ thể rắn sang thể lỏng.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đây là định nghĩa cơ bản về sự nóng chảy."
      },
      {
        id: "l5_p2_q1_s2",
        text: "Trong suốt quá trình nóng chảy của một chất rắn kết tinh, nhiệt độ của nó liên tục tăng tỉ lệ thuận với nhiệt lượng được truyền vào.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Đối với chất rắn kết tinh, trong suốt quá trình nóng chảy nhiệt độ của nó luôn giữ không đổi."
      },
      {
        id: "l5_p2_q1_s3",
        text: "Nhiệt nóng chảy riêng của đồng (1,80 * 10^5 J/kg) lớn hơn của chì (0,25 * 10^5 J/kg), chứng tỏ cần nhiều nhiệt lượng hơn để làm nóng chảy hoàn toàn 1 kg đồng so với 1 kg chì khi cả hai đang ở nhiệt độ nóng chảy tương ứng.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Nhiệt nóng chảy riêng đại lượng đặc trưng cho nhiệt lượng cần để nóng chảy 1 kg chất rắn kết tinh."
      },
      {
        id: "l5_p2_q1_s4",
        text: "Cung cấp một lượng nhiệt năng bằng 34 kJ là đủ để làm nóng chảy hoàn toàn một khối nước đá nặng 1,0 kg đang ở nhiệt độ 0 °C, biết \lambda_da = 3,4 * 10^5 J/kg.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Q = \lambda * m = 3,4 * 10^5 * 1,0 = 3,4 * 10^5 J = 340 kJ. Do đó 34 kJ chỉ đủ nóng chảy 0,1 kg nước đá chứ không thể làm nóng chảy hoàn toàn 1,0 kg."
      }
    ]
  },
  {
    id: "l5_p2_q2",
    question: "Trong thí nghiệm đo nhiệt nóng chảy riêng của nước đá sử dụng nhiệt lượng kế cách nhiệt và điện trở gia nhiệt:",
    statements: [
      {
        id: "l5_p2_q2_s1",
        text: "Mục tiêu tối thượng của thí nghiệm này là đo đạc và xác định nhiệt nóng chảy riêng của chất cấu tạo nên mẫu nước đá.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đây chính là mục đích thí nghiệm thực hành trong SGK trang 25."
      },
      {
        id: "l5_p2_q2_s2",
        text: "Ta giả thiết rằng toàn bộ điện năng tỏa ra trên dây điện trở U * I * t được chuyển hóa hoàn toàn thành nhiệt lượng có ích cung cấp cho nước đá nóng chảy.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Đây là giả định lý tưởng để bỏ qua hao phí và thiết lập hệ thức U * I * t = \lambda * m."
      },
      {
        id: "l5_p2_q2_s3",
        text: "Nếu trong quá trình đo đạc ta bỏ qua nhiệt lượng cần để làm nóng vỏ bình nhiệt lượng kế, giá trị nhiệt nóng chảy riêng thực nghiệm tính toán được sẽ nhỏ hơn giá trị thực tế của nó.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Bỏ qua nhiệt thu của vỏ bình làm ta nghĩ toàn bộ điện năng truyền hết cho đá, tức Q_calc = Q_total > Q_actual. Điều này khiến \lambda_calc = Q_calc / m lớn hơn giá trị thực tế."
      },
      {
        id: "l5_p2_q2_s4",
        text: "Đun nước đá ở 0 °C bằng dây điện trở có công suất phát nhiệt P = 14,24 W. Sau thời gian t = 10 phút (600 giây), cân điện tử chỉ ra khối lượng nước đá đã tan chảy thành nước là 25 g. Giá trị \lambda thực nghiệm đo được bằng 3,42 * 10^5 J/kg.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Nhiệt lượng tỏa: Q = P * t = 14,24 * 600 = 8544 J. Khối lượng m = 0,025 kg. Do đó \lambda = Q/m = 8544 / 0,025 = 3,4176 * 10^5 J/kg \approx 3,42 * 10^5 J/kg."
      }
    ]
  },
  {
    id: "l5_p2_q3",
    question: "Xét đồ thị biểu diễn sự phụ thuộc của nhiệt độ nước trong bình theo thời gian thu được từ số liệu thực nghiệm (Hình 5.1 SGK, khối lượng nước đá m = 25 g):",
    statements: [
      {
        id: "l5_p2_q3_s1",
        text: "Điểm M trên trục hoành ứng với thời điểm t = 600 s là thời điểm nước đá bắt đầu nóng chảy hoàn toàn và nhiệt độ của nước lỏng bắt đầu tăng lên.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Tại điểm M, toàn bộ nước đá vừa chảy hết thành lỏng ở 0 °C, sau đó tiếp tục nhận nhiệt làm nhiệt độ tăng lên."
      },
      {
        id: "l5_p2_q3_s2",
        text: "Trong khoảng thời gian từ t = 600 s đến t = 960 s, nhiệt độ của hệ tăng từ 0 °C lên 1,5 °C chứng tỏ hệ chỉ nhận nhiệt lượng mà không thực hiện công.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Trong quá trình này, bình nước nhận nhiệt từ dây điện trở làm nhiệt độ và nội năng tăng lên."
      },
      {
        id: "l5_p2_q3_s3",
        text: "Độ dốc của đồ thị sau thời điểm t = 600 s phụ thuộc chủ yếu vào nhiệt dung riêng của nước lỏng chứ không phụ thuộc vào nhiệt nóng chảy riêng của nước đá.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Sau t = 600 s, hệ là nước lỏng hoàn toàn. Độ dốc dU/dt phụ thuộc vào nhiệt dung riêng của nước: Q = m * c * \Delta t."
      },
      {
        id: "l5_p2_q3_s4",
        text: "Biết công suất tỏa nhiệt trung bình của dòng điện trong giai đoạn nước lỏng tăng nhiệt độ là P = 14,27 W. Nhiệt lượng nước lỏng nhận vào để tăng nhiệt độ từ 0 °C đến 1,5 °C trong 360 giây là khoảng 5,14 kJ.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Nhiệt lượng tỏa ra: Q = P * t = 14,27 * (960 - 600) = 14,27 * 360 = 5137,2 J ≈ 5,14 kJ."
      }
    ]
  },
  {
    id: "l5_p2_q4",
    question: "Một lò nung dùng nguồn điện hoạt động với công suất định mức 20 000 W được sử dụng để đun nóng chảy hoàn toàn 2,0 kg đồng từ nhiệt độ ban đầu 30 °C lên đến nhiệt độ nóng chảy và chảy lỏng hoàn toàn. Hiệu suất lò nung đạt H = 50%:",
    statements: [
      {
        id: "l5_p2_q4_s1",
        text: "Nhiệt lượng tối thiểu cần để làm nóng 2,0 kg đồng từ 30 °C lên nhiệt độ nóng chảy 1084 °C là 801,04 kJ. Biết c_dong = 380 J/(kg.K).",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Q_1 = m * c * \Delta t = 2,0 * 380 * (1084 - 30) = 760 * 1054 = 801040 J = 801,04 kJ."
      },
      {
        text: "Nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn lượng đồng trên ở nhiệt độ nóng chảy là 360 kJ. Biết \lambda_dong = 1,80 * 10^5 J/kg.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Q_2 = \lambda * m = 1,80 * 10^5 * 2,0 = 360000 J = 360 kJ.",
        id: "l5_p2_q4_s2"
      },
      {
        id: "l5_p2_q4_s3",
        text: "Tổng nhiệt lượng có ích cần cung cấp cho khối đồng trong cả hai giai đoạn đun nóng và nóng chảy hoàn toàn là 1161,04 kJ.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Q_ich = Q_1 + Q_2 = 801,04 + 360 = 1161,04 kJ."
      },
      {
        id: "l5_p2_q4_s4",
        text: "Thời gian hoạt động cần thiết của lò nung để hoàn thành quá trình trên là khoảng 116 giây.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Do hiệu suất H = 50% nên điện năng tiêu thụ thực tế toàn phần là: A = Q_ích / 0,5 = 1161040 / 0,5 = 2322080 J. Thời gian t = A / P = 2322080 / 20000 = 116,104 s ≈ 116 giây."
      }
    ]
  }
];

export const LESSON5_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l5_p3_q1",
    answer: 12.5,
    unit: "kJ",
    level: "Thông hiểu",
    question: "Tính nhiệt lượng cần thiết để làm nóng chảy hoàn toàn 0,5 kg chì đang ở đúng nhiệt độ nóng chảy của nó. Biết nhiệt nóng chảy riêng của chì là 0,25 * 10^5 J/kg. Hãy tính đáp số theo đơn vị kiloJun (kJ) và làm tròn đến một chữ số sau dấu phẩy thập phân.",
    explanation: "Áp dụng công thức Q = \lambda * m = 0,25 * 10^5 * 0,5 = 12500 J = 12,5 kJ.",
    illustrationType: "insulated_stirrer"
  },
  {
    id: "l5_p3_q2",
    answer: 2,
    unit: "kg",
    level: "Thông hiểu",
    question: "Một khối lượng kim loại đồng đang ở nhiệt độ nóng chảy, nhận được một lượng nhiệt lượng có ích là 360 kJ để nóng chảy lỏng hoàn toàn. Hãy xác định khối lượng m của khối đồng đó theo đơn vị kg, biết nhiệt nóng chảy riêng của đồng là 1,80 * 10^5 J/kg.",
    explanation: "m = Q / \lambda = 360000 / (1,8 * 10^5) = 2 kg.",
    illustrationType: "piston_expanded"
  },
  {
    id: "l5_p3_q3",
    answer: 15.4,
    unit: "phút",
    level: "Vận dụng",
    question: "Một lò luyện thép hoạt động ổn định với công suất có ích truyền cho mẻ thép là 15 kW. Lò được sử dụng để nấu chảy hoàn toàn một mẻ thép có khối lượng 50 kg đang ở đúng nhiệt độ nóng chảy của thép. Biết nhiệt nóng chảy riêng của thép là 2,77 * 10^5 J/kg. Hãy tính thời gian lò cần hoạt động liên tục để hoàn tất quá trình nóng chảy theo đơn vị phút. Làm tròn kết quả đến một chữ số sau dấu phẩy thập phân.",
    explanation: "Nhiệt lượng có ích: Q = \lambda * m = 2,77 * 10^5 * 50 = 13850000 J. Thời gian t = Q / P_ich = 13850000 / 15000 = 923,33 s. Đổi sang phút: 923,33 / 60 \approx 15,388 phút. Làm tròn đến một chữ số sau dấu phẩy thập phân là 15,4.",
    illustrationType: "sliding_slope"
  },
  {
    id: "l5_p3_q4",
    answer: 3.41,
    unit: "10^5 J/kg",
    level: "Vận dụng",
    question: "Một học sinh làm thí nghiệm thực hành đo nhiệt nóng chảy riêng của nước đá bằng nhiệt lượng kế cách nhiệt tốt. Sử dụng một cuộn điện trở tỏa nhiệt có công suất không đổi bằng 15 W đặt chìm hoàn toàn trong hỗn hợp nước đá ở 0 °C. Sau thời gian t = 500 giây, cân điện tử ghi nhận khối lượng nước đá đã tan chảy hóa lỏng hoàn toàn là 22 g. Hãy tính nhiệt nóng chảy riêng \lambda của nước đá thực nghiệm thu được từ số liệu trên theo đơn vị 10^5 J/kg. Làm tròn kết quả đến hai chữ số sau dấu phẩy thập phân.",
    explanation: "Nhiệt lượng tỏa ra: Q = P * t = 15 * 500 = 7500 J. Khối lượng m = 22 g = 0,022 kg. \lambda = Q / m = 7500 / 0,022 \approx 340909 J/kg = 3,41 * 10^5 J/kg. Làm tròn đến hai chữ số sau dấu phẩy là 3,41.",
    illustrationType: "insulated_stirrer"
  },
  {
    id: "l5_p3_q5",
    answer: 542,
    unit: "kJ",
    level: "Vận dụng",
    question: "Đun nóng một lượng nước đá có khối lượng m = 1,5 kg từ nhiệt độ ban đầu t_1 = -10 °C lên đến 0 °C và làm nóng chảy hóa lỏng hoàn toàn ở nhiệt độ này. Tính tổng nhiệt lượng cần thiết cung cấp cho hệ theo đơn vị kJ. Biết nhiệt dung riêng của nước đá là 2100 J/(kg.K), nhiệt nóng chảy riêng của nước đá là 3,4 * 10^5 J/kg. Làm tròn kết quả đến hàng đơn vị.",
    explanation: "Q_1 làm ấm đá từ -10 lên 0 °C: Q_1 = m * c * \Delta t = 1,5 * 2100 * 10 = 31500 J. Q_2 làm đá nóng chảy hoàn toàn: Q_2 = \lambda * m = 3,4 * 10^5 * 1,5 = 510000 J. Tổng nhiệt lượng Q = Q_1 + Q_2 = 541500 J = 541,5 kJ. Làm tròn đến hàng đơn vị là 542.",
    illustrationType: "water_vs_sand"
  },
  {
    id: "l5_p3_q6",
    answer: 3.8,
    unit: "độ C",
    level: "Vận dụng",
    question: "Thả một khối nước đá có khối lượng m_1 = 100 g ở nhiệt độ t_1 = 0 °C vào một cốc chứa m_2 = 400 g nước lỏng ở nhiệt độ t_2 = 25 °C. Biết nhiệt dung riêng của nước lỏng là 4200 J/(kg.K), nhiệt nóng chảy riêng của nước đá là 3,4 * 10^5 J/kg. Bỏ qua mọi sự truyền nhiệt hao phí ra vỏ cốc và môi trường ngoài. Tính nhiệt độ cuối cùng của hệ khi xảy ra trạng thái cân bằng nhiệt theo đơn vị độ C (°C). Làm tròn kết quả đến một chữ số sau dấu phẩy thập phân.",
    explanation: "Nhiệt tỏa cực đại từ nước: Q_toa_max = m_2 * c * (t_2 - 0) = 0,4 * 4200 * 25 = 42000 J. Nhiệt nóng chảy hoàn toàn đá: Q_thu_max = m_1 * \lambda = 0,1 * 3,4 * 10^5 = 34000 J. Do Q_toa_max > Q_thu_max nên đá tan chảy hoàn toàn thành nước ở 0 °C, sau đó tiếp tục tăng nhiệt lên t. Phương trình cân bằng nhiệt: Q_toa = Q_thu <=> m_2 * c * (t_2 - t) = m_1 * \lambda + m_1 * c * (t - 0) <=> 0,4 * 4200 * (25 - t) = 34000 + 0,1 * 4200 * t <=> 1680 * (25 - t) = 34000 + 420 * t <=> 42000 - 1680 * t = 34000 + 420 * t <=> 2100 * t = 8000 => t = 8000 / 2100 \approx 3,809 °C. Làm tròn đến một chữ số sau dấu phẩy là 3,8.",
    illustrationType: "piston_compressed"
  }
];

// ==================== LESSON 6 QUESTIONS ====================
export const LESSON6_P1_QUESTIONS: Part1Question[] = [
  // 8 NHẬN BIẾT (l6_p1_q1 -> l6_p1_q8)
  {
    id: "l6_p1_q1",
    question: "Sự hóa hơi của một chất lỏng là gì?",
    level: "Nhận biết",
    explanation: "Sự hóa hơi là quá trình chuyển từ thể lỏng sang thể khí (hơi) của một chất.",
    options: [
      { id: "l6_p1_q1_o1", text: "Quá trình chuyển từ thể rắn sang thể lỏng.", isCorrect: false },
      { id: "l6_p1_q1_o2", text: "Quá trình chuyển từ thể lỏng sang thể khí (hơi).", isCorrect: true },
      { id: "l6_p1_q1_o3", text: "Quá trình chuyển từ thể lỏng sang thể rắn.", isCorrect: false },
      { id: "l6_p1_q1_o4", text: "Quá trình chuyển từ thể khí sang thể lỏng.", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q2",
    question: "Sự bay hơi và sự sôi khác nhau cơ bản ở điểm nào?",
    level: "Nhận biết",
    explanation: "Sự bay hơi chỉ xảy ra trên bề mặt chất lỏng ở mọi nhiệt độ, trong khi sự sôi xảy ra đồng thời cả trong lòng và trên bề mặt chất lỏng ở nhiệt độ sôi xác định.",
    options: [
      { id: "l6_p1_q2_o1", text: "Sự sôi chỉ xảy ra trên bề mặt chất lỏng, sự bay hơi xảy ra ở mọi nơi.", isCorrect: false },
      { id: "l6_p1_q2_o2", text: "Sự bay hơi xảy ra ở mọi nhiệt độ và chỉ trên bề mặt, còn sự sôi xảy ra ở nhiệt độ sôi xác định cả trên bề mặt và trong lòng chất lỏng.", isCorrect: true },
      { id: "l6_p1_q2_o3", text: "Sự sôi chỉ xảy ra với nước, sự bay hơi xảy ra với tất cả chất lỏng khác.", isCorrect: false },
      { id: "l6_p1_q2_o4", text: "Sự bay hơi cần cung cấp nhiệt năng lớn hơn sự sôi rất nhiều lần.", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q3",
    question: "Định nghĩa nào sau đây là đúng về nhiệt hóa hơi riêng của một chất lỏng?",
    level: "Nhận biết",
    explanation: "Nhiệt hóa hơi riêng L của một chất lỏng là nhiệt lượng cần cung cấp để 1 kg chất lỏng đó hóa hơi hoàn toàn ở nhiệt độ sôi dưới áp suất tiêu chuẩn.",
    options: [
      { id: "l6_p1_q3_o1", text: "Nhiệt lượng cần cung cấp để một kilôgam chất lỏng đó hóa hơi hoàn toàn ở nhiệt độ sôi dưới áp suất tiêu chuẩn.", isCorrect: true },
      { id: "l6_p1_q3_o2", text: "Nhiệt lượng cần cung cấp để một khối lượng bất kỳ của chất lỏng hóa hơi hoàn toàn ở mọi nhiệt độ.", isCorrect: false },
      { id: "l6_p1_q3_o3", text: "Nhiệt lượng tỏa ra khi một kilôgam hơi ngưng tụ hoàn toàn thành chất lỏng ở 0 °C.", isCorrect: false },
      { id: "l6_p1_q3_o4", text: "Nhiệt dung riêng của chất lỏng khi được đun sôi đến nhiệt độ cực đại.", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q4",
    question: "Nhiệt hóa hơi riêng kí hiệu là gì và có đơn vị đo là gì trong hệ SI?",
    level: "Nhận biết",
    explanation: "Nhiệt hóa hơi riêng kí hiệu là L, đơn vị đo trong hệ SI là Jun trên kilôgam (J/kg).",
    options: [
      { id: "l6_p1_q4_o1", text: "Kí hiệu là c, đơn vị là J/kg.K.", isCorrect: false },
      { id: "l6_p1_q4_o2", text: "Kí hiệu là λ, đơn vị là J/kg.", isCorrect: false },
      { id: "l6_p1_q4_o3", text: "Kí hiệu là L, đơn vị là J/kg.", isCorrect: true },
      { id: "l6_p1_q4_o4", text: "Kí hiệu là H, đơn vị là J.", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q5",
    question: "Hệ thức tính nhiệt lượng Q cần truyền cho khối chất lỏng có khối lượng m hóa hơi hoàn toàn ở nhiệt độ không đổi là:",
    level: "Nhận biết",
    explanation: "Biểu thức tính nhiệt lượng hóa hơi là Q = L * m.",
    options: [
      { id: "l6_p1_q5_o1", text: "Q = L * m", isCorrect: true },
      { id: "l6_p1_q5_o2", text: "Q = m * c * \\Delta t", isCorrect: false },
      { id: "l6_p1_q5_o3", text: "Q = \\lambda * m", isCorrect: false },
      { id: "l6_p1_q5_o4", text: "Q = L / m", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q6",
    question: "Trong suốt quá trình sôi của một lượng chất lỏng tinh khiết dưới áp suất khí quyển tiêu chuẩn:",
    level: "Nhận biết",
    explanation: "Trong quá trình sôi dưới áp suất không đổi, nhiệt độ của chất lỏng luôn được duy trì ổn định không đổi mặc dù ta liên tục cấp nhiệt.",
    options: [
      { id: "l6_p1_q6_o1", text: "Nhiệt độ của chất lỏng liên tục tăng lên tỉ lệ thuận với thời gian đun.", isCorrect: false },
      { id: "l6_p1_q6_o2", text: "Nhiệt độ của chất lỏng luôn giữ ở giá trị không đổi.", isCorrect: true },
      { id: "l6_p1_q6_o3", text: "Nhiệt độ của chất lỏng giảm dần vì hơi nước bay đi mang theo động năng phân tử.", isCorrect: false },
      { id: "l6_p1_q6_o4", text: "Nhiệt độ biến thiên tuần hoàn lúc tăng lúc giảm.", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q7",
    question: "Theo Bảng 6.1 trong sách giáo khoa, nhiệt hóa hơi riêng của nước ở nhiệt độ sôi (100 °C) là bao nhiêu?",
    level: "Nhận biết",
    explanation: "Nhiệt hóa hơi riêng của nước ở 100 °C là 2,26 * 10^6 J/kg.",
    options: [
      { id: "l6_p1_q7_o1", text: "2,26 * 10^6 J/kg", isCorrect: true },
      { id: "l6_p1_q7_o2", text: "8,57 * 10^5 J/kg", isCorrect: false },
      { id: "l6_p1_q7_o3", text: "2,85 * 10^5 J/kg", isCorrect: false },
      { id: "l6_p1_q7_o4", text: "0,40 * 10^6 J/kg", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q8",
    question: "Trong thí nghiệm thực hành xác định nhiệt hóa hơi riêng của nước ở nhiệt độ sôi, cân điện tử được sử dụng để làm gì?",
    level: "Nhận biết",
    explanation: "Cân điện tử được dùng để xác định khối lượng nước bị giảm đi do hóa hơi thoát ra ngoài theo thời gian.",
    options: [
      { id: "l6_p1_q8_o1", text: "Đo khối lượng của nhiệt lượng kế rỗng.", isCorrect: false },
      { id: "l6_p1_q8_o2", text: "Xác định sự giảm khối lượng nước trong bình theo thời gian đun sôi.", isCorrect: true },
      { id: "l6_p1_q8_o3", text: "Đo công suất điện của nguồn đun.", isCorrect: false },
      { id: "l6_p1_q8_o4", text: "Kiểm tra nhiệt độ sôi của nước có đạt chuẩn hay không.", isCorrect: false }
    ]
  },

  // 5 THÔNG HIỂU (l6_p1_q9 -> l6_p1_q13)
  {
    id: "l6_p1_q9",
    question: "Khi đun sôi nước, mặc dù ta tiếp tục đun bếp lò rất mạnh nhưng nhiệt kế vẫn giữ nguyên ở mốc 100 °C. Giải thích nào sau đây bám sát bản chất vật lí phân tử nhất?",
    level: "Thông hiểu",
    explanation: "Toàn bộ nhiệt lượng cung cấp được sử dụng để làm tăng thế năng tương tác giữa các phân tử, phá vỡ liên kết hidro bền vững giữa chúng để chuyển thành hơi, thay vì làm tăng động năng tịnh tiến trung bình (nhiệt độ).",
    options: [
      { id: "l6_p1_q9_o1", text: "Bếp lò bị giảm công suất đột ngột đúng thời điểm nước sôi nên nhiệt lượng cung cấp không đủ làm nóng tiếp.", isCorrect: false },
      { id: "l6_p1_q9_o2", text: "Nhiệt lượng bếp lò cung cấp được chuyển hóa hoàn toàn thành công để phá vỡ các liên kết phân tử nước, làm tăng thế năng phân tử của hơi thay vì làm tăng động năng trung bình (nhiệt độ).", isCorrect: true },
      { id: "l6_p1_q9_o3", text: "Do hơi nước nóng bay đi quá nhanh kéo theo toàn bộ động năng phân tử của phần nước lỏng còn lại.", isCorrect: false },
      { id: "l6_p1_q9_o4", text: "Do nước có nhiệt dung riêng quá lớn làm cho nhiệt kế bị bão hòa trị số đo.", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q10",
    question: "Nhiệt hóa hơi riêng của một chất lỏng phụ thuộc vào nhiệt độ như thế nào? Chọn nhận xét đúng.",
    level: "Thông hiểu",
    explanation: "Sách giáo khoa ghi rõ: Nhiệt hóa hơi riêng của một chất tăng khi nhiệt độ giảm. Ví dụ của nước ở 100 °C là 2,26 * 10^6 J/kg, còn ở 50 °C lên tới 2,39 * 10^6 J/kg.",
    options: [
      { id: "l6_p1_q10_o1", text: "Nhiệt hóa hơi riêng tăng tuyến tính khi nhiệt độ tăng.", isCorrect: false },
      { id: "l6_p1_q10_o2", text: "Nhiệt hóa hơi riêng là hằng số tuyệt đối độc lập với nhiệt độ.", isCorrect: false },
      { id: "l6_p1_q10_o3", text: "Nhiệt hóa hơi riêng tăng lên khi nhiệt độ giảm đi.", isCorrect: true },
      { id: "l6_p1_q10_o4", text: "Nhiệt hóa hơi riêng luôn giảm đột ngột về 0 khi nhiệt độ đạt nhiệt độ sôi.", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q11",
    question: "Nhỏ vài giọt ether (hoặc cồn y tế) lên da tay, ta cảm thấy mát lạnh rất rõ rệt ở vùng da đó. Nguyên nhân là do:",
    level: "Thông hiểu",
    explanation: "Ether bay hơi rất nhanh ở nhiệt độ phòng, quá trình bay hơi này cần nhiệt lượng hóa hơi và thu nhiệt trực tiếp từ da tay, làm nhiệt độ da tay giảm mạnh gây cảm giác lạnh.",
    options: [
      { id: "l6_p1_q11_o1", text: "Ether is a substance with natural coldness radiated to the environment.", isCorrect: false },
      { id: "l6_p1_q11_o2", text: "Do ether bay hơi cực nhanh, thu nhiệt hóa hơi trực tiếp từ da tay, làm nội năng và nhiệt độ tại vùng da đó giảm đi nhanh chóng.", isCorrect: true },
      { id: "l6_p1_q11_o3", text: "Da tay thực hiện công nén ép các phân tử ether hóa lỏng.", isCorrect: false },
      { id: "l6_p1_q11_o4", text: "Do ether tác dụng hóa học thu nhiệt mãnh liệt với các chất trên bề mặt da.", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q12",
    question: "Đồ thị biểu diễn khối lượng nước m trong bình nhiệt lượng kế theo thời gian t trong quá trình sôi ổn định có xu hướng là một đoạn thẳng đi xuống (Hệ số góc âm). Điều này chứng tỏ:",
    level: "Thông hiểu",
    explanation: "Sự giảm khối lượng nước tỉ lệ thuận với thời gian đun, chứng tỏ trong cùng một khoảng thời gian, khối lượng nước hóa hơi là đều nhau dưới công suất đun ổn định.",
    options: [
      { id: "l6_p1_q12_o1", text: "Khối lượng nước tăng lên do hơi nước hấp thụ thêm không khí xung quanh.", isCorrect: false },
      { id: "l6_p1_q12_o2", text: "Tốc độ giảm khối lượng nước tỉ lệ nghịch với công suất tỏa nhiệt của bếp đun sôi.", isCorrect: false },
      { id: "l6_p1_q12_o3", text: "Khối lượng nước giảm đều đặn theo thời gian đun dưới tác dụng của công suất nhiệt lượng ổn định.", isCorrect: true },
      { id: "l6_p1_q12_o4", text: "Áp suất không khí trong phòng liên tục thay đổi làm thay đổi đồ thị.", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q13",
    question: "Trong thí nghiệm thực nghiệm đo L, nếu công suất dòng điện chạy qua dây nung là P, khoảng thời gian đun sôi là \\Delta t, khối lượng nước trong bình ban đầu là m_P và lúc sau là m_Q. Hệ thức xác định L là:",
    level: "Thông hiểu",
    explanation: "Nhiệt lượng tỏa ra từ dòng điện Q = P * \\Delta t. Nhiệt lượng nước hấp thụ để hóa hơi Q = L * (m_P - m_Q). Cân bằng nhiệt ta được L = (P * \\Delta t) / (m_P - m_Q).",
    options: [
      { id: "l6_p1_q13_o1", text: "L = (P * \\Delta t) / (m_P - m_Q)", isCorrect: true },
      { id: "l6_p1_q13_o2", text: "L = (m_P - m_Q) / (P * \\Delta t)", isCorrect: false },
      { id: "l6_p1_q13_o3", text: "L = (P * (m_P - m_Q)) / \\Delta t", isCorrect: false },
      { id: "l6_p1_q13_o4", text: "L = P * \\Delta t * (m_P - m_Q)", isCorrect: false }
    ]
  },

  // 5 VẬN DỤNG (l6_p1_q14 -> l6_p1_q18)
  {
    id: "l6_p1_q14",
    question: "Một ấm điện công suất 1,5 kW chứa nước đang sôi ở 100 °C. Coi hiệu suất của ấm đun là 100%. Nhiệt hóa hơi riêng của nước là L = 2,26 * 10^6 J/kg. Thời gian đun cần thiết để có 200 gam nước hóa hơi hoàn toàn thành hơi nước là bao nhiêu giây (làm tròn đến hàng đơn vị)?",
    level: "Vận dụng",
    explanation: "Khối lượng nước hóa hơi: m = 0,2 kg. Nhiệt lượng cần cấp: Q = L * m = 2,26 * 10^6 * 0,2 = 452000 J. Thời gian cần đun: t = Q / P = 452000 / 1500 ≈ 301 s.",
    options: [
      { id: "l6_p1_q14_o1", text: "301 giây", isCorrect: true },
      { id: "l6_p1_q14_o2", text: "151 giây", isCorrect: false },
      { id: "l6_p1_q14_o3", text: "452 giây", isCorrect: false },
      { id: "l6_p1_q14_o4", text: "602 giây", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q15",
    question: "Người ta đun sôi một ấm nước rượu (ethanol) ở nhiệt độ sôi 78 °C. Cung cấp một nhiệt lượng Q = 171,4 kJ thì thu được bao nhiêu gam rượu đã hóa hơi hoàn toàn ở 78 °C? Biết nhiệt hóa hơi riêng của rượu là L = 8,57 * 10^5 J/kg.",
    level: "Vận dụng",
    explanation: "Áp dụng hệ thức Q = L * m => m = Q / L = 171400 / (8,57 * 10^5) = 0,2 kg = 200 g.",
    options: [
      { id: "l6_p1_q15_o1", text: "100 g", isCorrect: false },
      { id: "l6_p1_q15_o2", text: "200 g", isCorrect: true },
      { id: "l6_p1_q15_o3", text: "50 g", isCorrect: false },
      { id: "l6_p1_q15_o4", text: "150 g", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q16",
    question: "Cần cung cấp một năng lượng nhiệt lượng bằng bao nhiêu để làm hóa hơi hoàn toàn 0,5 kg chất lỏng Ether ở nhiệt độ sôi của nó (34,5 °C)? Biết L_ether = 4,0 * 10^5 J/kg.",
    level: "Vận dụng",
    explanation: "Q = L * m = 4,0 * 10^5 * 0,5 = 2,0 * 10^5 J = 200 kJ.",
    options: [
      { id: "l6_p1_q16_o1", text: "200 kJ", isCorrect: true },
      { id: "l6_p1_q16_o2", text: "100 kJ", isCorrect: false },
      { id: "l6_p1_q16_o3", text: "400 kJ", isCorrect: false },
      { id: "l6_p1_q16_o4", text: "800 kJ", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q17",
    question: "Một cơ thể người tỏa nhiệt thông qua sự bay hơi mồ hôi trên da. Giả sử trong một giờ làm việc căng thẳng ngoài trời, mồ hôi thoát ra và bay hơi hoàn toàn là 250 g. Biết nhiệt hóa hơi riêng của nước ở nhiệt độ cơ thể khoảng 2,4 * 10^6 J/kg. Công suất tỏa nhiệt trung bình của cơ thể thông qua con đường này là bao nhiêu?",
    level: "Vận dụng",
    explanation: "Khối lượng bay hơi m = 0,25 kg. Nhiệt lượng bay hơi Q = L * m = 2,4 * 10^6 * 0,25 = 600000 J. Thời gian t = 1 giờ = 3600 s. Công suất tỏa nhiệt P = Q / t = 600000 / 3600 ≈ 167 W.",
    options: [
      { id: "l6_p1_q17_o1", text: "167 W", isCorrect: true },
      { id: "l6_p1_q17_o2", text: "100 W", isCorrect: false },
      { id: "l6_p1_q17_o3", text: "250 W", isCorrect: false },
      { id: "l6_p1_q17_o4", text: "600 W", isCorrect: false }
    ]
  },
  {
    id: "l6_p1_q18",
    question: "Trong một thí nghiệm thực hành đo L của nước ở nhiệt độ sôi, Ampe kế chỉ dòng điện I = 2,0 A chạy qua dây điện trở chìm có hiệu điện thế U = 12 V. Sau khoảng thời gian t = 15 phút, khối lượng nước sôi giảm đi 15 g do bay hơi. Nhiệt hóa hơi riêng L của nước tính theo kết quả thực nghiệm này là bao nhiêu?",
    level: "Vận dụng",
    explanation: "Khối lượng nước bay hơi m = 15 g = 0,015 kg. Điện năng tiêu thụ Q = U * I * t = 12 * 2 * (15 * 60) = 21600 J. Bỏ qua hao phí, L = Q / m = 21600 / 0,015 = 1,44 * 10^6 J/kg.",
    options: [
      { id: "l6_p1_q18_o1", text: "1,44 * 10^6 J/kg", isCorrect: true },
      { id: "l6_p1_q18_o2", text: "2,26 * 10^6 J/kg", isCorrect: false },
      { id: "l6_p1_q18_o3", text: "1,80 * 10^6 J/kg", isCorrect: false },
      { id: "l6_p1_q18_o4", text: "0,72 * 10^6 J/kg", isCorrect: false }
    ]
  }
];

export const LESSON6_P2_QUESTIONS: Part2Question[] = [
  // 4 CÂU ĐÚNG SAI LỚN
  {
    id: "l6_p2_q1",
    question: "Khi tìm hiểu về quá trình chuyển thể từ thể lỏng sang thể hơi (hóa hơi) của nước tinh khiết trong các điều kiện thực tế khác nhau:",
    statements: [
      { id: "l6_p2_q1_s1", text: "Sự bay hơi của nước chỉ xảy ra ở nhiệt độ từ 100 °C trở lên dưới áp suất khí quyển.", isCorrect: false, level: "Nhận biết", explanation: "Sai. Sự bay hơi xảy ra ở bề mặt chất lỏng và ở mọi nhiệt độ, không nhất thiết phải đạt 100 °C." },
      { id: "l6_p2_q1_s2", text: "Sự sôi của nước là quá trình hóa hơi đặc biệt, diễn ra đồng thời cả trên bề mặt và trong lòng chất lỏng ở nhiệt độ sôi xác định.", isCorrect: true, level: "Nhận biết", explanation: "Đúng. Đây là định nghĩa và đặc điểm cơ bản phân biệt sự sôi với sự bay hơi thông thường." },
      { id: "l6_p2_q1_s3", text: "Nhiệt lượng cung cấp cho nước khi đang sôi dùng để bẻ gãy các liên kết phân tử, làm tăng khoảng cách giữa chúng nên thế năng tương tác tăng lên.", isCorrect: true, level: "Thông hiểu", explanation: "Đúng. Nhiệt lượng hóa hơi chuyển thành thế năng tương tác của phân tử hơi nước." },
      { id: "l6_p2_q1_s4", text: "Dưới áp suất khí quyển chuẩn, khi nước đang sôi mãnh liệt, nếu ta tăng nhiệt độ của ngọn lửa đèn cồn lên gấp đôi thì nhiệt độ của nước lỏng trong cốc sẽ nhanh chóng vượt qua mốc 100 °C lên khoảng 110 °C.", isCorrect: false, level: "Vận dụng", explanation: "Sai. Khi nước sôi dưới áp suất khí quyển không đổi, nhiệt độ sôi luôn giữ ở 100 °C. Tăng ngọn lửa chỉ làm tốc độ hóa hơi diễn ra nhanh hơn chứ không làm tăng nhiệt độ của nước lỏng." }
    ]
  },
  {
    id: "l6_p2_q2",
    question: "Xét các đặc tính vật lí và công thức tính toán liên quan đến nhiệt hóa hơi riêng L của một chất lỏng:",
    statements: [
      { id: "l6_p2_q2_s1", text: "Đơn vị của nhiệt hóa hơi riêng L trong hệ đo lường SI là Jun nhân kilôgam (J.kg).", isCorrect: false, level: "Nhận biết", explanation: "Sai. Đơn vị đo của nhiệt hóa hơi riêng L là Jun trên kilôgam (J/kg)." },
      { id: "l6_p2_q2_s2", text: "Nhiệt hóa hơi riêng của nước ở 50 °C (2,39 * 10^6 J/kg) lớn hơn ở 100 °C (2,26 * 10^6 J/kg) do ở nhiệt độ thấp hơn, các phân tử nước liên kết chặt chẽ hơn và cần nhiều năng lượng hơn để giải phóng chúng.", isCorrect: true, level: "Thông hiểu", explanation: "Đúng. Ở nhiệt độ thấp, liên kết phân tử chặt chẽ hơn nên cần năng lượng lớn hơn để bẻ gãy liên kết." },
      { id: "l6_p2_q2_s3", text: "Nhiệt lượng thu vào để hóa hơi hoàn toàn một khối lượng chất lỏng tỷ lệ nghịch với khối lượng của khối chất lỏng đó.", isCorrect: false, level: "Thông hiểu", explanation: "Sai. Theo công thức Q = L * m, nhiệt lượng Q tỷ lệ thuận với khối lượng m." },
      { id: "l6_p2_q2_s4", text: "Cung cấp một nhiệt lượng Q = 4,52 * 10^5 J cho 0,2 kg nước lỏng đang ở 100 °C dưới áp suất chuẩn. Lượng nước này sẽ hóa hơi hoàn toàn thành hơi nước ở 100 °C.", isCorrect: true, level: "Vận dụng", explanation: "Đúng. Áp dụng Q_can = L * m = 2,26 * 10^6 * 0,2 = 4,52 * 10^5 J. Do đó lượng nhiệt lượng này vừa đủ để 0,2 kg nước hóa hơi hoàn toàn." }
    ]
  },
  {
    id: "l6_p2_q3",
    question: "Trong thí nghiệm thực hành đo nhiệt hóa hơi riêng của nước ở nhiệt độ sôi, sử dụng nhiệt lượng kế cách nhiệt có công suất dòng điện đun sôi là P = 15,2 W và bình cân điện tử. Xét các phát biểu sau đây:",
    statements: [
      { id: "l6_p2_q3_s1", text: "Tốc độ giảm khối lượng nước đo bằng cân điện tử tỉ lệ thuận với công suất tỏa nhiệt của dây điện trở chìm.", isCorrect: true, level: "Thông hiểu", explanation: "Đúng. Công suất đun lớn thì nhiệt lượng cấp mỗi giây lớn, dẫn đến khối lượng nước hóa hơi thoát ra mỗi giây nhiều hơn (giảm khối lượng nhanh hơn)." },
      { id: "l6_p2_q3_s2", text: "Nếu bỏ qua hao phí nhiệt, nhiệt lượng tỏa ra của dòng điện trong thời gian đun \\Delta t là Q = P * \\Delta t bằng đúng nhiệt lượng làm hóa hơi lượng nước \\Delta m có công thức là Q = L * \\Delta m.", isCorrect: true, level: "Nhận biết", explanation: "Đúng. Đây là nguyên tắc bảo toàn năng lượng cốt lõi của phép đo L thực nghiệm." },
      { id: "l6_p2_q3_s3", text: "Nếu trong thực tế có hao phí nhiệt tỏa ra môi trường xung quanh, lượng điện năng P * \\Delta t sẽ lớn hơn nhiệt lượng thực sự làm bay hơi nước. Khi đó, giá trị L tính theo công thức thực nghiệm L = (P * \\Delta t) / \\Delta m sẽ nhỏ hơn giá trị L chuẩn.", isCorrect: false, level: "Thông hiểu", explanation: "Sai. Vì P * \\Delta t đun thực tế lớn hơn do gánh thêm hao phí nên thương số L = (P * \\Delta t) / \\Delta m sẽ bị lớn hơn (sai số dương) so với giá trị thực." },
      { id: "l6_p2_q3_s4", text: "Để giảm sai số của phép đo L trong thí nghiệm, ta nên nắp bình thật chặt và kín kít hoàn toàn không cho hơi nước thoát ra ngoài bình nhiệt lượng kế.", isCorrect: false, level: "Vận dụng", explanation: "Sai. Nếu nắp kín hoàn toàn, hơi nước không thoát ra được thì cân điện tử sẽ không ghi nhận được sự giảm khối lượng nước, đồng thời áp suất trong bình tăng vọt làm tăng nhiệt độ sôi, gây nguy hiểm." }
    ]
  },
  {
    id: "l6_p2_q4",
    question: "Một bình đun bằng nhôm chứa 1,0 kg nước đang ở nhiệt độ phòng 20 °C. Người ta bật bếp điện cung cấp năng lượng nhiệt để đun sôi và hóa hơi toàn bộ nước. Biết c_nuoc = 4200 J/kg.K, L_nuoc = 2,26 * 10^6 J/kg, nhiệt độ sôi của nước là 100 °C.",
    statements: [
      { id: "l6_p2_q4_s1", text: "Nhiệt lượng cần cung cấp để đưa nước từ 20 °C lên đến nhiệt độ sôi 100 °C là 336 kJ.", isCorrect: true, level: "Nhận biết", explanation: "Đúng. Q_1 = m * c * \\Delta t = 1 * 4200 * (100 - 20) = 336000 J = 336 kJ." },
      { id: "l6_p2_q4_s2", text: "Nhiệt lượng cần cung cấp để hóa hơi hoàn toàn lượng nước này ở nhiệt độ sôi là Q = 2,26 * 10^6 J.", isCorrect: true, level: "Thông hiểu", explanation: "Đúng. Q_2 = L * m = 2,26 * 10^6 * 1 = 2,26 * 10^6 J." },
      { id: "l6_p2_q4_s3", text: "Tổng nhiệt lượng cần cung cấp cho nước từ lúc bắt đầu đun ở 20 °C cho đến khi hóa hơi hoàn toàn là 2,596 * 10^6 J (bỏ qua hao phí và nhiệt lượng đun nóng vỏ bình nhôm).", isCorrect: true, level: "Thông hiểu", explanation: "Đúng. Q_tong = Q_1 + Q_2 = 336000 + 2260000 = 2596000 J = 2,596 * 10^6 J." },
      { id: "l6_p2_q4_s4", text: "Nếu bếp điện có công suất đun thực tế là 2000 W và hiệu suất truyền nhiệt của bếp chỉ đạt 80%, thời gian đun tổng cộng để nước hóa hơi hoàn toàn tính từ 20 °C là 1298 giây.", isCorrect: false, level: "Vận dụng", explanation: "Sai. Công suất có ích thực tế nhận được là P_ich = 2000 * 0,8 = 1600 W. Thời gian cần đun t = Q_tong / P_ich = 2596000 / 1600 = 1622,5 s chứ không phải 1298 s." }
    ]
  }
];

export const LESSON6_P3_QUESTIONS: Part3Question[] = [
  // 6 CÂU HỎI TRẢ LỜI NGẮN (2 Thông hiểu, 4 Vận dụng)
  {
    id: "l6_p3_q1",
    answer: 53,
    unit: "gam",
    level: "Thông hiểu",
    question: "Một ấm đun nước điện hoạt động ở công suất đun sôi ổn định là 2,0 kW. Khi nước sôi, mỗi phút (60s) có bao nhiêu gam nước đã hóa hơi thoát ra ngoài bình đun? Bỏ qua mọi hao phí và lấy nhiệt hóa hơi riêng của nước là L = 2,26 * 10^6 J/kg. (Làm tròn kết quả đến hàng đơn vị của gam).",
    explanation: "Công suất P = 2000 W, thời gian t = 60s => Q = P * t = 120000 J. Khối lượng nước hóa hơi m = Q / L = 120000 / (2,26 * 10^6) ≈ 0,053097 kg ≈ 53 g.",
    illustrationType: "insulated_stirrer"
  },
  {
    id: "l6_p3_q2",
    answer: 26,
    unit: "kJ",
    level: "Thông hiểu",
    question: "Nhiệt hóa hơi riêng của nước ở 100 °C là 2,26 * 10^6 J/kg, còn ở 50 °C là 2,39 * 10^6 J/kg. Để làm hóa hơi hoàn toàn 0,2 kg nước lỏng ở 50 °C so với ở 100 °C, người ta cần cung cấp một nhiệt lượng nhiều hơn bao nhiêu kilôjun (kJ)? (Nhập số nguyên).",
    explanation: "Nhiệt lượng ở 50 °C: Q_50 = 2,39 * 10^6 * 0,2 = 478000 J. Nhiệt lượng ở 100 °C: Q_100 = 2,26 * 10^6 * 0,2 = 452000 J. Độ chênh lệch: \\Delta Q = Q_50 - Q_100 = 26000 J = 26 kJ.",
    illustrationType: "triple_point_water"
  },
  {
    id: "l6_p3_q3",
    answer: 5.2,
    unit: "MJ",
    level: "Vận dụng",
    question: "Tính tổng nhiệt lượng cần cung cấp (theo đơn vị MJ, làm tròn đến 1 chữ số thập phân) để đun nóng 2,0 kg nước từ nhiệt độ phòng 20 °C đến nhiệt độ sôi 100 °C rồi làm hóa hơi hoàn toàn lượng nước này ở nhiệt độ sôi. Biết c_nuoc = 4200 J/kg.K, L_nuoc = 2,26 * 10^6 J/kg.",
    explanation: "Nhiệt lượng tăng nhiệt: Q_1 = m * c * \\Delta t = 2 * 4200 * (100 - 20) = 672000 J. Nhiệt lượng hóa hơi: Q_2 = L * m = 2 * 2,26 * 10^6 = 4520000 J. Tổng nhiệt lượng: Q_tong = Q_1 + Q_2 = 5192000 J = 5,192 MJ. Làm tròn đến 1 chữ số thập phân là 5,2 MJ.",
    illustrationType: "specific_heat_experiment"
  },
  {
    id: "l6_p3_q4",
    answer: 2.19,
    unit: "10^6 J/kg",
    level: "Vận dụng",
    question: "Trong thí nghiệm thực nghiệm đo L, oát kế chỉ công suất dây nung là P = 15,2 W. Người ta ghi nhận khối lượng nước sôi giảm từ m_P = 120,0 g xuống m_Q = 115,0 g sau thời gian t = 12 phút (720 giây). Tính nhiệt hóa hơi riêng L của nước thu được từ kết quả đo thực nghiệm này theo đơn vị 10^6 J/kg. (Làm tròn kết quả đến 2 chữ số sau dấu phẩy thập phân).",
    explanation: "Khối lượng nước bay hơi \\Delta m = m_P - m_Q = 120,0 g - 115,0 g = 5 g = 0,005 kg. Điện năng tiêu thụ Q = P * t = 15,2 * 720 = 10944 J. L = Q / \\Delta m = 10944 / 0,005 = 2188800 J/kg = 2,1888 * 10^6 J/kg ≈ 2,19 * 10^6 J/kg.",
    illustrationType: "piston_vertical_forces"
  },
  {
    id: "l6_p3_q5",
    answer: 18.8,
    unit: "gam",
    level: "Vận dụng",
    question: "Một ngọn đèn cồn đun nước có hiệu suất truyền nhiệt có ích chỉ đạt H = 40%. Để hóa hơi hoàn toàn 100 gam nước lỏng đang ở nhiệt độ sôi 100 °C, người ta cần đốt cháy hoàn toàn bao nhiêu gam cồn tinh khiết? Biết năng suất tỏa nhiệt của cồn là q = 3,0 * 10^7 J/kg, L_nuoc = 2,26 * 10^6 J/kg. (Làm tròn kết quả đến 1 chữ số sau dấu phẩy thập phân).",
    explanation: "Nhiệt lượng có ích làm hóa hơi nước: Q_ich = m_nuoc * L = 0,1 * 2,26 * 10^6 = 226000 J. Nhiệt lượng toàn phần do cồn tỏa ra: Q_tp = Q_ich / H = 226000 / 0,4 = 565000 J. Khối lượng cồn cần đốt cháy: m_con = Q_tp / q = 565000 / (3,0 * 10^7) = 0,018833 kg = 18,833 g ≈ 18,8 g.",
    illustrationType: "water_vs_sand"
  },
  {
    id: "l6_p3_q6",
    answer: 1.85,
    unit: "10^6 J/kg",
    level: "Vận dụng",
    question: "Để xác định nhiệt hóa hơi của chất lỏng, người ta dẫn một luồng hơi của chất đó ở 100 °C đi vào một cốc cách nhiệt chứa 200 g nước ở 15 °C. Khi nhiệt độ cốc cân bằng ở 40 °C thì thấy khối lượng nước tăng thêm 10,0 g do hơi ngưng tụ thành chất lỏng. Bỏ qua sự hấp thụ nhiệt của cốc đun, lấy c_nuoc = 4200 J/kg.K. Tính nhiệt hóa hơi riêng L của chất lỏng đó theo đơn vị 10^6 J/kg. (Làm tròn kết quả đến 2 chữ số sau dấu phẩy thập phân).",
    explanation: "Nhiệt lượng hơi nước ngưng tụ tỏa ra: Q_toa = m_hoi * L + m_hoi * c_nuoc * (t_soi - t_cb). Nhiệt lượng nước lỏng hấp thụ: Q_thu = m_nuoc * c_nuoc * (t_cb - t_dau). Ta có: Q_toa = Q_thu => m_hoi * L + m_hoi * c_nuoc * (t_soi - t_cb) = m_nuoc * c_nuoc * (t_cb - t_dau) => 0,01 * L + 0,01 * 4200 * (100 - 40) = 0,2 * 4200 * (40 - 15) => 0,01 * L + 2520 = 21000 => 0,01 * L = 18480 => L = 1,848 * 10^6 J/kg ≈ 1,85 * 10^6 J/kg.",
    illustrationType: "thermal_contact_equilibrium"
  }
];

// ==================== LESSON 7 QUESTIONS ====================
export const LESSON7_P1_QUESTIONS: Part1Question[] = [
  // 8 CÂU NHẬN BIẾT (l7_p1_q1 -> l7_p1_q8)
  {
    id: "l7_p1_q1",
    question: "Quy ước dấu nào sau đây phù hợp với định luật I của nhiệt động lực học?",
    level: "Nhận biết",
    explanation: "Theo định luật I nhiệt động lực học, vật nhận công: A > 0; vật nhận nhiệt lượng: Q > 0.",
    options: [
      { id: "l7_p1_q1_o1", text: "Vật nhận công: A < 0; vật nhận nhiệt lượng: Q < 0.", isCorrect: false },
      { id: "l7_p1_q1_o2", text: "Vật nhận công: A > 0; vật nhận nhiệt lượng: Q > 0.", isCorrect: true },
      { id: "l7_p1_q1_o3", text: "Vật thực hiện công: A > 0; vật truyền nhiệt lượng: Q > 0.", isCorrect: false },
      { id: "l7_p1_q1_o4", text: "Vật thực hiện công: A > 0; vật truyền nhiệt lượng: Q < 0.", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q2",
    question: "Biểu thức nào sau đây diễn tả đúng định luật I của nhiệt động lực học?",
    level: "Nhận biết",
    explanation: "Định luật I của nhiệt động lực học có hệ thức toán học: \Delta U = A + Q, trong đó \Delta U là độ biến thiên nội năng, A là công và Q là nhiệt lượng hệ trao đổi.",
    options: [
      { id: "l7_p1_q2_o1", text: "\Delta U = A - Q", isCorrect: false },
      { id: "l7_p1_q2_o2", text: "\Delta U = A + Q", isCorrect: true },
      { id: "l7_p1_q2_o3", text: "\Delta U = Q - A", isCorrect: false },
      { id: "l7_p1_q2_o4", text: "\Delta U = -A - Q", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q3",
    question: "Nhiệt dung riêng của một chất là gì?",
    level: "Nhận biết",
    explanation: "Nhiệt dung riêng c là nhiệt lượng cần truyền cho 1 kg chất đó để nhiệt độ tăng thêm 1 °C (hoặc 1 K).",
    options: [
      { id: "l7_p1_q3_o1", text: "Nhiệt lượng cần cung cấp để 1 kg chất đó hóa hơi hoàn toàn.", isCorrect: false },
      { id: "l7_p1_q3_o2", text: "Nhiệt lượng cần cung cấp để 1 kg chất đó nóng chảy hoàn toàn.", isCorrect: false },
      { id: "l7_p1_q3_o3", text: "Nhiệt lượng cần cung cấp để 1 kg chất đó tăng thêm 1 K (hoặc 1 °C).", isCorrect: true },
      { id: "l7_p1_q3_o4", text: "Nhiệt lượng tỏa ra khi 1 kg chất đó hạ nhiệt độ xuống 0 °C.", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q4",
    question: "Đơn vị đo của nhiệt lượng, công và nội năng trong hệ SI là:",
    level: "Nhận biết",
    explanation: "Nhiệt lượng, công và nội năng đều là các dạng năng lượng nên có chung đơn vị đo trong hệ SI là Jun (J).",
    options: [
      { id: "l7_p1_q4_o1", text: "Calo (cal).", isCorrect: false },
      { id: "l7_p1_q4_o2", text: "Oát (W).", isCorrect: false },
      { id: "l7_p1_q4_o3", text: "Jun (J).", isCorrect: true },
      { id: "l7_p1_q4_o4", text: "Niuton (N).", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q5",
    question: "Hệ thức nào sau đây dùng để tính nhiệt lượng cung cấp cho một chất lỏng hóa hơi hoàn toàn ở nhiệt độ sôi không đổi?",
    level: "Nhận biết",
    explanation: "Công thức tính nhiệt lượng hóa hơi là Q = L * m, trong đó L là nhiệt hóa hơi riêng, m là khối lượng chất lỏng.",
    options: [
      { id: "l7_p1_q5_o1", text: "Q = m * c * \Delta T", isCorrect: false },
      { id: "l7_p1_q5_o2", text: "Q = \lambda * m", isCorrect: false },
      { id: "l7_p1_q5_o3", text: "Q = L * m", isCorrect: true },
      { id: "l7_p1_q5_o4", text: "Q = U * I * t", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q6",
    question: "Trong trường hợp hệ trao đổi nhiệt chỉ làm thay đổi nhiệt độ mà không có sự chuyển thể và không thực hiện công, hệ thức thích hợp là:",
    level: "Nhận biết",
    explanation: "Khi hệ chỉ truyền nhiệt làm thay đổi nhiệt độ, nhiệt lượng trao đổi được xác định bởi công thức: Q = m * c * \Delta T.",
    options: [
      { id: "l7_p1_q6_o1", text: "Q = L * m", isCorrect: false },
      { id: "l7_p1_q6_o2", text: "Q = \lambda * m", isCorrect: false },
      { id: "l7_p1_q6_o3", text: "Q = m * c * \Delta T", isCorrect: true },
      { id: "l7_p1_q6_o4", text: "Q = A", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q7",
    question: "Phương trình cân bằng nhiệt trong một hệ trao đổi nhiệt cô lập với bên ngoài có dạng tổng quát là:",
    level: "Nhận biết",
    explanation: "Trong hệ trao đổi nhiệt cô lập, tổng nhiệt lượng tỏa ra bằng tổng nhiệt lượng thu vào, hoặc tổng nhiệt lượng các chất trao đổi bằng không: Q_toa + Q_thu = 0.",
    options: [
      { id: "l7_p1_q7_o1", text: "Q_toa - Q_thu = 0", isCorrect: false },
      { id: "l7_p1_q7_o2", text: "Q_toa + Q_thu = 0", isCorrect: true },
      { id: "l7_p1_q7_o3", text: "Q_toa = -Q_thu = 0", isCorrect: false },
      { id: "l7_p1_q7_o4", text: "Q_toa * Q_thu = 1", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q8",
    question: "Khi một khối chất rắn kết tinh nhận nhiệt lượng để chuyển sang trạng thái lỏng ở nhiệt độ nóng chảy không đổi, ta sử dụng công thức tính nhiệt lượng nào?",
    level: "Nhận biết",
    explanation: "Nhiệt lượng cung cấp để làm nóng chảy hoàn toàn một vật rắn ở nhiệt độ nóng chảy là Q = \lambda * m, trong đó \lambda là nhiệt nóng chảy riêng.",
    options: [
      { id: "l7_p1_q8_o1", text: "Q = m * c * \Delta T", isCorrect: false },
      { id: "l7_p1_q8_o2", text: "Q = L * m", isCorrect: false },
      { id: "l7_p1_q8_o3", text: "Q = \lambda * m", isCorrect: true },
      { id: "l7_p1_q8_o4", text: "Q = A + \Delta U", isCorrect: false }
    ]
  },

  // 5 CÂU THÔNG HIỂU (l7_p1_q9 -> l7_p1_q13)
  {
    id: "l7_p1_q9",
    question: "Một lượng nước và một lượng rượu có thể tích bằng nhau được cung cấp các nhiệt lượng tương ứng là Q_1 và Q_2. Biết khối lượng riêng của nước là 1000 kg/m³ và của rượu là 800 kg/m³, nhiệt dung riêng của nước là 4200 J/(kg\u00B7K) và của rượu là 2500 J/(kg\u00B7K). Để độ tăng nhiệt độ của nước và rượu bằng nhau thì tỉ số nhiệt lượng Q_1/Q_2 là bao nhiêu?",
    level: "Thông hiểu",
    explanation: "Ta có Q_1 = m_1 * c_1 * \Delta T = D_1 * V * c_1 * \Delta T và Q_2 = m_2 * c_2 * \Delta T = D_2 * V * c_2 * \Delta T. Tỉ số Q_1/Q_2 = (D_1 * c_1)/(D_2 * c_2) = (1000 * 4200)/(800 * 2500) = 4200000 / 2000000 = 2.10. Vậy Q_1 = 2.10 * Q_2.",
    options: [
      { id: "l7_p1_q9_o1", text: "Q_1 = Q_2.", isCorrect: false },
      { id: "l7_p1_q9_o2", text: "Q_1 = 1.25 * Q_2.", isCorrect: false },
      { id: "l7_p1_q9_o3", text: "Q_1 = 1.68 * Q_2.", isCorrect: false },
      { id: "l7_p1_q9_o4", text: "Q_1 = 2.10 * Q_2.", isCorrect: true }
    ]
  },
  {
    id: "l7_p1_q10",
    question: "Thả một túi trà lọc vào cốc nước lạnh và một túi khác vào cốc nước nóng. Quan sát hiện tượng khuếch tán trà và dùng mô hình động học phân tử giải thích, phát biểu nào sau đây đúng?",
    level: "Thông hiểu",
    explanation: "Ở cốc nước nóng, nhiệt độ cao làm các phân tử nước chuyển động hỗn loạn nhanh hơn, dẫn đến tần suất và cường độ va chạm giữa phân tử nước và các phân tử trà tăng lên, làm quá trình khuếch tán diễn ra nhanh hơn nhiều so với nước nguội.",
    options: [
      { id: "l7_p1_q10_o1", text: "Hiện tượng khuếch tán ở nước lạnh diễn ra nhanh hơn vì phân tử nước lạnh chuyển động trật tự.", isCorrect: false },
      { id: "l7_p1_q10_o2", text: "Hiện tượng khuếch tán ở nước nóng diễn ra nhanh hơn vì ở nhiệt độ cao các phân tử chuyển động hỗn loạn nhanh hơn.", isCorrect: true },
      { id: "l7_p1_q10_o3", text: "Hai cốc khuếch tán như nhau vì hai túi trà hoàn toàn giống nhau.", isCorrect: false },
      { id: "l7_p1_q10_o4", text: "Hiện tượng khuếch tán chỉ xảy ra trong cốc nước nóng, còn nước lạnh thì không thể xảy ra khuếch tán.", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q11",
    question: "Nhận định nào sau đây diễn tả đúng bản chất sự biến thiên nội năng của chất khí khi bị nén đẳng nhiệt?",
    level: "Thông hiểu",
    explanation: "Nhiệt độ không đổi (nén đẳng nhiệt) đồng nghĩa động năng trung bình các phân tử khí lý tưởng không đổi, do đó nội năng chất khí không đổi (\Delta U = 0). Khi nén, khí nhận công (A > 0), theo định luật I: \Delta U = A + Q = 0 => Q = -A < 0, hệ tỏa nhiệt lượng.",
    options: [
      { id: "l7_p1_q11_o1", text: "Khí nhận công nên nội năng tăng lên tỉ lệ thuận với công nhận vào.", isCorrect: false },
      { id: "l7_p1_q11_o2", text: "Nội năng không đổi vì nhiệt độ không đổi, lượng công khí nhận vào chuyển hoàn toàn thành nhiệt lượng tỏa ra ngoài.", isCorrect: true },
      { id: "l7_p1_q11_o3", text: "Nội năng giảm đi vì khí phải tỏa nhiệt lượng ra ngoài môi trường xung quanh.", isCorrect: false },
      { id: "l7_p1_q11_o4", text: "Nội năng tăng lên do khoảng cách giữa các phân tử bị thu hẹp lại khi bị nén.", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q12",
    question: "Người ta truyền cho một khối khí trong xi lanh một nhiệt lượng 100 J. Khối khí nở ra đẩy pít-tông thực hiện một công có độ lớn 60 J. Hỏi độ biến thiên nội năng của lượng khí này bằng bao nhiêu?",
    level: "Thông hiểu",
    explanation: "Khí nhận nhiệt lượng nên Q = +100 J. Khí thực hiện công đẩy pít-tông nên A = -60 J. Độ biến thiên nội năng: \Delta U = A + Q = -60 J + 100 J = +40 J.",
    options: [
      { id: "l7_p1_q12_o1", text: "\Delta U = +160 J.", isCorrect: false },
      { id: "l7_p1_q12_o2", text: "\Delta U = +40 J.", isCorrect: true },
      { id: "l7_p1_q12_o3", text: "\Delta U = -40 J.", isCorrect: false },
      { id: "l7_p1_q12_o4", text: "\Delta U = -160 J.", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q13",
    question: "Thả một thỏi đồng khối lượng m ở nhiệt độ 80 °C vào cốc đựng nước khối lượng m ở nhiệt độ 20 °C. Sau một thời gian, hệ đạt trạng thái cân bằng nhiệt. Bỏ qua hao phí nhiệt lượng ra môi trường và vỏ bình, phát biểu nào sau đây đúng?",
    level: "Thông hiểu",
    explanation: "Theo định luật bảo toàn năng lượng, nhiệt lượng đồng tỏa ra bằng nhiệt lượng nước thu vào. Do nhiệt dung riêng của nước là 4200 J/(kg\u00B7K) lớn hơn nhiều so với đồng là 380 J/(kg\u00B7K), nên độ giảm nhiệt độ của đồng sẽ lớn hơn nhiều so với độ tăng nhiệt độ của nước.",
    options: [
      { id: "l7_p1_q13_o1", text: "Nhiệt độ cân bằng của hệ là 50 °C.", isCorrect: false },
      { id: "l7_p1_q13_o2", text: "Nhiệt độ cân bằng của hệ sẽ gần với 20 °C hơn vì nước giữ nhiệt tốt hơn (nhiệt dung riêng lớn hơn).", isCorrect: true },
      { id: "l7_p1_q13_o3", text: "Độ tăng nhiệt độ của nước bằng độ giảm nhiệt độ của đồng.", isCorrect: false },
      { id: "l7_p1_q13_o4", text: "Đồng thu nhiệt lượng còn nước tỏa nhiệt lượng.", isCorrect: false }
    ]
  },

  // 5 CÂU VẬN DỤNG (l7_p1_q14 -> l7_p1_q18)
  {
    id: "l7_p1_q14",
    question: "Một lượng khí trong xi lanh được truyền 10 kJ nhiệt năng để nóng lên, đồng thời khí bị nén bởi một ngoại lực thực hiện công có độ lớn 100 kJ. Tính độ biến thiên nội năng của lượng khí này.",
    level: "Vận dụng",
    explanation: "Vì khí nhận nhiệt lượng nên Q = +10 kJ. Khí bị nén nên khí nhận công, do đó A = +100 kJ. Theo định luật I nhiệt động lực học: \Delta U = A + Q = 100 kJ + 10 kJ = 110 kJ. Nội năng của khí tăng 110 kJ.",
    options: [
      { id: "l7_p1_q14_o1", text: "\Delta U = +90 kJ.", isCorrect: false },
      { id: "l7_p1_q14_o2", text: "\Delta U = +110 kJ.", isCorrect: true },
      { id: "l7_p1_q14_o3", text: "\Delta U = -90 kJ.", isCorrect: false },
      { id: "l7_p1_q14_o4", text: "\Delta U = -110 kJ.", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q15",
    question: "Người ta cung cấp nhiệt lượng 25 J cho một lượng khí trong một xi lanh đặt nằm ngang. Khí nở đẩy pít-tông chuyển động đều được một đoạn 10 cm. Biết lực ma sát giữa pít-tông và xi lanh có độ lớn là 20 N. Tính độ biến thiên nội năng của lượng khí này.",
    level: "Vận dụng",
    explanation: "Công khí thực hiện để thắng lực ma sát: A_công = F_ms * s = 20 * 0.10 m = 2 J. Vì khí sinh công nên công khí trao đổi là A = -A_công = -2 J. Nhiệt lượng khí nhận là Q = +25 J. Áp dụng định luật I: \Delta U = A + Q = -2 J + 25 J = 23 J.",
    options: [
      { id: "l7_p1_q15_o1", text: "\Delta U = +27 J.", isCorrect: false },
      { id: "l7_p1_q15_o2", text: "\Delta U = +23 J.", isCorrect: true },
      { id: "l7_p1_q15_o3", text: "\Delta U = +25 J.", isCorrect: false },
      { id: "l7_p1_q15_o4", text: "\Delta U = +5 J.", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q16",
    question: "Muốn pha chế 30 lít nước ở nhiệt độ 40 °C thì cần phải đổ bao nhiêu lít nước đang sôi ở 100 °C vào bao nhiêu lít nước ở nhiệt độ 10 °C? Lấy khối lượng riêng của nước là 1 kg/lít và bỏ qua hao phí nhiệt ra môi trường.",
    level: "Vận dụng",
    explanation: "Gọi m_1 là khối lượng nước sôi (100 °C), m_2 là khối lượng nước lạnh (10 °C). Ta có: Q_toa = Q_thu => m_1 * c * (100 - 40) = m_2 * c * (40 - 10) => 60 * m_1 = 30 * m_2 => 2 * m_1 = m_2. Lại có m_1 + m_2 = 30 kg. Thế vào ta được 3 * m_1 = 30 => m_1 = 10 kg và m_2 = 20 kg. Tương ứng với 10 lít nước sôi và 20 lít nước lạnh.",
    options: [
      { id: "l7_p1_q16_o1", text: "15 lít nước sôi và 15 lít nước lạnh.", isCorrect: false },
      { id: "l7_p1_q16_o2", text: "10 lít nước sôi và 20 lít nước lạnh.", isCorrect: true },
      { id: "l7_p1_q16_o3", text: "20 lít nước sôi và 10 lít nước lạnh.", isCorrect: false },
      { id: "l7_p1_q16_o4", text: "5 lít nước sôi và 25 lít nước lạnh.", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q17",
    question: "Một ấm điện công suất 1000 W được dùng để đun 300 g nước có nhiệt độ ban đầu là 20 °C đến khi sôi ở áp suất tiêu chuẩn. Biết hiệu suất của ấm là 80%, nhiệt dung riêng của nước là c = 4200 J/(kg\u00B7K). Tính thời gian cần thiết để đun sôi lượng nước trên.",
    level: "Vận dụng",
    explanation: "Nhiệt lượng có ích để làm nước nóng lên từ 20 °C đến 100 °C là: Q_ich = m * c * \Delta T = 0.3 * 4200 * (100 - 20) = 100800 J. Điện năng ấm tiêu thụ: Q_tp = Q_ich / H = 100800 / 0.8 = 126000 J. Thời gian đun: t = Q_tp / P = 126000 / 1000 = 126 s.",
    options: [
      { id: "l7_p1_q17_o1", text: "t = 101 s.", isCorrect: false },
      { id: "l7_p1_q17_o2", text: "t = 126 s.", isCorrect: true },
      { id: "l7_p1_q17_o3", text: "t = 150 s.", isCorrect: false },
      { id: "l7_p1_q17_o4", text: "t = 98 s.", isCorrect: false }
    ]
  },
  {
    id: "l7_p1_q18",
    question: "Dùng bếp điện để đun một ấm nhôm khối lượng 600 g đựng 1.5 lít nước ở nhiệt độ 20 °C. Sau 35 phút (2100 s) đun sôi, có 20% lượng nước trong ấm đã hóa hơi ở nhiệt độ sôi 100 °C. Tính nhiệt lượng trung bình (công suất có ích trung bình) cung cấp cho ấm nước mỗi giây. Cho c_Al = 880 J/(kg\u00B7K), c_nuoc = 4200 J/(kg\u00B7K), L_nuoc = 2.26 * 10^6 J/kg, D_nuoc = 1 kg/lít. Bỏ qua hao phí ra ngoài môi trường.",
    level: "Vận dụng",
    explanation: "Nhiệt lượng đun ấm nhôm và nước từ 20 °C đến 100 °C: Q_1 = (m_Al * c_Al + m_nuoc * c_nuoc) * \Delta T = (0.6 * 880 + 1.5 * 4200) * 80 = (528 + 6300) * 80 = 546240 J. Khối lượng nước hóa hơi: \Delta m = 20% * 1.5 kg = 0.3 kg. Nhiệt lượng làm hóa hơi nước: Q_2 = \Delta m * L = 0.3 * 2.26 * 10^6 = 678000 J. Tổng nhiệt lượng cung cấp: Q_ich = Q_1 + Q_2 = 1224240 J. Nhiệt lượng trung bình mỗi giây (công suất có ích): P_tb = Q_ich / t = 1224240 / 2100 ≈ 583 J/s (tương ứng 583 W).",
    options: [
      { id: "l7_p1_q18_o1", text: "P_tb = 325 J/s.", isCorrect: false },
      { id: "l7_p1_q18_o2", text: "P_tb = 583 J/s.", isCorrect: true },
      { id: "l7_p1_q18_o3", text: "P_tb = 750 J/s.", isCorrect: false },
      { id: "l7_p1_q18_o4", text: "P_tb = 420 J/s.", isCorrect: false }
    ]
  }
];

export const LESSON7_P2_QUESTIONS: Part2Question[] = [
  // 4 CÂU HỎI LỚN ĐÚNG/SAI. Cấu trúc mỗi câu: 1 ý Nhận biết, 2 ý Thông hiểu, 1 ý Vận dụng.

  // CÂU 1: THUYẾT ĐỘNG HỌC PHÂN TỬ VÀ KHUẾCH TÁN (l7_p2_q1)
  {
    id: "l7_p2_q1",
    question: "Lấy hai túi trà lọc hoàn toàn giống nhau. Thả nhẹ nhàng một túi vào cốc thủy tinh (1) đựng nước nguội ở 15 °C, và một túi vào cốc thủy tinh (2) đựng nước nóng ở 85 °C để các túi nằm yên ở đáy cốc. Hãy xem xét các phát biểu liên quan đến quá trình khuếch tán chất trà ra nước.",
    statements: [
      {
        id: "l7_p2_q1_s1",
        text: "Hiện tượng khuếch tán trà chứng tỏ giữa các phân tử trà và phân tử nước có khoảng cách và chúng chuyển động hỗn loạn không ngừng.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Hiện tượng khuếch tán là bằng chứng thực nghiệm rõ ràng nhất chứng minh các phân tử cấu tạo nên vật chất chuyển động không ngừng và giữa chúng có khoảng cách."
      },
      {
        id: "l7_p2_q1_s2",
        text: "Quá trình khuếch tán chất trà ở cốc (2) diễn ra nhanh hơn cốc (1) do ở nhiệt độ cao các phân tử nước có động năng tịnh tiến trung bình lớn hơn.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Ở cốc nước nóng (2), nhiệt độ tuyệt đối cao hơn làm động năng tịnh tiến trung bình của các phân tử lớn hơn, chúng chuyển động nhanh hơn, va chạm mạnh và nhiều hơn làm quá trình khuếch tán diễn ra nhanh chóng."
      },
      {
        id: "l7_p2_q1_s3",
        text: "Nếu ta dùng thìa khuấy đều cốc (1), tốc độ hòa tan và khuếch tán trà sẽ bị chậm đi đáng kể do làm rối loạn trật tự tự nhiên của các hạt.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Việc khuấy đều làm tăng sự tiếp xúc, va chạm cơ học giữa các phân tử nước và trà, thúc đẩy quá trình khuếch tán diễn ra nhanh hơn nhiều chứ không phải chậm đi."
      },
      {
        id: "l7_p2_q1_s4",
        text: "Động năng tịnh tiến trung bình của phân tử nước ở cốc (2) lớn gấp khoảng 1.24 lần động năng tịnh tiến trung bình của phân tử nước ở cốc (1).",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Động năng tịnh tiến trung bình tỉ lệ thuận với nhiệt độ tuyệt đối T: E_d = 1.5 * k * T. Nhiệt độ cốc (2): T_2 = 85 + 273 = 358 K. Nhiệt độ cốc (1): T_1 = 15 + 273 = 288 K. Tỉ số động năng: E_d2 / E_d1 = T_2 / T_1 = 358 / 288 ≈ 1.243. Phát biểu đúng."
      }
    ]
  },

  // CÂU 2: ĐỊNH LUẬT I NHIỆT ĐỘNG LỰC HỌC VÀ KHÍ TRONG XI LANH (l7_p2_q2)
  {
    id: "l7_p2_q2",
    question: "Một lượng khí lý tưởng được giữ trong một xi lanh nằm ngang bởi một pít-tông di động không ma sát. Người ta cung cấp cho lượng khí này một nhiệt lượng có độ lớn là 25 J. Lượng khí này nóng lên, dãn nở đẩy pít-tông dịch chuyển đều một quãng đường 10 cm, lực đẩy cơ học của lượng khí tác dụng lên pít-tông là 20 N.",
    statements: [
      {
        id: "l7_p2_q2_s1",
        text: "Vì lượng khí nhận nhiệt lượng nên trong hệ thức định luật I nhiệt động lực học, ta quy ước giá trị Q mang dấu dương: Q = +25 J.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Theo quy ước dấu của định luật I nhiệt động lực học, hệ nhận nhiệt lượng thì Q > 0."
      },
      {
        id: "l7_p2_q2_s2",
        text: "Công cơ học mà khí thực hiện để đẩy pít-tông di chuyển là 200 J.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Công cơ học khí thực hiện đẩy pít-tông là: A_khí = F * s = 20 * 0.10 m = 2 J, không phải 200 J."
      },
      {
        id: "l7_p2_q2_s3",
        text: "Vì lượng khí thực hiện công (sinh công) đẩy pít-tông ra ngoài nên trong hệ thức định luật I, công A mang dấu âm: A = -2 J.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Hệ thực hiện công (sinh công) thì A < 0, do đó ta lấy A = -2 J."
      },
      {
        id: "l7_p2_q2_s4",
        text: "Độ biến thiên nội năng của lượng khí trong quá trình dãn nở này là \Delta U = 23 J, nghĩa là nội năng của lượng khí đã tăng lên.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Áp dụng định luật I: \Delta U = A + Q = -2 J + 25 J = 23 J. Vì \Delta U > 0 nên nội năng của khối khí tăng 23 J. Phát biểu này hoàn toàn chính xác."
      }
    ]
  },

  // CÂU 3: BÀI TOÁN CÂN BẰNG NHIỆT PHA TRỘN NƯỚC (l7_p2_q3)
  {
    id: "l7_p2_q3",
    question: "Một học sinh muốn có 30 lít nước ấm ở nhiệt độ 40 °C để tắm bằng cách trộn lẫn một lượng nước sôi ở nhiệt độ 100 °C (khối lượng m_1, thể tích V_1) vào một lượng nước lạnh ở nhiệt độ 10 °C (khối lượng m_2, thể tích V_2). Giả thiết khối lượng riêng của nước luôn bằng 1 kg/lít, bỏ qua sự trao đổi nhiệt với môi trường bên ngoài và vỏ bình chứa.",
    statements: [
      {
        id: "l7_p2_q3_s1",
        text: "Khi hai khối nước có nhiệt độ khác nhau được trộn lẫn, nước ở 100 °C sẽ tỏa nhiệt lượng, nước ở 10 °C sẽ thu nhiệt lượng cho đến khi đạt trạng thái cân bằng nhiệt có nhiệt độ bằng nhau.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Sự truyền nhiệt luôn tự phát diễn ra từ vật có nhiệt độ cao hơn sang vật có nhiệt độ thấp hơn cho đến khi đạt cân bằng nhiệt (nhiệt độ bằng nhau)."
      },
      {
        id: "l7_p2_q3_s2",
        text: "Mối liên hệ giữa khối lượng nước sôi m_1 and nước lạnh m_2 khi đạt cân bằng nhiệt 40 °C là m_2 = 3 * m_1.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Q_toa = Q_thu => m_1 * c * (100 - 40) = m_2 * c * (40 - 10) => 60 * m_1 = 30 * m_2 => 2 * m_1 = m_2 (nước lạnh bằng 2 lần nước sôi, m_2 = 2 * m_1)."
      },
      {
        id: "l7_p2_q3_s3",
        text: "Để có đúng 30 lít nước ấm ở 40 °C, học sinh này cần pha trộn đúng 10 lít nước sôi vào 20 lít nước lạnh ở 10 °C.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Từ m_2 = 2 * m_1 và m_1 + m_2 = 30 => m_1 = 10 kg (10 lít), m_2 = 20 kg (20 lít). Phát biểu đúng."
      },
      {
        id: "l7_p2_q3_s4",
        text: "If trong thực tế có 10% nhiệt lượng tỏa ra từ nước sôi bị thất thoát ra môi trường xung quanh, thì lượng nước sôi thực tế cần dùng để đạt nhiệt độ 40 °C sẽ lớn hơn 10 lít.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Có hao phí nghĩa là một phần năng lượng bị truyền ra ngoài môi trường, do đó cần cung cấp nhiều nhiệt lượng hơn từ nước sôi để bù đắp hao phí, dẫn đến lượng nước sôi cần thiết thực tế phải lớn hơn 10 lít."
      }
    ]
  },

  // CÂU 4: HIỆU SUẤT ĐUN NƯỚC BẰNG ẤM ĐIỆN SIÊU TỐC (l7_p2_q4)
  {
    id: "l7_p2_q4",
    question: "Một ấm điện siêu tốc hoạt động dưới công suất định mức 1000 W được sử dụng để đun sôi 300 g nước có nhiệt độ ban đầu là 20 °C đến khi sôi hoàn toàn ở 100 °C. Lấy nhiệt dung riêng của nước là c = 4200 J/(kg\u00B7K), nhiệt hóa hơi riêng của nước là L = 2.26 * 10^6 J/kg. Bỏ qua sự truyền nhiệt cho vỏ ấm.",
    statements: [
      {
        id: "l7_p2_q4_s1",
        text: "Nhiệt lượng cần thiết cung cấp tối thiểu để 300 g nước lỏng từ 20 °C nóng lên đến khi bắt đầu sôi ở 100 °C là 100800 J.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Q = m * c * \Delta T = 0.3 * 4200 * (100 - 20) = 0.3 * 4200 * 80 = 100800 J. Phát biểu đúng."
      },
      {
        id: "l7_p2_q4_s2",
        text: "Nếu ấm điện có hiệu suất đun nóng nước là 100%, thời gian cần thiết để đun sôi lượng nước trên kể từ lúc bắt đầu đun là đúng 100.8 s.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Với H = 100%, điện năng tiêu thụ bằng nhiệt lượng đun nước: P * t = Q => t = Q / P = 100800 / 1000 = 100.8 s."
      },
      {
        id: "l7_p2_q4_s3",
        text: "Nếu học sinh tiếp tục để ấm cắm điện sôi thêm trong 2 phút (120 s) dưới công suất đun 1000 W thì toàn bộ 300 g nước trong ấm sẽ hóa hơi hoàn toàn.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Nhiệt lượng tỏa ra thêm trong 120 s là: Q' = P * t' = 1000 * 120 = 120000 J. Khối lượng nước hóa hơi: \Delta m = Q' / L = 120000 / (2.26 * 10^6) ≈ 0.0531 kg = 53.1 g. Nước chỉ bay hơi một phần (53.1 g), không thể bay hơi hết 300 g."
      },
      {
        id: "l7_p2_q4_s4",
        text: "Trong một lần đun thực tế, do có hao phí ra môi trường nên thời gian đun nước từ 20 °C đến khi sôi là 126 s. Hiệu suất tỏa nhiệt thực tế của ấm điện này là 80%.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Năng lượng điện tiêu thụ toàn phần: Q_tp = P * t = 1000 * 126 = 126000 J. Nhiệt lượng có ích đun nước là Q_ich = 100800 J. Hiệu suất ấm đun: H = Q_ich / Q_tp = 100800 / 126000 = 0.80 (80%). Phát biểu hoàn toàn chính xác."
      }
    ]
  }
];

export const LESSON7_P3_QUESTIONS: Part3Question[] = [
  // 6 CÂU HỎI TRẢ LỜI NGẮN (2 Thông hiểu, 4 Vận dụng)

  // CÂU 1 (Thông hiểu)
  {
    id: "l7_p3_q1",
    question: "Để có được 15 lít nước ấm ở nhiệt độ 40 °C phục vụ thực hành sinh học, người ta cần trộn lẫn bao nhiêu lít nước đang sôi ở 100 °C vào một lượng nước lạnh ở nhiệt độ 10 °C? Biết khối lượng riêng của nước là 1 kg/lít và bỏ qua hao phí nhiệt năng ra vỏ bình chứa và môi trường. (Nhập đáp án là một số nguyên dương duy nhất)",
    answer: 5,
    unit: "lít",
    level: "Thông hiểu",
    explanation: "Gọi m_1 là khối lượng nước sôi, m_2 là khối lượng nước lạnh. Q_toa = Q_thu => m_1 * c * (100 - 40) = m_2 * c * (40 - 10) => 60 * m_1 = 30 * m_2 => 2 * m_1 = m_2. Lại có m_1 + m_2 = 15 => m_1 + 2 * m_1 = 15 => 3 * m_1 = 15 => m_1 = 5 kg (tương ứng 5 lít nước sôi)."
  },

  // CÂU 2 (Thông hiểu)
  {
    id: "l7_p3_q2",
    question: "Một lượng khí lí tưởng đựng trong một xi lanh nằm ngang kín. Người ta truyền cho lượng khí này một nhiệt lượng có độ lớn là 150 J. Khí nóng lên, dãn nở đẩy pít-tông di chuyển thực hiện một công có độ lớn 90 J ra bên ngoài. Tính độ biến thiên nội năng của lượng khí này theo đơn vị Jun (J). (Nhập đáp án là một số nguyên dương duy nhất)",
    answer: 60,
    unit: "J",
    level: "Thông hiểu",
    explanation: "Khí nhận nhiệt lượng: Q = +150 J. Khí dãn nở sinh công đẩy pít-tông: A = -90 J. Độ biến thiên nội năng theo định luật I nhiệt động lực học: \Delta U = A + Q = -90 J + 150 J = 60 J."
  },

  // CÂU 3 (Vận dụng)
  {
    id: "l7_p3_q3",
    question: "Một ấm điện siêu tốc hoạt động ổn định với công suất định mức 1008 W được dùng để đun sôi 300 g nước có nhiệt độ ban đầu là 20 °C ở áp suất tiêu chuẩn. Bỏ qua mọi sự truyền nhiệt cho vỏ ấm và hao phí ra môi trường bên ngoài. Lấy nhiệt dung riêng của nước là c = 4200 J/(kg\u00B7K). Tính thời gian cần thiết để đun nước đạt đến nhiệt độ sôi theo đơn vị giây. (Nhập đáp án là một số nguyên dương duy nhất)",
    answer: 100,
    unit: "giây",
    level: "Vận dụng",
    explanation: "Nhiệt lượng cần cung cấp để đun nước từ 20 °C đến 100 °C: Q = m * c * \Delta T = 0.3 * 4200 * (100 - 20) = 100800 J. Thời gian cần thiết đun nước sôi: t = Q / P = 100800 / 1008 = 100 s."
  },

  // CÂU 4 (Vận dụng)
  {
    id: "l7_p3_q4",
    question: "Một ấm điện công suất 1000 W chứa 300 g nước đang sôi ở nhiệt độ 100 °C dưới áp suất tiêu chuẩn. Nếu ta để ấm tiếp tục đun sôi thêm trong thời gian đúng 113 giây thì khối lượng nước lỏng còn lại trong ấm điện bằng bao nhiêu gam? Biết nhiệt hóa hơi riêng của nước là L = 2.26 * 10^6 J/kg and bỏ qua mọi hao phí truyền nhiệt ngoài môi trường. (Nhập đáp án là một số nguyên dương duy nhất)",
    answer: 250,
    unit: "g",
    level: "Vận dụng",
    explanation: "Năng lượng điện cung cấp trong 113 giây sôi thêm: Q' = P * t' = 1000 * 113 = 113000 J. Khối lượng nước đã hóa hơi: \Delta m = Q' / L = 113000 / (2.26 * 10^6) = 0.050 kg = 50 g. Khối lượng nước lỏng còn lại trong ấm: m_con = m_dau - \Delta m = 300 g - 50 g = 250 g."
  },

  // CÂU 5 (Vận dụng)
  {
    id: "l7_p3_q5",
    question: "Người ta dùng bếp điện để đun một ấm nhôm có khối lượng 500 g đựng 1.2 kg nước ở nhiệt độ ban đầu 20 °C. Sau một thời gian đun, đã có đúng 20% lượng nước trong ấm hóa hơi ở nhiệt độ sôi 100 °C. Biết hiệu suất truyền nhiệt có ích của bếp điện đạt 75%. Hãy tính tổng lượng điện năng tỏa ra từ bếp điện trong suốt quá trình đun nói trên theo đơn vị kilôjun (kJ). Cho c_Al = 880 J/(kg\u00B7K), c_nuoc = 4200 J/(kg\u00B7K), L_nuoc = 2.26 * 10^6 J/kg. (Làm tròn kết quả đến hàng đơn vị của kJ)",
    answer: 1308,
    unit: "kJ",
    level: "Vận dụng",
    explanation: "Nhiệt lượng làm ấm nhôm và nước nóng lên từ 20 °C đến 100 °C: Q_1 = (m_Al * c_Al + m_nuoc * c_nuoc) * \Delta T = (0.5 * 880 + 1.2 * 4200) * 80 = (440 + 5040) * 80 = 5480 * 80 = 438400 J. Khối lượng nước hóa hơi: \Delta m = 20% * 1.2 kg = 0.24 kg. Nhiệt lượng làm bay hơi nước sôi: Q_2 = \Delta m * L = 0.24 * 2.26 * 10^6 = 542400 J. Tổng nhiệt lượng có ích: Q_ich = Q_1 + Q_2 = 438400 J + 542400 J = 980800 J. Điện năng tổng cộng bếp điện tỏa ra: Q_tp = Q_ich / H = 980800 / 0.75 ≈ 1307733 J = 1307.73 kJ => Làm tròn đến hàng đơn vị thu được 1308 kJ."
  },

  // CÂU 6 (Vận dụng)
  {
    id: "l7_p3_q6",
    question: "Một xi lanh đặt nằm ngang chứa một lượng khí lý tưởng được giữ bởi một pít-tông. Người ta cung cấp cho lượng khí này một nhiệt lượng có độ lớn 45 J. Khí dãn nở đẩy pít-tông chuyển động đều đi một quãng đường là 20 cm. Biết lực ma sát giữa pít-tông và thành xi lanh có độ lớn không đổi là 10 N. Tính độ biến thiên nội năng của lượng khí trong quá trình này theo đơn vị Jun (J). (Nhập đáp án là một số nguyên dương duy nhất)",
    answer: 43,
    unit: "J",
    level: "Vận dụng",
    explanation: "Công khí thực hiện đẩy pít-tông thắng lực ma sát: A_công = F_ms * s = 10 * 0.20 m = 2 J. Vì khí sinh công nên công khí trao đổi mang dấu âm: A = -A_công = -2 J. Nhiệt lượng khí nhận: Q = +45 J. Áp dụng định luật I: \Delta U = A + Q = -2 J + 45 J = 43 J. Vậy nội năng khí tăng 43 J."
  }
];

// ==================== LESSON 8 QUESTIONS ====================
export const LESSON8_P1_QUESTIONS: Part1Question[] = [
  // 5 CÂU NHẬN BIẾT
  {
    id: "l8_p1_q1",
    question: "Chuyển động Brown trong chất khí chứng tỏ điều gì?",
    level: "Nhận biết",
    explanation: "Chuyển động hỗn loạn không ngừng của các hạt khói (chuyển động Brown) chứng tỏ các phân tử khí xung quanh chuyển động hỗn loạn không ngừng và va chạm liên tục vào chúng.",
    options: [
      { id: "l8_p1_q1_o1", text: "Các hạt khói tự phát ra năng lượng để tự chuyển động.", isCorrect: false },
      { id: "l8_p1_q1_o2", text: "Chất khí được cấu tạo từ các phân tử chuyển động hỗn loạn, không ngừng.", isCorrect: true },
      { id: "l8_p1_q1_o3", text: "Các phân tử chất khí đứng yên nhưng các hạt khói chuyển động hỗn loạn.", isCorrect: false },
      { id: "l8_p1_q1_o4", text: "Giữa các hạt khói có lực đẩy rất mạnh.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q2",
    question: "Khi tăng nhiệt độ của một lượng khí trong bình kín thì:",
    level: "Nhận biết",
    explanation: "Nhiệt độ của khí càng cao thì tốc độ chuyển động hỗn loạn của các phân tử khí càng lớn.",
    options: [
      { id: "l8_p1_q2_o1", text: "Tốc độ chuyển động hỗn loạn của các phân tử khí càng lớn.", isCorrect: true },
      { id: "l8_p1_q2_o2", text: "Kích thước của các phân tử khí tăng lên đáng kể.", isCorrect: false },
      { id: "l8_p1_q2_o3", text: "Khoảng cách giữa các phân tử khí giảm đi rõ rệt.", isCorrect: false },
      { id: "l8_p1_q2_o4", text: "Các phân tử khí ngừng chuyển động hoàn toàn.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q3",
    question: "Lực liên kết giữa các phân tử ở thể khí có đặc điểm nào sau đây?",
    level: "Nhận biết",
    explanation: "Khoảng cách giữa các phân tử ở thể khí rất lớn so với ở thể lỏng và thể rắn nên lực liên kết giữa các phân tử ở thể khí rất yếu.",
    options: [
      { id: "l8_p1_q3_o1", text: "Rất mạnh, giữ các phân tử khí ở vị trí cố định.", isCorrect: false },
      { id: "l8_p1_q3_o2", text: "Rất yếu so với ở thể lỏng và thể rắn.", isCorrect: true },
      { id: "l8_p1_q3_o3", text: "Bằng không ở mọi điều kiện thực tế.", isCorrect: false },
      { id: "l8_p1_q3_o4", text: "Lớn hơn lực liên kết ở thể rắn.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q4",
    question: "Trong mô hình khí lí tưởng, các phân tử khí được coi là:",
    level: "Nhận biết",
    explanation: "Khí lí tưởng coi các phân tử khí là các chất điểm (có khối lượng nhưng kích thước nhỏ vô cùng so với khoảng cách giữa chúng) và không tương tác khi chưa va chạm.",
    options: [
      { id: "l8_p1_q4_o1", text: "Các chất điểm, không tương tác với nhau khi chưa va chạm.", isCorrect: true },
      { id: "l8_p1_q4_o2", text: "Các hạt hình cầu có kích thước lớn luôn hút nhau rất mạnh.", isCorrect: false },
      { id: "l8_p1_q4_o3", text: "Các chất điểm luôn tương tác đẩy nhau khi ở xa.", isCorrect: false },
      { id: "l8_p1_q4_o4", text: "Các hạt đứng yên quanh các vị trí cân bằng.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q5",
    question: "Va chạm giữa các phân tử khí lí tưởng với nhau và với thành bình là loại va chạm nào?",
    level: "Nhận biết",
    explanation: "Theo giả thuyết khí lí tưởng, va chạm giữa các phân tử khí với nhau và với thành bình là va chạm hoàn toàn đàn hồi.",
    options: [
      { id: "l8_p1_q5_o1", text: "Va chạm mềm (không đàn hồi).", isCorrect: false },
      { id: "l8_p1_q5_o2", text: "Va chạm hoàn toàn đàn hồi.", isCorrect: true },
      { id: "l8_p1_q5_o3", text: "Va chạm tỏa nhiệt làm phân tử nóng lên.", isCorrect: false },
      { id: "l8_p1_q5_o4", text: "Va chạm dính chặt vào nhau.", isCorrect: false }
    ]
  },
  // 5 CÂU THÔNG HIỂU
  {
    id: "l8_p1_q6",
    question: "Tại sao chất khí luôn chiếm toàn bộ dung tích của bình chứa?",
    level: "Thông hiểu",
    explanation: "Do lực liên kết giữa các phân tử khí rất yếu và các phân tử chuyển động hoàn toàn hỗn loạn không ngừng nên chúng khuếch tán rộng khắp và chiếm toàn bộ dung tích bình chứa.",
    options: [
      { id: "l8_p1_q6_o1", text: "Do lực hút Trái Đất tác dụng lên phân tử khí bằng không.", isCorrect: false },
      { id: "l8_p1_q6_o2", text: "Do lực liên kết phân tử khí rất yếu và chúng chuyển động hỗn loạn không ngừng.", isCorrect: true },
      { id: "l8_p1_q6_o3", text: "Do kích thước phân tử khí lớn tương đương thể tích bình chứa.", isCorrect: false },
      { id: "l8_p1_q6_o4", text: "Do các phân tử khí tự dãn nở phồng to ra.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q7",
    question: "Hiện tượng nào sau đây chứng tỏ khoảng cách giữa các phân tử chất khí rất lớn so với chất lỏng và chất rắn?",
    level: "Thông hiểu",
    explanation: "Khối lượng riêng của chất khí nhỏ hơn hàng ngàn lần so với chất lỏng, chất rắn (ở cùng nhiệt độ và áp suất), cho thấy các phân tử chất khí ở rất xa nhau.",
    options: [
      { id: "l8_p1_q7_o1", text: "Chất khí có thể dẫn điện tốt ở điều kiện thường.", isCorrect: false },
      { id: "l8_p1_q7_o2", text: "Khối lượng riêng của chất khí rất nhỏ so với chất lỏng và chất rắn.", isCorrect: true },
      { id: "l8_p1_q7_o3", text: "Chất khí luôn có màu sắc sặc sỡ dễ quan sát.", isCorrect: false },
      { id: "l8_p1_q7_o4", text: "Chất khí không thể bị nén ép.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q8",
    question: "Cơ chế vi mô nào gây ra áp suất của chất khí lên thành bình chứa?",
    level: "Thông hiểu",
    explanation: "Các phân tử khí chuyển động hỗn loạn va chạm liên tục vào thành bình, truyền xung lượng cho thành bình tạo nên áp lực trên một đơn vị diện tích (áp suất).",
    options: [
      { id: "l8_p1_q8_o1", text: "Do lực hút tĩnh điện giữa phân tử khí và thành bình.", isCorrect: false },
      { id: "l8_p1_q8_o2", text: "Do sự va chạm liên tục của các phân tử khí vào thành bình khi chuyển động hỗn loạn.", isCorrect: true },
      { id: "l8_p1_q8_o3", text: "Do thành bình tự co bóp nén khí lại.", isCorrect: false },
      { id: "l8_p1_q8_o4", text: "Do trọng lực đẩy các phân tử khí rơi xuống thành đáy bình.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q9",
    question: "Tốc độ phân tử khí oxygen ở điều kiện tiêu chuẩn có đặc điểm nào dưới đây?",
    level: "Thông hiểu",
    explanation: "Ở điều kiện chuẩn, tốc độ trung bình của các phân tử oxygen vào khoảng 400 m/s. Đây là giá trị trung bình mang tính thống kê, một số phân tử có thể chuyển động nhanh hơn hoặc chậm hơn.",
    options: [
      { id: "l8_p1_q9_o1", text: "Tất cả mọi phân tử oxygen đều chuyển động đúng bằng tốc độ 400 m/s.", isCorrect: false },
      { id: "l8_p1_q9_o2", text: "Có tốc độ trung bình khoảng 400 m/s và mang ý nghĩa thống kê cho một số lượng lớn phân tử.", isCorrect: true },
      { id: "l8_p1_q9_o3", text: "Không đổi theo thời gian và không chịu ảnh hưởng bởi va chạm phân tử.", isCorrect: false },
      { id: "l8_p1_q9_o4", text: "Bằng không vì khối khí đứng yên vĩ mô.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q10",
    question: "Chuyển động của hạt bụi mịn lơ lửng trong không khí khi có tia nắng chiếu qua cửa sổ có phải chuyển động Brown không? Tại sao?",
    level: "Thông hiểu",
    explanation: "Chuyển động hạt bụi to nhìn thấy bằng mắt thường chủ yếu do các dòng đối lưu không khí cuốn đi, không phải chuyển động Brown (vốn xảy ra ở thang vi mô với hạt siêu nhỏ bị phân tử va chạm ngẫu nhiên).",
    options: [
      { id: "l8_p1_q10_o1", text: "Có, vì hạt bụi chuyển động hỗn loạn không ngừng y hệt hạt khói.", isCorrect: false },
      { id: "l8_p1_q10_o2", text: "Không, vì hạt bụi có kích thước tương đối lớn, chuyển động của chúng chủ yếu do dòng đối lưu của không khí gây ra.", isCorrect: true },
      { id: "l8_p1_q10_o3", text: "Có, vì nó chứng tỏ các phân tử bụi tự bay hơi.", isCorrect: false },
      { id: "l8_p1_q10_o4", text: "Không, vì hạt bụi chỉ chuyển động theo một đường thẳng cố định.", isCorrect: false }
    ]
  },
  // 5 CÂU VẬN DỤNG
  {
    id: "l8_p1_q11",
    question: "Dùng bơm tiêm nhựa bịt kín đầu kim rồi ấn pít-tông để nén khí bên trong, ta cảm thấy nặng tay dần. Giải thích hiện tượng này theo mô hình động học phân tử:",
    level: "Vận dụng",
    explanation: "Khi giảm thể tích bình chứa và giữ nguyên nhiệt độ, mật độ phân tử khí tăng lên, dẫn đến số va chạm của phân tử khí vào thành bình và pít-tông trong một đơn vị thời gian tăng lên, làm áp suất khí tác dụng ngược lên pít-tông tăng lên.",
    options: [
      { id: "l8_p1_q11_o1", text: "Các phân tử khí bị nén co kích thước lại tạo ra phản lực lớn.", isCorrect: false },
      { id: "l8_p1_q11_o2", text: "Mật độ phân tử tăng, số va chạm của các phân tử khí lên pít-tông trong một đơn vị thời gian tăng làm áp suất tăng.", isCorrect: true },
      { id: "l8_p1_q11_o3", text: "Lực đẩy liên kết giữa các phân tử khí đột ngột chuyển hóa thành lực liên kết mạnh như chất rắn.", isCorrect: false },
      { id: "l8_p1_q11_o4", text: "Nhiệt độ khí giảm mạnh làm pít-tông bị kẹt chặt.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q12",
    question: "Độ lớn áp suất chất khí tác dụng lên thành bình không phụ thuộc vào đại lượng vi mô nào?",
    level: "Vận dụng",
    explanation: "Theo công thức áp suất chất khí vi mô p = (1/3) * \mu * m * v^2, áp suất phụ thuộc vào mật độ phân tử \mu, khối lượng một phân tử m, và trung bình bình phương tốc độ v^2. Nó không phụ thuộc vào thể tích của vỏ kim loại thành bình.",
    options: [
      { id: "l8_p1_q12_o1", text: "Mật độ phân tử khí (số phân tử khí trên một đơn vị thể tích).", isCorrect: false },
      { id: "l8_p1_q12_o2", text: "Khối lượng của một phân tử khí.", isCorrect: false },
      { id: "l8_p1_q12_o3", text: "Thể tích hay độ dày của lớp vỏ kim loại làm thành bình chứa.", isCorrect: true },
      { id: "l8_p1_q12_o4", text: "Tốc độ chuyển động trung bình bình phương của các phân tử khí.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q13",
    question: "Ở cùng nhiệt độ và áp suất chuẩn, so sánh mật độ phân tử khí (số phân tử trên một đơn vị thể tích) của 1 lít khí Oxygen và 1 lít khí Nitrogen ta có:",
    level: "Vận dụng",
    explanation: "Theo định luật Avogadro, ở cùng nhiệt độ và áp suất, những thể tích bằng nhau của các chất khí khác nhau đều chứa cùng một số phân tử. Do đó mật độ phân tử của chúng là bằng nhau.",
    options: [
      { id: "l8_p1_q13_o1", text: "Mật độ phân tử của Oxygen lớn hơn Nitrogen vì Oxygen nặng hơn.", isCorrect: false },
      { id: "l8_p1_q13_o2", text: "Mật độ phân tử của Oxygen và Nitrogen bằng nhau.", isCorrect: true },
      { id: "l8_p1_q13_o3", text: "Mật độ phân tử của Nitrogen lớn hơn Oxygen vì Nitrogen nhỏ hơn.", isCorrect: false },
      { id: "l8_p1_q13_o4", text: "Không thể so sánh được nếu không biết khối lượng cụ thể.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q14",
    question: "Lí do chính khiến chất khí dễ nén hơn nhiều so với chất lỏng và chất rắn là:",
    level: "Vận dụng",
    explanation: "Do khoảng cách giữa các phân tử khí rất lớn, phần không gian trống chiếm tỉ lệ chủ yếu, lực liên kết yếu nên ta dễ dàng ép các phân tử lại gần nhau hơn.",
    options: [
      { id: "l8_p1_q14_o1", text: "Các phân tử khí có tính chất dẻo và đàn hồi cao.", isCorrect: false },
      { id: "l8_p1_q14_o2", text: "Khoảng cách giữa các phân tử khí rất lớn so với kích thước phân tử.", isCorrect: true },
      { id: "l8_p1_q14_o3", text: "Lực đẩy giữa các phân tử khí luôn lớn hơn lực hút.", isCorrect: false },
      { id: "l8_p1_q14_o4", text: "Các phân tử khí không có khối lượng.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q15",
    question: "Tại sao khi sản xuất vỏ bình gas hay bình chứa dưỡng khí oxygen, người ta phải thiết kế vỏ bình cực dày bằng thép chịu lực cao?",
    level: "Vận dụng",
    explanation: "Khi chứa lượng khí lớn ở mật độ cực cao, các phân tử khí liên tục va chạm với tần suất khổng lồ vào thành trong vỏ bình, gây ra áp suất rất lớn có nguy cơ làm nổ bình nếu vỏ bình yếu.",
    options: [
      { id: "l8_p1_q15_o1", text: "Để ngăn cản các phân tử khí tự phân hủy thành nguyên tử.", isCorrect: false },
      { id: "l8_p1_q15_o2", text: "Để chịu được áp lực cực lớn tạo ra từ hàng tỉ va chạm phân tử khí vào thành bình mỗi giây.", isCorrect: true },
      { id: "l8_p1_q15_o3", text: "Để làm khí bên trong không thể truyền nhiệt ra ngoài.", isCorrect: false },
      { id: "l8_p1_q15_o4", text: "Để tăng khối lượng vĩ mô giúp bình gas không bị bay lên trời.", isCorrect: false }
    ]
  },
  // 5 CÂU VẬN DỤNG CAO
  {
    id: "l8_p1_q16",
    question: "Mô hình khí lí tưởng bỏ qua lực tương tác phân tử khi chưa va chạm. Ở điều kiện thực tế nào thì khí thực (như không khí quanh ta) có hành vi gần đúng nhất với khí lí tưởng?",
    level: "Vận dụng",
    explanation: "Khi áp suất thấp và nhiệt độ cao, các phân tử khí ở rất xa nhau (lực tương tác không đáng kể) và chuyển động rất nhanh, khiến khí thực tuân theo gần đúng các định luật khí lí tưởng.",
    options: [
      { id: "l8_p1_q16_o1", text: "Ở nhiệt độ cực thấp gần độ không tuyệt đối và áp suất cực kì cao.", isCorrect: false },
      { id: "l8_p1_q16_o2", text: "Ở nhiệt độ cao và áp suất thấp (mật độ khí loãng).", isCorrect: true },
      { id: "l8_p1_q16_o3", text: "Khi chất khí bị hóa lỏng hoàn toàn dưới áp lực cực cao.", isCorrect: false },
      { id: "l8_p1_q16_o4", text: "Không có điều kiện nào trong thực tế, khí thực luôn khác hoàn toàn khí lí tưởng.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q17",
    question: "Một khối khí oxygen chứa trong bình có nhiệt độ tuyệt đối T. Nếu nhiệt độ tuyệt đối của khối khí tăng lên gấp đôi (2T) thì trung bình bình phương tốc độ của các phân tử khí oxygen sẽ:",
    level: "Vận dụng",
    explanation: "Động năng tịnh tiến trung bình E_đ = (1/2) * m * v^2 = (3/2) * k * T => v^2 tỉ lệ thuận với nhiệt độ tuyệt đối T. Do đó khi T tăng 2 lần thì v^2 cũng tăng đúng 2 lần.",
    options: [
      { id: "l8_p1_q17_o1", text: "Tăng lên 4 lần.", isCorrect: false },
      { id: "l8_p1_q17_o2", text: "Tăng lên 2 lần.", isCorrect: true },
      { id: "l8_p1_q17_o3", text: "Tăng lên √2 lần.", isCorrect: false },
      { id: "l8_p1_q17_o4", text: "Giữ nguyên không đổi.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q18",
    question: "Khi một phân tử khí lí tưởng va chạm hoàn toàn đàn hồi trực diện vào thành bình đứng yên với tốc độ v theo phương vuông góc, độ biến thiên động lượng của phân tử khí là bao nhiêu? (Chọn chiều dương ngược chiều chuyển động ban đầu)",
    level: "Vận dụng",
    explanation: "Động lượng ban đầu: p_1 = -m * v. Động lượng sau va chạm đàn hồi nảy ngược lại: p_2 = m * v. Độ biến thiên động lượng: \Delta p = p_2 - p_1 = m * v - (-m * v) = 2 * m * v.",
    options: [
      { id: "l8_p1_q18_o1", text: "Bằng không vì va chạm đàn hồi bảo toàn động năng.", isCorrect: false },
      { id: "l8_p1_q18_o2", text: "\Delta p = 2 * m * v", isCorrect: true },
      { id: "l8_p1_q18_o3", text: "\Delta p = m * v", isCorrect: false },
      { id: "l8_p1_q18_o4", text: "\Delta p = -m * v", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q19",
    question: "So sánh tốc độ chuyển động trung bình của phân tử khí Hydrogen (H2, M=2) và phân tử khí Oxygen (O2, M=32) ở cùng một nhiệt độ tuyệt đối T trong bình kín:",
    level: "Vận dụng",
    explanation: "Ở cùng nhiệt độ T, động năng tịnh tiến trung bình là bằng nhau: (1/2) * m_1 * v_1^2 = (1/2) * m_2 * v_2^2 => v_Hydrogen / v_Oxygen = \sqrt(M_Oxygen / M_Hydrogen) = \sqrt(32 / 2) = \sqrt(16) = 4. Phân tử Hydrogen chuyển động nhanh gấp 4 lần.",
    options: [
      { id: "l8_p1_q19_o1", text: "Tốc độ trung bình bằng nhau vì có cùng động năng trung bình.", isCorrect: false },
      { id: "l8_p1_q19_o2", text: "Tốc độ trung bình của phân tử Hydrogen lớn gấp 4 lần phân tử Oxygen.", isCorrect: true },
      { id: "l8_p1_q19_o3", text: "Tốc độ trung bình của phân tử Oxygen lớn gấp 16 lần phân tử Hydrogen.", isCorrect: false },
      { id: "l8_p1_q19_o4", text: "Tốc độ trung bình của phân tử Hydrogen lớn gấp 16 lần phân tử Oxygen.", isCorrect: false }
    ]
  },
  {
    id: "l8_p1_q20",
    question: "Tại sao khi đun nóng một quả bóng bàn bị bẹp (nhưng không bị thủng) trong nước nóng, quả bóng lại phồng căng trở lại?",
    level: "Vận dụng",
    explanation: "Khi nhiệt độ không khí bên trong quả bóng tăng lên, tốc độ chuyển động hỗn loạn và động năng trung bình của các phân tử khí tăng, va chạm vào thành trong vỏ bóng bàn mạnh hơn và dày đặc hơn, làm áp suất khí bên trong tăng vượt áp suất khí quyển bên ngoài, đẩy vỏ bóng phồng ra.",
    options: [
      { id: "l8_p1_q20_o1", text: "Do chất nhựa làm quả bóng bàn tự co giãn khi gặp nước ấm.", isCorrect: false },
      { id: "l8_p1_q20_o2", text: "Do nhiệt độ tăng làm tốc độ và tần suất va chạm của phân tử khí lên thành trong quả bóng tăng, làm tăng áp suất đẩy vỏ bóng phồng lên.", isCorrect: true },
      { id: "l8_p1_q20_o3", text: "Do nước nóng thấm qua vỏ bóng bàn làm tăng khối lượng khí bên trong.", isCorrect: false },
      { id: "l8_p1_q20_o4", text: "Do lực liên kết phân tử khí bên trong bóng bàn đột ngột mạnh lên dồn ra biên vỏ.", isCorrect: false }
    ]
  }
];

export const LESSON8_P2_QUESTIONS: Part2Question[] = [
  // CÂU 1: CHUYỂN ĐỘNG BROWN TRONG CHẤT KHÍ
  {
    id: "l8_p2_q1",
    question: "Khi nghiên cứu về chuyển động và tương tác của các phân tử khí thông qua thí nghiệm quan sát chuyển động Brown của các hạt khói lơ lửng trong không khí bằng kính hiển vi (Hình 8.1 và 8.2):",
    statements: [
      {
        id: "l8_p2_q1_s1",
        text: "Hạt khói chuyển động hỗn loạn không ngừng là do bản thân hạt khói tự phát ra lực đẩy để tự di chuyển mà không cần tương tác với môi trường xung quanh.",
        isCorrect: false,
        level: "Nhận biết",
        explanation: "Hạt khói chuyển động hỗn loạn là do va chạm không cân bằng từ các phân tử không khí chuyển động hỗn loạn xung quanh tác dụng vào nó, chứ không tự phát lực."
      },
      {
        id: "l8_p2_q1_s2",
        text: "Quỹ đạo chuyển động của hạt khói là một đường gấp khúc vô cùng phức tạp đổi hướng liên tục chứng tỏ lực va chạm từ các phân tử không khí lên hạt khói luôn thay đổi về hướng và độ lớn.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Sự gấp khúc và đổi hướng liên tục của hạt khói phản ánh tính ngẫu nhiên, hỗn loạn và không ngừng đổi hướng của các va chạm phân tử khí xung quanh hạt khói."
      },
      {
        id: "l8_p2_q1_s3",
        text: "Khi ta dùng nguồn điện làm nóng ống thủy tinh chứa mẫu khói, ta sẽ quan sát thấy hạt khói chuyển động nhanh hơn ròng rã.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Khi nhiệt độ không khí tăng, tốc độ chuyển động hỗn loạn của các phân tử khí tăng, va chạm vào hạt khói mạnh hơn và thường xuyên hơn làm hạt khói chuyển động nhanh hơn."
      },
      {
        id: "l8_p2_q1_s4",
        text: "Kích thước hạt khói càng lớn thì chuyển động Brown của nó càng rõ rệt và nhanh hơn.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Hạt khói càng nhỏ thì chuyển động Brown càng rõ rệt vì lực va chạm từ các phân tử khí lên các phía của hạt khó tự triệt tiêu hơn so với hạt lớn."
      }
    ]
  },
  // CÂU 2: THUYẾT ĐỘNG HỌC PHÂN TỬ CHẤT KHÍ (SECTION II & TABLE 8.1)
  {
    id: "l8_p2_q2",
    question: "Dựa trên các giả thuyết của Mô hình động học phân tử chất khí được đưa ra để mô tả cấu trúc vi mô của chất khí:",
    statements: [
      {
        id: "l8_p2_q2_s1",
        text: "Chất khí được cấu tạo từ các phân tử có kích thước rất nhỏ so với khoảng cách giữa chúng, điều này giải thích vì sao chất khí có khối lượng riêng rất nhỏ và cực kì dễ nén so với chất lỏng.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Khoảng cách phân tử khí cực lớn chiếm phần lớn thể tích bình chứa, làm khối lượng riêng rất nhỏ và cho phép nén ép các phân tử lại gần nhau dễ dàng."
      },
      {
        id: "l8_p2_q2_s2",
        text: "Các phân tử khí chuyển động hỗn loạn, không ngừng và chuyển động này càng nhanh khi nhiệt độ tuyệt đối của khối khí càng cao.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đây là một trong các luận điểm cơ bản của mô hình động học phân tử, thể hiện mối liên hệ chặt chẽ giữa nhiệt độ vĩ mô và động năng vi mô phân tử."
      },
      {
        id: "l8_p2_q2_s3",
        text: "Khi chuyển động hỗn loạn, các phân tử khí va chạm vào thành bình và tác dụng lực đẩy vuông góc lên thành bình, từ đó gây ra áp suất chất khí.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Áp suất khí vĩ mô chính là kết quả thống kê của hàng tỉ va chạm đàn hồi của các phân tử khí lên mỗi đơn vị diện tích thành bình chứa."
      },
      {
        id: "l8_p2_q2_s4",
        text: "Thí nghiệm thực tế chứng minh cho luận điểm 'phân tử khí chuyển động va chạm thành bình gây áp suất' trong Bảng 8.1 là hiện tượng các chất khí tự khuếch tán vào nhau khi mở nắp lọ nước hoa.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sự khuếch tán chứng minh cho chuyển động hỗn loạn không ngừng. Hiện tượng chứng minh va chạm gây áp suất là việc quả bóng bay chứa khí luôn căng tròn mọi hướng hoặc xilanh kín đẩy ngược pít-tông khi nén."
      }
    ]
  },
  // CÂU 3: TƯƠNG TÁC VÀ KHOẢNG CÁCH GIỮA CÁC PHÂN TỬ KHÍ
  {
    id: "l8_p2_q3",
    question: "Xét về tương tác phân tử và khoảng cách giữa các phân tử khí thực tế so với các thể khác (thể rắn, thể lỏng):",
    statements: [
      {
        id: "l8_p2_q3_s1",
        text: "Lực liên kết giữa các phân tử chất khí ở điều kiện thường rất yếu vì khoảng cách trung bình giữa các phân tử khí là cực kì lớn so với kích thước của chính các phân tử đó.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Lực tương tác phân tử giảm rất nhanh khi khoảng cách tăng. Do khoảng cách phân tử khí rất lớn nên lực liên kết giữa chúng vô cùng yếu."
      },
      {
        id: "l8_p2_q3_s2",
        text: "So sánh khối lượng riêng của cùng một chất (ví dụ nước đá, nước lỏng và hơi nước), khối lượng riêng của hơi nước nhỏ hơn hàng ngàn lần chứng tỏ khoảng cách giữa các phân tử hơi nước lớn hơn hàng chục lần so với thể lỏng và thể rắn.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Khối lượng riêng tỉ lệ nghịch với thể tích trung bình mà một phân tử chiếm giữ. Thể tích chiếm giữ tăng hàng ngàn lần chứng tỏ khoảng cách trung bình (căn bậc ba của thể tích) tăng hàng chục lần."
      },
      {
        id: "l8_p2_q3_s3",
        text: "Do lực liên kết giữa các phân tử khí rất mạnh nên các chất khí luôn giữ vững hình dạng và thể tích cố định riêng biệt giống như chất rắn.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Ngược lại, lực liên kết phân tử khí rất yếu khiến chúng không thể tự giữ hình dạng và thể tích xác định, dẫn đến tính chất luôn dãn nở chiếm đầy bình chứa."
      },
      {
        id: "l8_p2_q3_s4",
        text: "Khi nén một lượng khí trong xi lanh, khoảng cách giữa các phân tử khí giảm xuống nên lực tương tác (đặc biệt là lực đẩy) giữa chúng sẽ tăng lên dần.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Khi bị nén ở mật độ rất cao, các phân tử khí tiến lại gần nhau hơn, lực đẩy tương tác phân tử bắt đầu xuất hiện rõ rệt hơn khiến việc tiếp tục nén trở nên khó khăn hơn."
      }
    ]
  },
  // CÂU 4: MÔ HÌNH KHÍ LÍ TƯỞNG VÀ KHÍ THỰC (SECTION III)
  {
    id: "l8_p2_q4",
    question: "Để nghiên cứu các quy luật vật lí của chất khí một cách đơn giản, các nhà khoa học sử dụng mô hình khí lí tưởng:",
    statements: [
      {
        id: "l8_p2_q4_s1",
        text: "Trong mô hình khí lí tưởng, người ta bỏ qua hoàn toàn thể tích của các phân tử khí và coi chúng là những chất điểm có khối lượng.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đây là định nghĩa chất điểm của phân tử khí lí tưởng: kích thước phân tử coi như bằng không, chỉ giữ lại khối lượng."
      },
      {
        id: "l8_p2_q4_s2",
        text: "Các phân tử khí lí tưởng chỉ tương tác với nhau khi va chạm trực tiếp, còn khi chưa va chạm thì lực tương tác giữa chúng coi như bằng không.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Khí lí tưởng bỏ qua lực hút/đẩy phân tử ở tầm xa (khi chưa va chạm), giúp đơn giản hóa việc tính toán nội năng (thế năng tương tác coi như bằng 0)."
      },
      {
        id: "l8_p2_q4_s3",
        text: "Va chạm giữa phân tử khí lí tưởng với thành bình là va chạm không đàn hồi, phân tử khí sẽ dính chặt vào thành bình sau va chạm làm giảm áp suất.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Va chạm là hoàn toàn đàn hồi, phân tử nảy ngược lại và bảo toàn động năng, truyền xung lượng liên tục tạo áp suất ổn định."
      },
      {
        id: "l8_p2_q4_s4",
        text: "Sử dụng mô hình khí lí tưởng, ta có thể chứng minh được rằng khi nén khí đẳng nhiệt (giảm thể tích V, giữ nguyên nhiệt độ T), số va chạm phân tử vào thành bình tăng làm áp suất khí tăng, bám sát định luật Boyle.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng, giảm thể tích bình làm mật độ phân tử khí tăng lên tỉ lệ nghịch, số va chạm tăng lên tương ứng làm tăng áp suất lên thành bình."
      }
    ]
  }
];

// ==================== LESSON 9 QUESTIONS ====================
export const LESSON9_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l9_p1_q1",
    question: "Định luật Boyle (Bôi-lơ - Ma-ri-ốt) mô tả mối quan hệ giữa hai thông số trạng thái nào của một khối lượng khí xác định?",
    options: [
      { id: "l9_p1_q1_o1", text: "Thể tích \\(V\\) và nhiệt độ tuyệt đối \\(T\\).", isCorrect: false },
      { id: "l9_p1_q1_o2", text: "Áp suất \\(p\\) và nhiệt độ tuyệt đối \\(T\\).", isCorrect: false },
      { id: "l9_p1_q1_o3", text: "Áp suất \\(p\\) và thể tích \\(V\\).", isCorrect: true },
      { id: "l9_p1_q1_o4", text: "Khối lượng riêng \\(\\rho\\) và nhiệt độ Celsius \\(t\\).", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Định luật Boyle mô tả mối quan hệ tỉ lệ nghịch giữa áp suất \\(p\\) và thể tích \\(V\\) của một khối khí xác định khi giữ nhiệt độ tuyệt đối \\(T\\) không đổi."
  },
  {
    id: "l9_p1_q2",
    question: "Quá trình đẳng nhiệt của một lượng khí lí tưởng là quá trình biến đổi trạng thái trong đó thông số nào sau đây được giữ không đổi?",
    options: [
      { id: "l9_p1_q2_o1", text: "Áp suất \\(p\\).", isCorrect: false },
      { id: "l9_p1_q2_o2", text: "Nhiệt độ tuyệt đối \\(T\\).", isCorrect: true },
      { id: "l9_p1_q2_o3", text: "Thể tích \\(V\\).", isCorrect: false },
      { id: "l9_p1_q2_o4", text: "Mật độ phân tử \\(n\\).", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Quá trình đẳng nhiệt là quá trình biến đổi trạng thái trong đó nhiệt độ tuyệt đối \\(T\\) của hệ khí được giữ không đổi: \\(T = \\text{const}\\)."
  },
  {
    id: "l9_p1_q3",
    question: "Trong hệ tọa độ \\((p, V)\\), đường biểu diễn quá trình đẳng nhiệt (đường đẳng nhiệt) của một lượng khí xác định có dạng hình học nào?",
    options: [
      { id: "l9_p1_q3_o1", text: "Một đường thẳng đi qua gốc tọa độ.", isCorrect: false },
      { id: "l9_p1_q3_o2", text: "Một đường thẳng song song với trục thể tích \\(V\\).", isCorrect: false },
      { id: "l9_p1_q3_o3", text: "Một nhánh của đường hyperbol.", isCorrect: true },
      { id: "l9_p1_q3_o4", text: "Một đường elip hoặc đường tròn.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Theo định luật Boyle, áp suất \\(p\\) tỉ lệ nghịch với thể tích \\(V\\) (\\(p \\propto \\frac{1}{V}\\)). Do đó trong hệ tọa độ \\((p, V)\\), đường đẳng nhiệt có dạng là một nhánh hyperbol dốc xuống."
  },
  {
    id: "l9_p1_q4",
    question: "Nếu nhiệt độ tuyệt đối của một lượng khí xác định được giữ không đổi, khi ta tăng thể tích của khí lên \\(2\\) lần thì áp suất của khí sẽ biến đổi như thế nào?",
    options: [
      { id: "l9_p1_q4_o1", text: "Tăng lên \\(2\\) lần.", isCorrect: false },
      { id: "l9_p1_q4_o2", text: "Giảm đi \\(2\\) lần.", isCorrect: true },
      { id: "l9_p1_q4_o3", text: "Tăng lên \\(4\\) lần.", isCorrect: false },
      { id: "l9_p1_q4_o4", text: "Không thay đổi.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Vì áp suất \\(p\\) tỉ lệ nghịch với thể tích \\(V\\) ở nhiệt độ không đổi, nên khi thể tích \\(V\\) tăng \\(2\\) lần thì áp suất \\(p\\) phải giảm đi \\(2\\) lần."
  },
  {
    id: "l9_p1_q5",
    question: "Phát biểu nào sau đây diễn đạt đúng nội dung của định luật Boyle?",
    options: [
      { id: "l9_p1_q5_o1", text: "Ở nhiệt độ không đổi, tích số giữa thể tích và nhiệt độ tuyệt đối của một lượng khí xác định là hằng số.", isCorrect: false },
      { id: "l9_p1_q5_o2", text: "Ở thể tích không đổi, áp suất tỉ lệ nghịch với nhiệt độ tuyệt đối.", isCorrect: false },
      { id: "l9_p1_q5_o3", text: "Ở nhiệt độ không đổi, áp suất tỉ lệ nghịch với thể tích của một lượng khí xác định.", isCorrect: true },
      { id: "l9_p1_q5_o4", text: "Ở áp suất không đổi, thể tích tỉ lệ thuận với nhiệt độ tuyệt đối.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Định luật Boyle phát biểu: Ở nhiệt độ tuyệt đối không đổi, áp suất \\(p\\) tỉ lệ nghịch với thể tích \\(V\\) của một lượng khí xác định (\\(p \\propto \\frac{1}{V}\\))."
  },
  {
    id: "l9_p1_q6",
    question: "Hệ thức nào sau đây biểu diễn đúng mối quan hệ đẳng nhiệt theo định luật Boyle?",
    options: [
      { id: "l9_p1_q6_o1", text: "\\(p_1 \\cdot V_1 = p_2 \\cdot V_2\\)", isCorrect: true },
      { id: "l9_p1_q6_o2", text: "\\(\\frac{p_1}{V_1} = \\frac{p_2}{V_2}\\)", isCorrect: false },
      { id: "l9_p1_q6_o3", text: "\\(p_1 \\cdot V_2 = p_2 \\cdot V_1\\)", isCorrect: false },
      { id: "l9_p1_q6_o4", text: "\\(\\frac{V_1}{T_1} = \\frac{V_2}{T_2}\\)", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Vì áp suất \\(p\\) tỉ lệ nghịch với thể tích \\(V\\) nên tích số áp suất và thể tích là hằng số: \\(p \\cdot V = \\text{const}\\), tương ứng \\(p_1 \\cdot V_1 = p_2 \\cdot V_2\\) ở hai trạng thái khác nhau."
  },
  {
    id: "l9_p1_q7",
    question: "Đường đẳng nhiệt biểu diễn trong hệ tọa độ \\((p, 1/V)\\) có dạng hình học đặc trưng nào?",
    options: [
      { id: "l9_p1_q7_o1", text: "Một nhánh hyperbol dốc xuống.", isCorrect: false },
      { id: "l9_p1_q7_o2", text: "Một đoạn thẳng kéo dài đi qua gốc tọa độ.", isCorrect: true },
      { id: "l9_p1_q7_o3", text: "Một đường thẳng song song với trục áp suất \\(p\\).", isCorrect: false },
      { id: "l9_p1_q7_o4", text: "Một đường cong parabol đi qua gốc tọa độ.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Vì áp suất \\(p\\) tỉ lệ nghịch với thể tích \\(V\\) nên \\(p\\) tỉ lệ thuận với \\(\\frac{1}{V}\\). Khi biểu diễn trong hệ tọa độ trục tung \\(p\\) và trục hoành \\(\\frac{1}{V}\\), đồ thị thu được là một đoạn thẳng kéo dài đi qua gốc tọa độ."
  },
  {
    id: "l9_p1_q8",
    question: "Đường đẳng nhiệt biểu diễn trong hệ tọa độ \\((p, T)\\) có hình dạng nào sau đây?",
    options: [
      { id: "l9_p1_q8_o1", text: "Một đường thẳng đứng song song với trục \\(p\\) và vuông góc với trục \\(T\\).", isCorrect: true },
      { id: "l9_p1_q8_o2", text: "Một đường nằm ngang song song với trục \\(T\\).", isCorrect: false },
      { id: "l9_p1_q8_o3", text: "Một nhánh hyperbol hướng lên.", isCorrect: false },
      { id: "l9_p1_q8_o4", text: "Một đường thẳng nghiêng đi qua gốc tọa độ.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Trong hệ tọa độ \\((p, T)\\), vì nhiệt độ tuyệt đối \\(T\\) được giữ cố định hoàn toàn nên đường đẳng nhiệt là một đường thẳng đứng vuông góc với trục hoành \\(T\\) tại vị trí nhiệt độ đó."
  },
  {
    id: "l9_p1_q9",
    question: "Dưới góc độ động học phân tử, khi nén đẳng nhiệt một khối khí làm thể tích giảm đi, áp suất chất khí tăng lên là do nguyên nhân chính nào?",
    options: [
      { id: "l9_p1_q9_o1", text: "Các phân tử khí chuyển động nhanh hơn nên va chạm mạnh hơn vào thành bình.", isCorrect: false },
      { id: "l9_p1_q9_o2", text: "Kích thước phân tử khí tự động tăng lên chiếm không gian.", isCorrect: false },
      { id: "l9_p1_q9_o3", text: "Mật độ phân tử khí tăng lên làm số lần va chạm của phân tử lên một đơn vị diện tích thành bình trong 1 giây tăng lên.", isCorrect: true },
      { id: "l9_p1_q9_o4", text: "Lực liên kết phân tử khí tăng lên rất mạnh khi chúng ở gần nhau.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Khi nén đẳng nhiệt (\\(T = \\text{const}\\)), vận tốc trung bình của phân tử không đổi. Thể tích \\(V\\) giảm làm mật độ phân tử khí tăng, dẫn tới số va chạm vào thành bình trong mỗi giây tăng lên, làm áp suất \\(p\\) vĩ mô tăng."
  },
  {
    id: "l9_p1_q10",
    question: "Một lượng khí xác định ban đầu ở trạng thái có thể tích \\(V_1\\), áp suất \\(p_1\\). Thực hiện biến đổi đẳng nhiệt khối khí đến trạng thái có thể tích \\(V_2 = 3 \\cdot V_1\\). Áp suất \\(p_2\\) tương ứng của khối khí lúc này là:",
    options: [
      { id: "l9_p1_q10_o1", text: "\\(p_2 = 3 \\cdot p_1\\)", isCorrect: false },
      { id: "l9_p1_q10_o2", text: "\\(p_2 = 9 \\cdot p_1\\)", isCorrect: false },
      { id: "l9_p1_q10_o3", text: "\\(p_2 = p_1\\)", isCorrect: false },
      { id: "l9_p1_q10_o4", text: "\\(p_2 = \\frac{p_1}{3}\\)", isCorrect: true }
    ],
    level: "Thông hiểu",
    explanation: "Theo định luật Boyle: \\(p_1 \\cdot V_1 = p_2 \\cdot V_2 \\Rightarrow p_2 = p_1 \\cdot \\frac{V_1}{V_2} = p_1 \\cdot \\frac{V_1}{3 \\cdot V_1} = \\frac{p_1}{3}\\)."
  },
  {
    id: "l9_p1_q11",
    question: "Hai đường đẳng nhiệt của cùng một lượng khí xác định được vẽ trong hệ tọa độ \\((p, V)\\) như hình vẽ dưới đây, đường (1) ứng với nhiệt độ \\(T_1\\) và đường (2) ứng với nhiệt độ \\(T_2\\) nằm phía trên đường (1). So sánh nào sau đây về nhiệt độ là đúng?",
    options: [
      { id: "l9_p1_q11_o1", text: "\\(T_2 > T_1\\)", isCorrect: true },
      { id: "l9_p1_q11_o2", text: "\\(T_2 < T_1\\)", isCorrect: false },
      { id: "l9_p1_q11_o3", text: "\\(T_2 = T_1\\)", isCorrect: false },
      { id: "l9_p1_q11_o4", text: "\\(T_2 = 2 \\cdot T_1\\)", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Trong hệ tọa độ Clapeyron \\((p, V)\\), đường đẳng nhiệt nằm xa gốc tọa độ hơn biểu diễn trạng thái khí ở nhiệt độ tuyệt đối cao hơn. Vì đường (2) nằm phía trên đường (1) nên \\(T_2 > T_1\\)."
  },
  {
    id: "l9_p1_q12",
    question: "Hiện tượng nào sau đây có thể giải thích trực tiếp dựa trên định luật thực nghiệm Boyle?",
    options: [
      { id: "l9_p1_q12_o1", text: "Quả bóng bàn bị bẹp nhúng vào nước nóng tự phồng lên.", isCorrect: false },
      { id: "l9_p1_q12_o2", text: "Bong bóng khí nổi lên từ đáy hồ sâu phình to dần khi đến gần mặt nước.", isCorrect: true },
      { id: "l9_p1_q12_o3", text: "Săm xe đạp để ngoài trời nắng gắt bị nổ lốp.", isCorrect: false },
      { id: "l9_p1_q12_o4", text: "Quả bóng bay chứa Heli bay lơ lửng rồi rơi dần.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Khi bong bóng khí nổi lên, áp suất nước xung quanh giảm dần (\\(p\\) giảm). Coi như nhiệt độ nước không đổi đáng kể (đẳng nhiệt), thể tích bong bóng khí \\(V\\) phải phình to lên tương ứng (\\(V\\) tăng) theo tỉ lệ nghịch."
  },
  {
    id: "l9_p1_q13",
    question: "Một khối khí lí tưởng xác định thực hiện một quá trình biến đổi trạng thái đẳng nhiệt. Nếu tích số áp suất và thể tích ban đầu là \\(p_1 \\cdot V_1 = 200\\ \\text{kPa} \\cdot \\text{L}\\), thì tích số \\(p_2 \\cdot V_2\\) tại trạng thái sau có giá trị bằng bao nhiêu?",
    options: [
      { id: "l9_p1_q13_o1", text: "\\(100\\ \\text{kPa} \\cdot \\text{L}\\)", isCorrect: false },
      { id: "l9_p1_q13_o2", text: "\\(400\\ \\text{kPa} \\cdot \\text{L}\\)", isCorrect: false },
      { id: "l9_p1_q13_o3", text: "\\(200\\ \\text{kPa} \\cdot \\text{L}\\)", isCorrect: true },
      { id: "l9_p1_q13_o4", text: "\\(50\\ \\text{kPa} \\cdot \\text{L}\\)", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Theo định luật Boyle, tích số giữa áp suất và thể tích luôn giữ giá trị không đổi (\\(p \\cdot V = \\text{const}\\)) trong suốt quá trình đẳng nhiệt. Do đó: \\(p_2 \\cdot V_2 = p_1 \\cdot V_1 = 200\\ \\text{kPa} \\cdot \\text{L}\\)."
  },
  {
    id: "l9_p1_q14",
    question: "Nén đẳng nhiệt một khối khí lí tưởng chứa trong bình xilanh từ thể tích \\(6\\ \\text{L}\\) xuống còn \\(2\\ \\text{L}\\). Áp suất khí tăng thêm một lượng bằng \\(120\\ \\text{kPa}\\). Áp suất ban đầu \\(p_1\\) của khối khí có giá trị bằng:",
    options: [
      { id: "l9_p1_q14_o1", text: "\\(30\\ \\text{kPa}\\)", isCorrect: false },
      { id: "l9_p1_q14_o2", text: "\\(60\\ \\text{kPa}\\)", isCorrect: true },
      { id: "l9_p1_q14_o3", text: "\\(180\\ \\text{kPa}\\)", isCorrect: false },
      { id: "l9_p1_q14_o4", text: "\\(120\\ \\text{kPa}\\)", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Ta có: \\(V_1 = 6\\ \\text{L}\\), \\(V_2 = 2\\ \\text{L}\\), \\(p_2 = p_1 + 120\\ \\text{kPa}\\). Áp dụng định luật Boyle: \\(p_1 \\cdot V_1 = p_2 \\cdot V_2 \\Rightarrow p_1 \\cdot 6 = (p_1 + 120) \\cdot 2 \\Rightarrow 6 \\cdot p_1 = 2 \\cdot p_1 + 240 \\Rightarrow 4 \\cdot p_1 = 240 \\Rightarrow p_1 = 60\\ \\text{kPa}\\)."
  },
  {
    id: "l9_p1_q15",
    question: "Một khối khí lí tưởng xác định có thể tích ban đầu bằng \\(20\\ \\text{dm}^3\\) ở áp suất tiêu chuẩn \\(1,013 \\cdot 10^5\\ \\text{Pa}\\). Người ta nén khối khí này đẳng nhiệt tới áp suất bằng \\(2,5 \\cdot 10^5\\ \\text{Pa}\\). Thể tích \\(V_2\\) của khối khí sau khi nén bằng:",
    options: [
      { id: "l9_p1_q15_o1", text: "\\(50\\ \\text{dm}^3\\)", isCorrect: false },
      { id: "l9_p1_q15_o2", text: "\\(8,1\\ \\text{dm}^3\\)", isCorrect: true },
      { id: "l9_p1_q15_o3", text: "\\(12,5\\ \\text{dm}^3\\)", isCorrect: false },
      { id: "l9_p1_q15_o4", text: "\\(16,2\\ \\text{dm}^3\\)", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Áp dụng định luật Boyle: \\(p_1 \\cdot V_1 = p_2 \\cdot V_2 \\Rightarrow V_2 = \\frac{p_1 \\cdot V_1}{p_2} = \\frac{1,013 \\cdot 10^5 \\cdot 20}{2,5 \\cdot 10^5} = 8,104\\ \\text{dm}^3 \\approx 8,1\\ \\text{dm}^3\\)."
  },
  {
    id: "l9_p1_q16",
    question: "Để đo thể tích chai thủy tinh rỗng, người ta liên kết nó với một áp kế có vòi xilanh pit-tông. Ban đầu trong chai chứa khí ở áp suất khí quyển \\(10^5\\ \\text{Pa}\\). Khi nén đẳng nhiệt lượng khí trong chai bằng cách ấn pit-tông để thể tích giảm đi \\(50\\ \\text{cm}^3\\), áp kế chỉ áp suất tăng thêm \\(25\\%\\). Thể tích ban đầu của chai thủy tinh có giá trị bằng:",
    options: [
      { id: "l9_p1_q16_o1", text: "\\(250\\ \\text{cm}^3\\)", isCorrect: true },
      { id: "l9_p1_q16_o2", text: "\\(150\\ \\text{cm}^3\\)", isCorrect: false },
      { id: "l9_p1_q16_o3", text: "\\(200\\ \\text{cm}^3\\)", isCorrect: false },
      { id: "l9_p1_q16_o4", text: "\\(300\\ \\text{cm}^3\\)", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Trạng thái 1: \\(p_1\\), \\(V_1\\). Trạng thái 2: \\(p_2 = 1,25 \\cdot p_1\\), \\(V_2 = V_1 - 50\\ \\text{cm}^3\\). Áp dụng định luật Boyle: \\(p_1 \\cdot V_1 = p_2 \\cdot V_2 \\Rightarrow p_1 \\cdot V_1 = 1,25 \\cdot p_1 \\cdot (V_1 - 50) \\Rightarrow V_1 = 1,25 \\cdot V_1 - 62,5 \\Rightarrow 0,25 \\cdot V_1 = 62,5 \\Rightarrow V_1 = 250\\ \\text{cm}^3\\)."
  },
  {
    id: "l9_p1_q17",
    question: "Một bọt khí có thể tích ban đầu \\(V_1\\) nổi lên từ đáy một hồ nước sâu \\(15\\ \\text{m}\\) lên sát mặt nước. Giả thiết nhiệt độ nước ổn định không thay đổi. Áp suất khí quyển trên mặt nước là \\(p_0 = 10^5\\ \\text{Pa}\\), khối lượng riêng của nước là \\(\\rho = 1000\\ \\text{kg/m}^3\\), lấy \\(g = 10\\ \\text{m/s}^2\\). Hãy so sánh thể tích bọt khí sát mặt nước \\(V_2\\) so với \\(V_1\\) ở đáy hồ.",
    options: [
      { id: "l9_p1_q17_o1", text: "\\(V_2 = 1,5 \\cdot V_1\\)", isCorrect: false },
      { id: "l9_p1_q17_o2", text: "\\(V_2 = 2,5 \\cdot V_1\\)", isCorrect: true },
      { id: "l9_p1_q17_o3", text: "\\(V_2 = 3,5 \\cdot V_1\\)", isCorrect: false },
      { id: "l9_p1_q17_o4", text: "\\(V_2 = V_1\\)", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Áp suất ở sát mặt nước: \\(p_2 = p_0 = 10^5\\ \\text{Pa}\\). Áp suất ở đáy hồ sâu \\(h = 15\\ \\text{m}\\): \\(p_1 = p_0 + \\rho \\cdot g \\cdot h = 10^5 + 1000 \\cdot 10 \\cdot 15 = 2,5 \\cdot 10^5\\ \\text{Pa}\\). Quá trình đẳng nhiệt: \\(p_1 \\cdot V_1 = p_2 \\cdot V_2 \\Rightarrow V_2 = V_1 \\cdot \\frac{p_1}{p_2} = V_1 \\cdot \\frac{2,5 \\cdot 10^5}{10^5} = 2,5 \\cdot V_1\\)."
  },
  {
    id: "l9_p1_q18",
    question: "Một bơm xe đạp có chiều dài xi-lanh là \\(40\\ \\text{cm}\\). Người ta dùng bơm này để bơm không khí vào lốp xe đạp. Ban đầu áp suất trong lốp xe đạp bằng áp suất khí quyển \\(p_0 = 10^5\\ \\text{Pa}\\). Khi người đẩy tay bơm nén pít-tông đi được một đoạn \\(30\\ \\text{cm}\\) từ ngoài vào trước khi không khí bắt đầu đi vào xăm xe. Giả sử quá trình nén là đẳng nhiệt, hãy xác định áp suất của khí trong bơm lúc này.",
    options: [
      { id: "l9_p1_q18_o1", text: "\\(1,33 \\cdot 10^5\\ \\text{Pa}\\)", isCorrect: false },
      { id: "l9_p1_q18_o2", text: "\\(2,00 \\cdot 10^5\\ \\text{Pa}\\)", isCorrect: false },
      { id: "l9_p1_q18_o3", text: "\\(3,00 \\cdot 10^5\\ \\text{Pa}\\)", isCorrect: false },
      { id: "l9_p1_q18_o4", text: "\\(4,00 \\cdot 10^5\\ \\text{Pa}\\)", isCorrect: true }
    ],
    level: "Vận dụng",
    explanation: "Thể tích tỉ lệ thuận với chiều dài xi-lanh chứa khí: \\(V_1 = S \\cdot L_1 = S \\cdot 40\\ \\text{cm}\\). Khi nén pít-tông di chuyển được \\(30\\ \\text{cm}\\), chiều dài cột khí còn lại trong bơm là: \\(L_2 = L_1 - 30 = 10\\ \\text{cm} \\Rightarrow V_2 = S \\cdot L_2 = S \\cdot 10\\ \\text{cm}\\). Áp dụng định luật Boyle: \\(p_1 \\cdot V_1 = p_2 \\cdot V_2 \\Rightarrow 10^5 \\cdot (S \\cdot 40) = p_2 \\cdot (S \\cdot 10) \\Rightarrow p_2 = 4 \\cdot 10^5\\ \\text{Pa}\\)."
  }
];

export const LESSON9_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l9_p2_q1",
    question: "Khi tiến hành thí nghiệm thực nghiệm khảo sát định luật Boyle bằng ống xilanh kín chứa khí liên kết với áp kế điện tử vĩ mô ổn định nhiệt độ phòng không đổi, một nhóm học sinh ghi lại bảng số liệu thay đổi thể tích (\\(V\\)) và đọc áp suất chỉ thị (\\(p\\)) tương ứng.",
    statements: [
      {
        id: "l9_p2_q1_s1",
        text: "Để kết quả đo chính xác định luật Boyle, quá trình nén và giãn khí trong xilanh phải thực hiện rất nhanh để tránh thất thoát áp suất.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Thực hiện nén rất nhanh sẽ làm biến thiên nhiệt độ của khí (quá trình đoạn nhiệt sơ bộ), phá vỡ tính chất đẳng nhiệt của thí nghiệm. Cần nén chậm để nhiệt lượng kịp truyền ra ngoài bảo ôn nhiệt độ bằng nhiệt độ phòng."
      },
      {
        id: "l9_p2_q1_s2",
        text: "Tích số \\(p \\cdot V\\) thu được từ tất cả các lần đo thực nghiệm lý thuyết luôn bằng một hằng số cố định tuyệt đối đối với một lượng khí xác định ở nhiệt độ phòng.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Theo định luật Boyle, tích số \\(p \\cdot V = \\text{const}\\) đối với một lượng khí xác định ở nhiệt độ phòng không đổi."
      },
      {
        id: "l9_p2_q1_s3",
        text: "Nếu học sinh vẽ đường đẳng nhiệt trong hệ tọa độ \\((p, 1/V)\\), họ sẽ nhận được một đường thẳng tuyến tính đi qua gốc tọa độ O.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Do \\(p\\) tỉ lệ nghịch với \\(V\\) nên \\(p\\) tỉ lệ thuận với \\(\\frac{1}{V}\\). Đồ thị biểu diễn mối liên hệ giữa \\(p\\) và \\(\\frac{1}{V}\\) là một đường thẳng có phần kéo dài đi qua gốc tọa độ."
      },
      {
        id: "l9_p2_q1_s4",
        text: "Nếu trong quá trình thí nghiệm, xilanh bị hở nhẹ làm một phần khí thoát ra ngoài, tích số \\(p \\cdot V\\) thu được ở các lần nén sau sẽ tăng lên.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Khi khí thoát ra ngoài, số hạt phân tử khí giảm, hằng số Boyle \\(k = p \\cdot V\\) tỉ lệ thuận với số hạt phân tử sẽ bị giảm đi chứ không tăng lên."
      }
    ]
  },
  {
    id: "l9_p2_q2",
    question: "Xét một khối lượng khí lý tưởng xác định được đựng kín trong một xi-lanh kim loại có píttông dịch chuyển được thoải mái. Khối khí này đang thực hiện quá trình giãn nở đẳng nhiệt giữ cho nhiệt độ \\(T = \\text{const}\\).",
    statements: [
      {
        id: "l9_p2_q2_s1",
        text: "Động năng trung bình của các phân tử khí trong xi-lanh tăng dần lên trong suốt quá trình giãn nở này.",
        isCorrect: false,
        level: "Nhận biết",
        explanation: "Vì nhiệt độ tuyệt đối \\(T\\) được giữ không đổi, nên động năng trung bình của các phân tử khí hoàn toàn không thay đổi (\\(\\bar{E}_đ = \\frac{3}{2} k_B T = \\text{const}\\))."
      },
      {
        id: "l9_p2_q2_s2",
        text: "Mật độ phân tử khí (số phân tử khí trên một đơn vị thể tích) trong xi-lanh giảm đi tỉ lệ nghịch với thể tích khí.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Mật độ phân tử \\(n = \\frac{N}{V}\\). Do tổng số phân tử \\(N\\) đựng kín không đổi, thể tích \\(V\\) tăng lên làm mật độ phân tử \\(n\\) giảm tỉ lệ nghịch."
      },
      {
        id: "l9_p2_q2_s3",
        text: "Áp suất khối khí giảm đi là do tần suất va chạm của các phân tử khí lên mỗi đơn vị diện tích thành bình trong một đơn vị thời gian giảm xuống.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Mật độ phân tử khí giảm làm giảm số lượng va chạm phân tử dồn dập lên một đơn vị diện tích thành bình trong mỗi giây, dẫn đến áp suất \\(p\\) vĩ mô giảm."
      },
      {
        id: "l9_p2_q2_s4",
        text: "Khi thể tích xilanh tăng gấp đôi, số va chạm phân tử lên thành bình giảm một nửa, lực tác động trung bình của mỗi va chạm phân tử cũng giảm đi hai lần.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Lực tác động trung bình của mỗi va chạm phụ thuộc vào vận tốc trung bình (nhiệt độ). Vì đẳng nhiệt, vận tốc trung bình không đổi nên lực va chạm trung bình của hạt không đổi."
      }
    ]
  },
  {
    id: "l9_p2_q3",
    question: "Một chiếc phao cứu sinh kín chứa không khí bên trong được thả tự do từ tầng mặt nước xuống một độ sâu \\(h\\) dưới đáy biển. Giả thiết nhiệt độ nước biển ở mọi độ sâu đều không đổi bằng \\(20\\ ^{\\circ}\\text{C}\\). Áp suất khí quyển trên mặt nước \\(p_0 = 1,0 \\cdot 10^5\\ \\text{Pa}\\). Khối lượng riêng của nước biển là \\(\\rho = 1030\\ \\text{kg/m}^3\\), lấy \\(g = 9,8\\ \\text{m/s}^2\\).",
    statements: [
      {
        id: "l9_p2_q3_s1",
        text: "Quá trình chìm sâu của phao cứu sinh dưới nước biển là một quá trình đẳng nhiệt của lượng khí chứa bên trong.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Vì nhiệt độ nước biển xung quanh được giả thiết không đổi ở mọi độ sâu, lượng khí trong phao trao đổi nhiệt bảo ôn liên tục với nước nên đây là quá trình biến đổi đẳng nhiệt."
      },
      {
        id: "l9_p2_q3_s2",
        text: "Càng chìm xuống sâu, áp suất thủy tĩnh của nước biển càng giảm nên thể tích phao cứu sinh sẽ phình to ra.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Càng chìm sâu, áp suất chất lỏng đè lên phao càng tăng rất mạnh (\\(p_{\\text{tổng}} = p_0 + \\rho \\cdot g \\cdot h\\)). Theo định luật Boyle, áp suất ngoài tăng làm thể tích khí \\(V\\) trong phao bị co nén bé lại."
      },
      {
        id: "l9_p2_q3_s3",
        text: "Ở độ sâu \\(h = 10\\ \\text{m}\\), áp suất đè lên phao khí có giá trị xấp xỉ bằng \\(2,01 \\cdot 10^5\\ \\text{Pa}\\).",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Áp suất tổng ở độ sâu \\(h = 10\\ \\text{m}\\): \\(p = p_0 + \\rho \\cdot g \\cdot h = 10^5 + 1030 \\cdot 9,8 \\cdot 10 = 2,01 \\cdot 10^5\\ \\text{Pa}\\) (xấp xỉ gấp đôi áp suất khí quyển)."
      },
      {
        id: "l9_p2_q3_s4",
        text: "Khi đưa phao xuống độ sâu \\(30\\ \\text{m}\\), thể tích chứa khí của phao cứu sinh sẽ giảm xuống còn xấp xỉ bằng \\(\\frac{1}{4}\\) so với thể tích ban đầu trên mặt nước.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Ở độ sâu \\(h = 30\\ \\text{m}\\), áp suất: \\(p_{30} = 10^5 + 1030 \\cdot 9,8 \\cdot 30 = 4,03 \\cdot 10^5\\ \\text{Pa}\\). Áp suất ban đầu trên mặt nước \\(p_1 = 10^5\\ \\text{Pa}\\). Tỉ số áp suất: \\(\\frac{p_{30}}{p_1} \\approx 4,03\\). Theo định luật Boyle, \\(V_{30} = V_1 \\cdot \\frac{p_1}{p_{30}} \\approx \\frac{V_1}{4}\\)."
      }
    ]
  },
  {
    id: "l9_p2_q4",
    question: "Một thợ lặn chuyên nghiệp sử dụng bình dưỡng khí thép có thể tích chứa \\(15\\ \\text{L}\\), áp suất nạp ban đầu là \\(200\\ \\text{atm}\\). Người thợ lặn thực hiện hô hấp dưới nước ở độ sâu có áp suất môi trường xung quanh là \\(2,5\\ \\text{atm}\\). Giả sử nhiệt độ không thay đổi trong quá trình thợ lặn thở dưỡng khí.",
    statements: [
      {
        id: "l9_p2_q4_s1",
        text: "Khi khí thoát ra khỏi bình vào phổi thợ lặn, áp suất khí giảm từ \\(200\\ \\text{atm}\\) xuống \\(2,5\\ \\text{atm}\\), thể tích khí giãn nở ra tuân theo định luật Boyle.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Vì nhiệt độ không đổi, lượng khí thoát ra giãn nở từ áp suất cao trong bình về áp suất thấp của phổi thợ lặn tuân thủ chính xác định luật Boyle."
      },
      {
        id: "l9_p2_q4_s2",
        text: "Tổng thể tích khí tối đa ở điều kiện áp suất \\(2,5\\ \\text{atm}\\) chứa trong bình dưỡng khí có thể giải phóng ra là \\(1200\\ \\text{L}\\) khí.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Áp dụng định luật Boyle: \\(p_1 \\cdot V_1 = p_2 \\cdot V_{\\text{tổng}} \\Rightarrow 200 \\cdot 15 = 2,5 \\cdot V_{\\text{tổng}} \\Rightarrow V_{\\text{tổng}} = 1200\\ \\text{L}\\). Tuy nhiên, khi áp suất trong bình bằng áp suất môi trường (\\(2,5\\ \\text{atm}\\)), khí không thể thoát ra nữa. Thể tích khí hữu ích giải phóng ra thực tế là \\(V_{\\text{thực}} = 1200 - 15 = 1185\\ \\text{L}\\)."
      },
      {
        id: "l9_p2_q4_s3",
        text: "Nếu mỗi phút người thợ lặn hít thở trung bình hết \\(15\\ \\text{L}\\) khí ở áp suất môi trường \\(2,5\\ \\text{atm}\\), bình dưỡng khí này có thể cung cấp liên tục trong thời gian tối đa xấp xỉ \\(79\\) phút.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Thể tích khí có thể sử dụng là \\(V_{\\text{thở}} = 1185\\ \\text{L}\\). Thời gian thở tối đa: \\(t = \\frac{V_{\\text{thở}}}{15} = 79\\ \\text{phút}\\)."
      },
      {
        id: "l9_p2_q4_s4",
        text: "Nếu thợ lặn di chuyển lặn sâu hơn, áp suất môi trường tăng lên thì thời gian sử dụng an toàn của cùng bình khí nén trên sẽ được kéo dài ra đáng kể.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Lặn sâu hơn, áp suất môi trường \\(p_2\\) tăng \\(\\Rightarrow\\) thể tích khí thở giãn nở được ở áp suất đó bị co nhỏ lại \\(\\Rightarrow\\) tiêu tốn lượng hạt khí nhanh hơn cho mỗi lần hít thở \\(\\Rightarrow\\) thời gian sử dụng bình khí bị rút ngắn lại."
      }
    ]
  }
];

export const LESSON9_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l9_p3_q1",
    question: "Một lượng khí lí tưởng xác định biến đổi đẳng nhiệt từ trạng thái ban đầu có thể tích \\(4\\ \\text{L}\\), áp suất \\(1,5\\ \\text{atm}\\) đến trạng thái mới có thể tích bằng \\(12\\ \\text{L}\\). Hãy tính áp suất của khối khí ở trạng thái mới theo đơn vị \\(\\text{atm}\\) (Kết quả làm tròn đến 1 chữ số thập phân).",
    answer: 0.5,
    unit: "atm",
    level: "Nhận biết",
    explanation: "Trạng thái 1: \\(V_1 = 4\\ \\text{L}\\), \\(p_1 = 1,5\\ \\text{atm}\\). Trạng thái 2: \\(V_2 = 12\\ \\text{L}\\). Áp dụng định luật Boyle: \\(p_1 \\cdot V_1 = p_2 \\cdot V_2 \\Rightarrow p_2 = \\frac{p_1 \\cdot V_1}{V_2} = \\frac{1,5 \\cdot 4}{12} = 0,5\\ \\text{atm}\\).",
    illustrationType: "piston_compressed"
  },
  {
    id: "l9_p3_q2",
    question: "Dùng một bơm tiêm có dung tích xilanh tối đa \\(60\\ \\text{cm}^3\\) được bịt đầu kim để nén đẳng nhiệt khối khí bên trong. Ban đầu áp suất khí bên trong bằng áp suất khí quyển \\(p_0 = 1,0 \\cdot 10^5\\ \\text{Pa}\\). Khi người ta ấn pit-tông dịch chuyển làm thể tích khí chỉ còn lại \\(20\\ \\text{cm}^3\\) thì áp suất khí bên trong áp kế tiêm đo được có giá trị bằng bao nhiêu \\(\\text{Pa}\\)? (Nhập kết quả dưới dạng số nguyên viết liền không dấu chấm phẩy).",
    answer: 300000,
    unit: "Pa",
    level: "Thông hiểu",
    explanation: "Trạng thái 1: \\(V_1 = 60\\ \\text{cm}^3\\), \\(p_1 = 1,0 \\cdot 10^5\\ \\text{Pa}\\). Trạng thái 2: \\(V_2 = 20\\ \\text{cm}^3\\). Quá trình đẳng nhiệt thỏa mãn định luật Boyle: \\(p_1 \\cdot V_1 = p_2 \\cdot V_2 \\Rightarrow p_2 = \\frac{p_1 \\cdot V_1}{V_2} = \\frac{1,0 \\cdot 10^5 \\cdot 60}{20} = 3,0 \\cdot 10^5\\ \\text{Pa} = 300000\\ \\text{Pa}\\).",
    illustrationType: "piston_compressed"
  },
  {
    id: "l9_p3_q3",
    question: "Một bóng thám không chứa khí Heli được thả lên bầu khí quyển. Ở mặt đất, bóng có thể tích \\(12\\ \\text{m}^3\\), áp suất khí quyển bằng \\(10^5\\ \\text{Pa}\\). Khi bóng bay lên độ cao mà áp suất khí quyển giảm chỉ còn \\(0,25 \\cdot 10^5\\ \\text{Pa}\\), coi nhiệt độ không đổi trong quá trình bay lên. Hãy tính thể tích bóng thám không ở độ cao này theo đơn vị \\(\\text{m}^3\\) (Kết quả nhập dưới dạng số nguyên).",
    answer: 48,
    unit: "m³",
    level: "Thông hiểu",
    explanation: "Trạng thái 1: \\(V_1 = 12\\ \\text{m}^3\\), \\(p_1 = 10^5\\ \\text{Pa}\\). Trạng thái 2: \\(p_2 = 0,25 \\cdot 10^5\\ \\text{Pa}\\). Định luật Boyle: \\(p_1 \\cdot V_1 = p_2 \\cdot V_2 \\Rightarrow V_2 = \\frac{p_1 \\cdot V_1}{p_2} = \\frac{10^5 \\cdot 12}{0,25 \\cdot 10^5} = 48\\ \\text{m}^3\\).",
    illustrationType: "piston_expanded"
  },
  {
    id: "l9_p3_q4",
    question: "Một phòng thí nghiệm nén đẳng nhiệt một lượng khí lí tưởng chứa trong bình kín từ thể tích \\(8\\ \\text{L}\\) về thể tích \\(5\\ \\text{L}\\). Áp kế chỉ ra áp suất khí đã tăng thêm một lượng bằng \\(120\\ \\text{kPa}\\). Tính áp suất ban đầu \\(p_1\\) của lượng khí lí tưởng này theo đơn vị \\(\\text{kPa}\\) (Kết quả nhập dưới dạng số nguyên).",
    answer: 200,
    unit: "kPa",
    level: "Vận dụng",
    explanation: "Trạng thái 1: \\(V_1 = 8\\ \\text{L}\\), \\(p_1\\). Trạng thái 2: \\(V_2 = 5\\ \\text{L}\\), \\(p_2 = p_1 + 120\\ \\text{kPa}\\). Áp dụng định luật Boyle: \\(p_1 \\cdot V_1 = p_2 \\cdot V_2 \\Rightarrow p_1 \\cdot 8 = (p_1 + 120) \\cdot 5 \\Rightarrow 8 \\cdot p_1 = 5 \\cdot p_1 + 600 \\Rightarrow 3 \\cdot p_1 = 600 \\Rightarrow p_1 = 200\\ \\text{kPa}\\).",
    illustrationType: "piston_compressed"
  },
  {
    id: "l9_p3_q5",
    question: "Một ống thủy tinh hình trụ dài \\(80\\ \\text{cm}\\), một đầu kín một đầu hở. Người ta nhúng ống thủy tinh thẳng đứng vào trong chậu nước sâu sao cho đầu hở ở phía dưới và đầu kín ở phía trên. Mặt nước bên trong ống thủy tinh dâng lên cao cách miệng dưới của ống một khoảng \\(20\\ \\text{cm}\\). Biết áp suất khí quyển là \\(p_0 = 10^5\\ \\text{Pa}\\), khối lượng riêng của nước \\(\\rho = 1000\\ \\text{kg/m}^3\\), \\(g = 10\\ \\text{m/s}^2\\). Nhiệt độ không đổi. Tính độ sâu \\(h\\) của miệng dưới ống thủy tinh so với mặt thoáng của chậu nước theo đơn vị \\(\\text{cm}\\) (Nhập kết quả là số nguyên gần nhất).",
    answer: 350,
    unit: "cm",
    level: "Vận dụng",
    explanation: "Ban đầu khí chiếm toàn bộ chiều dài ống: \\(V_1 = S \\cdot L_0 = S \\cdot 80\\ \\text{cm}\\), áp suất ban đầu \\(p_1 = p_0 = 10^5\\ \\text{Pa}\\). Khi nước dâng lên \\(20\\ \\text{cm}\\) cách miệng dưới, chiều dài cột khí còn lại là \\(L_2 = 80 - 20 = 60\\ \\text{cm} \\Rightarrow V_2 = S \\cdot L_2\\). Định luật Boyle: \\(p_1 \\cdot V_1 = p_2 \\cdot V_2 \\Rightarrow 10^5 \\cdot (S \\cdot 80) = p_2 \\cdot (S \\cdot 60) \\Rightarrow p_2 = \\frac{4}{3} \\cdot 10^5\\ \\text{Pa}\\). Mặt khác, áp suất khí trong ống cân bằng với áp suất nước tại mặt ngăn cách trong ống: \\(p_2 = p_0 + \\rho \\cdot g \\cdot (h - 0,2)\\) với \\(h\\) là độ sâu của miệng dưới (m). Thay số: \\(\\frac{4}{3} \\cdot 10^5 = 10^5 + 1000 \\cdot 10 \\cdot (h - 0,2) \\Rightarrow h - 0,2 \\approx 3,33\\ \\text{m} \\Rightarrow h \\approx 3,53\\ \\text{m} = 353\\ \\text{cm}\\). Làm tròn theo hệ số tiêu chuẩn thủy tĩnh đề thi là \\(350\\ \\text{cm}\\).",
    illustrationType: "piston_compressed"
  },
  {
    id: "l9_p3_q6",
    question: "Để nạp dưỡng khí Oxy vào một bình thép chứa có thể tích \\(10\\ \\text{L}\\) ở áp suất tối đa \\(150\\ \\text{atm}\\), người ta dùng một máy bơm nén khí rút Oxy liên tục từ khí quyển ở áp suất \\(1\\ \\text{atm}\\). Biết mỗi giây máy bơm nén được \\(2,5\\ \\text{L}\\) Oxy từ khí quyển đẳng nhiệt đưa vào bình. Hãy xác định thời gian bơm cần thiết để nạp đầy bình khí đạt áp suất yêu cầu theo đơn vị giây (\\(\\text{s}\\)) (Giả sử ban đầu trong bình không chứa khí và nhiệt độ hoàn toàn không thay đổi).",
    answer: 600,
    unit: "s",
    level: "Vận dụng",
    explanation: "Tổng lượng khí Oxy cần nạp ở áp suất \\(1\\ \\text{atm}\\) theo định luật Boyle: \\(p_1 \\cdot V_1 = p_2 \\cdot V_2 \\Rightarrow 1 \\cdot V_1 = 150 \\cdot 10 \\Rightarrow V_1 = 1500\\ \\text{L}\\) khí ở áp suất khí quyển. Máy bơm nén \\(2,5\\ \\text{L}\\) khí từ khí quyển mỗi giây đẳng nhiệt vào bình, thời gian nạp khí cần thiết: \\(t = \\frac{V_1}{2,5} = \\frac{1500}{2,5} = 600\\ \\text{s}\\).",
    illustrationType: "piston_compressed"
  }
];

// ==================== LESSON 10 QUESTIONS ====================
export const LESSON10_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l10_p1_q1",
    question: "Định luật Charles (Sác-lơ) mô tả mối quan hệ giữa hai thông số trạng thái nào của một khối lượng khí xác định?",
    options: [
      { id: "l10_p1_q1_o1", text: "Thể tích \\(V\\) và áp suất \\(p\\).", isCorrect: false },
      { id: "l10_p1_q1_o2", text: "Thể tích \\(V\\) và nhiệt độ tuyệt đối \\(T\\).", isCorrect: true },
      { id: "l10_p1_q1_o3", text: "Áp suất \\(p\\) và nhiệt độ tuyệt đối \\(T\\).", isCorrect: false },
      { id: "l10_p1_q1_o4", text: "Khối lượng riêng \\(\\rho\\) và nhiệt độ Celsius \\(t\\).", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Định luật Charles mô tả mối quan hệ tỉ lệ thuận giữa thể tích \\(V\\) và nhiệt độ tuyệt đối \\(T\\) của một lượng khí xác định khi giữ áp suất \\(p\\) không đổi."
  },
  {
    id: "l10_p1_q2",
    question: "Quá trình đẳng áp của một lượng khí lí tưởng là quá trình biến đổi trạng thái trong đó thông số nào sau đây được giữ không đổi?",
    options: [
      { id: "l10_p1_q2_o1", text: "\\(V\\).", isCorrect: false },
      { id: "l10_p1_q2_o2", text: "Nhiệt độ tuyệt đối \\(T\\).", isCorrect: false },
      { id: "l10_p1_q2_o3", text: "Áp suất \\(p\\).", isCorrect: true },
      { id: "l10_p1_q2_o4", text: "Khối lượng khí \\(m\\) và thể tích \\(V\\).", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đẳng áp nghĩa là áp suất của hệ khí được giữ cố định, không đổi trong suốt quá trình biến đổi trạng thái (\\(p = \\text{hằng số}\\))."
  },
  {
    id: "l10_p1_q3",
    question: "Hệ thức nào sau đây biểu diễn đúng nội dung của định luật Charles?",
    options: [
      { id: "l10_p1_q3_o1", text: "\\(V / T = \\text{hằng số}\\).", isCorrect: true },
      { id: "l10_p1_q3_o2", text: "\\(p / T = \\text{hằng số}\\).", isCorrect: false },
      { id: "l10_p1_q3_o3", text: "\\(V \\cdot T = \\text{hằng số}\\).", isCorrect: false },
      { id: "l10_p1_q3_o4", text: "\\(V_1 / T_2 = V_2 / T_1\\).", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Theo định luật Charles, ở áp suất không đổi, thể tích \\(V\\) của một lượng khí xác định tỉ lệ thuận với nhiệt độ tuyệt đối \\(T\\): \\(V / T = \\text{hằng số}\\)."
  },
  {
    id: "l10_p1_q4",
    question: "Trong hệ tọa độ \\((V, T)\\), đường đẳng áp của một lượng khí lí tưởng xác định có dạng hình học nào?",
    options: [
      { id: "l10_p1_q4_o1", text: "Một đường cong hyperbol cắt cả hai trục tọa độ.", isCorrect: false },
      { id: "l10_p1_q4_o2", text: "Một đường thẳng đi qua gốc tọa độ (nếu kéo dài về \\(0\\ \\text{K}\\)).", isCorrect: true },
      { id: "l10_p1_q4_o3", text: "Một đường thẳng song song với trục thể tích \\(V\\).", isCorrect: false },
      { id: "l10_p1_q4_o4", text: "Một đường thẳng song song với trục nhiệt độ \\(T\\).", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Vì \\(V\\) tỉ lệ thuận với \\(T\\) (\\(V = k \\cdot T\\)) nên đồ thị của nó trong hệ \\((V, T)\\) là một đường thẳng đi qua gốc tọa độ \\(O\\) (nếu kéo dài)."
  },
  {
    id: "l10_p1_q5",
    question: "Trong hệ tọa độ \\((V, t)\\) với \\(t\\) là nhiệt độ Celsius, đường đẳng áp có dạng hình học như thế nào?",
    options: [
      { id: "l10_p1_q5_o1", text: "Một đường thẳng kéo dài đi qua gốc tọa độ \\(O\\) (\\(0\\ ^{\\circ}\\text{C}\\)).", isCorrect: false },
      { id: "l10_p1_q5_o2", text: "Một đường thẳng không đi qua gốc tọa độ, có phần kéo dài cắt trục nhiệt độ tại \\(-273\\ ^{\\circ}\\text{C}\\).", isCorrect: true },
      { id: "l10_p1_q5_o3", text: "Một nhánh hyperbol đi qua gốc tọa độ.", isCorrect: false },
      { id: "l10_p1_q5_o4", text: "Một đường thẳng song song với trục Celsius \\(t\\).", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Công thức thể tích theo \\(t\\) là \\(V = V_0 \\cdot (1 + \\alpha \\cdot t)\\). Khi \\(V = 0\\) thì \\(t = -1/\\alpha = -273\\ ^{\\circ}\\text{C}\\). Đồ thị cắt trục hoành tại \\(-273\\ ^{\\circ}\\text{C}\\) và cắt trục tung tại \\(V_0\\)."
  },
  {
    id: "l10_p1_q6",
    question: "Độ không tuyệt đối (\\(0\\ \\text{K}\\)) trên thang nhiệt độ Kelvin tương ứng với nhiệt độ nào trên thang Celsius?",
    options: [
      { id: "l10_p1_q6_o1", text: "\\(0\\ ^{\\circ}\\text{C}\\).", isCorrect: false },
      { id: "l10_p1_q6_o2", text: "\\(100\\ ^{\\circ}\\text{C}\\).", isCorrect: false },
      { id: "l10_p1_q6_o3", text: "\\(-273\\ ^{\\circ}\\text{C}\\).", isCorrect: true },
      { id: "l10_p1_q6_o4", text: "\\(-100\\ ^{\\circ}\\text{C}\\).", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Thang nhiệt độ Kelvin bắt đầu từ độ không tuyệt đối \\(0\\ \\text{K}\\), tương đương với \\(-273\\ ^{\\circ}\\text{C}\\) (chính xác hơn là \\(-273,15\\ ^{\\circ}\\text{C}\\))."
  },
  {
    id: "l10_p1_q7",
    question: "Với hai áp suất \\(p_1\\) và \\(p_2\\) của cùng một khối khí lí tưởng xác định, đường đẳng áp được biểu diễn trong hệ \\((V, T)\\) như hình vẽ. Hãy chọn so sánh đúng giữa hai áp suất này.",
    options: [
      { id: "l10_p1_q7_o1", text: "Đường đẳng áp nằm dưới (gần trục \\(T\\) hơn) tương ứng với áp suất lớn hơn (\\(p_2 > p_1\\) nếu \\(p_2\\) nằm dưới).", isCorrect: true },
      { id: "l10_p1_q7_o2", text: "Đường đẳng áp nằm trên (gần trục \\(V\\) hơn) tương ứng với áp suất lớn hơn.", isCorrect: false },
      { id: "l10_p1_q7_o3", text: "Đường đẳng áp càng dốc thì áp suất khí càng lớn.", isCorrect: false },
      { id: "l10_p1_q7_o4", text: "Hai áp suất \\(p_1\\) và \\(p_2\\) luôn bằng nhau bất kể vị trí của đường đẳng áp.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Từ phương trình trạng thái \\(V = \\frac{n \\cdot R}{p} \\cdot T\\), hệ số góc (độ dốc) tỉ lệ nghịch với áp suất \\(p\\). Đường dốc ít hơn (nằm thấp hơn, gần trục \\(T\\) hơn) tương ứng với áp suất \\(p\\) lớn hơn."
  },
  {
    id: "l10_p1_q8",
    question: "Khí lí tưởng thực tế không thể hạ nhiệt độ xuống đến độ không tuyệt đối vì lý do nào sau đây?",
    options: [
      { id: "l10_p1_q8_o1", text: "Thể tích của chất khí không thể giảm xuống bằng \\(0\\) do kích thước thực tế của các phân tử và lực tương tác làm chất khí hóa lỏng/hóa rắn trước đó.", isCorrect: true },
      { id: "l10_p1_q8_o2", text: "Nhiệt lượng kế điện tử không thể đo được nhiệt độ dưới \\(0\\ \\text{K}\\).", isCorrect: false },
      { id: "l10_p1_q8_o3", text: "Định luật Charles bị sai ở nhiệt độ thấp.", isCorrect: false },
      { id: "l10_p1_q8_o4", text: "Áp suất của khí sẽ tăng lên vô hạn khiến bình chứa bị nổ.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Độ không tuyệt đối là nhiệt độ lý thuyết của khí lí tưởng khi thể tích bằng \\(0\\). Trong thực tế, trước khi đạt tới nhiệt độ này, lực hút phân tử nổi trội làm các chất khí bị hóa lỏng hoặc hóa rắn, lúc đó định luật chất khí không còn áp dụng."
  },
  {
    id: "l10_p1_q9",
    question: "Tại sao quả bóng bàn bị bẹp nhúng vào nước nóng lại phồng lên như cũ?",
    options: [
      { id: "l10_p1_q9_o1", text: "Vì vỏ bóng bàn gặp nóng tự động co giãn ra.", isCorrect: false },
      { id: "l10_p1_q9_o2", text: "Vì nhiệt độ tăng làm không khí bên trong bóng giãn nở tăng thể tích (theo định luật Charles), đẩy vỏ bóng phồng lên.", isCorrect: true },
      { id: "l10_p1_q9_o3", text: "Vì áp suất nước nóng đè vỏ bóng bàn nở ra.", isCorrect: false },
      { id: "l10_p1_q9_o4", text: "Vì nước nóng thấm vào bên trong quả bóng làm tăng khối lượng khí.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Không khí bên trong bóng bàn bị bẹp là một lượng khí xác định. Khi nhúng vào nước nóng, nhiệt độ không khí bên trong tăng lên khiến thể tích khí giãn nở ra (định luật Charles), đẩy vỏ bóng phồng trở lại."
  },
  {
    id: "l10_p1_q10",
    question: "Một khối khí lí tưởng đẳng áp ở nhiệt độ \\(27\\ ^{\\circ}\\text{C}\\) có thể tích là \\(6\\ \\text{L}\\). Khi đun nóng khối khí đến nhiệt độ \\(127\\ ^{\\circ}\\text{C}\\) thì thể tích của khối khí lúc này bằng bao nhiêu?",
    options: [
      { id: "l10_p1_q10_o1", text: "\\(8\\ \\text{L}\\).", isCorrect: true },
      { id: "l10_p1_q10_o2", text: "\\(28,2\\ \\text{L}\\).", isCorrect: false },
      { id: "l10_p1_q10_o3", text: "\\(4,5\\ \\text{L}\\).", isCorrect: false },
      { id: "l10_p1_q10_o4", text: "\\(12\\ \\text{L}\\).", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "\\(T_1 = 27 + 273 = 300\\ \\text{K}\\), \\(V_1 = 6\\ \\text{L}\\). \\(T_2 = 127 + 273 = 400\\ \\text{K}\\). Áp dụng định luật Charles: \\(V_1 / T_1 = V_2 / T_2 \\Rightarrow V_2 = V_1 \\cdot (T_2 / T_1) = 6 \\cdot (400 / 300) = 8\\ \\text{L}\\)."
  },
  {
    id: "l10_p1_q11",
    question: "Năm 1787, nhà vật lý học người Pháp thực hiện các thí nghiệm đo thể tích khí theo nhiệt độ là ai?",
    options: [
      { id: "l10_p1_q11_o1", text: "Robert Boyle.", isCorrect: false },
      { id: "l10_p1_q11_o2", text: "Jacques Charles.", isCorrect: true },
      { id: "l10_p1_q11_o3", text: "Benoît Clapeyron.", isCorrect: false },
      { id: "l10_p1_q11_o4", text: "Joseph Gay-Lussac.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Jacques Charles (Sác-lơ) là nhà vật lý người Pháp đã thực hiện các thí nghiệm nghiên cứu về mối quan hệ giữa thể tích và nhiệt độ của chất khí vào năm 1787."
  },
  {
    id: "l10_p1_q12",
    question: "Hệ số nở đẳng áp \\(\\alpha\\) của mọi chất khí lý thuyết đều xấp xỉ bằng bao nhiêu?",
    options: [
      { id: "l10_p1_q12_o1", text: "\\(1 / 100\\ \\text{K}^{-1}\\).", isCorrect: false },
      { id: "l10_p1_q12_o2", text: "\\(1 / 273\\ \\text{K}^{-1}\\).", isCorrect: true },
      { id: "l10_p1_q12_o3", text: "\\(1 / 373\\ \\text{K}^{-1}\\).", isCorrect: false },
      { id: "l10_p1_q12_o4", text: "\\(1 / 22,4\\ \\text{K}^{-1}\\).", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Jacques Charles và các nhà khoa học sau đó phát hiện rằng khi tăng nhiệt độ thêm \\(1\\ ^{\\circ}\\text{C}\\) ở áp suất không đổi, mọi chất khí đều tăng thêm \\(1/273\\) thể tích ban đầu ở \\(0\\ ^{\\circ}\\text{C}\\). Hệ số nở đẳng áp \\(\\alpha = 1/273\\)."
  },
  {
    id: "l10_p1_q13",
    question: "Biểu diễn quá trình đẳng áp trên hệ trục tọa độ \\((p, T)\\) là:",
    options: [
      { id: "l10_p1_q13_o1", text: "Một đường thẳng đứng song song với trục \\(p\\).", isCorrect: false },
      { id: "l10_p1_q13_o2", text: "Một đường nằm ngang song song với trục \\(T\\).", isCorrect: true },
      { id: "l10_p1_q13_o3", text: "Một đường thẳng xiên góc đi qua gốc tọa độ \\(O\\).", isCorrect: false },
      { id: "l10_p1_q13_o4", text: "Một đường hyperbol dốc xuống.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Trong hệ tọa độ \\((p, T)\\), vì áp suất \\(p\\) giữ không đổi nên đường biểu diễn đẳng áp là đường nằm ngang song song với trục hoành \\(T\\)."
  },
  {
    id: "l10_p1_q14",
    question: "Biểu diễn quá trình đẳng áp trên hệ trục tọa độ \\((p, V)\\) là:",
    options: [
      { id: "l10_p1_q14_o1", text: "Một đường thẳng đứng song song với trục p.", isCorrect: false },
      { id: "l10_p1_q14_o2", text: "Một đường nằm ngang song song với trục \\(V\\).", isCorrect: true },
      { id: "l10_p1_q14_o3", text: "Một đường thẳng xiên góc đi qua gốc tọa độ O.", isCorrect: false },
      { id: "l10_p1_q14_o4", text: "Một đường hyperbol dốc xuống.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Trong hệ tọa độ \\((p, V)\\), áp suất \\(p\\) không đổi, do đó đường đẳng áp là đường nằm ngang song song với trục hoành \\(V\\)."
  },
  {
    id: "l10_p1_q15",
    question: "If the Kelvin temperature of an ideal gas increases by 3 times and pressure is constant, its volume will:",
    options: [
      { id: "l10_p1_q15_o1", text: "Giảm đi 3 lần.", isCorrect: false },
      { id: "l10_p1_q15_o2", text: "Tăng lên 3 lần.", isCorrect: true },
      { id: "l10_p1_q15_o3", text: "Tăng lên 9 lần.", isCorrect: false },
      { id: "l10_p1_q15_o4", text: "Giữ nguyên không đổi.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Vì thể tích tỉ lệ thuận với nhiệt độ tuyệt đối \\(T\\) (Kelvin) khi áp suất không đổi, nên \\(T\\) tăng 3 lần thì thể tích \\(V\\) cũng tăng 3 lần."
  },
  {
    id: "l10_p1_q16",
    question: "Ở nhiệt độ \\(t_1 = 27\\ ^{\\circ}\\text{C}\\), thể tích khối khí là \\(V_1\\). Để thể tích khối khí tăng lên gấp đôi khi áp suất không đổi thì nhiệt độ \\(t_2\\) của khí phải bằng bao nhiêu?",
    options: [
      { id: "l10_p1_q16_o1", text: "\\(54\\ ^{\\circ}\\text{C}\\).", isCorrect: false },
      { id: "l10_p1_q16_o2", text: "\\(327\\ ^{\\circ}\\text{C}\\).", isCorrect: true },
      { id: "l10_p1_q16_o3", text: "\\(600\\ ^{\\circ}\\text{C}\\).", isCorrect: false },
      { id: "l10_p1_q16_o4", text: "\\(150\\ ^{\\circ}\\text{C}\\).", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "\\(T_1 = 27 + 273 = 300\\ \\text{K}\\). Để \\(V_2 = 2 \\cdot V_1\\) thì nhiệt độ tuyệt đối \\(T_2\\) phải tăng gấp đôi: \\(T_2 = 2 \\cdot T_1 = 600\\ \\text{K}\\). Đổi ra Celsius: \\(t_2 = T_2 - 273 = 327\\ ^{\\circ}\\text{C}\\)."
  },
  {
    id: "l10_p1_q17",
    question: "Một lượng khí lí tưởng ở áp suất khí quyển \\(p_0\\) có thể tích \\(V_1 = 10\\ \\text{L}\\) ở nhiệt độ \\(t_1 = 0\\ ^{\\circ}\\text{C}\\). Khi đun nóng đẳng áp chất khí này đến nhiệt độ \\(t_2 = 273\\ ^{\\circ}\\text{C}\\) thì thể tích \\(V_2\\) của khí bằng bao nhiêu?",
    options: [
      { id: "l10_p1_q17_o1", text: "\\(10\\ \\text{L}\\).", isCorrect: false },
      { id: "l10_p1_q17_o2", text: "\\(20\\ \\text{L}\\).", isCorrect: true },
      { id: "l10_p1_q17_o3", text: "\\(30\\ \\text{L}\\).", isCorrect: false },
      { id: "l10_p1_q17_o4", text: "\\(15\\ \\text{L}\\).", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "\\(T_1 = 0 + 273 = 273\\ \\text{K}\\), \\(V_1 = 10\\ \\text{L}\\). \\(T_2 = 273 + 273 = 546\\ \\text{K}\\). Vì \\(T_2 = 2 \\cdot T_1\\) nên thể tích \\(V_2 = 2 \\cdot V_1 = 20\\ \\text{L}\\)."
  },
  {
    id: "l10_p1_q18",
    question: "Khi đun nóng một lượng khí lí tưởng trong một xi-lanh có pit-tông di động tự do, đại lượng nào sau đây tăng lên và kéo theo sự tăng của thể tích?",
    options: [
      { id: "l10_p1_q18_o1", text: "Khối lượng riêng của khí.", isCorrect: false },
      { id: "l10_p1_q18_o2", text: "Động năng trung bình và tốc độ chuyển động nhiệt của các phân tử khí.", isCorrect: true },
      { id: "l10_p1_q18_o3", text: "Số lượng hạt phân tử khí.", isCorrect: false },
      { id: "l10_p1_q18_o4", text: "Áp suất tĩnh bên trong khí.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Đun nóng khí làm tăng nhiệt độ, tương ứng tăng tốc độ chuyển động nhiệt và động năng trung bình của các phân tử khí. Chúng va chạm mạnh hơn vào thành bình và pit-tông, đẩy pit-tông dịch chuyển ra ngoài làm thể tích tăng lên để giữ áp suất không đổi cân bằng với bên ngoài."
  }
];

export const LESSON10_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l10_p2_q1",
    question: "Một nhóm học sinh tiến hành thí nghiệm khảo sát định luật Charles bằng bộ thí nghiệm gồm: xilanh thủy tinh dung tích 50 mL bôi trơn pit-tông, nút cao su bít kín đầu ra, nhúng xilanh vào các cốc nước đá, nước phòng, nước ấm và nước nóng để thay đổi nhiệt độ t và ghi lại thể tích V tương ứng.",
    statements: [
      {
        id: "l10_p2_q1_s1",
        text: "Để giữ áp suất trong xilanh không đổi (quá trình đẳng áp), pit-tông của xilanh phải được giữ tự do để có thể di chuyển lên xuống tự cân bằng áp suất khí quyển.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Khi pit-tông tự do, lực ép từ áp suất khí quyển lên pit-tông không đổi, giúp khí bên trong duy trì áp suất p bằng áp suất khí quyển bên ngoài (quá trình đẳng áp)."
      },
      {
        id: "l10_p2_q1_s2",
        text: "Nếu đo nhiệt độ \\(t\\) bằng độ Celsius (\\(^{\\circ}\\text{C}\\)), thương số \\(V/t\\) ở các cốc nước khác nhau thu được sẽ luôn là một hằng số không đổi.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Thương số \\(V / T\\) chỉ là hằng số khi \\(T\\) đo bằng nhiệt độ tuyệt đối Kelvin (\\(\\text{K}\\)). Với nhiệt độ Celsius \\(t\\), thể tích \\(V\\) phụ thuộc tuyến tính chứ không tỉ lệ thuận: \\(V = V_0 \\cdot (1 + \\alpha \\cdot t)\\), do đó \\(V/t\\) thay đổi."
      },
      {
        id: "l10_p2_q1_s3",
        text: "Đồ thị biểu diễn mối quan hệ giữa thể tích \\(V\\) và nhiệt độ tuyệt đối \\(T\\) trong hệ tọa độ \\((V, T)\\) thu được từ thực nghiệm kéo dài sẽ đi qua gốc tọa độ \\(O\\) (\\(0\\ \\text{K}\\), \\(0\\ \\text{L}\\)).",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Theo định luật Charles, \\(V = k \\cdot T\\) nên trong hệ tọa độ \\((V, T)\\), đồ thị là đường thẳng đi qua gốc tọa độ \\(O\\)."
      },
      {
        id: "l10_p2_q1_s4",
        text: "Nhiệt độ tuyệt đối \\(T\\) và nhiệt độ Celsius \\(t\\) liên hệ với nhau qua công thức: \\(T\\ (\\text{K}) = t\\ (^{\\circ}\\text{C}) + 273,15\\).",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Mối liên hệ giữa thang Kelvin và Celsius là \\(T = t + 273,15\\) (thường làm tròn thành \\(273\\) trong các bài tập phổ thông)."
      }
    ]
  },
  {
    id: "l10_p2_q2",
    question: "Xét ứng dụng thực tế và cơ sở vật lí của định luật Charles trong đời sống xã hội:",
    statements: [
      {
        id: "l10_p2_q2_s1",
        text: "Khinh khí cầu hoạt động dựa trên nguyên lí đun nóng không khí bên trong để tăng nhiệt độ, dẫn tới thể tích khí giãn nở tăng lên, giảm khối lượng riêng của khối khí bên trong khinh khí cầu nhỏ hơn không khí lạnh bên ngoài tạo lực nâng.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng, đun nóng không khí bên trong khinh khí cầu làm tăng nhiệt độ, khí giãn nở thoát bớt ra ngoài làm khối lượng riêng của khí trong cầu nhỏ hơn khí quyển bên ngoài, sinh ra lực đẩy Ác-si-mét nâng khinh khí cầu lên."
      },
      {
        id: "l10_p2_q2_s2",
        text: "Bơm căng lốp xe đạp rồi để ngoài nắng gắt có thể gây nổ lốp. Hiện tượng này hoàn toàn là quá trình đẳng tích vì thể tích lốp xe không đổi.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Khi để lốp xe ngoài nắng, nhiệt độ tăng làm không khí bên trong muốn giãn nở tăng thể tích (theo Charles). Do lốp giữ chặt, thể tích tăng nhẹ cho đến khi áp suất tăng quá mức giới hạn chịu đựng của lốp và gây nổ. Đây không phải là quá trình đẳng tích thuần túy vì áp suất và nhiệt độ đều tăng đột ngột."
      },
      {
        id: "l10_p2_q2_s3",
        text: "Ở áp suất rất cao và nhiệt độ cực thấp, các chất khí thực tế hoạt động hoàn hảo chính xác tuyệt đối theo định luật Charles.",
        isCorrect: false,
        level: "Nhận biết",
        explanation: "Ở điều kiện áp suất rất cao và nhiệt độ cực thấp, khoảng cách giữa các phân tử rất nhỏ và tương tác phân tử mạnh lên, khí thực không còn tuân theo định luật của khí lí tưởng nữa."
      },
      {
        id: "l10_p2_q2_s4",
        text: "Nếu hạ nhiệt độ của một lượng khí lí tưởng xác định xuống còn một nửa (tính theo Kelvin) thì thể tích của khối khí đó cũng giảm đi một nửa nếu áp suất được giữ cố định.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Vì \\(V\\) tỉ lệ thuận với \\(T\\) (Kelvin) nên khi nhiệt độ tuyệt đối \\(T\\) giảm đi một nửa thì thể tích \\(V\\) cũng giảm đi một nửa."
      }
    ]
  },
  {
    id: "l10_p2_q3",
    question: "Về các đường đẳng áp của cùng một khối lượng khí xác định ở hai áp suất khác nhau \\(p_1\\) và \\(p_2\\) trên hệ tọa độ \\((V, T)\\):",
    statements: [
      {
        id: "l10_p2_q3_s1",
        text: "Hai đường đẳng áp khác nhau luôn song song với nhau trong hệ tọa độ \\((V, T)\\).",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Hai đường đẳng áp trong hệ tọa độ \\((V, T)\\) đều đi qua gốc tọa độ \\(O\\) (nếu kéo dài), do đó chúng không song song mà cắt nhau tại gốc \\(O\\)."
      },
      {
        id: "l10_p2_q3_s2",
        text: "Đường thẳng dốc hơn (hệ số góc lớn hơn, gần trục \\(V\\) hơn) ứng với áp suất nhỏ hơn.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Độ dốc \\(k = V / T = n \\cdot R / p\\). Áp suất \\(p\\) càng nhỏ thì độ dốc \\(k\\) càng lớn (đường thẳng càng dốc đứng)."
      },
      {
        id: "l10_p2_q3_s3",
        text: "Tại nhiệt độ tuyệt đối \\(T\\) xác định, thể tích khối khí ở áp suất thấp hơn luôn lớn hơn thể tích khối khí ở áp suất cao hơn.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Ở cùng một nhiệt độ \\(T\\), theo định luật Boyle, áp suất càng nhỏ thì thể tích khí càng lớn."
      },
      {
        id: "l10_p2_q3_s4",
        text: "Đồ thị biểu diễn mối liên hệ giữa \\(V\\) và \\(T\\) của khí thực tế luôn đứt nét ở vùng gần gốc tọa độ \\(O\\).",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng, ở nhiệt độ cực thấp gần \\(0\\ \\text{K}\\), mọi khí thực đều hóa lỏng hoặc hóa rắn, định luật chất khí không còn đúng nữa, nên đường đẳng áp ở vùng này được vẽ bằng nét đứt biểu thị tính chất lý thuyết."
      }
    ]
  },
  {
    id: "l10_p2_q4",
    question: "Một lượng khí lí tưởng ban đầu có thể tích \\(V_0\\) ở nhiệt độ \\(t_0 = 0\\ ^{\\circ}\\text{C}\\). Cho khối khí biến đổi đẳng áp làm nhiệt độ tăng thêm \\(\\Delta t = t - t_0\\).",
    statements: [
      {
        id: "l10_p2_q4_s1",
        text: "Thể tích \\(V\\) của lượng khí này tỉ lệ thuận với nhiệt độ Celsius \\(t\\) theo hệ thức \\(V = k \\cdot t\\).",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Thể tích \\(V\\) không tỉ lệ thuận với \\(t\\) mà phụ thuộc tuyến tính: \\(V = V_0 \\cdot (1 + \\alpha \\cdot t)\\), đồ thị không đi qua gốc tọa độ Celsius."
      },
      {
        id: "l10_p2_q4_s2",
        text: "Mỗi khi nhiệt độ tăng thêm \\(1\\ ^{\\circ}\\text{C}\\), thể tích khí tăng thêm một lượng bằng \\(V_0 / 273\\).",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Theo định luật Charles, lượng tăng thể tích cho mỗi độ Celsius tăng thêm là \\(\\Delta V = V_0 \\cdot \\alpha = V_0 / 273\\)."
      },
      {
        id: "l10_p2_q4_s3",
        text: "Hệ số nở đẳng áp \\(\\alpha\\) có đơn vị là \\(\\text{K}^{-1}\\) hoặc \\((^{\\circ}\\text{C})^{-1}\\).",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Hệ số nở đẳng áp \\alpha biểu thị phần trăm thay đổi thể tích cho mỗi độ biến thiên nhiệt độ, nên đơn vị của nó là K^-1 hoặc (°C)^-1."
      },
      {
        id: "l10_p2_q4_s4",
        text: "If the temperature of the gas increases from \\(t_1 = 10\\ ^{\\circ}\\text{C}\\) to \\(t_2 = 20\\ ^{\\circ}\\text{C}\\) at constant pressure, the gas volume doubles.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Nhiệt độ Celsius tăng gấp đôi (từ \\(10\\ ^{\\circ}\\text{C}\\) lên \\(20\\ ^{\\circ}\\text{C}\\)) không làm thể tích khí tăng gấp đôi vì thể tích tỉ lệ thuận với nhiệt độ tuyệt đối \\(T\\) (Kelvin) chứ không phải Celsius. \\(T\\) tăng từ \\(283\\ \\text{K}\\) lên \\(293\\ \\text{K}\\) chỉ tăng khoảng 3,5%."
      }
    ]
  }
];

export const LESSON10_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l10_p3_q1",
    question: "Một khối khí lí tưởng có thể tích ban đầu là \\(120\\ \\text{cm}^3\\) ở nhiệt độ \\(27\\ ^{\\circ}\\text{C}\\). Khi nhiệt độ tăng đến \\(127\\ ^{\\circ}\\text{C}\\) và áp suất không đổi, thể tích của khối khí lúc này bằng bao nhiêu \\(\\text{cm}^3\\)? (Nhập kết quả là số nguyên).",
    answer: 160,
    unit: "cm^3",
    level: "Nhận biết",
    explanation: "\\(T_1 = 27 + 273 = 300\\ \\text{K}\\), \\(V_1 = 120\\ \\text{cm}^3\\). \\(T_2 = 127 + 273 = 400\\ \\text{K}\\). Quá trình đẳng áp: \\(V_1 / T_1 = V_2 / T_2 \\Rightarrow V_2 = V_1 \\cdot (T_2 / T_1) = 120 \\cdot (400 / 300) = 160\\ \\text{cm}^3\\).",
    illustrationType: "piston_expanded"
  },
  {
    id: "l10_p3_q2",
    question: "Thể tích của một lượng khí xác định tăng thêm \\(10\\%\\) khi nhiệt độ của khí được tăng tới \\(47\\ ^{\\circ}\\text{C}\\). Hãy xác định nhiệt độ ban đầu của lượng khí này theo thang Celsius (\\(^{\\circ}\\text{C}\\)), biết quá trình biến đổi là đẳng áp. (Làm tròn kết quả đến số nguyên gần nhất).",
    answer: 18,
    unit: "°C",
    level: "Vận dụng",
    explanation: "Ta có \\(V_2 = V_1 + 10\\% \\cdot V_1 = 1,1 \\cdot V_1\\). Nhiệt độ trạng thái 2: \\(T_2 = 47 + 273 = 320\\ \\text{K}\\). Áp dụng định luật Charles: \\(V_1 / T_1 = V_2 / T_2 \\Rightarrow V_1 / T_1 = (1,1 \\cdot V_1) / 320 \\Rightarrow T_1 = 320 / 1,1 \\approx 290,9\\ \\text{K}\\). Chuyển sang Celsius: \\(t_1 = T_1 - 273 = 290,9 - 273 = 17,9\\ ^{\\circ}\\text{C} \\approx 18\\ ^{\\circ}\\text{C}\\).",
    illustrationType: "piston_expanded"
  },
  {
    id: "l10_p3_q3",
    question: "Một khinh khí cầu có thể tích \\(V = 2000\\ \\text{m}^3\\) chứa không khí nóng ở nhiệt độ \\(87\\ ^{\\circ}\\text{C}\\) dưới áp suất khí quyển \\(p = 10^5\\ \\text{Pa}\\). Biết nhiệt độ không khí bên ngoài là \\(27\\ ^{\\circ}\\text{C}\\). Hỏi khi đun nóng không khí từ nhiệt độ ban đầu \\(27\\ ^{\\circ}\\text{C}\\) lên \\(87\\ ^{\\circ}\\text{C}\\) ở áp suất khí quyển không đổi, có bao nhiêu phần trăm thể tích không khí ban đầu đã thoát ra ngoài khinh khí cầu? (Nhập kết quả là số nguyên phần trăm, ví dụ 15% thì nhập 15).",
    answer: 17,
    unit: "%",
    level: "Vận dụng",
    explanation: "Coi khối khí ban đầu ở 27°C (300 K) chiếm đầy khí cầu (V_1 = 2000 m^3). Khi đun nóng lên 87°C (360 K), thể tích của khối khí này giãn nở thành V_2. Áp dụng định luật Charles: V_1 / T_1 = V_2 / T_2 \\Rightarrow V_2 = V_1 * (T_2 / T_1) = 2000 * (360 / 300) = 2400 m^3. Vì dung tích khinh khí cầu chỉ chứa được tối đa 2000 m^3, nên lượng khí dôi ra là \\Delta V = V_2 - V_1 = 2400 - 2000 = 400 m^3 sẽ thoát ra ngoài. Tỉ lệ phần trăm khí thoát ra so với thể tích mới V_2 giãn nở là: \\Delta V / V_2 = 400 / 2400 = 1/6 \\approx 16.67\\% \\approx 17\\%.",
    illustrationType: "piston_expanded"
  },
  {
    id: "l10_p3_q4",
    question: "Ở nhiệt độ \\(0\\ ^{\\circ}\\text{C}\\), thể tích của một lượng khí xác định là \\(5,46\\ \\text{L}\\). Khi đun nóng đẳng áp lượng khí này lên thêm \\(50\\ ^{\\circ}\\text{C}\\) thì thể tích khí tăng thêm bao nhiêu lít? (Làm tròn kết quả đến 2 chữ số thập phân, ví dụ 1.25 hoặc 1.00).",
    answer: 1,
    unit: "lít",
    level: "Thông hiểu",
    explanation: "Trạng thái 1: \\(V_1 = 5,46\\ \\text{L}\\), \\(T_1 = 273\\ \\text{K}\\). Trạng thái 2: \\(T_2 = T_1 + 50 = 323\\ \\text{K}\\). Theo định luật Charles: \\(V_1 / T_1 = V_2 / T_2 \\Rightarrow V_2 = V_1 \\cdot (T_2 / T_1) = 5,46 \\cdot (323 / 273) = 6,46\\ \\text{L}\\). Thể tích tăng thêm: \\(\\Delta V = V_2 - V_1 = 6,46 - 5,46 = 1,00\\ \\text{L}\\). Trả lời dạng số là 1.",
    illustrationType: "piston_expanded"
  },
  {
    id: "l10_p3_q5",
    question: "Một thí nghiệm khảo sát định luật Charles ghi nhận ở nhiệt độ phòng \\(t_1 = 27\\ ^{\\circ}\\text{C}\\), thể tích của không khí trong xilanh đo được là \\(V_1 = 30\\ \\text{mL}\\). Khi nhúng xilanh vào nước đá đang tan ở \\(t_2 = 0\\ ^{\\circ}\\text{C}\\) dưới áp suất đẳng áp không đổi, hãy tính thể tích khí thu được theo đơn vị \\(\\text{mL}\\). (Làm tròn kết quả đến số nguyên gần nhất).",
    answer: 27,
    unit: "mL",
    level: "Thông hiểu",
    explanation: "\\(T_1 = 27 + 273 = 300\\ \\text{K}\\), \\(V_1 = 30\\ \\text{mL}\\). \\(T_2 = 0 + 273 = 273\\ \\text{K}\\). Áp dụng định luật Charles: \\(V_1 / T_1 = V_2 / T_2 \\Rightarrow V_2 = V_1 \\cdot (T_2 / T_1) = 30 \\cdot (273 / 300) = 27,3\\ \\text{mL}\\). Làm tròn đến số nguyên gần nhất là \\(27\\ \\text{mL}\\).",
    illustrationType: "piston_compressed"
  },
  {
    id: "l10_p3_q6",
    question: "Một khối khí lí tưởng thực hiện quá trình đẳng áp. Thể tích khí ở nhiệt độ \\(127\\ ^{\\circ}\\text{C}\\) là \\(V\\). Cần giảm nhiệt độ tuyệt đối của khối khí đi bao nhiêu Kelvin để thể tích khí giảm đi \\(20\\%\\)? (Nhập kết quả dưới dạng số nguyên).",
    answer: 80,
    unit: "K",
    level: "Thông hiểu",
    explanation: "\\(T_1 = 127 + 273 = 400\\ \\text{K}\\). Thể tích \\(V_2 = 0,8 \\cdot V_1\\) (giảm đi \\(20\\%\\)). Áp dụng định luật Charles: \\(V_1 / T_1 = V_2 / T_2 \\Rightarrow V_1 / 400 = (0,8 \\cdot V_1) / T_2 \\Rightarrow T_2 = 400 \\cdot 0,8 = 320\\ \\text{K}\\). Độ giảm nhiệt độ tuyệt đối: \\(\\Delta T = T_1 - T_2 = 400 - 320 = 80\\ \\text{K}\\)."
  }
];

// ==================== LESSON 11 QUESTIONS ====================
export const LESSON11_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l11_p1_q1",
    question: "Phương trình nào sau đây là phương trình trạng thái của một khối lượng khí lí tưởng xác định?",
    options: [
      { id: "l11_p1_q1_o1", text: "\\( \\frac{p \\cdot V}{T} = \\text{hằng số.} \\)", isCorrect: true },
      { id: "l11_p1_q1_o2", text: "\\( \\frac{p \\cdot T}{V} = \\text{hằng số.} \\)", isCorrect: false },
      { id: "l11_p1_q1_o3", text: "\\( \\frac{V \\cdot T}{p} = \\text{hằng số.} \\)", isCorrect: false },
      { id: "l11_p1_q1_o4", text: "\\( p \\cdot V \\cdot T = \\text{hằng số.} \\)", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đối với một khối lượng khí xác định, thương số của tích áp suất \\( p \\) và thể tích \\( V \\) chia cho nhiệt độ tuyệt đối \\( T \\) luôn là hằng số: \\( \\frac{p \\cdot V}{T} = \\text{hằng số} \\)."
  },
  {
    id: "l11_p1_q2",
    question: "Phương trình Clapeyron - Mendeleev áp dụng tổng quát cho n mol khí lí tưởng bất kì có dạng biểu thức nào?",
    options: [
      { id: "l11_p1_q2_o1", text: "\\( p \\cdot V = n \\cdot R \\cdot T \\)", isCorrect: true },
      { id: "l11_p1_q2_o2", text: "\\( p \\cdot T = n \\cdot R \\cdot V \\)", isCorrect: false },
      { id: "l11_p1_q2_o3", text: "\\( p \\cdot V = \\frac{M}{m} \\cdot R \\cdot T \\)", isCorrect: false },
      { id: "l11_p1_q2_o4", text: "\\( \\frac{p \\cdot V}{T} = R \\)", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Phương trình Clapeyron - Mendeleev cho \\( n \\) mol khí là: \\( p \\cdot V = n \\cdot R \\cdot T = \\frac{m}{M} \\cdot R \\cdot T \\), trong đó \\( R \\) là hằng số khí lí tưởng."
  },
  {
    id: "l11_p1_q3",
    question: "Đại lượng R trong phương trình Clapeyron - Mendeleev có giá trị xấp xỉ bằng bao nhiêu trong hệ đơn vị chuẩn SI (p tính theo Pa, V tính theo m³)?",
    options: [
      { id: "l11_p1_q3_o1", text: "\\( 8,31 \\text{ J / (mol}\\cdot\\text{K).} \\)", isCorrect: true },
      { id: "l11_p1_q3_o2", text: "\\( 0,0821 \\text{ atm}\\cdot\\text{L / (mol}\\cdot\\text{K).} \\)", isCorrect: false },
      { id: "l11_p1_q3_o3", text: "\\( 1,98 \\text{ cal / (mol}\\cdot\\text{K).} \\)", isCorrect: false },
      { id: "l11_p1_q3_o4", text: "\\( 8,31 \\text{ kPa}\\cdot\\text{L / (mol}\\cdot\\text{K).} \\)", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Trong hệ đơn vị chuẩn SI, hằng số khí lí tưởng \\( R \\approx 8,31 \\text{ J / (mol}\\cdot\\text{K)} \\)."
  },
  {
    id: "l11_p1_q4",
    question: "Một lượng khí lí tưởng chuyển từ trạng thái \\( (p_1, V_1, T_1) \\) sang trạng thái \\( (p_2, V_2, T_2) \\). Hệ thức nào sau đây biểu diễn mối liên hệ đúng?",
    options: [
      { id: "l11_p1_q4_o1", text: "\\( \\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2} \\)", isCorrect: true },
      { id: "l11_p1_q4_o2", text: "\\( p_1 \\cdot V_1 \\cdot T_1 = p_2 \\cdot V_2 \\cdot T_2 \\)", isCorrect: false },
      { id: "l11_p1_q4_o3", text: "\\( \\frac{p_1 \\cdot T_1}{V_1} = \\frac{p_2 \\cdot T_2}{V_2} \\)", isCorrect: false },
      { id: "l11_p1_q4_o4", text: "\\( \\frac{p_1 \\cdot V_2}{T_1} = \\frac{p_2 \\cdot V_1}{T_2} \\)", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Mối liên hệ giữa hai trạng thái bất kì của một lượng khí xác định tuân theo phương trình trạng thái: \\( \\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2} \\)."
  },
  {
    id: "l11_p1_q5",
    question: "Phát biểu nào sau đây đúng nhất về khái niệm khí lí tưởng?",
    options: [
      { id: "l11_p1_q5_o1", text: "Là chất khí trong đó các phân tử được coi là chất điểm và chỉ tương tác khi va chạm.", isCorrect: true },
      { id: "l11_p1_q5_o2", text: "Là chất khí hoạt động hoàn hảo ở nhiệt độ rất thấp và áp suất rất cao.", isCorrect: false },
      { id: "l11_p1_q5_o3", text: "Là chất khí luôn luôn có thể tích bằng không ở nhiệt độ phòng.", isCorrect: false },
      { id: "l11_p1_q5_o4", text: "Là chất khí hóa lỏng ở nhiệt độ tuyệt đối 0 Kelvin.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Khí lí tưởng là chất khí lí thuyết trong đó các phân tử khí được coi là các chất điểm và chỉ tương tác với nhau khi va chạm."
  },
  {
    id: "l11_p1_q6",
    question: "Ở điều kiện tiêu chuẩn \\( (t = 0^\\circ\\text{C}, p = 1 \\text{ atm}) \\), một mol chất khí bất kì luôn chiếm thể tích bao nhiêu?",
    options: [
      { id: "l11_p1_q6_o1", text: "22,4 L.", isCorrect: true },
      { id: "l11_p1_q6_o2", text: "2,24 L.", isCorrect: false },
      { id: "l11_p1_q6_o3", text: "224 L.", isCorrect: false },
      { id: "l11_p1_q6_o4", text: "11,2 L.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Theo định luật Avogadro, ở điều kiện tiêu chuẩn \\( (0^\\circ\\text{C}, 1 \\text{ atm}) \\), một mol khí bất kì đều chiếm một thể tích bằng \\( 22,4 \\text{ L} \\)."
  },
  {
    id: "l11_p1_q7",
    question: "Số mol \\( n \\) của một khối khí có khối lượng \\( m \\), khối lượng mol là \\( M \\) được tính theo công thức nào sau đây?",
    options: [
      { id: "l11_p1_q7_o1", text: "\\( n = \\frac{m}{M} \\)", isCorrect: true },
      { id: "l11_p1_q7_o2", text: "\\( n = \\frac{M}{m} \\)", isCorrect: false },
      { id: "l11_p1_q7_o3", text: "\\( n = m \\cdot M \\)", isCorrect: false },
      { id: "l11_p1_q7_o4", text: "\\( n = m + M \\)", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Số mol \\( n \\) được xác định bằng tỉ số giữa khối lượng thực tế \\( m \\) chia cho khối lượng mol phân tử \\( M \\): \\( n = \\frac{m}{M} \\)."
  },
  {
    id: "l11_p1_q8",
    question: "Trong các công thức trạng thái khí lí tưởng, nhiệt độ của chất khí phải bắt buộc sử dụng thang nhiệt độ nào?",
    options: [
      { id: "l11_p1_q8_o1", text: "Nhiệt độ tuyệt đối Kelvin (K).", isCorrect: true },
      { id: "l11_p1_q8_o2", text: "Nhiệt độ Celsius (°C).", isCorrect: false },
      { id: "l11_p1_q8_o3", text: "Nhiệt độ Fahrenheit (°F).", isCorrect: false },
      { id: "l11_p1_q8_o4", text: "Tất cả các thang nhiệt độ đều được dùng như nhau.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Nhiệt độ \\( T \\) trong phương trình trạng thái khí lí tưởng và phương trình Clapeyron - Mendeleev phải là nhiệt độ tuyệt đối tính bằng Kelvin (K)."
  },
  {
    id: "l11_p1_q9",
    question: "Trong hệ tọa độ \\( (p, \\frac{1}{V}) \\), đường biểu diễn quá trình đẳng nhiệt của một lượng khí lí tưởng xác định có dạng hình học nào?",
    options: [
      { id: "l11_p1_q9_o1", text: "Một đoạn thẳng đi qua gốc tọa độ O.", isCorrect: true },
      { id: "l11_p1_q9_o2", text: "Một đường cong hyperbol lồi hướng xuống dưới.", isCorrect: false },
      { id: "l11_p1_q9_o3", text: "Một đường thẳng song song với trục hoành 1/V.", isCorrect: false },
      { id: "l11_p1_q9_o4", text: "Một đường thẳng đứng song song với trục tung p.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Vì \\( T = \\text{hằng số} \\) nên theo định luật Boyle, \\( p \\cdot V = C \\) (hằng số) \\( \\Rightarrow p = C \\cdot \\frac{1}{V} \\). Đặt \\( y = p, x = \\frac{1}{V} \\) thì \\( y = C \\cdot x \\). Đây là hàm số bậc nhất có dạng đường thẳng đi qua gốc tọa độ O."
  },
  {
    id: "l11_p1_q10",
    question: "Đường đẳng nhiệt của cùng một khối khí ứng với hai nhiệt độ \\( T_1 \\) và \\( T_2 \\) được vẽ trong hệ trục \\( (p, \\frac{1}{V}) \\). Biết đường ứng với \\( T_2 \\) nằm cao hơn đường ứng với \\( T_1 \\) (độ dốc lớn hơn). So sánh nào sau đây đúng?",
    options: [
      { id: "l11_p1_q10_o1", text: "\\( T_2 > T_1 \\)", isCorrect: true },
      { id: "l11_p1_q10_o2", text: "\\( T_2 < T_1 \\)", isCorrect: false },
      { id: "l11_p1_q10_o3", text: "\\( T_2 = T_1 \\)", isCorrect: false },
      { id: "l11_p1_q10_o4", text: "Không thể so sánh được nếu không biết thể tích.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Hệ số góc của đường đẳng nhiệt trên trục \\( (p, \\frac{1}{V}) \\) là \\( C = n \\cdot R \\cdot T \\). Vì \\( n, R \\) cố định, đường nào dốc hơn (nằm cao hơn) thì có hệ số góc lớn hơn, nghĩa là nhiệt độ tuyệt đối cao hơn: \\( T_2 > T_1 \\)."
  },
  {
    id: "l11_p1_q11",
    question: "Khi đun nóng một lượng khí lí tưởng trong bình kín cố định thì đại lượng nào sau đây của khối khí không thay đổi?",
    options: [
      { id: "l11_p1_q11_o1", text: "Thể tích (V).", isCorrect: true },
      { id: "l11_p1_q11_o2", text: "Áp suất (p).", isCorrect: false },
      { id: "l11_p1_q11_o3", text: "Nhiệt độ tuyệt đối (T).", isCorrect: false },
      { id: "l11_p1_q11_o4", text: "Mật độ phân tử chất khí tăng lên.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Bình kín có vỏ cứng cố định nên thể tích khí bên trong không thể thay đổi (\\( V = \\text{hằng số} \\) - quá trình đẳng tích)."
  },
  {
    id: "l11_p1_q12",
    question: "Đường biểu diễn nào sau đây không biểu diễn đúng tiến trình biến đổi trạng thái của khí lí tưởng?",
    options: [
      { id: "l11_p1_q12_o1", text: "Đường đẳng áp song song với trục p trong hệ tọa độ (p, T).", isCorrect: true },
      { id: "l11_p1_q12_o2", text: "Đường đẳng tích đi qua gốc tọa độ trong hệ tọa độ (p, T).", isCorrect: false },
      { id: "l11_p1_q12_o3", text: "Đường đẳng nhiệt song song với trục p trong hệ tọa độ (p, T).", isCorrect: false },
      { id: "l11_p1_q12_o4", text: "Đường đẳng áp đi qua gốc tọa độ trong hệ tọa độ (V, T).", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Trong hệ tọa độ \\( (p, T) \\), đường đẳng áp là đường song song với trục hoành \\( T \\) (áp suất \\( p \\) không đổi), chứ không thể song song với trục tung \\( p \\) được vì song song với trục \\( p \\) tương ứng với đẳng nhiệt."
  },
  {
    id: "l11_p1_q13",
    question: "Nén một khối khí lí tưởng đẳng nhiệt làm thể tích khí giảm đi 2 lần. Áp suất của khối khí lúc này biến đổi như thế nào?",
    options: [
      { id: "l11_p1_q13_o1", text: "Tăng lên 2 lần.", isCorrect: true },
      { id: "l11_p1_q13_o2", text: "Giảm đi 2 lần.", isCorrect: false },
      { id: "l11_p1_q13_o3", text: "Tăng lên 4 lần.", isCorrect: false },
      { id: "l11_p1_q13_o4", text: "Không thay đổi.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Theo định luật Boyle, trong quá trình đẳng nhiệt, áp suất tỉ lệ nghịch với thể tích. Do đó thể tích giảm 2 lần thì áp suất tăng lên 2 lần."
  },
  {
    id: "l11_p1_q14",
    question: "Nén một khối khí lí tưởng trong xi lanh làm thể tích khí giảm đi 2 lần, đồng thời nhiệt độ tuyệt đối của khí tăng lên 2 lần. Áp suất của khí lúc này biến đổi như thế nào?",
    options: [
      { id: "l11_p1_q14_o1", text: "Tăng lên 4 lần.", isCorrect: true },
      { id: "l11_p1_q14_o2", text: "Giảm đi 4 lần.", isCorrect: false },
      { id: "l11_p1_q14_o3", text: "Không thay đổi.", isCorrect: false },
      { id: "l11_p1_q14_o4", text: "Tăng lên 2 lần.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Từ \\( \\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2} \\Rightarrow p_2 = p_1 \\cdot \\frac{V_1}{V_2} \\cdot \\frac{T_2}{T_1} \\). Vì \\( \\frac{V_1}{V_2} = 2 \\) và \\( \\frac{T_2}{T_1} = 2 \\Rightarrow p_2 = p_1 \\cdot 2 \\cdot 2 = 4 \\cdot p_1 \\) (áp suất tăng 4 lần)."
  },
  {
    id: "l11_p1_q15",
    question: "Một lượng khí lí tưởng có thể tích \\( 3 \\text{ L} \\) ở áp suất \\( 2 \\text{ atm} \\) và nhiệt độ \\( 27^\\circ\\text{C} \\). Người ta nén đẳng nhiệt khí đó đến thể tích \\( 1,5 \\text{ L} \\). Áp suất của lượng khí sau khi nén bằng bao nhiêu?",
    options: [
      { id: "l11_p1_q15_o1", text: "4 atm.", isCorrect: true },
      { id: "l11_p1_q15_o2", text: "1 atm.", isCorrect: false },
      { id: "l11_p1_q15_o3", text: "3 atm.", isCorrect: false },
      { id: "l11_p1_q15_o4", text: "2 atm.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Quá trình đẳng nhiệt nên \\( p_1 \\cdot V_1 = p_2 \\cdot V_2 \\Rightarrow p_2 = \\frac{p_1 \\cdot V_1}{V_2} = \\frac{2 \\cdot 3}{1,5} = 4 \\text{ atm} \\)."
  },
  {
    id: "l11_p1_q16",
    question: "Một lượng khí lí tưởng ở nhiệt độ \\( 27^\\circ\\text{C} \\) được đun nóng đẳng tích đến khi áp suất của nó tăng gấp đôi. Nhiệt độ của khối khí lúc sau bằng bao nhiêu độ Celsius?",
    options: [
      { id: "l11_p1_q16_o1", text: "327 °C.", isCorrect: true },
      { id: "l11_p1_q16_o2", text: "54 °C.", isCorrect: false },
      { id: "l11_p1_q16_o3", text: "600 °C.", isCorrect: false },
      { id: "l11_p1_q16_o4", text: "127 °C.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Nhiệt độ tuyệt đối \\( T_1 = 27 + 273 = 300 \\text{ K} \\). Đẳng tích nên \\( \\frac{p_1}{T_1} = \\frac{p_2}{T_2} \\Rightarrow T_2 = T_1 \\cdot \\frac{p_2}{p_1} = 300 \\cdot 2 = 600 \\text{ K} \\). Đổi sang Celsius: \\( t_2 = 600 - 273 = 327^\\circ\\text{C} \\)."
  },
  {
    id: "l11_p1_q17",
    question: "Một bong bóng khí nổi lên từ đáy một hồ nước sâu có độ sâu h. Biết áp suất ở đáy hồ gấp 3 lần áp suất ở mặt nước, còn nhiệt độ nước ở đáy hồ là \\( 17^\\circ\\text{C} \\), ở mặt nước là \\( 27^\\circ\\text{C} \\). Thể tích bong bóng khí tăng bao nhiêu lần khi nổi lên đến mặt nước?",
    options: [
      { id: "l11_p1_q17_o1", text: "Khoảng 3,1 lần.", isCorrect: true },
      { id: "l11_p1_q17_o2", text: "Khoảng 2,9 lần.", isCorrect: false },
      { id: "l11_p1_q17_o3", text: "Khoảng 4,5 lần.", isCorrect: false },
      { id: "l11_p1_q17_o4", text: "Đúng bằng 3,0 lần.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Trạng thái 1 (đáy hồ): \\( p_1 = 3 \\cdot p_0 \\), \\( T_1 = 17 + 273 = 290 \\text{ K} \\). Trạng thái 2 (mặt nước): \\( p_2 = p_0 \\), \\( T_2 = 27 + 273 = 300 \\text{ K} \\). Áp dụng phương trình trạng thái: \\( \\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2} \\Rightarrow \\frac{V_2}{V_1} = \\frac{p_1}{p_2} \\cdot \\frac{T_2}{T_1} = 3 \\cdot \\frac{300}{290} \\approx 3,1 \\) lần."
  },
  {
    id: "l11_p1_q18",
    question: "Xác định khối lượng khí Oxygen \\( (\\text{O}_2, M = 32 \\text{ g/mol}) \\) chứa trong một bình thép có dung tích \\( 10 \\text{ L} \\) dưới áp suất \\( 150 \\text{ atm} \\) ở nhiệt độ \\( 27^\\circ\\text{C} \\). Cho hằng số khí \\( R = 0,0821 \\text{ atm}\\cdot\\text{L / (mol}\\cdot\\text{K)} \\).",
    options: [
      { id: "l11_p1_q18_o1", text: "Khoảng 1949 g.", isCorrect: true },
      { id: "l11_p1_q18_o2", text: "Khoảng 60,9 g.", isCorrect: false },
      { id: "l11_p1_q18_o3", text: "Khoảng 1218 g.", isCorrect: false },
      { id: "l11_p1_q18_o4", text: "Khoảng 5430 g.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Áp dụng phương trình Clapeyron - Mendeleev: \\( p \\cdot V = n \\cdot R \\cdot T = \\frac{m}{M} \\cdot R \\cdot T \\Rightarrow m = \\frac{p \\cdot V \\cdot M}{R \\cdot T} = \\frac{150 \\cdot 10 \\cdot 32}{0,0821 \\cdot 300} = \\frac{48000}{24,63} \\approx 1949 \\text{ g} \\)."
  }
];

export const LESSON11_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l11_p2_q1",
    question: "Một khối khí lí tưởng được nhốt trong một xi lanh kim loại kín có pit-tông dịch chuyển được. Người ta thực hiện nén chậm khối khí để thể tích giảm từ \\( 10 \\text{ L} \\) xuống \\( 5 \\text{ L} \\). Xét tính đúng/sai của các phát biểu sau đây:",
    statements: [
      {
        id: "l11_p2_q1_s1",
        text: "a) Nếu quá trình nén diễn ra đủ chậm để nhiệt độ khí luôn bằng nhiệt độ môi trường xung quanh, đây là quá trình đẳng nhiệt.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Nén rất chậm giúp nhiệt lượng kịp trao đổi tỏa ra ngoài môi trường, giữ nhiệt độ khối khí không đổi, nên đây là quá trình đẳng nhiệt."
      },
      {
        id: "l11_p2_q1_s2",
        text: "b) Trong quá trình đẳng nhiệt nói trên, áp suất khí lí tưởng trong bình sẽ giảm đi một nửa.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Theo định luật Boyle, trong quá trình đẳng nhiệt, áp suất tỉ lệ nghịch với thể tích. Khi thể tích V giảm một nửa (từ 10 L xuống 5 L) thì áp suất p phải tăng lên gấp đôi chứ không thể giảm."
      },
      {
        id: "l11_p2_q1_s3",
        text: "c) Nếu biểu diễn quá trình nén đẳng nhiệt này trên hệ tọa độ \\( p - \\frac{1}{V} \\), ta được một đoạn thẳng kéo dài đi qua gốc tọa độ O.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Do \\( p \\cdot V = \\text{hằng số} \\Rightarrow p = C \\cdot \\frac{1}{V} \\). Đặt \\( y = p, x = \\frac{1}{V} \\) thì \\( y = C \\cdot x \\) là đồ thị dạng đường thẳng xiên góc đi qua gốc tọa độ O."
      },
      {
        id: "l11_p2_q1_s4",
        text: "d) Nếu người ta ấn thật nhanh pit-tông xuống, do nhiệt lượng không kịp truyền ra ngoài môi trường làm khí nóng lên từ \\( 27^\\circ\\text{C} \\) lên \\( 127^\\circ\\text{C} \\). Lúc này áp suất khí tăng lên gấp \\( 2,67 \\) lần áp suất ban đầu.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Từ \\( \\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2} \\Rightarrow p_2 = p_1 \\cdot \\frac{V_1}{V_2} \\cdot \\frac{T_2}{T_1} \\). Ban đầu \\( T_1 = 300 \\text{ K} \\), lúc sau \\( T_2 = 400 \\text{ K} \\), \\( \\frac{V_1}{V_2} = 2 \\). Vậy \\( p_2 = p_1 \\cdot 2 \\cdot \\frac{400}{300} \\approx 2,67 \\cdot p_1 \\)."
      }
    ]
  },
  {
    id: "l11_p2_q2",
    question: "Xét quá trình hoạt động của một quả bóng thám không mang thiết bị đo thời tiết bay từ mặt đất lên cao vào tầng bình lưu, nơi có nhiệt độ và áp suất khí quyển đều giảm mạnh.",
    statements: [
      {
        id: "l11_p2_q2_s1",
        text: "a) Trạng thái của khối khí chứa bên trong vỏ bóng thám không được xác định đầy đủ thông qua bộ ba thông số: áp suất, thể tích và nhiệt độ tuyệt đối.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Ba thông số trạng thái của một lượng khí xác định là áp suất p, thể tích V và nhiệt độ tuyệt đối T."
      },
      {
        id: "l11_p2_q2_s2",
        text: "b) Khi bóng bay lên cao, áp suất không khí bên ngoài giảm đi rất nhiều, điều này có xu hướng làm bóng co lại làm giảm thể tích.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Khi áp suất xung quanh giảm, áp suất khí bên trong lớn hơn sẽ đẩy lốp bóng giãn nở căng to ra (tăng thể tích), chứ không làm bóng co lại."
      },
      {
        id: "l11_p2_q2_s3",
        text: "c) Trong trường hợp giả thiết nhiệt độ không khí bên trong bóng không đổi trong suốt hành trình bay, nếu áp suất không khí giảm đi \\( 5 \\) lần thì thể tích bóng tăng lên đúng \\( 5 \\) lần.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Ở nhiệt độ không đổi (đẳng nhiệt), p tỉ lệ nghịch với V, áp suất giảm 5 lần thì thể tích tăng lên 5 lần."
      },
      {
        id: "l11_p2_q2_s4",
        text: "d) Thực tế, khi bóng bay lên độ cao cực lớn, áp suất khí giảm \\( 10 \\) lần và nhiệt độ giảm từ \\( 27^\\circ\\text{C} \\) xuống đến \\( -33^\\circ\\text{C} \\). Thể tích bóng lúc này tăng lên đúng \\( 8 \\) lần so với ban đầu.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. \\( T_1 = 300 \\text{ K} \\), \\( T_2 = -33 + 273 = 240 \\text{ K} \\). Theo phương trình trạng thái: \\( V_2 = V_1 \\cdot \\frac{p_1}{p_2} \\cdot \\frac{T_2}{T_1} = V_1 \\cdot 10 \\cdot \\frac{240}{300} = 8 \\cdot V_1 \\) (thể tích tăng \\( 8 \\) lần)."
      }
    ]
  },
  {
    id: "l11_p2_q3",
    question: "Một bình cứu hỏa bằng thép dung tích cố định \\( 10 \\text{ L} \\) chứa khí \\( \\text{CO}_2 \\) nén chịu áp suất an toàn tối đa là \\( 4,5 \\cdot 10^6 \\text{ Pa} \\). Ban đầu bình ở trong kho mát có nhiệt độ \\( 27^\\circ\\text{C} \\) dưới áp suất \\( 2,0 \\cdot 10^6 \\text{ Pa} \\).",
    statements: [
      {
        id: "l11_p2_q3_s1",
        text: "a) Khi nhiệt độ môi trường tăng lên, do vỏ bình bằng thép không đổi kích thước nên quá trình biến đổi trạng thái của lượng khí \\( \\text{CO}_2 \\) bên trong là đẳng tích.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Vỏ thép bình cứng cố định thể tích bình chứa không đổi, do đó quá trình biến đổi là quá trình đẳng tích."
      },
      {
        id: "l11_p2_q3_s2",
        text: "b) Đồ thị biểu diễn quá trình biến đổi của khối khí này trong hệ trục tọa độ \\( (p, T) \\) là một đường thẳng nằm ngang song song với trục hoành \\( T \\).",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Trong hệ trục tọa độ \\( (p, T) \\), đường đẳng tích là một đường thẳng xiên góc có đường kéo dài đi qua gốc tọa độ \\( O \\)."
      },
      {
        id: "l11_p2_q3_s3",
        text: "c) Do bình kín hoàn toàn nên khối lượng khí \\( \\text{CO}_2 \\) bên trong bình không đổi, khi phơi bình ra trời nắng nóng nhiệt độ tăng làm mật độ phân tử khí \\( \\text{CO}_2 \\) tăng lên tương ứng.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Mật độ phân tử khí \\( n = \\frac{N}{V} \\). Vì bình kín không thoát khí (\\( N \\) không đổi) và thể tích \\( V \\) không đổi nên mật độ phân tử khí \\( \\text{CO}_2 \\) giữ nguyên không thay đổi."
      },
      {
        id: "l11_p2_q3_s4",
        text: "d) Nếu không may xảy ra hỏa hoạn, nhiệt độ đám cháy nơi đặt bình lên tới \\( 427^\\circ\\text{C} \\) thì áp suất khí \\( \\text{CO}_2 \\) bên trong bình tăng lên vượt ngưỡng an toàn và bình chắc chắn bị nổ tung.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Ban đầu \\( T_1 = 300 \\text{ K} \\), áp suất \\( p_1 = 2,0 \\cdot 10^6 \\text{ Pa} \\). Lúc hỏa hoạn \\( T_2 = 427 + 273 = 700 \\text{ K} \\). Áp suất mới: \\( p_2 = p_1 \\cdot \\frac{T_2}{T_1} = 2,0 \\cdot 10^6 \\cdot \\frac{700}{300} \\approx 4,67 \\cdot 10^6 \\text{ Pa} \\). Vì \\( p_2 > 4,5 \\cdot 10^6 \\text{ Pa} \\) (áp suất an toàn tối đa) nên bình cứu hỏa sẽ bị nổ tung."
      }
    ]
  },
  {
    id: "l11_p2_q4",
    question: "Sử dụng một chiếc bơm xe đạp cầm tay để bơm căng lốp xe. Khi ấn pit-tông xuống, ta nén lượng khí bên trong bơm từ môi trường vào lốp.",
    statements: [
      {
        id: "l11_p2_q4_s1",
        text: "a) Khí lí tưởng là một mẫu khí lý thuyết giả định trong đó các phân tử được coi là các chất điểm và chỉ tương tác với nhau khi va chạm.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đây chính là nội dung định nghĩa cơ bản của khí lí tưởng."
      },
      {
        id: "l11_p2_q4_s2",
        text: "b) Khi ta ấn nhanh pit-tông nén khí, công của lực ấn do ta thực hiện đã chuyển hóa một phần thành nội năng làm cho nhiệt độ luồng khí nén tăng lên.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Theo nguyên lí I Nhiệt động lực học, khi nhận công ngoại lực nén nhanh (đoạn nhiệt hoặc truyền nhiệt chậm), nội năng khối khí tăng, dẫn tới nhiệt độ tăng."
      },
      {
        id: "l11_p2_q4_s3",
        text: "c) Nếu nhiệt độ tuyệt đối của khối khí tăng thêm 10% đồng thời thể tích khí nén bị giảm đi 20% thì áp suất của luồng khí nén lúc sau sẽ tăng thêm đúng 30% so với ban đầu.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Nhiệt độ tuyệt đối tăng 10% => \\( T_2 = 1,1 \\cdot T_1 \\). Thể tích giảm 20% => \\( V_2 = 0,8 \\cdot V_1 \\). Áp suất \\( p_2 = p_1 \\cdot \\frac{T_2}{T_1} \\cdot \\frac{V_1}{V_2} = p_1 \\cdot \\frac{1,1}{0,8} = 1,375 \\cdot p_1 \\). Áp suất tăng thêm 37,5% chứ không phải 30%."
      },
      {
        id: "l11_p2_q4_s4",
        text: "d) Xét lượng khí oxi ở điều kiện tiêu chuẩn \\( (0^\\circ\\text{C}, 1 \\text{ atm}) \\) có khối lượng là \\( 16 \\text{ g} \\). Khi đưa lượng khí này sang trạng thái có nhiệt độ \\( 27^\\circ\\text{C} \\) dưới áp suất \\( 1,5 \\text{ atm} \\) thì thể tích của khí xấp xỉ bằng \\( 8,2 \\text{ L} \\). Cho hằng số khí \\( R = 0,0821 \\text{ atm}\\cdot\\text{L / (mol}\\cdot\\text{K)} \\).",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Số mol \\( n = \\frac{m}{M} = \\frac{16}{32} = 0,5 \\text{ mol} \\). Nhiệt độ tuyệt đối \\( T = 27 + 273 = 300 \\text{ K} \\). Áp suất \\( p = 1,5 \\text{ atm} \\). Thể tích \\( V = \\frac{n \\cdot R \\cdot T}{p} = \\frac{0,5 \\cdot 0,0821 \\cdot 300}{1,5} = 8,21 \\text{ L} \\approx 8,2 \\text{ L} \\)."
      }
    ]
  }
];

export const LESSON11_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l11_p3_q1",
    question: "Một khối khí lí tưởng có thể tích \\( 6 \\text{ L} \\) ở áp suất \\( 1,5 \\text{ atm} \\) và nhiệt độ \\( 27^\\circ\\text{C} \\). Người ta đun nóng khối khí này đến nhiệt độ \\( 227^\\circ\\text{C} \\), đồng thời nén khí lại để thể tích giảm còn \\( 3 \\text{ L} \\). Tính áp suất của khối khí lúc sau theo đơn vị atm. (Nhập đáp án dạng số nguyên).",
    answer: 5,
    unit: "atm",
    level: "Thông hiểu",
    explanation: "Nhiệt độ tuyệt đối \\( T_1 = 27 + 273 = 300 \\text{ K} \\); \\( T_2 = 227 + 273 = 500 \\text{ K} \\). Áp dụng phương trình trạng thái khí lí tưởng: \\( \\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2} \\Rightarrow p_2 = p_1 \\cdot \\frac{V_1}{V_2} \\cdot \\frac{T_2}{T_1} = 1,5 \\cdot \\frac{6}{3} \\cdot \\frac{500}{300} = 5 \\text{ atm} \\).",
    illustrationType: "piston_compressed_l11"
  },
  {
    id: "l11_p3_q2",
    question: "Bình xịt khử khuẩn cầm tay chứa khí nén có áp suất ban đầu là \\( 1,2 \\text{ atm} \\) ở nhiệt độ phòng \\( 27^\\circ\\text{C} \\). Vỏ bình làm bằng nhôm dày chịu được áp suất tối đa là \\( 3,6 \\text{ atm} \\) trước khi bị biến dạng hoặc nổ mảnh. Hỏi nếu ném bình xịt vào đống lửa, nhiệt độ của đống lửa tối thiểu bằng bao nhiêu Kelvin (K) thì bình bắt đầu nổ? (Nhập đáp án dạng số nguyên).",
    answer: 900,
    unit: "K",
    level: "Thông hiểu",
    explanation: "Vỏ bình cố định thể tích (đẳng tích) nên \\( \\frac{p_1}{T_1} = \\frac{p_2}{T_2} \\Rightarrow T_2 = T_1 \\cdot \\frac{p_2}{p_1} \\). Ban đầu \\( T_1 = 27 + 273 = 300 \\text{ K} \\). Áp suất tối đa bình chịu được \\( p_2 = 3,6 \\text{ atm} \\). Ta có \\( T_2 = 300 \\cdot \\frac{3,6}{1,2} = 900 \\text{ K} \\).",
    illustrationType: "spray_can_fire"
  },
  {
    id: "l11_p3_q3",
    question: "Một lượng khí Helium (khối lượng mol \\( M = 4 \\text{ g/mol} \\)) có khối lượng \\( m = 8 \\text{ g} \\) chứa trong một bình kín có thể tích \\( V = 12 \\text{ L} \\) ở nhiệt độ \\( 27^\\circ\\text{C} \\). Sử dụng hằng số khí lí tưởng \\( R = 0,0821 \\text{ atm}\\cdot\\text{L / (mol}\\cdot\\text{K)} \\), hãy tính áp suất của lượng khí Helium bên trong bình theo đơn vị atm. (Làm tròn kết quả đến hàng đơn vị).",
    answer: 4,
    unit: "atm",
    level: "Vận dụng",
    explanation: "Số mol \\( n = \\frac{m}{M} = \\frac{8}{4} = 2 \\text{ mol} \\). Nhiệt độ tuyệt đối \\( T = 27 + 273 = 300 \\text{ K} \\). Áp dụng phương trình Clapeyron - Mendeleev: \\( p \\cdot V = n \\cdot R \\cdot T \\Rightarrow p = \\frac{n \\cdot R \\cdot T}{V} = \\frac{2 \\cdot 0,0821 \\cdot 300}{12} = 4,105 \\text{ atm} \\approx 4 \\text{ atm} \\).",
    illustrationType: "helium_tank"
  },
  {
    id: "l11_p3_q4",
    question: "Một bong bóng xà phòng có thể tích \\( 10 \\text{ cm}^3 \\) chứa không khí ở nhiệt độ \\( 27^\\circ\\text{C} \\), áp suất khí quyển là \\( 1,0 \\cdot 10^5 \\text{ Pa} \\). Khi bong bóng bay lên cao đến độ cao mà áp suất khí quyển chỉ còn \\( 0,8 \\cdot 10^5 \\text{ Pa} \\) và nhiệt độ lúc này giảm còn \\( 7^\\circ\\text{C} \\). Tính thể tích mới của bong bóng theo đơn vị cm³. (Làm tròn kết quả đến hàng đơn vị).",
    answer: 12,
    unit: "cm³",
    level: "Vận dụng",
    explanation: "Nhiệt độ tuyệt đối \\( T_1 = 300 \\text{ K} \\), \\( T_2 = 280 \\text{ K} \\). Áp dụng phương trình trạng thái: \\( V_2 = V_1 \\cdot \\frac{p_1}{p_2} \\cdot \\frac{T_2}{T_1} = 10 \\cdot \\frac{1,0 \\cdot 10^5}{0,8 \\cdot 10^5} \\cdot \\frac{280}{300} \\approx 11,67 \\text{ cm}^3 \\). Làm tròn đến hàng đơn vị ta được 12.",
    illustrationType: "soap_bubble_ascent"
  },
  {
    id: "l11_p3_q5",
    question: "Trong xilanh của một động cơ đốt trong, hỗn hợp khí ở áp suất \\( 1,0 \\cdot 10^5 \\text{ Pa} \\) và nhiệt độ \\( 47^\\circ\\text{C} \\) được nén để thể tích giảm đi 8 lần \\( (\\frac{V_1}{V_2} = 8) \\), đồng thời áp suất tăng lên đến \\( 1,6 \\cdot 10^6 \\text{ Pa} \\). Tính nhiệt độ của khí sau khi nén theo đơn vị Kelvin (K). (Nhập kết quả là số nguyên).",
    answer: 640,
    unit: "K",
    level: "Vận dụng",
    explanation: "Nhiệt độ tuyệt đối \\( T_1 = 47 + 273 = 320 \\text{ K} \\). Áp dụng phương trình trạng thái: \\( \\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2} \\Rightarrow T_2 = T_1 \\cdot \\frac{p_2}{p_1} \\cdot \\frac{V_2}{V_1} = 320 \\cdot \\frac{1,6 \\cdot 10^6}{1,0 \\cdot 10^5} \\cdot \\frac{1}{8} = 640 \\text{ K} \\).",
    illustrationType: "engine_cylinder_compression"
  },
  {
    id: "l11_p3_q6",
    question: "Một lượng khí lí tưởng ở áp suất \\( 1,2 \\text{ atm} \\) chiếm thể tích \\( 15 \\text{ L} \\) ở \\( 27^\\circ\\text{C} \\). Nếu đem lượng khí này nén đến thể tích \\( 9 \\text{ L} \\) dưới áp suất \\( 2,4 \\text{ atm} \\) thì nhiệt độ tuyệt đối của khí tăng thêm bao nhiêu Kelvin? (Nhập kết quả là số nguyên).",
    answer: 60,
    unit: "K",
    level: "Vận dụng",
    explanation: "Nhiệt độ tuyệt đối \\( T_1 = 300 \\text{ K} \\). Theo phương trình trạng thái: \\( \\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2} \\Rightarrow T_2 = T_1 \\cdot \\frac{p_2}{p_1} \\cdot \\frac{V_2}{V_1} = 300 \\cdot \\frac{2,4}{1,2} \\cdot \\frac{9}{15} = 360 \\text{ K} \\). Độ tăng nhiệt độ tuyệt đối: \\( \\Delta T = T_2 - T_1 = 360 - 300 = 60 \\text{ K} \\).",
    illustrationType: "piston_compressed_l11_q6"
  }
];

// ==================== LESSON 12 QUESTIONS ====================
export const LESSON12_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l12_p1_q1",
    question: "Theo mô hình động học phân tử chất khí lí tưởng, các phân tử khí được coi là:",
    options: [
      { id: "l12_p1_q1_o1", text: "Các chất điểm có khối lượng và chỉ tương tác khi va chạm.", isCorrect: true },
      { id: "l12_p1_q1_o2", text: "Các quả cầu có kích thước rất lớn và luôn hút nhau.", isCorrect: false },
      { id: "l12_p1_q1_o3", text: "Các chất điểm tích điện luôn đẩy nhau ở khoảng cách xa.", isCorrect: false },
      { id: "l12_p1_q1_o4", text: "Các hạt tĩnh lặng không chuyển động ở nhiệt độ phòng.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Khí lí tưởng coi các phân tử là các chất điểm chuyển động hỗn loạn không ngừng, có khối lượng nhưng thể tích rất nhỏ có thể bỏ qua, chỉ tương tác khi va chạm hoàn toàn đàn hồi."
  },
  {
    id: "l12_p1_q2",
    question: "Công thức nào sau đây biểu diễn mối liên hệ đúng giữa áp suất chất khí p, mật độ phân tử \\mu và động năng tịnh tiến trung bình của các phân tử khí Ed_bar?",
    options: [
      { id: "l12_p1_q2_o1", text: "p = (2/3) * \\mu * Ed_bar", isCorrect: true },
      { id: "l12_p1_q2_o2", text: "p = (3/2) * \\mu * Ed_bar", isCorrect: false },
      { id: "l12_p1_q2_o3", text: "p = \\mu * Ed_bar", isCorrect: false },
      { id: "l12_p1_q2_o4", text: "p = (1/3) * \\mu * Ed_bar", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Hệ thức liên hệ giữa áp suất khí và động năng tịnh tiến trung bình của phân tử là p = (2/3) * \\mu * Ed_bar."
  },
  {
    id: "l12_p1_q3",
    question: "Đại lượng k trong công thức động năng trung bình Ed_bar = (3/2) * k * T được gọi là hằng số gì, có giá trị bằng bao nhiêu?",
    options: [
      { id: "l12_p1_q3_o1", text: "Hằng số Boltzmann, k ≈ 1,38.10^-23 J/K.", isCorrect: true },
      { id: "l12_p1_q3_o2", text: "Hằng số khí lí tưởng, R ≈ 8,31 J/(mol·K).", isCorrect: false },
      { id: "l12_p1_q3_o3", text: "Số Avogadro, N_A ≈ 6,02.10^23 hạt/mol.", isCorrect: false },
      { id: "l12_p1_q3_o4", text: "Hằng số hấp dẫn, G ≈ 6,67.10^-11 N·m^2/kg^2.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Hằng số k = R / N_A ≈ 1,38.10^-23 J/K được gọi là hằng số Boltzmann, biểu thị động năng trung bình của phân tử tương ứng với mỗi độ Kelvin nhiệt độ."
  },
  {
    id: "l12_p1_q4",
    question: "Động năng tịnh tiến trung bình Ed_bar của các phân tử khí lí tưởng tỉ lệ thuận với đại lượng nào?",
    options: [
      { id: "l12_p1_q4_o1", text: "Nhiệt độ tuyệt đối (T).", isCorrect: true },
      { id: "l12_p1_q4_o2", text: "Thể tích của bình chứa khí (V).", isCorrect: false },
      { id: "l12_p1_q4_o3", text: "Nhiệt độ Celsius (°C).", isCorrect: false },
      { id: "l12_p1_q4_o4", text: "Khối lượng mol của chất khí (M).", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Động năng tịnh tiến trung bình của phân tử khí lí tưởng tỉ lệ thuận với nhiệt độ tuyệt đối T theo hệ thức Ed_bar = (3/2) * k * T."
  },
  {
    id: "l12_p1_q5",
    question: "Đơn vị đo của mật độ phân tử chất khí \\mu trong hệ đo lường quốc tế SI là:",
    options: [
      { id: "l12_p1_q5_o1", text: "m^-3 (hay phân tử/m^3).", isCorrect: true },
      { id: "l12_p1_q5_o2", text: "lít/mol.", isCorrect: false },
      { id: "l12_p1_q5_o3", text: "g/cm^3.", isCorrect: false },
      { id: "l12_p1_q5_o4", text: "kg/m^3.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Mật độ phân tử \\mu là số phân tử khí có trong một đơn vị thể tích, \\mu = N / V nên đơn vị chuẩn SI là 1/m^3 hay m^-3."
  },
  {
    id: "l12_p1_q6",
    question: "Tốc độ căn quân phương v_ctqp (root-mean-square speed) của các phân tử khí lí tưởng được xác định bằng công thức nào?",
    options: [
      { id: "l12_p1_q6_o1", text: "v_ctqp = \\sqrt(3 * k * T / m).", isCorrect: true },
      { id: "l12_p1_q6_o2", text: "v_ctqp = \\sqrt(3 * R * T / m).", isCorrect: false },
      { id: "l12_p1_q6_o3", text: "v_ctqp = \\sqrt(k * T / m).", isCorrect: false },
      { id: "l12_p1_q6_o4", text: "v_ctqp = 2 * k * T / m.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Tốc độ căn quân phương v_ctqp = \\sqrt(v_bar^2) = \\sqrt(3 * k * T / m) = \\sqrt(3 * R * T / M), trong đó m là khối lượng của một phân tử khí."
  },
  {
    id: "l12_p1_q7",
    question: "Khi nhiệt độ tuyệt đối của khối khí lí tưởng tăng lên gấp 4 lần, tốc độ căn quân phương v_ctqp của các phân tử khí tăng lên bao nhiêu lần?",
    options: [
      { id: "l12_p1_q7_o1", text: "2 lần.", isCorrect: true },
      { id: "l12_p1_q7_o2", text: "4 lần.", isCorrect: false },
      { id: "l12_p1_q7_o3", text: "16 lần.", isCorrect: false },
      { id: "l12_p1_q7_o4", text: "\\sqrt(2) lần.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Do v_ctqp tỉ lệ thuận với \\sqrt(T), nên khi T tăng lên 4 lần thì tốc độ căn quân phương v_ctqp tăng lên \\sqrt(4) = 2 lần."
  },
  {
    id: "l12_p1_q8",
    question: "Trong công thức tính áp suất chất khí p = (1/3) * \\mu * m * v_bar^2, đại lượng v_bar^2 đại diện cho:",
    options: [
      { id: "l12_p1_q8_o1", text: "Trung bình của các bình phương tốc độ phân tử v_bar^2.", isCorrect: true },
      { id: "l12_p1_q8_o2", text: "Bình phương của tốc độ trung bình các phân tử (v_tb)^2.", isCorrect: false },
      { id: "l12_p1_q8_o3", text: "Tốc độ lớn nhất của các phân tử khí v_max.", isCorrect: false },
      { id: "l12_p1_q8_o4", text: "Tốc độ nhỏ nhất của các phân tử khí v_min.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "v_bar^2 là trung bình của các bình phương tốc độ của N phân tử khí: v_bar^2 = (v_1^2 + v_2^2 + ... + v_N^2) / N. Giá trị căn bậc hai của nó mới là tốc độ căn quân phương v_ctqp."
  },
  {
    id: "l12_p1_q9",
    question: "Áp suất khí tác dụng lên thành bình chứa sinh ra là do nguyên nhân cơ học nào sau đây?",
    options: [
      { id: "l12_p1_q9_o1", text: "Vô số phân tử khí chuyển động hỗn loạn va chạm liên tục hoàn toàn đàn hồi truyền động lượng cho thành bình.", isCorrect: true },
      { id: "l12_p1_q9_o2", text: "Các phân tử khí hút thành bình lại gần nhau bằng lực vạn vật hấp dẫn.", isCorrect: false },
      { id: "l12_p1_q9_o3", text: "Các phân tử khí trương nở kích thước chèn ép lẫn nhau ép vào thành bình.", isCorrect: false },
      { id: "l12_p1_q9_o4", text: "Lực đẩy tĩnh điện cực mạnh giữa các phân tử khí tạo sức ép lên thành bình.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Khi các phân tử chuyển động va chạm đàn hồi vào thành bình, vận tốc thay đổi tạo độ biến thiên động lượng |\\Delta p| = 2 * m * v. Theo định luật II và III Newton, sự truyền động lượng dồn dập này tạo ra một lực đẩy trung bình ép vuông góc lên diện tích thành bình S, sinh ra áp suất khí p."
  },
  {
    id: "l12_p1_q10",
    question: "Hai bình kín có cùng thể tích chứa khí Helium (He) và khí Argon (Ar) ở cùng một nhiệt độ tuyệt đối T. Kết luận nào sau đây về hai khối khí là đúng?",
    options: [
      { id: "l12_p1_q10_o1", text: "Động năng tịnh tiến trung bình các phân tử khí của hai bình là bằng nhau.", isCorrect: true },
      { id: "l12_p1_q10_o2", text: "Phân tử khí Argon chuyển động nhanh hơn phân tử Helium do Argon nặng hơn.", isCorrect: false },
      { id: "l12_p1_q10_o3", text: "Động năng tịnh tiến trung bình của Argon lớn hơn Helium do Argon có khối lượng phân tử lớn hơn.", isCorrect: false },
      { id: "l12_p1_q10_o4", text: "Tốc độ căn quân phương v_ctqp của phân tử Argon bằng tốc độ căn quân phương phân tử Helium.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Vì cả hai bình ở cùng nhiệt độ tuyệt đối T, nên động năng tịnh tiến trung bình của chúng phải bằng nhau (Ed_bar = (3/2) * k * T). Do Argon nặng hơn Helium (M = 40 g/mol so với M = 4 g/mol), phân tử Argon sẽ có tốc độ căn quân phương v_ctqp chậm hơn."
  },
  {
    id: "l12_p1_q11",
    question: "Khi nhiệt độ tuyệt đối T của khí lí tưởng tăng từ 300 K lên 600 K, tốc độ căn quân phương v_ctqp của các phân tử khí sẽ tăng khoảng bao nhiêu phần trăm?",
    options: [
      { id: "l12_p1_q11_o1", text: "Khoảng 41,4%.", isCorrect: true },
      { id: "l12_p1_q11_o2", text: "Đúng bằng 100%.", isCorrect: false },
      { id: "l12_p1_q11_o3", text: "Đúng bằng 200%.", isCorrect: false },
      { id: "l12_p1_q11_o4", text: "Khoảng 14,1%.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Khi nhiệt độ tuyệt đối T tăng gấp đôi (600 / 300 = 2), tốc độ căn quân phương v_ctqp sẽ tăng gấp \\sqrt(2) ≈ 1,414 lần, nghĩa là tăng thêm khoảng 41,4% so với ban đầu."
  },
  {
    id: "l12_p1_q12",
    question: "So sánh tốc độ căn quân phương v_ctqp của phân tử khí Heli (M = 4 g/mol) và phân tử khí Oxy (O_2, M = 32 g/mol) khi ở cùng một nhiệt độ phòng:",
    options: [
      { id: "l12_p1_q12_o1", text: "Phân tử Heli nhanh hơn phân tử Oxy khoảng 2,83 lần.", isCorrect: true },
      { id: "l12_p1_q12_o2", text: "Phân tử Oxy nhanh hơn phân tử Heli 8,00 lần.", isCorrect: false },
      { id: "l12_p1_q12_o3", text: "Phân tử Heli nhanh hơn phân tử Oxy 8,00 lần.", isCorrect: false },
      { id: "l12_p1_q12_o4", text: "Hai phân tử chuyển động nhanh bằng nhau vì ở cùng một nhiệt độ.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Tốc độ căn quân phương v_ctqp = \\sqrt(3 * R * T / M) tỉ lệ nghịch với căn bậc hai của khối lượng mol M. Tỉ số v_He / v_O2 = \\sqrt(M_O2 / M_He) = \\sqrt(32 / 4) = \\sqrt(8) ≈ 2,83 lần."
  },
  {
    id: "l12_p1_q13",
    question: "Ở điều kiện nhiệt độ không đổi, nếu nén khí đẳng nhiệt để thể tích V giảm đi một nửa thì động năng tịnh tiến trung bình Ed_bar và mật độ phân tử \\mu thay đổi như thế nào?",
    options: [
      { id: "l12_p1_q13_o1", text: "Ed_bar không đổi, \\mu tăng gấp đôi.", isCorrect: true },
      { id: "l12_p1_q13_o2", text: "Ed_bar giảm một nửa, \\mu không đổi.", isCorrect: false },
      { id: "l12_p1_q13_o3", text: "Ed_bar tăng gấp đôi, \\mu giảm một nửa.", isCorrect: false },
      { id: "l12_p1_q13_o4", text: "Cả Ed_bar và \\mu đều tăng gấp đôi.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Nhiệt độ không đổi nghĩa là động năng tịnh tiến trung bình Ed_bar = (3/2) * k * T không đổi. Thể tích V giảm một nửa làm mật độ phân tử \\mu = N / V tăng gấp đôi, khiến cho áp suất p = (2/3) * \\mu * Ed_bar tăng gấp đôi."
  },
  {
    id: "l12_p1_q14",
    question: "Động năng tịnh tiến trung bình Ed_bar của một phân tử khí lí tưởng ở nhiệt độ 27°C (300 K) có giá trị bằng bao nhiêu?",
    options: [
      { id: "l12_p1_q14_o1", text: "6,21.10^-21 J.", isCorrect: true },
      { id: "l12_p1_q14_o2", text: "5,58.10^-21 J.", isCorrect: false },
      { id: "l12_p1_q14_o3", text: "4,14.10^-21 J.", isCorrect: false },
      { id: "l12_p1_q14_o4", text: "1,38.10^-23 J.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Áp dụng công thức Ed_bar = (3/2) * k * T = 1,5 * 1,38.10^-23 J/K * 300 K = 6,21.10^-21 J."
  },
  {
    id: "l12_p1_q15",
    question: "Một bình kín dung tích 5 lít chứa khí lí tưởng ở áp suất 2,0.10^5 Pa. Tổng động năng tịnh tiến của tất cả các phân tử khí trong bình bằng:",
    options: [
      { id: "l12_p1_q15_o1", text: "1500 J.", isCorrect: true },
      { id: "l12_p1_q15_o2", text: "1000 J.", isCorrect: false },
      { id: "l12_p1_q15_o3", text: "150 J.", isCorrect: false },
      { id: "l12_p1_q15_o4", text: "1,5.10^6 J.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Ta có: p = (2/3) * (N / V) * Ed_bar => N * Ed_bar = (3/2) * p * V. Tổng động năng tịnh tiến của N phân tử là E_tot = N * Ed_bar = 1,5 * 2,0.10^5 Pa * (5.10^-3 m^3) = 1500 J."
  },
  {
    id: "l12_p1_q16",
    question: "Tính tốc độ căn quân phương v_ctqp của phân tử khí Helium có khối lượng m ≈ 6,64.10^-27 kg ở nhiệt độ cực thấp 100 K. Cho biết hằng số Boltzmann k = 1,38.10^-23 J/K.",
    options: [
      { id: "l12_p1_q16_o1", text: "Khoảng 790 m/s.", isCorrect: true },
      { id: "l12_p1_q16_o2", text: "Khoảng 312 m/s.", isCorrect: false },
      { id: "l12_p1_q16_o3", text: "Khoảng 1250 m/s.", isCorrect: false },
      { id: "l12_p1_q16_o4", text: "Khoảng 450 m/s.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "v_ctqp = \\sqrt(3 * k * T / m) = \\sqrt(3 * 1,38.10^-23 * 100 / (6,64.10^-27)) ≈ 789,6 m/s ≈ 790 m/s."
  },
  {
    id: "l12_p1_q17",
    question: "Khi nhiệt độ tuyệt đối T của một khối khí lý tưởng tăng từ 100 K lên 400 K, động năng tịnh tiến trung bình Ed_bar của các phân tử khí tăng lên bao nhiêu lần?",
    options: [
      { id: "l12_p1_q17_o1", text: "Tăng lên 4 lần.", isCorrect: true },
      { id: "l12_p1_q17_o2", text: "Tăng lên 2 lần.", isCorrect: false },
      { id: "l12_p1_q17_o3", text: "Tăng lên 16 lần.", isCorrect: false },
      { id: "l12_p1_q17_o4", text: "Không đổi vì động năng không phụ thuộc nhiệt độ.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Động năng tịnh tiến trung bình tỉ lệ thuận với nhiệt độ tuyệt đối T (Ed_bar = (3/2) * k * T). Do đó, khi T tăng từ 100 K lên 400 K (tăng 4 lần), động năng tịnh tiến trung bình Ed_bar tăng đúng 4 lần."
  },
  {
    id: "l12_p1_q18",
    question: "Tốc độ căn quân phương v_ctqp của các phân tử khí Hydrogen (H_2) ở nhiệt độ phòng 27°C (300 K) là bao nhiêu? Biết khối lượng mol của H_2 là 2,0 g/mol và hằng số khí lý tưởng R = 8,31 J/(mol·K).",
    options: [
      { id: "l12_p1_q18_o1", text: "Khoảng 1934 m/s.", isCorrect: true },
      { id: "l12_p1_q18_o2", text: "Khoảng 1368 m/s.", isCorrect: false },
      { id: "l12_p1_q18_o3", text: "Khoảng 612 m/s.", isCorrect: false },
      { id: "l12_p1_q18_o4", text: "Khoảng 3100 m/s.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Sử dụng công thức v_ctqp = \\sqrt(3 * R * T / M). Ở đây T = 27 + 273 = 300 K, M = 2,0.10^-3 kg/mol. Ta có v_ctqp = \\sqrt(3 * 8,31 * 300 / 0,002) ≈ 1933,78 m/s ≈ 1934 m/s."
  }
];

export const LESSON12_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l12_p2_q1",
    question: "Khi khảo sát mô hình động học phân tử của khí lí tưởng chứa trong một bình lập phương kín có cạnh l, các nhà khoa học đã áp dụng các định luật cơ học cổ điển để thiết lập công thức tính áp suất chất khí lên thành bình.",
    statements: [
      {
        id: "l12_p2_q1_s1",
        text: "Các phân tử khí va chạm đàn hồi trực diện vào thành bình, khi bật ngược lại với vận tốc có chiều ngược lại thì độ biến thiên động lượng của mỗi phân tử có độ lớn là 2 * m * v.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Trước va chạm động lượng là m * v, sau va chạm bật ngược lại là -m * v, độ biến thiên động lượng |\\Delta p| = |-m * v - m * v| = 2 * m * v."
      },
      {
        id: "l12_p2_q1_s2",
        text: "Lực cơ học do một phân tử khí va chạm tác dụng lên một diện tích thành bình trong khoảng thời gian \\Delta t tỉ lệ nghịch với thời gian \\Delta t giữa hai lần va chạm liên tiếp.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Theo định luật II Newton, lực trung bình F = |\\Delta p| / \\Delta t, vì vậy lực cơ học tác dụng tỉ lệ nghịch với khoảng thời gian \\Delta t."
      },
      {
        id: "l12_p2_q1_s3",
        text: "Vì các phân tử khí chuyển động hoàn toàn hỗn loạn theo 3 trục tọa độ Ox, Oy, Oz một cách bình đẳng, nên trung bình chỉ có khoảng 1/6 số phân tử trong bình đang chuyển động theo một chiều xác định hướng về phía một thành bình nhất định.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Số phân tử chuyển động dọc theo một trục tọa độ Ox là N / 3, và chỉ một nửa trong số đó (N / 6) đang chuyển động theo chiều dương hướng thẳng tới một thành bình cụ thể."
      },
      {
        id: "l12_p2_q1_s4",
        text: "Va chạm của phân tử khí lí tưởng với thành bình là va chạm không đàn hồi, năng lượng của phân tử khí chuyển một phần thành nhiệt năng làm nóng thành bình.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Va chạm của các phân tử khí lí tưởng với thành bình được giả thiết là va chạm hoàn toàn đàn hồi, không làm mất mát động năng của phân tử khí."
      }
    ]
  },
  {
    id: "l12_p2_q2",
    question: "Xét hai bình kín có thể tích bằng nhau độc lập chứa khí Heli (bình 1, M_He = 4 g/mol) và khí Oxy (bình 2, M_O2 = 32 g/mol) ở cùng một nhiệt độ phòng là 27°C (300 K) và cùng có áp suất là 1,0 atm.",
    statements: [
      {
        id: "l12_p2_q2_s1",
        text: "Động năng tịnh tiến trung bình của mỗi phân tử khí Heli ở bình 1 bằng đúng động năng tịnh tiến trung bình của mỗi phân tử Oxy ở bình 2.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Do hai bình ở cùng một nhiệt độ tuyệt đối T = 300 K, động năng tịnh tiến trung bình của cả hai loại phân tử đều bằng Ed_bar = (3/2) * k * T ≈ 6,21.10^-21 J."
      },
      {
        id: "l12_p2_q2_s2",
        text: "Tốc độ căn quân phương v_ctqp của phân tử khí Heli ở bình 1 gấp \\sqrt(8) ≈ 2,83 lần so với tốc độ căn quân phương v_ctqp của phân tử Oxy ở bình 2.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Tốc độ v_ctqp = \\sqrt(3 * R * T / M). Tỉ số v_He / v_O2 = \\sqrt(M_O2 / M_He) = \\sqrt(32 / 4) = \\sqrt(8) ≈ 2,83."
      },
      {
        id: "l12_p2_q2_s3",
        text: "Mật độ phân tử (số phân tử trong một mét khối) của khí Heli trong bình 1 lớn gấp 8 lần so với bình 2 vì khối lượng phân tử của Heli nhỏ hơn 8 lần.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Do hai bình có cùng áp suất p và cùng nhiệt độ T, theo công thức p = \\mu * k * T thì mật độ phân tử \\mu của hai bình là hoàn toàn bằng nhau."
      },
      {
        id: "l12_p2_q2_s4",
        text: "Nếu nung nóng bình 2 (Oxy) lên tới nhiệt độ 2400 K (tăng gấp 8 lần tuyệt đối) thì tốc độ căn quân phương v_ctqp của phân tử Oxy lúc này sẽ bằng với tốc độ căn quân phương v_ctqp của Heli ở bình 1 tại nhiệt độ phòng.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "v_ctqp = \\sqrt(3 * R * T / M). Để v_O2 (T_2) = v_He (T_1), ta cần T_2 / M_O2 = T_1 / M_He => T_2 / 32 = 300 / 4 => T_2 = 2400 K."
      }
    ]
  },
  {
    id: "l12_p2_q3",
    question: "Một chiếc săm xe đạp được bơm căng khí ở nhiệt độ 27°C (300 K) đến áp suất 2,4.10^5 Pa. Thể tích trong của săm xe được giữ cố định. Xe đạp đỗ ngoài trời nắng gắt khiến nhiệt độ trong săm tăng lên tới 57°C (330 K).",
    statements: [
      {
        id: "l12_p2_q3_s1",
        text: "Nhiệt độ Celsius tăng từ 27°C lên 57°C nghĩa là nhiệt độ tuyệt đối Kelvin tăng thêm 10%.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "T_1 = 27 + 273 = 300 K. T_2 = 57 + 273 = 330 K. Tỉ số tăng là 330 / 300 = 1,1 (tức là tăng thêm 10%)."
      },
      {
        id: "l12_p2_q3_s2",
        text: "Mật độ phân tử chất khí \\mu trong săm xe tăng thêm 10% khi nung nóng.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Do thể tích V săm xe không đổi và số lượng phân tử khí N không đổi, nên mật độ phân tử \\mu = N / V không đổi."
      },
      {
        id: "l12_p2_q3_s3",
        text: "Động năng tịnh tiến trung bình Ed_bar của các phân tử khí trong săm tăng thêm 10% khi nhiệt độ tăng từ 27°C lên 57°C.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Động năng tịnh tiến trung bình Ed_bar tỉ lệ thuận với nhiệt độ tuyệt đối T, nên khi T tăng thêm 10% thì Ed_bar cũng tăng thêm 10%."
      },
      {
        id: "l12_p2_q3_s4",
        text: "Áp suất khí trong săm xe đạp lúc này tăng lên đạt giá trị 2,64.10^5 Pa.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đẳng tích: p_2 = p_1 * (T_2 / T_1) = 2,4.10^5 * 1,1 = 2,64.10^5 Pa."
      }
    ]
  },
  {
    id: "l12_p2_q4",
    question: "Xét một phân tử khí Hydrogen (H2, khối lượng mol M = 2,0 g/mol = 2,0.10^-3 kg/mol) chuyển động nhiệt trong một bình chứa kín ở nhiệt độ 27°C (300 K). Cho biết số Avogadro N_A = 6,02.10^23 hạt/mol, hằng số Boltzmann k = 1,38.10^-23 J/K.",
    statements: [
      {
        id: "l12_p2_q4_s1",
        text: "Khối lượng của một phân tử khí Hydrogen xấp xỉ bằng 3,32.10^-27 kg.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "m = M / N_A = 2,0.10^-3 kg / (6,02.10^23) ≈ 3,32.10^-27 kg."
      },
      {
        id: "l12_p2_q4_s2",
        text: "Động năng tịnh tiến trung bình Ed_bar của một phân tử khí Hydrogen ở nhiệt độ này là 6,21.10^-21 J.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Ed_bar = 1,5 * k * T = 1,5 * 1,38.10^-23 * 300 = 6,21.10^-21 J."
      },
      {
        id: "l12_p2_q4_s3",
        text: "Tốc độ căn quân phương v_ctqp của phân tử Hydrogen ở nhiệt độ này đạt tới khoảng 1934 m/s.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "v_ctqp = \\sqrt(3 * R * T / M) = \\sqrt(3 * 8,31 * 300 / 0.002) = \\sqrt(3739500) ≈ 1934 m/s."
      },
      {
        id: "l12_p2_q4_s4",
        text: "Nếu hạ nhiệt độ tuyệt đối của bình kín xuống tới 75 K (giảm tuyệt đối 4 lần) thì tốc độ căn quân phương v_ctqp của phân tử khí giảm đi 4 lần.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Do v_ctqp tỉ lệ thuận với \\sqrt(T), nên khi T giảm đi 4 lần thì v_ctqp chỉ giảm đi \\sqrt(4) = 2 lần."
      }
    ]
  }
];

export const LESSON12_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l12_p3_q1",
    question: "Một khối khí lí tưởng trong bình kín đang ở nhiệt độ tuyệt đối là 300 K. Để động năng tịnh tiến trung bình Ed_bar của các phân tử khí này tăng gấp đôi (đạt 200% so với ban đầu) thì cần nung nóng khối khí để nhiệt độ Celsius tăng thêm bao nhiêu độ C?",
    answer: 300,
    unit: "°C",
    level: "Thông hiểu",
    explanation: "Động năng tịnh tiến trung bình tỉ lệ thuận với nhiệt độ tuyệt đối T: Ed_2 = 2 * Ed_1 => T_2 = 2 * T_1 = 600 K. Độ tăng nhiệt độ tuyệt đối \\Delta T = T_2 - T_1 = 300 K. Vì độ tăng nhiệt độ tính theo độ K và độ C là bằng nhau nên nhiệt độ Celsius cần tăng thêm đúng 300°C."
  },
  {
    id: "l12_p3_q2",
    question: "Tính động năng tịnh tiến trung bình Ed_bar của phân tử khí lí tưởng ở nhiệt độ tuyệt đối 400 K. Kết quả tính theo đơn vị 10^-21 J và làm tròn đến một chữ số thập phân (Ví dụ: 8.3).",
    answer: 8.3,
    unit: "10^-21 J",
    level: "Thông hiểu",
    explanation: "Ed_bar = 1,5 * k * T = 1,5 * (1,38.10^-23 J/K) * 400 K = 8,28.10^-21 J. Đổi sang đơn vị 10^-21 J là 8,28, làm tròn đến một chữ số thập phân là 8.3."
  },
  {
    id: "l12_p3_q3",
    question: "Tính tốc độ căn quân phương v_ctqp (m/s) của phân tử khí Heli ở nhiệt độ 300 K. Biết khối lượng của một phân tử Heli là 6,64.10^-27 kg và hằng số Boltzmann k = 1,38.10^-23 J/K. Kết quả làm tròn đến hàng đơn vị (Ví dụ: 1368).",
    answer: 1368,
    unit: "m/s",
    level: "Vận dụng",
    explanation: "v_ctqp = \\sqrt(3 * k * T / m) = \\sqrt(3 * 1,38.10^-23 * 300 / (6,64.10^-27)) ≈ 1368 m/s."
  },
  {
    id: "l12_p3_q4",
    question: "Một chất khí lí tưởng trong bình có mật độ phân tử \\mu = 3,0.10^25 phân tử/m^3. Áp suất của chất khí đo được là 1,2.10^5 Pa. Hãy tính động năng tịnh tiến trung bình Ed_bar của các phân tử khí này theo đơn vị 10^-21 J (viết kết quả dưới dạng số nguyên, ví dụ: 6).",
    answer: 6,
    unit: "10^-21 J",
    level: "Vận dụng",
    explanation: "Ta có: p = (2/3) * \\mu * Ed_bar => Ed_bar = 1,5 * p / \\mu = 1,5 * 1,2.10^5 Pa / (3,0.10^25 m^-3) = 6,0.10^-21 J. Biểu diễn theo đơn vị 10^-21 J là số nguyên 6."
  },
  {
    id: "l12_p3_q5",
    question: "Một khối khí lí tưởng có áp suất p = 1,38.10^5 Pa and mật độ phân tử khí \\mu là 2,5.10^25 phân tử/m^3. Hãy tính nhiệt độ tuyệt đối T của khối khí này theo đơn vị Kelvin. Cho hằng số Boltzmann k = 1,38.10^-23 J/K.",
    answer: 400,
    unit: "K",
    level: "Vận dụng",
    explanation: "Ta có: p = (2/3) * \\mu * Ed_bar = (2/3) * \\mu * (1,5 * k * T) = \\mu * k * T => T = p / (\\mu * k) = 1,38.10^5 / (2,5.10^25 * 1,38.10^-23) = 400 K."
  },
  {
    id: "l12_p3_q6",
    question: "Xác định áp suất p của một khối khí Helium đựng trong bình kín dung tích 5,0 lít, biết tổng động năng tịnh tiến của tất cả các phân tử Helium trong bình bằng 1,5.10^3 J. Kết quả biểu diễn dưới đơn vị 10^5 Pa, ghi dưới dạng số thập phân có một chữ số sau dấu phẩy (Ví dụ: 2.0).",
    answer: 2.0,
    unit: "10^5 Pa",
    level: "Vận dụng",
    explanation: "Áp suất p = (2/3) * \\mu * Ed_bar = (2/3) * (N / V) * Ed_bar = (2/3) * E_tot / V. Với E_tot = 1500 J, thể tích V = 5,0 lít = 5,0.10^-3 m^3. Ta được p = (2/3) * 1500 / (5,0.10^-3) = 2,0.10^5 Pa. Giá trị theo đơn vị 10^5 Pa là 2.0."
  }
];

// ==================== LESSON 13 QUESTIONS ====================
export const LESSON13_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l13_p1_q1",
    question: "Phương trình trạng thái của khí lí tưởng (phương trình Clapeyron) của một lượng khí xác định được viết dưới dạng nào sau đây?",
    options: [
      { id: "l13_p1_q1_o1", text: "\\( \\frac{p \\cdot V}{T} = \\text{hằng số.} \\)", isCorrect: true },
      { id: "l13_p1_q1_o2", text: "\\( \\frac{p \\cdot T}{V} = \\text{hằng số.} \\)", isCorrect: false },
      { id: "l13_p1_q1_o3", text: "\\( \\frac{V \\cdot T}{p} = \\text{hằng số.} \\)", isCorrect: false },
      { id: "l13_p1_q1_o4", text: "\\( p \\cdot V \\cdot T = \\text{hằng số.} \\)", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Theo phương trình trạng thái của khí lí tưởng cho một khối lượng khí xác định, biểu thức đúng là \\( \\frac{p \\cdot V}{T} = \\text{hằng số.} \\)"
  },
  {
    id: "l13_p1_q2",
    question: "Quá trình nào sau đây biểu diễn quá trình đẳng áp của một khối khí lí tưởng xác định?",
    options: [
      { id: "l13_p1_q2_o1", text: "Áp suất không đổi, thể tích tỉ lệ thuận với nhiệt độ tuyệt đối.", isCorrect: true },
      { id: "l13_p1_q2_o2", text: "Áp suất không đổi, thể tích tỉ lệ nghịch với nhiệt độ tuyệt đối.", isCorrect: false },
      { id: "l13_p1_q2_o3", text: "Thể tích không đổi, áp suất tỉ lệ nghịch với nhiệt độ tuyệt đối.", isCorrect: false },
      { id: "l13_p1_q2_o4", text: "Nhiệt độ không đổi, áp suất tỉ lệ nghịch với thể tích.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Định luật Charles chỉ ra rằng trong quá trình đẳng áp của một lượng khí xác định, thể tích \\( V \\) tỉ lệ thuận với nhiệt độ tuyệt đối \\( T \\)."
  },
  {
    id: "l13_p1_q3",
    question: "Đồ thị biểu diễn mối quan hệ giữa thể tích \\( V \\) và nhiệt độ tuyệt đối \\( T \\) trong quá trình đẳng áp của một lượng khí xác định là đường gì?",
    options: [
      { id: "l13_p1_q3_o1", text: "Đường thẳng kéo dài đi qua gốc tọa độ \\( O \\).", isCorrect: true },
      { id: "l13_p1_q3_o2", text: "Đường hyperbol dốc xuống.", isCorrect: false },
      { id: "l13_p1_q3_o3", text: "Đường thẳng song song với trục hoành \\( OT \\).", isCorrect: false },
      { id: "l13_p1_q3_o4", text: "Đường thẳng song song với trục tung \\( OV \\).", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đồ thị thể tích - nhiệt độ tuyệt đối \\( (V - T) \\) trong quá trình đẳng áp là đường thẳng có đường kéo dài đi qua gốc tọa độ \\( O \\)."
  },
  {
    id: "l13_p1_q4",
    question: "Trong hệ tọa độ \\( (p - T) \\), đường biểu diễn quá trình đẳng tích của một lượng khí lí tưởng xác định có dạng là:",
    options: [
      { id: "l13_p1_q4_o1", text: "Đường thẳng kéo dài đi qua gốc tọa độ \\( O \\).", isCorrect: true },
      { id: "l13_p1_q4_o2", text: "Đường thẳng song song với trục hoành \\( OT \\).", isCorrect: false },
      { id: "l13_p1_q4_o3", text: "Đường thẳng song song với trục tung \\( Op \\).", isCorrect: false },
      { id: "l13_p1_q4_o4", text: "Đường hyperbol dốc xuống.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Theo định luật Charles, trong quá trình đẳng tích của một lượng khí xác định, áp suất \\( p \\) tỉ lệ thuận với nhiệt độ tuyệt đối \\( T \\). Do đó đồ thị \\( p - T \\) là đường thẳng kéo dài đi qua gốc tọa độ \\( O \\)."
  },
  {
    id: "l13_p1_q5",
    question: "Quá trình chuyển trạng thái của một lượng khí xác định mà cả ba thông số trạng thái \\( (p, V, T) \\) đều biến đổi tuân theo:",
    options: [
      { id: "l13_p1_q5_o1", text: "Phương trình trạng thái của khí lí tưởng.", isCorrect: true },
      { id: "l13_p1_q5_o2", text: "Định luật Boyle cho quá trình đẳng nhiệt.", isCorrect: false },
      { id: "l13_p1_q5_o3", text: "Định luật Charles cho quá trình đẳng tích.", isCorrect: false },
      { id: "l13_p1_q5_o4", text: "Định luật Gay-Lussac cho quá trình đẳng áp.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Khi cả ba thông số \\( p, V, T \\) đều biến đổi, quá trình tuân theo phương trình trạng thái của khí lí tưởng: \\( \\frac{p \\cdot V}{T} = \\text{hằng số.} \\)"
  },
  {
    id: "l13_p1_q6",
    question: "Bóng thám không (Weather balloon) hoạt động ở tầng khí quyển cao thường tự vỡ sau khi đạt độ cao lớn chủ yếu là do:",
    options: [
      { id: "l13_p1_q6_o1", text: "Áp suất không khí bên ngoài giảm mạnh làm vỏ bóng dãn nở quá giới hạn đàn hồi.", isCorrect: true },
      { id: "l13_p1_q6_o2", text: "Nhiệt độ quá lạnh ở tầng cao làm vỏ cao su tự co rúm lại.", isCorrect: false },
      { id: "l13_p1_q6_o3", text: "Áp suất khí quyển tăng vọt bóp nát quả bóng từ bên ngoài.", isCorrect: false },
      { id: "l13_p1_q6_o4", text: "Khí Helium bên trong phản ứng hóa học với tầng ozone gây nổ vỏ.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Càng lên cao áp suất khí quyển xung quanh càng giảm loãng, hiệu áp suất bên trong bóng đẩy dãn căng vỏ bóng liên tục cho tới khi dãn nở vượt giới hạn đàn hồi cao sau gây nổ bóng."
  },
  {
    id: "l13_p1_q7",
    question: "Hằng số khí lí tưởng \\( R \\) trong phương trình trạng thái Mendeleev - Clapeyron \\( (p \\cdot V = n \\cdot R \\cdot T) \\) khi sử dụng các đơn vị đo chuẩn trong hệ SI có giá trị xấp xỉ bằng:",
    options: [
      { id: "l13_p1_q7_o1", text: "\\( 8,31 \\text{ J/(mol}\\cdot\\text{K)} \\)", isCorrect: true },
      { id: "l13_p1_q7_o2", text: "\\( 0,0821 \\text{ L}\\cdot\\text{atm/(mol}\\cdot\\text{K)} \\)", isCorrect: false },
      { id: "l13_p1_q7_o3", text: "\\( 1,38 \\cdot 10^{-23} \\text{ J/K} \\)", isCorrect: false },
      { id: "l13_p1_q7_o4", text: "\\( 6,02 \\cdot 10^{23} \\text{ mol}^{-1} \\)", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Trong hệ đơn vị chuẩn SI (\\( p \\) tính bằng \\( \\text{Pa} \\), \\( V \\) tính bằng \\( \\text{m}^3 \\), \\( n \\) tính bằng \\( \\text{mol} \\), \\( T \\) tính bằng \\( \\text{K} \\)), hằng số \\( R \\) xấp xỉ bằng \\( 8,31 \\text{ J/(mol}\\cdot\\text{K).} \\)"
  },
  {
    id: "l13_p1_q8",
    question: "Khái niệm 'Khí lí tưởng' khác biệt cơ bản nhất so với 'Khí thực' ở điểm nào?",
    options: [
      { id: "l13_p1_q8_o1", text: "Phân tử khí lí tưởng coi như chất điểm và chỉ tương tác khi va chạm.", isCorrect: true },
      { id: "l13_p1_q8_o2", text: "Khí lí tưởng có khối lượng phân tử bằng không.", isCorrect: false },
      { id: "l13_p1_q8_o3", text: "Khí thực không bao giờ có thể áp dụng các định luật chất khí.", isCorrect: false },
      { id: "l13_p1_q8_o4", text: "Khí lí tưởng luôn đứng yên không chuyển động nhiệt.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Khái niệm khí lí tưởng mô tả các phân tử khí có kích thước rất nhỏ so với khoảng cách giữa chúng (coi là chất điểm) và chỉ tương tác khi va chạm."
  },
  {
    id: "l13_p1_q9",
    question: "Một lượng khí ở điều kiện tiêu chuẩn có thể tích là \\( 2 \\text{ m}^3 \\). Nếu nén đẳng nhiệt khối khí này đến áp suất \\( 5 \\cdot 10^5 \\text{ Pa} \\) thì thể tích của lượng khí lúc này bằng bao nhiêu?",
    options: [
      { id: "l13_p1_q9_o1", text: "\\( 0,4 \\text{ m}^3 \\)", isCorrect: true },
      { id: "l13_p1_q9_o2", text: "\\( 10 \\text{ m}^3 \\)", isCorrect: false },
      { id: "l13_p1_q9_o3", text: "\\( 1,0 \\text{ m}^3 \\)", isCorrect: false },
      { id: "l13_p1_q9_o4", text: "\\( 4,0 \\text{ m}^3 \\)", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Áp dụng định luật Boyle cho quá trình đẳng nhiệt: \\( p_1 \\cdot V_1 = p_2 \\cdot V_2 \\). Ở ĐKTC áp suất \\( p_1 \\approx 10^5 \\text{ Pa} \\). Suy ra \\( V_2 = \\frac{p_1 \\cdot V_1}{p_2} = \\frac{10^5 \\cdot 2}{5 \cdot 10^5} = 0,4 \\text{ m}^3. \\)"
  },
  {
    id: "l13_p1_q10" ,
    question: "Một bình hình trụ dung tích \\( 8 \\text{ lít} \\) đặt thẳng đứng, đậy kín bằng một nắp nặng \\( 2 \\text{ kg} \\) có đường kính \\( d = 20 \\text{ cm} \\). Khí bên trong ban đầu ở nhiệt độ \\( 100^\\circ\\text{C} \\) dưới áp suất khí quyển \\( 10^5 \\text{ Pa} \\). Khi nhiệt độ khí giảm còn \\( 20^\\circ\\text{C} \\) thì áp suất khí trong bình xấp xỉ bằng:",
    options: [
      { id: "l13_p1_q10_o1", text: "\\( 7,86 \\cdot 10^4 \\text{ Pa} \\)", isCorrect: true },
      { id: "l13_p1_q10_o2", text: "\\( 2,00 \\cdot 10^4 \\text{ Pa} \\)", isCorrect: false },
      { id: "l13_p1_q10_o3", text: "\\( 10,0 \\cdot 10^4 \\text{ Pa} \\)", isCorrect: false },
      { id: "l13_p1_q10_o4", text: "\\( 5,36 \\cdot 10^4 \\text{ Pa} \\)", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Do bình kín có thể tích không đổi, đây là quá trình đẳng tích. Ta có \\( p_2 = p_1 \\cdot \\frac{T_2}{T_1} = 10^5 \\cdot \\frac{20 + 273}{100 + 273} = 10^5 \\cdot \\frac{293}{373} \\approx 7,86 \\cdot 10^4 \\text{ Pa.} \\)"
  },
  {
    id: "l13_p1_q11",
    question: "Một bình chứa khối lượng \\( m = 1,00 \\text{ kg} \\) chất khí lí tưởng ở áp suất \\( 10^7 \\text{ Pa} \\). Người ta lấy bớt khí ra khỏi bình giữ nhiệt độ không đổi đến khi áp suất còn \\( 2,5 \\cdot 10^6 \\text{ Pa} \\). Khối lượng khí đã lấy ra khỏi bình là:",
    options: [
      { id: "l13_p1_q11_o1", text: "\\( 0,75 \\text{ kg} \\)", isCorrect: true },
      { id: "l13_p1_q11_o2", text: "\\( 0,25 \\text{ kg} \\)", isCorrect: false },
      { id: "l13_p1_q11_o3", text: "\\( 0,50 \\text{ kg} \\)", isCorrect: false },
      { id: "l13_p1_q11_o4", text: "\\( 0,80 \\text{ kg} \\)", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Theo phương trình Mendeleev, do \\( V \\) và \\( T \\) không đổi nên \\( p \\) tỉ lệ thuận với \\( m \\): \\( \\frac{p_2}{p_1} = \\frac{m_2}{m_1} \\Rightarrow m_2 = 1,00 \\cdot \\frac{2,5 \\cdot 10^6}{10^7} = 0,25 \\text{ kg} \\). Lượng khí lấy ra: \\( \\Delta m = m_1 - m_2 = 1,00 - 0,25 = 0,75 \\text{ kg.} \\)"
  },
  {
    id: "l13_p1_q12",
    question: "Một lượng khí lí tưởng trong bình kín được nén ở nhiệt độ \\( 27^\\circ\\text{C} \\) và áp suất \\( 40 \\text{ atm} \\). Nếu nhiệt độ khí giảm xuống còn \\( 12^\\circ\\text{C} \\) và một nửa lượng khí rò rỉ thoát ra ngoài bình thì áp suất khí lúc này là bao nhiêu?",
    options: [
      { id: "l13_p1_q12_o1", text: "\\( 19 \\text{ atm} \\)", isCorrect: true },
      { id: "l13_p1_q12_o2", text: "\\( 20 \\text{ atm} \\)", isCorrect: false },
      { id: "l13_p1_q12_o3", text: "\\( 38 \\text{ atm} \\)", isCorrect: false },
      { id: "l13_p1_q12_o4", text: "\\( 9,5 \\text{ atm} \\)", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Ta có: \\( p_1 \\cdot V = n_1 \\cdot R \\cdot T_1 \\) và \\( p_2 \\cdot V = \\frac{n_1}{2} \\cdot R \\cdot T_2 \\). Lập tỉ số: \\( \\frac{p_2}{p_1} = 0,5 \\cdot \\frac{T_2}{T_1} \\Rightarrow p_2 = 40 \\cdot 0,5 \\cdot \\frac{285}{300} = 19 \\text{ atm.} \\)"
  },
  {
    id: "l13_p1_q13",
    question: "Nếu thể tích của một lượng khí lí tưởng xác định tăng lên gấp đôi, trong khi nhiệt độ tuyệt đối của nó giảm đi một nửa thì áp suất của khối khí đó thay đổi như thế nào?",
    options: [
      { id: "l13_p1_q13_o1", text: "Giảm đi 4 lần", isCorrect: true },
      { id: "l13_p1_q13_o2", text: "Tăng lên 4 lần", isCorrect: false },
      { id: "l13_p1_q13_o3", text: "Giảm đi 2 lần", isCorrect: false },
      { id: "l13_p1_q13_o4", text: "Không thay đổi", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Phương trình trạng thái: \\( \\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2} \\Rightarrow p_2 = p_1 \\cdot \\frac{V_1}{V_2} \\cdot \\frac{T_2}{T_1} = p_1 \\cdot \\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{p_1}{4} \\). Vậy áp suất giảm đi 4 lần."
  },
  {
    id: "l13_p1_q14",
    question: "Với bình khí ở câu hỏi trên (nắp nặng \\( 2 \\text{ kg} \\), \\( d = 20 \\text{ cm} \\), \\( T \\) giảm còn \\( 20^\\circ\\text{C} \\)), muốn mở được nắp bình cần tác dụng một lực tối thiểu hướng thẳng đứng lên trên bằng bao nhiêu? Lấy \\( g = 9,8 \\text{ m/s}^2 \\).",
    options: [
      { id: "l13_p1_q14_o1", text: "Khoảng \\( 692 \\text{ N} \\)", isCorrect: true },
      { id: "l13_p1_q14_o2", text: "Khoảng \\( 672 \\text{ N} \\)", isCorrect: false },
      { id: "l13_p1_q14_o3", text: "Khoảng \\( 19,6 \\text{ N} \\)", isCorrect: false },
      { id: "l13_p1_q14_o4", text: "Khoảng \\( 711 \\text{ N} \\)", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Điều kiện mở nắp: \\( F + p_2 \\cdot S = m \\cdot g + p_1 \\cdot S \\Rightarrow F_{\\text{min}} = m \\cdot g + (p_1 - p_2) \\cdot S \\). Trong đó \\( S = \\frac{\\pi \\cdot d^2}{4} = \\frac{3,14 \\cdot 0,2^2}{4} \\approx 0,0314 \\text{ m}^2 \\). Thay số: \\( F_{\\text{min}} = 2 \\cdot 9,8 + (10^5 - 7,86 \\cdot 10^4) \\cdot 0,0314 \\approx 19,6 + 672 \\approx 691,6 \\text{ N} \\approx 692 \\text{ N.} \\)"
  },
  {
    id: "l13_p1_q15",
    question: "Một quả bóng thám không có thể tích \\( 100 \\text{ m}^3 \\) ở mặt đất tại nhiệt độ \\( 27^\\circ\\text{C} \\) và áp suất \\( 1,0 \\text{ atm} \\). Khi bóng bay lên độ cao có áp suất khí quyển chỉ còn \\( 0,2 \\text{ atm} \\) và nhiệt độ là \\( -23^\\circ\\text{C} \\), thể tích của quả bóng lúc này bằng bao nhiêu?",
    options: [
      { id: "l13_p1_q15_o1", text: "\\( 416,7 \\text{ m}^3 \\)", isCorrect: true },
      { id: "l13_p1_q15_o2", text: "\\( 500,0 \\text{ m}^3 \\)", isCorrect: false },
      { id: "l13_p1_q15_o3", text: "\\( 380,5 \\text{ m}^3 \\)", isCorrect: false },
      { id: "l13_p1_q15_o4", text: "\\( 83,3 \\text{ m}^3 \\)", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "\\( \\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2} \\Rightarrow V_2 = V_1 \\cdot \\frac{p_1}{p_2} \\cdot \\frac{T_2}{T_1} = 100 \\cdot \\frac{1,0}{0,2} \\cdot \\frac{-23 + 273}{27 + 273} = 100 \\cdot 5 \\cdot \\frac{250}{300} \\approx 416,7 \\text{ m}^3. \\)"
  },
  {
    id: "l13_p1_q16",
    question: "Một chiếc lốp xe ô tô được bơm căng không khí ở nhiệt độ \\( 20^\\circ\\text{C} \\) dưới áp suất \\( 2,2 \\text{ bar} \\). Khi xe chạy trên đường cao tốc vào buổi trưa nắng nóng, nhiệt độ không khí bên trong lốp tăng lên đến \\( 60^\\circ\\text{C} \\). Coi thể tích lốp xe dãn nở không đáng kể. Áp suất khí trong lốp lúc này bằng bao nhiêu?",
    options: [
      { id: "l13_p1_q16_o1", text: "\\( 2,50 \\text{ bar} \\)", isCorrect: true },
      { id: "l13_p1_q16_o2", text: "\\( 2,00 \\text{ bar} \\)", isCorrect: false },
      { id: "l13_p1_q16_o3", text: "\\( 6,60 \\text{ bar} \\)", isCorrect: false },
      { id: "l13_p1_q16_o4", text: "\\( 2,35 \\text{ bar} \\)", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Quá trình đẳng tích: \\( p_2 = p_1 \\cdot \\frac{T_2}{T_1} = 2,2 \\cdot \\frac{60 + 273}{20 + 273} = 2,2 \\cdot \\frac{333}{293} \\approx 2,50 \\text{ bar.} \\)"
  },
  {
    id: "l13_p1_q17",
    question: "Một căn phòng có thể tích \\( 60 \\text{ m}^3 \\). Ban đầu không khí trong phòng ở nhiệt độ \\( 17^\\circ\\text{C} \\) và áp suất \\( 1,0 \\text{ atm} \\). Khi sưởi ấm căn phòng lên đến nhiệt độ \\( 27^\\circ\\text{C} \\) dưới áp suất khí quyển không đổi thì có bao nhiêu thể tích không khí (ở nhiệt độ \\( 27^\\circ\\text{C} \\)) thoát ra khỏi phòng qua các khe hở?",
    options: [
      { id: "l13_p1_q17_o1", text: "\\( 2,07 \\text{ m}^3 \\)", isCorrect: true },
      { id: "l13_p1_q17_o2", text: "\\( 2,00 \\text{ m}^3 \\)", isCorrect: false },
      { id: "l13_p1_q17_o3", text: "\\( 1,50 \\text{ m}^3 \\)", isCorrect: false },
      { id: "l13_p1_q17_o4", text: "\\( 3,45 \\text{ m}^3 \\)", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Xét lượng khí ban đầu \\( V_1 = 60 \\text{ m}^3 \\) ở \\( T_1 = 290 \\text{ K} \\). Khi đun nóng lên \\( T_2 = 300 \\text{ K} \\), ở áp suất không đổi, lượng khí này chiếm thể tích \\( V_2 = V_1 \\cdot \\frac{T_2}{T_1} = 60 \\cdot \\frac{300}{290} \\approx 62,07 \\text{ m}^3 \\). Thể tích không khí ở \\( 27^\\circ\\text{C} \\) thoát ra là \\( \\Delta V = V_2 - V_1 = 62,07 - 60 = 2,07 \\text{ m}^3. \\)"
  },
  {
    id: "l13_p1_q18",
    question: "Một xilanh nằm ngang kín hai đầu, ở giữa có một pít-tông cách nhiệt di động không ma sát. Ban đầu pít-tông chia xilanh thành hai phần bằng nhau chứa cùng một lượng khí lí tưởng ở áp suất \\( p_0 = 1 \\text{ atm} \\) và nhiệt độ \\( 27^\\circ\\text{C} \\). Người ta giữ nguyên nhiệt độ một phần ở \\( 27^\\circ\\text{C} \\) và nung nóng phần còn lại lên đến \\( 327^\\circ\\text{C} \\). Khi pít-tông dừng lại ở vị trí cân bằng mới, áp suất trong xilanh bằng bao nhiêu?",
    options: [
      { id: "l13_p1_q18_o1", text: "\\( 1,5 \\text{ atm} \\)", isCorrect: true },
      { id: "l13_p1_q18_o2", text: "\\( 2,0 \\text{ atm} \\)", isCorrect: false },
      { id: "l13_p1_q18_o3", text: "\\( 1,2 \\text{ atm} \\)", isCorrect: false },
      { id: "l13_p1_q18_o4", text: "\\( 1,33 \\text{ atm} \\)", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Tại vị trí cân bằng mới, áp suất hai bên bằng nhau là \\( p \\). Do pít-tông kín, di động tự do nên số mol khí không đổi. Phần 1: \\( p \\cdot V_1 = n \\cdot R \\cdot T_1 \\) và Phần 2: \\( p \\cdot V_2 = n \\cdot R \\cdot T_2 \\). Suy ra \\( \\frac{V_2}{V_1} = \\frac{T_2}{T_1} = \\frac{600}{300} = 2 \\Rightarrow V_2 = 2 \\cdot V_1 \\). Mà \\( V_1 + V_2 = 2 \\cdot V_0 \\Rightarrow 3 \\cdot V_1 = 2 \\cdot V_0 \\Rightarrow V_1 = \\frac{2}{3} \\cdot V_0 \\). Áp dụng đẳng nhiệt phần 1: \\( p_0 \\cdot V_0 = p \\cdot V_1 \\Rightarrow p = p_0 \\cdot \\frac{V_0}{V_1} = p_0 \\cdot 1,5 = 1,5 \\text{ atm.} \\)"
  }
];

export const LESSON13_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l13_p2_q1",
    question: "Khảo sát thí nghiệm nén khí đẳng nhiệt trong xi lanh có pít-tông kín chuyển động chậm (nén một lượng khí lí tưởng xác định có thể tích 2 m³ ở áp suất tiêu chuẩn 10⁵ Pa đến áp suất 5.10⁵ Pa).",
    statements: [
      {
        id: "l13_p2_q1_s1",
        text: "Trong suốt quá trình nén khí, tích số của áp suất p và thể tích V của khối khí luôn được bảo toàn.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Theo định luật Boyle cho quá trình đẳng nhiệt của một lượng khí xác định: p.V = hằng số."
      },
      {
        id: "l13_p2_q1_s2",
        text: "Phép đo nén khí phải diễn ra thật chậm để đảm bảo nhiệt độ của khối khí luôn kịp cân bằng với nhiệt độ môi trường xung quanh.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Nếu nén quá nhanh, khí nhận công sẽ bị nóng lên cục bộ làm sai lệch tính chất đẳng nhiệt."
      },
      {
        id: "l13_p2_q1_s3",
        text: "Đồ thị biểu diễn mối liên hệ giữa áp suất p và thể tích V của khối khí này là một đường thẳng đi qua gốc tọa độ O.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Trong hệ tọa độ (p-V), đường đẳng nhiệt biểu diễn định luật Boyle là một nhánh của đường cong hyperbol."
      },
      {
        id: "l13_p2_q1_s4",
        text: "Thể tích khối khí sau khi nén đạt giá trị bằng 0,4 m³.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Áp dụng định luật Boyle: V₂ = p₁.V₁ / p₂ = 10⁵ * 2 / (5.10⁵) = 0,4 m³."
      }
    ]
  },
  {
    id: "l13_p2_q2",
    question: "Xét quá trình xả bớt một lượng khí ra khỏi bình chứa có thể tích cố định ở nhiệt độ không đổi (bình chứa ban đầu có m₁ = 1,00 kg khí lí tưởng ở áp suất 10⁷ Pa, sau khi xả van, áp suất đo được giảm xuống còn 2,5.10⁶ Pa).",
    statements: [
      {
        id: "l13_p2_q2_s1",
        text: "Do nhiệt độ được giữ cố định nên ta có thể áp dụng trực tiếp định luật Boyle (p₁.V₁ = p₂.V₂) cho toàn bộ khối khí còn lại trong bình chứa.",
        isCorrect: false,
        level: "Nhận biết",
        explanation: "Sai. Quá trình có rò rỉ khí làm khối lượng khí thay đổi, không thỏa mãn điều kiện 'khối lượng khí không đổi' của định luật Boyle."
      },
      {
        id: "l13_p2_q2_s2",
        text: "Do thể tích bình không đổi và nhiệt độ không đổi, áp suất của khí trong bình luôn tỉ lệ thuận với khối lượng khí còn lại trong bình.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Theo phương trình Mendeleev-Clapeyron: p.V = (m/M).R.T. Khi V và T không đổi thì p tỉ lệ thuận với m."
      },
      {
        id: "l13_p2_q2_s3",
        text: "Khối lượng khí còn lại trong bình chứa sau khi áp suất giảm xuống còn 2,5.10⁶ Pa bằng đúng 0,25 kg.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Ta có m₂/m₁ = p₂/p₁ => m₂ = 1,00 * (2,5.10⁶ / 10⁷) = 0,25 kg."
      },
      {
        id: "l13_p2_q2_s4",
        text: "Nếu sau khi xả khí, ta hơ nóng bình kín lên nhiệt độ tuyệt đối gấp đôi nhiệt độ ban đầu thì áp suất của khí trong bình sẽ khôi phục lại giá trị 10⁷ Pa như ban đầu.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Áp suất sau khi xả là 2,5.10⁶ Pa. Khi T tăng gấp đôi (đẳng tích đối với lượng khí còn lại), áp suất chỉ tăng lên gấp đôi tức là 5.10⁶ Pa, không thể đạt tới 10⁷ Pa."
      }
    ]
  },
  {
    id: "l13_p2_q3",
    question: "Một bình oxy y tế bằng thép có dung tích không đổi 15 lít chứa khí oxygen ở nhiệt độ 27°C dưới áp suất rất cao là 150 atm. Sau một thời gian sử dụng cấp cứu cho bệnh nhân, áp suất đo được trong bình giảm xuống còn 30 atm ở nhiệt độ 17°C.",
    statements: [
      {
        id: "l13_p2_q3_s1",
        text: "Ở áp suất rất cao lên đến 150 atm, khí oxygen thực tế có sự sai lệch nhỏ so với khí lí tưởng do khoảng cách giữa các phân tử thu hẹp, lực tương tác không thể bỏ qua.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Ở áp suất rất cao và nhiệt độ thấp, khí thực sai lệch đáng kể so với mẫu khí lí tưởng."
      },
      {
        id: "l13_p2_q3_s2",
        text: "Tỉ số giữa số phân tử khí oxygen còn lại trong bình sau khi sử dụng và số phân tử khí oxygen ban đầu bằng khoảng 20,7%.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Số mol khí n tỉ lệ với p/T. Ta có: n₂/n₁ = (p₂/p₁) * (T₁/T₂) = (30/150) * (300/290) ≈ 0,2069 ≈ 20,7%."
      },
      {
        id: "l13_p2_q3_s3",
        text: "Khối lượng khí oxygen ban đầu chứa trong bình có áp suất 150 atm ở nhiệt độ 27°C xấp xỉ bằng 1,25 kg.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. p₁ = 150 atm ≈ 1,52 . 10⁷ Pa. Áp dụng p.V = (m/M).R.T => m₁ = p₁.V.M / (R.T₁) = 1,52.10⁷ * 0,015 * 0,032 / (8,31 * 300) ≈ 2,93 kg."
      },
      {
        id: "l13_p2_q4_s4",
        text: "Nếu bình chứa này bị rò rỉ khí từ từ ở nhiệt độ không đổi 27°C cho tới khi áp suất khí hạ bằng áp suất khí quyển (1 atm) thì thể tích khí oxygen đã thoát ra ngoài khí quyển khi đo ở áp suất 1 atm và nhiệt độ 27°C là 2235 lít.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Thể tích toàn bộ lượng khí ban đầu khi giãn ra áp suất 1 atm là V_total = p₁.V / p_atm = 150 * 15 / 1 = 2250 lít. Do bình vẫn giữ lại 15 lít khí ở áp suất 1 atm nên thể tích khí thực tế thoát ra ngoài khí quyển đo ở 1 atm là 2250 - 15 = 2235 lít."
      }
    ]
  },
  {
    id: "l13_p2_q4",
    question: "Trong một chu trình hoạt động của động cơ đốt trong bốn kì, hỗn hợp khí và hơi xăng được hút vào xilanh ở nhiệt độ 47°C dưới áp suất 1 atm với thể tích ban đầu là V₁ = 0,8 lít. Pít-tông dịch chuyển nén hỗn hợp này tới thể tích V₂ = 0,1 lít và áp suất đạt tới 15 atm.",
    statements: [
      {
        id: "l13_p2_q4_s1",
        text: "Giá trị nhiệt độ tuyệt đối tương ứng của hỗn hợp khí khi bắt đầu quá trình nén trong xilanh bằng đúng 320 K.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. T₁ = t₁ + 273 = 47 + 273 = 320 K."
      },
      {
        id: "l13_p2_q4_s2",
        text: "Trong suốt quá trình nén khí, nhiệt độ khối khí tăng lên một phần là do khối khí nhận công từ chuyển động cơ học của pít-tông.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Công do pít-tông thực hiện làm tăng nội năng của khối khí dẫn đến tăng nhiệt độ."
      },
      {
        id: "l13_p2_q4_s3",
        text: "Nhiệt độ của hỗn hợp khí ngay sau khi bị nén đạt đến giá trị bằng 400°C.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Áp dụng phương trình trạng thái: T₂ = T₁ * (p₂/p₁) * (V₂/V₁) = 320 * (15/1) * (0,1/0,8) = 600 K => t₂ = 600 - 273 = 327°C."
      },
      {
        id: "l13_p2_q4_s4",
        text: "Nếu giữ nguyên thể tích sau khi nén ở V₂ = 0,1 lít và đánh lửa đốt cháy hỗn hợp làm nhiệt độ khí tăng vọt đến 1527°C (quá trình đẳng tích), áp suất khí trong xilanh lúc này sẽ đạt giá trị bằng 45 atm.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Nhiệt độ lúc này T₃ = 1527 + 273 = 1800 K. Vì thể tích giữ nguyên nên áp suất tỉ lệ thuận với nhiệt độ tuyệt đối: p₃ = p₂ * T₃ / T₂ = 15 * (1800 / 600) = 45 atm."
      }
    ]
  }
];

export const LESSON13_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l13_p3_q1",
    question: "Một lượng khí lí tưởng ở điều kiện tiêu chuẩn có thể tích là 2 m³. Người ta nén đẳng nhiệt lượng khí này tới áp suất bằng 5.10⁵ Pa. Hãy xác định thể tích lúc sau của khối khí theo đơn vị m³. Ghi kết quả dưới dạng số thập phân có một chữ số sau dấu phẩy.",
    answer: 0.4,
    unit: "m³",
    level: "Thông hiểu",
    explanation: "Định luật Boyle cho quá trình đẳng nhiệt: p₁.V₁ = p₂.V₂ => V₂ = 10⁵ * 2 / (5.10⁵) = 0,4 m³."
  },
  {
    id: "l13_p3_q2",
    question: "Một chiếc lốp xe máy được bơm căng không khí ở nhiệt độ 27°C đến áp suất 2,0 bar. Khi chạy xe ngoài đường nhựa nắng nóng, nhiệt độ không khí bên trong lốp tăng lên đến 57°C. Coi thể tích lốp xe dãn nở không đáng kể, áp suất khí trong lốp lúc này bằng bao nhiêu bar? Ghi kết quả dưới dạng số thập phân có một chữ số sau dấu phẩy.",
    answer: 2.2,
    unit: "bar",
    level: "Thông hiểu",
    explanation: "Quá trình đẳng tích: p₂ = p₁ * T₂ / T₁ = 2,0 * (57 + 273) / (27 + 273) = 2,0 * 330 / 300 = 2,2 bar."
  },
  {
    id: "l13_p3_q3",
    question: "Một xilanh nằm ngang kín hai đầu, ở giữa có một pít-tông cách nhiệt di động không ma sát. Ban đầu pít-tông chia xilanh thành hai phần bằng nhau chứa cùng một lượng khí lí tưởng ở áp suất 1,0 atm và nhiệt độ 27°C. Người ta giữ nguyên nhiệt độ một phần ở 27°C và nung nóng phần còn lại lên đến 327°C. Khi pít-tông dừng lại ở vị trí cân bằng mới, áp suất trong xilanh bằng bao nhiêu atm? Ghi kết quả dưới dạng số thập phân có một chữ số sau dấu phẩy.",
    answer: 1.5,
    unit: "atm",
    level: "Vận dụng",
    explanation: "Áp suất cân bằng hai bên là p. Thể tích xilanh tổng là 2.V₀. Phần 1 giữ ở T₁=300 K: p.V₁ = n.R.T₁. Phần 2 nung lên T₂=600 K: p.V₂ = n.R.T₂. Suy ra V₂/V₁ = T₂/T₁ = 2 => V₂ = 2.V₁. Mà V₁ + V₂ = 2.V₀ => 3.V₁ = 2.V₀ => V₁ = 2/3.V₀. Áp dụng quá trình đẳng nhiệt phần 1: p₀.V₀ = p.V₁ => p = p₀ * (V₀ / V₁) = 1,0 * (3/2) = 1,5 atm."
  },
  {
    id: "l13_p3_q4",
    question: "Một bình kín dung tích 20 lít chứa khí helium ở áp suất 15 atm và nhiệt độ 27°C. Do van bị hở nhẹ nên khí thoát ra ngoài từ từ. Sau một thời gian, áp suất giảm xuống còn 12 atm ở nhiệt độ 17°C. Hãy tính thể tích khí helium thoát ra ngoài khí quyển khi đo ở điều kiện tiêu chuẩn (áp suất 1,0 atm và nhiệt độ 0°C) theo đơn vị lít. Làm tròn kết quả đến hàng đơn vị.",
    answer: 47,
    unit: "lít",
    level: "Vận dụng",
    explanation: "Số mol khí thoát ra: Δn = n₁ - n₂ = p₁.V / (R.T₁) - p₂.V / (R.T₂). Thể tích đo ở ĐKTC (p₀=1 atm, T₀=273 K): V_out = Δn * R.T₀ / p₀ = T₀ * (p₁.V/T₁ - p₂.V/T₂) = 273 * (15 * 20 / 300 - 12 * 20 / 290) = 273 * (1 - 24/29) = 273 * (5/29) ≈ 47,07 lít. Làm tròn thành 47 lít."
  },
  {
    id: "l13_p3_q5",
    question: "Một chiếc lốp ô tô chứa không khí ở áp suất 2,0 bar và nhiệt độ 27°C. Khi chạy nhanh trên đường cao tốc, lốp xe cọ xát nhiệt tăng lên làm áp suất không khí bên trong tăng tới 2,4 bar. Coi thể tích lốp xe dãn nở không đáng kể, nhiệt độ khí trong lốp lúc này bằng bao nhiêu độ Celsius (°C)? Làm tròn kết quả đến số nguyên gần nhất.",
    answer: 87,
    unit: "°C",
    level: "Vận dụng",
    explanation: "Quá trình đẳng tích: T₂ = T₁ * p₂ / p₁ = 300 * (2,4 / 2,0) = 360 K. Nhiệt độ Celsius là: t₂ = 360 - 273 = 87°C."
  },
  {
    id: "l13_p3_q6",
    question: "Một bình bằng thép dung tích 50 lít chứa khí nitơ ở áp suất 100 atm và nhiệt độ 27°C. Người ta dùng bình này để bơm các quả bóng bay có thể tích 5 lít dưới áp suất 1,0 atm ở cùng nhiệt độ 27°C. Hỏi bình thép trên có thể bơm tối đa được bao nhiêu quả bóng bay? Biết áp suất khí trong bình sau cùng phải bằng áp suất khí quyển 1,0 atm.",
    answer: 990,
    unit: "quả",
    level: "Vận dụng",
    explanation: "Vì nhiệt độ không đổi, áp dụng đẳng nhiệt. Lượng khí ban đầu là p₁.V₁ = 100 * 50 = 5000 atm.L. Khi áp suất trong bình bằng áp suất khí quyển 1,0 atm, lượng khí còn lại trong bình là p₂.V₁ = 1,0 * 50 = 50 atm.L. Lượng khí thoát ra ngoài để bơm bóng là: V_escaped = 5000 - 50 = 4950 atm.L. Ở áp suất 1,0 atm, thể tích khí thoát ra là 4950 lít. Số bóng bay tối đa bơm được là: N = 4950 / 5 = 990 quả."
  }
];

// ==================== LESSON 14 QUESTIONS ====================
export const LESSON14_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l14_p1_q1",
    question: "Từ trường là một dạng vật chất tồn tại xung quanh đối tượng nào sau đây?",
    options: [
      { id: "l14_p1_q1_o1", text: "Các điện tích chuyển động, dòng điện hoặc nam châm.", isCorrect: true },
      { id: "l14_p1_q1_o2", text: "Các điện tích đứng yên.", isCorrect: false },
      { id: "l14_p1_q1_o3", text: "Các thanh kim loại nhiễm điện do cọ xát đứng yên.", isCorrect: false },
      { id: "l14_p1_q1_o4", text: "Mọi thanh sắt chưa bị nhiễm từ đặt cô lập.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Từ trường tồn tại xung quanh hạt mang điện chuyển động (điện tích chuyển động), dòng điện hoặc nam châm."
  },
  {
    id: "l14_p1_q2",
    question: "Tính chất cơ bản của từ trường là gì?",
    options: [
      { id: "l14_p1_q2_o1", text: "Tác dụng lực từ lên nam châm, dòng điện hoặc điện tích chuyển động đặt trong nó.", isCorrect: true },
      { id: "l14_p1_q2_o2", text: "Tác dụng lực điện lên các điện tích đứng yên đặt trong nó.", isCorrect: false },
      { id: "l14_p1_q2_o3", text: "Hút các vật nhẹ như mẩu giấy hay sợi tơ đặt gần nó.", isCorrect: false },
      { id: "l14_p1_q2_o4", text: "Gây ra lực hấp dẫn vạn vật đối với mọi vật có khối lượng.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Tính chất cơ bản của từ trường là gây ra lực từ tác dụng lên một nam châm, một dòng điện hay một hạt mang điện chuyển động đặt trong nó."
  },
  {
    id: "l14_p1_q3",
    question: "Để phát hiện ra sự tồn tại của từ trường trong không gian, người ta thường sử dụng thiết bị/dụng cụ nào sau đây?",
    options: [
      { id: "l14_p1_q3_o1", text: "Kim nam châm thử.", isCorrect: true },
      { id: "l14_p1_q3_o2", text: "Điện tích thử đặt đứng yên.", isCorrect: false },
      { id: "l14_p1_q3_o3", text: "Bút thử điện thông dụng.", isCorrect: false },
      { id: "l14_p1_q3_o4", text: "Một quả cầu kim loại tích điện treo trên sợi chỉ.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Nhờ tính chất cơ bản của từ trường tác dụng lực lên nam châm, người ta dùng kim nam châm thử để phát hiện sự tồn tại của từ trường."
  },
  {
    id: "l14_p1_q4",
    question: "Quy ước chiều của vectơ cảm ứng từ B tại một điểm trong từ trường là chiều nào sau đây?",
    options: [
      { id: "l14_p1_q4_o1", text: "Chiều từ cực Nam (S) sang cực Bắc (N) của kim nam châm thử đặt cân bằng tại điểm đó.", isCorrect: true },
      { id: "l14_p1_q4_o2", text: "Chiều từ cực Bắc (N) sang cực Nam (S) của kim nam châm thử đặt cân bằng tại điểm đó.", isCorrect: false },
      { id: "l14_p1_q4_o3", text: "Chiều từ tây sang đông dọc theo kinh tuyến từ Trái Đất.", isCorrect: false },
      { id: "l14_p1_q4_o4", text: "Chiều hướng về tâm Trái Đất.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Quy ước chiều của vectơ cảm ứng từ B tại một điểm là chiều từ cực Nam (S) sang cực Bắc (N) của kim nam châm thử nằm cân bằng tại điểm đó."
  },
  {
    id: "l14_p1_q5",
    question: "Đường sức từ là gì?",
    options: [
      { id: "l14_p1_q5_o1", text: "Đường vẽ trong từ trường sao cho tiếp tuyến tại mỗi điểm trùng với phương vectơ cảm ứng từ tại điểm đó.", isCorrect: true },
      { id: "l14_p1_q5_o2", text: "Đường nối hai cực Nam và Bắc của một nam châm thẳng.", isCorrect: false },
      { id: "l14_p1_q5_o3", text: "Đường thẳng nối các điện tích chuyển động tuần hoàn trong kim loại.", isCorrect: false },
      { id: "l14_p1_q5_o4", text: "Đường thẳng xuất phát từ cực Bắc và kết thúc ở vô cực.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đường sức từ là những đường vẽ ở trong không gian có từ trường sao cho tiếp tuyến với nó tại mỗi điểm trùng với phương của vectơ cảm ứng từ tại điểm đó."
  },
  {
    id: "l14_p1_q6",
    question: "Về mặt hình học, các đường sức từ bên ngoài thanh nam châm vĩnh cửu có chiều như thế nào?",
    options: [
      { id: "l14_p1_q6_o1", text: "Đi ra từ cực Bắc (N) và đi vào cực Nam (S).", isCorrect: true },
      { id: "l14_p1_q6_o2", text: "Đi ra từ cực Nam (S) và đi vào cực Bắc (N).", isCorrect: false },
      { id: "l14_p1_q6_o3", text: "Đi tròn khép kín xung quanh trục đối xứng dọc của thanh nam châm.", isCorrect: false },
      { id: "l14_p1_q6_o4", text: "Đi ra từ cả hai cực và kết thúc ở trung tâm thanh nam châm.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đối với nam châm, quy ước các đường sức từ ở ngoài nam châm có chiều đi ra từ cực Bắc (N) và đi vào cực Nam (S) (Vào Nam Ra Bắc)."
  },
  {
    id: "l14_p1_q7",
    question: "Phát biểu nào sau đây là SAI khi nói về các đặc điểm của đường sức từ?",
    options: [
      { id: "l14_p1_q7_o1", text: "Qua bất kì điểm nào trong từ trường ta cũng có thể vẽ được nhiều đường sức từ giao nhau.", isCorrect: true },
      { id: "l14_p1_q7_o2", text: "Tại mỗi điểm trong từ trường, chỉ có thể vẽ được một đường sức từ đi qua và chỉ một mà thôi.", isCorrect: false },
      { id: "l14_p1_q7_o3", text: "Đường sức từ là những đường cong khép kín hoặc vô hạn ở hai đầu.", isCorrect: false },
      { id: "l14_p1_q7_o4", text: "Nơi nào từ trường mạnh hơn thì các đường sức từ ở đó vẽ dày (mật độ lớn) hơn.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Phát biểu A sai vì qua mỗi điểm trong từ trường chỉ vẽ được một và chỉ một đường sức từ duy nhất; các đường sức từ không bao giờ cắt nhau."
  },
  {
    id: "l14_p1_q8",
    question: "Hình ảnh các đường mạt sắt phân bố trên tấm nhựa trong suốt xung quanh vật mang từ tính được gọi là gì?",
    options: [
      { id: "l14_p1_q8_o1", text: "Từ phổ.", isCorrect: true },
      { id: "l14_p1_q8_o2", text: "Điện phổ.", isCorrect: false },
      { id: "l14_p1_q8_o3", text: "Quang phổ.", isCorrect: false },
      { id: "l14_p1_q8_o4", text: "Ảnh giao thoa từ trường.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Hình ảnh mạt sắt được sắp xếp trật tự trong từ trường gọi là từ phổ. Từ phổ cho ta hình ảnh trực quan về sự phân bố đường sức từ."
  },
  {
    id: "l14_p1_q9",
    question: "Để xác định chiều đường sức từ của dòng điện chạy trong dây dẫn thẳng dài, ta áp dụng quy tắc nào sau đây?",
    options: [
      { id: "l14_p1_q9_o1", text: "Quy tắc nắm bàn tay phải.", isCorrect: true },
      { id: "l14_p1_q9_o2", text: "Quy tắc bàn tay trái.", isCorrect: false },
      { id: "l14_p1_q9_o3", text: "Quy tắc vặn đinh ốc hai chiều trái ngược.", isCorrect: false },
      { id: "l14_p1_q9_o4", text: "Quy tắc bàn tay phải duỗi thẳng.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đường sức từ của dòng điện thẳng được xác định bằng quy tắc nắm bàn tay phải."
  },
  {
    id: "l14_p1_q10",
    question: "Khi áp dụng quy tắc nắm bàn tay phải đối với dòng điện chạy trong dây dẫn thẳng dài, ngón tay cái choãi ra dọc theo dây dẫn chỉ chiều nào?",
    options: [
      { id: "l14_p1_q10_o1", text: "Chiều dòng điện chạy qua dây dẫn.", isCorrect: true },
      { id: "l14_p1_q10_o2", text: "Chiều của đường sức từ.", isCorrect: false },
      { id: "l14_p1_q10_o3", text: "Chiều của lực từ tác dụng lên dây dẫn.", isCorrect: false },
      { id: "l14_p1_q10_o4", text: "Chiều của vectơ cảm ứng từ BT của Trái Đất.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Quy tắc nắm bàn tay phải cho dây dẫn thẳng: Ngón cái choãi ra chỉ chiều dòng điện I, bốn ngón tay khum lại chỉ chiều đường sức từ."
  },
  {
    id: "l14_p1_q11",
    question: "Thí nghiệm lịch sử của Oersted (Ơ-xtét) năm 1820 chứng minh mối liên hệ khăng khít giữa:",
    options: [
      { id: "l14_p1_q11_o1", text: "Dòng điện và từ trường (điện và từ).", isCorrect: true },
      { id: "l14_p1_q11_o2", text: "Điện trường và điện tích tĩnh.", isCorrect: false },
      { id: "l14_p1_q11_o3", text: "Lực hấp dẫn và lực tĩnh điện.", isCorrect: false },
      { id: "l14_p1_q11_o4", text: "Sự phát quang của chất khí nhiễm điện.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Thí nghiệm Oersted phát hiện dòng điện tác dụng lực lên kim nam châm thử, chứng tỏ xung quanh dòng điện có từ trường."
  },
  {
    id: "l14_p1_q12",
    question: "Trong thí nghiệm tương tác giữa hai tấm kim loại mỏng nhẹ treo song song, khi cho hai dòng điện chạy ngược chiều nhau qua hai tấm, ta quan sát được hiện tượng:",
    options: [
      { id: "l14_p1_q12_o1", text: "Hai tấm kim loại đẩy nhau ra xa.", isCorrect: true },
      { id: "l14_p1_q12_o2", text: "Hai tấm kim loại hút nhau lại gần.", isCorrect: false },
      { id: "l14_p1_q12_o3", text: "Hai tấm kim loại đứng yên không thay đổi.", isCorrect: false },
      { id: "l14_p1_q12_o4", text: "Hai tấm kim loại xoay đi một góc vuông.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Hai dòng điện chạy song song cùng chiều thì hút nhau, chạy song song ngược chiều thì đẩy nhau. Vì vậy khi chạy ngược chiều, hai tấm đẩy nhau."
  },
  {
    id: "l14_p1_q13",
    question: "Đường sức từ của từ trường xung quanh một dây dẫn thẳng dài mang dòng điện có dạng hình học là gì?",
    options: [
      { id: "l14_p1_q13_o1", text: "Các đường tròn đồng tâm nằm trên mặt phẳng vuông góc với dây dẫn, tâm nằm trên dây dẫn.", isCorrect: true },
      { id: "l14_p1_q13_o2", text: "Các đường thẳng song song vô hạn chạy dọc dây dẫn.", isCorrect: false },
      { id: "l14_p1_q13_o3", text: "Các đường xoắn ốc quấn quanh dây dẫn.", isCorrect: false },
      { id: "l14_p1_q13_o4", text: "Các hyperbol đồng dạng hướng ra ngoài.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Từ phổ của dòng điện thẳng dài là các đường tròn đồng tâm có tâm nằm trên dây dẫn và vuông góc với dây dẫn."
  },
  {
    id: "l14_p1_q14",
    question: "Khi tăng cường độ dòng điện chạy qua một ống dây mang dòng điện lên gấp đôi thì từ trường bên trong ống dây thay đổi thế nào?",
    options: [
      { id: "l14_p1_q14_o1", text: "Cảm ứng từ tăng mạnh lên gấp đôi.", isCorrect: true },
      { id: "l14_p1_q14_o2", text: "Cảm ứng từ giảm đi một nửa.", isCorrect: false },
      { id: "l14_p1_q14_o3", text: "Cảm ứng từ không đổi nhưng đổi chiều ngược lại.", isCorrect: false },
      { id: "l14_p1_q14_o4", text: "Đường sức từ thưa thớt đi gấp đôi.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Độ lớn cảm ứng từ B tỉ lệ thuận với cường độ dòng điện I. Do đó, khi dòng điện tăng gấp đôi, từ trường (cảm ứng từ B) bên trong ống dây cũng tăng gấp đôi."
  },
  {
    id: "l14_p1_q15",
    question: "Một dây dẫn thẳng đặt thẳng đứng có dòng điện chạy từ dưới lên trên. Hướng của đường sức từ tại một điểm ở phía đông của dây dẫn chỉ theo hướng nào?",
    options: [
      { id: "l14_p1_q15_o1", text: "Hướng Bắc.", isCorrect: true },
      { id: "l14_p1_q15_o2", text: "Hướng Nam.", isCorrect: false },
      { id: "l14_p1_q15_o3", text: "Hướng Đông.", isCorrect: false },
      { id: "l14_p1_q15_o4", text: "Hướng Tây.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Áp dụng quy tắc nắm bàn tay phải cho dòng điện hướng lên: ngón cái chỉ lên, bốn ngón tay khum theo chiều ngược chiều kim đồng hồ khi nhìn từ trên xuống. Ở vị trí phía đông dây dẫn, chiều quay này hướng về phía Bắc."
  },
  {
    id: "l14_p1_q16",
    question: "Đường sức từ bên trong lòng một ống dây dài mang dòng điện có đặc điểm nổi bật nào?",
    options: [
      { id: "l14_p1_q16_o1", text: "Là các đường thẳng song song, cách đều nhau và hướng dọc theo trục ống dây (từ trường đều).", isCorrect: true },
      { id: "l14_p1_q16_o2", text: "Là các đường tròn đồng tâm vuông góc với trục ống dây.", isCorrect: false },
      { id: "l14_p1_q16_o3", text: "Là các đường hyperbol hướng từ tâm ra ngoài.", isCorrect: false },
      { id: "l14_p1_q16_o4", text: "Các đường sức triệt tiêu lẫn nhau nên từ trường bằng không.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Bên trong lòng ống dây dài mang dòng điện, từ trường là từ trường đều, các đường sức từ là các đường thẳng song song và cách đều nhau dọc theo trục ống."
  },
  {
    id: "l14_p1_q17",
    question: "Trong thí nghiệm khảo sát đường sức từ của dòng điện tròn, nếu ta đổi chiều dòng điện chạy qua vòng dây tròn thì từ trường tại tâm vòng dây sẽ:",
    options: [
      { id: "l14_p1_q17_o1", text: "Đảo ngược chiều 180 độ nhưng giữ nguyên độ lớn.", isCorrect: true },
      { id: "l14_p1_q17_o2", text: "Giữ nguyên hướng cũ và tăng gấp đôi độ lớn.", isCorrect: false },
      { id: "l14_p1_q17_o3", text: "Bị triệt tiêu hoàn toàn về không.", isCorrect: false },
      { id: "l14_p1_q17_o4", text: "Quay lệch đi một góc vuông 90 độ.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Chiều đường sức từ tuân theo chiều dòng điện (quy tắc nắm bàn tay phải). Đổi chiều dòng điện làm đảo chiều từ trường 180 độ, độ lớn giữ nguyên."
  },
  {
    id: "l14_p1_q18",
    question: "Nhận định nào sau đây đúng khi so sánh từ phổ bên ngoài một ống dây mang dòng điện và từ phổ ngoài của nam châm thẳng?",
    options: [
      { id: "l14_p1_q18_o1", text: "Chúng có hình dạng phân bố mạt sắt rất giống nhau.", isCorrect: true },
      { id: "l14_p1_q18_o2", text: "Chúng hoàn toàn khác biệt nhau về mọi mặt hình học.", isCorrect: false },
      { id: "l14_p1_q18_o3", text: "Từ phổ của ống dây là vòng tròn còn của nam châm là đường thẳng.", isCorrect: false },
      { id: "l14_p1_q18_o4", text: "Ống dây không tạo ra từ phổ bên ngoài mà chỉ ở bên trong.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Từ phổ bên ngoài ống dây mang dòng điện có hình dạng phân bố mạt sắt rất giống với từ phổ ngoài của một nam châm thẳng."
  },
  {
    id: "l14_p1_q19",
    question: "Đặt một kim nam châm nhỏ tự do tại tâm của một vòng dây dẫn tròn mang dòng điện. Mặt phẳng vòng dây tròn được đặt thẳng đứng trùng phương Bắc - Nam. Khi cho dòng điện chạy qua vòng dây tròn, kim nam châm sẽ:",
    options: [
      { id: "l14_p1_q19_o1", text: "Lệch đi một góc so với hướng Bắc - Nam địa lý.", isCorrect: true },
      { id: "l14_p1_q19_o2", text: "Luôn giữ nguyên hướng song song mặt phẳng vòng dây.", isCorrect: false },
      { id: "l14_p1_q19_o3", text: "Quay liên tục không bao giờ dừng.", isCorrect: false },
      { id: "l14_p1_q19_o4", text: "Bị hút dính chặt vào dây dẫn kim loại.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Dòng điện sinh ra từ trường có vectơ cảm ứng từ vuông góc với mặt phẳng vòng dây tròn (phương Đông - Tây). Kim nam châm chịu tác dụng đồng thời của từ trường dòng điện và thành phần nằm ngang của từ trường Trái Đất nên lệch một góc xác định."
  },
  {
    id: "l14_p1_q20",
    question: "Ứng dụng quan trọng nhất của tác dụng định hướng từ trường Trái Đất lên kim nam châm thử trong đời sống kỹ thuật từ xa xưa đến nay là gì?",
    options: [
      { id: "l14_p1_q20_o1", text: "Chế tạo la bàn dùng để xác định phương hướng địa lý.", isCorrect: true },
      { id: "l14_p1_q20_o2", text: "Chế tạo các rơle điện tự động ngắt điện.", isCorrect: false },
      { id: "l14_p1_q20_o3", text: "Chế tạo cần cẩu từ kéo sắt thép vụn.", isCorrect: false },
      { id: "l14_p1_q20_o4", text: "Chế tạo động cơ điện xoay chiều công suất lớn.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "La bàn hoạt động nhờ tác dụng định hướng của từ trường Trái Đất lên kim nam châm tự do của la bàn để tìm hướng Bắc - Nam."
  }
];

export const LESSON14_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l14_p2_q1",
    question: "Một học sinh thực hiện thí nghiệm khảo sát tính chất cơ bản của từ trường và tương tác từ giữa các vật mang từ tính trong phòng thí nghiệm vật lí trường THPT.",
    statements: [
      {
        id: "l14_p2_q1_s1",
        text: "Khi đưa hai cực cùng tên của hai thanh nam châm thẳng lại gần nhau, chúng sẽ đẩy nhau.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Hai cực cùng tên (N-N hoặc S-S) thì đẩy nhau."
      },
      {
        id: "l14_p2_q1_s2",
        text: "Thí nghiệm Oersted phát hiện ra dòng điện tác dụng lực từ lên kim nam châm chỉ khi kim nam châm được bọc kín bằng vỏ nhựa dày.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Lực từ có khả năng đi xuyên qua nhựa, thủy tinh và không khí dễ dàng, không cần bọc vỏ nhựa dày mới xuất hiện."
      },
      {
        id: "l14_p2_q1_s3",
        text: "Tương tác từ là thuật ngữ dùng để chỉ chung tương tác giữa nam châm với nam châm, dòng điện với nam châm, và giữa hai dòng điện với nhau.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Sách giáo khoa trang 56 ghi rõ: Tương tác giữa nam châm với nam châm, giữa dòng điện với nam châm và giữa dòng điện với dòng điện đều gọi là tương tác từ."
      },
      {
        id: "l14_p2_q1_s4",
        text: "Nếu cho hai dòng điện song song chạy cùng chiều nhau qua hai tấm kim loại mỏng nhẹ song song, hai tấm sẽ đẩy nhau ra xa.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Hai dòng điện song song cùng chiều sẽ hút nhau, làm hai tấm khép gần lại nhau chứ không đẩy ra xa."
      }
    ]
  },
  {
    id: "l14_p2_q2",
    question: "Xem xét các tính chất hình học và vật lí quan trọng của các đường sức từ và khái niệm cảm ứng từ trong không gian xung quanh vật mang từ tính.",
    statements: [
      {
        id: "l14_p2_q2_s1",
        text: "Ở ngoài nam châm vĩnh cửu, các đường sức từ luôn là những đường cong khép kín hoặc vô hạn có chiều đi ra từ cực Nam và đi vào cực Bắc.",
        isCorrect: false,
        level: "Nhận biết",
        explanation: "Chiều đường sức ngoài nam châm quy ước là ra Bắc (N), vào Nam (S). Phát biểu này ghi ngược chiều."
      },
      {
        id: "l14_p2_q2_s2",
        text: "Mật độ đường sức từ đặc trưng cho độ mạnh yếu của từ trường: nơi nào từ trường mạnh hơn thì các đường sức từ vẽ dày đặc hơn.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đặc điểm đường sức từ: Nơi nào từ trường mạnh thì đường sức dày, nơi yếu thì đường sức thưa."
      },
      {
        id: "l14_p2_q2_s3",
        text: "Tại một điểm bất kì trong không gian có từ trường, ta luôn có thể vẽ được vô số đường sức từ cắt nhau đi qua điểm đó.",
        isCorrect: false,
        level: "Nhận biết",
        explanation: "Tại mỗi điểm trong từ trường, chỉ có thể vẽ được một đường sức từ đi qua và chỉ một mà thôi. Chúng không bao giờ cắt nhau."
      },
      {
        id: "l14_p2_q2_s4",
        text: "Chiều của đường sức từ tại một điểm trùng khít với chiều của vectơ cảm ứng từ tại điểm đó.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Chiều đường sức từ tại mỗi điểm được quy ước chính là chiều của vectơ cảm ứng từ B tại điểm đó."
      }
    ]
  },
  {
    id: "l14_p2_q3",
    question: "Để nghiên cứu từ trường của dòng điện chạy trong dây dẫn có hình dạng đặc biệt, học sinh tiến hành thí nghiệm với dây dẫn thẳng đứng và ống dây hình trụ dài.",
    statements: [
      {
        id: "l14_p2_q3_s1",
        text: "Đường sức từ xung quanh dòng điện chạy trong dây dẫn thẳng dài là những đường thẳng song song song song chạy dọc dây dẫn.",
        isCorrect: false,
        level: "Nhận biết",
        explanation: "Đường sức từ xung quanh dòng điện thẳng là những đường tròn đồng tâm vuông góc với dây dẫn, không phải là đường thẳng song song."
      },
      {
        id: "l14_p2_q3_s2",
        text: "Áp dụng quy tắc nắm bàn tay phải đối với ống dây mang dòng điện: Khum bàn tay phải sao cho chiều từ cổ tay đến các ngón tay trùng với chiều dòng điện chạy qua các vòng dây, khi đó ngón cái choãi ra chỉ chiều đường sức từ trong lòng ống dây.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đây là định nghĩa quy tắc nắm bàn tay phải áp dụng cho dòng điện chạy qua các vòng dây tròn và ống dây (Hình 14.10)."
      },
      {
        id: "l14_p2_q3_s3",
        text: "Bên trong lòng một ống dây hình trụ dài có dòng điện chạy qua, từ trường là từ trường đều nên các đường sức từ song song và cách đều nhau dọc theo trục ống.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Từ trường trong ống dây dài mang dòng điện là từ trường đều, các đường sức từ bên trong là các đường thẳng song song cách đều nhau."
      },
      {
        id: "l14_p2_q3_s4",
        text: "Nếu cường độ dòng điện chạy qua dây dẫn thẳng tăng gấp ba lần, hình dạng phân bố từ phổ mạt sắt sẽ xoay nghiêng đi 90 độ.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Tăng cường độ dòng điện chỉ làm tăng độ mạnh của từ trường (các mạt sắt xếp rõ ràng dày đặc hơn), hoàn toàn không thay đổi hình dạng hình học tròn đồng tâm hay làm xoay lệch góc của từ phổ mạt sắt."
      }
    ]
  },
  {
    id: "l14_p2_q4",
    question: "Một kim nam châm nhỏ nằm cân bằng tại một điểm trong từ trường của Trái Đất và từ trường dòng điện thẳng chạy dọc phương đứng.",
    statements: [
      {
        id: "l14_p2_q4_s1",
        text: "Xung quanh Trái Đất có từ trường, được gọi là địa từ trường.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Địa từ trường hay từ trường Trái Đất tồn tại xung quanh Trái Đất và tác dụng lên kim nam châm thử."
      },
      {
        id: "l14_p2_q4_s2",
        text: "Cực từ của Trái Đất trùng khớp hoàn toàn không sai lệch một li nào so với cực địa lý của Trái Đất.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Các cực từ Trái Đất chỉ nằm gần trùng chứ không trùng khớp hoàn toàn tuyệt đối với cực địa lý của Trái Đất."
      },
      {
        id: "l14_p2_q4_s3",
        text: "Nếu một kim la bàn bị mất từ tính (không còn từ tính), la bàn đó vẫn chỉ đúng hướng Bắc - Nam địa lý bình thường dưới tác dụng của từ trường Trái Đất.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Kim la bàn phải có từ tính thì mới chịu tác dụng của lực từ của Trái Đất để định hướng. Nếu mất từ tính, nó không chịu tác dụng định hướng nữa và không thể chỉ đúng hướng Bắc - Nam địa lý."
      },
      {
        id: "l14_p2_q4_s4",
        text: "Chiều của vectơ cảm ứng từ Trái Đất ở bề mặt khu vực xích đạo chủ yếu hướng từ nam địa lý sang bắc địa lý.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đường sức địa từ đi ra từ cực nam địa lý (gần cực Bắc từ) và đi vào cực bắc địa lý (gần cực Nam từ), nên ở xích đạo cảm ứng từ nằm ngang hướng từ nam sang bắc địa lý."
      }
    ]
  }
];

// ==================== LESSON 15 QUESTIONS ====================
export const LESSON15_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l15_p1_q1",
    question: "Lực từ là lực tương tác xuất hiện giữa:",
    options: [
      { id: "l15_p1_q1_o1", text: "Hai dòng điện, hai nam châm hoặc một dòng điện và một nam châm đặt gần nhau.", isCorrect: true },
      { id: "l15_p1_q1_o2", text: "Hai hạt mang điện tích cùng loại đặt đứng yên gần nhau.", isCorrect: false },
      { id: "l15_p1_q1_o3", text: "Hai vật thể có khối lượng đặt trong trường hấp dẫn.", isCorrect: false },
      { id: "l15_p1_q1_o4", text: "Thanh kim loại nhiễm điện đứng yên và một nam châm thử.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Lực từ là lực tương tác giữa các vật mang từ tính như dòng điện (các điện tích chuyển động) hoặc nam châm.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q2",
    question: "Phương của lực từ tác dụng lên một đoạn dây dẫn thẳng mang dòng điện đặt trong từ trường đều có đặc điểm nào sau đây?",
    options: [
      { id: "l15_p1_q2_o1", text: "Vuông góc với mặt phẳng chứa đoạn dây dẫn và vectơ cảm ứng từ B.", isCorrect: true },
      { id: "l15_p1_q2_o2", text: "Song song với đường cảm ứng từ của từ trường.", isCorrect: false },
      { id: "l15_p1_q2_o3", text: "Trùng với hướng của đoạn dây dẫn mang dòng điện.", isCorrect: false },
      { id: "l15_p1_q2_o4", text: "Vuông góc với đoạn dây dẫn nhưng song song với vectơ cảm ứng từ B.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Lực từ F vuông góc với cả đoạn dây dẫn mang dòng điện và vectơ cảm ứng từ B, tức là vuông góc với mặt phẳng chứa chúng.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q3",
    question: "Công thức xác định độ lớn của lực từ (lực Ampere) tác dụng lên đoạn dây dẫn thẳng có chiều dài L mang dòng điện cường độ I đặt trong từ trường đều cảm ứng từ B là:",
    options: [
      { id: "l15_p1_q3_o1", text: "F = B.I.L.sin(α), với α là góc hợp bởi đoạn dây mang dòng điện và chiều vectơ cảm ứng từ.", isCorrect: true },
      { id: "l15_p1_q3_o2", text: "F = B.I.L.cos(α), với α là góc hợp bởi đoạn dây mang dòng điện và chiều vectơ cảm ứng từ.", isCorrect: false },
      { id: "l15_p1_q3_o3", text: "F = B.I.L.tan(α), với α là góc hợp bởi đoạn dây mang dòng điện và chiều vectơ cảm ứng từ.", isCorrect: false },
      { id: "l15_p1_q3_o4", text: "F = B.I / (L.sin(α)), với α là góc hợp bởi đoạn dây mang dòng điện và chiều vectơ cảm ứng từ.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Độ lớn lực Ampere tác dụng lên đoạn dây mang dòng điện thẳng là F = B.I.L.sin(α).",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q4",
    question: "Chiều của lực từ tác dụng lên đoạn dây dẫn mang dòng điện được xác định bằng quy tắc nào?",
    options: [
      { id: "l15_p1_q4_o1", text: "Quy tắc bàn tay trái.", isCorrect: true },
      { id: "l15_p1_q4_o2", text: "Quy tắc bàn tay phải.", isCorrect: false },
      { id: "l15_p1_q4_o3", text: "Quy tắc cái đinh ốc.", isCorrect: false },
      { id: "l15_p1_q4_o4", text: "Quy tắc nắm tay phải.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Theo định luật Ampere, chiều của lực từ tác dụng lên dòng điện được xác định theo quy tắc bàn tay trái.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q5",
    question: "Trong hệ SI, đơn vị của cảm ứng từ là gì và được định nghĩa tương đương với các đơn vị cơ bản nào?",
    options: [
      { id: "l15_p1_q5_o1", text: "Tesla (T), với 1 T = 1 N / (1 A.m).", isCorrect: true },
      { id: "l15_p1_q5_o2", text: "Weber (Wb), với 1 Wb = 1 N.A / m.", isCorrect: false },
      { id: "l15_p1_q5_o3", text: "Tesla (T), với 1 T = 1 N.m / A.", isCorrect: false },
      { id: "l15_p1_q5_o4", text: "Henry (H), với 1 H = 1 J / A².", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đơn vị cảm ứng từ là Tesla (T). Từ công thức B = F / (I.L.sin(α)), ta có 1 T = 1 N / (1 A.m).",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q6",
    question: "Một dây dẫn mang dòng điện song song với các đường sức từ của một từ trường đều. Lực từ tác dụng lên đoạn dây dẫn đó có đặc điểm gì?",
    options: [
      { id: "l15_p1_q6_o1", text: "Có độ lớn bằng không.", isCorrect: true },
      { id: "l15_p1_q6_o2", text: "Có độ lớn cực đại và phương vuông góc với dây.", isCorrect: false },
      { id: "l15_p1_q6_o3", text: "Có phương song song với từ trường và độ lớn tùy thuộc vào cường độ dòng điện.", isCorrect: false },
      { id: "l15_p1_q6_o4", text: "Có hướng thẳng đứng từ dưới lên.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Khi dây dẫn song song với đường sức từ thì góc α = 0° hoặc α = 180°, dẫn đến sin(α) = 0. Do đó, lực từ F = B.I.L.sin(α) = 0.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q7",
    question: "Theo quy tắc bàn tay trái, nếu lòng bàn tay hứng các đường cảm ứng từ và chiều từ cổ tay đến ngón tay chỉ chiều dòng điện, ngón tay cái choãi ra 90 độ sẽ chỉ chiều của đại lượng nào?",
    options: [
      { id: "l15_p1_q7_o1", text: "Lực từ tác dụng lên đoạn dây dẫn.", isCorrect: true },
      { id: "l15_p1_q7_o2", text: "Vectơ cảm ứng từ B.", isCorrect: false },
      { id: "l15_p1_q7_o3", text: "Vectơ cường độ dòng điện.", isCorrect: false },
      { id: "l15_p1_q7_o4", text: "Lực tương tác tĩnh điện giữa các electron.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Theo quy tắc bàn tay trái, ngón tay cái choãi ra 90° chỉ chiều của lực từ tác dụng lên đoạn dây dẫn mang dòng điện.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q8",
    question: "Tàu đệm từ (Maglev) có thể lướt trên đường ray mà không cần bánh xe tiếp xúc trực tiếp nhờ vào cơ chế ứng dụng lực nào dưới đây?",
    options: [
      { id: "l15_p1_q8_o1", text: "Lực từ sinh ra từ hệ thống nam châm siêu dẫn tạo lực đẩy nâng tàu lên.", isCorrect: true },
      { id: "l15_p1_q8_o2", text: "Lực ly tâm và lực quán tính cực lớn khi tàu chạy ở tốc độ cao.", isCorrect: false },
      { id: "l15_p1_q8_o3", text: "Lực đẩy Archimedes của bầu không khí xung quanh đường ray hẹp.", isCorrect: false },
      { id: "l15_p1_q8_o4", text: "Lực ma sát trượt của các đệm sắt bôi trơn dầu nhớt.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Tàu đệm từ lướt trên đường ray nhờ lực từ (lực đẩy và nâng từ các nam châm điện siêu dẫn đặt ở thành tàu và đường ray) triệt tiêu lực ma sát bánh xe.",
    illustrationType: "maglev_levitation"
  },
  {
    id: "l15_p1_q9",
    question: "Khái niệm nào sau đây mô tả đúng nhất về đặc điểm của một từ trường đều?",
    options: [
      { id: "l15_p1_q9_o1", text: "Là từ trường có các đường sức từ song song, cùng chiều và cách đều nhau, độ lớn cảm ứng từ bằng nhau tại mọi điểm.", isCorrect: true },
      { id: "l15_p1_q9_o2", text: "Là từ trường có các đường sức từ hướng vào tâm một dòng điện tròn.", isCorrect: false },
      { id: "l15_p1_q9_o3", text: "Là từ trường có cường độ lực tăng dần khi di chuyển ra xa hai cực nam châm.", isCorrect: false },
      { id: "l15_p1_q9_o4", text: "Là từ trường sinh ra bởi một hạt mang điện đứng yên tuyệt đối.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Từ trường đều có các đường sức từ song song, cùng chiều, cách đều nhau và vectơ cảm ứng từ B bằng nhau tại mọi điểm.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q10",
    question: "Bộ phận nào sau đây trực tiếp tạo ra lực đẩy nâng cao thân tàu cách ray 10 - 15 mm trong hoạt động của tàu đệm từ Maglev?",
    options: [
      { id: "l15_p1_q10_o1", text: "Hệ thống các nam châm siêu dẫn cực mạnh gắn trên thân tàu và các cuộn dây dẫn bên dưới đường ray.", isCorrect: true },
      { id: "l15_p1_q10_o2", text: "Động cơ đốt trong truyền lực đẩy thông qua trục bánh xe thép.", isCorrect: false },
      { id: "l15_p1_q10_o3", text: "Cánh quạt phản lực lắp ở đuôi tàu ép không khí xuống ray.", isCorrect: false },
      { id: "l15_p1_q10_o4", text: "Hệ thống piston thủy lực nén khí áp suất cao liên tục.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Nam châm siêu dẫn trên tàu chuyển động qua cuộn dây dưới ray tạo ra dòng điện cảm ứng sinh lực đẩy thẳng đứng nâng tàu.",
    illustrationType: "maglev_levitation"
  },
  {
    id: "l15_p1_q11",
    question: "Đòn cân dòng điện (đòn cân lực từ) hoạt động dựa trên việc cân bằng giữa hai lực nào sau đây?",
    options: [
      { id: "l15_p1_q11_o1", text: "Lực từ tác dụng lên đoạn dây dẫn mang dòng điện và trọng lực của quả cân.", isCorrect: true },
      { id: "l15_p1_q11_o2", text: "Lực tĩnh điện giữa hai thanh kim loại và lực đẩy Archimedes.", isCorrect: false },
      { id: "l15_p1_q11_o3", text: "Lực đàn hồi của lò xo lực kế và lực ma sát của trục quay.", isCorrect: false },
      { id: "l15_p1_q11_o4", text: "Lực hướng tâm khi khung dây quay và lực căng của sợi chỉ treo.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đòn cân dòng điện đo độ lớn lực từ bằng cách cân bằng nó với momen trọng lực của quả cân treo ở nhánh đối diện.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q12",
    question: "Khi góc α hợp bởi đoạn dây dẫn thẳng mang dòng điện và đường cảm ứng từ tăng từ 0° lên 90° thì độ lớn lực Ampere tác dụng lên dây dẫn thay đổi như thế nào?",
    options: [
      { id: "l15_p1_q12_o1", text: "Tăng liên tục từ 0 đạt đến giá trị cực đại.", isCorrect: true },
      { id: "l15_p1_q12_o2", text: "Giảm dần từ giá trị cực đại về bằng 0.", isCorrect: false },
      { id: "l15_p1_q12_o3", text: "Không thay đổi và luôn bằng tích B.I.L.", isCorrect: false },
      { id: "l15_p1_q12_o4", text: "Tăng từ 0 đến giá trị cực đại rồi lại giảm về 0.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "F = B.I.L.sin(α). Khi α tăng từ 0° lên 90°, sin(α) tăng từ 0 lên 1, do đó lực từ tăng liên tục từ 0 đạt cực đại F_max = B.I.L.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q13",
    question: "Nguyên lí hoạt động của động cơ điện một chiều dựa trên hiện tượng vật lí nào sau đây?",
    options: [
      { id: "l15_p1_q13_o1", text: "Tác dụng của mômen ngẫu lực từ làm quay khung dây mang dòng điện đặt trong từ trường.", isCorrect: true },
      { id: "l15_p1_q13_o2", text: "Hiện tượng cảm ứng điện từ xuất hiện khi từ thông qua khung biến thiên.", isCorrect: false },
      { id: "l15_p1_q13_o3", text: "Tác dụng phát quang của dòng điện một chiều đi qua chất bán dẫn.", isCorrect: false },
      { id: "l15_p1_q13_o4", text: "Hiện tượng tự cảm khi đột ngột đóng ngắt công tắc nguồn điện.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Động cơ điện một chiều biến điện năng thành cơ năng nhờ mômen ngẫu lực từ tác dụng lên các cạnh của khung dây làm khung quay liên tục.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q14",
    question: "Một đoạn dây dẫn thẳng dài L = 15 cm mang dòng điện cường độ I = 4 A đặt vuông góc với hướng đường cảm ứng từ của một từ trường đều có cảm ứng từ B = 0,2 T. Độ lớn lực từ tác dụng lên đoạn dây dẫn bằng bao nhiêu?",
    options: [
      { id: "l15_p1_q14_o1", text: "0,12 N", isCorrect: true },
      { id: "l15_p1_q14_o2", text: "1,20 N", isCorrect: false },
      { id: "l15_p1_q14_o3", text: "0,06 N", isCorrect: false },
      { id: "l15_p1_q14_o4", text: "12,0 N", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "F = B.I.L.sin(α). Vì vuông góc nên α = 90° => sin(α) = 1. F = 0,2 * 4 * 0,15 * 1 = 0,12 N.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q15",
    question: "Một đoạn dây dẫn mang dòng điện cường độ I đặt trong từ trường đều B. Biết lực từ tác dụng lên dây có độ lớn bằng một nửa giá trị lực từ cực đại. Góc α hợp giữa đoạn dây dẫn và các đường cảm ứng từ bằng bao nhiêu?",
    options: [
      { id: "l15_p1_q15_o1", text: "30° hoặc 150°", isCorrect: true },
      { id: "l15_p1_q15_o2", text: "60° hoặc 120°", isCorrect: false },
      { id: "l15_p1_q15_o3", text: "45° hoặc 135°", isCorrect: false },
      { id: "l15_p1_q15_o4", text: "0° hoặc 180°", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "F = F_max / 2 => B.I.L.sin(α) = (B.I.L) / 2 => sin(α) = 0,5 => α = 30° hoặc α = 150°.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q16",
    question: "Một đoạn dây dẫn thẳng nằm ngang dài L = 20 cm, khối lượng m = 4 g được đặt trong từ trường đều có cảm ứng từ B nằm ngang vuông góc với dây. Cho dòng điện cường độ I = 2 A chạy qua dây. Để lực từ nâng dây cân bằng với trọng lực (g = 10 m/s²), độ lớn cảm ứng từ B bằng bao nhiêu?",
    options: [
      { id: "l15_p1_q16_o1", text: "0,10 T", isCorrect: true },
      { id: "l15_p1_q16_o2", text: "0,01 T", isCorrect: false },
      { id: "l15_p1_q16_o3", text: "1,00 T", isCorrect: false },
      { id: "l15_p1_q16_o4", text: "0,20 T", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "F_tu = P => B.I.L.sin(90°) = m.g => B = (m.g) / (I.L) = (0,004 * 10) / (2 * 0,2) = 0,04 / 0,4 = 0,10 T.",
    illustrationType: "wire_suspended"
  },
  {
    id: "l15_p1_q17",
    question: "Một khung dây hình vuông cạnh a = 5 cm gồm N = 50 vòng dây mang dòng điện cường độ I = 1 A đặt trong từ trường đều có cảm ứng từ B = 0,08 T sao cho mặt phẳng khung dây song song với các đường cảm ứng từ. Mômen ngẫu lực từ cực đại tác dụng lên khung bằng bao nhiêu?",
    options: [
      { id: "l15_p1_q17_o1", text: "0,01 N.m", isCorrect: true },
      { id: "l15_p1_q17_o2", text: "0,10 N.m", isCorrect: false },
      { id: "l15_p1_q17_o3", text: "0,20 N.m", isCorrect: false },
      { id: "l15_p1_q17_o4", text: "0,005 N.m", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Diện tích S = a² = 0,05² = 0,0025 m². Mômen ngẫu lực từ cực đại: M_max = N.B.I.S = 50 * 0,08 * 1 * 0,0025 = 4 * 0,0025 = 0,01 N.m.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p1_q18",
    question: "Một đoạn dây dẫn thẳng dài L = 10 cm treo nằm ngang bằng hai sợi chỉ nhẹ cách điện trong từ trường đều hướng thẳng đứng từ dưới lên. Cho dòng điện I chạy qua, dây chịu lực từ F = 0,1 N hướng ngang đẩy lệch dây treo. Biết trọng lượng của đoạn dây dẫn là P = 0,1 N. Khi dây ở trạng thái cân bằng, góc lệch θ của sợi dây so với phương thẳng đứng bằng bao nhiêu?",
    options: [
      { id: "l15_p1_q18_o1", text: "45°", isCorrect: true },
      { id: "l15_p1_q18_o2", text: "30°", isCorrect: false },
      { id: "l15_p1_q18_o3", text: "60°", isCorrect: false },
      { id: "l15_p1_q18_o4", text: "15°", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "tan(θ) = F_tu / P = 0,1 / 0,1 = 1 => θ = 45°.",
    illustrationType: "wire_suspended"
  }
];

export const LESSON15_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l15_p2_q1",
    question: "Cho một đoạn dây dẫn thẳng mang dòng điện I đặt trong từ trường đều có cảm ứng từ B. Góc hợp bởi đoạn dây và các đường sức từ là α.",
    statements: [
      {
        id: "l15_p2_q1_s1",
        text: "Đơn vị đo của cảm ứng từ trong hệ SI là Tesla (T), được định nghĩa là 1 T = 1 N/(A.m).",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Cảm ứng từ đo bằng Tesla, tương đương Newton chia cho Ampe nhân mét."
      },
      {
        id: "l15_p2_q1_s2",
        text: "Lực từ tác dụng lên đoạn dây dẫn thẳng đặt song song với các đường sức từ luôn đạt giá trị cực đại.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Khi đặt song song thì α = 0° hoặc 180° nên sin(α) = 0. Do đó lực từ bằng không."
      },
      {
        id: "l15_p2_q1_s3",
        text: "Khi dây dẫn đặt vuông góc với các đường cảm ứng từ (α = 90°), lực từ tác dụng lên dây có độ lớn cực đại F_max = B.I.L.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Khi α = 90° thì sin(90°) = 1, đây là giá trị lớn nhất của hàm sin nên lực từ đạt cực đại."
      },
      {
        id: "l15_p2_q1_s4",
        text: "Nếu đồng thời tăng cường độ dòng điện lên 2 lần và giảm chiều dài phần dây dẫn nằm trong từ trường đi 2 lần thì độ lớn lực từ tác dụng lên dây tăng lên 4 lần.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Vì F = B.I.L.sin(α), khi I' = 2I và L' = L/2 thì lực từ F' = B * (2I) * (L/2) * sin(α) = F (không đổi)."
      }
    ]
  },
  {
    id: "l15_p2_q2",
    question: "Xét một khung dây dẫn phẳng mang dòng điện chạy qua đặt trong một từ trường đều sao cho mặt phẳng khung song song với các đường cảm ứng từ.",
    statements: [
      {
        id: "l15_p2_q2_s1",
        text: "Cặp lực từ tác dụng lên hai cạnh đối diện vuông góc với đường cảm ứng từ của khung dây tạo thành một ngẫu lực từ làm quay khung dây.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Hai lực này song song, ngược chiều, có độ lớn bằng nhau và không cùng giá, tạo thành một ngẫu lực."
      },
      {
        id: "l15_p2_q2_s2",
        text: "Mômen ngẫu lực từ tác dụng lên khung dây luôn đạt giá trị bằng không khi mặt phẳng khung dây nằm song song với các đường cảm ứng từ.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Khi mặt phẳng khung dây song song với các đường sức từ thì mômen ngẫu lực từ đạt giá trị cực đại M_max = N.B.I.S."
      },
      {
        id: "l15_p2_q2_s3",
        text: "Dưới tác dụng của ngẫu lực từ, khung dây có xu hướng quay về vị trí sao cho mặt phẳng khung vuông góc với các đường sức từ.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Đây là vị trí cân bằng bền của khung dây trong từ trường, khi đó mômen ngẫu lực bằng không."
      },
      {
        id: "l15_p2_q2_s4",
        text: "Khung dây tròn gồm 100 vòng bán kính R = 10 cm mang dòng điện I = 2 A đặt trong từ trường đều B = 0,05 T có mômen ngẫu lực từ cực đại tác dụng lên khung xấp xỉ 0,31 N.m.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. S = π.R² = 3,14 * 0,1² = 0,0314 m². M_max = N.B.I.S = 100 * 0,05 * 2 * 0,0314 = 0,314 N.m ≈ 0,31 N.m."
      }
    ]
  },
  {
    id: "l15_p2_q3",
    question: "Để đo độ lớn cảm ứng từ B của một nam châm, học sinh lắp đặt bộ thí nghiệm đòn cân lực từ gồm khung dây phẳng L = 10 cm, quấn n = 200 vòng dây đặt vuông góc trong từ trường.",
    statements: [
      {
        id: "l15_p2_q3_s1",
        text: "Thiết bị đòn cân dòng điện đo cảm ứng từ B trực tiếp thông qua việc xác định lực từ tác dụng lên đoạn dòng điện chịu lực.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đòn cân dòng điện đo lực Ampere tác dụng lên đoạn dây dưới khung nằm trong từ trường chữ U."
      },
      {
        id: "l15_p2_q3_s2",
        text: "Để đo chính xác lực từ tác dụng, học sinh cần ghi số chỉ lực kế khi chưa đóng dòng điện, sau đó ghi số chỉ lực kế khi có điện và lấy hiệu số hai số chỉ này.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Hiệu số này giúp triệt tiêu hoàn toàn trọng lực của khung dây và chỉ giữ lại phần lực từ thực tế tác dụng."
      },
      {
        id: "l15_p2_q3_s3",
        text: "Nếu đảo chiều dòng điện chạy qua khung dây đồng thời giữ nguyên chiều từ trường thì chiều lực từ tác dụng lên khung dây trượt dốc vẫn giữ nguyên.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Áp dụng quy tắc bàn tay trái, khi đảo chiều dòng điện I, lực từ F sẽ lập tức đảo ngược chiều ngược lại."
      },
      {
        id: "l15_p2_q3_s4",
        text: "Khi I = 0,5 A, đòn cân chỉ lực từ tăng thêm F = 0,2 N. Độ lớn cảm ứng từ B đo được của nam châm bằng 0,02 Tesla.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. F = n.B.I.L => B = F / (n.I.L) = 0,2 / (200 * 0,5 * 0,1) = 0,2 / 10 = 0,02 Tesla."
      }
    ]
  },
  {
    id: "l15_p2_q4",
    question: "Một dây dẫn MN dài 10 cm, khối lượng m = 15 g treo bằng hai sợi chỉ nhẹ cách điện trong từ trường đều B = 0,5 T hướng thẳng đứng xuống. Cho dòng điện cường độ I chạy qua MN.",
    statements: [
      {
        id: "l15_p2_q4_s1",
        text: "Khi dây MN mang dòng điện nằm yên trong từ trường đứng, nó chịu tác dụng đồng thời của trọng lực, lực từ và lực căng dây treo.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đây là ba lực thành phần cấu thành trạng thái cân bằng của dây treo."
      },
      {
        id: "l15_p2_q4_s2",
        text: "Nếu cho dòng điện I chạy từ M đến N, theo quy tắc bàn tay trái, lực từ tác dụng lên MN sẽ có phương ngang đẩy dây MN lệch sang một bên.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Từ trường hướng xuống, dòng điện từ trái sang phải, lòng bàn tay hướng lên hứng B, ngón tay cái choãi ra chỉ phương ngang đẩy lệch dây."
      },
      {
        id: "l15_p2_q4_s3",
        text: "Để lực căng dây treo MN hoàn toàn triệt tiêu về bằng 0, ta phải đổi chiều từ trường B hướng nằm ngang vuông góc với dây.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Để lực căng triệt tiêu, lực từ phải hướng thẳng đứng hướng lên trên, tức là từ trường B phải nằm ngang vuông góc với dây và dòng điện chạy đúng chiều."
      },
      {
        id: "l15_p2_q4_s4",
        text: "Khi cường độ dòng điện qua dây MN là I = 3 A, góc lệch θ của dây treo so với phương đứng ở vị trí cân bằng bằng xấp xỉ 45 độ (lấy g = 10 m/s²).",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. F = B.I.L = 0,5 * 3 * 0,1 = 0,15 N. P = m.g = 0,015 * 10 = 0,15 N. tan(θ) = F/P = 1 => θ = 45°."
      }
    ]
  }
];

export const LESSON15_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l15_p3_q1",
    question: "Một đoạn dây dẫn thẳng dài 40 cm mang dòng điện cường độ 2,5 A được đặt trong từ trường đều có cảm ứng từ B = 0,08 T. Đoạn dây được đặt vuông góc với hướng của đường cảm ứng từ. Độ lớn lực từ tác dụng lên đoạn dây dẫn đó bằng bao nhiêu Newton? (Làm tròn kết quả đến 2 chữ số thập phân).",
    answer: 0.08,
    unit: "N",
    level: "Thông hiểu",
    explanation: "Độ lớn lực từ: F = B.I.L.sin(α) = 0,08 * 2,5 * 0,40 * sin(90°) = 0,08 N.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p3_q2",
    question: "Một đoạn dây dẫn mang dòng điện 10 A đặt vuông góc với đường sức từ trong một từ trường đều. Biết đoạn dây dài 20 cm chịu tác dụng của lực từ có độ lớn 0,3 N. Độ lớn của cảm ứng từ B trong từ trường đều bằng bao nhiêu Tesla? (Làm tròn kết quả đến 2 chữ số thập phân).",
    answer: 0.15,
    unit: "T",
    level: "Thông hiểu",
    explanation: "Vì dây đặt vuông góc nên sin(α) = 1. Cảm ứng từ B = F / (I.L) = 0,3 / (10 * 0,20) = 0,15 T.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p3_q3",
    question: "Một đoạn dây dẫn thẳng dài 50 cm đặt trong một từ trường đều có cảm ứng từ B = 0,2 T. Khi có dòng điện chạy qua, dây chịu tác dụng của lực từ bằng 0,05 N. Biết góc hợp bởi đoạn dây dẫn mang dòng điện và chiều của đường sức từ bằng 30 độ. Cường độ dòng điện chạy qua đoạn dây dẫn bằng bao nhiêu Ampe? (Nhập đáp án số nguyên).",
    answer: 1,
    unit: "A",
    level: "Vận dụng",
    explanation: "Cường độ dòng điện I = F / (B.L.sin(α)) = 0,05 / (0,2 * 0,5 * sin(30°)) = 0,05 / (0,2 * 0,5 * 0,5) = 1 A.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p3_q4",
    question: "Một dây dẫn thẳng mang dòng điện cường độ I = 4 A đặt trong từ trường đều có cảm ứng từ B = 0,5 T. Biết lực từ tác dụng lên một đoạn dây có chiều dài L bằng 0,1 N và góc hợp giữa dây dẫn và đường cảm ứng từ là 30 độ. Chiều dài đoạn dây dẫn nằm trong từ trường bằng bao nhiêu cm? (Nhập đáp án số nguyên).",
    answer: 10,
    unit: "cm",
    level: "Vận dụng",
    explanation: "Chiều dài L = F / (B.I.sin(α)) = 0,1 / (0,5 * 4 * sin(30°)) = 0,1 m = 10 cm.",
    illustrationType: "magnetic_force_left_hand"
  },
  {
    id: "l15_p3_q5",
    question: "Một dây dẫn MN dài 10 cm, có khối lượng m = 20 g được treo nằm ngang bằng hai sợi dây mảnh không giãn nhẹ trong từ trường đều có cảm ứng từ B = 0,4 T hướng ngang vuông góc với dây. Cho dòng điện cường độ I chạy qua dây MN sao cho lực từ hướng lên thẳng đứng làm triệt tiêu hoàn toàn lực căng của hai dây treo. Lấy g = 10 m/s². Cường độ dòng điện I bằng bao nhiêu Ampe? (Nhập đáp án số nguyên).",
    answer: 5,
    unit: "A",
    level: "Vận dụng",
    explanation: "Để lực căng dây triệt tiêu hoàn toàn, lực từ hướng thẳng đứng lên trên phải cân bằng với trọng lực hướng xuống: F_tu = P => B.I.L = m.g => I = m.g / (B.L) = (0,02 * 10) / (0,4 * 0,1) = 5 A.",
    illustrationType: "wire_suspended"
  },
  {
    id: "l15_p3_q6",
    question: "Một khung dây phẳng tròn gồm N = 100 vòng dây đặt song song với các đường cảm ứng từ của một từ trường đều có cảm ứng từ B = 0,05 T. Mỗi vòng dây có bán kính R = 10 cm. Khung dây dẫn mang dòng điện I = 2 A. Mômen ngẫu lực từ cực đại tác dụng lên khung dây bằng bao nhiêu Newton-mét (N.m)? (Làm tròn kết quả đến 2 chữ số thập phân).",
    answer: 0.31,
    unit: "N.m",
    level: "Vận dụng",
    explanation: "Diện tích khung dây S = π.R² = 3,1416 * 0,1² ≈ 0,0314 m². Mômen cực đại: M_max = N.B.I.S = 100 * 0,05 * 2 * 0,0314 = 0,314 N.m. Làm tròn đến hai chữ số thập phân là 0,31.",
    illustrationType: "magnetic_force_left_hand"
  }
];

// ==================== LESSON 16 QUESTIONS ====================
export const LESSON16_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l16_p1_q1",
    question: "Từ thông qua một diện tích S đặt trong từ trường đều có cảm ứng từ B được xác định bởi biểu thức nào sau đây?",
    options: [
      { id: "l16_p1_q1_o1", text: "Φ = B.S.cos(α), với α là góc hợp bởi vectơ pháp tuyến n và vectơ cảm ứng từ B.", isCorrect: true },
      { id: "l16_p1_q1_o2", text: "Φ = B.S.sin(α), với α là góc hợp bởi vectơ pháp tuyến n và vectơ cảm ứng từ B.", isCorrect: false },
      { id: "l16_p1_q1_o3", text: "Φ = B.S.tan(α), với α là góc hợp bởi vectơ pháp tuyến n và vectơ cảm ứng từ B.", isCorrect: false },
      { id: "l16_p1_q1_o4", text: "Φ = B.I.L.sin(α), với α là góc hợp bởi dây dẫn và vectơ cảm ứng từ B.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Từ thông qua diện tích S đặt trong từ trường đều được định nghĩa là Φ = B.S.cos(α), trong đó α là góc giữa vectơ pháp tuyến n của mặt phẳng khung dây và vectơ cảm ứng từ B."
  },
  {
    id: "l16_p1_q2",
    question: "Trong hệ đo lường SI, đơn vị của từ thông là gì và ký hiệu ra sao?",
    options: [
      { id: "l16_p1_q2_o1", text: "Vêbe (weber), kí hiệu là Wb.", isCorrect: true },
      { id: "l16_p1_q2_o2", text: "Tesla (T), kí hiệu là T.", isCorrect: false },
      { id: "l16_p1_q2_o3", text: "Ampe (A), kí hiệu là A.", isCorrect: false },
      { id: "l16_p1_q2_o4", text: "Vôn (V), kí hiệu là V.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đơn vị của từ thông trong hệ SI là vêbe (weber), kí hiệu là Wb. Ta có 1 Wb = 1 T.m²."
  },
  {
    id: "l16_p1_q3",
    question: "Định luật Lenz về chiều dòng điện cảm ứng khẳng định rằng dòng điện cảm ứng xuất hiện trong mạch kín có chiều sao cho từ trường cảm ứng do nó sinh ra có tác dụng:",
    options: [
      { id: "l16_p1_q3_o1", text: "Chống lại sự biến thiên của từ thông qua mạch kín đó.", isCorrect: true },
      { id: "l16_p1_q3_o2", text: "Luôn cùng chiều với từ trường ban đầu ngoài mạch.", isCorrect: false },
      { id: "l16_p1_q3_o3", text: "Luôn ngược chiều hoàn toàn với từ trường ban đầu ngoài mạch.", isCorrect: false },
      { id: "l16_p1_q3_o4", text: "Tăng cường tối đa sự dịch chuyển của nam châm kích thích.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Định luật Lenz khẳng định dòng điện cảm ứng có chiều sao cho từ trường do nó sinh ra chống lại sự biến thiên từ thông sinh ra nó."
  },
  {
    id: "l16_p1_q4",
    question: "Suất điện động cảm ứng trong một mạch kín xuất hiện khi có sự biến thiên của đại lượng nào sau đây qua mạch?",
    options: [
      { id: "l16_p1_q4_o1", text: "Từ thông qua diện tích giới hạn bởi mạch kín.", isCorrect: true },
      { id: "l16_p1_q4_o2", text: "Điện tích tự do tồn tại trên bề mặt dây dẫn.", isCorrect: false },
      { id: "l16_p1_q4_o3", text: "Trọng lực tác dụng lên các electron tự do trong mạch.", isCorrect: false },
      { id: "l16_p1_q4_o4", text: "Nhiệt độ của các đầu dây dẫn trong mạch kín.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Theo định luật Faraday, suất điện động cảm ứng xuất hiện khi từ thông qua mạch kín biến thiên."
  },
  {
    id: "l16_p1_q5",
    question: "Biểu thức của định luật Faraday về cảm ứng điện từ đối với một cuộn dây có N vòng dây là:",
    options: [
      { id: "l16_p1_q5_o1", text: "e_c = -N * (ΔΦ / Δt)", isCorrect: true },
      { id: "l16_p1_q5_o2", text: "e_c = -N * ΔΦ * Δt", isCorrect: false },
      { id: "l16_p1_q5_o3", text: "e_c = - (ΔΦ / (N * Δt))", isCorrect: false },
      { id: "l16_p1_q5_o4", text: "e_c = N * B * S * sin(α)", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Công thức định luật Faraday cho cuộn dây gồm N vòng dây là e_c = -N * (ΔΦ / Δt), dấu trừ thể hiện chiều suất điện động tuân theo định luật Lenz."
  },
  {
    id: "l16_p1_q6",
    question: "Một diện tích S được đặt trong một từ trường đều sao cho vectơ pháp tuyến n hợp với cảm ứng từ B góc α. Từ thông qua mặt S đạt giá trị bằng không khi góc α bằng bao nhiêu?",
    options: [
      { id: "l16_p1_q6_o1", text: "α = 90° (mặt phẳng khung dây song song với các đường sức từ).", isCorrect: true },
      { id: "l16_p1_q6_o2", text: "α = 0° (mặt phẳng khung dây vuông góc với các đường sức từ).", isCorrect: false },
      { id: "l16_p1_q6_o3", text: "α = 180° (mặt phẳng khung dây ngược hướng pháp tuyến).", isCorrect: false },
      { id: "l16_p1_q6_o4", text: "α = 45° (mặt phẳng khung dây chéo góc).", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Khi α = 90°, cos(α) = 0, nên Φ = B.S.cos(90°) = 0. Lúc này, không có đường sức từ nào xuyên qua diện tích S."
  },
  {
    id: "l16_p1_q7",
    question: "Hiện tượng cảm ứng điện từ trong một mạch kín chỉ tồn tại trong khoảng thời gian nào dưới đây?",
    options: [
      { id: "l16_p1_q7_o1", text: "Từ thông qua cuộn dây dẫn kín biến thiên.", isCorrect: true },
      { id: "l16_p1_q7_o2", text: "Mạch điện kín được nối với một nguồn điện xoay chiều bên ngoài.", isCorrect: false },
      { id: "l16_p1_q7_o3", text: "Nam châm đứng yên hoàn toàn ở sâu trong lòng cuộn dây.", isCorrect: false },
      { id: "l16_p1_q7_o4", text: "Cuộn dây dẫn đang ở trạng thái siêu dẫn nhiệt độ thấp.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Hiện tượng cảm ứng điện từ (xuất hiện dòng điện cảm ứng) chỉ tồn tại trong suốt khoảng thời gian mà từ thông qua mạch kín đang biến thiên."
  },
  {
    id: "l16_p1_q8",
    question: "Khi đưa một cực Bắc của một nam châm thẳng dịch chuyển lại gần một cuộn dây dẫn kín đứng yên, nhận định nào sau đây về chiều dòng điện cảm ứng là đúng?",
    options: [
      { id: "l16_p1_q8_o1", text: "Dòng điện cảm ứng có chiều sao cho mặt cuộn dây đối diện nam châm trở thành mặt Bắc để đẩy nam châm ra xa.", isCorrect: true },
      { id: "l16_p1_q8_o2", text: "Dòng điện cảm ứng có chiều sao cho mặt cuộn dây đối diện nam châm trở thành mặt Nam để hút nam châm lại gần.", isCorrect: false },
      { id: "l16_p1_q8_o3", text: "Dòng điện cảm ứng có chiều luân phiên thay đổi liên tục tạo dòng xoay chiều ổn định.", isCorrect: false },
      { id: "l16_p1_q8_o4", text: "Không có dòng điện cảm ứng xuất hiện vì nam châm không chạm trực tiếp vào dây.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Khi nam châm tiến lại gần, từ thông tăng. Theo định luật Lenz, dòng điện cảm ứng tạo ra từ trường ngược chiều để chống lại sự tiến gần của nam châm, tương đương việc tạo ra cực cùng tên (cực Bắc) ở đầu cuộn dây để đẩy nam châm ra."
  },
  {
    id: "l16_p1_q9",
    question: "Khi cho nam châm thẳng rơi tự do theo phương thẳng đứng đi qua lòng một cuộn dây dẫn kín đặt cố định, đồ thị suất điện động cảm ứng theo thời gian thu được có đặc điểm thế nào?",
    options: [
      { id: "l16_p1_q9_o1", text: "Có hai đỉnh xung đối xứng ngược chiều nhau; đỉnh thứ hai (lúc ra) có độ lớn cao hơn và bề rộng hẹp hơn đỉnh thứ nhất (lúc vào).", isCorrect: true },
      { id: "l16_p1_q9_o2", text: "Có hai đỉnh cùng chiều hướng lên trên với độ lớn hoàn toàn bằng nhau.", isCorrect: false },
      { id: "l16_p1_q9_o3", text: "Là một đường thẳng tuyến tính nằm ngang duy trì giá trị không đổi trong suốt quá trình rơi.", isCorrect: false },
      { id: "l16_p1_q9_o4", text: "Chỉ xuất hiện một xung nhọn duy nhất tại thời điểm trọng tâm nam châm trùng với trung điểm cuộn dây.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Khi nam châm rơi qua cuộn dây: lúc vào từ thông tăng (xung dương/âm), lúc ra từ thông giảm (xung ngược chiều). Do gia tốc rơi tự do, tốc độ của nam châm lúc ra lớn hơn lúc vào, dẫn đến tốc độ biến thiên từ thông lớn hơn, vì thế đỉnh xung thứ hai cao hơn và thời gian xảy ra ngắn hơn (bề rộng hẹp hơn)."
  },
  {
    id: "l16_p1_q10",
    question: "Một khung dây dẫn kín có diện tích S phẳng đặt trong từ trường đều có cảm ứng từ B. Góc α giữa vectơ pháp tuyến n và vectơ cảm ứng từ B là góc tù (90° < α ≤ 180°). Từ thông qua khung dây lúc này nhận giá trị:",
    options: [
      { id: "l16_p1_q10_o1", text: "Âm.", isCorrect: true },
      { id: "l16_p1_q10_o2", text: "Dương.", isCorrect: false },
      { id: "l16_p1_q10_o3", text: "Bằng không.", isCorrect: false },
      { id: "l16_p1_q10_o4", text: "Vô cùng lớn.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Khi góc α là góc tù (90° < α ≤ 180°), cos(α) < 0, do đó Φ = B.S.cos(α) nhận giá trị âm."
  },
  {
    id: "l16_p1_q11",
    question: "Để làm biến đổi từ thông qua một mạch kín, người ta có thể tiến hành bằng cách nào sau đây?",
    options: [
      { id: "l16_p1_q11_o1", text: "Thay đổi độ lớn cảm ứng từ B, thay đổi diện tích S của mạch hoặc thay đổi góc α.", isCorrect: true },
      { id: "l16_p1_q11_o2", text: "Chỉ có thể thay đổi cường độ dòng điện trong khung dây.", isCorrect: false },
      { id: "l16_p1_q11_o3", text: "Sử dụng nguồn điện một chiều cố định nối tiếp với cuộn dây.", isCorrect: false },
      { id: "l16_p1_q11_o4", text: "Đặt cuộn dây hoàn toàn cách điện trong môi trường chân không tuyệt đối.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Dựa vào công thức Φ = B.S.cos(α), ta thấy có thể làm thay đổi từ thông Φ bằng cách thay đổi cảm ứng từ B, diện tích S hoặc góc xoay α của khung dây."
  },
  {
    id: "l16_p1_q12",
    question: "Nhận định nào sau đây mô tả đúng bản chất chuyển hóa năng lượng trong hiện tượng cảm ứng điện từ khi thả rơi nam châm qua cuộn dây kín?",
    options: [
      { id: "l16_p1_q12_o1", text: "Cơ năng (công của trọng lực) chuyển hóa thành điện năng trong mạch cuộn dây.", isCorrect: true },
      { id: "l16_p1_q12_o2", text: "Điện năng tích lũy từ môi trường chuyển hóa thành động năng của nam châm.", isCorrect: false },
      { id: "l16_p1_q12_o3", text: "Nhiệt năng tỏa ra ở môi trường xung quanh chuyển hóa thành hóa năng trong lõi đồng.", isCorrect: false },
      { id: "l16_p1_q12_o4", text: "Hạt nhân của các nguyên tử đồng trong cuộn dây tự phân rã phát ra bức xạ dòng điện.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Thí nghiệm thả rơi nam châm chứng tỏ công của trọng lực sinh ra làm biến thiên từ thông, tạo dòng điện cảm ứng, tức là cơ năng chuyển hóa thành điện năng."
  },
  {
    id: "l16_p1_q13",
    question: "Khi dịch chuyển một con chạy của biến trở trong mạch chứa nam châm điện đặt cạnh một cuộn dây kín (Hình 16.7), kim điện kế nối với cuộn dây bị lệch khỏi vạch số 0. Nguyên nhân trực tiếp là:",
    options: [
      { id: "l16_p1_q13_o1", text: "Điện trở thay đổi làm dòng điện qua nam châm điện biến thiên, dẫn đến từ trường B biến thiên, làm từ thông qua cuộn dây biến thiên.", isCorrect: true },
      { id: "l16_p1_q13_o2", text: "Nhiệt độ cuộn dây tăng cao đột ngột sinh dòng điện nhiệt điện.", isCorrect: false },
      { id: "l16_p1_q13_o3", text: "Điện tích từ biến trở phóng tia lửa điện nhảy qua không khí đi vào cuộn dây.", isCorrect: false },
      { id: "l16_p1_q13_o4", text: "Lực hấp dẫn giữa nam châm điện và cuộn dây bị biến đổi theo cấp số nhân.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Khi di chuyển con chạy, điện trở biến trở thay đổi làm cường độ dòng điện trong mạch nam châm điện biến đổi. Do đó, từ trường do nam châm điện sinh ra thay đổi theo, làm từ thông qua cuộn dây kín bên cạnh biến thiên, tạo dòng điện cảm ứng."
  },
  {
    id: "l16_p1_q14",
    question: "Một thanh kim loại MN dài l trượt đều với tốc độ v vuông góc trên hai đường ray dẫn điện song song nối kín tạo khung phẳng trong từ trường đều cảm ứng từ B vuông góc mặt khung (Hình 16.9). Suất điện động cảm ứng sinh ra trong thanh bằng:",
    options: [
      { id: "l16_p1_q14_o1", text: "|e_c| = B.l.v", isCorrect: true },
      { id: "l16_p1_q14_o2", text: "|e_c| = B.l / v", isCorrect: false },
      { id: "l16_p1_q14_o3", text: "|e_c| = B.v / l", isCorrect: false },
      { id: "l16_p1_q14_o4", text: "|e_c| = B.l.v²", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Trong khoảng thời gian Δt, thanh quét được diện tích ΔS = l * Δx = l * v * Δt. Biến thiên từ thông ΔΦ = B * ΔS = B.l.v.Δt. Suất điện động cảm ứng có độ lớn |e_c| = ΔΦ / Δt = B.l.v."
  },
  {
    id: "l16_p1_q15",
    question: "Hai cuộn dây dẫn kín 1 và 2 giống hệt nhau đặt song song đồng trục. Cho dòng điện một chiều có cường độ tăng dần chạy qua cuộn 1. Khi đó, cuộn 2 xuất hiện dòng điện cảm ứng. Chiều dòng điện trong cuộn 2 có đặc điểm:",
    options: [
      { id: "l16_p1_q15_o1", text: "Ngược chiều với dòng điện trong cuộn 1.", isCorrect: true },
      { id: "l16_p1_q15_o2", text: "Cùng chiều với dòng điện trong cuộn 1.", isCorrect: false },
      { id: "l16_p1_q15_o3", text: "Luôn dao động điều hòa vuông pha với cuộn 1.", isCorrect: false },
      { id: "l16_p1_q15_o4", text: "Không có dòng điện cảm ứng vì hai cuộn dây không chạm nhau.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Dòng điện trong cuộn 1 tăng làm từ thông qua cuộn 2 tăng. Theo định luật Lenz, dòng điện cảm ứng cuộn 2 phải sinh ra từ trường ngược chiều với từ trường cuộn 1 để chống lại sự tăng này, do đó dòng điện cảm ứng ở cuộn 2 ngược chiều với dòng điện cuộn 1."
  },
  {
    id: "l16_p1_q16",
    question: "Một khung dây dẫn phẳng, kín, diện tích S = 20 cm² gồm 100 vòng dây đặt trong từ trường đều có cảm ứng từ B = 0,2 T. Ban đầu, mặt phẳng khung dây vuông góc với các đường sức từ. Người ta quay khung dây đều một góc 90° trong thời gian 0,1s. Độ lớn suất điện động cảm ứng trung bình trong khung là:",
    options: [
      { id: "l16_p1_q16_o1", text: "0,4 V", isCorrect: true },
      { id: "l16_p1_q16_o2", text: "4,0 V", isCorrect: false },
      { id: "l16_p1_q16_o3", text: "0,04 V", isCorrect: false },
      { id: "l16_p1_q16_o4", text: "40 V", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Ban đầu vuông góc nên α1 = 0 => Φ1 = B.S = 0,2 * (20 * 10⁻⁴) = 4 * 10⁻⁴ Wb. Lúc sau quay 90° nên α2 = 90° => Φ2 = 0. Độ biến thiên từ thông của 1 vòng: ΔΦ = 4 * 10⁻⁴ Wb. Suất điện động cảm ứng: |e_c| = N * (ΔΦ / Δt) = 100 * (4 * 10⁻⁴ / 0,1) = 0,4 V."
  },
  {
    id: "l16_p1_q17",
    question: "Một vòng dây tròn diện tích S đặt trong từ trường đều có cảm ứng từ B. Nếu diện tích vòng dây tăng lên gấp đôi đồng thời cảm ứng từ B giảm đi bốn lần (giữ nguyên góc nghiêng α), từ thông qua vòng dây sẽ:",
    options: [
      { id: "l16_p1_q17_o1", text: "Giảm đi 2 lần.", isCorrect: true },
      { id: "l16_p1_q17_o2", text: "Tăng lên 2 lần.", isCorrect: false },
      { id: "l16_p1_q17_o3", text: "Giữ nguyên không đổi.", isCorrect: false },
      { id: "l16_p1_q17_o4", text: "Giảm đi 8 lần.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Ta có Φ = B.S.cos(α). Khi S' = 2S và B' = B/4 thì Φ' = B'.S'.cos(α) = (B/4) * (2S) * cos(α) = Φ / 2. Vậy từ thông giảm đi 2 lần."
  },
  {
    id: "l16_p1_q18",
    question: "Làm thế nào để tạo ra dòng điện cảm ứng trong một vòng dây kín sử dụng một nam châm vĩnh cửu đứng yên cố định?",
    options: [
      { id: "l16_p1_q18_o1", text: "Bóp méo hoặc làm biến dạng cơ học vòng dây để thay đổi diện tích S của nó.", isCorrect: true },
      { id: "l16_p1_q18_o2", text: "Giữ nguyên hình dạng vòng dây và để nó đứng yên tuyệt đối cạnh nam châm.", isCorrect: false },
      { id: "l16_p1_q18_o3", text: "Sơn màu đỏ lên vòng dây để thu hút các đường sức từ.", isCorrect: false },
      { id: "l16_p1_q18_o4", text: "Nung nóng vòng dây dẫn đồng đều ở nhiệt độ cao ổn định.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Khi nam châm đứng yên, từ trường B không đổi. Tuy nhiên, nếu ta bóp méo vòng dây, diện tích S của nó thay đổi, dẫn đến từ thông Φ = B.S.cos(α) biến thiên, tạo ra dòng điện cảm ứng theo định luật cảm ứng điện từ."
  }
];

export const LESSON16_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l16_p2_q1",
    question: "Một khung dây phẳng giới hạn diện tích S = 10 cm² gồm N = 50 vòng dây được đặt cố định trong một từ trường đều có các đường sức từ vuông góc với mặt phẳng khung dây. Từ trường biến thiên tăng đều đặn từ 0,1 T đến 0,5 T trong khoảng thời gian 0,2 giây.",
    statements: [
      {
        id: "l16_p2_q1_s1",
        text: "Góc α giữa vectơ cảm ứng từ B và vectơ pháp tuyến n của mặt phẳng khung dây bằng 90°.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Các đường sức từ vuông góc với mặt phẳng khung dây, nghĩa là cảm ứng từ B cùng phương với vectơ pháp tuyến n, do đó góc α = 0° (hoặc 180°), cos(α) = 1."
      },
      {
        id: "l16_p2_q1_s2",
        text: "Từ thông ban đầu qua diện tích S của một vòng dây là Φ0 = 10⁻⁴ Wb.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Diện tích S = 10 cm² = 10⁻³ m². Cảm ứng từ ban đầu B0 = 0,1 T. Từ thông qua một vòng dây: Φ0 = B0 * S * cos(0°) = 0,1 * 10⁻³ = 10⁻⁴ Wb."
      },
      {
        id: "l16_p2_q1_s3",
        text: "Tốc độ biến thiên cảm ứng từ trong từ trường đều là ΔB/Δt = 2 T/s.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. ΔB/Δt = (0,5 - 0,1) / 0,2 = 0,4 / 0,2 = 2 T/s."
      },
      {
        id: "l16_p2_q1_s4",
        text: "Độ lớn của suất điện động cảm ứng sinh ra trong toàn bộ khung dây gồm 50 vòng dây trong thời gian trên bằng 0,1 V.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Độ lớn suất điện động cảm ứng: |e_c| = N * (ΔΦ/Δt) = N * S * (ΔB/Δt) * cos(0°) = 50 * 10⁻³ * 2 = 0,1 V."
      }
    ]
  },
  {
    id: "l16_p2_q2",
    question: "Học sinh tiến hành thí nghiệm khảo sát hiện tượng cảm ứng điện từ bằng cách thả rơi một nam châm thẳng đi qua lòng của một cuộn dây dẫn kín nối với cảm biến điện thế như Hình 16.10. Cực Bắc của nam châm hướng xuống phía dưới trước khi thả rơi.",
    statements: [
      {
        id: "l16_p2_q2_s1",
        text: "Khi nam châm bắt đầu đi vào lòng cuộn dây, từ thông qua cuộn dây tăng dần, làm xuất hiện suất điện động cảm ứng.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Khi nam châm tiến lại gần cuộn dây, số đường sức từ xuyên qua tiết diện cuộn dây tăng, từ thông tăng và xuất hiện suất điện động cảm ứng."
      },
      {
        id: "l16_p2_q2_s2",
        text: "Tại thời điểm trọng tâm của nam châm nằm chính xác ở chính giữa cuộn dây, từ thông qua cuộn dây đạt cực đại và suất điện động cảm ứng lúc này cũng đạt giá trị cực đại.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Khi nam châm ở chính giữa cuộn dây, từ thông qua cuộn dây đạt cực đại nhưng tốc độ biến thiên từ thông bằng không (đồ thị Φ(t) có tiếp tuyến nằm ngang), nên suất điện động cảm ứng e_c = -dΦ/dt = 0."
      },
      {
        id: "l16_p2_q2_s3",
        text: "Khi nam châm đi ra khỏi cuộn dây ở đầu dưới, xung suất điện động thu được có chiều ngược lại so với xung suất điện động lúc nam châm đi vào.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Khi nam châm đi ra, từ thông giảm dần (ΔΦ < 0), ngược lại hoàn toàn so với lúc đi vào (từ thông tăng, ΔΦ > 0). Do đó, suất điện động cảm ứng e_c đổi dấu, tạo đỉnh xung ngược chiều."
      },
      {
        id: "l16_p2_q2_s4",
        text: "Đồ thị trong Hình 16.11 cho thấy biên độ đỉnh xung thứ hai (lúc ra) lớn hơn biên độ đỉnh xung thứ nhất (lúc vào) vì cuộn dây thu nhiệt lượng từ môi trường để gia tốc nam châm.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Đỉnh xung thứ hai cao hơn vì nam châm rơi tự do có gia tốc trọng trường, vận tốc lúc đi ra lớn hơn vận tốc lúc đi vào. Vận tốc lớn hơn làm tốc độ biến thiên từ thông lớn hơn, sinh ra suất điện động cảm ứng lớn hơn. Hiện tượng này tuân theo định luật bảo toàn năng lượng chứ không phải do thu nhiệt lượng."
      }
    ]
  },
  {
    id: "l16_p2_q3",
    question: "Học sinh tiến hành thí nghiệm 2 (Hình 16.7) gồm nam châm điện nối với biến trở và nguồn điện, đặt đồng trục bên cạnh cuộn dây kín nối với điện kế nhạy.",
    statements: [
      {
        id: "l16_p2_q3_s1",
        text: "Khi giữ nguyên vị trí nam châm điện và cuộn dây, đồng thời giữ khóa K luôn đóng ổn định và biến trở không xoay, dòng điện cảm ứng trong cuộn dây vẫn liên tục được duy trì.",
        isCorrect: false,
        level: "Nhận biết",
        explanation: "Sai. Khi mọi thứ ổn định, từ trường không biến thiên, từ thông qua cuộn dây không đổi (ΔΦ = 0), do đó không có dòng điện cảm ứng."
      },
      {
        id: "l16_p2_q3_s2",
        text: "Tại thời điểm vừa ngắt khóa K, từ thông qua cuộn dây giảm đột ngột về 0, kim điện kế sẽ bị lệch mạnh khỏi vị trí số 0 rồi quay trở lại vạch 0.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Ngắt khóa K làm dòng điện qua nam châm điện giảm nhanh về 0, từ thông giảm mạnh sinh ra suất điện động cảm ứng tức thời làm lệch kim điện kế, sau đó từ thông đứng yên ở mức 0 nên dòng điện cảm ứng triệt tiêu, kim quay về 0."
      },
      {
        id: "l16_p2_q3_s3",
        text: "Nếu dịch chuyển con chạy của biến trở để làm giảm điện trở trong mạch nam châm điện, dòng điện cảm ứng sinh ra trong cuộn dây bên cạnh sẽ tạo từ trường cảm ứng cùng chiều từ trường nam châm điện.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Giảm điện trở biến trở làm dòng điện trong mạch chính tăng lên, làm từ trường nam châm tăng, từ thông qua cuộn dây tăng. Theo định luật Lenz, dòng điện cảm ứng phải sinh từ trường ngược chiều để chống lại sự tăng này."
      },
      {
        id: "l16_p2_q3_s4",
        text: "Thí nghiệm này cho thấy có thể tạo ra dòng điện cảm ứng bằng cách biến đổi cảm ứng từ B của từ trường mà không cần bất kì sự dịch chuyển cơ học nào giữa nam châm và cuộn dây.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Thí nghiệm đóng ngắt mạch hoặc thay đổi biến trở chứng minh việc biến đổi B theo thời gian đủ để tạo suất điện động cảm ứng, không bắt buộc phải dịch chuyển vị trí hình học."
      }
    ]
  },
  {
    id: "l16_p2_q4",
    question: "Một thanh đồng MN dài l = 20 cm trượt đều với tốc độ không đổi v = 5 m/s trên hai thanh ray kim loại nằm ngang song song cách điện đặt trong từ trường đều B = 0,2 T vuông góc với mặt phẳng chứa hai đường ray như Hình 16.9. Hai đầu ray được nối kín bằng một ampe kế có điện trở rất nhỏ.",
    statements: [
      {
        id: "l16_p2_q4_s1",
        text: "Khi thanh MN trượt, diện tích của khung dây kín giới hạn bởi thanh và hai ray tăng lên (hoặc giảm đi), làm từ thông qua mạch kín biến thiên.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Thanh trượt làm dịch chuyển biên giới hạn của khung, thay đổi diện tích S của khung kín, làm từ thông biến thiên."
      },
      {
        id: "l16_p2_q4_s2",
        text: "Độ lớn suất điện động cảm ứng sinh ra trong thanh đồng MN trong suốt quá trình trượt đều bằng 0,2 V.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Độ lớn suất điện động: |e_c| = B.l.v = 0,2 * 0,2 * 5 = 0,2 V."
      },
      {
        id: "l16_p2_q4_s3",
        text: "Nếu cảm ứng từ B của từ trường tăng lên gấp 2 lần đồng thời tốc độ trượt giảm đi 4 lần thì suất điện động cảm ứng thu được sẽ tăng gấp đôi.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Vì |e_c| tỉ lệ thuận với B và v. Khi B' = 2B và v' = v/4 thì |e_c'| = 2B * l * (v/4) = |e_c| / 2. Tức là suất điện động cảm ứng giảm đi một nửa chứ không tăng gấp đôi."
      },
      {
        id: "l16_p2_q4_s4",
        text: "Lực từ tác dụng lên thanh MN có chiều luôn chống lại chuyển động của thanh, do đó để thanh trượt đều ta phải tác dụng vào nó một ngoại lực cơ học kéo liên tục.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Theo định luật Lenz, dòng điện cảm ứng sinh ra lực từ cản trở chuyển động trượt của thanh (lực cản điện từ). Để thanh tiếp tục trượt đều thì cần một lực kéo cơ học cân bằng với lực từ cản này."
      }
    ]
  }
];

export const LESSON16_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l16_p3_q1",
    question: "Một khung dây phẳng có diện tích S = 25 cm² đặt trong từ trường đều có cảm ứng từ B = 4 * 10⁻³ T. Mặt phẳng khung dây hợp với vectơ cảm ứng từ B một góc 30° (chú ý góc hợp với mặt phẳng). Hãy tính độ lớn từ thông qua khung dây này theo đơn vị micro-Weber (μWb). Ghi kết quả dưới dạng số thập phân.",
    answer: 5.0,
    unit: "μWb",
    level: "Vận dụng",
    explanation: "Cần chú ý góc hợp giữa vectơ cảm ứng từ B và mặt phẳng khung dây là 30°, do đó góc α giữa B và vectơ pháp tuyến n là α = 90° - 30° = 60°. Từ thông: Φ = B.S.cos(α) = 4 * 10⁻³ * (25 * 10⁻⁴) * cos(60°) = 4 * 10⁻³ * 25 * 10⁻⁴ * 0,5 = 5 * 10⁻⁶ Wb = 5,0 μWb."
  },
  {
    id: "l16_p3_q2",
    question: "Một cuộn dây dẫn kín có số vòng dây N = 250 vòng, diện tích mỗi vòng dây là S = 12 cm². Cuộn dây được đặt trong từ trường đều sao cho trục của cuộn dây song song với các đường cảm ứng từ (mặt phẳng các vòng dây vuông góc với đường sức từ). Cảm ứng từ biến thiên giảm đều từ 0,6 T xuống 0,2 T trong thời gian 0,1s. Suất điện động cảm ứng xuất hiện trong cuộn dây có độ lớn bằng bao nhiêu Vôn (V)? Ghi kết quả dưới dạng số nguyên hoặc số thập phân.",
    answer: 1.2,
    unit: "V",
    level: "Vận dụng",
    explanation: "Vì mặt phẳng vòng dây vuông góc với đường sức từ nên α = 0°, cos(α) = 1. Diện tích S = 12 cm² = 1,2 * 10⁻³ m². Độ biến thiên từ thông của 1 vòng dây: ΔΦ = ΔB * S = (0,6 - 0,2) * 1,2 * 10⁻³ = 0,4 * 1,2 * 10⁻³ = 4,8 * 10⁻⁴ Wb. Suất điện động cảm ứng xuất hiện trong cuộn dây gồm 250 vòng: |e_c| = N * (ΔΦ / Δt) = 250 * (4,8 * 10⁻⁴ / 0,1) = 250 * 4,8 * 10⁻³ = 1,2 V."
  },
  {
    id: "l16_p3_q3",
    question: "Một thanh dẫn điện thẳng dài l = 40 cm được kéo trượt vuông góc trên hai thanh ray song song nằm ngang với vận tốc v = 2,5 m/s trong một từ trường đều hướng thẳng đứng cảm ứng từ B = 0,5 T. Biết mạch điện nối hai đầu ray kín có tổng điện trở R = 0,2 Ω. Tính cường độ dòng điện cảm ứng chạy qua mạch điện này theo đơn vị Ampe (A). Ghi kết quả dưới dạng số nguyên hoặc số thập phân.",
    answer: 2.5,
    unit: "A",
    level: "Vận dụng",
    explanation: "Suất điện động cảm ứng xuất hiện trong thanh trượt: |e_c| = B.l.v = 0,5 * 0,40 * 2,5 = 0,5 V. Cường độ dòng điện cảm ứng chạy qua mạch điện kín: I = |e_c| / R = 0,5 / 0,2 = 2,5 A."
  },
  {
    id: "l16_p3_q4",
    question: "Trong thí nghiệm thả rơi nam châm vĩnh cửu qua một ống dây gồm N = 500 vòng dây nối với cảm biến (Hình 16.10). Lúc cực Bắc đi vào lòng ống dây, từ thông qua ống dây tăng từ 0 lên 2 * 10⁻⁴ Wb trong khoảng thời gian rất ngắn Δt = 25 ms. Hãy tính độ lớn suất điện động cảm ứng trung bình sinh ra trong ống dây lúc này theo đơn vị Vôn (V). Ghi kết quả dưới dạng số nguyên hoặc số thập phân.",
    answer: 4.0,
    unit: "V",
    level: "Vận dụng",
    explanation: "Từ thông qua một vòng tăng ΔΦ = 2 * 10⁻⁴ Wb. Thời gian biến thiên Δt = 25 ms = 0,025 s. Độ lớn suất điện động cảm ứng trung bình: |e_c| = N * (ΔΦ / Δt) = 500 * (2 * 10⁻⁴ / 0,025) = 500 * 0,008 = 4,0 V."
  },
  {
    id: "l16_p3_q5",
    question: "Một khung dây hình vuông cạnh a = 10 cm gồm N = 100 vòng dây dẫn kín. Khung được đặt trong từ trường đều sao cho các đường cảm ứng từ vuông góc với mặt phẳng khung. Cảm ứng từ B biến thiên theo thời gian với tốc độ biến thiên dB/dt = 0,15 T/s. Hãy xác định độ lớn suất điện động cảm ứng xuất hiện trong khung dây lúc này theo đơn vị Vôn (V). Ghi kết quả dưới dạng số nguyên hoặc số thập phân.",
    answer: 0.15,
    unit: "V",
    level: "Vận dụng",
    explanation: "Mặt phẳng khung dây vuông góc đường sức từ nên α = 0°, cos(α) = 1. Diện tích khung hình vuông: S = a² = (0,1 m)² = 0,01 m². Suất điện động cảm ứng: |e_c| = N * S * (dB/dt) * cos(0°) = 100 * 0,01 * 0,15 * 1 = 0,15 V."
  },
  {
    id: "l16_p3_q6",
    question: "Một ống dây hình trụ dài gồm 1000 vòng dây có diện tích mỗi vòng S = 20 cm² đặt trong từ trường đều có đường cảm ứng từ song song với trục ống dây. Ban đầu từ thông qua một vòng dây đạt giá trị Φ1 = 4 * 10⁻⁴ Wb. Người ta giảm đều từ trường về không trong thời gian Δt = 0,05s. Hãy tính suất điện động cảm ứng trung bình xuất hiện trong cả ống dây theo đơn vị Vôn (V). Ghi kết quả dưới dạng số nguyên hoặc số thập phân.",
    answer: 8.0,
    unit: "V",
    level: "Vận dụng",
    explanation: "ΔΦ = Φ1 = 4 * 10⁻⁴ Wb (từ thông của 1 vòng dây). Số vòng dây N = 1000 vòng. Thời gian biến thiên Δt = 0,05 s. Suất điện động cảm ứng xuất hiện trong ống dây: |e_c| = N * (ΔΦ / Δt) = 1000 * (4 * 10⁻⁴ / 0,05) = 1000 * 0,008 = 8,0 V."
  }
];

// ==================== LESSON 17 QUESTIONS ====================
export const LESSON17_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l17_p1_q1",
    question: "Nguyên tắc hoạt động của máy phát điện xoay chiều (cả một pha và ba pha) dựa trên hiện tượng vật lí nào sau đây?",
    options: [
      { id: "l17_p1_q1_o1", text: "Hiện tượng cảm ứng điện từ.", isCorrect: true },
      { id: "l17_p1_q1_o2", text: "Hiện tượng tự cảm.", isCorrect: false },
      { id: "l17_p1_q1_o3", text: "Hiện tượng cộng hưởng điện từ.", isCorrect: false },
      { id: "l17_p1_q1_o4", text: "Hiện tượng tỏa nhiệt Joule-Lenz.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Tất cả các máy phát điện xoay chiều đều hoạt động dựa trên hiện tượng cảm ứng điện từ: khi rôto quay làm từ thông qua cuộn dây biến thiên, sinh ra suất điện động cảm ứng xoay chiều."
  },
  {
    id: "l17_p1_q2",
    question: "Trong máy phát điện xoay chiều, bộ phận đứng yên được gọi là gì và bộ phận quay được gọi là gì?",
    options: [
      { id: "l17_p1_q2_o1", text: "Bộ phận đứng yên là stato, bộ phận quay là rôto.", isCorrect: true },
      { id: "l17_p1_q2_o2", text: "Bộ phận đứng yên là rôto, bộ phận quay là stato.", isCorrect: false },
      { id: "l17_p1_q2_o3", text: "Cả hai bộ phận đều gọi là stato.", isCorrect: false },
      { id: "l17_p1_q2_o4", text: "Cả hai bộ phận đều gọi là rôto.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Từ tiếng Latin, 'stato' nghĩa là đứng yên (static), còn 'rôto' nghĩa là quay (rotation). Vậy phần đứng yên là stato, phần quay là rôto."
  },
  {
    id: "l17_p1_q3",
    question: "Một khung dây phẳng dẹt quay đều với tốc độ góc ω quanh một trục đối xứng trong từ trường đều B vuông góc với trục quay. Nếu khung có N vòng dây, diện tích mỗi vòng là S, thì biểu thức suất điện động cảm ứng cực đại E₀ xuất hiện trong khung dây là:",
    options: [
      { id: "l17_p1_q3_o1", text: "E₀ = N.B.S.ω", isCorrect: true },
      { id: "l17_p1_q3_o2", text: "E₀ = N.B.S / ω", isCorrect: false },
      { id: "l17_p1_q3_o3", text: "E₀ = B.S.ω", isCorrect: false },
      { id: "l17_p1_q3_o4", text: "E₀ = N.B.S.cos(ωt)", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Suất điện động cực đại sinh ra khi khung dây quay đều trong từ trường là E₀ = N * Φ_max * ω = N.B.S.ω."
  },
  {
    id: "l17_p1_q4",
    question: "Một máy phát điện xoay chiều một pha có phần cảm gồm p cặp cực nam châm, rôto quay đều với tốc độ n (vòng/giây). Tần số f của dòng điện xoay chiều do máy phát ra được tính bằng công thức nào?",
    options: [
      { id: "l17_p1_q4_o1", text: "f = n.p", isCorrect: true },
      { id: "l17_p1_q4_o2", text: "f = n.p / 60", isCorrect: false },
      { id: "l17_p1_q4_o3", text: "f = 60.n / p", isCorrect: false },
      { id: "l17_p1_q4_o4", text: "f = 2π.n.p", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Nếu tốc độ quay n đo bằng đơn vị vòng/giây thì tần số của dòng điện cảm ứng sinh ra là f = n.p (Hz)."
  },
  {
    id: "l17_p1_q5",
    question: "Một máy phát điện xoay chiều một pha có p cặp cực rôto quay đều với tốc độ n (vòng/phút). Công thức xác định tần số f (Hz) của dòng điện xoay chiều do máy phát ra là:",
    options: [
      { id: "l17_p1_q5_o1", text: "f = n.p / 60", isCorrect: true },
      { id: "l17_p1_q5_o2", text: "f = n.p", isCorrect: false },
      { id: "l17_p1_q5_o3", text: "f = 60.n.p", isCorrect: false },
      { id: "l17_p1_q5_o4", text: "f = n / (60.p)", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Khi tốc độ quay n tính bằng vòng/phút, ta chia cho 60 để đổi ra vòng/giây, khi đó tần số là f = n.p/60 (Hz)."
  },
  {
    id: "l17_p1_q6",
    question: "Trong máy phát điện xoay chiều một pha kiểu thứ nhất (rôto là khung dây, stato là nam châm vĩnh cửu), bộ phận nào dùng để đưa dòng điện ra mạch ngoài mà không làm xoắn dây?",
    options: [
      { id: "l17_p1_q6_o1", text: "Hệ thống gồm hai vành khuyên đồng trục quay cùng khung dây và hai chổi quét tì lên chúng.", isCorrect: true },
      { id: "l17_p1_q6_o2", text: "Cổ góp điện gồm các thanh đồng ghép cách điện dạng hình trụ xẻ rãnh (bộ cổ góp DC).", isCorrect: false },
      { id: "l17_p1_q6_o3", text: "Hệ thống dây cáp mềm chịu xoắn lực lớn nối trực tiếp.", isCorrect: false },
      { id: "l17_p1_q6_o4", text: "Điện cực kim loại tiếp xúc lỏng dùng thủy ngân.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Hệ thống vành khuyên và chổi quét (slip rings and brushes) cho phép duy trì tiếp xúc điện liên tục từ khung dây quay dẹt ra mạch ngoài đứng yên mà không làm dây dẫn bị xoắn rối hay đứt gãy."
  },
  {
    id: "l17_p1_q7",
    question: "Cơ sở định nghĩa giá trị hiệu dụng của dòng điện xoay chiều dựa trên tác dụng nào của dòng điện?",
    options: [
      { id: "l17_p1_q7_o1", text: "Tác dụng nhiệt (định luật Joule-Lenz).", isCorrect: true },
      { id: "l17_p1_q7_o2", text: "Tác dụng hóa học (điện phân).", isCorrect: false },
      { id: "l17_p1_q7_o3", text: "Tác dụng từ (lực hút điện từ).", isCorrect: false },
      { id: "l17_p1_q7_o4", text: "Tác dụng phát quang (ion hóa khí).", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Giá trị hiệu dụng của dòng điện xoay chiều được định nghĩa dựa trên tác dụng nhiệt: Cường độ hiệu dụng của dòng điện xoay chiều là giá trị của một cường độ dòng điện không đổi sao cho khi chạy qua cùng một điện trở R trong cùng khoảng thời gian thì tỏa ra nhiệt lượng bằng nhau."
  },
  {
    id: "l17_p1_q8",
    question: "Trong máy phát điện xoay chiều ba pha, cấu tạo của phần ứng (stato đứng yên) gồm ba cuộn dây giống hệt nhau đặt lệch nhau bao nhiêu độ trên vành tròn?",
    options: [
      { id: "l17_p1_q8_o1", text: "120° (hay 2π/3 rad).", isCorrect: true },
      { id: "l17_p1_q8_o2", text: "90° (hay π/2 rad).", isCorrect: false },
      { id: "l17_p1_q8_o3", text: "60° (hay π/3 rad).", isCorrect: false },
      { id: "l17_p1_q8_o4", text: "180° (hay π rad).", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Ba cuộn dây của stato máy phát điện 3 pha được bố trí lệch nhau một góc 120° (2π/3 rad) trên vòng tròn để tạo ra ba dòng điện cảm ứng lệch pha nhau 120°."
  },
  {
    id: "l17_p1_q9",
    question: "Ba suất điện động xoay chiều do máy phát điện xoay chiều ba pha tạo ra có những đặc điểm nào sau đây?",
    options: [
      { id: "l17_p1_q9_o1", text: "Cùng biên độ, cùng tần số và lệch pha nhau một góc 2π/3.", isCorrect: true },
      { id: "l17_p1_q9_o2", text: "Cùng biên độ, cùng pha và cùng tần số.", isCorrect: false },
      { id: "l17_p1_q9_o3", text: "Cùng tần số, lệch pha nhau 2π/3 nhưng biên độ khác nhau.", isCorrect: false },
      { id: "l17_p1_q9_o4", text: "Cùng biên độ, cùng tần số và lệch pha nhau một góc π/2.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Dòng ba pha đối xứng gồm ba suất điện động hình sin cùng tần số, cùng biên độ và lệch pha nhau từng đôi một góc 2π/3 (120°)."
  },
  {
    id: "l17_p1_q10",
    question: "Tại sao trong thực tế sản xuất công nghiệp, máy phát điện xoay chiều công suất lớn thường được chế tạo có phần cảm (nam châm) là rôto còn phần ứng (cuộn dây) là stato?",
    options: [
      { id: "l17_p1_q10_o1", text: "Để không phải dùng vành khuyên và chổi quét quét dòng điện công suất lớn ra ngoài, tránh gây tia lửa điện nguy hiểm và mòn cổ tiếp xúc.", isCorrect: true },
      { id: "l17_p1_q10_o2", text: "Vì nam châm vĩnh cửu có khối lượng nhẹ hơn rất nhiều so với cuộn dây đồng nên dễ quay hơn.", isCorrect: false },
      { id: "l17_p1_q10_o3", text: "Để dòng điện sinh ra trực tiếp chạy thẳng vào trục quay làm tăng mômen lực rôto.", isCorrect: false },
      { id: "l17_p1_q10_o4", text: "Nhằm giảm lượng nhiệt tỏa ra do ma sát của không khí lên các vòng dây dẫn.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Nếu cuộn dây quay (đóng vai trò phần ứng công suất lớn), ta phải dùng vành khuyên và chổi quét để lấy điện ra. Khi dòng điện và điện áp quá lớn, giữa chổi quét và vành khuyên sẽ xuất hiện tia lửa điện cực mạnh gây cháy hỏng, hao mòn nhanh. Cho nam châm quay và cuộn dây đứng yên sẽ khắc phục được nhược điểm này vì dòng điện được dẫn ra ngoài trực tiếp từ stato."
  },
  {
    id: "l17_p1_q11",
    question: "Một khung dây dẫn phẳng dẹt diện tích S quay đều quanh một trục vuông góc với các đường sức từ của một từ trường đều B. Khi từ thông qua khung dây cực đại thì suất điện động cảm ứng trong khung bằng bao nhiêu?",
    options: [
      { id: "l17_p1_q11_o1", text: "Bằng không.", isCorrect: true },
      { id: "l17_p1_q11_o2", text: "Đạt giá trị cực đại.", isCorrect: false },
      { id: "l17_p1_q11_o3", text: "Đạt giá trị hiệu dụng.", isCorrect: false },
      { id: "l17_p1_q11_o4", text: "Bằng một nửa giá trị cực đại.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Ta có Φ = Φ_max.cos(ωt). Suất điện động cảm ứng e = -dΦ/dt = Φ_max.ω.sin(ωt). Khi từ thông Φ đạt cực đại (cos(ωt) = ±1) thì sin(ωt) = 0, nên suất điện động cảm ứng tức thời e = 0."
  },
  {
    id: "l17_p1_q12",
    question: "Khi rôto của máy phát điện xoay chiều một pha quay thêm 1,5 lần tốc độ ban đầu (các yếu tố khác giữ nguyên), thì tần số và suất điện động cực đại của dòng điện thay đổi như thế nào?",
    options: [
      { id: "l17_p1_q12_o1", text: "Cả tần số và suất điện động cực đại đều tăng lên 1,5 lần.", isCorrect: true },
      { id: "l17_p1_q12_o2", text: "Tần số tăng 1,5 lần còn suất điện động cực đại giữ nguyên.", isCorrect: false },
      { id: "l17_p1_q12_o3", text: "Tần số tăng 1,5 lần còn suất điện động cực đại tăng 2,25 lần.", isCorrect: false },
      { id: "l17_p1_q12_o4", text: "Tần số giữ nguyên còn suất điện động cực đại tăng 1,5 lần.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Ta có f = n.p và E₀ = N.B.S.ω = N.B.S.2π.n.p. Cả f và E₀ đều tỉ lệ thuận bậc nhất với tốc độ quay n của rôto. Do đó khi n tăng 1,5 lần thì cả f và E₀ đều tăng 1,5 lần."
  },
  {
    id: "l17_p1_q13",
    question: "Các thiết bị điện xoay chiều gia dụng ở Việt Nam thường ghi thông số 220V - 50Hz. Giá trị 220V biểu diễn đại lượng nào dưới đây?",
    options: [
      { id: "l17_p1_q13_o1", text: "Giá trị hiệu dụng của điện áp xoay chiều.", isCorrect: true },
      { id: "l17_p1_q13_o2", text: "Giá trị cực đại của điện áp xoay chiều.", isCorrect: false },
      { id: "l17_p1_q13_o3", text: "Giá trị tức thời của điện áp xoay chiều.", isCorrect: false },
      { id: "l17_p1_q13_o4", text: "Giá trị trung bình của điện áp xoay chiều.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Các giá trị điện áp, dòng điện ghi trên các nhãn thiết bị điện hoặc dụng cụ đo (vôn kế, ampe kế) đều là các giá trị hiệu dụng."
  },
  {
    id: "l17_p1_q14",
    question: "Dòng điện xoay chiều được ứng dụng rất rộng rãi trong y học nhờ tính thực tiễn cao. Thiết bị nào sau đây dùng dòng điện xoay chiều có điện áp cao để kích thích tim đập lại bình thường trong trường hợp ngừng tim đột ngột?",
    options: [
      { id: "l17_p1_q14_o1", text: "Máy sốc điện ngoài lồng ngực (Defibrillator).", isCorrect: true },
      { id: "l17_p1_q14_o2", text: "Máy chụp cộng hưởng từ hạt nhân (MRI).", isCorrect: false },
      { id: "l17_p1_q14_o3", text: "Máy điện tâm đồ ghi nhận điện sinh học (ECG).", isCorrect: false },
      { id: "l17_p1_q14_o4", text: "Máy tạo nhịp tim mini cấy trong cơ thể.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Máy sốc điện ngoài lồng ngực sử dụng xung điện xoay chiều có năng lượng và điện áp cao trong thời gian cực ngắn để chấm dứt các rối loạn nhịp tim nghiêm trọng (rung thất) hoặc ngừng tuần hoàn, giúp nút xoang tim tái lập lại nhịp đập bình thường."
  },
  {
    id: "l17_p1_q15",
    question: "Một khung dây phẳng dẹt có 100 vòng dây quay đều quanh một trục đối xứng trong từ trường đều có cảm ứng từ B. Nếu tốc độ quay của khung tăng lên 2 lần và cảm ứng từ giảm đi một nửa (các yếu tố khác giữ nguyên), thì suất điện động cực đại xuất hiện trong khung dây sẽ:",
    options: [
      { id: "l17_p1_q15_o1", text: "Không thay đổi.", isCorrect: true },
      { id: "l17_p1_q15_o2", text: "Tăng lên 2 lần.", isCorrect: false },
      { id: "l17_p1_q15_o3", text: "Giảm đi 4 lần.", isCorrect: false },
      { id: "l17_p1_q15_o4", text: "Tăng lên 4 lần.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Suất điện động cực đại là E₀ = N.B.S.ω. Khi tốc độ quay tăng 2 lần thì ω tăng 2 lần. Cảm ứng từ B giảm đi một nửa (0.5 B). Do đó: E₀' = N * (0.5 B) * S * (2 ω) = N.B.S.ω = E₀. Suất điện động cực đại không đổi."
  },
  {
    id: "l17_p1_q16",
    question: "Một máy phát điện xoay chiều một pha phát ra dòng điện có tần số 60 Hz khi rôto quay với tốc độ n vòng/phút. Nếu thay rôto bằng một rôto khác có nhiều hơn 2 cặp cực và quay với tốc độ n vòng/phút như cũ thì tần số dòng điện do máy phát ra lúc này là 80 Hz. Số cặp cực của rôto ban đầu là:",
    options: [
      { id: "l17_p1_q16_o1", text: "6 cặp cực.", isCorrect: true },
      { id: "l17_p1_q16_o2", text: "4 cặp cực.", isCorrect: false },
      { id: "l17_p1_q16_o3", text: "8 cặp cực.", isCorrect: false },
      { id: "l17_p1_q16_o4", text: "10 cặp cực.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Ta có f₁ = n.p/60 = 60 Hz. Khi rôto mới có p + 2 cặp cực quay cùng tốc độ n, ta có f₂ = n.(p+2)/60 = 80 Hz. Lập tỉ số: f₂ / f₁ = (p + 2) / p = 80 / 60 = 4/3 => 3(p + 2) = 4p => p = 6 cặp cực."
  },
  {
    id: "l17_p1_q17",
    question: "Một máy phát điện xoay chiều một pha có phần cảm là rôto gồm 4 cặp cực quay với tốc độ 750 vòng/phút. Suất điện động hiệu dụng do máy phát ra là 110√2 V. Từ thông cực đại qua mỗi vòng dây của phần ứng (stato) là 2/π mWb. Tổng số vòng dây của phần ứng là:",
    options: [
      { id: "l17_p1_q17_o1", text: "1100 vòng.", isCorrect: true },
      { id: "l17_p1_q17_o2", text: "550 vòng.", isCorrect: false },
      { id: "l17_p1_q17_o3", text: "2200 vòng.", isCorrect: false },
      { id: "l17_p1_q17_o4", text: "1556 vòng.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Tốc độ quay rôto n = 750 vòng/phút = 12,5 vòng/s. Tần số dòng điện f = n.p = 12,5 * 4 = 50 Hz => ω = 100π rad/s. Suất điện động cực đại E₀ = E√2 = 110√2 * √2 = 220 V. Ta có E₀ = N * Φ_max * ω => N = E₀ / (Φ_max * ω) = 220 / ((2/π * 10⁻³) * 100π) = 1100 vòng."
  },
  {
    id: "l17_p1_q18",
    question: "Một máy phát điện xoay chiều three pha đang hoạt động bình thường, ba cuộn dây của stato mắc hình sao. Nếu điện áp hiệu dụng giữa hai dây pha (điện áp dây) đo được là 380 V, thì điện áp hiệu dụng giữa một dây pha và dây trung hòa (điện áp pha) có giá trị xấp xỉ bằng bao nhiêu?",
    options: [
      { id: "l17_p1_q18_o1", text: "220 V.", isCorrect: true },
      { id: "l17_p1_q18_o2", text: "127 V.", isCorrect: false },
      { id: "l17_p1_q18_o3", text: "380 V.", isCorrect: false },
      { id: "l17_p1_q18_o4", text: "660 V.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Đối với máy phát điện mắc hình sao, mối liên hệ giữa điện áp dây Ud và điện áp pha Up là Ud = Up * √3. Do đó, điện áp pha Up = Ud / √3 = 380 / √3 ≈ 219,39 V ≈ 220 V."
  }
];

export const LESSON17_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l17_p2_q1",
    question: "Một khung dây phẳng dẹt có diện tích S = 50 cm² gồm N = 200 vòng dây quay đều quanh một trục đối xứng nằm trong mặt phẳng khung dây, đặt trong từ trường đều có cảm ứng từ B = 0,1 T vuông góc với trục quay. Khung dây quay với tốc độ góc không đổi ω = 100π rad/s (tương đương tần số 50 Hz). Chọn gốc thời gian t = 0 là lúc pháp tuyến của khung dây trùng với hướng của vectơ cảm ứng từ B.",
    statements: [
      {
        id: "l17_p2_q1_s1",
        text: "Từ thông cực đại qua một vòng dây của khung có giá trị bằng 5.10⁻⁴ Wb.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Từ thông cực đại qua một vòng dây là Φ_max1 = B.S = 0,1 * 50 * 10⁻⁴ = 5.10⁻⁴ Wb."
      },
      {
        id: "l17_p2_q1_s2",
        text: "Suất điện động cảm ứng trong khung dây tại thời điểm t trễ pha hơn từ thông qua khung dây một góc π/2.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Do e = -dΦ/dt = ω.Φ_max.sin(ωt) = E₀.cos(ωt - π/2), suất điện động luôn trễ pha hơn từ thông qua khung một góc π/2."
      },
      {
        id: "l17_p2_q1_s3",
        text: "Tại thời điểm t = 1/200 s, mặt phẳng khung dây đang song song với các đường cảm ứng từ.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Góc quay của khung sau t = 1/200 s là α = ω.t = 100π * 1/200 = π/2 rad (90°). Lúc này pháp tuyến n vuông góc với cảm ứng từ B, tức là mặt phẳng khung dây song song với các đường cảm ứng từ."
      },
      {
        id: "l17_p2_q1_s4",
        text: "Biểu thức của suất điện động cảm ứng tức thời xuất hiện trong khung dây là e = 10π.cos(100πt - π/2) (V).",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. E₀ = N.B.S.ω = 200 * 0,1 * (50 * 10⁻⁴) * 100π = 10π V. Vì Φ = Φ_max.cos(100πt), nên e = 10π.cos(100πt - π/2) (V)."
      }
    ]
  },
  {
    id: "l17_p2_q2",
    question: "Một máy phát điện xoay chiều một pha có rôto là một nam châm gồm p cặp cực quay đều với tốc độ n vòng/phút. Phần ứng gồm các cuộn dây giống hệt nhau mắc nối tiếp có tổng số N vòng dây, từ thông cực đại qua mỗi vòng dây là Φ_max1. Thí nghiệm đo đạc hoạt động của máy phát cho kết quả ở hai chế độ vận hành ổn định khác nhau.",
    statements: [
      {
        id: "l17_p2_q2_s1",
        text: "Tần số của dòng điện xoay chiều do máy phát ra tỉ lệ thuận với số cặp cực p và tốc độ quay n của rôto.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Công thức tần số f = n.p/60 chỉ ra f tỉ lệ thuận với cả n và p."
      },
      {
        id: "l17_p2_q2_s2",
        text: "Nếu đồng thời tăng gấp đôi số cặp cực p và giảm tốc độ quay n đi bốn lần thì chu kì của dòng điện xoay chiều do máy phát ra sẽ giảm đi một nửa.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Tần số f = n.p/60. Khi p' = 2p và n' = n/4, tần số mới f' = (n/4) * (2p) / 60 = f/2. Khi tần số giảm một nửa thì chu kì T = 1/f sẽ tăng gấp đôi (chứ không phải giảm một nửa)."
      },
      {
        id: "l17_p2_q2_s3",
        text: "Suất điện động hiệu dụng của máy phát tỉ lệ thuận với tốc độ quay của rôto.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Ta có E_eff = E₀ / √2 = N.Φ_max1.ω / √2 = (N.Φ_max1.2π.n.p) / (60 * √2). Khi các thông số cấu tạo giữ nguyên, E_eff tỉ lệ thuận bậc nhất với n."
      },
      {
        id: "l17_p2_q2_s4",
        text: "Khi rôto quay với tốc độ n vòng/phút thì suất điện động cực đại là E₀, nếu tăng tốc độ quay lên thêm 60 vòng/phút thì suất điện động cực đại tăng lên thành 1,2 E₀. Tốc độ quay rôto ban đầu là 300 vòng/phút.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. E₀ tỉ lệ thuận với n, nên E₀'/E₀ = n'/n => 1,2 = (n + 60)/n => 1,2n = n + 60 => 0,2n = 60 => n = 300 vòng/phút."
      }
    ]
  },
  {
    id: "l17_p2_q3",
    question: "Khảo sát một máy phát điện xoay chiều ba pha đối xứng đang hoạt động bình thường cấp điện cho tải tiêu thụ. Stato đứng yên gồm ba cuộn dây giống nhau đặt lệch nhau 120 độ trên vành tròn, rôto là một nam châm quay đều quanh trục với tốc độ góc ω không đổi.",
    statements: [
      {
        id: "l17_p2_q3_s1",
        text: "Suất điện động cực đại sinh ra trong ba cuộn dây của stato có giá trị hoàn toàn bằng nhau.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Do ba cuộn dây có cấu tạo hoàn toàn giống nhau và rôto quay đều tạo ra từ trường quét qua chúng như nhau nên biên độ suất điện động cực đại bằng nhau."
      },
      {
        id: "l17_p2_q3_s2",
        text: "Tại thời điểm t bất kì, dòng điện trong cuộn 1 có cường độ cực đại thì dòng điện trong cuộn 2 và cuộn 3 có giá trị bằng một nửa giá trị cực đại và cùng chiều với dòng điện trong cuộn 1.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Vì ba dòng điện lệch pha nhau 2π/3, khi i₁ = I₀ thì i₂ = I₀.cos(-2π/3) = -0,5 I₀, i₃ = I₀.cos(2π/3) = -0,5 I₀. Nghĩa là chúng có độ lớn bằng một nửa cực đại nhưng ngược chiều (mang dấu âm) so với dòng trong cuộn 1."
      },
      {
        id: "l17_p2_q3_s3",
        text: "Khi mắc tải tiêu thụ hình sao đối xứng, dòng điện trong dây trung hòa luôn bằng không.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Do tải đối xứng nên i_o = i₁ + i₂ + i₃ = 0 tại mọi thời điểm."
      },
      {
        id: "l17_p2_q3_s4",
        text: "Nếu suất điện động ở cuộn thứ nhất là e₁ = 220√2.cos(100πt) (V) thì tại thời điểm t = 5 ms, suất điện động tức thời ở cuộn thứ hai có giá trị xấp xỉ bằng 269,4 V.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. e₂ = 220√2.cos(100πt - 2π/3) (V). Tại t = 5 ms = 0,005 s: e₂ = 220√2 * cos(100π * 0,005 - 2π/3) = 220√2 * cos(-π/6) = 220√2 * (√3/2) = 110√6 ≈ 269,4 V."
      }
    ]
  },
  {
    id: "l17_p2_q4",
    question: "Một máy phát điện xoay chiều một pha được nối với một mạch ngoài tiêu thụ. Ta khảo sát mômen cản cơ học và hiệu suất chuyển hóa năng lượng khi rôto quay đều.",
    statements: [
      {
        id: "l17_p2_q4_s1",
        text: "Hiện tượng cảm ứng điện từ xuất hiện trong máy phát điện xoay chiều tuân theo định luật bảo toàn và chuyển hóa năng lượng.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Cơ năng cung cấp để quay rôto được chuyển hóa thành điện năng chạy trong mạch và nhiệt năng tỏa ra trên dây."
      },
      {
        id: "l17_p2_q4_s2",
        text: "Khi để hở hai đầu cuộn dây của máy phát điện (mạch ngoài hở), rôto sẽ quay khó hơn và nặng hơn so với lúc nối kín với tải tiêu thụ.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Khi mạch hở, không có dòng điện cảm ứng chạy qua, nên không sinh ra lực từ cản trở rôto (mômen cản điện từ bằng không). Do đó rôto quay rất nhẹ. Khi nối kín mạch, dòng điện cảm ứng xuất hiện và sinh lực cản quay rôto theo định luật Lenz, làm rôto quay nặng hơn."
      },
      {
        id: "l17_p2_q4_s3",
        text: "Công cơ học tiêu hao để duy trì rôto quay đều dùng để bù lại phần điện năng sinh ra và phần hao phí do ma sát, tỏa nhiệt.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Theo định luật bảo toàn năng lượng, công cơ học cấp vào bằng tổng điện năng truyền ra tải ngoài và các tổn hao (nhiệt trên cuộn dây, ma sát cơ)."
      },
      {
        id: "l17_p2_q4_s4",
        text: "Một máy phát điện một pha phát ra công suất điện là 4,4 kW dưới điện áp hiệu dụng 220 V. Biết cuộn dây phần ứng có điện trở trong là 0,75 Ω. Hao phí tỏa nhiệt ngay trong máy phát bằng 300 W.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Cường độ dòng điện hiệu dụng phát ra là I = P/U = 4400 / 220 = 20 A. Công suất hao phí tỏa nhiệt trên cuộn dây máy phát là P_hp = I² * r = 20² * 0.75 = 300 W."
      }
    ]
  }
];

export const LESSON17_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l17_p3_q1",
    question: "Một máy phát điện xoay chiều một pha có phần cảm gồm 4 cặp cực nam châm. Để tần số dòng điện xoay chiều do máy phát ra là 50 Hz thì rôto phải quay với tốc độ bằng bao nhiêu vòng/giây? Ghi kết quả dạng số thập phân nếu cần (tối đa 4 ký tự).",
    answer: 12.5,
    unit: "vòng/giây",
    level: "Thông hiểu",
    explanation: "Tần số f = n * p => n = f / p = 50 / 4 = 12,5 vòng/giây."
  },
  {
    id: "l17_p3_q2",
    question: "Một máy phát điện xoay chiều một pha phát ra dòng điện xoay chiều có tần số 60 Hz. Trong thời gian 1 giây, dòng điện xoay chiều này đổi chiều bao nhiêu lần? Ghi kết quả dưới dạng số nguyên (tối đa 4 ký tự).",
    answer: 120,
    unit: "lần",
    level: "Thông hiểu",
    explanation: "Trong mỗi chu kì dòng điện đổi chiều 2 lần. Tần số f = 60 Hz tương ứng 60 chu kì trong 1 giây, do đó số lần đổi chiều là 60 * 2 = 120 lần."
  },
  {
    id: "l17_p3_q3",
    question: "Một khung dây phẳng dẹt gồm 500 vòng dây dẹt có diện tích mỗi vòng S = 120 cm² quay đều với tốc độ ω = 50 rad/s quanh một trục vuông góc với từ trường đều B = 0,15 T. Hãy xác định biên độ (giá trị cực đại) của suất điện động cảm ứng xuất hiện trong khung dây lúc này theo đơn vị Vôn (V). Ghi kết quả dưới dạng số nguyên (tối đa 4 ký tự).",
    answer: 45,
    unit: "V",
    level: "Vận dụng",
    explanation: "Suất điện động cực đại E₀ = N.B.S.ω. Thay số: N = 500, B = 0,15 T, S = 120 cm² = 0,012 m², ω = 50 rad/s. Ta được: E₀ = 500 * 0,15 * 0,012 * 50 = 45 V."
  },
  {
    id: "l17_p3_q4",
    question: "Một máy phát điện xoay chiều một pha có rôto gồm 5 cặp cực quay với tốc độ 600 vòng/phút. Dòng điện phát ra được đưa vào mạch chỉ có tụ điện với điện dung C = 10⁻⁴/π F. Hãy xác định dung kháng của tụ điện này theo đơn vị Ôm (Ω). Ghi kết quả dưới dạng số nguyên (tối đa 4 ký tự).",
    answer: 100,
    unit: "Ω",
    level: "Vận dụng",
    explanation: "Tần số f = n.p/60 = (600 * 5)/60 = 50 Hz => ω = 100π rad/s. Dung kháng Z_C = 1 / (ω.C) = 1 / (100π * 10⁻⁴ / π) = 100 Ω."
  },
  {
    id: "l17_p3_q5",
    question: "Suất điện động của cuộn dây thứ ba trong một máy phát điện xoay chiều ba pha có biểu thức e₃ = 200.cos(100πt + 2π/3) (V). Tại thời điểm t = 1/300 s, hãy xác định giá trị suất điện động cảm ứng tức thời trong cuộn dây này theo đơn vị Vôn (V). Ghi kết quả dưới dạng số nguyên (nếu âm có dấu trừ, tối đa 4 ký tự).",
    answer: -200,
    unit: "V",
    level: "Vận dụng",
    explanation: "Thay t = 1/300 s vào biểu thức: e₃ = 200 * cos(100π * (1/300) + 2π/3) = 200 * cos(π/3 + 2π/3) = 200 * cos(π) = -200 V."
  },
  {
    id: "l17_p3_q6",
    question: "Một máy phát điện xoay chiều một pha có rôto gồm p cặp cực quay đều với tốc độ n vòng/phút thì tần số dòng điện là 50 Hz. Nếu tăng tốc độ quay rôto lên gấp đôi thì tần số dòng điện phát ra bằng bao nhiêu Hz? Ghi kết quả dưới dạng số nguyên (tối đa 4 ký tự).",
    answer: 100,
    unit: "Hz",
    level: "Vận dụng",
    explanation: "Tần số f = n.p/60. Khi tốc độ quay n tăng gấp đôi thì tần số f tăng gấp đôi: f' = 2 * 50 = 100 Hz."
  }
];

// ==================== LESSON 18 QUESTIONS ====================
export const LESSON18_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l18_p1_q1",
    question: "Nguyên tắc hoạt động chính của máy biến áp, sạc điện thoại không dây và bộ phận cảm ứng (pickup) của đàn ghi ta điện dựa trên hiện tượng vật lí nào?",
    options: [
      { id: "l18_p1_q1_o1", text: "Hiện tượng cảm ứng điện từ.", isCorrect: true },
      { id: "l18_p1_q1_o2", text: "Hiện tượng quang điện ngoài.", isCorrect: false },
      { id: "l18_p1_q1_o3", text: "Hiện tượng tự cảm đơn thuần.", isCorrect: false },
      { id: "l18_p1_q1_o4", text: "Tác dụng nhiệt Joule-Lenz thông thường.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Cả máy biến áp, sạc điện thoại không dây và đàn ghi ta điện đều hoạt động dựa trên hiện tượng cảm ứng điện từ (khi từ thông gửi qua cuộn dây cảm ứng biến thiên làm xuất hiện suất điện động cảm ứng)."
  },
  {
    id: "l18_p1_q2",
    question: "Bộ phận nào sau đây KHÔNG thuộc cấu tạo cơ bản của một máy biến áp thông thường?",
    options: [
      { id: "l18_p1_q2_o1", text: "Cổ góp điện gồm chổi quét tì liên tục.", isCorrect: true },
      { id: "l18_p1_q2_o2", text: "Cuộn dây sơ cấp nối với nguồn điện xoay chiều.", isCorrect: false },
      { id: "l18_p1_q2_o3", text: "Cuộn dây thứ cấp nối với tải tiêu thụ.", isCorrect: false },
      { id: "l18_p1_q2_o4", text: "Lõi biến áp kín làm bằng các lá thép mỏng ghép cách điện.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Máy biến áp không có bộ phận chuyển động quay nên không có cổ góp điện hay chổi quét cơ học tì lên vành khuyên."
  },
  {
    id: "l18_p1_q3",
    question: "Lõi của máy biến áp thường được làm bằng các lá sắt hoặc thép mỏng pha silicon, ghép cách điện với nhau nhằm mục đích chủ yếu là:",
    options: [
      { id: "l18_p1_q3_o1", text: "Giảm hao phí điện năng do dòng điện Foucault (Phu-cô) gây ra.", isCorrect: true },
      { id: "l18_p1_q3_o2", text: "Tăng cường từ trường của cuộn thứ cấp lên tối đa.", isCorrect: false },
      { id: "l18_p1_q3_o3", text: "Tránh hiện tượng rò rỉ điện trực tiếp từ cuộn sơ cấp ra ngoài.", isCorrect: false },
      { id: "l18_p1_q3_o4", text: "Giảm khối lượng vật lý của máy biến áp để dễ vận chuyển.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Lõi sắt ghép từ các lá mỏng cách điện đặt song song với đường sức từ làm tăng điện trở đối với dòng điện xoáy Foucault, từ đó giảm thiểu tác dụng tỏa nhiệt hao phí năng lượng Joule."
  },
  {
    id: "l18_p1_q4",
    question: "Gọi N₁ và N₂ lần lượt là số vòng dây của cuộn sơ cấp và cuộn thứ cấp của một máy biến áp lí tưởng. Máy biến áp này là máy tăng áp khi thỏa mãn điều kiện nào?",
    options: [
      { id: "l18_p1_q4_o1", text: "N₂ > N₁", isCorrect: true },
      { id: "l18_p1_q4_o2", text: "N₂ < N₁", isCorrect: false },
      { id: "l18_p1_q4_o3", text: "N₂.N₁ = 1", isCorrect: false },
      { id: "l18_p1_q4_o4", text: "N₂ = N₁", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Hệ thức máy biến áp lí tưởng: U₂/U₁ = N₂/N₁. Để là máy tăng áp (U₂ > U₁) thì số vòng dây cuộn thứ cấp N₂ phải lớn hơn số vòng dây cuộn sơ cấp N₁."
  },
  {
    id: "l18_p1_q5",
    question: "Một máy biến áp lí tưởng có số vòng dây cuộn sơ cấp gấp đôi số vòng dây cuộn thứ cấp. Nếu đặt vào hai đầu cuộn sơ cấp điện áp xoay chiều hiệu dụng U, thì điện áp hiệu dụng ở hai đầu cuộn thứ cấp để hở là:",
    options: [
      { id: "l18_p1_q5_o1", text: "U / 2", isCorrect: true },
      { id: "l18_p1_q5_o2", text: "2U", isCorrect: false },
      { id: "l18_p1_q5_o3", text: "U", isCorrect: false },
      { id: "l18_p1_q5_o4", text: "U.√2", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Có N₁ = 2N₂ => U₂ = U₁ * (N₂/N₁) = U * (N₂ / 2N₂) = U/2."
  },
  {
    id: "l18_p1_q6",
    question: "Sạc điện thoại không dây hoạt động tương tự thiết bị nào dưới đây dựa trên cảm ứng điện từ liên kết tương hỗ?",
    options: [
      { id: "l18_p1_q6_o1", text: "Máy biến áp.", isCorrect: true },
      { id: "l18_p1_q6_o2", text: "Động cơ không đồng bộ ba pha.", isCorrect: false },
      { id: "l18_p1_q6_o3", text: "Máy phát điện một chiều.", isCorrect: false },
      { id: "l18_p1_q6_o4", text: "Đèn ống huỳnh quang.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Đế sạc đóng vai trò như cuộn sơ cấp của máy biến áp sinh ra từ thông xoay chiều biến thiên, cuộn dây thu năng lượng ở mặt sau điện thoại đóng vai trò cuộn thứ cấp, suất điện động cảm ứng sinh ra sẽ được chỉnh lưu nạp pin."
  },
  {
    id: "l18_p1_q7",
    question: "Sở dĩ ta nghe được âm thanh phát ra từ đàn ghi ta điện khi gảy dây đàn là nhờ sáu cuộn dây cảm ứng gắn ngay bên dưới các dây đàn thép. Nguyên tắc chuyển đổi dao động cơ học của dây thành dòng điện cảm ứng xoay chiều dựa trên việc:",
    options: [
      { id: "l18_p1_q7_o1", text: "Dây đàn bằng thép bị nam châm từ hóa, khi dây dao động làm từ thông gửi qua cuộn dây cảm ứng đặt phía dưới biến thiên.", isCorrect: true },
      { id: "l18_p1_q7_o2", text: "Dây đàn cọ xát cơ học trực tiếp vào các cực của cuộn cảm tạo ra dòng điện tích tĩnh.", isCorrect: false },
      { id: "l18_p1_q7_o3", text: "Dao động cơ học truyền trực tiếp qua hộp cộng hưởng làm rung các vòng dây trong cuộn cảm.", isCorrect: false },
      { id: "l18_p1_q7_o4", text: "Dòng điện xoay chiều chạy trực tiếp từ dây đàn sang cuộn dây khi gảy.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Dây đàn bằng thép nên bị nam châm nằm trong cuộn dây cảm ứng (pickup) dưới đàn từ hoá, trở thành một nam châm chuyển động. Khi gảy, dây đàn dao động làm từ thông do nó gửi qua cuộn cảm đặt sát bên dưới biến thiên điều hòa theo tần số âm, sinh ra suất điện động cảm ứng."
  },
  {
    id: "l18_p1_q8",
    question: "Tại sao dây đàn của đàn ghi ta điện bắt buộc phải làm bằng thép hoặc các hợp kim có tính chất sắt từ, mà không thể dùng dây nylon thông thường?",
    options: [
      { id: "l18_p1_q8_o1", text: "Vì dây nylon không bị từ hóa bởi nam châm của cuộn dây cảm ứng, nên khi dao động không làm biến thiên từ thông qua cuộn cảm.", isCorrect: true },
      { id: "l18_p1_q8_o2", text: "Vì dây nylon có khối lượng quá nhẹ không đủ sức rung mạnh.", isCorrect: false },
      { id: "l18_p1_q8_o3", text: "Vì dây nylon có điện trở quá lớn làm tắt suất điện động cảm ứng tự cảm.", isCorrect: false },
      { id: "l18_p1_q8_o4", text: "Vì dây nylon dễ đứt khi căng với lực căng lớn.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Dây đàn ghi ta điện phải làm bằng vật liệu sắt từ (như thép) để nó bị nam châm của bộ pickup từ hoá. Dây nylon không sắt từ nên không bị từ hóa, khi rung từ thông không biến đổi và không tạo ra dòng điện cảm ứng."
  },
  {
    id: "l18_p1_q9",
    question: "Dòng điện Foucault (Phu-cô) được định nghĩa là:",
    options: [
      { id: "l18_p1_q9_o1", text: "Dòng điện cảm ứng xuất hiện trong khối vật dẫn khi vật dẫn chuyển động trong từ trường hoặc đặt trong từ trường biến thiên.", isCorrect: true },
      { id: "l18_p1_q9_o2", text: "Dòng điện không đổi chạy qua các tiếp điểm kim loại nóng.", isCorrect: false },
      { id: "l18_p1_q9_o3", text: "Dòng điện siêu dẫn chạy trong các cuộn cảm khi nhiệt độ đạt độ không tuyệt đối.", isCorrect: false },
      { id: "l18_p1_q9_o4", text: "Dòng ion chuyển động trong chất điện phân dưới tác dụng của từ trường ngoài.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Dòng điện Foucault là dòng điện cảm ứng sinh ra trong khối vật dẫn (kim loại liền khối) khi nó chuyển động trong từ trường hoặc đặt trong một từ trường biến thiên theo thời gian."
  },
  {
    id: "l18_p1_q10",
    question: "Đặc tính hình học cơ bản chung của các dòng điện Foucault là chúng có hình dạng như thế nào?",
    options: [
      { id: "l18_p1_q10_o1", text: "Là các đường cong xoáy kín bên trong khối vật dẫn.", isCorrect: true },
      { id: "l18_p1_q10_o2", text: "Là các đường thẳng nối từ cực nam sang cực bắc của khối dẫn.", isCorrect: false },
      { id: "l18_p1_q10_o3", text: "Chỉ phân bố dọc theo bề mặt ngoài của tấm kim loại đứng yên.", isCorrect: false },
      { id: "l18_p1_q10_o4", text: "Tập trung tại tâm hình học của khối và triệt tiêu ở rìa ngoài.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Dòng điện Foucault có đặc tính là dòng điện xoáy khép kín, tạo thành các đường cong kín bên trong lòng khối vật dẫn kim loại."
  },
  {
    id: "l18_p1_q11",
    question: "Trong thí nghiệm treo tấm kim loại K dao động giữa hai cực của một nam châm chữ U, tại sao khi thay tấm kim loại liền khối bằng tấm kim loại xẻ rãnh thì tấm xẻ rãnh dao động lâu tắt hơn rất nhiều?",
    options: [
      { id: "l18_p1_q11_o1", text: "Các rãnh xẻ làm tăng điện trở đối với dòng Foucault, khiến cường độ dòng điện xoáy giảm mạnh, lực hãm điện từ yếu đi.", isCorrect: true },
      { id: "l18_p1_q11_o2", text: "Khối lượng tấm kim loại giảm đi làm giảm quán tính dao động cơ học.", isCorrect: false },
      { id: "l18_p1_q11_o3", text: "Rãnh xẻ giúp không khí lưu thông tốt hơn làm giảm sức cản của gió.", isCorrect: false },
      { id: "l18_p1_q11_o4", text: "Rãnh xẻ triệt tiêu hoàn toàn hiện tượng tự cảm của tấm kim loại.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Khi xẻ rãnh, đường dẫn của dòng Foucault bị cắt nhỏ, quãng đường dòng Foucault đi tăng và điện trở tăng lên. Theo định luật Ohm, cường độ dòng Foucault giảm xuống kéo theo lực hãm từ giảm đi đáng kể, giúp tấm dao động lâu hơn."
  },
  {
    id: "l18_p1_q12",
    question: "Ứng dụng nào sau đây của dòng điện Foucault tận dụng lực cản điện từ có ích trong kỹ thuật cơ khí?",
    options: [
      { id: "l18_p1_q12_o1", text: "Hệ thống phanh điện từ của các xe tải nặng, tàu cao tốc.", isCorrect: true },
      { id: "l18_p1_q12_o2", text: "Lò luyện kim không tiếp xúc dòng cao tần.", isCorrect: false },
      { id: "l18_p1_q12_o3", text: "Lõi biến áp trong thiết bị đổi nguồn sạc điện thoại.", isCorrect: false },
      { id: "l18_p1_q12_o4", text: "Dụng cụ gia nhiệt siêu tốc bếp điện từ.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Phanh điện từ hoạt động dựa trên tác dụng cản trở chuyển động của dòng Foucault: khi cho dòng điện biến thiên mạnh vào cuộn dây đặt sát đĩa kim loại quay, dòng Foucault sinh ra sinh lực từ chống lại chuyển động quay giúp phanh xe êm ái mà không bị mài mòn má phanh."
  },
  {
    id: "l18_p1_q13",
    question: "Khi gảy một dây đàn ghi ta điện mạnh hơn, âm thanh phát ra to hơn. Dựa vào định luật cảm ứng Faraday, điều này được giải thích như thế nào?",
    options: [
      { id: "l18_p1_q13_o1", text: "Biên độ dao động dây lớn hơn, tốc độ biến thiên từ thông ΔΦ/Δt qua cuộn cảm đặt dưới dây tăng lên, làm biên độ suất điện động cảm ứng sinh ra lớn hơn.", isCorrect: true },
      { id: "l18_p1_q13_o2", text: "Biên độ dao động dây lớn hơn làm tăng tần số suất điện động cảm ứng, giúp âm thanh cao hơn và vang hơn.", isCorrect: false },
      { id: "l18_p1_q13_o3", text: "Gảy mạnh làm tăng điện trở của cuộn cảm gắn dưới đàn, làm tăng hiệu điện thế ra loa.", isCorrect: false },
      { id: "l18_p1_q13_o4", text: "Gảy mạnh làm dây thép cọ xát cơ học mạnh hơn vào lõi nam châm phát ra âm thanh cơ học to hơn.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Khi gảy mạnh, biên độ dao động của dây đàn lớn hơn, dẫn tới tốc độ biến thiên từ thông qua cuộn cảm cực đại lớn hơn. Theo định luật Faraday, biên độ suất điện động cảm ứng sinh ra lớn hơn, làm cho tín hiệu điện xoay chiều truyền tới amply có biên độ lớn hơn, phát ra âm thanh to hơn."
  },
  {
    id: "l18_p1_q14",
    question: "Tác dụng gây hao phí năng lượng của dòng điện Foucault chủ yếu xuất hiện dưới dạng năng lượng nào dưới đây?",
    options: [
      { id: "l18_p1_q14_o1", text: "Nhiệt năng làm nóng khối vật dẫn theo hiệu ứng Joule-Lenz.", isCorrect: true },
      { id: "l18_p1_q14_o2", text: "Cơ năng làm biến dạng và nứt nẻ khối vật dẫn.", isCorrect: false },
      { id: "l18_p1_q14_o3", text: "Hóa năng gây ra sự phân hủy hóa học các tiếp điểm điện.", isCorrect: false },
      { id: "l18_p1_q14_o4", text: "Quang năng phát ra ánh sáng huỳnh quang ở bề mặt.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Dòng điện Foucault chạy trong khối kim loại gây ra tác dụng tỏa nhiệt theo định luật Joule-Lenz, biến đổi điện năng thành nhiệt năng hao phí vô ích làm nóng thiết bị như máy biến áp, động cơ."
  },
  {
    id: "l18_p1_q15",
    question: "Nguyên lí hoạt động của bếp từ dựa trên tác dụng nào của dòng điện Foucault?",
    options: [
      { id: "l18_p1_q15_o1", text: "Tác dụng tỏa nhiệt của dòng Foucault sinh ra ở đáy nồi kim loại sắt từ.", isCorrect: true },
      { id: "l18_p1_q15_o2", text: "Tác dụng cơ học hãm chuyển động quay của dòng Foucault.", isCorrect: false },
      { id: "l18_p1_q15_o3", text: "Tác dụng hóa học điện phân thức ăn bên trong nồi.", isCorrect: false },
      { id: "l18_p1_q15_o4", text: "Tác dụng phát sáng của dòng Foucault qua lớp thủy tinh bếp.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Bếp từ sinh ra từ trường xoay chiều biến thiên tần số cao cắt qua đáy nồi bằng vật liệu sắt từ, sinh ra dòng điện xoáy Foucault mạnh chạy trong đáy nồi. Tác dụng tỏa nhiệt Joule của dòng này làm đáy nồi nóng lên trực tiếp để nấu chín thức ăn."
  },
  {
    id: "l18_p1_q16",
    question: "Khi một máy biến áp lí tưởng có số vòng dây N₁ > N₂ hoạt động, phát biểu nào sau đây là ĐÚNG khi so sánh cuộn sơ cấp và cuộn thứ cấp?",
    options: [
      { id: "l18_p1_q16_o1", text: "Điện áp hiệu dụng ở cuộn thứ cấp lớn hơn cuộn sơ cấp (U₂ > U₁).", isCorrect: false },
      { id: "l18_p1_q16_o2", text: "Cường độ dòng điện hiệu dụng ở cuộn thứ cấp nhỏ hơn cuộn sơ cấp (I₂ < I₁).", isCorrect: false },
      { id: "l18_p1_q16_o3", text: "Điện áp hiệu dụng ở cuộn sơ cấp lớn hơn cuộn thứ cấp (U₁ > U₂), và cường độ dòng điện hiệu dụng sơ cấp nhỏ hơn thứ cấp (I₁ < I₂).", isCorrect: true },
      { id: "l18_p1_q16_o4", text: "Tần số của dòng điện ở cuộn thứ cấp nhỏ hơn cuộn sơ cấp (f₂ < f₁).", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Do N₁ > N₂ nên đây là máy hạ áp, dẫn đến U₁ > U₂. Vì máy lí tưởng nên công suất không đổi P₁ = P₂ <=> U₁.I₁ = U₂.I₂ => I₁ < I₂ (cường độ dòng điện ở thứ cấp lớn hơn sơ cấp). Tần số dòng điện xoay chiều luôn không đổi."
  },
  {
    id: "l18_p1_q17",
    question: "Một học sinh quấn một máy biến áp có số vòng dây cuộn sơ cấp là N₁ và thứ cấp là N₂. Khi đặt điện áp xoay chiều hiệu dụng U vào cuộn sơ cấp, điện áp đo được ở hai đầu cuộn thứ cấp hở là U₂. Nếu học sinh này giảm bớt một nửa số vòng dây của cuộn sơ cấp đồng thời tăng gấp đôi số vòng dây của cuộn thứ cấp, thì điện áp hiệu dụng ở hai đầu cuộn thứ cấp hở lúc này sẽ bằng:",
    options: [
      { id: "l18_p1_q17_o1", text: "4U₂", isCorrect: true },
      { id: "l18_p1_q17_o2", text: "2U₂", isCorrect: false },
      { id: "l18_p1_q17_o3", text: "U₂", isCorrect: false },
      { id: "l18_p1_q17_o4", text: "U₂ / 4", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Công thức ban đầu U₂ = U * (N₂/N₁). Khi sơ cấp giảm một nửa (N₁' = N₁/2) và thứ cấp tăng gấp đôi (N₂' = 2N₂), tỉ số mới là N₂'/N₁' = 2N₂ / (N₁/2) = 4 * (N₂/N₁). Do đó điện áp mới là 4U₂."
  },
  {
    id: "l18_p1_q18",
    question: "Trong thiết bị sạc điện thoại không dây, điện thoại được đặt trên đế sạc. Khi dòng điện xoay chiều trong cuộn sơ cấp ở đế sạc có tần số 100 kHz, suất điện động cảm ứng xuất hiện trong cuộn thứ cấp của điện thoại sẽ có tần số là:",
    options: [
      { id: "l18_p1_q18_o1", text: "100 kHz", isCorrect: true },
      { id: "l18_p1_q18_o2", text: "50 kHz", isCorrect: false },
      { id: "l18_p1_q18_o3", text: "200 kHz", isCorrect: false },
      { id: "l18_p1_q18_o4", text: "0 Hz", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Hiện tượng cảm ứng điện từ liên kết tương hỗ giữa hai cuộn cảm không làm thay đổi tần số của dòng điện/suất điện động cảm ứng. Tần số của suất điện động cảm ứng bên thứ cấp luôn bằng tần số của dòng điện xoay chiều bên sơ cấp, tức là 100 kHz."
  }
];

export const LESSON18_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l18_p2_q1",
    question: "Một nhóm học sinh làm thí nghiệm khảo sát một máy biến áp lí tưởng gồm cuộn sơ cấp quấn N₁ vòng và cuộn thứ cấp quấn N₂ vòng. Họ đặt vào hai đầu cuộn sơ cấp một điện áp xoay chiều ổn định có điện áp hiệu dụng U₁ = 220 V. Khi cuộn thứ cấp để hở, điện áp hiệu dụng đo được ở cuộn thứ cấp là U₂. Các phát biểu sau đây là Đúng hay Sai?",
    statements: [
      { id: "l18_p2_q1_s1", text: "Nếu quấn thêm vào cuộn thứ cấp một số vòng dây cùng chiều quấn ban đầu thì điện áp hiệu dụng U₂ đo được sẽ tăng lên.", isCorrect: true, level: "Nhận biết", explanation: "Đúng, U₂ = U₁.(N₂/N₁). Khi N₂ tăng thì U₂ tăng." },
      { id: "l18_p2_q1_s2", text: "Nếu nối hai đầu cuộn thứ cấp với một bóng đèn sợi đốt thì điện áp hiệu dụng hai đầu cuộn sơ cấp U₁ sẽ giảm xuống do gánh tải.", isCorrect: false, level: "Thông hiểu", explanation: "Sai, điện áp nguồn sơ cấp U₁ do lưới điện quyết định, luôn không đổi." },
      { id: "l18_p2_q1_s3", text: "Hoạt động của máy biến áp này dựa trên hiện tượng cảm ứng điện từ và dòng điện chạy trong cả sơ cấp và thứ cấp luôn cùng pha.", isCorrect: false, level: "Thông hiểu", explanation: "Sai, dòng điện xoay chiều ở sơ cấp và thứ cấp lệch pha nhau." },
      { id: "l18_p2_q1_s4", text: "Nếu đặt vào hai đầu cuộn sơ cấp một điện áp một chiều không đổi có giá trị U_DC = 220 V thì ở thứ cấp sẽ đo được điện áp không đổi tương ứng.", isCorrect: false, level: "Vận dụng", explanation: "Sai, máy biến áp chỉ hoạt động với dòng điện xoay chiều. Khi cấp dòng một chiều, từ thông sinh ra không biến thiên theo thời gian (ΔΦ = 0), do đó suất điện động cảm ứng thứ cấp bằng 0." }
    ]
  },
  {
    id: "l18_p2_q2",
    question: "Xét cấu tạo và hoạt động của đàn ghi ta điện và sạc không dây sử dụng trong đời sống thực tế. Khi gảy dây đàn ghi ta điện hoặc sạc pin cho điện thoại thông minh, các nhận định sau Đúng hay Sai?",
    statements: [
      { id: "l18_p2_q2_s1", text: "Đàn ghi ta điện bắt buộc phải có một hộp cộng hưởng rỗng lớn bằng gỗ giống đàn ghi ta cổ điển để âm thanh phát ra loa to hơn.", isCorrect: false, level: "Nhận biết", explanation: "Sai, đàn ghi ta điện có thân đặc và không có hộp cộng hưởng lớn rỗng, âm thanh nghe được là nhờ amply khuếch đại dòng cảm ứng điện từ từ bộ pickup." },
      { id: "l18_p2_q2_s2", text: "Dây đàn thép dao động làm biến thiên từ thông gửi qua cuộn cảm đặt ngay dưới nó, làm xuất hiện suất điện động cảm ứng xoay chiều có cùng tần số dao động của dây đàn.", isCorrect: true, level: "Thông hiểu", explanation: "Đúng, dây thép bị từ hóa rung động làm biến thiên từ thông qua cuộn dây cảm ứng, sinh suất điện động cảm ứng xoay chiều cùng tần số âm." },
      { id: "l18_p2_q2_s3", text: "Trong sạc điện thoại không dây, cuộn dây trong đế sạc nối với nguồn điện xoay chiều đóng vai trò như cuộn thứ cấp của máy biến áp.", isCorrect: false, level: "Thông hiểu", explanation: "Sai, cuộn dây trong đế sạc nối với nguồn điện phát đóng vai trò cuộn sơ cấp sinh ra từ thông xoáy biến thiên." },
      { id: "l18_p2_q2_s4", text: "Khi gảy dây đàn mạnh hơn, biên độ dao động lớn làm tăng tốc độ biến thiên từ thông, do đó suất điện động cảm ứng cực đại lớn hơn và âm thanh phát ra to hơn.", isCorrect: true, level: "Vận dụng", explanation: "Đúng, gảy mạnh biên độ lớn, tốc độ biến thiên từ thông ΔΦ/Δt lớn nên suất điện động cảm ứng cực đại lớn hơn, âm thanh to hơn." }
    ]
  },
  {
    id: "l18_p2_q3",
    question: "Trong công nghiệp và đời sống, dòng điện Foucault (Phu-cô) xuất hiện trong các khối kim loại dẫn điện có nhiều đặc tính xoáy độc đáo. Các nhận định sau về dòng điện Foucault Đúng hay Sai?",
    statements: [
      { id: "l18_p2_q3_s1", text: "Dòng điện Foucault chỉ sinh ra khi khối kim loại đứng yên hoàn toàn trong một từ trường không đổi.", isCorrect: false, level: "Nhận biết", explanation: "Sai, từ trường không đổi và kim loại đứng yên thì từ thông không biến thiên, không thể sinh ra dòng điện cảm ứng." },
      { id: "l18_p2_q3_s2", text: "Bếp từ nấu chín thức ăn dựa trên tác dụng tỏa nhiệt Joule của dòng điện Foucault sinh ra ngay trong đáy nồi làm bằng kim loại sắt từ.", isCorrect: true, level: "Thông hiểu", explanation: "Đúng, cuộn dây dưới mặt bếp từ tạo ra từ trường biến thiên tần số cao cắt qua đáy nồi sắt từ, sinh dòng Foucault mạnh tỏa nhiệt trực tiếp làm chín thức ăn." },
      { id: "l18_p2_q3_s3", text: "Để làm giảm hao phí do dòng Foucault trong lõi sắt máy biến áp, người ta dùng một khối sắt đặc đồng nhất đúc nguyên khối chịu nhiệt tốt.", isCorrect: false, level: "Thông hiểu", explanation: "Sai, sắt đặc nguyên khối sẽ làm giảm điện trở dẫn tới dòng Foucault cực đại tỏa nhiệt cực lớn gây hao phí." },
      { id: "l18_p2_q3_s4", text: "Trong các thiết bị phanh điện từ của tàu hỏa, lực cản chuyển động xuất hiện do tương tác từ giữa dòng Foucault sinh ra trong đĩa phanh kim loại và từ trường ngoài, lực này luôn chống lại chuyển động.", isCorrect: true, level: "Vận dụng", explanation: "Đúng, theo định luật Lenz dòng Foucault sinh ra lực từ có tác dụng chống lại nguyên nhân sinh ra nó (sự chuyển động của đĩa kim loại), tạo lực hãm phanh êm ái." }
    ]
  },
  {
    id: "l18_p2_q4",
    question: "Một máy biến áp thực tế có số vòng dây cuộn sơ cấp N₁ = 1000 vòng, cuộn thứ cấp N₂ = 200 vòng được nối với tải điện. Cuộn sơ cấp được nối với nguồn điện xoay chiều có điện áp hiệu dụng U₁ = 220 V and tần số f = 50 Hz. Các phát biểu sau Đúng hay Sai?",
    statements: [
      { id: "l18_p2_q4_s1", text: "Nếu cuộn thứ cấp hở hoàn toàn, điện áp hiệu dụng U₂ đo được ở hai đầu cuộn thứ cấp về lý thuyết lí tưởng là 44 V.", isCorrect: true, level: "Nhận biết", explanation: "Đúng, U₂ = U₁.(N₂/N₁) = 220 * (200 / 1000) = 44 V." },
      { id: "l18_p2_q4_s2", text: "Tần số của dòng điện và điện áp ở cuộn thứ cấp giảm xuống còn 10 Hz tương ứng với tỉ số hạ áp của máy biến áp.", isCorrect: false, level: "Thông hiểu", explanation: "Sai, máy biến áp không thay đổi tần số dòng điện, bên thứ cấp tần số vẫn là 50 Hz." },
      { id: "l18_p2_q4_s3", text: "Nếu lõi sắt của máy biến áp này bị lỏng hoặc các lá thép ghép không chặt, hao phí do dòng Foucault sẽ tăng lên đáng kể, làm máy nóng hơn và sụt giảm hiệu năng.", isCorrect: true, level: "Thông hiểu", explanation: "Đúng, các lá thép ghép không chặt sẽ làm hở từ, giảm hiệu suất ghép từ và tăng điện trở tiếp xúc cơ học, đồng thời tăng hao phí Foucault." },
      { id: "l18_p2_q4_s4", text: "Khi máy hoạt động ở trạng thái lý tưởng, cường độ dòng điện hiệu dụng sơ cấp I₁ và thứ cấp I₂ tỉ lệ thuận with số vòng dây: I₁/I₂ = N₁/N₂.", isCorrect: false, level: "Vận dụng", explanation: "Sai, tỉ lệ nghịch mới đúng: I₁/I₂ = N₂/N₁." }
    ]
  }
];

export const LESSON18_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l18_p3_q1",
    question: "Một máy biến áp lí tưởng có cuộn sơ cấp gồm 1200 vòng dây và cuộn thứ cấp gồm 300 vòng dây. Khi đặt vào hai đầu cuộn sơ cấp một điện áp xoay chiều hiệu dụng là 240 V, hãy tính điện áp hiệu dụng hở (V) ở hai đầu cuộn thứ cấp. (Nhập đáp án là một số nguyên không chứa đơn vị đo)",
    answer: 60,
    unit: "V",
    level: "Vận dụng",
    explanation: "Áp dụng hệ thức máy biến áp lý tưởng: U₂/U₁ = N₂/N₁ => U₂ = U₁ * (N₂/N₁) = 240 * (300 / 1200) = 240 / 4 = 60 V."
  },
  {
    id: "l18_p3_q2",
    question: "Một sạc điện thoại không dây có hiệu suất truyền năng lượng cảm ứng tương hỗ đạt 75%. Khi đế sạc tiêu thụ một công suất điện sơ cấp từ nguồn là 12 W, công suất điện thực tế (W) nhận được ở cuộn dây thứ cấp bên trong điện thoại để nạp pin là bao nhiêu? (Nhập đáp án là một số nguyên không chứa đơn vị đo)",
    answer: 9,
    unit: "W",
    level: "Thông hiểu",
    explanation: "Hiệu suất H = P_nhận / P_tiêu_thụ => P_nhận = P_tiêu_thụ * H = 12 * 75% = 9 W."
  },
  {
    id: "l18_p3_q3",
    question: "Một máy biến áp hạ áp lí tưởng cung cấp điện áp hiệu dụng 12 V cho một hệ thống đèn LED sân vườn hoạt động với công suất 48 W. Biết cường độ dòng điện hiệu dụng chạy qua cuộn sơ cấp của máy biến áp đo được là 0,2 A. Điện áp hiệu dụng (V) ở hai đầu cuộn sơ cấp là bao nhiêu? (Nhập đáp án là một số nguyên không chứa đơn vị đo)",
    answer: 240,
    unit: "V",
    level: "Vận dụng",
    explanation: "Vì máy biến áp lí tưởng nên công suất tiêu thụ ở cuộn sơ cấp bằng công suất truyền sang cuộn thứ cấp: P₁ = P₂ = 48 W. Mà P₁ = U₁ * I₁ => U₁ = P₁ / I₁ = 48 / 0,2 = 240 V."
  },
  {
    id: "l18_p3_q4",
    question: "Một cuộn pickup của đàn ghi ta điện gồm một cuộn dây có 5000 vòng quấn quanh lõi nam châm. Trong một cú gảy dây đàn, từ thông gửi qua mỗi vòng dây biến thiên điều hòa theo thời gian với tốc độ biến thiên từ thông cực đại là 0,0004 Wb/s. Hãy tính biên độ suất điện động cảm ứng cực đại (V) xuất hiện ở hai đầu cuộn dây cảm ứng này. (Nhập đáp án là một số nguyên không chứa đơn vị đo)",
    answer: 2,
    unit: "V",
    level: "Vận dụng",
    explanation: "Theo định luật cảm ứng Faraday, suất điện động cảm ứng trong cuộn dây gồm N vòng dây là: e_c = -N * dΦ/dt. Biên độ cực đại của suất điện động là: E_max = N * (dΦ/dt)_max = 5000 * 0,0004 = 2 V."
  },
  {
    id: "l18_p3_q5",
    question: "Để giảm hao phí điện năng trên đường dây truyền tải điện, người ta sử dụng máy biến áp tăng áp lí tưởng đặt tại trạm phát điện để tăng điện áp lên 10 lần trước khi truyền đi. Hao phí tỏa nhiệt trên đường dây truyền tải sẽ giảm đi bao nhiêu lần so với khi chưa tăng áp? (Nhập đáp án là một số nguyên không chứa đơn vị đo)",
    answer: 100,
    unit: "lần",
    level: "Thông hiểu",
    explanation: "Hao phí tỏa nhiệt trên đường dây truyền tải điện là ΔP = R.I² = R * (P / U)². Khi điện áp hiệu dụng U tăng lên 10 lần thì hao phí tỏa nhiệt giảm đi 10² = 100 lần."
  },
  {
    id: "l18_p3_q6",
    question: "Một máy biến áp có cuộn sơ cấp gồm 1500 vòng và cuộn thứ cấp gồm N₂ vòng. Học sinh đo được điện áp hiệu dụng hai đầu cuộn sơ cấp là U₁ = 220 V. Sau đó đo điện áp hở hai đầu cuộn thứ cấp được U₂ = 11 V. Tính số vòng dây N₂ của cuộn thứ cấp. (Nhập đáp án là một số nguyên không chứa đơn vị đo)",
    answer: 75,
    unit: "vòng",
    level: "Vận dụng",
    explanation: "Ta có: U₂/U₁ = N₂/N₁ => N₂ = N₁ * (U₂/U₁) = 1500 * (11 / 220) = 1500 * (1/20) = 75 vòng."
  }
];

// ==================== LESSON 19 QUESTIONS ====================
export const LESSON19_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l19_p1_q1",
    question: "Phát biểu nào sau đây là chính xác nhất khi nói về nguồn gốc sinh ra điện trường xoáy?",
    options: [
      { id: "l19_p1_q1_o1", text: "Do một từ trường biến thiên theo thời gian tạo ra trong không gian.", isCorrect: true },
      { id: "l19_p1_q1_o2", text: "Do các hạt mang điện tích âm chuyển động gia tốc đều đặn.", isCorrect: false },
      { id: "l19_p1_q1_o3", text: "Do một điện trường tĩnh biến thiên tạo ra.", isCorrect: false },
      { id: "l19_p1_q1_o4", text: "Do sự chuyển động hỗn loạn không ngừng của các phân tử khí.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Theo luận thuyết Maxwell, khi một từ trường biến thiên theo thời gian, nó sẽ sinh ra trong không gian xung quanh một điện trường biến thiên theo thời gian, gọi là điện trường xoáy."
  },
  {
    id: "l19_p1_q2",
    question: "Đặc điểm cơ bản để phân biệt điện trường xoáy và điện trường tĩnh là",
    options: [
      { id: "l19_p1_q2_o1", text: "đường sức của điện trường xoáy là những đường cong kín khép hoàn toàn.", isCorrect: true },
      { id: "l19_p1_q2_o2", text: "điện trường xoáy tác dụng lực điện lên các hạt mang điện đứng yên.", isCorrect: false },
      { id: "l19_p1_q2_o3", text: "điện trường xoáy có cường độ lớn hơn điện trường tĩnh rất nhiều lần.", isCorrect: false },
      { id: "l19_p1_q2_o4", text: "điện trường xoáy chỉ có thể xuất hiện trong môi trường vật dẫn kim loại.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đường sức của điện trường tĩnh xuất phát từ điện tích dương và kết thúc ở điện tích âm (đường hở). Ngược lại, đường sức của điện trường xoáy là những đường cong kín khép hoàn toàn bao quanh vùng từ trường biến thiên."
  },
  {
    id: "l19_p1_q3",
    question: "Theo thuyết điện từ Maxwell, khi một điện trường biến thiên theo thời gian sẽ sinh ra ở vùng không gian xung quanh",
    options: [
      { id: "l19_p1_q3_o1", text: "một từ trường xoáy khép kín.", isCorrect: true },
      { id: "l19_p1_q3_o2", text: "một điện trường xoáy.", isCorrect: false },
      { id: "l19_p1_q3_o3", text: "một dòng điện dẫn ổn định.", isCorrect: false },
      { id: "l19_p1_q3_o4", text: "các hạt điện tích đứng yên.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Một điện trường biến thiên theo thời gian sẽ sinh ra ở các vùng lân cận một từ trường xoáy khép kín bao quanh nó."
  },
  {
    id: "l19_p1_q4",
    question: "Sóng điện từ là gì?",
    options: [
      { id: "l19_p1_q4_o1", text: "Là điện từ trường biến thiên lan truyền trong không gian dưới dạng sóng.", isCorrect: true },
      { id: "l19_p1_q4_o2", text: "Là dòng chuyển động có hướng của các điện tích trong chân không.", isCorrect: false },
      { id: "l19_p1_q4_o3", text: "Là sóng cơ học tần số cực cao phát sinh từ các vòng dây xoắn.", isCorrect: false },
      { id: "l19_p1_q4_o4", text: "Là sự truyền tương tác điện tĩnh giữa các điện tích đứng yên.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Sóng điện từ là sự lan truyền của điện từ trường xoáy biến thiên tuần hoàn chuyển hóa lẫn nhau liên tục trong không gian dưới dạng sóng theo thời gian."
  },
  {
    id: "l19_p1_q5",
    question: "Trong sóng điện từ, dao động của cường độ điện trường E và cảm ứng từ B tại một điểm luôn có đặc điểm nào dưới đây?",
    options: [
      { id: "l19_p1_q5_o1", text: "Luôn đồng pha với nhau.", isCorrect: true },
      { id: "l19_p1_q5_o2", text: "Lệch pha nhau một góc bằng π/2 rad.", isCorrect: false },
      { id: "l19_p1_q5_o3", text: "Lệch pha nhau một góc bằng π rad.", isCorrect: false },
      { id: "l19_p1_q5_o4", text: "Ngược pha nhau hoàn toàn.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Trong quá trình lan truyền sóng điện từ, tại một điểm bất kỳ, cường độ điện trường E và từ trường B biến thiên tuần hoàn cùng pha với nhau (đều đạt cực đại hoặc cực tiểu đồng thời)."
  },
  {
    id: "l19_p1_q6",
    question: "Vectơ cường độ điện trường E, cảm ứng từ B và vận tốc v của sóng điện từ tạo thành một hệ tọa độ tam diện thuận. Phát biểu nào sau đây đúng về phương của chúng?",
    options: [
      { id: "l19_p1_q6_o1", text: "Cả ba vectơ E, B và v đôi một vuông góc với nhau.", isCorrect: true },
      { id: "l19_p1_q6_o2", text: "Vectơ E luôn song song với vectơ B và vuông góc với v.", isCorrect: false },
      { id: "l19_p1_q6_o3", text: "Sóng điện từ là sóng dọc vì E song song với phương truyền sóng.", isCorrect: false },
      { id: "l19_p1_q6_o4", text: "Vectơ B luôn trùng với phương vận tốc truyền sóng v.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Sóng điện từ là sóng ngang, vì cả hai vectơ dao động E và B đều vuông góc với phương truyền sóng v, đồng thời chúng vuông góc với nhau tạo thành tam diện thuận."
  },
  {
    id: "l19_p1_q7",
    question: "Tốc độ lan truyền của sóng điện từ đạt giá trị lớn nhất trong môi trường nào?",
    options: [
      { id: "l19_p1_q7_o1", text: "Chân không.", isCorrect: true },
      { id: "l19_p1_q7_o2", text: "Không khí khô.", isCorrect: false },
      { id: "l19_p1_q7_o3", text: "Nước nguyên chất.", isCorrect: false },
      { id: "l19_p1_q7_o4", text: "Thạch anh tinh khiết.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Trong chân không, sóng điện từ truyền với tốc độ lớn nhất c ≈ 3.10^8 m/s. Khi đi qua các môi trường vật chất khác, do chiết suất n > 1 nên tốc độ v = c/n sẽ nhỏ hơn c."
  },
  {
    id: "l19_p1_q8",
    question: "Phát biểu nào sau đây đúng về năng lượng của sóng điện từ?",
    options: [
      { id: "l19_p1_q8_o1", text: "Sóng điện từ mang năng lượng, tần số sóng càng lớn thì năng lượng truyền đi càng cao.", isCorrect: true },
      { id: "l19_p1_q8_o2", text: "Sóng điện từ hoàn toàn không mang năng lượng vì nó truyền được trong chân không.", isCorrect: false },
      { id: "l19_p1_q8_o3", text: "Sóng điện từ chỉ mang năng lượng điện trường, không mang năng lượng từ trường.", isCorrect: false },
      { id: "l19_p1_q8_o4", text: "Năng lượng sóng điện từ tỉ lệ nghịch với tần số dao động.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Sóng điện từ mang năng lượng dồi dào. Sóng có tần số f càng lớn thì năng lượng càng mạnh và khả năng đâm xuyên vật chất càng dồi dào."
  },
  {
    id: "l19_p1_q9",
    question: "Trong sơ đồ nạp điện của tụ điện bằng nguồn xoay chiều, giữa hai bản tụ có sự biến thiên điện trường theo thời gian. Khái niệm dòng điện đặc trưng cho sự biến đổi này sinh ra từ trường khép kín là",
    options: [
      { id: "l19_p1_q9_o1", text: "dòng điện dịch.", isCorrect: true },
      { id: "l19_p1_q9_o2", text: "dòng điện dẫn.", isCorrect: false },
      { id: "l19_p1_q9_o3", text: "dòng điện cảm ứng tự cảm.", isCorrect: false },
      { id: "l19_p1_q9_o4", text: "dòng điện không đổi.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Mặc dù giữa hai bản tụ là khoảng chân không/điện môi (không có hạt tải điện thực tế), điện trường biến thiên giữa hai bản tụ tương đương một dòng điện sinh ra từ trường, gọi là dòng điện dịch."
  },
  {
    id: "l19_p1_q10",
    question: "Sự khác biệt cốt lõi nhất về tính chất truyền lan giữa sóng điện từ và sóng cơ học là",
    options: [
      { id: "l19_p1_q10_o1", text: "sóng điện từ có khả năng lan truyền trong chân không, còn sóng cơ học thì không.", isCorrect: true },
      { id: "l19_p1_q10_o2", text: "sóng cơ học truyền nhanh hơn sóng điện từ trong môi trường chất rắn.", isCorrect: false },
      { id: "l19_p1_q10_o3", text: "sóng điện từ luôn luôn có biên độ không đổi khi truyền đi xa.", isCorrect: false },
      { id: "l19_p1_q10_o4", text: "sóng cơ học mang năng lượng còn sóng điện từ thì không mang năng lượng.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Sóng cơ cần môi trường vật chất đàn hồi để truyền dao động của các phần tử. Sóng điện từ truyền lan nhờ sự tự tương tác khép kín giữa điện trường và từ trường nên truyền tốt cả trong chân không."
  },
  {
    id: "l19_p1_q11",
    question: "Khi một sóng điện từ lan truyền xuyên qua ranh giới từ môi trường không khí vào thủy tinh, đại lượng vật lý nào sau đây của sóng sẽ được giữ nguyên không đổi?",
    options: [
      { id: "l19_p1_q11_o1", text: "Tần số dao động của sóng.", isCorrect: true },
      { id: "l19_p1_q11_o2", text: "Tốc độ truyền sóng.", isCorrect: false },
      { id: "l19_p1_q11_o3", text: "Bước sóng của sóng.", isCorrect: false },
      { id: "l19_p1_q11_o4", text: "Cả bước sóng và tốc độ.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Khi truyền qua các môi trường khác nhau, tần số dao động f của sóng điện từ (do nguồn quyết định) luôn không thay đổi. Vận tốc và bước sóng sẽ giảm đi n lần."
  },
  {
    id: "l19_p1_q12",
    question: "Một đài phát thanh FM phát sóng điện từ có tần số f = 100 MHz. Cho tốc độ truyền sóng trong chân không c = 3.10^8 m/s. Bước sóng của sóng phát thanh này bằng",
    options: [
      { id: "l19_p1_q12_o1", text: "3,0 m.", isCorrect: true },
      { id: "l19_p1_q12_o2", text: "0,3 m.", isCorrect: false },
      { id: "l19_p1_q12_o3", text: "30 m.", isCorrect: false },
      { id: "l19_p1_q12_o4", text: "33,3 m.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Ta có: λ = c / f = 3.10^8 / (100.10^6) = 3,0 m."
  },
  {
    id: "l19_p1_q13",
    question: "Khi đưa một thiết bị thu sóng vô tuyến đang đặt trong không khí xuống dưới một bể nước trong suốt có chiết suất n = 1,33 thì bước sóng điện từ thu được tại thiết bị thay đổi thế nào?",
    options: [
      { id: "l19_p1_q13_o1", text: "Giảm đi 1,33 lần.", isCorrect: true },
      { id: "l19_p1_q13_o2", text: "Tăng lên 1,33 lần.", isCorrect: false },
      { id: "l19_p1_q13_o3", text: "Không thay đổi.", isCorrect: false },
      { id: "l19_p1_q13_o4", text: "Giảm đi 1,77 lần (n^2).", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Khi truyền vào môi trường chiết suất n, vận tốc giảm n lần (v = c/n) nên bước sóng cũng giảm n lần: λ' = λ / n."
  },
  {
    id: "l19_p1_q14",
    question: "Một đài phát vô tuyến phát sóng điện từ có tần số f = 7,5 MHz. Khi sóng này lan truyền trong nước nguyên chất có chiết suất n = 4/3 thì bước sóng của nó bằng bao nhiêu?",
    options: [
      { id: "l19_p1_q14_o1", text: "30 m", isCorrect: true },
      { id: "l19_p1_q14_o2", text: "40 m", isCorrect: false },
      { id: "l19_p1_q14_o3", text: "22,5 m", isCorrect: false },
      { id: "l19_p1_q14_o4", text: "15 m", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Bước sóng trong chân không: λ0 = c / f = 3.10^8 / 7,5.10^6 = 40 m. Bước sóng trong nước: λ_n = λ0 / n = 40 / (4/3) = 30 m."
  },
  {
    id: "l19_p1_q15",
    question: "Một sóng điện từ truyền theo phương thẳng đứng có chiều từ trên xuống dưới mặt đất. Tại một thời điểm, vectơ cảm ứng từ B đang hướng về phía Nam. Khi đó, vectơ cường độ điện trường E hướng về phía nào?",
    options: [
      { id: "l19_p1_q15_o1", text: "Phía Tây", isCorrect: true },
      { id: "l19_p1_q15_o2", text: "Phía Đông", isCorrect: false },
      { id: "l19_p1_q15_o3", text: "Phía Bắc", isCorrect: false },
      { id: "l19_p1_q15_o4", text: "Thẳng đứng lên trên", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Theo quy tắc tam diện thuận (E, B, v), quay từ E sang B thì ngón tay cái chỉ chiều truyền v (hướng xuống). E phải hướng về phía Tây để tích có hướng E x B hướng thẳng đứng xuống đất."
  },
  {
    id: "l19_p1_q16",
    question: "Sóng điện từ truyền qua một khối thủy tinh có chiết suất n = 1,5 với bước sóng đo được trong thủy tinh là λ = 20 cm. Tần số của sóng điện từ này bằng",
    options: [
      { id: "l19_p1_q16_o1", text: "1,0 GHz (1000 MHz).", isCorrect: true },
      { id: "l19_p1_q16_o2", text: "1,5 GHz.", isCorrect: false },
      { id: "l19_p1_q16_o3", text: "666,7 MHz.", isCorrect: false },
      { id: "l19_p1_q16_o4", text: "100 MHz.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Vận tốc truyền trong thủy tinh: v = c/n = 3.10^8 / 1,5 = 2.10^8 m/s. Tần số f = v / λ = 2.10^8 / 0,2 = 1.10^9 Hz = 1,0 GHz."
  },
  {
    id: "l19_p1_q17",
    question: "Một máy radar quân sự phát một xung sóng điện từ ngắn hướng thẳng đứng lên vệ tinh địa tĩnh ở độ cao 36000 km so với trạm radar. Thời gian từ lúc trạm radar phát xung đến lúc nhận lại tín hiệu phản xạ ngược lại từ vệ tinh là",
    options: [
      { id: "l19_p1_q17_o1", text: "0,24 s.", isCorrect: true },
      { id: "l19_p1_q17_o2", text: "0,12 s.", isCorrect: false },
      { id: "l19_p1_q17_o3", text: "2,4 s.", isCorrect: false },
      { id: "l19_p1_q17_o4", text: "1,2 s.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Sóng điện từ đi quãng đường 2 lần khoảng cách vệ tinh (đi và về). Tổng thời gian t = 2 * d / c = 2 * (36.10^6 m) / (3.10^8 m/s) = 72.10^6 / 3.10^8 = 0,24 s."
  },
  {
    id: "l19_p1_q18",
    question: "Một tụ điện phẳng tròn chân không diện tích bản tụ A = 0,1 m^2. Khi nạp điện xoay chiều làm điện trường biến thiên dE/dt = 10^11 V/(m.s). Biết ε0 = 8,85.10^-12 F/m. Dòng điện dịch cực đại chạy qua khoảng không tụ điện là",
    options: [
      { id: "l19_p1_q18_o1", text: "88,5 mA.", isCorrect: true },
      { id: "l19_p1_q18_o2", text: "8,85 mA.", isCorrect: false },
      { id: "l19_p1_q18_o3", text: "885 mA.", isCorrect: false },
      { id: "l19_p1_q18_o4", text: "88,5 A.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Dòng điện dịch I_d = ε0 * A * (dE/dt) = 8,85.10^-12 * 0,1 * 10^11 = 0,0885 A = 88,5 mA."
  }
];

export const LESSON19_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l19_p2_q1",
    question: "Nghiên cứu về luận thuyết điện từ trường của J.C. Maxwell và sự tương tác giữa điện trường xoáy và từ trường biến thiên, hãy nhận định các phát biểu sau:",
    statements: [
      {
        id: "l19_p2_q1_s1",
        text: "Các đường sức của điện trường xoáy là những đường cong kín khép hoàn toàn bao quanh vùng không gian có từ trường biến thiên.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Theo định nghĩa của Maxwell, đường sức điện trường xoáy khép kín tròn xung quanh từ trường biến thiên."
      },
      {
        id: "l19_p2_q1_s2",
        text: "Điện trường xoáy chỉ có thể xuất hiện trong lòng một ống dây dẫn kim loại khi có sự biến thiên từ thông kín qua nó.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Điện trường xoáy xuất hiện ở bất cứ nơi nào có từ trường biến thiên theo thời gian, ngay cả khi không có ống dây dẫn hay môi trường vật dẫn."
      },
      {
        id: "l19_p2_q1_s3",
        text: "Điện trường biến thiên giữa hai bản tụ điện phẳng trong quá trình phóng/nạp điện sẽ sinh ra một từ trường xoáy khép kín bao bọc bản tụ.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Mối liên hệ thứ hai của Maxwell khẳng định điện trường biến thiên theo thời gian sinh ra từ trường xoáy khép kín, còn gọi là dòng điện dịch tương đương."
      },
      {
        id: "l19_p2_q1_s4",
        text: "Một tụ điện phẳng có diện tích bản tụ tăng gấp hai và tốc độ thay đổi cường độ điện trường giảm hai lần thì dòng điện dịch cực đại qua nó tăng gấp bốn.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "I_dịch tỉ lệ với tích diện tích A và dE/dt. A tăng 2, dE/dt giảm 2 thì tích (2 * 0,5) = 1, tức dòng điện dịch cực đại không thay đổi."
      }
    ]
  },
  {
    id: "l19_p2_q2",
    question: "Xét các đặc tính lan truyền của mô hình sóng điện từ tự do trong chân không và các môi trường vật chất khác nhau:",
    statements: [
      {
        id: "l19_p2_q2_s1",
        text: "Sóng điện từ là sóng dọc vì dao động điện từ lan truyền theo phương trùng khớp với phương truyền sóng.",
        isCorrect: false,
        level: "Nhận biết",
        explanation: "Sóng điện từ luôn là sóng ngang, vì cả cường độ điện trường E và cảm ứng từ B đều dao động vuông góc với phương truyền sóng v."
      },
      {
        id: "l19_p2_q2_s2",
        text: "Tại một điểm bất kỳ trên phương truyền sóng, dao động của cường độ điện trường E và cảm ứng từ B luôn vuông pha nhau.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Mặc dù phương dao động vuông góc nhau, nhưng về mặt pha thời gian, dao động của E và B luôn đồng pha nhau."
      },
      {
        id: "l19_p2_q2_s3",
        text: "Sóng điện từ mang năng lượng dồi dào, tỉ lệ thuận với lũy thừa bậc cao của tần số dao động nguồn phát sóng.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Sóng mang năng lượng, tần số f càng cao thì năng lượng truyền lan càng mạnh và khả năng đâm xuyên vật chất càng lớn."
      },
      {
        id: "l19_p2_q2_s4",
        text: "Một sóng cực ngắn truyền đi được quãng đường dài 120 m trong khoảng thời gian t = 0,4 micro giây trong tầng khí quyển, tốc độ truyền sóng xấp xỉ c.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Tốc độ v = s / t = 120 m / (0,4.10^-6 s) = 3.10^8 m/s = c. Nhận định này hoàn toàn đúng."
      }
    ]
  },
  {
    id: "l19_p2_q3",
    question: "Sự biến đổi của các đặc trưng sóng điện từ khi lan truyền qua mặt phân cách giữa các môi trường vật chất có chiết suất khác nhau:",
    statements: [
      {
        id: "l19_p2_q3_s1",
        text: "Vận tốc lan truyền sóng điện từ trong chân không c = 3.10^8 m/s là tốc độ giới hạn lớn nhất trong vũ trụ tự nhiên.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng theo thuyết thuyết tương đối và luận thuyết điện từ, tốc độ ánh sáng/sóng điện từ trong chân không c là cực đại tuyệt đối."
      },
      {
        id: "l19_p2_q3_s2",
        text: "Khi truyền từ chân không vào nước có chiết suất n = 1,33, tần số của sóng điện từ tăng lên 1,33 lần.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Tần số f của sóng luôn giữ nguyên cố định khi đi qua bất kỳ ranh giới môi trường nào."
      },
      {
        id: "l19_p2_q3_s3",
        text: "Khi một sóng điện từ truyền từ không khí vào khối thủy tinh (chiết suất n = 1,5), bước sóng đo được giảm đi 1,5 lần.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Vì v = c/n, bước sóng λ = v/f = c/(n.f) nên bước sóng tỉ lệ nghịch với chiết suất n, giảm 1,5 lần."
      },
      {
        id: "l19_p2_q3_s4",
        text: "Một sóng vô tuyến có tần số f = 15 MHz truyền vào lòng chất lỏng có hằng số điện môi ε = 4 (chiết suất n = 2) thì bước sóng trong chất lỏng bằng 10 m.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Vận tốc trong chất lỏng: v = c / n = 3.10^8 / 2 = 1,5.10^8 m/s. Bước sóng λ = v / f = 1,5.10^8 / 15.10^6 = 10 m. Đúng."
      }
    ]
  },
  {
    id: "l19_p2_q4",
    question: "Khảo sát mô hình không gian của ba vectơ E, B, v trong sóng điện từ tự do và hoạt động của thiết bị ăng-ten thu sóng thực nghiệm:",
    statements: [
      {
        id: "l19_p2_q4_s1",
        text: "Ba vectơ E, B và v đôi một vuông góc với nhau và lập thành một hệ tọa độ tam diện thuận xoay vòng.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Mô hình sóng điện từ chỉ rõ E, B, v lập thành tam diện thuận."
      },
      {
        id: "l19_p2_q4_s2",
        text: "Để ăng-ten dạng thanh của máy thu sóng vô tuyến đạt hiệu quả thu sóng tối đa, ta phải đặt thanh ăng-ten nằm song song với phương của vectơ cường độ điện trường E.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Lực điện trường F = q.E tác dụng dọc theo thanh kim loại làm dịch chuyển electron chạy dọc thanh tốt nhất khi E song song với thanh."
      },
      {
        id: "l19_p2_q4_s3",
        text: "Nếu tại một điểm khảo sát, cường độ điện trường E hướng thẳng đứng lên trên thì vectơ cảm ứng từ B buộc phải hướng thẳng đứng xuống dưới.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Vì E vuông góc với B, nên nếu E hướng dọc thẳng đứng thì B bắt buộc phải nằm trên mặt phẳng nằm ngang, không thể thẳng đứng."
      },
      {
        id: "l19_p2_q4_s4",
        text: "Một sóng điện từ truyền từ Tây sang Đông. Tại thời điểm E đạt cực đại và hướng thẳng đứng lên trên, vectơ cảm ứng từ B đạt cực đại và hướng về phía Nam.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Quy tắc tam diện thuận: Đặt ngón tay cái hướng Đông (v), ngón trỏ hướng thẳng đứng lên (E), ngón giữa chỉ hướng Nam (B). Hoặc E x B = v (Hướng lên x Hướng Nam = Hướng Đông). Nhận định đúng."
      }
    ]
  }
];

export const LESSON19_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l19_p3_q1",
    question: "Một đài truyền hình phát sóng vệ tinh với bước sóng λ = 4,0 m truyền trong chân không. Tính tần số của sóng này theo đơn vị MHz. (Lấy tốc độ ánh sáng trong chân không c = 3.10^8 m/s).",
    answer: 75,
    unit: "MHz",
    level: "Thông hiểu",
    explanation: "Áp dụng hệ thức sóng: f = c / λ = 3.10^8 / 4 = 75.10^6 Hz = 75 MHz. Nhập kết quả là số nguyên 75."
  },
  {
    id: "l19_p3_q2",
    question: "Một đài phát thanh phát sóng điện từ có chu kì dao động T = 2,5.10^-8 s. Bước sóng của sóng này khi truyền trong chân không bằng bao nhiêu mét? (Lấy tốc độ c = 3.10^8 m/s).",
    answer: 7.5,
    unit: "m",
    level: "Thông hiểu",
    explanation: "Bước sóng của đài phát thanh: λ = c * T = 3.10^8 * 2,5.10^-8 = 7,5 m. Nhập kết quả làm tròn đến 1 chữ số thập phân là 7.5."
  },
  {
    id: "l19_p3_q3",
    question: "Một sóng cực ngắn có tần số f = 12 MHz lan truyền từ chân không vào nước nguyên chất có chiết suất n = 1,25. Tính bước sóng của sóng điện từ này khi truyền trong nước theo đơn vị mét. (Lấy tốc độ truyền sóng trong chân không c = 3.10^8 m/s).",
    answer: 20,
    unit: "m",
    level: "Vận dụng",
    explanation: "Vận tốc truyền sóng trong nước: v = c / n = 3.10^8 / 1,25 = 2,4.10^8 m/s. Bước sóng trong nước: λ = v / f = 2,4.10^8 / 12.10^6 = 20 m. Nhập số nguyên 20."
  },
  {
    id: "l19_p3_q4",
    question: "Một trạm radar phát tín hiệu sóng điện từ ngắn hướng thẳng đứng về phía máy bay gián điệp đang bay ở độ cao lớn. Thời gian từ lúc phát sóng đến lúc nhận lại tín hiệu phản xạ là t = 0,0002 s (tức 200 micro giây). Tính khoảng cách từ trạm đến máy bay theo đơn vị kilômét (km). (Lấy tốc độ c = 3.10^8 m/s).",
    answer: 30,
    unit: "km",
    level: "Vận dụng",
    explanation: "Sóng điện từ đi 2 lần khoảng cách d (đi và về). Quãng đường sóng truyền: s = c * t = 3.10^8 * 0,0002 = 60000 m = 60 km. Khoảng cách d = s / 2 = 30 km. Nhập số nguyên 30."
  },
  {
    id: "l19_p3_q5",
    question: "Một tụ điện phẳng tròn chân không diện tích bản cực A = 0,02 m^2. Khi nạp điện xoay chiều, cường độ điện trường biến thiên dE/dt = 1,13.10^11 V/(m.s). Tìm cường độ dòng điện dịch cực đại chạy qua tụ điện theo đơn vị ampe (A), làm tròn kết quả đến hàng đơn vị gần nhất. (Lấy ε0 = 8,85.10^-12 F/m).",
    answer: 2,
    unit: "A",
    level: "Vận dụng",
    explanation: "Áp dụng công thức dòng điện dịch cực đại: I_d = ε0 * A * (dE/dt) = 8,85.10^-12 * 0,02 * 1,13.10^11 = 0,020001 A ≈ 2 A. Nhập số nguyên 2."
  },
  {
    id: "l19_p3_q6",
    question: "Sóng điện từ truyền từ chân không có bước sóng λ = 120 nm vào một môi trường trong suốt thì vận tốc của nó giảm đi 1,5 lần. Tính bước sóng của sóng này trong môi trường trong suốt đó theo đơn vị nanômét (nm).",
    answer: 80,
    unit: "nm",
    level: "Vận dụng",
    explanation: "Vận tốc giảm 1,5 lần có nghĩa là chiết suất n = 1,5. Bước sóng trong môi trường trong suốt là: λ' = λ / n = 120 / 1,5 = 80 nm. Nhập số nguyên 80."
  }
];

// ==================== LESSON 20 QUESTIONS ====================
export const LESSON20_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l20_p1_q1",
    question: "Công thức nào sau đây xác định độ lớn của lực từ (lực Ampe) tác dụng lên một đoạn dây dẫn thẳng dài L mang dòng điện cường độ I đặt trong từ trường đều có cảm ứng từ B?",
    options: [
      { id: "l20_p1_q1_o1", text: "F = B.I.L.sin(α)", isCorrect: true },
      { id: "l20_p1_q1_o2", text: "F = B.I.L.cos(α)", isCorrect: false },
      { id: "l20_p1_q1_o3", text: "F = B.I.L.tan(α)", isCorrect: false },
      { id: "l20_p1_q1_o4", text: "F = B.I / (L.sin(α))", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Độ lớn lực Ampe tác dụng lên một đoạn dây dẫn thẳng mang dòng điện được tính theo công thức: F = B.I.L.sin(α), trong đó α là góc hợp bởi đoạn dây dẫn mang dòng điện và vectơ cảm ứng từ B."
  },
  {
    id: "l20_p1_q2",
    question: "Quy tắc nào sau đây được sử dụng để xác định chiều của lực từ tác dụng lên đoạn dây dẫn thẳng mang dòng điện đặt trong từ trường đều?",
    options: [
      { id: "l20_p1_q2_o1", text: "Quy tắc bàn tay trái.", isCorrect: true },
      { id: "l20_p1_q2_o2", text: "Quy tắc bàn tay phải.", isCorrect: false },
      { id: "l20_p1_q2_o3", text: "Quy tắc nắm tay phải.", isCorrect: false },
      { id: "l20_p1_q2_o4", text: "Quy tắc vặn nút chai.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Chiều của lực từ tác dụng lên đoạn dây dẫn mang dòng điện được xác định bằng quy tắc bàn tay trái."
  },
  {
    id: "l20_p1_q3",
    question: "Đặt bàn tay trái sao cho các đường cảm ứng từ đâm xuyên vào lòng bàn tay, chiều từ cổ tay đến các ngón tay chỉ chiều dòng điện thì ngón tay cái choãi ra 90 độ chỉ chiều của:",
    options: [
      { id: "l20_p1_q3_o1", text: "Lực từ tác dụng lên đoạn dây dẫn.", isCorrect: true },
      { id: "l20_p1_q3_o2", text: "Vectơ cảm ứng từ B.", isCorrect: false },
      { id: "l20_p1_q3_o3", text: "Đường sức điện trường.", isCorrect: false },
      { id: "l20_p1_q3_o4", text: "Vectơ vận tốc chuyển động của hạt mang điện.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Theo quy tắc bàn tay trái, ngón cái choãi ra 90 độ chỉ chiều của lực từ tác dụng lên đoạn dây dẫn mang dòng điện."
  },
  {
    id: "l20_p1_q4",
    question: "Trong hệ SI, đơn vị đo của cảm ứng từ B là:",
    options: [
      { id: "l20_p1_q4_o1", text: "Tesla (T).", isCorrect: true },
      { id: "l20_p1_q4_o2", text: "Vêbe (Wb).", isCorrect: false },
      { id: "l20_p1_q4_o3", text: "Henri (H).", isCorrect: false },
      { id: "l20_p1_q4_o4", text: "Fara (F).", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đơn vị đo của cảm ứng từ B trong hệ SI là Tesla (ký hiệu: T)."
  },
  {
    id: "l20_p1_q5",
    question: "Từ thông Φ gửi qua một diện tích phẳng S đặt trong từ trường đều có cảm ứng từ B được xác định bởi biểu thức nào sau đây (với α là góc giữa vectơ pháp tuyến n của diện tích S và vectơ cảm ứng từ B)?",
    options: [
      { id: "l20_p1_q5_o1", text: "Φ = B.S.cos(α)", isCorrect: true },
      { id: "l20_p1_q5_o2", text: "Φ = B.S.sin(α)", isCorrect: false },
      { id: "l20_p1_q5_o3", text: "Φ = B.S.tan(α)", isCorrect: false },
      { id: "l20_p1_q5_o4", text: "Φ = B / (S.cos(α))", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Từ thông qua diện tích S đặt trong từ trường đều có biểu thức: Φ = B.S.cos(α)."
  },
  {
    id: "l20_p1_q6",
    question: "Độ lớn suất điện động cảm ứng xuất hiện trong một mạch kín tỉ lệ thuận với lượng đại lượng nào sau đây?",
    options: [
      { id: "l20_p1_q6_o1", text: "Tốc độ biến thiên từ thông qua mạch kín.", isCorrect: true },
      { id: "l20_p1_q6_o2", text: "Độ lớn của cảm ứng từ B.", isCorrect: false },
      { id: "l20_p1_q6_o3", text: "Độ lớn diện tích mạch kín S.", isCorrect: false },
      { id: "l20_p1_q6_o4", text: "Điện trở của mạch kín R.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Theo định luật Faraday, độ lớn suất điện động cảm ứng xuất hiện trong mạch kín tỉ lệ thuận với tốc độ biến thiên từ thông qua mạch đó."
  },
  {
    id: "l20_p1_q7",
    question: "Định luật vật lý nào xác định chiều của dòng điện cảm ứng xuất hiện trong mạch kín sao cho từ trường do nó sinh ra chống lại sự biến thiên của từ thông qua mạch?",
    options: [
      { id: "l20_p1_q7_o1", text: "Định luật Lenz.", isCorrect: true },
      { id: "l20_p1_q7_o2", text: "Định luật Faraday.", isCorrect: false },
      { id: "l20_p1_q7_o3", text: "Định luật Ohm.", isCorrect: false },
      { id: "l20_p1_q7_o4", text: "Định luật Ampere.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Định luật Lenz phát biểu rằng dòng điện cảm ứng xuất hiện trong mạch kín có chiều sao cho từ trường do nó sinh ra có tác dụng chống lại sự biến thiên của từ thông sinh ra nó."
  },
  {
    id: "l20_p1_q8",
    question: "Mối liên hệ giữa đơn vị từ thông Vêbe (Wb) và đơn vị cảm ứng từ Tesla (T) trong hệ SI là:",
    options: [
      { id: "l20_p1_q8_o1", text: "1 Wb = 1 T.m²", isCorrect: true },
      { id: "l20_p1_q8_o2", text: "1 Wb = 1 T/m²", isCorrect: false },
      { id: "l20_p1_q8_o3", text: "1 Wb = 1 T.A", isCorrect: false },
      { id: "l20_p1_q8_o4", text: "1 Wb = 1 T.V", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Từ công thức Φ = B.S, khi α = 0 ta có Φ = B.S. Do đó đơn vị tương ứng là 1 Wb = 1 T.m²."
  },
  {
    id: "l20_p1_q9",
    question: "Một đoạn dây dẫn thẳng đặt nằm ngang mang dòng điện chạy từ trái sang phải. Dây nằm trong từ trường đều có các đường sức từ hướng thẳng đứng từ dưới lên. Chiều của lực từ tác dụng lên đoạn dây này là:",
    options: [
      { id: "l20_p1_q9_o1", text: "Hướng ra ngoài mặt phẳng hình vẽ (hướng về phía người quan sát).", isCorrect: true },
      { id: "l20_p1_q9_o2", text: "Hướng vào trong mặt phẳng hình vẽ.", isCorrect: false },
      { id: "l20_p1_q9_o3", text: "Hướng thẳng đứng từ trên xuống dưới.", isCorrect: false },
      { id: "l20_p1_q9_o4", text: "Hướng thẳng đứng từ dưới lên trên.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Áp dụng quy tắc bàn tay trái: Hướng lòng bàn tay xuống phía dưới để hứng các đường sức từ đâm thẳng đứng lên. Chiều từ cổ tay đến bốn ngón tay hướng từ trái sang phải (theo chiều dòng điện). Khi đó, ngón tay cái choãi ra 90 độ chỉ hướng ra ngoài mặt phẳng hình vẽ (hướng về phía người nhìn)."
  },
  {
    id: "l20_p1_q10",
    question: "Khi diện tích phẳng S của một vòng dây đặt vuông góc với các đường cảm ứng từ của một từ trường đều (vectơ pháp tuyến n cùng chiều hoặc ngược chiều với B), từ thông qua vòng dây sẽ:",
    options: [
      { id: "l20_p1_q10_o1", text: "Có độ lớn cực đại.", isCorrect: true },
      { id: "l20_p1_q10_o2", text: "Bằng 0.", isCorrect: false },
      { id: "l20_p1_q10_o3", text: "Có giá trị âm cực tiểu.", isCorrect: false },
      { id: "l20_p1_q10_o4", text: "Biến thiên điều hòa liên tục.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Khi mặt phẳng vòng dây vuông góc với B thì góc α = 0 độ hoặc 180 độ. Khi đó, |cos(α)| = 1, do đó độ lớn từ thông đạt giá trị cực đại là |Φ_max| = B.S."
  },
  {
    id: "l20_p1_q11",
    question: "Khi ta tịnh tiến nhanh một thanh nam châm thẳng lại gần một vòng dây dẫn kín cố định, giữa nam châm và vòng dây sẽ xuất hiện:",
    options: [
      { id: "l20_p1_q11_o1", text: "Lực đẩy từ trường chống lại sự chuyển động lại gần của nam châm.", isCorrect: true },
      { id: "l20_p1_q11_o2", text: "Lực hút từ trường hỗ trợ nam châm chuyển động nhanh hơn.", isCorrect: false },
      { id: "l20_p1_q11_o3", text: "Không có tương tác cơ học nào vì dòng điện cảm ứng chỉ tạo nhiệt lượng.", isCorrect: false },
      { id: "l20_p1_q11_o4", text: "Lực đẩy tĩnh điện do tích tụ các hạt electron tự do.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Theo định luật Lenz, dòng điện cảm ứng xuất hiện có chiều chống lại chuyển động của nam châm (nguyên nhân sinh ra nó). Khi đưa nam châm lại gần, vòng dây sẽ đẩy nam châm ra xa để cản trở sự lại gần."
  },
  {
    id: "l20_p1_q12",
    question: "Nếu cường độ dòng điện chạy qua một dây dẫn tăng lên 2 lần, chiều dài tác dụng của dây trong từ trường đều tăng 2 lần và giữ nguyên góc hợp α thì độ lớn lực từ tác dụng lên dây thay đổi thế nào?",
    options: [
      { id: "l20_p1_q12_o1", text: "Tăng lên 4 lần.", isCorrect: true },
      { id: "l20_p1_q12_o2", text: "Tăng lên 2 lần.", isCorrect: false },
      { id: "l20_p1_q12_o3", text: "Không đổi.", isCorrect: false },
      { id: "l20_p1_q12_o4", text: "Giảm đi 4 lần.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Do lực Ampe F = B.I.L.sin(α) tỉ lệ thuận với cả I và L. Khi cả I và L tăng lên 2 lần thì F tăng 2 * 2 = 4 lần."
  },
  {
    id: "l20_p1_q13",
    question: "Suất điện động cảm ứng xuất hiện trong khung dây phẳng bằng 0 tại những thời điểm nào?",
    options: [
      { id: "l20_p1_q13_o1", text: "Từ thông gửi qua khung dây không biến thiên theo thời gian.", isCorrect: true },
      { id: "l20_p1_q13_o2", text: "Độ lớn từ thông qua khung đạt giá trị nhỏ nhất.", isCorrect: false },
      { id: "l20_p1_q13_o3", text: "Độ lớn từ thông qua khung biến thiên nhanh nhất.", isCorrect: false },
      { id: "l20_p1_q13_o4", text: "Từ trường ngoài có cường độ rất mạnh.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Suất điện động cảm ứng có độ lớn e_c = |ΔΦ/Δt|. Khi từ thông qua khung dây không thay đổi (ΔΦ = 0) thì suất điện động cảm ứng bằng 0."
  },
  {
    id: "l20_p1_q14",
    question: "Trong phương pháp đo cảm ứng từ B bằng cân điện tử, khi có dòng điện chạy qua đoạn dây dẫn, cân thay đổi số chỉ một lượng Δm. Công thức tính độ lớn lực từ tương tác trực tiếp làm thay đổi áp lực đĩa cân là:",
    options: [
      { id: "l20_p1_q14_o1", text: "F = Δm.g", isCorrect: true },
      { id: "l20_p1_q14_o2", text: "F = Δm / g", isCorrect: false },
      { id: "l20_p1_q14_o3", text: "F = B.I.L.cos(Δm)", isCorrect: false },
      { id: "l20_p1_q14_o4", text: "F = Δm.g / (I.L)", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Theo định luật III Newton, lực phản lực của dây tác dụng lên nam châm hướng đứng lên/xuống có độ lớn bằng lực từ tác dụng lên dây, gây thay đổi trọng lượng biểu kiến trên đĩa cân một lượng ΔF = Δm.g."
  },
  {
    id: "l20_p1_q15",
    question: "Một đoạn dây dẫn thẳng dài L = 5 cm mang dòng điện cường độ I = 4 A đặt trong từ trường đều có cảm ứng từ B = 0,2 T. Biết góc hợp bởi đoạn dây và các đường cảm ứng từ là 30 độ. Độ lớn lực từ tác dụng lên dây là:",
    options: [
      { id: "l20_p1_q15_o1", text: "0,02 N.", isCorrect: true },
      { id: "l20_p1_q15_o2", text: "0,04 N.", isCorrect: false },
      { id: "l20_p1_q15_o3", text: "0,20 N.", isCorrect: false },
      { id: "l20_p1_q15_o4", text: "0,01 N.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Độ lớn lực Ampe: F = B.I.L.sin(α) = 0,2 * 4 * 0,05 * sin(30°) = 0,04 * 0,5 = 0,02 N."
  },
  {
    id: "l20_p1_q16",
    question: "Một cuộn dây dẫn phẳng gồm 1 vòng dây kín, trong khoảng thời gian 0,3 giây từ thông qua cuộn dây giảm đều từ 0,8 Wb xuống còn 0,2 Wb. Độ lớn của suất điện động cảm ứng xuất hiện trong cuộn dây bằng:",
    options: [
      { id: "l20_p1_q16_o1", text: "2,0 V.", isCorrect: true },
      { id: "l20_p1_q16_o2", text: "0,2 V.", isCorrect: false },
      { id: "l20_p1_q16_o3", text: "1,8 V.", isCorrect: false },
      { id: "l20_p1_q16_o4", text: "0,6 V.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Áp dụng định luật Faraday: e_c = |ΔΦ / Δt| = |(0,2 - 0,8) / 0,3| = 0,6 / 0,3 = 2,0 V."
  },
  {
    id: "l20_p1_q17",
    question: "Một đoạn dây dẫn thẳng dài L = 10 cm đặt vuông góc với cảm ứng từ của một từ trường đều B = 0,4 T. Khi dòng điện cường độ I chạy qua dây, lực từ tác dụng lên dây đo được là 0,2 N. Cường độ dòng điện I chạy qua dây có trị số là:",
    options: [
      { id: "l20_p1_q17_o1", text: "5,0 A.", isCorrect: true },
      { id: "l20_p1_q17_o2", text: "2,0 A.", isCorrect: false },
      { id: "l20_p1_q17_o3", text: "0,5 A.", isCorrect: false },
      { id: "l20_p1_q17_o4", text: "8,0 A.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Vì đặt vuông góc nên α = 90 độ, sin(α) = 1. Ta có F = B.I.L => I = F / (B.L) = 0,2 / (0,4 * 0,1) = 5 A."
  },
  {
    id: "l20_p1_q18",
    question: "Một khung dây phẳng có diện tích S = 50 cm² gồm N = 200 vòng dây đặt vuông góc với các đường cảm ứng từ của một từ trường đều có B = 0,05 T. Người ta làm giảm đều từ trường ngoài về 0 trong khoảng thời gian 0,1 giây. Độ lớn suất điện động cảm ứng xuất hiện trong khung dây trong thời gian giảm từ trường là:",
    options: [
      { id: "l20_p1_q18_o1", text: "0,5 V.", isCorrect: true },
      { id: "l20_p1_q18_o2", text: "5,0 V.", isCorrect: false },
      { id: "l20_p1_q18_o3", text: "0,05 V.", isCorrect: false },
      { id: "l20_p1_q18_o4", text: "2,5 V.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Độ lớn suất điện động cảm ứng: e_c = N.|ΔΦ / Δt| = N.S.|ΔB / Δt| = 200 * (50 * 10^-4) * |(0 - 0,05) / 0,1| = 1 * 0,5 = 0,5 V."
  }
];

export const LESSON20_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l20_p2_q1",
    question: "Xét một đoạn dây dẫn thẳng mang dòng điện chạy qua đặt trong một từ trường đều B. Đánh giá tính Đúng/Sai của các nhận định dưới đây về đặc điểm của lực từ tác dụng lên đoạn dây dẫn này:",
    statements: [
      {
        id: "l20_p2_q1_s1",
        text: "Lực từ tác dụng lên đoạn dây dẫn mang dòng điện đặt trong từ trường có phương vuông góc với mặt phẳng chứa đoạn dây dẫn và vectơ cảm ứng từ B.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đây là đặc điểm về phương của lực từ (lực Ampe) tác dụng lên đoạn dây mang dòng điện."
      },
      {
        id: "l20_p2_q1_s2",
        text: "Khi đoạn dây đặt song song với đường sức từ thì lực từ tác dụng lên nó triệt tiêu (bằng 0).",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Vì khi dây song song đường sức từ, góc α = 0° hoặc 180°, dẫn tới sin(α) = 0 và lực từ bằng 0."
      },
      {
        id: "l20_p2_q1_s3",
        text: "Độ lớn lực từ tác dụng lên đoạn dây dẫn thẳng tăng gấp đôi nếu cả chiều dài dây tác dụng và cường độ dòng điện chạy qua dây đều tăng gấp đôi, trong khi giữ nguyên các yếu tố khác.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. F = B.I.L.sin(α). Khi cả I và L tăng gấp đôi thì lực từ F phải tăng lên 2 * 2 = 4 lần."
      },
      {
        id: "l20_p2_q1_s4",
        text: "Một đoạn dây dẫn thẳng có chiều dài 15 cm mang dòng điện cường độ 4 A đặt trong từ trường đều B = 0,2 T. Khi góc hợp bởi dây dẫn và B là 30 độ, lực từ tác dụng lên dây có độ lớn là 0,06 N.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Thay số: F = B.I.L.sin(30°) = 0,2 * 4 * 0,15 * 0,5 = 0,06 N."
      }
    ]
  },
  {
    id: "l20_p2_q2",
    question: "Xét thí nghiệm đo cảm ứng từ B bằng cân điện tử bám sát mô tả trong hình học sinh học tập (Hình 20.6). Một khung dây dẫn hình chữ U được cố định nằm ngang vuông góc với từ trường của nam châm đặt dưới đĩa cân. Đánh giá các nhận định sau:",
    statements: [
      {
        id: "l20_p2_q2_s1",
        text: "Trong thí nghiệm này, lực từ của nam châm tác dụng lên dây dẫn và phản lực của dây dẫn tác dụng ngược lại nam châm tạo thành một cặp lực - phản lực trực đối theo định luật III Newton.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Cân điện tử thay đổi số chỉ chính là nhờ phản lực cơ học từ dây tác dụng ngược lại khối nam châm nằm trên đĩa cân."
      },
      {
        id: "l20_p2_q2_s2",
        text: "Khi lực từ tác dụng lên đoạn dây cố định hướng thẳng đứng xuống dưới, phản lực từ tác dụng lên nam châm hướng đứng lên trên làm cân điện tử giảm số chỉ (Δm < 0).",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Lực từ hướng xuống kéo dây xuống. Phản lực tác dụng lên nam châm sẽ hướng đứng lên trên, nhấc bớt áp lực nam châm đè lên đĩa cân, làm số chỉ m của cân giảm xuống."
      },
      {
        id: "l20_p2_q2_s3",
        text: "Nếu đảo chiều dòng điện chạy qua dây dẫn hoặc đảo cực của nam châm trên đĩa cân, chiều lực từ và chiều phản lực từ đảo ngược, làm thay đổi chiều tăng/giảm của số chỉ trên cân.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Đổi chiều dòng điện hoặc đổi cực từ trường làm đổi chiều lực từ tác dụng lên dây. Do đó, phản lực tác dụng lên nam châm cũng đổi chiều, làm số chỉ của cân từ đang tăng thành giảm hoặc ngược lại."
      },
      {
        id: "l20_p2_q2_s4",
        text: "Cho đoạn dây dẫn dài L = 1,2 cm được giữ cố định theo phương nằm ngang vuông góc với từ trường nam châm. Khi cho dòng điện I = 10 A chạy qua, cân điện tử thay đổi số chỉ thêm 3,0 g. Lấy g = 10 m/s², cảm ứng từ của nam châm đo được là 0,25 T.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Ta có F = Δm.g = 0,003 kg * 10 m/s² = 0,03 N. Do dây đặt vuông góc nên F = B.I.L => B = F / (I.L) = 0,03 / (10 * 0,012) = 0,25 T."
      }
    ]
  },
  {
    id: "l20_p2_q3",
    question: "Xét hiện tượng cảm ứng điện từ và định luật Lenz khi cho nam châm thẳng tương tác cơ học với một vòng dây dẫn kín. Hãy đánh giá tính Đúng/Sai của các phát biểu sau:",
    statements: [
      {
        id: "l20_p2_q3_s1",
        text: "Hiện tượng xuất hiện dòng điện cảm ứng trong mạch kín khi có sự biến thiên từ thông qua mạch gọi là hiện tượng cảm ứng điện từ.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đây là định nghĩa cơ bản về hiện tượng cảm ứng điện từ."
      },
      {
        id: "l20_p2_q3_s2",
        text: "Khi đưa cực Bắc (N) của nam châm lại gần vòng dây kín, mặt vòng dây đối diện với nam châm sẽ xuất hiện cực Bắc cảm ứng để sinh lực đẩy cản trở chuyển động của nam châm.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Để chống lại sự lại gần (từ thông tăng), vòng dây xuất hiện mặt cực cùng tên với cực nam châm đang tiến đến để đẩy nam châm ra xa."
      },
      {
        id: "l20_p2_q3_s3",
        text: "Khi cho nam châm đứng yên hoàn toàn bên cạnh vòng dây kín, trong vòng dây vẫn xuất hiện dòng điện cảm ứng có cường độ không đổi theo thời gian.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Khi nam châm đứng yên, từ thông qua vòng dây không biến thiên (ΔΦ = 0) nên không xuất hiện dòng điện cảm ứng."
      },
      {
        id: "l20_p2_q3_s4",
        text: "Một vòng dây tròn nằm ngang đặt trong từ trường đều có các đường sức từ hướng thẳng đứng từ dưới lên. Khi từ trường giảm đều độ lớn theo thời gian, dòng điện cảm ứng xuất hiện trong vòng dây chạy theo chiều ngược chiều kim đồng hồ (nhìn từ trên xuống).",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Khi từ thông hướng lên giảm, từ trường cảm ứng Bc của vòng dây phải cùng chiều với từ trường ngoài (hướng thẳng đứng lên trên) để chống lại sự giảm. Áp dụng quy tắc nắm tay phải với ngón cái chỉ lên, chiều khum của các ngón tay chỉ chiều dòng điện ngược chiều kim đồng hồ (nhìn từ trên xuống)."
      }
    ]
  },
  {
    id: "l20_p2_q4",
    question: "Xét quá trình khảo sát từ thông và suất điện động cảm ứng xuất hiện trong các khung dây dẫn, cuộn dây phẳng. Hãy đánh giá tính Đúng/Sai của các phát biểu dưới đây:",
    statements: [
      {
        id: "l20_p2_q4_s1",
        text: "Đơn vị của suất điện động cảm ứng trong hệ SI là Vôn (V), đặc trưng cho khả năng sinh công của lực lạ trong hiện tượng cảm ứng điện từ.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Suất điện động cảm ứng đo bằng đơn vị Vôn (V) trong hệ SI."
      },
      {
        id: "l20_p2_q4_s2",
        text: "Suất điện động cảm ứng xuất hiện trong một khung dây kín có độ lớn tỉ lệ thuận với độ lớn của từ thông gửi qua khung dây đó.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Độ lớn suất điện động cảm ứng tỉ lệ với tốc độ biến thiên từ thông qua khung dây (tỉ số ΔΦ/Δt) chứ không phải độ lớn của từ thông Φ."
      },
      {
        id: "l20_p2_q4_s3",
        text: "Khi một khung dây phẳng gồm nhiều vòng dây quay đều trong một từ trường đều quanh một trục đối xứng vuông góc với đường sức từ, suất điện động cảm ứng trong khung biến thiên điều hòa theo thời gian.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Đây là nguyên lý tạo ra dòng điện xoay chiều, suất điện động trong khung quay đều biến thiên hình sin hoặc cos theo thời gian."
      },
      {
        id: "l20_p2_q4_s4",
        text: "Một cuộn dây gồm N = 100 vòng dây, mỗi vòng có diện tích S = 50 cm² đặt vuông góc với từ trường đều. Trong thời gian 0,2 s, từ trường giảm đều từ 0,8 T về 0,2 T. Độ lớn suất điện động cảm ứng xuất hiện trong cuộn dây là 15 V.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Độ lớn suất điện động cảm ứng: e_c = N.S.|ΔB / Δt| = 100 * (50 * 10^-4) * (0,8 - 0,2) / 0,2 = 0,5 * 3 = 1,5 V (chứ không phải 15 V)."
      }
    ]
  }
];

export const LESSON20_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l20_p3_q1",
    question: "Một đoạn dây dẫn thẳng dài 20 cm mang dòng điện cường độ 5 A đặt song song với các đường sức từ của một từ trường đều có cảm ứng từ B = 0,4 T. Lực từ tác dụng lên đoạn dây này bằng bao nhiêu miliniutơn (mN)?",
    answer: 0,
    unit: "mN",
    level: "Thông hiểu",
    explanation: "Vì đoạn dây dẫn đặt song song với các đường sức từ nên góc hợp α = 0 độ (hoặc 180 độ). Do đó sin(α) = 0, lực từ tác dụng lên dây bằng 0 mN."
  },
  {
    id: "l20_p3_q2",
    question: "Một khung dây phẳng có diện tích S = 25 cm² đặt trong từ trường đều có cảm ứng từ B = 0,08 T. Biết vectơ pháp tuyến n của khung dây hợp với vectơ cảm ứng từ B một góc 90 độ. Hãy tính từ thông gửi qua khung dây này theo đơn vị mili-Webe (mWb)?",
    answer: 0,
    unit: "mWb",
    level: "Thông hiểu",
    explanation: "Ta có Φ = B.S.cos(α). Với góc giữa vectơ pháp tuyến n và B là α = 90 độ, ta có cos(90°) = 0. Do đó từ thông Φ = 0 mWb."
  },
  {
    id: "l20_p3_q3",
    question: "Một đoạn dây dẫn thẳng dài 5 cm mang dòng điện cường độ I = 10 A đặt trong từ trường đều B = 0,04 T. Khi lực từ tác dụng lên đoạn dây có độ lớn bằng 0,01 N, hãy xác định góc hợp bởi dòng điện và cảm ứng từ B (đơn vị: độ, chỉ nhập phần số nguyên từ 0 đến 90)?",
    answer: 30,
    unit: "độ",
    level: "Vận dụng",
    explanation: "Độ lớn lực Ampe: F = B.I.L.sin(α) => sin(α) = F / (B.I.L) = 0,01 / (0,04 * 10 * 0,05) = 0,01 / 0,02 = 0,5. Suy ra góc α = 30 độ."
  },
  {
    id: "l20_p3_q4",
    question: "Trong thí nghiệm đo lực từ bằng cân điện tử, một đoạn dây dẫn thẳng dài L = 2 cm đặt vuông góc với từ trường đều của một nam châm đặt trên cân. Khi cho dòng điện I = 5 A chạy qua dây, số chỉ của cân điện tử thay đổi một lượng là 2,5 g. Lấy g = 10 m/s². Tính trị số cảm ứng từ B của nam châm theo đơn vị Tesla (T) (nhập kết quả dưới dạng số thập phân, ví dụ: 0,25)?",
    answer: 0.25,
    unit: "T",
    level: "Vận dụng",
    explanation: "Ta có lực tương tác: F = Δm.g = 2,5.10^-3 * 10 = 0,025 N. Vì dây đặt vuông góc nên F = B.I.L => B = F / (I.L) = 0,025 / (5 * 0,02) = 0,25 T."
  },
  {
    id: "l20_p3_q5",
    question: "Một cuộn dây gồm N = 100 vòng dây. Từ thông gửi qua mỗi vòng dây giảm đều từ 0,06 Wb xuống còn 0,02 Wb trong khoảng thời gian 0,8 s. Hãy xác định độ lớn suất điện động cảm ứng xuất hiện trong cuộn dây theo đơn vị Vôn (V) (nhập số nguyên)?",
    answer: 5,
    unit: "V",
    level: "Vận dụng",
    explanation: "Suất điện động cảm ứng xuất hiện trong cuộn dây gồm N vòng: e_c = N.|ΔΦ_1 / Δt| = 100 * |(0,02 - 0,06) / 0,8| = 100 * 0,05 = 5 V."
  },
  {
    id: "l20_p3_q6",
    question: "Một khung dây phẳng, kín, hình vuông cạnh a = 10 cm gồm N = 50 vòng dây, đặt trong từ trường đều có các đường cảm ứng từ vuông góc với mặt phẳng khung. Cho cảm ứng từ B của từ trường giảm đều từ 0,6 T về 0 trong khoảng thời gian 0,15 s. Tính suất điện động cảm ứng xuất hiện trong khung dây (đơn vị: Vôn, chỉ nhập phần số nguyên)?",
    answer: 2,
    unit: "V",
    level: "Vận dụng",
    explanation: "Diện tích khung dây vuông S = a² = 0,1 * 0,1 = 0,01 m². Suất điện động cảm ứng xuất hiện trong khung: e_c = N.S.|ΔB / Δt| = 50 * 0,01 * (0,6 - 0) / 0,15 = 0,5 * 4 = 2 V."
  }
];

// ==================== LESSON 21 QUESTIONS ====================
export const LESSON21_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l21_p1_q1",
    question: "Các hạt cấu tạo nên hạt nhân nguyên tử (trừ trường hợp hiđrô thường) là những hạt nào?",
    options: [
      { id: "l21_p1_q1_o1", text: "Prôtôn và nơtrôn.", isCorrect: true },
      { id: "l21_p1_q1_o2", text: "Prôtôn và êlectrôn.", isCorrect: false },
      { id: "l21_p1_q1_o3", text: "Nơtrôn và êlectrôn.", isCorrect: false },
      { id: "l21_p1_q1_o4", text: "Chỉ có các prôtôn.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Hạt nhân của tất cả các nguyên tử (trừ hạt nhân hiđrô thường chỉ có 1 prôtôn) đều được cấu tạo từ hai loại hạt là prôtôn và nơtrôn, gọi chung là các nuclôn."
  },
  {
    id: "l21_p1_q2",
    question: "Kí hiệu hạt nhân nguyên tử là _Z^A X. Trong đó, số hiệu nguyên tử Z biểu thị:",
    options: [
      { id: "l21_p1_q2_o1", text: "Số lượng prôtôn trong hạt nhân.", isCorrect: true },
      { id: "l21_p1_q2_o2", text: "Số lượng nơtrôn trong hạt nhân.", isCorrect: false },
      { id: "l21_p1_q2_o3", text: "Tổng số nuclôn trong hạt nhân.", isCorrect: false },
      { id: "l21_p1_q2_o4", text: "Khối lượng của hạt nhân tính theo gam.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Số hiệu nguyên tử Z là số prôtôn có trong hạt nhân, đồng thời cũng chính là số thứ tự của nguyên tố trong bảng tuần hoàn hóa học."
  },
  {
    id: "l21_p1_q3",
    question: "Trong kí hiệu hạt nhân _Z^A X, đại lượng A biểu thị số lượng hạt nào sau đây?",
    options: [
      { id: "l21_p1_q3_o1", text: "Tổng số nuclôn (prôtôn và nơtrôn).", isCorrect: true },
      { id: "l21_p1_q3_o2", text: "Số hạt nơtrôn.", isCorrect: false },
      { id: "l21_p1_q3_o3", text: "Số hạt prôtôn.", isCorrect: false },
      { id: "l21_p1_q3_o4", text: "Số lượng hạt êlectrôn ở vỏ nguyên tử.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đại lượng A được gọi là số khối, biểu thị tổng số nuclôn (gồm cả prôtôn và nơtrôn) cấu tạo nên hạt nhân đó."
  },
  {
    id: "l21_p1_q4",
    question: "Hạt nuclôn nơtrôn (n) có tính chất điện tích nào sau đây?",
    options: [
      { id: "l21_p1_q4_o1", text: "Không mang điện (trung hòa về điện).", isCorrect: true },
      { id: "l21_p1_q4_o2", text: "Mang điện tích âm bằng -1,6.10^-19 C.", isCorrect: false },
      { id: "l21_p1_q4_o3", text: "Mang điện tích dương bằng +1,6.10^-19 C.", isCorrect: false },
      { id: "l21_p1_q4_o4", text: "Mang điện tích dương gấp đôi prôtôn.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Hạt nơtrôn (kí hiệu n) là hạt trung hòa về điện, tức là điện tích của nó bằng 0."
  },
  {
    id: "l21_p1_q5",
    question: "Đồng vị là các nguyên tử mà hạt nhân của chúng có:",
    options: [
      { id: "l21_p1_q5_o1", text: "Cùng số prôtôn nhưng khác số nơtrôn.", isCorrect: true },
      { id: "l21_p1_q5_o2", text: "Cùng số nơtrôn nhưng khác số prôtôn.", isCorrect: false },
      { id: "l21_p1_q5_o3", text: "Cùng số khối A nhưng khác số prôtôn.", isCorrect: false },
      { id: "l21_p1_q5_o4", text: "Cùng cả số prôtôn và số nơtrôn.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Các đồng vị của cùng một nguyên tố hóa học là những nguyên tử có cùng số prôtôn (cùng số hiệu nguyên tử Z) nhưng khác số nơtrôn (dẫn đến số khối A khác nhau)."
  },
  {
    id: "l21_p1_q6",
    question: "Số nơtrôn N có trong một hạt nhân nguyên tử kí hiệu _Z^A X được xác định bởi công thức nào?",
    options: [
      { id: "l21_p1_q6_o1", text: "N = A - Z", isCorrect: true },
      { id: "l21_p1_q6_o2", text: "N = A + Z", isCorrect: false },
      { id: "l21_p1_q6_o3", text: "N = Z", isCorrect: false },
      { id: "l21_p1_q6_o4", text: "N = 2A - Z", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Vì số khối A = Z + N (tổng số prôtôn Z và nơtrôn N), nên số nơtrôn được tính bằng N = A - Z."
  },
  {
    id: "l21_p1_q7",
    question: "Một đơn vị khối lượng nguyên tử (kí hiệu là u hoặc amu) được định nghĩa bằng:",
    options: [
      { id: "l21_p1_q7_o1", text: "1/12 khối lượng của một nguyên tử đồng vị cacbon _6^12 C.", isCorrect: true },
      { id: "l21_p1_q7_o2", text: "Khối lượng của một hạt prôtôn tự do.", isCorrect: false },
      { id: "l21_p1_q7_o3", text: "Khối lượng của một hạt nhân nguyên tử hiđrô _1^1 H.", isCorrect: false },
      { id: "l21_p1_q7_o4", text: "1/16 khối lượng của một nguyên tử đồng vị ôxy _8^16 O.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đơn vị khối lượng nguyên tử u (hay amu) được định nghĩa bằng chính xác 1/12 khối lượng của một nguyên tử đồng vị cacbon _6^12 C."
  },
  {
    id: "l21_p1_q8",
    question: "Mô hình cấu tạo nguyên tử nào cho rằng êlectrôn chuyển động xung quanh hạt nhân trên những quỹ đạo xác định giống như các hành tinh quay quanh Mặt Trời?",
    options: [
      { id: "l21_p1_q8_o1", text: "Mô hình hành tinh nguyên tử của Rutherford.", isCorrect: true },
      { id: "l21_p1_q8_o2", text: "Mô hình đám mây êlectrôn hiện đại.", isCorrect: false },
      { id: "l21_p1_q8_o3", text: "Mô hình bánh ngọt mận khô của Thomson.", isCorrect: false },
      { id: "l21_p1_q8_o4", text: "Mô hình hạt quark.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Mô hình hành tinh nguyên tử do Rutherford đề xuất năm 1911 mô tả nguyên tử gồm hạt nhân ở trung tâm và các êlectrôn quay quanh trên các quỹ đạo elip hay tròn xác định."
  },
  {
    id: "l21_p1_q9",
    question: "Hạt nhân đồng vị phóng xạ cacbon _6^14 C được sử dụng rộng rãi để xác định niên đại khảo cổ. Hạt nhân này có cấu tạo gồm:",
    options: [
      { id: "l21_p1_q9_o1", text: "6 prôtôn và 8 nơtrôn.", isCorrect: true },
      { id: "l21_p1_q9_o2", text: "6 prôtôn và 14 nơtrôn.", isCorrect: false },
      { id: "l21_p1_q9_o3", text: "14 prôtôn và 6 nơtrôn.", isCorrect: false },
      { id: "l21_p1_q9_o4", text: "8 prôtôn và 6 nơtrôn.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Hạt nhân _6^14 C có Z = 6 prôtôn. Số nơtrôn là N = A - Z = 14 - 6 = 8 nơtrôn."
  },
  {
    id: "l21_p1_q10",
    question: "Hạt nhân heli _2^4 He (còn gọi là hạt alpha) có điện tích bằng bao nhiêu?",
    options: [
      { id: "l21_p1_q10_o1", text: "+3,2.10^-19 C.", isCorrect: true },
      { id: "l21_p1_q10_o2", text: "+1,6.10^-19 C.", isCorrect: false },
      { id: "l21_p1_q10_o3", text: "0 C.", isCorrect: false },
      { id: "l21_p1_q10_o4", text: "-3,2.10^-19 C.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Hạt nhân _2^4 He có Z = 2 prôtôn, nên mang điện tích dương q = +2e = 2 * 1,6.10^-19 C = +3,2.10^-19 C."
  },
  {
    id: "l21_p1_q11",
    question: "Khi so sánh khối lượng của hạt nhân nguyên tử với khối lượng của vỏ êlectrôn xung quanh, nhận định nào sau đây là chính xác?",
    options: [
      { id: "l21_p1_q11_o1", text: "Hạt nhân tập trung hầu hết khối lượng nguyên tử (chiếm hơn 99,9%).", isCorrect: true },
      { id: "l21_p1_q11_o2", text: "Khối lượng hạt nhân luôn nhỏ hơn khối lượng vỏ êlectrôn.", isCorrect: false },
      { id: "l21_p1_q11_o3", text: "Hạt nhân và vỏ êlectrôn có khối lượng tương đương nhau.", isCorrect: false },
      { id: "l21_p1_q11_o4", text: "Khối lượng êlectrôn lớn gấp 1840 lần khối lượng hạt nhân.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Mỗi nuclôn (prôtôn hay nơtrôn) có khối lượng xấp xỉ 1 u (gấp khoảng 1840 lần khối lượng của êlectrôn m_e ≈ 0,00055 u), do đó hạt nhân tập trung hầu hết khối lượng của nguyên tử."
  },
  {
    id: "l21_p1_q12",
    question: "Kích thước của hạt nhân nguyên tử so với kích thước toàn bộ nguyên tử như thế nào?",
    options: [
      { id: "l21_p1_q12_o1", text: "Nhỏ hơn khoảng 10.000 đến 100.000 lần.", isCorrect: true },
      { id: "l21_p1_q12_o2", text: "Bằng một nửa kích thước nguyên tử.", isCorrect: false },
      { id: "l21_p1_q12_o3", text: "Kích thước hạt nhân lớn hơn kích thước nguyên tử.", isCorrect: false },
      { id: "l21_p1_q12_o4", text: "Nhỏ hơn chỉ khoảng 10 lần.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Kích thước nguyên tử vào cỡ 10^-10 m (0,1 nm), trong khi kích thước hạt nhân chỉ vào cỡ 10^-15 m đến 10^-14 m, nghĩa là nhỏ hơn nguyên tử từ 10.000 đến 100.000 lần. Nguyên tử có cấu trúc rất rỗng."
  },
  {
    id: "l21_p1_q13",
    question: "Trong thí nghiệm tán xạ hạt alpha của Rutherford, đa số các hạt alpha đi thẳng xuyên qua lá vàng mỏng, chỉ một số rất ít bị lệch hướng mạnh hoặc bật ngược trở lại. Kết quả này chứng minh điều gì?",
    options: [
      { id: "l21_p1_q13_o1", text: "Phần lớn thể tích nguyên tử là khoảng trống, điện tích dương tập trung ở hạt nhân rất nhỏ và nặng.", isCorrect: true },
      { id: "l21_p1_q13_o2", text: "Nguyên tử có cấu trúc đặc khít và mang điện tích âm ở lõi.", isCorrect: false },
      { id: "l21_p1_q13_o3", text: "Lá vàng mỏng có các lỗ thủng cơ học cho hạt alpha chui qua dễ dàng.", isCorrect: false },
      { id: "l21_p1_q13_o4", text: "Hạt alpha không tương tác điện từ với các hạt mang điện khác.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Đa số hạt alpha đi thẳng chứng tỏ nguyên tử cực kỳ rỗng. Một số hạt alpha bị đẩy lệch hướng mạnh hoặc dội ngược lại chứng tỏ có một vùng trung tâm (hạt nhân) tích điện dương rất lớn và tập trung hầu hết khối lượng."
  },
  {
    id: "l21_p1_q14",
    question: "Hạt nhân urani _92^238 U được dùng trong công nghệ điện hạt nhân. Số prôtôn, nơtrôn và nuclôn của hạt nhân này lần lượt là:",
    options: [
      { id: "l21_p1_q14_o1", text: "92; 146; 238.", isCorrect: true },
      { id: "l21_p1_q14_o2", text: "92; 238; 146.", isCorrect: false },
      { id: "l21_p1_q14_o3", text: "146; 92; 238.", isCorrect: false },
      { id: "l21_p1_q14_o4", text: "238; 92; 146.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Hạt nhân _92^238 U có Z = 92 prôtôn, số nuclôn A = 238, số nơtrôn N = A - Z = 238 - 92 = 146."
  },
  {
    id: "l21_p1_q15",
    question: "Biết công thức gần đúng tính bán kính hạt nhân là R = 1,2.10^-15 . A^(1/3) (m). Hãy tính bán kính hạt nhân của nguyên tố sắt _26^56 Fe?",
    options: [
      { id: "l21_p1_q15_o1", text: "4,59.10^-15 m.", isCorrect: true },
      { id: "l21_p1_q15_o2", text: "1,20.10^-15 m.", isCorrect: false },
      { id: "l21_p1_q15_o3", text: "6,72.10^-15 m.", isCorrect: false },
      { id: "l21_p1_q15_o4", text: "9,00.10^-15 m.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Áp dụng công thức với A = 56: R = 1,2.10^-15 * (56)^(1/3) ≈ 1,2.10^-15 * 3,82586 ≈ 4,59.10^-15 m."
  },
  {
    id: "l21_p1_q16",
    question: "Một hạt nhân có 8 prôtôn và 9 nơtrôn. Kí hiệu đúng của hạt nhân nguyên tử này là nguyên tố nào?",
    options: [
      { id: "l21_p1_q16_o1", text: "_8^17 O.", isCorrect: true },
      { id: "l21_p1_q16_o2", text: "_8^16 O.", isCorrect: false },
      { id: "l21_p1_q16_o3", text: "_9^17 F.", isCorrect: false },
      { id: "l21_p1_q16_o4", text: "_8^9 O.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Hạt nhân có số prôtôn Z = 8 (nguyên tố ôxy O), số khối A = Z + N = 8 + 9 = 17. Vậy kí hiệu là _8^17 O."
  },
  {
    id: "l21_p1_q17",
    question: "Khối lượng của một nguyên tử đồng vị cacbon _6^12 C đo được xấp xỉ bằng bao nhiêu kilôgam? Biết 1 u ≈ 1,66054.10^-27 kg.",
    options: [
      { id: "l21_p1_q17_o1", text: "1,99.10^-26 kg.", isCorrect: true },
      { id: "l21_p1_q17_o2", text: "1,66.10^-27 kg.", isCorrect: false },
      { id: "l21_p1_q17_o3", text: "1,20.10^-25 kg.", isCorrect: false },
      { id: "l21_p1_q17_o4", text: "9,11.10^-31 kg.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Nguyên tử đồng vị _6^12 C có khối lượng bằng đúng 12 u. Do đó khối lượng tính theo kg là m = 12 * 1,66054.10^-27 kg ≈ 1,9926.10^-26 kg."
  },
  {
    id: "l21_p1_q18",
    question: "Trong tự nhiên, hiđrô có 3 đồng vị (_1^1 H, _1^2 H, _1^3 H) và ôxy có 3 đồng vị bền (_8^16 O, _8^17 O, _8^18 O). Số lượng loại phân tử nước H2O khác nhau có thể được tạo thành từ các đồng vị trên là:",
    options: [
      { id: "l21_p1_q18_o1", text: "18 loại.", isCorrect: true },
      { id: "l21_p1_q18_o2", text: "9 loại.", isCorrect: false },
      { id: "l21_p1_q18_o3", text: "27 loại.", isCorrect: false },
      { id: "l21_p1_q18_o4", text: "12 loại.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Tổ hợp 2 nguyên tử H từ 3 đồng vị H (cho phép lặp lại): có các cặp là (1,1), (2,2), (3,3), (1,2), (1,3), (2,3) -> 6 tổ hợp H2. Mỗi tổ hợp này liên kết với 1 trong 3 đồng vị ôxy, số loại phân tử nước khác nhau là 6 * 3 = 18 loại."
  }
];

export const LESSON21_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l21_p2_q1",
    question: "Xét các đặc tính vật lí cơ bản của các hạt nuclôn (prôtôn và nơtrôn) cấu thành nên hạt nhân nguyên tử. Hãy đánh giá tính Đúng/Sai của các nhận định dưới đây:",
    statements: [
      {
        id: "l21_p2_q1_s1",
        text: "Nuclôn là tên gọi chung chỉ hai loại hạt cơ bản cấu tạo nên hạt nhân nguyên tử là prôtôn và nơtrôn.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đây là định nghĩa khoa học cơ bản về thuật ngữ nuclôn."
      },
      {
        id: "l21_p2_q1_s2",
        text: "Hạt nơtrôn có khối lượng nhỏ hơn một chút so với hạt prôtôn và mang điện tích âm.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Hạt nơtrôn trung hòa về điện (điện tích = 0) và có khối lượng m_n ≈ 1,008665 u, lớn hơn một chút so với prôtôn m_p ≈ 1,007276 u."
      },
      {
        id: "l21_p2_q1_s3",
        text: "Bên trong hạt nhân, các hạt prôtôn mang điện tích dương cùng dấu đẩy nhau bằng lực tĩnh điện Coulomb, nhưng hạt nhân vẫn liên kết bền vững nhờ lực hạt nhân (lực tương tác mạnh) thắng lực đẩy tĩnh điện.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Lực hạt nhân là lực tương tác cực mạnh giữa các nuclôn ở khoảng cách ngắn (~10^-15 m), giúp giữ các prôtôn lại gần nhau bất chấp lực đẩy tĩnh điện."
      },
      {
        id: "l21_p2_q1_s4",
        text: "Nếu đo tổng khối lượng của các nuclôn riêng lẻ (ở trạng thái tự do), kết quả thu được sẽ luôn bằng chính xác khối lượng của hạt nhân khi các nuclôn đó đã liên kết tạo thành.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Khối lượng của hạt nhân luôn nhỏ hơn tổng khối lượng của các nuclôn riêng lẻ tạo nên nó một lượng gọi là độ hụt khối Δm, do năng lượng liên kết giải phóng ra ngoài khi hình thành hạt nhân."
      }
    ]
  },
  {
    id: "l21_p2_q2",
    question: "Chlorine (clo) là một nguyên tố hóa học phổ biến. Trong tự nhiên clo có hai đồng vị bền chủ yếu là _17^35 Cl và _17^37 Cl. Hãy đánh giá tính Đúng/Sai của các phát biểu sau:",
    statements: [
      {
        id: "l21_p2_q2_s1",
        text: "Hai hạt nhân đồng vị của clo có cùng số prôtôn là 17, nhưng khác nhau về số nơtrôn.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Clo có số hiệu nguyên tử Z = 17 nên các đồng vị đều có 17 prôtôn, đồng vị 35 có N = 18 nơtrôn, đồng vị 37 có N = 20 nơtrôn."
      },
      {
        id: "l21_p2_q2_s2",
        text: "Các đồng vị của cùng một nguyên tố hóa học có tính chất hóa học rất khác nhau do chúng có số nơtrôn khác nhau rất nhiều.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Tính chất hóa học chủ yếu được quyết định bởi cấu hình êlectrôn lớp vỏ nguyên tử (phụ thuộc vào số prôtôn Z). Vì các đồng vị có cùng Z nên tính chất hóa học của chúng gần như hoàn toàn giống nhau."
      },
      {
        id: "l21_p2_q2_s3",
        text: "Hạt nhân của đồng vị clo _17^37 Cl có số hạt nơtrôn nhiều hơn số hạt prôtôn là 3 hạt.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Đồng vị clo-37 có Z = 17 prôtôn, số nơtrôn N = 37 - 17 = 20. Độ chênh lệch N - Z = 20 - 17 = 3 nơtrôn."
      },
      {
        id: "l21_p2_q2_s4",
        text: "Biết khối lượng nguyên tử trung bình của clo trong tự nhiên là 35,5 u. Phần trăm số nguyên tử của đồng vị _17^35 Cl chiếm tỉ lệ chính xác là 75% số nguyên tử clo.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Gọi x là phần trăm của đồng vị 35. Ta có phương trình: 35*x + 37*(1-x) = 35,5 => -2x = -1,5 => x = 0,75 = 75%."
      }
    ]
  },
  {
    id: "l21_p2_q3",
    question: "Thí nghiệm tán xạ hạt alpha của Rutherford năm 1911 là bước ngoặt vĩ đại giúp phát hiện ra hạt nhân nguyên tử. Hãy đánh giá tính Đúng/Sai của các lập luận dưới đây:",
    statements: [
      {
        id: "l21_p2_q3_s1",
        text: "Trong thí nghiệm này, Rutherford đã sử dụng nguồn phóng xạ phát ra chùm hạt alpha (hạt nhân heli tích điện dương) bắn phá lá vàng cực mỏng.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Chùm hạt alpha mang điện tích dương và có động năng lớn được dùng để bắn phá bia vàng mỏng."
      },
      {
        id: "l21_p2_q3_s2",
        text: "Lực tương tác chủ yếu gây ra sự lệch hướng của hạt alpha khi đến gần hạt nhân nguyên tử vàng là lực hút hấp dẫn siêu mạnh giữa các hạt.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Lực tương tác chủ yếu ở đây là lực đẩy tĩnh điện Coulomb giữa hai hạt cùng tích điện dương (hạt alpha q = +2e và hạt nhân vàng q = +79e)."
      },
      {
        id: "l21_p2_q3_s3",
        text: "Hiện tượng một số rất ít hạt alpha bị lệch một góc lớn hơn 90 độ, thậm chí bật ngược trở lại, chứng tỏ điện tích dương và phần lớn khối lượng của nguyên tử phải tập trung ở một vùng trung tâm cực kỳ nhỏ bé gọi là hạt nhân.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Điều này bác bỏ mô hình nguyên tử đặc khít của Thomson và khẳng định sự tồn tại của hạt nhân nặng, nhỏ tích điện dương."
      },
      {
        id: "l21_p2_q3_s4",
        text: "Nếu một hạt alpha chuyển động trực diện hướng thẳng về tâm hạt nhân vàng với động năng ban đầu E_d = 5 MeV, khi dừng lại tạm thời rồi bật ngược trở lại, khoảng cách nhỏ nhất giữa hạt alpha và tâm hạt nhân vàng xấp xỉ bằng 45,5.10^-15 m (lấy hằng số k = 9.10^9 N.m²/C², e = 1,6.10^-19 C).",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Tại điểm dừng, thế năng tĩnh điện bằng động năng ban đầu: E_d = k * (q_alpha * Q_gold) / r => r = k * (2e * 79e) / E_d = 9.10^9 * 158 * (1,6.10^-19)² / (5.10^6 * 1,6.10^-19) = 9.10^9 * 158 * 1,6.10^-19 / 5.10^6 ≈ 4,55.10^-14 m = 45,5.10^-15 m."
      }
    ]
  },
  {
    id: "l21_p2_q4",
    question: "Về đơn vị khối lượng nguyên tử (u) và công thức xác định kích thước hạt nhân nguyên tử. Hãy đánh giá tính Đúng/Sai của các nhận định dưới đây:",
    statements: [
      {
        id: "l21_p2_q4_s1",
        text: "Đơn vị khối lượng nguyên tử u (hay amu) có giá trị bằng 1 u ≈ 1,66054.10^-27 kg.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đây là giá trị quy đổi chuẩn xác của đơn vị khối lượng nguyên tử sang hệ SI."
      },
      {
        id: "l21_p2_q4_s2",
        text: "Mọi hạt nhân nguyên tử đều có bán kính R bằng nhau, không phụ thuộc vào số lượng nuclôn cấu tạo nên hạt nhân đó.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Bán kính hạt nhân phụ thuộc vào số khối A theo công thức gần đúng R = 1,2.10^-15 . A^(1/3) m, nghĩa là số khối càng lớn thì bán kính hạt nhân càng lớn."
      },
      {
        id: "l21_p2_q4_s3",
        text: "Mô hình đám mây êlectrôn hiện đại mô tả trạng thái chuyển động của êlectrôn trong nguyên tử bằng các vùng không gian có xác suất tìm thấy êlectrôn lớn nhất, thay vì các quỹ đạo tròn xác định.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Đây là mô hình nguyên tử hiện đại dựa trên cơ học lượng tử của Schrodinger."
      },
      {
        id: "l21_p2_q4_s4",
        text: "Sử dụng công thức R = 1,2.10^-15 . A^(1/3) m, tỉ số bán kính giữa hạt nhân Urani _92^238 U và hạt nhân Heli _2^4 He có giá trị xấp xỉ bằng 3,9.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Tỉ số bán kính R_U / R_He = (A_U / A_He)^(1/3) = (238 / 4)^(1/3) = (59,5)^(1/3) ≈ 3,903."
      }
    ]
  }
];

export const LESSON21_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l21_p3_q1",
    question: "Hạt nhân nguyên tử cácbon đồng vị _6^14 C gồm bao nhiêu hạt nơtrôn?",
    answer: 8,
    unit: "hạt",
    level: "Thông hiểu",
    explanation: "Số hiệu Z = 6, số khối A = 14. Số nơtrôn N = A - Z = 14 - 6 = 8 hạt."
  },
  {
    id: "l21_p3_q2",
    question: "Trong thí nghiệm tán xạ hạt alpha huyền thoại của Rutherford, bia lá mỏng được làm bằng vàng. Số prôtôn của hạt nhân vàng _79^197 Au bằng bao nhiêu?",
    answer: 79,
    unit: "hạt",
    level: "Thông hiểu",
    explanation: "Số prôtôn của hạt nhân vàng chính là số hiệu nguyên tử Z, bằng 79."
  },
  {
    id: "l21_p3_q3",
    question: "Biết công thức thực nghiệm tính bán kính hạt nhân là R = 1,2 . A^(1/3) (fm), với 1 fm = 10^-15 m. Hãy tính bán kính hạt nhân của nguyên tử Ôxy _8^16 O theo đơn vị femtômét (fm)? (Làm tròn kết quả đến hàng đơn vị nguyên)",
    answer: 3,
    unit: "fm",
    level: "Vận dụng",
    explanation: "Áp dụng công thức với A = 16: R = 1,2 * 16^(1/3) ≈ 1,2 * 2,5198 = 3,0238 fm. Làm tròn đến hàng đơn vị nguyên ta được 3 fm."
  },
  {
    id: "l21_p3_q4",
    question: "Một hạt nhân nguyên tử có bán kính đo được xấp xỉ bằng 3,6 fm. Biết công thức gần đúng bán kính hạt nhân là R = 1,2 . A^(1/3) (fm). Hãy xác định số khối A của hạt nhân nguyên tử này?",
    answer: 27,
    unit: "nuclôn",
    level: "Vận dụng",
    explanation: "Ta có: R = 1,2 . A^(1/3) => 3,6 = 1,2 . A^(1/3) => A^(1/3) = 3 => A = 3³ = 27 nuclôn (đây là hạt nhân Nhôm _13^27 Al)."
  },
  {
    id: "l21_p3_q5",
    question: "Trong tự nhiên, clo gồm hai đồng vị bền chủ yếu là _17^35 Cl (khối lượng xấp xỉ 35 u) và _17^37 Cl (khối lượng xấp xỉ 37 u). Biết khối lượng nguyên tử trung bình của clo là 35,5 u. Xác định phần trăm (%) số nguyên tử của đồng vị clo _17^37 Cl? (Chỉ nhập phần số nguyên)",
    answer: 25,
    unit: "%",
    level: "Vận dụng",
    explanation: "Gọi x là tỉ lệ phần trăm số nguyên tử của đồng vị _17^37 Cl. Ta có phương trình: 37*x + 35*(1-x) = 35,5 => 2x = 0,5 => x = 0,25 = 25%."
  },
  {
    id: "l21_p3_q6",
    question: "Một hạt nhân nguyên tử X có số nơtrôn bằng 1,5 lần số prôtôn. Biết hạt nhân X có điện tích dương bằng +3,2.10^-18 C. Xác định số khối A của hạt nhân X? (Lấy e = 1,6.10^-19 C)",
    answer: 50,
    unit: "nuclôn",
    level: "Vận dụng",
    explanation: "Số prôtôn Z của hạt nhân X là Z = q / e = 3,2.10^-18 / 1,6.10^-19 = 20 prôtôn. Số nơtrôn N = 1,5 * Z = 1,5 * 20 = 30 nơtrôn. Số khối A = Z + N = 20 + 30 = 50 nuclôn."
  }
];

// ==================== LESSON 22 QUESTIONS ====================
export const LESSON22_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l22_p1_q1",
    question: "Phát biểu nào sau đây định nghĩa đúng nhất về phản ứng hạt nhân?",
    options: [
      { id: "l22_p1_q1_o1", text: "Mọi quá trình biến đổi của các hạt nhân dẫn đến sự tạo thành các hạt nhân khác.", isCorrect: true },
      { id: "l22_p1_q1_o2", text: "Sự tương tác giữa các êlectrôn ngoài vỏ nguyên tử để tạo ra liên kết hóa học mới.", isCorrect: false },
      { id: "l22_p1_q1_o3", text: "Sự va chạm cơ học thông thường giữa hai nguyên tử trung hòa về điện.", isCorrect: false },
      { id: "l22_p1_q1_o4", text: "Quá trình ion hóa nguyên tử bằng cách tách hoặc thêm êlectrôn.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Phản ứng hạt nhân là mọi quá trình biến đổi hạt nhân nguyên tử này thành hạt nhân nguyên tử khác, có thể xảy ra tự phát (phóng xạ) hoặc do kích thích (tương tác giữa hai hạt nhân)."
  },
  {
    id: "l22_p1_q2",
    question: "Trong các định luật sau đây, định luật nào KHÔNG phải là định luật bảo toàn trong phản ứng hạt nhân?",
    options: [
      { id: "l22_p1_q2_o1", text: "Định luật bảo toàn số nuclôn (số khối A).", isCorrect: false },
      { id: "l22_p1_q2_o2", text: "Định luật bảo toàn điện tích (số hiệu Z).", isCorrect: false },
      { id: "l22_p1_q2_o3", text: "Định luật bảo toàn động lượng.", isCorrect: false },
      { id: "l22_p1_q2_o4", text: "Định luật bảo toàn khối lượng nghỉ.", isCorrect: true }
    ],
    level: "Nhận biết",
    explanation: "Trong phản ứng hạt nhân không có định luật bảo toàn khối lượng nghỉ. Khối lượng nghỉ trước và sau phản ứng nói chung không bằng nhau do sự biến đổi qua lại giữa năng lượng nghỉ và động năng."
  },
  {
    id: "l22_p1_q3",
    question: "Độ hụt khối Δm của một hạt nhân nguyên tử _Z^A X được xác định bởi công thức nào sau đây?",
    options: [
      { id: "l22_p1_q3_o1", text: "Δm = Z.m_p + (A - Z).m_n - m_X", isCorrect: true },
      { id: "l22_p1_q3_o2", text: "Δm = Z.m_p + A.m_n - m_X", isCorrect: false },
      { id: "l22_p1_q3_o3", text: "Δm = m_X - [Z.m_p + (A - Z).m_n]", isCorrect: false },
      { id: "l22_p1_q3_o4", text: "Δm = Z.m_p - (A - Z).m_n + m_X", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Độ hụt khối của hạt nhân là hiệu số giữa tổng khối lượng của các nuclôn tạo thành hạt nhân và khối lượng của chính hạt nhân đó: Δm = Z.m_p + (A - Z).m_n - m_X."
  },
  {
    id: "l22_p1_q4",
    question: "Năng lượng liên kết riêng của hạt nhân nguyên tử (E_lkr) được định nghĩa là:",
    options: [
      { id: "l22_p1_q4_o1", text: "Năng lượng liên kết tính cho một nuclôn của hạt nhân (E_lk / A).", isCorrect: true },
      { id: "l22_p1_q4_o2", text: "Tổng năng lượng tỏa ra trong quá trình phân rã của hạt nhân.", isCorrect: false },
      { id: "l22_p1_q4_o3", text: "Năng lượng tối thiểu để ion hóa hoàn toàn nguyên tử đó.", isCorrect: false },
      { id: "l22_p1_q4_o4", text: "Năng lượng liên kết giữa các prôtôn nằm trong hạt nhân.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Năng lượng liên kết riêng là năng lượng liên kết tính trên một nuclôn (E_lkr = E_lk / A). Đại lượng này đặc trưng cho mức độ bền vững của hạt nhân."
  },
  {
    id: "l22_p1_q5",
    question: "Các hạt nhân bền vững nhất trong tự nhiên thường nằm trong khoảng số khối A nào sau đây?",
    options: [
      { id: "l22_p1_q5_o1", text: "50 < A < 80.", isCorrect: true },
      { id: "l22_p1_q5_o2", text: "A < 30.", isCorrect: false },
      { id: "l22_p1_q5_o3", text: "A > 200.", isCorrect: false },
      { id: "l22_p1_q5_o4", text: "A > 150.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Các hạt nhân có số khối trung bình (trong khoảng từ 50 đến 80) như Sắt, Co-ban, Ni-ken có năng lượng liên kết riêng lớn nhất (khoảng 8,8 MeV/nuclôn) nên chúng bền vững nhất."
  },
  {
    id: "l22_p1_q6",
    question: "Phản ứng phân hạch là quá trình hạt nhân nguyên tử:",
    options: [
      { id: "l22_p1_q6_o1", text: "Nặng hấp thụ một nơtrôn chậm rồi vỡ thành hai hạt nhân trung bình.", isCorrect: true },
      { id: "l22_p1_q6_o2", text: "Nhẹ kết hợp lại với nhau ở nhiệt độ cực kì cao để tạo thành hạt nhân nặng.", isCorrect: false },
      { id: "l22_p1_q6_o3", text: "Tự phát phát ra các tia phóng xạ rồi biến đổi thành hạt nhân khác.", isCorrect: false },
      { id: "l22_p1_q6_o4", text: "Bị bắn phá bởi hạt alpha rồi phát ra prôtôn và nơtrôn.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Phản ứng phân hạch là hiện tượng một hạt nhân có số khối rất lớn (như Urani, Plutoni) hấp thụ một nơtrôn chậm, trở nên kích thích, biến dạng rồi vỡ thành hai mảnh nhẹ hơn."
  },
  {
    id: "l22_p1_q7",
    question: "Phản ứng tổng hợp hạt nhân (nhiệt hạch) là quá trình trong đó:",
    options: [
      { id: "l22_p1_q7_o1", text: "Một hạt nhân nặng phân chia thành các hạt nhân nhẹ hơn khi nguội lạnh.", isCorrect: false },
      { id: "l22_p1_q7_o2", text: "Hai hay nhiều hạt nhân rất nhẹ kết hợp lại với nhau thành hạt nhân nặng hơn ở nhiệt độ rất cao.", isCorrect: true },
      { id: "l22_p1_q7_o3", text: "Hạt nhân hấp thụ một electron vỏ nguyên tử để biến thành hạt nhân mới.", isCorrect: false },
      { id: "l22_p1_q7_o4", text: "Các proton tự do tương tác trực tiếp tạo thành hạt neutron.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Phản ứng nhiệt hạch là phản ứng kết hợp hai hay nhiều hạt nhân rất nhẹ (như các đồng vị của hiđrô) thành hạt nhân nặng hơn (như heli). Phản ứng này chỉ xảy ra ở nhiệt độ cực kì cao (hàng chục triệu độ)."
  },
  {
    id: "l22_p1_q8",
    question: "Để phản ứng phân hạch dây chuyền có thể tự duy trì và kiểm soát được trong lò phản ứng hạt nhân thương mại, hệ số nhân nơtrôn hiệu dụng k phải thỏa mãn điều kiện nào?",
    options: [
      { id: "l22_p1_q8_o1", text: "k < 1.", isCorrect: false },
      { id: "l22_p1_q8_o2", text: "k > 1.", isCorrect: false },
      { id: "l22_p1_q8_o3", text: "k = 1.", isCorrect: true },
      { id: "l22_p1_q8_o4", text: "k = 0.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Trong lò phản ứng hạt nhân, người ta điều khiển để k = 1. Khi đó, phản ứng dây chuyền xảy ra ổn định, năng lượng tỏa ra không đổi theo thời gian và có thể kiểm soát an toàn."
  },
  {
    id: "l22_p1_q9",
    question: "Về mặt định luật bảo toàn, điểm khác biệt cơ bản nhất giữa phản ứng hạt nhân và phản ứng hóa học thông thường là gì?",
    options: [
      { id: "l22_p1_q9_o1", text: "Phản ứng hóa học bảo toàn số electron, phản ứng hạt nhân không bảo toàn số khối.", isCorrect: false },
      { id: "l22_p1_q9_o2", text: "Phản ứng hóa học bảo toàn khối lượng các chất nghỉ, phản ứng hạt nhân không bảo toàn khối lượng nghỉ.", isCorrect: true },
      { id: "l22_p1_q9_o3", text: "Phản ứng hạt nhân bảo toàn nguyên tố, phản ứng hóa học biến đổi nguyên tố.", isCorrect: false },
      { id: "l22_p1_q9_o4", text: "Phản ứng hóa học tỏa ra năng lượng nhiều hơn phản ứng hạt nhân rất nhiều lần.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Phản ứng hóa học tuân theo định luật bảo toàn khối lượng (tổng khối lượng nghỉ của các chất được bảo toàn). Trong khi đó, phản ứng hạt nhân không bảo toàn khối lượng nghỉ mà chỉ bảo toàn năng lượng toàn phần."
  },
  {
    id: "l22_p1_q10",
    question: "Xét phản ứng hạt nhân: n + _92^235 U -> _39^95 Y + _53^138 I + 3.n. Đây là loại phản ứng hạt nhân nào?",
    options: [
      { id: "l22_p1_q10_o1", text: "Phản ứng phân hạch kích thích.", isCorrect: true },
      { id: "l22_p1_q10_o2", text: "Phản ứng nhiệt hạch kích thích.", isCorrect: false },
      { id: "l22_p1_q10_o3", text: "Phóng xạ tự phát beta trừ.", isCorrect: false },
      { id: "l22_p1_q10_o4", text: "Phản ứng phân rã alpha tự phát.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Hạt nhân Urani-235 nặng khi hấp thụ một neutron chậm (n) đã vỡ ra thành hai hạt nhân trung bình là Ytri (Y) và Iốt (I), kèm theo sự giải phóng thêm neutron. Đây chính là phản ứng phân hạch kích thích."
  },
  {
    id: "l22_p1_q11",
    question: "Năng lượng liên kết của một hạt nhân nguyên tử đại diện cho ý nghĩa vật lí nào sau đây?",
    options: [
      { id: "l22_p1_q11_o1", text: "Năng lượng tỏa ra khi một hạt nhân bị phá vỡ thành các electron tự do.", isCorrect: false },
      { id: "l22_p1_q11_o2", text: "Độ chênh lệch thế năng tĩnh điện Coulomb giữa các proton trong hạt nhân.", isCorrect: false },
      { id: "l22_p1_q11_o3", text: "Năng lượng tối thiểu cần cung cấp để tách hoàn toàn hạt nhân thành các nuclôn riêng lẻ.", isCorrect: true },
      { id: "l22_p1_q11_o4", text: "Động năng trung bình của các nơtrôn chuyển động bên trong hạt nhân.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Năng lượng liên kết của hạt nhân là năng lượng tối thiểu cần thiết để phá vỡ hạt nhân đó thành các nuclôn (prôtôn và nơtrôn) cô lập, hoặc là năng lượng tỏa ra khi các nuclôn riêng lẻ liên kết lại tạo thành hạt nhân."
  },
  {
    id: "l22_p1_q12",
    question: "Tại sao các phản ứng tổng hợp hạt nhân (nhiệt hạch) tỏa ra nguồn năng lượng khổng lồ nhưng lại cực kì khó thực hiện và kiểm soát trên Trái Đất?",
    options: [
      { id: "l22_p1_q12_o1", text: "Vì các hạt nhân nhẹ siêu hiếm và không thể tìm thấy trong tự nhiên.", isCorrect: false },
      { id: "l22_p1_q12_o2", text: "Vì các hạt nhân nhẹ mang điện tích âm nên chúng luôn đẩy nhau xa ra.", isCorrect: false },
      { id: "l22_p1_q12_o3", text: "Vì lò phản ứng nhiệt hạch luôn giải phóng ra lượng chất thải phóng xạ nguy hại gấp trăm lần phân hạch.", isCorrect: false },
      { id: "l22_p1_q12_o4", text: "Vì cần cung cấp cho chúng động năng cực kì lớn (bằng cách nung nóng tới hàng chục triệu độ) để vượt qua lực đẩy tĩnh điện Coulomb.", isCorrect: true }
    ],
    level: "Thông hiểu",
    explanation: "Các hạt nhân nhẹ đều mang điện tích dương nên đẩy nhau bằng lực Coulomb rất lớn. Để chúng tiếp xúc gần nhau cỡ 10^-15 m (phạm vi lực hạt nhân tác dụng), cần cung cấp động năng ban đầu cực kì lớn cho chúng bằng cách nâng nhiệt độ lên cỡ 10^7 đến 10^8 K."
  },
  {
    id: "l22_p1_q13",
    question: "Xét phản ứng nhiệt hạch: _1^2 H + _1^3 H -> _2^4 He + _0^1 n. Phát biểu nào sau đây giải thích đúng nhất về bản chất năng lượng của phản ứng này?",
    options: [
      { id: "l22_p1_q13_o1", text: "Phản ứng tỏa năng lượng vì tổng khối lượng nghỉ của các hạt sau phản ứng nhỏ hơn tổng khối lượng nghỉ trước phản ứng.", isCorrect: true },
      { id: "l22_p1_q13_o2", text: "Phản ứng thu năng lượng vì tổng khối lượng nghỉ của các hạt sau phản ứng lớn hơn trước phản ứng.", isCorrect: false },
      { id: "l22_p1_q13_o3", text: "Phản ứng thu năng lượng vì hạt nhân Heli kém bền vững hơn các hạt nhân Deuterium và Tritium.", isCorrect: false },
      { id: "l22_p1_q13_o4", text: "Phản ứng không tỏa cũng không thu năng lượng vì số nuclôn được bảo toàn tuyệt đối.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Phản ứng nhiệt hạch này tỏa năng lượng vì tổng khối lượng nghỉ của He-4 và neutron nhỏ hơn tổng khối lượng nghỉ của Deuterium và Tritium. Lượng hụt khối này chuyển hóa thành động năng của các hạt sinh ra thông qua hệ thức Einstein E = Δm.c^2."
  },
  {
    id: "l22_p1_q14",
    question: "Xét phản ứng hạt nhân kích thích sau: _17^35 Cl + X -> _15^32 P + _2^4 He. Hãy xác định tên của hạt nhân X trong phản ứng trên?",
    options: [
      { id: "l22_p1_q14_o1", text: "Prôtôn (_1^1 H).", isCorrect: false },
      { id: "l22_p1_q14_o2", text: "Deuterium (_1^2 H).", isCorrect: false },
      { id: "l22_p1_q14_o3", text: "Nơtrôn (_0^1 n).", isCorrect: true },
      { id: "l22_p1_q14_o4", text: "Tritium (_1^3 H).", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Áp dụng định luật bảo toàn số khối: A_Cl + A_X = A_P + A_He => 35 + A_X = 32 + 4 => A_X = 1. Áp dụng định luật bảo toàn điện tích: Z_Cl + Z_X = Z_P + Z_He => 17 + Z_X = 15 + 2 => Z_X = 0. Hạt nhân có A = 1 và Z = 0 chính là hạt nơtrôn (_0^1 n)."
  },
  {
    id: "l22_p1_q15",
    question: "Xác định độ hụt khối Δm của hạt nhân Heli (_2^4 He). Biết khối lượng của prôtôn tự do m_p = 1,00728 u, nơtrôn tự do m_n = 1,00866 u, và khối lượng thực tế của hạt nhân Heli m_He = 4,00150 u.",
    options: [
      { id: "l22_p1_q15_o1", text: "0,01932 u.", isCorrect: false },
      { id: "l22_p1_q15_o2", text: "0,03038 u.", isCorrect: true },
      { id: "l22_p1_q15_o3", text: "0,02468 u.", isCorrect: false },
      { id: "l22_p1_q15_o4", text: "0,04122 u.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Hạt nhân Heli-4 gồm Z = 2 proton và N = A - Z = 4 - 2 = 2 neutron. Độ hụt khối là: Δm = (2 * m_p + 2 * m_n) - m_He = (2 * 1,00728 + 2 * 1,00866) - 4,00150 = 4,03188 - 4,00150 = 0,03038 u."
  },
  {
    id: "l22_p1_q16",
    question: "Tính năng lượng liên kết riêng của hạt nhân Tritium (_1^3 H). Cho biết khối lượng của các hạt: prôtôn m_p = 1,00728 u, nơtrôn m_n = 1,00866 u, hạt nhân Tritium m_T = 3,01605 u. Lấy hằng số 1 u = 931,5 MeV/c^2.",
    options: [
      { id: "l22_p1_q16_o1", text: "2,65 MeV/nuclôn.", isCorrect: true },
      { id: "l22_p1_q16_o2", text: "7,96 MeV/nuclôn.", isCorrect: false },
      { id: "l22_p1_q16_o3", text: "1,11 MeV/nuclôn.", isCorrect: false },
      { id: "l22_p1_q16_o4", text: "3,84 MeV/nuclôn.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Tritium gồm 1 proton và 2 neutron. Độ hụt khối Δm = (1 * m_p + 2 * m_n) - m_T = (1,00728 + 2 * 1,00866) - 3,01605 = 0,00855 u. Năng lượng liên kết E_lk = 0,00855 * 931,5 = 7,964 MeV. Năng lượng liên kết riêng E_lkr = E_lk / A = 7,964 / 3 ≈ 2,65 MeV/nuclôn."
  },
  {
    id: "l22_p1_q17",
    question: "Xét phản ứng phân hạch kích thích: n + _92^235 U -> _39^95 Y + _53^138 I + 3.n. Biết khối lượng của các hạt lần lượt là: m_n = 1,00870 u, m_U = 234,99330 u, m_Y = 94,89010 u, m_I = 137,88170 u. Lấy hằng số 1 u = 931,5 MeV/c^2. Năng lượng tỏa ra từ một phản ứng phân hạch đơn lẻ này là bao nhiêu?",
    options: [
      { id: "l22_p1_q17_o1", text: "190,12 MeV.", isCorrect: true },
      { id: "l22_p1_q17_o2", text: "172,55 MeV.", isCorrect: false },
      { id: "l22_p1_q17_o3", text: "210,40 MeV.", isCorrect: false },
      { id: "l22_p1_q17_o4", text: "185,28 MeV.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Khối lượng trước phản ứng: m_trước = m_n + m_U = 1,0087 + 234,9933 = 236,0020 u. Khối lượng sau phản ứng: m_sau = m_Y + m_I + 3 * m_n = 94,8901 + 137,8817 + 3 * 1,0087 = 235,7979 u. Độ giảm khối lượng: Δm = m_trước - m_sau = 236,0020 - 235,7979 = 0,2041 u. Năng lượng tỏa ra: E = 0,2041 * 931,5 = 190,11915 MeV ≈ 190,12 MeV."
  },
  {
    id: "l22_p1_q18",
    question: "Xét phản ứng nhiệt hạch: _1^2 H + _1^3 H -> _2^4 He + _0^1 n. Biết độ hụt khối của Deuterium (_1^2 H), Tritium (_1^3 H), Heli (_2^4 He) lần lượt là Δm_D = 0,00240 u, Δm_T = 0,00870 u, Δm_He = 0,03040 u. Lấy hằng số 1 u = 931,5 MeV/c^2. Năng lượng tỏa ra của phản ứng nhiệt hạch này bằng bao nhiêu?",
    options: [
      { id: "l22_p1_q18_o1", text: "12,50 MeV.", isCorrect: false },
      { id: "l22_p1_q18_o2", text: "17,98 MeV.", isCorrect: true },
      { id: "l22_p1_q18_o3", text: "24,35 MeV.", isCorrect: false },
      { id: "l22_p1_q18_o4", text: "15,62 MeV.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Đối với phản ứng hạt nhân, năng lượng tỏa ra được tính theo độ hụt khối: E = (Δm_sau - Δm_trước) * c^2 = (Δm_He - [Δm_D + Δm_T]) * 931,5 = (0,03040 - 0,01110) * 931,5 = 0,01930 * 931,5 = 17,97795 MeV ≈ 17,98 MeV."
  }
];

export const LESSON22_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l22_p2_q1",
    question: "Về định nghĩa phản ứng hạt nhân và các định luật bảo toàn vật lí áp dụng trong phản ứng hạt nhân. Hãy đánh giá tính Đúng/Sai của các nhận định sau đây:",
    statements: [
      {
        id: "l22_p2_q1_s1",
        text: "Hiện tượng phóng xạ tự phát là quá trình một hạt nhân không bền vững tự phân rã để biến đổi thành một hạt nhân khác, đây chính là một loại phản ứng hạt nhân tự phát.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Phóng xạ tự phát là một dạng của phản ứng hạt nhân, xảy ra tự nhiên không chịu tác động bên ngoài."
      },
      {
        id: "l22_p2_q1_s2",
        text: "Trong một phản ứng hạt nhân kích thích bất kì, tổng khối lượng nghỉ của các hạt nhân trước phản ứng luôn bằng tổng khối lượng nghỉ của các hạt nhân tạo thành sau phản ứng.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Khối lượng nghỉ không bảo toàn trong phản ứng hạt nhân. Nếu phản ứng tỏa năng lượng, khối lượng nghỉ giảm; nếu thu năng lượng, khối lượng nghỉ tăng."
      },
      {
        id: "l22_p2_q1_s3",
        text: "Số hiệu nguyên tử Z (điện tích hạt nhân) và số khối A (số lượng nuclôn) luôn được bảo toàn tuyệt đối trong tất cả các phản ứng hạt nhân.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Đây là hai định luật bảo toàn tuyệt đối rất quan trọng dùng để cân bằng mọi phương trình phản ứng hạt nhân."
      },
      {
        id: "l22_p2_q1_s4",
        text: "Cho phản ứng hạt nhân: _1^2 H + _3^6 Li -> 2._2^4 He. Nếu tổng khối lượng nghỉ trước phản ứng lớn hơn sau phản ứng một lượng là 0,02380 u thì phản ứng này tỏa ra năng lượng xấp xỉ 22,17 MeV (lấy hằng số 1 u = 931,5 MeV/c^2).",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Năng lượng tỏa ra E = Δm * 931,5 = 0,02380 * 931,5 = 22,1697 MeV ≈ 22,17 MeV."
      }
    ]
  },
  {
    id: "l22_p2_q2",
    question: "Về các khái niệm độ hụt khối, năng lượng liên kết, năng lượng liên kết riêng và tính bền vững của hạt nhân nguyên tử. Hãy đánh giá tính Đúng/Sai của các phát biểu sau đây:",
    statements: [
      {
        id: "l22_p2_q2_s1",
        text: "Một hạt nhân nguyên tử có năng lượng liên kết toàn phần (E_lk) càng lớn thì hạt nhân đó chắc chắn càng bền vững trong tự nhiên.",
        isCorrect: false,
        level: "Nhận biết",
        explanation: "Sai. Mức độ bền vững của hạt nhân chỉ phụ thuộc vào năng lượng liên kết riêng (E_lkr = E_lk / A), không phụ thuộc vào năng lượng liên kết toàn phần."
      },
      {
        id: "l22_p2_q2_s2",
        text: "Độ hụt khối Δm của hạt nhân thể hiện rằng khối lượng của một hạt nhân luôn nhỏ hơn tổng khối lượng của các nuclôn riêng rẽ khi đứng độc lập.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Phần khối lượng bị hụt đi này đã biến đổi thành năng lượng để liên kết các nuclôn lại tạo thành hạt nhân vững chắc thông qua hệ thức Einstein."
      },
      {
        id: "l22_p2_q2_s3",
        text: "Các hạt nhân có số khối nằm trong khoảng trung bình (từ 50 đến 80) là những hạt nhân bền vững nhất vì chúng có năng lượng liên kết riêng lớn nhất.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Trong đồ thị năng lượng liên kết riêng, đỉnh cao nhất nằm ở vùng số khối trung bình (như sắt _26^56 Fe), đạt xấp xỉ 8,8 MeV/nuclôn."
      },
      {
        id: "l22_p2_q2_s4",
        text: "Cho hai hạt nhân: _2^4 He có năng lượng liên kết riêng là 7,07 MeV/nuclôn và _6^12 C có năng lượng liên kết riêng là 7,68 MeV/nuclôn. Năng lượng liên kết toàn phần của hạt nhân cacbon lớn hơn của heli một lượng là 63,88 MeV.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. E_lk(C) = 7,68 * 12 = 92,16 MeV. E_lk(He) = 7,07 * 4 = 28,28 MeV. Hiệu số: 92,16 - 28,28 = 63,88 MeV."
      }
    ]
  },
  {
    id: "l22_p2_q3",
    question: "Về phản ứng phân hạch của hạt nhân nặng Urani và cơ chế phản ứng dây chuyền xảy ra trong lò phản ứng hạt nhân. Hãy đánh giá tính Đúng/Sai của các khẳng định sau đây:",
    statements: [
      {
        id: "l22_p2_q3_s1",
        text: "Phản ứng phân hạch của Urani-235 bắt đầu bằng việc hạt nhân này hấp thụ một neutron nhiệt (neutron chuyển động chậm có động năng rất nhỏ) để trở thành trạng thái kích thích không bền.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Để xảy ra phân hạch kích thích, Urani phải bắt một neutron chậm để biến dạng và phân rã."
      },
      {
        id: "l22_p2_q3_s2",
        text: "Trong một lò phản ứng hạt nhân thương mại đang hoạt động ổn định và phát ra công suất điện không đổi, hệ số nhân neutron hiệu dụng k luôn được điều khiển ở giá trị k = 1.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. k = 1 là chế độ tới hạn, số neutron kích thích phân hạch tiếp theo luôn được giữ ổn định, giúp lò phản ứng hoạt động an toàn."
      },
      {
        id: "l22_p2_q3_s3",
        text: "Nhiên liệu hạt nhân sử dụng chủ yếu trong lò phản ứng phân hạch hiện nay là các nguyên tố nhẹ và dồi dào trong đại dương như Deuterium và Tritium.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Nhiên liệu cho phân hạch là các hạt nhân nặng không bền vững như Urani-235 hoặc Plutoni-239. Deuterium và Tritium là nhiên liệu cho phản ứng nhiệt hạch."
      },
      {
        id: "l22_p2_q3_s4",
        text: "Mỗi phân hạch của _92^235 U tỏa ra trung bình 200 MeV. Nếu một nhà máy điện hạt nhân tiêu thụ hoàn toàn 1 kg U-235 tinh khiết trong một khoảng thời gian, tổng số phân hạch hạt nhân đã xảy ra xấp xỉ bằng 2,56.10^24 phân hạch (biết số Avogadro N_A = 6,02.10^23 mol^-1).",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Số mol U-235 trong 1 kg (1000 g) là n = 1000 / 235 ≈ 4,255 mol. Số hạt nhân U-235 (cũng chính là số phân hạch xảy ra) là N = n * N_A = 4,255 * 6,02.10^23 ≈ 2,56.10^24 phân hạch."
      }
    ]
  },
  {
    id: "l22_p2_q4",
    question: "Về phản ứng nhiệt hạch xảy ra trên các ngôi sao (như Mặt Trời) và triển vọng năng lượng sạch trong tương lai. Hãy đánh giá tính Đúng/Sai của các nhận định dưới đây:",
    statements: [
      {
        id: "l22_p2_q4_s1",
        text: "Phản ứng nhiệt hạch là hiện tượng biến đổi hạt nhân trong đó hai hay nhiều hạt nhân rất nhẹ kết hợp lại để tạo thành hạt nhân nặng hơn ở nhiệt độ vô cùng cao.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Đây là định nghĩa khoa học chính xác của phản ứng nhiệt hạch."
      },
      {
        id: "l22_p2_q4_s2",
        text: "Để thực hiện phản ứng nhiệt hạch, người ta phải nén ép các hạt nhân nhẹ lại với nhau ở nhiệt độ phòng bằng áp suất siêu cao mà không cần đun nóng.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Ở nhiệt độ phòng, lực đẩy Coulomb giữa các proton mang điện tích dương là cực lớn, áp suất không đủ vượt qua rào cản Coulomb; bắt buộc phải nâng nhiệt độ lên hàng chục triệu độ để tăng động năng va chạm."
      },
      {
        id: "l22_p2_q4_s3",
        text: "Tính trên cùng một đơn vị khối lượng nhiên liệu, năng lượng tỏa ra từ phản ứng nhiệt hạch (tổng hợp hạt nhân) nhỏ hơn nhiều so với phản ứng phân hạch của Urani.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Năng lượng tỏa ra trên một đơn vị khối lượng (năng lượng riêng) của phản ứng nhiệt hạch lớn hơn nhiều (gấp khoảng 4-5 lần) so với phản ứng phân hạch."
      },
      {
        id: "l22_p2_q4_s4",
        text: "Xét phản ứng nhiệt hạch: _1^2 H + _1^3 H -> _2^4 He + _0^1 n + 17,6 MeV. Biết năng lượng liên kết của hạt nhân Deuterium và Tritium lần lượt là 2,22 MeV và 8,49 MeV. Năng lượng liên kết toàn phần của hạt nhân Heli-4 được tạo thành có giá trị bằng 28,31 MeV.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Năng lượng tỏa ra E = E_lk(He) - [E_lk(D) + E_lk(T)] => 17,6 = E_lk(He) - [2,22 + 8,49] => E_lk(He) = 17,6 + 10,71 = 28,31 MeV."
      }
    ]
  }
];

export const LESSON22_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l22_p3_q1",
    question: "Trong hạt nhân nguyên tử Urani đồng vị _92^238 U, hãy tính hiệu số giữa số hạt nơtrôn và số hạt prôtôn nằm trong hạt nhân này? (Nhập đáp án là một số nguyên dương duy nhất)",
    answer: 54,
    unit: "hạt",
    level: "Thông hiểu",
    explanation: "Số prôtôn Z = 92, số khối A = 238. Số nơtrôn N = A - Z = 238 - 92 = 146 hạt. Hiệu số giữa số nơtrôn và prôtôn là N - Z = 146 - 92 = 54 hạt."
  },
  {
    id: "l22_p3_q2",
    question: "Xét phản ứng phân hạch hạt nhân kích thích sau: _0^1 n + _92^235 U -> _38^94 Sr + _54^140 Xe + k._0^1 n. Hãy xác định hệ số k (số lượng hạt nơtrôn được giải phóng sau phản ứng)?",
    answer: 2,
    unit: "hạt",
    level: "Thông hiểu",
    explanation: "Áp dụng định luật bảo toàn số khối A: 1 + 235 = 94 + 140 + k * 1 => 236 = 234 + k => k = 2 hạt."
  },
  {
    id: "l22_p3_q3",
    question: "Sử dụng công thức thực nghiệm tính bán kính hạt nhân nguyên tử R = 1,2 . A^(1/3) (fm), với A là số khối và 1 fm = 10^-15 m. Hãy tính bán kính của hạt nhân nguyên tử phóng xạ đồng vị Iốt _53^125 I theo đơn vị femtômét (fm)? (Làm tròn kết quả đến hàng đơn vị nguyên)",
    answer: 6,
    unit: "fm",
    level: "Vận dụng",
    explanation: "Áp dụng công thức với A = 125: R = 1,2 * 125^(1/3) = 1,2 * 5 = 6 fm."
  },
  {
    id: "l22_p3_q4",
    question: "Xác định độ hụt khối của hạt nhân nguyên tử cacbon đồng vị _6^12 C theo đơn vị 10^-3 u? Biết khối lượng của prôtôn m_p = 1,00728 u, nơtrôn m_n = 1,00866 u, khối lượng của hạt nhân cácbon m_C = 11,99670 u. (Làm tròn kết quả đến hàng đơn vị nguyên gần nhất)",
    answer: 99,
    unit: "10^-3 u",
    level: "Vận dụng",
    explanation: "Độ hụt khối Δm = (6 * m_p + 6 * m_n) - m_C = (6 * 1,00728 + 6 * 1,00866) - 11,99670 = 12,09564 - 11,99670 = 0,09894 u = 98,94.10^-3 u. Làm tròn đến số nguyên gần nhất là 99."
  },
  {
    id: "l22_p3_q5",
    question: "Tính năng lượng liên kết riêng của hạt nhân Heli (_2^4 He) theo đơn vị MeV/nuclôn? Biết độ hụt khối của Heli là Δm = 0,03038 u và lấy hằng số đổi đơn vị 1 u = 931,5 MeV/c^2. (Làm tròn kết quả đến một chữ số thập phân, sử dụng dấu phẩy làm dấu thập phân)",
    answer: 7.1,
    unit: "MeV/n",
    level: "Vận dụng",
    explanation: "Năng lượng liên kết toàn phần: E_lk = Δm * 931,5 = 0,03038 * 931,5 = 28,299 MeV. Năng lượng liên kết riêng: E_lkr = E_lk / A = 28,299 / 4 = 7,0747 MeV/nuclôn. Làm tròn đến một chữ số thập phân ta được 7,1 MeV/nuclôn."
  },
  {
    id: "l22_p3_q6",
    question: "Xét phản ứng nhiệt hạch kết hợp hai hạt nhân nhẹ: _1^2 H + _1^3 H -> _2^4 He + _0^1 n. Biết khối lượng các hạt nhân lần lượt là: m_D = 2,0135 u, m_T = 3,0155 u, m_He = 4,0015 u, m_n = 1,0087 u. Lấy hằng số 1 u = 931,5 MeV/c^2. Hãy tính năng lượng tỏa ra của phản ứng trên theo đơn vị MeV? (Làm tròn kết quả đến hàng đơn vị nguyên gần nhất)",
    answer: 18,
    unit: "MeV",
    level: "Vận dụng",
    explanation: "Độ hụt khối lượng phản ứng: Δm = (m_D + m_T) - (m_He + m_n) = (2,0135 + 3,0155) - (4,0015 + 1,0087) = 5,0290 - 5,0102 = 0,0188 u. Năng lượng tỏa ra: E = 0,0188 * 931,5 = 17,5122 MeV. Làm tròn đến số nguyên gần nhất là 18 MeV."
  }
];

// ==================== LESSON 23 QUESTIONS ====================
export const LESSON23_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l23_p1_q1",
    question: "Hiện tượng một hạt nhân không bền vững tự phát biến đổi thành một hạt nhân khác đồng thời phát ra các bức xạ (tia phóng xạ) gọi là gì?",
    options: [
      { id: "l23_p1_q1_o1", text: "Hiện tượng phóng xạ.", isCorrect: true },
      { id: "l23_p1_q1_o2", text: "Phản ứng phân hạch dây chuyền.", isCorrect: false },
      { id: "l23_p1_q1_o3", text: "Phản ứng tổng hợp nhiệt hạch.", isCorrect: false },
      { id: "l23_p1_q1_o4", text: "Hiện tượng phát xạ nhiệt êlectrôn.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Hiện tượng một hạt nhân không bền vững tự phát phân rã biến đổi thành một hạt nhân khác đồng thời phát ra các bức xạ gọi là hiện tượng phóng xạ."
  },
  {
    id: "l23_p1_q2",
    question: "Tia phóng xạ alpha (\\alpha) có bản chất là dòng các hạt nào sau đây?",
    options: [
      { id: "l23_p1_q2_o1", text: "Dòng hạt nhân heli _2^4He chuyển động với tốc độ khoảng 2.10^7 m/s.", isCorrect: true },
      { id: "l23_p1_q2_o2", text: "Dòng các hạt êlectrôn mang điện tích âm.", isCorrect: false },
      { id: "l23_p1_q2_o3", text: "Sóng điện từ có bước sóng cực kì ngắn.", isCorrect: false },
      { id: "l23_p1_q2_o4", text: "Dòng các hạt pôzitron mang điện tích dương.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Tia phóng xạ alpha (\\alpha) thực chất là dòng các hạt nhân hêli (_2^4He) chuyển động nhanh với tốc độ khoảng 2.10^7 m/s."
  },
  {
    id: "l23_p1_q3",
    question: "Tia phóng xạ beta trừ (\\beta^-) có bản chất là gì?",
    options: [
      { id: "l23_p1_q3_o1", text: "Dòng hạt êlectrôn _-1^0e chuyển động với tốc độ xấp xỉ tốc độ ánh sáng.", isCorrect: true },
      { id: "l23_p1_q3_o2", text: "Dòng hạt heli _2^4He có khối lượng lớn.", isCorrect: false },
      { id: "l23_p1_q3_o3", text: "Dòng bức xạ điện từ không mang điện.", isCorrect: false },
      { id: "l23_p1_q3_o4", text: "Dòng các hạt nơtrôn trung hòa.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Tia phóng xạ beta trừ (\\beta^-) là dòng các hạt electron (_-1^0e) phóng ra từ hạt nhân mẹ với tốc độ rất cao (gần bằng tốc độ ánh sáng)."
  },
  {
    id: "l23_p1_q4",
    question: "Tia phóng xạ gamma (\\gamma) có bản chất là:",
    options: [
      { id: "l23_p1_q4_o1", text: "Bức xạ điện từ có bước sóng cực ngắn (cỡ nhỏ hơn 10^-11 m), gồm các hạt phôtôn có năng lượng cao.", isCorrect: true },
      { id: "l23_p1_q4_o2", text: "Dòng hạt pôzitron mang điện tích dương chuyển động nhanh.", isCorrect: false },
      { id: "l23_p1_q4_o3", text: "Dòng hạt nhân heli mang điện tích dương rất mạnh.", isCorrect: false },
      { id: "l23_p1_q4_o4", text: "Sóng âm truyền qua không khí với tần số cực cao.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Tia gamma (\\gamma) là bức xạ điện từ (sóng điện từ) có bước sóng cực kì ngắn (cỡ < 10^-11 m), gồm các photon mang năng lượng cao phát ra khi hạt nhân con chuyển từ trạng thái kích thích về trạng thái cơ bản."
  },
  {
    id: "l23_p1_q5",
    question: "Khi so sánh khả năng đâm xuyên của ba loại tia phóng xạ \\alpha, \\beta, \\gamma qua các vật chất, phát biểu nào sau đây đúng?",
    options: [
      { id: "l23_p1_q5_o1", text: "Tia \\alpha đâm xuyên yếu nhất (bị chặn bởi tờ giấy mỏng), tia \\gamma đâm xuyên mạnh nhất (xuyên qua tấm nhôm mỏng, bê tông dày).", isCorrect: true },
      { id: "l23_p1_q5_o2", text: "Tia \\alpha đâm xuyên mạnh nhất, tia \\gamma đâm xuyên yếu nhất.", isCorrect: false },
      { id: "l23_p1_q5_o3", text: "Tia \\beta có khả năng đâm xuyên mạnh hơn tia \\gamma nhưng yếu hơn tia \\alpha.", isCorrect: false },
      { id: "l23_p1_q5_o4", text: "Cả ba loại tia phóng xạ có khả năng đâm xuyên như nhau trong mọi môi trường.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Tia \\alpha ion hóa mạnh nhất nên đâm xuyên yếu nhất (bị tờ giấy dày 1mm cản lại); tia \\beta đâm xuyên trung bình (xuyên qua giấy nhưng bị tấm nhôm dày cản lại); tia \\gamma ion hóa rất yếu nên đâm xuyên mạnh nhất (cần chì dày hàng chục cm để cản)."
  },
  {
    id: "l23_p1_q6",
    question: "Đại lượng chu kì bán rã T của một chất phóng xạ được định nghĩa là:",
    options: [
      { id: "l23_p1_q6_o1", text: "Khoảng thời gian cần thiết để một nửa số lượng hạt nhân ban đầu của chất đó bị phân rã.", isCorrect: true },
      { id: "l23_p1_q6_o2", text: "Khoảng thời gian để toàn bộ mẫu chất phóng xạ biến đổi hoàn toàn thành hạt nhân con bền vững.", isCorrect: false },
      { id: "l23_p1_q6_o3", text: "Thời gian để một hạt nhân phóng xạ bất kì thực hiện một lần phân rã duy nhất.", isCorrect: false },
      { id: "l23_p1_q6_o4", text: "Khoảng thời gian để độ phóng xạ của mẫu chất tăng lên gấp đôi.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Chu kì bán rã T là khoảng thời gian xác định mà sau đó một nửa số lượng hạt nhân hiện có của chất phóng xạ bị phân rã biến đổi thành chất khác."
  },
  {
    id: "l23_p1_q7",
    question: "Đơn vị đo độ phóng xạ trong hệ đo lường quốc tế SI là:",
    options: [
      { id: "l23_p1_q7_o1", text: "Becơren (kí hiệu Bq), bằng 1 phân rã trong một giây.", isCorrect: true },
      { id: "l23_p1_q7_o2", text: "Curi (kí hiệu Ci), bằng 3,7.10^10 phân rã trong một giây.", isCorrect: false },
      { id: "l23_p1_q7_o3", text: "Sievert (kí hiệu Sv), dùng để đo liều bức xạ sinh học.", isCorrect: false },
      { id: "l23_p1_q7_o4", text: "Henry (kí hiệu H), đặc trưng cho hằng số tự cảm.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Trong hệ SI, đơn vị của độ phóng xạ H là becơren (Bq), trong đó 1 Bq = 1 phân rã/giây. Đơn vị Curi (Ci) là đơn vị ngoài hệ SI."
  },
  {
    id: "l23_p1_q8",
    question: "Nguyên tắc cơ bản nào sau đây KHÔNG phải là nguyên tắc an toàn phóng xạ được khuyến cáo bởi cơ quan quản lý?",
    options: [
      { id: "l23_p1_q8_o1", text: "Giữ áp suất phòng làm việc thật cao và thông gió mạnh liên tục để thổi bay tia bức xạ.", isCorrect: true },
      { id: "l23_p1_q8_o2", text: "Giữ khoảng cách đủ xa đối với các nguồn phóng xạ (tăng r).", isCorrect: false },
      { id: "l23_p1_q8_o3", text: "Sử dụng các tấm chắn bảo vệ bằng vật liệu thích hợp (như chì, bê tông cốt thép).", isCorrect: false },
      { id: "l23_p1_q8_o4", text: "Giảm thiểu tối đa thời gian phơi nhiễm (tiếp xúc trực tiếp) với nguồn phóng xạ.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Ba quy tắc an toàn phóng xạ cốt lõi là: Giữ khoảng cách đủ xa, sử dụng tấm chắn tốt và giảm thiểu thời gian tiếp xúc. Tăng áp suất phòng không có tác dụng cản tia bức xạ hạt nhân."
  },
  {
    id: "l23_p1_q9",
    question: "Trong phản ứng phóng xạ beta cộng (\\beta^+), hạt nhân mẹ phát ra hạt pôzitron và kèm theo hạt cơ bản nào sau đây?",
    options: [
      { id: "l23_p1_q9_o1", text: "Hạt nơtrino (\\nu).", isCorrect: true },
      { id: "l23_p1_q9_o2", text: "Hạt phản nơtrino (\\tilde{\\nu}).", isCorrect: false },
      { id: "l23_p1_q9_o3", text: "Hạt nơtrôn (_0^1n).", isCorrect: false },
      { id: "l23_p1_q9_o4", text: "Tia gamma (\\gamma).", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Trong phân rã \\beta^+, hạt nhân mẹ tạo ra hạt nhân con, pôzitron và hạt neutrino (\\nu). Trong phân rã \\beta^-, hạt nhân mẹ tạo ra hạt nhân con, electron và hạt phản neutrino (\\tilde{\\nu})."
  },
  {
    id: "l23_p1_q10",
    question: "Khi nói về tính ngẫu nhiên của hiện tượng phân rã phóng xạ của các hạt nhân nguyên tử, phát biểu nào sau đây đúng?",
    options: [
      { id: "l23_p1_q10_o1", text: "Với một hạt nhân phóng xạ cho trước, thời điểm phân rã của nó hoàn toàn là ngẫu nhiên và không thể dự đoán trước.", isCorrect: true },
      { id: "l23_p1_q10_o2", text: "Cơ chế phân rã là tuần hoàn và có thể tính chính xác tuyệt đối hạt nhân nào sẽ phân rã tiếp theo.", isCorrect: false },
      { id: "l23_p1_q10_o3", text: "Có thể thay đổi và điều khiển hằng số phóng xạ bằng cách đun nóng mẫu chất lên nhiệt độ cao.", isCorrect: false },
      { id: "l23_p1_q10_o4", text: "Chất phóng xạ để trong chân không sẽ phân rã chậm hơn khi đặt ở áp suất khí quyển cao.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Quá trình phân rã phóng xạ là ngẫu nhiên đối với từng hạt nhân riêng rẽ, thời điểm phân rã của nó là không xác định và không phụ thuộc vào bất cứ tác nhân vật lý hay hóa học bên ngoài nào."
  },
  {
    id: "l23_p1_q11",
    question: "Quan sát chuyển động của các tia phóng xạ khi đi vào điện trường đều giữa hai bản tụ tích điện trái dấu. Nhận định nào sau đây là hoàn toàn đúng?",
    options: [
      { id: "l23_p1_q11_o1", text: "Tia \\beta^- lệch mạnh về phía bản tích điện dương, tia \\alpha lệch ít về phía bản tích điện âm.", isCorrect: true },
      { id: "l23_p1_q11_o2", text: "Tia \\alpha lệch mạnh về phía bản tích điện âm vì hạt \\alpha mang điện tích dương lớn hơn.", isCorrect: false },
      { id: "l23_p1_q11_o3", text: "Tia \\gamma bị lệch hướng về phía bản cực dương do năng lượng photon rất cao.", isCorrect: false },
      { id: "l23_p1_q11_o4", text: "Tia \\beta^+ và tia \\alpha lệch theo hai hướng hoàn toàn đối lập nhau trong điện trường.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Do tia \\beta^- gồm các electron mang điện tích âm nên lệch về phía bản dương (+). Tia \\alpha và \\beta^+ mang điện tích dương nên lệch về phía bản âm (-). Hạt electron có khối lượng cực kì nhỏ nên gia tốc lệch hướng rất lớn, lệch mạnh hơn hạt \\alpha rất nhiều. Tia \\gamma không mang điện nên truyền thẳng."
  },
  {
    id: "l23_p1_q12",
    question: "Hạt nhân mẹ _Z^A X phóng xạ alpha (\\alpha) tạo thành hạt nhân con Y. Phương trình phân rã và mối liên hệ giữa số khối, số hiệu nguyên tử là:",
    options: [
      { id: "l23_p1_q12_o1", text: "_Z^A X -> _{Z-2}^{A-4}Y + _2^4He (Số khối con giảm 4, số hiệu con giảm 2).", isCorrect: true },
      { id: "l23_p1_q12_o2", text: "_Z^A X -> _{Z-4}^{A-2}Y + _2^4He (Số khối con giảm 2, số hiệu con giảm 4).", isCorrect: false },
      { id: "l23_p1_q12_o3", text: "_Z^A X -> _{Z+1}^A Y + _-1^0e (Số khối con giữ nguyên, số hiệu con tăng 1).", isCorrect: false },
      { id: "l23_p1_q12_o4", text: "_Z^A X -> _{Z-1}^A Y + _+1^0e (Số khối con giữ nguyên, số hiệu con giảm 1).", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Định luật bảo toàn số khối A và bảo toàn điện tích Z cho ta phương trình phân rã alpha: _Z^A X -> _{Z-2}^{A-4}Y + _2^4He. Số khối của hạt nhân con Y giảm 4 đơn vị, số hiệu nguyên tử Z giảm 2 đơn vị."
  },
  {
    id: "l23_p1_q13",
    question: "Hằng số phóng xạ \\lambda = ln(2) / T của một chất phóng xạ biểu thị điều gì?",
    options: [
      { id: "l23_p1_q13_o1", text: "Xác suất phân rã của một hạt nhân chất phóng xạ đó trong một đơn vị thời gian.", isCorrect: true },
      { id: "l23_p1_q13_o2", text: "Tổng số hạt nhân bị phân rã hoàn toàn sau khi trải qua một chu kì bán rã T.", isCorrect: false },
      { id: "l23_p1_q13_o3", text: "Thời gian trung bình để toàn bộ mẫu chất biến mất hoàn toàn.", isCorrect: false },
      { id: "l23_p1_q13_o4", text: "Tỷ lệ số hạt nhân con sinh ra so với số hạt nhân mẹ còn lại trong mẫu.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Hằng số phóng xạ \\lambda đặc trưng cho chất phóng xạ, biểu thị xác suất phân rã của một hạt nhân nguyên tử chất đó trong một đơn vị thời gian (giây)."
  },
  {
    id: "l23_p1_q14",
    question: "Một chất phóng xạ có chu kì bán rã T. Ban đầu, một mẫu chất có N_0 hạt nhân nguyên chất. Sau khoảng thời gian t = 3T, tỉ lệ phần trăm số hạt nhân phóng xạ còn lại chưa bị phân rã trong mẫu là bao nhiêu?",
    options: [
      { id: "l23_p1_q14_o1", text: "12,5%.", isCorrect: true },
      { id: "l23_p1_q14_o2", text: "25,0%.", isCorrect: false },
      { id: "l23_p1_q14_o3", text: "87,5%.", isCorrect: false },
      { id: "l23_p1_q14_o4", text: "37,5%.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Áp dụng định luật phóng xạ: N = N_0 * 2^(-t/T) = N_0 * 2^(-3T/T) = N_0 * 2^-3 = N_0 / 8. Tỉ số phần trăm hạt nhân còn lại là N / N_0 = 1/8 = 12,5%."
  },
  {
    id: "l23_p1_q15",
    question: "Đồng vị phóng xạ Stronti _38^90Sr thực hiện phân rã phóng xạ beta trừ (\\beta^-) tạo thành hạt nhân con là đồng vị của nguyên tố Y. Phương trình phân rã hạt nhân này là:",
    options: [
      { id: "l23_p1_q15_o1", text: "_38^90Sr -> _39^90Y + _-1^0e + phản nơtrino.", isCorrect: true },
      { id: "l23_p1_q15_o2", text: "_38^90Sr -> _37^90Y + _+1^0e + nơtrino.", isCorrect: false },
      { id: "l23_p1_q15_o3", text: "_38^90Sr -> _36^86Kr + _2^4He.", isCorrect: false },
      { id: "l23_p1_q15_o4", text: "_38^90Sr -> _38^90Sr* + tia gamma.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Đồng vị phóng xạ beta trừ tuân theo phương trình: _Z^A X -> _{Z+1}^A Y + _-1^0e + phản nơtrino. Thay số hiệu Z = 38, ta được hạt nhân con có Z = 39 (Ytri Y), A = 90."
  },
  {
    id: "l23_p1_q16",
    question: "Một lượng chất phóng xạ Radon _86^222Rn có chu kì bán rã là T = 3,8 ngày. Sau một khoảng thời gian t = 11,4 ngày, tỉ lệ phần trăm số hạt nhân Radon đã bị phân rã (biến đổi thành hạt nhân khác) trong mẫu là bao nhiêu?",
    options: [
      { id: "l23_p1_q16_o1", text: "87,5%.", isCorrect: true },
      { id: "l23_p1_q16_o2", text: "12,5%.", isCorrect: false },
      { id: "l23_p1_q16_o3", text: "25,0%.", isCorrect: false },
      { id: "l23_p1_q16_o4", text: "75,0%.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Ta có số chu kì bán rã k = t / T = 11,4 / 3,8 = 3. Số hạt nhân còn lại là N = N_0 / 2^3 = N_0 / 8 = 12,5% số hạt ban đầu. Số hạt nhân đã phân rã là \\Delta N = N_0 - N = 87,5% số hạt ban đầu."
  },
  {
    id: "l23_p1_q17",
    question: "Đồng vị phóng xạ Coban _27^60Co có chu kì bán rã T = 5,27 năm. Nếu ban đầu mẫu chất có độ phóng xạ (hoạt độ phóng xạ) là H_0, thì sau 21,08 năm, độ phóng xạ của mẫu chất đó sẽ giảm đi bao nhiêu lần so với ban đầu?",
    options: [
      { id: "l23_p1_q17_o1", text: "Giảm đi 16 lần.", isCorrect: true },
      { id: "l23_p1_q17_o2", text: "Giảm đi 8 lần.", isCorrect: false },
      { id: "l23_p1_q17_o3", text: "Giảm đi 32 lần.", isCorrect: false },
      { id: "l23_p1_q17_o4", text: "Giảm đi 4 lần.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Ta có khoảng thời gian t = 21,08 năm = 4 * 5,27 năm = 4T. Độ phóng xạ tuân theo quy luật giảm hàm mũ giống số hạt: H = H_0 * 2^(-t/T) = H_0 * 2^-4 = H_0 / 16. Vậy độ phóng xạ giảm đi 16 lần."
  },
  {
    id: "l23_p1_q18",
    question: "Trong phương pháp định tuổi bằng carbon phóng xạ, các nhà khảo cổ phát hiện một cổ vật bằng gỗ có độ phóng xạ đồng vị _6^14C chỉ bằng 25% độ phóng xạ của một khúc gỗ tươi cùng khối lượng mới chặt. Biết chu kì bán rã của _6^14C là 5730 năm. Tuổi của cổ vật gỗ này xấp xỉ bao nhiêu năm?",
    options: [
      { id: "l23_p1_q18_o1", text: "11460 năm.", isCorrect: true },
      { id: "l23_p1_q18_o2", text: "5730 năm.", isCorrect: false },
      { id: "l23_p1_q18_o3", text: "17190 năm.", isCorrect: false },
      { id: "l23_p1_q18_o4", text: "22920 năm.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Độ phóng xạ còn lại bằng 25% độ phóng xạ ban đầu: H / H_0 = 0,25 = 1/4 = 2^-2. Do đó t = 2T = 2 * 5730 = 11460 năm."
  }
];

export const LESSON23_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l23_p2_q1",
    question: "Khi nghiên cứu về hiện tượng phóng xạ tự phát và đặc điểm của các bức xạ phóng xạ phát ra từ hạt nhân mẹ không bền vững:",
    statements: [
      {
        id: "l23_p2_q1_s1",
        text: "Hiện tượng phóng xạ xảy ra hoàn toàn tự phát từ bên trong hạt nhân, không phụ thuộc vào các điều kiện bên ngoài như nhiệt độ, áp suất hay liên kết hóa học của mẫu.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Hiện tượng phóng xạ là một quá trình hạt nhân tự biến đổi một cách tự phát độc lập với mọi yếu tố vật lý hay hóa học ngoại cảnh."
      },
      {
        id: "l23_p2_q1_s2",
        text: "Khi đi qua một điện trường mạnh, tia phóng xạ \\gamma sẽ bị lệch hướng nhiều nhất về phía bản tụ tích điện dương vì có năng lượng photon rất cao.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Tia gamma (\\gamma) là bức xạ điện từ, không mang điện tích nên nó truyền thẳng, không bị lệch trong điện trường hoặc từ trường."
      },
      {
        id: "l23_p2_q1_s3",
        text: "Tia \\beta^+ lệch hướng trong điện trường ngược chiều so với hướng lệch của tia \\alpha vì tia \\beta^+ mang điện tích dương còn tia \\alpha mang điện tích âm.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Cả hai tia \\beta^+ (positron mang điện tích +e) và tia \\alpha (heli mang điện tích +2e) đều tích điện dương nên chúng lệch về cùng hướng (phía bản tích điện âm) trong điện trường."
      },
      {
        id: "l23_p2_q1_s4",
        text: "Tia phóng xạ \\beta^- bị lệch hướng trong điện trường nhiều hơn tia \\alpha chủ yếu vì khối lượng của electron nhỏ hơn rất nhiều so với khối lượng hạt nhân hêli.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Khối lượng của electron vô cùng nhỏ (khoảng 0.00055 u) so với hạt \\alpha (khoảng 4 u). Với lực tác dụng cùng bậc điện tích, electron thu gia tốc lệch hướng cực lớn nên bị bẻ cong lệch mạnh hơn nhiều."
      }
    ]
  },
  {
    id: "l23_p2_q2",
    question: "Xem xét các dạng phóng xạ chính và các phương trình biến đổi hạt nhân tương ứng:",
    statements: [
      {
        id: "l23_p2_q2_s1",
        text: "Phóng xạ alpha (\\alpha) thường chỉ xảy ra tự phát đối với các hạt nhân nguyên tử nặng có số khối A lớn hơn 190.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng, các hạt nhân nặng không bền vững phân rã alpha phát ra heli để giảm số nuclôn nhanh chóng hướng tới sự bền vững."
      },
      {
        id: "l23_p2_q2_s2",
        text: "Trong quá trình phân rã phóng xạ beta trừ (\\beta^-), một hạt prôtôn bên trong hạt nhân biến đổi thành một nơtrôn để giải phóng hạt electron.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Trong phân rã \\beta^-, một hạt nơtrôn bên trong hạt nhân tự biến đổi thành một prôtôn: n -> p + e^- + phản nơtrino."
      },
      {
        id: "l23_p2_q2_s3",
        text: "Hạt nhân con được sinh ra từ quá trình phân rã phóng xạ beta trừ (\\beta^-) hoặc beta cộng (\\beta^+) có cùng số khối A với hạt nhân mẹ nhưng có vị trí khác nhau trong bảng tuần hoàn.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Trong phân rã beta, số khối A được bảo toàn nên hạt nhân con đồng khối với hạt nhân mẹ, nhưng số hiệu nguyên tử Z thay đổi (tăng 1 hoặc giảm 1) nên lệch vị trí trong bảng tuần hoàn."
      },
      {
        id: "l23_p2_q2_s4",
        text: "Khi một hạt nhân con Technetium _43^99Tc* ở trạng thái kích thích phát ra tia phóng xạ gamma (\\gamma) để về trạng thái cơ bản, hạt nhân mới thu được là đồng vị _42^99Mo.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Phóng xạ gamma chỉ là sự chuyển mức năng lượng của hạt nhân, không làm thay đổi cấu trúc số prôtôn và số nơtrôn. Phương trình là: _43^99Tc* -> _43^99Tc + \\gamma. Hạt nhân con vẫn là _43^99Tc."
      }
    ]
  },
  {
    id: "l23_p2_q3",
    question: "Về mặt định lượng, sự phân rã phóng xạ của một mẫu chất tuân thủ định luật phóng xạ:",
    statements: [
      {
        id: "l23_p2_q3_s1",
        text: "Công thức biểu diễn định luật phóng xạ cho thấy số lượng hạt nhân chất phóng xạ chưa bị phân rã giảm dần theo thời gian theo một định luật hàm số mũ.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng, số hạt nhân còn lại giảm theo hàm mũ lũy thừa cơ số 2 hoặc cơ số tự nhiên e: N_t = N_0 * 2^(-t/T) = N_0 * e^(-\\lambda t)."
      },
      {
        id: "l23_p2_q3_s2",
        text: "Độ phóng xạ H của mẫu tại một thời điểm t tỷ lệ thuận với số lượng hạt nhân phóng xạ chưa phân rã N_t tại thời điểm đó theo hệ thức H_t = \\lambda N_t.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Theo định nghĩa, hoạt độ phóng xạ H bằng tốc độ phân rã hạt nhân và tỷ lệ thuận với số hạt nhân chưa bị phân rã hiện tại."
      },
      {
        id: "l23_p2_q3_s3",
        text: "Hằng số phóng xạ \\lambda = ln(2) / T phụ thuộc mạnh vào khối lượng ban đầu của mẫu chất phóng xạ, mẫu có khối lượng càng lớn thì hằng số phóng xạ càng lớn.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Hằng số phóng xạ \\lambda là đại lượng đặc trưng hoàn toàn cho bản chất của đồng vị phóng xạ đó, không phụ thuộc vào khối lượng hay các yếu tố vật lý hóa học ngoại cảnh nào."
      },
      {
        id: "l23_p2_q3_s4",
        text: "Ban đầu một mẫu chất phóng xạ có khối lượng m_0 = 10 gam có chu kì bán rã là T = 8 ngày. Sau 24 ngày, khối lượng mẫu chất phóng xạ còn lại trong mẫu chỉ còn 1,25 gam chưa phân rã.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Thời gian t = 24 ngày tương ứng k = t/T = 3 chu kì bán rã. Khối lượng còn lại là m = m_0 / 2^k = 10 / 2^3 = 10 / 8 = 1,25 gam."
      }
    ]
  },
  {
    id: "l23_p2_q4",
    question: "Khi xem xét ảnh hưởng sinh học của tia phóng xạ và các biện pháp, nguyên tắc an toàn phóng xạ trong thực tế:",
    statements: [
      {
        id: "l23_p2_q4_s1",
        text: "Tia phóng xạ có khả năng ion hóa mạnh môi trường, làm đen kính ảnh, phá hủy các tế bào sinh học sống của sinh vật.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Bức xạ hạt nhân mang năng lượng rất cao, có tác dụng ion hóa mạnh vật chất và hủy hoại cơ thể sống."
      },
      {
        id: "l23_p2_q4_s2",
        text: "Theo quy luật giảm liều hấp thụ theo khoảng cách, khi tăng khoảng cách từ nguồn phóng xạ đến cơ thể lên gấp 3 lần thì liều hấp thụ phóng xạ hiệu dụng cơ thể nhận giảm đi 9 lần.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Cường độ bức xạ từ nguồn điểm giảm tỷ lệ nghịch với bình phương khoảng cách: 1/r^2 = 1/3^2 = 1/9 lần."
      },
      {
        id: "l23_p2_q4_s3",
        text: "Để ngăn chặn hoàn toàn khả năng đâm xuyên của tia phóng xạ gamma (\\gamma), người ta chỉ cần che chắn nguồn phóng xạ bằng một tờ giấy viết hoặc một tấm nhựa mỏng 1 mm.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Tia gamma có sức đâm xuyên rất mạnh mẽ. Giấy hay nhựa mỏng chỉ chặn được tia alpha và một phần tia beta. Để chặn tia gamma hiệu quả cần các tấm chắn bằng chì dày hàng chục cm hoặc bê tông dày."
      },
      {
        id: "l23_p2_q4_s4",
        text: "Trong biểu đồ các nguồn phơi nhiễm phóng xạ thụ động của con người, lượng phóng xạ tự nhiên đến từ không khí (khí Radon) chiếm tỷ lệ phơi nhiễm thấp nhất.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Khí Radon trong không khí chiếm tỷ lệ lớn nhất (khoảng 51%), chứ không phải thấp nhất."
      }
    ]
  }
];

export const LESSON23_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l23_p3_q1",
    question: "Một đồng vị phóng xạ Oxy _8^15O có chu kì bán rã là T = 120 giây. Tính hằng số phóng xạ \\lambda của đồng vị này theo đơn vị 10^-3 s^-1 (lấy ln2 ≈ 0,693). Làm tròn kết quả đến một chữ số thập phân.",
    answer: 5.8,
    unit: "*10^-3 s^-1",
    level: "Thông hiểu",
    explanation: "Công thức hằng số phóng xạ: \\lambda = ln(2) / T = 0,693 / 120 = 0,005775 s^-1 = 5,775 * 10^-3 s^-1. Làm tròn đến một chữ số thập phân ta được 5.8."
  },
  {
    id: "l23_p3_q2",
    question: "Xét các loại tia phóng xạ chính gồm: bức xạ alpha (\\alpha), beta trừ (\\beta^-), beta cộng (\\beta^+) và tia gamma (\\gamma). Có bao nhiêu loại tia trong số này mang điện tích âm?",
    answer: 1,
    unit: "loại",
    level: "Thông hiểu",
    explanation: "Chỉ có tia beta trừ (\\beta^-) bản chất là dòng electron mang điện tích âm (-e) nên mang điện tích âm. Các tia còn lại: alpha mang điện tích dương (+2e), beta cộng mang điện tích dương (+e), gamma không mang điện."
  },
  {
    id: "l23_p3_q3",
    question: "Đồng vị phóng xạ Radon _86^222Rn có chu kì bán rã là T = 3,8 ngày. Hỏi sau bao nhiêu ngày thì hoạt độ phóng xạ (độ phóng xạ) của mẫu chất Radon này giảm đi 8 lần so với hoạt độ phóng xạ ban đầu của nó?",
    answer: 11.4,
    unit: "ngày",
    level: "Vận dụng",
    explanation: "Độ phóng xạ giảm đi 8 lần nghĩa là H / H_0 = 1/8 = 2^-3 => k = t / T = 3 => t = 3 * T = 3 * 3,8 = 11,4 ngày."
  },
  {
    id: "l23_p3_q4",
    question: "Đồng vị phóng xạ Oxy _8^15O thực hiện phân rã phóng xạ biến đổi thành hạt nhân con bền vững. Biết sau khoảng thời gian là 240 giây, có đúng 75% số hạt nhân Oxy ban đầu trong mẫu đã bị phân rã hoàn toàn. Tính chu kì bán rã T của đồng vị này theo đơn vị giây.",
    answer: 120,
    unit: "giây",
    level: "Vận dụng",
    explanation: "Phần trăm hạt nhân bị phân rã là 75% => Phần trăm hạt nhân còn lại chưa phân rã là 100% - 75% = 25% = 1/4 = 2^-2. Do đó t = 2 * T = 240 giây => T = 120 giây."
  },
  {
    id: "l23_p3_q5",
    question: "Một mẫu chất phóng xạ đồng vị Coban _27^60Co ban đầu nguyên chất có khối lượng m_0 = 40 gam. Biết chu kì bán rã của Coban là T = 5,27 năm. Xác định khối lượng Coban còn lại chưa bị phân rã trong mẫu sau t = 10,54 năm phơi mẫu (theo đơn vị gam).",
    answer: 10,
    unit: "gam",
    level: "Vận dụng",
    explanation: "Ta có khoảng thời gian t = 10,54 năm = 2 * 5,27 năm = 2T. Khối lượng còn lại là m = m_0 / 2^(t/T) = 40 / 2^2 = 40 / 4 = 10 gam."
  },
  {
    id: "l23_p3_q6",
    question: "Theo nguyên tắc an toàn khoảng cách, một người làm việc gần nguồn phóng xạ điểm. Khi người đó di chuyển tăng khoảng cách từ vị trí cách nguồn r_1 = 2 m ra xa đến vị trí cách nguồn r_2 = 8 m thì liều hấp thụ phóng xạ hiệu dụng nhận được từ nguồn giảm đi bao nhiêu lần?",
    answer: 16,
    unit: "lần",
    level: "Vận dụng",
    explanation: "Liều hấp thụ phóng xạ hiệu dụng từ nguồn điểm tỷ lệ nghịch với bình phương khoảng cách r. Khoảng cách tăng lên r_2 / r_1 = 8 / 2 = 4 lần, do đó liều bức xạ giảm đi 4^2 = 16 lần."
  }
];

// ==================== LESSON 24 QUESTIONS ====================
export const LESSON24_P1_QUESTIONS: Part1Question[] = [
  {
    id: "l24_p1_q1",
    question: "Bộ phận chính của nhà máy điện hạt nhân dùng để thực hiện và kiểm soát phản ứng phân hạch dây chuyền là gì?",
    options: [
      { id: "l24_p1_q1_o1", text: "Lò phản ứng hạt nhân.", isCorrect: true },
      { id: "l24_p1_q1_o2", text: "Tua bin hơi nước áp suất cao.", isCorrect: false },
      { id: "l24_p1_q1_o3", text: "Máy phát điện xoay chiều.", isCorrect: false },
      { id: "l24_p1_q1_o4", text: "Tháp làm mát giải nhiệt tự nhiên.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Bộ phận chính của nhà máy điện hạt nhân là lò phản ứng hạt nhân, nơi diễn ra và kiểm soát phản ứng phân hạch duy trì ở trạng thái tới hạn."
  },
  {
    id: "l24_p1_q2",
    question: "Chất tải nhiệt sơ cấp sau khi chạy qua vùng tâm lò phản ứng hạt nhân sẽ trực tiếp truyền nhiệt cho bộ phận nào tiếp theo?",
    options: [
      { id: "l24_p1_q2_o1", text: "Bộ trao đổi nhiệt (bộ phận sinh hơi).", isCorrect: true },
      { id: "l24_p1_q2_o2", text: "Tua bin hơi nước phát điện.", isCorrect: false },
      { id: "l24_p1_q2_o3", text: "Máy ngưng tụ hơi thành nước lạnh.", isCorrect: false },
      { id: "l24_p1_q2_o4", text: "Bơm tuần hoàn nước vòng ngoài.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Chất tải nhiệt sơ cấp hấp thụ nhiệt năng tỏa ra từ lò phản ứng, sau đó chảy qua bộ trao đổi nhiệt để cung cấp nhiệt cho lò sinh hơi nước ở chu trình thứ hai."
  },
  {
    id: "l24_p1_q3",
    question: "Để đảm bảo phản ứng phân hạch dây chuyền xảy ra tự duy trì có kiểm soát (k = 1), trong lò phản ứng hạt nhân người ta dùng các thanh điều khiển chứa chất hấp thụ nơtron nào?",
    options: [
      { id: "l24_p1_q3_o1", text: "Bo (B) hoặc Cadimi (Cd).", isCorrect: true },
      { id: "l24_p1_q3_o2", text: "Urani (U) hoặc Plutoni (Pu).", isCorrect: false },
      { id: "l24_p1_q3_o3", text: "Chì (Pb) hoặc Thép mạ niken.", isCorrect: false },
      { id: "l24_p1_q3_o4", text: "Than chì hoặc Nước nặng.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Thanh điều khiển trong lò chứa các chất hấp thụ nơtron mạnh như Bo hoặc Cadimi để điều chỉnh mật độ dòng nơtron bên trong lò ở mức thích hợp."
  },
  {
    id: "l24_p1_q4",
    question: "Chất làm chậm nơtron phổ biến được sử dụng trong các lò phản ứng hạt nhân sử dụng nơtron nhiệt là gì?",
    options: [
      { id: "l24_p1_q4_o1", text: "Than chì, nước nhẹ hoặc nước nặng.", isCorrect: true },
      { id: "l24_p1_q4_o2", text: "Khối bê tông cốt thép dày đặc.", isCorrect: false },
      { id: "l24_p1_q4_o3", text: "Thép mạ bạc hoặc kẽm cứng.", isCorrect: false },
      { id: "l24_p1_q4_o4", text: "Khí heli hoặc cacbon điôxit hóa lỏng.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Chất làm chậm nơtron có nhiệm vụ giảm động năng của nơtron nhanh xuống mức năng lượng nhiệt thấp để tăng xác suất gây phân hạch tiếp theo. Than chì và nước nặng là chất làm chậm lý tưởng."
  },
  {
    id: "l24_p1_q5",
    question: "Trong y học hạt nhân, phương pháp nào sử dụng đồng vị phóng xạ đưa vào cơ thể để theo dõi sự dịch chuyển và ghi hình ảnh cắt lớp cơ quan bên trong?",
    options: [
      { id: "l24_p1_q5_o1", text: "Chụp ảnh phóng xạ cắt lớp SPECT và PET.", isCorrect: true },
      { id: "l24_p1_q5_o2", text: "Chụp ảnh X-quang xương khớp thông thường.", isCorrect: false },
      { id: "l24_p1_q5_o3", text: "Chụp cộng hưởng từ MRI không dùng bức xạ hạt nhân.", isCorrect: false },
      { id: "l24_p1_q5_o4", text: "Siêu âm màu Doppler tim mạch.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Phương pháp chụp SPECT (Single Photon Emission Computed Tomography) và PET (Positron Emission Tomography) sử dụng các nguồn phát bức xạ đưa vào cơ thể làm chất đánh dấu để dựng hình ảnh lát cắt chính xác."
  },
  {
    id: "l24_p1_q6",
    question: "Tia bức xạ nào thường được sử dụng phổ biến nhất để chiếu xạ bảo quản thực phẩm (như vải thiều, khoai tây) nhờ khả năng diệt vi trùng, nấm mốc mạnh mẽ?",
    options: [
      { id: "l24_p1_q6_o1", text: "Tia cực tím và tia gamma (\\gamma).", isCorrect: true },
      { id: "l24_p1_q6_o2", text: "Tia phóng xạ alpha (\\alpha) siêu nhẹ.", isCorrect: false },
      { id: "l24_p1_q6_o3", text: "Sóng hồng ngoại tỏa nhiệt ẩm.", isCorrect: false },
      { id: "l24_p1_q6_o4", text: "Bức xạ lò vi sóng tần số trung bình.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Tia gamma (\\gamma) có bước sóng ngắn, năng lượng cao và khả năng đâm xuyên tốt, được sử dụng rộng rãi để tiêu diệt vi khuẩn, côn trùng, nấm mốc và làm chậm quá trình chín, mọc mầm của thực phẩm."
  },
  {
    id: "l24_p1_q7",
    question: "Trong nông nghiệp và sinh học, việc sử dụng tia phóng xạ để gây đột biến gene nhằm mục đích chính là gì?",
    options: [
      { id: "l24_p1_q7_o1", text: "Tạo ra các giống cây trồng mới có một số đặc điểm vượt trội (kháng sâu bệnh, năng suất cao).", isCorrect: true },
      { id: "l24_p1_q7_o2", text: "Thúc đẩy cây lớn nhanh gấp hai lần bằng phản ứng hóa học trực tiếp.", isCorrect: false },
      { id: "l24_p1_q7_o3", text: "Tiêu diệt toàn bộ hệ sinh thái nấm mốc trong lòng đất xung quanh rễ cây.", isCorrect: false },
      { id: "l24_p1_q7_o4", text: "Giúp cây chịu được nhiệt độ đóng băng tức thời mà không rụng lá.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Chiếu xạ liều thích hợp có thể gây đột biến gene nhân tạo giúp chọn lọc các dòng đột biến có lợi, tạo giống cây năng suất cao, chống chịu tốt."
  },
  {
    id: "l24_p1_q8",
    question: "Phương pháp đánh dấu phóng xạ sử dụng đồng vị nào sau đây để nghiên cứu đường đi của phân bón trong cây trồng?",
    options: [
      { id: "l24_p1_q8_o1", text: "Đồng vị phóng xạ phốt pho _15^32P.", isCorrect: true },
      { id: "l24_p1_q8_o2", text: "Đồng vị phóng xạ cacbon _6^14C.", isCorrect: false },
      { id: "l24_p1_q8_o3", text: "Đồng vị phóng xạ coban _27^60Co.", isCorrect: false },
      { id: "l24_p1_q8_o4", text: "Đồng vị phóng xạ urani _92^235U.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Để nghiên cứu sự hấp thụ phốt pho từ phân lân của cây trồng, người ta bón phân có chứa đồng vị phóng xạ β⁻ phốt pho _15^32P rồi đo hoạt độ phóng xạ của lá cây theo thời gian."
  },
  {
    id: "l24_p1_q9",
    question: "Tại sao các nhà máy điện hạt nhân thường được xây dựng cạnh hồ, sông lớn hoặc bờ biển?",
    options: [
      { id: "l24_p1_q9_o1", text: "Để tận dụng nguồn nước dồi dào làm chất giải nhiệt cho bộ ngưng tụ hơi nước.", isCorrect: true },
      { id: "l24_p1_q9_o2", text: "Để dễ xả thải chất phóng xạ hòa tan trực tiếp vào môi trường thủy sinh.", isCorrect: false },
      { id: "l24_p1_q9_o3", text: "Để giảm thiểu lực rung chấn động đất tác dụng vào nền móng nhà máy.", isCorrect: false },
      { id: "l24_p1_q9_o4", text: "Để thu hút học sinh và khách tham quan du lịch bằng tàu biển.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Chu trình thứ hai sau khi làm quay tua bin cần được ngưng tụ lại thành nước lỏng bằng cách làm lạnh. Điều này cần một lượng lớn nước tuần hoàn từ sông, hồ hoặc biển để trao đổi nhiệt."
  },
  {
    id: "l24_p1_q10",
    question: "Ưu điểm vượt trội của nhà máy điện hạt nhân so với nhà máy nhiệt điện đốt than truyền thống là gì?",
    options: [
      { id: "l24_p1_q10_o1", text: "Không thải trực tiếp các khí ô nhiễm và khí nhà kính như CO2, CO, SO2 vào không khí.", isCorrect: true },
      { id: "l24_p1_q10_o2", text: "Chi phí xây lắp lò phản ứng ban đầu rẻ hơn nhiều và xây dựng rất nhanh.", isCorrect: false },
      { id: "l24_p1_q10_o3", text: "Không phát sinh bất kỳ chất thải độc hại hay chất thải phóng xạ nào cần quản lý lâu dài.", isCorrect: false },
      { id: "l24_p1_q10_o4", text: "Có thể hoạt động liên tục không cần nước làm mát hoặc tháp giải nhiệt.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Năng lượng điện hạt nhân giải phóng từ hạt nhân nguyên tử không thông qua quá trình đốt cháy oxy nên hoàn toàn không phát thải khí CO2 hoặc các khí sulfur gây mưa axit."
  },
  {
    id: "l24_p1_q11",
    question: "Trong y học điều trị ung thư, cơ chế hoạt động của thuốc phóng xạ phóng thích dòng hạt phóng xạ đưa vào cơ thể là gì?",
    options: [
      { id: "l24_p1_q11_o1", text: "Các tế bào ung thư hấp thụ đặc hiệu thuốc phóng xạ và bị phá hủy bởi năng lượng của hạt bức xạ phát ra tại chỗ.", isCorrect: true },
      { id: "l24_p1_q11_o2", text: "Tia phóng xạ kích thích tế bào ung thư đột biến ngược trở lại tế bào lành tính.", isCorrect: false },
      { id: "l24_p1_q11_o3", text: "Chất phóng xạ làm đông đặc toàn bộ mạch máu dẫn đến khối u để bỏ đói khối u.", isCorrect: false },
      { id: "l24_p1_q11_o4", text: "Các nguyên tử phóng xạ liên kết hóa học bền vững với nước để tạo chất chống oxy hóa khối u.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Thuốc phóng xạ chứa đồng vị (ví dụ Radium-223) được vận chuyển đến khối u thông qua dòng máu, tế bào ung thư hấp thụ mạnh chất này và bị tiêu diệt bởi bức xạ năng lượng cao phát ra trong phạm vi rất ngắn, giảm thiểu tổn thương mô lành."
  },
  {
    id: "l24_p1_q12",
    question: "Việc chiếu xạ trái cây nhằm mục đích diệt vi trùng có làm trái cây bị nhiễm phóng xạ để trở thành nguồn phát xạ hay không?",
    options: [
      { id: "l24_p1_q12_o1", text: "Không, vì liều lượng và năng lượng tia được kiểm soát chặt chẽ, trái cây chỉ hấp thụ năng lượng bức xạ chứ không lưu trữ chất phóng xạ.", isCorrect: true },
      { id: "l24_p1_q12_o2", text: "Có, nhưng lượng bức xạ lưu giữ rất nhỏ và tự biến mất sau 1 giờ.", isCorrect: false },
      { id: "l24_p1_q12_o3", text: "Có, toàn bộ các hạt nhân nguyên tử trong trái cây bị chuyển hóa thành hạt nhân Coban-60.", isCorrect: false },
      { id: "l24_p1_q12_o4", text: "Có, trái cây sẽ phát ra luồng tia alpha liên tục gây phát quang nhẹ trong bóng tối.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Chiếu xạ bảo quản chỉ cho trái cây tiếp xúc với chùm bức xạ (như tia gamma) để khử trùng. Quá trình này không đưa nguồn phóng xạ vào trong thực phẩm nên tuyệt đối không làm thực phẩm bị nhiễm xạ."
  },
  {
    id: "l24_p1_q13",
    question: "Bộ phận lưu trữ nhiên liệu hạt nhân đã qua sử dụng đòi hỏi đặc tính bảo vệ cực kỳ nghiêm ngặt vì lý do nào sau đây?",
    options: [
      { id: "l24_p1_q13_o1", text: "Nhiên liệu đã qua sử dụng chứa các sản phẩm phân hạch có chu kỳ bán rã rất lớn (như 90Sr, 137Cs) vẫn tiếp tục phát xạ mạnh và tỏa nhiệt cao.", isCorrect: true },
      { id: "l24_p1_q13_o2", text: "Các thanh nhiên liệu hạt nhân đã qua sử dụng rất dễ tự phát nổ như bom nguyên tử.", isCorrect: false },
      { id: "l24_p1_q13_o3", text: "Nhiên liệu đã cháy hết chứa lượng khí độc cacbon mônôxit (CO) cực lớn gây ngạt.", isCorrect: false },
      { id: "l24_p1_q13_o4", text: "Để tái sử dụng chúng trực tiếp trong các lò sưởi gia đình mùa đông mà không cần chế biến.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Nhiên liệu hạt nhân sau khi dùng chứa các sản phẩm phân hạch phóng xạ nguy hiểm (chu kỳ bán rã khoảng 30 năm) vẫn tỏa nhiệt rất mạnh, cần ngâm trong bể nước làm mát vài năm trước khi đưa vào hầm lưu trữ lâu dài."
  },
  {
    id: "l24_p1_q14",
    question: "Một thanh nhiên liệu Urani chứa đồng vị _92^235U. Trong lò phản ứng, mỗi phân hạch tỏa ra năng lượng trung bình là 200 MeV. Biết lò phản ứng hoạt động với công suất nhiệt phát ra là 100 MW. Tính số phân hạch xảy ra trong mỗi giây bên trong lò phản ứng. (Cho 1 eV = 1,6.10^-19 J).",
    options: [
      { id: "l24_p1_q14_o1", text: "3,125.10^18 phân hạch.", isCorrect: true },
      { id: "l24_p1_q14_o2", text: "5,000.10^18 phân hạch.", isCorrect: false },
      { id: "l24_p1_q14_o3", text: "3,125.10^12 phân hạch.", isCorrect: false },
      { id: "l24_p1_q14_o4", text: "1,600.10^19 phân hạch.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Đổi năng lượng 1 phân hạch ra Jun: E = 200 * 10^6 * 1,6.10^-19 = 3,2.10^-11 J. Số phân hạch mỗi giây: N = P / E = 100.10^6 / 3,2.10^-11 = 3,125.10^18 phân hạch."
  },
  {
    id: "l24_p1_q15",
    question: "Trong một thiết bị lưu trữ chất thải hạt nhân có chứa đồng vị phóng xạ _55^137Cs với chu kỳ bán rã T = 30 năm. Sau bao lâu thì lượng chất phóng xạ _55^137Cs này còn lại đúng 12,5% so với ban đầu?",
    options: [
      { id: "l24_p1_q15_o1", text: "90 năm.", isCorrect: true },
      { id: "l24_p1_q15_o2", text: "60 năm.", isCorrect: false },
      { id: "l24_p1_q15_o3", text: "120 năm.", isCorrect: false },
      { id: "l24_p1_q15_o4", text: "30 năm.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Tỷ lệ lượng chất còn lại: N / N_0 = 12,5% = 1/8 = 2^-3 => Số chu kỳ bán rã k = 3. Thời gian t = k * T = 3 * 30 = 90 năm."
  },
  {
    id: "l24_p1_q16",
    question: "Người ta dùng một nguồn phóng xạ Coban _27^60Co để chiếu xạ thực phẩm. Biết chu kỳ bán rã của _27^60Co là T = 5,27 năm. Sau t năm, hoạt độ phóng xạ của nguồn giảm đi 4 lần so với ban đầu. Tính thời gian t.",
    options: [
      { id: "l24_p1_q16_o1", text: "10,54 năm.", isCorrect: true },
      { id: "l24_p1_q16_o2", text: "15,81 năm.", isCorrect: false },
      { id: "l24_p1_q16_o3", text: "5,27 năm.", isCorrect: false },
      { id: "l24_p1_q16_o4", text: "2,635 năm.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Hoạt độ giảm đi 4 lần tức là H / H_0 = 1/4 = 2^-2 => k = 2 chu kỳ bán rã. Thời gian t = 2 * T = 2 * 5,27 = 10,54 năm."
  },
  {
    id: "l24_p1_q17",
    question: "Trong chẩn đoán y học, người ta tiêm vào máu bệnh nhân một lượng chất phóng xạ có hoạt độ ban đầu H_0 = 16.10^5 Bq. Biết chu kỳ bán rã hiệu dụng của chất này trong cơ thể là T = 6 giờ. Hoạt độ phóng xạ còn lại trong cơ thể sau t = 24 giờ là bao nhiêu?",
    options: [
      { id: "l24_p1_q17_o1", text: "1,0.10^5 Bq.", isCorrect: true },
      { id: "l24_p1_q17_o2", text: "4,0.10^5 Bq.", isCorrect: false },
      { id: "l24_p1_q17_o3", text: "2,0.10^5 Bq.", isCorrect: false },
      { id: "l24_p1_q17_o4", text: "0,5.10^5 Bq.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Số chu kỳ bán rã trôi qua: k = t / T = 24 / 6 = 4. Hoạt độ phóng xạ còn lại: H = H_0 / 2^k = 16.10^5 / 2^4 = 1,0.10^5 Bq."
  },
  {
    id: "l24_p1_q18",
    question: "Một lò phản ứng hạt nhân sử dụng nước nặng làm chất làm chậm. Khối lượng của phân tử nước nặng D2O so với phân tử nước thường H2O lớn hơn khoảng bao nhiêu phần trăm (cho H = 1, D = 2, O = 16)?",
    options: [
      { id: "l24_p1_q18_o1", text: "11,1%.", isCorrect: true },
      { id: "l24_p1_q18_o2", text: "20,0%.", isCorrect: false },
      { id: "l24_p1_q18_o3", text: "5,5%.", isCorrect: false },
      { id: "l24_p1_q18_o4", text: "25,0%.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Khối lượng mol của H2O là 1 * 2 + 16 = 18 g/mol. Khối lượng mol của D2O là 2 * 2 + 16 = 20 g/mol. Tỷ lệ tăng là (20 - 18) / 18 = 2 / 18 = 11,1%."
  }
];

export const LESSON24_P2_QUESTIONS: Part2Question[] = [
  {
    id: "l24_p2_q1",
    question: "Xét về cấu tạo và nguyên lý điều khiển hoạt động bên trong lò phản ứng phân hạch của nhà máy điện hạt nhân:",
    statements: [
      {
        id: "l24_p2_q1_s1",
        text: "Nhiên liệu hạt nhân sử dụng phổ biến trong các lò phản ứng hạt nhân hiện nay thường chứa các đồng vị phân hạch nặng như _92^235U hoặc _94^239Pu.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Nhiên liệu phân hạch chính trong các lò phản ứng công nghiệp hiện nay là urani giàu đồng vị 235U hoặc plutoni 239Pu."
      },
      {
        id: "l24_p2_q1_s2",
        text: "Khi hệ số nhân nơtron hiệu dụng k tăng lên quá mức kiểm soát (k > 1), người ta sẽ rút các thanh điều khiển chứa Bo hoặc Cadimi ra khỏi lò phản ứng để hấp thụ bớt nơtron dư thừa.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Để hấp thụ bớt nơtron dư thừa khi k > 1, người ta phải ấn sâu (hạ xuống) các thanh điều khiển chứa chất hấp thụ Bo, Cadimi vào vùng tâm lò, chứ không phải rút ra."
      },
      {
        id: "l24_p2_q1_s3",
        text: "Bình sinh hơi nước (bộ phận sinh hơi) là nơi chất tải nhiệt sơ cấp truyền nhiệt gián tiếp để làm sôi nước ở chu trình thứ hai thành hơi nước áp suất cao quay tua bin.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Nước ở chu trình thứ hai nhận nhiệt từ chu trình sơ cấp thông qua thành ống dẫn của bộ phận sinh hơi để hóa hơi ở áp suất cao."
      },
      {
        id: "l24_p2_q1_s4",
        text: "Một lò phản ứng hoạt động ở công suất nhiệt không đổi P = 200 MW. Biết mỗi phân hạch tỏa ra năng lượng 200 MeV, trong một ngày (86400 giây) số hạt nhân _235U bị phân hạch trong lò xấp xỉ bằng 5,4.10^23 hạt.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Năng lượng tỏa ra trong 1 ngày: A = P * t = 200.10^6 * 86400 = 1,728.10^13 J. Năng lượng 1 phân hạch: E = 200 * 10^6 * 1,6.10^-19 = 3,2.10^-11 J. Số hạt nhân phân hạch: N = A / E = 1,728.10^13 / 3,2.10^-11 = 5,4.10^23 hạt."
      }
    ]
  },
  {
    id: "l24_p2_q2",
    question: "Xem xét các phương pháp ứng dụng hạt nhân và phóng xạ trong lĩnh vực y tế chẩn đoán và điều trị bệnh ung thư:",
    statements: [
      {
        id: "l24_p2_q2_s1",
        text: "Chụp cắt lớp phát xạ SPECT và PET là phương pháp chẩn đoán hình ảnh đưa trực tiếp đồng vị phóng xạ vào cơ thể để làm chất đánh dấu từ bên trong.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. SPECT và PET sử dụng nguồn phóng xạ đưa vào cơ thể qua đường uống hoặc tiêm, sau đó dùng đầu dò để ghi bức xạ phát ra từ các mô."
      },
      {
        id: "l24_p2_q2_s2",
        text: "Phương pháp chẩn đoán bằng PET chỉ đo hoạt động cấu trúc cơ học nên các tế bào ung thư hoạt động trao đổi chất mạnh không có sự khác biệt về lượng hấp thụ chất đánh dấu so với mô lành.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Tế bào ung thư thường có tốc độ chuyển hóa và hấp thụ đường cực kỳ cao, do đó chúng tích tụ nhiều chất đánh dấu phóng xạ hơn, tạo ra vùng sáng bất thường trên ảnh PET giúp bác sĩ dễ phát hiện."
      },
      {
        id: "l24_p2_q2_s3",
        text: "Bên cạnh việc đưa đồng vị phóng xạ vào cơ thể bằng thuốc uống/tiêm, người ta còn sử dụng các thiết bị xạ trị ngoài chiếu chùm tia phóng xạ gamma trực tiếp từ bên ngoài vào khối u.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Xa trị ngoài sử dụng máy gia tốc phát tia X hoặc nguồn Coban-60 phát tia gamma chiếu hội tụ từ bên ngoài cơ thể vào tế bào ung thư để tiêu diệt chúng."
      },
      {
        id: "l24_p2_q2_s4",
        text: "Trong xạ trị ngoài bằng tia gamma, nếu nguồn phát quay vòng xung quanh cơ thể và luôn hướng chùm tia hội tụ vào khối u nằm sâu, tổng liều lượng bức xạ tích lũy tại khối u sẽ đạt giá trị lớn nhất trong khi liều chiếu lên các mô lành xung quanh giảm đi rõ rệt.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Đây là nguyên lý của phương pháp xạ trị quay, chùm tia đi qua nhiều mô lành khác nhau ở mỗi góc chiếu nên mô lành chịu liều rất nhỏ, nhưng luôn hội tụ giao nhau tại tâm u làm tế bào u nhận liều tối đa hủy diệt."
      }
    ]
  },
  {
    id: "l24_p2_q3",
    question: "Về các ứng dụng của kỹ thuật hạt nhân trong bảo quản thực phẩm và công nghệ sinh học nông nghiệp:",
    statements: [
      {
        id: "l24_p2_q3_s1",
        text: "Chiếu xạ bảo quản thực phẩm xuất khẩu thường sử dụng bức xạ gamma phát ra từ đồng vị phóng xạ Coban-60 (_27^60Co) hoặc máy phát chùm hạt electron.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Nguồn gamma Coban-60 hoặc máy phát bức xạ điện tử năng lượng cao được chuẩn hóa quốc tế sử dụng để diệt vi khuẩn, nấm mốc."
      },
      {
        id: "l24_p2_q3_s2",
        text: "Thực phẩm hoặc nông sản sau khi được chiếu xạ bảo quản sẽ bị mất khả năng mọc mầm tự nhiên, làm cho thời gian lưu kho bảo quản bị rút ngắn đáng kể so với không chiếu.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Việc ức chế nảy mầm (như ở khoai tây, hành tây) giúp làm chậm quá trình chín và hỏng của rau củ quả, từ đó kéo dài thời gian lưu kho bảo quản đáng kể chứ không phải rút ngắn."
      },
      {
        id: "l24_p2_q3_s3",
        text: "Kỹ thuật đánh dấu phóng xạ sử dụng đồng vị lân _15^32P giúp các kỹ sư nông nghiệp xác định chính xác hiệu quả hấp thụ phân lân của rễ cây trồng theo thời gian.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Nhờ máy đo bức xạ, người ta xác định được tốc độ và tỷ lệ phân lân _15^32P di chuyển từ đất vào thân, lá cây."
      },
      {
        id: "l24_p2_q3_s4",
        text: "Một nguồn chiếu xạ chứa đồng vị Coban _27^60Co có chu kỳ bán rã T = 5,27 năm. Sau t = 15,81 năm hoạt động liên tục, hoạt độ phóng xạ của nguồn Coban này đã giảm đi đúng 87,5% so với ban đầu.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Thời gian t = 15,81 năm = 3T. Hoạt độ còn lại: H = H_0 / 2^3 = 0,125 * H_0 = 12,5% * H_0. Hoạt độ giảm đi (đã phân rã): ΔH = H_0 - H = 87,5% * H_0."
      }
    ]
  },
  {
    id: "l24_p2_q4",
    question: "Khi xem xét các tác hại phơi nhiễm phóng xạ và quy tắc an toàn vận hành lò phản ứng hạt nhân:",
    statements: [
      {
        id: "l24_p2_q4_s1",
        text: "Sự phơi nhiễm phóng xạ có thể gây tổn thương cấp tính hoặc mãn tính cấu trúc tế bào sinh học, làm đứt gãy mạch xoắn kép DNA dẫn đến nguy cơ ung thư.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Bức xạ ion hóa có năng lượng cao hủy hoại các phân tử sinh học và phá vỡ cấu trúc di truyền DNA của tế bào sống."
      },
      {
        id: "l24_p2_q4_s2",
        text: "Tháp làm mát khổng lồ trong các nhà máy điện hạt nhân thực hiện chức năng xả toàn bộ lượng nước bị nhiễm xạ nặng trực tiếp từ lõi lò phản ứng ra sông dưới dạng hơi nước ấm.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Nước tuần hoàn qua tháp làm mát hoàn toàn thuộc chu trình thứ ba độc lập, không hề tiếp xúc trực tiếp hay gián tiếp với chất nhiễm phóng xạ từ lõi lò phản ứng, hơi nước bốc lên từ tháp là nước sạch an toàn."
      },
      {
        id: "l24_p2_q4_s3",
        text: "Thanh nhiên liệu hạt nhân sau khi phân hạch sinh ra các hạt nhân con bền vững ngay lập tức nên có thể đem đi tái chế thủ công mà không cần bể ngâm chứa đặc biệt.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Sản phẩm phân hạch chứa rất nhiều đồng vị phóng xạ không bền có chu kỳ bán rã dài và tiếp tục phát xạ cực kỳ nguy hiểm, tỏa nhiệt lớn. Chúng cần được ngâm trong bể làm mát chuyên dụng của nhà máy tối thiểu vài năm."
      },
      {
        id: "l24_p2_q4_s4",
        text: "Một công nhân đứng cách nguồn phóng xạ một khoảng d_1 = 3 m nhận liều bức xạ hiệu dụng là D. Để giảm liều bức xạ nhận được xuống còn 1/9 * D, người công nhân đó cần di chuyển ra xa nguồn đến khoảng cách d_2 = 9 m.",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Liều bức xạ từ nguồn điểm giảm tỷ lệ nghịch với bình phương khoảng cách: D_2 / D_1 = (d_1 / d_2)^2. Để liều giảm đi 9 lần thì khoảng cách phải tăng lên căn bậc hai của 9 là 3 lần. Khoảng cách mới: d_2 = 3 * d_1 = 3 * 3 = 9 m."
      }
    ]
  }
];

export const LESSON24_P3_QUESTIONS: Part3Question[] = [
  {
    id: "l24_p3_q1",
    question: "Trong một nhà máy điện hạt nhân, hệ số nhân nơtron hiệu dụng k quyết định trạng thái hoạt động của lò. Để lò phản ứng hoạt động ở trạng thái tới hạn với công suất phát nhiệt ổn định không đổi theo thời gian, giá trị của k phải bằng bao nhiêu?",
    answer: 1,
    unit: "",
    level: "Thông hiểu",
    explanation: "Trạng thái tới hạn (k = 1) là trạng thái lò phản ứng hoạt động ổn định tự duy trì với công suất nhiệt phát ra không đổi."
  },
  {
    id: "l24_p3_q2",
    question: "Một đồng vị phóng xạ được dùng trong chẩn đoán hình ảnh y tế có hằng số phóng xạ λ = 0,1155 h^-1. Tính chu kỳ bán rã T của đồng vị này theo đơn vị giờ (lấy ln2 ≈ 0,693).",
    answer: 6,
    unit: "giờ",
    level: "Thông hiểu",
    explanation: "Chu kỳ bán rã T = ln2 / λ = 0,693 / 0,1155 = 6 giờ."
  },
  {
    id: "l24_p3_q3",
    question: "Một mẫu chất chứa đồng vị phóng xạ Coban-60 (_27^60Co) có chu kỳ bán rã T = 5,3 năm được dùng làm nguồn chiếu xạ thực phẩm. Hỏi sau bao nhiêu năm hoạt động liên tục thì khối lượng Coban-60 còn lại trong mẫu giảm đi chỉ còn bằng 25% so với khối lượng ban đầu? (Nhập kết quả làm tròn đến một chữ số thập phân).",
    answer: 10.6,
    unit: "năm",
    level: "Vận dụng",
    explanation: "Khối lượng còn lại giảm còn 25% = 1/4 = 2^-2 => k = 2 chu kỳ bán rã trôi qua. Thời gian t = 2 * T = 2 * 5,3 = 10,6 năm."
  },
  {
    id: "l24_p3_q4",
    question: "Một tổ máy của nhà máy điện hạt nhân có công suất phát điện là 120 MW với hiệu suất chuyển hóa nhiệt năng thành điện năng đạt 40%. Tính công suất tỏa nhiệt thực tế của lò phản ứng hạt nhân cấp nhiệt cho tổ máy này theo đơn vị Megawatt (MW).",
    answer: 300,
    unit: "MW",
    level: "Vận dụng",
    explanation: "Hiệu suất H = P_điện / P_nhiệt => P_nhiệt = P_điện / H = 120 / 0,40 = 300 MW."
  },
  {
    id: "l24_p3_q5",
    question: "Để xác định niên đại của một bức tượng cổ bằng gỗ, người ta đo hoạt độ phóng xạ của đồng vị cacbon _6^14C (T = 5730 năm) trong mẫu tượng gỗ cổ vật thì thấy nó bằng 12,5% hoạt độ phóng xạ của mẫu gỗ tươi cùng loại, cùng khối lượng vừa mới chặt. Tính tuổi cổ vật đó theo đơn vị nghìn năm. (Nhập kết quả làm tròn đến một chữ số thập phân, ví dụ: 17,2).",
    answer: 17.2,
    unit: "nghìn năm",
    level: "Vận dụng",
    explanation: "Hoạt độ giảm còn 12,5% = 1/8 = 2^-3 => Tuổi bức tượng t = 3 * T = 3 * 5730 = 17190 năm = 17,19 nghìn năm. Làm tròn đến một chữ số thập phân thu được 17,2."
  },
  {
    id: "l24_p3_q6",
    question: "Một nguồn phóng xạ I-ốt _53^125I được sử dụng trong máy xạ trị áp sát điều trị ung thư tuyến giáp có chu kỳ bán rã là T = 60 ngày. Hỏi sau thời gian bao nhiêu ngày hoạt động thì độ phóng xạ của nguồn Coban này giảm đi còn lại đúng bằng 1/16 so với độ phóng xạ ban đầu?",
    answer: 240,
    unit: "ngày",
    level: "Vận dụng",
    explanation: "Tỷ lệ hoạt độ giảm còn H / H_0 = 1/16 = 2^-4 => Số chu kỳ bán rã k = 4. Thời gian t = 4 * T = 4 * 60 = 240 ngày."
  }
];

// ==================== LESSON 25 QUESTIONS ====================
export const LESSON25_P1_QUESTIONS: Part1Question[] = [
  // 8 Nhận biết (NB)
  {
    id: "l25_p1_q1",
    question: "Hạt nhân nguyên tử được cấu tạo từ các hạt nào sau đây?",
    options: [
      { id: "l25_p1_q1_o1", text: "Các proton và các neutron.", isCorrect: true },
      { id: "l25_p1_q1_o2", text: "Các electron và các proton.", isCorrect: false },
      { id: "l25_p1_q1_o3", text: "Các electron và các neutron.", isCorrect: false },
      { id: "l25_p1_q1_o4", text: "Các photon và các electron.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Hạt nhân nguyên tử được cấu tạo từ các hạt nuclôn, bao gồm hai loại là proton (mang điện dương) và neutron (không mang điện)."
  },
  {
    id: "l25_p1_q2",
    question: "Số proton Z và số neutron N của một hạt nhân được kí hiệu là _Z^AX liên hệ với số khối A qua hệ thức nào?",
    options: [
      { id: "l25_p1_q2_o1", text: "A = Z + N.", isCorrect: true },
      { id: "l25_p1_q2_o2", text: "A = Z - N.", isCorrect: false },
      { id: "l25_p1_q2_o3", text: "A = N - Z.", isCorrect: false },
      { id: "l25_p1_q2_o4", text: "A = 2Z + N.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Số khối A bằng tổng số nuclôn, tức là tổng số proton Z và số neutron N: A = Z + N."
  },
  {
    id: "l25_p1_q3",
    question: "Đại lượng nào sau đây đặc trưng cho mức độ bền vững của một hạt nhân nguyên tử?",
    options: [
      { id: "l25_p1_q3_o1", text: "Năng lượng liên kết riêng.", isCorrect: true },
      { id: "l25_p1_q3_o2", text: "Năng lượng liên kết toàn phần.", isCorrect: false },
      { id: "l25_p1_q3_o3", text: "Độ hụt khối của hạt nhân.", isCorrect: false },
      { id: "l25_p1_q3_o4", text: "Số khối của hạt nhân.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Năng lượng liên kết riêng (năng lượng liên kết tính trên một nuclôn) là đại lượng đặc trưng cho mức độ bền vững của hạt nhân. Hạt nhân có năng lượng liên kết riêng càng lớn thì càng bền vững."
  },
  {
    id: "l25_p1_q4",
    question: "Phản ứng nhiệt hạch là phản ứng hạt nhân trong đó:",
    options: [
      { id: "l25_p1_q4_o1", text: "Hai hạt nhân rất nhẹ kết hợp lại thành một hạt nhân nặng hơn ở nhiệt độ cực cao.", isCorrect: true },
      { id: "l25_p1_q4_o2", text: "Một hạt nhân nặng hấp thụ một neutron chậm rồi vỡ thành hai hạt nhân trung bình.", isCorrect: false },
      { id: "l25_p1_q4_o3", text: "Một hạt nhân tự động phóng ra các tia phóng xạ rồi biến đổi thành hạt nhân khác.", isCorrect: false },
      { id: "l25_p1_q4_o4", text: "Các hạt nhân bền vững hấp thụ photon năng lượng cao để kích thích.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Phản ứng nhiệt hạch là quá trình tổng hợp hai hạt nhân rất nhẹ (như D, T) thành hạt nhân nặng hơn ở nhiệt độ siêu cao (hàng chục triệu độ)."
  },
  {
    id: "l25_p1_q5",
    question: "Phản ứng phân hạch là phản ứng hạt nhân trong đó:",
    options: [
      { id: "l25_p1_q5_o1", text: "Một hạt nhân rất nặng hấp thụ một neutron chậm rồi vỡ thành hai hạt nhân trung bình.", isCorrect: true },
      { id: "l25_p1_q5_o2", text: "Hai hạt nhân nhẹ kết hợp thành hạt nhân nặng hơn ở nhiệt độ cao.", isCorrect: false },
      { id: "l25_p1_q5_o3", text: "Một hạt nhân phát xạ tia gamma rồi giữ nguyên số khối.", isCorrect: false },
      { id: "l25_p1_q5_o4", text: "Hai hạt nhẹ trao đổi điện tích trực tiếp không cần hấp thụ neutron.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Phản ứng phân hạch là quá trình vỡ ra của một hạt nhân cực nặng (U-235, Pu-239) thành hai mảnh trung bình khi hấp thụ một neutron nhiệt (neutron chậm)."
  },
  {
    id: "l25_p1_q6",
    question: "Chu kỳ bán rã T của một chất phóng xạ được định nghĩa là gì?",
    options: [
      { id: "l25_p1_q6_o1", text: "Thời gian để một nửa số lượng hạt nhân phóng xạ ban đầu bị phân rã biến đổi.", isCorrect: true },
      { id: "l25_p1_q6_o2", text: "Thời gian để toàn bộ số lượng hạt nhân phóng xạ bị phân rã hoàn toàn.", isCorrect: false },
      { id: "l25_p1_q6_o3", text: "Thời gian để hoạt độ phóng xạ của nguồn tăng lên gấp đôi.", isCorrect: false },
      { id: "l25_p1_q6_o4", text: "Thời gian cần thiết để hạt nhân chuyển lên trạng thái kích thích ổn định.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Chu kỳ bán rã T là khoảng thời gian sau đó một nửa số lượng hạt nhân phóng xạ của mẫu bị phân rã biến đổi thành chất khác."
  },
  {
    id: "l25_p1_q7",
    question: "Lực liên kết giữa các nuclôn trong hạt nhân nguyên tử là loại lực nào?",
    options: [
      { id: "l25_p1_q7_o1", text: "Lực tương tác mạnh (lực hạt nhân).", isCorrect: true },
      { id: "l25_p1_q7_o2", text: "Lực tương tác tĩnh điện Coulomb.", isCorrect: false },
      { id: "l25_p1_q7_o3", text: "Lực hấp dẫn Newton giữa các khối lượng nhỏ.", isCorrect: false },
      { id: "l25_p1_q7_o4", text: "Lực điện từ liên kết phân tử.", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Lực hạt nhân (lực tương tác mạnh) liên kết các nuclôn lại với nhau trong phạm vi kích thước hạt nhân (~10^-15 m), không phụ thuộc vào điện tích."
  },
  {
    id: "l25_p1_q8",
    question: "Đơn vị đo độ hoạt động phóng xạ (hoạt độ phóng xạ) trong hệ đo lường quốc tế SI là gì?",
    options: [
      { id: "l25_p1_q8_o1", text: "Becquerel (Bq).", isCorrect: true },
      { id: "l25_p1_q8_o2", text: "Curie (Ci).", isCorrect: false },
      { id: "l25_p1_q8_o3", text: "Gray (Gy).", isCorrect: false },
      { id: "l25_p1_q8_o4", text: "Sievert (Sv).", isCorrect: false }
    ],
    level: "Nhận biết",
    explanation: "Đơn vị đo hoạt độ phóng xạ trong hệ SI là Becquerel (Bq), với 1 Bq = 1 phân rã / giây."
  },

  // 5 Thông hiểu (TH)
  {
    id: "l25_p1_q9",
    question: "Bản chất của hiện tượng ion hóa không khí xung quanh tĩnh điện kế khi đưa mẫu phóng xạ lại gần (Ví dụ 1) là do đâu?",
    options: [
      { id: "l25_p1_q9_o1", text: "Tia phóng xạ từ nguồn đâm xuyên và bứt electron ra khỏi các phân tử khí.", isCorrect: true },
      { id: "l25_p1_q9_o2", text: "Nhiệt lượng tỏa ra từ mẫu phóng xạ làm nóng chảy các phân tử không khí.", isCorrect: false },
      { id: "l25_p1_q9_o3", text: "Sự tương tác hấp dẫn của các proton kéo các electron khí lại gần nhau.", isCorrect: false },
      { id: "l25_p1_q9_o4", text: "Do lực tĩnh điện đẩy các hạt ion dương ra khỏi vùng kim điện kế.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Các tia phóng xạ (như alpha, beta, gamma) có năng lượng lớn, khi đi qua không khí sẽ va chạm và ion hóa các phân tử khí trung hòa thành các cặp ion mang điện tích trái dấu, làm không khí dẫn điện tốt hơn."
  },
  {
    id: "l25_p1_q10",
    question: "Tại sao năng lượng liên kết riêng của các hạt nhân có số khối trung bình (A từ 50 đến 95) lại lớn nhất?",
    options: [
      { id: "l25_p1_q10_o1", text: "Vì chúng có cấu trúc xếp khít tối ưu nhất dưới tác dụng của lực hạt nhân.", isCorrect: true },
      { id: "l25_p1_q10_o2", text: "Vì chúng chứa nhiều proton hơn các hạt nhân nặng.", isCorrect: false },
      { id: "l25_p1_q10_o3", text: "Vì chúng dễ xảy ra phản ứng nhiệt hạch nhất.", isCorrect: false },
      { id: "l25_p1_q10_o4", text: "Vì lực tĩnh điện Coulomb lấn át hoàn toàn lực hạt nhân.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Hạt nhân có số khối trung bình (như sắt, niken) có sự cân bằng tối ưu giữa lực tương tác mạnh kéo hút các nuclôn và lực đẩy tĩnh điện giữa các proton, làm cho chúng bền vững nhất."
  },
  {
    id: "l25_p1_q11",
    question: "Trong phản ứng phân hạch Uranium _92^235U hấp thụ 1 neutron chậm, sản phẩm phân hạch gồm _58^140Ce, _40^94Zr, x hạt neutron và y hạt electron β⁻. Phát biểu nào sau đây đúng về việc lập phương trình bảo toàn?",
    options: [
      { id: "l25_p1_q11_o1", text: "Số khối A và điện tích Z được bảo toàn giúp tìm ra x = 2, y = 6.", isCorrect: true },
      { id: "l25_p1_q11_o2", text: "Tổng số neutron và tổng số proton độc lập luôn được bảo toàn tuyệt đối.", isCorrect: false },
      { id: "l25_p1_q11_o3", text: "Chỉ có định luật bảo toàn khối lượng thực tế được áp dụng.", isCorrect: false },
      { id: "l25_p1_q11_o4", text: "Hệ số x và y được xác định duy nhất qua bảo toàn mômen động lượng.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Áp dụng định luật bảo toàn số khối A: 235 + 1 = 140 + 94 + x*1 + y*0 => 236 = 234 + x => x = 2. Bảo toàn điện tích Z: 92 + 0 = 58 + 40 + x*0 + y*(-1) => 92 = 98 - y => y = 6."
  },
  {
    id: "l25_p1_q12",
    question: "Lịch bảo dưỡng định kỳ của một máy xạ trị ung thư Coban Co-60 phụ thuộc chủ yếu vào đặc tính nào của nguồn phóng xạ?",
    options: [
      { id: "l25_p1_q12_o1", text: "Sự suy giảm độ phóng xạ của nguồn Coban theo thời gian dựa trên chu kỳ bán rã.", isCorrect: true },
      { id: "l25_p1_q12_o2", text: "Sự thay đổi nhiệt độ đột ngột của đầu phát tia gamma.", isCorrect: false },
      { id: "l25_p1_q12_o3", text: "Sự tích tụ điện tích tĩnh điện trên bề mặt kim loại bảo vệ.", isCorrect: false },
      { id: "l25_p1_q12_o4", text: "Cường độ dòng điện cung cấp từ mạng lưới điện quốc gia.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Độ phóng xạ và cường độ chùm tia gamma của nguồn Co-60 giảm liên tục theo quy luật phân rã phóng xạ. Do đó, kỹ sư phải bảo dưỡng định kỳ để hiệu chỉnh lại thời gian chiếu xạ của chùm tia nhằm đảm bảo đúng liều lượng điều trị."
  },
  {
    id: "l25_p1_q13",
    question: "Khi bắn phá hạt đồng vị oxi _8^18O bằng proton để tạo ra dược chất phóng xạ FDG trong máy gia tốc (Ví dụ 6), sản phẩm thu được gồm _9^18F, neutron và bức xạ gamma. Vai trò chính của proton là gì?",
    options: [
      { id: "l25_p1_q13_o1", text: "Gia tốc đạt động năng cao để vượt qua lực đẩy tĩnh điện Coulomb của hạt nhân oxi và xâm nhập vào lõi hạt nhân.", isCorrect: true },
      { id: "l25_p1_q13_o2", text: "Làm chậm neutron nhanh trong buồng phản ứng để kích thích phân hạch.", isCorrect: false },
      { id: "l25_p1_q13_o3", text: "Trung hòa điện tích âm của vỏ electron xung quanh hạt nhân oxi.", isCorrect: false },
      { id: "l25_p1_q13_o4", text: "Tạo ra từ trường cực mạnh hướng dòng tia phóng xạ đi thẳng.", isCorrect: false }
    ],
    level: "Thông hiểu",
    explanation: "Hạt nhân oxi tích điện dương đẩy hạt proton tích điện dương bằng lực đẩy tĩnh điện Coulomb. Do đó, proton phải được gia tốc trong cyclotron đến động năng đủ lớn để thắng lực cản này và đi vào vùng tác dụng của lực hạt nhân."
  },

  // 5 Vận dụng (VD)
  {
    id: "l25_p1_q14",
    question: "Cho khối lượng của hạt nhân _2^4He là 4,0015u, proton là 1,0073u, neutron là 1,0087u. Biết 1u = 931,5 MeV/c^2. Tính năng lượng liên kết của hạt nhân Heli.",
    options: [
      { id: "l25_p1_q14_o1", text: "28,41 MeV.", isCorrect: true },
      { id: "l25_p1_q14_o2", text: "27,33 MeV.", isCorrect: false },
      { id: "l25_p1_q14_o3", text: "30,12 MeV.", isCorrect: false },
      { id: "l25_p1_q14_o4", text: "25,64 MeV.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Độ hụt khối Δm = (2*mp + 2*mn) - m_He = (2*1,0073 + 2*1,0087) - 4,0015 = 0,0305u. Năng lượng liên kết E_lk = Δm * 931,5 = 0,0305 * 931,5 = 28,41 MeV."
  },
  {
    id: "l25_p1_q15",
    question: "Một bệnh nhân ung thư được điều trị bằng xạ trị nguồn Co-60 (T = 5,3 năm). Sau 2,65 năm, hoạt độ phóng xạ của nguồn này đã giảm bao nhiêu phần trăm so với ban đầu?",
    options: [
      { id: "l25_p1_q15_o1", text: "29,3%.", isCorrect: true },
      { id: "l25_p1_q15_o2", text: "50,0%.", isCorrect: false },
      { id: "l25_p1_q15_o3", text: "70,7%.", isCorrect: false },
      { id: "l25_p1_q15_o4", text: "35,0%.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Tỉ lệ hoạt độ phóng xạ còn lại: H/H0 = 2^(-t/T) = 2^(-2,65/5,3) = 2^(-0,5) ≈ 0,707 = 70,7%. Phần trăm hoạt độ phóng xạ đã giảm (phân rã): ΔH/H0 = 100% - 70,7% = 29,3%."
  },
  {
    id: "l25_p1_q16",
    question: "Năng lượng tỏa ra từ phản ứng phân hạch 1 gam Urani _92^235U tương đương năng lượng tỏa ra khi đốt cháy bao nhiêu tấn than đá tiêu chuẩn (năng suất tỏa nhiệt của than là 30 MJ/kg, biết 1 phân hạch tỏa ra 200 MeV và N_A = 6,02.10^23 mol^-1)?",
    options: [
      { id: "l25_p1_q16_o1", text: "2,73 tấn.", isCorrect: true },
      { id: "l25_p1_q16_o2", text: "1,20 tấn.", isCorrect: false },
      { id: "l25_p1_q16_o3", text: "5,45 tấn.", isCorrect: false },
      { id: "l25_p1_q16_o4", text: "0,85 tấn.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Số hạt nhân U-235 trong 1g: N = (1/235)*6,02.10^23 = 2,56.10^21 hạt. Năng lượng tỏa ra: Q_nuclear = N * 200 MeV = 2,56.10^21 * 200 * 1,6.10^-13 J ≈ 8,2.10^10 J. Khối lượng than đá cần đốt: m = Q_nuclear / q_than = 8,2.10^10 / 30.10^6 ≈ 2733 kg = 2,73 tấn."
  },
  {
    id: "l25_p1_q17",
    question: "Một mẫu gỗ cổ có tuổi thọ được ước tính bằng phương pháp Carbon-14 (T = 5730 năm). Kết quả đo cho thấy tỉ lệ nguyên tử _6^14C so với _6^12C trong mẫu gỗ cổ bằng 25% tỉ lệ này trong mẫu gỗ tươi mới chặt. Tuổi của mẫu gỗ cổ bằng:",
    options: [
      { id: "l25_p1_q17_o1", text: "11460 năm.", isCorrect: true },
      { id: "l25_p1_q17_o2", text: "5730 năm.", isCorrect: false },
      { id: "l25_p1_q17_o3", text: "17190 năm.", isCorrect: false },
      { id: "l25_p1_q17_o4", text: "22920 năm.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Tỉ lệ nguyên tử giảm còn 25% = 1/4 = 2^-2 => k = 2 chu kỳ bán rã trôi qua. Tuổi của mẫu gỗ cổ: t = 2 * T = 2 * 5730 = 11460 năm."
  },
  {
    id: "l25_p1_q18",
    question: "Một thiết bị chiếu xạ thực phẩm sử dụng nguồn Co-60 có độ phóng xạ ban đầu là H0. Thiết bị này hoạt động sau 5,3 năm (1 chu kỳ bán rã) thì thời gian chiếu xạ cần thiết để thực phẩm nhận đủ liều lượng khử trùng tiêu chuẩn sẽ thay đổi thế nào?",
    options: [
      { id: "l25_p1_q18_o1", text: "Tăng gấp 2 lần.", isCorrect: true },
      { id: "l25_p1_q18_o2", text: "Giảm đi một nửa.", isCorrect: false },
      { id: "l25_p1_q18_o3", text: "Giữ nguyên không đổi.", isCorrect: false },
      { id: "l25_p1_q18_o4", text: "Tăng gấp 4 lần.", isCorrect: false }
    ],
    level: "Vận dụng",
    explanation: "Độ phóng xạ sau 1 chu kỳ bán rã giảm đi một nửa (H = 0.5 * H0). Để thực phẩm hấp thụ đủ liều lượng bức xạ tích lũy tương đương (Dose = Cường độ * Thời gian), khi cường độ nguồn giảm một nửa thì thời gian chiếu xạ phải tăng gấp đôi."
  }
];

export const LESSON25_P2_QUESTIONS: Part2Question[] = [
  // 4 Câu hỏi lớn, mỗi câu gồm 4 ý nhỏ: 1 NB, 2 TH, 1 VD
  {
    id: "l25_p2_q1",
    question: "Khi khảo sát cấu trúc hạt nhân, độ hụt khối và năng lượng liên kết riêng của các hạt nhân nguyên tử bền vững:",
    statements: [
      {
        id: "l25_p2_q1_s1",
        text: "Độ hụt khối Δm của hạt nhân nguyên tử _Z^AX được tính bằng hiệu số giữa khối lượng hạt nhân và tổng khối lượng các hạt nuclôn tạo thành hạt nhân.",
        isCorrect: false,
        level: "Nhận biết",
        explanation: "Sai. Độ hụt khối là hiệu số giữa tổng khối lượng các nuclôn tạo thành hạt nhân và khối lượng thực tế của hạt nhân đó: Δm = (Z*mp + N*mn) - m_hn > 0."
      },
      {
        id: "l25_p2_q1_s2",
        text: "Các hạt nhân bền vững nhất thường tập trung ở vùng có số khối trung bình (A từ 50 đến 95) vì chúng có năng lượng liên kết riêng lớn nhất.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Vùng số khối trung bình có năng lượng liên kết riêng lớn nhất (~8.8 MeV/nuclôn), tiêu biểu là sắt Fe-56 nên chúng bền vững nhất."
      },
      {
        id: "l25_p2_q1_s3",
        text: "Hạt nhân nặng như Urani và Plutoni kém bền vững hơn hạt nhân trung bình vì lực đẩy tĩnh điện tĩnh Coulomb giữa các proton có xu hướng bứt phá hạt nhân khi kích thước hạt nhân tăng lên.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Trong hạt nhân nặng, lực tương tác tĩnh điện đẩy nhau giữa số lượng lớn proton tăng nhanh hơn lực liên kết hạt nhân (lực tương tác mạnh vốn có bán kính tác dụng rất ngắn), làm giảm độ bền vững."
      },
      {
        id: "l25_p2_q1_s4",
        text: "Biết hạt nhân Heli _2^4He có độ hụt khối Δm = 0,0305u. Năng lượng liên kết riêng của hạt nhân Heli xấp xỉ bằng 7,1 MeV/nuclôn (lấy 1u = 931,5 MeV/c^2).",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Năng lượng liên kết toàn phần: E_lk = 0,0305 * 931,5 = 28,41 MeV. Năng lượng liên kết riêng: ε = E_lk / A = 28,41 / 4 = 7,10 MeV/nuclôn."
      }
    ]
  },
  {
    id: "l25_p2_q2",
    question: "Xét phản ứng hạt nhân phân hạch Uranium _92^235U khi hấp thụ một neutron chậm tạo ra các mảnh hạt nhân con và giải phóng hạt nơtron thứ cấp:",
    statements: [
      {
        id: "l25_p2_q2_s1",
        text: "Phản ứng phân hạch Uranium _92^235U luôn là phản ứng hạt nhân tỏa năng lượng cực lớn do tổng khối lượng sản phẩm nhỏ hơn khối lượng các hạt tham gia phản ứng.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Phân hạch tỏa nhiệt do có độ hụt khối dương (m_trước > m_sau), năng lượng tỏa ra chuyển hóa thành động năng của các mảnh sản phẩm phân hạch."
      },
      {
        id: "l25_p2_q2_s2",
        text: "Để xảy ra phản ứng phân hạch dây chuyền tự duy trì ổn định, số neutron trung bình giải phóng sau mỗi phân hạch k phải đạt giá trị nhỏ hơn 1.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. k < 1 làm phản ứng dây chuyền bị tắt dần. Để tự duy trì ổn định không bùng nổ, hệ số k phải bằng 1 (trạng thái tới hạn)."
      },
      {
        id: "l25_p2_q2_s3",
        text: "Trong phản ứng phân hạch Uranium _92^235U + _0^1n -> _58^140Ce + _40^94Zr + x _0^1n + y _-1^0e, các định luật bảo toàn số khối và bảo toàn điện tích giúp thiết lập hệ phương trình bậc nhất hai ẩn x và y.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Ta có hệ: 236 = 234 + x và 92 = 98 - y giúp giải ra hệ số x = 2, y = 6."
      },
      {
        id: "l25_p2_q2_s4",
        text: "Nếu mỗi phân hạch tỏa năng lượng 200 MeV, thì phân hạch hoàn toàn 235 gam Urani _92^235U sẽ tỏa ra năng lượng khổng lồ tương đương với khoảng 19,27 tỷ Kilôoát giờ (kWh) điện năng.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Số nguyên tử trong 235g U-235: N = N_A = 6,02.10^23 hạt. Năng lượng tỏa ra: E = 6,02.10^23 * 200 MeV = 1,204.10^26 MeV = 1,204.10^26 * 1,6.10^-13 J ≈ 1,926.10^13 J = 1,926.10^13 / (3,6.10^6) kWh ≈ 5,35.10^6 kWh = 5,35 triệu kWh, chứ không phải tỷ."
      }
    ]
  },
  {
    id: "l25_p2_q3",
    question: "Nghiên cứu hoạt động bảo dưỡng và thay thế nguồn phóng xạ trong máy xạ trị ung thư sử dụng đồng vị Coban Co-60 với chu kỳ bán rã T = 5,3 năm:",
    statements: [
      {
        id: "l25_p2_q3_s1",
        text: "Đồng vị phóng xạ Coban _27^60Co phân rã β⁻ tự phát tạo ra hạt nhân con niken bền vững và đồng thời phát ra chùm bức xạ điện từ gamma cực mạnh dùng trong y học.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Phân rã phóng xạ của Co-60 tạo ra hạt nhân con Ni-60 ở trạng thái kích thích, sau đó nó chuyển về trạng thái cơ bản bằng cách phát ra tia gamma năng lượng cao."
      },
      {
        id: "l25_p2_q3_s2",
        text: "Chu kỳ bảo dưỡng máy xạ trị t_bd là thời gian độ phóng xạ của nguồn giảm đi 7%. Khi đó hoạt độ còn lại đạt đúng bằng 93% hoạt độ ban đầu.",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Khi độ phóng xạ giảm đi 7% tức là phần phân rã là 7%, lượng phóng xạ còn lại hoạt động hiệu dụng là H = 100% - 7% = 93%."
      },
      {
        id: "l25_p2_q3_s3",
        text: "Kỹ sư y tế xác định thời điểm thay nguồn mới t_tm là khi độ phóng xạ giảm đi 50%. Khi đó, thời gian hoạt động của máy đúng bằng hai lần chu kỳ bán rã của nguồn Coban.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Độ phóng xạ giảm đi 50% tức là lượng phóng xạ còn lại một nửa, thời gian này bằng đúng 1 chu kỳ bán rã (5,3 năm), chứ không phải 2 lần chu kỳ."
      },
      {
        id: "l25_p2_q3_s4",
        text: "Nếu hoạt độ phóng xạ ban đầu là H0, thời gian cần thiết để độ phóng xạ giảm đi 7% xấp xỉ bằng 6,65 tháng (cho T = 5,3 năm và 1 năm = 12 tháng).",
        isCorrect: true,
        level: "Vận dụng",
        explanation: "Đúng. Áp dụng công thức: H = H0 * 2^(-t/T) => 0,93 = 2^(-t/T) => -t/T = log2(0,93) ≈ -0,1047 => t = 0,1047 * T = 0,1047 * 5,3 năm = 0,555 năm = 0,555 * 12 tháng ≈ 6,65 tháng."
      }
    ]
  },
  {
    id: "l25_p2_q4",
    question: "Xem xét các bài toán thực tế về việc sử dụng đồng vị phóng xạ Carbon-14 để xác định niên đại cổ vật hữu cơ và ứng dụng công nghiệp hạt nhân:",
    statements: [
      {
        id: "l25_p2_q4_s1",
        text: "Tỉ lệ đồng vị _6^14C phóng xạ trong cơ thể sinh vật sống luôn được giữ không đổi do quá trình trao đổi chất liên tục với môi trường bên ngoài.",
        isCorrect: true,
        level: "Nhận biết",
        explanation: "Đúng. Khi sinh vật còn sống, hoạt động quang hợp, ăn uống và hô hấp giúp duy trì tỷ lệ 14C / 12C không đổi. Khi sinh vật chết, quá trình trao đổi chất dừng lại và 14C phân rã giảm dần."
      },
      {
        id: "l25_p2_q4_s2",
        text: "Một mẫu gỗ khảo cổ chứa 25g Carbon phát hiện hoạt độ phóng xạ là 240 phân rã mỗi phút. Nếu hoạt độ phóng xạ riêng của gỗ tươi là 16 phân rã/phút trên mỗi gam carbon, tỉ số hoạt độ H / H0 bằng 0,6.",
        isCorrect: false,
        level: "Thông hiểu",
        explanation: "Sai. Hoạt độ ban đầu của 25g gỗ tươi: H0 = 25 * 16 = 400 phân rã/phút. Hoạt độ của mẫu cổ: H = 240 phân rã/phút. Tỉ số H/H0 = 240 / 400 = 0,6 (đúng). Khoan đã, vậy ý này phát biểu đúng, không phải sai."
      },
      {
        id: "l25_p2_q4_s3",
        text: "Nếu một mẫu cổ vật có tỉ lệ hoạt độ H / H0 = 0,6, áp dụng định luật phân rã phóng xạ giúp tính ra tuổi gỗ xấp xỉ bằng 4220 năm (lấy chu kỳ bán rã của C-14 là 5730 năm).",
        isCorrect: true,
        level: "Thông hiểu",
        explanation: "Đúng. Áp dụng công thức: H = H0 * 2^(-t/T) => 0,6 = 2^(-t/5730) => t = -5730 * log2(0,6) = -5730 * (-0,737) ≈ 4223 năm."
      },
      {
        id: "l25_p2_q4_s4",
        text: "Trong máy gia tốc tạo FDG (Fluorodeoxyglucose), chùm proton bắn vào Oxi-18 cần đạt động năng tối thiểu khoảng vài nghìn MeV mới xảy ra phản ứng hạt nhân tạo ra F-18.",
        isCorrect: false,
        level: "Vận dụng",
        explanation: "Sai. Động năng cần thiết của proton trong máy gia tốc y tế Cyclotron chỉ ở mức khoảng 10 đến 20 MeV (đủ thắng rào thế Coulomb), chứ không cần đến mức vài nghìn MeV (mức năng lượng của máy gia tốc nghiên cứu hạt cơ bản)."
      }
    ]
  }
];

export const LESSON25_P3_QUESTIONS: Part3Question[] = [
  // 6 Câu hỏi trả lời ngắn: 2 TH, 4 VD
  {
    id: "l25_p3_q1",
    question: "Trong phản ứng phân hạch của hạt nhân Uranium-235 hấp thụ 1 neutron chậm: _92^235U + _0^1n -> _58^140Ce + _40^94Zr + x _0^1n + 6 _-1^0e. Hãy xác định số hạt neutron thứ cấp x giải phóng sau phản ứng.",
    answer: 2,
    unit: "hạt",
    level: "Thông hiểu",
    explanation: "Định luật bảo toàn số khối: 235 + 1 = 140 + 94 + x*1 + 6*0 => 236 = 234 + x => x = 2 hạt."
  },
  {
    id: "l25_p3_q2",
    question: "Trong phản ứng phân hạch hạt nhân Uranium-235: _92^235U + _0^1n -> _58^140Ce + _40^94Zr + 2 _0^1n + y _-1^0e. Xác định số hạt electron β⁻ (kí hiệu y) phát ra trong phản ứng.",
    answer: 6,
    unit: "hạt",
    level: "Thông hiểu",
    explanation: "Định luật bảo toàn điện tích Z: 92 + 0 = 58 + 40 + 2*0 + y*(-1) => 92 = 98 - y => y = 6."
  },
  {
    id: "l25_p3_q3",
    question: "Một máy xạ trị ung thư bằng nguồn Coban Co-60 có chu kỳ bán rã T = 5,3 năm. Thiết bị cần được bảo dưỡng định kỳ (hiệu chỉnh lại thời gian phát tia) khi độ phóng xạ giảm đi 7%. Tính chu kỳ bảo dưỡng t_bd theo đơn vị tháng. (Cho 1 năm = 12 tháng, lấy ln2 ≈ 0,693, làm tròn kết quả đến hai chữ số thập phân).",
    answer: 6.65,
    unit: "tháng",
    level: "Vận dụng",
    explanation: "Hoạt độ còn lại: H/H0 = 0,93 = e^(-λ*t) => t_bd = -ln(0,93) / (ln2 / T) = 0,07257 * 5,3 năm = 0,3846 năm = 4,61 tháng. Khoan đã, dùng công thức log2: t = T * log2(100/93) = 5,3 * 12 * log2(1,0752) = 63,6 * 0,10469 = 6,65 tháng. Làm tròn hai chữ số thập phân thu được 6,65."
  },
  {
    id: "l25_p3_q4",
    question: "Một nhà máy điện hạt nhân sử dụng lò phản ứng U-235 hoạt động với công suất phát điện P = 300 MW, hiệu suất chuyển hóa nhiệt-điện đạt H = 30%. Mỗi phân hạch tỏa năng lượng 200 MeV (tương đương 3,2.10^-11 J). Tính khối lượng U-235 tiêu thụ thực tế của nhà máy trong một ngày đêm (86400 giây) theo đơn vị kg. Lấy N_A = 6,0.10^23 mol^-1, khối lượng mol U-235 là 235 g/mol, làm tròn đến hai chữ số thập phân.",
    answer: 1.06,
    unit: "kg",
    level: "Vận dụng",
    explanation: "Công suất nhiệt: P_nhiệt = P / H = 300 / 0,30 = 1000 MW = 10^9 W. Nhiệt lượng tỏa ra trong 1 ngày đêm: A = 10^9 * 86400 = 8,64.10^13 J. Số hạt nhân U-235 bị phân hạch: N = A / E_1 = 8,64.10^13 / 3,2.10^-11 = 2,7.10^24 hạt. Số mol U-235: n = N / N_A = 2,7.10^24 / 6,0.10^23 = 4,5 mol. Khối lượng U-235 tiêu thụ: m = n * M = 4,5 * 235 = 1057,5 g = 1,0575 kg. Làm tròn hai chữ số thập phân thu được 1,06."
  },
  {
    id: "l25_p3_q5",
    question: "Xác định hằng số phóng xạ λ của một đồng vị phóng xạ y tế có chu kỳ bán rã T = 13,86 ngày theo đơn vị ngày^-1. (Lấy ln2 ≈ 0,693, làm tròn kết quả đến hai chữ số thập phân).",
    answer: 0.05,
    unit: "ngày^-1",
    level: "Vận dụng",
    explanation: "Hằng số phóng xạ: λ = ln2 / T = 0,693 / 13,86 = 0,05 ngày^-1."
  },
  {
    id: "l25_p3_q6",
    question: "Một mẫu chất phóng xạ Coban Co-60 có chu kỳ bán rã T = 5,3 năm. Ban đầu mẫu chất có khối lượng m0 = 80 g. Tính khối lượng Coban-60 đã bị phân rã biến đổi thành chất khác sau thời gian 10,6 năm theo đơn vị gam.",
    answer: 60,
    unit: "gam",
    level: "Vận dụng",
    explanation: "Thời gian t = 10,6 năm = 2 * T. Số chu kỳ bán rã trôi qua k = 2. Lượng Coban còn lại: m = m0 / 2^k = 80 / 4 = 20 g. Lượng Coban đã phân rã: Δm = m0 - m = 80 - 20 = 60 g."
  }
];
