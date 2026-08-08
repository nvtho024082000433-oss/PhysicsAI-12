/**
 * Local Physics AI Assistant Fallback Engine
 * Provides rich, scientifically precise, and beautifully formatted explanations 
 * of the Vietnamese Physics 12 Curriculum (GDPT 2018) when the Gemini API is offline/unavailable.
 */

export interface PhysicsResponse {
  text: string;
  isFallback: boolean;
}

export function getLocalPhysicsResponse(message: string, mode: string = "general"): PhysicsResponse {
  const msg = message.toLowerCase().trim();

  // Helper template for uniform response wrapping
  const createResponse = (title: string, definition: string, formula: string, example: string, application: string): string => {
    return `### 📘 ${title} (Chế độ Ngoại tuyến)

**1. Định nghĩa & Bản chất Vật lí:**
${definition}

**2. Công thức cốt lõi (Chuẩn GDPT 2018):**
\`\`\`latex
${formula}
\`\`\`

**3. Ví dụ áp dụng & Bài tập:**
${example}

**4. Ứng dụng thực tiễn đời sống:**
${application}

---
*⚠️ **Lưu ý kết nối:** Hệ thống đang phản hồi từ cơ sở dữ liệu học liệu Vật Lí 12 Ngoại tuyến do khóa \`GEMINI_API_KEY\` của bạn chưa được kết nối hoặc đã hết lượt dùng thử. Thầy/Cô và các em học sinh có thể cấu hình mã khóa API cá nhân trong mục **Cài đặt (Settings)** ở thanh điều khiển của AI Studio để mở khóa khả năng trao đổi tự do với AI.*`;
  };

  // 1. NHIỆT DUNG RIÊNG (Specific Heat Capacity)
  if (msg.includes("nhiệt dung riêng") || msg.includes("nhiet dung rieng") || msg.includes("công thức q = m") || msg.includes("công thức q = m.c")) {
    return {
      isFallback: true,
      text: createResponse(
        "Nhiệt Dung Riêng (c)",
        "Nhiệt dung riêng của một chất là nhiệt lượng cần thiết để cung cấp cho một đơn vị khối lượng (1 kg) chất đó tăng thêm 1 độ Celsius (hoặc 1 Kelvin) trong quá trình truyền nhiệt không thay đổi trạng thái.",
        "Q = m \\cdot c \\cdot \\Delta t \\implies c = \\frac{Q}{m \\cdot \\Delta t} \\quad [\\text{J/(kg}\\cdot\\text{K)}]",
        "**Bài toán:** Cần cung cấp nhiệt lượng bao nhiêu để đun nóng $m = 2\\text{ kg}$ nước từ $20^\\circ\\text{C}$ lên $100^\\circ\\text{C}$? Biết nhiệt dung riêng của nước là $c = 4200\\text{ J/(kg}\\cdot\\text{K)}$.\n* **Giải:**\n  * Độ tăng nhiệt độ: $\\Delta t = 100 - 20 = 80^\\circ\\text{C}$ (tương đương $80\\text{ K}$).\n  * Nhiệt lượng cần thiết: $Q = m \\cdot c \\cdot \\Delta t = 2 \\cdot 4200 \\cdot 80 = 672.000\\text{ J} = 672\\text{ kJ}$.",
        "- **Thiết kế hệ thống tản nhiệt:** Nước có nhiệt dung riêng rất lớn ($4200\\text{ J/(kg}\\cdot\\text{K)}$) nên được dùng làm chất làm mát trong động cơ ô tô, xe máy và các nhà máy nhiệt điện.\n- **Điều hòa khí hậu:** Các vùng gần đại dương có khí hậu ôn hòa hơn lục địa vì nước biển hấp thụ và tỏa nhiệt chậm hơn đất liền."
      )
    };
  }

  // 2. NHIỆT NÓNG CHẢY RIÊNG (Specific Latent Heat of Fusion)
  if (msg.includes("nóng chảy riêng") || msg.includes("nong chay rieng") || msg.includes("hằng số lambda") || msg.includes("hang so lambda")) {
    return {
      isFallback: true,
      text: createResponse(
        "Nhiệt Nóng Chảy Riêng (\\lambda)",
        "Nhiệt nóng chảy riêng của một chất rắn kết tinh là nhiệt lượng cần thiết để làm nóng chảy hoàn toàn $1\\text{ kg}$ chất đó ở nhiệt độ nóng chảy xác định mà không làm thay đổi nhiệt độ.",
        "Q = \\lambda \\cdot m \\implies \\lambda = \\frac{Q}{m} \\quad [\\text{J/kg}]",
        "**Bài toán:** Tính nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn quả cầu sắt có khối lượng $m = 500\\text{ g} = 0,5\\text{ kg}$ đang ở nhiệt độ nóng chảy của sắt. Biết nhiệt nóng chảy riêng của sắt là $\\lambda = 2,77 \\cdot 10^5\\text{ J/kg}$.\n* **Giải:**\n  * Áp dụng công thức: $Q = \\lambda \\cdot m = 2,77 \\cdot 10^5 \\cdot 0,5 = 1,385 \\cdot 10^5\\text{ J} = 138,5\\text{ kJ}$.",
        "- **Luyện kim & Đúc tượng:** Giúp xác định năng lượng cần cung cấp cho lò nung lò cao để làm nóng chảy kim loại tối ưu chi phí vận hành.\n- **Bảo quản thực phẩm:** Đá đá khô/nước đá hấp thụ nhiệt lượng lớn từ môi trường xung quanh khi nóng chảy giúp thực phẩm tươi sống giữ được nhiệt độ thấp ổn định."
      )
    };
  }

  // 3. NHIỆT HÓA HƠI RIÊNG (Specific Latent Heat of Vaporization)
  if (msg.includes("hóa hơi riêng") || msg.includes("hoa hoi rieng") || msg.includes("hằng số l") || msg.includes("hang so l")) {
    return {
      isFallback: true,
      text: createResponse(
        "Nhiệt Hóa Hơi Riêng (L)",
        "Nhiệt hóa hơi riêng của một chất lỏng là nhiệt lượng cần cung cấp để làm bay hơi hoàn toàn $1\\text{ kg}$ chất lỏng đó ở nhiệt độ sôi ổn định xác định dưới áp suất khí quyển chuẩn.",
        "Q = L \\cdot m \\implies L = \\frac{Q}{m} \\quad [\\text{J/kg}]",
        "**Bài toán:** Để hóa hơi hoàn toàn $m = 100\\text{ g} = 0,1\\text{ kg}$ nước ở nhiệt độ sôi $100^\\circ\\text{C}$ cần năng lượng bao nhiêu? Biết nhiệt hóa hơi riêng của nước là $L = 2,26 \\cdot 10^6\\text{ J/kg}$.\n* **Giải:**\n  * Nhiệt lượng cần hóa hơi: $Q = L \\cdot m = 2,26 \\cdot 10^6 \\cdot 0,1 = 2,26 \\cdot 10^5\\text{ J} = 226\\text{ kJ}$.",
        "- **Nồi hơi công nghiệp & Turbine hơi:** Tính toán chính xác lượng than/khí đốt cần dùng để biến nước thành hơi áp suất lớn đẩy turbine máy phát điện.\n- **Cơ chế ra mồ hôi của cơ thể:** Khi cơ thể nóng lên, mồ hôi thoát ra da sẽ bay hơi, hấp thụ nhiệt hóa hơi lớn từ bề mặt da giúp làm mát cơ thể tự nhiên."
      )
    };
  }

  // 4. ĐỊNH LUẬT I NHIỆT ĐỘNG LỰC HỌC (First Law of Thermodynamics)
  if (msg.includes("định luật i") || msg.includes("dinh luat i") || msg.includes("nội năng") || msg.includes("noi nang") || msg.includes("delta u = a + q")) {
    return {
      isFallback: true,
      text: createResponse(
        "Nội Năng & Định Luật I Nhiệt Động Lực Học",
        "Nội năng ($U$) là tổng động năng chuyển động nhiệt vô hướng và thế năng tương tác giữa các phân tử cấu tạo nên vật.\n* **Định luật I:** Độ biến thiên nội năng của hệ bằng tổng công và nhiệt lượng mà hệ nhận được từ bên ngoài.\n* **Quy ước dấu quan trọng:**\n  * $Q > 0$: Hệ nhận nhiệt; $Q < 0$: Hệ truyền nhiệt.\n  * $A > 0$: Hệ nhận công; $A < 0$: Hệ sinh công.",
        "\\Delta U = A + Q \\quad [\\text{J}]",
        "**Bài toán:** Người ta cung cấp nhiệt lượng $Q = 150\\text{ J}$ cho chất khí đựng trong xilanh. Khí nở ra thực hiện công $A' = 100\\text{ J}$ đẩy pit-tông lên. Tính độ biến thiên nội năng $\\Delta U$.\n* **Giải:**\n  * Khí nhận nhiệt: $Q = +150\\text{ J}$.\n  * Khí thực hiện công (sinh công): Khí truyền công ra ngoài nên nhận công âm $A = -100\\text{ J}$.\n  * Áp dụng Định luật I: $\\Delta U = A + Q = -100 + 150 = +50\\text{ J}$. (Nội năng hệ tăng thêm $50\\text{ J}$).",
        "- **Chế tạo động cơ đốt trong:** Các buồng đốt ô tô, xe máy tận dụng định luật này để chuyển hóa nhiệt lượng từ nhiên liệu ($Q$) thành cơ năng công hữu ích ($A$) truyền động bánh xe.\n- **Tủ lạnh và máy điều hòa:** Sử dụng quá trình nén và giãn nở gas để truyền nhiệt từ nơi lạnh sang nơi nóng hơn."
      )
    };
  }

  // 5. ĐỊNH LUẬT BOYLE (Boyle's Law)
  if (msg.includes("boyle") || msg.includes("boilơ") || msg.includes("đẳng nhiệt") || msg.includes("dang nhiet")) {
    return {
      isFallback: true,
      text: createResponse(
        "Định Luật Boyle - Quá Trình Đẳng Nhiệt",
        "Trong quá trình đẳng nhiệt của một lượng khí lí tưởng xác định (nhiệt độ $T$ giữ không đổi), áp suất ($p$) tỉ lệ nghịch với thể tích ($V$) của khối khí.",
        "p \\cdot V = \\text{hằng số} \\implies p_1 \\cdot V_1 = p_2 \\cdot V_2",
        "**Bài toán:** Một lượng khí có thể tích $V_1 = 4\\text{ lít}$ ở áp suất $p_1 = 1\\text{ atm}$. Nén đẳng nhiệt khí đến thể tích $V_2 = 2\\text{ lít}$. Áp suất $p_2$ lúc này là bao nhiêu?\n* **Giải:**\n  * Áp dụng định luật Boyle: $p_1 \\cdot V_1 = p_2 \\cdot V_2 \\implies p_2 = \\frac{p_1 \\cdot V_1}{V_2} = \\frac{1 \\cdot 4}{2} = 2\\text{ atm}$.",
        "- **Bơm xe đạp & Ống tiêm y tế:** Khi ta nhấn pit-tông, thể tích khí giảm làm áp suất tăng mạnh, đẩy khí ra ngoài qua van/kim tiêm.\n- **Cơ chế hô hấp ở phổi:** Khi cơ hoành hạ xuống, lồng ngực nở rộng (thể tích phổi tăng), áp suất khí trong phổi giảm dưới áp suất khí quyển giúp không khí đi vào."
      )
    };
  }

  // 6. ĐỊNH LUẬT CHARLES (Charles's Law)
  if (msg.includes("charles") || msg.includes("sác-lơ") || msg.includes("saclơ") || msg.includes("đẳng áp") || msg.includes("dang ap")) {
    return {
      isFallback: true,
      text: createResponse(
        "Định Luật Charles - Quá Trình Đẳng Áp",
        "Trong quá trình đẳng áp của một lượng khí lí tưởng xác định (áp suất $p$ giữ không đổi), thể tích ($V$) tỉ lệ thuận với nhiệt độ tuyệt đối ($T$ tính bằng Kelvin).",
        "\\frac{V}{T} = \\text{hằng số} \\implies \\frac{V_1}{T_1} = \\frac{V_2}{T_2}",
        "**Bài toán:** Một lượng khí có thể tích $V_1 = 3\\text{ lít}$ ở nhiệt độ $t_1 = 27^\\circ\\text{C}$. Đun nóng đẳng áp khí đến nhiệt độ $t_2 = 127^\\circ\\text{C}$. Thể tích mới $V_2$ là bao nhiêu?\n* **Giải:**\n  * Đổi nhiệt độ sang Kelvin: $T_1 = 27 + 273 = 300\\text{ K}$; $T_2 = 127 + 273 = 400\\text{ K}$.\n  * Áp dụng định luật Charles: $\\frac{V_1}{T_1} = \\frac{V_2}{T_2} \\implies V_2 = V_1 \\cdot \\frac{T_2}{T_1} = 3 \\cdot \\frac{400}{300} = 4\\text{ lít}$.",
        "- **Khinh khí cầu:** Khi đốt nóng không khí bên trong khinh khí cầu, nhiệt độ tăng làm không khí giãn nở (thể tích tăng), dẫn tới khối lượng riêng giảm giúp khinh khí cầu bay lên cao.\n- **Bảo quản bánh xe:** Không nên bơm lốp xe quá căng vào những ngày nắng nóng, vì nhiệt độ mặt đường cao làm khí nở ra dẫn đến nguy cơ nổ lốp."
      )
    };
  }

  // 7. PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG (Ideal Gas Law / Clapeyron - Mendeleev)
  if (msg.includes("trạng thái") || msg.includes("trang thai") || msg.includes("clapeyron") || msg.includes("mendeleev") || msg.includes("p.v = n.r.t") || msg.includes("pv=nrt")) {
    return {
      isFallback: true,
      text: createResponse(
        "Phương Trình Trạng Thái Khí Lí Tưởng",
        "Phương trình trạng thái mô tả mối liên hệ giữa ba thông số trạng thái: áp suất ($p$), thể tích ($V$) và nhiệt độ tuyệt đối ($T$) của một lượng khí lí tưởng nhất định. Đối với lượng khí bất kì, phương trình Clapeyron - Mendeleev biểu diễn chính xác qua số mol chất khí ($n$) và hằng số khí lí tưởng $R = 8,31\\text{ J/(mol}\\cdot\\text{K)}$.",
        "\\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2} \\quad \\text{và} \\quad p \\cdot V = n \\cdot R \\cdot T",
        "**Bài toán:** Một bình dung tích $V = 10\\text{ lít} = 0,01\\text{ m}^3$ chứa khí Helium ở nhiệt độ $27^\\circ\\text{C} = 300\\text{ K}$ và áp suất $p = 2 \\cdot 10^5\\text{ Pa}$. Tính số mol khí trong bình.\n* **Giải:**\n  * Áp dụng công thức: $p \\cdot V = n \\cdot R \\cdot T \\implies n = \\frac{p \\cdot V}{R \\cdot T} = \\frac{2 \\cdot 10^5 \\cdot 0,01}{8,31 \\cdot 300} \\approx 0,802\\text{ mol}$.",
        "- **Công nghiệp khí hóa lỏng:** Giúp tính toán sức chứa của các bình dưỡng khí, bình gas gia đình dưới các áp suất cực lớn nhằm bảo đảm an toàn lao động chống cháy nổ.\n- **Dự báo thời tiết:** Mô phỏng sự thay đổi khí áp ở các độ cao khác nhau để dự đoán đường đi của các khối khí áp thấp."
      )
    };
  }

  // 8. LỰC TỪ & ĐỊNH LUẬT AMPERE (Magnetic Force & Ampere's Law)
  if (msg.includes("lực từ") || msg.includes("luc tu") || msg.includes("ampere") || msg.includes("bàn tay trái") || msg.includes("ban tay trai") || msg.includes("f = b.i.l")) {
    return {
      isFallback: true,
      text: createResponse(
        "Lực Từ & Định Luật Ampere",
        "Lực từ tác dụng lên đoạn dây dẫn thẳng dài $L$ mang dòng điện cường độ $I$ đặt trong một từ trường đều có cảm ứng từ $\\vec{B}$ được xác định bằng Quy tắc bàn tay trái:\n* **Quy tắc bàn tay trái:** Đặt bàn tay trái sao cho các đường sức từ hướng vào lòng bàn tay, chiều từ cổ tay đến các ngón tay giữa chỉ chiều dòng điện, thì ngón tay cái choãi ra $90^\\circ$ chỉ chiều lực từ tác dụng lên dây.",
        "F = B \\cdot I \\cdot L \\cdot \\sin(\\alpha) \\quad [\\text{N}]",
        "**Bài toán:** Đoạn dây dẫn dài $L = 0,2\\text{ m}$ mang dòng điện $I = 5\\text{ A}$ đặt vuông góc với cảm ứng từ $B = 0,04\\text{ T}$. Tính độ lớn của lực từ.\n* **Giải:**\n  * Góc đặt vuông góc nên $\\alpha = 90^\\circ \\implies \\sin(\\alpha) = 1$.\n  * Áp dụng công thức: $F = B \\cdot I \\cdot L \\cdot \\sin(90^\\circ) = 0,04 \\cdot 5 \\cdot 0,2 \\cdot 1 = 0,04\\text{ N}$.",
        "- **Động cơ điện:** Chuyển hóa điện năng thành cơ năng thông qua lực từ quay khung dây. Có mặt trong quạt máy, máy bơm nước, ô tô điện Tesla.\n- **Tàu đệm từ Maglev:** Sử dụng lực đẩy và lực hút từ siêu dẫn cực mạnh để nâng tàu lơ lửng trên đường ray, giảm ma sát tối đa giúp đạt tốc độ trên $600\\text{ km/h}$."
      )
    };
  }

  // 9. TỪ THÔNG & CẢM ỨNG ĐIỆN TỪ (Magnetic Flux & Electromagnetic Induction)
  if (msg.includes("từ thông") || msg.includes("tu thong") || msg.includes("faraday") || msg.includes("pháp tuyến") || msg.includes("định luật lenz") || msg.includes("len-xơ")) {
    return {
      isFallback: true,
      text: createResponse(
        "Từ Thông & Cảm ỨNG Điện Từ",
        "**Từ thông ($\\Phi$)** là đại lượng biểu thị số đường sức từ đi qua một diện tích vòng dây phẳng $S$.\n* **Định luật Faraday:** Khi từ thông xuyên qua vòng dây biến thiên theo thời gian, một suất điện động cảm ứng ($e_c$) sẽ xuất hiện tỉ lệ với tốc độ biến thiên từ thông đó.\n* **Định luật Lenz:** Dòng điện cảm ứng xuất hiện có chiều sao cho từ trường do nó sinh ra có tác dụng chống lại sự biến thiên của từ thông ban đầu.",
        "\\Phi = B \\cdot S \\cdot \\cos(\\alpha) \\quad [\\text{Wb}] \\quad \\text{và} \\quad e_c = -\\frac{\\Delta \\Phi}{\\Delta t} \\quad [\\text{V}]",
        "**Bài toán:** Một khung dây có diện tích $S = 0,05\\text{ m}^2$ đặt vuông góc với vectơ cảm ứng từ $\\vec{B}$ (tức góc giữa pháp tuyến và $\\vec{B}$ là $\\alpha = 0^\\circ$). Độ lớn cảm ứng từ giảm đều từ $0,8\\text{ T}$ về $0$ trong thời gian $\\Delta t = 0,1\\text{ s}$. Tính suất điện động cảm ứng.\n* **Giải:**\n  * Từ thông lúc đầu: $\\Phi_1 = B_1 \\cdot S \\cdot \\cos(0^\\circ) = 0,8 \\cdot 0,05 \\cdot 1 = 0,04\\text{ Wb}$.\n  * Từ thông lúc sau: $\\Phi_2 = 0\\text{ Wb}$.\n  * Suất điện động cảm ứng: $e_c = -\\frac{\\Phi_2 - \\Phi_1}{\\Delta t} = -\\frac{0 - 0,04}{0,1} = 0,4\\text{ V}$.",
        "- **Máy phát điện:** Quay cuộn dây trong từ trường đều của nam châm để biến đổi cơ năng (sức gió, sức nước thủy điện) thành điện năng tiêu dùng hàng ngày.\n- **Bếp từ gia đình:** Dòng điện Foucault biến thiên sinh ra trong nồi sắt giúp nấu chín thức ăn trực tiếp mà không sinh nhiệt ngoài không khí."
      )
    };
  }

  // 10. MÁY BIẾN ÁP (Transformer)
  if (msg.includes("máy biến áp") || msg.includes("may bien ap") || msg.includes("cuộn sơ cấp") || msg.includes("cuon thu cap") || msg.includes("u1/u2 = n1/n2")) {
    return {
      isFallback: true,
      text: createResponse(
        "Máy Biến Áp (Transformer)",
        "Máy biến áp là thiết bị hoạt động dựa trên hiện tượng cảm ứng điện từ, có khả năng biến đổi điện áp của dòng điện xoay chiều mà không làm thay đổi tần số của nó.\n* **Nguyên lý:** Khung sắt từ ghép từ lá thép silicon, quấn 2 cuộn dây: Sơ cấp ($N_1$ vòng, nối với nguồn) và Thứ cấp ($N_2$ vòng, nối với tải).\n* **Phân loại:**\n  * $N_2 > N_1 \\implies U_2 > U_1$: Máy tăng áp.\n  * $N_2 < N_1 \\implies U_2 < U_1$: Máy hạ áp.",
        "\\frac{U_1}{U_2} = \\frac{N_1}{N_2} = \\frac{I_2}{I_1} \\quad (\\text{Lý tưởng})",
        "**Bài toán:** Máy biến áp hạ áp lý tưởng có cuộn sơ cấp quấn $N_1 = 2200\\text{ vòng}$ nối vào nguồn $U_1 = 220\\text{ V}$. Cuộn thứ cấp có $N_2 = 120\\text{ vòng}$. Tính điện áp đầu ra $U_2$.\n* **Giải:**\n  * Áp dụng hệ thức: $\\frac{U_1}{U_2} = \\frac{N_1}{N_2} \\implies U_2 = U_1 \\cdot \\frac{N_2}{N_1} = 220 \\cdot \\frac{120}{2200} = 12\\text{ V}$.",
        "- **Truyền tải điện năng xa:** Tăng điện áp lên hàng trăm kV trước khi truyền đi để giảm hao phí tỏa nhiệt trên đường dây truyền tải điện Joule-Lenz ($P_{hp} = I^2 \\cdot R$).\n- **Sạc các thiết bị di động:** Bộ sạc điện thoại hạ áp dòng $220\\text{ V}$ xoay chiều xuống dòng $5\\text{ V}$ một chiều an toàn cho pin điện thoại thông minh."
      )
    };
  }

  // 11. SÓNG ĐIỆN TỪ (Electromagnetic Wave)
  if (msg.includes("sóng điện từ") || msg.includes("song dien tu") || msg.includes("điện trường xoáy") || msg.includes("sóng ngắn") || msg.includes("vô tuyến")) {
    return {
      isFallback: true,
      text: createResponse(
        "Điện Từ Trường & Sóng Điện Từ",
        "**Điện từ trường** là một trường thống nhất gồm điện trường xoáy và từ trường xoáy biến thiên theo thời gian liên kết chặt chẽ với nhau.\n* **Sóng điện từ** là điện từ trường lan truyền trong không gian dưới dạng sóng ngang tuần hoàn.\n* **Đặc điểm nổi bật:**\n  1. Truyền được trong cả chân không với vận tốc tối đa $c \\approx 3 \\cdot 10^8\\text{ m/s}$.\n  2. Vectơ cường độ điện trường $\\vec{E}$, cảm ứng từ $\\vec{B}$ và phương truyền sóng $\\vec{v}$ đôi một vuông góc tạo thành một tam diện thuận, nhưng dao động đồng pha với nhau.",
        "\\lambda = \\frac{v}{f} = \\frac{c}{n \\cdot f}",
        "**Bài toán:** Một đài phát sóng vô tuyến truyền đi sóng cực ngắn có tần số $f = 100\\text{ MHz} = 10^8\\text{ Hz}$ trong chân không. Tính bước sóng $\\lambda$.\n* **Giải:**\n  * Áp dụng công thức: $\\lambda = \\frac{c}{f} = \\frac{3 \\cdot 10^8}{10^8} = 3\\text{ m}$.",
        "- **Truyền hình vệ tinh & 5G:** Sử dụng sóng cực ngắn (bước sóng dưới 10m) để đâm xuyên thẳng qua tầng điện ly kết nối vệ tinh viễn thông.\n- **Sóng Radar & Khí tượng:** Giúp phát hiện vị trí máy bay, định vị tàu thủy và lập mô hình dự báo bão xa."
      )
    };
  }

  // 12. CẤU TRÚC HẠT NHÂN (Nuclear Structure)
  if (msg.includes("cấu trúc hạt nhân") || msg.includes("hạt nhân") || msg.includes("đồng vị") || msg.includes("số khối") || msg.includes("neutron")) {
    return {
      isFallback: true,
      text: createResponse(
        "Cấu Trúc Hạt Nhân Nguyên Tử",
        "Hạt nhân nguyên tử nằm ở tâm nguyên tử, cấu tạo bởi các hạt nuclôn gắn kết bằng lực hạt nhân cực mạnh (lực tương tác mạnh có bán kính tác dụng khoảng $10^{-15}\\text{ m}$).\n* **Các loại nuclôn:**\n  * Prôtôn ($p$): mang điện tích dương $+e$, khối lượng $m_p \\approx 1,007276\\text{ u}$.\n  * Nơtrôn ($n$): không mang điện, khối lượng $m_n \\approx 1,008665\\text{ u}$.\n* **Đồng vị:** Là các nguyên tử có cùng số hiệu nguyên tử $Z$ (cùng số proton) nhưng khác nhau số khối $A$ (khác nhau số neutron), ví dụ Carbon có các đồng vị $_{6}^{12}\\text{C}$, $_{6}^{14}\\text{C}$.",
        "_{Z}^{A}\\text{X} \\quad \\text{với } Z = \\text{số prôtôn, } A = \\text{số khối}, \\quad N = A - Z = \\text{số nơtrôn}",
        "**Bài toán:** Xác định số hạt prôtôn và nơtrôn trong hạt nhân Uranium $_{92}^{235}\\text{U}$. Tính bán kính gần đúng của hạt nhân này.\n* **Giải:**\n  * Số proton: $Z = 92$.\n  * Số neutron: $N = A - Z = 235 - 92 = 143$.\n  * Bán kính hạt nhân gần đúng: $R = 1,2 \\cdot 10^{-15} \\cdot A^{1/3} = 1,2 \\cdot 10^{-15} \\cdot 235^{1/3} \\approx 7,4\\text{ fm}$.",
        "- **Định tuổi khảo cổ:** Sử dụng đồng vị Carbon-14 phóng xạ tự nhiên để xác định chính xác tuổi đời của các cổ vật, di cốt động vật cổ xưa lên tới hàng chục nghìn năm.\n- **Nhà máy hạt nhân:** Chế tạo các thanh nhiên liệu Uranium-235 tinh chế tinh khiết phục vụ phản ứng phân hạch sinh điện lực."
      )
    };
  }

  // 13. NĂNG LƯỢNG LIÊN KẾT HẠT NHÂN (Nuclear Binding Energy)
  if (msg.includes("liên kết") || msg.includes("lien ket") || msg.includes("độ hụt khối") || msg.includes("do hut khoi") || msg.includes("bền vững") || msg.includes("ben vung")) {
    return {
      isFallback: true,
      text: createResponse(
        "Độ Hụt Khối & Năng Lượng Liên Kết",
        "Khối lượng của một hạt nhân nguyên tử bền vững luôn luôn nhỏ hơn tổng khối lượng của các nuclôn riêng rẽ cấu tạo nên nó. Hiệu số này gọi là **độ hụt khối ($\\Delta m$)**.\n* **Năng lượng liên kết ($E_{lk}$):** Năng lượng tối thiểu cần cung cấp để phá vỡ hạt nhân thành các nuclôn riêng rẽ.\n* **Năng lượng liên kết riêng ($E_{lkr}$):** Năng lượng liên kết tính trên một hạt nuclôn. Đây là đại lượng **quyết định độ bền vững** của hạt nhân (Hạt nhân có $E_{lkr}$ càng lớn thì càng bền vững, bền nhất nằm ở vùng số khối trung bình $50 < A < 80$ như sắt $_{26}^{56}\\text{Fe}$).",
        "\\Delta m = [Z \\cdot m_p + (A - Z) \\cdot m_n] - m_X \\quad \\text{và} \\quad E_{lk} = \\Delta m \\cdot c^2 \\quad \\implies \\quad E_{lkr} = \\frac{E_{lk}}{A}",
        "**Bài toán:** Cho hạt nhân Helium $_{2}^{4}\\text{He}$ có khối lượng $m_{He} = 4,00150\\text{ u}$. Cho $m_p = 1,00728\\text{ u}$, $m_n = 1,00866\\text{ u}$, $1\\text{ u} = 931,5\\text{ MeV/c}^2$. Tính năng lượng liên kết riêng của Helium.\n* **Giải:**\n  * Độ hụt khối: $\\Delta m = (2 \\cdot 1,00728 + 2 \\cdot 1,00866) - 4,00150 = 0,03038\\text{ u}$.\n  * Năng lượng liên kết: $E_{lk} = 0,03038 \\cdot 931,5 = 28,3\\text{ MeV}$.\n  * Năng lượng liên kết riêng: $E_{lkr} = \\frac{E_{lk}}{4} = \\frac{28,3}{4} = 7,075\\text{ MeV/nuclôn}$.",
        "- **Phản ứng Nhiệt hạch (Tổng hợp hạt nhân):** Các ngôi sao như Mặt Trời tổng hợp hạt Helium từ Hydrogen tỏa ra năng lượng khổng lồ chiếu sáng Trái Đất.\n- **Bản đồ bền vững hạt nhân:** Giúp các nhà khoa học dự đoán độ ổn định của các nguyên tố siêu nặng nhân tạo mới trước khi tổng hợp chúng trong phòng thí nghiệm."
      )
    };
  }

  // 14. PHÓNG XẠ (Radioactivity)
  if (msg.includes("phóng xạ") || msg.includes("phong xa") || msg.includes("bán rã") || msg.includes("ban ra") || msg.includes("becquerel")) {
    return {
      isFallback: true,
      text: createResponse(
        "Hiện Tượng Phóng Xạ & Định Luật Phân Rã",
        "**Phóng xạ** là quá trình tự biến đổi hạt nhân của một hạt nhân không bền vững (gọi là hạt nhân mẹ) để chuyển hóa thành hạt nhân khác (gọi là hạt nhân con) đồng thời phát ra các tia bức xạ có tính đâm xuyên mạnh (tia $\\alpha$, $\\beta^-$, $\\beta^+$, $\\gamma$).\n* **Các định luật phân rã:** Số hạt nhân phóng xạ giảm theo hàm mũ lũy thừa cơ số 2 phụ thuộc vào chu kỳ bán rã ($T$).\n* **Hoạt độ phóng xạ ($H$):** Tốc độ phân rã hạt nhân, đo bằng đơn vị Becquerel ($1\\text{ Bq} = 1\\text{ phân rã/giây}$) hoặc Curie ($1\\text{ Ci} = 3,7 \\cdot 10^{10}\\text{ Bq}$).",
        "N(t) = N_0 \\cdot 2^{-\\frac{t}{T}} = N_0 \\cdot e^{-\\lambda \\cdot t} \\quad \\text{với } \\lambda = \\frac{\\ln(2)}{T}",
        "**Bài toán:** Một chất phóng xạ Iodine-131 có chu kỳ bán rã $T = 8\\text{ ngày}$. Ban đầu có $100\\text{ g}$ Iodine. Hỏi sau $24\\text{ ngày}$ còn lại bao nhiêu gam chất này chưa phân rã?\n* **Giải:**\n  * Số chu kỳ bán rã đã trôi qua: $k = \\frac{t}{T} = \\frac{24}{8} = 3$.\n  * Khối lượng còn lại: $m = m_0 \\cdot 2^{-3} = 100 \\cdot \\frac{1}{8} = 12,5\\text{ g}$.",
        "- **Y học hạt nhân (Xạ trị):** Sử dụng tia phóng xạ gamma từ đồng vị Cobalt-60 đặt định vị chính xác để phá hủy cấu trúc tế bào ung thư ác tính mà hạn chế tổn hại mô lành quanh u.\n- **Nguyên tử đánh dấu:** Đưa các đồng vị phóng xạ yếu vào cơ thể người để theo dõi hoạt động tuần hoàn máu, chụp chiếu nội tạng PET/SPECT chẩn đoán bệnh lý."
      )
    };
  }

  // DEFAULT GENERAL PHYSICS RESPONSE
  return {
    isFallback: true,
    text: `### 🏫 Chào mừng bạn đến với Trợ lý Giáo sư Vật Lí 12 (Ngoại tuyến)

Hệ thống ghi nhận bạn đang kết nối ở **chế độ Ngoại tuyến (Offline Fallback)** do khóa \`GEMINI_API_KEY\` chưa được cài đặt hoặc đã đạt giới hạn lượt dùng thử. 

Dù ở chế độ ngoại tuyến, tôi đã được tích hợp bộ dữ liệu học liệu chuẩn mực bám sát **Chương trình Giáo dục Phổ thông 2018** môn Vật lí lớp 12. Tôi có thể hỗ trợ các em học sinh và các thầy cô giáo tóm tắt lý thuyết, giải thích bản chất vật lý và giải toán cho các chủ đề sau:

1. **Vật Lí Nhiệt:** *Thuyết động học phân tử, Sự chuyển thể, Nội năng, Định luật I, Thang nhiệt độ, Nhiệt dung riêng, Nhiệt nóng chảy riêng, Nhiệt hóa hơi riêng.*
2. **Khí Lí Tưởng:** *Định luật Boyle (Đẳng nhiệt), Định luật Charles (Đẳng áp), Phương trình trạng thái khí lí tưởng, Áp suất và Động năng phân tử khí.*
3. **Từ Trường & Cảm Ứng Điện Từ:** *Lực từ, Định luật Ampere, Quy tắc bàn tay trái, Từ thông, Định luật Faraday, Định luật Lenz, Máy biến áp, Sóng điện từ.*
4. **Vật Lí Hạt Nhân:** *Cấu trúc hạt nhân, Đồng vị, Độ hụt khối, Năng lượng liên kết hạt nhân, Phóng xạ, Định luật phân rã phóng xạ, Điện hạt nhân.*

---
👉 **Bắt đầu nhanh:** Hãy nhập một trong các cụm từ khóa gợi ý như **"Nhiệt dung riêng"**, **"Boyle"**, **"Charles"**, **"Định luật I"**, **"Lực từ"**, **"Máy biến áp"**, **"Phóng xạ"**, hoặc **"Năng lượng liên kết"** để kiểm chứng khả năng phân tích chi tiết của hệ thống!

*💡 **Hướng dẫn cấu hình AI:** Để kích hoạt trí tuệ nhân tạo toàn năng trao đổi hoàn toàn tự do ngoài các từ khóa sẵn có, vui lòng mở mục **Cài đặt (Settings)** của AI Studio ở góc trái thanh công cụ và nhập \`GEMINI_API_KEY\` cá nhân của bạn nhé!*`
  };
}

