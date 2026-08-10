import { useState, FormEvent } from "react";
import { Wrench, Play, BookOpen, AlertCircle, CheckCircle2, ChevronRight, Star } from "lucide-react";

export function STEMZone({ onEarnXP }: { onEarnXP: (xp: number) => void }) {
  const [selectedProject, setSelectedProject] = useState<number>(0);
  const [submissionText, setSubmissionText] = useState("");
  const [attachedFile, setAttachedFile] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<any>(null);

  const stemProjects = [
    {
      id: 1,
      title: "Chế tạo mô hình Bếp năng lượng mặt trời hội tụ",
      description: "Ứng dụng các kiến thức Vật lí nhiệt về sự hấp thụ, bức xạ nhiệt và định luật quang học parabol để làm lò đun đun sôi nước bằng mặt trời.",
      rubrics: [
        "Khả năng hấp thụ và truyền nhiệt (Max 40đ): Bếp đun sôi được 200ml nước trong vòng 30 phút nắng to.",
        "Thiết kế cấu trúc parabol vật liệu tái chế (Max 35đ): Khung vững vàng, độ bóng tụ sáng tốt.",
        "Báo cáo và giải trình thuyết minh khoa học (Max 25đ): Giải thích được cơ chế trao đổi nhiệt của hệ thống."
      ],
      steps: [
        "Chuẩn bị các vật liệu: bìa carton cứng, giấy bạc phản xạ, kéo, băng dính, nhiệt kế đo nhiệt nước.",
        "Vẽ và cắt các tấm bìa carton theo biên dạng parabol định sẵn rồi ghép thành chảo hội tụ.",
        "Dán giấy bạc phẳng phiu lên lòng chảo để tăng hiệu suất phản xạ ánh sáng.",
        "Đặt cốc nước sơn đen (hấp thụ nhiệt tốt) tại tiêu điểm hội tụ và theo dõi nhiệt độ sau mỗi 5 phút."
      ]
    },
    {
      id: 2,
      title: "Chế tạo tĩnh điện kế đơn giản (Electroscope)",
      description: "Học sinh ứng dụng hiện tượng nhiễm điện hưởng ứng, lực tương tác điện tích Coulomb để chế tạo và đo định tính điện tích.",
      rubrics: [
        "Độ nhạy của điện nghiệm (Max 40đ): Lá nhôm xòe ra rõ ràng khi đưa thanh nhựa cọ xát lại gần.",
        "Thiết kế kín hơi và thẩm mỹ chống gió nhiễu (Max 35đ): Sử dụng hũ thủy tinh có nắp cách điện tốt.",
        "Bài báo cáo thực nghiệm (Max 25đ): Vẽ sơ đồ nhiễm điện hưởng ứng và phân tích điện trường."
      ],
      steps: [
        "Chuẩn bị hũ thủy tinh sạch, thanh dây đồng, lá nhôm mỏng cắt nhỏ, nút bần cao su hoặc đất nặn.",
        "Uốn dây đồng một đầu thành đĩa tròn dẹt, đầu kia uốn cong thành móc treo.",
        "Treo hai lá nhôm cực mỏng vào móc đồng và cố định xuyên qua nắp hũ sao cho dây đồng không chạm thành hũ.",
        "Cọ xát thước nhựa vào tóc rồi đưa lại gần đĩa đồng để kiểm tra sự dịch chuyển của lá nhôm."
      ]
    }
  ];

  const handleSimulateSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!submissionText.trim()) {
      alert("Hãy nhập thuyết minh dự án.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionFeedback({
        score: Math.floor(Math.random() * 15) + 85, // 85 - 100
        comments: "Bài làm rất xuất sắc! Sơ đồ thiết kế rõ ràng, tính toán tiêu cự hội tụ chính xác. Đề xuất cải tiến dán bọc kín nhiệt tốt hơn.",
        evaluator: "Giáo sư Vật lí AI (Phản hồi tự động)"
      });
      onEarnXP(50); // Earn 50 XP for completing project
    }, 1200);
  };

  const project = stemProjects[selectedProject];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Project Selector & Instructions */}
      <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 flex flex-col gap-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Wrench className="text-cyan-400 h-5 w-5" />
            STEM & Dự án học liệu số môn Lý 12
          </h2>
          <p className="text-xs text-slate-400 mt-1">Học tập qua dự án chế tạo thực tế, tích hợp thuyết minh khoa học</p>
        </div>

        {/* Project Selector Chips */}
        <div className="flex gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800/80">
          {stemProjects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProject(idx);
                setSubmissionFeedback(null);
                setSubmissionText("");
                setAttachedFile("");
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedProject === idx ? "bg-cyan-500/10 border border-cyan-500/25 text-cyan-400" : "text-slate-400"
              }`}
            >
              Dự án {p.id}
            </button>
          ))}
        </div>

        {/* Selected Project Specs */}
        <div className="space-y-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <h3 className="text-sm font-bold text-slate-100">{project.title}</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{project.description}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Play className="h-3 w-3 text-cyan-400" />
              Các bước tiến hành chế tạo
            </h4>
            <div className="space-y-2">
              {project.steps.map((step, idx) => (
                <div key={idx} className="flex gap-3 text-xs text-slate-300">
                  <span className="flex-none font-bold text-cyan-400 bg-cyan-500/10 rounded-full h-5 w-5 flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed mt-0.5">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-amber-400" />
              Tiêu chí đánh giá (Rubric)
            </h4>
            <div className="space-y-1.5 bg-slate-950/40 p-3 rounded-xl border border-slate-850">
              {project.rubrics.map((rubric, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
                  <Star className="h-3 w-3 text-amber-500 mt-1 fill-amber-500/20" />
                  <span>{rubric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Work Submission */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6">
          <h3 className="text-sm font-bold text-white mb-1.5">Nộp sản phẩm & Báo cáo thuyết minh</h3>
          <p className="text-xs text-slate-400 mb-4">Gửi báo cáo số liệu, hình ảnh thực nghiệm của bạn để nhận điểm nhận xét tự động từ AI.</p>

          <form onSubmit={handleSimulateSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Thuyết minh báo cáo khoa học</label>
              <textarea
                rows={5}
                required
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="Nhập phần tóm tắt lý thuyết, bảng số liệu đo đạc, công thức tính hiệu suất và nhận xét kết luận..."
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 outline-none focus:border-cyan-500 transition-colors placeholder-slate-650"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Đính kèm ảnh minh chứng (.png, .jpg)</label>
              <div className="border border-dashed border-slate-800 rounded-xl p-3 text-center bg-slate-950/30 flex flex-col items-center gap-1">
                <input
                  type="file"
                  id="stem-file"
                  accept="image/*"
                  onChange={(e) => setAttachedFile(e.target.files?.[0]?.name || "")}
                  className="hidden"
                />
                <label htmlFor="stem-file" className="text-xs text-cyan-400 cursor-pointer font-semibold hover:underline">
                  {attachedFile ? attachedFile : "Chọn tệp tin đính kèm"}
                </label>
                <span className="text-[10px] text-slate-500">{attachedFile ? "Đã đính kèm" : "Hỗ trợ định dạng ảnh báo cáo thực nghiệm tối đa 5MB"}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-bold rounded-xl transition-all shadow-md shadow-cyan-500/10 text-xs cursor-pointer disabled:opacity-40"
            >
              {isSubmitting ? "Đang gửi báo cáo..." : "Nộp báo cáo dự án"}
            </button>
          </form>
        </div>

        {/* Real-time AI evaluation feedback */}
        {submissionFeedback && (
          <div className="bg-slate-900/60 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 shadow-xl animate-fade-in">
            <div className="flex items-center gap-2 text-emerald-400 border-b border-slate-800 pb-3 mb-3">
              <CheckCircle2 className="h-5 w-5" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Bảng điểm và Đánh giá tự động từ AI</h3>
            </div>
            
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-850 mb-3">
              <span className="text-xs text-slate-400 font-medium">Điểm số ước lượng:</span>
              <span className="text-xl font-mono font-bold text-emerald-400">{submissionFeedback.score} / 100</span>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-850">
              <span className="text-[10px] font-bold text-slate-500 block uppercase">Nhận xét chi tiết:</span>
              <p className="mt-1">{submissionFeedback.comments}</p>
            </div>
            <div className="text-[10px] text-slate-500 mt-2 text-right">Đánh giá bởi: {submissionFeedback.evaluator}</div>
          </div>
        )}
      </div>
    </div>
  );
}
