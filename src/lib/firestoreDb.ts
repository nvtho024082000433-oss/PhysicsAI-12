import { getFirestore, collection, doc, setDoc, onSnapshot, getDocs, writeBatch, updateDoc } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import firebaseConfig from "../../firebase-applet-config.json";
import { StudentResult, DEFAULT_STUDENT_RESULTS } from "../types";

// Initialize Firebase App if not already initialized
let app: any = null;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} catch (e) {
  console.error("Firebase App initialization failed, using mock client:", e);
}

export let db: any = null;
if (app) {
  try {
    db = getFirestore(app);
  } catch (e) {
    console.error("Firestore initialization failed:", e);
  }
}

const COLLECTION_NAME = "student_results";

// Helper to generate a unique, consistent document ID for a student
export const getStudentDocId = (className: string, name: string): string => {
  return `${className.trim().toUpperCase()}_${name.trim().toLowerCase()}`;
};

const updateLocalResult = (student: StudentResult) => {
  try {
    const localData = localStorage.getItem("student_results");
    let results: StudentResult[] = [];
    if (localData) {
      results = JSON.parse(localData);
    }
    if (!Array.isArray(results) || results.length === 0) {
      results = [...DEFAULT_STUDENT_RESULTS];
    }
    const idx = results.findIndex(
      (r) => r.name.toLowerCase() === student.name.toLowerCase() && r.className === student.className
    );
    if (idx !== -1) {
      results[idx] = student;
    } else {
      results.push(student);
    }
    localStorage.setItem("student_results", JSON.stringify(results));
  } catch (e) {
    console.error("Failed to update local storage fallback:", e);
  }
};

/**
 * Real-time listener for student results
 * @param callback Callback function with the list of student results
 */
export const listenToStudentResults = (callback: (results: StudentResult[]) => void) => {
  if (!db) {
    console.warn("Firestore not initialized. Falling back to local storage student results.");
    const localData = localStorage.getItem("student_results");
    if (localData) {
      try {
        const results = JSON.parse(localData);
        if (Array.isArray(results) && results.length > 0) {
          callback(results);
          return () => {};
        }
      } catch (e) {
        console.error("Error parsing local student results:", e);
      }
    }
    callback(DEFAULT_STUDENT_RESULTS);
    return () => {};
  }

  const colRef = collection(db, COLLECTION_NAME);
  
  return onSnapshot(colRef, async (snapshot) => {
    if (snapshot.empty) {
      // If Firestore is empty (first run), seed it with default student results
      console.log("Firestore collection is empty. Seeding default student results...");
      try {
        const batch = writeBatch(db);
        DEFAULT_STUDENT_RESULTS.forEach((student) => {
          const docId = getStudentDocId(student.className, student.name);
          const docRef = doc(db, COLLECTION_NAME, docId);
          batch.set(docRef, student);
        });
        await batch.commit();
      } catch (err) {
        console.error("Error seeding default student results to Firestore:", err);
      }
    } else {
      const results: StudentResult[] = [];
      snapshot.forEach((doc) => {
        results.push(doc.data() as StudentResult);
      });
      // Sort results by XP descending or name to keep it neat
      results.sort((a, b) => b.xp - a.xp);
      callback(results);
    }
  }, (error) => {
    console.error("Error listening to student results from Firestore:", error);
    // Fallback to local storage or defaults when Firestore is offline or permission is denied
    const localData = localStorage.getItem("student_results");
    if (localData) {
      try {
        const results = JSON.parse(localData);
        if (Array.isArray(results) && results.length > 0) {
          callback(results);
          return;
        }
      } catch (e) {
        console.error("Error parsing local student results fallback:", e);
      }
    }
    callback(DEFAULT_STUDENT_RESULTS);
  });
};

/**
 * Save or update a student result in Firestore
 */
export const saveStudentResult = async (student: StudentResult) => {
  if (!db) {
    updateLocalResult(student);
    return;
  }
  try {
    const docId = getStudentDocId(student.className, student.name);
    const docRef = doc(db, COLLECTION_NAME, docId);
    await setDoc(docRef, {
      name: student.name.trim(),
      className: student.className.trim(),
      score: student.score,
      progress: student.progress,
      completedQuizzes: student.completedQuizzes,
      xp: student.xp
    });
  } catch (err) {
    console.error("Error saving student result to Firestore:", err);
    updateLocalResult(student);
  }
};

/**
 * Save multiple student results (e.g. from teacher's update or bulk actions)
 */
export const saveBulkStudentResults = async (students: StudentResult[]) => {
  if (!db) {
    try {
      const localData = localStorage.getItem("student_results");
      let results: StudentResult[] = [];
      if (localData) {
        results = JSON.parse(localData);
      }
      if (!Array.isArray(results) || results.length === 0) {
        results = [...DEFAULT_STUDENT_RESULTS];
      }
      
      students.forEach((student) => {
        const idx = results.findIndex(
          (r) => r.name.toLowerCase() === student.name.toLowerCase() && r.className === student.className
        );
        if (idx !== -1) {
          results[idx] = student;
        } else {
          results.push(student);
        }
      });
      localStorage.setItem("student_results", JSON.stringify(results));
    } catch (e) {
      console.error("Failed to update bulk local storage fallback:", e);
    }
    return;
  }
  try {
    const batch = writeBatch(db);
    students.forEach((student) => {
      const docId = getStudentDocId(student.className, student.name);
      const docRef = doc(db, COLLECTION_NAME, docId);
      batch.set(docRef, {
        name: student.name.trim(),
        className: student.className.trim(),
        score: student.score,
        progress: student.progress,
        completedQuizzes: student.completedQuizzes,
        xp: student.xp
      });
    });
    await batch.commit();
  } catch (err) {
    console.error("Error saving bulk student results to Firestore:", err);
    // Fallback to bulk updating localStorage!
    try {
      const localData = localStorage.getItem("student_results");
      let results: StudentResult[] = [];
      if (localData) {
        results = JSON.parse(localData);
      }
      if (!Array.isArray(results) || results.length === 0) {
        results = [...DEFAULT_STUDENT_RESULTS];
      }
      
      students.forEach((student) => {
        const idx = results.findIndex(
          (r) => r.name.toLowerCase() === student.name.toLowerCase() && r.className === student.className
        );
        if (idx !== -1) {
          results[idx] = student;
        } else {
          results.push(student);
        }
      });
      localStorage.setItem("student_results", JSON.stringify(results));
    } catch (e) {
      console.error("Failed to update bulk local storage fallback:", e);
    }
  }
};
