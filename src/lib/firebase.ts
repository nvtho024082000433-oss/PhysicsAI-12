import { db, auth } from "./firestoreDb";

// Export db as "database" for compatibility with standard Firebase guides
export const database = db;
export { auth };