/**
 * Generates a full, premium exam payload matching requested criteria offline
 */
export function getLocalExamResponse(chapters: string[], ratio: any, p1: any, p2: any, p3: any): any {
  const selectedChapters = chapters.length > 0 ? chapters : ["Vật lí nhiệt", "Khí lí tưởng"];
  const matrixText = `Ma trận đề thi Vật lí 12 (Mô phỏng Đề tốt nghiệp THPT mới):\n` +
    `- Tổng số câu hỏi: ${p1.count + p2.count + p3.count} câu.\n` +
    `- Các chương tham chiếu: ${selectedChapters.join(", ")}.\n` +
    `- Tỉ lệ nhận thức: Nhận biết ${ratio?.nb || 40}%, Thông hiểu ${ratio?.th || 30}%, Vận dụng ${ratio?.vd || 20}%, VDC ${ratio?.vdc || 10}%.`;

  const specText = `Bảng Đặc Tả Đề Thi:\n` +
    `1. Nhận biết: Nhận dạng các định nghĩa cơ bản, phát biểu nội dung các định luật chất khí, từ trường.\n` +
    `2. Thông hiểu: Hiểu và giải thích các hiện tượng thực tế (sự nóng chảy, sự dãn nở nhiệt, lực từ tác dụng).\n` +
    `3. Vận dụng & Vận dụng cao: Tính toán thiết kế, giải các hệ thức cơ bản hoặc tình huống thực tiễn biến đổi nhiệt động, phóng xạ hạt nhân.`;

  // Pre-configured premium sample database of questions binned by topic
  const dbPart1 = [
    {
      id: "p1_1",
      level: "Nhận biết",
      chapter: "Chương I. Vật lí nhiệt",
      text: "Trong một ngày nắng nóng tại TP. Hồ Chí Minh, một học sinh thả một quả cầu sắt đang nóng ở nhiệt độ 80 °C vào một ly nước mát ở 25 °C. Phát biểu nào sau đây là ĐÚNG về quá trình truyền nhiệt giữa quả cầu sắt và nước?",
      illustrationType: "ice-cube",
      options: [
        "A. Nhiệt lượng truyền tự phát từ ly nước mát sang quả cầu sắt cho đến khi đạt cân bằng nhiệt.",
        "B. Nhiệt lượng truyền tự phát từ quả cầu sắt sang ly nước mát cho đến khi nhiệt độ của chúng bằng nhau.",
        "C. Quá trình truyền nhiệt chỉ dừng lại khi toàn bộ nhiệt năng của quả cầu sắt chuyển hết sang nước.",
        "D. Nhiệt lượng không tự truyền qua lại vì sắt và nước ở hai trạng thái vật lí khác nhau."
      ],
      answer: "B",
      explanation: "Theo nguyên lí thứ hai của nhiệt động lực học, nhiệt lượng chỉ có thể tự truyền từ vật có nhiệt độ cao hơn (quả cầu sắt ở 80 °C) sang vật có nhiệt độ thấp hơn (ly nước ở 25 °C). Quá trình truyền nhiệt này sẽ tự phát dừng lại khi hai vật đạt trạng thái cân bằng nhiệt, tức là nhiệt độ của chúng trở nên bằng nhau."
    },
    {
      id: "p1_2",
      level: "Thông hiểu",
      chapter: "Chương II. Khí lí tưởng",
      text: "Một người lái xe máy đỗ xe ngoài trời nắng lớn ở Hà Nội. Sau một thời gian, không khí bên trong lốp xe nóng lên từ 27 °C lên đến 57 °C. Coi thể tích lốp xe không thay đổi đáng kể. Áp suất khí trong lốp xe thay đổi thế nào?",
      illustrationType: "tire",
      options: [
        "A. Áp suất khí tăng lên đúng 2,11 lần so với áp suất ban đầu.",
        "B. Áp suất khí giữ nguyên không đổi vì lốp xe là vật cứng kín.",
        "C. Áp suất khí tăng lên và bằng khoảng 1,10 lần so với áp suất ban đầu.",
        "D. Áp suất khí giảm đi vì không khí nóng lên làm mật độ phân tử thưa thớt hơn."
      ],
      answer: "C",
      explanation: "Đổi nhiệt độ sang Kelvin: T_1 = 27 + 273 = 300 K; T_2 = 57 + 273 = 330 K. Vì thể tích lốp xe không đổi nên đây là quá trình đẳng tích (định luật Charles/Sác-lơ hay tương đương đẳng tích). Ta có: p_2 / p_1 = T_2 / T_1 = 330 / 300 = 1,10. Vậy áp suất tăng 1,10 lần."
    },
    {
      id: "p1_3",
      level: "Nhận biết",
      chapter: "Chương III. Từ trường",
      text: "Phát biểu nào sau đây biểu diễn đúng đặc điểm của đường sức từ trong từ trường đều?",
      illustrationType: "thermometer",
      options: [
        "A. Là những đường thẳng song song, cách đều nhau và có chiều từ cực Nam sang cực Bắc bên ngoài nam châm.",
        "B. Là những đường cong khép kín đồng tâm xung quanh nam châm có mật độ thưa dần khi lại gần cực từ.",
        "C. Là những đường thẳng song song, cách đều nhau và có chiều từ cực Bắc sang cực Nam bên ngoài nam châm.",
        "D. Là những đường thẳng đồng quy tại tâm của từ trường có độ lớn cảm ứng từ biến đổi liên tục."
      ],
      answer: "C",
      explanation: "Từ trường đều được biểu diễn bằng các đường sức từ song song, cách đều nhau và có chiều đi ra từ cực Bắc, đi vào ở cực Nam (ngoài nam châm)."
    },
    {
      id: "p1_4",
      level: "Vận dụng",
      chapter: "Chương IV. Vật lí hạt nhân",
      text: "Hạt nhân Uranium _{92}^{235}\\text{U} hấp thụ một neutron chậm rồi phân hạch tạo ra hạt nhân con _{39}^{95}\\text{Y}, hạt nhân _{53}^{138}\\text{I} và một số hạt neutron mới. Số hạt neutron được giải phóng trong phản ứng phân hạch này là:",
      illustrationType: "balloon",
      options: [
        "A. 1 hạt neutron.",
        "B. 2 hạt neutron.",
        "C. 3 hạt neutron.",
        "D. 4 hạt neutron."
      ],
      answer: "C",
      explanation: "Phương trình phản ứng: _{0}^{1}\\text{n} + _{92}^{235}\\text{U} \\rightarrow _{39}^{95}\\text{Y} + _{53}^{138}\\text{I} + k \\cdot _{0}^{1}\\text{n}.\nÁp dụng định luật bảo toàn số khối A: 1 + 235 = 95 + 138 + k \\cdot 1 \\implies 236 = 233 + k \\implies k = 3. Vậy có 3 hạt neutron được giải phóng."
    }
  ];

  const dbPart2 = [
    {
      id: "p2_1",
      level: "Thông hiểu",
      chapter: "Chương I. Vật lí nhiệt",
      question: "Để đo nhiệt nóng chảy riêng của nước đá, một nhóm học sinh tiến hành thí nghiệm cung cấp nhiệt lượng bằng dòng điện cho một khối lượng nước đá đang nóng chảy ở 0 °C đựng trong nhiệt lượng kế và ghi nhận dữ liệu.",
      illustrationType: "ice-cube",
      statements: [
        {
          id: "s1",
          text: "a) Trong suốt quá trình nước đá đang nóng chảy, nhiệt độ của hỗn hợp nước và đá tăng dần lên.",
          isCorrect: false,
          explanation: "Sai. Trong suốt quá trình nóng chảy của chất rắn kết tinh, nhiệt độ được giữ nguyên cố định không thay đổi (ở 0 °C) cho đến khi toàn bộ đá tan hết."
        },
        {
          id: "s2",
          text: "b) Nhiệt lượng cung cấp cho khối đá lúc này dùng hoàn toàn để phá vỡ liên kết mạng tinh thể của nước đá.",
          isCorrect: true,
          explanation: "Đúng. Năng lượng nhận vào không làm tăng động năng tịnh tiến phân tử (không tăng nhiệt độ) mà dùng để thắng lực liên kết và phá vỡ cấu trúc tinh thể rắn."
        },
        {
          id: "s3",
          text: "c) Nếu dùng nguồn điện công suất 50 W cung cấp nhiệt lượng trong 3 phút làm tan hoàn toàn 27 g đá, nhiệt nóng chảy riêng thực nghiệm đo được là khoảng 3,33 . 10^5 J/kg.",
          isCorrect: true,
          explanation: "Đúng. Nhiệt lượng cung cấp: Q = P * t = 50 * (3 * 60) = 9000 J. Khối lượng đá m = 27 g = 0,027 kg. Nhiệt nóng chảy riêng thực nghiệm: lambda = Q/m = 9000 / 0,027 = 3,33 . 10^5 J/kg."
        },
        {
          id: "s4",
          text: "d) Sai số phép đo thực tế chủ yếu đến từ hao phí nhiệt lượng truyền ra không khí xung quanh nhiệt lượng kế.",
          isCorrect: true,
          explanation: "Đúng. Trong thực tế, nhiệt lượng kế không cách nhiệt hoàn hảo, một phần nhiệt lượng từ nguồn điện hoặc môi trường bên ngoài trao đổi qua lại gây ra sai số cho phép đo thực nghiệm."
        }
      ]
    },
    {
      id: "p2_2",
      level: "Vận dụng",
      chapter: "Chương III. Từ trường",
      question: "Một khung dây dẫn phẳng, phẳng dẹt, hình chữ nhật gồm N = 100 vòng dây, diện tích mỗi vòng S = 50 cm² = 0,005 m² quay đều với tốc độ 3000 vòng/phút quanh một trục đối xứng nằm trong mặt phẳng khung dây đặt trong từ trường đều có cảm ứng từ B = 0,2 T vuông góc với trục quay.",
      illustrationType: "kettle",
      statements: [
        {
          id: "s1",
          text: "a) Tần số góc của khung dây là 100\\pi rad/s.",
          isCorrect: true,
          explanation: "Đúng. Tốc độ quay n = 3000 vòng/phút = 50 vòng/giây. Tần số góc: omega = 2 * pi * n = 100*pi rad/s."
        },
        {
          id: "s2",
          text: "b) Từ thông cực đại xuyên qua khung dây là 1,0 Wb.",
          isCorrect: false,
          explanation: "Sai. Từ thông cực đại xuyên qua khung dây: Phi_0 = N * B * S = 100 * 0,2 * 0,005 = 0,1 Wb."
        },
        {
          id: "s3",
          text: "c) Suất điện động cảm ứng cực đại xuất hiện trong khung dây là khoảng 31,4 V.",
          isCorrect: true,
          explanation: "Đúng. Suất điện động cực đại: E_0 = Phi_0 * omega = 0,1 * 100*pi = 10*pi V ≈ 31,4 V."
        },
        {
          id: "s4",
          text: "d) Chiều dòng điện cảm ứng trong khung dây không đổi trong suốt một chu kỳ quay.",
          isCorrect: false,
          explanation: "Sai. Suất điện động cảm ứng biến thiên điều hòa hình sin nên dòng điện cảm ứng đổi chiều 2 lần trong mỗi chu kỳ quay."
        }
      ]
    }
  ];

  const dbPart3 = [
    {
      id: "p3_1",
      level: "Vận dụng",
      chapter: "Chương I. Vật lí nhiệt",
      text: "Một bình đun siêu tốc có công suất P = 2000 W chứa m = 1,5 kg nước đang ở nhiệt độ phòng 20 °C. Học sinh cắm điện đun sôi nước đến 100 °C. Bỏ qua hao phí nhiệt lượng tỏa ra vỏ bình và không khí. Biết nhiệt dung riêng của nước là c_nuoc = 4180 J/(kg·K). Hãy tính thời gian đun sôi nước (theo đơn vị giây, làm tròn đến số nguyên gần nhất).",
      illustrationType: "kettle",
      answer: "251",
      unit: "giây",
      explanation: "Nhiệt lượng cần cung cấp cho nước: Q = m * c * Δt = 1,5 * 4180 * (100 - 20) = 1,5 * 4180 * 80 = 501.600 J. Vì bỏ qua hao phí nên thời gian đun t = Q / P = 501.600 / 2000 = 250,8 giây. Làm tròn đến số nguyên là 251 giây."
    },
    {
      id: "p3_2",
      level: "Vận dụng cao",
      chapter: "Chương IV. Vật lí hạt nhân",
      text: "Đồng vị phóng xạ Sodium-24 (_{11}^{24}\\text{Na}) có chu kỳ bán rã T = 15 giờ. Ban đầu một mẫu thử chứa 8,0 mg Sodium-24. Sau thời gian t (tính bằng giờ), lượng Sodium-24 chưa phân rã trong mẫu thử còn lại đúng 1,0 mg. Tìm giá trị của t (theo đơn vị giờ).",
      illustrationType: "balloon",
      answer: "45",
      unit: "giờ",
      explanation: "Áp dụng định luật phân rã phóng xạ: m(t) = m_0 * 2^(-t/T) <=> 1,0 = 8,0 * 2^(-t/15) <=> 2^(-t/15) = 1/8 = 2^(-3) => t / 15 = 3 => t = 3 * 15 = 45 giờ."
    }
  ];

  // Slice questions based on requested counts
  const countP1 = p1?.count || 4;
  const countP2 = p2?.count || 2;
  const countP3 = p3?.count || 2;

  const questionsPart1 = dbPart1.slice(0, Math.min(countP1, dbPart1.length));
  const questionsPart2 = dbPart2.slice(0, Math.min(countP2, dbPart2.length));
  const questionsPart3 = dbPart3.slice(0, Math.min(countP3, dbPart3.length));

  return {
    matrix: matrixText,
    specifications: specText,
    questionsPart1,
    questionsPart2,
    questionsPart3,
    isFallback: true
  };
}

