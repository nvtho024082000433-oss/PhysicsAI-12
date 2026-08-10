import { getFirestore, collection, doc, setDoc, onSnapshot, getDocs, writeBatch, updateDoc } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";
import { StudentResult, DEFAULT_STUDENT_RESULTS } from "../types";

// Support both environment variables (useful on Vercel production) and static config
const config = {
  apiKey: ((import.meta as any).env?.VITE_FIREBASE_API_KEY) || firebaseConfig.apiKey,
  authDomain: ((import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN) || firebaseConfig.authDomain,
  projectId: ((import.meta as any).env?.VITE_FIREBASE_PROJECT_ID) || firebaseConfig.projectId,
  storageBucket: ((import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET) || firebaseConfig.storageBucket,
  messagingSenderId: ((import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID) || firebaseConfig.messagingSenderId,
  appId: ((import.meta as any).env?.VITE_FIREBASE_APP_ID) || firebaseConfig.appId,
  measurementId: ((import.meta as any).env?.VITE_FIREBASE_MEASUREMENT_ID) || (firebaseConfig as any).measurementId || "",
  firestoreDatabaseId: ((import.meta as any).env?.VITE_FIREBASE_FIRESTORE_DATABASE_ID) || (firebaseConfig as any).firestoreDatabaseId || ""
};

// Initialize Firebase App if not already initialized
let app: any = null;
try {
  app = getApps().length === 0 ? initializeApp(config) : getApps()[0];
} catch (e) {
  console.error("Firebase App initialization failed, using mock client:", e);
}

export let db: any = null;
export let auth: any = null;
if (app) {
  try {
    const databaseId = config.firestoreDatabaseId;
    db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);
  } catch (e) {
    console.error("Firestore initialization failed:", e);
  }
  try {
    auth = getAuth(app);
  } catch (e) {
    console.error("Firebase Auth initialization failed:", e);
  }
}

/**
 * Authenticates a student or teacher using deterministic credentials in Firebase Auth
 * to secure the session and ensure consistent data syncing.
 */
export const authenticateFirebaseUser = async (
  name: string,
  className: string,
  role: "student" | "teacher",
  password?: string
): Promise<any> => {
  if (!auth) {
    console.warn("Firebase Auth is not initialized or unavailable, continuing without auth");
    return null;
  }

  let email = "";
  let finalPassword = "";

  if (role === "student") {
    // Convert Vietnamese/UTF-8 Name to clean ASCII for email
    const cleanName = name.trim().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "D")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();
    const cleanClass = className.trim().replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    email = `student_${cleanClass}_${cleanName}@tamphu.physics.edu`;
    finalPassword = `Student_${cleanClass}_${cleanName}_Physics12#`;
  } else {
    email = "teacher_nguyenvantho@tamphu.physics.edu";
    finalPassword = password || "Tho*121369879#";
  }

  try {
    // Try signing in
    const userCredential = await signInWithEmailAndPassword(auth, email, finalPassword);
    console.log("Firebase Auth signed in successfully:", userCredential.user.email);
    return userCredential.user;
  } catch (error: any) {
    // If user does not exist or invalid credentials for non-existent, try creating the account
    if (
      error.code === "auth/user-not-found" || 
      error.code === "auth/invalid-credential" || 
      error.code === "auth/wrong-password"
    ) {
      if (role === "student") {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, finalPassword);
          console.log("Firebase Auth registered new student account:", userCredential.user.email);
          return userCredential.user;
        } catch (createErr: any) {
          console.warn("Failed to create Firebase student, retrying signin in case of race condition:", createErr);
          try {
            const userCredential = await signInWithEmailAndPassword(auth, email, finalPassword);
            return userCredential.user;
          } catch (retryErr) {
            throw retryErr;
          }
        }
      } else {
        // Teacher might be new
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, finalPassword);
          console.log("Firebase Auth registered new teacher account:", userCredential.user.email);
          return userCredential.user;
        } catch (createErr) {
          throw error; // If already exists, the password provided was wrong
        }
      }
    }
    throw error;
  }
};

/**
 * Sign out from Firebase Auth
 */
