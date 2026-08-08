import { StudentResult, Chapter, Lesson } from "../types";

export interface LessonAnalysis {
  lesson: Lesson;
  chapterTitle: string;
  score?: number;
  status: "mastered" | "needs_practice" | "uncompleted";
  recommendationReason: string;
}

export interface ProgressAnalysis {
  totalLessons: number;
  completedCount: number;
  masteredCount: number;
  needsPracticeCount: number;
  uncompletedCount: number;
  masteryRate: number; // percentage of completed lessons that are mastered
  weaknesses: string[]; // key topics that need practice
  recommendations: LessonAnalysis[];
}

/**
 * Analyzes a student's progress and returns personalized lesson recommendations.
 * Uses both actual saved quiz scores in localStorage and a deterministic heuristic matching the student's profile.
 */
export function analyzeStudentProgress(
  student: StudentResult | undefined,
  chapters: Chapter[]
): ProgressAnalysis {
  const allLessons: { lesson: Lesson; chapterTitle: string }[] = [];
  chapters.forEach((ch) => {
    ch.lessons.forEach((l) => {
      allLessons.push({ lesson: l, chapterTitle: ch.title });
    });
  });

  const totalLessons = allLessons.length;
  
  if (!student) {
    return {
      totalLessons,
      completedCount: 0,
      masteredCount: 0,
      needsPracticeCount: 0,
      uncompletedCount: totalLessons,
      masteryRate: 0,
      weaknesses: ["Chưa có dữ liệu học tập"],
      recommendations: allLessons.slice(0, 3).map((item, idx) => ({
        lesson: item.lesson,
        chapterTitle: item.chapterTitle,
        status: "uncompleted",
        recommendationReason: idx === 0 
          ? "Bài học nhập môn tiếp theo để bắt đầu lộ trình."
          : "Nâng cao năng lực giải bài tập Vật lí."
      }))
    };
  }

  // Read saved scores from localStorage
  let savedScores: Record<string, number> = {};
  try {
    const key = `student_scores_${student.name}_${student.className}`;
    const scoresStr = localStorage.getItem(key);
    if (scoresStr) {
      savedScores = JSON.parse(scoresStr);
    }
  } catch (e) {
    console.error("Error reading saved scores from localStorage:", e);
  }

  // Heuristic-based initialization if localStorage is empty
  // We want to reconstruct a highly realistic history for mock students!
  const progressRatio = student.progress / 100;
  const estimatedCompletedCount = Math.round(totalLessons * progressRatio);

  const analyzedLessons: LessonAnalysis[] = allLessons.map((item, idx) => {
    const lessonId = item.lesson.id;
    let score = savedScores[lessonId];
    let status: "mastered" | "needs_practice" | "uncompleted";
    let recommendationReason = "";

    // If score exists in localStorage, use it
    if (score !== undefined) {
      if (score >= 8.0) {
        status = "mastered";
      } else {
        status = "needs_practice";
        recommendationReason = `Bạn đạt ${score.toFixed(1)}/10 ở bài này. Cần luyện tập thêm để làm chủ kiến thức.`;
      }
    } else {
      // Heuristic fallback
      const isCompletedHeuristic = idx < estimatedCompletedCount;
      if (isCompletedHeuristic) {
        // Distribute scores based on overall student GPA
        // Higher GPA means more mastered lessons. Lower GPA means more needs_practice.
        // We can add some deterministic variance based on lesson index to make it feel extremely natural and real!
        const variance = ((idx * 7) % 5 - 2) * 0.4; // fluctuation between -0.8 and +0.8
        const estimatedScore = Math.min(10.0, Math.max(3.0, parseFloat((student.score + variance).toFixed(1))));
        score = estimatedScore;

        if (estimatedScore >= 8.0) {
          status = "mastered";
        } else {
          status = "needs_practice";
          recommendationReason = `Điểm đánh giá ước lượng đạt ${estimatedScore.toFixed(1)}/10. AI phát hiện bạn cần củng cố phần bài tập tự luyện này.`;
        }
      } else {
        status = "uncompleted";
        recommendationReason = "Bài học tiếp theo trong chương trình cần hoàn thành.";
      }
    }

    return {
      lesson: item.lesson,
      chapterTitle: item.chapterTitle,
      score,
      status,
      recommendationReason
    };
  });

  const completedCount = analyzedLessons.filter((l) => l.status !== "uncompleted").length;
  const masteredCount = analyzedLessons.filter((l) => l.status === "mastered").length;
  const needsPracticeCount = analyzedLessons.filter((l) => l.status === "needs_practice").length;
  const uncompletedCount = analyzedLessons.filter((l) => l.status === "uncompleted").length;
  
  const masteryRate = completedCount > 0 ? Math.round((masteredCount / completedCount) * 100) : 0;

  // Extract weaknesses
  const weaknesses: string[] = [];
  analyzedLessons
    .filter((l) => l.status === "needs_practice")
    .slice(0, 3)
    .forEach((l) => {
      // clean title (remove "Bài X: " prefix)
      const cleanTitle = l.lesson.title.replace(/^Bài\s+\d+:\s*/i, "");
      weaknesses.push(cleanTitle);
    });

  if (weaknesses.length === 0) {
    weaknesses.push("Không có lỗ hổng lớn. Hãy tiếp tục duy trì phong độ!");
  }

  // Recommend 3 specific lessons:
  // Priority:
  // 1. First 2 lessons that "needs_practice" (to close knowledge gaps)
  // 2. Next uncompleted lesson (to drive forward progress)
  const recommendations: LessonAnalysis[] = [];
  
  // Get up to 2 lessons that need practice
  const practiceNeeded = analyzedLessons.filter((l) => l.status === "needs_practice");
  practiceNeeded.slice(0, 2).forEach((l) => {
    recommendations.push({
      ...l,
      recommendationReason: l.recommendationReason || "Cần ôn tập lại các dạng câu hỏi trắc nghiệm của bài học này."
    });
  });

  // Fill remaining slots with uncompleted lessons
  const uncompleted = analyzedLessons.filter((l) => l.status === "uncompleted");
  const slotsNeeded = 3 - recommendations.length;
  uncompleted.slice(0, slotsNeeded).forEach((l) => {
    recommendations.push({
      ...l,
      recommendationReason: `Bài tiếp theo cần chinh phục. Hoàn thành để tăng tiến độ học tập thêm +${Math.round(100 / totalLessons)}%.`
    });
  });

  // If we still need recommendations (e.g. they finished everything, or everything is mastered), recommend the lowest scoring mastered lessons to aim for 10/10 perfect score
  if (recommendations.length < 3) {
    const mastered = analyzedLessons
      .filter((l) => l.status === "mastered")
      .sort((a, b) => (a.score || 0) - (b.score || 0));
    
    const additionalSlots = 3 - recommendations.length;
    mastered.slice(0, additionalSlots).forEach((l) => {
      recommendations.push({
        ...l,
        recommendationReason: `Bạn đạt ${l.score?.toFixed(1)}/10. Ôn tập lại để chinh phục điểm tuyệt đối 10/10!`
      });
    });
  }

  return {
    totalLessons,
    completedCount,
    masteredCount,
    needsPracticeCount,
    uncompletedCount,
    masteryRate,
    weaknesses,
    recommendations: recommendations.slice(0, 3)
  };
}