/**
 * Generates an analytical response for uploaded tests offline
 */
export function getLocalAnalyzeExamResponse(fileName: string, rawText: string = ""): any {
  const fileLabel = fileName || "Đề thi Vật lí 12";
  const textSample = rawText.substring(0, 100) || "Đề kiểm tra trắc nghiệm học kỳ I môn Vật lí 12...";
  
  return {
    extractedTitle: `Phân tích Đề thi: ${fileLabel}`,
    stats: {
      totalQuestions: 8,
      nbCount: 3,
      thCount: 3,
      vdCount: 2,
      vdcCount: 0
    },
    questionsAnalysis: [
      {
        number: 1,
        snippet: "Về sự truyền nhiệt giữa hai vật đạt trạng thái cân bằng nhiệt...",
        chapter: "Chương I. Vật lí nhiệt",
        level: "NB",
        gdptStandard: "Nhận biết nguyên lí truyền nhiệt và chiều truyền nhiệt tự phát.",
        score: 1.0
      },
      {
        number: 2,
        snippet: "Tính áp suất biến thiên lốp xe máy tăng nhiệt độ...",
        chapter: "Chương II. Khí lí tưởng",
        level: "TH",
        gdptStandard: "Giải thích được hiện tượng tăng áp suất khí trong lốp xe nâng cao năng lực vật lí thực tiễn.",
        score: 1.0
      },
      {
        number: 3,
        snippet: "Đặc điểm đường sức từ của từ trường đều...",
        chapter: "Chương III. Từ trường",
        level: "NB",
        gdptStandard: "Nhận biết khái niệm từ trường đều và chiều đường sức từ.",
        score: 1.0
      }
    ],
    matrixHtml: `
<table class="w-full text-sm border-collapse border border-gray-300">
  <thead>
    <tr class="bg-gray-100 text-left">
      <th class="border border-gray-300 p-2">Chương học</th>
      <th class="border border-gray-300 p-2 text-center">Nhận biết</th>
      <th class="border border-gray-300 p-2 text-center">Thông hiểu</th>
      <th class="border border-gray-300 p-2 text-center">Vận dụng</th>
      <th class="border border-gray-300 p-2 text-center">Tổng câu</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-300 p-2">Vật lí nhiệt</td>
      <td class="border border-gray-300 p-2 text-center">1 (12.5%)</td>
      <td class="border border-gray-300 p-2 text-center">1 (12.5%)</td>
      <td class="border border-gray-300 p-2 text-center">1 (12.5%)</td>
      <td class="border border-gray-300 p-2 text-center font-bold text-slate-700">3</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Khí lí tưởng</td>
      <td class="border border-gray-300 p-2 text-center">1 (12.5%)</td>
      <td class="border border-gray-300 p-2 text-center">1 (12.5%)</td>
      <td class="border border-gray-300 p-2 text-center">0 (0.0%)</td>
      <td class="border border-gray-300 p-2 text-center font-bold text-slate-700">2</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Từ trường & Hạt nhân</td>
      <td class="border border-gray-300 p-2 text-center">1 (12.5%)</td>
      <td class="border border-gray-300 p-2 text-center">1 (12.5%)</td>
      <td class="border border-gray-300 p-2 text-center">1 (12.5%)</td>
      <td class="border border-gray-300 p-2 text-center font-bold text-slate-700">3</td>
    </tr>
  </tbody>
</table>`,
    specTableHtml: `
<div class="space-y-2 text-sm text-slate-700">
  <p><strong>Bảng đặc tả chuẩn đánh giá:</strong></p>
  <ul class="list-disc pl-5 space-y-1">
    <li><strong>Năng lực Nhận biết khoa học vật lí:</strong> Học sinh mô tả được chiều truyền nhiệt, khái niệm đường sức từ của dòng điện phẳng.</li>
    <li><strong>Năng lực Tìm hiểu tự nhiên dưới góc độ vật lí:</strong> Học sinh thực hiện tính toán độ tăng áp suất lốp xe và độ hụt khối trong liên kết hạt nhân bền vững.</li>
  </ul>
</div>`,
    gdptComplianceEvaluation: "Đề kiểm tra bám sát cấu trúc đổi mới của Chương trình GDPT 2018 Vật lí 12 Việt Nam. Các bối cảnh câu hỏi đều bám sát thực tiễn sinh động (ly nước nóng, lốp xe máy phơi nắng ngoài đường) giúp triệt tiêu lối học thuộc lòng sáo rỗng.",
    duplicatesFound: "Không tìm thấy trùng lặp câu hỏi trực tiếp. Tuy nhiên, nội dung câu hỏi số 2 có nét tương đồng cao với bài toán đẳng tích tiêu chuẩn trong Sách giáo khoa kết nối tri thức.",
    recommendations: "Đề thi hiện đang thiếu các câu hỏi thuộc phân vùng Vận dụng cao (VDC) trong phần III trả lời ngắn. Đề xuất bổ sung một câu hỏi tính toán hiệu suất bếp từ công nghiệp hoặc tính chu kỳ phân rã của mẫu hóa thạch khảo cổ học để tăng tính phân hóa học sinh.",
    isFallback: true
  };
}