export const firebaseSignOut = async (): Promise<void> => {
  if (auth) {
    try {
      await signOut(auth);
      console.log("Firebase Auth signed out successfully");
    } catch (e) {
      console.error("Error signing out from Firebase:", e);
    }
  }
};

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
      xp: student.xp,
      // Đồng bộ các trường tiếng Việt bổ sung để hỗ trợ hiển thị trên Console
      hoVaTen: student.name.trim(),
      lop: student.className.trim(),
      diemHocTap: student.score,
      tienDo: student.progress,
      tichLuyXP: student.xp,
      updatedAt: new Date().toISOString()
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
        xp: student.xp,
        // Đồng bộ các trường tiếng Việt bổ sung để hỗ trợ hiển thị trên Console
        hoVaTen: student.name.trim(),
        lop: student.className.trim(),
        diemHocTap: student.score,
        tienDo: student.progress,
        tichLuyXP: student.xp,
        updatedAt: new Date().toISOString()
      }, { merge: true });
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

/**
 * Save Google Sheets configuration to Firestore settings collection
 */
export const saveGoogleSheetsConfig = async (sheetId: string, sheetUrl: string) => {
  if (!db) {
    localStorage.setItem("google_sheets_id", sheetId);
    localStorage.setItem("google_sheets_url", sheetUrl);
    return;
  }
  try {
    const docRef = doc(db, "settings", "google_sheets");
    await setDoc(docRef, {
      sheetId,
      sheetUrl,
      updatedAt: new Date().toISOString()
    });
    localStorage.setItem("google_sheets_id", sheetId);
    localStorage.setItem("google_sheets_url", sheetUrl);
  } catch (err) {
    console.error("Error saving Google Sheets config to Firestore:", err);
    localStorage.setItem("google_sheets_id", sheetId);
    localStorage.setItem("google_sheets_url", sheetUrl);
  }
};

/**
 * Remove Google Sheets configuration from Firestore
 */
export const removeGoogleSheetsConfig = async () => {
  if (!db) {
    localStorage.removeItem("google_sheets_id");
    localStorage.removeItem("google_sheets_url");
    return;
  }
  try {
    const docRef = doc(db, "settings", "google_sheets");
    await setDoc(docRef, {
      sheetId: null,
      sheetUrl: null,
      updatedAt: new Date().toISOString()
    });
    localStorage.removeItem("google_sheets_id");
    localStorage.removeItem("google_sheets_url");
  } catch (err) {
    console.error("Error removing Google Sheets config from Firestore:", err);
    localStorage.removeItem("google_sheets_id");
    localStorage.removeItem("google_sheets_url");
  }
};

/**
 * Listen to Google Sheets configuration in Firestore
 */
export const listenToGoogleSheetsConfig = (callback: (config: { sheetId: string | null; sheetUrl: string | null } | null) => void) => {
  if (!db) {
    const sheetId = localStorage.getItem("google_sheets_id");
    const sheetUrl = localStorage.getItem("google_sheets_url");
    if (sheetId) {
      callback({ sheetId, sheetUrl });
    } else {
      callback(null);
    }
    return () => {};
  }

  const docRef = doc(db, "settings", "google_sheets");
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data.sheetId) {
        localStorage.setItem("google_sheets_id", data.sheetId);
        if (data.sheetUrl) {
          localStorage.setItem("google_sheets_url", data.sheetUrl);
        } else {
          localStorage.removeItem("google_sheets_url");
        }
        callback({ sheetId: data.sheetId, sheetUrl: data.sheetUrl || null });
      } else {
        localStorage.removeItem("google_sheets_id");
        localStorage.removeItem("google_sheets_url");
        callback(null);
      }
    } else {
      const sheetId = localStorage.getItem("google_sheets_id");
      const sheetUrl = localStorage.getItem("google_sheets_url");
      if (sheetId) {
        callback({ sheetId, sheetUrl });
      } else {
        callback(null);
      }
    }
  }, (error) => {
    console.error("Error listening to Google Sheets config:", error);
    const sheetId = localStorage.getItem("google_sheets_id");
    const sheetUrl = localStorage.getItem("google_sheets_url");
    callback(sheetId ? { sheetId, sheetUrl } : null);
  });
};