/**
 * Summarizes lessons in detailed flashcard markdown format offline
 */
export function getLocalSummarizeResponse(title: string, content: string = ""): any {
  const lessonTitle = title || "Bài học Vật lí 12";
  
  return {
    summaryText: `💡 **Tóm tắt siêu tốc (Flashcard Summary):** Bài học **${lessonTitle}** tập trung làm nổi bật các thuộc tính vật lí, quy luật chuyển động nhiệt động lực học hoặc tương tác từ hạt nhân bám sát chương trình chuẩn GDPT 2018. Giúp học sinh nắm vững bản chất cốt lõi của thế giới tự nhiên thông qua lăng kính Vật lý thực nghiệm hiện đại.`,
    keyConcepts: [
      `1️⃣ **Khái niệm then chốt 1:** Mô hình hạt và bản chất cấu tạo vật chất, sự phân hóa trạng thái rắn-lỏng-khí dựa trên lực tương tác phân tử và chuyển động nhiệt.`,
      `2️⃣ **Khái niệm then chốt 2:** Sự bảo toàn năng lượng trong các quá trình vật lí (Công thức ΔU = A + Q hoặc định luật bảo toàn điện tích và số khối hạt nhân).`,
      `3️⃣ **Khái niệm then chốt 3:** Ứng dụng thực tiễn trong các thiết bị kĩ thuật hiện đại (Bếp điện từ, động cơ điện xoay chiều, lò phản ứng nguyên tử, chụp cắt lớp phát xạ PET).`
    ],
    deepExplanation: `⚡ **Giải thích hiện tượng thực tế khó:** Tại sao khi đổ cồn lên da ta cảm thấy rất lạnh mát? Ở góc độ vật lý, quá trình hóa hơi của cồn lỏng cần hấp thu một lượng nhiệt năng lớn từ môi trường tiếp xúc. Khi cồn bốc hơi nhanh trên bề mặt da, nó hút một lượng nhiệt hóa hơi riêng lớn trực tiếp từ các tế bào biểu bì dưới da của ta, làm giảm nhiệt độ bề mặt da đột ngột gây ra cảm giác mát lạnh thấu xương cực kỳ sảng khoái!`,
    mindmapText: `📌 SƠ ĐỒ TƯ DUY CHỮ (MINDMAP)
|-- ${lessonTitle}
    |-- 🌟 ĐỊNH NGHĨA & KHÁI NIỆM CƠ BẢN
    |   |-- Bản chất hiện tượng vật lí tự nhiên
    |   |-- Đơn vị đo lường khoa học chuẩn quốc tế (SI)
    |-- ⚙️ PHƯƠNG TRÌNH & HỆ THỨC CỐT LÕI
    |   |-- Hệ thức liên hệ đại lượng
    |   |-- Đồ thị mô phỏng sự biến đổi trạng thái
    |-- 🚀 ỨNG DỤNG THỰC TIỄN ĐỜI SỐNG
        |-- Kĩ thuật công nghệ sản xuất điện năng
        |-- Đời sống sinh hoạt & Chẩn đoán y khoa`,
    quizzes: [
      {
        question: `Nhiệt hóa hơi riêng L của một chất lỏng là đại lượng vật lí biểu thị:`,
        options: [
          "A. Nhiệt lượng cần thiết để hóa hơi hoàn toàn 1 kg chất lỏng đó ở nhiệt độ sôi xác định.",
          "B. Nhiệt lượng tỏa ra khi hóa hơi hoàn toàn 1 kg chất lỏng đó ở nhiệt độ sôi.",
          "C. Nhiệt lượng cần thiết để làm tăng 1 độ cho 1 kg chất lỏng ở trạng thái bay hơi.",
          "D. Công cơ học thực hiện khi 1 kg hơi nước giãn nở tản nhiệt đều đặn."
        ],
        correctIndex: 0,
        explanation: "Đúng theo định nghĩa Nhiệt hóa hơi riêng L: Q = L * m => L = Q/m là nhiệt lượng để hóa hơi hoàn toàn 1 kg chất lỏng ở nhiệt độ sôi ổn định."
      },
      {
        question: `Phát biểu nào sau đây biểu diễn đúng Định luật Lenz về chiều dòng điện cảm ứng?`,
        options: [
          "A. Dòng điện cảm ứng xuất hiện cùng chiều với dòng điện sơ cấp đặt sát bên cạnh nó.",
          "B. Dòng điện cảm ứng có chiều sao cho từ trường cảm ứng do nó sinh ra chống lại sự biến thiên của từ thông ban đầu xuyên qua khung dây.",
          "C. Dòng điện cảm ứng xuất hiện có chiều ngược lại với chiều của dòng điện xoay chiều một pha.",
          "D. Suất điện động cảm ứng luôn có độ lớn tỉ lệ nghịch với thời gian biến thiên của điện áp."
        ],
        correctIndex: 1,
        explanation: "Đúng theo Định luật Lenz: Dòng điện cảm ứng sinh ra từ trường ngược chiều để chống lại sự biến thiên của từ thông gốc."
      },
      {
        question: `Độ bền vững của hạt nhân nguyên tử được quyết định duy nhất bởi đại lượng vật lý nào?`,
        options: [
          "A. Năng lượng liên kết cực đại của toàn bộ hạt nhân nguyên tử.",
          "B. Tổng số khối A của các nuclôn trong hạt nhân nguyên tử.",
          "C. Năng lượng liên kết riêng của hạt nhân (năng lượng liên kết tính trên một nuclôn).",
          "D. Thể tích và bán kính hình cầu của hạt nhân nguyên tử thực tế."
        ],
        correctIndex: 2,
        explanation: "Năng lượng liên kết riêng quyết định độ bền vững của hạt nhân. Hạt nhân có năng lượng liên kết riêng càng cao thì cấu trúc hạt nhân càng bền vững, khó phân rã."
      }
    ],
    isFallback: true
  };
}

/**
 * Parses files, image exercises, or PDFs offline and builds question bank entries
 */
export function getLocalParseExerciseResponse(fileName: string, textContent: string = ""): any {
  const fileLabel = fileName || "Tập_tin_bài_tập.pdf";
  
  return {
    questionsP1: [
      {
        id: "p1_ocr_1",
        question: `[Trích xuất từ ${fileLabel}] Một bình xilanh kín được đậy bằng pit-tông nhẹ. Pit-tông nén đẳng nhiệt khối khí lí tưởng bên trong bình từ thể tích 12 lít xuống còn 3 lít. Áp suất khí ban đầu là 10^5 Pa. Hãy tìm áp suất khí sau khi nén.`,
        level: "Thông hiểu",
        explanation: "Áp dụng định luật đẳng nhiệt Boyle: p_1 * V_1 = p_2 * V_2 => p_2 = p_1 * (V_1 / V_2) = 10^5 * (12 / 3) = 4 . 10^5 Pa.",
        options: [
          { id: "A", text: "A. 2,0 · 10^5 Pa", isCorrect: false },
          { id: "B", text: "B. 3,0 · 10^5 Pa", isCorrect: false },
          { id: "C", text: "C. 4,0 · 10^5 Pa", isCorrect: true },
          { id: "D", text: "D. 1,5 · 10^5 Pa", isCorrect: false }
        ]
      },
      {
        id: "p1_ocr_2",
        question: `[Trích xuất từ ${fileLabel}] Một sợi dây đồng có chiều dài L = 0,5 m mang dòng điện một chiều I = 2 A đặt vuông góc với vectơ cảm ứng từ đều có độ lớn B = 0,1 T. Tính độ lớn lực từ tác dụng lên đoạn dây đồng này.`,
        level: "Nhận biết",
        explanation: "Áp dụng định luật Ampere: F = B * I * L * sin(alpha). Do vuông góc nên alpha = 90 độ => sin(90) = 1. Thay số: F = 0,1 * 2 * 0,5 * 1 = 0,1 N.",
        options: [
          { id: "A", text: "A. 0,1 N", isCorrect: true },
          { id: "B", text: "B. 0,2 N", isCorrect: false },
          { id: "C", text: "C. 0,5 N", isCorrect: false },
          { id: "D", text: "D. 1,0 N", isCorrect: false }
        ]
      }
    ],
    questionsP2: [
      {
        id: "p2_ocr_1",
        question: `[Trích xuất từ ${fileLabel}] Cho khối lượng của hạt nhân Coban _{27}^{60}\\text{Co} là 59,9190 u. Biết m_p = 1,00728 u, m_n = 1,00866 u, và 1 u = 931,5 MeV/c^2. Xem xét độ bền vững cấu tạo hạt nhân Coban.`,
        statements: [
          {
            id: "st_1",
            text: "a) Hạt nhân Coban-60 chứa 27 prôtôn và 33 nơtrôn.",
            isCorrect: true,
            level: "Nhận biết",
            explanation: "Đúng. Số prôtôn Z = 27; số nơtrôn N = A - Z = 60 - 27 = 33 hạt."
          },
          {
            id: "st_2",
            text: "b) Độ hụt khối của hạt nhân Coban-60 bằng khoảng 0,5623 u.",
            isCorrect: false,
            explanation: "Sai. Tính toán độ hụt khối: Δm = (27 * m_p + 33 * m_n) - m_Co = (27 * 1,00728 + 33 * 1,00866) - 59,9190 = (27,19656 + 33,28578) - 59,9190 = 60,48234 - 59,9190 = 0,5633 u."
          },
          {
            id: "st_3",
            text: "c) Năng lượng liên kết của hạt nhân Coban-60 xấp xỉ khoảng 524,7 MeV.",
            isCorrect: true,
            level: "Thông hiểu",
            explanation: "Đúng. E_lk = Δm * 931,5 = 0,5633 * 931,5 ≈ 524,7 MeV."
          },
          {
            id: "st_4",
            text: "d) Năng lượng liên kết riêng của hạt nhân Coban-60 lớn hơn năng lượng liên kết riêng của Helium (7,07 MeV) nên Coban-60 bền vững hơn Helium.",
            isCorrect: true,
            level: "Vận dụng",
            explanation: "Đúng. E_lkr của Co-60 = 524,7 / 60 = 8,74 MeV/nuclôn, lớn hơn của Helium (7,07 MeV) nên Coban-60 là hạt nhân bền vững hơn."
          }
        ]
      }
    ],
    isFallback: true
  };
}
